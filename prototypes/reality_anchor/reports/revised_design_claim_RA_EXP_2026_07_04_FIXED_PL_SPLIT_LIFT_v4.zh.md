# Revised Design Claim: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v4

## 变更原因

v3 的目标结构成立但通路过窄：玩家下推 B/S 后站在 B 正上方，向上离开会在 pull side 把 B/S 拉回原位。v4 在 B/S 竖井左侧打开一个玩家出口，但继续用墙封住 B/S 的横向位移和第二次下推。

## Claim

延续 v3 claim：先下推 B/S，使材料边界落在目标之间；第一次 pull 竖向黏性二连块时发生 `sticky_to_box`，上格脱离为箱、下格留在下目标；第二次 pull 只移动上箱到上目标。普通双箱不能替代，因为第一次 pull 后下目标会空掉，而上箱堵住继续调整下箱的施力面。

## Required Events

- `anchor_boundary_shift:box_sticky`
- `pull_object`
- `sticky_to_box`
- `move_sticky_rigid`

## Reject 条件

- `anchor_boundary_shift:push_pull` 可达。
- 任一 required event group 可被胜路绕过。
- 普通双箱 analog 可解。
- B/S 通过横移或自身盖目标取胜。
