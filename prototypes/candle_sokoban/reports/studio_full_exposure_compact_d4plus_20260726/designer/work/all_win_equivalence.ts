import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

type RawNode = { id: number; key: string; depth: number; winning: boolean };
type RawEdge = { from: number; to: number; input: string; events: string[] };
type RawGraph = { nodes: RawNode[]; edges: RawEdge[] };

const graphPath = process.argv[2];
const outDir = process.argv[3];
const exactVersion = process.argv[4] ?? "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003_exact_001";
const receiverRollEvent = process.argv[5] ?? "roll_candle:candle#2:d5";
const firstBrazierEvent = process.argv[6] ?? "light_brazier:6,5";
const relayRollEvent = process.argv[7] ?? "roll_candle:candle#3:d4";
const secondBrazierEvent = process.argv[8] ?? "light_brazier:7,2";
if (!graphPath || !outDir) {
  throw new Error("usage: all_win_equivalence.ts <complete_graph.json> <out-dir>");
}

const graph = JSON.parse(fs.readFileSync(graphPath, "utf8")) as RawGraph;
fs.mkdirSync(outDir, { recursive: true });

const adjacency: number[][] = Array.from({ length: graph.nodes.length }, () => []);
const reverse: number[][] = Array.from({ length: graph.nodes.length }, () => []);
const edgeIdsFrom: number[][] = Array.from({ length: graph.nodes.length }, () => []);
for (let edgeId = 0; edgeId < graph.edges.length; edgeId += 1) {
  const edge = graph.edges[edgeId];
  adjacency[edge.from].push(edge.to);
  reverse[edge.to].push(edge.from);
  edgeIdsFrom[edge.from].push(edgeId);
}

const canReachWin = new Uint8Array(graph.nodes.length);
const reverseQueue = graph.nodes.filter((node) => node.winning).map((node) => node.id);
for (const id of reverseQueue) canReachWin[id] = 1;
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  for (const from of reverse[reverseQueue[cursor]]) {
    if (canReachWin[from]) continue;
    canReachWin[from] = 1;
    reverseQueue.push(from);
  }
}

const relevantNodes = graph.nodes.filter((node) => canReachWin[node.id]).map((node) => node.id);
const relevantEdges = graph.edges
  .map((edge, id) => ({ edge, id }))
  .filter(({ edge }) => canReachWin[edge.from] && canReachWin[edge.to]);

// Iterative Kosaraju avoids depending on the JavaScript call stack for 13k+ states.
const seen = new Uint8Array(graph.nodes.length);
const finish: number[] = [];
for (const start of relevantNodes) {
  if (seen[start]) continue;
  seen[start] = 1;
  const stack: Array<[number, number]> = [[start, 0]];
  while (stack.length) {
    const top = stack[stack.length - 1];
    const nexts = adjacency[top[0]];
    while (top[1] < nexts.length && !canReachWin[nexts[top[1]]]) top[1] += 1;
    if (top[1] >= nexts.length) {
      finish.push(top[0]);
      stack.pop();
      continue;
    }
    const to = nexts[top[1]++];
    if (seen[to]) continue;
    seen[to] = 1;
    stack.push([to, 0]);
  }
}

const componentOf = new Int32Array(graph.nodes.length).fill(-1);
const components: number[][] = [];
for (let i = finish.length - 1; i >= 0; i -= 1) {
  const start = finish[i];
  if (componentOf[start] >= 0) continue;
  const componentId = components.length;
  const members: number[] = [];
  const stack = [start];
  componentOf[start] = componentId;
  while (stack.length) {
    const id = stack.pop()!;
    members.push(id);
    for (const from of reverse[id]) {
      if (!canReachWin[from] || componentOf[from] >= 0) continue;
      componentOf[from] = componentId;
      stack.push(from);
    }
  }
  components.push(members);
}

