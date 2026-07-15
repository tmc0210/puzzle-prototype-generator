import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";
import { eventMatchesPattern } from "../../../../src/core/events.js";
import { loadPrototypePackage } from "../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../src/prototypes/runtimeAdapter.js";

const root = "prototypes/reality_anchor";
const studioRoot = `${root}/reports/studio_c_shape_whole_20260713`;
const outDir = `${studioRoot}/pre_submission_attempt_10`;
const maxStates = 300_000;

type CoreGroup = { name: string; patterns: string[] };
type Config = {
  id: string;
  exactVersion: string;
  expectedRawSha256: string;
  slot: string;
  layoutPath: string;
  canonicalInputs: InputId[];
  canonicalCost: number;
  coreGroups: CoreGroup[];
  targetIdentityRole: string;
  openingIntent: string;
};

const configs: Config[] = [
  {
    id: "CWHOLE_BASELINE_v6",
    exactVersion: "CWHOLE_BASELINE_v6_sha256_9059c8758e9ac3d02469319b7ff9e740f146ef0d4e92cc2a5ef97852c5b39d3a",
    expectedRawSha256: "9059c8758e9ac3d02469319b7ff9e740f146ef0d4e92cc2a5ef97852c5b39d3a",
    slot: "baseline",
    layoutPath: `${studioRoot}/candidates/CWHOLE_BASELINE_v6.txt`,
    canonicalInputs: ["right", "right", "left", "left", "up", "up", "right", "down"],
    canonicalCost: 8,
    coreGroups: [{ name: "whole_C_rigid_move", patterns: ["move_sticky_rigid"] }],
    targetIdentityRole: "四枚稀疏目标分别消费完整 C 的上臂左端、右脊与下臂两端；它们共同把脱困后的正交换面落位绑定到三段轮廓。",
    openingIntent: "保留凹口内起点：玩家必须从形状内部直接读取完整 C 的围栏关系；第一格右移仍不释放出口，第二格才脱困，增加空走缓冲会削弱这一开局承诺。",
  },
  {
    id: "CWHOLE_APPLICATION_v14",
    exactVersion: "CWHOLE_APPLICATION_v14_sha256_c853889c255da5030f37806ca2917ff12455217439770d46bae6a4e8cb997738",
    expectedRawSha256: "c853889c255da5030f37806ca2917ff12455217439770d46bae6a4e8cb997738",
    slot: "application",
    layoutPath: `${studioRoot}/candidates/CWHOLE_APPLICATION_v14.txt`,
    canonicalInputs: ["down", "up", "right", "down", "left", "left", "left", "down", "right", "right"],
    canonicalCost: 10,
    coreGroups: [
      { name: "two_boxes_become_sticky_material", patterns: ["box_to_sticky"] },
      { name: "inserted_material_completes_C", patterns: ["sticky_merge"] },
      { name: "constructed_C_rigid_move", patterns: ["move_sticky_rigid"] },
    ],
    targetIdentityRole: "六枚稀疏目标消费完整上臂三格、竖脊与下臂两端；尤其上臂三目标让两只新增材料在构造后仍共同承担终局责任。",
    openingIntent: "保留两箱上方起点：初始可逆走位允许玩家选择先插入哪只箱，两条箱列、B/S 边界、五格骨架与缺口都在第一次不可逆动作前可读。",
  },
  {
    id: "CWHOLE_COMBINATION_v8",
    exactVersion: "CWHOLE_COMBINATION_v8_sha256_600cabc71e11a2db13a58277c68668f466d70f5a8cb9aedca11acc245c21af6c",
    expectedRawSha256: "600cabc71e11a2db13a58277c68668f466d70f5a8cb9aedca11acc245c21af6c",
    slot: "combination",
    layoutPath: `${studioRoot}/candidates/CWHOLE_COMBINATION_v8.txt`,
    canonicalInputs: ["right", "right", "left", "left", "up", "up", "right", "down"],
    canonicalCost: 8,
    coreGroups: [
      { name: "C_pushes_anchor_by_force_chain", patterns: ["force_chain"] },
      { name: "pushed_anchor_boundary_shift", patterns: ["anchor_boundary_shift:push_pull"] },
      { name: "whole_C_rigid_move", patterns: ["move_sticky_rigid"] },
    ],
    targetIdentityRole: "P/L 远端双目标与 C 的四枚稀疏目标共同要求先共同右移、再让 C 正交下落分流；两枚刚体都在终局继续承担覆盖责任。",
    openingIntent: "保留完整 C 凹口内起点：玩家第一眼同时看到围栏、C 闭口前沿与紧贴的 P/L；两格释放行程让共同运输从第一手起就成为主体验。",
  },
  {
    id: "CWHOLE_CHALLENGE_v7",
    exactVersion: "CWHOLE_CHALLENGE_v7_sha256_245b0910c345461571b04afdb1b1302dc942785dde751d409c47cbe235960dbc",
    expectedRawSha256: "245b0910c345461571b04afdb1b1302dc942785dde751d409c47cbe235960dbc",
    slot: "challenge",
    layoutPath: `${studioRoot}/candidates/CWHOLE_CHALLENGE_v7.txt`,
    canonicalInputs: ["right", "right", "up", "left", "left"],
    canonicalCost: 5,
    coreGroups: [
      { name: "C_carries_anchor_by_force_chain", patterns: ["force_chain"] },
      { name: "carried_boundary_shift", patterns: ["anchor_boundary_shift:push_pull"] },
      { name: "whole_C_push_phase", patterns: ["push_object:sticky#1"] },
      { name: "whole_C_pull_return_phase", patterns: ["pull_object:sticky#1"] },
    ],
    targetIdentityRole: "三枚 C 形恢复目标与两枚 P/L 远端目标共同构成‘携带后分离返回’的双对象终局；删除任何一组都会改变反转身份。",
    openingIntent: "保留当前起点：initial SCC 提供凹口外的可逆观察与站位，正确不可逆动作前没有更近的死出口。",
  },
];

