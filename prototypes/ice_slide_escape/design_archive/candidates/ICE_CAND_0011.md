# Candidate: ICE_CAND_0011

```yaml
candidate_id: ICE_CAND_0011
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round4_proposal_ready_with_caveats
status: held_proposal
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: held_proposal
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 1
aesthetic_label: 反例样本
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - d4_rebound
  - d5_pass_through
  - restart_counting
  - destroy_moving_ice_d3
  - target_ice_coverage
  - explicit_edge_goal
  - all_mechanic_endgame
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
human_comment_ids:
  - HC_ICE_CAND_0011_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round4_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0011_v3_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0011_v3_start_refine.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0011_v3_all_edge_starts.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0011_v3_order_gates.md
```

## Layout

Solve instance:

```yaml
player_start: [10, 16]
player_goal: [11, 8]
win_condition: ice_slide_escape_explicit_goal
```

```text
############
############
############
############
############
############
############
##########G#
#.I.....#G..
#..........#
#........G.#
#.........I#
#..........#
#........I.#
#..........#
#.........I#
##########@#
```

## Core Logic

```text
LLM claim: d4 creates [10,8]; d5/restart uses [10,8] to create [9,8];
then a second d4 uses [9,8] as rebound obstacle. Finally [10,8] moves to
[10,7] and opens the explicit edge goal at [11,8].

Tool evidence and prefix probes support that this core order logic exists.
Human review also accepts that the candidate has a player order requirement,
but holds the candidate on aesthetics, opening, disclosure, and lineage risk.
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0011_001
    author: human_designer
    text: >
      核心逻辑成立，有对玩家顺序的要求。问题在于关卡审美极差，上方大量无意义冗余墙，
      左下方大量冗余空地（这并非要求玩家行动空地必定紧缩，而是这块空地实在是太多了）；
      唯一开局导向一个d3推动，删去这个步骤对于后续谜题无任何影响。这个关卡需要在大量
      审美精修后才可能作为流程备选。以及这关的左推下方第二个箱子会导致不同出口多解，
      我没有被显式告知。另外，此关在“三次强顺序要求的远距离推动”
      这点上，逻辑链路仍然和0006太像，我认为这有可能受到了正例的污染。
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round4_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0011_v3_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0011_v3_start_refine.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0011_v3_all_edge_starts.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0011_v3_order_gates.md
```

## Retrieval Summary

```text
Human-held all-knowledge candidate. Core order logic exists and requires player
sequence reasoning, but human review found severe aesthetic redundancy, an
opening d3 push removable without affecting the later puzzle, an undisclosed
different-exit multi-solution, and possible contamination from ICE_CAND_0006's
three-step long-distance ordered-push chain. Use as negative / calibration
material, not as proposal-ready or reference material.
```