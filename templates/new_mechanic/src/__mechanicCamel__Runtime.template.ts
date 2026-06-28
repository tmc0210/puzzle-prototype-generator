import type { MechanicDoc } from "./types.js";
import type { PuzzleRuntime } from "./puzzleRuntime.js";
import type { RuntimeAdapter } from "./runtimeAdapter.js";
import {
  isEventWin,
  isWin,
  parseLevel,
  renderState,
  replay,
  stateKey,
  step,
  type __ActionId__,
  type __StateName__,
} from "./__mechanicCamel__Mechanics.js";

export type __MechanicPascal__RuntimeOptions = {
  disabledRules?: Set<string>;
  disabledBranches?: Set<string>;
  winCondition?: MechanicDoc["win"];
  maxStates?: number;
  maxDepth?: number;
};

export function create__MechanicPascal__Runtime(
  mechanic: MechanicDoc,
): PuzzleRuntime<__StateName__, __ActionId__, __MechanicPascal__RuntimeOptions> {
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

function legalActions(mechanic: MechanicDoc): __ActionId__[] {
  const actions = Object.keys(mechanic.inputs) as __ActionId__[];
  if (actions.length === 0) {
    throw new Error(`Mechanic '${mechanic.id}' declares no inputs`);
  }
  return actions;
}

export const __mechanicCamel__Adapter: RuntimeAdapter<
  __StateName__,
  __ActionId__,
  __MechanicPascal__RuntimeOptions
> = {
  id: "__mechanic_id__",
  createRuntime: create__MechanicPascal__Runtime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin,
};
