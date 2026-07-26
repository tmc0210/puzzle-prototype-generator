import assert from "node:assert/strict";
import type { EditorBoard, EditorCell } from "../prototypes/runtimeAdapter.js";
import { resizeEditorBoard } from "./editorGridResize.js";

const original = board([
  ["a", "b", "c"],
  ["d", "e", "f"],
]);

assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "top", 1)),
  [
    ["floor", "floor", "floor"],
    ["a", "b", "c"],
    ["d", "e", "f"],
  ],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "bottom", 1)),
  [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["floor", "floor", "floor"],
  ],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "top", -1)),
  [["d", "e", "f"]],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "bottom", -1)),
  [["a", "b", "c"]],
);

assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "left", 1)),
  [
    ["floor", "a", "b", "c"],
    ["floor", "d", "e", "f"],
  ],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "right", 1)),
  [
    ["a", "b", "c", "floor"],
    ["d", "e", "f", "floor"],
  ],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "left", -1)),
  [
    ["b", "c"],
    ["e", "f"],
  ],
);
assert.deepEqual(
  terrainRows(resizeEditorBoard(original, "right", -1)),
  [
    ["a", "b"],
    ["d", "e"],
  ],
);

const single = board([["only"]]);
assert.strictEqual(resizeEditorBoard(single, "top", -1), single);
assert.strictEqual(resizeEditorBoard(single, "left", -1), single);

function board(rows: string[][]): EditorBoard {
  return {
    width: rows[0]?.length ?? 0,
    height: rows.length,
    cells: rows.flatMap((row) => row.map((terrain): EditorCell => ({ terrain }))),
  };
}

function terrainRows(value: EditorBoard): string[][] {
  return Array.from({ length: value.height }, (_, y) =>
    value.cells
      .slice(y * value.width, (y + 1) * value.width)
      .map((cell) => cell.terrain),
  );
}
