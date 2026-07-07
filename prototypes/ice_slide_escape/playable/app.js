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
function defaultTarget(knowledge) {
  return knowledge.knowledge[0]?.id ?? "solvable";
}
function defaultLevel(_mechanic, knowledge) {
  const target = defaultTarget(knowledge);
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    role: "review",
    status: "draft",
    targets: [target],
    known_before: [],
    target_learning: [target],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
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
function defaultTarget2(knowledge) {
  return knowledge.knowledge[0]?.id ?? "solvable";
}
function defaultLevel2(_mechanic, knowledge) {
  const target = defaultTarget2(knowledge);
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    role: "review",
    status: "draft",
    targets: [target],
    known_before: [],
    target_learning: [target],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
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
  const mode = forceModeAt(state, state.player);
  pushLayer(tileAt(state.player), "actors", visualLayer(
    `ra.player.${mode}_side`,
    "@",
    `${mode} side player`,
    ["player", `${mode}_side`]
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
function defaultTarget3(knowledge) {
  return knowledge.knowledge[0]?.id ?? "solvable";
}
function defaultLevel3(_mechanic, knowledge) {
  const target = defaultTarget3(knowledge);
  return {
    id: "STUDIO_DRAFT",
    title: "Studio Draft",
    role: "review",
    status: "draft",
    targets: [target],
    known_before: [],
    target_learning: [target],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
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

// src/web/app.ts
var defaultAestheticLabels = {
  "1": "\u53CD\u4F8B\u6837\u672C",
  "2": "\u529F\u80FD\u5E93\u5B58",
  "3": "\u53EF\u7528\u4E0B\u754C",
  "4": "\u4EAE\u70B9\u5019\u9009",
  "5": "\u6807\u6746\u8303\u4F8B"
};
var defaultDifficultyLabels = {
  "1": "\u6559\u5B66\u89C1\u8BC1",
  "2": "\u7B80\u5355\u7EC3\u4E60",
  "3": "\u5E38\u89C4\u6D41\u7A0B",
  "4": "\u9636\u6BB5\u6311\u6218",
  "5": "\u9AD8\u96BE\u7EC8\u5C40"
};
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
var appRoot = document.querySelector("#app");
if (!appRoot) {
  throw new Error("Missing #app root element");
}
var app = appRoot;
var buildId = true ? "mra1ka2w" : String(Date.now());
var data = await fetchJson(`./data.json?v=${encodeURIComponent(buildId)}`);
var adapter = getRuntimeAdapter(data.mechanic);
var reviewData = await loadReviewData(data);
var activeTab = reviewData.archiveEntries.length > 0 ? "archive" : "temporary";
var activeFilter = "all";
var selectedEntryKey = "";
var playState = null;
var saveStatus = reviewData.writable ? "\u53EF\u5199\u8BC4\u5BA1\u670D\u52A1\u5DF2\u8FDE\u63A5" : "\u9759\u6001\u53EA\u8BFB\u8BD5\u73A9";
var replaying = false;
var toolMenuOpen = false;
var draftByEntry = /* @__PURE__ */ new Map();
selectedEntryKey = pickInitialEntryKey();
resetPlayStateForSelection();
render();
window.addEventListener("keydown", (event) => {
  if (isEditableTarget(event.target)) {
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
    captureDraftFromDom();
    undoMove();
    render();
    return;
  }
  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    captureDraftFromDom();
    resetPlayStateForSelection();
    render();
  }
});
function render() {
  const entry = currentEntry();
  const level = entryLevel(entry);
  const draft = entry ? draftForEntry(entry) : emptyDraft();
  app.innerHTML = `
    <div class="review-shell">
      ${renderHeader()}
      <aside class="candidate-rail" aria-label="\u5019\u9009\u5217\u8868">
        ${renderCandidateRail()}
      </aside>
      <main class="play-area">
        ${renderPlayArea(entry, level)}
      </main>
      <aside class="review-panel" aria-label="\u8BC4\u5BA1\u9762\u677F">
        ${entry ? renderReviewPanel(entry, draft) : renderEmptyReviewPanel()}
      </aside>
    </div>
  `;
  bindUiEvents();
}
function renderHeader() {
  const archiveCount = reviewData.archiveEntries.length;
  const temporaryCount = reviewData.temporaryEntries.length;
  const writableLabel = reviewData.writable ? "\u53EF\u5199" : "\u53EA\u8BFB";
  return `
    <header class="app-header">
      <div class="title-block">
        <span class="eyebrow">${escapeHtml(data.mechanic.id)}</span>
        <h1>${escapeHtml(data.mechanic.title)}</h1>
      </div>
      <div class="header-metrics" aria-label="\u5019\u9009\u6982\u51B5">
        <a class="secondary-link" href="./editor">\u5173\u5361\u7F16\u8F91\u5668</a>
        <span class="metric"><strong>${archiveCount}</strong> \u5F52\u6863\u5019\u9009</span>
        <span class="metric"><strong>${temporaryCount}</strong> \u4E34\u65F6\u6E38\u73A9</span>
        <span class="badge ${reviewData.writable ? "ok" : "muted"}">${writableLabel}</span>
        <span class="save-status">${escapeHtml(saveStatus)}</span>
      </div>
    </header>
  `;
}
function renderCandidateRail() {
  const entries = filteredEntries();
  return `
    <div class="tab-strip" role="tablist" aria-label="\u5019\u9009\u6765\u6E90">
      ${tabButton("archive", "\u5F52\u6863\u5019\u9009", reviewData.archiveEntries.length)}
      ${tabButton("temporary", "\u4E34\u65F6\u6E38\u73A9", reviewData.temporaryEntries.length)}
    </div>
    <label class="filter-row">
      <span>\u7B5B\u9009</span>
      <select data-filter>
        ${filterOption("all", "\u5168\u90E8")}
        ${filterOption("unreviewed", "\u672A\u4EBA\u5DE5\u8BC4\u5BA1")}
        ${filterOption("ready", "\u53EF\u5F52\u6863/\u5DF2\u63A5\u53D7")}
        ${filterOption("attention", "\u5F85\u5904\u7406")}
      </select>
    </label>
    <div class="candidate-list">
      ${entries.length > 0 ? entries.map(renderCandidateButton).join("") : `<div class="empty-state">\u5F53\u524D\u7B5B\u9009\u6CA1\u6709\u5019\u9009\u3002</div>`}
    </div>
  `;
}
function renderPlayArea(entry, level) {
  const title = entry ? entryTitle(entry) : "\u672A\u9009\u62E9\u5019\u9009";
  const subtitle = entry ? entrySubtitle(entry) : "\u9009\u62E9\u5019\u9009";
  const hasReplay = Boolean(level && expectedInputsForLevel(level).length > 0);
  const canExportAscii = Boolean(level && playState);
  return `
    <section class="play-card">
      <div class="play-toolbar">
        <div class="level-heading">
          <span class="eyebrow">${escapeHtml(entry?.kind === "archive" ? "Archive" : "Playtest")}</span>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        <div class="play-actions">
          <button
            class="primary-button"
            type="button"
            data-action="replay"
            ${hasReplay || level ? "" : "disabled"}
            title="\u56DE\u653E"
          >
            Replay
          </button>
          <div class="toolbox">
            <button
              class="secondary-button"
              type="button"
              data-action="toggle-tools"
              aria-haspopup="menu"
              aria-expanded="${toolMenuOpen ? "true" : "false"}"
              title="\u5DE5\u5177"
            >
              \u5DE5\u5177
            </button>
            ${toolMenuOpen ? `<div class="tool-menu" role="menu">
                    <button
                      class="tool-menu-item"
                      type="button"
                      data-action="copy-ascii"
                      role="menuitem"
                      ${canExportAscii ? "" : "disabled"}
                    >
                      \u590D\u5236 ASCII
                    </button>
                    <a
                      class="tool-menu-item"
                      href="${escapeAttribute(editorUrlForEntry(entry))}"
                      role="menuitem"
                    >
                      \u7F16\u8F91\u6B64\u5173
                    </a>
                  </div>` : ""}
          </div>
        </div>
      </div>
      <div class="play-status-row">
        ${renderPlayStatus()}
        <span class="keyboard-hint">\u65B9\u5411\u952E/WASD \u79FB\u52A8\uFF0CZ \u64A4\u9500\uFF0CR \u91CD\u7F6E</span>
      </div>
      <div class="board-wrap">
        ${level && playState ? renderBoard(adapter, playState) : renderNoBoard(entry)}
      </div>
      <div class="trace-log">
        ${renderTraceLog()}
      </div>
    </section>
  `;
}
function renderReviewPanel(entry, draft) {
  const comments = entryComments(entry);
  const readonly = reviewData.writable ? "" : "disabled";
  return `
    <form class="review-form" data-review-form data-entry-key="${escapeAttribute(entryKey(entry))}">
      <div class="panel-section">
        <div class="section-title">
          <h2>\u8BC4\u5BA1</h2>
          <span class="badge ${entry.kind === "archive" ? "archive" : "temporary"}">
            ${entry.kind === "archive" ? "\u5F52\u6863\u5019\u9009" : "\u4E34\u65F6\u6E38\u73A9"}
          </span>
        </div>
        ${entry.kind === "archive" ? renderArchiveFields(draft, readonly) : renderTemporaryFields(draft, readonly)}
      </div>

      <div class="panel-section">
        <h3>\u5BA1\u7F8E\u5206</h3>
        ${renderScoreControl("aestheticScore", draft.aestheticScore, reviewData.labels.aesthetic, readonly)}
      </div>

      <div class="panel-section">
        <h3>\u96BE\u5EA6\u5206</h3>
        ${renderScoreControl("difficultyScore", draft.difficultyScore, reviewData.labels.difficulty, readonly)}
      </div>

      <div class="panel-section">
        <label class="field">
          <span>\u65B0\u589E\u8BC4\u8BED</span>
          <textarea
            name="comment"
            rows="5"
            placeholder="\u5199\u4E0B\u4EBA\u7C7B\u8BC4\u5BA1\u610F\u89C1\u3002\u7559\u7A7A\u4FDD\u5B58\u65F6\u53EA\u66F4\u65B0\u5206\u6570/\u72B6\u6001\u3002"
            ${readonly}
          >${escapeHtml(draft.comment)}</textarea>
        </label>
        <button class="save-button" type="button" data-action="save-review" ${readonly}>
          \u4FDD\u5B58\u8BC4\u5BA1
        </button>
      </div>

      <div class="panel-section">
        <h3>\u5DF2\u6709\u8BC4\u8BBA</h3>
        ${comments.length > 0 ? renderCommentList(comments) : `<p class="muted-copy">\u6682\u65E0\u4EBA\u7C7B\u8BC4\u8BBA\u3002</p>`}
      </div>

      ${entry.kind === "archive" ? renderEvidence(entry.evidenceRefs) : renderTemporaryReviewSummary(entry)}
    </form>
  `;
}
function renderArchiveFields(draft, readonly) {
  return `
    <label class="field">
      <span>\u6700\u7EC8\u72B6\u6001</span>
      <select name="humanFinalStatus" ${readonly}>
        ${option("pending", "pending", draft.humanFinalStatus)}
        ${option("accepted", "accepted", draft.humanFinalStatus)}
        ${option("proposal_ready", "proposal_ready", draft.humanFinalStatus)}
        ${option("proposal_ready_with_caveats", "proposal_ready_with_caveats", draft.humanFinalStatus)}
        ${option("held_proposal", "held_proposal", draft.humanFinalStatus)}
        ${option("rejected_candidate", "rejected_candidate", draft.humanFinalStatus)}
      </select>
    </label>
    <label class="field">
      <span>\u5F52\u6863\u8D44\u683C</span>
      <select name="archiveEligibility" ${readonly}>
        ${option("human_pending", "human_pending", draft.archiveEligibility)}
        ${option("clean_archive", "clean_archive", draft.archiveEligibility)}
        ${option("raw_run_only", "raw_run_only", draft.archiveEligibility)}
        ${option("reject_do_not_archive", "reject_do_not_archive", draft.archiveEligibility)}
      </select>
    </label>
  `;
}
function renderTemporaryFields(draft, readonly) {
  return `
    <label class="field">
      <span>\u4E34\u65F6\u72B6\u6001</span>
      <select name="playtestStatus" ${readonly}>
        ${option("defer", "defer", draft.playtestStatus)}
        ${option("ready_for_archive", "ready_for_archive", draft.playtestStatus)}
        ${option("needs_revision", "needs_revision", draft.playtestStatus)}
        ${option("reject", "reject", draft.playtestStatus)}
      </select>
    </label>
  `;
}
function renderScoreControl(name, current, labels, readonly) {
  const emptyChecked = current === null ? "checked" : "";
  const options = [1, 2, 3, 4, 5].map((score) => {
    const value = String(score);
    return `
        <label class="score-option">
          <input
            type="radio"
            name="${name}"
            value="${value}"
            ${current === score ? "checked" : ""}
            ${readonly}
          >
          <span>
            <strong>${score}</strong>
            <small>${escapeHtml(labels[value] ?? "")}</small>
          </span>
        </label>
      `;
  }).join("");
  return `
    <div class="score-grid">
      <label class="score-option empty-score">
        <input type="radio" name="${name}" value="" ${emptyChecked} ${readonly}>
        <span><strong>-</strong><small>\u672A\u5B9A</small></span>
      </label>
      ${options}
    </div>
  `;
}
function renderCommentList(comments) {
  return `
    <div class="comment-list">
      ${comments.map(
    (comment) => `
            <article class="comment-item">
              <div>
                <strong>${escapeHtml(comment.id)}</strong>
                <span>${escapeHtml(comment.status ?? "commented")}</span>
              </div>
              <p>${escapeHtml(comment.text)}</p>
            </article>
          `
  ).join("")}
    </div>
  `;
}
function renderEvidence(refs) {
  return `
    <div class="panel-section">
      <h3>\u8BC1\u636E\u5F15\u7528</h3>
      ${refs.length > 0 ? `<ul class="evidence-list">${refs.map((ref) => `<li>${escapeHtml(ref)}</li>`).join("")}</ul>` : `<p class="muted-copy">\u6682\u65E0\u8BC1\u636E\u5F15\u7528\u3002</p>`}
    </div>
  `;
}
function renderTemporaryReviewSummary(entry) {
  const review = entry.review;
  return `
    <div class="panel-section">
      <h3>\u4E34\u65F6\u8BB0\u5F55</h3>
      ${review ? `<p class="muted-copy">\u6700\u8FD1\u66F4\u65B0\uFF1A${escapeHtml(review.updated_at ?? "unknown")}</p>` : `<p class="muted-copy">\u5C1A\u672A\u4FDD\u5B58\u8BC4\u5BA1\u3002</p>`}
    </div>
  `;
}
function renderEmptyReviewPanel() {
  return `
    <div class="review-form">
      <div class="empty-state">\u6CA1\u6709\u53EF\u663E\u793A\u7684\u5019\u9009\u3002</div>
    </div>
  `;
}
function renderCandidateButton(entry) {
  const key = entryKey(entry);
  const selected = key === selectedEntryKey;
  const level = entryLevel(entry);
  const status = entryStatus(entry);
  const score = entryScoreSummary(entry);
  return `
    <button class="candidate-button" type="button" data-entry="${escapeAttribute(key)}" aria-current="${selected ? "true" : "false"}">
      <span class="candidate-title">${escapeHtml(entryTitle(entry))}</span>
      <span class="candidate-meta">
        <span>${escapeHtml(status)}</span>
        <span>${level ? `${level.layout.split("\n")[0]?.length ?? 0}x${level.layout.split("\n").length}` : "\u65E0\u5E03\u5C40"}</span>
      </span>
      <span class="candidate-score">${escapeHtml(score)}</span>
    </button>
  `;
}
function renderPlayStatus() {
  if (!playState) {
    return `<span class="play-status" title="\u672A\u9009\u62E9\u5019\u9009">\u672A\u9009\u62E9\u5019\u9009</span>`;
  }
  const className = playState.won ? "play-status win" : "play-status";
  const text = playState.won ? `\u5DF2\u8FBE\u6210\u80DC\u5229\uFF0C${playState.moveCount} \u6B65` : `${playState.moveCount} \u6B65\uFF0C${playState.lastEvents.length > 0 ? playState.lastEvents.join(", ") : "\u7B49\u5F85\u8F93\u5165"}`;
  return `<span class="${className}" title="${escapeAttribute(text)}">${escapeHtml(text)}</span>`;
}
function renderTraceLog() {
  if (!playState || playState.messages.length === 0) {
    return `<div class="muted-copy">\u65E0\u64CD\u4F5C\u8BB0\u5F55</div>`;
  }
  return playState.messages.slice(0, 6).map((message) => `<div>${escapeHtml(message)}</div>`).join("");
}
function renderNoBoard(entry) {
  const text = entry ? "\u672A\u5339\u914D\u53EF\u73A9\u5E03\u5C40" : "\u672A\u9009\u62E9\u5019\u9009";
  return `<div class="no-board">${escapeHtml(text)}</div>`;
}
function renderBoard(runtimeAdapter, state) {
  const visual = renderVisualStateWithFallback(runtimeAdapter, data.mechanic, state.current);
  const tiles = orderedTiles(visual);
  return `
    <div
      class="board"
      style="grid-template-columns: repeat(${visual.width}, minmax(0, 1fr));"
      aria-label="${escapeAttribute(state.level.title)}"
    >
      ${tiles.map(renderTile).join("")}
    </div>
  `;
}
function renderTile(tile) {
  const layers4 = [
    tile.terrain ? renderLayer(tile.terrain, "terrain") : "",
    tile.target ? renderLayer(tile.target, "target") : "",
    ...(tile.objects ?? []).map((layer) => renderLayer(layer, "object")),
    ...(tile.actors ?? []).map((layer) => renderLayer(layer, "actor"))
  ].join("");
  return `<div class="tile" title="${escapeAttribute(tileLabel(tile))}">${layers4}</div>`;
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
    >
      ${body}
    </span>
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
function bindUiEvents() {
  app.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      captureDraftFromDom();
      activeTab = button.dataset.tab === "archive" ? "archive" : "temporary";
      toolMenuOpen = false;
      selectedEntryKey = firstEntryKeyForActiveView();
      resetPlayStateForSelection();
      render();
    });
  });
  app.querySelector("[data-filter]")?.addEventListener("change", (event) => {
    captureDraftFromDom();
    activeFilter = event.currentTarget.value;
    toolMenuOpen = false;
    selectedEntryKey = firstEntryKeyForActiveView();
    resetPlayStateForSelection();
    render();
  });
  app.querySelectorAll("[data-entry]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.entry;
      if (!key) {
        return;
      }
      captureDraftFromDom();
      toolMenuOpen = false;
      selectedEntryKey = key;
      resetPlayStateForSelection();
      render();
    });
  });
  app.querySelector("[data-action='replay']")?.addEventListener("click", () => {
    toolMenuOpen = false;
    void replayExpected();
  });
  app.querySelector("[data-action='toggle-tools']")?.addEventListener("click", () => {
    captureDraftFromDom();
    toolMenuOpen = !toolMenuOpen;
    render();
  });
  app.querySelector("[data-action='copy-ascii']")?.addEventListener("click", () => {
    void copyAsciiToClipboard();
  });
  app.querySelector("[data-action='save-review']")?.addEventListener("click", () => {
    toolMenuOpen = false;
    void saveReview();
  });
}
async function copyAsciiToClipboard() {
  if (!playState) {
    saveStatus = "\u672A\u9009\u62E9\u68CB\u76D8";
    toolMenuOpen = false;
    render();
    return;
  }
  try {
    await writeClipboard(adapter.renderState(playState.current));
    saveStatus = `ASCII \u5DF2\u590D\u5236 ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `\u590D\u5236\u5931\u8D25\uFF1A${error.message}` : "\u590D\u5236\u5931\u8D25";
  }
  toolMenuOpen = false;
  render();
}
async function saveReview() {
  captureDraftFromDom();
  const entry = currentEntry();
  if (!entry) {
    return;
  }
  if (!reviewData.writable) {
    saveStatus = "\u53EA\u8BFB\uFF1A\u672A\u8FDE\u63A5\u8BC4\u5BA1\u670D\u52A1";
    render();
    return;
  }
  const key = entryKey(entry);
  const draft = draftForEntry(entry);
  const payload = {
    humanFinalStatus: draft.humanFinalStatus,
    archiveEligibility: draft.archiveEligibility,
    playtestStatus: draft.playtestStatus,
    aestheticScore: draft.aestheticScore,
    difficultyScore: draft.difficultyScore,
    comment: draft.comment
  };
  saveStatus = "\u4FDD\u5B58\u4E2D...";
  render();
  try {
    const endpoint = entry.kind === "archive" ? "./api/archive-review" : "./api/playtest-review";
    const body = entry.kind === "archive" ? { candidateId: entry.candidateId, review: payload } : { levelId: entry.levelId, review: payload };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    reviewData = normalizeReviewData(await response.json(), data);
    draftByEntry.set(key, { ...draft, comment: "" });
    saveStatus = `\u5DF2\u4FDD\u5B58 ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`;
    render();
  } catch (error) {
    saveStatus = error instanceof Error ? `\u4FDD\u5B58\u5931\u8D25\uFF1A${error.message}` : "\u4FDD\u5B58\u5931\u8D25";
    render();
  }
}
async function replayExpected() {
  const entry = currentEntry();
  const level = entryLevel(entry);
  if (!level || replaying) {
    return;
  }
  captureDraftFromDom();
  const inputs = expectedInputsForLevel(level);
  if (inputs.length === 0) {
    saveStatus = "\u65E0\u53EF\u7528\u56DE\u653E";
    render();
    return;
  }
  replaying = true;
  const key = entry ? entryKey(entry) : "";
  resetPlayStateForSelection();
  render();
  for (const input of inputs) {
    await sleep(140);
    if (selectedEntryKey !== key) {
      break;
    }
    applyInput(input);
    render();
  }
  replaying = false;
  render();
}
function applyInput(input) {
  if (!playState) {
    return;
  }
  const winCondition = levelWin(playState.level);
  const result = adapter.step(
    data.mechanic,
    playState.current,
    input,
    { winCondition }
  );
  if (!result.legal) {
    playState.lastEvents = [];
    playState.messages.unshift(`${input}: \u975E\u6CD5\u79FB\u52A8${result.reason ? ` (${result.reason})` : ""}`);
    return;
  }
  playState.history.push(playState.current);
  playState.current = result.state;
  playState.lastEvents = result.events;
  playState.moveCount += 1;
  playState.won = isWinState(result.state, result.events, winCondition);
  playState.messages.unshift(
    `${String(playState.moveCount).padStart(2, "0")} ${input}: ${result.events.length > 0 ? result.events.join(", ") : "move"}`
  );
}
function undoMove() {
  if (!playState || playState.history.length === 0) {
    return;
  }
  playState.current = playState.history.pop();
  playState.moveCount = Math.max(0, playState.moveCount - 1);
  playState.lastEvents = [];
  playState.won = isWinState(playState.current, [], levelWin(playState.level));
  playState.messages.unshift("Undo");
}
function resetPlayStateForSelection() {
  const level = entryLevel(currentEntry());
  playState = level ? createPlayState(level) : null;
}
function createPlayState(level) {
  const initial = adapter.parseLevel(level);
  return {
    level,
    current: initial,
    history: [],
    lastEvents: [],
    moveCount: 0,
    won: isWinState(initial, [], levelWin(level)),
    messages: []
  };
}
function isWinState(state, events, winCondition) {
  return adapter.isWin(state, winCondition) || adapter.isEventWin(events, winCondition);
}
function levelWin(level) {
  return level.win ?? data.mechanic.win;
}
function captureDraftFromDom() {
  const form = app.querySelector("[data-review-form]");
  const key = form?.dataset.entryKey;
  if (!form || !key) {
    return;
  }
  const formData = new FormData(form);
  draftByEntry.set(key, {
    humanFinalStatus: stringField(formData, "humanFinalStatus", "pending"),
    archiveEligibility: stringField(formData, "archiveEligibility", "human_pending"),
    playtestStatus: stringField(formData, "playtestStatus", "defer"),
    aestheticScore: scoreField(formData, "aestheticScore"),
    difficultyScore: scoreField(formData, "difficultyScore"),
    comment: stringField(formData, "comment", "")
  });
}
function draftForEntry(entry) {
  const key = entryKey(entry);
  const existing = draftByEntry.get(key);
  if (existing) {
    return existing;
  }
  const draft = entry.kind === "archive" ? archiveDraft(entry) : temporaryDraft(entry);
  draftByEntry.set(key, draft);
  return draft;
}
function archiveDraft(entry) {
  return {
    humanFinalStatus: stringValue(entry.metadata.human_final_status) ?? "pending",
    archiveEligibility: stringValue(entry.metadata.archive_eligibility) ?? "human_pending",
    playtestStatus: "defer",
    aestheticScore: scoreValue(entry.metadata.aesthetic_score ?? entry.humanCalibration.aesthetic_score),
    difficultyScore: scoreValue(entry.metadata.difficulty_score ?? entry.humanCalibration.difficulty_score),
    comment: ""
  };
}
function temporaryDraft(entry) {
  return {
    humanFinalStatus: "pending",
    archiveEligibility: "human_pending",
    playtestStatus: entry.review?.status ?? "defer",
    aestheticScore: scoreValue(entry.review?.aesthetic_score),
    difficultyScore: scoreValue(entry.review?.difficulty_score),
    comment: ""
  };
}
function emptyDraft() {
  return {
    humanFinalStatus: "pending",
    archiveEligibility: "human_pending",
    playtestStatus: "defer",
    aestheticScore: null,
    difficultyScore: null,
    comment: ""
  };
}
function currentEntry() {
  const entries = filteredEntries();
  return entries.find((entry) => entryKey(entry) === selectedEntryKey) ?? entries[0];
}
function filteredEntries() {
  const entries = activeTab === "archive" ? reviewData.archiveEntries : reviewData.temporaryEntries;
  return entries.filter(matchesFilter);
}
function matchesFilter(entry) {
  if (activeFilter === "all") {
    return true;
  }
  if (activeFilter === "unreviewed") {
    return entry.kind === "archive" ? !Boolean(entry.metadata.human_reviewed) : !entry.review || entry.review.comments.length === 0;
  }
  if (activeFilter === "ready") {
    return entry.kind === "archive" ? stringValue(entry.metadata.archive_eligibility) === "clean_archive" || stringValue(entry.metadata.human_final_status) === "accepted" : entry.review?.status === "ready_for_archive";
  }
  return entry.kind === "archive" ? stringValue(entry.metadata.archive_eligibility) !== "clean_archive" || !Boolean(entry.metadata.human_reviewed) : entry.review?.status === "needs_revision" || entry.review?.status === "reject" || entry.review?.status === "defer" || !entry.review;
}
function pickInitialEntryKey() {
  const archivePlayable = reviewData.archiveEntries.find((entry) => entry.level);
  const firstArchive = archivePlayable ?? reviewData.archiveEntries[0];
  const firstTemporary = reviewData.temporaryEntries[0];
  return firstArchive ? entryKey(firstArchive) : firstTemporary ? entryKey(firstTemporary) : "";
}
function firstEntryKeyForActiveView() {
  const first = filteredEntries()[0];
  return first ? entryKey(first) : "";
}
function entryKey(entry) {
  return entry.kind === "archive" ? `archive:${entry.candidateId ?? entry.levelId ?? "unknown"}` : `temporary:${entry.levelId}`;
}
function editorUrlForEntry(entry) {
  if (!entry) {
    return "./editor";
  }
  if (entry.kind === "archive" && entry.candidateId) {
    return `./editor?source=${encodeURIComponent(`archive:${entry.candidateId}`)}`;
  }
  const levelId = entry.kind === "temporary" ? entry.levelId : entry.levelId ?? entry.level?.id;
  return levelId ? `./editor?levelId=${encodeURIComponent(levelId)}` : "./editor";
}
function entryLevel(entry) {
  return entry?.kind === "archive" ? entry.level : entry?.level;
}
function entryTitle(entry) {
  if (entry.kind === "archive") {
    return entry.candidateId ?? entry.level?.id ?? "\u672A\u547D\u540D\u5F52\u6863\u5019\u9009";
  }
  return entry.level.title || entry.levelId;
}
function entrySubtitle(entry) {
  const level = entryLevel(entry);
  if (entry.kind === "archive") {
    return `${entry.levelId ?? "\u672A\u5339\u914D level"} \xB7 ${level?.title ?? "\u65E0\u53EF\u73A9\u5E03\u5C40"}`;
  }
  return `${entry.levelId} \xB7 ${entry.level.role} \xB7 ${entry.level.status}`;
}
function entryStatus(entry) {
  if (entry.kind === "archive") {
    return stringValue(entry.metadata.human_final_status) ?? stringValue(entry.metadata.status) ?? "unknown";
  }
  return entry.review?.status ?? "pending_playtest";
}
function entryScoreSummary(entry) {
  const aesthetic = entry.kind === "archive" ? scoreValue(entry.metadata.aesthetic_score) : scoreValue(entry.review?.aesthetic_score);
  const difficulty = entry.kind === "archive" ? scoreValue(entry.metadata.difficulty_score) : scoreValue(entry.review?.difficulty_score);
  return `\u5BA1\u7F8E ${aesthetic ?? "-"} / \u96BE\u5EA6 ${difficulty ?? "-"}`;
}
function entryComments(entry) {
  return entry.kind === "archive" ? entry.humanComments : entry.review?.comments ?? [];
}
function expectedInputsForLevel(level) {
  const fromLevel = (level.expected_trace ?? []).map((step4) => step4.input).filter(isInputId);
  if (fromLevel.length > 0) {
    return fromLevel;
  }
  const fromEvaluation = data.evaluation?.results?.find((result) => result.levelId === level.id)?.solutionInputs ?? [];
  return fromEvaluation.filter(isInputId);
}
function orderedTiles(board) {
  return [...board.tiles].sort((a, b) => a.y - b.y || a.x - b.x);
}
function tileLabel(tile) {
  const labels = [
    tile.terrain?.label,
    tile.target?.label,
    ...(tile.objects ?? []).map((layer) => layer.label),
    ...(tile.actors ?? []).map((layer) => layer.label)
  ].filter((label) => Boolean(label));
  return labels.join(", ");
}
function tabButton(tab, label, count) {
  return `
    <button
      type="button"
      class="tab-button"
      data-tab="${tab}"
      role="tab"
      aria-selected="${activeTab === tab ? "true" : "false"}"
    >
      ${escapeHtml(label)} <span>${count}</span>
    </button>
  `;
}
function filterOption(value, label) {
  return option(value, label, activeFilter);
}
function option(value, label, current) {
  return `<option value="${escapeAttribute(value)}" ${value === current ? "selected" : ""}>${escapeHtml(label)}</option>`;
}
async function loadReviewData(playableData) {
  try {
    const value = await fetchJson("./api/review-data");
    return normalizeReviewData(value, playableData);
  } catch {
    return normalizeReviewData(
      {
        writable: false,
        mechanic: playableData.mechanic.id,
        archiveEntries: [],
        temporaryEntries: playableData.levels.levels.map((level) => ({
          kind: "temporary",
          levelId: level.id,
          level
        })),
        labels: {
          aesthetic: defaultAestheticLabels,
          difficulty: defaultDifficultyLabels
        }
      },
      playableData
    );
  }
}
function normalizeReviewData(value, playableData) {
  const object = isRecord(value) ? value : {};
  return {
    writable: object.writable === true,
    mechanic: stringValue(object.mechanic) ?? playableData.mechanic.id,
    archiveEntries: Array.isArray(object.archiveEntries) ? object.archiveEntries.filter(isArchiveEntry) : [],
    temporaryEntries: Array.isArray(object.temporaryEntries) ? object.temporaryEntries.filter(isTemporaryEntry) : [],
    labels: normalizeLabels(object.labels)
  };
}
function normalizeLabels(value) {
  const labels = isRecord(value) ? value : {};
  return {
    aesthetic: recordOfStrings(labels.aesthetic) ?? defaultAestheticLabels,
    difficulty: recordOfStrings(labels.difficulty) ?? defaultDifficultyLabels
  };
}
function isArchiveEntry(value) {
  return isRecord(value) && value.kind === "archive";
}
function isTemporaryEntry(value) {
  return isRecord(value) && value.kind === "temporary" && isRecord(value.level);
}
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}
function stringField(formData, name, fallback) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : fallback;
}
function scoreField(formData, name) {
  const value = formData.get(name);
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }
  return scoreValue(Number(value));
}
function scoreValue(value) {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5 ? value : null;
}
function stringValue(value) {
  return typeof value === "string" && value.length > 0 ? value : void 0;
}
function recordOfStrings(value) {
  if (!isRecord(value)) {
    return void 0;
  }
  const entries = Object.entries(value).filter((entry) => typeof entry[1] === "string");
  return Object.fromEntries(entries);
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isInputId(value) {
  return value === "up" || value === "down" || value === "left" || value === "right";
}
function isEditableTarget(target) {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}
async function writeClipboard(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  if (!ok) {
    throw new Error("\u6D4F\u89C8\u5668\u62D2\u7EDD\u526A\u8D34\u677F\u5199\u5165");
  }
}
function sleep(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function escapeAttribute(value) {
  return escapeHtml(value);
}
//# sourceMappingURL=app.js.map
