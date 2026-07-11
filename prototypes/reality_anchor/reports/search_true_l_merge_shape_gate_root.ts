import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type Rng = () => number;
type Step = { input: InputId; events: string[]; state: RealityAnchorState };
type StrictProof = {
  status: "PASS" | "REJECT" | "INCOMPLETE";
  macroStates: number;
  relevantMacroStates: number;
  simplePaths: number;
  distinctPlans: number;
  exhausted: boolean;
  signature?: string;
  signatures?: string[];
};
type Hit = {
  id: string;
  layout: string;
  cost: number;
  inputs: InputId[];
  nonWalk: number;
  events: string[];
  mergeStep: number;
  rigidAfterMerge: number;
  rigidAnchorChainAfterMerge: number;
  pushPullShifts: number;
  boxStickyShifts: number;
  revisitRate: number;
  heavyReuseRatio: number;
  executionBand: number;
  spaceBand: number;
  graph: { states: number; edges: number; wins: number };
  proof: StrictProof;
  score: number;
};
type NearMiss = {
  id: string;
  reason: string;
  layout: string;
  cost?: number;
  inputs?: InputId[];
  facts?: ReturnType<typeof routeFacts>;
  graph?: { status: string; states: number; edges: number; wins: number };
  proof?: StrictProof;
  metrics?: ReturnType<typeof traceMetrics>;
};

