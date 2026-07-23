import type {
  CandidatesV2Doc,
  CurriculumV2Package,
  PrototypePackage,
} from "../../core/types.js";

export type ToolMaturity =
  | "unavailable"
  | "scaffold"
  | "probe_seed_suite"
  | "raw_sampler"
  | "candidate_seed_factories"
  | "curated_miner";

export type ToolCapability = {
  status: "implemented" | "unavailable";
  maturity: ToolMaturity;
  reason: string;
};

export const candleSokobanToolCapabilities = {
  runtimeAdapter: {
    status: "implemented",
    maturity: "scaffold",
    reason: "Pure candle runtime is registered for solver, analyzer, replay, editor, and playable.",
  },
  probeSeedSuite: {
    status: "implemented",
    maturity: "probe_seed_suite",
    reason: "levels.yml contains rule-focused ASCII probes for the confirmed candle semantics.",
  },
  runtimeBackedPlayable: {
    status: "implemented",
    maturity: "scaffold",
    reason: "The generic playable builds through the candle_sokoban runtime adapter.",
  },
  rawSampler: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "No candle-specific sampler profile exists.",
  },
  candidateSeedFactories: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "No candle level_specs_v2 candidate factories exist.",
  },
  curatedMiner: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Candle-specific scoring and filtering are not calibrated.",
  },
  puzzleScriptExporter: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Rolling substeps, projection overlap, fire closure, and simultaneous shrink are not exported.",
  },
  puzzleScriptChecker: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "PuzzleScript export is unavailable for candle_sokoban.",
  },
} satisfies Record<string, ToolCapability>;

export function generateCandleSokobanCandidates(
  pkg: CurriculumV2Package,
): CandidatesV2Doc {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("candidateSeedFactories");
}

export function mineCandleSokobanSeeds(pkg: PrototypePackage): never {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("rawSampler");
}

export function buildCandleSokobanPuzzleScript(pkg: PrototypePackage): string {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("puzzleScriptExporter");
}

export function checkCandleSokobanPuzzleScript(_source: string): void {
  throw unavailable("puzzleScriptChecker");
}

function assertMechanic(mechanicId: string): void {
  if (mechanicId !== "candle_sokoban") {
    throw new Error(`candle_sokoban tools cannot run for mechanic '${mechanicId}'`);
  }
}

function unavailable(
  tool: keyof typeof candleSokobanToolCapabilities,
): Error {
  const capability = candleSokobanToolCapabilities[tool];
  return new Error(
    `candle_sokoban ${tool} unavailable: ${capability.reason}`,
  );
}
