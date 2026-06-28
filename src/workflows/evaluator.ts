import type {
  CounterfactualEvaluation,
  EvaluationResult,
  InputId,
  KnowledgeItem,
  LevelDoc,
  MechanicDoc,
  MetricResult,
  SolverContractEvaluation,
  SolverContractMetric,
  SolverEvidenceId,
  TargetEvaluation,
  WinCondition,
} from "../core/types.js";
import { analyzeGraphWithRuntime } from "../core/graphAnalyzer.js";
import {
  counterfactualOptions,
  findUncoveredGoalPathWithRuntime,
  solveWithRuntime,
} from "../core/solver.js";
import type { PrototypePackage } from "../core/types.js";
import { coversEventPatterns, eventsMatchPattern } from "../core/events.js";
import { getRuntimeAdapter, type CurrentRuntimeAdapter } from "../prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type ExpectedTraceReplay = {
  events: string[];
  metric: SolverContractMetric;
};

export function evaluatePackage(pkg: PrototypePackage): EvaluationResult[] {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  return pkg.levels.levels.map((level) => {
    const initial = adapter.parseLevel(level);
    const winCondition = level.win ?? pkg.mechanic.win;
    const solution = solveWithRuntime(runtime, initial, { winCondition });
    const graphAnalysis = analyzeGraphWithRuntime(runtime, initial, {
      winCondition,
      maxStates: 100_000,
    });
    const expectedTraceReplay = replayExpectedTrace(
      adapter,
      pkg.mechanic,
      initial,
      level,
      winCondition,
    );
    const probeEvents = expectedTraceReplay.events;
    const targetResults = level.targets.map((targetId) => {
      const target = evaluateTarget(
        pkg.knowledge.knowledge,
        targetId,
        solution.found,
        solution.events,
        probeEvents,
      );
      if (solution.found && target.observations.shortestSolutionCovers) {
        const shortestBypass = findUncoveredGoalPathWithRuntime(
          runtime,
          initial,
          target.requiredEvents,
          target.forbiddenEvents,
          { winCondition },
          solution.cost,
        );
        const allShortestMetric = metricFromBypassSearch({
          id: "all_shortest_solutions_cover_target_events",
          bypass: shortestBypass,
          passEvidence: "optimal",
          passReason: "No shortest winning path bypasses the target event constraint.",
          failReason: `A shortest bypass exists at cost ${shortestBypass.cost}.`,
        });
        target.metrics.push(allShortestMetric);
        target.bypassCost = shortestBypass.found ? shortestBypass.cost : undefined;

        if (shortestBypass.found) {
          target.metrics.push({
            id: "all_winning_paths_cover_target_events",
            status: "fail",
            evidence: "full_graph",
            reason: `A winning bypass exists at cost ${shortestBypass.cost}.`,
          });
        } else {
          const fullBypass = findUncoveredGoalPathWithRuntime(
            runtime,
            initial,
            target.requiredEvents,
            target.forbiddenEvents,
            { winCondition, maxStates: 100_000 },
          );
          target.metrics.push(
            metricFromBypassSearch({
              id: "all_winning_paths_cover_target_events",
              bypass: fullBypass,
              passEvidence: "full_graph",
              passReason: "Complete product graph has no winning bypass.",
              failReason: `A winning bypass exists at cost ${fullBypass.cost}.`,
            }),
          );
          target.bypassCost = fullBypass.found ? fullBypass.cost : target.bypassCost;
        }
      } else {
        target.metrics.push({
          id: "all_shortest_solutions_cover_target_events",
          status: "unknown",
          evidence: "unknown",
          reason: solution.found
            ? "Returned winning solution does not satisfy the target event constraint; shortest-path universality was not checked."
            : "No winning solution was found.",
        });
        target.metrics.push({
          id: "all_winning_paths_cover_target_events",
          status: solution.found ? "fail" : "unknown",
          evidence: solution.found ? "trace" : "unknown",
          reason: solution.found
            ? "A returned winning solution bypasses the target event constraint."
            : "No winning solution was found.",
        });
      }
      target.acceptance = acceptanceMetric(target.metrics);
      return target;
    });

    const counterfactuals = level.targets.map((targetId) =>
      evaluateCounterfactual(
        adapter,
        pkg.mechanic,
        pkg.knowledge.knowledge,
        targetId,
        initial,
        winCondition,
      ),
    );

    const levelMetrics = evaluateLevelMetrics({
      level,
      playerWinStandard: pkg.mechanic.win,
      winCondition,
      solutionFound: solution.found,
      solutionSearchStatus: solution.searchStatus,
      solutionReason: solution.reason,
      graphAnalysis,
      expectedTraceReplay,
    });
    const solverContract = evaluateSolverContract(
      level.expected_solver_evidence,
      levelMetrics,
      targetResults,
      counterfactuals,
    );
    const notes: string[] = [];
    if (!solution.found) {
      notes.push(solution.reason ?? "No solution found");
    }
    if (graphAnalysis.status === "exhausted") {
      notes.push(
        `Full graph analysis exhausted budget at ${graphAnalysis.reachableStateCount} states`,
      );
    }

    for (const metric of solverContract.metrics) {
      if (metric.status !== "pass") {
        const scope = metric.knowledgeId ? `${metric.evidenceId}/${metric.knowledgeId}` : metric.evidenceId;
        notes.push(
          `Solver contract ${scope} is ${metric.status}: ${metric.reason ?? "No reason provided."}`,
        );
      }
    }

    return {
      levelId: level.id,
      title: level.title,
      solvable: solution.found,
      shortestCost: solution.found ? solution.cost : undefined,
      solutionInputs: solution.inputs,
      solutionEvents: solution.events,
      probeEvents,
      exploredStates: solution.exploredStates,
      graphAnalysis,
      targetResults,
      counterfactuals,
      solverContract,
      status: solverContract.status,
      notes,
    };
  });
}

