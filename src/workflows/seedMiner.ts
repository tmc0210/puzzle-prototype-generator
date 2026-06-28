import type { LevelDoc, PrototypePackage } from "../core/types.js";
import { analyzeLevel, type LevelAnalysis } from "./levelAnalyzer.js";
import { runGenericSampler } from "./genericSampler.js";
import { iceSlideSamplerProfile } from "../prototypes/ice_slide_escape/samplerProfile.js";
import { unavailableToolMessage } from "./toolMaturity.js";

type Rng = () => number;

type GeneratedCandidate = {
  index: number;
  seed: number;
  generator: string;
  layout: string;
};

export type MineOptions = {
  seed?: number;
  iterations?: number;
  maxFindings?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  crates?: number;
  portalPairs?: number;
  wallDensity?: number;
  minScore?: number;
  maxStates?: number;
  maxDepth?: number;
  graphMaxStates?: number;
};

export type MinerFinding = {
  id: string;
  source: {
    tool: string;
    generator: string;
    seed: number;
    index: number;
  };
  score: number;
  tags: string[];
  layout: string;
  solveInstance?: {
    id: string;
    playerStart?: [number, number];
    playerGoal?: [number, number];
    winCondition?: unknown;
  };
  observedEvents: string[];
  eventCounts: Record<string, number>;
  solution: {
    cost: number;
    exploredStates: number;
    inputs: string[];
    events: string[];
  };
  graph: {
    status: string;
    reachableStates: number;
    legalTransitions: number;
    winStates: number | string;
  };
  scc?: {
    shape: string;
    count: number;
    irreversibleSteps: number;
    forcedWinPrefix: number;
    initialStateCount: number;
    initialOutgoing: number;
    initialWinReachableOutgoing: number;
    initialDeadOutgoing: number;
    branchingWinSccs: number;
    mergingWinSccs: number;
  };
  objectParticipation: Array<{
    objectType: string;
    role: string;
    eventType: string;
    distinct: number;
    instances: string[];
  }>;
  notes: string[];
};

export type MinerReport = {
  prototype: string;
  generatedAt: string;
  toolMaturity?: string;
  searchSpace?: string;
  options: Required<MineOptions>;
  stats: {
    generated: number;
    invalid: number;
    unsolved: number;
    solved: number;
    completeGraph: number;
    completeAgency: number;
    keptBeforeLimit: number;
    kept: number;
  };
  tagCounts: Record<string, number>;
  findings: MinerFinding[];
};

const portalPairs = [
  ["A", "B"],
  ["D", "E"],
  ["H", "I"],
] as const;

const defaultOptions: Required<MineOptions> = {
  seed: 18422,
  iterations: 120,
  maxFindings: 12,
  width: 0,
  height: 0,
  minWidth: 6,
  maxWidth: 9,
  minHeight: 5,
  maxHeight: 8,
  crates: -1,
  portalPairs: -1,
  wallDensity: 0.08,
  minScore: 20,
  maxStates: 25_000,
  maxDepth: 90,
  graphMaxStates: 25_000,
};