const milestones = [
  { id: "M1_DONOR_SIDE_ROLL", trigger: "roll_candle:candle#1:d2", required: ["roll_candle:candle#1:d2"] },
  { id: "M2_DONOR_TO_RECEIVER", trigger: "shrink_ignite:candle#2", required: ["shrink:candle#1:len2", "shrink_ignite:candle#2"] },
  { id: "M3_RECEIVER_RETREAT", trigger: "shrink:candle#2:len2", required: ["shrink:candle#1:len1", "shrink:candle#2:len2"] },
  { id: "M4_RECEIVER_LONG_ROLL", trigger: receiverRollEvent, required: [receiverRollEvent, "ignite:candle#3", firstBrazierEvent] },
  { id: "M5_RELAY_BURN", trigger: "shrink:candle#3:len2", required: ["burn_out:candle#1", "shrink:candle#3:len2"] },
  { id: "M6_RELAY_FINISH", trigger: "win_all_braziers_lit", required: [relayRollEvent, secondBrazierEvent, "win_all_braziers_lit"] },
];

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
  "player_died",
  "win_",
];

function edgeLabel(edge: RawEdge): { milestone: number | null; bundleComplete: boolean; significant: string[] } {
  const hits = milestones
    .map((milestone, index) => (edge.events.includes(milestone.trigger) ? index : -1))
    .filter((index) => index >= 0);
  const significant = edge.events.filter((event) => significantPrefixes.some((prefix) => event.startsWith(prefix)));
  if (hits.length !== 1) return { milestone: null, bundleComplete: hits.length === 0, significant };
  const milestone = milestones[hits[0]];
  return {
    milestone: hits[0],
    bundleComplete: milestone.required.every((event) => edge.events.includes(event)),
    significant,
  };
}

type Product = { node: number; phase: number; violated: boolean; other: boolean; incomplete: boolean };
const productKey = (value: Product) => `${value.node}|${value.phase}|${Number(value.violated)}|${Number(value.other)}|${Number(value.incomplete)}`;
const productQueue: Product[] = [{ node: 0, phase: 0, violated: false, other: false, incomplete: false }];
const productSeen = new Set([productKey(productQueue[0])]);
const winningProducts: Product[] = [];
for (let cursor = 0; cursor < productQueue.length; cursor += 1) {
  const current = productQueue[cursor];
  if (graph.nodes[current.node].winning) {
    winningProducts.push(current);
    continue;
  }
  for (const edgeId of edgeIdsFrom[current.node]) {
    const edge = graph.edges[edgeId];
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
    } else if (label.significant.length > 0) {
      other = true;
    }
    const next = { node: edge.to, phase, violated, other, incomplete };
    const key = productKey(next);
    if (productSeen.has(key)) continue;
    productSeen.add(key);
    productQueue.push(next);
  }
}

const componentInternalEdges: number[][] = Array.from({ length: components.length }, () => []);
const condensationSets: Array<Set<number>> = Array.from({ length: components.length }, () => new Set());
for (const { edge, id } of relevantEdges) {
  const fromComponent = componentOf[edge.from];
  const toComponent = componentOf[edge.to];
  if (fromComponent === toComponent) componentInternalEdges[fromComponent].push(id);
  else condensationSets[fromComponent].add(toComponent);
}

function mechanicalProjection(key: string): string {
  return key
    .split("|")
    .filter((part) => !part.startsWith("P:") && !part.startsWith("T:"))
    .join("|");
}

const cyclicComponents = components
  .map((members, id) => {
    const internal = componentInternalEdges[id];
    const cyclic = members.length > 1 || internal.some((edgeId) => graph.edges[edgeId].from === graph.edges[edgeId].to);
    if (!cyclic) return null;
    const significantInternal = internal
      .map((edgeId) => ({ edgeId, edge: graph.edges[edgeId], label: edgeLabel(graph.edges[edgeId]) }))
      .filter(({ label }) => label.milestone !== null || label.significant.length > 0);
    return {
      component_id: id,
      node_count: members.length,
      internal_edge_count: internal.length,
      minimum_depth: Math.min(...members.map((nodeId) => graph.nodes[nodeId].depth)),
      mechanical_projection_count: new Set(members.map((nodeId) => mechanicalProjection(graph.nodes[nodeId].key))).size,
      significant_internal_edges: significantInternal,
    };
  })
  .filter((value): value is NonNullable<typeof value> => value !== null);

