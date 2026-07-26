import fs from "node:fs";

const inputPath = process.argv[2];
if (!inputPath) {
  throw new Error("usage: node analyze_solution_family.mjs <complete_graph_exposure.json>");
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

function canReachWin(blocked) {
  const seen = new Uint8Array(nodes.length);
  const queue = [0];
  seen[0] = 1;
  for (let head = 0; head < queue.length; head += 1) {
    const from = queue[head];
    if (winning.has(from)) return true;
    for (const edge of outgoing[from]) {
      if (blocked(edge)) continue;
      if (!seen[edge.to]) {
        seen[edge.to] = 1;
        queue.push(edge.to);
      }
    }
  }
  return false;
}

function winningOccurrenceCounts(predicate, cap = 4) {
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
      if (!seen[marker]) {
        seen[marker] = 1;
        queue.push([edge.to, nextCount]);
      }
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
      if (!seen[marker]) {
        seen[marker] = 1;
        queue.push([edge.to, nextFirstSeen, nextViolated]);
      }
    }
  }
  return false;
}

function sampleWinningPathForCount(predicate, targetCount) {
  const width = targetCount + 1;
  const total = nodes.length * width;
  const seen = new Uint8Array(total);
  const parent = new Int32Array(total).fill(-1);
  const parentEdge = new Int32Array(total).fill(-1);
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
      if (!seen[nextMarker]) {
        seen[nextMarker] = 1;
        parent[nextMarker] = marker;
        parentEdge[nextMarker] = edge.index;
        queue.push([edge.to, nextCount]);
      }
    }
  }
  if (goalMarker < 0) return null;
  const pathEdges = [];
  for (let marker = goalMarker; parent[marker] >= 0; marker = parent[marker]) {
    pathEdges.push(edges[parentEdge[marker]]);
  }
  pathEdges.reverse();
  return {
    cost: pathEdges.length,
    inputs: pathEdges.map((edge) => edge.action).join(" "),
    structural_steps: pathEdges.map((edge, index) => ({
      step: index + 1,
      input: edge.action,
      events: edge.events.filter((event) =>
        event.startsWith("push_axis") ||
        event.startsWith("roll_candle") ||
        event.startsWith("roll_intermediate") ||
        event.startsWith("light_brazier") ||
        event.startsWith("win_")
      ),
    })).filter((step) => step.events.length > 0),
  };
}

const mandatoryChecks = [
  ["A_axis_alignment", (edge) => edge.events.includes("push_axis:candle#4")],
  ["A_long_roll_d4", (edge) => edge.events.includes("roll_candle:candle#4:d4")],
  ["A_mid_roll_ignite_d1", (edge) => edge.events.includes("roll_intermediate_ignite:candle#4:d1")],
  ["A_mid_roll_path_light_d2", (edge) => edge.events.includes("roll_intermediate_light_brazier:candle#4:d2")],
  ["path_brazier_created", (edge) => edge.events.includes("light_brazier:2,4")],
  ["Q_endpoint_roll_d2", (edge) => edge.events.includes("roll_candle:candle#2:d2")],
  ["Q_mid_roll_ignite_d1", (edge) => edge.events.includes("roll_intermediate_ignite:candle#2:d1")],
  ["Q_ignites_from_support", (edge) => edge.events.includes("ignite_from_brazier:candle#2:8,3")],
  ["Q_axis_push", (edge) => edge.events.includes("push_axis:candle#2")],
  ["final_brazier_lit", (edge) => edge.events.includes("light_brazier:7,2")],
].map(([name, predicate]) => ({
  name,
  win_reachable_after_removal: canReachWin(predicate),
}));

const occurrenceChecks = [
  ["A_axis_alignment", (edge) => edge.events.includes("push_axis:candle#4")],
  ["A_long_roll_d4", (edge) => edge.events.includes("roll_candle:candle#4:d4")],
  ["path_brazier_created", (edge) => edge.events.includes("light_brazier:2,4")],
  ["Q_endpoint_roll_d2", (edge) => edge.events.includes("roll_candle:candle#2:d2")],
  ["Q_axis_push", (edge) => edge.events.includes("push_axis:candle#2")],
  ["final_brazier_lit", (edge) => edge.events.includes("light_brazier:7,2")],
].map(([name, predicate]) => ({ name, winning_path_occurrence_counts: winningOccurrenceCounts(predicate) }));

const eventPredicates = Object.fromEntries([
  ["A_axis_alignment", (edge) => edge.events.includes("push_axis:candle#4")],
  ["A_long_roll_d4", (edge) => edge.events.includes("roll_candle:candle#4:d4")],
  ["path_brazier_created", (edge) => edge.events.includes("light_brazier:2,4")],
  ["Q_endpoint_roll_d2", (edge) => edge.events.includes("roll_candle:candle#2:d2")],
  ["Q_axis_push", (edge) => edge.events.includes("push_axis:candle#2")],
  ["final_brazier_lit", (edge) => edge.events.includes("light_brazier:7,2")],
]);

