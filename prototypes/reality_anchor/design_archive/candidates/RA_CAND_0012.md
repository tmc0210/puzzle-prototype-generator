# Candidate: RA_CAND_0012

```yaml
candidate_id: RA_CAND_0012
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 1
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [3, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: fixed horizontal wall-pocket
```

```text
#######
#B#####
#S#####
#@M...#
###MG.#
#######
```

## Core Logic

```text
固定 B/S sticky join intro：两个黏块先合并，再作为刚体移动并覆盖目标。价值是极简展示 sticky_merge 与刚体移动。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 精简的黏箱机制快速witness
    created_at: 2026-07-04T19:18:39.408Z
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
    - HP_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_001
```

## Retrieval Summary

```text
人类接受第七关固定 B/S sticky join witness，审美2、难度1。两个黏块先拼接再作为刚体移动，属于精简机制教学库存。
```

