import assert from "node:assert/strict";
import type { EditorBoard, EditorCell } from "../runtimeAdapter.js";
import {
  paintDraggedCandle,
  type CandleDragPoint,
} from "./editorPaint.js";

const horizontal = paintDraggedCandle(
  board(5, 3),
  point(1, 1),
  point(4, 1),
  "unlit",
);
assert.deepEqual(
  horizontal?.board.cells.map(glyph),
  [
    ".", ".", ".", ".", ".",
    ".", "1", "1", "1", "r",
    ".", ".", ".", ".", ".",
  ],
);

const reverseLit = paintDraggedCandle(
  board(5, 3),
  point(3, 1),
  point(0, 1),
  "lit",
);
assert.deepEqual(
  reverseLit?.board.cells.map(glyph),
  [
    ".", ".", ".", ".", ".",
    "L", "1", "1", "1", ".",
    ".", ".", ".", ".", ".",
  ],
);

const vertical = paintDraggedCandle(
  board(3, 5),
  point(1, 3),
  point(1, 0),
  "unlit",
);
assert.deepEqual(
  vertical?.board.cells.map(glyph),
  [
    ".", "u", ".",
    ".", "1", ".",
    ".", "1", ".",
    ".", "1", ".",
    ".", ".", ".",
  ],
);

const singleton = paintDraggedCandle(
  board(2, 2),
  point(0, 0),
  point(0, 0),
  "lit",
);
assert.equal(singleton?.board.cells[0]?.mechanism, "cap_R");

const occupied = board(4, 1);
occupied.cells[0]!.mechanism = "body_1";
const nextDigit = paintDraggedCandle(
  occupied,
  point(1, 0),
  point(3, 0),
  "unlit",
);
assert.deepEqual(nextDigit?.board.cells.map(glyph), ["1", "2", "2", "r"]);

const lockedHorizontal = paintDraggedCandle(
  board(4, 4),
  point(0, 2),
  point(3, 0),
  "unlit",
  "horizontal",
);
assert.deepEqual(lockedHorizontal?.cells, [
  point(0, 2),
  point(1, 2),
  point(2, 2),
  point(3, 2),
]);

function board(width: number, height: number): EditorBoard {
  return {
    width,
    height,
    cells: Array.from({ length: width * height }, (): EditorCell => ({
      terrain: "floor",
    })),
  };
}

function point(x: number, y: number): CandleDragPoint {
  return { x, y };
}

function glyph(cell: EditorCell): string {
  if (cell.mechanism?.startsWith("body_")) {
    return cell.mechanism.slice(-1);
  }
  if (cell.mechanism?.startsWith("cap_")) {
    return cell.mechanism.slice(-1);
  }
  return ".";
}
