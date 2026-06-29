export type ToolMaturity =
  | "unavailable"
  | "scaffold"
  | "probe_seed_suite"
  | "raw_sampler"
  | "candidate_seed_factories"
  | "curated_miner";

export type ToolCapability = {
  tool: string;
  maturity: ToolMaturity;
  status: "available" | "unavailable";
  reason?: string;
};

const genericUnavailable = {
  status: "unavailable",
  maturity: "unavailable",
} as const;

export function capabilitiesForMechanic(mechanicId: string): ToolCapability[] {
  switch (mechanicId) {
    case "pull_portal_fallback":
      return [
        capability("probe_seed_suite", "probe_seed_suite", "Existing candidate fixtures serve as probe seeds."),
        capability("raw_sampler", "curated_miner", "Temporary seed miner has pull-portal-specific scoring."),
        capability("temporary_miner", "curated_miner", "Pull-portal miner is mechanism-specific and calibrated."),
        capability("candidate_seed_factories", "candidate_seed_factories", "generate-v2 factories are pull-portal-specific."),
        capability("curated_miner", "curated_miner", "Pull-portal miner includes dedicated tags and scoring."),
        capability("puzzlescript_exporter", "candidate_seed_factories", "PuzzleScript exporter is implemented for pull-portal only."),
        capability("puzzlescript_checker", "candidate_seed_factories", "PuzzleScript checker is implemented for pull-portal only."),
      ];
    case "ice_slide_escape":
      return [
        capability("probe_seed_suite", "probe_seed_suite", "P01-P10 rule probes are package fixtures."),
        capability("raw_sampler", "raw_sampler", "Generic sampler profile enumerates explicit distinct edge start/goal pairs."),
        capability(
          "temporary_miner",
          "curated_miner",
          "The mine command uses ice_mechanic_probe_prior_v1 mechanism-discovery and design-surface ranking.",
        ),
        unavailable("candidate_seed_factories", "level_specs_v2 ice factories have not been authored."),
        capability(
          "curated_miner",
          "curated_miner",
          "ice_mechanic_probe_prior_v1 exists; it is an inspiration/search prior, not a quality score or accepted gate.",
        ),
        unavailable("puzzlescript_exporter", "Ice slide distance/group semantics are not exported yet."),
        unavailable("puzzlescript_checker", "Ice PuzzleScript export is unavailable."),
      ];
    default:
      return [
        unavailable("probe_seed_suite", `No probe seed suite registered for '${mechanicId}'.`),
        unavailable("raw_sampler", `No sampler profile registered for '${mechanicId}'.`),
        unavailable("temporary_miner", `No miner profile registered for '${mechanicId}'.`),
        unavailable("candidate_seed_factories", `No candidate factories registered for '${mechanicId}'.`),
        unavailable("curated_miner", `No curated miner registered for '${mechanicId}'.`),
        unavailable("puzzlescript_exporter", `No PuzzleScript exporter registered for '${mechanicId}'.`),
        unavailable("puzzlescript_checker", `No PuzzleScript checker registered for '${mechanicId}'.`),
      ];
  }
}

export function capabilityForMechanic(
  mechanicId: string,
  tool: string,
): ToolCapability {
  return (
    capabilitiesForMechanic(mechanicId).find((capabilityItem) => capabilityItem.tool === tool) ??
    unavailable(tool, `No capability entry registered for '${tool}' on '${mechanicId}'.`)
  );
}

export function unavailableToolMessage(mechanicId: string, tool: string): string {
  const capabilityItem = capabilityForMechanic(mechanicId, tool);
  return `${mechanicId} ${tool} unavailable: ${capabilityItem.reason ?? "tool is not implemented for this mechanism"}`;
}

export function formatToolCapabilitiesMarkdown(mechanicId: string): string {
  const rows = capabilitiesForMechanic(mechanicId);
  const lines = [
    `# Tool Capability Maturity: ${mechanicId}`,
    "",
    "| Tool | Status | Maturity | Reason |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (row) =>
        `| ${escapeCell(row.tool)} | ${row.status} | ${row.maturity} | ${escapeCell(row.reason ?? "")} |`,
    ),
  ];
  return `${lines.join("\n")}\n`;
}

function capability(tool: string, maturity: Exclude<ToolMaturity, "unavailable">, reason: string): ToolCapability {
  return {
    tool,
    maturity,
    status: "available",
    reason,
  };
}

function unavailable(tool: string, reason: string): ToolCapability {
  return {
    ...genericUnavailable,
    tool,
    reason,
  };
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}
