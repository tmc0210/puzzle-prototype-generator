import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
  type CandleExposureAuditReport,
} from "../../../../../../src/prototypes/candle_sokoban/exposureAudit.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";

type GraphNode = CandleExposureAuditReport["raw_graph"]["nodes"][number];
type GraphEdge = CandleExposureAuditReport["raw_graph"]["edges"][number];

const [baselineArg, probeArg, operationArg, candidateArg, outputArg] = process.argv.slice(2);
if (!baselineArg || !probeArg || !operationArg || !candidateArg || !outputArg) {
  throw new Error(
    "用法：run_full_preservation_probe.ts <baseline-layout> <probe-layout> <remove|wallify|trim> <candidate-id> <output-dir>",
  );
}
if (operationArg !== "remove" && operationArg !== "wallify" && operationArg !== "trim") {
  throw new Error(`未知 operation: ${operationArg}`);
}

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725",
);
const baselinePath = path.resolve(baselineArg);
const probePath = path.resolve(probeArg);
const outputDir = path.resolve(outputArg);
const baselineLayout = normalizeLayout(await readFile(baselinePath, "utf8"));
const probeLayout = normalizeLayout(await readFile(probePath, "utf8"));
const canonicalArtifact = JSON.parse(await readFile(
  path.join(taskRoot, "candidate/versions/v3/canonical_replay.json"),
  "utf8",
)) as { inputs: string[] };

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const sequencePath = path.resolve("prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml");
const { sequence, raw: sequenceRaw } = loadCandleExposureSequence(sequencePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baselineLevel = level("baseline", baselineLayout);
const probeLevel = level("probe", probeLayout);
const baselineReplay = replay(baselineLevel);
const probeReplay = replay(probeLevel);
const projectKey = makeStateKeyProjector(candidateArg, operationArg);

await mkdir(outputDir, { recursive: true });
const baselineAudit = auditCandleExposure(pkg, baselineLevel, sequence, sequenceRaw, {
  allowedExposureThrough: "shared_fire_and_reignition",
  exactVersion: "pre_submission_baseline",
  maxStates: 300_000,
  maxTransitions: 2_000_000,
});
const probeAudit = auditCandleExposure(pkg, probeLevel, sequence, sequenceRaw, {
  allowedExposureThrough: "shared_fire_and_reignition",
  exactVersion: "pre_submission_probe",
  maxStates: 300_000,
  maxTransitions: 2_000_000,
});

await writeJson(path.join(outputDir, "baseline_exposure_audit.json"), baselineAudit);
await writeJson(path.join(outputDir, "probe_exposure_audit.json"), probeAudit);

const baselineViable = viableProjection(baselineAudit, projectKey);
const probeViable = viableProjection(probeAudit, projectKey);
const baselineAll = graphProjection(baselineAudit, projectKey);
const probeAll = graphProjection(probeAudit, projectKey);
const baselineEventCounts = exactEventCounts(baselineAudit.raw_graph.edges);
const probeEventCounts = exactEventCounts(probeAudit.raw_graph.edges);
const newEventPayloads = [...probeEventCounts.keys()]
  .filter((event) => !baselineEventCounts.has(event))
  .sort();
const increasedEventPayloads = [...probeEventCounts.entries()]
  .filter(([event, count]) => count > (baselineEventCounts.get(event) ?? 0))
  .map(([event, count]) => ({
    event,
    baseline: baselineEventCounts.get(event) ?? 0,
    probe: count,
  }));
const newContactEvents = increasedEventPayloads.filter(({ event }) =>
  /ignite|extinguish|light_brazier|shrink|burn_out/.test(event)
);

const canonicalStateTimelineEqual = arrayEquals(
  stateTimeline(baselineReplay).map(projectKey),
  stateTimeline(probeReplay).map(projectKey),
);
const canonicalEventsEqual = arrayEquals(
  baselineReplay.steps.map((step) => step.events),
  probeReplay.steps.map((step) => step.events),
);
const canonicalFirstWinEqual = firstWinStep(baselineReplay) === firstWinStep(probeReplay);
const winFamilyStatesEqual = setEquals(baselineViable.stateKeys, probeViable.stateKeys);
const winFamilyEdgesEqual = setEquals(baselineViable.edgeSignatures, probeViable.edgeSignatures);
const baselineContainedInProbe = isSubset(baselineAll.stateKeys, probeAll.stateKeys)
  && isSubset(baselineAll.edgeSignatures, probeAll.edgeSignatures);
const probeContainedInBaseline = isSubset(probeAll.stateKeys, baselineAll.stateKeys)
  && isSubset(probeAll.edgeSignatures, baselineAll.edgeSignatures);
const operationSpecificFullGraphPass = operationArg === "remove"
  ? baselineContainedInProbe && newEventPayloads.length === 0
  : probeContainedInBaseline && increasedEventPayloads.length === 0;

const preservationPass =
  baselineReplay.legalThroughStep === canonicalArtifact.inputs.length
  && probeReplay.legalThroughStep === canonicalArtifact.inputs.length
  && baselineReplay.final.isWin
  && probeReplay.final.isWin
  && canonicalStateTimelineEqual
  && canonicalEventsEqual
  && canonicalFirstWinEqual
  && baselineAudit.graph.status === "complete"
  && probeAudit.graph.status === "complete"
  && baselineAudit.verdict === "pass"
  && probeAudit.verdict === "pass"
  && baselineAudit.forbidden_hits.length === 0
  && probeAudit.forbidden_hits.length === 0
  && shortestWinDepth(baselineAudit) === shortestWinDepth(probeAudit)
  && winFamilyStatesEqual
  && winFamilyEdgesEqual
  && operationSpecificFullGraphPass
  && (operationArg !== "wallify" || newContactEvents.length === 0);

const summary = {
  schema_version: 1,
  method: "candle_redundancy_review_preservation_v2",
  candidate_id: "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001",
  reviewed_exact_version: "v2",
  baseline_delivery_version: "v3",
  candidate_unit: candidateArg,
  operation: operationArg,
  artifact_identity: {
    baseline_ref: relative(baselinePath),
    baseline_layout_sha256: digest(`${baselineLayout}\n`),
    probe_ref: relative(probePath),
    probe_layout_sha256: digest(`${probeLayout}\n`),
  },
  canonical: {
    requested_steps: canonicalArtifact.inputs.length,
    baseline_legal_through: baselineReplay.legalThroughStep,
    probe_legal_through: probeReplay.legalThroughStep,
    baseline_win: baselineReplay.final.isWin,
    probe_win: probeReplay.final.isWin,
    projected_state_timeline_equal: canonicalStateTimelineEqual,
    events_by_step_equal: canonicalEventsEqual,
    first_win_step_baseline: firstWinStep(baselineReplay),
    first_win_step_probe: firstWinStep(probeReplay),
  },
  complete_graph: {
    baseline: baselineAudit.graph,
    probe: probeAudit.graph,
    shortest_win_depth_baseline: shortestWinDepth(baselineAudit),
    shortest_win_depth_probe: shortestWinDepth(probeAudit),
    projected_baseline_contained_in_probe: baselineContainedInProbe,
    projected_probe_contained_in_baseline: probeContainedInBaseline,
    projected_probe_only_state_count: differenceCount(probeAll.stateKeys, baselineAll.stateKeys),
    projected_probe_only_edge_count: differenceCount(probeAll.edgeSignatures, baselineAll.edgeSignatures),
    projected_baseline_only_state_count: differenceCount(baselineAll.stateKeys, probeAll.stateKeys),
    projected_baseline_only_edge_count: differenceCount(baselineAll.edgeSignatures, probeAll.edgeSignatures),
  },
  winning_family_projection: {
    baseline_win_reachable_states: baselineViable.stateKeys.size,
    probe_win_reachable_states: probeViable.stateKeys.size,
    state_key_sets_equal: winFamilyStatesEqual,
    baseline_win_reachable_edges: baselineViable.edgeSignatures.size,
    probe_win_reachable_edges: probeViable.edgeSignatures.size,
    edge_sets_equal: winFamilyEdgesEqual,
    solution_family_preserved: winFamilyStatesEqual && winFamilyEdgesEqual,
  },
  event_audit: {
    new_event_payloads: newEventPayloads,
    increased_event_payloads: increasedEventPayloads,
    new_contact_events: newContactEvents,
  },
  exposure: {
    baseline: {
      status: baselineAudit.graph.status,
      verdict: baselineAudit.verdict,
      forbidden_hits: baselineAudit.forbidden_hits.length,
    },
    probe: {
      status: probeAudit.graph.status,
      verdict: probeAudit.verdict,
      forbidden_hits: probeAudit.forbidden_hits.length,
    },
  },
  preservation_verdict: preservationPass ? "pass" : "fail",
};

await writeJson(path.join(outputDir, "preservation_audit.json"), summary);
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);

