import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../../../../src/core/events.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypeRoot = "prototypes/reality_anchor";
const studioRoot = `${prototypeRoot}/reports/studio_giant_sticky_piston_order_20260715`;
const candidateId = "RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1";
const layoutPath = `${studioRoot}/candidates/challenge/${candidateId}.txt`;
const replayPath = `${prototypeRoot}/reports/input_replay_${candidateId}.json`;
const outputDir = `${studioRoot}/pre_submission_attempt_1/${candidateId}`;
const goalVariantDir = `${outputDir}/goal_variants`;

const budgets = {
  solverMaxStates: 30_000,
  solverMaxDepth: 200,
  graphMaxStates: 30_000,
  coreProductMaxStates: 30_000,
  pureWalkMaxStates: 10_000,
};

const coreGroups = [
  { name: "B/S 切出五齿", patterns: ["sticky_to_box:n5"] },
  { name: "P/L 换相", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "端格重排", patterns: ["push_object:crate"] },
  { name: "五齿复黏", patterns: ["box_to_sticky:n5"] },
  { name: "主体重新合并", patterns: ["sticky_merge:n1"] },
  { name: "终拍刚体移动", patterns: ["move_sticky_rigid"] },
  { name: "终拍三锁力链", patterns: ["force_chain:n4"] },
] as const;

const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rawLayout = normalize(await readFile(layoutPath, "utf8"));
const replayDoc = JSON.parse(await readFile(replayPath, "utf8")) as { inputs: InputId[] };
const layoutSha256 = sha256(`${rawLayout}\n`);
const expectedSha256 = "027825ee031100ce6600d163cf967201c0670ee356ffe98362e335b4ec573541";
if (layoutSha256 !== expectedSha256) {
  throw new Error(`exact v1 layout hash mismatch: ${layoutSha256}`);
}

await mkdir(goalVariantDir, { recursive: true });

const initial = parse(candidateId, rawLayout);
const targetCells = [...initial.goals].map(parsePointKey).sort(pointSort);
if (targetCells.length !== 3) throw new Error(`expected 3 goals, got ${targetCells.length}`);

const goalChecks = [];
for (const target of targetCells) {
  const variantId = `NO_GOAL_${target.x}_${target.y}`;
  const variantLayout = removeGoalOverlay(rawLayout, target);
  const variantLayoutPath = `${goalVariantDir}/${variantId}.txt`;
  const variantEvidencePath = `${goalVariantDir}/${variantId}.json`;
  await writeFile(variantLayoutPath, `${variantLayout}\n`, "utf8");
  const state = parse(`${candidateId}_${variantId}`, variantLayout);
  console.log(`[goal ${target.x},${target.y}] canonical replay`);
  const canonical = replay(state, replayDoc.inputs);
  console.log(`[goal ${target.x},${target.y}] solver budget ${budgets.solverMaxStates}`);
  const solver = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates: budgets.solverMaxStates,
    maxDepth: budgets.solverMaxDepth,
  });
  console.log(`[goal ${target.x},${target.y}] graph budget ${budgets.graphMaxStates}`);
  const graph = enumerateRuntimeGraph(
    runtime,
    state,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates: budgets.graphMaxStates, terminalizeWins: true },
  );
  console.log(`[goal ${target.x},${target.y}] core-product budget ${budgets.coreProductMaxStates}`);
  const coreProbe = findWinningPathMissingCore(state);
  const decision = graph.status === "complete" && coreProbe.status === "complete"
    ? "requires_further_authority_evaluation"
    : "keep_with_unknown";
  const evidence = {
    schema_version: 1,
    workflow: "reality_anchor_goal_prune_single_target_counterfactual",
    candidate_id: candidateId,
    exact_version: `v1_sha256_${expectedSha256}`,
    operation: "remove_goal_overlay",
    target: [target.x, target.y],
    source_layout_ref: layoutPath,
    canonical_replay_ref: replayPath,
    variant_layout_ref: variantLayoutPath,
    variant_layout_sha256: sha256(`${variantLayout}\n`),
    budgets,
    canonical_replay: canonical,
    solver: {
      found: solver.found,
      cost: Number.isFinite(solver.cost) ? solver.cost : null,
      depth: solver.depth,
      explored_states: solver.exploredStates,
      search_status: solver.searchStatus,
      reason: solver.reason ?? null,
      budget: solver.budget,
      winning_event_counts: countEvents(solver.events ?? []),
    },
    graph: {
      status: graph.status,
      reason: graph.reason ?? null,
      reachable_states: graph.keys.length,
      legal_transitions: graph.edges.length,
      win_states_in_prefix: graph.winStateIndexes.size,
      budget: { max_states: budgets.graphMaxStates, terminalize_wins: true },
    },
    core_event_probe: coreProbe,
    authority_decision: decision,
    authority_note: "goal prune 要求完整图与完整核心事件 probe；unique_within_budget 不构成该门槛的豁免。",
  };
  await writeJson(variantEvidencePath, evidence);
  goalChecks.push({
    target: [target.x, target.y],
    variant_layout_ref: variantLayoutPath,
    evidence_ref: variantEvidencePath,
    canonical_replay: canonical,
    solver: evidence.solver,
    graph: evidence.graph,
    core_event_probe: coreProbe,
    authority_decision: decision,
  });
}

