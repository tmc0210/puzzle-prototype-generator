# Candidate: ICE_CAND_0032

```yaml
candidate_id: ICE_CAND_0032
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round16_shared_center_ice_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: compact_d6_first_key_element_reuse_meta_with_caveats
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
human_reviewed: false
aesthetic_score: null
aesthetic_label: null
difficulty_score: null
difficulty_label: null
allowed_exposure_through: null
motifs:
  - short_stop_d1_d2
  - d4_rebound
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - ice_stopper_role_flip
  - shared_target_role_reassignment
archive_use:
  - proposal_for_human_review
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round16_shared_center_ice_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_base_required_core.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_meta_required_core.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round16_v37_ABCD.md
```

## Layout

Solve instances:

```yaml
A: [0, 7]
B: [0, 1]
C: [17, 7]
D: [17, 1]
base:
  player_start: [0, 7]
  player_goal: [0, 1]
meta:
  player_start: [17, 7]
  player_goal: [17, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
##################
.......#########..
#.*.....#..G.##..#
#....####..*...#.#
#....IG##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

## Core Logic

Base is a compact four-push d5+d4 application: `[2,2]` crosses the middle wall
by d5 restart and d4 rebound to `[11,2]`, `[2,5]` rebounds upward, then the
shared middle ice `[5,4]` fills `[6,4]`.

Meta is a compact four-push d6/no-chain application: `[15,4]` destroys the row4
wall group, restarts, and is stopped by `[5,4]` to fill `[6,4]`; later `[11,2]`
becomes the stopper for refilling `[11,3]`.

The main upgrade over the previous seed is key-element role flip, not large-area
shared activity space: `[5,4]` is a base fill piece and a meta stopper, while
`[6,4]` is filled by different ice in the two visits.

## Human Verdict（人类裁决）

```yaml
human_comments: []
status: pending
```

## Human Calibration（人类校准）

```yaml
human_calibration:
  human_reviewed: false
  aesthetic_score: null
  aesthetic_label: null
  difficulty_score: null
  difficulty_label: null
  allowed_exposure_through: null
  score_source: []
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round16_shared_center_ice_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round16_v37_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round16_v37_meta_required_core.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_01_round16_v37_ABCD.md
```

## Retrieval Summary

Human-pending compact d6-first meta proposal. Base and meta are both four-push
applications with complete graph evidence, hard routing pass, and required-event
probes. Strongest value: `[5,4]` changes role from base fill piece to meta
no-chain stopper, and `[6,4]` is filled by different ice in the two visits.
Caveat: this is key-element reuse with moderate spatial coupling, not a
large-area shared-space or top-tier endgame capstone.
