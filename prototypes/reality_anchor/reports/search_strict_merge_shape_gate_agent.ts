import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type Rng = () => number;

type StrictProof = {
  walkSccCount: number;
  relevantWalkSccCount: number;
  relevantPureWalkCrossSccEdges: number;
  macroPath: number[];
  canonicalLabels: string[];
  erasedReturnBranches: number;
  pathEdgesAreUndirectedBridges: boolean;
  forwardLabelsUnique: boolean;
};

type TraceFrame = {
  input: InputId;
  state: RealityAnchorState;
  events: string[];
};

type Hit = {
  id: string;
  layout: string;
  cost: number;
  objectInputs: number;
  objectInputRatio: number;
  nonWalkEvents: number;
  inputs: InputId[];
  labels: string[];
  graphStates: number;
  graphEdges: number;
  winState: number;
  goalKeys: string[];
  finalStickySize: number;
  mergeStep: number;
  rigidAfterMerge: number;
  shiftedAnchors: string[];
  revisitRate: number;
  heavyReuseRatio: number;
  executionBand: number;
  spaceReuseBand: number;
  proof: StrictProof;
  score: number;
};

const seed = Number(process.argv[2] ?? 2026071071);
const iterations = Number(process.argv[3] ?? 1200);
const graphMaxStates = Number(process.argv[4] ?? 120_000);
const maxHits = Number(process.argv[5] ?? 12);
const minObjectSteps = Number(process.argv[6] ?? 10);
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const hits: Hit[] = [];
const counters = new Map<string, number>();

