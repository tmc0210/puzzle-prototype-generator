import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { replayInputSequence } from "../../../../../../src/workflows/inputSequenceReplay.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const wantedText = process.argv[3]!;
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "compare-win-paths", title: "compare-win-paths", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win };
const solution = solveWithRuntime(runtime, initial, { ...options, maxStates: 300000, maxDepth: 200 });
const canonical = replayInputSequence(adapter, runtime, initial, solution.inputs, options, pkg.mechanic.win);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, { maxStates: 300000, terminalizeWins: true });
const wanted = [...graph.winStateIndexes].find((index) => graph.keys[index]!.includes(wantedText));
const parent = new Map<number, { from: number; action: string; events: string[] }>();
for (const edge of graph.edges) if (!parent.has(edge.to)) parent.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
function graphPath(index: number | undefined) {
  const path: Array<{ action: string; events: string[]; key: string }> = [];
  if (index === undefined) return path;
  let at = index;
  while (at !== 0) {
    const link = parent.get(at);
    if (!link) break;
    path.push({ action: link.action, events: link.events, key: graph.keys[at]! });
    at = link.from;
  }
  return path.reverse();
}
const alternate = graphPath(wanted);
console.log(JSON.stringify({
  canonical: canonical.steps.map((step) => ({ action: step.action, events: step.events, key: step.after.key })),
  alternate,
  wantedKey: wanted === undefined ? null : graph.keys[wanted],
}, null, 2));
