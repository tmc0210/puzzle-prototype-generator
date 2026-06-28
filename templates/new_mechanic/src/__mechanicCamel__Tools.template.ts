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
  reason?: string;
};

export const __mechanicCamel__ToolCapabilities = {
  runtimeAdapter: {
    status: "implemented",
    maturity: "scaffold",
    reason: "Runtime adapter is the only default implemented tool.",
  },
  probeSeedSuite: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Add confirmed ASCII probe fixtures before marking this available.",
  },
  rawSampler: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Add a mechanism-specific sampler profile before enabling raw sampling.",
  },
  candidateSeedFactories: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "level_specs_v2-targeted seed factories have not been authored.",
  },
  curatedMiner: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Mechanism-specific scoring and filtering are not calibrated.",
  },
  puzzleScriptExporter: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Exporter not implemented for this mechanism.",
  },
  puzzleScriptChecker: {
    status: "unavailable",
    maturity: "unavailable",
    reason: "Checker not implemented for this mechanism.",
  },
} satisfies Record<string, ToolCapability>;

export function generate__MechanicPascal__Candidates(
  pkg: CurriculumV2Package,
): CandidatesV2Doc {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("candidate_seed_factories");
}

export function mine__MechanicPascal__Seeds(
  pkg: PrototypePackage,
): never {
  assertMechanic(pkg.mechanic.id);
  throw unavailable("raw_sampler");
}

export function build__MechanicPascal__PuzzleScript(_pkg: PrototypePackage): string {
  throw unavailable("puzzleScriptExporter");
}

export function check__MechanicPascal__PuzzleScript(_source: string): void {
  throw unavailable("puzzleScriptChecker");
}

function assertMechanic(mechanicId: string): void {
  if (mechanicId !== "__mechanic_id__") {
    throw new Error(`__mechanic_id__ tools cannot run for mechanic '${mechanicId}'`);
  }
}

function unavailable(tool: keyof typeof __mechanicCamel__ToolCapabilities): Error {
  const capability = __mechanicCamel__ToolCapabilities[tool];
  return new Error(
    `__mechanic_id__ ${tool} unavailable: ${capability.reason ?? "tool is not implemented"}`,
  );
}
