# Reality Anchor 可组合局部结构词典

本文件由 mechanism curator 从局部实验 run 中整理。它只收录可复用的局部结构族，不收录完整关卡设计，也不收录一阶规则复述。

本次 refresh 后的收录门槛：正式条目必须至少证明“起作用的可能性”，即结构输出被一个极小后续约束消费过。只有事件 witness 或单纯结构差异的材料，保留在 run / refresh 记录中，不作为顶层 lexicon 条目。

当前短索引见 `lexicon_index.md`；下一轮探索缺口见 `backlog.md`。历史 refresh / decision 文件是当时的 curator 快照，不作为当前状态入口。

## 组合矩阵

| 前置结构 | 中间材料或状态 | 后续消费结构 |
| --- | --- | --- |
| `B/S 绑定债` | 二格 sticky 横条 | `固定 B/S 切割`；`刚体黏块 + 墙口`中的口宽、前沿与回返门 |
| `B/S 绑定债` | sticky L 形占角件 | `刚体黏块 + 墙口`中的 L 形凸角把手与前沿门 |
| `B/S 绑定债`中的隔行入场 / 桥格合并 | 分离 sticky 部件 / 桥接端点形成的更大连体块 | `刚体黏块 + 墙口`中的目标口宽与连体形状门 |
| `固定 B/S 切割` | `C+M`：可分离 crate + sticky 尾债 | 同条目的单格目标袋 |
| `固定 B/S 断桥` | 分离 sticky 端点 + crate 桥债 | 同条目的单格端点目标袋；`刚体黏块 + 墙口`反例 |
| `刚体黏块 + 墙口` | 条形 / L 形 / 2x2 黏块的可通过、可回返或失去把手状态 | 同条目的墙口宽、前沿墙齿、凸角把手与 pull 侧墙口 |
| `Pull 侧对象可动性` | pull 后的单箱 / 单格 sticky / 多格 sticky 状态 | 同条目的单格墙口袋、目标格墙与反向把手通路 |
| `B/S 移动边界刷产物` | `CC` / `C+M` / `C+MM` / 2x2 / 双柱 | 同条目的门口、低墙、列间隙与目标口宽 |
| `P/L 长轴墙廊` | 停位容量与 pull 后回返状态 | 同条目的墙廊容量、一次性开关与门闩 |
| `P/L 横向把手` | 首步合法 / 前格阻断 / 半格目标阻断 / 移动后回返门 | 同条目的玩家前格门、锚点占格门与 carried-crate 目标门 |
| `P/L 锚点边界重写` | 旧 L 半格新把手 / 侧边对象改到 push 侧 | 同条目的单格目标袋与侧边 crate relay |
| `P/L pull 抽取把手` | 沿轴抽出 / 占格目标门 / 侧向扫带 | 同条目的 B/S anchor 远程抽出、口袋资源抽取与侧向 crate 扫带 |
| `P/L 边界交接` | 单箱被拉入玩家旧格 | 同条目的目标口袋 |
| `P/L 边界交接` | 箱链只抽近端并留下残余箱链 | `边界活塞本体谱`中的箱链残余债；链端抽取打开单格口 |
| `P/L 边界交接` | sticky 刚体 handoff | `边界活塞本体谱`中的 sticky 形状墙口与回返门 |
| `边界活塞本体谱`中的单箱活塞 | 推入覆盖目标、回撤撤销覆盖 | `单箱目标活塞顺序锁` |
| `P/L L形缺角活塞` | 第一手 push 后立即保留正交 pull 接触面 | `缺角立即侧拉的门位分类`中的玩家前格门、形状目标墙与扫带目标 |
| `P/L L形缺角活塞`中的横向 stroke | stroke 后生成或暴露正交把手 | `stroke 后正交把手`中的凸脚位置、阶段墙与 B/S anchor 扫带 |

证据来源：

- `ra_pilot_wall_motion_01`
- `ra_probe_reverse_force_cell_02`
- `ra_probe_pl_wall_anchor_03`
- `ra_struct_binding_unbinding_01`
- `ra_struct_boundary_pull_01`
- `ra_struct_consumption_01`
- `ra_curator_refresh_01`
- `ra_struct_fixed_boundary_split_pocket_01`
- `ra_struct_sticky_split_pocket_01`
- `ra_struct_bridge_merge_mouth_01`
- `ra_loop_bind_mouth_composition_20260707_01`
- `ra_loop_bind_shape_spectrum_20260707_01`
- `ra_loop_pull_boundary_mobility_20260708_01`
- `ra_loop_pl_piston_20260708_01`
- `ra_loop_pl_l_shape_lateral_handle_20260708_01`
- `ra_loop_pl_l_notch_immediate_pull_20260708_01`
- `ra_loop_pl_l_notch_shape_spectrum_20260708_01`
- `ra_loop_pl_single_crate_goal_piston_lock_20260708_01`

## B/S 绑定债：箱资源生成黏块形状

接口卡片：
- 输入接口：两个以上 crate 可控地跨入 sticky 侧，入场邻接图可做成相邻、L 形或隔行分离。
- 输出接口：sticky 横条、L 形占角件、分离 sticky 部件、宽塞，或桥接既有端点形成更大连体块。
- 最小 consumer：单行走廊和目标口宽消费横条 / 连体块形状，隔行对照证明不是所有 sticky 材料都会合体。

局部结构谱：

```text
二连箱压成横条工具：
#########
#...BS..#
#.......#
#...@MM.#
#.....G.#
#########

三箱晚接入成 L 形占角件：
#########
#...BS..#
#...@M..#
#....MM.#
#.....G.#
#########

隔行压入，保留两个部件：
#########
#...BS..#
#....M..#
#.......#
#...@MG.#
#########

单行走廊内的横条宽塞：
#########
#...BS..#
#########
#...@MMG#
#########
```

共同解释：

这条不是“crate 变 sticky”。它的 designer 接口是：多个可分配箱子被 B/S 边界压成一个刚体连体块形状，designer 得到横条、L 形、独立部件或宽塞材料，同时失去分别摆放这些箱子的自由。

输入条件：

- 至少两个 crate 能跨入 sticky 侧。
- crate 入场时的正交邻接图可控：相邻、晚接入成 L、隔行不接触。
- 玩家有足够站位把 crate 推入边界，或者有等价 driver 让资源跨线。
- 若要立刻起作用，需要一个极小消费约束，例如单行走廊、墙口、回返站位或后续门口。

输出状态：

- 相邻 crate 变成 2 格横条 sticky 工具。
- 第三个 crate 可把横条改成 L 形占角件。
- 隔行入场会得到两个独立 sticky 部件，而不是一个刚体。
- 单行走廊会把横条输出立刻消费成宽塞，只剩左右处理。

结构旋钮：

- crate 邻接图：横向相邻 / L 形 / 隔行。
- 地形余量：开放房间 / 单行走廊 / 是否可绕到侧面。
- 入场节奏：一次压入一排 / 先横条再接第三格。
- 后续消费面：刚体前方、侧边、背侧是否留站位。

变体谱：

- `bind_bar_open`：输出 2 格横条；开放房间里四向动作都可用，回返 depth 12。
- `bind_l_corner`：第三箱接入后输出 L 形；最终 `up:force_blocked`，回返 depth 13。
- `bind_gap_keeps_parts`：同在 sticky 侧但隔行，输出两个独立 sticky 部件；这是“材质转换不等于绑定”的边界。
- `bind_bar_choke`：同样 2 格横条进入单行走廊，最终只剩 `left/right`，回返搜索 complete 为 no；这是本条的 consumption probe。

自然消费方式：

- 接到“刚体黏块 + 墙口回返谱系”：用横条、长条或 L 形去测试回返站位格。
- 接到门口或目标口：横条可作门闩，L 形可作占角件。
- 接到 B/S 解绑定或移动边界刷子：先生成刚体债，再切回可分配资源。

常见 shortcut：

- 空间太宽时，绑定只是在开放房间里制造工具，不形成压力。
- crate 隔行入场会保留多个部件，玩家可能绕过“必须合体”的意图。
- 如果后续墙口不消费占格形状差异，玩家只会看到事件 witness。

审美风险：

只展示箱子变黏块会像教学事件。它成为玩家洞见的时刻，是玩家意识到“我需要主动把资源压成某个占格形状，才能满足后续墙口或门口的输入要求”。

consumption probe：

`bind_bar_choke` 把同样的横条输出放入单行走廊，动作集合从开放房间的四向可用收窄到左右处理，并且局部回返搜索 complete 为 no。

桥格合并目标口补充：

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

这组补充把 “crate 邻接图” 旋钮扩到既有 sticky 端点：crate 跨 B/S 边界后变成桥格，若正交邻接到端点，会合并成二格或三格 sticky 连体块。目标口宽消费的是连接形状，而不是 sticky 材质本身；无端点时单格 sticky 可进同一目标口，打开三格口宽后桥接出的三格刚体也可整体推进。一个端点的反例修正了“只是三格太长”的解释，说明单格口拒绝的是任何越出口宽的 connected 连体块形状。

归属边界：

`ra_loop_bind_mouth_composition_20260707_01` 与 `ra_loop_bind_shape_spectrum_20260707_01` 不作为 B/S 边界证据。两组 run 中，B/S 只负责把 crate 变成 sticky 材料；关键观察点发生在后续右推 sticky 刚体进墙口时，此时差异来自 `sticky rigid movement + wall mouth`，不是来自 B/S 边界位置或跨线时机。它们应归入“刚体黏块 + 墙口”的对象行为 / consumer 谱。

推荐 probe：

继续 B/S 绑定债时，关键观察点必须仍由 B/S 边界造成差异：例如同一局部需求下，跨线顺序导致粘 / 不粘，边界位置导致 C/M 身份不同，或可移动边界刷出不同产物。不要把“先把所有对象送到 sticky side，再研究 sticky 行为”的 run 写成 B/S 边界语料。

组合例句：

`绑定债 -> 刚体墙口回返谱系`：玩家先把 crate 绑定成目标占格形状，再让墙口消费这个形状；少绑一个或绑成 L 形会在同一墙口给出不同回返 / 把手结果。

证据：

`run=ra_struct_binding_unbinding_01`, `cases=bind_bar_open,bind_l_corner,bind_gap_keeps_parts,bind_bar_choke`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

`run=ra_struct_bridge_merge_mouth_01`, `cases=bridge_merge_single_mouth_block,no_endpoints_single_mouth_pass,bridge_merge_triple_mouth_pass,bridge_merge_upper_only_single_mouth_block`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 固定 B/S 切割：C+M 尾巴与单格目标袋

接口卡片：
- 输入接口：横向二格 sticky 资源，固定 B/S 边界能切在两格之间，玩家能绕到左格下方。
- 输出接口：`C+M`：左格 crate 可分离，右格 sticky tail 留债。
- 最小 consumer：单格目标袋消费可分离左格；双格袋口对照说明宽口会让未切开的 `MM` 也通过。

局部结构谱：

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

固定 B/S 边界可以把一个横向 sticky 二连块切成 `C+M`：左格变成可分配 crate，右格保留 sticky 尾巴。这个结构不是“sticky 变 crate”的事件 witness；它的接口是把一个共享连体块形状解成“可单独上推的左格 + 留在旁边的尾债”。单格目标袋消费这个输出：`C+M` 和 `CC` 能只把左格推进目标，未切开的 `MM` 会因为右上墙格而 `force_blocked`。把右上墙格打开成双格袋口后，未切开的 `MM` 也能整体通过。

输入条件：

- 一个横向二连资源，通常来自 B/S 绑定债生成的 sticky 横条，也可以用 `CC` 作可分离对照。
- 固定 B/S anchor 的边界能放在推后两格之间，或作为反例放在两格左侧 / 右侧。
- 玩家能先横推二连块跨边界，再绕到左格下方。
- 左上是目标袋，右上墙格控制袋口是否只容纳一格。

输出状态：

- `C+M`：左格 crate 可被目标袋消费，右格 sticky 留作尾债。
- `MM`：仍是横向刚体，单格袋口失败，双格袋口通过。
- `CC`：本来可分离，单格袋口通过，但不能证明边界切割本身。

结构旋钮：

- B/S 边界位置：切在两格之间 / 两格都在 sticky side / 两格都在 box side。
- 袋口宽度：单格 / 双格。
- 后续施力方向：从下方推左格，而不是从水平侧继续形成 force chain。
- 资源来源：先绑定成 sticky 横条，或直接给 `CC` 作对照。

变体谱：

- `split_tail_single_pocket_pass`：第一步产生 `sticky_to_box:n1`，输出 `C+M`；后续 `up` 合法，crate 覆盖目标。
- `all_sticky_single_pocket_block`：同一动作串到最后 `up:force_blocked`，因为 `MM` 的右格前方是墙。
- `all_sticky_two_cell_pocket_pass`：打开右上格后，`MM` 整体上推并覆盖目标。
- `all_box_single_pocket_pass`：`CC` 也能只推左格，说明目标袋消费的是“可分离左格”，不是材质名。

自然消费方式：

- 接 B/S 绑定债：先把箱资源压成 sticky 横条，再用固定边界切割出可分配左格。
- 接目标回填：左格 crate 覆盖目标，sticky 尾巴保留为后续债。
- 接刚体墙口：把尾巴或未切开的反例交给墙口，形成形状/资源的二段消费。

常见 shortcut：