console.log("[opening] enumerate exact same-object pure-walk component");
const opening = analyzeOpening(initial);
await writeJson(`${outputDir}/opening_runtime_evidence.json`, {
  schema_version: 1,
  workflow: "reality_anchor_opening_comfort_runtime_state_audit",
  candidate_id: candidateId,
  exact_version: `v1_sha256_${expectedSha256}`,
  source_layout_ref: layoutPath,
  canonical_replay_ref: replayPath,
  full_graph_ref: `${prototypeRoot}/reports/layout_analysis_${candidateId}.json`,
  full_scc_metrics_status: "unknown_graph_exhausted",
  warning: "pure-walk component 只证明初始对象态不变时的精确走位空间，不能替代完整 runtime 图 initial SCC。",
  budgets: { pure_walk_max_states: budgets.pureWalkMaxStates },
  ...opening,
});

console.log("[redundant] record inventory and trace participation");
const inventory = analyzeInventory(initial, rawLayout, replayDoc.inputs);
await writeJson(`${outputDir}/redundant_inventory_evidence.json`, {
  schema_version: 1,
  workflow: "reality_anchor_redundant_element_inventory_audit",
  candidate_id: candidateId,
  exact_version: `v1_sha256_${expectedSha256}`,
  source_layout_ref: layoutPath,
  canonical_replay_ref: replayPath,
  graph_completeness: "exhausted_at_30000",
  clean_prune_authority: "forbidden_while_graph_or_core_probe_incomplete",
  ...inventory,
});

await writeJson(`${outputDir}/run_manifest.json`, {
  schema_version: 1,
  workflow: "reality_anchor_pre_submission_attempt_1_challenge_exact_v1",
  candidate_id: candidateId,
  exact_version: `v1_sha256_${expectedSha256}`,
  command: `npx tsx ${outputDir}/audit_presubmission.ts`,
  source_layout_ref: layoutPath,
  source_layout_sha256: layoutSha256,
  canonical_replay_ref: replayPath,
  authority_docs: [
    `${prototypeRoot}/docs/design_handoff.yml`,
    `${prototypeRoot}/docs/goal_prune_check.md`,
    `${prototypeRoot}/docs/opening_comfort_check.md`,
    `${prototypeRoot}/docs/redundant_element_prune.md`,
  ],
  budgets,
  goal_checks: goalChecks,
  opening_evidence_ref: `${outputDir}/opening_runtime_evidence.json`,
  redundant_inventory_evidence_ref: `${outputDir}/redundant_inventory_evidence.json`,
  version_effect: "unchanged",
  review_effect: "preserved",
});

