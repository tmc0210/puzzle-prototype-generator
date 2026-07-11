import type {
  InputId,
  KnowledgeDoc,
  LevelDoc,
  LevelsDoc,
  MechanicDoc,
  WinCondition,
} from "../core/types.js";
import { isTerminalWinCondition } from "../core/puzzleRuntime.js";
import {
  getRuntimeAdapter,
  renderVisualStateWithFallback,
  type CurrentRuntimeAdapter,
  type VisualBoard,
  type VisualLayer,
  type VisualTile,
} from "../prototypes/runtimeAdapter.js";
import {
  puzzleScript16Sprites,
  type PixelSpriteAsset,
} from "./assets/puzzlescript16/manifest.js";

declare const __BUILD_ID__: string;

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

type HumanComment = {
  id: string;
  author?: string;
  status?: string;
  aesthetic_score?: number | null;
  difficulty_score?: number | null;
  attached_to?: string[];
  text: string;
  created_at?: string;
};

type ArchiveEntry = {
  kind: "archive";
  candidateId?: string;
  levelId?: string;
  playable: boolean;
  level?: LevelDoc;
  metadata: Record<string, unknown>;
  humanComments: HumanComment[];
  humanCalibration: Record<string, unknown>;
  evidenceRefs: string[];
};

type PlaytestReviewEntry = {
  level_id: string;
  status: string;
  aesthetic_score: number | null;
  aesthetic_label: string | null;
  difficulty_score: number | null;
  difficulty_label: string | null;
  allowed_exposure_through: string | null;
  updated_at?: string;
  comments: HumanComment[];
};

type TemporaryEntry = {
  kind: "temporary";
  levelId: string;
  level: LevelDoc;
  review?: PlaytestReviewEntry;
};

type ReviewData = {
  writable: boolean;
  mechanic: string;
  archiveEntries: ArchiveEntry[];
  temporaryEntries: TemporaryEntry[];
  labels: {
    aesthetic: Record<string, string>;
    difficulty: Record<string, string>;
  };
};

type CandidateEntry = ArchiveEntry | TemporaryEntry;

type CandidateTab = "archive" | "temporary";
type CandidateFilter = "all" | "unreviewed" | "ready" | "attention";
type ScoreFilter = "any" | "2" | "3" | "4" | "5";

type ReviewDraft = {
  humanFinalStatus: string;
  archiveEligibility: string;
  playtestStatus: string;
  aestheticScore: number | null;
  difficultyScore: number | null;
  comment: string;
};

type PlayState = {
  level: LevelDoc;
  current: any;
  history: any[];
  lastEvents: string[];
  moveCount: number;
  won: boolean;
  messages: string[];
};

type ReviewViewState = {
  candidateRailScrollTop: number;
  candidateListScrollTop: number;
};

const defaultAestheticLabels: Record<string, string> = {
  "1": "反例样本",
  "2": "功能库存",
  "3": "可用下界",
  "4": "亮点候选",
  "5": "标杆范例",
};

