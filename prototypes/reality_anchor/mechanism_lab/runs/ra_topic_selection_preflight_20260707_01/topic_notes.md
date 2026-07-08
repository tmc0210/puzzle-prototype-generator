# Topic Selection Notes: ra_topic_selection_preflight_20260707_01

## Keep

### pull sticky + walls

人类指出这是当前最显然、最干净的探索题。它不是验证“黏块能不能被拉”，而是探索
pull 世界里 sticky rigid footprint 与墙面 / 墙角 / 窄口的局部可动性谱。

- 基础动作：玩家在 pull 世界拉动黏块。
- 基础约束：墙、角、窄口、侧边墙、玩家前格。
- 变量：单格 / 二连 / 三连 / L 形 / 2x2；沿墙拉 / 离墙拉 / 拉进角 / 从角里拉出；玩家前格和 sticky footprint 目标格。
- 预期产物类型：合法拉出、footprint 被墙拒绝、玩家前格门关闭、拉后无回返、墙角把手、窄口吞站位。
- 边界：P/L 只提供 pull 世界，B/S 只作为预置 M 的 material source；不要把题写成 P/L 或 B/S 边界验证。

## Reject / demote

- `anchor_goal_boundary_side_effect`：裸目标没有结构意义，只是给玩家要求；废弃。
- `reverse_handle_occupied_spectrum`：关键观察点滑向 B/S 侧决定箱子是否黏，不能作为“把手占用”新题。
- `pull_brush_stroke_selector`：已有 run 降级为移动边界刷子的输入侧，不作为新 topic。
- `tail_debt_reconsumption`：已有 run 降级为组合链线索；除非找到新门型核心，否则不作为新 topic。

## Similar topic candidates

### pull crate + walls

作为 `pull sticky + walls` 的单格对照，但可以独立看 pull 世界里普通箱与墙角 / 窄口的基础谱。

- 基础动作：玩家在 pull 世界拉单格 crate。
- 基础约束：玩家前格、crate 目标格、墙角、窄口、回返站位。
- 变量：沿墙拉 / 离墙拉 / 拉进角 / 从角里拉出；前格开闭；拉后 crate 是否占用玩家回路。
- 边界：不要只验证 pull 规则；重点是单格对象和 sticky footprint 在同一墙几何下的差异。

### pull sticky + movable obstacles

在 `pull sticky + walls` 之外，把墙换成非 sticky 的可动物，探索 pull sticky footprint 与侧向 / 背向障碍的资源移交。

- 基础动作：玩家拉 sticky footprint。
- 基础约束：sticky 目标格上有 crate 或 anchor 半格；墙作为关闭对照。
- 变量：障碍被 force chain 推开 / 关闭动作 / 变成后续把手或债务。
- 边界：不要把 B/S 侧决定是否黏写成题；B/S 只负责让材料存在，关键观察点应在 pull footprint 和 blocker 关系。
- 明确排除：sticky 不能作为 sticky 的 blocker；相邻 sticky 会合并，应该归入 footprint 扩张题，而不是 blocker 题。

### sticky footprint growth + walls

把“另一个 sticky 放在路上”改写为 footprint 扩张题：sticky 在运动前或运动后并体，形状变大后再被墙口 / 墙角消费。

- 基础动作：玩家推或拉 sticky footprint，使它和另一块 sticky 合并，或避免合并。
- 基础约束：墙口、墙角、前沿口宽、反向施力格。
- 变量：先合并再进墙口 / 先进墙口再合并；接触点在头部、侧边或尾部；合并后形状是条形、L 形还是块状。
- 边界：这不是 blocker；关键观察点是 footprint growth 如何改变墙几何下的可动性。

### push/pull same sticky around a corner

固定 P/L 提供两个操作侧，探索同一个 sticky footprint 在墙角附近先 push 后 pull，或先 pull 后 push 的顺序差异。

- 基础动作：同一 sticky footprint 被推入 / 拉出墙角。
- 基础约束：墙角、单格绕行、反向施力格、pull 前格。
- 变量：先推还是先拉；玩家是否能换边；sticky 是否堵住自己的回返站位。
- 边界：不要研究 P/L anchor 移动；P/L 只提供 push / pull 两种操作环境。

### anchor body + walls, without boundary effects

把 P/L 或 B/S 锚点先当普通二格刚体，探索二格刚体在墙边 / 墙角 / 窄口的基础运动谱。

- 基础动作：推或拉二格 anchor body。
- 基础约束：二格 footprint、墙角、窄口、另一半目标格、玩家前格。
- 变量：横放 / 竖放；长轴 / 短轴移动；沿墙 / 离墙；另一半被墙拒绝或给出把手。
- 边界：先禁止使用锚点边界副作用；只看二格刚体空间行为，避免滑回 P/L 或 B/S 规则验证。

### sticky split pieces + shared corridor

从已有 split 事实出发，但不以目标袋为中心，探索分裂后的多个 sticky 部件争用同一通道 / 把手 / 回返格。

- 基础动作：split 后分别移动多个部件。
- 基础约束：单行通道、共享把手、共享回返站位、一个部件挡住另一个部件。
- 变量：上端点先动 / 下端点先动；桥债位置；通道宽度；预分离对照。
- 边界：不要再证明 sticky_split 事件；关键是多个输出部件之间的调度关系。
