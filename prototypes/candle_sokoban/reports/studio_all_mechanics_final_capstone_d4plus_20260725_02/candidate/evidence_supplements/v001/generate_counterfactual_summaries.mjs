import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const taskRoot =
  "prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02";
const supplementRoot = `${taskRoot}/candidate/evidence_supplements/v001`;
const exactRoot = `${taskRoot}/candidate/versions/v001`;
const candidateId = "CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002";
const exactVersion = "v001";

const cases = [
  {
    id: "guard_removed",
    graphId: `${candidateId}_COUNTERFACTUAL_GUARD_REMOVED`,
    layoutRef: `${exactRoot}/counterfactuals/no_guard.txt`,
    mutation:
      "删除开局 movable guard 整根 candle#single3；其唯一烛身格 4,6 恢复为普通地面。",
    expected: { states: 12755, edges: 41007, wins: 5, shortest: 26 },
  },
  {
    id: "wall_removed",
    graphId: `${candidateId}_COUNTERFACTUAL_WALL_REMOVED`,
    layoutRef: `${exactRoot}/counterfactuals/no_wall.txt`,
    mutation: "把 writer wick-track 的核心墙格 4,4 替换为普通地面。",
    expected: { states: 29148, edges: 93119, wins: 2, shortest: 28 },
  },
  {
    id: "active_source_removed",
    graphId: `${candidateId}_COUNTERFACTUAL_ACTIVE_SOURCE_REMOVED`,
    layoutRef: `${exactRoot}/counterfactuals/no_source.txt`,
    mutation:
      "删除 active source candle#5 的完整烛身 4,5 与 5,5，同时保留周围墙体。",
    expected: { states: 64065, edges: 200681, wins: 0, shortest: null },
  },
];

const authorityRefs = [
  "prototypes/candle_sokoban/docs/designer_contract.md",
  "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml",
  "prototypes/candle_sokoban/mechanic.yml",
  "src/prototypes/candle_sokoban/mechanics.ts",
  "src/prototypes/candle_sokoban/exposureAudit.ts",
  "src/prototypes/candle_sokoban/exposureAuditCli.ts",
  "src/core/runtimeGraph.ts",
  `${exactRoot}/level.yml`,
  `${exactRoot}/solve_instance.yml`,
  `${exactRoot}/identity_counterfactuals.yml`,
  `${exactRoot}/layout.txt`,
];

const cwd = process.cwd();
const resolve = (ref) => path.resolve(cwd, ref);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const readBytes = (ref) => readFile(resolve(ref));
const writeJson = (ref, value) =>
  writeFile(resolve(ref), `${JSON.stringify(value, null, 2)}\n`, "utf8");

const authorityDigests = {};
for (const ref of authorityRefs) {
  const bytes = await readBytes(ref);
  authorityDigests[ref] = { bytes: bytes.length, sha256: sha256(bytes) };
}

const baselineLayoutRef = `${exactRoot}/layout.txt`;
const baselineLayoutBytes = await readBytes(baselineLayoutRef);
const baselineLayoutSha256 = sha256(baselineLayoutBytes);
if (
  baselineLayoutSha256 !==
  "07f6b42d7fb8634537083b11acf60fc5ac28b2e38ef84370481f02a1175211ca"
) {
  throw new Error(`v001 layout digest changed: ${baselineLayoutSha256}`);
}

