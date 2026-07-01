# Candidate: ICE_CAND_0009

```yaml
candidate_id: ICE_CAND_0009
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
status: rejected_candidate
llm_candidate_strength: rejected_candidate
human_final_status: pending
archive_eligibility: raw_run_only
review_integrity: independent_review
motifs:
  - d4_rebound
  - d5_pass_through
  - d6_destroy_group
  - destroy_moving_ice_d3
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - all_mechanic_endgame
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0009_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0009_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0009_order_gates.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 6]
player_goal: [14, 3]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
###############
#.#############
#G#########G###
#.##########...
#..I.....##.###
#I..###########
@.#.###########
#.#.#######.###
#...I...###.###
####.######.###
####.######.###
####.######.###
####.######.###
####.######I###
####........###
```

## Core Logic

```text
Player insight:
玩家需要先用 d5 在 [11,4] 生成临时冰；这块冰不是 target/stopper，而是被 final
d6 摧毁的 group extender。final d6 只有在 [11,4] 存在时才会摧毁 len4 group，
盖 [11,2] 并打开上层出口。

Causal chain:
1. d4 把左侧冰反弹到 [1,2]，同时清左侧进入后续区域的门。
2. d5 把 [3,4] 冰经 [9,4]-[10,4] 后停在 [11,4]。
3. d3 清 [4,8] 竖井门以到达底部 push 位。
4. final d6 摧毁 [11,6],[11,5],[11,4],[11,3]，盖 [11,2] 并打开到 [14,3] 的路线。
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0009_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0009_start_refine.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0009_order_gates.md
```

## Retrieval Summary

```text
Rejected d5 temporary-group-extender candidate. The d5 product is consumed by final d6 and the edge route is mechanically opened, but critic held it as still too close to 0006-family with d4/d3 underfit as target/route gates and only one strong d5 -> d6 interlock.

```