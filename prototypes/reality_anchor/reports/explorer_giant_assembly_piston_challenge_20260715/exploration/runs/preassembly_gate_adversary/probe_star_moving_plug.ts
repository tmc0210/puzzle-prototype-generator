import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const runRoot = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_adversary",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const layout = makeLayout();
const layoutPath = path.join(runRoot, "layouts/star_moving_plug_v0.layout.txt");
await mkdir(path.dirname(layoutPath), { recursive: true });
await writeFile(layoutPath, `${layout}\n`, "utf8");

const initial = parseLevel({ id: "star_moving_plug_v0", title: "star_moving_plug_v0", layout } satisfies LevelDoc);
assert.deepEqual(groupSizes(initial), [5, 7, 7]);

// Before each of R's three right strokes, collapse all pure walking and inspect every real object action.
// R is a five-row moving plug: the player cannot overtake it to reach T's direct origins.
const preassemblyFrontiers = [];
let checkpoint = initial;
for (let rightCount = 0; rightCount < 3; rightCount += 1) {
  const frontier = objectActionFrontier(checkpoint);
  assert.ok(frontier.length > 0);
  assert.ok(frontier.every((entry) => entry.input === "right"));
  assert.ok(frontier.every((entry) => entry.events.some((event) => event.startsWith("push_object:sticky#"))));
  if (rightCount === 0) {
    assert.ok(frontier.every((entry) => !entry.events.includes("sticky_merge:n1")), "第一拍不应提前 merge");
  } else {
    assert.ok(frontier.every((entry) => entry.events.includes("sticky_merge:n1")), "第二拍必须接 T，第三拍必须接 H");
  }
  preassemblyFrontiers.push({ right_count: rightCount, actions: frontier });
  const result = step(pkg.mechanic, checkpoint, "right");
  assert.equal(result.legal, true);
  checkpoint = result.state;
}

// 第二拍 R 与不可达的 T 黏成 RT；第三拍玩家仍只推 R，整件 RT 携 T 右移并桥接 H。
const thirdEntry = replayPrefix(initial, ["right", "right", "right"]).entries.at(-1)!;
assert.ok(thirdEntry.events.includes("sticky_merge:n1"));
assert.deepEqual(thirdEntry.group_sizes, [19]);

const intendedInputs: InputId[] = [
  "right", "right", "right",
  // Only now is the side exit at x4,y15 reachable; use it to circle to T's bottom origin x8,y22.
  ...repeat("up", 4), ...repeat("right", 7), ...repeat("down", 10), ...repeat("left", 3),
  // Full 19-cell group, and only the full group, is lifted nine cells.
  ...repeat("up", 9),
  // Reach R's far-left final handle and perform the ordinary-C simultaneous finish.
  ...repeat("left", 4), ...repeat("up", 6), "right",
];
const intended = replayPrefix(initial, intendedInputs);
assert.equal(intended.illegal.length, 0, JSON.stringify(intended.illegal, null, 2));
assert.equal(intended.win, true);
assert.equal(intended.entries.find((entry) => entry.group_sizes.length === 1 && entry.group_sizes[0] === 19)?.index, 3);
assert.equal(
  intended.entries.filter((entry) =>
    entry.index > 3 && entry.input === "up" && entry.events.includes("move_sticky_rigid")
  ).length,
  9,
);
const finalEntry = intended.entries.at(-1)!;
assert.ok(finalEntry.events.includes("force_chain:n3"));
assert.ok(finalEntry.events.includes("sticky_to_box:n2"));
assert.equal(finalEntry.covered_mask, 3);