console.log(`Wrote pre-submission evidence to ${outputDir}`);

function parse(id: string, layout: string): RealityAnchorState {
  const level: LevelDoc = {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
  return adapter.parseLevel(level) as RealityAnchorState;
}

function replay(state: RealityAnchorState, inputs: readonly InputId[]) {
  let current = state;
  let firstIllegalStep: number | null = null;
  let firstWinStep: number | null = runtime.isWin(current, pkg.mechanic.win) ? 0 : null;
  const nonWalkSteps: Array<{ step: number; input: InputId; events: string[] }> = [];
  for (let index = 0; index < inputs.length; index += 1) {
    const input = inputs[index]!;
    const result = runtime.step(current, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) {
      firstIllegalStep = index + 1;
      break;
    }
    if (result.events.some((event) => event !== "walk")) {
      nonWalkSteps.push({ step: index + 1, input, events: result.events });
    }
    current = result.state as RealityAnchorState;
    if (firstWinStep === null && runtime.isWin(current, pkg.mechanic.win)) firstWinStep = index + 1;
  }
  const coveredGoals = [...current.goals]
    .filter((goal) => occupied(current, goal))
    .map(parsePointKey)
    .sort(pointSort)
    .map((point) => [point.x, point.y]);
  return {
    input_count: inputs.length,
    legal: firstIllegalStep === null,
    legal_through_step: firstIllegalStep === null ? inputs.length : firstIllegalStep - 1,
    first_illegal_step: firstIllegalStep,
    first_win_step: firstWinStep,
    final_win: firstIllegalStep === null && runtime.isWin(current, pkg.mechanic.win),
    remaining_goal_count: current.goals.size,
    covered_goals: coveredGoals,
    non_walk_steps: nonWalkSteps,
    final_state_key_sha256: sha256(runtime.key(current)),
  };
}

function findWinningPathMissingCore(initialState: RealityAnchorState) {
  const allMask = (1 << coreGroups.length) - 1;
  const queue: Array<{ state: RealityAnchorState; mask: number }> = [{ state: initialState, mask: 0 }];
  const visited = new Set<string>([`${runtime.key(initialState)}|0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (visited.size > budgets.coreProductMaxStates) {
      return {
        status: "exhausted",
        reason: "product-state budget exceeded",
        found_missing_core_win: false,
        explored_product_states: visited.size,
        budget: { max_product_states: budgets.coreProductMaxStates },
        completeness_boundary: "unknown",
      };
    }
    const current = queue[cursor]!;
    if (runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return {
        status: "found",
        reason: "winning path missing one or more core groups",
        found_missing_core_win: true,
        explored_product_states: visited.size,
        missing_groups: coreGroups.filter((_, index) => (current.mask & (1 << index)) === 0).map((group) => group.name),
        budget: { max_product_states: budgets.coreProductMaxStates },
        completeness_boundary: "definitive_counterexample",
      };
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      let mask = current.mask;
      coreGroups.forEach((group, index) => {
        if (group.patterns.some((pattern) => result.events.some((event) => eventMatchesPattern(event, pattern)))) {
          mask |= 1 << index;
        }
      });
      const key = `${runtime.key(result.state)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state as RealityAnchorState, mask });
    }
  }
  return {
    status: "complete",
    reason: "product graph complete",
    found_missing_core_win: false,
    explored_product_states: visited.size,
    missing_groups: [],
    budget: { max_product_states: budgets.coreProductMaxStates },
    completeness_boundary: "complete_for_declared_groups",
  };
}

