# Candidate Packet: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor defines push side vs pull side; the player can push from P side and pull from L side.
    - B/S anchor defines box side vs sticky side; moving it normalizes crate/sticky cells after legal moves.
    - Sticky cells are orthogonally connected rigid bodies; converted cells can split or remain connected according to adjacency.
    - Win requires every target to be covered by crate, sticky block, or anchor; player on target does not count.
  tool_boundary:
    - Runtime adapter, solver, graph, SCC/agency analyzer, playable exporter, and local probes are implemented.
    - PuzzleScript exporter is unavailable for this prototype.
  script_terminalization_check:
    status: checked
    scripts_checked:
      - prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts
      - prototypes/reality_anchor/reports/probe_event_count.ts
      - prototypes/reality_anchor/reports/probe_second_count_before_event.ts
      - prototypes/reality_anchor/reports/probe_event_at_least.ts
      - prototypes/reality_anchor/reports/probe_event_at_least_first_win.ts
    result: >
      All checked BFS probes stop expanding a node after runtime.isWin(...) is true. This avoids counting post-win movement as evidence.

slot_brief:
  intended_role: challenge / lexicon-composition application
  target: fresh lexicon-based design, not an archive variant and not a small variant of the previous accepted candidate
  difficulty_or_support_expectation: at least 3; pursue 4 only if critic accepts staged B/S output as real player-side reasoning

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  claimed_core_events:
    - pull_object:box_sticky_anchor
    - anchor_boundary_shift:box_sticky
    - sticky_to_box:n1
    - pull_object:sticky#1
    - force_chain:n2
    - move_sticky_rigid
    - pull_object:crate#1

design_target:
  aesthetic_score_target: "strong 3 floor; possible 4 only if staged brush/tooth consumption reads clearly"
  difficulty_score_target: "3+ floor; 4 is not claimed"
  target_role_notes: >
    The intended insight is staged output consumption: B/S brush creates CMM, a down pull stages sticky while brushing again,
    then right target tooth and left target crate refill consume different material debts.

solve_instance:
  id: RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0
  title: Staged brush tooth v0
  layout: |-
    ############
    #PL##...####
    #####G#G####
    #####MMM...#
    ####BS@.#..#
    ####.....#.#
    ########...#
    ############
  player_start: [6, 4]
  win_condition: all_targets_covered_by_objects

relation_to_previous_candidate:
  previous_candidate: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1
  coexistence_claim: >
    Coexistence is plausible. The previous candidate's central choice is a top stroke-select / early-overbrush failure.
    This candidate's central chain is staged B/S brush under pull-world control, sticky-pair staging, wall-tooth target consumption,
    and final crate refill. The geometry, route rhythm, and consumed lexicon materials are substantially different.

lexicon_material_used:
  primary_entries:
    - entry: "B/S 移动边界刷产物：远程生成与门口消费"
      used_as: >
        Movable B/S is pulled through the nearby brush line. The important output is not the anchor motion itself,
        but the produced CMM / CM material sequence consumed downstream.
    - entry: "固定 B/S 切割：C+M 尾巴与单格目标袋"
      used_as: >
        The design borrows the C+M / tail-debt interface: one side becomes separable crate debt while sticky remains as later debt.
    - entry: "刚体黏块 + 墙口：前沿墙齿目标口补充"
      used_as: >
        The right target mouth consumes sticky rigid movement and footprint shape. This is why the upper-right goal is not just a counter.
    - entry: "P/L pull 抽取把手 / P/L as B/S driver"
      used_as: >
        P/L is not the aesthetic center here. It supplies pull-side semantics so the staged B/S brush can be driven from the intended side.
  designer_added_bridge_logic:
    - "First brush alone creates CMM but leaves two target debts unresolved."
    - "The down pull couples sticky pull, force-chain, and the second B/S shift, so the second brush is tied to staging instead of being a free button."
    - "The right tooth consumes sticky after staging, while the left goal later requires crate pull/refill."

