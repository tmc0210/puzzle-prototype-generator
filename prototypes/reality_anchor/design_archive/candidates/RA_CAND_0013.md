# Candidate: RA_CAND_0013

```yaml
candidate_id: RA_CAND_0013
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_box_sticky_curriculum
source_candidate_version: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 1
difficulty_label: 教学见证
allowed_exposure_through: null
motifs:
  - box_sticky_anchor
  - fixed_anchor
  - material_normalization
  - sticky_to_box_cut
  - crate_goal_witness
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
failure_modes:
  - tiny_forced_witness
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review_1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md
  - prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_core.md
  - prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md
```

## Layout

Solve instance:

```yaml
player_start: [6, 4]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: fixed horizontal wall-pocket
```

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

## Core Logic

```text
第九关固定 B/S sticky cut witness：玩家把竖向黏块整体上推到 B/S 边界，第二次上推使上格 sticky_to_box；切出的箱子随后被单独右推到目标，下格 sticky 留在原处。
core event probe 完整，所有胜路都需要 sticky_to_box、move_sticky_rigid 与 push_object:crate#1；reachable scan 无 P/L、无 B/S shift、无 box_to_sticky、无 sticky_merge。
人类归档定位为“简单黏块切割教学witness”，审美 2 / 难度 1。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 简单黏块切割教学witness
    created_at: 2026-07-04T19:20:34.303Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 1
  difficulty_label: 教学见证
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review1.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review_1.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_review_1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_core.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第九关固定 B/S sticky cut witness，审美 2、难度 1。它展示黏块跨边界后上格变箱、切出的箱子被单独推上目标。适合作为简单切割教学和机制库存校准，不应包装成高难或精密终局。
```
