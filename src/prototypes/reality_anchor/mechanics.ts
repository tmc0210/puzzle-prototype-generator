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
import type { VisualBoard, VisualLayer, VisualTile } from "../runtimeAdapter.js";

export type RealityAnchorAction = InputId;

export type PushPullAnchor = {
  push: Point;
  pull: Point;
};

export type BoxStickyAnchor = {
  box: Point;
  sticky: Point;
};

export type RealityAnchorState = {
  width: number;
  height: number;
  walls: Set<string>;
  goals: Set<string>;
  player: Point;
  crates: Point[];
  stickyGroups: Point[][];
  pushPullAnchor?: PushPullAnchor;
  boxStickyAnchor?: BoxStickyAnchor;
};

export type RealityAnchorStepResult = {
  legal: boolean;
  input: RealityAnchorAction;
  state: RealityAnchorState;
  events: string[];
  reason?: string;
};

type ObjectId =
  | `crate:${number}`
  | `sticky:${number}`
  | "anchor:push_pull"
  | "anchor:box_sticky";

type ObjectKind = "crate" | "sticky" | "anchor";

type ForcePlan =
  | {
      legal: true;
      objectIds: Set<ObjectId>;
    }
  | {
      legal: false;
      reason: string;
    };

type NormalizeSource = {
  point: Point;
  source: string;
  sourceKind: "crate" | "sticky";
};

type NormalizeResult = {
  state: RealityAnchorState;
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

export function parseLevel(level: LevelDoc): RealityAnchorState {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }
  if (lines.length === 0) {
    throw new Error(`Level ${level.id} has empty layout`);
  }

  const width = Math.max(...lines.map((line) => line.length));
  if (width === 0) {
    throw new Error(`Level ${level.id} has zero-width layout`);
  }
  const height = lines.length;
  const walls = new Set<string>();
  const goals = new Set<string>();
  const crates: Point[] = [];
  const rawSticky: Point[] = [];
  const pCells: Point[] = [];
  const lCells: Point[] = [];
  const bCells: Point[] = [];
  const sCells: Point[] = [];
  let player: Point | undefined;

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
        case "+":
          goals.add(pointKey(point));
          player = assignPlayer(level, player, point);
          break;
        case "*":
          goals.add(pointKey(point));
          crates.push(point);
          break;
        case "m":
          goals.add(pointKey(point));
          rawSticky.push(point);
          break;
        case "@":
          player = assignPlayer(level, player, point);
          break;
        case "C":
          crates.push(point);
          break;
        case "M":
          rawSticky.push(point);
          break;
        case "P":
          pCells.push(point);
          break;
        case "L":
          lCells.push(point);
          break;
        case "B":
          bCells.push(point);
          break;
        case "S":
          sCells.push(point);
          break;
        case ".":
        case " ":
          break;
        default:
          throw new Error(`Level ${level.id} has unsupported glyph '${glyph}' at ${x},${y}`);
      }
    }
  }

  if (!player) {
    throw new Error(`Level ${level.id} has no player`);
  }
  if (goals.size === 0) {
    throw new Error(`Level ${level.id} must contain at least one target`);
  }

  const pushPullAnchor = parsePushPullAnchor(level, pCells, lCells);
  const { anchor: boxStickyAnchor, stickyCells } = parseBoxStickyAnchor(
    level,
    bCells,
    sCells,
    rawSticky,
  );
  const state: RealityAnchorState = {
    width,
    height,
    walls,
    goals,
    player,
    crates: sortPoints(crates),
    stickyGroups: stickyCells.map((point) => [point]),
    ...(pushPullAnchor ? { pushPullAnchor } : {}),
    ...(boxStickyAnchor ? { boxStickyAnchor } : {}),
  };

  validateNoOverlap(level, state);
  return normalizeState(state, { emitEvents: false }).state;
}

function assignPlayer(level: LevelDoc, current: Point | undefined, point: Point): Point {
  if (current) {
    throw new Error(`Level ${level.id} has multiple players`);
  }
  return point;
}

