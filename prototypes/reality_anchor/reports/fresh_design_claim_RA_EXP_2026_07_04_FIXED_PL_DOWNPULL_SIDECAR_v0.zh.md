# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v0

## 本轮目标

- role: mid_game_fixed_anchor_transition
- 机制范围：两个锚点同时出现；P/L 固定在墙腔中，B/S 可移动并负责材料窗口。
- 难度目标：中期过渡，短而清楚；不追求终局高难。
- 审美目标：无分数声称；当前 clean archive 只有正向人评锚点，缺少 clean negative / lower-bound anchor。
- archive_lineage_policy: fresh_required。本轮不以任何归档关或旧失败候选作为布局、对象角色或解法骨架。

## Player Insight

固定 P/L 让下层成为 pull side：玩家不能从目标下方把普通箱向上推，也不能随意把侧挂箱逐个送上目标。B/S 的移动只创建一个材料窗口；真正的解法是让 C 在窗口中变成 sticky，与侧挂 M 合并，然后从可接触把手格 pull 整个刚体，使被普通箱无法单独处理的影子格一起覆盖目标。

## Causal Chain

1. 固定 P/L 将核心区域分成 push/pull 两层，最终目标覆盖必须利用 pull-side 行为。
2. 可动 B/S 必须移动一格，令 C 的落点进入 sticky side。
3. C 在材料窗口中触发 `box_to_sticky`，与 M `sticky_merge`。
4. 目标/墙形让普通箱替代无法通过多推多拉补上：影子格没有可用的独立施力面。
5. 最后通过 `pull_object` + `move_sticky_rigid` 让把手格携带影子格覆盖目标。

## Why Not Execution

本 family 必须比上一批失败候选更硬：不仅要有 `box_to_sticky` 和 `sticky_merge`，还要有普通箱初始替代与 post-merge 替代无解。若普通箱只是多几步能完成，直接 reject。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `box_to_sticky`
- `sticky_merge`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:push_pull` 在可达图中出现：reject。固定 P/L 必须真正固定。
- 存在不经 B/S 位移、pull、box_to_sticky、sticky_merge 或 sticky rigid movement 的胜路：reject。
- 普通箱初始替代版或 post-merge 普通箱替代版可解：reject。

## 工具要回答的问题

- 原布局是否可解，解法是否包含清楚 snapshots。
- 固定 P/L 是否在完整可达扫描中没有 `anchor_boundary_shift:push_pull`。
- 所有胜路是否都包含 B/S 位移、pull、box_to_sticky、sticky_merge、sticky rigid movement。
- 普通箱替代是否完整无解，尤其是 post-merge 两普通箱替代是否无法靠多推多拉完成。
