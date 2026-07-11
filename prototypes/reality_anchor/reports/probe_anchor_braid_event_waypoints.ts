import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc, Point, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import type { RealityAnchorState } from "../../../src/prototypes/reality_anchor/mechanics.js";

const layoutPath = process.argv[2];
const id = process.argv[3] ?? "RA_ANCHOR_BRAID_EVENT_WAYPOINTS";
const maxStates = Number(process.argv[4] ?? 100_000);
if (!layoutPath) {
  throw new Error("Usage: probe_anchor_braid_event_waypoints.ts <layout-file> <id> [maxStates]");
}

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
  initial: (state: RealityAnchorState) => anchorsAt(state, [2, 3, 3, 3], [4, 2, 4, 3]),
  plLower: (state: RealityAnchorState) => anchorsAt(state, [2, 4, 3, 4], [4, 2, 4, 3]),
  bsLeft: (state: RealityAnchorState) => anchorsAt(state, [2, 4, 3, 4], [3, 2, 3, 3]),
  mixedUp: (state: RealityAnchorState) => anchorsAt(state, [2, 3, 3, 3], [3, 1, 3, 2]),
  bsRight: (state: RealityAnchorState) => anchorsAt(state, [2, 3, 3, 3], [4, 1, 4, 2]),
  plUp: (state: RealityAnchorState) => anchorsAt(state, [2, 2, 3, 2], [4, 1, 4, 2]),
  final: (state: RealityAnchorState) => anchorsAt(state, [1, 2, 2, 2], [3, 1, 3, 2]),
};

type TransitionSpec = {
  id: string;
  description: string;
  from: (state: RealityAnchorState) => boolean;
  to: (state: RealityAnchorState) => boolean;
  action: InputId;
  requiredEvents: string[];
};

const transitions: TransitionSpec[] = [
  {
    id: "pl_down_stage",
    description: "P/L 由初位 down-push 到 lower stage。",
    from: positions.initial,
    to: positions.plLower,
    action: "down",
    requiredEvents: ["push_object:push_pull_anchor", "anchor_boundary_shift:push_pull"],
  },
  {
    id: "bs_first_left_extract",
    description: "B/S 的首次 shift 是从 lower stage 经 old-L handle 向左 pull。",
    from: positions.plLower,
    to: positions.bsLeft,
    action: "left",
    requiredEvents: ["pull_object:box_sticky_anchor", "anchor_boundary_shift:box_sticky"],
  },
  {
    id: "mixed_up_temp_dock",
    description: "P/L up-push 与 B/S 组成 n2；同链上移后，B/S 的 S 端临时覆盖上目标。",
    from: positions.bsLeft,
    to: positions.mixedUp,
    action: "up",
    requiredEvents: [
      "push_object:push_pull_anchor",
      "force_chain:n2",
      "anchor_boundary_shift:push_pull",
      "anchor_boundary_shift:box_sticky",
    ],
  },
  {
    id: "bs_right_vacate",
    description: "B/S right-push 撤销上目标覆盖并腾出 P/L pull 把手。",
    from: positions.mixedUp,
    to: positions.bsRight,
    action: "right",
    requiredEvents: ["push_object:box_sticky_anchor", "anchor_boundary_shift:box_sticky"],
  },
  {
    id: "pl_up_prefinal",
    description: "P/L up-pull 到预终态，P 端先覆盖下目标。",
    from: positions.bsRight,
    to: positions.plUp,
    action: "up",
    requiredEvents: ["pull_object:push_pull_anchor", "anchor_boundary_shift:push_pull"],
  },
  {
    id: "mixed_left_final",
    description: "B/S left-pull 触发第二次 n2；两锚同链左移，恢复上目标并把下目标覆盖从 P 端交给 L 端。",
    from: positions.plUp,
    to: positions.final,
    action: "left",
    requiredEvents: [
      "pull_object:box_sticky_anchor",
      "force_chain:n2",
      "anchor_boundary_shift:push_pull",
      "anchor_boundary_shift:box_sticky",
    ],
  },
];

const matchesTransition = (
  spec: TransitionSpec,
  before: RealityAnchorState,
  action: InputId,
  after: RealityAnchorState,
  events: string[],
): boolean => spec.from(before) && action === spec.action && spec.to(after) &&
  spec.requiredEvents.every((pattern) => events.some((event) => eventMatchesPattern(event, pattern)));

type ProbeResult = {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason: string;
  failedGates?: string[];
  transitionProgress?: number;
  forceChainCount?: number;
  inputs?: InputId[];
  events?: string[];
};

const result = findWinningViolation();
const report = {
  id,
  layout: adapter.renderState(initial),
  budget: { maxStates },
  requiredForceChainCount: 2,
  transitions: transitions.map(({ id: transitionId, description, action, requiredEvents }) => ({
    id: transitionId,
    description,
    action,
    requiredEvents,
  })),
  firstBoxStickyShiftGate: "must match bs_first_left_extract",
  result,
};

