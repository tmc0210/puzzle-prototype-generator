import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeAgencyWithRuntime } from "../../../src/core/agencyAnalyzer.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Rng = () => number;
type Sample = { layout: string; bottomGoal: Point; kind: string };
type TraceFrame = { input: InputId; events: string[]; state: RealityAnchorState };
type GraphEdge = { from: number; to: number; events: string[]; input: InputId };
type FullGraph = {
  complete: boolean;
  states: RealityAnchorState[];
  keys: string[];
  edges: GraphEdge[];
  winning: Set<number>;
};

const seed = Number(process.argv[2] ?? 2026071041);
const iterations = Number(process.argv[3] ?? 25_000);
const maxHits = Number(process.argv[4] ?? 8);
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const hits: unknown[] = [];
const counters = new Map<string, number>();

for (let index = 0; index < iterations && hits.length < maxHits; index += 1) {
  const sample = sampleLayout();
  if (!sample) continue;
  bump("sampled");
  const id = `RA_STRICT_ROLE_RELAY_${seed}_${index}`;
  const level = toLevel(id, sample.layout);
  let initial: RealityAnchorState;
  try {
    initial = adapter.parseLevel(level) as RealityAnchorState;
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
    maxStates: 30_000,
    maxDepth: 26,
  });
  if (!solution.found || solution.cost < 18 || solution.cost > 24) {
    bump("solve_band_reject");
    continue;
  }
  bump("solve_band_pass");
  const trace = replay(initial, solution.inputs);
  if (!trace.legal || !trace.win) throw new Error(`Solver trace failed for ${id}`);
  if (!canonicalRequirements(solution.events, trace.frames, initial, sample.bottomGoal)) {
    bump("canonical_role_reject");
    continue;
  }
  const metrics = traceMetrics(initial, trace.frames, solution.events, solution.cost);
  if (metrics.executionBand < 4 || metrics.spaceReuseBand < 4 || metrics.maxWalkRun > 4) {
    bump("trace_metric_reject");
    continue;
  }
  bump("trace_metric_pass");
  const orderProbe = findEarlyBsBeforePlWin(initial, 180_000, 100);
  if (orderProbe.status !== "complete" || orderProbe.found) {
    bump("order_lock_reject");
    continue;
  }
  bump("order_lock_pass");
  const graph = enumerateGraph(initial, 180_000);
  if (!graph.complete || graph.winning.size !== 1) {
    bump("graph_reject");
    continue;
  }
  bump("graph_pass");
  const macro = analyzeStrictObjectMacro(graph);
  if (!macro.unique || macro.objectSequence.length < 7) {
    bump("macro_unique_reject");
    continue;
  }
  bump("macro_unique_pass");
  const agency = analyzeAgencyWithRuntime(runtime, initial, solution, {
    winCondition: pkg.mechanic.win,
    maxStates: 180_000,
    maxDepth: 100,
  });
  const scc = agency.scc;
  if (
    agency.status !== "complete"
    || !scc
    || scc.winContinuationBranchingSccCount !== 0
    || scc.winContinuationMergingSccCount !== 0
    || scc.forcedWinContinuationPrefixLength !== scc.solutionIrreversibleStepCount
  ) {
    bump("scc_reject");
    continue;
  }
  bump("hit");
  const hit = {
    id,
    kind: sample.kind,
    layout: sample.layout,
    bottomGoal: sample.bottomGoal,
    solution: {
      cost: solution.cost,
      inputs: solution.inputs,
      events: solution.events,
    },
    metrics,
    graph: {
      states: graph.states.length,
      transitions: graph.edges.length,
      winningStates: graph.winning.size,
    },
    macro,
    orderProbe,
    scc: {
      count: scc.sccCount,
      edges: scc.sccEdgeCount,
      winReachable: scc.winReachableSccCount,
      irreversibleSteps: scc.solutionIrreversibleStepCount,
      forcedWinPrefix: scc.forcedWinContinuationPrefixLength,
      branching: scc.winContinuationBranchingSccCount,
      merging: scc.winContinuationMergingSccCount,
    },
  };
  hits.push(hit);
  console.log(`HIT ${hits.length} ${id} cost=${solution.cost} states=${graph.states.length} exec=${metrics.executionBand} reuse=${metrics.spaceReuseBand}`);
  console.log(`inputs=${solution.inputs.join(" ")}`);
  console.log(`macro=${macro.objectSequence.join(" -> ")}`);
  console.log(sample.layout);
}

