import type { KnowledgeDoc, LevelDoc, MechanicDoc } from "../../core/types.js";
import type { PuzzleRuntime } from "../../core/puzzleRuntime.js";
import {
  editorBoardFromAscii,
  editorTool,
  editorToolGroup,
  editorVisualForGlyph,
  normalizeAsciiLayout,
  serializeEditorBoard,
  validateLevelByParsing,
  type EditorCell,
  type EditorToolGroup,
  type RuntimeAdapter,
  type VisualTile,
} from "../runtimeAdapter.js";
import {
  isEventWin,
  isWin,
  parseLevel,
  renderState,
  replay,
  stateKey,
  step,
  type IceSlideAction,
  type IceSlideState,
  type IceSlideStepOptions,
} from "./mechanics.js";

const defaultActions: IceSlideAction[] = ["up", "down", "left", "right"];

export function createIceSlideRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<IceSlideState, IceSlideAction, IceSlideStepOptions> {
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
        reason: result.reason,
      };
    },
    isWin,
  };
}

function legalActions(mechanic: MechanicDoc): IceSlideAction[] {
  const actions = Object.entries(mechanic.inputs)
    .filter(([, input]) => input.intent === "move" && input.dir)
    .map(([, input]) => input.dir as IceSlideAction);
  return actions.length > 0 ? actions : defaultActions;
}

const layers = [
  editorToolGroup("terrain", "Terrain", [
    tool("terrain", "floor", "地面", "floor", "."),
    tool("terrain", "wall", "墙", "wall", "#"),
  ]),
  editorToolGroup("target", "Target", [
    tool("target", "goal", "目标", "goal", "G"),
    tool("target", "clear", "清目标", undefined, "."),
  ], false),
  editorToolGroup("actor", "Actor", [
    tool("actor", "player", "玩家", "player", "@"),
    tool("actor", "clear", "清角色", undefined, "."),
  ]),
  editorToolGroup("object", "Object", [
    tool("object", "ice", "冰块", "ice", "I"),
    tool("object", "clear", "清物体", undefined, "."),
  ]),
] satisfies EditorToolGroup[];

function tool(
  layerId: EditorCellToolLayer,
  id: string,
  label: string,
  value: string | undefined,
  glyph: string,
) {
  return editorTool(layerId, id, label, value, editorVisualForGlyph(glyph));
}

type EditorCellToolLayer = Parameters<typeof editorTool>[0];

function defaultLevel(_mechanic: MechanicDoc, _knowledge: KnowledgeDoc): LevelDoc {
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
      { rectangular: true, fill: "." },
    ),
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: [0, 0],
      player_goal: [3, 0],
    },
  };
}

export const iceSlideAdapter: RuntimeAdapter<
  IceSlideState,
  IceSlideAction,
  IceSlideStepOptions
> = {
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

function serializeEditorBoardLayout(board: ReturnType<typeof parseEditorBoard>): string {
  return serializeEditorBoard(board, serializeEditorCell);
}

function serializeEditorCell(cell: EditorCell): string {
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

function renderEditorCell(cell: EditorCell): Omit<VisualTile, "x" | "y"> {
  return editorVisualForGlyph(serializeEditorCell(cell));
}
