# Proposed Families: ra_loop_pl_l_shape_lateral_handle_20260708_01

## P/L L形活塞正交把手：朝向、侧拉与扫带

接口卡片：
- 输入接口：P/L 横向边界，玩家在 P 侧能用 `right` 把一个 L 形 sticky 刚体推出边界；L 形朝向可控，分为下凸左脚、下凸右脚、上凸左脚、上凸右脚；玩家能在 stroke 后绕到凸脚生成的正交把手位。
- 输出接口：横向 stroke 后生成一个正交 pull 把手；同一墙位按 L 形朝向变成第一手行程墙或侧向目标墙；侧向目标格若是可移动二格对象，可被扫带成新资源。
- 最小 consumer：墙位消费不同朝向的目标格；初始把手封墙证明正交把手由 stroke 生成；B/S anchor 替代墙后被侧向 pull 扫带并覆盖目标。

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

下凸右脚：同一墙位变成 first stroke 目标墙
##########
#B########
#S#PL...G#
#........#
#..@MM...#
#....M#..#
#........#
#........#
##########

上凸左脚：同一墙位不挡 right，但挡 up pull 的右臂目标格
##########
#B########
#S#PL...G#
#........#
#...M.#..#
#..@MM...#
#........#
#........#
##########

上凸右脚：同一墙位变成 first stroke 目标墙
##########
#B########
#S#PL...G#
#........#
#....M#..#
#..@MM...#
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

P/L 横向 stroke 不只是把 L 形刚体平移一格。它可以把凸脚从一个不可用位置移到开放列，从而生成新的正交 pull 把手。L 形朝向决定同一墙位何时被消费：右脚 L 形会在第一手横向 stroke 中撞墙；左脚 L 形可以先伸出，但后续正交 pull 时右臂撞同一墙。把墙换成可移动 B/S anchor 后，原本的失败格变成扫带资源，证明侧向目标格不是普通阻挡，而是可设计 consumer。

对照关系：

- `dl_foot_side_wall_blocks_lateral_only` vs `dr_foot_same_wall_blocks_first_stroke`：同样是下凸 L，同一墙位从“侧向 pull 目标墙”变成“第一手行程墙”。
- `ul_foot_up_pull_right_target_wall` vs `ur_foot_same_wall_blocks_first_stroke`：上凸 L 也有同样差异，说明这是朝向结构旋钮，不是某个下侧站位偶然。
- `dl_piston_shift_opens_lateral_handle`：初始下方把手格封墙，但横向 stroke 后下凸把手移到开放列并可侧拉，排除了普通开放房间 L 形可动性解释。
- `dl_lateral_sweeps_bs_anchor_to_goal` vs `dl_foot_side_wall_blocks_lateral_only`：把侧向目标墙换成 B/S anchor 后，`force_blocked` 位置变成 `force_chain:n2 + anchor_boundary_shift:box_sticky`，输出可移动邻物位移和目标覆盖。

可接入的结构：

- 接目标袋：侧向扫带的 B/S anchor、P/L anchor 或 crate 可作为目标覆盖资源。
- 接边界刷子：侧向扫带 B/S anchor 后改变刷线位置，生成不同 C/M 产物。
- 接回返门：横向 stroke 生成正交把手后，要求玩家先侧拉再回返，或让侧拉终态关闭某个通道。
- 接刚体墙口：同一 L 形朝向可用墙齿分类第一手行程与第二手侧拉。

误用边界：

- 开放房间中直接侧拉 L 形，不属于本条核心；必须有 P/L 横向 stroke 改变把手可达性或消费阶段。
- B/S anchor 是侧向目标格的 consumer，不是本条命名主语。
- 首步 `force_blocked` 不能写成不可回返，只能说明对应 L 朝向被行程墙消费。
- 扫带 case 的 return search exhausted 不能写成不可回返。
- 本轮只覆盖横向 stroke；竖向 P/L 边界和反向 stroke 未覆盖。

证据来源：

- `run=ra_loop_pl_l_shape_lateral_handle_20260708_01`
- `cases=dl_foot_side_wall_blocks_lateral_only,dr_foot_same_wall_blocks_first_stroke,ul_foot_up_pull_right_target_wall,ur_foot_same_wall_blocks_first_stroke,dl_piston_shift_opens_lateral_handle,dl_lateral_sweeps_bs_anchor_to_goal`
- `tags=runtime_observed,bounded_graph,graph_complete,consumption_probe`

## Curator 检查信息

机制角色：
- active_rule：P/L 边界让横向 stroke 后的玩家进入可触发正交 pull 的站位；sticky 刚体目标格检查让 L 形朝向差异被墙位消费；force chain 让侧向目标格中的 B/S anchor 被扫带。
- material_source：B/S anchor 在前四个 case 只用于允许 raw sticky；在扫带 case 中作为可移动邻物 consumer。
- consumer：同一墙位、初始把手封墙、B/S anchor 目标覆盖。
- incidental：目标 `G` 在非扫带 case 中只保证 layout 合法；不参与关键观察点。
- 关键观察点：同一墙位在 `dl` / `dr`、`ul` / `ur` 中第一次改变动作结果的位置；`dl_piston_shift_opens_lateral_handle` 中 stroke 后把手可达性改变；`dl_lateral_sweeps_bs_anchor_to_goal` 中侧向 pull 由墙阻挡变为扫带 force chain。

退化解释：

这不是普通“L 形能移动”。把初始把手封住后，只有 P/L 横向 stroke 把凸脚移到开放列，正交 pull 才成立。它也不是普通墙口谱，因为同一墙位在不同 L 朝向中消费不同阶段，并且可被可移动邻物替代为扫带资源。

建议裁决：

`promote`。它满足新顶层结构族门槛：有明确输入接口、输出接口、最小 consumer、多个近邻变体、错例和边界修正。正式条目可与 `P/L 边界交接`、`刚体黏块 + 墙口` 互相引用，但不应只作为普通补变体埋在其中。
