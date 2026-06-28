import type { LevelDoc, MechanicDoc, WinCondition } from "./types.js";
import { eventsMatchPattern } from "./events.js";

export type __ActionId__ = string;

export type __StateName__ = {
  width: number;
  height: number;
  // TODO: replace with the mechanism's authoritative state.
  // Include every future-relevant object position, variable, relation, inventory,
  // timer, active actor, orientation, nested-board state, and global flag.
  player: { x: number; y: number };
  walls: Set<string>;
  goals: Set<string>;
};

export type __MechanicPascal__StepResult = {
  legal: boolean;
  input: __ActionId__;
  state: __StateName__;
  events: string[];
  reason?: string;
};

export function pointKey(point: { x: number; y: number }): string {
  return `${point.x},${point.y}`;
}

export function parseLevel(level: LevelDoc): __StateName__ {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }
  if (lines.length === 0) {
    throw new Error(`Level ${level.id} has empty layout`);
  }

  const width = Math.max(...lines.map((line) => line.length));
  const height = lines.length;
  const walls = new Set<string>();
  const goals = new Set<string>();
  let player: { x: number; y: number } | undefined;

  for (let y = 0; y < height; y += 1) {
    const line = lines[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const glyph = line[x] ?? " ";
      const point = { x, y };
      switch (glyph) {
        case "#":
          walls.add(pointKey(point));
          break;
        case "G":
          goals.add(pointKey(point));
          break;
        case "@":
          if (player) {
            throw new Error(`Level ${level.id} has multiple players`);
          }
          player = point;
          break;
        case ".":
        case " ":
          break;
        default:
          // TODO: parse mechanism-specific glyphs here.
          throw new Error(`Level ${level.id} has unsupported glyph '${glyph}' at ${x},${y}`);
      }
    }
  }

  if (!player) {
    throw new Error(`Level ${level.id} has no player`);
  }

  return { width, height, player, walls, goals };
}

export function cloneState(state: __StateName__): __StateName__ {
  return {
    width: state.width,
    height: state.height,
    player: { ...state.player },
    walls: new Set(state.walls),
    goals: new Set(state.goals),
  };
}

export function stateKey(state: __StateName__): string {
  // TODO: include every future-relevant state component.
  return [
    `P:${pointKey(state.player)}`,
    `W:${[...state.walls].sort().join(";")}`,
    `G:${[...state.goals].sort().join(";")}`,
  ].join("|");
}

export function renderState(state: __StateName__): string {
  const rows = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => " "),
  );

  for (const key of state.goals) {
    const [xRaw, yRaw] = key.split(",");
    rows[Number(yRaw)]![Number(xRaw)] = "G";
  }
  for (const key of state.walls) {
    const [xRaw, yRaw] = key.split(",");
    rows[Number(yRaw)]![Number(xRaw)] = "#";
  }
  rows[state.player.y]![state.player.x] = "@";

  return rows.map((row) => row.join("").trimEnd()).join("\n");
}

export function isWin(
  state: __StateName__,
  winCondition: WinCondition = { type: "player_on_goal" },
): boolean {
  switch (winCondition.type) {
    case "player_on_goal":
      return state.goals.has(pointKey(state.player));
    default:
      return false;
  }
}

export function isEventWin(events: string[], winCondition?: WinCondition): boolean {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== undefined && eventsMatchPattern(events, event);
}

export function step(
  mechanic: MechanicDoc,
  state: __StateName__,
  input: __ActionId__,
  options: {
    disabledRules?: Set<string>;
    disabledBranches?: Set<string>;
    winCondition?: WinCondition;
  } = {},
): __MechanicPascal__StepResult {
  void mechanic;
  void options;

  // TODO: implement rule-priority order from the confirmed mechanism packet.
  return {
    legal: false,
    input,
    state,
    events: [],
    reason: "not_implemented",
  };
}

export function replay(
  mechanic: MechanicDoc,
  initialState: __StateName__,
  inputs: __ActionId__[],
  options: Parameters<typeof step>[3] = {},
): { state: __StateName__; events: string[]; legal: boolean } {
  let state = initialState;
  const events: string[] = [];
  let legal = true;

  for (const input of inputs) {
    const result = step(mechanic, state, input, options);
    events.push(...result.events);
    if (result.legal) {
      state = result.state;
    } else {
      legal = false;
    }
  }

  return { state, events, legal };
}
