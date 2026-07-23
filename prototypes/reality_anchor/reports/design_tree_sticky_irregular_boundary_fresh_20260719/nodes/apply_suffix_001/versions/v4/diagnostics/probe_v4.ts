import { readFile } from "node:fs/promises";
import { loadPrototypePackage } from "../../../../../../../../../src/core/io.js";
import { enumerateRuntimeGraph } from "../../../../../../../../../src/core/runtimeGraph.js";
import type { InputId, LevelDoc, SolverOptions } from "../../../../../../../../../src/core/types.js";
import { createRealityAnchorRuntime } from "../../../../../../../../../src/prototypes/reality_anchor/runtime.js";
import {
  cloneState,
  parseLevel,
  pointKey,
  renderState,
  stateKey,
  type RealityAnchorState,
} from "../../../../../../../../../src/prototypes/reality_anchor/mechanics.js";

const root =
  "prototypes/reality_anchor/reports/design_tree_sticky_irregular_boundary_fresh_20260719/" +
  "nodes/apply_suffix_001/versions/v4";
const pkg = await loadPrototypePackage("prototypes/reality_anchor");
const runtime = createRealityAnchorRuntime(pkg.mechanic);
const options: SolverOptions = { winCondition: pkg.mechanic.win };
const canonicalInputs: InputId[] = [
  "up", "left", "down", "left", "up", "right", "up", "left", "up",
];
const alternateInputs: InputId[] = [
  "up", "left", "down", "left", "up", "right", "up", "left", "down", "left", "up",
];
const squareInputs: InputId[] = [
  "left", "up", "right", "up", "left", "down", "down", "left", "up", "up", "left", "left", "up",
];

async function loadState(relativePath: string, id: string): Promise<RealityAnchorState> {
  const layout = await readFile(`${root}/${relativePath}`, "utf8");
  const level: LevelDoc = { id, title: id, layout };
  return parseLevel(level);
}

function replay(initial: RealityAnchorState, inputs: InputId[]) {
  let current = cloneState(initial);
  const steps = [];
  for (const [index, input] of inputs.entries()) {
    const before = cloneState(current);
    const transition = runtime.step(current, input, options);
    if (transition.legal) current = transition.state;
    steps.push({
      step: index + 1,
      input,
      legal: transition.legal,
      reason: transition.reason ?? null,
      events: transition.events,
      before_key: stateKey(before),
      after_key: stateKey(current),
      win_after: runtime.isWin(current, pkg.mechanic.win),
      after_render: renderState(current),
    });
  }
  return {
    inputs,
    completed: steps.every((step) => step.legal),
    legal_through_step: steps.find((step) => !step.legal)?.step
      ? steps.find((step) => !step.legal)!.step - 1
      : steps.length,
    initial_key: stateKey(initial),
    initial_render: renderState(initial),
    steps,
    final_key: stateKey(current),
    final_render: renderState(current),
    final_win: runtime.isWin(current, pkg.mechanic.win),
  };
}

function objectSignature(state: RealityAnchorState): string {
  return stateKey(state).replace(/^Ply:[^|]+\|/, "");
}

