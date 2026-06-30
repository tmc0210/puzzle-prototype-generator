import type { Solution, WinCondition } from "./types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "./puzzleRuntime.js";

export type AgencyAnalysisOptions = RuntimeSearchOptions & {
  maxTransitions?: number;
};

export type AgencyRegionSummary = {
  regionId: number;
  stateCount: number;
  internalBidirectionalTransitionCount: number;
  distanceToWin: number | null;
  commitmentCount: number;
  viableCommitmentCount: number;
  deadCommitmentCount: number;
  progressCommitmentCount: number;
  optimalCommitmentCount: number;
  isWinning: boolean;
  canReachWin: boolean;
};

export type AgencySolutionRegionEntry = {
  regionId: number;
  enteredAtStep: number;
};

export type AgencySolutionBranchSummary = AgencyRegionSummary & {
  solutionNextRegion: number | null;
  forcedCommitment: boolean;
  forcedViableProgress: boolean;
  forcedOptimalProgress: boolean;
};

export type AgencyDecisionStep = {
  step: number;
  input: string | null;
  events: string[];
  regionId: number | null;
  previousRegionId: number | null;
  nextSolutionRegionId: number | null;
  enteredNewRegion: boolean;
  solutionTakesCommitmentNext: boolean;
  distanceToWin: number | null;
  commitmentCount: number | null;
  viableCommitmentCount: number | null;
  deadCommitmentCount: number | null;
  progressCommitmentCount: number | null;
  optimalCommitmentCount: number | null;
  nextSolutionIsViable: boolean | null;
  nextSolutionIsProgress: boolean | null;
  nextSolutionIsOptimal: boolean | null;
  forcedViableChoice: boolean | null;
  forcedOptimalChoice: boolean | null;
};

export type SccPathEntry = {
  sccId: number;
  enteredAtStep: number;
};

export type SccNodeSummary = {
  sccId: number;
  stateCount: number;
  representativeStateKey: string;
  isInitial: boolean;
  isWinning: boolean;
  canReachWin: boolean;
  distanceToWin: number | null;
  incomingCount: number;
  outgoingCount: number;
  winReachableIncomingCount: number;
  winReachableOutgoingCount: number;
  deadOutgoingCount: number;
  onSolutionPath: boolean;
  enteredAtStep?: number;
};

export type SccSolutionBranchSummary = SccNodeSummary & {
  solutionNextSccId: number | null;
  forcedWinContinuation: boolean;
};

export type SccHandoffReading =
  | "scripted_trivial_scc"
  | "scripted_same_state_handoff"
  | "has_reposition_room";

export type SccHandoffSummary = {
  fromSccId: number;
  toSccId: number;
  sourceEnteredAtStep: number;
  exitActionStep: number;
  input: string | null;
  events: string[];
  sourceStateCount: number;
  sourceEntryStateKey: string;
  exitSourceStateKey: string;
  entryEqualsExitSource: boolean;
  trivialSourceScc: boolean;
  forcedWinContinuation: boolean;
  reading: SccHandoffReading;
};

export type SccHandoffProfile = {
  scope: "returned_solution";
  handoffCount: number;
  scriptedHandoffCount: number;
  trivialSourceSccCount: number;
  sameEntryExitStateCount: number;
  forcedScriptedHandoffCount: number;
  maxConsecutiveScriptedHandoffs: number;
  handoffs: SccHandoffSummary[];
};

export type SccAnalysis = {
  condensationRule: "strongly_connected_components";
  sccCount: number;
  sccEdgeCount: number;
  initialSccId: number;
  winningSccCount: number;
  winReachableSccCount: number;
  winContinuationBranchingSccCount: number;
  winContinuationMergingSccCount: number;
  winSubgraphShape: "one_win_continuation_per_scc" | "branching_win_dag" | "no_win_path";
  solutionSccPath: SccPathEntry[];
  solutionIrreversibleStepCount: number;
  forcedWinContinuationPrefixLength: number;
  initialScc: SccNodeSummary;
  solutionPathBranches: SccSolutionBranchSummary[];
  handoffProfile: SccHandoffProfile;
};

export type AgencyAnalysis = {
  status: "complete" | "exhausted" | "unknown";
  reason?: string;
  compressionRule: "bidirectional_edges";
  reachableStateCount: number;
  legalTransitionCount: number;
  compressedRegionCount?: number;
  bidirectionalTransitionCount?: number;
  commitmentTransitionCount?: number;
  winningRegionCount?: number;
  initialRegion?: AgencyRegionSummary;
  solutionRegionPath?: AgencySolutionRegionEntry[];
  forcedCommitmentPrefixLength?: number;
  forcedViablePrefixLength?: number;
  forcedOptimalPrefixLength?: number;
  branchCountsOnSolutionPath?: AgencySolutionBranchSummary[];
  decisionSteps?: AgencyDecisionStep[];
  scc?: SccAnalysis;
  budget: {
    maxStates: number;
    maxTransitions?: number;
    maxDepth?: number;
  };
};

