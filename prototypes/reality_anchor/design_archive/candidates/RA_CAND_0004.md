# Candidate: RA_CAND_0004

```yaml
candidate_id: RA_CAND_0004
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 3
allowed_exposure_through: all_current_reality_anchor_runtime_rules
human_comment_ids:
  - HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_fixed_anchor_transitions.md
```

## Layout

```yaml
player_start: [3, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed_vertical
box_sticky_anchor: movable_horizontal
```

```text
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

## Core Logic

```text
固定 P/L 提供 pull-side 语法，B/S 打开材料窗口。下方流程要求先暂存 M，再把 C 拉入 sticky side，与 M 合体后用左格把手携带右格落到目标。人类认为下方推拉和黏块性质腾挪有趣，但上下顺序耦合较弱。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和
      下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    created_at: 2026-07-04T15:23:21.482Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_source:
    - HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
```

## Retrieval Summary

```text
人类接受过渡正例，审美4、难度3。固定 P/L 提供 pull-side，B/S 一次移动打开材料窗口；下方 C 与 M 的合体/携带形成有趣腾挪。适合刚引入锚点可推拉事实时使用。
```

