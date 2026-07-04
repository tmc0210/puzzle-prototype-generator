# Candidate: ICE_CAND_0037

```yaml
candidate_id: ICE_CAND_0037
prototype: ice_slide_escape
candidate_version: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
experiment_id: ICE_EXP_META_2026_07_02_round39_l_ladder_rejected
status: rejected_candidate
llm_candidate_strength: overaccepted_proposal_ready_with_caveats
human_final_status: rejected_candidate
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 1
aesthetic_label: 反例样本
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: ice_rebound_d4
motifs:
  - d4_rebound
  - target_ice_coverage
  - all_initial_ice_on_targets
  - target_debt_refill
  - explicit_edge_goal
  - attempted_meta_reinterpretation
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
strengths: []
failure_modes:
  - repeated_step_stitching
  - no_meta_insight
  - overclaimed_target_debt
  - fatal_interface_spillover
  - reviewer_overaccepted_noncore_caveat
  - aesthetic_underfit
search_ledger_status: exploration_log_present
review_loop_state: rejected_candidate
latest_review_iteration: review_2
open_required_action_after_latest_review: none
human_comment_ids:
  - HC_ICE_CAND_0037_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round39_l_ladder_rejected.md
```

## Layout

Solve instances:

```yaml
base_instance:
  player_start: [7, 0]
  player_goal: [19, 12]
meta_instance:
  player_start: [0, 3]
  player_goal: [9, 14]
win_condition: ice_slide_escape_explicit_goal
```

```text
#######.############
#######.############
#######.############
....###.############
###.*....###########
####......##########
#######.############
#######..###########
########*.##########
########..##########
########....########
########..#.*....###
########..##........
#########.##########
#########.##########
```

## Core Logic

```text
这是一个人类归档反例。布局满足“所有目标初始都有冰，且没有 off-target ice”的
表层条件；LLM 提交时把它解释成 base/meta 都要把已完成 target 临时借走、
再重填的 target-debt 结构。

人类评审判定其核心失败不是可解性，而是审美和 meta 逻辑：三个步骤只是同一种
d4 target-door 动作的拼接，没有新洞见；base/meta 的区别主要来自接口重配，
不是玩家读法的实质改变。

另有硬结构问题：A -> D 存在 cost20 可解外溢。这个外溢破坏了所需的 base/meta
接口隔离，不能被降为 noncore caveat。
```

## Human Verdict

```yaml
comments:
  - id: HC_ICE_CAND_0037_001
    author: human_designer
    attached_to:
      - candidate
      - designer_claim
      - puzzle_critic_artifact
      - interface_scan
    aesthetic_score: 1
    difficulty_score: 2
    text: >
      典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，
      无任何价值，并且有A->D外溢的致命问题
```

## Independent Review Summary

```yaml
review_1:
  candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v1
  evidence_review:
    file: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
    verdict: does_not_support_claim
    required_action: downgrade_or_hold
  puzzle_critic:
    file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
    verdict: revise_required
    required_action: structural_revision
designer_action_1:
  file: prototypes/ice_slide_escape/reports/designer_action_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
  action: revise_interface_pairing_and_lower_claim
review_2:
  candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
  evidence_review:
    file: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_review_2.md
    verdict: supports_with_caveats
    required_action: none
  puzzle_critic:
    file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_review_2.md
    verdict: supports_with_noncore_caveats
    required_action: none
human_override:
  status: rejected_candidate
  reason: >
    Human review treats the repeated-step construction and A->D spillover as
    decisive failures. The independent review artifacts remain useful as a
    calibration case for overaccepting solver-supported but insight-poor meta claims.
```

## Evidence Refs

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v1_layout.txt
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_edges.zh.md
prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round39_l_ladder_v2.zh.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.json
prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base_no_d5d6.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base_no_d5d6.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta_required_d4.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta_required_d4.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_A.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_A.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_B.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_B.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_C.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_C.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_D.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_D.json
prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_review_2.md
prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_review_2.md
prototypes/ice_slide_escape/reports/pre_human_polish_pass_ICE_EXP_META_2026_07_02_round39_l_ladder_v2.md
prototypes/ice_slide_escape/reports/submission_ICE_EXP_META_2026_07_02_round39_l_ladder_v2.md
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
  latest_candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: present
  review_integrity: human_review
  review_loop_state: rejected_candidate
  unresolved_core_attacks:
    - "A->D cost20 外溢被人类评审判为致命问题"
    - "重复 target-door 步骤没有 meta 洞见"
  archive_eligibility: clean_archive
```

## Retrieval Summary

```text
人类归档反例：审美 1、难度 2。布局表面上满足所有目标初始被冰覆盖、并通过 d4
target-door 借还打开路线，但人类评审判定它只是三个无洞见重复步骤的拼接，不应
声称为有价值的关卡或 meta 流程。A->D cost20 外溢是致命接口问题，说明 critic
把它降为 noncore caveat 是过宽接受。用作负例：可解、完整图、required-event 和
review_ready 都不能替代真实洞见与接口隔离。
```
