import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_TRACE_LAYOUT";
const rawInputs = process.argv[4];
const maxStates = Number(process.argv[5] ?? 300000);
const maxDepth = Number(process.argv[6] ?? 80);

if (!layoutPath) {
  throw new Error("Usage: trace_layout.ts <layout-file> [id] [space-separated-inputs] [maxStates] [maxDepth]");
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
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

let state = adapter.parseLevel(level);
const inputs = rawInputs
  ? rawInputs.split(/\s+/).filter(Boolean) as InputId[]
  : solveInputs();

const frames: Array<{
  step: number;
  input?: InputId;
  legal: boolean;
  win: boolean;
  events: string[];
  layout: string;
}> = [
  {
    step: 0,
    legal: true,
    win: runtime.isWin(state, pkg.mechanic.win),
    events: [],
    layout: adapter.renderState(state as never),
  },
];

for (const [index, input] of inputs.entries()) {
  const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  frames.push({
    step: index + 1,
    input,
    legal: result.legal,
    win: result.legal ? runtime.isWin(result.state, pkg.mechanic.win) : false,
    events: result.events,
    layout: result.legal ? adapter.renderState(result.state as never) : adapter.renderState(state as never),
  });
  if (!result.legal) {
    break;
  }
  state = result.state;
}

const outBase = path.join(prototypePath, "reports", `trace_${id}`);
await writeFile(`${outBase}.json`, `${JSON.stringify({ id, inputs, frames }, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(), "utf8");
console.log(formatMarkdown());
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function solveInputs(): InputId[] {
  const solution = solveWithRuntime(runtime, state, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  if (!solution.found) {
    throw new Error(`No solution found explored=${solution.exploredStates} reason=${solution.reason}`);
  }
  return solution.inputs;
}

function formatMarkdown(): string {
  const lines = [
    `# Trace: ${id}`,
    "",
    `- Inputs: ${inputs.join(" ")}`,
    `- Steps: ${inputs.length}`,
    "",
  ];
  for (const frame of frames) {
    lines.push(`## Step ${frame.step}${frame.input ? `: ${frame.input}` : ": start"}`);
    lines.push("");
    lines.push(`- legal: ${frame.legal}`);
    lines.push(`- win: ${frame.win}`);
    lines.push(`- events: ${frame.events.join(" ") || "none"}`);
    lines.push("");
    lines.push("```text");
    lines.push(frame.layout);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
