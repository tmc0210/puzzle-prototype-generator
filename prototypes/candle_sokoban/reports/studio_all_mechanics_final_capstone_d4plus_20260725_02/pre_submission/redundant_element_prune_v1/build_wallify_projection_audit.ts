import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../../../../src/core/events.js";

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
const baselineRef = path.join(taskRoot, "candidate/versions/v001/exposure_audit.json");
const probeRef = path.join(taskRoot, "pre_submission/redundant_element_prune_v1/wallify_1_1_exposure_audit.json");
const canonicalProbeRef = path.join(taskRoot, "pre_submission/redundant_element_prune_v1/canonical_probe.json");
const baseline = await readJson<Audit>(baselineRef);
const probe = await readJson<Audit>(probeRef);
const canonical = await readJson<ReplayProbe>(canonicalProbeRef);
const wallProbe = canonical.probes.find((item) => item.candidate_id === "single_entry_floor_region:2:1,1:1");
if (!wallProbe?.canonical) throw new Error("缺少 wallify(1,1) canonical probe");

const baselineViable = viableProjection(baseline);
const probeViable = viableProjection(probe);
const viableStateKeysEqual = setEquals(baselineViable.stateKeys, probeViable.stateKeys);
const viableEdgesEqual = setEquals(baselineViable.edgeSignatures, probeViable.edgeSignatures);
const baselineEvents = eventSet(baseline.raw_graph.edges);
const probeEvents = eventSet(probe.raw_graph.edges);
const newMechanismEvents = [...probeEvents].filter((event) => !baselineEvents.has(event)).sort();

const requiredPatterns = [
  "roll_candle:candle#single3:d2",
  "extinguish_by_wall:candle#1",
  "ignite_from_wick:candle#1:4,5",
  "ignite_from_wick:candle#6:4,7",
  "roll_reignite_after_extinguish:candle#1:d1->d2",
  "shrink_ignite:candle#2",
  "shrink_ignite:candle#3",
  "roll_candle:candle#3:d7",
  "light_brazier:2,1",
];
const requiredEventAudit = Object.fromEntries(requiredPatterns.map((pattern) => [
  pattern,
  { required_on_every_win: !winAvoiding(probe, pattern) },
]));
const minimumConsumerPushes = minimumEventCount(probe, "push_axis:candle#3");
const canonicalEqual =
  JSON.stringify(canonical.baseline.canonical.state_timeline) === JSON.stringify(wallProbe.canonical.state_timeline)
  && JSON.stringify(canonical.baseline.canonical.events_by_step) === JSON.stringify(wallProbe.canonical.events_by_step)
  && canonical.baseline.canonical.first_win_step === wallProbe.canonical.first_win_step;

const report = {
  schema_version: 1,
  method: "candle_floor_wallify_win_reachable_graph_projection_v1",
  candidate_id: "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002",
  reviewed_exact_version: "v001",
  delivery_exact_version: "v002",
  operation: { kind: "single_entry_floor_region", cells: [{ x: 1, y: 1 }], replacement: "wall" },
  artifact_identity: {
    baseline_ref: relative(baselineRef),
    baseline_sha256: await digestFile(baselineRef),
    probe_ref: relative(probeRef),
    probe_sha256: await digestFile(probeRef),
    canonical_probe_ref: relative(canonicalProbeRef),
    canonical_probe_sha256: await digestFile(canonicalProbeRef),
  },
  canonical_projection: {
    exact_state_and_event_timeline_equal: canonicalEqual,
    first_win_step_baseline: canonical.baseline.canonical.first_win_step,
    first_win_step_probe: wallProbe.canonical.first_win_step,
  },
  complete_graph: {
    baseline: baseline.graph,
    probe: probe.graph,
    baseline_graph_complete: baseline.graph.status === "complete",
    probe_graph_complete: probe.graph.status === "complete",
    win_state_count_equal: baseline.graph.win_state_count === probe.graph.win_state_count,
    shortest_cost_baseline: shortestWinDepth(baseline),
    shortest_cost_probe: shortestWinDepth(probe),
    shortest_cost_preserved: shortestWinDepth(baseline) === shortestWinDepth(probe),
  },
  winning_family_projection: {
    baseline_win_reachable_states: baselineViable.stateKeys.size,
    probe_win_reachable_states: probeViable.stateKeys.size,
    state_key_sets_equal: viableStateKeysEqual,
    baseline_win_reachable_edges: baselineViable.edgeSignatures.size,
    probe_win_reachable_edges: probeViable.edgeSignatures.size,
    edge_sets_equal: viableEdgesEqual,
    solution_family_preserved: viableStateKeysEqual && viableEdgesEqual,
  },
  required_event_audit: requiredEventAudit,
  minimum_consumer_axis_pushes_on_any_win: minimumConsumerPushes,
  new_mechanism_events: newMechanismEvents,
  new_contact_events: newMechanismEvents.filter((event) =>
    /ignite|extinguish|light_brazier|shrink|burn_out/.test(event)
  ),
  exposure: {
    graph_status: probe.graph.status,
    verdict: probe.verdict,
    forbidden_hit_count: probe.forbidden_hits.length,
  },
  preservation_verdict:
    canonicalEqual
    && baseline.graph.status === "complete"
    && probe.graph.status === "complete"
    && baseline.graph.win_state_count === probe.graph.win_state_count
    && shortestWinDepth(baseline) === shortestWinDepth(probe)
    && viableStateKeysEqual
    && viableEdgesEqual
    && Object.values(requiredEventAudit).every((item) => item.required_on_every_win)
    && minimumConsumerPushes >= 5
    && newMechanismEvents.length === 0
    && probe.verdict === "pass"
    && probe.forbidden_hits.length === 0
      ? "pass"
      : "fail",
};

