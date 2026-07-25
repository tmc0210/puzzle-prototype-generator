import type {
  Direction,
  InputId,
  LevelDoc,
  MechanicDoc,
  Point,
  WinCondition,
} from "../../core/types.js";
import { eventType, eventsMatchPattern } from "../../core/events.js";

export type CandleAction = InputId;

export type Candle = {
  id: string;
  digit?: string;
  bodyCells: Point[];
  axis: "horizontal" | "vertical";
  wickDir: Direction;
  lit: boolean;
};

export type Brazier = {
  position: Point;
  lit: boolean;
};

export type CandleSokobanState = {
  width: number;
  height: number;
  walls: Set<string>;
  player: Point;
  dead: boolean;
  globalBurnCycle: number;
  globalBurnCountdown: number;
  candles: Candle[];
  braziers: Brazier[];
};

export type CandleSokobanStepOptions = {
  disabledRules?: Set<string>;
  disabledBranches?: Set<string>;
  winCondition?: WinCondition;
  maxStates?: number;
  maxDepth?: number;
};

export type CandleSokobanStepResult = {
  legal: boolean;
  input: CandleAction;
  state: CandleSokobanState;
  events: string[];
  reason?: string;
};

type WickProjection = {
  candle: Candle;
  point: Point;
  inBounds: boolean;
  concealed: boolean;
  concealedBy: "wall" | "candle_body" | null;
};

type WickProjectionSnapshot = {
  concealed: boolean;
};

type RollStepRecord = {
  distance: number;
  events: string[];
  allBraziersLit: boolean;
};

const defaultBurnCycle = 5;

const vectors: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const capDirections: Record<string, Direction> = {
  u: "up",
  r: "right",
  d: "down",
  l: "left",
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

export function parseLevel(
  level: LevelDoc,
  burnCycle = readGlobalBurnCycle(level),
): CandleSokobanState {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines[0]?.trim() === "") {
    lines.shift();
  }
  while (lines.length > 0 && lines.at(-1)?.trim() === "") {
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
  const braziers: Brazier[] = [];
  const capCells: Array<{ glyph: string; point: Point }> = [];
  const digitCells = new Map<string, string>();
  let player: Point | undefined;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const glyph = lines[y]![x]!;
      const point = { x, y };
      if (glyph === "#") {
        walls.add(pointKey(point));
      } else if (glyph === "@") {
        if (player) {
          throw new Error(`Level ${level.id} has multiple players`);
        }
        player = point;
      } else if (glyph === "o" || glyph === "O") {
        braziers.push({ position: point, lit: glyph === "O" });
      } else if (/^[1-9]$/.test(glyph)) {
        digitCells.set(pointKey(point), glyph);
      } else if (/^[urdlURDL]$/.test(glyph)) {
        capCells.push({ glyph, point });
      } else if (glyph !== "." && glyph !== " ") {
        throw new Error(`Level ${level.id} has unsupported glyph '${glyph}' at ${x},${y}`);
      }
    }
  }

  if (!player) {
    throw new Error(`Level ${level.id} has no player`);
  }

  const claimedDigits = new Map<string, string>();
  const usedCandleDigits = new Set<string>();
  let singletonIndex = 0;
  const candles = capCells.map(({ glyph, point }) => {
    const wickDir = capDirections[glyph.toLowerCase()];
    if (!wickDir) {
      throw new Error(`Level ${level.id} has invalid candle cap '${glyph}' at ${pointKey(point)}`);
    }
    const axis = wickDir === "left" || wickDir === "right" ? "horizontal" : "vertical";
    const backward = oppositeDirection(wickDir);
    const firstBodyPoint = add(point, backward);
    const digit = digitCells.get(pointKey(firstBodyPoint));
    const cellsFromCap: Point[] = [{ ...point }];

    if (digit) {
      if (usedCandleDigits.has(digit)) {
        throw new Error(`Level ${level.id} uses candle digit '${digit}' more than once`);
      }
      usedCandleDigits.add(digit);
      let cursor = firstBodyPoint;
      while (digitCells.get(pointKey(cursor)) === digit) {
        const key = pointKey(cursor);
        const owner = claimedDigits.get(key);
        if (owner) {
          throw new Error(`Level ${level.id} digit cell ${key} is claimed by ${owner} and candle#${digit}`);
        }
        claimedDigits.set(key, `candle#${digit}`);
        cellsFromCap.push({ ...cursor });
        cursor = add(cursor, backward);
      }
    }

    singletonIndex += 1;
    return {
      id: digit ? `candle#${digit}` : `candle#single${singletonIndex}`,
      ...(digit ? { digit } : {}),
      bodyCells: cellsFromCap.reverse(),
      axis,
      wickDir,
      lit: glyph === glyph.toUpperCase(),
    } satisfies Candle;
  });

  for (const key of digitCells.keys()) {
    if (!claimedDigits.has(key)) {
      throw new Error(`Level ${level.id} has unclaimed candle body digit at ${key}`);
    }
  }

  if (braziers.length === 0 && level.win?.type !== "event_occurs") {
    throw new Error(`Level ${level.id} has no brazier`);
  }

  const state: CandleSokobanState = {
    width,
    height,
    walls,
    player,
    dead: false,
    globalBurnCycle: burnCycle,
    globalBurnCountdown: burnCycle,
    candles: sortCandles(candles),
    braziers: sortBraziers(braziers),
  };
  validateInitialOccupancy(level, state);
  const initialEvents: string[] = [];
  settleContacts(state, initialEvents);
  if (initialEvents.length > 0) {
    throw new Error(
      `Level ${level.id} changes during silent initial contact settlement: ${initialEvents.join(", ")}`,
    );
  }
  return state;
}

