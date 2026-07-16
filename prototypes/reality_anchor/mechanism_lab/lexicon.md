# Reality Anchor 局部结构词典

本文件由 mechanism curator 从局部实验 run 中整理。它只收录可复用的局部摆法和动作关系，不收录完整关卡设计，也不收录一阶规则复述。

本次 refresh 后的收录门槛：正式条目必须至少证明某个具体摆法会影响后续动作。只有事件 witness 或单纯结构差异的材料，保留在 run / refresh 记录中，不作为顶层 lexicon 条目。

当前短索引见 `lexicon_index.md`；下一轮探索缺口见 `backlog.md`。历史 refresh / decision 文件是当时的 curator 快照，不作为当前状态入口。

## 组合矩阵

| 前一段摆法 | 中间留下的形状或空位 | 后一段怎样利用 |
| --- | --- | --- |
| `B/S 边界黏合` | 二格 sticky 横条 | `黏块过墙口的通过与回推条件`；`固定 B/S 切割` |
| `B/S 边界黏合` | sticky L 形 | `黏块过墙口的通过与回推条件`中的凸角操作位和前沿墙 |
| `B/S 边界黏合`中的隔行进入 / 桥格黏合 | 两个分开的 sticky 部件 / 桥接端点形成的更大连体块 | 目标口宽和连体块前沿墙 |
| `固定 B/S 切割` | `C+M`：左边箱子可单独推动，右边留下 sticky | 左边箱子进入单格目标袋 |
| `黏块过墙口的通过与回推条件` | 条形 / L 形 / 2x2 黏块 | 墙口决定能否通过，以及通过后能否走到另一侧推回来 |
| `Pull 侧对象可动性` | 拉动后的单箱 / 单格 sticky / 多格 sticky | 单格墙口袋、目标格墙和回推通路 |
| `B/S 移动边界：箱组变为 CC、C+M 或黏块` | `CC` / `C+M` / `C+MM` / 2x2 / 双柱 | 门口、低墙、列间隙与目标口宽 |
| `P/L 锚点在横廊中的可动性` | 能移动几格，以及拉动后能否返回 | 墙廊端点、一次性开关与门闩 |
| `P/L 横向把手` | 首步合法 / 玩家目标格为墙或动作后仍被占 / 锚点目标格被挡 / 移动后无法返回 | 玩家目标格墙、锚点目标格墙与 carried-crate 目标墙 |
| `P/L 锚点移位：腾出旧半格并改变推拉侧` | 旧 L 半格成为新操作位 / 侧边对象落到 push 侧 | 单格目标袋与侧边 crate 接力 |
| `P/L pull 抽取` | 沿轴抽出 / 目标格被挡 / 侧向扫带 | B/S anchor 远程抽出、口袋箱抽取与侧向 crate 扫带 |
| `P/L 边界交接` | 单箱被拉入玩家旧格 | 目标口袋 |
| `P/L 边界交接` | 箱链只拉回近端箱，远端箱仍留在原处 | `边界活塞的对象差异`；拉走近端箱后打开单格口 |
| `P/L 边界交接` | sticky 连体块被拉回 | `边界活塞的对象差异`中的形状墙口与回返门 |
| `边界活塞的对象差异`中的单箱 | 推入时覆盖目标，拉回时目标重新空出 | `单箱目标活塞顺序锁` |
| `P/L L形缺角活塞` | 第一手 push 后立即保留正交 pull 接触面 | `缺角立即侧拉的墙位分类`中的玩家前格墙、形状目标墙与扫带目标 |
| `P/L L形缺角活塞`中的横向 stroke | 横推后出现正交 pull 操作位 | `横推后出现的正交操作位`中的凸脚位置、阶段墙与 B/S anchor 扫带 |

证据来源：

- `ra_pilot_wall_motion_01`
- `ra_probe_reverse_force_cell_02`
- `ra_probe_pl_wall_anchor_03`
- `ra_struct_binding_unbinding_01`
- `ra_struct_boundary_pull_01`
- `ra_struct_consumption_01`
- `ra_curator_refresh_01`
- `ra_struct_fixed_boundary_split_pocket_01`
- `ra_struct_bridge_merge_mouth_01`
- `ra_loop_bind_mouth_composition_20260707_01`
- `ra_loop_bind_shape_spectrum_20260707_01`
- `ra_loop_pull_boundary_mobility_20260708_01`
- `ra_loop_pl_piston_20260708_01`
- `ra_loop_pl_l_shape_lateral_handle_20260708_01`
- `ra_loop_pl_l_notch_immediate_pull_20260708_01`
- `ra_loop_pl_l_notch_shape_spectrum_20260708_01`
- `ra_loop_pl_single_crate_goal_piston_lock_20260708_01`

## B/S 边界黏合：箱组形成横条或 L 形黏块

局面卡片：
- 开始摆法：两个以上 crate 位于 B/S 边界附近，可以相邻、排成 L 形或隔行进入 sticky 侧。
- 关键动作：玩家把这些箱子依次推过 B/S 边界。
- 动后局面：相邻箱子粘成横条或 L 形连体块；隔行进入的箱子仍是两个分开的 sticky 部件；桥接既有端点时会形成更大的连体块。
- 最小用法：单行走廊和目标口宽直接决定这些形状能否通过。

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

这条不只是在说“crate 变 sticky”。多个箱子被推过 B/S 边界后，会按相邻位置粘成横条、L 形或更大的连体块；隔行进入则仍是几个分开的部件。箱子一旦粘住，玩家就不能再分别摆放它们。

开始条件：

- 至少两个 crate 能跨入 sticky 侧。
- crate 入场时的正交邻接图可控：相邻、晚接入成 L、隔行不接触。
- 玩家有足够站位把 crate 推过边界，或者有等价 driver 让箱组跨线。
- 动作后紧接一个单行走廊、墙口或回返站位，才能让不同黏块形状马上表现出差异。

动后局面：

- 相邻 crate 变成 2 格横条 sticky 工具。
- 第三个 crate 可把横条改成 L 形占角件。
- 隔行入场会得到两个独立 sticky 部件，而不是一个刚体。
- 横条进入单行走廊后会横着塞住通道，只能继续左右推动。

结构旋钮：

- crate 邻接图：横向相邻 / L 形 / 隔行。
- 地形余量：开放房间 / 单行走廊 / 是否可绕到侧面。
- 入场节奏：一次压入一排 / 先横条再接第三格。
- 后续站位：刚体前方、侧边、背侧是否留有玩家可站的格子。

变体谱：

- `bind_bar_open`：最终形成 2 格横条；开放房间里四向动作都可用，回返 depth 12。
- `bind_l_corner`：第三箱粘上后形成 L 形；最终 `up:force_blocked`，回返 depth 13。
- `bind_gap_keeps_parts`：同在 sticky 侧但隔行，仍是两个独立 sticky 部件；这说明变成 sticky 不等于彼此粘住。
- `bind_bar_choke`：同样 2 格横条进入单行走廊，最终只剩 `left/right`，回返搜索 complete 为 no；这是本条的 consumption probe。

可以接着怎么用：

- 接到“刚体黏块 + 墙口回返谱系”：用横条、长条或 L 形去测试回返站位格。
- 接到门口或目标口：横条可作门闩，L 形可作占角件。
- 接到固定 B/S 切割或移动边界：先粘成连体块，再把其中一格切回可单独推动的箱子。

常见 shortcut：

- 空间太宽时，箱子粘成一块后仍能从各方向移动，不形成取舍。
- crate 隔行入场会保留多个部件，玩家可能绕过“必须合体”的意图。
- 如果后面的墙口对横条、L 形和分离部件一视同仁，玩家只会看到箱子变黏块的规则演示。

审美风险：

只展示箱子变黏块会像教学事件。真正需要思考的是：玩家必须主动把箱子粘成某个形状，才能穿过或堵住后面的墙口。

最小用法验证：

`bind_bar_choke` 把同样的横条放入单行走廊，动作集合从开放房间的四向可用收窄到左右处理，并且局部回返搜索 complete 为 no。

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

这组补充把 crate 的相邻摆法扩到既有 sticky 端点：crate 跨 B/S 边界后变成桥格，若正交贴着端点，就会粘成二格或三格 sticky 连体块。目标口检查的是整块形状，而不只是 sticky 材质：没有端点时，单格 sticky 能进同一个目标口；把口宽打开到三格后，桥接出的三格连体块也能整体推进。只桥接一个端点时仍过不了单格口，说明问题不是“三格太长”，而是连体块有任何一格超出开口都会被挡住。

归属边界：

`ra_loop_bind_mouth_composition_20260707_01` 与 `ra_loop_bind_shape_spectrum_20260707_01` 不作为 B/S 边界证据。两组 run 中，B/S 只负责把 crate 变成 sticky；关键观察点发生在后续右推 sticky 连体块进墙口时，此时差异来自 `sticky rigid movement + wall mouth`，不是来自 B/S 边界位置或跨线时机。它们应归入“黏块过墙口”的对象行为。

后续可验证的接法：

继续研究 B/S 边界黏合时，关键差异必须仍由边界造成：例如跨线顺序决定箱子是否相邻粘住，边界位置决定某格是 C 还是 M，或移动边界后留下不同箱组。不要把“先把所有对象送到 sticky side，再研究 sticky 行为”的 run 写成 B/S 边界语料。

最短接法：

`B/S 边界黏合 -> 黏块过墙口`：玩家先把 crate 粘成目标形状，再送进墙口；少粘一个箱子或粘成 L 形，会改变能否通过以及通过后能否走到另一侧推回来。

证据：

`run=ra_struct_binding_unbinding_01`, `cases=bind_bar_open,bind_l_corner,bind_gap_keeps_parts,bind_bar_choke`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

`run=ra_struct_bridge_merge_mouth_01`, `cases=bridge_merge_single_mouth_block,no_endpoints_single_mouth_pass,bridge_merge_triple_mouth_pass,bridge_merge_upper_only_single_mouth_block`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 固定 B/S 切割：二格黏块分成箱子和黏块

局面卡片：
- 开始摆法：横向二格 sticky 连体块位于固定 B/S 边界旁，边界能切在两格之间，玩家能绕到左格下方。
- 关键动作：玩家横推二格黏块跨过边界，再从下方单独上推左格。
- 动后局面：左格变回可单独推动的 crate，右格仍是 sticky；未切开的 `MM` 仍会一起移动。
- 最小用法：单格目标袋只容得下左边箱子；袋口放宽到两格后，未切开的 `MM` 也能整体进入。

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

