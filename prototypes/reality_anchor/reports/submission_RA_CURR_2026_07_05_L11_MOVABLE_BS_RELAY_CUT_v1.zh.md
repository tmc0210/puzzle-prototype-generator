# 合格候选简报：RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1

槽位：第十一关，可推动 B/S，无 P/L；比 L10 更复杂的拼接/切割应用。

状态：待玩候选。独立 evidence reviewer 结论为 `supports_claim / required_action:none`；独立 puzzle critic 结论为 `supports_with_noncore_caveats / required_action:none`。

## ASCII

源布局：

```text
#########
#G.M.#..#
##@BS..M#
#.G.M..M#
#########
```

运行时初始归一化：

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

## 解法

```text
down right right right up left up left left down
```

关键事件：

- 第 3-4 步：推动下方黏块并触发 `sticky_merge`。
- 第 6 步：第一次移动 B/S，触发 `box_to_sticky`。
- 第 8 步：推动上方黏块，触发 `sticky_to_box`。
- 第 10 步：第二次移动 B/S，覆盖下方目标并收束。

## 关键 Snapshot

开始：

```text
#########
#G.C.#..#
##@BS..M#
#.G.M..M#
#########
```

第 4 步后，先完成下方黏块 relay/merge：

```text
#########
#G.C.#..#
##.BS..M#
#.G..@MM#
#########
```

第 6 步后，B/S 左移并把上方箱子转黏：

```text
#########
#G.M.#..#
##BS@..M#
#.G...MM#
#########
```

第 8 步后，上方黏块左推并切回箱子：

```text
#########
#GC@.#..#
##BS...M#
#.G...MM#
#########
```

通关：

```text
#########
#*...#..#
##@....M#
#.BS..MM#
#########
```

## 证据摘要

- 完整图：shortest 10，complete graph 429 states。
- 核心 probe：所有胜路需要 B/S shift、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`。
- 顺序 probe：不存在 B/S 在任何 `sticky_merge` 前移动的胜路。
- 计数 probe：所有胜路至少两次 `anchor_boundary_shift:box_sticky`。
- goal prune：删上目标会释放缺 `sticky_merge` / `sticky_to_box` 的胜路；删下目标会释放 5 步短解并缺 `box_to_sticky` / `sticky_merge` / `move_sticky_rigid`。
- reachable scan：无 P/L 命中。

## Critic 摘要

critic 认为它相对 L10 v2 有 relay-cut 的结构差异：下方黏块接力先建立拼接，再让 B/S 服务上方转换与下方目标。主要 caveat 是 ordinary crate push 不是全胜路必要，因此不要宣称“切出的普通箱必须被推”；核心是拼接、切割、B/S 双位移和黏块移动均不可省。
