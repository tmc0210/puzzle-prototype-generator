# Candidate: RA_CAND_0002

```yaml
candidate_id: RA_CAND_0002
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_04_soft_handoff
source_candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
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
  - strongly_coupled_elements
  - clear_player_facing_conflict
  - compact_causal_chain
failure_modes:
  - no_unique_route_claim
  - object_identity_not_proved
human_comment_ids:
  - HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_soft_handoff.md
evidence_refs:
  - prototypes/reality_anchor/reports/submission_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.zh.md
  - prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6.md
  - prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
```

## Layout

Solve instance:

```yaml
player_start: [5, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Core Logic

```text
玩家先通过 P/L 建立上排 crate 的 pull 通道，再把 crate 与右侧 M 带入材料债务。
中段拉动 B/S 触发 box_to_sticky 与 sticky_merge，使后续对象以 sticky 刚体形态
参与收束。末段 P/L 与 sticky 刚体共同覆盖目标。

人类评审特别认可的洞见是：拉动黏块会打破“P/L 只能按一个方向移动”的直觉。
因此这不是单纯的材料换名，而是把黏性运动和推拉锚点的方向性预期耦合起来。

完整事件组探针支持所有胜路都包含 P/L anchor shift、B/S anchor shift、pull、
material normalization、sticky_merge 和 sticky rigid movement。归档不声明唯一
输入序列或对象实例级必要性。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
      具有较强洞见。
    created_at: 2026-07-04T09:04:41.671Z
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
    - HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
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
  latest_review_iteration: review_2
  latest_candidate_version_reviewed: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: present
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Independent evidence reviewer and puzzle critic both reached
    proposal_ready_with_caveats with required_action:none. Human playtest then
    accepted the candidate and supplied aesthetic/difficulty calibration.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/submission_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.zh.md
- prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_review_2.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 正例，审美 4、难度 4。候选比终局高难短一些，但机制
耦合清楚：P/L 不只是按钮，B/S 的材料换相与 sticky_merge 进入末段收束。人类评语
强调“拉动黏块”打破了玩家对推拉锚点单向移动的假设，洞见较强。工具证据支持核心
事件组必要性，但不声明唯一路线或对象实例级必要性。
```
