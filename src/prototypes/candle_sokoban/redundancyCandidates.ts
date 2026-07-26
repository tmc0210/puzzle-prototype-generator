import { parseLevel, pointKey, type CandleSokobanState } from "./mechanics.js";

export type RedundancyCell = { x: number; y: number };

export type CandleRedundancyCandidate = {
  id: string;
  kind:
    | "whole_candle"
    | "single_brazier"
    | "vacated_object_floor_region"
    | "detached_empty_region"
    | "single_entry_floor_region"
    | "outer_outline_band";
  cells: RedundancyCell[];
  operations: Array<"remove" | "wallify" | "trim">;
};

export type CandleRedundancyCandidateReport = {
  schemaVersion: 1;
  method: "candle_redundancy_units_v2";
  levelId: string;
  width: number;
  height: number;
  player: RedundancyCell;
  candidates: CandleRedundancyCandidate[];
  counts: Record<CandleRedundancyCandidate["kind"], number>;
};

export type CandleRedundancyDiscoveryOptions = {
  vacatedObjectRegions?: Array<{
    id: string;
    cells: RedundancyCell[];
  }>;
};

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
] as const;

export function discoverCandleRedundancyCandidates(
  layout: string,
  levelId = "CANDLE_REDUNDANCY_CHECK",
  options: CandleRedundancyDiscoveryOptions = {},
): CandleRedundancyCandidateReport {
  const lines = normalizeLines(layout, levelId);
  const state = parseLevel({
    id: levelId,
    title: levelId,
    layout: lines.join("\n"),
    global_burn_cycle: 5,
  });

  const candidates = [
    ...wholeCandleCandidates(state),
    ...singleBrazierCandidates(state),
    ...vacatedObjectFloorRegions(lines, options.vacatedObjectRegions ?? []),
    ...detachedEmptyRegions(lines, state.player),
    ...singleEntryFloorRegions(lines, state.player),
    ...outerOutlineBands(lines),
  ];

  candidates.sort(compareCandidates);
  const counts: CandleRedundancyCandidateReport["counts"] = {
    whole_candle: 0,
    single_brazier: 0,
    vacated_object_floor_region: 0,
    detached_empty_region: 0,
    single_entry_floor_region: 0,
    outer_outline_band: 0,
  };
  for (const candidate of candidates) counts[candidate.kind] += 1;

  return {
    schemaVersion: 1,
    method: "candle_redundancy_units_v2",
    levelId,
    width: state.width,
    height: state.height,
    player: { ...state.player },
    candidates,
    counts,
  };
}

function wholeCandleCandidates(state: CandleSokobanState): CandleRedundancyCandidate[] {
  return state.candles.map((candle) => ({
    id: `whole_candle:${candle.id}`,
    kind: "whole_candle",
    cells: sortCells(candle.bodyCells.map((cell) => ({ ...cell }))),
    operations: ["remove"],
  }));
}

function singleBrazierCandidates(state: CandleSokobanState): CandleRedundancyCandidate[] {
  return state.braziers.map((brazier) => ({
    id: `single_brazier:${pointKey(brazier.position)}`,
    kind: "single_brazier",
    cells: [{ ...brazier.position }],
    operations: ["remove"],
  }));
}

function vacatedObjectFloorRegions(
  lines: string[],
  regions: NonNullable<CandleRedundancyDiscoveryOptions["vacatedObjectRegions"]>,
): CandleRedundancyCandidate[] {
  return regions.map((region) => {
    const cells = sortCells(region.cells.map((cell) => ({ ...cell })));
    if (cells.length === 0) throw new Error(`腾空对象区域 ${region.id} 不能为空`);
    for (const { x, y } of cells) {
      if (!isOrdinaryFloor(lines[y]?.[x] ?? "#")) {
        throw new Error(`腾空对象区域 ${region.id} 的 (${x},${y}) 不是普通空地`);
      }
    }
    return {
      id: `vacated_object_floor_region:${region.id}:${cellListId(cells)}`,
      kind: "vacated_object_floor_region" as const,
      cells,
      operations: ["wallify" as const],
    };
  });
}

function detachedEmptyRegions(
  lines: string[],
  player: RedundancyCell,
): CandleRedundancyCandidate[] {
  const floorKeys = ordinaryFloorKeys(lines);
  const playerReachable = floodWalkableFloor(lines, player);
  const detachedKeys = new Set([...floorKeys].filter((key) => !playerReachable.has(key)));
  const components = connectedComponents(detachedKeys);
  return components.map((cells, index) => ({
    id: `detached_empty_region:${index + 1}:${cellListId(cells)}`,
    kind: "detached_empty_region",
    cells,
    operations: ["wallify"],
  }));
}

