import type {
  CandidatesV2Doc,
  CurriculumV2Package,
  PrototypePackage,
} from "../../core/types.js";
import { runGenericSampler } from "../../workflows/genericSampler.js";
import type { MineOptions, MinerReport } from "../../workflows/seedMiner.js";
import { realityAnchorSamplerProfile } from "./samplerProfile.js";

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
  reason?: string;
};

export const realityAnchorToolCapabilities = {
  runtimeAdapter: {
    status: "implemented",
    maturity: "scaffold",
    reason: "Reality Anchor runtime adapter is implemented for v0 smoke testing.",
  },
  probeSeedSuite: {
    status: "implemented",
    maturity: "probe_seed_suite",
    reason: "prototypes/reality_anchor/levels.yml contains confirmed-rule smoke fixtures.",
  },
  rawSampler: {
    status: "implemented",
    maturity: "raw_sampler",
    reason: "reality_anchor_raw_sampler_v1 produces raw discovery findings through the generic sampler.",
  },
  temporaryMiner: {
    status: "implemented",
    maturity: "raw_sampler",
    reason: "Reality Anchor mine is a raw sampler, not a calibrated curated miner.",
  },
  candidateSeedFactories: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "level_specs_v2-targeted Reality Anchor seed factories have not been authored.",
  },
  curatedMiner: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Reality Anchor scoring and filtering are not calibrated beyond raw discovery ranking.",
  },
  puzzleScriptExporter: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "PuzzleScript Next export is not implemented for Reality Anchor.",
  },
  puzzleScriptChecker: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "PuzzleScript Next check is not implemented for Reality Anchor.",
  },
  runtimeBackedPlayable: {
    status: "implemented",
    maturity: "scaffold",
    reason: "Generic runtime-backed playable builds with the registered Reality Anchor adapter.",
  },
} satisfies Record<string, ToolCapability>;

export function generateRealityAnchorCandidates(pkg: CurriculumV2Package): CandidatesV2Doc {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("candidateSeedFactories");
}

export function mineRealityAnchorSeeds(
  pkg: PrototypePackage,
  options: MineOptions = {},
): MinerReport {
  assertMechanic(pkg.mechanic.id);
  return runGenericSampler(pkg, realityAnchorSamplerProfile, options);
}

export function buildRealityAnchorPuzzleScript(pkg: PrototypePackage): string {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("puzzleScriptExporter");
}

export function checkRealityAnchorPuzzleScript(source: string): void {
  void source;
  throw unavailable("puzzleScriptChecker");
}

function assertMechanic(mechanicId: string): void {
  if (mechanicId !== "reality_anchor") {
    throw new Error(`reality_anchor tools cannot run for mechanic '${mechanicId}'`);
  }
}

function unavailable(tool: keyof typeof realityAnchorToolCapabilities): Error {
  const capability = realityAnchorToolCapabilities[tool];
  return new Error(
    `reality_anchor ${tool} unavailable: ${capability.reason ?? "tool is not implemented"}`,
  );
}