const significantNonMilestoneEdges = relevantEdges
  .map(({ edge, id }) => ({ edgeId: id, edge, label: edgeLabel(edge), component: componentOf[edge.from] }))
  .filter(({ label }) => label.milestone === null && label.significant.length > 0);

// A stricter event-by-event signature separates the optional donor-shift/receiver-repair
// detour.  Player-logic equivalence is therefore checked separately at the productive
// role milestone level, while preserving the raw distinction in the output.
type RoleProduct = {
  node: number;
  phase: number;
  repair: boolean;
  violated: boolean;
  other: boolean;
  incomplete: boolean;
};
const roleMilestones = [
  "R1_DONOR_SIDE_ROLL",
  "R2_DONOR_ESTABLISHES_RECEIVER_FLAME",
  "R3_RECEIVER_RETREATS_TO_LENGTH_2",
  "R4_RECEIVER_LONG_ROLL_LIGHTS_RELAY_AND_FIRST_BRAZIER",
  "R5_RELAY_RETREATS_TO_LENGTH_2",
  "R6_RELAY_ROLL_LIGHTS_SECOND_BRAZIER_AND_WINS",
] as const;
const roleKey = (value: RoleProduct) =>
  `${value.node}|${value.phase}|${Number(value.repair)}|${Number(value.violated)}|${Number(value.other)}|${Number(value.incomplete)}`;
const roleQueue: RoleProduct[] = [
  { node: 0, phase: 0, repair: false, violated: false, other: false, incomplete: false },
];
const roleSeen = new Set([roleKey(roleQueue[0])]);
const roleWinning: RoleProduct[] = [];

function exactSignificant(edge: RawEdge): string[] {
  return edge.events.filter((event) => significantPrefixes.some((prefix) => event.startsWith(prefix)));
}

function isOptionalRepairStart(significant: string[]): boolean {
  return (
    significant.length === 3 &&
    significant.includes("push_axis:candle#1") &&
    significant.includes("extinguish:candle#2:concealed") &&
    significant.includes("extinguish_by_candle_body:candle#2")
  );
}

for (let cursor = 0; cursor < roleQueue.length; cursor += 1) {
  const current = roleQueue[cursor];
  if (graph.nodes[current.node].winning) {
    roleWinning.push(current);
    continue;
  }
  for (const edgeId of edgeIdsFrom[current.node]) {
    const edge = graph.edges[edgeId];
    if (!canReachWin[edge.to]) continue;
    const significant = exactSignificant(edge);
    let phase = current.phase;
    let repair = current.repair;
    let violated = current.violated;
    let other = current.other;
    let incomplete = current.incomplete;
    if (edge.events.includes("roll_candle:candle#1:d2")) {
      if (phase !== 0) violated = true;
      else phase = 1;
    } else if (edge.events.includes("shrink_ignite:candle#2")) {
      if (phase === 1) {
        if (!edge.events.includes("shrink:candle#1:len2")) incomplete = true;
        phase = 2;
      } else if (phase === 2 && repair) {
        if (!edge.events.includes("shrink:candle#1:len1")) incomplete = true;
      } else {
        violated = true;
      }
    } else if (edge.events.includes("shrink:candle#2:len2")) {
      if (phase !== 2) violated = true;
      else phase = 3;
      if (!edge.events.includes("shrink:candle#1:len1") && !edge.events.includes("burn_out:candle#1")) incomplete = true;
    } else if (edge.events.includes(receiverRollEvent)) {
      if (phase !== 3) violated = true;
      else phase = 4;
      for (const required of ["ignite:candle#3", firstBrazierEvent]) {
        if (!edge.events.includes(required)) incomplete = true;
      }
    } else if (edge.events.includes("shrink:candle#3:len2")) {
      if (phase !== 4) violated = true;
      else phase = 5;
    } else if (edge.events.includes("win_all_braziers_lit")) {
      if (phase !== 5) violated = true;
      else phase = 6;
      for (const required of [relayRollEvent, secondBrazierEvent]) {
        if (!edge.events.includes(required)) incomplete = true;
      }
    } else if (significant.length > 0) {
      if (phase === 2 && !repair && isOptionalRepairStart(significant)) repair = true;
      else other = true;
    }
    const next = { node: edge.to, phase, repair, violated, other, incomplete };
    const key = roleKey(next);
    if (roleSeen.has(key)) continue;
    roleSeen.add(key);
    roleQueue.push(next);
  }
}