function analyzeOpening(initialState: RealityAnchorState) {
  const initialObjects = objectSignature(initialState);
  const queue: Array<{ state: RealityAnchorState; distance: number }> = [{ state: initialState, distance: 0 }];
  const byKey = new Map<string, { state: RealityAnchorState; distance: number }>([[runtime.key(initialState), queue[0]!]]);
  const walkEdges: Array<{ from: string; to: string; action: InputId; reverse_confirmed: boolean }> = [];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (byKey.size > budgets.pureWalkMaxStates) throw new Error("pure-walk budget unexpectedly exhausted");
    const current = queue[cursor]!;
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal || result.events.some((event) => event !== "walk")) continue;
      const next = result.state as RealityAnchorState;
      if (objectSignature(next) !== initialObjects) continue;
      const nextKey = runtime.key(next);
      walkEdges.push({
        from: runtime.key(current.state),
        to: nextKey,
        action,
        reverse_confirmed: hasReverseWalk(next, current.state),
      });
      if (byKey.has(nextKey)) continue;
      const record = { state: next, distance: current.distance + 1 };
      byKey.set(nextKey, record);
      queue.push(record);
    }
  }

  const initialKey = runtime.key(initialState);
  const reverseWalk = new Map<string, Set<string>>();
  for (const edge of walkEdges) {
    const sources = reverseWalk.get(edge.to) ?? new Set<string>();
    sources.add(edge.from);
    reverseWalk.set(edge.to, sources);
  }
  const reversibleKeys = new Set<string>([initialKey]);
  const reverseQueue = [initialKey];
  for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
    for (const previous of reverseWalk.get(reverseQueue[cursor]!) ?? []) {
      if (reversibleKeys.has(previous)) continue;
      reversibleKeys.add(previous);
      reverseQueue.push(previous);
    }
  }
  const pureWalkSccExitEdges = walkEdges.filter((edge) => reversibleKeys.has(edge.from) && !reversibleKeys.has(edge.to));

  const commitments = new Map<string, {
    event_signature: string[];
    min_source_distance: number;
    source_positions: string[];
    source_keys: string[];
    actions: Set<InputId>;
    result_object_signatures: Set<string>;
  }>();
  for (const { state, distance } of queue) {
    for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal || result.events.every((event) => event === "walk")) continue;
      const signature = result.events.join("|");
      const record = commitments.get(signature) ?? {
        event_signature: result.events,
        min_source_distance: distance,
        source_positions: [],
        source_keys: [],
        actions: new Set<InputId>(),
        result_object_signatures: new Set<string>(),
      };
      record.min_source_distance = Math.min(record.min_source_distance, distance);
      record.source_positions.push(`${state.player.x},${state.player.y}`);
      record.source_keys.push(runtime.key(state));
      record.actions.add(action);
      record.result_object_signatures.add(objectSignature(result.state as RealityAnchorState));
      commitments.set(signature, record);
    }
  }

  const immediate = Object.fromEntries((runtime.actions(initialState, { winCondition: pkg.mechanic.win }) as InputId[]).map((action) => {
    const result = runtime.step(initialState, action, { winCondition: pkg.mechanic.win });
    return [action, { legal: result.legal, reason: result.reason ?? null, events: result.events }];
  }));
  const positions = queue.map(({ state, distance }) => ({ position: [state.player.x, state.player.y], distance })).sort((a, b) => a.distance - b.distance || a.position[1]! - b.position[1]! || a.position[0]! - b.position[0]!);
  const reversiblePositions = queue
    .filter(({ state }) => reversibleKeys.has(runtime.key(state)))
    .map(({ state, distance }) => ({ position: [state.player.x, state.player.y], distance }))
    .sort((a, b) => a.distance - b.distance || a.position[1]! - b.position[1]! || a.position[0]! - b.position[0]!);
  return {
    initial_player: [initialState.player.x, initialState.player.y],
    immediate_inputs: immediate,
    same_object_pure_walk: {
      status: "complete",
      state_count: byKey.size,
      player_position_count: new Set(positions.map((item) => item.position.join(","))).size,
      max_distance_from_start: Math.max(...positions.map((item) => item.distance)),
      all_edges_reverse_confirmed: walkEdges.every((edge) => edge.reverse_confirmed),
      directed_edge_count: walkEdges.length,
      positions,
    },
    initial_pure_walk_scc: {
      status: "complete",
      scope: "只含 events==walk 且对象态保持初始值的有向子图；不是完整 runtime 图 initial SCC。",
      state_count: reversibleKeys.size,
      player_position_count: new Set(reversiblePositions.map((item) => item.position.join(","))).size,
      max_distance_from_start: Math.max(...reversiblePositions.map((item) => item.distance)),
      pure_walk_exit_edge_count: pureWalkSccExitEdges.length,
      pure_walk_exit_source_distances: [...new Set(pureWalkSccExitEdges.map((edge) => byKey.get(edge.from)!.distance))].sort((a, b) => a - b),
      positions: reversiblePositions,
    },
    first_object_commitments: [...commitments.values()].map((record) => ({
      event_signature: record.event_signature,
      min_source_distance: record.min_source_distance,
      source_count: new Set(record.source_positions).size,
      source_positions: [...new Set(record.source_positions)].sort(),
      source_in_initial_pure_walk_scc_count: new Set(record.source_keys.filter((key) => reversibleKeys.has(key))).size,
      actions: [...record.actions].sort(),
      distinct_result_object_states: record.result_object_signatures.size,
      irreversibility_status: "unknown_without_complete_initial_scc",
    })).sort((a, b) => a.min_source_distance - b.min_source_distance || a.event_signature.join("|").localeCompare(b.event_signature.join("|"))),
    current_start_judgement: {
      forced_face_to_face: false,
      judgement: "边界贴近但非强迫贴脸",
      basis: `起点存在立即 B/S 对象动作，但也存在合法纯 walk 输入并连入 ${reversibleKeys.size} 状态的同对象态 pure-walk initial SCC。`,
      residual_unknown: "完整图耗尽，不能给出 initial SCC、正确胜向出口距离或 dead exits 数量。",
    },
  };
}

