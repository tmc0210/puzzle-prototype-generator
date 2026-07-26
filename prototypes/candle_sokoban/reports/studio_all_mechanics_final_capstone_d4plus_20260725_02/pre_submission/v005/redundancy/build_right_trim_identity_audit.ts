import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type Node = { index: number; key: string; depth: number; winning: boolean };
type Edge = { index: number; from: number; to: number; action: string; events: string[] };
type Audit = {
  level: { layout_sha256: string };
  graph: {
    status: string;
    reachable_state_count: number;
    legal_transition_count: number;
    win_state_count: number;
    max_observed_depth: number;
  };
  verdict: string;
  forbidden_hits: unknown[];
  raw_graph: { nodes: Node[]; edges: Edge[] };
};
type Replay = {
  initial: { key: string };
  final: { key: string; isWin: boolean };
  steps: Array<{ step: number; input: string; legal: boolean; events: string[]; after: { key: string; isWin: boolean } }>;
};

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02",
);
const baselineExposureRef = path.join(taskRoot, "candidate/versions/v005/exposure_audit.json");
const deliveryExposureRef = path.join(taskRoot, "candidate/versions/v006/exposure_audit.json");
const baselineReplayRef = path.join(taskRoot, "candidate/versions/v005/canonical_replay.json");
const deliveryReplayRef = path.join(taskRoot, "candidate/versions/v006/canonical_replay.json");
const baseline = await readJson<Audit>(baselineExposureRef);
const delivery = await readJson<Audit>(deliveryExposureRef);
const baselineReplay = await readJson<Replay>(baselineReplayRef);
const deliveryReplay = await readJson<Replay>(deliveryReplayRef);

const baselineStateKeys = new Set(baseline.raw_graph.nodes.map((node) => node.key));
const deliveryStateKeys = new Set(delivery.raw_graph.nodes.map((node) => node.key));
const baselineEdges = new Set(baseline.raw_graph.edges.map((edge) => edgeSignature(baseline, edge)));
const deliveryEdges = new Set(delivery.raw_graph.edges.map((edge) => edgeSignature(delivery, edge)));
const baselineEvents = eventSet(baseline.raw_graph.edges);
const deliveryEvents = eventSet(delivery.raw_graph.edges);
const newMechanismEvents = [...deliveryEvents].filter((event) => !baselineEvents.has(event)).sort();
const removedMechanismEvents = [...baselineEvents].filter((event) => !deliveryEvents.has(event)).sort();

const canonicalTimelineEqual =
  baselineReplay.initial.key === deliveryReplay.initial.key
  && baselineReplay.final.key === deliveryReplay.final.key
  && baselineReplay.final.isWin === deliveryReplay.final.isWin
  && JSON.stringify(baselineReplay.steps.map(stepSignature))
    === JSON.stringify(deliveryReplay.steps.map(stepSignature));

const requiredGroups = {
  writer_d4_wall_douse_reignite: (events: string[]) =>
    events.includes("roll_candle:candle#1:d4")
    && events.includes("extinguish_by_wall:candle#1")
    && events.includes("ignite_from_brazier:candle#1:6,5"),
  writer_retreat_transfer_to_relay: (events: string[]) =>
    events.includes("shrink_ignite:candle#2"),
  relay_second_boundary_to_len1: (events: string[]) =>
    events.includes("shrink:candle#2:len1"),
  relay_final_d6_lights_target: (events: string[]) =>
    events.includes("roll_candle:candle#2:d6")
    && events.includes("light_brazier:2,7"),
};
const requiredGroupAudit = Object.fromEntries(Object.entries(requiredGroups).map(([id, predicate]) => [
  id,
  { required_on_every_win: !winAvoiding(delivery, predicate) },
]));

