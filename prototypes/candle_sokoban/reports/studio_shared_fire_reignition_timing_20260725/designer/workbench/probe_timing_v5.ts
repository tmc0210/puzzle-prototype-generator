import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { isWin, parseLevel, stateKey, step, type CandleAction, type CandleSokobanState } from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const layoutPath = path.resolve(process.argv[2]!);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level: LevelDoc = { id: "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001_V5_PROBE", title: "v5 timing probe", global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
type Node = { state: CandleSokobanState; history: string[]; timing: string[]; depth: number };
const first: Node = { state: parseLevel(level), history: [], timing: [], depth: 0 };
const queue: Node[] = [first];
const seen = new Set<string>([key(first)]);
const wins = new Map<string, { count: number; minDepth: number }>();
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const current = queue[cursor]!;
  if (isWin(current.state, level.win!)) {
    const signature = `${current.history.join(">")}||timing:${current.timing.join(">")}`;
    const prior = wins.get(signature);
    if (prior) { prior.count += 1; prior.minDepth = Math.min(prior.minDepth, current.depth); }
    else wins.set(signature, { count: 1, minDepth: current.depth });
    continue;
  }
  for (const action of actions) {
    const transition = step(pkg.mechanic, current.state, action, { winCondition: level.win });
    if (!transition.legal) continue;
    const advanced = advance(current.history, current.timing, transition.events, current.depth + 1);
    const next: Node = { state: transition.state, history: advanced.history, timing: advanced.timing, depth: current.depth + 1 };
    const nextKey = key(next);
    if (!seen.has(nextKey)) { seen.add(nextKey); queue.push(next); }
  }
  if (cursor > 0 && cursor % 100000 === 0) console.error(`progress states=${queue.length} wins=${wins.size}`);
}
console.log(JSON.stringify({ layoutPath, graph: { status: "complete", productStates: seen.size, winningStates: [...wins.values()].reduce((sum, item) => sum + item.count, 0) }, signatures: [...wins.entries()].map(([signature, value]) => ({ signature, ...value })) }, null, 2));

function key(node: Pick<Node, "state" | "history" | "timing">): string { return `${stateKey(node.state)}||H:${node.history.join(">")}||T:${node.timing.join(">")}`; }
function advance(historyBefore: string[], timingBefore: string[], events: string[], stepNumber: number): { history: string[]; timing: string[] } {
  const history = [...historyBefore]; const timing = [...timingBefore];
  const addHistory = (label: string): void => { if (!history.includes(label)) history.push(label); };
  if (events.includes("extinguish_by_wall:candle#1")) { addHistory("wall_douse"); if (!timing.some((item) => item.startsWith("wall_step:"))) timing.push(`wall_step:${stepNumber}`); }
  if (events.includes("shrink:candle#2:len4")) addHistory("c2_len4");
  if (events.includes("shrink:candle#2:len3")) addHistory("c2_len3");
  if (events.includes("shrink:candle#2:len2")) addHistory("c2_len2");
  if (events.includes("shrink:candle#2:len1")) addHistory("c2_len1");
  if (events.includes("ignite_from_brazier:candle#1:1,3")) {
    addHistory("c1_reignite");
    const phase = events.find((event) => event.startsWith("ignite_midcycle:candle#1:"));
    if (phase && !timing.includes(phase)) timing.push(phase);
  }
  if (events.includes("shrink:candle#1:len3")) addHistory("c1_len3");
  if (events.includes("shrink:candle#1:len2")) addHistory("c1_len2");
  if (events.includes("shrink:candle#1:len1")) addHistory("c1_len1");
  if (events.includes("light_brazier:6,4")) addHistory("c2_target");
  if (events.includes("light_brazier:7,5")) addHistory("c2_target_7_5");
  if (events.includes("burn_out:candle#2")) addHistory("c2_burn_out");
  if (events.includes("light_brazier:4,2")) addHistory("c1_target");
  return { history, timing };
}
