# 合格候选简报：RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1

槽位：第十关，可推动 B/S，无 P/L；实际用材料转化完成切割与回黏。

状态：待玩候选。独立 evidence reviewer 结论为 `supports_claim / required_action:none`；独立 puzzle critic 结论为 `supports_with_noncore_caveats / required_action:none`。

## ASCII

源布局：

```text
#########
#@BS.#..#
#..C..G.#
#..M#####
#########
```

运行时初始归一化：

```text
#########
#@BS.#..#
#..M..G.#
#..M#####
#########
```

## 解法

```text
right down right right right
```

关键事件：

- 第 1 步 `right`：推动 B/S 右移，触发 `sticky_to_box`，把竖向黏块切成两个箱子。
- 第 3 步 `right`：推动上方箱子回到 S 侧，触发 `box_to_sticky`。
- 第 4-5 步 `right right`：推动回黏后的黏块到目标。

## 关键 Snapshot

开始：

```text
#########
#@BS.#..#
#..M..G.#
#..M#####
#########
```

第 1 步后，B/S 已右移，竖向黏块被切成两个箱子：

```text
#########
#.@BS#..#
#..C..G.#
#..C#####
#########
```

第 3 步后，上方箱子被推回 S 侧并变回黏块：

```text
#########
#..BS#..#
#..@M.G.#
#..C#####
#########
```

通关：

```text
#########
#..BS#..#
#....@m.#
#..C#####
#########
```

## 证据摘要

- `layout_analysis_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`：shortest 5，complete graph 47 states。
- `event_probe_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1_core.md`：complete/no bypass；所有胜路需要 `anchor_boundary_shift:box_sticky`、`sticky_to_box`、`box_to_sticky`、`move_sticky_rigid`、`push_object:crate#1`。
- `reachable_scan_RA_CURR_2026_07_05_L10_MOVABLE_BS_CUTBACK_v1.md`：无 P/L 命中；可达空间内只有一次 B/S shift、一次切割和一次回黏。
- 单目标，无无效 goal prune 项。

## Critic 摘要

核心成立：移动 B/S 不是装饰，而是切开初始竖向黏块；切出的上箱再被推回 S 侧并以黏块身份完成目标。主要 caveat 是第 1 步就是推 B/S、全程 5 步且高度强制，所以它是短可动 B/S witness，不应包装成充分体现“时机选择”的复杂应用题。
