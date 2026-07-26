import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { enumerateRuntimeGraph } from "../../../../../../src/core/runtimeGraph.js";
import { loadPrototypePackage } from "../../../../../../src/core/io.js";
import { solveWithRuntime } from "../../../../../../src/core/solver.js";
import type { LevelDoc } from "../../../../../../src/core/types.js";
import {
  buildInputSequenceReplayReport,
  formatInputSequenceReplayMarkdown,
  replayInputSequence,
} from "../../../../../../src/workflows/inputSequenceReplay.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
} from "../../../../../../src/prototypes/candle_sokoban/exposureAudit.js";
import { getRuntimeAdapter } from "../../../../../../src/prototypes/runtimeAdapter.js";

const repoRoot = path.resolve(process.cwd());
const reportRoot = path.join(
  repoRoot,
  "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428",
);
const workbenchRoot = path.join(reportRoot, "designer/workbench");
const layoutSource = path.join(workbenchRoot, "fresh_family_verticallock_001.layout");
const candidateId = "candle_shared_fire_wall_timing_20260725_1428";
const exactVersion = `${candidateId}.exact.005`;
const exactDir = path.join(workbenchRoot, candidateId, exactVersion);
const graphMaxStates = 300_000;

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function normalizedLayout(layout: string): string {
  return `${layout.replace(/\r/g, "").trimEnd()}\n`;
}

function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = normalizedLayout(layout).trimEnd().split("\n");
  const row = rows[y];
  if (!row || x < 0 || x >= row.length) {
    throw new Error(`cell out of bounds: ${x},${y}`);
  }
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return normalizedLayout(rows.join("\n"));
}

function compactReplaySummary(report: ReturnType<typeof buildInputSequenceReplayReport>) {
  return {
    completed: report.replay.completed,
    executed_steps: report.replay.executedSteps,
    legal_through_step: report.replay.legalThroughStep,
    final_win: report.final.isWin,
    final_state_key: report.final.key,
    event_types: [...new Set(report.steps.flatMap((step) => step.events.map((event) => event.split(":")[0])))],
    event_counts: report.steps
      .flatMap((step) => step.events)
      .reduce<Record<string, number>>((counts, event) => {
        const type = event.split(":")[0] ?? event;
        counts[type] = (counts[type] ?? 0) + 1;
        return counts;
      }, {}),
  };
}

function maxDepth(depths: number[]): number {
  return depths.reduce((maximum, depth) => Math.max(maximum, depth), 0);
}