mechanism_scope:
  central:
    - First right pull of B/S brushes upper `MMM` into `CMM`.
    - Down pull stages the sticky pair, fires force_chain, and makes the second B/S boundary shift.
    - Second right pull converts the lower output to `CM`.
    - Sticky is then pulled upward through the right target mouth by sticky rigid movement.
    - Final crate pull covers the left target.
  allowed_support:
    - Walking around the lower/right corridor to reach pull stances.
    - Static P/L as rule-space selector; it is retained because no-P/L is unsolved, not because it is a main puzzle object.
  required_winning_path_events:
    - pull_object:box_sticky_anchor
    - anchor_boundary_shift:box_sticky
    - sticky_to_box:n1
    - pull_object:sticky#1
    - force_chain:n2
    - move_sticky_rigid
    - pull_object:crate#1
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    The player must understand that the first brush is only the first half of a staged material chain. If they treat the brush as
    a loose one-step conversion, they still need to explain why the right target mouth and left target remain unpaid. The useful
    route couples the down sticky pull to the next B/S shift, then consumes sticky and crate debts in separate target mouths.
  causal_chain:
    - First B/S pull creates `CMM` from upper `MMM`.
    - Down pull moves sticky, triggers force_chain, shifts B/S again, and opens the staged lower output.
    - Second B/S pull creates `CM`, preserving a sticky unit for the right target while leaving crate debt for the left target.
    - Two upward sticky pulls cover the right goal through rigid sticky movement.
    - Final crate pull covers the left goal.
  why_not_execution: >
    The route has substantial walking and a tight graph, so execution-tax caveat is real. The hard claim is not route elegance or
    uniqueness; it is that the target obligations force the staged B/S/sticky/crate chain.
  falsification:
    - A complete winning path missing any core event group falsifies the central chain.
    - A complete winning path with fewer than 3 B/S shifts, fewer than 3 sticky pulls, fewer than 2 sticky_to_box events,
      fewer than 2 B/S-anchor pulls, or no crate pull falsifies the staged-count claims.
    - A win where the second B/S boundary shift happens before the first sticky pull falsifies the staging-order claim.
    - If removing either target preserves cost and core obligations, the target is redundant.
    - If removing P/L preserves solvability and core obligations, the static P/L is likely visual noise.

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt --id RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_core_exact 300000 60 bs_shift=anchor_boundary_shift:box_sticky force_chain=force_chain sticky_to_box=sticky_to_box sticky_pull=pull_object:sticky#1 sticky_rigid=move_sticky_rigid crate_pull=pull_object:crate#1
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_bs_shift_min3 anchor_boundary_shift:box_sticky 3 300000 60
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_sticky_pull_exact_min3 pull_object:sticky#1 3 300000 60
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_crate_pull_exact_min1 pull_object:crate#1 1 300000 60
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_sticky_to_box_min2 sticky_to_box 2 300000 60
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_bs_anchor_pull_min2 pull_object:box_sticky_anchor 2 300000 60
    - npx tsx prototypes/reality_anchor/reports/probe_second_count_before_event.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_second_bs_after_sticky_pull anchor_boundary_shift:box_sticky pull_object:sticky#1 300000 60
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal_layout.txt --id RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_right_goal_layout.txt --id RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_right_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_left_goal_core_exact 300000 60 bs_shift=anchor_boundary_shift:box_sticky force_chain=force_chain sticky_to_box=sticky_to_box sticky_pull=pull_object:sticky#1 sticky_rigid=move_sticky_rigid crate_pull=pull_object:crate#1
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_right_goal_layout.txt RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_right_goal_core_exact 300000 60 bs_shift=anchor_boundary_shift:box_sticky force_chain=force_chain sticky_to_box=sticky_to_box sticky_pull=pull_object:sticky#1 sticky_rigid=move_sticky_rigid crate_pull=pull_object:crate#1
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_pl_layout.txt --id RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_no_pl --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
  solver_result:
    found: true
    cost: 18
    depth: 18
    inputs: right down right down right right up up up left left left up up left left down up
    event_counts:
      "pull_object:box_sticky_anchor": 2
      "anchor_boundary_shift:box_sticky": 3
      "sticky_to_box:n1": 2
      "pull_object:sticky#1": 3
      "force_chain:n2": 1
      move_sticky_rigid: 3
      walk: 12
      "pull_object:crate#1": 1
  trace_summary:
    - step_1: right pull B/S; upper `MMM` becomes `CMM`.
    - step_2: down pull sticky; force_chain and second B/S shift happen in the same staged action.
    - step_3: right pull B/S; lower output becomes `CM`.
    - step_13_and_14: sticky is pulled upward through target mouth by sticky rigid movement.
    - step_18: crate is pulled into the left target.
  winning_path_event_checks:
    event_probe_RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_core_exact:
      status: complete
      combined_missing_core_bypass: false
      individual_missing_bypass:
        bs_shift: false
        force_chain: false
        sticky_to_box: false
        sticky_pull: false
        sticky_rigid: false
        crate_pull: false
  count_and_order_checks:
    bs_shift_min3:
      status: complete
      found_bypass_below_count: false
    sticky_pull_exact_min3:
      status: complete
      found_bypass_below_count: false
    crate_pull_exact_min1:
      status: complete
      found_bypass_below_count: false
    sticky_to_box_min2:
      status: complete
      found_bypass_below_count: false
    bs_anchor_pull_min2:
      status: complete
      found_bypass_below_count: false
    second_bs_after_sticky_pull:
      status: complete
      found_winning_violation: false
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 104
    legal_transitions: 179
    winning_states: 2
  graph_or_counterfactual_evidence:
    main_graph:
      status: complete
      initial_scc_states: 1
      initial_scc_out: 2
      initial_scc_win_out: 2
      initial_scc_dead_out: 0
      compressed_regions: 37
      solution_commitments: 7
      forced_optimal_prefix_length: 7
      forced_viable_commitments_on_solution_path: "6/7"
      handoff_scripted: "5/7"
      interpretation: "Mechanism chain is tight but potentially scripted; route has one reposition SCC after the third brush action."
    no_left_goal:
      status: complete
      cost_delta: "18 -> 14"
      core_loss: "crate_pull bypass released"
      interpretation: "Left target forces final crate refill; keep."
    no_right_goal:
      status: complete
      cost_delta: "18 -> 16"
      core_loss: "core exact probe still passes, but right target tooth obligation is weakened and cost drops"
      interpretation: "Right target consumes sticky/tooth obligation; keep."
    no_pl:
      status: complete
      solved: false
      reachable_states: 16
      winning_states: 0
      interpretation: "P/L is static and aesthetically caveated, but deletion breaks the ruleset/solution space; keep."

