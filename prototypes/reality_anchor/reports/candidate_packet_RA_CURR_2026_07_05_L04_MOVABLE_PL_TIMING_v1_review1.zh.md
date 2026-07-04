# Candidate Packet: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1 review_1

candidate_version: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第四关 / 可移动 P/L 推动时机

## prototype_context

confirmed_rules:
  - P/L 是推拉锚点；P 侧使用 push，L 侧使用 pull。
  - P/L 可作为 1x2 刚体被推/拉移动，移动后全局推拉分界随之改变。
  - 无 B/S 锚点时全图默认 box world。
  - 箱子、黏块、锚点覆盖所有目标后胜利；主角站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - `P/L`: movable horizontal push/pull anchor
  - `C`: single crate
  - `G`: single goal
  - `pull_object:crate#1`: crate is pulled in initial pull side
  - `push_object:push_pull_anchor`: P/L anchor is pushed
  - `anchor_boundary_shift:push_pull`: P/L movement changed the force boundary
  - `push_object:crate#1`: crate is pushed after boundary movement
tool_boundary:
  - runtime adapter / solver / graph / layout analyzer are available.
  - curated miner and PuzzleScript exporter are unavailable.

## slot_brief

intended_role: challenge
known_before:
  - walk
  - crate push
  - crate pull
  - fixed P/L push/pull partition
target:
  - movable P/L introduction/application
  - both push and pull must be needed
  - pushing P/L must be a middle step, not opening move
difficulty_or_support_expectation: early application / medium support

## mechanic_exposure_context

mechanic_window: movable P/L timing
allowed_exposure_through:
  - movable P/L
  - pull_object
  - push_object
  - anchor_boundary_shift:push_pull
claimed_core_events:
  - pull_object
  - anchor_boundary_shift:push_pull
  - push_object

## design_target

aesthetic_score_target: not score-claimed
difficulty_score_target: not score-claimed
target_role_notes: A compact timing witness: the player must prepare the crate before moving P/L.

## solve_instance

layout:

```text
#########
#..PL...#
#.G..@C.#
#########
```

player_start: [5, 2]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - pull the crate left while initial boundary makes the player side pull
  - move P/L right after crate preparation
  - push the same crate left onto the goal after boundary movement
allowed_support:
  - short repositioning between the crate and P/L
incidental_allowed:
  - repeated anchor pushes as the boundary sweep
required_winning_path_events:
  - pull_object
  - anchor_boundary_shift:push_pull
  - push_object
forbidden_winning_path_events:
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid
forbidden_if_seen_anywhere:
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid

## design_claim

player_insight:
  玩家必须先在初始 pull side 把箱子向左拉到目标右侧附近；如果没有这一步，直接移动 P/L 只会改变边界而无法收束。箱子到位后，玩家再把 P/L 连续推到右端，让目标附近变回 push side，最后把箱子向左推上目标。
causal_chain:
  1. 初始边界下，玩家在 pull side 连续向左拉箱子两格。
  2. 玩家走到 P/L 左侧，将 P/L 向右推三格；这一步发生在箱子预处理之后。
  3. 边界右移后，玩家回到箱子右侧，用 push 把箱子向左推上目标。
why_not_execution:
  这不是开局一推锚点的 witness。锚点移动前必须先处理箱子位置；锚点移动后又反过来改变箱子处的施力语义，让同一只箱子从 pull 任务变成 push 任务。
falsification:
  若存在缺少 pull、push 或 P/L 位移的胜路，或存在先移动 P/L 再处理箱子的胜路，则该设计不符合第四关槽位。若最短解第一步就是 P/L 位移，也不合格。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_layout.txt --id RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1 --title "Movable P/L timing v1" --role challenge --support medium --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_layout.txt RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_core 300000 80 "push_event=push_object" "pull_event=pull_object" "anchor_shift=anchor_boundary_shift:push_pull"`
  - reachable event scan inline script -> `reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`
  - order scan inline script -> `order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md`
solver_result:
  found: true
  cost: 10
  depth: 10
  inputs: `left left left up right right right down left left`
trace_summary:
  - steps 1-2: `pull_object:crate#1` twice; crate moves left into prepared position
  - steps 5-7: `push_object:push_pull_anchor` with `anchor_boundary_shift:push_pull` three times
  - steps 9-10: `push_object:crate#1` twice; crate covers goal
