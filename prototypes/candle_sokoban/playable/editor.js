// src/core/events.ts
function eventType(event) {
  return event.split(":", 1)[0] ?? event;
}
function eventMatchesPattern(event, pattern) {
  return event === pattern || !pattern.includes(":") && eventType(event) === pattern;
}
function eventsMatchPattern(events, pattern) {
  return events.some((event) => eventMatchesPattern(event, pattern));
}

// src/prototypes/candle_sokoban/mechanics.ts
var defaultBurnCycle = 5;
var vectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
var capDirections = {
  u: "up",
  r: "right",
  d: "down",
  l: "left"
};
function pointKey(point) {
  return `${point.x},${point.y}`;
}
function add(point, dir) {
  const vector = vectors[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function parseLevel(level, burnCycle = readGlobalBurnCycle(level)) {
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
  const width = lines[0].length;
  if (width === 0) {
    throw new Error(`Level ${level.id} has zero-width layout`);
  }
  if (lines.some((line) => line.length !== width)) {
    throw new Error(`Level ${level.id} must be rectangular; all rows must have width ${width}`);
  }
  const height = lines.length;
  const walls = /* @__PURE__ */ new Set();
  const braziers = [];
  const capCells = [];
  const digitCells = /* @__PURE__ */ new Map();
  let player;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const glyph = lines[y][x];
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
  const claimedDigits = /* @__PURE__ */ new Map();
  const usedCandleDigits = /* @__PURE__ */ new Set();
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
    const cellsFromCap = [{ ...point }];
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
      ...digit ? { digit } : {},
      bodyCells: cellsFromCap.reverse(),
      axis,
      wickDir,
      lit: glyph === glyph.toUpperCase()
    };
  });
  for (const key of digitCells.keys()) {
    if (!claimedDigits.has(key)) {
      throw new Error(`Level ${level.id} has unclaimed candle body digit at ${key}`);
    }
  }
  if (braziers.length === 0 && level.win?.type !== "event_occurs") {
    throw new Error(`Level ${level.id} has no brazier`);
  }
  const state = {
    width,
    height,
    walls,
    player,
    dead: false,
    globalBurnCycle: burnCycle,
    globalBurnCountdown: burnCycle,
    candles: sortCandles(candles),
    braziers: sortBraziers(braziers)
  };
  validateInitialOccupancy(level, state);
  const initialEvents = [];
  settleContacts(state, initialEvents);
  if (initialEvents.length > 0) {
    throw new Error(
      `Level ${level.id} changes during silent initial contact settlement: ${initialEvents.join(", ")}`
    );
  }
  return state;
}
function validateInitialOccupancy(level, state) {
  const occupied = /* @__PURE__ */ new Map();
  const claim = (point, owner) => {
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
function cloneState(state) {
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
      bodyCells: candle.bodyCells.map((cell) => ({ ...cell }))
    })),
    braziers: state.braziers.map((brazier) => ({
      position: { ...brazier.position },
      lit: brazier.lit
    }))
  };
}
function stateKey(state) {
  const candles = sortCandles(state.candles).map(
    (candle) => [
      candle.id,
      candle.digit ?? "-",
      candle.wickDir,
      candle.lit ? "1" : "0",
      candle.bodyCells.map(pointKey).join(";")
    ].join(":")
  ).join("|");
  const braziers = sortBraziers(state.braziers).map((brazier) => `${pointKey(brazier.position)}:${brazier.lit ? "1" : "0"}`).join(";");
  return [
    `P:${pointKey(state.player)}`,
    `D:${state.dead ? "1" : "0"}`,
    `T:${state.globalBurnCountdown}/${state.globalBurnCycle}`,
    `C:${candles}`,
    `B:${braziers}`
  ].join("|");
}
function renderState(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => ".")
  );
  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y][point.x] = "#";
  }
  for (const brazier of state.braziers) {
    rows[brazier.position.y][brazier.position.x] = brazier.lit ? "O" : "o";
  }
  for (const candle of state.candles) {
    for (const [index, cell] of candle.bodyCells.entries()) {
      const isCap = index === candle.bodyCells.length - 1;
      rows[cell.y][cell.x] = isCap ? capGlyph(candle.wickDir, candle.lit) : candle.digit ?? "?";
    }
  }
  rows[state.player.y][state.player.x] = "@";
  return rows.map((row) => row.join("")).join("\n");
}
function describeState(state) {
  return [`COUNTDOWN ${state.globalBurnCountdown}`];
}
function isWin(state, winCondition = { type: "all_braziers_lit" }) {
  if (state.dead) {
    return false;
  }
  if (winCondition.type === "all_braziers_lit") {
    return state.braziers.length > 0 && state.braziers.every((brazier) => brazier.lit);
  }
  return false;
}
function isCandleSearchTerminal(state, winCondition = { type: "all_braziers_lit" }) {
  if (state.dead || isWin(state, winCondition)) {
    return true;
  }
  return winCondition.type === "all_braziers_lit" && state.candles.length === 0;
}
function isEventWin(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 ? eventsMatchPattern(events, event) : false;
}
function replay(mechanic, initialState, inputs, options = {}) {
  let state = initialState;
  const events = [];
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
function step(mechanic, state, input, options = {}) {
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
  const events = [];
  const next = cloneState(state);
  const candle = candleAt(next, destination);
  let pendingDeath = false;
  let deathSources = [];
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
      const rollSteps = [];
      while (canTranslateCandle(next, candle, dir)) {
        const previousProjections = snapshotWickProjections(next);
        translateCandle(candle, dir);
        distance += 1;
        events.push(`roll_step:${candle.id}:d${distance}`);
        const stepEvents = [];
        settleContacts(next, stepEvents, previousProjections);
        events.push(...stepEvents);
        rollSteps.push({
          distance,
          events: stepEvents,
          allBraziersLit: next.braziers.length > 0 && next.braziers.every((brazier) => brazier.lit)
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
      (projection) => pointKey(projection.point) === pointKey(destination)
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
    events
  };
}
function settleContacts(state, events, previousProjections) {
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
    wickProjections(state).filter(
      (projection) => previousProjections?.get(projection.candle.id)?.concealed === true && !projection.concealed && !projection.candle.lit
    ).map((projection) => projection.candle.id)
  );
  while (true) {
    const projections = wickProjections(state);
    const brazierSources = /* @__PURE__ */ new Set();
    const wickSources = /* @__PURE__ */ new Set();
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
    const sources = /* @__PURE__ */ new Set([...brazierSources, ...wickSources]);
    let changed = false;
    for (const projection of projections) {
      const key = pointKey(projection.point);
      if (!projection.candle.lit && projection.inBounds && !projection.concealed && sources.has(key)) {
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
            `ignite_midcycle:${projection.candle.id}:t${state.globalBurnCountdown}`
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
function advanceGlobalBurnCountdown(state, events) {
  const previous = state.globalBurnCountdown;
  if (state.candles.length > 0 && state.candles.every((candle) => !candle.lit)) {
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
    extinguishedThisAction: eventObjectIds(events, "extinguish")
  });
}
function settleGlobalBurn(state, events, actionContacts) {
  const burning = new Set(
    state.candles.filter((candle) => candle.lit).map((candle) => candle.id)
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
  const vacatedBySurvivingFlame = /* @__PURE__ */ new Set();
  const survivors = [];
  for (const candle of state.candles) {
    if (!burning.has(candle.id)) {
      survivors.push(candle);
      continue;
    }
    const removed = candle.bodyCells.at(-1);
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
    wickProjections(before).map((projection) => [projection.candle.id, projection])
  );
  const afterProjections = wickProjections(state);
  const retreatingFlameCells = new Set(
    afterProjections.filter(
      (projection) => burning.has(projection.candle.id) && projection.candle.lit && projection.inBounds && !projection.concealed && vacatedBySurvivingFlame.has(pointKey(projection.point))
    ).map((projection) => pointKey(projection.point))
  );
  for (const projection of afterProjections) {
    const beforeProjection = beforeProjectionById.get(projection.candle.id);
    const newlyExposed = beforeProjection?.concealed === true && !projection.concealed;
    if (!projection.candle.lit && projection.inBounds && newlyExposed && retreatingFlameCells.has(pointKey(projection.point))) {
      projection.candle.lit = true;
      events.push(`shrink_ignite:${projection.candle.id}`);
    }
  }
}
function wickPoint(candle) {
  return add(candle.bodyCells.at(-1), candle.wickDir);
}
function wickProjections(state) {
  const occupied = candleBodyOccupancy(state);
  return state.candles.map((candle) => {
    const point = wickPoint(candle);
    const key = pointKey(point);
    const concealedBy = state.walls.has(key) ? "wall" : occupied.has(key) ? "candle_body" : null;
    return {
      candle,
      point,
      inBounds: inBounds(state, point),
      concealed: concealedBy !== null,
      concealedBy
    };
  });
}
function snapshotWickProjections(state) {
  return new Map(
    wickProjections(state).map((projection) => [
      projection.candle.id,
      { concealed: projection.concealed }
    ])
  );
}
function emitRollingExposureEvents(events, rollSteps, totalDistance, rollingCandleId) {
  const intermediate = rollSteps.filter((step5) => step5.distance < totalDistance);
  for (const step5 of intermediate) {
    if (eventsMatchPattern(step5.events, "light_brazier")) {
      events.push(`roll_intermediate_light_brazier:${rollingCandleId}:d${step5.distance}`);
      if (step5.allBraziersLit) {
        events.push(`roll_last_brazier_before_endpoint:${rollingCandleId}:d${step5.distance}`);
      }
    }
    if (eventsMatchPattern(step5.events, "ignite")) {
      events.push(`roll_intermediate_ignite:${rollingCandleId}:d${step5.distance}`);
    }
    if (eventsMatchPattern(step5.events, "extinguish")) {
      events.push(`roll_intermediate_extinguish:${rollingCandleId}:d${step5.distance}`);
    }
  }
  const extinguishedAt = /* @__PURE__ */ new Map();
  for (const step5 of rollSteps) {
    for (const candleId of eventObjectIds(step5.events, "extinguish")) {
      extinguishedAt.set(candleId, step5.distance);
    }
    for (const candleId of eventObjectIds(step5.events, "ignite")) {
      const earlierExtinguish = extinguishedAt.get(candleId);
      if (earlierExtinguish !== void 0 && earlierExtinguish < step5.distance) {
        events.push(
          `roll_reignite_after_extinguish:${candleId}:d${earlierExtinguish}->d${step5.distance}`
        );
      }
    }
  }
}
function eventObjectIds(events, type) {
  return new Set(
    events.filter((event) => eventType(event) === type).map((event) => event.split(":")[1]).filter((value) => Boolean(value))
  );
}
function exposedFlames(state) {
  return wickProjections(state).filter(
    (projection) => projection.candle.lit && projection.inBounds && !projection.concealed
  );
}
function canTranslateCandle(state, candle, dir) {
  const ownCells = new Set(candle.bodyCells.map(pointKey));
  const otherCandleCells = candleBodyOccupancy(state);
  for (const ownCell of ownCells) {
    otherCandleCells.delete(ownCell);
  }
  return candle.bodyCells.every((cell) => {
    const target = add(cell, dir);
    const key = pointKey(target);
    return inBounds(state, target) && !state.walls.has(key) && !otherCandleCells.has(key) && !brazierAt(state, target);
  });
}
function translateCandle(candle, dir) {
  candle.bodyCells = candle.bodyCells.map((cell) => add(cell, dir));
}
function candleBodyOccupancy(state) {
  return new Set(state.candles.flatMap((candle) => candle.bodyCells.map(pointKey)));
}
function candleAt(state, point) {
  const key = pointKey(point);
  return state.candles.find(
    (candle) => candle.bodyCells.some((cell) => pointKey(cell) === key)
  );
}
function brazierAt(state, point) {
  const key = pointKey(point);
  return state.braziers.find((brazier) => pointKey(brazier.position) === key);
}
function inBounds(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function oppositeDirection(dir) {
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
function capGlyph(dir, lit) {
  const glyph = dir[0];
  return lit ? glyph.toUpperCase() : glyph;
}
function pointFromKey(key) {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}
function sortCandles(candles) {
  return [...candles].sort((left, right) => left.id.localeCompare(right.id));
}
function sortBraziers(braziers) {
  return [...braziers].sort(
    (left, right) => left.position.y - right.position.y || left.position.x - right.position.x
  );
}
function readGlobalBurnCycle(level) {
  const value = level.global_burn_cycle;
  if (value === void 0) {
    return defaultBurnCycle;
  }
  if (value !== defaultBurnCycle) {
    throw new Error(
      `Level ${level.id} global_burn_cycle must be fixed at ${defaultBurnCycle}`
    );
  }
  return value;
}
function isRuleDisabled(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function illegal(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}

// src/prototypes/candle_sokoban/runtime.ts
var defaultInputs = ["up", "down", "left", "right"];
function createCandleSokobanRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: (state, options) => {
      const winCondition = options.winCondition ?? mechanic.win;
      return isCandleSearchTerminal(state, winCondition) ? [] : legalInputs(mechanic);
    },
    step: (state, action, options) => {
      const result = step(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason
      };
    },
    isWin
  };
}
function legalInputs(mechanic) {
  const inputs = Object.values(mechanic.inputs).filter((input) => input.intent === "move" && input.dir).map((input) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs;
}
var layers = [
  editorToolGroup("terrain", "Terrain", [
    tool("terrain", "floor", "\u5730\u9762", "floor", "."),
    tool("terrain", "wall", "\u5899", "wall", "#")
  ]),
  editorToolGroup("actor", "Actor", [
    tool("actor", "player", "\u73A9\u5BB6", "player", "@"),
    tool("actor", "clear", "\u6E05\u89D2\u8272", void 0, ".")
  ]),
  editorToolGroup("object", "Object", [
    tool("object", "brazier_unlit", "\u672A\u70B9\u71C3\u706B\u76C6", "brazier_unlit", "o"),
    tool("object", "brazier_lit", "\u5DF2\u70B9\u71C3\u706B\u76C6", "brazier_lit", "O"),
    tool("object", "clear", "\u6E05\u7269\u4F53", void 0, ".")
  ]),
  editorToolGroup("mechanism", "Candle", [
    tool("mechanism", "drag_unlit", "\u62D6\u753B\u672A\u71C3\u8721\u70DB", void 0, "r"),
    tool("mechanism", "drag_lit", "\u62D6\u753B\u71C3\u70E7\u8721\u70DB", void 0, "R"),
    ...Array.from({ length: 9 }, (_, index) => {
      const digit = String(index + 1);
      return tool("mechanism", `body_${digit}`, `\u70DB\u8EAB ${digit}`, `body_${digit}`, digit);
    }),
    ...["u", "r", "d", "l", "U", "R", "D", "L"].map(
      (glyph) => tool(
        "mechanism",
        `cap_${glyph}`,
        `${glyph === glyph.toUpperCase() ? "\u71C3\u70E7" : "\u672A\u71C3"}\u7AEF\u5E3D ${glyph}`,
        `cap_${glyph}`,
        glyph
      )
    ),
    tool("mechanism", "clear", "\u6E05\u8721\u70DB", void 0, ".")
  ])
];
function tool(layerId, id, label, value, glyph) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}
function defaultLevel(_mechanic, _knowledge) {
  return {
    id: "CANDLE_STUDIO_DRAFT",
    title: "Candle Studio Draft",
    global_burn_cycle: 5,
    layout: normalizeAsciiLayout(
      `
#########
#@111R.o#
#########
`,
      { rectangular: true, fill: "." }
    )
  };
}
var candleSokobanAdapter = {
  id: "candle_sokoban",
  createRuntime: createCandleSokobanRuntime,
  parseLevel,
  renderState,
  describeState,
  renderVisualState,
  step,
  replay,
  isWin,
  isEventWin,
  editor: {
    layers,
    defaultGlyph: ".",
    defaultSize: { width: 10, height: 7 },
    defaultLevel,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout, { rectangular: true, fill: "." }),
    parseAsciiToBoard: parseEditorBoard,
    serializeBoard: serializeEditorBoardLayout,
    renderCell: renderEditorCell,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel)
  }
};
function parseEditorBoard(layout) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph,
    rectangular: true,
    fill: "."
  });
}
function parseEditorGlyph(glyph) {
  if (glyph === "#") {
    return { terrain: "wall" };
  }
  if (glyph === "@") {
    return { actor: "player" };
  }
  if (glyph === "o") {
    return { object: "brazier_unlit" };
  }
  if (glyph === "O") {
    return { object: "brazier_lit" };
  }
  if (/^[1-9]$/.test(glyph)) {
    return { mechanism: `body_${glyph}` };
  }
  if (/^[urdlURDL]$/.test(glyph)) {
    return { mechanism: `cap_${glyph}` };
  }
  return {};
}
function serializeEditorBoardLayout(board) {
  return serializeEditorBoard(board, serializeEditorCell);
}
function serializeEditorCell(cell) {
  if (cell.terrain === "wall") {
    return "#";
  }
  if (cell.mechanism?.startsWith("body_")) {
    return cell.mechanism.slice(-1);
  }
  if (cell.mechanism?.startsWith("cap_")) {
    return cell.mechanism.slice(-1);
  }
  if (cell.actor === "player") {
    return "@";
  }
  if (cell.object === "brazier_unlit") {
    return "o";
  }
  if (cell.object === "brazier_lit") {
    return "O";
  }
  return ".";
}
function renderEditorCell(cell) {
  return editorVisualForGlyph(serializeEditorCell(cell));
}
function renderVisualState(state) {
  const board = parseEditorBoard(renderState(state));
  const visual = editorBoardToVisualBoard(board, renderEditorCell);
  const tileAt = (x, y) => visual.tiles[y * visual.width + x];
  for (const tile of visual.tiles) {
    const isWall = tile.terrain?.visualKey === "terrain.wall";
    tile.terrain = visualLayer(
      isWall ? "candle.terrain.wall" : "candle.terrain.floor",
      isWall ? "#" : " ",
      isWall ? "tomb wall" : "tomb floor",
      ["candle", "terrain", isWall ? "wall" : "floor"]
    );
  }
  for (const candle of state.candles) {
    for (const [index, cell] of candle.bodyCells.entries()) {
      const tile = tileAt(cell.x, cell.y);
      const isCap = index === candle.bodyCells.length - 1;
      const candleId = candle.digit ?? "single";
      const segment = index === 0 ? `tail_${candle.wickDir}` : `middle_${candle.axis}`;
      tile.objects = [
        visualLayer(
          isCap ? `candle.cap.${candleId}.${candle.wickDir}.${candle.lit ? "lit" : "unlit"}` : `candle.body.${candleId}.${segment}`,
          isCap ? candle.wickDir[0][candle.lit ? "toUpperCase" : "toLowerCase"]() : candle.digit ?? "?",
          isCap ? `${candle.id} wick end` : `${candle.id} body`,
          [
            "candle",
            candle.id,
            isCap ? "wick_end" : "body",
            candle.axis,
            candle.lit ? "lit" : "unlit"
          ]
        )
      ];
    }
  }
  for (const brazier of state.braziers) {
    tileAt(brazier.position.x, brazier.position.y).objects = [
      visualLayer(
        `candle.brazier.${brazier.lit ? "lit" : "unlit"}`,
        brazier.lit ? "O" : "o",
        brazier.lit ? "lit brazier" : "unlit brazier",
        ["brazier", brazier.lit ? "lit" : "unlit"]
      )
    ];
  }
  for (const projection of wickProjections(state)) {
    if (!projection.inBounds || projection.concealed) {
      continue;
    }
    const tile = tileAt(projection.point.x, projection.point.y);
    tile.objects = [
      ...tile.objects ?? [],
      visualLayer(
        `candle.wick.${projection.candle.wickDir}.${projection.candle.lit ? "lit" : "unlit"}`,
        projection.candle.lit ? "*" : "w",
        projection.candle.lit ? `${projection.candle.id} exposed flame` : `${projection.candle.id} exposed wick`,
        [
          "candle",
          projection.candle.id,
          "wick_projection",
          "exposed",
          projection.candle.lit ? "lit" : "unlit"
        ]
      )
    ];
  }
  tileAt(state.player.x, state.player.y).actors = [
    visualLayer(
      state.dead ? "candle.player.dead" : "candle.player.alive",
      "@",
      state.dead ? "dead player" : "player",
      ["player", state.dead ? "dead" : "alive"]
    )
  ];
  return visual;
}

// src/prototypes/ice_slide_escape/mechanics.ts
var vectors2 = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
function pointKey2(point) {
  return `${point.x},${point.y}`;
}
function add2(point, dir) {
  const vector = vectors2[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function subtract(point, dir) {
  const vector = vectors2[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}
function parseLevel2(level) {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }
  if (lines.length === 0) {
    throw new Error(`Level ${level.id} has empty layout`);
  }
  const width = lines[0].length;
  if (width === 0) {
    throw new Error(`Level ${level.id} has zero-width layout`);
  }
  if (lines.some((line) => line.length !== width)) {
    throw new Error(`Level ${level.id} must be rectangular; all rows must have width ${width}`);
  }
  const height = lines.length;
  const walls = /* @__PURE__ */ new Set();
  const targets = /* @__PURE__ */ new Set();
  const ice = [];
  let playerMarker;
  for (let y = 0; y < height; y += 1) {
    const line = lines[y];
    for (let x = 0; x < width; x += 1) {
      const glyph = line[x];
      const point = { x, y };
      switch (glyph) {
        case "#":
          walls.add(pointKey2(point));
          break;
        case "G":
          targets.add(pointKey2(point));
          break;
        case "*":
          targets.add(pointKey2(point));
          ice.push(point);
          break;
        case "+":
          targets.add(pointKey2(point));
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
    ice: sortPoints(ice)
  };
  validateExplicitRequest(level, state);
  return state;
}
function assignPlayer(level, current, point) {
  if (current) {
    throw new Error(`Level ${level.id} has multiple player markers`);
  }
  return point;
}
function validateExplicitRequest(level, state) {
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
function cloneState2(state) {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    targets: new Set(state.targets),
    player: { ...state.player },
    ice: state.ice.map((point) => ({ ...point }))
  };
}
function stateKey2(state) {
  return [
    `P:${pointKey2(state.player)}`,
    `I:${state.ice.map(pointKey2).sort().join(";")}`,
    `W:${[...state.walls].sort().join(";")}`
  ].join("|");
}
function renderState2(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => ".")
  );
  for (const key of state.targets) {
    const point = pointFromKey2(key);
    rows[point.y][point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey2(key);
    rows[point.y][point.x] = "#";
  }
  for (const icePoint of state.ice) {
    rows[icePoint.y][icePoint.x] = state.targets.has(pointKey2(icePoint)) ? "*" : "I";
  }
  rows[state.player.y][state.player.x] = state.targets.has(pointKey2(state.player)) ? "+" : "@";
  return rows.map((row) => row.join("")).join("\n");
}
function isWin2(state, winCondition = { type: "ice_slide_escape_explicit_goal" }) {
  if (winCondition.type !== "ice_slide_escape_explicit_goal") {
    return false;
  }
  const goalRaw = readWinPoint(winCondition, "player_goal");
  if (!goalRaw) {
    return false;
  }
  const goal = toPoint(goalRaw);
  const iceKeys = new Set(state.ice.map(pointKey2));
  return pointKey2(state.player) === pointKey2(goal) && [...state.targets].every((target) => iceKeys.has(target));
}
function isEventWin2(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay2(mechanic, initialState, inputs, options = {}) {
  let state = initialState;
  const events = [];
  let legal = true;
  for (const input of inputs) {
    const result = step2(mechanic, state, input, options);
    events.push(...result.events);
    if (result.legal) {
      state = result.state;
    } else {
      legal = false;
    }
  }
  return { state, events, legal };
}
function step2(mechanic, state, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal2(state, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add2(state.player, dir);
  if (!inBounds2(state, destination) || state.walls.has(pointKey2(destination))) {
    return illegal2(state, input, "destination_blocked");
  }
  const iceIndex = iceIndexAt(state, destination);
  if (iceIndex !== -1) {
    if (isRuleDisabled2("push_ice", options)) {
      return illegal2(state, input, "push_ice_disabled");
    }
    const next = cloneState2(state);
    next.ice.splice(iceIndex, 1);
    next.player = destination;
    const slide = settleIce(next, destination, dir, options);
    if (!slide.legal) {
      return {
        legal: false,
        input,
        state,
        events: slide.events,
        reason: slide.reason
      };
    }
    return {
      legal: true,
      input,
      state: slide.state,
      events: ["push_ice", ...slide.events]
    };
  }
  if (iceIndexAt(state, destination) === -1 && isCellFreeForPlayer(state, destination)) {
    const next = cloneState2(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal2(state, input, "no_matching_rule");
}
function settleIce(stateWithoutMovingIce, origin, dir, options) {
  return continueSlide(stateWithoutMovingIce, origin, dir, 0, options, []);
}
function continueSlide(state, current, dir, initialDistance, options, events) {
  let cursor = current;
  let distance = initialDistance;
  while (true) {
    const next = add2(cursor, dir);
    if (!inBounds2(state, next)) {
      return {
        legal: true,
        state: stateWithIce(state, void 0),
        events: [...events, `ice_boundary_disappear:d${distance}`]
      };
    }
    if (isIceObstacle(state, next)) {
      return resolveObstacle(state, cursor, next, dir, distance, options, events);
    }
    cursor = next;
    distance += 1;
  }
}
function resolveObstacle(state, preObstacle, obstacle, dir, distance, options, events) {
  const obstacleEvents = iceIndexAt(state, obstacle) === -1 ? events : [...events, "ice_blocks_ice_no_chain_push"];
  if (distance === 0) {
    return {
      legal: false,
      reason: "push_ice_failed_immediate_obstacle",
      events: [...obstacleEvents, "push_ice_failed"]
    };
  }
  if (distance <= 2) {
    return {
      legal: true,
      state: stateWithIce(state, preObstacle),
      events: [...obstacleEvents, `ice_stop_short:d${distance}`]
    };
  }
  if (distance === 3) {
    return {
      legal: true,
      state: stateWithIce(state, void 0),
      events: [...obstacleEvents, "ice_destroyed_d3"]
    };
  }
  if (distance === 4) {
    return {
      legal: true,
      state: stateWithIce(state, subtract(preObstacle, dir)),
      events: [...obstacleEvents, "ice_rebound_d4"]
    };
  }
  const group = collectObstacleGroup(state, obstacle, dir);
  const afterGroup = group.afterGroup;
  if (distance === 5) {
    const passEvents = [...obstacleEvents, `ice_pass_through_d5:len${group.cells.length}`];
    if (!inBounds2(state, afterGroup)) {
      return {
        legal: true,
        state: stateWithIce(state, void 0),
        events: [...passEvents, "ice_boundary_disappear_after_group"]
      };
    }
    return continueSlide(state, afterGroup, dir, 1, options, [
      ...passEvents,
      "slide_restart_after_group"
    ]);
  }
  const destroyedState = removeObstacleGroup(state, group.cells);
  const destroyEvents = [...obstacleEvents, `ice_destroy_group_d6_plus:len${group.cells.length}`];
  if (!inBounds2(destroyedState, afterGroup)) {
    return {
      legal: true,
      state: stateWithIce(destroyedState, void 0),
      events: [...destroyEvents, "ice_boundary_disappear_after_group"]
    };
  }
  return continueSlide(destroyedState, afterGroup, dir, 1, options, [
    ...destroyEvents,
    "slide_restart_after_group"
  ]);
}
function collectObstacleGroup(state, start, dir) {
  const cells = [];
  let cursor = start;
  while (inBounds2(state, cursor) && isIceObstacle(state, cursor)) {
    cells.push(cursor);
    cursor = add2(cursor, dir);
  }
  return { cells, afterGroup: cursor };
}
function removeObstacleGroup(state, cells) {
  const next = cloneState2(state);
  const destroyed = new Set(cells.map(pointKey2));
  for (const key of destroyed) {
    next.walls.delete(key);
  }
  next.ice = next.ice.filter((icePoint) => !destroyed.has(pointKey2(icePoint)));
  return next;
}
function stateWithIce(state, point) {
  const next = cloneState2(state);
  next.ice = point ? sortPoints([...next.ice, point]) : sortPoints(next.ice);
  return next;
}
function isRuleDisabled2(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function illegal2(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function inBounds2(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function isEdgeCell(state, point) {
  return inBounds2(state, point) && (point.x === 0 || point.y === 0 || point.x === state.width - 1 || point.y === state.height - 1);
}
function isCellFreeForPlayer(state, point) {
  return inBounds2(state, point) && !state.walls.has(pointKey2(point)) && iceIndexAt(state, point) === -1;
}
function isIceObstacle(state, point) {
  return state.walls.has(pointKey2(point)) || iceIndexAt(state, point) !== -1;
}
function iceIndexAt(state, point) {
  const key = pointKey2(point);
  return state.ice.findIndex((icePoint) => pointKey2(icePoint) === key);
}
function sortPoints(points) {
  return [...points].sort((left, right) => left.y - right.y || left.x - right.x);
}
function pointFromKey2(key) {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}
function readWinPoint(winCondition, field) {
  const value = winCondition?.[field];
  if (Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number") {
    return [value[0], value[1]];
  }
  if (value && typeof value === "object" && typeof value.x === "number" && typeof value.y === "number") {
    return value;
  }
  return void 0;
}
function toPoint(value) {
  return Array.isArray(value) ? { x: value[0], y: value[1] } : value;
}

// src/prototypes/ice_slide_escape/runtime.ts
var defaultActions = ["up", "down", "left", "right"];
function createIceSlideRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey2,
    actions: () => legalActions(mechanic),
    step: (state, action, options) => {
      const result = step2(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason
      };
    },
    isWin: isWin2
  };
}
function legalActions(mechanic) {
  const actions = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return actions.length > 0 ? actions : defaultActions;
}
var layers2 = [
  editorToolGroup("terrain", "Terrain", [
    tool2("terrain", "floor", "\u5730\u9762", "floor", "."),
    tool2("terrain", "wall", "\u5899", "wall", "#")
  ]),
  editorToolGroup("target", "Target", [
    tool2("target", "goal", "\u76EE\u6807", "goal", "G"),
    tool2("target", "clear", "\u6E05\u76EE\u6807", void 0, ".")
  ], false),
  editorToolGroup("actor", "Actor", [
    tool2("actor", "player", "\u73A9\u5BB6", "player", "@"),
    tool2("actor", "clear", "\u6E05\u89D2\u8272", void 0, ".")
  ]),
  editorToolGroup("object", "Object", [
    tool2("object", "ice", "\u51B0\u5757", "ice", "I"),
    tool2("object", "clear", "\u6E05\u7269\u4F53", void 0, ".")
  ])
];
function tool2(layerId, id, label, value, glyph) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}
function defaultLevel2(_mechanic, _knowledge) {
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    layout: normalizeAsciiLayout(
      `
@..G
.I..
....
....
`,
      { rectangular: true, fill: "." }
    ),
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: [0, 0],
      player_goal: [3, 0]
    }
  };
}
var iceSlideAdapter = {
  id: "ice_slide_escape",
  createRuntime: createIceSlideRuntime,
  parseLevel: parseLevel2,
  renderState: renderState2,
  step: step2,
  replay: replay2,
  isWin: isWin2,
  isEventWin: isEventWin2,
  editor: {
    layers: layers2,
    defaultGlyph: ".",
    defaultSize: { width: 9, height: 7 },
    defaultLevel: defaultLevel2,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout, { rectangular: true, fill: "." }),
    parseAsciiToBoard: parseEditorBoard2,
    serializeBoard: serializeEditorBoardLayout2,
    renderCell: renderEditorCell2,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel2)
  }
};
function parseEditorBoard2(layout) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph2,
    rectangular: true,
    fill: "."
  });
}
function parseEditorGlyph2(glyph) {
  switch (glyph) {
    case "#":
      return { terrain: "wall" };
    case "G":
      return { target: "goal" };
    case "+":
      return { target: "goal", actor: "player" };
    case "*":
      return { target: "goal", object: "ice" };
    case "@":
      return { actor: "player" };
    case "I":
      return { object: "ice" };
    default:
      return {};
  }
}
function serializeEditorBoardLayout2(board) {
  return serializeEditorBoard(board, serializeEditorCell2);
}
function serializeEditorCell2(cell) {
  if (cell.terrain === "wall") {
    return "#";
  }
  if (cell.actor === "player") {
    return cell.target === "goal" ? "+" : "@";
  }
  if (cell.object === "ice") {
    return cell.target === "goal" ? "*" : "I";
  }
  return cell.target === "goal" ? "G" : ".";
}
function renderEditorCell2(cell) {
  return editorVisualForGlyph(serializeEditorCell2(cell));
}

// src/prototypes/pull_portal_fallback/mechanics.ts
var vectors3 = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
var portalPairs = {
  A: "B",
  B: "A",
  D: "E",
  E: "D",
  H: "I",
  I: "H"
};
function pointKey3(point) {
  return `${point.x},${point.y}`;
}
function add3(point, dir) {
  const vector = vectors3[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function opposite(point, dir) {
  const vector = vectors3[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}
function parseLevel3(level) {
  const lines = level.layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines.at(-1) === "") {
    lines.pop();
  }
  if (lines.length === 0) {
    throw new Error(`Level ${level.id} has empty layout`);
  }
  const width = Math.max(...lines.map((line) => line.length));
  const height = lines.length;
  const walls = /* @__PURE__ */ new Set();
  const goals = /* @__PURE__ */ new Set();
  const crates = [];
  const portals = {};
  let player;
  for (let y = 0; y < height; y += 1) {
    const line = lines[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const char = line[x] ?? " ";
      const point = { x, y };
      switch (char) {
        case "#":
          walls.add(pointKey3(point));
          break;
        case "G":
          goals.add(pointKey3(point));
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
        `Level ${level.id} has portal '${portalId}' without paired portal '${pairedPortalId}'`
      );
    }
  }
  return { width, height, walls, goals, player, crates, portals };
}
function cloneState3(state) {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    goals: new Set(state.goals),
    player: { ...state.player },
    crates: state.crates.map((crate) => ({ ...crate })),
    portals: Object.fromEntries(
      Object.entries(state.portals).map(([id, point]) => [id, { ...point }])
    )
  };
}
function stateKey3(state) {
  const crates = state.crates.map(pointKey3).sort().join(";");
  const portals = Object.entries(state.portals).sort(([a], [b]) => a.localeCompare(b)).map(([id, point]) => `${id}:${pointKey3(point)}`).join(";");
  return `P:${pointKey3(state.player)}|C:${crates}|R:${portals}`;
}
function isWin3(state, winCondition = { type: "all_objects_on_targets" }) {
  switch (winCondition.type) {
    case "all_objects_on_targets":
      return state.crates.length > 0 && state.crates.every((crate) => state.goals.has(pointKey3(crate)));
    case "player_on_goal":
      return state.goals.has(pointKey3(state.player));
    default:
      return false;
  }
}
function isEventWin3(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay3(mechanic, initialState, inputs, options = {}) {
  let state = initialState;
  const events = [];
  let legal = true;
  for (const input of inputs) {
    const result = step3(mechanic, state, input, options);
    events.push(...result.events);
    if (result.legal) {
      state = result.state;
    } else {
      legal = false;
    }
  }
  return { state, events, legal };
}
function renderState3(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => " ")
  );
  for (const key of state.goals) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y][x] = "G";
  }
  for (const key of state.walls) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y][x] = "#";
  }
  for (const [id, point] of Object.entries(state.portals)) {
    rows[point.y][point.x] = id;
  }
  for (const crate of state.crates) {
    rows[crate.y][crate.x] = "C";
  }
  rows[state.player.y][state.player.x] = "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}
