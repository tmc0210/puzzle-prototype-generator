# Candidate: RA_CAND_0005

```yaml
candidate_id: RA_CAND_0005
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_04_dual_lockstep
source_candidate_version: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4
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
human_comment_ids:
  - HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_dual_lockstep.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_feedback_revisions_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_feedback_revisions_review_1.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4.md
  - prototypes/reality_anchor/reports/goal_prune_audit_2026_07_04.md
```

## Layout

```yaml
player_start: [2, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
###########
###.PL.####
##@BS.G####
###.MM...G#
#####..####
###########
```

## Core Logic

```text
玩家需要在 push 世界触及处于拉世界语义下的远目标，从而构造黏块 + B/S 锚点的
三格长链。前段 B/S 触发 sticky_to_box / box_to_sticky 与 sticky_merge，中段将
合体结构放入仅剩的双格缓冲区，随后连续推进 B/S 链触达右端目标，最后用 P/L pull
收束右侧上方目标。

旧 v3 的右下 M 与多余空格已通过反事实证明不必要并删除；v4 只保留两个共同必要
的下方缓冲格。事件组探针支持所有胜路都包含 P/L shift、B/S shift、pull、材料
转换、sticky_merge 和 sticky rigid movement。

2026-07-04 无效目标剔除审计删除了左侧上方目标：两个相邻上方目标中删任意一个
都保持 19 步、完整图 complete、原 expected_trace 合法通关且核心事件组仍全胜路
必经；但同时删除两个上方目标会产生 17 步、缺少 pull 的绕过。因此保留更符合
“拉世界远目标”读法的右侧上方目标。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。
      结构有趣，机制利用率高，整体较好的挑战关。
    created_at: 2026-07-04T15:43:53.599Z
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
    - HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
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
  latest_candidate_version_reviewed: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4
  open_required_action_after_latest_review: none
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  post_archive_goal_prune:
    date: 2026-07-04
    removed_targets:
      - [5, 2]
    retained_targets:
      - [6, 2]
      - [9, 3]
    result: clean_archive_layout_updated
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 挑战关，审美 4、难度 4。玩家侧矛盾是“在推世界
触及拉世界远目标”，解法需要构造黏块 + 锚点三格长链。人类评语强调结构有趣、
机制利用率高、整体较好的挑战关。无效目标剔除已删除左侧上方重复目标，保留右侧
上方目标与右端目标。工具证据支持六组核心事件必要；不声明唯一路线或对象实例级必要性。
```
