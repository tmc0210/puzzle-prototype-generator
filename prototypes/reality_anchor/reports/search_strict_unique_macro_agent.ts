import { writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { enumerateRuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Rng = () => number;
type Edge = RuntimeGraphEdge<InputId>;
type StrictProof = {
  fullStates: number;
  fullTransitions: number;
  winningStates: number;
  macroStates: number;
  relevantMacroStates: number;
  canonicalMacroPath: number[];
  canonicalEventSignature: string[];
  pathEdgesAreUndirectedBridges: boolean;
  forwardLabelUnique: boolean;
  branchMacroStatesErasedAsReturns: number;
};
type Hit = {
  id: string;
  layout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  revisitRate: number;
  heavyReuseRatio: number;
  nonWalkSteps: number;
  proof: StrictProof;
  score: number;
};

class Dsu {
  private parent: number[];
  private rank: number[];
  constructor(size: number) { this.parent=Array.from({length:size},(_,i)=>i); this.rank=new Array(size).fill(0); }
  find(value: number): number { let x=value; while(this.parent[x]!==x) { this.parent[x]=this.parent[this.parent[x]!]!; x=this.parent[x]!; } return x; }
  union(a: number,b: number): void { let ra=this.find(a), rb=this.find(b); if(ra===rb)return; if(this.rank[ra]!<this.rank[rb]!) [ra,rb]=[rb,ra]; this.parent[rb]=ra; if(this.rank[ra]===this.rank[rb]) this.rank[ra]!+=1; }
}

const seed = Number(process.argv[2] ?? 2026071051);
const iterations = Number(process.argv[3] ?? 20_000);
const solverMaxStates = Number(process.argv[4] ?? 45_000);
const graphMaxStates = Number(process.argv[5] ?? 90_000);
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const hits: Hit[] = [];

for (let index = 0; index < iterations; index += 1) {
  const layout = sampleLayout();
  if (!layout) continue;
  const id = `RA_STRICT_UNIQUE_MACRO_${seed}_${index}`;
  const level = toLevel(id, layout);
  let initial: any;
  try { initial = adapter.parseLevel(level); } catch { continue; }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: solverMaxStates,
    maxDepth: 55,
  });
  if (!solution.found || solution.cost < 17 || solution.cost > 38) continue;
  const required = [
    "anchor_boundary_shift:push_pull",
    "anchor_boundary_shift:box_sticky",
    "pull_object",
  ];
  if (!required.every((prefix) => solution.events.some((event) => event.startsWith(prefix)))) continue;
  if (!solution.events.some((event) => event.startsWith("box_to_sticky") || event.startsWith("sticky_to_box"))) continue;

  const trace = replay(initial, solution.inputs);
  const playerKeys = [`${initial.player.x},${initial.player.y}`, ...trace.map((step) => `${step.state.player.x},${step.state.player.y}`)];
  const counts = new Map<string, number>();
  for (const key of playerKeys) counts.set(key, (counts.get(key) ?? 0) + 1);
  const revisitRate = 1 - counts.size / playerKeys.length;
  const heavyCells = [...counts.values()].filter((count) => count >= 3).length;
  const walkable = countWalkable(layout);
  const heavyReuseRatio = heavyCells / walkable;
  const nonWalkSteps = trace.filter((step) => substantive(step.events).length > 0).length;
  if (revisitRate < 0.30 || heavyReuseRatio < 0.09 || nonWalkSteps < 10) continue;

  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    pkg.mechanic.win,
    { winCondition: pkg.mechanic.win },
    { maxStates: graphMaxStates, terminalizeWins: true },
  );
  if (graph.status !== "complete" || graph.winStateIndexes.size !== 1) continue;
  const proof = proveStrictMacroUniqueness(graph.keys.length, graph.edges, graph.winStateIndexes);
  if (!proof) continue;
  if (!required.every((prefix) => proof.canonicalEventSignature.some((token) => token.includes(prefix)))) continue;
  if (!proof.canonicalEventSignature.some((token) => token.includes("box_to_sticky") || token.includes("sticky_to_box"))) continue;

  const score = solution.cost * 5 + nonWalkSteps * 7 + revisitRate * 100 + heavyReuseRatio * 140
    - Math.log10(graph.keys.length + 1) * 10;
  hits.push({
    id,
    layout,
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
    revisitRate,
    heavyReuseRatio,
    nonWalkSteps,
    proof,
    score,
  });
  hits.sort((a, b) => b.score - a.score);
  hits.splice(15);
  if (hits.length > 0 && (index + 1) % 1000 === 0) {
    console.log(`progress=${index + 1} hits=${hits.length} best=${hits[0]!.id}`);
  }
}

