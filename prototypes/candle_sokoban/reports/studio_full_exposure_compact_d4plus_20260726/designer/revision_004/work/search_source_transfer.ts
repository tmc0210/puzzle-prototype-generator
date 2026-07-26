import { readFileSync } from "node:fs";
import YAML from "yaml";
import type { Direction, InputId, LevelDoc, MechanicDoc, Point } from "../../../../../../../src/core/types.js";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  stateKey,
  step,
  wickPoint,
  type CandleSokobanState,
} from "../../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const mechanic = YAML.parse(
  readFileSync("prototypes/candle_sokoban/mechanic.yml", "utf8"),
) as MechanicDoc;
const actions: InputId[] = ["up", "down", "left", "right"];
const width = 9;
const height = 7;
const maxDepth = 10;
const maxStates = 12000;

type Placement = { cells: Point[]; glyphs: string[] };
type Node = {
  state: CandleSokobanState;
  parent: number;
  action?: InputId;
  events: string[];
  depth: number;
};

let seed = 0x5eed004;
function random(): number {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000;
}
function pick<T>(items: readonly T[]): T {
  return items[Math.floor(random() * items.length)]!;
}
function add(point: Point, direction: Direction, amount = 1): Point {
  const vector = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  }[direction];
  return { x: point.x + vector.x * amount, y: point.y + vector.y * amount };
}
function opposite(direction: Direction): Direction {
  return { up: "down", down: "up", left: "right", right: "left" }[direction] as Direction;
}
function perpendiculars(direction: Direction): Direction[] {
  return direction === "up" || direction === "down" ? ["left", "right"] : ["up", "down"];
}
function inside(point: Point): boolean {
  return point.x > 0 && point.x < width - 1 && point.y > 0 && point.y < height - 1;
}
function key(point: Point): string {
  return `${point.x},${point.y}`;
}
function donorPlacement(cap: Point, direction: Direction): Placement {
  const tail = add(cap, opposite(direction));
  const capGlyph = { up: "u", down: "d", left: "l", right: "r" }[direction];
  return { cells: [tail, cap], glyphs: ["1", capGlyph] };
}
function singlePlacement(point: Point, direction: Direction, lit: boolean): Placement {
  const glyph = { up: "u", down: "d", left: "l", right: "r" }[direction];
  return { cells: [point], glyphs: [lit ? glyph.toUpperCase() : glyph] };
}
function render(
  placements: Placement[],
  player: Point,
  braziers: Point[],
  walls: Point[],
): string | null {
  const rows = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".")),
  );
  const occupied = new Set<string>();
  const put = (point: Point, glyph: string): boolean => {
    if (!inside(point) || occupied.has(key(point))) return false;
    occupied.add(key(point));
    rows[point.y]![point.x] = glyph;
    return true;
  };
  for (const wall of walls) if (!put(wall, "#")) return null;
  for (const brazier of braziers) if (!put(brazier, "o")) return null;
  for (const placement of placements) {
    for (let index = 0; index < placement.cells.length; index += 1) {
      if (!put(placement.cells[index]!, placement.glyphs[index]!)) return null;
    }
  }
  if (!put(player, "@")) return null;
  return rows.map((row) => row.join("")).join("\n");
}

function solve(layout: string): { nodes: Node[]; win: number } | null {
  let initial: CandleSokobanState;
  try {
    const level: LevelDoc = { id: "work", title: "work", global_burn_cycle: 5, layout };
    initial = parseLevel(level);
  } catch {
    return null;
  }
  const nodes: Node[] = [{ state: initial, parent: -1, events: [], depth: 0 }];
  const byKey = new Map<string, number>([[stateKey(initial), 0]]);
  for (let cursor = 0; cursor < nodes.length; cursor += 1) {
    const current = nodes[cursor]!;
    if (current.depth >= maxDepth || isCandleSearchTerminal(current.state)) continue;
    for (const action of actions) {
      const result = step(mechanic, current.state, action);
      if (!result.legal) continue;
      const nextKey = stateKey(result.state);
      let index = byKey.get(nextKey);
      if (index === undefined) {
        index = nodes.length;
        byKey.set(nextKey, index);
        nodes.push({
          state: result.state,
          parent: cursor,
          action,
          events: result.events,
          depth: current.depth + 1,
        });
        if (isWin(result.state)) return { nodes, win: index };
        if (nodes.length >= maxStates) return null;
      }
    }
  }
  return null;
}

function trace(result: { nodes: Node[]; win: number }): Node[] {
  const chain: Node[] = [];
  for (let index = result.win; index > 0; index = result.nodes[index]!.parent) chain.push(result.nodes[index]!);
  return chain.reverse();
}
function candleMoveIds(events: string[]): string[] {
  return events
    .filter((event) => event.startsWith("push_axis:") || event.startsWith("roll_candle:"))
    .map((event) => event.split(":")[1]!)
    .filter((value, index, values) => values.indexOf(value) === index);
}