- 右上墙少一格时，未切开的 `MM` 也能通过，切割差异消失。
- 玩家如果不能绕到左格下方，只会看到 `sticky_to_box` 事件，不能消费输出。
- 从水平侧继续推 `C+M` 时，crate 和 sticky 可能通过 force chain 同步移动，削弱“可分离左格”的差异。
- 直接给 `CC` 的成功只是对照，不应写成固定边界切割的证据。

审美风险：

如果只展示跨边界变成 `C+M`，它仍像规则展示。它成为玩家洞见的时刻，是玩家需要主动把刚体送过固定边界，让单格目标袋拿到可分离左格，同时接受 sticky 尾巴作为后续债。

consumption probe：

`split_tail_single_pocket_pass` 对比 `all_sticky_single_pocket_block` 证明单格目标袋消费了 `C+M` 与 `MM` 的差异；`all_sticky_two_cell_pocket_pass` 修正解释，说明不是 sticky 不能进袋，而是单格袋口拒绝完整连体块形状；`all_box_single_pocket_pass` 说明可分离资源同样通过，隔离出“可分离左格”这个输出接口。

推荐 probe：

禁用 `box_sticky_normalize` 验证切割消失；扩展 L 形与三格横条，比较 `C+MM`、`CC+M`、`MMM` 在同一目标袋的尾债谱；再把 sticky 尾巴接到刚体墙口回返谱系，做 composition probe。

组合例句：

`绑定债 -> 固定边界切割 -> 单格目标袋`：玩家先生成 sticky 横条，再把它推过固定 B/S 边界切成 `C+M`；目标袋消费左格 crate，右侧 sticky 尾巴成为下一段结构的输入。

证据：

`run=ra_struct_fixed_boundary_split_pocket_01`, `cases=split_tail_single_pocket_pass,all_sticky_single_pocket_block,all_sticky_two_cell_pocket_pass,all_box_single_pocket_pass`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 固定 B/S 断桥：sticky split 端点目标袋

接口卡片：
- 输入接口：C 形 sticky 连体块，固定 B/S 边界能切过连接桥，玩家能绕到端点下方。
- 输出接口：上 / 下 sticky 端点独立，左柱 crate 桥债保留；未切断 C 形是错误连体块。
- 最小 consumer：上端点单格目标袋消费端点独立性；站位关闭和预分离端点作为错例 / 边界修正。

局部结构谱：

```text
C 形被切断，上端点进目标：
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#..BS..#
########

C 形未切断，同动作被整体连体块形状阻断：
########
###.G..#
###.MM@#
#...M..#
#...MM.#
#.BS...#
########

切断成功，但站位通路关闭：
########
###.G..#
###.MM@#
#...M#.#
#...MM.#
#..BS..#
########

端点预先分离，表现类似切断输出：
########
###.G..#
###.MM@#
#......#
#...MM.#
#..BS..#
########
```

共同解释：

固定 B/S 边界可以把一个 C 形 sticky 刚体切断成“左侧 crate 桥 + 右侧两个独立 sticky 端点”。这不是单纯的 `sticky_split` 事件见证；它的可组合接口是端点独立性。上方单格目标袋消费这个接口：切断后或预先分离时，上端点可单独进目标；未切断时，C 形仍共享连体块形状，同一上推动作会被整体形状和玩家站位冲突阻断。

输入条件：

- 一个 C 形 sticky 连体块：上端点、左柱桥、下端点正交连接。
- 固定 B/S anchor 的边界能切过左柱，推后左柱落在 box side，右侧端点留在 sticky side。
- 玩家先从右侧横推 C 形，再绕到上端点下方。
- 上方目标袋只需要单格 sticky，并可用墙格控制下方站位是否可达。

输出状态：

- `sticky_split:n1`：一个原 sticky 来源被分成两个 sticky 组件。
- `sticky_to_box:n3`：左柱变成 crate 桥，成为后续债。
- 上端点成为可单独推动的 sticky 组件，可覆盖目标。
- 未切断时仍是一个 C 形刚体，端点目标袋不能单独消费。

结构旋钮：

- 边界位置：切过左柱 / 保持整体 sticky。
- 连接桥是否存在：C 形连接 / 端点预先分离。
- 站位门：上端点下方通路开放 / 关闭。
- 消费口：单格目标袋是否只消费上端点。

变体谱：

- `split_cshape_upper_pocket_pass`：第一推产生 `sticky_to_box:n3, sticky_split:n1`；后续 `up` 合法，上端点覆盖目标。
- `unsplit_cshape_upper_pocket_block`：保持 C 形刚体；同站位 `up:force_blocked_by_player`。
- `split_cshape_no_stand_block`：切断成功，但下行站位门关闭，消费链停在 `destination_blocked`。
- `pre_split_endpoints_upper_pocket_pass`：端点本来分离，上端点目标袋通过；这是“端点独立性”而非事件名的边界。

自然消费方式：

- 接目标回填：上端点进目标，下端点和 crate 桥保留为后续债。
- 接双端点分配：上下端点分别进入两个消费口。
- 接刚体墙口：未切断 C 形作为错误形状反例，切断端点作为小连体块输入。
- 接固定 B/S 切割谱：从二连 `C+M` 扩展到多组件 split。

常见 shortcut：

- 没有下方站位时，切断只停在事件 witness，目标袋无法消费。
- 如果 C 形一开始就断开，成功只能说明端点独立可用，不证明边界切断必要。
- 如果目标袋放宽到能容纳整个连体块形状，未切断反例会弱化。
- 左侧 crate 桥如果没有后续约束，玩家可能只记住“端点进目标”，忽略切断债务。

审美风险：

这个结构容易被误写成“B/S 会 split”。它成为玩家洞见的时刻，是玩家主动把连接形状推过边界，制造可分配端点，同时接受 crate 桥债。

consumption probe：

`split_cshape_upper_pocket_pass` 对比 `unsplit_cshape_upper_pocket_block` 证明目标袋消费了端点是否独立；`split_cshape_no_stand_block` 说明 `sticky_split` 需要站位才能起作用；`pre_split_endpoints_upper_pocket_pass` 说明真正被消费的是端点独立性，而不是事件名。

推荐 probe：

禁用 `box_sticky_normalize` 验证 split 消失；增加下端点目标袋，测试上下端点分配；把左柱 crate 桥接入单格通道或墙口，验证 crate 桥债能否成为第二段消费。

组合例句：

`绑定债 -> 固定边界断桥 -> 端点目标袋`：玩家先生成连接形状，再把它推过固定 B/S 边界断开；上端点被目标袋消费，crate 桥或下端点成为后续输入。

证据：

`run=ra_struct_sticky_split_pocket_01`, `cases=split_cshape_upper_pocket_pass,unsplit_cshape_upper_pocket_block,split_cshape_no_stand_block,pre_split_endpoints_upper_pocket_pass`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 刚体黏块 + 墙口：反向施力格谱系

接口卡片：
- 输入接口：2 格条、3 格条、4 格条、2x2 或 L 形 sticky 连体块被送到墙口、窄口或把手附近。
- 输出接口：通过 / 被前沿拒绝 / 推进后可回返 / 推进后失去反向把手的局部状态。
- 最小 consumer：墙口宽度、前沿墙齿和反向施力格消费连体块形状。

局部结构谱：

```text
3 格条，窄口：
#######
#@MMM.#
#.....#
#######

3 格条，加宽一格：
########
#@MMM..#
#......#
########

4 格条，同一口宽：
########
#@MMMM.#
#......#
########

L 形，把手开放 / 堵住：
######
#@MM.#
#.M..#
#....#
######

######
#@MM.#
#.M.##
#....#
######
```

共同解释：

同一次刚体推进是否能回返，不由“黏块能不能被推”决定，也不只由玩家能否绕到附近决定。关键是推进后是否存在可达的反向施力站位格，并且整块反推目标格开放。直条通常看端点外侧余量，2x2 在本轮证据中单个右侧施力位即可整块反推，L 形可能通过侧向凸出格提供把手。

输入条件：

- 已经有某种 sticky 刚体形状：2 格条、3 格条、4 格条、2x2 或 L 形。
- 该连体块形状被送到墙口、单列通道、窄口或把手附近。
- 玩家有一次推进动作，推进后是否能站到反向施力格由地形决定。

输出状态：

- 可回返：存在可达反向施力站位格，回返搜索 found。
- 不可回返：局部图 complete 且无回初始路径，或反向动作被 `force_blocked`。
- 形状改变后，同一墙口从可回返变不可回返，或反过来。

结构旋钮：

- 直条长度与墙口余量的差值。
- 是否给端点外侧留站位格。
- 是否给 2x2 留整面反向施力空间。
- L 形凸出格的侧向把手是否被墙堵住。

变体谱：

- 2 格条单排走廊：推进后不可回返；可绕行房间中可回返。
- 3 格条窄口：右推后不可回返；加宽一格后可回返。
- 4 格条放入“刚好救 3 格条”的口：再次不可回返；再加宽一格后可回返。
- 2x2 窄口：玩家能在附近移动，但没有整面反向施力格；加宽后可回返。
- L 形把手开放：顶端无右侧站位仍可借凸出格回推；堵住凸出格把手后不可回返。

自然消费方式：

- 消费 B/S 绑定债输出的横条、长条或 L 形。
- 作为“错误形状可见失败”的墙口检查器。
- 接目标回填或通道封锁：正确占格形状通过，错误占格形状失去回返或把手。

常见 shortcut：

- 墙口太宽会让所有长度都可回返。
- 只让玩家绕到附近不等于有反向施力格；2x2 窄口是反例。
- L 形如果侧把手开放，可能绕过“长条不可回返”的预期。

审美风险：

如果玩家只是在推一个已经给好的块，它可能只是移动性知识点；如果前置结构要求玩家主动生成特定占格形状，它会变成“形状构造 -> 地形消费”的洞见。

consumption probe：

`sticky3_narrow_mouth_push_right` 对比 `sticky3_wide_mouth_push_right`、`sticky4_wide_for_3_not_4_push_right` 对比 `sticky4_extra_wide_push_right`、`lshape_handle_open` 对比 `lshape_handle_blocked_by_wall` 都证明墙格 / 把手约束实际消费了占格形状。

前沿墙齿目标口补充：

```text
双格 sticky + 上沿墙齿，目标口被拒绝：
#######
###M# #
##@MG #
#BS#  #
#######

同形两个 crate，下格可单独进目标：
#######
###C# #
##@CG #
### BS#
#######

双格 sticky + 双格开口，整体可进目标：
#######
###M  #
##@MG #
#BS#  #
#######

单格 sticky + 上沿墙齿，单格可进目标：
#######
####  #
##@MG #
#BS#  #
#######
```

这组补充把墙口消费从“推进后能否回返”扩到“推进前沿是否完整开放”。双格 sticky 是一个刚体二格条，推动下格时上格目标位也必须开放；两个 crate 或单格 sticky 没有这个连带目标位，因此能进入同一目标口。常见误用边界是：上沿墙齿少一格时双格 sticky 也能通过；对象没有 merge 时下格可以独立通过。

黏块前沿形状谱补充（B/S 仅材料来源）：

机制角色：
- active_rule：`sticky rigid movement` 与墙口前沿检查。
- material_source：B/S 在 run 中只负责把 crate 转成 sticky 材料，让 runtime 合法地产生黏块形状。
- consumer：右侧墙口 / 目标口消费连体块前沿。
- incidental：所有相关对象都进入 sticky side 后，B/S 边界不再参与关键观察点。
- 关键观察点：最后一次右推 sticky 连体块进墙口，结果为 `force_blocked` 或 pass。

`ra_loop_bind_mouth_composition_20260707_01` 先给出竖向二连的窄口对照；`ra_loop_bind_shape_spectrum_20260707_01` 将它补成同一对象行为谱。1 格基线可过；2 格竖条被单格口拒绝、两格口通过；3 格竖条被两格口拒绝、三格口通过；L 形缺前凸角口被拒绝、补前凸角口通过；分离部件不背负上方前沿债。这些结果说明 sticky 刚体进墙口时看整块前沿，不说明 B/S 边界本身在关键观察点发挥作用。

前沿通过后的形状把手回位门补充：

```text
竖向二连，前沿可过，后方侧廊开放：
###########
#G#########
###M..#####
##@M..#####
##....#####
#BS########
###########

同形，侧廊短一格：
###########
#G#########
###M..#####
##@M..#####
##...######
#BS########
###########

侧廊存在，但实际反向施力格为墙：
###########
#G#########
###M.######
##@M.######
##....#####
#BS########
###########

3 格 L 形缺右上角，凸角右侧把手开放 / 堵住：
############
#G##########
###M.#######
##@MM..#####
##.....#####
#BS#########
############

############
#G##########
###M.#######
##@MM.######
##....######
#BS#########
############

3 格 L 形另外三种旋转：
############
#G##########
####M.######
##@MM..#####
##.....#####
#BS#########
############

############
#G##########
###MM.######
##@M..######
##....######
#BS#########
############

#############
#G###########
##@MM.#######
##..M..######
##.....######
#BS##########
#############

2x2，右侧下格施力位开放 / 堵住：
############
#G##########
###MM.######
##@MM..#####
##.....#####
#BS#########
############

############
#G##########
###MM.######
##@MM.######
##....######
#BS#########
############
```

