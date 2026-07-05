# 合格候选简报：RA_CURR_2026_07_05_L10_MOVABLE_BS_TIMED_JOIN_CUT_v2

槽位：第十关，可推动 B/S，无 P/L；要求玩家考虑推动 B/S 的时机。

状态：待玩候选。旧 L10 v1 已按人测反馈打回并移出待玩；本 v2 的独立 evidence reviewer 结论为 `supports_claim / required_action:none`，独立 puzzle critic 结论为 `supports_with_noncore_caveats / required_action:none`。

## ASCII

源布局：

```text
#########
#.....#.#
#..BS#G.#
##.M.MM.#
#M@#....#
#########
```

运行时初始归一化：

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

## 解法

```text
up right up left up right down right down right down right up
```

关键事件：

- 第 2 步 `right`：先把箱子推入 S 侧，触发 `box_to_sticky` 和 `sticky_merge`。
- 第 3 步 `up`：第一次推动 B/S。
- 第 6 步 `right`：第二次推动 B/S，并触发 `sticky_to_box` 切割。
- 第 9 步 `down`：推动切出的箱子，让右侧黏块获得最终路线。
- 第 10、13 步：推动黏块刚体覆盖目标。

## 关键 Snapshot

开始：

```text
#########
#.....#.#
#..BS#G.#
##.C.MM.#
#C@#....#
#########
```

第 2 步后，先完成拼接，还没有推动 B/S：

```text
#########
#.....#.#
#..BS#G.#
##.@MMM.#
#C.#....#
#########
```

第 3 步后，B/S 第一次进入上方通道：

```text
#########
#..BS.#.#
#..@.#G.#
##..MMM.#
#C.#....#
#########
```

第 6 步后，B/S 第二次移动并切出箱子：

```text
#########
#..@BS#.#
#....#G.#
##..CMM.#
#C.#....#
#########
```

第 9 步后，切出的箱子被下推：

```text
#########
#...BS#.#
#....#G.#
##..@MM.#
#C.#C...#
#########
```

通关：

```text
#########
#...BS#.#
#....#mM#
##....@.#
#C.#C...#
#########
```

## 证据摘要

- 完整图：shortest 13，complete graph 221 states。
- 核心 probe：所有胜路需要 B/S shift、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`、crate push。
- 顺序 probe：不存在 B/S 在任何 `sticky_merge` 前移动的胜路。
- 计数 probe：所有胜路至少两次 `anchor_boundary_shift:box_sticky`。
- reachable scan：无 P/L 命中。

## Critic 摘要

critic 认为这版修复了旧 L10 的核心问题：不是开局唯一动作，不是 B/S 一用即退场；玩家必须先建立 `sticky_merge`，之后至少两次使用 B/S。主要 caveat 是胜路仍很强制，且接近第十一关边界；待玩时要观察玩家是否能说清“为什么不能先推 B/S”。
