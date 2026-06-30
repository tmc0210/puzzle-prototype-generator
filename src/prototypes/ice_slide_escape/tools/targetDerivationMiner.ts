import type { LevelDoc, Point, PrototypePackage, WinCondition } from "../../../core/types.js";
import type { PuzzleRuntime, RuntimeSearchOptions } from "../../../core/puzzleRuntime.js";
import { eventType } from "../../../core/events.js";
import { loadPrototypePackage } from "../../../core/io.js";
import { solveWithRuntime } from "../../../core/solver.js";
import { analyzeLevel, type LevelAnalysis } from "../../../workflows/levelAnalyzer.js";
import { getRuntimeAdapter } from "../../runtimeAdapter.js";
import type { IceSlideAction, IceSlideState, IceSlideStepOptions } from "../mechanics.js";

type Rng = () => number;
type Cell = { x: number; y: number };
type PointTuple = [number, number];
type MutableGrid = string[][];
type Direction = "up" | "down" | "left" | "right";

type Options = {
  prototype: string;
  seed: number;
  iterations: number;
  maxFindings: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  width: number;
  height: number;
  baseMaxStates: number;
  baseMaxDepth?: number;
  sourceLimit: number;
  endpointsPerBase: number;
  targetCandidatesPerEndpoint: number;
  chainMaxSteps: number;
  chainBeam: number;
  chainWalkGap: number;
  maxStates: number;
  graphMaxStates: number;
  maxDepth: number;
};

type StampSpec = {
  id: string;
  pattern: string;
};

type BaseSample = {
  id: string;
  index: number;
  layout: string;
  start: Cell;
  stamps: string[];
  width: number;
  height: number;
};

type GraphEdge<Action extends string> = {
  from: number;
  to: number;
  action: Action;
  events: string[];
};

type CompleteGraph<State, Action extends string> = {
  status: "complete" | "exhausted";
  reason?: string;
  states: State[];
  keys: string[];
  indexByKey: Map<string, number>;
  edges: Array<GraphEdge<Action>>;
  outgoingEdgeIndexes: number[][];
};

type SccResult = {
  sccOfState: number[];
  members: number[][];
  representativeStateIndexes: number[];
};

type ChainCandidate = {
  sourceStateIndex: number;
  endpointStateIndex: number;
  edgeIndexes: number[];
  events: string[];
  eventTypes: Set<string>;
  changedIceKeys: Set<string>;
  productiveCount: number;
  score: number;
  terminal: boolean;
};

type TargetCandidate = {
  point: Cell;
  reason: "chain_changed_ice" | "endpoint_ice";
};

type ProductUseKind =
  | "ice_as_obstacle"
  | "ice_reused_as_pushed_object"
  | "opened_wall_player_path"
  | "opened_wall_slide_path"
  | "moved_ice_opened_player_path"
  | "moved_ice_opened_slide_path"
  | "target_filled";

type ProductUse = {
  kind: ProductUseKind;
  fromStep: number;
  toStep?: number;
  cell: string;
  detail: string;
};

type ProductUseSummary = {
  uses: ProductUse[];
  kindCounts: Record<string, number>;
  strongUseCount: number;
};

type Finding = {
  id: string;
  score: number;
  sample: BaseSample;
  chain: ChainCandidate;
  target: TargetCandidate;
  derivedLayout: string;
  endpointState: IceSlideState;
  solutionEvents: Record<string, number>;
  solutionEventTypes: string[];
  productUse: ProductUseSummary;
  analysis: LevelAnalysis;
};

type Stats = {
  generated: number;
  invalid: number;
  baseGraphComplete: number;
  baseGraphExhausted: number;
  chains: number;
  targetCandidates: number;
  presolveUnsolved: number;
  walkOnly: number;
  analyzed: number;
  graphIncomplete: number;
  rejectedCoverage: number;
  rejectedProductUse: number;
  kept: number;
};

const directions: Direction[] = ["right", "left", "down", "up"];

const vectors: Record<Direction, Cell> = {
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
};

const stamps: StampSpec[] = [
  { id: "short_d1_wall", pattern: "PI.#" },
  { id: "short_d2_wall", pattern: "PI..#" },
  { id: "destroy_d3_wall", pattern: "PI...#" },
  { id: "rebound_d4_wall", pattern: "PI....#" },
  { id: "ice_block_d1", pattern: "PI.I" },
  { id: "ice_block_d4", pattern: "PI....I" },
  { id: "d5_restart_short", pattern: "PI.....#.#" },
  { id: "d6_restart_short", pattern: "PI......#.#" },
  { id: "d5_restart_rebound", pattern: "PI.....#....#" },
  { id: "d6_restart_rebound", pattern: "PI......#....#" },
  { id: "d5_restart_destroy", pattern: "PI.....#......#" },
  { id: "d6_restart_destroy", pattern: "PI......#......#" },
];

const defaultOptions: Options = {
  prototype: "prototypes/ice_slide_escape",
  seed: 20260630,
  iterations: 80,
  maxFindings: 6,
  minWidth: 10,
  maxWidth: 13,
  minHeight: 8,
  maxHeight: 10,
  width: 0,
  height: 0,
  baseMaxStates: 12_000,
  sourceLimit: 48,
  endpointsPerBase: 3,
  targetCandidatesPerEndpoint: 3,
  chainMaxSteps: 14,
  chainBeam: 32,
  chainWalkGap: 4,
  maxStates: 12_000,
  graphMaxStates: 12_000,
  maxDepth: 140,
};

async function main(): Promise<void> {
  const options = parseOptions(process.argv.slice(2));
  if (options === "help") {
    printUsage();
    return;
  }

  const pkg = await loadPrototypePackage(options.prototype);
  if (pkg.mechanic.id !== "ice_slide_escape") {
    throw new Error("targetDerivationMiner only supports ice_slide_escape.");
  }

  const report = runTargetDerivationMiner(pkg, options);
  printReport(report, options);
}

