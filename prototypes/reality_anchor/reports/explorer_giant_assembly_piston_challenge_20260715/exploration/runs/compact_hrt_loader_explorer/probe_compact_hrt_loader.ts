import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

import type { Direction, LevelDoc, MechanicDoc } from "../../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const runDir = path.resolve(import.meta.dirname);
const repoRoot = path.resolve(runDir, "../../../../../../..");
const mechanic = parse(
  fs.readFileSync(path.join(repoRoot, "prototypes/reality_anchor/mechanic.yml"), "utf8"),
) as MechanicDoc;
const layoutPath = path.join(runDir, "layouts/compact_hrt_loader_v1.layout.txt");
const layout = fs.readFileSync(layoutPath, "utf8").trimEnd();
const level: LevelDoc = { id: "compact_hrt_loader_v1", title: "compact HRT loader v1", layout };

const exactInputs: Direction[] = [
  ...Array<Direction>(5).fill("up"),
  "left",
  "left",
  "down",
  "right",
  "left",
  ...Array<Direction>(3).fill("up"),
  ...Array<Direction>(11).fill("right"),
  ...Array<Direction>(9).fill("up"),
  ...Array<Direction>(11).fill("left"),
  ...Array<Direction>(3).fill("down"),
  "right",
  "right",
];

function targetMask(state: RealityAnchorState): number {
  const occupied = new Set([
    ...state.crates.map(pointKey),
    ...state.stickyGroups.flat().map(pointKey),
    ...(state.pushPullAnchor
      ? [pointKey(state.pushPullAnchor.push), pointKey(state.pushPullAnchor.pull)]
      : []),
    ...(state.boxStickyAnchor
      ? [pointKey(state.boxStickyAnchor.box), pointKey(state.boxStickyAnchor.sticky)]
      : []),
  ]);
  const goals = [...state.goals].sort((a, b) => {
    const [, ay] = a.split(",").map(Number);
    const [, by] = b.split(",").map(Number);
    return ay! - by!;
  });
  return goals.reduce((mask, goal, index) => mask | (occupied.has(goal) ? 1 << index : 0), 0);
}

let state = parseLevel(level);
const trace: Array<Record<string, unknown>> = [];
for (const [index, input] of exactInputs.entries()) {
  const before = state;
  const result = step(mechanic, state, input);
  trace.push({
    step: index + 1,
    input,
    legal: result.legal,
    reason: result.reason,
    events: result.events,
    playerBefore: before.player,
    playerAfter: result.state.player,
    maskBefore: targetMask(before),
    maskAfter: targetMask(result.state),
    stateKeyAfter: stateKey(result.state),
  });
  if (!result.legal) {
    throw new Error(`exact trace step ${index + 1} (${input}) is illegal: ${result.reason}`);
  }
  state = result.state;
}

const summary = {
  layout: path.relative(runDir, layoutPath).replaceAll("\\", "/"),
  exactInputs,
  stepCount: exactInputs.length,
  finalWin: isWin(state, mechanic.win),
  finalMask: targetMask(state),
  initialState: renderState(parseLevel(level)),
  finalState: renderState(state),
  trace,
};

const reportDir = path.join(runDir, "reports");
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(path.join(reportDir, "exact_trace.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
