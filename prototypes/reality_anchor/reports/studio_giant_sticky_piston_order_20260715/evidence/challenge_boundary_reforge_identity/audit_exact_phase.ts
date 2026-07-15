import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  cloneState,
  pointKey,
  type RealityAnchorState,
} from "../../../../../../src/prototypes/reality_anchor/mechanics.js";

type Direction = "up" | "down" | "left" | "right";
type Reach = { state: RealityAnchorState; inputs: Direction[] };
type Attempt = { player: { x: number; y: number }; walkInputs: Direction[]; action: Direction; events: string[] };
const directions: Direction[] = ["up", "down", "left", "right"];

const candidatePath = process.argv[2] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "candidates/challenge/RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.txt";
const canonicalPath = process.argv[3] ??
  "prototypes/reality_anchor/reports/" +
  "input_replay_RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1.json";
const noRestickReplayPath = process.argv[4] ??
  "prototypes/reality_anchor/reports/" +
  "input_replay_RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1_NO_RESTICK_FIRE_EXACT.json";
const noRestickStatePath = process.argv[5] ??
  "prototypes/reality_anchor/reports/studio_giant_sticky_piston_order_20260715/" +
  "evidence/challenge_boundary_reforge_identity/wrong_no_restick_after_fire_exact_v1.txt";

const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const winCondition = pkg.mechanic.win;
const layout = normalize(await readFile(candidatePath, "utf8"));
const canonical = JSON.parse(await readFile(canonicalPath, "utf8")) as {
  inputs: Direction[];
};

const initial = adapter.parseLevel({ id: "BOUNDARY_REFORGE_EXACT_AUDIT", title: "audit", layout });
let phase = cloneState(initial);
const prefixTrace: Array<{ step: number; action: Direction; events: string[] }> = [];
for (const [index, action] of canonical.inputs.slice(0, 15).entries()) {
  const transition = runtime.step(phase, action, { winCondition });
  if (!transition.legal) {
    throw new Error(`canonical prefix step ${index + 1} became illegal: ${transition.reason}`);
  }
  phase = transition.state;
  if (transition.events.some((event) => event !== "walk")) {
    prefixTrace.push({ step: index + 1, action, events: transition.events });
  }
}

const walkReach = enumerateWalkOnly(phase);
const finalPl = phase.pushPullAnchor;
const finalBs = phase.boxStickyAnchor;
if (!finalPl || !finalBs) throw new Error("exact phase state is missing an anchor");

const fourthLeftShiftAttempts: Attempt[] = [];
const plVerticalShiftAttempts: Attempt[] = [];
const bsDownShiftAttempts: Attempt[] = [];
for (const reachable of walkReach) {
  for (const action of directions) {
    const transition = runtime.step(reachable.state, action, { winCondition });
    if (!transition.legal) continue;
    const nextPl = transition.state.pushPullAnchor;
    const nextBs = transition.state.boxStickyAnchor;
    if (transition.events.includes("anchor_boundary_shift:push_pull") && nextPl) {
      if (nextPl.pull.x < finalPl.pull.x) {
        fourthLeftShiftAttempts.push(asAttempt(reachable, action, transition.events));
      }
      if (nextPl.pull.y !== finalPl.pull.y || nextPl.push.y !== finalPl.push.y) {
        plVerticalShiftAttempts.push(asAttempt(reachable, action, transition.events));
      }
    }
    if (transition.events.includes("anchor_boundary_shift:box_sticky") && nextBs &&
        (nextBs.box.y > finalBs.box.y || nextBs.sticky.y > finalBs.sticky.y)) {
      bsDownShiftAttempts.push(asAttempt(reachable, action, transition.events));
    }
  }
}

const bsStance = walkReach.find((entry) => pointKey(entry.state.player) === "7,19");
if (!bsStance) throw new Error("expected B/S down-test stance x7,y19 is not walk-only reachable");
const bsDown = runtime.step(bsStance.state, "down", { winCondition });

const noRestickReplay = JSON.parse(await readFile(noRestickReplayPath, "utf8")) as {
  inputs: Direction[];
  replay: { completed: boolean; executedSteps: number; legalThroughStep: number };
  final: { render: string; key: string; isWin: boolean };
  steps: Array<{ step: number; action: Direction; events: string[] }>;
};
const noRestickLayout = normalize(await readFile(noRestickStatePath, "utf8"));
const noRestickState = adapter.parseLevel({
  id: "BOUNDARY_REFORGE_NO_RESTICK_STATE_AUDIT",
  title: "audit",
  layout: noRestickLayout,
});

