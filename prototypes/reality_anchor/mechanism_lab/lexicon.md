# Reality Anchor 可组合局部结构词典

本文件由 mechanism curator 从局部实验 run 中整理。它只收录可复用的局部结构族，不收录完整关卡设计，也不收录一阶规则复述。

本次 refresh 后的收录门槛：正式条目必须至少证明“起作用的可能性”，即结构输出被一个极小后续约束消费过。只有事件 witness 或单纯结构差异的材料，保留在 run / refresh 记录中，不作为顶层 lexicon 条目。

当前短索引见 `lexicon_index.md`；下一轮探索缺口见 `backlog.md`。历史 refresh / decision 文件是当时的 curator 快照，不作为当前状态入口。

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

## B/S 绑定债：箱资源生成刚体 footprint

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

这条不是“crate 变 sticky”。它的 designer 接口是：多个可分配箱子被 B/S 边界压成一个刚体 footprint，designer 得到横条、L 形、独立部件或宽塞材料，同时失去分别摆放这些箱子的自由。

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
- 如果后续墙口不消费 footprint 差异，玩家只会看到事件 witness。

审美风险：

只展示箱子变黏块会像教学事件。它成为玩家洞见的时刻，是玩家意识到“我需要主动把资源压成某个 footprint，才能满足后续墙口或门口的输入要求”。

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

这组补充把 “crate 邻接图” 旋钮扩到既有 sticky 端点：crate 跨 B/S 边界后变成桥格，若正交邻接到端点，会合并成二格或三格 sticky footprint。目标口宽消费的是连接 footprint，而不是 sticky 材质本身；无端点时单格 sticky 可进同一目标口，打开三格口宽后桥接出的三格刚体也可整体推进。一个端点的反例修正了“只是三格太长”的解释，说明单格口拒绝的是任何越出口宽的 connected footprint。

推荐 probe：

继续补 `L 形 / 横向桥接 / 桥接后切割` 进入同一墙口或目标口的 composition probe，证明玩家必须选择正确绑定形状才能满足后续输入。

组合例句：

`绑定债 -> 刚体墙口回返谱系`：玩家先把 crate 绑定成目标 footprint，再让墙口消费这个 footprint；少绑一个或绑成 L 形会在同一墙口给出不同回返/把手结果。

证据：

`run=ra_struct_binding_unbinding_01`, `cases=bind_bar_open,bind_l_corner,bind_gap_keeps_parts,bind_bar_choke`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

`run=ra_struct_bridge_merge_mouth_01`, `cases=bridge_merge_single_mouth_block,no_endpoints_single_mouth_pass,bridge_merge_triple_mouth_pass,bridge_merge_upper_only_single_mouth_block`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 固定 B/S 切割：C+M 尾巴与单格目标袋

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

固定 B/S 边界可以把一个横向 sticky 二连块切成 `C+M`：左格变成可分配 crate，右格保留 sticky 尾巴。这个结构不是“sticky 变 crate”的事件 witness；它的接口是把一个共享 footprint 解成“可单独上推的左格 + 留在旁边的尾债”。单格目标袋消费这个输出：`C+M` 和 `CC` 能只把左格推进目标，未切开的 `MM` 会因为右上墙格而 `force_blocked`。把右上墙格打开成双格袋口后，未切开的 `MM` 也能整体通过。

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

`split_tail_single_pocket_pass` 对比 `all_sticky_single_pocket_block` 证明单格目标袋消费了 `C+M` 与 `MM` 的差异；`all_sticky_two_cell_pocket_pass` 修正解释，说明不是 sticky 不能进袋，而是单格袋口拒绝完整 footprint；`all_box_single_pocket_pass` 说明可分离资源同样通过，隔离出“可分离左格”这个输出接口。

推荐 probe：

禁用 `box_sticky_normalize` 验证切割消失；扩展 L 形与三格横条，比较 `C+MM`、`CC+M`、`MMM` 在同一目标袋的尾债谱；再把 sticky 尾巴接到刚体墙口回返谱系，做 composition probe。

组合例句：

`绑定债 -> 固定边界切割 -> 单格目标袋`：玩家先生成 sticky 横条，再把它推过固定 B/S 边界切成 `C+M`；目标袋消费左格 crate，右侧 sticky 尾巴成为下一段结构的输入。

证据：

`run=ra_struct_fixed_boundary_split_pocket_01`, `cases=split_tail_single_pocket_pass,all_sticky_single_pocket_block,all_sticky_two_cell_pocket_pass,all_box_single_pocket_pass`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 固定 B/S 断桥：sticky split 端点目标袋

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