function singleEntryFloorRegions(
  lines: string[],
  player: RedundancyCell,
): CandleRedundancyCandidate[] {
  const walkableKeys = floodWalkableFloor(lines, player);
  const playerKey = pointKey(player);
  const discovery = new Map<string, number>();
  const low = new Map<string, number>();
  const bridgeSides: Set<string>[] = [];
  let clock = 0;

  const visit = (key: string, parentKey: string | null): Set<string> => {
    clock += 1;
    discovery.set(key, clock);
    low.set(key, clock);
    const keys = new Set<string>([key]);

    for (const neighbor of neighborKeys(key)) {
      if (!walkableKeys.has(neighbor)) continue;
      if (!discovery.has(neighbor)) {
        const childKeys = visit(neighbor, key);
        for (const childKey of childKeys) keys.add(childKey);
        low.set(key, Math.min(low.get(key)!, low.get(neighbor)!));
        if (low.get(neighbor)! > discovery.get(key)!) {
          bridgeSides.push(childKeys);
        }
      } else if (neighbor !== parentKey) {
        low.set(key, Math.min(low.get(key)!, discovery.get(neighbor)!));
      }
    }
    return keys;
  };

  visit(playerKey, null);
  const ordinary = ordinaryFloorKeys(lines);
  const sides = bridgeSides
    .map((side) => new Set([...side].filter((key) => ordinary.has(key))))
    .filter((side) => side.size > 0);
  const uniqueSides = deduplicateCellSets(sides);
  const terminalSides = uniqueSides.filter((side, index) =>
    !uniqueSides.some((other, otherIndex) =>
      otherIndex !== index && other.size < side.size && isSubset(other, side),
    ),
  );
  const leafBranches = terminalSides.map((terminal) => {
    let branch = terminal;
    while (true) {
      const parent = uniqueSides
        .filter((side) => side.size > branch.size && isSubset(branch, side))
        .sort((left, right) => left.size - right.size)[0];
      if (!parent) break;
      const added = [...parent].filter((key) => !branch.has(key));
      if (added.length !== 1) break;
      const addedDegree = neighborKeys(added[0]!).filter((key) => walkableKeys.has(key)).length;
      if (addedDegree > 2) break;
      branch = parent;
    }
    return branch;
  });

  return deduplicateCellSets(leafBranches).map((keys, index) => {
    const cells = sortCells([...keys].map(parsePointKey));
    return {
      id: `single_entry_floor_region:${index + 1}:${cellListId(cells)}`,
      kind: "single_entry_floor_region",
      cells,
      operations: ["wallify"],
    };
  });
}

function outerOutlineBands(lines: string[]): CandleRedundancyCandidate[] {
  const height = lines.length;
  const width = lines[0]!.length;
  const candidates: CandleRedundancyCandidate[] = [];

  const rowIsWall = (y: number) => [...lines[y]!].every((glyph) => glyph === "#");
  const colIsWall = (x: number) => lines.every((line) => line[x] === "#");
  const bandHasNoEntity = (cells: RedundancyCell[]) =>
    cells.every(({ x, y }) => isOrdinaryFloor(lines[y]![x]!) || lines[y]![x] === "#");

  let topDepth = 0;
  for (let boundary = 1; boundary < height; boundary += 1) {
    const cells = rowBandCells(width, 0, boundary);
    if (rowIsWall(boundary) && bandHasNoEntity(cells)) topDepth = boundary;
  }
  if (topDepth > 0) candidates.push(outlineCandidate("top", rowBandCells(width, 0, topDepth)));

  let bottomDepth = 0;
  for (let boundary = height - 2; boundary >= 0; boundary -= 1) {
    const depth = height - boundary - 1;
    const cells = rowBandCells(width, boundary + 1, depth);
    if (rowIsWall(boundary) && bandHasNoEntity(cells)) bottomDepth = depth;
  }
  if (bottomDepth > 0) {
    candidates.push(outlineCandidate(
      "bottom",
      rowBandCells(width, height - bottomDepth, bottomDepth),
    ));
  }

  let leftDepth = 0;
  for (let boundary = 1; boundary < width; boundary += 1) {
    const cells = colBandCells(height, 0, boundary);
    if (colIsWall(boundary) && bandHasNoEntity(cells)) leftDepth = boundary;
  }
  if (leftDepth > 0) candidates.push(outlineCandidate("left", colBandCells(height, 0, leftDepth)));

  let rightDepth = 0;
  for (let boundary = width - 2; boundary >= 0; boundary -= 1) {
    const depth = width - boundary - 1;
    const cells = colBandCells(height, boundary + 1, depth);
    if (colIsWall(boundary) && bandHasNoEntity(cells)) rightDepth = depth;
  }
  if (rightDepth > 0) {
    candidates.push(outlineCandidate(
      "right",
      colBandCells(height, width - rightDepth, rightDepth),
    ));
  }

  return candidates;
}

function rowBandCells(width: number, startY: number, depth: number): RedundancyCell[] {
  const cells: RedundancyCell[] = [];
  for (let y = startY; y < startY + depth; y += 1) {
    for (let x = 0; x < width; x += 1) cells.push({ x, y });
  }
  return cells;
}

