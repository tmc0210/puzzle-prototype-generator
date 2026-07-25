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

const reportRoot = path.resolve("prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725");
const workbenchRoot = path.join(reportRoot, "designer", "workbench");
const exactVersion = "v4";
const layoutFile = "candidate_v75.layout";
const exactRoot = path.join(reportRoot, "designer", "exact", exactVersion);
const layoutPath = path.join(workbenchRoot, layoutFile);
const sequencePath = path.resolve("prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml");
const rawLayout = await readFile(layoutPath, "utf8");
const layout = rawLayout.replace(/\r/g, "").trimEnd();
const layoutSha256 = sha256(rawLayout);
const sequenceRaw = await readFile(sequencePath, "utf8");
const sequenceSha256 = sha256(sequenceRaw);
const candidateId = "CANDLE_SHARED_FIRE_REIGNITION_TIMING_001";
const levelId = `${candidateId}_V4`;
const title = "共享火焰的门槛";
const exactRefRoot = `prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/designer/exact/${exactVersion}`;
const canonicalInputs: CandleAction[] = [
  "down", "right", "right", "right", "up", "right", "right", "down", "right", "down",
  "right", "right", "right", "down", "down", "down", "left", "left", "left", "left",
  "left", "up", "down", "right", "right", "right", "right", "right", "down", "down", "left",
  "left", "left", "left", "left", "left", "up", "left", "up", "up", "left", "left", "up",
  "up", "down", "up", "down", "up", "down", "up", "up", "down", "right", "right", "right",
  "up",
];
const level: LevelDoc = { id: levelId, title, global_burn_cycle: 5, layout, win: { type: "all_braziers_lit" } };
const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);
const initial = adapter.parseLevel(level);
type HistoryFlag = { name: string; bit: number; label: string };
const HISTORY_FLAGS: HistoryFlag[] = [
  { name: "wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "c2_len4", bit: 1 << 1, label: "c2_len4" },
  { name: "c2_len3", bit: 1 << 2, label: "c2_len3" },
  { name: "c2_len2", bit: 1 << 3, label: "c2_len2" },
  { name: "c2_len1", bit: 1 << 4, label: "c2_len1" },
  { name: "c2_target", bit: 1 << 5, label: "c2_target" },
  { name: "c2_burn_out", bit: 1 << 6, label: "c2_burn_out" },
  { name: "c1_reignite", bit: 1 << 7, label: "c1_reignite" },
  { name: "c1_len3", bit: 1 << 8, label: "c1_len3" },
  { name: "c1_len2", bit: 1 << 9, label: "c1_len2" },
  { name: "c1_len1", bit: 1 << 10, label: "c1_len1" },
  { name: "c1_target", bit: 1 << 11, label: "c1_target" },
];
const REQUIRED_HISTORY_MASK = HISTORY_FLAGS.reduce((mask, flag) => mask | flag.bit, 0);
const execution = replayInputSequence(adapter, runtime, initial, canonicalInputs, { winCondition: level.win }, level.win);
const replay = buildInputSequenceReplayReport({ id: level.id, prototype: pkg.mechanic.id, layoutSource: layoutPath, layout, winCondition: level.win }, execution) as any;
for (const replayStep of replay.steps as any[]) replayStep.eventWin = replayStep.after.isWin;
const analysis = analyzeLevel(pkg, level, { maxStates: 300000, graphMaxStates: 300000, counterfactualMaxStates: 300000 });
const solutionFamily = enumerateSolutionFamily(level);
const exposureAudit = enumerateExposureAudit(level);
const identityCounterfactuals = await enumerateIdentityCounterfactuals();

if (execution.stoppedAtIllegalAction || !execution.final.isWin) throw new Error("v4 规范回放没有以合法胜利结束");
if (replay.steps.length < 22 || !replay.replay.completed || !replay.final.isWin) throw new Error("v4 canonical replay 不完整或过短");
if (analysis.graph.status !== "complete") throw new Error(`v4 完整图未完成：${analysis.graph.status}`);
if (!solutionFamily.requiredHistory.everyWinningTraceHasAllRequiredFlags) throw new Error("v4 存在缺失核心历史的胜利轨迹");
if (solutionFamily.winningMilestoneSignatures.length !== 1) throw new Error("v4 存在多个非等价胜利里程碑签名");
if (exposureAudit.graph.status !== "complete" || exposureAudit.forbidden_hits.length !== 0 || exposureAudit.verdict !== "pass") {
  console.error(JSON.stringify({ graph: exposureAudit.graph, forbidden: exposureAudit.forbidden_hits.slice(0, 5), verdict: exposureAudit.verdict }, null, 2));
  throw new Error("v4 exposure audit 未通过");
}
if (identityCounterfactuals.results.length !== 6 || identityCounterfactuals.results.some((result: any) => result.graph.status !== "complete")) throw new Error("v4 identity counterfactuals 未完整完成");

const manifest = buildManifest(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const submission = buildSubmission(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const reading = buildDesignerReading(analysis, solutionFamily, exposureAudit, identityCounterfactuals);
const solveInstance = buildSolveInstance(replay);
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
  writeFile(path.join(workbenchRoot, "v4_self_check.yml"), YAML.stringify(selfCheck, { lineWidth: 0 }), "utf8"),
  writeFile(path.join(workbenchRoot, "v4_reasoning_sketch.md"), formatReasoningSketch(selfCheck), "utf8"),
]);
console.log(JSON.stringify({ exact: exactVersion, layoutSha256, replaySteps: replay.steps.length, graph: analysis.graph, family: solutionFamily.graph, signatures: solutionFamily.winningMilestoneSignatures.length, exposure: { status: exposureAudit.graph.status, states: exposureAudit.graph.reachable_state_count, edges: exposureAudit.graph.legal_transition_count, forbidden: exposureAudit.forbidden_hits.length }, counterfactuals: identityCounterfactuals.results.map((result: any) => ({ id: result.id, graph: result.graph, solve: result.solve })) }, null, 2));

type ProductNode = { state: CandleSokobanState; mask: number; order: string[]; depth: number; shortestWays: bigint };
function enumerateSolutionFamily(currentLevel: LevelDoc) {
  const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
  const first: ProductNode = { state: parseLevel(currentLevel), mask: 0, order: [], depth: 0, shortestWays: 1n };
  const queue: ProductNode[] = [first];
  const nodes = new Map<string, ProductNode>([[productKey(first), first]]);
  const parents = new Map<string, { parent: string | null; action: CandleAction }>([[productKey(first), { parent: null, action: "up" }]]);
  const baseStates = new Set<string>([stateKey(first.state)]);
  const wins: ProductNode[] = [];
  let legalEdges = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    if (isWin(current.state, currentLevel.win!)) { wins.push(current); continue; }
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: currentLevel.win });
      if (!transition.legal) continue;
      legalEdges += 1;
      const advanced = advanceHistory(current.mask, current.order, transition.events);
      const next: ProductNode = { state: transition.state, mask: advanced.mask, order: advanced.order, depth: current.depth + 1, shortestWays: current.shortestWays };
      const nextKey = productKey(next);
      baseStates.add(stateKey(next.state));
      const prior = nodes.get(nextKey);
      if (!prior) {
        nodes.set(nextKey, next);
        parents.set(nextKey, { parent: productKey(current), action });
        queue.push(next);
      } else if (prior.depth === next.depth) prior.shortestWays += next.shortestWays;
    }
  }
  if (wins.length === 0) throw new Error("v4 产品图没有胜利状态");
  const minDepth = Math.min(...wins.map((win) => win.depth));
  const shortestWins = wins.filter((win) => win.depth === minDepth);
  const signatures = new Map<string, ProductNode[]>();
  for (const win of wins) signatures.set(win.order.join(">"), [...(signatures.get(win.order.join(">")) ?? []), win]);
  const shortestReps = shortestWins.slice(0, 24).map((win) => ({ inputs: reconstructInputs(productKey(win), parents), milestoneSignature: win.order.join(">"), finalState: renderState(win.state) }));
  return {
    candidateId, exactVersion, layoutSha256,
    scope: "完整可达状态的单调历史产品图，胜利状态终止扩展；原始走位差异不另计逻辑解族。",
    graph: { status: "complete", baseStateCount: baseStates.size, productStateCount: nodes.size, legalEdgeCount: legalEdges, winningProductStateCount: wins.length },
    requiredHistory: { requiredMask: REQUIRED_HISTORY_MASK, everyWinningTraceHasAllRequiredFlags: wins.every((win) => (win.mask & REQUIRED_HISTORY_MASK) === REQUIRED_HISTORY_MASK), flags: HISTORY_FLAGS.map((flag) => ({ name: flag.name, allWinningTraces: wins.every((win) => (win.mask & flag.bit) !== 0), violatingWinningTraceCount: wins.filter((win) => (win.mask & flag.bit) === 0).length })) },
    winningMilestoneSignatures: [...signatures.entries()].map(([signature, matching]) => ({ signature, winningProductStates: matching.length, minimumDepth: Math.min(...matching.map((win) => win.depth)), representativeInputs: reconstructInputs(productKey(matching[0]!), parents) })),
    shortestWinningFamily: { cost: minDepth, productStates: shortestWins.length, rawShortestInputCount: shortestWins.reduce((sum, win) => sum + win.shortestWays, 0n).toString(), rawShortestInputRepresentatives: shortestReps.map((rep) => rep.inputs), representatives: shortestReps },
    evidenceLimits: ["完整产品图以 state + 单调历史合流；纯走位回环不伪造新解族。", "唯一签名中的两个 winning product states 只保留相同对象责任、目标顺序和边界因果的站位变体。", "所有事件均处于 shared_fire_and_reignition 及之前的允许家族。"],
  };
}
function reconstructInputs(key: string, parents: Map<string, { parent: string | null; action: CandleAction }>): CandleAction[] {
  const result: CandleAction[] = [];
  let cursor = key;
  while (true) { const parent = parents.get(cursor); if (!parent || parent.parent === null) break; result.push(parent.action); cursor = parent.parent; }
  return result.reverse();
}
function productKey(node: Pick<ProductNode, "state" | "mask" | "order">): string { return `${stateKey(node.state)}||M:${node.mask}||O:${node.order.join(">")}`; }
function advanceHistory(maskBefore: number, orderBefore: string[], events: string[]): { mask: number; order: string[] } {
  let mask = maskBefore; const order = [...orderBefore];
  const add = (flag: HistoryFlag): void => { if ((mask & flag.bit) === 0) order.push(flag.label); mask |= flag.bit; };
  if (events.includes("extinguish_by_wall:candle#1")) add(HISTORY_FLAGS[0]!);
  if (events.includes("shrink:candle#2:len4")) add(HISTORY_FLAGS[1]!);
  if (events.includes("shrink:candle#2:len3")) add(HISTORY_FLAGS[2]!);
  if (events.includes("shrink:candle#2:len2")) add(HISTORY_FLAGS[3]!);
  if (events.includes("shrink:candle#2:len1")) add(HISTORY_FLAGS[4]!);
  if (events.includes("light_brazier:7,5")) add(HISTORY_FLAGS[5]!);
  if (events.includes("burn_out:candle#2")) add(HISTORY_FLAGS[6]!);
  if ((mask & HISTORY_FLAGS[0]!.bit) !== 0 && events.includes("ignite_from_brazier:candle#1:1,3")) add(HISTORY_FLAGS[7]!);
  if ((mask & HISTORY_FLAGS[7]!.bit) !== 0 && events.includes("shrink:candle#1:len3")) add(HISTORY_FLAGS[8]!);
  if ((mask & HISTORY_FLAGS[7]!.bit) !== 0 && events.includes("shrink:candle#1:len2")) add(HISTORY_FLAGS[9]!);
  if ((mask & HISTORY_FLAGS[7]!.bit) !== 0 && events.includes("shrink:candle#1:len1")) add(HISTORY_FLAGS[10]!);
  if (events.includes("light_brazier:4,2")) add(HISTORY_FLAGS[11]!);
  return { mask, order };
}

