import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  forceModeAt,
  isWin,
  parseLevel,
  stateKey,
  step,
  type RealityAnchorState,
} from "../../../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const INPUTS = ["up", "right", "down", "left"] as const;
type Input = (typeof INPUTS)[number];

const MAX_STATES = 300_000;
const diagnosticsDir = dirname(fileURLToPath(import.meta.url));
const versionDir = resolve(diagnosticsDir, "..");
const layoutPath = resolve(versionDir, "layout.txt");
const canonicalPath = resolve(versionDir, "canonical_replay.json");

const mechanic = {
  inputs: {
    up: { intent: "move", dir: "up" },
    right: { intent: "move", dir: "right" },
    down: { intent: "move", dir: "down" },
    left: { intent: "move", dir: "left" },
  },
} as unknown as Parameters<typeof step>[0];

type GraphEdge = {
  from: string;
  to: string;
  input: Input;
  modeBefore: "push" | "pull";
  events: string[];
};

type Graph = {
  initial: RealityAnchorState;
  initialKey: string;
  states: Map<string, RealityAnchorState>;
  edges: GraphEdge[];
  outgoing: Map<string, GraphEdge[]>;
  winningKeys: string[];
};

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function stickyPose(state: RealityAnchorState): string {
  return state.stickyGroups
    .flat()
    .map((point) => ({ x: point.x, y: point.y }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((point) => `${point.x},${point.y}`)
    .join(";");
}

function stickyCells(state: RealityAnchorState): number[][] {
  return state.stickyGroups
    .flat()
    .map((point) => ({ x: point.x, y: point.y }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((point) => [point.x, point.y]);
}

function buildGraph(layout: string): Graph {
  const initial = parseLevel({ id: "baseline_001_v1", title: "baseline_001 v1", layout });
  const initialKey = stateKey(initial);
  const states = new Map<string, RealityAnchorState>([[initialKey, initial]]);
  const outgoing = new Map<string, GraphEdge[]>();
  const edges: GraphEdge[] = [];
  const queue = [initialKey];

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    const state = states.get(from)!;
    if (isWin(state)) {
      outgoing.set(from, []);
      continue;
    }

    const stateEdges: GraphEdge[] = [];
    for (const input of INPUTS) {
      const result = step(mechanic, state, input);
      if (!result.legal) {
        continue;
      }
      const to = stateKey(result.state);
      const edge: GraphEdge = {
        from,
        to,
        input,
        modeBefore: forceModeAt(state, state.player),
        events: result.events,
      };
      edges.push(edge);
      stateEdges.push(edge);
      if (!states.has(to)) {
        if (states.size >= MAX_STATES) {
          throw new Error(`graph exceeded max_states=${MAX_STATES}`);
        }
        states.set(to, result.state);
        queue.push(to);
      }
    }
    outgoing.set(from, stateEdges);
  }

  const winningKeys = [...states.entries()]
    .filter(([, state]) => isWin(state))
    .map(([key]) => key)
    .sort();
  return { initial, initialKey, states, edges, outgoing, winningKeys };
}

function shortestAudit(graph: Graph) {
  const distance = new Map<string, number>([[graph.initialKey, 0]]);
  const pathCount = new Map<string, number>([[graph.initialKey, 1]]);
  const predecessors = new Map<string, Array<{ from: string; input: Input }>>();
  const queue = [graph.initialKey];

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    const nextDistance = distance.get(from)! + 1;
    for (const edge of graph.outgoing.get(from) ?? []) {
      const known = distance.get(edge.to);
      if (known === undefined) {
        distance.set(edge.to, nextDistance);
        pathCount.set(edge.to, pathCount.get(from)!);
        predecessors.set(edge.to, [{ from, input: edge.input }]);
        queue.push(edge.to);
      } else if (known === nextDistance) {
        pathCount.set(edge.to, pathCount.get(edge.to)! + pathCount.get(from)!);
        predecessors.get(edge.to)!.push({ from, input: edge.input });
      }
    }
  }

  const winDistance = Math.min(...graph.winningKeys.map((key) => distance.get(key) ?? Infinity));
  const shortestWinningKeys = graph.winningKeys.filter((key) => distance.get(key) === winDistance);
  const rawShortestPathCount = shortestWinningKeys.reduce(
    (sum, key) => sum + (pathCount.get(key) ?? 0),
    0,
  );
  const paths: Input[][] = [];
  const reconstruct = (key: string, suffix: Input[]): void => {
    if (paths.length >= 1_000) {
      return;
    }
    if (key === graph.initialKey) {
      paths.push([...suffix].reverse());
      return;
    }
    for (const predecessor of predecessors.get(key) ?? []) {
      reconstruct(predecessor.from, [...suffix, predecessor.input]);
    }
  };
  for (const key of shortestWinningKeys) {
    reconstruct(key, []);
  }

  const rawPaths = paths.map((inputs) => {
    let state = graph.initial;
    const objectSignature: string[] = [];
    for (const input of inputs) {
      const result = step(mechanic, state, input);
      if (!result.legal) {
        throw new Error("shortest-path reconstruction produced an illegal input");
      }
      const force = result.events.find((event) => /^(push|pull)_object:/.test(event));
      if (force) {
        objectSignature.push(`${force.startsWith("push_") ? "push" : "pull"}:${input}`);
      }
      state = result.state;
    }
    return { inputs, object_signature: objectSignature, final_state_key: stateKey(state) };
  });
  const signatureSet = [...new Set(rawPaths.map((path) => path.object_signature.join("|")))];

  return {
    cost: winDistance,
    raw_shortest_path_count: rawShortestPathCount,
    enumerated_raw_shortest_paths: rawPaths,
    enumeration_complete: rawShortestPathCount === rawPaths.length,
    object_signature_count: signatureSet.length,
    object_signatures: signatureSet.map((signature) => signature.split("|").filter(Boolean)),
  };
}

function firstEntryAudit(graph: Graph, targetPose: string) {
  const visited = new Set<string>();
  const queue: string[] = [];
  if (stickyPose(graph.initial) !== targetPose) {
    visited.add(graph.initialKey);
    queue.push(graph.initialKey);
  }
  const frontier: GraphEdge[] = [];
  const winWithoutPose: string[] = [];

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    const state = graph.states.get(from)!;
    if (isWin(state)) {
      winWithoutPose.push(from);
      continue;
    }
    for (const edge of graph.outgoing.get(from) ?? []) {
      const toState = graph.states.get(edge.to)!;
      if (stickyPose(toState) === targetPose) {
        if (stickyPose(state) !== targetPose) {
          frontier.push(edge);
        }
        continue;
      }
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        queue.push(edge.to);
      }
    }
  }

  const rawFrontier = frontier.map((edge) => ({
    from_state_key: edge.from,
    to_state_key: edge.to,
    source_pose: stickyPose(graph.states.get(edge.from)!),
    target_pose: targetPose,
    input: edge.input,
    mode_before: edge.modeBefore,
    events: edge.events,
  }));
  const classes = [
    ...new Map(
      rawFrontier.map((entry) => [
        [entry.source_pose, entry.mode_before, entry.input].join("|"),
        {
          source_pose: entry.source_pose,
          mode_before: entry.mode_before,
          direction: entry.input,
          raw_frontier_edge_count: 0,
        },
      ]),
    ).values(),
  ];
  for (const entry of rawFrontier) {
    const item = classes.find(
      (candidate) =>
        candidate.source_pose === entry.source_pose &&
        candidate.mode_before === entry.mode_before &&
        candidate.direction === entry.input,
    )!;
    item.raw_frontier_edge_count += 1;
  }

  return {
    target_pose: targetPose,
    avoiding_search_reachable_states: visited.size,
    win_without_pose_state_keys: winWithoutPose.sort(),
    dominates_every_terminal_win_path: winWithoutPose.length === 0,
    first_entry_classes: classes,
    first_entry_class_count: classes.length,
    raw_first_entry_edges: rawFrontier,
  };
}

