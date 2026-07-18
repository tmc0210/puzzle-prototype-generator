import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: audit_generic.ts <layout> [maxStates]");
const maxStates = Number(process.argv[3] ?? 500_000);
const layoutPath = path.resolve(layoutArg);
const prototypeRoot = path.resolve(import.meta.dirname, "../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: path.basename(layoutPath), title: path.basename(layoutPath), layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  level.win!,
  { winCondition: level.win!, maxStates },
  { maxStates, terminalizeWins: true },
);
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

const parent = new Map<number, Edge>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) parent.set(edge.to, edge);
}
function prefix(index: number): string[] {
  const actions: string[] = [];
  while (index !== 0) {
    const edge = parent.get(index);
    if (!edge) break;
    actions.push(edge.action);
    index = edge.from;
  }
  return actions.reverse();
}

type EdgeGroup = { fromObject: string; toObject: string; action: string; events: string[]; count: number; witnessPrefix: string[]; reachesWin: boolean };
function groupEdges(edges: Edge[]): EdgeGroup[] {
  const groups = new Map<string, EdgeGroup>();
  for (const edge of edges) {
    const signature = JSON.stringify([objectKey(edge.from), objectKey(edge.to), edge.action, edge.events]);
    const record = groups.get(signature) ?? {
      fromObject: objectKey(edge.from), toObject: objectKey(edge.to), action: edge.action, events: edge.events,
      count: 0, witnessPrefix: [...prefix(edge.from), edge.action], reachesWin: false,
    };
    record.count += 1;
    record.reachesWin ||= canReachWin.has(edge.to);
    groups.set(signature, record);
  }
  return [...groups.values()].sort((a, b) => a.witnessPrefix.length - b.witnessPrefix.length || a.action.localeCompare(b.action));
}

const initialObject = objectKey(0);
const initialObjectClosure = new Set([0]);
const closureQueue = [0];
for (let i = 0; i < closureQueue.length; i += 1) {
  for (const edge of outgoing.get(closureQueue[i]!) ?? []) {
    if (objectKey(edge.to) !== initialObject || initialObjectClosure.has(edge.to)) continue;
    initialObjectClosure.add(edge.to);
    closureQueue.push(edge.to);
  }
}
const firstObjectEdges = graph.edges.filter((edge) => initialObjectClosure.has(edge.from) && objectKey(edge.to) !== initialObject);

// Win-reaching raw SCCs and condensation-path count. Walk/reversible loops collapse, but different object duties remain visible.
const adjacency = new Map<number, number[]>();
const reverseAdjacency = new Map<number, number[]>();
for (const edge of winEdges) {
  (adjacency.get(edge.from) ?? adjacency.set(edge.from, []).get(edge.from)!).push(edge.to);
  (reverseAdjacency.get(edge.to) ?? reverseAdjacency.set(edge.to, []).get(edge.to)!).push(edge.from);
}
// Iterative Kosaraju avoids V8 recursion limits on large but finite win closures.
const visited = new Set<number>();
const finishOrder: number[] = [];
for (const root of [...canReachWin].sort((a, b) => a - b)) {
  if (visited.has(root)) continue;
  visited.add(root);
  const dfs: Array<{ state: number; cursor: number }> = [{ state: root, cursor: 0 }];
  while (dfs.length > 0) {
    const frame = dfs[dfs.length - 1]!;
    const targets = adjacency.get(frame.state) ?? [];
    if (frame.cursor < targets.length) {
      const target = targets[frame.cursor++]!;
      if (!visited.has(target)) { visited.add(target); dfs.push({ state: target, cursor: 0 }); }
    } else {
      finishOrder.push(frame.state);
      dfs.pop();
    }
  }
}
const assigned = new Set<number>();
const sccs: number[][] = [];
for (let i = finishOrder.length - 1; i >= 0; i -= 1) {
  const root = finishOrder[i]!;
  if (assigned.has(root)) continue;
  assigned.add(root);
  const component: number[] = [];
  const dfs = [root];
  while (dfs.length > 0) {
    const state = dfs.pop()!;
    component.push(state);
    for (const target of reverseAdjacency.get(state) ?? []) {
      if (assigned.has(target)) continue;
      assigned.add(target);
      dfs.push(target);
    }
  }
  sccs.push(component.sort((a, b) => a - b));
}
const sccByState = new Map<number, number>();
for (const [id, states] of sccs.entries()) for (const state of states) sccByState.set(state, id);
const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!; const to = sccByState.get(edge.to)!;
  if (from !== to) (condensation.get(from) ?? condensation.set(from, new Set()).get(from)!).add(to);
}
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
const memo = new Map<number, bigint>();
function countPaths(scc: number): bigint {
  if (winSccs.has(scc)) return 1n;
  if (memo.has(scc)) return memo.get(scc)!;
  let count = 0n;
  for (const next of condensation.get(scc) ?? []) count += countPaths(next);
  memo.set(scc, count); return count;
}
const initialScc = sccByState.get(0);
const winObjectTransitions = groupEdges(winEdges.filter((edge) => objectKey(edge.from) !== objectKey(edge.to)));
const crossSccGroups = groupEdges(winEdges.filter((edge) => sccByState.get(edge.from) !== sccByState.get(edge.to)));

const report = {
  layout: layoutPath,
  graph: { status: graph.status, states: graph.keys.length, transitions: graph.edges.length, wins: wins.size, winReachingStates: canReachWin.size, winReachingEdges: winEdges.length },
  shortest: graph.winStateIndexes.size ? { cost: Math.min(...[...graph.winStateIndexes].map((i) => graph.depthByIndex[i]!)), inputs: prefix([...graph.winStateIndexes].sort((a,b) => graph.depthByIndex[a]!-graph.depthByIndex[b]!)[0]!) } : null,
  initialObjectClosureStates: initialObjectClosure.size,
  firstObjectActions: groupEdges(firstObjectEdges),
  winScc: { count: sccs.length, pathCount: initialScc === undefined ? "0" : countPaths(initialScc).toString(), crossSccGroups },
  winReachingObjectTransitions: winObjectTransitions,
};
const output = `${JSON.stringify(report, null, 2)}\n`;
console.log(output);
await writeFile(`${layoutPath}.audit.json`, output, "utf8");
