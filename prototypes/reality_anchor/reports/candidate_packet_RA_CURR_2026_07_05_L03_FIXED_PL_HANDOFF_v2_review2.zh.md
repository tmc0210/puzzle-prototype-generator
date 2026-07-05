# Candidate Packet: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 review_2

candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第三关 / 固定 P/L handoff 应用

## prototype_context

confirmed_rules:
  - `P/L` 是相邻二格推拉锚点；位于 `P` 一侧时执行 push 语义，位于 `L` 一侧时执行 pull 语义。
  - 被墙隔离的 P/L 不应在可达图中产生 `anchor_boundary_shift:push_pull`。
  - 无 `B/S` 时全图默认 box world，不应出现材料转换或 sticky 刚体事件。
  - 箱子覆盖全部目标后胜利；玩家站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
tool_boundary:
  - solver / graph / layout analyzer / event probes are available.
  - `probe_fixed_anchor_candidate` 的 combined required groups 不适用于无 B/S 的本教学关；只引用其 Reachable Event Scan 派生摘要。

## slot_brief

intended_role: mechanic_witness
known_before:
  - K_runtime_smoke
target:
  - 固定 P/L 应用
  - 同一个箱子先 push 后 pull，完成到目标的 handoff
difficulty_or_support_expectation: medium support / early application
human_feedback_addressed:
  - v1 有效推动太少。
  - v2 稍微增大空间与箱子到目标的距离。
  - 同一箱子需要右推两次、下拉两次，推拉方向不同。

## mechanic_exposure_context

mechanic_window: fixed_push_pull_anchor_application
allowed_exposure_through:
  - crate push
  - crate pull through fixed P/L
claimed_core_events:
  - push_object count >= 2
  - pull_object count >= 2

## design_target

aesthetic_score_target: not score-claimed
difficulty_score_target: not score-claimed; early application / operation familiarization
target_role_notes: Slightly longer than L02, still not a challenge-depth puzzle.

## solve_instance

layout:

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

player_start: [1, 2]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - same crate is pushed right twice on the push side
  - same crate is pulled down twice on the pull side
allowed_support:
  - short repositioning to switch from top/push side to bottom/pull side
incidental_allowed:
  - post-win movement within winning region
required_winning_path_events:
  - at_least_two_push_object_events
  - at_least_two_pull_object_events
forbidden_winning_path_events:
  - anchor_boundary_shift
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid
forbidden_if_seen_anywhere:
  - anchor_boundary_shift
  - box_to_sticky
  - sticky_to_box
  - sticky_merge
  - move_sticky_rigid

## design_claim

player_insight:
  第三关把 v1 的单推单拉 handoff 放大成同一箱子的短距离练习：玩家需要先在 push side
  将箱子向右推两格，再切到 pull side 将同一个箱子向下拉两格。推与拉方向不同，
  目标是熟悉固定 P/L 分界上的位置切换，而不是制造挑战深度。
causal_chain:
  1. 箱子从 push side 起步，向右推两次到目标上方。
  2. 玩家绕到箱子下方的 pull side。
  3. 第一次下拉把箱子带到目标上方一格，玩家站上目标但不胜利。
  4. 第二次下拉把箱子覆盖目标。
  5. 目标左侧补墙，阻止“一次 pull 后绕回上方再 push”的旁路。
why_not_execution:
  这是早期应用练习；它比 v1 多了实际重复操作和空间切换，但仍保持短小、低噪声。
  设计不声明审美高分，只声明同一箱子在固定 P/L 分界上承担 push-to-pull handoff。
falsification:
  若存在无需 push、无需 pull、少于两次 push、少于两次 pull、P/L 可移动、
  或出现 B/S / sticky 材料事件的胜路，则该版本不满足第三关应用 claim。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt --id RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 --title "Fixed P/L handoff v2" --role mechanic_witness --support medium --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required 300000 80 push_event=push_object pull_event=pull_object`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 push_object 2 300000 80`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 pull_object 2 300000 80`
  - `npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2 push_pull 300000 80`
solver_result:
  found: true
  cost: 6
  depth: 6
  inputs: `right right down right down down`
trace_summary:
  - step 1 `right`: `push_object:crate#1`
  - step 2 `right`: `push_object:crate#1`; same crate reaches target column above goal
  - step 5 `down`: `pull_object:crate#1`; player stands on target but crate not yet covering it
  - step 6 `down`: `pull_object:crate#1`; crate covers target
