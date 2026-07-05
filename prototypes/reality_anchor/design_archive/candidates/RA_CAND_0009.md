# Candidate: RA_CAND_0009

```yaml
candidate_id: RA_CAND_0009
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_push_pull_curriculum
source_candidate_version: RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: null
motifs:
  - push_pull_anchor
  - fixed_anchor
  - same_crate_handoff
  - crate_goal_witness
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
failure_modes: []
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_001
  - HP_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_002
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review3.zh.md
  - prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_human_micro_tweak.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_3.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_3.md
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
  - prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_object_min2.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_pull_object_min2.md
  - prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
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
第三关固定 P/L 应用 witness：同一个箱子先在 push side 右推两次，再在 pull side 下拉两次覆盖目标。
目标左侧墙排除了“一次 pull 后绕回上方再 push”的旁路；二次微调墙缩短左下死路；完整图 130 states。
工具证据支持所有胜路都需要 push 与 pull，且无少于两次 push 或两次 pull 的胜路。
人类归档定位是“简单推拉应用关”，属于操作熟悉练习，不是挑战深度样本。
二次人评指出左下开局死路过长；归档版补一格墙截断 `下，右，下` 误导，不改变主解。
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

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review3.zh.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_human_micro_tweak.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_3.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_3.md
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_review_2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_pull_required.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_push_object_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2_pull_object_min2.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L03_FIXED_PL_HANDOFF_v2.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第三关固定 P/L 应用 witness，审美 2、难度 2。它用同一箱子完成两次 push 后两次 pull 的短 handoff，强调同一对象跨 push/pull side 的操作关系。适合作为简单练习与课程过渡校准；不要包装为高审美或高难结构。
归档后按二次人评补一格左下墙，缩短开局误导死路，核心证据与主解保持同一关卡身份。
```