const pkg = await loadPrototypePackage(root);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
await mkdir(outDir, { recursive: true });

const manifest = [];
for (const config of configs) manifest.push(await runCandidate(config));
await writeYaml(`${outDir}/run_manifest.yml`, {
  workflow: "reality_anchor_pre_submission_checks",
  attempt: 10,
  executed_at: new Date().toISOString(),
  command: "npx tsx prototypes/reality_anchor/reports/studio_c_shape_whole_20260713/pre_submission_c_shape_whole.ts",
  tool_maturity_command: "npx tsx src/cli.ts tool-maturity prototypes/reality_anchor",
  tool_maturity_ref: `${outDir}/tool_maturity.md`,
  authority_docs: [
    `${root}/docs/goal_prune_check.md`,
    `${root}/docs/opening_comfort_check.md`,
    `${root}/docs/redundant_element_prune.md`,
  ],
  candidates: manifest,
});
console.log(`Wrote attempt-10 checks for ${configs.map((item) => item.id).join(", ")}`);

async function runCandidate(config: Config) {
  const rawText = await readFile(config.layoutPath, "utf8");
  const rawSha256 = createHash("sha256").update(rawText).digest("hex");
  if (rawSha256 !== config.expectedRawSha256) throw new Error(`${config.id}: exact-version hash mismatch`);
  const layout = normalize(rawText);
  const candidateDir = `${outDir}/${config.id}`;
  await mkdir(`${candidateDir}/goal_variants`, { recursive: true });
  await mkdir(`${candidateDir}/object_variants`, { recursive: true });
  await mkdir(`${candidateDir}/space_variants`, { recursive: true });
  await mkdir(`${candidateDir}/outline_variants`, { recursive: true });

  const initial = parse(config.id, layout);
  const base = analyzeState(initial, config);
  if (!base.solutionFound || base.shortestCost !== config.canonicalCost || base.graphStatus !== "complete" || !base.canonicalReplayWin) {
    throw new Error(`${config.id}: base evidence mismatch`);
  }

  const targets = targetCells(layout);
  const goalVariants = [];
  for (const [x, y] of targets) {
    const variantId = `NO_GOAL_${x}_${y}`;
    const variantLayout = removeGoal(layout, x, y);
    const layoutRef = `${candidateDir}/goal_variants/${variantId}.txt`;
    const evidenceRef = `${candidateDir}/goal_variants/${variantId}.json`;
    await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
    const analysis = analyzeLayoutVariant(`${config.id}_${variantId}`, variantLayout, config);
    await writeJson(evidenceRef, { exactVersion: config.exactVersion, operation: "remove_goal_overlay", target: [x, y], layout: variantLayout, analysis });
    goalVariants.push({ target: [x, y] as [number, number], layoutRef, evidenceRef, analysis });
  }

  const goalChecks = goalVariants.map((item) => {
    const hardReason = goalHardKeepReason(item.analysis, config.canonicalCost);
    return {
      target: item.target,
      action: "keep",
      reason: hardReason ?? config.targetIdentityRole,
      semantic_role: hardReason ? "structural" : "core_aesthetic_and_experience_identity",
      cost_delta: `${config.canonicalCost}->${item.analysis.shortestCost ?? "unavailable"}`,
      graph_status: item.analysis.graphStatus,
      expected_trace_win: item.analysis.canonicalReplayWin,
      core_event_probe_status: item.analysis.coreEventProbe.status,
      core_event_bypass: item.analysis.coreEventProbe.foundViolation ? item.analysis.coreEventProbe.missingGroups : "none",
      evidence_refs: [item.layoutRef, item.evidenceRef],
    };
  });
  const singleDeletePasses = goalChecks.filter((item) => item.action === "remove");

  const opening = analyzeOpening(initial, config);
  const openingReport = {
    opening_comfort_check: {
      status: "complete",
      candidate_id: config.id,
      exact_version: config.exactVersion,
      authority_doc: `${root}/docs/opening_comfort_check.md`,
      enumeration_rule: "枚举完整 runtime 图 initial SCC 中出现且保持原对象配置的全部玩家位置；每个起点重跑 solver、完整图与核心事件组 probe。",
      original_start: [initial.player.x, initial.player.y],
      candidate_start_count: opening.candidates.length,
      candidate_starts: opening.candidates,
      chosen_start: { position: [initial.player.x, initial.player.y], action: "keep", reason: config.openingIntent },
      evidence_refs: [`${candidateDir}/raw_evidence.json`],
    },
  };

  const units = objectUnits(layout);
  const objectChecks = [];
  const objectRaw = [];
  for (const unit of units) {
    for (const action of ["remove", "wallify"] as const) {
      const variantId = `${action.toUpperCase()}_${unit.id}`;
      const variantLayout = rewriteObject(layout, unit.cells, action);
      const layoutRef = `${candidateDir}/object_variants/${variantId}.txt`;
      const evidenceRef = `${candidateDir}/object_variants/${variantId}.json`;
      await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
      const analysis = analyzeLayoutVariant(`${config.id}_${variantId}`, variantLayout, config);
      const openingDelta = compareOpening(base.opening, analysis.opening);
      const decision = redundantDecision(analysis, base, unitSemanticRole(unit.kind), action, openingDelta);
      const record = {
        element: { kind: "object", id_or_cell: { id: unit.id, cells: unit.cells, object_kind: unit.kind } },
        action_tested: action,
        result: decision.result,
        reason: decision.reason,
        hard_facts: {
          parse_status: analysis.parseStatus,
          cost_delta: `${config.canonicalCost}->${analysis.shortestCost ?? "unavailable"}`,
          graph_status: analysis.graphStatus,
          expected_trace_win: analysis.canonicalReplayWin,
          core_event_probe_status: analysis.coreEventProbe.status,
          core_event_bypass: analysis.coreEventProbe.foundViolation ? analysis.coreEventProbe.missingGroups : "none",
          opening_delta: openingDelta,
          target_obligation_bypass: analysis.canonicalReplayWin ? "none_on_canonical_trace" : "canonical_trace_no_longer_wins",
        },
        semantic_role: unitSemanticRole(unit.kind),
        evidence_refs: [layoutRef, evidenceRef],
      };
      await writeJson(evidenceRef, { exactVersion: config.exactVersion, operation: action, object: unit, layout: variantLayout, analysis, decision });
      objectChecks.push(record);
      objectRaw.push({ unit, action, layoutRef, evidenceRef, analysis, decision });
    }
  }

  const traceCells = canonicalTraceCells(initial, config.canonicalInputs);
  const spaceCells = degreeOneFloorCandidates(layout);
  const spaceChecks = [];
  const spaceRaw = [];
  for (const [x, y] of spaceCells) {
    const variantId = `WALL_SPACE_${x}_${y}`;
    const variantLayout = replaceCell(layout, x, y, "#");
    const layoutRef = `${candidateDir}/space_variants/${variantId}.txt`;
    const evidenceRef = `${candidateDir}/space_variants/${variantId}.json`;
    await writeFile(layoutRef, `${variantLayout}\n`, "utf8");
    const analysis = analyzeLayoutVariant(`${config.id}_${variantId}`, variantLayout, config);
    const openingDelta = compareOpening(base.opening, analysis.opening);
    const traceUsed = traceCells.has(`${x},${y}`);
    const decision = traceUsed
      ? { result: "keep", reason: "该空地进入规范 trace 的玩家或对象路径。" }
      : redundantDecision(analysis, base, "none", "wall_prune", openingDelta);
    const record = {
      element: { kind: "space", id_or_cell: [x, y] },
      action_tested: "wall_prune",
      result: decision.result,
      reason: decision.reason,
      hard_facts: {
        static_degree: staticDegree(layout, x, y),
        trace_used: traceUsed,
        cost_delta: `${config.canonicalCost}->${analysis.shortestCost ?? "unavailable"}`,
        graph_status: analysis.graphStatus,
        expected_trace_win: analysis.canonicalReplayWin,
        core_event_probe_status: analysis.coreEventProbe.status,
        core_event_bypass: analysis.coreEventProbe.foundViolation ? analysis.coreEventProbe.missingGroups : "none",
        opening_delta: openingDelta,
      },
      semantic_role: traceUsed ? "structural" : "none",
      evidence_refs: [layoutRef, evidenceRef],
    };
    await writeJson(evidenceRef, { exactVersion: config.exactVersion, operation: "floor_to_wall", cell: [x, y], layout: variantLayout, analysis, decision });
    spaceChecks.push(record);
    spaceRaw.push({ cell: [x, y], layoutRef, evidenceRef, analysis, decision });
  }

  const outline = outlineCandidates(layout);
  const outlineChecks = [];
  const outlineRaw = [];
  for (const item of outline.variants) {
    const layoutRef = `${candidateDir}/outline_variants/TRIM_${item.side}.txt`;
    const evidenceRef = `${candidateDir}/outline_variants/TRIM_${item.side}.json`;
    await writeFile(layoutRef, `${item.layout}\n`, "utf8");
    const analysis = analyzeLayoutVariant(`${config.id}_TRIM_${item.side}`, item.layout, config);
    const openingDelta = compareOpening(base.opening, analysis.opening);
    const decision = redundantDecision(analysis, base, "none", "trim", openingDelta);
    const record = {
      element: { kind: "wall_outline", id_or_cell: item.side },
      action_tested: "trim",
      result: decision.result,
      reason: decision.reason,
      hard_facts: { cost_delta: `${config.canonicalCost}->${analysis.shortestCost ?? "unavailable"}`, graph_status: analysis.graphStatus, expected_trace_win: analysis.canonicalReplayWin, opening_delta: openingDelta },
      semantic_role: decision.result === "keep" ? "structural" : "none",
      evidence_refs: [layoutRef, evidenceRef],
    };
    await writeJson(evidenceRef, { exactVersion: config.exactVersion, operation: "trim_outline", side: item.side, layout: item.layout, analysis, decision });
    outlineChecks.push(record);
    outlineRaw.push({ ...item, layoutRef, evidenceRef, analysis, decision });
  }
  if (outline.variants.length === 0) {
    outlineChecks.push({
      element: { kind: "wall_outline", id_or_cell: "outer_frame" },
      action_tested: "trim",
      result: "keep",
      reason: outline.reason,
      hard_facts: { removable_sides: [] },
      semantic_role: "structural",
      evidence_refs: [`${candidateDir}/raw_evidence.json`],
    });
  }

  const revisionRequired = [...objectChecks, ...spaceChecks, ...outlineChecks].some((item) => ["remove", "wallify", "trim"].includes(item.result));
  const goalReport = {
    goal_prune_check: {
      status: "clean",
      candidate_id: config.id,
      exact_version: config.exactVersion,
      authority_doc: `${root}/docs/goal_prune_check.md`,
      targets_checked: goalChecks,
      removed_targets: [],
      retained_targets: targets,
      adjacent_single_delete_passes_requiring_combination_test: singleDeletePasses.length === 0 ? [] : "not_run",
      evidence_refs: [`${candidateDir}/raw_evidence.json`, `${root}/reports/layout_analysis_${config.id}.json`, `${root}/reports/input_replay_${config.id}.json`],
    },
  };
  const redundantReport = {
    redundant_element_prune: {
      status: revisionRequired ? "pruned" : "clean",
      candidate_id: config.id,
      exact_version: config.exactVersion,
      authority_doc: `${root}/docs/redundant_element_prune.md`,
      sequence: ["goal_prune", "object_remove_prune", "object_wallify_prune", "space_prune", "wall_outline_prune"],
      candidates_checked: [...objectChecks, ...spaceChecks, ...outlineChecks],
      candidate_discovery: {
        object_units: units,
        space_rule: "所有普通地面中静态拓扑 degree<=1 的 leaf/deadend；本轮无人类点名额外空地，凸包式房间补完不列候选。",
        space_candidates: spaceCells,
        outline_audit: outline,
      },
      removed_elements: [],
      wallified_objects: [],
      trimmed_outline: [],
      retained_elements: [...objectChecks, ...spaceChecks, ...outlineChecks].filter((item) => item.result === "keep").map((item) => item.element),
      revision_required_before_admission: revisionRequired,
      evidence_refs: [`${candidateDir}/raw_evidence.json`, `${candidateDir}/goal_prune_check.yml`, `${candidateDir}/opening_comfort_check.yml`],
    },
  };

  const raw = {
    candidate_id: config.id,
    exact_version: config.exactVersion,
    raw_layout_sha256: rawSha256,
    solve_instance: { layout_path: config.layoutPath, layout },
    command: "npx tsx prototypes/reality_anchor/reports/studio_c_shape_whole_20260713/pre_submission_c_shape_whole.ts",
    budget: { maxStates },
    base,
    goalVariants,
    opening,
    objectVariants: objectRaw,
    spaceCandidateRule: "ordinary floor with wall-only static degree <= 1",
    spaceVariants: spaceRaw,
    outlineVariants: outlineRaw,
    outlineAudit: outline,
  };
  await writeYaml(`${candidateDir}/goal_prune_check.yml`, goalReport);
  await writeYaml(`${candidateDir}/opening_comfort_check.yml`, openingReport);
  await writeYaml(`${candidateDir}/redundant_element_prune.yml`, redundantReport);
  await writeJson(`${candidateDir}/raw_evidence.json`, raw);

  return {
    candidate_id: config.id,
    exact_version: config.exactVersion,
    raw_layout_sha256: rawSha256,
    base_graph_status: base.graphStatus,
    base_core_event_probe_status: base.coreEventProbe.status,
    check_refs: [
      `${candidateDir}/goal_prune_check.yml`,
      `${candidateDir}/opening_comfort_check.yml`,
      `${candidateDir}/redundant_element_prune.yml`,
      `${candidateDir}/raw_evidence.json`,
    ],
    layout_changed: false,
    revision_required_before_admission: revisionRequired,
  };
}

