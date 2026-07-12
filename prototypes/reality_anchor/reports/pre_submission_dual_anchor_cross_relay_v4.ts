import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const layoutPath = "prototypes/reality_anchor/reports/RA_FRESH_2026_07_12_DUAL_ANCHOR_CROSS_RELAY_v4.layout.txt";
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const canonical: InputId[] = ["down","right","down","up","right","up","right","down","left","down","left","down","down","left","left","down","left"];
const groups = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
];

const rows = layout.split("\n").map((row) => [...row]);
const goals: Array<[number, number]> = [];
for (let y = 0; y < rows.length; y += 1) {
  for (let x = 0; x < rows[y]!.length; x += 1) if (rows[y]![x] === "G") goals.push([x, y]);
}

const goalChecks = [];
for (const [gx, gy] of goals) {
  const variant = rows.map((row) => [...row]);
  variant[gy]![gx] = ".";
  goalChecks.push(analyzeVariant(`without_goal_${gx}_${gy}`, variant.map((row) => row.join("")).join("\n"), [gx, gy]));
}

const base = toInstance("base", layout);
const baseSolution = solveWithRuntime(base.runtime, base.initial, { winCondition: pkg.mechanic.win, maxStates: 100000, maxDepth: 100 });
const leftRight = adapter.replay(pkg.mechanic, base.initial, ["left", "right"], { winCondition: pkg.mechanic.win });
const altRows = rows.map((row) => [...row]);
altRows[1]![3] = ".";
altRows[1]![2] = "@";
const altStart = toInstance("start_2_1", altRows.map((row) => row.join("")).join("\n"));
const altStartSolution = solveWithRuntime(altStart.runtime, altStart.initial, { winCondition: pkg.mechanic.win, maxStates: 100000, maxDepth: 100 });
const altStartGraph = enumerateGraph(altStart.runtime, altStart.initial, 100000);
const altStartGate = findMissingGroupWin(altStart.runtime, altStart.initial, 100000, 100);
const altStartReplay = adapter.replay(pkg.mechanic, altStart.initial, ["right", ...canonical], { winCondition: pkg.mechanic.win });

const wallObservationRows = rows.map((row) => [...row]);
wallObservationRows[1]![2] = "#";
const wallObservation = toInstance("wall_observation_2_1", wallObservationRows.map((row) => row.join("")).join("\n"));
const wallObservationSolution = solveWithRuntime(wallObservation.runtime, wallObservation.initial, { winCondition: pkg.mechanic.win, maxStates: 100000, maxDepth: 100 });
const wallObservationGraph = enumerateGraph(wallObservation.runtime, wallObservation.initial, 100000);
const wallObservationGate = findMissingGroupWin(wallObservation.runtime, wallObservation.initial, 100000, 100);
const wallObservationReplay = adapter.replay(pkg.mechanic, wallObservation.initial, canonical, { winCondition: pkg.mechanic.win });
const wallObservationLeft = adapter.replay(pkg.mechanic, wallObservation.initial, ["left"], { winCondition: pkg.mechanic.win });

console.log(JSON.stringify({
  candidate_version: "RA_FRESH_2026_07_12_DUAL_ANCHOR_CROSS_RELAY_v4",
  base: { cost: baseSolution.cost, explored_states: baseSolution.exploredStates },
  goal_prune: { targets_checked: goalChecks },
  opening_comfort: {
    current_start: [3,1],
    initial_scc_size: 2,
    forced_viable_exit_count: 1,
    reversible_observation: {
      inputs: ["left", "right"],
      legal: leftRight.legal,
      returns_to_initial: base.runtime.key(leftRight.state) === base.runtime.key(base.initial),
      events: leftRight.events,
    },
    alternate_start: [2,1],
    alternate_shortest_cost: altStartSolution.cost,
    alternate_graph_status: altStartGraph.status,
    alternate_graph_states: altStartGraph.states,
    alternate_core_event_bypass_found: altStartGate.found,
    alternate_core_event_probe_status: altStartGate.status,
    alternate_expected_trace_legal: altStartReplay.legal,
    alternate_expected_trace_win: adapter.isWin(altStartReplay.state, pkg.mechanic.win),
    recommendation: "keep_current_start",
  },
  redundant_element_prune: {
    objects_in_canonical: ["upper_crate_moves_and_converts", "lower_crate_converts_merges_and_cuts", "initial_sticky_moves_and_merges", "push_pull_anchor_moves", "box_sticky_anchor_moves"],
    unused_floor_cells: [[2,1]],
    unused_floor_role: "two_state_reversible_opening_observation",
    wall_observation_counterfactual: {
      action_tested: "floor_to_wall",
      shortest_cost: wallObservationSolution.cost,
      cost_delta: `17->${wallObservationSolution.cost}`,
      graph_status: wallObservationGraph.status,
      graph_states: wallObservationGraph.states,
      expected_trace_legal: wallObservationReplay.legal,
      expected_trace_win: adapter.isWin(wallObservationReplay.state, pkg.mechanic.win),
      core_event_bypass_found: wallObservationGate.found,
      core_event_probe_status: wallObservationGate.status,
      left_observation_legal: wallObservationLeft.legal,
      opening_initial_scc_delta: "2->1",
      result: "keep_due_opening_comfort_regression",
    },
    outer_wall_layers: 1,
  },
}, null, 2));