机制角色：
- active_rule：sticky 刚体移动后的反向施力站位检查，以及墙 / 侧廊 / 凸角把手 consumer 对玩家可达性的限制。
- material_source：B/S anchor 只让预置 `M` 合法保持 sticky，不参与关键观察点。
- consumer：右侧前沿口之后的一格外侧侧廊、竖条右侧施力格、L 形凸角右侧把手、2x2 右侧施力位、封闭绕行的墙。
- incidental：孤立目标只满足 parser；目标覆盖不是本补充的关键观察点。
- 关键观察点：首步右推都 legal，差异发生在推进后玩家能否到达连体块右侧某个实际施力格并消费它做反向 push。

这组补充把“墙口消费连体块前沿”继续拆出第二层：前沿完整开放仍不保证可回返，后方路径必须连到一个实际反向施力格。竖向二连中，`side_door_open_return_found` 可回初始，`side_door_closed_no_return` 只短一格侧廊就变成 complete no；`stance_cells_walled_side_door_insufficient` 证明走到附近不够，施力格本身为墙时最终 `right:force_blocked`。

3 格 L 形四种旋转确实不同。缺右上角、缺左上角、缺右下角都能用下侧路径接到右侧把手，堵住对应把手后 complete no；其中缺左上角最终 `up:destination_blocked`，缺右下角回返更短。缺左下角必须从上格驱动，除右侧把手外还需要给玩家回到左上驱动位的下方回路；修正回路后 open 为 `found depth=13`，blocked 为 complete no。这说明 L 形的“把手格位置”和“driver 回位路径”都应写成旋钮，而不能只写一个 L 形正例。

2x2 中，`square2_side_face_open_return` 显示单个右侧下格施力位已足以整块反推，`square2_side_face_blocked_no_return` 只堵这个施力位即 complete no；因此“2x2 必须整面外侧余量”应收窄为“至少一个可达施力格 + 整块反推目标格开放”。`explicit_handle_consumption_probe`、`lshape_corner_explicit_handle_consumption`、`square2_explicit_face_consumption` 分别显式消费对应把手。常见 shortcut 是上方或右侧空间过宽时玩家可从其他绕行口到达把手格，`wide_side_loop_shortcut` 和 `lshape_overwide_corner_shortcut` 只作为误用边界。

推荐 probe：

已补 sticky 1/2/3 格、L 形和分离部件接入前沿墙齿，也已补竖向二连、3 格 L 四旋转和 2x2 在前沿可过后的把手回位门。下一步若继续本条，应换变量：把反向施力格从墙换成 crate / sticky 尾债，比较 `force_blocked`、可推走、merge 或资源移交；不要再单独枚举同一口宽规则的镜像形状。另可把移动边界刷子产出的 `CC`、`C+M`、`C+MM`、竖向 sticky pair 接入同一前沿墙齿目标口，但必须标明移动边界只是 material_source 还是 active_rule。

组合例句：

`绑定债 -> 3 格横条 -> 窄口吞掉回返站位`：玩家需要主动多绑定一个箱子，让输出从 2 格条变成 3 格条，才能让墙口产生不可回返承诺。

证据：

`run=ra_pilot_wall_motion_01,ra_probe_reverse_force_cell_02,ra_struct_rigid_tooth_consume_01`, `cases=sticky2_single_lane_push,sticky2_loop_room_push,sticky3_narrow_mouth_push_right,sticky3_wide_mouth_push_right,sticky4_wide_for_3_not_4_push_right,sticky4_extra_wide_push_right,square2_narrow_push_right,square2_wide_push_right,lshape_handle_open,lshape_handle_blocked_by_wall,rigid_pair_tooth_block,crate_pair_tooth_lower_pass,rigid_pair_open_mouth_pass,single_sticky_tooth_pass`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_bind_mouth_composition_20260707_01`, `cases=bs_pair_tooth_connected_block,bs_single_tooth_lower_pass,bs_pair_open_two_cell_mouth_pass,bs_gap_parts_tooth_shortcut`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_bind_shape_spectrum_20260707_01`, `cases=bs_shape_two_bar_single_mouth_block,bs_shape_two_bar_two_mouth_pass,bs_shape_three_bar_two_mouth_block,bs_shape_three_bar_three_mouth_pass,bs_shape_l_notch_block,bs_shape_l_notch_pass,bs_shape_separated_lower_shortcut_pass`, `tags=runtime_observed,bounded_graph,consumption_probe`

`run=ra_loop_sticky_handle_return_20260707_01`, `cases=side_door_open_return_found,side_door_closed_no_return,stance_cells_walled_side_door_insufficient,explicit_handle_consumption_probe,wide_side_loop_shortcut,lshape_corner_handle_open_return,lshape_corner_handle_blocked_no_return,lshape_corner_explicit_handle_consumption,lshape_overwide_corner_shortcut,lshape_missing_top_left_open_return,lshape_missing_top_left_blocked_no_return,lshape_missing_bottom_right_open_return,lshape_missing_bottom_right_blocked_no_return,lshape_missing_bottom_left_open_return,lshape_missing_bottom_left_blocked_no_return,square2_side_face_open_return,square2_side_face_blocked_no_return,square2_explicit_face_consumption`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## Pull 侧对象可动性：单箱基线与刚体墙口

接口卡片：
- 输入接口：玩家处于 pull side，前格可控，身后一格放单箱、单格 sticky、条形 / L 形 / 2x2 sticky。
- 输出接口：单箱被拉入玩家旧格；多格 sticky 整体平移、被目标格墙拒绝，或拉过口后留下不同回返把手状态。
- 最小 consumer：单格墙口袋消费单箱 pull 后站位；目标格墙和把手通路消费多格 sticky 拉动后的状态。

局部结构谱：

```text
单箱合法 pull，crate 进入玩家旧格：
#########
#PL....G#
#..C@...#
#.......#
#########

单箱前格墙，pull 不发生：
#########
#PL....G#
#..C@#..#
#.......#
#########

单箱前格物体，前格门以 pull_world_front_blocked 关闭：
#########
#......G#
#..C@LP.#
#.......#
#########

单箱墙口袋，pull 合法但 pull 后 complete no：
########
#PL###G#
###C@.##
########

单格 sticky clear pull，作为单格材料 control：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.....#
##########

2 格竖条，玩家前格开放但下侧目标格是墙，pull 被连体块目标格拒绝：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M#..#
#..#.....#
##########

同形打开下侧目标格，整条可被 pull 通过：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
#..#.....#
##########

L 形，下凸远端脚目标格撞墙：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM#.#
#..#.....#
##########

同形打开凸齿，首步可通过但封闭 patch 中不自动回返：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.MM..#
#..#.....#
##########

2 格竖条，拉过口后上侧环路开放，可绕回把手：
##########
#PL#....G#
#BS#.....#
#..#.M@..#
#..#.M...#
##########

同形上侧环路被墙带关闭，先 pull 通过但 complete no：
##########
#PL#....G#
#BS#####.#
#..#.M@..#
#..#.M...#
##########

3 格竖条，中段目标格为墙 / 三格目标口打开：
###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M#...#
#..#.M....#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.M@...#
#..#.M....#
#..#.M....#
#..#......#
###########

2x2，右下目标格为墙 / 打开：
###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM#..#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.MM@..#
#..#.MM...#
#..#......#
###########

上钩 L，远端目标格为墙 / 打开：
###########
#PL#.....G#
#BS#......#
#..#.MM#..#
#..#.M@...#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#.MM...#
#..#.M@...#
#..#......#
###########

3 格横条沿轴 clear / 前格墙：
###########
#PL#.....G#
#BS#......#
#..#MMM@..#
#..#......#
###########

###########
#PL#.....G#
#BS#......#
#..#MMM@#.#
#..#......#
###########

post-mouth 把手占用：box-side crate / sticky blocker：
##########
#PL#....G#
#B.#..C..#
#S.#.M@..#
#..#.M...#
##########

##########
#PL#....G#
#BS#..M..#
#..#.M@..#
#..#.M...#
##########
```

共同解释：

pull 侧对象可动性先由玩家前格决定，再由被拉对象的占格形状决定。单箱的目标格就是玩家腾出的当前格，所以无法独立制造“箱目标格被墙挡”的 `force_blocked`；前格墙会先 `destination_blocked`，前格物体会先 `pull_world_front_blocked`。多格 sticky 则不同：玩家前格开放后，非接触 sticky 格仍有自己的目标格，任一目标格撞墙会让整步 `force_blocked`。拉过墙口后，直接反向输入通常被对象占住玩家前格而关闭，是否能回返取决于能不能绕到实际反向把手格。

机制角色：

- active_rule：`pull_force`、玩家前格门、单箱目标格等于玩家旧格、多格 sticky 刚体的整体目标格检查、pull 后把手占用物的资源形态差异。
- material_source：crate 是单箱基线；B/S anchor 只让预置 `M` 合法保持 sticky，不参与关键观察点；crate blocker case 中竖向 B/S 只用于让 blocker 保持 box-side crate；P/L 只提供 pull side。
- consumer：前格墙、前格物体、单格墙口袋、sticky 非接触目标墙、L 形凸齿墙、拉过口后的反向把手通路、box-side crate / sticky blocker。
- incidental：孤立目标只满足 parser；可达图中的 anchor 移动事件不参与本条关键观察点。

结构旋钮：

- 玩家前格：空 / 墙 / 物体。
- 玩家身后对象：无对象 / 单箱 / 单格 sticky / 多格 sticky。
- 连体块形状：单格、2 格竖条、3 格竖条、3 格横条、2x2、下凸 L、上钩 L。
- pull 方向：侧拉 / 沿轴拉。
- 非接触目标格：开口 / 墙 / 凸齿缺口 / 2x2 右下目标格 / 3 格竖条中段目标格。
- pull 后空间：开放绕行 / 单格口袋 / 反向把手通路开放 / 反向把手通路被墙、crate 或 sticky 占用。
- pull 后所处侧：仍在 pull 侧 / 跨到 push 侧作为回推 shortcut。

可观测事实：

- `pull_open_stays_pull_side`：合法 pull 触发 `pull_object:crate#1`，最终反向 `left` 为 `pull_world_front_blocked`，但开放地形可绕回。
- `pull_front_wall_block`：同样身后有 crate，但前格墙让动作在对象移动前 `destination_blocked`。
- `pull_front_anchor_blocks_target_vacate`：前格为物体时 `pull_world_front_blocked`；这是单箱无法腾出目标格的可观察形式。
- `pull_single_cell_pocket_no_return`：pull 合法，最终四向全 illegal，完整图 `complete no`。
- `single_sticky_pull_clear` 与 `single_crate_pull_clear`：单格 sticky 和 crate 在 clear pull 下动作集合同构，sticky 只多 `move_sticky_rigid`。
- `bar_side_pull_target_wall_blocked` / `bar_side_pull_open_mouth`：2 格竖条只差下侧目标格，结果从 `force_blocked` 变成 legal pull。
- `l_corner_pull_tooth_blocked` / `l_corner_pull_notch_open`：L 形远端脚目标格是独立旋钮。
- `bar_pull_after_handle_open` / `bar_pull_after_handle_closed`：同样先 pull 通过，反向把手通路开闭决定 found return 或 complete no。
- `bar3_side_pull_mid_wall_blocked` / `bar3_side_pull_open_mouth`：3 格竖条把同一目标口规则扩展到中段目标格；开口后 return found depth 9。
- `square2_side_pull_lower_wall_blocked` / `square2_side_pull_open_mouth`：2x2 右下目标墙足以 `force_blocked`，打开后 return found depth 11。
- `l_upper_hook_pull_tooth_blocked` / `l_upper_hook_pull_notch_open`：上钩 L 与下凸 L 一样有远端目标格旋钮；开口后首步 legal，但封闭 patch 中 complete no。
- `hbar3_axis_pull_clear` / `hbar3_axis_pull_front_wall_blocked`：3 格横条沿轴 pull 没有侧向目标格门；失败墙是玩家前格 `destination_blocked`，clear 变体 complete no。
- `bar2_post_pull_handle_crate_blocker` / `bar2_post_pull_handle_sticky_blocker`：box-side crate blocker 可被转换/搬运，return found depth 15；sticky blocker merge 成三格 sticky，complete no。

输入 / 输出接口：

- 输入：玩家处于 pull side，方向前格可被地形或物体控制，身后一格可放单箱或 sticky 连体块。
- 输出：单箱被抽入玩家旧格；sticky 连体块整体平移或因任一目标格撞墙保持原状；pull 后局部状态可能变成可回返、complete no、或需要绕到另一侧把手。
- 自然消费：单格墙口袋消费单箱 pull 后站位；墙齿 / 口宽消费 sticky 连体块；墙带或资源占用物消费反向把手通路；push side 回推可作为单箱 pull 的 shortcut / 回返边界。

设计价值：

这条给后续结构一个基础接口表：什么时候 pull 只是前格门，什么时候开始变成占格门，什么时候拉过以后还需要把手回路。它适合作为 P/L 边界交接、B/S sticky 材料、目标口袋和墙口回返谱系的输入侧，而不是完整关卡骨架。

误用边界：

