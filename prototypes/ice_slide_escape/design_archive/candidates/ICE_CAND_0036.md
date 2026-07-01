# Candidate: ICE_CAND_0036

```yaml
candidate_id: ICE_CAND_0036
prototype: ice_slide_escape
candidate_version: ICE_CAND_0036_all_target_airlock_v1
experiment_id: ICE_EXP_2026_07_02_all_target_airlock
status: proposal_ready_with_caveats
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
human_reviewed: false
aesthetic_score: null
difficulty_score: null
critic_calibrated_target_fit:
  aesthetic: low_4
  difficulty: 3
allowed_exposure_through: null
motifs:
  - d4_rebound
  - target_ice_coverage
  - all_initial_ice_on_targets
  - target_debt_refill
  - explicit_edge_goal
  - ice_stopper_role
  - double_airlock
archive_use:
  - proposal_for_human_review
strengths:
  - all_targets_initially_satisfied_but_route_blocked
  - clean_target_debt_reversal
  - readable_double_airlock
  - complete_graph_evidence
  - independent_review_passed
failure_modes:
  - strict_lifo_overclaim_removed
  - repeated_d4_handfeel
  - static_anchor_ice
  - no_object_identity_all_solution_probe
search_ledger_status: exploration_log_present
review_loop_state: proposal_ready_with_caveats
latest_review_iteration: review_2
open_required_action_after_latest_review: none
human_comment_ids: []
```

## Layout

Solve instance:

```yaml
player_start: [0, 6]
player_goal: [14, 1]
win_condition: ice_slide_escape_explicit_goal
```

```text
#####*####*####
#####..........
#####.####.###.
#####.####.###.
#####.####.###.
#####*....*....
@.....###..####
#####*####*####
###############
```

## Core Logic

```text
本候选的额外 brief 条件是核心：初始 6 个冰全部写成 `*`，没有裸 `I`，
也没有裸 `G`。也就是说，所有箱子都在目标上，且所有目标初始都已被冰占据；
但这些 target-ice 同时封死 [0,6] 到 [14,1] 的路线。

玩家需要把“已经完成的目标冰”读成可以临时借走的门：

1. A 门 [5,5] 向上推，借助 [5,0] 的 target-ice 障碍触发 d4 回弹，A 门冰
   暂离 target 到 [5,2]，打开左侧通路。
2. B 门 [10,5] 向上推，借助 [10,0] 的 target-ice 障碍触发 d4 回弹，B 门冰
   暂离 target 到 [10,2]，打开右侧通路。
3. 从背面把被借走的门冰向下推，借助下方 target-ice 障碍 d4 回弹回对应 target。
4. 两个门 target 都重新被冰覆盖后，玩家沿上廊到达显式 edge goal [14,1]。

重要 caveat：review_1 发现严格“先还 B、再还 A”的 LIFO 顺序不成立；存在先还 A
再还 B 的胜利 replay。因此最终 claim 只保留“双门 target-debt 借还”，不声明
严格逆序或对象身份级全解必要性。
```

## Independent Review Summary

```yaml
review_1:
  evidence_review:
    file: prototypes/ice_slide_escape/reports/evidence_review_ICE_CAND_0036_all_target_airlock_v1_review_1.md
    verdict: supports_with_caveats
    required_action: none
    key_caveat: strict_lifo_overclaim
  puzzle_critic:
    file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_CAND_0036_all_target_airlock_v1_review_1.md
    verdict: supports_with_noncore_caveats
    required_action: none
designer_action_1:
  file: prototypes/ice_slide_escape/reports/designer_action_ICE_CAND_0036_all_target_airlock_v1_review_1.md
  action: revise_claim
  layout_changed: false
review_2:
  evidence_review:
    file: prototypes/ice_slide_escape/reports/evidence_review_ICE_CAND_0036_all_target_airlock_v1_review_2.md
    verdict: supports_with_caveats
    required_action: none
  puzzle_critic:
    file: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_CAND_0036_all_target_airlock_v1_review_2.md
    verdict: supports_with_noncore_caveats
    required_action: none
review_loop:
  file: prototypes/ice_slide_escape/reports/review_loop_ICE_CAND_0036_all_target_airlock_v1.md
  state: proposal_ready_with_caveats
pre_human_polish:
  file: prototypes/ice_slide_escape/reports/pre_human_polish_ICE_CAND_0036_all_target_airlock_v1.md
  status: clean
```

## Evidence Refs

```text
prototypes/ice_slide_escape/reports/ICE_CAND_0036_all_target_airlock_v1_layout.txt
prototypes/ice_slide_escape/reports/candidate_packet_ICE_CAND_0036_all_target_airlock_v1.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0036_all_target_airlock_v1_base.md
prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0036_all_target_airlock_v1_base.json
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0036_all_target_airlock_v1_base_required.md
prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0036_all_target_airlock_v1_base_required.json
prototypes/ice_slide_escape/reports/evidence_review_ICE_CAND_0036_all_target_airlock_v1_review_1.md
prototypes/ice_slide_escape/reports/puzzle_critic_ICE_CAND_0036_all_target_airlock_v1_review_1.md
prototypes/ice_slide_escape/reports/designer_action_ICE_CAND_0036_all_target_airlock_v1_review_1.md
prototypes/ice_slide_escape/reports/evidence_review_ICE_CAND_0036_all_target_airlock_v1_review_2.md
prototypes/ice_slide_escape/reports/puzzle_critic_ICE_CAND_0036_all_target_airlock_v1_review_2.md
prototypes/ice_slide_escape/reports/review_loop_ICE_CAND_0036_all_target_airlock_v1.md
prototypes/ice_slide_escape/reports/pre_human_polish_ICE_CAND_0036_all_target_airlock_v1.md
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: present
  post_revision_evidence_rerun: not_needed_no_layout_or_mechanism_change
  review_after_designer_action: present
  latest_review_iteration: review_2
  latest_candidate_version_reviewed: ICE_CAND_0036_all_target_airlock_v1
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  unresolved_core_attacks: []
  review_integrity: independent_review
  review_loop_state: proposal_ready_with_caveats
  archive_eligibility: human_pending
```

## Retrieval Summary

```text
Fresh all-target-airlock proposal. Every initial ice is on a target, and every target is
initially occupied, but the target-ice doors seal the route from [0,6] to [14,1].
Returned trace uses four d4 rebounds against target-ice anchors: borrow A door,
borrow B door, then repay both door targets from the far side. Independent evidence
review supports the hard event gates and all-target invariant; independent critic
calibrates the candidate as low-4 aesthetic / difficulty 3. Main caveats: strict
LIFO repayment was removed after review_1, repeated d4 handfeel caps the ceiling,
and object-identity all-solution necessity is not proven.
```
