# Candidate: ICE_CAND_0025

```yaml
candidate_id: ICE_CAND_0025
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round6_walled_D_gated_role_flip_proposal_ready_with_caveats
status: structural_redesign_needed
llm_candidate_strength: overclaimed_functional_meta_connector
human_final_status: pending
archive_eligibility: raw_run_only
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d6_destroy_group
  - restart_counting
  - boundary_disappear
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - meta_reinterpretation
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round6_walled_D_gated_role_flip_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0025_v5_gated_role_flip_isolated_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0025_v5_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0025_v5_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0025_v5_base_goal_B_required.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0025_v5_meta_goal_D_required.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0025_v5_ABCD_D_walled.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [0, 5]
  B: [0, 2]
  C: [16, 5]
  D: [16, 2]
  D_note: D is initially wall; valid explicit goal, invalid player_start.
base_instance:
  player_start: [0, 5]
  player_goal: [0, 2]
meta_instance:
  player_start: [16, 5]
  player_goal: [16, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
#################
#################
.....##.I.......#
#....##.#########
#....##.#########
.....IG#......I..
#################
```

## Core Logic

```text
Base A->B is a functional witness: [5,5] moves right d1 into target [6,5]
using [7,5] as the short-stop wall, then the player exits through the left
shaft. Meta C->D reinterprets the same local trio: [14,5] moves left d6+,
destroys [7,5], restarts, and stops on [6,5] against [5,5]. Destroying [7,5]
also opens the [7,5]->[7,2] stand route for [8,2] to destroy the D wall.
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round6_walled_D_gated_role_flip_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0025_v5_gated_role_flip_isolated_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0025_v5_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0025_v5_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0025_v5_base_goal_B_required.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0025_v5_meta_goal_D_required.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0025_v5_ABCD_D_walled.md
```

## Retrieval Summary

```text
Post-delivery designer feedback downgraded this from proposal: it is too close
to the 0020 functional connector ecology and too simple for further production.
Use only as negative calibration for overvaluing clean meta flow. Base is a
simple witness; meta has a compact role flip and clean full-perimeter routing,
but the result is still a small process puzzle. D is wall-goal-only, not a legal
start.
```