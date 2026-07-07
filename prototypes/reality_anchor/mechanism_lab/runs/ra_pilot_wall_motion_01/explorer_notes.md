# ra_pilot_wall_motion_01 Explorer Notes

本轮目的不是整理最终 lexicon，而是测试 `mechanism-lab-run` 是否能支撑局部结构比较。

## 工具测试发现

- `returnToInitial` 对这类“绕到另一侧再推回”的结构很敏感。2 格横条在下方可绕行房间中回到初始状态需要 11 步，因此默认 `maxReturnDepth=10` 会给出假阴性。
- B/S 锚点如果靠近主实验区，会进入最终动作表和局部状态图，污染“只测黏块 + 墙”的实验。第二版把 B/S 锚点封在上方隔间后，事件集合明显干净。
- `reachableFromInitial.status=complete` 对这些极小 patch 可用；本轮四个 case 都在预算内完整枚举。

## 有效比较 1：单排走廊 vs 可绕行房间

对比 case：

- `sticky2_single_lane_push`
- `sticky2_loop_room_push`

共同点：

- 初始动作都是 `right`。
- 动作都合法。
- 初始变化格相同：玩家进入原黏块左端，2 格横条整体右移一格。
- 事件都是 `push_object:sticky#1, move_sticky_rigid`。

差异：

- 单排走廊最终动作表中 `down` 是 illegal，原因 `destination_blocked`。
- 可绕行房间最终动作表中 `down` 是 legal，玩家可以进入下方绕行层。
- 单排走廊 `returnToInitial=no`，完整搜索结束。
- 可绕行房间 `returnToInitial=yes`，回返路径为 `down right right right up left down left left left up`。

解释：

这里不是“黏块可以被推”的规则复述。两者第一步动作和局部位移完全一样，差异来自墙结构是否提供绕到黏块右侧的路径。绕行层不是装饰，它改变了同一后继状态的可逆性。

可提炼语料：

- 2 格横条被推入走廊后，如果玩家不能绕到右侧，它是单向推进。
- 只在同一墙结构下增加一条绕行层，就能把同一推进动作改成可回返动作。

## 有效比较 2：2 格横条 vs 3 格横条

对比 case：

- `sticky2_mouth_keeps_turnaround_cell`
- `sticky3_mouth_consumes_turnaround_cell`

共同点：

- 墙口宽度相同。
- 初始动作都是 `right`。
- 两者第一步都合法，并都触发 `move_sticky_rigid`。
- 下方都有绕行层。

差异：

- 2 格横条右推后仍留下右侧站位格，`returnToInitial=yes`，路径同样需要 11 步。
- 3 格横条右推后占满右端，最终动作表中继续 `right` 为 illegal，原因 `force_blocked`。
- 3 格横条无法绕到最右侧推回，`returnToInitial=no`，完整搜索结束。

解释：

这里不是“更长的块更难推”的泛泛描述。关键差异是同一墙口里，3 格条右推一步后吃掉了唯一的右侧站位格；玩家虽然还能下绕行层移动，但没有可站在条块右侧的格子，因此不能产生反向推回。

可提炼语料：

- 在固定宽度墙口里，条块长度可以把“绕行可逆结构”变成“绕行仍不可逆结构”。
- 设计上可以用 2/3 格长度差异控制同一房间是否允许回滚，而不必改动玩家路径。

## 暂不收录的观察

- `sticky_to_box:n1` 在局部可达图中出现，但它不是本轮问题的核心；本轮没有专门比较 B/S 边界消费，应留到下一轮。
- 胜利状态数量全为 0，本轮目标不是求解，也不使用胜利条件作证据。

## 下一轮建议

- 把同样比较换成竖向条块，确认结论是不是只依赖横向墙口。
- 加 L 形和 2x2 黏块，看“右侧站位格”是否可以推广为“反向施力站位格”。
- 做一组 B/S 边界 + 墙口实验，专门比较“先合并再进墙口”和“先过墙口再合并”的可动性差异。
- 给 runner 增加一个可选字段：比较 case 之间的 `finalActionTable` 和 `returnToInitial` 差异，减少 curator 手工对照成本。
