import type { AgencyAnalysis, AgencyDecisionStep } from "./agencyAnalyzer.js";

export type AgencyDigestCommitment = {
  afterStep: number;
  fromRegion: number | null;
  toRegion: number | null;
  distanceToWin: number | null;
  viableChoices: number | null;
  deadChoices: number | null;
  optimalChoices: number | null;
  reading: string;
};

export type AgencyDigest = {
  status: AgencyAnalysis["status"];
  graphComplete: boolean;
  reachableStates: number;
  compressedRegions?: number;
  solutionCommitments?: number;
  openingCommitments?: number;
  openingViable?: number;
  openingDead?: number;
  openingOptimal?: number;
  forcedViablePrefix?: number;
  forcedOptimalPrefix?: number;
  forcedViableCommitments?: number;
  forcedOptimalCommitments?: number;
  firstWinningRegionStep?: number | null;
  tailAfterWinningRegionSteps?: number | null;
  commitmentSteps: AgencyDigestCommitment[];
  notes: string[];
};

export function buildAgencyDigest(agency: AgencyAnalysis): AgencyDigest {
  const base = {
    status: agency.status,
    graphComplete: agency.status === "complete",
    reachableStates: agency.reachableStateCount,
    commitmentSteps: [],
    notes: [],
  } satisfies AgencyDigest;

  if (agency.status !== "complete") {
    return {
      ...base,
      notes: ["Full graph was not enumerated, so agency metrics are unavailable."],
    };
  }

  const branches = agency.branchCountsOnSolutionPath ?? [];
  const decisionSteps = agency.decisionSteps ?? [];
  const solutionCommitments = branches.filter((branch) => branch.solutionNextRegion !== null).length;
  const commitmentSteps = decisionSteps
    .filter((step) => step.solutionTakesCommitmentNext)
    .map(toDigestCommitment);
  const firstWinningRegionStep =
    decisionSteps.find((step) => step.distanceToWin === 0)?.step ?? null;
  const finalStep = decisionSteps.at(-1)?.step ?? null;
  const tailAfterWinningRegionSteps =
    firstWinningRegionStep === null || finalStep === null
      ? null
      : Math.max(0, finalStep - firstWinningRegionStep);
  const forcedViableCommitments = decisionSteps.filter(
    (step) => step.solutionTakesCommitmentNext && step.forcedViableChoice,
  ).length;
  const forcedOptimalCommitments = decisionSteps.filter(
    (step) => step.solutionTakesCommitmentNext && step.forcedOptimalChoice,
  ).length;

  return {
    ...base,
    compressedRegions: agency.compressedRegionCount,
    solutionCommitments,
    openingCommitments: agency.initialRegion?.commitmentCount,
    openingViable: agency.initialRegion?.viableCommitmentCount,
    openingDead: agency.initialRegion?.deadCommitmentCount,
    openingOptimal: agency.initialRegion?.optimalCommitmentCount,
    forcedViablePrefix: agency.forcedViablePrefixLength ?? 0,
    forcedOptimalPrefix: agency.forcedOptimalPrefixLength ?? 0,
    forcedViableCommitments,
    forcedOptimalCommitments,
    firstWinningRegionStep,
    tailAfterWinningRegionSteps,
    commitmentSteps,
    notes: buildDigestNotes({
      solutionCommitments,
      openingCommitments: agency.initialRegion?.commitmentCount,
      openingViable: agency.initialRegion?.viableCommitmentCount,
      openingDead: agency.initialRegion?.deadCommitmentCount,
      forcedViablePrefix: agency.forcedViablePrefixLength ?? 0,
      forcedOptimalPrefix: agency.forcedOptimalPrefixLength ?? 0,
      tailAfterWinningRegionSteps,
    }),
  };
}