function runTargetDerivationMiner(
  pkg: PrototypePackage,
  options: Options,
): { stats: Stats; findings: Finding[] } {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic) as PuzzleRuntime<
    IceSlideState,
    IceSlideAction,
    IceSlideStepOptions
  >;
  const rng = mulberry32(options.seed);
  const stats: Stats = {
    generated: 0,
    invalid: 0,
    baseGraphComplete: 0,
    baseGraphExhausted: 0,
    chains: 0,
    targetCandidates: 0,
    presolveUnsolved: 0,
    walkOnly: 0,
    analyzed: 0,
    graphIncomplete: 0,
    rejectedCoverage: 0,
    rejectedProductUse: 0,
    kept: 0,
  };
  const findings: Finding[] = [];

  for (let index = 0; index < options.iterations; index += 1) {
    const sample = sampleBaseLayout(index, options.seed, rng, options);
    if (!sample) {
      stats.invalid += 1;
      continue;
    }
    stats.generated += 1;

    let initial: IceSlideState;
    try {
      initial = adapter.parseLevel(baseLevel(sample)) as IceSlideState;
    } catch {
      stats.invalid += 1;
      continue;
    }

    const baseGraph = enumerateCompleteGraph(runtime, initial, {
      maxStates: options.baseMaxStates,
      maxDepth: options.baseMaxDepth,
    });
    if (baseGraph.status !== "complete") {
      stats.baseGraphExhausted += 1;
      continue;
    }
    stats.baseGraphComplete += 1;

    const scc = computeSccs(baseGraph.states.length, baseGraph.edges);
    const chains = selectChains(baseGraph, scc, options);
    stats.chains += chains.length;

    for (const chain of chains) {
      const targets = deriveTargets(initial, baseGraph.states[chain.endpointStateIndex]!, chain, options);
      stats.targetCandidates += targets.length;
      for (const target of targets) {
        const finding = evaluateTargetCandidate(
          pkg,
          runtime,
          sample,
          chain,
          target,
          baseGraph.states[chain.endpointStateIndex]!,
          options,
        );
        updateStatsForCandidate(stats, finding);
        if (finding.status === "kept") {
          findings.push(finding.finding);
        }
      }
    }
  }

  const selected = dedupeFindings(findings)
    .sort((left, right) => right.score - left.score)
    .slice(0, options.maxFindings);
  stats.kept = selected.length;
  return { stats, findings: selected };
}

function sampleBaseLayout(
  index: number,
  seed: number,
  rng: Rng,
  options: Options,
): BaseSample | undefined {
  const width = options.width > 0 ? options.width : randInt(rng, options.minWidth, options.maxWidth);
  const height =
    options.height > 0 ? options.height : randInt(rng, options.minHeight, options.maxHeight);
  if (width < 9 || height < 7) {
    return undefined;
  }

  const grid = makeWalledGrid(width, height);
  const center = {
    x: randInt(rng, 3, Math.max(3, width - 4)),
    y: randInt(rng, 2, Math.max(2, height - 3)),
  };
  addBaffles(grid, rng, center);

  const pushers: Cell[] = [];
  const stampLabels: string[] = [];
  const stampCount = randInt(rng, 4, 7);
  for (let stampIndex = 0; stampIndex < stampCount; stampIndex += 1) {
    const placed = placeStamp(grid, rng, center);
    if (placed) {
      pushers.push(placed.pusher);
      stampLabels.push(placed.label);
    }
  }

  if (pushers.length === 0) {
    return undefined;
  }

  const start = chooseStartDoor(grid, rng, pushers);
  if (!start) {
    return undefined;
  }
  openStartDoor(grid, start);

  return {
    id: `derived_base_${String(index).padStart(4, "0")}`,
    index,
    layout: renderGrid(grid),
    start,
    stamps: stampLabels,
    width,
    height,
  };
}

function enumerateCompleteGraph<State, Action extends string, OptionsT extends RuntimeSearchOptions>(
  runtime: PuzzleRuntime<State, Action, OptionsT>,
  initialState: State,
  options: OptionsT,
): CompleteGraph<State, Action> {
  const maxStates = options.maxStates ?? 100_000;
  const maxDepth = options.maxDepth;
  const initialKey = runtime.key(initialState);
  const states: State[] = [initialState];
  const keys = [initialKey];
  const indexByKey = new Map<string, number>([[initialKey, 0]]);
  const edges: Array<GraphEdge<Action>> = [];
  const outgoingEdgeIndexes: number[][] = [[]];
  const queue: Array<{ index: number; state: State; depth: number }> = [
    { index: 0, state: initialState, depth: 0 },
  ];
  let cursor = 0;
  let depthLimitHit = false;

  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;

    if (maxDepth !== undefined && current.depth >= maxDepth) {
      depthLimitHit = true;
      continue;
    }

    for (const action of runtime.actions(current.state, options)) {
      const transition = runtime.step(current.state, action, options);
      if (!transition.legal) {
        continue;
      }

      const nextKey = runtime.key(transition.state);
      let toIndex = indexByKey.get(nextKey);
      if (toIndex === undefined) {
        toIndex = states.length;
        states.push(transition.state);
        keys.push(nextKey);
        indexByKey.set(nextKey, toIndex);
        outgoingEdgeIndexes[toIndex] = [];
        if (states.length > maxStates) {
          return {
            status: "exhausted",
            reason: `state budget exceeded (${maxStates})`,
            states,
            keys,
            indexByKey,
            edges,
            outgoingEdgeIndexes,
          };
        }
        queue.push({ index: toIndex, state: transition.state, depth: current.depth + 1 });
      }

      const edgeIndex = edges.length;
      edges.push({
        from: current.index,
        to: toIndex,
        action,
        events: transition.events,
      });
      outgoingEdgeIndexes[current.index]!.push(edgeIndex);
    }
  }

  return {
    status: depthLimitHit ? "exhausted" : "complete",
    reason: depthLimitHit ? `depth budget exceeded (${maxDepth})` : undefined,
    states,
    keys,
    indexByKey,
    edges,
    outgoingEdgeIndexes,
  };
}

function computeSccs<Action extends string>(
  stateCount: number,
  edges: Array<GraphEdge<Action>>,
): SccResult {
  const outgoing = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) {
    outgoing[edge.from]!.push(edge.to);
  }

  const indexByState = Array.from({ length: stateCount }, () => -1);
  const lowLink = Array.from({ length: stateCount }, () => 0);
  const onStack = Array.from({ length: stateCount }, () => false);
  const stack: number[] = [];
  const sccOfState = Array.from({ length: stateCount }, () => -1);
  const members: number[][] = [];
  const representativeStateIndexes: number[] = [];
  let index = 0;

  function strongConnect(state: number): void {
    indexByState[state] = index;
    lowLink[state] = index;
    index += 1;
    stack.push(state);
    onStack[state] = true;

    for (const next of outgoing[state] ?? []) {
      if (indexByState[next] === -1) {
        strongConnect(next);
        lowLink[state] = Math.min(lowLink[state]!, lowLink[next]!);
      } else if (onStack[next]) {
        lowLink[state] = Math.min(lowLink[state]!, indexByState[next]!);
      }
    }

    if (lowLink[state] !== indexByState[state]) {
      return;
    }

    const sccId = members.length;
    const component: number[] = [];
    while (true) {
      const item = stack.pop();
      if (item === undefined) {
        throw new Error("SCC stack underflow");
      }
      onStack[item] = false;
      sccOfState[item] = sccId;
      component.push(item);
      if (item === state) {
        break;
      }
    }
    members.push(component);
    representativeStateIndexes.push(component[0] ?? state);
  }

  for (let state = 0; state < stateCount; state += 1) {
    if (indexByState[state] === -1) {
      strongConnect(state);
    }
  }

  return { sccOfState, members, representativeStateIndexes };
}