const report = {
  schema_version: 1,
  method: "candle_right_outer_outline_identity_v1",
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  reviewed_exact_version: "v005",
  proposed_delivery_exact_version: "v006",
  operation: {
    kind: "outer_outline_band",
    side: "right",
    removed_columns: 1,
    coordinate_projection: "all retained x/y coordinates unchanged",
  },
  artifact_identity: {
    baseline_exposure_ref: relative(baselineExposureRef),
    baseline_exposure_sha256: await digestFile(baselineExposureRef),
    delivery_exposure_ref: relative(deliveryExposureRef),
    delivery_exposure_sha256: await digestFile(deliveryExposureRef),
    baseline_replay_ref: relative(baselineReplayRef),
    baseline_replay_sha256: await digestFile(baselineReplayRef),
    delivery_replay_ref: relative(deliveryReplayRef),
    delivery_replay_sha256: await digestFile(deliveryReplayRef),
  },
  canonical_identity: {
    state_event_input_timeline_equal: canonicalTimelineEqual,
    first_win_step_baseline: firstWinStep(baselineReplay),
    first_win_step_delivery: firstWinStep(deliveryReplay),
  },
  complete_graph_identity: {
    baseline: baseline.graph,
    delivery: delivery.graph,
    baseline_graph_complete: baseline.graph.status === "complete",
    delivery_graph_complete: delivery.graph.status === "complete",
    all_state_keys_equal: setEquals(baselineStateKeys, deliveryStateKeys),
    all_edge_signatures_equal: setEquals(baselineEdges, deliveryEdges),
    win_state_count_equal: baseline.graph.win_state_count === delivery.graph.win_state_count,
    shortest_cost_baseline: shortestWinDepth(baseline),
    shortest_cost_delivery: shortestWinDepth(delivery),
    shortest_cost_preserved: shortestWinDepth(baseline) === shortestWinDepth(delivery),
  },
  accepted_hard_claims_preserved_by_graph_identity: {
    solution_family: true,
    downstream_two_local_success_classification: true,
    whole_region_deletion_classification: true,
    object_participation: true,
    identity_counterfactuals: true,
  },
  required_winning_relation_audit: requiredGroupAudit,
  new_mechanism_events: newMechanismEvents,
  removed_mechanism_events: removedMechanismEvents,
  new_contact_events: newMechanismEvents.filter((event) =>
    /ignite|extinguish|light_brazier|shrink|burn_out/.test(event)
  ),
  exposure: {
    graph_status: delivery.graph.status,
    verdict: delivery.verdict,
    forbidden_hit_count: delivery.forbidden_hits.length,
  },
  preservation_verdict:
    canonicalTimelineEqual
    && baseline.graph.status === "complete"
    && delivery.graph.status === "complete"
    && setEquals(baselineStateKeys, deliveryStateKeys)
    && setEquals(baselineEdges, deliveryEdges)
    && baseline.graph.win_state_count === delivery.graph.win_state_count
    && shortestWinDepth(baseline) === shortestWinDepth(delivery)
    && Object.values(requiredGroupAudit).every((item) => item.required_on_every_win)
    && newMechanismEvents.length === 0
    && removedMechanismEvents.length === 0
    && delivery.verdict === "pass"
    && delivery.forbidden_hits.length === 0
      ? "pass"
      : "fail",
};

await writeFile(
  path.join(taskRoot, "pre_submission/v005/redundancy/right_trim_identity_audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);

function stepSignature(step: Replay["steps"][number]) {
  return {
    step: step.step,
    input: step.input,
    legal: step.legal,
    events: step.events,
    after: { key: step.after.key, isWin: step.after.isWin },
  };
}

function firstWinStep(replay: Replay): number | null {
  return replay.steps.find((step) => step.after.isWin)?.step ?? null;
}

function edgeSignature(audit: Audit, edge: Edge): string {
  return [
    audit.raw_graph.nodes[edge.from]!.key,
    edge.action,
    JSON.stringify(edge.events),
    audit.raw_graph.nodes[edge.to]!.key,
  ].join("\n");
}

function winAvoiding(audit: Audit, predicate: (events: string[]) => boolean): boolean {
  const adjacency: Edge[][] = Array.from({ length: audit.raw_graph.nodes.length }, () => []);
  for (const edge of audit.raw_graph.edges) adjacency[edge.from]!.push(edge);
  const seen = new Uint8Array(audit.raw_graph.nodes.length);
  const queue = new Int32Array(audit.raw_graph.nodes.length);
  seen[0] = 1;
  let head = 0;
  let tail = 1;
  while (head < tail) {
    const node = queue[head++]!;
    if (audit.raw_graph.nodes[node]!.winning) return true;
    for (const edge of adjacency[node]!) {
      if (predicate(edge.events) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      queue[tail++] = edge.to;
    }
  }
  return false;
}

function shortestWinDepth(audit: Audit): number | null {
  const depths = audit.raw_graph.nodes.filter((node) => node.winning).map((node) => node.depth);
  return depths.length > 0 ? Math.min(...depths) : null;
}

function eventSet(edges: Edge[]): Set<string> {
  return new Set(edges.flatMap((edge) => edge.events));
}

function setEquals<T>(left: Set<T>, right: Set<T>): boolean {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

function relative(filePath: string): string {
  return path.relative(process.cwd(), filePath).replaceAll("\\", "/");
}

async function digestFile(filePath: string): Promise<string> {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}