export function formatAgencyDigestMarkdown(digest: AgencyDigest): string[] {
  if (!digest.graphComplete) {
    return [
      `- Status: ${digest.status}`,
      `- Reachable states: ${digest.reachableStates}`,
      "- Digest: unavailable because the graph is incomplete.",
    ];
  }

  return [
    "- Shape: " +
      [
        `states=${digest.reachableStates}`,
        `regions=${digest.compressedRegions ?? "n/a"}`,
        `solution commitments=${digest.solutionCommitments ?? "n/a"}`,
      ].join(", "),
    "- Opening: " +
      [
        `commitments=${digest.openingCommitments ?? "n/a"}`,
        `viable=${digest.openingViable ?? "n/a"}`,
        `dead=${digest.openingDead ?? "n/a"}`,
        `optimal=${digest.openingOptimal ?? "n/a"}`,
      ].join(", "),
    "- Forced chain: " +
      [
        `viable prefix=${formatRatio(digest.forcedViablePrefix, digest.solutionCommitments)}`,
        `optimal prefix=${formatRatio(digest.forcedOptimalPrefix, digest.solutionCommitments)}`,
        `forced viable commitments=${formatRatio(digest.forcedViableCommitments, digest.solutionCommitments)}`,
      ].join(", "),
    "- Endgame tail: " +
      (digest.tailAfterWinningRegionSteps === null
        ? "n/a"
        : `${digest.tailAfterWinningRegionSteps} step(s) after first entering a winning region`),
    `- Reading hints: ${digest.notes.length > 0 ? digest.notes.join("; ") : "none"}`,
    "",
    "### Commitment Digest",
    "",
    ...formatCommitmentDigestTable(digest.commitmentSteps),
  ];
}

export function formatCommitmentDigestTable(steps: AgencyDigestCommitment[]): string[] {
  if (steps.length === 0) {
    return ["No commitment steps were found on the returned solution."];
  }

  return [
    "| After step | From | To | Dist | Viable | Dead | Optimal | Reading |",
    "| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |",
    ...steps.map((step) =>
      [
        step.afterStep,
        formatRegion(step.fromRegion),
        formatRegion(step.toRegion),
        formatNumber(step.distanceToWin),
        formatNumber(step.viableChoices),
        formatNumber(step.deadChoices),
        formatNumber(step.optimalChoices),
        step.reading,
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
  ];
}

function toDigestCommitment(step: AgencyDecisionStep): AgencyDigestCommitment {
  return {
    afterStep: step.step,
    fromRegion: step.regionId,
    toRegion: step.nextSolutionRegionId,
    distanceToWin: step.distanceToWin,
    viableChoices: step.viableCommitmentCount,
    deadChoices: step.deadCommitmentCount,
    optimalChoices: step.optimalCommitmentCount,
    reading: classifyCommitmentStep(step),
  };
}

function classifyCommitmentStep(step: AgencyDecisionStep): string {
  if (step.forcedOptimalChoice) {
    return "forced optimal";
  }
  if (step.forcedViableChoice) {
    return "forced viable";
  }
  if ((step.optimalCommitmentCount ?? 0) > 1) {
    return "multiple optimal choices";
  }
  if ((step.viableCommitmentCount ?? 0) > 1) {
    return "multiple viable choices";
  }
  if ((step.deadCommitmentCount ?? 0) > 0 && (step.viableCommitmentCount ?? 0) === 0) {
    return "only dead commitments";
  }
  return "commitment";
}

function buildDigestNotes(input: {
  solutionCommitments: number;
  openingCommitments?: number;
  openingViable?: number;
  openingDead?: number;
  forcedViablePrefix: number;
  forcedOptimalPrefix: number;
  tailAfterWinningRegionSteps: number | null;
}): string[] {
  const notes: string[] = [];
  if (input.solutionCommitments <= 1) {
    notes.push("near-discovery shape");
  }
  if (
    (input.openingCommitments ?? 0) > 1 &&
    input.openingViable === 1 &&
    (input.openingDead ?? 0) > 0
  ) {
    notes.push("opening has apparent branches but only one viable progress");
  }
  if (input.solutionCommitments > 0 && input.forcedViablePrefix === input.solutionCommitments) {
    notes.push("all solution commitments are forced viable progress");
  } else if (input.forcedViablePrefix > 0) {
    notes.push(`first ${input.forcedViablePrefix} commitment(s) are forced viable progress`);
  }
  if (input.solutionCommitments > 0 && input.forcedOptimalPrefix === input.solutionCommitments) {
    notes.push("all solution commitments are forced optimal progress");
  }
  if ((input.tailAfterWinningRegionSteps ?? 0) >= 3) {
    notes.push(`${input.tailAfterWinningRegionSteps} trailing step(s) after entering a winning region`);
  }
  return notes;
}

function formatRatio(value: number | undefined, total: number | undefined): string {
  return `${value ?? "n/a"}/${total ?? "n/a"}`;
}

function formatRegion(value: number | null | undefined): string {
  return value === null || value === undefined ? "n/a" : `r${value}`;
}

function formatNumber(value: number | null | undefined): string {
  return value === null || value === undefined ? "n/a" : String(value);
}
