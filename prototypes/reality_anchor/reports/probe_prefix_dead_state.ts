import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { analyzeGraphWithRuntime } from "../../../src/core/graphAnalyzer.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_PREFIX_DEAD_STATE";
const rawPrefix = process.argv[4];
const maxStates = Number(process.argv[5] ?? 500_000);

if (!layoutPath || !rawPrefix) {
  throw new Error(
    "Usage: probe_prefix_dead_state.ts <layout-file> <id> <space-separated-prefix> [maxStates]",
  );
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

const prefix = rawPrefix.split(/\s+/).filter(Boolean) as InputId[];
let state = adapter.parseLevel(level);
const prefixEvents: string[] = [];
for (const [index, input] of prefix.entries()) {
  const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
  if (!result.legal) {
    throw new Error(`Prefix is illegal at step ${index + 1}: ${input} (${result.reason ?? "unknown"})`);
  }
  state = result.state;
  prefixEvents.push(...result.events);
}

const immediateActions = runtime.actions(state, { winCondition: pkg.mechanic.win }).map((action) => {
  const result = runtime.step(state, action, { winCondition: pkg.mechanic.win });
  return {
    action,
    legal: result.legal,
    reason: result.reason,
    events: result.events,
    nextLayout: result.legal ? adapter.renderState(result.state as never) : undefined,
  };
});
const solution = solveWithRuntime(runtime, state, {
  winCondition: pkg.mechanic.win,
  maxStates,
});
const graph = analyzeGraphWithRuntime(runtime, state, {
  winCondition: pkg.mechanic.win,
  maxStates,
});

const report = {
  id,
  sourceLayout: layout,
  prefix,
  prefixEvents,
  reachedLayout: adapter.renderState(state as never),
  reachedWin: runtime.isWin(state, pkg.mechanic.win),
  immediateActions,
  suffixSolution: {
    found: solution.found,
    reason: solution.reason,
    exploredStates: solution.exploredStates,
    cost: solution.cost,
    inputs: solution.inputs,
    events: solution.events,
  },
  suffixGraph: {
    status: graph.status,
    reachableStates: graph.reachableStateCount,
    legalTransitions: graph.legalTransitionCount,
    winningStates: graph.winStateCount,
  },
  budget: { maxStates },
};

const outBase = path.join(prototypePath, "reports", `prefix_dead_state_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# Prefix Dead-State Probe: ${input.id}`,
    "",
    `- Prefix: ${input.prefix.join(" ")}`,
    `- Reached win: ${input.reachedWin}`,
    `- Suffix solution found: ${input.suffixSolution.found}`,
    `- Suffix solve explored states: ${input.suffixSolution.exploredStates}`,
    `- Suffix graph: ${input.suffixGraph.status}; states=${input.suffixGraph.reachableStates}; transitions=${input.suffixGraph.legalTransitions}; wins=${input.suffixGraph.winningStates}`,
    `- Budget: maxStates=${input.budget.maxStates}`,
    "",
    "## Reached Layout",
    "",
    "```text",
    input.reachedLayout,
    "```",
    "",
    "## Immediate Actions",
    "",
  ];
  for (const action of input.immediateActions) {
    lines.push(
      `- ${action.action}: legal=${action.legal}; events=${action.events.join(" ") || "none"}; reason=${action.reason ?? "none"}`,
    );
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
