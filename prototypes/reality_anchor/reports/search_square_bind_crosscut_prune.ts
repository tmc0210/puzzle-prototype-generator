import { readFile, writeFile } from "node:fs/promises";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const inputPath = process.argv[2];
const runId = process.argv[3] ?? "RA_FRESH_2026_07_10_SQUARE_BIND_CROSSCUT_PRUNE";
const permutationCount = Number(process.argv[4] ?? 16);

if (!inputPath) {
  throw new Error("Usage: search_square_bind_crosscut_prune.ts <layout-file> <run-id> [permutations]");
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baseLayout = (await readFile(inputPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const baseRows = baseLayout.split("\n").map((row) => [...row]);
const floorCells = baseRows.flatMap((row, y) =>
  row.flatMap((glyph, x) => glyph === "." ? [{ x, y }] : []),
);

type Finding = {
  permutation: number;
  addedWalls: Array<[number, number]>;
  layout: string;
  solutionCost: number;
  solutionInputs: string[];
  solutionEvents: string[];
  graphStatus: string;
  graphStates: number;
  graphTransitions: number;
};

const findings: Finding[] = [];

for (let permutation = 0; permutation < permutationCount; permutation += 1) {
  const cells = shuffled(floorCells, 0x9e3779b9 ^ permutation);
  let rows = baseRows.map((row) => [...row]);
  const addedWalls: Array<[number, number]> = [];

  for (const cell of cells) {
    const candidateRows = rows.map((row) => [...row]);
    candidateRows[cell.y]![cell.x] = "#";
    const candidateLayout = candidateRows.map((row) => row.join("")).join("\n");
    const solved = solve(candidateLayout, `${runId}_${permutation}_${cell.x}_${cell.y}`);
    if (!solved.found || !coversCore(solved.events) || solved.cost > 26) {
      continue;
    }
    rows = candidateRows;
    addedWalls.push([cell.x, cell.y]);
  }

  const layout = rows.map((row) => row.join("")).join("\n");
  const solution = solve(layout, `${runId}_${permutation}_final`);
  if (!solution.found || !coversCore(solution.events)) {
    continue;
  }
  const initial = parse(layout, `${runId}_${permutation}_graph`);
  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 300_000,
  });
  findings.push({
    permutation,
    addedWalls,
    layout,
    solutionCost: solution.cost,
    solutionInputs: solution.inputs,
    solutionEvents: solution.events,
    graphStatus: graph.status,
    graphStates: graph.reachableStateCount,
    graphTransitions: graph.legalTransitionCount,
  });
}

findings.sort((left, right) =>
  Number(right.graphStatus === "complete") - Number(left.graphStatus === "complete") ||
  left.addedWalls.length - right.addedWalls.length ||
  right.graphStates - left.graphStates ||
  left.solutionCost - right.solutionCost,
);

const output = {
  runId,
  inputPath,
  floorCellCount: floorCells.length,
  permutationCount,
  findings,
};
const outputBase = `${prototypePath}/reports/${runId}`;
await writeFile(`${outputBase}.json`, `${JSON.stringify(output, null, 2)}\n`, "utf8");
await writeFile(`${outputBase}.md`, formatMarkdown(output), "utf8");
console.log(`Wrote ${outputBase}.md`);
console.log(`Wrote ${outputBase}.json`);
console.log(`Findings: ${findings.length}; complete: ${findings.filter((item) => item.graphStatus === "complete").length}`);

function parse(layout: string, id: string) {
  const level: LevelDoc = {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
  return adapter.parseLevel(level);
}

function solve(layout: string, id: string) {
  const initial = parse(layout, id);
  return solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 100_000,
    maxDepth: 120,
  });
}

function coversCore(events: string[]): boolean {
  return count(events, "anchor_boundary_shift:box_sticky") >= 2 &&
    count(events, "box_to_sticky") >= 2 &&
    count(events, "sticky_merge") >= 1 &&
    count(events, "anchor_boundary_shift:push_pull") >= 1 &&
    count(events, "push_object:sticky") >= 1 &&
    count(events, "move_sticky_rigid") >= 2 &&
    count(events, "sticky_to_box") >= 1 &&
    count(events, "pull_object:sticky") >= 1;
}

function count(events: string[], pattern: string): number {
  return events.filter((event) =>
    event === pattern || event.startsWith(`${pattern}:`) || event.startsWith(`${pattern}#`),
  ).length;
}

function shuffled<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let state = seed >>> 0;
  const random = (): number => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0x1_0000_0000;
  };
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target]!, result[index]!];
  }
  return result;
}

function formatMarkdown(input: typeof output): string {
  const lines = [
    `# Square Bind Crosscut Prune Search: ${input.runId}`,
    "",
    `- Input: ${input.inputPath}`,
    `- Candidate floor cells: ${input.floorCellCount}`,
    `- Permutations: ${input.permutationCount}`,
    `- Findings: ${input.findings.length}`,
    "",
  ];
  for (const finding of input.findings) {
    lines.push(`## Permutation ${finding.permutation}`);
    lines.push("");
    lines.push(`- Added walls: ${finding.addedWalls.map(([x, y]) => `[${x},${y}]`).join(" ") || "none"}`);
    lines.push(`- Solution cost: ${finding.solutionCost}`);
    lines.push(`- Inputs: ${finding.solutionInputs.join(" ")}`);
    lines.push(`- Graph: ${finding.graphStatus}; states=${finding.graphStates}; transitions=${finding.graphTransitions}`);
    lines.push("");
    lines.push("```text");
    lines.push(finding.layout);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
