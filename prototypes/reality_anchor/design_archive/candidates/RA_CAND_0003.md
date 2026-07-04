# Candidate: RA_CAND_0003

```yaml
candidate_id: RA_CAND_0003
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_04_fixed_anchor_transitions
source_candidate_version: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: all_current_reality_anchor_runtime_rules
motifs:
  - dual_anchor
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_rigid_move
  - target_covering_anchor
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
failure_modes:
  - no_unique_route_claim
  - object_identity_not_proved
human_comment_ids:
  - HP_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_fixed_anchor_transitions.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_feedback_revisions_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_feedback_revisions_review_1.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6_core4.md
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
固定 P/L 提供左侧 pull 语法，B/S 下推后设置材料边界。玩家把竖向黏块二连
先作为 sticky 刚体上提，随后上格跨入 box side 触发 sticky_to_box 并与下格分离；
第二次 pull 把上格箱子放到上目标，下方黏块留在下目标。

普通双箱 analog 完整无解，说明这里不是普通箱多推几步，而是“整体上提 -> 材料
分离”的简单教学结构。归档定位为教学/可用下界，不声明高难。
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

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: present
  post_revision_evidence_rerun: present
  latest_review_iteration: review_1
  latest_candidate_version_reviewed: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v6
  open_required_action_after_latest_review: none
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 教学/可用下界样本，审美 3、难度 2。固定 P/L + 可
移动 B/S；核心是 B/S 分离黏块：竖向 sticky pair 先整体上提，再 sticky_to_box
分离覆盖上下目标。人类评语定位为“简单可用教学关”。工具证据支持普通箱替代无解
和核心事件组必要，但不声明对象身份级唯一性。
```
