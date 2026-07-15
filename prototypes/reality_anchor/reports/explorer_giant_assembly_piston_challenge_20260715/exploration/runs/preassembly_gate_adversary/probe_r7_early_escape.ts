import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  forceModeAt,
  isWin,
  parseLevel,
  pointKey,
  renderState,
  step,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const runRoot = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_adversary",
);
const sourceLayoutPath = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/preassembly_gate_r7/layouts/preassembly_gate_r7_v0.layout.txt",
);
const layout = (await readFile(sourceLayoutPath, "utf8")).trimEnd();
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
let state = parseLevel({ id: "preassembly_gate_r7_early_escape", title: "preassembly_gate_r7_early_escape", layout } satisfies LevelDoc);

const inputs: InputId[] = [
  // H 只下压一格；玩家从刚出现的 x7,y10 缺口逃入下场。
  ...repeat("down", 7), "left", ...repeat("down", 6), ...repeat("right", 3),
  // 从右外环绕到 T 下方。
  ...repeat("down", 9), ...repeat("left", 6), "up",
  // T up1 先并入 R；RT 再 up2 追接只下压一格的 H。
  ...repeat("up", 10),
  // 同一完整形已到注册高度，使用同一个 final right 获胜。
  "left", "up", "right",
];

const trace = [];
for (const [offset, input] of inputs.entries()) {
  const before = state;
  const result = step(pkg.mechanic, state, input);
  assert.equal(result.legal, true, `step ${offset + 1} ${input} 非法：${result.reason}`);
  state = result.state;
  trace.push({
    index: offset + 1,
    input,
    player_before: before.player,
    player_after: state.player,
    force_mode_before: forceModeAt(before, before.player),
    events: result.events,
    group_sizes: state.stickyGroups.map((group) => group.length).sort((left, right) => left - right),
    covered_mask: coveredMask(state),
    win: isWin(state),
  });
}

assert.equal(inputs.length, 46);
assert.equal(isWin(state), true);
assert.deepEqual(trace[6]!.events, ["push_object:sticky#2", "move_sticky_rigid"]);
assert.deepEqual(trace[7]!.player_after, { x: 7, y: 10 });
assert.deepEqual(trace[33]!.group_sizes, [7, 13]);
assert.ok(trace[33]!.events.includes("sticky_merge:n1"));
assert.deepEqual(trace[34]!.group_sizes, [7, 13]);
assert.deepEqual(trace[35]!.group_sizes, [20]);
assert.ok(trace[35]!.events.includes("sticky_merge:n1"));
assert.equal(trace.slice(36, 43).filter((entry) => entry.input === "up" && entry.events.includes("move_sticky_rigid")).length, 7);
assert.ok(trace[45]!.events.includes("force_chain:n3"));
assert.ok(trace[45]!.events.includes("sticky_to_box:n2"));
assert.equal(trace[45]!.covered_mask, 3);

const report = {
  schema: "ra_preassembly_gate_r7_early_escape_counterexample_v1",
  source_layout: sourceLayoutPath,
  inputs,
  compressed_inputs: "D7,L,D6,R3,D9,L6,U11,L,U,R",
  conclusion: "H 只下压 1 格即可从左缺口逃入下场；T 先并 R，RT 上送 2 格后追接 H，再以完整体上送 7 格并沿同一终拍获胜。",
  milestones: {
    h_down_once_step: 7,
    escape_left_step: 8,
    rt_merge_step: 34,
    pre_full_rt_up_steps: [35, 36],
    full_merge_step: 36,
    full_up_strokes_after_merge: 7,
    win_step: 46,
  },
  initial_render: renderState(parseLevel({ id: "r7_initial", title: "r7_initial", layout } satisfies LevelDoc)),
  final_render: renderState(state),
  trace,
};

await writeFile(path.join(runRoot, "r7_early_escape_counterexample.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  steps: inputs.length,
  win: isWin(state),
  compressed_inputs: report.compressed_inputs,
  milestones: report.milestones,
  final_events: trace.at(-1)?.events,
}, null, 2)}\n`);

function repeat(input: InputId, count: number): InputId[] {
  return Array.from({ length: count }, () => input);
}

function coveredMask(current: typeof state): number {
  const occupied = new Set(current.crates.map(pointKey));
  for (const group of current.stickyGroups) for (const cell of group) occupied.add(pointKey(cell));
  return [{ x: 11, y: 4 }, { x: 11, y: 8 }].reduce(
    (mask, goal, index) => occupied.has(pointKey(goal)) ? mask | (1 << index) : mask,
    0,
  );
}
