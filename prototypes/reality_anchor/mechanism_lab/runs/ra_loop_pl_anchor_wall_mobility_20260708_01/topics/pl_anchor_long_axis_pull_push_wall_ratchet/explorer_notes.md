# Explorer Notes: pl_anchor_long_axis_pull_push_wall_ratchet

## 本轮假设

水平 `P/L` anchor 在长轴墙廊里不只存在已有的 `P` 侧 push 余量谱；`L` 侧 pull 也能把玩家前格余量转成同方向位移容量。墙的角色应当拆开看：端点余量门控制首步和连续步数，侧廊只改变玩家位置集合，拉后回返门消费首拉后的玩家出口。

## 有效比较

- `push_p_side_one_l_slack_baseline` 是已有 push 谱的最小对照：`right` legal，事件为 `push_object:push_pull_anchor, anchor_boundary_shift:push_pull`，局部图 complete / 3 states，回到初始为 complete no。
- `pull_l_side_no_front_gate` 是门控反例：`right` 首步 illegal，原因 `destination_blocked`，没有 anchor 移动，不支撑可动性。
- `pull_l_side_one_front_stop` 是 pull 正例：`right` legal，事件为 `pull_object:push_pull_anchor, anchor_boundary_shift:push_pull`；一格玩家前格只允许一次长轴位移，最终无 legal action，局部图 complete / 2 states。
- `pull_l_side_two_front_capacity` 把玩家前格余量从 1 扩到 2，`right right` 两步都 legal，出现两次 `anchor_boundary_shift:push_pull`，局部图 complete / 3 states。
- `pull_l_side_side_corridor_fake_handle` 首拉后 `down` 可走，局部图 complete / 30 states，但 `returnToInitial` 为 complete no；侧廊开放不是长轴反向恢复把手。
- `pull_l_side_return_gate_open` 与 `pull_l_side_return_gate_wall` 证明拉后回返门是 consumer：同一首拉合法且移动 anchor；开放版第二步 `down` legal，封墙版第二步 `down` illegal，原因 `destination_blocked`。

## 结论范围校准

已支撑：

- `L` 侧长轴 pull 的端点资源不是 L 端外侧空格，而是玩家前方空格；0 / 1 / 2 分别给出首步门控、一次停位、两次容量。
- 所有正例的 replay 中都移动了 P/L anchor 本体，并出现 `anchor_boundary_shift:push_pull`。
- 墙廊不是装饰：端墙关闭玩家前格，回返门墙关闭首拉后的离开路线，侧廊开放只增加 walk 状态而不恢复初始 anchor 状态。
- 本轮全部 reachable graph 均为 `complete`，没有把 `exhausted` 写成不可回返证明。

未覆盖导致的收窄：

- 严格长轴 pull 中，P 半格目标位会落在原 L 半格自占/自让的位置，不能像横向 pull 那样单独放墙隔离；若要测试 `P 半格目标墙`，会变成 transverse wall gate topic，不写入本条全称。
- 本轮没有把长轴位移接到 B/S 移动边界刷子或目标门闩，只能建议 supplement 现有长轴墙廊条目，不建议 promote 新顶层 family。
- 侧廊开放 case 中图搜索出现额外同方向 anchor shift；这些说明侧廊可能制造继续推进的路线，但 complete no 仍只支撑“不能回到初始”，不支撑“所有侧廊都无反向用途”的全称。

## 被修正的解释

- 初始想把 pull 的端点余量类比为 anchor 远端目标格，但 runtime 证明严格长轴 pull 的外部门先落在玩家前格；对象 footprint 目标不会被单独墙格消费。
- 失败例不能写成“P/L anchor 不可动”。`pull_l_side_no_front_gate` 是首步 destination gate；`pull_l_side_return_gate_wall` 是首拉后第二步 destination gate。它们都是门控反例。

## 不建议提交 curator 的弱结论

- 不建议新增“P/L pull 长轴墙廊”顶层条目；它和已有 `P/L 长轴墙廊：L 端余量棘轮` 的输出接口相同，适合作为 pull driver / 回返门 supplement。
- 不建议把侧廊开放概括成绝对不可逆；本轮只证明在这些局部图中不能回到初始 key，且没有长轴反向恢复。
- 不建议把 `pull_l_side_no_front_gate` 单独作为 evidence family；它没有 anchor 移动事件。

## 下一轮建议

若 curator 需要继续放大，不要补普通 0/1/2 余量；优先把本 supplement 接到一个极小 consumer，例如 P/L 位移后打开/堵住单格门闩，或驱动 B/S 边界刷子，比较 push driver 与 pull driver 是否产生不同 shortcut。
