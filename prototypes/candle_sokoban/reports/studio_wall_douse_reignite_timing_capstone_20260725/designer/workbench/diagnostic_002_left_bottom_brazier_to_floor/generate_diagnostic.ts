import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { loadPrototypePackage } from "../../../../../../../src/core/io.js";
import type { LevelDoc } from "../../../../../../../src/core/types.js";
import {
  auditCandleExposure,
  loadCandleExposureSequence,
  type CandleExposureAuditReport,
} from "../../../../../../../src/prototypes/candle_sokoban/exposureAudit.js";
import {
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type CandleAction,
  type CandleSokobanState,
} from "../../../../../../../src/prototypes/candle_sokoban/mechanics.js";

const repoRoot = path.resolve(".");
const taskRoot = path.resolve(
  "prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725",
);
const outputRoot = path.join(
  taskRoot,
  "designer/workbench/diagnostic_002_left_bottom_brazier_to_floor",
);
const baselineRoot = path.join(taskRoot, "candidate/versions/v3");
const baselineLayoutPath = path.join(baselineRoot, "layout.txt");
const floorLayoutPath = path.join(outputRoot, "layout.txt");
const baselineExposurePath = path.join(baselineRoot, "exposure_audit.json");
const baselineSolutionFamilyPath = path.join(baselineRoot, "solution_family.json");
const baselineSolveInstancePath = path.join(baselineRoot, "solve_instance.yml");
const sequencePath = path.resolve(
  "prototypes/candle_sokoban/docs/mechanic_exposure_sequence.yml",
);

const candidateId = "CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001";
const exactVersionBasis = "v3";
const counterfactualId = "diagnostic_002_left_bottom_brazier_to_floor";
const removedBrazier = { x: 1, y: 6, baselineToken: "1,6:1" } as const;
const actions: CandleAction[] = ["up", "down", "left", "right"];

type RawNode = CandleExposureAuditReport["raw_graph"]["nodes"][number];
type RawEdge = CandleExposureAuditReport["raw_graph"]["edges"][number];

type Flag = { name: string; bit: number; label?: string };
const HISTORY_FLAGS: Flag[] = [
  { name: "target_wall_douse", bit: 1 << 0, label: "wall_douse" },
  { name: "target_static_reignite", bit: 1 << 1, label: "static_reignite" },
  { name: "target_shrink_to_len3_after_reignite", bit: 1 << 2, label: "target_len3" },
  { name: "auxiliary_axis_push", bit: 1 << 3 },
  { name: "upper_brazier_after_auxiliary_push", bit: 1 << 4 },
  { name: "target_shrink_to_len2", bit: 1 << 5, label: "target_len2" },
  { name: "stopper_shrink_to_singleton", bit: 1 << 6 },
  { name: "target_shrink_to_len1", bit: 1 << 7, label: "target_len1_and_gate_open" },
  { name: "final_brazier_after_singleton", bit: 1 << 8, label: "singleton_delivery" },
  { name: "stopper_burn_out_at_final", bit: 1 << 9 },
];
const REQUIRED_HISTORY_MASK = HISTORY_FLAGS.reduce((mask, flag) => mask | flag.bit, 0);

type ProductNode = {
  index: number;
  state: CandleSokobanState;
  baseStateKey: string;
  key: string;
  mask: number;
  order: string[];
  reignitePhase: number | null;
  depth: number;
  representativeInputs: CandleAction[];
  shortestWays: bigint;
  shortestInputs: CandleAction[][];
  winning: boolean;
};

type ProductEdge = {
  index: number;
  from: number;
  to: number;
  action: CandleAction;
  events: string[];
};

type ProductGraph = {
  nodes: ProductNode[];
  edges: ProductEdge[];
  summary: ReturnType<typeof summarizeProductGraph>;
};

const pkg = await loadPrototypePackage(path.resolve("prototypes/candle_sokoban"));
const { sequence, raw: sequenceRaw } = loadCandleExposureSequence(sequencePath);
const baselineLayoutRaw = await readFile(baselineLayoutPath, "utf8");
const floorLayoutRaw = await readFile(floorLayoutPath, "utf8");
const baselineLayout = normalizeLayout(baselineLayoutRaw);
const floorLayout = normalizeLayout(floorLayoutRaw);
validateOnlyRequestedCellChanged(baselineLayout, floorLayout);

const baselineLevel: LevelDoc = {
  id: `${candidateId}_V3_DIAGNOSTIC_BASELINE_RECHECK`,
  title: "v3 诊断基线重算",
  global_burn_cycle: 5,
  layout: baselineLayout,
  win: { type: "all_braziers_lit" },
};
const floorLevel: LevelDoc = {
  id: `${candidateId}_V3_CF_LEFT_BOTTOM_BRAZIER_TO_FLOOR`,
  title: "v3 左下已亮火盆替空地只读诊断",
  global_burn_cycle: 5,
  layout: floorLayout,
  win: { type: "all_braziers_lit" },
};

const existingBaselineExposureRaw = await readFile(baselineExposurePath, "utf8");
const existingBaselineExposure = JSON.parse(
  existingBaselineExposureRaw,
) as CandleExposureAuditReport;
const existingBaselineSolutionRaw = await readFile(baselineSolutionFamilyPath, "utf8");
const existingBaselineSolution = JSON.parse(existingBaselineSolutionRaw) as Record<string, unknown>;

const baselineExposureFresh = auditCandleExposure(
  pkg,
  baselineLevel,
  sequence,
  sequenceRaw,
  {
    allowedExposureThrough: "shared_fire_and_reignition",
    maxStates: 500_000,
  },
);
const floorExposure = auditCandleExposure(pkg, floorLevel, sequence, sequenceRaw, {
  allowedExposureThrough: "shared_fire_and_reignition",
  maxStates: 500_000,
});

assertComplete("v3 existing exposure", existingBaselineExposure);
assertComplete("v3 fresh exposure", baselineExposureFresh);
assertComplete("floor exposure", floorExposure);

const baselineProduct = enumerateProductGraph(baselineLevel);
const floorProduct = enumerateProductGraph(floorLevel);

const solveInstance = YAML.parse(
  await readFile(baselineSolveInstancePath, "utf8"),
) as { canonical_inputs: CandleAction[] };
const canonicalReplay = replayWithTrace(floorLevel, solveInstance.canonical_inputs);
if (!canonicalReplay.completed || !canonicalReplay.final_win) {
  throw new Error("v3 canonical inputs did not remain a legal win on the floor counterfactual");
}

const stateComparison = compareRawGraphs(
  existingBaselineExposure.raw_graph.nodes,
  existingBaselineExposure.raw_graph.edges,
  floorExposure.raw_graph.nodes,
  floorExposure.raw_graph.edges,
);
const productComparison = compareProductGraphs(baselineProduct, floorProduct);
const eventComparison = compareEvents(existingBaselineExposure, floorExposure);
const firstDivergence = findFirstSynchronizedDivergence(
  existingBaselineExposure,
  floorExposure,
  baselineLevel,
  floorLevel,
);
const floorWitnesses = collectFloorWitnesses(floorExposure, floorLevel);
const goalComparison = compareGoalRole(existingBaselineExposure, floorExposure);