const report = {
  seed,
  iterations,
  maxHits,
  counters: Object.fromEntries([...counters.entries()].sort()),
  hitCount: hits.length,
  hits,
};
const outBase = path.join("prototypes/reality_anchor/reports", `strict_role_relay_structural_search_${seed}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`done seed=${seed} iterations=${iterations} hits=${hits.length}`);
console.log(`Wrote ${outBase}.json`);

function sampleLayout(): Sample | undefined {
  const width = choice([8, 8, 8, 9, 9]);
  const height = choice([6, 6, 7]);
  const wallRate = 0.08 + rng() * 0.18;
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => (
      x === 0 || y === 0 || x === width - 1 || y === height - 1 || rng() < wallRate ? "#" : "."
    )),
  );

  const topY = choice(height >= 7 ? [1, 2] : [1]);
  const chainX = 1 + Math.floor(rng() * (width - 2));
  const chainCells = [
    { x: chainX, y: topY },
    { x: chainX, y: topY + 1 },
    { x: chainX, y: topY + 2 },
    { x: chainX, y: topY + 3 },
  ];
  if (chainCells.some((cell) => cell.y >= height - 1)) return undefined;
  for (const cell of chainCells) grid[cell.y]![cell.x] = ".";
  grid[topY]![chainX] = "@";
  grid[topY + 1]![chainX] = "C";
  grid[topY + 2]![chainX] = "C";
  grid[topY + 3]![chainX] = "G";

  if (!placePair(grid, "P", "L")) return undefined;
  if (!placePair(grid, "B", "S")) return undefined;
  if (!place(grid, "G") || !place(grid, "G")) return undefined;

  // 少量额外 carve 让锚点能留下持久位移，同时保持紧凑墙廊。
  for (let i = 0; i < 2; i += 1) {
    if (rng() < 0.45) {
      const walls = interiorPoints(grid).filter((point) => grid[point.y]![point.x] === "#");
      if (walls.length > 0) {
        const cell = choice(walls);
        grid[cell.y]![cell.x] = ".";
      }
    }
  }
  return {
    layout: grid.map((row) => row.join("")).join("\n"),
    bottomGoal: { x: chainX, y: topY + 3 },
    kind: "vertical_force_chain_with_persistent_anchor_search",
  };
}

function canonicalRequirements(
  events: string[],
  frames: TraceFrame[],
  initial: RealityAnchorState,
  bottomGoal: Point,
): boolean {
  const required = [
    "force_chain:n2",
    "anchor_boundary_shift:push_pull",
    "anchor_boundary_shift:box_sticky",
    "box_to_sticky:n1",
    "move_sticky_rigid",
  ];
  if (!required.every((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) return false;
  const firstPl = events.findIndex((event) => eventMatchesPattern(event, "anchor_boundary_shift:push_pull"));
  const firstBs = events.findIndex((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky"));
  if (firstPl < 0 || firstBs < 0 || firstPl >= firstBs) return false;
  const final = frames.at(-1)!.state;
  if (!initial.pushPullAnchor || !final.pushPullAnchor || !final.boxStickyAnchor) return false;
  if (anchorKey(initial.pushPullAnchor.push, initial.pushPullAnchor.pull) === anchorKey(final.pushPullAnchor.push, final.pushPullAnchor.pull)) return false;
  if (final.crates.length !== 1 || final.stickyGroups.length !== 1 || final.stickyGroups[0]!.length !== 1) return false;
  const bottomKey = pointKey(bottomGoal);
  if (!final.crates.some((crate) => pointKey(crate) === bottomKey)) return false;
  const bKey = pointKey(final.boxStickyAnchor.box);
  if (!final.goals.has(bKey)) return false;
  const stickyKey = pointKey(final.stickyGroups[0]![0]!);
  if (!final.goals.has(stickyKey)) return false;
  if (stickyKey === bottomKey || bKey === bottomKey || stickyKey === bKey) return false;
  const goalRoles = [...final.goals].map((goal) => {
    if (final.crates.some((crate) => pointKey(crate) === goal)) return "crate";
    if (goal === bKey) return "B";
    if (goal === stickyKey) return "M";
    return "other";
  });
  return goalRoles.length === 3 && goalRoles.sort().join(",") === ["B", "M", "crate"].sort().join(",");
}

function replay(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const frames: TraceFrame[] = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) return { legal: false, win: false, frames };
    state = step.state as RealityAnchorState;
    frames.push({ input, events: step.events, state });
  }
  return { legal: true, win: runtime.isWin(state, pkg.mechanic.win), frames };
}

function traceMetrics(initial: RealityAnchorState, frames: TraceFrame[], events: string[], cost: number) {
  const visits = [initial.player, ...frames.map((frame) => frame.state.player)].map(pointKey);
  const counts = new Map<string, number>();
  for (const visit of visits) counts.set(visit, (counts.get(visit) ?? 0) + 1);
  const unique = counts.size;
  const walkable = initial.width * initial.height - initial.walls.size;
  const heavy = [...counts.values()].filter((count) => count >= 3).length;
  const revisitRate = (visits.length - unique) / visits.length;
  const heavyReuseRatio = heavy / walkable;
  const nonWalk = events.filter((event) => event !== "walk").length;
  const executionBand = weightedBand([
    [band(cost, [8, 10.8, 17, 22.8]), 0.35],
    [band(nonWalk, [6.2, 9.4, 16, 20]), 0.45],
    [band(heavyReuseRatio, [0, 0, 0.052, 0.167]), 0.2],
  ]);
  const spaceReuseBand = weightedBand([
    [band(revisitRate, [0.044, 0.164, 0.325, 0.422]), 0.55],
    [band(heavyReuseRatio, [0, 0, 0.047, 0.173]), 0.45],
  ]);
  let walkRun = 0;
  let maxWalkRun = 0;
  for (const frame of frames) {
    if (frame.events.length === 1 && frame.events[0] === "walk") {
      walkRun += 1;
      maxWalkRun = Math.max(maxWalkRun, walkRun);
    } else {
      walkRun = 0;
    }
  }
  return {
    cost,
    nonWalk,
    visits: visits.length,
    unique,
    walkable,
    heavy,
    revisitRate,
    heavyReuseRatio,
    executionBand,
    spaceReuseBand,
    maxWalkRun,
  };
}

function findEarlyBsBeforePlWin(initial: RealityAnchorState, maxStates: number, maxDepth: number) {
  const queue: Array<{
    state: RealityAnchorState;
    seenPl: boolean;
    violated: boolean;
    inputs: InputId[];
    depth: number;
  }> = [{ state: initial, seenPl: false, violated: false, inputs: [], depth: 0 }];
  const visited = new Set([`${runtime.key(initial)}|0|0`]);
  let cursor = 0;
  let depthHit = false;
  while (cursor < queue.length) {
    if (visited.size > maxStates) return { found: false, status: "exhausted", exploredStates: visited.size };
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.violated) {
      return { found: true, status: "found", exploredStates: visited.size, depth: current.depth, inputs: current.inputs };
    }
    if (current.depth >= maxDepth) {
      depthHit = true;
      continue;
    }
    if (runtime.isWin(current.state, pkg.mechanic.win)) continue;
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const hasPl = step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:push_pull"));
      const hasBs = step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky"));
      const seenPl = current.seenPl || hasPl;
      const violated = current.violated || (hasBs && !current.seenPl && !hasPl);
      const state = step.state as RealityAnchorState;
      const key = `${runtime.key(state)}|${seenPl ? 1 : 0}|${violated ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state, seenPl, violated, inputs: [...current.inputs, input], depth: current.depth + 1 });
    }
  }
  return { found: false, status: depthHit ? "depth_limited" : "complete", exploredStates: visited.size };
}

