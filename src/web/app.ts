import type {
  InputId,
  KnowledgeDoc,
  LevelDoc,
  LevelsDoc,
  MechanicDoc,
  WinCondition,
} from "../core/types.js";
import { eventsMatchPattern } from "../core/events.js";
import { getRuntimeAdapter } from "../prototypes/runtimeAdapter.js";
import type { GameState, StepResult } from "../prototypes/pull_portal_fallback/mechanics.js";

declare const __BUILD_ID__: string | undefined;

type PlayableData = {
  mechanic: MechanicDoc;
  knowledge: KnowledgeDoc;
  levels: LevelsDoc;
  evaluation?: {
    results?: Array<{
      levelId: string;
      solutionInputs?: InputId[];
    }>;
  };
};

type PlayState = {
  data: PlayableData;
  level: LevelDoc;
  initial: GameState;
  current: GameState;
  history: GameState[];
  events: string[];
  lastResult?: StepResult;
  won: boolean;
};

const inputByKey = new Map<string, InputId>([
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
  ["D", "right"],
]);

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Missing #app");
}
const appRoot = app;

const buildId = typeof __BUILD_ID__ === "string" ? __BUILD_ID__ : "dev";
const data = (await fetch(`./data.json?v=${encodeURIComponent(buildId)}`).then((response) =>
  response.json(),
)) as PlayableData;
const runtimeAdapter = getRuntimeAdapter(data.mechanic);
let state = createPlayState(data, data.levels.levels[0]!);
render();

window.addEventListener("keydown", (event) => {
  const input = inputByKey.get(event.key);
  if (!input) {
    return;
  }
  event.preventDefault();
  play(input);
});

function createPlayState(playableData: PlayableData, level: LevelDoc): PlayState {
  const initial = runtimeAdapter.parseLevel(level);
  return {
    data: playableData,
    level,
    initial,
    current: initial,
    history: [],
    events: [],
    won: runtimeAdapter.isWin(initial, winFor(level)),
  };
}

function winFor(level: LevelDoc): WinCondition {
  return level.win ?? data.mechanic.win;
}

function play(input: InputId): void {
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
      won:
        runtimeAdapter.isWin(result.state, winFor(state.level)) ||
        runtimeAdapter.isEventWin(result.events, winFor(state.level)),
    };
  } else {
    state = {
      ...state,
      events: nextEvents,
      lastResult: result,
      won: runtimeAdapter.isEventWin(result.events, winFor(state.level)),
    };
  }
  render();
}

function reset(): void {
  state = createPlayState(data, state.level);
  render();
}

function undo(): void {
  const previous = state.history.at(-1);
  if (!previous) {
    return;
  }
  state = {
    ...state,
    current: previous,
    history: state.history.slice(0, -1),
    events: [],
    lastResult: undefined,
    won: runtimeAdapter.isWin(previous, winFor(state.level)),
  };
  render();
}

function selectLevel(levelId: string): void {
  const level = data.levels.levels.find((candidate) => candidate.id === levelId);
  if (!level) {
    return;
  }
  state = createPlayState(data, level);
  render();
}

function replayExpected(): void {
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
    lastResult: undefined,
    won:
      runtimeAdapter.isWin(result.state, winFor(state.level)) ||
      result.events.some((event) => runtimeAdapter.isEventWin([event], winFor(state.level))),
  };
  render();
}

function replayInputsFor(level: LevelDoc): InputId[] {
  if (level.expected_trace && level.expected_trace.length > 0) {
    return level.expected_trace.map((entry) => entry.input as InputId);
  }
  return (
    data.evaluation?.results?.find((result) => result.levelId === level.id)?.solutionInputs ?? []
  );
}

function render(): void {
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

  appRoot.querySelectorAll<HTMLButtonElement>("[data-dir]").forEach((button) => {
    button.addEventListener("click", () => play(button.dataset.dir as InputId));
  });
  appRoot.querySelectorAll<HTMLButtonElement>("[data-level]").forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.level ?? ""));
  });
  appRoot.querySelector<HTMLButtonElement>("[data-action='reset']")?.addEventListener("click", reset);
  appRoot.querySelector<HTMLButtonElement>("[data-action='undo']")?.addEventListener("click", undo);
  appRoot.querySelector<HTMLButtonElement>("[data-action='replay']")?.addEventListener("click", replayExpected);
}

function renderLevelButton(level: LevelDoc): string {
  return `<button class="level-button" data-level="${escapeHtml(level.id)}" aria-current="${level.id === state.level.id ? "true" : "false"}">
    <strong>${escapeHtml(level.id)} ${escapeHtml(level.title)}</strong>
    <span>${escapeHtml(level.role)}</span>
  </button>`;
}

function renderKnowledge(targetId: string): string {
  const item = data.knowledge.knowledge.find((candidate) => candidate.id === targetId);
  return `<p><strong>${escapeHtml(targetId)}</strong><br>${escapeHtml(item?.statement ?? "")}</p>`;
}

function renderTargetEvents(): string {
  const targetEvents = new Set(
    state.level.targets.flatMap((targetId) => {
      const item = data.knowledge.knowledge.find((candidate) => candidate.id === targetId);
      return item?.detector.required_events ?? [];
    }),
  );
  if (targetEvents.size === 0) {
    return "";
  }
  return Array.from(targetEvents)
    .map((event) => `<span class="event ${eventsMatchPattern(state.events, event) ? "hit" : ""}">${escapeHtml(event)}</span>`)
    .join("");
}

function renderBoard(boardState: GameState): string {
  const rows = renderStateRows(boardState);
  const cells: string[] = [];
  for (let y = 0; y < boardState.height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < boardState.width; x += 1) {
      const glyph = row[x] ?? " ";
      cells.push(renderTile(glyph, x, y));
    }
  }
  return `<div class="board" style="grid-template-columns: repeat(${boardState.width}, minmax(0, 1fr));">${cells.join("")}</div>`;
}

function renderStateRows(boardState: GameState): string[] {
  return runtimeAdapter.renderState(boardState)
    .split("\n")
    .map((row) => row.padEnd(boardState.width, " "));
}

function renderLayoutText(boardState: GameState): string {
  return renderStateRows(boardState)
    .map((row) => row.replaceAll(" ", "."))
    .join("\n");
}

function renderTile(glyph: string, x: number, y: number): string {
  const className = tileClass(glyph);
  const label = glyph === " " ? "" : glyph;
  return `<div class="tile ${className}" data-x="${x}" data-y="${y}">${escapeHtml(label)}</div>`;
}

function tileClass(glyph: string): string {
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

function statusText(): string {
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