function parsePushPullAnchor(
  level: LevelDoc,
  pCells: Point[],
  lCells: Point[],
): PushPullAnchor | undefined {
  if (pCells.length === 0 && lCells.length === 0) {
    return undefined;
  }
  if (pCells.length !== 1 || lCells.length !== 1) {
    throw new Error(`Level ${level.id} must have exactly one P and one L for the push/pull anchor`);
  }
  const push = pCells[0]!;
  const pull = lCells[0]!;
  if (!areAdjacent(push, pull)) {
    throw new Error(`Level ${level.id} P and L anchor cells must be orthogonally adjacent`);
  }
  return { push, pull };
}

function parseBoxStickyAnchor(
  level: LevelDoc,
  bCells: Point[],
  sCells: Point[],
  rawSticky: Point[],
): { anchor?: BoxStickyAnchor; stickyCells: Point[] } {
  if (bCells.length === 0 && sCells.length === 0) {
    if (rawSticky.length > 0) {
      throw new Error(`Level ${level.id} has sticky M cells but no B/S anchor`);
    }
    return { stickyCells: [] };
  }
  if (bCells.length !== 1 || sCells.length !== 1) {
    throw new Error(`Level ${level.id} must have exactly one B and one S for the B/S anchor`);
  }
  const box = bCells[0]!;
  const sticky = sCells[0]!;
  if (!areAdjacent(box, sticky)) {
    throw new Error(
      `Level ${level.id} B and S anchor labels must be orthogonally adjacent`,
    );
  }
  return {
    anchor: { box, sticky },
    stickyCells: rawSticky,
  };
}

function validateNoOverlap(level: LevelDoc, state: RealityAnchorState): void {
  const occupied = new Map<string, string>();
  const claim = (point: Point, label: string): void => {
    const key = pointKey(point);
    if (state.walls.has(key)) {
      throw new Error(`Level ${level.id} places ${label} on a wall at ${key}`);
    }
    const previous = occupied.get(key);
    if (previous) {
      throw new Error(`Level ${level.id} overlaps ${previous} and ${label} at ${key}`);
    }
    occupied.set(key, label);
  };

  claim(state.player, "player");
  for (const [index, crate] of state.crates.entries()) {
    claim(crate, `crate#${index + 1}`);
  }
  for (const [groupIndex, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      claim(point, `sticky#${groupIndex + 1}`);
    }
  }
  for (const point of pushPullCells(state)) {
    claim(point, "push_pull_anchor");
  }
  for (const point of boxStickyCells(state)) {
    claim(point, "box_sticky_anchor");
  }
}

export function cloneState(state: RealityAnchorState): RealityAnchorState {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    goals: new Set(state.goals),
    player: { ...state.player },
    crates: state.crates.map((point) => ({ ...point })),
    stickyGroups: state.stickyGroups.map((group) => group.map((point) => ({ ...point }))),
    ...(state.pushPullAnchor
      ? {
          pushPullAnchor: {
            push: { ...state.pushPullAnchor.push },
            pull: { ...state.pushPullAnchor.pull },
          },
        }
      : {}),
    ...(state.boxStickyAnchor
      ? {
          boxStickyAnchor: {
            box: { ...state.boxStickyAnchor.box },
            sticky: { ...state.boxStickyAnchor.sticky },
          },
        }
      : {}),
  };
}

export function stateKey(state: RealityAnchorState): string {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups.map(groupKey).sort().join("|");
  const pushPull = state.pushPullAnchor
    ? `P:${pointKey(state.pushPullAnchor.push)};L:${pointKey(state.pushPullAnchor.pull)}`
    : "none";
  const boxSticky = state.boxStickyAnchor
    ? `B:${pointKey(state.boxStickyAnchor.box)};S:${pointKey(state.boxStickyAnchor.sticky)}`
    : "none";
  return [
    `Ply:${pointKey(state.player)}`,
    `C:${crates}`,
    `M:${sticky}`,
    `PL:${pushPull}`,
    `BS:${boxSticky}`,
  ].join("|");
}

