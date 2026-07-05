# Designer Action: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2 human playtest

level_id: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2
human_comment_id: HP_RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2_001
action: revise
replacement_level_id: RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v3

## Human Feedback

```text
大量冗余空间，左侧一大片区域和箱子冗余，右上角空地冗余
```

## Design Response

v2 的核心机制证据成立，但版面保留了不会被消费的左下箱、左侧空列和右上空地。v3 不重排核心链，而是做空间去噪：

- 左下冗余箱改为墙，避免玩家误读它是机制责任。
- 左侧无用列封墙，只保留到达上方 B/S 推动位所需的通道。
- 右上无用空格封墙，保留目标右侧和终段黏块上推所必需的格。

## Revised Layout

```text
#########
##....###
##.BS#G.#
##.M.MM.#
##@#...##
#########
```

## Evidence To Recheck

- 仍需先 `sticky_merge`，才允许胜路中的 B/S shift。
- 所有胜路仍需至少两次 `anchor_boundary_shift:box_sticky`。
- 所有胜路仍需 `box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid` 与 `push_object:crate#1`。
- 可达扫描不出现 P/L 事件。
- 不把状态数收缩包装成新增难度；它只是删除人类点名的冗余空间。