function enumerateGraph(initial: RealityAnchorState, maxStates: number): FullGraph {
  const states = [initial];
  const keys = [runtime.key(initial)];
  const indexByKey = new Map([[keys[0]!, 0]]);
  const edges: GraphEdge[] = [];
  const winning = new Set<number>();
  let cursor = 0;
  while (cursor < states.length) {
    if (states.length > maxStates) return { complete: false, states, keys, edges, winning };
    const state = states[cursor]!;
    if (runtime.isWin(state, pkg.mechanic.win)) {
      winning.add(cursor);
      cursor += 1;
      continue;
    }
    for (const input of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const next = step.state as RealityAnchorState;
      const key = runtime.key(next);
      let to = indexByKey.get(key);
      if (to === undefined) {
        to = states.length;
        indexByKey.set(key, to);
        states.push(next);
        keys.push(key);
      }
      edges.push({ from: cursor, to, events: step.events, input });
    }
    cursor += 1;
  }
  return { complete: true, states, keys, edges, winning };
}

function analyzeStrictObjectMacro(graph: FullGraph) {
  // 允许纯走路差异：先用纯 walk 有向边的 SCC 压缩玩家站位。
  const walkEdges = graph.edges.filter((edge) => edge.events.length === 1 && edge.events[0] === "walk");
  const walkScc = stronglyConnectedComponents(graph.states.length, walkEdges);
  const componentCount = Math.max(...walkScc) + 1;
  const winningComponents = new Set([...graph.winning].map((state) => walkScc[state]!));
  const objectEdges = graph.edges
    .filter((edge) => !(edge.events.length === 1 && edge.events[0] === "walk"))
    .map((edge) => ({
      from: walkScc[edge.from]!,
      to: walkScc[edge.to]!,
      signature: edge.events.filter((event) => event !== "walk").join("+"),
    }));
  const outgoing = Array.from({ length: componentCount }, () => new Map<string, { to: number; signature: string }>());
  const reverse = Array.from({ length: componentCount }, () => new Set<number>());
  for (const edge of objectEdges) {
    const key = `${edge.signature}|${edge.to}`;
    outgoing[edge.from]!.set(key, { to: edge.to, signature: edge.signature });
    reverse[edge.to]!.add(edge.from);
  }
  const canReachWin = new Set<number>(winningComponents);
  const queue = [...winningComponents];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const previous of reverse[queue[cursor]!]!) {
      if (canReachWin.has(previous)) continue;
      canReachWin.add(previous);
      queue.push(previous);
    }
  }
  const start = walkScc[0]!;
  const sequence: string[] = [];
  const components = [start];
  const seen = new Set<number>();
  const violations: string[] = [];
  let current = start;
  while (!winningComponents.has(current)) {
    if (seen.has(current)) {
      violations.push(`object_cycle_at_component:${current}`);
      break;
    }
    seen.add(current);
    const viable = [...outgoing[current]!.values()].filter((edge) => canReachWin.has(edge.to));
    const distinct = new Map(viable.map((edge) => [`${edge.signature}|${edge.to}`, edge]));
    if (distinct.size !== 1) {
      violations.push(`viable_object_choices_at_component:${current}:n${distinct.size}`);
      break;
    }
    const next = [...distinct.values()][0]!;
    sequence.push(next.signature);
    current = next.to;
    components.push(current);
  }
  for (const component of canReachWin) {
    if (winningComponents.has(component)) continue;
    const viable = [...outgoing[component]!.values()].filter((edge) => canReachWin.has(edge.to));
    const distinct = new Map(viable.map((edge) => [`${edge.signature}|${edge.to}`, edge]));
    if (distinct.size !== 1) violations.push(`global_viable_object_choices_at_component:${component}:n${distinct.size}`);
  }
  if (!winningComponents.has(current)) violations.push("chain_did_not_reach_win");
  return {
    unique: violations.length === 0,
    walkSccCount: componentCount,
    winReachableWalkSccCount: canReachWin.size,
    objectSequence: sequence,
    componentPath: components,
    violations,
  };
}