const reportPath = `prototypes/Reality_Anchor/reports/search_strict_unique_macro_agent_${seed}.md`;
await writeFile(reportPath, formatReport(), "utf8");
console.log(formatReport());
console.log(`Wrote ${reportPath}`);

function proveStrictMacroUniqueness(
  stateCount: number,
  fullEdges: Edge[],
  wins: Set<number>,
): StrictProof | null {
  const dsu = new Dsu(stateCount);
  for (const edge of fullEdges) if (substantive(edge.events).length === 0) dsu.union(edge.from, edge.to);
  const roots = [...new Set(Array.from({ length: stateCount }, (_, index) => dsu.find(index)))];
  const macroOfRoot = new Map(roots.map((root, index) => [root, index]));
  const macroOf = Array.from({ length: stateCount }, (_, index) => macroOfRoot.get(dsu.find(index))!);
  const macroCount = roots.length;
  const macroEdges = fullEdges.flatMap((edge) => {
    const events = substantive(edge.events);
    if (events.length === 0) return [];
    return [{ from: macroOf[edge.from]!, to: macroOf[edge.to]!, signature: events.join("&") }];
  });
  const initialMacro = macroOf[0]!;
  const winMacros = new Set([...wins].map((index) => macroOf[index]!));
  if (winMacros.size !== 1) return null;
  const winMacro = [...winMacros][0]!;
  const out = Array.from({ length: macroCount }, () => new Set<number>());
  const incoming = Array.from({ length: macroCount }, () => new Set<number>());
  for (const edge of macroEdges) {
    if (edge.from === edge.to) continue;
    out[edge.from]!.add(edge.to);
    incoming[edge.to]!.add(edge.from);
  }
  const forward = reachable(initialMacro, out);
  const backward = reachable(winMacro, incoming);
  const relevant = new Set([...forward].filter((node) => backward.has(node)));
  if (!relevant.has(winMacro)) return null;

  const path = directedShortestPath(initialMacro, winMacro, out, relevant);
  if (!path) return null;
  const undirected = Array.from({ length: macroCount }, () => new Set<number>());
  for (const edge of macroEdges) {
    if (edge.from === edge.to || !relevant.has(edge.from) || !relevant.has(edge.to)) continue;
    undirected[edge.from]!.add(edge.to);
    undirected[edge.to]!.add(edge.from);
  }
  for (let index = 0; index + 1 < path.length; index += 1) {
    if (undirectedConnectedWithout(initialMacro, winMacro, undirected, path[index]!, path[index + 1]!)) return null;
  }
  const signature: string[] = [];
  let forwardLabelUnique = true;
  for (let index = 0; index + 1 < path.length; index += 1) {
    const from = path[index]!;
    const to = path[index + 1]!;
    const labels = new Set(macroEdges.filter((edge) => edge.from === from && edge.to === to).map((edge) => edge.signature));
    if (labels.size !== 1) { forwardLabelUnique = false; break; }
    signature.push([...labels][0]!);
  }
  if (!forwardLabelUnique) return null;
  return {
    fullStates: stateCount,
    fullTransitions: fullEdges.length,
    winningStates: wins.size,
    macroStates: macroCount,
    relevantMacroStates: relevant.size,
    canonicalMacroPath: path,
    canonicalEventSignature: signature,
    pathEdgesAreUndirectedBridges: true,
    forwardLabelUnique,
    branchMacroStatesErasedAsReturns: relevant.size - path.length,
  };
}

function directedShortestPath(start: number, goal: number, out: Array<Set<number>>, allowed: Set<number>): number[] | null {
  const queue = [start];
  const predecessor = new Map<number, number>();
  const seen = new Set([start]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (current === goal) break;
    for (const next of out[current]!) {
      if (!allowed.has(next) || seen.has(next)) continue;
      seen.add(next);
      predecessor.set(next, current);
      queue.push(next);
    }
  }
  if (!seen.has(goal)) return null;
  const path = [goal];
  while (path[0] !== start) path.unshift(predecessor.get(path[0]!)!);
  return path;
}

