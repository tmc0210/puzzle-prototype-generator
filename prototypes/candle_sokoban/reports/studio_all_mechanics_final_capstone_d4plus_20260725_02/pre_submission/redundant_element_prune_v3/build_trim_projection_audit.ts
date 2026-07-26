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
type ReplayProbe = {
  baseline: { canonical: { state_timeline: string[]; events_by_step: string[][]; first_win_step: number } };
  probes: Array<{
    candidate_id: string;
    parse: string;
    canonical?: { state_timeline: string[]; events_by_step: string[][]; first_win_step: number };
  }>;
};

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02",
);
const baselineRef = path.join(taskRoot, "candidate/versions/v003/exposure_audit.json");
const probeRef = path.join(taskRoot, "pre_submission/redundant_element_prune_v3/trim_left2_exposure_audit.json");
const canonicalProbeRef = path.join(taskRoot, "pre_submission/redundant_element_prune_v3/canonical_probe.json");
const baseline = await readJson<Audit>(baselineRef);
const probe = await readJson<Audit>(probeRef);
const canonical = await readJson<ReplayProbe>(canonicalProbeRef);
const trimProbe = canonical.probes.find((item) => item.candidate_id === "outer_outline_band:left:0,0:22");
if (!trimProbe?.canonical) throw new Error("缺少 left-two-column trim canonical probe");

const baselineStateKeys = new Set(baseline.raw_graph.nodes.map((node) => node.key));
const projectedProbeStateKeys = new Set(probe.raw_graph.nodes.map((node) => shiftCoordinates(node.key, 2)));
const baselineEdges = new Set(baseline.raw_graph.edges.map((edge) => edgeSignature(baseline, edge, 0)));
const projectedProbeEdges = new Set(probe.raw_graph.edges.map((edge) => edgeSignature(probe, edge, 2)));
const baselineEvents = eventSet(baseline.raw_graph.edges, 0);
const projectedProbeEvents = eventSet(probe.raw_graph.edges, 2);
const newMechanismEvents = [...projectedProbeEvents].filter((event) => !baselineEvents.has(event)).sort();

const projectedCanonicalStates = trimProbe.canonical.state_timeline.map((key) => shiftCoordinates(key, 2));
const projectedCanonicalEvents = trimProbe.canonical.events_by_step.map((events) =>
  events.map((event) => shiftCoordinates(event, 2))
);
const canonicalProjectionEqual =
  JSON.stringify(canonical.baseline.canonical.state_timeline) === JSON.stringify(projectedCanonicalStates)
  && JSON.stringify(canonical.baseline.canonical.events_by_step) === JSON.stringify(projectedCanonicalEvents)
  && canonical.baseline.canonical.first_win_step === trimProbe.canonical.first_win_step;

const requiredGroups = {
  opening_receiver_axis_choice: (events: string[]) => events.includes("push_axis:candle#2"),
  same_roll_wall_douse_reignite_and_first_transfer: (events: string[]) =>
    events.includes("roll_candle:candle#1:d3")
    && events.includes("extinguish_by_wall:candle#1")
    && events.includes("ignite_from_brazier:candle#1:2,5")
    && events.includes("shrink_ignite:candle#2"),
  active_relay_roll_lights_gate_and_places_cover: (events: string[]) =>
    events.includes("roll_candle:candle#2:d3")
    && events.includes("light_brazier:4,6"),
  placed_relay_retreat_transfers_to_consumer: (events: string[]) =>
    events.includes("shrink_ignite:candle#3"),
  final_consumer_roll_lights_brazier: (events: string[]) =>
    events.includes("roll_candle:candle#3:d6")
    && events.includes("light_brazier:7,2"),
};
const requiredGroupAudit = Object.fromEntries(Object.entries(requiredGroups).map(([id, predicate]) => [
  id,
  { required_on_every_win: !winAvoiding(probe, predicate) },
]));

const report = {
  schema_version: 1,
  method: "candle_outer_outline_coordinate_projection_v1",
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  reviewed_exact_version: "v003",
  proposed_delivery_exact_version: "v004",
  operation: {
    kind: "outer_outline_band",
    side: "left",
    removed_columns: 2,
    coordinate_projection: "delivery x + 2 = reviewed x; y unchanged",
  },
  artifact_identity: {
    baseline_ref: relative(baselineRef),
    baseline_sha256: await digestFile(baselineRef),
    probe_ref: relative(probeRef),
    probe_sha256: await digestFile(probeRef),
    canonical_probe_ref: relative(canonicalProbeRef),
    canonical_probe_sha256: await digestFile(canonicalProbeRef),
  },
  canonical_projection: {
    state_and_event_timeline_equal_after_coordinate_projection: canonicalProjectionEqual,
    first_win_step_baseline: canonical.baseline.canonical.first_win_step,
    first_win_step_probe: trimProbe.canonical.first_win_step,
  },
  complete_graph_projection: {
    baseline: baseline.graph,
    probe: probe.graph,
    baseline_graph_complete: baseline.graph.status === "complete",
    probe_graph_complete: probe.graph.status === "complete",
    all_state_keys_equal_after_projection: setEquals(baselineStateKeys, projectedProbeStateKeys),
    all_edge_signatures_equal_after_projection: setEquals(baselineEdges, projectedProbeEdges),
    win_state_count_equal: baseline.graph.win_state_count === probe.graph.win_state_count,
    shortest_cost_baseline: shortestWinDepth(baseline),
    shortest_cost_probe: shortestWinDepth(probe),
    shortest_cost_preserved: shortestWinDepth(baseline) === shortestWinDepth(probe),
  },
  required_winning_relation_audit: requiredGroupAudit,
  new_mechanism_events_after_projection: newMechanismEvents,
  new_contact_events_after_projection: newMechanismEvents.filter((event) =>
    /ignite|extinguish|light_brazier|shrink|burn_out/.test(event)
  ),
  exposure: {
    graph_status: probe.graph.status,
    verdict: probe.verdict,
    forbidden_hit_count: probe.forbidden_hits.length,
  },
  preservation_verdict:
    canonicalProjectionEqual
    && baseline.graph.status === "complete"
    && probe.graph.status === "complete"
    && setEquals(baselineStateKeys, projectedProbeStateKeys)
    && setEquals(baselineEdges, projectedProbeEdges)
    && baseline.graph.win_state_count === probe.graph.win_state_count
    && shortestWinDepth(baseline) === shortestWinDepth(probe)
    && Object.values(requiredGroupAudit).every((item) => item.required_on_every_win)
    && newMechanismEvents.length === 0
    && probe.verdict === "pass"
    && probe.forbidden_hits.length === 0
      ? "pass"
      : "fail",
};

await writeFile(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v3/trim_left2_projection_audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);

function edgeSignature(audit: Audit, edge: Edge, dx: number): string {
  return [
    shiftCoordinates(audit.raw_graph.nodes[edge.from]!.key, dx),
    edge.action,
    JSON.stringify(edge.events.map((event) => shiftCoordinates(event, dx))),
    shiftCoordinates(audit.raw_graph.nodes[edge.to]!.key, dx),
  ].join("\n");
}

function shiftCoordinates(value: string, dx: number): string {
  if (dx === 0) return value;
  return value.replace(/(-?\d+),(-?\d+)/g, (_match, x, y) => `${Number(x) + dx},${y}`);
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
      if (predicate(edge.events)) continue;
      if (seen[edge.to]) continue;
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

function eventSet(edges: Edge[], dx: number): Set<string> {
  return new Set(edges.flatMap((edge) => edge.events.map((event) => shiftCoordinates(event, dx))));
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
