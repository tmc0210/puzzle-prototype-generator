# Candidate: ICE_CAND_0031

```yaml
candidate_id: ICE_CAND_0031
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round15_row4_d6_staging_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: compact_d6_first_high_reuse_meta_with_caveats
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
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round15_row4_d6_staging_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_base_required_core.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_meta_required_core.md
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
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......I.#
##*.I.#####..I...#
#.....#####.###..#
.....######.......
##################
```

## Core Logic

Base is a four-push A -> B d5+d4 application. Its required core is the left
target ice crossing the middle wall with `ice_pass_through_d5` and then landing
by `ice_rebound_d4` at `[11,2]`.

Meta is a four-push C -> D d6+staging+stopper chain. The returned solution first
uses `[15,4]` as a d6 projectile to fill `[6,4]` and open row4, stages the row5
ice horizontally from `[13,5]` to `[11,5]`, fills `[11,2]`, then uses `[11,2]`
as a stopper so `[11,5]` can fill `[11,3]`.

This should be shown before `ICE_CAND_0030`: it restores d6 as the first meta
spatial unlock while keeping complete graph, routing, and required-event evidence.
The caveat is that both flows remain compact four-push chains, not a top-tier
endgame capstone.

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Human Calibration

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
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round15_row4_d6_staging_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round15_v30_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round15_v30_meta_required_core.md
```

## Retrieval Summary

Human-pending compact d6-first meta proposal. Base is a four-push d5+d4
application; meta is a four-push d6+staging+stopper chain with complete graph,
hard routing pass, and required-event probes. Strongest value: `[6,4]` and
`[11,2]` change cross-visit roles, and the returned meta trace stages one row5
ice horizontally before using it vertically. Caveat: compact four-push flow and
branching SCC mean this is not a forced-linear or top-tier endgame capstone.