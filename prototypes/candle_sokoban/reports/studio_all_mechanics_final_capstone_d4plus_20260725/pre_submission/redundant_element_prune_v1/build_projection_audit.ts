import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../../../../src/core/events.js";

type RawNode = { index: number; depth: number; winning: boolean };
type RawEdge = { from: number; to: number; action: string; events: string[] };
type RawExposure = {
  graph: {
    status: string;
    reachable_state_count: number;
    legal_transition_count: number;
    win_state_count: number;
  };
  verdict: string;
  forbidden_hits: unknown[];
  raw_graph: { nodes: RawNode[]; edges: RawEdge[] };
};
type Replay = {
  inputs: string[];
  initial: { key: string; isWin: boolean };
  steps: Array<{ step: number; events: string[]; after: { key: string; isWin: boolean } }>;
};

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725",
);
const baselineExposure = await readJson<RawExposure>(
  path.join(taskRoot, "candidate/versions/v1/diagnostics/exposure_audit.json"),
);
const finalExposure = await readJson<RawExposure>(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1/final_exposure_audit.json"),
);
const baselineReplay = await readJson<Replay>(
  path.join(taskRoot, "candidate/versions/v1/canonical_replay.json"),
);
const finalReplay = await readJson<Replay>(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1/final_compact_replay/canonical_replay.json"),
);
const baselineFamily = await readJson<any>(
  path.join(taskRoot, "candidate/versions/v1/diagnostics/complete_graph_and_solution_family.json"),
);
const finalFamily = await readJson<any>(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1/final_compact_graph.json"),
);

const nodes = finalExposure.raw_graph.nodes;
const edges = finalExposure.raw_graph.edges;
const adjacency: number[][] = Array.from({ length: nodes.length }, () => []);
for (const [edgeIndex, edge] of edges.entries()) adjacency[edge.from]!.push(edgeIndex);

const requiredPatterns = [
  "roll_reignite_after_extinguish:candle#1:d1->d4",
  "boundary_ignite_participates:candle#1",
  "ignite:candle#2",
  "push_axis:candle#2",
  "roll_candle:candle#single2:d1",
  "push_axis:candle#single2",
  "light_brazier:2,4",
];
const orderedPatterns = [
  "roll_reignite_after_extinguish:candle#1:d1->d4",
  "ignite:candle#2",
  "push_axis:candle#2",
  "roll_candle:candle#single2:d1",
  "push_axis:candle#single2",
  "light_brazier:2,4",
];
const keyIgnitionPatterns = ["shrink_ignite:candle#single2", "ignite:candle#single2"];

const canonicalStateProjection = [baselineReplay.initial, ...baselineReplay.steps.map((step) => step.after)]
  .map((snapshot) => eraseEndpointCandleFromKey(snapshot.key));
const finalStateProjection = [finalReplay.initial, ...finalReplay.steps.map((step) => step.after)]
  .map((snapshot) => shiftCoordinates(snapshot.key, 1));
const canonicalEventProjection = baselineReplay.steps.map((step) =>
  step.events.flatMap(eraseEndpointCandleFromEvent)
);
const finalEventProjection = finalReplay.steps.map((step) =>
  step.events.map((event) => shiftCoordinates(event, 1))
);

const baselineEventSet = projectedEventSet(baselineExposure.raw_graph.edges, "baseline");
const finalEventSet = projectedEventSet(finalExposure.raw_graph.edges, "final");
const finalOnlyEvents = [...finalEventSet].filter((event) => !baselineEventSet.has(event)).sort();

const baselineRepresentativeInputs = representativeInputSet(baselineFamily.winning_state_representatives);
const finalRepresentativeInputs = representativeInputSet(finalFamily.winning_state_representatives);

const requiredEventAudit = Object.fromEntries(requiredPatterns.map((pattern) => {
  const avoiding = findWinAvoiding([pattern]);
  return [pattern, {
    required_on_every_win: !avoiding.found,
    win_without_event: avoiding.found,
    avoidance_reachable_states: avoiding.reachable,
  }];
}));
const keyIgnitionAvoiding = findWinAvoiding(keyIgnitionPatterns);
const orderAudit = orderedPatterns.slice(0, -1).map((earlier, index) => ({
  earlier,
  later: orderedPatterns[index + 1]!,
  winning_order_violation: findOrderViolation(earlier, orderedPatterns[index + 1]!),
}));

