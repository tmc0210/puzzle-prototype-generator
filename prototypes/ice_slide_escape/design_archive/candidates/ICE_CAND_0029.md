# Candidate: ICE_CAND_0029

```yaml
candidate_id: ICE_CAND_0029
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round9_coupled_vertical_debt_structural_redesign_needed
status: structural_redesign_needed
llm_candidate_strength: overaccepted_weak_meta_candidate
human_final_status: pending
archive_eligibility: raw_run_only
review_integrity: post_designer_correction
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - restart_counting
  - target_debt_refill
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - remote_target_fill
  - coupled_stopper_refill
archive_use:
  - negative_example
  - overclaim_calibration
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round9_coupled_vertical_debt_structural_redesign_needed.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0029_v2_coupled_vertical_debt_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/required_count_probe_ICE_CAND_0029_v2.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0029_v2_ABCD.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [0, 7]
  B: [0, 1]
  C: [16, 7]
  D: [16, 6]
base_instance:
  player_start: [0, 7]
  player_goal: [0, 1]
meta_instance:
  player_start: [16, 7]
  player_goal: [16, 6]
win_condition: ice_slide_escape_explicit_goal
```

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######*.###
#.....######..###
#...I.######I....
......######.....
#################
```

## Core Logic

```text
Base A->B is a light two-push local target-debt setup on the left. It should not
be described as a strong application by itself.
Meta C->D rereads the same initial layout from the right: [12,3]* is launched
left through central [6,3]* by d5/restart to fill [4,3]. Then [12,4]* refills
[12,3], and [12,6] refills [12,4] while using the newly placed [12,3] ice as
the final stopper. The review loop initially overvalued this as a caveated
proposal because it was better than connector / mirrored role-flip failures.
Post-designer correction: this should be rejected, not held as a proposal. Base
leaks d5 knowledge too strongly, both base and meta are too simple, and the map
lacks adequate geometric interweaving or element reuse.
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round9_coupled_vertical_debt_structural_redesign_needed.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0029_v2_coupled_vertical_debt_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0029_v2_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/required_count_probe_ICE_CAND_0029_v2.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0029_v2_ABCD.md
```

## Retrieval Summary

```text
Post-designer-correction negative example. The archive/review loop overaccepted
this weak meta candidate by comparing it to lower-bar functional examples. Base
leaks d5 knowledge, both base and meta are too simple, and the two sides do not
have enough geometric interweaving or element reuse. Do not use solid / functional
archive examples as an acceptance floor; target the highest-taste references.
```