function selectChains(
  graph: CompleteGraph<IceSlideState, IceSlideAction>,
  scc: SccResult,
  options: Options,
): ChainCandidate[] {
  const sourceScores = new Map<number, number>();
  for (const [edgeIndex, edge] of graph.edges.entries()) {
    if (!isProductive(edge.events)) {
      continue;
    }
    const sccSize = scc.members[scc.sccOfState[edge.from] ?? -1]?.length ?? 1;
    const score = productiveEventScore(edge.events) + Math.min(12, sccSize);
    sourceScores.set(edge.from, Math.max(sourceScores.get(edge.from) ?? 0, score));
    void edgeIndex;
  }

  const sourceStateIndexes = [...sourceScores.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, options.sourceLimit)
    .map(([stateIndex]) => stateIndex);

  const chains: ChainCandidate[] = [];
  for (const sourceStateIndex of sourceStateIndexes) {
    const chain = searchChainFrom(graph, sourceStateIndex, options);
    if (chain && chain.productiveCount > 0) {
      chains.push(chain);
    }
  }

  return dedupeChains(chains)
    .sort((left, right) => right.score - left.score)
    .slice(0, options.endpointsPerBase);
}

function searchChainFrom(
  graph: CompleteGraph<IceSlideState, IceSlideAction>,
  sourceStateIndex: number,
  options: Options,
): ChainCandidate | undefined {
  type BeamNode = {
    stateIndex: number;
    edgeIndexes: number[];
    events: string[];
    eventTypes: Set<string>;
    changedIceKeys: Set<string>;
    productiveCount: number;
    score: number;
    walkTail: number;
    visited: Set<number>;
  };

  const initial: BeamNode = {
    stateIndex: sourceStateIndex,
    edgeIndexes: [],
    events: [],
    eventTypes: new Set(),
    changedIceKeys: new Set(),
    productiveCount: 0,
    score: 0,
    walkTail: 0,
    visited: new Set([sourceStateIndex]),
  };
  let beam: BeamNode[] = [initial];
  let best: BeamNode | undefined;

  for (let depth = 0; depth < options.chainMaxSteps; depth += 1) {
    const nextBeam: BeamNode[] = [];
    for (const node of beam) {
      for (const edgeIndex of graph.outgoingEdgeIndexes[node.stateIndex] ?? []) {
        const edge = graph.edges[edgeIndex]!;
        if (node.visited.has(edge.to)) {
          continue;
        }

        const productive = isProductive(edge.events);
        const walkTail = productive ? 0 : node.walkTail + 1;
        if (!productive && walkTail > options.chainWalkGap) {
          continue;
        }

        const before = graph.states[edge.from]!;
        const after = graph.states[edge.to]!;
        const changedIceKeys = new Set(node.changedIceKeys);
        if (productive) {
          for (const changed of changedIceBetween(before, after)) {
            changedIceKeys.add(changed);
          }
        }

        const eventTypes = new Set(node.eventTypes);
        for (const event of edge.events) {
          const type = eventType(event);
          if (type !== "walk") {
            eventTypes.add(type);
          }
        }

        const nextNode: BeamNode = {
          stateIndex: edge.to,
          edgeIndexes: [...node.edgeIndexes, edgeIndex],
          events: [...node.events, ...edge.events],
          eventTypes,
          changedIceKeys,
          productiveCount: node.productiveCount + (productive ? 1 : 0),
          score:
            node.score +
            (productive ? productiveEventScore(edge.events) : -1) +
            (productive && eventTypes.size > node.eventTypes.size ? 6 : 0),
          walkTail,
          visited: new Set([...node.visited, edge.to]),
        };

        if (
          nextNode.productiveCount > 0 &&
          (!best || rankChainNode(nextNode, graph, options) > rankChainNode(best, graph, options))
        ) {
          best = nextNode;
        }
        nextBeam.push(nextNode);
      }
    }

    if (nextBeam.length === 0) {
      break;
    }
    beam = nextBeam
      .sort((left, right) => rankChainNode(right, graph, options) - rankChainNode(left, graph, options))
      .slice(0, options.chainBeam);
  }

  if (!best) {
    return undefined;
  }

  const terminal = !hasProductiveReachableWithin(graph, best.stateIndex, options.chainWalkGap);
  return {
    sourceStateIndex,
    endpointStateIndex: best.stateIndex,
    edgeIndexes: best.edgeIndexes,
    events: best.events,
    eventTypes: best.eventTypes,
    changedIceKeys: best.changedIceKeys,
    productiveCount: best.productiveCount,
    score: rankChainNode(best, graph, options) + (terminal ? 14 : 0),
    terminal,
  };
}

function rankChainNode(
  node: {
    score: number;
    productiveCount: number;
    eventTypes: Set<string>;
    walkTail: number;
    stateIndex: number;
  },
  graph: CompleteGraph<IceSlideState, IceSlideAction>,
  options: Options,
): number {
  return (
    node.score +
    node.productiveCount * 10 +
    node.eventTypes.size * 11 -
    node.walkTail * 2 +
    (hasProductiveReachableWithin(graph, node.stateIndex, options.chainWalkGap) ? 0 : 8)
  );
}

function dedupeChains(chains: ChainCandidate[]): ChainCandidate[] {
  const bestByKey = new Map<string, ChainCandidate>();
  for (const chain of chains) {
    const key = `${chain.endpointStateIndex}|${[...chain.eventTypes].sort().join(",")}`;
    const current = bestByKey.get(key);
    if (!current || chain.score > current.score) {
      bestByKey.set(key, chain);
    }
  }
  return [...bestByKey.values()];
}