const existingBaselineSummary = existingBaselineSolution as {
  graph?: unknown;
  requiredHistory?: unknown;
  winningMilestoneSignatures?: unknown;
  shortestWinningFamily?: unknown;
  timingVariants?: unknown;
  layoutSha256?: unknown;
};
const baselineSummaryValidation = {
  graph_matches_recomputed:
    stableJson(existingBaselineSummary.graph) === stableJson(baselineProduct.summary.graph),
  required_history_matches_recomputed:
    stableJson(existingBaselineSummary.requiredHistory) ===
    stableJson(baselineProduct.summary.requiredHistory),
  milestone_signatures_match_recomputed:
    stableJson(existingBaselineSummary.winningMilestoneSignatures) ===
    stableJson(baselineProduct.summary.winningMilestoneSignatures),
  shortest_family_matches_recomputed:
    stableJson(existingBaselineSummary.shortestWinningFamily) ===
    stableJson(baselineProduct.summary.shortestWinningFamily),
  timing_variants_match_recomputed:
    stableJson(existingBaselineSummary.timingVariants) ===
    stableJson(baselineProduct.summary.timingVariants),
};

const baselineNodeKeysFresh = baselineExposureFresh.raw_graph.nodes.map((node) => node.key);
const baselineNodeKeysExisting = existingBaselineExposure.raw_graph.nodes.map((node) => node.key);
const baselineEdgesFresh = baselineExposureFresh.raw_graph.edges.map(stripEdgeIndex);
const baselineEdgesExisting = existingBaselineExposure.raw_graph.edges.map(stripEdgeIndex);
const inputValidation = {
  schema_version: 1,
  assignment_id: "candle_wall_douse_reignite_timing_diagnostic_002",
  candidate_id: candidateId,
  exact_version_basis: exactVersionBasis,
  inputs: {
    v3_layout: {
      ref: relative(baselineLayoutPath),
      sha256_raw: sha256(baselineLayoutRaw),
      sha256_normalized: sha256(`${baselineLayout}\n`),
    },
    v3_exposure_audit: {
      ref: relative(baselineExposurePath),
      sha256_raw: sha256(existingBaselineExposureRaw),
      parsed_all_nodes: existingBaselineExposure.raw_graph.nodes.length,
      parsed_all_edges: existingBaselineExposure.raw_graph.edges.length,
      node_indexes_sequential: indexesSequential(existingBaselineExposure.raw_graph.nodes),
      edge_indexes_sequential: indexesSequential(existingBaselineExposure.raw_graph.edges),
      node_keys_unique:
        new Set(existingBaselineExposure.raw_graph.nodes.map((node) => node.key)).size ===
        existingBaselineExposure.raw_graph.nodes.length,
      all_edge_endpoints_in_range: existingBaselineExposure.raw_graph.edges.every(
        (edge) =>
          edge.from >= 0 &&
          edge.from < existingBaselineExposure.raw_graph.nodes.length &&
          edge.to >= 0 &&
          edge.to < existingBaselineExposure.raw_graph.nodes.length,
      ),
    },
    v3_solution_family: {
      ref: relative(baselineSolutionFamilyPath),
      sha256_raw: sha256(existingBaselineSolutionRaw),
    },
  },
  runtime_recomputation: {
    fresh_v3_graph_complete: baselineExposureFresh.graph.status === "complete",
    existing_and_fresh_node_keys_identical_in_order:
      stableJson(baselineNodeKeysExisting) === stableJson(baselineNodeKeysFresh),
    existing_and_fresh_edges_identical_in_order:
      stableJson(baselineEdgesExisting) === stableJson(baselineEdgesFresh),
    existing_and_fresh_event_counts_identical:
      stableJson(existingBaselineExposure.reachable_event_counts) ===
      stableJson(baselineExposureFresh.reachable_event_counts),
    solution_family_summary: baselineSummaryValidation,
  },
};

const reachableGraphArtifact = {
  schema_version: 1,
  candidate_id: candidateId,
  exact_version_basis: exactVersionBasis,
  counterfactual_id: counterfactualId,
  layout_ref: relative(floorLayoutPath),
  layout_sha256: sha256(`${floorLayout}\n`),
  graph: floorExposure.graph,
  reachable_event_counts: floorExposure.reachable_event_counts,
  raw_graph: floorExposure.raw_graph,
};

const productGraphArtifact = serializeProductGraph(floorProduct, floorLayout);
const solutionFamilyArtifact = {
  schema_version: 1,
  candidateId,
  exactVersionBasis,
  counterfactualId,
  layoutSha256: sha256(`${floorLayout}\n`),
  scope: "完整可达状态的单调历史产品图；胜利状态终止扩展；诊断反事实不发布 exact",
  ...floorProduct.summary,
  rawProductGraphRef: relative(path.join(outputRoot, "product_graph.json")),
};

const comparison = {
  schema_version: 1,
  assignment_id: "candle_wall_douse_reignite_timing_diagnostic_002",
  candidate_id: candidateId,
  exact_version_basis: exactVersionBasis,
  counterfactual_id: counterfactualId,
  change: {
    coordinate_system: "layout zero-based (x,y)",
    cell: { x: 1, y: 6 },
    baseline: "O",
    counterfactual: ".",
    all_other_cells_identical: true,
    win_condition_identical: true,
    global_burn_cycle_identical: true,
  },
  layout_digests: {
    v3_raw_sha256: sha256(baselineLayoutRaw),
    v3_normalized_sha256: sha256(`${baselineLayout}\n`),
    counterfactual_raw_sha256: sha256(floorLayoutRaw),
    counterfactual_normalized_sha256: sha256(`${floorLayout}\n`),
  },
  state_key_projection: {
    reason:
      "Candle stateKey includes the sorted B: brazier list; deleting (1,6) changes every literal key even when all remaining state components match.",
    baseline_projection:
      "P_B(key): split at final '|B:'; remove the exact brazier token '1,6:1'; preserve player/dead/countdown/candles and every other brazier token byte-for-byte.",
    counterfactual_projection:
      "P_F(key): identity (the counterfactual key already lacks '1,6:1').",
    comparison_unit:
      "projected node key, and deterministic edge tuple (projected from key, action, projected to key, ordered events).",
    no_claim_from_counts_alone: true,
  },
  reachable_graph: stateComparison,
  product_graph: productComparison,
  summary_comparison: {
    v3: {
      reachable: existingBaselineExposure.graph,
      product: baselineProduct.summary,
    },
    floor: {
      reachable: floorExposure.graph,
      product: floorProduct.summary,
    },
  },
  event_comparison: eventComparison,
  removed_coordinate_brazier_role: {
    fixed_lit_in_all_v3_reachable_states: goalComparison.fixed_lit_in_all_v3_reachable_states,
    goal_mapping: goalComparison,
    source_events: eventComparison.removed_coordinate_source_events,
    entity_and_failure_witness: firstDivergence,
    floor_only_occupancy_and_contact_witnesses: floorWitnesses,
  },
};

