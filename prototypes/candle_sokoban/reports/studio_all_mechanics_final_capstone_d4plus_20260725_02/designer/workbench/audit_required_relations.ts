import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/candle_sokoban";
const layoutPath =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/designer/workbench/working_layout.txt";
const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const initial = adapter.parseLevel({
  id: "candidate_required_relations_audit",
  title: "candidate_required_relations_audit",
  layout,
  win: pkg.mechanic.win,
});
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win, maxStates: 500_000, maxDepth: 200 },
  { maxStates: 500_000 },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);

const outgoing = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  const bucket = outgoing.get(edge.from) ?? [];
  bucket.push(edge);
  outgoing.set(edge.from, bucket);
}

const canReachWinWithout = (matchesRequiredEdge: (events: string[]) => boolean): boolean => {
  const seen = new Set<number>([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head++) {
    const from = queue[head]!;
    if (graph.winStateIndexes.has(from)) return true;
    for (const edge of outgoing.get(from) ?? []) {
      if (matchesRequiredEdge(edge.events) || seen.has(edge.to)) continue;
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
    events.includes("light_brazier:6,6") &&
    events.includes("roll_candle:candle#2:d3"),
  placed_relay_retreat_transfers_to_consumer: (events: string[]) => events.includes("shrink_ignite:candle#3"),
  final_consumer_roll_lights_brazier: (events: string[]) =>
    events.includes("light_brazier:9,2") && events.includes("roll_candle:candle#3:d6"),
};

const minEventCountToWin = (event: string): number | null => {
  const inf = Number.MAX_SAFE_INTEGER;
  const dist = Array<number>(graph.states.length).fill(inf);
  dist[0] = 0;
  const buckets: number[][] = [[0]];
  for (let best = 0; best < buckets.length; best++) {
    const bucket = buckets[best] ?? [];
    for (let cursor = 0; cursor < bucket.length; cursor++) {
      const current = bucket[cursor]!;
      if (dist[current] !== best) continue;
    for (const edge of outgoing.get(current) ?? []) {
      const next = best + edge.events.filter((e) => e === event).length;
      if (next >= dist[edge.to]!) continue;
      dist[edge.to] = next;
        (buckets[next] ??= []).push(edge.to);
      }
    }
  }
  const winning = [...graph.winStateIndexes].map((index) => dist[index]!).filter((value) => value < inf);
  return winning.length === 0 ? null : Math.min(...winning);
};

console.log(JSON.stringify({
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
    receiver_axis_pushes: minEventCountToWin("push_axis:candle#2"),
    writer_rolls: minEventCountToWin("roll_candle:candle#1:d3"),
    active_relay_rolls: minEventCountToWin("roll_candle:candle#2:d3"),
    consumer_final_rolls: minEventCountToWin("roll_candle:candle#3:d6"),
  },
}, null, 2));