const badRoleWinning = roleWinning.filter(
  (product) => product.phase !== roleMilestones.length || product.violated || product.other || product.incomplete,
);
const allWinningPathsRoleEquivalent = roleWinning.length > 0 && badRoleWinning.length === 0;
const rawEventVariants = [...new Set(roleWinning.map((product) => (product.repair ? "DONOR_SHIFT_RECEIVER_REPAIR" : "DIRECT_BACKBONE")))];

function computeScc(active: Uint8Array): {
  componentCount: number;
  components: number[][];
  componentOf: Int32Array;
  cyclic: Array<{ id: number; nodeCount: number; canReachWin: boolean }>;
} {
  const localSeen = new Uint8Array(graph.nodes.length);
  const localFinish: number[] = [];
  for (const node of graph.nodes) {
    const start = node.id;
    if (!active[start] || localSeen[start]) continue;
    localSeen[start] = 1;
    const stack: Array<[number, number]> = [[start, 0]];
    while (stack.length) {
      const top = stack[stack.length - 1];
      while (top[1] < adjacency[top[0]].length && !active[adjacency[top[0]][top[1]]]) top[1] += 1;
      if (top[1] >= adjacency[top[0]].length) {
        localFinish.push(top[0]);
        stack.pop();
        continue;
      }
      const to = adjacency[top[0]][top[1]++];
      if (localSeen[to]) continue;
      localSeen[to] = 1;
      stack.push([to, 0]);
    }
  }
  const localComponent = new Int32Array(graph.nodes.length).fill(-1);
  const localComponents: number[][] = [];
  for (let i = localFinish.length - 1; i >= 0; i -= 1) {
    const start = localFinish[i];
    if (localComponent[start] >= 0) continue;
    const id = localComponents.length;
    const members: number[] = [];
    const stack = [start];
    localComponent[start] = id;
    while (stack.length) {
      const value = stack.pop()!;
      members.push(value);
      for (const from of reverse[value]) {
        if (!active[from] || localComponent[from] >= 0) continue;
        localComponent[from] = id;
        stack.push(from);
      }
    }
    localComponents.push(members);
  }
  const cyclic = localComponents
    .map((members, id) => {
      const hasSelfLoop = members.some((from) => adjacency[from].includes(from));
      if (members.length === 1 && !hasSelfLoop) return null;
      return { id, nodeCount: members.length, canReachWin: members.some((nodeId) => Boolean(canReachWin[nodeId])) };
    })
    .filter((value): value is NonNullable<typeof value> => value !== null);
  return { componentCount: localComponents.length, components: localComponents, componentOf: localComponent, cyclic };
}