type Edge<Action extends string> = {
  from: number;
  to: number;
  action: Action;
  events: string[];
};

type QueueItem<State> = {
  index: number;
  state: State;
  depth: number;
};

type ReplayedSolutionStep<Action extends string> = {
  step: number;
  input: Action | null;
  events: string[];
  key: string;
};

export function analyzeAgencyWithRuntime<
  State,
  Action extends string,
  Options extends RuntimeSearchOptions,
>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  solution: Omit<Solution, "inputs"> & { inputs: Action[] },
  options: Options & AgencyAnalysisOptions,
): AgencyAnalysis {
  const maxStates = options.maxStates ?? 100_000;
  const maxTransitions = options.maxTransitions;
  const maxDepth = options.maxDepth;
  const winCondition = options.winCondition ?? runtime.defaultWin;
  const graph = enumerateGraph(runtime, initialState, winCondition, options, {
    maxStates,
    maxTransitions,
    maxDepth,
  });

  if (graph.status !== "complete") {
    return {
      status: graph.status,
      reason: graph.reason,
      compressionRule: "bidirectional_edges",
      reachableStateCount: graph.keys.length,
      legalTransitionCount: graph.edges.length,
      budget: { maxStates, maxTransitions, maxDepth },
    };
  }

  const regions = buildBidirectionalRegions(graph.keys.length, graph.edges);
  const regionGraph = buildRegionGraph(regions.regionOfState, regions.regionCount, graph.edges);
  const winningRegions = new Set<number>(
    [...graph.winStateIndexes].map((stateIndex) => regions.regionOfState[stateIndex]!),
  );
  const distanceToWin = computeRegionDistancesToWin(regionGraph.reverseOutgoing, winningRegions);
  const winReachableRegions = new Set<number>();
  for (const [regionId, distance] of distanceToWin.entries()) {
    if (distance !== null) {
      winReachableRegions.add(regionId);
    }
  }
  const regionSummaries = summarizeRegions({
    regionCount: regions.regionCount,
    regionSizes: regions.regionSizes,
    internalBidirectionalTransitionCounts: regions.internalBidirectionalTransitionCounts,
    outgoing: regionGraph.outgoing,
    winningRegions,
    winReachableRegions,
    distanceToWin,
  });

  const initialRegionId = regions.regionOfState[0]!;
  const replayedSolution = replaySolution(runtime, initialState, solution.inputs, options, winCondition);
  const solutionRegionPath = compressSolutionRegions(
    replayedSolution
      .map((step) => graph.indexByKey.get(step.key))
      .filter((index): index is number => index !== undefined)
      .map((stateIndex) => regions.regionOfState[stateIndex]!),
  );
  const branchCountsOnSolutionPath = summarizeSolutionPathBranches(
    solutionRegionPath,
    regionSummaries,
    regionGraph.outgoing,
    distanceToWin,
  );
  const decisionSteps = summarizeDecisionSteps(
    replayedSolution,
    graph.indexByKey,
    regions.regionOfState,
    regionSummaries,
    distanceToWin,
  );
  const scc = analyzeSccCondensation(
    graph.keys,
    graph.edges,
    graph.winStateIndexes,
    replayedSolution,
  );

  return {
    status: "complete",
    compressionRule: "bidirectional_edges",
    reachableStateCount: graph.keys.length,
    legalTransitionCount: graph.edges.length,
    compressedRegionCount: regions.regionCount,
    bidirectionalTransitionCount: regions.bidirectionalTransitionCount,
    commitmentTransitionCount: regionGraph.commitmentTransitionCount,
    winningRegionCount: winningRegions.size,
    initialRegion: regionSummaries[initialRegionId],
    solutionRegionPath,
    forcedCommitmentPrefixLength: countForcedPrefix(branchCountsOnSolutionPath, "forcedCommitment"),
    forcedViablePrefixLength: countForcedPrefix(branchCountsOnSolutionPath, "forcedViableProgress"),
    forcedOptimalPrefixLength: countForcedPrefix(branchCountsOnSolutionPath, "forcedOptimalProgress"),
    branchCountsOnSolutionPath,
    decisionSteps,
    scc,
    budget: { maxStates, maxTransitions, maxDepth },
  };
}

