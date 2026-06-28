import type {
  GameState,
  InputId,
  MechanicDoc,
  Solution,
  SolutionStep,
  SolverOptions,
} from "./types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "./puzzleRuntime.js";
import { isEventWinCondition } from "./puzzleRuntime.js";
import { createPullPortalRuntime } from "./pullPortalRuntime.js";
import { eventMatchesPattern } from "./events.js";

type GenericSolution<Action extends string> = Omit<Solution, "inputs" | "steps"> & {
  inputs: Action[];
  steps: Array<Omit<SolutionStep, "input"> & { input: Action }>;
};

type QueueItem<State, Action extends string> = {
  state: State;
  key: string;
  inputs: Action[];
  steps: Array<Omit<SolutionStep, "input"> & { input: Action }>;
  events: string[];
  cost: number;
  depth: number;
};

type CoverageQueueItem<State, Action extends string> = {
  state: State;
  inputs: Action[];
  steps: Array<Omit<SolutionStep, "input"> & { input: Action }>;
  events: string[];
  requiredKey: string;
  forbiddenHit: boolean;
  cost: number;
  depth: number;
};

export function solve(
  mechanic: MechanicDoc,
  initialState: GameState,
  options: SolverOptions = {},
): Solution {
  // Compatibility wrapper for the current pull_portal_fallback adapter.
  // New prototype code should prefer solveWithRuntime plus a registered runtime adapter.
  return solveWithRuntime(createPullPortalRuntime(mechanic), initialState, options);
}

export function solveWithRuntime<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  options: Options,
): GenericSolution<Action> {
  const maxStates = options.maxStates ?? 100_000;
  const maxDepth = options.maxDepth ?? 200;
  const initialKey = runtime.key(initialState);
  const winCondition = options.winCondition ?? runtime.defaultWin;
  let depthLimitHit = false;

  if (runtime.isWin(initialState, winCondition)) {
    return {
      found: true,
      inputs: [],
      steps: [],
      events: [],
      cost: 0,
      exploredStates: 1,
      searchStatus: "found",
      budget: { maxStates, maxDepth },
      depth: 0,
    };
  }

  const queue: Array<QueueItem<State, Action>> = [
    {
      state: initialState,
      key: initialKey,
      inputs: [],
      steps: [],
      events: [],
      cost: 0,
      depth: 0,
    },
  ];
  const visited = new Set<string>([initialKey]);
  let cursor = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return noSolution(
        visited.size,
        `state budget exceeded (${maxStates})`,
        "exhausted",
        { maxStates, maxDepth },
      );
    }

    const current = queue[cursor]!;
    cursor += 1;

    if (current.depth >= maxDepth) {
      depthLimitHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      const result = runtime.step(current.state, action, options);
      const nextCost = current.cost + result.cost;

      if (!result.legal) {
        if (isEventWinCondition(result.events, winCondition)) {
          const nextInputs = [...current.inputs, action];
          const nextEvents = [...current.events, ...result.events];
          return {
            found: true,
            inputs: nextInputs,
            steps: [
              ...current.steps,
              { input: action, events: result.events, stateKey: current.key },
            ],
            events: nextEvents,
            cost: nextCost,
            exploredStates: visited.size + 1,
            searchStatus: "found",
            budget: { maxStates, maxDepth },
            depth: current.depth + 1,
          };
        }
        continue;
      }

      const nextKey = runtime.key(result.state);
      if (visited.has(nextKey)) {
        continue;
      }

      const nextInputs = [...current.inputs, action];
      const nextEvents = [...current.events, ...result.events];
      const nextSteps = [
        ...current.steps,
        { input: action, events: result.events, stateKey: nextKey },
      ];

      if (
        runtime.isWin(result.state, winCondition) ||
        isEventWinCondition(result.events, winCondition)
      ) {
        return {
          found: true,
          inputs: nextInputs,
          steps: nextSteps,
          events: nextEvents,
          cost: nextCost,
          exploredStates: visited.size + 1,
          searchStatus: "found",
          budget: { maxStates, maxDepth },
          depth: current.depth + 1,
        };
      }

      visited.add(nextKey);
      queue.push({
        state: result.state,
        key: nextKey,
        inputs: nextInputs,
        steps: nextSteps,
        events: nextEvents,
        cost: nextCost,
        depth: current.depth + 1,
      });
    }
  }

  return noSolution(
    visited.size,
    depthLimitHit ? `depth budget exceeded (${maxDepth})` : "search complete",
    depthLimitHit ? "exhausted" : "complete",
    { maxStates, maxDepth },
  );
}

export function counterfactualOptions(
  mechanic: MechanicDoc,
  modelId: string | undefined,
  base: SolverOptions = {},
): SolverOptions {
  if (!modelId) {
    return { ...base };
  }

  const model = mechanic.counterfactuals?.[modelId];
  if (!model) {
    return { ...base };
  }

  return {
    ...base,
    disabledRules: new Set(model.disable_rules ?? []),
    disabledBranches: new Set(model.disable_branches ?? []),
  };
}

export function findUncoveredGoalPath(
  mechanic: MechanicDoc,
  initialState: GameState,
  requiredEvents: string[],
  forbiddenEvents: string[],
  options: SolverOptions,
  maxDepth?: number,
): Solution {
  // Compatibility wrapper for the current pull_portal_fallback adapter.
  // New prototype code should prefer findUncoveredGoalPathWithRuntime.
  return findUncoveredGoalPathWithRuntime(
    createPullPortalRuntime(mechanic),
    initialState,
    requiredEvents,
    forbiddenEvents,
    options,
    maxDepth,
  );
}

