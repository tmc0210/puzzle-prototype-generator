import { eventMatchesPattern } from "../../../src/core/events.js";
import { loadPrototypePackage } from "../../../src/core/io.js";
import { solveWithRuntime } from "../../../src/core/solver.js";
import type { InputId, LevelDoc, SearchStatus } from "../../../src/core/types.js";
import { getRuntimeAdapter } from "../../../src/prototypes/runtimeAdapter.js";
import { analyzeLevel } from "../../../src/workflows/levelAnalyzer.js";

type RuntimeState = unknown;
type Group = { name: string; patterns: string[] };

const prototypePath = "prototypes/reality_anchor";
const maxStates = Number(process.argv[2] ?? 300000);
const maxDepth = Number(process.argv[3] ?? 80);
const graphMaxStates = Number(process.argv[4] ?? maxStates);
const onlyId = process.argv[5];

const groups: Group[] = [
  { name: "bs_shift", patterns: ["anchor_boundary_shift:box_sticky"] },
  { name: "box_to_sticky", patterns: ["box_to_sticky"] },
  { name: "sticky_merge", patterns: ["sticky_merge"] },
  { name: "sticky_to_box", patterns: ["sticky_to_box"] },
  { name: "sticky_rigid", patterns: ["move_sticky_rigid"] },
  {
    name: "crate_push",
    patterns: Array.from({ length: 8 }, (_, index) => `push_object:crate#${index + 1}`),
  },
];

