# Candidate: RA_CAND_0003

```yaml
candidate_id: RA_CAND_0003
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 3
difficulty_score: 2
allowed_exposure_through: all_current_reality_anchor_runtime_rules
human_comment_ids:
  - HP_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_fixed_anchor_transitions.md
```

## Layout

```yaml
player_start: [7, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed_vertical
box_sticky_anchor: movable_vertical
```

```text
###########
#P#....@###
#L##G#.B###
####.##S###
####m##.###
####M######
###########
```

## Core Logic

```text
固定 P/L 提供 pull 语法，B/S 下推后设置材料边界。玩家先把竖向黏块整体上提，再用 B/S 分离上格箱子和下格黏块，分别覆盖上下目标。定位是简单教学/可用下界。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 教学使用箱黏锚点分离黏块的简单可用教学关
    created_at: 2026-07-04T15:17:58.589Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 3
  aesthetic_label: 可用下界
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_source:
    - HP_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_001
```

## Retrieval Summary

```text
人类接受过渡样本，审美3、难度2。价值在于固定 P/L + 可移动 B/S 清楚展示“整体上提 -> 材料分离”，适合作为箱黏锚点分离黏块的教学关。
```

