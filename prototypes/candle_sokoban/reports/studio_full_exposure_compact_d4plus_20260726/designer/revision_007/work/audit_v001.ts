import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";

const root = path.resolve("prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726");
const work = path.join(root, "designer/revision_007/work");
const layoutPath = path.join(work, "layout_v001.layout");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const level: LevelDoc = {
  id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_revision_007_v001",
  title: "revision 007 v001 audit",
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

function canReachWin(start: number, forbiddenPattern?: string): boolean {
  const seen = new Uint8Array(graph.keys.length);
  const queue = [start];
  seen[start] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const at = queue[cursor]!;
    if (wins.has(at)) return true;
    for (const edge of outgoing[at]!) {
      if (forbiddenPattern && matches(edge.events, forbiddenPattern)) continue;
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

function anyWinningPathCountNotOne(pattern: string): boolean {
  const seen = new Uint8Array(graph.keys.length * 3);
  const queue: Array<[number, 0 | 1 | 2]> = [[0, 0]];
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const [at, count] = queue[cursor]!;
    if (wins.has(at) && count !== 1) return true;
    for (const edge of outgoing[at]!) {
      let nextCount = count;
      for (const event of edge.events) {
        if (event === pattern || event.startsWith(pattern)) {
          nextCount = Math.min(2, nextCount + 1) as 0 | 1 | 2;
        }
      }
      const key = edge.to * 3 + nextCount;
      if (!seen[key]) {
        seen[key] = 1;
        queue.push([edge.to, nextCount]);
      }
    }
  }
  return false;
}

function anyWinningOrderViolation(first: string, then: string): boolean {
  const seen = new Uint8Array(graph.keys.length * 4);
  const queue: Array<[number, 0 | 1, 0 | 1]> = [[0, 0, 0]];
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const [at, hasFirst, violated] = queue[cursor]!;
    if (wins.has(at) && violated === 1) return true;
    for (const edge of outgoing[at]!) {
      let nextFirst = hasFirst;
      let nextViolated = violated;
      for (const event of edge.events) {
        if (event === first || event.startsWith(first)) nextFirst = 1;
        if ((event === then || event.startsWith(then)) && nextFirst === 0) nextViolated = 1;
      }
      const key = edge.to * 4 + nextFirst * 2 + nextViolated;
      if (!seen[key]) {
        seen[key] = 1;
        queue.push([edge.to, nextFirst, nextViolated]);
      }
    }
  }
  return false;
}

function replayIndex(inputs: string[]): number {
  let state = initial;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition });
    if (!result.legal) throw new Error(`illegal replay input ${input}: ${result.reason}`);
    state = result.state;
  }
  const index = graph.indexByKey.get(runtime.key(state));
  if (index === undefined) throw new Error("replayed state absent from complete graph");
  return index;
}

function shortestPathTo(target: number): Edge[] {
  const edges: Edge[] = [];
  let at = target;
  while (at !== 0) {
    const edge = incoming[at]!
      .filter((candidate) => graph.depthByIndex[candidate.from] === graph.depthByIndex[at]! - 1)
      .sort((a, b) => a.from - b.from)[0];
    if (!edge) throw new Error(`no BFS predecessor for ${at}`);
    edges.push(edge);
    at = edge.from;
  }
  return edges.reverse();
}

const requiredPatterns = [
  "push_axis:candle#2",
  "push_axis:candle#3",
  "light_brazier:1,5",
  "shrink:candle#1:len1",
  "shrink:candle#3:len1",
  "shrink_ignite:candle#2",
  "roll_candle:candle#1",
  "push_axis:candle#1",
  "light_brazier:7,3",
  "burn_out:candle#1",
  "shrink:candle#2:len1",
  "burn_out:candle#3",
  "light_brazier:7,5",
  "light_brazier:10,5",
  "roll_multi_cell_one_turn:candle#2",
  "roll_last_brazier_before_endpoint:candle#2",
];
const requiredWinningEvents = requiredPatterns.map((pattern) => ({
  pattern,
  required: !canReachWin(0, pattern),
}));
const forbiddenWinningPatterns = [
  "wick_reexposed_unlit:candle#2",
  "extinguish_by_candle_body:candle#2",
  "ignite_from_brazier:candle#2",
  "ignite_from_wick:candle#2",
];
const forbiddenWinningEvents = forbiddenWinningPatterns.map((pattern) => ({
  pattern,
  occurs_on_any_winning_path: anyWinningPathContains(pattern),
}));
const orderChecks = [
  ["push_axis:candle#2", "shrink_ignite:candle#2"],
  ["light_brazier:1,5", "shrink_ignite:candle#2"],
  ["shrink_ignite:candle#2", "shrink:candle#2:len1"],
  ["shrink:candle#2:len1", "light_brazier:7,5"],
  ["shrink:candle#2:len1", "light_brazier:10,5"],
  ["light_brazier:7,3", "light_brazier:10,5"],
].map(([first, then]) => ({
  first,
  then,
  violation_on_any_winning_path: anyWinningOrderViolation(first!, then!),
}));

