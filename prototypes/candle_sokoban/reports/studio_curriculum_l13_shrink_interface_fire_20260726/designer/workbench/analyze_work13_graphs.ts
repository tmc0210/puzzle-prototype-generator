import fs from "node:fs";
import path from "node:path";

type Node = { index: number; key: string; depth: number; winning: boolean };
type Edge = { index: number; from: number; to: number; action: string; events: string[] };
type Audit = {
  level: { layout_sha256: string };
  graph: {
    status: string;
    reachable_state_count: number;
    legal_transition_count: number;
    win_state_count: number;
  };
  verdict: string;
  forbidden_hits: unknown[];
  raw_graph: { nodes: Node[]; edges: Edge[] };
};

const baselinePath = process.argv[2];
const outDir = process.argv[3];
const exactVersion = process.argv[4];
const candidateId = process.argv[5];
const solveInstanceRef = process.argv[6];
const mutationArgs = process.argv.slice(7);
if (
  !baselinePath ||
  !outDir ||
  !exactVersion ||
  !candidateId ||
  !solveInstanceRef ||
  mutationArgs.some((arg) => !arg.includes("="))
) {
  throw new Error(
    "usage: npx tsx analyze_work13_graphs.ts <baseline-audit.json> <out-dir> <exact-version> <candidate-id> <solve-instance-ref> [name=audit.json ...]",
  );
}

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
const significant = (edge: Edge): string[] =>
  edge.events.filter((event) =>
    significantPrefixes.some((prefix) => event.startsWith(prefix)),
  );

function loadAudit(filePath: string): Audit {
  const audit = JSON.parse(fs.readFileSync(filePath, "utf8")) as Audit;
  if (audit.graph.status !== "complete") {
    throw new Error(`${filePath}: graph is not complete`);
  }
  if (
    audit.raw_graph.nodes.length !== audit.graph.reachable_state_count ||
    audit.raw_graph.edges.length !== audit.graph.legal_transition_count ||
    audit.raw_graph.nodes.filter((node) => node.winning).length !==
      audit.graph.win_state_count
  ) {
    throw new Error(`${filePath}: raw graph count mismatch`);
  }
  return audit;
}

