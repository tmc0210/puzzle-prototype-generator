# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v0

## 本轮目标

- role: mid_game_fixed_anchor_transition
- 机制范围：两个锚点同时出现；P/L 固定在墙腔中，B/S 可移动一次并改变材料边界。
- 难度目标：比前两个待玩过渡关更短、更像一个明确机制见证，但仍必须通过“普通箱替代无解”硬门槛。
- 审美目标：尝试一格边界对齐的清晰结构：先用黏性共同把手移动二连块，再由材料边界把它拆成最终可覆盖形态。
- archive_lineage_policy: fresh_required。本轮只使用 clean archive 人评作为审美/失败模式校准，不从旧候选派生布局、对象角色或解法路线。

## Player Insight

目标列里需要两个对象上下相邻覆盖，但玩家只能从目标上方执行一次 pull。若对象是两个普通箱，pull 只能把上箱拉到上目标，下面的箱不会跟随，且上箱会封住继续操作面。玩家必须先把竖向黏性二连块作为一个刚体整体上拉；同时，已经下推过的 B/S 边界让上格转成箱、下格保持黏，完成“共同移动后拆分”的覆盖。

## Causal Chain

1. 固定 P/L 把 y>=3 区域设为 pull side；玩家能站在上目标格，从上方 pull 下方对象。
2. 玩家先在 push side 把 B/S 下推一格，使材料边界变成 B 行在 y=3、S 行在 y=4。
3. 竖向 M-M 初始在 sticky side，普通箱替代无法共同移动。
4. 玩家走到上目标格，向上 pull 黏性二连块；`move_sticky_rigid` 让两个格一起上移。
5. 上移后上格落在 B side 并触发 `sticky_to_box`，下格仍在 S side；两个目标同时被覆盖。

## Why Not Execution

这不是用黏性省步数：普通双箱替代不会跟随移动，且完整搜索应无胜路。B/S 也不是装饰开关；若不下推，边界不在目标之间，上拉后不会形成“上箱下黏”的目标覆盖状态。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `sticky_to_box`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:push_pull` 在完整可达图中出现：reject。固定 P/L 必须不可移动。
- 存在缺少任一 required event group 的胜路：reject。
- 初始普通双箱替代版可解：reject。
- 若解法不需要先移动 B/S，或 B/S 只是可有可无的装饰，reject。
- 若黏性刚体移动不是目标覆盖前的必要共同位移，reject。

## 工具要回答的问题

- 原布局是否可解，是否给出短而清楚的 snapshots。
- 固定 P/L 是否在完整可达扫描中无位移事件。
- 所有胜路是否都需要 B/S 位移、pull、sticky_to_box、sticky rigid movement。
- 普通双箱替代是否完整无解。
