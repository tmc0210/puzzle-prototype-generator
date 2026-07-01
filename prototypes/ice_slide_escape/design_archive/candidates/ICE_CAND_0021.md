# 候选：ICE_CAND_0021

```yaml
candidate_id: ICE_CAND_0021
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats
status: proposal_ready_with_caveats
llm_candidate_strength: functional_meta_connector_with_small_role_relay
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - latent_element_payoff
archive_use:
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0021_v2_stopper_relay_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_base_goal_B_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_meta_goal_D_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_goal_C_AB_only.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
```

## 布局

求解实例：

```yaml
interfaces:
  A: [0, 2]
  B: [0, 6]
  C: [14, 6]
  D: [14, 2]
base_instance:
  player_start: [0, 2]
  player_goal: [0, 6]
meta_instance:
  player_start: [14, 6]
  player_goal: [14, 2]
win_condition: ice_slide_escape_explicit_goal
```

```text
###############
###############
..I.G*#.....I..
#.##########..#
#.##########I.#
#.##########..#
..##########...
###############
```

## 核心逻辑

```text
Base A->B 是很薄的一推 witness：[2,2] 右推，借 [5,2] target ice 作 stopper，
填到 [4,2] 后离开。
Meta C->D 是小型 stopper-relay：[12,2] 先 d5/restart 穿过 [6,2]+[5,2]，
借 [2,2] 停到 [3,2]，生成非即时 stopper。
随后 [12,4] 上推回主 lane，再第二次 d5，消费 [3,2] stopper 填回 [4,2]。
独立 review 支持路由和 required-event 证据，但无人类评语，且质量只应视作
functional connector with caveats。
```

## 人类评语

```yaml
human_comments: []
status: pending
```

## 证据引用

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round2_stopper_relay_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0021_v2_stopper_relay_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0021_v2_goal_C_AB_only.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0021_v2_ABCD.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_main_lane_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_base_stopper_ice.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0021_v2_probe_remove_vertical_relay_ice.md
```

## 检索摘要

```text
LLM / independent review 标为 proposal_ready_with_caveats，但无人类评语。
Base 是一推 light witness；Meta 是小型 stopper-relay：先 d5/restart 产出
[3,2] hidden stopper，再把竖向潜伏冰转回主 lane 并第二次 d5 消费该 stopper。
硬可达性 gate 通过。用途主要是 critic / designer calibration，不能作为
带人类 taste 背书的正例。
```