import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

type Cell = { x: number; y: number };
type Candidate = {
  id: string;
  kind: string;
  cells: Cell[];
  operations: Array<"remove" | "wallify" | "trim">;
};

const taskRoot = path.resolve("prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726");
const exactRoot = path.join(taskRoot, "candidate/versions/CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_006");
const outputRoot = path.join(taskRoot, "pre_submission/exact_006");
const candidateReport = JSON.parse(await readFile(path.join(outputRoot, "redundancy_candidates.json"), "utf8")) as {
  candidates: Candidate[];
};
const baselineLayout = normalizeLayout(await readFile(path.join(exactRoot, "layout.txt"), "utf8"));
const canonical = JSON.parse(await readFile(path.join(exactRoot, "canonical_replay.json"), "utf8")) as {
  inputs: string[];
};

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;

function makeLevel(id: string, layout: string): LevelDoc {
  return { id, title: id, layout, win: winCondition };
}

function replay(layout: string, id: string, shiftY: number) {
  let state = adapter.parseLevel(makeLevel(id, layout));
  const initialKey = normalizeCoordinates(runtime.key(state), shiftY);
  const steps: Array<{ input: string; legal: boolean; events: string[]; key: string; win: boolean; reason?: string }> = [];
  for (const input of canonical.inputs) {
    const result = runtime.step(state, input, { winCondition });
    if (!result.legal) {
      steps.push({ input, legal: false, events: [], key: normalizeCoordinates(runtime.key(state), shiftY), win: false, reason: result.reason });
      return { initialKey, steps, completed: false, finalWin: false };
    }
    state = result.state;
    steps.push({
      input,
      legal: true,
      events: result.events.map((event) => normalizeCoordinates(event, shiftY)),
      key: normalizeCoordinates(runtime.key(state), shiftY),
      win: runtime.isWin(state, winCondition),
    });
  }
  return { initialKey, steps, completed: true, finalWin: runtime.isWin(state, winCondition) };
}

function applyCandidate(layout: string, candidate: Candidate): { layout: string; shiftY: number } {
  const lines = layout.split("\n").map((line) => [...line]);
  const operation = candidate.operations[0]!;
  if (operation === "remove" || operation === "wallify") {
    const glyph = operation === "remove" ? "." : "#";
    for (const cell of candidate.cells) lines[cell.y]![cell.x] = glyph;
    return { layout: lines.map((line) => line.join("")).join("\n"), shiftY: 0 };
  }
  if (candidate.id.startsWith("outer_outline_band:top:")) {
    const depth = new Set(candidate.cells.map((cell) => cell.y)).size;
    return { layout: lines.slice(depth).map((line) => line.join("")).join("\n"), shiftY: depth };
  }
  if (candidate.id.startsWith("outer_outline_band:bottom:")) {
    const depth = new Set(candidate.cells.map((cell) => cell.y)).size;
    return { layout: lines.slice(0, -depth).map((line) => line.join("")).join("\n"), shiftY: 0 };
  }
  throw new Error(`本轮未预期的 trim 方向：${candidate.id}`);
}

function normalizeCoordinates(value: string, shiftY: number): string {
  if (shiftY === 0) return value;
  return value.replace(/(\d+),(\d+)/g, (_match, x, y) => `${x},${Number(y) + shiftY}`);
}

function compareReplay(baseline: ReturnType<typeof replay>, variant: ReturnType<typeof replay>) {
  if (!variant.completed) return { pass: false, reason: "canonical_input_illegal", firstDifference: variant.steps.length };
  if (!variant.finalWin) return { pass: false, reason: "canonical_no_longer_wins", firstDifference: canonical.inputs.length };
  if (variant.steps.length !== baseline.steps.length) return { pass: false, reason: "canonical_length_changed", firstDifference: null };
  for (let index = 0; index < baseline.steps.length; index += 1) {
    const left = baseline.steps[index]!;
    const right = variant.steps[index]!;
    if (left.key !== right.key || JSON.stringify(left.events) !== JSON.stringify(right.events) || left.win !== right.win) {
      return { pass: false, reason: "canonical_state_or_event_timeline_changed", firstDifference: index + 1 };
    }
  }
  return { pass: true, reason: "canonical_state_event_and_win_timeline_preserved", firstDifference: null };
}

function graphSignature(layout: string, id: string, shiftY: number) {
  const initial = adapter.parseLevel(makeLevel(id, layout));
  const graph = enumerateRuntimeGraph(runtime, initial, winCondition, { winCondition }, { maxStates: 700_000, terminalizeWins: true });
  if (graph.status !== "complete") throw new Error(`${id} graph ${graph.status}: ${graph.reason}`);
  const nodes = graph.keys.map((key) => normalizeCoordinates(key, shiftY)).sort();
  const wins = [...graph.winStateIndexes].map((index) => normalizeCoordinates(graph.keys[index]!, shiftY)).sort();
  const edges = graph.edges.map((edge) => JSON.stringify({
    from: normalizeCoordinates(graph.keys[edge.from]!, shiftY),
    action: edge.action,
    events: edge.events.map((event) => normalizeCoordinates(event, shiftY)),
    to: normalizeCoordinates(graph.keys[edge.to]!, shiftY),
  })).sort();
  return { graph, nodes, wins, edges };
}

