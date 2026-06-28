// src/events.ts
function eventType(event) {
  return event.split(":", 1)[0] ?? event;
}
function eventMatchesPattern(event, pattern) {
  return event === pattern || !pattern.includes(":") && eventType(event) === pattern;
}
function eventsMatchPattern(events, pattern) {
  return events.some((event) => eventMatchesPattern(event, pattern));
}

// src/pullPortalMechanics.ts
var vectors = {
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
function pointKey(point) {
  return `${point.x},${point.y}`;
}
function add(point, dir) {
  const vector = vectors[dir];
  return { x: point.x + vector.x, y: point.y + vector.y };
}
function opposite(point, dir) {
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
        `Level ${level.id} has portal '${portalId}' without paired portal '${pairedPortalId}'`
      );
    }
  }
  return { width, height, walls, goals, player, crates, portals };
}
function cloneState(state2) {
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
function stateKey(state2) {
  const crates = state2.crates.map(pointKey).sort().join(";");
  const portals = Object.entries(state2.portals).sort(([a], [b]) => a.localeCompare(b)).map(([id, point]) => `${id}:${pointKey(point)}`).join(";");
  return `P:${pointKey(state2.player)}|C:${crates}|R:${portals}`;
}
function isWin(state2, winCondition = { type: "all_objects_on_targets" }) {
  switch (winCondition.type) {
    case "all_objects_on_targets":
      return state2.crates.length > 0 && state2.crates.every((crate) => state2.goals.has(pointKey(crate)));
    case "player_on_goal":
      return state2.goals.has(pointKey(state2.player));
    default:
      return false;
  }
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
function renderState(state2) {
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
function step(mechanic, state2, input, options = {}) {
  const inputDef = mechanic.inputs[input];
  if (!inputDef || inputDef.intent !== "move" || !inputDef.dir) {
    return illegal(state2, input, "unsupported_input");
  }
  const dir = inputDef.dir;
  const destination = add(state2.player, dir);
  const behind = opposite(state2.player, dir);
  if (isBlockedByWallOrBounds(state2, destination)) {
    return illegal(state2, input, "destination_blocked");
  }
  if (crateIndexAt(state2, destination) !== -1) {
    const pushedCrateIndex = crateIndexAt(state2, destination);
    if (isRuleDisabled("cannot_push_crate", options)) {
      return illegal(state2, input, "crate_push_rule_disabled");
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
  const canPull = pulledCrateIndex !== -1 && !isRuleDisabled("pull_single_crate", options) && isCellFreeForPlayer(state2, destination);
  if (canPull) {
    const next = cloneState(state2);
    next.player = destination;
    next.crates[pulledCrateIndex] = { ...state2.player };
    return {
      legal: true,
      input,
      state: next,
      events: [`pull_crate:crate#${pulledCrateIndex + 1}`]
    };
  }
  if (!isRuleDisabled("walk", options) && isCellFreeForPlayer(state2, destination)) {
    const next = cloneState(state2);
    next.player = destination;
    return { legal: true, input, state: next, events: ["walk"] };
  }
  return illegal(state2, input, "no_matching_rule");
}
function enterPortal(state2, input, dir, entrancePortalId, options) {
  if (isRuleDisabled("enter_portal", options)) {
    return illegal(state2, input, "enter_portal_disabled");
  }
  const entrance = state2.portals[entrancePortalId];
  if (!entrance) {
    return illegal(state2, input, "missing_entrance_portal");
  }
  const pairedPortalId = portalPairs[entrancePortalId];
  if (!pairedPortalId) {
    return illegal(state2, input, "missing_paired_portal");
  }
  const paired = state2.portals[pairedPortalId];
  if (!paired) {
    return illegal(state2, input, "missing_paired_portal");
  }
  const exit = add(paired, dir);
  const exitBlocked = !isCellFreeForPlayer(state2, exit);
  const exitBlockerEvents = exitBlocked ? describePortalExitBlocker(state2, exit) : [];
  if (!exitBlocked) {
    if (isBranchDisabled("enter_portal.normal_teleport", options)) {
      return illegal(state2, input, "normal_teleport_disabled");
    }
    const next = cloneState(state2);
    next.player = exit;
    return {
      legal: true,
      input,
      state: next,
      events: [`portal_enter:${entrancePortalId}`, `portal_teleport:${entrancePortalId}->${pairedPortalId}`]
    };
  }
  const pushedPortalDestination = add(entrance, dir);
  const canPushEntrance = isCellFreeForPortal(state2, pushedPortalDestination);
  if (canPushEntrance) {
    if (isBranchDisabled("enter_portal.blocked_exit_push_entrance", options)) {
      return illegal(state2, input, "blocked_exit_push_entrance_disabled");
    }
    const next = cloneState(state2);
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
function isRuleDisabled(ruleId, options) {
  return options.disabledRules?.has(ruleId) ?? false;
}
function isBranchDisabled(branchId, options) {
  return options.disabledBranches?.has(branchId) ?? false;
}
function illegal(state2, input, reason) {
  return { legal: false, input, state: state2, events: [], reason };
}
function isBlockedByWallOrBounds(state2, point) {
  return !inBounds(state2, point) || state2.walls.has(pointKey(point));
}
function inBounds(state2, point) {
  return point.x >= 0 && point.y >= 0 && point.x < state2.width && point.y < state2.height;
}
function crateIndexAt(state2, point) {
  const key = pointKey(point);
  return state2.crates.findIndex((crate) => pointKey(crate) === key);
}
function portalIdAt(state2, point) {
  const key = pointKey(point);
  return Object.entries(state2.portals).find(([, portal]) => pointKey(portal) === key)?.[0];
}
function describePortalExitBlocker(state2, point) {
  if (!inBounds(state2, point)) {
    return ["portal_exit_blocked_by_bounds"];
  }
  if (state2.walls.has(pointKey(point))) {
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
function isCellFreeForPlayer(state2, point) {
  return inBounds(state2, point) && !state2.walls.has(pointKey(point)) && crateIndexAt(state2, point) === -1 && !portalIdAt(state2, point);
}
function isCellFreeForPortal(state2, point) {
  return inBounds(state2, point) && !state2.walls.has(pointKey(point)) && crateIndexAt(state2, point) === -1 && !portalIdAt(state2, point) && pointKey(state2.player) !== pointKey(point);
}

// src/pullPortalRuntime.ts
var defaultInputs = ["up", "down", "left", "right"];
function createPullPortalRuntime(mechanic) {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: () => legalInputs(mechanic),
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
function legalInputs(mechanic) {
  const inputs = Object.entries(mechanic.inputs).filter(([, input]) => input.intent === "move" && input.dir).map(([, input]) => input.dir);
  return inputs.length > 0 ? inputs : defaultInputs;
}
var pullPortalAdapter = {
  id: "pull_portal_fallback",
  createRuntime: createPullPortalRuntime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin
};

// src/runtimeAdapter.ts
function getRuntimeAdapter(mechanic) {
  if (mechanic.id === pullPortalAdapter.id) {
    return pullPortalAdapter;
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
var buildId = true ? "mqxxy152" : "dev";
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