export function renderState(state: RealityAnchorState): string {
  const rows = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => "."),
  );

  for (const key of state.goals) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "#";
  }
  for (const crate of state.crates) {
    rows[crate.y]![crate.x] = state.goals.has(pointKey(crate)) ? "*" : "C";
  }
  for (const group of state.stickyGroups) {
    for (const point of group) {
      rows[point.y]![point.x] = state.goals.has(pointKey(point)) ? "m" : "M";
    }
  }
  if (state.pushPullAnchor) {
    rows[state.pushPullAnchor.push.y]![state.pushPullAnchor.push.x] = "P";
    rows[state.pushPullAnchor.pull.y]![state.pushPullAnchor.pull.x] = "L";
  }
  if (state.boxStickyAnchor) {
    rows[state.boxStickyAnchor.box.y]![state.boxStickyAnchor.box.x] = "B";
    rows[state.boxStickyAnchor.sticky.y]![state.boxStickyAnchor.sticky.x] = "S";
  }
  rows[state.player.y]![state.player.x] = state.goals.has(pointKey(state.player)) ? "+" : "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}

export function renderVisualState(state: RealityAnchorState): VisualBoard {
  const tiles = Array.from({ length: state.height }, (_, y) =>
    Array.from({ length: state.width }, (_, x): VisualTile => {
      const point = { x, y };
      const terrainSide = boxStickySideAt(state, point);
      return {
        x,
        y,
        terrain: state.walls.has(pointKey(point))
          ? visualLayer(
              `ra.terrain.wall.${terrainSide}_side`,
              "#",
              `${terrainSide} side wall`,
              ["terrain", "wall", `${terrainSide}_side`],
            )
          : visualLayer(
              `ra.terrain.floor.${terrainSide}_side`,
              " ",
              `${terrainSide} side floor`,
              ["terrain", "floor", `${terrainSide}_side`],
            ),
      };
    }),
  );

  const tileAt = (point: Point): VisualTile => tiles[point.y]![point.x]!;

  for (const key of state.goals) {
    const point = pointFromKey(key);
    tileAt(point).target = visualLayer("target.goal", "G", "goal");
  }

  for (const crate of state.crates) {
    const side = boxStickySideAt(state, crate);
    pushLayer(tileAt(crate), "objects", visualLayer(
      `ra.crate.${side}_side`,
      "C",
      `${side} side crate`,
      ["crate", `${side}_side`],
    ));
  }

  for (const [groupIndex, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      const side = boxStickySideAt(state, point);
      pushLayer(tileAt(point), "objects", visualLayer(
        `ra.sticky.${side}_side`,
        "M",
        `${side} side sticky block`,
        ["sticky", `${side}_side`, `group_${groupIndex}`, ...stickyJoinTags(group, point)],
      ));
    }
  }

  if (state.pushPullAnchor) {
    const pushJoin = joinDirection(state.pushPullAnchor.push, state.pushPullAnchor.pull);
    const pullJoin = joinDirection(state.pushPullAnchor.pull, state.pushPullAnchor.push);
    pushLayer(tileAt(state.pushPullAnchor.push), "objects", visualLayer(
      `ra.anchor.push_end.join_${pushJoin}`,
      "P",
      "push anchor end",
      ["anchor", "push_side", `join_${pushJoin}`],
    ));
    pushLayer(tileAt(state.pushPullAnchor.pull), "objects", visualLayer(
      `ra.anchor.pull_end.join_${pullJoin}`,
      "L",
      "pull anchor end",
      ["anchor", "pull_side", `join_${pullJoin}`],
    ));
  }

  if (state.boxStickyAnchor) {
    const boxJoin = joinDirection(state.boxStickyAnchor.box, state.boxStickyAnchor.sticky);
    const stickyJoin = joinDirection(state.boxStickyAnchor.sticky, state.boxStickyAnchor.box);
    pushLayer(tileAt(state.boxStickyAnchor.box), "objects", visualLayer(
      `ra.anchor.box_end.join_${boxJoin}`,
      "B",
      "box anchor end",
      ["anchor", "box_side", `join_${boxJoin}`],
    ));
    pushLayer(tileAt(state.boxStickyAnchor.sticky), "objects", visualLayer(
      `ra.anchor.sticky_end.join_${stickyJoin}`,
      "S",
      "sticky anchor end",
      ["anchor", "sticky_side", `join_${stickyJoin}`],
    ));
  }

  const mode = forceModeAt(state, state.player);
  pushLayer(tileAt(state.player), "actors", visualLayer(
    `ra.player.${mode}_side`,
    "@",
    `${mode} side player`,
    ["player", `${mode}_side`],
  ));

  return { width: state.width, height: state.height, tiles: tiles.flat() };
}