const orderChecks = [
  ["A_axis_alignment", "A_long_roll_d4"],
  ["A_long_roll_d4", "path_brazier_created"],
  ["path_brazier_created", "Q_endpoint_roll_d2"],
  ["Q_endpoint_roll_d2", "Q_axis_push"],
  ["Q_axis_push", "final_brazier_lit"],
].map(([first, second]) => ({
  first,
  second,
  violating_win_reachable: violatingOrderCanWin(eventPredicates[first], eventPredicates[second]),
}));

const reverseReachable = new Uint8Array(nodes.length);
const reverseQueue = [...winning];
for (const index of reverseQueue) reverseReachable[index] = 1;
for (let head = 0; head < reverseQueue.length; head += 1) {
  const to = reverseQueue[head];
  for (const edge of incoming[to]) {
    if (!reverseReachable[edge.from]) {
      reverseReachable[edge.from] = 1;
      reverseQueue.push(edge.from);
    }
  }
}

const winReachingEdges = edges.filter((edge) => reverseReachable[edge.to]);
const structuralEvents = [...new Set(winReachingEdges.flatMap((edge) => edge.events).filter((event) =>
  !event.startsWith("walk") &&
  !event.startsWith("countdown") &&
  !event.startsWith("burn_segment") &&
  !event.startsWith("candle_shrinks") &&
  !event.startsWith("candle_burns_out")
))].sort();

const qEndpointEdges = winReachingEdges.filter((edge) => edge.events.includes("roll_candle:candle#2:d2"));
const qEndpointSources = [...new Map(qEndpointEdges.map((edge) => {
  const key = nodes[edge.from].key;
  const match = key.match(/candle#4:(\d+):left:(\d):([^|]+)/);
  const a = match ? {
    length: Number(match[1]),
    lit: match[2] === "1",
    cells: match[3].split(";"),
  } : null;
  return [key, {
    source_node: edge.from,
    source_depth: nodes[edge.from].depth,
    a,
    endpoint_tail_present: Boolean(a?.cells.includes("6,6")),
    only_expected_tail_forms: Boolean(a && ["6,6", "6,6;5,6"].includes(a.cells.join(";"))),
  }];
})).values()];

const qEndpointTailForms = [...new Map(qEndpointSources.map((source) => {
  const form = source.a?.cells.join(";") ?? "parse_failed";
  return [form, {
    cells_in_runtime_order: form,
    source_count: qEndpointSources.filter((item) => item.a?.cells.join(";") === form).length,
    min_source_depth: Math.min(...qEndpointSources.filter((item) => item.a?.cells.join(";") === form).map((item) => item.source_depth)),
    max_source_depth: Math.max(...qEndpointSources.filter((item) => item.a?.cells.join(";") === form).map((item) => item.source_depth)),
    includes_required_endpoint_tail_6_6: source.a?.cells.includes("6,6") ?? false,
  }];
})).values()];

const mechanicalEndSignatures = [...new Set(nodes
  .filter((node) => node.winning)
  .map((node) => node.key.slice(node.key.indexOf("|C:") + 1)))].sort();

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
  baseline_win_reachable: canReachWin(() => false),
  mandatory_event_removal: mandatoryChecks,
  all_mandatory_checks_pass: mandatoryChecks.every((check) => !check.win_reachable_after_removal),
  winning_path_occurrence_counts: occurrenceChecks,
  reversible_detour_samples: {
    four_A_axis_pushes: sampleWinningPathForCount(eventPredicates.A_axis_alignment, 4),
    three_Q_axis_pushes: sampleWinningPathForCount(eventPredicates.Q_axis_push, 3),
  },
  required_event_order: orderChecks,
  all_order_checks_pass: orderChecks.every((check) => !check.violating_win_reachable),
  structural_events_on_any_win_reaching_edge: structuralEvents,
  q_endpoint_roll_source_count: qEndpointSources.length,
  q_endpoint_tail_forms: qEndpointTailForms,
  all_q_endpoint_rolls_use_a_tail_6_6: qEndpointSources.every((source) => source.endpoint_tail_present),
  all_q_endpoint_rolls_use_only_expected_a_tail_forms: qEndpointSources.every((source) => source.only_expected_tail_forms),
  winning_mechanical_end_signatures: mechanicalEndSignatures,
  interpretation: "所有获胜路径都必须经过同一组结构事件；差异只来自走位与燃烧时序。Q 的 d2 左滚在所有可达胜解中都以 A 的 (6,6) 反灯芯尾端为第二步阻挡。",
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