固定 B/S 边界可以把横向二格 sticky 切成 `C+M`：左格变回可单独推动的 crate，右格仍是 sticky。单格目标袋让这个差异马上可见：`C+M` 和 `CC` 都能只把左格向上推入目标；未切开的 `MM` 会整体上移，因此被右上墙格挡住。把右上墙格打开成双格袋口后，`MM` 也能整体通过。

开始条件：

- 一个横向二格对象，通常是箱子经过 B/S 边界后粘成的 sticky 横条，也可以用 `CC` 作可分离对照。
- 固定 B/S anchor 的边界能放在推后两格之间，或作为反例放在两格左侧 / 右侧。
- 玩家能先横推二连块跨边界，再绕到左格下方。
- 左上是目标袋，右上墙格控制袋口是否只容纳一格。

动后局面：

- `C+M`：左格 crate 可单独推入目标袋，右格 sticky 留在旁边。
- `MM`：仍是横向刚体，单格袋口失败，双格袋口通过。
- `CC`：本来可分离，单格袋口通过，但不能证明边界切割本身。

结构旋钮：

- B/S 边界位置：切在两格之间 / 两格都在 sticky side / 两格都在 box side。
- 袋口宽度：单格 / 双格。
- 后续施力方向：从下方推左格，而不是从水平侧继续形成 force chain。
- 对象来源：先让箱子粘成 sticky 横条，或直接给 `CC` 作对照。

变体谱：

- `split_tail_single_pocket_pass`：第一步产生 `sticky_to_box:n1`，动后为 `C+M`；后续 `up` 合法，crate 覆盖目标。
- `all_sticky_single_pocket_block`：同一动作串到最后 `up:force_blocked`，因为 `MM` 的右格前方是墙。
- `all_sticky_two_cell_pocket_pass`：打开右上格后，`MM` 整体上推并覆盖目标。
- `all_box_single_pocket_pass`：`CC` 也能只推左格，说明关键是左格能否单独移动，不是对象材质。

可以接着怎么用：

- 接 B/S 边界黏合：先把箱子粘成 sticky 横条，再用固定边界切出可单独推动的左格。
- 接目标回填：左格 crate 覆盖目标，右格 sticky 留在旁边，还要另找通路或目标处理。
- 接黏块墙口：把右格 sticky 或未切开的 `MM` 送到下一处墙口，继续检查形状能否通过。

常见 shortcut：

- 右上墙少一格时，未切开的 `MM` 也能通过，切割差异消失。
- 玩家如果不能绕到左格下方，只会看到 `sticky_to_box` 事件，无法实际利用左格已经能单独推动这一点。
- 从水平侧继续推 `C+M` 时，crate 和 sticky 可能通过 force chain 同步移动，削弱“可分离左格”的差异。
- 直接给 `CC` 的成功只是对照，不应写成固定边界切割的证据。

审美风险：

如果只展示跨边界变成 `C+M`，它仍像规则展示。真正的取舍是：玩家为了把左边箱子推进单格目标袋，必须把横条切开，同时把右边 sticky 留在外面继续处理。

最小用法验证：

`split_tail_single_pocket_pass` 对比 `all_sticky_single_pocket_block` 证明单格目标袋能区分 `C+M` 与 `MM`；`all_sticky_two_cell_pocket_pass` 说明不是 sticky 不能进袋，而是单格袋口容不下完整连体块；`all_box_single_pocket_pass` 说明 `CC` 同样能只推左格，关键是左格能否单独移动。

后续可验证的接法：

禁用 `box_sticky_normalize` 验证切割消失；扩展 L 形与三格横条，比较 `C+MM`、`CC+M`、`MMM` 在同一目标袋外分别会留下几格 sticky；再把这些剩余 sticky 接到黏块墙口，做 composition probe。

最短接法：

`B/S 边界黏合 -> 固定边界切割 -> 单格目标袋`：玩家先把箱子粘成 sticky 横条，再推过固定 B/S 边界切成 `C+M`；左边 crate 进入目标袋，右边 sticky 留给下一段处理。

证据：

`run=ra_struct_fixed_boundary_split_pocket_01`, `cases=split_tail_single_pocket_pass,all_sticky_single_pocket_block,all_sticky_two_cell_pocket_pass,all_box_single_pocket_pass`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## 黏块过墙口的通过与回推条件

局面卡片：
- 开始摆法：2 格条、3 格条、4 格条、2x2 或 L 形 sticky 连体块位于墙口或窄通道前。
- 关键动作：玩家把整块黏块推进墙口，并尝试绕到另一侧把它推回来。
- 动后局面：墙口可能直接挡住黏块前沿；也可能允许进入，却让玩家到不了另一侧操作位。
- 最小用法：墙口宽度、前沿墙齿和墙后的站位共同决定能否进入、能否回推。

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

开始条件：

- 已经有某种 sticky 刚体形状：2 格条、3 格条、4 格条、2x2 或 L 形。
- 该连体块形状被送到墙口、单列通道、窄口或把手附近。
- 玩家有一次推进动作，推进后是否能站到反向施力格由地形决定。

动后局面：

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

可以接着怎么用：

- 接 B/S 边界黏合形成的横条、长条或 L 形。
- 作为“错误形状可见失败”的墙口检查器。
- 接目标回填或通道封锁：正确占格形状通过，错误占格形状失去回返或把手。

常见 shortcut：

- 墙口太宽会让所有长度都可回返。
- 只让玩家绕到附近不等于有反向施力格；2x2 窄口是反例。
- L 形如果侧把手开放，可能绕过“长条不可回返”的预期。

审美风险：

如果玩家只是在推一个已经给好的块，它可能只是移动性知识点；如果前一段要求玩家主动粘出特定形状，再用墙口检验这个形状，才会形成“先造形，再过口”的推理。

最小用法验证：

`sticky3_narrow_mouth_push_right` 对比 `sticky3_wide_mouth_push_right`、`sticky4_wide_for_3_not_4_push_right` 对比 `sticky4_extra_wide_push_right`、`lshape_handle_open` 对比 `lshape_handle_blocked_by_wall` 都证明墙格和玩家操作位确实会区分不同黏块形状。

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

这组补充不只检查推进后能否回返，也检查黏块前沿是否完整开放。双格 sticky 是一个刚体二格条，推动下格时上格的目标位也必须开放；两个 crate 或单格 sticky 没有这个连带目标位，因此能进入同一目标口。上沿墙齿少一格时，双格 sticky 也能通过；对象没有 merge 时，下格可以独立通过。

黏块前沿形状谱补充（B/S 仅负责把箱子变成 sticky）：

机制角色：
- active_rule：`sticky rigid movement` 与墙口前沿检查。
- material_source：B/S 在 run 中只负责把 crate 转成 sticky，让 runtime 合法地产生黏块形状。
- consumer：右侧墙口 / 目标口检查连体块的整个前沿。
- incidental：所有相关对象都进入 sticky side 后，B/S 边界不再参与关键观察点。
- 关键观察点：最后一次右推 sticky 连体块进墙口，结果为 `force_blocked` 或 pass。

`ra_loop_bind_mouth_composition_20260707_01` 先给出竖向二连的窄口对照；`ra_loop_bind_shape_spectrum_20260707_01` 将它补成同一对象行为谱。1 格基线可过；2 格竖条被单格口拒绝、两格口通过；3 格竖条被两格口拒绝、三格口通过；L 形缺少前凸角对应开口时被挡，补上该格开口后通过；分开的部件不会被上方墙齿一起挡住。这些结果说明 sticky 刚体进墙口时要检查整块前沿，不说明 B/S 边界本身在关键观察点发挥作用。

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
- 关键观察点：首步右推都 legal，差异发生在推进后玩家能否到达连体块右侧某个实际站位并向左推回。

这组补充继续拆出第二层：前沿完整开放仍不保证可回返，墙后通路必须连到一个玩家真正能站上去并反推的格子。竖向二连中，`side_door_open_return_found` 可回初始；`side_door_closed_no_return` 只少一格侧廊就变成 complete no；`stance_cells_walled_side_door_insufficient` 证明走到附近不够，反推站位本身是墙时最终为 `right:force_blocked`。

3 格 L 形四种旋转确实不同。缺右上角、缺左上角、缺右下角都能用下侧路径接到右侧把手，堵住对应把手后 complete no；其中缺左上角最终 `up:destination_blocked`，缺右下角回返更短。缺左下角必须从上格驱动，除右侧把手外还需要给玩家回到左上驱动位的下方回路；修正回路后 open 为 `found depth=13`，blocked 为 complete no。这说明 L 形的“把手格位置”和“driver 回位路径”都应写成旋钮，而不能只写一个 L 形正例。

2x2 中，`square2_side_face_open_return` 显示玩家只要能站到右侧下格，就足以把整块反推；`square2_side_face_blocked_no_return` 只堵这个站位就变成 complete no。因此“2x2 必须整面外侧留空”应收窄为“至少有一个可达反推站位，而且整块向回移动的目标格都开放”。`explicit_handle_consumption_probe`、`lshape_corner_explicit_handle_consumption`、`square2_explicit_face_consumption` 分别验证了对应操作位。上方或右侧空间过宽时，玩家可能从其他绕行口到达操作位；`wide_side_loop_shortcut` 和 `lshape_overwide_corner_shortcut` 只作为误用边界。

后续可验证的接法：

已补 sticky 1/2/3 格、L 形和分离部件接入前沿墙齿，也已补竖向二连、3 格 L 四旋转和 2x2 在前沿可过后的回推站位。下一步若继续本条，应把反推站位从墙换成 crate 或剩余 sticky，比较 `force_blocked`、可推走或 merge；不要再单独枚举同一口宽规则的镜像形状。另可把移动边界改写出的 `CC`、`C+M`、`C+MM`、竖向 sticky pair 接入同一前沿墙齿目标口，但必须标明移动边界只是 material_source 还是 active_rule。

最短接法：

`B/S 边界黏合 -> 3 格横条 -> 窄口封住回推站位`：玩家主动多粘一个箱子，把 2 格条变成 3 格条；推进窄口后，玩家走不到另一侧，因此不能再推回来。