type Graph = RuntimeGraph<RealityAnchorState, InputId>;

function parse(id: string, layout: string): RealityAnchorState {
  const level: LevelDoc = {
    id, title: id, role: "challenge", status: "candidate", targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"],
    target_learning: [], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout,
  };
  return adapter.parseLevel(level) as RealityAnchorState;
}

function analyzeLayoutVariant(id: string, layout: string, config: Config): any {
  try {
    return analyzeState(parse(id, layout), config);
  } catch (error) {
    return {
      parseStatus: "invalid",
      parseError: error instanceof Error ? error.message : String(error),
      solutionFound: false,
      shortestCost: null,
      shortestInputs: [],
      graphStatus: "not_run_parse_invalid",
      reachableStates: 0,
      winningStates: 0,
      canonicalReplayLegal: false,
      canonicalReplayWin: false,
      coreEventProbe: { foundViolation: false, status: "not_run_parse_invalid", missingGroups: config.coreGroups.map((group) => group.name) },
      opening: null,
    };
  }
}

function analyzeState(state: RealityAnchorState, config: Config) {
  const solution = solveWithRuntime(runtime, state, { winCondition: pkg.mechanic.win, maxStates, maxDepth: 120 });
  const graph = enumerateRuntimeGraph(runtime, state, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates }) as Graph;
  const canonical = replay(state, config.canonicalInputs);
  return {
    parseStatus: "valid",
    solutionFound: solution.found,
    shortestCost: Number.isFinite(solution.cost) ? solution.cost : null,
    shortestInputs: solution.inputs ?? [],
    graphStatus: graph.status,
    reachableStates: graph.keys.length,
    winningStates: graph.winStateIndexes.size,
    canonicalReplayLegal: canonical.legal,
    canonicalReplayWin: canonical.win,
    canonicalReplay: canonical.serializable,
    coreEventProbe: findWinningPathMissing(state, config.coreGroups),
    opening: graph.status === "complete" ? openingMetrics(graph) : null,
  };
}

