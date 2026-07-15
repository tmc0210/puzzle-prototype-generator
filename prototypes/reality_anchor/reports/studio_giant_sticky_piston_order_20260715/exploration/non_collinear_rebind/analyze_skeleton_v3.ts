import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;
const initial = parse("non_collinear_rebind_skeleton_v3.txt");
const noUpperBackwall = parse("non_collinear_rebind_skeleton_v3_no_upper_backwall.txt");
const unmerged = parse("final_unmerged_probe_v3.txt");

const intended = [
  "right",
  ...repeat("up", 8), "right", "down",
  "left", ...repeat("down", 8), ...repeat("right", 4), "up", "up", "left", "down",
  "left",
  "down", "down", "right", "up",
  "right", "up", "left",
  "down", ...repeat("left", 4), ...repeat("up", 5), "right", ...repeat("up", 4), ...repeat("right", 7),
  "left", "left",
];

const wrongPhase = [
  "right",
  "down", ...repeat("right", 4), "up", "up", "left", "down",
  "left",
  "down", "down", "right", "up",
  "right", "up", "left",
  "down", ...repeat("left", 4), ...repeat("up", 5), "right", ...repeat("up", 4), ...repeat("right", 7),
  "left", "left", "left",
];

const traces = {
  intended: replay(initial, intended),
  wrongPhase: replay(initial, wrongPhase),
  wrongPhaseNoUpperBackwall: replay(noUpperBackwall, wrongPhase),
  unmergedDirectStroke: replay(unmerged, ["left", "left", "left"]),
};

console.log(JSON.stringify(Object.fromEntries(
  Object.entries(traces).map(([name, trace]) => [name, summarize(trace)]),
), null, 2));

function parse(name: string) {
  const path = fileURLToPath(new URL(`./${name}`, import.meta.url));
  return adapter.parseLevel({
    id: name,
    title: name,
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
    player: unknown;
    stickySizes: number[];
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
      player: (transition.state as RealityAnchorState).player,
      stickySizes: stickySizes(transition.state as RealityAnchorState),
    });
    if (!transition.legal) break;
    state = transition.state;
  }
  return { inputs, state, steps };
}

function summarize(trace: ReturnType<typeof replay>) {
  const nonWalk = trace.steps.filter(step => step.events.some(event => event !== "walk"));
  const end = trace.state as RealityAnchorState;
  return {
    inputs: trace.inputs.length,
    legalThrough: trace.steps.filter(step => step.legal).length,
    firstIllegal: trace.steps.find(step => !step.legal),
    win: runtime.isWin(end as never, pkg.mechanic.win, options),
    nonWalk,
    eventCounts: countEvents(trace.steps.flatMap(step => step.events)),
    finalPlayer: end.player,
    finalStickySizes: stickySizes(end),
    finalBoxes: end.boxes,
  };
}

function repeat(input: string, count: number) {
  return Array.from({ length: count }, () => input);
}

function countEvents(events: string[]) {
  const counts: Record<string, number> = {};
  for (const event of events) {
    const family = event.split(":", 1)[0]!;
    counts[family] = (counts[family] ?? 0) + 1;
  }
  return counts;
}

function stickySizes(state: RealityAnchorState) {
  return state.stickyGroups.map(group => group.length).sort((a, b) => b - a);
}