function visualLayer(
  visualKey: string,
  fallbackGlyph: string,
  label: string,
  tags: string[] = [],
): VisualLayer {
  return { visualKey, fallbackGlyph, label, tags };
}

function pushLayer(
  tile: VisualTile,
  slot: "actors" | "objects",
  layer: VisualLayer,
): void {
  tile[slot] = [...(tile[slot] ?? []), layer];
}

function joinDirection(from: Point, to: Point): Direction {
  if (to.x < from.x) {
    return "left";
  }
  if (to.x > from.x) {
    return "right";
  }
  if (to.y < from.y) {
    return "up";
  }
  return "down";
}

function stickyJoinTags(group: Point[], point: Point): string[] {
  const cells = new Set(group.map(pointKey));
  const tags: string[] = [];
  for (const dir of Object.keys(vectors) as Direction[]) {
    if (cells.has(pointKey(add(point, dir)))) {
      tags.push(`join_${dir}`);
    }
  }
  return tags;
}

export function isWin(
  state: RealityAnchorState,
  winCondition: WinCondition = { type: "all_targets_covered_by_objects" },
): boolean {
  switch (winCondition.type) {
    case "all_targets_covered_by_objects": {
      if (state.goals.size === 0) {
        return false;
      }
      const occupied = objectOccupancy(state);
      return [...state.goals].every((goal) => occupied.has(goal));
    }
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
  initialState: RealityAnchorState,
  inputs: RealityAnchorAction[],
  options: SolverOptions = {},
): { state: RealityAnchorState; events: string[]; legal: boolean } {
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
  state: RealityAnchorState,
  input: RealityAnchorAction,
  options: SolverOptions = {},
): RealityAnchorStepResult {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state, input, "unsupported_input");
  }

  const dir = inputDef.dir;
  return forceModeAt(state, state.player) === "pull"
    ? stepPull(state, input, dir, options)
    : stepPush(state, input, dir, options);
}