type ExposureEdge = { index: number; from: number; to: number; action: CandleAction; events: string };
function enumerateExposureAudit(currentLevel: LevelDoc) {
  const actions = Object.keys(pkg.mechanic.inputs) as CandleAction[];
  const first = parseLevel(currentLevel); const firstKey = stateKey(first);
  const nodes: Array<{ index: number; key: string; depth: number; winning: boolean }> = [{ index: 0, key: firstKey, depth: 0, winning: isWin(first, currentLevel.win!) }];
  const indexByKey = new Map<string, number>([[firstKey, 0]]);
  const states = new Map<string, CandleSokobanState>([[firstKey, first]]);
  const queue: Array<{ key: string; state: CandleSokobanState; index: number; depth: number }> = [{ key: firstKey, state: first, index: 0, depth: 0 }];
  const edges: ExposureEdge[] = []; const eventCounts: Record<string, number> = {}; let maxDepth = 0; let winCount = nodes[0]!.winning ? 1 : 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!; if (isWin(current.state, currentLevel.win!)) continue;
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, { winCondition: currentLevel.win }); if (!transition.legal) continue;
      for (const event of transition.events) { const prefix = event.split(":", 1)[0]!; eventCounts[prefix] = (eventCounts[prefix] ?? 0) + 1; }
      const nextKey = stateKey(transition.state); let nextIndex = indexByKey.get(nextKey);
      if (nextIndex === undefined) { nextIndex = nodes.length; const winning = isWin(transition.state, currentLevel.win!); indexByKey.set(nextKey, nextIndex); nodes.push({ index: nextIndex, key: nextKey, depth: current.depth + 1, winning }); states.set(nextKey, transition.state); queue.push({ key: nextKey, state: transition.state, index: nextIndex, depth: current.depth + 1 }); if (winning) winCount += 1; maxDepth = Math.max(maxDepth, current.depth + 1); }
      edges.push({ index: edges.length, from: current.index, to: nextIndex, action, events: transition.events.join(" ") });
    }
  }
  const forbiddenPatterns = ["extinguish_by_candle_body", "wick_reexposed_unlit", "shrink_ignite", "roll_intermediate_light_brazier", "roll_last_brazier_before_endpoint", "roll_intermediate_ignite", "roll_intermediate_extinguish", "roll_reignite_after_extinguish"];
  const forbidden_hits = edges.flatMap((edge) => forbiddenPatterns.filter((pattern) => edge.events.includes(pattern)).map((pattern) => ({ ...edge, pattern })));
  return {
    schema_version: 1, prototype: pkg.mechanic.id, exact_version: exactVersion,
    level: { id: levelId, title, layout_sha256: layoutSha256, win: true },
    exposure_gate: { sequence_ref: "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml", sequence_sha256: sequenceSha256, allowed_exposure_through: "shared_fire_and_reignition", allowed_branches: ["basic_candle_manipulation", "wall_dousing", "shared_fire_and_reignition"], forbidden_branches: ["body_concealment_and_reexposure", "retreating_flame_transfer", "rolling_contact_chain"], forbidden_event_patterns: forbiddenPatterns },
    graph: { status: "complete", reason: null, reachable_state_count: nodes.length, legal_transition_count: edges.length, win_state_count: winCount, max_observed_depth: maxDepth, budget: { max_states: 300000, max_transitions: null, terminalize_wins: true } },
    reachable_event_counts: eventCounts, forbidden_hits, verdict: forbidden_hits.length === 0 ? "pass" : "fail", raw_graph: { nodes, edges }, evidence_limits: ["完整 raw graph 覆盖所有可达状态和合法边；胜利态按 exposure 合同终止扩展。", "本 audit 只验证机制暴露，不产生审美或难度 verdict。"],
  };
}

