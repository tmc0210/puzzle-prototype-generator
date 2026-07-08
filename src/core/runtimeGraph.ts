import { isTerminalWinCondition, type PuzzleRuntime, type RuntimeSearchOptions } from "./puzzleRuntime.js";
import type { WinCondition } from "./types.js";

export type RuntimeGraphEdge<Action extends string> = {
  from: number;
  to: number;
  action: Action;
  events: string[];
};

export type RuntimeGraphBudget = {
  maxStates: number;
  maxTransitions?: number;
  maxDepth?: number;
  terminalizeWins?: boolean;
};

export type RuntimeGraph<State, Action extends string> = {
  status: "complete" | "exhausted";
  reason?: string;
  keys: string[];
  states: State[];
  depthByIndex: number[];
  indexByKey: Map<string, number>;
  edges: Array<RuntimeGraphEdge<Action>>;
  winStateIndexes: Set<number>;
};

type QueueItem<State> = {
  index: number;
  state: State;
  depth: number;
};

export function enumerateRuntimeGraph<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  winCondition: WinCondition,
  options: Options,
  budget: RuntimeGraphBudget,
): RuntimeGraph<State, Action> {
  const initialKey = runtime.key(initialState);
  const keys = [initialKey];
  const states = [initialState];
  const depthByIndex = [0];
  const indexByKey = new Map<string, number>([[initialKey, 0]]);
  const edges: Array<RuntimeGraphEdge<Action>> = [];
  const winStateIndexes = new Set<number>();
  const terminalizeWins = budget.terminalizeWins ?? isTerminalWinCondition(winCondition);
  if (runtime.isWin(initialState, winCondition)) {
    winStateIndexes.add(0);
  }

  const queue: Array<QueueItem<State>> = [{ index: 0, state: initialState, depth: 0 }];
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (terminalizeWins && runtime.isWin(current.state, winCondition)) {
      continue;
    }

    if (budget.maxDepth !== undefined && current.depth >= budget.maxDepth) {
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      if (budget.maxTransitions !== undefined && edges.length >= budget.maxTransitions) {
        return result("exhausted", "transition budget exceeded");
      }

      const transition = runtime.step(current.state, action, options);
      if (!transition.legal) {
        continue;
      }

      const nextKey = runtime.key(transition.state);
      let toIndex = indexByKey.get(nextKey);
      if (toIndex === undefined) {
        toIndex = keys.length;
        keys.push(nextKey);
        states.push(transition.state);
        depthByIndex.push(current.depth + 1);
        indexByKey.set(nextKey, toIndex);
        if (runtime.isWin(transition.state, winCondition)) {
          winStateIndexes.add(toIndex);
        }
        if (keys.length > budget.maxStates) {
          return result("exhausted", "state budget exceeded");
        }
        queue.push({ index: toIndex, state: transition.state, depth: current.depth + 1 });
      }

      edges.push({
        from: current.index,
        to: toIndex,
        action,
        events: transition.events,
      });
    }
  }

  return result("complete");

  function result(status: "complete" | "exhausted", reason?: string): RuntimeGraph<State, Action> {
    return {
      status,
      reason,
      keys,
      states,
      depthByIndex,
      indexByKey,
      edges,
      winStateIndexes,
    };
  }
}
