import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../../../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
if (!layoutPath) throw new Error("usage: enumerate_start_candidates.ts <layout>");
const maxStates = 300_000;
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").trimEnd();
const level = {
  id: "RA_PRE_CONSTRUCT_V1_OPENING_ENUM",
  title: "RA_PRE_CONSTRUCT_V1_OPENING_ENUM",
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
} as const;
const initial: any = adapter.parseLevel(level as any);

function graphFrom(state: any) {
  const graph: any = enumerateRuntimeGraph(
    runtime as any,
    state,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates },
  );
  if (graph.status !== "complete") throw new Error(`graph ${graph.status}: ${graph.reason ?? "unknown"}`);
  return graph;
}

function tarjan(graph: any) {
  const outgoing: number[][] = Array.from({ length: graph.keys.length }, () => [] as number[]);
  for (const edge of graph.edges) outgoing[edge.from]!.push(edge.to);
  const index = Array(graph.keys.length).fill(-1);
  const low = Array(graph.keys.length).fill(0);
  const onStack = Array(graph.keys.length).fill(false);
  const stack: number[] = [];
  const components: number[][] = [];
  let next = 0;
  const visit = (v: number) => {
    index[v] = low[v] = next++;
    stack.push(v);
    onStack[v] = true;
    for (const w of outgoing[v]!) {
      if (index[w] === -1) {
        visit(w);
        low[v] = Math.min(low[v], low[w]);
      } else if (onStack[w]) {
        low[v] = Math.min(low[v], index[w]);
      }
    }
    if (low[v] !== index[v]) return;
    const component: number[] = [];
    while (true) {
      const w = stack.pop()!;
      onStack[w] = false;
      component.push(w);
      if (w === v) break;
    }
    components.push(component);
  };
  for (let v = 0; v < graph.keys.length; v++) if (index[v] === -1) visit(v);
  const of = Array(graph.keys.length).fill(-1);
  components.forEach((component, id) => component.forEach((v) => { of[v] = id; }));
  return { components, of };
}

function reverseWinReachable(graph: any) {
  const incoming: number[][] = Array.from({ length: graph.keys.length }, () => [] as number[]);
  for (const edge of graph.edges) incoming[edge.to]!.push(edge.from);
  const seen = new Set<number>(graph.winStateIndexes);
  const queue = [...seen];
  for (let cursor = 0; cursor < queue.length; cursor++) {
    for (const prev of incoming[queue[cursor]!]!) {
      if (seen.has(prev)) continue;
      seen.add(prev);
      queue.push(prev);
    }
  }
  return seen;
}

function distancesInside(graph: any, members: Set<number>) {
  const outgoing: any[][] = Array.from({ length: graph.keys.length }, () => [] as any[]);
  for (const edge of graph.edges) if (members.has(edge.from) && members.has(edge.to)) outgoing[edge.from]!.push(edge);
  const distance = Array(graph.keys.length).fill(null) as Array<number | null>;
  distance[0] = 0;
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const from = queue[cursor]!;
    for (const edge of outgoing[from]!) {
      if (distance[edge.to] !== null) continue;
      distance[edge.to] = distance[from]! + 1;
      queue.push(edge.to);
    }
  }
  return distance;
}

const baselineGraph = graphFrom(initial);
const baselineScc = tarjan(baselineGraph);
const initialSccId = baselineScc.of[0]!;
const initialMembers = new Set<number>(baselineScc.components[initialSccId]!);
const initialMemberKeys = new Set([...initialMembers].map((index) => baselineGraph.keys[index]!));
const positionsSeen = new Map<string, { x: number; y: number }>();
for (const index of initialMembers) {
  const player = baselineGraph.states[index]!.player;
  positionsSeen.set(`${player.x},${player.y}`, { x: player.x, y: player.y });
}