证据：

`run=ra_pilot_wall_motion_01,ra_probe_reverse_force_cell_02,ra_struct_rigid_tooth_consume_01`, `cases=sticky2_single_lane_push,sticky2_loop_room_push,sticky3_narrow_mouth_push_right,sticky3_wide_mouth_push_right,sticky4_wide_for_3_not_4_push_right,sticky4_extra_wide_push_right,square2_narrow_push_right,square2_wide_push_right,lshape_handle_open,lshape_handle_blocked_by_wall,rigid_pair_tooth_block,crate_pair_tooth_lower_pass,rigid_pair_open_mouth_pass,single_sticky_tooth_pass`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_bind_mouth_composition_20260707_01`, `cases=bs_pair_tooth_connected_block,bs_single_tooth_lower_pass,bs_pair_open_two_cell_mouth_pass,bs_gap_parts_tooth_shortcut`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_bind_shape_spectrum_20260707_01`, `cases=bs_shape_two_bar_single_mouth_block,bs_shape_two_bar_two_mouth_pass,bs_shape_three_bar_two_mouth_block,bs_shape_three_bar_three_mouth_pass,bs_shape_l_notch_block,bs_shape_l_notch_pass,bs_shape_separated_lower_shortcut_pass`, `tags=runtime_observed,bounded_graph,consumption_probe`

`run=ra_loop_sticky_handle_return_20260707_01`, `cases=side_door_open_return_found,side_door_closed_no_return,stance_cells_walled_side_door_insufficient,explicit_handle_consumption_probe,wide_side_loop_shortcut,lshape_corner_handle_open_return,lshape_corner_handle_blocked_no_return,lshape_corner_explicit_handle_consumption,lshape_overwide_corner_shortcut,lshape_missing_top_left_open_return,lshape_missing_top_left_blocked_no_return,lshape_missing_bottom_right_open_return,lshape_missing_bottom_right_blocked_no_return,lshape_missing_bottom_left_open_return,lshape_missing_bottom_left_blocked_no_return,square2_side_face_open_return,square2_side_face_blocked_no_return,square2_explicit_face_consumption`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## Pull 侧对象可动性：单箱与不同形状黏块

局面卡片：
- 开始摆法：玩家位于 pull 侧，身后一格放单箱、单格 sticky、条形、L 形或 2x2 sticky；玩家目标格在动作前可以为空、被同一刚体占用，或被独立对象占用。
- 关键动作：先求身后对象沿输入方向形成的受力闭包，再让玩家与整个闭包同时前移一格。
- 动后局面：玩家旧格可由被拉对象进入；玩家目标格只要在闭包平移后腾空即可进入；任一闭包格撞墙、越界，或目标格仍被未移动对象占用时，整个动作失败。
- 最小用法：单格墙口袋、目标格墙和墙后的通路分别限制玩家去处、黏块去处和能否拉回。

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

单箱前格是未入链对象，闭包移动后玩家目标格仍被占用：
#########
#......G#
#..C@LP.#
#.......#
#########

C 形同一刚体在动作前同时占据玩家前后格，整体上拉合法：
###########
#BS.PL....#
#G........#
#...MMM...#
#...M@....#
#...MMM...#
#.........#
###########

前格 P/L 通过另一处接触加入受力闭包并腾空，整体上拉合法：
##########
#BS......#
#G.......#
#...LP...#
#...@M...#
#...MM...#
#........#
##########

单箱墙口袋，pull 合法但 pull 后 complete no：
########
#PL###G#
###C@.##
########

单格 sticky clear pull，作为单格对照：
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

pull 侧对象可动性由整个动作后的占用决定。玩家目标格是墙时先得到 `destination_blocked`；身后对象的受力闭包任一目标格撞墙或越界时得到 `force_blocked`；闭包平移后玩家目标格仍被未移动对象占用时得到 `player_destination_occupied`。动作前位于玩家目标格的同一刚体格，或通过其他接触加入闭包的对象，只要会同步移开就不构成阻挡。单箱的目标格就是玩家腾出的旧格；多格 sticky 还必须检查所有非接触格的目标。拉过墙口后能否反向操作，仍取决于能不能绕到另一侧站位。

机制角色：

- active_rule：`pull_force`、受力闭包、动作后玩家目标格检查、单箱进入玩家旧格、多格 sticky 的整体目标格检查，以及 pull 后操作位被墙、crate 或 sticky 占住时的差异。
- material_source：crate 是单箱基线；B/S anchor 只让预置 `M` 合法保持 sticky，不参与关键观察点；crate blocker case 中竖向 B/S 只用于让 blocker 保持 box-side crate；P/L 只提供 pull side。
- consumer：玩家目标格墙、动作后仍占据目标格的独立物体、会入链并腾空目标格的多格对象、单格墙口袋、sticky 非接触目标墙、L 形凸齿墙、拉过口后的反向把手通路、box-side crate / sticky blocker。
- incidental：孤立目标只满足 parser；可达图中的 anchor 移动事件不参与本条关键观察点。

结构旋钮：

- 玩家目标格：空 / 墙 / 同一刚体格 / 未入链对象 / 经其他接触入链并腾空的对象。
- 玩家身后对象：无对象 / 单箱 / 单格 sticky / 多格 sticky。
- 连体块形状：单格、2 格竖条、3 格竖条、3 格横条、2x2、下凸 L、上钩 L。
- pull 方向：侧拉 / 沿轴拉。
- 非接触目标格：开口 / 墙 / 凸齿缺口 / 2x2 右下目标格 / 3 格竖条中段目标格。
- pull 后空间：开放绕行 / 单格口袋 / 反向把手通路开放 / 反向把手通路被墙、crate 或 sticky 占用。
- pull 后所处侧：仍在 pull 侧 / 跨到 push 侧作为回推 shortcut。

可观测事实：

- `pull_open_stays_pull_side`：合法 pull 触发 `pull_object:crate#1`，最终反向 `left` 因身后无受力对象且目标格被箱占用而得到 `destination_occupied`，但开放地形可绕回。
- `pull_front_wall_block`：同样身后有 crate，但前格墙让动作在对象移动前 `destination_blocked`。
- `pull_front_anchor_blocks_target_vacate`：身后单箱形成的闭包不包含前格锚点，闭包移动后目标格仍被占用，得到 `player_destination_occupied`。
- `pull_cshape_front_vacates`：C 形同一刚体同时位于玩家前后，整体平移后前格腾空，pull 合法并触发 `move_sticky_rigid`。
- `pull_front_anchor_joins_force_chain`：前格 P/L 的另一半被黏块侧臂推动，锚点加入闭包并腾空玩家目标格，pull 合法并触发 `force_chain`、`anchor_boundary_shift`。
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

开始摆法与动后局面：

- 开始摆法：玩家处于 pull side，目标格可被地形、同一刚体或独立物体占住，身后一格可放单箱或 sticky 连体块。
- 动后局面：单箱被拉入玩家旧格；sticky 连体块与其他入链对象整体平移，或因闭包撞墙、越界、动作后玩家目标格仍被占用而保持原状；拉动后可能直接可回返、complete no，或需要绕到另一侧操作位。
- 后续用法：单格墙口袋会困住拉箱后的玩家；墙齿和口宽会挡住 sticky 连体块；墙、crate 或 sticky 会占住反向操作位；若玩家能绕到 push side，则可能把单箱推回。

设计价值：

这条列出 pull 的基础条件：怎样形成身后对象的受力闭包，怎样按动作后占用判断玩家目标格，怎样检查多格对象的全部目标格，以及拉过墙口后何时还必须走到另一侧操作位。它适合接到 P/L 边界交接、B/S sticky、目标口袋和墙口回返结构，而不是单独作为完整关卡骨架。

误用边界：

- 单箱 pull 不证明多格对象目标门；那需要多格对象。
- 单格 sticky 只证明 material control，不能代表 sticky 组墙口。
- 沿轴横条不能替代侧拉对象目标格谱；它的墙反例通常先落在玩家目标格的地形判定。
- box-side crate blocker 不能和 sticky blocker 合并解释：crate 可转化 / 搬运后回返，sticky blocker 会 merge 成更大刚体并关闭回返。
- `returnToInitial.status=not_applicable` 来自非法 replay，不是不可回返证明。
- 开放大房间会绕回，不能用来证明 pull 后承诺点。
- 本条现在覆盖了单箱基线、单格 sticky control、2/3 格竖条、3 格横条沿轴、2x2、两个 L 方向，以及墙 / crate / sticky 占住操作位的情况；这些普通扩展不再写入 backlog。

最短接法：

`单箱 pull -> 单格口袋 complete no`：玩家能把箱拉进旧站位，但自己走进墙口袋，四周墙格封住所有出口。

`sticky 2 格条 -> pull 侧墙口`：玩家前格开放不足以保证动作成立，非接触格目标墙会把整条刚体二格条拒绝。

`post-mouth sticky blocker -> merge lock`：拉过口后的反向操作位如果被另一格 sticky 占住，首步会 merge 成更大刚体，回返从 open case 的 found 变成 complete no。

证据：

`src/prototypes/reality_anchor/runtime.test.ts` 中的 C 形四方向 push/pull、动作后目标格、前格锚点入链和原子失败专项测试。

`run=ra_loop_pull_boundary_mobility_20260708_01_single_crate_pull_mobility`, `cases=pull_open_crosses_to_push_undo,pull_open_stays_pull_side,pull_front_wall_block,pull_front_anchor_blocks_target_vacate,pull_no_rear_crate_walk,pull_single_cell_pocket_no_return`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_mobility`, `cases=single_crate_pull_clear,single_sticky_pull_clear,bar_side_pull_target_wall_blocked,bar_side_pull_open_mouth,l_corner_pull_tooth_blocked,l_corner_pull_notch_open,bar_pull_after_handle_open,bar_pull_after_handle_closed`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_sticky_wall_pull_shape_spectrum`, `cases=bar3_side_pull_mid_wall_blocked,bar3_side_pull_open_mouth,square2_side_pull_lower_wall_blocked,square2_side_pull_open_mouth,l_upper_hook_pull_tooth_blocked,l_upper_hook_pull_notch_open,hbar3_axis_pull_clear,hbar3_axis_pull_front_wall_blocked,bar2_post_pull_handle_open_control,bar2_post_pull_handle_crate_blocker,bar2_post_pull_handle_sticky_blocker`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

