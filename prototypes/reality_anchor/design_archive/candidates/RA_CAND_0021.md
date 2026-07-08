# Candidate: RA_CAND_0021

```yaml
candidate_id: RA_CAND_0021
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_08_playtest_feedback
source_candidate_version: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2
status: accepted
llm_candidate_strength: human_feedback_revision_human_accepted
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: null
motifs:
  - dual_anchor
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - unusual_anchor_force_chain
failure_modes:
  - skipped_independent_review_after_micro_revision
human_comment_ids:
  - HP_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_human_feedback.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_core6.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_pl_shift_min6_anchor_boundary_shift_push_pull_min6.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_rigid_min3_move_sticky_rigid_min3.md
  - prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_layout.txt
```

## Layout

```text
##########
###G##LP.#
##..MM..@#
#...M....#
#...MM####
#.BS######
##########
```

## Core Logic

```text
人类反馈修订后的 split-tooth 候选：P/L 从中间行移到上边缘，减少开局动作显然性；主干仍是用 P/L 强行推动大黏块，通过固定 B/S 触发 sticky_to_box 与 sticky_split，再把端点推入上方墙齿目标。
v2 的完整图与 v1 相同规模：359 states / 919 transitions / 2 wins；最短解 17 步。core6 probe 对 P/L pull、P/L shift、force_chain、sticky_to_box、sticky_split、sticky rigid movement 均 complete/no bypass。
P/L shift >= 6 与 sticky rigid move >= 3 的计数 probe 均 complete/no bypass。该修订因改动面小曾跳过完整独立 review；本归档以之后的人类 ready_for_archive 评价作为最终接收依据。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: 还算有趣的关卡，利用锚点强行推大黏块的结构较为特殊。
    created_at: 2026-07-07T17:41:09.728Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 常规挑战样本，审美 3、难度 3。价值在于“用推拉锚点强行推大黏块”的特殊结构：P/L 既是边界也是 force-chain 推杆，最终通过固定 B/S 切开 sticky 并把端点送入墙齿目标。人类评价为还算有趣但未给高分；引用时适合作为特殊锚点推杆结构的可用样本，不应包装成强 4 或复杂终局。
```
