import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;
const version = process.argv[2] ?? "v6";
const layoutPath = fileURLToPath(new URL(
  `../local_noncollinear/noncollinear_crate_vacate_${version}.txt`,
  import.meta.url,
));
const initial = adapter.parseLevel({
  id: `NONCOLLINEAR_CRATE_VACATE_${version.toUpperCase()}`,
  title: `NONCOLLINEAR_CRATE_VACATE_${version.toUpperCase()}`,
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
});

const pullPushPullAnchorDown = ["up", ...repeat("left", 5), ...repeat("up", 11), ...repeat("right", 3), "down"];
const pistonDownThenEarlyFire = [
  "up", ...repeat("left", 5), ...repeat("up", 7), ...repeat("right", 3), "up", "down",
  ...repeat("left", 3), ...repeat("up", 3), ...repeat("right", 4), "down", "left", "left",
];
const initialRightAttempt = ["up", ...repeat("right", 7), ...repeat("up", 7), "right"];
const plDownShortestBypass = [
  ...pullPushPullAnchorDown,
  "left", "down", "right", "left", "right", "up", "left", "down", "right", "up", "down", "down",
];
const plDownNoBoxToStickyBypass = [
  ...pullPushPullAnchorDown,
  "left", "left", "up", "right", "right", "down", "right", "down", "left", "down", "right",
  "down", "down", "down", "down", "down", "left",
];
const pistonDownShortestBypass = [
  ...pistonDownThenEarlyFire.slice(0, 18),
  "down", "left", "up", "right", "up", "up", "right", "left", "up", "up", "left", "down", "right", "up",
  "down", "down", "down",
];
const pistonDownNoAnchorBypass = [
  ...pistonDownThenEarlyFire.slice(0, 18),
  "down", "down", "left", "up", "up", "right", "up", "up", "up", "left", "down", "right", "left", "right",
  "up", "up", "left", "down", "down", "right", "down", "right", "left",
];

console.log(JSON.stringify({
  pullPushPullAnchorDown: summarize(replay(initial, pullPushPullAnchorDown)),
  pistonDownThenEarlyFire: summarize(replay(initial, pistonDownThenEarlyFire)),
  plDownShortestBypass: summarize(replay(initial, plDownShortestBypass)),
  plDownNoBoxToStickyBypass: summarize(replay(initial, plDownNoBoxToStickyBypass)),
  pistonDownShortestBypass: summarize(replay(initial, pistonDownShortestBypass)),
  pistonDownNoAnchorBypass: summarize(replay(initial, pistonDownNoAnchorBypass)),
  initialRightAttempt: summarize(replay(initial, initialRightAttempt)),
  overcutThirdColumn: summarize(replay(initial, ["right", "right", "right"])),
}, null, 2));

function replay(start: unknown, inputs: string[]) {
  let state = start;
  const steps: Array<{ index: number; input: string; legal: boolean; reason?: string; events: string[]; win: boolean; player: unknown }> = [];
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
    });
    if (!transition.legal) break;
    state = transition.state;
  }
  return { state, steps, inputs };
}

function summarize(trace: ReturnType<typeof replay>) {
  const end = trace.state as RealityAnchorState;
  return {
    inputs: trace.inputs.length,
    legalThrough: trace.steps.filter(step => step.legal).length,
    firstIllegal: trace.steps.find(step => !step.legal),
    win: runtime.isWin(trace.state as never, pkg.mechanic.win, options),
    nonWalk: trace.steps.filter(step => step.events.some(event => event !== "walk")),
    finalPlayer: end.player,
    finalCrates: end.crates,
    finalAnchors: { pushPull: end.pushPullAnchor, boxSticky: end.boxStickyAnchor },
    finalStickySizes: end.stickyGroups.map(group => group.length).sort((a, b) => b - a),
  };
}

function repeat(input: string, count: number) {
  return Array.from({ length: count }, () => input);
}
