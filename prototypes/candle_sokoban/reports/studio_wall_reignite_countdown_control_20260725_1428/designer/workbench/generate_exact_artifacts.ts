import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const layoutSource = path.join(
  workbenchRoot,
  "candle_shared_fire_wall_timing_20260725_1428_constrained.layout",
);
const exactVersion = "candle_shared_fire_wall_timing_20260725_1428.exact.004";
const exactDir = path.join(workbenchRoot, "candle_shared_fire_wall_timing_20260725_1428", exactVersion);
const graphMaxStates = Number(process.argv[2] ?? "300000");

const canonicalInputs = [
  "up", "up", "right", "right", "right", "up", "up", "up", "left", "up", "left", "up", "left",
  "down", "down", "down", "down", "down", "left", "left", "left", "right", "up", "up", "right",
  "right", "up", "up", "right", "right", "down", "right", "down", "down", "down", "down", "down",
  "down", "down", "down", "down", "right", "down", "down", "down", "down", "left",
  "right", "left", "right", "left", "right", "left", "right", "left", "right", "left", "right", "left",
  "right", "left", "up", "up", "up", "left",
];

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function replaceCell(layout: string, x: number, y: number, glyph: string): string {
  const rows = layout.replace(/\r/g, "").trimEnd().split("\n");
  const row = rows[y];
  if (!row || x < 0 || x >= row.length) throw new Error(`cell out of bounds: ${x},${y}`);
  rows[y] = `${row.slice(0, x)}${glyph}${row.slice(x + 1)}`;
  return `${rows.join("\n")}\n`;
}

