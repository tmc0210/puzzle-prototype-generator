import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";
import { analyzeLevel, formatLevelAnalysisMarkdown } from "../../../../../../src/workflows/levelAnalyzer.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const exactRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725/candidate/versions/v3",
);
const layoutPath = path.join(exactRoot, "layout.txt");
const rawLayout = await readFile(layoutPath, "utf8");
const layout = rawLayout.replace(/\r/g, "").trimEnd();
const layoutSha256 = createHash("sha256").update(rawLayout, "utf8").digest("hex");
const candidateId = "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001";
const exactVersion = "v3";
const levelId = `${candidateId}_V3`;
const canonicalInputs: CandleAction[] = [
  "up", "up", "up", "up", "left",
  "up", "down", "up", "left", "down",
  "up", "right", "right", "right", "right",
  "left", "left", "down", "left", "left", "down",
  "down", "right", "down", "left",
];
const level: LevelDoc = {
  id: levelId,
  title: "墙灭火与复燃参与时机·终盘",
  global_burn_cycle: 5,
  layout,
  win: { type: "all_braziers_lit" },
};

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
const execution = replayInputSequence(
  adapter,
  runtime,
  initial,
  canonicalInputs,
  { winCondition: level.win },
  level.win,
);
const replay = buildInputSequenceReplayReport(
  {
    id: level.id,
    prototype: pkg.mechanic.id,
    layoutSource: layoutPath,
    layout,
    winCondition: level.win,
  },
  execution,
);
const analysis = analyzeLevel(pkg, level, {
  maxStates: 500000,
  graphMaxStates: 500000,
  counterfactualMaxStates: 500000,
});

type HistoryFlag = {
  name: string;
  bit: number;
  label?: string;
};

const HISTORY_FLAGS: HistoryFlag[] = [
  { name: "target_wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "target_static_reignite", bit: 1 << 1, label: "static_reignite" },
  { name: "target_shrink_to_len3_after_reignite", bit: 1 << 2, label: "target_len3" },
  { name: "auxiliary_axis_push", bit: 1 << 3 },
  { name: "upper_brazier_after_auxiliary_push", bit: 1 << 4 },
  { name: "target_shrink_to_len2", bit: 1 << 5, label: "target_len2" },
  { name: "stopper_shrink_to_singleton", bit: 1 << 6 },
  { name: "target_shrink_to_len1", bit: 1 << 7, label: "target_len1_and_gate_open" },
  { name: "final_brazier_after_singleton", bit: 1 << 8, label: "singleton_delivery" },
  { name: "stopper_burn_out_at_final", bit: 1 << 9 },
];
const REQUIRED_HISTORY_MASK = HISTORY_FLAGS.reduce((mask, flag) => mask | flag.bit, 0);
const solutionFamily = enumerateSolutionFamily(level);
const identityCounterfactuals = await enumerateIdentityCounterfactuals();

if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error("规范回放没有以合法胜利结束");
}
if (analysis.graph.status !== "complete") {
  throw new Error(`完整图未完成：${analysis.graph.status}`);
}
if (!solutionFamily.requiredHistory.everyWinningTraceHasAllRequiredFlags) {
  throw new Error("存在缺少墙灭火、复燃、辅助搬运、单格止挡窗口或单格交付历史的胜利轨迹");
}
if (solutionFamily.winningMilestoneSignatures.length !== 1) {
  throw new Error(
    `发现多个胜利里程碑签名，不能发布唯一候选 exact：${JSON.stringify(solutionFamily.winningMilestoneSignatures)}`,
  );
}

await mkdir(exactRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(exactRoot, "canonical_replay.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replay), "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.md"), formatLevelAnalysisMarkdown(analysis), "utf8"),
  writeFile(path.join(exactRoot, "solution_family.json"), `${JSON.stringify(solutionFamily, null, 2)}\n`, "utf8"),
  writeFile(
    path.join(exactRoot, "identity_counterfactuals.json"),
    `${JSON.stringify(identityCounterfactuals, null, 2)}\n`,
    "utf8",
  ),
  writeFile(
    path.join(exactRoot, "identity_counterfactuals.md"),
    formatIdentityCounterfactualsMarkdown(identityCounterfactuals),
    "utf8",
  ),
]);

process.stdout.write(
  [
    `exact=${exactVersion}`,
    `layout_sha256=${layoutSha256}`,
    `replay_complete=${!execution.stoppedAtIllegalAction}`,
    `win=${execution.final.isWin}`,
    `graph=${analysis.graph.status}`,
    `states=${analysis.graph.reachableStateCount}`,
    `edges=${analysis.graph.legalTransitionCount}`,
    `wins=${analysis.graph.winStateCount}`,
    `product_states=${solutionFamily.graph.productStateCount}`,
    `product_wins=${solutionFamily.graph.winningProductStateCount}`,
    `raw_shortest=${solutionFamily.shortestWinningFamily.rawShortestInputCount}`,
    `signatures=${solutionFamily.winningMilestoneSignatures.length}`,
  ].join(" ") + "\n",
);