export function mineSeeds(pkg: PrototypePackage, options: MineOptions = {}): MinerReport {
  if (pkg.mechanic.id === "ice_slide_escape") {
    return runGenericSampler(pkg, iceSlideSamplerProfile, options);
  }

  if (pkg.mechanic.id !== "pull_portal_fallback") {
    throw new Error(unavailableToolMessage(pkg.mechanic.id, "temporary_miner"));
  }

  const normalized = { ...defaultOptions, ...definedOptions(options) };
  const rng = mulberry32(normalized.seed);
  const findings: MinerFinding[] = [];
  const stats = {
    generated: 0,
    invalid: 0,
    unsolved: 0,
    solved: 0,
    completeGraph: 0,
    completeAgency: 0,
    keptBeforeLimit: 0,
    kept: 0,
  };
  const seenLayouts = new Set<string>();

  for (let index = 0; index < normalized.iterations; index += 1) {
    const candidate = generateCandidate(index, normalized.seed, rng, normalized);
    stats.generated += 1;
    if (seenLayouts.has(candidate.layout)) {
      continue;
    }
    seenLayouts.add(candidate.layout);

    const level = candidateToLevel(candidate, pkg);
    let analysis: LevelAnalysis;
    try {
      analysis = analyzeLevel(pkg, level, {
        maxStates: normalized.maxStates,
        maxDepth: normalized.maxDepth,
        graphMaxStates: normalized.graphMaxStates,
        bypassMaxStates: Math.min(normalized.maxStates, 5_000),
        counterfactualMaxStates: Math.min(normalized.maxStates, 5_000),
      });
    } catch {
      stats.invalid += 1;
      continue;
    }

    if (!analysis.solution.found || analysis.solution.cost === undefined) {
      stats.unsolved += 1;
      continue;
    }

    stats.solved += 1;
    if (analysis.graph.status === "complete") {
      stats.completeGraph += 1;
    }
    if (analysis.agency.status === "complete") {
      stats.completeAgency += 1;
    }

    const finding = toFinding(candidate, analysis);
    if (finding.score >= normalized.minScore) {
      findings.push(finding);
    }
  }

  findings.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return left.solution.cost - right.solution.cost;
  });

  const keptBeforeLimit = findings.length;
  const kept = selectDiverseFindings(findings, normalized.maxFindings);
  stats.keptBeforeLimit = keptBeforeLimit;
  stats.kept = kept.length;

  return {
    prototype: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    options: normalized,
    stats,
    tagCounts: countTags(kept),
    findings: kept,
  };
}

function selectDiverseFindings(findings: MinerFinding[], maxFindings: number): MinerFinding[] {
  const selected: MinerFinding[] = [];
  const signatureCounts = new Map<string, number>();
  const generatorCounts = new Map<string, number>();
  const generatorCap = Math.max(2, Math.ceil(maxFindings * 0.5));

  for (const finding of findings) {
    const signature = findingSignature(finding);
    const signatureCount = signatureCounts.get(signature) ?? 0;
    const generatorCount = generatorCounts.get(finding.source.generator) ?? 0;
    if (signatureCount >= 2) {
      continue;
    }
    if (generatorCount >= generatorCap) {
      continue;
    }
    selected.push(finding);
    signatureCounts.set(signature, signatureCount + 1);
    generatorCounts.set(finding.source.generator, generatorCount + 1);
    if (selected.length >= maxFindings) {
      break;
    }
  }

  return selected;
}

function findingSignature(finding: MinerFinding): string {
  return [
    finding.source.generator,
    finding.solution.events.map(eventBase).join(">"),
    finding.tags.filter((tag) => tag !== "open_initial_scc").sort().join("+"),
  ].join("|");
}

function definedOptions(options: MineOptions): Partial<MineOptions> {
  return Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as Partial<MineOptions>;
}

