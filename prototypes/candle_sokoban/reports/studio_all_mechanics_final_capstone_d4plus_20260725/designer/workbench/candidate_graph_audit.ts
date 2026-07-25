import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { eventMatchesPattern } from "../../../../../../src/core/events.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = path.resolve(
  process.argv[2] ?? path.join(path.dirname(new URL(import.meta.url).pathname), "candidate_work_layout.txt"),
);
const outPath = process.argv[3] ? path.resolve(process.argv[3]) : undefined;
const candidateId = process.argv[4] ?? "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_WORK";
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = {
  id: candidateId,
  title: candidateId,
  global_burn_cycle: 5,
  layout,
};
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  winCondition,
  { winCondition },
  { maxStates: 300_000, maxTransitions: 1_000_000, terminalizeWins: true },
);

const patterns = [
  "roll_reignite_after_extinguish:candle#1:d1->d4",
  "boundary_ignite_participates:candle#1",
  "shrink_ignite:candle#single4",
  "ignite:candle#2",
  "push_axis:candle#2",
  "roll_candle:candle#single2:d1",
  "push_axis:candle#single2",
  "light_brazier:3,4",
];
const keyIgnitionPatterns = ["shrink_ignite:candle#single2", "ignite:candle#single2"];

const adjacency: number[][] = Array.from({ length: graph.keys.length }, () => []);
const reverse: number[][] = Array.from({ length: graph.keys.length }, () => []);
for (const [index, edge] of graph.edges.entries()) {
  adjacency[edge.from]!.push(index);
  reverse[edge.to]!.push(index);
}

function edgeHas(edgeIndex: number, pattern: string): boolean {
  return graph.edges[edgeIndex]!.events.some((event) => eventMatchesPattern(event, pattern));
}

function findWinAvoiding(pattern: string): { found: boolean; reachable: number; inputs?: string[] } {
  return findWinAvoidingAny([pattern]);
}

function findWinAvoidingAny(
  avoidedPatterns: string[],
): { found: boolean; reachable: number; inputs?: string[] } {
  const seen = new Uint8Array(graph.keys.length);
  const predecessorNode = new Int32Array(graph.keys.length).fill(-1);
  const predecessorEdge = new Int32Array(graph.keys.length).fill(-1);
  const queue = new Int32Array(graph.keys.length);
  let head = 0;
  let tail = 1;
  let reachable = 1;
  queue[0] = 0;
  seen[0] = 1;
  while (head < tail) {
    const node = queue[head++]!;
    if (graph.winStateIndexes.has(node)) {
      const inputs: string[] = [];
      let cursor = node;
      while (cursor !== 0) {
        const edgeIndex = predecessorEdge[cursor]!;
        inputs.push(graph.edges[edgeIndex]!.action);
        cursor = predecessorNode[cursor]!;
      }
      return { found: true, reachable, inputs: inputs.reverse() };
    }
    for (const edgeIndex of adjacency[node]!) {
      if (avoidedPatterns.some((pattern) => edgeHas(edgeIndex, pattern))) continue;
      const next = graph.edges[edgeIndex]!.to;
      if (seen[next]) continue;
      seen[next] = 1;
      predecessorNode[next] = node;
      predecessorEdge[next] = edgeIndex;
      queue[tail++] = next;
      reachable += 1;
    }
  }
  return { found: false, reachable };
}