## B/S 移动边界：箱组变为 CC、C+M 或黏块

局面卡片：
- 开始摆法：可移动 B/S anchor 与远处横条、竖条、L 形、2x2 或双柱箱组位于同一片区域。
- 关键动作：玩家移动 B/S anchor，让边界扫过远处箱组。
- 动后局面：远处箱组会变成 `CC`、`C+M`、`C+MM`、2x2 sticky 或两根分开的 sticky 柱。
- 最小用法：同一门口、低墙或列间隙会允许某些形状通过，并挡住另一些形状；`C+M` 和 `C+MM` 还会在门外留下不同数量的 sticky。

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

边界上移，箱组粘成 2x2：
##########
#.......G#
#.B......#
#.S..MM..#
#.@..MM..#
#........#
##########

不同箱组进入同一门口：
##########
#.@.....G#
#.B......#
#.S..M...#
#....MM..#
#........#
##########
```

共同解释：

移动的是 B/S 边界线，不是远处对象。边界跨过远处箱组时，箱组会变成 `CC`、`C+M`、`C+MM`、2x2 sticky 或两根 sticky 柱。把这些形状送进同一个门口，会分别出现整条箱链推进、只有单箱进门而 sticky 留在外面、2x2 被低墙挡住，或两根柱子分批推进。

开始条件：

- 有一个可移动 B/S anchor，边界能相对远处占格形状跨线。
- 远处占格形状可以是横条、竖条、L 形、两行对齐或两行隔列。
- B/S anchor 可以由 push、pull 或力链搬运；除非带动方式额外打开或关闭站位，否则只改变边界怎样到达指定行。
- 边界改写后需要紧接一个门口、低墙、目标口或通道，让不同箱组产生不同动作结果。

动后局面：

- 下刷可把 sticky 横条回收为 `CC`。
- 边界下移可切出 `C+M` 或 `C+MM`：前面的单箱能继续推进，后面留下一格或两格 sticky。
- 边界上移可把 crate 行粘到 sticky 行，形成 2x2 或两根分开的柱子。
- 进入门口后，`CC` 整链推进，`C+M` / `C+MM` 留下不同长度的 sticky，2x2 被低墙挡住，双柱可以分批移动。

结构旋钮：

- 边界运动方向：跨线刷 / 沿边界平移。
- 被扫占格形状：横条 / 竖条 / L 形 / 2x2 候选 / 双柱。
- 门口形状：完全开放 / 带一格低墙 / 只留列间隙。
- driver 侧：push B/S、P/L pull B/S、stroke 调位。

变体谱：

- `brush_down_bar_full_release`：边界下移后为 `CC`。
- `brush_down_vertical_partial`：边界下移后为 `C+M`。
- `brush_down_l_tail`：边界下移后为 `C+MM`。
- `brush_parallel_preserve_bar`：沿边界平移，原 sticky 横条保持不变。
- `brush_up_bind_square`：边界上移后形成 2x2 sticky。
- `brush_up_gap_keeps_columns`：边界上移后仍是两个分开的柱状 sticky。
- `door_cc_chain_push`：`CC` 在门口成为箱链推进。
- `door_cm_tail_push` / `door_cmm_tail_push`：单箱进入门口，门外分别留下一格或两格 sticky。
- `door_square_blocked_by_low_wall`：2x2 被低墙占格门封住。
- `door_split_columns_one_column_passes`：两根分开的柱子可以先推进其中一列。

可以接着怎么用：

- 接门口：比较 `CC`、`C+M`、`C+MM`、2x2 和双柱在同一开口中能否推进，以及会在门外留下什么。
- 接目标回填：用变回 crate 的格子覆盖目标，同时比较门外是否还留有 sticky。
- 接刚体墙口：把上刷生成的大占格形状再交给回返谱系。

常见 shortcut：

- 只移动边界但不接墙口或目标时，玩家只会看到箱组材质和连接形状变化。
- 门口太宽时，`C+M` 和 `C+MM` 都能轻易通过，门外剩余 sticky 长度的差异不再重要。
- 低墙少一格时，2x2 占格门可能不再关闭。
- 把 push 刷和 pull 刷拆成两个顶层条目会重复；它们通常只是 driver 差异。

审美风险：

移动边界很容易变成“远程事件按钮”。真正需要判断的是：边界停在哪一行，会把远处箱组改成什么形状；这个形状随后能不能穿过同一个门口。

最小用法验证：

`door_cc_chain_push`、`door_cm_tail_push`、`door_cmm_tail_push`、`door_square_blocked_by_low_wall`、`door_split_columns_one_column_passes` 证明同一门口会让不同箱组出现不同动作结果。`door_cmm_tail_push` 的回返搜索耗尽，只作为最终摆法和动作表证据。

后续可验证的接法：

补目标回填版本：比较 `CC`、`C+M`、`C+MM` 进入同一目标口后，能否覆盖目标，以及门外分别留下几格 sticky。

最短接法：

`移动 B/S 边界 -> 箱组过门 -> 目标回填`：玩家先移动边界，把远处箱组改成所需形状，再把它送入门口；形状选错时，要么整块被墙挡住，要么在门外留下无法继续推动的 sticky。

证据：

`run=ra_struct_boundary_pull_01,ra_struct_consumption_01`, `cases=brush_down_bar_full_release,brush_down_vertical_partial,brush_down_l_tail,brush_parallel_preserve_bar,brush_up_bind_square,brush_up_gap_keeps_columns,door_cc_chain_push,door_cm_tail_push,door_cmm_tail_push,door_square_blocked_by_low_wall,door_split_columns_one_column_passes`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

带动方式补充：

`pull_brush_*` 与 `pull_brush_stroke_selector` 不作为独立顶层条目。它们说明同一 B/S 边界可以由 P/L pull 带动，并用拉动距离决定停位；除非这种带动方式额外打开或关闭站位，否则仍归入本条的开始摆法。

## P/L 锚点在横廊中的可动性

局面卡片：
- 开始摆法：水平 P/L 锚点位于一格高的横廊中，P 端或 L 端前方留有 0、1 或 2 格空位。
- 关键动作：玩家从 P 侧推，或从 L 侧拉动锚点。
- 动后局面：前方没有空位时不能移动；一格空位只能移动一次；两格空位可以连续移动两次。拉动后，出口墙还可能让玩家无法返回。
- 最小用法：横廊端点和拉动后的出口决定锚点能移动几格，以及这次移动是不是一次性的。

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

开始条件：

- 水平 P/L anchor 位于一格高墙廊或近似墙廊中。
- 玩家从 P 侧沿长轴 push。
- L 端前方空格数量可控，侧廊是否开放可控。

动后局面：

- 0 格余量：首步 illegal。
- 1 格余量：首推合法，但动作后不能继续向前，也不能回初始。
- 2 格余量：首推后仍能继续推。
- 侧廊开放：动作集合变宽，但仍不能反向恢复长轴位置。

结构旋钮：

- L 端前方空格数：0 / 1 / 2。
- 侧廊是否开放。
- 玩家能否绕到 L 侧但没有长轴反向 force。

可以接着怎么用：

- 用作停位容量：控制 P/L 只能移动 0 次、1 次或多次。
- 用作一次性开关或门闩：移动后占据/释放某个通道。
- 接边界刷子 driver：P/L 的单向位移可以作为 B/S anchor 的驱动，但 driver 本身不应升为新族。

常见 shortcut：

- 如果给出真正可反向施力的长轴把手，棘轮会失效。
- 侧廊开放不等于可反推；但如果侧廊同时改变 P/L 标签关系或目标格，需另跑。
- 首步 illegal 的 0 格余量只说明门关闭，不是回返证据。

审美风险：

如果只是让玩家推一次 P/L，它像机制教学。真正需要判断的是 L 端还剩几格空位：前方留一格只能移动一次，留两格才能连续移动两次。

最小用法验证：

`long_axis_one_front_cell`、`long_axis_two_front_cells`、`long_axis_side_bypass_still_one_way` 证明墙廊长度和 L 端空位数确实决定 P/L 能移动几次；`side_bypass` 证明玩家绕到侧面也不能改变锚点前方没有空位这一事实。

后续可验证的接法：

把 P/L 单向位移接到 B/S 移动边界，验证一次性移动能否把边界准确带到某一行，而不是只重复边界改写本身。

最短接法：

`P/L 锚点在横廊中的可动性 -> B/S 移动边界`：P/L 只能移动一次，并把 B/S anchor 带到指定行；玩家无法把 P/L 推回去，但边界会停在能改出正确箱组的位置。

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

L 侧 pull 版检查玩家前方还剩几格：0 格是 `destination_blocked`，1 格只能拉一次，2 格可以拉两次。第一次拉动后，侧廊开放只让玩家多走几个位置，不会自动把 anchor 送回初始位置；出口墙则会封住玩家的返回路线。若 crate 与 anchor 同时进入 force chain，它会多占一格行程：`force_chain:n2 + anchor_boundary_shift:push_pull` 后，下一次同向推进被尾墙 `force_blocked`。

机制角色补充：

- active_rule：`pull_force` / `push_force` 移动 P/L anchor 本体；`forceModeAt` 决定玩家当前是 push 还是 pull；混合链中 `planObjectMove` 把 crate 与 P/L 放进同一 force chain。
- material_source：crate 只用于组成 mixed chain；目标 `G` 只满足解析。
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

## P/L 横向把手：玩家目标格与锚点目标格

局面卡片：
- 开始摆法：横向或竖向 P/L anchor 位于玩家身边；玩家目标格、P 半格目标格、L 半格目标格和移动后的返回格可分别设墙或放置可动对象。
- 关键动作：玩家从 P 侧推或从 L 侧拉锚点。
- 动后局面：玩家前格被墙占住时无法拉；任一锚点目标格被墙占住时整块无法移动；首步成功后，返回格仍可能被墙关闭。
- 最小用法：相邻墙格分别检验玩家要走的格子、锚点两半要去的格子和移动后的返回路线。

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

横向 P/L 的垂直位移有两套把手：P 侧接触推入，L 侧离开式拉出。两者都要求 P/L 两个半格的目标格同时开放；pull 还要求玩家目标格不是墙，并在受力闭包移动后腾空。墙格因此分成玩家目标格墙、锚点另一半目标墙、推动后的回返墙。

开始条件：

- P/L anchor 横放，玩家位于 P 侧推入或 L 侧拉出站位。
- P/L 上下目标格和玩家 pull 前格可被墙格分别控制。
- 有或没有绕行回返通路。

动后局面：

- 首步合法并可回返。
- 首步被玩家目标格墙关闭，`destination_blocked`。
- 首步被锚点另一半目标门关闭，`force_blocked`。
- 首步合法但推动后回返门被墙封住。

结构旋钮：

- 施力侧：P 侧 push / L 侧 pull。
- 玩家目标格是墙、动作后仍被占用，或由受力闭包同步腾空。
- 未接触的另一半 anchor 目标格是否为空。
- 首步后的反向把手格是否开放。

可以接着怎么用：

- 用作把手分类器：同样看似相邻的墙格，关闭的是玩家动作、对象占格目标，还是回返。
- 接移动边界刷子：P/L 可以作为 driver，但要同时判断玩家目标格墙、受力闭包目标格与动作后占用。
- 接目标/通道：首步合法但回返门关闭时，可形成轻量承诺点。

常见 shortcut：

- 只放一个墙格但没控制到正确门，会让玩家仍能用另一侧把手绕过。
- 把 `destination_blocked` 和 `force_blocked` 混写，会导致 designer 误放墙。
- 开放大房间会弱化“首步后回返门”的压力。

审美风险：

如果只展示 P 侧推 / L 侧拉，是规则教学；如果玩家必须识别“哪个墙格实际关掉哪个门”，才会成为空间洞见。

最小用法验证：

`p_side_push_down_other_half_wall`、`l_side_pull_up_front_wall`、`l_side_pull_up_p_target_wall` 证明不同墙格分别挡住玩家前格或锚点目标格；`p_side_push_down_l_front_wall_after_shift` 证明首步成功后，返回路线仍可能被另一格墙封住。

后续可验证的接法：

把这些墙位接到 B/S 移动边界，比较从 push 侧或 pull 侧带动锚点时，是否能停到同一行，或从侧路绕过原本的限制。

最短接法：

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

横向把手现在应读成四层墙门矩阵：玩家目标格墙、P 半格目标墙、L 半格目标墙、移动后回返墙。P 侧 push 可以分别堵 P / L 两个目标半格；L 侧 pull 先拒绝玩家目标格墙，再规划非接触半格和被携带对象的全部目标格，最后检查动作后的玩家目标格占用。竖放 `P/L` 的 P 侧左右 push 在开放 patch 中对称，说明这不是旧样本某个方向的偶然性。mixed pull 链则把同一矩阵扩展到“P/L anchor 被拉时携带 crate”：玩家目标格墙给 `destination_blocked`，crate 目标墙给 `force_blocked`。

补充变体：

- `h_p_push_down_open_return`：P 侧 push 下移 `PL`，再从旧 L 格 pull 回返，两次 `anchor_boundary_shift:push_pull`。
- `h_p_push_down_p_target_wall` / `h_p_push_down_l_target_wall`：同为 `force_blocked`，但分别是 P 半格或 L 半格的目标格撞墙。
- `h_l_pull_down_front_wall` / `h_l_pull_down_p_target_wall`：分别是玩家前格撞墙，或非接触的 P 半格目标格撞墙。
- `h_p_push_down_return_front_wall`：首步已移动 anchor，回返 pull 才被 `destination_blocked`。
- `v_p_push_right_open` / `v_p_push_left_open`：竖放 `P/L` 的 P 侧左右开放 push 对称。
- `l_pull_anchor_carries_side_crate_open` / `l_pull_anchor_front_wall_gate` / `l_pull_anchor_crate_target_wall_gate`：mixed pull 正例和两类墙门反例。

归属边界：

- 这些补谱 `merge/supplement` 到本条，不新开“横向 push up”“竖向左右 push”小 family。
- mixed pull 链的主语仍是 P/L anchor 抽动时的占格门 / chain 门；若后续要把 carried crate 接目标口，才进入 recipe 或新 consumer 题材。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_transverse_wall_gate_matrix`, `cases=h_p_push_down_open_return,h_p_push_down_p_target_wall,h_p_push_down_l_target_wall,h_p_push_down_return_front_wall,h_p_push_up_open,h_l_pull_down_open,h_l_pull_down_front_wall,h_l_pull_down_p_target_wall,v_p_push_right_open,v_p_push_left_open`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`, `cases=l_pull_anchor_carries_side_crate_open,l_pull_anchor_front_wall_gate,l_pull_anchor_crate_target_wall_gate`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L 锚点移位：腾出旧半格并改变推拉侧

局面卡片：
- 开始摆法：P/L anchor 旁有一处被旧 L 半格占住的位置，或有一只紧邻旧边界的 crate。
- 关键动作：玩家先移动 P/L anchor，再走到锚点原来占住的位置或侧边箱旁。
- 动后局面：旧 L 半格腾空，成为新的 push 站位；原来位于 L 侧、挡住拉动的 crate 可能落到新边界的 P 侧，可以从另一方向推动。
- 最小用法：新站位让玩家能把箱推进单格目标袋；侧边 crate 也能接着推动另一组对象。

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

P/L anchor 移动不只改变二格物体的位置，也会移动 `forceModeAt` 的分界线，并腾出旧半格。玩家可以站进这个新空格，从 push 侧继续推附近对象；原来位于 L 侧的邻箱也可能随着边界移动落到 P 侧。墙可以分别挡住第二次 anchor shift、pull 时玩家要走的目标格；不移动锚点的对照若在受力闭包平移后仍占住玩家目标格，则停在 `player_destination_occupied`。

机制角色：

- active_rule：P/L anchor 本体移动导致 `forceModeAt` 边界重写；第二动作在新 push side 中触发 `push_force`。
- material_source：crate / goal 用于验证第二动作；mixed chain 中的下方 crate 与 P/L 一起进入力链。
- consumer：第二停位墙、pull 前格墙、旧 L 下方目标袋、侧边 crate、玩家右侧站位和绕行通路。
- incidental：目标覆盖胜利、可达图里的其他 force-chain 旁支不参与关键观察点。
- 关键观察点：`anchor_boundary_shift:push_pull` 之后，后续动作从“普通 walk / L 侧 front-block”变成 `push_object:crate#1` 或 mixed push chain。