function step3(mechanic, state, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal3(state, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add3(state.player, dir);
  const behind = opposite(state.player, dir);
  if (isBlockedByWallOrBounds(state, destination)) {
    return illegal3(state, input, "destination_blocked");
  }
  if (crateIndexAt(state, destination) !== -1) {
    const pushedCrateIndex = crateIndexAt(state, destination);
    if (isRuleDisabled3("cannot_push_crate", options)) {
      return illegal3(state, input, "crate_push_rule_disabled");
    }
    return {
      legal: false,
      input,
      state,
      events: [`push_crate_failed:crate#${pushedCrateIndex + 1}`],
      reason: "cannot_push_crate"
    };
  }
  const portalId = portalIdAt(state, destination);
  if (portalId) {
    return enterPortal(state, input, dir, portalId, options);
  }
  const pulledCrateIndex = crateIndexAt(state, behind);
  const canPull = pulledCrateIndex !== -1 && !isRuleDisabled3("pull_single_crate", options) && isCellFreeForPlayer2(state, destination);
  if (canPull) {
    const next = cloneState3(state);
    next.player = destination;
    next.crates[pulledCrateIndex] = { ...state.player };
    return {
      legal: true,
      input,
      state: next,
      events: [`pull_crate:crate#${pulledCrateIndex + 1}`]
    };
  }
  if (!isRuleDisabled3("walk", options) && isCellFreeForPlayer2(state, destination)) {
    const next = cloneState3(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal3(state, input, "no_matching_rule");
}
function enterPortal(state, input, dir, entrancePortalId, options) {
  if (isRuleDisabled3("enter_portal", options)) {
    return illegal3(state, input, "enter_portal_disabled");
  }
  const entrance = state.portals[entrancePortalId];
  if (!entrance) {
    return illegal3(state, input, "missing_entrance_portal");
  }
  const pairedPortalId = portalPairs[entrancePortalId];
  if (!pairedPortalId) {
    return illegal3(state, input, "missing_paired_portal");
  }
  const paired = state.portals[pairedPortalId];
  if (!paired) {
    return illegal3(state, input, "missing_paired_portal");
  }
  const exit = add3(paired, dir);
  const exitBlocked = !isCellFreeForPlayer2(state, exit);
  const exitBlockerEvents = exitBlocked ? describePortalExitBlocker(state, exit) : [];
  if (!exitBlocked) {
    if (isBranchDisabled("enter_portal.normal_teleport", options)) {
      return illegal3(state, input, "normal_teleport_disabled");
    }
    const next = cloneState3(state);
    next.player = exit;
    return {
      legal: true,
      input,
      state: next,
      events: [`portal_enter:${entrancePortalId}`, `portal_teleport:${entrancePortalId}->${pairedPortalId}`]
    };
  }
  const pushedPortalDestination = add3(entrance, dir);
  const canPushEntrance = isCellFreeForPortal(state, pushedPortalDestination);
  if (canPushEntrance) {
    if (isBranchDisabled("enter_portal.blocked_exit_push_entrance", options)) {
      return illegal3(state, input, "blocked_exit_push_entrance_disabled");
    }
    const next = cloneState3(state);
    next.portals[entrancePortalId] = pushedPortalDestination;
    return {
      legal: true,
      input,
      state: next,
      events: [
        `portal_enter:${entrancePortalId}`,
        `portal_exit_blocked:${entrancePortalId}->${pairedPortalId}`,
        ...exitBlockerEvents,
        `portal_fallback_push:${entrancePortalId}`
      ]
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
      `portal_fallback_failed:${entrancePortalId}`
    ],
    reason: "portal_fallback_failed"
  };
}
function isRuleDisabled3(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function isBranchDisabled(branchId, options) {
  return options.disabledBranches?.has(branchId) ?? false;
}
function illegal3(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function isBlockedByWallOrBounds(state, point) {
  return !inBounds3(state, point) || state.walls.has(pointKey3(point));
}
function inBounds3(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function crateIndexAt(state, point) {
  const key = pointKey3(point);
  return state.crates.findIndex((crate) => pointKey3(crate) === key);
}
function portalIdAt(state, point) {
  const key = pointKey3(point);
  return Object.entries(state.portals).find(([, portal]) => pointKey3(portal) === key)?.[0];
}
function describePortalExitBlocker(state, point) {
  if (!inBounds3(state, point)) {
    return ["portal_exit_blocked_by_bounds"];
  }
  if (state.walls.has(pointKey3(point))) {
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
function isCellFreeForPlayer2(state, point) {
  return inBounds3(state, point) && !state.walls.has(pointKey3(point)) && crateIndexAt(state, point) === -1 && !portalIdAt(state, point);
}
function isCellFreeForPortal(state, point) {
  return inBounds3(state, point) && !state.walls.has(pointKey3(point)) && crateIndexAt(state, point) === -1 && !portalIdAt(state, point) && pointKey3(state.player) !== pointKey3(point);
}

// src/prototypes/pull_portal_fallback/runtime.ts
var defaultInputs2 = ["up", "down", "left", "right"];
function createPullPortalRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey3,
    actions: () => legalInputs2(mechanic),
    step: (state, action, options) => {
      const result = step3(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason
      };
    },
    isWin: isWin3
  };
}
function legalInputs2(mechanic) {
  const inputs = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs2;
}
var layers3 = [
  editorToolGroup("terrain", "Terrain", [
    tool3("terrain", "floor", "\u5730\u9762", "floor", " "),
    tool3("terrain", "wall", "\u5899", "wall", "#")
  ]),
  editorToolGroup("target", "Target", [
    tool3("target", "goal", "\u76EE\u6807", "goal", "G"),
    tool3("target", "clear", "\u6E05\u76EE\u6807", void 0, " ")
  ], false),
  editorToolGroup("actor", "Actor", [
    tool3("actor", "player", "\u73A9\u5BB6", "player", "@"),
    tool3("actor", "clear", "\u6E05\u89D2\u8272", void 0, " ")
  ]),
  editorToolGroup("object", "Object", [
    tool3("object", "crate", "\u7BB1\u5B50", "crate", "C"),
    tool3("object", "clear", "\u6E05\u7269\u4F53", void 0, " ")
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    tool3("mechanism", "portal_a", "\u4F20\u9001\u95E8 A", "portal_a", "A"),
    tool3("mechanism", "portal_b", "\u4F20\u9001\u95E8 B", "portal_b", "B"),
    tool3("mechanism", "portal_d", "\u4F20\u9001\u95E8 D", "portal_d", "D"),
    tool3("mechanism", "portal_e", "\u4F20\u9001\u95E8 E", "portal_e", "E"),
    tool3("mechanism", "portal_h", "\u4F20\u9001\u95E8 H", "portal_h", "H"),
    tool3("mechanism", "portal_i", "\u4F20\u9001\u95E8 I", "portal_i", "I"),
    tool3("mechanism", "clear", "\u6E05\u673A\u5236", void 0, " ")
  ])
];
function tool3(layerId, id, label, value, glyph) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}
function defaultLevel3(_mechanic, _knowledge) {
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    layout: normalizeAsciiLayout(`
#######
#@ C G#
#     #
#######
`)
  };
}
var pullPortalAdapter = {
  id: "pull_portal_fallback",
  createRuntime: createPullPortalRuntime,
  parseLevel: parseLevel3,
  renderState: renderState3,
  step: step3,
  replay: replay3,
  isWin: isWin3,
  isEventWin: isEventWin3,
  editor: {
    layers: layers3,
    defaultGlyph: " ",
    defaultSize: { width: 8, height: 6 },
    defaultLevel: defaultLevel3,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout),
    parseAsciiToBoard: parseEditorBoard3,
    serializeBoard: serializeEditorBoardLayout3,
    renderCell: renderEditorCell3,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel3)
  }
};
function parseEditorBoard3(layout) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph3
  });
}
function parseEditorGlyph3(glyph) {
  switch (glyph) {
    case "#":
      return { terrain: "wall" };
    case "G":
      return { target: "goal" };
    case "@":
      return { actor: "player" };
    case "C":
      return { object: "crate" };
    case "A":
      return { mechanism: "portal_a" };
    case "B":
      return { mechanism: "portal_b" };
    case "D":
      return { mechanism: "portal_d" };
    case "E":
      return { mechanism: "portal_e" };
    case "H":
      return { mechanism: "portal_h" };
    case "I":
      return { mechanism: "portal_i" };
    default:
      return {};
  }
}
function serializeEditorBoardLayout3(board) {
  return serializeEditorBoard(board, serializeEditorCell3);
}
function serializeEditorCell3(cell) {
  if (cell.terrain === "wall") {
    return "#";
  }
  switch (cell.mechanism) {
    case "portal_a":
      return "A";
    case "portal_b":
      return "B";
    case "portal_d":
      return "D";
    case "portal_e":
      return "E";
    case "portal_h":
      return "H";
    case "portal_i":
      return "I";
  }
  if (cell.actor === "player") {
    return "@";
  }
  if (cell.object === "crate") {
    return "C";
  }
  return cell.target === "goal" ? "G" : " ";
}
function renderEditorCell3(cell) {
  return editorVisualForGlyph(serializeEditorCell3(cell));
}

