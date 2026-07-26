import fs from "node:fs";
import path from "node:path";

type Node = { index: number; depth: number; winning: boolean };
type Edge = { index: number; from: number; to: number; action: string; events: string[] };

const candidateId = "CANDLE_CURRICULUM_L13_001";
const exactVersion = "CANDLE_CURRICULUM_L13_001_exact_002";
const sourceExactLayoutSha256 =
  "9cbc87a1177c5168f65d42fe5a0a6cb23efad0c2b7993b747c517f3b271e15eb";
const solveInstanceRef =
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/solve_instance.yml`;
const evidenceRoot = path.resolve(
  `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/receiver_one_cell_gap`,
);
const graphPath = path.join(evidenceRoot, "complete_graph.json");
const audit = JSON.parse(fs.readFileSync(graphPath, "utf8"));
if (
  audit.candidate_id !== candidateId ||
  audit.exact_version !== exactVersion ||
  audit.source_exact_layout_sha256 !== sourceExactLayoutSha256 ||
  audit.solve_instance_ref !== solveInstanceRef ||
  audit.counterfactual_id !== "receiver_one_cell_gap" ||
  audit.graph?.status !== "complete"
) {
  throw new Error("receiver_one_cell_gap graph provenance or completeness mismatch");
}
const nodes = audit.raw_graph.nodes as Node[];
const edges = audit.raw_graph.edges as Edge[];
const out: Edge[][] = Array.from({ length: nodes.length }, () => []);
for (const edge of edges) out[edge.from]!.push(edge);

const ordinaryEvent = "ignite_from_wick:candle#2:4,2";
type Product = { node: number; ordinary: boolean };
const keyOf = (state: Product) => `${state.node}|${Number(state.ordinary)}`;
const queue: Product[] = [{ node: 0, ordinary: false }];
const seen = new Set([keyOf(queue[0]!)]);
const predecessor = new Map<string, { prior: Product; edge: Edge }>();
let terminal: Product | null = null;
for (let cursor = 0; cursor < queue.length && terminal === null; cursor += 1) {
  const current = queue[cursor]!;
  for (const edge of out[current.node]!) {
    if (edge.events.some((event) => event.startsWith("shrink_ignite:"))) continue;
    const next = {
      node: edge.to,
      ordinary: current.ordinary || edge.events.includes(ordinaryEvent),
    };
    const key = keyOf(next);
    if (seen.has(key)) continue;
    seen.add(key);
    predecessor.set(key, { prior: current, edge });
    queue.push(next);
    if (next.ordinary && nodes[next.node]!.winning) {
      terminal = next;
      break;
    }
  }
}
if (!terminal) {
  throw new Error("未找到避开 shrink_ignite 且通过普通 wick 点火的胜路");
}
const trace: Edge[] = [];
let cursor = terminal;
while (cursor.node !== 0 || cursor.ordinary !== false) {
  const pred = predecessor.get(keyOf(cursor));
  if (!pred) throw new Error(`missing product predecessor: ${keyOf(cursor)}`);
  trace.push(pred.edge);
  cursor = pred.prior;
}
trace.reverse();
const significantPrefixes = [
  "push_axis:",
  "roll_candle:",
  "shrink:",
  "shrink_ignite:",
  "ignite:",
  "ignite_from_",
  "extinguish:",
  "extinguish_by_",
  "wick_reexposed_unlit:",
  "burn_out:",
  "light_brazier:",
  "player_died:",
  "win_",
];
const report = {
  schema_version: "candle_exact_counterfactual_identity_analysis.v1",
  candidate_id: candidateId,
  exact_version: exactVersion,
  source_exact_layout_sha256: sourceExactLayoutSha256,
  solve_instance_ref: solveInstanceRef,
  counterfactual_id: "receiver_one_cell_gap",
  counterfactual_layout_sha256: audit.level.layout_sha256,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_exact_layout_sha256: sourceExactLayoutSha256,
    solve_instance_ref: solveInstanceRef,
    counterfactual_id: "receiver_one_cell_gap",
    counterfactual_layout_sha256: audit.level.layout_sha256,
    complete_graph_ref:
      `prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/${exactVersion}/evidence/counterfactuals/receiver_one_cell_gap/complete_graph.json`,
  },
  graph: {
    status: audit.graph.status,
    states: audit.graph.reachable_state_count,
    edges: audit.graph.legal_transition_count,
    winning_states: audit.graph.win_state_count,
  },
  identity_test: {
    avoided_event_pattern: "shrink_ignite:*",
    required_ordinary_event: ordinaryEvent,
    avoiding_winning_path_exists: true,
    terminal_node: terminal.node,
    cost: trace.length,
    inputs: trace.map((edge) => edge.action),
    significant_steps: trace
      .map((edge, index) => ({
        step: index + 1,
        input: edge.action,
        events: edge.events.filter((event) =>
          significantPrefixes.some((prefix) => event.startsWith(prefix)),
        ),
      }))
      .filter((step) => step.events.length > 0),
  },
  conclusion:
    "错位 B 的完整图存在完全避开 shrink_ignite、先以 ignite_from_wick 普通接火再完成火盆的胜路；它仍可解但不再属于同格 blocker->fuel 原子翻转作品。",
};
fs.writeFileSync(
  path.join(evidenceRoot, "identity_analysis.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
