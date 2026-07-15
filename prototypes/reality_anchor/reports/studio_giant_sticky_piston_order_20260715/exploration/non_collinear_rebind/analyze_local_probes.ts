import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const options = { winCondition: pkg.mechanic.win } as never;

const cases = {
  correct: replay(parse("final_correct_probe_v1.txt"), ["left", "left"]),
  wrong: replay(parse("final_wrong_probe_v1.txt"), ["left", "left"]),
  wrongNoBackwall: replay(parse("final_wrong_no_backwall_v1.txt"), ["left", "left"]),
  unmerged: replay(parse("final_unmerged_probe_v1.txt"), ["left", "left"]),
};

console.log(JSON.stringify(Object.fromEntries(
  Object.entries(cases).map(([name, trace]) => [name, summarize(trace)]),
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
    input: string;
    legal: boolean;
    reason?: string;
    events: string[];
    win: boolean;
    player: unknown;
    stickySizes: number[];
  }> = [];
  for (const input of inputs) {
    const transition = runtime.step(state as never, input as never, options);
    steps.push({
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
  return { start, state, steps };
}

function summarize(trace: ReturnType<typeof replay>) {
  const start = trace.start as RealityAnchorState;
  const end = trace.state as RealityAnchorState;
  return {
    startPlayer: start.player,
    startStickySizes: stickySizes(start),
    startBoxes: start.boxes,
    steps: trace.steps,
    finalPlayer: end.player,
    finalStickySizes: stickySizes(end),
    finalBoxes: end.boxes,
    win: runtime.isWin(end as never, pkg.mechanic.win, options),
  };
}

function stickySizes(state: RealityAnchorState) {
  return state.stickyGroups.map(group => group.length).sort((a, b) => b - a);
}
