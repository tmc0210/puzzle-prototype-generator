# Design Claim: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2

## 本轮定位

- 原型：`reality_anchor`
- 角色：中期过渡关
- 本关固定锚点：`P/L`，由上方墙室隔离，不能移动，但其拉侧决定主角操作语义
- 本关活动锚点：`B/S`，开局必须被固定 `P/L` 的拉侧拉动一次
- 目标：让玩家经历“先用固定 P/L 拉动 B/S 定边界，再把被还原成箱的块跨回黏侧，合成竖向刚体并拉到竖向双目标”

## Player Insight

玩家需要看出固定 `P/L` 不是背景装饰：开局站在 L 侧，只能通过拉动 `B/S` 改变材质边界。边界右移后，上方操作区中的一个黏块被还原成箱；随后该箱子被拉回黏侧，与下方黏块合成竖向二格刚体。竖向双目标要求这个刚体整体被拉动两次，单个黏块或普通箱都不能代替。

## Causal Chain

1. 固定 `P/L` 的 L 侧让玩家第一步拉动活动 `B/S`，触发 `anchor_boundary_shift:box_sticky` 与 `sticky_to_box`。
2. 玩家通过单格竖井进入下方操作区；水平二格 `B/S` 不能从竖井落下盖目标。
3. 被还原的箱子被拉过 B/S 边界，触发 `box_to_sticky`。
4. 新黏块与下方黏块合并成竖向刚体，触发 `sticky_merge`。
5. 玩家在拉侧连续拉动竖向刚体，触发 `move_sticky_rigid` 并覆盖竖向双目标。

## Why Not Execution Only

本关的关键不是单纯拉最近物体。若不先拉 B/S，目标形状无法由后续黏刚体生成；若不把箱子重新变黏并合并，单块无法覆盖竖向双目标。单格竖井同时阻断了水平 B/S 下井盖目标的旁路。

## Required Winning Path Events

- `pull_object`
- `anchor_boundary_shift:box_sticky`
- `sticky_to_box` 或 `box_to_sticky`
- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`

## Forbidden / Falsification

- 任何胜解若不经过固定 P/L 拉侧事件、B/S 移动、箱/黏归一化、箱变黏、黏合并、黏刚体移动，则本 claim 失败。
- 任意可达状态若出现 `anchor_boundary_shift:push_pull`，则固定 P/L 声称失败。
- 若水平 B/S 可进入目标带并代替竖向黏刚体覆盖目标，则本候选失败。
