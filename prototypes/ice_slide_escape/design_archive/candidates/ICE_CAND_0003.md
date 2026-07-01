# Candidate: ICE_CAND_0003

```yaml
candidate_id: ICE_CAND_0003
prototype: ice_slide_escape
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
status: held_proposal
llm_candidate_strength: held_proposal
human_final_status: pending
archive_eligibility: clean_archive
review_integrity: independent_review
motifs:
  - d4_rebound
  - target_ice_coverage
  - explicit_edge_goal
archive_use:
  - negative_example
  - designer_calibration
human_comment_ids: []
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_2026_06_29_round2_failed_search.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0003_base.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_start_refine.md
  - prototypes/ice_slide_escape/reports/commitment_probe_ICE_CAND_0003_order_gate.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0003_base.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_start_refine.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_meta_reverse.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_meta_reverse.json
```

## Layout

Solve instance:

```yaml
player_start: [1, 8]
player_goal: [4, 8]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
##########
#######..#
#####.#.I#
#....G...#
#.###.##.#
#.###.##G#
#.###I##.#
#.....####
#....#####
```

## Core Logic

```text
Player insight:
中央目标 [5,3] 必须先被读成通往右侧 B 冰的门，之后才被读成 A 冰的覆盖目标。
玩家如果先把下方 A 冰 d4 回弹到 [5,3]，会关闭去右侧 B 冰的路线。

Causal chain:
1. 先穿过仍为空的 [5,3]，到右上方推动 B 冰向下。
2. B 冰 d4 回弹到 [8,5]，覆盖右侧目标，同时中央通道仍开放。
3. 回到下方推动 A 冰向上。
4. A 冰 d4 回弹到 [5,3]，覆盖中央目标并结束目标覆盖义务。
5. 玩家走到显式边缘终点 [4,8]。
```

## Human Verdict

```yaml
comments: []
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_2026_06_29_round2_failed_search.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0003_base.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_start_refine.md
- prototypes/ice_slide_escape/reports/commitment_probe_ICE_CAND_0003_order_gate.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0003_base.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_start_refine.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_meta_reverse.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0003_meta_reverse.json
```

## Retrieval Summary

```text
Held d4 pre-d5 capstone attempt. Clean scans: no d5/d6/restart/boundary report
hits and no d4-free/forbidden winning path. Core idea is central target first
as gate, then as target. Critic held it as a two-push witness/simple application,
not a high-difficulty capstone.
```