await mkdir(outputRoot, { recursive: true });
await Promise.all([
  writeJson(path.join(outputRoot, "input_validation.json"), inputValidation),
  writeJson(path.join(outputRoot, "canonical_replay.json"), canonicalReplay),
  writeJson(path.join(outputRoot, "reachable_graph.json"), reachableGraphArtifact),
  writeJson(path.join(outputRoot, "product_graph.json"), productGraphArtifact),
  writeJson(path.join(outputRoot, "solution_family.json"), solutionFamilyArtifact),
  writeJson(path.join(outputRoot, "exposure_audit.json"), floorExposure),
  writeJson(path.join(outputRoot, "comparison.json"), comparison),
]);

process.stdout.write(
  [
    `layout_sha256=${sha256(`${floorLayout}\n`)}`,
    `reachable=${floorExposure.graph.status}:${floorExposure.graph.reachable_state_count}/${floorExposure.graph.legal_transition_count}/${floorExposure.graph.win_state_count}`,
    `product=complete:${floorProduct.summary.graph.productStateCount}/${floorProduct.summary.graph.legalEdgeCount}/${floorProduct.summary.graph.winningProductStateCount}`,
    `shortest=${floorProduct.summary.shortestWinningFamily.cost}`,
    `raw_shortest=${floorProduct.summary.shortestWinningFamily.rawShortestInputCount}`,
    `projected_state_isomorphic=${stateComparison.projected_graph_isomorphic_strict}`,
    `projected_product_isomorphic=${productComparison.projected_graph_isomorphic_strict}`,
    `coordinate_source_events=${eventComparison.removed_coordinate_source_events.v3.total_occurrences}`,
  ].join(" ") + "\n",
);

function enumerateProductGraph(level: LevelDoc): ProductGraph {
  const initial = parseLevel(level);
  const firstStateKey = stateKey(initial);
  const first: ProductNode = {
    index: 0,
    state: initial,
    baseStateKey: firstStateKey,
    key: productKey(firstStateKey, 0, [], null),
    mask: 0,
    order: [],
    reignitePhase: null,
    depth: 0,
    representativeInputs: [],
    shortestWays: 1n,
    shortestInputs: [[]],
    winning: isWin(initial, level.win!),
  };
  const nodes: ProductNode[] = [first];
  const edges: ProductEdge[] = [];
  const byKey = new Map<string, number>([[first.key, 0]]);

  for (let cursor = 0; cursor < nodes.length; cursor += 1) {
    const current = nodes[cursor]!;
    if (current.winning) continue;
    for (const action of actions) {
      const transition = step(pkg.mechanic, current.state, action, {
        winCondition: level.win,
      });
      if (!transition.legal) continue;
      const advanced = advanceHistory(
        current.mask,
        current.order,
        current.reignitePhase,
        current.state.globalBurnCountdown,
        transition.events,
      );
      const nextBaseKey = stateKey(transition.state);
      const nextKey = productKey(
        nextBaseKey,
        advanced.mask,
        advanced.order,
        advanced.reignitePhase,
      );
      let nextIndex = byKey.get(nextKey);
      if (nextIndex === undefined) {
        nextIndex = nodes.length;
        const next: ProductNode = {
          index: nextIndex,
          state: transition.state,
          baseStateKey: nextBaseKey,
          key: nextKey,
          mask: advanced.mask,
          order: advanced.order,
          reignitePhase: advanced.reignitePhase,
          depth: current.depth + 1,
          representativeInputs: [...current.representativeInputs, action],
          shortestWays: current.shortestWays,
          shortestInputs: current.shortestInputs.map((inputs) => [...inputs, action]),
          winning: isWin(transition.state, level.win!),
        };
        nodes.push(next);
        byKey.set(nextKey, nextIndex);
      } else {
        const prior = nodes[nextIndex]!;
        if (prior.depth === current.depth + 1) {
          prior.shortestWays += current.shortestWays;
          prior.shortestInputs = [
            ...prior.shortestInputs,
            ...current.shortestInputs.map((inputs) => [...inputs, action]),
          ].slice(0, 32);
        }
      }
      edges.push({
        index: edges.length,
        from: current.index,
        to: nextIndex,
        action,
        events: transition.events,
      });
    }
  }

  const graph = { nodes, edges, summary: undefined as never };
  return { nodes, edges, summary: summarizeProductGraph(graph) };
}

function summarizeProductGraph(graph: Pick<ProductGraph, "nodes" | "edges">) {
  const wins = graph.nodes.filter((node) => node.winning);
  const baseStates = new Set(graph.nodes.map((node) => node.baseStateKey));
  const requiredFlags = HISTORY_FLAGS.map((flag) => ({
    name: flag.name,
    allWinningTraces: wins.length > 0 && wins.every((win) => (win.mask & flag.bit) !== 0),
    violatingWinningTraceCount: wins.filter((win) => (win.mask & flag.bit) === 0).length,
  }));
  const signatures = new Map<
    string,
    { wins: ProductNode[]; minimumDepth: number; representativeInputs: CandleAction[] }
  >();
  for (const win of wins) {
    const signature = win.order.join(">");
    const prior = signatures.get(signature);
    if (!prior) {
      signatures.set(signature, {
        wins: [win],
        minimumDepth: win.depth,
        representativeInputs: win.representativeInputs,
      });
    } else {
      prior.wins.push(win);
      prior.minimumDepth = Math.min(prior.minimumDepth, win.depth);
    }
  }
  const minWinDepth = wins.length > 0 ? Math.min(...wins.map((win) => win.depth)) : null;
  const shortestWins =
    minWinDepth === null ? [] : wins.filter((win) => win.depth === minWinDepth);
  const phases = new Map<
    string,
    { wins: ProductNode[]; minimumDepth: number; representativeInputs: CandleAction[] }
  >();
  for (const win of wins) {
    const phase = win.reignitePhase === null ? "unknown" : `t${win.reignitePhase}`;
    const prior = phases.get(phase);
    if (!prior) {
      phases.set(phase, {
        wins: [win],
        minimumDepth: win.depth,
        representativeInputs: win.representativeInputs,
      });
    } else {
      prior.wins.push(win);
      prior.minimumDepth = Math.min(prior.minimumDepth, win.depth);
    }
  }
  return {
    graph: {
      status: "complete",
      baseStateCount: baseStates.size,
      productStateCount: graph.nodes.length,
      legalEdgeCount: graph.edges.length,
      winningProductStateCount: wins.length,
    },
    requiredHistory: {
      requiredMask: REQUIRED_HISTORY_MASK,
      everyWinningTraceHasAllRequiredFlags:
        wins.length > 0 &&
        wins.every((win) => (win.mask & REQUIRED_HISTORY_MASK) === REQUIRED_HISTORY_MASK),
      flags: requiredFlags,
    },
    winningMilestoneSignatures: [...signatures.entries()].map(([signature, value]) => ({
      signature,
      winningProductStates: value.wins.length,
      minimumDepth: value.minimumDepth,
      representativeInputs: value.representativeInputs,
    })),
    shortestWinningFamily: {
      cost: minWinDepth,
      productStates: shortestWins.length,
      rawShortestInputCount: shortestWins
        .reduce((sum, win) => sum + win.shortestWays, 0n)
        .toString(),
      rawShortestInputRepresentatives: shortestWins
        .flatMap((win) => win.shortestInputs)
        .slice(0, 32),
      representatives: shortestWins.slice(0, 32).map((win) => ({
        inputs: win.representativeInputs,
        milestoneSignature: win.order.join(">"),
        finalState: renderState(win.state),
      })),
    },
    timingVariants: [...phases.entries()].map(([reigniteCountdownBeforeInput, value]) => ({
      reigniteCountdownBeforeInput,
      winningProductStates: value.wins.length,
      minimumDepth: value.minimumDepth,
      representativeInputs: value.representativeInputs,
    })),
  };
}

