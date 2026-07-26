import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import YAML from "yaml";
import {
  isCandleSearchTerminal,
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
} from "../../../../../../src/prototypes/candle_sokoban/mechanics.ts";

const layoutPath = process.argv[2];
const mutationId = process.argv[3];
const outDir = process.argv[4];
const receiverRollEvent = process.argv[5] ?? "roll_candle:candle#2:d5";
const firstBrazierEvent = process.argv[6] ?? "light_brazier:6,5";
const relayRollEvent = process.argv[7] ?? "roll_candle:candle#3:d4";
const secondBrazierEvent = process.argv[8] ?? "light_brazier:7,2";
if (!layoutPath || !mutationId || !outDir) {
  throw new Error("usage: counterfactual_supplement.ts <layout.txt> <mutation-id> <out-dir>");
}

const root = process.cwd();
const layout = fs.readFileSync(layoutPath, "utf8").trimEnd();
const normalizedLayout = `${layout}\n`;
const layoutSha256 = createHash("sha256").update(normalizedLayout).digest("hex");
const mechanic = YAML.parse(fs.readFileSync(path.join(root, "prototypes/candle_sokoban/mechanic.yml"), "utf8"));
const initial = parseLevel({
  id: mutationId,
  title: mutationId,
  layout,
  win: { type: "all_braziers_lit" },
} as any);
const inputs = ["up", "down", "left", "right"] as const;

type Edge = { from: number; to: number; input: string; events: string[] };
type Node = { key: string; state: any; depth: number; predecessor: Edge | null };
const nodes: Node[] = [{ key: stateKey(initial), state: initial, depth: 0, predecessor: null }];
const ids = new Map([[nodes[0].key, 0]]);
const edges: Edge[] = [];
const edgeIdsFrom: number[][] = [[]];
const queue = [0];
for (let cursor = 0; cursor < queue.length; cursor += 1) {
  const from = queue[cursor];
  const node = nodes[from];
  if (isCandleSearchTerminal(node.state)) continue;
  for (const input of inputs) {
    const result = step(mechanic, node.state, input as any);
    if (!result.legal) continue;
    const key = stateKey(result.state);
    let to = ids.get(key);
    if (to === undefined) {
      to = nodes.length;
      ids.set(key, to);
      const predecessor = { from, to, input, events: result.events };
      nodes.push({ key, state: result.state, depth: node.depth + 1, predecessor });
      edgeIdsFrom.push([]);
      queue.push(to);
    }
    const edge = { from, to, input, events: result.events };
    edgeIdsFrom[from].push(edges.length);
    edges.push(edge);
  }
}

const winningNodeIds = nodes.map((node, id) => ({ node, id })).filter(({ node }) => isWin(node.state)).map(({ id }) => id);
const firstWinningNodeId = [...winningNodeIds].sort((a, b) => nodes[a].depth - nodes[b].depth || a - b)[0];

function traceTo(nodeId: number): Edge[] {
  const trace: Edge[] = [];
  let cursor = nodeId;
  while (cursor !== 0) {
    const edge = nodes[cursor].predecessor;
    if (!edge) throw new Error(`missing predecessor for ${cursor}`);
    trace.push(edge);
    cursor = edge.from;
  }
  return trace.reverse();
}

const replay = firstWinningNodeId === undefined
  ? null
  : (() => {
      const trace = traceTo(firstWinningNodeId);
      const states = [0, ...trace.map((edge) => edge.to)];
      return {
        status: "solved",
        cost: trace.length,
        winning_node_id: firstWinningNodeId,
        inputs: trace.map((edge) => edge.input),
        steps: trace.map((edge, index) => ({
          step: index + 1,
          from: edge.from,
          to: edge.to,
          input: edge.input,
          events: edge.events,
          rendered_state_after: renderState(nodes[edge.to].state),
        })),
        rendered_states: states.map((id, index) => ({ step: index, node_id: id, render: renderState(nodes[id].state) })),
      };
    })();

function winReachableWithoutEvent(event: string): { reachable: boolean; witness_inputs: string[] | null } {
  const seen = new Uint8Array(nodes.length);
  const predecessor: Array<{ from: number; edge: Edge } | null> = new Array(nodes.length).fill(null);
  const localQueue = [0];
  seen[0] = 1;
  for (let cursor = 0; cursor < localQueue.length; cursor += 1) {
    const from = localQueue[cursor];
    if (isWin(nodes[from].state)) {
      const witness: string[] = [];
      let current = from;
      while (current !== 0) {
        const item = predecessor[current]!;
        witness.push(item.edge.input);
        current = item.from;
      }
      return { reachable: true, witness_inputs: witness.reverse() };
    }
    for (const edgeId of edgeIdsFrom[from]) {
      const edge = edges[edgeId];
      if (edge.events.includes(event) || seen[edge.to]) continue;
      seen[edge.to] = 1;
      predecessor[edge.to] = { from, edge };
      localQueue.push(edge.to);
    }
  }
  return { reachable: false, witness_inputs: null };
}

