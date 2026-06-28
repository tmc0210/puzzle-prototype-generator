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

// src/prototypes/ice_slide_escape/mechanics.ts
var vectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
function pointKey(point) {
  return `${point.x},${point.y}`;
}
function add(point, dir) {
  const vector = vectors[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function subtract(point, dir) {
  const vector = vectors[dir];
  return { x: point.x - vector.x, y: point.y - vector.y };
}
function parseLevel(level) {
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
  const state2 = {
    width,
    height,
    walls,
    targets,
    player,
    ice: sortPoints(ice)
  };
  validateExplicitRequest(level, state2);
  return state2;
}
function assignPlayer(level, current, point) {
  if (current) {
    throw new Error(`Level ${level.id} has multiple player markers`);
  }
  return point;
}
function validateExplicitRequest(level, state2) {
  const start = readWinPoint(level.win, "player_start");
  if (start) {
    const point = toPoint(start);
    if (!isEdgeCell(state2, point)) {
      throw new Error(`Level ${level.id} player_start must be an edge cell`);
    }
    if (!isCellFreeForPlayer(state2, point)) {
      throw new Error(`Level ${level.id} player_start must initially be standable`);
    }
  }
  const goal = readWinPoint(level.win, "player_goal");
  if (goal) {
    const point = toPoint(goal);
    if (!isEdgeCell(state2, point)) {
      throw new Error(`Level ${level.id} player_goal must be an edge cell`);
    }
  }
}
function cloneState(state2) {
  return {
    width: state2.width,
    height: state2.height,
    walls: new Set(state2.walls),
    targets: new Set(state2.targets),
    player: { ...state2.player },
    ice: state2.ice.map((point) => ({ ...point }))
  };
}
function stateKey(state2) {
  return [
    `P:${pointKey(state2.player)}`,
    `I:${state2.ice.map(pointKey).sort().join(";")}`,
    `W:${[...state2.walls].sort().join(";")}`
  ].join("|");
}
function renderState(state2) {
  const rows = Array.from(
    { length: state2.height },
    () => Array.from({ length: state2.width }, () => ".")
  );
  for (const key of state2.targets) {
    const point = pointFromKey(key);
    rows[point.y][point.x] = "G";
  }
  for (const key of state2.walls) {
    const point = pointFromKey(key);
    rows[point.y][point.x] = "#";
  }
  for (const icePoint of state2.ice) {
    rows[icePoint.y][icePoint.x] = state2.targets.has(pointKey(icePoint)) ? "*" : "I";
  }
  rows[state2.player.y][state2.player.x] = state2.targets.has(pointKey(state2.player)) ? "+" : "@";
  return rows.map((row) => row.join("")).join("\n");
}
function isWin(state2, winCondition = { type: "ice_slide_escape_explicit_goal" }) {
  if (winCondition.type !== "ice_slide_escape_explicit_goal") {
    return false;
  }
  const goalRaw = readWinPoint(winCondition, "player_goal");
  if (!goalRaw) {
    return false;
  }
  const goal = toPoint(goalRaw);
  const iceKeys = new Set(state2.ice.map(pointKey));
  return pointKey(state2.player) === pointKey(goal) && [...state2.targets].every((target) => iceKeys.has(target));
}
function isEventWin(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay(mechanic, initialState, inputs, options = {}) {
  let state2 = initialState;
  const events = [];
  let legal = true;
  for (const input of inputs) {
    const result = step(mechanic, state2, input, options);
    events.push(...result.events);
    if (result.legal) {
      state2 = result.state;
    } else {
      legal = false;
    }
  }
  return { state: state2, events, legal };
}
function step(mechanic, state2, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state2, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add(state2.player, dir);
  if (!inBounds(state2, destination) || state2.walls.has(pointKey(destination))) {
    return illegal(state2, input, "destination_blocked");
  }
  const iceIndex = iceIndexAt(state2, destination);
  if (iceIndex !== -1) {
    if (isRuleDisabled("push_ice", options)) {
      return illegal(state2, input, "push_ice_disabled");
    }
    const next = cloneState(state2);
    next.ice.splice(iceIndex, 1);
    next.player = destination;
    const slide = settleIce(next, destination, dir, options);
    if (!slide.legal) {
      return {
        legal: false,
        input,
        state: state2,
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
  if (iceIndexAt(state2, destination) === -1 && isCellFreeForPlayer(state2, destination)) {
    const next = cloneState(state2);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal(state2, input, "no_matching_rule");
}
function settleIce(stateWithoutMovingIce, origin, dir, options) {
  return continueSlide(stateWithoutMovingIce, origin, dir, 0, options, []);
}
function continueSlide(state2, current, dir, initialDistance, options, events) {
  let cursor = current;
  let distance = initialDistance;
  while (true) {
    const next = add(cursor, dir);
    if (!inBounds(state2, next)) {
      return {
        legal: true,
        state: stateWithIce(state2, void 0),
        events: [...events, `ice_boundary_disappear:d${distance}`]
      };
    }
    if (isIceObstacle(state2, next)) {
      return resolveObstacle(state2, cursor, next, dir, distance, options, events);
    }
    cursor = next;
    distance += 1;
  }
}
function resolveObstacle(state2, preObstacle, obstacle, dir, distance, options, events) {
  if (distance === 0) {
    return {
      legal: false,
      reason: "push_ice_failed_immediate_obstacle",
      events: [...events, "push_ice_failed"]
    };
  }
  if (distance <= 2) {
    return {
      legal: true,
      state: stateWithIce(state2, preObstacle),
      events: [...events, `ice_stop_short:d${distance}`]
    };
  }
  if (distance === 3) {
    return {
      legal: true,
      state: stateWithIce(state2, void 0),
      events: [...events, "ice_destroyed_d3"]
    };
  }
  if (distance === 4) {
    return {
      legal: true,
      state: stateWithIce(state2, subtract(preObstacle, dir)),
      events: [...events, "ice_rebound_d4"]
    };
  }
  const group = collectObstacleGroup(state2, obstacle, dir);
  const afterGroup = group.afterGroup;
  if (distance === 5) {
    const passEvents = [...events, `ice_pass_through_d5:len${group.cells.length}`];
    if (!inBounds(state2, afterGroup)) {
      return {
        legal: true,
        state: stateWithIce(state2, void 0),
        events: [...passEvents, "ice_boundary_disappear_after_group"]
      };
    }
    return continueSlide(state2, afterGroup, dir, 1, options, [
      ...passEvents,
      "slide_restart_after_group"
    ]);
  }
  const destroyedState = removeObstacleGroup(state2, group.cells);
  const destroyEvents = [...events, `ice_destroy_group_d6_plus:len${group.cells.length}`];
  if (!inBounds(destroyedState, afterGroup)) {
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
function collectObstacleGroup(state2, start, dir) {
  const cells = [];
  let cursor = start;
  while (inBounds(state2, cursor) && isIceObstacle(state2, cursor)) {
    cells.push(cursor);
    cursor = add(cursor, dir);
  }
  return { cells, afterGroup: cursor };
}
function removeObstacleGroup(state2, cells) {
  const next = cloneState(state2);
  const destroyed = new Set(cells.map(pointKey));
  for (const key of destroyed) {
    next.walls.delete(key);
  }
  next.ice = next.ice.filter((icePoint) => !destroyed.has(pointKey(icePoint)));
  return next;
}
function stateWithIce(state2, point) {
  const next = cloneState(state2);
  next.ice = point ? sortPoints([...next.ice, point]) : sortPoints(next.ice);
  return next;
}
function isRuleDisabled(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function illegal(state2, input, reason) {
  return { legal: false, input, state: state2, events: [], reason };
}
function inBounds(state2, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state2.width && point.y < state2.height;
}
function isEdgeCell(state2, point) {
  return inBounds(state2, point) && (point.x === 0 || point.y === 0 || point.x === state2.width - 1 || point.y === state2.height - 1);
}
function isCellFreeForPlayer(state2, point) {
  return inBounds(state2, point) && !state2.walls.has(pointKey(point)) && iceIndexAt(state2, point) === -1;
}
function isIceObstacle(state2, point) {
  return state2.walls.has(pointKey(point)) || iceIndexAt(state2, point) !== -1;
}
function iceIndexAt(state2, point) {
  const key = pointKey(point);
  return state2.ice.findIndex((icePoint) => pointKey(icePoint) === key);
}
function sortPoints(points) {
  return [...points].sort((left, right) => left.y - right.y || left.x - right.x);
}
function pointFromKey(key) {
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
    key: stateKey,
    actions: () => legalActions(mechanic),
    step: (state2, action, options) => {
      const result = step(mechanic, state2, action, options);
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
function legalActions(mechanic) {
  const actions = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return actions.length > 0 ? actions : defaultActions;
}
var iceSlideAdapter = {
  id: "ice_slide_escape",
  createRuntime: createIceSlideRuntime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin
};

// src/prototypes/pull_portal_fallback/mechanics.ts
var vectors2 = {
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
function pointKey2(point) {
  return `${point.x},${point.y}`;
}
function add2(point, dir) {
  const vector = vectors2[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function opposite(point, dir) {
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
          walls.add(pointKey2(point));
          break;
        case "G":
          goals.add(pointKey2(point));
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
function cloneState2(state2) {
  return {
    width: state2.width,
    height: state2.height,
    walls: new Set(state2.walls),
    goals: new Set(state2.goals),
    player: { ...state2.player },
    crates: state2.crates.map((crate) => ({ ...crate })),
    portals: Object.fromEntries(
      Object.entries(state2.portals).map(([id, point]) => [id, { ...point }])
    )
  };
}
function stateKey2(state2) {
  const crates = state2.crates.map(pointKey2).sort().join(";");
  const portals = Object.entries(state2.portals).sort(([a], [b]) => a.localeCompare(b)).map(([id, point]) => `${id}:${pointKey2(point)}`).join(";");
  return `P:${pointKey2(state2.player)}|C:${crates}|R:${portals}`;
}
function isWin2(state2, winCondition = { type: "all_objects_on_targets" }) {
  switch (winCondition.type) {
    case "all_objects_on_targets":
      return state2.crates.length > 0 && state2.crates.every((crate) => state2.goals.has(pointKey2(crate)));
    case "player_on_goal":
      return state2.goals.has(pointKey2(state2.player));
    default:
      return false;
  }
}
function isEventWin2(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay2(mechanic, initialState, inputs, options = {}) {
  let state2 = initialState;
  const events = [];
  let legal = true;
  for (const input of inputs) {
    const result = step2(mechanic, state2, input, options);
    events.push(...result.events);
    if (result.legal) {
      state2 = result.state;
    } else {
      legal = false;
    }
  }
  return { state: state2, events, legal };
}
function renderState2(state2) {
  const rows = Array.from(
    { length: state2.height },
    () => Array.from({ length: state2.width }, () => " ")
  );
  for (const key of state2.goals) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y][x] = "G";
  }
  for (const key of state2.walls) {
    const [xRaw, yRaw] = key.split(",");
    const x = Number(xRaw);
    const y = Number(yRaw);
    rows[y][x] = "#";
  }
  for (const [id, point] of Object.entries(state2.portals)) {
    rows[point.y][point.x] = id;
  }
  for (const crate of state2.crates) {
    rows[crate.y][crate.x] = "C";
  }
  rows[state2.player.y][state2.player.x] = "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}
function step2(mechanic, state2, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal2(state2, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add2(state2.player, dir);
  const behind = opposite(state2.player, dir);
  if (isBlockedByWallOrBounds(state2, destination)) {
    return illegal2(state2, input, "destination_blocked");
  }
  if (crateIndexAt(state2, destination) !== -1) {
    const pushedCrateIndex = crateIndexAt(state2, destination);
    if (isRuleDisabled2("cannot_push_crate", options)) {
      return illegal2(state2, input, "crate_push_rule_disabled");
    }
    return {
      legal: false,
      input,
      state: state2,
      events: [`push_crate_failed:crate#${pushedCrateIndex + 1}`],
      reason: "cannot_push_crate"
    };
  }
  const portalId = portalIdAt(state2, destination);
  if (portalId) {
    return enterPortal(state2, input, dir, portalId, options);
  }
  const pulledCrateIndex = crateIndexAt(state2, behind);
  const canPull = pulledCrateIndex !== -1 && !isRuleDisabled2("pull_single_crate", options) && isCellFreeForPlayer2(state2, destination);
  if (canPull) {
    const next = cloneState2(state2);
    next.player = destination;
    next.crates[pulledCrateIndex] = { ...state2.player };
    return {
      legal: true,
      input,
      state: next,
      events: [`pull_crate:crate#${pulledCrateIndex + 1}`]
    };
  }
  if (!isRuleDisabled2("walk", options) && isCellFreeForPlayer2(state2, destination)) {
    const next = cloneState2(state2);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal2(state2, input, "no_matching_rule");
}
function enterPortal(state2, input, dir, entrancePortalId, options) {
  if (isRuleDisabled2("enter_portal", options)) {
    return illegal2(state2, input, "enter_portal_disabled");
  }
  const entrance = state2.portals[entrancePortalId];
  if (!entrance) {
    return illegal2(state2, input, "missing_entrance_portal");
  }
  const pairedPortalId = portalPairs[entrancePortalId];
  if (!pairedPortalId) {
    return illegal2(state2, input, "missing_paired_portal");
  }
  const paired = state2.portals[pairedPortalId];
  if (!paired) {
    return illegal2(state2, input, "missing_paired_portal");
  }
  const exit = add2(paired, dir);
  const exitBlocked = !isCellFreeForPlayer2(state2, exit);
  const exitBlockerEvents = exitBlocked ? describePortalExitBlocker(state2, exit) : [];
  if (!exitBlocked) {
    if (isBranchDisabled("enter_portal.normal_teleport", options)) {
      return illegal2(state2, input, "normal_teleport_disabled");
    }
    const next = cloneState2(state2);
    next.player = exit;
    return {
      legal: true,
      input,
      state: next,
      events: [`portal_enter:${entrancePortalId}`, `portal_teleport:${entrancePortalId}->${pairedPortalId}`]
    };
  }
  const pushedPortalDestination = add2(entrance, dir);
  const canPushEntrance = isCellFreeForPortal(state2, pushedPortalDestination);
  if (canPushEntrance) {
    if (isBranchDisabled("enter_portal.blocked_exit_push_entrance", options)) {
      return illegal2(state2, input, "blocked_exit_push_entrance_disabled");
    }
    const next = cloneState2(state2);
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
    state: state2,
    events: [
      `portal_enter:${entrancePortalId}`,
      `portal_exit_blocked:${entrancePortalId}->${pairedPortalId}`,
      ...exitBlockerEvents,
      `portal_fallback_failed:${entrancePortalId}`
    ],
    reason: "portal_fallback_failed"
  };
}
function isRuleDisabled2(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function isBranchDisabled(branchId, options) {
  return options.disabledBranches?.has(branchId) ?? false;
}
function illegal2(state2, input, reason) {
  return { legal: false, input, state: state2, events: [], reason };
}
function isBlockedByWallOrBounds(state2, point) {
  return !inBounds2(state2, point) || state2.walls.has(pointKey2(point));
}
function inBounds2(state2, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state2.width && point.y < state2.height;
}
function crateIndexAt(state2, point) {
  const key = pointKey2(point);
  return state2.crates.findIndex((crate) => pointKey2(crate) === key);
}
function portalIdAt(state2, point) {
  const key = pointKey2(point);
  return Object.entries(state2.portals).find(([, portal]) => pointKey2(portal) === key)?.[0];
}
function describePortalExitBlocker(state2, point) {
  if (!inBounds2(state2, point)) {
    return ["portal_exit_blocked_by_bounds"];
  }
  if (state2.walls.has(pointKey2(point))) {
    return ["portal_exit_blocked_by_wall"];
  }
  const crateIndex = crateIndexAt(state2, point);
  if (crateIndex !== -1) {
    return [`portal_exit_blocked_by_crate:crate#${crateIndex + 1}`];
  }
  const portalId = portalIdAt(state2, point);
  if (portalId) {
    return [`portal_exit_blocked_by_portal:${portalId}`];
  }
  return ["portal_exit_blocked_by_unknown"];
}
function isCellFreeForPlayer2(state2, point) {
  return inBounds2(state2, point) && !state2.walls.has(pointKey2(point)) && crateIndexAt(state2, point) === -1 && !portalIdAt(state2, point);
}
function isCellFreeForPortal(state2, point) {
  return inBounds2(state2, point) && !state2.walls.has(pointKey2(point)) && crateIndexAt(state2, point) === -1 && !portalIdAt(state2, point) && pointKey2(state2.player) !== pointKey2(point);
}

// src/prototypes/pull_portal_fallback/runtime.ts
var defaultInputs = ["up", "down", "left", "right"];
function createPullPortalRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey2,
    actions: () => legalInputs(mechanic),
    step: (state2, action, options) => {
      const result = step2(mechanic, state2, action, options);
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
function legalInputs(mechanic) {
  const inputs = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs;
}
var pullPortalAdapter = {
  id: "pull_portal_fallback",
  createRuntime: createPullPortalRuntime,
  parseLevel: parseLevel2,
  renderState: renderState2,
  step: step2,
  replay: replay2,
  isWin: isWin2,
  isEventWin: isEventWin2
};

// src/prototypes/runtimeAdapter.ts
function getRuntimeAdapter(mechanic) {
  if (mechanic.id === pullPortalAdapter.id) {
    return pullPortalAdapter;
  }
  if (mechanic.id === iceSlideAdapter.id) {
    return iceSlideAdapter;
  }
  throw new Error(
    `No runtime adapter registered for mechanic '${mechanic.id}'. Add an adapter before running solver, analyzer, playable, or exporter commands.`
  );
}

// src/web/app.ts
var inputByKey = /* @__PURE__ */ new Map([
  ["ArrowUp", "up"],
  ["w", "up"],
  ["W", "up"],
  ["ArrowDown", "down"],
  ["s", "down"],
  ["S", "down"],
  ["ArrowLeft", "left"],
  ["a", "left"],
  ["A", "left"],
  ["ArrowRight", "right"],
  ["d", "right"],
  ["D", "right"]
]);
var app = document.querySelector("#app");
if (!app) {
  throw new Error("Missing #app");
}
var appRoot = app;
var buildId = true ? "mqyda74x" : "dev";
var data = await fetch(`./data.json?v=${encodeURIComponent(buildId)}`).then(
  (response) => response.json()
);
var runtimeAdapter = getRuntimeAdapter(data.mechanic);
var state = createPlayState(data, data.levels.levels[0]);
render();
window.addEventListener("keydown", (event) => {
  const input = inputByKey.get(event.key);
  if (!input) {
    return;
  }
  event.preventDefault();
  play(input);
});
function createPlayState(playableData, level) {
  const initial = runtimeAdapter.parseLevel(level);
  return {
    data: playableData,
    level,
    initial,
    current: initial,
    history: [],
    events: [],
    won: runtimeAdapter.isWin(initial, winFor(level))
  };
}
function winFor(level) {
  return level.win ?? data.mechanic.win;
}
function play(input) {
  if (state.won) {
    return;
  }
  const result = runtimeAdapter.step(data.mechanic, state.current, input, {});
  const nextEvents = [...state.events, ...result.events];
  if (result.legal) {
    state = {
      ...state,
      current: result.state,
      history: [...state.history, state.current],
      events: nextEvents,
      lastResult: result,
      won: runtimeAdapter.isWin(result.state, winFor(state.level)) || runtimeAdapter.isEventWin(result.events, winFor(state.level))
    };
  } else {
    state = {
      ...state,
      events: nextEvents,
      lastResult: result,
      won: runtimeAdapter.isEventWin(result.events, winFor(state.level))
    };
  }
  render();
}
function reset() {
  state = createPlayState(data, state.level);
  render();
}
function undo() {
  const previous = state.history.at(-1);
  if (!previous) {
    return;
  }
  state = {
    ...state,
    current: previous,
    history: state.history.slice(0, -1),
    events: [],
    lastResult: void 0,
    won: runtimeAdapter.isWin(previous, winFor(state.level))
  };
  render();
}
function selectLevel(levelId) {
  const level = data.levels.levels.find((candidate) => candidate.id === levelId);
  if (!level) {
    return;
  }
  state = createPlayState(data, level);
  render();
}
function replayExpected() {
  const inputs = replayInputsFor(state.level);
  if (inputs.length === 0) {
    return;
  }
  const result = runtimeAdapter.replay(data.mechanic, state.initial, inputs, {});
  state = {
    ...state,
    current: result.state,
    history: [],
    events: result.events,
    lastResult: void 0,
    won: runtimeAdapter.isWin(result.state, winFor(state.level)) || result.events.some((event) => runtimeAdapter.isEventWin([event], winFor(state.level)))
  };
  render();
}
function replayInputsFor(level) {
  if (level.expected_trace && level.expected_trace.length > 0) {
    return level.expected_trace.map((entry) => entry.input);
  }
  return data.evaluation?.results?.find((result) => result.levelId === level.id)?.solutionInputs ?? [];
}
function render() {
  appRoot.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <h1>${escapeHtml(data.mechanic.title)}</h1>
          <p>${escapeHtml(data.mechanic.id)}</p>
        </div>
        <div class="level-list">
          ${data.levels.levels.map(renderLevelButton).join("")}
        </div>
      </aside>

      <section class="stage">
        <div class="toolbar">
          <div>
            <strong>${escapeHtml(state.level.id)} ${escapeHtml(state.level.title)}</strong>
            <div class="meta">${escapeHtml(state.level.role)} / ${escapeHtml(state.level.status)}</div>
          </div>
          <div class="tool-group">
            <button class="tool-button" data-action="undo">Undo</button>
            <button class="tool-button" data-action="reset">Reset</button>
            <button class="tool-button" data-action="replay">Replay</button>
          </div>
        </div>
        <div class="board-wrap">
          ${renderBoard(state.current)}
        </div>
        <div class="controls" aria-label="movement">
          <button class="arrow-button" data-dir="up">Up</button>
          <button class="arrow-button" data-dir="left">Left</button>
          <button class="arrow-button" data-dir="right">Right</button>
          <button class="arrow-button" data-dir="down">Down</button>
        </div>
      </section>

      <aside class="inspector">
        <div class="section">
          <h2>Status</h2>
          <div class="status ${state.won ? "win" : ""}">${statusText()}</div>
        </div>
        <div class="section">
          <h3>Targets</h3>
          <div class="knowledge">${state.level.targets.map(renderKnowledge).join("")}</div>
        </div>
        <div class="section">
          <h3>Events</h3>
          <div class="event-list">${renderTargetEvents()}</div>
        </div>
        <div class="section">
          <h3>Layout</h3>
          <pre class="layout-view">${escapeHtml(renderLayoutText(state.current))}</pre>
        </div>
        <div class="section">
          <h3>Trace</h3>
          <div class="log">${escapeHtml(state.events.join("\n"))}</div>
        </div>
      </aside>
    </div>
  `;
  appRoot.querySelectorAll("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => play(button.dataset.dir));
  });
  appRoot.querySelectorAll("[data-level]").forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.level ?? ""));
  });
  appRoot.querySelector("[data-action='reset']")?.addEventListener("click", reset);
  appRoot.querySelector("[data-action='undo']")?.addEventListener("click", undo);
  appRoot.querySelector("[data-action='replay']")?.addEventListener("click", replayExpected);
}
function renderLevelButton(level) {
  return `<button class="level-button" data-level="${escapeHtml(level.id)}" aria-current="${level.id === state.level.id ? "true" : "false"}">
    <strong>${escapeHtml(level.id)} ${escapeHtml(level.title)}</strong>
    <span>${escapeHtml(level.role)}</span>
  </button>`;
}
function renderKnowledge(targetId) {
  const item = data.knowledge.knowledge.find((candidate) => candidate.id === targetId);
  return `<p><strong>${escapeHtml(targetId)}</strong><br>${escapeHtml(item?.statement ?? "")}</p>`;
}
function renderTargetEvents() {
  const targetEvents = new Set(
    state.level.targets.flatMap((targetId) => {
      const item = data.knowledge.knowledge.find((candidate) => candidate.id === targetId);
      return item?.detector.required_events ?? [];
    })
  );
  if (targetEvents.size === 0) {
    return "";
  }
  return Array.from(targetEvents).map((event) => `<span class="event ${eventsMatchPattern(state.events, event) ? "hit" : ""}">${escapeHtml(event)}</span>`).join("");
}
function renderBoard(boardState) {
  const rows = renderStateRows(boardState);
  const cells = [];
  for (let y = 0; y < boardState.height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < boardState.width; x += 1) {
      const glyph = row[x] ?? " ";
      cells.push(renderTile(glyph, x, y));
    }
  }
  return `<div class="board" style="grid-template-columns: repeat(${boardState.width}, minmax(0, 1fr));">${cells.join("")}</div>`;
}
function renderStateRows(boardState) {
  return runtimeAdapter.renderState(boardState).split("\n").map((row) => row.padEnd(boardState.width, " "));
}
function renderLayoutText(boardState) {
  return renderStateRows(boardState).map((row) => row.replaceAll(" ", ".")).join("\n");
}
function renderTile(glyph, x, y) {
  const className = tileClass(glyph);
  const label = glyph === " " ? "" : glyph;
  return `<div class="tile ${className}" data-x="${x}" data-y="${y}">${escapeHtml(label)}</div>`;
}
function tileClass(glyph) {
  switch (glyph) {
    case "#":
      return "wall";
    case "G":
      return "goal";
    case "C":
      return "crate";
    case "@":
      return "player";
    case "A":
    case "D":
    case "H":
      return "portalA";
    case "B":
    case "E":
    case "I":
      return "portalB";
    default:
      return "";
  }
}
function statusText() {
  if (state.won) {
    return "Complete";
  }
  if (!state.lastResult) {
    return "Ready";
  }
  if (!state.lastResult.legal) {
    return state.lastResult.reason ?? "Blocked";
  }
  return state.lastResult.events.join(", ");
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
//# sourceMappingURL=app.js.map