function reverseWinningCorridor(graph: Graph): Set<string> {
  const incoming = new Map<string, string[]>();
  for (const edge of graph.edges) {
    const list = incoming.get(edge.to) ?? [];
    list.push(edge.from);
    incoming.set(edge.to, list);
  }
  const corridor = new Set(graph.winningKeys);
  const queue = [...graph.winningKeys];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const from of incoming.get(queue[cursor]!) ?? []) {
      if (!corridor.has(from)) {
        corridor.add(from);
        queue.push(from);
      }
    }
  }
  return corridor;
}

function stronglyConnectedComponents(graph: Graph) {
  let nextIndex = 0;
  const indices = new Map<string, number>();
  const low = new Map<string, number>();
  const stack: string[] = [];
  const onStack = new Set<string>();
  const components: string[][] = [];

  const visit = (key: string): void => {
    indices.set(key, nextIndex);
    low.set(key, nextIndex);
    nextIndex += 1;
    stack.push(key);
    onStack.add(key);
    for (const edge of graph.outgoing.get(key) ?? []) {
      if (!indices.has(edge.to)) {
        visit(edge.to);
        low.set(key, Math.min(low.get(key)!, low.get(edge.to)!));
      } else if (onStack.has(edge.to)) {
        low.set(key, Math.min(low.get(key)!, indices.get(edge.to)!));
      }
    }
    if (low.get(key) === indices.get(key)) {
      const component: string[] = [];
      while (stack.length > 0) {
        const member = stack.pop()!;
        onStack.delete(member);
        component.push(member);
        if (member === key) {
          break;
        }
      }
      components.push(component.sort());
    }
  };
  for (const key of graph.states.keys()) {
    if (!indices.has(key)) {
      visit(key);
    }
  }
  const initialComponent = components.find((component) => component.includes(graph.initialKey))!;
  return {
    component_count: components.length,
    cyclic_component_count: components.filter((component) => component.length > 1).length,
    largest_component_size: Math.max(...components.map((component) => component.length)),
    initial_component_size: initialComponent.length,
    component_sizes_descending: components.map((component) => component.length).sort((a, b) => b - a),
  };
}

