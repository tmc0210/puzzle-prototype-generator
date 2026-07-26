# Candidate: CANDLE_CAND_0002

```yaml
candidate_id: CANDLE_CAND_0002
prototype: candle_sokoban
source_candidate_version: CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v006
status: accepted
human_final_status: ready_for_archive
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 3
difficulty_score: 2
allowed_exposure_through: rolling_contact_chain
human_comment_ids:
  - HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v006_001
ledger_ref: prototypes/candle_sokoban/reports/studio_all_mechanics_final_capstone_d4plus_20260725_02/candidate_ledger.yml
```

## Layout

Solve instance:

```yaml
player_start: [7, 4]
player_goal: null
win_condition: all_braziers_lit
global_burn_cycle: 5
```

```text
###########
######....#
####.L111.#
######....#
#######@..#
######Ou..#
######.2..#
#.o.....#.#
#.........#
###########
```

## Core Logic

```text
玩家开局选择把纵向蜡烛下推一次或两次，两种写入都能完成局部灭火与复燃。
较晚的终盆读回写入位置，只接受下推两次后留下的纵坐标和未点燃蜡烛阻挡。
人类试玩认为这只是普通二择，机械关系成立但几乎没有额外玩家洞见。
```

## Human Verdict（人类裁决）

```yaml
human_comments:
  - id: HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v006_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 开局下推两次将未点燃蜡烛作为阻挡的普通二择，机制硬证据满足但几乎无玩家洞见
    created_at: 2026-07-26T10:18:35.187Z
status: ready_for_archive
```

## Human Calibration（人类校准）

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 3
  aesthetic_label: 可用下界
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: rolling_contact_chain
  score_source:
    - HP_CANDLE_ALL_MECHANICS_FINAL_CAPSTONE_002_v006_001
```

## Retrieval Summary

```text
人类接受的简单练习下界，审美3、难度2。核心只是开局下推次数的普通二择，并以未点燃蜡烛作阻挡；机械链成立，但玩家洞见很弱，只适合作为功能性校准。
```
