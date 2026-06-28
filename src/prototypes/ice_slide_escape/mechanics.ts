import type { Direction, LevelDoc, MechanicDoc, Point, WinCondition } from "../../core/types.js";
import { eventsMatchPattern } from "../../core/events.js";

export type IceSlideAction = Direction;

export type IceSlideState = {
  width: number;
  height: number;
  walls: Set<string>;
  targets: Set<string>;
  player: Point;
  ice: Point[];
};

export type IceSlideStepOptions = {
  disabledRules?: Set<string>;
  disabledBranches?: Set<string>;
  winCondition?: WinCondition;
  maxStates?: number;
  maxDepth?: number;
};

export type IceSlideStepResult = {
  legal: boolean;
  input: IceSlideAction;
  state: IceSlideState;
  events: string[];
  reason?: string;
};

type SlideResult =
  | {
      legal: true;
      state: IceSlideState;
      events: string[];
    }
  | {
      legal: false;
      reason: string;
      events: string[];
    };

const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function pointKey(point: Point): string {
  return `${point.x},${point.y}`;
}

export function add(point: Point, dir: Direction): Point {
  const vector = vectors[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}

export function subtract(point: Point, dir: Direction): Point {
  const vector = vectors[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}

export function parseLevel(level: LevelDoc): IceSlideState {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }
  if (lines.length === 0) {
    throw new Error(`Level ${level.id} has empty layout`);
  }

  const width = lines[0]!.length;
  if (width === 0) {
    throw new Error(`Level ${level.id} has zero-width layout`);
  }
  if (lines.some((line) => line.length !== width)) {
    throw new Error(`Level ${level.id} must be rectangular; all rows must have width ${width}`);
  }

  const height = lines.length;
  const walls = new Set<string>();
  const targets = new Set<string>();
  const ice: Point[] = [];
  let playerMarker: Point | undefined;

  for (let y = 0; y < height; y += 1) {
    const line = lines[y]!;
    for (let x = 0; x < width; x += 1) {
      const glyph = line[x]!;
      const point = { x, y };
      switch (glyph) {
        case "#":
          walls.add(pointKey(point));
          break;
        case "G":
          targets.add(pointKey(point));
          break;
        case "*":
          targets.add(pointKey(point));
          ice.push(point);
          break;
        case "+":
          targets.add(pointKey(point));
          playerMarker = assignPlayer(level, playerMarker, point);
          break;
        case "@":
          playerMarker = assignPlayer(level, playerMarker, point);
          break;
        case "I":
          ice.push(point);
          break;
        case ".":
        case " ":
          break;
        default:
          throw new Error(`Level ${level.id} has unsupported glyph '${glyph}' at ${x},${y}`);
      }
    }
  }

  const explicitStart = readWinPoint(level.win, "player_start");
  const player = explicitStart ? toPoint(explicitStart) : playerMarker;
  if (!player) {
    throw new Error(`Level ${level.id} has no player marker and no explicit player_start`);
  }

  const state = {
    width,
    height,
    walls,
    targets,
    player,
    ice: sortPoints(ice),
  };

  validateExplicitRequest(level, state);
  return state;
}

function assignPlayer(level: LevelDoc, current: Point | undefined, point: Point): Point {
  if (current) {
    throw new Error(`Level ${level.id} has multiple player markers`);
  }
  return point;
}

function validateExplicitRequest(level: LevelDoc, state: IceSlideState): void {
  const start = readWinPoint(level.win, "player_start");
  if (start) {
    const point = toPoint(start);
    if (!isEdgeCell(state, point)) {
      throw new Error(`Level ${level.id} player_start must be an edge cell`);
    }
    if (!isCellFreeForPlayer(state, point)) {
      throw new Error(`Level ${level.id} player_start must initially be standable`);
    }
  }

  const goal = readWinPoint(level.win, "player_goal");
  if (goal) {
    const point = toPoint(goal);
    if (!isEdgeCell(state, point)) {
      throw new Error(`Level ${level.id} player_goal must be an edge cell`);
    }
  }
}

export function cloneState(state: IceSlideState): IceSlideState {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    targets: new Set(state.targets),
    player: { ...state.player },
    ice: state.ice.map((point) => ({ ...point })),
  };
}

export function stateKey(state: IceSlideState): string {
  return [
    `P:${pointKey(state.player)}`,
    `I:${state.ice.map(pointKey).sort().join(";")}`,
    `W:${[...state.walls].sort().join(";")}`,
  ].join("|");
}

