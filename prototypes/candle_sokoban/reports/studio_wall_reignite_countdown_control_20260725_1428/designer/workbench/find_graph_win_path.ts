import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";

const layoutPath = process.argv[2]!;
const walls = process.argv.find((arg) => arg.startsWith("walls="))?.slice(6)?.split(" ").filter(Boolean) ?? [];
const floors = process.argv.find((arg) => arg.startsWith("floors="))?.slice(7)?.split(" ").filter(Boolean) ?? [];
const mode = process.argv.find((arg) => arg.startsWith("mode="))?.slice(5) ?? "top";
function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.replace(/\r/g, "").trimEnd().split("\n");
  const row = rows[y]!;
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}
let layout = `${(await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
const target = process.argv.find((arg) => arg.startsWith("target="))?.slice(7);
if (target) {
  const [x, y] = target.split(",").map(Number);
  const rows = layout.trimEnd().split("\n");
  const currentY = rows.findIndex((row, index) => index > 9 && row.includes("o"));
  const currentX = currentY >= 0 ? rows[currentY]!.indexOf("o") : -1;
  if (currentY >= 0 && currentX >= 0) layout = replaceCell(layout, currentX, currentY, ".");
  layout = replaceCell(layout, x!, y!, "o");
}
for (const wall of walls) { const [x, y] = wall.split(",").map(Number); layout = replaceCell(layout, x!, y!, "#"); }
for (const floor of floors) { const [x, y] = floor.split(",").map(Number); layout = replaceCell(layout, x!, y!, "."); }
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = { id: "graph-path", title: "graph-path", layout, global_burn_cycle: 5, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const wanted = mode === "setup12"
  ? graph.keys.findIndex((key) => key.startsWith("P:12,12|"))
  : mode === "setup10"
  ? graph.keys.findIndex((key) => key.startsWith("P:10,10|"))
  : mode === "setup"
  ? graph.keys.findIndex((key) => key.startsWith("P:9,13|"))
  : graph.winStateIndexes.size > 0
  ? [...graph.winStateIndexes].find((index) => mode === "lower1"
    ? graph.keys[index]!.includes("candle#1:1:down:1:9,14|B:")
    : mode === "lower2"
    ? graph.keys[index]!.includes("candle#1:1:down:1:9,14;9,15|B:")
    : mode === "lower3"
      ? graph.keys[index]!.includes("candle#1:1:down:1:9,14;9,15;9,16|B:")
      : mode === "lower4"
        ? graph.keys[index]!.includes("candle#1:1:down:1:9,14;9,15;9,16;9,17|B:")
      : mode === "h4"
        ? graph.keys[index]!.includes("candle#1:1:right:1:9,16;10,16;11,16;12,16|B:")
      : mode === "h3"
        ? graph.keys[index]!.includes("candle#1:1:right:1:9,16;10,16;11,16|B:")
      : mode === "h2"
        ? graph.keys[index]!.includes("candle#1:1:right:1:8,16;9,16|B:")
      : mode === "hb3"
        ? graph.keys[index]!.includes("candle#1:1:right:1:8,16;9,16;10,16|B:")
      : mode === "hb2"
        ? graph.keys[index]!.includes("candle#1:1:right:1:8,16;9,16|B:")
      : mode === "empty"
        ? graph.keys[index]!.includes("|C:|B:")
      : graph.keys[index]!.includes("candle#3") && !graph.keys[index]!.includes("candle#1")) ?? [...graph.winStateIndexes][0]
  : undefined;
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
console.log(JSON.stringify({ initialKey: runtime.key(initial), status: graph.status, states: graph.keys.length, edges: graph.edges.length, winningStates: graph.winStateIndexes.size, winningKeys: [...graph.winStateIndexes].map((index) => graph.keys[index]), wanted, wantedKey: wanted === undefined ? null : graph.keys[wanted], path }, null, 2));
