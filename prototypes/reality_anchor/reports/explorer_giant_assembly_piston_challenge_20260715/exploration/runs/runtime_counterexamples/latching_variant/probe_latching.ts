import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/runtime_counterexamples/latching_variant",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const scenarios = [
  { id: "latch_correct_full", inputs: ["up", "up", "down"] as InputId[] },
  {
    id: "latch_wrong_single_contact",
    inputs: ["up", "up", "down", "up", "down"] as InputId[],
  },
  { id: "latch_subset_ab", inputs: ["up", "up", "down"] as InputId[] },
];

const output = [];
for (const scenario of scenarios) {
  const layout = (await readFile(path.join(root, "layouts", `${scenario.id}.txt`), "utf8")).trimEnd();
  const level: LevelDoc = { id: scenario.id, title: scenario.id, layout };
  let state = parseLevel(level);
  const steps = [];
  for (const input of scenario.inputs) {
    const before = state;
    const result = step(pkg.mechanic, before, input);
    const after = result.legal ? result.state : before;
    steps.push({
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      playerBefore: before.player,
      playerAfter: after.player,
      modeBefore: forceModeAt(before, before.player),
      modeAfter: forceModeAt(after, after.player),
      coveredBefore: coveredGoals(before),
      coveredAfter: coveredGoals(after),
      winAfter: isWin(after),
      stateAfter: renderState(after),
    });
    state = after;
  }
  output.push({
    id: scenario.id,
    layout,
    inputs: scenario.inputs,
    steps,
    graph: exploreGraph(parseLevel(level), 100_000),
  });
}

await writeFile(path.join(root, "audit.json"), `${JSON.stringify({ scenarios: output }, null, 2)}\n`, "utf8");
await writeFile(path.join(root, "audit.md"), renderAudit(output), "utf8");

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function exploreGraph(initial: RealityAnchorState, maxStates: number) {
  const seen = new Map([[stateKey(initial), initial]]);
  const queue = [initial];
  let cursor = 0;
  let transitions = 0;
  let wins = isWin(initial) ? 1 : 0;
  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      seen.set(key, result.state);
      queue.push(result.state);
      if (isWin(result.state)) wins += 1;
    }
  }
  return {
    status: cursor === queue.length ? "complete" : "exhausted",
    states: seen.size,
    transitions,
    wins,
  };
}

function renderAudit(results: Array<Record<string, any>>): string {
  const lines = [
    "# Latching variant runtime audit",
    "",
    "> 零基坐标；mode 记录在每手输入前后。",
    "",
  ];
  for (const result of results) {
    lines.push(
      `## ${result.id}`,
      "",
      `- Inputs: \`${result.inputs.join(",")}\``,
      `- Graph: \`${result.graph.status}\`, states=${result.graph.states}, transitions=${result.graph.transitions}, wins=${result.graph.wins}`,
      "",
      "```text",
      result.layout,
      "```",
      "",
    );
    for (const [index, item] of result.steps.entries()) {
      lines.push(
        `### Step ${index + 1}: ${item.input}`,
        "",
        `- legal=${item.legal}${item.reason ? `, reason=${item.reason}` : ""}`,
        `- player: \`${item.playerBefore.x},${item.playerBefore.y}\` (${item.modeBefore}) -> \`${item.playerAfter.x},${item.playerAfter.y}\` (${item.modeAfter})`,
        `- events: ${item.events.length ? item.events.map((event: string) => `\`${event}\``).join(", ") : "none"}`,
        `- covered: \`${item.coveredBefore.join(";") || "none"}\` -> \`${item.coveredAfter.join(";") || "none"}\``,
        `- win=${item.winAfter}`,
        "",
        "```text",
        item.stateAfter,
        "```",
        "",
      );
    }
  }
  return `${lines.join("\n")}\n`;
}
