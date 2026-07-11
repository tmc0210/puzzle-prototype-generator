import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type Proof = { status: "PASS" | "REJECT" | "INCOMPLETE"; macroStates: number; relevant: number; paths: number; plans: number; exhausted: boolean };
type Hit = { id: string; layout: string; cost: number; inputs: InputId[]; events: string[]; mergeStep: number; rigidGroupMovesAfterMerge: number; anchorRigidChainsAfterMerge: number; graph: string; proof: Proof; revisit: number; heavy: number; executionBand: number; spaceBand: number; score: number };

const maxStates = Number(process.argv[2] ?? 30_000);
const pathBudget = Number(process.argv[3] ?? 500_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const base = [
  "#######",
  "#####P#",
  "#..G.L#",
  "##G...#",
  "##BSG.#",
  "#######",
];
const mutable = cells(base).filter((point) => !"#PLBS".includes(base[point.y]![point.x]!));
const stickyPairs = combinations(mutable, 2);
const hits: Hit[] = [];
let parsed = 0, complete = 0, uniqueWin = 0, mergeRoutes = 0, strictPass = 0;

for (const crate of mutable) for (const [stickyA, stickyB] of stickyPairs) {
  if (same(crate, stickyA) || same(crate, stickyB)) continue;
  for (const player of mutable) {
    if (same(crate, player) || same(stickyA, player) || same(stickyB, player)) continue;
    const layout = makeLayout(crate, stickyA, stickyB, player);
    const id = `RA_BRUSH_TRUE_MERGE_C${key(crate)}_M${key(stickyA)}_${key(stickyB)}_P${key(player)}`.replaceAll(",", "x");
    let initial: RealityAnchorState;
    try { initial = adapter.parseLevel(toLevel(id, layout)) as RealityAnchorState; } catch { continue; }
    if (initial.crates.length !== 1 || initial.stickyGroups.flat().length !== 2) continue;
    parsed += 1;
    const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win,
      { winCondition: pkg.mechanic.win }, { maxStates, terminalizeWins: true }) as Graph;
    if (graph.status !== "complete") continue;
    complete += 1;
    if (graph.winStateIndexes.size !== 1) continue;
    uniqueWin += 1;
    const win = [...graph.winStateIndexes][0]!;
    const route = shortestRoute(win, graph);
    const inputs = route.map((edge) => edge.action);
    const trace = replay(initial, inputs);
    const facts = routeFacts(trace);
    if (!facts.qualifies) continue;
    mergeRoutes += 1;
    const proof = proveDirected(graph, pathBudget);
    if (proof.status !== "PASS") continue;
    strictPass += 1;
    const metrics = traceMetrics(initial, trace, layout);
    if (metrics.executionBand < 4 || metrics.spaceBand < 4) continue;
    const events = trace.flatMap((step) => step.events);
    const score = facts.anchorRigidChainsAfterMerge * 120 + facts.rigidGroupMovesAfterMerge * 40 + inputs.length * 4 + metrics.revisit * 100 + metrics.heavy * 140 - Math.log10(graph.keys.length + 1) * 8;
    hits.push({ id, layout, cost: inputs.length, inputs, events, mergeStep: facts.mergeStep, rigidGroupMovesAfterMerge: facts.rigidGroupMovesAfterMerge, anchorRigidChainsAfterMerge: facts.anchorRigidChainsAfterMerge, graph: `${graph.keys.length}/${graph.edges.length}/${graph.winStateIndexes.size}`, proof, ...metrics, score });
  }
}
hits.sort((a, b) => b.score - a.score);
const report = { maxStates, pathBudget, parsed, complete, uniqueWin, mergeRoutes, strictPass, hits: hits.slice(0, 40) };
const outBase = "prototypes/Reality_Anchor/reports/search_brush_piston_true_merge_local_root";
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, format(report), "utf8");
console.log(format(report));

