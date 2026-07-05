import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

type Rng = () => number;
type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };
type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  missingGroups?: string[];
};
type Hit = {
  score: number;
  id: string;
  layout: string;
  sourceLayout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  graphStates: number;
  winStates: number;
  firstAnchorStep: number;
  probeStates: number;
  sccShape?: string;
};

const prototypePath = "prototypes/reality_anchor";
const seed = Number(process.argv[2] ?? 760001);
const iterations = Number(process.argv[3] ?? 5000);
const maxStates = Number(process.argv[4] ?? 80000);
const graphMaxStates = Number(process.argv[5] ?? 100000);
const maxDepth = Number(process.argv[6] ?? 28);
const maxHits = Number(process.argv[7] ?? 12);
const minCost = Number(process.argv[8] ?? 6);
const maxCost = Number(process.argv[9] ?? 18);
const wallRate = Number(process.argv[10] ?? 0.18);

const coreGroups: Group[] = [
  { name: "bs_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_rigid", patterns: ["move_sticky_rigid"] },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const rng = mulberry32(seed);
const seen = new Set<string>();
const hits: Hit[] = [];

for (let index = 0; index < iterations; index += 1) {
  const sourceLayout = sampleLayout(rng);
  if (seen.has(sourceLayout)) continue;
  seen.add(sourceLayout);
  const level = toLevel(`RA_MOVABLE_BS_SEARCH_${seed}_${index}`, sourceLayout);
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
  if (!solution.found || solution.cost === undefined) continue;
  if (solution.cost < minCost || solution.cost > maxCost) continue;
  if (!coversGroups(solution.events, coreGroups)) continue;
  if (solution.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:push_pull"))) continue;
  const firstAnchorStep = firstStepWith(solution.inputs, initial, "anchor_boundary_shift:box_sticky");
  if (firstAnchorStep <= 1) continue;

  const probe = findWinMissingGroups(initial, coreGroups, { maxStates, maxDepth });
  if (probe.found || probe.status !== "complete") continue;

  let analysis;
  try {
    analysis = analyzeLevel(pkg, level, {
      maxStates,
      maxDepth,
      graphMaxStates,
      counterfactualMaxStates: 5000,
    });
  } catch {
    continue;
  }
  if (analysis.graph.status !== "complete") continue;

  const eventVariety = new Set(solution.events.map((event) => event.split(":")[0])).size;
  const score =
    300 -
    Math.abs(solution.cost - 10) * 12 +
    eventVariety * 18 +
    Math.min(firstAnchorStep, 6) * 18 +
    Math.min(analysis.graph.reachableStateCount, 2500) / 40 -
    Math.min(analysis.graph.winStateCount, 100) * 1.5 +
    (analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) * 5;

  hits.push({
    score,
    id: level.id,
    layout: adapter.renderState(initial as never),
    sourceLayout,
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
    graphStates: analysis.graph.reachableStateCount,
    winStates: analysis.graph.winStateCount,
    firstAnchorStep,
    probeStates: probe.exploredStates,
    sccShape: analysis.agency.scc?.winSubgraphShape,
  });
  hits.sort((left, right) => right.score - left.score);
  hits.splice(maxHits);
}

const report = formatReport();
const out = path.join(prototypePath, "reports", `search_movable_bs_only_${seed}.md`);
await writeFile(out, report, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function sampleLayout(rng: Rng): string {
  const width = choice(rng, [8, 9, 9, 10]);
  const height = choice(rng, [5, 5, 6]);
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".",
    ),
  );

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (rng() < wallRate) grid[y]![x] = "#";
    }
  }

  const anchorY = randInt(rng, 1, height - 2);
  const anchorX = randInt(rng, 1, width - 3);
  grid[anchorY]![anchorX] = "B";
  grid[anchorY]![anchorX + 1] = "S";

  const occupied = new Set<string>([`${anchorX},${anchorY}`, `${anchorX + 1},${anchorY}`]);
  const openCells = (): Array<[number, number]> => {
    const cells: Array<[number, number]> = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x < width - 1; x += 1) {
        if (grid[y]![x] === "." && !occupied.has(`${x},${y}`)) cells.push([x, y]);
      }
    }
    return cells;
  };
  const place = (char: string): boolean => {
    const cells = openCells();
    if (cells.length === 0) return false;
    const [x, y] = choice(rng, cells);
    grid[y]![x] = char;
    occupied.add(`${x},${y}`);
    return true;
  };

  if (!place("@")) return "";
  const objectCount = choice(rng, [2, 3, 3, 4]);
  for (let i = 0; i < objectCount; i += 1) {
    if (!place(choice(rng, ["C", "M", "M"]))) return "";
  }
  const goalCount = choice(rng, [1, 2, 2]);
  for (let i = 0; i < goalCount; i += 1) {
    if (!place("G")) return "";
  }

  return grid.map((row) => row.join("")).join("\n");
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

function coversGroups(events: string[], groups: Group[]): boolean {
  return groups.every((group) =>
    group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern))),
  );
}

function firstStepWith(inputs: InputId[], initial: RuntimeState, pattern: string): number {
  let state = initial;
  for (const [index, input] of inputs.entries()) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return -1;
    if (result.events.some((event) => eventMatchesPattern(event, pattern))) return index + 1;
    state = result.state;
  }
  return -1;
}

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
    const current = queue[cursor++]!;
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
      if (!result.legal) continue;
      const nextMask = collectMask(current.mask, result.events, requiredGroups);
      const nextKey = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      queue.push({ state: result.state, mask: nextMask, depth: current.depth + 1 });
    }
  }
  return {
    found: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
  };
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

function formatReport(): string {
  const lines = [
    `# Movable B/S Search ${seed}`,
    "",
    `iterations=${iterations} maxStates=${maxStates} graphMaxStates=${graphMaxStates} maxDepth=${maxDepth}`,
    "",
  ];
  if (hits.length === 0) {
    lines.push("No hits.");
    return `${lines.join("\n")}\n`;
  }
  for (const [index, hit] of hits.entries()) {
    lines.push(`## Hit ${index + 1}: ${hit.id}`);
    lines.push("");
    lines.push(
      `score=${hit.score.toFixed(1)} cost=${hit.cost} firstAnchorStep=${hit.firstAnchorStep} graph=${hit.graphStates} win=${hit.winStates} probe=${hit.probeStates} scc=${hit.sccShape ?? "n/a"}`,
    );
    lines.push("");
    lines.push("Source:");
    lines.push("");
    lines.push("```text");
    lines.push(hit.sourceLayout);
    lines.push("```");
    lines.push("");
    lines.push("Rendered:");
    lines.push("");
    lines.push("```text");
    lines.push(hit.layout);
    lines.push("```");
    lines.push("");
    lines.push(`inputs=${hit.inputs.join(" ")}`);
    lines.push(`events=${hit.events.join(" ")}`);
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function choice<T>(rng: Rng, values: T[]): T {
  return values[Math.floor(rng() * values.length)]!;
}

function randInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function mulberry32(seedValue: number): Rng {
  let value = seedValue >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
