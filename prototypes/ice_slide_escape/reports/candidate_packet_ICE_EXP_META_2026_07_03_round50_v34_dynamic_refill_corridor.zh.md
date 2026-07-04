# ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor 候选包

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor
prototype: ice_slide_escape
status: review_candidate
design_mode: meta_first
review_language: zh
win_condition: ice_slide_escape_explicit_goal
interfaces:
  A: [0, 5]
  B: [11, 10]
  C: [22, 4]
  D: [11, 10]
interface_note: "B and D are the same bottom-edge exit cell; this is not claimed as 0035-style return-pressure value."
claimed_difficulty:
  base: "2+ / low 3"
  meta: "2+"
claimed_aesthetic_target: "4- to 4 candidate; request critic calibration"
```

## Layout

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...##......*.
#####.###..####.......#
####II#.#I..###......I#
####.......####.......#
####**.##..############
##########..###########
```

## Intended Reading

Base A->B keeps the clean two-target debt structure:

1. Borrow the left upper target ice; it is destroyed against the right target, leaving the left target in debt.
2. Borrow the right upper target ice; it is destroyed against the right wall pair, leaving both upper targets in debt.
3. Use the lower-right resource to refill the right target by short stop.
4. Use the lower-left resource to refill the left target by short stop, then leave through B.

Meta C->D uses a different target-debt object rather than reusing v8's base-reachable left firing face:

1. From C, push the right-side target ice left. This target ice is the projectile: it destroys the wall pair and then is destroyed against the still-filled main target, opening the connection while creating a new right-side target debt.
2. Enter the now-available lower parallel corridor from the opened side, not from the base side.
3. Push the latent right-side refill ice upward by `d2` to restore the right-side target.
4. Return through the shared main structure and exit at the old bottom exit D/B.

The point of the revision is to avoid v8's strict-exposure contradiction. In v8, base could manufacture the same "left target projectile + right target debt + firing face" state and see d6 early. In v34 the meta projectile and its refill corridor sit beyond the d6 wall pair, so base's complete reachable graph remains inside the early mechanism window.

## Evidence

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor.txt
base_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_base_explain.md
  start: [0, 5]
  goal: [11, 10]
  found: true
  cost: 30
  graph: complete
  reachable_states: 641
  returned_events:
    push_ice: 4
    ice_destroyed_d3: 2
    ice_stop_short_d2: 2
base_strict_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_base_strict.md
  result: pass
  start: [0, 5]
  goal: [11, 10]
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
  graph_complete: true
  forbidden_reachable_hits: none
meta_analysis:
  file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_meta_to_B_explain.md
  start: [22, 4]
  goal: [11, 10]
  found: true
  cost: 27
  graph: complete
  reachable_states: 10804
  returned_events:
    push_ice: 2
    ice_destroy_group_d6_plus: 1
    slide_restart_after_group: 1
    ice_destroyed_d3: 1
    ice_stop_short_d2: 1
meta_required_gate:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_meta_required.md
  result: pass
  start: [22, 4]
  goal: [11, 10]
  required_winning_events:
    - ice_destroy_group_d6_plus
    - ice_destroyed_d3
    - ice_stop_short:d2
  graph_complete: true
  no_winning_path_missing_required: true
interface_check:
  file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round50_v34_interface_goal_B11_ABCD.md
  declared_pairs:
    A_to_B: solved_cost_30
    C_to_D: solved_cost_27
  ignored_or_neutral_facts:
    - "B->D is cost 0 because B and D are the same physical cell."
    - "D-adjacent [10,10] -> B is cost 1; not used as a declared interface."
```

## Archive Taste Context

```yaml
positive_anchor_0034:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
  human_reviewed: true
  aesthetic_score: 4
  relevant_lesson: "meta should disrupt or rewrite a lower/shared structure, not only attach a key."
positive_anchor_0035:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
  human_reviewed: true
  aesthetic_score: 5
  relevant_lesson: "same-cell facts only score highly with return-pressure/fairness wrapper; v34 does not claim that bonus."
negative_anchor_0037:
  file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
  human_reviewed: true
  aesthetic_score: 1
  relevant_lesson: "do not overclaim repeated target-door stitching or interface convenience as meta insight."
```

## Known Risks For Review

- Meta has only two irreversible pushes. The right-side target debt is real and all winning paths must repay it, but critic should decide whether this is enough for the requested difficulty/aesthetic floor.
- B and D are the same physical exit. This is not used as an aesthetic claim.
- The right-side corridor is intentionally latent in base and active in meta; reviewer should check whether it reads as shared-structure payoff or as a separate attached module.

## Reviewer Questions

- Does the C-side target debt plus d6-opened lower corridor avoid the v21 "two-step key then walk" failure enough to support aesthetic 4?
- Is base's two-target debt chain strong enough to count as low 3 difficulty, or should it be held at 2+?
- Does the v8 failure boundary justify the different-object design, or does v34 lose too much of v8's tighter shared-object beauty?