const defaultDifficultyLabels: Record<string, string> = {
  "1": "教学见证",
  "2": "简单练习",
  "3": "常规流程",
  "4": "阶段挑战",
  "5": "高难终局",
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

const appRoot = document.querySelector<HTMLElement>("#app");
if (!appRoot) {
  throw new Error("Missing #app root element");
}
const app = appRoot;

const buildId = typeof __BUILD_ID__ === "string" ? __BUILD_ID__ : String(Date.now());
const data = await loadPlayableData();
const adapter = getRuntimeAdapter(data.mechanic);
let reviewData = await loadReviewData(data);

let activeTab: CandidateTab = reviewData.archiveEntries.length > 0 ? "archive" : "temporary";
let activeFilter: CandidateFilter = "all";
let activeAestheticScoreFilter: ScoreFilter = "2";
let activeDifficultyScoreFilter: ScoreFilter = "any";
let selectedEntryKey = "";
let playState: PlayState | null = null;
let saveStatus = reviewData.writable ? "可写评审服务已连接" : "静态只读试玩";
let replaying = false;
let toolMenuOpen = false;

const draftByEntry = new Map<string, ReviewDraft>();

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

function render(): void {
  const viewState = captureViewState();
  const entry = currentEntry();
  const level = entryLevel(entry);
  const draft = entry ? draftForEntry(entry) : emptyDraft();

  app.innerHTML = `
    <div class="review-shell">
      ${renderHeader()}
      <aside class="candidate-rail" aria-label="候选列表">
        ${renderCandidateRail()}
      </aside>
      <main class="play-area">
        ${renderPlayArea(entry, level)}
      </main>
      <aside class="review-panel" aria-label="评审面板">
        ${entry ? renderReviewPanel(entry, draft) : renderEmptyReviewPanel()}
      </aside>
    </div>
  `;

  bindUiEvents();
  restoreViewState(viewState);
}

function captureViewState(): ReviewViewState {
  return {
    candidateRailScrollTop: app.querySelector<HTMLElement>(".candidate-rail")?.scrollTop ?? 0,
    candidateListScrollTop: app.querySelector<HTMLElement>(".candidate-list")?.scrollTop ?? 0,
  };
}

function restoreViewState(state: ReviewViewState): void {
  const rail = app.querySelector<HTMLElement>(".candidate-rail");
  if (rail) {
    rail.scrollTop = state.candidateRailScrollTop;
  }
  const list = app.querySelector<HTMLElement>(".candidate-list");
  if (list) {
    list.scrollTop = state.candidateListScrollTop;
  }
}

function renderHeader(): string {
  const archiveCount = reviewData.archiveEntries.length;
  const temporaryCount = reviewData.temporaryEntries.length;
  const writableLabel = reviewData.writable ? "可写" : "只读";
  return `
    <header class="app-header">
      <div class="title-block">
        <span class="eyebrow">${escapeHtml(data.mechanic.id)}</span>
        <h1>${escapeHtml(data.mechanic.title)}</h1>
      </div>
      <div class="header-metrics" aria-label="候选概况">
        <a class="secondary-link" href="./editor">关卡编辑器</a>
        <span class="metric"><strong>${archiveCount}</strong> 归档候选</span>
        <span class="metric"><strong>${temporaryCount}</strong> 临时游玩</span>
        <span class="badge ${reviewData.writable ? "ok" : "muted"}">${writableLabel}</span>
        <span class="save-status">${escapeHtml(saveStatus)}</span>
      </div>
    </header>
  `;
}

function renderCandidateRail(): string {
  const entries = filteredEntries();
  const totalEntries = activeTab === "archive" ? reviewData.archiveEntries.length : reviewData.temporaryEntries.length;
  return `
    <div class="tab-strip" role="tablist" aria-label="候选来源">
      ${tabButton("archive", "归档候选", reviewData.archiveEntries.length)}
      ${tabButton("temporary", "临时游玩", reviewData.temporaryEntries.length)}
    </div>
    <div class="candidate-filter-grid">
      <label class="filter-row">
        <span>状态</span>
        <select data-filter>
          ${filterOption("all", "全部")}
          ${filterOption("unreviewed", "未人工评审")}
          ${filterOption("ready", "可归档/已接受")}
          ${filterOption("attention", "待处理")}
        </select>
      </label>
      <label class="filter-row">
        <span>审美下限</span>
        <select data-score-filter="aesthetic">
          ${scoreFilterOption("any", "不限", activeAestheticScoreFilter)}
          ${scoreFilterOption("2", "2+", activeAestheticScoreFilter)}
          ${scoreFilterOption("3", "3+", activeAestheticScoreFilter)}
          ${scoreFilterOption("4", "4+", activeAestheticScoreFilter)}
          ${scoreFilterOption("5", "5", activeAestheticScoreFilter)}
        </select>
      </label>
      <label class="filter-row">
        <span>难度下限</span>
        <select data-score-filter="difficulty">
          ${scoreFilterOption("any", "不限", activeDifficultyScoreFilter)}
          ${scoreFilterOption("2", "2+", activeDifficultyScoreFilter)}
          ${scoreFilterOption("3", "3+", activeDifficultyScoreFilter)}
          ${scoreFilterOption("4", "4+", activeDifficultyScoreFilter)}
          ${scoreFilterOption("5", "5", activeDifficultyScoreFilter)}
        </select>
      </label>
    </div>
    <div class="filter-summary">显示 ${entries.length} / ${totalEntries}</div>
    <div class="candidate-list">
      ${
        entries.length > 0
          ? entries.map(renderCandidateButton).join("")
          : `<div class="empty-state">当前筛选没有候选。</div>`
      }
    </div>
  `;
}

function renderPlayArea(entry: CandidateEntry | undefined, level: LevelDoc | undefined): string {
  const title = entry ? entryTitle(entry) : "未选择候选";
  const subtitle = entry ? entrySubtitle(entry) : "选择候选";
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
            title="回放"
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
              title="工具"
            >
              工具
            </button>
            ${
              toolMenuOpen
                ? `<div class="tool-menu" role="menu">
                    <button
                      class="tool-menu-item"
                      type="button"
                      data-action="copy-ascii"
                      role="menuitem"
                      ${canExportAscii ? "" : "disabled"}
                    >
                      复制 ASCII
                    </button>
                    <a
                      class="tool-menu-item"
                      href="${escapeAttribute(editorUrlForEntry(entry))}"
                      role="menuitem"
                    >
                      编辑此关
                    </a>
                  </div>`
                : ""
            }
          </div>
        </div>
      </div>
      <div class="play-status-row">
        ${renderPlayStatus()}
        <span class="keyboard-hint">方向键/WASD 移动，Z 撤销，R 重置</span>
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

function renderReviewPanel(entry: CandidateEntry, draft: ReviewDraft): string {
  const comments = entryComments(entry);
  const readonly = reviewData.writable ? "" : "disabled";
  return `
    <form class="review-form" data-review-form data-entry-key="${escapeAttribute(entryKey(entry))}">
      <div class="panel-section">
        <div class="section-title">
          <h2>评审</h2>
          <span class="badge ${entry.kind === "archive" ? "archive" : "temporary"}">
            ${entry.kind === "archive" ? "归档候选" : "临时游玩"}
          </span>
        </div>
        ${entry.kind === "archive" ? renderArchiveFields(draft, readonly) : renderTemporaryFields(draft, readonly)}
      </div>

      <div class="panel-section">
        <h3>审美分</h3>
        ${renderScoreControl("aestheticScore", draft.aestheticScore, reviewData.labels.aesthetic, readonly)}
      </div>

      <div class="panel-section">
        <h3>难度分</h3>
        ${renderScoreControl("difficultyScore", draft.difficultyScore, reviewData.labels.difficulty, readonly)}
      </div>

      <div class="panel-section">
        <label class="field">
          <span>新增评语</span>
          <textarea
            name="comment"
            rows="5"
            placeholder="写下人类评审意见。留空保存时只更新分数/状态。"
            ${readonly}
          >${escapeHtml(draft.comment)}</textarea>
        </label>
        <button class="save-button" type="button" data-action="save-review" ${readonly}>
          保存评审
        </button>
      </div>

      <div class="panel-section">
        <h3>已有评论</h3>
        ${comments.length > 0 ? renderCommentList(comments) : `<p class="muted-copy">暂无人类评论。</p>`}
      </div>

      ${entry.kind === "archive" ? renderEvidence(entry.evidenceRefs) : renderTemporaryReviewSummary(entry)}
    </form>
  `;
}

function renderArchiveFields(draft: ReviewDraft, readonly: string): string {
  return `
    <label class="field">
      <span>最终状态</span>
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
      <span>归档资格</span>
      <select name="archiveEligibility" ${readonly}>
        ${option("human_pending", "human_pending", draft.archiveEligibility)}
        ${option("clean_archive", "clean_archive", draft.archiveEligibility)}
        ${option("raw_run_only", "raw_run_only", draft.archiveEligibility)}
        ${option("reject_do_not_archive", "reject_do_not_archive", draft.archiveEligibility)}
      </select>
    </label>
  `;
}

function renderTemporaryFields(draft: ReviewDraft, readonly: string): string {
  return `
    <label class="field">
      <span>临时状态</span>
      <select name="playtestStatus" ${readonly}>
        ${option("defer", "defer", draft.playtestStatus)}
        ${option("ready_for_archive", "ready_for_archive", draft.playtestStatus)}
        ${option("needs_revision", "needs_revision", draft.playtestStatus)}
        ${option("reject", "reject", draft.playtestStatus)}
      </select>
    </label>
  `;
}

function renderScoreControl(
  name: "aestheticScore" | "difficultyScore",
  current: number | null,
  labels: Record<string, string>,
  readonly: string,
): string {
  const emptyChecked = current === null ? "checked" : "";
  const options = [1, 2, 3, 4, 5]
    .map((score) => {
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
    })
    .join("");
  return `
    <div class="score-grid">
      <label class="score-option empty-score">
        <input type="radio" name="${name}" value="" ${emptyChecked} ${readonly}>
        <span><strong>-</strong><small>未定</small></span>
      </label>
      ${options}
    </div>
  `;
}

function renderCommentList(comments: HumanComment[]): string {
  return `
    <div class="comment-list">
      ${comments
        .map(
          (comment) => `
            <article class="comment-item">
              <div>
                <strong>${escapeHtml(comment.id)}</strong>
                <span>${escapeHtml(comment.status ?? "commented")}</span>
              </div>
              <p>${escapeHtml(comment.text)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderEvidence(refs: string[]): string {
  return `
    <div class="panel-section">
      <h3>证据引用</h3>
      ${
        refs.length > 0
          ? `<ul class="evidence-list">${refs.map((ref) => `<li>${escapeHtml(ref)}</li>`).join("")}</ul>`
          : `<p class="muted-copy">暂无证据引用。</p>`
      }
    </div>
  `;
}

function renderTemporaryReviewSummary(entry: TemporaryEntry): string {
  const review = entry.review;
  return `
    <div class="panel-section">
      <h3>临时记录</h3>
      ${
        review
          ? `<p class="muted-copy">最近更新：${escapeHtml(review.updated_at ?? "unknown")}</p>`
          : `<p class="muted-copy">尚未保存评审。</p>`
      }
    </div>
  `;
}

function renderEmptyReviewPanel(): string {
  return `
    <div class="review-form">
      <div class="empty-state">没有可显示的候选。</div>
    </div>
  `;
}

function renderCandidateButton(entry: CandidateEntry): string {
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
        <span>${level ? `${level.layout.split("\n")[0]?.length ?? 0}x${level.layout.split("\n").length}` : "无布局"}</span>
      </span>
      <span class="candidate-score">${escapeHtml(score)}</span>
    </button>
  `;
}

function renderPlayStatus(): string {
  if (!playState) {
    return `<span class="play-status" title="未选择候选">未选择候选</span>`;
  }
  const className = playState.won ? "play-status win" : "play-status";
  const text = playState.won
    ? `已达成胜利，${playState.moveCount} 步`
    : `${playState.moveCount} 步，${playState.lastEvents.length > 0 ? playState.lastEvents.join(", ") : "等待输入"}`;
  return `<span class="${className}" title="${escapeAttribute(text)}">${escapeHtml(text)}</span>`;
}

function renderTraceLog(): string {
  if (!playState || playState.messages.length === 0) {
    return `<div class="muted-copy">无操作记录</div>`;
  }
  return playState.messages
    .slice(0, 6)
    .map((message) => `<div>${escapeHtml(message)}</div>`)
    .join("");
}

function renderNoBoard(entry: CandidateEntry | undefined): string {
  const text = entry
    ? "未匹配可玩布局"
    : "未选择候选";
  return `<div class="no-board">${escapeHtml(text)}</div>`;
}

function renderBoard(runtimeAdapter: CurrentRuntimeAdapter, state: PlayState): string {
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

function renderTile(tile: VisualTile): string {
  const layers = [
    tile.terrain ? renderLayer(tile.terrain, "terrain") : "",
    tile.target ? renderLayer(tile.target, "target") : "",
    ...(tile.objects ?? []).map((layer) => renderLayer(layer, "object")),
    ...(tile.actors ?? []).map((layer) => renderLayer(layer, "actor")),
  ].join("");
  return `<div class="tile" title="${escapeAttribute(tileLabel(tile))}">${layers}</div>`;
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
    >
      ${body}
    </span>
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

function bindUiEvents(): void {
  app.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      captureDraftFromDom();
      activeTab = button.dataset.tab === "archive" ? "archive" : "temporary";
      toolMenuOpen = false;
      selectedEntryKey = firstEntryKeyForActiveView();
      resetPlayStateForSelection();
      render();
    });
  });

  app.querySelector<HTMLSelectElement>("[data-filter]")?.addEventListener("change", (event) => {
    captureDraftFromDom();
    activeFilter = (event.currentTarget as HTMLSelectElement).value as CandidateFilter;
    toolMenuOpen = false;
    selectedEntryKey = firstEntryKeyForActiveView();
    resetPlayStateForSelection();
    render();
  });

  app.querySelectorAll<HTMLSelectElement>("[data-score-filter]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const target = event.currentTarget as HTMLSelectElement;
      const value = scoreFilterValue(target.value);
      if (!value) {
        return;
      }
      captureDraftFromDom();
      if (target.dataset.scoreFilter === "aesthetic") {
        activeAestheticScoreFilter = value;
      } else {
        activeDifficultyScoreFilter = value;
      }
      toolMenuOpen = false;
      selectedEntryKey = firstEntryKeyForActiveView();
      resetPlayStateForSelection();
      render();
    });
  });

  app.querySelectorAll<HTMLButtonElement>("[data-entry]").forEach((button) => {
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

  app.querySelector<HTMLButtonElement>("[data-action='replay']")?.addEventListener("click", () => {
    toolMenuOpen = false;
    void replayExpected();
  });

  app.querySelector<HTMLButtonElement>("[data-action='toggle-tools']")?.addEventListener("click", () => {
    captureDraftFromDom();
    toolMenuOpen = !toolMenuOpen;
    render();
  });

  app.querySelector<HTMLButtonElement>("[data-action='copy-ascii']")?.addEventListener("click", () => {
    void copyAsciiToClipboard();
  });

  app.querySelector<HTMLButtonElement>("[data-action='save-review']")?.addEventListener("click", () => {
    toolMenuOpen = false;
    void saveReview();
  });
}

async function copyAsciiToClipboard(): Promise<void> {
  if (!playState) {
    saveStatus = "未选择棋盘";
    toolMenuOpen = false;
    render();
    return;
  }
  try {
    await writeClipboard(adapter.renderState(playState.current));
    saveStatus = `ASCII 已复制 ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    saveStatus = error instanceof Error ? `复制失败：${error.message}` : "复制失败";
  }
  toolMenuOpen = false;
  render();
}

async function saveReview(): Promise<void> {
  captureDraftFromDom();
  const entry = currentEntry();
  if (!entry) {
    return;
  }
  if (!reviewData.writable) {
    saveStatus = "只读：未连接评审服务";
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
    comment: draft.comment,
  };

  saveStatus = "保存中...";
  render();

  try {
    const endpoint = entry.kind === "archive" ? "./api/archive-review" : "./api/playtest-review";
    const body =
      entry.kind === "archive"
        ? { candidateId: entry.candidateId, review: payload }
        : { levelId: entry.levelId, review: payload };
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    reviewData = normalizeReviewData(await response.json(), data);
    draftByEntry.set(key, { ...draft, comment: "" });
    saveStatus = `已保存 ${new Date().toLocaleTimeString()}`;
    render();
  } catch (error) {
    saveStatus = error instanceof Error ? `保存失败：${error.message}` : "保存失败";
    render();
  }
}

async function replayExpected(): Promise<void> {
  const entry = currentEntry();
  const level = entryLevel(entry);
  if (!level || replaying) {
    return;
  }
  captureDraftFromDom();
  const inputs = expectedInputsForLevel(level);
  if (inputs.length === 0) {
    saveStatus = "无可用回放";
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
    if (playState?.won && isTerminalWinCondition(levelWin(playState.level))) {
      break;
    }
    applyInput(input);
    render();
  }
  replaying = false;
  render();
}

function applyInput(input: InputId): void {
  if (!playState) {
    return;
  }
  const winCondition = levelWin(playState.level);
  if (playState.won && isTerminalWinCondition(winCondition)) {
    return;
  }
  const result = adapter.step(
    data.mechanic,
    playState.current,
    input,
    { winCondition } as never,
  );
  if (!result.legal) {
    playState.lastEvents = [];
    playState.messages.unshift(`${input}: 非法移动${result.reason ? ` (${result.reason})` : ""}`);
    return;
  }

  playState.history.push(playState.current);
  playState.current = result.state;
  playState.lastEvents = result.events;
  playState.moveCount += 1;
  playState.won = isWinState(result.state, result.events, winCondition);
  playState.messages.unshift(
    `${String(playState.moveCount).padStart(2, "0")} ${input}: ${
      result.events.length > 0 ? result.events.join(", ") : "move"
    }`,
  );
}

function undoMove(): void {
  if (!playState || playState.history.length === 0) {
    return;
  }
  playState.current = playState.history.pop();
  playState.moveCount = Math.max(0, playState.moveCount - 1);
  playState.lastEvents = [];
  playState.won = isWinState(playState.current, [], levelWin(playState.level));
  playState.messages.unshift("Undo");
}

function resetPlayStateForSelection(): void {
  const level = entryLevel(currentEntry());
  playState = level ? createPlayState(level) : null;
}

function createPlayState(level: LevelDoc): PlayState {
  const initial = adapter.parseLevel(level);
  return {
    level,
    current: initial,
    history: [],
    lastEvents: [],
    moveCount: 0,
    won: isWinState(initial, [], levelWin(level)),
    messages: [],
  };
}

function isWinState(state: any, events: string[], winCondition: WinCondition): boolean {
  return adapter.isWin(state, winCondition) || adapter.isEventWin(events, winCondition);
}

function levelWin(level: LevelDoc): WinCondition {
  return level.win ?? data.mechanic.win;
}

function captureDraftFromDom(): void {
  const form = app.querySelector<HTMLFormElement>("[data-review-form]");
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
    comment: stringField(formData, "comment", ""),
  });
}

function draftForEntry(entry: CandidateEntry): ReviewDraft {
  const key = entryKey(entry);
  const existing = draftByEntry.get(key);
  if (existing) {
    return existing;
  }

  const draft =
    entry.kind === "archive"
      ? archiveDraft(entry)
      : temporaryDraft(entry);
  draftByEntry.set(key, draft);
  return draft;
}

function archiveDraft(entry: ArchiveEntry): ReviewDraft {
  return {
    humanFinalStatus: stringValue(entry.metadata.human_final_status) ?? "pending",
    archiveEligibility: stringValue(entry.metadata.archive_eligibility) ?? "human_pending",
    playtestStatus: "defer",
    aestheticScore: scoreValue(entry.metadata.aesthetic_score ?? entry.humanCalibration.aesthetic_score),
    difficultyScore: scoreValue(entry.metadata.difficulty_score ?? entry.humanCalibration.difficulty_score),
    comment: "",
  };
}

function temporaryDraft(entry: TemporaryEntry): ReviewDraft {
  return {
    humanFinalStatus: "pending",
    archiveEligibility: "human_pending",
    playtestStatus: entry.review?.status ?? "defer",
    aestheticScore: scoreValue(entry.review?.aesthetic_score),
    difficultyScore: scoreValue(entry.review?.difficulty_score),
    comment: "",
  };
}

function emptyDraft(): ReviewDraft {
  return {
    humanFinalStatus: "pending",
    archiveEligibility: "human_pending",
    playtestStatus: "defer",
    aestheticScore: null,
    difficultyScore: null,
    comment: "",
  };
}

function currentEntry(): CandidateEntry | undefined {
  const entries = filteredEntries();
  return entries.find((entry) => entryKey(entry) === selectedEntryKey) ?? entries[0];
}

function allEntries(): CandidateEntry[] {
  return [...reviewData.archiveEntries, ...reviewData.temporaryEntries];
}

function filteredEntries(): CandidateEntry[] {
  const entries = activeTab === "archive" ? reviewData.archiveEntries : reviewData.temporaryEntries;
  return entries.filter((entry) => matchesFilter(entry) && matchesScoreFilters(entry));
}

function matchesFilter(entry: CandidateEntry): boolean {
  if (activeFilter === "all") {
    return true;
  }
  if (activeFilter === "unreviewed") {
    return entry.kind === "archive"
      ? !Boolean(entry.metadata.human_reviewed)
      : !entry.review || entry.review.comments.length === 0;
  }
  if (activeFilter === "ready") {
    return entry.kind === "archive"
      ? stringValue(entry.metadata.archive_eligibility) === "clean_archive" ||
          stringValue(entry.metadata.human_final_status) === "accepted"
      : entry.review?.status === "ready_for_archive";
  }
  return entry.kind === "archive"
    ? stringValue(entry.metadata.archive_eligibility) !== "clean_archive" ||
        !Boolean(entry.metadata.human_reviewed)
    : entry.review?.status === "needs_revision" ||
        entry.review?.status === "reject" ||
        entry.review?.status === "defer" ||
        !entry.review;
}

function matchesScoreFilters(entry: CandidateEntry): boolean {
  return matchesScoreFilter(entryAestheticScore(entry), activeAestheticScoreFilter) &&
    matchesScoreFilter(entryDifficultyScore(entry), activeDifficultyScoreFilter);
}

function matchesScoreFilter(score: number | null, filter: ScoreFilter): boolean {
  const threshold = scoreFilterThreshold(filter);
  return threshold === null || score === null || score >= threshold;
}

function pickInitialEntryKey(): string {
  const entries = filteredEntries();
  const playable = entries.find((entry) => entry.kind === "temporary" || entry.level);
  const first = playable ?? entries[0];
  return first ? entryKey(first) : "";
}

function firstEntryKeyForActiveView(): string {
  const first = filteredEntries()[0];
  return first ? entryKey(first) : "";
}

function entryKey(entry: CandidateEntry): string {
  return entry.kind === "archive"
    ? `archive:${entry.candidateId ?? entry.levelId ?? "unknown"}`
    : `temporary:${entry.levelId}`;
}

function editorUrlForEntry(entry: CandidateEntry | undefined): string {
  if (!entry) {
    return "./editor";
  }
  if (entry.kind === "archive" && entry.candidateId) {
    return `./editor?source=${encodeURIComponent(`archive:${entry.candidateId}`)}`;
  }
  const levelId = entry.kind === "temporary" ? entry.levelId : entry.levelId ?? entry.level?.id;
  return levelId ? `./editor?levelId=${encodeURIComponent(levelId)}` : "./editor";
}

function entryLevel(entry: CandidateEntry | undefined): LevelDoc | undefined {
  return entry?.kind === "archive" ? entry.level : entry?.level;
}

function entryTitle(entry: CandidateEntry): string {
  if (entry.kind === "archive") {
    return entry.candidateId ?? entry.level?.id ?? "未命名归档候选";
  }
  return entry.level.title || entry.levelId;
}

function entrySubtitle(entry: CandidateEntry): string {
  const level = entryLevel(entry);
  if (entry.kind === "archive") {
    return `${entry.levelId ?? "未匹配 level"} · ${level?.title ?? "无可玩布局"}`;
  }
  return `${entry.levelId} · ${entry.level.title}`;
}

function entryStatus(entry: CandidateEntry): string {
  if (entry.kind === "archive") {
    return stringValue(entry.metadata.human_final_status) ??
      stringValue(entry.metadata.status) ??
      "unknown";
  }
  return entry.review?.status ?? "pending_playtest";
}

function entryScoreSummary(entry: CandidateEntry): string {
  const aesthetic = entryAestheticScore(entry);
  const difficulty = entryDifficultyScore(entry);
  return `审美 ${aesthetic ?? "-"} / 难度 ${difficulty ?? "-"}`;
}

function entryAestheticScore(entry: CandidateEntry): number | null {
  return entry.kind === "archive"
    ? scoreValue(entry.metadata.aesthetic_score ?? entry.humanCalibration.aesthetic_score)
    : scoreValue(entry.review?.aesthetic_score);
}

function entryDifficultyScore(entry: CandidateEntry): number | null {
  return entry.kind === "archive"
    ? scoreValue(entry.metadata.difficulty_score ?? entry.humanCalibration.difficulty_score)
    : scoreValue(entry.review?.difficulty_score);
}

function entryComments(entry: CandidateEntry): HumanComment[] {
  return entry.kind === "archive" ? entry.humanComments : entry.review?.comments ?? [];
}

function expectedInputsForLevel(level: LevelDoc): InputId[] {
  const fromLevel = (level.expected_trace ?? [])
    .map((step) => step.input)
    .filter(isInputId);
  if (fromLevel.length > 0) {
    return fromLevel;
  }
  const fromEvaluation = data.evaluation?.results?.find((result) => result.levelId === level.id)?.solutionInputs ?? [];
  return fromEvaluation.filter(isInputId);
}

function orderedTiles(board: VisualBoard): VisualTile[] {
  return [...board.tiles].sort((a, b) => a.y - b.y || a.x - b.x);
}

function tileLabel(tile: VisualTile): string {
  const labels = [
    tile.terrain?.label,
    tile.target?.label,
    ...(tile.objects ?? []).map((layer) => layer.label),
    ...(tile.actors ?? []).map((layer) => layer.label),
  ].filter((label): label is string => Boolean(label));
  return labels.join(", ");
}

function tabButton(tab: CandidateTab, label: string, count: number): string {
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

function filterOption(value: CandidateFilter, label: string): string {
  return option(value, label, activeFilter);
}

function scoreFilterOption(value: ScoreFilter, label: string, current: ScoreFilter): string {
  return option(value, label, current);
}

function option(value: string, label: string, current: string): string {
  return `<option value="${escapeAttribute(value)}" ${value === current ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

async function loadPlayableData(): Promise<PlayableData> {
  try {
    return await fetchJson<PlayableData>(`./api/playable-data?v=${encodeURIComponent(buildId)}`);
  } catch {
    return await fetchJson<PlayableData>(`./data.json?v=${encodeURIComponent(buildId)}`);
  }
}

async function loadReviewData(playableData: PlayableData): Promise<ReviewData> {
  try {
    const value = await fetchJson<unknown>("./api/review-data");
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
          level,
        })),
        labels: {
          aesthetic: defaultAestheticLabels,
          difficulty: defaultDifficultyLabels,
        },
      },
      playableData,
    );
  }
}

function normalizeReviewData(value: unknown, playableData: PlayableData): ReviewData {
  const object = isRecord(value) ? value : {};
  return {
    writable: object.writable === true,
    mechanic: stringValue(object.mechanic) ?? playableData.mechanic.id,
    archiveEntries: Array.isArray(object.archiveEntries)
      ? object.archiveEntries.filter(isArchiveEntry)
      : [],
    temporaryEntries: Array.isArray(object.temporaryEntries)
      ? object.temporaryEntries.filter(isTemporaryEntry)
      : [],
    labels: normalizeLabels(object.labels),
  };
}

function normalizeLabels(value: unknown): ReviewData["labels"] {
  const labels = isRecord(value) ? value : {};
  return {
    aesthetic: recordOfStrings(labels.aesthetic) ?? defaultAestheticLabels,
    difficulty: recordOfStrings(labels.difficulty) ?? defaultDifficultyLabels,
  };
}

function isArchiveEntry(value: unknown): value is ArchiveEntry {
  return isRecord(value) && value.kind === "archive";
}

function isTemporaryEntry(value: unknown): value is TemporaryEntry {
  return isRecord(value) && value.kind === "temporary" && isRecord(value.level);
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function stringField(formData: FormData, name: string, fallback: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : fallback;
}

function scoreField(formData: FormData, name: string): number | null {
  const value = formData.get(name);
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }
  return scoreValue(Number(value));
}

function scoreValue(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5
    ? value
    : null;
}

function scoreFilterValue(value: string): ScoreFilter | undefined {
  return value === "any" || value === "2" || value === "3" || value === "4" || value === "5"
    ? value
    : undefined;
}

function scoreFilterThreshold(value: ScoreFilter): number | null {
  return value === "any" ? null : Number(value);
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function recordOfStrings(value: unknown): Record<string, string> | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const entries = Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string");
  return Object.fromEntries(entries);
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

function isInputId(value: unknown): value is InputId {
  return value === "up" || value === "down" || value === "left" || value === "right";
}

function isEditableTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
}

async function writeClipboard(text: string): Promise<void> {
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
    throw new Error("浏览器拒绝剪贴板写入");
  }
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value: unknown): string {
  return escapeHtml(value);
}
