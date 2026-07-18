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
const level: LevelDoc = {
  id: path.basename(layoutPath),
  title: path.basename(layoutPath),
  layout,
  win: pkg.mechanic.win,
};
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

const adjacency = new Map<number, Set<number>>();
for (const edge of winEdges) {
  (adjacency.get(edge.from) ?? adjacency.set(edge.from, new Set()).get(edge.from)!).add(edge.to);
}
let nextIndex = 0;
const indexes = new Map<number, number>();
const lows = new Map<number, number>();
const stack: number[] = [];
const onStack = new Set<number>();
const sccs: number[][] = [];
function strongConnect(v: number): void {
  indexes.set(v, nextIndex);
  lows.set(v, nextIndex);
  nextIndex += 1;
  stack.push(v);
  onStack.add(v);
  for (const w of adjacency.get(v) ?? []) {
    if (!indexes.has(w)) {
      strongConnect(w);
      lows.set(v, Math.min(lows.get(v)!, lows.get(w)!));
    } else if (onStack.has(w)) {
      lows.set(v, Math.min(lows.get(v)!, indexes.get(w)!));
    }
  }
  if (lows.get(v) !== indexes.get(v)) return;
  const component: number[] = [];
  while (true) {
    const w = stack.pop()!;
    onStack.delete(w);
    component.push(w);
    if (w === v) break;
  }
  sccs.push(component.sort((a, b) => a - b));
}
for (const state of [...canReachWin].sort((a, b) => a - b)) {
  if (!indexes.has(state)) strongConnect(state);
}
const sccByState = new Map<number, number>();
for (const [scc, states] of sccs.entries()) for (const state of states) sccByState.set(state, scc);

const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!;
  const to = sccByState.get(edge.to)!;
  if (from === to) continue;
  (condensation.get(from) ?? condensation.set(from, new Set()).get(from)!).add(to);
}
const initialScc = sccByState.get(0)!;
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
const sccPaths: number[][] = [];
function enumerateSccPaths(cursor: number, prefix: number[]): void {
  if (winSccs.has(cursor)) {
    sccPaths.push([...prefix, cursor]);
    return;
  }
  for (const next of [...(condensation.get(cursor) ?? [])].sort((a, b) => a - b)) {
    enumerateSccPaths(next, [...prefix, cursor]);
  }
}
enumerateSccPaths(initialScc, []);

const parent = new Map<number, Edge>();
for (const edge of graph.edges) {
  if (graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1 && !parent.has(edge.to)) {
    parent.set(edge.to, edge);
  }
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

type EdgeGroup = {
  fromObject: string;
  toObject: string;
  action: string;
  events: string[];
  count: number;
  witnessPrefix: string[];
};
function groupEdges(edges: Edge[]): EdgeGroup[] {
  const groups = new Map<string, EdgeGroup>();
  for (const edge of edges) {
    const record = {
      fromObject: objectKey(edge.from),
      toObject: objectKey(edge.to),
      action: edge.action,
      events: edge.events,
      count: 0,
      witnessPrefix: [...prefix(edge.from), edge.action],
    };
    const signature = JSON.stringify([record.fromObject, record.toObject, record.action, record.events]);
    const current = groups.get(signature) ?? record;
    current.count += 1;
    groups.set(signature, current);
  }
  return [...groups.values()].sort((a, b) => a.witnessPrefix.length - b.witnessPrefix.length);
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
const firstObjectEdges = graph.edges.filter(
  (edge) => initialObjectClosure.has(edge.from) && objectKey(edge.to) !== initialObject,
);

function reachesWin(allow: (edge: Edge) => boolean): boolean {
  const seen = new Set([0]);
  const queue = [0];
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    if (wins.has(state)) return true;
    for (const edge of outgoing.get(state) ?? []) {
      if (!allow(edge) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return false;
}

const anchorSuffix = "|PL:P:5,1;L:6,1|BS:B:1,7;S:1,6";
const roles = {
  initial: `C:|M:4,4;5,4;5,5${anchorSuffix}`,
  rightPushed: `C:|M:5,4;6,4;6,5${anchorSuffix}`,
  downPulled: `C:|M:5,5;6,5;6,6${anchorSuffix}`,
  cut: `C:6,7|M:5,6;6,6${anchorSuffix}`,
  final: `C:6,7|M:5,5;6,5${anchorSuffix}`,
};
const matches = (edge: Edge, from: string, to: string, action: string, event: string) =>
  objectKey(edge.from) === from && objectKey(edge.to) === to && edge.action === action && edge.events.includes(event);
const milestones = {
  rightPush: (edge: Edge) => matches(edge, roles.initial, roles.rightPushed, "right", "push_object:sticky#1"),
  firstDownPull: (edge: Edge) => matches(edge, roles.rightPushed, roles.downPulled, "down", "pull_object:sticky#1"),
  cutDownPull: (edge: Edge) => matches(edge, roles.downPulled, roles.cut, "down", "pull_object:sticky#1"),
  finalUpPull: (edge: Edge) => matches(edge, roles.cut, roles.final, "up", "pull_object:sticky#1"),
};
const counterfactuals = Object.fromEntries(Object.entries(milestones).map(([name, predicate]) => [
  `forbid_${name}`,
  reachesWin((edge) => !predicate(edge)),
]));

const crossSccGroups = groupEdges(winEdges.filter((edge) => sccByState.get(edge.from) !== sccByState.get(edge.to)));
const report = {
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    wins: wins.size,
    winReachingStates: canReachWin.size,
    winReachingEdges: winEdges.length,
  },
  winScc: {
    count: sccs.length,
    pathCount: sccPaths.length,
    paths: sccPaths,
    crossSccGroups,
  },
  firstObjectActions: groupEdges(firstObjectEdges).map((group) => ({
    ...group,
    canReachWin: canReachWin.has(graph.edges.find((edge) =>
      JSON.stringify([objectKey(edge.from), objectKey(edge.to), edge.action, edge.events]) ===
      JSON.stringify([group.fromObject, group.toObject, group.action, group.events])
    )!.to),
  })),
  winningObjectTransitions: groupEdges(winEdges.filter((edge) => objectKey(edge.from) !== objectKey(edge.to))),
  counterfactuals,
};
console.log(JSON.stringify(report, null, 2));
await writeFile(`${layoutPath}.audit.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