const allActive = new Uint8Array(graph.nodes.length).fill(1);
const wholeGraphScc = computeScc(allActive);
const wholeCondensation: Array<Set<number>> = Array.from({ length: wholeGraphScc.componentCount }, () => new Set());
const wholeInternalEdgeCount = new Array<number>(wholeGraphScc.componentCount).fill(0);
for (const edge of graph.edges) {
  const from = wholeGraphScc.componentOf[edge.from];
  const to = wholeGraphScc.componentOf[edge.to];
  if (from === to) wholeInternalEdgeCount[from] += 1;
  else wholeCondensation[from].add(to);
}
const wholeGraphSccRaw = {
  schema_version: 1,
  scope: "all reachable states",
  node_component: graph.nodes.map((node) => ({ node_id: node.id, component_id: wholeGraphScc.componentOf[node.id] })),
  components: wholeGraphScc.components.map((members, id) => ({
    component_id: id,
    node_ids: members,
    node_count: members.length,
    internal_edge_count: wholeInternalEdgeCount[id],
    can_reach_win: members.some((nodeId) => Boolean(canReachWin[nodeId])),
    successor_component_ids: [...wholeCondensation[id]].sort((a, b) => a - b),
  })),
};

const shortestPredecessor: Array<RawEdge | null> = new Array(graph.nodes.length).fill(null);
for (const edge of graph.edges) {
  if (graph.nodes[edge.to].depth !== graph.nodes[edge.from].depth + 1) continue;
  if (shortestPredecessor[edge.to] === null) shortestPredecessor[edge.to] = edge;
}
const terminalWinningStateWitnesses = graph.nodes
  .filter((node) => node.winning)
  .map((node) => {
    const trace: RawEdge[] = [];
    let cursor = node.id;
    while (cursor !== 0) {
      const edge = shortestPredecessor[cursor];
      if (!edge) throw new Error(`missing shortest predecessor for winning node ${node.id}`);
      trace.push(edge);
      cursor = edge.from;
    }
    trace.reverse();
    const significantSteps = trace
      .map((edge, index) => ({ step: index + 1, input: edge.input, events: exactSignificant(edge) }))
      .filter((step) => step.events.length > 0);
    const repair = significantSteps.some((step) => isOptionalRepairStart(step.events));
    return {
      winning_node_id: node.id,
      shortest_depth_to_this_terminal: node.depth,
      inputs: trace.map((edge) => edge.input),
      raw_significant_event_variant: repair ? "DONOR_SHIFT_RECEIVER_REPAIR" : "DIRECT_BACKBONE",
      raw_significant_trace_signature: significantSteps.map((step) => step.events.join("&")).join("||"),
      significant_steps: significantSteps,
    };
  });
const repairSignatureEdges = relevantEdges.filter(({ edge }) =>
  edge.events.includes("push_axis:candle#1") &&
  edge.events.includes("extinguish:candle#2:concealed") &&
  edge.events.includes("extinguish_by_candle_body:candle#2"),
);

const relevantIndegree = new Int32Array(graph.nodes.length);
for (const { edge } of relevantEdges) relevantIndegree[edge.to] += 1;
const topologicalQueue = relevantNodes.filter((nodeId) => relevantIndegree[nodeId] === 0);
const topologicalOrder: number[] = [];
for (let cursor = 0; cursor < topologicalQueue.length; cursor += 1) {
  const from = topologicalQueue[cursor];
  topologicalOrder.push(from);
  for (const edgeId of edgeIdsFrom[from]) {
    const edge = graph.edges[edgeId];
    if (!canReachWin[edge.to]) continue;
    relevantIndegree[edge.to] -= 1;
    if (relevantIndegree[edge.to] === 0) topologicalQueue.push(edge.to);
  }
}
const winCoaccessibleAcyclic = topologicalOrder.length === relevantNodes.length;
const signatureSets: Array<Set<string>> = Array.from({ length: graph.nodes.length }, () => new Set());
signatureSets[0].add("");
if (winCoaccessibleAcyclic) {
  for (const from of topologicalOrder) {
    for (const edgeId of edgeIdsFrom[from]) {
      const edge = graph.edges[edgeId];
      if (!canReachWin[edge.to]) continue;
      const segment = exactSignificant(edge).join("&");
      for (const prefix of signatureSets[from]) {
        signatureSets[edge.to].add(segment ? `${prefix}${prefix ? "||" : ""}${segment}` : prefix);
      }
    }
  }
}
const rawSignificantTraceSignatures = new Set<string>();
if (winCoaccessibleAcyclic) {
  for (const node of graph.nodes.filter((candidate) => candidate.winning)) {
    for (const signature of signatureSets[node.id]) rawSignificantTraceSignatures.add(signature);
  }
}