function deriveTargets(
  initial: IceSlideState,
  endpoint: IceSlideState,
  chain: ChainCandidate,
  options: Options,
): TargetCandidate[] {
  const initialIce = new Set(initial.ice.map(pointKey));
  const initialWalls = initial.walls;
  const initialPlayer = pointKey(initial.player);
  const changedTargets: TargetCandidate[] = endpoint.ice
    .filter((point) => chain.changedIceKeys.has(pointKey(point)))
    .map((point) => ({ point, reason: "chain_changed_ice" as const }));
  const fallbackTargets: TargetCandidate[] = endpoint.ice.map((point) => ({
    point,
    reason: "endpoint_ice" as const,
  }));

  const targets: TargetCandidate[] = [];
  const seen = new Set<string>();
  for (const candidate of [...changedTargets, ...fallbackTargets]) {
    const key = pointKey(candidate.point);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    if (initialIce.has(key) || initialWalls.has(key) || key === initialPlayer) {
      continue;
    }
    targets.push(candidate);
    if (targets.length >= options.targetCandidatesPerEndpoint) {
      break;
    }
  }
  return targets;
}

function evaluateTargetCandidate(
  pkg: PrototypePackage,
  runtime: PuzzleRuntime<IceSlideState, IceSlideAction, IceSlideStepOptions>,
  sample: BaseSample,
  chain: ChainCandidate,
  target: TargetCandidate,
  endpointState: IceSlideState,
  options: Options,
):
  | {
      status:
        | "presolve_unsolved"
        | "walk_only"
        | "graph_incomplete"
        | "coverage_rejected"
        | "product_use_rejected"
        | "invalid";
    }
  | { status: "kept"; finding: Finding } {
  const derivedLayout = layoutWithTarget(sample.layout, target.point);
  if (!derivedLayout) {
    return { status: "coverage_rejected" };
  }

  const level = targetLevel(sample, derivedLayout, target);
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const initial = adapter.parseLevel(level) as IceSlideState;
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: level.win,
    maxStates: options.maxStates,
    maxDepth: options.maxDepth,
  });
  if (!solution.found) {
    return { status: "presolve_unsolved" };
  }
  if (nonWalkTypes(solution.events).length === 0) {
    return { status: "walk_only" };
  }

  let analysis: LevelAnalysis;
  try {
    analysis = analyzeLevel(pkg, level, {
      maxStates: options.maxStates,
      maxDepth: options.maxDepth,
      graphMaxStates: options.graphMaxStates,
      bypassMaxStates: Math.min(options.maxStates, 4_000),
      counterfactualMaxStates: Math.min(options.maxStates, 4_000),
    });
  } catch {
    return { status: "invalid" };
  }
  if (analysis.graph.status !== "complete" || analysis.agency.status !== "complete") {
    return { status: "graph_incomplete" };
  }
  if (nonWalkTypes(analysis.solution.events).length === 0) {
    return { status: "walk_only" };
  }
  if (!solutionCoversChain(chain, analysis.solution.events)) {
    return { status: "coverage_rejected" };
  }
  const productUse = scanSolutionProductUse(pkg, level, analysis.solution.inputs as IceSlideAction[]);
  if (productUse.strongUseCount === 0) {
    return { status: "product_use_rejected" };
  }

  return {
    status: "kept",
    finding: {
      id: `${sample.id}_t${target.point.x}_${target.point.y}`,
      score: scoreFinding(chain, analysis, productUse),
      sample,
      chain,
      target,
      derivedLayout,
      endpointState,
      solutionEvents: countEvents(analysis.solution.events),
      solutionEventTypes: nonWalkTypes(analysis.solution.events),
      productUse,
      analysis,
    },
  };
}

function updateStatsForCandidate(
  stats: Stats,
  result:
    | {
        status:
          | "presolve_unsolved"
          | "walk_only"
          | "graph_incomplete"
          | "coverage_rejected"
          | "product_use_rejected"
          | "invalid";
      }
    | { status: "kept"; finding: Finding },
): void {
  switch (result.status) {
    case "presolve_unsolved":
      stats.presolveUnsolved += 1;
      break;
    case "walk_only":
      stats.walkOnly += 1;
      break;
    case "graph_incomplete":
      stats.graphIncomplete += 1;
      stats.analyzed += 1;
      break;
    case "coverage_rejected":
      stats.rejectedCoverage += 1;
      stats.analyzed += 1;
      break;
    case "product_use_rejected":
      stats.rejectedProductUse += 1;
      stats.analyzed += 1;
      break;
    case "invalid":
      stats.invalid += 1;
      break;
    case "kept":
      stats.analyzed += 1;
      break;
  }
}

function solutionCoversChain(chain: ChainCandidate, solutionEvents: string[]): boolean {
  const solutionTypes = new Set(nonWalkTypes(solutionEvents));
  if (!solutionTypes.has("push_ice")) {
    return false;
  }
  const coverage = chainCoverage(chain, solutionTypes);
  if (coverage.total === 0) {
    return false;
  }
  if (coverage.covered < Math.min(3, Math.ceil(coverage.total * 0.5))) {
    return false;
  }

  return coverage.rareTotal === 0 || coverage.rareCovered > 0;
}

function scoreFinding(
  chain: ChainCandidate,
  analysis: LevelAnalysis,
  productUse: ProductUseSummary,
): number {
  const counts = countEvents(analysis.solution.events);
  const local = localMetrics(analysis);
  const solutionTypes = new Set(nonWalkTypes(analysis.solution.events));
  const coverage = chainCoverage(chain, solutionTypes);
  const coveredChainScore = Math.round(chain.score * 0.35 * coverage.ratio);
  return (
    coveredChainScore +
    coverage.covered * 14 +
    coverage.rareCovered * 16 +
    solutionTypes.size * 15 +
    productUse.strongUseCount * 34 +
    Object.keys(productUse.kindCounts).length * 10 +
    (counts.push_ice ?? 0) * 8 +
    (counts.ice_destroy_group_d6_plus ?? 0) * 20 +
    (counts.ice_pass_through_d5 ?? 0) * 16 +
    (counts.slide_restart_after_group ?? 0) * 10 +
    (counts.ice_rebound_d4 ?? 0) * 10 +
    (counts.ice_blocks_ice_no_chain_push ?? 0) * 10 +
    (counts.ice_stop_short ?? 0) * 7 +
    local.nonWalkSnapshots * 8 +
    (local.area > 0 && local.area <= 64 ? 18 : 0) -
    (local.area > 120 ? 18 : 0) -
    Math.max(0, trailingWalkSteps(analysis) - 10) * 2
  );
}

