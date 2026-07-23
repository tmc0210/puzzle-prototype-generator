import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  forceModeAt,
  isWin,
  parseLevel,
  renderState,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const INPUTS = ["up", "right", "down", "left"] as const;
type Input = (typeof INPUTS)[number];

const MAX_STATES = 500_000;
const diagnosticsDir = dirname(fileURLToPath(import.meta.url));
const versionDir = resolve(diagnosticsDir, "..");
const layoutPath = resolve(versionDir, "layout.txt");
const layoutRef =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/" +
  "difficulty_revision_001/nodes/construct_prefix_001/versions/v1/layout.txt";
const candidateId = "RA_DIFFICULTY_CONSTRUCT_PREFIX_UPPER_L_V1";

const mechanic = {
  inputs: {
    up: { intent: "move", dir: "up" },
    right: { intent: "move", dir: "right" },
    down: { intent: "move", dir: "down" },
    left: { intent: "move", dir: "left" },
  },
} as unknown as Parameters<typeof step>[0];

const canonicalInputs: Input[] = [
  "down", "down", "down", "left", "down", "right", "right", "right", "right",
  "right", "up", "up", "up", "right", "right", "right", "down", "down", "right",
  "right", "down", "down", "down", "left", "left", "up", "down",
];

const lowerBandProbeInputs: Input[] = [
  "right", "right", "right", "down", "right", "down", "down",
  "up", "left", "left", "left", "left", "left", "up", "up", "right",
  "down", "down", "down", "down", "left", "down",
  "right", "right", "right", "right", "right",
  "up", "up", "right", "right", "right", "down", "right",
];

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function stickyCells(state: RealityAnchorState): number[][] {
  return state.stickyGroups
    .flat()
    .map(({ x, y }) => [x, y])
    .sort((a, b) => a[1]! - b[1]! || a[0]! - b[0]!);
}

function crateCells(state: RealityAnchorState): number[][] {
  return state.crates
    .map(({ x, y }) => [x, y])
    .sort((a, b) => a[1]! - b[1]! || a[0]! - b[0]!);
}

function stickyPose(state: RealityAnchorState): string {
  return stickyCells(state).map(([x, y]) => `${x},${y}`).join(";");
}

function snapshot(state: RealityAnchorState) {
  return {
    key: stateKey(state),
    render: renderState(state),
    isWin: isWin(state),
    player: { x: state.player.x, y: state.player.y },
    crates: crateCells(state),
    stickyCells: stickyCells(state),
  };
}

function objectAction(input: Input, events: string[]): string | undefined {
  const force = events.find((event) => /^(push|pull)_object:/.test(event));
  if (!force) return undefined;
  return `${force.startsWith("push_") ? "push" : "pull"}:${input}`;
}

function replay(layout: string, inputs: Input[], stopOnIllegal = true) {
  let state = parseLevel({ id: candidateId, title: candidateId, layout });
  const initial = snapshot(state);
  const steps: Array<Record<string, unknown>> = [];
  const signature: string[] = [];
  let legalThroughStep = 0;
  for (let index = 0; index < inputs.length; index += 1) {
    const input = inputs[index]!;
    const before = snapshot(state);
    const modeBefore = forceModeAt(state, state.player);
    const result = step(mechanic, state, input);
    const afterState = result.legal ? result.state : state;
    const after = snapshot(afterState);
    const action = objectAction(input, result.events);
    if (action) signature.push(action);
    steps.push({
      step: index + 1,
      action: input,
      input,
      legal: result.legal,
      reason: result.reason ?? null,
      modeBefore,
      events: result.events,
      eventWin: isWin(afterState),
      before,
      after,
    });
    if (!result.legal) {
      if (stopOnIllegal) break;
      continue;
    }
    legalThroughStep = index + 1;
    state = result.state;
  }
  return {
    initial,
    steps,
    objectSignature: signature,
    legalThroughStep,
    completed: legalThroughStep === inputs.length,
    final: snapshot(state),
    finalState: state,
  };
}

