import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutArg = process.argv[2];
if (!layoutArg) throw new Error("usage: analyze.ts <layout> [maxStates]");
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
  sccs.push(component);
}
for (const state of [...canReachWin]) if (!indexes.has(state)) strongConnect(state);
const sccByState = new Map<number, number>();
for (const [scc, states] of sccs.entries()) for (const state of states) sccByState.set(state, scc);
const condensation = new Map<number, Set<number>>();
for (const edge of winEdges) {
  const from = sccByState.get(edge.from)!;
  const to = sccByState.get(edge.to)!;
  if (from !== to) (condensation.get(from) ?? condensation.set(from, new Set()).get(from)!).add(to);
}
const winSccs = new Set([...wins].map((state) => sccByState.get(state)!));
const sourceScc = sccByState.get(0)!;
const pathMemo = new Map<number, number>();
function countPaths(scc: number): number {
  if (winSccs.has(scc)) return 1;
  if (pathMemo.has(scc)) return pathMemo.get(scc)!;
  const result = [...(condensation.get(scc) ?? [])].reduce((sum, next) => sum + countPaths(next), 0);
  pathMemo.set(scc, result);
  return result;
}

function follow(actions: string[]) {
  let state = 0;
  const steps: Array<{ action: string; from: string; to: string; events: string[] }> = [];
  for (const action of actions) {
    const edge = (outgoing.get(state) ?? []).find((candidate) => candidate.action === action);
    if (!edge) return { legal: false, state, key: graph.keys[state], win: wins.has(state), steps };
    steps.push({ action, from: graph.keys[edge.from]!, to: graph.keys[edge.to]!, events: edge.events });
    state = edge.to;
  }
  return { legal: true, state, key: graph.keys[state], win: wins.has(state), steps };
}

function reachesWin(allow: (edge: Edge) => boolean): { found: boolean; explored: number } {
  const seen = new Set([0]);
  const queue = [0];
  for (let i = 0; i < queue.length; i += 1) {
    const state = queue[i]!;
    if (wins.has(state)) return { found: true, explored: seen.size };
    for (const edge of outgoing.get(state) ?? []) {
      if (!allow(edge) || seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push(edge.to);
    }
  }
  return { found: false, explored: seen.size };
}

const anchorSuffix = "|PL:P:5,1;L:6,1|BS:B:1,7;S:1,6";
const roles = {
  initial: `C:|M:4,4;5,4;5,5${anchorSuffix}`,
  firstRightPush: `C:|M:5,4;6,4;6,5${anchorSuffix}`,
  choiceStanceA: `C:|M:5,5;6,5;6,6${anchorSuffix}`,
  choiceStanceB: `C:|M:6,5;7,5;7,6${anchorSuffix}`,
  correctCut: `C:6,7|M:5,6;6,6${anchorSuffix}`,
  wrongCut: `C:7,7|M:6,6;7,6${anchorSuffix}`,
  crateOnLowerGoal: `C:7,7|M:5,6;6,6${anchorSuffix}`,
  firstArmReturn: `C:7,7|M:5,5;6,5${anchorSuffix}`,
  final: `C:7,7|M:5,4;6,4${anchorSuffix}`,
};

const canonicalInputs = ["down", "right", "down", "right", "down", "right", "down", "down", "right", "up", "right", "up", "up", "left", "left", "up", "up"];
const trialPrefix = ["down", "right", "down", "right", "down", "right", "down", "left", "up"];
const trialForwardInputs = [...trialPrefix, "right"];
const trialReturnInputs = [...trialForwardInputs, "left"];
const trialThenWinInputs = [...trialReturnInputs, "down", "right", "down", "right", "up", "right", "up", "up", "left", "left", "up", "up"];
const wrongCutInputs = [...trialForwardInputs, "down"];

const trialStart = follow(trialPrefix);
const trialForward = follow(trialForwardInputs);
const trialReturn = follow(trialReturnInputs);
const wrongCut = follow(wrongCutInputs);
const wrongCutStates = graph.keys
  .map((key, index) => ({ key, index }))
  .filter(({ index }) => objectKey(index) === roles.wrongCut);

const isTransition = (edge: Edge, from: string, to: string) => objectKey(edge.from) === from && objectKey(edge.to) === to;
const counterfactuals = {
  forbid_first_right_push: reachesWin((edge) => !isTransition(edge, roles.initial, roles.firstRightPush)),
  forbid_correct_cut_from_A: reachesWin((edge) => !isTransition(edge, roles.choiceStanceA, roles.correctCut)),
  forbid_crate_pull_to_lower_goal: reachesWin((edge) => !isTransition(edge, roles.correctCut, roles.crateOnLowerGoal)),
  forbid_first_arm_return: reachesWin((edge) => !isTransition(edge, roles.crateOnLowerGoal, roles.firstArmReturn)),
  forbid_final_arm_return: reachesWin((edge) => !isTransition(edge, roles.firstArmReturn, roles.final)),
};

const crossSccObjectEdges = winEdges
  .filter((edge) => sccByState.get(edge.from) !== sccByState.get(edge.to) && objectKey(edge.from) !== objectKey(edge.to))
  .map((edge) => ({
    action: edge.action,
    events: edge.events,
    fromObject: objectKey(edge.from),
    toObject: objectKey(edge.to),
  }));
const crossSccGroups = [...new Map(crossSccObjectEdges.map((edge) => [JSON.stringify(edge), edge])).values()];

const result = {
  layout: layoutPath,
  graph: {
    status: graph.status,
    states: graph.keys.length,
    transitions: graph.edges.length,
    wins: wins.size,
    winReachingStates: canReachWin.size,
    winReachingEdges: winEdges.length,
    rawSccCount: sccs.length,
    sourceToWinCondensationPathCount: countPaths(sourceScc),
  },
  roles,
  canonical: { inputs: canonicalInputs, replay: follow(canonicalInputs) },
  reversibleTrial: {
    setupInputs: trialPrefix,
    startKey: trialStart.key,
    forwardAction: "right",
    forwardEvents: trialForward.steps.at(-1)?.events,
    shiftedKey: trialForward.key,
    returnAction: "left",
    returnEvents: trialReturn.steps.at(-1)?.events,
    returnedKey: trialReturn.key,
    exactFullStateReturn: trialStart.legal && trialForward.legal && trialReturn.legal && trialStart.key === trialReturn.key,
    trialThenWin: follow(trialThenWinInputs),
  },
  wrongStanceCommit: {
    inputs: wrongCutInputs,
    replay: wrongCut,
    expectedObjectKey: roles.wrongCut,
    reachesExpectedObject: wrongCut.legal && objectKey(wrongCut.state) === roles.wrongCut,
    reachableStateCountWithWrongCutObject: wrongCutStates.length,
    anyWrongCutStateCanReachWin: wrongCutStates.some(({ index }) => canReachWin.has(index)),
  },
  counterfactuals,
  crossSccObjectGroups: crossSccGroups,
};

const outputPath = path.join(path.dirname(layoutPath), "analysis.json");
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
