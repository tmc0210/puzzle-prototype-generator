import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, Point } from "../../../../../../src/core/types.js";
import { pointKey, type RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const layoutRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/nodes/apply_suffix_001/layout.txt";
const outputRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/evidence/apply_suffix_v2/solution_family_graph_probe.json";
const layoutBytes = await readFile(layoutRef);
const layoutSha256 = createHash("sha256").update(layoutBytes).digest("hex");
const layout = layoutBytes.toString("utf8").replace(/\r/g, "").replace(/\n+$/g, "");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level: LevelDoc = {
  id: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_SOLUTION_FAMILY_GRAPH",
  title: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_SOLUTION_FAMILY_GRAPH",
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
const initial = adapter.parseLevel(level) as RealityAnchorState;
const graph = enumerateRuntimeGraph(
  runtime,
  initial,
  pkg.mechanic.win,
  { winCondition: pkg.mechanic.win },
  { maxStates: 300_000, terminalizeWins: true },
);
if (graph.status !== "complete") {
  throw new Error(`graph incomplete: ${graph.reason ?? "unknown"}`);
}

const reverse = Array.from({ length: graph.states.length }, () => [] as number[]);
for (const edge of graph.edges) reverse[edge.to]!.push(edge.from);
const canReachWin = new Set<number>(graph.winStateIndexes);
const queue = [...graph.winStateIndexes];
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  for (const before of reverse[queue[cursor]!]!) {
    if (canReachWin.has(before)) continue;
    canReachWin.add(before);
    queue.push(before);
  }
}

const squareIndexes = graph.states
  .map((state, index) => ({ state, index }))
  .filter(({ state }) => state.stickyGroups.some(isExactTwoByTwo))
  .map(({ index }) => index);
const squareCanReachWinIndexes = squareIndexes.filter((index) => canReachWin.has(index));
const squareWinningIndexes = squareIndexes.filter((index) => graph.winStateIndexes.has(index));

const directSquare = replay(initial, ["down", "left", "up"]);
const correctZ = replay(initial, ["left", "down", "left", "up"]);
const directSquareIndex = graph.indexByKey.get(runtime.key(directSquare.state));
const correctZIndex = graph.indexByKey.get(runtime.key(correctZ.state));
if (directSquareIndex === undefined || correctZIndex === undefined) {
  throw new Error("constructed state absent from complete graph");
}

const winningStates = [...graph.winStateIndexes].sort((a, b) => a - b).map((index) => ({
  index,
  key: graph.keys[index],
  player: graph.states[index]!.player,
  objectSignature: objectSignature(graph.states[index]!),
  render: adapter.renderState(graph.states[index]!),
}));
const winningObjectSignatures = [...new Set(winningStates.map((state) => state.objectSignature))];

const report = {
  id: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001_V2_SOLUTION_FAMILY_GRAPH",
  prototype: "reality_anchor",
  exact: {
    candidateId: "RA_STICKY_IRREGULAR_APPLY_SUFFIX_001",
    exactVersion: "v2",
    layoutRef,
    layoutSha256,
  },
  graph: {
    status: graph.status,
    reachableStates: graph.states.length,
    legalTransitions: graph.edges.length,
    winningStates: graph.winStateIndexes.size,
    winReachableStates: canReachWin.size,
    budget: { maxStates: 300_000, terminalizeWins: true },
  },
  twoByTwoAudit: {
    definition: "a connected sticky group of exactly four cells filling a 2x2 bounding box",
    reachableStateCount: squareIndexes.length,
    canReachWinStateCount: squareCanReachWinIndexes.length,
    winningStateCount: squareWinningIndexes.length,
    canReachWinIndexes: squareCanReachWinIndexes,
    winningIndexes: squareWinningIndexes,
    sampleStateKeys: squareIndexes.slice(0, 20).map((index) => graph.keys[index]),
  },
  constructedCommitments: {
    directSquare: {
      inputs: ["down", "left", "up"],
      stepEvents: directSquare.steps,
      stateIndex: directSquareIndex,
      key: runtime.key(directSquare.state),
      hasExactTwoByTwo: directSquare.state.stickyGroups.some(isExactTwoByTwo),
      canReachWin: canReachWin.has(directSquareIndex),
      isWin: graph.winStateIndexes.has(directSquareIndex),
    },
    correctOffsetZ: {
      inputs: ["left", "down", "left", "up"],
      stepEvents: correctZ.steps,
      stateIndex: correctZIndex,
      key: runtime.key(correctZ.state),
      canReachWin: canReachWin.has(correctZIndex),
      isWin: graph.winStateIndexes.has(correctZIndex),
    },
  },
  winningStates,
  winningObjectSignatures,
  equivalenceMechanicalBoundary: {
    sameObjectSignatureAcrossAllWinningStates: winningObjectSignatures.length === 1,
    note:
      "This graph probe establishes complete reachability, absence of win-reachable 2x2 states, and identical object terminal signatures. Player-side equivalence still requires comparing actual winning replays and the allowed logic-class account.",
  },
};

await writeFile(outputRef, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputRef,
  graph: report.graph,
  twoByTwoAudit: report.twoByTwoAudit,
  directSquareCanReachWin: report.constructedCommitments.directSquare.canReachWin,
  correctZCanReachWin: report.constructedCommitments.correctOffsetZ.canReachWin,
  winningObjectSignatures,
}, null, 2));

function replay(
  start: RealityAnchorState,
  inputs: InputId[],
): { state: RealityAnchorState; steps: Array<{ step: number; input: InputId; events: string[]; key: string }> } {
  let state = start;
  const steps: Array<{ step: number; input: InputId; events: string[]; key: string }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!transition.legal) throw new Error(`replay failed at ${index + 1}/${input}: ${transition.reason ?? "unknown"}`);
    state = transition.state as RealityAnchorState;
    steps.push({ step: index + 1, input, events: transition.events, key: runtime.key(state) });
  }
  return { state, steps };
}

function isExactTwoByTwo(group: Point[]): boolean {
  if (group.length !== 4) return false;
  const xs = group.map((cell) => cell.x);
  const ys = group.map((cell) => cell.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  if (maxX - minX !== 1 || maxY - minY !== 1) return false;
  return new Set(group.map(pointKey)).size === 4;
}

function objectSignature(state: RealityAnchorState): string {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups
    .map((group) => group.map(pointKey).sort().join(";"))
    .sort()
    .join("|");
  const pushPull = state.pushPullAnchor
    ? `P:${pointKey(state.pushPullAnchor.push)};L:${pointKey(state.pushPullAnchor.pull)}`
    : "none";
  const boxSticky = state.boxStickyAnchor
    ? `B:${pointKey(state.boxStickyAnchor.box)};S:${pointKey(state.boxStickyAnchor.sticky)}`
    : "none";
  return `C:${crates}|M:${sticky}|PL:${pushPull}|BS:${boxSticky}`;
}
