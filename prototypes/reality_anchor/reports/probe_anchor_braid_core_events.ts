import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_ANCHOR_BRAID_CORE_EVENTS";
const maxStates = Number(process.argv[4] ?? 100_000);
if (!layoutPath) throw new Error("Usage: probe_anchor_braid_core_events.ts <layout-file> <id> [maxStates]");

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

const positions = {
  plLower: (state: RealityAnchorState) => anchorsAt(state, [2, 4, 3, 4], [4, 2, 4, 3]),
  bsLeft: (state: RealityAnchorState) => anchorsAt(state, [2, 4, 3, 4], [3, 2, 3, 3]),
  mixedUp: (state: RealityAnchorState) => anchorsAt(state, [2, 3, 3, 3], [3, 1, 3, 2]),
  plUp: (state: RealityAnchorState) => anchorsAt(state, [2, 2, 3, 2], [4, 1, 4, 2]),
  final: (state: RealityAnchorState) => anchorsAt(state, [1, 2, 2, 2], [3, 1, 3, 2]),
};

const has = (events: string[], pattern: string): boolean =>
  events.some((event) => eventMatchesPattern(event, pattern));
const hasAll = (events: string[], patterns: string[]): boolean => patterns.every((pattern) => has(events, pattern));

const firstBsShiftTransition = (
  before: RealityAnchorState,
  action: InputId,
  after: RealityAnchorState,
  events: string[],
): boolean => positions.plLower(before) && action === "left" && positions.bsLeft(after) && hasAll(events, [
  "pull_object:box_sticky_anchor",
  "anchor_boundary_shift:box_sticky",
]);

const middleMixedTransition = (
  before: RealityAnchorState,
  action: InputId,
  after: RealityAnchorState,
  events: string[],
): boolean => positions.bsLeft(before) && action === "up" && positions.mixedUp(after) && hasAll(events, [
  "push_object:push_pull_anchor",
  "force_chain:n2",
  "anchor_boundary_shift:push_pull",
  "anchor_boundary_shift:box_sticky",
]);

const finalMixedTransition = (
  before: RealityAnchorState,
  action: InputId,
  after: RealityAnchorState,
  events: string[],
): boolean => positions.plUp(before) && action === "left" && positions.final(after) && hasAll(events, [
  "pull_object:box_sticky_anchor",
  "force_chain:n2",
  "anchor_boundary_shift:push_pull",
  "anchor_boundary_shift:box_sticky",
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
    first_box_sticky_shift: "plLower --left pull B/S--> bsLeft",
    middle_mixed_transition: "bsLeft --up push P/L + n2 + both shifts--> mixedUp",
    final_mixed_transition: "plUp --left pull B/S + n2 + both shifts--> final winning endpoint relay",
  },
  result,
};

const outBase = path.join("prototypes/reality_anchor/reports", `anchor_braid_core_event_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findViolation(): ProbeResult {
  const queue: Array<{
    state: RealityAnchorState;
    forceChainCount: number;
    boxStickyShiftSeen: boolean;
    firstBoxStickyShiftViolation: boolean;
    middleMixedSeen: boolean;
    finalMixedSeen: boolean;
    inputs: InputId[];
    events: string[];
  }> = [{
    state: initial,
    forceChainCount: 0,
    boxStickyShiftSeen: false,
    firstBoxStickyShiftViolation: false,
    middleMixedSeen: false,
    finalMixedSeen: false,
    inputs: [],
    events: [],
  }];
  const visited = new Set<string>([`${runtime.key(initial)}|0|0|0|0|0`]);
  let cursor = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return { found: false, status: "exhausted", exploredStates: visited.size, reason: `state budget exceeded (${maxStates})` };
    }
    const current = queue[cursor++]!;
    if (runtime.isWin(current.state, pkg.mechanic.win)) {
      const failedGates: string[] = [];
      if (current.forceChainCount < 2) failedGates.push("force_chain_n2_count_at_least_2");
      if (current.firstBoxStickyShiftViolation) failedGates.push("first_box_sticky_shift");
      if (!current.middleMixedSeen) failedGates.push("middle_mixed_transition");
      if (!current.finalMixedSeen) failedGates.push("final_mixed_transition");
      if (failedGates.length > 0) {
        return {
          found: true,
          status: "found",
          exploredStates: visited.size,
          reason: "winning path violated one or more central event gates",
          failedGates,
          inputs: current.inputs,
          events: current.events,
        };
      }
      continue;
    }

    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const step = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!step.legal) continue;
      const state = step.state as RealityAnchorState;
      const countIncrement = step.events.filter((event) => eventMatchesPattern(event, "force_chain:n2")).length;
      const forceChainCount = Math.min(2, current.forceChainCount + countIncrement);
      const bsShiftNow = has(step.events, "anchor_boundary_shift:box_sticky");
      const firstMatches = firstBsShiftTransition(current.state, action, state, step.events);
      const firstBoxStickyShiftViolation = current.firstBoxStickyShiftViolation ||
        (!current.boxStickyShiftSeen && bsShiftNow && !firstMatches);
      const boxStickyShiftSeen = current.boxStickyShiftSeen || bsShiftNow;
      const middleMixedSeen = current.middleMixedSeen || middleMixedTransition(current.state, action, state, step.events);
      const finalMixedSeen = current.finalMixedSeen || finalMixedTransition(current.state, action, state, step.events);
      const key = [
        runtime.key(state), forceChainCount, boxStickyShiftSeen ? 1 : 0,
        firstBoxStickyShiftViolation ? 1 : 0, middleMixedSeen ? 1 : 0, finalMixedSeen ? 1 : 0,
      ].join("|");
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state,
        forceChainCount,
        boxStickyShiftSeen,
        firstBoxStickyShiftViolation,
        middleMixedSeen,
        finalMixedSeen,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
      });
    }
  }

  return {
    found: false,
    status: "complete",
    exploredStates: visited.size,
    reason: "no winning path violated the n2 count, first B/S shift, middle mixed, or final mixed gates",
  };
}

function formatMarkdown(): string {
  const lines = [
    `# Anchor Braid Central Event Probe: ${id}`,
    "",
    `- Budget: maxStates=${maxStates}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Central Gates",
    "",
    `- force_chain:n2 count >= ${report.gates.force_chain_n2_count_at_least}`,
    `- first B/S shift: ${report.gates.first_box_sticky_shift}`,
    `- middle mixed transition: ${report.gates.middle_mixed_transition}`,
    `- final mixed transition: ${report.gates.final_mixed_transition}`,
    "",
    "## Winning Violation Probe",
    "",
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
