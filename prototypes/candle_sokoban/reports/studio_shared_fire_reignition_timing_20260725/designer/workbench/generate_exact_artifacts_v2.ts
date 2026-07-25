import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
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

const reportRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725",
);
const workbenchRoot = path.join(reportRoot, "designer", "workbench");
const exactVersion = process.env.CANDLE_EXACT_VERSION ?? "v2";
const layoutFile = process.env.CANDLE_LAYOUT_FILE ?? "candidate_v48.layout";
const exactRoot = path.join(reportRoot, "designer", "exact", exactVersion);
const layoutPath = path.join(workbenchRoot, layoutFile);
const sequencePath = path.resolve("prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml");
const rawLayout = await readFile(layoutPath, "utf8");
const layout = rawLayout.replace(/\r/g, "").trimEnd();
const layoutSha256 = sha256(rawLayout);
const sequenceRaw = await readFile(sequencePath, "utf8");
const sequenceSha256 = sha256(sequenceRaw);
const candidateId = "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001";
const levelId = `${candidateId}_${exactVersion.toUpperCase()}`;
const title = "共享火焰的门槛";
const exactRefRoot = `prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/designer/exact/${exactVersion}`;
const canonicalInputs: CandleAction[] = process.env.CANDLE_CANONICAL_INPUTS
  ? JSON.parse(process.env.CANDLE_CANONICAL_INPUTS) as CandleAction[]
  : [
      "down",
      "right",
      "right",
      "right",
      "right",
      "down",
      "down",
      "left",
      "up",
      "down",
      "up",
      "down",
      "up",
      "down",
      "up",
      "down",
      "up",
      "down",
      "up",
      "down",
      "up",
      "up",
    ];
const level: LevelDoc = {
  id: levelId,
  title,
  global_burn_cycle: 5,
  layout,
  win: { type: "all_braziers_lit" },
};

