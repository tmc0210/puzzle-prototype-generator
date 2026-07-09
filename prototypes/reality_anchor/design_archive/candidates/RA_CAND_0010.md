# Candidate: RA_CAND_0010

```yaml
candidate_id: RA_CAND_0010
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 3
difficulty_score: 2
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [5, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: movable horizontal
box_sticky_anchor: none
```

```text
#########
#..PL...#
#.G..@C.#
#########
```

## Core Logic

```text
可移动 P/L timing witness：玩家先在初始 pull side 拉动同一箱子，再移动 P/L，最后在新边界下把该箱子推上目标。价值在于清楚展示移动边界改变同一对象的处理方式。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 结构简单，逻辑清晰
    created_at: 2026-07-04T18:24:23.975Z
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
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
```

## Retrieval Summary

```text
人类接受第四关可移动 P/L timing，审美3、难度2。结构简单但逻辑清晰：先拉箱、移动 P/L、再在新边界下推同一箱子入目标。
```

