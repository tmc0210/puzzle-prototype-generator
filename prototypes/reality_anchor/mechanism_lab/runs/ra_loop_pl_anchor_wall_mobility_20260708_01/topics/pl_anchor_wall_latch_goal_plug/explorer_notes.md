# Explorer Notes: pl_anchor_wall_latch_goal_plug

## 本轮假设

- P/L anchor 的二格 footprint 可以不只作为边界或可移动物体，而是被一格墙口消费成门闩：移动前堵口，移动后释放通道或抽出门口。
- 墙口宽度应该是关键旋钮：一格口能消费单个 anchor 半格；二格口可能让玩家从旁 lane shortcut。
- 目标塞子需要谨慎：runtime 能证明 anchor 覆盖目标会改变 `isWin`，但如果没有墙口、对象或后续通道消费，只能算 target-covering witness。

## 有效比较

- `one_cell_push_mouth_open`：P 侧 `right` 合法，事件为 `push_object:push_pull_anchor, anchor_boundary_shift:push_pull`。P 半格离开一格墙口后，最终动作表出现 `up/down` walk，说明墙口通道被释放；`right` 被止位墙 `force_blocked`。
- `one_cell_push_mouth_too_narrow`：同一结构只把 L 端余量换成墙，首步 `right` 变成 `force_blocked`，没有 anchor 移动。它是 footprint 目标格不足的门控反例。
- `two_cell_mouth_shortcut`：把一格口改成相邻二格口后，玩家首步 `up` 直接 `walk` 通过旁 lane，没有移动 P/L anchor。它证明宽度过大时门闩不再是必经 consumer。
- `one_cell_pull_extract_handle_open` / `one_cell_pull_extract_handle_sealed`：反向 `LP` 下，pull 侧 `left` 都合法并出现 `pull_object:push_pull_anchor, anchor_boundary_shift:push_pull`，都把 P 半格从门口抽走；开放侧路最终保留 `up/down`，封闭侧路最终无合法动作，说明 pull 后回返把手可被墙消费。
- `goal_cover_stop_on_target`：push 一步后 L 半格覆盖唯一目标，`final.isWin=true`，右侧墙让下一步 `right` 为 `force_blocked`。
- `goal_cover_release_overtravel`：目标外侧留足余量时，连续三次 push 先覆盖再越过目标，最终玩家站在目标上但 anchor 已释放目标，`final.isWin=false`。

## 结论范围校准

- 已支撑：一格墙口可以把 P/L anchor 的单半格占位消费成门闩；P 侧 push 和 L/P 反向 pull 都能移动 anchor 本体，正例都有 `anchor_boundary_shift:push_pull`；过窄目标格会 `force_blocked`；二格宽口会产生不移动 anchor 的 walk shortcut；pull 后侧路墙能改变最终动作集合。
- 未覆盖：没有证明所有方向、所有 P/L 朝向、所有二格口都等价；二格口只覆盖了“旁 lane shortcut”一种失败方式；目标塞子没有接 crate、二段通道或非胜利条件 consumer。
- 不扩张：`returnToInitial.status=complete/no found` 只作为本局部图内的回返观察，不写成全局不可回返规律。
- 旧语料边界：不同于 `P/L 长轴墙廊` 的 L 端容量，本轮关键观察点是墙口是否必须被 anchor 半格释放；不同于 `P/L 横向把手` 的前格门 / footprint 门分类，本轮把“墙口宽度”和“门闩后的通道/把手”作为 consumer。

## 被修正的解释

- 初始想法“二格口也能由二格 anchor 完整锁住”不成立于本 patch：只要墙口给出相邻旁 lane，玩家可以 walk shortcut，门闩失效。
- 目标覆盖不能单独写成强结构族。它能显示 anchor 是 target-covering object，但没有墙口或后续对象消费时，只是胜利判定 witness。
- pull 抽出门口不是自动等于可回返；同样的 pull 移动后，侧路把手开放与封死会把最终动作集合从 `up/down` 变成空集。

## 不建议提交 curator 的弱结论

- 不建议把 `goal_cover_stop_on_target` 单独 promote 为目标塞子 family；它缺非胜利条件消费。
- 不建议把 `two_cell_mouth_shortcut` 当成 anchor 可动性证据；它是宽度边界反例，首步只有 `walk`。
- 不建议把过窄 `force_blocked` case 单独支撑 family；它只说明 footprint 目标格不足会关门。

## 下一轮建议

- 若继续同题材，应把目标塞子接一个非胜利条件 consumer：例如目标格同时是单格通道、crate 终点、或必须释放后才能让玩家/对象通过。
- 若进入 composition round，可把一格门闩输出接 B/S 边界刷或普通 crate 口袋，验证“释放通道”是否能成为后续机制输入。