export function formatMinerReportMarkdown(report: MinerReport): string {
  const lines: string[] = [
    `# Temporary Seed Miner Report: ${report.prototype}`,
    "",
    report.toolMaturity === "curated_miner"
      ? "Status: heuristic mined evidence. These are not accepted levels, slots, or quality verdicts."
      : "Status: raw mined evidence. These are not accepted levels, slots, or quality verdicts.",
    ...(report.toolMaturity ? [`Maturity: ${report.toolMaturity}.`, ""] : []),
    "",
    "## Run",
    "",
    `- Generated at: ${report.generatedAt}`,
    `- Seed: ${report.options.seed}`,
    `- Iterations: ${report.options.iterations}`,
    `- Search space: ${report.searchSpace ?? "mixed small-board probes with scatter, pull-biased, fallback-biased, and multi-pair-biased candidates"}`,
    `- Budgets: maxStates=${report.options.maxStates}, maxDepth=${report.options.maxDepth}, graphMaxStates=${report.options.graphMaxStates}`,
    `- Filters: minScore=${report.options.minScore}, maxFindings=${report.options.maxFindings}`,
    "",
    "## Stats",
    "",
    `- Generated: ${report.stats.generated}`,
    `- Invalid: ${report.stats.invalid}`,
    `- Unsolved: ${report.stats.unsolved}`,
    `- Solved: ${report.stats.solved}`,
    `- Complete graph: ${report.stats.completeGraph}`,
    `- Complete agency: ${report.stats.completeAgency}`,
    `- Kept before limit: ${report.stats.keptBeforeLimit}`,
    `- Kept: ${report.stats.kept}`,
    "",
    "## Tag Counts",
    "",
    ...formatTagCounts(report.tagCounts),
    "",
    "## Findings",
    "",
  ];

  if (report.findings.length === 0) {
    lines.push("No findings passed the current raw-interest filter.");
    return `${lines.join("\n").trimEnd()}\n`;
  }

  for (const finding of report.findings) {
    lines.push(
      `### ${finding.id}: score ${finding.score}`,
      "",
      `- Source: ${finding.source.tool}/${finding.source.generator}, seed=${finding.source.seed}, index=${finding.source.index}`,
      ...formatSolveInstance(finding),
      `- Tags: ${finding.tags.join(", ") || "none"}`,
      `- Solution: cost=${finding.solution.cost}, explored=${finding.solution.exploredStates}`,
      `- Inputs: ${finding.solution.inputs.join(" ")}`,
      `- Events: ${finding.solution.events.join(" ") || "none"}`,
      `- Event counts: ${formatCounts(finding.eventCounts)}`,
      `- Graph: status=${finding.graph.status}, states=${finding.graph.reachableStates}, transitions=${finding.graph.legalTransitions}, wins=${finding.graph.winStates}`,
      ...formatFindingScc(finding),
      "",
      "Layout:",
      "",
      codeBlock(finding.layout),
      "",
      "Object participation:",
      "",
      ...formatFindingParticipation(finding),
      "",
      "Interpretation prompts:",
      "",
      ...finding.notes.map((note) => `- ${note}`),
      "",
    );
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function candidateToLevel(candidate: GeneratedCandidate, pkg: PrototypePackage): LevelDoc {
  return {
    id: `mined_${String(candidate.index).padStart(4, "0")}`,
    title: `Mined candidate ${candidate.index}`,
    role: "mechanic_witness",
    status: "candidate",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: candidate.layout,
    win: pkg.mechanic.win,
  };
}

function generateCandidate(
  index: number,
  seed: number,
  rng: Rng,
  options: Required<MineOptions>,
): GeneratedCandidate {
  const roll = rng();
  if (roll < 0.2) {
    return fromTemplate(index, seed, rng, options, "pull_gate", [
      "#######",
      "#.....#",
      "#C@...#",
      "###.###",
      "#..G..#",
      "#######",
    ]);
  }
  if (roll < 0.5) {
    return fromTemplate(index, seed, rng, options, "fallback_gate", [
      "#######",
      "#.....#",
      "#.@A..#",
      "#.#GB##",
      "#.....#",
      "#######",
    ]);
  }
  if (roll < 0.7) {
    return fromTemplate(index, seed, rng, options, "two_pair_gate", [
      "########",
      "#......#",
      "#.@A.D.#",
      "#.#GBE##",
      "#......#",
      "########",
    ]);
  }
  return scatterCandidate(index, seed, rng, options);
}

function fromTemplate(
  index: number,
  seed: number,
  rng: Rng,
  options: Required<MineOptions>,
  generator: string,
  rows: string[],
): GeneratedCandidate {
  let grid = rows.map((row) => row.split(""));
  if (rng() < 0.5) {
    grid = mirrorX(grid);
  }
  if (rng() < 0.35) {
    grid = mirrorY(grid);
  }
  addRandomWalls(grid, rng, Math.max(0, options.wallDensity * 0.45));
  maybeAddExtraCrate(grid, rng);
  maybeAddPortalPair(grid, rng);
  return {
    index,
    seed,
    generator,
    layout: gridToLayout(grid),
  };
}

function scatterCandidate(
  index: number,
  seed: number,
  rng: Rng,
  options: Required<MineOptions>,
): GeneratedCandidate {
  const width = options.width > 0 ? options.width : randInt(rng, options.minWidth, options.maxWidth);
  const height = options.height > 0 ? options.height : randInt(rng, options.minHeight, options.maxHeight);
  const grid = makeEmptyGrid(width, height);
  const crateCount = options.crates >= 0 ? options.crates : randInt(rng, 1, 2);
  const pairCount = options.portalPairs >= 0 ? options.portalPairs : randInt(rng, 1, 2);
  placeRandomFree(grid, rng, "@");
  placeRandomFree(grid, rng, "G");
  for (let index = 0; index < crateCount; index += 1) {
    placeRandomFree(grid, rng, "C");
  }
  for (const [left, right] of portalPairs.slice(0, pairCount)) {
    placeRandomFree(grid, rng, left);
    placeRandomFree(grid, rng, right);
  }
  addRandomWalls(grid, rng, options.wallDensity);
  return {
    index,
    seed,
    generator: "scatter",
    layout: gridToLayout(grid),
  };
}

function toFinding(candidate: GeneratedCandidate, analysis: LevelAnalysis): MinerFinding {
  const eventCounts = analysis.solution.eventCounts;
  const tags = classifyTags(analysis);
  const score = scoreFinding(analysis, tags);
  const scc = analysis.agency.scc;
  return {
    id: `MF_${String(candidate.index).padStart(4, "0")}`,
    source: {
      tool: "temporary_seed_miner",
      generator: candidate.generator,
      seed: candidate.seed,
      index: candidate.index,
    },
    score,
    tags,
    layout: candidate.layout,
    observedEvents: [...new Set(analysis.solution.events.map(eventBase))],
    eventCounts,
    solution: {
      cost: analysis.solution.cost ?? 0,
      exploredStates: analysis.solution.exploredStates,
      inputs: analysis.solution.inputs,
      events: analysis.solution.events,
    },
    graph: {
      status: analysis.graph.status,
      reachableStates: analysis.graph.reachableStateCount,
      legalTransitions: analysis.graph.legalTransitionCount,
      winStates: analysis.graph.winStateCount,
    },
    scc: scc
      ? {
          shape: scc.winSubgraphShape,
          count: scc.sccCount,
          irreversibleSteps: scc.solutionIrreversibleStepCount,
          forcedWinPrefix: scc.forcedWinContinuationPrefixLength,
          initialStateCount: scc.initialScc.stateCount,
          initialOutgoing: scc.initialScc.outgoingCount,
          initialWinReachableOutgoing: scc.initialScc.winReachableOutgoingCount,
          initialDeadOutgoing: scc.initialScc.deadOutgoingCount,
          branchingWinSccs: scc.winContinuationBranchingSccCount,
          mergingWinSccs: scc.winContinuationMergingSccCount,
        }
      : undefined,
    objectParticipation: analysis.solution.objectParticipation.map((item) => ({
      objectType: item.objectType,
      role: item.role,
      eventType: item.eventType,
      distinct: item.distinctInstances.length,
      instances: item.distinctInstances,
    })),
    notes: buildInterpretationNotes(analysis, tags),
  };
}

function classifyTags(analysis: LevelAnalysis): string[] {
  const events = new Set(analysis.solution.events.map(eventBase));
  const rawEvents = analysis.solution.events;
  const tags: string[] = [];
  if (events.has("pull_crate")) {
    tags.push("pull");
  }
  if (events.has("portal_teleport")) {
    tags.push("normal_teleport");
  }
  if (events.has("portal_fallback_push")) {
    tags.push("fallback_push");
  }
  if (rawEvents.some((event) => event.startsWith("portal_exit_blocked_by_crate"))) {
    tags.push("crate_blocks_exit");
  }
  if (rawEvents.some((event) => event.startsWith("portal_exit_blocked_by_portal"))) {
    tags.push("portal_blocks_exit");
  }
  if (analysis.solution.objectParticipation.some((item) => item.distinctInstances.length > 1)) {
    tags.push("multi_instance_participation");
  }
  if (analysis.agency.status !== "complete") {
    tags.push("graph_incomplete");
  }
  if (analysis.agency.scc?.winSubgraphShape === "branching_win_dag") {
    tags.push("branching_win_dag");
  }
  if ((analysis.agency.scc?.solutionIrreversibleStepCount ?? 0) >= 2) {
    tags.push("multi_irreversible_chain");
  }
  if ((analysis.agency.scc?.initialScc.stateCount ?? 0) > 1) {
    tags.push("open_initial_scc");
  }
  if (events.size >= 3) {
    tags.push("mixed_events");
  }
  if (events.size === 1 && events.has("walk")) {
    tags.push("walk_only");
  }
  return tags;
}

function scoreFinding(analysis: LevelAnalysis, tags: string[]): number {
  let score = 8;
  const cost = analysis.solution.cost ?? 0;
  if (cost >= 4) {
    score += Math.min(12, cost);
  }
  if (analysis.graph.status === "complete") {
    score += 5;
  }
  if (analysis.agency.status === "complete") {
    score += 5;
  }
  if (tags.includes("pull")) {
    score += 8;
  }
  if (tags.includes("normal_teleport")) {
    score += 8;
  }
  if (tags.includes("fallback_push")) {
    score += 14;
  }
  if (tags.includes("crate_blocks_exit")) {
    score += 6;
  }
  if (tags.includes("portal_blocks_exit")) {
    score += 8;
  }
  if (tags.includes("multi_instance_participation")) {
    score += 8;
  }
  if (tags.includes("mixed_events")) {
    score += 8;
  }
  if (tags.includes("branching_win_dag")) {
    score += 5;
  }
  if (tags.includes("multi_irreversible_chain")) {
    score += 8;
  }
  if (tags.includes("open_initial_scc")) {
    score += 3;
  }
  if (tags.includes("walk_only")) {
    score -= 25;
  }
  if (tags.includes("graph_incomplete")) {
    score -= 10;
  }
  return score;
}

function buildInterpretationNotes(analysis: LevelAnalysis, tags: string[]): string[] {
  const notes = ["Rewrite as a seed / combination / insight before using it in any slot."];
  if (tags.includes("fallback_push")) {
    notes.push("Inspect whether the fallback state change is later consumed or merely witnessed.");
  }
  if (tags.includes("normal_teleport") && tags.includes("fallback_push")) {
    notes.push("Potential seed-combination material: normal transport and fallback exception both appear.");
  }
  if (tags.includes("multi_instance_participation")) {
    notes.push("Potential multi-instance material: check whether distinct instances are coupled or just repeated.");
  }
  if (analysis.agency.scc?.winSubgraphShape === "branching_win_dag") {
    notes.push("SCC win DAG has local ordering freedom; inspect whether that freedom is meaningful.");
  }
  if ((analysis.agency.scc?.initialScc.stateCount ?? 0) <= 1) {
    notes.push("Opening may be too committed; consider start-position or opening-room variants if this becomes a level.");
  }
  if (analysis.graph.status !== "complete") {
    notes.push("Graph did not complete under budget; do not use graph-derived conclusions as hard evidence.");
  }
  return notes;
}

function makeEmptyGrid(width: number, height: number): string[][] {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".",
    ),
  );
}

