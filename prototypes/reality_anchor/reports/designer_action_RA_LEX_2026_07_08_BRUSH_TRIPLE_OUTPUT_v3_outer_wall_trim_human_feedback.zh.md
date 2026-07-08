# Designer Action: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim

```yaml
source_candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v2
new_candidate: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim
trigger: human_playtest_feedback
designer_action: revise_structure
review_loop_state: revise_required_for_human_playtest
review_integrity: human_feedback_plus_tool_rerun
archive_eligibility: human_pending
full_independent_review_skipped: true
skip_reason: 人类修改意见明确，改动面为外框裁剪；已重跑完整图、核心事件旁路和计数 probe。
```

## 人类反馈

```text
过多冗余外墙
```

## 修改

将 v2 的外框裁到所有非墙格外的一圈墙，删除左侧 4 列和右侧 1 列纯外墙；内部地形、对象、目标相对关系和 expected trace 不变。

```text
########
##.G####
#@C.MM##
#.....G#
#...G###
#.BS..##
########
```

## 验证摘要

- `explain-layout` complete：17 步最短解、5140 reachable states / 14372 legal transitions / 4 winning states，与 v2 一致。
- 返回 trace 与事件计数保持一致：`box_to_sticky:n1=1`、`sticky_merge:n1=1`、`move_sticky_rigid=2`、`anchor_boundary_shift:box_sticky=2`、`sticky_to_box:n1=2`。
- `core5` probe complete/no bypass：所有胜解仍必须包含 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`、`anchor_boundary_shift:box_sticky`、`sticky_to_box`。
- 计数 probe complete/no bypass below 2：B/S shift、sticky_to_box、move_sticky_rigid 均保持原 triple-output gate。

## 证据文件

- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_core5.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_sticky_to_box_min2_sticky_to_box_min2.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_move_sticky_min2_move_sticky_rigid_min2.md`

## 后续状态

v3 替换 v2 回到待玩列表。因为这是明确外框清理反馈下的纯几何裁剪，不在本轮声明为 `proposal_ready` 或 clean archive；待人类复玩后再决定归档、继续修改或重跑完整 review。