function level(suffix: string, layout: string): LevelDoc {
  return {
    id: `CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_${suffix}`,
    title: suffix,
    global_burn_cycle: 5,
    layout,
  };
}

function replay(levelDoc: LevelDoc) {
  const initial = adapter.parseLevel(levelDoc);
  const winCondition = levelDoc.win ?? pkg.mechanic.win;
  return replayInputSequence(
    adapter,
    runtime,
    initial,
    canonicalArtifact.inputs,
    { winCondition },
    winCondition,
  );
}

function stateTimeline(execution: ReturnType<typeof replay>): string[] {
  return [execution.initial.key, ...execution.steps.map((step) => step.after.key)];
}

function firstWinStep(execution: ReturnType<typeof replay>): number | null {
  return execution.steps.find((step) => step.after.isWin)?.step ?? null;
}

function makeStateKeyProjector(candidateId: string, operation: string): (key: string) => string {
  if (operation !== "remove" || !candidateId.startsWith("single_brazier:")) {
    return (key) => key;
  }
  const coordinate = candidateId.slice("single_brazier:".length);
  return (key) => {
    const marker = "|B:";
    const markerIndex = key.lastIndexOf(marker);
    if (markerIndex < 0) throw new Error(`state key 缺少 B 段：${key}`);
    const prefix = key.slice(0, markerIndex + marker.length);
    const tokens = key.slice(markerIndex + marker.length)
      .split(";")
      .filter((token) => token && !token.startsWith(`${coordinate}:`));
    return `${prefix}${tokens.join(";")}`;
  };
}