for (let sample = 0; sample < iterations; sample += 1) {
  bump("sampled");
  const sampled = sampleMergeMotif(sample);
  if (!sampled) {
    bump("sample_rejected");
    continue;
  }
  let initial: RealityAnchorState;
  try {
    initial = adapter.parseLevel(toLevel(sampled.id, sampled.layout)) as RealityAnchorState;
  } catch {
    bump("parse_rejected");
    continue;
  }
  if (initial.stickyGroups.length !== 2 || initial.stickyGroups.some((group) => group.length !== 1)
    || initial.crates.length < 1 || initial.crates.length > 3) {
    bump("initial_material_rejected");
    continue;
  }
  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates: graphMaxStates, terminalizeWins: false },
  ) as Graph;
  if (graph.status !== "complete") {
    bump("graph_exhausted");
    continue;
  }
  bump("graph_complete");
  const eventUniverse = graph.edges.flatMap((edge) => edge.events);
  if (!eventUniverse.some((event) => event.startsWith("sticky_merge"))) {
    bump("no_merge_event");
    continue;
  }
  if (!eventUniverse.some((event) => event === "move_sticky_rigid")) {
    bump("no_rigid_event");
    continue;
  }
  if (!eventUniverse.some((event) => event.startsWith("anchor_boundary_shift"))) {
    bump("no_anchor_shift_event");
    continue;
  }
  bump("event_universe_qualified");

  const incoming = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
  for (const edge of graph.edges) incoming[edge.to]!.push(edge);
  const initialOccupied = occupiedKeys(initial);
  initialOccupied.add(pointKey(initial.player));
  const occupancy = graph.states.map((state) => occupiedKeys(state));
  const candidateStates = graph.states
    .map((state, index) => ({ state, index, depth: graph.depthByIndex[index]! }))
    .filter(({ state, depth }) => depth >= 10 && depth <= 30 && state.stickyGroups.some((group) => group.length >= 3))
    .sort((left, right) => right.depth - left.depth)
    .slice(0, 1200);
  if (candidateStates.length === 0) {
    bump("no_deep_multicell_state");
    continue;
  }

  let sampleHit = false;
  const seenGoalMasks = new Set<string>();
  for (const { state: targetState, index: targetIndex } of candidateStates) {
    const routes = goalSetsForState(initial, targetState, initialOccupied);
    if (routes.length > 0) bump("goal_sets_generated");
    for (const goals of routes) {
      const goalKey = [...goals].sort().join(";");
      if (seenGoalMasks.has(goalKey)) continue;
      seenGoalMasks.add(goalKey);
      const coveredStates: number[] = [];
      for (let index = 0; index < occupancy.length; index += 1) {
        if (![...goals].every((goal) => occupancy[index]!.has(goal))) continue;
        coveredStates.push(index);
      }
      if (coveredStates.length === 0 || !coveredStates.includes(targetIndex)) continue;
      const coveredObjectKeys = new Set(coveredStates.map((index) => objectKey(graph.states[index]!)));
      if (coveredObjectKeys.size !== 1) continue;
      bump("unique_goal_object_state");
      const layout = setGoals(sampled.layout, goals);
      let finalInitial: RealityAnchorState;
      try {
        finalInitial = adapter.parseLevel(toLevel(`${sampled.id}_GOALS`, layout)) as RealityAnchorState;
      } catch {
        continue;
      }
      const finalGraph = enumerateRuntimeGraph(
        runtime,
        finalInitial,
        pkg.mechanic.win,
        { winCondition: pkg.mechanic.win },
        { maxStates: graphMaxStates, terminalizeWins: true },
      ) as Graph;
      if (finalGraph.status !== "complete" || finalGraph.winStateIndexes.size !== 1) continue;
      bump("unique_terminal_win_state");
      const winIndex = [...finalGraph.winStateIndexes][0]!;
      const proof = proveDirectedWalkStrictChain(finalGraph, winIndex);
      if (!proof) continue;
      bump("strict_chain");
      bump(`strict_chain_edges_${proof.macroPath.length - 1}`);
      if (proof.macroPath.length - 1 < minObjectSteps || proof.macroPath.length - 1 > 16) {
        bump("strict_chain_length_rejected");
        continue;
      }
      const finalIncoming = Array.from({ length: finalGraph.keys.length }, () => [] as Edge[]);
      for (const edge of finalGraph.edges) finalIncoming[edge.to]!.push(edge);
      const route = shortestRoute(winIndex, finalGraph, finalIncoming);
      const inputs = route.map((edge) => edge.action);
      const frames = replay(finalInitial, inputs);
      if (frames.length !== inputs.length) continue;
      const mergeStep = frames.findIndex((frame) => frame.events.some((event) => event.startsWith("sticky_merge")));
      if (mergeStep < 0) continue;
      const mergeState = frames[mergeStep]!.state;
      if (!mergeState.stickyGroups.some((group) => group.length >= 3)) continue;
      const rigidAfterMerge = frames.slice(mergeStep + 1)
        .filter((frame) => frame.events.includes("move_sticky_rigid")).length;
      if (rigidAfterMerge < 2) continue;
      const chainEvents = proof.canonicalLabels.flatMap((label) => label.split("&"));
      if (!chainEvents.some((event) => event.startsWith("sticky_merge"))) continue;
      if (chainEvents.filter((event) => event === "move_sticky_rigid").length < 2) continue;
      if (!chainEvents.some((event) => event.startsWith("push_object"))) continue;
      if (!chainEvents.some((event) => event.startsWith("pull_object"))) continue;
      const shiftedAnchors: string[] = [];
      if (chainEvents.includes("anchor_boundary_shift:push_pull")) shiftedAnchors.push("push_pull");
      if (chainEvents.includes("anchor_boundary_shift:box_sticky")) shiftedAnchors.push("box_sticky");
      if (shiftedAnchors.length < 1) continue;
      bump("required_chain_events");

      const objectInputs = frames.filter((frame) => !isPureWalk(frame.events)).length;
      const objectInputRatio = objectInputs / inputs.length;
      if (objectInputs < minObjectSteps || objectInputs > 16 || inputs.length > 30 || objectInputRatio < 0.40) continue;
      const metrics = traceMetrics(finalInitial, frames);
      if (metrics.executionBand < 4 || metrics.spaceReuseBand < 4) continue;
      bump("metric_qualified");

      const finalStickySize = Math.max(...targetState.stickyGroups.map((group) => group.length));
      const id = `RA_STRICT_MERGE_SHAPE_GATE_${seed}_${sample}`;
      const score = metrics.executionBand * 80 + metrics.spaceReuseBand * 90
        + objectInputRatio * 120 + rigidAfterMerge * 20 + proof.macroPath.length * 4
        - inputs.length * 2 - Math.log10(finalGraph.keys.length + 1) * 8;
      hits.push({
        id,
        layout,
        cost: inputs.length,
        objectInputs,
        objectInputRatio,
        nonWalkEvents: frames.flatMap((frame) => frame.events).filter((event) => event !== "walk").length,
        inputs,
        labels: proof.canonicalLabels,
        graphStates: finalGraph.keys.length,
        graphEdges: finalGraph.edges.length,
        winState: winIndex,
        goalKeys: [...goals].sort(),
        finalStickySize,
        mergeStep: mergeStep + 1,
        rigidAfterMerge,
        shiftedAnchors,
        revisitRate: metrics.revisitRate,
        heavyReuseRatio: metrics.heavyReuseRatio,
        executionBand: metrics.executionBand,
        spaceReuseBand: metrics.spaceReuseBand,
        proof,
        score,
      });
      hits.sort((left, right) => right.score - left.score);
      hits.splice(maxHits);
      sampleHit = true;
      break;
    }
    if (sampleHit) break;
  }
  if (sampleHit) bump("hit_samples");
  if ((sample + 1) % 25 === 0) {
    console.log(`progress=${sample + 1}/${iterations} complete=${counters.get("graph_complete") ?? 0} strict=${counters.get("strict_chain") ?? 0} hits=${hits.length}`);
  }
}

