import type {
  InputId,
  KnowledgeDoc,
  LevelDoc,
  MechanicDoc,
  SolverOptions,
} from "../../core/types.js";
import type { PuzzleRuntime } from "../../core/puzzleRuntime.js";
import {
  editorBoardFromAscii,
  editorBoardToVisualBoard,
  editorTool,
  editorToolGroup,
  editorVisualForGlyph,
  normalizeAsciiLayout,
  serializeEditorBoard,
  validateLevelByParsing,
  visualLayer,
  type EditorCell,
  type EditorToolGroup,
  type RuntimeAdapter,
  type VisualBoard,
  type VisualTile,
} from "../runtimeAdapter.js";
import {
  isEventWin,
  isWin,
  parseLevel,
  renderState,
  describeState,
  replay,
  stateKey,
  step,
  wickProjections,
  type CandleSokobanState,
} from "./mechanics.js";

const defaultInputs: InputId[] = ["up", "down", "left", "right"];

export function createCandleSokobanRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<CandleSokobanState, InputId, SolverOptions> {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: (state) =>
      state.dead || isWin(state, mechanic.win) ? [] : legalInputs(mechanic),
    step: (state, action, options) => {
      const result = step(mechanic, state, action, options);
      return {
        action,
        legal: result.legal,
        state: result.state,
        events: result.events,
        cost: mechanic.inputs[action]?.cost ?? 1,
        reason: result.reason,
      };
    },
    isWin,
  };
}

function legalInputs(mechanic: MechanicDoc): InputId[] {
  const inputs = Object.values(mechanic.inputs)
    .filter((input) => input.intent === "move" && input.dir)
    .map((input) => input.dir as InputId);
  return inputs.length > 0 ? inputs : defaultInputs;
}

const layers = [
  editorToolGroup("terrain", "Terrain", [
    tool("terrain", "floor", "地面", "floor", "."),
    tool("terrain", "wall", "墙", "wall", "#"),
  ]),
  editorToolGroup("actor", "Actor", [
    tool("actor", "player", "玩家", "player", "@"),
    tool("actor", "clear", "清角色", undefined, "."),
  ]),
  editorToolGroup("object", "Object", [
    tool("object", "brazier_unlit", "未点燃火盆", "brazier_unlit", "o"),
    tool("object", "brazier_lit", "已点燃火盆", "brazier_lit", "O"),
    tool("object", "clear", "清物体", undefined, "."),
  ]),
  editorToolGroup("mechanism", "Candle", [
    ...Array.from({ length: 9 }, (_, index) => {
      const digit = String(index + 1);
      return tool("mechanism", `body_${digit}`, `烛身 ${digit}`, `body_${digit}`, digit);
    }),
    ...(["u", "r", "d", "l", "U", "R", "D", "L"] as const).map((glyph) =>
      tool(
        "mechanism",
        `cap_${glyph}`,
        `${glyph === glyph.toUpperCase() ? "燃烧" : "未燃"}端帽 ${glyph}`,
        `cap_${glyph}`,
        glyph,
      ),
    ),
    tool("mechanism", "clear", "清蜡烛", undefined, "."),
  ]),
] satisfies EditorToolGroup[];

function tool(
  layerId: Parameters<typeof editorTool>[0],
  id: string,
  label: string,
  value: string | undefined,
  glyph: string,
) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}

function defaultLevel(_mechanic: MechanicDoc, _knowledge: KnowledgeDoc): LevelDoc {
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
      { rectangular: true, fill: "." },
    ),
  };
}

export const candleSokobanAdapter: RuntimeAdapter<
  CandleSokobanState,
  InputId,
  SolverOptions
> = {
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
    normalizeAscii: (layout) =>
      normalizeAsciiLayout(layout, { rectangular: true, fill: "." }),
    parseAsciiToBoard: parseEditorBoard,
    serializeBoard: serializeEditorBoardLayout,
    renderCell: renderEditorCell,
    validateLevel: (level) => validateLevelByParsing(level, parseLevel),
  },
};

