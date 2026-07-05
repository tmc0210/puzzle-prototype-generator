# Fresh Design Claim: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1

本候选服务于 `prototypes/reality_anchor/docs/关卡规划.md` 的第七关槽位：固定 B/S 引入，无 P/L，简单教黏块和箱子的区别，不要求箱黏转化、拼接或切割。

本设计不是从已归档关卡或已拒绝候选改写而来。它只使用固定 B/S 让下方区域保持 sticky side，并以竖向二连黏块的刚体横移作为最小 witness。

## Layout

```text
#######
#B#####
#S#####
#@M...#
##M.G.#
#######
```

## 核心主张

- B/S 被墙和对象阻挡固定；所有可达状态中没有 B/S anchor shift。
- 没有 P/L；默认是 push world。
- 玩家只能推上半格黏块，但下半格必须随整体横移覆盖目标，因此 `move_sticky_rigid` 是胜路必经。
- 普通箱替代对照完整无解：若竖向二连不是黏性刚体，玩家不能从上半格推动下半格覆盖目标。

## Goal Prune

单目标关卡，`invalid_goal_prune` 标记为 skipped；不存在可删除的额外目标。