const report = {
  schema_version: 1,
  method: "candle_object_erasure_and_coordinate_projection_v1",
  baseline_exact_version: "v1",
  delivery_exact_version: "v2",
  erased_object: "candle#single4",
  coordinate_projection: "delivery x + 1 -> reviewed x; y unchanged",
  canonical_projection: {
    inputs_equal: JSON.stringify(baselineReplay.inputs) === JSON.stringify(finalReplay.inputs),
    state_timeline_equal: JSON.stringify(canonicalStateProjection) === JSON.stringify(finalStateProjection),
    event_timeline_equal: JSON.stringify(canonicalEventProjection) === JSON.stringify(finalEventProjection),
    baseline_initial_win: baselineReplay.initial.isWin,
    delivery_initial_win: finalReplay.initial.isWin,
    baseline_first_win_step: baselineReplay.steps.find((step) => step.after.isWin)?.step ?? null,
    delivery_first_win_step: finalReplay.steps.find((step) => step.after.isWin)?.step ?? null,
  },
  complete_graph_projection: {
    baseline: baselineExposure.graph,
    delivery: finalExposure.graph,
    baseline_shortest_cost: baselineFamily.graph.shortest_cost,
    delivery_shortest_cost: finalFamily.graph.shortest_cost,
    winning_representative_inputs_equal: setEquals(
      baselineRepresentativeInputs,
      finalRepresentativeInputs,
    ),
    baseline_winning_representative_inputs: [...baselineRepresentativeInputs].sort(),
    delivery_winning_representative_inputs: [...finalRepresentativeInputs].sort(),
    projected_event_set_final_only: finalOnlyEvents,
    no_new_mechanism_event: finalOnlyEvents.length === 0,
  },
  required_event_audit: requiredEventAudit,
  required_event_group_audit: {
    key_ignition_by_acquired_source: {
      patterns: keyIgnitionPatterns,
      required_on_every_win: !keyIgnitionAvoiding.found,
      win_without_group: keyIgnitionAvoiding.found,
      avoidance_reachable_states: keyIgnitionAvoiding.reachable,
    },
  },
  milestone_order_audit: orderAudit,
  exposure: {
    graph_status: finalExposure.graph.status,
    verdict: finalExposure.verdict,
    forbidden_hit_count: finalExposure.forbidden_hits.length,
  },
};

await writeFile(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1/projection_audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify({
  canonical: report.canonical_projection,
  complete_graph: {
    baseline: report.complete_graph_projection.baseline,
    delivery: report.complete_graph_projection.delivery,
    shortest_equal: report.complete_graph_projection.baseline_shortest_cost
      === report.complete_graph_projection.delivery_shortest_cost,
    winning_family_equal: report.complete_graph_projection.winning_representative_inputs_equal,
    final_only_events: report.complete_graph_projection.projected_event_set_final_only,
  },
  required_events_all_hold: Object.values(requiredEventAudit).every((item) => item.required_on_every_win),
  required_group_holds: report.required_event_group_audit.key_ignition_by_acquired_source.required_on_every_win,
  order_holds: orderAudit.every((item) => !item.winning_order_violation),
  exposure: report.exposure,
}, null, 2)}\n`);

function edgeHas(edgeIndex: number, pattern: string): boolean {
  return edges[edgeIndex]!.events.some((event) => eventMatchesPattern(event, pattern));
}

function findWinAvoiding(patterns: string[]): { found: boolean; reachable: number } {
  const seen = new Uint8Array(nodes.length);
  const queue = new Int32Array(nodes.length);
  let head = 0;
  let tail = 1;
  let reachable = 1;
  seen[0] = 1;
  while (head < tail) {
    const node = queue[head++]!;
    if (nodes[node]!.winning) return { found: true, reachable };
    for (const edgeIndex of adjacency[node]!) {
      if (patterns.some((pattern) => edgeHas(edgeIndex, pattern))) continue;
      const next = edges[edgeIndex]!.to;
      if (seen[next]) continue;
      seen[next] = 1;
      queue[tail++] = next;
      reachable += 1;
    }
  }
  return { found: false, reachable };
}

function findOrderViolation(earlier: string, later: string): boolean {
  const size = nodes.length;
  const seen = new Uint8Array(size * 3);
  const queueNode = new Int32Array(size * 3);
  const queueMode = new Uint8Array(size * 3);
  let head = 0;
  let tail = 1;
  seen[0] = 1;
  while (head < tail) {
    const node = queueNode[head]!;
    const mode = queueMode[head++]!;
    if (mode === 2 && nodes[node]!.winning) return true;
    for (const edgeIndex of adjacency[node]!) {
      let nextMode = mode;
      for (const event of edges[edgeIndex]!.events) {
        if (nextMode === 0 && eventMatchesPattern(event, later)) nextMode = 2;
        if (nextMode === 0 && eventMatchesPattern(event, earlier)) nextMode = 1;
      }
      const next = edges[edgeIndex]!.to;
      const key = nextMode * size + next;
      if (seen[key]) continue;
      seen[key] = 1;
      queueNode[tail] = next;
      queueMode[tail] = nextMode;
      tail += 1;
    }
  }
  return false;
}

function projectedEventSet(rawEdges: RawEdge[], source: "baseline" | "final"): Set<string> {
  const values = new Set<string>();
  for (const edge of rawEdges) {
    for (const event of edge.events) {
      const projected = source === "baseline"
        ? eraseEndpointCandleFromEvent(event)
        : [shiftCoordinates(event, 1)];
      for (const value of projected) values.add(value);
    }
  }
  return values;
}

function eraseEndpointCandleFromEvent(event: string): string[] {
  if (!event.includes("candle#single4")) return [event];
  if (event.startsWith("simultaneous_burn:")) {
    const participants = event.slice("simultaneous_burn:".length)
      .split("+")
      .filter((participant) => participant !== "candle#single4");
    return participants.length > 0 ? [`simultaneous_burn:${participants.join("+")}`] : [];
  }
  return [];
}

function eraseEndpointCandleFromKey(key: string): string {
  return key.replace(/\|candle#single4:[^|]+(?=\|B:)/g, "");
}

function shiftCoordinates(value: string, deltaX: number): string {
  return value.replace(/(\d+),(\d+)/g, (_, rawX: string, rawY: string) =>
    `${Number(rawX) + deltaX},${rawY}`
  );
}

function representativeInputSet(representatives: Array<{ inputs: string[] }>): Set<string> {
  return new Set(representatives.map((representative) => representative.inputs.join(",")));
}

function setEquals(left: Set<string>, right: Set<string>): boolean {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}
