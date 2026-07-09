# Candidate: RA_CAND_0011

```yaml
candidate_id: RA_CAND_0011
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 4
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [1, 3]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed horizontal
box_sticky_anchor: none
```

```text
######
#PL@.#
#..GG#
#.CG##
#....#
######
```

## Core Logic

```text
固定 P/L 多方向应用：普通箱先被推到目标，再被拉出重开通路，最后推回目标；P/L 在中段提供多个方向的拉/推。人类认可“箱子进目标再拉出”的反直觉洞见。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    text: 箱子需要被推进目标再拉出需要较强反直觉洞见，在较小空间做出了紧凑的强逻辑关卡
    created_at: 2026-07-04T19:25:40.939Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 4
  difficulty_label: 阶段挑战
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_001
```

## Retrieval Summary

```text
人类接受第六关固定 P/L 多方向应用，审美4、难度4。小空间中形成紧凑强逻辑，核心洞见是箱子需要先进目标再被拉出。
```

