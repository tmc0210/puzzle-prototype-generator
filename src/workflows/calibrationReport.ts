import { readFile } from "node:fs/promises";
import path from "node:path";
import { buildAgencyDigest, type AgencyDigest } from "../core/agencyDigest.js";
import { analyzeLevel, type LevelAnalysis } from "./levelAnalyzer.js";
import type { LevelDoc, PrototypePackage } from "../core/types.js";

export type CalibrationSample = {
  id: string;
  label: string;
  userJudgment: string;
};

export const defaultCalibrationSamples: CalibrationSample[] = [
  {
    id: "hard_chain_trim4",
    label: "Hard chain, trimmed",
    userJudgment: "Positive: compact hard-chain candidate; remove only obvious redundancy.",
  },
  {
    id: "coupled_pull_d_blocks_b_trim1",
    label: "Coupled portal latch",
    userJudgment: "Positive/mixed: beautiful coupled chain, but player-facing agency may be low.",
  },
  {
    id: "two_crate_participation_candidate",
    label: "Two-crate participation",
    userJudgment: "Positive/mixed: strong structure; late pull tail may feel incidental.",
  },
  {
    id: "directional_pull_challenge",
    label: "Directional pull challenge",
    userJudgment: "Positive: complex chain candidate with good structure.",
  },
  {
    id: "stress_v3_distinct_medium_combination_try3",
    label: "Medium combination",
    userJudgment: "Mixed: useful combination candidate, but compare for reuse/linearity.",
  },
  {
    id: "two_crate_two_lock_chain_try3",
    label: "Two independent locks",
    userJudgment: "Negative/mixed: mechanically valid, but two locks are too independently repeated.",
  },
  {
    id: "stress_v3_true_fallback_application",
    label: "Fallback application attempt",
    userJudgment: "Negative: reads more like discovery than application.",
  },
];

type CalibrationRow = {
  sample: CalibrationSample;
  analysis: LevelAnalysis;
  digest: AgencyDigest;
};

