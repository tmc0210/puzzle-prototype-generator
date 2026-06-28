import type { LevelDoc, MechanicDoc, WinCondition } from "../core/types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "../core/puzzleRuntime.js";
import { iceSlideAdapter } from "./ice_slide_escape/runtime.js";
import { pullPortalAdapter } from "./pull_portal_fallback/runtime.js";

export type AdapterStepResult<State, Action extends string> = {
  legal: boolean;
  input: Action;
  state: State;
  events: string[];
  reason?: string;
};

export type AdapterReplayResult<State> = {
  state: State;
  events: string[];
  legal: boolean;
};

export type RuntimeAdapter<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
> = {
  id: string;
  createRuntime(mechanic: MechanicDoc): PuzzleRuntime<State, Action, Options>;
  parseLevel(level: LevelDoc): State;
  renderState(state: State): string;
  step(
    mechanic: MechanicDoc,
    state: State,
    action: Action,
    options: Options,
  ): AdapterStepResult<State, Action>;
  replay(
    mechanic: MechanicDoc,
    initialState: State,
    actions: Action[],
    options: Options,
  ): AdapterReplayResult<State>;
  isWin(state: State, winCondition: WinCondition): boolean;
  isEventWin(events: string[], winCondition?: WinCondition): boolean;
};

export type CurrentRuntimeAdapter = RuntimeAdapter<any, any, any>;

export function getRuntimeAdapter(mechanic: MechanicDoc): CurrentRuntimeAdapter {
  if (mechanic.id === pullPortalAdapter.id) {
    return pullPortalAdapter;
  }
  if (mechanic.id === iceSlideAdapter.id) {
    return iceSlideAdapter;
  }

  throw new Error(
    `No runtime adapter registered for mechanic '${mechanic.id}'. ` +
      "Add an adapter before running solver, analyzer, playable, or exporter commands.",
  );
}
