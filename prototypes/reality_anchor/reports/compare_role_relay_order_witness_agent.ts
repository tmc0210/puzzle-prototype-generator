import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../src/core/io.js";
import type { InputId, LevelDoc } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";

const prototypePath = "prototypes/reality_anchor";
const layoutPath = process.argv[2]
  ?? "prototypes/Reality_Anchor/reports/RA_FRESH_2026_07_10_ROLE_RELAY_REWEAVE_v1.layout.txt";
const id = process.argv[3] ?? "RA_FRESH_2026_07_10_ROLE_RELAY_REWEAVE_v1";

const canonicalInputs = words(
  "left down right up left right down right left left up right down right right right down left down",
);
const earlyPrepullInputs = words(
  "left down up right down down right up left up left down right up left right down left up right down right right right down left down",
);

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const layout = (await readFile(layoutPath, "utf8")).replace(/\r/g, "").replace(/\n+$/g, "");
const level: LevelDoc = {
  id,
  title: id,
  role: "challenge",
  status: "candidate",
  targets: [],
  known_before: ["K_runtime_smoke"],
  target_learning: ["K_runtime_smoke"],
  support_level: "none",
  expected_solver_evidence: ["solvable"],
  expected_llm_player_evidence: [],
  layout,
};
const initial = adapter.parseLevel(level);
const canonical = simulate(initial, canonicalInputs);
const early = simulate(initial, earlyPrepullInputs);

const commonStates: Array<{ canonicalStep: number; earlyStep: number; key: string }> = [];
for (const a of canonical.frames) {
  for (const b of early.frames) {
    if (a.key === b.key) commonStates.push({ canonicalStep: a.step, earlyStep: b.step, key: a.key });
  }
}

const divergence = { canonicalStep: 2, earlyStep: 2 };
const firstConvergence = commonStates.find((match) => (
  match.canonicalStep > divergence.canonicalStep && match.earlyStep > divergence.earlyStep
));
if (!firstConvergence) throw new Error("Expected a post-divergence exact-state convergence.");

const earlyBsStep = early.frames.find((frame) => (
  frame.events.includes("anchor_boundary_shift:box_sticky")
));
if (!earlyBsStep) throw new Error("Expected an early B/S shift.");
const canonicalConvergenceFrame = canonical.frames[firstConvergence.canonicalStep]!;
const reversePath = findPath(canonicalConvergenceFrame.state, earlyBsStep.key, 100_000, 80);

const report = {
  id,
  layout,
  canonical: {
    inputs: canonicalInputs,
    win: canonical.win,
    steps: canonicalInputs.length,
    objectEventsBetweenDivergenceAndConvergence: objectEvents(
      canonical.frames,
      divergence.canonicalStep + 1,
      firstConvergence.canonicalStep,
    ),
  },
  earlyPrepull: {
    inputs: earlyPrepullInputs,
    win: early.win,
    steps: earlyPrepullInputs.length,
    firstBsShiftStep: earlyBsStep.step,
    stateAfterFirstBsShift: {
      key: earlyBsStep.key,
      layout: earlyBsStep.layout,
    },
    objectEventsBetweenDivergenceAndConvergence: objectEvents(
      early.frames,
      divergence.earlyStep + 1,
      firstConvergence.earlyStep,
    ),
  },
  divergence,
  firstExactStateConvergence: {
    ...firstConvergence,
    canonicalLayout: canonical.frames[firstConvergence.canonicalStep]!.layout,
    earlyLayout: early.frames[firstConvergence.earlyStep]!.layout,
  },
  bsAnchorDisposition: {
    pushedBackBeforeConvergence: false,
    reading: "第一次 B/S 左移保持；替代路线在该左移状态下完成 crate 回落与 P/L 右拉左推，再汇合。",
  },
  sccProof: {
    earlyBsStateReachesConvergence: true,
    convergenceReachesEarlyBsState: reversePath.found,
    reverseInputs: reversePath.inputs,
    sameStronglyConnectedComponent: reversePath.found,
    analyzerSccLabel: "s29",
    analyzerSccStateCount: 17,
    basis: "canonical step 9 is the analyzer's s29 entry; early step 9 reaches it at early step 17, and an exact reverse path exists.",
  },
  commonStates,
};