function advanceHistory(
  maskBefore: number,
  orderBefore: string[],
  reignitePhaseBefore: number | null,
  countdownBefore: number,
  events: string[],
) {
  let mask = maskBefore;
  const order = [...orderBefore];
  let reignitePhase = reignitePhaseBefore;
  const add = (flag: Flag): void => {
    if ((mask & flag.bit) === 0 && flag.label) order.push(flag.label);
    mask |= flag.bit;
  };
  if (events.includes("extinguish_by_wall:candle#1")) add(HISTORY_FLAGS[0]!);
  if (
    (mask & HISTORY_FLAGS[0]!.bit) !== 0 &&
    events.includes("ignite_from_brazier:candle#1:2,3")
  ) {
    add(HISTORY_FLAGS[1]!);
    reignitePhase ??= countdownBefore;
  }
  if (
    (mask & HISTORY_FLAGS[1]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len3")
  ) add(HISTORY_FLAGS[2]!);
  if (events.includes("push_axis:candle#4")) add(HISTORY_FLAGS[3]!);
  if (
    (mask & HISTORY_FLAGS[3]!.bit) !== 0 &&
    events.includes("light_brazier:12,1")
  ) add(HISTORY_FLAGS[4]!);
  if (
    (mask & HISTORY_FLAGS[2]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len2")
  ) add(HISTORY_FLAGS[5]!);
  if (events.includes("shrink:candle#3:len1")) add(HISTORY_FLAGS[6]!);
  if (
    (mask & HISTORY_FLAGS[5]!.bit) !== 0 &&
    (mask & HISTORY_FLAGS[6]!.bit) !== 0 &&
    events.includes("shrink:candle#1:len1")
  ) add(HISTORY_FLAGS[7]!);
  if (
    (mask & HISTORY_FLAGS[7]!.bit) !== 0 &&
    events.includes("light_brazier:4,5")
  ) add(HISTORY_FLAGS[8]!);
  if (
    (mask & HISTORY_FLAGS[8]!.bit) !== 0 &&
    events.includes("burn_out:candle#3")
  ) add(HISTORY_FLAGS[9]!);
  return { mask, order, reignitePhase };
}

function compareRawGraphs(
  baselineNodes: RawNode[],
  baselineEdges: RawEdge[],
  floorNodes: RawNode[],
  floorEdges: RawEdge[],
) {
  const baselineLiteral = new Set(baselineNodes.map((node) => node.key));
  const floorLiteral = new Set(floorNodes.map((node) => node.key));
  const baselineProjectedKeys = baselineNodes.map((node) => projectBaselineStateKey(node.key));
  const floorProjectedKeys = floorNodes.map((node) => node.key);
  const baselineProjected = new Set(baselineProjectedKeys);
  const floorProjected = new Set(floorProjectedKeys);
  const baselineByIndex = new Map(
    baselineNodes.map((node) => [node.index, projectBaselineStateKey(node.key)]),
  );
  const floorByIndex = new Map(floorNodes.map((node) => [node.index, node.key]));
  const baselineStructuralEdges = new Set(
    baselineEdges.map((edge) =>
      edgeKey(
        baselineByIndex.get(edge.from)!,
        edge.action,
        baselineByIndex.get(edge.to)!,
      ),
    ),
  );
  const floorStructuralEdges = new Set(
    floorEdges.map((edge) =>
      edgeKey(floorByIndex.get(edge.from)!, edge.action, floorByIndex.get(edge.to)!),
    ),
  );
  const baselineStrictEdges = new Set(
    baselineEdges.map((edge) =>
      strictEdgeKey(
        baselineByIndex.get(edge.from)!,
        edge.action,
        baselineByIndex.get(edge.to)!,
        edge.events,
      ),
    ),
  );
  const floorStrictEdges = new Set(
    floorEdges.map((edge) =>
      strictEdgeKey(
        floorByIndex.get(edge.from)!,
        edge.action,
        floorByIndex.get(edge.to)!,
        edge.events,
      ),
    ),
  );
  const nodeDiff = setDiff(baselineProjected, floorProjected);
  const structuralDiff = setDiff(baselineStructuralEdges, floorStructuralEdges);
  const strictDiff = setDiff(baselineStrictEdges, floorStrictEdges);
  const baselineCanReachWin = reverseReachableIndexes(
    baselineNodes.filter((node) => node.winning).map((node) => node.index),
    baselineEdges,
  );
  const floorCanReachWin = reverseReachableIndexes(
    floorNodes.filter((node) => node.winning).map((node) => node.index),
    floorEdges,
  );
  const floorOnlyNodesCanReachWin = floorNodes.filter(
    (node) => !baselineProjected.has(node.key) && floorCanReachWin.has(node.index),
  );
  const floorOnlyStructuralEdgesOnWinningTrace = floorEdges.filter((edge) => {
    const key = edgeKey(
      floorByIndex.get(edge.from)!,
      edge.action,
      floorByIndex.get(edge.to)!,
    );
    return !baselineStructuralEdges.has(key) && floorCanReachWin.has(edge.to);
  });
  const floorOnlyStructuralEdgesFromWinViableSource = floorEdges.filter((edge) => {
    const key = edgeKey(
      floorByIndex.get(edge.from)!,
      edge.action,
      floorByIndex.get(edge.to)!,
    );
    return !baselineStructuralEdges.has(key) && floorCanReachWin.has(edge.from);
  });
  return {
    literal_key_intersection: intersectionSize(baselineLiteral, floorLiteral),
    baseline_projection_injective:
      baselineProjected.size === baselineProjectedKeys.length,
    floor_projection_injective: floorProjected.size === floorProjectedKeys.length,
    projected_nodes: {
      v3: baselineProjected.size,
      floor: floorProjected.size,
      shared: intersectionSize(baselineProjected, floorProjected),
      v3_only: nodeDiff.leftOnly.length,
      floor_only: nodeDiff.rightOnly.length,
      v3_only_samples: nodeDiff.leftOnly.slice(0, 10),
      floor_only_samples: nodeDiff.rightOnly.slice(0, 10),
    },
    projected_structural_edges_without_events: {
      v3: baselineStructuralEdges.size,
      floor: floorStructuralEdges.size,
      shared: intersectionSize(baselineStructuralEdges, floorStructuralEdges),
      v3_only: structuralDiff.leftOnly.length,
      floor_only: structuralDiff.rightOnly.length,
      v3_only_samples: structuralDiff.leftOnly.slice(0, 10),
      floor_only_samples: structuralDiff.rightOnly.slice(0, 10),
    },
    projected_strict_edges_with_ordered_events: {
      v3: baselineStrictEdges.size,
      floor: floorStrictEdges.size,
      shared: intersectionSize(baselineStrictEdges, floorStrictEdges),
      v3_only: strictDiff.leftOnly.length,
      floor_only: strictDiff.rightOnly.length,
      v3_only_samples: strictDiff.leftOnly.slice(0, 10),
      floor_only_samples: strictDiff.rightOnly.slice(0, 10),
    },
    reverse_reachability_to_win: {
      v3_nodes_that_can_reach_win: baselineCanReachWin.size,
      floor_nodes_that_can_reach_win: floorCanReachWin.size,
      floor_only_nodes_that_can_reach_win: floorOnlyNodesCanReachWin.length,
      floor_only_structural_edges_on_a_winning_trace:
        floorOnlyStructuralEdgesOnWinningTrace.length,
      floor_only_structural_edges_from_a_win_viable_source:
        floorOnlyStructuralEdgesFromWinViableSource.length,
      floor_only_winning_trace_node_samples: floorOnlyNodesCanReachWin
        .slice(0, 10)
        .map((node) => node.key),
      floor_only_winning_trace_edge_samples: floorOnlyStructuralEdgesOnWinningTrace
        .slice(0, 10)
        .map((edge) => ({
          index: edge.index,
          from: floorByIndex.get(edge.from),
          action: edge.action,
          to: floorByIndex.get(edge.to),
          events: edge.events,
        })),
    },
    projected_graph_isomorphic_structural:
      nodeDiff.leftOnly.length === 0 &&
      nodeDiff.rightOnly.length === 0 &&
      structuralDiff.leftOnly.length === 0 &&
      structuralDiff.rightOnly.length === 0,
    projected_graph_isomorphic_strict:
      nodeDiff.leftOnly.length === 0 &&
      nodeDiff.rightOnly.length === 0 &&
      strictDiff.leftOnly.length === 0 &&
      strictDiff.rightOnly.length === 0,
  };
}

function compareProductGraphs(baseline: ProductGraph, floor: ProductGraph) {
  const baselineProjectedKeys = baseline.nodes.map((node) =>
    projectedProductKey(node, true),
  );
  const floorProjectedKeys = floor.nodes.map((node) => projectedProductKey(node, false));
  const baselineProjected = new Set(baselineProjectedKeys);
  const floorProjected = new Set(floorProjectedKeys);
  const baselineByIndex = new Map(
    baseline.nodes.map((node) => [node.index, projectedProductKey(node, true)]),
  );
  const floorByIndex = new Map(
    floor.nodes.map((node) => [node.index, projectedProductKey(node, false)]),
  );
  const baselineStructuralEdges = new Set(
    baseline.edges.map((edge) =>
      edgeKey(
        baselineByIndex.get(edge.from)!,
        edge.action,
        baselineByIndex.get(edge.to)!,
      ),
    ),
  );
  const floorStructuralEdges = new Set(
    floor.edges.map((edge) =>
      edgeKey(floorByIndex.get(edge.from)!, edge.action, floorByIndex.get(edge.to)!),
    ),
  );
  const baselineStrictEdges = new Set(
    baseline.edges.map((edge) =>
      strictEdgeKey(
        baselineByIndex.get(edge.from)!,
        edge.action,
        baselineByIndex.get(edge.to)!,
        edge.events,
      ),
    ),
  );
  const floorStrictEdges = new Set(
    floor.edges.map((edge) =>
      strictEdgeKey(
        floorByIndex.get(edge.from)!,
        edge.action,
        floorByIndex.get(edge.to)!,
        edge.events,
      ),
    ),
  );
  const nodeDiff = setDiff(baselineProjected, floorProjected);
  const structuralDiff = setDiff(baselineStructuralEdges, floorStructuralEdges);
  const strictDiff = setDiff(baselineStrictEdges, floorStrictEdges);
  const baselineCanReachWin = reverseReachableIndexes(
    baseline.nodes.filter((node) => node.winning).map((node) => node.index),
    baseline.edges,
  );
  const floorCanReachWin = reverseReachableIndexes(
    floor.nodes.filter((node) => node.winning).map((node) => node.index),
    floor.edges,
  );
  const floorOnlyNodesCanReachWin = floor.nodes.filter(
    (node) =>
      !baselineProjected.has(projectedProductKey(node, false)) &&
      floorCanReachWin.has(node.index),
  );
  const floorOnlyStructuralEdgesOnWinningTrace = floor.edges.filter((edge) => {
    const key = edgeKey(
      floorByIndex.get(edge.from)!,
      edge.action,
      floorByIndex.get(edge.to)!,
    );
    return !baselineStructuralEdges.has(key) && floorCanReachWin.has(edge.to);
  });
  const floorOnlyStructuralEdgesFromWinViableSource = floor.edges.filter((edge) => {
    const key = edgeKey(
      floorByIndex.get(edge.from)!,
      edge.action,
      floorByIndex.get(edge.to)!,
    );
    return !baselineStructuralEdges.has(key) && floorCanReachWin.has(edge.from);
  });
  return {
    baseline_projection_injective:
      baselineProjected.size === baselineProjectedKeys.length,
    floor_projection_injective: floorProjected.size === floorProjectedKeys.length,
    projected_nodes: {
      v3: baselineProjected.size,
      floor: floorProjected.size,
      shared: intersectionSize(baselineProjected, floorProjected),
      v3_only: nodeDiff.leftOnly.length,
      floor_only: nodeDiff.rightOnly.length,
    },
    projected_structural_edges_without_events: {
      v3: baselineStructuralEdges.size,
      floor: floorStructuralEdges.size,
      shared: intersectionSize(baselineStructuralEdges, floorStructuralEdges),
      v3_only: structuralDiff.leftOnly.length,
      floor_only: structuralDiff.rightOnly.length,
    },
    projected_strict_edges_with_ordered_events: {
      v3: baselineStrictEdges.size,
      floor: floorStrictEdges.size,
      shared: intersectionSize(baselineStrictEdges, floorStrictEdges),
      v3_only: strictDiff.leftOnly.length,
      floor_only: strictDiff.rightOnly.length,
    },
    reverse_reachability_to_win: {
      v3_product_nodes_that_can_reach_win: baselineCanReachWin.size,
      floor_product_nodes_that_can_reach_win: floorCanReachWin.size,
      floor_only_product_nodes_that_can_reach_win: floorOnlyNodesCanReachWin.length,
      floor_only_product_edges_on_a_winning_trace:
        floorOnlyStructuralEdgesOnWinningTrace.length,
      floor_only_product_edges_from_a_win_viable_source:
        floorOnlyStructuralEdgesFromWinViableSource.length,
    },
    projected_graph_isomorphic_structural:
      nodeDiff.leftOnly.length === 0 &&
      nodeDiff.rightOnly.length === 0 &&
      structuralDiff.leftOnly.length === 0 &&
      structuralDiff.rightOnly.length === 0,
    projected_graph_isomorphic_strict:
      nodeDiff.leftOnly.length === 0 &&
      nodeDiff.rightOnly.length === 0 &&
      strictDiff.leftOnly.length === 0 &&
      strictDiff.rightOnly.length === 0,
  };
}

function compareEvents(
  baseline: CandleExposureAuditReport,
  floor: CandleExposureAuditReport,
) {
  const baselineExact = eventCounts(baseline.raw_graph.edges);
  const floorExact = eventCounts(floor.raw_graph.edges);
  const baselineTypes = eventTypeCounts(baseline.raw_graph.edges);
  const floorTypes = eventTypeCounts(floor.raw_graph.edges);
  const exactDiff = mapCountDiff(baselineExact, floorExact);
  const typeDiff = mapCountDiff(baselineTypes, floorTypes);
  const baselineCoordinateEvents = coordinateSourceEvents(baseline.raw_graph.edges);
  const floorCoordinateEvents = coordinateSourceEvents(floor.raw_graph.edges);
  return {
    exact_event_payload_sets: {
      v3_size: baselineExact.size,
      floor_size: floorExact.size,
      shared_size: intersectionSize(new Set(baselineExact.keys()), new Set(floorExact.keys())),
      v3_only: exactDiff.leftOnly,
      floor_only: exactDiff.rightOnly,
      changed_counts: exactDiff.changed,
    },
    event_type_sets: {
      v3: Object.fromEntries(baselineTypes),
      floor: Object.fromEntries(floorTypes),
      v3_only: typeDiff.leftOnly,
      floor_only: typeDiff.rightOnly,
      changed_counts: typeDiff.changed,
    },
    removed_coordinate_source_events: {
      matching_rule:
        "exact light_brazier:1,6 or ignite_from_brazier:*:1,6 in every complete reachable edge",
      v3: baselineCoordinateEvents,
      floor: floorCoordinateEvents,
    },
  };
}

function compareGoalRole(
  baseline: CandleExposureAuditReport,
  floor: CandleExposureAuditReport,
) {
  const baselineWins = new Set(
    baseline.raw_graph.nodes
      .filter((node) => node.winning)
      .map((node) => projectBaselineStateKey(node.key)),
  );
  const floorWins = new Set(
    floor.raw_graph.nodes.filter((node) => node.winning).map((node) => node.key),
  );
  const diff = setDiff(baselineWins, floorWins);
  return {
    fixed_lit_in_all_v3_reachable_states: baseline.raw_graph.nodes.every((node) =>
      brazierTokens(node.key).includes(removedBrazier.baselineToken),
    ),
    projected_winning_state_sets_equal:
      diff.leftOnly.length === 0 && diff.rightOnly.length === 0,
    projected_v3_winning_states: baselineWins.size,
    floor_winning_states: floorWins.size,
    v3_only_winning_states: diff.leftOnly.length,
    floor_only_winning_states: diff.rightOnly.length,
    interpretation_boundary:
      "Equality here addresses only the already-satisfied goal atom on shared projected states; it does not erase entity/blocking differences elsewhere in the graph.",
  };
}

function findFirstSynchronizedDivergence(
  baseline: CandleExposureAuditReport,
  floor: CandleExposureAuditReport,
  baselineLevelDoc: LevelDoc,
  floorLevelDoc: LevelDoc,
) {
  const baselineNodeByProjected = new Map(
    baseline.raw_graph.nodes.map((node) => [projectBaselineStateKey(node.key), node]),
  );
  const floorNodeByKey = new Map(floor.raw_graph.nodes.map((node) => [node.key, node]));
  const baselineOutgoing = outgoingByProjectedKey(baseline, true);
  const floorOutgoing = outgoingByProjectedKey(floor, false);
  const initialProjected = projectBaselineStateKey(baseline.raw_graph.nodes[0]!.key);
  if (!floorNodeByKey.has(initialProjected)) {
    throw new Error("Projected initial state does not match floor initial state");
  }
  const queue: Array<{ key: string; inputs: CandleAction[] }> = [
    { key: initialProjected, inputs: [] },
  ];
  const visited = new Set<string>([initialProjected]);

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor]!;
    const baselineActions = baselineOutgoing.get(current.key) ?? new Map();
    const floorActions = floorOutgoing.get(current.key) ?? new Map();
    for (const action of actions) {
      const baselineEdge = baselineActions.get(action);
      const floorEdge = floorActions.get(action);
      const equivalent =
        baselineEdge !== undefined &&
        floorEdge !== undefined &&
        baselineEdge.projectedTo === floorEdge.projectedTo &&
        stableJson(baselineEdge.edge.events) === stableJson(floorEdge.edge.events);
      if (!equivalent && (baselineEdge !== undefined || floorEdge !== undefined)) {
        const beforeBaseline = replayToState(baselineLevelDoc, current.inputs);
        const beforeFloor = replayToState(floorLevelDoc, current.inputs);
        const baselineStep = step(pkg.mechanic, beforeBaseline, action, {
          winCondition: baselineLevelDoc.win,
        });
        const floorStep = step(pkg.mechanic, beforeFloor, action, {
          winCondition: floorLevelDoc.win,
        });
        return {
          common_prefix_inputs: current.inputs,
          divergent_action: action,
          common_projected_state_key: current.key,
          v3_before_layout: renderState(beforeBaseline),
          floor_before_layout: renderState(beforeFloor),
          v3_transition: {
            legal: baselineStep.legal,
            reason: baselineStep.reason ?? null,
            events: baselineStep.events,
            after_key: baselineStep.legal ? stateKey(baselineStep.state) : null,
            after_layout: baselineStep.legal ? renderState(baselineStep.state) : null,
          },
          floor_transition: {
            legal: floorStep.legal,
            reason: floorStep.reason ?? null,
            events: floorStep.events,
            after_key: floorStep.legal ? stateKey(floorStep.state) : null,
            after_layout: floorStep.legal ? renderState(floorStep.state) : null,
          },
          v3_raw_edge: baselineEdge?.edge ?? null,
          floor_raw_edge: floorEdge?.edge ?? null,
        };
      }
    }
    for (const action of actions) {
      const baselineEdge = baselineActions.get(action);
      const floorEdge = floorActions.get(action);
      if (
        !baselineEdge ||
        !floorEdge ||
        baselineEdge.projectedTo !== floorEdge.projectedTo ||
        stableJson(baselineEdge.edge.events) !== stableJson(floorEdge.edge.events) ||
        visited.has(floorEdge.projectedTo)
      ) continue;
      visited.add(floorEdge.projectedTo);
      queue.push({ key: floorEdge.projectedTo, inputs: [...current.inputs, action] });
    }
  }
  return null;
}

