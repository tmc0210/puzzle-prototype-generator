import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2] ?? fileURLToPath(new URL("./phase_rebind_skeleton_v1.txt", import.meta.url));
const maxStates = Number(process.argv[3] ?? 100_000);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;

const initial = parse(layoutPath, "PHASE_REBIND_SKELETON_V1");
const localWrong = parse(
  fileURLToPath(new URL("./rebind_final_wrong_probe_v1.txt", import.meta.url)),
  "REBIND_FINAL_WRONG_PROBE_V1",
);
const localNoBackwall = parse(
  fileURLToPath(new URL("./rebind_final_wrong_no_backwall_v1.txt", import.meta.url)),
  "REBIND_FINAL_WRONG_NO_BACKWALL_V1",
);

const intended = [
  "down", "down", "down", "down", "down", "right", "left",
  "up", "up", "right", "right", "up", "up", "down", "down",
  "left", "left", "down", "down", "right", "up", "left",
  "up", "up", "up", "up", "right",
];
const knownBypass = [
  "down", "down", "down", "down", "down", "right", "left",
  "up", "up", "right", "right", "up", "up", "down", "down",
  "left", "left", "up", "right",
];

const intendedTrace = replay(initial, intended);
const bypassTrace = replay(initial, knownBypass);
const wrongFirst = replay(localWrong, ["right"]);
const wrongSecond = runtime.step(wrongFirst.state as never, "right" as never, options);
const noBackFirst = replay(localNoBackwall, ["right"]);
const noBackSecond = runtime.step(noBackFirst.state as never, "right" as never, options);
const fullGraph = enumerateRuntimeGraph(
  runtime as never,
  initial as never,
  pkg.mechanic.win,
  options,
  { maxStates, terminalizeWins: true },
);

console.log(JSON.stringify({
  layoutPath,
  maxStates,
  initialStickySizes: stickySizes(initial as RealityAnchorState),
  intended: summarizeReplay(intendedTrace),
  knownBypassWithoutRestore: summarizeReplay(bypassTrace),
  wrongEarlyFire: {
    first: wrongFirst.steps.at(-1),
    second: {
      legal: wrongSecond.legal,
      reason: wrongSecond.reason,
      events: wrongSecond.events,
    },
  },
  removeUpperBackwallCounterfactual: {
    first: noBackFirst.steps.at(-1),
    second: {
      legal: noBackSecond.legal,
      reason: noBackSecond.reason,
      events: noBackSecond.events,
      win: runtime.isWin(noBackSecond.state as never, pkg.mechanic.win, options),
    },
  },
  fullGraph: graphSummary(fullGraph),
  conclusion: "intended trace 可运行，但 known bypass 不复位 B/S、不发生 box_to_sticky/sticky_merge 仍胜；最小骨架未满足重新并回的必要性。",
}, null, 2));

function parse(path: string, id: string) {
  return adapter.parseLevel({
    id,
    title: id,
    layout: readFileSync(path, "utf8"),
    win: pkg.mechanic.win,
  });
}

function replay(start: unknown, inputs: string[]) {
  let state = start;
  const steps: Array<{
    index: number;
    input: string;
    legal: boolean;
    reason?: string;
    events: string[];
    win: boolean;
  }> = [];
  for (const [index, input] of inputs.entries()) {
    const transition = runtime.step(state as never, input as never, options);
    steps.push({
      index: index + 1,
      input,
      legal: transition.legal,
      reason: transition.reason,
      events: transition.events,
      win: runtime.isWin(transition.state as never, pkg.mechanic.win, options),
    });
    if (!transition.legal) break;
    state = transition.state;
  }
  return {
    inputs,
    state,
    steps,
    win: runtime.isWin(state as never, pkg.mechanic.win, options),
  };
}

function summarizeReplay(trace: ReturnType<typeof replay>) {
  return {
    inputs: trace.inputs,
    legalThrough: trace.steps.filter(step => step.legal).length,
    win: trace.win,
    nonWalkSteps: trace.steps.filter(step => step.events.some(event => event !== "walk")),
    eventCounts: countEvents(trace.steps.flatMap(step => step.events)),
    finalStickySizes: stickySizes(trace.state as RealityAnchorState),
  };
}

function countEvents(events: string[]) {
  const counts: Record<string, number> = {};
  for (const event of events) {
    const family = event.split(":", 1)[0]!;
    counts[family] = (counts[family] ?? 0) + 1;
  }
  return counts;
}

function graphSummary(graph: ReturnType<typeof enumerateRuntimeGraph>) {
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

function stickySizes(state: RealityAnchorState) {
  return state.stickyGroups.map(group => group.length).sort((a, b) => b - a);
}
