import type {
  EvaluationResult,
  InputId,
  LevelDoc,
  MechanicDoc,
  PrototypePackage,
  WinCondition,
} from "../core/types.js";
import { analyzeGraphWithRuntime } from "../core/graphAnalyzer.js";
import { eventsMatchPattern } from "../core/events.js";
import { isTerminalWinCondition } from "../core/puzzleRuntime.js";
import { solveWithRuntime } from "../core/solver.js";
import { getRuntimeAdapter, type CurrentRuntimeAdapter } from "../prototypes/runtimeAdapter.js";

type RuntimeState = unknown;

type ExpectedTraceReplay = {
  events: string[];
  provided: boolean;
  passed: boolean;
  reason?: string;
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
    const traceReplay = replayExpectedTrace(
      adapter,
      pkg.mechanic,
      initial,
      level,
      winCondition,
    );
    const observedEvents = [...solution.events, ...traceReplay.events];
    const missingExpectedEvents = (level.expected_events ?? []).filter(
      (pattern) => !eventsMatchPattern(observedEvents, pattern),
    );
    const notes: string[] = [];

    if (!solution.found) {
      notes.push(solution.reason ?? "No solution found");
    }
    if (missingExpectedEvents.length > 0) {
      notes.push(`Solution and expected trace are missing expected events: ${missingExpectedEvents.join(", ")}`);
    }
    if (traceReplay.provided && !traceReplay.passed) {
      notes.push(`Expected trace failed: ${traceReplay.reason ?? "unknown mismatch"}`);
    }
    if (graphAnalysis.status === "exhausted") {
      notes.push(
        `Full graph analysis exhausted budget at ${graphAnalysis.reachableStateCount} states`,
      );
    }

    const hasFailure =
      (!solution.found && solution.searchStatus === "complete") ||
      missingExpectedEvents.length > 0 ||
      (traceReplay.provided && !traceReplay.passed);
    const hasUnknown = !solution.found || graphAnalysis.status === "exhausted";

    return {
      levelId: level.id,
      title: level.title,
      solvable: solution.found,
      shortestCost: solution.found ? solution.cost : undefined,
      solutionInputs: solution.inputs,
      solutionEvents: solution.events,
      probeEvents: traceReplay.events,
      exploredStates: solution.exploredStates,
      graphAnalysis,
      status: hasFailure ? "fail" : hasUnknown ? "warning" : "pass",
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
    return { events: [], provided: false, passed: true };
  }

  let state = initial;
  const events: string[] = [];
  const mismatches: string[] = [];
  const terminalWin = isTerminalWinCondition(winCondition);
  let reachedTerminalWin = terminalWin && adapter.isWin(state, winCondition);

  for (const [index, expectedStep] of level.expected_trace.entries()) {
    if (reachedTerminalWin) {
      mismatches.push(`step ${index + 1} occurs after a terminal win condition was reached`);
      break;
    }

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

    if (result.legal) state = result.state;
    reachedTerminalWin =
      terminalWin &&
      (adapter.isWin(state, winCondition) || adapter.isEventWin(result.events, winCondition));
  }

  return {
    events,
    provided: true,
    passed: mismatches.length === 0,
    reason: mismatches.length > 0 ? mismatches.join("; ") : undefined,
  };
}

export function summarizeEvaluation(results: EvaluationResult[]): string {
  const lines: string[] = [];
  for (const result of results) {
    const cost = result.shortestCost === undefined ? "n/a" : String(result.shortestCost);
    lines.push(
      `${result.levelId} ${result.status.toUpperCase()} solvable=${result.solvable} cost=${cost} explored=${result.exploredStates}`,
    );
    for (const note of result.notes) lines.push(`  - ${note}`);
  }
  return lines.join("\n");
}
