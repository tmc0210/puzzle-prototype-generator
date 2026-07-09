# Candidate: RA_CAND_0013

```yaml
candidate_id: RA_CAND_0013
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 1
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [6, 4]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: fixed horizontal wall-pocket
```

```text
########
########
##B..G##
##S..###
###.M###
####M###
####@###
########
```

## Core Logic

```text
固定 B/S sticky cut witness：竖向黏块整体推到边界后，上格被切成箱子并单独推上目标，下格 sticky 留债。价值是短教学中展示黏块切割。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 简单黏块切割教学witness
    created_at: 2026-07-04T19:20:34.303Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 1
  difficulty_label: 教学见证
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L09_FIXED_BS_CUT_v1_001
```

## Retrieval Summary

```text
人类接受第九关固定 B/S sticky cut witness，审美2、难度1。竖向黏块跨边界后切出箱子并单独消费，适合作为简单切割教学。
```

