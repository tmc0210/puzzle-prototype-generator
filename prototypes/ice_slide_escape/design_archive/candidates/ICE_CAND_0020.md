# 候选：ICE_CAND_0020

```yaml
candidate_id: ICE_CAND_0020
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_06_30_round1_meta_gate_proposal_ready_with_caveats
status: accepted_functional_meta_connector
llm_candidate_strength: functional_meta_connector_overclaimed
human_final_status: accepted_functional_meta_connector
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 1
difficulty_label: 教学见证
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
archive_use:
  - functional_meta_connector_reference
  - human_taste_reference
  - overclaim_calibration
  - critic_calibration
  - designer_calibration
human_comment_ids:
  - HC_ICE_CAND_0020_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round1_meta_gate_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_base_goal_B_ABCD.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_meta_goal_D_ABCD.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0020_v1_ABCD.md
```

## 布局

求解实例：

```yaml
interfaces:
  A: [0, 2]
  B: [0, 4]
  C: [13, 2]
  D: [13, 4]
base_instance:
  player_start: [0, 2]
  player_goal: [0, 4]
meta_instance:
  player_start: [13, 2]
  player_goal: [13, 4]
win_condition: ice_slide_escape_explicit_goal
```

```text
##############
##############
..IG#.....I...
#.########.###
..IG#......I..
##########...#
##############
```

## 核心逻辑

```text
Base A->B 是两条左侧 lane 的简单短停 witness：[2,2] 和 [2,4] 右推 d1，
分别填到 [3,2] 和 [3,4]。
Meta C->D 从右侧回访复用同两条 lane：右侧远冰通过 d5 / d6 与 restart，
借左侧原本的近端冰作为 stopper，完成同两个 target。
证据支持 base/meta 路由和边缘隔离；人类评语明确把它定位为功能性 meta
connector / 路线调度拼图素材，而非高质量 application。
```

## 人类评语

```yaml
human_comments:
  - id: HC_ICE_CAND_0020_001
    author: human_designer
    status: accepted_functional_meta_connector
    text: >
      这关满足了 meta 需求，但是 base 和 meta 流程实际上分别都是简单 witness
      而非 LLM 声称的 application。不过这关拿来放游戏里做一个拼图能接受，
      因为大地图知识锁机制需要很多并不难、甚至非常简单或者就是 witness，
      但是有 meta 价值的关卡来作为流程衔接。这关的优点在于不容易暴露后期
      知识，留作调度地图路线的拼图素材还不错；这不代表这关本身的质量足够高，
      而是功能性恰好合适。由于 base 和 meta 之间的复用伏笔不会被玩家在 base
      流程中感受到，只会在 meta 回访流程中注意到，所以 designer 和 critic
      都高估了这关的单独 base 流程和 meta 流程的难度和复杂度。本关只代表“流程能走通、可作为路线调度拼图素材”的生态位，在审美上需要作为典型反例，不是通常的生产目标，更不能作为审美接受的下界。不要继续批量生产 0020 水平的关卡，而应该直接reject。
status: accepted_functional_meta_connector
```

## 证据引用

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_06_30_round1_meta_gate_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0020_v1_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_base_goal_B_ABCD.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0020_v1_meta_goal_D_ABCD.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0020_v1_ABCD.md
```

## 检索摘要

```text
人类接受为功能性 meta connector / 路线调度拼图素材，而非强 application。
Base A->B 和 Meta C->D 单独看都偏简单 witness。价值在于初见低暴露、
回访可用、左进左出 + 右进右出的接口形态少见。该条是重要 overclaim
calibration：base/meta 跨时间复用只能支持回看价值，不能反过来拔高
base 流程或 meta 流程自身的复杂度。
```