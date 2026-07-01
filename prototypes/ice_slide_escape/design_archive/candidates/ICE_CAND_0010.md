# Candidate: ICE_CAND_0010

```yaml
candidate_id: ICE_CAND_0010
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
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0010_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0010_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0010_order_gates.md
```

## Layout

Solve instance:

```yaml
player_start: [14, 8]
player_goal: [0, 9]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##I.....I@
...#...........
...####........
##############.
##############.
##############.
##############.
```

## Core Logic

```text
Player insight:
玩家需要把三个前置状态都读成 final d6 group 的组成条件，而不是独立小题：
d3 移除 [7,8] 让 final 碰撞从 d5 pass-through 改成 d6；d4 在 [4,8] 加入 group；
d5 在 [3,8] 加入 group。最终 d6 摧毁完整 group 后才同时盖 target 并打开出口。

Causal chain:
1. d3 移除 [7,8]，否则 final push 会按 d5 pass-through 解析并死局。
2. d4 把 [4,5] 冰反弹到 [4,8]，成为 final d6 group member。
3. d5 把 [3,1] 冰 pass-through/restart 到 [3,8]，成为 final d6 group member。
4. final 冰从 [13,8] 向左，d6+ 摧毁 [6,8],[5,8],[4,8],[3,8],[2,8]，d1 停在 [1,8] target。
5. 被摧毁 group 打开右侧到 [0,9] edge goal 的通道。
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0010_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0010_start_refine.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0010_order_gates.md
```

## Retrieval Summary

```text
Rejected group-assembly final-d6 candidate. It has the strongest hard evidence of the round: d3/d4/d5 all alter the final d6 group, and missing any setup makes final push dead. Critic still rejected it for route overhead, many equivalent edge starts, and setup-collection-then-final-d6 role fit below endgame capstone.

```