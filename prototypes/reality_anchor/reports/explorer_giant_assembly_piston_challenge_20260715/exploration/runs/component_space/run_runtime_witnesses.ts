import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  renderState,
  step,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";

const here = dirname(fileURLToPath(import.meta.url));
const prototypeRoot = resolve(here, "../../../../..");
const pkg = await loadPrototypePackage(prototypeRoot);

const cases = [
  {
    id: "serial_crown_two_step_assembly",
    file: "serial_crown_two_step_assembly.layout.txt",
    inputs: ["right", "right"] as const,
  },
  {
    id: "serial_crown_simultaneous",
    file: "serial_crown_simultaneous.layout.txt",
    inputs: ["right"] as const,
  },
  {
    id: "serial_mask_three_step_assembly",
    file: "serial_mask_three_step_assembly.layout.txt",
    inputs: ["right", "right", "right"] as const,
  },
  {
    id: "crown_head_direct_access_counterfactual",
    file: "crown_head_direct_access_counterfactual.layout.txt",
    inputs: ["right"] as const,
  },
];

const reports = cases.map((testCase) => {
  const layout = readFileSync(join(here, testCase.file), "utf8").trimEnd();
  let state = parseLevel({ id: testCase.id, layout } as LevelDoc);
  const initial = renderState(state);
  const trace = [];
  for (const input of testCase.inputs) {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    trace.push({
      input,
      beforePlayer: before.player,
      beforeForceMode: forceModeAt(before, before.player),
      legal: result.legal,
      reason: result.reason,
      events: result.events,
      afterPlayer: result.state.player,
      afterForceMode: forceModeAt(result.state, result.state.player),
      afterWin: isWin(result.state),
      after: renderState(result.state),
    });
    if (result.legal) state = result.state;
  }
  return {
    id: testCase.id,
    layoutFile: testCase.file,
    initial,
    initialWin: isWin(parseLevel({ id: testCase.id, layout } as LevelDoc)),
    trace,
    finalWin: isWin(state),
  };
});

writeFileSync(join(here, "runtime_witnesses.json"), `${JSON.stringify({ reports }, null, 2)}\n`, "utf8");
for (const report of reports) {
  process.stdout.write(`${report.id}: legal=${report.trace.every((step) => step.legal)}, finalWin=${report.finalWin}\n`);
}
