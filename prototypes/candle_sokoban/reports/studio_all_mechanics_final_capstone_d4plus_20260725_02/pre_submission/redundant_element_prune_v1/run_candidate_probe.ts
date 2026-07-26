import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { discoverCandleRedundancyCandidates } from "../../../../../../src/prototypes/candle_sokoban/redundancyCandidates.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";

const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02",
);
const baselinePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(taskRoot, "candidate/versions/v001/layout.txt");
const reportName = process.argv[3] ?? "canonical_probe.json";
const probeNamespace = process.argv[4];
const replayArtifact = JSON.parse(await readFile(
  path.join(taskRoot, "candidate/evidence_supplements/v001/structured_replay/canonical_replay.json"),
  "utf8",
)) as { inputs: string[] };
const inputs = replayArtifact.inputs;

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baseline = normalizeLayout(await readFile(baselinePath, "utf8"));
const discovery = discoverCandleRedundancyCandidates(
  baseline,
  "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v001",
);
const baselineReplay = replay(baseline, "baseline");
const probes = [];
const outputDir = path.join(
  taskRoot,
  "pre_submission/redundant_element_prune_v1/probes",
  ...(probeNamespace ? [probeNamespace] : []),
);

await mkdir(outputDir, { recursive: true });
for (const candidate of discovery.candidates) {
  for (const operation of candidate.operations) {
    const probeId = `${safeId(candidate.id)}__${operation}`;
    const layout = mutate(baseline, candidate.cells, operation, candidate.id);
    await writeFile(path.join(outputDir, `${probeId}.txt`), `${layout}\n`, "utf8");
    try {
      const execution = replay(layout, probeId);
      probes.push({
        probe_id: probeId,
        candidate_id: candidate.id,
        kind: candidate.kind,
        operation,
        cells: candidate.cells,
        layout_sha256: digest(layout),
        parse: "pass",
        canonical: summarizeReplay(execution),
        event_delta: eventDelta(baselineReplay, execution),
      });
    } catch (error) {
      probes.push({
        probe_id: probeId,
        candidate_id: candidate.id,
        kind: candidate.kind,
        operation,
        cells: candidate.cells,
        layout_sha256: digest(layout),
        parse: "fail",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

const report = {
  schema_version: 1,
  method: "candle_redundancy_canonical_probe_v1",
  baseline: {
    layout_ref: path.relative(taskRoot, baselinePath).replaceAll("\\", "/"),
    layout_sha256: digest(baseline),
    canonical: summarizeReplay(baselineReplay),
  },
  discovery_summary: discovery.counts,
  probes,
};
await writeFile(
  path.join(taskRoot, "pre_submission/redundant_element_prune_v1", reportName),
  `${JSON.stringify(report, null, 2)}\n`,
  "utf8",
);
process.stdout.write(`${probes.map((probe: any) =>
  `${probe.probe_id}: ${probe.parse === "pass"
    ? `${probe.canonical.legal_through}/${inputs.length} win=${probe.canonical.win} event_delta=${probe.event_delta.baseline_only.length}/${probe.event_delta.probe_only.length}`
    : `parse_fail=${probe.error}`}`
).join("\n")}\n`);

function replay(layout: string, id: string) {
  const level: LevelDoc = {
    id: `CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v001_probe_${id}`,
    title: id,
    global_burn_cycle: 5,
    layout,
  };
  const initial = adapter.parseLevel(level);
  const winCondition = level.win ?? pkg.mechanic.win;
  return replayInputSequence(adapter, runtime, initial, inputs, { winCondition }, winCondition);
}

function summarizeReplay(execution: ReturnType<typeof replay>) {
  return {
    initial_win: execution.initial.isWin,
    legal_through: execution.legalThroughStep,
    requested_steps: inputs.length,
    stopped_at_step: execution.stoppedAtStep ?? null,
    stopped_reason: execution.stoppedReason ?? null,
    win: execution.final.isWin,
    first_win_step: execution.steps.find((step) => step.after.isWin)?.step ?? null,
    final_key: execution.final.key,
    state_timeline: [execution.initial.key, ...execution.steps.map((step) => step.after.key)],
    events_by_step: execution.steps.map((step) => step.events),
  };
}

function eventDelta(baselineExecution: ReturnType<typeof replay>, probeExecution: ReturnType<typeof replay>) {
  const baselineEvents = baselineExecution.steps.flatMap((step) => step.events);
  const probeEvents = probeExecution.steps.flatMap((step) => step.events);
  return {
    baseline_only: multisetDifference(baselineEvents, probeEvents),
    probe_only: multisetDifference(probeEvents, baselineEvents),
  };
}

function multisetDifference(left: string[], right: string[]): string[] {
  const counts = new Map<string, number>();
  for (const value of right) counts.set(value, (counts.get(value) ?? 0) + 1);
  const difference: string[] = [];
  for (const value of left) {
    const remaining = counts.get(value) ?? 0;
    if (remaining > 0) counts.set(value, remaining - 1);
    else difference.push(value);
  }
  return difference;
}

function mutate(
  source: string,
  cells: Array<{ x: number; y: number }>,
  operation: "remove" | "wallify" | "trim",
  candidateId: string,
): string {
  const rows = source.split("\n").map((row) => [...row]);
  if (operation === "remove" || operation === "wallify") {
    const replacement = operation === "remove" ? "." : "#";
    for (const { x, y } of cells) rows[y]![x] = replacement;
    return rows.map((row) => row.join("")).join("\n");
  }
  const side = candidateId.split(":")[1];
  const xs = [...new Set(cells.map((cell) => cell.x))].sort((a, b) => a - b);
  const ys = [...new Set(cells.map((cell) => cell.y))].sort((a, b) => a - b);
  if (side === "left") return rows.map((row) => row.slice(xs.length).join("")).join("\n");
  if (side === "right") return rows.map((row) => row.slice(0, row.length - xs.length).join("")).join("\n");
  if (side === "top") return rows.slice(ys.length).map((row) => row.join("")).join("\n");
  if (side === "bottom") return rows.slice(0, rows.length - ys.length).map((row) => row.join("")).join("\n");
  throw new Error(`未知 outline side: ${side}`);
}

function normalizeLayout(value: string): string {
  return value.replace(/\r/g, "").trim();
}

function safeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]+/g, "_");
}

function digest(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
