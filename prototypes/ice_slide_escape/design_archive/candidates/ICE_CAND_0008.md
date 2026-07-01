# Candidate: ICE_CAND_0008

```yaml
candidate_id: ICE_CAND_0008
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
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0008_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0008_start_refine.md
  - prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0008_order_gates.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 3]
player_goal: [13, 11]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
##############
##############
.I......##.G##
@.....I..G.G##
#####.########
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####.##
#####.#####I##
#####.........
```

## Core Logic

```text
Player insight:
玩家需要读出 d6 -> d5 -> d4 的逆向 stopper 消费链：先由 d6 生成 target ice
[11,2]，再由 d5 把它当作 stopper 生成 [11,3]，最后中部冰把 [11,3] 当作
d4 反弹障碍覆盖 [9,3]。

Causal chain:
1. 推 [1,2] 冰向右，d6+ 摧毁 [8,2]-[9,2]，restart 后 d2 停在 [11,2] target。
2. 推 [11,10] 冰向上，d5 穿过墙组并 restart，撞 [11,2] 后 d1 停在 [11,3] target。
3. 推 [6,3] 冰向右，撞 [11,3] 后 d4 反弹，覆盖 [9,3] target。
4. 三个 target 覆盖后，玩家到 [13,11]。
```

## Human Verdict

```yaml
human_comments: []
status: pending
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_all_knowledge_endgame_capstone.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0008_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0008_start_refine.md
- prototypes/ice_slide_escape/reports/prefix_probe_ICE_CAND_0008_order_gates.md
```

## Retrieval Summary

```text
Rejected all-knowledge reverse cascade. Evidence supported d6 -> d5 -> d4 stopper consumption and wrong-order dead prefixes, but independent critic rejected it as an unauthorized ICE_CAND_0006-family sidegrade with an edge-goal tail.

```