# Proposed Families: ra_loop_pl_l_notch_immediate_pull_20260708_01

## P/L L形缺角活塞：一推即侧拉

接口卡片：
- 输入接口：玩家初始站在一个 2x2 L 形 sticky 的缺角中；缺角与 P/L 边界相邻，第一手横向 push 会把玩家带过边界进入 L 侧；L 形的上下缺角决定第二手正交 pull 方向。
- 输出接口：第一手横向 stroke 后，第二手无需绕路即可正交 pull 整个 L 形；可产出上移 / 下移的 L 形、可快速回返状态、前格门阻塞、目标格门阻塞，或扫带邻物。
- 最小 consumer：横条错例消费“缺角是否存在”；前格墙消费玩家 pull 门；目标墙消费 L 形外部目标格；B/S anchor 替代目标墙后被扫带并覆盖目标。

局部结构谱：

```text
左下缺角：right 后立即 down pull
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#........#
##########

左上缺角：right 后立即 up pull
##########
#B########
#S#PL...G#
#........#
#..@M....#
#..MM....#
#........#
##########

右下缺角：反向 P/L，left 后立即 down pull
##########
#B########
#S#LP...G#
#........#
#..MM....#
#..M@....#
#........#
##########

右上缺角：反向 P/L，left 后立即 up pull
##########
#B########
#S#LP...G#
#........#
#..M@....#
#..MM....#
#........#
##########

横条错例：right 后 down 只是 walk
##########
#B########
#S#PL...G#
#........#
#........#
#..@MM...#
#........#
##########

前格墙：第二手 down 被 destination_blocked
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#...#....#
##########

目标墙：第二手 down 被 force_blocked
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#....#...#
##########

目标格换成 B/S anchor：第二手 down 扫带并覆盖目标
##########
#........#
#..PL....#
#........#
#..MM....#
#..@M....#
#....S...#
#....B...#
#....G...#
##########
```

共同解释：

这组结构把 P/L 边界活塞压缩到两步：玩家一开始站在 L 形缺角里，第一手横向 push 既移动 L 形，也把玩家送到 L 侧；因为玩家落在缺角的对应位置，第二手正交输入立刻变成 pull，而不是 walk。L 形上下缺角决定上拉或下拉，P/L 左右朝向决定横向 stroke 是 `right` 还是 `left`。

对照关系：

- 四个缺角正例：左下、左上、右下、右上都能一推即正交拉，说明这是 L 形缺角接口，而不是某个单方向偶然。
- 横条错例：没有缺角时，第二手正交输入没有身后对象，只是 walk，说明“缺角把手”是必要接口。
- 前格墙 vs 目标墙：同一个两步结构，墙放在玩家前格给 `destination_blocked`，放在 L 形外部目标格给 `force_blocked`，把玩家门和形状门分开。
- 目标墙 vs B/S anchor：同一目标位从墙改成可移动二格对象后，失败变成 `force_chain:n2 + anchor_boundary_shift:box_sticky`，证明该目标位是可消费的扫带接口。

自然消费方式：

- 用作二步活塞：横向 stroke 后立即正交拉，形成紧凑的折向移动。
- 用作回返门：正交拉后的终态可用短路径回到初态，适合做可撤销承诺。
- 用作扫带器：把目标墙换成 anchor / crate / blocker，测试侧向目标格是阻塞、移交还是合并。
- 用作目标覆盖：扫带 B/S anchor 可直接覆盖目标。

误用边界：

- 开放空间中绕路到 L 形侧面再拉，不是本条核心。
- 没有缺角的横条不产生立即正交 pull。
- 只有第一手横向 stroke 不够；必须证明第二手正交输入触发 pull 或被相应门消费。
- B/S anchor 是可移动邻物 consumer，不是本条命名主语。
- 本轮没有覆盖竖向 P/L stroke 或更大刚体。

证据来源：

- `run=ra_loop_pl_l_notch_immediate_pull_20260708_01`
- `cases=bl_notch_push_right_pull_down,tl_notch_push_right_pull_up,br_notch_push_left_pull_down,tr_notch_push_left_pull_up,bar_notch_absent_pull_degenerates_to_walk,bl_notch_down_front_wall_blocks_pull,bl_notch_down_target_wall_blocks_shape,bl_notch_down_sweeps_bs_anchor`
- `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## Curator 检查信息

机制角色：
- active_rule：P/L 边界让第一手横向 push 后玩家进入 L 侧；L 形缺角让第二手正交输入有身后 sticky 对象可 pull；sticky 刚体目标格检查和 force chain 产生门控 / 扫带差异。
- material_source：B/S anchor 在非扫带 case 中只用于允许 sticky；在扫带 case 中作为可移动邻物 consumer。
- consumer：横条错例、玩家前格墙、L 形目标墙、B/S anchor 目标覆盖。
- incidental：目标 `G` 仅在扫带 case 中作为覆盖 consumer，其余 case 只保证 layout 合法。
- 关键观察点：第二手正交输入是否从 walk 变成 `pull_object:sticky#1`；墙位是否给 `destination_blocked` / `force_blocked`；目标位换成 B/S anchor 后是否产生 `force_chain:n2`。

退化解释：

本条排除了普通 L 形可动性：玩家不需要绕到侧面，而是初始缺角站位和 P/L 跨侧 stroke 共同制造第二手正交 pull。横条错例排除了“只要刚体被推过边界就能侧拉”的解释；前格墙和目标墙分离了普通玩家门与形状门；B/S anchor 扫带证明该目标格可以被设计为资源移交位。

建议裁决：

`promote`。这是比 `P/L L形活塞正交把手：朝向、侧拉与扫带` 更紧凑、更基础的顶层结构族。上一轮可降级为本条的宽松把手变体或不入正式入口。
