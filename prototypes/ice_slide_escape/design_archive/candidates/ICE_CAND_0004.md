# Candidate: ICE_CAND_0004

```yaml
candidate_id: ICE_CAND_0004
prototype: ice_slide_escape
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
status: rejected_candidate
llm_candidate_strength: rejected_candidate
human_final_status: rejected_candidate
archive_eligibility: clean_archive
review_integrity: human_review
motifs:
  - d4_rebound
  - target_ice_coverage
  - explicit_edge_goal
archive_use:
  - negative_example
  - critic_calibration
  - designer_calibration
  - human_taste_reference
human_comment_ids:
  - HC_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
evidence_refs:
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
  - prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_2026_06_29_round3_miner_fix_failed_search.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0004_start_gate.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0004_analysis.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0004_analysis.json
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0004_start_gate.json
```

## Layout

Solve instance:

```yaml
player_start: [10, 4]
player_goal: [10, 4]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
###########
#.G..I.#..#
####...####
#.#.I..G.##
##...#....@
#.G..I..#.#
###########
```

## Core Logic

```text
Player insight:
玩家要把三个目标都读成 d4 rebound 的落点，而不是普通直推目标。每次正确推法
都需要从目标相反侧预判“冰进入四格后撞墙或障碍，回弹一格”才会落在目标上。

Causal chain:
1. 从右侧入口进入后，底部冰向左 d4 回弹，覆盖底部目标。
2. 中层冰向右 d4 回弹，覆盖中层目标。
3. 上层冰向左 d4 回弹，覆盖上层目标。
4. 三个 target 全被冰占据后，玩家回到右侧 edge goal。
```

## Human Verdict

```yaml
comments:
  - id: HC_001
    author: human_designer
    attached_to:
      - candidate
      - designer_claim
      - puzzle_critic_artifact
      - layout
    text: >
      critic评的很准。这是非常简单的三次d4堆叠，没啥可说的。另外起点和终点不应该一样
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_d4_pre_d5_capstone.md
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_002_2026_06_29_round3_miner_fix_failed_search.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0004_start_gate.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0004_analysis.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0004_analysis.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0004_start_gate.json
```

## Retrieval Summary

```text
Human-rejected post-miner-fix d4 capstone attempt. Clean evidence: three d4
rebounds, complete graph, no d5/d6/restart/boundary report-only hits. Rejected
because it is a simple three-d4 stack with weak later consumption, and because
same start/goal is inappropriate for this slot.
```