function validateInitialOccupancy(level: LevelDoc, state: CandleSokobanState): void {
  const occupied = new Map<string, string>();
  const claim = (point: Point, owner: string): void => {
    const key = pointKey(point);
    const previous = occupied.get(key);
    if (previous) {
      throw new Error(`Level ${level.id} overlaps ${previous} and ${owner} at ${key}`);
    }
    occupied.set(key, owner);
  };

  claim(state.player, "player");
  for (const candle of state.candles) {
    for (const cell of candle.bodyCells) {
      claim(cell, candle.id);
    }
  }
  for (const brazier of state.braziers) {
    claim(brazier.position, "brazier");
  }
  for (const [key, owner] of occupied) {
    if (state.walls.has(key)) {
      throw new Error(`Level ${level.id} overlaps wall and ${owner} at ${key}`);
    }
  }
}

export function cloneState(state: CandleSokobanState): CandleSokobanState {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    player: { ...state.player },
    dead: state.dead,
    globalBurnCycle: state.globalBurnCycle,
    globalBurnCountdown: state.globalBurnCountdown,
    candles: state.candles.map((candle) => ({
      ...candle,
      bodyCells: candle.bodyCells.map((cell) => ({ ...cell })),
    })),
    braziers: state.braziers.map((brazier) => ({
      position: { ...brazier.position },
      lit: brazier.lit,
    })),
  };
}

export function stateKey(state: CandleSokobanState): string {
  const candles = sortCandles(state.candles)
    .map((candle) =>
      [
        candle.id,
        candle.digit ?? "-",
        candle.wickDir,
        candle.lit ? "1" : "0",
        candle.bodyCells.map(pointKey).join(";"),
      ].join(":"),
    )
    .join("|");
  const braziers = sortBraziers(state.braziers)
    .map((brazier) => `${pointKey(brazier.position)}:${brazier.lit ? "1" : "0"}`)
    .join(";");
  return [
    `P:${pointKey(state.player)}`,
    `D:${state.dead ? "1" : "0"}`,
    `T:${state.globalBurnCountdown}/${state.globalBurnCycle}`,
    `C:${candles}`,
    `B:${braziers}`,
  ].join("|");
}

export function renderState(state: CandleSokobanState): string {
  const rows = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => "."),
  );

  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "#";
  }
  for (const brazier of state.braziers) {
    rows[brazier.position.y]![brazier.position.x] = brazier.lit ? "O" : "o";
  }
  for (const candle of state.candles) {
    for (const [index, cell] of candle.bodyCells.entries()) {
      const isCap = index === candle.bodyCells.length - 1;
      rows[cell.y]![cell.x] = isCap
        ? capGlyph(candle.wickDir, candle.lit)
        : (candle.digit ?? "?");
    }
  }
  rows[state.player.y]![state.player.x] = "@";

  return rows.map((row) => row.join("")).join("\n");
}