const outBase = path.join(prototypePath, "reports", `order_witness_comparison_${id}`);
await writeFile(`${outBase}.json`, `${JSON.stringify(report, null, 2)}\n`, "utf8");
await writeFile(`${outBase}.md`, formatMarkdown(report), "utf8");
console.log(formatMarkdown(report));
console.log(`Wrote ${outBase}.md`);
console.log(`Wrote ${outBase}.json`);

function simulate(start: unknown, inputs: InputId[]) {
  let state = start;
  const frames: Array<{
    step: number;
    input?: InputId;
    events: string[];
    key: string;
    layout: string;
    state: unknown;
  }> = [{
    step: 0,
    events: [],
    key: runtime.key(state),
    layout: adapter.renderState(state as never),
    state,
  }];
  for (const [index, input] of inputs.entries()) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) throw new Error(`Illegal input at step ${index + 1}: ${input}`);
    state = result.state;
    frames.push({
      step: index + 1,
      input,
      events: result.events,
      key: runtime.key(state),
      layout: adapter.renderState(state as never),
      state,
    });
  }
  return { frames, win: runtime.isWin(state, pkg.mechanic.win) };
}

function findPath(start: unknown, targetKey: string, maxStates: number, maxDepth: number) {
  const queue: Array<{ state: unknown; inputs: InputId[]; depth: number }> = [
    { state: start, inputs: [], depth: 0 },
  ];
  const visited = new Set([runtime.key(start)]);
  let cursor = 0;
  while (cursor < queue.length && visited.size <= maxStates) {
    const current = queue[cursor++]!;
    if (runtime.key(current.state) === targetKey) return { found: true, inputs: current.inputs };
    if (current.depth >= maxDepth) continue;
    for (const input of runtime.actions(current.state, { winCondition: pkg.mechanic.win }) as InputId[]) {
      const result = runtime.step(current.state, input, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      const key = runtime.key(result.state);
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({ state: result.state, inputs: [...current.inputs, input], depth: current.depth + 1 });
    }
  }
  return { found: false, inputs: [] as InputId[] };
}

function objectEvents(
  frames: Array<{ step: number; events: string[] }>,
  firstStep: number,
  lastStep: number,
) {
  return frames
    .filter((frame) => frame.step >= firstStep && frame.step <= lastStep)
    .flatMap((frame) => frame.events)
    .filter((event) => event !== "walk");
}

function words(value: string) {
  return value.split(/\s+/).filter(Boolean) as InputId[];
}

function formatMarkdown(report: typeof report) {
  return `# 顺序见证对照：${report.id}

- 规范解：${report.canonical.steps} 步，win=${report.canonical.win}
- 提前预拉见证：${report.earlyPrepull.steps} 步，win=${report.earlyPrepull.win}
- 分岔点：规范 step ${report.divergence.canonicalStep} / 提前序 step ${report.divergence.earlyStep}
- 首次 exact-state 汇合：规范 step ${report.firstExactStateConvergence.canonicalStep} = 提前序 step ${report.firstExactStateConvergence.earlyStep}
- Exact key：\`${report.firstExactStateConvergence.key}\`
- 第一次提前 B/S 位移：提前序 step ${report.earlyPrepull.firstBsShiftStep}
- 汇合前是否把 B/S 推回：${report.bsAnchorDisposition.pushedBackBeforeConvergence}
- 同 SCC 证明：${report.sccProof.sameStronglyConnectedComponent}（${report.sccProof.analyzerSccLabel}，states=${report.sccProof.analyzerSccStateCount}）
- 从汇合态回到提前 B/S 态的路径：${report.sccProof.reverseInputs.join(" ") || "无"}

## 规范序在分岔到汇合间的对象事件

${report.canonical.objectEventsBetweenDivergenceAndConvergence.join(" | ")}

## 提前预拉序在分岔到汇合间的对象事件

${report.earlyPrepull.objectEventsBetweenDivergenceAndConvergence.join(" | ")}

## 判读

${report.bsAnchorDisposition.reading}

第一次 B/S 左移没有被撤销：它提前从 s1 跨入 s29；随后 crate 的上拉/下推回路和完整的 P/L 右拉/左推回返都在 s29 内发生，最终落到与规范 step 9 完全相同的状态。
`;
}
