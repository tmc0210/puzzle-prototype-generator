# Proposed Families: ra_probe_pl_wall_anchor_03

本文件是 explorer 给 curator 的结构族草案，不是正式 lexicon。所有 case 来自 `ra_probe_pl_wall_anchor_03`，且只使用 P/L 推拉锚点与墙结构。

## pl_long_axis_wall_ratchet

family 名称：P/L 长轴墙廊棘轮

局部问题：
水平 P/L 在一格高墙廊中沿 P->L 方向受力时，L 端前方余量与侧向绕行通路如何改变“能否首推、能否继续推、能否回到初始”。

结构旋钮：

- L 端前方空格数量：0、1、2。
- 是否有侧向绕行廊。
- 首步后玩家是否仍处于 P 侧接触位。
- 玩家是否能到达 L 侧但仍缺少长轴反向 force。

变体谱：

- `no_front_cell`：`right` 为 `force_blocked`；局部图 complete / 1 state。不要把 return depth 0 解释成可回返。
- `one_front_cell`：首步 `right` legal，触发 `push_object:push_pull_anchor` 与 `anchor_boundary_shift:push_pull`；首步后 `right` 变为 `force_blocked`，回返搜索 complete 为 no。
- `two_front_cells`：首步后 `right` 仍 legal；局部图 complete / 6 states，说明第二个前方空格保留下一次长轴推进。
- `side_bypass`：首步后新增 `down` 步行与更大可达图 complete / 33 states，但回返仍 complete 为 no；绕行不是长轴反推。

共同解释：
这组变体不是单纯验证“锚点可被推”。它显示 P/L 长轴方向上的可动性由标签边界决定：玩家在 P 侧能朝 L 端推，玩家在 L 侧的 pull 也不会提供朝 P 端的反向长轴位移。墙廊的 L 端余量决定棘轮还能消耗几个停位；侧廊可以增加玩家位置集合，但不自动恢复反向位移。

建议 curator 收录：

- 收录 `one_front_cell`、`two_front_cells`、`side_bypass` 作为正向容量和反例边界。
- 收录 `no_front_cell` 作为动作非法的下界，但明确它不是回返证据。

建议 curator 不收录项：

- 不收录“P/L 总是不可逆”这类宽结论。
- 不收录“能绕行就能回返”或“不能绕行才不可回返”的说法；`side_bypass` 已经反驳。

证据建议：
`run=ra_probe_pl_wall_anchor_03`, `cases=long_axis_no_front_cell,long_axis_one_front_cell,long_axis_two_front_cells,long_axis_side_bypass_still_one_way`, `tags=runtime_observed,bounded_return,graph_complete`

## pl_perpendicular_handle_wall_gates

family 名称：P/L 横向把手的墙格门

局部问题：
水平 P/L 做垂直位移时，P 侧推把手和 L 侧拉把手各自需要哪些墙格开放；哪些看似相邻的墙格会把动作合法性或回返性改掉。

结构旋钮：

- 施力侧：P 侧 push 接触 vs L 侧 pull 离开。
- 玩家 pull 前格是否为空。
- P/L 两个半格的目标格是否同时为空，尤其是非接触半格。
- 首步后 L 侧回返前格是否开放。
- 房间是否保留绕到反向把手的路径。

变体谱：

- `p_side_push_open_return`：P 侧向下推合法；首步后四方向均 legal；回返 depth 3，局部图 complete / 345 states。
- `p_side_push_l_target_blocked`：只堵 L 半格下落目标，P 侧 `down` 变为 `force_blocked`；说明非接触半格也参与 force plan。
- `p_side_push_l_front_wall`：首步向下推合法，但推动后 L 侧 pull 前格被墙堵住；回返搜索 complete 为 no。
- `l_side_pull_open_return`：L 侧向上拉合法，触发 `pull_object:push_pull_anchor` 与 `anchor_boundary_shift:push_pull`；回返 depth 3。
- `l_side_pull_front_wall`：只堵玩家前进格，`up` 为 `destination_blocked`；这是 pull 动作最早失败条件。
- `l_side_pull_p_target_wall`：玩家前进格开放，但 P 半格上移目标被墙堵住，`up` 为 `force_blocked`。

共同解释：
横向 P/L 的垂直位移有两套把手语言。P 侧接触格把锚推向输入方向；L 侧站位必须先有空前格，再把身后的锚拉向输入方向。两套把手都要求 P/L 两个半格的目标格同时开放。墙格的作用不是抽象地“增加限制”，而是分成玩家前格门、锚点另一半目标门、以及首步后回返门。

建议 curator 收录：

- 收录全部六个变体。它们包含两个正例、三个动作非法反例和一个“首步合法但不可回返”的边界 case。
- 将 `p_side_push_l_front_wall` 标成回返边界，不把它混同为动作合法性边界。

建议 curator 不收录项：

- 不收录“P 侧就是 push、L 侧就是 pull”的规则复述。
- 不收录只依赖单步 legal/illegal 而没有指出具体墙格位置的说法。
- 不把 `l_side_pull_front_wall` 与 `l_side_pull_p_target_wall` 合并；它们失败原因不同。

证据建议：
`run=ra_probe_pl_wall_anchor_03`, `cases=p_side_push_down_open_loop,p_side_push_down_other_half_wall,p_side_push_down_l_front_wall_after_shift,l_side_pull_up_open_loop,l_side_pull_up_front_wall,l_side_pull_up_p_target_wall`, `tags=runtime_observed,bounded_return,graph_complete`
