# Submission: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2

candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
prototype: reality_anchor
status: accepted_for_playtest_queue
date: 2026-07-08

## Layout

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## Accepted Score Posture

- difficulty: 3
- aesthetic: strong 3

This is a compact challenge candidate built around `C -> MMM -> CMM -> CCM`: bind one C into a three-cell sticky footprint, move it into a remote brush lane, push B/S twice to cut two C outputs, then consume two C targets and one M tail target.

## Evidence Refs

- `prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_review1.zh.md`
- `prototypes/reality_anchor/reports/design_claim_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.zh.md`
- `prototypes/reality_anchor/reports/goal_prune_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.zh.md`
- `prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.zh.md`
- `prototypes/reality_anchor/reports/evidence_review_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_review_1.md`
- `prototypes/reality_anchor/reports/puzzle_critic_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_review_1.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md`
- `prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_core5.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_sticky_to_box_min2_sticky_to_box_min2.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_move_sticky_min2_move_sticky_rigid_min2.md`

## Caveats To Preserve

- The top target is a count-gate responsibility, not a shortest-cost responsibility.
- The final M target is a valid sticky-tail consumer, but it is a weak endpoint closure rather than a deep subproblem.
- The order probe found an early-cut long win, so the design claim is event/count necessity, not universal clean ordering.

## Lexicon Used

- `B/S 绑定债：箱资源生成刚体 footprint`
- `B/S 移动边界刷产物：远程生成与门口消费`
- `固定 B/S 切割：C+M 尾巴与单格目标袋`
- `刚体黏块 + 墙口`

Only `mechanism_lab/lexicon.md` was read for design lexicon composition; `mechanism_lab/runs/` was not read.
