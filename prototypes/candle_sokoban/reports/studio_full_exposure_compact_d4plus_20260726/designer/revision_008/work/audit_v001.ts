import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";

const taskRoot = path.resolve("prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726");
const work = path.join(taskRoot, "designer/revision_008/work");
const layout = (await readFile(path.join(work, "layout_v003.layout"), "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_revision_008_v003",
  title: "revision 008 v003 audit",
  layout,
  win: winCondition,
};
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, winCondition, { winCondition }, {
  maxStates: 700_000,
  terminalizeWins: true,
});
if (graph.status !== "complete") throw new Error(`graph ${graph.status}: ${graph.reason}`);

type Edge = RuntimeGraphEdge<string>;
const outgoing: Edge[][] = Array.from({ length: graph.keys.length }, () => []);
const incoming: Edge[][] = Array.from({ length: graph.keys.length }, () => []);
for (const edge of graph.edges) {
  outgoing[edge.from]!.push(edge);
  incoming[edge.to]!.push(edge);
}
const wins = new Set(graph.winStateIndexes);
const matches = (events: string[], pattern: string) =>
  events.some((event) => event === pattern || event.startsWith(pattern));

function canReachWin(start: number, forbidden?: string): boolean {
  const seen = new Uint8Array(graph.keys.length);
  const queue = [start];
  seen[start] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const at = queue[cursor]!;
    if (wins.has(at)) return true;
    for (const edge of outgoing[at]!) {
      if (forbidden && matches(edge.events, forbidden)) continue;
      if (!seen[edge.to]) {
        seen[edge.to] = 1;
        queue.push(edge.to);
      }
    }
  }
  return false;
}

function anyWinningPathContains(pattern: string): boolean {
  const seen = new Uint8Array(graph.keys.length * 2);
  const queue: Array<[number, 0 | 1]> = [[0, 0]];
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const [at, hit] = queue[cursor]!;
    if (wins.has(at) && hit === 1) return true;
    for (const edge of outgoing[at]!) {
      const nextHit = (hit || matches(edge.events, pattern) ? 1 : 0) as 0 | 1;
      const key = edge.to * 2 + nextHit;
      if (!seen[key]) {
        seen[key] = 1;
        queue.push([edge.to, nextHit]);
      }
    }
  }
  return false;
}

function anyWinningPathCountNot(pattern: string, expected: number): boolean {
  const width = expected + 2;
  const seen = new Uint8Array(graph.keys.length * width);
  const queue: Array<[number, number]> = [[0, 0]];
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const [at, count] = queue[cursor]!;
    if (wins.has(at) && count !== expected) return true;
    for (const edge of outgoing[at]!) {
      let nextCount = count;
      for (const event of edge.events) {
        if (event === pattern || event.startsWith(pattern)) nextCount = Math.min(expected + 1, nextCount + 1);
      }
      const key = edge.to * width + nextCount;
      if (!seen[key]) {
        seen[key] = 1;
        queue.push([edge.to, nextCount]);
      }
    }
  }
  return false;
}

function replayIndex(inputs: string[]): number {
  let state = initial;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition });
    if (!result.legal) throw new Error(`illegal ${input}: ${result.reason}`);
    state = result.state;
  }
  const index = graph.indexByKey.get(runtime.key(state));
  if (index === undefined) throw new Error("replayed state absent from graph");
  return index;
}

function shortestPathTo(target: number): Edge[] {
  const result: Edge[] = [];
  let at = target;
  while (at !== 0) {
    const edge = incoming[at]!
      .filter((candidate) => graph.depthByIndex[candidate.from] === graph.depthByIndex[at]! - 1)
      .sort((a, b) => a.from - b.from)[0];
    if (!edge) throw new Error(`no predecessor ${at}`);
    result.push(edge);
    at = edge.from;
  }
  return result.reverse();
}

