# Revised Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v3

## 从 v2 继续修正

`CORRIDOR_CARRY_CUT` 草图仍允许切割后进入下层通道直接推 payload，黏合只承担一格搬运，仍会被 critic 认为是一次性把手。v3 换成横条式结构：黏合后搬运的是两个被墙顶住、不能单独下推的 payload，而不是一个可被后续直接推动的下层 M。

## Player Insight

玩家需要把左端 C 先变成黏性把手，使它与右侧两个 M 合成三格横条。因为右侧两个 M 的上方是墙，普通箱/单独黏块无法向下进入目标；只有推动左端把手向下，横条才会整体下落，让两个 payload 同时覆盖右侧双目标。之后必须把 B/S 推回切割相位，让左端把手重新变成普通箱；否则继续向下推会把右侧 M 拖离目标。切割后，左端箱子才能单独下推到第三目标。

## Causal Chain

1. 初始水平 B/S 使左端 C 在 B 侧、右侧 M/M 在 S 侧。
2. 推动 B/S 左移，把左端 C 转成 M，并与右侧两个 M `sticky_merge` 成三格横条。
3. 从左端上方下推一次，触发 `move_sticky_rigid`；右侧两个 M 因刚体连接越过上方墙限制，同时落到两个目标。
4. 推动 B/S 右移，把左端格切回 C，同时右侧两个 M 保持 sticky 并覆盖目标。
5. 从左端上方再次下推，这次只移动 C 到第三目标；若不切割，会拖动右侧 M 离开目标。

## Falsification

- 普通箱 analog 可解则失败。
- 若存在胜路不需要 B/S 左移、box_to_sticky、sticky_merge、move_sticky_rigid、B/S 右移、sticky_to_box、最后 C 单独移动，则失败。
- 若删除任一目标不释放明显短路，则该目标无效。
- 若最短/可行解仍能在切割后直接推动右侧 payload 完成，则失败。
