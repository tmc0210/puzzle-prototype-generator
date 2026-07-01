# 候选：ICE_CAND_0023

```yaml
candidate_id: ICE_CAND_0023
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round4_shared_rebound_crossbar_held_proposal
status: held_proposal
llm_candidate_strength: held_meta_reuse_candidate
human_final_status: pending
archive_eligibility: human_pending
review_integrity: independent_review
motifs:
  - short_stop_d1_d2
  - d4_rebound
  - d5_pass_through
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
archive_use:
  - critic_calibration
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round4_shared_rebound_crossbar_held_proposal.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0023_v4_shared_rebound_crossbar_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_base_A_to_B_high.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_base_goal_B_required_high.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_meta_goal_D_required.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0023_v4_ABCD.md
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
#....#########
..IGI#.....I..
#....#######.#
..IGG#.....I..
#....######..#
#....######I.#
#...I######..#
#....#########
##############
```

## 核心逻辑

```text
Base A->B 是 d1 -> d4 -> d1 链：[2,2] 填 [3,2]，[4,7] 通过 d4 rebound
借 [4,2] 填 [4,4]，再用 [2,4] 填 [3,4]。
Meta C->D 是 d5/restart 重读：[11,2] 和 [11,4] 向左穿过 [5,2]/[5,4]
一带，分别借左侧冰停到 [3,2]、[3,4]；[11,6] 上移后再次向左填 [4,4]。
独立 review 认为 cross-time role reuse 真实，但 base 仍 application-lite、
meta 仍线性，因此保留为 held_proposal。
```

## 人类评语

```yaml
human_comments: []
status: pending
```

## 证据引用

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round4_shared_rebound_crossbar_held_proposal.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0023_v4_shared_rebound_crossbar_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_base_A_to_B_high.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0023_v4_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_base_goal_B_required_high.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0023_v4_meta_goal_D_required.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0023_v4_ABCD.md
```

## 检索摘要

```text
Independent-review held meta candidate，无人类评语。v4 将 base 从纯短停链升级为
带 required d4 rebound 的三推链；meta 是干净的 d5/restart 重读。强点是三个
shared targets 在 base/meta 中由不同冰填入，且 [4,2]/[2,2]/[2,4] 跨时间换位。
硬可达性 gate 通过。Caveat：critic 保留 held，不是 proposal_ready；base 偏
application-lite，meta 偏线性。
```