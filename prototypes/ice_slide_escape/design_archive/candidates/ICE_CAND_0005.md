# Candidate: ICE_CAND_0005

```yaml
candidate_id: ICE_CAND_0005
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
status: held_proposal
llm_candidate_strength: held_proposal
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_29_failed_search.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0005_d6_first_dead.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.json
```

## Layout

Solve instance:

```yaml
player_start: [0, 2]
player_goal: [9, 0]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
#########.####
#########.####
@I......##.GG#
.###########.#
.#############
.###########.#
.###########.#
.###########.#
.###########.#
.###########.#
.###########I#
.............#
##############
```

## Core Logic

```text
Player insight:
玩家不能先推眼前主冰。必须先做远端竖向 d5 pass-through + restart setup，把
右侧冰停到 [12,2] target；这块 target ice 随后不是静态覆盖物，而是主冰 d6
开门后的停止障碍。

Causal chain:
1. 从 [0,2] 走到底部和右侧推位 [12,11]。
2. 推 [12,10] 冰向上：冰在 d5 穿过 [12,4] 墙后 restart，随后 d2 short-stop
   停在 [12,2] target。
3. 返回 [0,2]，推 [1,2] 主冰向右：主冰 d6+ 摧毁 [8,2]-[9,2] 墙组并 restart。
4. 主冰经过被毁墙组后撞到 [12,2] 的 target ice，d2 short-stop 到 [11,2]
   target。
5. 玩家通过被摧毁的 [9,2] 通道到达显式 edge goal [9,0]。
```

## Human Verdict

```yaml
comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_29_failed_search.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0005_d6_first_dead.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0005_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_start_refine.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_left.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_top_to_bottom_left.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0005_meta_bottom_to_top.json
```

## Retrieval Summary

```text
Held ICE_EXP_003 all-knowledge attempt. d5 setup target ice is later consumed by
d6 restart as an obstacle, and d6 destruction opens explicit goal access. Strong
mechanism interlock, but independent critic held it because two meaningful push
commitments were too thin for final-game capstone quality.
```