type StepTrace = {
  step: number;
  input: IceSlideAction;
  events: string[];
  before: IceSlideState;
  after: IceSlideState;
  playerAfterCell: string;
  push?: PushTrace;
};

type PushTrace = {
  step: number;
  input: Direction;
  events: string[];
  pushedIceStart: string;
  slidePath: string[];
  obstacleCells: string[];
  finalIceCells: string[];
  removedIceCells: string[];
  destroyedWallCells: string[];
};

function scanSolutionProductUse(
  pkg: PrototypePackage,
  level: LevelDoc,
  inputs: IceSlideAction[],
): ProductUseSummary {
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic) as PuzzleRuntime<
    IceSlideState,
    IceSlideAction,
    IceSlideStepOptions
  >;
  let state = adapter.parseLevel(level) as IceSlideState;
  const traces: StepTrace[] = [];

  for (const [index, input] of inputs.entries()) {
    const before = state;
    const result = runtime.step(before, input, { winCondition: level.win });
    if (!result.legal) {
      break;
    }
    const after = result.state;
    const push = result.events.some((event) => eventType(event) === "push_ice")
      ? describePush(index + 1, input, before, after, result.events)
      : undefined;
    traces.push({
      step: index + 1,
      input,
      events: result.events,
      before,
      after,
      playerAfterCell: pointKey(after.player),
      ...(push ? { push } : {}),
    });
    state = after;
  }

  return summarizeProductUses(traces, state);
}

function describePush(
  step: number,
  input: IceSlideAction,
  before: IceSlideState,
  after: IceSlideState,
  events: string[],
): PushTrace | undefined {
  const dir = input as Direction;
  const pushedIceStart = translate(before.player, dir);
  const pushedIceStartKey = pointKey(pushedIceStart);
  const beforeIce = new Set(before.ice.map(pointKey));
  if (!beforeIce.has(pushedIceStartKey)) {
    return undefined;
  }
  const afterIce = new Set(after.ice.map(pointKey));
  const slide = describeSlide(before, pushedIceStart, dir);
  return {
    step,
    input: dir,
    events,
    pushedIceStart: pushedIceStartKey,
    slidePath: slide.path,
    obstacleCells: slide.obstacleCells,
    finalIceCells: [...afterIce].filter((key) => !beforeIce.has(key)),
    removedIceCells: [...beforeIce].filter((key) => !afterIce.has(key)),
    destroyedWallCells: [...before.walls].filter((key) => !after.walls.has(key)),
  };
}

function describeSlide(
  state: IceSlideState,
  origin: Cell,
  dir: Direction,
): { path: string[]; obstacleCells: string[] } {
  const path: string[] = [];
  const originKey = pointKey(origin);
  let cursor = origin;

  while (true) {
    const next = translate(cursor, dir);
    if (!inStateBounds(state, next)) {
      return { path, obstacleCells: [] };
    }

    if (isObstacleForSlide(state, next, originKey)) {
      return { path, obstacleCells: collectObstacleGroupKeys(state, next, dir, originKey) };
    }

    path.push(pointKey(next));
    cursor = next;
  }
}

function collectObstacleGroupKeys(
  state: IceSlideState,
  start: Cell,
  dir: Direction,
  ignoredIceKey: string,
): string[] {
  const cells: string[] = [];
  let cursor = start;
  while (inStateBounds(state, cursor) && isObstacleForSlide(state, cursor, ignoredIceKey)) {
    cells.push(pointKey(cursor));
    cursor = translate(cursor, dir);
  }
  return cells;
}

function isObstacleForSlide(state: IceSlideState, cell: Cell, ignoredIceKey: string): boolean {
  const key = pointKey(cell);
  return state.walls.has(key) || (key !== ignoredIceKey && state.ice.some((ice) => pointKey(ice) === key));
}