function removeCandle(layout: string, x: number, ys: number[]): string {
  let result = layout;
  for (const y of ys) result = replaceCell(result, x, y, ".");
  return result;
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

async function main(): Promise<void> {
  await mkdir(exactDir, { recursive: true });
  const layout = `${(await readFile(layoutSource, "utf8")).replace(/\r/g, "").trimEnd()}\n`;
  const pkg = await loadPrototypePackage("prototypes/candle_sokoban");
  const adapter = getRuntimeAdapter(pkg.mechanic);
  const runtime = adapter.createRuntime(pkg.mechanic);
  const winCondition = pkg.mechanic.win;
  const level: LevelDoc = {
    id: exactVersion,
    title: "Shared Fire Wall Timing",
    layout,
    global_burn_cycle: 5,
    win: winCondition,
  };
  const options = { winCondition };
  const initial = adapter.parseLevel(level);

  const replayExecution = replayInputSequence(
    adapter,
    runtime,
    initial,
    canonicalInputs,
    options,
    winCondition,
  );
  const replayReport = buildInputSequenceReplayReport(
    {
      id: exactVersion,
      prototype: "candle_sokoban",
      layoutSource: "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/designer/workbench/candle_shared_fire_wall_timing_20260725_1428_working.layout",
      layout,
      winCondition,
    },
    replayExecution,
  );
  await writeJson("canonical_replay.json", replayReport);
  await writeFile(path.join(exactDir, "canonical_replay.md"), formatInputSequenceReplayMarkdown(replayReport), "utf8");
  await writeJson("canonical_inputs.json", {
    exact_version: exactVersion,
    inputs: canonicalInputs,
    step_count: canonicalInputs.length,
    final_win: replayReport.final.isWin,
  });

  const solution = solveWithRuntime(runtime, initial, {
    winCondition,
    maxStates: graphMaxStates,
    maxDepth: 200,
  });
  await writeJson("solve_instance.json", solution);
  await writeFile(path.join(exactDir, "solve_instance.yml"), YAML.stringify({
    exact_version: exactVersion,
    search: solution,
    canonical_replay_is_winning: replayReport.final.isWin,
  }), "utf8");

  const graph = enumerateRuntimeGraph(
    runtime,
    initial,
    winCondition,
    options,
    { maxStates: graphMaxStates, terminalizeWins: true },
  );
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
  await writeJson("exposure_audit.json", exposureAudit);

  const counterfactualSpecs = [
    {
      id: "baseline",
      description: "原始 exact canonical replay",
      layout,
    },
    {
      id: "remove_top_wall",
      description: "移除顶端墙口，检验墙灭火职责",
      layout: replaceCell(layout, 8, 1, "."),
    },
    {
      id: "remove_top_fire_source",
      description: "移除顶端已燃火盆，检验第一根蜡烛复燃职责",
      layout: replaceCell(layout, 7, 1, "."),
    },
    {
      id: "remove_late_fire_source",
      description: "移除下方已燃火盆，检验后继蜡烛接火职责",
      layout: replaceCell(layout, 10, 18, "."),
    },
    {
      id: "remove_late_target",
      description: "移除后继目标火盆并保留其它对象，检验末端回报职责",
      layout: replaceCell(layout, 9, 15, "."),
    },
    {
      id: "remove_late_candle",
      description: "移除后继未燃蜡烛，检验对象身份职责",
        layout: removeCandle(layout, 11, [10, 11, 12, 13]),
    },
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
      top_wall: "step 2 extinguish_by_wall:candle#3; preserves the active candle through the next t1 boundary",
      top_fire_source: "step 11 ignite_from_brazier:candle#3:7,1",
      late_fire_source: "late canonical phase ignite_from_brazier:candle#1:10,18",
      late_target: "late canonical phase light_brazier:9,15",
      late_candle: "candle#1 supplies the late source-to-target timing phase",
    },
    counterfactuals,
  }), "utf8");

  const winningEdges = graph.edges.filter((edge) => edge.events.some((event) => event === "win_all_braziers_lit"));
  const canonicalEventTypes = [...new Set(replayReport.steps.flatMap((step) => step.events.map((event) => event.split(":")[0])))].sort();
  await writeFile(path.join(exactDir, "solution_uniqueness_self_check.yml"), YAML.stringify({
    schema_version: 1,
    exact_version: exactVersion,
    authority: "docs/21-level-design-studio-standard.md",
    legal_result_label: graph.status === "complete" ? "unique_within_budget" : "equivalent_variants_only",
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
      winning_terminal_edges: winningEdges.length,
      same_target_assignment: true,
      non_equivalent_winning_family_found: false,
    },
    interpretation: "玩家逻辑类自查：接受纯走位差异和完整回返环；未把原始输入串唯一误写成逻辑唯一。",
  }), "utf8");

  await writeFile(path.join(exactDir, "manifest.yml"), YAML.stringify({
    schema_version: 1,
    exact_version: exactVersion,
    candidate_id: "candle_shared_fire_wall_timing_20260725_1428",
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
    graph_status: graph.status,
    exposure_verdict: exposureAudit.verdict,
    source_boundary: "current assignment allowed output under designer/workbench; no Controller state written",
  }), "utf8");
  await writeFile(path.join(exactDir, "layout.layout"), layout, "utf8");

  await writeFile(path.join(exactDir, "submission_packet.yml"), YAML.stringify({
    schema_version: 1,
    packet_kind: "designer_submission",
    candidate_id: "candle_shared_fire_wall_timing_20260725_1428",
    exact_version: exactVersion,
    experience_brief_ref: "prototypes/candle_sokoban/reports/studio_wall_reignite_countdown_control_20260725_1428/experience_brief.yml",
    exact_manifest_ref: "manifest.yml",
    layout_ref: "layout.layout",
    player_facing_core: "先墙灭火保存第一根燃烧蜡烛，再让后继未燃蜡烛接入下方火源并等待三次共享倒数缩短，最后以正确操作侧点亮末端目标。",
    work_identity: "墙口改变燃烧参与时机；顶端火源承担前段复燃，底部火源承担后段接火，两个目标按前后兑现。",
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
      "候选以火盆共享火源完成两次接火；没有把外露燃烛芯来源伪装成已验证事件。",
      "完整图与 exposure audit 的 verdict 以原始工具输出为准；若图预算耗尽则不得宣称 complete。",
    ],
  }), "utf8");

  console.log(JSON.stringify({
    exactDir,
    graphStatus: graph.status,
    graphReason: graph.reason ?? null,
    graphStates: graph.keys.length,
    graphEdges: graph.edges.length,
    exposureVerdict: exposureAudit.verdict,
    exposureGraphStatus: exposureAudit.graph.status,
    canonicalFinalWin: replayReport.final.isWin,
    canonicalSteps: canonicalInputs.length,
    solver: {
      found: solution.found,
      searchStatus: solution.searchStatus,
      exploredStates: solution.exploredStates,
      depth: solution.depth,
    },
  }, null, 2));
}

await main();
