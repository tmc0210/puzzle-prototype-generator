# Designer Action: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2 human playtest

level_id: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2
human_comment_id: HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2_001
action: revise
replacement_level_id: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3

## Human Feedback

```text
直接移除没有被使用的最右空列
```

## Design Response

L08 v2 已经解决 v1 的开局一步直通正解问题，但右侧仍保留一列没有参与机制的空地。根据反馈，v3 直接删除最右空列，保留右侧中间起点、固定 B/S joining 骨架、箱转黏拼接、以及合并刚体右推收束。

## Revised Layout

```text
#######
#.....#
#B.C#.#
#S...@#
###M.G#
#######
```

## Evidence To Recheck

- 仍可解，且最短解仍不是第一步触发核心转换。
- 所有胜路仍需要 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`。
- 可达扫描不出现 B/S 位移、P/L 位移或反向材料事件。
- 不把删列造成的状态数收缩解释成额外审美或难度收益；这只是去噪。
