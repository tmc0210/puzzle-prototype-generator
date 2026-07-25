import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { isWin, parseLevel, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2] ?? "candidate_v61.layout");
const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : undefined;
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V4_FAMILY", title: "v4 family", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
const labels = ["wall_douse", "c2_len4", "c2_len3", "c2_len2", "c1_reignite", "c1_len3", "c2_len1", "c1_len2", "c2_target", "c2_burn_out", "c1_len1", "c1_target"];
const bits = labels.map((_, index) => 1 << index);
type Node = { state: CandleSokobanState; mask: number; order: string[]; depth: number; inputs: CandleAction[]; ways: bigint };
const start: Node = { state: parseLevel(level), mask: 0, order: [], depth: 0, inputs: [], ways: 1n };
const queue: Node[] = [start];
const nodes = new Map<string, Node>([[key(start), start]]);
const wins: Node[] = [];
let legalEdges = 0;
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (isWin(current.state, level.win!)) { wins.push(current); continue; }
  for (const action of actions) {
    const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
    if (!transition.legal) continue;
    legalEdges += 1;
    const advanced = advance(current.mask, current.order, transition.events);
    const next: Node = { state: transition.state, mask: advanced.mask, order: advanced.order, depth: current.depth + 1, inputs: [...current.inputs, action], ways: current.ways };
    const prior = nodes.get(key(next));
    if (!prior) { nodes.set(key(next), next); queue.push(next); }
    else if (prior.depth === next.depth) prior.ways += next.ways;
  }
}
const signatureMap = new Map<string, { count: number; minDepth: number; input: CandleAction[] }>();
const phaseMap = new Map<string, { count: number; minDepth: number }>();
for (const win of wins) {
  const signature = win.order.join(">");
  const existing = signatureMap.get(signature);
  if (existing) { existing.count += 1; existing.minDepth = Math.min(existing.minDepth, win.depth); }
  else signatureMap.set(signature, { count: 1, minDepth: win.depth, input: win.inputs });
  const reignite = win.inputs.findIndex((_, index) => false);
  void reignite;
}
const report = {
  layoutPath,
  graph: { status: "complete", baseStates: new Set(queue.map((node) => stateKey(node.state))).size, productStates: nodes.size, legalEdges, winningProductStates: wins.length },
  required: labels.map((label, index) => ({ label, allWins: wins.length > 0 && wins.every((win) => (win.mask & bits[index]!) !== 0), violating: wins.filter((win) => (win.mask & bits[index]!) === 0).length })),
  signatures: [...signatureMap.entries()].map(([signature, value]) => ({ signature, winningProductStates: value.count, minimumDepth: value.minDepth, representativeInputs: value.input })),
  shortest: wins.length ? { cost: Math.min(...wins.map((win) => win.depth)), input: wins.sort((a, b) => a.depth - b.depth)[0]!.inputs } : null,
};
if (outputPath) await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));

function key(node: Pick<Node, "state" | "mask" | "order">): string { return `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}`; }
function advance(maskBefore: number, orderBefore: string[], events: string[]): { mask: number; order: string[] } {
  let mask = maskBefore;
  const order = [...orderBefore];
  const add = (label: string): void => { const index = labels.indexOf(label); if (index < 0 || (mask & bits[index]!) !== 0) return; mask |= bits[index]!; order.push(label); };
  if (events.includes("extinguish_by_wall:candle#1")) add("wall_douse");
  if (events.includes("shrink:candle#2:len4")) add("c2_len4");
  if (events.includes("shrink:candle#2:len3")) add("c2_len3");
  if (events.includes("shrink:candle#2:len2")) add("c2_len2");
  if ((mask & bits[0]!) !== 0 && events.includes("ignite_from_brazier:candle#1:1,3")) add("c1_reignite");
  if ((mask & bits[4]!) !== 0 && events.includes("shrink:candle#1:len3")) add("c1_len3");
  if ((mask & bits[4]!) !== 0 && events.includes("shrink:candle#2:len1")) add("c2_len1");
  if ((mask & bits[4]!) !== 0 && events.includes("shrink:candle#1:len2")) add("c1_len2");
  if (events.includes("light_brazier:7,4")) add("c2_target");
  if (events.includes("burn_out:candle#2")) add("c2_burn_out");
  if ((mask & bits[4]!) !== 0 && events.includes("shrink:candle#1:len1")) add("c1_len1");
  if (events.includes("light_brazier:4,2")) add("c1_target");
  return { mask, order };
}
