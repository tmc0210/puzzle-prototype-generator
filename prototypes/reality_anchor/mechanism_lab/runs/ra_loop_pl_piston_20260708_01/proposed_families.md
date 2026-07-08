# Proposed Families: ra_loop_pl_piston_20260708_01

## P/L 边界活塞：本体形状与墙口分类

接口卡片：
- 输入接口：P/L anchor 定义一条竖向边界，玩家站在 P 侧边界列，活塞本体从 L 侧相邻格开始；本体可以是单箱、箱链、二格 sticky 横条或 L 形 sticky。玩家的第一手是 P 侧 `right` push，若成功会落入 L 侧并站在本体左侧。
- 输出接口：单箱两步精确回撤；箱链输出“近端箱抽回 + 远端残余债”；sticky 横条 / L 形输出可精确往复的刚体活塞；墙齿或前沿墙可把某些本体的伸出 stroke 直接分类为失败。
- 最小 consumer：同一侧齿消费 L 形下凸格但不消费横条；前沿行程墙消费二格横条的伸出目标格；紧接 `left` pull 消费跨界后玩家已经在 L 侧这一状态。

局部结构谱：

```text
单箱退化：right,left 精确回初态
#########
#..PL..G#
#.......#
#..@C...#
#.......#
#########

箱链：right 推整链，left 只抽近端，留下 C.C
#########
#..PL..G#
#.......#
#..@CC..#
#.......#
#########

横条 + 侧齿：侧齿不在占格目标里，right,left 精确往复
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#....#..#
#########

L 形 + 同一侧齿：下凸格目标撞墙，right 被 force_blocked
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M#..#
#########

L 形宽口：移除侧齿后，right,left 精确往复
#########
#B#######
#S#PL..G#
#.......#
#..@MM..#
#...M...#
#########

横条 + 前沿行程墙：伸出 stroke 被 force_blocked
#########
#B#######
#S#PL..G#
#.......#
#..@MM#.#
#.......#
#########
```

共同解释：

这组变体把 P/L 边界交接读成活塞结构：第一手 push 不只是推物体，而是把玩家送到 L 侧把手位；第二手 pull 是否能撤回、撤回什么、留下什么债，取决于活塞本体的对象模型。箱链不是刚体，所以 push 整链后 pull 只抽近端；sticky 是刚体，所以横条和宽口 L 形可以整体回撤；墙齿和前沿墙消费的是刚体占格目标集合。

对照关系：

- `C` vs `CC`：单箱两步回初态；箱链两步后变成 `C.C`，远端箱成为残余债。变化变量是本体长度和对象是否刚体。
- `CC` vs `MM`：二者第一手都可被整体推入，但第二手差异来自对象模型；`CC` 被 pull 抽近端，`MM` 作为刚体整体回撤。
- `MM` vs L 形：同一侧齿对横条无效，对 L 形有效，因为 L 形下凸格的目标位撞墙。
- L 形侧齿 vs L 形宽口：移除侧齿后 L 形恢复 right/left 往复，说明不是 L 形不能活塞，而是口宽 / 侧齿消费了形状。
- `MM` 侧齿 pass vs `MM` 前沿墙 block：同为横条，侧齿在占格目标外时不消费，前沿目标墙会直接关闭伸出 stroke。

可接入的结构：

- 接目标袋：把箱链活塞的远端残余箱接到第二目标袋，或让近端抽回打开单格口。
- 接移动边界刷子：用可往复 sticky 活塞或箱链残余债作为 B/S anchor 刷线的停位 driver。
- 接刚体墙口：把 `MM`、L 形、2x2 或三格条作为不同活塞本体，交给侧齿、口宽和前沿墙分类。
- 接回返门：把第一手伸出态作为门闩，要求玩家用第二手 pull 复位，否则后续站位关闭。

误用边界：

- 单箱 `right,left` 没有下游消费时只是动作 witness，不应单独进入 lexicon。
- 只有首步 `force_blocked` 不能写成“不可撤回”；它只说明伸出行程被墙消费。
- 侧齿分类的 active consumer 是 sticky 刚体目标格与墙；P/L 边界是 driver，不应把所有墙口差异归为 P/L 新规则。
- 箱链两步后虽然留下残余债，但有限搜索 depth 14 可回到初始；不能把它写成全局不可回返。
- 本轮只覆盖横向边界 right/left；竖向边界、反向 P/L 摆放、2x2 / 竖条 / 三格条未覆盖。

证据来源：

- `run=ra_loop_pl_piston_20260708_01`
- `cases=c_single_reversible_degenerate,cc_chain_pull_splits_debt,mm_bar_side_tooth_pass_reversible,l_shape_side_tooth_blocks_stroke,l_shape_wide_mouth_reversible,mm_bar_head_wall_blocks_stroke`
- `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## Curator 检查信息

机制角色：
- active_rule：P/L `forceModeAt` 让第一手从 P 侧 push 跨界、第二手在 L 侧 pull；箱链近端抽取差异来自 pull 对身后一格对象实例施力；sticky 形状分类来自 sticky 刚体整体目标格与墙。
- material_source：B/S anchor 只用于允许 raw `M` 并保持相关区域为 sticky side；它不是本轮关键差异。
- consumer：紧接 `left` pull、侧齿、前沿行程墙、箱链远端残余位置。
- incidental：目标 `G` 只保证 layout 合法，不作为本轮主要 consumer。
- 关键观察点：`cc_chain_pull_splits_debt` 的第二手从整链变为近端抽取；`l_shape_side_tooth_blocks_stroke` 的第一手 `right` 因下凸格目标墙 `force_blocked`。

退化解释：

本轮不是规则复述，因为相同 P/L 边界 stroke 在不同本体上产生不同输出：单箱无债、箱链残余债、sticky 刚体整体回撤、L 形被侧齿分类。它也不是普通 sticky 墙口谱，因为箱链和单箱对照隔离了“边界跨侧后紧接 pull”的活塞语义；但正式归属应避免把侧齿阻塞完全命名为 P/L 新规则。

建议裁决：

`supplement` 到 `P/L 边界交接：推入、跨侧与抽取分配`，标题可用“小节：活塞读法：精确回撤、近端抽取与形状口宽”。同时在该小节中交叉引用 `刚体黏块 + 墙口：反向施力格谱系`。不建议直接 `promote` 新顶层，除非后续补到一个更强的组合 consumer，例如 `P/L 活塞 -> B/S 刷线 -> 门口消费`，或 `箱链残余债 -> 第二目标袋`。
