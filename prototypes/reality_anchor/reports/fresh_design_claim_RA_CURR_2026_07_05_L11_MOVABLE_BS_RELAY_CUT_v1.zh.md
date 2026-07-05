# Fresh Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_RELAY_CUT_v1

槽位：第十一关，可推动 B/S，无 P/L，需要比上一关更复杂的拼接/切割应用，并要求玩家考虑推动 B/S 的时机。

## 布局

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

## 主张

玩家必须先在右下区域推动黏块并完成 `sticky_merge`，然后才能推动 B/S。B/S 至少需要移动两次：中段横移改变边界并触发 `box_to_sticky`，随后左上区域的黏/箱身份切换触发 `sticky_to_box`；终段 B/S 再承担下方目标收束。

本关不把普通箱推动列为所有胜路必要，因为搜索发现存在不用 `push_object:crate#1` 的替代胜路；但所有胜路都仍需要 B/S 位移、`box_to_sticky`、`sticky_merge`、`sticky_to_box` 和 `move_sticky_rigid`。

## 不主张

- 不声明唯一解、唯一事件次数或唯一对象实例链。
- 不声明 crate push 为所有胜路必要。
- 不声明归档接受或数值化评分。

## Goal Prune

两个目标都保留：

- 删除上方目标会释放缺少 `sticky_merge` 和 `sticky_to_box` 的胜路。
- 删除下方目标会释放 5 步短解，缺少 `box_to_sticky`、`sticky_merge` 和 `move_sticky_rigid`。