function enumerateGraph<State, Action extends string, Options extends RuntimeSearchOptions>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  winCondition: WinCondition,
  options: Options,
  budget: { maxStates: number; maxTransitions?: number; maxDepth?: number },
): {
  status: "complete" | "exhausted";
  reason?: string;
  keys: string[];
  indexByKey: Map<string, number>;
  edges: Array<Edge<Action>>;
  winStateIndexes: Set<number>;
} {
  const initialKey = runtime.key(initialState);
  const keys = [initialKey];
  const indexByKey = new Map<string, number>([[initialKey, 0]]);
  const edges: Array<Edge<Action>> = [];
  const winStateIndexes = new Set<number>();
  if (runtime.isWin(initialState, winCondition)) {
    winStateIndexes.add(0);
  }

  const queue: Array<QueueItem<State>> = [{ index: 0, state: initialState, depth: 0 }];
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (budget.maxDepth !== undefined && current.depth >= budget.maxDepth) {
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      if (budget.maxTransitions !== undefined && edges.length >= budget.maxTransitions) {
        return result("exhausted", "transition budget exceeded");
      }

      const transition = runtime.step(current.state, action, options);
      if (!transition.legal) {
        continue;
      }

      const nextKey = runtime.key(transition.state);
      let toIndex = indexByKey.get(nextKey);
      if (toIndex === undefined) {
        toIndex = keys.length;
        keys.push(nextKey);
        indexByKey.set(nextKey, toIndex);
        if (runtime.isWin(transition.state, winCondition)) {
          winStateIndexes.add(toIndex);
        }
        if (keys.length > budget.maxStates) {
          return result("exhausted", "state budget exceeded");
        }
        queue.push({ index: toIndex, state: transition.state, depth: current.depth + 1 });
      }

      edges.push({
        from: current.index,
        to: toIndex,
        action,
        events: transition.events,
      });
    }
  }

  return result("complete");

  function result(status: "complete" | "exhausted", reason?: string) {
    return { status, reason, keys, indexByKey, edges, winStateIndexes };
  }
}

function buildBidirectionalRegions<Action extends string>(
  stateCount: number,
  edges: Array<Edge<Action>>,
): {
  regionOfState: number[];
  regionCount: number;
  regionSizes: number[];
  bidirectionalTransitionCount: number;
  internalBidirectionalTransitionCounts: number[];
} {
  const unionFind = new UnionFind(stateCount);
  const directedPairs = new Set<string>();
  let bidirectionalTransitionCount = 0;

  for (const edge of edges) {
    directedPairs.add(edgeKey(edge.from, edge.to));
  }

  for (const edge of edges) {
    if (directedPairs.has(edgeKey(edge.to, edge.from))) {
      bidirectionalTransitionCount += 1;
      unionFind.union(edge.from, edge.to);
    }
  }

  const rootToRegion = new Map<number, number>();
  const regionOfState: number[] = [];
  const regionSizes: number[] = [];
  for (let index = 0; index < stateCount; index += 1) {
    const root = unionFind.find(index);
    let region = rootToRegion.get(root);
    if (region === undefined) {
      region = rootToRegion.size;
      rootToRegion.set(root, region);
      regionSizes[region] = 0;
    }
    regionOfState[index] = region;
    regionSizes[region] = regionSizes[region]! + 1;
  }

  const internalBidirectionalTransitionCounts = Array.from({ length: rootToRegion.size }, () => 0);
  for (const edge of edges) {
    const fromRegion = regionOfState[edge.from]!;
    const toRegion = regionOfState[edge.to]!;
    if (fromRegion === toRegion && directedPairs.has(edgeKey(edge.to, edge.from))) {
      internalBidirectionalTransitionCounts[fromRegion] =
        (internalBidirectionalTransitionCounts[fromRegion] ?? 0) + 1;
    }
  }

  return {
    regionOfState,
    regionCount: rootToRegion.size,
    regionSizes,
    bidirectionalTransitionCount,
    internalBidirectionalTransitionCounts,
  };
}

function buildRegionGraph<Action extends string>(
  regionOfState: number[],
  regionCount: number,
  edges: Array<Edge<Action>>,
): {
  outgoing: Array<Set<number>>;
  reverseOutgoing: Array<Set<number>>;
  commitmentTransitionCount: number;
} {
  const outgoing = Array.from({ length: regionCount }, () => new Set<number>());
  const reverseOutgoing = Array.from({ length: regionCount }, () => new Set<number>());
  let commitmentTransitionCount = 0;

  for (const edge of edges) {
    const fromRegion = regionOfState[edge.from]!;
    const toRegion = regionOfState[edge.to]!;
    if (fromRegion === toRegion) {
      continue;
    }
    outgoing[fromRegion]!.add(toRegion);
    reverseOutgoing[toRegion]!.add(fromRegion);
    commitmentTransitionCount += 1;
  }

  return { outgoing, reverseOutgoing, commitmentTransitionCount };
}

