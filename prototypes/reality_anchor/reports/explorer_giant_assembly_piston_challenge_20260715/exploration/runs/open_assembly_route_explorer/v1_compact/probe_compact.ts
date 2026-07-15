import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer/v1_compact",
);
const layoutsDir = path.join(root, "layouts");
await mkdir(layoutsDir, { recursive: true });
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const width = 16;
const height = 22;
const pistons: Point[] = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];
const floor = new Set<string>();
const open = (x: number, y: number) => floor.add(`${x},${y}`);

for (const y of [1, 2]) for (const x of [9, 10]) open(x, y);
for (let y = 3; y <= 18; y += 1) open(8, y);
for (let y = 4; y <= 18; y += 1) open(9, y);
for (const y of [4, 8]) {
  open(10, y);
  open(11, y);
}

// Same asymmetric false chamber as v0.  The x=7 rib stays closed through y=11.
for (let x = 3; x <= 6; x += 1) open(x, 5);
for (let x = 2; x <= 6; x += 1) open(x, 6);
for (let x = 2; x <= 5; x += 1) open(x, 7);
for (let x = 1; x <= 6; x += 1) open(x, 8);
for (let x = 1; x <= 6; x += 1) open(x, 9);
for (let x = 2; x <= 6; x += 1) open(x, 10);
for (let x = 3; x <= 6; x += 1) open(x, 11);

