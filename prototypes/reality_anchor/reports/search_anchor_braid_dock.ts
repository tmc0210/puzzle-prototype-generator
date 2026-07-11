import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { LevelDoc } from "../../../src/core/types.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const width = 9;
const height = 9;
const fixed = new Map<string, string>([
  ["2,3", "P"],
  ["3,3", "L"],
  ["4,2", "S"],
  ["4,3", "B"],
  ["1,3", "@"],
]);

let seed = Number(process.argv[2] ?? 20260710) >>> 0;
const iterations = Number(process.argv[3] ?? 5000);
const wanted = Number(process.argv[4] ?? 20);
const rand = (): number => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x1_0000_0000;
};
const pick = <T>(values: T[]): T => values[Math.floor(rand() * values.length)]!;

type Point = { x: number; y: number };
const key = (p: Point): string => `${p.x},${p.y}`;
const cells: Point[] = [];
for (let y = 1; y < height - 1; y += 1) {
  for (let x = 1; x < width - 1; x += 1) cells.push({ x, y });
}

const horizontalPairs: Point[][] = [];
const verticalPairs: Point[][] = [];
for (let y = 1; y < height - 1; y += 1) {
  for (let x = 1; x < width - 2; x += 1) {
    horizontalPairs.push([{ x, y }, { x: x + 1, y }]);
  }
}
for (let y = 1; y < height - 2; y += 1) {
  for (let x = 1; x < width - 1; x += 1) {
    verticalPairs.push([{ x, y }, { x, y: y + 1 }]);
  }
}

const hasEvent = (events: string[], prefix: string): boolean =>
  events.some((event) => event === prefix || event.startsWith(`${prefix}:`));

const eventIndices = (
  steps: Array<{ events: string[] }>,
  prefix: string,
): number[] => steps.flatMap((step, index) => hasEvent(step.events, prefix) ? [index] : []);

function buildLayout(goals: Point[], walls: Set<string>): string {
  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "."));
  for (let x = 0; x < width; x += 1) {
    rows[0]![x] = "#";
    rows[height - 1]![x] = "#";
  }
  for (let y = 0; y < height; y += 1) {
    rows[y]![0] = "#";
    rows[y]![width - 1] = "#";
  }
  for (const wall of walls) {
    const [x, y] = wall.split(",").map(Number);
    rows[y]![x] = "#";
  }
  for (const goal of goals) rows[goal.y]![goal.x] = "G";
  for (const [cell, glyph] of fixed) {
    const [x, y] = cell.split(",").map(Number);
    rows[y]![x] = glyph;
  }
  return rows.map((row) => row.join("")).join("\n");
}

let found = 0;
for (let iteration = 0; iteration < iterations && found < wanted; iteration += 1) {
  const hGoals = pick(horizontalPairs);
  const vGoals = pick(verticalPairs);
  const goals = [...hGoals, ...vGoals];
  const goalKeys = new Set(goals.map(key));
  if (goalKeys.size !== 4) continue;
  if (goals.some((point) => fixed.has(key(point)))) continue;

  const walls = new Set<string>();
  const wallCount = 5 + Math.floor(rand() * 10);
  const wallPool = cells.filter((point) => !fixed.has(key(point)) && !goalKeys.has(key(point)));
  while (walls.size < wallCount && walls.size < wallPool.length) walls.add(key(pick(wallPool)));

  const layout = buildLayout(goals, walls);
  const level: LevelDoc = {
    id: `ANCHOR_BRAID_SEARCH_${iteration}`,
    title: "Anchor braid search",
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

  let initial;
  try {
    initial = adapter.parseLevel(level);
  } catch {
    continue;
  }
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates: 25_000,
    maxDepth: 55,
  });
  if (!solution.found || solution.cost < 12 || solution.cost > 40) continue;

  const pl = eventIndices(solution.steps, "anchor_boundary_shift:push_pull");
  const bs = eventIndices(solution.steps, "anchor_boundary_shift:box_sticky");
  const chains = eventIndices(solution.steps, "force_chain");
  const bsPulls = eventIndices(solution.steps, "pull_object:box_sticky_anchor");
  if (pl.length < 2 || pl.length > 9 || bs.length < 2 || bs.length > 9) continue;
  if (chains.length === 0 || bsPulls.length === 0) continue;
  if (!(pl[0]! < bs[0]!)) continue;
  const mixed = chains.find((index) => index >= bs[0]!);
  if (mixed === undefined) continue;
  const laterPl = pl.find((index) => index > mixed);
  if (laterPl === undefined) continue;
  const laterBs = bs.find((index) => index > laterPl);
  if (laterBs === undefined) continue;

  let state = initial;
  for (const input of solution.inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (result.legal) state = result.state;
  }

  found += 1;
  const eventSteps = solution.steps
    .map((step, index) => ({ index: index + 1, input: step.input, events: step.events }))
    .filter((step) => step.events.some((event) => event !== "walk"));
  process.stdout.write(JSON.stringify({
    found,
    iteration,
    cost: solution.cost,
    exploredStates: solution.exploredStates,
    inputs: solution.inputs,
    eventSteps,
    layout,
    final: adapter.renderState(state),
  }, null, 2) + "\n---\n");
}

process.stderr.write(`searched=${iterations} matched=${found} seed=${seed}\n`);