const probedEvents = [
  "roll_candle:candle#1:d2",
  "shrink:candle#1:len2",
  "shrink_ignite:candle#2",
  "shrink:candle#2:len2",
  receiverRollEvent,
  "ignite:candle#3",
  firstBrazierEvent,
  "shrink:candle#3:len2",
  relayRollEvent,
  secondBrazierEvent,
  "win_all_braziers_lit",
  ...(mutationId === "cf_receiver_prelit"
    ? ["extinguish:candle#2:concealed", "extinguish_by_candle_body:candle#2"]
    : []),
];

const eventNecessity = probedEvents.map((event) => {
  const eventEdgeCount = edges.filter((edge) => edge.events.includes(event)).length;
  if (winningNodeIds.length === 0) {
    return { event, event_edge_count: eventEdgeCount, status: "no_winning_paths", required_on_all_winning_paths: null };
  }
  const avoidance = winReachableWithoutEvent(event);
  return {
    event,
    event_edge_count: eventEdgeCount,
    status: avoidance.reachable ? "avoidable" : "required",
    required_on_all_winning_paths: !avoidance.reachable,
    avoiding_winning_witness_inputs: avoidance.witness_inputs,
  };
});

function orderedReceiverRelightProbe() {
  if (winningNodeIds.length === 0) return { status: "no_winning_paths" };
  type Product = { node: number; stage: 0 | 1 | 2; violated: boolean };
  const start: Product = { node: 0, stage: 0, violated: false };
  const key = (value: Product) => `${value.node}|${value.stage}|${Number(value.violated)}`;
  const productQueue = [start];
  const seen = new Set([key(start)]);
  const winningProducts: Product[] = [];
  for (let cursor = 0; cursor < productQueue.length; cursor += 1) {
    const current = productQueue[cursor];
    if (isWin(nodes[current.node].state)) {
      winningProducts.push(current);
      continue;
    }
    for (const edgeId of edgeIdsFrom[current.node]) {
      const edge = edges[edgeId];
      let stage = current.stage;
      let violated = current.violated;
      if (edge.events.includes("extinguish:candle#2:concealed") && stage === 0) stage = 1;
      if (edge.events.includes("shrink_ignite:candle#2")) {
        if (stage === 0) violated = true;
        else if (stage === 1) stage = 2;
      }
      const next = { node: edge.to, stage, violated } as Product;
      const nextKey = key(next);
      if (seen.has(nextKey)) continue;
      seen.add(nextKey);
      productQueue.push(next);
    }
  }
  const bad = winningProducts.filter((product) => product.stage !== 2 || product.violated);
  return {
    status: bad.length === 0 ? "required_in_order" : "violating_win_exists",
    assertion: "receiver begins lit; every winning path contains extinguish:candle#2:concealed before a later shrink_ignite:candle#2",
    reachable_product_state_count: seen.size,
    winning_product_states: winningProducts,
    bad_winning_product_states: bad,
    supported: bad.length === 0,
  };
}

const rawGraph = {
  schema_version: 1,
  mutation_id: mutationId,
  layout_sha256: layoutSha256,
  status: "complete",
  terminal_policy: "winning states have no outgoing expansion; every legal transition from every other reachable state is recorded",
  reachable_state_count: nodes.length,
  legal_transition_count: edges.length,
  winning_state_count: winningNodeIds.length,
  winning_node_ids: winningNodeIds,
  nodes: nodes.map((node, id) => ({ id, key: node.key, depth: node.depth, winning: isWin(node.state) })),
  edges,
};

const probes = {
  schema_version: 1,
  mutation_id: mutationId,
  layout_sha256: layoutSha256,
  initial_state_key: nodes[0].key,
  initial_receiver_lit: /candle#2:\d+:[^:]+:1:/.test(nodes[0].key),
  graph_status: "complete",
  reachable_state_count: nodes.length,
  legal_transition_count: edges.length,
  winning_state_count: winningNodeIds.length,
  shortest_win_cost: firstWinningNodeId === undefined ? null : nodes[firstWinningNodeId].depth,
  event_necessity: eventNecessity,
  receiver_extinguish_then_relight_order:
    mutationId === "cf_receiver_prelit" ? orderedReceiverRelightProbe() : { status: "not_applicable" },
};

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "complete_graph.json"), `${JSON.stringify(rawGraph)}\n`);
fs.writeFileSync(path.join(outDir, "canonical_replay.json"), `${JSON.stringify(replay, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "event_probes.json"), `${JSON.stringify(probes, null, 2)}\n`);
fs.writeFileSync(
  path.join(outDir, "graph_summary.yml"),
  YAML.stringify({
    schema_version: 1,
    mutation_id: mutationId,
    layout_file: "layout.txt",
    layout_sha256: layoutSha256,
    graph_status: "complete",
    reachable_state_count: nodes.length,
    legal_transition_count: edges.length,
    winning_state_count: winningNodeIds.length,
    shortest_win_cost: firstWinningNodeId === undefined ? null : nodes[firstWinningNodeId].depth,
    artifacts: ["complete_graph.json", "canonical_replay.json", "event_probes.json"],
  }),
);
console.log(JSON.stringify(probes, null, 2));
