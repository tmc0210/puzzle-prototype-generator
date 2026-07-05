# Fresh Design Claim: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1

本候选服务于 `prototypes/reality_anchor/docs/关卡规划.md` 的第八关槽位：固定 B/S，无 P/L，实际用箱黏转化完成拼接。

本设计不是从已归档关卡或已拒绝候选改写而来。它使用固定 B/S 水平材料边界：箱子从 B 侧被下推到 S 侧后变成黏块，并与下方不可直接推动的 M 拼接；随后玩家推动上方新黏块作为把手，带动下方 M 覆盖目标。

## Layout

```text
########
#..@...#
#B.C#..#
#S.....#
###M.G.#
########
```

## 核心主张

- 无 P/L；默认 push world。
- B/S 固定，所有可达状态中没有 B/S anchor shift。
- 所有胜路都必须包含 `box_to_sticky`、`sticky_merge` 和 `move_sticky_rigid`。
- 拼接不是装饰：右侧墙阻止箱子先在 B 侧横移到目标列；下方 M 左侧被墙封住，无法直接推动。必须先把箱子下推过 B/S 边界转黏并与 M 拼接，才有可推把手带动 M 到目标。

## Goal Prune

单目标关卡，`invalid_goal_prune` skipped；不存在可删除的额外目标。
