import { readFile, writeFile } from "node:fs/promises";
import { stringify } from "yaml";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { eventMatchesPattern, eventType } from "../../../src/core/events.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import { realityAnchorAdapter } from "../../../src/prototypes/reality_anchor/runtime.js";
import {
  pointKey,
  renderState,
  stateKey,
  type RealityAnchorState,
} from "../../../src/prototypes/reality_anchor/mechanics.js";
import type { Direction, LevelDoc } from "../../../src/core/types.js";

const prototypeRoot = "prototypes/reality_anchor";
const candidateId = process.argv[2] ?? "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v9";
const usesFinalCrateGoal = candidateId === "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v27";
const usesGateGoalOrder = [
  "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v29",
  "RA_FRESH_2026_07_11_TWIN_LOOM_RESECTION_v31",
].includes(candidateId);
const layoutPath = `${prototypeRoot}/reports/${candidateId}.layout.txt`;
const outputPath = `${prototypeRoot}/reports/${candidateId}_event_gate_report.yml`;
const maxStates = 1_200_000;

const pkg = await loadPrototypePackage(prototypeRoot);
const layout = (await readFile(layoutPath, "utf8")).trimEnd();
const level: LevelDoc = {
  id: candidateId,
  title: candidateId,
  layout,
  win: pkg.mechanic.win,
};
const initial = realityAnchorAdapter.parseLevel(level);
const runtime = realityAnchorAdapter.createRuntime(pkg.mechanic);
const solution = solveWithRuntime(runtime, initial, {
  winCondition: pkg.mechanic.win,
  maxStates,
  maxDepth: 200,
});

type BaseNode = {
  state: RealityAnchorState;
  depth: number;
  predecessor?: string;
  input?: Direction;
  events?: string[];
};

const initialKey = stateKey(initial);
const nodes = new Map<string, BaseNode>([[initialKey, { state: initial, depth: 0 }]]);
const queue = [initialKey];
const winners: string[] = [];
const reachableEventTypes = new Set<string>();
let legalTransitions = 0;

for (let cursor = 0; cursor < queue.length; cursor += 1) {
  if (nodes.size > maxStates) {
    throw new Error(`base graph exceeded ${maxStates} states`);
  }
  const key = queue[cursor]!;
  const node = nodes.get(key)!;
  if (runtime.isWin(node.state, pkg.mechanic.win)) {
    winners.push(key);
    continue;
  }
  for (const input of runtime.actions(node.state, { winCondition: pkg.mechanic.win })) {
    const transition = runtime.step(node.state, input, { winCondition: pkg.mechanic.win });
    for (const event of transition.events) reachableEventTypes.add(eventType(event));
    if (!transition.legal) continue;
    legalTransitions += 1;
    const nextKey = stateKey(transition.state);
    if (nodes.has(nextKey)) continue;
    nodes.set(nextKey, {
      state: transition.state,
      depth: node.depth + 1,
      predecessor: key,
      input,
      events: transition.events,
    });
    queue.push(nextKey);
  }
}

const minWinDepth = Math.min(...winners.map((key) => nodes.get(key)!.depth));
const optimalWinnerKeys = winners.filter((key) => nodes.get(key)!.depth === minWinDepth);

const pathCounts = new Map<string, bigint>([[initialKey, 1n]]);
const signatures = new Map<string, Set<string>>([[initialKey, new Set([""])]]);
for (const key of queue) {
  const node = nodes.get(key)!;
  if (node.depth >= minWinDepth) continue;
  const count = pathCounts.get(key) ?? 0n;
  const sourceSignatures = signatures.get(key) ?? new Set<string>();
  for (const input of runtime.actions(node.state, { winCondition: pkg.mechanic.win })) {
    const transition = runtime.step(node.state, input, { winCondition: pkg.mechanic.win });
    if (!transition.legal) continue;
    const nextKey = stateKey(transition.state);
    const nextNode = nodes.get(nextKey);
    if (!nextNode || nextNode.depth !== node.depth + 1 || nextNode.depth > minWinDepth) continue;
    pathCounts.set(nextKey, (pathCounts.get(nextKey) ?? 0n) + count);
    const eventSignature = transition.events
      .filter((event) => eventType(event) !== "walk")
      .map(normalizeEvent)
      .sort()
      .join("+");
    const target = signatures.get(nextKey) ?? new Set<string>();
    for (const source of sourceSignatures) {
      target.add(eventSignature ? `${source}${source ? " > " : ""}${eventSignature}` : source);
      if (target.size > 512) break;
    }
    signatures.set(nextKey, target);
  }
}

