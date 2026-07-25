import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const base = [
  "###############",
  "#..#@.....o...#",
  "#...#1....O...#",
  "#..#.D..#22R..#",
  "#..#..#.......#",
  "#...O#........#",
  "#.............#",
  "###############",
];

type Node = {
  state: CandleSokobanState;
  inputs: CandleAction[];
  events: string[];
  depth: number;
  flags: string[];
};

function occupied(layout: string[]): Set<string> {
  const out = new Set<string>();
  layout.forEach((row, y) => [...row].forEach((glyph, x) => {
    if (glyph !== ".") out.add(`${x},${y}`);
  }));
  return out;
}

function withGoal(x: number, y: number): string {
  const layout = base.map((row) => [...row]);
  layout[y]![x] = "o";
  return layout.map((row) => row.join("")).join("\n");
}

function has(events: string[], pattern: string): boolean {
  return events.some((event) => event === pattern || event.startsWith(pattern));
}

function flagsFor(events: string[], previous: string[]): string[] {
  const flags = new Set(previous);
  if (has(events, "extinguish_by_wall:candle#1")) flags.add("douse1");
  if (has(events, "ignite_midcycle:candle#1:t1")) flags.add("t1_1");
  if (has(events, "ignite_midcycle:candle#1:t2")) flags.add("t2_1");
  if (has(events, "ignite_midcycle:candle#2:t2")) flags.add("t2_2");
  if (has(events, "extinguish_by_wall:candle#2")) flags.add("douse2");
  return [...flags].sort();
}

function search(layout: string, goal: string): Node | undefined {
  const level: LevelDoc = {
    id: "search_variant",
    title: "search_variant",
    global_burn_cycle: 5,
    layout,
    win: { type: "all_braziers_lit" },
  };
  let initial: CandleSokobanState;
  try { initial = parseLevel(level); } catch { return undefined; }
  const queue: Node[] = [{ state: initial, inputs: [], events: [], depth: 0, flags: [] }];
  const visited = new Set<string>([`${stateKey(initial)}|`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, level.win) && current.flags.includes("t1_1") && (current.flags.includes("t2_1") || current.flags.includes("t2_2")) && current.flags.includes("douse1")) {
      return current;
    }
    if (current.depth >= 35) continue;
    for (const action of actions) {
      const result = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!result.legal) continue;
      const nextFlags = flagsFor(result.events, current.flags);
      const next: Node = {
        state: result.state,
        inputs: [...current.inputs, action],
        events: [...current.events, ...result.events],
        depth: current.depth + 1,
        flags: nextFlags,
      };
      const key = `${stateKey(result.state)}|${nextFlags.join(",")}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push(next);
    }
  }
  return undefined;
}

const occupiedBase = occupied(base);
for (let y = 1; y < base.length - 1; y += 1) {
  for (let x = 1; x < base[0]!.length - 1; x += 1) {
    const key = `${x},${y}`;
    if (occupiedBase.has(key)) continue;
    const layout = withGoal(x, y);
    const hit = search(layout, key);
    if (hit) {
      console.log(JSON.stringify({ goal: key, inputs: hit.inputs, flags: hit.flags, events: hit.events, final: renderState(hit.state), layout }, null, 2));
      process.exit(0);
    }
  }
}
console.log("NO_HIT");