const recoverySequences = [
  { id: "wrong_boundary_step5", inputs: ["up", "left", "up", "up", "up"] },
  { id: "wrong_branch_delayed_after_two_braziers", inputs: ["up", "left", "up", "up", "up", "down", "left", "left"] },
  { id: "reconceal_receiver_then_donor_burnout", inputs: ["up", "left", "up", "up", "left", "up", "right", "down", "left", "right"] },
];
const recoveryCounterfactuals = recoverySequences.map((item) => {
  const stateIndex = replayIndex(item.inputs);
  return { ...item, state_index: stateIndex, win_reachable: canReachWin(stateIndex) };
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
    events,
    final_state_key: graph.keys[stateIndex],
    final_layout: adapter.renderState(graph.states[stateIndex]),
  };
});

const report = {
  schema_version: 1,
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  work_version: "revision_007_v001",
  graph: {
    status: graph.status,
    reachable_states: graph.keys.length,
    legal_transitions: graph.edges.length,
    winning_states: wins.size,
  },
  required_winning_events: requiredWinningEvents,
  forbidden_winning_events: forbiddenWinningEvents,
  exact_once_checks: [
    {
      pattern: "shrink_ignite:candle#2",
      count_not_one_on_any_winning_path: anyWinningPathCountNotOne("shrink_ignite:candle#2"),
    },
  ],
  order_checks: orderChecks,
  recovery_counterfactuals: recoveryCounterfactuals,
  winning_representatives: winningRepresentatives,
};

await mkdir(work, { recursive: true });
await writeFile(path.join(work, "audit_v001.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
const markdown = [
  "# revision_007 v001 完整解族审计",
  "",
  `- graph: ${graph.status}; states=${graph.keys.length}; edges=${graph.edges.length}; wins=${wins.size}`,
  `- all winning paths use exactly one shrink_ignite: ${!report.exact_once_checks[0]!.count_not_one_on_any_winning_path}`,
  "",
  "## required winning events",
  "",
  ...requiredWinningEvents.map((item) => `- ${item.pattern}: ${item.required}`),
  "",
  "## forbidden winning events",
  "",
  ...forbiddenWinningEvents.map((item) => `- ${item.pattern}: ${item.occurs_on_any_winning_path}`),
  "",
  "## recovery counterfactuals",
  "",
  ...recoveryCounterfactuals.map((item) => `- ${item.id}: win_reachable=${item.win_reachable}`),
  "",
  "## winning representatives",
  "",
  ...winningRepresentatives.flatMap((item) => [
    `### state ${item.state_index} / depth ${item.depth}`,
    "",
    `inputs: ${item.inputs.join(",")}`,
    `shrink_ignite_count: ${item.shrink_ignite_count}`,
    `receiver_extinguished_by_body: ${item.receiver_extinguished_by_body}`,
    "",
    "```text",
    item.final_layout,
    "```",
    "",
  ]),
].join("\n");
await writeFile(path.join(work, "audit_v001.md"), `${markdown.trimEnd()}\n`, "utf8");
console.log(JSON.stringify({
  graph: report.graph,
  required_failures: requiredWinningEvents.filter((item) => !item.required),
  forbidden_hits: forbiddenWinningEvents.filter((item) => item.occurs_on_any_winning_path),
  exact_once_failures: report.exact_once_checks.filter((item) => item.count_not_one_on_any_winning_path),
  order_failures: orderChecks.filter((item) => item.violation_on_any_winning_path),
  recoveries: recoveryCounterfactuals,
  representatives: winningRepresentatives.map((item) => ({
    state_index: item.state_index,
    depth: item.depth,
    inputs: item.inputs,
    shrink_ignite_count: item.shrink_ignite_count,
    receiver_extinguished_by_body: item.receiver_extinguished_by_body,
  })),
}, null, 2));