async function writeJson(name: string, value: unknown): Promise<void> {
  await writeFile(path.join(exactDir, name), `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function milestoneSignature(events: string[]): string {
  return events
    .filter((event) => /extinguish_by_wall|ignite_from_brazier|light_brazier|burn_out|win_all_braziers_lit/.test(event))
    .join("|");
}

function graphWinningSignatures(graph: ReturnType<typeof enumerateRuntimeGraph>) {
  const parent = new Array<number>(graph.keys.length).fill(-1);
  const parentEdge = new Array<number>(graph.keys.length).fill(-1);
  for (const [edgeIndex, edge] of graph.edges.entries()) {
    if (edge.to !== 0 && parentEdge[edge.to] === -1) {
      parent[edge.to] = edge.from;
      parentEdge[edge.to] = edgeIndex;
    }
  }
  const routeFor = (index: number) => {
    const edges: typeof graph.edges = [];
    for (let cursor = index; cursor !== 0 && parentEdge[cursor] >= 0; cursor = parent[cursor]!) {
      edges.push(graph.edges[parentEdge[cursor]!]!);
    }
    edges.reverse();
    return edges;
  };
  const rows = [...graph.winStateIndexes].map((index) => {
    const events = routeFor(index).flatMap((edge) => edge.events);
    return {
      index,
      depth: graph.depthByIndex[index] ?? 0,
      key: graph.keys[index],
      signature: milestoneSignature(events),
    };
  });
  const groups = new Map<string, typeof rows>();
  for (const row of rows) {
    const group = groups.get(row.signature) ?? [];
    group.push(row);
    groups.set(row.signature, group);
  }
  return {
    rows,
    groups: [...groups.entries()].map(([signature, members]) => ({ signature, members })),
  };
}

async function main(): Promise<void> {
  try {
    await access(exactDir);
    throw new Error(`immutable exact already exists: ${exactDir}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const layout = normalizedLayout(await readFile(layoutSource, "utf8"));
  const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const level: LevelDoc = {
    id: exactVersion,
    title: "Shared Fire Wall Timing — Fresh Vertical Lock Family",
    layout,
    global_burn_cycle: 5,
    win: pkg.mechanic.win,
  };
  const winCondition = pkg.mechanic.win;
  const options = { winCondition };
  const initialForSolve = adapter.parseLevel(level);

  const solution = solveWithRuntime(runtime, initialForSolve, {
    winCondition,
    maxStates: graphMaxStates,
    maxDepth: 200,
  });
  if (!solution.found || !solution.inputs) {
    throw new Error(`solver gate failed: found=${solution.found} status=${solution.searchStatus}`);
  }
  const canonicalInputs = solution.inputs;
  const initialForReplay = adapter.parseLevel(level);
  const replayExecution = replayInputSequence(
    adapter,
    runtime,
    initialForReplay,
    canonicalInputs,
    options,
    winCondition,
  );
  const replayReport = buildInputSequenceReplayReport(
    {
      id: exactVersion,
      prototype: "candle_sokoban",
      layoutSource: layoutSource.replace(`${repoRoot}${path.sep}`, "").replaceAll(path.sep, "/"),
      layout,
      winCondition,
    },
    replayExecution,
  );
  if (!replayReport.final.isWin) {
    throw new Error("canonical replay gate failed: final_win=false");
  }

  const initialForGraph = adapter.parseLevel(level);
  const graph = enumerateRuntimeGraph(
    runtime,
    initialForGraph,
    winCondition,
    options,
    { maxStates: graphMaxStates, terminalizeWins: true },
  );
  if (graph.status !== "complete" || graph.winStateIndexes.size === 0) {
    throw new Error(`graph gate failed: status=${graph.status} wins=${graph.winStateIndexes.size}`);
  }
  const winningSignatures = graphWinningSignatures(graph);
  if (winningSignatures.groups.length !== 1) {
    throw new Error(`uniqueness gate failed: non-equivalent signature groups=${winningSignatures.groups.length} ${JSON.stringify(winningSignatures.groups)}`);
  }

  const exposure = loadCandleExposureSequence(
    path.join(repoRoot, "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml"),
  );
  const exposureAudit = auditCandleExposure(
    pkg,
    level,
    exposure.sequence,
    exposure.raw,
    {
      allowedExposureThrough: "shared_fire_and_reignition",
      exactVersion,
      maxStates: graphMaxStates,
    },
  );
  if (exposureAudit.verdict !== "pass" || exposureAudit.graph.status !== "complete" || exposureAudit.forbidden_hits.length !== 0) {
    throw new Error(`exposure gate failed: verdict=${exposureAudit.verdict} graph=${exposureAudit.graph.status} forbidden=${exposureAudit.forbidden_hits.length}`);
  }

  await mkdir(exactDir, { recursive: false });
  await writeJson("canonical_replay.json", replayReport);
  await writeFile(path.join(exactDir, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replayReport), "utf8");
  await writeJson("canonical_inputs.json", {
    exact_version: exactVersion,
    inputs: canonicalInputs,
    step_count: canonicalInputs.length,
    final_win: replayReport.final.isWin,
  });
  await writeJson("solve_instance.json", solution);
  await writeFile(path.join(exactDir, "solve_instance.yml"), YAML.stringify({
    exact_version: exactVersion,
    found: solution.found,
    search: solution,
    canonical_replay_is_winning: replayReport.final.isWin,
  }), "utf8");

  const rawGraph = {
    schema_version: 1,
    exact_version: exactVersion,
    status: graph.status,
    reason: graph.reason ?? null,
    nodes: graph.keys.map((key, index) => ({
      index,
      key,
      depth: graph.depthByIndex[index] ?? 0,
      winning: graph.winStateIndexes.has(index),
    })),
    edges: graph.edges.map((edge, index) => ({
      index,
      from: edge.from,
      to: edge.to,
      action: edge.action,
      events: edge.events,
    })),
  };
  await writeJson("complete_graph.json", rawGraph);
  await writeJson("graph_summary.json", {
    exact_version: exactVersion,
    status: graph.status,
    reason: graph.reason ?? null,
    state_count: graph.keys.length,
    legal_transition_count: graph.edges.length,
    winning_state_count: graph.winStateIndexes.size,
    max_observed_depth: maxDepth(graph.depthByIndex),
    budget: { max_states: graphMaxStates, terminalize_wins: true },
  });
  await writeJson("exposure_audit.json", exposureAudit);

  const counterfactualSpecs = [
    { id: "remove_top_wall", description: "移除墙口，检验墙灭火职责", layout: replaceCell(layout, 8, 1, ".") },
    { id: "remove_top_fire_source", description: "移除顶端已燃火盆，检验墙灭火后的共享火源复燃职责", layout: replaceCell(layout, 7, 1, ".") },
    { id: "remove_late_fire_source", description: "移除下方已燃火盆，检验后继蜡烛接火职责", layout: replaceCell(layout, 18, 11, ".") },
    { id: "remove_late_target", description: "移除末端目标火盆，检验最终点火回报职责", layout: replaceCell(layout, 17, 11, ".") },
    { id: "remove_late_candle", description: "移除后继单格蜡烛，检验后段接火链职责", layout: replaceCell(layout, 18, 13, ".") },
  ];
  const counterfactuals = counterfactualSpecs.map((spec) => {
    const variantLevel: LevelDoc = { ...level, id: `${exactVersion}.${spec.id}`, layout: spec.layout };
    try {
      const variantInitial = adapter.parseLevel(variantLevel);
      const variantReplay = replayInputSequence(
        adapter,
        runtime,
        variantInitial,
        canonicalInputs,
        options,
        winCondition,
      );
      return {
        id: spec.id,
        description: spec.description,
        layout_sha256: sha256(spec.layout),
        replay: compactReplaySummary(buildInputSequenceReplayReport(
          {
            id: variantLevel.id,
            prototype: "candle_sokoban",
            layoutSource: `counterfactual:${spec.id}`,
            layout: spec.layout,
            winCondition,
          },
          variantReplay,
        )),
      };
    } catch (error) {
      return {
        id: spec.id,
        description: spec.description,
        layout_sha256: sha256(spec.layout),
        parse_or_replay_error: error instanceof Error ? error.message : String(error),
      };
    }
  });
  await writeFile(path.join(exactDir, "object_participation_counterfactuals.yml"), YAML.stringify({
    schema_version: 1,
    exact_version: exactVersion,
    baseline: {
      top_wall: "canonical step 2 emits extinguish_by_wall:candle#2; the shared countdown continues without a lit candle",
      top_fire_source: "canonical later emits ignite_from_brazier:candle#2:7,1",
      late_fire_source: "canonical late phase emits ignite_from_brazier:candle#single2:18,11",
      late_target: "canonical final roll emits light_brazier:17,11 and then normal win_all_braziers_lit",
      late_candle: "the single-cell later candle is the only bridge from the lower lit source to the target brazier",
    },
    counterfactuals,
  }), "utf8");

  const canonicalEventTypes = [...new Set(replayReport.steps.flatMap((step) => step.events.map((event) => event.split(":")[0])))].sort();
  await writeFile(path.join(exactDir, "solution_uniqueness_self_check.yml"), YAML.stringify({
    schema_version: 1,
    exact_version: exactVersion,
    authority: "docs/21-level-design-studio-standard.md",
    legal_result_label: "unique_within_budget",
    canonical: {
      final_win: replayReport.final.isWin,
      step_count: canonicalInputs.length,
      event_types: canonicalEventTypes,
      final_state_key: replayReport.final.key,
    },
    graph_check: {
      status: graph.status,
      state_count: graph.keys.length,
      winning_state_count: graph.winStateIndexes.size,
      winning_signature_group_count: winningSignatures.groups.length,
      winning_state_signatures: winningSignatures.groups,
      same_target_assignment: true,
      non_equivalent_winning_family_found: false,
    },
    interpretation: "玩家逻辑类自查：允许同一事件族内的等待/走位差异；完整图未发现第二种事件签名或空蜡烛旁路。",
  }), "utf8");

  await writeFile(path.join(exactDir, "manifest.yml"), YAML.stringify({
    schema_version: 1,
    exact_version: exactVersion,
    candidate_id: candidateId,
    immutable: true,
    prototype: "candle_sokoban",
    layout_sha256: sha256(layout),
    layout_artifact: "layout.layout",
    canonical_replay_artifact: "canonical_replay.json",
    solve_instance_artifact: "solve_instance.json",
    graph_artifact: "complete_graph.json",
    exposure_audit_artifact: "exposure_audit.json",
    object_counterfactual_artifact: "object_participation_counterfactuals.yml",
    uniqueness_artifact: "solution_uniqueness_self_check.yml",
    canonical_step_count: canonicalInputs.length,
    canonical_final_win: replayReport.final.isWin,
    solve_found: solution.found,
    solve_cost: solution.depth ?? null,
    graph_status: graph.status,
    graph_state_count: graph.keys.length,
    graph_edge_count: graph.edges.length,
    graph_win_state_count: graph.winStateIndexes.size,
    exposure_verdict: exposureAudit.verdict,
    exposure_forbidden_hits: exposureAudit.forbidden_hits,
    unique_within_budget: winningSignatures.groups.length === 1,
    source_boundary: "current revision assignment allowed output under designer/workbench; no Controller state or delivery file written",
  }), "utf8");
  await writeFile(path.join(exactDir, "layout.layout"), layout, "utf8");
  await writeFile(path.join(exactDir, "submission_packet.yml"), YAML.stringify({
    schema_version: 1,
    packet_kind: "designer_submission",
    candidate_id: candidateId,
    exact_version: exactVersion,
    experience_brief_ref: "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/experience_brief.yml",
    exact_manifest_ref: "manifest.yml",
    layout_ref: "layout.layout",
    player_facing_core: "先主动用墙熄灭上方燃烛，利用共享倒数让火势进入可控节拍；随后让下方单格蜡烛接入已燃火盆，在正确时序中横向复燃末端火盆。",
    work_identity: "墙口不是一次性开关，而是改变燃烧参与时机的控制点；上方火盆负责墙灭火后的复燃，下方火盆负责后段接火，末端火盆完成正常 all_braziers_lit 回报。",
    packaging_intent: "complete_single_level",
    expected_difficulty: 4,
    canonical_replay_ref: "canonical_replay.json",
    solve_instance_ref: "solve_instance.json",
    complete_graph_ref: "complete_graph.json",
    exposure_audit_ref: "exposure_audit.json",
    object_participation_ref: "object_participation_counterfactuals.yml",
    solution_uniqueness_ref: "solution_uniqueness_self_check.yml",
    hard_evidence_boundary: "raw artifacts are frozen for Controller assembly; Designer makes no review or acceptance claim",
    known_limitations: [
      "后段使用单格蜡烛把等待后的燃尽旁路收束为同一事件族；没有引入 body concealment、retreating flame 或 rolling contact chain。",
      "完整图、exposure audit 与 solver 的硬事实以本 exact 目录内原始 artifacts 为准。",
    ],
  }), "utf8");

  console.log(JSON.stringify({
    exactDir,
    exactVersion,
    candidateId,
    solver: {
      found: solution.found,
      search_status: solution.searchStatus,
      cost: solution.depth,
      explored_states: solution.exploredStates,
    },
    canonical: {
      step_count: canonicalInputs.length,
      final_win: replayReport.final.isWin,
      final_state_key: replayReport.final.key,
    },
    graph: {
      status: graph.status,
      states: graph.keys.length,
      edges: graph.edges.length,
      winning_states: graph.winStateIndexes.size,
    },
    exposure: {
      verdict: exposureAudit.verdict,
      graph_status: exposureAudit.graph.status,
      forbidden_hits: exposureAudit.forbidden_hits,
    },
    uniqueness: {
      signature_groups: winningSignatures.groups.length,
      non_equivalent_winning_family_found: false,
    },
  }, null, 2));
}

await main();