goal_prune_check:
  status: clean
  candidates_checked:
    - element:
        kind: goal
        id_or_cell: [5, 2]
      action_tested: remove
      result: keep
      reason: "cost drops 18 -> 14 and a win missing crate_pull appears."
    - element:
        kind: goal
        id_or_cell: [7, 2]
      action_tested: remove
      result: keep
      reason: "cost drops 18 -> 16 and right sticky/tooth consumption is weakened."

redundant_element_prune:
  status: kept_with_caveats
  sequence:
    - goal_prune
    - object_remove_prune
    - object_wallify_prune
    - space_prune
    - wall_outline_prune
  candidates_checked:
    - element:
        kind: object
        id_or_cell: "P/L anchor at row 1 col 1-2"
      action_tested: remove
      result: keep
      hard_facts:
        cost_delta: "18 -> no solution"
        graph_status: complete
        core_event_bypass: "n/a; no winning states"
      semantic_role: structural
      reason: "Static but required to place the level in the intended pull-side rule space."
    - element:
        kind: spaces
        id_or_cell: "lower/right corridor"
      action_tested: not_individually_wall_pruned
      result: keep
      hard_facts:
        returned_trace_uses_corridor: true
      semantic_role: read_graph
      reason: "Trace uses this area to reach sticky-pull and crate-pull stances; no obvious leaf/pocket candidate was found."
  removed_elements: []
  wallified_objects: []
  trimmed_outline: []

opening_comfort_check:
  status: caveat
  facts:
    initial_scc_states: 1
    initial_irreversible_commitments: 2
    dead_exits_before_first_win_exit: 0
    first_action_in_returned_solution: "right pull B/S, immediately a core irreversible event"
  interpretation: >
    Opening comfort is weak. This may be acceptable for a compact challenge candidate, but it limits aesthetic ceiling and should be routed to critic.

evidence_limits:
  - Does not claim unique input sequence.
  - Does not claim difficulty 4.
  - Does not claim P/L is aesthetically central.
  - Does not claim all event order is fixed except the tested "second B/S shift cannot precede first sticky pull" condition.
  - Legacy loose-pattern artifacts are not evidence: event_probe_RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_core.md and event_count_probe_RA_LEX_2026_07_07_STAGED_BRUSH_TOOTH_v0_sticky_pull_min3_pull_object_sticky_min3.md used a non-exact sticky pattern and should be ignored.
  - Object identity is limited to event strings such as pull_object:sticky#1 and pull_object:crate#1.

diagnostic_routing:
  hard_evidence:
    - Verify complete event probe supports required winning path event groups.
    - Verify count probes support staged requirements.
    - Verify second-count-before-event supports the staging-order claim.
    - Verify no-P/L and goal-prune facts are not overstated.
  taste_probes:
    - Does staged B/S output plus tooth/crate target consumption feel like a real puzzle insight, or mostly a scripted route?
    - Is the static P/L acceptable as a ruleset selector, or does it read as fake affordance?
    - Does opening comfort being 1-state initial SCC make the first move too obvious?
    - Does this differ enough from STROKE_SELECT_CMM_PAIR_v1 to coexist in the playable queue?
  scc_graph:
    - Complete graph, 104 reachable states, 2 winning states.
    - Initial SCC has no buffer; all optimal choices are forced through 7 commitments.
    - One mid-route SCC has 11 states and a dead outgoing commitment, giving some but not much agency.

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    Design was composed from lexicon entries in mechanism_lab/lexicon.md. Archive was used only for score calibration, not as a layout source.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0005
      scores: aesthetic 4 / difficulty 4
      human_comment: "玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。"
      relevance: "positive anchor for visible contradiction and compact mechanism coupling."
    - candidate_id: RA_CAND_0011
      scores: aesthetic 4 / difficulty 4
      human_comment: "箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡。"
      relevance: "positive anchor for state responsibility rather than route tax."
    - candidate_id: RA_CAND_0016
      scores: aesthetic 3 / difficulty 2
      human_comment: "强引导的黏块合并再切割教学。"
      relevance: "lower bound for clear but guided B/S timing."
    - candidate_id: RA_CAND_0006
      scores: aesthetic 2 / difficulty 5
      human_comment: "小目标位置改动极大地弱化机制美感并增加了腾挪难度，较差反例。"
      relevance: "negative anchor for route tax and hard-but-ugly complexity."

claim_last_review:
  mode: not_used
```
