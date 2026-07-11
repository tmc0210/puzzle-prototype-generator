import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const maxStates = Number(process.argv[2] ?? 100_000);
const maxDepth = Number(process.argv[3] ?? 28);
const hits: Array<Record<string, unknown>> = [];

// y3:x4 and x9 are the left/right connectors.  The remaining twelve cells in
// the two-row return band are exhaustively toggled.  This is candidate-specific
// geometry search, not a reusable generator.
const variableCells: Array<[number, number]> = [];
for (const y of [2, 3]) {
  for (let x = 4; x <= 10; x += 1) {
    if (y === 3 && (x === 4 || x === 9)) continue;
    variableCells.push([x, y]);
  }
}

for (let mask = 0; mask < (1 << variableCells.length); mask += 1) {
  const rows = Array.from({ length: 8 }, () => Array.from({ length: 12 }, () => "#"));
  writeRow(rows, 1, "#######PL###");
  writeRow(rows, 4, "####.CCmGGG#");
  writeRow(rows, 5, "######*@B.G#");
  writeRow(rows, 6, "########S.##");
  rows[3]![4] = ".";
  rows[3]![9] = ".";
  for (const [index, [x, y]] of variableCells.entries()) {
    if ((mask & (1 << index)) !== 0) rows[y]![x] = ".";
  }
  const layout = rows.map((row) => row.join("")).join("\n");
  const id = `RA_LMR_CORRIDOR_${mask}`;
  const level = toLevel(id, layout);
  let initial: RealityAnchorState;
  try {
    initial = adapter.parseLevel(level) as RealityAnchorState;
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  if (!solution.found || solution.cost === undefined || solution.cost > 18) continue;
  const counts = countEvents(solution.events);
  if ((counts["anchor_boundary_shift:box_sticky"] ?? 0) < 3) continue;
  if ((counts["pull_object:crate#3"] ?? 0) < 1) continue;
  if ((counts["pull_object:box_sticky_anchor"] ?? 0) < 1) continue;
  if ((counts["force_chain:n4"] ?? 0) < 1) continue;
  const walk = counts.walk ?? 0;
  if (walk > 12) continue;
  const rawReuse = replayReuse(initial, solution.inputs);
  if (rawReuse.revisitRate < 0.325 && rawReuse.heavyReuseRatio < 0.047) continue;

  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
  });
  if (graph.status !== "complete" || graph.winStateCount !== 1) continue;
  const analysis = analyzeLevel(pkg, level, {
    maxStates,
    maxDepth,
    graphMaxStates: maxStates,
    counterfactualMaxStates: 1000,
  });
  if (analysis.graph.status !== "complete" || analysis.graph.winStateCount !== 1) continue;
  const scc = analysis.agency.scc;
  const revisit = analysis.solution.traceMetrics?.revisitRate ?? rawReuse.revisitRate;
  const score =
    (18 - solution.cost) * 40 +
    (11 - walk) * 60 +
    revisit * 500 +
    (scc?.winContinuationBranchingSccCount === 0 ? 200 : 0) +
    (scc?.winContinuationMergingSccCount === 0 ? 100 : 0) -
    analysis.graph.reachableStateCount / 100;
  hits.push({
    score,
    mask,
    id,
    layout,
    cost: solution.cost,
    walk,
    events: solution.events,
    inputs: solution.inputs,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    revisitRate: revisit,
    heavyReuseRatio: analysis.solution.traceMetrics?.heavyReuseRatio ?? rawReuse.heavyReuseRatio,
    sccCount: scc?.sccCount,
    winReachableSccCount: scc?.winReachableSccCount,
    branchingWinSccs: scc?.winContinuationBranchingSccCount,
    mergingWinSccs: scc?.winContinuationMergingSccCount,
    forcedWinPrefix: scc?.forcedWinContinuationPrefixLength,
    irreversibleSteps: scc?.solutionIrreversibleStepCount,
  });
  hits.sort((left, right) => Number(right.score) - Number(left.score));
  hits.splice(20);
}

const report = {
  search: "candidate_specific_latch_material_revisit_corridor_exhaustive",
  variableCells,
  combinations: 1 << variableCells.length,
  maxStates,
  maxDepth,
  hitCount: hits.length,
  hits,
};
const outBase = path.join("prototypes/Reality_Anchor/reports", "search_latch_material_revisit_corridors");
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));

function writeRow(rows: string[][], y: number, row: string): void {
  rows[y] = row.split("");
}

function toLevel(id: string, layout: string): LevelDoc {
  return {
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
}

function countEvents(events: string[]): Record<string, number> {
  const patterns = [
    "walk",
    "anchor_boundary_shift:box_sticky",
    "pull_object:crate#3",
    "pull_object:box_sticky_anchor",
    "force_chain:n4",
  ];
  return Object.fromEntries(patterns.map((pattern) => [
    pattern,
    events.filter((event) => eventMatchesPattern(event, pattern)).length,
  ]));
}

function replayReuse(initial: RealityAnchorState, inputs: string[]): {
  revisitRate: number;
  heavyReuseRatio: number;
} {
  let state = initial;
  const visits = new Map<string, number>();
  const add = (value: RealityAnchorState): void => {
    const key = `${value.player.x},${value.player.y}`;
    visits.set(key, (visits.get(key) ?? 0) + 1);
  };
  add(state);
  for (const input of inputs) {
    const step = runtime.step(state, input as never, { winCondition: pkg.mechanic.win });
    if (!step.legal) break;
    state = step.state as RealityAnchorState;
    add(state);
  }
  const total = [...visits.values()].reduce((sum, value) => sum + value, 0);
  const unique = visits.size;
  const walkable = initial.width * initial.height - initial.walls.size;
  const heavy = [...visits.values()].filter((count) => count >= 3).length;
  return {
    revisitRate: total === 0 ? 0 : 1 - unique / total,
    heavyReuseRatio: walkable === 0 ? 0 : heavy / walkable,
  };
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    "# Latch–Material–Revisit Corridor Search",
    "",
    `- combinations=${input.combinations}`,
    `- hitCount=${input.hitCount}`,
    "",
  ];
  for (const [index, hit] of input.hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(`- score=${Number(hit.score).toFixed(2)} cost=${hit.cost} walk=${hit.walk} graph=${hit.graphStates} wins=${hit.winStates}`);
    lines.push(`- revisit=${hit.revisitRate} scc=${hit.sccCount}/${hit.winReachableSccCount} branch=${hit.branchingWinSccs} merge=${hit.mergingWinSccs} forced=${hit.forcedWinPrefix}/${hit.irreversibleSteps}`);
    lines.push(`- inputs=${(hit.inputs as string[]).join(" ")}`);
    lines.push(`- events=${(hit.events as string[]).join(" ")}`);
    lines.push("");
    lines.push("```text");
    lines.push(String(hit.layout));
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