开始条件：

- P/L anchor 沿某方向至少能移动到会释放旧半格或扫过目标行 / 列的位置。
- 玩家能到达被释放旧 L 半格，或能到达被新边界重标的侧边对象把手。
- 旧半格或侧边对象旁有目标袋、crate 或门闩，只有边界移动后才能从新的 push 侧操作。

动后局面：

- 旧 L 半格从 occupied anchor cell 变成新 push side 操作站位。
- mixed chain 下移后，旧 L 行侧边 crate 从 L 侧 pull front gate 变成 P 侧 push chain。
- 第二动作产生普通 `push_object` 或 `force_chain:n2 + anchor_boundary_shift:push_pull`，证明玩家确实利用了移动后的边界方向。

结构旋钮：

- driver：P 侧 push / L 侧 pull / mixed force chain。
- 移动量：一次 shift 只释放错位格，两次 shift 才生成旧 L 把手。
- 墙位：第二停位墙、pull 玩家前格墙。
- consumer：目标袋、侧边 crate、后续门口。
- 绕行通路：pull driver 或 mixed rewrite 后，玩家是否能走到新的操作位。

可以接着怎么用：

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

最小用法验证：

`push_two_shift_old_l_push_crate_goal` 和 `pull_two_shift_old_l_push_crate_goal` 都把旧 L 半格重写为 push 站位并推箱进目标；`push_second_shift_wall_blocks_rewrite`、`pull_second_shift_front_wall_blocks_rewrite` 和 `push_one_shift_only_walks_not_consume` 校准移动量和墙门。`mixed_downshift_rewrites_side_crate_to_push` 与 `no_shift_side_crate_pull_front_gate` 证明 mixed-chain 移动 P/L 后，同一侧边 crate 触碰从 L 侧 front-block 变成 P 侧 push chain。

最短接法：

`P/L anchor 双步位移 -> 旧 L push 站位 -> 单格目标袋`：玩家先把 P/L anchor 推/拉过目标把手位，释放旧 L 半格并把它改写成 push side，再用这个新把手把箱子推进目标。

`mixed-chain downshift -> side crate push relay`：第一段用下方 crate 限制并驱动 P/L 位移，第二段用新 P 边界把侧边 crate 推入锚点邻域，形成二段式对象分配。

证据：

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_boundary_rewrite_second_action`, `cases=push_two_shift_old_l_push_crate_goal,push_second_shift_wall_blocks_rewrite,pull_two_shift_old_l_push_crate_goal,pull_second_shift_front_wall_blocks_rewrite,push_one_shift_only_walks_not_consume`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pl_anchor_wall_mobility_20260708_01_pl_anchor_mixed_force_chain_wall`, `cases=mixed_downshift_rewrites_side_crate_to_push,no_shift_side_crate_pull_front_gate`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L pull 抽取：玩家目标格、对象目标格与侧向扫带

局面卡片：
- 开始摆法：玩家位于 pull 侧，身后有 crate、B/S anchor 或其他二格对象；玩家目标格和对象要移入的格子可分别设墙或放箱。
- 关键动作：玩家向前走一格，把身后的对象拉出。
- 动后局面：单箱或沿轴二格对象可以被拉出；垂直二格对象还要求侧向目标格空着；侧边若是可动 crate，它会被一起推走。
- 最小用法：玩家目标格墙、对象目标格墙和侧边 crate 分别决定拉动失败、整体抽出或连带推箱；若前格对象被侧向接触纳入闭包并同步腾空，则不阻挡玩家。

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

pull 抽取不是“身后有对象即可”。它先拒绝玩家目标格墙，再从身后对象展开受力闭包，检查闭包所有目标格，最后检查动作后的玩家目标格占用。单 crate 和沿轴二格物体主要受玩家目标格墙限制；垂直二格物体还需要侧向目标位；侧向目标位放墙会挡住整次拉动，放可动对象则会把它纳入闭包一起推走。

开始条件：

- 玩家处于 pull 侧，身后有 crate、B/S anchor 或其他可拉对象。
- 玩家目标格不能是墙，并且在整个受力闭包移动后必须腾空。
- 被拉对象每个占格目标格必须可用，或可由 force chain 推走。
- 侧向 blocker 类型可控：墙、crate、sticky 或空格。