function viableProjection(
  audit: CandleExposureAuditReport,
  projector: (key: string) => string,
) {
  const nodes = audit.raw_graph.nodes;
  const edges = audit.raw_graph.edges;
  const incoming: GraphEdge[][] = Array.from({ length: nodes.length }, () => []);
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
  return projectedSets(nodes, edges, projector, viable);
}

function graphProjection(
  audit: CandleExposureAuditReport,
  projector: (key: string) => string,
) {
  return projectedSets(audit.raw_graph.nodes, audit.raw_graph.edges, projector);
}

function projectedSets(
  nodes: GraphNode[],
  edges: GraphEdge[],
  projector: (key: string) => string,
  included?: Uint8Array,
) {
  const stateKeys = new Set(
    nodes
      .filter((node) => !included || included[node.index])
      .map((node) => projector(node.key)),
  );
  const edgeSignatures = new Set(
    edges
      .filter((edge) => !included || (included[edge.from] && included[edge.to]))
      .map((edge) => [
        projector(nodes[edge.from]!.key),
        edge.action,
        JSON.stringify(edge.events),
        projector(nodes[edge.to]!.key),
      ].join("\n")),
  );
  return { stateKeys, edgeSignatures };
}

function shortestWinDepth(audit: CandleExposureAuditReport): number | null {
  const depths = audit.raw_graph.nodes.filter((node) => node.winning).map((node) => node.depth);
  return depths.length > 0 ? Math.min(...depths) : null;
}

function exactEventCounts(edges: GraphEdge[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const event of edges.flatMap((edge) => edge.events)) {
    counts.set(event, (counts.get(event) ?? 0) + 1);
  }
  return counts;
}

function isSubset<T>(left: Set<T>, right: Set<T>): boolean {
  for (const value of left) if (!right.has(value)) return false;
  return true;
}

function setEquals<T>(left: Set<T>, right: Set<T>): boolean {
  return left.size === right.size && isSubset(left, right);
}

function differenceCount<T>(left: Set<T>, right: Set<T>): number {
  let count = 0;
  for (const value of left) if (!right.has(value)) count += 1;
  return count;
}

function arrayEquals(left: unknown[], right: unknown[]): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function normalizeLayout(value: string): string {
  return value.replace(/\r/g, "").trim();
}

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function relative(filePath: string): string {
  return path.relative(process.cwd(), filePath).replaceAll("\\", "/");
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