const firstBrazierCoordinate = firstBrazierEvent.replace("light_brazier:", "");
const allowedSignificantByMilestone: string[][] = [
  ["roll_candle:candle#1:d2"],
  ["shrink:candle#1:len2", "shrink_ignite:candle#2"],
  ["shrink:candle#1:len1", "shrink:candle#2:len2"],
  [
    "ignite:candle#3",
    `ignite_from_wick:candle#3:${firstBrazierCoordinate}`,
    firstBrazierEvent,
    "extinguish:candle#2:concealed",
    "extinguish_by_candle_body:candle#2",
    receiverRollEvent,
  ],
  ["burn_out:candle#1", "shrink:candle#3:len2"],
  [
    "wick_reexposed_unlit:candle#2",
    secondBrazierEvent,
    relayRollEvent,
    "shrink:candle#3:len1",
    "win_all_braziers_lit",
  ],
];
const unexpectedMilestoneCompanions = relevantEdges
  .map(({ edge, id }) => {
    const label = edgeLabel(edge);
    if (label.milestone === null) return null;
    const allowed = new Set(allowedSignificantByMilestone[label.milestone]);
    const unexpected = exactSignificant(edge).filter((event) => !allowed.has(event));
    return unexpected.length > 0 ? { edge_id: id, milestone: milestones[label.milestone].id, edge, unexpected } : null;
  })
  .filter((value): value is NonNullable<typeof value> => value !== null);

const milestoneEdgeCounts = milestones.map((milestone, index) => ({
  milestone: milestone.id,
  relevant_edge_count: relevantEdges.filter(({ edge }) => edgeLabel(edge).milestone === index).length,
  incomplete_bundle_edge_count: relevantEdges.filter(({ edge }) => {
    const label = edgeLabel(edge);
    return label.milestone === index && !label.bundleComplete;
  }).length,
}));

const badWinningProducts = winningProducts.filter(
  (product) => product.phase !== milestones.length || product.violated || product.other || product.incomplete,
);
const milestoneAutomatonEquivalent = winningProducts.length > 0 && badWinningProducts.length === 0;
const productiveCausalEquivalent =
  milestoneAutomatonEquivalent &&
  significantNonMilestoneEdges.length === 0 &&
  repairSignatureEdges.length === 0 &&
  unexpectedMilestoneCompanions.length === 0;
const strictEventEquivalent =
  productiveCausalEquivalent &&
  winCoaccessibleAcyclic &&
  rawSignificantTraceSignatures.size === 1;