export function renderState(state: IceSlideState): string {
  const rows = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => "."),
  );

  for (const key of state.targets) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "#";
  }
  for (const icePoint of state.ice) {
    rows[icePoint.y]![icePoint.x] = state.targets.has(pointKey(icePoint)) ? "*" : "I";
  }
  rows[state.player.y]![state.player.x] = state.targets.has(pointKey(state.player)) ? "+" : "@";

  return rows.map((row) => row.join("")).join("\n");
}

export function isWin(
  state: IceSlideState,
  winCondition: WinCondition = { type: "ice_slide_escape_explicit_goal" },
): boolean {
  if (winCondition.type !== "ice_slide_escape_explicit_goal") {
    return false;
  }

  const goalRaw = readWinPoint(winCondition, "player_goal");
  if (!goalRaw) {
    return false;
  }
  const goal = toPoint(goalRaw);
  const iceKeys = new Set(state.ice.map(pointKey));
  return (
    pointKey(state.player) === pointKey(goal) &&
    [...state.targets].every((target) => iceKeys.has(target))
  );
}

export function isEventWin(events: string[], winCondition?: WinCondition): boolean {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== undefined && eventsMatchPattern(events, event);
}

export function replay(
  mechanic: MechanicDoc,
  initialState: IceSlideState,
  inputs: IceSlideAction[],
  options: IceSlideStepOptions = {},
): { state: IceSlideState; events: string[]; legal: boolean } {
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

export function step(
  mechanic: MechanicDoc,
  state: IceSlideState,
  input: IceSlideAction,
  options: IceSlideStepOptions = {},
): IceSlideStepResult {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state, input, "unsupported_input");
  }

  const dir = inputDef.dir;
  const destination = add(state.player, dir);
  if (!inBounds(state, destination) || state.walls.has(pointKey(destination))) {
    return illegal(state, input, "destination_blocked");
  }

  const iceIndex = iceIndexAt(state, destination);
  if (iceIndex !== -1) {
    if (isRuleDisabled("push_ice", options)) {
      return illegal(state, input, "push_ice_disabled");
    }
    const next = cloneState(state);
    next.ice.splice(iceIndex, 1);
    next.player = destination;
    const slide = settleIce(next, destination, dir, options);
    if (!slide.legal) {
      return {
        legal: false,
        input,
        state,
        events: slide.events,
        reason: slide.reason,
      };
    }
    return {
      legal: true,
      input,
      state: slide.state,
      events: ["push_ice", ...slide.events],
    };
  }

  if (iceIndexAt(state, destination) === -1 && isCellFreeForPlayer(state, destination)) {
    const next = cloneState(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }

  return illegal(state, input, "no_matching_rule");
}

function settleIce(
  stateWithoutMovingIce: IceSlideState,
  origin: Point,
  dir: Direction,
  options: IceSlideStepOptions,
): SlideResult {
  return continueSlide(stateWithoutMovingIce, origin, dir, 0, options, []);
}

function continueSlide(
  state: IceSlideState,
  current: Point,
  dir: Direction,
  initialDistance: number,
  options: IceSlideStepOptions,
  events: string[],
): SlideResult {
  let cursor = current;
  let distance = initialDistance;

  while (true) {
    const next = add(cursor, dir);
    if (!inBounds(state, next)) {
      return {
        legal: true,
        state: stateWithIce(state, undefined),
        events: [...events, `ice_boundary_disappear:d${distance}`],
      };
    }

    if (isIceObstacle(state, next)) {
      return resolveObstacle(state, cursor, next, dir, distance, options, events);
    }

    cursor = next;
    distance += 1;
  }
}

