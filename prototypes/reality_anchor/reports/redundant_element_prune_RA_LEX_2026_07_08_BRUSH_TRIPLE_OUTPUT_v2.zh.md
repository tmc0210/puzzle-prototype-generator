# Redundant Element Prune: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2

candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
prototype: reality_anchor
status: pruned

## Final Layout

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

## Prune History

工作草稿 `RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v1` 的核心链成立，但左侧开放空间过宽：

```text
#############
#......G#####
#....@C.MM###
#..##.....G##
#..##...G####
#.....BS..###
#############
```

v2 将左侧空域压成一条必要回线：

- 上方只保留玩家站到目标左侧/上推 C 所需的两格。
- 中层只保留开局绑定、`MMM` 下移、`CCM` 输出和右侧目标口。
- 下层只保留回到 B/S anchor 左侧、连续推动 B/S 两次、以及后续回填所需通道。

## Hard Facts After Prune

- v2 shortest cost: 17, same as v1
- v2 graph: complete
- v2 reachable states: 5140, down from v1 35393
- v2 winning states: 4, down from v1 5
- Returned trace and event counts are unchanged:
  - `box_to_sticky:n1 = 1`
  - `sticky_merge:n1 = 1`
  - `move_sticky_rigid = 2`
  - `anchor_boundary_shift:box_sticky = 2`
  - `sticky_to_box:n1 = 2`

refs:

- `layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v1.md`
- `layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md`
- `trace_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2.md`

## Retained Elements

- C at [6, 2]: source object that crosses the boundary and completes `MMM`.
- MM at [8, 2] and [9, 2]: initial sticky pair that receives the C and becomes the three-cell footprint.
- B/S at [6, 5] and [7, 5]: movable boundary anchor; two pushes are required in all wins.
- target [7, 1]: consumes the upper C output and prevents one-cut low-count wins after target deletion.
- target [10, 3]: consumes the remaining sticky tail.
- target [8, 4]: consumes the lower C output and forces the second brush/cut.
- floor [6, 1], [7, 1]: top stance/goal line for the upper C push.
- floor [5, 2] through [9, 2]: opening, merge, and first sticky-rigid handoff.
- floor [5, 3] through [10, 3]: remote footprint lane and right target mouth.
- floor [5, 4] through [8, 4]: return route, C-output stance, lower target.
- floor [5, 5] through [9, 5]: B/S two-push lane.

## Removed Elements

Removed from v1 by tightening to v2:

- all unused left-side top room cells outside the returned player/object route
- unused lower-left corridor slack
- unused wall-pocket outline around the old wider left room

## Remaining Caveat

This prune is evidence-based but not an exhaustive per-cell wallification proof. The retained cells are all used by the returned trace as player stance, object path, target mouth, or movable B/S path. Candidate packet should present this as a compact-pruned version, not as a mechanically exhaustive minimality theorem.
