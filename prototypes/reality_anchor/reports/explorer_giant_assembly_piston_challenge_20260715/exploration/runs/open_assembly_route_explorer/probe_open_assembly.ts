import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer",
);
const layoutsDir = path.join(root, "layouts");
await mkdir(layoutsDir, { recursive: true });

const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const width = 16;
const height = 27;

const pistons: Point[] = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];

const floor = new Set<string>();
const open = (x: number, y: number) => floor.add(`${x},${y}`);

// Immobile anchor capsules.  Their x boundary is the common P/L and B/S line x=9|10.
for (const y of [1, 2]) {
  open(9, y);
  open(10, y);
}

// Start descent and the two direct piston temptations.
for (let y = 3; y <= 12; y += 1) open(8, y);
for (let y = 4; y <= 17; y += 1) open(9, y);
for (const y of [4, 8]) {
  open(10, y);
  open(11, y);
}

// An asymmetric blind atrium sits left of the register shadow.  It breaks the visual impression
// that the walls are tracing H's answer silhouette, while the closed x=7 rib preserves the force gate.
for (let x = 3; x <= 6; x += 1) open(x, 5);
for (let x = 2; x <= 6; x += 1) open(x, 6);
for (let x = 2; x <= 5; x += 1) open(x, 7);
for (let x = 1; x <= 6; x += 1) open(x, 8);
for (let x = 1; x <= 6; x += 1) open(x, 9);
for (let x = 2; x <= 6; x += 1) open(x, 10);
for (let x = 3; x <= 6; x += 1) open(x, 11);

// Final T handle and the vertical transport curtain swept by T.
for (let y = 12; y <= 21; y += 1) {
  for (let x = 4; x <= 8; x += 1) open(x, y);
}
for (let x = 1; x <= 3; x += 1) open(x, 12);

// H's horizontal loader: a broad-looking work yard rather than an outline of the answer.
for (let y = 13; y <= 17; y += 1) {
  for (let x = 1; x <= 9; x += 1) open(x, y);
}

// R/T work lanes and circulation below the assembled giant.
for (let y = 18; y <= 21; y += 1) {
  open(1, y);
  open(8, y);
  open(9, y);
}
for (let x = 1; x <= 9; x += 1) {
  open(x, 21);
  open(x, 22);
  open(x, 23);
}

const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
for (const key of floor) {
  const [x, y] = key.split(",").map(Number);
  rows[y]![x] = ".";
}
rows[1]![9] = "P";
rows[1]![10] = "L";
rows[2]![9] = "S";
rows[2]![10] = "B";
for (const goal of goals) rows[goal.y]![goal.x] = "G";
for (const piston of pistons) rows[piston.y]![piston.x] = "C";

// H: seven-cell short bracket, initially translated six cells left of the register axis.
for (let y = 13; y <= 17; y += 1) rows[y]![2] = "M";
rows[13]![3] = "M";
rows[17]![3] = "M";
// R: three-cell relay, initially one row below its final relation to H.
for (let y = 19; y <= 21; y += 1) rows[y]![8] = "M";
// T: five-cell bar, two strokes left of its x pose and one row below its final y pose.
for (let x = 2; x <= 6; x += 1) rows[22]![x] = "M";
rows[3]![8] = "@";

const layout = rows.map((row) => row.join("")).join("\n");
await writeFile(path.join(layoutsDir, "open_assembly_v0.layout.txt"), `${layout}\n`, "utf8");

const initial = parseLevel({ id: "open_assembly_v0", title: "open_assembly_v0", layout } satisfies LevelDoc);

const intendedInputs: InputId[] = [
  // Start route: walk through both direct bays, try each C, and experience forced L-pull reset.
  "down", "right", "right", "left", "left",
  "down", "down", "down", "down", "right", "right", "left", "left",
  // Enter the yard and reach H's left face.
  "down", "down", "down", "down",
  "left", "left", "left", "left", "left", "left", "left",
  "down", "down", "down",
  // Translate H into the vertical axis.
  "right", "right", "right", "right", "right", "right",
  // Return to T's left face.
  "left", "left", "left", "left", "left", "left",
  "down", "down", "down", "down", "down", "down", "down",
  // Translate T two cells right; it first joins R.
  "right", "right",
  // Circle under T.  The first lift joins RT to H; nine more lift the complete giant.
  "down", "right", "right", "right", "right", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up", "up",
  // Reach the only useful side handle and perform the simultaneous final stroke.
  "left", "left", "left", "left", "left", "up", "right",
];

const trace = runTrace(initial, intendedInputs);
const illegal = trace.filter((entry) => !entry.legal);
if (illegal.length > 0) {
  process.stderr.write(`${renderState(stateAfter(initial, intendedInputs.slice(0, -1)))}\n`);
}
assert.equal(illegal.length, 0, `intended trace contains illegal inputs: ${JSON.stringify(illegal, null, 2)}`);
assert.equal(trace.at(-1)?.win, true, "intended trace must end in a win");

