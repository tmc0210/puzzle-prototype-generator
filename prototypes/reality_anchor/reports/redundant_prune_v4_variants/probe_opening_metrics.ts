import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraph } from "../../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc } from "../../../../src/core/types.js";
import type { RealityAnchorState } from "../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_PRUNE_OPENING_METRICS";
const maxStates = Number(process.argv[4] ?? 300_000);

if (!layoutPath) {
  throw new Error("Usage: probe_opening_metrics.ts <layout-file> <id> [maxStates]");
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
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};

type Graph = RuntimeGraph<RealityAnchorState, InputId>;

const initial = adapter.parseLevel(level) as RealityAnchorState;
const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, { winCondition: pkg.mechanic.win }, { maxStates });

if (graph.status !== "complete") {
  throw new Error(`${id}: graph ${graph.status}: ${graph.reason}`);
}

const { sccOf, components } = tarjan(graph);
const initialScc = sccOf[0]!;
const members = new Set(components[initialScc]!);
const distances = internalDistances(graph, members);
const winReachable = reverseWinReachable(graph);
const exits = graph.edges
  .filter((edge) => members.has(edge.from) && !members.has(edge.to))
  .map((edge) => ({
    sourceKey: graph.keys[edge.from]!,
    sourceDistance: distances[edge.from]!,
    action: edge.action,
    events: edge.events,
    targetScc: sccOf[edge.to]!,
    winReaching: winReachable.has(edge.to),
  }))
  .sort((a, b) => a.sourceDistance - b.sourceDistance || Number(b.winReaching) - Number(a.winReaching));
const winDistances = exits.filter((exit) => exit.winReaching).map((exit) => exit.sourceDistance);
const nearestWinDistance = winDistances.length > 0 ? Math.min(...winDistances) : null;
const result = {
  id,
  layout: adapter.renderState(initial),
  graphStatus: graph.status,
  reachableStates: graph.keys.length,
  initialSccSize: members.size,
  initialExitCount: new Set(exits.map((exit) => exit.targetScc)).size,
  initialWinExitCount: new Set(exits.filter((exit) => exit.winReaching).map((exit) => exit.targetScc)).size,
  initialDeadExitCount: new Set(exits.filter((exit) => !exit.winReaching).map((exit) => exit.targetScc)).size,
  initialExitSourceDistances: exits.map((exit) => exit.sourceDistance),
  initialWinExitSourceDistances: winDistances,
  initialDeadExitSourceDistances: exits.filter((exit) => !exit.winReaching).map((exit) => exit.sourceDistance),
  nearestIrreversibleExitDistance: exits.length > 0 ? Math.min(...exits.map((exit) => exit.sourceDistance)) : null,
  nearestWinReachingExitDistance: nearestWinDistance,
  deadExitsBeforeFirstWinExit: nearestWinDistance === null
    ? null
    : new Set(exits.filter((exit) => !exit.winReaching && exit.sourceDistance < nearestWinDistance).map((exit) => exit.targetScc)).size,
  exits,
};

const outBase = path.join("prototypes/reality_anchor/reports", `opening_metrics_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(result, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(result), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

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

function internalDistances(graph: Graph, members: Set<number>): number[] {
  const adjacency = Array.from({ length: graph.keys.length }, () => [] as number[]);
  for (const edge of graph.edges) {
    if (members.has(edge.from) && members.has(edge.to)) adjacency[edge.from]!.push(edge.to);
  }
  const distances = new Array<number>(graph.keys.length).fill(Number.POSITIVE_INFINITY);
  distances[0] = 0;
  const queue = [0];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    for (const to of adjacency[from]!) {
      if (Number.isFinite(distances[to])) continue;
      distances[to] = distances[from]! + 1;
      queue.push(to);
    }
  }
  return distances;
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

function formatMarkdown(input: typeof result): string {
  return [
    `# Opening Metrics: ${input.id}`,
    "",
    `- Graph status: ${input.graphStatus}`,
    `- Reachable states: ${input.reachableStates}`,
    `- Initial SCC size: ${input.initialSccSize}`,
    `- Initial exits: ${input.initialExitCount} (win=${input.initialWinExitCount}, dead=${input.initialDeadExitCount})`,
    `- Exit source distances: ${input.initialExitSourceDistances.join(", ") || "none"}`,
    `- Win-exit source distances: ${input.initialWinExitSourceDistances.join(", ") || "none"}`,
    `- Dead-exit source distances: ${input.initialDeadExitSourceDistances.join(", ") || "none"}`,
    `- Nearest irreversible exit: ${input.nearestIrreversibleExitDistance ?? "none"}`,
    `- Nearest win-reaching exit: ${input.nearestWinReachingExitDistance ?? "none"}`,
    `- Dead exits before first win exit: ${input.deadExitsBeforeFirstWinExit ?? "unknown"}`,
    "",
    "## Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
  ].join("\n");
}
