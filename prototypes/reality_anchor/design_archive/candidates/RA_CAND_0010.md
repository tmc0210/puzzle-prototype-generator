# Candidate: RA_CAND_0010

```yaml
candidate_id: RA_CAND_0010
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_push_pull_curriculum
source_candidate_version: RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: null
motifs:
  - push_pull_anchor
  - movable_anchor
  - anchor_timing
  - crate_pull_push
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
failure_modes:
  - repeated_anchor_sweep
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
  - prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_instance_core.md
  - prototypes/reality_anchor/reports/order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
  - prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
```

## Layout

Solve instance:

```yaml
player_start: [5, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: movable horizontal
box_sticky_anchor: none
```

```text
#########
#..PL...#
#.G..@C.#
#########
```

## Core Logic

```text
第四关可移动 P/L timing witness：玩家先在初始 pull side 将同一箱子向左拉两格，再把 P/L 向右推三格，最后在新边界下把该箱子向左推上目标。
review_2 object-specific probe 支持所有胜路都包含 pull_object:crate#1、push_object:crate#1 与 anchor_boundary_shift:push_pull。
order scan 完整，未发现先移动 P/L 再产生 crate event 的胜路；reachable scan 无材料事件外溢。
人类归档定位为“结构简单，逻辑清晰”，审美 3 / 难度 2。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 结构简单，逻辑清晰
    created_at: 2026-07-04T18:24:23.975Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 3
  aesthetic_label: 可用下界
  difficulty_score: 2
  difficulty_label: 简单练习
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_001
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review2.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_review_1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1_instance_core.md
- prototypes/reality_anchor/reports/order_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
- prototypes/reality_anchor/reports/reachable_scan_RA_CURR_2026_07_05_L04_MOVABLE_PL_TIMING_v1.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第四关可移动 P/L timing witness，审美 3、难度 2。结构简单，逻辑清晰：先拉同一箱子预处理，再推动 P/L 改边界，最后推箱收束。它是可用下界/早期应用校准，亮点在时机清楚，不在复杂空间或高难搜索。
```