for (const current of cases) {
  const caseRoot = `${supplementRoot}/${current.id}`;
  const rawGraphRef = `${caseRoot}/raw_complete_graph.json`;
  const solveResultRef = `${caseRoot}/solve_result.json`;
  const representativesRef = `${caseRoot}/winning_state_representatives.jsonl`;
  const unsatRef = `${caseRoot}/unsat_certificate.json`;
  const reproductionRef = `${caseRoot}/reproduction.json`;

  const rawGraphBytes = await readBytes(rawGraphRef);
  const report = JSON.parse(rawGraphBytes.toString("utf8"));
  const layoutBytes = await readBytes(current.layoutRef);
  const layoutSha256 = sha256(layoutBytes);

  if (report.exact_version !== exactVersion) {
    throw new Error(`${current.id}: exact version mismatch ${report.exact_version}`);
  }
  if (report.level?.id !== current.graphId) {
    throw new Error(`${current.id}: graph id mismatch ${report.level?.id}`);
  }
  if (report.level?.layout_sha256 !== layoutSha256) {
    throw new Error(`${current.id}: mutation layout digest mismatch`);
  }
  if (report.graph?.status !== "complete") {
    throw new Error(`${current.id}: graph is not complete`);
  }
  if (report.graph?.budget?.max_states !== 500000) {
    throw new Error(`${current.id}: max_states is not 500000`);
  }
  if (report.graph?.max_observed_depth > 200) {
    throw new Error(`${current.id}: observed depth exceeds v001 solve budget`);
  }
  if (report.raw_graph?.nodes?.length !== report.graph.reachable_state_count) {
    throw new Error(`${current.id}: raw node count mismatch`);
  }
  if (report.raw_graph?.edges?.length !== report.graph.legal_transition_count) {
    throw new Error(`${current.id}: raw edge count mismatch`);
  }

  const nodes = report.raw_graph.nodes;
  const edges = report.raw_graph.edges;
  const nodeByIndex = new Map(nodes.map((node) => [node.index, node]));
  const incoming = new Map();
  for (const edge of edges) {
    const bucket = incoming.get(edge.to) ?? [];
    bucket.push(edge);
    incoming.set(edge.to, bucket);
  }
  for (const bucket of incoming.values()) {
    bucket.sort((left, right) => left.index - right.index);
  }

  const winningNodes = nodes
    .filter((node) => node.winning)
    .sort((left, right) => left.depth - right.depth || left.index - right.index);
  if (winningNodes.length !== report.graph.win_state_count) {
    throw new Error(`${current.id}: raw winning-node count mismatch`);
  }

  const representatives = winningNodes.map((winNode) => {
    const reversed = [];
    let cursor = winNode.index;
    while (cursor !== 0) {
      const cursorNode = nodeByIndex.get(cursor);
      if (!cursorNode) {
        throw new Error(`${current.id}: missing node ${cursor}`);
      }
      const parent = (incoming.get(cursor) ?? []).find((edge) => {
        const fromNode = nodeByIndex.get(edge.from);
        return fromNode && fromNode.depth === cursorNode.depth - 1;
      });
      if (!parent) {
        throw new Error(`${current.id}: no BFS parent for node ${cursor}`);
      }
      reversed.push(parent);
      cursor = parent.from;
    }
    const pathEdges = reversed.reverse();
    const events = pathEdges.flatMap((edge) => edge.events);
    return {
      schema_version: 1,
      artifact_kind: "counterfactual_winning_state_bfs_representative",
      candidate_id: candidateId,
      exact_version_basis: exactVersion,
      counterfactual_id: current.id,
      win_state_index: winNode.index,
      bfs_depth: winNode.depth,
      state_key: winNode.key,
      inputs: pathEdges.map((edge) => edge.action),
      event_checks: {
        any_extinguish_by_wall: events.some((event) =>
          event.startsWith("extinguish_by_wall:"),
        ),
        writer_extinguish_by_wall: events.includes(
          "extinguish_by_wall:candle#1",
        ),
        writer_ignite_from_wick: events.some((event) =>
          event.startsWith("ignite_from_wick:candle#1:"),
        ),
        any_roll_reignite_after_extinguish: events.some((event) =>
          event.startsWith("roll_reignite_after_extinguish:"),
        ),
        writer_roll_reignite_after_extinguish: events.some((event) =>
          event.startsWith("roll_reignite_after_extinguish:candle#1:"),
        ),
        light_brazier: events.some((event) => event.startsWith("light_brazier:")),
        normal_win: events.includes("win_all_braziers_lit"),
      },
      steps: pathEdges.map((edge, index) => ({
        step: index + 1,
        edge_index: edge.index,
        from: edge.from,
        to: edge.to,
        action: edge.action,
        events: edge.events,
      })),
    };
  });

  const shortestDepth =
    representatives.length === 0
      ? null
      : Math.min(...representatives.map((representative) => representative.bfs_depth));
  const observed = {
    states: report.graph.reachable_state_count,
    edges: report.graph.legal_transition_count,
    wins: report.graph.win_state_count,
    shortest: shortestDepth,
  };
  if (JSON.stringify(observed) !== JSON.stringify(current.expected)) {
    throw new Error(
      `${current.id}: expected ${JSON.stringify(current.expected)}, observed ${JSON.stringify(observed)}`,
    );
  }

  if (representatives.length > 0) {
    await writeFile(
      resolve(representativesRef),
      `${representatives.map((item) => JSON.stringify(item)).join("\n")}\n`,
      "utf8",
    );
  }

  const shortestRepresentatives = representatives.filter(
    (representative) => representative.bfs_depth === shortestDepth,
  );
  const solveResult = {
    schema_version: 1,
    artifact_kind: "counterfactual_complete_graph_solve_result",
    candidate_id: candidateId,
    exact_version_basis: exactVersion,
    baseline_layout: {
      ref: baselineLayoutRef,
      sha256: baselineLayoutSha256,
    },
    counterfactual: {
      id: current.id,
      mutation: current.mutation,
      layout_ref: current.layoutRef,
      layout_sha256: layoutSha256,
    },
    graph: {
      raw_complete_graph_ref: rawGraphRef,
      raw_complete_graph_sha256: sha256(rawGraphBytes),
      status: report.graph.status,
      reason: report.graph.reason,
      reachable_states: report.graph.reachable_state_count,
      legal_transitions: report.graph.legal_transition_count,
      winning_states: report.graph.win_state_count,
      max_observed_depth: report.graph.max_observed_depth,
      enumeration_budget: report.graph.budget,
      v001_declared_solve_budget: { max_states: 500000, max_depth: 200 },
      depth_budget_binding:
        "raw graph 未设置深度截断并已 complete；最大观测深度不超过 200，因此覆盖 v001 声明的 max_depth=200。",
      terminal_contract: {
        terminalize_wins: report.graph.budget.terminalize_wins,
        terminalize_zero_candle_loss:
          report.graph.budget.terminalize_zero_candle_loss,
      },
    },
    solve: {
      result: representatives.length > 0 ? "solvable" : "unsatisfiable_complete",
      shortest_cost: shortestDepth,
      shortest_winning_state_indexes: shortestRepresentatives.map(
        (representative) => representative.win_state_index,
      ),
      all_winning_state_indexes: representatives.map(
        (representative) => representative.win_state_index,
      ),
      representative_ref:
        representatives.length > 0 ? representativesRef : null,
      unsat_certificate_ref: representatives.length === 0 ? unsatRef : null,
    },
    consistency_with_v001_identity_counterfactual_summary: true,
  };
  await writeJson(solveResultRef, solveResult);

  if (representatives.length === 0) {
    await writeJson(unsatRef, {
      schema_version: 1,
      artifact_kind: "counterfactual_complete_graph_unsat_certificate",
      candidate_id: candidateId,
      exact_version_basis: exactVersion,
      counterfactual_id: current.id,
      statement:
        "从 mutation layout 的初态出发，在正式 all_braziers_lit 规则下完成全部可达状态枚举，未发现 winning node。",
      graph_status: report.graph.status,
      graph_reason: report.graph.reason,
      reachable_states: report.graph.reachable_state_count,
      legal_transitions: report.graph.legal_transition_count,
      winning_state_count: report.graph.win_state_count,
      raw_winning_node_indexes: winningNodes.map((node) => node.index),
      raw_complete_graph_ref: rawGraphRef,
      raw_complete_graph_sha256: sha256(rawGraphBytes),
      layout_ref: current.layoutRef,
      layout_sha256: layoutSha256,
      win_condition: report.level.win_condition,
      evidence_boundary:
        "这是当前 runtime、正常胜利、complete reachable graph 与零蜡烛失败终局合同下的机械不可解证据。",
    });
  }

  const auditCommand =
    `npx tsx src/prototypes/candle_sokoban/exposureAuditCli.ts '${current.layoutRef}' ` +
    `--id ${current.graphId} --exact-version v001 ` +
    "--allowed-exposure-through rolling_contact_chain --max-states 500000 " +
    `--out '${rawGraphRef}'`;
  await writeJson(reproductionRef, {
    schema_version: 1,
    artifact_kind: "counterfactual_evidence_reproduction_metadata",
    candidate_id: candidateId,
    exact_version_basis: exactVersion,
    counterfactual_id: current.id,
    mutation: current.mutation,
    source_layout: {
      ref: current.layoutRef,
      bytes: layoutBytes.length,
      sha256: layoutSha256,
    },
    baseline_layout: {
      ref: baselineLayoutRef,
      bytes: baselineLayoutBytes.length,
      sha256: baselineLayoutSha256,
    },
    commands: {
      raw_graph: auditCommand,
      summaries:
        `node '${supplementRoot}/generate_counterfactual_summaries.mjs'`,
    },
    runtime: {
      node: process.version,
      platform: process.platform,
      architecture: process.arch,
      working_directory: cwd,
    },
    solve_contract: {
      prototype: "candle_sokoban",
      win_condition: "all_braziers_lit",
      global_burn_cycle: 5,
      exact_version_report_field: exactVersion,
      allowed_exposure_through: "rolling_contact_chain",
      max_states: 500000,
      v001_declared_max_depth: 200,
      actual_depth_cutoff: null,
      actual_max_observed_depth: report.graph.max_observed_depth,
      terminalize_wins: true,
      terminalize_zero_candle_loss: true,
      graph_status_required: "complete",
    },
    authority_digests: authorityDigests,
    generated_artifacts: {
      raw_complete_graph_ref: rawGraphRef,
      raw_complete_graph_sha256: sha256(rawGraphBytes),
      solve_result_ref: solveResultRef,
      winning_state_representatives_ref:
        representatives.length > 0 ? representativesRef : null,
      unsat_certificate_ref: representatives.length === 0 ? unsatRef : null,
    },
    observed_result: observed,
  });
}

console.log(
  JSON.stringify(
    {
      status: "generated_and_validated",
      candidate_id: candidateId,
      exact_version_basis: exactVersion,
      counterfactuals: cases.map((item) => item.id),
    },
    null,
    2,
  ),
);
