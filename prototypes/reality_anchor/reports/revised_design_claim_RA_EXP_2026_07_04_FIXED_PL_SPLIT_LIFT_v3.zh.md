# Revised Design Claim: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v3

## 变更原因

v2 仍可不移动 B/S 直接拉动黏性二连块覆盖相邻双目标，B/S 没有成为必要结构。v3 将目标改为隔一格的上下目标：先上拉二连块到中间位置，再借下推后的 B/S 边界把上格转箱、下格留黏，最后只继续拉上箱，让下黏块留在下目标。

## Player Insight

相邻黏性二连块不能直接覆盖隔一格目标；如果继续拉整个黏块，上方目标会被覆盖，但下方目标会空掉。玩家必须先把 B/S 下推到目标之间的材料边界，使第一次上拉后发生 `sticky_to_box`：上格脱离为普通箱，下格仍留在下目标。随后第二次 pull 只移动上箱到上目标。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `sticky_to_box`
- `move_sticky_rigid`

## Forbidden / Negative Evidence

- `anchor_boundary_shift:push_pull` 在完整可达图中出现：reject。
- 存在缺少任一 required event group 的胜路：reject。
- 初始普通双箱替代版可解：reject。
- B/S 横移或自身覆盖目标形成胜路：reject。

## 工具要回答的问题

- 原布局是否可解，返回解是否包含 B/S 下推、第一次拉黏性刚体、sticky_to_box 拆分、第二次拉上箱。
- 固定 P/L 是否完整扫描无位移事件。
- 所有胜路是否都需要 B/S 位移、pull、sticky_to_box、sticky rigid movement。
- 普通双箱 analog 是否完整无解。
