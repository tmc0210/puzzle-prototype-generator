import fs from "node:fs";

type NodeRec = { index: number; key: string; depth: number; winning: boolean };
type EdgeRec = { index: number; from: number; to: number; action: string; events: string[] };

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("usage: tsx solution_family_audit.ts <exposure.json> <out.json>");
}

const audit = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const nodes: NodeRec[] = audit.raw_graph.nodes;
const edges: EdgeRec[] = audit.raw_graph.edges;
const outgoing: EdgeRec[][] = Array.from({ length: nodes.length }, () => []);
const incoming: EdgeRec[][] = Array.from({ length: nodes.length }, () => []);
for (const edge of edges) {
  outgoing[edge.from].push(edge);
  incoming[edge.to].push(edge);
}

const wins = nodes.filter((node) => node.winning).map((node) => node.index);
const winReachable = new Set<number>(wins);
const reverseQueue = [...wins];
for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
  const nodeIndex = reverseQueue[cursor];
  for (const edge of incoming[nodeIndex]) {
    if (!winReachable.has(edge.from)) {
      winReachable.add(edge.from);
      reverseQueue.push(edge.from);
    }
  }
}

const hasEvent = (edge: EdgeRec, fragment: string) =>
  edge.events.some((event) => event.includes(fragment));

const canWinWhileAvoiding = (predicate: (edge: EdgeRec) => boolean) => {
  const seen = new Uint8Array(nodes.length);
  const queue = [0];
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const nodeIndex = queue[cursor];
    if (nodes[nodeIndex].winning) return true;
    for (const edge of outgoing[nodeIndex]) {
      if (predicate(edge) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      queue.push(edge.to);
    }
  }
  return false;
};

const parseBraziers = (key: string) => {
  const match = key.match(/\|B:([^|]+)$/);
  const values = new Map<string, boolean>();
  if (!match) return values;
  for (const part of match[1].split(";")) {
    const partMatch = part.match(/^(\d+),(\d+):(0|1)$/);
    if (!partMatch) continue;
    const [, x, y, lit] = partMatch;
    values.set(`${x},${y}`, lit === "1");
  }
  return values;
};

const targetTransitions = (target: string) =>
  edges.filter((edge) => {
    if (!winReachable.has(edge.from) || !winReachable.has(edge.to)) return false;
    const before = parseBraziers(nodes[edge.from].key).get(target) ?? false;
    const after = parseBraziers(nodes[edge.to].key).get(target) ?? false;
    return !before && after;
  });

const reconstructShortest = (targetIndex: number) => {
  const reversed: EdgeRec[] = [];
  let current = targetIndex;
  while (current !== 0) {
    const depth = nodes[current].depth;
    const edge = incoming[current].find((candidate) => nodes[candidate.from].depth === depth - 1);
    if (!edge) throw new Error(`missing shortest predecessor for node ${current}`);
    reversed.push(edge);
    current = edge.from;
  }
  const path = reversed.reverse();
  return {
    node_index: targetIndex,
    depth: nodes[targetIndex].depth,
    inputs: path.map((edge) => edge.action),
    steps: path.map((edge, index) => ({
      step: index + 1,
      from: edge.from,
      to: edge.to,
      action: edge.action,
      events: edge.events,
    })),
    final_key: nodes[targetIndex].key,
  };
};

const bFirstNodes = nodes.filter((node) => {
  const braziers = parseBraziers(node.key);
  return braziers.get("3,1") === true && braziers.get("1,3") !== true;
});
const bFirstWinReachable = bFirstNodes.filter((node) => winReachable.has(node.index));
const shortestBFirst = [...bFirstNodes].sort((a, b) => a.depth - b.depth)[0];
const bridgeMovedBeforeANodes = nodes.filter((node) => {
  const braziers = parseBraziers(node.key);
  return (
    braziers.get("3,1") !== true &&
    braziers.get("1,3") !== true &&
    node.key.includes("candle#single3:-:up:1") &&
    node.key.includes("candle#3:3:left:1:") &&
    !node.key.includes("candle#3:3:left:1:4,3")
  );
});
const bridgeMovedBeforeAWinReachable = bridgeMovedBeforeANodes.filter((node) => winReachable.has(node.index));
const shortestBridgeMovedBeforeA = [...bridgeMovedBeforeANodes].sort((a, b) => a.depth - b.depth)[0];

const aTransitions = targetTransitions("1,3");
const bTransitions = targetTransitions("3,1");

