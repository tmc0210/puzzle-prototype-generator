# Fresh Design Claim: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2

candidate_version: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_PULL_CONVERT_v2
prototype: reality_anchor
slot: 第十三关 / 正交双固定锚点应用

## Claim

player_insight:
  P/L 是竖向固定锚点，B/S 是横向固定锚点，二者正交且都墙隔离。玩家需要站在 C 的右侧，在 P/L 的 pull 区把 C 向右拉过 B/S 的材料边界；这个 pull 同时触发 `box_to_sticky` 并与下方 M `sticky_merge` 成竖向二连。之后继续用 P/L pull 消费这个二连结构覆盖双目标。

causal_chain:
  1. 绕到 C 右侧。
  2. 第一次向右移动在 P/L pull 区拉 C，使 C 跨过 B/S 边界，触发 `box_to_sticky` 与 `sticky_merge`。
  3. 后续向右 pull 竖向二连黏块，使上下两个目标被同一结构覆盖。

why_not_execution:
  两个锚点不是并排 witness：P/L 的 pull 是触发 B/S 材料转换的运输动作，B/S 产生的二连黏块又被 P/L 后续继续消费。若玩家不能理解“从右侧拉 C 过材料边界”，就无法得到可覆盖双目标的二连结构。

falsification:
  若存在缺 `pull_object`、`box_to_sticky`、`sticky_merge` 或 `move_sticky_rigid` 的胜路，或任一固定锚点发生 `anchor_boundary_shift`，则 claim 失败。不声明唯一解、实例级对象身份或高难。
