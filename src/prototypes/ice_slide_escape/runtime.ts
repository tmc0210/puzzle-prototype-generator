import type { MechanicDoc } from "../../core/types.js";
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
  type IceSlideAction,
  type IceSlideState,
  type IceSlideStepOptions,
} from "./mechanics.js";

const defaultActions: IceSlideAction[] = ["up", "down", "left", "right"];

export function createIceSlideRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<IceSlideState, IceSlideAction, IceSlideStepOptions> {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: () => legalActions(mechanic),
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

function legalActions(mechanic: MechanicDoc): IceSlideAction[] {
  const actions = Object.entries(mechanic.inputs)
    .filter(([, input]) => input.intent === "move" && input.dir)
    .map(([, input]) => input.dir as IceSlideAction);
  return actions.length > 0 ? actions : defaultActions;
}

export const iceSlideAdapter: RuntimeAdapter<
  IceSlideState,
  IceSlideAction,
  IceSlideStepOptions
> = {
  id: "ice_slide_escape",
  createRuntime: createIceSlideRuntime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin,
};
