import type { PuzzleRuntime, RuntimeSearchOptions } from "../core/puzzleRuntime.js";
import type { WinCondition } from "../core/types.js";
import type { RuntimeAdapter } from "../prototypes/runtimeAdapter.js";

export type InputStateSnapshot = {
  key: string;
  render: string;
  isWin: boolean;
};

export type InputReplayStep = {
  step: number;
  action: string;
  legal: boolean;
  reason?: string;
  events: string[];
  eventWin: boolean;
  before: InputStateSnapshot;
  after: InputStateSnapshot;
};

export type InputChangedCell = {
  x: number;
  y: number;
  before: string;
  after: string;
};

export type InputSequenceReplayExecution<State> = {
  requestedActions: string[];
  initial: InputStateSnapshot;
  final: InputStateSnapshot;
  steps: InputReplayStep[];
  stoppedAtIllegalAction: boolean;
  legalThroughStep: number;
  stoppedAtStep?: number;
  stoppedReason?: string;
  changedCells: InputChangedCell[];
  finalState: State;
};

export type InputSequenceReplayReport = {
  id: string;
  prototype: string;
  layoutSource: string;
  layout: string;
  winCondition: WinCondition;
  inputs: string[];
  replay: {
    completed: boolean;
    executedSteps: number;
    legalThroughStep: number;
    stoppedAtStep?: number;
    stoppedReason?: string;
  };
  initial: InputStateSnapshot;
  steps: InputReplayStep[];
  final: InputStateSnapshot;
  changedCells: InputChangedCell[];
};

export function replayInputSequence<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  adapter: RuntimeAdapter<State, Action, Options>,
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  rawActions: string[],
  options: Options,
  winCondition: WinCondition,
): InputSequenceReplayExecution<State> {
  let current = initialState;
  const steps: InputReplayStep[] = [];
  let stoppedAtStep: number | undefined;
  let stoppedReason: string | undefined;

  for (const [index, rawAction] of rawActions.entries()) {
    const before = snapshotInputState(adapter, runtime, current, winCondition);
    const transition = runtime.step(current, rawAction as Action, options);
    const afterState = transition.legal ? transition.state : current;
    const after = snapshotInputState(adapter, runtime, afterState, winCondition);
    steps.push({
      step: index + 1,
      action: rawAction,
      legal: transition.legal,
      reason: transition.reason,
      events: transition.events,
      eventWin: adapter.isEventWin(transition.events, winCondition),
      before,
      after,
    });
    current = afterState;
    if (!transition.legal) {
      stoppedAtStep = index + 1;
      stoppedReason = transition.reason;
      break;
    }
  }

  const initial = snapshotInputState(adapter, runtime, initialState, winCondition);
  const final = snapshotInputState(adapter, runtime, current, winCondition);
  return {
    requestedActions: [...rawActions],
    initial,
    final,
    steps,
    stoppedAtIllegalAction: stoppedAtStep !== undefined,
    legalThroughStep: stoppedAtStep === undefined ? steps.length : stoppedAtStep - 1,
    stoppedAtStep,
    stoppedReason,
    changedCells: diffRenderedStates(initial.render, final.render),
    finalState: current,
  };
}

export function buildInputSequenceReplayReport<State>(
  metadata: {
    id: string;
    prototype: string;
    layoutSource: string;
    layout: string;
    winCondition: WinCondition;
  },
  execution: InputSequenceReplayExecution<State>,
): InputSequenceReplayReport {
  return {
    ...metadata,
    inputs: execution.requestedActions,
    replay: {
      completed: !execution.stoppedAtIllegalAction,
      executedSteps: execution.steps.length,
      legalThroughStep: execution.legalThroughStep,
      stoppedAtStep: execution.stoppedAtStep,
      stoppedReason: execution.stoppedReason,
    },
    initial: execution.initial,
    steps: execution.steps,
    final: execution.final,
    changedCells: execution.changedCells,
  };
}

export function formatInputSequenceReplayMarkdown(report: InputSequenceReplayReport): string {
  const lines: string[] = [
    `# Input Sequence Replay: ${report.id}`,
    "",
    `- Prototype: ${report.prototype}`,
    `- Layout source: ${report.layoutSource}`,
    `- Inputs: ${report.inputs.join(" ")}`,
    `- Completed: ${report.replay.completed ? "yes" : "no"}`,
    `- Legal through step: ${report.replay.legalThroughStep}`,
  ];
  if (report.replay.stoppedAtStep !== undefined) {
    lines.push(
      `- Stopped at step: ${report.replay.stoppedAtStep}`,
      `- Stop reason: ${report.replay.stoppedReason ?? "illegal"}`,
    );
  }

  lines.push("", "## Initial State", "", "```text", report.initial.render, "```");

  lines.push("", "## Steps");
  if (report.steps.length === 0) {
    lines.push("", "No inputs were executed.");
  } else {
    for (const step of report.steps) {
      const status = step.legal ? "legal" : `illegal (${step.reason ?? "unknown"})`;
      lines.push(
        "",
        `### Step ${step.step}: ${step.action}`,
        "",
        `- Status: ${status}`,
        `- Events: ${step.events.join(", ") || "none"}`,
        `- State key: ${step.after.key}`,
        `- Win after step: ${step.after.isWin ? "yes" : "no"}`,
        "",
        "```text",
        step.after.render,
        "```",
      );
    }
  }

  lines.push(
    "",
    "## Final State",
    "",
    `- State key: ${report.final.key}`,
    `- Win: ${report.final.isWin ? "yes" : "no"}`,
    `- Changed cells: ${formatChangedCells(report.changedCells)}`,
    "",
    "```text",
    report.final.render,
    "```",
    "",
  );
  return `${lines.join("\n")}\n`;
}

export function snapshotInputState<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  adapter: RuntimeAdapter<State, Action, Options>,
  runtime: PuzzleRuntime<State, Action, Options>,
  state: State,
  winCondition: WinCondition,
): InputStateSnapshot {
  return {
    key: runtime.key(state),
    render: adapter.renderState(state),
    isWin: runtime.isWin(state, winCondition),
  };
}

export function diffRenderedStates(before: string, after: string): InputChangedCell[] {
  const beforeRows = before.split("\n");
  const afterRows = after.split("\n");
  const height = Math.max(beforeRows.length, afterRows.length);
  const width = Math.max(
    ...beforeRows.map((row) => row.length),
    ...afterRows.map((row) => row.length),
    0,
  );
  const changed: InputChangedCell[] = [];

  for (let y = 0; y < height; y += 1) {
    const beforeRow = beforeRows[y] ?? "";
    const afterRow = afterRows[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const beforeGlyph = beforeRow[x] ?? " ";
      const afterGlyph = afterRow[x] ?? " ";
      if (beforeGlyph !== afterGlyph) {
        changed.push({ x, y, before: beforeGlyph, after: afterGlyph });
      }
    }
  }

  return changed;
}

function formatChangedCells(cells: InputChangedCell[]): string {
  if (cells.length === 0) {
    return "none";
  }
  const sample = cells
    .slice(0, 12)
    .map((cell) => `(${cell.x},${cell.y}) ${cell.before}->${cell.after}`)
    .join("; ");
  return cells.length > 12 ? `${sample}; ... total=${cells.length}` : sample;
}
