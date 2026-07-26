import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

type AuditNode = { index: number; key: string; depth: number; winning: boolean };
type AuditEdge = { index: number; from: number; to: number; action: string; events: string[] };
type ExposureAudit = {
  level: { layout_sha256: string };
  graph: {
    status: string;
    reachable_state_count: number;
    legal_transition_count: number;
    win_state_count: number;
  };
  verdict: string;
  forbidden_hits: unknown[];
  raw_graph: { nodes: AuditNode[]; edges: AuditEdge[] };
};

const auditPath = process.argv[2];
const outDir = process.argv[3];
const exactVersion = process.argv[4] ?? "CANDLE_CURRICULUM_L13_001_WORK_10";
const supportRollEvent = process.argv[5] ?? "roll_candle:candle#2:d2";
const supportExtinguishEvent = process.argv[6] ?? "extinguish_by_wall:candle#2";
const receiverId = process.argv[7] ?? "candle#single3";
const goalCell = process.argv[8] ?? "4,1";
const candidateId = process.argv[9] ?? "CANDLE_CURRICULUM_L13_001";
const solveInstanceRef =
  process.argv[10] ??
  "prototypes/candle_sokoban/reports/studio_curriculum_l13_shrink_interface_fire_20260726/candidate/versions/CANDLE_CURRICULUM_L13_001_exact_001/solve_instance.yml";
if (!auditPath || !outDir) {
  throw new Error(
    "usage: npx tsx all_win_equivalence_l13.ts <exposure-audit.json> <out-dir> [exact-version] [support-roll-event] [support-extinguish-event] [receiver-id] [goal-cell] [candidate-id] [solve-instance-ref]",
  );
}

const supportId = supportRollEvent.match(/^roll_candle:([^:]+):/)?.[1];
if (!supportId) throw new Error(`invalid support roll event: ${supportRollEvent}`);
const receiverPushEvent = `push_axis:${receiverId}`;
const receiverTransferEvent = `shrink_ignite:${receiverId}`;
const goalLightEvent = `light_brazier:${goalCell}`;
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8")) as ExposureAudit;
const provenance = {
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
};
const nodes = audit.raw_graph.nodes;
const edges = audit.raw_graph.edges;
if (
  audit.graph.status !== "complete" ||
  audit.verdict !== "pass" ||
  audit.forbidden_hits.length !== 0
) {
  throw new Error("source exposure audit must be complete/pass with zero forbidden hits");
}
if (
  nodes.length !== audit.graph.reachable_state_count ||
  edges.length !== audit.graph.legal_transition_count ||
  nodes.filter((node) => node.winning).length !== audit.graph.win_state_count
) {
  throw new Error("source exposure audit graph counts do not match raw graph");
}
fs.mkdirSync(outDir, { recursive: true });

const edgeIdsFrom: number[][] = Array.from({ length: nodes.length }, () => []);
const adjacency: number[][] = Array.from({ length: nodes.length }, () => []);
const reverse: number[][] = Array.from({ length: nodes.length }, () => []);
for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
  const edge = edges[edgeId]!;
  if (edge.from < 0 || edge.from >= nodes.length || edge.to < 0 || edge.to >= nodes.length) {
    throw new Error(`edge ${edgeId} has invalid endpoint`);
  }
  edgeIdsFrom[edge.from]!.push(edgeId);
  adjacency[edge.from]!.push(edge.to);
  reverse[edge.to]!.push(edge.from);
}

const canReachWin = new Uint8Array(nodes.length);
const reverseQueue = nodes.filter((node) => node.winning).map((node) => node.index);
for (const nodeId of reverseQueue) canReachWin[nodeId] = 1;
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  for (const from of reverse[reverseQueue[cursor]!]!) {
    if (canReachWin[from]) continue;
    canReachWin[from] = 1;
    reverseQueue.push(from);
  }
}
const relevantNodes = nodes.filter((node) => canReachWin[node.index]).map((node) => node.index);
const relevantEdges = edges
  .map((edge, edgeId) => ({ edge, edgeId }))
  .filter(({ edge }) => canReachWin[edge.from] && canReachWin[edge.to]);

