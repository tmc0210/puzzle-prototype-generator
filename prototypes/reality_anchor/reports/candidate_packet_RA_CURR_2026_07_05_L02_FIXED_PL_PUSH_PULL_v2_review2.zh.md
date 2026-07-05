# Candidate Packet: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2 review_2

candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第二关 / 固定 P/L 推拉教学

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
  - 固定 P/L 引入教学
  - 分别用 push 与 pull 处理两个箱子到目标
difficulty_or_support_expectation: high support / early teaching
human_feedback_addressed:
  - 下方箱子左移一格。
  - 封住其上方格与右上格。
  - 让玩家受迫连续两次拉箱，而不是先从左侧尝试推箱。

## mechanic_exposure_context

mechanic_window: fixed_push_pull_anchor_intro
allowed_exposure_through:
  - crate push
  - crate pull through fixed P/L
claimed_core_events:
  - push_object
  - pull_object
  - pull_object count >= 2

## design_target

aesthetic_score_target: not score-claimed
difficulty_score_target: not score-claimed; teaching witness
target_role_notes: Clarity and low-friction first pull lesson matter more than puzzle depth.

## solve_instance

layout:

```text
########
#@CG####
#...#P##
###.#L##
#C.G.###
########
```

player_start: [1, 1]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - upper push-side crate covers the top target by one push
  - lower pull-side crate covers the lower target by two consecutive rightward pulls
allowed_support:
  - walking / repositioning through the central corridor
incidental_allowed:
  - none
required_winning_path_events:
  - push_object
  - pull_object
  - at least_two_pull_object_events
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
  第二关仍是固定 P/L 的推拉教学，但下方不再让玩家先从左侧尝试无反馈的推箱。
  玩家先完成上方单推 witness，再在下方被结构引导到箱子右侧，连续两次向右拉同一个箱子，
  从而明确学习 pull-side 的基本操作。
causal_chain:
  1. 上方 crate 位于 push side，向右推一次覆盖上目标。
  2. 下方 crate 左移到目标两格外；它上方与右上方封墙，减少从左侧推的误导。
  3. 玩家经中部通道到达下方 crate 右侧。
  4. 第一次右向 pull 把 crate 拉到中间格，玩家站到目标上但还未胜利。
  5. 第二次右向 pull 把 crate 拉到目标，完成下方 witness。
why_not_execution:
  这不是挑战型谜题；价值是把“pull 是把身后物体带过来”以连续两次的形式强制展示，
  修正 v1 下方可先误读为推箱的教学摩擦。
falsification:
  若存在无需 push 的胜路、无需 pull 的胜路、少于两次 pull 的胜路、P/L 可移动、
  或出现 B/S / sticky 材料事件，则该版本不满足第二关教学 claim。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_layout.txt --id RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2 --title "Fixed P/L push-pull v2" --role mechanic_witness --support high --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_layout.txt RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_push_pull_required 300000 80 push_event=push_object pull_event=pull_object`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_layout.txt RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2 pull_object 2 300000 80`
  - `npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_layout.txt RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2 push_pull 300000 80`
solver_result:
  found: true
  cost: 8
  depth: 8
  inputs: `right down right down down left right right`
trace_summary:
  - step 1 `right`: `push_object:crate#1`; top target covered
  - step 7 `right`: `pull_object:crate#2`; lower crate moves from x1 to x2
  - step 8 `right`: `pull_object:crate#2`; lower crate covers lower target
target_events:
  returned_solution_has_push_object: true
  returned_solution_has_pull_object: true
  returned_solution_pull_count: 2
winning_path_event_checks:
  push_pull_required_probe:
    status: complete
    found_bypass_missing_push: false
    found_bypass_missing_pull: false
    explored_states: 51
  pull_count_probe:
    status: complete
    found_bypass_below_two_pull_events: false
    explored_states: 51
reachable_event_exposure:
  status: complete
  reachable_states: 51
  legal_transitions: 99
  forbidden_anchor_or_material_hits: none
  event_counts:
    pull_object:crate#2: 6
    push_object:crate#1: 4
    walk: 89
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 1
  scc_shape: branching_win_dag
  scc_solution_irreversible_steps: 4
  note: SCC facts are evidence only; no aesthetic depth is claimed from them.
evidence_limits:
  - No unique route or object-instance identity beyond returned trace crate labels is claimed.
  - No aesthetic / difficulty score is claimed by the controller.
  - The fixed-anchor probe's material-normalization missing groups are expected because this slot intentionally has no B/S; they are not used as a negative evidence point.

## diagnostic_routing

hard_evidence:
  - Verify complete graph and event probes support push required, pull required, and pull count >= 2.
mechanism_scope:
  - Verify fixed P/L did not move and no B/S / sticky events appeared in reachable scan.
claim_hygiene:
  - Ensure the claim is teaching witness only, not challenge-depth.
taste_probes:
  - Does the revision reduce v1's lower push-side misread?
  - Is the lower section still too scripted, or acceptable for second-slot teaching?
scc_graph:
  - graph_fact: "complete graph; reachable_states=51; winning_states=1; pull_count_probe complete"
    neutral_meaning: "工具完整排除少于两次 pull 的胜路"
    player_facing_interpretation: "玩家必须执行两次连续拉箱才能完成下方目标"
    expected_verdict_effect: merit_for_teaching_claim
variant_family:
  - active curriculum revision from v1 human playtest
start_position:
  - single start position
prototype_specific_work:
  - invalid_goal_prune_check: not needed for this feedback pass; each target is tied to a separate push/pull witness.

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
candidate_relation: refined_from:RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1
why_not_archive_variant:
  This is an active curriculum candidate revision authorized by human playtest feedback, not reuse of a clean archive layout.

## attempt_log

serious_structural_attempts:
  - v2: lower crate moved one tile left and upper/upper-right cells blocked per human feedback; accepted for review_2 after pull-count probe passed.
local_repairs: []
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
    calibration_use: positive early/mid transition anchor; mechanism operation can be simple if it is purposeful and well positioned.
negative_anchor_none_found: no clean rejected archive entry exists yet for fixed P/L intro; RA_CAND_0003 is used as lower-bound teaching calibration.

## claim_last_review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable

## artifact_refs

- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_push_pull_required.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_pull_object_min2.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
