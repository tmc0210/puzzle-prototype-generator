import { writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const here = import.meta.dirname;
const prototypeRoot = path.resolve(here, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const maxStates = 120_000;
const runtimeOptions = { winCondition: pkg.mechanic.win, maxStates };

let seed = 0x5a17c0de;
function random() {
  seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
  return (seed >>> 0) / 0x1_0000_0000;
}

const variableCells: Array<[number, number]> = [];
for (let y = 8; y <= 10; y += 1) {
  for (let x = 5; x <= 11; x += 1) variableCells.push([x, y]);
}
const mandatoryFloor = new Set([
  "5,7", "6,7", "7,7", "8,7", "9,7", "10,7", "11,7",
  "9,9", "10,9", "11,9",
]);

function buildLayout(): string {
  const rows = Array.from({ length: 12 }, () => Array(13).fill("#"));
  rows[1]![4] = "L"; rows[1]![5] = "P";
  rows[3]![4] = "B"; rows[3]![5] = "S";
  rows[6]![3] = "G"; rows[6]![4] = "G"; rows[6]![5] = ".";
  rows[6]![6] = "M"; rows[6]![7] = "M";
  rows[7]![4] = "G"; rows[7]![5] = "G";
  for (let x = 6; x <= 11; x += 1) rows[7]![x] = ".";
  for (const [x, y] of variableCells) rows[y]![x] = random() < 0.56 ? "." : "#";
  for (const key of mandatoryFloor) {
    const [x, y] = key.split(",").map(Number);
    rows[y]![x] = ".";
  }
  rows[9]![9] = "M"; rows[9]![10] = "M"; rows[9]![11] = "@";
  return `${rows.map((row) => row.join("")).join("\n")}\n`;
}

type Hit = {
  id: number; layout: string; cost: number; explored: number; objectSteps: number;
  graphStates: number; graphEdges: number; wins: number; closureStates: number;
  mergeOutcomes: string[]; inputs: string[]; events: string[];
};
const hits: Hit[] = [];
for (let id = 0; id < 900; id += 1) {
  const layout = buildLayout();
  let initial;
  try {
    initial = adapter.parseLevel({ id: `search_${id}`, title: `search_${id}`, layout, win: pkg.mechanic.win });
  } catch { continue; }
  const solution = solveWithRuntime(runtime, initial, runtimeOptions);
  if (!solution.found || solution.cost < 11 || solution.cost > 28) continue;
  let state = initial;
  let objectSteps = 0;
  for (const input of solution.inputs) {
    const tr = runtime.step(state, input, runtimeOptions);
    if (!tr.legal) break;
    if ((tr.events ?? []).some((event) => event !== "walk")) objectSteps += 1;
    state = tr.state;
  }
  if (objectSteps < 5) continue;
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, runtimeOptions, { maxStates, terminalizeWins: true });
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0 || graph.winStateIndexes.size > 8) continue;
  type Edge = (typeof graph.edges)[number];
  const incoming = new Map<number, Edge[]>();
  for (const edge of graph.edges) (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
  const closure = new Set<number>(graph.winStateIndexes);
  const queue = [...graph.winStateIndexes];
  for (let i = 0; i < queue.length; i += 1) {
    for (const edge of incoming.get(queue[i]!) ?? []) {
      if (closure.has(edge.from)) continue;
      closure.add(edge.from); queue.push(edge.from);
    }
  }
  const objectKey = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");
  const mergeOutcomes = [...new Set(graph.edges
    .filter((edge) => closure.has(edge.from) && closure.has(edge.to) && edge.events.some((event) => event.startsWith("sticky_merge")))
    .map((edge) => objectKey(edge.to)))];
  if (mergeOutcomes.length !== 1) continue;
  hits.push({
    id, layout, cost: solution.cost, explored: solution.exploredStates, objectSteps,
    graphStates: graph.keys.length, graphEdges: graph.edges.length, wins: graph.winStateIndexes.size,
    closureStates: closure.size, mergeOutcomes, inputs: solution.inputs, events: solution.events,
  });
  if (hits.length >= 24) break;
}

hits.sort((a, b) => b.cost - a.cost || a.graphStates - b.graphStates);
for (const [rank, hit] of hits.entries()) {
  await writeFile(path.join(here, `search_hit_${String(rank + 1).padStart(2, "0")}_id${hit.id}.txt`), hit.layout, "utf8");
}
await writeFile(path.join(here, "search_results.json"), `${JSON.stringify(hits.map(({ layout, ...rest }) => rest), null, 2)}\n`, "utf8");
console.log(JSON.stringify(hits.map(({ layout, mergeOutcomes, events, ...rest }) => rest), null, 2));
