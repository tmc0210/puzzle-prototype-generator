import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const exactRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/candidate/versions/v005";
const outputPath =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/evidence/v005/independent_reproduction.json";
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;

const exactLayout = await readFile(`${exactRoot}/layout.txt`, "utf8");
const deletedLayout = await readFile(
  `${exactRoot}/counterfactuals/suffix_deleted_redirected.txt`,
  "utf8",
);
const noWriterWallLayout = await readFile(
  `${exactRoot}/counterfactuals/no_writer_wall.txt`,
  "utf8",
);
const noReigniteSourceLayout = await readFile(
  `${exactRoot}/counterfactuals/no_reignite_source.txt`,
  "utf8",
);

const parse = (layout: string, id: string) =>
  adapter.parseLevel({ id, title: id, layout, win: winCondition });

const enumerate = (layout: string, id: string) => {
  const initial = parse(layout, id);
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    winCondition,
    { winCondition, maxStates: 300_000, maxDepth: 200 },
    { maxStates: 300_000 },
  );
  return { initial, graph };
};

const replay = (
  initial: ReturnType<typeof adapter.parseLevel>,
  inputs: readonly string[],
) => {
  let state = initial;
  const steps: Array<{ input: string; events: string[] }> = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition });
    if (!result.legal) {
      throw new Error(`illegal input ${input} at step ${steps.length + 1}: ${result.reason}`);
    }
    state = result.state;
    steps.push({ input, events: result.events });
  }
  return {
    key: runtime.key(state),
    isWin: runtime.isWin(state, winCondition),
    steps,
    events: steps.flatMap((step) => step.events),
  };
};

const canonicalInputs = [
  "up", "down", "down", "down", "up", "up", "up", "right", "right", "up", "up", "left",
  "down", "down", "down", "down", "right", "down", "down", "down", "left", "left",
] as const;
const onePushLocalInputs = [
  "down", "up", "up", "right", "right", "up", "up", "left", "left", "left", "right",
  "down", "down", "down", "right",
] as const;
const twoPushLocalInputs = [
  "up", "down", "down", "down", "up", "up", "up", "right", "right", "up", "up", "left",
  "down", "down", "down",
] as const;

const full = enumerate(exactLayout, "independent_v005_exact");
const deleted = enumerate(deletedLayout, "independent_v005_suffix_deleted");
const noWriterWall = enumerate(noWriterWallLayout, "independent_v005_no_writer_wall");
const noReigniteSource = enumerate(noReigniteSourceLayout, "independent_v005_no_reignite_source");
const noWriterWallCanonical = replay(noWriterWall.initial, canonicalInputs);

