# Revised Design Claim: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v2

## 变更原因

v1 被本地证据打回：返回最短解只需横推 B/S 让 S 覆盖上目标，完全绕过黏块；普通箱 analog 也遗漏了 lower target，反事实无效。v2 将 B/S 放入竖井，只允许向下移动一格，并修正 analog 为同样双目标。

## Player Insight

玩家先把 B/S 在竖井中下推，使 B/S 的材料边界恰好落在两个目标之间。随后站在上目标格，从固定 P/L 的 pull side 向上拉竖向黏性二连块。两个黏块作为刚体共同上移；上格跨入 B side 变成普通箱，下格留在 S side，完成一次“共同移动后拆分”的双目标覆盖。两个普通箱不能替代，因为 pull 只会移动上箱，下面的箱不会随动，且上箱会堵住继续施力面。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `sticky_to_box`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:push_pull` 在完整可达图中出现：reject。
- 存在缺少任一 required event group 的胜路：reject。
- 初始普通双箱替代版可解：reject。
- B/S 通过横移或自身覆盖目标形成胜路：reject。

## 工具要回答的问题

- 原布局是否可解，返回解是否包含先下推 B/S、再 pull 黏性二连块上移并 `sticky_to_box`。
- 固定 P/L 是否完整扫描无位移事件。
- 所有胜路是否都需要 B/S 位移、pull、sticky_to_box、sticky rigid movement。
- 普通双箱 analog 是否完整无解。
