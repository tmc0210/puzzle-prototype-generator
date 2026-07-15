import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;
const layoutPath = fileURLToPath(new URL(
  "../local_noncollinear/noncollinear_crate_vacate_v4.txt",
  import.meta.url,
));
const initial = adapter.parseLevel({
  id: "NONCOLLINEAR_CRATE_VACATE_V4",
  title: "NONCOLLINEAR_CRATE_VACATE_V4",
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
});

const cut = ["right", "right"];
const arrangeContactAndRestorePiston = [
  "up", ...repeat("left", 4), ...repeat("up", 2), "left", ...repeat("up", 8), "right", "up",
  "left", ...repeat("down", 3), ...repeat("right", 2), "up", "left", "down",
];
const toAnchor = ["left", ...repeat("down", 8), ...repeat("right", 2), "down"];
const intended = [
  ...cut,
  ...arrangeContactAndRestorePiston,
  ...toAnchor, "left", "left",
  ...repeat("up", 8), ...repeat("right", 8), "left",
];

const partialRestore = [
  ...cut,
  ...arrangeContactAndRestorePiston,
  ...toAnchor, "left",
  "up", "left", ...repeat("up", 7), ...repeat("right", 8), "left",
];

const noRestore = [
  ...cut,
  ...arrangeContactAndRestorePiston,
  ...toAnchor,
  "up", "left", "left", ...repeat("up", 7), ...repeat("right", 8), "left", "left",
];

const pistonNotRestored = [
  ...cut,
  ...arrangeContactAndRestorePiston.slice(0, -1),
  "left", ...repeat("down", 9), ...repeat("right", 2), "down", "left", "left",
  ...repeat("up", 8), ...repeat("right", 8), "left", "left",
];

const contactNotMoved = [
  ...cut,
  "up", ...repeat("left", 3), "down", "left", "left",
  ...repeat("up", 8), ...repeat("right", 8), "left", "left",
];

const initialMoveDown = ["up", ...repeat("right", 5), "down"];
const initialMoveRight = ["up", ...repeat("right", 7), ...repeat("up", 7), "right"];
const initialRightShortestBypass = [
  ...initialMoveRight,
  ...repeat("up", 4), ...repeat("left", 9), "down", "left", "left", "down", "right", "down", "left",
  "up", "up", "right", "right", "left",
];
const initialRightNoRebindBypass = [
  ...initialMoveRight,
  ...repeat("up", 4), ...repeat("left", 10), "down", "right", "left", "left", "left", "up",
  "right", "right", "down", "right", "down", "left",
];
const initialMoveLeft = [
  "up", ...repeat("left", 3), ...repeat("up", 7), ...repeat("right", 8), "left", "left",
];

console.log(JSON.stringify({
  intended: summarize(replay(initial, intended)),
  partialRestore: summarize(replay(initial, partialRestore)),
  noRestore: summarize(replay(initial, noRestore)),
  pistonNotRestored: summarize(replay(initial, pistonNotRestored)),
  contactNotMoved: summarize(replay(initial, contactNotMoved)),
  initialMoveDown: summarize(replay(initial, initialMoveDown)),
  initialMoveRight: summarize(replay(initial, initialMoveRight)),
  initialRightShortestBypass: summarize(replay(initial, initialRightShortestBypass)),
  initialRightNoRebindBypass: summarize(replay(initial, initialRightNoRebindBypass)),
  initialMoveLeft: summarize(replay(initial, initialMoveLeft)),
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
    finalStickySizes: end.stickyGroups.map(group => group.length).sort((a, b) => b - a),
  };
}

function repeat(input: string, count: number) {
  return Array.from({ length: count }, () => input);
}
