import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { LevelDoc, Point } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  parseLevel,
  renderState,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const runRoot = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_adversary",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));

const hrLeak = parse("hr_exposed_origin", makeLayout({ kind: "hr_leak" }));
const enterLeak = step(pkg.mechanic, hrLeak, "right");
assert.equal(enterLeak.legal, true);
assert.deepEqual(enterLeak.state.player, { x: 7, y: 18 });
assert.equal(forceModeAt(enterLeak.state, enterLeak.state.player), "push");
const liftHr = step(pkg.mechanic, enterLeak.state, "up");
assert.equal(liftHr.legal, true);
assert.ok(liftHr.events.some((event) => event.startsWith("push_object:sticky#")));
assert.ok(liftHr.events.includes("move_sticky_rigid"));
assert.deepEqual(groupSizes(enterLeak.state), [5, 14]);
assert.deepEqual(groupSizes(liftHr.state), [5, 14]);

const rtClear = parse("rt_clear", makeLayout({ kind: "rt", includeH: false, blockTUp: false }));
const hrtClear = parse("hrt_clear", makeLayout({ kind: "rt", includeH: true, blockTUp: false }));
const rtClearUp = step(pkg.mechanic, rtClear, "up");
const hrtClearUp = step(pkg.mechanic, hrtClear, "up");
assert.equal(rtClearUp.legal, true);
assert.equal(hrtClearUp.legal, true);
assert.deepEqual(groupSizes(rtClear), [12]);
assert.deepEqual(groupSizes(hrtClear), [19]);

const rtBlocked = parse("rt_blocked", makeLayout({ kind: "rt", includeH: false, blockTUp: true }));
const hrtBlocked = parse("hrt_blocked", makeLayout({ kind: "rt", includeH: true, blockTUp: true }));
const rtBlockedUp = step(pkg.mechanic, rtBlocked, "up");
const hrtBlockedUp = step(pkg.mechanic, hrtBlocked, "up");
assert.equal(rtBlockedUp.legal, false);
assert.equal(hrtBlockedUp.legal, false);
assert.equal(rtBlockedUp.reason, "force_blocked");
assert.equal(hrtBlockedUp.reason, "force_blocked");

const audit = {
  schema: "ra_preassembly_gate_local_frontier_probe_v1",
  quantifier: "只覆盖拟议固定朝向 H/R/T 的两个局部 pose；不是完整 S0 可达图",
  hr_exposed_origin: {
    player_start: hrLeak.player,
    enter_input: "right",
    force_origin: enterLeak.state.player,
    force_mode: forceModeAt(enterLeak.state, enterLeak.state.player),
    lift_input: "up",
    lift_legal: liftHr.legal,
    lift_events: liftHr.events,
    group_sizes_before: groupSizes(enterLeak.state),
    group_sizes_after: groupSizes(liftHr.state),
    before_lift: renderState(enterLeak.state),
    after_lift: renderState(liftHr.state),
  },
  same_pose_monotonicity: {
    clear: {
      rt: compact(rtClear, rtClearUp),
      hrt: compact(hrtClear, hrtClearUp),
    },
    block_at_3_21: {
      rt: compact(rtBlocked, rtBlockedUp),
      hrt: compact(hrtBlocked, hrtBlockedUp),
    },
    conclusion: "同一 R/T pose、同一 T 下缘施力源下，清空 T 上方则 RT/HRT 都可上推；在 T 目标格加墙则 RT/HRT 都 force_blocked。添加 H 不能把已有的碰撞非法翻成合法。",
  },
};

await mkdir(runRoot, { recursive: true });
await writeFile(path.join(runRoot, "local_frontier_audit.json"), `${JSON.stringify(audit, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  hr_exposed_origin: {
    lift_legal: audit.hr_exposed_origin.lift_legal,
    lift_events: audit.hr_exposed_origin.lift_events,
  },
  same_pose_monotonicity: audit.same_pose_monotonicity,
}, null, 2)}\n`);

function makeLayout(config:
  | { kind: "hr_leak" }
  | { kind: "rt"; includeH: boolean; blockTUp: boolean }): string {
  const width = 14;
  const height = 25;
  const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) rows[y]![x] = ".";
  }
  const glyph = (point: Point, value: string): void => {
    rows[point.y]![point.x] = value;
  };
  glyph({ x: 8, y: 1 }, "P");
  glyph({ x: 9, y: 1 }, "L");
  glyph({ x: 8, y: 2 }, "S");
  glyph({ x: 9, y: 2 }, "B");
  glyph({ x: 9, y: 4 }, "C");
  glyph({ x: 10, y: 4 }, "G");

  const addH = (): void => {
    for (let y = 13; y <= 17; y += 1) glyph({ x: 7, y }, "M");
    glyph({ x: 8, y: 13 }, "M");
    glyph({ x: 8, y: 17 }, "M");
  };
  const addR = (): void => {
    for (let y = 18; y <= 21; y += 1) glyph({ x: 8, y }, "M");
    for (let y = 19; y <= 21; y += 1) glyph({ x: 7, y }, "M");
  };

  if (config.kind === "hr_leak") {
    addH();
    addR();
    for (let x = 2; x <= 6; x += 1) glyph({ x, y: 22 }, "M");
    glyph({ x: 6, y: 18 }, "@");
  } else {
    if (config.includeH) addH();
    addR();
    for (let x = 3; x <= 7; x += 1) glyph({ x, y: 22 }, "M");
    if (config.blockTUp) glyph({ x: 3, y: 21 }, "#");
    glyph({ x: 3, y: 23 }, "@");
  }
  return rows.map((row) => row.join("")).join("\n");
}

function parse(id: string, layout: string): RealityAnchorState {
  return parseLevel({ id, title: id, layout } satisfies LevelDoc);
}

function groupSizes(state: RealityAnchorState): number[] {
  return state.stickyGroups.map((group) => group.length).sort((left, right) => left - right);
}

function compact(state: RealityAnchorState, result: ReturnType<typeof step>) {
  return {
    group_sizes: groupSizes(state),
    player: state.player,
    force_mode: forceModeAt(state, state.player),
    up_legal: result.legal,
    reason: result.reason ?? null,
    events: result.events,
  };
}
