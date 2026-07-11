import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_ANCHOR_BRAID_OPENING_STARTS";
const maxStates = Number(process.argv[4] ?? 300_000);

if (!layoutPath) {
  throw new Error("Usage: probe_anchor_braid_opening_starts.ts <layout-file> <id> [maxStates]");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

type Graph = RuntimeGraph<RealityAnchorState, InputId>;

const initial = adapter.parseLevel(level) as RealityAnchorState;
const baselineGraph = completeGraph(initial, `${id}:baseline`);
const baselineTarjan = tarjan(baselineGraph);
const baselineInitialScc = baselineTarjan.sccOf[0]!;
const baselineMembers = new Set(baselineTarjan.components[baselineInitialScc]!);
const baselineMemberKeys = new Set([...baselineMembers].map((index) => baselineGraph.keys[index]!));
const baselineKeySet = new Set(baselineGraph.keys);
const baselineWinKeys = new Set([...baselineGraph.winStateIndexes].map((index) => baselineGraph.keys[index]!));
const baselineSolution = solve(initial);

const playerPositionsSeen = new Map<string, Point>();
for (const index of baselineMembers) {
  const player = baselineGraph.states[index]!.player;
  playerPositionsSeen.set(`${player.x},${player.y}`, { ...player });
}

const candidateStates = [...playerPositionsSeen.values()]
  .map((player) => ({ ...initial, player }))
  .filter((state) => baselineMemberKeys.has(runtime.key(state)))
  .sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x);

const candidates = candidateStates.map((state) => analyzeCandidate(state));
const current = candidates.find((candidate) =>
  candidate.candidateStartPosition[0] === initial.player.x &&
  candidate.candidateStartPosition[1] === initial.player.y
);
if (!current) throw new Error(`${id}: current start was not enumerated`);

const report = {
  id,
  workflow: "reality_anchor_opening_comfort_check",
  coordinateSystem: "zero_based_[x,y]",
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  budget: { maxStates },
  enumerationRule: {
    source: "baseline full graph initial SCC",
    playerPositionsSeenInInitialScc: playerPositionsSeen.size,
    candidateStartsWithOriginalObjectsAndStateInInitialScc: candidates.length,
    objectsTerrainGoalsChanged: false,
  },
  baseline: {
    candidateStartPosition: [initial.player.x, initial.player.y],
    shortestSolution: baselineSolution.cost,
    reachableStates: baselineGraph.keys.length,
    legalTransitions: baselineGraph.edges.length,
    winningStates: baselineGraph.winStateIndexes.size,
    initialSccSize: baselineMembers.size,
  },
  currentStart: current,
  candidates,
};

