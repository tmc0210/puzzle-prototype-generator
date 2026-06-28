import type { WinCondition } from "./types.js";
import { eventsMatchPattern } from "./events.js";

export type RuntimeSearchOptions = {
  winCondition?: WinCondition;
  maxStates?: number;
  maxDepth?: number;
};

export type RuntimeTransition<State, Action extends string> = {
  action: Action;
  legal: boolean;
  state: State;
  events: string[];
  cost: number;
  reason?: string;
};

export type PuzzleRuntime<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions = RuntimeSearchOptions,
> = {
  defaultWin: WinCondition;
  key(state: State): string;
  actions(state: State, options: Options): Action[];
  step(state: State, action: Action, options: Options): RuntimeTransition<State, Action>;
  isWin(state: State, winCondition: WinCondition): boolean;
};

export function isEventWinCondition(events: string[], winCondition?: WinCondition): boolean {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== undefined && eventsMatchPattern(events, event);
}