function collectFloorWitnesses(report: CandleExposureAuditReport, level: LevelDoc) {
  const playerAtRemovedCellAlive = report.raw_graph.nodes.find(
    (node) => node.key.startsWith("P:1,6|D:0|"),
  );
  const playerAtRemovedCellDead = report.raw_graph.nodes.find(
    (node) => node.key.startsWith("P:1,6|D:1|"),
  );
  const candleAtRemovedCell = report.raw_graph.nodes.find((node) =>
    stateKeyHasCandleBodyCell(node.key, "1,6"),
  );
  const pushFromRemovedCell = report.raw_graph.edges.find((edge) => {
    const from = report.raw_graph.nodes[edge.from]!;
    return (
      from.key.startsWith("P:1,6|D:0|") &&
      edge.events.some((event) => event === "push_axis:candle#3")
    );
  });
  return {
    node_counts: {
      alive_player_on_1_6: report.raw_graph.nodes.filter((node) =>
        node.key.startsWith("P:1,6|D:0|"),
      ).length,
      dead_player_on_1_6: report.raw_graph.nodes.filter((node) =>
        node.key.startsWith("P:1,6|D:1|"),
      ).length,
      candle_body_on_1_6: report.raw_graph.nodes.filter((node) =>
        stateKeyHasCandleBodyCell(node.key, "1,6"),
      ).length,
    },
    shortest_alive_player_entry: witnessForNode(report, level, playerAtRemovedCellAlive),
    shortest_dead_player_entry: witnessForNode(report, level, playerAtRemovedCellDead),
    shortest_candle_body_entry: witnessForNode(report, level, candleAtRemovedCell),
    push_candle3_from_1_6: witnessForEdge(report, level, pushFromRemovedCell),
  };
}

