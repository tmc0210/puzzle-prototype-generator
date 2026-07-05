# Fresh Design Claim: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1

candidate_version: RA_CURR_2026_07_05_L13_FIXED_ORTHOGONAL_HANDOFF_v1
prototype: reality_anchor
slot: 第十三关 / 正交双固定锚点应用

## Claim

player_insight:
  P/L 是竖向固定锚点，B/S 是横向固定锚点，二者正交且都墙隔离。玩家需要先利用 B/S 的纵向材料边界，把普通箱向右推入 S 侧并与下方黏块拼成竖向二连；之后在 P/L 的 pull 区，从右侧横向拉动这个二连结构覆盖双目标。

causal_chain:
  1. 移动到 C 左侧，把 C 向右推过 B/S 边界，触发 `box_to_sticky` 与 `sticky_merge`。
  2. 绕到二连黏块右侧。
  3. 在固定 P/L 的 pull 区向右拉动二连黏块，使两个目标被同一结构覆盖。

why_not_execution:
  这不是单纯箱子加黏块分别入目标。B/S 的作用是制造可被整体拉动的二连结构；P/L 的作用是后续消费该结构。若存在不需要 `box_to_sticky` / `sticky_merge` / `pull_object` / `move_sticky_rigid` 的胜路，则设计失败。

falsification:
  如果任一固定锚点发生 `anchor_boundary_shift`，或存在缺 `box_to_sticky`、`sticky_merge`、`pull_object`、`move_sticky_rigid` 的胜路，或删除某个目标不释放相应核心绕过，则 claim 失败。不声明唯一解、实例级对象身份或高难。