C 形未切断，同动作被整体 footprint 阻断：
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

固定 B/S 边界可以把一个 C 形 sticky 刚体切断成“左侧 crate 桥 + 右侧两个独立 sticky 端点”。这不是单纯的 `sticky_split` 事件见证；它的可组合接口是端点独立性。上方单格目标袋消费这个接口：切断后或预先分离时，上端点可单独进目标；未切断时，C 形仍共享 footprint，同一上推动作会被整体形状和玩家站位冲突阻断。

输入条件：

- 一个 C 形 sticky footprint：上端点、左柱桥、下端点正交连接。
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
- 接刚体墙口：未切断 C 形作为错误形状反例，切断端点作为小 footprint 输入。
- 接固定 B/S 切割谱：从二连 `C+M` 扩展到多组件 split。

常见 shortcut：

- 没有下方站位时，切断只停在事件 witness，目标袋无法消费。
- 如果 C 形一开始就断开，成功只能说明端点独立可用，不证明边界切断必要。
- 如果目标袋放宽到能容纳整个 footprint，未切断反例会弱化。
- 左侧 crate 桥如果没有后续约束，玩家可能只记住“端点进目标”，忽略切断债务。

审美风险：

这个结构容易被误写成“B/S 会 split”。它成为玩家洞见的时刻，是玩家主动把连接 footprint 推过边界，制造可分配端点，同时接受 crate 桥债。

consumption probe：

`split_cshape_upper_pocket_pass` 对比 `unsplit_cshape_upper_pocket_block` 证明目标袋消费了端点是否独立；`split_cshape_no_stand_block` 说明 `sticky_split` 需要站位才能起作用；`pre_split_endpoints_upper_pocket_pass` 说明真正被消费的是端点独立性，而不是事件名。

推荐 probe：

禁用 `box_sticky_normalize` 验证 split 消失；增加下端点目标袋，测试上下端点分配；把左柱 crate 桥接入单格通道或墙口，验证 crate 桥债能否成为第二段消费。

组合例句：

`绑定债 -> 固定边界断桥 -> 端点目标袋`：玩家先生成连接 footprint，再把它推过固定 B/S 边界断开；上端点被目标袋消费，crate 桥或下端点成为后续输入。

证据：

`run=ra_struct_sticky_split_pocket_01`, `cases=split_cshape_upper_pocket_pass,unsplit_cshape_upper_pocket_block,split_cshape_no_stand_block,pre_split_endpoints_upper_pocket_pass`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 刚体黏块 + 墙口：反向施力格谱系

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

同一次刚体推进是否能回返，不由“黏块能不能被推”决定，也不只由玩家能否绕到附近决定。关键是推进后是否存在可达的反向施力站位格。直条通常看端点外侧余量，2x2 需要整面外侧余量，L 形可能通过侧向凸出格提供把手。

输入条件：

- 已经有某种 sticky 刚体 footprint：2 格条、3 格条、4 格条、2x2 或 L 形。
- 该 footprint 被送到墙口、单列通道、窄口或把手附近。
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
- 接目标回填或通道封锁：正确 footprint 通过，错误 footprint 失去回返或把手。

常见 shortcut：

- 墙口太宽会让所有长度都可回返。
- 只让玩家绕到附近不等于有反向施力格；2x2 窄口是反例。
- L 形如果侧把手开放，可能绕过“长条不可回返”的预期。

审美风险：

如果玩家只是在推一个已经给好的块，它可能只是移动性知识点；如果前置结构要求玩家主动生成特定 footprint，它会变成“形状构造 -> 地形消费”的洞见。

consumption probe：

`sticky3_narrow_mouth_push_right` 对比 `sticky3_wide_mouth_push_right`、`sticky4_wide_for_3_not_4_push_right` 对比 `sticky4_extra_wide_push_right`、`lshape_handle_open` 对比 `lshape_handle_blocked_by_wall` 都证明墙格/把手约束实际消费了 footprint。

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

这组补充把墙口消费从“推进后能否回返”扩到“推进前沿是否完整开放”。双格 sticky 是一个刚体 footprint，推动下格时上格目标位也必须开放；两个 crate 或单格 sticky 没有这个连带目标位，因此能进入同一目标口。常见误用边界是：上沿墙齿少一格时双格 sticky 也能通过；对象没有 merge 时下格可以独立通过。

推荐 probe：

