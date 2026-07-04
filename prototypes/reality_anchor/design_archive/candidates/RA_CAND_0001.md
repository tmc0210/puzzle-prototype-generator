# Candidate: RA_CAND_0001

```yaml
candidate_id: RA_CAND_0001
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_04_dual_axis_anchor_lock
source_candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 4
difficulty_label: 阶段挑战
allowed_exposure_through: all_current_reality_anchor_runtime_rules
motifs:
  - dual_anchor
  - orthogonal_anchor_pressure
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_merge
  - sticky_rigid_move
  - target_covering_anchor
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - mechanism_variety
  - high_design_density
  - strongly_coupled_elements
  - clear_player_facing_conflict
  - compact_causal_chain
failure_modes:
  - no_unique_route_claim
  - object_identity_not_proved
  - player_insight_playtest_caveat
human_comment_ids:
  - HC_RA_CAND_0001_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_dual_axis_anchor_lock.md
evidence_refs:
  - prototypes/reality_anchor/reports/submission_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.zh.md
  - prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review4.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
  - prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
```

## Layout

Solve instance:

```yaml
player_start: [1, 3]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: vertical
box_sticky_anchor: horizontal
```

```text
##########
#.##MG.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Core Logic

```text
玩家需要同时处理竖直 P/L 与水平 B/S 两条正交边界。P/L 提供 pull-side
访问和右侧收尾压力，B/S 则负责材料状态债务。

上方目标旁的 M 左侧被墙封住，不能读成直接左推。返回解通过移动 B/S、拉动
crate/B-S 关系、移动 P/L 和消耗下方黏性刚体，最终把 crate 推过 B/S 边界，
触发 box_to_sticky 与 sticky_merge，形成可推动的下方把手并覆盖上目标。

完整事件组探针支持所有胜路都包含两类 anchor shift、pull、material
normalization、sticky_merge 和 sticky rigid movement。归档不声明唯一路线、
具体对象实例必经或逐目标对象身份必经。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_RA_CAND_0001_001
    author: human_designer
    status: accepted
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - candidate
      - design_claim
      - tool_evidence
      - review_loop
    text: >
      机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
      综合质量较高的好关。
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
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_source:
    - HC_RA_CAND_0001_001
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
  latest_review_iteration: review_4
  latest_candidate_version_reviewed: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review4
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: present
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Independent evidence reviewer and puzzle critic both reached
    proposal_ready_with_caveats with required_action:none. Human review then
    accepted the candidate and supplied aesthetic/difficulty calibration.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/submission_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.zh.md
- prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review4.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 正例，审美 4、难度 4。候选同时使用竖直 P/L 与
水平 B/S：P/L 提供 pull-side 和右侧目标压力，B/S 提供材料边界债务；上方 M
被墙封住后，返回解通过 box_to_sticky + sticky_merge 制造下方把手覆盖上目标。
人类评语强调机制使用多样、设计密度高、要素强耦合、玩家视角矛盾明显。工具
证据支持全胜路事件组必要性，但不声明唯一路线或对象实例级必要性。
```