for (let x = 1; x <= 9; x += 1) open(x, 12);
for (let y = 13; y <= 19; y += 1) {
  for (let x = 1; x <= 9; x += 1) open(x, y);
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

// H starts four rows below its compact assembly height and is lifted on its own.
for (let y = 13; y <= 17; y += 1) rows[y]![8] = "M";
rows[13]![9] = "M";
rows[17]![9] = "M";
// R is horizontally loaded only after H has vacated rows 14..16.
for (let y = 14; y <= 16; y += 1) rows[y]![2] = "M";
// T first rises one row, then moves two cells right to close the full HRT group.
for (let x = 2; x <= 6; x += 1) rows[18]![x] = "M";
rows[3]![8] = "@";

const layout = rows.map((row) => row.join("")).join("\n");
await writeFile(path.join(layoutsDir, "open_assembly_compact.layout.txt"), `${layout}\n`, "utf8");
const initial = parseLevel({ id: "open_assembly_compact", title: "open_assembly_compact", layout } satisfies LevelDoc);

const intendedInputs: InputId[] = [
  "down", "right", "right", "left", "left",
  "down", "down", "down", "down", "right", "right", "left", "left",
  // Reach H's lower face through the side yard.
  "down", "down", "down", "down", "left",
  "down", "down", "down", "down", "down", "down", "right",
  // Pre-lift H four rows: full HRT will later need only five rows.
  "up", "up", "up", "up",
  // Reach R's left face and load it six cells right into H.
  "left", "left", "left", "left", "left", "up", "left", "left", "down", "down",
  "right", "right", "right", "right", "right", "right",
  // Reach below T, lift it once, then circle to its left face.
  "down", "down", "down", "down", "left", "up",
  "down", "left", "left", "left", "left", "left", "up", "up",
  // Two right strokes close H-R-T.
  "right", "right",
  // Pure full-giant transport: exactly five up strokes.
  "down", "right", "right", "right", "right", "right",
  "up", "up", "up", "up", "up",
  "left", "left", "left", "left", "left", "up", "right",
];

const trace = runTrace(initial, intendedInputs);
const illegal = trace.filter((entry) => !entry.legal);
if (illegal.length > 0) process.stderr.write(`${renderState(stateAfter(initial, intendedInputs.slice(0, -1)))}\n`);
assert.equal(illegal.length, 0, `compact trace has illegal inputs: ${JSON.stringify(illegal, null, 2)}`);
assert.equal(trace.at(-1)?.win, true);

const trialPushes = trace.filter((entry) => entry.events.some((event) => event.startsWith("push_object:crate#")));
const trialPulls = trace.filter((entry) => entry.events.some((event) => event.startsWith("pull_object:crate#")));
assert.deepEqual(trialPushes.map((entry) => entry.coveredMask), [1, 2]);
assert.deepEqual(trialPulls.map((entry) => entry.coveredMask), [0, 0]);

const directCoveredActionTables = {
  upper: actionTable(stateAfter(initial, intendedInputs.slice(0, 3))),
  lower: actionTable(stateAfter(initial, intendedInputs.slice(0, 11))),
};
for (const [bay, table] of Object.entries(directCoveredActionTables)) {
  assert.deepEqual(table.filter((entry) => entry.legal).map((entry) => entry.input), ["left"], `${bay} has a side exit`);
  assert.ok(table[2]?.events.some((event) => event.startsWith("pull_object:crate#")));
}

const mergeSteps = trace.filter((entry) => entry.events.some((event) => event.startsWith("sticky_merge:")));
assert.equal(mergeSteps.length, 2, "expected H+R and HR+T merge events");
assert.deepEqual(mergeSteps.map((entry) => entry.stickyGroupSizes), [[5, 10], [15]]);
const fullTransport = trace.filter((entry) => entry.phase === "full_transport");
assert.equal(fullTransport.length, 5);
assert.ok(fullTransport.every((entry) => entry.events.some((event) => event.startsWith("push_object:sticky#"))));
assert.equal(trace.at(-1)?.coveredMask, 3);
assert.ok(trace.at(-1)?.events.includes("force_chain:n3"));
assert.ok(trace.at(-1)?.events.includes("sticky_to_box:n2"));
assert.equal(trace.flatMap((entry) => entry.events).filter((event) => event.startsWith("anchor_boundary_shift:")).length, 0);
assert.equal(
  trace.slice(0, -1).flatMap((entry) => entry.events).filter((event) =>
    event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:") || event.startsWith("sticky_split:")
  ).length,
  0,
);

// Falsification trace: stage H and R at the terminal first, then chase T upward.  This is the
// same final registered geometry, but it tests whether five full-group lifts are structurally forced.
const lateAssemblyInputs: InputId[] = [
  "down", "right", "right", "left", "left",
  "down", "down", "down", "down", "right", "right", "left", "left",
  "down", "down", "down", "down", "left",
  "down", "down", "down", "down", "down", "down", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up",
  "down", "down", "down",
  "left", "left", "left", "left", "left", "left", "left",
  "down", "down", "down",
  "right", "right", "right", "right", "right", "right",
  "down", "down", "right",
  "up", "up", "up", "up", "up",
  "down", "down", "down", "down", "down", "down", "down", "left", "left",
  "up", "up", "up", "up", "up", "up",
  "left", "left", "left", "left", "left", "up",
  "right", "right", "right",
];
const lateAssemblyTrace = runTrace(initial, lateAssemblyInputs);
assert.equal(lateAssemblyTrace.filter((entry) => !entry.legal).length, 0, "late-assembly falsification trace is illegal");
assert.equal(lateAssemblyTrace.at(-1)?.win, true, "late-assembly trace should reach the same terminal family");
const lateFullMergeIndex = lateAssemblyTrace.findIndex((entry) => entry.stickyGroupSizes.length === 1 && entry.stickyGroupSizes[0] === 15);
const lateFullTransportUps = lateAssemblyTrace.slice(lateFullMergeIndex + 1, -1).filter((entry) =>
  entry.input === "up" && entry.events.some((event) => event.startsWith("push_object:sticky#"))
);
assert.equal(lateFullTransportUps.length, 0, "falsification trace unexpectedly transports the full giant");

const finalState = stateAfter(initial, intendedInputs);
const report = {
  schema: "ra_open_assembly_compact_v1",
  geometry: { width, height, pistons, goals },
  intendedInputs,
  summary: {
    steps: intendedInputs.length,
    trialPushSteps: trialPushes.map((entry) => entry.index),
    trialPullSteps: trialPulls.map((entry) => entry.index),
    mergeSteps: mergeSteps.map((entry) => entry.index),
    fullTransportSteps: fullTransport.map((entry) => entry.index),
    pureFullTransportDistance: fullTransport.length,
    win: isWin(finalState),
    finalCoveredMask: coveredMask(finalState),
    initialHeight: height,
    activeBottomRow: 19,
    boundaryEvents: trace.flatMap((entry) => entry.events).filter((event) =>
      event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:")
      || event.startsWith("sticky_split:") || event.startsWith("anchor_boundary_shift:")
    ),
  },
  directCoveredActionTables,
  lateAssemblyCounterexample: {
    inputs: lateAssemblyInputs,
    steps: lateAssemblyInputs.length,
    win: lateAssemblyTrace.at(-1)?.win ?? false,
    fullMergeStep: lateFullMergeIndex + 1,
    fullTransportUpStrokesAfterMerge: lateFullTransportUps.length,
    finalEvents: lateAssemblyTrace.at(-1)?.events ?? [],
  },
  trace,
  initialRender: renderState(initial),
  finalRender: renderState(finalState),
};
await writeFile(path.join(root, "audit_compact.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${layout}\n\n${JSON.stringify(report.summary, null, 2)}\n`);

function runTrace(start: RealityAnchorState, inputs: InputId[]) {
  let state = start;
  let fullMergeReached = false;
  return inputs.map((input, index) => {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    if (state.stickyGroups.length === 1 && state.stickyGroups[0]?.length === 15) fullMergeReached = true;
    const finalWalkStart = inputs.length - 7;
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
      phase: fullMergeReached && input === "up" && index < finalWalkStart ? "full_transport" : "other",
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

function actionTable(state: RealityAnchorState) {
  return (["up", "down", "left", "right"] as InputId[]).map((input) => {
    const result = step(pkg.mechanic, state, input);
    return { input, legal: result.legal, reason: result.reason ?? null, events: result.events };
  });
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
