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
const W = 15;
const H = 9;

type Node = { state: CandleSokobanState; inputs: CandleAction[]; events: string[]; flags: number; depth: number };
const D1 = 1 << 0;
const T1 = 1 << 1;
const D2 = 1 << 2;
const T2 = 1 << 3;
const SIM = 1 << 4;

let seed = 0x5eed2026;
function rand(): number { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 0x100000000; }
function pick<T>(items: T[]): T { return items[Math.floor(rand() * items.length)]!; }
function key(x: number, y: number): string { return `${x},${y}`; }

function makeLayout(): { layout: string; goals: string[] } | undefined {
  const board = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) =>
    x === 0 || y === 0 || x === W - 1 || y === H - 1 ? "#" : "."));
  const occupied = new Set<string>();
  const place = (x: number, y: number, glyph: string): boolean => {
    const k = key(x, y);
    if (board[y]![x] !== "." || occupied.has(k)) return false;
    board[y]![x] = glyph; occupied.add(k); return true;
  };
  const wallCount = 7 + Math.floor(rand() * 10);
  for (let i = 0; i < wallCount; i += 1) {
    const x = 2 + Math.floor(rand() * (W - 4));
    const y = 2 + Math.floor(rand() * (H - 4));
    if (board[y]![x] === ".") board[y]![x] = "#";
  }
  const c1 = pick([[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2]] as Array<[number,number]>);
  if (!place(c1[0], c1[1], "1") || !place(c1[0], c1[1] + 1, "D")) return undefined;
  const c2 = pick([[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5]] as Array<[number,number]>);
  if (!place(c2[0], c2[1], "2") || !place(c2[0] + 1, c2[1], "R")) return undefined;
  const free: Array<[number,number]> = [];
  for (let y = 1; y < H - 1; y += 1) for (let x = 1; x < W - 1; x += 1) if (board[y]![x] === ".") free.push([x,y]);
  if (free.length < 5) return undefined;
  const p = pick(free); board[p[1]]![p[0]] = "@"; occupied.add(key(p[0],p[1]));
  const lit1 = pick(free.filter(([x,y]) => board[y]![x] === "."));
  board[lit1[1]]![lit1[0]] = "O"; occupied.add(key(lit1[0],lit1[1]));
  const lit2 = pick(free.filter(([x,y]) => board[y]![x] === "."));
  board[lit2[1]]![lit2[0]] = "O"; occupied.add(key(lit2[0],lit2[1]));
  const goal1 = pick(free.filter(([x,y]) => board[y]![x] === "."));
  board[goal1[1]]![goal1[0]] = "o"; occupied.add(key(goal1[0],goal1[1]));
  const goal2 = pick(free.filter(([x,y]) => board[y]![x] === "."));
  board[goal2[1]]![goal2[0]] = "o"; occupied.add(key(goal2[0],goal2[1]));
  return { layout: board.map((row) => row.join("")).join("\n"), goals: [key(...goal1), key(...goal2)] };
}

function flagStep(events: string[], flags: number): number {
  let next = flags;
  if (events.some((e) => e.startsWith("extinguish_by_wall:candle#1"))) next |= D1;
  if ((next & D1) !== 0 && events.some((e) => e === "ignite_midcycle:candle#1:t1")) next |= T1;
  if ((next & T1) !== 0 && events.some((e) => e.startsWith("extinguish_by_wall:candle#2"))) next |= D2;
  if ((next & D2) !== 0 && events.some((e) => e === "ignite_midcycle:candle#2:t2")) next |= T2;
  if ((next & T1) !== 0 && events.some((e) => e === "simultaneous_burn:candle#1+candle#2")) next |= SIM;
  return next;
}

function search(layout: string): Node | undefined {
  const level: LevelDoc = { id: "random_candidate", title: "random_candidate", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" } };
  let initial: CandleSokobanState;
  try { initial = parseLevel(level); } catch { return undefined; }
  const queue: Node[] = [{ state: initial, inputs: [], events: [], flags: 0, depth: 0 }];
  const visited = new Set<string>([`${stateKey(initial)}|0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, level.win) && (current.flags & (D1|T1|D2|T2|SIM)) === (D1|T1|D2|T2|SIM)) return current;
    if (current.depth >= 32 || visited.size > 18000) continue;
    for (const action of actions) {
      const result = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!result.legal) continue;
      const flags = flagStep(result.events, current.flags);
      const next: Node = { state: result.state, inputs: [...current.inputs, action], events: [...current.events, ...result.events], flags, depth: current.depth + 1 };
      const k = `${stateKey(result.state)}|${flags}`;
      if (visited.has(k)) continue;
      visited.add(k); queue.push(next);
    }
  }
  return undefined;
}

for (let i = 0; i < 2500; i += 1) {
  const candidate = makeLayout();
  if (!candidate) continue;
  const hit = search(candidate.layout);
  if (!hit) continue;
  console.log(JSON.stringify({ trial: i, goals: candidate.goals, inputs: hit.inputs, flags: hit.flags, events: hit.events, final: renderState(hit.state), layout: candidate.layout }, null, 2));
  break;
}
