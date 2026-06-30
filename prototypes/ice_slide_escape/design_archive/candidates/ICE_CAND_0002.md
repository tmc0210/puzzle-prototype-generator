# Candidate: ICE_CAND_0002

```yaml
candidate_id: ICE_CAND_0002
prototype: ice_slide_escape
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
status: rejected_candidate
llm_candidate_strength: rejected_candidate
human_final_status: rejected_candidate
archive_eligibility: clean_archive
review_integrity: human_review
motifs:
  - d4_rebound
  - target_ice_coverage
  - explicit_edge_goal
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
human_comment_ids:
  - HC_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0002_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_start_refine.md
  - prototypes/ice_slide_escape/reports/commitment_probe_ICE_CAND_0002_after_first_d4.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0002_base.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_start_refine.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_meta_reverse.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_meta_reverse.json
```

## Layout

Solve instance:

```yaml
player_start: [1, 9]
player_goal: [4, 0]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
####.####
####..###
####.I###
####..###
####..###
####.G###
####..###
#.I..G.##
#.##.####
#.#######
```

## Core Logic

```text
Player insight:
After the first d4 rebound, the player must keep the first target ice in place
and read it as the collision surface for the second d4 rebound. The first ice
is not only target coverage; it becomes the obstacle that makes the upper ice
land on the second target.

Causal chain:
1. From [1,9], walk to [1,7].
2. Push the lower-left ice right. It travels four cells, hits the wall, and d4
   rebounds onto the target at [5,7].
3. In the post-first-d4 walk-region, avoid moving the [5,7] target ice or
   pushing the upper ice in the wrong direction.
4. Reach [5,1] and push the upper ice down. It travels four cells, hits the
   target ice at [5,7], and d4 rebounds onto the target at [5,5].
5. Walk to the explicit edge goal [4,0].
```

## Human Verdict

```yaml
comments:
  - id: HC_001
    author: human_designer
    attached_to:
      - candidate
      - critic_artifact
      - designer_claim
      - tool_evidence
    text: >
      d5是致命问题而非瑕疵。而且这关完全没有实际的思考量，你声称有一些死路，
      但是这些死路甚至都是绕远路，玩家按直觉看到啥就推啥就能轻松过关，完全没有挑战
status: present
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0002_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_start_refine.md
- prototypes/ice_slide_escape/reports/commitment_probe_ICE_CAND_0002_after_first_d4.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0002_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_start_refine.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_meta_reverse.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0002_meta_reverse.json
```

## Retrieval Summary

```text
Human-rejected d4 pre-d5 candidate. It looked tool-supported because the
winning path used two d4 rebounds and a local probe found dead commitments, but
human review found reachable d5 fatal and the actual play pattern too obvious:
push what is visible and win.
```