function arraysEqual(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function safeId(id: string): string {
  return id.replace(/[^A-Za-z0-9_-]+/g, "_");
}

function normalizeLayout(value: string): string {
  return value.replace(/\r/g, "").trimEnd();
}

await mkdir(path.join(outputRoot, "redundancy_checks"), { recursive: true });
const baselineReplay = replay(baselineLayout, "REDUNDANCY_BASELINE", 0);
const results: Array<Record<string, unknown>> = [];
let acceptedTrim: { candidate: Candidate; layout: string; shiftY: number; dir: string } | null = null;

for (const candidate of candidateReport.candidates) {
  const transformed = applyCandidate(baselineLayout, candidate);
  const dir = path.join(outputRoot, "redundancy_checks", safeId(candidate.id));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "layout.txt"), `${transformed.layout}\n`, "utf8");
  let cheap;
  try {
    const variantReplay = replay(transformed.layout, `REDUNDANCY_${safeId(candidate.id)}`, transformed.shiftY);
    cheap = compareReplay(baselineReplay, variantReplay);
  } catch (error) {
    cheap = { pass: false, reason: `parse_or_runtime_error:${error instanceof Error ? error.message : String(error)}`, firstDifference: null };
  }
  const result: Record<string, unknown> = {
    candidate_unit: candidate.id,
    kind: candidate.kind,
    operation: candidate.operations[0],
    cells: candidate.cells,
    cheap_check: cheap.pass ? "pass" : "fail",
    cheap_reason: cheap.reason,
    first_difference_step: cheap.firstDifference,
    layout_ref: path.relative(path.resolve(), path.join(dir, "layout.txt")).replace(/\\/g, "/"),
    complete_graph: "not_run",
    result: cheap.pass ? "pending_full_proof" : "retained_counterfactual_failed",
  };
  if (cheap.pass && candidate.kind === "outer_outline_band") {
    acceptedTrim = { candidate, layout: transformed.layout, shiftY: transformed.shiftY, dir };
  } else if (cheap.pass) {
    result.result = "retained_unproven";
  }
  results.push(result);
}

let graphIsomorphism: Record<string, unknown> | null = null;
if (acceptedTrim) {
  const baseline = graphSignature(baselineLayout, "REDUNDANCY_GRAPH_BASELINE", 0);
  const trimmed = graphSignature(acceptedTrim.layout, "REDUNDANCY_GRAPH_TRIMMED", acceptedTrim.shiftY);
  const nodesEqual = arraysEqual(baseline.nodes, trimmed.nodes);
  const winsEqual = arraysEqual(baseline.wins, trimmed.wins);
  const edgesEqual = arraysEqual(baseline.edges, trimmed.edges);
  graphIsomorphism = {
    candidate_unit: acceptedTrim.candidate.id,
    baseline: {
      status: baseline.graph.status,
      states: baseline.graph.keys.length,
      edges: baseline.graph.edges.length,
      wins: baseline.graph.winStateIndexes.size,
    },
    trimmed: {
      status: trimmed.graph.status,
      states: trimmed.graph.keys.length,
      edges: trimmed.graph.edges.length,
      wins: trimmed.graph.winStateIndexes.size,
      coordinate_projection: `trimmed y + ${acceptedTrim.shiftY} = reviewed y`,
    },
    nodes_equal_after_projection: nodesEqual,
    wins_equal_after_projection: winsEqual,
    action_event_edges_equal_after_projection: edgesEqual,
    preservation_proved: nodesEqual && winsEqual && edgesEqual,
  };
  await writeFile(path.join(acceptedTrim.dir, "graph_isomorphism.json"), `${JSON.stringify(graphIsomorphism, null, 2)}\n`, "utf8");
  const row = results.find((item) => item.candidate_unit === acceptedTrim!.candidate.id)!;
  row.complete_graph = "complete";
  row.solution_family_preserved = nodesEqual && winsEqual && edgesEqual;
  row.result = nodesEqual && winsEqual && edgesEqual ? "applied_pending_exposure" : "retained_counterfactual_failed";
}

const summary = {
  schema_version: 1,
  reviewed_exact: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_006",
  candidate_method: candidateReport.candidates.length > 0 ? "candle_redundancy_units_v2" : null,
  canonical_inputs: canonical.inputs,
  candidates_checked: results,
  graph_isomorphism: graphIsomorphism,
};
await writeFile(path.join(outputRoot, "redundancy_audit.json"), `${JSON.stringify(summary, null, 2)}\n`, "utf8");
console.log(JSON.stringify(summary, null, 2));