const report = {
  schema: "ra_star_moving_plug_gate_probe_v0",
  status: "local_positive_witness_not_integrated_candidate",
  layout_path: layoutPath,
  supplied_components: {
    H: "7 cells: spine x9,y13..17 + teeth x10,y13/17",
    R: "7 cells: initial x2,y16..20 + arm x3/x4,y17; right3 to x5 + arm x6/x7",
    T: "5 cells: initial x7,y17..21; R 第二拍黏住它，第三拍由 RT 刚体携至 x8",
  },
  invariant: "R vertical leg spans the entire y16..20 tunnel at every pre-final x, so the player stays on its left; T's only non-wall manual right origin (6,17) remains on the unreachable right side until R 第二拍占据 x6 并与 T 黏合；第三拍只能通过推 R 携 RT 整体右移。",
  preassembly_frontiers: preassemblyFrontiers,
  third_right: thirdEntry,
  intended_inputs: intendedInputs,
  intended_summary: {
    steps: intendedInputs.length,
    full_merge_step: 3,
    first_full_up_step: intended.entries.find((entry) => entry.index > 3 && entry.events.includes("move_sticky_rigid"))?.index ?? null,
    full_up_strokes: 9,
    win: intended.win,
    final_events: finalEntry.events,
  },
  initial_render: renderState(initial),
  final_render: intended.final_render,
  trace: intended.entries,
  evidence_boundary: "只证明局部 star bridge + moving plug 可在 runtime 中强制 R2 接 T、R3 携 RT 接 H 后才出现首个 up；尚未加入开场活塞路线、开放工场审美、H 的独立装载动作或完整 S0 图。",
};
await writeFile(path.join(runRoot, "star_moving_plug_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${layout}\n\n${JSON.stringify(report.intended_summary, null, 2)}\n`);

function makeLayout(): string {
  const width = 14;
  const height = 25;
  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
  const floor = new Set<string>();
  const open = (x: number, y: number): void => { floor.add(`${x},${y}`); };
  const openRow = (y: number, fromX: number, toX: number): void => {
    for (let x = fromX; x <= toX; x += 1) open(x, y);
  };
  const openColumn = (x: number, fromY: number, toY: number): void => {
    for (let y = fromY; y <= toY; y += 1) open(x, y);
  };

  // Anchors and ordinary-C terminal.
  for (const y of [1, 2]) { open(10, y); open(11, y); }
  for (const y of [4, 8]) { open(10, y); open(11, y); open(12, y); }

  // Full transport sweep: no wall below a staging component is ever entered during up.
  openColumn(9, 4, 17);      // H spine
  openColumn(10, 4, 17);     // moving H teeth envelope
  openColumn(5, 7, 20);      // R vertical leg
  openColumn(6, 7, 17);      // R main final-right envelope + arm
  openColumn(7, 8, 17);      // R arm
  openColumn(8, 8, 22);      // T and its sole final up origin

  // Five-row R tunnel.  The R vertical leg is a moving cut from the left player region.
  for (let y = 16; y <= 20; y += 1) openRow(y, 1, 8);
  openRow(17, 1, 10);

  // Exit that becomes reachable exactly when R has moved right three cells.
  openColumn(4, 7, 15);
  openRow(12, 4, 11);
  openRow(13, 4, 8);
  openColumn(11, 12, 22);
  openRow(22, 8, 11);

  for (const key of floor) {
    const [x, y] = key.split(",").map(Number);
    rows[y]![x] = ".";
  }

  rows[1]![10] = "P";
  rows[1]![11] = "L";
  rows[2]![10] = "S";
  rows[2]![11] = "B";
  for (const y of [4, 8]) { rows[y]![11] = "C"; rows[y]![12] = "G"; }

  // H is fixed at the staging axis for this local gate witness.
  for (let y = 13; y <= 17; y += 1) rows[y]![9] = "M";
  rows[13]![10] = "M";
  rows[17]![10] = "M";

  // R is the moving plug.  Its second right docks to T；第三次右推携 RT 整体把 T 送到 x8。
  for (let y = 16; y <= 20; y += 1) rows[y]![2] = "M";
  rows[17]![3] = "M";
  rows[17]![4] = "M";

  // T cannot move up/down because x7,y22 is wall.  Four left origins are walls; (6,17)
  // is floor but lies strictly beyond the moving R cut until R itself enters it.
  for (let y = 17; y <= 21; y += 1) rows[y]![7] = "M";
  for (let y = 18; y <= 21; y += 1) rows[y]![6] = "#";

  rows[16]![1] = "@";
  return rows.map((row) => row.join("")).join("\n");
}

function replayPrefix(initial: RealityAnchorState, inputs: InputId[]) {
  let state = initial;
  const entries = [];
  for (const [offset, input] of inputs.entries()) {
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    entries.push({
      index: offset + 1,
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      player: state.player,
      group_sizes: groupSizes(state),
      covered_mask: coveredMask(state),
      win: isWin(state),
    });
  }
  return {
    state,
    entries,
    illegal: entries.filter((entry) => !entry.legal),
    win: isWin(state),
    final_render: renderState(state),
  };
}

function objectActionFrontier(base: RealityAnchorState) {
  const queue = [base];
  const seen = new Set([stateKey(base)]);
  const actions: Array<Record<string, unknown>> = [];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    for (const input of ["up", "down", "left", "right"] as InputId[]) {
      const result = step(pkg.mechanic, current, input);
      if (!result.legal) continue;
      if (result.events.some((event) => event.startsWith("push_object:") || event.startsWith("pull_object:"))) {
        actions.push({ player: current.player, input, events: result.events });
        continue;
      }
      if (!result.events.includes("walk")) continue;
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push(result.state);
    }
  }
  return actions;
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return [{ x: 12, y: 4 }, { x: 12, y: 8 }].reduce(
    (mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask,
    0,
  );
}

function groupSizes(state: RealityAnchorState): number[] {
  return state.stickyGroups.map((group) => group.length).sort((left, right) => left - right);
}

function repeat(input: InputId, count: number): InputId[] {
  return Array.from({ length: count }, () => input);
}
