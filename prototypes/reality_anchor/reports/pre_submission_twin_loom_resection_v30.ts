import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import { pointKey, stateKey, type RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import type { Direction, LevelDoc } from "../../../src/core/types.js";

const root = "prototypes/reality_anchor";
const id = process.argv[2] ?? "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v30";
const pkg = await loadPrototypePackage(root);
const layout = (await readFile(`${root}/reports/${id}.layout.txt`, "utf8")).trimEnd();
const canonical: Direction[] = ["right", "right", "up", "up", "up", "right", "right", "right", "up", "up", "up", "up", "left", "right", "up", "left", "left", "up", "right", "right", "down", "down", "down", "down", "right", "down", "down", "left", "left", "left", "up", "down"];
const targets: Array<[number, number]> = layout.split("\n").flatMap((row, y) => [...row].flatMap((cell, x) => cell === "G" ? [[x, y] as [number, number]] : []));
const originalCost = 32;
const checks = [];
for (const target of targets) {
  const variantLayout = removeGoal(layout, target);
  const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
  const initial = realityAnchorAdapter.parseLevel(level(variantLayout, `remove_${target.join("_")}`));
  const solution = solveWithRuntime(runtime, initial, { winCondition: pkg.mechanic.win, maxStates: 1_200_000, maxDepth: 1000 });
  const replay = replayInputs(runtime, initial, canonical);
  const graph = enumerate(runtime, initial, 1_200_000);
  let coreEventBypass: string | "none" = "none";
  if (solution.found && solution.cost! >= originalCost && graph.status === "complete" && replay.legal && replay.win && graph.objectGroups === 1) {
    coreEventBypass = scanCoreBypass(runtime, initial, 1_200_000);
  }
  const reasons: string[] = [];
  if (!solution.found) reasons.push("删除后无解");
  if (solution.found && solution.cost! < originalCost) reasons.push(`最短成本下降 ${originalCost}->${solution.cost}`);
  if (graph.status !== "complete") reasons.push("完整图未知");
  if (!replay.legal || !replay.win) reasons.push("原 expected trace 不再合法获胜");
  if (graph.objectGroups > 1) reasons.push(`产生 ${graph.objectGroups} 个 winning object configurations`);
  if (coreEventBypass !== "none") reasons.push(`出现核心事件绕过: ${coreEventBypass}`);
  checks.push({
    target,
    action: reasons.length === 0 ? "remove" : "keep",
    reason: reasons.length === 0 ? "满足全部可删除条件" : reasons.join("；"),
    cost_delta: `${originalCost}->${solution.found ? solution.cost : "no_solution"}`,
    graph_status: graph.status,
    reachable_states: graph.states,
    winning_states: graph.winners,
    winning_object_configuration_groups: graph.objectGroups,
    expected_trace_win: replay.legal && replay.win,
    core_event_bypass: coreEventBypass,
  });
}
const removed = checks.filter((check) => check.action === "remove").map((check) => check.target);
const report = {
  goal_prune_check: {
    candidate_id: id,
    status: removed.length ? "pruned" : "clean",
    targets_checked: checks,
    removed_targets: removed,
    retained_targets: checks.filter((check) => check.action === "keep").map((check) => check.target),
    evidence_refs: [
      `${root}/reports/layout_analysis_${id}.json`,
      `${root}/reports/${id}_event_gate_report.yml`,
    ],
  },
};
await writeFile(`${root}/reports/${id}_goal_prune_check.yml`, stringify(report), "utf8");
console.log(JSON.stringify(report, null, 2));

function level(value: string, suffix: string): LevelDoc {
  return { id: `${id}_${suffix}`, title: `${id}_${suffix}`, layout: value, win: pkg.mechanic.win };
}

function removeGoal(value: string, [x, y]: [number, number]) {
  const rows = value.split("\n").map((row) => [...row]);
  const replacement: Record<string, string> = { G: ".", "*": "C", m: "M", "+": "@" };
  rows[y]![x] = replacement[rows[y]![x]!] ?? rows[y]![x]!;
  return rows.map((row) => row.join("")).join("\n");
}

function replayInputs(runtime: ReturnType<typeof realityAnchorAdapter.createRuntime>, initial: RealityAnchorState, inputs: Direction[]) {
  let state = initial;
  for (const input of inputs) {
    const transition = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!transition.legal) return { legal: false, win: false };
    state = transition.state;
  }
  return { legal: true, win: runtime.isWin(state, pkg.mechanic.win) };
}

function enumerate(runtime: ReturnType<typeof realityAnchorAdapter.createRuntime>, initial: RealityAnchorState, maxStates: number) {
  const states = new Map<string, RealityAnchorState>([[stateKey(initial), initial]]);
  const queue = [stateKey(initial)];
  const groups = new Set<string>();
  let winners = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (states.size > maxStates) return { status: "exhausted", states: states.size, winners, objectGroups: groups.size };
    const state = states.get(queue[cursor]!)!;
    if (runtime.isWin(state, pkg.mechanic.win)) { winners += 1; groups.add(objectKey(state)); continue; }
    for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win })) {
      const transition = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      if (!transition.legal) continue;
      const key = stateKey(transition.state);
      if (states.has(key)) continue;
      states.set(key, transition.state); queue.push(key);
    }
  }
  return { status: "complete", states: states.size, winners, objectGroups: groups.size };
}

function scanCoreBypass(runtime: ReturnType<typeof realityAnchorAdapter.createRuntime>, initial: RealityAnchorState, maxStates: number) {
  const patterns = ["anchor_boundary_shift:box_sticky", "box_to_sticky", "sticky_merge", "sticky_to_box", "sticky_split", "pull_object", "move_sticky_rigid"];
  const full = (1 << patterns.length) - 1;
  const items: Array<{ state: RealityAnchorState; mask: number }> = [{ state: initial, mask: 0 }];
  const visited = new Set<string>([`${stateKey(initial)}|0`]);
  for (let cursor = 0; cursor < items.length; cursor += 1) {
    if (visited.size > maxStates) return "unknown_budget";
    const item = items[cursor]!;
    if (runtime.isWin(item.state, pkg.mechanic.win) && item.mask !== full) {
      return patterns.filter((_, index) => (item.mask & (1 << index)) === 0).join(",");
    }
    if (runtime.isWin(item.state, pkg.mechanic.win)) continue;
    for (const action of runtime.actions(item.state, { winCondition: pkg.mechanic.win })) {
      const transition = runtime.step(item.state, action, { winCondition: pkg.mechanic.win });
      if (!transition.legal) continue;
      let mask = item.mask;
      for (const [index, pattern] of patterns.entries()) if (transition.events.some((event) => event === pattern || event.startsWith(`${pattern}:`))) mask |= 1 << index;
      const key = `${stateKey(transition.state)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key); items.push({ state: transition.state, mask });
    }
  }
  return "none";
}

function objectKey(state: RealityAnchorState) {
  return `C:${state.crates.map(pointKey).sort().join(";")}|M:${state.stickyGroups.map((group) => group.map(pointKey).sort().join(";")).sort().join("|")}`;
}
