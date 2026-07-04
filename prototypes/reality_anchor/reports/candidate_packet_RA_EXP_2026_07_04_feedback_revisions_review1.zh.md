# Candidate Packet: 2026-07-04 feedback revisions review_1

```yaml
packet_id: RA_EXP_2026_07_04_feedback_revisions_review1
prototype: reality_anchor
review_iteration: review_1
review_scope: batch
candidate_versions:
  - RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6
  - RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3
  - RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3
  - RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4
source_feedback:
  - prototypes/reality_anchor/playtest_reviews.yml
  - human request: "这批关卡，同样需要你进行处理"
archive_eligibility_requested: human_pending
score_claim_allowed: false
```

## Prototype Context

```yaml
confirmed_rules:
  mechanic: Reality Anchor v0
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    P/L: push_pull_anchor; boundary shift changes push/pull side.
    B/S: box_sticky_anchor; boundary shift changes box/sticky material side.
    C: crate / box material object.
    M: sticky material block.
    G: target; must be covered by object or anchor cell, not player.
    box_to_sticky: crate crosses/enters sticky side and becomes sticky.
    sticky_to_box: sticky crosses/enters box side and becomes crate.
    sticky_merge: adjacent sticky cells join into a rigid sticky body.
    move_sticky_rigid: a merged sticky body moves as a unit.
  tool_boundary:
    - explain-layout proves solver trace, returned snapshots, complete graph when status is complete.
    - probe_fixed_anchor_candidate proves no winning bypass missing required event groups and no fixed-anchor movement if reachable scan is complete.
    - probe_dual_axis_candidate proves no winning bypass missing required event groups.
    - tool evidence does not prove player taste, insight uptake, or archive score.
```

## Batch Brief

```yaml
intended_role:
  fixed_anchor_revisions: early_to_mid_transition
  dual_lockstep_revision: mid_to_late_challenge_candidate
known_before: [K_runtime_smoke]
target: use both anchor kinds; fixed-anchor transition levels may isolate one anchor by walls if the fixed anchor still has functional effect.
difficulty_or_support_expectation:
  fixed_anchor_revisions: lower than previous high-difficulty batch, readable as mechanism introduction.
  dual_lockstep_revision: keep the interesting stacked-anchor/chain pressure, remove or explain redundant lower-right material/space.
human_feedback_gate:
  - Material transformation must be structurally necessary, not just a shorter route than ordinary boxes.
  - Right-side redundant space should be reduced.
  - DUAL_LOCKSTEP right-bottom M and empty cells must be explained or modified.
```

## Archive Taste Context

```yaml
examples:
  - candidate_id: RA_CAND_0001
    human_reviewed: true
    source_candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
    human_scores: {aesthetic: 4, difficulty: 4}
    human_comment: "机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，综合质量较高的好关。"
    relevance: positive anchor for dense dual-anchor coupling and visible player-facing conflict.
  - candidate_id: RA_CAND_0002
    human_reviewed: true
    source_candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
    human_scores: {aesthetic: 4, difficulty: 4}
    human_comment: "对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，具有较强洞见。"
    relevance: positive anchor for material/sticky movement breaking a player assumption.
negative_anchor_none_found:
  reason: clean human-reviewed archive currently has only two positive accepted anchors; human playtest rejects exist in temporary records but are not clean archive entries and must not be used for score calibration.
score_claim_allowed: false
critic_instruction: do not output numeric aesthetic/difficulty verdicts; use unscored target-fit language only.
```

## Candidate A: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6

