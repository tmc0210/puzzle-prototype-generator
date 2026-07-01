# Candidate: ICE_CAND_0033

```yaml
candidate_id: ICE_CAND_0033
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_02_round19_fresh_v7_accepted
status: accepted
llm_candidate_strength: compact_same_ice_d4_revisit_misdirection
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 5
aesthetic_label: 标杆范例
difficulty_score: 2
difficulty_label: 简单应用
allowed_exposure_through: pass_through_d5
allowed_exposure_note: "base 允许至 d5、核心为 d4；meta 默认全部知识但实际亮点仍是 d4 回访。"
motifs:
  - short_stop_d1_d2
  - destroy_moving_ice_d3
  - d4_rebound
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - same_ice_revisit
  - misdirection_without_knowledge_delta
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
human_comment_ids:
  - HC_ICE_CAND_0033_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round19_fresh_v7_accepted.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
  - prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
  - prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
  - prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
  - prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round19_v7.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [1, 0]
  B: [0, 2]
  C: [7, 7]
  D: [8, 5]
base_instance:
  player_start: [1, 0]
  player_goal: [0, 2]
meta_instance:
  player_start: [7, 7]
  player_goal: [8, 5]
win_condition: ice_slide_escape_explicit_goal
```

```text
#.#######
#.....I.#
..I..G.##
#####.###
##....#.#
##.#..#I.
##...I..#
#######.#
```

## Core Logic

```text
Base A->B 是一次轻量 d4 rebound：玩家从 A 进入，右推 [2,2] 的冰，冰滑行四格
后回弹到 [5,2] target，然后玩家返回 B。

Meta C->D 回访同一结构：先用 [5,6] 的 d3 清理释放路线，再让同一核心冰
[2,2] 执行三次 d4，分别在 [5,2]、[5,5]、[5,2] 间重读 target 与路线状态，
最后用右侧出口冰的 d1 短停收束到 D。身份覆盖探针完整搜索未找到缺少这组三次
核心 d4 的 meta 胜利路径反例。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0033_001
    author: human_designer
    status: accepted
    aesthetic_score: 5
    difficulty_score: 2
    attached_to:
      - candidate
      - designer_claim
      - tool_evidence
    text: >
      这关的结构非常有趣：初见只需一次简单d4 用于打开通路，回访时则有一个
      有趣的心路历程 “这关我刚做过，只用一次d4->不对，我是要去D，怎么路
      被堵了？-> 哦还能继续做”。在 meta 流程没有比base新增知识的前提下，
      这一关做出了非常有趣的小误导、小反转，值得借鉴。
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 5
  aesthetic_label: 标杆范例
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: pass_through_d5
  score_source:
    - HC_ICE_CAND_0033_001
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: not_applicable
  puzzle_critic_artifact: not_applicable
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: present
  latest_review_iteration: human_review_1
  latest_candidate_version_reviewed: ICE_EXP_META_2026_07_02_round19_v7
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round19_fresh_v7_accepted.md
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round19_fresh_v7_layout.txt
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/review_loop_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round19_v7_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_base_d5_cap.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round19_v7_meta_required_core.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round19_v7_ABCD.md
- prototypes/ice_slide_escape/reports/ice_identity_trace_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/identity_coverage_probe_ICE_EXP_META_2026_07_02_round19_v7.md
- prototypes/ice_slide_escape/reports/evidence_integrity_check_ICE_EXP_META_2026_07_02_round19_v7.md
```

## Retrieval Summary

```text
人类接受的低难度高审美 meta-first 参考，审美 5、难度 2。Base 是一次简单
d4 rebound，meta 没有新增知识差，却把同一核心冰改造成三次 d4 的回访重读：
玩家先以为“这关刚做过，一次 d4 就行”，随后因目标 D 和路线堵塞发现旧答案
不够，并继续解开同一结构。价值在小误导、小反转和同冰复用，不在高难度、
大空间交融或新机制展示。A/B 不相邻，A/B->C/D 与非接口边界出口均被扫描排除。
```