type Edge = {
  from: number;
  to: number;
  input: Input;
  mode: "push" | "pull";
  events: string[];
};

function buildGraph(layout: string) {
  const initial = parseLevel({ id: candidateId, title: candidateId, layout });
  const initialKey = stateKey(initial);
  const states: RealityAnchorState[] = [initial];
  const keys = new Map<string, number>([[initialKey, 0]]);
  const outgoing: Edge[][] = [[]];
  const incoming: Edge[][] = [[]];
  const distance: number[] = [0];
  const shortestPathCount: bigint[] = [1n];

  for (let cursor = 0; cursor < states.length; cursor += 1) {
    const state = states[cursor]!;
    if (isWin(state)) continue;
    for (const input of INPUTS) {
      const result = step(mechanic, state, input);
      if (!result.legal) continue;
      const key = stateKey(result.state);
      let to = keys.get(key);
      if (to === undefined) {
        if (states.length >= MAX_STATES) {
          throw new Error(`graph exceeded max_states=${MAX_STATES}`);
        }
        to = states.length;
        keys.set(key, to);
        states.push(result.state);
        outgoing.push([]);
        incoming.push([]);
        distance.push(distance[cursor]! + 1);
        shortestPathCount.push(shortestPathCount[cursor]!);
      } else if (distance[to] === distance[cursor]! + 1) {
        shortestPathCount[to] = shortestPathCount[to]! + shortestPathCount[cursor]!;
      }
      const edge: Edge = {
        from: cursor,
        to,
        input,
        mode: forceModeAt(state, state.player),
        events: result.events,
      };
      outgoing[cursor]!.push(edge);
      incoming[to]!.push(edge);
    }
  }

  const winning = states.map((state, index) => isWin(state) ? index : -1).filter((index) => index >= 0);
  const canReachWin = new Uint8Array(states.length);
  const reverseQueue = [...winning];
  for (const index of winning) canReachWin[index] = 1;
  for (let cursor = 0; cursor < reverseQueue.length; cursor += 1) {
    const to = reverseQueue[cursor]!;
    for (const edge of incoming[to]!) {
      if (canReachWin[edge.from]) continue;
      canReachWin[edge.from] = 1;
      reverseQueue.push(edge.from);
    }
  }

  return { initial, initialKey, states, keys, outgoing, incoming, distance, shortestPathCount, winning, canReachWin };
}

function avoidsPoseAndWins(
  graph: ReturnType<typeof buildGraph>,
  targetPose: string,
): boolean {
  if (stickyPose(graph.initial) === targetPose) return false;
  const visited = new Uint8Array(graph.states.length);
  const queue = [0];
  visited[0] = 1;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    if (isWin(graph.states[from]!)) return true;
    for (const edge of graph.outgoing[from]!) {
      if (visited[edge.to]) continue;
      if (stickyPose(graph.states[edge.to]!) === targetPose) continue;
      visited[edge.to] = 1;
      queue.push(edge.to);
    }
  }
  return false;
}

function shortestPaths(graph: ReturnType<typeof buildGraph>, cap = 2000) {
  const best = Math.min(...graph.winning.map((index) => graph.distance[index]!));
  const shortestWins = graph.winning.filter((index) => graph.distance[index] === best);
  const rawCount = shortestWins.reduce((sum, index) => sum + graph.shortestPathCount[index]!, 0n);
  const paths: Input[][] = [];
  const visit = (index: number, reversed: Input[]) => {
    if (paths.length >= cap) return;
    if (index === 0) {
      paths.push([...reversed].reverse());
      return;
    }
    for (const edge of graph.incoming[index]!) {
      if (graph.distance[edge.from]! + 1 !== graph.distance[index]!) continue;
      visit(edge.from, [...reversed, edge.input]);
    }
  };
  for (const index of shortestWins) visit(index, []);
  const variants = paths.map((inputs) => {
    const result = replay(layout, inputs);
    return {
      inputs,
      object_signature: result.objectSignature,
      final_state_key: result.final.key,
    };
  });
  const signatures = [...new Set(variants.map((variant) => variant.object_signature.join("|")))];
  return {
    cost: best,
    raw_shortest_path_count: rawCount.toString(),
    enumerated_raw_shortest_paths: variants,
    enumeration_complete: BigInt(paths.length) === rawCount,
    object_signature_count: signatures.length,
    object_signatures: signatures.map((signature) => signature.split("|").filter(Boolean)),
  };
}