动后局面：

- 单格对象被抽入玩家旧格。
- 沿轴二格 anchor 被整体抽出。
- 垂直二格 anchor 因侧向目标位开放/封闭而合法或非法。
- 侧向 crate 被同步推走，停到新的格子。

结构旋钮：

- 玩家目标格：开放 / 墙封 / 被未入链对象占用 / 被入链对象同步腾空。
- 身后对象占格：单格 / 沿轴二格 / 垂直二格。
- 侧向目标位：空格 / 墙 / 可移动 crate。
- 抽取后前格是否被新对象反向封住。

可以接着怎么用：

- 用作 B/S anchor 的远程把手。
- 用作口袋抽箱：把 crate 拉到玩家旧位。
- 用作侧向扫带：把原本挡在对象目标格上的 crate 一起推到旁边。

常见 shortcut：

- 只把玩家目标格设为墙会关闭所有 pull，但不测试受力闭包与动作后占用。
- 只测试单 crate 会漏掉垂直二格对象的侧向目标要求。
- 侧向墙换成 crate 后，封门会变成扫带 shortcut。

审美风险：

单 crate 抽取本身偏基础；垂直二格对象与侧向 blocker 的比较更像可设计语料，因为玩家需要理解“拉动时对象整个占格形状都要有去处”。

最小用法验证：

`pull_crate_front_wall` 由玩家前格墙挡住；`pull_bs_vertical_side_wall` 由对象目标格墙挡住；`pull_bs_vertical_side_sweep_crate` 把同一格墙换成可动 crate 后，crate 会被一起推走，证明侧边 blocker 的类型会改变合法动作。

后续可验证的接法：

把侧向 blocker 从 crate 换成 sticky 部件，比较它会被一起带走、与原黏块合并，还是因为目标格被占而完全拉不动。

最短接法：

`P/L pull 抽取把手 -> B/S 移动边界刷子`：玩家先用 pull 抽出 B/S anchor，再让边界线跨过远处占格形状；如果前格或侧向目标位放错，刷子无法启动或产生扫带 shortcut。

证据：

`run=ra_struct_boundary_pull_01`, `cases=pull_crate_pocket_extract,pull_crate_front_wall,pull_bs_horizontal_axis,pull_bs_vertical_side_open,pull_bs_vertical_side_wall,pull_bs_vertical_side_sweep_crate`, `tags=runtime_observed,bounded_return,graph_complete,consumption_probe`

## P/L 边界交接：从 P 侧推入，再从 L 侧拉回

局面卡片：
- 开始摆法：单箱、箱链或 sticky 连体块位于 P/L 边界旁，玩家能从 P 侧推到边界，再走到 L 侧操作位。
- 关键动作：玩家先推对象跨到边界附近，再从 L 侧把身后一格的对象拉回。
- 动后局面：单箱进入玩家旧格；箱链只拉回近端箱，远端箱仍留在原处；sticky 连体块必须整体有空位才能拉回。
- 最小用法：单箱可以被拉进目标口袋；拉走箱链近端后会打开原来被箱占住的单格口；墙格会挡住 sticky 连体块的目标格。

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

这条不是“P 侧能推、L 侧能拉”的规则复述。玩家先在 P 侧把对象推到边界旁，再走到 L 侧拉回同一个对象。单箱会进入玩家旧格；箱链在 P 侧整条移动，到 L 侧却只拉回身后一格的近端箱；sticky 连体块与它碰到的可动物共同形成受力闭包。目标口袋、玩家目标格墙、动作后仍占据目标格的对象、连体块目标格墙和箱链下方的单格口分别决定拉回后会发生什么。

机制角色：

- active_rule：`forceModeAt` 在 P/L 边界两侧改变动作语义；P 侧 `push_force` / `force_chain` 与 L 侧 `pull_force` / 受力闭包 / 动作后玩家目标格检查产生差异。
- material_source：普通 crate 链；B/S 只在 sticky 变体中提供合法 sticky material。
- consumer：L 侧玩家前格、目标口袋、下方单格口、sticky 非接触目标墙、边界跨侧通路、回返把手。
- incidental：P/L anchor 在本条中通常被隔离，只提供边界判定；可达图中的 anchor 移动事件不参与关键观察点。若 P/L anchor 本体被移动并重写旧半格 / 侧边对象侧别，归入 `P/L 锚点边界重写`。

开始条件：

- 对象必须位于或能被送到 P/L 边界邻域；玩家需要能从 P 侧实际跨到 L 侧把手位。
- P 侧有合法 push 入口：单箱、箱链或 sticky 连体块能被推到边界相邻格。
- L 侧 pull 入口必须满足玩家目标格不是墙、受力闭包的所有目标格可用，并且闭包移动后玩家目标格腾空。

动后局面：

- 单箱：P 侧推入后，L 侧 pull 把 crate 拉入玩家旧格；若旧格是目标，箱子会直接覆盖目标。
- 多箱链：P 侧整链移动；L 侧只拉回近端箱，远端箱仍留在边界另一侧；链长决定留下几只箱子。
- sticky group：P 侧可把连体块送到边界；L 侧可继续抽出，或被前格墙 / 占格目标墙分类拒绝。
- 可逆 handoff：跨界 sticky 横条可用 P 侧 push 打开 L 侧把手，再由 L 侧 pull 回原状，证明这类交接不必然单向。

结构旋钮：

- 对象类型：单箱 / 二箱链 / 三箱链 / 二格 sticky / L 形 sticky。
- L 侧玩家目标格：开放 / 墙 / 被未入链箱占用 / 被入链对象同步腾空。
- 占格目标格：全部开放 / 非接触格撞墙 / L 形下凸撞墙。
- 下游 consumer：目标口袋、下方单格口、回返把手。
- 链长：二箱留下一个残余箱，三箱留下两个残余箱。

可以接着怎么用：

- 目标口袋：玩家站在目标上不算覆盖，L 侧 pull 把单箱拉到目标后才覆盖。
- 箱链拆分：P 侧推动整条箱链，L 侧只拉回近端箱，把远端箱留给另一处目标或门口。
- 口袋开门：抽走近端箱打开原本被箱占住的单格口。
- 门控分类：同一 P-side handoff 后，L 侧前格墙给 `destination_blocked`，sticky 占格目标墙给 `force_blocked`。

常见 shortcut 与误用边界：

- 玩家没有实际跨 P/L，或对象不在边界邻域，只是全图 push / pull，不属于本条。
- 单箱 pull 的基础目标格墙不能单独作为本条证据；必须接到 P-side handoff 或 downstream consumer。
- sticky L 形被墙挡住若没有 P push -> cross -> L pull 的交接过程，应归入 `刚体黏块 + 墙口`。
- `returnToInitial.status=exhausted` 只能写 unknown；本轮二箱 / 三箱抽取正例不能声称不可回返。
- P/L anchor mixed chain 已另有本体语料；不要把锚点移动后的边界重写塞回普通对象 handoff。

最小用法验证：

`plb_04_goal_pocket_shortcut` 验证单箱交接：P 侧只能把 crate 推到边界旁，L 侧 pull 再把 crate 拉进玩家旧站位上的目标。`pl_chain2_pull_opens_lower_pocket` 验证箱链拆分：L 侧拉走近端箱后，原本被箱占住的下方单格口打开，玩家可以进入口袋。sticky 变体中的玩家前格墙和 L 形目标格墙只是边界修正，不单独作为新顶层。

### 边界活塞的对象差异：单箱、箱链与黏块

局面卡片：
- 开始摆法：P/L anchor 形成竖向边界，玩家站在 P 侧；边界旁放单箱、箱链、二格 sticky 横条或 L 形 sticky。
- 关键动作：玩家先向右推对象并跨到 L 侧，再立即向左拉回身后的对象。
- 动后局面：单箱会回到原位；箱链只拉回近端箱，远端箱留在右侧；sticky 连体块整体回撤，任一目标格撞墙都会失败。
- 最小用法：侧齿和前沿墙可以区分不同 sticky 形状；箱链留下的远端箱可以继续进入目标袋、挡住通路或确定边界停位。

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

这组不是单独新规则，而是 `P/L 边界交接` 的两步活塞摆法：第一手把对象推到边界旁，同时把玩家送到 L 侧；第二手立即向回拉。crate 链在 P 侧整体移动，在 L 侧只拉回近端箱；sticky 连体块则整体回撤，任何一个目标格撞墙都会失败。

对照关系：

- `C` vs `CC`：单箱两步回到初态；箱链两步后仍有远端箱留在右侧，说明对象长度和能否拆开会改变动后摆法。
- `CC` vs `MM`：二者第一手都能被推入，但箱链第二手只抽近端，sticky 横条第二手整体回撤。
- `MM` vs L 形：同一侧齿不挡横条，却会挡住 L 形的下凸格，说明墙检查的是 sticky 整块的目标格。
- L 形侧齿 vs L 形宽口：移除侧齿后 L 形恢复往复，排除“L 形不能活塞”的错误解释。
- 横条侧齿 vs 横条前沿墙：侧齿不在目标格时无效；前沿墙落在伸出 stroke 目标格时直接 `force_blocked`。

开始条件：

- 玩家必须能从 P 侧完成第一手 push，并在动作后进入 L 侧可拉位置。
- 本体必须紧贴边界交接位；否则只是普通 push / pull。
- sticky 变体需要整块目标格开放；箱链变体需要远端位置能接住第一手整链 push。
- 墙齿必须落在实际目标格集合里；离目标格一格的墙只能作地形背景。

动后局面：

- 单箱：可作为退化基线，证明两步活塞路径存在，但没有 downstream consumer 时不单独成语料。
- 箱链：拉回近端箱后，远端箱仍留在另一侧，可继续进入第二个目标袋或挡住另一条路。
- sticky 横条：整体伸出 / 回撤，适合作为可逆门或 B/S 刷线 driver。
- L 形 sticky：把侧齿、口宽和凸格位置变成首步行程门。
- 前沿墙：关闭伸出 stroke，用作“第一手不成立”的形状门反例。

结构旋钮：