```yaml
slot_brief:
  intended_role: early_to_mid_transition
  known_before: [K_runtime_smoke]
  target: fixed P/L plus movable B/S; sticky block first moves as a rigid pair, then splits by sticky_to_box.
  difficulty_or_support_expectation: compact, lower difficulty, human_pending.
mechanic_exposure_context:
  mechanic_window: fixed push_pull anchor, movable box_sticky anchor, sticky rigid movement, sticky_to_box split.
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - move_sticky_rigid
    - sticky_to_box
solve_instance:
  layout: |
    ###########
    #P#....@###
    #L##G#.B###
    ####.##S###
    ####m##.###
    ####M######
    ###########
  player_start: [7, 1]
  player_goal: null
  win_condition: all_targets_covered_by_objects
mechanism_scope:
  central:
    - fixed P/L supplies pull grammar without moving.
    - movable B/S sets the material boundary.
    - sticky pair must be lifted together, then top cell becomes box and separates.
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - move_sticky_rigid
    - sticky_to_box
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull
design_claim:
  player_insight: the two-block vertical sticky stack is useful only because it first behaves as one rigid handle and then can be split by the B/S boundary.
  causal_chain:
    - push B/S down to set the material boundary.
    - walk to the fixed P/L pull side.
    - pull the vertical sticky pair upward as a rigid body.
    - upper cell crosses to box side, detaches, and can be pulled onto the upper target while lower sticky remains on the lower target.
  why_not_execution: ordinary two-box replacement has no sticky rigid lift/split structure and complete search finds no win.
  falsification:
    - a winning path without B/S shift, pull, sticky_to_box, or rigid sticky movement.
    - an ordinary-box analog that solves.
evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6 --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_box_analog --max-states 400000 --graph-max-states 400000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_layout.txt RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6 push_pull 400000 100 default
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_layout.txt RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_core4 400000 100 box_sticky_anchor_shift=anchor_boundary_shift:box_sticky pull_event=pull_object sticky_to_box=sticky_to_box sticky_rigid_move=move_sticky_rigid
  solver_result:
    found: true
    cost: 9
    graph_status: complete
    reachable_states: 45
    winning_states: 13
    inputs: "down left up left left down down up up"
  trace_summary:
    - step: 1
      input: down
      events: [push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky]
    - step: 8
      input: up
      events: [pull_object:sticky#1, move_sticky_rigid, sticky_to_box:n1]
    - step: 9
      input: up
      events: [pull_object:crate#1]
  graph_or_counterfactual_evidence:
    ordinary_box_analog: complete_unsolved
    fixed_anchor_probe: complete_no_winning_bypass_missing_required_groups
    fixed_anchor_forbidden_reachable: no anchor_boundary_shift:push_pull
    core4_event_probe: complete_no_winning_bypass_missing B/S shift, pull, sticky_to_box, sticky_rigid_move
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_box_analog.md
    - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6.md
    - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_core4.md
  evidence_limits:
    - no object-identity necessity beyond event groups.
    - no numeric score claim.
```

## Candidate B: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3

```yaml
slot_brief:
  intended_role: early_to_mid_transition
  target: fixed P/L teaches pull-side use while movable B/S creates a sticky sidecar.
  difficulty_or_support_expectation: compact mechanism introduction.
mechanic_exposure_context:
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
solve_instance:
  layout: |
    #########
    ###@SB.##
    #P#..####
    #L#.M.C##
    ####GG###
    #########
  player_start: [3, 1]
  win_condition: all_targets_covered_by_objects
mechanism_scope:
  central:
    - P/L is fixed and never shifts.
    - B/S shift opens a material window.
    - C must be pulled into sticky side, merge with M, and then the sticky pair covers both targets.
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull
design_claim:
  player_insight: the sidecar C cannot simply be pushed as a box; it must become sticky so that the left M can act as a handle and the pair drops together.
  causal_chain:
    - shift B/S right.
    - place M on the left target.
    - pull C left through the sticky side to create M.
    - pull merged sticky pair upward, then push it down as a rigid pair onto the two targets.
  why_not_execution: both initial ordinary-box and postmerge ordinary-box analogs are complete unsolved; the transformation is not just a shorter route.
  falsification:
    - a winning path missing box_to_sticky or sticky_merge.
    - an ordinary-box analog win.
evidence:
  solver_result:
    found: true
    cost: 7
    graph_status: complete
    reachable_states: 52
    winning_states: 8
    inputs: "right down down right left up down"
  trace_summary:
    - step: 1
      input: right
      events: [push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky]
    - step: 5
      input: left
      events: [pull_object:crate#1, box_to_sticky:n1]
    - step: 6
      input: up
      events: [pull_object:sticky#1, move_sticky_rigid, sticky_merge:n1]
    - step: 7
      input: down
      events: [push_object:sticky#1, move_sticky_rigid]
  graph_or_counterfactual_evidence:
    initial_box_analog: complete_unsolved
    postmerge_box_analog: complete_unsolved
    fixed_anchor_probe: complete_no_winning_bypass_missing B/S shift, pull, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
    fixed_anchor_forbidden_reachable: no anchor_boundary_shift:push_pull
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_box_analog.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_postmerge_box_analog.md
    - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3.md
  evidence_limits:
    - short solution and transition role; no high-difficulty claim.
```

