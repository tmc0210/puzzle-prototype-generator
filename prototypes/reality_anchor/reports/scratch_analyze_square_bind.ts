import { readFile } from "node:fs/promises";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const layoutPath = process.argv[2];
if (!layoutPath) {
  throw new Error("Usage: scratch_analyze_square_bind.ts <layout-file>");
}

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id: "RA_SQUARE_BIND_SCRATCH",
  title: "RA_SQUARE_BIND_SCRATCH",
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
const initial = adapter.parseLevel(level);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates: 500_000,
  maxDepth: 160,
});

console.log(layout);
console.log(`found=${solution.found} cost=${solution.cost} explored=${solution.exploredStates}`);
console.log(`inputs=${solution.inputs.join(" ")}`);
console.log(`events=${solution.events.join(" | ")}`);

if (solution.found) {
  let state = initial;
  console.log("STEP 0");
  console.log(adapter.renderState(state));
  for (const [index, input] of solution.inputs.entries()) {
    const stepped = adapter.step(pkg.mechanic, state, input, { winCondition: pkg.mechanic.win });
    if (!stepped.legal) {
      throw new Error(`Returned solution became illegal at step ${index + 1}`);
    }
    state = stepped.state;
    if (stepped.events.some((event) => event !== "walk")) {
      console.log(`STEP ${index + 1} ${input}: ${stepped.events.join(", ")}`);
      console.log(adapter.renderState(state));
    }
  }
}

const graph = analyzeGraphWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates: 500_000,
});
console.log(
  `graph=${graph.status} states=${graph.reachableStateCount} transitions=${graph.legalTransitionCount}`,
);
