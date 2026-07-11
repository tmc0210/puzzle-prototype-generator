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
function cloneState(state) {
  return {
    width: state.width,
    height: state.height,
    walls: new Set(state.walls),
    targets: new Set(state.targets),
    player: { ...state.player },
    ice: state.ice.map((point) => ({ ...point }))
  };
}
function stateKey(state) {
  return [
    `P:${pointKey(state.player)}`,
    `I:${state.ice.map(pointKey).sort().join(";")}`,
    `W:${[...state.walls].sort().join(";")}`
  ].join("|");
}
function renderState(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => ".")
  );
  for (const key of state.targets) {
    const point = pointFromKey(key);
    rows[point.y][point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y][point.x] = "#";
  }
  for (const icePoint of state.ice) {
    rows[icePoint.y][icePoint.x] = state.targets.has(pointKey(icePoint)) ? "*" : "I";
  }
  rows[state.player.y][state.player.x] = state.targets.has(pointKey(state.player)) ? "+" : "@";
  return rows.map((row) => row.join("")).join("\n");
}
function isWin(state, winCondition = { type: "ice_slide_escape_explicit_goal" }) {
  if (winCondition.type !== "ice_slide_escape_explicit_goal") {
    return false;
  }
  const goalRaw = readWinPoint(winCondition, "player_goal");
  if (!goalRaw) {
    return false;
  }
  const goal = toPoint(goalRaw);
  const iceKeys = new Set(state.ice.map(pointKey));
  return pointKey(state.player) === pointKey(goal) && [...state.targets].every((target) => iceKeys.has(target));
}
function isEventWin(events, winCondition) {
  const event = winCondition?.event;
  return winCondition?.type === "event_occurs" && event !== void 0 && eventsMatchPattern(events, event);
}
function replay(mechanic, initialState, inputs, options = {}) {
  let state = initialState;
  const events = [];
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
function step(mechanic, state, input, options = {}) {
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
    const next = cloneState(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal(state, input, "no_matching_rule");
}
function settleIce(stateWithoutMovingIce, origin, dir, options) {
  return continueSlide(stateWithoutMovingIce, origin, dir, 0, options, []);
}
function continueSlide(state, current, dir, initialDistance, options, events) {
  let cursor = current;
  let distance = initialDistance;
  while (true) {
    const next = add(cursor, dir);
    if (!inBounds(state, next)) {
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
    if (!inBounds(state, afterGroup)) {
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
function collectObstacleGroup(state, start, dir) {
  const cells = [];
  let cursor = start;
  while (inBounds(state, cursor) && isIceObstacle(state, cursor)) {
    cells.push(cursor);
    cursor = add(cursor, dir);
  }
  return { cells, afterGroup: cursor };
}
function removeObstacleGroup(state, cells) {
  const next = cloneState(state);
  const destroyed = new Set(cells.map(pointKey));
  for (const key of destroyed) {
    next.walls.delete(key);
  }
  next.ice = next.ice.filter((icePoint) => !destroyed.has(pointKey(icePoint)));
  return next;
}
function stateWithIce(state, point) {
  const next = cloneState(state);
  next.ice = point ? sortPoints([...next.ice, point]) : sortPoints(next.ice);
  return next;
}
function isRuleDisabled(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function illegal(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function inBounds(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function isEdgeCell(state, point) {
  return inBounds(state, point) && (point.x === 0 || point.y === 0 || point.x === state.width - 1 || point.y === state.height - 1);
}
function isCellFreeForPlayer(state, point) {
  return inBounds(state, point) && !state.walls.has(pointKey(point)) && iceIndexAt(state, point) === -1;
}
function isIceObstacle(state, point) {
  return state.walls.has(pointKey(point)) || iceIndexAt(state, point) !== -1;
}
function iceIndexAt(state, point) {
  const key = pointKey(point);
  return state.ice.findIndex((icePoint) => pointKey(icePoint) === key);
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
function legalActions(mechanic) {
  const actions = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return actions.length > 0 ? actions : defaultActions;
}
var layers = [
  editorToolGroup("terrain", "Terrain", [
    tool("terrain", "floor", "\u5730\u9762", "floor", "."),
    tool("terrain", "wall", "\u5899", "wall", "#")
  ]),
  editorToolGroup("target", "Target", [
    tool("target", "goal", "\u76EE\u6807", "goal", "G"),
    tool("target", "clear", "\u6E05\u76EE\u6807", void 0, ".")
  ], false),
  editorToolGroup("actor", "Actor", [
    tool("actor", "player", "\u73A9\u5BB6", "player", "@"),
    tool("actor", "clear", "\u6E05\u89D2\u8272", void 0, ".")
  ]),
  editorToolGroup("object", "Object", [
    tool("object", "ice", "\u51B0\u5757", "ice", "I"),
    tool("object", "clear", "\u6E05\u7269\u4F53", void 0, ".")
  ])
];
function tool(layerId, id, label, value, glyph) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}
function defaultLevel(_mechanic, _knowledge) {
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
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin,
  editor: {
    layers,
    defaultGlyph: ".",
    defaultSize: { width: 9, height: 7 },
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
function serializeEditorBoardLayout(board) {
  return serializeEditorBoard(board, serializeEditorCell);
}
function serializeEditorCell(cell) {
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
function renderEditorCell(cell) {
  return editorVisualForGlyph(serializeEditorCell(cell));
}

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
function cloneState2(state) {
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
function stateKey2(state) {
  const crates = state.crates.map(pointKey2).sort().join(";");
  const portals = Object.entries(state.portals).sort(([a], [b]) => a.localeCompare(b)).map(([id, point]) => `${id}:${pointKey2(point)}`).join(";");
  return `P:${pointKey2(state.player)}|C:${crates}|R:${portals}`;
}
function isWin2(state, winCondition = { type: "all_objects_on_targets" }) {
  switch (winCondition.type) {
    case "all_objects_on_targets":
      return state.crates.length > 0 && state.crates.every((crate) => state.goals.has(pointKey2(crate)));
    case "player_on_goal":
      return state.goals.has(pointKey2(state.player));
    default:
      return false;
  }
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
function renderState2(state) {
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
function step2(mechanic, state, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal2(state, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add2(state.player, dir);
  const behind = opposite(state.player, dir);
  if (isBlockedByWallOrBounds(state, destination)) {
    return illegal2(state, input, "destination_blocked");
  }
  if (crateIndexAt(state, destination) !== -1) {
    const pushedCrateIndex = crateIndexAt(state, destination);
    if (isRuleDisabled2("cannot_push_crate", options)) {
      return illegal2(state, input, "crate_push_rule_disabled");
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
  const canPull = pulledCrateIndex !== -1 && !isRuleDisabled2("pull_single_crate", options) && isCellFreeForPlayer2(state, destination);
  if (canPull) {
    const next = cloneState2(state);
    next.player = destination;
    next.crates[pulledCrateIndex] = { ...state.player };
    return {
      legal: true,
      input,
      state: next,
      events: [`pull_crate:crate#${pulledCrateIndex + 1}`]
    };
  }
  if (!isRuleDisabled2("walk", options) && isCellFreeForPlayer2(state, destination)) {
    const next = cloneState2(state);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal2(state, input, "no_matching_rule");
}
function enterPortal(state, input, dir, entrancePortalId, options) {
  if (isRuleDisabled2("enter_portal", options)) {
    return illegal2(state, input, "enter_portal_disabled");
  }
  const entrance = state.portals[entrancePortalId];
  if (!entrance) {
    return illegal2(state, input, "missing_entrance_portal");
  }
  const pairedPortalId = portalPairs[entrancePortalId];
  if (!pairedPortalId) {
    return illegal2(state, input, "missing_paired_portal");
  }
  const paired = state.portals[pairedPortalId];
  if (!paired) {
    return illegal2(state, input, "missing_paired_portal");
  }
  const exit = add2(paired, dir);
  const exitBlocked = !isCellFreeForPlayer2(state, exit);
  const exitBlockerEvents = exitBlocked ? describePortalExitBlocker(state, exit) : [];
  if (!exitBlocked) {
    if (isBranchDisabled("enter_portal.normal_teleport", options)) {
      return illegal2(state, input, "normal_teleport_disabled");
    }
    const next = cloneState2(state);
    next.player = exit;
    return {
      legal: true,
      input,
      state: next,
      events: [`portal_enter:${entrancePortalId}`, `portal_teleport:${entrancePortalId}->${pairedPortalId}`]
    };
  }
  const pushedPortalDestination = add2(entrance, dir);
  const canPushEntrance = isCellFreeForPortal(state, pushedPortalDestination);
  if (canPushEntrance) {
    if (isBranchDisabled("enter_portal.blocked_exit_push_entrance", options)) {
      return illegal2(state, input, "blocked_exit_push_entrance_disabled");
    }
    const next = cloneState2(state);
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
function isRuleDisabled2(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function isBranchDisabled(branchId, options) {
  return options.disabledBranches?.has(branchId) ?? false;
}
function illegal2(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function isBlockedByWallOrBounds(state, point) {
  return !inBounds2(state, point) || state.walls.has(pointKey2(point));
}
function inBounds2(state, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state.width && point.y < state.height;
}
function crateIndexAt(state, point) {
  const key = pointKey2(point);
  return state.crates.findIndex((crate) => pointKey2(crate) === key);
}
function portalIdAt(state, point) {
  const key = pointKey2(point);
  return Object.entries(state.portals).find(([, portal]) => pointKey2(portal) === key)?.[0];
}
function describePortalExitBlocker(state, point) {
  if (!inBounds2(state, point)) {
    return ["portal_exit_blocked_by_bounds"];
  }
  if (state.walls.has(pointKey2(point))) {
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
  return inBounds2(state, point) && !state.walls.has(pointKey2(point)) && crateIndexAt(state, point) === -1 && !portalIdAt(state, point);
}
function isCellFreeForPortal(state, point) {
  return inBounds2(state, point) && !state.walls.has(pointKey2(point)) && crateIndexAt(state, point) === -1 && !portalIdAt(state, point) && pointKey2(state.player) !== pointKey2(point);
}

// src/prototypes/pull_portal_fallback/runtime.ts
var defaultInputs = ["up", "down", "left", "right"];
function createPullPortalRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey2,
    actions: () => legalInputs(mechanic),
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
function legalInputs(mechanic) {
  const inputs = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs;
}
var layers2 = [
  editorToolGroup("terrain", "Terrain", [
    tool2("terrain", "floor", "\u5730\u9762", "floor", " "),
    tool2("terrain", "wall", "\u5899", "wall", "#")
  ]),
  editorToolGroup("target", "Target", [
    tool2("target", "goal", "\u76EE\u6807", "goal", "G"),
    tool2("target", "clear", "\u6E05\u76EE\u6807", void 0, " ")
  ], false),
  editorToolGroup("actor", "Actor", [
    tool2("actor", "player", "\u73A9\u5BB6", "player", "@"),
    tool2("actor", "clear", "\u6E05\u89D2\u8272", void 0, " ")
  ]),
  editorToolGroup("object", "Object", [
    tool2("object", "crate", "\u7BB1\u5B50", "crate", "C"),
    tool2("object", "clear", "\u6E05\u7269\u4F53", void 0, " ")
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    tool2("mechanism", "portal_a", "\u4F20\u9001\u95E8 A", "portal_a", "A"),
    tool2("mechanism", "portal_b", "\u4F20\u9001\u95E8 B", "portal_b", "B"),
    tool2("mechanism", "portal_d", "\u4F20\u9001\u95E8 D", "portal_d", "D"),
    tool2("mechanism", "portal_e", "\u4F20\u9001\u95E8 E", "portal_e", "E"),
    tool2("mechanism", "portal_h", "\u4F20\u9001\u95E8 H", "portal_h", "H"),
    tool2("mechanism", "portal_i", "\u4F20\u9001\u95E8 I", "portal_i", "I"),
    tool2("mechanism", "clear", "\u6E05\u673A\u5236", void 0, " ")
  ])
];
function tool2(layerId, id, label, value, glyph) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}
function defaultLevel2(_mechanic, _knowledge) {
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
  parseLevel: parseLevel2,
  renderState: renderState2,
  step: step2,
  replay: replay2,
  isWin: isWin2,
  isEventWin: isEventWin2,
  editor: {
    layers: layers2,
    defaultGlyph: " ",
    defaultSize: { width: 8, height: 6 },
    defaultLevel: defaultLevel2,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout),
    parseAsciiToBoard: parseEditorBoard2,
    serializeBoard: serializeEditorBoardLayout2,
    renderCell: renderEditorCell2,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel2)
  }
};
function parseEditorBoard2(layout) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph2
  });
}
function parseEditorGlyph2(glyph) {
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
function serializeEditorBoardLayout2(board) {
  return serializeEditorBoard(board, serializeEditorCell2);
}
function serializeEditorCell2(cell) {
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
function renderEditorCell2(cell) {
  return editorVisualForGlyph(serializeEditorCell2(cell));
}

// src/prototypes/reality_anchor/mechanics.ts
var vectors3 = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};
function pointKey3(point) {
  return `${point.x},${point.y}`;
}
function add3(point, dir) {
  const vector = vectors3[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function subtract2(point, dir) {
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
          walls.add(pointKey3(point));
          break;
        case "G":
          goals.add(pointKey3(point));
          break;
        case "+":
          goals.add(pointKey3(point));
          player = assignPlayer2(level, player, point);
          break;
        case "*":
          goals.add(pointKey3(point));
          crates.push(point);
          break;
        case "m":
          goals.add(pointKey3(point));
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
    const key = pointKey3(point);
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
function cloneState3(state) {
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
function stateKey3(state) {
  const crates = state.crates.map(pointKey3).sort().join(";");
  const sticky = state.stickyGroups.map(groupKey).sort().join("|");
  const pushPull = state.pushPullAnchor ? `P:${pointKey3(state.pushPullAnchor.push)};L:${pointKey3(state.pushPullAnchor.pull)}` : "none";
  const boxSticky = state.boxStickyAnchor ? `B:${pointKey3(state.boxStickyAnchor.box)};S:${pointKey3(state.boxStickyAnchor.sticky)}` : "none";
  return [
    `Ply:${pointKey3(state.player)}`,
    `C:${crates}`,
    `M:${sticky}`,
    `PL:${pushPull}`,
    `BS:${boxSticky}`
  ].join("|");
}
function renderState3(state) {
  const rows = Array.from(
    { length: state.height },
    () => Array.from({ length: state.width }, () => ".")
  );
  for (const key of state.goals) {
    const point = pointFromKey2(key);
    rows[point.y][point.x] = "G";
  }
  for (const key of state.walls) {
    const point = pointFromKey2(key);
    rows[point.y][point.x] = "#";
  }
  for (const crate of state.crates) {
    rows[crate.y][crate.x] = state.goals.has(pointKey3(crate)) ? "*" : "C";
  }
  for (const group of state.stickyGroups) {
    for (const point of group) {
      rows[point.y][point.x] = state.goals.has(pointKey3(point)) ? "m" : "M";
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
  rows[state.player.y][state.player.x] = state.goals.has(pointKey3(state.player)) ? "+" : "@";
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}
function renderVisualState(state) {
  const tiles = Array.from(
    { length: state.height },
    (_, y) => Array.from({ length: state.width }, (_2, x) => {
      const point = { x, y };
      const terrainSide = boxStickySideAt(state, point);
      return {
        x,
        y,
        terrain: state.walls.has(pointKey3(point)) ? visualLayer(
          `ra.terrain.wall.${terrainSide}_side`,
          "#",
          `${terrainSide} side wall`,
          ["terrain", "wall", `${terrainSide}_side`]
        ) : visualLayer(
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
    const point = pointFromKey2(key);
    tileAt(point).target = visualLayer("target.goal", "G", "goal");
  }
  for (const crate of state.crates) {
    const side = boxStickySideAt(state, crate);
    pushLayer(tileAt(crate), "objects", visualLayer(
      `ra.crate.${side}_side`,
      "C",
      `${side} side crate`,
      ["crate", `${side}_side`]
    ));
  }
  for (const [groupIndex, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      const side = boxStickySideAt(state, point);
      pushLayer(tileAt(point), "objects", visualLayer(
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
    pushLayer(tileAt(state.pushPullAnchor.push), "objects", visualLayer(
      `ra.anchor.push_end.join_${pushJoin}`,
      "P",
      "push anchor end",
      ["anchor", "push_side", `join_${pushJoin}`]
    ));
    pushLayer(tileAt(state.pushPullAnchor.pull), "objects", visualLayer(
      `ra.anchor.pull_end.join_${pullJoin}`,
      "L",
      "pull anchor end",
      ["anchor", "pull_side", `join_${pullJoin}`]
    ));
  }
  if (state.boxStickyAnchor) {
    const boxJoin = joinDirection(state.boxStickyAnchor.box, state.boxStickyAnchor.sticky);
    const stickyJoin = joinDirection(state.boxStickyAnchor.sticky, state.boxStickyAnchor.box);
    pushLayer(tileAt(state.boxStickyAnchor.box), "objects", visualLayer(
      `ra.anchor.box_end.join_${boxJoin}`,
      "B",
      "box anchor end",
      ["anchor", "box_side", `join_${boxJoin}`]
    ));
    pushLayer(tileAt(state.boxStickyAnchor.sticky), "objects", visualLayer(
      `ra.anchor.sticky_end.join_${stickyJoin}`,
      "S",
      "sticky anchor end",
      ["anchor", "sticky_side", `join_${stickyJoin}`]
    ));
  }
  const mode2 = forceModeAt(state, state.player);
  pushLayer(tileAt(state.player), "actors", visualLayer(
    `ra.player.${mode2}_side`,
    "@",
    `${mode2} side player`,
    ["player", `${mode2}_side`]
  ));
  return { width: state.width, height: state.height, tiles: tiles.flat() };
}
function visualLayer(visualKey, fallbackGlyph, label, tags = []) {
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
  const cells = new Set(group.map(pointKey3));
  const tags = [];
  for (const dir of Object.keys(vectors3)) {
    if (cells.has(pointKey3(add3(point, dir)))) {
      tags.push(`join_${dir}`);
    }
  }
  return tags;
}
function isWin3(state, winCondition = { type: "all_targets_covered_by_objects" }) {
  switch (winCondition.type) {
    case "all_targets_covered_by_objects": {
      if (state.goals.size === 0) {
        return false;
      }
      const occupied = objectOccupancy(state);
      return [...state.goals].every((goal) => occupied.has(goal));
    }
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
function step3(mechanic, state, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal3(state, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  return forceModeAt(state, state.player) === "pull" ? stepPull(state, input, dir, options) : stepPush(state, input, dir, options);
}
function stepPush(state, input, dir, options) {
  const destination = add3(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal3(state, input, "destination_blocked");
  }
  const targetObject = objectIdAt(state, destination);
  if (targetObject) {
    if (isRuleDisabled3("push_force", options)) {
      return illegal3(state, input, "push_force_disabled");
    }
    const plan = planObjectMove(state, targetObject, dir, {
      playerBlocks: /* @__PURE__ */ new Set([pointKey3(state.player)])
    });
    if (!plan.legal) {
      return illegal3(state, input, plan.reason);
    }
    const moved2 = translatePlannedObjects(state, plan.objectIds, dir);
    moved2.player = destination;
    const normalized2 = normalizeState(moved2, { emitEvents: true, options });
    return {
      legal: true,
      input,
      state: normalized2.state,
      events: [
        `push_object:${describeObject(targetObject)}`,
        ...forceEvents(state, plan.objectIds),
        ...normalized2.events
      ]
    };
  }
  if (!isFreeForPlayer(state, destination)) {
    return illegal3(state, input, "destination_occupied");
  }
  const moved = cloneState3(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}
function stepPull(state, input, dir, options) {
  const destination = add3(state.player, dir);
  if (isWallOrBounds(state, destination)) {
    return illegal3(state, input, "destination_blocked");
  }
  if (objectIdAt(state, destination)) {
    return illegal3(state, input, "pull_world_front_blocked");
  }
  const behind = subtract2(state.player, dir);
  const targetObject = objectIdAt(state, behind);
  if (targetObject) {
    if (isRuleDisabled3("pull_force", options)) {
      return illegal3(state, input, "pull_force_disabled");
    }
    const plan = planObjectMove(state, targetObject, dir, {
      playerBlocks: /* @__PURE__ */ new Set([pointKey3(destination)])
    });
    if (!plan.legal) {
      return illegal3(state, input, plan.reason);
    }
    const moved2 = translatePlannedObjects(state, plan.objectIds, dir);
    moved2.player = destination;
    const normalized2 = normalizeState(moved2, { emitEvents: true, options });
    return {
      legal: true,
      input,
      state: normalized2.state,
      events: [
        `pull_object:${describeObject(targetObject)}`,
        ...forceEvents(state, plan.objectIds),
        ...normalized2.events
      ]
    };
  }
  if (!isFreeForPlayer(state, destination)) {
    return illegal3(state, input, "destination_occupied");
  }
  const moved = cloneState3(state);
  moved.player = destination;
  const normalized = normalizeState(moved, { emitEvents: true, options });
  return { legal: true, input, state: normalized.state, events: ["walk", ...normalized.events] };
}
function planObjectMove(state, startObject, dir, context) {
  const moving = /* @__PURE__ */ new Set();
  const occupancy = objectOccupancy(state);
  const visit = (objectId) => {
    if (moving.has(objectId)) {
      return void 0;
    }
    moving.add(objectId);
    for (const cell of objectCells(state, objectId)) {
      const target = add3(cell, dir);
      const targetKey = pointKey3(target);
      if (!inBounds3(state, target) || state.walls.has(targetKey)) {
        return "force_blocked";
      }
      if (context.playerBlocks.has(targetKey)) {
        return "force_blocked_by_player";
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
  const next = cloneState3(state);
  for (const objectId of objectIds) {
    if (objectId.startsWith("crate:")) {
      const index = Number(objectId.slice("crate:".length));
      const crate = next.crates[index];
      if (crate) {
        next.crates[index] = add3(crate, dir);
      }
      continue;
    }
    if (objectId.startsWith("sticky:")) {
      const index = Number(objectId.slice("sticky:".length));
      const group = next.stickyGroups[index];
      if (group) {
        next.stickyGroups[index] = group.map((point) => add3(point, dir));
      }
      continue;
    }
    if (objectId === "anchor:push_pull" && next.pushPullAnchor) {
      next.pushPullAnchor = {
        push: add3(next.pushPullAnchor.push, dir),
        pull: add3(next.pushPullAnchor.pull, dir)
      };
      continue;
    }
    if (objectId === "anchor:box_sticky" && next.boxStickyAnchor) {
      next.boxStickyAnchor = {
        box: add3(next.boxStickyAnchor.box, dir),
        sticky: add3(next.boxStickyAnchor.sticky, dir)
      };
    }
  }
  return next;
}
function normalizeState(state, config) {
  if (isRuleDisabled3("box_sticky_normalize", config.options)) {
    return { state: cloneState3(state), events: [] };
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
    ...cloneState3(state),
    crates: sortPoints2(crateCells),
    stickyGroups: sortGroups(components.map((component) => sortPoints2(component.map((cell) => cell.point))))
  };
  return { state: normalized, events };
}
function connectedStickyComponents(cells) {
  const byKey = new Map(cells.map((cell) => [pointKey3(cell.point), cell]));
  const visited = /* @__PURE__ */ new Set();
  const components = [];
  for (const cell of cells) {
    const key = pointKey3(cell.point);
    if (visited.has(key)) {
      continue;
    }
    const queue = [cell];
    const component = [];
    visited.add(key);
    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const current = queue[cursor];
      component.push(current);
      for (const dir of Object.keys(vectors3)) {
        const neighbor = add3(current.point, dir);
        const neighborKey = pointKey3(neighbor);
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
  return objectOccupancy(state).get(pointKey3(point));
}
function objectOccupancy(state) {
  const occupancy = /* @__PURE__ */ new Map();
  for (const [index, crate] of state.crates.entries()) {
    occupancy.set(pointKey3(crate), `crate:${index}`);
  }
  for (const [index, group] of state.stickyGroups.entries()) {
    for (const point of group) {
      occupancy.set(pointKey3(point), `sticky:${index}`);
    }
  }
  if (state.pushPullAnchor) {
    for (const point of pushPullCells(state)) {
      occupancy.set(pointKey3(point), "anchor:push_pull");
    }
  }
  if (state.boxStickyAnchor) {
    for (const point of boxStickyCells(state)) {
      occupancy.set(pointKey3(point), "anchor:box_sticky");
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
function isRuleDisabled3(ruleId, options) {
  return options?.disabledRules?.has(ruleId) ?? false;
}
function illegal3(state, input, reason) {
  return { legal: false, input, state, events: [], reason };
}
function isFreeForPlayer(state, point) {
  return !isWallOrBounds(state, point) && !objectIdAt(state, point);
}
function isWallOrBounds(state, point) {
  return !inBounds3(state, point) || state.walls.has(pointKey3(point));
}
function inBounds3(state, point) {
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
  return sortPoints2(group).map(pointKey3).join(";");
}
function pointFromKey2(key) {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

// src/prototypes/reality_anchor/runtime.ts
var defaultInputs2 = ["up", "down", "left", "right"];
function createRealityAnchorRuntime(mechanic) {
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
    editorTool("terrain", "floor", "\u5730\u9762", "floor", renderEditorCell3({ terrain: "floor" })),
    editorTool("terrain", "wall", "\u5899", "wall", renderEditorCell3({ terrain: "wall" }))
  ]),
  editorToolGroup("target", "Target", [
    editorTool("target", "goal", "\u76EE\u6807", "goal", renderEditorCell3({ terrain: "floor", target: "goal" })),
    editorTool("target", "clear", "\u6E05\u76EE\u6807", void 0, renderEditorCell3({ terrain: "floor" }))
  ], false),
  editorToolGroup("actor", "Actor", [
    editorTool("actor", "player", "\u73A9\u5BB6", "player", renderEditorCell3({ terrain: "floor", actor: "player" })),
    editorTool("actor", "clear", "\u6E05\u89D2\u8272", void 0, renderEditorCell3({ terrain: "floor" }))
  ]),
  editorToolGroup("object", "Object", [
    editorTool("object", "crate", "\u7BB1\u5B50", "crate", renderEditorCell3({ terrain: "floor", object: "crate" })),
    editorTool("object", "sticky", "\u9ECF\u5757", "sticky", renderEditorCell3({ terrain: "floor", object: "sticky" })),
    editorTool("object", "clear", "\u6E05\u7269\u4F53", void 0, renderEditorCell3({ terrain: "floor" }))
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    editorTool("mechanism", "push_anchor", "Push \u951A", "push_anchor", renderEditorCell3({ terrain: "floor", mechanism: "push_anchor" })),
    editorTool("mechanism", "pull_anchor", "Pull \u951A", "pull_anchor", renderEditorCell3({ terrain: "floor", mechanism: "pull_anchor" })),
    editorTool("mechanism", "box_anchor", "Box \u951A", "box_anchor", renderEditorCell3({ terrain: "floor", mechanism: "box_anchor" })),
    editorTool("mechanism", "sticky_anchor", "Sticky \u951A", "sticky_anchor", renderEditorCell3({ terrain: "floor", mechanism: "sticky_anchor" })),
    editorTool("mechanism", "clear", "\u6E05\u673A\u5236", void 0, renderEditorCell3({ terrain: "floor" }))
  ])
];
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
var realityAnchorAdapter = {
  id: "reality_anchor",
  createRuntime: createRealityAnchorRuntime,
  parseLevel: parseLevel3,
  renderState: renderState3,
  renderVisualState,
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
function serializeEditorBoardLayout3(board) {
  return serializeEditorBoard(board, serializeEditorCell3);
}
function serializeEditorCell3(cell) {
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
function renderEditorCell3(cell) {
  const tile = {
    terrain: cell.terrain === "wall" ? visualLayer2("ra.terrain.wall.box_side", "#", "wall") : visualLayer2("ra.terrain.floor.box_side", " ", "floor")
  };
  if (cell.target === "goal" && cell.terrain !== "wall") {
    tile.target = visualLayer2("target.goal", "G", "goal");
  }
  if (cell.object === "crate") {
    tile.objects = [...tile.objects ?? [], visualLayer2("ra.crate.box_side", "C", "crate")];
  }
  if (cell.object === "sticky") {
    tile.objects = [...tile.objects ?? [], visualLayer2("ra.sticky.sticky_side", "M", "sticky block")];
  }
  if (cell.mechanism === "push_anchor") {
    tile.objects = [visualLayer2("ra.anchor.push_end", "P", "push anchor")];
  }
  if (cell.mechanism === "pull_anchor") {
    tile.objects = [visualLayer2("ra.anchor.pull_end", "L", "pull anchor")];
  }
  if (cell.mechanism === "box_anchor") {
    tile.objects = [visualLayer2("ra.anchor.box_end", "B", "box anchor")];
  }
  if (cell.mechanism === "sticky_anchor") {
    tile.objects = [visualLayer2("ra.anchor.sticky_end", "S", "sticky anchor")];
  }
  if (cell.actor === "player") {
    tile.actors = [visualLayer2("ra.player.push_side", "@", "player")];
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
    terrain: visualLayer2("terrain.floor", " ", "floor")
  };
  switch (glyph) {
    case " ":
    case ".":
      return tile;
    case "#":
      tile.terrain = visualLayer2("terrain.wall", "#", "wall");
      return tile;
    case "G":
      tile.target = visualLayer2("target.goal", "G", "goal");
      return tile;
    case "+":
      tile.target = visualLayer2("target.goal", "G", "goal");
      tile.actors = [visualLayer2("actor.player", "@", "player")];
      return tile;
    case "@":
      tile.actors = [visualLayer2("actor.player", "@", "player")];
      return tile;
    case "*":
      tile.target = visualLayer2("target.goal", "G", "goal");
      tile.objects = [visualLayer2("object.crate", "C", "crate")];
      return tile;
    case "C":
      tile.objects = [visualLayer2("object.crate", "C", "crate")];
      return tile;
    case "m":
      tile.target = visualLayer2("target.goal", "G", "goal");
      tile.objects = [visualLayer2("object.sticky", "M", "sticky")];
      return tile;
    case "M":
      tile.objects = [visualLayer2("object.sticky", "M", "sticky")];
      return tile;
    default:
      tile.objects = [visualLayer2(`glyph.${glyph}`, glyph, glyph, ["glyph-fallback"])];
      return tile;
  }
}
function visualLayer2(visualKey, fallbackGlyph, label, tags = []) {
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
function editorBoardToVisualBoard2(board, renderCell) {
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
  while (rows.length > 0 && rows[0] === "") {
    rows.shift();
  }
  while (rows.length > 0 && rows.at(-1) === "") {
    rows.pop();
  }
  if (rows.length === 0) {
    return "";
  }
  if (!options.rectangular) {
    return rows.map((row) => row.trimEnd()).join("\n");
  }
  const width = Math.max(...rows.map((row) => row.length));
  return rows.map((row) => row.padEnd(width, fill)).join("\n");
}
function validateLevelByParsing(level, parseLevel4) {
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
    parseLevel4(level);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  return { ok: errors.length === 0, errors };
}
function getRuntimeAdapter(mechanic) {
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

// src/web/assets/puzzlescript16/manifest.ts
function sprite(file, label, layerRole) {
  return {
    file,
    label,
    layerRole,
    size: 16,
    src: `./assets/puzzlescript16/${file}`
  };
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
  "ra.anchor.sticky_end.join_down": sprite("ra_anchor_sticky_end_join_down.png", "sticky anchor end joined down", "object")
};

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
var buildId = true ? "mrfthv53" : String(Date.now());
var data = await loadPlayableData();
var adapter = getRuntimeAdapter(data.mechanic);
var editorAdapter = requireEditorAdapter(adapter);
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
  return renderVisualBoard(boardForDraft(), "editor-board editable-board", true);
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
  return `
    <div class="play-status-row">
      <span class="play-status ${playState?.won ? "win" : ""}">${escapeHtml(status)}</span>
      <span class="keyboard-hint">${escapeHtml(events)}</span>
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
      style="grid-template-columns: repeat(${board.width}, minmax(0, 1fr));"
    >
      ${tiles.map((tile) => renderTile(tile, editable)).join("")}
    </div>
  `;
}
function renderTile(tile, editable) {
  const layers4 = renderTileLayers(tile);
  const content = editable ? `<button class="editor-tile-button" data-x="${tile.x}" data-y="${tile.y}" title="${escapeAttribute(tileLabel(tile))}">${layers4}</button>` : `<div class="tile" title="${escapeAttribute(tileLabel(tile))}">${layers4}</div>`;
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
      const x = Number(button.dataset.x);
      const y = Number(button.dataset.y);
      if (!Number.isInteger(x) || !Number.isInteger(y)) {
        return;
      }
      event.preventDefault();
      beginPaint(x, y);
    });
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
  if (paintCell(x, y)) {
    paintChanged = true;
    renderCellButton(x, y);
  }
}
function continuePaint(x, y, button) {
  if (!painting || mode !== "edit") {
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
    return;
  }
  diagnoseResult = null;
  playState = null;
  markDirty("\u672A\u4FDD\u5B58\u4FEE\u6539");
  render();
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
function cellButton(x, y) {
  return [...app.querySelectorAll("[data-x][data-y]")].find((button) => button.dataset.x === String(x) && button.dataset.y === String(y));
}
function activeToolLabel() {
  const tool3 = activeToolItem();
  return tool3 ? `\u5F53\u524D\uFF1A${tool3.label}` : "\u5F53\u524D\uFF1A\u65E0\u5DE5\u5177";
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
  const tool3 = activeToolItem();
  if (!tool3) {
    return;
  }
  const board = editorAdapter.parseAsciiToBoard(draft.layout);
  const cell = board.cells[y * board.width + x];
  if (!cell || x < 0 || y < 0 || x >= board.width || y >= board.height) {
    return;
  }
  applyToolToCell(cell, tool3);
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
  return editorBoardToVisualBoard2(board, editorAdapter.renderCell);
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
    const tool3 = group.items.find((item) => toolKey(item) === activeToolKey);
    if (tool3) {
      return tool3;
    }
  }
  return void 0;
}
function applyToolToCell(cell, tool3) {
  if (tool3.layer === "terrain") {
    cell.terrain = tool3.value ?? "floor";
    if (cell.terrain === "wall") {
      clearCellContent(cell);
    }
    return;
  }
  if (cell.terrain === "wall") {
    cell.terrain = "floor";
  }
  if (tool3.layer === "target") {
    if (tool3.value) {
      cell.target = tool3.value;
      delete cell.mechanism;
    } else {
      delete cell.target;
    }
    return;
  }
  if (tool3.layer === "actor") {
    if (tool3.value) {
      cell.actor = tool3.value;
      delete cell.object;
      delete cell.mechanism;
    } else {
      delete cell.actor;
    }
    return;
  }
  if (tool3.layer === "object") {
    if (tool3.value) {
      cell.object = tool3.value;
      delete cell.actor;
      delete cell.mechanism;
    } else {
      delete cell.object;
    }
    return;
  }
  if (tool3.layer === "mechanism") {
    if (tool3.value) {
      cell.mechanism = tool3.value;
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