function witnessForNode(
  report: CandleExposureAuditReport,
  level: LevelDoc,
  node: RawNode | undefined,
) {
  if (!node) return null;
  const inputs = pathInputsToNode(report, node.index);
  const state = replayToState(level, inputs);
  return { node_index: node.index, depth: node.depth, inputs, key: node.key, layout: renderState(state) };
}

function witnessForEdge(
  report: CandleExposureAuditReport,
  level: LevelDoc,
  edge: RawEdge | undefined,
) {
  if (!edge) return null;
  const prefix = pathInputsToNode(report, edge.from);
  const before = replayToState(level, prefix);
  const result = step(pkg.mechanic, before, edge.action as CandleAction, {
    winCondition: level.win,
  });
  return {
    edge_index: edge.index,
    prefix_inputs: prefix,
    action: edge.action,
    events: edge.events,
    before_layout: renderState(before),
    after_layout: result.legal ? renderState(result.state) : null,
  };
}

function pathInputsToNode(report: CandleExposureAuditReport, target: number): CandleAction[] {
  if (target === 0) return [];
  const parents = new Map<number, RawEdge>();
  for (const edge of report.raw_graph.edges) {
    const fromDepth = report.raw_graph.nodes[edge.from]!.depth;
    const toDepth = report.raw_graph.nodes[edge.to]!.depth;
    if (toDepth === fromDepth + 1 && !parents.has(edge.to)) parents.set(edge.to, edge);
  }
  const reversed: CandleAction[] = [];
  let current = target;
  while (current !== 0) {
    const edge = parents.get(current);
    if (!edge) throw new Error(`No shortest parent for node ${current}`);
    reversed.push(edge.action as CandleAction);
    current = edge.from;
  }
  return reversed.reverse();
}