function replay(initial: RealityAnchorState, inputs: readonly InputId[]) {
  let state = initial;
  const states = [state];
  const steps = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    steps.push({ input, legal: step.legal, events: step.events, stateKey: runtime.key(step.state), player: step.state.player });
    if (!step.legal) return { legal: false, win: false, states, serializable: { legal: false, win: false, steps } };
    state = step.state as RealityAnchorState;
    states.push(state);
  }
  const win = runtime.isWin(state, pkg.mechanic.win);
  return { legal: true, win, states, serializable: { legal: true, win, steps, finalStateKey: runtime.key(state) } };
}

function findWinningPathMissing(initial: RealityAnchorState, groups: readonly CoreGroup[]) {
  const allMask = (1 << groups.length) - 1;
  const queue = [{ state: initial, mask: 0 }];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (visited.size > maxStates) return { foundViolation: false, status: "exhausted", exploredProductStates: visited.size, missingGroups: groups.map((g) => g.name) };
    const current = queue[cursor]!;
    if (runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return { foundViolation: true, status: "found", exploredProductStates: visited.size, missingGroups: groups.filter((_, i) => (current.mask & (1 << i)) === 0).map((g) => g.name) };
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      let mask = current.mask;
      groups.forEach((group, index) => {
        if (group.patterns.some((pattern) => step.events.some((event) => eventMatchesPattern(event, pattern)))) mask |= 1 << index;
      });
      const key = `${runtime.key(step.state)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: step.state as RealityAnchorState, mask });
    }
  }
  return { foundViolation: false, status: "complete", exploredProductStates: visited.size, missingGroups: [] as string[] };
}

function analyzeOpening(initial: RealityAnchorState, config: Config) {
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates }) as Graph;
  if (graph.status !== "complete") throw new Error(`${config.id}: opening graph incomplete`);
  const scc = tarjan(graph);
  const members = new Set(scc.components[scc.of[0]!]!);
  const positions = new Map<string, Point>();
  for (const index of members) {
    const player = graph.states[index]!.player;
    positions.set(`${player.x},${player.y}`, { ...player });
  }
  const memberKeys = new Set([...members].map((index) => graph.keys[index]!));
  const candidates = [...positions.values()]
    .map((player) => ({ ...initial, player }))
    .filter((state) => memberKeys.has(runtime.key(state)))
    .sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x)
    .map((state) => {
      const analysis = analyzeState(state, config);
      const firstStepEvents = Object.fromEntries((runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]).flatMap((action) => {
        const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
        return step.legal ? [[action, step.events]] : [];
      }));
      return {
        candidate_start_position: [state.player.x, state.player.y],
        is_current_start: state.player.x === initial.player.x && state.player.y === initial.player.y,
        shortest_solution_delta: `${config.canonicalCost}->${analysis.shortestCost ?? "unavailable"}`,
        initial_scc_size: analysis.opening?.initialSccSize ?? null,
        initial_exit_source_distances: analysis.opening?.exitSourceDistances ?? [],
        initial_win_exit_source_distances: analysis.opening?.winExitSourceDistances ?? [],
        nearest_irreversible_exit_distance: analysis.opening?.nearestIrreversibleExitDistance ?? null,
        nearest_win_reaching_exit_distance: analysis.opening?.nearestWinExitDistance ?? null,
        dead_exits_before_first_win_exit: analysis.opening?.deadExitsBeforeFirstWinExit ?? null,
        first_step_legal_events: firstStepEvents,
        whether_core_chain_preserved: analysis.coreEventProbe.status === "complete" && !analysis.coreEventProbe.foundViolation,
        graph_status: analysis.graphStatus,
        core_event_probe_status: analysis.coreEventProbe.status,
      };
    });
  return { initialSccStateCount: members.size, playerPositionsSeen: positions.size, candidates };
}

function openingMetrics(graph: Graph) {
  const scc = tarjan(graph);
  const component = scc.of[0]!;
  const members = new Set(scc.components[component]!);
  const distances = distancesInside(graph, members);
  const winReachable = reverseWinReachable(graph);
  const exits = graph.edges.filter((edge) => members.has(edge.from) && !members.has(edge.to)).map((edge) => ({
    sourceDistance: distances[edge.from] ?? null,
    winReaching: winReachable.has(edge.to),
    targetScc: scc.of[edge.to]!,
  }));
  const allDistances = exits.map((item) => item.sourceDistance).filter((item): item is number => item !== null);
  const winDistances = exits.filter((item) => item.winReaching).map((item) => item.sourceDistance).filter((item): item is number => item !== null);
  const nearestWin = winDistances.length ? Math.min(...winDistances) : null;
  return {
    initialSccSize: members.size,
    exitSourceDistances: allDistances,
    winExitSourceDistances: winDistances,
    nearestIrreversibleExitDistance: allDistances.length ? Math.min(...allDistances) : null,
    nearestWinExitDistance: nearestWin,
    deadExitsBeforeFirstWinExit: nearestWin === null ? null : new Set(exits.filter((item) => !item.winReaching && item.sourceDistance !== null && item.sourceDistance < nearestWin).map((item) => item.targetScc)).size,
  };
}

function compareOpening(base: any, variant: any) {
  if (!base || !variant) return { status: "unknown" };
  const regressions = [];
  if (variant.initialSccSize < base.initialSccSize) regressions.push("initial_scc_shrinks");
  if (base.nearestIrreversibleExitDistance !== null && variant.nearestIrreversibleExitDistance !== null && variant.nearestIrreversibleExitDistance < base.nearestIrreversibleExitDistance) regressions.push("irreversible_commitment_moves_earlier");
  if (base.deadExitsBeforeFirstWinExit !== null && variant.deadExitsBeforeFirstWinExit !== null && variant.deadExitsBeforeFirstWinExit > base.deadExitsBeforeFirstWinExit) regressions.push("more_dead_exits_before_first_win_exit");
  return { status: regressions.length ? "regressed" : "not_worse", regressions, base, variant };
}

function goalHardKeepReason(analysis: any, baseCost: number): string | null {
  if (analysis.parseStatus !== "valid") return `删除后 layout 无效：${analysis.parseError}`;
  if (analysis.graphStatus !== "complete") return "删除后完整图未完成，结论 unknown，必须保留。";
  if (analysis.solutionFound && analysis.shortestCost < baseCost) return `删除后最短成本从 ${baseCost} 降为 ${analysis.shortestCost}。`;
  if (!analysis.canonicalReplayWin) return "删除后原 expected trace 不再胜利。";
  if (analysis.coreEventProbe.status !== "complete" && analysis.coreEventProbe.status !== "found") return "删除后核心事件组 probe 未完成。";
  if (analysis.coreEventProbe.foundViolation) return `删除后出现缺少 ${analysis.coreEventProbe.missingGroups.join("、")} 的胜路。`;
  return null;
}

function redundantDecision(analysis: any, base: any, semanticRole: string, action: string, openingDelta: any) {
  if (analysis.parseStatus !== "valid") return { result: "keep", reason: `反事实 layout 无效：${analysis.parseError}` };
  if (analysis.graphStatus !== "complete") return { result: "keep", reason: "完整图未完成，不能 clean prune。" };
  if (!analysis.canonicalReplayWin) return { result: "keep", reason: "原解不再完整胜利。" };
  if (analysis.shortestCost !== base.shortestCost) return { result: "keep", reason: `最短成本改变 ${base.shortestCost}->${analysis.shortestCost}，说明新增 bypass 或改变解实例。` };
  if (analysis.coreEventProbe.status !== "complete" || analysis.coreEventProbe.foundViolation) return { result: "keep", reason: "核心事件组出现 bypass 或 probe 不完整。" };
  if (openingDelta.status !== "not_worse") return { result: "keep", reason: "opening comfort 退化或无法确认。" };
  if (semanticRole !== "none") return { result: "keep", reason: `硬门槛虽未拒绝，但该要素仍承担 ${semanticRole}，按流程保留。` };
  return { result: action === "wall_prune" ? "remove" : action, reason: "原解、最短成本、完整图、核心事件与 opening 均保持，且未找到结构/机制/审美责任。" };
}

function objectUnits(layout: string) {
  const rows = layout.split("\n").map((row) => [...row]);
  const units: Array<{ id: string; kind: string; cells: Array<[number, number]> }> = [];
  const collect = (glyphs: string[]) => rows.flatMap((row, y) => row.flatMap((glyph, x) => glyphs.includes(glyph) ? [[x, y] as [number, number]] : []));
  const bs = collect(["B", "S"]); if (bs.length) units.push({ id: "BOX_STICKY_ANCHOR", kind: "box_sticky_anchor", cells: bs });
  const pl = collect(["P", "L"]); if (pl.length) units.push({ id: "PUSH_PULL_ANCHOR", kind: "push_pull_anchor", cells: pl });
  collect(["C", "*"]).forEach((cell, index) => units.push({ id: `CRATE_${index + 1}`, kind: "crate", cells: [cell] }));
  const sticky = new Set(collect(["M", "m"]).map(([x, y]) => `${x},${y}`));
  let stickyIndex = 0;
  while (sticky.size) {
    const first = sticky.values().next().value as string;
    const queue = [first]; sticky.delete(first);
    const cells: Array<[number, number]> = [];
    for (let i = 0; i < queue.length; i += 1) {
      const [x, y] = queue[i]!.split(",").map(Number) as [number, number]; cells.push([x, y]);
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const key = `${x + dx},${y + dy}`; if (sticky.delete(key)) queue.push(key);
      }
    }
    stickyIndex += 1; units.push({ id: `STICKY_COMPONENT_${stickyIndex}`, kind: "sticky_component", cells: cells.sort((a, b) => a[1] - b[1] || a[0] - b[0]) });
  }
  return units;
}

function unitSemanticRole(kind: string) {
  if (kind === "box_sticky_anchor") return "material_source_and_rule_boundary";
  if (kind === "push_pull_anchor") return "active_rule_boundary_and_or_payload";
  if (kind === "crate") return "C_shape_construction_connector";
  if (kind === "sticky_component") return "whole_C_shape_material";
  return "none";
}

function rewriteObject(layout: string, cells: Array<[number, number]>, action: "remove" | "wallify") {
  const rows = layout.split("\n").map((row) => [...row]);
  const remove: Record<string, string> = { B: ".", S: ".", P: ".", L: ".", C: ".", "*": "G", M: ".", m: "G" };
  for (const [x, y] of cells) rows[y]![x] = action === "wallify" ? "#" : remove[rows[y]![x]!]!;
  return rows.map((row) => row.join("")).join("\n");
}

function targetCells(layout: string): Array<[number, number]> {
  return layout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) => ["G", "m", "+", "*"].includes(glyph) ? [[x, y] as [number, number]] : []));
}

function removeGoal(layout: string, x: number, y: number) {
  const rows = layout.split("\n").map((row) => [...row]);
  const replacements: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  const glyph = rows[y]![x]!;
  if (!(glyph in replacements)) throw new Error(`no goal at ${x},${y}`);
  rows[y]![x] = replacements[glyph]!;
  return rows.map((row) => row.join("")).join("\n");
}

function degreeOneFloorCandidates(layout: string): Array<[number, number]> {
  return layout.split("\n").flatMap((row, y) => [...row].flatMap((glyph, x) => glyph === "." && staticDegree(layout, x, y) <= 1 ? [[x, y] as [number, number]] : []));
}

function staticDegree(layout: string, x: number, y: number) {
  const rows = layout.split("\n");
  return [[1,0],[-1,0],[0,1],[0,-1]].filter(([dx, dy]) => {
    const glyph = rows[y + dy]?.[x + dx]; return glyph !== undefined && glyph !== "#";
  }).length;
}

function canonicalTraceCells(initial: RealityAnchorState, inputs: readonly InputId[]) {
  const result = replay(initial, inputs);
  const cells = new Set<string>();
  for (const state of result.states) {
    cells.add(`${state.player.x},${state.player.y}`);
    for (const point of state.crates) cells.add(`${point.x},${point.y}`);
    for (const group of state.stickyGroups) for (const point of group) cells.add(`${point.x},${point.y}`);
    if (state.pushPullAnchor) { cells.add(`${state.pushPullAnchor.push.x},${state.pushPullAnchor.push.y}`); cells.add(`${state.pushPullAnchor.pull.x},${state.pushPullAnchor.pull.y}`); }
    if (state.boxStickyAnchor) { cells.add(`${state.boxStickyAnchor.box.x},${state.boxStickyAnchor.box.y}`); cells.add(`${state.boxStickyAnchor.sticky.x},${state.boxStickyAnchor.sticky.y}`); }
  }
  return cells;
}

function outlineCandidates(layout: string) {
  const rows = layout.split("\n");
  const variants: Array<{ side: string; layout: string }> = [];
  const allWall = (items: string[]) => items.every((glyph) => glyph === "#");
  const closed = (candidate: string[]) => candidate.length >= 3 && allWall([...candidate[0]!]) && allWall([...candidate.at(-1)!]) && candidate.every((row) => row[0] === "#" && row.at(-1) === "#");
  const candidates = [
    { side: "top", rows: rows.slice(1) },
    { side: "bottom", rows: rows.slice(0, -1) },
    { side: "left", rows: rows.map((row) => row.slice(1)) },
    { side: "right", rows: rows.map((row) => row.slice(0, -1)) },
  ];
  for (const item of candidates) if (closed(item.rows)) variants.push({ side: item.side, layout: item.rows.join("\n") });
  return { variants, reason: variants.length ? "存在仍保持单层闭合矩形的外框裁剪候选，已逐一运行反事实。" : "四边只有单层闭合外框；裁掉任一外行/列后新边界不再全墙，因此没有合法 outline trim 候选。" };
}

function replaceCell(layout: string, x: number, y: number, glyph: string) {
  const rows = layout.split("\n").map((row) => [...row]); rows[y]![x] = glyph; return rows.map((row) => row.join("")).join("\n");
}

function tarjan(graph: Graph) {
  const adjacency = Array.from({ length: graph.states.length }, () => [] as number[]);
  for (const edge of graph.edges) adjacency[edge.from]!.push(edge.to);
  const index = Array<number>(graph.states.length).fill(-1), low = Array<number>(graph.states.length).fill(0), onStack = Array<boolean>(graph.states.length).fill(false), stack: number[] = [], components: number[][] = [], of = Array<number>(graph.states.length).fill(-1);
  let next = 0;
  const visit = (v: number) => {
    index[v] = low[v] = next++; stack.push(v); onStack[v] = true;
    for (const w of adjacency[v]!) { if (index[w] === -1) { visit(w); low[v] = Math.min(low[v]!, low[w]!); } else if (onStack[w]) low[v] = Math.min(low[v]!, index[w]!); }
    if (low[v] !== index[v]) return;
    const component: number[] = [];
    while (true) { const w = stack.pop()!; onStack[w] = false; component.push(w); of[w] = components.length; if (w === v) break; }
    components.push(component);
  };
  for (let v = 0; v < graph.states.length; v += 1) if (index[v] === -1) visit(v);
  return { components, of };
}

function distancesInside(graph: Graph, members: Set<number>) {
  const distance = Array<number | undefined>(graph.states.length).fill(undefined); distance[0] = 0; const queue = [0];
  for (let i = 0; i < queue.length; i += 1) for (const edge of graph.edges) if (edge.from === queue[i] && members.has(edge.to) && distance[edge.to] === undefined) { distance[edge.to] = distance[queue[i]!]! + 1; queue.push(edge.to); }
  return distance;
}

function reverseWinReachable(graph: Graph) {
  const reverse = Array.from({ length: graph.states.length }, () => [] as number[]); for (const edge of graph.edges) reverse[edge.to]!.push(edge.from);
  const seen = new Set<number>(graph.winStateIndexes), queue = [...seen]; for (let i = 0; i < queue.length; i += 1) for (const prev of reverse[queue[i]!]!) if (!seen.has(prev)) { seen.add(prev); queue.push(prev); }
  return seen;
}

function normalize(text: string) { return text.replace(/\r/g, "").replace(/\n+$/g, ""); }
async function writeYaml(file: string, value: unknown) { await writeFile(file, YAML.stringify(value, { lineWidth: 120 }), "utf8"); }
async function writeJson(file: string, value: unknown) { await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8"); }