function graphFacts(initial: RealityAnchorState) {
  const graph = enumerateRuntimeGraph(runtime, initial, pkg.mechanic.win, options, {
    maxStates: 300_000,
  });
  const reverse = Array.from({ length: graph.states.length }, () => [] as number[]);
  const outgoing = Array.from({ length: graph.states.length }, () => [] as number[]);
  for (const edge of graph.edges) {
    reverse[edge.to]!.push(edge.from);
    outgoing[edge.from]!.push(edge.to);
  }
  const canReachWin = new Set<number>(graph.winStateIndexes);
  const queue = [...graph.winStateIndexes];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const previous of reverse[queue[cursor]!]!) {
      if (!canReachWin.has(previous)) {
        canReachWin.add(previous);
        queue.push(previous);
      }
    }
  }
  function shortestInputs(target: number): InputId[] {
    const result: InputId[] = [];
    let current = target;
    while (current !== 0) {
      const edge = graph.edges.find(
        (candidate) =>
          candidate.to === current &&
          graph.depthByIndex[candidate.from] === graph.depthByIndex[current]! - 1,
      );
      if (!edge) throw new Error(`No BFS predecessor for state ${current}`);
      result.push(edge.action);
      current = edge.from;
    }
    return result.reverse();
  }
  function branchFrom(key: string) {
    const start = graph.indexByKey.get(key);
    if (start === undefined) throw new Error(`Branch state missing from graph: ${key}`);
    const reached = new Set<number>([start]);
    const branchQueue = [start];
    for (let cursor = 0; cursor < branchQueue.length; cursor += 1) {
      for (const next of outgoing[branchQueue[cursor]!]!) {
        if (!reached.has(next)) {
          reached.add(next);
          branchQueue.push(next);
        }
      }
    }
    return {
      start_state_index: start,
      start_depth: graph.depthByIndex[start],
      reachable_states: reached.size,
      can_reach_win: canReachWin.has(start),
      reachable_winning_states: [...reached].filter((index) => graph.winStateIndexes.has(index)).length,
    };
  }
  return {
    graph,
    serialized: {
      status: graph.status,
      reason: graph.reason ?? null,
      reachable_states: graph.states.length,
      legal_transitions: graph.edges.length,
      winning_states: graph.winStateIndexes.size,
      winning_object_signature_count: new Set(
        [...graph.winStateIndexes].map((index) => objectSignature(graph.states[index]!)),
      ).size,
      winning_states_detail: [...graph.winStateIndexes].map((index) => ({
        state_index: index,
        depth: graph.depthByIndex[index],
        state_key: graph.keys[index],
        object_signature: objectSignature(graph.states[index]!),
        shortest_inputs: shortestInputs(index),
        render: renderState(graph.states[index]!),
      })),
      branchFrom,
    },
  };
}

const exact = await loadState("layout.txt", "RA_APPLY_SUFFIX_V4");
const canonical = replay(exact, canonicalInputs);
const alternate = replay(exact, alternateInputs);
const square = replay(exact, squareInputs);
const exactGraph = graphFacts(exact);
const correctCommitment = canonical.steps[1]!.after_key;
const squareCommitment = square.steps[1]!.after_key;

const removeLower = await loadState(
  "diagnostics/counterfactual_remove_lower_target.txt",
  "RA_APPLY_SUFFIX_V4_CF_REMOVE_LOWER",
);
const removeLowerGraph = graphFacts(removeLower);
const winAtCore = await loadState(
  "diagnostics/counterfactual_win_at_core.txt",
  "RA_APPLY_SUFFIX_V4_CF_WIN_AT_CORE",
);

const postCore = replay(exact, canonicalInputs.slice(0, 8));
const postCoreState = exactGraph.graph.states[exactGraph.graph.indexByKey.get(postCore.final_key)!]!;
const noToe = cloneState(postCoreState);
noToe.stickyGroups = noToe.stickyGroups
  .map((group) => group.filter((point) => pointKey(point) !== "1,4"))
  .filter((group) => group.length > 0);
const noToeStep = runtime.step(noToe, "up", options);

const output = {
  artifact: "RA_APPLY_SUFFIX_V4_FRESH_RUNTIME_PROBE",
  solve_instance: {
    layout_ref: `${root}/layout.txt`,
    initial_state_key: stateKey(exact),
    initial_render: renderState(exact),
  },
  exact_graph: {
    ...exactGraph.serialized,
    correct_offset_z_commitment: exactGraph.serialized.branchFrom(correctCommitment),
    square_commitment: exactGraph.serialized.branchFrom(squareCommitment),
  },
  replays: { canonical, alternate_handle: alternate, square_counterplay: square },
  counterfactuals: {
    remove_lower_target: {
      graph: {
        status: removeLowerGraph.serialized.status,
        reachable_states: removeLowerGraph.serialized.reachable_states,
        legal_transitions: removeLowerGraph.serialized.legal_transitions,
        winning_states: removeLowerGraph.serialized.winning_states,
      },
      canonical: replay(removeLower, canonicalInputs),
      square: replay(removeLower, squareInputs),
    },
    win_at_core: {
      offset_z: replay(winAtCore, canonicalInputs.slice(0, 8)),
      square: replay(winAtCore, squareInputs.slice(0, 5)),
    },
    remove_distal_toe_after_core: {
      source_state_key: postCore.final_key,
      removed_cell: [1, 4],
      before_input_state_key: stateKey(noToe),
      before_input_render: renderState(noToe),
      input: "up",
      legal: noToeStep.legal,
      events: noToeStep.events,
      after_state_key: stateKey(noToeStep.state),
      after_render: renderState(noToeStep.state),
      final_win: runtime.isWin(noToeStep.state, pkg.mechanic.win),
    },
  },
};

console.log(JSON.stringify(output, null, 2));
