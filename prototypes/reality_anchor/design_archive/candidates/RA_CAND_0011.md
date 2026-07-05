# Candidate: RA_CAND_0011

```yaml
candidate_id: RA_CAND_0011
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_push_pull_curriculum
source_candidate_version: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2
status: accepted
llm_candidate_strength: proposal_ready
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 4
difficulty_label: 阶段挑战
allowed_exposure_through: null
motifs:
  - push_pull_anchor
  - fixed_anchor
  - multi_axis_anchor
  - crate_recovery
  - temporary_goal_vacate
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
  - clear_player_facing_conflict
  - strongly_coupled_elements
failure_modes: []
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review_2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2.md
  - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_direction_core.md
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
第六关固定 P/L 多方向应用：普通箱先被推到下目标，随后必须被拉出以重开通路，最后再推回目标；P/L 在中段经历下拉、右拉、右推，覆盖上方双目标并改变箱子回填条件。
direction probe 完整，无缺少 anchor_pull_down、anchor_pull_right、anchor_push_right、crate_pull 或 crate_push 的胜路。完整图 945 states / 2269 transitions。
人类评价强调“箱子需要被推进目标再拉出”的反直觉洞见，并确认小空间中形成紧凑强逻辑，审美 4 / 难度 4。
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

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_review_2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_direction_core.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第六关固定 P/L 多方向应用，审美 4、难度 4。它的核心是普通箱先上目标、再被拉出、最后回填的反直觉状态责任；P/L 的下拉、右拉、右推与箱子撤销/恢复同属一条因果链。适合作为紧凑强逻辑的 P/L 应用正例，也可校准“删掉拼接房间后聚焦核心矛盾”的成功方向。
```
