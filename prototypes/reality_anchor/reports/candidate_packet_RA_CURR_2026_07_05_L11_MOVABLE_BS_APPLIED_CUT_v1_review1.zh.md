# Candidate Packet: RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1 / review1

## Slot

来自 `prototypes/reality_anchor/docs/关卡规划.md`：

第十一关：箱黏锚点应用，无推拉锚点。要求箱黏锚点可推，并需要使用比上一关更复杂的拼接切割，可以是拼接+切割的应用，要求玩家考虑推动箱黏锚点的时机。

本轮额外人类反馈标准：

- 不能只触发黏块/箱子转化事件。
- 切割下来的箱子需要真的被拆下来挪作它用。
- 黏上去的新黏块需要带来后续可达性、刚体结构或操作条件变化。

## Layout

```text
#########
##....###
##.BS#G.#
##.M.MM.#
#.@#...##
####G####
#########
```

运行时初始归一化：

```text
#########
##....###
##.BS#G.#
##.C.MM.#
#.@#...##
####G####
#########
```

## Returned Solution

```text
up right up left up right down right down down up right down right up
```

15 步。

## Key Snapshots

Step 2：箱子推入 S 侧，变黏并拼入三连。

```text
#########
##....###
##.BS#G.#
##.@MMM.#
#..#...##
####G####
#########
```

Step 6：第二次推动 B/S，三连左端被切成普通箱。

```text
#########
##.@BS###
##...#G.#
##..CMM.#
#..#...##
####G####
#########
```

Step 10：切出的普通箱被连续下推两次，覆盖下目标。

```text
#########
##..BS###
##...#G.#
##...MM.#
#..#@..##
####*####
#########
```

Step 15：剩余二连黏块移动到上目标。

```text
#########
##..BS###
##...#mM#
##....@.#
#..#...##
####*####
#########
```

## Evidence

- `layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1.md`: complete graph，284 states / 680 transitions，shortest 15。
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_core.md`: B/S 位移、`box_to_sticky`、`sticky_merge`、`sticky_to_box`、`move_sticky_rigid`、推动事件均 complete/no bypass。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md`: 所有胜路至少两次 B/S 位移。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_crate1_push_count3_push_object_crate_1_min3.md`: 所有胜路至少三次 `push_object:crate#1`。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_sticky_move_count_move_sticky_rigid_min2.md`: 所有胜路至少两次黏块刚体移动。
- `order_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_bs_after_merge_order.md`: 不存在 B/S 位移早于 `sticky_merge` 的胜路。
- `event_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_top_goal_core.md`: 删除上目标后会释放缺 `move_sticky_rigid` 的胜路。
- `event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_APPLIED_CUT_v1_no_lower_goal_crate1_push_count3_push_object_crate_1_min3.md`: 删除下目标后会释放少于三次 `crate#1` 推动的胜路。

## Reviewer Questions

- 这些证据是否足以支持“切出的箱子被拆出并挪作它用”？
- 这些证据是否足以支持“黏上去的新黏块被后续作为刚体结构消费”？
- 是否仍存在“只是把箱子和黏块分别推到两个目标”的读法风险？
- 是否有 unsupported overclaim，尤其是对象身份、唯一解或难度审美方面？