console.log(formatReport());

function sampleMergeMotif(index: number): { id: string; layout: string } | null {
  const width = choice([7, 7, 8]);
  const height = choice([6, 6, 7]);
  const grid = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) =>
    x === 0 || y === 0 || x === width - 1 || y === height - 1 ? "#" : "."));
  const mergeY = choice(Array.from({ length: height - 4 }, (_, offset) => offset + 2));
  const boxX = choice(Array.from({ length: Math.max(1, width - 6) }, (_, offset) => offset + 2));
  const mergeX = boxX + 1;
  const anchorCandidates = Array.from({ length: height - 2 }, (_, offset) => offset + 1)
    .filter((y) => y !== mergeY && y !== mergeY - 1 && y !== mergeY + 1);
  if (anchorCandidates.length === 0) return null;
  const anchorY = choice(anchorCandidates);
  const reserved = new Set<string>();
  const reserve = (x: number, y: number) => {
    if (x <= 0 || y <= 0 || x >= width - 1 || y >= height - 1) return false;
    reserved.add(`${x},${y}`);
    return true;
  };
  const fixed: Array<[number, number, string]> = [
    [boxX, anchorY, "B"], [boxX + 1, anchorY, "S"],
    [mergeX, mergeY - 1, "M"], [mergeX, mergeY + 1, "M"],
    [boxX, mergeY, "C"],
  ];
  for (const [x, y] of fixed) if (!reserve(x, y)) return null;
  for (let dx = -1; dx <= 2; dx += 1) {
    reserve(mergeX + dx, mergeY);
    reserve(mergeX + dx, mergeY - 1);
    reserve(mergeX + dx, mergeY + 1);
  }

  const startKind = rng() < 0.48 ? "push" : "pull";
  const player = startKind === "push"
    ? { x: boxX - 1, y: mergeY }
    : { x: mergeX, y: mergeY };
  if (!reserve(player.x, player.y)) return null;

  let pair: [Point, Point] | null = null;
  if (rng() < 0.72) {
    const lower = mergeY + 1;
    const upper = mergeY - 1;
    const x = mergeX + choice([1, 2]);
    if (lower + 1 < height - 1) pair = [{ x, y: lower }, { x, y: lower + 1 }];
    else if (upper - 1 > 0) pair = [{ x, y: upper }, { x, y: upper - 1 }];
  }
  if (!pair || pair.some((point) => reserved.has(`${point.x},${point.y}`) && !isReservedSweepCell(point, mergeX, mergeY))) {
    pair = randomAdjacentPair(grid, reserved);
  }
  if (!pair) return null;
  reserve(pair[0].x, pair[0].y);
  reserve(pair[1].x, pair[1].y);

  const labels = choosePushPullLabels(pair[0], pair[1], player, startKind);
  if (!labels) return null;
  fixed.push([labels.push.x, labels.push.y, "P"], [labels.pull.x, labels.pull.y, "L"]);

  const auxiliaryCount = choice([1, 1, 2]);
  for (let auxiliaryIndex = 0; auxiliaryIndex < auxiliaryCount; auxiliaryIndex += 1) {
    const auxiliaryCandidates: Point[] = [];
    for (let y = 1; y < height - 1; y += 1) {
      for (let x = 1; x <= boxX; x += 1) {
        if (reserved.has(`${x},${y}`)) continue;
        if (Math.abs(x - boxX) + Math.abs(y - mergeY) > 4) continue;
        auxiliaryCandidates.push({ x, y });
      }
    }
    if (auxiliaryCandidates.length > 0) {
      const auxiliary = choice(auxiliaryCandidates);
      reserve(auxiliary.x, auxiliary.y);
      fixed.push([auxiliary.x, auxiliary.y, "C"]);
    }
  }

  const wallRate = 0.34 + rng() * 0.20;
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      if (reserved.has(`${x},${y}`)) continue;
      if (rng() < wallRate) grid[y]![x] = "#";
    }
  }
  for (const [x, y, glyph] of fixed) {
    if (grid[y]?.[x] !== ".") return null;
    grid[y]![x] = glyph;
  }
  if (grid[player.y]?.[player.x] !== ".") return null;
  grid[player.y]![player.x] = "@";
  const empty = emptyPoints(grid);
  if (empty.length === 0) return null;
  const dummy = choice(empty);
  grid[dummy.y]![dummy.x] = "G";
  return { id: `RA_STRICT_MERGE_BASE_${seed}_${index}`, layout: grid.map((row) => row.join("")).join("\n") };
}

