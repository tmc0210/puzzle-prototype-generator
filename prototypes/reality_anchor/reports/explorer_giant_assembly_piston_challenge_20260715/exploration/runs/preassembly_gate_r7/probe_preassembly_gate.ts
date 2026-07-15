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
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7",
);
await mkdir(path.join(root, "layouts"), { recursive: true });

const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const width = 14;
const height = 27;
const pistons: Point[] = [{ x: 10, y: 4 }, { x: 10, y: 8 }];
const goals: Point[] = [{ x: 11, y: 4 }, { x: 11, y: 8 }];

const floor = new Set<string>();
const open = (x: number, y: number): void => { floor.add(`${x},${y}`); };

// P/L 与 B/S 保持原 ordinary-C 终端的共同竖边界 x=9|10。
for (const y of [1, 2]) {
  open(9, y);
  open(10, y);
}

// 开局单格竖井：玩家只能先经过两个 ordinary-C 直推接口。
for (let y = 3; y <= 22; y += 1) open(8, y);
for (let y = 4; y <= 17; y += 1) open(9, y);
for (const y of [4, 8]) {
  open(10, y);
  open(11, y);
}

// H 最终下压到 topY=13 后，才在左侧 row12 打开绕行路线。
// 终态 R 底足 + T 门齿会重新占满 row12 的 x4..8，故这扇门只服务于预合体相位。
for (let y = 13; y <= 25; y += 1) open(3, y);

// 完整 HRT 的纵向扫掠体积。固定阴影列不会描出短 H 的两个齿。
for (let y = 13; y <= 22; y += 1) {
  for (let x = 5; x <= 8; x += 1) open(x, y);
}
open(5, 12);
for (let y = 11; y <= 21; y += 1) open(6, y);
for (let y = 12; y <= 21; y += 1) open(7, y);

// T 从下方只上移一格完成最后合体；左外环绕到 x5,y24，避开 x8,y24 的下推止挡。
open(5, 24);
for (let x = 3; x <= 5; x += 1) open(x, 25);

// 完整注册后的唯一 +x 施力口袋。
open(4, 13);
open(4, 14);

const rows = Array.from({ length: height }, () => Array.from({ length: width }, () => "#"));
for (const key of floor) {
  const [x, y] = key.split(",").map(Number);
  rows[y]![x] = ".";
}

rows[1]![9] = "P";
rows[1]![10] = "L";
rows[2]![9] = "S";
rows[2]![10] = "B";
rows[3]![8] = "@";
for (const piston of pistons) rows[piston.y]![piston.x] = "C";
for (const goal of goals) rows[goal.y]![goal.x] = "G";

// 用户确认的 7 格短 H；它先作为竖井活塞向下三格，而非从左横移。
for (let y = 10; y <= 14; y += 1) rows[y]![8] = "M";
rows[10]![9] = "M";
rows[14]![9] = "M";

// 7 格 R：一列四格主梁加四格底足（与主梁底格重叠计数）。底足避开 x7,y10/11，允许窄井封死 H 的前两拍。
for (let y = 18; y <= 21; y += 1) rows[y]![8] = "M";
for (let x = 5; x <= 7; x += 1) rows[21]![x] = "M";

// 4 格 T/闩：在 HR 底足下一行生成新把手；其未 dock 时，R 底足后方仍是静态墙。
for (let x = 5; x <= 8; x += 1) rows[23]![x] = "M";

const layout = rows.map((row) => row.join("")).join("\n");
const layoutPath = path.join(root, "layouts/preassembly_gate_r7_v0.layout.txt");
await writeFile(layoutPath, `${layout}\n`, "utf8");
const initial = parseLevel({ id: "preassembly_gate_r7_v0", title: "preassembly_gate_r7_v0", layout } satisfies LevelDoc);

assert.deepEqual(
  initial.stickyGroups.map((group) => group.length).sort((a, b) => a - b),
  [4, 7, 7],
  "初态必须恰有 H7/R7/T4 三个实际供应组件",
);

const intendedInputs: InputId[] = [
  // 两个 C 都顺手直推一次；covered 态只有反向 L-pull。
  "down", "right", "right", "left", "left",
  "down", "down", "down", "down", "right", "right", "left", "left",
  // H 在窄井中下压三格；第三格才与 R 合体并打开 row12 右门。
  "down", "down", "down", "down",
  // 穿过刚打开的左门，沿外环去 T 的下方。
  "left", "left", "left",
  "down", "left", "left",
  "down", "down", "down", "down", "down", "down",
  "down", "down", "down", "down", "down", "down",
  "right", "right",
  "up",
  // T 上推一格同时合并 HR；玩家已经站在完整巨构唯一的纵推面下。
  "up",
  // 完整 18 格 HRT 连续上送九格。
  "up", "up", "up", "up", "up", "up", "up", "up", "up",
  // 登记后绕到唯一右推口袋，同时推动两个 ordinary-C。
  "left", "up", "right",
];

const trace = runTrace(initial, intendedInputs);
assert.equal(trace.illegal.length, 0, `正解轨迹含非法输入：${JSON.stringify(trace.illegal, null, 2)}`);
assert.equal(trace.win, true, "正解轨迹必须获胜");