const outBase = path.join("prototypes/reality_anchor/reports", `anchor_braid_opening_starts_${id}`);
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.json`);
console.log(`Wrote ${outBase}.md`);

function analyzeCandidate(state: RealityAnchorState) {
  const graph = completeGraph(state, `${id}:${state.player.x},${state.player.y}`);
  const solution = solve(state);
  const scc = tarjan(graph);
  const initialScc = scc.sccOf[0]!;
  const members = new Set(scc.components[initialScc]!);
  const routes = internalRoutes(graph, members);
  const distances = routes.distances;
  const winReachable = reverseWinReachable(graph);
  const exits = graph.edges
    .filter((edge) => members.has(edge.from) && !members.has(edge.to))
    .map((edge) => ({
      sourceKey: graph.keys[edge.from]!,
      sourceDistance: distances[edge.from]!,
      sourceInputs: routes.inputsByIndex[edge.from]!,
      sourceLayout: adapter.renderState(graph.states[edge.from]!),
      action: edge.action,
      events: edge.events,
      targetScc: scc.sccOf[edge.to]!,
      winReaching: winReachable.has(edge.to),
    }))
    .sort((a, b) =>
      a.sourceDistance - b.sourceDistance ||
      Number(b.winReaching) - Number(a.winReaching) ||
      a.action.localeCompare(b.action)
    );
  const winDistances = exits.filter((exit) => exit.winReaching).map((exit) => exit.sourceDistance);
  const deadDistances = exits.filter((exit) => !exit.winReaching).map((exit) => exit.sourceDistance);
  const nearestWinDistance = winDistances.length > 0 ? Math.min(...winDistances) : null;
  const firstStepLegalEvents = Object.fromEntries(
    runtime.actions(state, { winCondition: pkg.mechanic.win }).flatMap((action) => {
      const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) return [];
      const to = graph.indexByKey.get(runtime.key(step.state));
      return [[action, {
        events: step.events,
        irreversible: to === undefined ? null : scc.sccOf[to] !== initialScc,
      }]];
    }),
  );
  const candidateKeySet = new Set(graph.keys);
  const candidateWinKeys = new Set([...graph.winStateIndexes].map((index) => graph.keys[index]!));
  const coreGate = probeMixedCore(state);
  const solutionEventCounts = countEvents(solution.events);

  return {
    candidateStartPosition: [state.player.x, state.player.y],
    isCurrentStart: state.player.x === initial.player.x && state.player.y === initial.player.y,
    startLayout: adapter.renderState(state),
    shortestSolution: solution.cost,
    shortestSolutionDelta: solution.cost - baselineSolution.cost,
    shortestInputs: solution.inputs,
    initialSccSize: members.size,
    initialExitCount: new Set(exits.map((exit) => exit.targetScc)).size,
    initialWinExitCount: new Set(exits.filter((exit) => exit.winReaching).map((exit) => exit.targetScc)).size,
    initialDeadExitCount: new Set(exits.filter((exit) => !exit.winReaching).map((exit) => exit.targetScc)).size,
    initialExitSourceDistances: exits.map((exit) => exit.sourceDistance),
    initialWinExitSourceDistances: winDistances,
    initialDeadExitSourceDistances: deadDistances,
    nearestIrreversibleExitDistance: exits.length > 0
      ? Math.min(...exits.map((exit) => exit.sourceDistance))
      : null,
    nearestWinReachingExitDistance: nearestWinDistance,
    deadExitsBeforeFirstWinExit: nearestWinDistance === null
      ? null
      : new Set(
        exits
          .filter((exit) => !exit.winReaching && exit.sourceDistance < nearestWinDistance)
          .map((exit) => exit.targetScc),
      ).size,
    firstStepLegalEvents,
    walkOnlyDistanceFromCurrentStart: walkOnlyDistance(
      baselineGraph,
      runtime.key(initial),
      runtime.key(state),
      baselineMembers,
    ),
    graph: {
      status: graph.status,
      reachableStates: graph.keys.length,
      legalTransitions: graph.edges.length,
      winningStates: graph.winStateIndexes.size,
    },
    shortestSolutionCoreEventCounts: solutionEventCounts,
    whetherCoreChainPreserved:
      coreGate.status === "complete" &&
      !coreGate.foundViolation &&
      setEqual(candidateKeySet, baselineKeySet) &&
      setEqual(candidateWinKeys, baselineWinKeys),
    coreChainProof: {
      candidateInitialInBaselineInitialScc: baselineMemberKeys.has(runtime.key(state)),
      reachableStateKeySetEqualToBaseline: setEqual(candidateKeySet, baselineKeySet),
      winningStateKeySetEqualToBaseline: setEqual(candidateWinKeys, baselineWinKeys),
      mixedCoreViolationProbe: coreGate,
    },
    exits,
  };
}

function completeGraph(state: RealityAnchorState, label: string): Graph {
  const graph = enumerateRuntimeGraph(
    runtime,
    state,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates },
  ) as Graph;
  if (graph.status !== "complete") {
    throw new Error(`${label}: graph ${graph.status}: ${graph.reason ?? "unknown"}`);
  }
  return graph;
}

function solve(state: RealityAnchorState) {
  const result = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth: 200,
  });
  if (!result.found) {
    throw new Error(`${id}:${state.player.x},${state.player.y}: solver ${result.searchStatus}`);
  }
  return result;
}

function probeMixedCore(initialState: RealityAnchorState): {
  foundViolation: boolean;
  status: SearchStatus;
  exploredProductStates: number;
  reason: string;
} {
  const point = (value: Point | undefined, x: number, y: number): boolean =>
    value?.x === x && value.y === y;
  const anchorsAt = (
    state: RealityAnchorState,
    pl: [number, number, number, number],
    bs: [number, number, number, number],
  ): boolean => Boolean(
    state.pushPullAnchor && state.boxStickyAnchor &&
    point(state.pushPullAnchor.push, pl[0], pl[1]) &&
    point(state.pushPullAnchor.pull, pl[2], pl[3]) &&
    point(state.boxStickyAnchor.sticky, bs[0], bs[1]) &&
    point(state.boxStickyAnchor.box, bs[2], bs[3])
  );
  const bsLeft = (state: RealityAnchorState): boolean =>
    anchorsAt(state, [2, 4, 3, 4], [3, 2, 3, 3]);
  const mixedUp = (state: RealityAnchorState): boolean =>
    anchorsAt(state, [2, 3, 3, 3], [3, 1, 3, 2]);
  const plUp = (state: RealityAnchorState): boolean =>
    anchorsAt(state, [2, 2, 3, 2], [4, 1, 4, 2]);
  const final = (state: RealityAnchorState): boolean =>
    anchorsAt(state, [1, 2, 2, 2], [3, 1, 3, 2]);
  const has = (events: string[], pattern: string): boolean =>
    events.some((event) => eventMatchesPattern(event, pattern));
  const hasAll = (events: string[], patterns: string[]): boolean =>
    patterns.every((pattern) => has(events, pattern));
  const middleMixed = (
    before: RealityAnchorState,
    action: InputId,
    after: RealityAnchorState,
    events: string[],
  ): boolean =>
    bsLeft(before) && action === "up" && mixedUp(after) && hasAll(events, [
      "push_object:push_pull_anchor",
      "force_chain:n2",
      "anchor_boundary_shift:push_pull",
      "anchor_boundary_shift:box_sticky",
    ]);
  const finalMixed = (
    before: RealityAnchorState,
    action: InputId,
    after: RealityAnchorState,
    events: string[],
  ): boolean =>
    plUp(before) && action === "left" && final(after) && hasAll(events, [
      "pull_object:box_sticky_anchor",
      "force_chain:n2",
      "anchor_boundary_shift:push_pull",
      "anchor_boundary_shift:box_sticky",
    ]);

  const queue: Array<{
    state: RealityAnchorState;
    count: number;
    middleSeen: boolean;
    finalSeen: boolean;
  }> = [{ state: initialState, count: 0, middleSeen: false, finalSeen: false }];
  const visited = new Set<string>([`${runtime.key(initialState)}|0|0|0`]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    if (visited.size > maxStates) {
      return {
        foundViolation: false,
        status: "exhausted",
        exploredProductStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
      };
    }
    const current = queue[cursor]!;
    if (runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.count < 2 || !current.middleSeen || !current.finalSeen) {
        return {
          foundViolation: true,
          status: "found",
          exploredProductStates: visited.size,
          reason: "winning path skipped n2>=2, the middle mixed transition, or the final mixed transition",
        };
      }
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const next = step.state as RealityAnchorState;
      const increment = step.events.filter((event) => eventMatchesPattern(event, "force_chain:n2")).length;
      const count = Math.min(2, current.count + increment);
      const middleSeen = current.middleSeen || middleMixed(current.state, action, next, step.events);
      const finalSeen = current.finalSeen || finalMixed(current.state, action, next, step.events);
      const key = `${runtime.key(next)}|${count}|${middleSeen ? 1 : 0}|${finalSeen ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: next, count, middleSeen, finalSeen });
    }
  }
  return {
    foundViolation: false,
    status: "complete",
    exploredProductStates: visited.size,
    reason: "no winning path skipped either mixed transition or used fewer than two force_chain:n2 events",
  };
}

