# Proposed Families: sticky_wall_pull_mobility

## 建议收录方式

本草案已被后续 `sticky_wall_pull_shape_spectrum` 补实验扩展。最终收录不再是塞进 `刚体黏块 + 墙口：反向施力格谱系` 的边角 supplement，而是与 `single_crate_pull_mobility`、`sticky_wall_pull_shape_spectrum` 合并为新的顶层结构族：`Pull 侧对象可动性：单箱基线与刚体墙口`。

本文件保留为早期 subset 证据：它覆盖单箱 / 单格 sticky / 2 格竖条 / L 形 / post-mouth handle；shape_spectrum 已补齐 3 格竖条、2x2、L 形方向、沿轴横条、box-side crate blocker 与 sticky blocker。因此这里不再留下“以后补基础变体”的 backlog 口径。

## Supplement A: pull-side footprint target mouth

- 设计用途：让玩家在 pull side 试图把 sticky 刚体拉过墙口；口宽或凸角只差一格时，动作从 legal 变为 `force_blocked`。
- 最小形式：玩家前格为空，身后一格接触 sticky；2 格竖条或 L 形 sticky 的某个非接触格在平移目标位遇墙。
- 局部结构谱：

```text
单格 sticky control：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.....#
##########

2 格竖条，非接触格目标位为墙：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M#..#
#..#.....#
##########

同形打开目标位：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
#..#.....#
##########

L 形远端脚被凸齿墙拒绝：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM#.#
#..#.....#
##########

同形打开凸齿：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM..#
#..#.....#
##########
```

- 输入接口：已存在 connected sticky footprint、玩家站在 pull side、目标方向前格为空。
- 输出接口：合法 pull 后整块平移一格，或因任一 footprint 目标格撞墙而状态不变。
- 主要旋钮：footprint 形状、非接触格目标位是否为墙、凸齿是否打开、玩家前格是否仍为空。
- 误用边界：单格 sticky 只证明 pull 事件和 `move_sticky_rigid`，不提供刚体口宽差异；B/S 跨线转换不应写成 active rule。
- 证据：`bar_side_pull_target_wall_blocked` / `bar_side_pull_open_mouth`，`l_corner_pull_tooth_blocked` / `l_corner_pull_notch_open`；证据标签 `runtime_observed`、`bounded_graph`、`graph_complete`、`consumption_probe`。

## Supplement B: pull-side post-mouth reverse handle

- 设计用途：让 sticky 刚体先被拉过口，再用墙带决定玩家能否绕回对象另一侧把手格，把刚体拉回或继续重定位。
- 最小形式：2 格竖条在 pull side 被向右拉一格；直接向左输入被 `pull_world_front_blocked` 关闭；上侧环路开闭决定能否抵达左侧把手。
- 局部结构谱：

```text
上侧环路开放，拉过口后仍可绕回把手：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
##########

上侧环路被墙带关闭，同样先 pull 通过但 complete no：
##########
#PL#....G#
#BS#####.#
#..#.M@..#
#..#.M...#
##########
```

- 输入接口：一次合法 pull 后，sticky footprint 占住玩家反向前格；局部空间有或没有绕行到反向把手的通路。
- 输出接口：open 变体回初始 depth 9；closed 变体完整图为 `no complete`，最终动作表同时失去 `up` 入口。
- 主要旋钮：拉后对象左侧把手格是否可达、上侧环路是否被墙带封死、底部是否给出替代绕行。
- 误用边界：只看到 `right` legal 不足以证明回返；`returnToInitial.status=not_applicable` 的 blocked 首步 case 不能作为不可回返证据。
- 证据：`bar_pull_after_handle_open` / `bar_pull_after_handle_closed`；证据标签 `runtime_observed`、`bounded_return`、`bounded_graph`、`graph_complete`、`consumption_probe`。

## Curator 提示

- 推荐动作：`merge` 到 `Pull 侧对象可动性：单箱基线与刚体墙口`；B/S 只保留为 material source，P/L 不作为本 topic 的 active rule。
- 可写入的设计句：pull 侧的 sticky 墙口不只看玩家前格；整块 footprint 的目标位必须同时开口，而拉过口后还要保留能绕到反向把手的路径。
- 已补实验：`sticky_wall_pull_shape_spectrum` 已把 2x2、3 格条、box-side crate blocker、sticky blocker 等基础变体跑完并写入 lexicon，不另写 backlog 债。
