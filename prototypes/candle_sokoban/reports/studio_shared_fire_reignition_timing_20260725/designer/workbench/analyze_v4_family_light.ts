import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { isWin, parseLevel, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2] ?? "candidate_v66.layout");
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V4_FAMILY_LIGHT", title: "v4 family", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const labels = ["wall_douse", "c2_len4", "c2_len3", "c2_len2", "c1_reignite", "c1_len3", "c2_len1", "c1_len2", "c2_target", "c2_burn_out", "c1_len1", "c1_target"];
const bit = (label: string) => 1 << labels.indexOf(label);
type Node = { state: CandleSokobanState; mask: number; order: string; depth: number };
const start: Node = { state: parseLevel(level), mask: 0, order: "", depth: 0 };
const queue: Node[] = [start];
const seen = new Set<string>([key(start)]);
const wins = new Map<string, { count: number; minDepth: number }>();
const required = new Map(labels.map((label) => [label, { all: true, violating: 0 }]));
let legalEdges = 0;
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (isWin(current.state, level.win!)) {
    const prior = wins.get(current.order);
    if (prior) { prior.count += 1; prior.minDepth = Math.min(prior.minDepth, current.depth); }
    else wins.set(current.order, { count: 1, minDepth: current.depth });
    for (const label of labels) {
      const facts = required.get(label)!;
      if ((current.mask & bit(label)) === 0) { facts.all = false; facts.violating += 1; }
    }
    continue;
  }
  for (const action of actions) {
    const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
    if (!transition.legal) continue;
    legalEdges += 1;
    const advanced = advance(current.mask, current.order, transition.events);
    const next: Node = { state: transition.state, mask: advanced.mask, order: advanced.order, depth: current.depth + 1 };
    const nextKey = key(next);
    if (!seen.has(nextKey)) { seen.add(nextKey); queue.push(next); }
  }
  if (cursor > 0 && cursor % 100000 === 0) console.error(`progress states=${queue.length} product=${seen.size} wins=${wins.size}`);
}
const output = { layoutPath, graph: { status: "complete", productStates: seen.size, legalEdges, winningProductStates: [...wins.values()].reduce((sum, value) => sum + value.count, 0) }, required: Object.fromEntries(required), signatures: [...wins.entries()].map(([signature, value]) => ({ signature, ...value })) };
console.log(JSON.stringify(output, null, 2));

function key(node: Pick<Node, "state" | "mask" | "order">): string { return `${stateKey(node.state)}||M:${node.mask}||O:${node.order}`; }
function advance(maskBefore: number, orderBefore: string, events: string[]): { mask: number; order: string } {
  let mask = maskBefore;
  const order = orderBefore ? orderBefore.split(">") : [];
  const add = (label: string): void => { const b = bit(label); if ((mask & b) !== 0) return; mask |= b; order.push(label); };
  if (events.includes("extinguish_by_wall:candle#1")) add("wall_douse");
  if (events.includes("shrink:candle#2:len4")) add("c2_len4");
  if (events.includes("shrink:candle#2:len3")) add("c2_len3");
  if (events.includes("shrink:candle#2:len2")) add("c2_len2");
  if ((mask & bit("wall_douse")) !== 0 && events.includes("ignite_from_brazier:candle#1:1,3")) add("c1_reignite");
  if ((mask & bit("c1_reignite")) !== 0 && events.includes("shrink:candle#1:len3")) add("c1_len3");
  if ((mask & bit("c1_reignite")) !== 0 && events.includes("shrink:candle#2:len1")) add("c2_len1");
  if ((mask & bit("c1_reignite")) !== 0 && events.includes("shrink:candle#1:len2")) add("c1_len2");
  if (events.includes("light_brazier:6,4")) add("c2_target");
  if (events.includes("burn_out:candle#2")) add("c2_burn_out");
  if ((mask & bit("c1_reignite")) !== 0 && events.includes("shrink:candle#1:len1")) add("c1_len1");
  if (events.includes("light_brazier:4,2")) add("c1_target");
  return { mask, order: order.join(">") };
}
