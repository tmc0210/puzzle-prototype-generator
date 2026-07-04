# ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock 候选探针包

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock
prototype: ice_slide_escape
status: candidate_probe_with_known_exposure_caveat
design_mode: meta_first
review_language: zh
win_condition: ice_slide_escape_explicit_goal
interfaces:
  A: [0, 5]
  B: [10, 10]
  C: [10, 10]
  D: [22, 5]
interface_note: B and C are the same physical bottom-edge cell.
base_exposure_claim:
  winning_paths: no ice_destroy_group_d6_plus and no ice_pass_through_d5
  reachable_graph: known_caveat_nonwinning_d6_reachable
claimed_difficulty:
  base: "2+"
  meta: "3+ to 4-"
claimed_aesthetic_target: "review whether this can support 4 despite exposure caveat"
```

## Layout

```text
#######################
#######################
#######################
####.##################
####.##################
.....*...*...##........
####..###..############
####II###I..###########
####.......############
####**...#.############
##########.############
```

Legend: `#` wall, `.` floor, `*` target with ice, `I` ice.

## Intended Reading

Base A->B:

1. Push the left target ice right into the right target ice. The moving ice is
   destroyed, leaving the left target in debt.
2. Push the right target ice right into the short wall pair. This opens the
   lower refill room and leaves the right target in debt.
3. Refill the right target from the lower-right ice by short stop.
4. Refill the left target from the lower-left ice by short stop, then leave
   through the bottom edge.

Meta C->D:

1. From the old bottom exit, enter the same chamber from below/right and push
   the right target ice left into the left target ice. This creates a right
   target debt while preserving the left target as a later projectile.
2. Move the side ice upward by d4 rebound to reveal the left-side firing face.
3. Push the left target ice right. Because the right target is empty, the same
   wall pair that was a stopper in base becomes an internal d6 destruction
   gate, opening the right edge.
4. Refill both targets from the lower room and leave through D.

This is intended as a target-debt chain rather than a d4+d3 connector splice:
the meta route changes which target is debt, which target is projectile, and
which lower ice is a refill resource.

## Evidence

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_layout.txt
base_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base.md
  start: [0, 5]
  goal: [10, 10]
  found: true
  cost: 29
  graph: complete
  reachable_states: 4393
  winning_states: 4
  returned_events:
    push_ice: 4
    ice_destroyed_d3: 2
    ice_stop_short_d2: 2
meta_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta.md
  start: [10, 10]
  goal: [22, 5]
  found: true
  cost: 47
  graph: complete
  reachable_states: 10854
  winning_states: 2
  returned_events:
    push_ice: 5
    ice_destroyed_d3: 1
    ice_rebound_d4: 1
    ice_destroy_group_d6_plus: 1
    slide_restart_after_group: 1
    ice_stop_short_d2: 2
base_winning_path_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_winning_only.md
  result: pass
  required_winning_events:
    - ice_destroyed_d3
    - ice_stop_short
  forbidden_winning_events:
    - ice_destroy_group_d6_plus
    - ice_pass_through_d5
  no_missing_required_or_forbidden_winning_path: true
base_reachable_exposure_caveat:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_base_required.md
  result: fail
  forbidden_reachable_events:
    - ice_destroy_group_d6_plus
  forbidden_reachable_hits:
    - ice_destroy_group_d6_plus:len2
  witness: prototypes/ice_slide_escape/reports/round44_event_witness.ts was used to identify a non-winning misuse of the right refill ice.
meta_required_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta_required.md
  result: pass
  required_winning_events:
    - ice_destroy_group_d6_plus
    - ice_destroyed_d3
    - ice_stop_short
meta_required_d6:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_meta_required_d6_only.md
  result: pass
interface_checks:
  goal_B_file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_B.md
  goal_D_file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_interface_ABCD_goal_D.md
  declared_pairs:
    A_to_B: solved_cost_29
    C_to_D: solved_cost_47
  caveats:
    - C_to_B is cost 0 because B and C are the same physical cell.
    - D_to_D is cost 0 by explicit goal identity and is not a target pair.
```

## Known Caveat

This packet does not claim a clean forbidden-if-seen-anywhere base exposure
gate. From A, the complete reachable graph can trigger a non-winning d6 by
misusing the right refill ice as a temporary route opener, then refilling the
left target while the right target remains empty. The base winning-path gate is
clean, but the stricter reachable-exposure gate is not.

Reviewer should decide whether this caveat is blocking for the current brief.
If the brief requires complete base reachable graph to exclude d6, this version
must be held rather than submitted.

## Archive Taste Context

```yaml
positive_anchor_0034:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
  human_reviewed: true
  aesthetic_score: 4
  relevant_lesson: "meta disrupts/reuses a lower structure rather than cloning base."
positive_anchor_0035:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
  human_reviewed: true
  aesthetic_score: 5
  relevant_lesson: "same-cell re-entry can be beautiful when return pressure makes the old exit become a new entrance; do not template the geometry."
negative_anchor_0037:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
  human_reviewed: true
  aesthetic_score: 1
  relevant_lesson: "repeated target-door stitching and interface spillover are decisive failures."
```

## Reviewer Questions

- Is the non-winning base d6 exposure a hard blocker under this brief?
- If judged only as a player-facing base route plus meta route, does the target
  debt chain feel like a compact reinterpretation rather than a stitched pair
  of local mechanisms?
- Does B=C same-cell return read closer to the accepted 0035-style old-exit
  return pressure, or does it feel like a convenience patch here?
- Does the lower anchor/refill room feel meaningfully coupled, or too much like
  extra machinery around the two target debts?