function outgoingByProjectedKey(report: CandleExposureAuditReport, baseline: boolean) {
  const byIndex = new Map(
    report.raw_graph.nodes.map((node) => [
      node.index,
      baseline ? projectBaselineStateKey(node.key) : node.key,
    ]),
  );
  const result = new Map<
    string,
    Map<CandleAction, { edge: RawEdge; projectedTo: string }>
  >();
  for (const edge of report.raw_graph.edges) {
    const from = byIndex.get(edge.from)!;
    const outgoing = result.get(from) ?? new Map();
    outgoing.set(edge.action as CandleAction, {
      edge,
      projectedTo: byIndex.get(edge.to)!,
    });
    result.set(from, outgoing);
  }
  return result;
}

function replayWithTrace(level: LevelDoc, inputs: CandleAction[]) {
  let current = parseLevel(level);
  const trace = [];
  let completed = true;
  for (const [index, action] of inputs.entries()) {
    const before = current;
    const result = step(pkg.mechanic, current, action, { winCondition: level.win });
    trace.push({
      step: index + 1,
      action,
      legal: result.legal,
      reason: result.reason ?? null,
      before_key: stateKey(before),
      before_layout: renderState(before),
      events: result.events,
      after_key: result.legal ? stateKey(result.state) : stateKey(before),
      after_layout: result.legal ? renderState(result.state) : renderState(before),
      win: result.legal ? isWin(result.state, level.win!) : isWin(before, level.win!),
    });
    if (!result.legal) {
      completed = false;
      break;
    }
    current = result.state;
  }
  return {
    schema_version: 1,
    candidate_id: candidateId,
    exact_version_basis: exactVersionBasis,
    counterfactual_id: counterfactualId,
    inputs,
    completed,
    final_win: isWin(current, level.win!),
    final_key: stateKey(current),
    final_layout: renderState(current),
    trace,
  };
}

function replayToState(level: LevelDoc, inputs: CandleAction[]): CandleSokobanState {
  let current = parseLevel(level);
  for (const action of inputs) {
    const result = step(pkg.mechanic, current, action, { winCondition: level.win });
    if (!result.legal) throw new Error(`Illegal witness prefix action '${action}'`);
    current = result.state;
  }
  return current;
}

function serializeProductGraph(graph: ProductGraph, layout: string) {
  return {
    schema_version: 1,
    candidate_id: candidateId,
    exact_version_basis: exactVersionBasis,
    counterfactual_id: counterfactualId,
    layout_ref: relative(floorLayoutPath),
    layout_sha256: sha256(`${layout}\n`),
    scope: "完整单调历史产品图；胜利状态终止扩展",
    summary: graph.summary,
    raw_product_graph: {
      nodes: graph.nodes.map((node) => ({
        index: node.index,
        key: node.key,
        base_state_key: node.baseStateKey,
        history_mask: node.mask,
        milestone_order: node.order,
        reignite_countdown_before_input: node.reignitePhase,
        depth: node.depth,
        winning: node.winning,
        representative_inputs: node.representativeInputs,
        shortest_input_count_to_node: node.shortestWays.toString(),
      })),
      edges: graph.edges,
    },
  };
}

