import { writeFile } from "node:fs/promises";
import { enumerateRuntimeGraph, type RuntimeGraph, type RuntimeGraphEdge } from "../../../src/core/runtimeGraph.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Graph = RuntimeGraph<RealityAnchorState, InputId>;
type Edge = RuntimeGraphEdge<InputId>;
type MacroEdge = { from: number; to: number; label: string };

class Dsu {
  parent: number[];
  constructor(size: number) { this.parent = Array.from({ length: size }, (_, index) => index); }
  find(value: number): number { return this.parent[value] === value ? value : (this.parent[value] = this.find(this.parent[value]!)); }
  union(a: number, b: number) { a = this.find(a); b = this.find(b); if (a !== b) this.parent[b] = a; }
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const baseFloor: Point[] = [
  { x: 5, y: 1 },
  { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
  { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
  { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
];
const occupiedAnchors = new Set(["5,1", "5,2", "2,4", "3,4"]);
type TopologyVariant = { carve?: Point; close?: Point; label: string };
const singleCarves: Point[] = [
  { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
  { x: 1, y: 3 }, { x: 1, y: 4 },
];
const requiredRoleCarve = { x: 1, y: 4 };
const topologyVariants: TopologyVariant[] = [
  { label: "base" },
  ...singleCarves.map((carve) => ({ carve, label: `carve_${key(carve)}` })),
  ...baseFloor
    .filter((point) => !occupiedAnchors.has(key(point)))
    .map((close) => ({ carve: requiredRoleCarve, close, label: `carve_1,4_close_${key(close)}` })),
];
const hits: unknown[] = [];
const nearMisses: unknown[] = [];
const counters = new Map<string, number>();
let index = 0;

for (const topology of topologyVariants) {
  const variantFloor = (topology.carve ? [...baseFloor, topology.carve] : baseFloor)
    .filter((point) => !topology.close || key(point) !== key(topology.close));
  const usable = variantFloor.filter((point) => !occupiedAnchors.has(key(point)));
  const cratePool = usable.filter((point) => point.x <= 2);
  for (const crates of choose(cratePool, 2)) {
    const afterCrates = usable.filter((point) => !crates.some((crate) => key(crate) === key(point)));
    for (const player of afterCrates) {
      const afterPlayer = afterCrates.filter((point) => key(point) !== key(player));
      for (const goals of choose(afterPlayer, 3)) {
      index += 1;
      bump("enumerated");
      const layout = render({ crates, player, goals, carve: topology.carve, close: topology.close });
      const id = `RA_TWO_CRATE_BRUSH_ENUM_${index}`;
      let initial: RealityAnchorState;
      try {
        initial = adapter.parseLevel(toLevel(id, layout)) as RealityAnchorState;
      } catch {
        bump("parse_reject");
        continue;
      }
      if (initial.crates.length !== 2 || initial.stickyGroups.length !== 0) {
        bump("initial_material_reject");
        continue;
      }
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: pkg.mechanic.win,
        maxStates: 80_000,
        maxDepth: 35,
      });
      if (!solution.found || solution.cost < 18 || solution.cost > 28) {
        bump("solve_reject");
        continue;
      }
      bump("solve_pass");
      const trace = replay(initial, solution.inputs);
      const final = trace.at(-1)!.state;
      if (!roleRelayFinal(final) || !eventRequirements(solution.events)) {
        bump("role_reject");
        continue;
      }
      bump("role_pass");
      const metrics = traceMetrics(initial, trace, solution.events, solution.cost);
      if (metrics.executionBand < 4 || metrics.spaceReuseBand < 4) {
        bump("metric_reject");
        continue;
      }
      const graph = enumerateRuntimeGraph(
        runtime,
        initial,
        pkg.mechanic.win,
        { winCondition: pkg.mechanic.win },
        { maxStates: 120_000, terminalizeWins: true },
      ) as Graph;
      if (graph.status !== "complete" || graph.winStateIndexes.size !== 1) {
        bump("graph_reject");
        continue;
      }
      const macro = strictMacro(graph);
      const optimalSignatures = shortestObjectSignatures(graph);
      if (!macro.pass || optimalSignatures.count !== 1) {
        bump("strict_reject");
        nearMisses.push({
          id,
          layout,
          crates,
          player,
          goals,
          topology,
          solution: { cost: solution.cost, inputs: solution.inputs, events: solution.events },
          graph: { states: graph.keys.length, transitions: graph.edges.length, winningStates: 1 },
          macro,
          optimalSignatures,
          metrics,
        });
        continue;
      }
      bump("hit");
      hits.push({
        id,
        layout,
        crates,
        player,
        goals,
        topology,
        solution: { cost: solution.cost, inputs: solution.inputs, events: solution.events },
        graph: { states: graph.keys.length, transitions: graph.edges.length, winningStates: 1 },
        macro,
        optimalSignatures,
        metrics,
        mergeConsumed: solution.events.some((event) => event.startsWith("sticky_merge")),
        rigidMoveConsumed: solution.events.some((event) => event === "move_sticky_rigid"),
      });
      console.log(`HIT ${hits.length} ${id} cost=${solution.cost} merge=${solution.events.some((event) => event.startsWith("sticky_merge"))}`);
      console.log(layout);
      }
    }
  }
}

const report = {
  scope: "固定 BRUSH_PISTON 锚位；枚举原14格拓扑、6种单格 carve，以及对唯一产生三职责结果的(1,4) carve再做10种单格封口；同时枚举两个初始 C、玩家和三个目标。",
  enumerated: index,
  counters: Object.fromEntries(counters),
  nearMisses,
  hits,
};
const out = "prototypes/Reality_Anchor/reports/two_crate_brush_piston_topology_search_agent";
await writeFile(`${out}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${out}.md`, `# 双箱 BRUSH_PISTON 固定拓扑穷举\n\n- 枚举：${index}\n- 命中：${hits.length}\n\n${[...counters].map(([k,v])=>`- ${k}: ${v}`).join("\n")}\n`, "utf8");
console.log(`done enumerated=${index} hits=${hits.length}`);

function render(args: { crates: Point[]; player: Point; goals: Point[]; carve?: Point; close?: Point }) {
  const grid = [
    "#######".split(""),
    "#####P#".split(""),
    "#....L#".split(""),
    "##....#".split(""),
    "##BS..#".split(""),
    "#######".split(""),
  ];
  if (args.carve) grid[args.carve.y]![args.carve.x] = ".";
  if (args.close) grid[args.close.y]![args.close.x] = "#";
  for (const goal of args.goals) grid[goal.y]![goal.x] = "G";
  for (const crate of args.crates) grid[crate.y]![crate.x] = "C";
  grid[args.player.y]![args.player.x] = "@";
  return grid.map((row) => row.join("")).join("\n");
}

function roleRelayFinal(state: RealityAnchorState) {
  if (!state.boxStickyAnchor) return false;
  const b = key(state.boxStickyAnchor.box);
  const stickyCells = state.stickyGroups.flat();
  const roles = [...state.goals].map((goal) => {
    if (state.crates.some((crate) => key(crate) === goal)) return "crate";
    if (b === goal) return "B";
    if (stickyCells.some((cell) => key(cell) === goal)) return "M";
    return "other";
  });
  return roles.sort().join(",") === ["B", "M", "crate"].sort().join(",");
}

function eventRequirements(events: string[]) {
  return [
    "anchor_boundary_shift:push_pull",
    "anchor_boundary_shift:box_sticky",
    "box_to_sticky",
    "move_sticky_rigid",
  ].every((pattern) => events.some((event) => event.startsWith(pattern)));
}

function replay(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const result: Array<{ events: string[]; state: RealityAnchorState }> = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) throw new Error("illegal replay");
    state = step.state as RealityAnchorState;
    result.push({ events: step.events, state });
  }
  return result;
}

function strictMacro(graph: Graph) {
  const dsu = new Dsu(graph.keys.length);
  for (const edge of graph.edges) if (substantive(edge.events).length === 0) dsu.union(edge.from, edge.to);
  const roots = new Map<number, number>();
  const macroOf = graph.keys.map((_, index) => {
    const root = dsu.find(index);
    if (!roots.has(root)) roots.set(root, roots.size);
    return roots.get(root)!;
  });
  const edges: MacroEdge[] = graph.edges.flatMap((edge) => {
    const events = substantive(edge.events);
    return events.length ? [{ from: macroOf[edge.from]!, to: macroOf[edge.to]!, label: events.join("&") }] : [];
  });
  const n = roots.size;
  const start = macroOf[0]!;
  const goal = macroOf[[...graph.winStateIndexes][0]!]!;
  const outgoing = Array.from({ length: n }, () => new Set<number>());
  const incoming = Array.from({ length: n }, () => new Set<number>());
  for (const edge of edges) if (edge.from !== edge.to) {
    outgoing[edge.from]!.add(edge.to);
    incoming[edge.to]!.add(edge.from);
  }
  const forward = reach(start, outgoing);
  const backward = reach(goal, incoming);
  const relevant = new Set([...forward].filter((node) => backward.has(node)));
  const path = shortestPath(start, goal, outgoing, relevant) ?? [];
  const pathSet = new Set(path);
  const undirected = Array.from({ length: n }, () => new Set<number>());
  for (const edge of edges) if (edge.from !== edge.to && relevant.has(edge.from) && relevant.has(edge.to)) {
    undirected[edge.from]!.add(edge.to);
    undirected[edge.to]!.add(edge.from);
  }
  const labels: string[] = [];
  let bridges = true;
  let uniqueLabels = true;
  for (let i = 0; i + 1 < path.length; i += 1) {
    const from = path[i]!;
    const to = path[i + 1]!;
    if (connectedWithout(start, goal, undirected, from, to)) bridges = false;
    const edgeLabels = new Set(edges.filter((edge) => edge.from === from && edge.to === to).map((edge) => edge.label));
    if (edgeLabels.size !== 1) uniqueLabels = false;
    labels.push([...edgeLabels].join(" || "));
  }
  const offPathRelevant = [...relevant].filter((node) => !pathSet.has(node));
  return {
    pass: bridges && uniqueLabels && offPathRelevant.length === 0,
    macroStates: n,
    relevantStates: relevant.size,
    path,
    labels,
    bridges,
    uniqueLabels,
    offPathRelevant,
  };
}

function shortestObjectSignatures(graph: Graph) {
  const reverse = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
  const outgoing = Array.from({ length: graph.keys.length }, () => [] as Edge[]);
  for (const edge of graph.edges) {
    reverse[edge.to]!.push(edge);
    outgoing[edge.from]!.push(edge);
  }
  const distance = new Array<number | null>(graph.keys.length).fill(null);
  const queue = [...graph.winStateIndexes];
  for (const win of queue) distance[win] = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const state = queue[cursor]!;
    for (const edge of reverse[state]!) if (distance[edge.from] === null) {
      distance[edge.from] = distance[state]! + 1;
      queue.push(edge.from);
    }
  }
  const cost = distance[0];
  if (cost === null) return { count: 0, signatures: [] as string[] };
  const signatures = Array.from({ length: graph.keys.length }, () => new Set<string>());
  for (const win of graph.winStateIndexes) signatures[win]!.add("");
  for (let d = 1; d <= cost; d += 1) {
    for (let state = 0; state < graph.keys.length; state += 1) {
      if (distance[state] !== d) continue;
      for (const edge of outgoing[state]!) {
        if (distance[edge.to] !== d - 1) continue;
        const token = substantive(edge.events).join("&");
        for (const suffix of signatures[edge.to]!) {
          signatures[state]!.add(token ? (suffix ? `${token} > ${suffix}` : token) : suffix);
        }
      }
    }
  }
  return { count: signatures[0]!.size, signatures: [...signatures[0]!] };
}

