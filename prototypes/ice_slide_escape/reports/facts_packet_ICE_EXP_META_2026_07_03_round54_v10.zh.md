# Facts Packet: ICE_EXP_META_2026_07_03_round54_v10

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round54_v10_two_target_late_reseal
prototype: ice_slide_escape
meta_design_mode: meta_first_design
claim_last_review: true
facts_only: true
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## Layout And Interfaces

```text
#######.##.##
#######.##I##
#######.##.##
#######.##.##
#######.##.##
#...#....#.##
..#.*....*.##
#...#.....###
######.##.###
######.##...#
.#..........#
#############
#############
```

```yaml
interfaces:
  A: [0, 6]
  B: [7, 0]
  C: [10, 0]
  D: [0, 10]
target_pairs:
  base: A -> B
  meta: C -> D
initial_ice:
  target_ice:
    - [4, 6]
    - [9, 6]
  off_target_ice:
    - [10, 1]
win_condition: ice_slide_escape_explicit_goal
```

All four interface cells are distinct edge cells and valid starts. D is initially standable; the actual D door is the wall at `[1,10]`.

## Evidence Summary

```yaml
base_instance:
  start: [0, 6]
  goal: [7, 0]
  returned_solution:
    ref: prototypes/ice_slide_escape/reports/layout_analysis_round54_v10_base_explain.md
    found: true
    cost: 19
    graph: complete
    reachable_states: 847
    winning_states: 1
    non_walk_events:
      - push_ice
      - ice_blocks_ice_no_chain_push
      - ice_rebound_d4
  all_solution_checks:
    no_late_reachable:
      ref: prototypes/ice_slide_escape/reports/start_comparison_round54_v10_base_no_late.md
      result: pass
      required_winning_events: [ice_rebound_d4]
      forbidden_reachable_events:
        - ice_pass_through_d5
        - slide_restart_after_group
        - ice_destroy_group_d6_plus
    forbidden_winning:
      ref: prototypes/ice_slide_escape/reports/start_comparison_round54_v10_base_forbidden_winning.md
      result: pass
      forbidden_winning_events:
        - ice_pass_through_d5
        - slide_restart_after_group
        - ice_destroy_group_d6_plus

meta_instance:
  start: [10, 0]
  goal: [0, 10]
  returned_solution:
    ref: prototypes/ice_slide_escape/reports/layout_analysis_round54_v10_meta_explain.md
    found: true
    cost: 34
    graph: complete
    reachable_states: 3040
    winning_states: 1
    non_walk_events:
      - ice_pass_through_d5:len2
      - slide_restart_after_group
      - ice_rebound_d4
      - ice_destroy_group_d6_plus:len1
  all_solution_checks:
    required_d6_restart_d4:
      ref: prototypes/ice_slide_escape/reports/start_comparison_round54_v10_meta_required.md
      result: pass
      required_winning_events:
        - ice_destroy_group_d6_plus
        - slide_restart_after_group
        - ice_rebound_d4
    required_d5_d6_d4:
      ref: prototypes/ice_slide_escape/reports/start_comparison_round54_v10_meta_required_d5_d6_d4.md
      result: pass
      required_winning_events:
        - ice_pass_through_d5
        - ice_destroy_group_d6_plus
        - slide_restart_after_group
        - ice_rebound_d4

interface_scan:
  ref: prototypes/ice_slide_escape/reports/round54_v10_edge_goal_scan.md
  scanned_edge_goals: 48
  risky_pairs: 0
  hit_counts:
    target_pair: 2
    ignored_internal_reverse: 1
  target_pairs_found:
    - A -> B
    - C -> D
  ignored_internal_reverse_pairs:
    - pair: C -> B
      cost: 21
      verdict_effect: none
```

## Returned Trace Facts

Base returned trace:

- Step 6: T1 at `[4,6]` is pushed right; it rebounds by d4 using T2 at `[9,6]` as the right obstacle and lands at `[7,6]`, opening `[4,6]`.
- Step 13: the same ice is pushed left; it rebounds by d4 using the left wall as obstacle and returns to `[4,6]`, after which B is reachable.

Meta returned trace:

- Step 1: the off-target ice at `[10,1]` is pushed down; it uses `ice_pass_through_d5:len2` plus restart and lands at the lower row as a later D-door resource.
- Step 7: T2 at `[9,6]` is pushed left; d4 rebound places it at `[6,6]` and opens the `[9,6]` vertical channel.
- Step 14: the lower d5 product is pushed left; d6 destroys the `[1,10]` D-door wall and opens access to D.
- Step 24: T2 is pushed right; d4 rebound returns it to `[9,6]`, restoring target coverage before the final walk to D.

## Evidence Limits

- Object identities are indistinguishable in the solver. Position roles above are trace-level facts, not per-object identity proofs.
- Required event probes prove all winning paths include the listed event patterns; they do not by themselves prove every coordinate role without the returned trace snapshots.
- There are no configured counterfactual models for this prototype.

## Archive Taste Context

```yaml
anchors:
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    human_aesthetic_score: 5
    human_difficulty_score: 3
    relevance: strong positive meta reuse anchor
    human_basis: >
      Human accepted it as a strong meta case because base/meta share middle space
      and many elements; right-side base-time lure pays off on revisit.
  - candidate_id: ICE_CAND_0019
    human_reviewed: true
    human_aesthetic_score: 4
    human_difficulty_score: 4
    relevance: delayed hidden-stopper / compact causal chain anchor
    human_basis: >
      Human accepted v4 after removing an immediate target reward so an early move
      only reveals its value later as a hidden stopper.
  - candidate_id: ICE_CAND_0034
    human_reviewed: true
    human_aesthetic_score: 4
    human_difficulty_score: 2
    relevance: lower positive meta-first anchor
    human_basis: >
      Human accepted it because meta left-push disturbs and rewrites the lower
      structure instead of replaying base's simple d1+d4.
  - candidate_id: ICE_CAND_0037
    human_reviewed: true
    human_aesthetic_score: 1
    human_difficulty_score: 2
    relevance: negative anchor for repeated target-door stitching and interface spillover
    human_basis: >
      Human rejected it as three repeated, insight-poor target-door steps with
      fatal A->D spillover.
score_claim_allowed: true
```

Archive entries are used only for critic calibration and failure-mode comparison, not as layout bases.
