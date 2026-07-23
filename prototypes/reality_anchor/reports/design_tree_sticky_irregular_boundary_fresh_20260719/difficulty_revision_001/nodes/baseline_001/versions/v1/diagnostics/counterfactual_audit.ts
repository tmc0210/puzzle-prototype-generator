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
const baselinePath = resolve(versionDir, "layout.txt");

const mechanic = {
  inputs: {
    up: { intent: "move", dir: "up" },
    right: { intent: "move", dir: "right" },
    down: { intent: "move", dir: "down" },
    left: { intent: "move", dir: "left" },
  },
} as unknown as Parameters<typeof step>[0];

type Edge = { from: string; to: string; input: Input; events: string[] };
type CaseSpec = {
  id: string;
  file: string;
  expectedDiffs: Array<{ x: number; y: number; before: string; after: string }>;
  expectedCost: number;
  expectedSignature: string[];
};

const cases: CaseSpec[] = [
  {
    id: "remove_pl",
    file: "counterfactual_remove_pl.txt",
    expectedDiffs: [
      { x: 5, y: 1, before: "P", after: "#" },
      { x: 6, y: 1, before: "L", after: "#" },
    ],
    expectedCost: 7,
    expectedSignature: ["push:right", "push:right", "push:right", "push:down"],
  },
  {
    id: "remove_left_tooth",
    file: "counterfactual_remove_left_tooth.txt",
    expectedDiffs: [{ x: 8, y: 6, before: "#", after: "." }],
    expectedCost: 10,
    expectedSignature: ["push:right", "pull:down", "pull:right", "pull:right"],
  },
  {
    id: "remove_right_tooth",
    file: "counterfactual_remove_right_tooth.txt",
    expectedDiffs: [{ x: 10, y: 6, before: "#", after: "." }],
    expectedCost: 12,
    expectedSignature: ["push:right", "pull:right", "pull:right", "pull:down"],
  },
  {
    id: "remove_lower_toe",
    file: "counterfactual_remove_lower_toe.txt",
    expectedDiffs: [
      { x: 6, y: 5, before: "M", after: "." },
      { x: 9, y: 6, before: "G", after: "." },
    ],
    expectedCost: 11,
    expectedSignature: ["pull:right", "pull:right", "pull:right", "pull:down"],
  },
];

function sha256(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function lines(layout: string): string[] {
  return layout.replace(/\r/g, "").trimEnd().split("\n");
}

function diffLayouts(baseline: string, counterfactual: string) {
  const beforeRows = lines(baseline);
  const afterRows = lines(counterfactual);
  const height = Math.max(beforeRows.length, afterRows.length);
  const width = Math.max(
    ...beforeRows.map((row) => row.length),
    ...afterRows.map((row) => row.length),
  );
  const diffs: Array<{ x: number; y: number; before: string; after: string }> = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const before = beforeRows[y]?.[x] ?? " ";
      const after = afterRows[y]?.[x] ?? " ";
      if (before !== after) {
        diffs.push({ x, y, before, after });
      }
    }
  }
  return diffs;
}

