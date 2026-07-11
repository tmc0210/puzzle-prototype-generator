import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, Point } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_SPLIT_KEY_OPENING_STARTS";
const maxStates = Number(process.argv[4] ?? 1_000_000);
if (!layoutPath) throw new Error("Usage: probe_split_key_opening_starts.ts <layout-file> <id> [maxStates]");

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

type Edge = { from: number; toKey: string; action: InputId; events: string[]; state: RealityAnchorState };
const states: RealityAnchorState[] = [initial];
const keys: string[] = [runtime.key(initial)];
const indexByKey = new Map([[keys[0]!, 0]]);
const internalEdges: Edge[] = [];

for (let cursor = 0; cursor < states.length; cursor += 1) {
  const state = states[cursor]!;
  for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const next = step.state as RealityAnchorState;
    const nextKey = runtime.key(next);
    const reversible = (runtime.actions(next, { winCondition: pkg.mechanic.win }) as InputId[]).some((back) => {
      const reverse = runtime.step(next, back, { winCondition: pkg.mechanic.win });
      return reverse.legal && runtime.key(reverse.state) === keys[cursor];
    });
    if (!reversible) continue;
    if (!indexByKey.has(nextKey)) {
      indexByKey.set(nextKey, states.length);
      states.push(next);
      keys.push(nextKey);
    }
    internalEdges.push({ from: cursor, toKey: nextKey, action, events: step.events, state: next });
  }
}

const exits: Edge[] = [];
for (let from = 0; from < states.length; from += 1) {
  const state = states[from]!;
  for (const action of runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]) {
    const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
    if (!step.legal) continue;
    const nextKey = runtime.key(step.state);
    if (!indexByKey.has(nextKey)) exits.push({ from, toKey: nextKey, action, events: step.events, state: step.state as RealityAnchorState });
  }
}

const candidatePositions = new Map<string, Point>();
for (const state of states) candidatePositions.set(`${state.player.x},${state.player.y}`, state.player);
const candidates = [...candidatePositions.values()]
  .map((player) => ({ ...initial, player }))
  .filter((state) => indexByKey.has(runtime.key(state)))
  .sort((a, b) => a.player.y - b.player.y || a.player.x - b.player.x)
  .map(analyzeStart);

const report = {
  id,
  workflow: "reality_anchor_opening_comfort_check",
  coordinateSystem: "zero_based_[x,y]",
  sourceLayout: layoutPath.replace(/\\/g, "/"),
  method: "exact bidirectional-edge initial SCC; solver checks for each exit target",
  initialSccSize: states.length,
  internalBidirectionalEdges: internalEdges.length,
  exitEdges: exits.length,
  playerPositionsSeen: candidatePositions.size,
  validCandidateStarts: candidates.length,
  candidates,
};
const out = `prototypes/reality_anchor/reports/opening_starts_${id}.json`;
await writeFile(out, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`Wrote ${out}`);

function solve(state: RealityAnchorState) {
  return solveWithRuntime(runtime, state, { winCondition: pkg.mechanic.win, maxStates, maxDepth: 200 });
}

function analyzeStart(state: RealityAnchorState) {
  const startIndex = indexByKey.get(runtime.key(state))!;
  const distances = new Array(states.length).fill(Number.POSITIVE_INFINITY);
  distances[startIndex] = 0;
  const queue = [startIndex];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    for (const edge of internalEdges) {
      if (edge.from !== from) continue;
      const to = indexByKey.get(edge.toKey)!;
      if (Number.isFinite(distances[to])) continue;
      distances[to] = distances[from] + 1;
      queue.push(to);
    }
  }
  const exitFacts = exits.map((edge) => {
    const result = solve(edge.state);
    return { sourceDistance: distances[edge.from], action: edge.action, events: edge.events, winReaching: result.found };
  });
  const winDistances = exitFacts.filter((x) => x.winReaching).map((x) => x.sourceDistance);
  const nearestWin = winDistances.length ? Math.min(...winDistances) : null;
  const firstStepLegalEvents = Object.fromEntries(
    (runtime.actions(state, { winCondition: pkg.mechanic.win }) as InputId[]).flatMap((action) => {
      const step = runtime.step(state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) return [];
      return [[action, { events: step.events, irreversible: !indexByKey.has(runtime.key(step.state)) }]];
    }),
  );
  const solution = solve(state);
  return {
    candidateStartPosition: [state.player.x, state.player.y],
    isCurrentStart: state.player.x === initial.player.x && state.player.y === initial.player.y,
    shortestSolution: solution.found ? solution.cost : null,
    shortestSolutionDelta: solution.found ? solution.cost - 28 : null,
    initialSccSize: states.length,
    nearestIrreversibleExitDistance: exitFacts.length ? Math.min(...exitFacts.map((x) => x.sourceDistance)) : null,
    nearestWinReachingExitDistance: nearestWin,
    deadExitsBeforeFirstWinExit: nearestWin === null ? null : exitFacts.filter((x) => !x.winReaching && x.sourceDistance < nearestWin).length,
    firstStepLegalEvents,
    whetherCoreChainPreserved: true,
    coreChainReason: "start state is in exact bidirectional initial SCC, so it has the same reachable state and winning sets as baseline",
  };
}
