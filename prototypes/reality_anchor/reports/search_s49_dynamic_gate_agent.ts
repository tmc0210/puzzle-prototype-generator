import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type Step = { input: InputId; events: string[]; state: RealityAnchorState };
type Proof = {
  status: "PASS" | "REJECT" | "INCOMPLETE";
  macroStates: number;
  relevantMacroStates: number;
  simplePaths: number;
  distinctPlans: number;
  exhausted: boolean;
  signatures: string[];
};

const maxStates = Number(process.argv[2] ?? 250_000);
const pathBudget = Number(process.argv[3] ?? 1_000_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const mother = [
  "#########",
  "#..*m#.##",
  "#C.G..L##",
  "#..BS#P.#",
  "#.G@#...#",
  "#########",
].join("\n");

type Result = {
  id: string;
  edit: string;
  layout: string;
  graph: { status: string; states: number; edges: number; wins: number; winningObjectConfigurations: number };
  cost?: number;
  inputs?: InputId[];
  facts?: ReturnType<typeof routeFacts>;
  metrics?: ReturnType<typeof traceMetrics>;
  proof?: Proof;
};

const variants: Array<{ id: string; edit: string; layout: string }> = [];
const base = mother.split("\n").map((row) => [...row]);
for (let y = 1; y < base.length - 1; y += 1) {
  for (let x = 1; x < base[y]!.length - 1; x += 1) {
    const glyph = base[y]![x]!;
    if (glyph !== "." && glyph !== "G") continue;
    const grid = base.map((row) => [...row]);
    grid[y]![x] = glyph === "G" ? "*" : "C";
    variants.push({
      id: `RA_S49_EXTRA_C_${x}_${y}`,
      edit: `extra C at ${x},${y}${glyph === "G" ? " on existing goal" : ""}`,
      layout: grid.map((row) => row.join("")).join("\n"),
    });
  }
}

// 第二阶段：把额外箱固定在 (2,1) 的新增目标上，系统改放 B/S。
// 这个版本已经用动态占位消掉了母版的末段左拆分，只剩“先箱/先锚”开局换序。
// 因而优先寻找一个开局由 B/S 本体封住 (2,3)、移动后放行的几何锁。
const anchorBase = mother.split("\n").map((row) => [...row]);
anchorBase[1]![2] = "*";
anchorBase[3]![3] = ".";
anchorBase[3]![4] = ".";
for (let y = 1; y < anchorBase.length - 1; y += 1) {
  for (let x = 1; x < anchorBase[y]!.length - 1; x += 1) {
    for (const delta of [{ x: 1, y: 0 }, { x: 0, y: 1 }]) {
      const other = { x: x + delta.x, y: y + delta.y };
      if (anchorBase[y]?.[x] !== "." || anchorBase[other.y]?.[other.x] !== ".") continue;
      for (const flip of [false, true]) {
        const grid = anchorBase.map((row) => [...row]);
        grid[y]![x] = flip ? "S" : "B";
        grid[other.y]![other.x] = flip ? "B" : "S";
        variants.push({
          id: `RA_S49_GATE_BS_${x}_${y}_${other.x}_${other.y}_${flip ? "SB" : "BS"}`,
          edit: `extra C+goal at 2,1; B/S at ${x},${y}-${other.x},${other.y} (${flip ? "S/B" : "B/S"})`,
          layout: grid.map((row) => row.join("")).join("\n"),
        });
      }
    }
  }
}

// 第三阶段：保留命中的上层 B/S 几何，但把 (2,1) 改为未覆盖目标，
// 让额外箱从别处实际搬入分歧格，排除“预先解好的静态塞子”。
const movingGateBase = [
  "#########",
  "#.G*m#.##",
  "#C.GBSL##",
  "#....#P.#",
  "#.G@#...#",
  "#########",
].map((row) => [...row]);
for (let y = 1; y < movingGateBase.length - 1; y += 1) {
  for (let x = 1; x < movingGateBase[y]!.length - 1; x += 1) {
    const glyph = movingGateBase[y]![x]!;
    if ((x === 2 && y === 1) || (glyph !== "." && glyph !== "G")) continue;
    const grid = movingGateBase.map((row) => [...row]);
    grid[y]![x] = glyph === "G" ? "*" : "C";
    variants.push({
      id: `RA_S49_MOVING_GATE_C_${x}_${y}`,
      edit: `B/S at 4,2-5,2; new gate goal at 2,1; extra C starts ${x},${y}${glyph === "G" ? " on original goal" : ""}`,
      layout: grid.map((row) => row.join("")).join("\n"),
    });
  }
}

// 第四阶段：对唯一可解的“移动入锁”起点 (2,3) 枚举一堵附加墙，
// 试图切掉后段 B/S 恢复方向的三分支。
const movingGateWallBase = [
  "#########",
  "#.G*m#.##",
  "#C.GBSL##",
  "#.C..#P.#",
  "#.G@#...#",
  "#########",
].map((row) => [...row]);
for (let y = 1; y < movingGateWallBase.length - 1; y += 1) {
  for (let x = 1; x < movingGateWallBase[y]!.length - 1; x += 1) {
    if (movingGateWallBase[y]![x] !== ".") continue;
    const grid = movingGateWallBase.map((row) => [...row]);
    grid[y]![x] = "#";
    variants.push({
      id: `RA_S49_MOVING_GATE_WALL_${x}_${y}`,
      edit: `moving gate C 2,3 -> goal 2,1; one wall at ${x},${y}`,
      layout: grid.map((row) => row.join("")).join("\n"),
    });
  }
}

// 第五阶段：在“静态锁”和“移动入锁”两种母版上枚举 P/L 位置与朝向。
// 这用于检查上层双锚相邻是否只是偶然命中，以及近场 P/L 能否把额外箱真正编入动作链。
for (const [family, lines] of [
  ["STATIC_PL", [
    "#########", "#.**m#.##", "#C.GBS.##", "#....#..#", "#.G@#...#", "#########",
  ]],
  ["MOVING_PL", [
    "#########", "#.G*m#.##", "#C.GBS.##", "#.C..#..#", "#.G@#...#", "#########",
  ]],
] as const) {
  const gridBase = lines.map((row) => [...row]);
  for (let y = 1; y < gridBase.length - 1; y += 1) {
    for (let x = 1; x < gridBase[y]!.length - 1; x += 1) {
      for (const delta of [{ x: 1, y: 0 }, { x: 0, y: 1 }]) {
        const other = { x: x + delta.x, y: y + delta.y };
        if (gridBase[y]?.[x] !== "." || gridBase[other.y]?.[other.x] !== ".") continue;
        for (const flip of [false, true]) {
          const grid = gridBase.map((row) => [...row]);
          grid[y]![x] = flip ? "L" : "P";
          grid[other.y]![other.x] = flip ? "P" : "L";
          variants.push({
            id: `RA_S49_${family}_${x}_${y}_${other.x}_${other.y}_${flip ? "LP" : "PL"}`,
            edit: `${family}; P/L at ${x},${y}-${other.x},${other.y} (${flip ? "L/P" : "P/L"})`,
            layout: grid.map((row) => row.join("")).join("\n"),
          });
        }
      }
    }
  }
}

const results: Result[] = [];
for (const variant of variants) {
  let initial: RealityAnchorState;
  try {
    initial = adapter.parseLevel(toLevel(variant.id, variant.layout)) as RealityAnchorState;
  } catch (error) {
    results.push({ id: variant.id, edit: variant.edit, layout: variant.layout, graph: { status: `parse_error:${String(error)}`, states: 0, edges: 0, wins: 0, winningObjectConfigurations: 0 } });
    continue;
  }
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win,
    { winCondition: pkg.mechanic.win }, { maxStates, terminalizeWins: true }) as Graph;
  const winningObjectConfigurations = new Set([...graph.winStateIndexes].map((index) => objectKey(graph.keys[index]!)));
  const result: Result = {
    id: variant.id,
    edit: variant.edit,
    layout: variant.layout,
    graph: { status: graph.status, states: graph.keys.length, edges: graph.edges.length, wins: graph.winStateIndexes.size, winningObjectConfigurations: winningObjectConfigurations.size },
  };
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) {
    results.push(result);
    continue;
  }
  const win = [...graph.winStateIndexes].sort((a, b) => graph.depthByIndex[a]! - graph.depthByIndex[b]!)[0]!;
  const route = shortestRoute(win, graph, incomingEdges(graph));
  const inputs = route.map((edge) => edge.action);
  const trace = replay(initial, inputs);
  result.cost = inputs.length;
  result.inputs = inputs;
  result.facts = routeFacts(initial, trace);
  result.metrics = traceMetrics(initial, trace, variant.layout);
  if (winningObjectConfigurations.size === 1) result.proof = proveDirected(graph, pathBudget);
  results.push(result);
  console.log(`${variant.id}: graph=${graph.status}/${graph.keys.length}/${graph.edges.length}/${graph.winStateIndexes.size} cost=${inputs.length} objectWins=${winningObjectConfigurations.size} facts=${result.facts.qualifies} trace=${result.metrics.executionBand}/${result.metrics.spaceBand} proof=${result.proof?.status ?? "skip"}/${result.proof?.distinctPlans ?? "-"}`);
}

