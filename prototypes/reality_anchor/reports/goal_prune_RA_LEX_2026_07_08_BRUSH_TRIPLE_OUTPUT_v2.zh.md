# Goal Prune: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2

candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
prototype: reality_anchor
status: pruned

## Main Layout

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

主图硬事实：

- cost: 17
- graph: complete, 5140 reachable states, 14372 legal transitions, 4 winning states
- all wins require:
  - `anchor_boundary_shift:box_sticky >= 2`
  - `sticky_to_box >= 2`
  - `move_sticky_rigid >= 2`

## Target [7, 1] / 上方 C 目标

variant: `RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal`

```text
#############
######..#####
#####@C.MM###
#####.....G##
#####...G####
#####.BS..###
#############
```

decision: keep

理由：

- 删除后 shortest cost 仍为 17，但 winning states 从 4 增至 48，胜路空间明显放宽。
- 删除后出现 `sticky_to_box < 2` 的胜路，探针 `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal_sticky_to_box_min2_sticky_to_box_min2.md` found bypass below count: true, matched count: 1。
- 因此上目标不是以最短路长度证明责任，而是以全胜路计数门证明责任：保留它才能强制第二个 C 输出被消费。

refs:

- `layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal.md`
- `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_top_goal_sticky_to_box_min2_sticky_to_box_min2.md`

## Target [10, 3] / 右侧 M 目标

variant: `RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal`

```text
#############
######.G#####
#####@C.MM###
#####......##
#####...G####
#####.BS..###
#############
```

decision: keep

理由：

- 删除后 shortest cost 从 17 降到 16。
- 删除后返回解省去末端 sticky 右推，`move_sticky_rigid` 计数从 2 降到 1。
- 探针 `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal_move_sticky_min2_move_sticky_rigid_min2.md` found bypass below count: true, matched count: 1。
- 因此右目标消费剩余 M 尾巴；它不是单纯路径末端装饰。

refs:

- `layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal.md`
- `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_right_goal_move_sticky_min2_move_sticky_rigid_min2.md`

## Target [8, 4] / 下方 C 目标

variant: `RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal`

```text
#############
######.G#####
#####@C.MM###
#####.....G##
#####....####
#####.BS..###
#############
```

decision: keep

理由：

- 删除后 shortest cost 从 17 降到 16。
- 删除后可以只推动 B/S 一次，`anchor_boundary_shift:box_sticky` 与 `sticky_to_box` 计数都降到 1。
- 探针 `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal_sticky_to_box_min2_sticky_to_box_min2.md` found bypass below count: true, matched count: 1。
- 因此下目标强制第二次刷线和第二个 C 输出消费。

refs:

- `layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal.md`
- `event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2_no_lower_goal_sticky_to_box_min2_sticky_to_box_min2.md`

## Result

retained_targets:

- [7, 1]
- [10, 3]
- [8, 4]

removed_targets: []

注意：上目标的责任不是 cost delta，而是防止出现一切一目标的低计数胜路；提交包中不得把上目标写成“删除会降低最短路成本”。