function isReservedSweepCell(point: Point, mergeX: number, mergeY: number) {
  return point.x > mergeX && Math.abs(point.y - mergeY) <= 1;
}

function randomAdjacentPair(grid: string[][], reserved: Set<string>): [Point, Point] | null {
  const points = emptyPoints(grid).filter((point) => !reserved.has(`${point.x},${point.y}`));
  shuffle(points);
  for (const first of points) {
    const dirs = shuffle([{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]);
    for (const dir of dirs) {
      const second = { x: first.x + dir.x, y: first.y + dir.y };
      if (grid[second.y]?.[second.x] !== "." || reserved.has(`${second.x},${second.y}`)) continue;
      return [first, second];
    }
  }
  return null;
}

function choosePushPullLabels(first: Point, second: Point, player: Point, desired: "push" | "pull") {
  for (const [push, pull] of [[first, second], [second, first]] as Array<[Point, Point]>) {
    const mode = firstSide(push, pull, player) ? "push" : "pull";
    if (mode === desired) return { push, pull };
  }
  return null;
}

function firstSide(first: Point, second: Point, point: Point) {
  if (first.x !== second.x) return first.x < second.x ? point.x <= first.x : point.x >= first.x;
  return first.y < second.y ? point.y <= first.y : point.y >= first.y;
}

function goalSetsForState(initial: RealityAnchorState, state: RealityAnchorState, initialOccupied: Set<string>): Array<Set<string>> {
  const results: Array<Set<string>> = [];
  for (const group of state.stickyGroups.filter((candidate) => candidate.length >= 3 && candidate.length <= 4)) {
    const groupKeys = group.map(pointKey);
    if (groupKeys.some((key) => initialOccupied.has(key))) continue;
    const anchors: Array<{ kind: string; points: Point[]; initialPoints: Point[] }> = [];
    if (state.pushPullAnchor && initial.pushPullAnchor) {
      anchors.push({ kind: "PL", points: [state.pushPullAnchor.push, state.pushPullAnchor.pull], initialPoints: [initial.pushPullAnchor.push, initial.pushPullAnchor.pull] });
    }
    if (state.boxStickyAnchor && initial.boxStickyAnchor) {
      anchors.push({ kind: "BS", points: [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky], initialPoints: [initial.boxStickyAnchor.box, initial.boxStickyAnchor.sticky] });
    }
    const movedCrateKeys = state.crates.map(pointKey).filter((key) => !initialOccupied.has(key) && !groupKeys.includes(key));
    for (const anchor of anchors) {
      const moved = anchor.points.some((point, index) => pointKey(point) !== pointKey(anchor.initialPoints[index]!));
      if (!moved) continue;
      for (const point of anchor.points) {
        const key = pointKey(point);
        if (initialOccupied.has(key) || groupKeys.includes(key)) continue;
        results.push(new Set([...groupKeys, key]));
        for (const crateKey of movedCrateKeys) {
          if (crateKey === key) continue;
          results.push(new Set([...groupKeys, key, crateKey]));
        }
        for (let left = 0; left < movedCrateKeys.length; left += 1) {
          for (let right = left + 1; right < movedCrateKeys.length; right += 1) {
            results.push(new Set([...groupKeys, key, movedCrateKeys[left]!, movedCrateKeys[right]!]));
          }
        }
      }
    }
    if (anchors.every((anchor) => anchor.points.some((point, index) => pointKey(point) !== pointKey(anchor.initialPoints[index]!)))) {
      for (const left of anchors[0]?.points ?? []) {
        for (const right of anchors[1]?.points ?? []) {
          const keys = [...groupKeys, pointKey(left), pointKey(right)];
          if (new Set(keys).size !== keys.length || keys.some((key) => initialOccupied.has(key))) continue;
          results.push(new Set(keys));
          for (const crateKey of movedCrateKeys) {
            if (keys.includes(crateKey)) continue;
            results.push(new Set([...keys, crateKey]));
          }
          for (let first = 0; first < movedCrateKeys.length; first += 1) {
            for (let second = first + 1; second < movedCrateKeys.length; second += 1) {
              const crateKeys = [movedCrateKeys[first]!, movedCrateKeys[second]!];
              if (crateKeys.some((crateKey) => keys.includes(crateKey))) continue;
              results.push(new Set([...keys, ...crateKeys]));
            }
          }
        }
      }
    }
  }
  return results;
}

function proveDirectedWalkStrictChain(graph: Graph, winState: number): StrictProof | null {
  const pureWalkEdges = graph.edges.filter((edge) => isPureWalk(edge.events));
  const component = stronglyConnectedComponents(graph.keys.length, pureWalkEdges);
  const componentCount = Math.max(...component) + 1;
  const start = component[0]!;
  const goal = component[winState]!;
  const substantiveEdges = graph.edges
    .filter((edge) => edge.from !== winState && !isPureWalk(edge.events))
    .map((edge) => ({ from: component[edge.from]!, to: component[edge.to]!, label: edge.events.filter((event) => event !== "walk").join("&") }));
  const outgoing = Array.from({ length: componentCount }, () => new Set<number>());
  const incoming = Array.from({ length: componentCount }, () => new Set<number>());
  for (const edge of substantiveEdges) {
    if (edge.from === edge.to) continue;
    outgoing[edge.from]!.add(edge.to);
    incoming[edge.to]!.add(edge.from);
  }
  const forward = reachable(start, outgoing);
  const backward = reachable(goal, incoming);
  const relevant = new Set([...forward].filter((node) => backward.has(node)));
  if (!relevant.has(goal)) {
    bump("strict_no_reach");
    return null;
  }
  let relevantPureWalkCrossSccEdges = 0;
  for (const edge of pureWalkEdges) {
    const from = component[edge.from]!;
    const to = component[edge.to]!;
    if (from !== to && relevant.has(from) && relevant.has(to)) relevantPureWalkCrossSccEdges += 1;
  }
  if (relevantPureWalkCrossSccEdges > 0) {
    bump("strict_walk_cross_scc");
    return null;
  }
  const path = directedShortestPath(start, goal, outgoing, relevant);
  if (!path) {
    bump("strict_no_directed_path");
    return null;
  }
  const undirected = Array.from({ length: componentCount }, () => new Set<number>());
  for (const edge of substantiveEdges) {
    if (edge.from === edge.to || !relevant.has(edge.from) || !relevant.has(edge.to)) continue;
    undirected[edge.from]!.add(edge.to);
    undirected[edge.to]!.add(edge.from);
  }
  for (let index = 0; index + 1 < path.length; index += 1) {
    if (connectedWithoutEdge(start, goal, undirected, path[index]!, path[index + 1]!)) {
      bump("strict_non_bridge_path");
      return null;
    }
  }
  const labels: string[] = [];
  for (let index = 0; index + 1 < path.length; index += 1) {
    const from = path[index]!;
    const to = path[index + 1]!;
    const forwardLabels = new Set(substantiveEdges.filter((edge) => edge.from === from && edge.to === to).map((edge) => edge.label));
    if (forwardLabels.size !== 1) {
      bump("strict_forward_label_nonunique");
      return null;
    }
    labels.push([...forwardLabels][0]!);
  }
  return {
    walkSccCount: componentCount,
    relevantWalkSccCount: relevant.size,
    relevantPureWalkCrossSccEdges,
    macroPath: path,
    canonicalLabels: labels,
    erasedReturnBranches: relevant.size - path.length,
    pathEdgesAreUndirectedBridges: true,
    forwardLabelsUnique: true,
  };
}

function stronglyConnectedComponents(stateCount: number, edges: Edge[]) {
  const outgoing = Array.from({ length: stateCount }, () => [] as number[]);
  const reverse = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) {
    outgoing[edge.from]!.push(edge.to);
    reverse[edge.to]!.push(edge.from);
  }
  const visited = new Uint8Array(stateCount);
  const order: number[] = [];
  for (let start = 0; start < stateCount; start += 1) {
    if (visited[start]) continue;
    const stack: Array<{ node: number; next: number }> = [{ node: start, next: 0 }];
    visited[start] = 1;
    while (stack.length > 0) {
      const frame = stack.at(-1)!;
      const targets = outgoing[frame.node]!;
      if (frame.next < targets.length) {
        const next = targets[frame.next++]!;
        if (!visited[next]) {
          visited[next] = 1;
          stack.push({ node: next, next: 0 });
        }
      } else {
        order.push(frame.node);
        stack.pop();
      }
    }
  }
  const component = new Int32Array(stateCount).fill(-1);
  let componentId = 0;
  for (let index = order.length - 1; index >= 0; index -= 1) {
    const start = order[index]!;
    if (component[start] >= 0) continue;
    const stack = [start];
    component[start] = componentId;
    while (stack.length > 0) {
      const node = stack.pop()!;
      for (const next of reverse[node]!) {
        if (component[next] >= 0) continue;
        component[next] = componentId;
        stack.push(next);
      }
    }
    componentId += 1;
  }
  return [...component];
}

