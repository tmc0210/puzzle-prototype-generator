import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "alternate-013", title: "alternate-013", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial: any = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 30000, terminalizeWins: true });
const target = [...graph.winStateIndexes]
  .map((index) => ({ index, key: graph.keys[index]!, depth: graph.depthByIndex[index]! }))
  .sort((left, right) => right.depth - left.depth)
  .find((candidate) => candidate.key.includes("C:candle#single1:-:up:1:8,4"));
if (!target) throw new Error("alternate win not found");
const incoming = new Map<number, { from: number; action: string; events: string[] }>();
for (const edge of graph.edges) {
  if (edge.to === 0 || incoming.has(edge.to)) continue;
  incoming.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
}
const path: Array<{ from: number; to: number; action: string; events: string[] }> = [];
let cursor = target.index;
while (cursor !== 0) {
  const edge = incoming.get(cursor);
  if (!edge) throw new Error(`no predecessor for ${cursor}`);
  path.push({ ...edge, to: cursor });
  cursor = edge.from;
}
path.reverse();
let state: any = initial;
for (let i = 0; i < path.length; i++) {
  const step = path[i]!;
  const result = adapter.step(pkg.mechanic, state, step.action as any, options);
  state = result.state;
  console.log(JSON.stringify({
    step: i + 1,
    action: step.action,
    player: state.player,
    timer: state.globalBurnCountdown,
    candles: state.candles.map((candle: any) => ({ id: candle.id, lit: candle.lit, body: candle.bodyCells })),
    events: result.events,
  }));
}