function stickyPose(state: RealityAnchorState): string {
  return state.stickyGroups
    .flat()
    .map((point) => ({ x: point.x, y: point.y }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((point) => `${point.x},${point.y}`)
    .join(";");
}

function buildGraph(id: string, layout: string) {
  const initial = parseLevel({ id, title: id, layout });
  const initialKey = stateKey(initial);
  const states = new Map<string, RealityAnchorState>([[initialKey, initial]]);
  const outgoing = new Map<string, Edge[]>();
  const edges: Edge[] = [];
  const queue = [initialKey];

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    const state = states.get(from)!;
    if (isWin(state)) {
      outgoing.set(from, []);
      continue;
    }
    const stateEdges: Edge[] = [];
    for (const input of INPUTS) {
      const result = step(mechanic, state, input);
      if (!result.legal) {
        continue;
      }
      const to = stateKey(result.state);
      const edge = { from, to, input, events: result.events };
      edges.push(edge);
      stateEdges.push(edge);
      if (!states.has(to)) {
        if (states.size >= MAX_STATES) {
          throw new Error(`${id} exceeded max_states=${MAX_STATES}`);
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
  return { initial, initialKey, states, outgoing, edges, winningKeys };
}

function shortestFamily(graph: ReturnType<typeof buildGraph>) {
  const distance = new Map<string, number>([[graph.initialKey, 0]]);
  const count = new Map<string, number>([[graph.initialKey, 1]]);
  const predecessors = new Map<string, Array<{ from: string; input: Input }>>();
  const queue = [graph.initialKey];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const from = queue[cursor]!;
    const nextDistance = distance.get(from)! + 1;
    for (const edge of graph.outgoing.get(from) ?? []) {
      const known = distance.get(edge.to);
      if (known === undefined) {
        distance.set(edge.to, nextDistance);
        count.set(edge.to, count.get(from)!);
        predecessors.set(edge.to, [{ from, input: edge.input }]);
        queue.push(edge.to);
      } else if (known === nextDistance) {
        count.set(edge.to, count.get(edge.to)! + count.get(from)!);
        predecessors.get(edge.to)!.push({ from, input: edge.input });
      }
    }
  }
  const cost = Math.min(...graph.winningKeys.map((key) => distance.get(key) ?? Infinity));
  const shortestWins = graph.winningKeys.filter((key) => distance.get(key) === cost);
  const rawCount = shortestWins.reduce((sum, key) => sum + (count.get(key) ?? 0), 0);
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
  for (const key of shortestWins) {
    reconstruct(key, []);
  }
  return { cost, rawCount, paths, enumerationComplete: rawCount === paths.length };
}

function replay(initial: RealityAnchorState, inputs: Input[]) {
  let state = initial;
  const objectSignature: string[] = [];
  const rawSteps = inputs.map((input, index) => {
    const before = state;
    const result = step(mechanic, before, input);
    if (result.legal) {
      state = result.state;
    }
    const forceEvent = result.events.find((event) => /^(push|pull)_object:/.test(event));
    if (forceEvent) {
      objectSignature.push(`${forceEvent.startsWith("push_") ? "push" : "pull"}:${input}`);
    }
    const delta = {
      up: { x: 0, y: -1 },
      right: { x: 1, y: 0 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
    }[input];
    const modeBefore = forceModeAt(before, before.player);
    const forceTargetCell = forceEvent
      ? modeBefore === "push"
        ? { x: before.player.x + delta.x, y: before.player.y + delta.y }
        : { x: before.player.x - delta.x, y: before.player.y - delta.y }
      : null;
    return {
      step: index + 1,
      input,
      legal: result.legal,
      ...(result.reason ? { reason: result.reason } : {}),
      mode_before: modeBefore,
      events: result.events,
      force_target_cell: forceTargetCell,
      before_state_key: stateKey(before),
      after_state_key: stateKey(state),
      before_player: { x: before.player.x, y: before.player.y },
      after_player: { x: state.player.x, y: state.player.y },
      before_sticky_pose: stickyPose(before),
      after_sticky_pose: stickyPose(state),
      win: isWin(state),
    };
  });
  return {
    inputs,
    all_steps_legal: rawSteps.every((entry) => entry.legal),
    raw_steps: rawSteps,
    object_signature: objectSignature,
    final_state_key: stateKey(state),
    final_win: isWin(state),
  };
}

function auditCase(spec: CaseSpec, baseline: string) {
  const layout = readFileSync(resolve(diagnosticsDir, spec.file), "utf8");
  const diffs = diffLayouts(baseline, layout);
  const graph = buildGraph(spec.id, layout);
  const shortest = shortestFamily(graph);
  const witnesses = shortest.paths.map((inputs) => replay(graph.initial, inputs));
  const signatures = [
    ...new Map(witnesses.map((witness) => [witness.object_signature.join("|"), witness.object_signature])).values(),
  ];
  const primaryWitness = witnesses[0];
  const finalObjectStep = primaryWitness?.raw_steps.filter((entry) =>
    entry.events.some((event) => /^(push|pull)_object:/.test(event)),
  ).at(-1);
  const claimChecks = {
    mutation_matches_declared_cells: JSON.stringify(diffs) === JSON.stringify(spec.expectedDiffs),
    graph_complete_within_budget: graph.states.size < MAX_STATES,
    at_least_one_terminal_win: graph.winningKeys.length > 0,
    shortest_path_enumeration_complete: shortest.enumerationComplete,
    every_shortest_witness_legal_and_winning: witnesses.every(
      (witness) => witness.all_steps_legal && witness.final_win,
    ),
    expected_shortest_cost_matches: shortest.cost === spec.expectedCost,
    expected_object_signature_is_only_shortest_signature:
      signatures.length === 1 && JSON.stringify(signatures[0]) === JSON.stringify(spec.expectedSignature),
  };
  return {
    counterfactual_id: spec.id,
    layout_ref: spec.file,
    layout_sha256: sha256(layout),
    exact_cell_mutations_from_baseline: diffs,
    parsed_initial_state: {
      state_key: graph.initialKey,
      sticky_pose: stickyPose(graph.initial),
      sticky_cell_count: graph.initial.stickyGroups.flat().length,
      push_pull_anchor_present: graph.initial.pushPullAnchor !== undefined,
      goal_cells: [...graph.initial.goals].sort(),
    },
    graph: {
      status: "complete",
      reachable_states: graph.states.size,
      legal_transitions: graph.edges.length,
      winning_states: graph.winningKeys.length,
      all_terminal_winning_state_keys: graph.winningKeys,
      terminal_win_expansion: "disabled",
    },
    shortest_family: {
      cost: shortest.cost,
      raw_shortest_path_count: shortest.rawCount,
      raw_path_enumeration_complete: shortest.enumerationComplete,
      raw_shortest_witnesses: witnesses,
      distinct_shortest_object_signatures: signatures,
      terminal_object_action_context: finalObjectStep ?? null,
    },
    expected_mechanical_change: {
      expected_cost: spec.expectedCost,
      expected_object_signature: spec.expectedSignature,
    },
    claim_checks: claimChecks,
    reproduction_status: Object.values(claimChecks).every(Boolean) ? "pass" : "fail",
  };
}

const baseline = readFileSync(baselinePath, "utf8");
const results = cases.map((spec) => auditCase(spec, baseline));
const byId = Object.fromEntries(results.map((result) => [result.counterfactual_id, result]));
const rightToothTerminalActions =
  byId.remove_right_tooth?.shortest_family.raw_shortest_witnesses.map((witness) =>
    witness.raw_steps.filter((entry) => entry.force_target_cell !== null).at(-1),
  ) ?? [];
const crossChecks = {
  remove_pl_eliminates_fixed_mode_boundary:
    byId.remove_pl?.parsed_initial_state.push_pull_anchor_present === false,
  remove_pl_changes_mixed_mode_solution_to_all_push:
    JSON.stringify(byId.remove_pl?.shortest_family.distinct_shortest_object_signatures[0]) ===
    JSON.stringify(["push:right", "push:right", "push:right", "push:down"]),
  left_tooth_removal_allows_down_before_horizontal_pull_chain:
    JSON.stringify(byId.remove_left_tooth?.shortest_family.distinct_shortest_object_signatures[0]) ===
    JSON.stringify(["push:right", "pull:down", "pull:right", "pull:right"]),
  right_tooth_removal_allows_direct_upper_limb_pull_down_instead_of_lower_toe_handle:
    byId.remove_right_tooth?.shortest_family.cost === 12 &&
    JSON.stringify(byId.remove_right_tooth?.shortest_family.distinct_shortest_object_signatures[0]) ===
      JSON.stringify(["push:right", "pull:right", "pull:right", "pull:down"]) &&
    rightToothTerminalActions.length > 0 &&
    rightToothTerminalActions.every(
      (entry) =>
        entry?.before_sticky_pose === "9,4;10,4;9,5" &&
        entry?.mode_before === "pull" &&
        entry?.input === "down" &&
        entry?.before_player.x === 10 &&
        entry?.before_player.y === 5 &&
        entry?.force_target_cell?.x === 10 &&
        entry?.force_target_cell?.y === 4,
    ),
  lower_toe_removal_changes_object_to_two_cell_bar_and_pure_pull_opening:
    byId.remove_lower_toe?.parsed_initial_state.sticky_cell_count === 2 &&
    byId.remove_lower_toe?.shortest_family.distinct_shortest_object_signatures[0]?.[0] === "pull:right",
};
const report = {
  schema_version: 1,
  audit_id: "RA_BASELINE_001_V1_COUNTERFACTUAL_AUDIT",
  candidate_id: "RA_DIFFICULTY_BASELINE_L_KEYHOLE_V1",
  node_id: "baseline_001",
  exact_version: "v1",
  baseline_layout_ref: "../layout.txt",
  baseline_layout_sha256: sha256(baseline),
  runtime_semantics: "current src/prototypes/reality_anchor/mechanics.ts",
  solve_instance: {
    win_condition: "all_targets_covered_by_objects",
    inputs: INPUTS,
    input_cost: 1,
    terminal_win_expansion: "disabled",
  },
  budget: { max_states_per_case: MAX_STATES, graph_max_states_per_case: MAX_STATES },
  cases: results,
  cross_case_claim_checks: crossChecks,
  evidence_boundary:
    "这些删除反事实只核验指定结构要素改变后的 current-runtime 可解性、完整 terminal-win 图与最短对象动作族；不评价原关难度、审美或玩家发现概率。",
  reproduction_status:
    results.every((result) => result.reproduction_status === "pass") &&
    Object.values(crossChecks).every(Boolean)
      ? "pass"
      : "fail",
};

if (process.argv.includes("--write")) {
  writeFileSync(resolve(diagnosticsDir, "counterfactual_audit.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ reproduction_status: report.reproduction_status }, null, 2));
} else {
  console.log(JSON.stringify(report, null, 2));
}

if (report.reproduction_status !== "pass") {
  process.exitCode = 1;
}
