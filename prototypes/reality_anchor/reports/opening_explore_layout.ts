import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
const inputs = process.argv.slice(3) as InputId[];
const allowed = new Set<InputId>(["up", "down", "left", "right"]);
if (!layoutPath || inputs.some((input) => !allowed.has(input))) {
  throw new Error("Usage: opening_explore_layout.ts <layout-file> [up|down|left|right ...] (max 8 inputs)");
}
if (inputs.length > 8) throw new Error("Opening exploration is capped at 8 inputs per run");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_OPENING_EXPLORATION",
  title: "RA_OPENING_EXPLORATION",
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: [],
  expected_llm_player_evidence: [],
  layout,
};

let state = adapter.parseLevel(level);
console.log("Step 0: initial");
console.log(adapter.renderState(state));
for (let index = 0; index < inputs.length; index += 1) {
  const input = inputs[index]!;
  const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  if (step.legal) state = step.state;
  console.log(`\nStep ${index + 1}: ${input} (${step.legal ? "moved" : "blocked"})`);
  console.log(adapter.renderState(state));
  if (runtime.isWin(state, pkg.mechanic.win)) console.log("SOLVED");
}