const outBase = path.join("prototypes/reality_anchor/reports", `anchor_braid_event_waypoint_probe_${id}`);
await mkdir(path.dirname(outBase), { recursive: true });
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(), "utf8");
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function findWinningViolation(): ProbeResult {
  const queue: Array<{
    state: RealityAnchorState;
    transitionProgress: number;
    forceChainCount: number;
    boxStickyShiftSeen: boolean;
    firstBoxStickyShiftViolation: boolean;
    inputs: InputId[];
    events: string[];
  }> = [{
    state: initial,
    transitionProgress: 0,
    forceChainCount: 0,
    boxStickyShiftSeen: false,
    firstBoxStickyShiftViolation: false,
    inputs: [],
    events: [],
  }];
  const visited = new Set<string>([`${runtime.key(initial)}|0|0|0|0`]);
  let cursor = 0;

  while (cursor < queue.length) {
    if (visited.size > maxStates) {
      return {
        found: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${maxStates})`,
      };
    }
    const current = queue[cursor++]!;
    if (runtime.isWin(current.state, pkg.mechanic.win)) {
      const failedGates: string[] = [];
      if (current.transitionProgress < transitions.length) failedGates.push("ordered_event_transitions");
      if (current.forceChainCount < 2) failedGates.push("force_chain_n2_count_at_least_2");
      if (current.firstBoxStickyShiftViolation) failedGates.push("first_box_sticky_shift_is_left_extract");
      if (failedGates.length > 0) {
        return {
          found: true,
          status: "found",
          exploredStates: visited.size,
          reason: "winning path violated one or more event-aware braid gates",
          failedGates,
          transitionProgress: current.transitionProgress,
          forceChainCount: current.forceChainCount,
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
      let transitionProgress = current.transitionProgress;
      const nextSpec = transitions[transitionProgress];
      if (nextSpec && matchesTransition(nextSpec, current.state, action, state, step.events)) {
        transitionProgress += 1;
      }
      const forceChainIncrement = step.events.filter((event) => eventMatchesPattern(event, "force_chain:n2")).length;
      const forceChainCount = Math.min(2, current.forceChainCount + forceChainIncrement);
      const boxStickyShiftNow = step.events.some((event) => eventMatchesPattern(event, "anchor_boundary_shift:box_sticky"));
      const firstShiftMatches = matchesTransition(transitions[1]!, current.state, action, state, step.events);
      const firstBoxStickyShiftViolation = current.firstBoxStickyShiftViolation ||
        (!current.boxStickyShiftSeen && boxStickyShiftNow && !firstShiftMatches);
      const boxStickyShiftSeen = current.boxStickyShiftSeen || boxStickyShiftNow;
      const key = [
        runtime.key(state),
        transitionProgress,
        forceChainCount,
        boxStickyShiftSeen ? 1 : 0,
        firstBoxStickyShiftViolation ? 1 : 0,
      ].join("|");
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state,
        transitionProgress,
        forceChainCount,
        boxStickyShiftSeen,
        firstBoxStickyShiftViolation,
        inputs: [...current.inputs, action],
        events: [...current.events, ...step.events],
      });
    }
  }

  return {
    found: false,
    status: "complete",
    exploredStates: visited.size,
    reason: "no winning path violated the ordered event transitions, first B/S shift gate, or n2 count gate",
  };
}

function formatMarkdown(): string {
  const lines = [
    `# Anchor Braid Event-Aware Waypoint Probe: ${id}`,
    "",
    `- Budget: maxStates=${maxStates}`,
    `- Required force_chain:n2 count: >= ${report.requiredForceChainCount}`,
    `- First B/S shift gate: ${report.firstBoxStickyShiftGate}`,
    "",
    "## Layout",
    "",
    "```text",
    report.layout,
    "```",
    "",
    "## Ordered Event Transitions",
    "",
    ...report.transitions.flatMap((transition, index) => [
      `${index + 1}. \`${transition.id}\`：${transition.description}`,
      `   - action: ${transition.action}`,
      `   - required events: ${transition.requiredEvents.join(", ")}`,
      "",
    ]),
    "## Winning Violation Probe",
    "",
    `- Found violating win: ${result.found}`,
    `- Status: ${result.status}`,
    `- Explored product states: ${result.exploredStates}`,
    `- Reason: ${result.reason}`,
    ...(result.failedGates ? [`- Failed gates: ${result.failedGates.join(", ")}`] : []),
    ...(result.transitionProgress !== undefined ? [`- Transition progress: ${result.transitionProgress}/${transitions.length}`] : []),
    ...(result.forceChainCount !== undefined ? [`- force_chain:n2 count: ${result.forceChainCount}`] : []),
    ...(result.inputs ? [`- Inputs: ${result.inputs.join(" ")}`] : []),
    ...(result.events ? [`- Events: ${result.events.join(" ") || "none"}`] : []),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}
