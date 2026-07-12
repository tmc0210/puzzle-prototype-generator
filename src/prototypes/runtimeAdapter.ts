import type { KnowledgeDoc, LevelDoc, MechanicDoc, WinCondition } from "../core/types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "../core/puzzleRuntime.js";
import { iceSlideAdapter } from "./ice_slide_escape/runtime.js";
import { pullPortalAdapter } from "./pull_portal_fallback/runtime.js";
import { realityAnchorAdapter } from "./reality_anchor/runtime.js";

export type AdapterStepResult<State, Action extends string> = {
  legal: boolean;
  input: Action;
  state: State;
  events: string[];
  reason?: string;
};

export type AdapterReplayResult<State> = {
  state: State;
  events: string[];
  legal: boolean;
};

export type VisualLayer = {
  visualKey: string;
  fallbackGlyph: string;
  label?: string;
  tags?: string[];
};

export type VisualTile = {
  x: number;
  y: number;
  terrain?: VisualLayer;
  target?: VisualLayer;
  actors?: VisualLayer[];
  objects?: VisualLayer[];
};

export type VisualBoard = {
  width: number;
  height: number;
  tiles: VisualTile[];
};

export type EditorLayerId = "terrain" | "target" | "actor" | "object" | "mechanism";

export type EditorCell = {
  terrain: string;
  target?: string;
  actor?: string;
  object?: string;
  mechanism?: string;
};

export type EditorBoard = {
  width: number;
  height: number;
  cells: EditorCell[];
};

export type EditorToolItem = {
  id: string;
  layer: EditorLayerId;
  label: string;
  value?: string;
  shortcut?: string;
  visual?: Omit<VisualTile, "x" | "y">;
};

export type EditorToolGroup = {
  id: EditorLayerId;
  label: string;
  exclusive: boolean;
  items: EditorToolItem[];
};

export type EditorValidationResult = {
  ok: boolean;
  errors: string[];
};

export type RuntimeEditorAdapter = {
  layers: EditorToolGroup[];
  defaultGlyph: string;
  defaultSize: {
    width: number;
    height: number;
  };
  defaultLevel(mechanic: MechanicDoc, knowledge: KnowledgeDoc): LevelDoc;
  normalizeAscii(layout: string): string;
  parseAsciiToBoard(layout: string): EditorBoard;
  serializeBoard(board: EditorBoard): string;
  renderCell(cell: EditorCell): Omit<VisualTile, "x" | "y">;
  serializeAscii?(level: LevelDoc): string;
  validateLevel(level: LevelDoc, mechanic: MechanicDoc): EditorValidationResult;
};

export type RuntimeAdapter<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
> = {
  id: string;
  createRuntime(mechanic: MechanicDoc): PuzzleRuntime<State, Action, Options>;
  parseLevel(level: LevelDoc): State;
  renderState(state: State): string;
  step(
    mechanic: MechanicDoc,
    state: State,
    action: Action,
    options: Options,
  ): AdapterStepResult<State, Action>;
  replay(
    mechanic: MechanicDoc,
    initialState: State,
    actions: Action[],
    options: Options,
  ): AdapterReplayResult<State>;
  isWin(state: State, winCondition: WinCondition): boolean;
  isEventWin(events: string[], winCondition?: WinCondition): boolean;
  renderVisualState?(state: State, mechanic: MechanicDoc): VisualBoard;
  editor?: RuntimeEditorAdapter;
};

export type CurrentRuntimeAdapter = RuntimeAdapter<any, any, any>;

export function renderVisualStateWithFallback<State extends { width: number; height: number }>(
  adapter: RuntimeAdapter<State, string, RuntimeSearchOptions>,
  mechanic: MechanicDoc,
  state: State,
): VisualBoard {
  return adapter.renderVisualState?.(state, mechanic) ?? renderGlyphVisualBoard(adapter.renderState(state), state);
}

export function renderGlyphVisualBoard(
  renderedState: string,
  size: { width: number; height: number },
): VisualBoard {
  const rows = renderedState
    .split("\n")
    .map((row) => row.padEnd(size.width, " "));
  const tiles: VisualTile[] = [];

  for (let y = 0; y < size.height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < size.width; x += 1) {
      tiles.push(glyphTile(row[x] ?? " ", x, y));
    }
  }

  return { width: size.width, height: size.height, tiles };
}