把 B/S 绑定债产出的 2 格、3 格、L 形放进同一墙口，跑 composition probe，验证 producer 输出与本条 consumer 输入能稳定串接。另可把移动边界刷子产出的 `CC`、`C+M`、`C+MM`、竖向 sticky pair 接入同一前沿墙齿目标口，验证刷产物是否被目标口稳定消费。

组合例句：

`绑定债 -> 3 格横条 -> 窄口吞掉回返站位`：玩家需要主动多绑定一个箱子，让输出从 2 格条变成 3 格条，才能让墙口产生不可回返承诺。

证据：

`run=ra_pilot_wall_motion_01,ra_probe_reverse_force_cell_02,ra_struct_rigid_tooth_consume_01`, `cases=sticky2_single_lane_push,sticky2_loop_room_push,sticky3_narrow_mouth_push_right,sticky3_wide_mouth_push_right,sticky4_wide_for_3_not_4_push_right,sticky4_extra_wide_push_right,square2_narrow_push_right,square2_wide_push_right,lshape_handle_open,lshape_handle_blocked_by_wall,rigid_pair_tooth_block,crate_pair_tooth_lower_pass,rigid_pair_open_mouth_pass,single_sticky_tooth_pass`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## B/S 移动边界刷产物：远程生成与门口消费

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

移动的是 B/S 边界线，不是远处对象。边界跨过 footprint 时，远处资源被改写成 `CC`、`C+M`、`C+MM`、2x2 sticky 或双柱 sticky；这些产物进入同一个门口后，会被消费成箱链推进、单箱进门加尾债、footprint 门封锁或分柱推进。

输入条件：

- 有一个可移动 B/S anchor，边界能相对远处 footprint 跨线。
- 远处 footprint 可以是横条、竖条、L 形、两行对齐或两行隔列。
- driver 可以是 push、pull 或力链搬运；除非 driver 造成新的站位门，否则只是输入侧旋钮。
- 若要正式起作用，需要一个门口、低墙、目标口或通道消费刷产物。

输出状态：

- 下刷可把 sticky 横条回收为 `CC`。
- 下刷可切出 `C+M` 或 `C+MM`，形成单箱资源加尾债。
- 上刷可把 crate 行绑定到 sticky 行，形成 2x2 或两个分柱。
- 门口消费后，产物表现为箱链、尾债、footprint gate 或分批工具。

结构旋钮：

- 边界运动方向：跨线刷 / 沿边界平移。
- 被扫 footprint：横条 / 竖条 / L 形 / 2x2 候选 / 双柱。
- 门口消费面：开放口 / 低墙 footprint 门 / 列间隙。
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
- `door_square_blocked_by_low_wall`：2x2 被低墙 footprint gate 封住。
- `door_split_columns_one_column_passes`：分柱产物可先消耗一列。

自然消费方式：

- 接门口：比较 `CC`、`C+M`、`C+MM`、2x2、双柱在同一口的消费差异。
- 接目标回填：用释放出的 crate 覆盖目标，同时留下或不留下尾债。
- 接刚体墙口：把上刷生成的大 footprint 再交给回返谱系。

常见 shortcut：

- 只移动边界但不提供消费口时，玩家只会看到资源形态变化。
- 门口太宽会让 `C+M` 和 `C+MM` 的尾债差异不可见。
- 低墙少一格时，2x2 footprint gate 可能不再关闭。
- 把 push 刷和 pull 刷拆成两个顶层条目会重复；它们通常只是 driver 差异。

审美风险：

边界刷很容易变成“远程事件按钮”。它成为玩家洞见的时刻，是玩家意识到自己在选择刷产物，并且这个产物会被下游门口以不同方式消费。

consumption probe：

`door_cc_chain_push`、`door_cm_tail_push`、`door_cmm_tail_push`、`door_square_blocked_by_low_wall`、`door_split_columns_one_column_passes` 证明刷产物在同一门口中被消费成不同动作对象。`door_cmm_tail_push` 的回返搜索耗尽，只作为产物状态和动作表证据。

推荐 probe：

补目标回填版本：比较 `CC`、`C+M`、`C+MM` 在同一目标口中是否产生“覆盖目标但留下不同尾债”的差异。

组合例句：

`移动边界刷子 -> 门口消费谱 -> 目标回填`：玩家先移动 B/S 边界选择刷产物，再把刷产物送入同一门口；错误产物要么 footprint 被墙挡住，要么留下无法处理的尾债。

证据：