const requiredPatterns = [
  "push_axis:candle#2",
  "push_axis:candle#3",
  "light_brazier:1,5",
  "shrink:candle#1:len2",
  "shrink_ignite:candle#2",
  "extinguish_by_candle_body:candle#2",
  "shrink:candle#1:len1",
  "burn_out:candle#3",
  "roll_candle:candle#1",
  "roll_multi_cell_one_turn:candle#1",
  "light_brazier:6,2",
  "light_brazier:8,4",
  "burn_out:candle#1",
  "shrink:candle#2:len1",
  "light_brazier:9,5",
  "light_brazier:11,5",
  "roll_multi_cell_one_turn:candle#2",
];
const requiredWinningEvents = requiredPatterns.map((pattern) => ({
  pattern,
  required: !canReachWin(0, pattern),
}));
const forbiddenPatterns = [
  "wick_reexposed_unlit:candle#2",
  "ignite_from_brazier:candle#2",
  "ignite_from_wick:candle#2",
  "extinguish_by_wall:candle#1",
];
const forbiddenWinningEvents = forbiddenPatterns.map((pattern) => ({
  pattern,
  occurs_on_any_winning_path: anyWinningPathContains(pattern),
}));

const probes = [
  { id: "wrong_first_boundary", inputs: ["up", "left", "up", "up", "up"] },
  { id: "direct_donor_route_receiver_shrunk_too_early", inputs: ["up", "left", "up", "up", "left", "up", "left", "up", "right", "down"] },
  { id: "correct_second_handoff_state", inputs: ["up", "left", "up", "up", "left", "left", "up", "right", "down", "right"] },
  { id: "two_cell_receiver_intermediate_readout", inputs: ["up", "left", "up", "up", "left", "left", "up", "right", "down", "right", "up", "down", "right"] },
];
const recoveryCounterfactuals = probes.map((probe) => {
  const stateIndex = replayIndex(probe.inputs);
  return {
    ...probe,
    state_index: stateIndex,
    win_reachable: canReachWin(stateIndex),
    state_key: graph.keys[stateIndex],
    layout: adapter.renderState(graph.states[stateIndex]),
  };
});

const winningRepresentatives = [...wins].sort((a, b) => a - b).map((stateIndex) => {
  const pathEdges = shortestPathTo(stateIndex);
  const events = pathEdges.flatMap((edge) => edge.events);
  return {
    state_index: stateIndex,
    depth: graph.depthByIndex[stateIndex],
    inputs: pathEdges.map((edge) => edge.action),
    shrink_ignite_count: events.filter((event) => event.startsWith("shrink_ignite:candle#2")).length,
    receiver_extinguished_by_body: events.some((event) => event.startsWith("extinguish_by_candle_body:candle#2")),
    donor_wall_doused: events.some((event) => event.startsWith("extinguish_by_wall:candle#1")),
    events,
    final_state_key: graph.keys[stateIndex],
    final_layout: adapter.renderState(graph.states[stateIndex]),
  };
});

const report = {
  schema_version: 1,
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  work_version: "revision_008_v003",
  graph: {
    status: graph.status,
    reachable_states: graph.keys.length,
    legal_transitions: graph.edges.length,
    winning_states: wins.size,
  },
  required_winning_events: requiredWinningEvents,
  forbidden_winning_events: forbiddenWinningEvents,
  exact_once_checks: [{
    pattern: "shrink_ignite:candle#2",
    expected_count: 2,
    count_not_expected_on_any_winning_path: anyWinningPathCountNot("shrink_ignite:candle#2", 2),
  }],
  recovery_counterfactuals: recoveryCounterfactuals,
  winning_representatives: winningRepresentatives,
};

await writeFile(path.join(work, "audit_v003.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  graph: report.graph,
  required_failures: requiredWinningEvents.filter((item) => !item.required),
  forbidden_hits: forbiddenWinningEvents.filter((item) => item.occurs_on_any_winning_path),
  exact_count_failures: report.exact_once_checks.filter((item) => item.count_not_expected_on_any_winning_path),
  recoveries: recoveryCounterfactuals.map(({ id, state_index, win_reachable }) => ({ id, state_index, win_reachable })),
  representatives: winningRepresentatives.map(({ state_index, depth, inputs, shrink_ignite_count, receiver_extinguished_by_body, donor_wall_doused }) => ({
    state_index, depth, inputs, shrink_ignite_count, receiver_extinguished_by_body, donor_wall_doused,
  })),
}, null, 2));
