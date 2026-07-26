# Candidate: CANDLE_CAND_0003

```yaml
candidate_id: CANDLE_CAND_0003
prototype: candle_sokoban
source_candidate_version: CANDLE_CURRICULUM_L16_PATH_OUTPUT_ENDPOINT_001_exact_001
status: archived_negative_example
human_final_status: ready_for_archive
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 1
difficulty_score: 2
allowed_exposure_through: rolling_contact_chain
human_comment_ids:
  - HP_CANDLE_CURRICULUM_L16_PATH_OUTPUT_ENDPOINT_001_exact_001_001
ledger_ref: prototypes/candle_sokoban/reports/studio_curriculum_l16_path_output_endpoint_20260726/candidate_ledger.yml
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
############
#......#####
#@l444.o####
##O.....O###
##o......u.#
##.......2.#
##.......2.#
#######....#
############
```

## Core Logic

```text
题面意图让一记四格侧滚同时点亮途中火盆，并把尾格留作后继蜡烛的截停接口。
人类试玩读到的实际抉择却只是先推左上蜡烛还是右下蜡烛。
玩家开局可以直接先推左上蜡烛，随后盲目右推便不再有抉择；这是难度声明失真的失败边界。
```

## Human Verdict（人类裁决）

```yaml
human_comments:
  - id: HP_CANDLE_CURRICULUM_L16_PATH_OUTPUT_ENDPOINT_001_exact_001_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 1
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 声称难度不低于5，但实际玩家仅面临二择：先推左上蜡烛还是右下蜡烛，且玩家开局即可先推左上蜡烛，玩家闭着眼睛右推后就毫无抉择点。典型反例，归档作为警告。
    created_at: 2026-07-26T10:27:50.992Z
status: ready_for_archive
```

## Human Calibration（人类校准）

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 1
  aesthetic_label: 反例样本
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: rolling_contact_chain
  score_source:
    - HP_CANDLE_CURRICULUM_L16_PATH_OUTPUT_ENDPOINT_001_exact_001_001
```

## Retrieval Summary

```text
人类明确要求保存的反例，审美1、难度2。关卡虽声称长滚同时写入路径与终点接口，实际玩家只面对先推左上还是右下蜡烛的二择，且开局盲目右推后便不再有抉择。
```
