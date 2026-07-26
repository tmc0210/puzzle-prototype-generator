import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/candle_sokoban";
const workbench =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/designer/workbench";
const fullLayoutPath = `${workbench}/working_layout.txt`;
const deletedLayoutPath = `${workbench}/counterfactual_suffix_deleted_redirected.txt`;

const onePushLocalInputs = [
  "down", "up", "up", "right", "right", "up", "up", "left", "left", "left", "right",
  "down", "down", "down", "right",
] as const;
const twoPushLocalInputs = [
  "up", "down", "down", "down", "up", "up", "up", "right", "right", "up", "up", "left",
  "down", "down", "down",
] as const;
const onePushDeletedInputs = onePushLocalInputs.slice(0, 12);
const twoPushDeletedInputs = twoPushLocalInputs.slice(0, 13);

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const build = async (path: string, id: string) => {
  const layout = await readFile(path, "utf8");
  const initial = adapter.parseLevel({ id, title: id, layout, win: pkg.mechanic.win });
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win, maxStates: 300_000, maxDepth: 200 },
    { maxStates: 300_000 },
  );
  if (graph.status !== "complete") throw new Error(`${id} graph incomplete: ${graph.reason ?? "unknown"}`);
  return { initial, graph };
};

const run = (initial: ReturnType<typeof adapter.parseLevel>, inputs: readonly string[]) => {
  let state = initial;
  const steps: Array<{ action: string; events: string[]; key: string; win: boolean }> = [];
  for (const action of inputs) {
    const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    if (!result.legal) throw new Error(`illegal ${action} after ${steps.length} steps: ${result.reason ?? "unknown"}`);
    state = result.state;
    steps.push({ action, events: result.events, key: runtime.key(state), win: runtime.isWin(state, pkg.mechanic.win) });
  }
  return { state, key: runtime.key(state), steps, isWin: runtime.isWin(state, pkg.mechanic.win) };
};

const full = await build(fullLayoutPath, "v005_coupling_full");
const deleted = await build(deletedLayoutPath, "v005_coupling_deleted_redirected");

const outgoing = new Map<number, typeof full.graph.edges>();
const incoming = new Map<number, typeof full.graph.edges>();
for (const edge of full.graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}

const canReachWin = new Set<number>(full.graph.winStateIndexes);
const reverseQueue = [...canReachWin];
for (let head = 0; head < reverseQueue.length; head += 1) {
  for (const edge of incoming.get(reverseQueue[head]!) ?? []) {
    if (canReachWin.has(edge.from)) continue;
    canReachWin.add(edge.from);
    reverseQueue.push(edge.from);
  }
}

const distanceToWin = (start: number): number | null => {
  const seen = new Set<number>([start]);
  const queue: Array<{ index: number; distance: number }> = [{ index: start, distance: 0 }];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (full.graph.winStateIndexes.has(current.index)) return current.distance;
    for (const edge of outgoing.get(current.index) ?? []) {
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push({ index: edge.to, distance: current.distance + 1 });
    }
  }
  return null;
};