function stronglyConnectedComponents(stateCount: number, edges: GraphEdge[]) {
  const outgoing = Array.from({ length: stateCount }, () => [] as number[]);
  const reverse = Array.from({ length: stateCount }, () => [] as number[]);
  for (const edge of edges) {
    outgoing[edge.from]!.push(edge.to);
    reverse[edge.to]!.push(edge.from);
  }
  const visited = new Uint8Array(stateCount);
  const order: number[] = [];
  const visit = (start: number) => {
    const stack: Array<{ node: number; next: number }> = [{ node: start, next: 0 }];
    visited[start] = 1;
    while (stack.length > 0) {
      const frame = stack.at(-1)!;
      const targets = outgoing[frame.node]!;
      if (frame.next < targets.length) {
        const target = targets[frame.next++]!;
        if (!visited[target]) {
          visited[target] = 1;
          stack.push({ node: target, next: 0 });
        }
      } else {
        order.push(frame.node);
        stack.pop();
      }
    }
  };
  for (let node = 0; node < stateCount; node += 1) if (!visited[node]) visit(node);
  const component = new Int32Array(stateCount).fill(-1);
  let nextComponent = 0;
  for (let i = order.length - 1; i >= 0; i -= 1) {
    const start = order[i]!;
    if (component[start] >= 0) continue;
    const stack = [start];
    component[start] = nextComponent;
    while (stack.length > 0) {
      const node = stack.pop()!;
      for (const target of reverse[node]!) {
        if (component[target] >= 0) continue;
        component[target] = nextComponent;
        stack.push(target);
      }
    }
    nextComponent += 1;
  }
  return [...component];
}