function countEvents(events: string[]): Record<string, number> {
  const wanted = [
    "force_chain:n2",
    "anchor_boundary_shift:push_pull",
    "anchor_boundary_shift:box_sticky",
    "push_object:push_pull_anchor",
    "pull_object:push_pull_anchor",
    "push_object:box_sticky_anchor",
    "pull_object:box_sticky_anchor",
  ];
  return Object.fromEntries(wanted.map((pattern) => [
    pattern,
    events.filter((event) => eventMatchesPattern(event, pattern)).length,
  ]));
}

function tarjan(graph: Graph): { sccOf: number[]; components: number[][] } {
  const adjacency = Array.from({ length: graph.keys.length }, () => [] as number[]);
  for (const edge of graph.edges) adjacency[edge.from]!.push(edge.to);
  const index = new Array<number>(graph.keys.length).fill(-1);
  const low = new Array<number>(graph.keys.length).fill(-1);
  const stack: number[] = [];
  const onStack = new Array<boolean>(graph.keys.length).fill(false);
  const sccOf = new Array<number>(graph.keys.length).fill(-1);
  const components: number[][] = [];
  let nextIndex = 0;

  function visit(vertex: number): void {
    index[vertex] = nextIndex;
    low[vertex] = nextIndex;
    nextIndex += 1;
    stack.push(vertex);
    onStack[vertex] = true;
    for (const next of adjacency[vertex]!) {
      if (index[next] === -1) {
        visit(next);
        low[vertex] = Math.min(low[vertex]!, low[next]!);
      } else if (onStack[next]) {
        low[vertex] = Math.min(low[vertex]!, index[next]!);
      }
    }
    if (low[vertex] !== index[vertex]) return;
    const component: number[] = [];
    while (true) {
      const member = stack.pop()!;
      onStack[member] = false;
      sccOf[member] = components.length;
      component.push(member);
      if (member === vertex) break;
    }
    components.push(component);
  }

  for (let vertex = 0; vertex < graph.keys.length; vertex += 1) {
    if (index[vertex] === -1) visit(vertex);
  }
  return { sccOf, components };
}

