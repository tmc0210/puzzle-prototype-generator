import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const layout = `${(await readFile(process.argv[2]!, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const wantedText = process.argv[3]!;
const absentText = process.argv.find((arg) => arg.startsWith("absent="))?.slice(7);
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "signature-path", title: "signature-path", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const wanted = [...graph.winStateIndexes].find((index) => graph.keys[index]!.includes(wantedText) && (absentText === undefined || !graph.keys[index]!.includes(absentText)));
const parent = new Map<number, { from: number; action: string; events: string[] }>();
for (const edge of graph.edges) if (!parent.has(edge.to)) parent.set(edge.to, { from: edge.from, action: edge.action, events: edge.events });
const path: Array<{ step: number; action: string; events: string[]; key: string }> = [];
if (wanted !== undefined) {
  let at = wanted;
  while (at !== 0) {
    const link = parent.get(at);
    if (!link) break;
    path.push({ step: path.length + 1, action: link.action, events: link.events, key: graph.keys[at]! });
    at = link.from;
  }
  path.reverse();
}
console.log(JSON.stringify({ wantedText, wanted, wantedKey: wanted === undefined ? null : graph.keys[wanted], path }, null, 2));
