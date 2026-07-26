import type { EditorBoard, EditorCell } from "../prototypes/runtimeAdapter.js";

export type EditorGridEdge = "top" | "bottom" | "left" | "right";
export type EditorGridResizeDelta = -1 | 1;

export function resizeEditorBoard(
  board: EditorBoard,
  edge: EditorGridEdge,
  delta: EditorGridResizeDelta,
): EditorBoard {
  const horizontal = edge === "left" || edge === "right";
  const nextWidth = Math.max(1, board.width + (horizontal ? delta : 0));
  const nextHeight = Math.max(1, board.height + (horizontal ? 0 : delta));
  if (nextWidth === board.width && nextHeight === board.height) {
    return board;
  }

  const shiftedX = edge === "left" ? delta : 0;
  const shiftedY = edge === "top" ? delta : 0;
  const cells: EditorCell[] = [];

  for (let y = 0; y < nextHeight; y += 1) {
    for (let x = 0; x < nextWidth; x += 1) {
      const sourceX = x - shiftedX;
      const sourceY = y - shiftedY;
      const sourceCell =
        sourceX >= 0 &&
        sourceX < board.width &&
        sourceY >= 0 &&
        sourceY < board.height
          ? board.cells[sourceY * board.width + sourceX]
          : undefined;
      cells.push(sourceCell ? { ...sourceCell } : { terrain: "floor" });
    }
  }

  return {
    width: nextWidth,
    height: nextHeight,
    cells,
  };
}
