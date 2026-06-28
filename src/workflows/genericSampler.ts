import type { LevelDoc, PrototypePackage, WinCondition } from "../core/types.js";
import { analyzeLevel, type LevelAnalysis } from "./levelAnalyzer.js";
import { getRuntimeAdapter } from "../prototypes/runtimeAdapter.js";
import { eventType } from "../core/events.js";
import type { MineOptions, MinerFinding, MinerReport } from "./seedMiner.js";

export type Rng = () => number;

export type GenericSample = {
  index: number;
  seed: number;
  generator: string;
  layout: string;
  metadata?: Record<string, unknown>;
};

export type GenericSolveInstance = {
  id: string;
  title?: string;
  playerStart?: [number, number];
  playerGoal?: [number, number];
  winCondition: WinCondition;
  notes?: string[];
};

export type GenericSamplerProfile = {
  mechanicId: string;
  reportToolId: string;
  maturity?: "raw_sampler" | "curated_miner";
  searchSpace: string;
  defaultOptions?: Partial<Required<MineOptions>>;
  sample(input: {
    index: number;
    seed: number;
    rng: Rng;
    options: Required<MineOptions>;
  }): GenericSample;
  enumerateSolveInstances(input: {
    sample: GenericSample;
    pkg: PrototypePackage;
    rng: Rng;
    options: Required<MineOptions>;
  }): GenericSolveInstance[];
  classifyTags(input: {
    analysis: LevelAnalysis;
    sample: GenericSample;
    instance: GenericSolveInstance;
  }): string[];
  scoreFinding(input: {
    analysis: LevelAnalysis;
    tags: string[];
    sample: GenericSample;
    instance: GenericSolveInstance;
  }): number;
  rejectFinding?(input: {
    analysis: LevelAnalysis;
    tags: string[];
    score: number;
    sample: GenericSample;
    instance: GenericSolveInstance;
  }): string | undefined;
  notes?(input: {
    analysis: LevelAnalysis;
    tags: string[];
    sample: GenericSample;
    instance: GenericSolveInstance;
  }): string[];
};

const genericDefaults: Required<MineOptions> = {
  seed: 18422,
  iterations: 120,
  maxFindings: 12,
  width: 0,
  height: 0,
  minWidth: 6,
  maxWidth: 10,
  minHeight: 1,
  maxHeight: 5,
  crates: -1,
  portalPairs: -1,
  wallDensity: 0.08,
  minScore: 1,
  maxStates: 25_000,
  maxDepth: 90,
  graphMaxStates: 25_000,
};

export function runGenericSampler(
  pkg: PrototypePackage,
  profile: GenericSamplerProfile,
  options: MineOptions = {},
): MinerReport {
  if (pkg.mechanic.id !== profile.mechanicId) {
    throw new Error(`${profile.mechanicId} sampler cannot run for mechanic '${pkg.mechanic.id}'.`);
  }

  const normalized = {
    ...genericDefaults,
    ...(profile.defaultOptions ?? {}),
    ...definedOptions(options),
  };
  const rng = mulberry32(normalized.seed);
  const seen = new Set<string>();
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

  for (let index = 0; index < normalized.iterations; index += 1) {
    const sample = profile.sample({
      index,
      seed: normalized.seed,
      rng,
      options: normalized,
    });
    stats.generated += 1;

    const instances = profile.enumerateSolveInstances({
      sample,
      pkg,
      rng,
      options: normalized,
    });
    if (instances.length === 0) {
      stats.invalid += 1;
      continue;
    }

    for (const instance of instances) {
      const dedupeKey = `${sample.layout}\n---\n${JSON.stringify(instance.winCondition)}`;
      if (seen.has(dedupeKey)) {
        continue;
      }
      seen.add(dedupeKey);

      const level = sampleToLevel(pkg, sample, instance);
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
      if (!solutionReplays(pkg, level, analysis.solution.inputs, instance.winCondition)) {
        stats.invalid += 1;
        continue;
      }

      stats.solved += 1;
      if (analysis.graph.status === "complete") {
        stats.completeGraph += 1;
      }
      if (analysis.agency.status === "complete") {
        stats.completeAgency += 1;
      }

      const tags = profile.classifyTags({ analysis, sample, instance });
      const score = profile.scoreFinding({ analysis, tags, sample, instance });
      const rejectReason = profile.rejectFinding?.({
        analysis,
        tags,
        score,
        sample,
        instance,
      });
      if (rejectReason || score < normalized.minScore) {
        continue;
      }
      findings.push(toFinding(profile, sample, instance, analysis, tags, score));
    }
  }

  findings.sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return left.solution.cost - right.solution.cost;
  });

  stats.keptBeforeLimit = findings.length;
  const kept = selectDiverseFindings(findings, normalized.maxFindings);
  stats.kept = kept.length;

  return {
    prototype: pkg.mechanic.id,
    generatedAt: new Date().toISOString(),
    toolMaturity: profile.maturity ?? "raw_sampler",
    searchSpace: profile.searchSpace,
    options: normalized,
    stats,
    tagCounts: countTags(kept),
    findings: kept,
  };
}