function colBandCells(height: number, startX: number, depth: number): RedundancyCell[] {
  const cells: RedundancyCell[] = [];
  for (let x = startX; x < startX + depth; x += 1) {
    for (let y = 0; y < height; y += 1) cells.push({ x, y });
  }
  return cells;
}

function outlineCandidate(
  side: "top" | "bottom" | "left" | "right",
  rawCells: RedundancyCell[],
): CandleRedundancyCandidate {
  const cells = sortCells(rawCells);
  const first = cells[0]!;
  return {
    id: `outer_outline_band:${side}:${first.x},${first.y}:${cells.length}`,
    kind: "outer_outline_band",
    cells,
    operations: ["trim"],
  };
}

function ordinaryFloorKeys(lines: string[]): Set<string> {
  const keys = new Set<string>();
  for (let y = 0; y < lines.length; y += 1) {
    for (let x = 0; x < lines[y]!.length; x += 1) {
      if (isOrdinaryFloor(lines[y]![x]!)) keys.add(`${x},${y}`);
    }
  }
  return keys;
}

function floodWalkableFloor(lines: string[], start: RedundancyCell): Set<string> {
  const visited = new Set<string>();
  const queue = [{ ...start }];
  while (queue.length > 0) {
    const cell = queue.shift()!;
    const key = pointKey(cell);
    if (visited.has(key)) continue;
    const glyph = lines[cell.y]?.[cell.x];
    if (glyph === undefined || (!isOrdinaryFloor(glyph) && glyph !== "@")) continue;
    visited.add(key);
    for (const direction of directions) {
      queue.push({ x: cell.x + direction.x, y: cell.y + direction.y });
    }
  }
  return visited;
}

function connectedComponents(keys: Set<string>): RedundancyCell[][] {
  const remaining = new Set(keys);
  const components: RedundancyCell[][] = [];
  while (remaining.size > 0) {
    const first = remaining.values().next().value as string;
    const queue = [first];
    const cells: RedundancyCell[] = [];
    remaining.delete(first);
    while (queue.length > 0) {
      const key = queue.shift()!;
      cells.push(parsePointKey(key));
      for (const neighbor of neighborKeys(key)) {
        if (!remaining.delete(neighbor)) continue;
        queue.push(neighbor);
      }
    }
    components.push(sortCells(cells));
  }
  return components.sort((a, b) => compareCells(a[0]!, b[0]!));
}

function deduplicateCellSets(sets: Set<string>[]): Set<string>[] {
  const seen = new Set<string>();
  const result: Set<string>[] = [];
  for (const set of sets) {
    const signature = [...set].sort().join("|");
    if (seen.has(signature)) continue;
    seen.add(signature);
    result.push(set);
  }
  return result;
}

function isSubset(left: Set<string>, right: Set<string>): boolean {
  for (const key of left) if (!right.has(key)) return false;
  return true;
}

function neighborKeys(key: string): string[] {
  const point = parsePointKey(key);
  return directions.map(({ x, y }) => `${point.x + x},${point.y + y}`);
}

function parsePointKey(key: string): RedundancyCell {
  const [x, y] = key.split(",").map(Number);
  return { x: x!, y: y! };
}

function normalizeLines(layout: string, levelId: string): string[] {
  const lines = layout.replace(/\r/g, "").split("\n");
  while (lines.length > 0 && lines[0]!.trim() === "") lines.shift();
  while (lines.length > 0 && lines.at(-1)!.trim() === "") lines.pop();
  if (lines.length === 0) throw new Error(`Level ${levelId} has empty layout`);
  const width = lines[0]!.length;
  if (lines.some((line) => line.length !== width)) {
    throw new Error(`Level ${levelId} must be rectangular`);
  }
  return lines;
}

function isOrdinaryFloor(glyph: string): boolean {
  return glyph === "." || glyph === " ";
}

function sortCells(cells: RedundancyCell[]): RedundancyCell[] {
  return cells.sort(compareCells);
}

function compareCells(left: RedundancyCell, right: RedundancyCell): number {
  return left.y - right.y || left.x - right.x;
}

function compareCandidates(
  left: CandleRedundancyCandidate,
  right: CandleRedundancyCandidate,
): number {
  const order: Record<CandleRedundancyCandidate["kind"], number> = {
    whole_candle: 0,
    single_brazier: 1,
    vacated_object_floor_region: 2,
    detached_empty_region: 3,
    single_entry_floor_region: 4,
    outer_outline_band: 5,
  };
  return order[left.kind] - order[right.kind]
    || compareCells(left.cells[0]!, right.cells[0]!);
}

function cellListId(cells: RedundancyCell[]): string {
  const first = cells[0]!;
  return `${first.x},${first.y}:${cells.length}`;
}