function summarizeProductUses(traces: StepTrace[], finalState: IceSlideState): ProductUseSummary {
  const uses: ProductUse[] = [];
  const seen = new Set<string>();
  const pushes = traces.flatMap((trace) => (trace.push ? [trace.push] : []));
  const finalIce = new Set(finalState.ice.map(pointKey));

  function addUse(use: ProductUse): void {
    const key = `${use.kind}|${use.fromStep}|${use.toStep ?? "final"}|${use.cell}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    uses.push(use);
  }

  for (const push of pushes) {
    for (const cell of push.finalIceCells) {
      if (finalState.targets.has(cell) && finalIce.has(cell)) {
        addUse({
          kind: "target_filled",
          fromStep: push.step,
          cell,
          detail: "ice produced by this push is on a target in the final state",
        });
      }
    }

    for (const later of traces.filter((trace) => trace.step > push.step)) {
      const laterPush = later.push;
      for (const cell of push.finalIceCells) {
        if (laterPush?.pushedIceStart === cell) {
          addUse({
            kind: "ice_reused_as_pushed_object",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "ice produced by an earlier push is pushed again later",
          });
        }
        if (laterPush?.obstacleCells.includes(cell)) {
          addUse({
            kind: "ice_as_obstacle",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "ice produced by an earlier push is used as a later slide obstacle",
          });
        }
      }

      for (const cell of push.destroyedWallCells) {
        if (later.playerAfterCell === cell || laterPush?.pushedIceStart === cell) {
          addUse({
            kind: "opened_wall_player_path",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "a wall destroyed by an earlier push is later occupied by the player",
          });
        }
        if (laterPush?.slidePath.includes(cell)) {
          addUse({
            kind: "opened_wall_slide_path",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "a wall destroyed by an earlier push is later crossed by sliding ice",
          });
        }
      }

      for (const cell of push.removedIceCells) {
        if (later.playerAfterCell === cell || laterPush?.pushedIceStart === cell) {
          addUse({
            kind: "moved_ice_opened_player_path",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "a cell vacated by earlier ice is later occupied by the player",
          });
        }
        if (laterPush?.slidePath.includes(cell)) {
          addUse({
            kind: "moved_ice_opened_slide_path",
            fromStep: push.step,
            toStep: later.step,
            cell,
            detail: "a cell vacated by earlier ice is later crossed by sliding ice",
          });
        }
      }
    }
  }

  const kindCounts = countProductUseKinds(uses);
  return {
    uses: uses.sort((left, right) => left.fromStep - right.fromStep || (left.toStep ?? 9999) - (right.toStep ?? 9999) || left.kind.localeCompare(right.kind)),
    kindCounts,
    strongUseCount: uses.filter((use) => use.kind !== "target_filled").length,
  };
}

function countProductUseKinds(uses: ProductUse[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const use of uses) {
    counts[use.kind] = (counts[use.kind] ?? 0) + 1;
  }
  return counts;
}

function chainCoverage(
  chain: ChainCandidate,
  solutionTypes: Set<string>,
): { total: number; covered: number; rareTotal: number; rareCovered: number; ratio: number } {
  const majorChainTypes = [...chain.eventTypes].filter(
    (type) => type !== "push_ice" && type !== "ice_boundary_disappear_after_group",
  );
  const rareChainTypes = majorChainTypes.filter((type) =>
    [
      "ice_blocks_ice_no_chain_push",
      "ice_destroy_group_d6_plus",
      "ice_pass_through_d5",
      "ice_rebound_d4",
      "slide_restart_after_group",
    ].includes(type),
  );
  const covered = majorChainTypes.filter((type) => solutionTypes.has(type)).length;
  const rareCovered = rareChainTypes.filter((type) => solutionTypes.has(type)).length;
  return {
    total: majorChainTypes.length,
    covered,
    rareTotal: rareChainTypes.length,
    rareCovered,
    ratio: majorChainTypes.length === 0 ? 0 : covered / majorChainTypes.length,
  };
}

function dedupeFindings(findings: Finding[]): Finding[] {
  const bestById = new Map<string, Finding>();
  for (const finding of findings) {
    const current = bestById.get(finding.id);
    if (!current || finding.score > current.score) {
      bestById.set(finding.id, finding);
    }
  }
  return [...bestById.values()];
}

function baseLevel(sample: BaseSample): LevelDoc {
  return {
    id: sample.id,
    title: "Target derivation base",
    role: "challenge",
    status: "generated",
    targets: ["K_ice_runtime_smoke"],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: [],
    expected_llm_player_evidence: [],
    layout: sample.layout,
    win: {
      type: "ice_slide_escape_explicit_goal",
      player_start: pointTuple(sample.start),
    },
  };
}

function targetLevel(sample: BaseSample, layout: string, target: TargetCandidate): LevelDoc {
  const start = pointTuple(sample.start);
  const win: WinCondition = {
    type: "ice_slide_escape_explicit_goal",
    player_start: start,
    player_goal: start,
  };
  return {
    id: `${sample.id}_target_${target.point.x}_${target.point.y}`,
    title: "Derived target candidate",
    role: "challenge",
    status: "generated",
    targets: ["K_ice_runtime_smoke"],
    known_before: [],
    target_learning: [],
    support_level: "none",
    expected_solver_evidence: ["solvable", "full_graph_complete"],
    expected_llm_player_evidence: [],
    layout,
    win,
  };
}

function isProductive(events: string[]): boolean {
  return events.some((event) => eventType(event) !== "walk") && events.some((event) => eventType(event) === "push_ice");
}

function productiveEventScore(events: string[]): number {
  const types = new Set(events.map(eventType));
  let score = 0;
  if (types.has("push_ice")) score += 8;
  if (types.has("ice_destroy_group_d6_plus")) score += 28;
  if (types.has("ice_pass_through_d5")) score += 24;
  if (types.has("slide_restart_after_group")) score += 12;
  if (types.has("ice_rebound_d4")) score += 14;
  if (types.has("ice_blocks_ice_no_chain_push")) score += 12;
  if (types.has("ice_stop_short")) score += 10;
  if (types.has("ice_destroyed_d3")) score += 10;
  if (types.has("ice_boundary_disappear") || types.has("ice_boundary_disappear_after_group")) {
    score += 8;
  }
  return score + Math.max(0, types.size - 1) * 3;
}

function hasProductiveReachableWithin(
  graph: CompleteGraph<IceSlideState, IceSlideAction>,
  stateIndex: number,
  maxWalkGap: number,
): boolean {
  const queue: Array<{ stateIndex: number; depth: number }> = [{ stateIndex, depth: 0 }];
  const visited = new Set<number>([stateIndex]);
  let cursor = 0;
  while (cursor < queue.length) {
    const current = queue[cursor]!;
    cursor += 1;
    for (const edgeIndex of graph.outgoingEdgeIndexes[current.stateIndex] ?? []) {
      const edge = graph.edges[edgeIndex]!;
      if (isProductive(edge.events)) {
        return true;
      }
      if (current.depth >= maxWalkGap) {
        continue;
      }
      if (!visited.has(edge.to) && edge.events.every((event) => eventType(event) === "walk")) {
        visited.add(edge.to);
        queue.push({ stateIndex: edge.to, depth: current.depth + 1 });
      }
    }
  }
  return false;
}

function changedIceBetween(before: IceSlideState, after: IceSlideState): string[] {
  const beforeKeys = new Set(before.ice.map(pointKey));
  const afterKeys = new Set(after.ice.map(pointKey));
  const changed = new Set<string>();
  for (const key of beforeKeys) {
    if (!afterKeys.has(key)) {
      changed.add(key);
    }
  }
  for (const key of afterKeys) {
    if (!beforeKeys.has(key)) {
      changed.add(key);
    }
  }
  return [...changed];
}

function countEvents(events: string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const event of events) {
    const type = eventType(event);
    counts[type] = (counts[type] ?? 0) + 1;
  }
  return counts;
}

function nonWalkTypes(events: string[]): string[] {
  return [...new Set(events.map(eventType).filter((type) => type !== "walk"))].sort();
}

function trailingWalkSteps(analysis: LevelAnalysis): number {
  let count = 0;
  for (let index = analysis.solution.events.length - 1; index >= 0; index -= 1) {
    if (eventType(analysis.solution.events[index]!) === "walk") {
      count += 1;
    } else {
      break;
    }
  }
  return count;
}

function localMetrics(analysis: LevelAnalysis): { nonWalkSnapshots: number; area: number } {
  const boxes = analysis.keySnapshots.map((snapshot) => changedBox(snapshot.before, snapshot.after));
  const nonEmpty = boxes.filter((box) => box.changed > 0);
  if (nonEmpty.length === 0) {
    return { nonWalkSnapshots: 0, area: 0 };
  }
  const minX = Math.min(...nonEmpty.map((box) => box.minX));
  const minY = Math.min(...nonEmpty.map((box) => box.minY));
  const maxX = Math.max(...nonEmpty.map((box) => box.maxX));
  const maxY = Math.max(...nonEmpty.map((box) => box.maxY));
  return {
    nonWalkSnapshots: nonEmpty.length,
    area: (maxX - minX + 1) * (maxY - minY + 1),
  };
}

function changedBox(before: string, after: string): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  changed: number;
} {
  const beforeRows = before.split("\n");
  const afterRows = after.split("\n");
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = -1;
  let maxY = -1;
  let changed = 0;
  for (let y = 0; y < beforeRows.length; y += 1) {
    const beforeRow = beforeRows[y] ?? "";
    const afterRow = afterRows[y] ?? "";
    for (let x = 0; x < beforeRow.length; x += 1) {
      if (beforeRow[x] !== afterRow[x]) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        changed += 1;
      }
    }
  }
  return changed === 0 ? { minX: 0, minY: 0, maxX: 0, maxY: 0, changed: 0 } : { minX, minY, maxX, maxY, changed };
}

function makeWalledGrid(width: number, height: number): MutableGrid {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : ".")),
  );
}

function addBaffles(grid: MutableGrid, rng: Rng, center: Cell): void {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  const count = randInt(rng, 5, 12);
  for (let index = 0; index < count; index += 1) {
    const dir = pick(rng, directions);
    const base = {
      x: clamp(center.x + randInt(rng, -4, 4), 1, width - 2),
      y: clamp(center.y + randInt(rng, -3, 3), 1, height - 2),
    };
    const length = randInt(rng, 1, 3);
    for (let offset = 0; offset < length; offset += 1) {
      const cell = translate(base, dir, offset);
      if (isInterior(cell, width, height) && rng() < 0.72) {
        grid[cell.y]![cell.x] = "#";
      }
    }
  }
}

function placeStamp(
  grid: MutableGrid,
  rng: Rng,
  center: Cell,
): { pusher: Cell; label: string } | undefined {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  const stamp = pick(rng, stamps);
  const dir = pick(rng, directions);

  for (let attempt = 0; attempt < 100; attempt += 1) {
    const base = {
      x: clamp(center.x + randInt(rng, -4, 4), 1, width - 2),
      y: clamp(center.y + randInt(rng, -3, 3), 1, height - 2),
    };
    const cells = [...stamp.pattern].map((_, index) => translate(base, dir, index));
    if (!cells.every((cell) => isInterior(cell, width, height))) {
      continue;
    }
    for (const [index, glyph] of [...stamp.pattern].entries()) {
      setStampCell(grid, cells[index]!, glyph);
    }
    return { pusher: cells[0]!, label: `${stamp.id}:${dir}` };
  }
  return undefined;
}

function setStampCell(grid: MutableGrid, cell: Cell, glyph: string): void {
  if (glyph === "P" || glyph === ".") {
    grid[cell.y]![cell.x] = ".";
    return;
  }
  if (glyph === "I" || glyph === "#") {
    grid[cell.y]![cell.x] = glyph;
  }
}

function chooseStartDoor(grid: MutableGrid, rng: Rng, pushers: Cell[]): Cell | undefined {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  const candidates = pushers.flatMap((pusher) => [
    { x: 0, y: pusher.y },
    { x: width - 1, y: pusher.y },
    { x: pusher.x, y: 0 },
    { x: pusher.x, y: height - 1 },
  ]);
  const edgeCandidates = candidates.filter((candidate) => isEdge(candidate, width, height));
  if (edgeCandidates.length === 0) {
    return undefined;
  }
  return pick(rng, edgeCandidates);
}

function openStartDoor(grid: MutableGrid, start: Cell): void {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  grid[start.y]![start.x] = "@";
  const inward = inwardNeighbor(start, width, height);
  if (inward && isInterior(inward, width, height)) {
    grid[inward.y]![inward.x] = ".";
  }
}

function layoutWithTarget(layout: string, target: Cell): string | undefined {
  const rows = layout.split("\n").map((row) => [...row]);
  const row = rows[target.y];
  if (!row || row[target.x] !== ".") {
    return undefined;
  }
  row[target.x] = "G";
  return rows.map((cells) => cells.join("")).join("\n");
}

function renderEndpointWithTarget(state: IceSlideState, target: Cell): string {
  const rows = Array.from({ length: state.height }, () =>
    Array.from({ length: state.width }, () => "."),
  );
  for (const key of state.walls) {
    const point = pointFromKey(key);
    rows[point.y]![point.x] = "#";
  }
  rows[target.y]![target.x] = "G";
  for (const ice of state.ice) {
    rows[ice.y]![ice.x] = pointKey(ice) === pointKey(target) ? "*" : "I";
  }
  rows[state.player.y]![state.player.x] =
    pointKey(state.player) === pointKey(target) ? "+" : "@";
  return rows.map((row) => row.join("")).join("\n");
}

function overlayStartTarget(layout: string, start: Cell, target: Cell): string {
  const rows = layout.split("\n").map((row) => [...row]);
  rows[start.y]![start.x] = "S";
  rows[target.y]![target.x] = rows[target.y]![target.x] === "I" ? "*" : "T";
  return rows.map((row) => row.join("")).join("\n");
}

function renderGrid(grid: MutableGrid): string {
  return grid.map((row) => row.join("")).join("\n");
}

function pointTuple(point: Cell): PointTuple {
  return [point.x, point.y];
}

function pointKey(point: Point): string {
  return `${point.x},${point.y}`;
}

function pointFromKey(key: string): Cell {
  const [xRaw, yRaw] = key.split(",");
  return { x: Number(xRaw), y: Number(yRaw) };
}

function translate(point: Cell, dir: Direction, distance = 1): Cell {
  const vector = vectors[dir];
  return { x: point.x + vector.x * distance, y: point.y + vector.y * distance };
}

function inwardNeighbor(cell: Cell, width: number, height: number): Cell | undefined {
  if (cell.y === 0) return { x: cell.x, y: 1 };
  if (cell.y === height - 1) return { x: cell.x, y: height - 2 };
  if (cell.x === 0) return { x: 1, y: cell.y };
  if (cell.x === width - 1) return { x: width - 2, y: cell.y };
  return undefined;
}

function isInterior(cell: Cell, width: number, height: number): boolean {
  return cell.x > 0 && cell.y > 0 && cell.x < width - 1 && cell.y < height - 1;
}

function inStateBounds(state: Pick<IceSlideState, "width" | "height">, cell: Cell): boolean {
  return cell.x >= 0 && cell.y >= 0 && cell.x < state.width && cell.y < state.height;
}

function isEdge(cell: Cell, width: number, height: number): boolean {
  return cell.x === 0 || cell.y === 0 || cell.x === width - 1 || cell.y === height - 1;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick<T>(rng: Rng, items: T[]): T {
  return items[Math.floor(rng() * items.length)]!;
}

function mulberry32(seed: number): Rng {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function parseOptions(argv: string[]): Options | "help" {
  const values = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]!;
    if (arg === "--help" || arg === "-h") {
      return "help";
    }
    if (!arg.startsWith("--")) {
      continue;
    }
    const inline = arg.indexOf("=");
    if (inline !== -1) {
      values.set(arg.slice(0, inline), arg.slice(inline + 1));
      continue;
    }
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      values.set(arg, next);
      index += 1;
    }
  }

  const options: Options = { ...defaultOptions };
  options.prototype = values.get("--prototype") ?? options.prototype;
  options.seed = numberOption(values, "--seed", options.seed);
  options.iterations = numberOption(values, "--iterations", options.iterations);
  options.maxFindings = numberOption(values, "--max-findings", options.maxFindings);
  options.width = numberOption(values, "--width", options.width);
  options.height = numberOption(values, "--height", options.height);
  options.minWidth = numberOption(values, "--min-width", options.minWidth);
  options.maxWidth = numberOption(values, "--max-width", options.maxWidth);
  options.minHeight = numberOption(values, "--min-height", options.minHeight);
  options.maxHeight = numberOption(values, "--max-height", options.maxHeight);
  options.baseMaxStates = numberOption(values, "--base-max-states", options.baseMaxStates);
  options.sourceLimit = numberOption(values, "--source-limit", options.sourceLimit);
  options.endpointsPerBase = numberOption(values, "--endpoints-per-base", options.endpointsPerBase);
  options.targetCandidatesPerEndpoint = numberOption(
    values,
    "--target-candidates-per-endpoint",
    options.targetCandidatesPerEndpoint,
  );
  options.chainMaxSteps = numberOption(values, "--chain-max-steps", options.chainMaxSteps);
  options.chainBeam = numberOption(values, "--chain-beam", options.chainBeam);
  options.chainWalkGap = numberOption(values, "--chain-walk-gap", options.chainWalkGap);
  options.maxStates = numberOption(values, "--max-states", options.maxStates);
  options.graphMaxStates = numberOption(values, "--graph-max-states", options.graphMaxStates);
  options.maxDepth = numberOption(values, "--max-depth", options.maxDepth);
  if (values.has("--base-max-depth")) {
    options.baseMaxDepth = numberOption(values, "--base-max-depth", 0);
  }
  return options;
}

function numberOption(values: Map<string, string>, key: string, fallback: number): number {
  const raw = values.get(key);
  if (raw === undefined) {
    return fallback;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${key} must be a number, got '${raw}'.`);
  }
  return parsed;
}