const trialPushes = trace.filter((entry) => entry.events.some((event) => event.startsWith("push_object:crate#")));
const trialPulls = trace.filter((entry) => entry.events.some((event) => event.startsWith("pull_object:crate#")));
assert.equal(trialPushes.length, 2, "opening should directly push both ordinary C once");
assert.equal(trialPulls.length, 2, "opening should force-retract both ordinary C once");
assert.deepEqual(trialPushes.map((entry) => entry.coveredMask), [1, 2]);
assert.deepEqual(trialPulls.map((entry) => entry.coveredMask), [0, 0]);

const directCoveredActionTables = {
  upper: actionTable(stateAfter(initial, intendedInputs.slice(0, 3))),
  lower: actionTable(stateAfter(initial, intendedInputs.slice(0, 11))),
};
for (const [bay, table] of Object.entries(directCoveredActionTables)) {
  assert.deepEqual(table.filter((entry) => entry.legal).map((entry) => entry.input), ["left"], `${bay} C bay has a side exit`);
  assert.ok(table.find((entry) => entry.input === "left")?.events.some((event) => event.startsWith("pull_object:crate#")));
}

const mergeSteps = trace.filter((entry) => entry.events.some((event) => event.startsWith("sticky_merge:")));
assert.equal(mergeSteps.length, 2, "H-R and HR-T should merge in two visible assembly events");
assert.equal(trace.at(-1)?.coveredMask, 3);
assert.equal(trace.at(-1)?.forceModeBefore, "push");
assert.ok(trace.at(-1)?.events.includes("force_chain:n3"), "final stroke should move giant plus both C pistons");
assert.ok(trace.at(-1)?.events.includes("sticky_to_box:n2"), "only H's two teeth should cross B/S on the final stroke");
assert.equal(
  trace.slice(0, -1).flatMap((entry) => entry.events).filter((event) =>
    event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:") || event.startsWith("sticky_split:")
  ).length,
  0,
  "B/S conversion or split occurred before the terminal stroke",
);
assert.equal(
  trace.flatMap((entry) => entry.events).filter((event) => event.startsWith("anchor_boundary_shift:")).length,
  0,
  "an anchor moved during the intended trace",
);

const finalState = stateAfter(initial, intendedInputs);
const report = {
  schema: "ra_open_assembly_route_probe_v0",
  geometry: { width, height, pistons, goals },
  intendedInputs,
  summary: {
    steps: intendedInputs.length,
    trialPushSteps: trialPushes.map((entry) => entry.index),
    trialPullSteps: trialPulls.map((entry) => entry.index),
    mergeSteps: mergeSteps.map((entry) => entry.index),
    win: isWin(finalState),
    finalCoveredMask: coveredMask(finalState),
    finalStickyCellCount: finalState.stickyGroups.reduce((sum, group) => sum + group.length, 0),
    finalCrateCount: finalState.crates.length,
    anchors: {
      pushPull: finalState.pushPullAnchor,
      boxSticky: finalState.boxStickyAnchor,
    },
    totalObjectCellsInitial: initial.crates.length + initial.stickyGroups.reduce((sum, group) => sum + group.length, 0),
    totalObjectCellsFinal: finalState.crates.length + finalState.stickyGroups.reduce((sum, group) => sum + group.length, 0),
    boundaryEvents: trace.flatMap((entry) => entry.events).filter((event) =>
      event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:")
      || event.startsWith("sticky_split:") || event.startsWith("anchor_boundary_shift:")
    ),
  },
  directCoveredActionTables,
  trace,
  initialRender: renderState(initial),
  finalRender: renderState(finalState),
};

await writeFile(path.join(root, "audit_v0.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${layout}\n\n${JSON.stringify(report.summary, null, 2)}\n`);

function runTrace(start: RealityAnchorState, inputs: InputId[]) {
  let state = start;
  return inputs.map((input, index) => {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    return {
      index: index + 1,
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      playerBefore: before.player,
      playerAfter: state.player,
      forceModeBefore: forceModeAt(before, before.player),
      events: result.events,
      coveredMask: coveredMask(state),
      stickyGroupSizes: state.stickyGroups.map((group) => group.length).sort((a, b) => a - b),
      win: isWin(state),
    };
  });
}

function stateAfter(start: RealityAnchorState, inputs: InputId[]): RealityAnchorState {
  let state = start;
  for (const input of inputs) {
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
  }
  return state;
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  if (state.pushPullAnchor) {
    occupied.add(pointKey(state.pushPullAnchor.push));
    occupied.add(pointKey(state.pushPullAnchor.pull));
  }
  if (state.boxStickyAnchor) {
    occupied.add(pointKey(state.boxStickyAnchor.box));
    occupied.add(pointKey(state.boxStickyAnchor.sticky));
  }
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
}

function actionTable(state: RealityAnchorState) {
  return (["up", "down", "left", "right"] as InputId[]).map((input) => {
    const result = step(pkg.mechanic, state, input);
    return {
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      coveredMaskAfter: coveredMask(result.legal ? result.state : state),
    };
  });
}
