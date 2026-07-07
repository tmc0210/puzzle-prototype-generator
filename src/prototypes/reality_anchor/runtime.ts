import type { InputId, KnowledgeDoc, LevelDoc, MechanicDoc, SolverOptions } from "../../core/types.js";
import type { PuzzleRuntime } from "../../core/puzzleRuntime.js";
import {
  editorBoardFromAscii,
  editorBoardToVisualBoard,
  editorTool,
  editorToolGroup,
  normalizeAsciiLayout,
  serializeEditorBoard,
  visualLayer,
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
  renderVisualState,
  renderState,
  replay,
  stateKey,
  step,
  type RealityAnchorState,
} from "./mechanics.js";

const defaultInputs: InputId[] = ["up", "down", "left", "right"];

export function createRealityAnchorRuntime(
  mechanic: MechanicDoc,
): PuzzleRuntime<RealityAnchorState, InputId, SolverOptions> {
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
    editorTool("terrain", "floor", "地面", "floor", renderEditorCell({ terrain: "floor" })),
    editorTool("terrain", "wall", "墙", "wall", renderEditorCell({ terrain: "wall" })),
  ]),
  editorToolGroup("target", "Target", [
    editorTool("target", "goal", "目标", "goal", renderEditorCell({ terrain: "floor", target: "goal" })),
    editorTool("target", "clear", "清目标", undefined, renderEditorCell({ terrain: "floor" })),
  ], false),
  editorToolGroup("actor", "Actor", [
    editorTool("actor", "player", "玩家", "player", renderEditorCell({ terrain: "floor", actor: "player" })),
    editorTool("actor", "clear", "清角色", undefined, renderEditorCell({ terrain: "floor" })),
  ]),
  editorToolGroup("object", "Object", [
    editorTool("object", "crate", "箱子", "crate", renderEditorCell({ terrain: "floor", object: "crate" })),
    editorTool("object", "sticky", "黏块", "sticky", renderEditorCell({ terrain: "floor", object: "sticky" })),
    editorTool("object", "clear", "清物体", undefined, renderEditorCell({ terrain: "floor" })),
  ]),
  editorToolGroup("mechanism", "Mechanism", [
    editorTool("mechanism", "push_anchor", "Push 锚", "push_anchor", renderEditorCell({ terrain: "floor", mechanism: "push_anchor" })),
    editorTool("mechanism", "pull_anchor", "Pull 锚", "pull_anchor", renderEditorCell({ terrain: "floor", mechanism: "pull_anchor" })),
    editorTool("mechanism", "box_anchor", "Box 锚", "box_anchor", renderEditorCell({ terrain: "floor", mechanism: "box_anchor" })),
    editorTool("mechanism", "sticky_anchor", "Sticky 锚", "sticky_anchor", renderEditorCell({ terrain: "floor", mechanism: "sticky_anchor" })),
    editorTool("mechanism", "clear", "清机制", undefined, renderEditorCell({ terrain: "floor" })),
  ]),
] satisfies EditorToolGroup[];

function defaultTarget(knowledge: KnowledgeDoc): string {
  return knowledge.knowledge[0]?.id ?? "solvable";
}

function defaultLevel(_mechanic: MechanicDoc, knowledge: KnowledgeDoc): LevelDoc {
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
    layout: normalizeAsciiLayout(`
#######
#@ C G#
#     #
#######
`),
  };
}

export const realityAnchorAdapter: RuntimeAdapter<RealityAnchorState, InputId, SolverOptions> = {
  id: "reality_anchor",
  createRuntime: createRealityAnchorRuntime,
  parseLevel,
  renderState,
  renderVisualState,
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

function serializeEditorBoardLayout(board: ReturnType<typeof parseEditorBoard>): string {
  return serializeEditorBoard(board, serializeEditorCell);
}

function serializeEditorCell(cell: EditorCell): string {
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

function renderEditorCell(cell: EditorCell): Omit<VisualTile, "x" | "y"> {
  const tile: Omit<VisualTile, "x" | "y"> = {
    terrain: cell.terrain === "wall"
      ? visualLayer("ra.terrain.wall.box_side", "#", "wall")
      : visualLayer("ra.terrain.floor.box_side", " ", "floor"),
  };
  if (cell.target === "goal" && cell.terrain !== "wall") {
    tile.target = visualLayer("target.goal", "G", "goal");
  }
  if (cell.object === "crate") {
    tile.objects = [...(tile.objects ?? []), visualLayer("ra.crate.box_side", "C", "crate")];
  }
  if (cell.object === "sticky") {
    tile.objects = [...(tile.objects ?? []), visualLayer("ra.sticky.sticky_side", "M", "sticky block")];
  }
  if (cell.mechanism === "push_anchor") {
    tile.objects = [visualLayer("ra.anchor.push_end", "P", "push anchor")];
  }
  if (cell.mechanism === "pull_anchor") {
    tile.objects = [visualLayer("ra.anchor.pull_end", "L", "pull anchor")];
  }
  if (cell.mechanism === "box_anchor") {
    tile.objects = [visualLayer("ra.anchor.box_end", "B", "box anchor")];
  }
  if (cell.mechanism === "sticky_anchor") {
    tile.objects = [visualLayer("ra.anchor.sticky_end", "S", "sticky anchor")];
  }
  if (cell.actor === "player") {
    tile.actors = [visualLayer("ra.player.push_side", "@", "player")];
  }
  return tile;
}