function findOrderViolation(
  earlier: string,
  later: string,
): { found: boolean; visited_product_states: number } {
  // mode 0: earlier 尚未发生；mode 1: earlier 已发生；mode 2: later 抢先发生。
  const size = graph.keys.length;
  const seen = new Uint8Array(size * 3);
  const queueNode = new Int32Array(size * 3);
  const queueMode = new Uint8Array(size * 3);
  let head = 0;
  let tail = 1;
  queueNode[0] = 0;
  queueMode[0] = 0;
  seen[0] = 1;
  while (head < tail) {
    const node = queueNode[head]!;
    const mode = queueMode[head++]!;
    if (mode === 2 && graph.winStateIndexes.has(node)) {
      return { found: true, visited_product_states: tail };
    }
    for (const edgeIndex of adjacency[node]!) {
      const edge = graph.edges[edgeIndex]!;
      let nextMode = mode;
      for (const event of edge.events) {
        if (nextMode === 0 && eventMatchesPattern(event, later)) nextMode = 2;
        if (nextMode === 0 && eventMatchesPattern(event, earlier)) nextMode = 1;
      }
      const key = nextMode * size + edge.to;
      if (seen[key]) continue;
      seen[key] = 1;
      queueNode[tail] = edge.to;
      queueMode[tail] = nextMode;
      tail += 1;
    }
  }
  return { found: false, visited_product_states: tail };
}

const distanceToWin = new Int32Array(graph.keys.length).fill(-1);
const reverseQueue = new Int32Array(graph.keys.length);
let reverseHead = 0;
let reverseTail = 0;
for (const win of graph.winStateIndexes) {
  distanceToWin[win] = 0;
  reverseQueue[reverseTail++] = win;
}
while (reverseHead < reverseTail) {
  const node = reverseQueue[reverseHead++]!;
  for (const edgeIndex of reverse[node]!) {
    const previous = graph.edges[edgeIndex]!.from;
    if (distanceToWin[previous] >= 0) continue;
    distanceToWin[previous] = distanceToWin[node]! + 1;
    reverseQueue[reverseTail++] = previous;
  }
}

const shortestSolutions: string[][] = [];
function collectShortest(node: number, inputs: string[]): void {
  if (shortestSolutions.length >= 20) return;
  if (graph.winStateIndexes.has(node)) {
    shortestSolutions.push([...inputs]);
    return;
  }
  const distance = distanceToWin[node]!;
  for (const edgeIndex of adjacency[node]!) {
    const edge = graph.edges[edgeIndex]!;
    if (distanceToWin[edge.to] !== distance - 1) continue;
    inputs.push(edge.action);
    collectShortest(edge.to, inputs);
    inputs.pop();
  }
}
if (distanceToWin[0] >= 0) collectShortest(0, []);

function representativePathTo(node: number): number[] {
  const reversed: number[] = [];
  let cursor = node;
  while (cursor !== 0) {
    const edgeIndex = reverse[cursor]!.find(
      (candidate) => graph.depthByIndex[graph.edges[candidate]!.from] === graph.depthByIndex[cursor]! - 1,
    );
    if (edgeIndex === undefined) throw new Error(`无法为状态 ${cursor} 重建 BFS 代表路径。`);
    reversed.push(edgeIndex);
    cursor = graph.edges[edgeIndex]!.from;
  }
  return reversed.reverse();
}

const winningStateRepresentatives = [...graph.winStateIndexes]
  .sort((left, right) => left - right)
  .map((winStateIndex) => {
    const edgeIndexes = representativePathTo(winStateIndex);
    const events = edgeIndexes.flatMap((edgeIndex) => graph.edges[edgeIndex]!.events);
    return {
      win_state_index: winStateIndex,
      depth: graph.depthByIndex[winStateIndex],
      final_state_key: graph.keys[winStateIndex],
      inputs: edgeIndexes.map((edgeIndex) => graph.edges[edgeIndex]!.action),
      feature_signature: {
        core_roll_reignite: events.includes("roll_reignite_after_extinguish:candle#1:d1->d4"),
        core_same_action_boundary: events.includes("boundary_ignite_participates:candle#1"),
        endpoint_shrink_ignite: events.includes("shrink_ignite:candle#single4"),
        terminal_output_ignites_vertical_candle: events.includes("ignite:candle#2"),
        vertical_candle_pushed: events.includes("push_axis:candle#2"),
        key_side_roll: events.includes("roll_candle:candle#single2:d1"),
        key_shrink_ignition: events.includes("shrink_ignite:candle#single2"),
        key_direct_ignition: events.includes("ignite:candle#single2"),
        key_axis_push: events.includes("push_axis:candle#single2"),
        final_brazier: events.includes("light_brazier:3,4"),
      },
      edge_indexes: edgeIndexes,
    };
  });

