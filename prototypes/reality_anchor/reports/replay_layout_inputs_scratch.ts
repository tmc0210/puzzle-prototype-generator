import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const [layoutPath, ...rawInputs] = process.argv.slice(2);
if (!layoutPath) {
  throw new Error("Usage: replay_layout_inputs_scratch.ts <layout-file> <input...>");
}

const inputs = rawInputs.flatMap((value) => value.split(/[\s,]+/)).filter(Boolean) as InputId[];
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_REPLAY_SCRATCH",
  title: "RA_REPLAY_SCRATCH",
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: [],
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: [],
  expected_llm_player_evidence: [],
  layout,
};

let state = adapter.parseLevel(level);
console.log("STEP 0");
console.log(adapter.renderState(state));
for (const [index, input] of inputs.entries()) {
  const result = adapter.step(pkg.mechanic, state, input, { winCondition: pkg.mechanic.win });
  console.log(`STEP ${index + 1} ${input} legal=${result.legal} events=${result.events.join(",") || "none"}`);
  if (!result.legal) break;
  state = result.state;
  console.log(adapter.renderState(state));
}
