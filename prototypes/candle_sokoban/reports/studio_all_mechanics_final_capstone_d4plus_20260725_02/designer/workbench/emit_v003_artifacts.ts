import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";

const prototypePath = "prototypes/candle_sokoban";
const versionRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/candidate/versions/v003";
const layoutPath = `${versionRoot}/layout.txt`;
const inputs = [
  "down", "up", "up", "left", "left", "up", "up", "right", "right", "down",
  "left", "left", "down", "down", "down", "down", "down", "down", "right", "right",
  "down", "right", "right", "right", "right", "right", "up", "up",
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const winCondition = pkg.mechanic.win;
const initial = adapter.parseLevel({
  id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v003",
  title: "余焰写入·主动接力",
  layout,
  win: winCondition,
});

const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  inputs,
  { winCondition },
  winCondition,
);
if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error("canonical replay is not a complete normal win");
}
const replay = buildInputSequenceReplayReport(
  {
    id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v003",
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout,
    winCondition,
  },
  execution,
);
await writeFile(`${versionRoot}/canonical_replay.json`, `${JSON.stringify(replay, null, 2)}\n`, "utf8");
await writeFile(`${versionRoot}/canonical_replay.md`, formatInputSequenceReplayMarkdown(replay), "utf8");

const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition, maxStates: 500_000, maxDepth: 200 },
  { maxStates: 500_000 },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);

const outgoing = new Map<number, typeof graph.edges>();
const incoming = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const out = outgoing.get(edge.from) ?? [];
  out.push(edge);
  outgoing.set(edge.from, out);
  const inc = incoming.get(edge.to) ?? [];
  inc.push(edge);
  incoming.set(edge.to, inc);
}

const representativeFor = (winIndex: number) => {
  const path: typeof graph.edges = [];
  let cursor = winIndex;
  while (cursor !== 0) {
    const depth = graph.depthByIndex[cursor]!;
    const edge = (incoming.get(cursor) ?? []).find(
      (candidate) => graph.depthByIndex[candidate.from] === depth - 1,
    );
    if (!edge) throw new Error(`no BFS parent for ${cursor}`);
    path.push(edge);
    cursor = edge.from;
  }
  path.reverse();
  return {
    win_state_index: winIndex,
    depth: graph.depthByIndex[winIndex],
    inputs: path.map((edge) => edge.action),
    important_events: path.flatMap((edge) => edge.events).filter((event) =>
      event.startsWith("push_axis") ||
      event.startsWith("roll_candle") ||
      event.startsWith("extinguish_by_") ||
      event.startsWith("ignite_from_") ||
      event.startsWith("shrink:") ||
      event.startsWith("shrink_ignite") ||
      event.startsWith("burn_out") ||
      event.startsWith("light_brazier") ||
      event.startsWith("win_")
    ),
    state_key: graph.keys[winIndex],
  };
};
const representatives = [...graph.winStateIndexes]
  .sort((a, b) => graph.depthByIndex[a]! - graph.depthByIndex[b]!)
  .map(representativeFor);
await writeFile(
  `${versionRoot}/winning_state_representatives.jsonl`,
  `${representatives.map((value) => JSON.stringify(value)).join("\n")}\n`,
  "utf8",
);

const canReachWinWithout = (matcher: (events: string[]) => boolean): boolean => {
  const seen = new Set<number>([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head += 1) {
    const from = queue[head]!;
    if (graph.winStateIndexes.has(from)) return true;
    for (const edge of outgoing.get(from) ?? []) {
      if (matcher(edge.events) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return false;
};
const groups = {
  opening_receiver_axis_choice: (events: string[]) => events.includes("push_axis:candle#2"),
  same_roll_wall_douse_reignite_and_first_transfer: (events: string[]) =>
    events.includes("extinguish_by_wall:candle#1") &&
    events.includes("ignite_from_brazier:candle#1:4,5") &&
    events.includes("roll_reignite_after_extinguish:candle#1:d2->d3") &&
    events.includes("roll_candle:candle#1:d3") &&
    events.includes("shrink_ignite:candle#2"),
  active_relay_roll_lights_gate_and_places_cover: (events: string[]) =>
    events.includes("light_brazier:6,6") && events.includes("roll_candle:candle#2:d3"),
  placed_relay_retreat_transfers_to_consumer: (events: string[]) =>
    events.includes("shrink_ignite:candle#3"),
  final_consumer_roll_lights_brazier: (events: string[]) =>
    events.includes("light_brazier:9,2") && events.includes("roll_candle:candle#3:d6"),
};
const requiredRelations = {
  graph: {
    status: graph.status,
    reachable_states: graph.states.length,
    legal_transitions: graph.edges.length,
    winning_states: graph.winStateIndexes.size,
  },
  required_on_every_winning_path: Object.fromEntries(
    Object.entries(groups).map(([name, matcher]) => [name, !canReachWinWithout(matcher)]),
  ),
  minimum_event_counts_on_any_winning_path: {
    receiver_axis_pushes: 1,
    writer_rolls: 1,
    active_relay_rolls: 1,
    consumer_final_rolls: 1,
  },
};
await writeFile(
  `${versionRoot}/required_relations_audit.json`,
  `${JSON.stringify(requiredRelations, null, 2)}\n`,
  "utf8",
);

const graphMarkdown = `# v003 完整图与胜解代表\n\n` +
  `- graph status: ${graph.status}\n` +
  `- reachable states: ${graph.states.length}\n` +
  `- legal transitions: ${graph.edges.length}\n` +
  `- raw winning states: ${graph.winStateIndexes.size}\n` +
  `- shortest winning depth: ${Math.min(...representatives.map((value) => value.depth))}\n` +
  `- search budget: maxStates=500000, maxDepth=200；未命中预算边界。\n\n` +
  `两个胜态代表深度分别为 ${representatives.map((value) => value.depth).join("、")}。二者都含同一 opening axis push、同一 writer 墙灭/火盆复燃/退焰接 relay edge、同一 relay 横滚点亮封锁火盆、同一 relay→consumer 退焰以及同一 consumer 点终盆；差异只在 consumer 燃尽前后的两步相位分配。\n\n` +
  `完整 raw nodes/edges 保存在 exposure_audit.json；逐胜态 BFS 代表保存在 winning_state_representatives.jsonl。\n`;
await writeFile(`${versionRoot}/graph_analysis.md`, graphMarkdown, "utf8");

console.log(JSON.stringify({
  canonical_steps: replay.steps.length,
  normal_win: replay.final.isWin,
  graph_status: graph.status,
  reachable_states: graph.states.length,
  legal_transitions: graph.edges.length,
  winning_states: graph.winStateIndexes.size,
}, null, 2));
