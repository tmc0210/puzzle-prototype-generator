# Candidate: ICE_CAND_0006

```yaml
candidate_id: ICE_CAND_0006
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
status: proposal_ready_with_caveats
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: proposal_ready_with_caveats
archive_eligibility: clean_archive
review_integrity: independent_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - d4_rebound
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - all_mechanic_endgame
archive_use:
  - critic_calibration
  - designer_calibration
  - human_taste_reference
human_comment_ids:
  - HC_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_29_round2_proposal_ready_with_caveats.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0006_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0006_order_gates.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0006_base.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_start_refine.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_left.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_left.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_bottom_left.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_bottom_left.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_bottom_to_top.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_bottom_to_top.json
```

## Layout

Solve instance:

```yaml
player_start: [0, 3]
player_goal: [9, 0]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
#########.####
#######.I..G.#
.I......##GG##
@######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

## Core Logic

```text
Player insight:
玩家需要读出一个三层 stopper cascade：冰块覆盖 target 后并不只是静态完成物，
还会成为后续滑行的碰撞面。上方 d4 产物必须先成为竖向 d5 的 stopper；竖向
d5 产物再成为主冰 d6/restart 后的 stopper。错序会让冰停在错误 target 或错误
位置，完整搜索不可续解。

Causal chain:
1. 玩家先推 [8,1] 冰向右。它在 d4 反弹后落到 [11,1] target。
2. [11,1] 这块 target ice 随后被竖向冰消费为 stopper：玩家推 [11,9] 冰向上，
   冰在 [11,3] 墙处 d5 pass-through，restart 后撞 [11,1]，d1 停在 [11,2]
   target。
3. [11,2] 再成为主冰的 stopper：玩家推 [1,2] 主冰向右，主冰 d6+ 摧毁
   [8,2]-[9,2] 墙组，restart 后撞 [11,2]，d1 停在 [10,2] target。
4. 三个 targets 都被覆盖后，玩家到达显式 edge goal [9,0]。
```

## Human Verdict

```yaml
comments:
  - id: HC_001
    author: human_designer
    text: >
      关卡质量本身不错，左冰误导前置，三个冰块的顺序需要不显然的推理
      （因为几个错误顺序导致的deadend下，冰仍然会落在目标上，错误会在更后
      步骤被发现而非在第一步，但也不会过晚得到反馈），整体而言是非常扎实的
      关卡。审美上的一个瑕疵是左侧绕路过多，我认为应该可以通过左下方的横廊
      上移来缓解。虽然设计目标是游戏的最后期挑战关，这关的难度还是过低了
      一点，但是完全可以作为一个扎实的组合关填充进机制都解锁后的主线流程中。
    attached_to:
      - candidate
      - design_claim
      - critic_attack
      - scc_graph_interpretation
      - routing_result
status: reviewed
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_29_round2_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0006_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_start_refine.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0006_order_gates.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0006_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_start_refine.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_left.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_left.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_bottom_left.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_top_to_bottom_left.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_bottom_to_top.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0006_meta_bottom_to_top.json
```

## Retrieval Summary

```text
Human-reviewed proposal-ready-with-caveats all-knowledge candidate. d4 creates
[11,1] stopper, d5 uses it to create [11,2], and d6 uses [11,2] after wall
destruction to cover the final target. Strong evidence and order probes; human
comment confirms the three-ice order creates real reasoning despite fixed win
order. Best used as a solid post-unlock mainline combination puzzle, with
caveats for left-side detour overhead and slightly-below-capstone difficulty.
```