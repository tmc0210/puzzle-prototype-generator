# Explorer Notes: ra_loop_pl_l_notch_immediate_pull_20260708_01

## 本轮意图

本轮修正上一轮过宽的“绕路正交把手”读法，聚焦用户原始结构：

```text
玩家初始就在 L 形 2x2 缺角里 -> 横向 push 一格跨 P/L 边界 -> 第二手立即正交 pull
```

这里的成果不是“L 形可侧拉”，而是缺角站位让第一手 push 后的玩家直接成为 L 侧正交 pull 把手。这个结构可以做成下拉、上拉、左右镜像、前格门、目标格门和扫带邻物。

## 关键观察

- `bl_notch_push_right_pull_down`：玩家在左下缺角，`right` 后立即 `down`，触发 `pull_object:sticky#1,move_sticky_rigid`，L 形整体下移；return path depth 2。
- `tl_notch_push_right_pull_up`：玩家在左上缺角，`right` 后立即 `up`，L 形整体上移；return path depth 2。
- `br_notch_push_left_pull_down`：反向 P/L，玩家在右下缺角，`left` 后立即 `down`；说明右侧缺角镜像成立。
- `tr_notch_push_left_pull_up`：反向 P/L，玩家在右上缺角，`left` 后立即 `up`；四个缺角方向都成立。
- `bar_notch_absent_pull_degenerates_to_walk`：同样 `right,down`，横条没有缺角把手，第二手只是 `walk`，不是 pull。
- `bl_notch_down_front_wall_blocks_pull`：第一手 `right` 成功，第二手因玩家前格墙给 `destination_blocked`。
- `bl_notch_down_target_wall_blocks_shape`：玩家前格开放，但 L 形外部目标格墙给 `force_blocked`。
- `bl_notch_down_sweeps_bs_anchor`：把目标墙换成 B/S anchor，第二手合法，事件为 `pull_object:sticky#1,force_chain:n2,anchor_boundary_shift:box_sticky,move_sticky_rigid`，B/S anchor 下移并覆盖目标；return path depth 12。

## 结构差异

缺角是结构核心：

- L 形缺角让玩家第一手 push 后落入 L 侧且正好在正交 pull 把手位。
- 横条没有缺角，第二手正交输入只会 walk，不能拉动身后对象。

门的分层：

- 玩家前格门：关闭后第二手 `destination_blocked`。
- L 形目标格门：关闭后第二手 `force_blocked`。
- 可移动目标格：把墙换成 B/S anchor 后，目标格从阻挡变成扫带资源。

方向谱：

- 左侧缺角需要 P/L 为 `PL`，第一手 `right`。
- 右侧缺角需要 P/L 为 `LP`，第一手 `left`。
- 上 / 下缺角决定第二手是 `up` 还是 `down`。

## 结论范围校准

已支撑：

- 四个 2x2 L 形缺角朝向。
- 一推后立刻正交 pull，无需绕路。
- 横条作为“无缺角”错例。
- 玩家前格墙 / L 形目标墙的失败原因区分。
- B/S anchor 作为可移动邻物被扫带并覆盖目标。
- 所有 case 的局部状态图在预算内 complete。

结论收窄：

- 本轮只覆盖 2x2 L 形 triomino，不覆盖 2x2 方块、T 形、三格条、四格 L。
- 本轮只覆盖水平 P/L stroke 后的正交 pull；竖向 P/L stroke 未覆盖。
- 扫带 consumer 只覆盖 B/S anchor，未覆盖 crate、P/L anchor、sticky blocker。
- B/S anchor 在扫带 case 中是 consumer / movable blocker，不是本轮机制主语。

不应入库：

- 普通开放房间 L 形侧拉。
- 横条 `right,down` 的 walk 结果。
- 把扫带 B/S anchor 写成 B/S 边界题材。

是否打开新设计空间：

- 是。`P/L L形缺角活塞：一推即侧拉` 比上一轮“绕路正交把手”更基础、更紧凑，适合作为正式顶层结构族。
- 若继续探索，新的题材应是“缺角活塞扫带不同 blocker 类型”，而不是把本轮普通朝向补全写进 backlog。

## 建议收口

建议裁决为 `promote`，并用本 run 作为正式条目的主证据。上一轮 `ra_loop_pl_l_shape_lateral_handle_20260708_01` 可作为宽松变体 / 补充 provenance，不建议单独 promote。
