import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: audit.ts <layout> [maxStates]");
const maxStates = Number(process.argv[3] ?? 500_000);
const layoutPath = path.resolve(layoutArg);
const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: path.basename(layoutPath), title: path.basename(layoutPath), layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(runtime, initial, level.win!, { winCondition: level.win!, maxStates }, { maxStates, terminalizeWins: true });
type Edge = (typeof graph.edges)[number];
const outgoing = new Map<number, Edge[]>();
const incoming = new Map<number, Edge[]>();
for (const edge of graph.edges) {
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
}
const objectKey = (index: number) => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "");
const wins = new Set(graph.winStateIndexes);
const canReachWin = new Set<number>(graph.winStateIndexes);
const reverseQueue = [...graph.winStateIndexes];
for (let i = 0; i < reverseQueue.length; i += 1) {
  for (const edge of incoming.get(reverseQueue[i]!) ?? []) {
    if (canReachWin.has(edge.from)) continue;
    canReachWin.add(edge.from);
    reverseQueue.push(edge.from);
  }
}
const winEdges = graph.edges.filter((edge) => canReachWin.has(edge.from) && canReachWin.has(edge.to));

const adjacency = new Map<number, Set<number>>();
for (const edge of winEdges) (adjacency.get(edge.from) ?? adjacency.set(edge.from, new Set()).get(edge.from)!).add(edge.to);
let nextIndex = 0;
const indexes = new Map<number, number>();
const lows = new Map<number, number>();
const stack: number[] = [];
const onStack = new Set<number>();
const sccs: number[][] = [];
function strongConnect(v: number): void {
  indexes.set(v, nextIndex); lows.set(v, nextIndex); nextIndex += 1; stack.push(v); onStack.add(v);
  for (const w of adjacency.get(v) ?? []) {
    if (!indexes.has(w)) { strongConnect(w); lows.set(v, Math.min(lows.get(v)!, lows.get(w)!)); }
    else if (onStack.has(w)) lows.set(v, Math.min(lows.get(v)!, indexes.get(w)!));
  }
  if (lows.get(v) !== indexes.get(v)) return;
  const component: number[] = [];
  while (true) { const w = stack.pop()!; onStack.delete(w); component.push(w); if (w === v) break; }
  sccs.push(component.sort((a, b) => a - b));
}
for (const state of [...canReachWin].sort((a, b) => a - b)) if (!indexes.has(state)) strongConnect(state);
const sccByState = new Map<number, number>();
for (const [scc, states] of sccs.entries()) for (const state of states) sccByState.set(state, scc);
const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!; const to = sccByState.get(edge.to)!;
  if (from !== to) (condensation.get(from) ?? condensation.set(from, new Set()).get(from)!).add(to);
}
const initialScc = sccByState.get(0)!;
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
let sccPathCount = 0;
function countPaths(cursor: number): void {
  if (winSccs.has(cursor)) { sccPathCount += 1; return; }
  for (const next of condensation.get(cursor) ?? []) countPaths(next);
}
if (canReachWin.has(0)) countPaths(initialScc);

const parent = new Map<number, Edge>();
for (const edge of graph.edges) if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
function prefix(index: number): string[] { const actions: string[] = []; while (index !== 0) { const edge = parent.get(index); if (!edge) break; actions.push(edge.action); index = edge.from; } return actions.reverse(); }
function groupEdges(edges: Edge[]) {
  const groups = new Map<string, { fromObject: string; toObject: string; action: string; events: string[]; count: number; witness: string[]; winReaching: boolean }>();
  for (const edge of edges) {
    const signature = JSON.stringify([objectKey(edge.from), objectKey(edge.to), edge.action, edge.events]);
    const record = groups.get(signature) ?? { fromObject: objectKey(edge.from), toObject: objectKey(edge.to), action: edge.action, events: edge.events, count: 0, witness: [...prefix(edge.from), edge.action], winReaching: canReachWin.has(edge.to) };
    record.count += 1; record.winReaching ||= canReachWin.has(edge.to); groups.set(signature, record);
  }
  return [...groups.values()].sort((a, b) => a.witness.length - b.witness.length);
}
const initialObject = objectKey(0);
const initialClosure = new Set([0]);
const queue = [0];
for (let i = 0; i < queue.length; i += 1) for (const edge of outgoing.get(queue[i]!) ?? []) {
  if (objectKey(edge.to) !== initialObject || initialClosure.has(edge.to)) continue;
  initialClosure.add(edge.to); queue.push(edge.to);
}
const firstObjectEdges = graph.edges.filter((edge) => initialClosure.has(edge.from) && objectKey(edge.to) !== initialObject);
const winIndex = graph.winStateIndexes.values().next().value as number | undefined;
const result = {
  graph: { status: graph.status, states: graph.keys.length, transitions: graph.edges.length, wins: wins.size, winReachingStates: canReachWin.size, winReachingEdges: winEdges.length, maxStates },
  shortestWin: winIndex === undefined ? null : { cost: graph.depthByIndex[winIndex], inputs: prefix(winIndex) },
  rawScc: { count: sccs.length, sourceToWinPathCount: sccPathCount },
  initialPlayerOnlyClosureStates: initialClosure.size,
  firstObjectActions: groupEdges(firstObjectEdges),
  winningObjectTransitions: groupEdges(winEdges.filter((edge) => objectKey(edge.from) !== objectKey(edge.to))),
};
await writeFile(`${layoutPath}.audit.json`, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