function addRandomWalls(grid: string[][], rng: Rng, density: number): void {
  for (let y = 1; y < grid.length - 1; y += 1) {
    for (let x = 1; x < grid[y]!.length - 1; x += 1) {
      if (grid[y]![x] === "." && rng() < density) {
        grid[y]![x] = "#";
      }
    }
  }
}

function maybeAddExtraCrate(grid: string[][], rng: Rng): void {
  if (rng() < 0.3) {
    placeRandomFree(grid, rng, "C");
  }
}

function maybeAddPortalPair(grid: string[][], rng: Rng): void {
  if (rng() >= 0.25) {
    return;
  }
  const used = new Set(grid.flat().filter((char) => /[ABDEHI]/.test(char)));
  const pair = portalPairs.find(([left, right]) => !used.has(left) && !used.has(right));
  if (!pair) {
    return;
  }
  placeRandomFree(grid, rng, pair[0]);
  placeRandomFree(grid, rng, pair[1]);
}

function placeRandomFree(grid: string[][], rng: Rng, glyph: string): void {
  const cells: Array<{ x: number; y: number }> = [];
  for (let y = 1; y < grid.length - 1; y += 1) {
    for (let x = 1; x < grid[y]!.length - 1; x += 1) {
      if (grid[y]![x] === ".") {
        cells.push({ x, y });
      }
    }
  }
  if (cells.length === 0) {
    throw new Error(`No free cell for '${glyph}'`);
  }
  const chosen = cells[randInt(rng, 0, cells.length - 1)]!;
  grid[chosen.y]![chosen.x] = glyph;
}

