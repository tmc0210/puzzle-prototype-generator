import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(import.meta.dirname, "../../../../../..");
const layoutFile = process.argv[2] ?? "cathedral_phase_selector_v1.txt";
const layoutPath = path.join(import.meta.dirname, layoutFile);
const layoutId = path.basename(layoutFile, path.extname(layoutFile));
const maxStates = 50_000;
const pkg = await loadPrototypePackage(path.join(repoRoot, "prototypes/reality_anchor"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = await readFile(layoutPath, "utf8");
const level: LevelDoc = { id: layoutId, title: layoutId, layout, win: pkg.mechanic.win };
const initial = adapter.parseLevel(level);
const winCondition = level.win ?? pkg.mechanic.win;
const graph = enumerateRuntimeGraph(runtime, initial, winCondition, { winCondition }, { maxStates, terminalizeWins: true });

const withoutPlayer = (key: string): string => key.replace(/^Ply:[^|]+\|/, "");
const objectKeys = graph.keys.map(withoutPlayer);
const incoming = new Map<number, typeof graph.edges>();
const outgoing = new Map<number, typeof graph.edges>();
for (const edge of graph.edges) {
  (incoming.get(edge.to) ?? incoming.set(edge.to, []).get(edge.to)!).push(edge);
  (outgoing.get(edge.from) ?? outgoing.set(edge.from, []).get(edge.from)!).push(edge);
}
const canReachKnownWin = new Set<number>(graph.winStateIndexes);
const queue = [...graph.winStateIndexes];
for (let head = 0; head < queue.length; head += 1) {
  for (const edge of incoming.get(queue[head]!) ?? []) {
    if (!canReachKnownWin.has(edge.from)) {
      canReachKnownWin.add(edge.from);
      queue.push(edge.from);
    }
  }
}

const wins = [...graph.winStateIndexes].sort((a, b) => a - b).map((stateIndex) => ({
  stateIndex,
  depth: graph.depthByIndex[stateIndex],
  player: graph.keys[stateIndex]!.match(/^Ply:([^|]+)/)?.[1] ?? "unknown",
  objectKey: objectKeys[stateIndex],
  incoming: (incoming.get(stateIndex) ?? []).filter((edge) => !graph.winStateIndexes.has(edge.from)).map((edge) => ({
    from: edge.from,
    action: edge.action,
    events: edge.events,
    beforeObjectKey: objectKeys[edge.from],
  })),
}));
const parentEdge = new Map<number, (typeof graph.edges)[number]>();
for (const edge of graph.edges) {
  if (!parentEdge.has(edge.to) && graph.depthByIndex[edge.to] === graph.depthByIndex[edge.from]! + 1) {
    parentEdge.set(edge.to, edge);
  }
}
const pathTo = (stateIndex: number) => {
  const reversed: (typeof graph.edges)[number][] = [];
  let cursor = stateIndex;
  while (cursor !== 0) {
    const edge = parentEdge.get(cursor);
    if (!edge) break;
    reversed.push(edge);
    cursor = edge.from;
  }
  return reversed.reverse();
};
const finalTransitionClasses = new Set(wins.flatMap((win) => win.incoming.map((edge) => JSON.stringify({
  action: edge.action,
  events: edge.events,
  beforeObjectKey: edge.beforeObjectKey,
  afterObjectKey: win.objectKey,
}))));
const samplesByFinalEventSignature = new Map<string, unknown>();
for (const win of wins) {
  for (const edge of win.incoming) {
    const signature = edge.events.join(",");
    if (samplesByFinalEventSignature.has(signature)) continue;
    const pathEdges = pathTo(win.stateIndex);
    samplesByFinalEventSignature.set(signature, {
      depth: win.depth,
      inputs: pathEdges.map((pathEdge) => pathEdge.action),
      eventfulSteps: pathEdges.map((pathEdge, index) => ({ step: index + 1, action: pathEdge.action, events: pathEdge.events })).filter((step) => !step.events.includes("walk")),
      beforeRender: adapter.renderState(graph.states[edge.from]!).trimEnd(),
      afterRender: adapter.renderState(graph.states[win.stateIndex]!).trimEnd(),
    });
  }
}
const samplesByFirstObjectAction = new Map<string, unknown>();
for (const win of wins) {
  const pathEdges = pathTo(win.stateIndex);
  const first = pathEdges.find((edge) => !edge.events.includes("walk"));
  if (!first || samplesByFirstObjectAction.has(first.action)) continue;
  samplesByFirstObjectAction.set(first.action, {
    depth: win.depth,
    firstEvents: first.events,
    inputs: pathEdges.map((edge) => edge.action),
    eventfulSteps: pathEdges.map((edge, index) => ({ step: index + 1, action: edge.action, events: edge.events })).filter((step) => !step.events.includes("walk")),
  });
}

const initialObjectKey = objectKeys[0]!;
const initialObjectIndexes = graph.keys.map((_, index) => index).filter((index) => objectKeys[index] === initialObjectKey);
const openingCommitments = new Map<string, {
  action: string;
  events: string[];
  toObjectKey: string;
  knownWinReachable: boolean;
  count: number;
}>();
for (const from of initialObjectIndexes) {
  for (const edge of outgoing.get(from) ?? []) {
    if (objectKeys[edge.to] === initialObjectKey) continue;
    const signature = JSON.stringify({ action: edge.action, events: edge.events, toObjectKey: objectKeys[edge.to] });
    const prior = openingCommitments.get(signature);
    if (prior) {
      prior.count += 1;
      prior.knownWinReachable ||= canReachKnownWin.has(edge.to);
    } else {
      openingCommitments.set(signature, {
        action: edge.action,
        events: edge.events,
        toObjectKey: objectKeys[edge.to]!,
        knownWinReachable: canReachKnownWin.has(edge.to),
        count: 1,
      });
    }
  }
}

const result = {
  graph: {
    status: graph.status,
    reason: graph.reason,
    reachableStates: graph.keys.length,
    legalTransitions: graph.edges.length,
    rawWinningStates: wins.length,
    maxStates,
    terminalizeWins: true,
  },
  summary: {
    winningObjectStateClasses: new Set(wins.map((win) => win.objectKey)).size,
    finalTransitionClassesIncludingObjectStates: finalTransitionClasses.size,
    finalActions: [...new Set(wins.flatMap((win) => win.incoming.map((edge) => edge.action)))],
    finalEventSignatures: [...new Set(wins.flatMap((win) => win.incoming.map((edge) => edge.events.join(","))))],
    discoveredStatesThatCanReachKnownWin: canReachKnownWin.size,
  },
  openingCommitments: [...openingCommitments.values()],
  samplesByFinalEventSignature: Object.fromEntries(samplesByFinalEventSignature),
  samplesByFirstObjectAction: Object.fromEntries(samplesByFirstObjectAction),
  wins,
};
await writeFile(path.join(import.meta.dirname, `analysis_${layoutId}.json`), `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ graph: result.graph, summary: result.summary, openingCommitments: result.openingCommitments.map(({ action, events, knownWinReachable, count }) => ({ action, events, knownWinReachable, count })) }, null, 2));
