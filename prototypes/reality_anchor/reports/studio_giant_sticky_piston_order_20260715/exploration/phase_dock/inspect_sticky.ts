import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = resolve(process.argv[2]!);
const inputs = (process.argv[3] ?? "").split(",").filter(Boolean);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel({
  id: "PHASE_REBIND_INSPECT",
  title: "PHASE_REBIND_INSPECT",
  layout: readFileSync(layoutPath, "utf8"),
  win: pkg.mechanic.win,
});
const options = { winCondition: pkg.mechanic.win } as never;
let state = initial;
const trace = [];
for (const input of inputs) {
  const transition = runtime.step(state as never, input as never, options);
  trace.push({ input, legal: transition.legal, reason: transition.reason, events: transition.events });
  if (!transition.legal) break;
  state = transition.state;
}

console.log(JSON.stringify({
  layoutPath,
  inputs,
  trace,
  initial: summarize(initial as RealityAnchorState),
  final: summarize(state as RealityAnchorState),
}, null, 2));

function summarize(value: RealityAnchorState) {
  return {
    player: value.player,
    crates: value.crates,
    pushPullAnchor: value.pushPullAnchor,
    boxStickyAnchor: value.boxStickyAnchor,
    stickyGroups: value.stickyGroups.map((group, index) => ({
      index,
      size: group.length,
      bounds: {
        minX: Math.min(...group.map(point => point.x)),
        maxX: Math.max(...group.map(point => point.x)),
        minY: Math.min(...group.map(point => point.y)),
        maxY: Math.max(...group.map(point => point.y)),
      },
      cells: group,
    })),
  };
}