type ProductNode = {
  state: CandleSokobanState;
  mask: number;
  order: string[];
  reignitePhase: number | null;
  inputs: CandleAction[];
  depth: number;
  shortestWays: bigint;
  shortestInputs: CandleAction[][];
};

function enumerateSolutionFamily(currentLevel: LevelDoc) {
  const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
  const start: ProductNode = {
    state: parseLevel(currentLevel),
    mask: 0,
    order: [],
    reignitePhase: null,
    inputs: [],
    depth: 0,
    shortestWays: 1n,
    shortestInputs: [[]],
  };
  const queue: ProductNode[] = [start];
  const nodes = new Map<string, ProductNode>([[productKey(start), start]]);
  const baseStates = new Set<string>([stateKey(start.state)]);
  const wins: ProductNode[] = [];
  let legalEdges = 0;

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, currentLevel.win!)) {
      wins.push(current);
      continue;
    }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: currentLevel.win });
      if (!transition.legal) continue;
      legalEdges += 1;
      const advanced = advanceHistory(
        current.mask,
        current.order,
        current.reignitePhase,
        current.state.globalBurnCountdown,
        transition.events,
      );
      const next: ProductNode = {
        state: transition.state,
        mask: advanced.mask,
        order: advanced.order,
        reignitePhase: advanced.reignitePhase,
        inputs: [...current.inputs, action],
        depth: current.depth + 1,
        shortestWays: current.shortestWays,
        shortestInputs: current.shortestInputs.map((inputs) => [...inputs, action]),
      };
      baseStates.add(stateKey(next.state));
      const key = productKey(next);
      const prior = nodes.get(key);
      if (!prior) {
        nodes.set(key, next);
        queue.push(next);
      } else if (prior.depth === next.depth) {
        prior.shortestWays += next.shortestWays;
        prior.shortestInputs = [...prior.shortestInputs, ...next.shortestInputs].slice(0, 32);
      }
    }
  }

  if (wins.length === 0) throw new Error("完整产品图没有胜利状态");
  const minWinDepth = Math.min(...wins.map((win) => win.depth));
  const shortestWins = wins.filter((win) => win.depth === minWinDepth);
  const signatureMap = new Map<string, ProductNode[]>();
  for (const win of wins) {
    const signature = win.order.join(">");
    const matching = signatureMap.get(signature) ?? [];
    matching.push(win);
    signatureMap.set(signature, matching);
  }
  const requiredFlags = HISTORY_FLAGS.map((flag) => ({
    name: flag.name,
    allWinningTraces: wins.every((win) => (win.mask & flag.bit) !== 0),
    violatingWinningTraceCount: wins.filter((win) => (win.mask & flag.bit) === 0).length,
  }));

  return {
    candidateId,
    exactVersion,
    layoutSha256,
    scope: "完整可达状态的单调历史产品图；胜利状态终止扩展",
    graph: {
      status: "complete",
      baseStateCount: baseStates.size,
      productStateCount: nodes.size,
      legalEdgeCount: legalEdges,
      winningProductStateCount: wins.length,
    },
    requiredHistory: {
      requiredMask: REQUIRED_HISTORY_MASK,
      everyWinningTraceHasAllRequiredFlags: wins.every(
        (win) => (win.mask & REQUIRED_HISTORY_MASK) === REQUIRED_HISTORY_MASK,
      ),
      flags: requiredFlags,
    },
    winningMilestoneSignatures: [...signatureMap.entries()].map(([signature, matching]) => ({
      signature,
      winningProductStates: matching.length,
      minimumDepth: Math.min(...matching.map((win) => win.depth)),
      representativeInputs: matching[0]!.inputs,
    })),
    shortestWinningFamily: {
      cost: minWinDepth,
      productStates: shortestWins.length,
      rawShortestInputCount: shortestWins.reduce((sum, win) => sum + win.shortestWays, 0n).toString(),
      rawShortestInputRepresentatives: shortestWins.flatMap((win) => win.shortestInputs).slice(0, 32),
      representatives: shortestWins.slice(0, 32).map((win) => ({
        inputs: win.inputs,
        milestoneSignature: win.order.join(">"),
        finalState: renderState(win.state),
      })),
    },
    timingVariants: enumerateWinningReignitePhases(wins),
    evidenceLimits: [
      "相同 runtime state 与相同单调历史合流；原始走位回环不单独计作逻辑解族。",
      "胜解允许在不同 countdown 接触火源，但都必须及时复燃并参加同一组三次目标缩短；这里把它们列作时机输入变体，不声称接触相位唯一。",
      "上盆交付可以与静态复燃前后换序；它仍由同一 candle#4 完成，并与同一目标长度链在后续边界合流，因此不把这一独立准备任务的交换顺序计作第二作品身份。",
      "产品图证明规范历史对所有胜利轨迹的必要性，不把图统计解释为审美或难度。",
    ],
  };
}

