# Candidate: ICE_CAND_0027

```yaml
candidate_id: ICE_CAND_0027
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round8_cross_wall_dual_fill_proposal_ready_with_caveats
status: structural_redesign_needed
llm_candidate_strength: typical_wrong_meta_design_overclaimed
human_final_status: pending
archive_eligibility: raw_run_only
review_integrity: post_designer_correction
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - cross_temporal_role_exchange
  - remote_target_fill
archive_use:
  - negative_example
  - overclaim_calibration
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round8_cross_wall_dual_fill_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0027_v1_cross_wall_dual_fill_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_base_goal_B_required.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_meta_goal_D_required.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0027_v1_ABCD.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [0, 4]
  B: [0, 2]
  C: [13, 3]
  D: [13, 2]
base_instance:
  player_start: [0, 4]
  player_goal: [0, 2]
meta_instance:
  player_start: [13, 3]
  player_goal: [13, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
##############
#.....##.....#
......##......
#...IG#.....I.
.I.....#GI...#
#.....##.....#
##############
```

## Core Logic

```text
Base A->B is a compact two-fill route: [1,4] goes right by d5 pass-through and
restart to fill right target [8,4] against [9,4], then [4,3] fills left target
[5,3]. Meta C->D rereads the same separated structure from the right: [12,3]
goes left by d5 pass-through and restart to fill [5,3] against [4,3], then
[9,4] fills [8,4]. Post-review correction: this is a typical wrong meta design,
because the claimed role exchange is only mirrored same-logic reuse. It has clean
hard evidence, but base and meta are effectively the same two-step idea rather
than different logic chains.
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round8_cross_wall_dual_fill_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0027_v1_cross_wall_dual_fill_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0027_v1_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_base_goal_B_required.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0027_v1_meta_goal_D_required.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0027_v1_ABCD.md
```

## Retrieval Summary

```text
Post-review downgraded negative calibration. It physically separates A/B and C/D
and passes hard routing, but the design confuses mirrored same-logic reuse with
meta rereading. Base fills one target remotely then one locally; meta does the
same thing in the opposite direction. Use as a typical wrong-meta example: clean
solver/routing evidence and shared elements do not establish different base/meta
logic chains or real revisit insight.
```