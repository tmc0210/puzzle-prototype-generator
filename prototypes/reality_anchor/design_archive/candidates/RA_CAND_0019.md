# Candidate: RA_CAND_0019

```yaml
candidate_id: RA_CAND_0019
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_07_lexicon_playtest_feedback
source_candidate_version: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 2
difficulty_label: 简单练习
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
strengths: []
failure_modes:
  - route_tax
  - forced_button_risk
human_comment_ids:
  - HP_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_07_lexicon_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_review_1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_core.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_after_second_stroke.md
  - prototypes/reality_anchor/reports/second_count_before_event_probe_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_second_shift_before_pair_pull.md
```

## Layout

```text
###########
#.PLBS..###
#@.###...##
#...#MMmG.#
#....G###.#
#.........#
###########
```

## Core Logic

```text
顶部 P/L force-chain 推动 B/S，一刷把 sticky 输出切成 C+MM；C 被下目标消费，右侧 sticky pair 通过 sticky rigid movement 消费目标口。
工具证据支持核心事件组必要性，after-second-stroke 图 complete/no-win，且第二次 B/S shift 不能早于 sticky pair pull。
独立 evidence reviewer 与 puzzle critic 都是 required_action none，但人类最终将它校准为功能库存 / 简单应用，而不是 strong-3 设计参考。
归档时以人类审美 2 / 难度 2 为准。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 利用移动锚点切割的水关，第一步的推锚点和之后的两步拉过于显然，作为简单应用可以接受
    created_at: 2026-07-07T16:42:03.190Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 移动 B/S / P/L stroke-selection 简单应用，审美 2、难度 2。工具和 critic 曾支持其 overbrush 分支与目标职责，但人类明确认为第一步推锚点和后续两步拉过于显然，只能作为简单应用/功能库存接受。未来引用时应把它当作“证据完整但玩家侧太显然”的下界样本，而不是 strong-3 正例。
```
