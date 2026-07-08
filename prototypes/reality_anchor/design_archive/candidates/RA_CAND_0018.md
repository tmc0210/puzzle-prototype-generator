# Candidate: RA_CAND_0018

```yaml
candidate_id: RA_CAND_0018
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_07_lexicon_playtest_feedback
source_candidate_version: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned
status: accepted
llm_candidate_strength: corrected_prune_human_accepted
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
  - material_normalization
  - sticky_merge
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
failure_modes:
  - forced_prefix_pressure
human_comment_ids:
  - HP_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_07_lexicon_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_core5.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_box_to_sticky_min2_box_to_sticky_min2.md
  - prototypes/reality_anchor/reports/order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_cut_before_merge.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_bs_fixed_scan.md
```

## Layout

```text
##########
#@.#G#...#
#.CC....G#
####....##
####BS####
##########
```

## Core Logic

```text
固定 B/S 切割过渡关：两个箱子沿边界推进，先产生 box_to_sticky 与 sticky_merge，再从右侧回推触发 sticky_to_box，把 C 半和 sticky tail 分别消费到两个目标。
修正 prune 只删除 B/S 两侧 pocket，保留右上区域；此前 `space_pruned` 过裁版本不能作为正式候选。
最终证据 complete：核心事件组无缺失旁路，至少两次 box_to_sticky，无 winning route 在 sticky_merge 前 sticky_to_box。
人类将其定位为简单过渡关，审美 3 的原因是有一个不算显然的回推动作。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 利用固定锚点进行切割的简单过渡关，审美升到3分的原因是有一个不算显然的回推动作而非按部就班凭直觉过关
    created_at: 2026-07-07T16:40:12.374Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 固定 B/S 切割简单过渡关，审美 3、难度 2。它不是高阶挑战，价值在于清楚展示 merge 后回推切割，并用两个目标分别消费 C 输出与 sticky tail。归档版本为 `anchor_pockets_pruned` 修正版，明确排除错误的 `space_pruned` 中间版；可作固定 B/S 切割下界校准。
```