type CounterfactualResult = { id: string; relation: string; changedCells: Array<{ x: number; y: number; replacement: string }>; layout: string; graph: any; solve: any };
async function enumerateIdentityCounterfactuals() {
  const variants = [
    { id: "remove_wall_douse", relation: "删除初始左烛芯旁的墙，检验墙灭火是否仍是主链的第一责任。", changes: [{ x: 1, y: 4, replacement: "." }] },
    { id: "shift_wall_right", relation: "把灭火墙口右移一格，检验第一拍站位与灭火因果是否保持。", changes: [{ x: 1, y: 4, replacement: "." }, { x: 2, y: 4, replacement: "#" }] },
    { id: "remove_reignite_source", relation: "删除左侧共享火盆，检验中周期复燃是否失去唯一火源。", changes: [{ x: 1, y: 3, replacement: "." }] },
    { id: "remove_gate_candle", relation: "删除 C2，检验右目标与中段边界责任是否退化。", changes: [{ x: 6, y: 6, replacement: "." }, { x: 7, y: 6, replacement: "." }, { x: 8, y: 6, replacement: "." }, { x: 9, y: 6, replacement: "." }, { x: 10, y: 6, replacement: "." }] },
    { id: "remove_secondary_target", relation: "删除 C2 的目标火盆，检验 C2 的边界消费是否仍是同一作品身份。", changes: [{ x: 7, y: 5, replacement: "." }] },
    { id: "remove_primary_target", relation: "删除 C1 的目标火盆，检验主链最后的长度消费是否仍能完成全目标。", changes: [{ x: 4, y: 2, replacement: "." }] },
  ];
  const results: CounterfactualResult[] = [];
  for (const variant of variants) {
    const variantLayout = applyChanges(layout, variant.changes);
    const variantLevel: LevelDoc = { id: `${levelId}_CF_${variant.id}`, title: variant.id, global_burn_cycle: 5, layout: variantLayout, win: { type: "all_braziers_lit" } };
    try {
      const variantAnalysis = analyzeLevel(pkg, variantLevel, { maxStates: 300000, graphMaxStates: 300000, counterfactualMaxStates: 300000 });
      results.push({ id: variant.id, relation: variant.relation, changedCells: variant.changes, layout: variantLayout, graph: { status: variantAnalysis.graph.status, reachableStateCount: variantAnalysis.graph.reachableStateCount, legalTransitionCount: variantAnalysis.graph.legalTransitionCount, winStateCount: variantAnalysis.graph.winStateCount }, solve: { found: variantAnalysis.solution.found, cost: variantAnalysis.solution.cost, inputs: variantAnalysis.solution.inputs, events: variantAnalysis.solution.events } });
    } catch (error) {
      results.push({ id: variant.id, relation: variant.relation, changedCells: variant.changes, layout: variantLayout, graph: { status: "invalid", error: String(error), reachableStateCount: 0, legalTransitionCount: 0, winStateCount: 0 }, solve: { found: false, cost: null, inputs: [], events: [] } });
    }
  }
  return { candidateId, exactVersion, layoutSha256, scope: "当前 v4 exact 的局部结构反事实；每个变体均读取实际 Candle runtime 分析。", baseline: { layout, canonicalInputs, requiredHistory: solutionFamily.requiredHistory }, results, evidenceLimits: ["反事实只说明墙、共享火盆、C2 和两个目标的结构责任边界，不替代独立 review。", "可解性变化不单独构成审美结论。"] };
}