target_events:
  returned_solution_has_push_object: true
  returned_solution_has_pull_object: true
  returned_solution_push_count: 2
  returned_solution_pull_count: 2
winning_path_event_checks:
  push_pull_required_probe:
    status: complete
    found_bypass_missing_push: false
    found_bypass_missing_pull: false
    explored_states_push_group: 143
    explored_states_pull_group: 130
  push_count_probe:
    status: complete
    found_bypass_below_two_push_events: false
    explored_states: 221
  pull_count_probe:
    status: complete
    found_bypass_below_two_pull_events: false
    explored_states: 132
reachable_event_exposure:
  status: complete
  reachable_states: 130
  legal_transitions: 294
  forbidden_anchor_or_material_hits: none
  event_counts:
    pull_object:crate#1: 10
    push_object:crate#1: 6
    walk: 278
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 13
  scc_shape: one_win_continuation_per_scc
  scc_solution_irreversible_steps: 2
  scc_handoff_scriptiness: "0/2 scripted handoffs; both phase handoffs have reposition room"
  note: Multiple winning states are post-win / equivalent region facts; no unique-solution claim is made.
evidence_limits:
  - No unique route is claimed.
  - Object identity is inferred from the returned single-crate trace and supported by the layout having exactly one crate.
  - No aesthetic / difficulty score is claimed by the controller.
  - The fixed-anchor probe's material-normalization missing groups are expected because this slot intentionally has no B/S; they are not used as a negative evidence point.

## diagnostic_routing

hard_evidence:
  - Verify complete graph and event count probes support at least two push and at least two pull events.
mechanism_scope:
  - Verify fixed P/L did not move and no B/S / sticky events appeared in reachable scan.
claim_hygiene:
  - Ensure the claim remains early application, not challenge-depth or high aesthetic.
taste_probes:
  - Does the extra distance feel like useful operation familiarity rather than padding?
  - Does the left wall successfully remove the one-pull-then-push bypass from the claim?
scc_graph:
  - graph_fact: "complete graph; two SCC irreversible steps; handoff_profile scripted=0/2"
    neutral_meaning: "push phase and pull phase are both complete-graph visible, with reposition room between them"
    player_facing_interpretation: "the player practices a short push phase, then a short pull phase, instead of a single adjacent handoff"
    expected_verdict_effect: merit_for_role_fit_or_noncore_caveat_if_seen_as_padding
variant_family:
  - active curriculum revision from v1 human playtest
start_position:
  - single start position
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
candidate_relation: refined_from:RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1
why_not_archive_variant:
  This is an active curriculum candidate revision authorized by human playtest feedback, not reuse of a clean archive layout.

## attempt_log

serious_structural_attempts:
  - v2a: right-push-twice/down-pull-twice layout; event count probe found a one-pull-then-push bypass.
  - v2b: added wall left of the target; push-count and pull-count probes both passed.
  - v2c: after human follow-up HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002, added one lower-left wall to cut the opening down-right-down dead-end branch while preserving the 6-step witness.
local_repairs:
  - blocked the target-left return route after count probe found the bypass.
  - shortened the lower-left exploratory dead end for the third curriculum slot.
abandoned_families: []

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0003
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: lower-bound/simple teaching anchor; simplicity is acceptable when serving a teaching slot.
  - candidate_id: RA_CAND_0004
    status: accepted
    aesthetic_score: 4
    difficulty_score: 3
    human_comment: 下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    calibration_use: positive early/mid transition anchor; simple operations should still have purposeful state consumption.
negative_anchor_none_found: no clean rejected archive entry exists yet for fixed P/L intro; RA_CAND_0003 is used as lower-bound teaching calibration.

## claim_last_review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable

## artifact_refs

- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_human_micro_tweak.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_object_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_pull_object_min2.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
