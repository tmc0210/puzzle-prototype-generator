# Candidate: RA_CAND_0006

```yaml
candidate_id: RA_CAND_0006
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1
status: rejected_candidate
human_final_status: archived_negative_example
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 5
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_05_soft_handoff_no_merge_variant.md
```

## Layout

```yaml
player_start: [5, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
#########
####C@.G#
###G....#
####PL.M#
####..BS#
#########
```

## Core Logic

```text
这是 RA_CAND_0002 的目标位置变体。它保留了多类机制事件，但目标位置把难度推向腾挪复杂度，削弱了原本的机制美感。归档价值是负向校准，不是可继续强化的好关。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 5
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，
      这种增加难度的方式实为较差的反例，仅做归档。
    created_at: 2026-07-04T16:38:31.629Z
status: archived_negative_example
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 5
  difficulty_label: 高难终局
  allowed_exposure_through: null
  score_source:
    - HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
```

## Retrieval Summary

```text
人类要求归档负向样本，审美2、难度5。它是 RA_CAND_0002 的高复杂度目标位置变体；人类明确指出小目标改动削弱机制美感，并通过较差腾挪复杂度增难。
```

