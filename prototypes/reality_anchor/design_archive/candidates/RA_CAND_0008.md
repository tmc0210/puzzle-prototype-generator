# Candidate: RA_CAND_0008

```yaml
candidate_id: RA_CAND_0008
prototype: reality_anchor
source_candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 2
difficulty_score: 1
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
```

## Layout

Solve instance:

```yaml
player_start: [1, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed horizontal wall-pocket
box_sticky_anchor: none
```

```text
########
#@CG####
#...#P##
###.#L##
#C.G.###
########
```

## Core Logic

```text
固定 P/L 引入 witness：上方目标用一次 push，下方目标用连续 pull，低噪声地对比 push side 与 pull side。归档定位是简单推拉锚点引入关。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 简单推拉锚点引入关
    created_at: 2026-07-04T18:22:08.618Z
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
    - HP_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_001
```

## Retrieval Summary

```text
人类接受第二关固定 P/L 引入 witness，审美2、难度1。上方一次 push、下方连续 pull，低噪声展示 push/pull side 差异；不作为高审美挑战参考。
```