const requiredEdges = {
  donor_side_roll: (edge: EdgeRec) => hasEvent(edge, "roll_candle:candle#1"),
  receiver_shrink_ignite: (edge: EdgeRec) => hasEvent(edge, "shrink_ignite:candle#single3"),
  receiver_body_douse: (edge: EdgeRec) => hasEvent(edge, "extinguish_by_candle_body:candle#single3"),
  receiver_bridge_reignite: (edge: EdgeRec) => hasEvent(edge, "ignite_from_wick:candle#single3:3,3"),
  receiver_roll: (edge: EdgeRec) => hasEvent(edge, "roll_candle:candle#single3"),
  bridge_roll: (edge: EdgeRec) => hasEvent(edge, "roll_candle:candle#3"),
  light_a: (edge: EdgeRec) => hasEvent(edge, "light_brazier:1,3"),
  light_b: (edge: EdgeRec) => hasEvent(edge, "light_brazier:3,1"),
};

const necessity = Object.fromEntries(
  Object.entries(requiredEdges).map(([name, predicate]) => [name, {
    can_win_without_event_group: canWinWhileAvoiding(predicate),
    required_on_all_wins: !canWinWhileAvoiding(predicate),
  }]),
);

const summarizeTransition = (edge: EdgeRec) => ({
  edge_index: edge.index,
  from: edge.from,
  to: edge.to,
  action: edge.action,
  events: edge.events,
  before_key: nodes[edge.from].key,
  after_key: nodes[edge.to].key,
});

const result = {
  schema_version: 1,
  candidate_id: "CANDLE_FULL_EXPOSURE_COMPACT_CAPSTONE_003",
  audited_version: audit.exact_version,
  source_graph_ref: inputPath.replaceAll("\\", "/"),
  audit_script_ref:
    "prototypes/candle_sokoban/reports/studio_full_exposure_compact_d4plus_20260726/designer/revision_003/work/solution_family_audit.ts",
  graph: {
    status: audit.graph.status,
    reachable_states: nodes.length,
    legal_edges: edges.length,
    winning_states: wins.length,
    win_reachable_states: winReachable.size,
  },
  required_event_groups: necessity,
  target_assignment_on_win_subgraph: {
    target_a_1_3_transition_count: aTransitions.length,
    target_a_transitions: aTransitions.map(summarizeTransition),
    target_b_3_1_transition_count: bTransitions.length,
    target_b_transitions: bTransitions.map(summarizeTransition),
  },
  ordering_counterfactual: {
    b_lit_while_a_unlit_reachable_states: bFirstNodes.length,
    b_first_states_that_can_still_win: bFirstWinReachable.length,
    b_first_is_reachable_loss: bFirstNodes.length > 0 && bFirstWinReachable.length === 0,
    b_first_is_unreachable: bFirstNodes.length === 0,
    shortest_b_first_witness: shortestBFirst ? reconstructShortest(shortestBFirst.index) : null,
  },
  opening_bridge_counterfactual: {
    receiver_lit_both_targets_open_bridge_moved_states: bridgeMovedBeforeANodes.length,
    bridge_moved_states_that_can_still_win: bridgeMovedBeforeAWinReachable.length,
    moving_bridge_before_a_is_reachable_loss:
      bridgeMovedBeforeANodes.length > 0 && bridgeMovedBeforeAWinReachable.length === 0,
    shortest_witness: shortestBridgeMovedBeforeA ? reconstructShortest(shortestBridgeMovedBeforeA.index) : null,
  },
  winning_terminals: wins.map((index) => ({
    index,
    depth: nodes[index].depth,
    key: nodes[index].key,
    shortest_witness: reconstructShortest(index),
  })),
  conclusion: {
    all_wins_require_donor_roll_and_boundary_transfer:
      necessity.donor_side_roll.required_on_all_wins && necessity.receiver_shrink_ignite.required_on_all_wins,
    all_wins_require_bridge_douse_reignite:
      necessity.receiver_body_douse.required_on_all_wins && necessity.receiver_bridge_reignite.required_on_all_wins,
    all_wins_keep_a_before_b:
      aTransitions.length > 0 && bTransitions.length > 0 && bFirstWinReachable.length === 0,
    early_bridge_displacement_is_loss:
      bridgeMovedBeforeANodes.length > 0 && bridgeMovedBeforeAWinReachable.length === 0,
    all_wins_keep_target_assignment:
      aTransitions.length > 0 &&
      aTransitions.every((edge) => hasEvent(edge, "roll_candle:candle#single3")) &&
      bTransitions.length > 0 &&
      bTransitions.every((edge) => hasEvent(edge, "roll_candle:candle#3")),
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  graph: result.graph,
  necessity: result.required_event_groups,
  ordering: result.ordering_counterfactual,
  conclusion: result.conclusion,
}, null, 2));