const milestones = [
  {
    id: "M1_EXIT_SUPPORT_C",
    trigger: supportRollEvent,
    required: [supportExtinguishEvent, supportRollEvent],
  },
  {
    id: "M2_ATOMIC_A_TO_B_TRANSFER",
    trigger: receiverTransferEvent,
    required: ["shrink:candle#1:len1", receiverTransferEvent],
  },
  {
    id: "M3_DIRECT_B_CONSUMER",
    trigger: "win_all_braziers_lit",
    required: [
      receiverPushEvent,
      goalLightEvent,
      "win_all_braziers_lit",
    ],
  },
] as const;

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

function significant(edge: AuditEdge): string[] {
  return edge.events.filter((event) =>
    significantPrefixes.some((prefix) => event.startsWith(prefix)),
  );
}

function edgeLabel(edge: AuditEdge): {
  milestone: number | null;
  bundleComplete: boolean;
  significantEvents: string[];
} {
  const hits = milestones
    .map((milestone, index) => (edge.events.includes(milestone.trigger) ? index : -1))
    .filter((index) => index >= 0);
  const significantEvents = significant(edge);
  if (hits.length !== 1) {
    return {
      milestone: null,
      bundleComplete: hits.length === 0,
      significantEvents,
    };
  }
  const milestone = milestones[hits[0]!]!;
  return {
    milestone: hits[0]!,
    bundleComplete: milestone.required.every((event) => edge.events.includes(event)),
    significantEvents,
  };
}

const allowedCompanions = [
  new Set([
    `extinguish:${supportId}:concealed`,
    supportExtinguishEvent,
    supportRollEvent,
  ]),
  new Set(["shrink:candle#1:len1", receiverTransferEvent]),
  new Set([
    receiverPushEvent,
    "extinguish:candle#1:concealed",
    "extinguish_by_candle_body:candle#1",
    goalLightEvent,
    `burn_out:${receiverId}`,
    "win_all_braziers_lit",
  ]),
];

const unexpectedMilestoneCompanions = relevantEdges
  .map(({ edge, edgeId }) => {
    const label = edgeLabel(edge);
    if (label.milestone === null) return null;
    const unexpected = label.significantEvents.filter(
      (event) => !allowedCompanions[label.milestone!]!.has(event),
    );
    return unexpected.length > 0
      ? {
          edge_id: edgeId,
          milestone: milestones[label.milestone]!.id,
          unexpected,
          edge,
        }
      : null;
  })
  .filter((value): value is NonNullable<typeof value> => value !== null);

const significantNonMilestoneEdges = relevantEdges
  .map(({ edge, edgeId }) => ({ edge, edgeId, label: edgeLabel(edge) }))
  .filter(
    ({ label }) => label.milestone === null && label.significantEvents.length > 0,
  );

type Product = {
  node: number;
  phase: number;
  violated: boolean;
  other: boolean;
  incomplete: boolean;
};
const productKey = (product: Product): string =>
  [
    product.node,
    product.phase,
    Number(product.violated),
    Number(product.other),
    Number(product.incomplete),
  ].join("|");
const productQueue: Product[] = [
  { node: 0, phase: 0, violated: false, other: false, incomplete: false },
];
const productSeen = new Set([productKey(productQueue[0]!)]);
const winningProducts: Product[] = [];
for (let cursor = 0; cursor < productQueue.length; cursor += 1) {
  const current = productQueue[cursor]!;
  if (nodes[current.node]!.winning) {
    winningProducts.push(current);
    continue;
  }
  for (const edgeId of edgeIdsFrom[current.node]!) {
    const edge = edges[edgeId]!;
    if (!canReachWin[edge.to]) continue;
    const label = edgeLabel(edge);
    let phase = current.phase;
    let violated = current.violated;
    let other = current.other;
    let incomplete = current.incomplete;
    if (label.milestone !== null) {
      if (label.milestone !== phase) violated = true;
      else phase += 1;
      if (!label.bundleComplete) incomplete = true;
    } else if (label.significantEvents.length > 0) {
      other = true;
    }
    const next = { node: edge.to, phase, violated, other, incomplete };
    const key = productKey(next);
    if (productSeen.has(key)) continue;
    productSeen.add(key);
    productQueue.push(next);
  }
}
const badWinningProducts = winningProducts.filter(
  (product) =>
    product.phase !== milestones.length ||
    product.violated ||
    product.other ||
    product.incomplete,
);