const openingPushes = trace.entries.filter((entry) =>
  entry.events.some((event) => event.startsWith("push_object:crate#"))
);
const openingPulls = trace.entries.filter((entry) =>
  entry.events.some((event) => event.startsWith("pull_object:crate#"))
);
assert.equal(openingPushes.length, 2);
assert.equal(openingPulls.length, 2);
assert.deepEqual(openingPushes.map((entry) => entry.coveredMask), [1, 2]);
assert.deepEqual(openingPulls.map((entry) => entry.coveredMask), [0, 0]);

const directCoveredActionTables = {
  upper: actionTable(stateAfter(initial, intendedInputs.slice(0, 3))),
  lower: actionTable(stateAfter(initial, intendedInputs.slice(0, 11))),
};
for (const [id, table] of Object.entries(directCoveredActionTables)) {
  assert.deepEqual(table.filter((entry) => entry.legal).map((entry) => entry.input), ["left"], `${id} covered 态并非唯一 L-pull`);
  assert.ok(table.find((entry) => entry.input === "left")?.events.some((event) => event.startsWith("pull_object:crate#")));
}

const mergeEntries = trace.entries.filter((entry) => entry.events.some((event) => event.startsWith("sticky_merge:")));
assert.equal(mergeEntries.length, 2, "必须恰有 H+R 与 HR+T 两次粘合事件");
assert.deepEqual(mergeEntries.map((entry) => entry.stickyGroupSizes), [[4, 14], [18]]);
const fullMergeStep = mergeEntries[1]!.index;
const stickyUpEntries = trace.entries.filter((entry) =>
  entry.input === "up" && entry.events.some((event) => event.startsWith("push_object:sticky#"))
);
assert.deepEqual(
  stickyUpEntries.filter((entry) => entry.index <= fullMergeStep).map((entry) => entry.index),
  [fullMergeStep],
  "T 的最后一格 dock 之外，完整合体前不应发生任何黏块上移",
);
const firstFullAscentStep = stickyUpEntries.find((entry) => entry.index > fullMergeStep)?.index ?? null;
assert.ok(firstFullAscentStep !== null, "完整合体后没有纵向上送");
assert.equal(
  trace.entries.filter((entry) =>
    entry.index > fullMergeStep && entry.input === "up"
    && entry.events.some((event) => event.startsWith("push_object:sticky#"))
  ).length,
  9,
  "完整巨构必须上送九格",
);

const finalEntry = trace.entries.at(-1)!;
assert.equal(finalEntry.forceModeBefore, "push");
assert.equal(finalEntry.coveredMask, 3);
assert.ok(finalEntry.events.includes("force_chain:n3"));
assert.ok(finalEntry.events.includes("sticky_to_box:n2"));
assert.equal(
  trace.entries.slice(0, -1).flatMap((entry) => entry.events).filter((event) =>
    event.startsWith("sticky_to_box:") || event.startsWith("box_to_sticky:")
    || event.startsWith("sticky_split:") || event.startsWith("anchor_boundary_shift:")
  ).length,
  0,
  "终局前不应发生 B/S 切分或锚点漂移",
);

const report = {
  schema: "ra_preassembly_gate_r7_probe_v0",
  layoutPath,
  geometry: {
    width,
    height,
    pistons,
    goals,
    suppliedComponents: {
      H: { size: 7, initialTopY: 10, dockTopY: 13, finalTopY: 4 },
      R: { size: 7, cells: "x8,y18..21 + x5..7,y21" },
      T: { size: 4, cells: "x5..8,y23", dock: "up1" },
    },
  },
  intendedInputs,
  summary: {
    steps: intendedInputs.length,
    win: trace.win,
    trialPushSteps: openingPushes.map((entry) => entry.index),
    trialPullSteps: openingPulls.map((entry) => entry.index),
    mergeSteps: mergeEntries.map((entry) => entry.index),
    fullMergeStep,
    firstFullAscentStep,
    fullAscentStrokes: 9,
    finalCoveredMask: finalEntry.coveredMask,
    finalEvents: finalEntry.events,
  },
  directCoveredActionTables,
  initialRender: renderState(initial),
  finalRender: trace.finalRender,
  trace: trace.entries,
};

await writeFile(path.join(root, "audit_v0.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${layout}\n\n${JSON.stringify(report.summary, null, 2)}\n`);

function runTrace(start: RealityAnchorState, inputs: InputId[]) {
  let state = start;
  const entries = inputs.map((input, offset) => {
    const before = state;
    const result = step(pkg.mechanic, state, input);
    if (result.legal) state = result.state;
    return {
      index: offset + 1,
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
  return {
    win: isWin(state),
    illegal: entries.filter((entry) => !entry.legal),
    finalRender: renderState(state),
    entries,
  };
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
    return {
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      events: result.events,
      coveredMaskAfter: coveredMask(result.legal ? result.state : state),
    };
  });
}

function coveredMask(state: RealityAnchorState): number {
  const occupied = new Set(state.crates.map(pointKey));
  for (const group of state.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return goals.reduce((mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask, 0);
}