- 单箱 pull 不证明多格对象目标门；那需要多格对象。
- 单格 sticky 只证明 material control，不能代表 sticky 组墙口。
- 沿轴横条不能替代侧拉对象目标格谱；它的墙反例通常先落在玩家前格门。
- box-side crate blocker 不能和 sticky blocker 合并解释：crate 可转化 / 搬运后回返，sticky blocker 会 merge 成更大刚体并关闭回返。
- `returnToInitial.status=not_applicable` 来自非法 replay，不是不可回返证明。
- 开放大房间会绕回，不能用来证明 pull 后承诺点。
- 本条现在覆盖了单箱基线、单格 sticky control、2/3 格竖条、3 格横条沿轴、2x2、两个 L 方向、墙 / crate / sticky 把手占用；未把这些扩展写成 backlog 债务。

组合例句：

`单箱 pull -> 单格口袋 complete no`：玩家能把箱拉进旧站位，但自己被放进墙口袋，墙消费所有出口。

`sticky 2 格条 -> pull 侧墙口`：玩家前格开放不足以保证动作成立，非接触格目标墙会把整条刚体二格条拒绝。

`post-mouth sticky blocker -> merge lock`：拉过口后的把手通路如果被 sticky 尾债占住，首步会 merge 成更大刚体，回返从 open case 的 found 变成 complete no。

证据：

`run=ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility`, `cases=pull_open_crosses_to_push_undo,pull_open_stays_pull_side,pull_front_wall_block,pull_front_anchor_blocks_target_vacate,pull_no_rear_crate_walk,pull_single_cell_pocket_no_return`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_mobility`, `cases=single_crate_pull_clear,single_sticky_pull_clear,bar_side_pull_target_wall_blocked,bar_side_pull_open_mouth,l_corner_pull_tooth_blocked,l_corner_pull_notch_open,bar_pull_after_handle_open,bar_pull_after_handle_closed`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum`, `cases=bar3_side_pull_mid_wall_blocked,bar3_side_pull_open_mouth,square2_side_pull_lower_wall_blocked,square2_side_pull_open_mouth,l_upper_hook_pull_tooth_blocked,l_upper_hook_pull_notch_open,hbar3_axis_pull_clear,hbar3_axis_pull_front_wall_blocked,bar2_post_pull_handle_open_control,bar2_post_pull_handle_crate_blocker,bar2_post_pull_handle_sticky_blocker`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## B/S 移动边界刷产物：远程生成与门口消费

接口卡片：
- 输入接口：可移动 B/S anchor，边界线能扫过远处横条、竖条、L 形、2x2 或双柱资源。
- 输出接口：`CC`、`C+M`、`C+MM`、2x2 sticky、双柱 sticky 等可送入同一门口的产物。
- 最小 consumer：门口、低墙和列间隙消费不同刷产物，区分可推进、尾债、连体块封门或分柱推进。

局部结构谱：

```text
边界下刷，横条释放为 CC：
##########
#.......G#
#.@......#
#.B..CC..#
#.S......#
#........#
##########

边界下刷，L 形留 C+MM：
##########
#.......G#
#.@......#
#.B..C...#
#.S..MM..#
#........#
##########

边界上刷，绑定成 2x2：
##########
#.......G#
#.B......#
#.S..MM..#
#.@..MM..#
#........#
##########

同一产物进入门口：
##########
#.@.....G#
#.B......#
#.S..M...#
#....MM..#
#........#
##########
```

共同解释：

移动的是 B/S 边界线，不是远处对象。边界跨过远处占格区域时，远处资源被改写成 `CC`、`C+M`、`C+MM`、2x2 sticky 或双柱 sticky；这些产物进入同一个门口后，会被消费成箱链推进、单箱进门加尾债、占格门封锁或分柱推进。

输入条件：

- 有一个可移动 B/S anchor，边界能相对远处占格形状跨线。
- 远处占格形状可以是横条、竖条、L 形、两行对齐或两行隔列。
- driver 可以是 push、pull 或力链搬运；除非 driver 造成新的站位门，否则只是输入侧旋钮。
- 若要正式起作用，需要一个门口、低墙、目标口或通道消费刷产物。

输出状态：

- 下刷可把 sticky 横条回收为 `CC`。
- 下刷可切出 `C+M` 或 `C+MM`，形成单箱资源加尾债。
- 上刷可把 crate 行绑定到 sticky 行，形成 2x2 或两个分柱。
- 门口消费后，产物表现为箱链、尾债、占格门或分批工具。

结构旋钮：

- 边界运动方向：跨线刷 / 沿边界平移。
- 被扫占格形状：横条 / 竖条 / L 形 / 2x2 候选 / 双柱。
- 门口消费面：开放口 / 低墙占格门 / 列间隙。
- driver 侧：push B/S、P/L pull B/S、stroke 调位。

变体谱：

- `brush_down_bar_full_release`：输出 `CC`。
- `brush_down_vertical_partial`：输出 `C+M`。
- `brush_down_l_tail`：输出 `C+MM`。
- `brush_parallel_preserve_bar`：沿边界平移，保留 sticky 债。
- `brush_up_bind_square`：输出 2x2 sticky。
- `brush_up_gap_keeps_columns`：输出两个柱状 sticky 工具。
- `door_cc_chain_push`：`CC` 在门口成为箱链推进。
- `door_cm_tail_push` / `door_cmm_tail_push`：单箱进入门口，留下不同尾债。
- `door_square_blocked_by_low_wall`：2x2 被低墙占格门封住。
- `door_split_columns_one_column_passes`：分柱产物可先消耗一列。

自然消费方式：

- 接门口：比较 `CC`、`C+M`、`C+MM`、2x2、双柱在同一口的消费差异。
- 接目标回填：用释放出的 crate 覆盖目标，同时留下或不留下尾债。
- 接刚体墙口：把上刷生成的大占格形状再交给回返谱系。

常见 shortcut：

- 只移动边界但不提供消费口时，玩家只会看到资源形态变化。
- 门口太宽会让 `C+M` 和 `C+MM` 的尾债差异不可见。
- 低墙少一格时，2x2 占格门可能不再关闭。
- 把 push 刷和 pull 刷拆成两个顶层条目会重复；它们通常只是 driver 差异。

审美风险：

边界刷很容易变成“远程事件按钮”。它成为玩家洞见的时刻，是玩家意识到自己在选择刷产物，并且这个产物会被下游门口以不同方式消费。

consumption probe：

`door_cc_chain_push`、`door_cm_tail_push`、`door_cmm_tail_push`、`door_square_blocked_by_low_wall`、`door_split_columns_one_column_passes` 证明刷产物在同一门口中被消费成不同动作对象。`door_cmm_tail_push` 的回返搜索耗尽，只作为产物状态和动作表证据。

推荐 probe：

补目标回填版本：比较 `CC`、`C+M`、`C+MM` 在同一目标口中是否产生“覆盖目标但留下不同尾债”的差异。

组合例句：

`移动边界刷子 -> 门口消费谱 -> 目标回填`：玩家先移动 B/S 边界选择刷产物，再把刷产物送入同一门口；错误产物要么占格形状被墙挡住，要么留下无法处理的尾债。

证据：

`run=ra_struct_boundary_pull_01,ra_struct_consumption_01`, `cases=brush_down_bar_full_release,brush_down_vertical_partial,brush_down_l_tail,brush_parallel_preserve_bar,brush_up_bind_square,brush_up_gap_keeps_columns,door_cc_chain_push,door_cm_tail_push,door_cmm_tail_push,door_square_blocked_by_low_wall,door_split_columns_one_column_passes`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

输入侧补充：

`pull_brush_*` 与 `pull_brush_stroke_selector` 不作为独立顶层条目。它们说明同一移动边界刷子可以由 P/L pull 驱动，并能用距离 / stroke 调位；除非 driver 产生新的消费关系，否则归入本条输入侧。

## P/L 长轴墙廊：L 端余量棘轮

接口卡片：
- 输入接口：水平 P/L 位于一格高长轴墙廊，P 侧 push 或 L 侧 pull，端点余量可控。
- 输出接口：首步非法、一次性停位、多次推进能力、pull 后回返门或 mixed-chain 尾墙。
- 最小 consumer：墙廊端点余量和 pull 后出口消费 P/L anchor 的停位能力。

局部结构谱：

```text
0 格余量，首推被墙挡：
#######
#G#@PL#
#######

1 格余量，只能吃掉一个停位：
########
#G#@PL.#
########

2 格余量，首推后还能继续推：
#########
#G#@PL..#
#########

2 格余量 + 侧廊：
#########
#G#@PL..#
#.......#
#########
```

共同解释：

水平 P/L 在长轴墙廊中表现为朝 L 端消耗空间的棘轮。L 端余量决定推进次数，侧廊只增加玩家位置集合，不自动恢复反向长轴控制。

输入条件：

- 水平 P/L anchor 位于一格高墙廊或近似墙廊中。
- 玩家从 P 侧沿长轴 push。
- L 端前方空格数量可控，侧廊是否开放可控。

输出状态：

- 0 格余量：首步 illegal。
- 1 格余量：首推合法，但动作后不能继续向前，也不能回初始。
- 2 格余量：首推后仍能继续推。
- 侧廊开放：动作集合变宽，但仍不能反向恢复长轴位置。

结构旋钮：

- L 端前方空格数：0 / 1 / 2。
- 侧廊是否开放。
- 玩家能否绕到 L 侧但没有长轴反向 force。

自然消费方式：

- 用作停位容量：控制 P/L 只能移动 0 次、1 次或多次。
- 用作一次性开关或门闩：移动后占据/释放某个通道。
- 接边界刷子 driver：P/L 的单向位移可以作为 B/S anchor 的驱动，但 driver 本身不应升为新族。

常见 shortcut：

- 如果给出真正可反向施力的长轴把手，棘轮会失效。
- 侧廊开放不等于可反推；但如果侧廊同时改变 P/L 标签关系或目标格，需另跑。
- 首步 illegal 的 0 格余量只说明门关闭，不是回返证据。

审美风险：

如果只是让玩家推一次 P/L，它像机制教学。它成为洞见时，玩家需要估计 L 端余量，把 P/L 当作容量有限的位移资源。

consumption probe：

`long_axis_one_front_cell`、`long_axis_two_front_cells`、`long_axis_side_bypass_still_one_way` 证明墙廊和 L 端余量实际消费了 P/L 长轴位移；`side_bypass` 证明绕行不是 shortcut。

推荐 probe：

把 P/L 单向位移接到 B/S 移动边界刷子，验证“棘轮位移作为 driver”是否能形成 recipe，而不是只重复刷子输入侧。

组合例句：

`P/L 长轴棘轮 -> B/S 边界刷产物`：P/L 的一次性位移把 B/S anchor 带到刷线位；玩家必须接受 P/L 回不去，换取正确刷产物。

证据：

`run=ra_probe_pl_wall_anchor_03`, `cases=long_axis_no_front_cell,long_axis_one_front_cell,long_axis_two_front_cells,long_axis_side_bypass_still_one_way`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

本轮补谱：L 侧 pull 余量、回返门与 mixed-chain 容量

```text
L 侧 pull，0 格玩家前格，首步被玩家前格墙关掉：
########
#G.PL@##
########

L 侧 pull，1 格玩家前格，只给一次停位：
########
#G.PL@.#
########

L 侧 pull，2 格玩家前格，可连续两次拉动 anchor：
#########
#G.PL@..#
#########

首拉后回返门开放 / 封墙：
########        ########
#G.PL@.#        #G.PL@.#
#......#        #.....##
########        ########

crate + P/L 混合链，一格尾余量只够首推：
########
#..@...#
#..P...#
#..L...#
#..C...#
#......#
########
```

L 侧 pull 版把“余量”从 anchor 远端改写成玩家前格余量：0 格是 `destination_blocked`，1 格给一次 `pull_object:push_pull_anchor + anchor_boundary_shift:push_pull`，2 格给两次。首拉以后，侧廊开放只扩大玩家位置集合，不自动恢复初始 anchor key；回返门墙则消费首拉后的出口。混合链补谱显示 crate 参与同一 force chain 时，会把 anchor-only 的长轴容量缩短一格：`force_chain:n2 + anchor_boundary_shift:push_pull` 后，下一次同向推进被尾墙 `force_blocked`。

机制角色补充：

- active_rule：`pull_force` / `push_force` 移动 P/L anchor 本体；`forceModeAt` 决定玩家当前是 push 还是 pull；混合链中 `planObjectMove` 把 crate 与 P/L 放进同一 force chain。
- material_source：crate 只作为 mixed-chain 的链材料；目标 `G` 只满足解析。
- consumer：玩家前格墙、L 侧 pull 的前格余量、首拉后的回返门墙、mixed-chain 尾墙。
- incidental：侧廊中的 walk 和可达图旁支只用于校准 shortcut，不参与标题归属。

补充变体：

- `pull_l_side_no_front_gate`：0 格前格，首步 `destination_blocked`，无 anchor 移动。
- `pull_l_side_one_front_stop`：1 格前格，首拉合法，complete / 2 states。
- `pull_l_side_two_front_capacity`：2 格前格，两次 `anchor_boundary_shift:push_pull`。
- `pull_l_side_side_corridor_fake_handle`：侧廊开放但回初始 complete no，证明侧廊不是长轴反向恢复。
- `pull_l_side_return_gate_open` / `pull_l_side_return_gate_wall`：首拉都移动 anchor，第二步 `down` 分别 walk / `destination_blocked`。
- `p_push_crate_into_anchor_tail_wall_after_one`、`p_push_anchor_into_crate_tail_wall_after_one`、`anchor_only_two_steps_capacity_control`：mixed chain 两种顺序一格尾余量只能吃一次，anchor-only 对照可吃两次。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_long_axis_pull_push_wall_ratchet`, `cases=pull_l_side_no_front_gate,pull_l_side_one_front_stop,pull_l_side_two_front_capacity,pull_l_side_side_corridor_fake_handle,pull_l_side_return_gate_open,pull_l_side_return_gate_wall`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`, `cases=p_push_crate_into_anchor_tail_wall_after_one,p_push_anchor_into_crate_tail_wall_after_one,anchor_only_two_steps_capacity_control`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L 横向把手：玩家前格门与锚点占格门

