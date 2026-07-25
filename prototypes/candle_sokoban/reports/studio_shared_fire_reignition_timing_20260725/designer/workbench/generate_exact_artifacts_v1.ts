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
  "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/designer/exact/v1",
);
const layoutPath = path.join(exactRoot, "layout.txt");
const rawLayout = await readFile(layoutPath, "utf8");
const layout = rawLayout.replace(/\r/g, "").trimEnd();
const layoutSha256 = createHash("sha256").update(rawLayout, "utf8").digest("hex");
const candidateId = "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001";
const exactVersion = "v1";
const levelId = `${candidateId}_V1`;
const canonicalInputs: CandleAction[] = [
  "down",
  "right",
  "right",
  "right",
  "right",
  "down",
  "down",
  "left",
  "up",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "up",
];
const level: LevelDoc = {
  id: levelId,
  title: "共享火焰的时机",
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
  maxStates: 300000,
  graphMaxStates: 300000,
  counterfactualMaxStates: 300000,
});

type HistoryFlag = {
  name: string;
  bit: number;
  label: string;
};

const HISTORY_FLAGS: HistoryFlag[] = [
  { name: "wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "midcycle_reignite_from_shared_brazier", bit: 1 << 1, label: "midcycle_reignite" },
  { name: "shrink_to_len3", bit: 1 << 2, label: "shrink_len3" },
  { name: "shrink_to_len2", bit: 1 << 3, label: "shrink_len2" },
  { name: "shrink_to_len1", bit: 1 << 4, label: "shrink_len1" },
  { name: "terminal_brazier_and_receiver_ignite", bit: 1 << 5, label: "terminal_transfer" },
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
  throw new Error("存在没有完整保长—复燃—三次缩短—终端点火历史的胜利轨迹");
}
if (solutionFamily.winningMilestoneSignatures.length !== 1) {
  throw new Error("发现多个非等价胜利里程碑签名，不能发布唯一候选 exact");
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
  writeFile(path.join(exactRoot, "identity_counterfactuals.md"), formatIdentityCounterfactualsMarkdown(identityCounterfactuals), "utf8"),
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
  ].join(" ") + "\n",
);

type ProductNode = {
  state: CandleSokobanState;
  mask: number;
  order: string[];
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
      const advanced = advanceHistory(current.mask, current.order, transition.events);
      const next: ProductNode = {
        state: transition.state,
        mask: advanced.mask,
        order: advanced.order,
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
        prior.shortestInputs = [...prior.shortestInputs, ...next.shortestInputs].slice(0, 24);
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
    scope: "完整可达状态的单调历史产品图，胜利状态终止扩展",
    graph: {
      status: "complete",
      baseStateCount: baseStates.size,
      productStateCount: nodes.size,
      legalEdgeCount: legalEdges,
      winningProductStateCount: wins.length,
    },
    requiredHistory: {
      requiredMask: REQUIRED_HISTORY_MASK,
      everyWinningTraceHasAllRequiredFlags: wins.every((win) => (win.mask & REQUIRED_HISTORY_MASK) === REQUIRED_HISTORY_MASK),
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
      rawShortestInputRepresentatives: shortestWins.flatMap((win) => win.shortestInputs).slice(0, 24),
      representatives: shortestWins.slice(0, 24).map((win) => ({
        inputs: win.inputs,
        milestoneSignature: win.order.join(">"),
        finalState: renderState(win.state),
      })),
    },
    evidenceLimits: [
      "相同 runtime state 与相同单调里程碑历史合流；原始走位回环不单独计作逻辑解族。",
      "该产品图证明规范历史对所有胜利轨迹的必要性，不把图统计解释为审美或难度。",
      "终端单格蜡烛的点燃是共享烛芯的可见反馈，不把它描述为额外独立子题。",
    ],
  };
}

function productKey(node: Pick<ProductNode, "state" | "mask" | "order">): string {
  return `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}`;
}

function advanceHistory(maskBefore: number, orderBefore: string[], events: string[]): { mask: number; order: string[] } {
  let mask = maskBefore;
  const order = [...orderBefore];
  const add = (flag: HistoryFlag): void => {
    if ((mask & flag.bit) === 0) order.push(flag.label);
    mask |= flag.bit;
  };
  const wallDouse = events.some((event) => event === "extinguish_by_wall:candle#1");
  if (wallDouse) add(HISTORY_FLAGS[0]!);
  if (wallDouse || (mask & HISTORY_FLAGS[0]!.bit) !== 0) {
    if (events.some((event) => event === "ignite_from_brazier:candle#1:1,3")) {
      add(HISTORY_FLAGS[1]!);
    }
  }
  if ((mask & HISTORY_FLAGS[1]!.bit) !== 0) {
    if (events.includes("shrink:candle#1:len3")) add(HISTORY_FLAGS[2]!);
    if (events.includes("shrink:candle#1:len2")) add(HISTORY_FLAGS[3]!);
    if (events.includes("shrink:candle#1:len1")) add(HISTORY_FLAGS[4]!);
  }
  if (
    events.includes("light_brazier:4,2") &&
    events.some((event) => event === "ignite_from_wick:candle#single1:4,2")
  ) {
    add(HISTORY_FLAGS[5]!);
  }
  return { mask, order };
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
      id: "remove_wall_douse",
      relation: "删除遮住初始左烛芯的墙，检验主蜡烛是否仍能先熄灭并保长。",
      changes: [{ x: 1, y: 4, replacement: "." }],
    },
    {
      id: "shift_wall_right",
      relation: "把墙口向右错一格，检验第一步是否仍得到规范的墙灭火状态。",
      changes: [
        { x: 1, y: 4, replacement: "." },
        { x: 2, y: 4, replacement: "#" },
      ],
    },
    {
      id: "unlit_reignite_source",
      relation: "删除左侧已亮火盆，检验墙灭火后的规范中周期复燃是否仍有来源。",
      changes: [{ x: 1, y: 3, replacement: "." }],
    },
    {
      id: "remove_terminal_receiver",
      relation: "删除终端单格接收蜡烛，检验主链与最终火盆点亮是否仍可完成；该项专门记录可见 relay 的硬必要性边界。",
      changes: [{ x: 4, y: 1, replacement: "." }],
    },
    {
      id: "remove_target_brazier",
      relation: "删除最终待点火火盆，检验是否在没有终局消费目标时退化为已亮火盆开局。",
      changes: [{ x: 4, y: 2, replacement: "." }],
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
      maxStates: 300000,
      graphMaxStates: 300000,
      counterfactualMaxStates: 300000,
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
    scope: "当前 exact 的局部结构反事实；每个变体均以 Candle runtime 完整图读取",
    baseline: {
      layout,
      canonicalInputs,
      requiredHistory: solutionFamily.requiredHistory,
    },
    results,
    evidenceLimits: [
      "反事实只用于说明对象责任与作品身份边界，不把可解性或图规模直接当作审美结论。",
      "终端接收蜡烛删除后仍可能保留主链可解性；因此它被记录为可见接力反馈，而不是被夸大为独立硬门。",
      "难度与审美仍需独立审查，Designer 自查不产生 review verdict。",
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

function formatIdentityCounterfactualsMarkdown(report: Awaited<ReturnType<typeof enumerateIdentityCounterfactuals>>): string {
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
      `- 完整图：${result.graph.status}；states=${result.graph.reachableStateCount}；edges=${result.graph.legalTransitionCount}；wins=${result.graph.winStateCount}`,
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
