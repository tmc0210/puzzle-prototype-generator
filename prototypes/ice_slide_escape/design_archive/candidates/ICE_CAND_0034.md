# Candidate: ICE_CAND_0034

```yaml
candidate_id: ICE_CAND_0034
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_02_round20_v22_rightD_accepted
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 2
difficulty_label: 简单练习
difficulty_detail: "base 2-, meta 3 左右"
allowed_exposure_through: ice_rebound_d4
allowed_exposure_note: "base 可达无 d5/d6/restart；核心解只用 d1 + d4，meta 使用 d6。"
motifs:
  - short_stop_d1_d2
  - destroy_moving_ice_d3
  - d4_rebound
  - d6_destroy_group
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - shared_lower_structure_reuse
  - meta_only_middle_disruption
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
human_comment_ids:
  - HC_ICE_CAND_0034_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round20_v22_rightD_accepted.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round20_v22_rightD_accepted.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [3, 8]
  B: [7, 8]
  C: [12, 0]
  D: [13, 2]
base_instance:
  player_start: [3, 8]
  player_goal: [7, 8]
meta_instance:
  player_start: [12, 0]
  player_goal: [13, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
############.#
###..######..#
###I.######...
###*......I.##
########...###
####.G..I.####
###.II.G.#####
###.....######
###.###.######
```

## Core Logic

```text
Base A->B 是低难度两推 witness：先用 [5,6] 的 d1 短停处理下方结构，再用
[4,6] 的 d4 rebound 完成目标，实际难度约 2-。

Meta C->D 先用 [10,3] 的 d6 group destruction 打开并清理左上目标债，然后左推
[8,5] 的冰，扰乱 / 改写下方结构，迫使玩家重新组织 [5,6]、[4,6] 与 [3,2]。

亮点不是 base 的 d1+d4 本身，而是 meta 回访时 [8,5] 的左推让下方结构获得新读法，
使 C->D 不是完全复刻 base 的简单 d1+d4 流程。Meta 实际难度约 3。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0034_001
    author: human_designer
    status: accepted
    aesthetic_score: 4
    difficulty_score: 2
    difficulty_detail: "base 2-, meta 3 左右"
    attached_to:
      - candidate
      - designer_claim
      - tool_evidence
      - review_loop
    text: >
      较为优秀的设计，亮点在于meta回访时左推（8，5）的冰扰乱下方结构，
      带来新解法而非完全复刻base流程的简单d1+d4 。难度实际应为base2-，
      meta3左右。
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 2
  difficulty_label: 简单练习
  difficulty_detail: "base 2-, meta 3 左右"
  allowed_exposure_through: ice_rebound_d4
  score_source:
    - HC_ICE_CAND_0034_001
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
  latest_review_iteration: review_22
  latest_candidate_version_reviewed: V22_rightD
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: present
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round20_v22_rightD_accepted.md
```

## Retrieval Summary

```text
人类接受的 meta-first 亮点候选，审美 4、归档难度 2，细分难度为 base 2-、
meta 约 3。Base 是干净但偏薄的 d1+d4 两推流程；meta 的价值在于回访时左推
[8,5] 的冰，扰乱并改写下方结构，使后段不是完全复刻 base 的简单 d1+d4。
证据支持 A/B->C/D 不可解、全边缘无非接口逃逸、base 无 d5/d6/restart 暴露。
```