function directedShortestPath(start: number, goal: number, outgoing: Array<Set<number>>, allowed: Set<number>): number[] | null {
  const queue = [start];
  const seen = new Set([start]);
  const previous = new Map<number, number>();
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const node = queue[cursor]!;
    if (node === goal) break;
    for (const next of outgoing[node]!) {
      if (!allowed.has(next) || seen.has(next)) continue;
      seen.add(next);
      previous.set(next, node);
      queue.push(next);
    }
  }
  if (!seen.has(goal)) return null;
  const path = [goal];
  while (path[0] !== start) path.unshift(previous.get(path[0]!)!);
  return path;
}

function connectedWithoutEdge(start: number, goal: number, graph: Array<Set<number>>, cutA: number, cutB: number) {
  const queue = [start];
  const seen = new Set([start]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const node = queue[cursor]!;
    if (node === goal) return true;
    for (const next of graph[node]!) {
      if ((node === cutA && next === cutB) || (node === cutB && next === cutA) || seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return false;
}

function reachable(start: number, graph: Array<Set<number>>) {
  const seen = new Set([start]);
  const queue = [start];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const next of graph[queue[cursor]!]!) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return seen;
}

function shortestRoute(target: number, graph: Graph, incoming: Edge[][]) {
  const result: Edge[] = [];
  let current = target;
  while (current !== 0) {
    const depth = graph.depthByIndex[current]!;
    const edge = incoming[current]!.find((candidate) => graph.depthByIndex[candidate.from] === depth - 1);
    if (!edge) throw new Error(`missing BFS predecessor for ${current}`);
    result.push(edge);
    current = edge.from;
  }
  return result.reverse();
}

function replay(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const frames: TraceFrame[] = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) break;
    state = step.state as RealityAnchorState;
    frames.push({ input, state, events: step.events });
  }
  return frames;
}