function computeRegionDistancesToWin(
  reverseOutgoing: Array<Set<number>>,
  winningRegions: Set<number>,
): Array<number | null> {
  const distanceToWin = Array.from({ length: reverseOutgoing.length }, () => null as number | null);
  const stack = [...winningRegions];
  for (const region of stack) {
    distanceToWin[region] = 0;
  }

  let cursor = 0;
  while (cursor < stack.length) {
    const region = stack[cursor]!;
    cursor += 1;
    const currentDistance = distanceToWin[region] ?? 0;
    for (const previous of reverseOutgoing[region] ?? []) {
      if (distanceToWin[previous] !== null) {
        continue;
      }
      distanceToWin[previous] = currentDistance + 1;
      stack.push(previous);
    }
  }

  return distanceToWin;
}

function summarizeRegions(input: {
  regionCount: number;
  regionSizes: number[];
  internalBidirectionalTransitionCounts: number[];
  outgoing: Array<Set<number>>;
  winningRegions: Set<number>;
  winReachableRegions: Set<number>;
  distanceToWin: Array<number | null>;
}): AgencyRegionSummary[] {
  return Array.from({ length: input.regionCount }, (_, regionId) => {
    const outgoing = input.outgoing[regionId] ?? new Set<number>();
    const currentDistance = input.distanceToWin[regionId] ?? null;
    let viableCommitmentCount = 0;
    let deadCommitmentCount = 0;
    let progressCommitmentCount = 0;
    let optimalCommitmentCount = 0;
    for (const target of outgoing) {
      const targetDistance = input.distanceToWin[target] ?? null;
      if (targetDistance !== null) {
        viableCommitmentCount += 1;
        if (currentDistance !== null && targetDistance < currentDistance) {
          progressCommitmentCount += 1;
        }
        if (currentDistance !== null && targetDistance === currentDistance - 1) {
          optimalCommitmentCount += 1;
        }
      } else {
        deadCommitmentCount += 1;
      }
    }

    return {
      regionId,
      stateCount: input.regionSizes[regionId] ?? 0,
      internalBidirectionalTransitionCount: input.internalBidirectionalTransitionCounts[regionId] ?? 0,
      distanceToWin: currentDistance,
      commitmentCount: outgoing.size,
      viableCommitmentCount,
      deadCommitmentCount,
      progressCommitmentCount,
      optimalCommitmentCount,
      isWinning: input.winningRegions.has(regionId),
      canReachWin: input.winReachableRegions.has(regionId),
    };
  });
}

function replaySolution<State, Action extends string, Options extends RuntimeSearchOptions>(
  runtime: PuzzleRuntime<State, Action, Options>,
  initialState: State,
  inputs: Action[],
  options: Options,
  winCondition: WinCondition,
): Array<ReplayedSolutionStep<Action>> {
  const steps: Array<ReplayedSolutionStep<Action>> = [
    {
      step: 0,
      input: null,
      events: [],
      key: runtime.key(initialState),
    },
  ];
  let state = initialState;
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(state, input, { ...options, winCondition });
    if (!transition.legal) {
      break;
    }
    state = transition.state;
    steps.push({
      step: index + 1,
      input,
      events: transition.events,
      key: runtime.key(state),
    });
  }
  return steps;
}

function compressSolutionRegions(regionIds: number[]): AgencySolutionRegionEntry[] {
  const path: AgencySolutionRegionEntry[] = [];
  for (const [step, regionId] of regionIds.entries()) {
    if (path.at(-1)?.regionId === regionId) {
      continue;
    }
    path.push({ regionId, enteredAtStep: step });
  }
  return path;
}

function summarizeSolutionPathBranches(
  solutionRegionPath: AgencySolutionRegionEntry[],
  regionSummaries: AgencyRegionSummary[],
  outgoing: Array<Set<number>>,
  distanceToWin: Array<number | null>,
): AgencySolutionBranchSummary[] {
  return solutionRegionPath.map((entry, index) => {
    const summary = regionSummaries[entry.regionId]!;
    const solutionNextRegion = solutionRegionPath[index + 1]?.regionId ?? null;
    const outgoingRegions = outgoing[entry.regionId] ?? new Set<number>();
    const viableTargets = [...outgoingRegions].filter((target) => distanceToWin[target] !== null);
    const optimalTargets = [...outgoingRegions].filter((target) => {
      const currentDistance = distanceToWin[entry.regionId] ?? null;
      const targetDistance = distanceToWin[target] ?? null;
      return currentDistance !== null && targetDistance === currentDistance - 1;
    });
    return {
      ...summary,
      solutionNextRegion,
      forcedCommitment:
        solutionNextRegion !== null &&
        outgoingRegions.size === 1 &&
        outgoingRegions.has(solutionNextRegion),
      forcedViableProgress:
        solutionNextRegion !== null &&
        viableTargets.length === 1 &&
        viableTargets[0] === solutionNextRegion,
      forcedOptimalProgress:
        solutionNextRegion !== null &&
        optimalTargets.length === 1 &&
        optimalTargets[0] === solutionNextRegion,
    };
  });
}