const seed = Number(process.argv[2] ?? 2026071081);
const iterations = Number(process.argv[3] ?? 1200);
const baseMaxStates = Number(process.argv[4] ?? 45_000);
const finalMaxStates = Number(process.argv[5] ?? 100_000);
const pathBudget = Number(process.argv[6] ?? 500_000);
const fixedBasePath = process.argv[7];
const fixedBaseLayout = fixedBasePath
  ? (await readFile(fixedBasePath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "")
  : undefined;
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const hits: Hit[] = [];
const nearMisses: NearMiss[] = [];
let parsedBases = 0;
let completeBases = 0;
let qualifiedShapePatterns = 0;
let completeFinals = 0;
let strictPasses = 0;

for (let sample = 0; sample < iterations; sample += 1) {
  const sampled = fixedBaseLayout
    ? { layout: fixedBaseLayout, initiallyEmpty: new Set<string>() }
    : sampleBase();
  if (!sampled) continue;
  const baseLevel = toLevel(`RA_TRUE_L_MERGE_BASE_${seed}_${sample}`, sampled.layout);
  let initial: RealityAnchorState;
  try { initial = adapter.parseLevel(baseLevel) as RealityAnchorState; } catch { continue; }
  if (!fixedBaseLayout && (initial.crates.length !== 1 || initial.stickyGroups.length !== 1 || initial.stickyGroups[0]!.length !== 2)) continue;
  parsedBases += 1;
  const baseGraph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win,
    { winCondition: pkg.mechanic.win }, { maxStates: baseMaxStates, terminalizeWins: false }) as Graph;
  if (baseGraph.status !== "complete") continue;
  completeBases += 1;
  const incoming = incomingEdges(baseGraph);
  const outgoing = outgoingEdges(baseGraph);
  const targets: Array<{ state: number; goals: Point[]; targetKey: string }> = [];
  const seenTargets = new Set<string>();
  for (let stateIndex = 0; stateIndex < baseGraph.states.length; stateIndex += 1) {
    const group = baseGraph.states[stateIndex]!.stickyGroups.find((candidate) => candidate.length === 3 && isL(candidate));
    if (!group) continue;
    const targetKey = group.map(key).sort().join(";");
    const identity = `${targetKey}|${objectKey(baseGraph.keys[stateIndex]!)}`;
    if (seenTargets.has(identity)) continue;
    seenTargets.add(identity);
    targets.push({ state: stateIndex, goals: group.map((point) => ({ ...point })), targetKey });
    if (targets.length >= (fixedBaseLayout ? 240 : 12)) break;
  }

  for (const target of targets) {
    const distances = reverseDistances(target.state, incoming);
    const startOptions: Array<{ state: number; layout: string; prelim: number }> = [];
    const seenLayouts = new Set<string>();
    for (let startState = 0; startState < baseGraph.states.length; startState += 1) {
      const distance = distances[startState]!;
      if (!Number.isFinite(distance) || distance < 12 || distance > 32) continue;
      const route = routeByDistance(startState, distances, outgoing);
      if (!route) continue;
      const start = baseGraph.states[startState]!;
      const trace = replay(start, route.map((edge) => edge.action));
      const facts = routeFacts(start, trace);
      if (!facts.qualifies) continue;
      const layout = renderWithGoals(start, target.goals);
      if (seenLayouts.has(layout)) continue;
      seenLayouts.add(layout);
      const metrics = traceMetrics(start, trace, layout);
      if (metrics.executionBand < 4 || metrics.spaceBand < 4) continue;
      startOptions.push({ state: startState, layout, prelim: metrics.executionBand * 80 + metrics.spaceBand * 90 + facts.rigidAfterMerge * 20 - distance });
    }
    startOptions.sort((a, b) => b.prelim - a.prelim);
    qualifiedShapePatterns += startOptions.length;
    for (const option of startOptions.slice(0, fixedBaseLayout ? 24 : 2)) {
    const variants = goalVariants(baseGraph.states[option.state]!, baseGraph.states[target.state]!, target.goals);
    for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
    const goals = variants[variantIndex]!;
    const finalLayout = renderWithGoals(baseGraph.states[option.state]!, goals);
    const id = `RA_TRUE_L_MERGE_REROOT_${seed}_${sample}_S${option.state}_T${target.state}_G${variantIndex}_${target.targetKey.replaceAll(";", "_").replaceAll(",", "x")}`;
    let finalInitial: RealityAnchorState;
    try { finalInitial = adapter.parseLevel(toLevel(id, finalLayout)) as RealityAnchorState; } catch { continue; }
    const graph = enumerateRuntimeGraph(runtime, finalInitial, pkg.mechanic.win,
      { winCondition: pkg.mechanic.win }, { maxStates: finalMaxStates, terminalizeWins: true }) as Graph;
    const winningObjectConfigurations = new Set([...graph.winStateIndexes].map((state) => objectKey(graph.keys[state]!)));
    if (graph.status !== "complete" || winningObjectConfigurations.size !== 1) {
      keepNear({ id, reason: graph.status !== "complete" ? `final_graph_${graph.status}` : `winning_object_configs_${winningObjectConfigurations.size}_raw_states_${graph.winStateIndexes.size}`, layout: finalLayout, graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size } });
      continue;
    }
    completeFinals += 1;
    const win = [...graph.winStateIndexes].sort((left, right) => graph.depthByIndex[left]! - graph.depthByIndex[right]!)[0]!;
    const route = shortestRoute(win, graph, incomingEdges(graph));
    const inputs = route.map((edge) => edge.action);
    const trace = replay(finalInitial, inputs);
    const facts = routeFacts(finalInitial, trace);
    if (!facts.qualifies || !runtime.isWin(trace.at(-1)?.state ?? finalInitial, pkg.mechanic.win)) {
      keepNear({ id, reason: "final_shortest_route_lost_shape_chain", layout: finalLayout, cost: inputs.length, inputs, facts, graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size } });
      continue;
    }
    const proof = proveDirected(graph, pathBudget);
    if (proof.status !== "PASS") {
      keepNear({ id, reason: `directed_proof_${proof.status}`, layout: finalLayout, cost: inputs.length, inputs, facts, graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size }, proof });
      continue;
    }
    strictPasses += 1;
    const metrics = traceMetrics(finalInitial, trace, finalLayout);
    if (metrics.executionBand < 4 || metrics.spaceBand < 4) {
      keepNear({ id, reason: `trace_band_${metrics.executionBand}_${metrics.spaceBand}`, layout: finalLayout, cost: inputs.length, inputs, facts, graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size }, proof, metrics });
      continue;
    }
    const allEvents = trace.flatMap((step) => step.events);
    const nonWalk = trace.filter((step) => substantive(step.events).length > 0).length;
    const score =
      (facts.rigidAnchorChainAfterMerge > 0 ? 160 : 0) +
      Math.min(facts.rigidAfterMerge, 4) * 35 +
      (facts.pushPullShifts > 0 ? 35 : 0) +
      (facts.boxStickyShifts > 0 ? 35 : 0) +
      nonWalk * 12 - (inputs.length - nonWalk) * 3 +
      metrics.revisitRate * 90 + metrics.heavyReuseRatio * 130 -
      Math.log10(graph.keys.length + 1) * 8;
    hits.push({
      id, layout: finalLayout, cost: inputs.length, inputs, nonWalk, events: allEvents,
      mergeStep: facts.mergeStep, rigidAfterMerge: facts.rigidAfterMerge,
      rigidAnchorChainAfterMerge: facts.rigidAnchorChainAfterMerge,
      pushPullShifts: facts.pushPullShifts, boxStickyShifts: facts.boxStickyShifts,
      ...metrics,
      graph: { states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size },
      proof, score,
    });
    hits.sort((a, b) => b.score - a.score);
    hits.splice(20);
    }
    }
  }
  if ((sample + 1) % 100 === 0) {
    console.log(`progress=${sample + 1} parsed=${parsedBases} baseComplete=${completeBases} patterns=${qualifiedShapePatterns} finals=${completeFinals} strict=${strictPasses} hits=${hits.length}`);
  }
}

