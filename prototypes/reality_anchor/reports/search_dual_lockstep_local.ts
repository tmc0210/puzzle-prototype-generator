import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Rng = () => number;
type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };
type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  missingGroups?: string[];
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 740705);
const iterations = Number(process.argv[3] ?? 800);
const maxStates = Number(process.argv[4] ?? 80000);
const graphMaxStates = Number(process.argv[5] ?? 120000);
const maxDepth = Number(process.argv[6] ?? 80);
const rng = mulberry32(seed);

const groups: Group[] = [
  { name: "push_pull_anchor_shift", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "box_sticky_anchor_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull_event", patterns: ["pull_object"] },
  { name: "material_normalization", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid_move", patterns: ["move_sticky_rigid"] },
];

const base = [
  "###########",
  "###.PL.####",
  "##@BSGG####",
  "###..M...G#",
  "###.M..M.##",
  "###########",
];

const mutable = [
  [3, 1], [6, 1],
  [4, 2], [5, 2], [6, 2],
  [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3],
  [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
] as const;
const lockedGlyphs = new Set(["@", "P", "L", "B", "S"]);
const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const seen = new Set<string>();
const hits: Array<{
  score: number;
  id: string;
  layout: string;
  cost: number;
  events: string[];
  inputs: InputId[];
  graphStates: number;
  winStates: number;
  probeStates: number;
}> = [];

for (let index = 0; index < iterations; index += 1) {
  const rows = base.map((row) => row.split(""));
  const edits = 1 + Math.floor(rng() * 4);
  for (let edit = 0; edit < edits; edit += 1) {
    const [x, y] = mutable[Math.floor(rng() * mutable.length)]!;
    if (lockedGlyphs.has(rows[y]![x]!)) {
      continue;
    }
    rows[y]![x] = weightedGlyph(rng);
  }
  const layout = rows.map((row) => row.join("")).join("\n");
  if (seen.has(layout) || !layout.includes("G")) {
    continue;
  }
  seen.add(layout);
  const level = toLevel(`RA_LOCAL_${index}`, layout);
  let initial: RuntimeState;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  if (!solution.found || solution.cost === undefined || solution.cost < 16) {
    continue;
  }
  if (!groups.every((group) => group.patterns.some((pattern) => solution.events.some((event) => eventMatchesPattern(event, pattern))))) {
    continue;
  }
  const probe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
  if (probe.found || probe.status !== "complete") {
    continue;
  }
  const analysis = analyzeLevel(pkg, level, {
    maxStates,
    graphMaxStates,
    counterfactualMaxStates: 5000,
  });
  if (analysis.graph.status !== "complete") {
    continue;
  }
  const score =
    solution.cost * 10 +
    Math.min(analysis.graph.reachableStateCount, 6000) / 30 -
    analysis.graph.winStateCount * 2 -
    (solution.events.filter((event) => event === "push_object:box_sticky_anchor").length * 4);
  hits.push({
    score,
    id: level.id,
    layout: adapter.renderState(initial as never),
    cost: solution.cost,
    events: solution.events,
    inputs: solution.inputs,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    probeStates: probe.exploredStates,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(12);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", "search_dual_lockstep_local.md");
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): ProbeResult {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{ state: RuntimeState; mask: number; depth: number }> = [
    { state: initial, mask: 0, depth: 0 },
  ];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return { found: false, status: "exhausted", exploredStates: visited.size };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        missingGroups: requiredGroups
          .filter((_, index) => (current.mask & (1 << index)) === 0)
          .map((group) => group.name),
      };
    }
    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) {
        continue;
      }
      const mask = collectMask(current.mask, result.events, requiredGroups);
      const key = `${runtime.key(result.state)}|${mask}`;
      if (visited.has(key)) {
        continue;
      }
      visited.add(key);
      queue.push({ state: result.state, mask, depth: current.depth + 1 });
    }
  }
  return { found: false, status: depthHit ? "exhausted" : "complete", exploredStates: visited.size };
}

function collectMask(current: number, events: string[], requiredGroups: Group[]): number {
  let mask = current;
  for (const [index, group] of requiredGroups.entries()) {
    if (group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) {
      mask |= 1 << index;
    }
  }
  return mask;
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

function weightedGlyph(rng: Rng): string {
  const roll = rng();
  if (roll < 0.52) return ".";
  if (roll < 0.68) return "#";
  if (roll < 0.82) return "G";
  if (roll < 0.92) return "M";
  return "C";
}

function formatReport(): string {
  const lines = [
    "# Dual Lockstep Local Search",
    "",
    `- seed: ${seed}`,
    `- iterations: ${iterations}`,
    `- maxStates: ${maxStates}`,
    `- graphMaxStates: ${graphMaxStates}`,
    `- hits: ${hits.length}`,
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`);
    lines.push("");
    lines.push(`- score=${hit.score.toFixed(1)} cost=${hit.cost} graphStates=${hit.graphStates} winStates=${hit.winStates} probeStates=${hit.probeStates}`);
    lines.push(`- inputs=${hit.inputs.join(" ")}`);
    lines.push(`- events=${hit.events.join(" ")}`);
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function mulberry32(value: number): Rng {
  let state = value >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}