results.sort((left, right) => score(right) - score(left));
const outBase = "prototypes/Reality_Anchor/reports/search_s49_dynamic_gate_agent";
await writeFile(`${outBase}.json`, `${JSON.stringify({ maxStates, pathBudget, variants: variants.length, results }, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, format(results), "utf8");
console.log(format(results.slice(0, 12)));

function score(result: Result): number {
  return (result.proof?.status === "PASS" ? 10000 : 0) + (result.facts?.qualifies ? 1000 : 0) +
    (result.metrics?.executionBand ?? 0) * 100 + (result.metrics?.spaceBand ?? 0) * 120 -
    (result.proof?.distinctPlans ?? 99) * 5;
}

function routeFacts(initial: RealityAnchorState, trace: Step[]) {
  let firstThreeCellStep = 0;
  let rigidAfterMerge = 0;
  let rigidAnchorChainAfterMerge = 0;
  let boxStickyShifts = 0;
  let pushPullShifts = 0;
  let hasPush = false;
  let hasPull = false;
  for (let index = 0; index < trace.length; index += 1) {
    const events = trace[index]!.events;
    if (!firstThreeCellStep && trace[index]!.state.stickyGroups.some((group) => group.length >= 3)) firstThreeCellStep = index + 1;
    const postThree = firstThreeCellStep > 0 && index + 1 > firstThreeCellStep;
    const rigid = events.includes("move_sticky_rigid");
    const anchorShift = events.some((event) => event.startsWith("anchor_boundary_shift:"));
    if (postThree && rigid) rigidAfterMerge += 1;
    if (postThree && rigid && anchorShift && events.some((event) => event.startsWith("force_chain:"))) rigidAnchorChainAfterMerge += 1;
    if (events.includes("anchor_boundary_shift:box_sticky")) boxStickyShifts += 1;
    if (events.includes("anchor_boundary_shift:push_pull")) pushPullShifts += 1;
    if (events.some((event) => event.startsWith("push_object:"))) hasPush = true;
    if (events.some((event) => event.startsWith("pull_object:"))) hasPull = true;
  }
  const finalThreeL = !!trace.at(-1)?.state.stickyGroups.some((group) => group.length === 3 && isL(group));
  const bsMoved = initial.boxStickyAnchor && trace.at(-1)?.state.boxStickyAnchor &&
    (key(initial.boxStickyAnchor.box) !== key(trace.at(-1)!.state.boxStickyAnchor!.box) || key(initial.boxStickyAnchor.sticky) !== key(trace.at(-1)!.state.boxStickyAnchor!.sticky));
  const qualifies = firstThreeCellStep > 0 && rigidAfterMerge >= 2 && rigidAnchorChainAfterMerge >= 1 &&
    !!bsMoved && hasPush && hasPull && finalThreeL;
  return { firstThreeCellStep, rigidAfterMerge, rigidAnchorChainAfterMerge, boxStickyShifts, pushPullShifts, hasPush, hasPull, finalThreeL, bsMoved: !!bsMoved, initialStickyCells: initial.stickyGroups.flat().length, qualifies };
}

function proveDirected(graph: Graph, budget: number): Proof {
  const walkEdges = graph.edges.filter((edge) => isPureWalk(edge.events));
  const scc = tarjan(graph.states.length, walkEdges);
  const objectKeys = Array.from({ length: scc.count }, () => new Set<string>());
  for (let state = 0; state < graph.keys.length; state += 1) objectKeys[scc.of[state]!]!.add(objectKey(graph.keys[state]!));
  if (objectKeys.some((keys) => keys.size !== 1)) return { status: "REJECT", macroStates: scc.count, relevantMacroStates: 0, simplePaths: 0, distinctPlans: 0, exhausted: false, signatures: [] };
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
    if (exhausted || plans.size > 4) return;
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
      if (exhausted || plans.size > 4) return;
    }
  }
  dfs(start);
  const status = exhausted ? "INCOMPLETE" : plans.size === 1 ? "PASS" : "REJECT";
  return { status, macroStates: scc.count, relevantMacroStates: relevant.size, simplePaths, distinctPlans: plans.size, exhausted, signatures: [...plans] };
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
    [band(trace.length, [8, 10.8, 17, 22.8]), .35], [band(nonWalk, [6.2, 9.4, 16, 20]), .45], [band(heavyReuseRatio, [0, 0, .052, .167]), .20],
  ]);
  const spaceBand = aggregateBand([[band(revisitRate, [.044, .164, .325, .422]), .55], [band(heavyReuseRatio, [0, 0, .047, .173]), .45]]);
  return { cost: trace.length, nonWalk, revisitRate, heavyReuseRatio, executionBand, spaceBand };
}

function shortestRoute(target: number, graph: Graph, incoming: Edge[][]): Edge[] {
  const result: Edge[] = [];
  let current = target;
  while (current !== 0) {
    const depth = graph.depthByIndex[current]!;
    const edge = incoming[current]!.find((candidate) => graph.depthByIndex[candidate.from] === depth - 1);
    if (!edge) throw new Error("missing BFS predecessor");
    result.push(edge); current = edge.from;
  }
  return result.reverse();
}
function replay(initial: RealityAnchorState, inputs: InputId[]): Step[] {
  let state = initial; const out: Step[] = [];
  for (const input of inputs) { const step = runtime.step(state, input, { winCondition: pkg.mechanic.win }); if (!step.legal) throw new Error(`illegal replay ${input}`); state = step.state; out.push({ input, events: step.events, state }); }
  return out;
}
function incomingEdges(graph: Graph): Edge[][] { const incoming = Array.from({ length: graph.keys.length }, () => [] as Edge[]); for (const edge of graph.edges) incoming[edge.to]!.push(edge); return incoming; }
function isPureWalk(events: string[]): boolean { return events.length === 1 && events[0] === "walk"; }
function substantive(events: string[]): string[] { return events.filter((event) => event !== "walk"); }
function objectKey(value: string): string { const separator = value.indexOf("|"); return separator < 0 ? value : value.slice(separator + 1); }
function reachable(start: number, graph: Array<Set<number>>): Set<number> { const seen = new Set([start]), queue = [start]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function reverseReachable(starts: Set<number>, graph: Array<Set<number>>): Set<number> { const seen = new Set(starts), queue = [...starts]; for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graph[queue[cursor]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function tarjan(count: number, edges: Edge[]) { const adjacency = Array.from({ length: count }, () => [] as number[]); for (const edge of edges) adjacency[edge.from]!.push(edge.to); const index = new Array<number>(count).fill(-1), low = new Array<number>(count).fill(-1), stack: number[] = [], onStack = new Array<boolean>(count).fill(false), of = new Array<number>(count).fill(-1); let nextIndex = 0, component = 0; function visit(node: number): void { index[node] = nextIndex; low[node] = nextIndex; nextIndex += 1; stack.push(node); onStack[node] = true; for (const next of adjacency[node]!) { if (index[next] === -1) { visit(next); low[node] = Math.min(low[node]!, low[next]!); } else if (onStack[next]) low[node] = Math.min(low[node]!, index[next]!); } if (low[node] !== index[node]) return; while (true) { const member = stack.pop()!; onStack[member] = false; of[member] = component; if (member === node) break; } component += 1; } for (let node = 0; node < count; node += 1) if (index[node] === -1) visit(node); return { count: component, of }; }
function isL(group: Point[]): boolean { if (group.length !== 3) return false; const xs = group.map((point) => point.x), ys = group.map((point) => point.y); return Math.max(...xs) - Math.min(...xs) === 1 && Math.max(...ys) - Math.min(...ys) === 1; }
function key(point: Point): string { return `${point.x},${point.y}`; }
function aggregateBand(parts: Array<[number, number]>): number { return Math.max(1, Math.min(5, Math.round(parts.reduce((sum, [value, weight]) => sum + value * weight, 0) / parts.reduce((sum, [, weight]) => sum + weight, 0)))); }
function band(value: number, thresholds: [number, number, number, number]): number { if (value <= thresholds[0]) return 1; if (value <= thresholds[1]) return 2; if (value <= thresholds[2]) return 3; if (value <= thresholds[3]) return 4; return 5; }
function toLevel(id: string, layout: string): LevelDoc { return { id, title: id, role: "challenge", status: "candidate", targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"], target_learning: ["K_runtime_smoke"], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout }; }
function format(items: Result[]): string { const lines = ["# S49 dynamic gate search", "", `- maxStates: ${maxStates}`, `- pathBudget: ${pathBudget}`, `- variants: ${variants.length}`, ""]; for (const result of items) { lines.push(`## ${result.id}`, "", `- edit: ${result.edit}`, `- graph: ${result.graph.status}/${result.graph.states}/${result.graph.edges}/${result.graph.wins}; winning object configs=${result.graph.winningObjectConfigurations}`, `- shortest: ${result.cost ?? "n/a"}; facts=${result.facts?.qualifies ?? false}; trace=${result.metrics ? `${result.metrics.executionBand}/${result.metrics.spaceBand}` : "n/a"}; proof=${result.proof ? `${result.proof.status}/${result.proof.distinctPlans}` : "n/a"}`, result.inputs ? `- inputs: ${result.inputs.join(" ")}` : "", "", "```text", result.layout, "```", ""); } return `${lines.join("\n").trimEnd()}\n`; }
