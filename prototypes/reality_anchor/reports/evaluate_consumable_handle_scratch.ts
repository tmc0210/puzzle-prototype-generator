import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2] ?? "prototypes/Reality_Anchor/reports/RA_CONSUMABLE_HANDLE_ZIPPER_scratch.layout.txt";
const maxStates = Number(process.argv[3] ?? 500_000);
const maxDepth = Number(process.argv[4] ?? 80);
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_CONSUMABLE_HANDLE_SCRATCH",
  title: "RA_CONSUMABLE_HANDLE_SCRATCH",
  role: "challenge",
  status: "candidate",
  targets: ["K_runtime_smoke"],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level) as RealityAnchorState;
const solution = solveWithRuntime(runtime, initial, { winCondition: pkg.mechanic.win, maxStates, maxDepth });
console.log(JSON.stringify({ found: solution.found, cost: solution.cost, explored: solution.exploredStates, status: solution.status, inputs: solution.inputs }, null, 2));
if (!solution.found) {
  console.log(adapter.renderState(initial));
  for (const input of ["up", "down", "left", "right"] as InputId[]) {
    const step = runtime.step(initial, input, { winCondition: pkg.mechanic.win });
    console.log(`${input}: legal=${step.legal} reason=${step.reason ?? ""} events=${step.events.join("|")}`);
    if (step.legal) console.log(adapter.renderState(step.state));
  }
  process.exit(0);
}
let state = initial;
console.log(`\n0\n${adapter.renderState(state)}`);
for (const [index, input] of (solution.inputs as InputId[]).entries()) {
  const step = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  if (!step.legal) throw new Error(`illegal replay ${index + 1}/${input}: ${step.reason}`);
  state = step.state as RealityAnchorState;
  if (step.events.length !== 1 || step.events[0] !== "walk") {
    console.log(`\n${index + 1} ${input}: ${step.events.join(" | ")}\n${adapter.renderState(state)}`);
  }
}
