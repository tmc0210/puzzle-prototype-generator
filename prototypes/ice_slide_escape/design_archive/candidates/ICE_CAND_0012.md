# Candidate: ICE_CAND_0012

```yaml
candidate_id: ICE_CAND_0012
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round5_double_d5_proposal_ready_with_caveats
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - d4_rebound
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - all_mechanic_endgame
archive_use:
  - positive_reference
  - critic_calibration
  - designer_calibration
  - human_taste_reference
human_comment_ids:
  - HC_ICE_CAND_0012_001
  - HC_ICE_CAND_0012_002
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round5_double_d5_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0012_v4_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_start_refine.md
  - prototypes/ice_slide_escape/reports/required_event_probe_ICE_CAND_0012_v4_two_d5.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_top_to_left.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_left_to_top.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_base_preserve.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_to_left.md
  - prototypes/ice_slide_escape/reports/meta_probe_ICE_CAND_0012_v4_open_c_left_d6_before_d4.md
  - prototypes/ice_slide_escape/reports/meta_probe_ICE_CAND_0012_deeper_redesign_attempts.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 7]
player_goal: [14, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
####..#########
####.I.I......#
####..#######.#
####..#######.#
####..#######.#
####..#######.#
#.....#######.#
..I..G.######.#
#.....#######.#
####GG.....I..#
###############
```

## Core Logic

```text
LLM / independent review claim: the opening lets the player test wrong A-ice
directions and top-order hypotheses, but only A right d4 creates T1 at [5,7].
B then uses T1 as the obstacle-group state for a d5 pass-through and creates
T2 at [5,9]. C d6 opens the right edge route / goal access. E then uses T2 as
the obstacle-group state for a second d5 pass-through and creates T3 at [4,9].

Review_2 evidence and critic both supported proposal_ready_with_caveats. Human
review then accepted it as a flawed positive example: the logic chain is clear
and has strong reuse, but the player can often solve by pushing each visible
ice as far as possible. The main taste caveat is that the dead routes lack real
misdirection and no push is meaningfully counterintuitive.
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0012_001
    author: human_designer
    text: >
      这一关本身还可以，逻辑链条清晰，有多次强复用，但我认为仍然有流程挑战不够，
      解法缺少洞见的问题：“玩家只需要选择将看到的每个箱子往最远的方向推就能过关”。
      但是可以先初步接受作为一个有缺陷的可接受正例。这关最主要的问题是看似流程复杂
      有深度，但几个死路缺乏真正的误导性，玩家没有任何一次推动是反直觉的，例如：
      较为反直觉的：将被推到目标上的箱子从目标中推出或是轻度反直觉的：先忽略眼前
      的东西。另外我目测这关meta应该是有创作空间的，不一定要更优更完善的解，应该有
      更近一步的尝试记录
  - id: HC_ICE_CAND_0012_002
    author: human_designer
    text: >
      这个meta尝试太轻了
status: accepted
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round5_double_d5_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0012_v4_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0012_v4_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_start_refine.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_start_refine.json
- prototypes/ice_slide_escape/reports/required_event_probe_ICE_CAND_0012_v4_two_d5.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_top_to_left.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_left_to_top.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_base_preserve.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0012_v4_meta_open_c_left_to_left.md
- prototypes/ice_slide_escape/reports/meta_probe_ICE_CAND_0012_v4_open_c_left_d6_before_d4.md
- prototypes/ice_slide_escape/reports/meta_probe_ICE_CAND_0012_deeper_redesign_attempts.md
```

## Retrieval Summary

```text
Human-accepted flawed positive example. The core chain is A d4 -> T1, B d5
uses T1 -> T2, C d6 opens right edge access, and E d5 uses T2 -> T3. Human
review praised the clear logic and strong reuse, but warned that the solution
lacks insight because the player can mostly push visible ice as far as
possible. Use as a positive taste reference with caveats, especially for the
failure mode where dead routes are not genuinely misleading. Meta follow-up
now includes a deeper failed-search record: d6-first space exists, but cleanly
separating it from the base appears to require a dedicated redesign rather than
minor interface openings.
```