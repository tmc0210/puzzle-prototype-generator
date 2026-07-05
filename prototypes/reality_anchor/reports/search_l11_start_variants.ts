import { writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

const prototypePath = "prototypes/reality_anchor";
const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

const templates = [
  [
    "###########",
    "###########",
    "###..######",
    "###.CMM####",
    "###...G####",
    "#...G....##",
    "#.....BS.##",
    "###########",
  ],
  [
    "###########",
    "###########",
    "###..######",
    "###.CMM####",
    "###...G.###",
    "#...G....##",
    "#.....BS.##",
    "###########",
  ],
  [
    "###########",
    "###..######",
    "###..######",
    "###.CMM####",
    "###...G.###",
    "#...G....##",
    "#.....BS.##",
    "###########",
  ],
];

type Hit = {
  id: string;
  layout: string;
  cost: number;
  inputs: InputId[];
  events: string[];
  firstNonWalkStep: number;
  firstNonWalkEvents: string[];
  graphStates: number;
  winStates: number;
  forcedViablePrefix: number | undefined;
  forcedCommitmentPrefix: number | undefined;
};

const hits: Hit[] = [];
let counter = 0;
for (const rows of templates) {
  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y]!.length; x += 1) {
      if (rows[y]![x] !== ".") continue;
      const grid = rows.map((row) => row.split(""));
      grid[y]![x] = "@";
      const layout = grid.map((row) => row.join("")).join("\n");
      const id = `RA_L11_START_VARIANT_${counter++}`;
      const level = toLevel(id, layout);
      let initial;
      try {
        initial = adapter.parseLevel(level);
      } catch {
        continue;
      }
      const solution = solveWithRuntime(runtime, initial, {
        winCondition: pkg.mechanic.win,
        maxStates: 300000,
        maxDepth: 80,
      });
      if (!solution.found || solution.cost === undefined) continue;
      if (!hasAll(solution.events, ["anchor_boundary_shift:box_sticky", "box_to_sticky", "sticky_merge", "sticky_to_box", "move_sticky_rigid"])) {
        continue;
      }
      const trace = replay(initial, solution.inputs);
      const firstNonWalkIndex = trace.findIndex((step) => step.events.some((event) => event !== "walk"));
      if (firstNonWalkIndex < 0) continue;
      const firstEvents = trace[firstNonWalkIndex]!.events;
      if (firstEvents.some((event) => eventMatchesPattern(event, "push_object:box_sticky_anchor"))) continue;
      if (!trace.slice(firstNonWalkIndex + 1).some((step) => step.events.some((event) => eventMatchesPattern(event, "push_object:box_sticky_anchor")))) {
        continue;
      }
      let analysis;
      try {
        analysis = analyzeLevel(pkg, level, {
          maxStates: 300000,
          maxDepth: 80,
          graphMaxStates: 300000,
          counterfactualMaxStates: 5000,
        });
      } catch {
        continue;
      }
      if (analysis.graph.status !== "complete") continue;
      hits.push({
        id,
        layout: adapter.renderState(initial as never),
        cost: solution.cost,
        inputs: solution.inputs,
        events: solution.events,
        firstNonWalkStep: firstNonWalkIndex + 1,
        firstNonWalkEvents: firstEvents,
        graphStates: analysis.graph.reachableStateCount,
        winStates: analysis.graph.winStateCount,
        forcedViablePrefix: analysis.agency.compression?.forcedViablePrefixLength,
        forcedCommitmentPrefix: analysis.agency.compression?.forcedCommitmentPrefixLength,
      });
    }
  }
}

hits.sort((a, b) => {
  const aForced = (a.forcedViablePrefix ?? 99) + (a.forcedCommitmentPrefix ?? 99);
  const bForced = (b.forcedViablePrefix ?? 99) + (b.forcedCommitmentPrefix ?? 99);
  return aForced - bForced || b.cost - a.cost;
});

const report = [
  "# L11 Start Variant Search",
  "",
  `hits=${hits.length}`,
  "",
  ...hits.slice(0, 20).flatMap((hit, index) => [
    `## Hit ${index + 1}: ${hit.id}`,
    "",
    `cost=${hit.cost} graph=${hit.graphStates} win=${hit.winStates} forcedViable=${hit.forcedViablePrefix ?? "n/a"} forcedCommitment=${hit.forcedCommitmentPrefix ?? "n/a"}`,
    `firstNonWalkStep=${hit.firstNonWalkStep} firstNonWalkEvents=${hit.firstNonWalkEvents.join(" ")}`,
    "",
    "```text",
    hit.layout,
    "```",
    "",
    `inputs=${hit.inputs.join(" ")}`,
    `events=${hit.events.join(" ")}`,
    "",
  ]),
].join("\n");

const out = path.join(prototypePath, "reports", "search_l11_start_variants.md");
await writeFile(out, `${report.trimEnd()}\n`, "utf8");
console.log(report);
console.log(`Wrote ${out}`);

function toLevel(id: string, layout: string): LevelDoc {
  return {
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
}

function replay(initial: unknown, inputs: InputId[]): Array<{ input: InputId; events: string[] }> {
  let state = initial;
  const steps: Array<{ input: InputId; events: string[] }> = [];
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) break;
    steps.push({ input, events: result.events });
    state = result.state;
  }
  return steps;
}

function hasAll(events: string[], patterns: string[]): boolean {
  return patterns.every((pattern) => events.some((event) => eventMatchesPattern(event, pattern)));
}
