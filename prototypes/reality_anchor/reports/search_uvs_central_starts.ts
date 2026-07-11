import { readFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("Usage: search_uvs_central_starts.ts <layout-file>");
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const source = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd().split("\n");
const required = [
  "sticky_to_box",
  "box_to_sticky",
  "anchor_boundary_shift:box_sticky",
  "pull_object:crate",
  "pull_object:sticky",
  "force_chain",
  "move_sticky_rigid",
];

const originalStart = findGlyph(source, "@");
if (!originalStart) throw new Error("No @ in source layout");
const candidates: Array<{ x: number; y: number; glyph: string }> = [];
for (let y = 0; y < source.length; y += 1) {
  for (let x = 0; x < source[y]!.length; x += 1) {
    const glyph = source[y]![x]!;
    if (glyph === "." || glyph === "G" || glyph === "@") candidates.push({ x, y, glyph });
  }
}

for (const candidate of candidates) {
  const rows = source.map((row) => row.split(""));
  rows[originalStart.y]![originalStart.x] = ".";
  rows[candidate.y]![candidate.x] = candidate.glyph === "G" ? "+" : "@";
  const layout = rows.map((row) => row.join("")).join("\n");
  const level: LevelDoc = {
    id: `RA_UVS_START_${candidate.x}_${candidate.y}`,
    title: "RA_UVS_START",
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
  let initial;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 500_000,
    maxDepth: 120,
  });
  if (!solution.found || solution.cost === undefined || solution.cost >= 70) continue;
  if (!required.every((pattern) => solution.events.some((event) => eventMatchesPattern(event, pattern)))) continue;
  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 200_000,
  });
  if (graph.status !== "complete" || graph.winStateCount !== 1) continue;
  console.log(`HIT start=${candidate.x},${candidate.y} cost=${solution.cost} states=${graph.reachableStateCount} wins=${graph.winStateCount}`);
  console.log(layout);
  console.log(`inputs=${solution.inputs.join(" ")}`);
  console.log(`events=${solution.events.join(" ")}`);
}

function findGlyph(lines: string[], glyph: string): { x: number; y: number } | undefined {
  for (let y = 0; y < lines.length; y += 1) {
    const x = lines[y]!.indexOf(glyph);
    if (x >= 0) return { x, y };
  }
  return undefined;
}