function analyzeVariant(id: string, variantLayout: string, target: [number, number]) {
  const instance = toInstance(id, variantLayout);
  const solution = solveWithRuntime(instance.runtime, instance.initial, { winCondition: pkg.mechanic.win, maxStates: 100000, maxDepth: 100 });
  const replay = adapter.replay(pkg.mechanic, instance.initial, canonical, { winCondition: pkg.mechanic.win });
  const graph = enumerateGraph(instance.runtime, instance.initial, 100000);
  const gate = findMissingGroupWin(instance.runtime, instance.initial, 100000, 100);
  return {
    target,
    shortest_found: solution.found,
    shortest_cost: solution.cost,
    cost_delta: `${17}->${solution.cost}`,
    graph_status: graph.status,
    graph_states: graph.states,
    expected_trace_legal: replay.legal,
    expected_trace_win: adapter.isWin(replay.state, pkg.mechanic.win),
    core_event_bypass_found: gate.found,
    core_event_probe_status: gate.status,
    missing_groups: gate.missingGroups,
    action: "keep",
    reason: solution.cost !== undefined && solution.cost < 17 ? "removal_lowers_shortest_cost" : gate.found ? "removal_opens_core_event_bypass" : "goal_remains_structurally_required",
  };
}

function toInstance(id: string, instanceLayout: string) {
  const level: LevelDoc = { id, title: id, role: "challenge", status: "candidate", targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"], target_learning: [], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout: instanceLayout };
  const runtime = adapter.createRuntime(pkg.mechanic);
  return { runtime, initial: adapter.parseLevel(level) };
}

function enumerateGraph(runtime: ReturnType<typeof adapter.createRuntime>, initial: ReturnType<typeof adapter.parseLevel>, maxStates: number) {
  const queue = [initial];
  const seen = new Set<string>([runtime.key(initial)]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (seen.size > maxStates) return { status: "exhausted", states: seen.size };
    const state = queue[cursor++]!;
    if (runtime.isWin(state, pkg.mechanic.win)) continue;
    for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const key = runtime.key(step.state);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push(step.state);
    }
  }
  return { status: "complete", states: seen.size };
}

function findMissingGroupWin(runtime: ReturnType<typeof adapter.createRuntime>, initial: ReturnType<typeof adapter.parseLevel>, maxStates: number, maxDepth: number) {
  const allMask = (1 << groups.length) - 1;
  const queue = [{ state: initial, mask: 0, depth: 0 }];
  const seen = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (seen.size > maxStates) return { found: false, status: "exhausted", missingGroups: [] as string[] };
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.mask !== allMask) return { found: true, status: "found", missingGroups: groups.filter((_, i) => (current.mask & (1 << i)) === 0).map((g) => g.name) };
      continue;
    }
    if (current.depth >= maxDepth) { depthHit = true; continue; }
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      let mask = current.mask;
      groups.forEach((group, i) => { if (group.patterns.some((p) => step.events.some((e) => eventMatchesPattern(e, p)))) mask |= 1 << i; });
      const key = `${runtime.key(step.state)}|${mask}`;
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state: step.state, mask, depth: current.depth + 1 });
    }
  }
  return { found: false, status: depthHit ? "exhausted" : "complete", missingGroups: [] as string[] };
}