const edgeFacts = Object.fromEntries(
  patterns.map((pattern) => {
    const indexes = graph.edges
      .map((_, index) => index)
      .filter((index) => edgeHas(index, pattern));
    return [pattern, { edge_count: indexes.length, first_edge_indexes: indexes.slice(0, 20) }];
  }),
);

const milestoneOrder = patterns.filter((pattern) => pattern !== "boundary_ignite_participates:candle#1");
const orderAudit = milestoneOrder.slice(0, -1).map((earlier, index) => ({
  earlier,
  later: milestoneOrder[index + 1]!,
  winning_order_violation: findOrderViolation(earlier, milestoneOrder[index + 1]!).found,
}));

const coreEdges = graph.edges
  .map((edge, index) => ({ edge, index }))
  .filter(({ index }) => edgeHas(index, patterns[0]!));
const coreCooccurrence = coreEdges.map(({ edge, index }) => ({
  edge_index: index,
  action: edge.action,
  has_boundary_participation: edge.events.includes("boundary_ignite_participates:candle#1"),
  has_shrink: edge.events.includes("shrink:candle#1:len1"),
  has_endpoint_ignite: edge.events.includes("shrink_ignite:candle#single4"),
}));

const report = {
  schema_version: 1,
  candidate: level.id,
  graph: {
    status: graph.status,
    reason: graph.reason ?? null,
    reachable_states: graph.keys.length,
    legal_transitions: graph.edges.length,
    winning_states: graph.winStateIndexes.size,
    shortest_cost: distanceToWin[0],
  },
  required_event_audit: Object.fromEntries(
    patterns.map((pattern) => {
      const bypass = findWinAvoiding(pattern);
      return [
        pattern,
        {
          required_on_every_win: !bypass.found,
          win_without_event: bypass.found,
          avoidance_reachable_states: bypass.reachable,
          ...(bypass.inputs ? { counterexample_inputs: bypass.inputs } : {}),
        },
      ];
    }),
  ),
  required_event_group_audit: {
    key_ignition_by_acquired_source: (() => {
      const bypass = findWinAvoidingAny(keyIgnitionPatterns);
      return {
        patterns: keyIgnitionPatterns,
        required_on_every_win: !bypass.found,
        win_without_group: bypass.found,
        avoidance_reachable_states: bypass.reachable,
        ...(bypass.inputs ? { counterexample_inputs: bypass.inputs } : {}),
      };
    })(),
  },
  optional_key_ignition_family_audit: Object.fromEntries(
    keyIgnitionPatterns.map((pattern) => {
      const bypass = findWinAvoiding(pattern);
      return [
        pattern,
        {
          some_win_uses_alternative: bypass.found,
          avoidance_reachable_states: bypass.reachable,
          ...(bypass.inputs ? { alternative_inputs: bypass.inputs } : {}),
        },
      ];
    }),
  ),
  milestone_order_audit: orderAudit,
  core_same_edge_audit: coreCooccurrence,
  reachable_event_edges: edgeFacts,
  shortest_solutions_sample: shortestSolutions,
  winning_state_representatives: winningStateRepresentatives,
};

const json = `${JSON.stringify(report, null, 2)}\n`;
if (outPath) {
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, json, "utf8");
  process.stdout.write(
    `candidate_graph_audit graph=${graph.status} states=${graph.keys.length} edges=${graph.edges.length} wins=${graph.winStateIndexes.size} out=${outPath}\n`,
  );
} else {
  process.stdout.write(json);
}
