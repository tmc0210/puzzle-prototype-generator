# Fresh Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1

candidate_version: RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1
prototype: reality_anchor
slot: 第十一关 / 可推动 B/S 的拼接与切割应用

## Claim

player_insight:
  玩家先把普通箱推入 S 侧，使它变成黏块并与右侧两格黏块拼成三连；之后不能立刻把 B/S 当按钮乱推，必须在拼接完成后两次移动 B/S，把三连左端切回普通箱。切出的箱子随后被连续下推两次覆盖下目标；剩余二连黏块再作为刚体移动，覆盖上目标。

causal_chain:
  1. `box_to_sticky + sticky_merge`：箱子成为三连黏块的左端。
  2. 第一次移动 B/S 到上通道，准备改变材料边界。
  3. 第二次移动 B/S 触发 `sticky_to_box`，把三连左端切成普通箱。
  4. 切出的箱子被向下推两次，覆盖下目标。
  5. 剩余二连黏块被右推一次、上推一次，覆盖上目标。

why_not_execution:
  该候选不是只“触发转化事件”。转化后的结果都有后续消费：切出的箱子离开原黏块结构并被两次推动到独立目标；剩余黏块失去左端后仍作为二连刚体移动到上目标。完整计数探针证明所有胜路至少需要三次 `push_object:crate#1`、两次 `move_sticky_rigid`、两次 B/S 位移。

falsification:
  如果存在缺少 B/S 位移、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid` 或推动事件的胜路，或存在 B/S 在 `sticky_merge` 前移动仍可胜利的路线，或存在少于三次 `push_object:crate#1` / 少于两次 `move_sticky_rigid` 的胜路，则该 claim 失败。

## Evidence Summary

- `layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1.md`: 15 步最短解，完整图 284 states / 680 transitions。
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_core.md`: B/S 位移、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`、推动事件均 complete/no bypass。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`: 所有胜路至少两次 B/S 位移。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_crate1_push_count3_push_object_crate_1_min3.md`: 所有胜路至少三次 `push_object:crate#1`。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_sticky_move_count_move_sticky_rigid_min2.md`: 所有胜路至少两次黏块刚体移动。
- `order_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_bs_after_merge_order.md`: 不存在 B/S 位移早于 `sticky_merge` 的胜路。
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_top_goal_core.md`: 删除上目标会释放缺 `move_sticky_rigid` 的胜路。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_lower_goal_crate1_push_count3_push_object_crate_1_min3.md`: 删除下目标会释放少于三次 `crate#1` 推动的胜路。

## Scope Limits

- 不声明唯一输入序列、唯一对象身份或归档接受。
- 不把事件出现本身当作审美结论；核心是转化产物后续被消费。
- 第十关 v2 仍有冗余空间反馈未处理，本候选只用于替代被打回的第十一关。
