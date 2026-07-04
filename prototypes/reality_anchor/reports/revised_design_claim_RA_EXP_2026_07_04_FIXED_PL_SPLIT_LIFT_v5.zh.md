# Revised Design Claim: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v5

## 变更原因

v4 原关可解且包含目标事件，但 ordinary-box analog 仍可利用上目标右侧小空间把上箱横向挪开，再回头处理下箱。v5 封住上目标左右侧，只保留玩家从上方进入和拉动的通路，使普通箱第一次上拉后无法移开堵塞箱。

## Claim

延续 split-lift claim：B/S 必须先下推，第一次 pull 黏性二连块时 `sticky_to_box` 拆出上箱并让下黏块留在下目标；第二次 pull 只移动上箱到上目标。普通箱替代因为上箱无法横移、下箱无法跟随而无解。