function makeLayout(crate: Point, stickyA: Point, stickyB: Point, player: Point): string {
  const grid = base.map((row) => [...row]);
  placePreservingGoal(grid, crate, "C", "*");
  placePreservingGoal(grid, stickyA, "M", "m");
  placePreservingGoal(grid, stickyB, "M", "m");
  placePreservingGoal(grid, player, "@", "+");
  return grid.map((row) => row.join("")).join("\n");
}
function placePreservingGoal(grid: string[][], point: Point, plain: string, onGoal: string): void { grid[point.y]![point.x] = grid[point.y]![point.x] === "G" ? onGoal : plain; }
function routeFacts(trace: Array<{ events: string[]; state: RealityAnchorState }>) {
  let mergeStep = 0, firstGroupStep = 0, rigidGroupMovesAfterMerge = 0, anchorRigidChainsAfterMerge = 0;
  let pl = 0, bs = 0, push = false, pull = false;
  for (let index = 0; index < trace.length; index += 1) {
    const step = trace[index]!, events = step.events;
    if (!mergeStep && events.some((event) => event.startsWith("sticky_merge"))) mergeStep = index + 1;
    if (!firstGroupStep && step.state.stickyGroups.some((group) => group.length >= 3)) firstGroupStep = index + 1;
    const after = firstGroupStep > 0 && index + 1 > firstGroupStep;
    const rigid = events.includes("move_sticky_rigid") && step.state.stickyGroups.some((group) => group.length >= 3);
    const anchor = events.some((event) => event.startsWith("anchor_boundary_shift:"));
    if (after && rigid) rigidGroupMovesAfterMerge += 1;
    if (after && rigid && anchor && events.some((event) => event.startsWith("force_chain:"))) anchorRigidChainsAfterMerge += 1;
    if (events.includes("anchor_boundary_shift:push_pull")) pl += 1;
    if (events.includes("anchor_boundary_shift:box_sticky")) bs += 1;
    if (events.some((event) => event.startsWith("push_object:"))) push = true;
    if (events.some((event) => event.startsWith("pull_object:"))) pull = true;
  }
  return { mergeStep, firstGroupStep, rigidGroupMovesAfterMerge, anchorRigidChainsAfterMerge, pl, bs, push, pull, qualifies: mergeStep > 0 && rigidGroupMovesAfterMerge >= 1 && anchorRigidChainsAfterMerge >= 1 && pl > 0 && bs > 0 && push && pull };
}
function proveDirected(graph: Graph, budget: number): Proof {
  const walkEdges = graph.edges.filter((edge) => isPureWalk(edge.events));
  const scc = tarjan(graph.states.length, walkEdges);
  const macroObjects = Array.from({ length: scc.count }, () => new Set<string>());
  for (let index = 0; index < graph.keys.length; index += 1) macroObjects[scc.of[index]!]!.add(objectKey(graph.keys[index]!));
  if (macroObjects.some((keys) => keys.size !== 1)) return { status: "REJECT", macroStates: scc.count, relevant: 0, paths: 0, plans: 0, exhausted: false };
  type MacroEdge = { from: number; to: number; object: boolean; token: string };
  const dedupe = new Map<string, MacroEdge>();
  for (const edge of graph.edges) {
    const from = scc.of[edge.from]!, to = scc.of[edge.to]!;
    if (from === to) continue;
    const object = !isPureWalk(edge.events);
    const token = object ? `${substantive(edge.events).join("&")}=>${objectKey(graph.keys[edge.to]!)}` : "";
    const id = `${from}>${to}|${object}|${token}`;
    if (!dedupe.has(id)) dedupe.set(id, { from, to, object, token });
  }
  const out = Array.from({ length: scc.count }, () => [] as MacroEdge[]), inc = Array.from({ length: scc.count }, () => [] as MacroEdge[]);
  for (const edge of dedupe.values()) { out[edge.from]!.push(edge); inc[edge.to]!.push(edge); }
  const start = scc.of[0]!, wins = new Set([...graph.winStateIndexes].map((state) => scc.of[state]!));
  const forward = reach(start, out.map((edges) => new Set(edges.map((edge) => edge.to))));
  const backward = reverseReach(wins, inc.map((edges) => new Set(edges.map((edge) => edge.from))));
  const relevant = new Set([...forward].filter((node) => backward.has(node)));
  const visiting = new Set([start]), tokens: string[] = [], plans = new Set<string>();
  let paths = 0, expanded = 0, exhausted = false;
  function dfs(node: number): void {
    if (exhausted || plans.size > 1) return;
    if (wins.has(node)) { paths += 1; if (paths > budget) exhausted = true; else plans.add(tokens.join(" > ")); return; }
    expanded += 1; if (expanded > budget * 10) { exhausted = true; return; }
    for (const edge of out[node]!) {
      if (!relevant.has(edge.to) || visiting.has(edge.to)) continue;
      visiting.add(edge.to); if (edge.object) tokens.push(edge.token); dfs(edge.to); if (edge.object) tokens.pop(); visiting.delete(edge.to);
      if (exhausted || plans.size > 1) return;
    }
  }
  dfs(start);
  return { status: exhausted ? "INCOMPLETE" : plans.size === 1 ? "PASS" : "REJECT", macroStates: scc.count, relevant: relevant.size, paths, plans: plans.size, exhausted };
}
function traceMetrics(initial: RealityAnchorState, trace: Array<{ events: string[]; state: RealityAnchorState }>, layout: string) {
  const positions = [key(initial.player), ...trace.map((step) => key(step.state.player))], counts = new Map<string, number>();
  for (const position of positions) counts.set(position, (counts.get(position) ?? 0) + 1);
  const walkable = [...layout].filter((glyph) => glyph !== "#" && glyph !== "\n").length;
  const revisit = 1 - counts.size / positions.length, heavy = [...counts.values()].filter((count) => count >= 3).length / walkable;
  const nonWalk = trace.filter((step) => substantive(step.events).length > 0).length;
  const executionBand = aggregate([[band(trace.length, [8, 10.8, 17, 22.8]), .35], [band(nonWalk, [6.2, 9.4, 16, 20]), .45], [band(heavy, [0, 0, .052, .167]), .2]]);
  const spaceBand = aggregate([[band(revisit, [.044, .164, .325, .422]), .55], [band(heavy, [0, 0, .047, .173]), .45]]);
  return { revisit, heavy, executionBand, spaceBand };
}
function shortestRoute(target: number, graph: Graph): Edge[] { const incoming = Array.from({ length: graph.keys.length }, () => [] as Edge[]); for (const edge of graph.edges) incoming[edge.to]!.push(edge); const route: Edge[] = []; let current = target; while (current !== 0) { const depth = graph.depthByIndex[current]!; const edge = incoming[current]!.find((candidate) => graph.depthByIndex[candidate.from] === depth - 1); if (!edge) throw new Error("missing predecessor"); route.push(edge); current = edge.from; } return route.reverse(); }
function replay(initial: RealityAnchorState, inputs: InputId[]) { let state = initial; const out: Array<{ events: string[]; state: RealityAnchorState }> = []; for (const input of inputs) { const step = runtime.step(state, input, { winCondition: pkg.mechanic.win }); if (!step.legal) throw new Error("illegal replay"); state = step.state; out.push({ events: step.events, state }); } return out; }
function tarjan(count: number, edges: Edge[]) { const adj = Array.from({ length: count }, () => [] as number[]); for (const edge of edges) adj[edge.from]!.push(edge.to); const index = new Array<number>(count).fill(-1), low = new Array<number>(count).fill(-1), stack: number[] = [], active = new Array<boolean>(count).fill(false), of = new Array<number>(count).fill(-1); let clock = 0, component = 0; function visit(node: number): void { index[node] = clock; low[node] = clock; clock += 1; stack.push(node); active[node] = true; for (const next of adj[node]!) { if (index[next] === -1) { visit(next); low[node] = Math.min(low[node]!, low[next]!); } else if (active[next]) low[node] = Math.min(low[node]!, index[next]!); } if (low[node] !== index[node]) return; while (true) { const member = stack.pop()!; active[member] = false; of[member] = component; if (member === node) break; } component += 1; } for (let node = 0; node < count; node += 1) if (index[node] === -1) visit(node); return { count: component, of }; }
function reach(start: number, graph: Array<Set<number>>): Set<number> { const seen = new Set([start]), queue = [start]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function reverseReach(starts: Set<number>, graph: Array<Set<number>>): Set<number> { const seen = new Set(starts), queue = [...starts]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function isPureWalk(events: string[]): boolean { return events.length === 1 && events[0] === "walk"; }
function substantive(events: string[]): string[] { return events.filter((event) => event !== "walk"); }
function objectKey(value: string): string { const index = value.indexOf("|"); return index < 0 ? value : value.slice(index + 1); }
function aggregate(parts: Array<[number, number]>): number { return Math.round(parts.reduce((sum, [value, weight]) => sum + value * weight, 0) / parts.reduce((sum, [, weight]) => sum + weight, 0)); }
function band(value: number, thresholds: [number, number, number, number]): number { if (value <= thresholds[0]) return 1; if (value <= thresholds[1]) return 2; if (value <= thresholds[2]) return 3; if (value <= thresholds[3]) return 4; return 5; }
function cells(layout: string[]): Point[] { const out: Point[] = []; for (let y = 0; y < layout.length; y += 1) for (let x = 0; x < layout[y]!.length; x += 1) if (layout[y]![x] !== "#") out.push({ x, y }); return out; }
function same(a: Point, b: Point): boolean { return a.x === b.x && a.y === b.y; }
function combinations<T>(values: T[], size: number): T[][] { const out: T[][] = []; function visit(start: number, prefix: T[]): void { if (prefix.length === size) { out.push(prefix); return; } for (let index = start; index <= values.length - (size - prefix.length); index += 1) visit(index + 1, [...prefix, values[index]!]); } visit(0, []); return out; }
function key(point: Point): string { return `${point.x},${point.y}`; }
function toLevel(id: string, layout: string): LevelDoc { return { id, title: id, role: "challenge", status: "candidate", targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"], target_learning: ["K_runtime_smoke"], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout }; }
function format(report: typeof report): string { const lines = ["# Brush-piston true-merge local search", "", `- parsed=${report.parsed} complete=${report.complete} uniqueWin=${report.uniqueWin} mergeRoutes=${report.mergeRoutes} strictPass=${report.strictPass} calibratedHits=${report.hits.length}`, "- filter: one crate + two initial sticky cells; true merge into a 3-cell group; merged group later moves with an anchor; both anchors, push and pull; one win; directed pure-walk SCC plan=1; execution/space bands >=4.", ""]; for (const [index, hit] of report.hits.entries()) lines.push(`## ${index + 1}. ${hit.id}`, "", `- score=${hit.score.toFixed(2)} cost=${hit.cost} graph=${hit.graph} proof=${hit.proof.status}/${hit.proof.plans}`, `- merge=${hit.mergeStep} groupMovesAfter=${hit.rigidGroupMovesAfterMerge} anchorChainsAfter=${hit.anchorRigidChainsAfterMerge} execution=${hit.executionBand} space=${hit.spaceBand}`, `- inputs=${hit.inputs.join(" ")}`, "", "```text", hit.layout, "```", ""); return `${lines.join("\n").trimEnd()}\n`; }