function replayExpectedTrace(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  initial: RuntimeState,
  level: LevelDoc,
  winCondition: WinCondition,
): ExpectedTraceReplay {
  if (!level.expected_trace || level.expected_trace.length === 0) {
    return {
      events: [],
      metric: {
        id: "expected_trace_replays",
        evidenceId: "expected_trace_replays",
        status: "unknown",
        evidence: "unknown",
        reason: "No expected trace was provided.",
      },
    };
  }

  let state = initial;
  const events: string[] = [];
  const mismatches: string[] = [];
  for (const [index, expectedStep] of level.expected_trace.entries()) {
    const input = expectedStep.input as InputId;
    const result = adapter.step(mechanic, state, input, { winCondition });
    events.push(...result.events);

    if (result.reason === "unsupported_input") {
      mismatches.push(`step ${index + 1} input '${expectedStep.input}' is unsupported`);
    }

    const missingEvents = (expectedStep.events ?? []).filter(
      (event) => !eventsMatchPattern(result.events, event),
    );
    if (missingEvents.length > 0) {
      mismatches.push(`step ${index + 1} missing events ${missingEvents.join(", ")}`);
    }

    if (result.legal) {
      state = result.state;
    }
  }

  return {
    events,
    metric: {
      id: "expected_trace_replays",
      evidenceId: "expected_trace_replays",
      status: mismatches.length === 0 ? "pass" : "fail",
      evidence: "trace",
      reason:
        mismatches.length === 0
          ? "Expected trace replayed and matched declared per-step events."
          : mismatches.join("; "),
    },
  };
}

function evaluateLevelMetrics({
  level,
  playerWinStandard,
  winCondition,
  solutionFound,
  solutionSearchStatus,
  solutionReason,
  graphAnalysis,
  expectedTraceReplay,
}: {
  level: LevelDoc;
  playerWinStandard: WinCondition;
  winCondition: WinCondition;
  solutionFound: boolean;
  solutionSearchStatus?: string;
  solutionReason?: string;
  graphAnalysis: NonNullable<EvaluationResult["graphAnalysis"]>;
  expectedTraceReplay: ExpectedTraceReplay;
}): SolverContractMetric[] {
  return [
    {
      id: "solvable",
      evidenceId: "solvable",
      status: solutionFound ? "pass" : solutionSearchStatus === "complete" ? "fail" : "unknown",
      evidence: solutionFound ? "optimal" : solutionSearchStatus === "complete" ? "full_graph" : "unknown",
      reason: solutionFound
        ? "Solver found a winning path."
        : solutionReason ?? "No winning path was found.",
    },
    {
      id: "player_win_standard",
      evidenceId: "player_win_standard",
      status: winCondition.type === playerWinStandard.type ? "pass" : "fail",
      evidence: "static",
      reason:
        winCondition.type === playerWinStandard.type
          ? `Level uses player-facing win standard '${playerWinStandard.type}'.`
          : `Level win type '${winCondition.type}' differs from player-facing standard '${playerWinStandard.type}'.`,
    },
    expectedTraceReplay.metric,
    {
      id: "full_graph_complete",
      evidenceId: "full_graph_complete",
      status: graphAnalysis.status === "complete" ? "pass" : "unknown",
      evidence: graphAnalysis.status === "complete" ? "full_graph" : "unknown",
      reason:
        graphAnalysis.status === "complete"
          ? `Reachable graph completed with ${graphAnalysis.reachableStateCount} states.`
          : graphAnalysis.reason ?? "Full graph analysis exhausted its budget.",
    },
  ];
}

