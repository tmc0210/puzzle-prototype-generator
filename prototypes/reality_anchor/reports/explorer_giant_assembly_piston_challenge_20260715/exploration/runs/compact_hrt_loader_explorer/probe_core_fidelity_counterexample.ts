import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

import type { Direction, LevelDoc, MechanicDoc } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  parseLevel,
  renderState,
  step,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const runDir = path.resolve(import.meta.dirname);
const repoRoot = path.resolve(runDir, "../../../../../../..");
const mechanic = parse(
  fs.readFileSync(path.join(repoRoot, "prototypes/reality_anchor/mechanic.yml"), "utf8"),
) as MechanicDoc;
const layoutPath = path.join(runDir, "layouts/compact_hrt_loader_v1.layout.txt");
const level: LevelDoc = {
  id: "compact_hrt_loader_v1_core_fidelity_counterexample",
  title: "compact HRT loader v1 core-fidelity counterexample",
  layout: fs.readFileSync(layoutPath, "utf8").trimEnd(),
};

// 不动 kit，绕到上槽 C 的左邻格 (13,4)。
const approach: Direction[] = [
  "left",
  "left",
  ...Array<Direction>(13).fill("up"),
  "right",
  "right",
  "up",
  "up",
  ...Array<Direction>(9).fill("right"),
];

let state = parseLevel(level);
for (const [index, input] of approach.entries()) {
  const result = step(mechanic, state, input);
  if (!result.legal) {
    throw new Error(`approach step ${index + 1} (${input}) is illegal: ${result.reason}`);
  }
  if (result.events.some((event) => event !== "walk")) {
    throw new Error(`approach unexpectedly moved material at step ${index + 1}: ${result.events.join(",")}`);
  }
  state = result.state;
}

const directRight = step(mechanic, state, "right");
const pollutionLeft = step(mechanic, state, "left");
const report = {
  layout: "layouts/compact_hrt_loader_v1.layout.txt",
  approach,
  approachStepCount: approach.length,
  directStart: state.player,
  forceModeAtDirectStart: forceModeAt(state, state.player),
  directRight: {
    legal: directRight.legal,
    reason: directRight.reason,
    events: directRight.events,
  },
  pollutionLeft: {
    legal: pollutionLeft.legal,
    reason: pollutionLeft.reason,
    events: pollutionLeft.events,
    stateAfter: renderState(pollutionLeft.state),
  },
};

const reportDir = path.join(runDir, "reports");
fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(
  path.join(reportDir, "core_fidelity_counterexample.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(JSON.stringify(report, null, 2));