await writeFile(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1/wallify_1_1_projection_audit.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
await writeFile(
  path.join(taskRoot, "candidate/versions/v002/diagnostics/review_preservation_projection.json"),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);

function viableProjection(audit: Audit) {
  const nodes = audit.raw_graph.nodes;
  const edges = audit.raw_graph.edges;
  const incoming: Edge[][] = Array.from({ length: nodes.length }, () => []);
  for (const edge of edges) incoming[edge.to]!.push(edge);
  const viable = new Uint8Array(nodes.length);
  const queue = new Int32Array(nodes.length);
  let head = 0;
  let tail = 0;
  for (const node of nodes) {
    if (!node.winning) continue;
    viable[node.index] = 1;
    queue[tail++] = node.index;
  }
  while (head < tail) {
    const current = queue[head++]!;
    for (const edge of incoming[current]!) {
      if (viable[edge.from]) continue;
      viable[edge.from] = 1;
      queue[tail++] = edge.from;
    }
  }
  const stateKeys = new Set(nodes.filter((node) => viable[node.index]).map((node) => node.key));
  const edgeSignatures = new Set(edges
    .filter((edge) => viable[edge.from] && viable[edge.to])
    .map((edge) => `${nodes[edge.from]!.key}\n${edge.action}\n${JSON.stringify(edge.events)}\n${nodes[edge.to]!.key}`));
  return { stateKeys, edgeSignatures };
}

function winAvoiding(audit: Audit, pattern: string): boolean {
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
      if (edge.events.some((event) => eventMatchesPattern(event, pattern))) continue;
      if (seen[edge.to]) continue;
      seen[edge.to] = 1;
      queue[tail++] = edge.to;
    }
  }
  return false;
}

function minimumEventCount(audit: Audit, pattern: string): number {
  const adjacency: Edge[][] = Array.from({ length: audit.raw_graph.nodes.length }, () => []);
  for (const edge of audit.raw_graph.edges) adjacency[edge.from]!.push(edge);
  const distance = new Int32Array(audit.raw_graph.nodes.length);
  distance.fill(0x3fffffff);
  distance[0] = 0;
  const pending: Array<{ node: number; cost: number }> = [{ node: 0, cost: 0 }];
  while (pending.length > 0) {
    pending.sort((left, right) => left.cost - right.cost);
    const current = pending.shift()!;
    if (current.cost !== distance[current.node]) continue;
    if (audit.raw_graph.nodes[current.node]!.winning) return current.cost;
    for (const edge of adjacency[current.node]!) {
      const weight = edge.events.filter((event) => eventMatchesPattern(event, pattern)).length;
      const next = current.cost + weight;
      if (next >= distance[edge.to]) continue;
      distance[edge.to] = next;
      pending.push({ node: edge.to, cost: next });
    }
  }
  return Number.POSITIVE_INFINITY;
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
