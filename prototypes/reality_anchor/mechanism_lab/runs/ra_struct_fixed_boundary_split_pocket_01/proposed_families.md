# 结构族草案：ra_struct_fixed_boundary_split_pocket_01

## fixed_boundary_split_pocket_consumption

结构族名称：
`fixed_boundary_split_pocket_consumption`，中文名建议为“固定 B/S 切割：C+M 尾巴与单格目标袋”。

局部问题：
横向 sticky 二连块跨过固定 B/S 边界后，如果被切成 `C+M`，这个输出是否能被一个只容纳左格的单格目标袋消费？

结构旋钮：

- B/S 边界位置：推后落在两格之间 / 更靠左让两格仍是 sticky / 更靠右让两格都是 crate。
- 目标袋宽度：左格目标开放、右上是墙 / 左右两格都开放。
- 输出对象状态：`C+M` / `MM` / `CC`。
- 玩家后续站位：从下方推左格进袋，测试对象是否仍共享 footprint。

变体谱：

```text
固定边界切出 C+M，单格目标袋通过：
########
#..G#..#
#...MM@#
#......#
#..BS..#
########

未切开 MM，单格目标袋阻断：
########
#..G#..#
#...MM@#
#......#
#.BS...#
########

未切开 MM，双格目标袋通过：
########
#..G...#
#...MM@#
#......#
#.BS...#
########

同形 CC，单格目标袋通过：
########
#..G#..#
#...CC@#
#......#
#....BS#
########
```

共同解释：
这组结构不是“sticky 跨边界会变 crate”的事件 witness。有效变量是：固定边界是否把原本共享 footprint 的横向二连块切成可分配左格加 sticky 尾巴。单格目标袋消费这个输出：可分配左格能进入，未切开的刚体因为右格前方是墙而失败；如果袋口开成双格，未切开的刚体也能通过。

输入条件：

- 有横向 sticky 二连块，或同形的 `CC` 对照。
- 有固定 B/S anchor，边界可放在推后两格之间、两格左侧或两格右侧。
- 玩家先沿横向推动二连块跨边界，再能绕到左格下方。
- 左上是目标，右上可用墙格或空格控制袋口宽度。

输出状态：

- `C+M`: 左格变 crate，右格保留 sticky 尾巴；左格可被单格目标袋消费。
- `MM`: 保持刚体；单格目标袋中 `up` 为 `force_blocked`。
- `MM + 双格袋`: 仍保持刚体，但通过，因为 footprint 前沿完整开放。
- `CC`: 两格本来可分离；单格目标袋也能只消费左格。

自然消费方式：

- 接目标回填：把固定边界切出的左格 crate 放进单格目标袋，sticky 尾巴留作后续债。
- 接刚体墙口：先切开刚体，再把剩余 sticky 尾巴交给墙口或回返结构。
- 接 B/S 绑定债：先把 crate 绑定成 sticky 二连块，再用固定边界切回 `C+M`，形成“绑定 -> 解绑定 -> 目标袋消费”骨架。

常见 shortcut：

- 右上墙格少一格时，未切开的 `MM` 也能整体通过，单格袋口不再消费切割差异。
- 如果资源本来就是 `CC`，目标袋成功不能证明边界切割起作用，只能作为可分离资源对照。
- 如果玩家不能绕到左格下方，结构会退化为边界转换事件，而不是可消费输出。
- 从水平侧继续推 `C+M` 时，crate 和 sticky 仍可能通过 force chain 同步移动；必须用侧向目标袋或类似约束来消费“可分离左格”。

推荐 probe：

- 禁用 `box_sticky_normalize`，确认 `split_tail_single_pocket_pass` 不再切成 `C+M`。
- 把 L 形 sticky 跨固定边界，比较 `C+MM` 与 `CC+M` 在同一目标袋里的尾债差异。
- 把切出的 sticky 尾巴接到刚体墙口回返谱系，验证更长 composition。

组合例句：
`B/S 绑定债 -> 固定边界切割 -> 单格目标袋`：玩家先把两个箱资源合成一个 sticky 横条，再把横条推过固定 B/S 边界切成 `C+M`；目标袋消费左格 crate，sticky 尾巴成为后续债。这里是 recipe 级链条，不是完整关卡设计。

建议 curator 决策：
`promote`。它满足新 lexicon 条目的最低门槛：4 个近邻变体，至少 1 个正例、1 个反例、1 个修正解释的边界 case，并有 runtime-backed consumption probe。它与“B/S 移动边界刷产物”相邻，但不是同一顶层条目：本轮输入接口是 footprint 主动跨固定边界，后续消费面紧贴边界输出；移动边界刷则是 anchor 运动远程改写 footprint。

不应进入 lexicon 的 case：
没有单独剔除的 case；四个 case 都服务于同一结构族。`returnToInitial.status=exhausted` 不进入结论。

证据标签：
`runtime_observed`, `bounded_graph`, `graph_complete`, `consumption_probe`。

证据来源：
`run=ra_struct_fixed_boundary_split_pocket_01`, `cases=split_tail_single_pocket_pass,all_sticky_single_pocket_block,all_sticky_two_cell_pocket_pass,all_box_single_pocket_pass`。
