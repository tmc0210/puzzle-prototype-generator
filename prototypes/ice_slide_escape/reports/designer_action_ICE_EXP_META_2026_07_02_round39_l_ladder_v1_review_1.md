# Designer Action 1：ICE_EXP_META_2026_07_02_round39_l_ladder_v1

```yaml
review_iteration_addressed: 1
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round39_l_ladder_v1
evidence_review_ref: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
puzzle_critic_ref: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round39_l_ladder_v1_review_1.md
designer_action: revise_structure_and_claim
next_candidate_version: ICE_EXP_META_2026_07_02_round39_l_ladder_v2
```

## Review 1 攻击点

- Evidence reviewer: hard facts support explicit starts/goals, d4 required gate, base no d5/restart/d6 reachable scan, and interface facts; claim overstates returned shortest solution target sequence as all-solution per-object target-debt necessity.
- Puzzle critic: v1 has too much three-door isomorphism; central gate is mostly repeated, not reinterpreted; `A->C`, `A->D`, and `B->D` internal non-target pairs weaken target-pair reading; score fit should be treated as revise-required rather than 4+.

## 处理动作

- Keep the fresh layout family, but revise the paired instances:
  - v1 base was left->bottom and meta was top->right.
  - v2 base is top->right: shared central target first, then right target.
  - v2 meta is left->bottom: left target first, then shared central target.
- This changes the shared central target from v1's repeated middle step into a complementary role:
  - base reads it as opening debt from the top entrance;
  - meta reads it as the final debt/exit gate after the left-side preparation.
- Rewrite claim as returned-solution-supported target-debt route facts plus event-class required gates; do not claim per-object all-solution necessity.
- Re-run base and meta evidence because start/goal roles changed.

## 新证据引用

```yaml
base_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base.md
meta_analysis: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta.md
base_no_d5d6: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_base_no_d5d6.md
meta_required_d4: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_meta_required_d4.md
interface_scans:
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_A.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_B.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_C.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round39_l_ladder_v2_interface_goal_D.md
```

## Review 2 已知剩余风险

- The layout still uses d4 target-debt doors; v2 must not claim a 5-level twist.
- `A->D` (top->bottom) remains a risky internal non-target pair and must be disclosed.
- The design target is revised to stable 4 / 4-4+, not self-claimed 5.
