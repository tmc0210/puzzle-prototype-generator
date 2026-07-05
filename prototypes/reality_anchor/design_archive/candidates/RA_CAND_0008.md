# Candidate: RA_CAND_0008

```yaml
candidate_id: RA_CAND_0008
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_push_pull_curriculum
source_candidate_version: RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 1
difficulty_label: 教学见证
allowed_exposure_through: null
motifs:
  - push_pull_anchor
  - fixed_anchor
  - push_pull_intro
  - crate_goal_witness
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
failure_modes: []
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review_2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
  - prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_push_pull_required.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_pull_object_min2.md
  - prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
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
第二关固定 P/L 引入 witness：上方箱子只需一次 push 覆盖上目标；下方箱子被墙形引导到从右侧连续两次 pull 后覆盖下目标。
工具证据支持 8 步返回解、完整图 51 states、所有胜路需要 push 与 pull，且无少于两次 pull 的胜路。
reachable scan 未出现 P/L 位移或材料事件。独立 evidence reviewer 与 puzzle critic 均为 proposal_ready_with_caveats / required_action:none。
人类归档定位是“简单推拉锚点引入关”，不是挑战深度样本。
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

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_review_2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_push_pull_required.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2_pull_object_min2.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L02_FIXED_PL_PUSH_PULL_v2.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第二关固定 P/L 引入 witness，审美 2、难度 1。上方是一次 push，下方是两次连续 pull，用低噪声结构教 push/pull side 差异。适合作为功能性课程校准和“早期教学很薄也可接受”的下界参考，不应作为高审美挑战或复杂谜题范例。
```