function analyzeGraph(audit: Audit) {
  const nodes = audit.raw_graph.nodes;
  const edges = audit.raw_graph.edges;
  const out: Edge[][] = Array.from({ length: nodes.length }, () => []);
  const reverse: number[][] = Array.from({ length: nodes.length }, () => []);
  for (const edge of edges) {
    out[edge.from]!.push(edge);
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

  const predecessor: Array<Edge | null> = new Array(nodes.length).fill(null);
  const queue = [0];
  const seen = new Uint8Array(nodes.length);
  seen[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    for (const edge of out[from]!) {
      if (seen[edge.to]) continue;
      seen[edge.to] = 1;
      predecessor[edge.to] = edge;
      queue.push(edge.to);
    }
  }

  function traceTo(nodeId: number): Edge[] {
    const trace: Edge[] = [];
    let cursor = nodeId;
    while (cursor !== 0) {
      const edge = predecessor[cursor];
      if (!edge) throw new Error(`missing predecessor for ${cursor}`);
      trace.push(edge);
      cursor = edge.from;
    }
    return trace.reverse();
  }

  function summarizeTrace(trace: Edge[]) {
    return {
      inputs: trace.map((edge) => edge.action),
      terminal_node: trace.at(-1)?.to ?? 0,
      steps: trace.map((edge, index) => ({
        step: index + 1,
        input: edge.action,
        from: edge.from,
        to: edge.to,
        events: edge.events,
      })),
      significant_steps: trace
        .map((edge, index) => ({
          step: index + 1,
          input: edge.action,
          events: significant(edge),
        }))
        .filter((step) => step.events.length > 0),
    };
  }

  function followInputs(inputs: string[]) {
    const trace: Edge[] = [];
    let nodeId = 0;
    for (const input of inputs) {
      const matches = out[nodeId]!.filter((edge) => edge.action === input);
      if (matches.length !== 1) {
        throw new Error(
          `expected one ${input} edge from node ${nodeId}, got ${matches.length}`,
        );
      }
      trace.push(matches[0]!);
      nodeId = matches[0]!.to;
    }
    return trace;
  }

  function winAvoidingEvent(event: string) {
    const localSeen = new Uint8Array(nodes.length);
    const localPredecessor: Array<Edge | null> = new Array(nodes.length).fill(null);
    const localQueue = [0];
    localSeen[0] = 1;
    let terminal: number | null = nodes[0]!.winning ? 0 : null;
    for (let cursor = 0; cursor < localQueue.length && terminal === null; cursor += 1) {
      const from = localQueue[cursor]!;
      for (const edge of out[from]!) {
        if (edge.events.includes(event) || localSeen[edge.to]) continue;
        localSeen[edge.to] = 1;
        localPredecessor[edge.to] = edge;
        localQueue.push(edge.to);
        if (nodes[edge.to]!.winning) {
          terminal = edge.to;
          break;
        }
      }
    }
    if (terminal === null) return { avoiding_win_exists: false, witness: null };
    const trace: Edge[] = [];
    let cursor = terminal;
    while (cursor !== 0) {
      const edge = localPredecessor[cursor];
      if (!edge) throw new Error(`missing avoiding predecessor for ${cursor}`);
      trace.push(edge);
      cursor = edge.from;
    }
    return { avoiding_win_exists: true, witness: summarizeTrace(trace.reverse()) };
  }

  function shortestEdgeWitness(predicate: (edge: Edge) => boolean) {
    const edge = edges
      .filter(predicate)
      .sort((a, b) => nodes[a.from]!.depth - nodes[b.from]!.depth)[0];
    if (!edge) return null;
    return {
      ...summarizeTrace([...traceTo(edge.from), edge]),
      endpoint_can_reach_win: Boolean(canReachWin[edge.to]),
    };
  }

  function shortestPostTransferObjectDetour() {
    type Product = { node: number; transferred: boolean; trace: Edge[] };
    const productQueue: Product[] = [{ node: 0, transferred: false, trace: [] }];
    const productSeen = new Set(["0|0"]);
    for (let cursor = 0; cursor < productQueue.length; cursor += 1) {
      const current = productQueue[cursor]!;
      for (const edge of out[current.node]!) {
        const transferred =
          current.transferred || edge.events.includes("shrink_ignite:candle#single3");
        const isOtherPlayerObjectOperation =
          current.transferred &&
          edge.events.some(
            (event) =>
              (event.startsWith("push_axis:") || event.startsWith("roll_candle:")) &&
              event !== "push_axis:candle#single3",
          );
        if (isOtherPlayerObjectOperation) {
          return {
            ...summarizeTrace([...current.trace, edge]),
            endpoint_can_reach_win: Boolean(canReachWin[edge.to]),
          };
        }
        const key = `${edge.to}|${Number(transferred)}`;
        if (productSeen.has(key)) continue;
        productSeen.add(key);
        productQueue.push({ node: edge.to, transferred, trace: [...current.trace, edge] });
      }
    }
    return null;
  }

  const winningNodes = nodes.filter((node) => node.winning);
  const shortestWinningNode = winningNodes.sort((a, b) => a.depth - b.depth)[0];
  return {
    nodes,
    edges,
    out,
    canReachWin,
    summarizeTrace,
    followInputs,
    winAvoidingEvent,
    shortestEdgeWitness,
    shortestPostTransferObjectDetour,
    summary: {
      layout_sha256: audit.level.layout_sha256,
      graph_status: audit.graph.status,
      reachable_states: nodes.length,
      legal_transitions: edges.length,
      winning_states: winningNodes.length,
      exposure_verdict: audit.verdict,
      forbidden_hit_count: audit.forbidden_hits.length,
      shortest_win: shortestWinningNode
        ? summarizeTrace(traceTo(shortestWinningNode.index))
        : null,
      terminal_witnesses: winningNodes.map((node) => ({
        winning_node: node.index,
        shortest_depth: node.depth,
        ...summarizeTrace(traceTo(node.index)),
      })),
    },
  };
}

const baselineAudit = loadAudit(baselinePath);
const baseline = analyzeGraph(baselineAudit);
const canonicalInputs = ["right", "down", "right", "right", "right", "up"];
const canonicalTrace = baseline.followInputs(canonicalInputs);
const canonical = baseline.summarizeTrace(canonicalTrace);
const canonicalTerminal = baseline.nodes[canonical.terminal_node]!;
if (!canonicalTerminal.winning) throw new Error("canonical trace does not win");

const requiredEvents = [
  "roll_candle:candle#single2:d2",
  "extinguish_by_candle_body:candle#single2",
  "shrink:candle#1:len1",
  "shrink_ignite:candle#single3",
  "push_axis:candle#single3",
  "light_brazier:6,1",
  "win_all_braziers_lit",
];

const preparedNode = canonicalTrace[0]!.to;
const afterPreparationReachable = new Uint8Array(baseline.nodes.length);
const preparationQueue = [preparedNode];
afterPreparationReachable[preparedNode] = 1;
for (let cursor = 0; cursor < preparationQueue.length; cursor += 1) {
  for (const edge of baseline.out[preparationQueue[cursor]!]!) {
    if (afterPreparationReachable[edge.to]) continue;
    afterPreparationReachable[edge.to] = 1;
    preparationQueue.push(edge.to);
  }
}
const postPreparationSupportEdges = baseline.edges.filter(
  (edge) =>
    afterPreparationReachable[edge.from] &&
    significant(edge).some((event) => event.includes("candle#single2")),
);
const postPreparationWinningSupportEdges = postPreparationSupportEdges.filter(
  (edge) => baseline.canReachWin[edge.from] && baseline.canReachWin[edge.to],
);

const wrongAPrefix = baseline.followInputs(["right", "up", "right", "right"]);
const wrongAResult = {
  ...baseline.summarizeTrace(wrongAPrefix),
  endpoint_can_reach_win: Boolean(
    baseline.canReachWin[wrongAPrefix.at(-1)!.to],
  ),
};

const baselineQueries = {
  schema_version: 1,
  candidate_id: candidateId,
  exact_version: exactVersion,
  layout_sha256: baselineAudit.level.layout_sha256,
  solve_instance_ref: solveInstanceRef,
  provenance: {
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_sha256: baselineAudit.level.layout_sha256,
    solve_instance_ref: solveInstanceRef,
  },
  source: path.resolve(baselinePath),
  graph: baseline.summary,
  canonical_replay: canonical,
  required_event_cut_checks: requiredEvents.map((event) => ({
    event,
    ...baseline.winAvoidingEvent(event),
  })),
  support_lock_after_preparation: {
    prepared_node: preparedNode,
    reachable_state_count: preparationQueue.length,
    later_significant_support_edge_count_in_full_reachable_graph:
      postPreparationSupportEdges.length,
    later_significant_support_edge_count_on_some_winning_path:
      postPreparationWinningSupportEdges.length,
    later_significant_support_edges_on_some_winning_path:
      postPreparationWinningSupportEdges,
    interpretation:
      "C 在保持 A/B 核心关系时被夹住；破坏核心后可以重曝或再操作，但这些分支均不再通向胜利。",
  },
  early_move_a_counterfactual: wrongAResult,
  missed_receiver_window_counterfactual: baseline.shortestEdgeWitness((edge) =>
    edge.events.includes("burn_out:candle#single3"),
  ),
  post_transfer_other_object_counterfactual:
    baseline.shortestPostTransferObjectDetour(),
};

const mutations = mutationArgs.map((arg) => {
  const split = arg.indexOf("=");
  const name = arg.slice(0, split);
  const filePath = arg.slice(split + 1);
  const audit = loadAudit(filePath);
  const analysis = analyzeGraph(audit);
  return {
    id: name,
    candidate_id: candidateId,
    exact_version: exactVersion,
    source_exact_layout_sha256: baselineAudit.level.layout_sha256,
    solve_instance_ref: solveInstanceRef,
    provenance: {
      candidate_id: candidateId,
      exact_version: exactVersion,
      source_exact_layout_sha256: baselineAudit.level.layout_sha256,
      solve_instance_ref: solveInstanceRef,
      counterfactual_layout_sha256: audit.level.layout_sha256,
    },
    source: path.resolve(filePath),
    ...analysis.summary,
    required_event_cut_checks:
      analysis.summary.winning_states > 0
        ? requiredEvents.map((event) => ({
            event,
            ...analysis.winAvoidingEvent(event),
          }))
        : [],
    winning_significant_edge_inventory: analysis.edges
      .filter(
        (edge) =>
          analysis.canReachWin[edge.from] &&
          analysis.canReachWin[edge.to] &&
          significant(edge).length > 0,
      )
      .map((edge) => ({
        edge_id: edge.index,
        from: edge.from,
        to: edge.to,
        input: edge.action,
        events: significant(edge),
      })),
  };
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "baseline_event_queries.json"),
  `${JSON.stringify(baselineQueries, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(outDir, "mutation_graph_summary.json"),
  `${JSON.stringify({
    schema_version: 1,
    candidate_id: candidateId,
    exact_version: exactVersion,
    layout_sha256: baselineAudit.level.layout_sha256,
    solve_instance_ref: solveInstanceRef,
    provenance: {
      candidate_id: candidateId,
      exact_version: exactVersion,
      layout_sha256: baselineAudit.level.layout_sha256,
      solve_instance_ref: solveInstanceRef,
    },
    mutations,
  }, null, 2)}\n`,
);

process.stdout.write(
  `${JSON.stringify(
    {
      baseline: {
        graph: baseline.summary,
        required_event_avoidance_wins: baselineQueries.required_event_cut_checks.filter(
          (check) => check.avoiding_win_exists,
        ).length,
        support_later_event_edges_on_some_winning_path:
          baselineQueries.support_lock_after_preparation
            .later_significant_support_edge_count_on_some_winning_path,
        early_a_endpoint_can_win: wrongAResult.endpoint_can_reach_win,
        missed_window_endpoint_can_win:
          baselineQueries.missed_receiver_window_counterfactual
            ?.endpoint_can_reach_win ?? null,
        post_transfer_detour_endpoint_can_win:
          baselineQueries.post_transfer_other_object_counterfactual
            ?.endpoint_can_reach_win ?? null,
      },
      mutations: mutations.map((mutation) => ({
        id: mutation.id,
        states: mutation.reachable_states,
        edges: mutation.legal_transitions,
        wins: mutation.winning_states,
        exposure: mutation.exposure_verdict,
        forbidden: mutation.forbidden_hit_count,
        shortest_win_depth: mutation.shortest_win?.steps.length ?? null,
      })),
    },
    null,
    2,
  )}\n`,
);
