import type {
  Direction,
  InputId,
  LevelDoc,
  MechanicDoc,
  Point,
  SolverOptions,
  WinCondition,
} from "../../core/types.js";
import { eventsMatchPattern } from "../../core/events.js";

export type GameState = {
  width: number;
  height: number;
  walls: Set<string>;
  goals: Set<string>;
  player: Point;
  crates: Point[];
  portals: Record<string, Point>;
};

export type StepResult = {
  legal: boolean;
  input: InputId;
  state: GameState;
  events: string[];
  reason?: string;
};

const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const portalPairs: Record<string, string> = {
  A: "B",
  B: "A",
  D: "E",
  E: "D",
  H: "I",
  I: "H",
};

export function pointKey(point: Point): string {
  return `${point.x},${point.y}`;
}

export function add(point: Point, dir: Direction): Point {
  const vector = vectors[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}

export function opposite(point: Point, dir: Direction): Point {
  const vector = vectors[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}

export function parseLevel(level: LevelDoc): GameState {
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
  const crates: Point[] = [];
  const portals: Record<string, Point> = {};
  let player: Point | undefined;

  for (let y = 0; y < height; y += 1) {
    const line = lines[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const char = line[x] ?? " ";
      const point = { x, y };
      switch (char) {
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
        case "C":
          crates.push(point);
          break;
        case "A":
        case "B":
        case "D":
        case "E":
        case "H":
        case "I":
          if (portals[char]) {
            throw new Error(`Level ${level.id} has duplicate portal '${char}' at ${x},${y}`);
          }
          portals[char] = point;
          break;
        case ".":
        case " ":
          break;
        default:
          throw new Error(`Level ${level.id} has unsupported glyph '${char}' at ${x},${y}`);
      }
    }
  }

  if (!player) {
    throw new Error(`Level ${level.id} has no player`);
  }

  for (const [portalId, pairedPortalId] of Object.entries(portalPairs)) {
    if (portals[portalId] && !portals[pairedPortalId]) {
      throw new Error(
        `Level ${level.id} has portal '${portalId}' without paired portal '${pairedPortalId}'`,
      );
    }
  }

  return { width, height, walls, goals, player, crates, portals };
}

export function cloneState(state: GameState): GameState {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    goals: new Set(state.goals),
    player: { ...state.player },
    crates: state.crates.map((crate) => ({ ...crate })),
    portals: Object.fromEntries(
      Object.entries(state.portals).map(([id, point]) => [id, { ...point }]),
    ),
  };
}

export function stateKey(state: GameState): string {
  const crates = state.crates
    .map(pointKey)
    .sort()
    .join(";");
  const portals = Object.entries(state.portals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, point]) => `${id}:${pointKey(point)}`)
    .join(";");
  return `P:${pointKey(state.player)}|C:${crates}|R:${portals}`;
}

export function isWin(
  state: GameState,
  winCondition: WinCondition = { type: "all_objects_on_targets" },
): boolean {
  switch (winCondition.type) {
    case "all_objects_on_targets":
      return (
        state.crates.length > 0 && state.crates.every((crate) => state.goals.has(pointKey(crate)))
      );
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

export function replay(
  mechanic: MechanicDoc,
  initialState: GameState,
  inputs: InputId[],
  options: SolverOptions = {},
): { state: GameState; events: string[]; legal: boolean } {
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

export function renderState(state: GameState): string {
  const rows: string[][] = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => " "),
  );

  for (const key of state.goals) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y]![x] = "G";
  }

  for (const key of state.walls) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y]![x] = "#";
  }

  for (const [id, point] of Object.entries(state.portals)) {
    rows[point.y]![point.x] = id;
  }

  for (const crate of state.crates) {
    rows[crate.y]![crate.x] = "C";
  }

  rows[state.player.y]![state.player.x] = "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}

export function step(
  mechanic: MechanicDoc,
  state: GameState,
  input: InputId,
  options: SolverOptions = {},
): StepResult {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state, input, "unsupported_input");
  }

  const dir = inputDef.dir;
  const destination = add(state.player, dir);
  const behind = opposite(state.player, dir);

  if (isBlockedByWallOrBounds(state, destination)) {
    return illegal(state, input, "destination_blocked");
  }

  if (crateIndexAt(state, destination) !== -1) {
    const pushedCrateIndex = crateIndexAt(state, destination);
    if (isRuleDisabled("cannot_push_crate", options)) {
      return illegal(state, input, "crate_push_rule_disabled");
    }
    return {
      legal: false,
      input,
      state,
      events: [`push_crate_failed:crate#${pushedCrateIndex + 1}`],
      reason: "cannot_push_crate",
    };
  }

  const portalId = portalIdAt(state, destination);
  if (portalId) {
    return enterPortal(state, input, dir, portalId, options);
  }

  const pulledCrateIndex = crateIndexAt(state, behind);
  const canPull =
    pulledCrateIndex !== -1 &&
    !isRuleDisabled("pull_single_crate", options) &&
    isCellFreeForPlayer(state, destination);

  if (canPull) {
    const next = cloneState(state);
    next.player = destination;
    next.crates[pulledCrateIndex] = { ...state.player };
    return {
      legal: true,
      input,
      state: next,
      events: [`pull_crate:crate#${pulledCrateIndex + 1}`],
    };
  }

  if (!isRuleDisabled("walk", options) && isCellFreeForPlayer(state, destination)) {
    const next = cloneState(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }

  return illegal(state, input, "no_matching_rule");
}

