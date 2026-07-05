# Revised Design Claim: RA_CURR_2026_07_05_L11_MOVABLE_BS_CORRIDOR_CARRY_CUT_v2

## 触发原因

`RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1` 的 evidence review 通过，但 puzzle critic 要求结构重做：B/S 像相位拨杆、黏合后只承担一次短搬运、路线长度有伪难风险。该版本不接入待玩，不作为合格候选。

## 新目标

第十一关仍为无 P/L、可推动 B/S、拼接+切割应用。v2 改为“封闭下层带的持续刚体搬运”：

- 下层 M 所在带不能由普通箱直接替代；它需要与上层可触达材料拼接成纵向刚体。
- 合体刚体必须在上层推动下沿下层封闭带移动多格，而不是只移动一格。
- B/S 的第二次移动必须在下层 M 已经到达远目标后执行；过早切割会让下层 M 不到位，过晚不切会让上层材料不能独立回填上目标。
- 上下两个目标分别消费“合体搬运结果”和“切割后的独立箱子”，并用 goal-prune 反事实确认都不是顺路目标。

## Player Insight

玩家需要把同一个上层材料连续读成三种角色：普通箱预处理物、拼接后的黏性把手、切割后的独立箱子。核心不是按钮触发，而是同一材料在不同相位承担不同结构责任：黏住时携带下层封闭 M 多格移动，切开后停止拖拽下层 M 并独立回目标。

## Falsification

以下任一成立则打回：

- 普通箱 analog 可解，或只是多推几步。
- 所有胜路不需要至少两次 B/S shift、box_to_sticky、sticky_merge、sticky_to_box、move_sticky_rigid。
- 合体后的 rigid movement 只有一次，或 lower target 可由切割后直接推动下层 M 完成。
- 删除任一目标不降低核心约束。
- Critic 仍能合理指出 B/S timing 没有代价冲突、黏块只是一格钥匙或难度来自空走路。