target_events:
  returned_solution_has_pull_object: true
  returned_solution_has_anchor_shift: true
  returned_solution_has_push_object: true
  returned_solution_has_material_events: false
object_or_instance_evidence:
  - There is exactly one crate, so returned crate pull and crate push are the same crate.
winning_path_event_checks:
  core_required:
    status: complete
    found_bypass_missing_push_pull_or_anchor_shift: false
    explored_states: 130
  push_required_individual:
    status: complete
    found_bypass_missing_push: false
  pull_required_individual:
    status: complete
    found_bypass_missing_pull: false
  anchor_shift_required_individual:
    status: complete
    found_bypass_missing_anchor_shift: false
reachable_event_exposure:
  graph_status: complete
  reachable_states: 124
  legal_transitions: 302
  forbidden_material_hits: none
  reachable_event_counts:
    walk: 276
    pull_object:crate#1: 4
    pull_object:push_pull_anchor: 2
    anchor_boundary_shift:push_pull: 8
    push_object:crate#1: 14
    push_object:push_pull_anchor: 6
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 11
  initial_region:
    commitments: 2
    viableCommitments: 1
    deadCommitments: 1
    interpretation: opening has one viable progress commitment, the crate pull path.
  order_scan:
    status: complete
    found_winning_path_with_anchor_shift_before_any_crate_event: false
    explored_states: 124
  first_anchor_shift_in_shortest_solution: step 5
evidence_limits:
  - No unique input sequence is claimed.
  - P/L is moved three times; the claim is timing and boundary sweep, not single-anchor-push elegance.
  - No aesthetic or difficulty score is claimed by the controller.

## diagnostic_routing

hard_evidence:
  - Does complete event probe support push, pull, and P/L shift as required?
  - Does order scan support that anchor movement cannot precede crate interaction on a win path?
mechanism_scope:
  - Ensure no B/S or material event is present.
claim_hygiene:
  - Check that "middle step" is supported as timing, not overclaimed uniqueness.
taste_probes:
  - Is repeated P/L pushing acceptable as a simple boundary sweep for this slot?
  - Does the compact two-row geometry make the timing readable rather than arbitrary?
scc_graph:
  - graph_fact: complete graph, 124 reachable states, first 5 solution commitments forced viable progress
    neutral_meaning: compact linear timing witness
    player_facing_interpretation: the player must first commit to crate pull, then anchor sweep, then crate push
    expected_verdict_effect: merit_or_noncore_caveat
variant_family:
  - fresh movable-P/L timing witness
start_position:
  - single start position; no alternative starts claimed
prototype_specific_work:
  - invalid_goal_prune_check: skipped, only one target

## prototype_specific_contracts

interface_pair_policy:
  declared_interface_points: []
  target_pairs: []
  ignored_pair_classes: []
  risky_pair_classes: []
pair_diagnostics:
  ignored_pairs: []
  risky_pairs: []

## archive_lineage_policy

default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by:
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant:
  Archive entries were used only for calibration; this is a fresh movable-P/L timing witness.

## attempt_log

serious_structural_attempts:
  - v0: crate/P/L/goal in one line solved in one opening push; rejected.
  - search family: raw random layouts filtered for solution with crate event before anchor shift.
  - v1 compact: compressed best candidate to two rows, preserving pull-then-anchor-then-push structure.
local_repairs:
  - removed lower unused space from the raw candidate.
  - added order scan after evidence showed the desired shortest solution timing.
abandoned_families:
  - open-room movable P/L candidates with anchor shift first or no required anchor shift.

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0003
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: teaching lower-bound; compact mechanism witness can be accepted when it directly teaches a slot.
  - candidate_id: RA_CAND_0004
    status: accepted
    aesthetic_score: 4
    difficulty_score: 3
    human_comment: 下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    calibration_use: positive transition anchor; repeated push/pull with compact causality is valued.
negative_anchor_none_found: no clean rejected archive entry exists; non-archive human feedback warns against incidental mechanics and goal-position hardening.

## claim_last_review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable

## artifact_refs

- prototypes/reality_anchor/reports/fresh_design_claim_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_core.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
- prototypes/reality_anchor/reports/order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