function traceInputs(layout: string, inputs: Input[]) {
  let state = parseLevel({ id: "baseline_001_v1", title: "baseline_001 v1", layout });
  const initialKey = stateKey(state);
  const trace = inputs.map((input, index) => {
    const before = state;
    const result = step(mechanic, before, input);
    if (result.legal) {
      state = result.state;
    }
    return {
      step: index + 1,
      input,
      legal: result.legal,
      ...(result.reason ? { reason: result.reason } : {}),
      mode_before: forceModeAt(before, before.player),
      events: result.events,
      state_key: stateKey(state),
      player: { x: state.player.x, y: state.player.y },
      sticky_cells: stickyCells(state),
      win: isWin(state),
    };
  });
  return { initial_state_key: initialKey, trace, final_state: state, final_state_key: stateKey(state) };
}

function canonicalVerification(layout: string, layoutHash: string) {
  const expected = JSON.parse(readFileSync(canonicalPath, "utf8")) as {
    candidate_id: string;
    exact_version: string;
    initial_state_key: string;
    inputs: Input[];
    object_signature: string[];
    trace: Array<{
      step: number;
      input: string;
      mode_before: string;
      events: string[];
      player: { x: number; y: number };
      sticky_cells: number[][];
      win: boolean;
    }>;
    final_state_key: string;
    final_win: boolean;
  };
  const observed = traceInputs(layout, expected.inputs);
  const stepComparisons = observed.trace.map((entry, index) => {
    const claimed = expected.trace[index];
    const fields = {
      step: claimed?.step === entry.step,
      input: claimed?.input === entry.input,
      mode_before: claimed?.mode_before === entry.mode_before,
      events: JSON.stringify(claimed?.events) === JSON.stringify(entry.events),
      player: JSON.stringify(claimed?.player) === JSON.stringify(entry.player),
      sticky_cells: JSON.stringify(claimed?.sticky_cells) === JSON.stringify(entry.sticky_cells),
      win: claimed?.win === entry.win,
    };
    return { step: entry.step, all_fields_match: Object.values(fields).every(Boolean), fields };
  });
  const objectSignature = observed.trace.flatMap((entry) => {
    const event = entry.events.find((value) => /^(push|pull)_object:/.test(value));
    return event ? [`${event.startsWith("push_") ? "push" : "pull"}:${entry.input}`] : [];
  });
  const allStepsLegal = observed.trace.every((entry) => entry.legal);
  const checks = {
    initial_state_key_matches: observed.initial_state_key === expected.initial_state_key,
    trace_length_matches: observed.trace.length === expected.trace.length,
    every_step_matches_claimed_record: stepComparisons.every((entry) => entry.all_fields_match),
    all_steps_legal: allStepsLegal,
    object_signature_matches: JSON.stringify(objectSignature) === JSON.stringify(expected.object_signature),
    final_state_key_matches: observed.final_state_key === expected.final_state_key,
    final_win_matches: isWin(observed.final_state) === expected.final_win,
  };
  return {
    schema_version: 1,
    audit_id: "RA_BASELINE_001_V1_CANONICAL_REPLAY_VERIFICATION",
    candidate_id: expected.candidate_id,
    exact_version: expected.exact_version,
    layout_sha256: layoutHash,
    source_replay_ref: "../canonical_replay.json",
    runtime_semantics: "current src/prototypes/reality_anchor/mechanics.ts",
    inputs: expected.inputs,
    observed_initial_state_key: observed.initial_state_key,
    observed_trace: observed.trace,
    observed_object_signature: objectSignature,
    observed_final_state_key: observed.final_state_key,
    observed_final_win: isWin(observed.final_state),
    step_comparisons: stepComparisons,
    claim_checks: checks,
    reproduction_status: Object.values(checks).every(Boolean) ? "pass" : "fail",
  };
}

