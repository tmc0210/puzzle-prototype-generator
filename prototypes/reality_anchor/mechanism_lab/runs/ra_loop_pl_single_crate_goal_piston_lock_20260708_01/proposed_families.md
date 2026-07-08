# Proposed Families: P/L 单箱目标活塞顺序锁

## P/L 单箱目标活塞：推入覆盖与回撤撤销

建议状态：`supplement`

挂载位置：`P/L 边界交接：推入、跨侧与抽取分配` 下的 `边界活塞本体谱`。

接口卡片：
- 输入接口：P/L 边界旁一枚 crate，玩家在 P 侧推箱；箱子的伸出位正好是 goal，且通道限制玩家后续必须回撤。
- 输出接口：第一手产生临时目标覆盖；若第二手从 L 侧回撤，`pull_object:crate#1` 会把 crate 拉出目标并撤销覆盖。
- 最小 consumer：狭窄通道把 `left` 回撤变成唯一出口；开放侧路和目标偏位分别作为 shortcut / 错例。

局部结构谱：

```text
推入作为最后动作：
#########
#..PL...#
#########
#..@CG..#
#########

同图继续 left 回撤：
#########
#..PL...#
#########
#...@*..#
#########

开放侧路：right 后可 down 离开，目标保留：
#########
#..PL...#
#.......#
#..@CG..#
#.......#
#########

目标偏一格：right 不产生临时覆盖：
##########
#..PL....#
##########
#..@C.G..#
##########
```

对照关系：

- `corridor_goal_last_action`：`right` 后 crate 覆盖目标，`final.isWin=true`。说明单箱活塞伸出态可以被目标消费。
- `corridor_goal_then_forced_retract`：同一图 `right,left` 后目标撤销，`final.isWin=false`。说明回撤动作会消费并破坏临时覆盖。
- `open_side_exit_preserves_goal`：打开侧向出口后，`right,down` 保持目标覆盖，说明必须回撤才形成顺序锁。
- `corridor_goal_offset_no_temp_cover`：目标偏离伸出位时 `right` 不覆盖目标，说明目标必须放在活塞伸出位。

可接入的结构：

- 接多目标顺序：把该目标作为最后目标；若提前进入活塞并回撤，目标会被撤销。
- 接门闩 / 回返门：要求玩家先进入活塞通道处理别的结构，最后才允许把箱推入目标并停止。
- 接边界刷 driver：若活塞回撤还驱动其他结构，目标位可以标记“此回撤之前不能最终完成”。

误用边界：

- 单箱 `right,left` 没有目标时仍是退化 witness，不应写成顺序锁。
- 推上目标后若有侧向出口，玩家不必 pull 回撤，锁失效。
- 目标不在第一手伸出位时，不产生临时覆盖。
- 本结构不证明全局不可逆，只证明目标覆盖会被后续回撤撤销。

机制角色：
- active_rule：P/L push 后玩家处于 L 侧，下一手 left 触发 `pull_object:crate#1`。
- material_source：普通 crate 和 goal；P/L anchor 提供 push / pull 侧别。
- consumer：goal 消费伸出位，狭窄通道消费玩家出口并迫使回撤。
- incidental：没有 B/S 或 sticky；这是单箱活塞的目标顺序用途。
- 关键观察点：`right` 后 `after.isWin=true`，继续 `left` 后 `final.isWin=false`。

退化解释：

这不是普通“箱子上目标”的 witness，因为开放侧路对照中目标可以保留；也不是普通单箱活塞，因为目标偏位对照没有临时覆盖。只有“伸出位是目标 + 后续必须回撤”同时成立时，单箱活塞才从退化动作变成顺序锁材料。

证据来源：

`run=ra_loop_pl_single_crate_goal_piston_lock_20260708_01`, `cases=corridor_goal_last_action,corridor_goal_then_forced_retract,open_side_exit_preserves_goal,corridor_goal_offset_no_temp_cover`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,supplement`

