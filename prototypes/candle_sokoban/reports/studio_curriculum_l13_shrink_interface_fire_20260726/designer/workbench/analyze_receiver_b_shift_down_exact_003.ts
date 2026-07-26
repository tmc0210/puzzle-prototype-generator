import fs from "node:fs";
import path from "node:path";

type Node = { index: number; depth: number; winning: boolean };
type Edge = { index: number; from: number; to: number; action: string; events: string[] };

const candidateId = "CANDLE_CURRICULUM_L13_001";
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_003";
const sourceExactLayoutSha256 =
  "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const counterfactualId = "receiver_b_shift_down_one_cell";
const evidenceRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/cf_receiver_b_shift_down`,
);
const graphPath = path.join(evidenceRoot, "complete_graph.json");
const audit = JSON.parse(fs.readFileSync(graphPath, "utf8"));
if (
  audit.candidate_id !== candidateId ||
  audit.exact_version !== exactVersion ||
  audit.source_exact_layout_sha256 !== sourceExactLayoutSha256 ||
  audit.solve_instance_ref !== solveInstanceRef ||
  audit.counterfactual_id !== counterfactualId ||
  audit.graph?.status !== "complete"
) {
  throw new Error("strict B shift graph provenance or completeness mismatch");
}
const nodes = audit.raw_graph.nodes as Node[];
const edges = audit.raw_graph.edges as Edge[];
const winningNodes = nodes.filter((node) => node.winning);
const eventHistogram = new Map<string, number>();
for (const edge of edges) {
  for (const event of edge.events) {
    eventHistogram.set(event, (eventHistogram.get(event) ?? 0) + 1);
  }
}
const countExact = (event: string) => eventHistogram.get(event) ?? 0;
const countPrefix = (prefix: string) =>
  [...eventHistogram.entries()]
    .filter(([event]) => event.startsWith(prefix))
    .reduce((sum, [, count]) => sum + count, 0);
const receiverEvents = [...eventHistogram.entries()]
  .filter(([event]) => event.includes("candle#single3"))
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([event, count]) => ({ event, count }));
const report = {
  schema_version: "candle_exact_counterfactual_identity_analysis.v2",
  candidate_id: candidateId,
  exact_version: exactVersion,
  source_exact_layout_sha256: sourceExactLayoutSha256,
  solve_instance_ref: solveInstanceRef,
  counterfactual_id: counterfactualId,
  counterfactual_layout_sha256: audit.level.layout_sha256,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_exact_layout_sha256: sourceExactLayoutSha256,
    solve_instance_ref: solveInstanceRef,
    counterfactual_id: counterfactualId,
    counterfactual_layout_sha256: audit.level.layout_sha256,
    complete_graph_ref:
      `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/cf_receiver_b_shift_down/complete_graph.json`,
  },
  intervention_audit: {
    changed_variable: "candle#single3.body_position",
    source_position: [6, 3],
    counterfactual_position: [6, 4],
    displacement: [0, 1],
    manhattan_distance: 1,
    unchanged:
      "10x6 画布、全部墙、玩家、火盆、A、C、全部对象方向/长度/燃烧态。",
  },
  graph: {
    status: audit.graph.status,
    states: audit.graph.reachable_state_count,
    edges: audit.graph.legal_transition_count,
    winning_states: audit.graph.win_state_count,
    winning_node_ids: winningNodes.map((node) => node.index),
    winning_path_families: [],
  },
  exact_identity_checks: {
    shrink_ignite_receiver_edge_count: countExact("shrink_ignite:candle#single3"),
    push_receiver_edge_count: countExact("push_axis:candle#single3"),
    ordinary_ignite_receiver_edge_count:
      countPrefix("ignite_from_wick:candle#single3") +
      countPrefix("ignite_from_brazier:candle#single3"),
    receiver_event_histogram: receiverEvents,
    alternative_shrink_ignite_c_edge_count: countExact("shrink_ignite:candle#single2"),
  },
  bypass_disclosure: {
    winning_bypass_count: 0,
    winning_bypass_families: [],
    nonwinning_downstream_change:
      "B 不再截停 C；C 首拍多滚一格并使 rolling_contact_chain later event 可达，目标边界可把退焰交给 C，但完整图无胜态。",
    exposure_verdict: audit.verdict,
    forbidden_hits: audit.forbidden_hits,
  },
  claim_boundary: {
    supported:
      "仅把 B 下移一个正交格就消除了当前 exact 的 B 同格 shrink_ignite、B 直接轴推与全部标准胜利；因此精确对齐是当前作品身份条件。",
    not_claimed:
      "不再声称该单变量变体仍可解、会在下一推普通点燃 B，或只改变火焰而保持 C 的滚动终点与 B 的操作面。",
  },
  conclusion:
    "严格单变量 B 下移一格的完整图为不可解；不存在胜路族或获胜旁路。其可审计事实只支持“当前 exact 的 B 精确对齐不可移除”，不支持旧复合 fixture 的普通点火退化叙述。",
};
if (
  report.graph.winning_states !== 0 ||
  report.graph.winning_node_ids.length !== 0 ||
  report.exact_identity_checks.shrink_ignite_receiver_edge_count !== 0 ||
  report.exact_identity_checks.push_receiver_edge_count !== 0 ||
  report.exact_identity_checks.ordinary_ignite_receiver_edge_count !== 0
) {
  throw new Error("strict B shift identity result changed; inspect full graph");
}
fs.writeFileSync(
  path.join(evidenceRoot, "identity_analysis.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