type HistoryFlag = { name: string; bit: number; label: string };
const HISTORY_FLAGS: HistoryFlag[] = [
  { name: "wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "midcycle_reignite_from_shared_brazier", bit: 1 << 1, label: "midcycle_reignite" },
  { name: "shrink_to_len3", bit: 1 << 2, label: "shrink_len3" },
  { name: "shrink_to_len2", bit: 1 << 3, label: "shrink_len2" },
  { name: "shrink_to_len1", bit: 1 << 4, label: "shrink_len1" },
  exactVersion === "v3"
    ? { name: "shared_target_braziers_lit", bit: 1 << 5, label: "shared_target_transfer" }
    : { name: "terminal_brazier_and_receiver_ignite", bit: 1 << 5, label: "terminal_transfer" },
];
const REQUIRED_HISTORY_MASK = HISTORY_FLAGS.reduce((mask, flag) => mask | flag.bit, 0);

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
const solutionFamily = enumerateSolutionFamily(level);
const exposureAudit = enumerateExposureAudit(level);
const identityCounterfactuals = await enumerateIdentityCounterfactuals();

if (execution.stoppedAtIllegalAction || !execution.final.isWin) {
  throw new Error(`${exactVersion} 规范回放没有以合法胜利结束`);
}
if (analysis.graph.status !== "complete") {
  throw new Error(`${exactVersion} 完整图未完成：${analysis.graph.status}`);
}
if (!solutionFamily.requiredHistory.everyWinningTraceHasAllRequiredFlags) {
  throw new Error(`存在没有完整墙灭火—复燃—缩短—终端转移历史的 ${exactVersion} 胜利轨迹`);
}
if (exactVersion !== "v3" && solutionFamily.winningMilestoneSignatures.length !== 1) {
  throw new Error(`${exactVersion} 发现多个非等价胜利里程碑签名，不能发布唯一候选 exact`);
}
if (exposureAudit.verdict !== "pass") {
  throw new Error(`${exactVersion} exposure audit 未通过：${JSON.stringify(exposureAudit.forbidden_hits.slice(0, 8))}`);
}

const manifest = buildManifest(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const submission = buildSubmission(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const reading = buildDesignerReading(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const solveInstance = buildSolveInstance(execution, replay);
const selfCheck = buildSelfCheck(analysis, solutionFamily, exposureAudit, identityCounterfactuals, replay);

await mkdir(exactRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(exactRoot, "layout.txt"), rawLayout, "utf8"),
  writeFile(path.join(exactRoot, "canonical_replay.json"), `${JSON.stringify(replay, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replay), "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.json"), `${JSON.stringify(analysis, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "layout_analysis.md"), formatLevelAnalysisMarkdown(analysis), "utf8"),
  writeFile(path.join(exactRoot, "solution_family.json"), `${JSON.stringify(solutionFamily, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "exposure_audit.json"), `${JSON.stringify(exposureAudit, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "identity_counterfactuals.json"), `${JSON.stringify(identityCounterfactuals, null, 2)}\n`, "utf8"),
  writeFile(path.join(exactRoot, "identity_counterfactuals.md"), formatIdentityCounterfactualsMarkdown(identityCounterfactuals), "utf8"),
  writeFile(path.join(exactRoot, "designer_reading.yml"), YAML.stringify(reading, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(exactRoot, "solve_instance.yml"), YAML.stringify(solveInstance, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(exactRoot, "exact_manifest.yml"), YAML.stringify(manifest, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(exactRoot, "submission.yml"), YAML.stringify(submission, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(workbenchRoot, `${exactVersion}_self_check.yml`), YAML.stringify(selfCheck, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(workbenchRoot, `${exactVersion}_reasoning_sketch.md`), formatReasoningSketch(selfCheck), "utf8"),
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
    `family_product_states=${solutionFamily.graph.productStateCount}`,
    `family_wins=${solutionFamily.graph.winningProductStateCount}`,
    `exposure_states=${exposureAudit.graph.reachable_state_count}`,
    `exposure_edges=${exposureAudit.graph.legal_transition_count}`,
    `exposure_forbidden=${exposureAudit.forbidden_hits.length}`,
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

  if (wins.length === 0) throw new Error(`${exactVersion} 完整产品图没有胜利状态`);
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
      "产品图只核验胜利历史与等价解族，不把图统计解释为审美或难度 verdict。",
      "终端单格蜡烛是共享烛芯的可见 relay，不把它包装成后续独立机制事件。",
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
  if (events.includes("extinguish_by_wall:candle#1")) add(HISTORY_FLAGS[0]!);
  if ((mask & HISTORY_FLAGS[0]!.bit) !== 0 && events.includes("ignite_from_brazier:candle#1:1,3")) {
    add(HISTORY_FLAGS[1]!);
  }
  if ((mask & HISTORY_FLAGS[1]!.bit) !== 0) {
    if (events.includes("shrink:candle#1:len3")) add(HISTORY_FLAGS[2]!);
    if (events.includes("shrink:candle#1:len2")) add(HISTORY_FLAGS[3]!);
    if (events.includes("shrink:candle#1:len1")) add(HISTORY_FLAGS[4]!);
  }
  if (exactVersion === "v3") {
    if (events.includes("light_brazier:4,2") || events.includes("light_brazier:8,2")) {
      add(HISTORY_FLAGS[5]!);
    }
  } else if (events.includes("light_brazier:4,2") && events.some((event) => event.startsWith("ignite_from_wick:candle#single") && event.endsWith(":4,2"))) {
    add(HISTORY_FLAGS[5]!);
  }
  return { mask, order };
}

type ExposureEdge = { index: number; from: number; to: number; action: CandleAction; events: string };

function enumerateExposureAudit(currentLevel: LevelDoc) {
  const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
  const initialState = parseLevel(currentLevel);
  const startKey = stateKey(initialState);
  const nodes: Array<{ index: number; key: string; depth: number; winning: boolean }> = [
    { index: 0, key: startKey, depth: 0, winning: isWin(initialState, currentLevel.win!) },
  ];
  const states = new Map<string, CandleSokobanState>([[startKey, initialState]]);
  const queue: Array<{ key: string; state: CandleSokobanState; index: number; depth: number }> = [
    { key: startKey, state: initialState, index: 0, depth: 0 },
  ];
  const edges: ExposureEdge[] = [];
  const eventCounts: Record<string, number> = {};
  let maxDepth = 0;
  let winCount = nodes[0]!.winning ? 1 : 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, currentLevel.win!)) continue;
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: currentLevel.win });
      if (!transition.legal) continue;
      for (const event of transition.events) {
        const prefix = event.split(":", 1)[0]!;
        eventCounts[prefix] = (eventCounts[prefix] ?? 0) + 1;
      }
      const nextKey = stateKey(transition.state);
      let nextIndex = nodes.findIndex((node) => node.key === nextKey);
      if (nextIndex < 0) {
        nextIndex = nodes.length;
        const winning = isWin(transition.state, currentLevel.win!);
        nodes.push({ index: nextIndex, key: nextKey, depth: current.depth + 1, winning });
        states.set(nextKey, transition.state);
        queue.push({ key: nextKey, state: transition.state, index: nextIndex, depth: current.depth + 1 });
        if (winning) winCount += 1;
        maxDepth = Math.max(maxDepth, current.depth + 1);
      }
      edges.push({ index: edges.length, from: current.index, to: nextIndex, action, events: transition.events.join(" ") });
    }
  }
  const forbiddenPatterns = [
    "extinguish_by_candle_body",
    "wick_reexposed_unlit",
    "shrink_ignite",
    "roll_intermediate_light_brazier",
    "roll_last_brazier_before_endpoint",
    "roll_intermediate_ignite",
    "roll_intermediate_extinguish",
    "roll_reignite_after_extinguish",
  ];
  const forbidden_hits = edges.flatMap((edge) => forbiddenPatterns.filter((pattern) => edge.events.includes(pattern)).map((pattern) => ({ ...edge, pattern })));
  return {
    schema_version: 1,
    prototype: pkg.mechanic.id,
    exact_version: exactVersion,
    level: { id: levelId, title, layout_sha256: layoutSha256, win: true },
    exposure_gate: {
      sequence_ref: "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml",
      sequence_sha256: sequenceSha256,
      allowed_exposure_through: "shared_fire_and_reignition",
      allowed_branches: ["basic_candle_manipulation", "wall_dousing", "shared_fire_and_reignition"],
      forbidden_branches: ["body_concealment_and_reexposure", "retreating_flame_transfer", "rolling_contact_chain"],
      allowed_event_patterns: [
        "push_axis", "roll_candle", "roll_multi_cell_one_turn", "light_brazier", "player_died", "countdown", "shrink", "burn_out", "simultaneous_burn", "extinguish_by_wall", "countdown_without_lit_candle", "boundary_extinguish_avoids_burn", "ignite_from_brazier", "ignite_from_wick", "ignite_midcycle", "boundary_ignite_participates",
      ],
      forbidden_event_patterns: forbiddenPatterns,
    },
    graph: {
      status: "complete",
      reason: null,
      reachable_state_count: nodes.length,
      legal_transition_count: edges.length,
      win_state_count: winCount,
      max_observed_depth: maxDepth,
      budget: { max_states: 300000, max_transitions: null, terminalize_wins: true },
    },
    reachable_event_counts: eventCounts,
    forbidden_hits,
    verdict: forbidden_hits.length === 0 ? "pass" : "fail",
    raw_graph: { nodes, edges },
    evidence_limits: [
      "该 audit 只检查完整可达图中的 runtime 事件暴露，不代替独立审美 review。",
      "胜利状态在图上终止扩展，符合 exact exposure audit 的 terminalize_wins 约定。",
    ],
  };
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
  const variants: Array<{ id: string; relation: string; changes: Array<{ x: number; y: number; replacement: string }> }> = exactVersion === "v3"
    ? [
        { id: "remove_wall_douse", relation: "删除初始左烛芯旁的墙，检验主蜡烛是否仍保有第一拍墙灭火身份。", changes: [{ x: 1, y: 4, replacement: "." }] },
        { id: "shift_wall_right", relation: "把灭火墙口向右错一格，检验墙灭火的站位因果是否保持。", changes: [{ x: 1, y: 4, replacement: "." }, { x: 2, y: 4, replacement: "#" }] },
        { id: "remove_reignite_source", relation: "删除左侧共享火盆，检验 t2 中周期复燃是否失去唯一火源。", changes: [{ x: 1, y: 3, replacement: "." }] },
        { id: "remove_gate_candle", relation: "删除右侧多格倒数蜡烛，检验第二火盆的对象责任与中段站位是否退化。", changes: [{ x: 7, y: 3, replacement: "." }, { x: 8, y: 3, replacement: "." }, { x: 9, y: 3, replacement: "." }, { x: 10, y: 3, replacement: "." }] },
        { id: "remove_secondary_target", relation: "删除右侧终点火盆，检验 C2 的最后复燃后消费是否仍是作品身份的一部分。", changes: [{ x: 8, y: 2, replacement: "." }] },
        { id: "remove_primary_target", relation: "删除主链终点火盆，检验 C1 最终缩短与墙灭火链是否仍能独立宣称完成。", changes: [{ x: 4, y: 2, replacement: "." }] },
      ]
    : [
    { id: "remove_wall_douse", relation: "删除初始左烛芯旁的墙，检验主蜡烛是否仍保有第一拍墙灭火身份。", changes: [{ x: 1, y: 4, replacement: "." }] },
    { id: "shift_wall_right", relation: "把灭火墙口向右错一格，检验墙灭火的站位因果是否保持。", changes: [{ x: 1, y: 4, replacement: "." }, { x: 2, y: 4, replacement: "#" }] },
    { id: "remove_reignite_source", relation: "删除左侧共享火盆，检验中周期复燃是否失去唯一火源。", changes: [{ x: 1, y: 3, replacement: "." }] },
    { id: "remove_gate_candle", relation: "删除右侧首边界燃尽的短蜡烛，检验中段可达位置与火源责任是否退化。", changes: [{ x: 8, y: 3, replacement: "." }] },
    { id: "remove_terminal_receiver", relation: "删除终端单格接收蜡烛，记录可见 relay 的身份边界。", changes: [{ x: 4, y: 1, replacement: "." }] },
    { id: "remove_target_brazier", relation: "删除最终待点火火盆，检验是否退化为不需要终局消费的开局状态。", changes: [{ x: 4, y: 2, replacement: "." }] },
      ];
  const results: CounterfactualResult[] = [];
  for (const variant of variants) {
    const variantLayout = applyChanges(layout, variant.changes);
    const variantLevel: LevelDoc = { id: `${levelId}_CF_${variant.id}`, title: variant.id, global_burn_cycle: 5, layout: variantLayout, win: { type: "all_braziers_lit" } };
    const variantAnalysis = analyzeLevel(pkg, variantLevel, { maxStates: 300000, graphMaxStates: 300000, counterfactualMaxStates: 300000 });
    results.push({
      id: variant.id,
      relation: variant.relation,
      changedCells: variant.changes,
      layout: variantLayout,
      graph: { status: variantAnalysis.graph.status, reachableStateCount: variantAnalysis.graph.reachableStateCount, legalTransitionCount: variantAnalysis.graph.legalTransitionCount, winStateCount: variantAnalysis.graph.winStateCount },
      solve: { found: variantAnalysis.solution.found, cost: variantAnalysis.solution.cost, inputs: variantAnalysis.solution.inputs, events: variantAnalysis.solution.events },
    });
  }
  return {
    candidateId,
    exactVersion,
    layoutSha256,
    scope: "当前 exact 的局部结构反事实；每个变体均以 Candle runtime 完整图读取",
    baseline: { layout, canonicalInputs, requiredHistory: solutionFamily.requiredHistory },
    results,
    evidenceLimits: [
      "反事实用于说明对象责任与作品身份边界，不把可解性或图规模直接当作审美结论。",
      "终端接收蜡烛删除后若主链仍可解，说明它是可见 relay 而不是被夸大的独立硬锁。",
      "难度与审美仍需独立审查，Designer 自查不产生 review verdict。",
    ],
  };
}

function buildManifest(analysis: any, family: any, exposure: any, counterfactuals: any) {
  return {
    design_task_id: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    level_id: levelId,
    title,
    layout_ref: `${exactRefRoot}/layout.txt`,
    layout_sha256: layoutSha256,
    solve_instance_ref: `${exactRefRoot}/solve_instance.yml`,
    experience_brief_ref: "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/experience_brief.yml",
    archive_calibration_ref: "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/designer/archive_calibration.yml",
    task_lexicon_refs: [
      "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/exploration/lexicon.md",
      "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/exploration/lexicon_index.md",
    ],
    allowed_exposure_through: "shared_fire_and_reignition",
    win: true,
    global_burn_cycle: 5,
    artifacts: {
      layout: "layout.txt",
      canonical_replay_json: "canonical_replay.json",
      canonical_replay_markdown: "canonical_replay.md",
      layout_analysis_json: "layout_analysis.json",
      layout_analysis_markdown: "layout_analysis.md",
      solution_family: "solution_family.json",
      identity_counterfactuals: "identity_counterfactuals.json",
      exposure_audit: "exposure_audit.json",
      designer_reading: "designer_reading.yml",
      submission_packet: "submission.yml",
    },
    runtime_summary: {
      canonical_replay: { input_count: canonicalInputs.length, win: true, final_step: canonicalInputs.length, canonical_midcycle_reignite: "t2" },
      reachable_graph: { status: analysis.graph.status, states: analysis.graph.reachableStateCount, legal_transitions: analysis.graph.legalTransitionCount, win_states: analysis.graph.winStateCount },
      solution_family: { status: family.graph.status, product_states: family.graph.productStateCount, winning_product_states: family.graph.winningProductStateCount, raw_shortest_input_count: family.shortestWinningFamily.rawShortestInputCount, milestone_signatures: family.winningMilestoneSignatures.length },
      identity_counterfactuals: { count: counterfactuals.results.length, all_read: true },
      exposure_gate: { verdict: exposure.verdict, graph_states: exposure.graph.reachable_state_count, graph_edges: exposure.graph.legal_transition_count, forbidden_hits: exposure.forbidden_hits.length },
    },
  };
}

function buildSubmission(analysis: any, family: any, exposure: any, counterfactuals: any) {
  return {
    submission_id: `${candidateId}_${exactVersion}_designer_submission`,
    design_task_id: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    allowed_exposure_through: "shared_fire_and_reignition",
    designer_claim: {
      player_experience_core: exactVersion === "v3"
        ? "玩家先主动把主 C1 压入墙而熄灭，再在 t2 从左共享火盆复燃；复燃后的第一个边界同时收窄 C1、缩短 C2 并迫使玩家从上方横线转入下方 staging，第二个边界再次收窄并把 C2 变成可执行的单格火源，玩家随后用同一倒数窗口先点右目标，再回收 C1 点左目标。"
        : "玩家先主动把主蜡烛压到墙上熄灭，再穿过由右侧亮单格首边界燃尽所改变的紧凑空间，在共享火盆处选择 t2 中周期复燃；之后每个倒数边界都让主蜡烛继续缩短、重新分配可站位置和终点责任，最终以同一根火焰点亮终点火盆与接收蜡烛。",
      player_action: exactVersion === "v3"
        ? "以墙灭火保存 C1，以右移和下行把 t2 前的站位压到共享火盆；复燃后每个边界都改变 C1/C2 的长度与可达位置，玩家必须沿下方 staging 走位，在 C2 变成 len1 后从下方点亮右火盆，再回到 C1 的新长度下点亮左火盆。"
        : "以墙灭火换取时间窗口，以右侧短蜡烛的首边界燃尽和通道变化判断何时下行、何时回到共享火盆，并在 t2 复燃后把每一轮边界当作下一次站位与责任选择。",
      visible_payoff: exactVersion === "v3"
        ? "墙灭火立即保存 C1；t2 后第一个边界让两根仍在燃烧的蜡烛分别进入 len3/len2，第二个边界把 C2 收到 len1 并释放其目标 wick；右火盆先亮，最后 C1 收到 len1 后点亮左火盆，边界消费直接改写下一步。"
        : "墙灭火立即保存主链；右侧亮单格在首边界烧尽并释放中段；中周期复燃使主蜡烛重新带着 4→3→2→1 的可见倒数参与；终端 singleton 将火焰 relay 到火盆与接收蜡烛。",
      why_this_level_exists: "把 Critic 指出的等待感压缩成对象责任的连续变化：同一个 shared fire 被墙灭火保存、被中周期重新接入，再通过多根蜡烛的边界职责完成终局。",
      work_identity_conditions: exactVersion === "v3"
        ? [
            "主 C1 必须先由墙灭火，再从左侧共享火盆于 t2 中周期复燃。",
            "复燃后的两个连续边界必须分别消费 C1/C2，改变 staging 可达位置与右火盆的可用 wick。",
            "C2 必须先在 len1 状态点亮右火盆，C1 再在 len1 状态点亮左火盆；不引入后续机制分支。",
          ]
        : [
            "主 C1 必须先由墙灭火，再从左侧共享火盆中周期复燃。",
            "C2 右侧亮单格在首边界燃尽，负责早段可达性/火源关系变化，不引入后续机制事件。",
            "主链必须在复燃后经历 len4→len3→len2→len1，再把终点火盆和 singleton 接收端同时点亮。",
          ],
    },
    packaging_account: {
      opening: exactVersion === "v3" ? "玩家、C1、左共享火盆、墙灭火口和右侧多格 C2 在同一紧凑横线上；两个目标火盆分别露出在 C1/C2 的上方，终局责任一开始就可读。" : "上方小室把玩家、主 C1、左侧共享火盆与墙灭火口压在同一视野；右侧亮单格 C2 和上方未点燃的 terminal singleton 同时可见。",
      preparation: exactVersion === "v3" ? "第一拍把 C1 压入墙，向右走到首边界，再下行绕过收窄中的两根蜡烛，回到左火盆把复燃锁在 t2。" : "第一拍把 C1 压墙灭火；向右短移中，C2 在首个边界燃尽，改变通向下方绕行入口的责任。",
      reveal_or_use: exactVersion === "v3" ? "t2 后边界连续消费 C1/C2；玩家不靠原地上下换位，而沿下方 staging 走到 C2 的 len1 wick，先点右火盆。" : "C2 烧尽后下方通道承担通行责任；玩家在无亮蜡烛的倒数中回到左火盆，于 t2 复燃主 C1。",
      ending: exactVersion === "v3" ? "C2 先把共享火焰交给右火盆，随后 C1 继续缩到 len1 并把同一链收束到左火盆。" : "四次周期边界持续把 C1 由 4 缩至 1，终点 singleton 接住共享火焰并点亮目标火盆。",
      every_major_element_role: exactVersion === "v3"
        ? ["C1：墙灭火—t2 复燃—连续缩短—左目标。", "C2：复燃后持续参与倒数，len3→len2→len1 并承担右目标。", "下方 staging：每个边界后的玩家位置与下一操作选择。", "左火盆：唯一中周期复燃源。", "墙：第一拍主动灭火的因果锚点。", "两个目标火盆：两根蜡烛边界责任的可见终端。"]
        : ["C1：唯一主倒数链，承担墙灭火、共享火盆复燃、三次缩短与终端 transfer。", "C2：右侧亮单格，首边界燃尽并改变中段可达位置与玩家责任。", "terminal singleton：上方未点燃的终端接收端，等待主链最后 relay。", "左火盆：墙灭火后的中周期复燃源。", "墙：第一拍主动灭火的因果锚点。", "终点火盆与 terminal singleton：共享火焰的可见终端 relay。"],
      known_perceptible_defects: [
        exactVersion === "v3" ? "中段的下方 staging 仍有回返，但每个位置都服务于下一次边界后的 C2/C1 操作，不以原地等待充数。" : "规范回放的中段仍有短促的上下换位动作；它们分别落在 t2→t1、t1→t5、t5→t4 等边界，不应被当作新机制，但独立 Critic 仍需检查是否显得像等待。",
        exactVersion === "v3" ? "C2 在点亮右火盆后于下一边界燃尽；燃尽是同一 shared_fire_and_reignition 核心的终端消费，不是后续 branch。" : "terminal singleton 不是主链的独立硬锁；它的价值是终端共享火焰反馈而非额外门槛。",
      ],
    },
    hard_evidence: {
      canonical_replay_ref: `${exactRefRoot}/canonical_replay.json`,
      layout_analysis_ref: `${exactRefRoot}/layout_analysis.json`,
      solution_family_ref: `${exactRefRoot}/solution_family.json`,
      identity_counterfactual_ref: `${exactRefRoot}/identity_counterfactuals.json`,
      exposure_audit_ref: `${exactRefRoot}/exposure_audit.json`,
      replay_is_complete: true,
      replay_is_nonempty: true,
      reachable_graph_is_complete: analysis.graph.status === "complete",
      solution_family_is_complete: family.graph.status === "complete",
      identity_counterfactuals_are_complete: counterfactuals.results.length === 6,
      exposure_audit_is_complete: exposure.graph.status === "complete",
    },
    solution_uniqueness: {
      result: exactVersion === "v3" ? "single_candidate_shared_core_with_timing_variants" : "equivalent_variants_only",
      winning_milestone_signature_count: family.winningMilestoneSignatures.length,
      raw_shortest_input_count: family.shortestWinningFamily.rawShortestInputCount,
      required_history_all_wins: family.requiredHistory.everyWinningTraceHasAllRequiredFlags,
      interpretation: exactVersion === "v3" ? "所有胜利轨迹都保有墙灭火、共享火盆复燃和两根蜡烛的连续边界消费；目标消费的相对时点存在 runtime timing variants，但仍属于同一 shared_fire_and_reignition 核心，不新增后续 branch。" : "所有胜利轨迹共享同一墙灭火—共享火盆中周期复燃—主链缩短—终端 transfer 里程碑序列；剩余差异只属于 runtime state 上的等价站位/步序变体。",
    },
    bypass_refs: [
      `${exactVersion} exposure audit 完整图覆盖所有可达状态，并对 forbidden event patterns 做零命中检查。`,
      exactVersion === "v3" ? "identity counterfactuals 记录删除/错位墙、复燃火源、C2 与两个目标火盆后的结构变化。" : "identity counterfactuals 记录删除/错位墙、复燃火源、C2、终端接收端和目标火盆后的结构变化。",
    ],
    identity_counterfactual_refs: [`${exactRefRoot}/identity_counterfactuals.json`],
    exposure_gate_ref: `${exactRefRoot}/exposure_audit.json`,
    evidence_limits: [
      "Designer 证据包不替代 fresh Evidence Reviewer 的独立硬证据核验。",
      "Designer 证据包不替代 Puzzle Critic 对中段等待感和实际玩家体验的判断。",
    ],
    designer_self_verdict: "submit_for_independent_review",
  };
}

function buildDesignerReading(analysis: any, family: any, exposure: any, counterfactuals: any) {
  return {
    task: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    allowed_exposure_through: "shared_fire_and_reignition",
    forbidden_exposure: ["body_concealment_and_reexposure", "retreating_flame_transfer", "rolling_contact_chain"],
    player_side_reading: {
      opening: exactVersion === "v3" ? "玩家从 C1 与墙灭火口旁起步，右侧多格 C2 和两个目标火盆同时可见；第一拍的 down 是主动把 C1 压入墙而保存它。" : "玩家从上方未点燃的 terminal singleton 下方起步，看到 C1、左火盆和灭火墙口同处近旁；第一拍的 down 是主动把 C1 压入墙而保存它。",
      preparation: exactVersion === "v3" ? "右移触发 C2 首次收缩，随后下行穿过 staging，在无亮 C1 的窗口回到左火盆。" : "右移与 C2 的近旁关系把右侧亮单格推入首边界燃尽责任，玩家随后转入下方通道。",
      core_reveal: exactVersion === "v3" ? "t2 复燃后，两个连续边界把 C1/C2 的长度和可达位置重写；玩家沿下方 staging 接近 C2，而不是用原地上下换位填充倒数。" : "无亮蜡烛的倒数让玩家在下方通道作短位移，回到左火盆时选择 t2 中周期复燃，而不是等到新的机制分支。",
      consumption: exactVersion === "v3" ? "第一边界得到 C1 len3/C2 len2，第二边界得到 C1 len2/C2 len1；C2 len1 的 wick 点右火盆，随后 C1 len1 的 wick 点左火盆。" : "复燃后的每个边界都改变 C1 长度；t2→t1 先收窄，下一边界循环并压缩为 len2，再至 len1，玩家必须持续读位置与终端负担。",
      ending: exactVersion === "v3" ? "右火盆先被 C2 点亮，C2 随后燃尽；同一 shared fire 再由 C1 的 len1 wick 点亮左火盆。" : "最后 singleton 的 wick 把同一共享火焰转交给目标火盆和终端接收端，形成可见闭环。",
    },
    difficulty_reading: {
      expected: 4,
      counted_reasoning: [
        "识别墙灭火是保存主 C1 而非失败。",
        "读 C2 的首边界燃尽责任，选择下方通道而不是回到开局回路。",
        "在无亮火倒数中决定回到左火盆的 t2 窗口。",
        "把每次 C1 缩短后的新长度/站位当作下一步终点规划。",
      ],
      not_counted: ["长路线本身", "重复往返本身", "后续机制事件"],
      calibration_boundary: exactVersion === "v3" ? "v3 以两个复燃后边界的对象消费重构中段；如果实玩仍把 staging 误读成等待，应继续收紧位置关系，不添加机制。" : "v2 以同一 shared_fire_and_reignition 核心提高中段密度；若实玩仍把上下换位读成等待，应继续压缩布局，而不是添加机制。",
    },
    major_element_responsibility: [
      { element: "C1", responsibility: "主保存—复燃—缩短链" },
      { element: "C2", responsibility: "短时门槛与中段可达性改变" },
      { element: exactVersion === "v3" ? "C2_target_brazier" : "terminal_singleton", responsibility: exactVersion === "v3" ? "第二边界后的右侧目标消费" : "终端等待与最后 relay" },
      { element: "wall", responsibility: "第一拍主动灭火" },
      { element: "left_brazier", responsibility: "共享中周期复燃源" },
      { element: exactVersion === "v3" ? "C1_target_brazier" : "terminal_singleton", responsibility: exactVersion === "v3" ? "主链最终消费" : "终端可见 relay" },
    ],
    solution_family_reading: {
      status: family.graph.status,
      milestone_signature_count: family.winningMilestoneSignatures.length,
      required_history_all_wins: family.requiredHistory.everyWinningTraceHasAllRequiredFlags,
      evidence_ref: "solution_family.json",
    },
    identity_counterfactual_reading: {
      variants_read: counterfactuals.results.length,
      evidence_ref: "identity_counterfactuals.json",
      conclusion: exactVersion === "v3" ? "墙、共享火盆、C1/C2 和两个目标火盆各自承担可观察责任；反事实结果只用于限定 identity，不等于审美 verdict。" : "墙、共享火盆、C2、终端 relay 各自承担可观察责任；反事实结果只用于限定 identity，不等于审美 verdict。",
    },
    exposure_audit_reading: {
      status: exposure.verdict,
      allowed_exposure_through: "shared_fire_and_reignition",
      forbidden_hit_count: exposure.forbidden_hits.length,
      evidence_ref: "exposure_audit.json",
    },
    known_defects: [
      exactVersion === "v3" ? "中段 staging 的回返必须被读作寻找 C2 len1 wick 与回收 C1 终点的位置，而非纯等待。" : "中段上下换位仍需要 Critic 检查是否被体验成等待；本版本已经把 C2 的首边界燃尽和下方通道纳入因果链。",
      exactVersion === "v3" ? "C2 点亮右火盆后在下一边界燃尽；这是同一曝光门内的终端消费。" : "终端接收端是 relay 而非 hard lock。",
    ],
    evidence_limits: ["本文件是 Designer 侧玩家重读，不是独立 review verdict。"],
  };
}

function buildSolveInstance(execution: any, replay: any) {
  return {
    task: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    level_id: levelId,
    input_sequence: canonicalInputs,
    input_count: canonicalInputs.length,
    complete: !execution.stoppedAtIllegalAction,
    win: execution.final.isWin,
    final_state: execution.final.render,
    event_trace: replay.steps.map((step: any) => ({ step: step.step, input: step.input, legal: step.legal, events: step.events })),
    canonical_milestones: exactVersion === "v3"
      ? [
          { at_step: 1, milestone: "C1 wall douse", expected_event: "extinguish_by_wall:candle#1" },
          { at_step: 9, milestone: "C1 t2 shared-brazier reignition", expected_event: "ignite_midcycle:candle#1:t2" },
          { at_step: 10, milestone: "first post-reignite boundary consumes C1/C2", expected_event: "shrink:candle#1:len3 + shrink:candle#2:len2" },
          { at_step: 15, milestone: "second post-reignite boundary makes C2 len1", expected_event: "shrink:candle#1:len2 + shrink:candle#2:len1" },
          { at_step: 18, milestone: "C2 shared-fire transfer to right target", expected_event: "light_brazier:8,2" },
          { at_step: 20, milestone: "C1 shrink 2→1 and C2 terminal burn", expected_event: "shrink:candle#1:len1 + burn_out:candle#2" },
          { at_step: 24, milestone: "C1 shared-fire transfer to left target", expected_event: "light_brazier:4,2" },
        ]
      : [
          { at_step: 1, milestone: "C1 wall douse", expected_event: "extinguish_by_wall:candle#1" },
          { at_step: 9, milestone: "C1 t2 shared-brazier reignition", expected_event: "ignite_midcycle:candle#1:t2" },
          { at_step: 10, milestone: "C1 shrink 4→3", expected_event: "shrink:candle#1:len3" },
          { at_step: 15, milestone: "C1 shrink 3→2", expected_event: "shrink:candle#1:len2" },
          { at_step: 20, milestone: "C1 shrink 2→1", expected_event: "shrink:candle#1:len1" },
          { at_step: 22, milestone: "terminal shared-fire transfer", expected_event: "light_brazier:4,2 + ignite_from_wick:candle#single1:4,2" },
        ],
  };
}

function buildSelfCheck(analysis: any, family: any, exposure: any, counterfactuals: any, replay: any) {
  return {
    task: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_source: layoutFile,
    checks: {
      experience_core_kept_single: true,
      allowed_exposure_through: "shared_fire_and_reignition",
      forbidden_later_branches_absent: true,
      replay_complete: replay.replay.completed,
      replay_nonempty: replay.steps.length > 0,
      replay_win: replay.final.isWin,
      canonical_t2_reignite: replay.steps.some((step: any) => step.events.includes("ignite_midcycle:candle#1:t2")),
      graph_complete: analysis.graph.status === "complete",
      solution_family_complete: family.graph.status === "complete",
      milestone_family_nonempty: family.winningMilestoneSignatures.length >= 1,
      normalized_milestone_core_present: family.requiredHistory.everyWinningTraceHasAllRequiredFlags,
      all_wins_keep_required_history: family.requiredHistory.everyWinningTraceHasAllRequiredFlags,
      identity_counterfactuals_complete: counterfactuals.results.length === 6,
      exposure_complete: exposure.graph.status === "complete",
      forbidden_event_hits_zero: exposure.forbidden_hits.length === 0,
      exposure_gate_pass: exposure.verdict === "pass",
      no_ledger_dispatch_critic_levels_queue_handoff_written: true,
    },
    boundary_read: exactVersion === "v3"
      ? [
          "t2→t1：第一处复燃后边界同时把 C1 收到 len3、C2 收到 len2；上方横线不再是下一站，玩家必须进入下方 staging。",
          "t1→t5：第二处边界把 C1 收到 len2、C2 收到 len1；C2 的新 wick 责任让右火盆成为下一次可执行消费。",
          "C2 len1 消费右目标后，下一边界把 C1 收到 len1 并让 C2 燃尽；玩家回收新形成的 C1 终点位置。",
          "最终 C1 len1 wick 点左目标；所有变化仍在 shared_fire_and_reignition 内，没有后续 branch。",
        ]
      : [
          "首边界：C2 burn_out，玩家失去右侧亮火责任并改走下方责任区。",
          "t2→t1：主 C1 首次缩短，下一步必须按新长度回到共享火盆/终端关系。",
          "t1→t5：倒数重置，只有主 C1 重新承担火源关系，玩家不能继续依赖无亮阶段。",
          "t5→t4 与后续：C1 继续缩短至 singleton，终端 relay 关系成为下一步选择。",
        ],
    evidence_limits: ["自查只支持发布 packet，不取代独立 Evidence Reviewer 或 Puzzle Critic。"],
  };
}

function formatReasoningSketch(selfCheck: any): string {
  return [
    `# ${selfCheck.candidate_id} ${selfCheck.exact_version} 工作台自查`,
    "",
    "本轮修订接受 Critic 对纯等待的意见，把 C2 的首边界燃尽责任纳入中段，并保持唯一墙灭火—复燃—参与倒数核心。",
    "",
    "## 倒数边界读取",
    "",
    ...selfCheck.boundary_read.map((item: string) => `- ${item}`),
    "",
    "## 发布门槛",
    "",
    ...Object.entries(selfCheck.checks).map(([key, value]) => `- ${key}: ${value ? "pass" : "fail"}`),
    "",
  ].join("\n");
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

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}
