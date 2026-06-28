import type { GraphAnalysis } from "./types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "./puzzleRuntime.js";

export type GraphAnalysisOptions = RuntimeSearchOptions & {
  maxTransitions?: number;
};

type QueueItem<State> = {
  state: State;
  depth: number;
};

export function analyzeGraphWithRuntime<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  options: Options & GraphAnalysisOptions,
): GraphAnalysis {
  const maxStates = options.maxStates ?? 100_000;
  const maxTransitions = options.maxTransitions;
  const maxDepth = options.maxDepth;
  const winCondition = options.winCondition ?? runtime.defaultWin;
  const initialKey = runtime.key(initialState);
  const queue: Array<QueueItem<State>> = [{ state: initialState, depth: 0 }];
  const visited = new Set<string>([initialKey]);
  let cursor = 0;
  let legalTransitionCount = 0;
  let eventOnlyTransitionCount = 0;
  let winStateCount = runtime.isWin(initialState, winCondition) ? 1 : 0;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (maxDepth !== undefined && current.depth >= maxDepth) {
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      if (maxTransitions !== undefined && legalTransitionCount >= maxTransitions) {
        return result("exhausted", "transition budget exceeded");
      }

      const transition = runtime.step(current.state, action, options);
      if (!transition.legal) {
        if (transition.events.length > 0) {
          eventOnlyTransitionCount += 1;
        }
        continue;
      }

      legalTransitionCount += 1;
      const nextKey = runtime.key(transition.state);
      if (visited.has(nextKey)) {
        continue;
      }

      visited.add(nextKey);
      if (runtime.isWin(transition.state, winCondition)) {
        winStateCount += 1;
      }
      if (visited.size > maxStates) {
        return result("exhausted", "state budget exceeded");
      }

      queue.push({ state: transition.state, depth: current.depth + 1 });
    }
  }

  return result("complete");

  function result(status: GraphAnalysis["status"], reason?: string): GraphAnalysis {
    return {
      status,
      reachableStateCount: visited.size,
      legalTransitionCount,
      eventOnlyTransitionCount,
      winStateCount,
      budget: {
        maxStates,
        maxTransitions,
        maxDepth,
      },
      reason,
    };
  }
}
