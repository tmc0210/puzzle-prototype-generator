import fs from "node:fs";

const inputPath = process.argv[2];
if (!inputPath) throw new Error("usage: node analyze_solution_family.mjs <complete_graph_exposure.json>");

const artifact = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const nodes = artifact.raw_graph.nodes;
const edges = artifact.raw_graph.edges;
const winning = new Set(nodes.filter((node) => node.winning).map((node) => node.index));
const outgoing = Array.from({ length: nodes.length }, () => []);
const incoming = Array.from({ length: nodes.length }, () => []);
for (const edge of edges) {
  outgoing[edge.from].push(edge);
  incoming[edge.to].push(edge);
}

function canReachWin(blocked = () => false) {
  const seen = new Uint8Array(nodes.length);
  const queue = [0];
  seen[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    const from = queue[head];
    if (winning.has(from)) return true;
    for (const edge of outgoing[from]) {
      if (blocked(edge) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      queue.push(edge.to);
    }
  }
  return false;
}

function sampleWinAvoiding(blocked) {
  const seen = new Uint8Array(nodes.length);
  const parentEdge = new Int32Array(nodes.length).fill(-1);
  const queue = [0];
  seen[0] = 1;
  let goal = -1;
  for (let head = 0; head < queue.length; head += 1) {
    const from = queue[head];
    if (winning.has(from)) {
      goal = from;
      break;
    }
    for (const edge of outgoing[from]) {
      if (blocked(edge) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      parentEdge[edge.to] = edge.index;
      queue.push(edge.to);
    }
  }
  if (goal < 0) return null;
  const path = [];
  for (let node = goal; node !== 0;) {
    const edge = edges[parentEdge[node]];
    path.push(edge);
    node = edge.from;
  }
  path.reverse();
  return {
    cost: path.length,
    inputs: path.map((edge) => edge.action).join(" "),
    structural_steps: path.map((edge, index) => ({
      step: index + 1,
      action: edge.action,
      events: edge.events.filter((event) => !event.startsWith("walk") && !event.startsWith("countdown")),
    })).filter((step) => step.events.length > 0),
  };
}

function winningOccurrenceCounts(predicate, cap = 8) {
  const width = cap + 2;
  const seen = new Uint8Array(nodes.length * width);
  const queue = [[0, 0]];
  const result = new Set();
  seen[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    const [from, count] = queue[head];
    if (winning.has(from)) result.add(count);
    for (const edge of outgoing[from]) {
      const nextCount = Math.min(cap + 1, count + (predicate(edge) ? 1 : 0));
      const marker = edge.to * width + nextCount;
      if (seen[marker]) continue;
      seen[marker] = 1;
      queue.push([edge.to, nextCount]);
    }
  }
  return [...result].sort((a, b) => a - b).map((count) => count === cap + 1 ? `>${cap}` : count);
}

function violatingOrderCanWin(first, second) {
  const seen = new Uint8Array(nodes.length * 4);
  const queue = [[0, false, false]];
  seen[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    const [from, firstSeen, violated] = queue[head];
    if (winning.has(from) && violated) return true;
    for (const edge of outgoing[from]) {
      const hasFirst = first(edge);
      const nextFirstSeen = firstSeen || hasFirst;
      const nextViolated = violated || (second(edge) && !firstSeen && !hasFirst);
      const marker = edge.to * 4 + (nextFirstSeen ? 2 : 0) + (nextViolated ? 1 : 0);
      if (seen[marker]) continue;
      seen[marker] = 1;
      queue.push([edge.to, nextFirstSeen, nextViolated]);
    }
  }
  return false;
}

function sourceCandleCells(edge, candleId, orientation) {
  const escapedId = candleId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = nodes[edge.from].key.match(new RegExp(`${escapedId}:(\\d+):${orientation}:(\\d):([^|]+)`));
  return match?.[3].split(";") ?? [];
}

function hasExactCells(cells, expected) {
  return cells.length === expected.length && expected.every((cell) => cells.includes(cell));
}

const predicates = {
  A_long_roll_down_d4: (edge) => edge.action === "down" && edge.events.includes("roll_candle:candle#4:d4"),
  A_mid_roll_path_light_d2: (edge) => edge.events.includes("roll_intermediate_light_brazier:candle#4:d2"),
  path_brazier_created: (edge) => edge.events.includes("light_brazier:2,4"),
  A_endpoint_wall_douse: (edge) => edge.events.includes("extinguish_by_wall:candle#4"),
  Q_outward_roll_right_d4: (edge) => edge.action === "right" && edge.events.includes("roll_candle:candle#2:d4"),
  Q_single_pre_foldback_lift: (edge) => edge.action === "up" && edge.events.includes("push_axis:candle#2") &&
    hasExactCells(sourceCandleCells(edge, "candle#2", "up"), ["9,7", "9,8", "9,9"]),
  Q_foldback_roll_left_d2: (edge) => edge.action === "left" && edge.events.includes("roll_candle:candle#2:d2"),
  Q_mid_roll_ignite_d1: (edge) => edge.events.includes("roll_intermediate_ignite:candle#2:d1"),
  Q_ignite_from_source: (edge) => edge.events.includes("ignite_from_brazier:candle#2:8,5"),
  Q_final_axis_push: (edge) => edge.action === "up" && edge.events.includes("push_axis:candle#2") &&
    sourceCandleCells(edge, "candle#2", "up").every((cell) => cell.startsWith("7,")),
  final_brazier_created: (edge) => edge.events.includes("light_brazier:7,4"),
};

const mandatory = Object.entries(predicates).map(([name, predicate]) => ({
  name,
  win_reachable_after_removal: canReachWin(predicate),
}));

const occurrences = Object.entries(predicates).map(([name, predicate]) => ({
  name,
  winning_path_occurrence_counts: winningOccurrenceCounts(predicate),
}));

const orderPairs = [
  ["A_long_roll_down_d4", "path_brazier_created"],
  ["path_brazier_created", "Q_outward_roll_right_d4"],
  ["Q_outward_roll_right_d4", "Q_single_pre_foldback_lift"],
  ["Q_single_pre_foldback_lift", "Q_foldback_roll_left_d2"],
  ["Q_foldback_roll_left_d2", "Q_final_axis_push"],
  ["Q_foldback_roll_left_d2", "final_brazier_created"],
].map(([first, second]) => ({
  first,
  second,
  violating_win_reachable: violatingOrderCanWin(predicates[first], predicates[second]),
}));

const reverseReachable = new Uint8Array(nodes.length);
const reverseQueue = [...winning];
for (const index of reverseQueue) reverseReachable[index] = 1;
for (let head = 0; head < reverseQueue.length; head += 1) {
  for (const edge of incoming[reverseQueue[head]]) {
    if (reverseReachable[edge.from]) continue;
    reverseReachable[edge.from] = 1;
    reverseQueue.push(edge.from);
  }
}
const winReachingEdges = edges.filter((edge) => reverseReachable[edge.to]);
const foldbackEdges = winReachingEdges.filter(predicates.Q_foldback_roll_left_d2);
const foldbackSources = [...new Map(foldbackEdges.map((edge) => {
  const key = nodes[edge.from].key;
  const aMatch = key.match(/candle#4:(\d+):left:(\d):([^|]+)/);
  const qMatch = key.match(/candle#2:(\d+):up:(\d):([^|]+)/);
  const aCells = aMatch?.[3].split(";") ?? [];
  const qCells = qMatch?.[3].split(";") ?? [];
  const blockedNextQCells = qCells.map((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return `${x - 3},${y}`;
  });
  const contactCells = blockedNextQCells.filter((cell) => aCells.includes(cell));
  return [key, {
    node: edge.from,
    depth: nodes[edge.from].depth,
    a_cells: aCells,
    q_cells: qCells,
    a_anti_wick_tail_6_6_present: aCells.includes("6,6"),
    q_at_required_foldback_column_9: qCells.every((cell) => cell.startsWith("9,")),
    blocked_next_q_cells_after_attempted_d3: blockedNextQCells,
    contact_cells_on_attempted_d3: contactCells,
    next_left_step_contacts_only_a_tail: contactCells.length === 1 && contactCells[0] === "6,6",
  }];
})).values()];

const structuralEvents = [...new Set(winReachingEdges.flatMap((edge) => edge.events).filter((event) =>
  !event.startsWith("walk") &&
  !event.startsWith("countdown") &&
  !event.startsWith("burn_segment") &&
  !event.startsWith("candle_shrinks") &&
  !event.startsWith("candle_burns_out")
))].sort();

const result = {
  schema_version: 1,
  input_artifact: inputPath.replaceAll("\\", "/"),
  graph: {
    nodes: nodes.length,
    edges: edges.length,
    winning_nodes: winning.size,
    win_reaching_nodes: reverseReachable.reduce((sum, value) => sum + value, 0),
    win_reaching_edges: winReachingEdges.length,
  },
  baseline_win_reachable: canReachWin(),
  mandatory_event_removal: mandatory,
  all_mandatory_checks_pass: mandatory.every((check) => !check.win_reachable_after_removal),
  winning_path_occurrence_counts: occurrences,
  required_event_order: orderPairs,
  all_order_checks_pass: orderPairs.every((check) => !check.violating_win_reachable),
  structural_events_on_any_win_reaching_edge: structuralEvents,
  foldback_source_count: foldbackSources.length,
  foldback_sources: foldbackSources,
  every_foldback_uses_A_anti_wick_tail_6_6: foldbackSources.every((source) => source.a_anti_wick_tail_6_6_present),
  every_foldback_starts_from_Q_column_9: foldbackSources.every((source) => source.q_at_required_foldback_column_9),
  every_foldback_next_step_contacts_only_A_tail: foldbackSources.every((source) => source.next_left_step_contacts_only_a_tail),
  bypass_without_required_foldback: sampleWinAvoiding(predicates.Q_foldback_roll_left_d2),
  winning_mechanical_end_signatures: [...new Set(nodes.filter((node) => node.winning).map((node) => node.key.slice(node.key.indexOf("|C:") + 1)))].sort(),
  interpretation: "所有胜解都必须先由 Q 截出 A 的 d4 端点，再让 Q 向右撤离、轴向升位、向左折返；折返途中取火，并只由 A 的 (6,6) 反灯芯尾端截停。",
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