function traceMetrics(initial: RealityAnchorState, frames: TraceFrame[]) {
  const visits = [initial.player, ...frames.map((frame) => frame.state.player)].map(pointKey);
  const counts = new Map<string, number>();
  for (const key of visits) counts.set(key, (counts.get(key) ?? 0) + 1);
  const walkable = initial.width * initial.height - initial.walls.size;
  const revisitRate = 1 - counts.size / visits.length;
  const heavyReuseRatio = [...counts.values()].filter((count) => count >= 3).length / walkable;
  const nonWalkEvents = frames.flatMap((frame) => frame.events).filter((event) => event !== "walk").length;
  const executionBand = weightedBand([
    [band(frames.length, [8, 10.8, 17, 22.8]), 0.35],
    [band(nonWalkEvents, [6.2, 9.4, 16, 20]), 0.45],
    [band(heavyReuseRatio, [0, 0, 0.052, 0.167]), 0.20],
  ]);
  const spaceReuseBand = weightedBand([
    [band(revisitRate, [0.044, 0.164, 0.325, 0.422]), 0.55],
    [band(heavyReuseRatio, [0, 0, 0.047, 0.173]), 0.45],
  ]);
  return { revisitRate, heavyReuseRatio, executionBand, spaceReuseBand };
}

function setGoals(layout: string, goals: Set<string>) {
  const grid = layout.split("\n").map((row) => [...row]);
  for (const row of grid) for (let x = 0; x < row.length; x += 1) if (row[x] === "G") row[x] = ".";
  for (const key of goals) {
    const [x, y] = key.split(",").map(Number);
    if (grid[y]?.[x] !== ".") throw new Error(`goal ${key} is not empty start floor`);
    grid[y]![x] = "G";
  }
  return grid.map((row) => row.join("")).join("\n");
}

