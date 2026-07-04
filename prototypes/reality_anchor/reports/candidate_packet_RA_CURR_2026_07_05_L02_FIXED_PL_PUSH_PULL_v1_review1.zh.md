# Candidate Packet: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1 review_1

candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第二关 / 固定 P/L 推拉教学

## prototype_context

confirmed_rules:
  - P/L 是推拉锚点；P 侧使用 push，L 侧使用 pull。
  - P/L 可移动，但本槽位要求固定；本候选用墙隔离，完整 reachable scan 检查无 anchor shift。
  - 无 B/S 锚点时全图默认 box world。
  - 箱子、黏块、锚点覆盖所有目标后胜利；主角站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - `P/L`: fixed vertical push/pull anchor
  - `C`: crate
  - `G`: goal
  - `push_object`: push-side force
  - `pull_object`: pull-side force
tool_boundary:
  - runtime adapter / solver / graph / layout analyzer are available.
  - curated miner and PuzzleScript exporter are unavailable.

## slot_brief

intended_role: mechanic_witness
known_before:
  - walk
  - crate push
  - target coverage
target:
  - introduce fixed P/L partition
  - require one push-side crate placement
  - require one pull-side crate placement
difficulty_or_support_expectation: low / two witness combo

## mechanic_exposure_context

mechanic_window: fixed push/pull anchor introduction
allowed_exposure_through:
  - default box world
  - fixed P/L partition
  - push_object
  - pull_object
claimed_core_events:
  - push_object
  - pull_object

## design_target

aesthetic_score_target: not score-claimed; teaching witness
difficulty_score_target: not score-claimed; expected low
target_role_notes: Use two tiny tasks to contrast push and pull without moving the anchor.

## solve_instance

layout:

```text
########
#@CG####
#...#P##
#...#L##
#.CG.###
########
```

player_start: [1, 1]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - fixed P/L region split
  - push upper crate onto upper target
  - pull lower crate onto lower target
allowed_support:
  - walking between the two witness cells
incidental_allowed:
  - local reposition before the lower pull
required_winning_path_events:
  - push_object
  - pull_object
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
  玩家看到同一关内上下两个小任务：P 上方区域仍按普通推箱子处理，L 下方区域需要站在目标上向右走、把左侧箱子拉到目标上。P/L 本身不移动，只负责把推/拉语义分区。
causal_chain:
  1. 在上方 push side，向右推动上方箱子覆盖上目标。
  2. 走到下方 pull side 的下目标上。
  3. 向右移动，拉动左侧箱子覆盖下目标。
why_not_execution:
  这是两个 witness 的组合，重点不是搜索难度，而是让玩家在同一个固定锚点下连续比较 push 和 pull 的操作差异。玩家站在下目标上不算通关，必须把箱子拉到目标上。
falsification:
  若存在缺少 push_object 或 pull_object 的胜路、P/L 可达移动、出现任何 B/S 或材料事件，或删除任一目标后不降低核心事件需求，则该设计不符合第二关槽位。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_layout.txt --id RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1 --title "Fixed P/L push-pull v1" --role mechanic_witness --support high --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_layout.txt RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_push_pull_required 300000 30 "push_event=push_object" "pull_event=pull_object"`
  - reachable event scan inline script -> `reachable_scan_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1.md`
  - `explain-layout` no-top-goal and no-bottom-goal counterfactuals with `--write`
solver_result:
  found: true
  cost: 6
  depth: 6
  inputs: `right down down right down right`
trace_summary:
  - step 1 `right`: `push_object:crate#1`; upper crate covers upper target
  - steps 2-5: walk to lower target
  - step 6 `right`: `pull_object:crate#2`; lower crate covers lower target and wins
target_events:
  returned_solution_has_push_object: true
  returned_solution_has_pull_object: true
  returned_solution_has_forbidden_events: false
object_or_instance_evidence:
  object identity not claimed
winning_path_event_checks:
  push_and_pull_required:
    status: complete
    found_bypass_missing_push_or_pull: false
    explored_states: 108
  push_required_individual:
    status: complete
    found_bypass_missing_push: false
  pull_required_individual:
    status: complete
    found_bypass_missing_pull: false
reachable_event_exposure:
  graph_status: complete
  reachable_states: 66
  legal_transitions: 150
  forbidden_anchor_or_material_hits: none
  reachable_event_counts:
    walk: 137
    push_object:crate#1: 4
    pull_object:crate#2: 6
    push_object:crate#2: 3
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 1
  no_top_goal:
    shortest_cost: 6
    shortest_events: [walk, pull_object]
    conclusion: top target is not invalid; deleting it removes the need for push.
  no_bottom_goal:
    shortest_cost: 1
    shortest_events: [push_object]
    conclusion: bottom target is not invalid; deleting it removes the need for pull.
evidence_limits:
  - No object-instance necessity is claimed.
  - The lower crate can be pushed in reachable space, but all wins still require the lower pull event.
  - No aesthetic or difficulty score is claimed by the controller.

## diagnostic_routing

hard_evidence:
  - Does complete graph and event probe support both push and pull as required?
  - Does reachable scan support fixed P/L with no anchor shift?
mechanism_scope:
  - Ensure no B/S or material event is present.
claim_hygiene:
  - Check that this is a two-witness intro claim, not a deep puzzle claim.
taste_probes:
  - Is the layout compact enough for an intro witness?
  - Does standing on the lower target before pull help teach that player-on-goal is not enough?
scc_graph:
  - graph_fact: complete graph, 66 reachable states, winning states=1, forced viable prefix 2/2
    neutral_meaning: small deterministic witness structure
    player_facing_interpretation: after exploring, the two productive commitments are the upper push and lower pull
    expected_verdict_effect: merit_for_intro_or_none
variant_family:
  - fresh fixed-P/L witness, not an archive variant
start_position:
  - single start position; no alternative starts claimed
prototype_specific_work:
  - invalid_goal_prune_check: checked by goal deletion counterfactuals; both targets retained

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
  Archive entries were used only for calibration; this is a fresh fixed-P/L witness.

## attempt_log

serious_structural_attempts:
  - v1a: vertical fixed P/L plus two witness tasks, but reachable scan revealed anchor movement.
  - v1b: moved P/L into a fully walled pocket; retained the same push/pull witness with no reachable anchor shift.
local_repairs:
  - removed unused right-side space and reran full evidence.
  - ran no-goal counterfactuals to avoid invalid targets.
abandoned_families:
  - horizontal P/L split with side-by-side rooms; rejected as too much walking for the same teaching point.

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0003
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: teaching lower-bound; compact witness can be accepted when it directly teaches the slot mechanism.
  - candidate_id: RA_CAND_0004
    status: accepted
    aesthetic_score: 4
    difficulty_score: 3
    human_comment: 下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    calibration_use: positive transition anchor; mechanism use should be compact and purposeful.
negative_anchor_none_found: no clean rejected archive entry exists; non-archive human feedback warns against incidental mechanics and goal-position hardening.

## claim_last_review

mode: not_used
facts_packet: not_applicable
claim_packet: not_applicable
read_order: not_applicable

## artifact_refs

- prototypes/reality_anchor/reports/fresh_design_claim_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_push_pull_required.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_no_top_goal.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v1_no_bottom_goal.md
