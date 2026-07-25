import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { isWin, parseLevel, renderState, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const basePath = path.resolve(process.argv[2] ?? "candidate_v66.layout");
const base = (await readFile(basePath, "utf8")).replace(/\r/g, "").trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const variants: Array<{ id: string; changes: Array<[number, number, string]> }> = [
  { id: "A_open3_5_block4_6", changes: [[3, 5, "."], [4, 6, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "B_open3_5_block5_6", changes: [[3, 5, "."], [5, 6, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "C_keep3_5_block4_6", changes: [[4, 6, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "D_keep3_5_block5_6", changes: [[5, 6, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "E_move3_5_to3_6_block4_7", changes: [[3, 5, "."], [3, 6, "#"], [4, 7, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "F_move3_5_to3_6_block5_7", changes: [[3, 5, "."], [3, 6, "#"], [5, 7, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "G_move3_5_to3_6_block4_7_open4_6", changes: [[3, 5, "."], [3, 6, "#"], [4, 7, "#"], [9, 7, "."], [9, 8, "#"]] },
  { id: "H_keep3_5_block4_6_open4_7", changes: [[4, 6, "#"], [9, 7, "."], [9, 8, "#"], [4, 7, "."]] },
  { id: "I_keep3_5_block5_6_open5_7", changes: [[5, 6, "#"], [9, 7, "."], [9, 8, "#"], [5, 7, "."]] },
];

for (const variant of variants) {
  const layout = apply(base, variant.changes);
  const level = { id: `CANDLE_V4_${variant.id}`, global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" as const } };
  try {
    const result = solve(level);
    console.log(JSON.stringify({ id: variant.id, found: result.found, cost: result.cost, explored: result.explored, inputs: result.inputs, layout }, null, 2));
  } catch (error) {
    console.log(JSON.stringify({ id: variant.id, error: String(error), layout }, null, 2));
  }
}

function solve(level: { id: string; global_burn_cycle: number; layout: string; win: { type: "all_braziers_lit" } }) {
  const start = parseLevel(level);
  const queue: CandleSokobanState[] = [start];
  const keys = new Set([stateKey(start)]);
  const parents = new Map<string, { parent: string | null; action: CandleAction }>([[stateKey(start), { parent: null, action: "up" }]]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current, level.win)) {
      const inputs: CandleAction[] = [];
      let key = stateKey(current);
      while (parents.get(key)?.parent) { const link = parents.get(key)!; inputs.push(link.action); key = link.parent!; }
      return { found: true, cost: inputs.length, explored: queue.length, inputs: inputs.reverse(), final: renderState(current) };
    }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current, action, { winCondition: level.win });
      if (!transition.legal) continue;
      const key = stateKey(transition.state);
      if (keys.has(key)) continue;
      keys.add(key); parents.set(key, { parent: stateKey(current), action }); queue.push(transition.state);
    }
  }
  return { found: false, cost: null, explored: queue.length, inputs: [] };
}

function apply(source: string, changes: Array<[number, number, string]>): string {
  const rows = source.split("\n").map((row) => [...row]);
  for (const [x, y, replacement] of changes) rows[y]![x] = replacement;
  return rows.map((row) => row.join("")).join("\n");
}