const layouts: Array<{ id: string; layout: string }> = [
  {
    id: "scratch_a",
    layout: `
###########
#@.......##
#..C.....##
#..M..GG.##
#..BS....##
#....G...##
###########
`.trim(),
  },
  {
    id: "scratch_b_vertical_domino",
    layout: `
###########
#@........#
#..C..G...#
#...M.G...#
#..BS.....#
#.....G...#
###########
`.trim(),
  },
  {
    id: "scratch_c_vertical_domino_keyhole",
    layout: `
###########
#@........#
#..C..G####
#...M.G..##
#..BS..#.##
#.....G..##
###########
`.trim(),
  },
  {
    id: "scratch_d_shift_then_cut_keyhole",
    layout: `
###########
#@........#
#..C..GG.##
#...M.#..##
#..BS.#..##
#.....G..##
###########
`.trim(),
  },
  {
    id: "scratch_e_domino_cut_two_crates",
    layout: `
###########
#@........#
#..C...G..#
#..#M.....#
#..BS.....#
#.....G...#
###########
`.trim(),
  },
  {
    id: "scratch_f_domino_cut_keyhole_block_anchor",
    layout: `
###########
#@........#
#..C...G..#
#..#M.....#
#..BS.....#
####..G..##
###########
`.trim(),
  },
  {
    id: "scratch_g_reverse_anchor_keyhole",
    layout: `
############
#.........@#
#.....GC...#
#....M.....#
#....SB....#
####.G....##
############
`.trim(),
  },
  {
    id: "scratch_h_reverse_keyhole_block_down",
    layout: `
############
#.........@#
#....G.C...#
#....M.....#
#....SB....#
####G.#...##
############
`.trim(),
  },
  {
    id: "scratch_i_reverse_keyhole_no_anchor_cover",
    layout: `
############
#.........@#
#....G.C...#
#....M.....#
#....SB....#
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_j_reverse_keyhole_block_downpush",
    layout: `
############
#.........@#
#....G.C...#
#....M.#...#
#....SB....#
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_k_reverse_keyhole_lock_single_m",
    layout: `
############
#.........@#
#....G.C...#
#....M##...#
#....SB....#
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_l_reverse_keyhole_force_join",
    layout: `
############
#.........@#
#....G.C...#
#....M###..#
#....SB....#
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_m_reverse_keyhole_force_join_no_right_drop",
    layout: `
############
#.........@#
#....G.C.#.#
#....M###..#
#....SB....#
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_n_reverse_keyhole_gate_anchor_access",
    layout: `
############
#.........@#
#..G...C.#.#
#....M#.####
#....SB.####
####G##....#
############
`.trim(),
  },
  {
    id: "scratch_o_reverse_gate_compact",
    layout: `
############
#.........@#
#.G...C..#.#
#...M#.#####
#...SB.#####
###G##.....#
############
`.trim(),
  },
  {
    id: "scratch_p_vertical_partial_cut",
    layout: `
###########
#..@......#
#..B.C..G.#
#..S......#
#....M..G.#
###########
`.trim(),
  },
  {
    id: "scratch_q_vertical_partial_cut_walls",
    layout: `
###########
#..@..#...#
#..B.C#.G.#
#..S..#...#
#....M..G.#
###########
`.trim(),
  },
  {
    id: "scratch_r_vertical_side_shift_cut",
    layout: `
###########
#....@....#
#..B.C....#
#..S......#
#....M.G..#
#.....G...#
###########
`.trim(),
  },
  {
    id: "scratch_s_vertical_railed_anchor",
    layout: `
###########
#..@......#
#.#B.C....#
#.#S....G.#
#.#..M.G..#
#.........#
###########
`.trim(),
  },
  {
    id: "scratch_t_two_cell_cut",
    layout: `
#############
#......@...##
#.....C.MM.##
#..##...GG###
#..##..GG####
#.....BS...##
#############
`.trim(),
  },
  {
    id: "scratch_u_v2_second_cell_goal",
    layout: `
############
#......@##.#
#.....C.MM.#
#..##....G##
#..##...G###
#.....BS...#
############
`.trim(),
  },
  {
    id: "scratch_v_second_cell_goal_compact_start",
    layout: `
############
#.......##.#
#....@C.MM.#
#..##....G##
#..##...G###
#.....BS...#
############
`.trim(),
  },
];

const pkg = await loadPrototypePackage(prototypePath);
const adapter = getRuntimeAdapter(pkg.mechanic);
const runtime = adapter.createRuntime(pkg.mechanic);

for (const entry of layouts.filter((layout) => !onlyId || layout.id.includes(onlyId))) {
  const level: LevelDoc = {
    id: entry.id,
    title: entry.id,
    role: "challenge",
    status: "candidate",
    targets: ["K_runtime_smoke"],
    known_before: ["K_runtime_smoke"],
    target_learning: ["K_runtime_smoke"],
    support_level: "none",
    expected_solver_evidence: ["solvable"],
    expected_llm_player_evidence: [],
    layout: entry.layout,
  };
  console.log(`\n## ${entry.id}`);
  let initial: RuntimeState;
  try {
    initial = adapter.parseLevel(level);
  } catch (error) {
    console.log(`parse_error=${String(error)}`);
    continue;
  }
  console.log(adapter.renderState(initial as never));
  const solution = solveWithRuntime(runtime, initial, {
    winCondition: pkg.mechanic.win,
    maxStates,
    maxDepth,
  });
  console.log(`solve=${solution.found} status=${solution.searchStatus} explored=${solution.exploredStates} cost=${solution.cost}`);
  if (solution.found) {
    console.log(`inputs=${solution.inputs.join(" ")}`);
    console.log(`events=${solution.events.join(" ")}`);
    console.log(`first_bs_shift=${firstStepWith(solution.inputs, initial, "anchor_boundary_shift:box_sticky")}`);
    console.log("final=");
    console.log(renderAfter(initial, solution.inputs));
  } else if (solution.reason) {
    console.log(`reason=${solution.reason}`);
  }
  try {
    const analysis = analyzeLevel(pkg, level, {
      maxStates,
      maxDepth,
      graphMaxStates,
      counterfactualMaxStates: 5000,
    });
    console.log(`graph=${analysis.graph.status} states=${analysis.graph.reachableStateCount} wins=${analysis.graph.winStateCount}`);
    console.log(`agency_forced_viable=${analysis.agency.compression?.forcedViablePrefixLength ?? "n/a"} forced_commit=${analysis.agency.compression?.forcedCommitmentPrefixLength ?? "n/a"}`);
  } catch (error) {
    console.log(`analysis_error=${String(error)}`);
  }
  const probe = findWinMissingGroups(initial, groups, { maxStates, maxDepth });
  console.log(`core_probe_found_bypass=${probe.found} status=${probe.status} explored=${probe.exploredStates}`);
  if (probe.missingGroups) console.log(`missing=${probe.missingGroups.join(",")}`);
  if (probe.inputs) console.log(`bypass_inputs=${probe.inputs.join(" ")}`);
  if (probe.events) console.log(`bypass_events=${probe.events.join(" ")}`);
}

function firstStepWith(inputs: InputId[], initial: RuntimeState, pattern: string): number {
  let state = initial;
  for (const [index, input] of inputs.entries()) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return -1;
    if (result.events.some((event) => eventMatchesPattern(event, pattern))) return index + 1;
    state = result.state;
  }
  return -1;
}

