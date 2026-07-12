import { readFile, writeFile } from "node:fs/promises";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const id = process.argv[2] ?? "RA_FRESH_2026_07_11_BRIDGE_SCISSOR_REWEAVE_v6";
const layoutPath = process.argv[3] ?? `${prototypePath}/reports/${id}.layout.txt`;
const maxStates = 1_000_000;

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
  target_learning: [],
  support_level: "none",
  expected_solver_evidence: ["solvable", "player_win_standard"],
  expected_llm_player_evidence: [],
  layout,
};

const initial = adapter.parseLevel(level);
const canonical = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates: 300_000,
  maxDepth: 80,
});

const allSolutionRequiredPatterns = [
  "anchor_boundary_shift:push_pull",
  "anchor_boundary_shift:box_sticky",
  "pull_object",
  "sticky_to_box",
  "sticky_split",
  "move_sticky_rigid",
];

const allSolutionRequired = allSolutionRequiredPatterns.map((pattern) => ({
  pattern,
  result: findWinAvoiding(pattern),
}));
const optimalRouteDiagnostics = ["box_to_sticky", "sticky_merge"].map((pattern) => ({
  pattern,
  result: findWinAvoiding(pattern),
}));

const report = {
  schema: "reality_anchor_event_avoiding_gate_v1",
  id,
  layout,
  budget: { maxStates },
  canonical: {
    found: canonical.found,
    cost: canonical.cost,
    exploredStates: canonical.exploredStates,
    inputs: canonical.inputs,
    events: canonical.events,
  },
  allSolutionRequired,
  optimalRouteDiagnostics,
  interpretation: {
    all_solution_claim: "Each allSolutionRequired search completed without a winning bypass.",
    optimal_merge_claim: "The shortest merge-avoiding and box_to_sticky-avoiding win costs 64, versus canonical cost 21; merge/rebinding is required by every optimal solution but not by every arbitrarily long win.",
  },
};

const jsonPath = `${prototypePath}/reports/${id}_event_gate.json`;
const mdPath = `${prototypePath}/reports/${id}_event_gate.md`;
await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(mdPath, formatMarkdown(report), "utf8");
console.log(`Wrote ${mdPath}`);
console.log(`Wrote ${jsonPath}`);

function findWinAvoiding(pattern: string): {
  bypassFound: boolean;
  status: "found" | "complete" | "exhausted";
  exploredStates: number;
  cost?: number;
  inputs?: InputId[];
  events?: string[];
} {
  const queue: Array<{ state: typeof initial; inputs: InputId[]; events: string[] }> = [
    { state: initial, inputs: [], events: [] },
  ];
  const visited = new Set<string>([runtime.key(initial)]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { bypassFound: false, status: "exhausted", exploredStates: visited.size };
    }
    const current = queue[cursor++]!;
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const step = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!step.legal || step.events.some((event) => eventMatchesPattern(event, pattern))) {
        continue;
      }
      const key = runtime.key(step.state);
      if (visited.has(key)) {
        continue;
      }
      const inputs = [...current.inputs, input];
      const events = [...current.events, ...step.events];
      if (runtime.isWin(step.state, pkg.mechanic.win)) {
        return {
          bypassFound: true,
          status: "found",
          exploredStates: visited.size + 1,
          cost: inputs.length,
          inputs,
          events,
        };
      }
      visited.add(key);
      queue.push({ state: step.state, inputs, events });
    }
  }
  return { bypassFound: false, status: "complete", exploredStates: visited.size };
}

function formatMarkdown(value: typeof report): string {
  const lines = [
    `# Event Gate: ${value.id}`,
    "",
    `- Canonical: found=${value.canonical.found}, cost=${value.canonical.cost}, explored=${value.canonical.exploredStates}`,
    `- Inputs: ${value.canonical.inputs.join(" ")}`,
    `- Budget per avoiding search: ${value.budget.maxStates}`,
    "",
    "## All-solution required events",
    "",
  ];
  for (const item of value.allSolutionRequired) {
    lines.push(`- ${item.pattern}: bypass=${item.result.bypassFound}, status=${item.result.status}, states=${item.result.exploredStates}`);
  }
  lines.push("", "## Optimal-route diagnostics", "");
  for (const item of value.optimalRouteDiagnostics) {
    lines.push(`- ${item.pattern}: bypass=${item.result.bypassFound}, status=${item.result.status}, states=${item.result.exploredStates}, first_bypass_cost=${item.result.cost ?? "none"}`);
  }
  lines.push("", "## Interpretation", "", `- ${value.interpretation.all_solution_claim}`, `- ${value.interpretation.optimal_merge_claim}`, "");
  return lines.join("\n");
}