function occupiedKeys(state: RealityAnchorState) {
  return new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
    ...(state.pushPullAnchor ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)] : []),
    ...(state.boxStickyAnchor ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)] : []),
  ]);
}

function objectKey(state: RealityAnchorState) {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups
    .map((group) => group.map(pointKey).sort().join("+"))
    .sort()
    .join(";");
  const pushPull = state.pushPullAnchor
    ? `${pointKey(state.pushPullAnchor.push)}|${pointKey(state.pushPullAnchor.pull)}`
    : "-";
  const boxSticky = state.boxStickyAnchor
    ? `${pointKey(state.boxStickyAnchor.box)}|${pointKey(state.boxStickyAnchor.sticky)}`
    : "-";
  return `C:${crates}|M:${sticky}|PL:${pushPull}|BS:${boxSticky}`;
}

function emptyPoints(grid: string[][]) {
  const points: Point[] = [];
  for (let y = 1; y < grid.length - 1; y += 1) {
    for (let x = 1; x < grid[y]!.length - 1; x += 1) if (grid[y]![x] === ".") points.push({ x, y });
  }
  return points;
}

function isPureWalk(events: string[]) {
  return events.length === 1 && events[0] === "walk";
}

function pointKey(point: Point) {
  return `${point.x},${point.y}`;
}

