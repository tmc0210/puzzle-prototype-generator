# Explorer Notes: pl_anchor_transverse_wall_gate_matrix

## 本轮假设

- `P/L` anchor 本体横向/竖向把手不是一个单一“能不能推拉”的事实，而是四类墙门的矩阵：玩家前格门、P 半格目标门、L 半格目标门、移动后回返门。
- 横放 `PL` 的垂直位移最适合拆门层：P 侧 push 可以分别堵 P/L 两个目标半格；L 侧 pull 可以把玩家前格门和非接触半格目标门分开。
- 竖放 `P/L` 的横向 push 应作为旋转对照；若左右开放 case 给出相同事件和可达图摘要，说明横放结论不是只依赖一个旧方向的偶然站位。

## 有效比较

- `h_p_push_down_open_return` 是核心正例：`down` push 移动横放 `PL` 并发出 `anchor_boundary_shift:push_pull`，随后 `right up` 能从旧 L 格回拉，step3 再次发出同一事件；局部图 complete，300 states。
- `h_p_push_down_p_target_wall` 与 `h_p_push_down_l_target_wall` 都首步 `force_blocked`，但门控层不同：前者是 P 半格目标格，后者是 L 半格目标格。runner reason 相同，语料必须用局部坐标解释差异。
- `h_p_push_down_return_front_wall` 首步已移动 anchor，step3 才 `destination_blocked`；这不是首步失败，而是移动后回返门被消费。
- `h_p_push_up_open` 补了 P 侧向上 push，说明横放 P 侧上下开放镜像都能移动 anchor，不能只保留旧的向下样本。
- `h_l_pull_down_open` / `h_l_pull_down_front_wall` / `h_l_pull_down_p_target_wall` 把 L 侧 pull 的下向版本拆开：玩家前格墙给 `destination_blocked`，非接触 P 半格目标墙给 `force_blocked`。
- `v_p_push_right_open` 与 `v_p_push_left_open` 都合法，事件都是 `push_object:push_pull_anchor, anchor_boundary_shift:push_pull`，局部图都 complete / 230 states；在无墙门时，竖放 P 侧横向 push 左右镜像等价。

## 结论范围校准

已支撑：

- 横放 `PL`：P 侧 push 下/上、L 侧 pull 下均有正例移动 anchor，且正例都含 `anchor_boundary_shift:push_pull`。
- 横放 `PL`：P 侧 push 下时，P 半格目标门和 L 半格目标门能被相邻墙格独立关闭；两者 runtime reason 都是 `force_blocked`，但坐标层不同。
- 横放 `PL`：L 侧 pull 下时，玩家前格门先于 footprint 检查，给 `destination_blocked`；玩家前格开放后，非接触 P 半格目标墙给 `force_blocked`。
- 移动后回返门被消费：`h_p_push_down_return_front_wall` 先发出 `anchor_boundary_shift:push_pull`，再在回返 pull 的玩家前格被墙关闭。
- 竖放 `P/L`：P 侧横向 push 左/右开放镜像在本 patch 中等价。

未覆盖导致的结论收窄：

- 未跑竖放 L 侧 pull 左/右的完整门层矩阵；本轮只把竖放作为 P 侧 push 的旋转对照。
- 未跑横放 L 侧 pull 上的新版 case；已有正式条目有 pull up 基线，本轮改跑 pull down 来避免只复制旧样本。
- 未把墙门接到 B/S 移动边界刷子；因此 proposed family 建议作为现有把手墙门条目的 supplement，不直接声称 composition probe。

## 被修正的解释

- 不能把所有 `force_blocked` 写成同一条“目标格被挡”。P 侧 push 的 P 半格目标墙和 L 半格目标墙都返回 `force_blocked`，但 designer 放墙时消费的是不同半格。
- 直接 L 侧 pull 中，被接触的 L 半格目标格通常就是玩家旧格，无法在同一个直接 pull patch 里独立放墙；可独立关闭的是玩家前格和非接触 P 半格目标格。
- 移动后回返门不是首步合法性的反例。它要求首步已经移动 anchor，然后把后续反向 pull 的玩家前格关掉。

## 不建议提交 curator 的弱结论

- 不应把竖放左右开放镜像单独升成新 family；它只是横/竖矩阵的旋转补充。
- 不应把 `destination_blocked` / `force_blocked` 当规则复述入库；只有配合局部墙格坐标和相邻对照时才是墙门分类器。
- 不应把本轮写成完整关卡题材；没有目标口、B/S 刷子或完整路径约束。

## 下一轮建议

- 若 curator 需要 composition 证据，把 `h_p_push_down_return_front_wall` 的移动后回返门接到 B/S 移动边界刷子，比较 push driver 与 pull driver 是否制造不同 shortcut。
- 若要补全旋转谱，可用同样坐标语言跑竖放 L 侧 pull 左/右，把玩家前格门和非接触 P 半格目标门迁移到水平轴。