function printUsage(): void {
  console.log(`Usage:
  npx tsx src/prototypes/ice_slide_escape/tools/targetDerivationMiner.ts [options]

Options:
  --seed <n>
  --iterations <n>
  --max-findings <n>
  --width <n> --height <n>
  --base-max-states <n>
  --graph-max-states <n>
  --max-states <n>
  --chain-max-steps <n>
  --chain-beam <n>`);
}

function printReport(report: { stats: Stats; findings: Finding[] }, options: Options): void {
  console.log(
    JSON.stringify(
      {
        generator: "scc_target_derivation_experimental",
        seed: options.seed,
        iterations: options.iterations,
        options: {
          baseMaxStates: options.baseMaxStates,
          graphMaxStates: options.graphMaxStates,
          maxStates: options.maxStates,
          chainMaxSteps: options.chainMaxSteps,
          chainBeam: options.chainBeam,
        },
        stats: report.stats,
      },
      null,
      2,
    ),
  );

  for (const [index, finding] of report.findings.entries()) {
    console.log("");
    console.log(
      `## DERIVED_${index + 1} id=${finding.id} score=${finding.score} cost=${finding.analysis.solution.cost}`,
    );
    console.log(
      `base=${finding.sample.width}x${finding.sample.height} target=${pointKey(finding.target.point)} reason=${finding.target.reason}`,
    );
    console.log(
      `baseChain productive=${finding.chain.productiveCount} terminal=${finding.chain.terminal} types=${[...finding.chain.eventTypes].sort().join(",")}`,
    );
    console.log(
      `solution types=${finding.solutionEventTypes.join(",")} events=${JSON.stringify(finding.solutionEvents)}`,
    );
    console.log(
      `product-use strong=${finding.productUse.strongUseCount} kinds=${JSON.stringify(finding.productUse.kindCounts)}`,
    );
    console.log(
      `graph=${finding.analysis.graph.status} states=${finding.analysis.graph.reachableStateCount} transitions=${finding.analysis.graph.legalTransitionCount} wins=${finding.analysis.graph.winStateCount}`,
    );
    console.log(`stamps=${finding.sample.stamps.join(" | ")}`);
    console.log("derived layout:");
    console.log(finding.derivedLayout);
    console.log("overlay:");
    console.log(overlayStartTarget(finding.derivedLayout, finding.sample.start, finding.target.point));
    console.log("endpoint with target:");
    console.log(renderEndpointWithTarget(finding.endpointState, finding.target.point));
    console.log(`solution inputs=${finding.analysis.solution.inputs.join(" ")}`);
    for (const use of finding.productUse.uses.slice(0, 8)) {
      const to = use.toStep === undefined ? "final" : String(use.toStep);
      console.log(`use ${use.kind}: step ${use.fromStep} -> ${to} at ${use.cell}`);
    }
    for (const snapshot of finding.analysis.keySnapshots.slice(0, 4)) {
      const box = changedBox(snapshot.before, snapshot.after);
      console.log(
        `-- step ${snapshot.step} ${snapshot.input} ${snapshot.events.join(",")} box=${JSON.stringify(box)}`,
      );
      console.log("before:");
      console.log(crop(snapshot.before, box));
      console.log("after:");
      console.log(crop(snapshot.after, box));
    }
  }
}

function crop(
  text: string,
  box: { minX: number; minY: number; maxX: number; maxY: number; changed: number },
): string {
  if (box.changed === 0) {
    return text;
  }
  const rows = text.split("\n");
  const minY = Math.max(0, box.minY - 1);
  const maxY = Math.min(rows.length - 1, box.maxY + 1);
  const minX = Math.max(0, box.minX - 1);
  const maxX = Math.min((rows[0]?.length ?? 1) - 1, box.maxX + 1);
  return rows
    .slice(minY, maxY + 1)
    .map((row) => row.slice(minX, maxX + 1))
    .join("\n");
}

void main();