function stepPush(
  state: RealityAnchorState,
  input: RealityAnchorAction,
  dir: Direction,
  options: SolverOptions,
): RealityAnchorStepResult {
  const destination = add(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal(state, input, "destination_blocked");
  }

  const targetObject = objectIdAt(state, destination);
  if (targetObject) {
    return stepForce(state, input, dir, destination, targetObject, "push", options);
  }

  if (!isFreeForPlayer(state, destination)) {
    return illegal(state, input, "destination_occupied");
  }

  const moved = cloneState(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}

function stepPull(
  state: RealityAnchorState,
  input: RealityAnchorAction,
  dir: Direction,
  options: SolverOptions,
): RealityAnchorStepResult {
  const destination = add(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal(state, input, "destination_blocked");
  }

  const behind = subtract(state.player, dir);
  const targetObject = objectIdAt(state, behind);
  if (targetObject) {
    return stepForce(state, input, dir, destination, targetObject, "pull", options);
  }

  if (!isFreeForPlayer(state, destination)) {
    return illegal(state, input, "destination_occupied");
  }

  const moved = cloneState(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}

function stepForce(
  state: RealityAnchorState,
  input: RealityAnchorAction,
  dir: Direction,
  playerDestination: Point,
  targetObject: ObjectId,
  force: "push" | "pull",
  options: SolverOptions,
): RealityAnchorStepResult {
  const ruleId = force === "push" ? "push_force" : "pull_force";
  if (isRuleDisabled(ruleId, options)) {
    return illegal(state, input, `${ruleId}_disabled`);
  }

  const plan = planObjectMove(state, targetObject, dir);
  if (!plan.legal) {
    return illegal(state, input, plan.reason);
  }

  const moved = translatePlannedObjects(state, plan.objectIds, dir);
  if (objectIdAt(moved, playerDestination)) {
    return illegal(state, input, "player_destination_occupied");
  }

  moved.player = playerDestination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return {
    legal: true,
    input,
    state: normalized.state,
    events: [
      `${force}_object:${describeObject(targetObject)}`,
      ...forceEvents(state, plan.objectIds),
      ...normalized.events,
    ],
  };
}

function planObjectMove(
  state: RealityAnchorState,
  startObject: ObjectId,
  dir: Direction,
): ForcePlan {
  const moving = new Set<ObjectId>();
  const occupancy = objectOccupancy(state);

  const visit = (objectId: ObjectId): string | undefined => {
    if (moving.has(objectId)) {
      return undefined;
    }
    moving.add(objectId);

    for (const cell of objectCells(state, objectId)) {
      const target = add(cell, dir);
      const targetKey = pointKey(target);
      if (!inBounds(state, target) || state.walls.has(targetKey)) {
        return "force_blocked";
      }
      const blocker = occupancy.get(targetKey);
      if (blocker && blocker !== objectId) {
        const blocked = visit(blocker);
        if (blocked) {
          return blocked;
        }
      }
    }

    return undefined;
  };

  const reason = visit(startObject);
  return reason ? { legal: false, reason } : { legal: true, objectIds: moving };
}

function translatePlannedObjects(
  state: RealityAnchorState,
  objectIds: Set<ObjectId>,
  dir: Direction,
): RealityAnchorState {
  const next = cloneState(state);
  for (const objectId of objectIds) {
    if (objectId.startsWith("crate:")) {
      const index = Number(objectId.slice("crate:".length));
      const crate = next.crates[index];
      if (crate) {
        next.crates[index] = add(crate, dir);
      }
      continue;
    }
    if (objectId.startsWith("sticky:")) {
      const index = Number(objectId.slice("sticky:".length));
      const group = next.stickyGroups[index];
      if (group) {
        next.stickyGroups[index] = group.map((point) => add(point, dir));
      }
      continue;
    }
    if (objectId === "anchor:push_pull" && next.pushPullAnchor) {
      next.pushPullAnchor = {
        push: add(next.pushPullAnchor.push, dir),
        pull: add(next.pushPullAnchor.pull, dir),
      };
      continue;
    }
    if (objectId === "anchor:box_sticky" && next.boxStickyAnchor) {
      next.boxStickyAnchor = {
        box: add(next.boxStickyAnchor.box, dir),
        sticky: add(next.boxStickyAnchor.sticky, dir),
      };
    }
  }
  return next;
}

function normalizeState(
  state: RealityAnchorState,
  config: { emitEvents: boolean; options?: SolverOptions },
): NormalizeResult {
  if (isRuleDisabled("box_sticky_normalize", config.options)) {
    return { state: cloneState(state), events: [] };
  }

  const sources: NormalizeSource[] = [
    ...state.crates.map((point, index) => ({
      point,
      source: `crate:${index}`,
      sourceKind: "crate" as const,
    })),
    ...state.stickyGroups.flatMap((group, index) =>
      group.map((point) => ({
        point,
        source: `sticky:${index}`,
        sourceKind: "sticky" as const,
      })),
    ),
  ];

  const crateCells: Point[] = [];
  const stickyCells: NormalizeSource[] = [];
  let boxToSticky = 0;
  let stickyToBox = 0;

  for (const source of sources) {
    const side = boxStickySideAt(state, source.point);
    if (side === "sticky") {
      stickyCells.push(source);
      if (source.sourceKind === "crate") {
        boxToSticky += 1;
      }
    } else {
      crateCells.push(source.point);
      if (source.sourceKind === "sticky") {
        stickyToBox += 1;
      }
    }
  }

  const components = connectedStickyComponents(stickyCells);
  const events: string[] = [];
  if (config.emitEvents) {
    if (boxToSticky > 0) {
      events.push(`box_to_sticky:n${boxToSticky}`);
    }
    if (stickyToBox > 0) {
      events.push(`sticky_to_box:n${stickyToBox}`);
    }
    const merges = components.filter(
      (component) => new Set(component.map((cell) => cell.source)).size > 1,
    ).length;
    if (merges > 0) {
      events.push(`sticky_merge:n${merges}`);
    }
    const sourceComponentCounts = new Map<string, number>();
    for (const component of components) {
      const sourcesInComponent = new Set(component.map((cell) => cell.source));
      for (const source of sourcesInComponent) {
        if (source.startsWith("sticky:")) {
          sourceComponentCounts.set(source, (sourceComponentCounts.get(source) ?? 0) + 1);
        }
      }
    }
    const splitCount = [...sourceComponentCounts.values()].filter((count) => count > 1).length;
    if (splitCount > 0) {
      events.push(`sticky_split:n${splitCount}`);
    }
  }

  const normalized: RealityAnchorState = {
    ...cloneState(state),
    crates: sortPoints(crateCells),
    stickyGroups: sortGroups(components.map((component) => sortPoints(component.map((cell) => cell.point)))),
  };
  return { state: normalized, events };
}

function connectedStickyComponents(cells: NormalizeSource[]): NormalizeSource[][] {
  const byKey = new Map(cells.map((cell) => [pointKey(cell.point), cell]));
  const visited = new Set<string>();
  const components: NormalizeSource[][] = [];

  for (const cell of cells) {
    const key = pointKey(cell.point);
    if (visited.has(key)) {
      continue;
    }
    const queue = [cell];
    const component: NormalizeSource[] = [];
    visited.add(key);
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const current = queue[cursor]!;
      component.push(current);
      for (const dir of Object.keys(vectors) as Direction[]) {
        const neighbor = add(current.point, dir);
        const neighborKey = pointKey(neighbor);
        const neighborCell = byKey.get(neighborKey);
        if (neighborCell && !visited.has(neighborKey)) {
          visited.add(neighborKey);
          queue.push(neighborCell);
        }
      }
    }
    components.push(component);
  }

  return components;
}

function forceEvents(state: RealityAnchorState, objectIds: Set<ObjectId>): string[] {
  const events: string[] = [];
  if (objectIds.size > 1) {
    events.push(`force_chain:n${objectIds.size}`);
  }
  if (objectIds.has("anchor:push_pull")) {
    events.push("anchor_boundary_shift:push_pull");
  }
  if (objectIds.has("anchor:box_sticky")) {
    events.push("anchor_boundary_shift:box_sticky");
  }
  const movedKinds = new Set([...objectIds].map((id) => objectKind(state, id)));
  if (movedKinds.has("sticky")) {
    events.push("move_sticky_rigid");
  }
  return events;
}

export function forceModeAt(state: RealityAnchorState, point: Point): "push" | "pull" {
  const anchor = state.pushPullAnchor;
  if (!anchor) {
    return "push";
  }
  return isOnFirstAnchorSide(anchor.push, anchor.pull, point) ? "push" : "pull";
}

export function boxStickySideAt(state: RealityAnchorState, point: Point): "box" | "sticky" {
  const anchor = state.boxStickyAnchor;
  if (!anchor) {
    return "box";
  }
  return isOnFirstAnchorSide(anchor.box, anchor.sticky, point) ? "box" : "sticky";
}

function isOnFirstAnchorSide(first: Point, second: Point, point: Point): boolean {
  if (first.x !== second.x) {
    return first.x < second.x ? point.x <= first.x : point.x >= first.x;
  }
  return first.y < second.y ? point.y <= first.y : point.y >= first.y;
}

function objectIdAt(state: RealityAnchorState, point: Point): ObjectId | undefined {
  return objectOccupancy(state).get(pointKey(point));
}

function objectOccupancy(state: RealityAnchorState): Map<string, ObjectId> {
  const occupancy = new Map<string, ObjectId>();
  for (const [index, crate] of state.crates.entries()) {
    occupancy.set(pointKey(crate), `crate:${index}`);
  }
  for (const [index, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      occupancy.set(pointKey(point), `sticky:${index}`);
    }
  }
  if (state.pushPullAnchor) {
    for (const point of pushPullCells(state)) {
      occupancy.set(pointKey(point), "anchor:push_pull");
    }
  }
  if (state.boxStickyAnchor) {
    for (const point of boxStickyCells(state)) {
      occupancy.set(pointKey(point), "anchor:box_sticky");
    }
  }
  return occupancy;
}

function objectCells(state: RealityAnchorState, objectId: ObjectId): Point[] {
  if (objectId.startsWith("crate:")) {
    const index = Number(objectId.slice("crate:".length));
    const crate = state.crates[index];
    return crate ? [crate] : [];
  }
  if (objectId.startsWith("sticky:")) {
    const index = Number(objectId.slice("sticky:".length));
    return state.stickyGroups[index] ?? [];
  }
  if (objectId === "anchor:push_pull") {
    return pushPullCells(state);
  }
  return boxStickyCells(state);
}

function objectKind(state: RealityAnchorState, objectId: ObjectId): ObjectKind {
  void state;
  if (objectId.startsWith("crate:")) {
    return "crate";
  }
  if (objectId.startsWith("sticky:")) {
    return "sticky";
  }
  return "anchor";
}

function describeObject(objectId: ObjectId): string {
  if (objectId.startsWith("crate:")) {
    return `crate#${Number(objectId.slice("crate:".length)) + 1}`;
  }
  if (objectId.startsWith("sticky:")) {
    return `sticky#${Number(objectId.slice("sticky:".length)) + 1}`;
  }
  return objectId === "anchor:push_pull" ? "push_pull_anchor" : "box_sticky_anchor";
}

function pushPullCells(state: RealityAnchorState): Point[] {
  return state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : [];
}

function boxStickyCells(state: RealityAnchorState): Point[] {
  return state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : [];
}

function isRuleDisabled(ruleId: string, options: SolverOptions | undefined): boolean {
  return options?.disabledRules?.has(ruleId) ?? false;
}

function illegal(
  state: RealityAnchorState,
  input: RealityAnchorAction,
  reason: string,
): RealityAnchorStepResult {
  return { legal: false, input, state, events: [], reason };
}

function isFreeForPlayer(state: RealityAnchorState, point: Point): boolean {
  return !isWallOrBounds(state, point) && !objectIdAt(state, point);
}

function isWallOrBounds(state: RealityAnchorState, point: Point): boolean {
  return !inBounds(state, point) || state.walls.has(pointKey(point));
}

function inBounds(state: Pick<RealityAnchorState, "width" | "height">, point: Point): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}

function areAdjacent(left: Point, right: Point): boolean {
  return Math.abs(left.x - right.x) + Math.abs(left.y - right.y) === 1;
}

function samePoint(left: Point, right: Point): boolean {
  return left.x === right.x && left.y === right.y;
}

function sortPoints(points: Point[]): Point[] {
  return [...points].sort((left, right) => left.y - right.y || left.x - right.x);
}

function sortGroups(groups: Point[][]): Point[][] {
  return [...groups].sort((left, right) => groupKey(left).localeCompare(groupKey(right)));
}

function groupKey(group: Point[]): string {
  return sortPoints(group).map(pointKey).join(";");
}

function pointFromKey(key: string): Point {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}
