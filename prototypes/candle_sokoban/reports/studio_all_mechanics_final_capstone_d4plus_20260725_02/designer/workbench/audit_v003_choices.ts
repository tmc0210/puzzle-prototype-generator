import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const versionRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/candidate/versions/v003";
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(`${versionRoot}/layout.txt`, "utf8");
const winCondition = pkg.mechanic.win;
const initial = adapter.parseLevel({ id: "v003_choice_audit", title: "v003_choice_audit", layout, win: winCondition });
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition, maxStates: 500_000, maxDepth: 200 },
  { maxStates: 500_000 },
);
if (graph.status !== "complete") throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);

const incoming = new Map<number, number[]>();
for (const edge of graph.edges) {
  const bucket = incoming.get(edge.to) ?? [];
  bucket.push(edge.from);
  incoming.set(edge.to, bucket);
}
const canReachWin = new Set<number>(graph.winStateIndexes);
const queue = [...graph.winStateIndexes];
for (let head = 0; head < queue.length; head += 1) {
  for (const from of incoming.get(queue[head]!) ?? []) {
    if (canReachWin.has(from)) continue;
    canReachWin.add(from);
    queue.push(from);
  }
}
const indexByKey = new Map(graph.keys.map((key, index) => [key, index]));

const prefixes: Record<string, string[]> = {
  correct_opening_one_axis_push: ["down"],
  wrong_extra_axis_push: ["down", "down"],
  wrong_early_writer_roll_before_receiver: [
    "up", "down", "up", "left", "left", "up", "up", "right", "right", "down",
  ],
  canonical_through_writer_transfer: [
    "down", "up", "up", "left", "left", "up", "up", "right", "right", "down",
  ],
  canonical_relay_cover_placed: [
    "down", "up", "up", "left", "left", "up", "up", "right", "right", "down",
    "left", "left", "down", "down", "down", "down", "down", "down", "right", "right",
  ],
};

const results: Record<string, unknown> = {};
for (const [name, actions] of Object.entries(prefixes)) {
  let state = initial;
  let legal = true;
  let reason: string | undefined;
  let finalEvents: string[] = [];
  for (const action of actions) {
    const transition = runtime.step(state, action as never, { winCondition });
    if (!transition.legal) {
      legal = false;
      reason = transition.reason;
      break;
    }
    state = transition.state;
    finalEvents = transition.events;
  }
  const key = runtime.key(state);
  const index = indexByKey.get(key);
  results[name] = {
    actions,
    legal,
    reason: reason ?? null,
    state_index: index ?? null,
    can_reach_win_from_result: index === undefined ? false : canReachWin.has(index),
    final_events: finalEvents,
    state_key: key,
  };
}

const report = {
  graph_status: graph.status,
  reachable_states: graph.states.length,
  winning_states: graph.winStateIndexes.size,
  checks: results,
};
await writeFile(`${versionRoot}/active_agency_graph_checks.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
