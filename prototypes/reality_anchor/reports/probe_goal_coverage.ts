import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { VisualTile } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_GOAL_COVERAGE";
const inputs = process.argv.slice(4) as InputId[];

if (!layoutPath || inputs.length === 0) {
  throw new Error("Usage: probe_goal_coverage.ts <layout-file> <id> <input...>");
}

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
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
const snapshots = [
  {
    step: 0,
    input: "initial",
    legal: true,
    events: [] as string[],
    render: adapter.renderState(state),
    goals: goalCoverage(state),
    isWin: adapter.isWin(state, pkg.mechanic.win),
  },
];

for (const [index, input] of inputs.entries()) {
  const result = adapter.step(pkg.mechanic, state, input, { winCondition: pkg.mechanic.win });
  if (result.legal) {
    state = result.state;
  }
  snapshots.push({
    step: index + 1,
    input,
    legal: result.legal,
    events: result.events,
    render: adapter.renderState(state),
    goals: goalCoverage(state),
    isWin: adapter.isWin(state, pkg.mechanic.win),
  });
}

const report = {
  id,
  layout: adapter.renderState(adapter.parseLevel(level)),
  inputs,
  snapshots,
};

const outBase = path.join(prototypePath, "reports", `goal_coverage_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function goalCoverage(currentState: unknown) {
  const visual = adapter.renderVisualState?.(currentState, pkg.mechanic);
  if (!visual) {
    throw new Error("Reality Anchor adapter did not provide visual state.");
  }
  return visual.tiles
    .filter((tile: VisualTile) => tile.target)
    .map((tile: VisualTile) => {
      const objects = tile.objects ?? [];
      const actors = tile.actors ?? [];
      return {
        point: [tile.x, tile.y],
        coveredByObject: objects.length > 0,
        objectLabels: objects.map((object) => object.label ?? object.visualKey),
        actorLabels: actors.map((actor) => actor.label ?? actor.visualKey),
      };
    });
}

function formatMarkdown(input: typeof report): string {
  const lines = [
    `# Goal Coverage Probe: ${input.id}`,
    "",
    `- Inputs: ${input.inputs.join(" ")}`,
    "",
    "## Initial Layout",
    "",
    "```text",
    input.layout,
    "```",
    "",
  ];
  for (const snapshot of input.snapshots) {
    lines.push(`## Step ${snapshot.step}: ${snapshot.input}`);
    lines.push("");
    lines.push(`- Legal: ${snapshot.legal}`);
    lines.push(`- Events: ${snapshot.events.join(", ") || "none"}`);
    lines.push(`- Win: ${snapshot.isWin}`);
    lines.push("- Goals:");
    for (const goal of snapshot.goals) {
      lines.push(
        `  - [${goal.point.join(", ")}]: coveredByObject=${goal.coveredByObject}; objects=${goal.objectLabels.join(", ") || "none"}; actors=${goal.actorLabels.join(", ") || "none"}`,
      );
    }
    lines.push("");
    lines.push("```text");
    lines.push(snapshot.render);
    lines.push("```");
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