function summarizeDecisionSteps<Action extends string>(
  replayedSolution: Array<ReplayedSolutionStep<Action>>,
  indexByKey: Map<string, number>,
  regionOfState: number[],
  regionSummaries: AgencyRegionSummary[],
  distanceToWin: Array<number | null>,
): AgencyDecisionStep[] {
  const regionIds = replayedSolution.map((step) => {
    const stateIndex = indexByKey.get(step.key);
    return stateIndex === undefined ? null : regionOfState[stateIndex] ?? null;
  });

  return replayedSolution.map((step, index) => {
    const regionId = regionIds[index] ?? null;
    const previousRegionId = index === 0 ? null : regionIds[index - 1] ?? null;
    const nextSolutionRegionId = regionIds[index + 1] ?? null;
    const summary = regionId === null ? undefined : regionSummaries[regionId];
    const currentDistance = regionId === null ? null : distanceToWin[regionId] ?? null;
    const nextDistance =
      nextSolutionRegionId === null ? null : distanceToWin[nextSolutionRegionId] ?? null;
    const solutionTakesCommitmentNext =
      regionId !== null && nextSolutionRegionId !== null && regionId !== nextSolutionRegionId;
    const nextSolutionIsViable =
      nextSolutionRegionId === null || !solutionTakesCommitmentNext ? null : nextDistance !== null;
    const nextSolutionIsProgress =
      nextSolutionRegionId === null || !solutionTakesCommitmentNext
        ? null
        : currentDistance !== null &&
          nextDistance !== null &&
          nextDistance < currentDistance;
    const nextSolutionIsOptimal =
      nextSolutionRegionId === null || !solutionTakesCommitmentNext
        ? null
        : currentDistance !== null &&
          nextDistance !== null &&
          nextDistance === currentDistance - 1;

    return {
      step: step.step,
      input: step.input,
      events: step.events,
      regionId,
      previousRegionId,
      nextSolutionRegionId,
      enteredNewRegion: index > 0 && regionId !== null && regionId !== previousRegionId,
      solutionTakesCommitmentNext,
      distanceToWin: currentDistance,
      commitmentCount: summary?.commitmentCount ?? null,
      viableCommitmentCount: summary?.viableCommitmentCount ?? null,
      deadCommitmentCount: summary?.deadCommitmentCount ?? null,
      progressCommitmentCount: summary?.progressCommitmentCount ?? null,
      optimalCommitmentCount: summary?.optimalCommitmentCount ?? null,
      nextSolutionIsViable,
      nextSolutionIsProgress,
      nextSolutionIsOptimal,
      forcedViableChoice:
        nextSolutionRegionId === null || !solutionTakesCommitmentNext
          ? null
          : summary !== undefined &&
            summary.viableCommitmentCount === 1 &&
            nextSolutionIsViable === true,
      forcedOptimalChoice:
        nextSolutionRegionId === null || !solutionTakesCommitmentNext
          ? null
          : summary !== undefined &&
            summary.optimalCommitmentCount === 1 &&
            nextSolutionIsOptimal === true,
    };
  });
}

