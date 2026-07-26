import { readFile } from "node:fs/promises";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
const layout = await readFile(process.argv[2]!, "utf8");
const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({ id: "empty_route", title: "empty_route", layout, win: pkg.mechanic.win });
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates: 300000, terminalizeWins: true });
const target = [...graph.winStateIndexes].find((i) => graph.keys[i]!.includes("|C:|"));
if (target === undefined) throw new Error("no empty-candle win");
const parent = new Array<number>(graph.keys.length).fill(-1); const parentEdge = new Array<number>(graph.keys.length).fill(-1);
for (const [i, edge] of graph.edges.entries()) if (edge.to !== 0 && parent[edge.to] === -1) { parent[edge.to] = edge.from; parentEdge[edge.to] = i; }
const edgeIndexes: number[] = []; for (let cursor = target; cursor !== 0; cursor = parent[cursor]!) edgeIndexes.push(parentEdge[cursor]!); edgeIndexes.reverse();
console.log(JSON.stringify({ target, depth: graph.depthByIndex[target], key: graph.keys[target], steps: edgeIndexes.map((i) => ({ action: graph.edges[i]!.action, events: graph.edges[i]!.events })) }, null, 2));
