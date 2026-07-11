import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2] ?? "prototypes/Reality_Anchor/reports/RA_FRESH_2026_07_10_BRUSH_PISTON_TRIPLE_RELAY_v1.layout.txt";
const id = process.argv[3] ?? "RA_FRESH_2026_07_10_BRUSH_PISTON_TRIPLE_RELAY_v1";
const maxStates = Number(process.argv[4] ?? 100_000);
const pathBudget = Number(process.argv[5] ?? 5_000_000);
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
const macroCount = walkScc.count;
const macroObjectKeys = Array.from({ length: macroCount }, () => new Set<string>());
for (let state = 0; state < graph.keys.length; state += 1) {
  macroObjectKeys[walkScc.of[state]!]!.add(objectKey(graph.keys[state]!));
}
const impureMacros = macroObjectKeys.flatMap((keys, macro) => keys.size === 1 ? [] : [{ macro, keys: [...keys] }]);
if (impureMacros.length > 0) throw new Error(`pure-walk SCC changed objects: ${JSON.stringify(impureMacros)}`);

type MacroEdge = {
  from: number;
  to: number;
  kind: "walk" | "object";
  label: string;
  reduction: string;
  action: InputId;
  fromState: number;
  toState: number;
};
const macroEdgeMap = new Map<string, MacroEdge>();
for (const edge of graph.edges) {
  const from = walkScc.of[edge.from]!;
  const to = walkScc.of[edge.to]!;
  if (from === to) continue;
  const kind = isPureWalk(edge.events) ? "walk" : "object";
  const label = kind === "walk" ? "walk" : substantive(edge.events).join("&");
  const reduction = kind === "walk" ? "" : `${label}=>${objectKey(graph.keys[edge.to]!)}`;
  const key = `${from}>${to}|${kind}|${reduction}`;
  if (!macroEdgeMap.has(key)) macroEdgeMap.set(key, {
    from,
    to,
    kind,
    label,
    reduction,
    action: edge.action,
    fromState: edge.from,
    toState: edge.to,
  });
}
const macroEdges = [...macroEdgeMap.values()];
const outgoing = Array.from({ length: macroCount }, () => [] as MacroEdge[]);
const incoming = Array.from({ length: macroCount }, () => [] as MacroEdge[]);
for (const edge of macroEdges) {
  outgoing[edge.from]!.push(edge);
  incoming[edge.to]!.push(edge);
}
const initialMacro = walkScc.of[0]!;
const winMacros = new Set([...graph.winStateIndexes].map((state) => walkScc.of[state]!));
const forward = reachable(initialMacro, outgoing.map((edges) => new Set(edges.map((edge) => edge.to))));
const backward = reverseReachable(winMacros, incoming.map((edges) => new Set(edges.map((edge) => edge.from))));
const relevant = new Set([...forward].filter((node) => backward.has(node)));

let enumeratedSimplePaths = 0;
let expandedNodes = 0;
let exhausted = false;
const reducedPlans = new Map<string, { reductions: string[]; macroPath: number[]; edgeWitnesses: MacroEdge[] }>();
const simplePathWitnesses: Array<{ signature: string; macroPath: number[]; edgeWitnesses: MacroEdge[] }> = [];
const visiting = new Set<number>([initialMacro]);
const macroPath = [initialMacro];
const edgePath: MacroEdge[] = [];
const reductions: string[] = [];

function dfs(node: number): void {
  if (exhausted) return;
  if (winMacros.has(node)) {
    enumeratedSimplePaths += 1;
    if (enumeratedSimplePaths > pathBudget) {
      exhausted = true;
      return;
    }
    const signature = reductions.join(" > ");
    if (simplePathWitnesses.length < 100) simplePathWitnesses.push({
      signature,
      macroPath: [...macroPath],
      edgeWitnesses: [...edgePath],
    });
    if (!reducedPlans.has(signature)) reducedPlans.set(signature, {
      reductions: [...reductions],
      macroPath: [...macroPath],
      edgeWitnesses: [...edgePath],
    });
    return;
  }
  expandedNodes += 1;
  if (expandedNodes > pathBudget * 10) {
    exhausted = true;
    return;
  }
  for (const edge of outgoing[node]!) {
    if (!relevant.has(edge.to) || visiting.has(edge.to)) continue;
    visiting.add(edge.to);
    macroPath.push(edge.to);
    edgePath.push(edge);
    if (edge.kind === "object") reductions.push(edge.reduction);
    dfs(edge.to);
    if (edge.kind === "object") reductions.pop();
    edgePath.pop();
    macroPath.pop();
    visiting.delete(edge.to);
    if (exhausted) return;
  }
}
dfs(initialMacro);

const plans = [...reducedPlans.entries()].map(([signature, witness], index) => ({
  planIndex: index + 1,
  signature,
  objectStepCount: witness.reductions.length,
  macroPath: witness.macroPath,
  edgeWitnesses: witness.edgeWitnesses.map((edge) => ({
    fromMacro: edge.from,
    toMacro: edge.to,
    kind: edge.kind,
    label: edge.label,
    action: edge.action,
    fromState: edge.fromState,
    toState: edge.toState,
    fromKey: graph.keys[edge.fromState],
    toKey: graph.keys[edge.toState],
  })),
}));

