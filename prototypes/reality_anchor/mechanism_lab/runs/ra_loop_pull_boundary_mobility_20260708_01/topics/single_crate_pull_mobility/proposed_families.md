# proposed families: single_crate_pull_mobility

## 建议结论

建议不要把本 topic 作为独立大型 lexicon family 收录；大部分内容是 pull 基础语法的 runtime-backed 对照。可作为 supplement 合并到后续 P/L pull 抽取把手或 pull-pocket consumer 条目中，重点保留两个可组合接口：

- pull 后站位跨入 push 侧时，反向 push 可以一拍撤销 pull。
- pull 合法但玩家进入单格墙口袋时，墙作为 consumer 可把回返压成 `complete no`。

## 候选 supplement family：单箱 pull 前格门与口袋消费

局部问题：在 pull 世界中，单个 crate 位于玩家身后一格时，玩家前格、身后一格和 pull 后站位如何改变动作集合与回返性？

局部结构谱：

```text
合法 pull，仍在 pull 侧：
#########
#PL....G#
#..C@...#
#.......#
#########

合法 pull，前格跨到 push 侧，可一拍 push 回退：
#########
#...LP.G#
#..C@...#
#.......#
#########

前格墙，pull 不发生：
#########
#PL....G#
#..C@#..#
#.......#
#########

前格物体，pull_world_front_blocked：
#########
#......G#
#..C@LP.#
#.......#
#########

身后无 crate，同一输入只是 walk：
#########
#PL....G#
#...@...#
#.......#
#########

单格口袋，pull 后 complete no：
########
#PL###G#
###C@.##
########
```

机制角色：

- `active_rule`: `pull_force + player front cell requirement`。
- `material_source`: P/L anchor 只提供 pull 侧；`pull_open_crosses_to_push_undo` 额外用 P/L anchor 把 pull 后站位放到 push 侧。
- `consumer`: 前格墙、前格 anchor 物体、单格墙口袋、以及 pull 后是否能站到 push 回推格。
- `incidental`: 可达图中的 anchor 被推拉事件不是本 topic 的核心证据。

结构旋钮：

- 玩家前格：空 / 墙 / 物体。
- 玩家身后一格：crate / 空。
- pull 后站位：仍在 pull 侧 / 跨到 push 侧。
- pull 后环境：开放绕行 / 单格墙口袋。

变体谱：

| variant | cases | 观察 |
| --- | --- | --- |
| 合法 pull + push 回推 | `pull_open_crosses_to_push_undo` | `right` 发出 `pull_object:crate#1`；最终 `left` 发出 `push_object:crate#1`，`return found depth=1` |
| 合法 pull + 仍在 pull 侧 | `pull_open_stays_pull_side` | 最终 `left` 为 `pull_world_front_blocked`，但开放地面允许绕路，`return found depth=11` |
| 前格墙 | `pull_front_wall_block` | `right` 为 `destination_blocked`，墙在 crate 移动前消费动作 |
| 前格物体 | `pull_front_anchor_blocks_target_vacate` | `right` 为 `pull_world_front_blocked`；对单 crate 来说，这是“不能腾出 crate 目标格”的可观察形式 |
| 身后无 crate | `pull_no_rear_crate_walk` | 同一方向输入只产生 `walk`，不是 pull |
| 单格口袋 | `pull_single_cell_pocket_no_return` | pull 合法，最终四方向全 illegal，`return complete no` |

共同解释：pull 世界先检查玩家前格。前格可进入且身后一格有物体时，玩家移动到前格，crate 沿同方向进入玩家腾出的当前格；前格不可进入时，pull 不发生。单 crate 的目标格不能脱离“玩家是否能先腾出当前格”单独变化，因此不应新增“crate target blocker”独立 family。

输入条件：玩家处在 pull 侧，方向输入朝向一个前格；身后一格是否有 crate 是触发 pull 与 walk 的分界。

输出状态：合法 pull 的最小输出是 `C@` 从左到右位移为 `.C@`，事件为 `pull_object:crate#1`；身后无 crate 时仅玩家移动，事件为 `walk`。

自然消费：

- 前格墙消费为 `destination_blocked`。
- 前格物体消费为 `pull_world_front_blocked`。
- 单格墙口袋消费 pull 后所有站位出口，并在本轮完整图中给出 `complete no`。
- pull 后 push 侧站位提供反向 push shortcut，可把回返压成 1 步。

常见 shortcut 与误读：

- 开放地面会绕过 crate，使 `pull_open_stays_pull_side` 仍可回返；它不是不可回返证据。
- 非法 replay 的 `returnToInitial.status=not_applicable` 不是 no。
- 若未来某个扩展 case 返回 `exhausted`，只能写 unknown。
- 本 family 不满足也不需要 P/L 真边界门槛；P/L 只作局部 pull / push 侧 setup。

建议 curator decision：`defer_standalone_family`，但将 `pull_open_crosses_to_push_undo` 与 `pull_single_cell_pocket_no_return` 作为 supplement 候选补到 P/L pull 抽取把手或 pull-pocket consumer 语料。

建议保留引用：

```text
run=ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility
cases=pull_open_crosses_to_push_undo,pull_open_stays_pull_side,pull_front_wall_block,pull_front_anchor_blocks_target_vacate,pull_no_rear_crate_walk,pull_single_cell_pocket_no_return
tags=runtime_observed,bounded_return,graph_complete,consumption_probe,pull_front_cell_requirement,push_undo_probe
```

不建议单独进入 lexicon 的 case：

- `pull_front_wall_block`、`pull_front_anchor_blocks_target_vacate`、`pull_no_rear_crate_walk`：基础语法对照，用于解释动作表，不单独成族。
- `pull_open_stays_pull_side`：开放绕行 control；可作为对照，但不是 consumer 成果。
