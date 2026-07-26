# Candidate: CANDLE_CAND_0004

```yaml
candidate_id: CANDLE_CAND_0004
prototype: candle_sokoban
source_candidate_version: CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_V4
status: accepted
human_final_status: ready_for_archive
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 3
difficulty_score: 3
allowed_exposure_through: shared_fire_and_reignition
human_comment_ids:
  - HP_CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_V4_001
ledger_ref: prototypes/candle_sokoban/reports/studio_wall_douse_reignite_timing_capstone_20260725/candidate_ledger.yml
```

## Layout

Solve instance:

```yaml
player_start: [8, 6]
player_goal: null
win_condition: all_braziers_lit
global_burn_cycle: 5
```

```text
##############
#####O..44R.o#
###.L111.#####
##O......#####
#####O...#####
####o....#####
#.L3333#@#####
##############
```

## Core Logic

```text
玩家先在燃烧边界主动让蜡烛撞墙灭火，以免这一轮继续缩短。
之后必须先处理右上蜡烛，再让目标烛在下一轮边界前复燃并参与缩短。
目标烛与瞬时横向止挡共用同一片紧凑空间，行走和操作路径也被后段复用。
```

## Human Verdict（人类裁决）

```yaml
human_comments:
  - id: HP_CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_V4_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: 要求先抉择灭火，并叠加一个右上蜡烛操作的顺序锁，因几何结构紧凑路径有复用而无拼接感，整体3难度3审美达标
    created_at: 2026-07-26T10:30:32.999Z
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
  allowed_exposure_through: shared_fire_and_reignition
  score_source:
    - HP_CANDLE_WALL_REIGNITION_TIMING_CAPSTONE_001_V4_001
```

## Retrieval Summary

```text
人类接受的常规流程下界，审美3、难度3。先主动墙灭保长，再按顺序处理右上蜡烛并复燃；紧凑几何复用了行走与操作路径，因此顺序锁没有形成明显拼接感。
```