function mirrorX(grid: string[][]): string[][] {
  return grid.map((row) => [...row].reverse());
}

function mirrorY(grid: string[][]): string[][] {
  return [...grid].reverse().map((row) => [...row]);
}

function gridToLayout(grid: string[][]): string {
  return grid.map((row) => row.join("")).join("\n");
}

function eventBase(event: string): string {
  return event.split(":")[0] ?? event;
}

function countTags(findings: MinerFinding[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const finding of findings) {
    for (const tag of finding.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function formatTagCounts(counts: Record<string, number>): string[] {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return ["No tags in kept findings."];
  }
  return entries.map(([tag, count]) => `- ${tag}: ${count}`);
}

function formatFindingScc(finding: MinerFinding): string[] {
  if (!finding.scc) {
    return ["- SCC: unavailable"];
  }
  const scc = finding.scc;
  return [
    `- SCC: shape=${scc.shape}, count=${scc.count}, irreversible=${scc.irreversibleSteps}, forcedPrefix=${scc.forcedWinPrefix}`,
    `- Initial SCC: states=${scc.initialStateCount}, out=${scc.initialOutgoing}, winOut=${scc.initialWinReachableOutgoing}, deadOut=${scc.initialDeadOutgoing}`,
    `- Win DAG: branching=${scc.branchingWinSccs}, merging=${scc.mergingWinSccs}`,
  ];
}

function formatSolveInstance(finding: MinerFinding): string[] {
  const instance = finding.solveInstance;
  if (!instance) {
    return [];
  }
  const start = instance.playerStart ? `[${instance.playerStart.join(", ")}]` : "n/a";
  const goal = instance.playerGoal ? `[${instance.playerGoal.join(", ")}]` : "n/a";
  return [`- Solve instance: ${instance.id}, start=${start}, goal=${goal}`];
}

function formatFindingParticipation(finding: MinerFinding): string[] {
  if (finding.objectParticipation.length === 0) {
    return ["- none"];
  }
  return finding.objectParticipation.map(
    (item) =>
      `- ${item.objectType}/${item.role} via ${item.eventType}: distinct=${item.distinct}, instances=${item.instances.join(", ")}`,
  );
}

function formatCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "none";
  }
  return entries.map(([event, count]) => `${event}=${count}`).join(", ");
}

function codeBlock(value: string): string {
  return ["```text", value, "```"].join("\n");
}

function randInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function mulberry32(seed: number): Rng {
  let current = seed >>> 0;
  return () => {
    current += 0x6d2b79f5;
    let next = current;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}