- 本体类型：单箱 / 二箱链 / 二格 sticky 横条 / L 形 sticky。
- 对象模型：可分离 crate 链 / sticky 刚体。
- 墙位：侧齿、宽口、前沿行程墙。
- 第二手结果：精确回撤、只拉近端、整块回撤或被墙挡住。
- 后续接法：剩余箱链、回返门、移动边界停位或形状墙口。

可以接着怎么用：

- 剩余箱链：近端被拉回后，远端箱可进入第二目标袋、充当门闩或继续组成推链。
- 回返门：sticky 横条或宽口 L 形可要求玩家先伸出再撤回，控制通路开闭。
- 形状分类器：同一墙位区分横条、L 形和前沿目标格，接入 `刚体黏块 + 墙口`。
- driver：可往复 sticky 活塞可作为移动 B/S anchor 或其他边界结构的停位 driver。

常见 shortcut：

- 单箱 `right,left` 后若没有目标、墙口或通道变化，就只是动作 witness。
- 只看到首步 `force_blocked` 不能写成不可回返；它只说明前进目标格被墙挡住。
- 侧齿没有落进连体块目标格时，不能说墙挡住了该形状。
- 剩余箱链在有限搜索中仍可能回到初态，不能写成全局不可逆。

审美风险：

如果只让玩家做单箱往复，会像基础规则演示。真正的选择是把可拆开的箱链还是 sticky 连体块送到边界：前者拉回近端后会留下远端箱，后者必须整块回撤并检查全部目标格。

误用边界：

- 只在开放房间里推回 sticky，不属于边界活塞；必须有 P 侧推入后 L 侧立即 pull 的跨侧交接。
- sticky 侧齿分类的 active consumer 是刚体目标格与墙；P/L 是 driver 和站位转换来源。
- B/S anchor 在这些图里主要保证 `M` 合法存在，不是本子谱主语。

机制角色与归属边界：
- active_rule：P/L `forceModeAt` 造成第一手 push / 第二手 pull 的跨侧读法；crate 链近端抽取和 sticky 刚体目标格检查造成本体差异。
- material_source：B/S anchor 只让 raw `M` 保持 sticky。
- consumer：紧接 `left` pull、侧齿、前沿行程墙、箱链远端残余位。
- incidental：目标 `G` 在本组只保证 layout 合法。
- 关键观察点：`cc_chain_pull_splits_debt` 的第二手从整链移动变为近端抽取；`l_shape_side_tooth_blocks_stroke` 的第一手因下凸格目标墙 `force_blocked`。

证据：

`run=ra_loop_pl_piston_20260708_01`, `cases=c_single_reversible_degenerate,cc_chain_pull_splits_debt,mm_bar_side_tooth_pass_reversible,l_shape_side_tooth_blocks_stroke,l_shape_wide_mouth_reversible,mm_bar_head_wall_blocks_stroke`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe,supplement`

### 单箱目标活塞顺序锁：推入覆盖与回撤撤销

局面卡片：
- 开始摆法：P/L 边界旁有一只 crate，玩家从 P 侧推箱；箱子向外伸出一格时正好落在 goal 上，玩家之后只能原路回撤。
- 关键动作：玩家先把箱推上目标；若还要离开，就必须从 L 侧把箱拉回来。
- 动后局面：第一步暂时填上目标，回撤时箱子离开目标，目标重新空出。
- 最小用法：狭窄通道迫使玩家回撤，因此这个目标只能在最后填；开放侧路或把目标挪开都会消除顺序限制。

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

单箱活塞大多时候只是退化往复：`right,left` 回到初态。但如果第一手伸出位正好是目标，向右推会暂时填上目标。狭窄通道让玩家之后只能向左回撤，而 L 侧的 `left` 会把 crate 拉出目标。因此，只要还有别的动作没做完，这个目标就不能提前填。

对照关系：

- `corridor_goal_last_action`：`right` 后 crate 覆盖目标，`final.isWin=true`。这证明向外推一格可以作为最后一步。
- `corridor_goal_then_forced_retract`：同一图 `right,left` 后目标重新空出，`final.isWin=false`。这证明回撤会把箱子拉离目标。
- `open_side_exit_preserves_goal`：打开侧向出口后，`right,down` 保持目标覆盖，说明必须回撤才形成顺序锁。
- `corridor_goal_offset_no_temp_cover`：目标偏离伸出位时 `right` 不覆盖目标，说明目标必须放在活塞伸出位。

开始条件：

- 单箱必须紧贴 P/L 边界交接位，第一手由 P 侧 push 把 crate 推到目标上。
- 玩家推入后必须落在 L 侧；后续回撤方向必须触发 pull，而不是普通 walk。
- 通道要封住侧向出口，使目标覆盖后的必要动作是 `left` 回撤。
- goal 必须在第一手伸出位；偏一格只会变成普通推箱。

动后局面：

- 最后动作覆盖：`right` 后渲染为 `*`，局部目标满足。
- 回撤撤销：继续 `left` 触发 `pull_object:crate#1`，`*` 还原为 `CG`。
- shortcut：若能 `down` / `up` 离开，则 crate 留在目标上，不再产生顺序锁。
- 错位目标：伸出位没有目标时，第一步不会暂时填上任何目标。

结构旋钮：

- 目标位置：伸出位 / 偏前一格。
- 出口形状：狭窄一维通道 / 上下侧路开放。
- 动作终止点：`right` 作为最后动作 / `right,left` 必须回撤。
- consumer：goal、通道出口、pull 回撤。

可以接着怎么用：

- 多目标顺序：把这个目标安排成最后目标；提前完成会在回撤中被撤销。
- 回返门：要求玩家先进入活塞通道处理别的结构，最后才推箱上目标并停止。
- 最短接法：目标被暂时填上，但玩家回撤时会把箱拉走，因此该目标必须最后完成。

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
- consumer：goal 位于箱子伸出一格的位置；狭窄通道封住其他出口，迫使玩家回撤。
- incidental：没有 B/S 或 sticky；这是单箱活塞的目标顺序用途。
- 关键观察点：`right` 后 `after.isWin=true`，继续 `left` 后 `final.isWin=false`。

退化解释：

这不是普通“箱子上目标”的 witness，因为开放侧路时玩家可以从别处离开并保留目标；也不是普通单箱活塞，因为目标偏位时第一步不会填上目标。只有“箱子伸出一格正好落在目标上，而且玩家之后必须原路回撤”同时成立时，才形成顺序锁。

证据：

`run=ra_loop_pl_single_crate_goal_piston_lock_20260708_01`, `cases=corridor_goal_last_action,corridor_goal_then_forced_retract,open_side_exit_preserves_goal,corridor_goal_offset_no_temp_cover`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,supplement`

后续可验证的接法：

把链端抽取后的残余箱接到第二段目标或回返门；把 sticky handoff 接入实际目标口，而不只是前格 / 占格门。若测试 sticky blocker 扫带，沿用 `P/L pull 抽取把手` 的 blocker gap，不要混入本条标题。

最短接法：

`P 侧推链 -> 跨 P/L -> L 侧拉回近端 -> 下方口袋打开`：玩家先把箱链整体推到边界，再从 L 侧只拉回近端箱；下方原先被箱占住的入口因此打开，远端箱仍留在边界另一侧。

证据：

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_single_crate`, `cases=plb_01_push_cross_pull_success,plb_02_push_cross_pull_front_wall,plb_03_l_pull_then_p_push_wall,plb_04_goal_pocket_shortcut`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_sticky_groups`, `cases=pl_sticky_bar_push_pull_extract,pl_sticky_bar_l_front_wall_gate,pl_sticky_bar_open_handle_return,pl_sticky_l_shape_target_wall_gate`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete`

`run=ra_loop_pull_boundary_mobility_20260708_01_pl_boundary_multi_box_force_chain`, `cases=pl_chain2_pull_extract_near_end,pl_chain3_pull_extract_near_end,pl_chain2_pull_front_gate_blocked,pl_chain2_pull_opens_lower_pocket`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## P/L L 形缺角活塞：一推即侧拉

局面卡片：
- 开始摆法：玩家站在 L 形 sticky 连体块的缺角中，L 形位于 P/L 边界旁。
- 关键动作：玩家先沿一个方向推整块一格，随后立即沿垂直方向拉动整块。
- 动后局面：第一步后玩家仍贴着 L 形的另一条边，不用绕路就能完成第二步侧拉。
- 最小用法：第二步要移入的格子可以放墙、B/S anchor、目标或其他可动物，从而决定侧拉被挡、带动物体或覆盖目标。

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

这条不是“推一下再拉回来”的单箱往复。玩家起初站在 L 形缺角里；第一手推动时，玩家与 L 形同步换位，推动后仍贴着 L 形的另一条边，因此下一手可以沿垂直方向侧拉。左右 / 上下镜像由机制对称性闭包，不作为独立证据；正式变量是 L 形新增格相对第二手侧拉方向的位置。

机制角色：

- active_rule：P/L 场中的第一手 push 与第二手 pull 切换；sticky 刚体移动检查整块目标格集合。
- material_source：sticky L 形本体；B/S anchor 在本组只作为可被扫带推动的邻近 consumer。
- consumer：第二手拉动的正交目标格、向前横臂外侧墙门、竖腿低位墙门、B/S anchor 和 goal。
- incidental：P/L anchor 本体只提供场；不讨论锚点移动导致的边界重写。
- 关键观察点：`right` 之后的 `down` 是 `pull_object:sticky#1, move_sticky_rigid`，而无缺角横条的第二手只是 `walk`。

开始条件：

- L 形必须有玩家可站入的缺角；无缺角横条在第一步后不会让玩家贴住垂直侧面。
- 第一手推动后，玩家前格和整块 sticky 的目标格必须开放。
- 第二手侧拉方向上的所有目标格都要可用；任何新增 cell 的目标格都可能成为墙门。
- 若要产生 downstream effect，邻近对象必须放在第二手侧拉扫带中。

动后局面：

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

可以接着怎么用：

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

最小用法验证：

`base_l_triomino_success` 证明基础缺角 L 可以执行 `right, down`，即横推后立即侧拉；`bar_no_notch_walk` 证明无缺角横条只会退化为 walk。`top_arm_right_target_wall` 和 `vertical_leg_down_low_wall` 分别用墙挡住加长横臂或长竖腿的新目标格；`base_target_bs_anchor_swept` 则让侧拉带动 B/S anchor 覆盖目标。

### 缺角立即侧拉的墙位分类