// src/prototypes/reality_anchor/mechanics.ts
var vectors4 = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
function pointKey4(point) {
  return `${point.x},${point.y}`;
}
function add4(point, dir) {
  const vector = vectors4[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function subtract2(point, dir) {
  const vector = vectors4[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}
function parseLevel4(level) {
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
  const walls = /* @__PURE__ */ new Set();
  const goals = /* @__PURE__ */ new Set();
  const crates = [];
  const rawSticky = [];
  const pCells = [];
  const lCells = [];
  const bCells = [];
  const sCells = [];
  let player;
  for (let y = 0; y < height; y += 1) {
    const line = lines[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      const glyph = line[x] ?? " ";
      const point = { x, y };
      switch (glyph) {
        case "#":
          walls.add(pointKey4(point));
          break;
        case "G":
          goals.add(pointKey4(point));
          break;
        case "+":
          goals.add(pointKey4(point));
          player = assignPlayer2(level, player, point);
          break;
        case "*":
          goals.add(pointKey4(point));
          crates.push(point);
          break;
        case "m":
          goals.add(pointKey4(point));
          rawSticky.push(point);
          break;
        case "@":
          player = assignPlayer2(level, player, point);
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
    rawSticky
  );
  const state = {
    width,
    height,
    walls,
    goals,
    player,
    crates: sortPoints2(crates),
    stickyGroups: stickyCells.map((point) => [point]),
    ...pushPullAnchor ? { pushPullAnchor } : {},
    ...boxStickyAnchor ? { boxStickyAnchor } : {}
  };
  validateNoOverlap(level, state);
  return normalizeState(state, { emitEvents: false }).state;
}
function assignPlayer2(level, current, point) {
  if (current) {
    throw new Error(`Level ${level.id} has multiple players`);
  }
  return point;
}
function parsePushPullAnchor(level, pCells, lCells) {
  if (pCells.length === 0 && lCells.length === 0) {
    return void 0;
  }
  if (pCells.length !== 1 || lCells.length !== 1) {
    throw new Error(`Level ${level.id} must have exactly one P and one L for the push/pull anchor`);
  }
  const push = pCells[0];
  const pull = lCells[0];
  if (!areAdjacent(push, pull)) {
    throw new Error(`Level ${level.id} P and L anchor cells must be orthogonally adjacent`);
  }
  return { push, pull };
}
function parseBoxStickyAnchor(level, bCells, sCells, rawSticky) {
  if (bCells.length === 0 && sCells.length === 0) {
    if (rawSticky.length > 0) {
      throw new Error(`Level ${level.id} has sticky M cells but no B/S anchor`);
    }
    return { stickyCells: [] };
  }
  if (bCells.length !== 1 || sCells.length !== 1) {
    throw new Error(`Level ${level.id} must have exactly one B and one S for the B/S anchor`);
  }
  const box = bCells[0];
  const sticky = sCells[0];
  if (!areAdjacent(box, sticky)) {
    throw new Error(
      `Level ${level.id} B and S anchor labels must be orthogonally adjacent`
    );
  }
  return {
    anchor: { box, sticky },
    stickyCells: rawSticky
  };
}
function validateNoOverlap(level, state) {
  const occupied = /* @__PURE__ */ new Map();
  const claim = (point, label) => {
    const key = pointKey4(point);
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
function cloneState4(state) {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    goals: new Set(state.goals),
    player: { ...state.player },
    crates: state.crates.map((point) => ({ ...point })),
    stickyGroups: state.stickyGroups.map((group) => group.map((point) => ({ ...point }))),
    ...state.pushPullAnchor ? {
      pushPullAnchor: {
        push: { ...state.pushPullAnchor.push },
        pull: { ...state.pushPullAnchor.pull }
      }
    } : {},
    ...state.boxStickyAnchor ? {
      boxStickyAnchor: {
        box: { ...state.boxStickyAnchor.box },
        sticky: { ...state.boxStickyAnchor.sticky }
      }
    } : {}
  };
}
function stateKey4(state) {
  const crates = state.crates.map(pointKey4).sort().join(";");
  const sticky = state.stickyGroups.map(groupKey).sort().join("|");
  const pushPull = state.pushPullAnchor ? `P:${pointKey4(state.pushPullAnchor.push)};L:${pointKey4(state.pushPullAnchor.pull)}` : "none";
  const boxSticky = state.boxStickyAnchor ? `B:${pointKey4(state.boxStickyAnchor.box)};S:${pointKey4(state.boxStickyAnchor.sticky)}` : "none";
  return [
    `Ply:${pointKey4(state.player)}`,
    `C:${crates}`,
    `M:${sticky}`,
    `PL:${pushPull}`,
    `BS:${boxSticky}`
  ].join("|");
}
function renderState4(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => ".")
  );
  for (const key of state.goals) {
    const point = pointFromKey3(key);
    rows[point.y][point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey3(key);
    rows[point.y][point.x] = "#";
  }
  for (const crate of state.crates) {
    rows[crate.y][crate.x] = state.goals.has(pointKey4(crate)) ? "*" : "C";
  }
  for (const group of state.stickyGroups) {
    for (const point of group) {
      rows[point.y][point.x] = state.goals.has(pointKey4(point)) ? "m" : "M";
    }
  }
  if (state.pushPullAnchor) {
    rows[state.pushPullAnchor.push.y][state.pushPullAnchor.push.x] = "P";
    rows[state.pushPullAnchor.pull.y][state.pushPullAnchor.pull.x] = "L";
  }
  if (state.boxStickyAnchor) {
    rows[state.boxStickyAnchor.box.y][state.boxStickyAnchor.box.x] = "B";
    rows[state.boxStickyAnchor.sticky.y][state.boxStickyAnchor.sticky.x] = "S";
  }
  rows[state.player.y][state.player.x] = state.goals.has(pointKey4(state.player)) ? "+" : "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}
function renderVisualState2(state) {
  const tiles = Array.from(
    { length: state.height },
    (_, y) => Array.from({ length: state.width }, (_2, x) => {
      const point = { x, y };
      const terrainSide = boxStickySideAt(state, point);
      return {
        x,
        y,
        terrain: state.walls.has(pointKey4(point)) ? visualLayer2(
          `ra.terrain.wall.${terrainSide}_side`,
          "#",
          `${terrainSide} side wall`,
          ["terrain", "wall", `${terrainSide}_side`]
        ) : visualLayer2(
          `ra.terrain.floor.${terrainSide}_side`,
          " ",
          `${terrainSide} side floor`,
          ["terrain", "floor", `${terrainSide}_side`]
        )
      };
    })
  );
  const tileAt = (point) => tiles[point.y][point.x];
  for (const key of state.goals) {
    const point = pointFromKey3(key);
    tileAt(point).target = visualLayer2("target.goal", "G", "goal");
  }
  for (const crate of state.crates) {
    const side = boxStickySideAt(state, crate);
    pushLayer(tileAt(crate), "objects", visualLayer2(
      `ra.crate.${side}_side`,
      "C",
      `${side} side crate`,
      ["crate", `${side}_side`]
    ));
  }
  for (const [groupIndex, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      const side = boxStickySideAt(state, point);
      pushLayer(tileAt(point), "objects", visualLayer2(
        `ra.sticky.${side}_side`,
        "M",
        `${side} side sticky block`,
        ["sticky", `${side}_side`, `group_${groupIndex}`, ...stickyJoinTags(group, point)]
      ));
    }
  }
  if (state.pushPullAnchor) {
    const pushJoin = joinDirection(state.pushPullAnchor.push, state.pushPullAnchor.pull);
    const pullJoin = joinDirection(state.pushPullAnchor.pull, state.pushPullAnchor.push);
    pushLayer(tileAt(state.pushPullAnchor.push), "objects", visualLayer2(
      `ra.anchor.push_end.join_${pushJoin}`,
      "P",
      "push anchor end",
      ["anchor", "push_side", `join_${pushJoin}`]
    ));
    pushLayer(tileAt(state.pushPullAnchor.pull), "objects", visualLayer2(
      `ra.anchor.pull_end.join_${pullJoin}`,
      "L",
      "pull anchor end",
      ["anchor", "pull_side", `join_${pullJoin}`]
    ));
  }
  if (state.boxStickyAnchor) {
    const boxJoin = joinDirection(state.boxStickyAnchor.box, state.boxStickyAnchor.sticky);
    const stickyJoin = joinDirection(state.boxStickyAnchor.sticky, state.boxStickyAnchor.box);
    pushLayer(tileAt(state.boxStickyAnchor.box), "objects", visualLayer2(
      `ra.anchor.box_end.join_${boxJoin}`,
      "B",
      "box anchor end",
      ["anchor", "box_side", `join_${boxJoin}`]
    ));
    pushLayer(tileAt(state.boxStickyAnchor.sticky), "objects", visualLayer2(
      `ra.anchor.sticky_end.join_${stickyJoin}`,
      "S",
      "sticky anchor end",
      ["anchor", "sticky_side", `join_${stickyJoin}`]
    ));
  }
  const mode2 = forceModeAt(state, state.player);
  pushLayer(tileAt(state.player), "actors", visualLayer2(
    `ra.player.${mode2}_side`,
    "@",
    `${mode2} side player`,
    ["player", `${mode2}_side`]
  ));
  return { width: state.width, height: state.height, tiles: tiles.flat() };
}
function visualLayer2(visualKey, fallbackGlyph, label, tags = []) {
  return { visualKey, fallbackGlyph, label, tags };
}
function pushLayer(tile, slot, layer) {
  tile[slot] = [...tile[slot] ?? [], layer];
}
function joinDirection(from, to) {
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
function stickyJoinTags(group, point) {
  const cells = new Set(group.map(pointKey4));
  const tags = [];
  for (const dir of Object.keys(vectors4)) {
    if (cells.has(pointKey4(add4(point, dir)))) {
      tags.push(`join_${dir}`);
    }
  }
  return tags;
}
function isWin4(state, winCondition = { type: "all_targets_covered_by_objects" }) {
  switch (winCondition.type) {
    case "all_targets_covered_by_objects": {
      if (state.goals.size === 0) {
        return false;
      }
      const occupied = objectOccupancy(state);
      return [...state.goals].every((goal) => occupied.has(goal));
    }
    case "player_on_goal":
      return state.goals.has(pointKey4(state.player));
    default:
      return false;
  }
}
function isEventWin4(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay4(mechanic, initialState, inputs, options = {}) {
  let state = initialState;
  const events = [];
  let legal = true;
  for (const input of inputs) {
    const result = step4(mechanic, state, input, options);
    events.push(...result.events);
    if (result.legal) {
      state = result.state;
    } else {
      legal = false;
    }
  }
  return { state, events, legal };
}
function step4(mechanic, state, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal4(state, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  return forceModeAt(state, state.player) === "pull" ? stepPull(state, input, dir, options) : stepPush(state, input, dir, options);
}
function stepPush(state, input, dir, options) {
  const destination = add4(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal4(state, input, "destination_blocked");
  }
  const targetObject = objectIdAt(state, destination);
  if (targetObject) {
    return stepForce(state, input, dir, destination, targetObject, "push", options);
  }
  if (!isFreeForPlayer(state, destination)) {
    return illegal4(state, input, "destination_occupied");
  }
  const moved = cloneState4(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}
function stepPull(state, input, dir, options) {
  const destination = add4(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal4(state, input, "destination_blocked");
  }
  const behind = subtract2(state.player, dir);
  const targetObject = objectIdAt(state, behind);
  if (targetObject) {
    return stepForce(state, input, dir, destination, targetObject, "pull", options);
  }
  if (!isFreeForPlayer(state, destination)) {
    return illegal4(state, input, "destination_occupied");
  }
  const moved = cloneState4(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}
function stepForce(state, input, dir, playerDestination, targetObject, force, options) {
  const ruleId = force === "push" ? "push_force" : "pull_force";
  if (isRuleDisabled4(ruleId, options)) {
    return illegal4(state, input, `${ruleId}_disabled`);
  }
  const plan = planObjectMove(state, targetObject, dir);
  if (!plan.legal) {
    return illegal4(state, input, plan.reason);
  }
  const moved = translatePlannedObjects(state, plan.objectIds, dir);
  if (objectIdAt(moved, playerDestination)) {
    return illegal4(state, input, "player_destination_occupied");
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
      ...normalized.events
    ]
  };
}
function planObjectMove(state, startObject, dir) {
  const moving = /* @__PURE__ */ new Set();
  const occupancy = objectOccupancy(state);
  const visit = (objectId) => {
    if (moving.has(objectId)) {
      return void 0;
    }
    moving.add(objectId);
    for (const cell of objectCells(state, objectId)) {
      const target = add4(cell, dir);
      const targetKey = pointKey4(target);
      if (!inBounds4(state, target) || state.walls.has(targetKey)) {
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
    return void 0;
  };
  const reason = visit(startObject);
  return reason ? { legal: false, reason } : { legal: true, objectIds: moving };
}
function translatePlannedObjects(state, objectIds, dir) {
  const next = cloneState4(state);
  for (const objectId of objectIds) {
    if (objectId.startsWith("crate:")) {
      const index = Number(objectId.slice("crate:".length));
      const crate = next.crates[index];
      if (crate) {
        next.crates[index] = add4(crate, dir);
      }
      continue;
    }
    if (objectId.startsWith("sticky:")) {
      const index = Number(objectId.slice("sticky:".length));
      const group = next.stickyGroups[index];
      if (group) {
        next.stickyGroups[index] = group.map((point) => add4(point, dir));
      }
      continue;
    }
    if (objectId === "anchor:push_pull" && next.pushPullAnchor) {
      next.pushPullAnchor = {
        push: add4(next.pushPullAnchor.push, dir),
        pull: add4(next.pushPullAnchor.pull, dir)
      };
      continue;
    }
    if (objectId === "anchor:box_sticky" && next.boxStickyAnchor) {
      next.boxStickyAnchor = {
        box: add4(next.boxStickyAnchor.box, dir),
        sticky: add4(next.boxStickyAnchor.sticky, dir)
      };
    }
  }
  return next;
}
function normalizeState(state, config) {
  if (isRuleDisabled4("box_sticky_normalize", config.options)) {
    return { state: cloneState4(state), events: [] };
  }
  const sources = [
    ...state.crates.map((point, index) => ({
      point,
      source: `crate:${index}`,
      sourceKind: "crate"
    })),
    ...state.stickyGroups.flatMap(
      (group, index) => group.map((point) => ({
        point,
        source: `sticky:${index}`,
        sourceKind: "sticky"
      }))
    )
  ];
  const crateCells = [];
  const stickyCells = [];
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
  const events = [];
  if (config.emitEvents) {
    if (boxToSticky > 0) {
      events.push(`box_to_sticky:n${boxToSticky}`);
    }
    if (stickyToBox > 0) {
      events.push(`sticky_to_box:n${stickyToBox}`);
    }
    const merges = components.filter(
      (component) => new Set(component.map((cell) => cell.source)).size > 1
    ).length;
    if (merges > 0) {
      events.push(`sticky_merge:n${merges}`);
    }
    const sourceComponentCounts = /* @__PURE__ */ new Map();
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
  const normalized = {
    ...cloneState4(state),
    crates: sortPoints2(crateCells),
    stickyGroups: sortGroups(components.map((component) => sortPoints2(component.map((cell) => cell.point))))
  };
  return { state: normalized, events };
}
function connectedStickyComponents(cells) {
  const byKey = new Map(cells.map((cell) => [pointKey4(cell.point), cell]));
  const visited = /* @__PURE__ */ new Set();
  const components = [];
  for (const cell of cells) {
    const key = pointKey4(cell.point);
    if (visited.has(key)) {
      continue;
    }
    const queue = [cell];
    const component = [];
    visited.add(key);
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const current = queue[cursor];
      component.push(current);
      for (const dir of Object.keys(vectors4)) {
        const neighbor = add4(current.point, dir);
        const neighborKey = pointKey4(neighbor);
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
function forceEvents(state, objectIds) {
  const events = [];
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
function forceModeAt(state, point) {
  const anchor = state.pushPullAnchor;
  if (!anchor) {
    return "push";
  }
  return isOnFirstAnchorSide(anchor.push, anchor.pull, point) ? "push" : "pull";
}
function boxStickySideAt(state, point) {
  const anchor = state.boxStickyAnchor;
  if (!anchor) {
    return "box";
  }
  return isOnFirstAnchorSide(anchor.box, anchor.sticky, point) ? "box" : "sticky";
}
function isOnFirstAnchorSide(first, second, point) {
  if (first.x !== second.x) {
    return first.x < second.x ? point.x <= first.x : point.x >= first.x;
  }
  return first.y < second.y ? point.y <= first.y : point.y >= first.y;
}
function objectIdAt(state, point) {
  return objectOccupancy(state).get(pointKey4(point));
}
function objectOccupancy(state) {
  const occupancy = /* @__PURE__ */ new Map();
  for (const [index, crate] of state.crates.entries()) {
    occupancy.set(pointKey4(crate), `crate:${index}`);
  }
  for (const [index, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      occupancy.set(pointKey4(point), `sticky:${index}`);
    }
  }
  if (state.pushPullAnchor) {
    for (const point of pushPullCells(state)) {
      occupancy.set(pointKey4(point), "anchor:push_pull");
    }
  }
  if (state.boxStickyAnchor) {
    for (const point of boxStickyCells(state)) {
      occupancy.set(pointKey4(point), "anchor:box_sticky");
    }
  }
  return occupancy;
}
function objectCells(state, objectId) {
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
function objectKind(state, objectId) {
  void state;
  if (objectId.startsWith("crate:")) {
    return "crate";
  }
  if (objectId.startsWith("sticky:")) {
    return "sticky";
  }
  return "anchor";
}
function describeObject(objectId) {
  if (objectId.startsWith("crate:")) {
    return `crate#${Number(objectId.slice("crate:".length)) + 1}`;
  }
  if (objectId.startsWith("sticky:")) {
    return `sticky#${Number(objectId.slice("sticky:".length)) + 1}`;
  }
  return objectId === "anchor:push_pull" ? "push_pull_anchor" : "box_sticky_anchor";
}
function pushPullCells(state) {
  return state.pushPullAnchor ? [state.pushPullAnchor.push, state.pushPullAnchor.pull] : [];
}
function boxStickyCells(state) {
  return state.boxStickyAnchor ? [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky] : [];
}
function isRuleDisabled4(ruleId, options) {
  return options?.disabledRules?.has(ruleId) ?? false;
}
function illegal4(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function isFreeForPlayer(state, point) {
  return !isWallOrBounds(state, point) && !objectIdAt(state, point);
}
function isWallOrBounds(state, point) {
  return !inBounds4(state, point) || state.walls.has(pointKey4(point));
}
function inBounds4(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function areAdjacent(left, right) {
  return Math.abs(left.x - right.x) + Math.abs(left.y - right.y) === 1;
}
function sortPoints2(points) {
  return [...points].sort((left, right) => left.y - right.y || left.x - right.x);
}
function sortGroups(groups) {
  return [...groups].sort((left, right) => groupKey(left).localeCompare(groupKey(right)));
}
function groupKey(group) {
  return sortPoints2(group).map(pointKey4).join(";");
}
function pointFromKey3(key) {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

// src/prototypes/reality_anchor/runtime.ts
var defaultInputs3 = ["up", "down", "left", "right"];
function createRealityAnchorRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey4,
    actions: () => legalInputs3(mechanic),
    step: (state, action, options) => {
      const result = step4(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason
      };
    },
    isWin: isWin4
  };
}
function legalInputs3(mechanic) {
  const inputs = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs3;
}
var layers4 = [
  editorToolGroup("terrain", "Terrain", [
    editorTool("terrain", "floor", "\u5730\u9762", "floor", renderEditorCell4({ terrain: "floor" })),
    editorTool("terrain", "wall", "\u5899", "wall", renderEditorCell4({ terrain: "wall" }))
  ]),
  editorToolGroup("target", "Target", [
    editorTool("target", "goal", "\u76EE\u6807", "goal", renderEditorCell4({ terrain: "floor", target: "goal" })),
    editorTool("target", "clear", "\u6E05\u76EE\u6807", void 0, renderEditorCell4({ terrain: "floor" }))
  ], false),
  editorToolGroup("actor", "Actor", [
    editorTool("actor", "player", "\u73A9\u5BB6", "player", renderEditorCell4({ terrain: "floor", actor: "player" })),
    editorTool("actor", "clear", "\u6E05\u89D2\u8272", void 0, renderEditorCell4({ terrain: "floor" }))
  ]),
  editorToolGroup("object", "Object", [
    editorTool("object", "crate", "\u7BB1\u5B50", "crate", renderEditorCell4({ terrain: "floor", object: "crate" })),
    editorTool("object", "sticky", "\u9ECF\u5757", "sticky", renderEditorCell4({ terrain: "floor", object: "sticky" })),
    editorTool("object", "clear", "\u6E05\u7269\u4F53", void 0, renderEditorCell4({ terrain: "floor" }))
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    editorTool("mechanism", "push_anchor", "Push \u951A", "push_anchor", renderEditorCell4({ terrain: "floor", mechanism: "push_anchor" })),
    editorTool("mechanism", "pull_anchor", "Pull \u951A", "pull_anchor", renderEditorCell4({ terrain: "floor", mechanism: "pull_anchor" })),
    editorTool("mechanism", "box_anchor", "Box \u951A", "box_anchor", renderEditorCell4({ terrain: "floor", mechanism: "box_anchor" })),
    editorTool("mechanism", "sticky_anchor", "Sticky \u951A", "sticky_anchor", renderEditorCell4({ terrain: "floor", mechanism: "sticky_anchor" })),
    editorTool("mechanism", "clear", "\u6E05\u673A\u5236", void 0, renderEditorCell4({ terrain: "floor" }))
  ])
];
function defaultLevel4(_mechanic, _knowledge) {
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    layout: normalizeAsciiLayout(`
#######
#@ C G#
#     #
#######
`)
  };
}
var realityAnchorAdapter = {
  id: "reality_anchor",
  createRuntime: createRealityAnchorRuntime,
  parseLevel: parseLevel4,
  renderState: renderState4,
  renderVisualState: renderVisualState2,
  step: step4,
  replay: replay4,
  isWin: isWin4,
  isEventWin: isEventWin4,
  editor: {
    layers: layers4,
    defaultGlyph: " ",
    defaultSize: { width: 8, height: 6 },
    defaultLevel: defaultLevel4,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout),
    parseAsciiToBoard: parseEditorBoard4,
    serializeBoard: serializeEditorBoardLayout4,
    renderCell: renderEditorCell4,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel4)
  }
};
function parseEditorBoard4(layout) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph4
  });
}
function parseEditorGlyph4(glyph) {
  switch (glyph) {
    case "#":
      return { terrain: "wall" };
    case "G":
      return { target: "goal" };
    case "+":
      return { target: "goal", actor: "player" };
    case "*":
      return { target: "goal", object: "crate" };
    case "m":
      return { target: "goal", object: "sticky" };
    case "@":
      return { actor: "player" };
    case "C":
      return { object: "crate" };
    case "M":
      return { object: "sticky" };
    case "P":
      return { mechanism: "push_anchor" };
    case "L":
      return { mechanism: "pull_anchor" };
    case "B":
      return { mechanism: "box_anchor" };
    case "S":
      return { mechanism: "sticky_anchor" };
    default:
      return {};
  }
}
function serializeEditorBoardLayout4(board) {
  return serializeEditorBoard(board, serializeEditorCell4);
}
function serializeEditorCell4(cell) {
  if (cell.terrain === "wall") {
    return "#";
  }
  switch (cell.mechanism) {
    case "push_anchor":
      return "P";
    case "pull_anchor":
      return "L";
    case "box_anchor":
      return "B";
    case "sticky_anchor":
      return "S";
  }
  if (cell.actor === "player") {
    return cell.target === "goal" ? "+" : "@";
  }
  if (cell.object === "crate") {
    return cell.target === "goal" ? "*" : "C";
  }
  if (cell.object === "sticky") {
    return cell.target === "goal" ? "m" : "M";
  }
  return cell.target === "goal" ? "G" : " ";
}
function renderEditorCell4(cell) {
  const tile = {
    terrain: cell.terrain === "wall" ? visualLayer("ra.terrain.wall.box_side", "#", "wall") : visualLayer("ra.terrain.floor.box_side", " ", "floor")
  };
  if (cell.target === "goal" && cell.terrain !== "wall") {
    tile.target = visualLayer("target.goal", "G", "goal");
  }
  if (cell.object === "crate") {
    tile.objects = [...tile.objects ?? [], visualLayer("ra.crate.box_side", "C", "crate")];
  }
  if (cell.object === "sticky") {
    tile.objects = [...tile.objects ?? [], visualLayer("ra.sticky.sticky_side", "M", "sticky block")];
  }
  if (cell.mechanism === "push_anchor") {
    tile.objects = [visualLayer("ra.anchor.push_end", "P", "push anchor")];
  }
  if (cell.mechanism === "pull_anchor") {
    tile.objects = [visualLayer("ra.anchor.pull_end", "L", "pull anchor")];
  }
  if (cell.mechanism === "box_anchor") {
    tile.objects = [visualLayer("ra.anchor.box_end", "B", "box anchor")];
  }
  if (cell.mechanism === "sticky_anchor") {
    tile.objects = [visualLayer("ra.anchor.sticky_end", "S", "sticky anchor")];
  }
  if (cell.actor === "player") {
    tile.actors = [visualLayer("ra.player.push_side", "@", "player")];
  }
  return tile;
}

// src/prototypes/runtimeAdapter.ts
function renderVisualStateWithFallback(adapter2, mechanic, state) {
  return adapter2.renderVisualState?.(state, mechanic) ?? renderGlyphVisualBoard(adapter2.renderState(state), state);
}
function renderGlyphVisualBoard(renderedState, size) {
  const rows = renderedState.split("\n").map((row) => row.padEnd(size.width, " "));
  const tiles = [];
  for (let y = 0; y < size.height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < size.width; x += 1) {
      tiles.push(glyphTile(row[x] ?? " ", x, y));
    }
  }
  return { width: size.width, height: size.height, tiles };
}
function glyphTile(glyph, x, y) {
  const tile = {
    x,
    y,
    terrain: visualLayer("terrain.floor", " ", "floor")
  };
  switch (glyph) {
    case " ":
    case ".":
      return tile;
    case "#":
      tile.terrain = visualLayer("terrain.wall", "#", "wall");
      return tile;
    case "G":
      tile.target = visualLayer("target.goal", "G", "goal");
      return tile;
    case "+":
      tile.target = visualLayer("target.goal", "G", "goal");
      tile.actors = [visualLayer("actor.player", "@", "player")];
      return tile;
    case "@":
      tile.actors = [visualLayer("actor.player", "@", "player")];
      return tile;
    case "*":
      tile.target = visualLayer("target.goal", "G", "goal");
      tile.objects = [visualLayer("object.crate", "C", "crate")];
      return tile;
    case "C":
      tile.objects = [visualLayer("object.crate", "C", "crate")];
      return tile;
    case "m":
      tile.target = visualLayer("target.goal", "G", "goal");
      tile.objects = [visualLayer("object.sticky", "M", "sticky")];
      return tile;
    case "M":
      tile.objects = [visualLayer("object.sticky", "M", "sticky")];
      return tile;
    default:
      tile.objects = [visualLayer(`glyph.${glyph}`, glyph, glyph, ["glyph-fallback"])];
      return tile;
  }
}
function visualLayer(visualKey, fallbackGlyph, label, tags = []) {
  return { visualKey, fallbackGlyph, label, tags };
}
function editorVisualForGlyph(glyph) {
  const { x: _x, y: _y, ...visual } = glyphTile(glyph, 0, 0);
  return visual;
}
function editorTool(layerId, id, label, value, visual) {
  return { id, layer: layerId, label, value, visual };
}
function editorToolGroup(id, label, items, exclusive = true) {
  return { id, label, exclusive, items };
}
function editorBoardFromAscii(layout, options) {
  const normalized = normalizeAsciiLayout(layout, {
    rectangular: options.rectangular,
    fill: options.fill
  });
  const rows = normalized.length > 0 ? normalized.split("\n") : [""];
  const width = Math.max(1, ...rows.map((row) => row.length));
  const height = Math.max(1, rows.length);
  const cells = [];
  for (let y = 0; y < height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      cells.push({
        terrain: options.defaultTerrain,
        ...options.parseGlyph(row[x] ?? options.fill ?? " ")
      });
    }
  }
  return { width, height, cells };
}
function serializeEditorBoard(board, serializeCell) {
  const rows = Array.from(
    { length: board.height },
    () => Array.from({ length: board.width }, () => " ")
  );
  for (let y = 0; y < board.height; y += 1) {
    for (let x = 0; x < board.width; x += 1) {
      const cell = board.cells[y * board.width + x];
      rows[y][x] = cell ? serializeCell(cell) : " ";
    }
  }
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}
function editorBoardToVisualBoard(board, renderCell) {
  const tiles = [];
  for (let y = 0; y < board.height; y += 1) {
    for (let x = 0; x < board.width; x += 1) {
      const visual = renderCell(board.cells[y * board.width + x] ?? { terrain: "floor" });
      tiles.push({
        x,
        y,
        terrain: cloneVisualLayer(visual.terrain),
        target: cloneVisualLayer(visual.target),
        actors: visual.actors?.map((layer) => ({ ...layer })),
        objects: visual.objects?.map((layer) => ({ ...layer }))
      });
    }
  }
  return { width: board.width, height: board.height, tiles };
}
function cloneVisualLayer(layer) {
  return layer ? { ...layer } : void 0;
}
function normalizeAsciiLayout(layout, options = {}) {
  const fill = options.fill ?? " ";
  const rows = layout.replace(/\r/g, "").split("\n").map((row) => row.replace(/\t/g, "  "));
  while (rows.length > 0 && rows[0]?.trim() === "") {
    rows.shift();
  }
  while (rows.length > 0 && rows.at(-1)?.trim() === "") {
    rows.pop();
  }
  if (rows.length === 0) {
    return "";
  }
  const contentRows = rows.map((row, index) => {
    const indent = row.match(/^ */)?.[0].length ?? 0;
    return { index, indent, width: row.trimEnd().length - indent };
  }).filter(({ width: width2 }) => width2 > 0);
  const commonIndent = Math.min(...contentRows.map(({ indent }) => indent));
  const firstContentRow = contentRows[0];
  const continuationRows = contentRows.slice(1);
  const continuationIndent = commonIndent === 0 && firstContentRow.index === 0 && continuationRows.length > 0 && continuationRows.every(
    ({ indent, width: width2 }) => indent > 0 && width2 === firstContentRow.width
  ) ? Math.min(...continuationRows.map(({ indent }) => indent)) : 0;
  const dedentedRows = rows.map(
    (row, index) => row.slice(commonIndent || (index > firstContentRow.index ? continuationIndent : 0))
  );
  if (!options.rectangular) {
    return dedentedRows.map((row) => row.trimEnd()).join("\n");
  }
  const width = Math.max(...dedentedRows.map((row) => row.length));
  return dedentedRows.map((row) => row.padEnd(width, fill)).join("\n");
}
function validateLevelByParsing(level, parseLevel5) {
  const errors = [];
  if (!level.id.trim()) {
    errors.push("\u7F3A\u5C11\u5173\u5361 id");
  }
  if (!level.title.trim()) {
    errors.push("\u7F3A\u5C11\u6807\u9898");
  }
  if (!level.layout.trim()) {
    errors.push("\u7F3A\u5C11\u5E03\u5C40");
  }
  try {
    parseLevel5(level);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  return { ok: errors.length === 0, errors };
}
function getRuntimeAdapter(mechanic) {
  if (mechanic.id === candleSokobanAdapter.id) {
    return candleSokobanAdapter;
  }
  if (mechanic.id === pullPortalAdapter.id) {
    return pullPortalAdapter;
  }
  if (mechanic.id === iceSlideAdapter.id) {
    return iceSlideAdapter;
  }
  if (mechanic.id === realityAnchorAdapter.id) {
    return realityAnchorAdapter;
  }
  throw new Error(
    `No runtime adapter registered for mechanic '${mechanic.id}'. Add an adapter before running solver, analyzer, playable, or exporter commands.`
  );
}

// src/prototypes/candle_sokoban/editorPaint.ts
function candleDragKind(tool4) {
  if (tool4.layer !== "mechanism") {
    return void 0;
  }
  if (tool4.id === "drag_unlit") {
    return "unlit";
  }
  if (tool4.id === "drag_lit") {
    return "lit";
  }
  return void 0;
}
function paintDraggedCandle(baseBoard, start, cursor, kind, lockedAxis, retainedDirection) {
  if (!isInBounds(baseBoard, start) || !isInBounds(baseBoard, cursor)) {
    return void 0;
  }
  const axis = lockedAxis ?? inferAxis(start, cursor);
  const end = projectToAxis(start, cursor, axis);
  const cells = pointsBetween(start, end);
  const board = cloneBoard(baseBoard);
  if (cells.length === 1) {
    const direction2 = retainedDirection ?? "r";
    paintMechanism(board, cells[0], `cap_${capGlyph2(direction2, kind)}`);
    return { board, axis, direction: retainedDirection, cells };
  }
  const digit = nextAvailableDigit(baseBoard);
  if (!digit) {
    return void 0;
  }
  const direction = directionFromPoints(start, end);
  for (const bodyCell of cells.slice(0, -1)) {
    paintMechanism(board, bodyCell, `body_${digit}`);
  }
  paintMechanism(board, cells.at(-1), `cap_${capGlyph2(direction, kind)}`);
  return { board, axis, direction, cells };
}
function inferAxis(start, cursor) {
  const deltaX = Math.abs(cursor.x - start.x);
  const deltaY = Math.abs(cursor.y - start.y);
  if (deltaX === 0 && deltaY === 0) {
    return void 0;
  }
  return deltaX >= deltaY ? "horizontal" : "vertical";
}
function projectToAxis(start, cursor, axis) {
  if (axis === "horizontal") {
    return { x: cursor.x, y: start.y };
  }
  if (axis === "vertical") {
    return { x: start.x, y: cursor.y };
  }
  return { ...start };
}
function pointsBetween(start, end) {
  const deltaX = Math.sign(end.x - start.x);
  const deltaY = Math.sign(end.y - start.y);
  const distance = Math.max(
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y)
  );
  return Array.from({ length: distance + 1 }, (_, index) => ({
    x: start.x + deltaX * index,
    y: start.y + deltaY * index
  }));
}
function directionFromPoints(start, end) {
  return end.x > start.x ? "r" : end.x < start.x ? "l" : end.y > start.y ? "d" : "u";
}
function capGlyph2(direction, kind) {
  return kind === "lit" ? direction.toUpperCase() : direction;
}
function nextAvailableDigit(board) {
  const used = new Set(
    board.cells.map((cell) => cell.mechanism?.match(/^body_([1-9])$/)?.[1]).filter((digit) => digit !== void 0)
  );
  return Array.from({ length: 9 }, (_, index) => String(index + 1)).find((digit) => !used.has(digit));
}
function paintMechanism(board, point, mechanism) {
  const cell = board.cells[point.y * board.width + point.x];
  if (!cell) {
    return;
  }
  cell.terrain = "floor";
  cell.mechanism = mechanism;
  delete cell.target;
  delete cell.actor;
  delete cell.object;
}
function cloneBoard(board) {
  return {
    width: board.width,
    height: board.height,
    cells: board.cells.map(cloneCell)
  };
}
function cloneCell(cell) {
  return { ...cell };
}
function isInBounds(board, point) {
  return point.x >= 0 && point.y >= 0 && point.x < board.width && point.y < board.height;
}

// src/web/assets/puzzlescript16/manifest.ts
function sprite(file, label, layerRole, size = 16) {
  return {
    file,
    label,
    layerRole,
    size,
    src: `./assets/puzzlescript16/${file}`
  };
}
function candleSprite(file, label, layerRole) {
  return sprite(file, label, layerRole, 32);
}
var puzzleScript16Sprites = {
  "terrain.floor": sprite("terrain_floor_box_side.png", "floor", "terrain"),
  "terrain.wall": sprite("terrain_wall_box_side.png", "wall", "terrain"),
  "target.goal": sprite("target_goal.png", "goal", "target"),
  "actor.player": sprite("ra_player_push_side.png", "player", "actor"),
  "object.crate": sprite("ra_crate_box_side.png", "crate", "object"),
  "object.sticky": sprite("ra_sticky_sticky_side.png", "sticky block", "object"),
  "ra.terrain.floor.box_side": sprite("terrain_floor_box_side.png", "box-side floor", "terrain"),
  "ra.terrain.floor.sticky_side": sprite("terrain_floor_sticky_side.png", "sticky-side floor", "terrain"),
  "ra.terrain.wall.box_side": sprite("terrain_wall_box_side.png", "box-side wall", "terrain"),
  "ra.terrain.wall.sticky_side": sprite("terrain_wall_sticky_side.png", "sticky-side wall", "terrain"),
  "ra.player.push_side": sprite("ra_player_push_side.png", "push-side player", "actor"),
  "ra.player.pull_side": sprite("ra_player_pull_side.png", "pull-side player", "actor"),
  "ra.crate.box_side": sprite("ra_crate_box_side.png", "box-side crate", "object"),
  "ra.crate.sticky_side": sprite("ra_crate_sticky_side.png", "sticky-side crate", "object"),
  "ra.sticky.box_side": sprite("ra_sticky_box_side.png", "box-side sticky block", "object"),
  "ra.sticky.sticky_side": sprite("ra_sticky_sticky_side.png", "sticky-side sticky block", "object"),
  "ra.anchor.push_end": sprite("ra_anchor_push_end.png", "push anchor end", "object"),
  "ra.anchor.pull_end": sprite("ra_anchor_pull_end.png", "pull anchor end", "object"),
  "ra.anchor.push_end.join_left": sprite("ra_anchor_push_end_join_left.png", "push anchor end joined left", "object"),
  "ra.anchor.push_end.join_right": sprite("ra_anchor_push_end_join_right.png", "push anchor end joined right", "object"),
  "ra.anchor.push_end.join_up": sprite("ra_anchor_push_end_join_up.png", "push anchor end joined up", "object"),
  "ra.anchor.push_end.join_down": sprite("ra_anchor_push_end_join_down.png", "push anchor end joined down", "object"),
  "ra.anchor.pull_end.join_left": sprite("ra_anchor_pull_end_join_left.png", "pull anchor end joined left", "object"),
  "ra.anchor.pull_end.join_right": sprite("ra_anchor_pull_end_join_right.png", "pull anchor end joined right", "object"),
  "ra.anchor.pull_end.join_up": sprite("ra_anchor_pull_end_join_up.png", "pull anchor end joined up", "object"),
  "ra.anchor.pull_end.join_down": sprite("ra_anchor_pull_end_join_down.png", "pull anchor end joined down", "object"),
  "ra.anchor.box_end": sprite("ra_anchor_box_end.png", "box anchor end", "object"),
  "ra.anchor.sticky_end": sprite("ra_anchor_sticky_end.png", "sticky anchor end", "object"),
  "ra.anchor.box_end.join_left": sprite("ra_anchor_box_end_join_left.png", "box anchor end joined left", "object"),
  "ra.anchor.box_end.join_right": sprite("ra_anchor_box_end_join_right.png", "box anchor end joined right", "object"),
  "ra.anchor.box_end.join_up": sprite("ra_anchor_box_end_join_up.png", "box anchor end joined up", "object"),
  "ra.anchor.box_end.join_down": sprite("ra_anchor_box_end_join_down.png", "box anchor end joined down", "object"),
  "ra.anchor.sticky_end.join_left": sprite("ra_anchor_sticky_end_join_left.png", "sticky anchor end joined left", "object"),
  "ra.anchor.sticky_end.join_right": sprite("ra_anchor_sticky_end_join_right.png", "sticky anchor end joined right", "object"),
  "ra.anchor.sticky_end.join_up": sprite("ra_anchor_sticky_end_join_up.png", "sticky anchor end joined up", "object"),
  "ra.anchor.sticky_end.join_down": sprite("ra_anchor_sticky_end_join_down.png", "sticky anchor end joined down", "object"),
  "candle.terrain.floor": candleSprite("candle_terrain_floor.png", "tomb floor", "terrain"),
  "candle.terrain.wall": candleSprite("candle_terrain_wall.png", "tomb wall", "terrain"),
  "candle.player.alive": candleSprite("candle_player_alive.png", "player", "actor"),
  "candle.player.dead": candleSprite("candle_player_dead.png", "dead player", "actor"),
  "candle.brazier.unlit": candleSprite("candle_brazier_unlit.png", "unlit brazier", "object"),
  "candle.brazier.lit": candleSprite("candle_brazier_lit.png", "lit brazier", "object"),
  "candle.wick.left.unlit": candleSprite("candle_wick_left_unlit.png", "unlit wick facing left", "object"),
  "candle.wick.right.unlit": candleSprite("candle_wick_right_unlit.png", "unlit wick facing right", "object"),
  "candle.wick.up.unlit": candleSprite("candle_wick_up_unlit.png", "unlit wick facing up", "object"),
  "candle.wick.down.unlit": candleSprite("candle_wick_down_unlit.png", "unlit wick facing down", "object"),
  "candle.wick.left.lit": candleSprite("candle_wick_left_lit.png", "lit wick facing left", "object"),
  "candle.wick.right.lit": candleSprite("candle_wick_right_lit.png", "lit wick facing right", "object"),
  "candle.wick.up.lit": candleSprite("candle_wick_up_lit.png", "lit wick facing up", "object"),
  "candle.wick.down.lit": candleSprite("candle_wick_down_lit.png", "lit wick facing down", "object")
};
var candleIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var candleDirections = ["left", "right", "up", "down"];
for (const id of candleIds) {
  puzzleScript16Sprites[`candle.body.${id}.middle_horizontal`] = candleSprite(
    `candle_body_${id}_middle_horizontal.png`,
    `candle ${id} horizontal body`,
    "object"
  );
  puzzleScript16Sprites[`candle.body.${id}.middle_vertical`] = candleSprite(
    `candle_body_${id}_middle_vertical.png`,
    `candle ${id} vertical body`,
    "object"
  );
  for (const direction of candleDirections) {
    puzzleScript16Sprites[`candle.body.${id}.tail_${direction}`] = candleSprite(
      `candle_body_${id}_tail_${direction}.png`,
      `candle ${id} tail joined ${direction}`,
      "object"
    );
  }
}
for (const id of [...candleIds, "single"]) {
  for (const direction of candleDirections) {
    for (const state of ["unlit", "lit"]) {
      puzzleScript16Sprites[`candle.cap.${id}.${direction}.${state}`] = candleSprite(
        `candle_cap_${id}_${direction}_${state}.png`,
        `${state} candle ${id} wick end facing ${direction}`,
        "object"
      );
    }
  }
}
var requiredCandleSokobanSpriteKeys = [
  "candle.terrain.floor",
  "candle.terrain.wall",
  "candle.player.alive",
  "candle.player.dead",
  "candle.brazier.unlit",
  "candle.brazier.lit",
  "candle.wick.left.unlit",
  "candle.wick.right.unlit",
  "candle.wick.up.unlit",
  "candle.wick.down.unlit",
  "candle.wick.left.lit",
  "candle.wick.right.lit",
  "candle.wick.up.lit",
  "candle.wick.down.lit",
  ...candleIds.flatMap((id) => [
    `candle.body.${id}.middle_horizontal`,
    `candle.body.${id}.middle_vertical`,
    ...candleDirections.map((direction) => `candle.body.${id}.tail_${direction}`)
  ]),
  ...[...candleIds, "single"].flatMap(
    (id) => candleDirections.flatMap((direction) => [
      `candle.cap.${id}.${direction}.unlit`,
      `candle.cap.${id}.${direction}.lit`
    ])
  )
];

// src/web/fitBoard.ts
var tileSizeProperty = "--tile-size";
var tileSizeCapProperty = "--tile-size-cap";
var BoardFitController = class {
  observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      fitBoard(entry.target);
    }
  });
  observe(container) {
    this.observer.disconnect();
    if (!container) {
      return;
    }
    fitBoard(container);
    this.observer.observe(container);
  }
};
function fitBoard(container) {
  const board = container.querySelector("[data-fit-board]");
  if (!board) {
    return;
  }
  const width = positiveNumber(board.dataset.boardWidth);
  const height = positiveNumber(board.dataset.boardHeight);
  if (!width || !height) {
    return;
  }
  const containerStyle = window.getComputedStyle(container);
  const availableWidth = container.clientWidth - cssPixels(containerStyle.paddingLeft) - cssPixels(containerStyle.paddingRight);
  const availableHeight = container.clientHeight - cssPixels(containerStyle.paddingTop) - cssPixels(containerStyle.paddingBottom);
  const cap = cssPixels(window.getComputedStyle(board).getPropertyValue(tileSizeCapProperty));
  const fittedSize = Math.min(
    cap > 0 ? cap : Number.POSITIVE_INFINITY,
    availableWidth / width,
    availableHeight / height
  );
  if (!Number.isFinite(fittedSize) || fittedSize <= 0) {
    return;
  }
  const safeSize = Math.floor(fittedSize * 1e3) / 1e3;
  board.style.setProperty(tileSizeProperty, `${safeSize}px`);
}
function positiveNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : void 0;
}
function cssPixels(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

// src/web/editor.ts
var inputByKey = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right"
};
var newDraftKey = "__new__";
var sourceFilterStorageKey = "sokoban.editor.sourceFilters.v1";
var sourceSearchStorageKey = "sokoban.editor.sourceSearch.v1";
var modeStorageKey = "sokoban.editor.mode.v1";
var activeToolStorageKey = "sokoban.editor.activeTool.v1";
var defaultSourceFilters = {
  studio: true,
  queued: true,
  archive: true,
  package: false
};
var sourceFilterOptions = [
  { id: "studio", label: "Studio Drafts" },
  { id: "queued", label: "\u5F85\u73A9\u961F\u5217" },
  { id: "archive", label: "Archive Candidates" },
  { id: "package", label: "Package Levels" }
];
var appRoot = document.querySelector("#app");
if (!appRoot) {
  throw new Error("Missing #app root element");
}
var app = appRoot;
var boardFitController = new BoardFitController();
var buildId = true ? "ms1i3sa3" : String(Date.now());
var data = await loadPlayableData();
var adapter = getRuntimeAdapter(data.mechanic);
var editorAdapter = requireEditorAdapter(adapter);
var candleDragEnabled = adapter.id === "candle_sokoban";
var catalog = await loadEditorCatalog();
var selectedKey = initialSourceKey() ?? catalog.sources[0]?.key ?? newDraftKey;
var mode = loadEditorMode();
var activeToolKey = loadActiveToolKey();
var draft = cloneLevel(sourceForKey(selectedKey)?.level ?? editorAdapter.defaultLevel(data.mechanic, data.knowledge));
var saveStatus = catalog.writable ? "\u7F16\u8F91\u670D\u52A1\u5DF2\u8FDE\u63A5" : "\u9759\u6001\u53EA\u8BFB";
var diagnoseResult = null;
var playState = null;
var sourceFilters = loadSourceFilters();
var sourceSearch = loadStringPreference(sourceSearchStorageKey);
var savedDraftSignature = draftSignature(draft);
var dirty = false;
var undoStack = [];
var redoStack = [];
var painting = false;
var paintChanged = false;
var candlePaintStart = null;
var candlePaintBaseLayout = "";
var candlePaintAxis;
var candlePaintDirection;
var candlePaintPreviewCells = [];
var pendingScrollSelected = false;
var sourceSearchRenderTimer;
var restoreSourceSearchFocus = false;
var restoreSourceSearchCursor = 0;
render();
window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z" && !isEditableTarget(event.target)) {
    event.preventDefault();
    undoEdit();
    return;
  }
  if ((event.ctrlKey || event.metaKey) && (event.key.toLowerCase() === "y" || event.shiftKey && event.key.toLowerCase() === "z") && !isEditableTarget(event.target)) {
    event.preventDefault();
    redoEdit();
    return;
  }
  if (mode !== "play" || isEditableTarget(event.target)) {
    return;
  }
  const input = inputByKey[event.key];
  if (input) {
    event.preventDefault();
    captureDraftFromDom();
    applyInput(input);
    render();
    return;
  }
  if (event.key === "z" || event.key === "Z") {
    event.preventDefault();
    undoMove();
    render();
    return;
  }
  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    resetPlayState();
    render();
  }
});
window.addEventListener("pointerup", () => {
  endPaint();
});
window.addEventListener("beforeunload", (event) => {
  if (!dirty) {
    return;
  }
  event.preventDefault();
  event.returnValue = "";
});
function render() {
  const previousView = captureViewState();
  const selectedSource = sourceForKey(selectedKey);
  app.innerHTML = `
    <div class="editor-shell">
      <header class="app-header editor-header">
        <div class="title-block">
          <span class="eyebrow">Web Editor</span>
          <h1>${escapeHtml(data.mechanic.title)}</h1>
        </div>
        <div class="header-metrics">
          <a class="secondary-link" href="./" data-action="back-review">\u8BD5\u73A9\u8BC4\u5BA1</a>
          <span class="save-status" data-dirty="${dirty}">${escapeHtml(statusText())}</span>
        </div>
      </header>
      <aside class="source-rail" aria-label="\u5173\u5361\u6765\u6E90">
        ${renderSourceRail()}
      </aside>
      <main class="editor-workspace">
        ${renderWorkspace(selectedSource)}
      </main>
      <aside class="inspector" aria-label="\u5173\u5361\u5C5E\u6027">
        ${renderInspector(selectedSource)}
      </aside>
    </div>
  `;
  bindEvents();
  restoreViewState(previousView);
  restoreSourceSearchInputFocus();
  boardFitController.observe(app.querySelector(".editor-board-wrap"));
  if (pendingScrollSelected) {
    pendingScrollSelected = false;
    scrollSelectedSourceIntoView();
  }
}
function renderSourceRail() {
  const grouped = sourceGroups();
  const visibleGroups = visibleSourceGroups();
  return `
    <div class="source-actions">
      <button class="primary-button" data-action="new-level">\u65B0\u5173\u5361</button>
      <div class="source-nav-actions">
        <button class="secondary-button" data-action="previous-source" ${visibleSources().length > 1 ? "" : "disabled"}>\u4E0A\u4E00\u4E2A</button>
        <button class="secondary-button" data-action="next-source" ${visibleSources().length > 1 ? "" : "disabled"}>\u4E0B\u4E00\u4E2A</button>
      </div>
    </div>
    ${renderSourceFilters(grouped)}
    ${renderHiddenSelectionNotice()}
    ${visibleGroups.length > 0 ? visibleGroups.map((group) => renderSourceGroup(group.title, group.sources)).join("") : `<div class="empty-state compact">\u6CA1\u6709\u542F\u7528\u7684\u6765\u6E90\u3002</div>`}
  `;
}
function renderSourceFilters(counts) {
  return `
    <section class="source-filter-panel" aria-label="\u6765\u6E90\u7B5B\u9009">
      <div class="source-filter-title">
        <span>\u6765\u6E90\u7B5B\u9009</span>
      </div>
      <div class="source-search">
        <span>\u641C\u7D22</span>
        <div class="source-search-row">
          <input data-source-search value="${escapeAttribute(sourceSearch)}" placeholder="id / title / candidate">
          <button type="button" class="secondary-button" data-action="clear-source-search" ${sourceSearch ? "" : "disabled"}>\u6E05\u7A7A</button>
        </div>
      </div>
      <div class="source-filter-list">
        ${sourceFilterOptions.map((option) => `
          <label class="source-filter-option">
            <input
              type="checkbox"
              data-source-filter="${option.id}"
              ${sourceFilters[option.id] ? "checked" : ""}
            >
            <span>${escapeHtml(option.label)}</span>
            <small>${counts[option.id].length}</small>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}
function renderHiddenSelectionNotice() {
  if (selectedKey === newDraftKey || visibleSources().some((source) => source.key === selectedKey)) {
    return "";
  }
  return `
    <div class="hidden-selection-note">
      <span>\u5F53\u524D\u5173\u5361\u88AB\u7B5B\u9009\u9690\u85CF</span>
      <button type="button" class="secondary-button" data-action="reveal-current-source">\u663E\u793A\u5F53\u524D\u6765\u6E90</button>
    </div>
  `;
}
function renderSourceGroup(title, sources) {
  return `
    <section class="source-group">
      <h2>${escapeHtml(title)} <span>${sources.length}</span></h2>
      <div class="source-list">
        ${sources.length > 0 ? sources.map(renderSourceButton).join("") : `<div class="empty-state compact">\u6682\u65E0</div>`}
      </div>
    </section>
  `;
}
function renderSourceButton(source) {
  const current = selectedKey === source.key;
  const subtitle = [
    source.source,
    source.levelId ?? source.candidateId,
    source.queued ? "queued" : ""
  ].filter(Boolean).join(" \xB7 ");
  return `
    <button class="source-button" data-source-key="${escapeAttribute(source.key)}" aria-current="${current}">
      <span class="candidate-title">${escapeHtml(source.title)}</span>
      <span class="candidate-meta">${escapeHtml(subtitle)}</span>
    </button>
  `;
}
function renderWorkspace(selectedSource) {
  return `
    <section class="editor-card">
      <div class="editor-toolbar">
        <div class="segmented">
          ${renderModeButton("edit", "\u7F16\u8F91")}
          ${renderModeButton("play", "\u8BD5\u73A9")}
          ${renderModeButton("ascii", "ASCII")}
        </div>
        <div class="board-actions">
          <button class="secondary-button" data-action="undo-edit" ${undoStack.length > 0 ? "" : "disabled"}>\u64A4\u9500</button>
          <button class="secondary-button" data-action="redo-edit" ${redoStack.length > 0 ? "" : "disabled"}>\u91CD\u505A</button>
          <button class="secondary-button" data-action="copy-ascii">\u590D\u5236 ASCII</button>
          <button class="secondary-button" data-action="reset-play" ${mode === "play" ? "" : "disabled"}>\u91CD\u5F00</button>
        </div>
      </div>
      ${mode === "ascii" ? renderAsciiPane() : ""}
      ${mode !== "ascii" ? renderPalette() : ""}
      <div class="editor-board-wrap">
        ${mode === "ascii" ? renderAsciiPreview() : renderEditableBoard(selectedSource)}
      </div>
      ${mode === "edit" ? renderGridTools() : ""}
      ${mode === "play" ? renderPlayLog() : ""}
    </section>
  `;
}
function renderModeButton(value, label) {
  return `
    <button class="tab-button" data-mode="${value}" aria-selected="${mode === value}">
      ${escapeHtml(label)}
    </button>
  `;
}
function renderPalette() {
  return `
    <div class="palette layer-palette" aria-label="\u7ED8\u5236\u5DE5\u5177">
      ${editorAdapter.layers.map(renderToolGroup).join("")}
    </div>
  `;
}
function renderToolGroup(group) {
  return `
    <section class="tool-group" aria-label="${escapeAttribute(group.label)}">
      <h3>${escapeHtml(group.label)}</h3>
      <div class="tool-group-items">
        ${group.items.map(renderPaletteButton).join("")}
      </div>
    </section>
  `;
}
function renderPaletteButton(item) {
  const tile = visualForToolItem(item, 0, 0);
  return `
    <button
      class="palette-button"
      data-tool-layer="${escapeAttribute(item.layer)}"
      data-tool-id="${escapeAttribute(item.id)}"
      aria-pressed="${activeToolKey === toolKey(item)}"
      title="${escapeAttribute(item.label)}"
    >
      <span class="palette-swatch">${renderTileLayers(tile)}</span>
      <span>${escapeHtml(item.label)}</span>
    </button>
  `;
}
function renderEditableBoard(_selectedSource) {
  if (mode === "play") {
    ensurePlayState();
    if (!playState) {
      return `<div class="no-board">\u5F53\u524D\u8349\u7A3F\u65E0\u6CD5\u8BD5\u73A9</div>`;
    }
    return renderVisualBoard(boardFromState(adapter, playState.current), "editor-board play-board");
  }
  const classNames = candleDragEnabled ? "editor-board editable-board candle-drag-board" : "editor-board editable-board";
  return renderVisualBoard(boardForDraft(), classNames, true);
}
function renderAsciiPreview() {
  return renderVisualBoard(boardForDraft(), "editor-board");
}
function renderAsciiPane() {
  return `
    <div class="ascii-pane">
      <textarea data-field="ascii">${escapeHtml(draft.layout)}</textarea>
      <div class="button-row">
        <button class="primary-button" data-action="apply-ascii">\u8BFB\u53D6 ASCII</button>
        <button class="secondary-button" data-action="normalize-ascii">\u89C4\u6574</button>
      </div>
    </div>
  `;
}
function renderGridTools() {
  return `
    <div class="grid-tools">
      <span class="active-tool-chip">${escapeHtml(activeToolLabel())}</span>
      <button class="secondary-button" data-action="add-row">\u52A0\u884C</button>
      <button class="secondary-button" data-action="remove-row">\u51CF\u884C</button>
      <button class="secondary-button" data-action="add-col">\u52A0\u5217</button>
      <button class="secondary-button" data-action="remove-col">\u51CF\u5217</button>
    </div>
  `;
}
function renderPlayLog() {
  const status = playState?.won ? "\u5DF2\u5B8C\u6210" : playState ? `${playState.moveCount} \u6B65` : "\u65E0\u6CD5\u8BD5\u73A9";
  const events = playState?.lastEvents.length ? playState.lastEvents.join(", ") : "\u7B49\u5F85\u8F93\u5165";
  const stateSummary = playState ? adapter.describeState?.(playState.current).join(" \xB7 ") : void 0;
  return `
    <div class="play-status-row">
      <span class="play-status ${playState?.won ? "win" : ""}">${escapeHtml(status)}</span>
      <span class="keyboard-hint">${escapeHtml(stateSummary ? `${stateSummary} \xB7 ${events}` : events)}</span>
    </div>
    <div class="trace-log">
      ${(playState?.messages ?? []).slice(0, 8).map((message) => `<div>${escapeHtml(message)}</div>`).join("") || `<div class="muted-copy">\u65E0\u64CD\u4F5C\u8BB0\u5F55</div>`}
    </div>
  `;
}
function renderInspector(selectedSource) {
  const sourceText = selectedSource ? `${selectedSource.source}${selectedSource.readonly ? " \xB7 \u6D3E\u751F\u4FDD\u5B58" : " \xB7 \u539F\u5730\u4FDD\u5B58"}` : "new \xB7 studio draft";
  return `
    <form class="review-form inspector-form">
      <section class="panel-section">
        <div class="section-title">
          <h2>\u5143\u6570\u636E</h2>
          <span class="badge muted">${escapeHtml(sourceText)}</span>
        </div>
        <label class="field">
          <span>ID</span>
          <input data-field="id" value="${escapeAttribute(draft.id)}">
        </label>
        <label class="field">
          <span>\u6807\u9898</span>
          <input data-field="title" value="${escapeAttribute(draft.title)}">
        </label>
        <label class="field">
          <span>Win JSON</span>
          <textarea class="small-textarea" data-field="win">${escapeHtml(formatWin(draft.win))}</textarea>
        </label>
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>\u4FDD\u5B58</h2>
        </div>
        <button
          type="button"
          class="save-button"
          data-action="save-level"
          ${catalog.writable ? "" : "disabled"}
        >${escapeHtml(saveButtonLabel(selectedSource))}</button>
        <button
          type="button"
          class="danger-button"
          data-action="promote-level"
          ${selectedKey.startsWith("studio:") ? "" : "disabled"}
        >\u63D0\u5347\u5230 Package</button>
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>\u6821\u9A8C</h2>
        </div>
        ${renderDraftValidation()}
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>\u8BCA\u65AD</h2>
          <button type="button" class="secondary-button" data-action="diagnose">\u8FD0\u884C</button>
        </div>
        ${renderDiagnostics()}
      </section>
    </form>
  `;
}
function renderDiagnostics() {
  if (!diagnoseResult) {
    return `<div class="diagnostic-card muted-copy">\u5C1A\u672A\u8FD0\u884C</div>`;
  }
  const unique = diagnoseResult.uniqueness;
  const solutionText = diagnoseResult.solution.found ? `${diagnoseResult.solution.inputs.join(" ")} \xB7 ${diagnoseResult.solution.exploredStates} states` : diagnoseResult.solution.reason ?? "no solution";
  return `
    <div class="diagnostic-card" data-status="${escapeAttribute(unique.status)}">
      <strong>${escapeHtml(unique.label)}</strong>
      <span>${escapeHtml(unique.reason ?? "")}</span>
      <span>${escapeHtml(solutionText)}</span>
      <span>${escapeHtml(graphSummary(unique))}</span>
    </div>
    <div class="snapshot-list">
      ${unique.snapshots.map(renderSnapshot).join("")}
    </div>
  `;
}
function renderSnapshot(snapshot) {
  return `
    <article class="snapshot-card">
      ${renderVisualBoard(snapshot.visual, "snapshot-board")}
      <div class="snapshot-meta">
        <strong>Step ${snapshot.step}</strong>
        <span>${escapeHtml(snapshot.input ?? "no input")}</span>
        <span>${escapeHtml(snapshot.events.join(", ") || "no events")}</span>
        <span>\u53EF\u80DC ${snapshot.viableExitCount ?? "-"} \xB7 \u6700\u4F18 ${snapshot.optimalExitCount ?? "-"} \xB7 \u6B7B\u8DEF ${snapshot.deadExitCount ?? "-"}</span>
        <button type="button" class="secondary-button" data-copy-snapshot="${escapeAttribute(snapshot.ascii)}">\u590D\u5236 ASCII</button>
      </div>
    </article>
  `;
}
function renderVisualBoard(board, className, editable = false) {
  const tiles = orderedTiles(board);
  return `
    <div
      class="board ${className}"
      data-fit-board
      data-board-width="${board.width}"
      data-board-height="${board.height}"
      style="grid-template-columns: repeat(${board.width}, var(--tile-size));"
    >
      ${tiles.map((tile) => renderTile(tile, editable)).join("")}
    </div>
  `;
}
function renderTile(tile, editable) {
  const layers5 = renderTileLayers(tile);
  const content = editable ? `<button class="editor-tile-button" data-x="${tile.x}" data-y="${tile.y}" title="${escapeAttribute(tileLabel(tile))}">${layers5}</button>` : `<div class="tile" title="${escapeAttribute(tileLabel(tile))}">${layers5}</div>`;
  return content;
}
function renderTileLayers(tile) {
  return [
    tile.terrain ? renderLayer(tile.terrain, "terrain") : "",
    tile.target ? renderLayer(tile.target, "target") : "",
    ...(tile.objects ?? []).map((layer) => renderLayer(layer, "object")),
    ...(tile.actors ?? []).map((layer) => renderLayer(layer, "actor"))
  ].join("");
}
function renderLayer(layer, layerType) {
  const sprite2 = puzzleScript16Sprites[layer.visualKey];
  const label = layer.label ?? sprite2?.label ?? layer.visualKey;
  const body = sprite2 ? renderSpriteImage(sprite2, label) : renderFallbackGlyph(layer);
  return `
    <span
      class="visual-layer"
      data-layer="${escapeAttribute(layerType)}"
      data-visual-key="${escapeAttribute(layer.visualKey)}"
      data-sprite-state="${sprite2 ? "sprite" : "fallback"}"
      aria-label="${escapeAttribute(label)}"
    >${body}</span>
  `;
}
function renderSpriteImage(sprite2, label) {
  return `
    <img
      class="sprite-img"
      src="${escapeAttribute(sprite2.src)}"
      width="${sprite2.size}"
      height="${sprite2.size}"
      alt=""
      title="${escapeAttribute(label)}"
      decoding="async"
      draggable="false"
    >
  `;
}
function renderFallbackGlyph(layer) {
  return `<span class="fallback-glyph">${escapeHtml(layer.fallbackGlyph)}</span>`;
}
function bindEvents() {
  app.querySelector("[data-action='new-level']")?.addEventListener("click", () => {
    if (!confirmDiscardChanges()) {
      return;
    }
    captureDraftFromDom();
    selectedKey = newDraftKey;
    draft = editorAdapter.defaultLevel(data.mechanic, data.knowledge);
    resetEditHistory();
    markSaved();
    diagnoseResult = null;
    playState = null;
    mode = "edit";
    saveEditorMode(mode);
    saveStatus = "\u65B0\u8349\u7A3F";
    render();
  });
  app.querySelectorAll("[data-source-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sourceKey;
      const source = key ? sourceForKey(key) : void 0;
      if (!key || !source) {
        return;
      }
      if (key === selectedKey) {
        return;
      }
      if (!confirmDiscardChanges()) {
        return;
      }
      selectSource(source);
    });
  });
  app.querySelector("[data-action='previous-source']")?.addEventListener("click", () => {
    selectRelativeSource(-1);
  });
  app.querySelector("[data-action='next-source']")?.addEventListener("click", () => {
    selectRelativeSource(1);
  });
  app.querySelector("[data-action='reveal-current-source']")?.addEventListener("click", () => {
    revealCurrentSource();
    render();
  });
  app.querySelector("[data-action='back-review']")?.addEventListener("click", (event) => {
    if (!confirmDiscardChanges()) {
      event.preventDefault();
    }
  });
  app.querySelectorAll("[data-source-filter]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.dataset.sourceFilter;
      if (!id) {
        return;
      }
      captureDraftFromDom();
      sourceFilters = {
        ...sourceFilters,
        [id]: checkbox.checked
      };
      saveSourceFilters(sourceFilters);
      render();
    });
  });
  app.querySelector("[data-source-search]")?.addEventListener("input", (event) => {
    const input = event.currentTarget;
    restoreSourceSearchCursor = input.selectionStart ?? input.value.length;
    restoreSourceSearchFocus = true;
    sourceSearch = input.value;
    saveStringPreference(sourceSearchStorageKey, sourceSearch);
    if (sourceSearchRenderTimer !== void 0) {
      window.clearTimeout(sourceSearchRenderTimer);
    }
    sourceSearchRenderTimer = window.setTimeout(() => {
      sourceSearchRenderTimer = void 0;
      captureDraftFromDom();
      render();
    }, 80);
  });
  app.querySelector("[data-source-search]")?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    clearSourceSearch();
  });
  app.querySelector("[data-action='clear-source-search']")?.addEventListener("click", () => {
    clearSourceSearch();
  });
  app.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      captureDraftFromDom();
      mode = button.dataset.mode ?? "edit";
      saveEditorMode(mode);
      if (mode === "play") {
        resetPlayState();
      }
      render();
    });
  });
  app.querySelectorAll("[data-tool-layer][data-tool-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const layer = button.dataset.toolLayer;
      const id = button.dataset.toolId;
      if (!layer || !id) {
        return;
      }
      activeToolKey = `${layer}:${id}`;
      saveStringPreference(activeToolStorageKey, activeToolKey);
      render();
    });
  });
  app.querySelectorAll("[data-x][data-y]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      if (candleDragEnabled && event.button !== 0) {
        return;
      }
      const x = Number(button.dataset.x);
      const y = Number(button.dataset.y);
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        return;
      }
      event.preventDefault();
      beginPaint(x, y);
    });
    if (!candleDragEnabled) {
      button.addEventListener("pointerenter", () => {
        if (!painting) {
          return;
        }
        const x = Number(button.dataset.x);
        const y = Number(button.dataset.y);
        if (!Number.isInteger(x) || !Number.isInteger(y)) {
          return;
        }
        continuePaint(x, y, button);
      });
    }
  });
  app.querySelector(".candle-drag-board")?.addEventListener("pointermove", (event) => {
    if (!painting || (event.buttons & 1) === 0 || !(event.target instanceof Element)) {
      return;
    }
    const button = event.target.closest("[data-x][data-y]");
    if (!button) {
      return;
    }
    const x = Number(button.dataset.x);
    const y = Number(button.dataset.y);
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      return;
    }
    continuePaint(x, y, button);
  });
  app.querySelector("[data-action='add-row']")?.addEventListener("click", () => resizeGrid(0, 1));
  app.querySelector("[data-action='remove-row']")?.addEventListener("click", () => resizeGrid(0, -1));
  app.querySelector("[data-action='add-col']")?.addEventListener("click", () => resizeGrid(1, 0));
  app.querySelector("[data-action='remove-col']")?.addEventListener("click", () => resizeGrid(-1, 0));
  app.querySelector("[data-action='undo-edit']")?.addEventListener("click", () => {
    undoEdit();
  });
  app.querySelector("[data-action='redo-edit']")?.addEventListener("click", () => {
    redoEdit();
  });
  app.querySelector("[data-action='apply-ascii']")?.addEventListener("click", () => {
    const value = app.querySelector("[data-field='ascii']")?.value ?? "";
    pushUndoSnapshot();
    draft.layout = editorAdapter.normalizeAscii(value);
    markDirty("ASCII \u5DF2\u5BFC\u5165");
    diagnoseResult = null;
    playState = null;
    mode = "edit";
    saveEditorMode(mode);
    render();
  });
  app.querySelector("[data-action='normalize-ascii']")?.addEventListener("click", () => {
    const textarea = app.querySelector("[data-field='ascii']");
    if (!textarea) {
      return;
    }
    textarea.value = editorAdapter.normalizeAscii(textarea.value);
  });
  app.querySelector("[data-action='copy-ascii']")?.addEventListener("click", () => {
    void copyText(draft.layout);
  });
  app.querySelector("[data-action='reset-play']")?.addEventListener("click", () => {
    resetPlayState();
    render();
  });
  app.querySelector("[data-action='save-level']")?.addEventListener("click", () => {
    void saveLevel();
  });
  app.querySelector("[data-action='promote-level']")?.addEventListener("click", () => {
    void promoteLevel();
  });
  app.querySelector("[data-action='diagnose']")?.addEventListener("click", () => {
    void diagnoseLevel();
  });
  app.querySelectorAll("[data-copy-snapshot]").forEach((button) => {
    button.addEventListener("click", () => {
      void copyText(button.dataset.copySnapshot ?? "");
    });
  });
  app.querySelectorAll("[data-field]").forEach((field) => {
    field.addEventListener("input", () => {
      if (mode === "ascii" && field.getAttribute("data-field") === "ascii") {
        return;
      }
      captureDraftFromDom();
      markDirty();
      updateSaveStatusText();
    });
    field.addEventListener("change", () => {
      captureDraftFromDom();
      markDirty();
      updateSaveStatusText();
    });
  });
}
function captureDraftFromDom() {
  const id = fieldValue("id");
  if (id !== void 0) {
    draft.id = id.trim();
  }
  const title = fieldValue("title");
  if (title !== void 0) {
    draft.title = title.trim();
  }
  const win = fieldValue("win");
  if (win !== void 0) {
    try {
      const parsed = win.trim() ? JSON.parse(win) : void 0;
      draft.win = parsed;
    } catch {
      saveStatus = "Win JSON \u6682\u672A\u89E3\u6790";
    }
  }
  if (mode === "ascii") {
    const ascii = fieldValue("ascii");
    if (ascii !== void 0) {
      draft.layout = ascii.replace(/\r/g, "").trimEnd();
    }
  }
}
function fieldValue(name) {
  return app.querySelector(`[data-field='${name}']`)?.value;
}
function captureViewState() {
  return {
    sourceScrollTop: app.querySelector(".source-rail")?.scrollTop ?? 0,
    paletteScrollLeft: app.querySelector(".palette")?.scrollLeft ?? 0
  };
}
function restoreViewState(state) {
  const sourceRail = app.querySelector(".source-rail");
  if (sourceRail) {
    sourceRail.scrollTop = state.sourceScrollTop;
  }
  const palette = app.querySelector(".palette");
  if (palette) {
    palette.scrollLeft = state.paletteScrollLeft;
  }
}
function restoreSourceSearchInputFocus() {
  if (!restoreSourceSearchFocus) {
    return;
  }
  restoreSourceSearchFocus = false;
  const input = app.querySelector("[data-source-search]");
  if (!input) {
    return;
  }
  input.focus();
  const cursor = Math.min(restoreSourceSearchCursor, input.value.length);
  input.setSelectionRange(cursor, cursor);
}
function clearSourceSearch() {
  if (sourceSearchRenderTimer !== void 0) {
    window.clearTimeout(sourceSearchRenderTimer);
    sourceSearchRenderTimer = void 0;
  }
  captureDraftFromDom();
  sourceSearch = "";
  restoreSourceSearchCursor = 0;
  restoreSourceSearchFocus = true;
  saveStringPreference(sourceSearchStorageKey, sourceSearch);
  render();
}
function sourceGroups() {
  return {
    studio: catalog.sources.filter((source) => source.source === "studio"),
    queued: catalog.sources.filter((source) => source.queued),
    archive: catalog.sources.filter((source) => source.source === "archive" && !source.queued),
    package: catalog.sources.filter((source) => source.source === "package" && !source.queued)
  };
}
function visibleSourceGroups() {
  const grouped = sourceGroups();
  return sourceFilterOptions.filter((option) => sourceFilters[option.id]).map((option) => ({
    id: option.id,
    title: option.label,
    sources: filterSourcesBySearch(grouped[option.id])
  })).filter((group) => group.sources.length > 0);
}
function visibleSources() {
  const byKey = /* @__PURE__ */ new Map();
  for (const group of visibleSourceGroups()) {
    for (const source of group.sources) {
      if (!byKey.has(source.key)) {
        byKey.set(source.key, source);
      }
    }
  }
  return [...byKey.values()];
}
function filterSourcesBySearch(sources) {
  const query = sourceSearch.trim().toLowerCase();
  if (!query) {
    return sources;
  }
  return sources.filter((source) => sourceMatchesSearch(source, query));
}
function sourceMatchesSearch(source, query) {
  return [
    source.key,
    source.source,
    source.level.id,
    source.level.title,
    source.levelId,
    source.candidateId,
    source.sourceFile,
    source.level.lineage?.source,
    source.level.lineage?.source_level_id,
    source.level.lineage?.source_candidate_id
  ].some((value) => String(value ?? "").toLowerCase().includes(query));
}
function selectRelativeSource(delta) {
  const sources = visibleSources();
  if (sources.length === 0 || !confirmDiscardChanges()) {
    return;
  }
  const currentIndex = Math.max(0, sources.findIndex((source) => source.key === selectedKey));
  const nextIndex = (currentIndex + delta + sources.length) % sources.length;
  const nextSource = sources[nextIndex];
  if (nextSource) {
    selectSource(nextSource);
  }
}
function selectSource(source) {
  captureDraftFromDom();
  selectedKey = source.key;
  draft = cloneLevel(source.level);
  resetEditHistory();
  markSaved();
  diagnoseResult = null;
  playState = null;
  mode = "edit";
  saveEditorMode(mode);
  saveStatus = source.readonly ? "\u53EA\u8BFB\u6765\u6E90\uFF0C\u4FDD\u5B58\u4F1A\u6D3E\u751F\u5230 Studio" : "Studio draft";
  pendingScrollSelected = true;
  render();
}
function revealCurrentSource() {
  const source = sourceForKey(selectedKey);
  if (!source) {
    return;
  }
  sourceFilters = {
    ...sourceFilters,
    [source.source]: true,
    queued: source.queued ? true : sourceFilters.queued
  };
  sourceSearch = "";
  saveSourceFilters(sourceFilters);
  saveStringPreference(sourceSearchStorageKey, sourceSearch);
  pendingScrollSelected = true;
}
function scrollSelectedSourceIntoView() {
  const buttons = [...app.querySelectorAll("[data-source-key]")];
  const selected = buttons.find((button) => button.dataset.sourceKey === selectedKey);
  selected?.scrollIntoView({ block: "nearest" });
}
function statusText() {
  if (dirty) {
    return `${saveStatus} \xB7 \u672A\u4FDD\u5B58`;
  }
  return saveStatus;
}
function draftSignature(level) {
  return JSON.stringify(level);
}
function markSaved() {
  savedDraftSignature = draftSignature(draft);
  dirty = false;
}
function markDirty(status) {
  dirty = draftSignature(draft) !== savedDraftSignature;
  if (!dirty) {
    if (status || saveStatus.includes("\u672A\u4FDD\u5B58")) {
      saveStatus = "\u5DF2\u56DE\u5230\u4FDD\u5B58\u7248\u672C";
    }
    return;
  }
  if (status) {
    saveStatus = status;
  } else if (dirty && !saveStatus.includes("\u672A\u4FDD\u5B58")) {
    saveStatus = "\u672A\u4FDD\u5B58\u4FEE\u6539";
  }
}
function updateSaveStatusText() {
  const element = app.querySelector(".save-status");
  if (element) {
    element.textContent = statusText();
    element.dataset.dirty = String(dirty);
  }
}
function confirmDiscardChanges() {
  if (!dirty) {
    return true;
  }
  return window.confirm("\u5F53\u524D\u8349\u7A3F\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7EE7\u7EED\u4F1A\u4E22\u5931\u8FD9\u4E9B\u4FEE\u6539\u3002");
}
function pushUndoSnapshot() {
  captureDraftFromDom();
  undoStack.push(draftSignature(draft));
  if (undoStack.length > 100) {
    undoStack.shift();
  }
  redoStack = [];
}
function resetEditHistory() {
  undoStack = [];
  redoStack = [];
}
function undoEdit() {
  if (undoStack.length === 0) {
    return;
  }
  captureDraftFromDom();
  redoStack.push(draftSignature(draft));
  const previous = undoStack.pop();
  if (!previous) {
    return;
  }
  restoreDraftSnapshot(previous);
}
function redoEdit() {
  if (redoStack.length === 0) {
    return;
  }
  captureDraftFromDom();
  undoStack.push(draftSignature(draft));
  const next = redoStack.pop();
  if (!next) {
    return;
  }
  restoreDraftSnapshot(next);
}
function restoreDraftSnapshot(snapshot) {
  draft = JSON.parse(snapshot);
  diagnoseResult = null;
  playState = null;
  markDirty("\u672A\u4FDD\u5B58\u4FEE\u6539");
  render();
}
function beginPaint(x, y) {
  if (mode !== "edit") {
    return;
  }
  captureDraftFromDom();
  pushUndoSnapshot();
  painting = true;
  paintChanged = false;
  const tool4 = activeToolItem();
  if (tool4 && candleDragKind(tool4)) {
    candlePaintStart = { x, y };
    candlePaintBaseLayout = draft.layout;
    candlePaintAxis = void 0;
    candlePaintDirection = void 0;
    candlePaintPreviewCells = [];
    updateDraggedCandle(x, y);
    return;
  }
  clearCandlePaintGesture();
  if (paintCell(x, y)) {
    paintChanged = true;
    renderCellButton(x, y);
  }
}
function continuePaint(x, y, button) {
  if (!painting || mode !== "edit") {
    return;
  }
  if (candlePaintStart) {
    updateDraggedCandle(x, y);
    return;
  }
  if (paintCell(x, y)) {
    paintChanged = true;
    renderCellButton(x, y, button);
  }
}
function endPaint() {
  if (!painting) {
    return;
  }
  painting = false;
  if (!paintChanged) {
    undoStack.pop();
    clearCandlePaintGesture();
    return;
  }
  clearCandlePaintGesture();
  diagnoseResult = null;
  playState = null;
  markDirty("\u672A\u4FDD\u5B58\u4FEE\u6539");
  render();
}
function updateDraggedCandle(x, y) {
  const tool4 = activeToolItem();
  const kind = tool4 ? candleDragKind(tool4) : void 0;
  if (!candlePaintStart || !kind) {
    return;
  }
  const baseBoard = editorAdapter.parseAsciiToBoard(candlePaintBaseLayout);
  const result = paintDraggedCandle(
    baseBoard,
    candlePaintStart,
    { x, y },
    kind,
    candlePaintAxis,
    candlePaintDirection
  );
  if (!result) {
    return;
  }
  const cellsToRender = [...candlePaintPreviewCells, ...result.cells];
  draft.layout = editorAdapter.serializeBoard(result.board);
  candlePaintAxis = result.axis;
  candlePaintDirection = result.direction;
  candlePaintPreviewCells = result.cells;
  paintChanged = draft.layout !== candlePaintBaseLayout;
  renderCellButtons(cellsToRender);
}
function clearCandlePaintGesture() {
  candlePaintStart = null;
  candlePaintBaseLayout = "";
  candlePaintAxis = void 0;
  candlePaintDirection = void 0;
  candlePaintPreviewCells = [];
}
function paintCell(x, y) {
  const before = draft.layout;
  applyActiveTool(x, y);
  return draft.layout !== before;
}
function renderCellButton(x, y, button = cellButton(x, y)) {
  if (!button) {
    return;
  }
  const board = boardFromLayout(draft.layout);
  const tile = board.tiles.find((candidate) => candidate.x === x && candidate.y === y);
  if (!tile) {
    return;
  }
  button.innerHTML = renderTileLayers(tile);
  button.title = tileLabel(tile);
}
function renderCellButtons(points) {
  const rendered = /* @__PURE__ */ new Set();
  for (const point of points) {
    const key = `${point.x},${point.y}`;
    if (rendered.has(key)) {
      continue;
    }
    rendered.add(key);
    renderCellButton(point.x, point.y);
  }
}
function cellButton(x, y) {
  return [...app.querySelectorAll("[data-x][data-y]")].find((button) => button.dataset.x === String(x) && button.dataset.y === String(y));
}
function activeToolLabel() {
  const tool4 = activeToolItem();
  return tool4 ? `\u5F53\u524D\uFF1A${tool4.label}` : "\u5F53\u524D\uFF1A\u65E0\u5DE5\u5177";
}
function saveButtonLabel(selectedSource) {
  if (!catalog.writable) {
    return "\u9759\u6001\u53EA\u8BFB";
  }
  if (!selectedSource || selectedSource.readonly || selectedKey === newDraftKey) {
    return "\u4FDD\u5B58\u4E3A Studio Draft";
  }
  return dirty ? "\u4FDD\u5B58 Studio Draft" : "\u5DF2\u4FDD\u5B58";
}
function renderDraftValidation() {
  const issues = [];
  try {
    const board = editorAdapter.parseAsciiToBoard(draft.layout);
    if (board.width < 1 || board.height < 1) {
      issues.push("\u68CB\u76D8\u4E3A\u7A7A\u3002");
    }
    const validation = editorAdapter.validateLevel(draft, data.mechanic);
    issues.push(...validation.errors);
  } catch (error) {
    issues.push(error instanceof Error ? error.message : "ASCII \u65E0\u6CD5\u89E3\u6790\u3002");
  }
  if (issues.length === 0) {
    return `<div class="draft-validation ok">\u5F53\u524D\u8349\u7A3F\u683C\u5F0F\u53EF\u89E3\u6790\u3002</div>`;
  }
  return `
    <div class="draft-validation warn">
      ${issues.slice(0, 4).map((issue) => `<div>${escapeHtml(issue)}</div>`).join("")}
    </div>
  `;
}
function applyActiveTool(x, y) {
  const tool4 = activeToolItem();
  if (!tool4) {
    return;
  }
  const board = editorAdapter.parseAsciiToBoard(draft.layout);
  const cell = board.cells[y * board.width + x];
  if (!cell || x < 0 || y < 0 || x >= board.width || y >= board.height) {
    return;
  }
  applyToolToCell(cell, tool4);
  draft.layout = editorAdapter.serializeBoard(board);
}
function resizeGrid(deltaWidth, deltaHeight) {
  captureDraftFromDom();
  const board = editorAdapter.parseAsciiToBoard(draft.layout);
  const nextWidth = Math.max(1, board.width + deltaWidth);
  const nextHeight = Math.max(1, board.height + deltaHeight);
  if (nextWidth === board.width && nextHeight === board.height) {
    return;
  }
  pushUndoSnapshot();
  const nextCells = [];
  for (let y = 0; y < nextHeight; y += 1) {
    for (let x = 0; x < nextWidth; x += 1) {
      nextCells.push(
        x < board.width && y < board.height ? cloneEditorCell(board.cells[y * board.width + x] ?? defaultEditorCell()) : defaultEditorCell()
      );
    }
  }
  draft.layout = editorAdapter.serializeBoard({
    width: nextWidth,
    height: nextHeight,
    cells: nextCells
  });
  diagnoseResult = null;
  playState = null;
  markDirty("\u672A\u4FDD\u5B58\u4FEE\u6539");
  render();
}
function boardForDraft() {
  try {
    const state = adapter.parseLevel(draft);
    return renderVisualStateWithFallback(adapter, data.mechanic, state);
  } catch {
    return boardFromLayout(draft.layout);
  }
}
function boardFromState(runtimeAdapter, state) {
  return renderVisualStateWithFallback(runtimeAdapter, data.mechanic, state);
}
function boardFromLayout(layout) {
  const board = editorAdapter.parseAsciiToBoard(layout);
  return editorBoardToVisualBoard(board, editorAdapter.renderCell);
}
function visualForToolItem(item, x, y) {
  const visual = item.visual ?? editorAdapter.renderCell(defaultEditorCell());
  return {
    x,
    y,
    terrain: cloneLayer(visual.terrain),
    target: cloneLayer(visual.target),
    objects: visual.objects?.map((layer) => ({ ...layer })),
    actors: visual.actors?.map((layer) => ({ ...layer }))
  };
}
function cloneLayer(layer) {
  return layer ? { ...layer } : void 0;
}
function firstToolKey() {
  const first = editorAdapter.layers[0]?.items[0];
  return first ? toolKey(first) : "";
}
function toolKey(item) {
  return `${item.layer}:${item.id}`;
}
function activeToolItem() {
  for (const group of editorAdapter.layers) {
    const tool4 = group.items.find((item) => toolKey(item) === activeToolKey);
    if (tool4) {
      return tool4;
    }
  }
  return void 0;
}
function applyToolToCell(cell, tool4) {
  if (tool4.layer === "terrain") {
    cell.terrain = tool4.value ?? "floor";
    if (cell.terrain === "wall") {
      clearCellContent(cell);
    }
    return;
  }
  if (cell.terrain === "wall") {
    cell.terrain = "floor";
  }
  if (tool4.layer === "target") {
    if (tool4.value) {
      cell.target = tool4.value;
      delete cell.mechanism;
    } else {
      delete cell.target;
    }
    return;
  }
  if (tool4.layer === "actor") {
    if (tool4.value) {
      cell.actor = tool4.value;
      delete cell.object;
      delete cell.mechanism;
    } else {
      delete cell.actor;
    }
    return;
  }
  if (tool4.layer === "object") {
    if (tool4.value) {
      cell.object = tool4.value;
      delete cell.actor;
      delete cell.mechanism;
    } else {
      delete cell.object;
    }
    return;
  }
  if (tool4.layer === "mechanism") {
    if (tool4.value) {
      cell.mechanism = tool4.value;
      delete cell.target;
      delete cell.actor;
      delete cell.object;
    } else {
      delete cell.mechanism;
    }
  }
}
function clearCellContent(cell) {
  delete cell.target;
  delete cell.actor;
  delete cell.object;
  delete cell.mechanism;
}
function defaultEditorCell() {
  return { terrain: "floor" };
}
function cloneEditorCell(cell) {
  return { ...cell };
}
function ensurePlayState() {
  if (!playState) {
    resetPlayState();
  }
}
function resetPlayState() {
  try {
    playState = {
      current: adapter.parseLevel(draft),
      history: [],
      lastEvents: [],
      moveCount: 0,
      won: false,
      messages: []
    };
    saveStatus = "\u8BD5\u73A9\u4E2D";
  } catch (error) {
    playState = null;
    saveStatus = error instanceof Error ? `\u65E0\u6CD5\u8BD5\u73A9\uFF1A${error.message}` : "\u65E0\u6CD5\u8BD5\u73A9";
  }
}
function applyInput(input) {
  ensurePlayState();
  if (!playState || playState.won) {
    return;
  }
  const result = adapter.step(data.mechanic, playState.current, input, {
    winCondition: draft.win ?? data.mechanic.win
  });
  playState.lastEvents = result.events;
  if (!result.legal) {
    playState.messages = [`${input}: ${result.reason ?? "illegal"}`, ...playState.messages];
    return;
  }
  playState.history.push(playState.current);
  playState.current = result.state;
  playState.moveCount += 1;
  playState.won = adapter.isWin(playState.current, draft.win ?? data.mechanic.win) || adapter.isEventWin(result.events, draft.win ?? data.mechanic.win);
  playState.messages = [
    `${input}: ${result.events.length > 0 ? result.events.join(", ") : "move"}`,
    ...playState.messages
  ];
}
function undoMove() {
  if (!playState || playState.history.length === 0) {
    return;
  }
  playState.current = playState.history.pop();
  playState.moveCount = Math.max(0, playState.moveCount - 1);
  playState.won = false;
  playState.lastEvents = [];
  playState.messages = ["undo", ...playState.messages];
}
async function saveLevel() {
  captureDraftFromDom();
  saveStatus = "\u4FDD\u5B58\u4E2D...";
  render();
  try {
    const response = await fetch("./api/editor/save-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceKey: selectedKey === newDraftKey ? void 0 : selectedKey,
        level: draft
      })
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json();
    catalog = result.catalog;
    selectedKey = result.savedKey;
    draft = cloneLevel(result.level);
    markSaved();
    diagnoseResult = null;
    playState = null;
    saveStatus = `\u5DF2\u4FDD\u5B58 ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `\u4FDD\u5B58\u5931\u8D25\uFF1A${error.message}` : "\u4FDD\u5B58\u5931\u8D25";
  }
  render();
}
async function promoteLevel() {
  captureDraftFromDom();
  if (!selectedKey.startsWith("studio:")) {
    saveStatus = "\u53EA\u6709 Studio draft \u53EF\u4EE5\u63D0\u5347";
    render();
    return;
  }
  if (dirty) {
    saveStatus = "\u8BF7\u5148\u4FDD\u5B58\u5F53\u524D Studio draft \u518D\u63D0\u5347";
    render();
    return;
  }
  saveStatus = "\u63D0\u5347\u4E2D...";
  render();
  try {
    const response = await fetch("./api/editor/promote-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ levelId: draft.id })
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json();
    catalog = result.catalog;
    saveStatus = "\u5DF2\u63D0\u5347\u5230 package levels.yml";
  } catch (error) {
    saveStatus = error instanceof Error ? `\u63D0\u5347\u5931\u8D25\uFF1A${error.message}` : "\u63D0\u5347\u5931\u8D25";
  }
  render();
}
async function diagnoseLevel() {
  captureDraftFromDom();
  saveStatus = "\u8BCA\u65AD\u4E2D...";
  render();
  try {
    const response = await fetch("./api/editor/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: draft })
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    diagnoseResult = await response.json();
    saveStatus = `\u8BCA\u65AD\u5B8C\u6210 ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `\u8BCA\u65AD\u5931\u8D25\uFF1A${error.message}` : "\u8BCA\u65AD\u5931\u8D25";
  }
  render();
}
async function loadEditorCatalog() {
  try {
    return await fetchJson(`./api/editor-data?v=${encodeURIComponent(buildId)}`);
  } catch {
    return {
      mechanic: data.mechanic.id,
      writable: false,
      sources: data.levels.levels.map((level) => ({
        key: `package:${level.id}`,
        source: "package",
        levelId: level.id,
        title: level.title,
        level,
        readonly: true,
        queued: false,
        metadata: {}
      }))
    };
  }
}
async function loadPlayableData() {
  try {
    return await fetchJson(`./api/playable-data?v=${encodeURIComponent(buildId)}`);
  } catch {
    return await fetchJson(`./data.json?v=${encodeURIComponent(buildId)}`);
  }
}
function sourceForKey(key) {
  return catalog.sources.find((source) => source.key === key);
}
function loadEditorMode() {
  const value = loadStringPreference(modeStorageKey);
  return isEditorMode(value) ? value : "edit";
}
function saveEditorMode(value) {
  saveStringPreference(modeStorageKey, value);
}
function isEditorMode(value) {
  return value === "edit" || value === "play" || value === "ascii";
}
function loadActiveToolKey() {
  const value = loadStringPreference(activeToolStorageKey);
  return isKnownToolKey(value) ? value : firstToolKey();
}
function isKnownToolKey(value) {
  return editorAdapter.layers.some((group) => group.items.some((item) => toolKey(item) === value));
}
function loadStringPreference(key) {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function saveStringPreference(key, value) {
  try {
    if (value) {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
    }
  } catch {
  }
}
function loadSourceFilters() {
  try {
    const raw = window.localStorage.getItem(sourceFilterStorageKey);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...defaultSourceFilters,
      ...Object.fromEntries(
        Object.entries(parsed).filter(
          (entry) => isSourceFilterId(entry[0]) && typeof entry[1] === "boolean"
        )
      )
    };
  } catch {
    return { ...defaultSourceFilters };
  }
}
function saveSourceFilters(filters) {
  try {
    window.localStorage.setItem(sourceFilterStorageKey, JSON.stringify(filters));
  } catch {
  }
}
function isSourceFilterId(value) {
  return value === "studio" || value === "queued" || value === "archive" || value === "package";
}
function initialSourceKey() {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("source");
  if (source && sourceForKey(source)) {
    return source;
  }
  const candidateId = params.get("candidateId");
  if (candidateId) {
    const archiveKey = `archive:${candidateId}`;
    if (sourceForKey(archiveKey)) {
      return archiveKey;
    }
  }
  const levelId = params.get("levelId");
  if (levelId) {
    return catalog.sources.find(
      (source2) => source2.levelId === levelId || source2.level.id === levelId || source2.level.lineage?.source_level_id === levelId
    )?.key;
  }
  return void 0;
}
function graphSummary(unique) {
  const parts = [
    unique.reachableStateCount !== void 0 ? `${unique.reachableStateCount} states` : "",
    unique.legalTransitionCount !== void 0 ? `${unique.legalTransitionCount} edges` : "",
    unique.sccCount !== void 0 ? `${unique.sccCount} SCC` : ""
  ].filter(Boolean);
  return parts.join(" \xB7 ");
}
function formatWin(win) {
  return win ? JSON.stringify(win, null, 2) : "";
}
function cloneLevel(level) {
  return JSON.parse(JSON.stringify(level));
}
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    saveStatus = "\u5DF2\u590D\u5236";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    saveStatus = "\u5DF2\u590D\u5236";
  }
  render();
}
function orderedTiles(board) {
  return [...board.tiles].sort((a, b) => a.y - b.y || a.x - b.x);
}
function tileLabel(tile) {
  return [
    tile.terrain?.label,
    tile.target?.label,
    ...(tile.objects ?? []).map((layer) => layer.label ?? layer.fallbackGlyph),
    ...(tile.actors ?? []).map((layer) => layer.label ?? layer.fallbackGlyph)
  ].filter(Boolean).join(", ");
}
function isEditableTarget(target) {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target instanceof HTMLButtonElement;
}
function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function escapeAttribute(value) {
  return escapeHtml(value);
}
function requireEditorAdapter(runtimeAdapter) {
  if (!runtimeAdapter.editor) {
    throw new Error(`Runtime adapter '${runtimeAdapter.id}' does not expose editor support`);
  }
  return runtimeAdapter.editor;
}
//# sourceMappingURL=editor.js.map