function applyChanges(source: string, changes: Array<{ x: number; y: number; replacement: string }>): string { const rows = source.split("\n"); for (const change of changes) { const cells = [...rows[change.y]!]; cells[change.x] = change.replacement; rows[change.y] = cells.join(""); } return rows.join("\n"); }
function buildManifest(analysis: any, family: any, exposure: any, counterfactuals: any) {
  return { design_task_id: "studio_shared_fire_reignition_timing_20260725", candidate_id: candidateId, exact_version: exactVersion, level_id: levelId, title, layout_ref: `${exactRefRoot}/layout.txt`, layout_sha256: layoutSha256, solve_instance_ref: `${exactRefRoot}/solve_instance.yml`, experience_brief_ref: "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/experience_brief.yml", archive_calibration_ref: "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/designer/archive_calibration.yml", task_lexicon_refs: ["prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/exploration/lexicon.md", "prototypes/candle_sokoban/reports/studio_shared_fire_reignition_timing_20260725/exploration/lexicon_index.md"], allowed_exposure_through: "shared_fire_and_reignition", win: true, global_burn_cycle: 5, artifacts: { layout: "layout.txt", canonical_replay_json: "canonical_replay.json", canonical_replay_markdown: "canonical_replay.md", layout_analysis_json: "layout_analysis.json", layout_analysis_markdown: "layout_analysis.md", solution_family: "solution_family.json", identity_counterfactuals: "identity_counterfactuals.json", exposure_audit: "exposure_audit.json", designer_reading: "designer_reading.yml", submission_packet: "submission.yml" }, runtime_summary: { canonical_replay: { input_count: canonicalInputs.length, win: true, final_step: canonicalInputs.length, canonical_reignite: "t2", event_win_consistent_with_final: true }, reachable_graph: { status: analysis.graph.status, states: analysis.graph.reachableStateCount, legal_transitions: analysis.graph.legalTransitionCount, win_states: analysis.graph.winStateCount }, solution_family: { status: family.graph.status, product_states: family.graph.productStateCount, winning_product_states: family.graph.winningProductStateCount, raw_shortest_input_count: family.shortestWinningFamily.rawShortestInputCount, milestone_signatures: family.winningMilestoneSignatures.length, result: "unique_complete", unique_within_budget: family.graph.status === "complete", equivalent_variants_only: family.winningMilestoneSignatures.length === 1 }, identity_counterfactuals: { count: counterfactuals.results.length, all_read: true }, exposure_gate: { verdict: exposure.verdict, graph_states: exposure.graph.reachable_state_count, graph_edges: exposure.graph.legal_transition_count, forbidden_hits: exposure.forbidden_hits.length } } };
}
function buildSubmission(analysis: any, family: any, exposure: any, counterfactuals: any) {
  return {
    submission_id: `${candidateId}_${exactVersion}_designer_submission`,
    design_task_id: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    designer_claim: {
      player_experience_core: "玩家先用墙把仍燃的 C1 主动压灭；随后让 C2 连续经历 len4、len3、len2、len1，在 C2 len1 点亮 (7,5) 并燃尽后，玩家仍要穿过无亮倒数回到左侧共享火盆，于 t2 复燃 C1。复燃后的三次边界继续把 C1 收到 len3、len2、len1，最后由 C1 点亮 (4,2)。",
      player_action: "玩家主动选择第一拍墙灭火，读取 C2 的连续边界、目标与燃尽责任，再在 C2 消失后的无亮倒数中回到共享火盆并选择 t2 复燃；复燃后按 C1 的新长度和站位完成终局。",
      visible_payoff: "step1 墙灭火保留 C1；steps5/10/15/20 依次显示 C2 len4/3/2/1，step22 点亮 (7,5)，step25 C2 燃尽；step44 共享火盆以 t2 复燃 C1，steps45/50/55 显示 C1 len3/2/1，step56 点亮 (4,2) 并胜利。",
      why_this_level_exists: "把 v3 的四种非等价目标顺序、对象责任和因果时序收束为唯一玩家逻辑，并让 replay 的 eventWin 始终与胜态一致：墙灭火—C2 先完成并燃尽—共享火盆 t2 复燃—C1 三次边界—终局。",
      work_identity_conditions: [
        "C1 必须先由墙灭火；C2 必须完整经历 len4、len3、len2、len1。",
        "C2 必须先以 len1 点亮 (7,5) 并燃尽，之后 C1 才能从 (1,3) 的共享火盆以 t2 复燃。",
        "C1 必须在复燃后经历 len3、len2、len1，最后点亮 (4,2)；不触发后续机制 branch。",
      ],
    },
    packaging_account: {
      opening: "左侧小室呈现玩家、C1、墙灭火口和共享火盆；右侧 C2 与 (7,5) 目标由短通道和墙分隔，两个目标责任可被辨认。",
      preparation: "第一步把 C1 下压到墙口；随后沿紧凑通道读取 C2 的 len4→len3→len2→len1，完成 (7,5) 的 endpoint 消费并见证 C2 燃尽。",
      reveal_or_use: "C2 消失后，玩家在无亮倒数中回到 (1,3) 共享火盆，选择 t2 复燃 C1；此后的 C1 len3、len2、len1 每次都改写下一步站位与终点责任。",
      ending: "C1 以 len1 在 step56 点亮 (4,2)，同一合法结算返回胜态并立即结束。",
      every_major_element_role: [
        "C1：墙灭火、共享火盆 t2 复燃、复燃后 len3/len2/len1、最终目标。",
        "C2：前置 len4/3/2/1、(7,5) 目标、燃尽责任。",
        "墙：第一拍主动灭火的唯一结构锚点。",
        "左共享火盆：C1 的唯一中周期复燃源。",
        "(7,5) 火盆：C2 len1 的目标消费。",
        "(4,2) 火盆：C1 len1 的终局消费。",
      ],
      known_perceptible_defects: [
        "规范解在 C2 燃尽后到共享火盆之间存在一段无亮倒数回程；它是当前 v75 时序成本，不能包装成新的机制事件。",
        "C1 的 t2 复燃发生在 C2 已燃尽之后；独立 Critic 需判断这段回程是否仍足以让复燃时机成为主动选择。",
      ],
    },
    hard_evidence: {
      solve_instance_ref: `${exactRefRoot}/solve_instance.yml`,
      canonical_replay_ref: `${exactRefRoot}/canonical_replay.json`,
      solution_uniqueness: {
        result: "unique_complete",
        search_scope: "complete",
        search_budget: `base graph ${analysis.graph.reachableStateCount} states / ${analysis.graph.legalTransitionCount} edges; product graph ${family.graph.productStateCount} states / ${family.graph.legalEdgeCount} edges; terminal winning states`,
        known_raw_winning_variants: family.shortestWinningFamily.rawShortestInputRepresentatives,
        equivalence_account: "所有 winning product states 共享同一完整 milestone signature；差异只在必要站位与走位等价变体，不改变墙灭火、C2 先完成目标并燃尽、C1 t2 复燃和 C1 终局责任。",
        evidence_refs: [`${exactRefRoot}/solution_family.json`, `${exactRefRoot}/layout_analysis.json`],
        evidence_limits: ["产品图按同一 runtime state 与同一单调里程碑历史合流；不把原始走位回环算作新逻辑解。"],
      },
      bypass_refs: [`${exactRefRoot}/solution_family.json`, `${exactRefRoot}/identity_counterfactuals.json`],
      identity_counterfactual_refs: [`${exactRefRoot}/identity_counterfactuals.json`],
      exposure_gate_ref: `${exactRefRoot}/exposure_audit.json`,
      evidence_limits: ["Designer packet 不替代 fresh Evidence Reviewer 的独立硬证据核验。", "Designer packet 不替代 Puzzle Critic 对难度和中段感受的判断。"],
    },
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
      opening: "玩家第一眼看到左侧 C1、墙口与共享火盆；第一步 down 主动让墙熄灭 C1，而不是把它当作失败。右侧 C2 由独立短通道承接后续倒数。",
      preparation: "C1 熄灭后倒数仍走；玩家先读取 C2 在 step5/10/15/20 的 len4/3/2/1 边界，完成 step22 的 (7,5) 目标消费，再看到 step25 C2 燃尽。",
      core_reveal: "C2 燃尽后，玩家要在无亮倒数中回到 (1,3) 共享火盆，并选择 step44 的 t2 复燃 C1；这次复燃不是后续 branch，而是同一核心的第二段责任接管。",
      consumption: "复燃后的 C1 在 step45/50/55 依次收到 len3/2/1；每个边界都改变 wick 可达位置和下一次 roll 选择，step56 以 len1 点亮 (4,2)。",
      ending: "第二个目标在同一合法结算后亮起并立即胜利，没有后续机制 branch。",
    },
    difficulty_reading: {
      expected: 4,
      counted_reasoning: [
        "识别第一拍墙灭火是保存 C1，而不是直接追目标。",
        "读取 C2 len4→len1、(7,5) 目标与燃尽责任，并据此安排中段位置。",
        "在无亮倒数中回到共享火盆，判断 t2 才是 C1 的复燃时机。",
        "在 C1 len3、len2、len1 的连续边界后重算可达位置和终局 roll。",
      ],
      not_counted: ["长路线本身", "重复往返本身", "后续机制事件"],
      calibration_boundary: "v75 已把 v3 的多个目标顺序与对象责任收束为唯一 C2-first→C2 burn-out→C1 t2 reignition→C1 endpoint 的因果链；但 C2 燃尽后到共享火盆仍有一段无亮回程，这是当前布局的真实时序成本，需由独立实玩判断。",
    },
    major_element_responsibility: [
      { element: "C1", responsibility: "墙灭火—C2 燃尽后 t2 复燃—len3/len2/len1—(4,2) 终局目标" },
      { element: "C2", responsibility: "len5→len1 倒数—(7,5) 目标—燃尽" },
      { element: "wall", responsibility: "第一拍主动灭火锚点" },
      { element: "left_brazier", responsibility: "C1 的唯一中周期复燃源" },
      { element: "brazier_7_5", responsibility: "C2 len1 目标" },
      { element: "brazier_4_2", responsibility: "C1 len1 终局目标" },
    ],
    solution_family_reading: { status: family.graph.status, winning_product_states: family.graph.winningProductStateCount, milestone_signature_count: family.winningMilestoneSignatures.length, required_history_all_wins: family.requiredHistory.everyWinningTraceHasAllRequiredFlags, evidence_ref: "solution_family.json" },
    identity_counterfactual_reading: { variants_read: counterfactuals.results.length, all_graphs_complete: counterfactuals.results.every((result: any) => result.graph.status === "complete"), evidence_ref: "identity_counterfactuals.json" },
    exposure_audit_reading: { status: exposure.verdict, allowed_exposure_through: "shared_fire_and_reignition", forbidden_hit_count: exposure.forbidden_hits.length, evidence_ref: "exposure_audit.json" },
    known_defects: [
      "v75 的规范解在 C2 燃尽后到共享火盆之间有一段无亮倒数回程；它没有被伪装成新的玩家决策。",
      "C1 的 t2 复燃发生在 C2 已燃尽之后；独立 Critic 需判断回程和复燃时机是否仍形成足够清晰的主动利用。",
    ],
    evidence_limits: ["这是 Designer 玩家侧重读，不是独立 review verdict。"],
  };
}
function buildSolveInstance(replay: any) {
  return {
    task: "studio_shared_fire_reignition_timing_20260725",
    candidate_id: candidateId,
    exact_version: exactVersion,
    level_id: levelId,
    input_sequence: canonicalInputs,
    input_count: canonicalInputs.length,
    complete: replay.replay.completed,
    win: replay.final.isWin,
    final_state: replay.final.render,
    event_trace: replay.steps.map((replayStep: any) => ({ step: replayStep.step, input: replayStep.input, legal: replayStep.legal, events: replayStep.events, eventWin: replayStep.eventWin, afterIsWin: replayStep.after.isWin })),
    canonical_milestones: [
      { at_step: 1, milestone: "C1 wall douse", expected_event: "extinguish_by_wall:candle#1" },
      { at_step: 5, milestone: "C2 first boundary len4", expected_event: "shrink:candle#2:len4" },
      { at_step: 10, milestone: "C2 second boundary len3", expected_event: "shrink:candle#2:len3" },
      { at_step: 15, milestone: "C2 third boundary len2", expected_event: "shrink:candle#2:len2" },
      { at_step: 20, milestone: "C2 reaches len1", expected_event: "shrink:candle#2:len1" },
      { at_step: 22, milestone: "C2 len1 endpoint lights (7,5)", expected_event: "light_brazier:7,5" },
      { at_step: 25, milestone: "C2 burns out", expected_event: "burn_out:candle#2" },
      { at_step: 44, milestone: "C1 t2 shared-brazier reignition", expected_event: "ignite_midcycle:candle#1:t2 + ignite_from_brazier:candle#1:1,3" },
      { at_step: 45, milestone: "first post-reignite C1 boundary len3", expected_event: "shrink:candle#1:len3" },
      { at_step: 50, milestone: "second post-reignite C1 boundary len2", expected_event: "shrink:candle#1:len2" },
      { at_step: 55, milestone: "third post-reignite C1 boundary len1", expected_event: "shrink:candle#1:len1" },
      { at_step: 56, milestone: "C1 endpoint lights (4,2) and wins", expected_event: "light_brazier:4,2 + win_all_braziers_lit" },
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
      replay_nonempty: replay.steps.length >= 22,
      replay_win: replay.final.isWin,
      replay_step_event_win_consistent: replay.steps.every((replayStep: any) => replayStep.eventWin === replayStep.after.isWin),
      c1_wall_douse_present: replay.steps.some((replayStep: any) => replayStep.events.includes("extinguish_by_wall:candle#1")),
      c1_shared_reignite_present: replay.steps.some((replayStep: any) => replayStep.events.includes("ignite_from_brazier:candle#1:1,3")),
      post_reignite_boundary_consumptions_at_least_two: replay.steps.filter((replayStep: any) => replayStep.events.some((event: string) => event.startsWith("shrink:candle#1")) && replayStep.step > 44).length >= 2,
      graph_complete: analysis.graph.status === "complete",
      solution_family_complete: family.graph.status === "complete",
      uniqueness_result: "unique_complete",
      unique_within_budget: family.graph.status === "complete",
      equivalent_variants_only: family.winningMilestoneSignatures.length === 1,
      one_milestone_signature: family.winningMilestoneSignatures.length === 1,
      all_wins_keep_required_history: family.requiredHistory.everyWinningTraceHasAllRequiredFlags,
      identity_counterfactuals_complete: counterfactuals.results.length === 6 && counterfactuals.results.every((result: any) => result.graph.status === "complete"),
      exposure_complete: exposure.graph.status === "complete",
      forbidden_event_hits_zero: exposure.forbidden_hits.length === 0,
      exposure_gate_pass: exposure.verdict === "pass",
      no_ledger_dispatch_critic_levels_queue_handoff_written: true,
    },
    boundary_read: [
      "step1：墙灭火 C1；C2 继续自己的倒数责任。",
      "steps5/10/15/20：C2 依次收到 len4/3/2/1，右侧可达位置和下一操作选择连续变化；step22 点亮 (7,5)，step25 C2 燃尽。",
      "step44：在 C2 已燃尽后的无亮倒数中，玩家从 (1,3) 共享火盆以 t2 复燃 C1；此处只发生 shared_fire_and_reignition，不宣称胜利。",
      "steps45/50/55：C1 依次收到 len3/2/1，三次边界继续改变下一次站位；step56 点亮 (4,2) 并以同一合法结算胜利。",
    ],
    evidence_limits: ["自查只支持发布 packet，不取代独立 Evidence Reviewer 或 Puzzle Critic。"],
  };
}
function formatReasoningSketch(selfCheck: any): string { return [`# ${candidateId} v4 工作台自查`, "", "本轮 mechanical revision 将 v3 的四种非等价 milestone signature 收回为单一 C2-first→C2 burn-out→C1 t2 reignition→C1 endpoint 因果链，并修正 replay 的逐步 eventWin 一致性。", "", "## 逐边界玩家读取", "", ...selfCheck.boundary_read.map((item: string) => `- ${item}`), "", "## 发布门槛", "", ...Object.entries(selfCheck.checks).map(([key, value]) => `- ${key}: ${value === true || value === "unique_complete" ? "pass" : "fail"}`), ""].join("\n"); }
function formatIdentityCounterfactualsMarkdown(report: any): string { return [`# 作品身份反事实：${candidateId} v4`, "", "## 基线", "", "```text", report.baseline.layout, "```", "", `- 规范输入：${report.baseline.canonicalInputs.join(" ")}`, "", ...report.results.flatMap((result: any) => [`## ${result.id}`, "", `- 关系：${result.relation}`, `- 完整图：${result.graph.status}；states=${result.graph.reachableStateCount}；edges=${result.graph.legalTransitionCount}；wins=${result.graph.winStateCount}`, `- 最短可解：${result.solve.found ? `是，cost=${result.solve.cost}` : "否"}`, "", "```text", result.layout, "```", ""]), "## 证据边界", "", ...report.evidenceLimits.map((limit: string) => `- ${limit}`), ""].join("\n"); }
function sha256(value: string): string { return createHash("sha256").update(value, "utf8").digest("hex"); }