export function describeState(state: CandleSokobanState): string[] {
  return [`COUNTDOWN ${state.globalBurnCountdown}`];
}

export function isWin(
  state: CandleSokobanState,
  winCondition: WinCondition = { type: "all_braziers_lit" },
): boolean {
  if (state.dead) {
    return false;
  }
  if (winCondition.type === "all_braziers_lit") {
    return state.braziers.length > 0 && state.braziers.every((brazier) => brazier.lit);
  }
  return false;
}

export function isCandleSearchTerminal(
  state: CandleSokobanState,
  winCondition: WinCondition = { type: "all_braziers_lit" },
): boolean {
  if (state.dead || isWin(state, winCondition)) {
    return true;
  }
  return winCondition.type === "all_braziers_lit" && state.candles.length === 0;
}

export function isEventWin(events: string[], winCondition?: WinCondition): boolean {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== undefined
    ? eventsMatchPattern(events, event)
    : false;
}

export function replay(
  mechanic: MechanicDoc,
  initialState: CandleSokobanState,
  inputs: CandleAction[],
  options: CandleSokobanStepOptions = {},
): { state: CandleSokobanState; events: string[]; legal: boolean } {
  let state = initialState;
  const events: string[] = [];
  let legal = true;

  for (const input of inputs) {
    const result = step(mechanic, state, input, options);
    events.push(...result.events);
    if (!result.legal) {
      legal = false;
      continue;
    }
    state = result.state;
  }
  return { state, events, legal };
}

export function step(
  mechanic: MechanicDoc,
  state: CandleSokobanState,
  input: CandleAction,
  options: CandleSokobanStepOptions = {},
): CandleSokobanStepResult {
  if (state.dead) {
    return illegal(state, input, "player_dead");
  }

  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state, input, "unsupported_input");
  }

  const dir = inputDef.dir;
  const destination = add(state.player, dir);
  if (!inBounds(state, destination) || state.walls.has(pointKey(destination))) {
    return illegal(state, input, "destination_blocked");
  }
  if (brazierAt(state, destination)) {
    return illegal(state, input, "brazier_blocked");
  }

  const events: string[] = [];
  const next = cloneState(state);
  const candle = candleAt(next, destination);
  let pendingDeath = false;
  let deathSources: string[] = [];

  if (candle) {
    if (isRuleDisabled("move_candle", options)) {
      return illegal(state, input, "move_candle_disabled");
    }
    const inputAxis = dir === "left" || dir === "right" ? "horizontal" : "vertical";
    if (inputAxis === candle.axis) {
      if (!canTranslateCandle(next, candle, dir)) {
        return illegal(state, input, "axis_push_blocked");
      }
      const previousProjections = snapshotWickProjections(next);
      translateCandle(candle, dir);
      next.player = destination;
      events.push(`push_axis:${candle.id}`);
      settleContacts(next, events, previousProjections);
    } else {
      let distance = 0;
      const rollSteps: RollStepRecord[] = [];
      while (canTranslateCandle(next, candle, dir)) {
        const previousProjections = snapshotWickProjections(next);
        translateCandle(candle, dir);
        distance += 1;
        events.push(`roll_step:${candle.id}:d${distance}`);
        const stepEvents: string[] = [];
        settleContacts(next, stepEvents, previousProjections);
        events.push(...stepEvents);
        rollSteps.push({
          distance,
          events: stepEvents,
          allBraziersLit:
            next.braziers.length > 0 && next.braziers.every((brazier) => brazier.lit),
        });
      }
      if (distance === 0) {
        return illegal(state, input, "roll_blocked");
      }
      next.player = destination;
      events.push(`roll_candle:${candle.id}:d${distance}`);
      if (distance > 1) {
        events.push(`roll_multi_cell_one_turn:${candle.id}:d${distance}`);
      }
      emitRollingExposureEvents(events, rollSteps, distance, candle.id);
    }
  } else {
    const flames = exposedFlames(next).filter(
      (projection) => pointKey(projection.point) === pointKey(destination),
    );
    next.player = destination;
    events.push("walk");
    if (flames.length > 0) {
      pendingDeath = true;
      deathSources = flames.map((projection) => projection.candle.id);
    }
  }

  advanceGlobalBurnCountdown(next, events);

  if (pendingDeath) {
    next.dead = true;
    events.push(`player_died:${deathSources.join("+")}`);
  }
  if (isWin(next, options.winCondition ?? mechanic.win)) {
    events.push("win_all_braziers_lit");
  }

  return {
    legal: true,
    input,
    state: next,
    events,
  };
}

