# Candidate: ICE_CAND_0001

```yaml
candidate_id: ICE_CAND_0001
prototype: ice_slide_escape
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
status: rejected_candidate
llm_candidate_strength: rejected_candidate
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - d4_rebound
  - target_ice_coverage
  - explicit_edge_goal
archive_use:
  - negative_example
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0001_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_start_refine.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0001_base.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_start_refine.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_meta_reverse.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_meta_reverse.json
```

## Layout

Solve instance:

```yaml
player_start: [1, 0]
player_goal: [7, 0]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
#.#####.###
#.##....###
#.##.##.###
#.I..G.I..#
#######.###
#######.###
#######G###
#######.###
###########
```

## Core Logic

```text
Player insight:
The player should read the right ice first as the exact obstacle for the left
ice's d4 rebound, then later as the second target ice.

Causal chain:
1. From [1,0], walk to [1,3].
2. Push the left ice right. It travels four cells, hits the right ice, and d4
   rebounds onto the target at [5,3].
3. Use the newly opened route through [4,3] and the upper passage to reach
   above the right ice.
4. Push the right ice down. It travels four cells, hits the lower wall, and
   d4 rebounds onto the target at [7,6].
5. Walk back to the explicit edge goal [7,0].
```

## Human Verdict

```yaml
comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0001_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_start_refine.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0001_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_start_refine.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_meta_reverse.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0001_meta_reverse.json
```

## Retrieval Summary

```text
Negative example for late d4 capstone: two d4 rebounds and no forbidden winning
path, but second d4 does not consume the first d4 product and the critic found
the result too scripted.
```
