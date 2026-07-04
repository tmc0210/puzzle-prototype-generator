# Design Claim: RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1

## 本轮定位

- 原型：`reality_anchor`
- 角色：中期过渡关
- 本关固定锚点：`B/S`，由墙完全隔离在上方，只提供全局箱/黏边界，不可移动
- 本关活动锚点：`P/L`，在主操作区移动并覆盖一个目标
- 目标：让玩家在低步数内明确看到“箱子变黏以后才能和既有黏块组成刚体，然后刚体移动才完成目标”

## Player Insight

玩家需要先把 `P/L` 推到目标位，同时把下方箱子推过固定 `B/S` 的边界。箱子进入黏侧后不是只换名，而是立刻与右侧黏块合并，形成一个二格横向刚体；只有这个刚体整体右移，才能覆盖最后的目标。

## Causal Chain

1. `P/L` 被连续推动两次，覆盖上方目标并改变主角后续行动语义位置。
2. 主角下移到箱子左侧。
3. 箱子被推过固定 `B/S` 边界，触发 `box_to_sticky`。
4. 新黏块与既有黏块相邻，触发 `sticky_merge`。
5. 合并后的黏刚体整体右移，触发 `move_sticky_rigid` 并覆盖最后目标。

## Why Not Execution Only

操作序列短，但成功不是“把最近物体推到目标”即可完成：单箱无法覆盖最后目标，既有黏块单独移动也无法同时完成结构；必须理解固定 `B/S` 边界把箱子变成可合并的黏块，并消费这个变化。

## Required Winning Path Events

- `anchor_boundary_shift:push_pull`
- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`

## Forbidden / Falsification

- 任何胜解若不经过 `box_to_sticky`、`sticky_merge` 或 `move_sticky_rigid`，则本 claim 失败。
- 任意可达状态若出现 `anchor_boundary_shift:box_sticky`，则固定 `B/S` 声称失败。
- 若存在仅靠锚点覆盖或单个黏块移动完成的胜解，则本候选应打回。