接口卡片：
- 输入接口：横向或竖向 P/L anchor，P 侧 push 或 L 侧 pull 站位，各半格目标格、玩家前格和回返前格可控。
- 输出接口：合法移动、玩家前格关闭、P/L 半格目标格关闭、移动后回返门关闭，或 carried crate 目标门。
- 最小 consumer：相邻墙格矩阵分别消费玩家前格、锚点半格目标格和移动后回返格。

局部结构谱：

```text
P 侧推入，下方和回返通路开放：
#######
#.....#
#.@...#
#.PLG.#
#.....#
#.....#
#######

P 侧推入，但 L 半格目标被墙挡：
#######
#.....#
#.@...#
#.PLG.#
#..#..#
#.....#
#######

L 侧拉出，但玩家前格被墙挡：
#######
#..#..#
#..@..#
#.PLG.#
#.....#
#.....#
#######

L 侧拉出，玩家前格开放但 P 半格目标被墙挡：
#######
#.....#
#.#@..#
#.PLG.#
#.....#
#.....#
#######
```

共同解释：

横向 P/L 的垂直位移有两套把手：P 侧接触推入，L 侧离开式拉出。两者都要求 P/L 两个半格的目标格同时开放；pull 还额外要求玩家前格开放。墙格因此分成玩家前格门、锚点另一半目标门、推动后的回返门。

输入条件：

- P/L anchor 横放，玩家位于 P 侧推入或 L 侧拉出站位。
- P/L 上下目标格和玩家 pull 前格可被墙格分别控制。
- 有或没有绕行回返通路。

输出状态：

- 首步合法并可回返。
- 首步被玩家前格门关闭，`destination_blocked`。
- 首步被锚点另一半目标门关闭，`force_blocked`。
- 首步合法但推动后回返门被墙封住。

结构旋钮：

- 施力侧：P 侧 push / L 侧 pull。
- 玩家前格是否为空。
- 未接触的另一半 anchor 目标格是否为空。
- 首步后的反向把手格是否开放。

自然消费方式：

- 用作把手分类器：同样看似相邻的墙格，关闭的是玩家动作、对象占格目标，还是回返。
- 接移动边界刷子：P/L 可以作为 driver，但要先判断前格门和占格门。
- 接目标/通道：首步合法但回返门关闭时，可形成轻量承诺点。

常见 shortcut：

- 只放一个墙格但没控制到正确门，会让玩家仍能用另一侧把手绕过。
- 把 `destination_blocked` 和 `force_blocked` 混写，会导致 designer 误放墙。
- 开放大房间会弱化“首步后回返门”的压力。

审美风险：

如果只展示 P 侧推 / L 侧拉，是规则教学；如果玩家必须识别“哪个墙格实际关掉哪个门”，才会成为空间洞见。

consumption probe：

`p_side_push_down_other_half_wall`、`l_side_pull_up_front_wall`、`l_side_pull_up_p_target_wall` 证明不同墙格消费的是不同门；`p_side_push_down_l_front_wall_after_shift` 证明首步后回返门也能被消费。

推荐 probe：

把该把手门接入 B/S 移动边界刷子，比较同一刷产物在 push driver 与 pull driver 下是否出现不同 shortcut。

组合例句：

`P/L 横向把手门 -> 移动边界刷子`：玩家需要先打开正确 pull 前格或占格门，才能把 B/S anchor 抽到刷线位。

证据：

`run=ra_probe_pl_wall_anchor_03`, `cases=p_side_push_down_open_loop,p_side_push_down_other_half_wall,p_side_push_down_l_front_wall_after_shift,l_side_pull_up_open_loop,l_side_pull_up_front_wall,l_side_pull_up_p_target_wall`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

本轮补谱：半格目标门、旋转镜像与 mixed pull 链

```text
h_p_push_down_open_return：P 侧 push down，目标格与回返门开放
actions: down, right, up
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.....#
#######

h_p_push_down_p_target_wall：只把 push 后 P 半格目标格改成墙
actions: down -> force_blocked
#######
#..G..#
#.....#
#.@...#
#.PL..#
#.#...#
#######

h_p_push_down_l_target_wall：只把 push 后 L 半格目标格改成墙
actions: down -> force_blocked
#######
#..G..#
#.....#
#.@...#
#.PL..#
#..#..#
#######

h_p_push_down_return_front_wall：首推开放，移动后回返前格封墙
actions: down, right, up -> destination_blocked on step 3
#######
#..G..#
#.....#
#.@#..#
#.PL..#
#.....#
#######

h_l_pull_down_open：L 侧 pull down，玩家前格和 P 半格目标格开放
actions: down
#######
#..G..#
#.....#
#.PL..#
#..@..#
#.....#
#######

h_l_pull_down_front_wall：只把 pull 的玩家前格改成墙
actions: down -> destination_blocked
#######
#..G..#
#.....#
#.PL..#
#..@..#
#..#..#
#######

h_l_pull_down_p_target_wall：玩家前格开放，但非接触 P 半格目标格为墙
actions: down -> force_blocked
#######
#..G..#
#.....#
#.PL..#
#.#@..#
#.....#
#######

v_p_push_right_open / v_p_push_left_open：竖放 P/L 的左右 push 开放镜像
actions: right / left
#######    #######
#..G..#    #..G..#
#.....#    #.....#
#.@P..#    #..P@.#
#..L..#    #..L..#
#.....#    #.....#
#######    #######

l_pull_anchor_carries_side_crate_open：L 侧 pull P/L，非接触半格上的 crate 同链移动
actions: up
########
#G.....#
#..C@..#
#..PL..#
#......#
########

l_pull_anchor_front_wall_gate：只关闭玩家 pull 前格
actions: up -> destination_blocked
########
#G..#..#
#..C@..#
#..PL..#
#......#
########

l_pull_anchor_crate_target_wall_gate：玩家前格开放，但 carried crate 目标格为墙
actions: up -> force_blocked
########
#G.#...#
#..C@..#
#..PL..#
#......#
########
```

横向把手现在应读成四层墙门矩阵：玩家前格门、P 半格目标门、L 半格目标门、移动后回返门。P 侧 push 可以分别堵 P / L 两个目标半格；L 侧 pull 先检查玩家前格，再检查非接触半格或被携带对象的目标格。竖放 `P/L` 的 P 侧左右 push 在开放 patch 中对称，说明这不是旧样本某个方向的偶然性。mixed pull 链则把同一矩阵扩展到“P/L anchor 被拉时携带 crate”：玩家前格墙给 `destination_blocked`，crate 目标墙给 `force_blocked`。

补充变体：

- `h_p_push_down_open_return`：P 侧 push 下移 `PL`，再从旧 L 格 pull 回返，两次 `anchor_boundary_shift:push_pull`。
- `h_p_push_down_p_target_wall` / `h_p_push_down_l_target_wall`：同为 `force_blocked`，但分别消费 P 半格目标门和 L 半格目标门。
- `h_l_pull_down_front_wall` / `h_l_pull_down_p_target_wall`：分别消费 pull 玩家前格门和非接触 P 半格目标门。
- `h_p_push_down_return_front_wall`：首步已移动 anchor，回返 pull 才被 `destination_blocked`。
- `v_p_push_right_open` / `v_p_push_left_open`：竖放 `P/L` 的 P 侧左右开放 push 对称。
- `l_pull_anchor_carries_side_crate_open` / `l_pull_anchor_front_wall_gate` / `l_pull_anchor_crate_target_wall_gate`：mixed pull 正例和两类墙门反例。

归属边界：

- 这些补谱 `merge/supplement` 到本条，不新开“横向 push up”“竖向左右 push”小 family。
- mixed pull 链的主语仍是 P/L anchor 抽动时的占格门 / chain 门；若后续要把 carried crate 接目标口，才进入 recipe 或新 consumer 题材。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_transverse_wall_gate_matrix`, `cases=h_p_push_down_open_return,h_p_push_down_p_target_wall,h_p_push_down_l_target_wall,h_p_push_down_return_front_wall,h_p_push_up_open,h_l_pull_down_open,h_l_pull_down_front_wall,h_l_pull_down_p_target_wall,v_p_push_right_open,v_p_push_left_open`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`, `cases=l_pull_anchor_carries_side_crate_open,l_pull_anchor_front_wall_gate,l_pull_anchor_crate_target_wall_gate`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L 锚点边界重写：旧半格把手与侧边对象改侧

接口卡片：
- 输入接口：P/L anchor 至少移动到能释放旧半格或扫过侧边对象的位置，玩家能到达新把手。
- 输出接口：旧 L 半格变成新 push 站位；侧边 crate 从 L 侧前格阻断变成 P 侧 push 资源。
- 最小 consumer：单格目标袋消费旧半格新把手，侧边 crate relay 消费边界重写后的对象侧别。

局部结构谱：

```text
P 侧 push 构造旧 L 站位：
########
#......#
#@PL...#
#..C...#
#..G...#
########

right,right 后，旧 L 半格释放并落入新 push side：
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

墙阻止第二次 shift，则旧 L 站位不成立：
########
#......#
#@PL.#.#
#..C...#
#..G...#
########
```

```text
混合链下移重写侧边 crate：
########
#..@...#
#..P...#
#..LC..#
#..C...#
#......#
########

down 后，P/L 与下方 crate 同链下移：
########
#......#
#..@...#
#..PC..#
#..L...#
#..C...#
########

玩家绕到右侧，left 从新 P 侧变成 push chain：
########
#......#
#......#
#.PC@..#
#.L....#
#..C...#
########

不先移动 P/L，同一触碰在 L 侧是 pull front gate：
########
#......#
#..P...#
#..LC@.#
#..C...#
#......#
########
```

共同解释：

P/L anchor 移动不是只改变二格物体的位置。它会同步改写 `forceModeAt` 的分界线，并释放旧占格位置。若旧 L 半格或旧 L 行旁对象正好接着一个后续 consumer，玩家可以把这个被释放 / 被重标的位置当作新 push 侧把手。墙可以消费这条链的不同段：挡住第二次 anchor shift、挡住 pull driver 的玩家前格，或让不移动锚点的对照停在 `pull_world_front_blocked`。

机制角色：

- active_rule：P/L anchor 本体移动导致 `forceModeAt` 边界重写；第二动作在新 push side 中触发 `push_force`。
- material_source：crate / goal 是第二动作 consumer 材料；mixed chain 中的下方 crate 是移动 P/L 的链材料。
- consumer：第二停位墙、pull 前格墙、旧 L 下方目标袋、侧边 crate、玩家右侧站位和绕行通路。
- incidental：目标覆盖胜利、可达图里的其他 force-chain 旁支不参与关键观察点。
- 关键观察点：`anchor_boundary_shift:push_pull` 之后，后续动作从“普通 walk / L 侧 front-block”变成 `push_object:crate#1` 或 mixed push chain。

输入条件：

- P/L anchor 沿某方向至少能移动到会释放旧半格或扫过目标行 / 列的位置。
- 玩家能到达被释放旧 L 半格，或能到达被新边界重标的侧边对象把手。
- 该旧格 / 侧边对象旁有一个必须由新 force side 消费的后续结构，例如目标袋、侧边 crate 或门闩。

输出状态：

- 旧 L 半格从 occupied anchor cell 变成新 push side 操作站位。
- mixed chain 下移后，旧 L 行侧边 crate 从 L 侧 pull front gate 变成 P 侧 push chain。
- 第二动作产生普通 `push_object` 或 `force_chain:n2 + anchor_boundary_shift:push_pull`，证明新边界被实际消费。

结构旋钮：

- driver：P 侧 push / L 侧 pull / mixed force chain。
- 移动量：一次 shift 只释放错位格，两次 shift 才生成旧 L 把手。
- 墙位：第二停位墙、pull 玩家前格墙。
- consumer：目标袋、侧边 crate、后续门口。
- 绕行通路：pull driver 或 mixed rewrite 后是否能到达消费站位。

自然消费方式：

- 目标袋：旧 L push 站位把 crate 推入单格目标。
- 侧边 relay：mixed downshift 后，用新 P 侧把侧边 crate 推入 / 推出 anchor 邻域。
- 二段 recipe：先移动 P/L 改写边界，再处理之前被 L 侧 pull front gate 拒绝的对象。

常见 shortcut 与误用边界：

- 只有一次 `anchor_boundary_shift:push_pull` 不够；玩家可能还没站到旧 L 半格，第二动作只是 walk 或错位 push。
- 如果墙阻止第二次 anchor shift，旧 L 半格仍在 anchor 占格中或无法作为把手。
- 不移动 P/L 的同站位对照必须失败或变质，否则只是普通绕路。
- 正例中 `returnToInitial.status=exhausted` 只写未知，不写不可回返。

审美风险：