function placePair(grid: string[][], a: string, b: string): boolean {
  const points = emptyPoints(grid);
  shuffle(points);
  for (const first of points) {
    const dirs = shuffle([
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ]);
    for (const dir of dirs) {
      const second = { x: first.x + dir.x, y: first.y + dir.y };
      if (grid[second.y]?.[second.x] !== ".") continue;
      const flip = rng() < 0.5;
      grid[first.y]![first.x] = flip ? b : a;
      grid[second.y]![second.x] = flip ? a : b;
      return true;
    }
  }
  return false;
}

function place(grid: string[][], glyph: string): boolean {
  const points = emptyPoints(grid);
  if (points.length === 0) return false;
  const point = choice(points);
  grid[point.y]![point.x] = glyph;
  return true;
}

function emptyPoints(grid: string[][]) {
  return interiorPoints(grid).filter((point) => grid[point.y]![point.x] === ".");
}

function interiorPoints(grid: string[][]) {
  const points: Point[] = [];
  for (let y = 1; y < grid.length - 1; y += 1) {
    for (let x = 1; x < grid[y]!.length - 1; x += 1) points.push({ x, y });
  }
  return points;
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

function anchorKey(a: Point, b: Point) {
  return `${pointKey(a)}|${pointKey(b)}`;
}

function pointKey(point: Point) {
  return `${point.x},${point.y}`;
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

function choice<T>(values: T[]): T {
  return values[Math.floor(rng() * values.length)]!;
}

function shuffle<T>(values: T[]): T[] {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [values[i], values[j]] = [values[j]!, values[i]!];
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

function formatMarkdown(report: typeof report) {
  const lines = [
    `# 严格唯一对象序结构搜索：seed ${report.seed}`,
    "",
    `- 迭代：${report.iterations}`,
    `- 命中：${report.hitCount}`,
    "",
    "## 计数",
    "",
  ];
  for (const [key, value] of Object.entries(report.counters)) lines.push(`- ${key}: ${value}`);
  return `${lines.join("\n")}\n`;
}
