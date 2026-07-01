# 候选：ICE_CAND_0022

```yaml
candidate_id: ICE_CAND_0022
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats
status: accepted
llm_candidate_strength: strong_meta_connector_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - target_debt_refill
  - hidden_stopper
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
human_comment_ids:
  - HC_ICE_CAND_0022_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0022_v1_double_debt_meta_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_base_goal_B_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_goal_C_AB_only.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
```

## 布局

求解实例：

```yaml
interfaces:
  A: [0, 2]
  B: [0, 7]
  C: [16, 7]
  D: [16, 2]
base_instance:
  player_start: [0, 2]
  player_goal: [0, 7]
meta_instance:
  player_start: [16, 7]
  player_goal: [16, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
#################
#################
..I.G*#.....I.I..
#.###..######.#.#
#.###I.######.#.#
#.###..######*I.#
#.###########.#.#
..###########....
#################
```

## 核心逻辑

```text
Base A->B 是轻量一推 witness：[2,2] 右推，借 [5,2] target ice 停到 [4,2]。
Meta C->D 是 double-debt chain：先 d3 破坏 [13,5] 已正确 target-ice，
制造右侧 target debt 并打开 x13 推位。
随后 [12,2] d5/restart 预置 [3,2] hidden stopper；[14,5] 回填 [13,5]。
最后 [14,2] d6+ 破坏 [6,2]+[5,2] 并消费 [3,2] 停到 [4,2]，
再由 [5,4] 回填 [5,2]。证据支持硬可达性 gate 和核心链。
```

## 人类评语

```yaml
human_comments:
  - id: HC_ICE_CAND_0022_001
    author: human_designer
    status: accepted
    text: >
      这关非常扎实，我认为完全可以作为合格的 meta 关候选。难度填3主要按meta流程，         base 流程轻度且不暴露右侧知识，并展示复杂结构引人遐想；meta 流程扎实稳健。
      摸不到更高审美分的原因是复用虽然扎实，但是缺了空间、
      要素的交融复用，base 流程下右侧的绝大部分东西都是摆设。meta 部分
      和 base 流程部分分别缺少洞见。当然，这样的
      优点是恰好 base 流程是游戏前期的简单 d2，正好匹配右侧对左侧读题几乎
      零污染，有合理的功能性定位。但注意不要把这关当作一个审美追求目标以降低标准，这关		贴近于一个可接受的meta关卡的下界，不要试图批量生产这样的关卡。
status: accepted
```

## 证据引用

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round3_double_debt_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0022_v1_double_debt_meta_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0022_v1_goal_C_AB_only.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0022_v1_ABCD.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_first_d5_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_final_d6_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_left_refill_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0022_v1_probe_remove_right_refill_ice.md
```

## 检索摘要

```text
人类接受的合格 meta 候选。Base 是前期适配的一推 d2/light witness；
Meta 是 double-debt chain：破坏右侧已填 target、预置 hidden stopper、回填右侧，
再 d6 破坏左侧 target 组并偿还 target debt。价值不在于 base 轻或低污染本身，
而在于简单前期流程恰好匹配几乎零污染的右侧潜伏结构。Caveat：base/meta
各自缺少洞见，空间和要素交融复用不足，不是炫技级 meta 好关。
```