如果后续对象不需要新边界就能处理，这条会退化成“推了锚点”。它成为洞见时，玩家必须主动移动 P/L anchor 来制造一个原先不存在的操作侧别。

consumption probe：

`push_two_shift_old_l_push_crate_goal` 和 `pull_two_shift_old_l_push_crate_goal` 都把旧 L 半格重写为 push 站位并推箱进目标；`push_second_shift_wall_blocks_rewrite`、`pull_second_shift_front_wall_blocks_rewrite` 和 `push_one_shift_only_walks_not_consume` 校准移动量和墙门。`mixed_downshift_rewrites_side_crate_to_push` 与 `no_shift_side_crate_pull_front_gate` 证明 mixed-chain 移动 P/L 后，同一侧边 crate 触碰从 L 侧 front-block 变成 P 侧 push chain。

组合例句：

`P/L anchor 双步位移 -> 旧 L push 站位 -> 单格目标袋`：玩家先把 P/L anchor 推/拉过目标把手位，释放旧 L 半格并把它改写成 push side，再用这个新把手把箱子推进目标。

`mixed-chain downshift -> side crate push relay`：第一段用下方 crate 限制并驱动 P/L 位移，第二段用新 P 边界把侧边 crate 推入锚点邻域，形成二段式对象分配。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_boundary_rewrite_second_action`, `cases=push_two_shift_old_l_push_crate_goal,push_second_shift_wall_blocks_rewrite,pull_two_shift_old_l_push_crate_goal,pull_second_shift_front_wall_blocks_rewrite,push_one_shift_only_walks_not_consume`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`, `cases=mixed_downshift_rewrites_side_crate_to_push,no_shift_side_crate_pull_front_gate`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L pull 抽取把手：前格门、占格目标门与扫带

接口卡片：
- 输入接口：玩家在 pull 侧，身后有 crate、B/S anchor 或其他二格对象，前格和对象目标格可控。
- 输出接口：单格抽取、沿轴二格整体抽出、垂直二格因侧向目标位开闭、侧向 crate 扫带资源。
- 最小 consumer：玩家前格墙、对象侧向目标墙和侧向 crate 分别消费 pull 抽取的三层门。

局部结构谱：

```text
单 crate 抽取：
#########
#PL....G#
#.......#
#.@C....#
#.......#
#########

前格墙封死抽取：
#########
#PL....G#
#.......#
#.#@C...#
#.......#
#########

竖向 B/S anchor，侧向余量开放：
#########
#PL....G#
#.......#
#.@S....#
#..B....#
#.......#
#########

竖向 B/S anchor，侧向目标墙封死：
#########
#PL....G#
#.......#
#..@S...#
#..#B...#
#.......#
#########

竖向 B/S anchor 扫带侧箱：
#########
#PL....G#
#.......#
#.@S....#
#.CB....#
#.......#
#########
```

共同解释：

pull 抽取不是“身后有对象即可”。它拆成三层门：玩家前格门、对象占格目标门、侧向 blocker 的可移动性。单 crate 和沿轴二格物体主要消耗玩家前格；垂直二格物体还需要侧向目标位；侧向目标位放墙会封门，放 crate 会变成扫带资源。

输入条件：

- 玩家处于 pull 侧，身后有 crate、B/S anchor 或其他可拉对象。
- 玩家前格必须可进入。
- 被拉对象每个占格目标格必须可用，或可由 force chain 推走。
- 侧向 blocker 类型可控：墙、crate、sticky 或空格。

输出状态：

- 单格对象被抽入玩家旧格。
- 沿轴二格 anchor 被整体抽出。
- 垂直二格 anchor 因侧向目标位开放/封闭而合法或非法。
- 侧向 crate 被同步扫带，成为额外资源移交。

结构旋钮：

- 玩家前格：开放 / 墙封。
- 身后对象占格：单格 / 沿轴二格 / 垂直二格。
- 侧向目标位：空格 / 墙 / 可移动 crate。
- 抽取后前格是否被新对象反向封住。

自然消费方式：

- 用作 B/S anchor 的远程把手。
- 用作口袋资源抽取器：把 crate 拉到玩家旧位。
- 用作侧向扫带：把本来封闭的对象目标格变成同步移动资源。

常见 shortcut：

- 只封玩家前格会关闭所有 pull，但不测试占格门。
- 只测试单 crate 会漏掉垂直二格对象的侧向目标要求。
- 侧向墙换成 crate 后，封门会变成扫带 shortcut。

审美风险：

单 crate 抽取本身偏基础；垂直二格对象与侧向 blocker 的比较更像可设计语料，因为玩家需要理解“拉动时对象整个占格形状都要有去处”。

consumption probe：

`pull_crate_front_wall` 消费玩家前格；`pull_bs_vertical_side_wall` 消费对象占格目标格；`pull_bs_vertical_side_sweep_crate` 把封门格改成扫带资源，证明侧向 blocker 类型改变后续动作集合。

推荐 probe：

把侧向 blocker 从 crate 换成 sticky 部件，比较扫带后是资源移交、刚体合并，还是占格关闭。

组合例句：

`P/L pull 抽取把手 -> B/S 移动边界刷子`：玩家先用 pull 抽出 B/S anchor，再让边界线跨过远处占格形状；如果前格或侧向目标位放错，刷子无法启动或产生扫带 shortcut。

证据：

`run=ra_struct_boundary_pull_01`, `cases=pull_crate_pocket_extract,pull_crate_front_wall,pull_bs_horizontal_axis,pull_bs_vertical_side_open,pull_bs_vertical_side_wall,pull_bs_vertical_side_sweep_crate`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

## P/L 边界交接：推入、跨侧与抽取分配

接口卡片：
- 输入接口：单箱、箱链或 sticky 连体块位于 P/L 边界邻域，玩家能先在 P 侧推入再跨到 L 侧把手位。
- 输出接口：单箱被拉入玩家旧格，箱链只抽近端并留下残余链，sticky group 成功 handoff 或被前格 / 目标格门拒绝。
- 最小 consumer：目标口袋消费单箱 handoff，链端抽取打开下方单格口，墙格分类 sticky handoff 的前格和目标格门。

局部结构谱：

```text
单箱：P 侧推到边界，L 侧拉入口袋：
##########
#...PL...#
#........#
#..@C.G..#
#........#
##########

二箱链：P 侧推链，L 侧只抽近端：
##########
####PL####
##########
#........#
#.@CC...G#
#........#
#........#
##########

二格 sticky：P 侧送到边界，L 侧继续抽出：
############
#B##PL##..G#
#S##########
##.........#
#@MM.......#
#..........#
############
```

共同解释：

这条不是 “P 侧能推、L 侧能拉” 的规则复述。它的接口是边界交接：玩家先在 P 侧把对象送到 P/L 边界邻域，再实际跨到 L 侧，让同一个局部状态改用 pull 语义消费。单箱会被拉入玩家旧格；箱链在 P 侧整体 `force_chain`，到 L 侧只抽身后一格近端；sticky group 在 L 侧还要检查整个连体块形状的目标格。墙、目标口袋、前格占用和下游单格口决定这次交接是成功、封门、形状失败还是资源分配。

机制角色：

- active_rule：`forceModeAt` 在 P/L 边界两侧改变动作语义；P 侧 `push_force` / `force_chain` 与 L 侧 `pull_force` / 前格门 / 占格目标格检查产生差异。
- material_source：普通 crate 链；B/S 只在 sticky 变体中提供合法 sticky material。
- consumer：L 侧玩家前格、目标口袋、下方单格口、sticky 非接触目标墙、边界跨侧通路、回返把手。
- incidental：P/L anchor 在本条中通常被隔离，只提供边界判定；可达图中的 anchor 移动事件不参与关键观察点。若 P/L anchor 本体被移动并重写旧半格 / 侧边对象侧别，归入 `P/L 锚点边界重写`。

输入条件：

- 对象必须位于或能被送到 P/L 边界邻域；玩家需要能从 P 侧实际跨到 L 侧把手位。
- P 侧有合法 push 入口：单箱、箱链或 sticky 连体块能被推到边界相邻格。
- L 侧 pull 入口必须满足玩家前格开放，且多格连体块的所有目标格可用。

输出状态：

- 单箱：P 侧 handoff 后，L 侧 pull 把 crate 拉入玩家旧格；目标口袋可直接消费这个旧格。
- 多箱链：P 侧整链移动；L 侧只抽近端箱，远端残余链留下，链长改变残余资源数量。
- sticky group：P 侧可把连体块送到边界；L 侧可继续抽出，或被前格墙 / 占格目标墙分类拒绝。
- 可逆 handoff：跨界 sticky 横条可用 P 侧 push 打开 L 侧把手，再由 L 侧 pull 回原状，证明这类交接不必然单向。

结构旋钮：

- 对象类型：单箱 / 二箱链 / 三箱链 / 二格 sticky / L 形 sticky。
- L 侧前格：开放 / 墙 / 箱。
- 占格目标格：全部开放 / 非接触格撞墙 / L 形下凸撞墙。
- 下游 consumer：目标口袋、下方单格口、回返把手。
- 链长：二箱留下一个残余箱，三箱留下两个残余箱。

自然消费方式：

- 目标口袋：玩家站在目标上不算覆盖，L 侧 pull 把单箱拉到目标后才覆盖。
- 资源分配：P 侧推链打包，L 侧抽近端，把远端链留给另一个结构。
- 口袋开门：抽走近端箱打开原本被箱占住的单格口。
- 门控分类：同一 P-side handoff 后，L 侧前格墙给 `destination_blocked`，sticky 占格目标墙给 `force_blocked`。

常见 shortcut 与误用边界：

- 玩家没有实际跨 P/L，或对象不在边界邻域，只是全图 push / pull，不属于本条。
- 单箱 pull 的基础前格门不能单独作为本条证据；必须接到 P-side handoff 或 downstream consumer。
- sticky L 形被墙挡住若没有 P push -> cross -> L pull 的交接过程，应归入 `刚体黏块 + 墙口`。
- `returnToInitial.status=exhausted` 只能写 unknown；本轮二箱 / 三箱抽取正例不能声称不可回返。
- P/L anchor mixed chain 已另有本体语料；不要把锚点移动后的边界重写塞回普通对象 handoff。

consumption probe：

`plb_04_goal_pocket_shortcut` 消费单箱边界 handoff：P 侧只能把 crate 交到 L 侧边界邻域，L 侧 pull 把 crate 拉进玩家旧站位的目标口袋。`pl_chain2_pull_opens_lower_pocket` 消费多箱链端抽取：L 侧抽走近端箱后，原本被箱占住的下方单格口打开，玩家可进入口袋。sticky 变体的前格墙和 L 形占格目标墙是 handoff gate 的反例 / correction，不单独作为新顶层。

### 边界活塞本体谱：单箱退化、箱链残余债与 sticky 形状墙口

接口卡片：
- 输入接口：P/L anchor 提供竖向边界，玩家站在 P 侧并面向边界相邻对象；活塞本体可以是单箱、箱链、二格 sticky 横条或 L 形 sticky。
- 输出接口：第一手 P 侧 push 把本体推出并把玩家送到 L 侧把手位；第二手 L 侧 pull 可能精确回撤、只抽近端、整体回撤，或被 sticky 目标格墙拒绝。
- 最小 consumer：紧接的 `left` pull 消费“玩家已跨到 L 侧”的状态；侧齿和前沿墙消费 sticky 刚体目标格；箱链残余债可作为第二段目标袋、刷线停位或回返门输入。

局部结构谱：

```text
单箱退化：right,left 精确回初态
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########

箱链：right 推整链，left 只抽近端
#########
#..PL..G#
#.......#
#..@CC..#
#.......#
#########

二格 sticky 横条 + 侧齿：侧齿不在目标格中，可往复
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########

L 形 sticky + 同一侧齿：下凸格目标撞墙，首步失败
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########

L 形宽口：移除侧齿后恢复 right,left 往复
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########

横条 + 前沿行程墙：伸出 stroke 被目标墙关闭
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```

共同解释：

这组不是单独新规则，而是 `P/L 边界交接` 的活塞化读法：第一手把对象送入边界邻域，同时把玩家换到 L 侧；第二手立即读出本体的对象模型。crate 链在 P 侧被整体推，在 L 侧只抽身后一格近端；sticky 连体块在 L 侧作为刚体整体回撤，且整个目标格集合会被墙消费。

对照关系：

- `C` vs `CC`：单箱两步回初态；箱链两步后留下远端残余债，说明本体长度和对象可分离性改变输出。
- `CC` vs `MM`：二者第一手都能被推入，但箱链第二手只抽近端，sticky 横条第二手整体回撤。
- `MM` vs L 形：同一侧齿对横条无效，对 L 形下凸格有效，说明墙消费的是 sticky 形状目标格。
- L 形侧齿 vs L 形宽口：移除侧齿后 L 形恢复往复，排除“L 形不能活塞”的错误解释。
- 横条侧齿 vs 横条前沿墙：侧齿不在目标格时无效；前沿墙落在伸出 stroke 目标格时直接 `force_blocked`。

输入条件：

- 玩家必须能从 P 侧完成第一手 push，并在动作后进入 L 侧可拉位置。
- 本体必须紧贴边界交接位；否则只是普通 push / pull。
- sticky 变体需要整块目标格开放；箱链变体需要远端位置能接住第一手整链 push。
- 墙齿必须落在实际目标格集合里；离目标格一格的墙只能作地形背景。