function parseEditorBoard(layout: string) {
  return editorBoardFromAscii(layout, {
    defaultTerrain: "floor",
    parseGlyph: parseEditorGlyph,
    rectangular: true,
    fill: ".",
  });
}

function parseEditorGlyph(glyph: string): Partial<EditorCell> {
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

function serializeEditorBoardLayout(board: ReturnType<typeof parseEditorBoard>): string {
  return serializeEditorBoard(board, serializeEditorCell);
}

function serializeEditorCell(cell: EditorCell): string {
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

function renderEditorCell(cell: EditorCell): Omit<VisualTile, "x" | "y"> {
  return editorVisualForGlyph(serializeEditorCell(cell));
}

function renderVisualState(state: CandleSokobanState): VisualBoard {
  const board = parseEditorBoard(renderState(state));
  const visual = editorBoardToVisualBoard(board, renderEditorCell);
  const tileAt = (x: number, y: number): VisualTile =>
    visual.tiles[y * visual.width + x]!;

  for (const tile of visual.tiles) {
    const isWall = tile.terrain?.visualKey === "terrain.wall";
    tile.terrain = visualLayer(
      isWall ? "candle.terrain.wall" : "candle.terrain.floor",
      isWall ? "#" : " ",
      isWall ? "tomb wall" : "tomb floor",
      ["candle", "terrain", isWall ? "wall" : "floor"],
    );
  }

  for (const candle of state.candles) {
    for (const [index, cell] of candle.bodyCells.entries()) {
      const tile = tileAt(cell.x, cell.y);
      const isCap = index === candle.bodyCells.length - 1;
      const candleId = candle.digit ?? "single";
      const segment = index === 0
        ? `tail_${candle.wickDir}`
        : `middle_${candle.axis}`;
      tile.objects = [
        visualLayer(
          isCap
            ? `candle.cap.${candleId}.${candle.wickDir}.${candle.lit ? "lit" : "unlit"}`
            : `candle.body.${candleId}.${segment}`,
          isCap
            ? candle.wickDir[0]![candle.lit ? "toUpperCase" : "toLowerCase"]()
            : (candle.digit ?? "?"),
          isCap ? `${candle.id} wick end` : `${candle.id} body`,
          [
            "candle",
            candle.id,
            isCap ? "wick_end" : "body",
            candle.axis,
            candle.lit ? "lit" : "unlit",
          ],
        ),
      ];
    }
  }

  for (const brazier of state.braziers) {
    tileAt(brazier.position.x, brazier.position.y).objects = [
      visualLayer(
        `candle.brazier.${brazier.lit ? "lit" : "unlit"}`,
        brazier.lit ? "O" : "o",
        brazier.lit ? "lit brazier" : "unlit brazier",
        ["brazier", brazier.lit ? "lit" : "unlit"],
      ),
    ];
  }

  for (const projection of wickProjections(state)) {
    if (!projection.inBounds || projection.concealed) {
      continue;
    }
    const tile = tileAt(projection.point.x, projection.point.y);
    tile.objects = [
      ...(tile.objects ?? []),
      visualLayer(
        `candle.wick.${projection.candle.wickDir}.${projection.candle.lit ? "lit" : "unlit"}`,
        projection.candle.lit ? "*" : "w",
        projection.candle.lit
          ? `${projection.candle.id} exposed flame`
          : `${projection.candle.id} exposed wick`,
        [
          "candle",
          projection.candle.id,
          "wick_projection",
          "exposed",
          projection.candle.lit ? "lit" : "unlit",
        ],
      ),
    ];
  }

  tileAt(state.player.x, state.player.y).actors = [
    visualLayer(
      state.dead ? "candle.player.dead" : "candle.player.alive",
      "@",
      state.dead ? "dead player" : "player",
      ["player", state.dead ? "dead" : "alive"],
    ),
  ];
  return visual;
}