const outBase = `prototypes/Reality_Anchor/reports/search_true_l_merge_shape_gate_root_${seed}`;
await writeFile(`${outBase}.json`, `${JSON.stringify({ seed, iterations, baseMaxStates, finalMaxStates, pathBudget, parsedBases, completeBases, qualifiedShapePatterns, completeFinals, strictPasses, hits, nearMisses }, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, format(), "utf8");
console.log(format());

function routeFacts(initial: RealityAnchorState, trace: Step[]) {
  let mergeStep = 0;
  let firstThreeCellStep = 0;
  let rigidAfterMerge = 0;
  let rigidAnchorChainAfterMerge = 0;
  let pushPullShifts = 0;
  let boxStickyShifts = 0;
  let hasPush = false;
  let hasPull = false;
  for (let index = 0; index < trace.length; index += 1) {
    const step = trace[index]!;
    const events = step.events;
    if (!mergeStep && events.some((event) => event.startsWith("sticky_merge"))) mergeStep = index + 1;
    if (!firstThreeCellStep && step.state.stickyGroups.some((group) => group.length >= 3)) firstThreeCellStep = index + 1;
    const isPostThree = firstThreeCellStep > 0 && index + 1 > firstThreeCellStep;
    const rigid = events.includes("move_sticky_rigid");
    const anchorShift = events.some((event) => event.startsWith("anchor_boundary_shift:"));
    if (isPostThree && rigid) rigidAfterMerge += 1;
    if (isPostThree && rigid && anchorShift && events.some((event) => event.startsWith("force_chain:"))) rigidAnchorChainAfterMerge += 1;
    if (events.includes("anchor_boundary_shift:push_pull")) pushPullShifts += 1;
    if (events.includes("anchor_boundary_shift:box_sticky")) boxStickyShifts += 1;
    if (events.some((event) => event.startsWith("push_object:"))) hasPush = true;
    if (events.some((event) => event.startsWith("pull_object:"))) hasPull = true;
  }
  const finalGroup = trace.at(-1)?.state.stickyGroups.find((group) => group.length === 3);
  const qualifies = mergeStep > 0 && firstThreeCellStep >= mergeStep && rigidAfterMerge >= 2 &&
    rigidAnchorChainAfterMerge >= 1 && pushPullShifts + boxStickyShifts >= 1 && hasPush && hasPull &&
    !!finalGroup && isL(finalGroup) && trace.length >= 12 && trace.length <= 32;
  return { mergeStep, firstThreeCellStep, rigidAfterMerge, rigidAnchorChainAfterMerge, pushPullShifts, boxStickyShifts, hasPush, hasPull, qualifies, initialStickyCells: initial.stickyGroups.flat().length };
}

function keepNear(item: NearMiss): void {
  if (nearMisses.length < 40) { nearMisses.push(item); return; }
  const rank = (miss: NearMiss) => miss.reason.startsWith("directed_proof_") ? 4 : miss.reason.startsWith("trace_band_") ? 3 : miss.reason === "final_shortest_route_lost_shape_chain" ? 2 : 1;
  let weakest = 0;
  for (let index = 1; index < nearMisses.length; index += 1) if (rank(nearMisses[index]!) < rank(nearMisses[weakest]!)) weakest = index;
  if (rank(item) > rank(nearMisses[weakest]!)) nearMisses[weakest] = item;
}

function proveDirected(graph: Graph, budget: number): StrictProof {
  const walkEdges = graph.edges.filter((edge) => isPureWalk(edge.events));
  const scc = tarjan(graph.states.length, walkEdges);
  const objectKeys = Array.from({ length: scc.count }, () => new Set<string>());
  for (let state = 0; state < graph.keys.length; state += 1) objectKeys[scc.of[state]!]!.add(objectKey(graph.keys[state]!));
  if (objectKeys.some((keys) => keys.size !== 1)) return { status: "REJECT", macroStates: scc.count, relevantMacroStates: 0, simplePaths: 0, distinctPlans: 0, exhausted: false };
  type MacroEdge = { from: number; to: number; kind: "walk" | "object"; reduction: string };
  const dedupe = new Map<string, MacroEdge>();
  for (const edge of graph.edges) {
    const from = scc.of[edge.from]!, to = scc.of[edge.to]!;
    if (from === to) continue;
    const kind = isPureWalk(edge.events) ? "walk" : "object";
    const reduction = kind === "walk" ? "" : `${substantive(edge.events).join("&")}=>${objectKey(graph.keys[edge.to]!)}`;
    const edgeKey = `${from}>${to}|${kind}|${reduction}`;
    if (!dedupe.has(edgeKey)) dedupe.set(edgeKey, { from, to, kind, reduction });
  }
  const edges = [...dedupe.values()];
  const out = Array.from({ length: scc.count }, () => [] as MacroEdge[]);
  const inc = Array.from({ length: scc.count }, () => [] as MacroEdge[]);
  for (const edge of edges) { out[edge.from]!.push(edge); inc[edge.to]!.push(edge); }
  const start = scc.of[0]!;
  const wins = new Set([...graph.winStateIndexes].map((state) => scc.of[state]!));
  const forward = reachable(start, out.map((items) => new Set(items.map((edge) => edge.to))));
  const backward = reverseReachable(wins, inc.map((items) => new Set(items.map((edge) => edge.from))));
  const relevant = new Set([...forward].filter((node) => backward.has(node)));
  const visiting = new Set([start]);
  const reductions: string[] = [];
  const plans = new Set<string>();
  let simplePaths = 0;
  let expanded = 0;
  let exhausted = false;
  function dfs(node: number): void {
    if (exhausted || plans.size > 1) return;
    if (wins.has(node)) {
      simplePaths += 1;
      if (simplePaths > budget) { exhausted = true; return; }
      plans.add(reductions.join(" > "));
      return;
    }
    expanded += 1;
    if (expanded > budget * 10) { exhausted = true; return; }
    for (const edge of out[node]!) {
      if (!relevant.has(edge.to) || visiting.has(edge.to)) continue;
      visiting.add(edge.to);
      if (edge.kind === "object") reductions.push(edge.reduction);
      dfs(edge.to);
      if (edge.kind === "object") reductions.pop();
      visiting.delete(edge.to);
      if (exhausted || plans.size > 1) return;
    }
  }
  dfs(start);
  const status = exhausted ? "INCOMPLETE" : plans.size === 1 ? "PASS" : "REJECT";
  return { status, macroStates: scc.count, relevantMacroStates: relevant.size, simplePaths, distinctPlans: plans.size, exhausted, signature: plans.size === 1 ? [...plans][0] : undefined, signatures: [...plans] };
}

function traceMetrics(initial: RealityAnchorState, trace: Step[], layout: string) {
  const positions = [key(initial.player), ...trace.map((step) => key(step.state.player))];
  const visits = new Map<string, number>();
  for (const point of positions) visits.set(point, (visits.get(point) ?? 0) + 1);
  const walkable = [...layout].filter((glyph) => glyph !== "#" && glyph !== "\n").length;
  const revisitRate = 1 - visits.size / positions.length;
  const heavyReuseRatio = [...visits.values()].filter((count) => count >= 3).length / walkable;
  const nonWalk = trace.filter((step) => substantive(step.events).length > 0).length;
  const executionBand = aggregateBand([
    [band(trace.length, [8, 10.8, 17, 22.8]), .35],
    [band(nonWalk, [6.2, 9.4, 16, 20]), .45],
    [band(heavyReuseRatio, [0, 0, .052, .167]), .20],
  ]);
  const spaceBand = aggregateBand([
    [band(revisitRate, [.044, .164, .325, .422]), .55],
    [band(heavyReuseRatio, [0, 0, .047, .173]), .45],
  ]);
  return { revisitRate, heavyReuseRatio, executionBand, spaceBand };
}

function aggregateBand(parts: Array<[number, number]>): number { return Math.max(1, Math.min(5, Math.round(parts.reduce((sum, [value, weight]) => sum + value * weight, 0) / parts.reduce((sum, [, weight]) => sum + weight, 0)))); }
function band(value: number, thresholds: [number, number, number, number]): number { if (value <= thresholds[0]) return 1; if (value <= thresholds[1]) return 2; if (value <= thresholds[2]) return 3; if (value <= thresholds[3]) return 4; return 5; }
function incomingEdges(graph: Graph): Edge[][] { const incoming = Array.from({ length: graph.keys.length }, () => [] as Edge[]); for (const edge of graph.edges) incoming[edge.to]!.push(edge); return incoming; }
function outgoingEdges(graph: Graph): Edge[][] { const outgoing = Array.from({ length: graph.keys.length }, () => [] as Edge[]); for (const edge of graph.edges) outgoing[edge.from]!.push(edge); return outgoing; }
function reverseDistances(target: number, incoming: Edge[][]): number[] { const distances = new Array<number>(incoming.length).fill(Number.POSITIVE_INFINITY); distances[target] = 0; const queue = [target]; for (let cursor = 0; cursor < queue.length; cursor += 1) { const state = queue[cursor]!; for (const edge of incoming[state]!) { if (Number.isFinite(distances[edge.from]!)) continue; distances[edge.from] = distances[state]! + 1; queue.push(edge.from); } } return distances; }
function routeByDistance(start: number, distances: number[], outgoing: Edge[][]): Edge[] | null { const route: Edge[] = []; let current = start; while (distances[current]! > 0) { const edge = outgoing[current]!.find((candidate) => distances[candidate.to] === distances[current]! - 1); if (!edge) return null; route.push(edge); current = edge.to; } return route; }
function renderWithGoals(state: RealityAnchorState, goals: Point[]): string { return adapter.renderState({ ...state, goals: new Set(goals.map(key)) }); }
function goalVariants(start: RealityAnchorState, target: RealityAnchorState, baseGoals: Point[]): Point[][] {
  const movedGroups: Point[][] = [];
  if (start.pushPullAnchor && target.pushPullAnchor) {
    const startPoints = [start.pushPullAnchor.push, start.pushPullAnchor.pull];
    const targetPoints = [target.pushPullAnchor.push, target.pushPullAnchor.pull];
    if (targetPoints.some((point, index) => key(point) !== key(startPoints[index]!))) movedGroups.push(targetPoints);
  }
  if (start.boxStickyAnchor && target.boxStickyAnchor) {
    const startPoints = [start.boxStickyAnchor.box, start.boxStickyAnchor.sticky];
    const targetPoints = [target.boxStickyAnchor.box, target.boxStickyAnchor.sticky];
    if (targetPoints.some((point, index) => key(point) !== key(startPoints[index]!))) movedGroups.push(targetPoints);
  }
  const raw: Point[][] = [];
  for (const group of movedGroups) {
    for (const point of group) raw.push([...baseGoals, point]);
    raw.push([...baseGoals, ...group]);
  }
  if (movedGroups.length >= 2) {
    for (const left of movedGroups[0]!) for (const right of movedGroups[1]!) raw.push([...baseGoals, left, right]);
  }
  const targetCrates = target.crates.filter((point) => !baseGoals.some((goal) => key(goal) === key(point)));
  for (const group of movedGroups) for (const endpoint of group) for (const crate of targetCrates) raw.push([...baseGoals, endpoint, crate]);
  const seen = new Set<string>();
  const result: Point[][] = [];
  for (const variant of raw) {
    const unique = [...new Map(variant.map((point) => [key(point), { ...point }])).values()];
    const identity = unique.map(key).sort().join(";");
    if (seen.has(identity)) continue;
    seen.add(identity);
    result.push(unique);
    if (result.length >= 6) break;
  }
  return result;
}
function shortestRoute(target: number, graph: Graph, incoming: Edge[][]): Edge[] { const result: Edge[] = []; let current = target; while (current !== 0) { const depth = graph.depthByIndex[current]!; const edge = incoming[current]!.find((candidate) => graph.depthByIndex[candidate.from] === depth - 1); if (!edge) throw new Error("missing BFS predecessor"); result.push(edge); current = edge.from; } return result.reverse(); }
function replay(initial: RealityAnchorState, inputs: InputId[]): Step[] { let state = initial; const out: Step[] = []; for (const input of inputs) { const step = runtime.step(state, input, { winCondition: pkg.mechanic.win }); if (!step.legal) throw new Error(`illegal replay ${input}`); state = step.state; out.push({ input, events: step.events, state }); } return out; }
function isPureWalk(events: string[]): boolean { return events.length === 1 && events[0] === "walk"; }
function substantive(events: string[]): string[] { return events.filter((event) => event !== "walk"); }
function objectKey(value: string): string { const separator = value.indexOf("|"); return separator < 0 ? value : value.slice(separator + 1); }
function reachable(start: number, graph: Array<Set<number>>): Set<number> { const seen = new Set([start]), queue = [start]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function reverseReachable(starts: Set<number>, graph: Array<Set<number>>): Set<number> { const seen = new Set(starts), queue = [...starts]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function tarjan(count: number, edges: Edge[]) { const adjacency = Array.from({ length: count }, () => [] as number[]); for (const edge of edges) adjacency[edge.from]!.push(edge.to); const index = new Array<number>(count).fill(-1), low = new Array<number>(count).fill(-1), stack: number[] = [], onStack = new Array<boolean>(count).fill(false), of = new Array<number>(count).fill(-1); let nextIndex = 0, component = 0; function visit(node: number): void { index[node] = nextIndex; low[node] = nextIndex; nextIndex += 1; stack.push(node); onStack[node] = true; for (const next of adjacency[node]!) { if (index[next] === -1) { visit(next); low[node] = Math.min(low[node]!, low[next]!); } else if (onStack[next]) low[node] = Math.min(low[node]!, index[next]!); } if (low[node] !== index[node]) return; while (true) { const member = stack.pop()!; onStack[member] = false; of[member] = component; if (member === node) break; } component += 1; } for (let node = 0; node < count; node += 1) if (index[node] === -1) visit(node); return { count: component, of }; }

function sampleBase(): { layout: string; initiallyEmpty: Set<string> } | null {
  const width = choice([7, 8, 8, 9]);
  const height = choice([6, 6, 7]);
  const wallRate = .23 + rng() * .19;
  const grid = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => x === 0 || y === 0 || x === width - 1 || y === height - 1 || rng() < wallRate ? "#" : "."));
  if (!placePair(grid, "P", "L") || !placePair(grid, "B", "S") || !placePair(grid, "M", "M") || !place(grid, "C") || !place(grid, "@")) return null;
  const initiallyEmpty = new Set(empty(grid).map(key));
  if (initiallyEmpty.size < 3) return null;
  const dummy = [...initiallyEmpty][0]!;
  const p = pointFromKey(dummy);
  grid[p.y]![p.x] = "G";
  return { layout: grid.map((row) => row.join("")).join("\n"), initiallyEmpty };
}
function setGoals(layout: string, goals: Point[]): string { const grid = layout.split("\n").map((row) => [...row]); for (const row of grid) for (let x = 0; x < row.length; x += 1) if (row[x] === "G") row[x] = "."; for (const point of goals) { if (grid[point.y]?.[point.x] !== ".") throw new Error(`goal not initially empty at ${key(point)}`); grid[point.y]![point.x] = "G"; } return grid.map((row) => row.join("")).join("\n"); }
function placePair(grid: string[][], first: string, second: string): boolean { const points = empty(grid); shuffle(points); for (const point of points) { const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]; shuffle(directions); for (const delta of directions) { const other = { x: point.x + delta.x, y: point.y + delta.y }; if (grid[other.y]?.[other.x] !== ".") continue; const flip = first !== second && rng() < .5; grid[point.y]![point.x] = flip ? second : first; grid[other.y]![other.x] = flip ? first : second; return true; } } return false; }
function place(grid: string[][], glyph: string): boolean { const points = empty(grid); if (!points.length) return false; const point = points[Math.floor(rng() * points.length)]!; grid[point.y]![point.x] = glyph; return true; }
function empty(grid: string[][]): Point[] { const out: Point[] = []; for (let y = 1; y < grid.length - 1; y += 1) for (let x = 1; x < grid[y]!.length - 1; x += 1) if (grid[y]![x] === ".") out.push({ x, y }); return out; }
function isL(group: Point[]): boolean { if (group.length !== 3) return false; const xs = group.map((point) => point.x), ys = group.map((point) => point.y); return Math.max(...xs) - Math.min(...xs) === 1 && Math.max(...ys) - Math.min(...ys) === 1; }
function key(point: Point): string { return `${point.x},${point.y}`; }
function pointFromKey(value: string): Point { const [x, y] = value.split(",").map(Number); return { x: x!, y: y! }; }
function toLevel(id: string, layout: string): LevelDoc { return { id, title: id, role: "challenge", status: "candidate", targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"], target_learning: ["K_runtime_smoke"], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout }; }
function choice<T>(values: T[]): T { return values[Math.floor(rng() * values.length)]!; }
function shuffle<T>(values: T[]): void { for (let index = values.length - 1; index > 0; index -= 1) { const swap = Math.floor(rng() * (index + 1)); [values[index], values[swap]] = [values[swap]!, values[index]!]; } }
function mulberry32(value: number): Rng { let state = value >>> 0; return () => { state += 0x6d2b79f5; let number = state; number = Math.imul(number ^ (number >>> 15), number | 1); number ^= number + Math.imul(number ^ (number >>> 7), number | 61); return ((number ^ (number >>> 14)) >>> 0) / 4294967296; }; }
function format(): string { const lines = ["# True L Merge Shape Gate Search", "", `- seed: ${seed}`, `- iterations: ${iterations}`, `- parsedBases: ${parsedBases}`, `- completeBases: ${completeBases}`, `- qualifiedShapePatterns: ${qualifiedShapePatterns}`, `- completeFinals: ${completeFinals}`, `- directedStrictPasses: ${strictPasses}`, `- calibratedHits: ${hits.length}`, `- retainedNearMisses: ${nearMisses.length}`, "- hard filter: true sticky_merge -> 3-cell L -> at least two later rigid moves -> same-step rigid force-chain with an anchor; full graph complete/one win; directed pure-walk SCC simple-path plans=1; trace bands >=4.", ""]; for (const [index, hit] of hits.entries()) lines.push(`## ${index + 1}. ${hit.id}`, "", `- score=${hit.score.toFixed(2)} cost=${hit.cost} nonWalk=${hit.nonWalk} execution=${hit.executionBand} space=${hit.spaceBand}`, `- mergeStep=${hit.mergeStep} rigidAfter=${hit.rigidAfterMerge} rigidAnchorChainAfter=${hit.rigidAnchorChainAfterMerge} PLshift=${hit.pushPullShifts} BSshift=${hit.boxStickyShifts}`, `- graph=${hit.graph.states}/${hit.graph.edges}/${hit.graph.wins} directedMacro=${hit.proof.macroStates} relevant=${hit.proof.relevantMacroStates} simplePaths=${hit.proof.simplePaths} plans=${hit.proof.distinctPlans}`, `- revisit=${hit.revisitRate.toFixed(4)} heavy=${hit.heavyReuseRatio.toFixed(4)}`, `- inputs=${hit.inputs.join(" ")}`, "", "```text", hit.layout, "```", ""); if (nearMisses.length) { lines.push("## Near misses", ""); for (const miss of nearMisses) lines.push(`- ${miss.id}: ${miss.reason}; cost=${miss.cost ?? "n/a"}; graph=${miss.graph ? `${miss.graph.states}/${miss.graph.edges}/${miss.graph.wins}` : "n/a"}; proof=${miss.proof ? `${miss.proof.status}/${miss.proof.distinctPlans}` : "n/a"}`); lines.push(""); } return `${lines.join("\n").trimEnd()}\n`; }
