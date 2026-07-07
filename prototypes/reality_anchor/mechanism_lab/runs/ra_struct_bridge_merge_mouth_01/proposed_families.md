# 结构族草案：桥格合并目标口

运行 ID：`ra_struct_bridge_merge_mouth_01`

策展初判：`supplement`

建议归入现有 lexicon 条目：`B/S 绑定债：箱资源生成刚体 footprint`

## 桥格合并目标口

局部问题：

crate 跨过 B/S 边界变成 sticky 时，如果它落在两个 sticky 端点之间，是否会把端点合并成一个刚体 footprint？目标口宽是否能消费这个输出？

局部结构谱：

```text
桥接上下端点，单格目标口拒绝：
########
#...M#.#
#.@C G.#
#...M#.#
#..BS..#
########

无端点，单格 sticky 通过：
########
#....#.#
#.@C G.#
#....#.#
#..BS..#
########

桥接上下端点，三格目标口通过：
########
#...M..#
#.@C G.#
#...M..#
#..BS..#
########

只桥接上端点，单格目标口拒绝：
########
#...M#.#
#.@C G.#
#....#.#
#..BS..#
########
```

旋钮：

- 既有 sticky 端点数量：0 / 1 / 2。
- 端点相对桥格的位置：本轮只测上下正交端点。
- 目标口宽：单格中口 / 三格整口。
- 桥格跨线时机：crate 首次跨入 sticky side 后立即参与 merge。

变体谱：

- `bridge_merge_single_mouth_block`：桥格连接上下端点，输出三格竖向刚体；单格目标口拒绝，第二步 `right:force_blocked`。
- `no_endpoints_single_mouth_pass`：没有端点可合并，输出单格 sticky；同一单格目标口通过并覆盖目标。
- `bridge_merge_triple_mouth_pass`：桥格连接上下端点，但目标口宽打开为三格；整体刚体推进合法。
- `bridge_merge_upper_only_single_mouth_block`：只连接上端点，输出二格刚体；单格目标口仍拒绝。

共同解释：

这个结构不是“crate 变 sticky 后能不能进目标”。它显示的是：B/S 绑定债可以由既有 sticky 端点提供邻接图，跨线 crate 成为桥格并把若干端点合并成新的刚体 footprint；后续目标口宽消费的是这个连接 footprint。

组合接口：

- 输入条件：一个 crate 能跨 B/S 边界进入 sticky side；桥格目标位置旁边可选地放置一个或两个 sticky 端点；玩家能在同一方向继续推动合并后的组件。
- 输出状态：单格 sticky、二格 sticky 刚体，或三格 sticky 刚体；输出由端点邻接图决定。
- 自然消费方式：单格 / 多格目标口、墙齿口、反向施力格墙口、后续固定 B/S 切割。
- 常见 shortcut：目标口太宽时所有 footprint 都能通过；端点不正交相邻时只会得到单格 sticky；如果没有第二步消费，只是 `sticky_merge` witness。
- 推荐 probes：横向端点、桥接后切割、双目标分配、接回返墙口。
- 组合例句：`B/S 绑定债 -> 桥格合并 footprint -> 目标口宽消费`。

误用边界：

- `no_endpoints_single_mouth_pass` 说明 sticky 材质本身不是失败原因。
- `bridge_merge_triple_mouth_pass` 说明合并不是必然失败，失败来自口宽不匹配。
- `bridge_merge_upper_only_single_mouth_block` 说明被消费的是 connected footprint 是否越出口宽，而不只是一条三格长条。
- return search 的 `exhausted` 不写成不可回返。

证据：

`run=ra_struct_bridge_merge_mouth_01`, `cases=bridge_merge_single_mouth_block,no_endpoints_single_mouth_pass,bridge_merge_triple_mouth_pass,bridge_merge_upper_only_single_mouth_block`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 策展判断

结论：进入 lexicon，但不升为独立顶层族，作为 `B/S 绑定债：箱资源生成刚体 footprint` 的补充。

理由：

- 达到 proposed family 门槛：4 个近邻变体，含正例、反例和边界修正。
- 达到 lexicon 最低门槛：目标口宽是极小后续约束，已经消费桥接输出。
- 不宜独立开条：producer 仍是 B/S 绑定债，consumer 仍是 footprint 口宽 / 墙口消费；新信息主要是“既有端点邻接图可作为绑定债旋钮”。

排除：

- 不把它写成目标回填结构；目标只是本轮消费口，不是完整关卡目标设计。
- 不把它写成 sticky 材质规则；对照已经显示单格 sticky 能通过。
- 不把它写成回返结论；本轮没有强回返证明。