局面卡片：
- 开始摆法：玩家站在 2x2 L 形 sticky 的缺角中；玩家前格、L 形下一步要去的格子可分别设墙或放 B/S anchor。
- 关键动作：玩家先横推 L 形跨过 P/L 边界，再立即垂直拉动。
- 动后局面：玩家前格墙会挡住拉动；L 形任一目标格有墙会挡住整块；把这格墙换成可动 B/S anchor 时，侧拉会把 anchor 一起带走。
- 最小用法：无缺角横条不能立即侧拉；玩家前格墙、L 形目标格墙和可动邻物分别形成三种可画出的结果。

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

这组单独比较第二手侧拉会被哪一格挡住。第一手 `right` 不只移动 L 形，也把玩家送到 L 侧；由于玩家起点在缺角里，落点正好贴着 L 形的另一条边。第二手 `down` 先拒绝玩家目标格墙，再规划 sticky 整块及其碰到对象的受力闭包，最后检查动作后的玩家目标格；同一个形状目标格若不是墙而是可移动 B/S anchor，侧拉就会把 anchor 一起带走。

对照关系：

- 缺角 L vs 横条：缺角 L 的第二手是 `pull_object:sticky#1`；横条没有身后对象，第二手退化为 `walk`。
- 开放 vs 玩家前格墙：同一 L 形、同一动作，墙在玩家前格时给 `destination_blocked`。
- 开放 vs 形状目标墙：墙在 L 形外部目标格时给 `force_blocked`，说明 L 形整块的目标格必须开放。
- 形状目标墙 vs B/S anchor：同一目标位从墙换成 anchor 后，失败变成 `force_chain:n2 + anchor_boundary_shift:box_sticky`，并可覆盖 goal。
- 左下、左上、右下、右上缺角：只作对称闭包 evidence；正式结构变量不是方向，而是缺角位置、墙位以及目标格上放墙、B/S anchor 还是空地。

开始条件：

- 玩家必须在 L 形缺角中；站在外侧再绕路拉不属于本子谱。
- 第一手横向 push 后，玩家必须进入 pull side 且仍贴着 L 形正交邻接面。
- 第二手方向上的玩家前格和 L 形目标格需要分别可控，才能拆开 `destination_blocked` 与 `force_blocked`。
- 被带动的对象必须放在 L 形第二步要移入的格子里；放在扫带范围外不能证明这条关系。

动后局面：

- 立即侧拉：两步完成折向移动，不需要额外绕行。
- 前格封门：玩家 destination 被墙拒绝，L 形本体不移动。
- 形状封门：玩家前格开放，但 sticky 目标格集合撞墙。
- 扫带结果：B/S anchor 被侧拉带动，并移动到目标上。

结构旋钮：

- 缺角：有 / 无。
- 第二手方向：规范方向写 `down`；镜像方向只作对称来源。
- 墙位：玩家前格 / L 形外部目标格。
- 目标格内容：墙 / B/S anchor / 空地。
- 第二步结果：回返、被墙挡住、带动邻物或覆盖目标。

可以接着怎么用：

- 门位教学：同一两步结构把玩家门和形状门分离，适合做局部分类器。
- 二步折向活塞：把横向 push 转成纵向 pull，可接回返门或目标口。
- 可动邻物：把目标墙换成 anchor、crate 或 sticky blocker，观察它被一起带走、与黏块合并或完全挡住侧拉。
- 目标覆盖：B/S anchor 被扫到 goal 上，证明不是空事件。

常见 shortcut：

- 横条退化成 walk，不能写成 L 形活塞。
- 如果玩家是在开放空间中绕到侧面再拉，就不能证明缺角让第二手侧拉立即成立。
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
- material_source：B/S anchor 在非扫带 case 中只让 sticky 合法存在，在扫带 case 中是被侧拉带动的邻物。
- consumer：横条错例、玩家前格墙、L 形目标墙、B/S anchor 和 goal。
- incidental：非扫带 case 的 goal 只保证 layout 合法。
- 关键观察点：第二手垂直动作从 `walk` 变成 `pull_object:sticky#1`；同一目标格放墙时为 `destination_blocked` / `force_blocked`，换成 anchor 后则会带动 anchor。

证据：

`run=ra_loop_pl_l_notch_immediate_pull_20260708_01`, `cases=bl_notch_push_right_pull_down,tl_notch_push_right_pull_up,br_notch_push_left_pull_down,tr_notch_push_left_pull_up,bar_notch_absent_pull_degenerates_to_walk,bl_notch_down_front_wall_blocks_pull,bl_notch_down_target_wall_blocks_shape,bl_notch_down_sweeps_bs_anchor`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe,supplement`

### 横推后出现的正交操作位

局面卡片：
- 开始摆法：L 形 sticky 位于 P/L 横向边界旁，凸脚朝前或朝后；侧拉所需的玩家站位和 L 形目标格可分别设墙。
- 关键动作：玩家先水平推 L 形一格，再从新露出的侧面垂直拉动。
- 动后局面：凸脚朝前时可能第一步就撞墙；凸脚朝后时第一步可以完成，但第二步侧拉可能撞到同一格墙；把墙换成 B/S anchor 后会带动 anchor。
- 最小用法：封住初始侧拉位置可以证明操作位由横推产生；同一墙位还能区分第一步和第二步究竟哪一步失败。

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

这组允许玩家不从缺角里立即侧拉。横向推动一格后，L 形凸脚会移动到新的列，玩家也能到达侧拉位置。凸脚在前侧还是后侧，决定同一格墙会挡住哪一步：前侧凸脚可能让第一手 `right` 直接撞墙；后侧凸脚允许第一步完成，但第二手侧拉时右臂目标格撞墙。

对照关系：

- 下凸左脚 vs 下凸右脚：同一墙位从第二手侧拉目标墙变成第一手行程墙。
- 上凸左脚 vs 上凸右脚：镜像方向复现同一阶段差异，只作为对称闭包 evidence。
- 初始把手封墙 vs stroke 后开放：排除“开放房间里 L 形本来就能侧拉”的解释，证明把手由横向 stroke 生成。
- 侧向目标墙 vs B/S anchor：同一格放墙时挡住侧拉，换成 B/S anchor 时会被一起带走。

开始条件：

- L 形必须先被 P/L 横向 stroke 移位；直接站在侧面拉的开放场景不属于本子谱。
- 凸脚位置要能相对同一墙位前 / 后切换，才能拆出第一手墙和第二手墙。
- 玩家必须能在 stroke 后到达或已经处于侧向 pull 把手位。
- 扫带对象必须位于第二手侧向 pull 的目标格集合中。

动后局面：

- 横推后出现操作位：横向推后，凸脚位置与玩家站位允许下一手正交 pull。
- 阶段墙：同一墙位按凸脚朝向成为 first-stroke blocker 或 lateral-pull blocker。
- 扫带邻物：侧向 pull 推动 B/S anchor 并可覆盖 goal。
- 回返未知时只写 bounded 结论，不写全局不可回返。

结构旋钮：

- 凸脚位置：左脚 / 右脚，或上凸镜像。
- 把手格：初始封闭 / stroke 后开放。
- 墙位：第一手行程目标格 / 第二手侧向目标格。
- 目标格内容：墙 / B/S anchor / 空地。
- 动作结果：出现侧拉操作位、区分第一步或第二步撞墙、带动邻物或覆盖目标。

可以接着怎么用：

- 把手门：要求玩家先做横向 stroke 才能获得侧向 pull。
- 阶段分类器：同一墙位按 L 形凸脚位置区分第一手失败和第二手失败。
- 扫带 driver：把侧向目标墙替换为 anchor 或 crate，侧拉成为移动邻物的 driver。
- 最短接法：`横向推一格 -> 出现侧拉操作位 -> 带动邻物 / 打开回返门`。

常见 shortcut：

- 如果初始侧向把手本来开放，玩家可能不需要 P/L stroke。
- 如果墙位没有进入任何目标格集合，只是普通地形墙。
- 只收左右 / 上下朝向对照会把对称性误写成设计空间。
- B/S anchor 作为扫带对象时，不应把本子谱改名成 B/S 边界结构。

审美风险：

这个变体比缺角立即侧拉更松，容易退化成“L 形可移动”。只有当横推前后玩家能否到达侧拉位置发生变化，或同一格墙明确挡住第一步而不是第二步时，它才有独立价值。

误用边界：

- 不把四个朝向都写成正式变量；正式变量是凸脚相对行程墙和侧向目标格的位置。
- 不把 `force_blocked` 写成不可回返；它只说明当前阶段目标格关闭。
- 不把扫带 case 的 exhausted return 写成不可逆。

机制角色与归属边界：
- active_rule：P/L 横向 stroke 制造侧向 pull 站位；sticky L 形刚体目标格检查制造阶段墙；force chain 让侧向目标格中的 B/S anchor 被扫带。
- material_source：B/S anchor 在非扫带 case 中只保持 sticky 合法；在扫带 case 中是会被一起带动的邻物。
- consumer：同一墙位、初始把手封墙、B/S anchor 和 goal。
- incidental：非扫带 case 的 goal 只保证 layout 合法。
- 关键观察点：同一墙位在不同凸脚位置中第一次改变动作结果的位置，以及 `dl_piston_shift_opens_lateral_handle` 中 stroke 后把手可达性改变。

证据：

`run=ra_loop_pl_l_shape_lateral_handle_20260708_01`, `cases=dl_foot_side_wall_blocks_lateral_only,dr_foot_same_wall_blocks_first_stroke,ul_foot_up_pull_right_target_wall,ur_foot_same_wall_blocks_first_stroke,dl_piston_shift_opens_lateral_handle,dl_lateral_sweeps_bs_anchor_to_goal`, `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe,supplement`

后续可验证的接法：

如果继续探索，应优先测试新的非对称形状，或让侧拉带动不同对象；不要补左右 / 上下镜像，也不要把普通组合写入 backlog。

证据：

`run=ra_loop_pl_l_notch_shape_spectrum_20260708_01`, `cases=base_l_triomino_success,bar_no_notch_walk,top_arm_right_success,top_arm_right_target_wall,top_arm_left_tail_success,vertical_leg_down_success,vertical_leg_down_low_wall,base_target_bs_anchor_swept`, `tags=runtime_observed,bounded_return,bounded_graph,graph_complete,consumption_probe`