const optimalPathCount = optimalWinnerKeys.reduce(
  (total, key) => total + (pathCounts.get(key) ?? 0n),
  0n,
);
const optimalSignatures = new Set<string>();
for (const key of optimalWinnerKeys) {
  for (const signature of signatures.get(key) ?? []) optimalSignatures.add(signature);
}

const requiredPatterns = [
  "anchor_boundary_shift:box_sticky",
  "box_to_sticky",
  "sticky_merge",
  "sticky_to_box",
  "sticky_split",
  "pull_object",
  "move_sticky_rigid",
];
const requiredEventGates = requiredPatterns.map((pattern) => scanMissingPattern(pattern));
const sequenceGate = scanSequenceObligations();

const finalObjectGroups = new Map<string, {
  count: number;
  minDepth: number;
  example: string;
  exampleInputs: Direction[];
  exampleNonWalkSteps: Array<{ input: Direction; events: string[] }>;
}>();
for (const key of winners) {
  const node = nodes.get(key)!;
  const objectKey = objectConfigurationKey(node.state);
  const current = finalObjectGroups.get(objectKey);
  if (current) {
    current.count += 1;
    current.minDepth = Math.min(current.minDepth, node.depth);
  } else {
    finalObjectGroups.set(objectKey, {
      count: 1,
      minDepth: node.depth,
      example: renderState(node.state),
      ...reconstructTrace(key),
    });
  }
}

const report = {
  candidate_id: candidateId,
  command: `npx tsx ${prototypeRoot}/reports/probe_twin_loom_resection.ts ${candidateId}`,
  budgets: { max_states: maxStates, max_depth: 200 },
  solver: {
    found: solution.found,
    status: solution.searchStatus,
    cost: solution.cost,
    explored_states: solution.exploredStates,
    inputs: solution.inputs,
    events: solution.events,
  },
  complete_graph: {
    status: "complete",
    reachable_states: nodes.size,
    legal_transitions: legalTransitions,
    winning_states: winners.length,
    shortest_win_depth: minWinDepth,
    reachable_event_types: [...reachableEventTypes].sort(),
  },
  solution_uniqueness: {
    result:
      optimalSignatures.size === 1 &&
      finalObjectGroups.size === 1 &&
      winners.length === 1 &&
      sequenceGate.status === "complete" &&
      !sequenceGate.violating_winning_path
        ? "unique_complete"
        : "equivalent_variants_only",
    exact_optimal_input_path_count: optimalPathCount.toString(),
    optimal_winning_state_count: optimalWinnerKeys.length,
    distinct_optimal_non_walk_signatures: optimalSignatures.size,
    optimal_non_walk_signatures: [...optimalSignatures],
    interpretation:
      winners.length === 1
        ? "完整图只含一个胜态和一个 winning object configuration；全部最短输入路径压缩为同一非走位操作序列，且 all-winning-path sequence gate 未发现偏离规定责任的胜路。"
        : "完整图含多个胜态但只有一个 winning object configuration；最短输入压缩为同一非走位签名，其余胜路须按等价调度或可逆绕动解释，不主张输入唯一。",
  },
  all_winning_path_event_gates: requiredEventGates,
  all_winning_path_sequence_gate: sequenceGate,
  winning_object_configuration_groups: [...finalObjectGroups.values()],
};

await writeFile(outputPath, stringify(report), "utf8");
console.log(JSON.stringify(report, null, 2));