let found = 0;
for (let attempt = 0; attempt < 120000 && found < 24; attempt += 1) {
  const donorDir = pick<Direction>(["up", "down", "left", "right"]);
  const receiverDir = pick<Direction>(["up", "down", "left", "right"]);
  const receiverBody = { x: 1 + Math.floor(random() * (width - 2)), y: 1 + Math.floor(random() * (height - 2)) };
  const receiverWick = add(receiverBody, receiverDir);
  const donorTargetCap = receiverWick;
  const donorTarget = donorPlacement(donorTargetCap, donorDir);
  const donorInitialShift = pick(perpendiculars(donorDir));
  const donorInitial = {
    cells: donorTarget.cells.map((cell) => add(cell, donorInitialShift)),
    glyphs: donorTarget.glyphs,
  };
  const source = add(donorTargetCap, donorDir);
  if (![...donorInitial.cells, ...donorTarget.cells, receiverBody, receiverWick, source].every(inside)) continue;
  const activatorDir = pick<Direction>(["up", "down", "left", "right"]);
  const activatorTargetBody = add(source, opposite(activatorDir));
  const activatorShift = pick(perpendiculars(activatorDir));
  const activatorBody = add(activatorTargetBody, activatorShift, 1 + Math.floor(random() * 3));
  const activator = singlePlacement(activatorBody, activatorDir, true);
  const receiverRollDir = pick(perpendiculars(receiverDir));
  const second = add(receiverWick, receiverRollDir, 2 + Math.floor(random() * 3));
  const player = random() < 0.75
    ? add(pick(donorInitial.cells), donorInitialShift)
    : add(activatorBody, activatorShift);
  if (![activatorTargetBody, activatorBody, second].every(inside)) continue;
  const walls = Array.from({ length: Math.floor(random() * 2) }, () => ({
    x: 1 + Math.floor(random() * (width - 2)),
    y: 1 + Math.floor(random() * (height - 2)),
  }));
  const layout = render(
    [donorInitial, singlePlacement(receiverBody, receiverDir, false), activator],
    player,
    [source, second],
    walls,
  );
  if (!layout) continue;
  const result = solve(layout);
  if (!result) continue;
  const path = trace(result);
  if (path.length < 6 || path.length > maxDepth) continue;
  const boundaryIndex = path.findIndex((node) => node.events.some((event) => event.startsWith("shrink_ignite:")));
  if (boundaryIndex < 3 || boundaryIndex > 5) continue;
  const boundary = path[boundaryIndex]!;
  if (candleMoveIds(boundary.events).length === 0) continue;
  const lightSteps = path.flatMap((node, index) =>
    node.events.filter((event) => event.startsWith("light_brazier:")).map(() => index + 1),
  );
  if (lightSteps.length < 2 || lightSteps[0] === lightSteps.at(-1) || lightSteps.at(-1)! < 6) continue;
  const beforeIds = new Set(path.slice(0, boundaryIndex + 1).flatMap((node) => candleMoveIds(node.events)));
  const afterIds = new Set(path.slice(boundaryIndex + 1).flatMap((node) => candleMoveIds(node.events)));
  if (beforeIds.size < 2 || afterIds.size < 1) continue;
  found += 1;
  console.log(`\n=== candidate ${found} attempt=${attempt} depth=${path.length} ===`);
  console.log(layout);
  console.log(path.map((node) => node.action).join(","));
  path.forEach((node, index) => console.log(`${index + 1} ${node.action}: ${node.events.join(" | ")}`));
}
console.log(`\nfound=${found}`);

const fixedLayouts = [
  `#########\n#..o....#\n#.R.....#\n#..o....#\n#.u.l...#\n#.1.....#\n#########`,
  `#########\n#.......#\n#.1r.D..#\n#...o.o.#\n#..u....#\n#.......#\n#########`,
  `#########\n#...o.D.#\n#...o...#\n#..r.u..#\n#....1..#\n#.......#\n#########`,
];
for (let baseIndex = 0; baseIndex < fixedLayouts.length; baseIndex += 1) {
  const rows = fixedLayouts[baseIndex]!.split("\n");
  console.log(`\n=== fixed family ${baseIndex + 1} player-start scan ===`);
  for (let y = 1; y < rows.length - 1; y += 1) {
    for (let x = 1; x < rows[0]!.length - 1; x += 1) {
      if (rows[y]![x] !== ".") continue;
      const withPlayer = rows.map((row, rowIndex) =>
        rowIndex === y ? `${row.slice(0, x)}@${row.slice(x + 1)}` : row,
      ).join("\n");
      const result = solve(withPlayer);
      if (!result) continue;
      const path = trace(result);
      if (path.length > 10) continue;
      const boundaryIndex = path.findIndex((node) => node.events.some((event) => event.startsWith("shrink_ignite:")));
      if (boundaryIndex !== 4 || candleMoveIds(path[4]!.events).length === 0) continue;
      const earlyMoves = path.slice(0, 5).flatMap((node) => candleMoveIds(node.events));
      if (new Set(earlyMoves).size < 2) continue;
      console.log(`start=${x},${y} depth=${path.length} inputs=${path.map((node) => node.action).join(",")}`);
      path.forEach((node, index) => console.log(`${index + 1} ${node.action}: ${node.events.join(" | ")}`));
    }
  }
}
