import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_SPLIT_KEY_GOAL_EQUIVALENCE";
const maxStates = Number(process.argv[4] ?? 1_000_000);
if (!layoutPath) throw new Error("Usage: probe_split_key_goal_equivalence.ts <layout-file> <id> [maxStates]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id, title: id, role: "challenge", status: "candidate",
  targets: ["K_runtime_smoke"], known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"], support_level: "none",
  expected_solver_evidence: ["solvable"], expected_llm_player_evidence: [], layout,
};
const initial = adapter.parseLevel(level) as RealityAnchorState;
const goals = [...initial.goals].map(fromKey).sort((a, b) => a.y - b.y || a.x - b.x);
if (goals.length > 20) throw new Error("Too many goals for bit-mask probe");
const allMask = (1 << goals.length) - 1;

type Node = { state: RealityAnchorState; depth: number };
const queue: Node[] = [{ state: initial, depth: 0 }];
const visited = new Set<string>([runtime.key(initial)]);
const countsByCoverage = new Array<number>(1 << goals.length).fill(0);
const minDepthByCoverage = new Array<number>(1 << goals.length).fill(Number.POSITIVE_INFINITY);
record(initial, 0);
let cursor = 0;

while (cursor < queue.length && visited.size < maxStates) {
  const current = queue[cursor++]!;
  for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const state = step.state as RealityAnchorState;
    const key = runtime.key(state);
    if (visited.has(key)) continue;
    visited.add(key);
    const depth = current.depth + 1;
    queue.push({ state, depth });
    record(state, depth);
    if (visited.size >= maxStates) break;
  }
}

const status = cursor >= queue.length ? "complete" : "exhausted";
const baseline = evaluateRemoval(0);
const singles = goals.map((goal, index) => ({ goal: [goal.x, goal.y], ...evaluateRemoval(1 << index) }));
const equivalentSingleIndexes = singles.flatMap((entry, index) => entry.equivalentWithinBudget ? [index] : []);
const combinations = [];
for (let localMask = 1; localMask < (1 << equivalentSingleIndexes.length); localMask += 1) {
  if ((localMask & (localMask - 1)) === 0) continue;
  let removalMask = 0;
  const removedGoals: number[][] = [];
  for (let bit = 0; bit < equivalentSingleIndexes.length; bit += 1) {
    if ((localMask & (1 << bit)) === 0) continue;
    const goalIndex = equivalentSingleIndexes[bit]!;
    removalMask |= 1 << goalIndex;
    removedGoals.push([goals[goalIndex]!.x, goals[goalIndex]!.y]);
  }
  combinations.push({ removedGoals, ...evaluateRemoval(removalMask) });
}

const maximalEquivalent = combinations
  .filter((entry) => entry.equivalentWithinBudget)
  .sort((a, b) => b.removedGoals.length - a.removedGoals.length)[0] ?? null;

const report = {
  id,
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  method: "single non-terminalizing BFS prefix; target coverage bit-mask comparison",
  graphPrefix: { status, maxStates, visitedStates: visited.size, expandedStates: cursor },
  coordinateSystem: "zero_based_[x,y]",
  goals: goals.map((goal, index) => ({ index, point: [goal.x, goal.y] })),
  baseline,
  singles,
  equivalentSingleGoals: equivalentSingleIndexes.map((index) => [goals[index]!.x, goals[index]!.y]),
  combinations,
  maximalEquivalent,
  equivalenceRule: {
    sameWinningStateKeysWithinPrefix: "extraWinningStates == 0; baseline winners are a subset under goal removal",
    sameShortestCost: "shortestDepth equals baseline shortestDepth",
    implication: "same movement graph + same winning key set => same budget-bounded winning-path set and core-event gates",
  },
};
const out = `prototypes/reality_anchor/reports/goal_equivalence_${id}.json`;
await writeFile(out, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`Wrote ${out}`);

function record(state: RealityAnchorState, depth: number): void {
  const mask = coverageMask(state);
  countsByCoverage[mask] += 1;
  minDepthByCoverage[mask] = Math.min(minDepthByCoverage[mask], depth);
}

function evaluateRemoval(removalMask: number) {
  const requiredMask = allMask & ~removalMask;
  let winningStates = 0;
  let shortestDepth = Number.POSITIVE_INFINITY;
  for (let coverage = 0; coverage <= allMask; coverage += 1) {
    if ((coverage & requiredMask) !== requiredMask) continue;
    winningStates += countsByCoverage[coverage]!;
    shortestDepth = Math.min(shortestDepth, minDepthByCoverage[coverage]!);
  }
  const baselineWinningStates = countsByCoverage[allMask]!;
  const baselineShortestDepth = minDepthByCoverage[allMask]!;
  return {
    removalMask,
    winningStates,
    extraWinningStates: winningStates - baselineWinningStates,
    shortestDepth: Number.isFinite(shortestDepth) ? shortestDepth : null,
    shortestDepthDelta: Number.isFinite(shortestDepth) && Number.isFinite(baselineShortestDepth)
      ? shortestDepth - baselineShortestDepth
      : null,
    equivalentWithinBudget: winningStates === baselineWinningStates && shortestDepth === baselineShortestDepth,
  };
}

function coverageMask(state: RealityAnchorState): number {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(toKey(crate));
  for (const group of state.stickyGroups) for (const point of group) occupied.add(toKey(point));
  if (state.pushPullAnchor) {
    occupied.add(toKey(state.pushPullAnchor.push));
    occupied.add(toKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(toKey(state.boxStickyAnchor.box));
    occupied.add(toKey(state.boxStickyAnchor.sticky));
  }
  let mask = 0;
  goals.forEach((goal, index) => {
    if (occupied.has(toKey(goal))) mask |= 1 << index;
  });
  return mask;
}

function toKey(point: Point): string { return `${point.x},${point.y}`; }
function fromKey(key: string): Point {
  const [x, y] = key.split(",").map(Number);
  return { x: x!, y: y! };
}