输出状态：

- 单箱：可作为退化基线，证明两步活塞路径存在，但没有 downstream consumer 时不单独成语料。
- 箱链：留下近端抽取后的残余箱链债，适合作为第二段资源分配输入。
- sticky 横条：整体伸出 / 回撤，适合作为可逆门或 B/S 刷线 driver。
- L 形 sticky：把侧齿、口宽和凸格位置变成首步行程门。
- 前沿墙：关闭伸出 stroke，用作“第一手不成立”的形状门反例。

结构旋钮：

- 本体类型：单箱 / 二箱链 / 二格 sticky 横条 / L 形 sticky。
- 对象模型：可分离 crate 链 / sticky 刚体。
- 墙位：侧齿、宽口、前沿行程墙。
- 第二手消费：精确回撤、近端抽取、刚体回撤、首步阻断。
- 下游接法：残余债、回返门、移动边界刷线、形状墙口。

自然消费方式：

- 箱链残余债：近端被抽回后，远端箱可作为第二目标袋、门闩或后续推链资源。
- 回返门：sticky 横条或宽口 L 形可要求玩家先伸出再撤回，控制通路开闭。
- 形状分类器：同一墙位区分横条、L 形和前沿目标格，接入 `刚体黏块 + 墙口`。
- driver：可往复 sticky 活塞可作为移动 B/S anchor 或其他边界结构的停位 driver。

常见 shortcut：

- 单箱 `right,left` 没有下游消费时只是动作 witness。
- 只看到首步 `force_blocked` 不能写成不可回返；它只说明行程目标格被墙消费。
- 侧齿没有落进目标格集合时，不能说墙消费了该形状。
- 箱链残余债在有限搜索中可回初态，不能写成全局不可逆。

审美风险：

如果只让玩家做单箱往复，会像基础规则演示。它成为设计语料的时刻，是玩家必须选择“可分离链”还是“sticky 刚体”，并让后续结构消费残余债、回返态或形状目标格。

误用边界：

- 只在开放房间里推回 sticky，不属于边界活塞；必须有 P 侧推入后 L 侧立即 pull 的跨侧交接。
- sticky 侧齿分类的 active consumer 是刚体目标格与墙；P/L 是 driver 和站位转换来源。
- B/S anchor 在这些 sticky 图里主要提供合法 sticky 材料，不是本子谱主语。

机制角色与归属边界：
- active_rule：P/L `forceModeAt` 造成第一手 push / 第二手 pull 的跨侧读法；crate 链近端抽取和 sticky 刚体目标格检查造成本体差异。
- material_source：B/S anchor 只让 raw `M` 保持 sticky 材料。
- consumer：紧接 `left` pull、侧齿、前沿行程墙、箱链远端残余位。
- incidental：目标 `G` 在本组只保证 layout 合法。
- 关键观察点：`cc_chain_pull_splits_debt` 的第二手从整链移动变为近端抽取；`l_shape_side_tooth_blocks_stroke` 的第一手因下凸格目标墙 `force_blocked`。

证据：

`run=ra_loop_pl_piston_20260708_01`, `cases=c_single_reversible_degenerate,cc_chain_pull_splits_debt,mm_bar_side_tooth_pass_reversible,l_shape_side_tooth_blocks_stroke,l_shape_wide_mouth_reversible,mm_bar_head_wall_blocks_stroke`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe,supplement`

### 单箱目标活塞顺序锁：推入覆盖与回撤撤销

接口卡片：
- 输入接口：P/L 边界旁一枚 crate，玩家从 P 侧推箱；箱子的伸出位正好是 goal，且通道限制玩家后续必须回撤。
- 输出接口：第一手产生临时目标覆盖；若第二手从 L 侧回撤，`pull_object:crate#1` 会把 crate 拉出目标并撤销覆盖。
- 最小 consumer：狭窄通道把 `left` 回撤变成唯一出口；开放侧路和目标偏位分别作为 shortcut / 错例。

局部结构谱：

```text
推入作为最后动作：
#########
#..PL...#
#########
#..@CG..#
#########

right 后目标覆盖，若停止则达成：
#########
#..PL...#
#########
#...@*..#
#########

同图继续 left 回撤，目标撤销：
#########
#..PL...#
#########
#..@CG..#
#########

开放侧路：right 后可 down 离开，目标保留：
#########
#..PL...#
#.......#
#..@CG..#
#.......#
#########

目标偏一格：right 不产生临时覆盖：
##########
#..PL....#
##########
#..@C.G..#
##########
```

共同解释：

单箱活塞大多时候只是退化往复：`right,left` 回到初态。但如果第一手伸出位正好是目标，单箱伸出态本身就变成可消费输出。狭窄通道把玩家的后续出口限制为 `left`，而 `left` 在 L 侧会拉回 crate，于是目标覆盖只能作为最后动作保留；如果还有必须完成的后续动作，提前覆盖会被撤销。

对照关系：

- `corridor_goal_last_action`：`right` 后 crate 覆盖目标，`final.isWin=true`。这证明单箱活塞伸出态可以被目标消费。
- `corridor_goal_then_forced_retract`：同一图 `right,left` 后目标撤销，`final.isWin=false`。这证明回撤动作会消费并破坏临时覆盖。
- `open_side_exit_preserves_goal`：打开侧向出口后，`right,down` 保持目标覆盖，说明必须回撤才形成顺序锁。
- `corridor_goal_offset_no_temp_cover`：目标偏离伸出位时 `right` 不覆盖目标，说明目标必须放在活塞伸出位。

输入条件：

- 单箱必须紧贴 P/L 边界交接位，第一手由 P 侧 push 把 crate 推到目标上。
- 玩家推入后必须落在 L 侧；后续回撤方向必须触发 pull，而不是普通 walk。
- 通道要封住侧向出口，使目标覆盖后的必要动作是 `left` 回撤。
- goal 必须在第一手伸出位；偏一格只会变成普通推箱。

输出状态：

- 最后动作覆盖：`right` 后渲染为 `*`，局部目标满足。
- 回撤撤销：继续 `left` 触发 `pull_object:crate#1`，`*` 还原为 `CG`。
- shortcut：若能 `down` / `up` 离开，则 crate 留在目标上，不再产生顺序锁。
- 错位目标：伸出位没有目标时，没有临时覆盖产物。

结构旋钮：

- 目标位置：伸出位 / 偏前一格。
- 出口形状：狭窄一维通道 / 上下侧路开放。
- 动作终止点：`right` 作为最后动作 / `right,left` 必须回撤。
- consumer：goal、通道出口、pull 回撤。

自然消费方式：

- 多目标顺序：把这个目标安排成最后目标；提前完成会在回撤中被撤销。
- 回返门：要求玩家先进入活塞通道处理别的结构，最后才推箱上目标并停止。
- recipe 标记：用目标覆盖状态标记“此回撤之前不能最终完成”的局部承诺。

常见 shortcut：

- 有侧向出口时，玩家可以保持 crate 在目标上离开，锁失效。
- 目标不在第一手伸出位时，不产生临时覆盖。
- 如果后续不需要回撤，单箱只是普通目标 witness。
- 该结构不证明全局不可逆；只证明覆盖会被特定回撤动作撤销。

审美风险：

如果目标就是普通最后一步推箱，它会显得像基础教程。它变成设计语料的时刻，是玩家意识到“这个目标不能提前完成，因为我还要从这里撤出去，而撤出会把箱拉走”。

误用边界：

- 不要把所有单箱活塞都写成顺序锁；必须有伸出位目标和被迫回撤。
- 不要把开放侧路的目标保留写成锁。
- 不要扩张到箱链或 sticky 目标活塞；这些需要另跑对象模型对照。

机制角色与归属边界：
- active_rule：P/L push 后玩家处于 L 侧，下一手 `left` 触发 `pull_object:crate#1`。
- material_source：普通 crate 和 goal；P/L anchor 提供 push / pull 侧别。
- consumer：goal 消费伸出位，狭窄通道消费玩家出口并迫使回撤。
- incidental：没有 B/S 或 sticky；这是单箱活塞的目标顺序用途。
- 关键观察点：`right` 后 `after.isWin=true`，继续 `left` 后 `final.isWin=false`。

退化解释：

这不是普通“箱子上目标”的 witness，因为开放侧路对照中目标可以保留；也不是普通单箱活塞，因为目标偏位对照没有临时覆盖。只有“伸出位是目标 + 后续必须回撤”同时成立时，单箱活塞才从退化动作变成顺序锁材料。

证据：

`run=ra_loop_pl_single_crate_goal_piston_lock_20260708_01`, `cases=corridor_goal_last_action,corridor_goal_then_forced_retract,open_side_exit_preserves_goal,corridor_goal_offset_no_temp_cover`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,supplement`

推荐 probe：

把链端抽取后的残余箱接到第二段目标或回返门；把 sticky handoff 接入实际目标口，而不只是前格 / 占格门。若测试 sticky blocker 扫带，沿用 `P/L pull 抽取把手` 的 blocker gap，不要混入本条标题。

组合例句：

`P 侧推链 -> 跨 P/L -> L 侧抽近端 -> 下方口袋打开`：玩家先把多箱作为整体送到边界，再利用 L 侧只抽近端的差异，把一个箱变成可移动资源，同时留下残余链作为债务。

证据：

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_single_crate`, `cases=plb_01_push_cross_pull_success,plb_02_push_cross_pull_front_wall,plb_03_l_pull_then_p_push_wall,plb_04_goal_pocket_shortcut`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_sticky_groups`, `cases=pl_sticky_bar_push_pull_extract,pl_sticky_bar_l_front_wall_gate,pl_sticky_bar_open_handle_return,pl_sticky_l_shape_target_wall_gate`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete`

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_multi_box_force_chain`, `cases=pl_chain2_pull_extract_near_end,pl_chain3_pull_extract_near_end,pl_chain2_pull_front_gate_blocked,pl_chain2_pull_opens_lower_pocket`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L L形缺角活塞：一推即侧拉

接口卡片：
- 输入接口：玩家初始站在 L 形 sticky 连体块缺角里，先在 P/L 场中沿一个轴向推整块一格。
- 输出接口：推动后玩家仍贴着 L 形的正交邻接面，下一手可立即侧向拉动整块，形成短行程转向活塞。
- 最小 consumer：第二手拉动的目标格集合被墙门、B/S anchor、目标口或邻近可动件消费。

局部结构谱：

```text
基础 3-cell L：玩家站在缺角中，right 后可立即 down pull：
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#.........#
#.........#
###########

无缺角横条：同样 right,down，第二手只会 walk：
###########
#B#########
#S#PL....G#
#.........#
#.........#
#..@MM....#
#.........#
#.........#
###########

向前长横臂：仍可侧拉，但新增右外侧目标格：
###########
#B#########
#S#PL....G#
#.........#
#..MMM....#
#..@M.....#
#.........#
#.........#
###########

竖腿向拉动方向延长：仍可侧拉，但新增低位目标格：
###########
#B#########
#S#PL....G#
#.........#
#..MM.....#
#..@M.....#
#...M.....#
#.........#
###########

B/S anchor 放进侧拉扫带：
###########
#.........#
#..PL.....#
#.........#
#..MM.....#
#..@M.....#
#....S....#
#....B....#
#....G....#
###########
```

共同解释：

这条不是“推一下再拉回来”的单箱往复。缺角本身是接口：第一手推动时玩家与 L 形同步换位，推动后不会完全脱离刚体，而是留下一个正交拉动面。第二手侧拉因此把原本直线的 push / pull 关系转成拐弯活塞。左右 / 上下镜像由机制对称性闭包，不作为独立证据；正式变量是新增 cell 相对第二手拉动扫带的位置。

机制角色：

- active_rule：P/L 场中的第一手 push 与第二手 pull 切换；sticky 刚体移动检查整块目标格集合。
- material_source：sticky L 形本体；B/S anchor 在本组只作为可被扫带推动的邻近 consumer。
- consumer：第二手拉动的正交目标格、向前横臂外侧墙门、竖腿低位墙门、B/S anchor 和 goal。
- incidental：P/L anchor 本体只提供场；不讨论锚点移动导致的边界重写。
- 关键观察点：`right` 之后的 `down` 是 `pull_object:sticky#1, move_sticky_rigid`，而无缺角横条的第二手只是 `walk`。

输入条件：

- L 形必须有玩家可站入的缺角；无缺角横条不会保留正交拉动接口。
- 第一手推动后，玩家前格和整块 sticky 的目标格必须开放。
- 第二手侧拉方向上的所有目标格都要可用；任何新增 cell 的目标格都可能成为墙门。
- 若要产生 downstream effect，邻近对象必须放在第二手侧拉扫带中。

输出状态：

- 基础 3-cell L：`right, down` 后整块转向位移，可用 `left, up` 两步回返。
- 向前长横臂：保留一推即侧拉，但新增外侧目标格；该格放墙会让第二手 `force_blocked`。
- 向后尾巴：保留一推即侧拉，主要改变回撤占格和尾部扫带，不等价于向前长横臂。
- 竖腿延长：保留一推即侧拉，但新增低位目标格；低位墙可直接阻断第二手。
- B/S anchor 扫带：第二手侧拉同时触发 `force_chain:n2` 与 `anchor_boundary_shift:box_sticky`，可把 anchor 推到 goal 上。

结构旋钮：

