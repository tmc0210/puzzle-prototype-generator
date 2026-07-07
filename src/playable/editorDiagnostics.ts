import { analyzeAgencyWithRuntime, type AgencyDecisionStep } from "../core/agencyAnalyzer.js";
import { solveWithRuntime } from "../core/solver.js";
import type { InputId, LevelDoc, PrototypePackage } from "../core/types.js";
import {
  getRuntimeAdapter,
  renderVisualStateWithFallback,
  type CurrentRuntimeAdapter,
  type VisualBoard,
} from "../prototypes/runtimeAdapter.js";

export type EditorDiagnoseRequest = {
  level: LevelDoc;
  solverMaxStates?: number;
  solverMaxDepth?: number;
  graphMaxStates?: number;
  graphMaxTransitions?: number;
};

export type EditorDiagnosticSnapshot = {
  step: number;
  ascii: string;
  visual: VisualBoard;
  input: string | null;
  events: string[];
  viableExitCount: number | null;
  optimalExitCount: number | null;
  deadExitCount: number | null;
};

export type EditorDiagnoseResult = {
  validation: {
    ok: boolean;
    errors: string[];
  };
  solution: {
    found: boolean;
    inputs: string[];
    events: string[];
    cost: number | null;
    exploredStates: number;
    searchStatus?: string;
    reason?: string;
  };
  uniqueness: {
    status: "invalid" | "unsolved" | "core_unique" | "branching" | "unknown";
    label: string;
    reason?: string;
    reachableStateCount?: number;
    legalTransitionCount?: number;
    sccCount?: number;
    solutionIrreversibleStepCount?: number;
    forcedWinContinuationPrefixLength?: number;
    snapshots: EditorDiagnosticSnapshot[];
  };
};

export function diagnoseEditorLevel(
  prototype: PrototypePackage,
  request: EditorDiagnoseRequest,
): EditorDiagnoseResult {
  const adapter = getRuntimeAdapter(prototype.mechanic);
  const validation = adapter.editor?.validateLevel(request.level, prototype.mechanic) ??
    validateByParse(adapter, request.level);
  const emptySolution = {
    found: false,
    inputs: [],
    events: [],
    cost: null,
    exploredStates: 0,
  };

  if (!validation.ok) {
    return {
      validation,
      solution: emptySolution,
      uniqueness: {
        status: "invalid",
        label: "布局无效",
        reason: validation.errors.join("; "),
        snapshots: [],
      },
    };
  }

  const initialState = adapter.parseLevel(request.level);
  const runtime = adapter.createRuntime(prototype.mechanic);
  const solverOptions = {
    winCondition: request.level.win ?? prototype.mechanic.win,
    maxStates: request.solverMaxStates ?? 100_000,
    maxDepth: request.solverMaxDepth ?? 200,
  };
  const solution = solveWithRuntime(runtime, initialState, solverOptions);
  const solutionSummary = {
    found: solution.found,
    inputs: solution.inputs,
    events: solution.events,
    cost: Number.isFinite(solution.cost) ? solution.cost : null,
    exploredStates: solution.exploredStates,
    searchStatus: solution.searchStatus,
    reason: solution.reason,
  };

  if (!solution.found) {
    return {
      validation,
      solution: solutionSummary,
      uniqueness: {
        status: "unsolved",
        label: "不可解",
        reason: solution.reason ?? "solver 没找到胜路",
        snapshots: [],
      },
    };
  }

  try {
    const analysis = analyzeAgencyWithRuntime(runtime, initialState, solution, {
      ...solverOptions,
      maxStates: request.graphMaxStates ?? 20_000,
      maxTransitions: request.graphMaxTransitions ?? 100_000,
    });
    const snapshots = buildDecisionSnapshots(
      prototype,
      adapter,
      request.level,
      initialState,
      solution.inputs,
      branchDecisionSteps(analysis.decisionSteps ?? []),
    );

    if (analysis.status !== "complete" || !analysis.scc) {
      return {
        validation,
        solution: solutionSummary,
        uniqueness: {
          status: "unknown",
          label: "未知",
          reason: analysis.reason ?? "图预算耗尽或 analyzer 不可用",
          reachableStateCount: analysis.reachableStateCount,
          legalTransitionCount: analysis.legalTransitionCount,
          snapshots,
        },
      };
    }

    const scc = analysis.scc;
    const coreUnique =
      scc.winSubgraphShape === "one_win_continuation_per_scc" &&
      scc.forcedWinContinuationPrefixLength >= scc.solutionIrreversibleStepCount;
    return {
      validation,
      solution: solutionSummary,
      uniqueness: {
        status: coreUnique ? "core_unique" : "branching",
        label: coreUnique ? "核心胜路唯一" : "存在可胜分叉",
        reason: coreUnique
          ? "SCC 胜路子图没有可胜分叉"
          : "SCC 胜路子图存在多个可胜 continuation 或 merge",
        reachableStateCount: analysis.reachableStateCount,
        legalTransitionCount: analysis.legalTransitionCount,
        sccCount: scc.sccCount,
        solutionIrreversibleStepCount: scc.solutionIrreversibleStepCount,
        forcedWinContinuationPrefixLength: scc.forcedWinContinuationPrefixLength,
        snapshots,
      },
    };
  } catch (error) {
    return {
      validation,
      solution: solutionSummary,
      uniqueness: {
        status: "unknown",
        label: "未知",
        reason: error instanceof Error ? error.message : String(error),
        snapshots: [],
      },
    };
  }
}

function validateByParse(adapter: CurrentRuntimeAdapter, level: LevelDoc): { ok: boolean; errors: string[] } {
  try {
    adapter.parseLevel(level);
    return { ok: true, errors: [] };
  } catch (error) {
    return { ok: false, errors: [error instanceof Error ? error.message : String(error)] };
  }
}

function branchDecisionSteps(steps: AgencyDecisionStep[]): AgencyDecisionStep[] {
  return steps
    .filter((step) =>
      step.solutionTakesCommitmentNext &&
      ((step.viableCommitmentCount ?? 0) > 1 ||
        (step.optimalCommitmentCount ?? 0) > 1 ||
        (step.deadCommitmentCount ?? 0) > 0 ||
        step.forcedViableChoice === false ||
        step.forcedOptimalChoice === false),
    )
    .slice(0, 3);
}

function buildDecisionSnapshots(
  prototype: PrototypePackage,
  adapter: CurrentRuntimeAdapter,
  level: LevelDoc,
  initialState: any,
  inputs: InputId[],
  decisions: AgencyDecisionStep[],
): EditorDiagnosticSnapshot[] {
  if (decisions.length === 0) {
    return [];
  }
  const beforeStates: any[] = [initialState];
  let current = initialState;
  const options = { winCondition: level.win ?? prototype.mechanic.win };
  for (const input of inputs) {
    const result = adapter.step(prototype.mechanic, current, input, options);
    if (result.legal) {
      current = result.state;
    }
    beforeStates.push(current);
  }

  return decisions.map((decision) => {
    const step = Math.max(0, Math.min(decision.step, beforeStates.length - 1));
    const state = beforeStates[step] ?? initialState;
    return {
      step,
      ascii: adapter.renderState(state),
      visual: renderVisualStateWithFallback(adapter, prototype.mechanic, state),
      input: decision.input ?? inputs[step] ?? null,
      events: decision.events,
      viableExitCount: decision.viableCommitmentCount,
      optimalExitCount: decision.optimalCommitmentCount,
      deadExitCount: decision.deadCommitmentCount,
    };
  });
}
