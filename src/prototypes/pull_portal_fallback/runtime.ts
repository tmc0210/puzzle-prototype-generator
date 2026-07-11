import type { InputId, KnowledgeDoc, LevelDoc, MechanicDoc, SolverOptions } from "../../core/types.js";
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
  type GameState,
} from "./mechanics.js";

const defaultInputs: InputId[] = ["up", "down", "left", "right"];

export function createPullPortalRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<GameState, InputId, SolverOptions> {
  return {
    defaultWin: mechanic.win,
    key: stateKey,
    actions: () => legalInputs(mechanic),
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
  const inputs = Object.entries(mechanic.inputs)
    .filter(([, input]) => input.intent === "move" && input.dir)
    .map(([, input]) => input.dir as InputId);
  return inputs.length > 0 ? inputs : defaultInputs;
}

const layers = [
  editorToolGroup("terrain", "Terrain", [
    tool("terrain", "floor", "地面", "floor", " "),
    tool("terrain", "wall", "墙", "wall", "#"),
  ]),
  editorToolGroup("target", "Target", [
    tool("target", "goal", "目标", "goal", "G"),
    tool("target", "clear", "清目标", undefined, " "),
  ], false),
  editorToolGroup("actor", "Actor", [
    tool("actor", "player", "玩家", "player", "@"),
    tool("actor", "clear", "清角色", undefined, " "),
  ]),
  editorToolGroup("object", "Object", [
    tool("object", "crate", "箱子", "crate", "C"),
    tool("object", "clear", "清物体", undefined, " "),
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    tool("mechanism", "portal_a", "传送门 A", "portal_a", "A"),
    tool("mechanism", "portal_b", "传送门 B", "portal_b", "B"),
    tool("mechanism", "portal_d", "传送门 D", "portal_d", "D"),
    tool("mechanism", "portal_e", "传送门 E", "portal_e", "E"),
    tool("mechanism", "portal_h", "传送门 H", "portal_h", "H"),
    tool("mechanism", "portal_i", "传送门 I", "portal_i", "I"),
    tool("mechanism", "clear", "清机制", undefined, " "),
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
    layout: normalizeAsciiLayout(`
#######
#@ C G#
#     #
#######
`),
  };
}

export const pullPortalAdapter: RuntimeAdapter<GameState, InputId, SolverOptions> = {
  id: "pull_portal_fallback",
  createRuntime: createPullPortalRuntime,
  parseLevel,
  renderState,
  step,
  replay,
  isWin,
  isEventWin,
  editor: {
    layers,
    defaultGlyph: " ",
    defaultSize: { width: 8, height: 6 },
    defaultLevel,
    normalizeAscii: (layout) => normalizeAsciiLayout(layout),
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
  });
}

function parseEditorGlyph(glyph: string): Partial<EditorCell> {
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

function serializeEditorBoardLayout(board: ReturnType<typeof parseEditorBoard>): string {
  return serializeEditorBoard(board, serializeEditorCell);
}

function serializeEditorCell(cell: EditorCell): string {
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

function renderEditorCell(cell: EditorCell): Omit<VisualTile, "x" | "y"> {
  return editorVisualForGlyph(serializeEditorCell(cell));
}
