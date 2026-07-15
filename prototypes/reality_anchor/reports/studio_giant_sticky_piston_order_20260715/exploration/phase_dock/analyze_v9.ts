import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2] ?? fileURLToPath(new URL("./phase_dock_gated_cathedral_v9.txt", import.meta.url));
const maxStates = Number(process.argv[3] ?? 100_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const level = {
  id: "PHASE_DOCK_GATED_CATHEDRAL_V9",
  title: "PHASE_DOCK_GATED_CATHEDRAL_V9",
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
};
const initial = adapter.parseLevel(level);
const options = { winCondition: pkg.mechanic.win } as never;

const correct = [
  "down", "down", "down", "left", "up", "left", "left",
];
const wrongDock = [
  "up", "up", "up", "left", "down",
];
const wrongFirstStroke = [...wrongDock, "left", "left"];

const correctTrace = replay(initial, correct);
const wrongDockTrace = replay(initial, wrongDock);
const wrongFirstTrace = replay(initial, wrongFirstStroke);
const wrongSecondAttempt = runtime.step(wrongFirstTrace.state as never, "left" as never, options);

const fullGraph = graphFrom(initial);
const wrongDockGraph = graphFrom(wrongDockTrace.state);
const wrongFirstGraph = graphFrom(wrongFirstTrace.state);

const result = {
  layoutPath,
  maxStates,
  componentSizes: {
    initial: stickySizes(initial as RealityAnchorState),
    correctAfterDock: stickySizes(
      correctTrace.snapshots.find(snapshot => snapshot.events.some(event => event.startsWith("sticky_merge:")))!.state as RealityAnchorState,
    ),
    wrongAfterDock: stickySizes(wrongDockTrace.state as RealityAnchorState),
    wrongAfterFirstStroke: stickySizes(wrongFirstTrace.state as RealityAnchorState),
  },
  correct: {
    inputs: correct,
    steps: correctTrace.snapshots.map(snapshotSummary),
    win: correctTrace.win,
  },
  wrong: {
    dockInputs: wrongDock,
    dockStep: snapshotSummary(wrongDockTrace.snapshots.at(-1)!),
    firstStrokeInputs: wrongFirstStroke,
    firstStrokeStep: snapshotSummary(wrongFirstTrace.snapshots.at(-1)!),
    secondStroke: {
      legal: wrongSecondAttempt.legal,
      reason: wrongSecondAttempt.reason,
      events: wrongSecondAttempt.events,
    },
  },
  fullGraph: graphSummary(fullGraph),
  wrongDockGraph: graphSummary(wrongDockGraph),
  wrongFirstStrokeGraph: graphSummary(wrongFirstGraph),
  winningFirstMergeCategories: classifyFirstMerge(fullGraph),
};

console.log(JSON.stringify(result, null, 2));

function replay(start: unknown, inputs: string[]) {
  let state = start;
  const snapshots: Array<{ input: string; state: unknown; legal: boolean; reason?: string; events: string[]; win: boolean }> = [];
  for (const input of inputs) {
    const transition = runtime.step(state as never, input as never, options);
    snapshots.push({
      input,
      state: transition.state,
      legal: transition.legal,
      reason: transition.reason,
      events: transition.events,
      win: runtime.isWin(transition.state as never, pkg.mechanic.win, options),
    });
    if (!transition.legal) break;
    state = transition.state;
  }
  return { state, snapshots, win: runtime.isWin(state as never, pkg.mechanic.win, options) };
}

function graphFrom(state: unknown) {
  return enumerateRuntimeGraph(
    runtime as never,
    state as never,
    pkg.mechanic.win,
    options,
    { maxStates, terminalizeWins: true },
  );
}

function graphSummary(graph: ReturnType<typeof graphFrom>) {
  const objectFamilies = new Set(
    [...graph.winStateIndexes].map(index => graph.keys[index]!.replace(/^Ply:[^|]+\|/, "")),
  );
  return {
    status: graph.status,
    reason: graph.reason,
    states: graph.states.length,
    transitions: graph.edges.length,
    rawWinningStates: graph.winStateIndexes.size,
    winningObjectFamilies: objectFamilies.size,
  };
}

function classifyFirstMerge(graph: ReturnType<typeof graphFrom>) {
  type Category = "none" | "up" | "down" | "left" | "right";
  const outgoing = new Map<number, typeof graph.edges>();
  for (const edge of graph.edges) {
    const edges = outgoing.get(edge.from) ?? [];
    edges.push(edge);
    outgoing.set(edge.from, edges);
  }
  const queue: Array<{ state: number; category: Category; inputs: string[] }> = [
    { state: 0, category: "none", inputs: [] },
  ];
  const visited = new Set(["0|none"]);
  const wins = new Map<Category, { inputs: string[] }>();
  for (let head = 0; head < queue.length; head += 1) {
    const current = queue[head]!;
    if (graph.winStateIndexes.has(current.state) && !wins.has(current.category)) {
      wins.set(current.category, { inputs: current.inputs });
    }
    for (const edge of outgoing.get(current.state) ?? []) {
      const category = current.category === "none" && edge.events.some(event => event.startsWith("sticky_merge:"))
        ? edge.action as Category
        : current.category;
      const key = `${edge.to}|${category}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: edge.to, category, inputs: [...current.inputs, edge.action] });
    }
  }
  return [...wins.entries()].map(([category, witness]) => ({ category, ...witness }));
}

function stickySizes(state: RealityAnchorState): number[] {
  return state.stickyGroups.map(group => group.length).sort((a, b) => b - a);
}

function snapshotSummary(snapshot: { input: string; legal: boolean; reason?: string; events: string[]; win: boolean }) {
  return {
    input: snapshot.input,
    legal: snapshot.legal,
    reason: snapshot.reason,
    events: snapshot.events,
    win: snapshot.win,
  };
}