export async function formatCalibrationReport(
  pkg: PrototypePackage,
  samples: CalibrationSample[] = defaultCalibrationSamples,
): Promise<string> {
  const rows: CalibrationRow[] = [];
  for (const sample of samples) {
    const layout = await readLayoutFromPriorReport(pkg.root, sample.id);
    const level = makeScratchLevel(sample, layout);
    const analysis = analyzeLevel(pkg, level);
    rows.push({ sample, analysis, digest: buildAgencyDigest(analysis.agency) });
  }

  const lines = [
    "# Agency Calibration Report 01",
    "",
    "Purpose: compare graph-derived agency facts against prior human puzzle-design judgments. This is calibration evidence, not a scoring formula.",
    "",
    "## Overview",
    "",
    ...formatOverviewTable(rows),
    "",
    "## Reading Hints",
    "",
    "- Raw/SCC means reachable raw states versus strongly connected components.",
    "- SCC edges are irreversible transitions between mutually reachable state regions.",
    "- `one_win_continuation_per_scc` is topology metadata: each relevant win-reaching SCC has one win-reaching continuation.",
    "- `branching_win_dag` means at least one SCC has multiple win-reaching irreversible continuations or merge paths; this is evidence to inspect, not an automatic failure.",
    "- Initial `out/win/dead` means irreversible exits from the initial SCC, exits that can still reach a win, and exits that cannot.",
    "- Tail means inputs after first entering an SCC that already contains a winning state.",
    "- The bidirectional commitment digest below is retained as auxiliary evidence; SCC rows are the primary graph view.",
    "",
    "## Per-Sample Details",
    "",
    ...rows.flatMap(formatSampleDetails),
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

async function readLayoutFromPriorReport(root: string, sampleId: string): Promise<string> {
  const reportPath = path.join(root, "reports", `layout_analysis_${sampleId}.md`);
  const markdown = await readFile(reportPath, "utf8");
  const headingIndex = markdown.indexOf("## Initial State");
  if (headingIndex === -1) {
    throw new Error(`Could not find Initial State heading in ${reportPath}`);
  }

  const fenceStart = markdown.indexOf("```text", headingIndex);
  if (fenceStart === -1) {
    throw new Error(`Could not find Initial State text fence in ${reportPath}`);
  }

  const contentStart = markdown.indexOf("\n", fenceStart);
  const fenceEnd = markdown.indexOf("```", contentStart + 1);
  if (contentStart === -1 || fenceEnd === -1) {
    throw new Error(`Malformed Initial State fence in ${reportPath}`);
  }

  return markdown.slice(contentStart + 1, fenceEnd).replace(/\r/g, "").replace(/\n+$/g, "");
}

function makeScratchLevel(sample: CalibrationSample, layout: string): LevelDoc {
  return {
    id: sample.id,
    title: sample.label,
    role: "challenge",
    status: "calibration",
    targets: [],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable", "full_graph_complete"],
    expected_llm_player_evidence: [],
    layout,
  };
}

function formatOverviewTable(rows: CalibrationRow[]): string[] {
  return [
    "| Sample | Prior judgment | Graph size raw/scc | Irrev steps | Win-cont prefix | Initial out/win/dead | Win branch/merge SCCs | Tail | Reading hints |",
    "| --- | --- | ---: | ---: | --- | --- | --- | ---: | --- |",
    ...rows.map((row) =>
      [
        row.sample.id,
        escapeCell(row.sample.userJudgment),
        formatSccGraphSize(row),
        row.analysis.agency.scc?.solutionIrreversibleStepCount ?? "n/a",
        formatSccForcedPrefix(row),
        formatInitialSccOut(row),
        formatWinBranchMerge(row),
        formatSccTail(row),
        escapeCell(formatSccReadingHints(row).join("; ") || "none"),
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
  ];
}

function formatSampleDetails(row: CalibrationRow): string[] {
  const scc = row.analysis.agency.scc;
  return [
    `### ${row.sample.id}`,
    "",
    `- Prior judgment: ${row.sample.userJudgment}`,
    `- Solver: ${row.analysis.solution.found ? `solved cost=${row.analysis.solution.cost}` : "unsolved"}`,
    `- Events: ${formatEventCounts(row.analysis.solution.eventCounts)}`,
    `- SCC topology: ${scc ? `${scc.sccCount} SCCs, ${scc.sccEdgeCount} edges, winBranching=${scc.winContinuationBranchingSccCount}, winMerging=${scc.winContinuationMergingSccCount}, irreversible steps=${scc.solutionIrreversibleStepCount}` : "n/a"}`,
    `- SCC reading hints: ${formatSccReadingHints(row).join("; ") || "none"}`,
    "",
    "Layout:",
    "",
    codeBlock(row.analysis.initialState),
    "",
    "SCC irreversible path:",
    "",
    ...formatSccRows(row),
    "",
    "Bidirectional commitment digest:",
    "",
    ...formatCommitmentRows(row.digest),
    "",
  ];
}

function formatSccRows(row: CalibrationRow): string[] {
  const scc = row.analysis.agency.scc;
  if (!scc) {
    return ["No SCC condensation was available."];
  }

  return [
    "| SCC | Step | Dist | States | Out/win/dead | Next | Forced win |",
    "| --- | ---: | ---: | ---: | --- | --- | --- |",
    ...scc.solutionPathBranches.map((branch) =>
      [
        `s${branch.sccId}`,
        branch.enteredAtStep ?? "n/a",
        branch.distanceToWin ?? "n/a",
        branch.stateCount,
        `${branch.outgoingCount}/${branch.winReachableOutgoingCount}/${branch.deadOutgoingCount}`,
        branch.solutionNextSccId === null ? "win/end" : `s${branch.solutionNextSccId}`,
        branch.forcedWinContinuation ? "yes" : "no",
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
  ];
}

function formatCommitmentRows(digest: AgencyDigest): string[] {
  if (digest.commitmentSteps.length === 0) {
    return ["No commitment steps were found on the returned solution."];
  }

  return [
    "| After step | From -> To | Dist | Choices v/d/o | Reading |",
    "| ---: | --- | ---: | --- | --- |",
    ...digest.commitmentSteps.map((step) =>
      [
        step.afterStep,
        `${formatRegion(step.fromRegion)} -> ${formatRegion(step.toRegion)}`,
        step.distanceToWin ?? "n/a",
        `${step.viableChoices ?? "n/a"}/${step.deadChoices ?? "n/a"}/${step.optimalChoices ?? "n/a"}`,
        step.reading,
      ]
        .join(" | ")
        .replace(/^/, "| ")
        .replace(/$/, " |"),
    ),
  ];
}

function formatSccGraphSize(row: CalibrationRow): string {
  return `${row.analysis.graph.reachableStateCount}/${row.analysis.agency.scc?.sccCount ?? "n/a"}`;
}

function formatSccForcedPrefix(row: CalibrationRow): string {
  const scc = row.analysis.agency.scc;
  if (!scc) {
    return "n/a";
  }
  return `${scc.forcedWinContinuationPrefixLength}/${scc.solutionIrreversibleStepCount}`;
}

function formatInitialSccOut(row: CalibrationRow): string {
  const initial = row.analysis.agency.scc?.initialScc;
  if (!initial) {
    return "n/a";
  }
  return `${initial.outgoingCount}/${initial.winReachableOutgoingCount}/${initial.deadOutgoingCount}`;
}

function formatWinBranchMerge(row: CalibrationRow): string {
  const scc = row.analysis.agency.scc;
  if (!scc) {
    return "n/a";
  }
  return `${scc.winContinuationBranchingSccCount}/${scc.winContinuationMergingSccCount}`;
}

function formatSccTail(row: CalibrationRow): string | number {
  const winningEntry = row.analysis.agency.scc?.solutionPathBranches.find((branch) => branch.isWinning);
  if (!winningEntry || winningEntry.enteredAtStep === undefined || !row.analysis.solution.found) {
    return "n/a";
  }
  return Math.max(0, row.analysis.solution.inputs.length - winningEntry.enteredAtStep);
}

function formatSccReadingHints(row: CalibrationRow): string[] {
  const scc = row.analysis.agency.scc;
  if (!scc) {
    return ["SCC unavailable"];
  }

  const hints: string[] = [];
  if (scc.solutionIrreversibleStepCount <= 1) {
    hints.push("near-discovery irreversible shape");
  }
  if (scc.winContinuationBranchingSccCount > 0) {
    hints.push(`${scc.winContinuationBranchingSccCount} SCC(s) with multiple win continuations`);
  }
  if (scc.winContinuationMergingSccCount > 0) {
    hints.push(`${scc.winContinuationMergingSccCount} win-reaching merge SCC(s)`);
  }
  if (scc.initialScc.deadOutgoingCount > 0) {
    hints.push(`initial SCC has ${scc.initialScc.deadOutgoingCount} irreversible dead branch(es)`);
  }
  const tail = formatSccTail(row);
  if (typeof tail === "number" && tail >= 3) {
    hints.push(`${tail} trailing step(s) after entering winning SCC`);
  }
  return hints;
}

function formatRegion(value: number | null | undefined): string {
  return value === null || value === undefined ? "n/a" : `r${value}`;
}

function formatEventCounts(counts: Record<string, number>): string {
  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return "none";
  }
  return entries.map(([event, count]) => `${event}=${count}`).join(", ");
}

function codeBlock(text: string): string {
  return `\`\`\`text\n${text}\n\`\`\``;
}

function escapeCell(text: string): string {
  return text.replaceAll("|", "\\|");
}