const graphMaps = (graph: typeof full.graph) => {
  const outgoing = new Map<number, typeof graph.edges>();
  const incoming = new Map<number, typeof graph.edges>();
  for (const edge of graph.edges) {
    (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
    (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
  }
  return { outgoing, incoming };
};
const fullMaps = graphMaps(full.graph);
const canReachWin = new Set<number>(full.graph.winStateIndexes);
const reverseQueue = [...canReachWin];
for (let head = 0; head < reverseQueue.length; head += 1) {
  for (const edge of fullMaps.incoming.get(reverseQueue[head]!) ?? []) {
    if (!canReachWin.has(edge.from)) {
      canReachWin.add(edge.from);
      reverseQueue.push(edge.from);
    }
  }
}

const distanceToWin = (start: number): number | null => {
  const seen = new Set([start]);
  const queue: Array<{ index: number; distance: number }> = [{ index: start, distance: 0 }];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (full.graph.winStateIndexes.has(current.index)) return current.distance;
    for (const edge of fullMaps.outgoing.get(current.index) ?? []) {
      if (!seen.has(edge.to)) {
        seen.add(edge.to);
        queue.push({ index: edge.to, distance: current.distance + 1 });
      }
    }
  }
  return null;
};

const winWithout = (matcher: (events: string[]) => boolean): boolean => {
  const seen = new Set([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (full.graph.winStateIndexes.has(current)) return true;
    for (const edge of fullMaps.outgoing.get(current) ?? []) {
      if (!matcher(edge.events) && !seen.has(edge.to)) {
        seen.add(edge.to);
        queue.push(edge.to);
      }
    }
  }
  return false;
};

const oneFull = replay(full.initial, onePushLocalInputs);
const twoFull = replay(full.initial, twoPushLocalInputs);
const oneFullIndex = full.graph.keys.indexOf(oneFull.key);
const twoFullIndex = full.graph.keys.indexOf(twoFull.key);
const oneDeleted = replay(deleted.initial, onePushLocalInputs.slice(0, 12));
const twoDeleted = replay(deleted.initial, twoPushLocalInputs.slice(0, 13));

const exactRows = exactLayout.trimEnd().split("\n");
if (exactRows[7]?.[8] !== "#") throw new Error("expected wall at (8,7)");
exactRows[7] = `${exactRows[7]!.slice(0, 8)}.${exactRows[7]!.slice(9)}`;
const noTimingWallLayout = `${exactRows.join("\n")}\n`;
const noTimingWall = enumerate(noTimingWallLayout, "independent_v005_no_timing_wall_8_7");
const noTimingWallCanonical = replay(noTimingWall.initial, canonicalInputs);
const noTimingWallMaps = graphMaps(noTimingWall.graph);
const noTimingWallCanReachWin = new Set<number>(noTimingWall.graph.winStateIndexes);
const noTimingWallReverseQueue = [...noTimingWallCanReachWin];
for (let head = 0; head < noTimingWallReverseQueue.length; head += 1) {
  for (const edge of noTimingWallMaps.incoming.get(noTimingWallReverseQueue[head]!) ?? []) {
    if (!noTimingWallCanReachWin.has(edge.from)) {
      noTimingWallCanReachWin.add(edge.from);
      noTimingWallReverseQueue.push(edge.from);
    }
  }
}
const exactViableKeys = new Set([...canReachWin].map((index) => full.graph.keys[index]!));
const noTimingWallViableKeys = new Set(
  [...noTimingWallCanReachWin].map((index) => noTimingWall.graph.keys[index]!),
);
const viableEdgeSignatures = (
  graph: typeof full.graph,
  viable: Set<number>,
) => new Set(
  graph.edges
    .filter((edge) => viable.has(edge.from) && viable.has(edge.to))
    .map((edge) => `${graph.keys[edge.from]}\n${edge.action}\n${graph.keys[edge.to]}\n${edge.events.join("|")}`),
);
const exactViableEdges = viableEdgeSignatures(full.graph, canReachWin);
const noTimingWallViableEdges = viableEdgeSignatures(noTimingWall.graph, noTimingWallCanReachWin);
const noTimingWallWinWithout = (matcher: (events: string[]) => boolean): boolean => {
  const seen = new Set([0]);
  const queue = [0];
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (noTimingWall.graph.winStateIndexes.has(current)) return true;
    for (const edge of noTimingWallMaps.outgoing.get(current) ?? []) {
      if (!matcher(edge.events) && !seen.has(edge.to)) {
        seen.add(edge.to);
        queue.push(edge.to);
      }
    }
  }
  return false;
};

const importantEvents = (events: string[]) =>
  events.filter((event) =>
    event.startsWith("push_axis") ||
    event.startsWith("roll_candle") ||
    event.startsWith("extinguish_by_wall") ||
    event.startsWith("ignite_from_brazier") ||
    event.startsWith("shrink:") ||
    event.startsWith("shrink_ignite") ||
    event.startsWith("light_brazier") ||
    event.startsWith("win_")
  );

const result = {
  reviewer_instance_id: "fresh_evidence_reviewer_candle_002_v005_20260725_01",
  exact_graph: {
    status: full.graph.status,
    reason: full.graph.reason ?? null,
    states: full.graph.states.length,
    edges: full.graph.edges.length,
    wins: full.graph.winStateIndexes.size,
    max_observed_depth: Math.max(...full.graph.depthByIndex),
    win_depths: [...full.graph.winStateIndexes]
      .map((index) => full.graph.depthByIndex[index])
      .sort((a, b) => a! - b!),
  },
  canonical: {
    inputs: canonicalInputs.length,
    is_normal_win: replay(full.initial, canonicalInputs).isWin,
    important_events: importantEvents(replay(full.initial, canonicalInputs).events),
  },
  one_vs_two_local_success: {
    one_push: {
      events: importantEvents(oneFull.events),
      output_key: oneFull.key,
      win_reachable: oneFullIndex >= 0 && canReachWin.has(oneFullIndex),
      shortest_remaining: oneFullIndex >= 0 ? distanceToWin(oneFullIndex) : null,
    },
    two_push: {
      events: importantEvents(twoFull.events),
      output_key: twoFull.key,
      win_reachable: twoFullIndex >= 0 && canReachWin.has(twoFullIndex),
      shortest_remaining: twoFullIndex >= 0 ? distanceToWin(twoFullIndex) : null,
    },
  },
  required_on_every_win: {
    same_roll_douse_reignite: !winWithout((events) =>
      events.includes("extinguish_by_wall:candle#1") &&
      events.includes("ignite_from_brazier:candle#1:6,5") &&
      events.includes("roll_reignite_after_extinguish:candle#1:d2->d3")),
    writer_d4: !winWithout((events) => events.includes("roll_candle:candle#1:d4")),
    shrink_ignite_relay: !winWithout((events) => events.includes("shrink_ignite:candle#2")),
    relay_len1: !winWithout((events) => events.includes("shrink:candle#2:len1")),
    final_roll_and_target: !winWithout((events) =>
      events.includes("roll_candle:candle#2:d6") && events.includes("light_brazier:2,7")),
  },
  suffix_deleted_redirected: {
    status: deleted.graph.status,
    states: deleted.graph.states.length,
    edges: deleted.graph.edges.length,
    wins: deleted.graph.winStateIndexes.size,
    one_push_normal_win: oneDeleted.isWin,
    one_push_final_events: oneDeleted.steps.at(-1)?.events ?? [],
    two_push_normal_win: twoDeleted.isWin,
    two_push_final_events: twoDeleted.steps.at(-1)?.events ?? [],
  },
  identity_counterfactuals: {
    remove_writer_wall_6_4: {
      status: noWriterWall.graph.status,
      states: noWriterWall.graph.states.length,
      edges: noWriterWall.graph.edges.length,
      wins: noWriterWall.graph.winStateIndexes.size,
      canonical_normal_win: noWriterWallCanonical.isWin,
      canonical_douse_reignite_events_absent:
        !noWriterWallCanonical.events.includes("extinguish_by_wall:candle#1") &&
        !noWriterWallCanonical.events.includes("ignite_from_brazier:candle#1:6,5") &&
        !noWriterWallCanonical.events.includes("roll_reignite_after_extinguish:candle#1:d2->d3"),
    },
    remove_reignite_source_6_5: {
      status: noReigniteSource.graph.status,
      states: noReigniteSource.graph.states.length,
      edges: noReigniteSource.graph.edges.length,
      wins: noReigniteSource.graph.winStateIndexes.size,
    },
  },
  remove_timing_wall_8_7: {
    status: noTimingWall.graph.status,
    states: noTimingWall.graph.states.length,
    edges: noTimingWall.graph.edges.length,
    wins: noTimingWall.graph.winStateIndexes.size,
    shortest_win_depth: Math.min(
      ...[...noTimingWall.graph.winStateIndexes].map((index) => noTimingWall.graph.depthByIndex[index]!),
    ),
    win_keys_equal_exact: JSON.stringify(
      [...noTimingWall.graph.winStateIndexes].map((index) => noTimingWall.graph.keys[index]).sort(),
    ) === JSON.stringify(
      [...full.graph.winStateIndexes].map((index) => full.graph.keys[index]).sort(),
    ),
    win_reachable_subgraph: {
      exact_states: exactViableKeys.size,
      counterfactual_states: noTimingWallViableKeys.size,
      exact_edges: exactViableEdges.size,
      counterfactual_edges: noTimingWallViableEdges.size,
      state_keys_equal:
        exactViableKeys.size === noTimingWallViableKeys.size &&
        [...exactViableKeys].every((key) => noTimingWallViableKeys.has(key)),
      edge_signatures_equal:
        exactViableEdges.size === noTimingWallViableEdges.size &&
        [...exactViableEdges].every((key) => noTimingWallViableEdges.has(key)),
    },
    required_on_every_win: {
      same_roll_douse_reignite: !noTimingWallWinWithout((events) =>
        events.includes("extinguish_by_wall:candle#1") &&
        events.includes("ignite_from_brazier:candle#1:6,5") &&
        events.includes("roll_reignite_after_extinguish:candle#1:d2->d3")),
      writer_d4: !noTimingWallWinWithout((events) => events.includes("roll_candle:candle#1:d4")),
      shrink_ignite_relay: !noTimingWallWinWithout((events) => events.includes("shrink_ignite:candle#2")),
      relay_len1: !noTimingWallWinWithout((events) => events.includes("shrink:candle#2:len1")),
      final_roll_and_target: !noTimingWallWinWithout((events) =>
        events.includes("roll_candle:candle#2:d6") && events.includes("light_brazier:2,7")),
    },
    canonical_legal_and_win: noTimingWallCanonical.isWin,
    canonical_important_events: importantEvents(noTimingWallCanonical.events),
  },
};

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
