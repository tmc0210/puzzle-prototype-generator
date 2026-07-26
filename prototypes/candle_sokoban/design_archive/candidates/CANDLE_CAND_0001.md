# Candidate: CANDLE_CAND_0001

```yaml
candidate_id: CANDLE_CAND_0001
prototype: candle_sokoban
source_candidate_version: CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_v2
status: accepted
human_final_status: ready_for_archive
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 3
difficulty_score: 3
allowed_exposure_through: rolling_contact_chain
human_comment_ids:
  - HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_v2_001
ledger_ref: prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725/candidate_ledger.yml
```

## Layout

Solve instance:

```yaml
player_start: [1, 2]
player_goal: null
win_condition: all_braziers_lit
global_burn_cycle: 5
```

```text
#########
##.....##
#@.21R.##
###2..l.#
##o2....#
###d..###
####..O##
#########
```

## Core Logic

```text
玩家把一次不可中止的侧滚编排成烛身灭火、未燃重曝与后段复燃。
同一条事件链继续跨过燃烧边界，触发边界缩短并让旧端帽退焰。
随后玩家把火重新接回开局区域，完成末端火盆；人类认为退焰构造有一定洞见。
```

## Human Verdict（人类裁决）

```yaml
human_comments:
  - id: HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: 此处的退焰构造有一定洞见，正常流程可用
    created_at: 2026-07-26T10:12:46.245Z
status: ready_for_archive
```

## Human Calibration（人类校准）

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 3
  aesthetic_label: 可用下界
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: rolling_contact_chain
  score_source:
    - HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_001_v2_001
```

## Retrieval Summary

```text
人类接受的常规流程下界，审美3、难度3。一次侧滚串联烛身灭火、未燃重曝、后段复燃与旧端帽退焰；人类认可退焰构造有一定洞见，但不应按原定高难终局强度取材。
```