function renderAfter(initial: RuntimeState, inputs: InputId[]): string {
  let state = initial;
  for (const input of inputs) {
    const result = runtime.step(state, input, { winCondition: pkg.mechanic.win });
    if (!result.legal) return adapter.renderState(state as never);
    state = result.state;
  }
  return adapter.renderState(state as never);
}

function findWinMissingGroups(
  initial: RuntimeState,
  requiredGroups: Group[],
  budget: { maxStates: number; maxDepth: number },
): {
  found: boolean;
  status: SearchStatus;
  exploredStates: number;
  reason?: string;
  depth?: number;
  inputs?: InputId[];
  events?: string[];
  missingGroups?: string[];
} {
  const allMask = (1 << requiredGroups.length) - 1;
  const queue: Array<{
    state: RuntimeState;
    mask: number;
    inputs: InputId[];
    events: string[];
    depth: number;
  }> = [{ state: initial, mask: 0, inputs: [], events: [], depth: 0 }];
  const visited = new Set<string>([`${runtime.key(initial)}|0`]);
  let cursor = 0;
  let depthHit = false;

  while (cursor < queue.length) {
    if (visited.size > budget.maxStates) {
      return {
        found: false,
        status: "exhausted",
        exploredStates: visited.size,
        reason: `state budget exceeded (${budget.maxStates})`,
      };
    }
    const current = queue[cursor]!;
    cursor += 1;
    if (current.depth > 0 && runtime.isWin(current.state, pkg.mechanic.win) && current.mask !== allMask) {
      return {
        found: true,
        status: "found",
        exploredStates: visited.size,
        depth: current.depth,
        inputs: current.inputs,
        events: current.events,
        missingGroups: requiredGroups
          .filter((_, index) => (current.mask & (1 << index)) === 0)
          .map((group) => group.name),
      };
    }
    if (current.depth >= budget.maxDepth) {
      depthHit = true;
      continue;
    }
    for (const action of runtime.actions(current.state, { winCondition: pkg.mechanic.win })) {
      const result = runtime.step(current.state, action, { winCondition: pkg.mechanic.win });
      if (!result.legal) continue;
      const nextMask = collectMask(current.mask, result.events, requiredGroups);
      const key = `${runtime.key(result.state)}|${nextMask}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push({
        state: result.state,
        mask: nextMask,
        inputs: [...current.inputs, action],
        events: [...current.events, ...result.events],
        depth: current.depth + 1,
      });
    }
  }
  return {
    found: false,
    status: depthHit ? "exhausted" : "complete",
    exploredStates: visited.size,
    reason: depthHit ? `depth budget exceeded (${budget.maxDepth})` : "no winning bypass found",
  };
}

function collectMask(current: number, events: string[], requiredGroups: Group[]): number {
  let mask = current;
  for (const [index, group] of requiredGroups.entries()) {
    if (group.patterns.some((pattern) => events.some((event) => eventMatchesPattern(event, pattern)))) {
      mask |= 1 << index;
    }
  }
  return mask;
}
