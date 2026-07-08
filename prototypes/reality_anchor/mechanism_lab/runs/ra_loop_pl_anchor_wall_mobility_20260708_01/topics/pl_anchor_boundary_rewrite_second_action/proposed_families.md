# Proposed Families: pl_anchor_boundary_rewrite_second_action

## 语料化结果

### 装置：旧 L 半格重写站位

P/L anchor 沿长轴连续移动两格后，原本被 L 半格占住的格子会被释放；新的 P/L 边界同时把它归入 push side。玩家如果能站回这个旧 L 格，就能把它当作一个新生成的 push 侧把手，继续推动相邻箱子或后续对象。

最小形式：

```text
P 侧 push 构造旧 L 站位：
########
#......#
#@PL...#
#..C...#
#..G...#
########

right,right 后：
########
#......#
#..@PL.#
#..C...#
#..G...#
########

down 后，旧 L 站位推箱进目标：
########
#......#
#...PL.#
#..@...#
#..*...#
########
```

```text
L 侧 pull 构造同一输出，额外需要绕行回旧 L：
#########
#.......#
#..PL@..#
#...C...#
#...G...#
#########

right,right 后，锚点右移两格：
#########
#.......#
#....PL@#
#...C...#
#...G...#
#########

绕行到旧 L 半格，再 down：
#########
#.......#
#....PL.#
#...@...#
#...*...#
#########
```

适用变体：

- P 侧 push 连续推动水平 P/L anchor 两格。
- L 侧 pull 连续拉动水平 P/L anchor 两格，然后绕行到旧 L 半格。
- 旧 L 半格旁边接单箱 + 目标，也可换成其他只接受 push 侧站位的 consumer。

输入接口：

- P/L anchor 沿长轴至少有两格移动余量。
- 旧 L 半格释放后，玩家能站到该格或能通过绕行回到该格。
- 该旧 L 格相邻有一个只在 push side 有意义的后续对象 / 门 / 目标。

输出接口：

- 旧 L 半格从 occupied anchor cell 变成新 push side 操作站位。
- 第二动作产生普通 `push_object` 输出，例如把 crate 推进目标。
- 若第二次 anchor shift 被墙阻止，则没有该输出。

自然消费方式：

- 目标袋：旧 L 站位把 crate 推入单格目标。
- 门闩：旧 L 站位推开/推入一个 blocker。
- 二段 recipe：先移动锚点改写边界，再用新站位处理之前无法处理的对象。

误用边界：

- 只有一次 `anchor_boundary_shift:push_pull` 不够；玩家通常还没站到旧 L 半格，第二动作可能只是 walk 或错位 push。
- 如果墙阻止第二次 anchor shift，旧 L 半格仍在 anchor footprint 中或无法被用作把手。
- 这不是普通 P/L 边界旁箱子推拉；关键输出来自 P/L anchor 本体移动后释放并重写旧 L 半格。
- 正例的回返性未知；不能写成不可回返装置。

组合例句：

`P/L anchor 双步位移 -> 旧 L push 站位 -> 单格目标袋`：玩家先把 P/L anchor 推/拉过目标把手位，释放旧 L 半格并把它改写成 push side，再用这个新把手把箱子推进目标。

## Family：P/L 锚点旧半格重写把手

机制角色：

- `active_rule`: P/L anchor 本体移动导致 `forceModeAt` 边界重写；第二动作在新 push side 中触发 `push_force`。
- `material_source`: crate / goal 只是后续 consumer 材料。
- `consumer`: 第二停位墙、pull 前格墙、旧 L 下方目标袋、pull driver 的绕行通路。
- `incidental`: 目标覆盖胜利、可达图里其他 anchor / crate 旁支。

关键观察点：

- 正例第 1、2 步都移动 P/L anchor，并发出 `anchor_boundary_shift:push_pull`。
- 第 3 步或绕行后的最后一步发生在旧 L 半格，事件从 anchor 移动切换为 `push_object:crate#1`。
- 对照中第二次 anchor shift 被墙关闭，动作链在旧 L 半格消费前停止。

局部问题：

P/L anchor 移动是否只是改变 anchor 位置，还是能把旧 anchor footprint 释放成新的推拉侧站位，并被后续墙 / 目标消费？

结构旋钮：

- driver：P 侧 push / L 侧 pull。
- 长轴余量：是否允许连续移动两格。
- 墙位：第二停位墙 / pull 玩家前格墙 / 开放。
- 旧 L 半格是否有后续对象和目标 consumer。
- pull driver 是否有绕行通路回到旧 L 半格。

变体谱：

| 变体 | 结果 | 语料作用 |
| --- | --- | --- |
| `push_two_shift_old_l_push_crate_goal` | 两次 anchor shift 后，旧 L 半格 `down` 推箱进目标 | P push 构造正例 |
| `push_second_shift_wall_blocks_rewrite` | 第二次 shift `force_blocked` | anchor 目标墙反例 |
| `pull_two_shift_old_l_push_crate_goal` | 两次 pull shift + 绕行后，旧 L 半格 `down` 推箱进目标 | L pull 构造正例 |
| `pull_second_shift_front_wall_blocks_rewrite` | 第二次 pull `destination_blocked` | pull 玩家前格墙反例 |
| `push_one_shift_only_walks_not_consume` | 一次 shift 后 `down` 只是 walk | 修正“只要 shift 就有把手”的误解 |

共同解释：

P/L anchor 的二格 footprint 不是只在当前位置定义边界。连续移动后，旧 footprint 格会被释放；如果新边界把它归到另一种 force side，玩家可以把这个旧格当作新生成的操作把手。墙可以消费这条链的不同段：挡住 anchor 的第二停位、挡住 pull 玩家前格，或让旧 L 格没有可用后续对象。

常见 shortcut：

- 过宽空间允许玩家不使用旧 L 半格也能处理目标，会弱化该结构。
- 只看最终箱子入目标，忽略前两步 anchor shift，会误归为普通箱子 push。
- pull driver 如果没有绕行通路，可能已经完成边界重写但无法消费旧 L 格。

推荐 probe：

把旧 L 半格下方的 crate 换成墙口门闩或第二个 P/L/B/S anchor，验证这个“释放并重写出的把手”能否驱动更长的局部链。若继续测试旧 P 半格或竖向 P/L，应作为同一结构谱扩展，不单独写 backlog。

建议 curator 决策：

- `promote` 或 `merge` 到新的 P/L anchor 本体结构族，标题应强调“锚点移动后旧 footprint 半格被边界重写并消费”。
- 不应并入普通 `P/L 边界交接`，因为本 family 的 producer 是 P/L anchor 本体移动，而不是普通对象跨 P/L。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_boundary_rewrite_second_action`, `cases=push_two_shift_old_l_push_crate_goal,push_second_shift_wall_blocks_rewrite,pull_two_shift_old_l_push_crate_goal,pull_second_shift_front_wall_blocks_rewrite,push_one_shift_only_walks_not_consume`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 结论范围校准

- 已支撑：水平 P/L anchor 双步位移可以释放旧 L 半格并把它重写为 push 侧把手；push driver 和 pull driver 均可构造。
- 已支撑：墙可以分别关闭 anchor 第二停位和 pull 玩家前格，阻断重写链。
- 未覆盖导致的收窄：未测试旧 P 半格、竖向 P/L、更多后续 consumer；因此不写成所有旧 anchor 半格的通用规律。
- 不应入库的弱结论：一次 anchor shift、目标覆盖本身、正例不可回返判断。
- 是否打开新题材：否。本 topic 内相邻变体应作为同一结构谱扩展或 recipe 组合，不写 backlog 债。