function analyzeInventory(initialState: RealityAnchorState, layout: string, inputs: readonly InputId[]) {
  const trace = replayTrace(initialState, inputs);
  const traceCells = new Set<string>();
  for (const state of trace.states) {
    traceCells.add(`${state.player.x},${state.player.y}`);
    state.crates.forEach((point) => traceCells.add(pointKey(point)));
    state.stickyGroups.flat().forEach((point) => traceCells.add(pointKey(point)));
    if (state.boxStickyAnchor) {
      traceCells.add(pointKey(state.boxStickyAnchor.box));
      traceCells.add(pointKey(state.boxStickyAnchor.sticky));
    }
    if (state.pushPullAnchor) {
      traceCells.add(pointKey(state.pushPullAnchor.push));
      traceCells.add(pointKey(state.pushPullAnchor.pull));
    }
  }
  const sticky = initialState.stickyGroups[0] ?? [];
  const cutTeeth = [[6, 2], [6, 5], [6, 9], [6, 13], [6, 16]] as const;
  const lockCrates = [[5, 4], [5, 9], [5, 14]] as const;
  const floorLeaves = findFloorLeaves(layout);
  return {
    counts: {
      width: initialState.width,
      height: initialState.height,
      goals: initialState.goals.size,
      crates: initialState.crates.length,
      sticky_components: initialState.stickyGroups.length,
      sticky_cells: sticky.length,
      wall_cells: initialState.walls.size,
      ordinary_floor_cells: [...layout].filter((glyph) => glyph === ".").length,
    },
    sticky_body: {
      id: "STICKY_COMPONENT_1",
      initial_cell_count: sticky.length,
      four_neighbor_connected: connected(sticky),
      horizontally_symmetric_about_y_9: sticky.every((point) => sticky.some((other) => other.x === point.x && other.y === 18 - point.y)),
      canonical_non_walk_participation: [1, 107, 130],
    },
    cut_teeth: cutTeeth.map(([x, y], index) => ({
      cell: [x, y],
      canonical_trace_used: traceCells.has(`${x},${y}`),
      role: index === 0 ? "上端格：切出后下推两格，成为上锁终拍触点" : index === 4 ? "下端格：切出后上推两格，成为下锁终拍触点" : index === 2 ? "中格：保持中央锁终拍触点" : "复黏桥：恢复 107 格单一连通主体",
    })),
    lock_crates: lockCrates.map(([x, y]) => ({
      cell: [x, y],
      target: [x - 1, y],
      canonical_trace_used: traceCells.has(`${x},${y}`),
      final_cover_in_canonical: true,
      role: "终拍 force_chain:n4 同拍推入目标；代表锁 exact probe 另支持条件式推入后回撤。",
    })),
    anchors: {
      box_sticky: {
        initial_cells: [[initialState.boxStickyAnchor!.box.x, initialState.boxStickyAnchor!.box.y], [initialState.boxStickyAnchor!.sticky.x, initialState.boxStickyAnchor!.sticky.y]],
        canonical_object_steps: [1, 107],
        role: "切出五齿并在重排后复黏、合并 107 格主体。",
      },
      push_pull: {
        initial_cells: [[initialState.pushPullAnchor!.pull.x, initialState.pushPullAnchor!.pull.y], [initialState.pushPullAnchor!.push.x, initialState.pushPullAnchor!.push.y]],
        canonical_object_steps: [13, 14, 15],
        role: "左移三格把 x6 从 L 侧改为 P 侧，授权上下端格纵向重排。",
      },
    },
    functional_walls_and_passages: [
      {
        id: "three_lock_pockets",
        cells_or_region: "三组 (G,C) 位于 y=4/9/14，左、上下墙形成一格深口袋",
        role: "令三只锁箱只能在终拍同拍保留覆盖；代表锁 probe 记录推入后 pull 回撤。",
      },
      {
        id: "upper_lower_reorder_channels",
        cells_or_region: [[6, 2], [6, 3], [6, 4], [6, 14], [6, 15], [6, 16]],
        role: "分别给上下端格两格有职责位移，并在复黏前保持两个任务可交错。",
      },
      {
        id: "lower_service_and_isolation_corridor",
        cells_or_region: "y=19..22 的 B/S 服务区、x4 入口与 P/L 横轨；y=21 隔离墙",
        role: "允许先操作 B/S 再进入 P/L 轨；阻止第四次左拉、纵移与 B/S 下移，exact phase audit 已核验。",
      },
      {
        id: "mask_circulation_space",
        cells_or_region: "主体四周与上下重排槽相连的开放通路",
        role: "canonical 120 个 walk 输入使用该通路完成两端重排、返回 B/S 与绕到终拍发力侧。",
      },
      {
        id: "outer_closed_frame",
        cells_or_region: "四边闭合外框",
        role: "保持可读矩形与机制边界；删除任一外行/列后新边界并非全墙，无合法 outline trim 候选。",
      },
    ],
    space_candidate_discovery: {
      rule: "普通地面静态 degree<=1 的 leaf/deadend；只发现候选，不执行 wall-prune。",
      candidates: floorLeaves.map((point) => ({
        cell: [point.x, point.y],
        static_degree: staticDegree(layout, point.x, point.y),
        canonical_trace_used: traceCells.has(pointKey(point)),
      })),
    },
    outline_candidate_discovery: {
      legal_trim_sides: outlineTrimSides(layout),
      reason: "裁剪后必须仍是四边全墙的闭合矩形；当前没有满足条件的外行/列。",
    },
  };
}