const winWithout = (matcher: (events: string[]) => boolean): boolean => {
  const seen = new Set<number>([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (full.graph.winStateIndexes.has(current)) return true;
    for (const edge of outgoing.get(current) ?? []) {
      if (matcher(edge.events) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return false;
};

const minEventCountToWin = (event: string): number | null => {
  const infinity = Number.MAX_SAFE_INTEGER;
  const distance = Array<number>(full.graph.states.length).fill(infinity);
  const buckets: number[][] = [[0]];
  distance[0] = 0;
  for (let best = 0; best < buckets.length; best += 1) {
    for (const current of buckets[best] ?? []) {
      if (distance[current] !== best) continue;
      for (const edge of outgoing.get(current) ?? []) {
        const next = best + edge.events.filter((candidate) => candidate === event).length;
        if (next >= distance[edge.to]!) continue;
        distance[edge.to] = next;
        (buckets[next] ??= []).push(edge.to);
      }
    }
  }
  const counts = [...full.graph.winStateIndexes]
    .map((index) => distance[index]!)
    .filter((value) => value < infinity);
  return counts.length === 0 ? null : Math.min(...counts);
};

const summarizeLocal = (label: string, replayResult: ReturnType<typeof run>) => {
  const index = full.graph.keys.indexOf(replayResult.key);
  if (index < 0) throw new Error(`${label} state missing from full graph`);
  const keyRoll = replayResult.steps.find((step) => step.events.some((event) => event.startsWith("roll_candle:candle#1")));
  const transfer = replayResult.steps.find((step) => step.events.includes("shrink_ignite:candle#2"));
  return {
    label,
    inputs: replayResult.steps.map((step) => step.action),
    key_roll_events: keyRoll?.events ?? [],
    transfer_events: transfer?.events ?? [],
    output_state_key: replayResult.key,
    output_state_index: index,
    globally_win_reachable: canReachWin.has(index),
    shortest_remaining_actions_to_win: distanceToWin(index),
  };
};

const oneLocal = run(full.initial, onePushLocalInputs);
const twoLocal = run(full.initial, twoPushLocalInputs);
const oneDeleted = run(deleted.initial, onePushDeletedInputs);
const twoDeleted = run(deleted.initial, twoPushDeletedInputs);

const report = {
  schema_version: 1,
  full_graph: {
    status: full.graph.status,
    reachable_states: full.graph.states.length,
    legal_transitions: full.graph.edges.length,
    raw_winning_states: full.graph.winStateIndexes.size,
  },
  local_success_outputs: [summarizeLocal("relay_pushed_once", oneLocal), summarizeLocal("relay_pushed_twice", twoLocal)],
  required_on_every_full_winning_path: {
    writer_same_roll_wall_then_brazier_reignite: !winWithout((events) =>
      events.includes("extinguish_by_wall:candle#1") &&
      events.includes("ignite_from_brazier:candle#1:6,5") &&
      events.includes("roll_reignite_after_extinguish:candle#1:d2->d3")),
    selected_writer_roll_distance_d4: !winWithout((events) => events.includes("roll_candle:candle#1:d4")),
    retreat_transfer_to_relay: !winWithout((events) => events.includes("shrink_ignite:candle#2")),
    relay_second_boundary_to_len1: !winWithout((events) => events.includes("shrink:candle#2:len1")),
    final_relay_roll_lights_target: !winWithout((events) =>
      events.includes("roll_candle:candle#2:d6") && events.includes("light_brazier:2,7")),
  },
  minimum_event_counts_on_any_full_winning_path: {
    relay_axis_pushes: minEventCountToWin("push_axis:candle#2"),
    writer_selected_rolls_d4: minEventCountToWin("roll_candle:candle#1:d4"),
    relay_final_rolls_d6: minEventCountToWin("roll_candle:candle#2:d6"),
  },
  suffix_deleted_and_normal_win_redirected: {
    graph_status: deleted.graph.status,
    reachable_states: deleted.graph.states.length,
    legal_transitions: deleted.graph.edges.length,
    raw_winning_states: deleted.graph.winStateIndexes.size,
    one_push_history_wins: oneDeleted.isWin,
    one_push_final_events: oneDeleted.steps.at(-1)?.events ?? [],
    two_push_history_wins: twoDeleted.isWin,
    two_push_final_events: twoDeleted.steps.at(-1)?.events ?? [],
    classification_change: "full exact只接受两推输出；删去左下目标/滚动区并把正常胜利重定向到writer公共轨道后，一推与两推都胜，早期输出等价类扩大。",
  },
};
const serialized = `${JSON.stringify(report, null, 2)}\n`;
await writeFile(`${workbench}/downstream_coupling_audit.json`, serialized, "utf8");
console.log(serialized);
