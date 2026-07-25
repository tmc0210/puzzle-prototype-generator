import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { isWin, parseLevel, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const basePath = path.resolve(process.argv[2] ?? "candidate_v75.layout");
const base = (await readFile(basePath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const forbiddenPatterns = ["extinguish_by_candle_body", "wick_reexposed_unlit", "shrink_ignite", "roll_intermediate_light_brazier", "roll_last_brazier_before_endpoint", "roll_intermediate_ignite", "roll_intermediate_extinguish", "roll_reignite_after_extinguish"];
const changes: Array<{ id: string; cells: Array<[number, number]> }> = [
  { id: "open_x6_y4", cells: [[6, 4]] },
  { id: "open_x6_y3", cells: [[6, 3]] },
  { id: "open_x7_y4", cells: [[7, 4]] },
  { id: "open_x3_y5", cells: [[3, 5]] },
  { id: "open_x4_y5", cells: [[4, 5]] },
  { id: "open_x5_y5", cells: [[5, 5]] },
  { id: "open_x8_y5", cells: [[8, 5]] },
  { id: "open_x9_y5", cells: [[9, 5]] },
  { id: "open_x10_y5", cells: [[10, 5]] },
  { id: "open_x5_y7", cells: [[5, 7]] },
  { id: "open_x6_y8", cells: [[6, 8]] },
  { id: "open_x7_y8", cells: [[7, 8]] },
  { id: "open_x8_y8", cells: [[8, 8]] },
  { id: "open_x9_y8", cells: [[9, 8]] },
  { id: "open_x10_y8", cells: [[10, 8]] },
  { id: "pair_x5_y5_x5_y7", cells: [[5, 5], [5, 7]] },
  { id: "pair_x5_y5_x6_y8", cells: [[5, 5], [6, 8]] },
  { id: "pair_x5_y5_x7_y8", cells: [[5, 5], [7, 8]] },
  { id: "pair_x5_y5_x8_y8", cells: [[5, 5], [8, 8]] },
  { id: "pair_x5_y5_x9_y8", cells: [[5, 5], [9, 8]] },
  { id: "pair_x5_y5_x10_y8", cells: [[5, 5], [10, 8]] },
  { id: "pair_x6_y4_x5_y7", cells: [[6, 4], [5, 7]] },
  { id: "pair_x7_y4_x5_y7", cells: [[7, 4], [5, 7]] },
  { id: "pair_x5_y5_x6_y4", cells: [[5, 5], [6, 4]] },
  { id: "pair_x6_y3_x6_y4", cells: [[6, 3], [6, 4]] },
  { id: "triple_x6_y3_x6_y4_x7_y4", cells: [[6, 3], [6, 4], [7, 4]] },
  { id: "triple_x6_y3_x6_y4_x5_y7", cells: [[6, 3], [6, 4], [5, 7]] },
];

for (const variant of changes) {
  const layout = apply(base, variant.cells);
  const level = { id: `CANDLE_V5_${variant.id}`, global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" as const } };
  try {
    const result = analyze(level);
    console.log(JSON.stringify({ id: variant.id, cells: variant.cells, ...result }, null, 2));
  } catch (error) {
    console.log(JSON.stringify({ id: variant.id, cells: variant.cells, error: String(error) }, null, 2));
  }
}

function analyze(level: { id: string; global_burn_cycle: number; layout: string; win: { type: "all_braziers_lit" } }) {
  const start = parseLevel(level);
  type Node = { state: CandleSokobanState; history: string[]; depth: number };
  const first: Node = { state: start, history: [], depth: 0 };
  const queue: Node[] = [first];
  const seen = new Set<string>([key(first)]);
  const edges = { count: 0, forbidden: 0 };
  const wins: Array<{ depth: number; order: string; overlap: boolean }> = [];
  let minDepth = Number.POSITIVE_INFINITY;
  let minOverlap = Number.POSITIVE_INFINITY;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, level.win)) {
      minDepth = Math.min(minDepth, current.depth);
      const overlap = current.history.includes("c1_reignite") && !current.history.includes("c2_burn_out");
      if (overlap) minOverlap = Math.min(minOverlap, current.depth);
      if (wins.length < 40) wins.push({ depth: current.depth, order: current.history.join(">"), overlap });
      continue;
    }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
      if (!transition.legal) continue;
      edges.count += 1;
      if (forbiddenPatterns.some((pattern) => transition.events.some((event) => event.includes(pattern)))) edges.forbidden += 1;
      const history = advance(current.history, transition.events);
      const next: Node = { state: transition.state, history, depth: current.depth + 1 };
      const nextKey = key(next);
      if (!seen.has(nextKey)) { seen.add(nextKey); queue.push(next); }
    }
  }
  return { graph: { states: seen.size, edges: edges.count }, exposure: { forbidden: edges.forbidden }, solve: { wins: wins.slice(0, 8), minDepth: Number.isFinite(minDepth) ? minDepth : null, minOverlap: Number.isFinite(minOverlap) ? minOverlap : null }, status: minOverlap < Number.POSITIVE_INFINITY && edges.forbidden === 0 ? "promising" : "reject" };
}

function key(node: { state: CandleSokobanState; history: string[] }): string { return `${stateKey(node.state)}||H:${node.history.join(">")}`; }
function advance(before: string[], events: string[]): string[] {
  const history = [...before];
  const add = (label: string) => { if (!history.includes(label)) history.push(label); };
  if (events.includes("extinguish_by_wall:candle#1")) add("wall_douse");
  for (const label of ["len4", "len3", "len2", "len1"]) if (events.includes(`shrink:candle#2:${label}`)) add(`c2_${label}`);
  if (events.includes("light_brazier:7,5")) add("c2_target");
  if (events.includes("burn_out:candle#2")) add("c2_burn_out");
  if (events.includes("ignite_from_brazier:candle#1:1,3")) add("c1_reignite");
  for (const label of ["len3", "len2", "len1"]) if (events.includes(`shrink:candle#1:${label}`)) add(`c1_${label}`);
  if (events.includes("light_brazier:4,2")) add("c1_target");
  return history;
}
function apply(source: string, cells: Array<[number, number]>): string {
  const rows = source.split("\n").map((row) => [...row]);
  for (const [x, y] of cells) { if (rows[y]![x] !== "#") throw new Error(`cell ${x},${y} is not a wall`); rows[y]![x] = "."; }
  return rows.map((row) => row.join("")).join("\n");
}
