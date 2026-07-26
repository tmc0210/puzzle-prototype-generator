import type {
  EditorBoard,
  EditorCell,
  EditorToolItem,
} from "../runtimeAdapter.js";

export type CandleDragKind = "unlit" | "lit";
export type CandleDragAxis = "horizontal" | "vertical";

export type CandleDragPoint = {
  x: number;
  y: number;
};

export type CandleDragPaintResult = {
  board: EditorBoard;
  axis?: CandleDragAxis;
  cells: CandleDragPoint[];
};

export function candleDragKind(tool: EditorToolItem): CandleDragKind | undefined {
  if (tool.layer !== "mechanism") {
    return undefined;
  }
  if (tool.id === "drag_unlit") {
    return "unlit";
  }
  if (tool.id === "drag_lit") {
    return "lit";
  }
  return undefined;
}

export function paintDraggedCandle(
  baseBoard: EditorBoard,
  start: CandleDragPoint,
  cursor: CandleDragPoint,
  kind: CandleDragKind,
  lockedAxis?: CandleDragAxis,
): CandleDragPaintResult | undefined {
  if (!isInBounds(baseBoard, start) || !isInBounds(baseBoard, cursor)) {
    return undefined;
  }

  const axis = lockedAxis ?? inferAxis(start, cursor);
  const end = projectToAxis(start, cursor, axis);
  const cells = pointsBetween(start, end);
  const board = cloneBoard(baseBoard);

  if (cells.length === 1) {
    paintMechanism(board, cells[0]!, `cap_${kind === "lit" ? "R" : "r"}`);
    return { board, axis, cells };
  }

  const digit = nextAvailableDigit(baseBoard);
  if (!digit) {
    return undefined;
  }

  const capGlyph = capForDirection(start, end, kind);
  for (const bodyCell of cells.slice(0, -1)) {
    paintMechanism(board, bodyCell, `body_${digit}`);
  }
  paintMechanism(board, cells.at(-1)!, `cap_${capGlyph}`);

  return { board, axis, cells };
}

function inferAxis(
  start: CandleDragPoint,
  cursor: CandleDragPoint,
): CandleDragAxis | undefined {
  const deltaX = Math.abs(cursor.x - start.x);
  const deltaY = Math.abs(cursor.y - start.y);
  if (deltaX === 0 && deltaY === 0) {
    return undefined;
  }
  return deltaX >= deltaY ? "horizontal" : "vertical";
}

function projectToAxis(
  start: CandleDragPoint,
  cursor: CandleDragPoint,
  axis: CandleDragAxis | undefined,
): CandleDragPoint {
  if (axis === "horizontal") {
    return { x: cursor.x, y: start.y };
  }
  if (axis === "vertical") {
    return { x: start.x, y: cursor.y };
  }
  return { ...start };
}

function pointsBetween(
  start: CandleDragPoint,
  end: CandleDragPoint,
): CandleDragPoint[] {
  const deltaX = Math.sign(end.x - start.x);
  const deltaY = Math.sign(end.y - start.y);
  const distance = Math.max(
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y),
  );

  return Array.from({ length: distance + 1 }, (_, index) => ({
    x: start.x + deltaX * index,
    y: start.y + deltaY * index,
  }));
}

function capForDirection(
  start: CandleDragPoint,
  end: CandleDragPoint,
  kind: CandleDragKind,
): string {
  const glyph = end.x > start.x
    ? "r"
    : end.x < start.x
      ? "l"
      : end.y > start.y
        ? "d"
        : "u";
  return kind === "lit" ? glyph.toUpperCase() : glyph;
}

function nextAvailableDigit(board: EditorBoard): string | undefined {
  const used = new Set(
    board.cells
      .map((cell) => cell.mechanism?.match(/^body_([1-9])$/)?.[1])
      .filter((digit): digit is string => digit !== undefined),
  );
  return Array.from({ length: 9 }, (_, index) => String(index + 1))
    .find((digit) => !used.has(digit));
}

function paintMechanism(
  board: EditorBoard,
  point: CandleDragPoint,
  mechanism: string,
): void {
  const cell = board.cells[point.y * board.width + point.x];
  if (!cell) {
    return;
  }
  cell.terrain = "floor";
  cell.mechanism = mechanism;
  delete cell.target;
  delete cell.actor;
  delete cell.object;
}

function cloneBoard(board: EditorBoard): EditorBoard {
  return {
    width: board.width,
    height: board.height,
    cells: board.cells.map(cloneCell),
  };
}

function cloneCell(cell: EditorCell): EditorCell {
  return { ...cell };
}

function isInBounds(board: EditorBoard, point: CandleDragPoint): boolean {
  return point.x >= 0
    && point.y >= 0
    && point.x < board.width
    && point.y < board.height;
}