function analyzeSccCondensation<Action extends string>(
  stateKeys: string[],
  edges: Array<Edge<Action>>,
  winStateIndexes: Set<number>,
  replayedSolution: Array<ReplayedSolutionStep<Action>>,
): SccAnalysis {
  const sccs = computeSccs(stateKeys.length, edges);
  const condensation = buildCondensationGraph(sccs.sccOfState, sccs.sccCount, edges);
  const winningSccs = new Set<number>(
    [...winStateIndexes].map((stateIndex) => sccs.sccOfState[stateIndex]!),
  );
  const distanceToWin = computeRegionDistancesToWin(condensation.reverseOutgoing, winningSccs);
  const winReachableSccs = new Set<number>();
  for (const [sccId, distance] of distanceToWin.entries()) {
    if (distance !== null) {
      winReachableSccs.add(sccId);
    }
  }

  const solutionSccPath = compressSolutionSccPath(
    replayedSolution
      .map((step) => stateKeys.indexOf(step.key))
      .filter((index) => index >= 0)
      .map((stateIndex) => sccs.sccOfState[stateIndex]!),
  );
  const enteredStepByScc = new Map(solutionSccPath.map((entry) => [entry.sccId, entry.enteredAtStep]));
  const solutionSccIds = new Set(solutionSccPath.map((entry) => entry.sccId));
  const nodeSummaries = summarizeSccNodes({
    sccCount: sccs.sccCount,
    sccSizes: sccs.sccSizes,
    representativeStateKeys: sccs.representativeStateIndexes.map((index) => stateKeys[index] ?? ""),
    initialSccId: sccs.sccOfState[0]!,
    winningSccs,
    winReachableSccs,
    distanceToWin,
    outgoing: condensation.outgoing,
    incoming: condensation.incoming,
    solutionSccIds,
    enteredStepByScc,
  });
  const solutionPathBranches = summarizeSccSolutionPathBranches(
    solutionSccPath,
    nodeSummaries,
    condensation.outgoing,
    winReachableSccs,
  );
  const handoffProfile = summarizeSccHandoffs({
    solutionSccPath,
    nodeSummaries,
    replayedSolution,
    solutionPathBranches,
  });
  const winContinuationBranchingSccCount = nodeSummaries.filter(
    (node) => node.canReachWin && !node.isWinning && node.winReachableOutgoingCount > 1,
  ).length;
  const winContinuationMergingSccCount = nodeSummaries.filter(
    (node) => node.canReachWin && !node.isInitial && node.winReachableIncomingCount > 1,
  ).length;

  return {
    condensationRule: "strongly_connected_components",
    sccCount: sccs.sccCount,
    sccEdgeCount: condensation.edgeCount,
    initialSccId: sccs.sccOfState[0]!,
    winningSccCount: winningSccs.size,
    winReachableSccCount: winReachableSccs.size,
    winContinuationBranchingSccCount,
    winContinuationMergingSccCount,
    winSubgraphShape: classifyWinSubgraphShape({
      initialSccId: sccs.sccOfState[0]!,
      winningSccs,
      winReachableSccs,
      nodeSummaries,
    }),
    solutionSccPath,
    solutionIrreversibleStepCount: Math.max(0, solutionSccPath.length - 1),
    forcedWinContinuationPrefixLength: countForcedSccPrefix(solutionPathBranches),
    initialScc: nodeSummaries[sccs.sccOfState[0]!]!,
    solutionPathBranches,
    handoffProfile,
  };
}

function computeSccs<Action extends string>(
  stateCount: number,
  edges: Array<Edge<Action>>,
): {
  sccOfState: number[];
  sccCount: number;
  sccSizes: number[];
  representativeStateIndexes: number[];
} {
  const outgoing = Array.from({ length: stateCount }, () => [] as number[]);
  const reverseOutgoing = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) {
    outgoing[edge.from]!.push(edge.to);
    reverseOutgoing[edge.to]!.push(edge.from);
  }

  const visited = Array.from({ length: stateCount }, () => false);
  const order: number[] = [];
  for (let state = 0; state < stateCount; state += 1) {
    if (visited[state]) {
      continue;
    }
    finishOrderDfs(state, outgoing, visited, order);
  }

  const sccOfState = Array.from({ length: stateCount }, () => -1);
  const sccSizes: number[] = [];
  const representativeStateIndexes: number[] = [];
  for (let index = order.length - 1; index >= 0; index -= 1) {
    const state = order[index]!;
    if (sccOfState[state] !== -1) {
      continue;
    }
    const sccId = sccSizes.length;
    const stack = [state];
    sccOfState[state] = sccId;
    sccSizes[sccId] = 0;
    representativeStateIndexes[sccId] = state;
    while (stack.length > 0) {
      const current = stack.pop()!;
      sccSizes[sccId] = (sccSizes[sccId] ?? 0) + 1;
      for (const previous of reverseOutgoing[current] ?? []) {
        if (sccOfState[previous] !== -1) {
          continue;
        }
        sccOfState[previous] = sccId;
        stack.push(previous);
      }
    }
  }

  return {
    sccOfState,
    sccCount: sccSizes.length,
    sccSizes,
    representativeStateIndexes,
  };
}

function finishOrderDfs(
  start: number,
  outgoing: number[][],
  visited: boolean[],
  order: number[],
): void {
  const stack: Array<{ state: number; nextEdgeIndex: number }> = [
    { state: start, nextEdgeIndex: 0 },
  ];
  visited[start] = true;

  while (stack.length > 0) {
    const frame = stack[stack.length - 1]!;
    const neighbors = outgoing[frame.state] ?? [];
    if (frame.nextEdgeIndex < neighbors.length) {
      const next = neighbors[frame.nextEdgeIndex]!;
      frame.nextEdgeIndex += 1;
      if (!visited[next]) {
        visited[next] = true;
        stack.push({ state: next, nextEdgeIndex: 0 });
      }
      continue;
    }
    order.push(frame.state);
    stack.pop();
  }
}