function evaluateSolverContract(
  expected: SolverEvidenceId[],
  levelMetrics: SolverContractMetric[],
  targetResults: TargetEvaluation[],
  counterfactuals: CounterfactualEvaluation[],
): SolverContractEvaluation {
  const metrics = expected.flatMap((evidenceId) =>
    contractMetricsForEvidence(evidenceId, levelMetrics, targetResults, counterfactuals),
  );
  const status = metrics.some((metric) => metric.status === "fail")
    ? "fail"
    : metrics.some((metric) => metric.status === "unknown")
      ? "warning"
      : "pass";
  return { expected, metrics, status };
}

function contractMetricsForEvidence(
  evidenceId: SolverEvidenceId,
  levelMetrics: SolverContractMetric[],
  targetResults: TargetEvaluation[],
  counterfactuals: CounterfactualEvaluation[],
): SolverContractMetric[] {
  if (evidenceId === "counterfactual_unsolvable") {
    return counterfactuals.map((counterfactual) => ({
      ...counterfactual.metric,
      id: `${evidenceId}:${counterfactual.knowledgeId}`,
      evidenceId,
      knowledgeId: counterfactual.knowledgeId,
    }));
  }

  if (isTargetEvidence(evidenceId)) {
    return targetResults.map((target) => {
      const metric = target.metrics.find((candidate) => candidate.id === evidenceId);
      return {
        ...(metric ?? {
          id: evidenceId,
          status: "unknown" as const,
          evidence: "unknown" as const,
          reason: `Target metric '${evidenceId}' was not computed.`,
        }),
        id: `${evidenceId}:${target.knowledgeId}`,
        evidenceId,
        knowledgeId: target.knowledgeId,
      };
    });
  }

  const metric = levelMetrics.find((candidate) => candidate.evidenceId === evidenceId);
  if (metric) {
    return [metric];
  }

  return [
    {
      id: evidenceId,
      evidenceId,
      status: "unknown",
      evidence: "unknown",
      reason: `Level metric '${evidenceId}' was not computed.`,
    },
  ];
}

function isTargetEvidence(evidenceId: SolverEvidenceId): boolean {
  return [
    "target_event_detector_configured",
    "returned_solution_covers_target_events",
    "expected_trace_covers_target_events",
    "all_shortest_solutions_cover_target_events",
    "all_winning_paths_cover_target_events",
  ].includes(evidenceId);
}

function evaluateTarget(
  knowledge: KnowledgeItem[],
  targetId: string,
  solutionFound: boolean,
  solutionEvents: string[],
  probeEvents: string[],
): TargetEvaluation {
  const item = knowledge.find((candidate) => candidate.id === targetId);
  if (!item) {
    return {
      knowledgeId: targetId,
      requiredEvents: [],
      forbiddenEvents: [],
      observations: {
        shortestSolutionCovers: false,
        probeTraceCovers: false,
        basis: "none",
      },
      metrics: [
        {
          id: "target_event_detector_configured",
          status: "fail",
          evidence: "static",
          reason: "Knowledge item is missing.",
        },
      ],
      acceptance: {
        id: "target_acceptance",
        status: "fail",
        evidence: "static",
        reason: "Knowledge item is missing.",
      },
    };
  }

  const requiredEvents = item.detector.required_events ?? [];
  const forbiddenEvents = item.detector.forbidden_events ?? [];
  const solutionCovered = coversEventPatterns(solutionEvents, requiredEvents, forbiddenEvents);
  const probeCovered = coversEventPatterns(probeEvents, requiredEvents, forbiddenEvents);
  const basis =
    solutionCovered && probeCovered
      ? "solution_and_probe"
      : solutionCovered
        ? "solution"
        : probeCovered
          ? "probe"
          : "none";
  const hasEventConstraint = requiredEvents.length > 0 || forbiddenEvents.length > 0;
  const metrics: MetricResult[] = [
    {
      id: "target_event_detector_configured",
      status: hasEventConstraint ? "pass" : "fail",
      evidence: "static",
      reason: hasEventConstraint
        ? "Knowledge declares an executable event constraint."
        : "Knowledge has no required or forbidden event constraint.",
    },
    {
      id: "returned_solution_covers_target_events",
      status: !solutionFound ? "unknown" : solutionCovered ? "pass" : "fail",
      evidence: solutionFound ? "trace" : "unknown",
      reason: !solutionFound
        ? "No winning solution was found."
        : solutionCovered
          ? "Returned winning solution satisfies the target event constraint."
          : "Returned winning solution does not satisfy the target event constraint.",
    },
    {
      id: "expected_trace_covers_target_events",
      status: probeEvents.length === 0 ? "unknown" : probeCovered ? "pass" : "fail",
      evidence: probeEvents.length === 0 ? "unknown" : "trace",
      reason:
        probeEvents.length === 0
          ? "No expected trace was provided."
          : probeCovered
            ? "Expected trace satisfies the target event constraint."
            : "Expected trace does not satisfy the target event constraint.",
    },
  ];

  return {
    knowledgeId: targetId,
    requiredEvents,
    forbiddenEvents,
    observations: {
      shortestSolutionCovers: solutionCovered,
      probeTraceCovers: probeCovered,
      basis,
    },
    metrics,
    acceptance: {
      id: "target_acceptance",
      status: "unknown",
      evidence: "unknown",
      reason: "Path necessity metrics have not been computed.",
    },
  };
}

