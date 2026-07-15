import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../../../../../src/core/types.js";
import {
  isWin,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root = path.resolve(
  "prototypes/reality_anchor/reports/explorer_giant_assembly_piston_challenge_20260715/exploration/runs/active_three_piece_gate",
);
const pkg = await loadPrototypePackage(path.resolve("prototypes/reality_anchor"));
const layout = (
  await readFile(path.join(root, "layouts", "escape_gate_v0.layout.txt"), "utf8")
).trimEnd();
const initial = parseLevel({ id: "escape_gate_v0", title: "escape_gate_v0", layout } satisfies LevelDoc);

let state = initial;
const trace: Array<Record<string, unknown>> = [];

apply("up", "R 上移一格；同拍连接 H 与 T");
if (state.stickyGroups.length !== 1 || state.stickyGroups[0]!.length !== 21) {
  throw new Error(`R dock 后不是唯一 21 格 full：${shapeSummary(state)}`);
}

walk({ x: 1, y: 15 }, "绕到 T 顶横把手左侧");
apply("right", "full 横移脱笼 1/2");
apply("right", "full 横移脱笼 2/2");

walk({ x: 8, y: 20 }, "绕到已脱笼 full 的下方 origin");
for (let index = 0; index < 9; index += 1) {
  apply("up", `full 连续上送 ${index + 1}/9`);
}

walk({ x: 3, y: 6 }, "绕到最终 T 把手左侧");
apply("right", "H 双齿同步推动两个 ordinary C");

if (!isWin(state) || covered(state).length !== 2) {
  throw new Error(`exact trace 未获胜：mask=${covered(state).join(";")}`);
}

const report = {
  status: "exact_runtime_witness_pass",
  scope: "actual H7/R7/T7；不是任意 polyomino；尚不是完整 supplied closure",
  components: {
    H: ["7,13", "8,13", "7,14", "7,15", "7,16", "7,17", "8,17"],
    R: ["3,19", "4,19", "5,19", "6,19", "7,19", "6,20", "7,20"],
    T: ["2,18", "2,17", "2,16", "2,15", "3,15", "4,15", "5,15"],
  },
  exact: {
    inputs: trace.map((item) => item.input),
    inputCount: trace.length,
    objectInputs: trace.filter((item) => item.kind === "object").map((item) => item.input),
    fullMergeStep: trace.findIndex((item) => item.fullSize === 21) + 1,
    horizontalEscapeObjectSteps: trace.filter((item) => item.note?.toString().startsWith("full 横移脱笼")).length,
    fullUpTransportSteps: trace.filter((item) => item.note?.toString().startsWith("full 连续上送")).length,
    win: isWin(state),
    covered: covered(state),
    trace,
    final: renderState(state),
  },
};

await writeFile(path.join(root, "escape_gate_v0_audit.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(
  `VERIFIED escape gate exact: ${trace.length} inputs / merge@${report.exact.fullMergeStep} / horizontal=2 / up=9 / win`,
);

function apply(input: InputId, note: string): void {
  const before = state;
  const result = step(pkg.mechanic, state, input);
  if (!result.legal) {
    throw new Error(`${note} 的 ${input} 非法：${result.reason}\n${renderState(state)}`);
  }
  state = result.state;
  trace.push({
    input,
    note,
    kind: result.events[0] === "walk" ? "walk" : "object",
    playerBefore: pointKey(before.player),
    playerAfter: pointKey(state.player),
    events: result.events,
    fullSize: Math.max(0, ...state.stickyGroups.map((group) => group.length)),
    covered: covered(state),
  });
}

function walk(target: { x: number; y: number }, note: string): void {
  const path = findWalkPath(state, target);
  if (!path) {
    throw new Error(`${note} 不可达：${pointKey(target)}\n${renderState(state)}`);
  }
  for (const input of path) apply(input, note);
}

function findWalkPath(start: RealityAnchorState, target: { x: number; y: number }): InputId[] | null {
  const inputs = ["up", "down", "left", "right"] as InputId[];
  const queue: Array<{ state: RealityAnchorState; path: InputId[] }> = [{ state: start, path: [] }];
  const seen = new Set([pointKey(start.player)]);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (pointKey(current.state.player) === pointKey(target)) return current.path;
    for (const input of inputs) {
      const result = step(pkg.mechanic, current.state, input);
      if (!result.legal || result.events[0] !== "walk") continue;
      const key = pointKey(result.state.player);
      if (seen.has(key)) continue;
      seen.add(key);
      queue.push({ state: result.state, path: [...current.path, input] });
    }
  }
  return null;
}

function covered(value: RealityAnchorState): string[] {
  const occupied = new Set([
    ...value.crates.map(pointKey),
    ...value.stickyGroups.flat().map(pointKey),
  ]);
  return [...value.goals].filter((goal) => occupied.has(goal)).sort();
}

function shapeSummary(value: RealityAnchorState): string {
  return JSON.stringify({
    key: stateKey(value),
    groups: value.stickyGroups.map((group) => group.length),
  });
}