function replayTrace(initialState: RealityAnchorState, inputs: readonly InputId[]) {
  let state = initialState;
  const states = [state];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) throw new Error("canonical trace unexpectedly illegal");
    state = result.state as RealityAnchorState;
    states.push(state);
  }
  return { states };
}

function hasReverseWalk(from: RealityAnchorState, expected: RealityAnchorState) {
  return (runtime.actions(from, { winCondition: pkg.mechanic.win }) as InputId[]).some((action) => {
    const result = runtime.step(from, action, { winCondition: pkg.mechanic.win });
    return result.legal && result.events.every((event) => event === "walk") && runtime.key(result.state) === runtime.key(expected);
  });
}

function objectSignature(state: RealityAnchorState) {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups.map((group) => group.map(pointKey).sort().join(";")).sort().join("|");
  const pl = state.pushPullAnchor ? `${pointKey(state.pushPullAnchor.pull)}>${pointKey(state.pushPullAnchor.push)}` : "none";
  const bs = state.boxStickyAnchor ? `${pointKey(state.boxStickyAnchor.box)}>${pointKey(state.boxStickyAnchor.sticky)}` : "none";
  return `C:${crates}|M:${sticky}|PL:${pl}|BS:${bs}`;
}

function occupied(state: RealityAnchorState, key: string) {
  return state.crates.some((point) => pointKey(point) === key)
    || state.stickyGroups.some((group) => group.some((point) => pointKey(point) === key))
    || (state.pushPullAnchor && [state.pushPullAnchor.pull, state.pushPullAnchor.push].some((point) => pointKey(point) === key))
    || (state.boxStickyAnchor && [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky].some((point) => pointKey(point) === key));
}

