# Explorer Notes: ra_struct_consumption_01

## Exploration Brief

- prototype: `Reality_Anchor`
- scope: `P/L pull` 作为 `B/S` 移动边界刷子的驱动器；以及边界刷产物在同一门口的消费谱。
- exclusions: 不进入完整关卡设计，不读取 archive、人类评价、历史候选、sampler profile 或 hardcoded template；不把一阶规则复述当成果。
- source_boundary: 使用 runtime、mechanism-lab-run 输出、当前 run 的手写局部 patch，以及现有 mechanism lexicon 中已收录的本原型局部语料。
- run_intent: `explore_then_curate`

## 本轮假设

本轮从两条已有语料继续缩放：`B/S 移动边界刷子` 已经给出远程资源改写，`P/L pull 抽取把手` 已经给出前格门、footprint 门和扫带。新的局部问题是把二者串起来：玩家不直接推 `B/S` anchor，而是用 `P/L` 的 pull 把手拉动它，让边界刷子在远处改写对象；随后把刷出的不同产物送入同一个消费口，比较它们作为设计材料的差异。

## 有效比较

`pl_driven_bs_boundary_brush` 的核心比较不是“pull 能拉动 anchor”，而是 pull 方向和远处对象 footprint 的关系：

- `pull_brush_vertical_bind`：玩家左拉身后的横向 `B/S` anchor，边界左移并跨过远处竖列 crate，产物是一个竖向 sticky 工具；回返 depth 15，局部图 complete / 8887 states。
- `pull_brush_horizontal_bridge`：同样的 pull 刷动作作用在横向相邻资源上，左格跨线后与右侧 sticky 接成横条；回返 depth 15，局部图 complete / 9238 states。
- `pull_brush_gap_preserves_parts`：同样跨线，但两个远处资源隔行，产物保持两个 sticky 部件；回返 depth 13，局部图 complete / 10123 states。
- `pull_parallel_preserves_remote`：pull 沿 `B/S` 边界方向平移，远处 crate 仍保留为 crate；回返 depth 11，局部图 complete / 5317 states。
- `pull_brush_front_wall_closed`：玩家前格墙把 pull 把手关掉，远处资源和身后 anchor 都不参与动作；这是 front-cell gate 边界，不作回返结论。

`brush_product_door_consumption` 的核心比较是同一门口消费位面对不同刷产物时的结构差异：

- `door_cc_chain_push`：先把横条刷回 `CC`，再从左侧推入门口，门口消费表现为普通箱链；回返 depth 19，局部图 complete / 15231 states。
- `door_cm_tail_push`：刷出 `C+M` 后，同样能把 crate 推入门口，但下侧留下 sticky 尾债；回返 depth 17，局部图 complete / 14989 states。
- `door_cmm_tail_push`：刷出 `C+MM` 后，门口得到一个 crate，同时留下更宽的 sticky 尾。最终动作表完整，局部图 complete / 16094 states；回返搜索耗尽预算，只用作产物状态和动作表证据。
- `door_square_blocked_by_low_wall`：把产物改成 2x2 sticky，并在下沿目标格放墙，推门动作停在 `force_blocked`；这是 footprint gate 边界，不作回返结论。
- `door_split_columns_one_column_passes`：把 2x2 绑定问题改成有列间隙的双柱工具，左柱可以先被推入门口；回返 depth 18，局部图 complete / 29783 states。

## 被修正的解释

- `P/L pull + B/S anchor` 的可用结构单位不是“远程拉动”本身，而是“pull 方向让边界线跨过哪一片远处 footprint”。同样移动 anchor，跨线会产生产物，沿边界平移只调位。
- `B/S` 刷出的产物不能按“大块更强”理解。`CC` 适合链式推进，`C+M` 和 `C+MM` 把资源分成门内 crate 与门外尾债，2x2 在一格低墙前会被 footprint 封住，双柱则能分批消费。
- 非法动作 case 在本轮是门型边界：`destination_blocked` 对应玩家前格门，`force_blocked` 对应对象 footprint 门。它们不提供可逆性结论。
- `door_cmm_tail_push` 的 `returnToInitial.status=exhausted` 只能降低回返证据强度，不能转写成不可回返。

## 不建议提交 Curator 的弱结论

- “pull 可以驱动 `B/S` anchor”太接近规则复述，不应单独进入 lexicon。
- “边界刷会改变对象材质”不是结构语料；必须绑定边界运动方向、远处 footprint 邻接图和消费位置。
- `pull_brush_front_wall_closed` 不应写成一个失败实验。它的价值是把 pull 刷子的关闭点定位到玩家前格。
- `door_square_blocked_by_low_wall` 不应写成“2x2 不好用”。它的价值是一格低墙能专门检查 2x2 的下沿 footprint。
- `door_cmm_tail_push` 不应提供回返性判断；它只支持宽尾产物的占位和动作表描述。

## 下一轮建议

- 做“刷子选择器”：让同一个 `P/L` 把手在两条 pull 路径中选择不同 `B/S` 边界方向，比较先刷成工具与先保留资源的后续消费差异。
- 做“尾债再消费”：把 `C+M`、`C+MM` 的 sticky 尾接入第二个 `B/S` 边界，比较尾债被回收成 crate、保留为刚体、或堵住回程的结构谱。
- 做“分柱到合柱”：从 `door_split_columns_one_column_passes` 继续缩放列间距和门后墙形，整理分批通过、通过后合并、通过后互相堵门三种消费状态。
