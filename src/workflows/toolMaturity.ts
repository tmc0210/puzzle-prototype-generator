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
    case "candle_sokoban":
      return [
        capability(
          "probe_seed_suite",
          "probe_seed_suite",
          "Confirmed candle ASCII and settlement probes are package fixtures.",
        ),
        unavailable("raw_sampler", "No candle-specific sampler profile exists."),
        unavailable("temporary_miner", "No candle-specific miner exists."),
        unavailable(
          "candidate_seed_factories",
          "No candle level_specs_v2 seed factories exist.",
        ),
        unavailable(
          "curated_miner",
          "Candle scoring and filtering are not calibrated.",
        ),
        capability(
          "runtime_backed_playable",
          "scaffold",
          "The generic playable builds through the registered candle runtime adapter.",
        ),
        unavailable(
          "puzzlescript_exporter",
          "Rolling, projections, fire closure, and simultaneous shrink are not exported.",
        ),
        unavailable(
          "puzzlescript_checker",
          "Candle PuzzleScript export is unavailable.",
        ),
      ];
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
    case "reality_anchor":
      return [
        capability("probe_seed_suite", "probe_seed_suite", "Reality Anchor v0 smoke fixtures cover the confirmed preflight probes."),
        capability(
          "raw_sampler",
          "raw_sampler",
          "The mine command uses reality_anchor_raw_sampler_v1 for raw discovery evidence.",
        ),
        capability(
          "temporary_miner",
          "raw_sampler",
          "Reality Anchor mine is a raw sampler, not a calibrated curated miner.",
        ),
        unavailable("candidate_seed_factories", "Reality Anchor level_specs_v2 seed factories are outside the v0 scope."),
        unavailable("curated_miner", "Reality Anchor miner scoring is not calibrated beyond raw discovery ranking."),
        capability("runtime_backed_playable", "scaffold", "Generic runtime-backed playable builds through the registered Reality Anchor adapter."),
        unavailable("puzzlescript_exporter", "Reality Anchor PuzzleScript export is unavailable."),
        unavailable("puzzlescript_checker", "Reality Anchor PuzzleScript checker is unavailable."),
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