function metricFromBypassSearch({
  id,
  bypass,
  passEvidence,
  passReason,
  failReason,
}: {
  id: string;
  bypass: { found: boolean; cost: number; searchStatus?: string; reason?: string };
  passEvidence: "optimal" | "full_graph";
  passReason: string;
  failReason: string;
}): MetricResult {
  if (bypass.found) {
    return {
      id,
      status: "fail",
      evidence: passEvidence,
      reason: failReason,
    };
  }

  if (bypass.searchStatus === "complete") {
    return {
      id,
      status: "pass",
      evidence: passEvidence,
      reason: passReason,
    };
  }

  return {
    id,
    status: "unknown",
    evidence: "unknown",
    reason: bypass.reason ?? "Search did not complete.",
  };
}

function acceptanceMetric(metrics: MetricResult[]): MetricResult {
  const detector = metrics.find((metric) => metric.id === "target_event_detector_configured");
  const allWinning = metrics.find(
    (metric) => metric.id === "all_winning_paths_cover_target_events",
  );

  if (detector?.status === "fail") {
    return {
      id: "target_acceptance",
      status: "fail",
      evidence: detector.evidence,
      reason: detector.reason,
    };
  }

  if (allWinning?.status === "pass" && allWinning.evidence === "full_graph") {
    return {
      id: "target_acceptance",
      status: "pass",
      evidence: "full_graph",
      reason: "Every winning path in the complete product graph satisfies the target event constraint.",
    };
  }

  if (allWinning?.status === "fail") {
    return {
      id: "target_acceptance",
      status: "fail",
      evidence: allWinning.evidence,
      reason: allWinning.reason,
    };
  }

  return {
    id: "target_acceptance",
    status: "unknown",
    evidence: "unknown",
    reason: allWinning?.reason ?? "Full product graph proof is missing.",
  };
}

function evaluateCounterfactual(
  adapter: CurrentRuntimeAdapter,
  mechanic: MechanicDoc,
  knowledge: KnowledgeItem[],
  targetId: string,
  initial: RuntimeState,
  winCondition: MechanicDoc["win"],
): CounterfactualEvaluation {
  const item = knowledge.find((candidate) => candidate.id === targetId);
  const model = item?.counterfactual?.model;
  if (!model || !mechanic.counterfactuals?.[model]) {
    return {
      knowledgeId: targetId,
      model,
      checked: false,
      metric: {
        id: "counterfactual_unsolvable",
        status: "unknown",
        evidence: "unknown",
        reason: model
          ? "Counterfactual model is not defined in mechanic."
          : "No counterfactual model configured.",
      },
      notes: model
        ? "Counterfactual model is not defined in mechanic"
        : "No counterfactual model configured",
    };
  }

  const options = counterfactualOptions(mechanic, model, {
    winCondition,
    maxStates: 100_000,
  });
  const cfSolution = solveWithRuntime(adapter.createRuntime(mechanic), initial, options);
  const metric: MetricResult = cfSolution.found
    ? {
        id: "counterfactual_unsolvable",
        status: "fail",
        evidence: "trace",
        reason: "Counterfactual variant remains solvable.",
      }
    : cfSolution.searchStatus === "complete"
      ? {
          id: "counterfactual_unsolvable",
          status: "pass",
          evidence: "full_graph",
          reason: "Counterfactual variant has no winning path in complete search.",
        }
      : {
          id: "counterfactual_unsolvable",
          status: "unknown",
          evidence: "unknown",
          reason: cfSolution.reason ?? "Counterfactual search did not complete.",
        };

  return {
    knowledgeId: targetId,
    model,
    checked: true,
    solvable: cfSolution.found,
    exploredStates: cfSolution.exploredStates,
    metric,
    notes: metric.reason,
  };
}

export function summarizeEvaluation(results: EvaluationResult[]): string {
  const lines: string[] = [];
  for (const result of results) {
    const cost = result.shortestCost === undefined ? "n/a" : String(result.shortestCost);
    lines.push(
      `${result.levelId} ${result.status.toUpperCase()} solvable=${result.solvable} cost=${cost} explored=${result.exploredStates}`,
    );
    for (const note of result.notes) {
      lines.push(`  - ${note}`);
    }
  }
  return lines.join("\n");
}
