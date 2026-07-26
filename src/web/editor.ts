import type {
  InputId,
  KnowledgeDoc,
  LevelDoc,
  LevelsDoc,
  MechanicDoc,
  WinCondition,
} from "../core/types.js";
import {
  editorBoardToVisualBoard,
  getRuntimeAdapter,
  renderVisualStateWithFallback,
  type CurrentRuntimeAdapter,
  type EditorBoard,
  type EditorCell,
  type EditorLayerId,
  type EditorToolItem,
  type RuntimeEditorAdapter,
  type VisualBoard,
  type VisualLayer,
  type VisualTile,
} from "../prototypes/runtimeAdapter.js";
import {
  applyCandleClearCellTool,
  candleDragKind,
  paintDraggedCandle,
  type CandleDragAxis,
  type CandleDragDirection,
  type CandleDragPoint,
} from "../prototypes/candle_sokoban/editorPaint.js";
import {
  puzzleScript16Sprites,
  type PixelSpriteAsset,
} from "./assets/puzzlescript16/manifest.js";
import { BoardFitController } from "./fitBoard.js";

declare const __BUILD_ID__: string;

type PlayableData = {
  mechanic: MechanicDoc;
  knowledge: KnowledgeDoc;
  levels: LevelsDoc;
};

type EditableLevelSourceKind = "studio" | "package" | "archive";

type EditableLevelSource = {
  key: string;
  source: EditableLevelSourceKind;
  levelId?: string;
  candidateId?: string;
  title: string;
  level: LevelDoc;
  readonly: boolean;
  queued: boolean;
  sourceFile?: string;
  metadata: Record<string, unknown>;
};

type EditorCatalog = {
  mechanic: string;
  sources: EditableLevelSource[];
  writable: boolean;
};

type DiagnoseSnapshot = {
  step: number;
  ascii: string;
  visual: VisualBoard;
  input: string | null;
  events: string[];
  viableExitCount: number | null;
  optimalExitCount: number | null;
  deadExitCount: number | null;
};

type DiagnoseResult = {
  validation: {
    ok: boolean;
    errors: string[];
  };
  solution: {
    found: boolean;
    inputs: string[];
    events: string[];
    cost: number | null;
    exploredStates: number;
    searchStatus?: string;
    reason?: string;
  };
  uniqueness: {
    status: "invalid" | "unsolved" | "core_unique" | "branching" | "unknown";
    label: string;
    reason?: string;
    reachableStateCount?: number;
    legalTransitionCount?: number;
    sccCount?: number;
    solutionIrreversibleStepCount?: number;
    forcedWinContinuationPrefixLength?: number;
    snapshots: DiagnoseSnapshot[];
  };
};

type EditorMode = "edit" | "play" | "ascii";

type SourceFilterId = "studio" | "queued" | "archive" | "package";

type SourceFilters = Record<SourceFilterId, boolean>;

type ViewState = {
  sourceScrollTop: number;
  paletteScrollLeft: number;
};

type PlayState = {
  current: any;
  history: any[];
  lastEvents: string[];
  moveCount: number;
  won: boolean;
  messages: string[];
};

const inputByKey: Record<string, InputId> = {
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
  D: "right",
};

const newDraftKey = "__new__";
const sourceFilterStorageKey = "sokoban.editor.sourceFilters.v1";
const sourceSearchStorageKey = "sokoban.editor.sourceSearch.v1";
const modeStorageKey = "sokoban.editor.mode.v1";
const activeToolStorageKey = "sokoban.editor.activeTool.v1";
const defaultSourceFilters: SourceFilters = {
  studio: true,
  queued: true,
  archive: true,
  package: false,
};
const sourceFilterOptions: Array<{ id: SourceFilterId; label: string }> = [
  { id: "studio", label: "Studio Drafts" },
  { id: "queued", label: "待玩队列" },
  { id: "archive", label: "Archive Candidates" },
  { id: "package", label: "Package Levels" },
];

const appRoot = document.querySelector<HTMLElement>("#app");
if (!appRoot) {
  throw new Error("Missing #app root element");
}
const app = appRoot;
const boardFitController = new BoardFitController();

const buildId = typeof __BUILD_ID__ === "string" ? __BUILD_ID__ : String(Date.now());
const data = await loadPlayableData();
const adapter = getRuntimeAdapter(data.mechanic);
const editorAdapter = requireEditorAdapter(adapter);
const candleDragEnabled = adapter.id === "candle_sokoban";

let catalog = await loadEditorCatalog();
let selectedKey = initialSourceKey() ?? catalog.sources[0]?.key ?? newDraftKey;
let mode: EditorMode = loadEditorMode();
let activeToolKey = loadActiveToolKey();
let draft = cloneLevel(sourceForKey(selectedKey)?.level ?? editorAdapter.defaultLevel(data.mechanic, data.knowledge));
let saveStatus = catalog.writable ? "编辑服务已连接" : "静态只读";
let diagnoseResult: DiagnoseResult | null = null;
let playState: PlayState | null = null;
let sourceFilters = loadSourceFilters();
let sourceSearch = loadStringPreference(sourceSearchStorageKey);
let savedDraftSignature = draftSignature(draft);
let dirty = false;
let undoStack: string[] = [];
let redoStack: string[] = [];
let painting = false;
let paintChanged = false;
let candlePaintStart: CandleDragPoint | null = null;
let candlePaintBaseLayout = "";
let candlePaintAxis: CandleDragAxis | undefined;
let candlePaintDirection: CandleDragDirection | undefined;
let candlePaintPreviewCells: CandleDragPoint[] = [];
let pendingScrollSelected = false;
let sourceSearchRenderTimer: number | undefined;
let restoreSourceSearchFocus = false;
let restoreSourceSearchCursor = 0;

render();