function overrunReturnAudit(layout: string, layoutHash: string) {
  const canonical = JSON.parse(readFileSync(canonicalPath, "utf8")) as { inputs: Input[] };
  const prefixInputs = canonical.inputs.slice(0, 9);
  const prefix = traceInputs(layout, prefixInputs);
  const overrunInput: Input = "right";
  const returnInputs: Input[] = [
    "up",
    "left",
    "left",
    "left",
    "down",
    "left",
    "up",
    "right",
    "right",
    "right",
    "down",
  ];
  let state = prefix.final_state;
  const rawSteps = [overrunInput, ...returnInputs].map((input, index) => {
    const before = state;
    const result = step(mechanic, before, input);
    if (result.legal) {
      state = result.state;
    }
    return {
      step: index + 1,
      phase: index === 0 ? "overrun" : "return",
      input,
      legal: result.legal,
      ...(result.reason ? { reason: result.reason } : {}),
      mode_before: forceModeAt(before, before.player),
      events: result.events,
      state_key: stateKey(state),
      player: { x: state.player.x, y: state.player.y },
      sticky_cells: stickyCells(state),
      win: isWin(state),
    };
  });
  const checks = {
    canonical_prefix_all_legal: prefix.trace.every((entry) => entry.legal),
    prefix_is_correct_column_pose: stickyPose(prefix.final_state) === "9,4;10,4;9,5",
    overrun_is_pull_right: rawSteps[0]?.mode_before === "pull" &&
      rawSteps[0]?.input === "right" &&
      rawSteps[0]?.events.some((event) => event.startsWith("pull_object:")) === true,
    all_overrun_return_steps_legal: rawSteps.every((entry) => entry.legal),
    final_exact_state_equals_pre_overrun_state: stateKey(state) === prefix.final_state_key,
  };
  return {
    schema_version: 1,
    audit_id: "RA_BASELINE_001_V1_OVERRUN_RETURN_REPLAY",
    candidate_id: "RA_DIFFICULTY_BASELINE_L_KEYHOLE_V1",
    exact_version: "v1",
    layout_sha256: layoutHash,
    canonical_prefix_inputs: prefixInputs,
    pre_overrun_state_key: prefix.final_state_key,
    pre_overrun_player: prefix.final_state.player,
    pre_overrun_sticky_pose: stickyPose(prefix.final_state),
    overrun_input: overrunInput,
    return_inputs: returnInputs,
    raw_steps: rawSteps,
    final_state_key: stateKey(state),
    claim_checks: checks,
    reproduction_status: Object.values(checks).every(Boolean) ? "pass" : "fail",
  };
}

