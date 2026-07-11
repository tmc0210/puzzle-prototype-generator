import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_ANCHOR_BRAID_MIXED_GATES";
const maxStates = Number(process.argv[4] ?? 100_000);
if (!layoutPath) throw new Error("Usage: probe_anchor_braid_mixed_gates.ts <layout-file> <id> [maxStates]");

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
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
const initial = adapter.parseLevel(level) as RealityAnchorState;

const point = (value: Point | undefined, x: number, y: number): boolean => value?.x === x && value.y === y;
const anchorsAt = (
  state: RealityAnchorState,
  pl: [number, number, number, number],
  bs: [number, number, number, number],
): boolean => Boolean(
  state.pushPullAnchor && state.boxStickyAnchor &&
  point(state.pushPullAnchor.push, pl[0], pl[1]) && point(state.pushPullAnchor.pull, pl[2], pl[3]) &&
  point(state.boxStickyAnchor.sticky, bs[0], bs[1]) && point(state.boxStickyAnchor.box, bs[2], bs[3])
);

const bsLeft = (state: RealityAnchorState) => anchorsAt(state, [2, 4, 3, 4], [3, 2, 3, 3]);
const mixedUp = (state: RealityAnchorState) => anchorsAt(state, [2, 3, 3, 3], [3, 1, 3, 2]);
const plUp = (state: RealityAnchorState) => anchorsAt(state, [2, 2, 3, 2], [4, 1, 4, 2]);
const final = (state: RealityAnchorState) => anchorsAt(state, [1, 2, 2, 2], [3, 1, 3, 2]);
const has = (events: string[], pattern: string): boolean => events.some((event) => eventMatchesPattern(event, pattern));
const hasAll = (events: string[], patterns: string[]): boolean => patterns.every((pattern) => has(events, pattern));

const middleMixed = (before: RealityAnchorState, action: InputId, after: RealityAnchorState, events: string[]): boolean =>
  bsLeft(before) && action === "up" && mixedUp(after) && hasAll(events, [
    "push_object:push_pull_anchor", "force_chain:n2",
    "anchor_boundary_shift:push_pull", "anchor_boundary_shift:box_sticky",
  ]);
const finalMixed = (before: RealityAnchorState, action: InputId, after: RealityAnchorState, events: string[]): boolean =>
  plUp(before) && action === "left" && final(after) && hasAll(events, [
    "pull_object:box_sticky_anchor", "force_chain:n2",
    "anchor_boundary_shift:push_pull", "anchor_boundary_shift:box_sticky",
  ]);

type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason: string;
  failedGates?: string[];
  inputs?: InputId[];
  events?: string[];
};

const result = findViolation();
const report = {
  id,
  layout: adapter.renderState(initial),
  budget: { maxStates },
  gates: {
    force_chain_n2_count_at_least: 2,
    middle_mixed_transition: "bsLeft --up push P/L+n2+both shifts--> mixedUp temporary dock",
    final_mixed_transition: "plUp --left pull B/S+n2+both shifts--> final winning endpoint relay",
  },
  result,
};
const outBase = path.join("prototypes/reality_anchor/reports", `anchor_braid_mixed_gate_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findViolation(): ProbeResult {
  const queue: Array<{
    state: RealityAnchorState;
    count: number;
    middleSeen: boolean;
    finalSeen: boolean;
    inputs: InputId[];
    events: string[];
  }> = [{ state: initial, count: 0, middleSeen: false, finalSeen: false, inputs: [], events: [] }];
  const visited = new Set<string>([`${runtime.key(initial)}|0|0|0`]);
  let cursor = 0;
  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { found: false, status: "exhausted", exploredStates: visited.size, reason: `state budget exceeded (${maxStates})` };
    }
    const current = queue[cursor++]!;
    if (runtime.isWin(current.state, pkg.mechanic.win)) {
      const failedGates: string[] = [];
      if (current.count < 2) failedGates.push("force_chain_n2_count_at_least_2");
      if (!current.middleSeen) failedGates.push("middle_mixed_transition");
      if (!current.finalSeen) failedGates.push("final_mixed_transition");
      if (failedGates.length > 0) {
        return {
          found: true, status: "found", exploredStates: visited.size,
          reason: "winning path violated one or more mixed-chain gates",
          failedGates, inputs: current.inputs, events: current.events,
        };
      }
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const state = step.state as RealityAnchorState;
      const increment = step.events.filter((event) => eventMatchesPattern(event, "force_chain:n2")).length;
      const count = Math.min(2, current.count + increment);
      const middleSeen = current.middleSeen || middleMixed(current.state, action, state, step.events);
      const finalSeen = current.finalSeen || finalMixed(current.state, action, state, step.events);
      const key = `${runtime.key(state)}|${count}|${middleSeen ? 1 : 0}|${finalSeen ? 1 : 0}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state, count, middleSeen, finalSeen,
        inputs: [...current.inputs, action], events: [...current.events, ...step.events],
      });
    }
  }
  return {
    found: false,
    status: "complete",
    exploredStates: visited.size,
    reason: "no winning path skipped either mixed transition or used fewer than two force_chain:n2 events",
  };
}

function formatMarkdown(): string {
  const lines = [
    `# Anchor Braid Mixed-Chain Gate Probe: ${id}`,
    "",
    `- Budget: maxStates=${maxStates}`,
    "",
    "## Layout",
    "",
    "```text", report.layout, "```", "",
    "## Gates", "",
    `- force_chain:n2 count >= ${report.gates.force_chain_n2_count_at_least}`,
    `- middle: ${report.gates.middle_mixed_transition}`,
    `- final: ${report.gates.final_mixed_transition}`,
    "", "## Winning Violation Probe", "",
    `- Found violating win: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored product states: ${result.exploredStates}`,
    `- Reason: ${result.reason}`,
    ...(result.failedGates ? [`- Failed gates: ${result.failedGates.join(", ")}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