function internalRoutes(
  graph: Graph,
  members: Set<number>,
): { distances: number[]; inputsByIndex: InputId[][] } {
  const distances = new Array<number>(graph.keys.length).fill(Number.POSITIVE_INFINITY);
  const inputsByIndex = Array.from({ length: graph.keys.length }, () => [] as InputId[]);
  distances[0] = 0;
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    for (const edge of graph.edges) {
      if (edge.from !== from || !members.has(edge.to)) continue;
      const to = edge.to;
      if (Number.isFinite(distances[to])) continue;
      distances[to] = distances[from]! + 1;
      inputsByIndex[to] = [...inputsByIndex[from]!, edge.action];
      queue.push(to);
    }
  }
  return { distances, inputsByIndex };
}

function reverseWinReachable(graph: Graph): Set<number> {
  const reverse = Array.from({ length: graph.keys.length }, () => [] as number[]);
  for (const edge of graph.edges) reverse[edge.to]!.push(edge.from);
  const seen = new Set<number>(graph.winStateIndexes);
  const queue = [...seen];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const previous of reverse[queue[cursor]!]!) {
      if (seen.has(previous)) continue;
      seen.add(previous);
      queue.push(previous);
    }
  }
  return seen;
}

function walkOnlyDistance(
  graph: Graph,
  fromKey: string,
  toKey: string,
  allowed: Set<number>,
): number | null {
  const from = graph.indexByKey.get(fromKey);
  const to = graph.indexByKey.get(toKey);
  if (from === undefined || to === undefined) return null;
  const distances = new Array<number>(graph.keys.length).fill(Number.POSITIVE_INFINITY);
  distances[from] = 0;
  const queue = [from];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (current === to) return distances[current]!;
    for (const edge of graph.edges) {
      if (edge.from !== current || !allowed.has(edge.to)) continue;
      if (!edge.events.every((event) => event === "walk")) continue;
      if (Number.isFinite(distances[edge.to])) continue;
      distances[edge.to] = distances[current]! + 1;
      queue.push(edge.to);
    }
  }
  return null;
}

function setEqual<T>(left: Set<T>, right: Set<T>): boolean {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# Anchor Braid Opening Starts: ${input.id}`,
    "",
    `- Enumeration: ${input.enumerationRule.candidateStartsWithOriginalObjectsAndStateInInitialScc} valid starts / ${input.enumerationRule.playerPositionsSeenInInitialScc} player positions seen in initial SCC`,
    `- Baseline graph: ${input.baseline.reachableStates} states, ${input.baseline.legalTransitions} transitions, ${input.baseline.winningStates} win`,
    `- Baseline initial SCC: ${input.baseline.initialSccSize}`,
    "",
    "| start | current | shortest | delta | SCC | nearest exit | nearest win exit | dead before win | first steps | core |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---|---:|",
    ...input.candidates.map((candidate) => {
      const firstSteps = Object.entries(candidate.firstStepLegalEvents)
        .map(([action, detail]) => `${action}:${detail.events.join("+")}${detail.irreversible ? "!" : ""}`)
        .join("; ");
      return `| [${candidate.candidateStartPosition.join(",")}] | ${candidate.isCurrentStart ? "yes" : "no"} | ${candidate.shortestSolution} | ${candidate.shortestSolutionDelta} | ${candidate.initialSccSize} | ${candidate.nearestIrreversibleExitDistance} | ${candidate.nearestWinReachingExitDistance} | ${candidate.deadExitsBeforeFirstWinExit} | ${firstSteps} | ${candidate.whetherCoreChainPreserved ? "yes" : "no"} |`;
    }),
    "",
    "`!` means that first step leaves the candidate's initial SCC.",
    "",
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