function buildCondensationGraph<Action extends string>(
  sccOfState: number[],
  sccCount: number,
  edges: Array<Edge<Action>>,
): {
  outgoing: Array<Set<number>>;
  incoming: Array<Set<number>>;
  reverseOutgoing: Array<Set<number>>;
  edgeCount: number;
} {
  const outgoing = Array.from({ length: sccCount }, () => new Set<number>());
  const incoming = Array.from({ length: sccCount }, () => new Set<number>());
  for (const edge of edges) {
    const fromScc = sccOfState[edge.from]!;
    const toScc = sccOfState[edge.to]!;
    if (fromScc === toScc) {
      continue;
    }
    outgoing[fromScc]!.add(toScc);
    incoming[toScc]!.add(fromScc);
  }

  return {
    outgoing,
    incoming,
    reverseOutgoing: incoming,
    edgeCount: outgoing.reduce((sum, targets) => sum + targets.size, 0),
  };
}

function summarizeSccNodes(input: {
  sccCount: number;
  sccSizes: number[];
  representativeStateKeys: string[];
  initialSccId: number;
  winningSccs: Set<number>;
  winReachableSccs: Set<number>;
  distanceToWin: Array<number | null>;
  outgoing: Array<Set<number>>;
  incoming: Array<Set<number>>;
  solutionSccIds: Set<number>;
  enteredStepByScc: Map<number, number>;
}): SccNodeSummary[] {
  return Array.from({ length: input.sccCount }, (_, sccId) => {
    const outgoing = input.outgoing[sccId] ?? new Set<number>();
    const incoming = input.incoming[sccId] ?? new Set<number>();
    const isWinning = input.winningSccs.has(sccId);
    const winReachableOutgoingCount = isWinning
      ? 0
      : [...outgoing].filter((target) => input.winReachableSccs.has(target)).length;
    const deadOutgoingCount = isWinning
      ? 0
      : [...outgoing].filter((target) => !input.winReachableSccs.has(target)).length;
    const winReachableIncomingCount = [...incoming].filter((source) =>
      input.winReachableSccs.has(source),
    ).length;
    const enteredAtStep = input.enteredStepByScc.get(sccId);
    return {
      sccId,
      stateCount: input.sccSizes[sccId] ?? 0,
      representativeStateKey: input.representativeStateKeys[sccId] ?? "",
      isInitial: sccId === input.initialSccId,
      isWinning,
      canReachWin: input.winReachableSccs.has(sccId),
      distanceToWin: input.distanceToWin[sccId] ?? null,
      incomingCount: incoming.size,
      outgoingCount: outgoing.size,
      winReachableIncomingCount,
      winReachableOutgoingCount,
      deadOutgoingCount,
      onSolutionPath: input.solutionSccIds.has(sccId),
      ...(enteredAtStep === undefined ? {} : { enteredAtStep }),
    };
  });
}

function summarizeSccSolutionPathBranches(
  solutionSccPath: SccPathEntry[],
  nodeSummaries: SccNodeSummary[],
  outgoing: Array<Set<number>>,
  winReachableSccs: Set<number>,
): SccSolutionBranchSummary[] {
  return solutionSccPath.map((entry, index) => {
    const summary = nodeSummaries[entry.sccId]!;
    const solutionNextSccId = solutionSccPath[index + 1]?.sccId ?? null;
    const winReachableTargets = summary.isWinning
      ? []
      : [...(outgoing[entry.sccId] ?? new Set<number>())].filter((target) =>
          winReachableSccs.has(target),
        );
    return {
      ...summary,
      solutionNextSccId,
      forcedWinContinuation:
        solutionNextSccId !== null &&
        winReachableTargets.length === 1 &&
        winReachableTargets[0] === solutionNextSccId,
    };
  });
}