const raw = {
  schema_version: 1,
  source_graph: path.resolve(graphPath),
  criterion: {
    name: "all-winning-path causal phase automaton with SCC stutter quotient",
    scope: "every finite path from the initial state to any terminal winning state; reachable cycles are admitted at arbitrary repetition counts",
    stutter_rule: "only transitions without candle/brazier/death/win events are ignored; every significant non-milestone transition is tracked as OTHER",
    milestones,
    acceptance: "winning state reached after M1..M6 exactly once and in order, every milestone event bundle complete, with no OTHER significant transition",
  },
  graph_scope: {
    reachable_nodes: graph.nodes.length,
    reachable_edges: graph.edges.length,
    winning_nodes: graph.nodes.filter((node) => node.winning).map((node) => node.id),
    nodes_on_some_winning_path: relevantNodes.length,
    edges_on_some_winning_path: relevantEdges.length,
  },
  automaton: {
    reachable_product_states: productSeen.size,
    winning_product_states: winningProducts,
    bad_winning_product_states: badWinningProducts,
    milestone_bundle_equivalent: milestoneAutomatonEquivalent,
    strict_event_equivalent: strictEventEquivalent,
  },
  raw_significant_trace_analysis: {
    win_coaccessible_acyclic: winCoaccessibleAcyclic,
    signature_count: rawSignificantTraceSignatures.size,
    signatures: [...rawSignificantTraceSignatures],
    productive_causal_equivalent: productiveCausalEquivalent,
    unexpected_milestone_companions: unexpectedMilestoneCompanions,
    permitted_terminal_companion_variation: "M6 may include shrink:candle#3:len1 in the same terminal winning settlement",
  },
  role_level_automaton: {
    criterion: "preserve the ordered productive object-role milestones; expose but quotient the single nonproductive donor-shift/receiver-extinguish/receiver-repair detour",
    milestones: roleMilestones,
    reachable_product_states: roleSeen.size,
    winning_product_states: roleWinning,
    bad_winning_product_states: badRoleWinning,
    all_winning_paths_role_equivalent: allWinningPathsRoleEquivalent,
    raw_significant_event_variants: rawEventVariants,
  },
  terminal_winning_state_witnesses: terminalWinningStateWitnesses,
  repair_family_probe: {
    signature: [
      "push_axis:candle#1",
      "extinguish:candle#2:concealed",
      "extinguish_by_candle_body:candle#2",
    ],
    signature_edge_count_on_some_winning_path: repairSignatureEdges.length,
    signature_edges: repairSignatureEdges,
    repair_family_can_win: repairSignatureEdges.length > 0,
  },
  milestones: milestoneEdgeCounts,
  scc: {
    component_count: components.length,
    cyclic_component_count: cyclicComponents.length,
    cyclic_components: cyclicComponents,
  },
  whole_reachable_graph_scc: {
    component_count: wholeGraphScc.componentCount,
    cyclic_component_count: wholeGraphScc.cyclic.length,
    cyclic_components_that_can_reach_win: wholeGraphScc.cyclic.filter((component) => component.canReachWin),
    cyclic_components: wholeGraphScc.cyclic,
  },
  significant_non_milestone_edges: significantNonMilestoneEdges,
};

const sccRaw = {
  schema_version: 1,
  scope: "states lying on at least one initial-to-win path",
  node_component: relevantNodes.map((nodeId) => ({ node_id: nodeId, component_id: componentOf[nodeId] })),
  components: components.map((members, id) => ({
    component_id: id,
    node_ids: members,
    internal_edge_ids: componentInternalEdges[id],
    successor_component_ids: [...condensationSets[id]].sort((a, b) => a - b),
  })),
};

