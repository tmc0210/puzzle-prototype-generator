# Candidate: RA_CAND_0027

```yaml
candidate_id: RA_CAND_0027
prototype: reality_anchor
source_candidate_version: RA_FRESH_2026_07_09_VACATE_MATERIAL_LOCK_v4
status: rejected_candidate
human_final_status: archived_negative_example
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 1
difficulty_score: 2
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_FRESH_2026_07_09_VACATE_MATERIAL_LOCK_v4_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_FRESH_2026_07_09_playtest_feedback.md
```

## Layout

```text
#######
#...G.#
#L.BS.#
#P.CM##
#..CG@#
#######
```

## Core Logic

```text
该关短流程中触发了 B/S 位移、box_to_sticky、sticky_merge 和 sticky 刚体移动等标签，但玩家侧没有真正使用黏块几何、拼接形状或刚体结构性质。
P/L 锚点可被玩家移动，却不是解法责任；sticky 能黏，却没有把黏连能力转化为必要结构。
人类将其归档为 affordance 极差的典型警戒：可见机制可能性抬高预期，实际解法远低于预期。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_FRESH_2026_07_09_VACATE_MATERIAL_LOCK_v4_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 1
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      典型反例。affordance极差 1. 推拉锚点能推但解法不需要推 2. 黏块能黏但不需要黏，
      解法触发黏块转化、黏块拼接这些标签，但是完全没有使用任何黏块的几何结构性质。
      因此玩家能看到一堆机制可能性，结果完全没用上，解法远低于预期，留作典型警戒。
    created_at: 2026-07-09T10:18:59.102Z
status: archived_negative_example
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 1
  aesthetic_label: 反例样本
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: null
  score_source:
    - HP_RA_FRESH_2026_07_09_VACATE_MATERIAL_LOCK_v4_001
```

## Retrieval Summary

```text
人类要求归档负向反例，审美1、难度2。它是 affordance 污染警戒：P/L 可动但无需移动，sticky 可黏但未使用黏块几何结构；工具标签显示材料转换和拼接，玩家实际得到的洞见远低于机制信号承诺。
```