function summarizeSccHandoffs<Action extends string>(input: {
  solutionSccPath: SccPathEntry[];
  nodeSummaries: SccNodeSummary[];
  replayedSolution: Array<ReplayedSolutionStep<Action>>;
  solutionPathBranches: SccSolutionBranchSummary[];
}): SccHandoffProfile {
  const handoffs: SccHandoffSummary[] = [];

  for (let index = 0; index < input.solutionSccPath.length - 1; index += 1) {
    const source = input.solutionSccPath[index]!;
    const target = input.solutionSccPath[index + 1]!;
    const sourceNode = input.nodeSummaries[source.sccId]!;
    const branch = input.solutionPathBranches[index]!;
    const sourceEntry = input.replayedSolution[source.enteredAtStep];
    const exitAction = input.replayedSolution[target.enteredAtStep];
    const exitSource =
      target.enteredAtStep > 0 ? input.replayedSolution[target.enteredAtStep - 1] : undefined;

    if (!sourceEntry || !exitSource) {
      continue;
    }

    const entryEqualsExitSource = sourceEntry.key === exitSource.key;
    const trivialSourceScc = sourceNode.stateCount === 1;
    const reading = classifySccHandoff({
      trivialSourceScc,
      entryEqualsExitSource,
    });

    handoffs.push({
      fromSccId: source.sccId,
      toSccId: target.sccId,
      sourceEnteredAtStep: source.enteredAtStep,
      exitActionStep: target.enteredAtStep,
      input: exitAction?.input ?? null,
      events: exitAction?.events ?? [],
      sourceStateCount: sourceNode.stateCount,
      sourceEntryStateKey: sourceEntry.key,
      exitSourceStateKey: exitSource.key,
      entryEqualsExitSource,
      trivialSourceScc,
      forcedWinContinuation: branch.forcedWinContinuation,
      reading,
    });
  }

  const scriptedHandoffCount = handoffs.filter(isScriptedHandoff).length;
  return {
    scope: "returned_solution",
    handoffCount: handoffs.length,
    scriptedHandoffCount,
    trivialSourceSccCount: handoffs.filter((handoff) => handoff.trivialSourceScc).length,
    sameEntryExitStateCount: handoffs.filter((handoff) => handoff.entryEqualsExitSource).length,
    forcedScriptedHandoffCount: handoffs.filter(
      (handoff) => handoff.forcedWinContinuation && isScriptedHandoff(handoff),
    ).length,
    maxConsecutiveScriptedHandoffs: countMaxConsecutive(handoffs.map(isScriptedHandoff)),
    handoffs,
  };
}

function classifySccHandoff(input: {
  trivialSourceScc: boolean;
  entryEqualsExitSource: boolean;
}): SccHandoffReading {
  if (input.trivialSourceScc) {
    return "scripted_trivial_scc";
  }
  if (input.entryEqualsExitSource) {
    return "scripted_same_state_handoff";
  }
  return "has_reposition_room";
}

function isScriptedHandoff(handoff: Pick<SccHandoffSummary, "trivialSourceScc" | "entryEqualsExitSource">): boolean {
  return handoff.trivialSourceScc || handoff.entryEqualsExitSource;
}

function countMaxConsecutive(values: boolean[]): number {
  let best = 0;
  let current = 0;
  for (const value of values) {
    if (value) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}

function compressSolutionSccPath(sccIds: number[]): SccPathEntry[] {
  const path: SccPathEntry[] = [];
  for (const [step, sccId] of sccIds.entries()) {
    if (path.at(-1)?.sccId === sccId) {
      continue;
    }
    path.push({ sccId, enteredAtStep: step });
  }
  return path;
}

function countForcedSccPrefix(branches: SccSolutionBranchSummary[]): number {
  let count = 0;
  for (const branch of branches) {
    if (branch.solutionNextSccId === null) {
      break;
    }
    if (!branch.forcedWinContinuation) {
      break;
    }
    count += 1;
  }
  return count;
}

function classifyWinSubgraphShape(input: {
  initialSccId: number;
  winningSccs: Set<number>;
  winReachableSccs: Set<number>;
  nodeSummaries: SccNodeSummary[];
}): SccAnalysis["winSubgraphShape"] {
  if (!input.winReachableSccs.has(input.initialSccId)) {
    return "no_win_path";
  }
  const hasBranch = input.nodeSummaries.some(
    (node) => node.canReachWin && !node.isWinning && node.winReachableOutgoingCount > 1,
  );
  return hasBranch ? "branching_win_dag" : "one_win_continuation_per_scc";
}

function countForcedPrefix(
  branchCounts: AgencySolutionBranchSummary[],
  field: "forcedCommitment" | "forcedViableProgress" | "forcedOptimalProgress",
): number {
  let count = 0;
  for (const branch of branchCounts) {
    if (branch.solutionNextRegion === null) {
      break;
    }
    if (!branch[field]) {
      break;
    }
    count += 1;
  }
  return count;
}

function edgeKey(from: number, to: number): string {
  return `${from}\u0000${to}`;
}

class UnionFind {
  private readonly parent: number[];
  private readonly rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = Array.from({ length: size }, () => 0);
  }

  find(value: number): number {
    const parent = this.parent[value]!;
    if (parent === value) {
      return value;
    }
    const root = this.find(parent);
    this.parent[value] = root;
    return root;
  }

  union(left: number, right: number): void {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot === rightRoot) {
      return;
    }

    const leftRank = this.rank[leftRoot]!;
    const rightRank = this.rank[rightRoot]!;
    if (leftRank < rightRank) {
      this.parent[leftRoot] = rightRoot;
    } else if (leftRank > rightRank) {
      this.parent[rightRoot] = leftRoot;
    } else {
      this.parent[rightRoot] = leftRoot;
      this.rank[leftRoot] = leftRank + 1;
    }
  }
}
