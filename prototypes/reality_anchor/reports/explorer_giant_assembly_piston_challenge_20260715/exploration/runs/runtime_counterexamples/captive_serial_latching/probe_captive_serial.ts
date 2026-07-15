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
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/runtime_counterexamples/captive_serial_latching",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const assemblyInputs = [
  "right", "right", "up",
  "right", "right", "right", "right", "right", "right", "right", "right", "right",
  "down", "left", "left", "left",
] as InputId[];
const integratedInputs = [
  "right", "right", "up", "right", "down", "right", "left", "left",
  "down", "down", "down", "right",
  "down", "down", "down", "down", "down", "left",
  "up", "up", "up", "up", "up", "up", "down",
] as InputId[];
const scenarios = [
  { id: "captive_full_closed", inputs: ["up", "up", "down"] as InputId[], graph: true },
  {
    id: "captive_partial_left_equal_reach",
    inputs: ["up", "up", "down"] as InputId[],
    graph: true,
  },
  {
    id: "captive_full_open_side_exit",
    inputs: ["up", "up", "right"] as InputId[],
    graph: true,
  },
  { id: "mask_assembly_open", inputs: assemblyInputs, graph: false },
  {
    id: "integrated_kit_assembly_and_socket",
    inputs: integratedInputs,
    graph: false,
  },
];

const results = [];
for (const scenario of scenarios) {
  const layout = (await readFile(path.join(root, "layouts", `${scenario.id}.txt`), "utf8")).trimEnd();
  const level: LevelDoc = { id: scenario.id, title: scenario.id, layout };
  const initial = parseLevel(level);
  let state = initial;
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

  const afterCover = replay(initial, ["up", "up"]);
  results.push({
    id: scenario.id,
    layout,
    inputs: scenario.inputs,
    steps,
    graph: scenario.graph ? exploreGraph(initial, 100_000) : null,
    postCoverActions: scenario.id.startsWith("captive_full")
      ? auditActions(afterCover)
      : null,
    assembledMask: scenario.id === "mask_assembly_open"
      ? verifyAssembledMask(state)
      : null,
  });
}

await writeFile(path.join(root, "audit.json"), `${JSON.stringify({ scenarios: results }, null, 2)}\n`, "utf8");
await writeFile(path.join(root, "audit.md"), renderAudit(results), "utf8");

function replay(initial: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = initial;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
  }
  return state;
}

function auditActions(state: RealityAnchorState) {
  return (["up", "down", "left", "right"] as InputId[]).map((input) => {
    const result = step(pkg.mechanic, state, input);
    return {
      input,
      player: state.player,
      mode: forceModeAt(state, state.player),
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      winAfter: isWin(result.legal ? result.state : state),
    };
  });
}

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
  const stickyMoveDirections = new Set<string>();
  const forceOrigins = new Set<string>();
  while (cursor < queue.length && seen.size < maxStates) {
    const current = queue[cursor++]!;
    if (isWin(current)) continue;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      transitions += 1;
      if (result.events.includes("move_sticky_rigid")) {
        stickyMoveDirections.add(input);
        forceOrigins.add(
          `${current.player.x},${current.player.y}:${forceModeAt(current, current.player)}:${input}`,
        );
      }
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
    stickyMoveDirections: [...stickyMoveDirections].sort(),
    forceOrigins: [...forceOrigins].sort(),
  };
}

function verifyAssembledMask(state: RealityAnchorState) {
  const expected = new Set([
    "6,5", "7,5", "8,5", "9,5", "10,5",
    "8,6", "8,7", "8,8",
  ]);
  const group = state.stickyGroups.find((candidate) =>
    candidate.length === expected.size && candidate.every((cell) => expected.has(pointKey(cell)))
  );
  return {
    ok: Boolean(group),
    expectedCells: [...expected],
    finalGroups: state.stickyGroups.map((candidate) => candidate.map(pointKey)),
  };
}

function renderAudit(results: Array<Record<string, any>>): string {
  const lines = [
    "# Captive serial latching runtime audit",
    "",
    "> 零基坐标；终止图不从 winning state 继续扩展。",
    "",
  ];
  for (const result of results) {
    lines.push(`## ${result.id}`, "", `- Inputs: \`${result.inputs.join(",")}\``);
    if (result.graph) {
      lines.push(
        `- Graph: \`${result.graph.status}\`, states=${result.graph.states}, transitions=${result.graph.transitions}, wins=${result.graph.wins}`,
        `- Sticky move directions: \`${result.graph.stickyMoveDirections.join(",") || "none"}\``,
        `- Force origins: \`${result.graph.forceOrigins.join("; ") || "none"}\``,
      );
    }
    if (result.assembledMask) lines.push(`- Assembled mask verified: \`${result.assembledMask.ok}\``);
    lines.push("", "```text", result.layout, "```", "");
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
    if (result.postCoverActions) {
      lines.push("### Post-cover action audit", "");
      for (const action of result.postCoverActions) {
        lines.push(
          `- \`${action.input}\`: legal=${action.legal}${action.reason ? ` (${action.reason})` : ""}; events=${action.events.join(",") || "none"}; winAfter=${action.winAfter}`,
        );
      }
      lines.push("");
    }
  }
  return `${lines.join("\n")}\n`;
}