const report = {
  id,
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  criterion: {
    pureWalkEquivalence: "directed pure-walk SCC only; one-way walk edges are not contracted",
    pathReduction: "enumerate every simple directed walk-SCC macro path and delete only pure-walk edges from its signature",
    objectStepIdentity: "event label plus resulting full object configuration; player coordinate omitted only after directed walk SCC separation",
    completeReturnLoopPolicy: "a repeated directed-walk macro node is a complete loop and is erased; every finite path reduces to a simple macro path",
  },
  graph: {
    status: graph.status,
    reachableStates: graph.states.length,
    legalTransitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
  },
  directedWalkMacro: {
    macroStates: macroCount,
    pureWalkEdges: pureWalkEdges.length,
    macroEdges: macroEdges.length,
    relevantMacroStates: relevant.size,
    initialMacro,
    winMacros: [...winMacros],
    impureMacros,
  },
  enumeration: {
    pathBudget,
    exhausted,
    enumeratedSimplePaths,
    expandedNodes,
    distinctReducedObjectPlans: plans.length,
    simplePathWitnesses: simplePathWitnesses.map((witness, index) => ({
      pathIndex: index + 1,
      signature: witness.signature,
      macroPath: witness.macroPath,
      edges: witness.edgeWitnesses.map((edge) => ({ from: edge.from, to: edge.to, kind: edge.kind, label: edge.label })),
    })),
  },
  verdict: {
    status: !exhausted && plans.length === 1 ? "PASS" : plans.length > 1 ? "REJECT" : "INCOMPLETE",
    reason: exhausted
      ? "simple path enumeration exceeded its explicit budget"
      : plans.length === 1
        ? "all directed-walk-SCC simple winning paths reduce to one event+object-configuration sequence"
        : `${plans.length} distinct loop-erased object plans were found`,
  },
  plans,
};

const outBase = path.join("prototypes/Reality_Anchor/reports", `${id}_directed_walk_unique_audit_root`);
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));

function isPureWalk(events: string[]): boolean { return events.length === 1 && events[0] === "walk"; }
function substantive(events: string[]): string[] { return events.filter((event) => event !== "walk"); }
function objectKey(key: string): string { const separator = key.indexOf("|"); return separator < 0 ? key : key.slice(separator + 1); }

function reachable(start: number, graphByNode: Array<Set<number>>): Set<number> {
  const seen = new Set([start]); const queue = [start];
  for (let cursor = 0; cursor < queue.length; cursor += 1) for (const next of graphByNode[queue[cursor]!]!) {
    if (seen.has(next)) continue; seen.add(next); queue.push(next);
  }
  return seen;
}
function reverseReachable(starts: Set<number>, reverse: Array<Set<number>>): Set<number> {
  const seen = new Set(starts); const queue = [...starts];
  for (let cursor = 0; cursor < queue.length; cursor += 1) for (const previous of reverse[queue[cursor]!]!) {
    if (seen.has(previous)) continue; seen.add(previous); queue.push(previous);
  }
  return seen;
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
    index[node] = nextIndex; low[node] = nextIndex; nextIndex += 1;
    stack.push(node); onStack[node] = true;
    for (const next of adjacency[node]!) {
      if (index[next] === -1) { visit(next); low[node] = Math.min(low[node]!, low[next]!); }
      else if (onStack[next]) low[node] = Math.min(low[node]!, index[next]!);
    }
    if (low[node] !== index[node]) return;
    while (true) {
      const member = stack.pop()!; onStack[member] = false; of[member] = count;
      if (member === node) break;
    }
    count += 1;
  }
  for (let node = 0; node < stateCount; node += 1) if (index[node] === -1) visit(node);
  return { count, of };
}

function formatMarkdown(report: typeof report): string {
  const lines = [
    `# Directed-walk unique audit: ${report.id}`,
    "",
    `- Verdict: ${report.verdict.status}`,
    `- Reason: ${report.verdict.reason}`,
    `- Full graph: ${report.graph.reachableStates}/${report.graph.legalTransitions}/${report.graph.winningStates}`,
    `- Directed pure-walk SCC macros: ${report.directedWalkMacro.macroStates}`,
    `- Relevant macros: ${report.directedWalkMacro.relevantMacroStates}`,
    `- Enumerated simple paths: ${report.enumeration.enumeratedSimplePaths}`,
    `- Distinct reduced object plans: ${report.enumeration.distinctReducedObjectPlans}`,
    `- Exhausted: ${report.enumeration.exhausted}`,
    "",
  ];
  for (const plan of report.plans) {
    lines.push(`## Plan ${plan.planIndex}`, "", `- Object steps: ${plan.objectStepCount}`, "", "```text", plan.signature, "```", "");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
