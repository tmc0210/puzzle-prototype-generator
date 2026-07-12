import { readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const id = "RA_FRESH_2026_07_11_BRIDGE_SCISSOR_REWEAVE_v7";
const layoutPath = `${prototypePath}/reports/${id}.layout.txt`;
const canonicalInputs = [
  "up", "up", "up", "up", "right", "right", "down", "down", "down", "left", "left",
  "down", "right", "right", "up", "left", "up", "left", "up", "right", "right",
] as InputId[];
const targets = [[4, 2], [4, 3], [4, 4], [6, 2], [6, 3], [6, 4]] as const;

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");

const baseLevel = makeLevel(id, layout);
const initial = adapter.parseLevel(baseLevel);

const goalChecks = [];
for (const [x, y] of targets) {
  const variantLayout = removeGoal(layout, x, y);
  const state = adapter.parseLevel(makeLevel(`${id}_NO_GOAL_${x}_${y}`, variantLayout));
  const solution = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates: 300_000,
    maxDepth: 80,
  });
  const graph = analyzeGraphWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates: 100_000,
  });
  const replay = replayInputs(state, canonicalInputs);
  const costDrops = solution.found && (solution.cost ?? Number.POSITIVE_INFINITY) < 21;
  const reason = costDrops
    ? `shortest_cost_drops_21_to_${solution.cost}`
    : graph.status !== "complete"
      ? "graph_incomplete_so_prune_unknown"
      : !replay.win
        ? "canonical_trace_no_longer_wins"
        : "requires_core_event_probe_before_any_removal";
  goalChecks.push({
    target: [x, y],
    action: "keep",
    reason,
    cost_delta: `21->${solution.cost ?? "unavailable"}`,
    graph_status: graph.status,
    graph_states: graph.reachableStateCount,
    expected_trace_win: replay.win,
    core_event_bypass: costDrops || graph.status !== "complete" || !replay.win
      ? "not_run_due_prior_hard_gate"
      : "unknown_requires_probe",
  });
}

const goalPruneReport = {
  goal_prune_check: {
    status: goalChecks.every((item) => item.reason.startsWith("shortest_cost_drops")) ? "clean" : "kept_with_unknown",
    exact_candidate: id,
    targets_checked: goalChecks,
    removed_targets: [],
    retained_targets: targets.map(([x, y]) => [x, y]),
    evidence_refs: [
      `${prototypePath}/reports/layout_analysis_${id}.json`,
      `${prototypePath}/reports/trace_${id}_CANONICAL.json`,
      `${prototypePath}/reports/${id}_event_gate.json`,
    ],
    note: "固定顺序第1项。任一删除版本只要 cost 降低或 graph 不完整即按 authority doc 保留，不把 solver success 当删除许可。",
  },
};