function projectBaselineStateKey(key: string): string {
  const marker = "|B:";
  const markerIndex = key.lastIndexOf(marker);
  if (markerIndex < 0) throw new Error(`State key lacks B segment: ${key}`);
  const prefix = key.slice(0, markerIndex);
  const tokens = key
    .slice(markerIndex + marker.length)
    .split(";")
    .filter((token) => token.length > 0);
  const matches = tokens.filter((token) => token === removedBrazier.baselineToken).length;
  if (matches !== 1) {
    throw new Error(`Expected exactly one ${removedBrazier.baselineToken} token in v3 key`);
  }
  return `${prefix}${marker}${tokens
    .filter((token) => token !== removedBrazier.baselineToken)
    .join(";")}`;
}

function projectedProductKey(node: ProductNode, baseline: boolean): string {
  return productKey(
    baseline ? projectBaselineStateKey(node.baseStateKey) : node.baseStateKey,
    node.mask,
    node.order,
    node.reignitePhase,
  );
}

function productKey(
  baseStateKey: string,
  mask: number,
  order: string[],
  reignitePhase: number | null,
): string {
  return `${baseStateKey}||M:${mask}||O:${order.join(">")}|RP:${reignitePhase ?? "none"}`;
}

function coordinateSourceEvents(edges: RawEdge[]) {
  const matches: Array<{ edge_index: number; event: string }> = [];
  for (const edge of edges) {
    for (const event of edge.events) {
      if (
        event === "light_brazier:1,6" ||
        (event.startsWith("ignite_from_brazier:") && event.endsWith(":1,6"))
      ) matches.push({ edge_index: edge.index, event });
    }
  }
  const counts = new Map<string, number>();
  for (const match of matches) counts.set(match.event, (counts.get(match.event) ?? 0) + 1);
  return {
    total_occurrences: matches.length,
    exact_event_counts: Object.fromEntries([...counts.entries()].sort()),
    edge_samples: matches.slice(0, 20),
  };
}

function eventCounts(edges: RawEdge[]): Map<string, number> {
  const result = new Map<string, number>();
  for (const edge of edges) {
    for (const event of edge.events) result.set(event, (result.get(event) ?? 0) + 1);
  }
  return new Map([...result.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function eventTypeCounts(edges: RawEdge[]): Map<string, number> {
  const result = new Map<string, number>();
  for (const edge of edges) {
    for (const event of edge.events) {
      const type = event.split(":", 1)[0]!;
      result.set(type, (result.get(type) ?? 0) + 1);
    }
  }
  return new Map([...result.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function mapCountDiff(left: Map<string, number>, right: Map<string, number>) {
  const leftOnly: Record<string, number> = {};
  const rightOnly: Record<string, number> = {};
  const changed: Record<string, { v3: number; floor: number }> = {};
  for (const [key, count] of left) {
    if (!right.has(key)) leftOnly[key] = count;
    else if (right.get(key) !== count) changed[key] = { v3: count, floor: right.get(key)! };
  }
  for (const [key, count] of right) if (!left.has(key)) rightOnly[key] = count;
  return { leftOnly, rightOnly, changed };
}

function setDiff(left: Set<string>, right: Set<string>) {
  return {
    leftOnly: [...left].filter((value) => !right.has(value)),
    rightOnly: [...right].filter((value) => !left.has(value)),
  };
}

function intersectionSize(left: Set<string>, right: Set<string>): number {
  let count = 0;
  for (const value of left) if (right.has(value)) count += 1;
  return count;
}

function reverseReachableIndexes(
  winIndexes: number[],
  edges: Array<{ from: number; to: number }>,
): Set<number> {
  const incoming = new Map<number, number[]>();
  for (const edge of edges) {
    const sources = incoming.get(edge.to) ?? [];
    sources.push(edge.from);
    incoming.set(edge.to, sources);
  }
  const reached = new Set<number>(winIndexes);
  const queue = [...winIndexes];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const source of incoming.get(queue[cursor]!) ?? []) {
      if (reached.has(source)) continue;
      reached.add(source);
      queue.push(source);
    }
  }
  return reached;
}

function edgeKey(from: string, action: string, to: string): string {
  return `${from}\u0000${action}\u0000${to}`;
}

function strictEdgeKey(from: string, action: string, to: string, events: string[]): string {
  return `${edgeKey(from, action, to)}\u0000${stableJson(events)}`;
}

function brazierTokens(key: string): string[] {
  const markerIndex = key.lastIndexOf("|B:");
  if (markerIndex < 0) return [];
  return key
    .slice(markerIndex + 3)
    .split(";")
    .filter(Boolean);
}

function stateKeyHasCandleBodyCell(key: string, cell: string): boolean {
  const match = key.match(/\|C:(.*)\|B:/);
  if (!match) return false;
  return match[1]!
    .split("|")
    .some((entry) => entry.split(":").at(-1)?.split(";").includes(cell));
}

function indexesSequential(entries: Array<{ index: number }>): boolean {
  return entries.every((entry, index) => entry.index === index);
}

function stripEdgeIndex(edge: RawEdge) {
  return { from: edge.from, to: edge.to, action: edge.action, events: edge.events };
}

function assertComplete(label: string, report: CandleExposureAuditReport): void {
  if (report.graph.status !== "complete") {
    throw new Error(`${label} is not complete: ${report.graph.status}`);
  }
}

function validateOnlyRequestedCellChanged(baseline: string, floor: string): void {
  const before = baseline.split("\n");
  const after = floor.split("\n");
  if (before.length !== after.length || before.some((row, y) => row.length !== after[y]?.length)) {
    throw new Error("Counterfactual dimensions differ from v3");
  }
  const changes: Array<{ x: number; y: number; before: string; after: string }> = [];
  for (let y = 0; y < before.length; y += 1) {
    for (let x = 0; x < before[y]!.length; x += 1) {
      if (before[y]![x] !== after[y]![x]) {
        changes.push({ x, y, before: before[y]![x]!, after: after[y]![x]! });
      }
    }
  }
  if (
    changes.length !== 1 ||
    changes[0]!.x !== 1 ||
    changes[0]!.y !== 6 ||
    changes[0]!.before !== "O" ||
    changes[0]!.after !== "."
  ) throw new Error(`Unexpected layout changes: ${JSON.stringify(changes)}`);
}

function normalizeLayout(value: string): string {
  return value.replace(/\r/g, "").trimEnd();
}

function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

function relative(value: string): string {
  return path.relative(repoRoot, value).replace(/\\/g, "/");
}

async function writeJson(outputPath: string, value: unknown): Promise<void> {
  await writeFile(outputPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