function computeScc(active: Uint8Array): {
  components: number[][];
  componentOf: Int32Array;
  internalEdgeIds: number[][];
  successors: Array<Set<number>>;
} {
  const seen = new Uint8Array(nodes.length);
  const finish: number[] = [];
  for (const node of nodes) {
    const start = node.index;
    if (!active[start] || seen[start]) continue;
    seen[start] = 1;
    const stack: Array<[number, number]> = [[start, 0]];
    while (stack.length > 0) {
      const top = stack[stack.length - 1]!;
      while (top[1] < adjacency[top[0]]!.length && !active[adjacency[top[0]]![top[1]]!]) {
        top[1] += 1;
      }
      if (top[1] >= adjacency[top[0]]!.length) {
        finish.push(top[0]);
        stack.pop();
        continue;
      }
      const to = adjacency[top[0]]![top[1]++]!;
      if (seen[to]) continue;
      seen[to] = 1;
      stack.push([to, 0]);
    }
  }
  const componentOf = new Int32Array(nodes.length).fill(-1);
  const components: number[][] = [];
  for (let index = finish.length - 1; index >= 0; index -= 1) {
    const start = finish[index]!;
    if (componentOf[start] >= 0) continue;
    const componentId = components.length;
    const members: number[] = [];
    const stack = [start];
    componentOf[start] = componentId;
    while (stack.length > 0) {
      const current = stack.pop()!;
      members.push(current);
      for (const from of reverse[current]!) {
        if (!active[from] || componentOf[from] >= 0) continue;
        componentOf[from] = componentId;
        stack.push(from);
      }
    }
    components.push(members);
  }
  const internalEdgeIds: number[][] = Array.from({ length: components.length }, () => []);
  const successors: Array<Set<number>> = Array.from(
    { length: components.length },
    () => new Set(),
  );
  for (let edgeId = 0; edgeId < edges.length; edgeId += 1) {
    const edge = edges[edgeId]!;
    if (!active[edge.from] || !active[edge.to]) continue;
    const fromComponent = componentOf[edge.from]!;
    const toComponent = componentOf[edge.to]!;
    if (fromComponent === toComponent) internalEdgeIds[fromComponent]!.push(edgeId);
    else successors[fromComponent]!.add(toComponent);
  }
  return { components, componentOf, internalEdgeIds, successors };
}

const relevantActive = new Uint8Array(nodes.length);
for (const nodeId of relevantNodes) relevantActive[nodeId] = 1;
const relevantScc = computeScc(relevantActive);
const cyclicComponents = relevantScc.components
  .map((members, componentId) => {
    const internal = relevantScc.internalEdgeIds[componentId]!;
    const cyclic =
      members.length > 1 ||
      internal.some((edgeId) => edges[edgeId]!.from === edges[edgeId]!.to);
    if (!cyclic) return null;
    const significantInternalEdges = internal
      .map((edgeId) => ({ edge_id: edgeId, edge: edges[edgeId], label: edgeLabel(edges[edgeId]!) }))
      .filter(
        ({ label }) => label.milestone !== null || label.significantEvents.length > 0,
      );
    return {
      component_id: componentId,
      node_count: members.length,
      internal_edge_count: internal.length,
      significant_internal_edges: significantInternalEdges,
    };
  })
  .filter((value): value is NonNullable<typeof value> => value !== null);

const relevantIndegree = new Int32Array(nodes.length);
for (const { edge } of relevantEdges) relevantIndegree[edge.to] += 1;
const topoQueue = relevantNodes.filter((nodeId) => relevantIndegree[nodeId] === 0);
const topoOrder: number[] = [];
for (let cursor = 0; cursor < topoQueue.length; cursor += 1) {
  const from = topoQueue[cursor]!;
  topoOrder.push(from);
  for (const edgeId of edgeIdsFrom[from]!) {
    const edge = edges[edgeId]!;
    if (!canReachWin[edge.to]) continue;
    relevantIndegree[edge.to] -= 1;
    if (relevantIndegree[edge.to] === 0) topoQueue.push(edge.to);
  }
}
const winCoaccessibleAcyclic = topoOrder.length === relevantNodes.length;
const signatureSets: Array<Set<string>> = Array.from({ length: nodes.length }, () => new Set());
signatureSets[0]!.add("");
if (winCoaccessibleAcyclic) {
  for (const from of topoOrder) {
    for (const edgeId of edgeIdsFrom[from]!) {
      const edge = edges[edgeId]!;
      if (!canReachWin[edge.to]) continue;
      const segment = significant(edge).join("&");
      for (const prefix of signatureSets[from]!) {
        signatureSets[edge.to]!.add(
          segment ? `${prefix}${prefix ? "||" : ""}${segment}` : prefix,
        );
      }
    }
  }
}
const rawSignatures = new Set<string>();
if (winCoaccessibleAcyclic) {
  for (const node of nodes.filter((candidate) => candidate.winning)) {
    for (const signature of signatureSets[node.index]!) rawSignatures.add(signature);
  }
}