function milestoneAudit(graph: ReturnType<typeof buildGraph>, pose: string, role: string) {
  const classes = new Map<string, { source_pose: string; mode_before: string; direction: string; count: number }>();
  for (let to = 0; to < graph.states.length; to += 1) {
    if (!graph.canReachWin[to] || stickyPose(graph.states[to]!) !== pose) continue;
    for (const edge of graph.incoming[to]!) {
      if (!graph.canReachWin[edge.from]) continue;
      const sourcePose = stickyPose(graph.states[edge.from]!);
      if (sourcePose === pose) continue;
      const key = `${sourcePose}|${edge.mode}|${edge.input}`;
      const item = classes.get(key) ?? {
        source_pose: sourcePose,
        mode_before: edge.mode,
        direction: edge.input,
        count: 0,
      };
      item.count += 1;
      classes.set(key, item);
    }
  }
  return {
    pose,
    role,
    dominates_every_terminal_win_path: !avoidsPoseAndWins(graph, pose),
    winning_corridor_first_entry_classes: [...classes.values()].sort((a, b) =>
      `${a.source_pose}|${a.mode_before}|${a.direction}`.localeCompare(
        `${b.source_pose}|${b.mode_before}|${b.direction}`,
      ),
    ),
  };
}

const layout = readFileSync(layoutPath, "utf8");
const layoutHash = sha256(layout);
const canonical = replay(layout, canonicalInputs);

const canonicalReplay = {
  prototype_id: "reality_anchor",
  node_id: "construct_prefix_001",
  candidate_id: candidateId,
  exact_version: "v1",
  layout_ref: layoutRef,
  initial_state_key: canonical.initial.key,
  inputs: canonicalInputs,
  object_signature: canonical.objectSignature,
  trace: canonical.steps.map((entry) => {
    const item = entry as any;
    return {
      step: item.step,
      input: item.input,
      mode_before: item.modeBefore,
      events: item.events,
      player: item.after.player,
      crates: item.after.crates,
      sticky_cells: item.after.stickyCells,
      win: item.after.isWin,
    };
  }),
  final_state_key: canonical.final.key,
  final_win: canonical.final.isWin,
};

const canonicalVerification = {
  schema_version: 1,
  audit_id: "RA_CONSTRUCT_PREFIX_001_V1_CANONICAL_REPLAY_VERIFICATION",
  candidate_id: candidateId,
  exact_version: "v1",
  layout_sha256: layoutHash,
  source_replay_ref: "../canonical_replay.json",
  runtime_semantics: "current src/prototypes/reality_anchor/mechanics.ts",
  inputs: canonicalInputs,
  observed_initial_state_key: canonical.initial.key,
  observed_trace: canonicalReplay.trace,
  observed_object_signature: canonical.objectSignature,
  observed_final_state_key: canonical.final.key,
  observed_final_win: canonical.final.isWin,
  claim_checks: {
    all_steps_legal: canonical.completed,
    box_to_sticky_observed: canonical.steps.some((entry: any) => entry.events.includes("box_to_sticky:n1")),
    sticky_merge_observed: canonical.steps.some((entry: any) => entry.events.includes("sticky_merge:n1")),
    post_merge_parent_actions_retained:
      canonical.objectSignature.slice(-4).join("|") === "push:right|pull:right|pull:right|pull:down",
    final_win: canonical.final.isWin,
  },
  reproduction_status: canonical.completed && canonical.final.isWin ? "pass" : "fail",
};