function enumerateWinningReignitePhases(wins: ProductNode[]) {
  const phases = new Map<string, { winningProductStates: number; minimumDepth: number; representativeInputs: CandleAction[] }>();
  for (const win of wins) {
    const key = win.reignitePhase === null ? "unknown" : `t${win.reignitePhase}`;
    const prior = phases.get(key);
    if (!prior) {
      phases.set(key, { winningProductStates: 1, minimumDepth: win.depth, representativeInputs: win.inputs });
    } else {
      prior.winningProductStates += 1;
      prior.minimumDepth = Math.min(prior.minimumDepth, win.depth);
    }
  }
  return [...phases.entries()].map(([reigniteCountdownBeforeInput, value]) => ({
    reigniteCountdownBeforeInput,
    ...value,
  }));
}

function productKey(node: Pick<ProductNode, "state" | "mask" | "order" | "reignitePhase">): string {
  return `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}|RP:${node.reignitePhase ?? "none"}`;
}

function advanceHistory(
  maskBefore: number,
  orderBefore: string[],
  reignitePhaseBefore: number | null,
  countdownBefore: number,
  events: string[],
): { mask: number; order: string[]; reignitePhase: number | null } {
  let mask = maskBefore;
  const order = [...orderBefore];
  let reignitePhase = reignitePhaseBefore;
  const add = (flag: HistoryFlag): void => {
    if ((mask & flag.bit) === 0 && flag.label) order.push(flag.label);
    mask |= flag.bit;
  };

  if (events.includes("extinguish_by_wall:candle#1")) add(HISTORY_FLAGS[0]!);
  if (
    (mask & HISTORY_FLAGS[0]!.bit) !== 0 &&
    events.includes("ignite_from_brazier:candle#1:2,3")
  ) {
    add(HISTORY_FLAGS[1]!);
    reignitePhase ??= countdownBefore;
  }
  if (
    (mask & HISTORY_FLAGS[1]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len3")
  ) add(HISTORY_FLAGS[2]!);
  if (events.includes("push_axis:candle#4")) add(HISTORY_FLAGS[3]!);
  if (
    (mask & HISTORY_FLAGS[3]!.bit) !== 0 &&
    events.includes("light_brazier:12,1")
  ) add(HISTORY_FLAGS[4]!);
  if (
    (mask & HISTORY_FLAGS[2]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len2")
  ) add(HISTORY_FLAGS[5]!);
  if (events.includes("shrink:candle#3:len1")) add(HISTORY_FLAGS[6]!);
  if (
    (mask & HISTORY_FLAGS[5]!.bit) !== 0 &&
    (mask & HISTORY_FLAGS[6]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len1")
  ) add(HISTORY_FLAGS[7]!);
  if (
    (mask & HISTORY_FLAGS[7]!.bit) !== 0 &&
    events.includes("light_brazier:4,5")
  ) add(HISTORY_FLAGS[8]!);
  if (
    (mask & HISTORY_FLAGS[8]!.bit) !== 0 &&
    events.includes("burn_out:candle#3")
  ) add(HISTORY_FLAGS[9]!);
  return { mask, order, reignitePhase };
}

type CounterfactualResult = {
  id: string;
  relation: string;
  changedCells: Array<{ x: number; y: number; replacement: string }>;
  layout: string;
  graph: { status: string; reachableStateCount: number; legalTransitionCount: number; winStateCount: number };
  solve: { found: boolean; cost: number | null; inputs: string[]; events: string[] };
};

async function enumerateIdentityCounterfactuals() {
  const variants: Array<{
    id: string;
    relation: string;
    changes: Array<{ x: number; y: number; replacement: string }>;
  }> = [
    {
      id: "open_initial_wick_wall",
      relation: "删除目标烛首推后的左烛芯墙，检验主动墙灭火与首轮避烧责任。",
      changes: [{ x: 2, y: 2, replacement: "." }],
    },
    {
      id: "unlit_reignite_source",
      relation: "删除 (2,3) 已亮火盆，检验目标烛静态复燃来源。",
      changes: [{ x: 2, y: 3, replacement: "." }],
    },
    {
      id: "remove_auxiliary_candle",
      relation: "删除 candle#4，检验远端上盆是否确由跨轮辅助搬运承担。",
      changes: [
        { x: 8, y: 1, replacement: "." },
        { x: 9, y: 1, replacement: "." },
        { x: 10, y: 1, replacement: "." },
      ],
    },
    {
      id: "remove_transient_stopper",
      relation: "删除 candle#3，检验第四轮单格止挡窗口与目标终点停位。",
      changes: [
        { x: 2, y: 6, replacement: "." },
        { x: 3, y: 6, replacement: "." },
        { x: 4, y: 6, replacement: "." },
        { x: 5, y: 6, replacement: "." },
        { x: 6, y: 6, replacement: "." },
      ],
    },
    {
      id: "remove_fire_grate",
      relation: "删除 row4 三只既燃火盆 footprint 筛，检验较长目标烛能否提前进入终点行。",
      changes: [
        { x: 3, y: 4, replacement: "." },
        { x: 4, y: 4, replacement: "." },
        { x: 5, y: 4, replacement: "." },
      ],
    },
    {
      id: "remove_upper_goal",
      relation: "删除 (12,1) 待点火盆，界定辅助搬运目标对胜利条件的职责。",
      changes: [{ x: 12, y: 1, replacement: "." }],
    },
    {
      id: "remove_final_goal",
      relation: "删除 (4,5) 待点火盆，检验 singleton 停位 consumer 被拿走后的退化。",
      changes: [{ x: 4, y: 5, replacement: "." }],
    },
  ];
  const results: CounterfactualResult[] = [];
  for (const variant of variants) {
    const variantLayout = applyChanges(layout, variant.changes);
    const variantLevel: LevelDoc = {
      id: `${levelId}_CF_${variant.id}`,
      title: variant.id,
      global_burn_cycle: 5,
      layout: variantLayout,
      win: { type: "all_braziers_lit" },
    };
    const variantAnalysis = analyzeLevel(pkg, variantLevel, {
      maxStates: 500000,
      graphMaxStates: 500000,
      counterfactualMaxStates: 500000,
    });
    results.push({
      id: variant.id,
      relation: variant.relation,
      changedCells: variant.changes,
      layout: variantLayout,
      graph: {
        status: variantAnalysis.graph.status,
        reachableStateCount: variantAnalysis.graph.reachableStateCount,
        legalTransitionCount: variantAnalysis.graph.legalTransitionCount,
        winStateCount: variantAnalysis.graph.winStateCount,
      },
      solve: {
        found: variantAnalysis.solution.found,
        cost: variantAnalysis.solution.cost,
        inputs: variantAnalysis.solution.inputs,
        events: variantAnalysis.solution.events,
      },
    });
  }
  return {
    candidateId,
    exactVersion,
    layoutSha256,
    scope: "当前 exact 的局部结构反事实；每个变体均由 Candle runtime 图读取",
    baseline: {
      layout,
      canonicalInputs,
      requiredHistory: solutionFamily.requiredHistory,
    },
    results,
    evidenceLimits: [
      "反事实只说明对象职责与作品身份边界，不把图规模直接当作审美或难度。",
      "删除目标火盆会改变 all_braziers_lit 的目标集合；这些变体只用于显示对应交付段被拿走后的退化。",
      "难度与审美仍须独立审查，Designer 自查不产生 review verdict。",
    ],
  };
}

function applyChanges(source: string, changes: Array<{ x: number; y: number; replacement: string }>): string {
  const rows = source.split("\n");
  for (const change of changes) {
    const cells = [...rows[change.y]!];
    cells[change.x] = change.replacement;
    rows[change.y] = cells.join("");
  }
  return rows.join("\n");
}

function formatIdentityCounterfactualsMarkdown(
  report: Awaited<ReturnType<typeof enumerateIdentityCounterfactuals>>,
): string {
  return [
    `# 作品身份反事实：${report.candidateId} ${report.exactVersion}`,
    "",
    "## 基线",
    "",
    "```text",
    report.baseline.layout,
    "```",
    "",
    `- 规范输入：${report.baseline.canonicalInputs.join(" ")}`,
    `- 所有胜利轨迹必要历史：${report.baseline.requiredHistory.everyWinningTraceHasAllRequiredFlags ? "是" : "否"}`,
    "",
    ...report.results.flatMap((result) => [
      `## ${result.id}`,
      "",
      `- 关系：${result.relation}`,
      `- 图：${result.graph.status}；states=${result.graph.reachableStateCount}；edges=${result.graph.legalTransitionCount}；wins=${result.graph.winStateCount}`,
      `- 最短可解：${result.solve.found ? `是，cost=${result.solve.cost}` : "否"}`,
      `- 最短输入：${result.solve.inputs.length > 0 ? result.solve.inputs.join(" ") : "none"}`,
      "",
      "```text",
      result.layout,
      "```",
      "",
    ]),
    "## 证据边界",
    "",
    ...report.evidenceLimits.map((limit) => `- ${limit}`),
    "",
  ].join("\n");
}
