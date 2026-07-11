import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

type Rng = () => number;
type Group = { name: string; patterns: string[] };
const seed = Number(process.argv[2] ?? 2026071031);
const iterations = Number(process.argv[3] ?? 5000);
const rng = mulberry32(seed);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const required: Group[] = [
  { name: "pl", patterns: ["anchor_boundary_shift:push_pull"] },
  { name: "bs", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "pull", patterns: ["pull_object"] },
  { name: "material", patterns: ["box_to_sticky", "sticky_to_box"] },
  { name: "rigid", patterns: ["move_sticky_rigid"] },
];
let printed = 0;

for (let index = 0; index < iterations && printed < 12; index += 1) {
  const layout = sampleLayout();
  if (!layout) continue;
  const level = toLevel(`RA_FRESH_UNIQUE_${seed}_${index}`, layout);
  let initial: any;
  try { initial = adapter.parseLevel(level); } catch { continue; }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 35_000,
    maxDepth: 45,
  });
  if (!solution.found || solution.cost < 18 || solution.cost > 28) continue;
  if (!coversGroups(solution.events, required)) continue;
  const trace = replay(initial, solution.inputs);
  const walks = trace.filter((step) => step.events.length === 1 && step.events[0] === "walk").length;
  if (walks > solution.cost * 0.55) continue;
  let maxWalkRun = 0;
  let walkRun = 0;
  for (const step of trace) {
    if (step.events.length === 1 && step.events[0] === "walk") {
      walkRun += 1;
      maxWalkRun = Math.max(maxWalkRun, walkRun);
    } else walkRun = 0;
  }
  if (maxWalkRun > 4) continue;
  const visits = [initial.player, ...trace.map((step) => step.state.player)]
    .map((point) => `${point.x},${point.y}`);
  const revisit = 1 - new Set(visits).size / visits.length;
  if (revisit < 0.22) continue;
  const graph = analyzeGraphWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 120_000,
  });
  if (graph.status !== "complete" || graph.winStateCount !== 1) continue;
  const probe = findWinMissingGroups(initial, 450_000);
  if (probe !== "complete_no_bypass") continue;
  printed += 1;
  console.log(`HIT ${printed} id=${level.id} cost=${solution.cost} walks=${walks} maxWalkRun=${maxWalkRun} revisit=${revisit.toFixed(3)} states=${graph.reachableStateCount}`);
  console.log(`inputs=${solution.inputs.join(" ")}`);
  console.log(`events=${solution.events.join(" ")}`);
  console.log(layout);
}
console.log(`done seed=${seed} iterations=${iterations} hits=${printed}`);

function sampleLayout(): string {
  const width = choice([7, 7, 8, 8, 9]);
  const height = choice([5, 5, 6]);
  const wallRate = 0.15 + rng() * 0.14;
  const grid = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || y === 0 || x === width - 1 || y === height - 1 || rng() < wallRate ? "#" : ".",
    ),
  );
  if (!placePair(grid, "P", "L") || !placePair(grid, "B", "S")) return "";
  if (!place(grid, "@")) return "";
  for (let i = 0; i < 2; i += 1) if (!place(grid, "C")) return "";
  if (!place(grid, "M")) return "";
  for (let i = 0; i < 3; i += 1) if (!place(grid, "G")) return "";
  return grid.map((row) => row.join("")).join("\n");
}

function placePair(grid: string[][], a: string, b: string): boolean {
  const points = emptyPoints(grid);
  shuffle(points);
  for (const first of points) {
    const dirs = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];
    shuffle(dirs);
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
  const point = points[Math.floor(rng() * points.length)]!;
  grid[point.y]![point.x] = glyph;
  return true;
}

function emptyPoints(grid: string[][]): Point[] {
  const out: Point[] = [];
  for (let y = 1; y < grid.length - 1; y += 1) {
    for (let x = 1; x < grid[y]!.length - 1; x += 1) if (grid[y]![x] === ".") out.push({ x, y });
  }
  return out;
}

function replay(initial: any, inputs: InputId[]): Array<{ events: string[]; state: RealityAnchorState }> {
  let state = initial;
  const out: Array<{ events: string[]; state: RealityAnchorState }> = [];
  for (const input of inputs) {
    const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!step.legal) break;
    state = step.state;
    out.push({ events: step.events, state });
  }
  return out;
}

function findWinMissingGroups(initial: any, maxStates: number): "bypass" | "complete_no_bypass" | "exhausted" {
  const allMask = (1 << required.length) - 1;
  const queue = [{ state: initial, mask: 0, depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) return "exhausted";
    const current = queue[cursor++]!;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win)) {
      if (current.mask !== allMask) return "bypass";
      continue;
    }
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      let mask = current.mask;
      for (const [groupIndex, group] of required.entries()) {
        if (group.patterns.some((pattern) => step.events.some((event) => eventMatchesPattern(event, pattern)))) mask |= 1 << groupIndex;
      }
      const key = `${runtime.key(step.state)}|${mask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: step.state, mask, depth: current.depth + 1 });
    }
  }
  return "complete_no_bypass";
}

function coversGroups(events: string[], groups: Group[]): boolean {
  return groups.every((group) => group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern))));
}
function toLevel(id: string, layout: string): LevelDoc { return { id, title: id, role: "challenge", status: "candidate", targets: [], known_before: ["K_runtime_smoke"], target_learning: ["K_runtime_smoke"], support_level: "none", expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout }; }
function choice<T>(values: T[]): T { return values[Math.floor(rng() * values.length)]!; }
function shuffle<T>(values: T[]): void { for (let i = values.length - 1; i > 0; i -= 1) { const j = Math.floor(rng() * (i + 1)); [values[i], values[j]] = [values[j]!, values[i]!]; } }
function mulberry32(value: number): Rng { let state = value >>> 0; return () => { state += 0x6d2b79f5; let next = state; next = Math.imul(next ^ (next >>> 15), next | 1); next ^= next + Math.imul(next ^ (next >>> 7), next | 61); return ((next ^ (next >>> 14)) >>> 0) / 4294967296; }; }