function sampleToLevel(
  pkg: PrototypePackage,
  sample: GenericSample,
  instance: GenericSolveInstance,
): LevelDoc {
  return {
    id: `sample_${String(sample.index).padStart(4, "0")}_${instance.id}`,
    title: instance.title ?? `Sample ${sample.index} ${instance.id}`,
    role: "mechanic_witness",
    status: "candidate",
    targets: pkg.knowledge.knowledge.length > 0 ? [pkg.knowledge.knowledge[0]!.id] : [],
    known_before: [],
    target_learning: pkg.knowledge.knowledge.length > 0 ? [pkg.knowledge.knowledge[0]!.id] : [],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: sample.layout,
    win: instance.winCondition,
  };
}

function solutionReplays(
  pkg: PrototypePackage,
  level: LevelDoc,
  inputs: string[],
  winCondition: WinCondition,
): boolean {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const initial = adapter.parseLevel(level);
  const replay = adapter.replay(pkg.mechanic, initial, inputs, { winCondition });
  return replay.legal && adapter.isWin(replay.state, winCondition);
}

function toFinding(
  profile: GenericSamplerProfile,
  sample: GenericSample,
  instance: GenericSolveInstance,
  analysis: LevelAnalysis,
  tags: string[],
  score: number,
): MinerFinding {
  const scc = analysis.agency.scc;
  return {
    id: `MF_${String(sample.index).padStart(4, "0")}_${instance.id}`,
    source: {
      tool: profile.reportToolId,
      generator: sample.generator,
      seed: sample.seed,
      index: sample.index,
    },
    score,
    tags,
    layout: sample.layout,
    solveInstance: {
      id: instance.id,
      playerStart: instance.playerStart,
      playerGoal: instance.playerGoal,
      winCondition: instance.winCondition,
    },
    observedEvents: [...new Set(analysis.solution.events.map(eventType))],
    eventCounts: analysis.solution.eventCounts,
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
    notes: [
      profile.maturity === "curated_miner"
        ? "Heuristic miner finding. Use as designer-review evidence only, not as accepted level material."
        : "Raw sampler finding. Use as discovery evidence only, not as accepted level material.",
      ...(instance.notes ?? []),
      ...(profile.notes?.({ analysis, tags, sample, instance }) ?? []),
    ],
  };
}

function selectDiverseFindings(findings: MinerFinding[], maxFindings: number): MinerFinding[] {
  const selected: MinerFinding[] = [];
  const signatureCounts = new Map<string, number>();
  const generatorCounts = new Map<string, number>();
  const generatorCap = Math.max(2, Math.ceil(maxFindings * 0.5));

  for (const finding of findings) {
    const signature = [
      finding.source.generator,
      finding.solution.events.map(eventType).join(">"),
      finding.tags.sort().join("+"),
      finding.solveInstance?.playerStart?.join(",") ?? "",
      finding.solveInstance?.playerGoal?.join(",") ?? "",
    ].join("|");
    const signatureCount = signatureCounts.get(signature) ?? 0;
    const generatorCount = generatorCounts.get(finding.source.generator) ?? 0;
    if (signatureCount >= 2 || generatorCount >= generatorCap) {
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

function countTags(findings: MinerFinding[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const finding of findings) {
    for (const tag of finding.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function definedOptions(options: MineOptions): Partial<MineOptions> {
  return Object.fromEntries(
    Object.entries(options).filter(([, value]) => value !== undefined),
  ) as Partial<MineOptions>;
}

export function randInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function mulberry32(seed: number): Rng {
  let current = seed >>> 0;
  return () => {
    current += 0x6d2b79f5;
    let next = current;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}
