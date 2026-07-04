import { readFile, writeFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const inputPath = process.argv[2];
const outputPath = process.argv[3];
const id = process.argv[4] ?? "RA_COMPRESSED";
const maxStates = Number(process.argv[5] ?? 300000);
const maxDepth = Number(process.argv[6] ?? 120);

if (!inputPath || !outputPath) {
  throw new Error("Usage: compress_trace_layout.ts <input-layout> <output-layout> [id] [maxStates] [maxDepth]");
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(inputPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
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
  maxStates,
  maxDepth,
});
if (!solution.found) {
  throw new Error(`No solution found for ${inputPath}`);
}

const used = new Set<string>();
let state = initial;
markRendered(adapter.renderState(state), used);
for (const input of solution.inputs) {
  const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  if (!result.legal) {
    throw new Error(`Returned solution became illegal at input ${input}`);
  }
  state = result.state;
  markRendered(adapter.renderState(state), used);
}

const originalRows = layout.split("\n").map((row) => row.split(""));
const compressed = originalRows.map((row, y) =>
  row.map((glyph, x) => {
    if (glyph === "#") {
      return "#";
    }
    if (used.has(`${x},${y}`)) {
      return glyph;
    }
    return "#";
  }).join(""),
).join("\n");

await writeFile(outputPath, `${compressed}\n`, "utf8");
console.log(`cost=${solution.cost} depth=${solution.depth} inputs=${solution.inputs.join(" ")}`);
console.log(compressed);

function markRendered(rendered: string, used: Set<string>): void {
  const rows = rendered.split("\n");
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y] ?? "";
    for (let x = 0; x < row.length; x += 1) {
      if ((row[x] ?? "#") !== "#") {
        used.add(`${x},${y}`);
      }
    }
  }
}