function enterPortal(
  state: GameState,
  input: InputId,
  dir: Direction,
  entrancePortalId: string,
  options: SolverOptions,
): StepResult {
  if (isRuleDisabled("enter_portal", options)) {
    return illegal(state, input, "enter_portal_disabled");
  }

  const entrance = state.portals[entrancePortalId];
  if (!entrance) {
    return illegal(state, input, "missing_entrance_portal");
  }

  const pairedPortalId = portalPairs[entrancePortalId];
  if (!pairedPortalId) {
    return illegal(state, input, "missing_paired_portal");
  }
  const paired = state.portals[pairedPortalId];
  if (!paired) {
    return illegal(state, input, "missing_paired_portal");
  }

  const exit = add(paired, dir);
  const exitBlocked = !isCellFreeForPlayer(state, exit);
  const exitBlockerEvents = exitBlocked ? describePortalExitBlocker(state, exit) : [];

  if (!exitBlocked) {
    if (isBranchDisabled("enter_portal.normal_teleport", options)) {
      return illegal(state, input, "normal_teleport_disabled");
    }
    const next = cloneState(state);
    next.player = exit;
    return {
      legal: true,
      input,
      state: next,
      events: [`portal_enter:${entrancePortalId}`, `portal_teleport:${entrancePortalId}->${pairedPortalId}`],
    };
  }

  const pushedPortalDestination = add(entrance, dir);
  const canPushEntrance = isCellFreeForPortal(state, pushedPortalDestination);

  if (canPushEntrance) {
    if (isBranchDisabled("enter_portal.blocked_exit_push_entrance", options)) {
      return illegal(state, input, "blocked_exit_push_entrance_disabled");
    }
    const next = cloneState(state);
    next.portals[entrancePortalId] = pushedPortalDestination;
    return {
      legal: true,
      input,
      state: next,
      events: [
        `portal_enter:${entrancePortalId}`,
        `portal_exit_blocked:${entrancePortalId}->${pairedPortalId}`,
        ...exitBlockerEvents,
        `portal_fallback_push:${entrancePortalId}`,
      ],
    };
  }

  return {
    legal: false,
    input,
    state,
    events: [
      `portal_enter:${entrancePortalId}`,
      `portal_exit_blocked:${entrancePortalId}->${pairedPortalId}`,
      ...exitBlockerEvents,
      `portal_fallback_failed:${entrancePortalId}`,
    ],
    reason: "portal_fallback_failed",
  };
}

function isRuleDisabled(ruleId: string, options: SolverOptions): boolean {
  return options.disabledRules?.has(ruleId) ?? false;
}

function isBranchDisabled(branchId: string, options: SolverOptions): boolean {
  return options.disabledBranches?.has(branchId) ?? false;
}

function illegal(state: GameState, input: InputId, reason: string): StepResult {
  return { legal: false, input, state, events: [], reason };
}

function isBlockedByWallOrBounds(state: GameState, point: Point): boolean {
  return !inBounds(state, point) || state.walls.has(pointKey(point));
}

function inBounds(state: GameState, point: Point): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}

function crateIndexAt(state: GameState, point: Point): number {
  const key = pointKey(point);
  return state.crates.findIndex((crate) => pointKey(crate) === key);
}

function portalIdAt(state: GameState, point: Point): string | undefined {
  const key = pointKey(point);
  return Object.entries(state.portals).find(([, portal]) => pointKey(portal) === key)?.[0];
}

function describePortalExitBlocker(state: GameState, point: Point): string[] {
  if (!inBounds(state, point)) {
    return ["portal_exit_blocked_by_bounds"];
  }

  if (state.walls.has(pointKey(point))) {
    return ["portal_exit_blocked_by_wall"];
  }

  const crateIndex = crateIndexAt(state, point);
  if (crateIndex !== -1) {
    return [`portal_exit_blocked_by_crate:crate#${crateIndex + 1}`];
  }

  const portalId = portalIdAt(state, point);
  if (portalId) {
    return [`portal_exit_blocked_by_portal:${portalId}`];
  }

  return ["portal_exit_blocked_by_unknown"];
}

function isCellFreeForPlayer(state: GameState, point: Point): boolean {
  return (
    inBounds(state, point) &&
    !state.walls.has(pointKey(point)) &&
    crateIndexAt(state, point) === -1 &&
    !portalIdAt(state, point)
  );
}

function isCellFreeForPortal(state: GameState, point: Point): boolean {
  return (
    inBounds(state, point) &&
    !state.walls.has(pointKey(point)) &&
    crateIndexAt(state, point) === -1 &&
    !portalIdAt(state, point) &&
    pointKey(state.player) !== pointKey(point)
  );
}