function band(value: number, thresholds: number[]) {
  if (value <= thresholds[0]!) return 1;
  if (value <= thresholds[1]!) return 2;
  if (value <= thresholds[2]!) return 3;
  if (value <= thresholds[3]!) return 4;
  return 5;
}

function weightedBand(values: Array<[number, number]>) {
  return Math.max(1, Math.min(5, Math.round(values.reduce((sum, [value, weight]) => sum + value * weight, 0))));
}

function toLevel(id: string, layout: string): LevelDoc {
  return {
    id,
    title: id,
    role: "challenge",
    status: "candidate",
    targets: [],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout,
  };
}

function bump(key: string) {
  counters.set(key, (counters.get(key) ?? 0) + 1);
}

function choice<T>(values: T[]) {
  return values[Math.floor(rng() * values.length)]!;
}

function shuffle<T>(values: T[]) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [values[index], values[swap]] = [values[swap]!, values[index]!];
  }
  return values;
}

function mulberry32(value: number): Rng {
  let state = value >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let next = state;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function formatReport() {
  const lines = [
    "# 严格唯一 merge + shape-gate 搜索",
    "",
    `- seed: ${seed}`,
    `- iterations: ${iterations}`,
    `- graphMaxStates: ${graphMaxStates}`,
    `- minObjectSteps: ${minObjectSteps}`,
    "- strict audit: directed pure-walk SCC；可胜宏图的规范路径边全部为无向桥，正向非 walk 标签唯一；相关纯 walk 跨 SCC 边必须为 0。",
    `- hits: ${hits.length}`,
    "",
    "## Counters",
    "",
    ...[...counters.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([key, value]) => `- ${key}: ${value}`),
    "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(
      `## ${index + 1}. ${hit.id}`,
      "",
      `- score=${hit.score.toFixed(2)} cost=${hit.cost} objectInputs=${hit.objectInputs} objectInputRatio=${hit.objectInputRatio.toFixed(4)} nonWalkEvents=${hit.nonWalkEvents}`,
      `- executionBand=${hit.executionBand} spaceReuseBand=${hit.spaceReuseBand} revisit=${hit.revisitRate.toFixed(4)} heavy=${hit.heavyReuseRatio.toFixed(4)}`,
      `- graph=${hit.graphStates}/${hit.graphEdges}/1 goals=${hit.goalKeys.join(";")}`,
      `- stickySize=${hit.finalStickySize} mergeStep=${hit.mergeStep} rigidAfterMerge=${hit.rigidAfterMerge} shiftedAnchors=${hit.shiftedAnchors.join(",")}`,
      `- directedWalkScc=${hit.proof.walkSccCount} relevant=${hit.proof.relevantWalkSccCount} macroPathEdges=${hit.proof.macroPath.length - 1} erasedReturns=${hit.proof.erasedReturnBranches} pureWalkCross=${hit.proof.relevantPureWalkCrossSccEdges}`,
      `- inputs=${hit.inputs.join(" ")}`,
      `- canonicalLabels=${hit.labels.join(" > ")}`,
      "",
      "```text",
      hit.layout,
      "```",
      "",
    );
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
