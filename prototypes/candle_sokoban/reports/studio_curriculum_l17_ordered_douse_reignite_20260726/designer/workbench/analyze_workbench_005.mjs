import fs from "node:fs";

const [inputPath, outputPath, versionRef = "workbench_007"] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  throw new Error("usage: node analyze_workbench_005.mjs <complete_graph_exposure.json> <output.json>");
}

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

function has(event) {
  return (edge) => edge.events.includes(event);
}

function hasAll(events) {
  return (edge) => events.every((event) => edge.events.includes(event));
}

function canReachWin(blocked) {
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

function winningOccurrenceCounts(predicate, cap = 6) {
  const width = cap + 2;
  const seen = new Uint8Array(nodes.length * width);
  const queue = [[0, 0]];
  seen[0] = 1;
  const counts = new Set();
  for (let head = 0; head < queue.length; head += 1) {
    const [from, count] = queue[head];
    if (winning.has(from)) counts.add(count);
    for (const edge of outgoing[from]) {
      const nextCount = Math.min(cap + 1, count + (predicate(edge) ? 1 : 0));
      const marker = edge.to * width + nextCount;
      if (seen[marker]) continue;
      seen[marker] = 1;
      queue.push([edge.to, nextCount]);
    }
  }
  return [...counts].sort((a, b) => a - b).map((count) => count === cap + 1 ? `>${cap}` : count);
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

function firstCandleMoveViolationCanWin() {
  const none = 0;
  const expected = 1;
  const violated = 2;
  const seen = new Uint8Array(nodes.length * 3);
  const queue = [[0, none]];
  seen[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    const [from, status] = queue[head];
    if (winning.has(from) && status === violated) return true;
    for (const edge of outgoing[from]) {
      const candleMove = edge.events.some((event) =>
        event.startsWith("push_axis:") || event.startsWith("roll_candle:"));
      let nextStatus = status;
      if (status === none && candleMove) {
        const exactTopStaging = edge.action === "up" &&
          edge.events.includes("roll_candle:candle#1:d4") &&
          nodes[edge.from].key.includes("C:candle#1:1:right:1:2,6;3,6;4,6;5,6;6,6;7,6");
        nextStatus = exactTopStaging ? expected : violated;
      }
      const marker = edge.to * 3 + nextStatus;
      if (seen[marker]) continue;
      seen[marker] = 1;
      queue.push([edge.to, nextStatus]);
    }
  }
  return false;
}

function sampleFirstCandleMoveViolation() {
  const width = 3;
  const seen = new Uint8Array(nodes.length * width);
  const parent = new Int32Array(nodes.length * width).fill(-1);
  const parentEdge = new Int32Array(nodes.length * width).fill(-1);
  const queue = [[0, 0]];
  seen[0] = 1;
  let goalMarker = -1;
  for (let head = 0; head < queue.length; head += 1) {
    const [from, status] = queue[head];
    const marker = from * width + status;
    if (winning.has(from) && status === 2) {
      goalMarker = marker;
      break;
    }
    for (const edge of outgoing[from]) {
      const candleMove = edge.events.some((event) =>
        event.startsWith("push_axis:") || event.startsWith("roll_candle:"));
      let nextStatus = status;
      if (status === 0 && candleMove) {
        const exactTopStaging = edge.action === "up" &&
          edge.events.includes("roll_candle:candle#1:d4") &&
          nodes[edge.from].key.includes("C:candle#1:1:right:1:2,6;3,6;4,6;5,6;6,6;7,6");
        nextStatus = exactTopStaging ? 1 : 2;
      }
      const nextMarker = edge.to * width + nextStatus;
      if (seen[nextMarker]) continue;
      seen[nextMarker] = 1;
      parent[nextMarker] = marker;
      parentEdge[nextMarker] = edge.index;
      queue.push([edge.to, nextStatus]);
    }
  }
  if (goalMarker < 0) return null;
  const path = [];
  for (let marker = goalMarker; parent[marker] >= 0; marker = parent[marker]) {
    path.push(edges[parentEdge[marker]]);
  }
  path.reverse();
  return {
    cost: path.length,
    inputs: path.map((edge) => edge.action).join(" "),
    structural_steps: path.map((edge, index) => ({
      step: index + 1,
      input: edge.action,
      events: edge.events.filter((event) =>
        event.startsWith("push_axis:") ||
        event.startsWith("roll_candle:") ||
        event.startsWith("roll_intermediate_") ||
        event.startsWith("roll_reignite_") ||
        event.startsWith("light_brazier:") ||
        event.startsWith("shrink:") ||
        event.startsWith("win_")),
    })).filter((step) => step.events.length > 0),
  };
}

function sampleWinningPathForCount(predicate, targetCount) {
  const width = targetCount + 1;
  const seen = new Uint8Array(nodes.length * width);
  const parent = new Int32Array(nodes.length * width).fill(-1);
  const parentEdge = new Int32Array(nodes.length * width).fill(-1);
  const queue = [[0, 0]];
  seen[0] = 1;
  let goalMarker = -1;
  for (let head = 0; head < queue.length; head += 1) {
    const [from, count] = queue[head];
    const marker = from * width + count;
    if (winning.has(from) && count === targetCount) {
      goalMarker = marker;
      break;
    }
    for (const edge of outgoing[from]) {
      const nextCount = count + (predicate(edge) ? 1 : 0);
      if (nextCount > targetCount) continue;
      const nextMarker = edge.to * width + nextCount;
      if (seen[nextMarker]) continue;
      seen[nextMarker] = 1;
      parent[nextMarker] = marker;
      parentEdge[nextMarker] = edge.index;
      queue.push([edge.to, nextCount]);
    }
  }
  if (goalMarker < 0) return null;
  const path = [];
  for (let marker = goalMarker; parent[marker] >= 0; marker = parent[marker]) {
    path.push(edges[parentEdge[marker]]);
  }
  path.reverse();
  return {
    cost: path.length,
    inputs: path.map((edge) => edge.action).join(" "),
    structural_steps: path.map((edge, index) => ({
      step: index + 1,
      input: edge.action,
      events: edge.events.filter((event) =>
        event.startsWith("push_axis:") ||
        event.startsWith("roll_candle:") ||
        event.startsWith("roll_reignite_") ||
        event.startsWith("light_brazier:") ||
        event.startsWith("win_")),
    })).filter((step) => step.events.length > 0),
  };
}

const reverseReachable = new Uint8Array(nodes.length);
const reverseQueue = [...winning];
for (const index of reverseQueue) reverseReachable[index] = 1;
for (let head = 0; head < reverseQueue.length; head += 1) {
  const to = reverseQueue[head];
  for (const edge of incoming[to]) {
    if (reverseReachable[edge.from]) continue;
    reverseReachable[edge.from] = 1;
    reverseQueue.push(edge.from);
  }
}

const predicates = {
  top_goal_lit: has("light_brazier:9,2"),
  bottom_goal_lit: has("light_brazier:9,10"),
  core_d8: has("roll_candle:candle#1:d8"),
  core_extinguish_d2: has("roll_intermediate_extinguish:candle#1:d2"),
  core_ignite_d6: has("roll_intermediate_ignite:candle#1:d6"),
  core_reignite_d2_d6: has("roll_reignite_after_extinguish:candle#1:d2->d6"),
  axis_push: has("push_axis:candle#1"),
  top_stage_d4: (edge) => edge.action === "up" && edge.events.includes("roll_candle:candle#1:d4"),
  bottom_stage_d4: (edge) => edge.action === "down" && edge.events.includes("roll_candle:candle#1:d4"),
  exact_core_edge: hasAll([
    "roll_candle:candle#1:d8",
    "roll_intermediate_extinguish:candle#1:d2",
    "roll_intermediate_ignite:candle#1:d6",
    "roll_reignite_after_extinguish:candle#1:d2->d6",
    "light_brazier:9,10",
  ]),
};

const mandatoryEventRemoval = Object.entries(predicates).map(([name, predicate]) => ({
  name,
  win_reachable_after_removal: canReachWin(predicate),
}));
const occurrenceCounts = Object.entries(predicates).map(([name, predicate]) => ({
  name,
  winning_path_occurrence_counts: winningOccurrenceCounts(predicate),
}));
const orderChecks = [
  ["top_stage_d4", "top_goal_lit"],
  ["top_goal_lit", "exact_core_edge"],
  ["exact_core_edge", "bottom_goal_lit"],
].map(([first, second]) => ({
  first,
  second,
  violating_win_reachable: violatingOrderCanWin(predicates[first], predicates[second]),
}));

const winReachingEdges = edges.filter((edge) => reverseReachable[edge.to]);
const exactCoreEdges = winReachingEdges.filter(predicates.exact_core_edge);
const coreSourceForms = [...new Map(exactCoreEdges.map((edge) => [nodes[edge.from].key, {
  source_node: edge.from,
  source_depth: nodes[edge.from].depth,
  action: edge.action,
  source_key: nodes[edge.from].key,
  event_order: edge.events,
}])).values()];

const result = {
  schema_version: 1,
  candidate_id: "CANDLE_CURRICULUM_L17_ORDERED_DOUSE_REIGNITE_001",
  version_ref: versionRef,
  input_artifact: inputPath.replaceAll("\\", "/"),
  graph: {
    status: artifact.graph.status,
    nodes: nodes.length,
    edges: edges.length,
    winning_nodes: winning.size,
    win_reaching_nodes: reverseReachable.reduce((sum, value) => sum + value, 0),
    win_reaching_edges: winReachingEdges.length,
  },
  baseline_win_reachable: canReachWin(() => false),
  mandatory_event_removal: mandatoryEventRemoval,
  all_identity_events_mandatory: mandatoryEventRemoval
    .filter((entry) => !["axis_push", "bottom_stage_d4"].includes(entry.name))
    .every((entry) => !entry.win_reachable_after_removal),
  winning_path_occurrence_counts: occurrenceCounts,
  required_event_order: orderChecks,
  all_order_checks_pass: orderChecks.every((entry) => !entry.violating_win_reachable),
  first_candle_move_other_than_exact_top_staging_can_win: firstCandleMoveViolationCanWin(),
  first_candle_move_violation_sample: sampleFirstCandleMoveViolation(),
  axis_push_count_samples: {
    three: sampleWinningPathForCount(predicates.axis_push, 3),
    four: sampleWinningPathForCount(predicates.axis_push, 4),
    five: sampleWinningPathForCount(predicates.axis_push, 5),
  },
  exact_core_win_reaching_edge_count: exactCoreEdges.length,
  exact_core_source_forms: coreSourceForms,
  winning_mechanical_end_signatures: [...new Set(nodes
    .filter((node) => node.winning)
    .map((node) => node.key.slice(node.key.indexOf("|C:") + 1)))].sort(),
  interpretation:
    "检查所有可达胜解是否都以初始上向 d4 作为第一次蜡烛移动，并强制经过上端写入、同一 d8 的 d2 灭火/d6 复燃、下端读取。",
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