- 缺角：存在 / 去掉成横条。
- 横臂：基础、向前延长、向后尾巴。
- 竖腿：基础、向拉动方向延长。
- 门位：向前横臂外侧目标格、竖腿低位目标格、玩家前格。
- consumer：空扫带、墙门、B/S anchor、目标口、邻近可动件。

自然消费方式：

- 正交墙门：第一手允许推动，第二手侧拉才被新增目标格墙门拒绝。
- 短回返活塞：基础 L 和部分延长 L 能快速回返，可用作可逆门或计时器。
- 侧向扫带：把 B/S anchor 或其他可动件放进侧拉扫带，让活塞本身承担推进邻物的功能。
- 目标覆盖：B/S anchor 被扫带推到 goal 上，证明本族能产生非空目标效果。

常见 shortcut 与误用边界：

- 不要用左右 / 上下镜像填 case；机制对称性已经覆盖。
- 不要把普通横条的推后走动写成本族；它缺少第二手 pull。
- 只做 `right,left` 原路回撤太窄；本条的价值在 `right` 后立即正交 pull。
- 墙门必须落在第二手 sticky 目标格集合中；只挡无关通路会退化成普通地形门。
- B/S anchor 扫带如果没有目标或后续约束，只能算 event witness。

consumption probe：

`base_l_triomino_success` 证明基础缺角 L 的 `right, down` 是一推即侧拉；`bar_no_notch_walk` 证明无缺角横条退化为 walk。`top_arm_right_target_wall` 和 `vertical_leg_down_low_wall` 分别消费向前长横臂与长竖腿新增的目标格；`base_target_bs_anchor_swept` 把基础 L 的侧拉扫带接到 B/S anchor 和 goal，产生目标覆盖。

### 缺角立即侧拉的门位分类

接口卡片：
- 输入接口：玩家初始站在 2x2 L 形 sticky 的缺角中；第一手横向 push 把 L 形和玩家一起跨过 P/L 边界。
- 输出接口：第二手无需绕路即可正交 pull；同一两步结构可被玩家前格墙、L 形目标格墙或可移动邻物分类。
- 最小 consumer：无缺角横条作为退化错例；玩家前格墙消费 pull destination；形状目标墙消费 sticky 目标格；B/S anchor 替代目标墙后被扫带并覆盖目标。

局部结构谱：

```text
规范缺角：right 后立即 down pull
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#........#
##########

无缺角横条：right 后 down 只是 walk
##########
#B########
#S#PL...G#
#........#
#........#
#..@MM...#
#........#
##########

玩家前格墙：第二手 down 被 destination_blocked
##########
#B########
#S#PL...G#
#........#
#..MM....#
#..@M....#
#...#....#
##########

形状目标墙：第二手 down 被 force_blocked
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

这组把 L 形缺角活塞的“第二手立即成立”单独拆成门位分类。第一手 `right` 不只是移动 L 形，它还把玩家送到 L 侧；由于玩家起点在缺角里，落点正好保留正交 pull 接触面。第二手 `down` 先检查玩家前格，再检查 sticky 整块目标格；同一个目标格若不是墙而是可移动 B/S anchor，会从封门变成扫带资源。

对照关系：

- 缺角 L vs 横条：缺角 L 的第二手是 `pull_object:sticky#1`；横条没有身后对象，第二手退化为 `walk`。
- 开放 vs 玩家前格墙：同一 L 形、同一动作，墙在玩家前格时给 `destination_blocked`。
- 开放 vs 形状目标墙：墙在 L 形外部目标格时给 `force_blocked`，说明对象占格目标被消费。
- 形状目标墙 vs B/S anchor：同一目标位从墙换成 anchor 后，失败变成 `force_chain:n2 + anchor_boundary_shift:box_sticky`，并可覆盖 goal。
- 左下、左上、右下、右上缺角：只作对称闭包 evidence；正式结构变量不是方向，而是缺角、门位和目标格材料。

输入条件：

- 玩家必须在 L 形缺角中；站在外侧再绕路拉不属于本子谱。
- 第一手横向 push 后，玩家必须进入 pull side 且仍贴着 L 形正交邻接面。
- 第二手方向上的玩家前格和 L 形目标格需要分别可控，才能拆开 `destination_blocked` 与 `force_blocked`。
- 扫带 consumer 必须放在 L 形目标格集合中，不在扫带内的对象不能证明本接口。

输出状态：

- 立即侧拉：两步完成折向移动，不需要额外绕行。
- 前格封门：玩家 destination 被墙拒绝，L 形本体不移动。
- 形状封门：玩家前格开放，但 sticky 目标格集合撞墙。
- 扫带输出：B/S anchor 被侧拉扫带移动，目标覆盖成为最小 consumer。

结构旋钮：

- 缺角：有 / 无。
- 第二手方向：规范方向写 `down`；镜像方向只作对称来源。
- 墙位：玩家前格 / L 形外部目标格。
- 目标格材料：墙 / B/S anchor / 空地。
- 输出消费：回返、封门、扫带、目标覆盖。

自然消费方式：

- 门位教学：同一两步结构把玩家门和形状门分离，适合做局部分类器。
- 二步折向活塞：把横向 push 转成纵向 pull，可接回返门或目标口。
- 扫带资源：把目标墙位置换成 anchor、crate 或 sticky blocker，观察资源移交、合并或封门。
- 目标覆盖：B/S anchor 被扫到 goal 上，证明不是空事件。

常见 shortcut：

- 横条退化成 walk，不能写成 L 形活塞。
- 开放空间中绕到侧面再拉，不能证明“立即”接口。
- 只测镜像方向会浪费 case；镜像只收为机制对称闭包。
- B/S anchor 没接目标或后续约束时，只是扫带 witness。

审美风险：

这个结构很容易被玩家读成“L 形被推了一下”。它成为洞见，是因为玩家发现缺角站位让第一手 push 自动生成第二手 pull 接触面，而且不同墙位会精确区分玩家门和形状门。

误用边界：

- 本子谱不覆盖更大 polyomino 的完整形状分类；更大形状要回到主条目的非对称形状谱。
- P/L anchor 本体移动和边界重写不属于这里；这里只把 P/L 当作 push / pull 场。
- `returnToInitial.status=exhausted` 不能写成不可回返。

机制角色与归属边界：
- active_rule：P/L 场切换第一手 push 与第二手 pull；L 形缺角保留正交接触面；sticky 刚体目标格检查和 force chain 产生门位差异。
- material_source：B/S anchor 在非扫带 case 中只让 sticky 材料合法，在扫带 case 中是 consumer。
- consumer：横条错例、玩家前格墙、L 形目标墙、B/S anchor 和 goal。
- incidental：非扫带 case 的 goal 只保证 layout 合法。
- 关键观察点：第二手正交输入从 `walk` 变成 `pull_object:sticky#1`，以及墙位从 `destination_blocked` / `force_blocked` 转为 anchor 扫带。

证据：

`run=ra_loop_pl_l_notch_immediate_pull_20260708_01`, `cases=bl_notch_push_right_pull_down,tl_notch_push_right_pull_up,br_notch_push_left_pull_down,tr_notch_push_left_pull_up,bar_notch_absent_pull_degenerates_to_walk,bl_notch_down_front_wall_blocks_pull,bl_notch_down_target_wall_blocks_shape,bl_notch_down_sweeps_bs_anchor`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,supplement`

### stroke 后正交把手：凸脚位置、阶段墙与扫带

接口卡片：
- 输入接口：P/L 横向边界中，玩家先把 L 形 sticky 刚体水平推出；L 形凸脚位置和侧向把手格可控。
- 输出接口：横向 stroke 后生成或暴露一个正交 pull 把手；同一墙位可按凸脚位置消费第一手 stroke 或第二手侧拉。
- 最小 consumer：初始把手封墙证明把手由 stroke 生成；同一墙位分类第一手 / 第二手目标格；侧向目标格换成 B/S anchor 后被扫带并覆盖目标。

局部结构谱：

```text
下凸左脚：同一墙位不挡 right，但挡 down pull 的右臂目标格
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M.#..#
#........#
#........#
##########

下凸右脚：同一墙位变成第一手行程墙
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########

初始把手封住，stroke 后把手移到开放列
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#...M....#
#...#....#
#........#
##########

侧向目标格换成 B/S anchor，down pull 扫带并覆盖目标
##########
#........#
#..PL....#
#........#
#..@MM...#
#...M.S..#
#.....B..#
#.....G..#
##########
```

共同解释：

这组是主条目的宽松把手变体：玩家不一定从缺角里立即侧拉，但 P/L 横向 stroke 能把 L 形凸脚从无效位置移动到新的侧向把手列。L 形凸脚在 stroke 方向前侧还是后侧，决定同一墙位第一次被谁消费：前侧凸脚可能让第一手 `right` 直接撞墙；后侧凸脚允许 stroke 成立，但第二手侧向 pull 时右臂目标格撞墙。

对照关系：

- 下凸左脚 vs 下凸右脚：同一墙位从第二手侧拉目标墙变成第一手行程墙。
- 上凸左脚 vs 上凸右脚：镜像方向复现同一阶段差异，只作为对称闭包 evidence。
- 初始把手封墙 vs stroke 后开放：排除“开放房间里 L 形本来就能侧拉”的解释，证明把手由横向 stroke 生成。
- 侧向目标墙 vs B/S anchor：同一目标位由封门变成扫带资源，证明它是可设计 consumer。

输入条件：

- L 形必须先被 P/L 横向 stroke 移位；直接站在侧面拉的开放场景不属于本子谱。
- 凸脚位置要能相对同一墙位前 / 后切换，才能拆出第一手墙和第二手墙。
- 玩家必须能在 stroke 后到达或已经处于侧向 pull 把手位。
- 扫带对象必须位于第二手侧向 pull 的目标格集合中。

输出状态：

- stroke 生成把手：横向推后，凸脚和玩家站位组合出新的正交 pull 接口。
- 阶段墙：同一墙位按凸脚朝向成为 first-stroke blocker 或 lateral-pull blocker。
- 扫带邻物：侧向 pull 推动 B/S anchor 并可覆盖 goal。
- 回返未知时只写 bounded 结论，不写全局不可回返。

结构旋钮：

- 凸脚位置：左脚 / 右脚，或上凸镜像。
- 把手格：初始封闭 / stroke 后开放。
- 墙位：第一手行程目标格 / 第二手侧向目标格。
- 目标格材料：墙 / B/S anchor / 空地。
- 输出消费：把手生成、阶段分类、扫带、目标覆盖。

自然消费方式：

- 把手门：要求玩家先做横向 stroke 才能获得侧向 pull。
- 阶段分类器：同一墙位按 L 形凸脚位置区分第一手失败和第二手失败。
- 扫带 driver：把侧向目标墙替换为 anchor 或 crate，侧拉成为移动邻物的 driver。
- recipe 接口：`横向 stroke -> 正交把手 -> 扫带对象 / 回返门`。

常见 shortcut：

- 如果初始侧向把手本来开放，玩家可能不需要 P/L stroke。
- 如果墙位没有进入任何目标格集合，只是普通地形墙。
- 只收左右 / 上下朝向对照会把对称性误写成设计空间。
- B/S anchor 作为扫带对象时，不应把本子谱改名成 B/S 边界结构。

审美风险：

这个变体比缺角立即侧拉更松，容易退化成“L 形可移动”。它有价值的时刻，是 stroke 前后把手可达性或同一墙位的消费阶段发生变化。

误用边界：

- 不把四个朝向都写成正式变量；正式变量是凸脚相对行程墙和侧向目标格的位置。
- 不把 `force_blocked` 写成不可回返；它只说明当前阶段目标格关闭。
- 不把扫带 case 的 exhausted return 写成不可逆。

机制角色与归属边界：
- active_rule：P/L 横向 stroke 制造侧向 pull 站位；sticky L 形刚体目标格检查制造阶段墙；force chain 让侧向目标格中的 B/S anchor 被扫带。
- material_source：B/S anchor 在非扫带 case 中只保持 sticky 材料合法；在扫带 case 中是可移动邻物 consumer。
- consumer：同一墙位、初始把手封墙、B/S anchor 和 goal。
- incidental：非扫带 case 的 goal 只保证 layout 合法。
- 关键观察点：同一墙位在不同凸脚位置中第一次改变动作结果的位置，以及 `dl_piston_shift_opens_lateral_handle` 中 stroke 后把手可达性改变。

证据：

`run=ra_loop_pl_l_shape_lateral_handle_20260708_01`, `cases=dl_foot_side_wall_blocks_lateral_only,dr_foot_same_wall_blocks_first_stroke,ul_foot_up_pull_right_target_wall,ur_foot_same_wall_blocks_first_stroke,dl_piston_shift_opens_lateral_handle,dl_lateral_sweeps_bs_anchor_to_goal`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe,supplement`

推荐 probe：

如果继续探索，应优先测试新的非对称形状接口或侧拉扫带驱动不同对象的 recipe；不要补左右 / 上下镜像，也不要把普通组合写入 backlog。

证据：

`run=ra_loop_pl_l_notch_shape_spectrum_20260708_01`, `cases=base_l_triomino_success,bar_no_notch_walk,top_arm_right_success,top_arm_right_target_wall,top_arm_left_tail_success,vertical_leg_down_success,vertical_leg_down_low_wall,base_target_bs_anchor_swept`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`