function completeGraphAudit(layout: string, layoutHash: string) {
  const graph = buildGraph(layout);
  const shortest = shortestAudit(graph);
  const milestones = [
    { pose: "7,4;8,4;7,5", source: "6,4;7,4;6,5", mode: "push", direction: "right" },
    { pose: "8,4;9,4;8,5", source: "7,4;8,4;7,5", mode: "pull", direction: "right" },
    { pose: "9,4;10,4;9,5", source: "8,4;9,4;8,5", mode: "pull", direction: "right" },
    { pose: "9,5;10,5;9,6", source: "9,4;10,4;9,5", mode: "pull", direction: "down" },
  ] as const;
  const milestoneAudits = milestones.map((milestone) => {
    const audit = firstEntryAudit(graph, milestone.pose);
    const entry = audit.first_entry_classes[0];
    return {
      ...audit,
      expected_first_entry: {
        source_pose: milestone.source,
        mode_before: milestone.mode,
        direction: milestone.direction,
      },
      expected_first_entry_matches:
        audit.first_entry_class_count === 1 &&
        entry?.source_pose === milestone.source &&
        entry?.mode_before === milestone.mode &&
        entry?.direction === milestone.direction,
    };
  });
  const winningCorridor = reverseWinningCorridor(graph);
  const winningEntries = graph.edges
    .filter((edge) => graph.winningKeys.includes(edge.to))
    .map((edge) => ({
      from_state_key: edge.from,
      from_sticky_pose: stickyPose(graph.states.get(edge.from)!),
      to_state_key: edge.to,
      to_sticky_pose: stickyPose(graph.states.get(edge.to)!),
      input: edge.input,
      mode_before: edge.modeBefore,
      events: edge.events,
    }));
  const checks = {
    graph_complete_within_budget: graph.states.size < MAX_STATES,
    reachable_states_is_227: graph.states.size === 227,
    legal_transitions_is_610: graph.edges.length === 610,
    exactly_one_terminal_winning_state: graph.winningKeys.length === 1,
    shortest_cost_is_16: shortest.cost === 16,
    raw_shortest_path_count_is_2: shortest.raw_shortest_path_count === 2,
    shortest_object_signature_is_unique:
      shortest.object_signature_count === 1 &&
      JSON.stringify(shortest.object_signatures[0]) ===
        JSON.stringify(["push:right", "pull:right", "pull:right", "pull:down"]),
    all_four_poses_dominate_every_win:
      milestoneAudits.length === 4 &&
      milestoneAudits.every((audit) => audit.dominates_every_terminal_win_path),
    all_four_first_entries_match_claim:
      milestoneAudits.length === 4 && milestoneAudits.every((audit) => audit.expected_first_entry_matches),
    final_win_entry_is_unique:
      winningEntries.length === 1 &&
      winningEntries[0]?.from_sticky_pose === "9,4;10,4;9,5" &&
      winningEntries[0]?.to_sticky_pose === "9,5;10,5;9,6" &&
      winningEntries[0]?.mode_before === "pull" &&
      winningEntries[0]?.input === "down",
  };
  return {
    schema_version: 1,
    audit_id: "RA_BASELINE_001_V1_COMPLETE_GRAPH_AUDIT",
    candidate_id: "RA_DIFFICULTY_BASELINE_L_KEYHOLE_V1",
    node_id: "baseline_001",
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
      reachable_states: graph.states.size,
      legal_transitions: graph.edges.length,
      winning_states: graph.winningKeys.length,
      initial_state_key: graph.initialKey,
      all_terminal_winning_state_keys: graph.winningKeys,
      states_that_can_reach_a_terminal_win: winningCorridor.size,
      legal_transitions_within_winning_corridor: graph.edges.filter(
        (edge) => winningCorridor.has(edge.from) && winningCorridor.has(edge.to),
      ).length,
      scc: stronglyConnectedComponents(graph),
    },
    shortest_family: shortest,
    all_win_family_audit: {
      family_equivalence_relation:
        "忽略纯走位次序与可逆回返环；以所有胜路首次进入四个必经 sticky 位姿时的 source pose、force mode 与 direction 作为对象因果族。",
      terminal_winning_entries: winningEntries,
      milestone_first_entry_audits: milestoneAudits,
      logical_object_family_count: milestoneAudits.every(
        (audit) => audit.dominates_every_terminal_win_path && audit.expected_first_entry_matches,
      )
        ? 1
        : "not_supported",
      evidence_boundary:
        "状态图完整枚举终止于首次胜态；非最短 raw 路径可含任意可逆环，故不声称有限枚举所有 raw 输入串。",
    },
    claim_checks: checks,
    reproduction_status: Object.values(checks).every(Boolean) ? "pass" : "fail",
  };
}

const layout = readFileSync(layoutPath, "utf8");
const layoutHash = sha256(layout);
const graphReport = completeGraphAudit(layout, layoutHash);
const canonicalReport = canonicalVerification(layout, layoutHash);
const overrunReport = overrunReturnAudit(layout, layoutHash);
const combinedPass = [graphReport, canonicalReport, overrunReport].every(
  (report) => report.reproduction_status === "pass",
);

if (process.argv.includes("--write")) {
  writeFileSync(resolve(diagnosticsDir, "complete_graph_audit.json"), `${JSON.stringify(graphReport, null, 2)}\n`);
  writeFileSync(
    resolve(diagnosticsDir, "canonical_replay_verification.json"),
    `${JSON.stringify(canonicalReport, null, 2)}\n`,
  );
  writeFileSync(
    resolve(diagnosticsDir, "overrun_return_replay.json"),
    `${JSON.stringify(overrunReport, null, 2)}\n`,
  );
  console.log(JSON.stringify({ reproduction_status: combinedPass ? "pass" : "fail" }, null, 2));
} else {
  console.log(
    JSON.stringify(
      {
        reproduction_status: combinedPass ? "pass" : "fail",
        complete_graph_audit: graphReport,
        canonical_replay_verification: canonicalReport,
        overrun_return_replay: overrunReport,
      },
      null,
      2,
    ),
  );
}

if (!combinedPass) {
  process.exitCode = 1;
}