## Candidate C: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3

```yaml
slot_brief:
  intended_role: early_to_mid_transition
  target: fixed B/S as material boundary, movable P/L as access switch.
mechanic_exposure_context:
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
solve_instance:
  layout: |
    ##########
    #####SB###
    ####GG####
    ####M.C.##
    #...#...##
    #....@PL.#
    ##########
  player_start: [5, 5]
  win_condition: all_targets_covered_by_objects
mechanism_scope:
  central:
    - B/S is fixed and never shifts.
    - P/L shifts once to route the player to the top work face.
    - C must be converted and merged with M so the pair can be lifted onto the two targets.
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky
design_claim:
  player_insight: the fixed B/S boundary turns the sidecar C into the missing sticky half; only the merged sticky pair can be moved upward into the goal pocket.
  causal_chain:
    - shift P/L right to reach the upper work face.
    - push C left through the fixed B/S material boundary.
    - C becomes sticky and merges with M.
    - push the merged sticky pair upward to cover both goals.
  why_not_execution: initial and postmerge ordinary-box analogs are complete unsolved.
  falsification:
    - a win missing P/L shift or sticky rigid movement.
    - a win after replacing sticky structure with ordinary boxes.
evidence:
  solver_result:
    found: true
    cost: 8
    graph_status: complete
    reachable_states: 92
    winning_states: 16
    inputs: "right up right up left down left up"
  trace_summary:
    - step: 1
      input: right
      events: [push_object:push_pull_anchor, anchor_boundary_shift:push_pull]
    - step: 5
      input: left
      events: [push_object:crate#1, box_to_sticky:n1, sticky_merge:n1]
    - step: 8
      input: up
      events: [push_object:sticky#1, move_sticky_rigid]
  graph_or_counterfactual_evidence:
    initial_box_analog: complete_unsolved
    postmerge_box_analog: complete_unsolved
    fixed_anchor_probe: complete_no_winning_bypass_missing P/L shift, fixed B/S material effect, box_to_sticky, sticky_merge, sticky_rigid_move
    fixed_anchor_forbidden_reachable: no anchor_boundary_shift:box_sticky
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3_box_analog.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3_postmerge_box_analog.md
    - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3.md
  evidence_limits:
    - one P/L shift and short solution; should be judged as teaching/transition, not late challenge.
```

## Candidate D: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4

