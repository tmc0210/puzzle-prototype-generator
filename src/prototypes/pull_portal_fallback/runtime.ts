import type { InputId, MechanicDoc, SolverOptions } from "../../core/types.js";
import type { PuzzleRuntime } from "../../core/puzzleRuntime.js";
import type { RuntimeAdapter } from "../runtimeAdapter.js";
import {
  isEventWin,
  isWin,
  parseLevel,
  renderState,
  replay,
  stateKey,
  step,
  type GameState,
} from "./mechanics.js";

const defaultInputs: InputId[] = ["up", "down", "left", "right"];

export function createPullPortalRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<GameState, InputId, SolverOptions> {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: () => legalInputs(mechanic),
    step: (state, action, options) => {
      const result = step(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason,
      };
    },
    isWin,
  };
}

function legalInputs(mechanic: MechanicDoc): InputId[] {
  const inputs = Object.entries(mechanic.inputs)
    .filter(([, input]) => input.intent === "move" && input.dir)
    .map(([, input]) => input.dir as InputId);
  return inputs.length > 0 ? inputs : defaultInputs;
}

export const pullPortalAdapter: RuntimeAdapter<GameState, InputId, SolverOptions> = {
  id: "pull_portal_fallback",
  createRuntime: createPullPortalRuntime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin,
};