function settleContacts(
  state: CandleSokobanState,
  events: string[],
  previousProjections?: Map<string, WickProjectionSnapshot>,
): void {
  for (const projection of wickProjections(state)) {
    if (!projection.candle.lit || !projection.concealed) {
      continue;
    }
    projection.candle.lit = false;
    events.push(`extinguish:${projection.candle.id}:concealed`);
    if (projection.concealedBy === "wall") {
      events.push(`extinguish_by_wall:${projection.candle.id}`);
    } else if (projection.concealedBy === "candle_body") {
      events.push(`extinguish_by_candle_body:${projection.candle.id}`);
    }
  }

  const reexposedUnlit = new Set(
    wickProjections(state)
      .filter(
        (projection) =>
          previousProjections?.get(projection.candle.id)?.concealed === true &&
          !projection.concealed &&
          !projection.candle.lit,
      )
      .map((projection) => projection.candle.id),
  );

  while (true) {
    const projections = wickProjections(state);
    const brazierSources = new Set<string>();
    const wickSources = new Set<string>();
    for (const brazier of state.braziers) {
      if (brazier.lit) {
        brazierSources.add(pointKey(brazier.position));
      }
    }
    for (const projection of projections) {
      if (projection.candle.lit && projection.inBounds && !projection.concealed) {
        wickSources.add(pointKey(projection.point));
      }
    }
    const sources = new Set([...brazierSources, ...wickSources]);

    let changed = false;
    for (const projection of projections) {
      const key = pointKey(projection.point);
      if (
        !projection.candle.lit &&
        projection.inBounds &&
        !projection.concealed &&
        sources.has(key)
      ) {
        projection.candle.lit = true;
        events.push(`ignite:${projection.candle.id}`);
        if (brazierSources.has(key)) {
          events.push(`ignite_from_brazier:${projection.candle.id}:${key}`);
        }
        if (wickSources.has(key)) {
          events.push(`ignite_from_wick:${projection.candle.id}:${key}`);
        }
        if (state.globalBurnCountdown < state.globalBurnCycle) {
          events.push(
            `ignite_midcycle:${projection.candle.id}:t${state.globalBurnCountdown}`,
          );
        }
        changed = true;
      }
    }
    for (const brazier of state.braziers) {
      if (!brazier.lit && sources.has(pointKey(brazier.position))) {
        brazier.lit = true;
        events.push(`light_brazier:${pointKey(brazier.position)}`);
        changed = true;
      }
    }
    if (!changed) {
      break;
    }
  }

  for (const candleId of reexposedUnlit) {
    const candle = state.candles.find((candidate) => candidate.id === candleId);
    if (candle && !candle.lit) {
      events.push(`wick_reexposed_unlit:${candleId}`);
    }
  }
}

function advanceGlobalBurnCountdown(
  state: CandleSokobanState,
  events: string[],
): void {
  const previous = state.globalBurnCountdown;
  if (
    state.candles.length > 0 &&
    state.candles.every((candle) => !candle.lit)
  ) {
    events.push(`countdown_without_lit_candle:${previous}`);
  }
  if (previous > 1) {
    state.globalBurnCountdown = previous - 1;
    events.push(`countdown:${previous}->${state.globalBurnCountdown}`);
    return;
  }

  state.globalBurnCountdown = state.globalBurnCycle;
  events.push(`countdown:1->${state.globalBurnCycle}`);
  settleGlobalBurn(state, events, {
    ignitedThisAction: eventObjectIds(events, "ignite"),
    extinguishedThisAction: eventObjectIds(events, "extinguish"),
  });
}

