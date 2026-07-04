# Candidate Packet: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1 review_1

candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1
review_iteration: review_1
prototype: reality_anchor
slot: 第三关 / 固定 P/L handoff 应用

## prototype_context

confirmed_rules:
  - P/L 是推拉锚点；P 侧使用 push，L 侧使用 pull。
  - 本槽位要求固定 P/L；本候选用墙袋隔离，并用完整 reachable scan 排除 anchor shift。
  - 无 B/S 锚点时全图默认 box world。
  - 箱子、黏块、锚点覆盖所有目标后胜利；主角站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - `P/L`: fixed vertical push/pull anchor
  - `C`: the single crate
  - `G`: the single goal
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
  - fixed P/L can make push and pull regions
target:
  - use fixed P/L boundary for a small handoff
  - require the same crate to be pushed first and pulled later
difficulty_or_support_expectation: low-mid / early application

## mechanic_exposure_context

mechanic_window: fixed P/L application
allowed_exposure_through:
  - fixed P/L partition
  - push_object
  - pull_object
claimed_core_events:
  - push_object
  - pull_object

## design_target

aesthetic_score_target: not score-claimed; early application witness
difficulty_score_target: not score-claimed; expected low-mid
target_role_notes: The design should be one shared crate handoff, not two independent witnesses.

## solve_instance

layout:

```text
########
########
#@C.#P##
#..G#L##
#.....##
########
```

player_start: [1, 2]
player_goal: null
win_condition: all_targets_covered_by_objects

## mechanism_scope

central:
  - push the only crate in push side
  - reposition into pull side
  - pull the same crate onto the only goal
allowed_support:
  - walking between push position and pull position
incidental_allowed:
  - local exploration that pushes/pulls the same crate but does not win
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
  同一个箱子不能直接推到目标；玩家需要先在 push side 把箱子推到目标正上方，再进入 pull side 站到目标上，从下方拉箱子覆盖目标。
causal_chain:
  1. 在 push side 向右推同一个箱子一格，准备出可被下拉的位置。
  2. 走到 pull side 的目标格。
  3. 向下移动，拉动身后的同一个箱子，让它覆盖目标。
why_not_execution:
  相比第二关的两个独立 witness，这里只有一个箱子和一个目标；玩家必须理解“先推到可拉位置，再用 pull 完成覆盖”的 handoff，而不是分别完成两个互不相关的小任务。
falsification:
  若存在缺少 push 或 pull 的胜路、P/L 可达移动、或出现材料事件，则该设计不符合第三关槽位。若最短解可通过纯 push 从上方覆盖目标，也说明目标上方封锁失败。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_layout.txt --id RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1 --title "Fixed P/L handoff v1" --role mechanic_witness --support medium --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_layout.txt RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_push_pull_required 300000 30 "push_event=push_object" "pull_event=pull_object"`
  - reachable event scan inline script -> `reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1.md`
solver_result:
  found: true
  cost: 4
  depth: 4
  inputs: `right down right down`
trace_summary:
  - step 1 `right`: `push_object:crate#1`; the only crate moves to the square above the goal
  - steps 2-3: walk to the goal in pull side
  - step 4 `down`: `pull_object:crate#1`; the same crate covers the goal and wins
target_events:
  returned_solution_has_push_object: true
  returned_solution_has_pull_object: true
  returned_solution_has_forbidden_events: false
object_or_instance_evidence:
  - There is exactly one crate, so returned push and pull events necessarily apply to the same crate.
winning_path_event_checks:
  push_and_pull_required:
    status: complete
    found_bypass_missing_push_or_pull: false
    explored_states: 98
  push_required_individual:
    status: complete
    found_bypass_missing_push: false
  pull_required_individual:
    status: complete
    found_bypass_missing_pull: false
reachable_event_exposure:
  graph_status: complete
  reachable_states: 88
  legal_transitions: 203
  forbidden_anchor_or_material_hits: none
  reachable_event_counts:
    walk: 186
    push_object:crate#1: 5
    pull_object:crate#1: 12
graph_or_counterfactual_evidence:
  graph_status: complete
  winning_states: 10
  note: multiple winning states are equivalent post-cover states after the same single-crate handoff; no uniqueness claim is made.
evidence_limits:
  - No unique input sequence is claimed.
  - No aesthetic or difficulty score is claimed by the controller.

## diagnostic_routing

hard_evidence:
  - Does complete event probe support both push and pull as required?
  - Does single-crate layout support same-object handoff?
  - Does reachable scan support fixed P/L with no anchor shift?
mechanism_scope:
  - Ensure no B/S or material event is present.
claim_hygiene:
  - Check that this is an early application claim, not a high-depth puzzle claim.
taste_probes:
  - Does this feel like a real handoff beyond the second level's two independent witness tasks?
  - Is the wall-pocketed P/L readable enough as a fixed boundary?
scc_graph:
  - graph_fact: complete graph, 88 reachable states, forced viable prefix 2/2
    neutral_meaning: small deterministic handoff
    player_facing_interpretation: the productive commitments are first moving the crate into pullable alignment, then pulling it onto goal
    expected_verdict_effect: merit_for_slot_or_none
variant_family:
  - fresh fixed-P/L single-crate handoff
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
  Archive entries were used only for calibration; this is a fresh fixed-P/L handoff.

## attempt_log

serious_structural_attempts:
  - v1a: open upper row allowed pure push from above into the target; rejected.
  - v1b: top row closed, but P/L still reachable by pull; rejected.
  - v1c: P/L moved into wall pocket; push-only bypass removed and no anchor shift reachable.
local_repairs:
  - closed the cell above the target to forbid direct downward push.
  - sealed P/L behind a wall column to make it truly fixed.
abandoned_families: []

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0003
    status: accepted
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: teaching lower-bound; compact mechanism handoff can be acceptable when it directly teaches a slot.
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

- prototypes/reality_anchor/reports/fresh_design_claim_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1_push_pull_required.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v1.md