const walkRegion = enumerateWalkOnlyRegion(initial);
const commitExits = [];
for (const item of walkRegion) {
  for (const action of runtime.actions(item.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(item.state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal || step.events.length === 0 || step.events.every((event) => event === "walk")) {
      continue;
    }
    commitExits.push({
      source_player: playerPosition(adapter.renderState(item.state as never)),
      walk_distance_from_start: item.distance,
      input: action,
      events: step.events,
    });
  }
}

const startComparisons = walkRegion.map((item) => {
  const solution = solveWithRuntime(runtime, item.state, {
    winCondition: pkg.mechanic.win,
    maxStates: 300_000,
    maxDepth: 80,
  });
  return {
    candidate_start_position: playerPosition(adapter.renderState(item.state as never)),
    walk_distance_from_original: item.distance,
    shortest_solution_cost: solution.cost,
    shortest_solution_delta: solution.found && solution.cost !== undefined ? `${solution.cost - 21}` : "unknown",
    whether_core_chain_preserved: "unknown_without_per_start_event_gate",
  };
});

const openingReport = {
  opening_comfort_check: {
    status: "complete_with_graph_caveat",
    exact_candidate: id,
    original_start: [1, 6],
    initial_scc: {
      status: "unknown_due_main_graph_exhausted",
      note: "不把 walk-only region 冒充完整 SCC。",
    },
    walk_only_observation_region: {
      status: "complete",
      state_count: walkRegion.length,
      positions: walkRegion.map((item) => playerPosition(adapter.renderState(item.state as never))),
    },
    irreversible_or_mechanic_exits_from_walk_region: dedupe(commitExits),
    start_comparisons: startComparisons,
    chosen_start: {
      position: [1, 6],
      action: "keep",
      reason: "当前起点有完整 walk-only 观察区，同时把开局 right 的提前切割放在眼前作为真实诱惑；规范首次移动 C 形前有5步观察与站位。更近的起点会削弱这组先切/先让槽问题，且未有 per-start 核心事件门支持替换。",
    },
    graph_limit: "main graph exhausted; complete SCC metrics unavailable",
    evidence_refs: [
      `${prototypePath}/reports/layout_analysis_${id}.json`,
      `${prototypePath}/reports/prefix_dead_state_probe_RA_FRESH_2026_07_11_BRIDGE_SCISSOR_REWEAVE_v6_EARLY_CUT.json`,
    ],
  },
};

const redundantReport = {
  redundant_element_prune: {
    status: "pruned",
    exact_candidate: id,
    source_candidate: "RA_FRESH_2026_07_11_BRIDGE_SCISSOR_REWEAVE_v6",
    sequence: ["goal_prune", "object_remove_prune", "object_wallify_prune", "space_prune", "wall_outline_prune"],
    candidates_checked: [
      {
        element: { kind: "goal", id_or_cell: "all_six" },
        action_tested: "remove_each",
        result: "keep",
        reason: "见 exact v7 goal_prune_check；没有目标满足删除硬门。",
        semantic_role: "structural",
      },
      {
        element: { kind: "object", id_or_cell: "initial_C_shape" },
        action_tested: "remove_or_wallify_not_applicable",
        result: "keep",
        reason: "规范解先整体移动、再切出三箱与两端点、再重织；所有格参与核心形状变化。",
        semantic_role: "structural",
      },
      {
        element: { kind: "object", id_or_cell: "P/L_anchor" },
        action_tested: "remove_or_wallify_not_applicable",
        result: "keep",
        reason: "all-solution gate 要求 P/L shift 与 pull；规范解还用它回推中箱并覆盖左中目标。",
        semantic_role: "structural",
      },
      {
        element: { kind: "object", id_or_cell: "B/S_anchor" },
        action_tested: "remove_or_wallify_not_applicable",
        result: "keep",
        reason: "all-solution gate 要求 B/S shift、sticky_to_box 与 sticky_split。",
        semantic_role: "structural",
      },
      {
        element: { kind: "space", id_or_cell: "all_non_goal_floor" },
        action_tested: "wall_prune_visual_and_trace_audit",
        result: "keep",
        reason: "所有非目标空格属于玩家规范路径、P/L 三格下拉槽、B/S 横移轨道、P/L 回推站位或 opening observation region；主图不完整，不做额外 wall-prune。",
        semantic_role: "read_graph",
      },
      {
        element: { kind: "wall_outline", id_or_cell: "v6_left_2_columns_and_right_1_column" },
        action_tested: "trim",
        result: "trim",
        reason: "三列均为纯外墙；裁剪后 v7 是坐标平移同构，最短解、事件序列、事件门与 graph 前缀计数完全一致。",
        semantic_role: "none",
      },
      {
        element: { kind: "wall_outline", id_or_cell: "v7_outer_frame" },
        action_tested: "trim",
        result: "keep",
        reason: "v7 四边只剩一层闭合外框；继续裁剪会使可走格或对象直接接触版面边界。",
        semantic_role: "structural",
      },
    ],
    removed_elements: [],
    wallified_objects: [],
    trimmed_outline: ["from v6 trim two all-wall left columns and one all-wall right column"],
    retained_elements: [
      { kind: "goal", id_or_cell: "six targets", reason: "goal prune retained" },
      { kind: "object", id_or_cell: "C shape, P/L, B/S", reason: "core chain responsibility" },
      { kind: "space", id_or_cell: "all remaining floor", reason: "trace, anchor track, stand position, or opening role" },
    ],
    evidence_refs: [
      `${prototypePath}/reports/layout_analysis_RA_FRESH_2026_07_11_BRIDGE_SCISSOR_REWEAVE_v6.json`,
      `${prototypePath}/reports/layout_analysis_${id}.json`,
      `${prototypePath}/reports/${id}_event_gate.json`,
      `${prototypePath}/reports/trace_${id}_CANONICAL.json`,
    ],
  },
};

await writeYaml(`${prototypePath}/reports/${id}_goal_prune_check.yml`, goalPruneReport);
await writeYaml(`${prototypePath}/reports/${id}_opening_comfort_check.yml`, openingReport);
await writeYaml(`${prototypePath}/reports/${id}_redundant_element_prune.yml`, redundantReport);
console.log(`Wrote three pre-submission checks for ${id}`);

function makeLevel(levelId: string, levelLayout: string): LevelDoc {
  return {
    id: levelId,
    title: levelId,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: levelLayout,
  };
}

function removeGoal(source: string, x: number, y: number): string {
  const rows = source.split("\n").map((row) => [...row]);
  const glyph = rows[y]?.[x];
  const replacement: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  if (!glyph || !replacement[glyph]) {
    throw new Error(`No removable goal at ${x},${y}: '${glyph ?? "missing"}'`);
  }
  rows[y]![x] = replacement[glyph]!;
  return rows.map((row) => row.join("")).join("\n");
}

function replayInputs(state: typeof initial, inputs: InputId[]): { legal: boolean; win: boolean } {
  let current = state;
  for (const input of inputs) {
    const step = runtime.step(current, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) return { legal: false, win: false };
    current = step.state;
  }
  return { legal: true, win: runtime.isWin(current, pkg.mechanic.win) };
}

function enumerateWalkOnlyRegion(state: typeof initial): Array<{ state: typeof initial; distance: number }> {
  const queue = [{ state, distance: 0 }];
  const visited = new Set<string>([runtime.key(state)]);
  let cursor = 0;
  while (cursor < queue.length) {
    const current = queue[cursor++]!;
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal || step.events.some((event) => event !== "walk")) continue;
      const key = runtime.key(step.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: step.state, distance: current.distance + 1 });
    }
  }
  return queue;
}

function playerPosition(rendered: string): [number, number] | null {
  const rows = rendered.split("\n");
  for (let y = 0; y < rows.length; y += 1) {
    const at = rows[y]!.indexOf("@");
    if (at >= 0) return [at, y];
    const plus = rows[y]!.indexOf("+");
    if (plus >= 0) return [plus, y];
  }
  return null;
}

function dedupe<T>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = JSON.stringify(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function writeYaml(path: string, value: unknown): Promise<void> {
  await writeFile(path, YAML.stringify(value, { lineWidth: 120 }), "utf8");
}