const reviewActual = {
  schema_version: "review_actual_replay_v1",
  assignment_id: "RA_DESIGNER_CONSTRUCT_PREFIX_001",
  id: `${candidateId}_v1_review_actual`,
  prototype: "reality_anchor",
  node_id: "construct_prefix_001",
  candidate_id: candidateId,
  exact_version: "v1",
  source_refs: {
    layout: layoutRef,
    canonical: layoutRef.replace("layout.txt", "canonical_replay.json"),
    runtime_verification: layoutRef.replace("layout.txt", "diagnostics/canonical_replay_verification.json"),
  },
  layoutSource: layoutRef,
  layout_sha256: layoutHash,
  layout,
  winCondition: { type: "all_targets_covered_by_objects", target: "goal" },
  inputs: canonicalInputs,
  legal_through_step: canonical.legalThroughStep,
  final_win: canonical.final.isWin,
  replay: {
    completed: canonical.completed,
    executedSteps: canonical.steps.length,
    legalThroughStep: canonical.legalThroughStep,
  },
  initial: canonical.initial,
  steps: canonical.steps,
  final: canonical.final,
  observed_object_signature: canonical.objectSignature,
  reproduction_status: canonical.completed && canonical.final.isWin ? "pass" : "fail",
};

console.log("building complete graph...");
const graph = buildGraph(layout);
const shortest = shortestPaths(graph);
const milestones = [
  ["7,5;8,5;7,6", "正确上带三格 L 的构造完成位姿"],
  ["8,5;9,5;8,6", "从 P 侧推出并落入 L 侧后的位姿"],
  ["9,5;10,5;9,6", "第一次外侧 pull:right 后位姿"],
  ["10,5;11,5;10,6", "低阶格对准双墙齿缺口的位姿"],
  ["10,6;11,6;10,7", "唯一胜利对象位姿"],
].map(([pose, role]) => milestoneAudit(graph, pose!, role!));

const lowerProbe = replay(layout, lowerBandProbeInputs);
const lowerProbeIndex = graph.keys.get(lowerProbe.final.key);
const lowerMergeStep = lowerProbe.steps.find((entry: any) => entry.events.includes("sticky_merge:n1")) as any;
const lowerBandAudit = {
  schema_version: 1,
  audit_id: "RA_CONSTRUCT_PREFIX_001_V1_LOWER_BAND_COUNTERFACTUAL",
  candidate_id: candidateId,
  layout_sha256: layoutHash,
  inputs: lowerBandProbeInputs,
  completed: lowerProbe.completed,
  legal_through_step: lowerProbe.legalThroughStep,
  stopped_step: lowerProbe.steps.length,
  stop_reason: (lowerProbe.steps.at(-1) as any)?.reason,
  lower_merge_step: lowerMergeStep?.step,
  lower_merge_state_key: lowerMergeStep?.after.key,
  lower_merge_pose: lowerMergeStep ? lowerMergeStep.after.stickyCells.map(([x, y]: number[]) => `${x},${y}`).join(";") : null,
  terminal_probe_state_key: lowerProbe.final.key,
  terminal_probe_pose: stickyPose(lowerProbe.finalState),
  terminal_probe_can_reach_win: lowerProbeIndex === undefined ? null : Boolean(graph.canReachWin[lowerProbeIndex]),
  trace: lowerProbe.steps,
  claim_checks: {
    lower_band_merge_was_legal: Boolean(lowerMergeStep),
    lower_band_crossed_pl_before_rejection:
      stickyPose(lowerProbe.finalState) === "8,6;9,6;8,7",
    rejection_is_wall_mouth_force_blocked: (lowerProbe.steps.at(-1) as any)?.reason === "force_blocked",
    rejected_state_cannot_reach_win: lowerProbeIndex !== undefined && !graph.canReachWin[lowerProbeIndex],
  },
};