function removeGoalOverlay(layout: string, target: Point) {
  const rows = layout.split("\n").map((row) => [...row]);
  const replacement: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  const glyph = rows[target.y]?.[target.x];
  if (!glyph || replacement[glyph] === undefined) throw new Error(`no removable target at ${target.x},${target.y}`);
  rows[target.y]![target.x] = replacement[glyph]!;
  return rows.map((row) => row.join("")).join("\n");
}

function findFloorLeaves(layout: string) {
  const rows = layout.split("\n");
  return rows.flatMap((row, y) => [...row].flatMap((glyph, x) => glyph === "." && staticDegree(layout, x, y) <= 1 ? [{ x, y }] : []));
}

function staticDegree(layout: string, x: number, y: number) {
  const rows = layout.split("\n");
  return [[1, 0], [-1, 0], [0, 1], [0, -1]].filter(([dx, dy]) => {
    const glyph = rows[y + dy]?.[x + dx];
    return glyph !== undefined && glyph !== "#";
  }).length;
}

function outlineTrimSides(layout: string) {
  const rows = layout.split("\n");
  const closed = (candidate: string[]) => candidate.length >= 3
    && [...candidate[0]!].every((glyph) => glyph === "#")
    && [...candidate.at(-1)!].every((glyph) => glyph === "#")
    && candidate.every((row) => row[0] === "#" && row.at(-1) === "#");
  return [
    { side: "top", candidate: rows.slice(1) },
    { side: "bottom", candidate: rows.slice(0, -1) },
    { side: "left", candidate: rows.map((row) => row.slice(1)) },
    { side: "right", candidate: rows.map((row) => row.slice(0, -1)) },
  ].filter((item) => closed(item.candidate)).map((item) => item.side);
}

function connected(points: Point[]) {
  if (!points.length) return false;
  const remaining = new Set(points.map(pointKey));
  const queue = [points[0]!];
  remaining.delete(pointKey(points[0]!));
  for (let index = 0; index < queue.length; index += 1) {
    const point = queue[index]!;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const next = { x: point.x + dx, y: point.y + dy };
      if (remaining.delete(pointKey(next))) queue.push(next);
    }
  }
  return remaining.size === 0;
}

function countEvents(events: readonly string[]) {
  return Object.fromEntries([...new Set(events)].sort().map((event) => [event, events.filter((item) => item === event).length]));
}

function pointKey(point: Point) { return `${point.x},${point.y}`; }
function parsePointKey(key: string): Point { const [x, y] = key.split(",").map(Number); return { x: x!, y: y! }; }
function pointSort(a: Point, b: Point) { return a.y - b.y || a.x - b.x; }
function normalize(text: string) { return text.replace(/\r/g, "").replace(/\n+$/g, ""); }
function sha256(text: string) { return createHash("sha256").update(text).digest("hex"); }
async function writeJson(path: string, value: unknown) { await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