window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z" && !isEditableTarget(event.target)) {
    event.preventDefault();
    undoEdit();
    return;
  }
  if (
    (event.ctrlKey || event.metaKey) &&
    (event.key.toLowerCase() === "y" || (event.shiftKey && event.key.toLowerCase() === "z")) &&
    !isEditableTarget(event.target)
  ) {
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

function render(): void {
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
          <a class="secondary-link" href="./" data-action="back-review">试玩评审</a>
          <span class="save-status" data-dirty="${dirty}">${escapeHtml(statusText())}</span>
        </div>
      </header>
      <aside class="source-rail" aria-label="关卡来源">
        ${renderSourceRail()}
      </aside>
      <main class="editor-workspace">
        ${renderWorkspace(selectedSource)}
      </main>
      <aside class="inspector" aria-label="关卡属性">
        ${renderInspector(selectedSource)}
      </aside>
    </div>
  `;
  bindEvents();
  restoreViewState(previousView);
  restoreSourceSearchInputFocus();
  boardFitController.observe(app.querySelector<HTMLElement>(".editor-board-wrap"));
  if (pendingScrollSelected) {
    pendingScrollSelected = false;
    scrollSelectedSourceIntoView();
  }
}

function renderSourceRail(): string {
  const grouped = sourceGroups();
  const visibleGroups = visibleSourceGroups();
  return `
    <div class="source-actions">
      <button class="primary-button" data-action="new-level">新关卡</button>
      <div class="source-nav-actions">
        <button class="secondary-button" data-action="previous-source" ${visibleSources().length > 1 ? "" : "disabled"}>上一个</button>
        <button class="secondary-button" data-action="next-source" ${visibleSources().length > 1 ? "" : "disabled"}>下一个</button>
      </div>
    </div>
    ${renderSourceFilters(grouped)}
    ${renderHiddenSelectionNotice()}
    ${visibleGroups.length > 0
      ? visibleGroups.map((group) => renderSourceGroup(group.title, group.sources)).join("")
      : `<div class="empty-state compact">没有启用的来源。</div>`}
  `;
}

function renderSourceFilters(counts: Record<SourceFilterId, EditableLevelSource[]>): string {
  return `
    <section class="source-filter-panel" aria-label="来源筛选">
      <div class="source-filter-title">
        <span>来源筛选</span>
      </div>
      <div class="source-search">
        <span>搜索</span>
        <div class="source-search-row">
          <input data-source-search value="${escapeAttribute(sourceSearch)}" placeholder="id / title / candidate">
          <button type="button" class="secondary-button" data-action="clear-source-search" ${sourceSearch ? "" : "disabled"}>清空</button>
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

function renderHiddenSelectionNotice(): string {
  if (selectedKey === newDraftKey || visibleSources().some((source) => source.key === selectedKey)) {
    return "";
  }
  return `
    <div class="hidden-selection-note">
      <span>当前关卡被筛选隐藏</span>
      <button type="button" class="secondary-button" data-action="reveal-current-source">显示当前来源</button>
    </div>
  `;
}

function renderSourceGroup(title: string, sources: EditableLevelSource[]): string {
  return `
    <section class="source-group">
      <h2>${escapeHtml(title)} <span>${sources.length}</span></h2>
      <div class="source-list">
        ${sources.length > 0
          ? sources.map(renderSourceButton).join("")
          : `<div class="empty-state compact">暂无</div>`}
      </div>
    </section>
  `;
}

function renderSourceButton(source: EditableLevelSource): string {
  const current = selectedKey === source.key;
  const subtitle = [
    source.source,
    source.levelId ?? source.candidateId,
    source.queued ? "queued" : "",
  ].filter(Boolean).join(" · ");
  return `
    <button class="source-button" data-source-key="${escapeAttribute(source.key)}" aria-current="${current}">
      <span class="candidate-title">${escapeHtml(source.title)}</span>
      <span class="candidate-meta">${escapeHtml(subtitle)}</span>
    </button>
  `;
}

function renderWorkspace(selectedSource: EditableLevelSource | undefined): string {
  return `
    <section class="editor-card">
      <div class="editor-toolbar">
        <div class="segmented">
          ${renderModeButton("edit", "编辑")}
          ${renderModeButton("play", "试玩")}
          ${renderModeButton("ascii", "ASCII")}
        </div>
        <div class="board-actions">
          <button class="secondary-button" data-action="undo-edit" ${undoStack.length > 0 ? "" : "disabled"}>撤销</button>
          <button class="secondary-button" data-action="redo-edit" ${redoStack.length > 0 ? "" : "disabled"}>重做</button>
          <button class="secondary-button" data-action="copy-ascii">复制 ASCII</button>
          <button class="secondary-button" data-action="reset-play" ${mode === "play" ? "" : "disabled"}>重开</button>
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

function renderModeButton(value: EditorMode, label: string): string {
  return `
    <button class="tab-button" data-mode="${value}" aria-selected="${mode === value}">
      ${escapeHtml(label)}
    </button>
  `;
}

function renderPalette(): string {
  return `
    <div class="palette layer-palette" aria-label="绘制工具">
      ${editorAdapter.layers.map(renderToolGroup).join("")}
    </div>
  `;
}

function renderToolGroup(group: RuntimeEditorAdapter["layers"][number]): string {
  return `
    <section class="tool-group" aria-label="${escapeAttribute(group.label)}">
      <h3>${escapeHtml(group.label)}</h3>
      <div class="tool-group-items">
        ${group.items.map(renderPaletteButton).join("")}
      </div>
    </section>
  `;
}

function renderPaletteButton(item: EditorToolItem): string {
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

function renderEditableBoard(_selectedSource: EditableLevelSource | undefined): string {
  if (mode === "play") {
    ensurePlayState();
    if (!playState) {
      return `<div class="no-board">当前草稿无法试玩</div>`;
    }
    return renderVisualBoard(boardFromState(adapter, playState.current), "editor-board play-board");
  }
  const classNames = candleDragEnabled
    ? "editor-board editable-board candle-drag-board"
    : "editor-board editable-board";
  return renderVisualBoard(boardForDraft(), classNames, true);
}

function renderAsciiPreview(): string {
  return renderVisualBoard(boardForDraft(), "editor-board");
}

function renderAsciiPane(): string {
  return `
    <div class="ascii-pane">
      <textarea data-field="ascii">${escapeHtml(draft.layout)}</textarea>
      <div class="button-row">
        <button class="primary-button" data-action="apply-ascii">读取 ASCII</button>
        <button class="secondary-button" data-action="normalize-ascii">规整</button>
      </div>
    </div>
  `;
}

function renderGridTools(): string {
  return `
    <div class="grid-tools">
      <span class="active-tool-chip">${escapeHtml(activeToolLabel())}</span>
      <button class="secondary-button" data-action="add-row">加行</button>
      <button class="secondary-button" data-action="remove-row">减行</button>
      <button class="secondary-button" data-action="add-col">加列</button>
      <button class="secondary-button" data-action="remove-col">减列</button>
    </div>
  `;
}

function renderPlayLog(): string {
  const status = playState?.won
    ? "已完成"
    : playState
      ? `${playState.moveCount} 步`
      : "无法试玩";
  const events = playState?.lastEvents.length ? playState.lastEvents.join(", ") : "等待输入";
  const stateSummary = playState
    ? adapter.describeState?.(playState.current).join(" · ")
    : undefined;
  return `
    <div class="play-status-row">
      <span class="play-status ${playState?.won ? "win" : ""}">${escapeHtml(status)}</span>
      <span class="keyboard-hint">${escapeHtml(stateSummary ? `${stateSummary} · ${events}` : events)}</span>
    </div>
    <div class="trace-log">
      ${(playState?.messages ?? []).slice(0, 8).map((message) => `<div>${escapeHtml(message)}</div>`).join("") ||
        `<div class="muted-copy">无操作记录</div>`}
    </div>
  `;
}

function renderInspector(selectedSource: EditableLevelSource | undefined): string {
  const sourceText = selectedSource
    ? `${selectedSource.source}${selectedSource.readonly ? " · 派生保存" : " · 原地保存"}`
    : "new · studio draft";
  return `
    <form class="review-form inspector-form">
      <section class="panel-section">
        <div class="section-title">
          <h2>元数据</h2>
          <span class="badge muted">${escapeHtml(sourceText)}</span>
        </div>
        <label class="field">
          <span>ID</span>
          <input data-field="id" value="${escapeAttribute(draft.id)}">
        </label>
        <label class="field">
          <span>标题</span>
          <input data-field="title" value="${escapeAttribute(draft.title)}">
        </label>
        <label class="field">
          <span>Win JSON</span>
          <textarea class="small-textarea" data-field="win">${escapeHtml(formatWin(draft.win))}</textarea>
        </label>
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>保存</h2>
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
        >提升到 Package</button>
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>校验</h2>
        </div>
        ${renderDraftValidation()}
      </section>
      <section class="panel-section">
        <div class="section-title">
          <h2>诊断</h2>
          <button type="button" class="secondary-button" data-action="diagnose">运行</button>
        </div>
        ${renderDiagnostics()}
      </section>
    </form>
  `;
}

function renderDiagnostics(): string {
  if (!diagnoseResult) {
    return `<div class="diagnostic-card muted-copy">尚未运行</div>`;
  }
  const unique = diagnoseResult.uniqueness;
  const solutionText = diagnoseResult.solution.found
    ? `${diagnoseResult.solution.inputs.join(" ")} · ${diagnoseResult.solution.exploredStates} states`
    : diagnoseResult.solution.reason ?? "no solution";
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

function renderSnapshot(snapshot: DiagnoseSnapshot): string {
  return `
    <article class="snapshot-card">
      ${renderVisualBoard(snapshot.visual, "snapshot-board")}
      <div class="snapshot-meta">
        <strong>Step ${snapshot.step}</strong>
        <span>${escapeHtml(snapshot.input ?? "no input")}</span>
        <span>${escapeHtml(snapshot.events.join(", ") || "no events")}</span>
        <span>可胜 ${snapshot.viableExitCount ?? "-"} · 最优 ${snapshot.optimalExitCount ?? "-"} · 死路 ${snapshot.deadExitCount ?? "-"}</span>
        <button type="button" class="secondary-button" data-copy-snapshot="${escapeAttribute(snapshot.ascii)}">复制 ASCII</button>
      </div>
    </article>
  `;
}

function renderOptions(options: readonly string[], selected: string): string {
  return options
    .map((option) =>
      `<option value="${escapeAttribute(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`,
    )
    .join("");
}

function renderVisualBoard(board: VisualBoard, className: string, editable = false): string {
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

function renderTile(tile: VisualTile, editable: boolean): string {
  const layers = renderTileLayers(tile);
  const content = editable
    ? `<button class="editor-tile-button" data-x="${tile.x}" data-y="${tile.y}" title="${escapeAttribute(tileLabel(tile))}">${layers}</button>`
    : `<div class="tile" title="${escapeAttribute(tileLabel(tile))}">${layers}</div>`;
  return content;
}

function renderTileLayers(tile: VisualTile): string {
  return [
    tile.terrain ? renderLayer(tile.terrain, "terrain") : "",
    tile.target ? renderLayer(tile.target, "target") : "",
    ...(tile.objects ?? []).map((layer) => renderLayer(layer, "object")),
    ...(tile.actors ?? []).map((layer) => renderLayer(layer, "actor")),
  ].join("");
}

function renderLayer(layer: VisualLayer, layerType: string): string {
  const sprite = puzzleScript16Sprites[layer.visualKey];
  const label = layer.label ?? sprite?.label ?? layer.visualKey;
  const body = sprite ? renderSpriteImage(sprite, label) : renderFallbackGlyph(layer);
  return `
    <span
      class="visual-layer"
      data-layer="${escapeAttribute(layerType)}"
      data-visual-key="${escapeAttribute(layer.visualKey)}"
      data-sprite-state="${sprite ? "sprite" : "fallback"}"
      aria-label="${escapeAttribute(label)}"
    >${body}</span>
  `;
}

function renderSpriteImage(sprite: PixelSpriteAsset, label: string): string {
  return `
    <img
      class="sprite-img"
      src="${escapeAttribute(sprite.src)}"
      width="${sprite.size}"
      height="${sprite.size}"
      alt=""
      title="${escapeAttribute(label)}"
      decoding="async"
      draggable="false"
    >
  `;
}

function renderFallbackGlyph(layer: VisualLayer): string {
  return `<span class="fallback-glyph">${escapeHtml(layer.fallbackGlyph)}</span>`;
}

function bindEvents(): void {
  app.querySelector<HTMLButtonElement>("[data-action='new-level']")?.addEventListener("click", () => {
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
    saveStatus = "新草稿";
    render();
  });

  app.querySelectorAll<HTMLButtonElement>("[data-source-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sourceKey;
      const source = key ? sourceForKey(key) : undefined;
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

  app.querySelector<HTMLButtonElement>("[data-action='previous-source']")?.addEventListener("click", () => {
    selectRelativeSource(-1);
  });

  app.querySelector<HTMLButtonElement>("[data-action='next-source']")?.addEventListener("click", () => {
    selectRelativeSource(1);
  });

  app.querySelector<HTMLButtonElement>("[data-action='reveal-current-source']")?.addEventListener("click", () => {
    revealCurrentSource();
    render();
  });

  app.querySelector<HTMLAnchorElement>("[data-action='back-review']")?.addEventListener("click", (event) => {
    if (!confirmDiscardChanges()) {
      event.preventDefault();
    }
  });

  app.querySelectorAll<HTMLInputElement>("[data-source-filter]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const id = checkbox.dataset.sourceFilter as SourceFilterId | undefined;
      if (!id) {
        return;
      }
      captureDraftFromDom();
      sourceFilters = {
        ...sourceFilters,
        [id]: checkbox.checked,
      };
      saveSourceFilters(sourceFilters);
      render();
    });
  });

  app.querySelector<HTMLInputElement>("[data-source-search]")?.addEventListener("input", (event) => {
    const input = event.currentTarget as HTMLInputElement;
    restoreSourceSearchCursor = input.selectionStart ?? input.value.length;
    restoreSourceSearchFocus = true;
    sourceSearch = input.value;
    saveStringPreference(sourceSearchStorageKey, sourceSearch);
    if (sourceSearchRenderTimer !== undefined) {
      window.clearTimeout(sourceSearchRenderTimer);
    }
    sourceSearchRenderTimer = window.setTimeout(() => {
      sourceSearchRenderTimer = undefined;
      captureDraftFromDom();
      render();
    }, 80);
  });

  app.querySelector<HTMLInputElement>("[data-source-search]")?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    clearSourceSearch();
  });

  app.querySelector<HTMLButtonElement>("[data-action='clear-source-search']")?.addEventListener("click", () => {
    clearSourceSearch();
  });

  app.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      captureDraftFromDom();
      mode = (button.dataset.mode as EditorMode | undefined) ?? "edit";
      saveEditorMode(mode);
      if (mode === "play") {
        resetPlayState();
      }
      render();
    });
  });

  app.querySelectorAll<HTMLButtonElement>("[data-tool-layer][data-tool-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const layer = button.dataset.toolLayer as EditorLayerId | undefined;
      const id = button.dataset.toolId;
      if (!layer || !id) {
        return;
      }
      activeToolKey = `${layer}:${id}`;
      saveStringPreference(activeToolStorageKey, activeToolKey);
      render();
    });
  });

  app.querySelectorAll<HTMLButtonElement>("[data-x][data-y]").forEach((button) => {
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
  app.querySelector<HTMLElement>(".candle-drag-board")?.addEventListener("pointermove", (event) => {
    if (!painting || (event.buttons & 1) === 0 || !(event.target instanceof Element)) {
      return;
    }
    const button = event.target.closest<HTMLButtonElement>("[data-x][data-y]");
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

  app.querySelector<HTMLButtonElement>("[data-action='add-row']")?.addEventListener("click", () => resizeGrid(0, 1));
  app.querySelector<HTMLButtonElement>("[data-action='remove-row']")?.addEventListener("click", () => resizeGrid(0, -1));
  app.querySelector<HTMLButtonElement>("[data-action='add-col']")?.addEventListener("click", () => resizeGrid(1, 0));
  app.querySelector<HTMLButtonElement>("[data-action='remove-col']")?.addEventListener("click", () => resizeGrid(-1, 0));

  app.querySelector<HTMLButtonElement>("[data-action='undo-edit']")?.addEventListener("click", () => {
    undoEdit();
  });

  app.querySelector<HTMLButtonElement>("[data-action='redo-edit']")?.addEventListener("click", () => {
    redoEdit();
  });

  app.querySelector<HTMLButtonElement>("[data-action='apply-ascii']")?.addEventListener("click", () => {
    const value = app.querySelector<HTMLTextAreaElement>("[data-field='ascii']")?.value ?? "";
    pushUndoSnapshot();
    draft.layout = editorAdapter.normalizeAscii(value);
    markDirty("ASCII 已导入");
    diagnoseResult = null;
    playState = null;
    mode = "edit";
    saveEditorMode(mode);
    render();
  });

  app.querySelector<HTMLButtonElement>("[data-action='normalize-ascii']")?.addEventListener("click", () => {
    const textarea = app.querySelector<HTMLTextAreaElement>("[data-field='ascii']");
    if (!textarea) {
      return;
    }
    textarea.value = editorAdapter.normalizeAscii(textarea.value);
  });

  app.querySelector<HTMLButtonElement>("[data-action='copy-ascii']")?.addEventListener("click", () => {
    void copyText(draft.layout);
  });

  app.querySelector<HTMLButtonElement>("[data-action='reset-play']")?.addEventListener("click", () => {
    resetPlayState();
    render();
  });

  app.querySelector<HTMLButtonElement>("[data-action='save-level']")?.addEventListener("click", () => {
    void saveLevel();
  });

  app.querySelector<HTMLButtonElement>("[data-action='promote-level']")?.addEventListener("click", () => {
    void promoteLevel();
  });

  app.querySelector<HTMLButtonElement>("[data-action='diagnose']")?.addEventListener("click", () => {
    void diagnoseLevel();
  });

  app.querySelectorAll<HTMLButtonElement>("[data-copy-snapshot]").forEach((button) => {
    button.addEventListener("click", () => {
      void copyText(button.dataset.copySnapshot ?? "");
    });
  });

  app.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[data-field]").forEach((field) => {
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

function captureDraftFromDom(): void {
  const id = fieldValue("id");
  if (id !== undefined) {
    draft.id = id.trim();
  }
  const title = fieldValue("title");
  if (title !== undefined) {
    draft.title = title.trim();
  }
  const win = fieldValue("win");
  if (win !== undefined) {
    try {
      const parsed = win.trim() ? JSON.parse(win) as WinCondition : undefined;
      draft.win = parsed;
    } catch {
      saveStatus = "Win JSON 暂未解析";
    }
  }
  if (mode === "ascii") {
    const ascii = fieldValue("ascii");
    if (ascii !== undefined) {
      draft.layout = ascii.replace(/\r/g, "").trimEnd();
    }
  }
}

function fieldValue(name: string): string | undefined {
  return app.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[data-field='${name}']`)?.value;
}

function captureViewState(): ViewState {
  return {
    sourceScrollTop: app.querySelector<HTMLElement>(".source-rail")?.scrollTop ?? 0,
    paletteScrollLeft: app.querySelector<HTMLElement>(".palette")?.scrollLeft ?? 0,
  };
}

function restoreViewState(state: ViewState): void {
  const sourceRail = app.querySelector<HTMLElement>(".source-rail");
  if (sourceRail) {
    sourceRail.scrollTop = state.sourceScrollTop;
  }
  const palette = app.querySelector<HTMLElement>(".palette");
  if (palette) {
    palette.scrollLeft = state.paletteScrollLeft;
  }
}

function restoreSourceSearchInputFocus(): void {
  if (!restoreSourceSearchFocus) {
    return;
  }
  restoreSourceSearchFocus = false;
  const input = app.querySelector<HTMLInputElement>("[data-source-search]");
  if (!input) {
    return;
  }
  input.focus();
  const cursor = Math.min(restoreSourceSearchCursor, input.value.length);
  input.setSelectionRange(cursor, cursor);
}

function clearSourceSearch(): void {
  if (sourceSearchRenderTimer !== undefined) {
    window.clearTimeout(sourceSearchRenderTimer);
    sourceSearchRenderTimer = undefined;
  }
  captureDraftFromDom();
  sourceSearch = "";
  restoreSourceSearchCursor = 0;
  restoreSourceSearchFocus = true;
  saveStringPreference(sourceSearchStorageKey, sourceSearch);
  render();
}

function sourceGroups(): Record<SourceFilterId, EditableLevelSource[]> {
  return {
    studio: catalog.sources.filter((source) => source.source === "studio"),
    queued: catalog.sources.filter((source) => source.queued),
    archive: catalog.sources.filter((source) => source.source === "archive" && !source.queued),
    package: catalog.sources.filter((source) => source.source === "package" && !source.queued),
  };
}

function visibleSourceGroups(): Array<{ id: SourceFilterId; title: string; sources: EditableLevelSource[] }> {
  const grouped = sourceGroups();
  return sourceFilterOptions
    .filter((option) => sourceFilters[option.id])
    .map((option) => ({
      id: option.id,
      title: option.label,
      sources: filterSourcesBySearch(grouped[option.id]),
    }))
    .filter((group) => group.sources.length > 0);
}

function visibleSources(): EditableLevelSource[] {
  const byKey = new Map<string, EditableLevelSource>();
  for (const group of visibleSourceGroups()) {
    for (const source of group.sources) {
      if (!byKey.has(source.key)) {
        byKey.set(source.key, source);
      }
    }
  }
  return [...byKey.values()];
}

function filterSourcesBySearch(sources: EditableLevelSource[]): EditableLevelSource[] {
  const query = sourceSearch.trim().toLowerCase();
  if (!query) {
    return sources;
  }
  return sources.filter((source) => sourceMatchesSearch(source, query));
}

function sourceMatchesSearch(source: EditableLevelSource, query: string): boolean {
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
    source.level.lineage?.source_candidate_id,
  ].some((value) => String(value ?? "").toLowerCase().includes(query));
}

function selectRelativeSource(delta: number): void {
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

function selectSource(source: EditableLevelSource): void {
  captureDraftFromDom();
  selectedKey = source.key;
  draft = cloneLevel(source.level);
  resetEditHistory();
  markSaved();
  diagnoseResult = null;
  playState = null;
  mode = "edit";
  saveEditorMode(mode);
  saveStatus = source.readonly ? "只读来源，保存会派生到 Studio" : "Studio draft";
  pendingScrollSelected = true;
  render();
}

function revealCurrentSource(): void {
  const source = sourceForKey(selectedKey);
  if (!source) {
    return;
  }
  sourceFilters = {
    ...sourceFilters,
    [source.source]: true,
    queued: source.queued ? true : sourceFilters.queued,
  };
  sourceSearch = "";
  saveSourceFilters(sourceFilters);
  saveStringPreference(sourceSearchStorageKey, sourceSearch);
  pendingScrollSelected = true;
}

function scrollSelectedSourceIntoView(): void {
  const buttons = [...app.querySelectorAll<HTMLButtonElement>("[data-source-key]")];
  const selected = buttons.find((button) => button.dataset.sourceKey === selectedKey);
  selected?.scrollIntoView({ block: "nearest" });
}

function statusText(): string {
  if (dirty) {
    return `${saveStatus} · 未保存`;
  }
  return saveStatus;
}

function draftSignature(level: LevelDoc): string {
  return JSON.stringify(level);
}

function markSaved(): void {
  savedDraftSignature = draftSignature(draft);
  dirty = false;
}

function markDirty(status?: string): void {
  dirty = draftSignature(draft) !== savedDraftSignature;
  if (!dirty) {
    if (status || saveStatus.includes("未保存")) {
      saveStatus = "已回到保存版本";
    }
    return;
  }
  if (status) {
    saveStatus = status;
  } else if (dirty && !saveStatus.includes("未保存")) {
    saveStatus = "未保存修改";
  }
}

function updateSaveStatusText(): void {
  const element = app.querySelector<HTMLElement>(".save-status");
  if (element) {
    element.textContent = statusText();
    element.dataset.dirty = String(dirty);
  }
}

function confirmDiscardChanges(): boolean {
  if (!dirty) {
    return true;
  }
  return window.confirm("当前草稿有未保存修改，继续会丢失这些修改。");
}

function pushUndoSnapshot(): void {
  captureDraftFromDom();
  undoStack.push(draftSignature(draft));
  if (undoStack.length > 100) {
    undoStack.shift();
  }
  redoStack = [];
}

function resetEditHistory(): void {
  undoStack = [];
  redoStack = [];
}

function undoEdit(): void {
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

function redoEdit(): void {
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

function restoreDraftSnapshot(snapshot: string): void {
  draft = JSON.parse(snapshot) as LevelDoc;
  diagnoseResult = null;
  playState = null;
  markDirty("未保存修改");
  render();
}

function beginPaint(x: number, y: number): void {
  if (mode !== "edit") {
    return;
  }
  captureDraftFromDom();
  pushUndoSnapshot();
  painting = true;
  paintChanged = false;
  const tool = activeToolItem();
  if (tool && candleDragKind(tool)) {
    candlePaintStart = { x, y };
    candlePaintBaseLayout = draft.layout;
    candlePaintAxis = undefined;
    candlePaintDirection = undefined;
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

function continuePaint(x: number, y: number, button: HTMLButtonElement): void {
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

function endPaint(): void {
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
  markDirty("未保存修改");
  render();
}

function updateDraggedCandle(x: number, y: number): void {
  const tool = activeToolItem();
  const kind = tool ? candleDragKind(tool) : undefined;
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
    candlePaintDirection,
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

function clearCandlePaintGesture(): void {
  candlePaintStart = null;
  candlePaintBaseLayout = "";
  candlePaintAxis = undefined;
  candlePaintDirection = undefined;
  candlePaintPreviewCells = [];
}

function paintCell(x: number, y: number): boolean {
  const before = draft.layout;
  applyActiveTool(x, y);
  return draft.layout !== before;
}

function renderCellButton(x: number, y: number, button = cellButton(x, y)): void {
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

function renderCellButtons(points: CandleDragPoint[]): void {
  const rendered = new Set<string>();
  for (const point of points) {
    const key = `${point.x},${point.y}`;
    if (rendered.has(key)) {
      continue;
    }
    rendered.add(key);
    renderCellButton(point.x, point.y);
  }
}

function cellButton(x: number, y: number): HTMLButtonElement | undefined {
  return [...app.querySelectorAll<HTMLButtonElement>("[data-x][data-y]")]
    .find((button) => button.dataset.x === String(x) && button.dataset.y === String(y));
}

function activeToolLabel(): string {
  const tool = activeToolItem();
  return tool ? `当前：${tool.label}` : "当前：无工具";
}

function saveButtonLabel(selectedSource: EditableLevelSource | undefined): string {
  if (!catalog.writable) {
    return "静态只读";
  }
  if (!selectedSource || selectedSource.readonly || selectedKey === newDraftKey) {
    return "保存为 Studio Draft";
  }
  return dirty ? "保存 Studio Draft" : "已保存";
}

function renderDraftValidation(): string {
  const issues: string[] = [];
  try {
    const board = editorAdapter.parseAsciiToBoard(draft.layout);
    if (board.width < 1 || board.height < 1) {
      issues.push("棋盘为空。");
    }
    const validation = editorAdapter.validateLevel(draft, data.mechanic);
    issues.push(...validation.errors);
  } catch (error) {
    issues.push(error instanceof Error ? error.message : "ASCII 无法解析。");
  }
  if (issues.length === 0) {
    return `<div class="draft-validation ok">当前草稿格式可解析。</div>`;
  }
  return `
    <div class="draft-validation warn">
      ${issues.slice(0, 4).map((issue) => `<div>${escapeHtml(issue)}</div>`).join("")}
    </div>
  `;
}

function applyActiveTool(x: number, y: number): void {
  const tool = activeToolItem();
  if (!tool) {
    return;
  }
  const board = editorAdapter.parseAsciiToBoard(draft.layout);
  const cell = board.cells[y * board.width + x];
  if (!cell || x < 0 || y < 0 || x >= board.width || y >= board.height) {
    return;
  }
  applyToolToCell(cell, tool);
  draft.layout = editorAdapter.serializeBoard(board);
}

function resizeGrid(deltaWidth: number, deltaHeight: number): void {
  captureDraftFromDom();
  const board = editorAdapter.parseAsciiToBoard(draft.layout);
  const nextWidth = Math.max(1, board.width + deltaWidth);
  const nextHeight = Math.max(1, board.height + deltaHeight);
  if (nextWidth === board.width && nextHeight === board.height) {
    return;
  }
  pushUndoSnapshot();
  const nextCells: EditorCell[] = [];
  for (let y = 0; y < nextHeight; y += 1) {
    for (let x = 0; x < nextWidth; x += 1) {
      nextCells.push(
        x < board.width && y < board.height
          ? cloneEditorCell(board.cells[y * board.width + x] ?? defaultEditorCell())
          : defaultEditorCell(),
      );
    }
  }
  draft.layout = editorAdapter.serializeBoard({
    width: nextWidth,
    height: nextHeight,
    cells: nextCells,
  });
  diagnoseResult = null;
  playState = null;
  markDirty("未保存修改");
  render();
}

function boardForDraft(): VisualBoard {
  try {
    const state = adapter.parseLevel(draft);
    return renderVisualStateWithFallback(adapter, data.mechanic, state);
  } catch {
    return boardFromLayout(draft.layout);
  }
}

function boardFromState(runtimeAdapter: CurrentRuntimeAdapter, state: any): VisualBoard {
  return renderVisualStateWithFallback(runtimeAdapter, data.mechanic, state);
}

function boardFromLayout(layout: string): VisualBoard {
  const board = editorAdapter.parseAsciiToBoard(layout);
  return editorBoardToVisualBoard(board, editorAdapter.renderCell);
}

function visualForToolItem(
  item: EditorToolItem,
  x: number,
  y: number,
): VisualTile {
  const visual = item.visual ?? editorAdapter.renderCell(defaultEditorCell());
  return {
    x,
    y,
    terrain: cloneLayer(visual.terrain),
    target: cloneLayer(visual.target),
    objects: visual.objects?.map((layer) => ({ ...layer })),
    actors: visual.actors?.map((layer) => ({ ...layer })),
  };
}

function cloneLayer(layer: VisualLayer | undefined): VisualLayer | undefined {
  return layer ? { ...layer } : undefined;
}

function firstToolKey(): string {
  const first = editorAdapter.layers[0]?.items[0];
  return first ? toolKey(first) : "";
}

function toolKey(item: EditorToolItem): string {
  return `${item.layer}:${item.id}`;
}

function activeToolItem(): EditorToolItem | undefined {
  for (const group of editorAdapter.layers) {
    const tool = group.items.find((item) => toolKey(item) === activeToolKey);
    if (tool) {
      return tool;
    }
  }
  return undefined;
}

function applyToolToCell(cell: EditorCell, tool: EditorToolItem): void {
  if (candleDragEnabled && applyCandleClearCellTool(cell, tool)) {
    return;
  }

  if (tool.layer === "terrain") {
    cell.terrain = tool.value ?? "floor";
    if (cell.terrain === "wall") {
      clearCellContent(cell);
    }
    return;
  }

  if (cell.terrain === "wall") {
    cell.terrain = "floor";
  }

  if (tool.layer === "target") {
    if (tool.value) {
      cell.target = tool.value;
      delete cell.mechanism;
    } else {
      delete cell.target;
    }
    return;
  }

  if (tool.layer === "actor") {
    if (tool.value) {
      cell.actor = tool.value;
      delete cell.object;
      delete cell.mechanism;
    } else {
      delete cell.actor;
    }
    return;
  }

  if (tool.layer === "object") {
    if (tool.value) {
      cell.object = tool.value;
      delete cell.actor;
      delete cell.mechanism;
    } else {
      delete cell.object;
    }
    return;
  }

  if (tool.layer === "mechanism") {
    if (tool.value) {
      cell.mechanism = tool.value;
      delete cell.target;
      delete cell.actor;
      delete cell.object;
    } else {
      delete cell.mechanism;
    }
  }
}

function clearCellContent(cell: EditorCell): void {
  delete cell.target;
  delete cell.actor;
  delete cell.object;
  delete cell.mechanism;
}

function defaultEditorCell(): EditorCell {
  return { terrain: "floor" };
}

function cloneEditorCell(cell: EditorCell): EditorCell {
  return { ...cell };
}

function ensurePlayState(): void {
  if (!playState) {
    resetPlayState();
  }
}

function resetPlayState(): void {
  try {
    playState = {
      current: adapter.parseLevel(draft),
      history: [],
      lastEvents: [],
      moveCount: 0,
      won: false,
      messages: [],
    };
    saveStatus = "试玩中";
  } catch (error) {
    playState = null;
    saveStatus = error instanceof Error ? `无法试玩：${error.message}` : "无法试玩";
  }
}

function applyInput(input: InputId): void {
  ensurePlayState();
  if (!playState || playState.won) {
    return;
  }
  const result = adapter.step(data.mechanic, playState.current, input, {
    winCondition: draft.win ?? data.mechanic.win,
  });
  playState.lastEvents = result.events;
  if (!result.legal) {
    playState.messages = [`${input}: ${result.reason ?? "illegal"}`, ...playState.messages];
    return;
  }
  playState.history.push(playState.current);
  playState.current = result.state;
  playState.moveCount += 1;
  playState.won =
    adapter.isWin(playState.current, draft.win ?? data.mechanic.win) ||
    adapter.isEventWin(result.events, draft.win ?? data.mechanic.win);
  playState.messages = [
    `${input}: ${result.events.length > 0 ? result.events.join(", ") : "move"}`,
    ...playState.messages,
  ];
}

function undoMove(): void {
  if (!playState || playState.history.length === 0) {
    return;
  }
  playState.current = playState.history.pop();
  playState.moveCount = Math.max(0, playState.moveCount - 1);
  playState.won = false;
  playState.lastEvents = [];
  playState.messages = ["undo", ...playState.messages];
}

async function saveLevel(): Promise<void> {
  captureDraftFromDom();
  saveStatus = "保存中...";
  render();
  try {
    const response = await fetch("./api/editor/save-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sourceKey: selectedKey === newDraftKey ? undefined : selectedKey,
        level: draft,
      }),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json() as { savedKey: string; level: LevelDoc; catalog: EditorCatalog };
    catalog = result.catalog;
    selectedKey = result.savedKey;
    draft = cloneLevel(result.level);
    markSaved();
    diagnoseResult = null;
    playState = null;
    saveStatus = `已保存 ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `保存失败：${error.message}` : "保存失败";
  }
  render();
}

async function promoteLevel(): Promise<void> {
  captureDraftFromDom();
  if (!selectedKey.startsWith("studio:")) {
    saveStatus = "只有 Studio draft 可以提升";
    render();
    return;
  }
  if (dirty) {
    saveStatus = "请先保存当前 Studio draft 再提升";
    render();
    return;
  }
  saveStatus = "提升中...";
  render();
  try {
    const response = await fetch("./api/editor/promote-level", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ levelId: draft.id }),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json() as { catalog: EditorCatalog };
    catalog = result.catalog;
    saveStatus = "已提升到 package levels.yml";
  } catch (error) {
    saveStatus = error instanceof Error ? `提升失败：${error.message}` : "提升失败";
  }
  render();
}

async function diagnoseLevel(): Promise<void> {
  captureDraftFromDom();
  saveStatus = "诊断中...";
  render();
  try {
    const response = await fetch("./api/editor/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: draft }),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    diagnoseResult = await response.json() as DiagnoseResult;
    saveStatus = `诊断完成 ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `诊断失败：${error.message}` : "诊断失败";
  }
  render();
}

async function loadEditorCatalog(): Promise<EditorCatalog> {
  try {
    return await fetchJson<EditorCatalog>(`./api/editor-data?v=${encodeURIComponent(buildId)}`);
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
        metadata: {},
      })),
    };
  }
}

async function loadPlayableData(): Promise<PlayableData> {
  try {
    return await fetchJson<PlayableData>(`./api/playable-data?v=${encodeURIComponent(buildId)}`);
  } catch {
    return await fetchJson<PlayableData>(`./data.json?v=${encodeURIComponent(buildId)}`);
  }
}

function sourceForKey(key: string): EditableLevelSource | undefined {
  return catalog.sources.find((source) => source.key === key);
}

function loadEditorMode(): EditorMode {
  const value = loadStringPreference(modeStorageKey);
  return isEditorMode(value) ? value : "edit";
}

function saveEditorMode(value: EditorMode): void {
  saveStringPreference(modeStorageKey, value);
}

function isEditorMode(value: string): value is EditorMode {
  return value === "edit" || value === "play" || value === "ascii";
}

function loadActiveToolKey(): string {
  const value = loadStringPreference(activeToolStorageKey);
  return isKnownToolKey(value) ? value : firstToolKey();
}

function isKnownToolKey(value: string): boolean {
  return editorAdapter.layers.some((group) => group.items.some((item) => toolKey(item) === value));
}

function loadStringPreference(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

function saveStringPreference(key: string, value: string): void {
  try {
    if (value) {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore private-mode storage failures; the in-memory state still updates.
  }
}

function loadSourceFilters(): SourceFilters {
  try {
    const raw = window.localStorage.getItem(sourceFilterStorageKey);
    const parsed = raw ? JSON.parse(raw) as Partial<SourceFilters> : {};
    return {
      ...defaultSourceFilters,
      ...Object.fromEntries(
        Object.entries(parsed).filter((entry): entry is [SourceFilterId, boolean] =>
          isSourceFilterId(entry[0]) && typeof entry[1] === "boolean",
        ),
      ),
    };
  } catch {
    return { ...defaultSourceFilters };
  }
}

function saveSourceFilters(filters: SourceFilters): void {
  try {
    window.localStorage.setItem(sourceFilterStorageKey, JSON.stringify(filters));
  } catch {
    // Ignore private-mode storage failures; the in-memory state still updates.
  }
}

function isSourceFilterId(value: string): value is SourceFilterId {
  return value === "studio" || value === "queued" || value === "archive" || value === "package";
}

function initialSourceKey(): string | undefined {
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
    return catalog.sources.find((source) =>
      source.levelId === levelId ||
      source.level.id === levelId ||
      source.level.lineage?.source_level_id === levelId,
    )?.key;
  }
  return undefined;
}

function graphSummary(unique: DiagnoseResult["uniqueness"]): string {
  const parts = [
    unique.reachableStateCount !== undefined ? `${unique.reachableStateCount} states` : "",
    unique.legalTransitionCount !== undefined ? `${unique.legalTransitionCount} edges` : "",
    unique.sccCount !== undefined ? `${unique.sccCount} SCC` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}

function formatWin(win: WinCondition | undefined): string {
  return win ? JSON.stringify(win, null, 2) : "";
}

function cloneLevel(level: LevelDoc): LevelDoc {
  return JSON.parse(JSON.stringify(level)) as LevelDoc;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json() as T;
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    saveStatus = "已复制";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    saveStatus = "已复制";
  }
  render();
}

function orderedTiles(board: VisualBoard): VisualTile[] {
  return [...board.tiles].sort((a, b) => a.y - b.y || a.x - b.x);
}

function tileLabel(tile: VisualTile): string {
  return [
    tile.terrain?.label,
    tile.target?.label,
    ...(tile.objects ?? []).map((layer) => layer.label ?? layer.fallbackGlyph),
    ...(tile.actors ?? []).map((layer) => layer.label ?? layer.fallbackGlyph),
  ].filter(Boolean).join(", ");
}

function isEditableTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLButtonElement;
}

function escapeHtml(value: string | number | boolean | null | undefined): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value: string | number | boolean | null | undefined): string {
  return escapeHtml(value);
}

function requireEditorAdapter(runtimeAdapter: CurrentRuntimeAdapter): RuntimeEditorAdapter {
  if (!runtimeAdapter.editor) {
    throw new Error(`Runtime adapter '${runtimeAdapter.id}' does not expose editor support`);
  }
  return runtimeAdapter.editor;
}