function traceMetrics(initial: RealityAnchorState, trace: Array<{ events: string[]; state: RealityAnchorState }>, events: string[], cost: number) {
  const positions = [key(initial.player), ...trace.map((step) => key(step.state.player))];
  const counts = new Map<string, number>();
  for (const position of positions) counts.set(position, (counts.get(position) ?? 0) + 1);
  const walkable = initial.width * initial.height - initial.walls.size;
  const heavy = [...counts.values()].filter((count) => count >= 3).length;
  const revisit = 1 - counts.size / positions.length;
  const heavyRatio = heavy / walkable;
  const nonWalk = events.filter((event) => event !== "walk").length;
  return {
    executionBand: weightedBand([[band(cost,[8,10.8,17,22.8]),.35],[band(nonWalk,[6.2,9.4,16,20]),.45],[band(heavyRatio,[0,0,.052,.167]),.2]]),
    spaceReuseBand: weightedBand([[band(revisit,[.044,.164,.325,.422]),.55],[band(heavyRatio,[0,0,.047,.173]),.45]]),
    revisit,
    heavyRatio,
  };
}

function substantive(events: string[]) { return events.filter((event) => event !== "walk"); }
function reach(start: number, graph: Array<Set<number>>) { const seen = new Set([start]); const queue = [start]; for (let i=0;i<queue.length;i+=1) for (const next of graph[queue[i]!]!) if (!seen.has(next)) { seen.add(next); queue.push(next); } return seen; }
function shortestPath(start:number,goal:number,graph:Array<Set<number>>,allowed:Set<number>){const seen=new Set([start]),q=[start],prev=new Map<number,number>();for(let i=0;i<q.length;i+=1)for(const n of graph[q[i]!]!)if(allowed.has(n)&&!seen.has(n)){seen.add(n);prev.set(n,q[i]!);q.push(n);}if(!seen.has(goal))return null;const p=[goal];while(p[0]!==start)p.unshift(prev.get(p[0]!)!);return p;}
function connectedWithout(start:number,goal:number,graph:Array<Set<number>>,a:number,b:number){const seen=new Set([start]),q=[start];for(let i=0;i<q.length;i+=1){const n=q[i]!;if(n===goal)return true;for(const x of graph[n]!)if(!((n===a&&x===b)||(n===b&&x===a))&&!seen.has(x)){seen.add(x);q.push(x);}}return false;}
function choose<T>(items:T[],count:number):T[][]{const out:T[][]=[];const visit=(start:number,current:T[])=>{if(current.length===count){out.push([...current]);return;}for(let i=start;i<items.length;i+=1){current.push(items[i]!);visit(i+1,current);current.pop();}};visit(0,[]);return out;}
function key(point: Point) { return `${point.x},${point.y}`; }
function band(value:number,t:number[]){if(value<=t[0]!)return 1;if(value<=t[1]!)return 2;if(value<=t[2]!)return 3;if(value<=t[3]!)return 4;return 5;}
function weightedBand(v:Array<[number,number]>){return Math.round(v.reduce((sum,[b,w])=>sum+b*w,0));}
function bump(name:string){counters.set(name,(counters.get(name)??0)+1);}
function toLevel(id:string,layout:string):LevelDoc{return{id,title:id,role:"challenge",status:"candidate",targets:[],known_before:["K_runtime_smoke"],target_learning:["K_runtime_smoke"],support_level:"none",expected_solver_evidence:["solvable"],expected_llm_player_evidence:[],layout};}