const summary = {
  schema_version: 1,
  exact_version: exactVersion,
  status: strictEventEquivalent
    ? "supported_strict_event_equivalence"
    : productiveCausalEquivalent
      ? "supported_productive_causal_equivalence_with_terminal_settlement_variants"
      : "refuted_or_incomplete",
  claim: strictEventEquivalent
    ? `全部 ${winningProducts.length} 个终局胜利状态均严格经过同一显著事件因果序列，不存在额外对象职责、修复链或依赖时序变体。`
    : productiveCausalEquivalent
      ? `全部 ${roleWinning.length} 个终局胜利状态均遵循同一组有序生产性对象职责；原始显著事件轨迹有 ${rawSignificantTraceSignatures.size} 种，差异仅来自终局胜利同回合是否伴随 candle#3 再缩短。`
      : "全赢路径未通过角色层单一玩家逻辑族机械判定。",
  infinite_raw_family: cyclicComponents.length > 0,
  quotient: {
    rule: strictEventEquivalent
      ? "仅忽略不含蜡烛、火盆、死亡或胜利事件的纯走位差异；不忽略任何显著对象事件。"
      : "以六个生产性对象职责为等价判据；完整保留并单列显著事件差异，不把它误报成同一原始事件轨迹。",
    milestones: roleMilestones,
  },
  checks: {
    all_terminal_wins_accept_role_level: allWinningPathsRoleEquivalent,
    productive_causal_equivalent: productiveCausalEquivalent,
    strict_event_trace_equivalent: strictEventEquivalent,
    winning_product_state_count: winningProducts.length,
    bad_winning_product_state_count: badWinningProducts.length,
    role_winning_product_state_count: roleWinning.length,
    bad_role_winning_product_state_count: badRoleWinning.length,
    raw_significant_event_variant_count: rawSignificantTraceSignatures.size,
    significant_non_milestone_edge_count: significantNonMilestoneEdges.length,
    cyclic_component_count: cyclicComponents.length,
    cyclic_component_with_significant_internal_event_count: cyclicComponents.filter(
      (component) => component.significant_internal_edges.length > 0,
    ).length,
    whole_reachable_graph_cyclic_component_count: wholeGraphScc.cyclic.length,
    whole_reachable_graph_cyclic_component_that_can_reach_win_count: wholeGraphScc.cyclic.filter(
      (component) => component.canReachWin,
    ).length,
  },
  graph_scope: raw.graph_scope,
  milestone_edge_counts: milestoneEdgeCounts,
  raw_artifacts: ["solution_equivalence_all_wins.json", "scc_raw.json", "whole_graph_scc_raw.json"],
};

const solutionFamily = {
  schema_version: "candle_solution_family_complete.v2",
  exact_version: exactVersion,
  result: productiveCausalEquivalent ? "equivalent_variants_only" : "non_equivalent_wins_present",
  search_scope: "complete",
  graph_scope: raw.graph_scope,
  terminal_winning_nodes: terminalWinningStateWitnesses.map((witness) => ({
    winning_node_id: witness.winning_node_id,
    shortest_depth_to_this_terminal: witness.shortest_depth_to_this_terminal,
    raw_significant_event_variant: witness.raw_significant_event_variant,
  })),
  raw_significant_event_family_count: rawSignificantTraceSignatures.size,
  all_winning_paths_strictly_equivalent: strictEventEquivalent,
  all_winning_paths_productively_causally_equivalent: productiveCausalEquivalent,
  known_non_equivalent_wins: productiveCausalEquivalent ? [] : [...badWinningProducts, ...significantNonMilestoneEdges],
  equivalent_variants_account: productiveCausalEquivalent
    ? "全部胜路保持相同生产性对象职责与依赖顺序；原始事件差异只是在终局胜利同回合是否伴随 candle#3 缩为 len1，该变化没有后继消费或新增职责。"
    : "存在非里程碑显著对象事件、repair signature、未完成里程碑束或依赖时序差异。",
  repair_family_probe: raw.repair_family_probe,
  win_coaccessible_cyclic_scc_count: cyclicComponents.length,
  evidence_refs: [
    "solution_equivalence_all_wins.json",
    "solution_equivalence_all_wins.yml",
    "scc_raw.json",
    "whole_graph_scc_raw.json",
  ],
};

fs.writeFileSync(path.join(outDir, "solution_equivalence_all_wins.json"), `${JSON.stringify(raw, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "scc_raw.json"), `${JSON.stringify(sccRaw)}\n`);
fs.writeFileSync(path.join(outDir, "whole_graph_scc_raw.json"), `${JSON.stringify(wholeGraphSccRaw)}\n`);
fs.writeFileSync(path.join(outDir, "solution_equivalence_all_wins.yml"), YAML.stringify(summary));
fs.writeFileSync(path.join(outDir, "solution_family.json"), `${JSON.stringify(solutionFamily, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));
