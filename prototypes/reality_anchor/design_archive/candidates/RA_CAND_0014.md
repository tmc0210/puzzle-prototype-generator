# Candidate: RA_CAND_0014

```yaml
candidate_id: RA_CAND_0014
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 1
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [3, 5]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: fixed horizontal wall-pocket
```

```text
#######
#.....#
#B.C#.#
#S...@#
###M.G#
#######
```

## Core Logic

```text
固定 B/S joining witness：普通箱跨过固定 B/S 后转为 sticky，并与下方 sticky 拼接，随后合并刚体覆盖目标。价值是短教学中展示箱子变黏块并参与拼接。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 黏箱用于拼接的教学关
    created_at: 2026-07-04T19:35:47.165Z
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
    - HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
```

## Retrieval Summary

```text
人类接受第八关固定 B/S joining witness，审美2、难度1。普通箱跨过固定 B/S 后转为 sticky 并与下方 sticky 拼接，适合作为 fixed B/S 转化下界。
```