function resolveObstacle(
  state: IceSlideState,
  preObstacle: Point,
  obstacle: Point,
  dir: Direction,
  distance: number,
  options: IceSlideStepOptions,
  events: string[],
): SlideResult {
  if (distance === 0) {
    return {
      legal: false,
      reason: "push_ice_failed_immediate_obstacle",
      events: [...events, "push_ice_failed"],
    };
  }

  if (distance <= 2) {
    return {
      legal: true,
      state: stateWithIce(state, preObstacle),
      events: [...events, `ice_stop_short:d${distance}`],
    };
  }

  if (distance === 3) {
    return {
      legal: true,
      state: stateWithIce(state, undefined),
      events: [...events, "ice_destroyed_d3"],
    };
  }

  if (distance === 4) {
    return {
      legal: true,
      state: stateWithIce(state, subtract(preObstacle, dir)),
      events: [...events, "ice_rebound_d4"],
    };
  }

  const group = collectObstacleGroup(state, obstacle, dir);
  const afterGroup = group.afterGroup;

  if (distance === 5) {
    const passEvents = [...events, `ice_pass_through_d5:len${group.cells.length}`];
    if (!inBounds(state, afterGroup)) {
      return {
        legal: true,
        state: stateWithIce(state, undefined),
        events: [...passEvents, "ice_boundary_disappear_after_group"],
      };
    }
    return continueSlide(state, afterGroup, dir, 1, options, [
      ...passEvents,
      "slide_restart_after_group",
    ]);
  }

  const destroyedState = removeObstacleGroup(state, group.cells);
  const destroyEvents = [...events, `ice_destroy_group_d6_plus:len${group.cells.length}`];
  if (!inBounds(destroyedState, afterGroup)) {
    return {
      legal: true,
      state: stateWithIce(destroyedState, undefined),
      events: [...destroyEvents, "ice_boundary_disappear_after_group"],
    };
  }

  return continueSlide(destroyedState, afterGroup, dir, 1, options, [
    ...destroyEvents,
    "slide_restart_after_group",
  ]);
}

function collectObstacleGroup(
  state: IceSlideState,
  start: Point,
  dir: Direction,
): { cells: Point[]; afterGroup: Point } {
  const cells: Point[] = [];
  let cursor = start;
  while (inBounds(state, cursor) && isIceObstacle(state, cursor)) {
    cells.push(cursor);
    cursor = add(cursor, dir);
  }
  return { cells, afterGroup: cursor };
}

function removeObstacleGroup(state: IceSlideState, cells: Point[]): IceSlideState {
  const next = cloneState(state);
  const destroyed = new Set(cells.map(pointKey));
  for (const key of destroyed) {
    next.walls.delete(key);
  }
  next.ice = next.ice.filter((icePoint) => !destroyed.has(pointKey(icePoint)));
  return next;
}

function stateWithIce(state: IceSlideState, point: Point | undefined): IceSlideState {
  const next = cloneState(state);
  next.ice = point ? sortPoints([...next.ice, point]) : sortPoints(next.ice);
  return next;
}

function isRuleDisabled(ruleId: string, options: IceSlideStepOptions): boolean {
  return options.disabledRules?.has(ruleId) ?? false;
}

function illegal(state: IceSlideState, input: IceSlideAction, reason: string): IceSlideStepResult {
  return { legal: false, input, state, events: [], reason };
}

export function inBounds(state: Pick<IceSlideState, "width" | "height">, point: Point): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}

function isEdgeCell(state: Pick<IceSlideState, "width" | "height">, point: Point): boolean {
  return (
    inBounds(state, point) &&
    (point.x === 0 || point.y === 0 || point.x === state.width - 1 || point.y === state.height - 1)
  );
}

function isCellFreeForPlayer(state: IceSlideState, point: Point): boolean {
  return (
    inBounds(state, point) &&
    !state.walls.has(pointKey(point)) &&
    iceIndexAt(state, point) === -1
  );
}

function isIceObstacle(state: IceSlideState, point: Point): boolean {
  return state.walls.has(pointKey(point)) || iceIndexAt(state, point) !== -1;
}

function iceIndexAt(state: IceSlideState, point: Point): number {
  const key = pointKey(point);
  return state.ice.findIndex((icePoint) => pointKey(icePoint) === key);
}

function sortPoints(points: Point[]): Point[] {
  return [...points].sort((left, right) => left.y - right.y || left.x - right.x);
}

function pointFromKey(key: string): Point {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

function readWinPoint(
  winCondition: WinCondition | undefined,
  field: "player_start" | "player_goal",
): [number, number] | { x: number; y: number } | undefined {
  const value = (winCondition as Record<string, unknown> | undefined)?.[field];
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  ) {
    return [value[0], value[1]];
  }
  if (
    value &&
    typeof value === "object" &&
    typeof (value as { x?: unknown }).x === "number" &&
    typeof (value as { y?: unknown }).y === "number"
  ) {
    return value as { x: number; y: number };
  }
  return undefined;
}

function toPoint(value: [number, number] | { x: number; y: number }): Point {
  return Array.isArray(value) ? { x: value[0], y: value[1] } : value;
}