const graphAudit = {
  schema_version: 1,
  audit_id: "RA_CONSTRUCT_PREFIX_001_V1_COMPLETE_GRAPH_AUDIT",
  candidate_id: candidateId,
  node_id: "construct_prefix_001",
  exact_version: "v1",
  layout_ref: "../layout.txt",
  layout_sha256: layoutHash,
  runtime_semantics: "current src/prototypes/reality_anchor/mechanics.ts",
  solve_instance: {
    win_condition: "all_targets_covered_by_objects",
    inputs: INPUTS,
    input_cost: 1,
    terminal_win_expansion: "disabled",
  },
  budget: { max_states: MAX_STATES, graph_max_states: MAX_STATES },
  graph: {
    status: "complete",
    reachable_states: graph.states.length,
    legal_transitions: graph.outgoing.reduce((sum, edges) => sum + edges.length, 0),
    winning_states: graph.winning.length,
    initial_state_key: graph.initialKey,
    terminal_winning_state_keys: graph.winning.map((index) => stateKey(graph.states[index]!)),
    states_that_can_reach_a_terminal_win: graph.canReachWin.reduce((sum, flag) => sum + flag, 0),
  },
  shortest_family: shortest,
  all_win_milestones: milestones,
  lower_band_counterfactual_ref: "lower_band_counterfactual.json",
  claim_checks: {
    graph_complete_within_budget: graph.states.length < MAX_STATES,
    exactly_one_terminal_winning_state: graph.winning.length === 1,
    shortest_cost_is_27: shortest.cost === 27,
    shortest_object_signature_is_unique: shortest.object_signature_count === 1,
    all_five_poses_dominate_every_win: milestones.every((item) => item.dominates_every_terminal_win_path),
    lower_band_rejected_state_cannot_reach_win: lowerBandAudit.claim_checks.rejected_state_cannot_reach_win,
  },
};

const allPass = [
  canonicalVerification.reproduction_status === "pass",
  reviewActual.reproduction_status === "pass",
  ...Object.values(graphAudit.claim_checks),
  ...Object.values(lowerBandAudit.claim_checks),
].every(Boolean);
(graphAudit as any).reproduction_status = allPass ? "pass" : "fail";
(lowerBandAudit as any).reproduction_status = Object.values(lowerBandAudit.claim_checks).every(Boolean)
  ? "pass"
  : "fail";

if (process.argv.includes("--write")) {
  writeFileSync(resolve(versionDir, "canonical_replay.json"), `${JSON.stringify(canonicalReplay, null, 2)}\n`);
  writeFileSync(resolve(versionDir, "review_actual_replay.json"), `${JSON.stringify(reviewActual, null, 2)}\n`);
  writeFileSync(resolve(diagnosticsDir, "canonical_replay_verification.json"), `${JSON.stringify(canonicalVerification, null, 2)}\n`);
  writeFileSync(resolve(diagnosticsDir, "complete_graph_audit.json"), `${JSON.stringify(graphAudit, null, 2)}\n`);
  writeFileSync(resolve(diagnosticsDir, "lower_band_counterfactual.json"), `${JSON.stringify(lowerBandAudit, null, 2)}\n`);
}

console.log(JSON.stringify({
  reproduction_status: allPass ? "pass" : "fail",
  graph: graphAudit.graph,
  shortest: {
    cost: shortest.cost,
    raw_shortest_path_count: shortest.raw_shortest_path_count,
    enumeration_complete: shortest.enumeration_complete,
    object_signature_count: shortest.object_signature_count,
  },
  milestone_dominance: milestones.map((item) => ({ pose: item.pose, dominates: item.dominates_every_terminal_win_path })),
  lower_band: lowerBandAudit.claim_checks,
}, null, 2));

if (!allPass) process.exitCode = 1;