function undirectedConnectedWithout(
  start: number,
  goal: number,
  graph: Array<Set<number>>,
  cutA: number,
  cutB: number,
): boolean {
  const queue = [start];
  const seen = new Set([start]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (current === goal) return true;
    for (const next of graph[current]!) {
      if ((current === cutA && next === cutB) || (current === cutB && next === cutA) || seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return false;
}

function reachable(start: number, graph: Array<Set<number>>): Set<number> {
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

function sampleLayout(): string {
  const width = choice([7, 8, 8, 9]);
  const height = choice([5, 6, 6, 7]);
  const wallRate = 0.16 + rng() * 0.16;
  const grid = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) =>
    x === 0 || y === 0 || x === width - 1 || y === height - 1 || rng() < wallRate ? "#" : "."));
  if (!placePair(grid, "P", "L") || !placePair(grid, "B", "S")) return "";
  if (!place(grid, "@")) return "";
  const crateCount = choice([1, 1, 2, 2]);
  const stickyCount = choice([0, 1, 1, 2]);
  for (let i = 0; i < crateCount; i += 1) if (!place(grid, "C")) return "";
  for (let i = 0; i < stickyCount; i += 1) if (!place(grid, "M")) return "";
  const goalCount = choice([2, 2, 3]);
  for (let i = 0; i < goalCount; i += 1) if (!place(grid, "G")) return "";
  return grid.map((row) => row.join("")).join("\n");
}

function placePair(grid: string[][], a: string, b: string): boolean {
  const points = emptyPoints(grid); shuffle(points);
  for (const first of points) {
    const dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}]; shuffle(dirs);
    for (const dir of dirs) {
      const second = {x:first.x+dir.x,y:first.y+dir.y};
      if (grid[second.y]?.[second.x] !== ".") continue;
      const flip = rng() < .5;
      grid[first.y]![first.x] = flip ? b : a;
      grid[second.y]![second.x] = flip ? a : b;
      return true;
    }
  }
  return false;
}

function place(grid: string[][], glyph: string): boolean {
  const points = emptyPoints(grid); if (points.length === 0) return false;
  const point = points[Math.floor(rng() * points.length)]!;
  grid[point.y]![point.x] = glyph; return true;
}

function emptyPoints(grid: string[][]): Point[] {
  const out: Point[] = [];
  for (let y = 1; y < grid.length - 1; y += 1) for (let x = 1; x < grid[y]!.length - 1; x += 1)
    if (grid[y]![x] === ".") out.push({x,y});
  return out;
}

function replay(initial: any, inputs: InputId[]): Array<{ events: string[]; state: any }> {
  let state = initial; const result: Array<{ events: string[]; state: any }> = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) break;
    state = step.state; result.push({ events: step.events, state });
  }
  return result;
}

function substantive(events: string[]): string[] { return events.filter((event) => event !== "walk"); }
function countWalkable(layout: string): number { return [...layout].filter((c) => c !== "#" && c !== "\n").length; }
function toLevel(id: string, layout: string): LevelDoc { return { id, title:id, role:"challenge", status:"candidate", targets:[], known_before:["K_runtime_smoke"], target_learning:["K_runtime_smoke"], support_level:"none", expected_solver_evidence:["solvable"], expected_llm_player_evidence:[], layout }; }
function choice<T>(values: T[]): T { return values[Math.floor(rng() * values.length)]!; }
function shuffle<T>(values: T[]): void { for (let i=values.length-1;i>0;i-=1) { const j=Math.floor(rng()*(i+1)); [values[i],values[j]]=[values[j]!,values[i]!]; } }
function mulberry32(value: number): Rng { let state=value>>>0; return () => { state+=0x6d2b79f5; let next=state; next=Math.imul(next^(next>>>15),next|1); next^=next+Math.imul(next^(next>>>7),next|61); return ((next^(next>>>14))>>>0)/4294967296; }; }

function formatReport(): string {
  const lines = [
    "# Strict Unique Macro Search", "", `- seed: ${seed}`, `- iterations: ${iterations}`,
    "- unique criterion: 纯 walk 压缩后，规范初态到唯一胜态宏节点路径的每条边均为可胜无向宏图上的桥；每条正向桥只有一种非 walk 事件标签。附着支路只能返回同一宏状态，loop erase 后消失。",
    `- hits: ${hits.length}`, "",
  ];
  for (const [index, hit] of hits.entries()) {
    lines.push(`## ${index + 1}. ${hit.id}`, "", `- score=${hit.score.toFixed(2)} cost=${hit.cost} nonWalkSteps=${hit.nonWalkSteps}`,
      `- revisitRate=${hit.revisitRate.toFixed(4)} heavyReuseRatio=${hit.heavyReuseRatio.toFixed(4)}`,
      `- graph=${hit.proof.fullStates}/${hit.proof.fullTransitions}/${hit.proof.winningStates} macro=${hit.proof.macroStates} relevant=${hit.proof.relevantMacroStates} path=${hit.proof.canonicalMacroPath.length} erasedBranches=${hit.proof.branchMacroStatesErasedAsReturns}`,
      `- bridgeProof=${hit.proof.pathEdgesAreUndirectedBridges} forwardLabelUnique=${hit.proof.forwardLabelUnique}`,
      `- inputs=${hit.inputs.join(" ")}`, `- canonicalEvents=${hit.proof.canonicalEventSignature.join(" > ")}`, "", "```text", hit.layout, "```", "");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
