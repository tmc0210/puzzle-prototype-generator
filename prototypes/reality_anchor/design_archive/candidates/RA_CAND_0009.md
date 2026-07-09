# Candidate: RA_CAND_0009

```yaml
candidate_id: RA_CAND_0009
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 2
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_001
  - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [1, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed horizontal wall-pocket
box_sticky_anchor: none
```

```text
#########
#########
#@C..#P##
#....#L##
#.##G####
#....####
#########
```

## Core Logic

```text
固定 P/L 应用 witness：同一箱子先在 push side 右推，再在 pull side 下拉覆盖目标。归档版补墙缩短开局死路，不改变主解身份。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 简单推拉应用关
    created_at: 2026-07-04T18:23:18.318Z
  - id: HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002
    author: human_designer
    status: needs_revision
    aesthetic_score: 2
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 左下区域有些多余，建议改动，否则下，右，下开局的死路过长，前期教学关不需要这样的误导
    created_at: 2026-07-04T18:39:31.891Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_001
  post_acceptance_adjustment:
    - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002
```

## Retrieval Summary

```text
人类接受第三关固定 P/L 应用，审美2、难度2。同一箱子跨 push/pull side 操作，适合作为简单练习与课程过渡；二次人评补墙缩短无意义死路。
```

