# Candidate: ICE_CAND_0030

```yaml
candidate_id: ICE_CAND_0030
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round13_d5_len2_shared_wall_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: compact_high_reuse_meta_with_caveats
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
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - ice_stopper_role_flip
archive_use:
  - proposal_for_human_review
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round13_d5_len2_shared_wall_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_base_required_core.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_meta_required_core.md
```

## Layout

Solve instances:

```yaml
A: [0, 7]
B: [0, 1]
C: [16, 7]
D: [16, 1]
base:
  player_start: [0, 7]
  player_goal: [0, 1]
meta:
  player_start: [16, 7]
  player_goal: [16, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
#################
.......########..
#.*...I.#..G.#..#
#....#G##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

## Core Logic

Base is a four-push A -> B chain. Its required core is d5(len1) pass-through plus
d4 rebound: the left target ice at `[2,2]` crosses the middle wall and lands at
`[11,2]`. The returned solution then refills the left targets, but the final d2
refill method is not globally forced.

Meta is a four-push C -> D chain. `[11,2]` is first filled, then becomes a stopper
for a later `[11,5] -> [11,3]` push. The right target ice at `[14,3]` uses
d5(len2) through the same middle area to fill `[6,3]`, and `[14,6]` d4-refills
`[14,3]`.

The strongest feature is cross-visit role reassignment of shared targets and
middle space. The main caveat is that the final compact version uses d5(len2),
not d6 destroy, so it should not be described as a d6-grade meta capstone.

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
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round13_d5_len2_shared_wall_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_01_round13_v22_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_01_round13_v22_meta_required_core.md
```

## Retrieval Summary

Human-pending compact meta proposal. Base and meta are both four-push chains
with complete graph evidence, hard routing pass, and required-event probes. Its
main value is shared target / stopper role reassignment across A/B and C/D visits:
`[6,3]` and `[11,2]` play different roles in the two solve instances. It is stronger
than connector-style meta stock, but should not be used as a human-calibrated
taste reference yet and should not be described as d6-level.