const shortestPredecessor: Array<AuditEdge | null> = new Array(nodes.length).fill(null);
for (const edge of edges) {
  if (nodes[edge.to]!.depth !== nodes[edge.from]!.depth + 1) continue;
  if (shortestPredecessor[edge.to] === null) shortestPredecessor[edge.to] = edge;
}
const terminalWitnesses = nodes
  .filter((node) => node.winning)
  .map((node) => {
    const trace: AuditEdge[] = [];
    let cursor = node.index;
    while (cursor !== 0) {
      const edge = shortestPredecessor[cursor];
      if (!edge) throw new Error(`missing shortest predecessor for winning node ${node.index}`);
      trace.push(edge);
      cursor = edge.from;
    }
    trace.reverse();
    return {
      winning_node_id: node.index,
      shortest_depth_to_terminal: node.depth,
      inputs: trace.map((edge) => edge.action),
      significant_steps: trace
        .map((edge, index) => ({
          step: index + 1,
          input: edge.action,
          events: significant(edge),
        }))
        .filter((step) => step.events.length > 0),
    };
  });

const milestoneCounts = milestones.map((milestone, index) => ({
  milestone: milestone.id,
  relevant_edge_count: relevantEdges.filter(
    ({ edge }) => edgeLabel(edge).milestone === index,
  ).length,
  incomplete_bundle_edge_count: relevantEdges.filter(({ edge }) => {
    const label = edgeLabel(edge);
    return label.milestone === index && !label.bundleComplete;
  }).length,
}));

const automatonEquivalent =
  winningProducts.length > 0 && badWinningProducts.length === 0;
const productiveCausalEquivalent =
  automatonEquivalent &&
  significantNonMilestoneEdges.length === 0 &&
  unexpectedMilestoneCompanions.length === 0;
const strictEventEquivalent =
  productiveCausalEquivalent && winCoaccessibleAcyclic && rawSignatures.size === 1;

const raw = {
  schema_version: 1,
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance,
  source_exposure_audit: path.resolve(auditPath),
  criterion: {
    name: "all-winning-path ordered causal automaton with SCC stutter audit",
    scope:
      "every finite path from initial state to any terminal all_braziers_lit state in the complete graph",
    stutter_rule:
      "only edges without candle, brazier, death or win events may be ignored; every other edge must belong to exactly one ordered milestone",
    milestones,
  },
  graph_scope: {
    reachable_nodes: nodes.length,
    reachable_edges: edges.length,
    winning_nodes: nodes.filter((node) => node.winning).map((node) => node.index),
    nodes_on_some_winning_path: relevantNodes.length,
    edges_on_some_winning_path: relevantEdges.length,
  },
  automaton: {
    reachable_product_states: productSeen.size,
    winning_product_states: winningProducts,
    bad_winning_product_states: badWinningProducts,
    all_winning_paths_accept: automatonEquivalent,
  },
  milestone_edge_counts: milestoneCounts,
  significant_non_milestone_edges: significantNonMilestoneEdges,
  unexpected_milestone_companions: unexpectedMilestoneCompanions,
  raw_significant_trace_analysis: {
    win_coaccessible_acyclic: winCoaccessibleAcyclic,
    signature_count: rawSignatures.size,
    signatures: [...rawSignatures],
    strict_event_equivalent: strictEventEquivalent,
    productive_causal_equivalent: productiveCausalEquivalent,
    permitted_terminal_companion_variation:
      "the consumer win edge may also burn out singleton B when the push lands on a burn boundary; this adds no later task or repair",
  },
  terminal_winning_state_witnesses: terminalWitnesses,
  scc: {
    component_count: relevantScc.components.length,
    cyclic_component_count: cyclicComponents.length,
    cyclic_components: cyclicComponents,
  },
};

const sccRaw = {
  schema_version: 1,
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance,
  scope: "states lying on at least one initial-to-win path",
  node_component: relevantNodes.map((nodeId) => ({
    node_id: nodeId,
    component_id: relevantScc.componentOf[nodeId],
  })),
  components: relevantScc.components.map((members, componentId) => ({
    component_id: componentId,
    node_ids: members,
    internal_edge_ids: relevantScc.internalEdgeIds[componentId],
    successor_component_ids: [...relevantScc.successors[componentId]!].sort(
      (a, b) => a - b,
    ),
  })),
};