`run=ra_struct_boundary_pull_01,ra_struct_consumption_01`, `cases=brush_down_bar_full_release,brush_down_vertical_partial,brush_down_l_tail,brush_parallel_preserve_bar,brush_up_bind_square,brush_up_gap_keeps_columns,door_cc_chain_push,door_cm_tail_push,door_cmm_tail_push,door_square_blocked_by_low_wall,door_split_columns_one_column_passes`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

输入侧补充：

`pull_brush_*` 与 `pull_brush_stroke_selector` 不作为独立顶层条目。它们说明同一移动边界刷子可以由 P/L pull 驱动，并能用距离 / stroke 调位；除非 driver 产生新的消费关系，否则归入本条输入侧。

## P/L 长轴墙廊：L 端余量棘轮

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
- 玩家是否能绕到 L 侧但仍缺长轴反向 force。

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

## P/L 横向把手：玩家前格门与锚点 footprint 门

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

- 用作把手分类器：同样看似相邻的墙格，关闭的是玩家动作、对象 footprint，还是回返。
- 接移动边界刷子：P/L 可以作为 driver，但要先判断前格门和 footprint 门。
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

`P/L 横向把手门 -> 移动边界刷子`：玩家需要先打开正确 pull 前格或 footprint 门，才能把 B/S anchor 抽到刷线位。

证据：

`run=ra_probe_pl_wall_anchor_03`, `cases=p_side_push_down_open_loop,p_side_push_down_other_half_wall,p_side_push_down_l_front_wall_after_shift,l_side_pull_up_open_loop,l_side_pull_up_front_wall,l_side_pull_up_p_target_wall`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

## P/L pull 抽取把手：前格门、footprint 门与扫带

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

pull 抽取不是“身后有对象即可”。它拆成三层门：玩家前格门、对象 footprint 目标门、侧向 blocker 的可移动性。单 crate 和沿轴二格物体主要消耗玩家前格；垂直二格物体还需要侧向目标位；侧向目标位放墙会封门，放 crate 会变成扫带资源。

输入条件：

- 玩家处于 pull 侧，身后有 crate、B/S anchor 或其他可拉 footprint。
- 玩家前格必须可进入。
- 被拉对象每个 footprint 目标格必须可用，或可由 force chain 推走。
- 侧向 blocker 类型可控：墙、crate、sticky 或空格。

输出状态：

- 单格对象被抽入玩家旧格。
- 沿轴二格 anchor 被整体抽出。
- 垂直二格 anchor 因侧向目标位开放/封闭而合法或非法。
- 侧向 crate 被同步扫带，成为额外资源移交。

结构旋钮：

- 玩家前格：开放 / 墙封。
- 身后 footprint：单格 / 沿轴二格 / 垂直二格。
- 侧向目标位：空格 / 墙 / 可移动 crate。
- 抽取后前格是否被新对象反向封住。

自然消费方式：

- 用作 B/S anchor 的远程把手。
- 用作口袋资源抽取器：把 crate 拉到玩家旧位。
- 用作侧向扫带：把本来封闭的 footprint 目标格变成同步移动资源。

常见 shortcut：

- 只封玩家前格会关闭所有 pull，但不测试 footprint 门。
- 只测试单 crate 会漏掉垂直 footprint 的侧向目标要求。
- 侧向墙换成 crate 后，封门会变成扫带 shortcut。

审美风险：

单 crate 抽取本身偏基础；垂直 footprint 与侧向 blocker 的比较更像可设计语料，因为玩家需要理解“拉动时对象整个 footprint 都要有去处”。

consumption probe：

`pull_crate_front_wall` 消费玩家前格；`pull_bs_vertical_side_wall` 消费对象 footprint 目标格；`pull_bs_vertical_side_sweep_crate` 把封门格改成扫带资源，证明侧向 blocker 类型改变后续动作集合。

推荐 probe：

把侧向 blocker 从 crate 换成 sticky 部件，比较扫带后是资源移交、刚体合并，还是 footprint 关闭。

组合例句：

`P/L pull 抽取把手 -> B/S 移动边界刷子`：玩家先用 pull 抽出 B/S anchor，再让边界线跨过远处 footprint；如果前格或侧向目标位放错，刷子无法启动或产生扫带 shortcut。

证据：

`run=ra_struct_boundary_pull_01`, `cases=pull_crate_pocket_extract,pull_crate_front_wall,pull_bs_horizontal_axis,pull_bs_vertical_side_open,pull_bs_vertical_side_wall,pull_bs_vertical_side_sweep_crate`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`
