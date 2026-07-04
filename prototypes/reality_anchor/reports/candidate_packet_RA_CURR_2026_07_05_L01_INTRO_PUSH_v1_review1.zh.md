# Candidate Packet: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1 review_1

candidate_version: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第一关 / intro

## prototype_context

confirmed_rules:
  - 无 P/L 锚点时全图默认 push world。
  - 无 B/S 锚点时全图默认 box world。
  - 箱子、黏块、锚点覆盖所有目标后胜利；主角站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - `@`: player
  - `C`: crate
  - `G`: goal
  - `push_object`: player pushes an adjacent movable object
tool_boundary:
  - runtime adapter / solver / graph / layout analyzer are available.
  - curated miner and PuzzleScript exporter are unavailable.

## slot_brief

intended_role: mechanic_witness
known_before:
  - none
target:
  - teach walking to empty floor
  - teach pushing a crate
  - teach crate-on-goal win condition
difficulty_or_support_expectation: very low / intro witness

## mechanic_exposure_context

mechanic_window: intro before anchors
allowed_exposure_through:
  - default push world
  - crate push
  - target coverage
claimed_core_events:
  - push_object

## design_target

aesthetic_score_target: not score-claimed; intro witness only
difficulty_score_target: not score-claimed; expected very low
target_role_notes: This slot values clarity over depth.

## solve_instance

layout:

```text
######
#@.CG#
######
```

player_start: [1, 1]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - walk into empty floor
  - push crate onto goal
allowed_support:
  - none
incidental_allowed:
  - post-win equivalent winning states
required_winning_path_events:
  - push_object
forbidden_winning_path_events:
  - pull_object
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
  玩家只需要理解三个最基础事实：主角可以走到空地、从箱子后方推动箱子、箱子覆盖目标即胜利。
causal_chain:
  1. 向右走到箱子左侧。
  2. 再向右推动箱子。
  3. 箱子进入目标格，触发胜利。
why_not_execution:
  这是 witness 关，不追求复杂洞见；价值是把“移动”和“推动箱子”分成两个连续动作。
falsification:
  若最短解不是两步、无需 push_object 即可胜利、出现任何锚点/材料事件，或布局解析出 P/L、B/S、M，则不符合第一关槽位。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_layout.txt --id RA_CURR_2026_07_05_L01_INTRO_PUSH_v1 --title "Intro push v1" --role mechanic_witness --support high --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_layout.txt RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_push_required 300000 20 "push_event=push_object"`
solver_result:
  found: true
  cost: 2
  depth: 2
  inputs: `right right`
trace_summary:
  - step 1 `right`: walk
  - step 2 `right`: push_object:crate#1; crate covers goal and wins
target_events:
  returned_solution_has_push_object: true
  returned_solution_has_forbidden_events: false
object_or_instance_evidence:
  object identity not claimed
winning_path_event_checks:
  push_event_required:
    status: complete
    found_bypass_missing_push: false
    explored_states: 5
reachable_event_exposure:
  graph_status: complete
  reachable_states: 5
  legal_transitions: 7
  forbidden_events_seen_in_returned_solution: false
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 3
  note: multiple winning states are post-win / equivalent minimal witness states, not claimed as design depth.
evidence_limits:
  - No object-instance necessity is claimed.
  - No aesthetic or difficulty score is claimed by the controller.

## diagnostic_routing

hard_evidence:
  - Does complete graph and event probe support push as necessary?
mechanism_scope:
  - Ensure no anchor/material event is smuggled into this intro slot.
claim_hygiene:
  - Check that the claim is only an intro witness claim.
taste_probes:
  - Is the witness too trivial for the requested first slot, or appropriately minimal?
scc_graph:
  - graph_fact: complete graph, 5 reachable states, one forced progress commitment
    neutral_meaning: minimal witness topology
    player_facing_interpretation: the player has one obvious affordance after walking right
    expected_verdict_effect: none_or_merit_for_intro
variant_family:
  - fresh small intro witness, not an archive variant
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
  The layout and causal chain are a fresh minimal intro witness. Archive entries were read only for calibration.

## attempt_log

serious_structural_attempts:
  - v1: one empty floor before one crate and one target; accepted for evidence review because it directly matches the intro slot.
local_repairs:
  - changed role from invalid `tutorial` CLI value to `mechanic_witness`.
abandoned_families: []

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0003
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: lower-bound/simple teaching anchor; simplicity is acceptable when the slot is teaching.
  - candidate_id: RA_CAND_0004
    status: accepted
    aesthetic_score: 4
    difficulty_score: 3
    human_comment: 下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    calibration_use: positive transition anchor; mechanism use should remain compact and purposeful.
negative_anchor_none_found: no clean rejected archive entry exists; non-archive human feedback warns against raising difficulty through goal-position hardening without adding mechanism beauty.

## claim_last_review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable

## artifact_refs

- prototypes/reality_anchor/reports/fresh_design_claim_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_push_required.md