function normalizeEvent(event: string): string {
  return event
    .replace(/:(?:crate|sticky)#\d+/g, ":object")
    .replace(/:n\d+/g, ":n");
}

function scanMissingPattern(pattern: string) {
  type Item = { state: RealityAnchorState; seen: boolean; depth: number };
  const items: Item[] = [{ state: initial, seen: false, depth: 0 }];
  const visited = new Set<string>([`${initialKey}|false`]);
  for (let cursor = 0; cursor < items.length; cursor += 1) {
    if (visited.size > maxStates) {
      return { pattern, status: "exhausted", missing_required_winning_path: "unknown", states: visited.size };
    }
    const item = items[cursor]!;
    if (runtime.isWin(item.state, pkg.mechanic.win)) {
      if (!item.seen) {
        return { pattern, status: "complete", missing_required_winning_path: true, states: visited.size };
      }
      continue;
    }
    for (const input of runtime.actions(item.state, { winCondition: pkg.mechanic.win })) {
      const transition = runtime.step(item.state, input, { winCondition: pkg.mechanic.win });
      if (!transition.legal) continue;
      const seen = item.seen || transition.events.some((event) => eventMatchesPattern(event, pattern));
      const key = `${stateKey(transition.state)}|${seen}`;
      if (visited.has(key)) continue;
      visited.add(key);
      items.push({ state: transition.state, seen, depth: item.depth + 1 });
    }
  }
  return { pattern, status: "complete", missing_required_winning_path: false, states: visited.size };
}

function scanSequenceObligations() {
  type Monitor = {
    mergeSweepSeen: boolean;
    cutPullSeen: boolean;
    splitSeen: boolean;
    postSplitArmMoves: 0 | 1 | 2;
    badOrder: boolean;
    upperCoveredBeforeLower: boolean;
    pocketCoveredBeforeBothArms: boolean;
    gateCoveredBeforeUpper: boolean;
    lowerCoveredBeforeGate: boolean;
  };
  type Item = { state: RealityAnchorState; monitor: Monitor; depth: number };
  const initialMonitor: Monitor = {
    mergeSweepSeen: false,
    cutPullSeen: false,
    splitSeen: false,
    postSplitArmMoves: 0,
    badOrder: false,
    upperCoveredBeforeLower: false,
    pocketCoveredBeforeBothArms: false,
    gateCoveredBeforeUpper: false,
    lowerCoveredBeforeGate: false,
  };
  const items: Item[] = [{ state: initial, monitor: initialMonitor, depth: 0 }];
  const visited = new Set<string>([`${initialKey}|${monitorKey(initialMonitor)}`]);
  let violatingWin: Item | undefined;
  for (let cursor = 0; cursor < items.length; cursor += 1) {
    if (visited.size > maxStates) {
      return {
        status: "exhausted",
        violating_winning_path: "unknown",
        states: visited.size,
      };
    }
    const item = items[cursor]!;
    if (runtime.isWin(item.state, pkg.mechanic.win)) {
      if (
        !item.monitor.mergeSweepSeen ||
        !item.monitor.cutPullSeen ||
        item.monitor.postSplitArmMoves < 2 ||
        item.monitor.badOrder ||
        (!usesFinalCrateGoal && !usesGateGoalOrder && item.monitor.upperCoveredBeforeLower) ||
        (usesFinalCrateGoal && item.monitor.pocketCoveredBeforeBothArms) ||
        (usesGateGoalOrder && item.monitor.gateCoveredBeforeUpper)
      ) {
        violatingWin = item;
        break;
      }
      continue;
    }
    for (const input of runtime.actions(item.state, { winCondition: pkg.mechanic.win })) {
      const transition = runtime.step(item.state, input, { winCondition: pkg.mechanic.win });
      if (!transition.legal) continue;
      const has = (pattern: string) => transition.events.some((event) => eventMatchesPattern(event, pattern));
      const mergeSweep =
        has("anchor_boundary_shift:box_sticky") &&
        has("box_to_sticky") &&
        has("sticky_merge");
      const cutThisStep = has("sticky_split");
      const cutPull =
        cutThisStep && has("sticky_to_box") && has("move_sticky_rigid") && has("pull_object");
      const postSplitMove = item.monitor.splitSeen && has("move_sticky_rigid");
      const monitor: Monitor = {
        mergeSweepSeen: item.monitor.mergeSweepSeen || mergeSweep,
        cutPullSeen: item.monitor.cutPullSeen || cutPull,
        splitSeen: item.monitor.splitSeen || cutThisStep,
        postSplitArmMoves: Math.min(2, item.monitor.postSplitArmMoves + (postSplitMove ? 1 : 0)) as 0 | 1 | 2,
        badOrder: item.monitor.badOrder || (cutThisStep && !item.monitor.mergeSweepSeen),
        upperCoveredBeforeLower:
          item.monitor.upperCoveredBeforeLower ||
          (goalCovered(transition.state, 4, 2) && !goalCovered(transition.state, 4, 6)),
        pocketCoveredBeforeBothArms:
          item.monitor.pocketCoveredBeforeBothArms ||
          (goalCovered(transition.state, 8, 5) &&
            !(goalCovered(transition.state, 4, 2) && goalCovered(transition.state, 4, 6))),
        gateCoveredBeforeUpper:
          item.monitor.gateCoveredBeforeUpper ||
          (goalCovered(transition.state, 7, 5) && !goalCovered(transition.state, 4, 2)),
        lowerCoveredBeforeGate:
          item.monitor.lowerCoveredBeforeGate ||
          (goalCovered(transition.state, 4, 6) && !goalCovered(transition.state, 7, 5)),
      };
      const key = `${stateKey(transition.state)}|${monitorKey(monitor)}`;
      if (visited.has(key)) continue;
      visited.add(key);
      items.push({ state: transition.state, monitor, depth: item.depth + 1 });
    }
  }
  return {
    status: "complete",
    violating_winning_path: Boolean(violatingWin),
    states: visited.size,
    obligations: [
      "同一步 B/S 位移 + box_to_sticky + sticky_merge",
      "其后同一步 pull + sticky rigid move + sticky_to_box + sticky_split",
      "切割步之后至少两次独立 sticky rigid move",
      usesGateGoalOrder
        ? "任一胜路中门箱目标不得早于上黏臂目标；下黏臂可在门箱前后完成"
        : usesFinalCrateGoal
          ? "任一胜路中不得在两条黏臂目标都完成前覆盖右侧切出箱目标"
          : "任一胜路中不得在下目标尚未覆盖时先覆盖上目标",
    ],
  };
}

function monitorKey(monitor: {
  mergeSweepSeen: boolean;
  cutPullSeen: boolean;
  splitSeen: boolean;
  postSplitArmMoves: number;
  badOrder: boolean;
  upperCoveredBeforeLower: boolean;
  pocketCoveredBeforeBothArms: boolean;
  gateCoveredBeforeUpper: boolean;
  lowerCoveredBeforeGate: boolean;
}) {
  return [
    Number(monitor.mergeSweepSeen),
    Number(monitor.cutPullSeen),
    Number(monitor.splitSeen),
    monitor.postSplitArmMoves,
    Number(monitor.badOrder),
    Number(monitor.upperCoveredBeforeLower),
    Number(monitor.pocketCoveredBeforeBothArms),
    Number(monitor.gateCoveredBeforeUpper),
    Number(monitor.lowerCoveredBeforeGate),
  ].join("");
}

function goalCovered(state: RealityAnchorState, x: number, y: number) {
  const key = `${x},${y}`;
  return (
    state.crates.some((point) => pointKey(point) === key) ||
    state.stickyGroups.some((group) => group.some((point) => pointKey(point) === key)) ||
    (state.pushPullAnchor !== undefined &&
      [state.pushPullAnchor.push, state.pushPullAnchor.pull].some((point) => pointKey(point) === key)) ||
    (state.boxStickyAnchor !== undefined &&
      [state.boxStickyAnchor.box, state.boxStickyAnchor.sticky].some((point) => pointKey(point) === key))
  );
}

function objectConfigurationKey(state: RealityAnchorState) {
  const crates = state.crates.map(pointKey).sort().join(";");
  const sticky = state.stickyGroups
    .map((group) => group.map(pointKey).sort().join(";"))
    .sort()
    .join("|");
  const pl = state.pushPullAnchor
    ? `${pointKey(state.pushPullAnchor.push)}-${pointKey(state.pushPullAnchor.pull)}`
    : "none";
  const bs = state.boxStickyAnchor
    ? `${pointKey(state.boxStickyAnchor.box)}-${pointKey(state.boxStickyAnchor.sticky)}`
    : "none";
  return `C:${crates}|M:${sticky}|PL:${pl}|BS:${bs}`;
}

function reconstructTrace(key: string) {
  const reversed: Array<{ input: Direction; events: string[] }> = [];
  let cursor = key;
  while (cursor !== initialKey) {
    const node = nodes.get(cursor)!;
    reversed.push({ input: node.input!, events: node.events ?? [] });
    cursor = node.predecessor!;
  }
  const steps = reversed.reverse();
  return {
    exampleInputs: steps.map((step) => step.input),
    exampleNonWalkSteps: steps.filter((step) =>
      step.events.some((event) => eventType(event) !== "walk"),
    ),
  };
}