console.log(JSON.stringify({
  exactVersion: "RA_FRESH_2026_07_15_BOUNDARY_REFORGE_MASK_v1",
  candidatePath,
  canonicalPath,
  phaseAfterCanonicalStep: 15,
  canonicalPrefixInputs: canonical.inputs.slice(0, 15),
  canonicalPrefixObjectEvents: prefixTrace,
  phaseState: {
    player: phase.player,
    pl: finalPl,
    bs: finalBs,
    render: adapter.renderState(phase),
  },
  isolationAudit: {
    walkOnlyReachableCellCount: walkReach.length,
    walkOnlyReachableCells: walkReach.map((entry) => pointKey(entry.state.player)).sort(),
    rightOfFinalP: {
      cell: `${finalPl.push.x + 1},${finalPl.push.y}`,
      reachable: walkReach.some((entry) =>
        entry.state.player.x === finalPl.push.x + 1 && entry.state.player.y === finalPl.push.y),
    },
    fourthLeftShiftExistsFromAnyWalkOnlyReachableStance: fourthLeftShiftAttempts.length > 0,
    fourthLeftShiftAttempts,
    plVerticalShiftExistsFromAnyWalkOnlyReachableStance: plVerticalShiftAttempts.length > 0,
    plVerticalShiftAttempts,
    bsDownShiftExistsFromAnyWalkOnlyReachableStance: bsDownShiftAttempts.length > 0,
    bsDownShiftAttempts,
    wallChecks: [
      wallAt(phase, finalPl.pull.x, finalPl.pull.y - 1, "L 上方"),
      wallAt(phase, finalPl.push.x, finalPl.push.y - 1, "P 上方"),
      wallAt(phase, finalPl.pull.x, finalPl.pull.y + 1, "L 下方"),
      wallAt(phase, finalPl.push.x, finalPl.push.y + 1, "P 下方"),
      wallAt(phase, finalBs.box.x, finalBs.box.y + 1, "B 下方"),
      wallAt(phase, finalBs.sticky.x, finalBs.sticky.y + 1, "S 下方"),
    ],
    exactBsDownAttempt: {
      stance: bsStance.state.player,
      walkInputs: bsStance.inputs,
      action: "down",
      legal: bsDown.legal,
      reason: bsDown.reason,
      events: bsDown.events,
    },
  },
  noRestickAudit: {
    replayPath: noRestickReplayPath,
    replayInputCount: noRestickReplay.inputs.length,
    replayCompleted: noRestickReplay.replay.completed,
    replayLegalThroughStep: noRestickReplay.replay.legalThroughStep,
    finalIsWin: noRestickReplay.final.isWin,
    finalRenderMatchesEvidenceState: normalize(noRestickReplay.final.render) === noRestickLayout,
    coveredGoals: coveredGoals(noRestickState),
    finalObjectEvents: noRestickReplay.steps
      .filter((step) => step.events.some((event) => event !== "walk"))
      .map((step) => ({ step: step.step, action: step.action, events: step.events })),
  },
}, null, 2));

function enumerateWalkOnly(state: RealityAnchorState): Reach[] {
  const queue: Reach[] = [{ state: cloneState(state), inputs: [] }];
  const seen = new Set<string>([pointKey(state.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const action of directions) {
      const transition = runtime.step(current.state, action, { winCondition });
      if (!transition.legal || transition.events.length !== 1 || transition.events[0] !== "walk") continue;
      const key = pointKey(transition.state.player);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state: transition.state, inputs: [...current.inputs, action] });
    }
  }
  return queue;
}

function asAttempt(reachable: Reach, action: Direction, events: string[]): Attempt {
  return { player: reachable.state.player, walkInputs: reachable.inputs, action, events };
}

function wallAt(state: RealityAnchorState, x: number, y: number, label: string) {
  return { label, cell: `${x},${y}`, wall: state.walls.has(`${x},${y}`) };
}

function coveredGoals(state: RealityAnchorState): string[] {
  const occupied = new Set<string>();
  for (const crate of state.crates) occupied.add(pointKey(crate));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  if (state.pushPullAnchor) {
    occupied.add(pointKey(state.pushPullAnchor.push));
    occupied.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(pointKey(state.boxStickyAnchor.box));
    occupied.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return [...state.goals].filter((goal) => occupied.has(goal)).sort();
}

function normalize(value: string): string {
  return value.replace(/\r/g, "").replace(/\n+$/g, "");
}