const accepted: any[] = [];
const rejected: any[] = [];
for (const player of [...positionsSeen.values()].sort((a, b) => a.y - b.y || a.x - b.x)) {
  const state = { ...initial, player };
  const key = runtime.key(state);
  if (!initialMemberKeys.has(key)) {
    rejected.push({
      playerPosition: [player.x, player.y],
      reason: "position_seen_only_in_reversible_object_configuration",
    });
    continue;
  }
  const graph = graphFrom(state);
  const scc = tarjan(graph);
  const component = scc.of[0]!;
  const members = new Set<number>(scc.components[component]!);
  const distances = distancesInside(graph, members);
  const winReachable = reverseWinReachable(graph);
  const exitEdges = graph.edges.filter((edge: any) => members.has(edge.from) && !members.has(edge.to));
  const bySourceTarget = new Map<string, any>();
  for (const edge of exitEdges) {
    const targetScc = scc.of[edge.to]!;
    const groupKey = `${graph.keys[edge.from]}=>${targetScc}`;
    const row = bySourceTarget.get(groupKey) ?? {
      sourceKey: graph.keys[edge.from],
      sourcePlayerPosition: [graph.states[edge.from]!.player.x, graph.states[edge.from]!.player.y],
      sourceDistance: distances[edge.from],
      targetScc,
      winReaching: winReachable.has(edge.to),
      actions: [],
    };
    row.actions.push({ input: edge.action, events: edge.events });
    bySourceTarget.set(groupKey, row);
  }
  const exitSources = [...bySourceTarget.values()].sort((a, b) =>
    a.sourceDistance - b.sourceDistance || Number(b.winReaching) - Number(a.winReaching) || a.targetScc - b.targetScc
  );
  const winDistances = exitSources.filter((row) => row.winReaching).map((row) => row.sourceDistance);
  const nearestWin = winDistances.length ? Math.min(...winDistances) : null;
  const deadBefore = nearestWin === null ? null : new Set(
    exitSources.filter((row) => !row.winReaching && row.sourceDistance < nearestWin).map((row) => row.targetScc),
  ).size;
  const firstStepLegalEvents: Record<string, any> = {};
  for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win }) as any[]) {
    const step: any = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const to = graph.indexByKey.get(runtime.key(step.state));
    firstStepLegalEvents[action] = {
      events: step.events,
      irreversible: to === undefined ? null : scc.of[to] !== component,
    };
  }
  const solution: any = solveWithRuntime(runtime as any, state, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth: 200,
  });
  if (!solution.found) throw new Error(`solver failed at ${player.x},${player.y}: ${solution.searchStatus}`);
  const eventSet = new Set<string>(solution.events);
  const keySetEqual = graph.keys.length === baselineGraph.keys.length && graph.keys.every((key: string) => baselineGraph.indexByKey.has(key));
  accepted.push({
    candidateStartPosition: [player.x, player.y],
    isCurrentStart: player.x === initial.player.x && player.y === initial.player.y,
    startLayout: adapter.renderState(state),
    shortestSolutionCost: solution.cost,
    shortestInputs: solution.inputs,
    shortestEvents: solution.events,
    graph: { status: graph.status, reachableStates: graph.keys.length, legalTransitions: graph.edges.length, winningStates: graph.winStateIndexes.size },
    initialSccSize: members.size,
    initialExitCount: new Set(exitSources.map((row) => row.targetScc)).size,
    initialExitSourceDistances: exitSources.map((row) => row.sourceDistance),
    initialWinExitSourceDistances: winDistances,
    nearestIrreversibleExitDistance: exitSources.length ? Math.min(...exitSources.map((row) => row.sourceDistance)) : null,
    nearestWinReachingExitDistance: nearestWin,
    deadExitsBeforeFirstWinExit: deadBefore,
    firstStepLegalEvents,
    whetherCoreChainPreserved:
      keySetEqual &&
      eventSet.has("sticky_merge:n1") &&
      eventSet.has("force_chain:n2") &&
      eventSet.has("anchor_boundary_shift:box_sticky"),
    reachableKeySetEqualToBaseline: keySetEqual,
    exitSources,
  });
}

console.log(JSON.stringify({
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  budget: { maxStates },
  baseline: {
    graph: { status: baselineGraph.status, reachableStates: baselineGraph.keys.length, legalTransitions: baselineGraph.edges.length, winningStates: baselineGraph.winStateIndexes.size },
    initialSccStateCount: initialMembers.size,
    playerPositionsSeenInInitialScc: positionsSeen.size,
  },
  enumerationRule: "dedupe player positions seen in original initial SCC; retain only original-object states that remain members of that SCC",
  acceptedCandidateCount: accepted.length,
  rejectedPositionCount: rejected.length,
  rejectedPositions: rejected,
  candidates: accepted,
}, null, 2));
