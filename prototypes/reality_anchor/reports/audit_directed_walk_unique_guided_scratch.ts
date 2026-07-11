import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const [layoutPath, id = "RA_GUIDED_SCRATCH", rawMaxStates = "100000", rawBudget = "5000000"] = process.argv.slice(2);
if (!layoutPath) throw new Error("usage: <layout> <id> [maxStates] [expandedBudget]");
const maxStates = Number(rawMaxStates);
const expandedBudget = Number(rawBudget);
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
const initial = adapter.parseLevel(level);
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win },
  { maxStates, terminalizeWins: true },
);
if (graph.status !== "complete") throw new Error(`full graph ${graph.status}: ${graph.reason}`);

const pureWalkEdges = graph.edges.filter((edge) => isPureWalk(edge.events));
const walkScc = tarjan(graph.states.length, pureWalkEdges);
type MacroEdge = {
  from: number;
  to: number;
  kind: "walk" | "object";
  label: string;
  reduction: string;
  action: InputId;
};
const edgeMap = new Map<string, MacroEdge>();
for (const edge of graph.edges) {
  const from = walkScc.of[edge.from]!;
  const to = walkScc.of[edge.to]!;
  if (from === to) continue;
  const kind = isPureWalk(edge.events) ? "walk" : "object";
  const label = kind === "walk" ? "walk" : edge.events.filter((event) => event !== "walk").join("&");
  const reduction = kind === "walk" ? "" : `${label}=>${objectKey(graph.keys[edge.to]!)}`;
  const key = `${from}>${to}|${kind}|${reduction}`;
  if (!edgeMap.has(key)) edgeMap.set(key, { from, to, kind, label, reduction, action: edge.action });
}
const outgoing = Array.from({ length: walkScc.count }, () => [] as MacroEdge[]);
const incoming = Array.from({ length: walkScc.count }, () => [] as MacroEdge[]);
for (const edge of edgeMap.values()) {
  outgoing[edge.from]!.push(edge);
  incoming[edge.to]!.push(edge);
}
const initialMacro = walkScc.of[0]!;
const winMacros = new Set([...graph.winStateIndexes].map((state) => walkScc.of[state]!));
const forward = reachable(new Set([initialMacro]), outgoing, false);
const backward = reachable(winMacros, incoming, true);
const relevant = new Set([...forward].filter((node) => backward.has(node)));
const distance = reverseDistance(winMacros, incoming, relevant);
for (const edges of outgoing) edges.sort((a, b) => {
  const da = distance[a.to] ?? Number.MAX_SAFE_INTEGER;
  const db = distance[b.to] ?? Number.MAX_SAFE_INTEGER;
  if (da !== db) return da - db;
  if (a.kind !== b.kind) return a.kind === "object" ? -1 : 1;
  return a.reduction.localeCompare(b.reduction);
});

let expanded = 0;
let complete = true;
let simpleWins = 0;
const plans = new Map<string, { actions: InputId[]; labels: string[]; macroPath: number[] }>();
const visiting = new Set([initialMacro]);
const macroPath = [initialMacro];
const actions: InputId[] = [];
const labels: string[] = [];
const reductions: string[] = [];

function dfs(node: number): void {
  if (plans.size >= 2 || !complete) return;
  if (winMacros.has(node)) {
    simpleWins += 1;
    const signature = reductions.join(" > ");
    if (!plans.has(signature)) plans.set(signature, {
      actions: [...actions],
      labels: [...labels],
      macroPath: [...macroPath],
    });
    return;
  }
  expanded += 1;
  if (expanded > expandedBudget) {
    complete = false;
    return;
  }
  for (const edge of outgoing[node]!) {
    if (!relevant.has(edge.to) || visiting.has(edge.to)) continue;
    visiting.add(edge.to);
    macroPath.push(edge.to);
    actions.push(edge.action);
    labels.push(edge.label);
    if (edge.kind === "object") reductions.push(edge.reduction);
    dfs(edge.to);
    if (edge.kind === "object") reductions.pop();
    labels.pop();
    actions.pop();
    macroPath.pop();
    visiting.delete(edge.to);
    if (plans.size >= 2 || !complete) return;
  }
}
dfs(initialMacro);

console.log(JSON.stringify({
  id,
  graph: { states: graph.states.length, edges: graph.edges.length, wins: graph.winStateIndexes.size },
  macro: { total: walkScc.count, relevant: relevant.size },
  search: { complete, expanded, simpleWins, distinctPlans: plans.size },
  verdict: plans.size >= 2 ? "REJECT" : complete && plans.size === 1 ? "PASS" : "INCOMPLETE",
  plans: [...plans.entries()].map(([signature, witness], index) => ({
    index: index + 1,
    objectSteps: signature ? signature.split(" > ").length : 0,
    signature,
    witness,
  })),
}, null, 2));

function isPureWalk(events: string[]): boolean { return events.length === 1 && events[0] === "walk"; }
function objectKey(key: string): string { const separator = key.indexOf("|"); return separator < 0 ? key : key.slice(separator + 1); }

function reachable(starts: Set<number>, edgesByNode: MacroEdge[][], reverse: boolean): Set<number> {
  const seen = new Set(starts);
  const queue = [...starts];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const edge of edgesByNode[queue[cursor]!]!) {
      const next = reverse ? edge.from : edge.to;
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return seen;
}

function reverseDistance(starts: Set<number>, incomingByNode: MacroEdge[][], allowed: Set<number>): number[] {
  const result = new Array<number>(incomingByNode.length).fill(Number.MAX_SAFE_INTEGER);
  const queue = [...starts].filter((node) => allowed.has(node));
  for (const node of queue) result[node] = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const node = queue[cursor]!;
    for (const edge of incomingByNode[node]!) {
      if (!allowed.has(edge.from) || result[edge.from] !== Number.MAX_SAFE_INTEGER) continue;
      result[edge.from] = result[node]! + 1;
      queue.push(edge.from);
    }
  }
  return result;
}

function tarjan(stateCount: number, edges: Array<RuntimeGraphEdge<InputId>>) {
  const adjacency = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) adjacency[edge.from]!.push(edge.to);
  const index = new Array<number>(stateCount).fill(-1);
  const low = new Array<number>(stateCount).fill(-1);
  const stack: number[] = [];
  const onStack = new Array<boolean>(stateCount).fill(false);
  const of = new Array<number>(stateCount).fill(-1);
  let nextIndex = 0;
  let count = 0;
  function visit(node: number): void {
    index[node] = nextIndex;
    low[node] = nextIndex;
    nextIndex += 1;
    stack.push(node);
    onStack[node] = true;
    for (const next of adjacency[node]!) {
      if (index[next] === -1) {
        visit(next);
        low[node] = Math.min(low[node]!, low[next]!);
      } else if (onStack[next]) {
        low[node] = Math.min(low[node]!, index[next]!);
      }
    }
    if (low[node] !== index[node]) return;
    while (true) {
      const member = stack.pop()!;
      onStack[member] = false;
      of[member] = count;
      if (member === node) break;
    }
    count += 1;
  }
  for (let node = 0; node < stateCount; node += 1) if (index[node] === -1) visit(node);
  return { count, of };
}