export function findUncoveredGoalPathWithRuntime<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  requiredEvents: string[],
  forbiddenEvents: string[],
  options: Options,
  maxDepth?: number,
): GenericSolution<Action> {
  const winCondition = options.winCondition ?? runtime.defaultWin;
  const maxStates = options.maxStates ?? 100_000;
  let depthLimitHit = false;
  const allRequiredKey = requiredEvents.map((_, index) => String(index)).join(",");

  const initialRequiredKey = "";
  const initialKey = `${runtime.key(initialState)}|m:${initialRequiredKey}|f:false`;
  const queue: Array<CoverageQueueItem<State, Action>> = [
    {
      state: initialState,
      inputs: [],
      steps: [],
      events: [],
      requiredKey: initialRequiredKey,
      forbiddenHit: false,
      cost: 0,
      depth: 0,
    },
  ];
  const visited = new Set<string>([initialKey]);
  let cursor = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return noSolution(
        visited.size,
        `state budget exceeded (${maxStates})`,
        "exhausted",
        { maxStates, maxDepth },
      );
    }

    const current = queue[cursor]!;
    cursor += 1;

    if (
      current.depth > 0 &&
      runtime.isWin(current.state, winCondition) &&
      !isCoverageSatisfied(current.requiredKey, allRequiredKey, current.forbiddenHit)
    ) {
      return {
        found: true,
        inputs: current.inputs,
        steps: current.steps,
        events: current.events,
        cost: current.cost,
        exploredStates: visited.size,
        searchStatus: "found",
        budget: { maxStates, maxDepth },
        depth: current.depth,
      };
    }

    if (maxDepth !== undefined && current.depth >= maxDepth) {
      depthLimitHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      const result = runtime.step(current.state, action, options);
      const nextCost = current.cost + result.cost;

      if (!result.legal) {
        const eventWin = isEventWinCondition(result.events, winCondition);
        if (eventWin) {
          const nextRequiredKey = collectRequiredEvents(
            current.requiredKey,
            result.events,
            requiredEvents,
          );
          const nextForbiddenHit =
            current.forbiddenHit ||
            result.events.some((event) =>
              forbiddenEvents.some((pattern) => eventMatchesPattern(event, pattern)),
            );
          if (!isCoverageSatisfied(nextRequiredKey, allRequiredKey, nextForbiddenHit)) {
            const nextInputs = [...current.inputs, action];
            return {
              found: true,
              inputs: nextInputs,
              steps: [
                ...current.steps,
                { input: action, events: result.events, stateKey: runtime.key(current.state) },
              ],
              events: [...current.events, ...result.events],
              cost: nextCost,
              exploredStates: visited.size + 1,
              searchStatus: "found",
              budget: { maxStates, maxDepth },
              depth: current.depth + 1,
            };
          }
        }
        continue;
      }

      const nextRequiredKey = collectRequiredEvents(
        current.requiredKey,
        result.events,
        requiredEvents,
      );
      const nextForbiddenHit =
        current.forbiddenHit ||
        result.events.some((event) =>
          forbiddenEvents.some((pattern) => eventMatchesPattern(event, pattern)),
        );
      const nextEvents = [...current.events, ...result.events];
      const nextInputs = [...current.inputs, action];
      const nextSteps = [
        ...current.steps,
        { input: action, events: result.events, stateKey: runtime.key(result.state) },
      ];

      const eventWin = isEventWinCondition(result.events, winCondition);
      if (
        (runtime.isWin(result.state, winCondition) || eventWin) &&
        !isCoverageSatisfied(nextRequiredKey, allRequiredKey, nextForbiddenHit)
      ) {
        return {
          found: true,
          inputs: nextInputs,
          steps: nextSteps,
          events: nextEvents,
          cost: nextCost,
          exploredStates: visited.size,
          searchStatus: "found",
          budget: { maxStates, maxDepth },
          depth: current.depth + 1,
        };
      }

      if (runtime.isWin(result.state, winCondition) || eventWin) {
        continue;
      }

      const nextKey = `${runtime.key(result.state)}|m:${nextRequiredKey}|f:${nextForbiddenHit}`;
      if (visited.has(nextKey)) {
        continue;
      }

      visited.add(nextKey);
      queue.push({
        state: result.state,
        inputs: nextInputs,
        steps: nextSteps,
        events: nextEvents,
        requiredKey: nextRequiredKey,
        forbiddenHit: nextForbiddenHit,
        cost: nextCost,
        depth: current.depth + 1,
      });
    }
  }

  return noSolution(
    visited.size,
    depthLimitHit
      ? `depth budget exceeded (${maxDepth})`
      : "no uncovered goal path in complete search",
    depthLimitHit ? "exhausted" : "complete",
    { maxStates, maxDepth },
  );
}

function collectRequiredEvents(
  currentKey: string,
  events: string[],
  requiredEvents: string[],
): string {
  const seen = new Set(
    currentKey.length > 0 ? currentKey.split(",").map((index) => Number(index)) : [],
  );
  for (const event of events) {
    for (const [index, pattern] of requiredEvents.entries()) {
      if (eventMatchesPattern(event, pattern)) {
        seen.add(index);
      }
    }
  }
  return Array.from(seen)
    .sort((a, b) => a - b)
    .join(",");
}

function isCoverageSatisfied(
  requiredKey: string,
  allRequiredKey: string,
  forbiddenHit: boolean,
): boolean {
  return requiredKey === allRequiredKey && !forbiddenHit;
}

function noSolution<Action extends string>(
  exploredStates: number,
  reason: string,
  searchStatus: "complete" | "exhausted",
  budget: { maxStates: number; maxDepth?: number },
): GenericSolution<Action> {
  return {
    found: false,
    inputs: [],
    steps: [],
    events: [],
    cost: Number.POSITIVE_INFINITY,
    exploredStates,
    searchStatus,
    budget,
    reason,
  };
}