const summary = {
  schema_version: 1,
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance,
  status: productiveCausalEquivalent
    ? strictEventEquivalent
      ? "supported_strict_event_equivalence"
      : "supported_productive_causal_equivalence"
    : "refuted_or_incomplete",
  claim: productiveCausalEquivalent
    ? "全部终局胜路均按同一顺序完成 C 退出、A->B 原子交接、B 直接推盆；不存在额外对象操作、第二次交接或修复链。"
    : "全胜路径未通过单一玩家逻辑族机械判定。",
  quotient_rule:
    "忽略不含对象、火盆、死亡或胜利事件的纯移动时序；保留所有显著事件，并只允许终局边界同拍燃尽 B 的无后继差异。",
  checks: {
    all_terminal_wins_accept: automatonEquivalent,
    productive_causal_equivalent: productiveCausalEquivalent,
    strict_event_trace_equivalent: strictEventEquivalent,
    winning_product_state_count: winningProducts.length,
    bad_winning_product_state_count: badWinningProducts.length,
    significant_non_milestone_edge_count: significantNonMilestoneEdges.length,
    unexpected_milestone_companion_count: unexpectedMilestoneCompanions.length,
    raw_significant_event_variant_count: rawSignatures.size,
    win_coaccessible_cyclic_component_count: cyclicComponents.length,
    cyclic_component_with_significant_internal_event_count: cyclicComponents.filter(
      (component) => component.significant_internal_edges.length > 0,
    ).length,
  },
  graph_scope: raw.graph_scope,
  milestone_edge_counts: milestoneCounts,
  raw_artifacts: [
    "complete_graph.json",
    "solution_equivalence_all_wins.json",
    "solution_equivalence_all_wins.yml",
    "scc_raw.json",
    "solution_family.json",
  ],
};

const solutionFamily = {
  schema_version: "candle_solution_family_complete.v2",
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance,
  result: productiveCausalEquivalent
    ? "equivalent_variants_only"
    : "non_equivalent_wins_present",
  search_scope: "complete",
  graph_scope: raw.graph_scope,
  terminal_winning_nodes: terminalWitnesses.map((witness) => ({
    winning_node_id: witness.winning_node_id,
    shortest_depth_to_terminal: witness.shortest_depth_to_terminal,
  })),
  raw_significant_event_family_count: rawSignatures.size,
  all_winning_paths_strictly_equivalent: strictEventEquivalent,
  all_winning_paths_productively_causally_equivalent: productiveCausalEquivalent,
  known_non_equivalent_wins: productiveCausalEquivalent
    ? []
    : [
        ...badWinningProducts,
        ...significantNonMilestoneEdges,
        ...unexpectedMilestoneCompanions,
      ],
  equivalent_variants_account: productiveCausalEquivalent
    ? "胜路只在纯移动时序与终局边界同拍是否燃尽 B 上变化；对象职责、参与、顺序与消费均相同。"
    : "存在额外显著对象事件、未完成里程碑束或依赖顺序差异。",
  evidence_refs: [
    "solution_equivalence_all_wins.json",
    "solution_equivalence_all_wins.yml",
    "scc_raw.json",
  ],
};

const completeGraph = {
  schema_version: "candle_complete_graph.v1",
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: audit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance,
  status: "complete",
  reachable_state_count: nodes.length,
  legal_transition_count: edges.length,
  winning_state_count: nodes.filter((node) => node.winning).length,
  source_exposure_audit: path.resolve(auditPath),
  nodes: nodes.map((node) => ({
    id: node.index,
    key: node.key,
    depth: node.depth,
    winning: node.winning,
  })),
  edges: edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    input: edge.action,
    events: edge.events,
  })),
};

fs.writeFileSync(
  path.join(outDir, "complete_graph.json"),
  `${JSON.stringify(completeGraph, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(outDir, "solution_equivalence_all_wins.json"),
  `${JSON.stringify(raw, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(outDir, "solution_equivalence_all_wins.yml"),
  YAML.stringify(summary),
);
fs.writeFileSync(
  path.join(outDir, "scc_raw.json"),
  `${JSON.stringify(sccRaw)}\n`,
);
fs.writeFileSync(
  path.join(outDir, "solution_family.json"),
  `${JSON.stringify(solutionFamily, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
