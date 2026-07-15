import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/open_assembly_route_explorer/attack_v0_ordering",
);
await mkdir(path.join(root, "layouts"), { recursive: true });
const parentRoot = path.dirname(root);
const baseLayout = (await readFile(path.join(parentRoot, "layouts/open_assembly_v0.layout.txt"), "utf8")).trimEnd();
const baseAudit = JSON.parse(await readFile(path.join(parentRoot, "audit_v0.json"), "utf8")) as { intendedInputs: InputId[] };
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

// No opening trial is needed.  H is docked, then H/R/T are each transported to their final y.
const hFirstInputs: InputId[] = [
  "down", "down", "down", "down", "down", "down", "down", "down", "down",
  "left", "left", "left", "left", "left", "left", "left",
  "down", "down", "down",
  "right", "right", "right", "right", "right", "right",
  // Enter H's rear origin at (8,18), then lift H alone from topY=13 to topY=4.
  "down", "down", "down", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up",
  // Circle below R and lift it alone from y=19..21 to y=9..11.
  "down", "down", "down", "down", "down", "down", "down", "down", "down",
  "left", "down", "down", "down", "down", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up", "up",
  // Return to T's left, translate it two cells right, then lift it alone to y=12.
  "left", "left", "left", "left", "left", "left", "left",
  "down", "down", "down", "down", "down", "down", "down", "down", "down", "down",
  "right", "right",
  "down", "right", "right", "right", "right", "right",
  "up", "up", "up", "up", "up", "up", "up", "up", "up", "up",
  // Full HRT now exists at the exact registered pose; no full-group up stroke remains.
  "left", "left", "left", "left", "left", "up", "right",
];

const base = parse("v0_attack_base", baseLayout);
const baseAttack = runTrace(base, hFirstInputs);
assert.equal(baseAttack.illegal.length, 0, `H-first attack is illegal: ${JSON.stringify(baseAttack.illegal, null, 2)}`);
assert.equal(baseAttack.win, true, "H-first terminal assembly must win");
assert.deepEqual(baseAttack.mergeSteps, [63, 98]);
assert.equal(baseAttack.fullMergeStep, 98);
assert.equal(baseAttack.fullTransportUpStrokesAfterMerge, 0);
assert.ok(baseAttack.finalEvents.includes("force_chain:n3"));

const intended = runTrace(base, baseAudit.intendedInputs);
assert.equal(intended.illegal.length, 0);
assert.equal(intended.win, true);

const variants = [
  { id: "wall_safe_right_neighbor", walls: [{ x: 9, y: 18 }] },
  { id: "wall_left_approach", walls: [{ x: 7, y: 18 }] },
  { id: "wall_both_neighbors", walls: [{ x: 7, y: 18 }, { x: 9, y: 18 }] },
  { id: "wall_h_rear_origin", walls: [{ x: 8, y: 18 }] },
].map((variant) => {
  const layout = addWalls(baseLayout, variant.walls);
  const state = parse(variant.id, layout);
  return {
    ...variant,
    layout,
    intended: runTrace(state, baseAudit.intendedInputs),
    hFirst: runTrace(state, hFirstInputs),
  };
});

// The only single-cell wall that leaves the intended giant sweep intact is x9,y18; it does not
// stop the exact attack, which enters x8,y18 from the left.  Walls on x7/y18 or x8/y18 break v0.
const safeRight = variants.find((variant) => variant.id === "wall_safe_right_neighbor")!;
assert.equal(safeRight.intended.win, true);
assert.equal(safeRight.hFirst.win, true);
for (const id of ["wall_left_approach", "wall_both_neighbors", "wall_h_rear_origin"]) {
  const variant = variants.find((item) => item.id === id)!;
  assert.equal(variant.intended.win, false, `${id} unexpectedly preserves intended trace`);
}

await Promise.all([
  writeFile(path.join(root, "layouts/h_first_base.layout.txt"), `${baseLayout}\n`, "utf8"),
  ...variants.map((variant) => writeFile(path.join(root, `layouts/${variant.id}.layout.txt`), `${variant.layout}\n`, "utf8")),
]);

const report = {
  schema: "ra_v0_h_first_terminal_assembly_attack_v1",
  hFirstInputs,
  baseAttack,
  intendedBaseline: {
    steps: baseAudit.intendedInputs.length,
    win: intended.win,
    mergeSteps: intended.mergeSteps,
    fullMergeStep: intended.fullMergeStep,
    fullTransportUpStrokesAfterMerge: intended.fullTransportUpStrokesAfterMerge,
  },
  variants: variants.map((variant) => ({
    id: variant.id,
    walls: variant.walls,
    intended: compactResult(variant.intended),
    hFirst: compactResult(variant.hFirst),
  })),
};
await writeFile(path.join(root, "audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  baseAttack: compactResult(baseAttack),
  intendedBaseline: report.intendedBaseline,
  variants: report.variants,
}, null, 2)}\n`);

function parse(id: string, layout: string): RealityAnchorState {
  return parseLevel({ id, title: id, layout } satisfies LevelDoc);
}

function runTrace(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const trace = [];
  let fullMergeStep: number | null = null;
  let fullTransportUpStrokesAfterMerge = 0;
  for (const [index, input] of inputs.entries()) {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    const groupSizes = state.stickyGroups.map((group) => group.length).sort((a, b) => a - b);
    if (fullMergeStep === null && groupSizes.length === 1 && groupSizes[0] === 15) fullMergeStep = index + 1;
    if (
      fullMergeStep !== null && index + 1 > fullMergeStep && input === "up"
      && result.events.some((event) => event.startsWith("push_object:sticky#"))
    ) {
      fullTransportUpStrokesAfterMerge += 1;
    }
    trace.push({
      index: index + 1,
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      playerBefore: before.player,
      playerAfter: state.player,
      events: result.events,
      groupSizes,
      win: isWin(state),
    });
  }
  const mergeSteps = trace.filter((entry) => entry.events.some((event) => event.startsWith("sticky_merge:"))).map((entry) => entry.index);
  return {
    steps: inputs.length,
    win: isWin(state),
    illegal: trace.filter((entry) => !entry.legal),
    mergeSteps,
    fullMergeStep,
    fullTransportUpStrokesAfterMerge,
    finalEvents: trace.at(-1)?.events ?? [],
    finalRender: renderState(state),
    trace,
  };
}

function compactResult(result: ReturnType<typeof runTrace>) {
  return {
    steps: result.steps,
    win: result.win,
    firstIllegal: result.illegal[0] ?? null,
    mergeSteps: result.mergeSteps,
    fullMergeStep: result.fullMergeStep,
    fullTransportUpStrokesAfterMerge: result.fullTransportUpStrokesAfterMerge,
    finalEvents: result.finalEvents,
  };
}

function addWalls(layout: string, walls: Point[]): string {
  const rows = layout.split("\n").map((row) => row.split(""));
  for (const wall of walls) rows[wall.y]![wall.x] = "#";
  return rows.map((row) => row.join("")).join("\n");
}
