# ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour 候选包

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
prototype: ice_slide_escape
status: review_candidate
design_mode: meta_first
review_language: zh
win_condition: ice_slide_escape_explicit_goal
interfaces:
  A: [0, 5]
  B: [11, 10]
  C: [23, 4]
  D: [11, 10]
interface_note: "B and D are the same bottom-edge exit cell; this is treated only as shared exit reuse, not as same-cell or return-pressure bonus."
claimed_difficulty:
  base: "2"
  meta: "3"
claimed_aesthetic_target: "4 candidate; request critic calibration"
```

## Layout

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

## Intended Reading

Base A->B is an early-knowledge target-debt route:

1. Push the left upper target ice; it is destroyed against the next ice after a short corridor, creating one target debt.
2. Use the new x8/x9 detour to reach the lower refill face.
3. Push the lower ice upward by `d2` to restore the target, then exit through B.

Meta C->D uses the right target as a destructive opener and then forces the main target to become a second debt:

1. From C, push the right-side target ice left. It destroys the two-cell wall group, restarts, then is destroyed against the still-filled main target. This opens the upper connector but leaves the right-side target empty.
2. Refill the right-side target from below with a `d2` short stop.
3. The old x10 descent is sealed. To reach B, the player must push the main right target out of row 5 and use the x8/x9 detour instead.
4. Refill the main right target from below with another `d2` short stop, then leave through B.

The key revision from v34/v37 is the center offset: sealing x10 and opening the x8 detour makes the main target a real gate for meta, while base can still solve inside the early event set.

## Evidence

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt
base_strict_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict.md
  result: pass
  start: [0, 5]
  goal: [11, 10]
  cost: 24
  graph_complete: true
  reachable_states: 1853
  winning_states: 6
  required_winning_events:
    - ice_destroyed_d3
    - ice_stop_short
  forbidden_winning_events:
    - ice_destroy_group_d6_plus
    - ice_pass_through_d5
    - slide_restart_after_group
  forbidden_reachable_events:
    - ice_destroy_group_d6_plus
    - ice_pass_through_d5
    - slide_restart_after_group
  forbidden_reachable_hits: none
  solution_scc: "branching_win_dag, irreversible=2, forced=1/2"
  returned_core_events:
    - push_ice
    - ice_destroyed_d3
    - ice_stop_short:d2
base_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain.md
  found: true
  cost: 24
  graph_complete: true
  reachable_states: 1853
  solution_commitments: 2
  event_counts:
    push_ice: 2
    ice_destroyed_d3: 1
    ice_stop_short_d2: 1
meta_required_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required.md
  result: pass
  start: [23, 4]
  goal: [11, 10]
  cost: 36
  graph_complete: true
  reachable_states: 184683
  winning_states: 42
  required_winning_events:
    - ice_destroy_group_d6_plus
    - ice_destroyed_d3
    - ice_stop_short:d2
  no_winning_path_missing_required: true
  solution_scc: "branching_win_dag, irreversible=4, forced=0/4"
  returned_core_events:
    - ice_destroy_group_d6_plus:len2
    - slide_restart_after_group
    - ice_destroyed_d3
    - ice_stop_short:d2
    - ice_destroyed_d3
    - ice_stop_short:d2
meta_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain.md
  found: true
  cost: 36
  graph_complete: true
  reachable_states: 184683
  solution_commitments: 4
  endgame_tail_steps: 5
  event_counts:
    push_ice: 4
    ice_destroy_group_d6_plus_len2: 1
    slide_restart_after_group: 1
    ice_destroyed_d3: 2
    ice_stop_short_d2: 2
object_debt_probe:
  file: prototypes/ice_slide_escape/reports/object_debt_probe_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour.zh.md
  avoid_empty_target_21_5:
    complete_no_win: true
    explored_states: 619
  avoid_empty_target_9_5:
    complete_no_win: true
    explored_states: 3785
  control_avoid_empty_target_5_5:
    winning_path_found: true
```

## Archive Taste Context

```yaml
positive_anchor_0034:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
  human_reviewed: true
  aesthetic_score: 4
  relevant_lesson: "Meta should disrupt or rewrite a lower/shared structure, not only attach a key."
positive_anchor_0035:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
  human_reviewed: true
  aesthetic_score: 5
  relevant_lesson: "Same-cell facts score highly only with a return-pressure wrapper; v38 does not claim this bonus."
negative_anchor_0037:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
  human_reviewed: true
  aesthetic_score: 1
  relevant_lesson: "Do not overclaim repeated target-door stitching, interface convenience, or event count as insight."
```

## Known Risks For Review

- Base is intentionally clean and early; difficulty should be read as 2, not as a strong low3.
- B and D are the same physical exit. This is a neutral shared exit, not a claimed aesthetic bonus.
- Object-debt evidence proves target-cell debt for `[21,5]` and `[9,5]`, but not instance identity of individual ice blocks.
- The critic should decide whether the x10 seal / x8 detour revision is enough shared-structure rewrite to support aesthetic 4.

## Reviewer Questions

- Does forcing `[9,5]` target debt through the x10/x8 center offset address the v34 criticism that meta was a right-side self-contained module?
- Is meta difficulty 3 supported by four irreversible steps and two necessary target debts, despite the shared B/D exit?
- Does the clean base 2 plus meta 3 satisfy the requested difficulty split without overclaiming base?
