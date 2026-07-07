# Candidate: RA_CAND_0016

```yaml
candidate_id: RA_CAND_0016
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_box_sticky_curriculum
source_candidate_version: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3
status: accepted
llm_candidate_strength: supports_with_noncore_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: null
motifs:
  - box_sticky_anchor
  - movable_anchor
  - box_to_sticky
  - sticky_merge
  - material_normalization
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
failure_modes:
  - strongly_forced_witness
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_review_2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3.md
  - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_core.md
  - prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_order.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md
```

## Layout

```text
#########
##....###
##.BS#G.#
##.M.MM.#
##@#...##
#########
```

## Core Logic

```text
第十关可移动 B/S timing 应用：先把箱子推入 sticky side，触发 box_to_sticky 与 sticky_merge；随后移动 B/S 两次，其中第二次触发 sticky_to_box；切出的箱子下推，剩余 sticky pair 作为刚体移动到目标。
核心 probe 完整证明所有胜路都需要 B/S shift、box_to_sticky、sticky_merge、sticky_to_box、sticky rigid movement 和 crate push；order/count probes 证明不能在 sticky_merge 前移动 B/S，且至少需要两次 B/S shift。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 强引导的黏块合并再切割教学
    created_at: 2026-07-04T20:52:08.138Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第十关可移动 B/S 合并再切割教学，审美 3、难度 2。关卡强引导，但清楚要求先合并、再移动 B/S、再切割并使用 sticky 刚体收束。适合作为 B/S timing 的可用下界与教学校准，不应包装成开放调度谜题。
```