function glyphTile(glyph: string, x: number, y: number): VisualTile {
  const tile: VisualTile = {
    x,
    y,
    terrain: visualLayer("terrain.floor", " ", "floor"),
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

export function visualLayer(
  visualKey: string,
  fallbackGlyph: string,
  label: string,
  tags: string[] = [],
): VisualLayer {
  return { visualKey, fallbackGlyph, label, tags };
}

export function visualTileForGlyph(glyph: string, x = 0, y = 0): VisualTile {
  return glyphTile(glyph, x, y);
}

export function editorVisualForGlyph(glyph: string): Omit<VisualTile, "x" | "y"> {
  const { x: _x, y: _y, ...visual } = glyphTile(glyph, 0, 0);
  return visual;
}

export function editorTool(
  layerId: EditorLayerId,
  id: string,
  label: string,
  value: string | undefined,
  visual: Omit<VisualTile, "x" | "y">,
): EditorToolItem {
  return { id, layer: layerId, label, value, visual };
}

export function editorToolGroup(
  id: EditorLayerId,
  label: string,
  items: EditorToolItem[],
  exclusive = true,
): EditorToolGroup {
  return { id, label, exclusive, items };
}

export function editorBoardFromAscii(
  layout: string,
  options: {
    defaultTerrain: string;
    parseGlyph: (glyph: string) => Partial<EditorCell>;
    rectangular?: boolean;
    fill?: string;
  },
): EditorBoard {
  const normalized = normalizeAsciiLayout(layout, {
    rectangular: options.rectangular,
    fill: options.fill,
  });
  const rows = normalized.length > 0 ? normalized.split("\n") : [""];
  const width = Math.max(1, ...rows.map((row) => row.length));
  const height = Math.max(1, rows.length);
  const cells: EditorCell[] = [];
  for (let y = 0; y < height; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < width; x += 1) {
      cells.push({
        terrain: options.defaultTerrain,
        ...options.parseGlyph(row[x] ?? options.fill ?? " "),
      });
    }
  }
  return { width, height, cells };
}

export function serializeEditorBoard(
  board: EditorBoard,
  serializeCell: (cell: EditorCell) => string,
): string {
  const rows: string[][] = Array.from({ length: board.height }, () =>
    Array.from({ length: board.width }, () => " "),
  );
  for (let y = 0; y < board.height; y += 1) {
    for (let x = 0; x < board.width; x += 1) {
      const cell = board.cells[y * board.width + x];
      rows[y]![x] = cell ? serializeCell(cell) : " ";
    }
  }
  return rows.map((row) => row.join("").trimEnd()).join("\n");
}

export function editorBoardToVisualBoard(
  board: EditorBoard,
  renderCell: (cell: EditorCell) => Omit<VisualTile, "x" | "y">,
): VisualBoard {
  const tiles: VisualTile[] = [];
  for (let y = 0; y < board.height; y += 1) {
    for (let x = 0; x < board.width; x += 1) {
      const visual = renderCell(board.cells[y * board.width + x] ?? { terrain: "floor" });
      tiles.push({
        x,
        y,
        terrain: cloneVisualLayer(visual.terrain),
        target: cloneVisualLayer(visual.target),
        actors: visual.actors?.map((layer) => ({ ...layer })),
        objects: visual.objects?.map((layer) => ({ ...layer })),
      });
    }
  }
  return { width: board.width, height: board.height, tiles };
}

function cloneVisualLayer(layer: VisualLayer | undefined): VisualLayer | undefined {
  return layer ? { ...layer } : undefined;
}

export function normalizeAsciiLayout(
  layout: string,
  options: { rectangular?: boolean; fill?: string } = {},
): string {
  const fill = options.fill ?? " ";
  const rows = layout
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.replace(/\t/g, "  "));
  while (rows.length > 0 && rows[0]?.trim() === "") {
    rows.shift();
  }
  while (rows.length > 0 && rows.at(-1)?.trim() === "") {
    rows.pop();
  }
  if (rows.length === 0) {
    return "";
  }
  const contentRows = rows
    .map((row, index) => {
      const indent = row.match(/^ */)?.[0].length ?? 0;
      return { index, indent, width: row.trimEnd().length - indent };
    })
    .filter(({ width }) => width > 0);
  const commonIndent = Math.min(...contentRows.map(({ indent }) => indent));
  const firstContentRow = contentRows[0]!;
  const continuationRows = contentRows.slice(1);
  const continuationIndent =
    commonIndent === 0 &&
    firstContentRow.index === 0 &&
    continuationRows.length > 0 &&
    continuationRows.every(
      ({ indent, width }) => indent > 0 && width === firstContentRow.width,
    )
      ? Math.min(...continuationRows.map(({ indent }) => indent))
      : 0;
  const dedentedRows = rows.map((row, index) =>
    row.slice(commonIndent || (index > firstContentRow.index ? continuationIndent : 0)),
  );
  if (!options.rectangular) {
    return dedentedRows.map((row) => row.trimEnd()).join("\n");
  }
  const width = Math.max(...dedentedRows.map((row) => row.length));
  return dedentedRows.map((row) => row.padEnd(width, fill)).join("\n");
}

export function validateLevelByParsing<State>(
  level: LevelDoc,
  parseLevel: (level: LevelDoc) => State,
): EditorValidationResult {
  const errors: string[] = [];
  if (!level.id.trim()) {
    errors.push("缺少关卡 id");
  }
  if (!level.title.trim()) {
    errors.push("缺少标题");
  }
  if (!level.layout.trim()) {
    errors.push("缺少布局");
  }
  try {
    parseLevel(level);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
  return { ok: errors.length === 0, errors };
}

export function getRuntimeAdapter(mechanic: MechanicDoc): CurrentRuntimeAdapter {
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
    `No runtime adapter registered for mechanic '${mechanic.id}'. ` +
      "Add an adapter before running solver, analyzer, playable, or exporter commands.",
  );
}