```yaml
slot_brief:
  intended_role: mid_to_late_challenge_candidate
  target: dual-anchor lockstep with compacted lower buffer after human feedback.
mechanic_exposure_context:
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky_or_sticky_to_box
    - sticky_merge
    - move_sticky_rigid
solve_instance:
  layout: |
    ###########
    ###.PL.####
    ##@BSGG####
    ###.MM...G#
    #####..####
    ###########
  player_start: [2, 2]
  win_condition: all_targets_covered_by_objects
mechanism_scope:
  central:
    - B/S and P/L both move.
    - B/S chain reaches far-right goal through material changes and force-chain pushes.
    - P/L is later pulled down to cover top goals.
    - exactly two lower buffer cells remain because the down-shifted sticky pair must occupy them.
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky_or_sticky_to_box
    - sticky_merge
    - move_sticky_rigid
design_claim:
  player_insight: the lower row is not storage clutter; it is the two-cell buffer that lets the sticky pair descend, normalize into crates, and later feed the far-right B/S chain while P/L is reserved for the final pull.
  causal_chain:
    - first B/S shift converts the front sticky to box and starts the local chain.
    - C/M pair is moved and merged, then P/L shifts to let the player access the down push.
    - B/S is pushed down, depositing the pair into the two-cell lower buffer.
    - repeated B/S pushes normalize the chain toward the far-right target.
    - final P/L pull covers the top goals.
  why_not_execution: removing the lower row, or leaving only either lower buffer cell, is complete unsolved; the old right-bottom M and right/left extra lower spaces were unnecessary and removed.
  falsification:
    - a win without any of the six event groups.
    - a win after deleting either of the two remaining lower buffer cells.
evidence:
  solver_result:
    found: true
    cost: 19
    graph_status: complete
    reachable_states: 296
    winning_states: 23
    inputs: "right down right left up up right down left down right right right up left down right up down"
  trace_summary:
    - step: 1
      input: right
      events: [push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1]
    - step: 3
      input: right
      events: [push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1]
    - step: 7
      input: right
      events: [push_object:push_pull_anchor, anchor_boundary_shift:push_pull]
    - step: 8
      input: down
      events: [push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid]
    - step: 14
      input: up
      events: [pull_object:crate#2]
    - step: 19
      input: down
      events: [pull_object:push_pull_anchor, anchor_boundary_shift:push_pull]
  graph_or_counterfactual_evidence:
    event_probe: complete_no_winning_bypass_missing all six required groups
    no_right_box_probe: complete_solved; old right-bottom M not needed
    no_right_box_no_right_space_probe: complete_solved; isolated right lower space not needed
    no_lower_row_probe: complete_unsolved
    lower_left_only_probe: complete_unsolved
    lower_right_only_probe: complete_unsolved
    lower_two_only_probe: complete_solved and promoted as v4
  evidence_refs:
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4.md
    - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_no_right_box.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_no_right_box_no_right_space.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_no_lower_row.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_lower_left_only.md
    - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3_lower_right_only.md
  evidence_limits:
    - no object-identity proof beyond event groups and layout counterfactuals.
    - v4 is a feedback revision candidate, not human accepted.
```

## Diagnostic Routing

```yaml
hard_evidence:
  - check all claimed required events are all-solution required.
  - check ordinary-box analog claims only for the fixed-anchor candidates where provided.
  - check fixed-anchor candidates have no reachable movement of the isolated fixed anchor.
mechanism_scope:
  - enforce human criterion: box/sticky conversion must be structurally necessary, not mere step savings.
claim_hygiene:
  - downgrade all player_insight and why_not_execution claims to "tool-supported preconditions" where appropriate.
taste_probes:
  - judge fixed-anchor candidates as transition/teaching levels, not high-score archive claims.
  - judge DUAL_LOCKSTEP_v4 for whether the compact lower buffer reads as purposeful after removing the redundant M/space.
scc_graph:
  - use only with graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect.
variant_family:
  - these are user-authorized feedback revisions of temporary playtest candidates; not archive-derived variants.
prototype_specific_work:
  - no interface_pair_policy declared.
```

## Prototype Specific Contracts

```yaml
interface_pair_policy:
  declared_interface_points: []
  target_pairs: []
  ignored_pair_classes: []
  risky_pair_classes: []
pair_diagnostics:
  ignored_pairs: []
  risky_pairs: []
```

## Archive Lineage Policy

```yaml
default: feedback_revision_authorized
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation:
  RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6: refined_from:RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5
  RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3: refined_from:RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v2
  RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3: refined_from:RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2
  RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4: refined_from:RA_EXP_2026_07_04_DUAL_LOCKSTEP_v3
why_not_archive_variant: no clean archive candidate was used as a design base; revisions answer direct human feedback on temporary playtest levels.
```

## Attempt Log

```yaml
serious_structural_attempts:
  - compressed three fixed-anchor transition levels by walling off right-side redundant space.
  - replaced DUAL_LOCKSTEP lower-right M and redundant lower spaces with walls.
local_repairs:
  - DUAL_LOCKSTEP no_right_box: solved, proving old lower-right M unnecessary.
  - DUAL_LOCKSTEP no_lower_row: unsolved, proving some lower buffer is necessary.
  - DUAL_LOCKSTEP lower_left_only and lower_right_only: both unsolved, proving both remaining lower cells are needed together.
abandoned_families: []
```

## Claim Last Review

```yaml
claim_last_review:
  mode: not_used
  facts_packet: not_split
  claim_packet: not_split
  read_order: not_applicable
```