function settleGlobalBurn(
  state: CandleSokobanState,
  events: string[],
  actionContacts: {
    ignitedThisAction: Set<string>;
    extinguishedThisAction: Set<string>;
  },
): void {
  const burning = new Set(
    state.candles.filter((candle) => candle.lit).map((candle) => candle.id),
  );
  if (burning.size > 1) {
    events.push(`simultaneous_burn:${[...burning].sort().join("+")}`);
  }
  for (const candleId of actionContacts.ignitedThisAction) {
    if (burning.has(candleId)) {
      events.push(`boundary_ignite_participates:${candleId}`);
    }
  }
  for (const candleId of actionContacts.extinguishedThisAction) {
    if (!burning.has(candleId) && state.candles.some((candle) => candle.id === candleId)) {
      events.push(`boundary_extinguish_avoids_burn:${candleId}`);
    }
  }
  const before = cloneState(state);
  const vacatedBySurvivingFlame = new Set<string>();
  const survivors: Candle[] = [];
  for (const candle of state.candles) {
    if (!burning.has(candle.id)) {
      survivors.push(candle);
      continue;
    }
    const removed = candle.bodyCells.at(-1)!;
    if (candle.bodyCells.length === 1) {
      events.push(`burn_out:${candle.id}`);
      continue;
    }
    candle.bodyCells.pop();
    survivors.push(candle);
    vacatedBySurvivingFlame.add(pointKey(removed));
    events.push(`shrink:${candle.id}:len${candle.bodyCells.length}`);
  }
  state.candles = sortCandles(survivors);

  const beforeProjectionById = new Map(
    wickProjections(before).map((projection) => [projection.candle.id, projection]),
  );
  const afterProjections = wickProjections(state);
  const retreatingFlameCells = new Set(
    afterProjections
      .filter(
        (projection) =>
          burning.has(projection.candle.id) &&
          projection.candle.lit &&
          projection.inBounds &&
          !projection.concealed &&
          vacatedBySurvivingFlame.has(pointKey(projection.point)),
      )
      .map((projection) => pointKey(projection.point)),
  );

  for (const projection of afterProjections) {
    const beforeProjection = beforeProjectionById.get(projection.candle.id);
    const newlyExposed = beforeProjection?.concealed === true && !projection.concealed;
    if (
      !projection.candle.lit &&
      projection.inBounds &&
      newlyExposed &&
      retreatingFlameCells.has(pointKey(projection.point))
    ) {
      projection.candle.lit = true;
      events.push(`shrink_ignite:${projection.candle.id}`);
    }
  }
}

export function wickPoint(candle: Candle): Point {
  return add(candle.bodyCells.at(-1)!, candle.wickDir);
}

export function wickProjections(state: CandleSokobanState): WickProjection[] {
  const occupied = candleBodyOccupancy(state);
  return state.candles.map((candle) => {
    const point = wickPoint(candle);
    const key = pointKey(point);
    const concealedBy = state.walls.has(key)
      ? "wall"
      : occupied.has(key)
        ? "candle_body"
        : null;
    return {
      candle,
      point,
      inBounds: inBounds(state, point),
      concealed: concealedBy !== null,
      concealedBy,
    };
  });
}

function snapshotWickProjections(
  state: CandleSokobanState,
): Map<string, WickProjectionSnapshot> {
  return new Map(
    wickProjections(state).map((projection) => [
      projection.candle.id,
      { concealed: projection.concealed },
    ]),
  );
}

function emitRollingExposureEvents(
  events: string[],
  rollSteps: RollStepRecord[],
  totalDistance: number,
  rollingCandleId: string,
): void {
  const intermediate = rollSteps.filter((step) => step.distance < totalDistance);
  for (const step of intermediate) {
    if (eventsMatchPattern(step.events, "light_brazier")) {
      events.push(`roll_intermediate_light_brazier:${rollingCandleId}:d${step.distance}`);
      if (step.allBraziersLit) {
        events.push(`roll_last_brazier_before_endpoint:${rollingCandleId}:d${step.distance}`);
      }
    }
    if (eventsMatchPattern(step.events, "ignite")) {
      events.push(`roll_intermediate_ignite:${rollingCandleId}:d${step.distance}`);
    }
    if (eventsMatchPattern(step.events, "extinguish")) {
      events.push(`roll_intermediate_extinguish:${rollingCandleId}:d${step.distance}`);
    }
  }

  const extinguishedAt = new Map<string, number>();
  for (const step of rollSteps) {
    for (const candleId of eventObjectIds(step.events, "extinguish")) {
      extinguishedAt.set(candleId, step.distance);
    }
    for (const candleId of eventObjectIds(step.events, "ignite")) {
      const earlierExtinguish = extinguishedAt.get(candleId);
      if (earlierExtinguish !== undefined && earlierExtinguish < step.distance) {
        events.push(
          `roll_reignite_after_extinguish:${candleId}:d${earlierExtinguish}->d${step.distance}`,
        );
      }
    }
  }
}

function eventObjectIds(events: string[], type: string): Set<string> {
  return new Set(
    events
      .filter((event) => eventType(event) === type)
      .map((event) => event.split(":")[1])
      .filter((value): value is string => Boolean(value)),
  );
}

function exposedFlames(state: CandleSokobanState): WickProjection[] {
  return wickProjections(state).filter(
    (projection) =>
      projection.candle.lit && projection.inBounds && !projection.concealed,
  );
}

function canTranslateCandle(
  state: CandleSokobanState,
  candle: Candle,
  dir: Direction,
): boolean {
  const ownCells = new Set(candle.bodyCells.map(pointKey));
  const otherCandleCells = candleBodyOccupancy(state);
  for (const ownCell of ownCells) {
    otherCandleCells.delete(ownCell);
  }

  return candle.bodyCells.every((cell) => {
    const target = add(cell, dir);
    const key = pointKey(target);
    return (
      inBounds(state, target) &&
      !state.walls.has(key) &&
      !otherCandleCells.has(key) &&
      !brazierAt(state, target)
    );
  });
}

function translateCandle(candle: Candle, dir: Direction): void {
  candle.bodyCells = candle.bodyCells.map((cell) => add(cell, dir));
}

function candleBodyOccupancy(state: CandleSokobanState): Set<string> {
  return new Set(state.candles.flatMap((candle) => candle.bodyCells.map(pointKey)));
}

function candleAt(state: CandleSokobanState, point: Point): Candle | undefined {
  const key = pointKey(point);
  return state.candles.find((candle) =>
    candle.bodyCells.some((cell) => pointKey(cell) === key),
  );
}

function brazierAt(state: CandleSokobanState, point: Point): Brazier | undefined {
  const key = pointKey(point);
  return state.braziers.find((brazier) => pointKey(brazier.position) === key);
}

function inBounds(
  state: Pick<CandleSokobanState, "width" | "height">,
  point: Point,
): boolean {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}

function oppositeDirection(dir: Direction): Direction {
  switch (dir) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}

function capGlyph(dir: Direction, lit: boolean): string {
  const glyph = dir[0]!;
  return lit ? glyph.toUpperCase() : glyph;
}

function pointFromKey(key: string): Point {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

function sortCandles(candles: Candle[]): Candle[] {
  return [...candles].sort((left, right) => left.id.localeCompare(right.id));
}

function sortBraziers(braziers: Brazier[]): Brazier[] {
  return [...braziers].sort(
    (left, right) =>
      left.position.y - right.position.y || left.position.x - right.position.x,
  );
}

function readGlobalBurnCycle(level: LevelDoc): number {
  const value = level.global_burn_cycle;
  if (value === undefined) {
    return defaultBurnCycle;
  }
  if (value !== defaultBurnCycle) {
    throw new Error(
      `Level ${level.id} global_burn_cycle must be fixed at ${defaultBurnCycle}`,
    );
  }
  return value;
}

function isRuleDisabled(ruleId: string, options: CandleSokobanStepOptions): boolean {
  return options.disabledRules?.has(ruleId) ?? false;
}

function illegal(
  state: CandleSokobanState,
  input: CandleAction,
  reason: string,
): CandleSokobanStepResult {
  return { legal: false, input, state, events: [], reason };
}
