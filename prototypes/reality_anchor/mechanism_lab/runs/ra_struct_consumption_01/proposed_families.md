# Proposed Families: ra_struct_consumption_01

## Curator 修订

`pl_driven_bs_boundary_brush` 不再建议作为 lexicon 顶层结构族收录。它与已有 `B/S 移动边界刷子` 的主体结构太接近：差异主要是输入侧从直接 push anchor 变成 `P/L pull` 驱动 anchor，并增加玩家前格门和远程站位旋钮。当前处理是折回 `B/S 移动边界刷子` 的“输入侧补充”。

`brush_product_door_consumption` 仍建议保留为顶层结构族，因为它的核心不是再移动边界，而是同一消费口面对 `CC`、`C+M`、`C+MM`、2x2、双柱产物时的消费对象差异。

## Family: P/L 驱动的 B/S 边界刷子

family id: `pl_driven_bs_boundary_brush`

局部问题：

把 `P/L pull` 当成 `B/S` 边界刷子的远程把手后，设计者获得的不是单纯位移，而是一个由 pull 方向控制的资源改写器。关键比较是边界线跨过远处 footprint、沿边界平移、以及玩家前格门关闭时，产物和动作集合如何变化。

结构旋钮：

- pull 方向相对 `B/S` 边界：跨线移动或沿线平移。
- 远处对象 footprint：竖向邻接、横向桥接、隔行不邻接、远离刷线。
- 玩家前格：开放或墙封。
- 刷后对象拓扑：单个 sticky 工具、横条 sticky、多个 sticky 部件、保留 crate。

变体谱：

- `pull_brush_vertical_bind`：跨线刷过竖列 crate，产物是竖向 sticky 工具；回返 depth 15，局部图 complete / 8887 states。
- `pull_brush_horizontal_bridge`：跨线刷过横向相邻资源，产物接成横向 sticky 工具；回返 depth 15，局部图 complete / 9238 states。
- `pull_brush_gap_preserves_parts`：跨线刷过隔行资源，产物保持两个 sticky 部件；回返 depth 13，局部图 complete / 10123 states。
- `pull_parallel_preserves_remote`：沿边界平移 anchor，远处 crate 身份保留；回返 depth 11，局部图 complete / 5317 states。
- `pull_brush_front_wall_closed`：玩家前格被墙封，pull 把手关闭；局部图 complete / 2349 states。该 case 只作为 front-cell gate 边界。

共同解释：

这组结构把“边界刷子”从玩家直接推 anchor 扩展为 `P/L` 远程把手。设计语料的重点是 pull 方向与远处 footprint 的几何关系：跨线时刷出工具或部件，沿线时只搬运边界位置，前格被封时整套刷子失去输入。

建议 curator 处理：

不作为新 lexicon 顶层条目收录。它折回 `B/S 移动边界刷子`：push anchor 刷与 pull anchor 刷共用同一个移动边界刷主体，新增事实只作为输入侧补充和 front-cell gate 参考。

不建议收录项：

- 不收录“pull 能拉动身后 anchor”这种规则级语句。
- 不收录“远处对象会被改变”这种缺少边界方向和 footprint 条件的泛化。
- 不把前格墙 case 当作不可回返材料。

## Family: 边界刷产物的门口消费谱

family id: `brush_product_door_consumption`

局部问题：

边界刷产物进入同一个门口时，`CC`、`C+M`、`C+MM`、2x2 sticky、双柱 sticky 给设计者的不是强弱顺序，而是不同的消费对象：箱链、单箱加尾债、宽尾债、footprint 门、分批工具。

结构旋钮：

- 刷产物类型：`CC`、`C+M`、`C+MM`、2x2 sticky、双柱 sticky。
- 门口宽度和下沿墙：对象 footprint 的低位目标格开放、被墙占用或被列间隙绕开。
- 对象连通性：整块 2x2 或有列间隙的双柱。
- 门口消费动作：推 crate 链、推单 crate、推 sticky 刚体、被 footprint 墙封住。

变体谱：

- `door_cc_chain_push`：`CC` 作为箱链被推入门口，后续还能链推；回返 depth 19，局部图 complete / 15231 states。
- `door_cm_tail_push`：`C+M` 让 crate 进入门口，同时在下方留下 sticky 尾债；回返 depth 17，局部图 complete / 14989 states。
- `door_cmm_tail_push`：`C+MM` 同样给门口一个 crate，但留下宽尾；局部图 complete / 16094 states，回返预算耗尽，只作为产物和动作表证据。
- `door_square_blocked_by_low_wall`：2x2 sticky 在一格低墙处被 `force_blocked`，暴露 footprint 门；局部图 complete / 8649 states。该 case 不作回返结论。
- `door_split_columns_one_column_passes`：列间隙把整块 footprint 问题改成分柱消费，左柱先通过；回返 depth 18，局部图 complete / 29783 states。

共同解释：

这组结构把边界刷产物接到消费位。相同门口面对不同产物时，动作表和剩余债务发生结构性改变：`CC` 是可链推资源，`C+M` 与 `C+MM` 把一个 crate 送入门口并留下不同 footprint 的尾债，2x2 被一格低墙专门封住，双柱则用列间隙把大块消费拆成分批消费。

建议 curator 收录：

收录为一个新 lexicon 条目。它有 5 个近邻变体、一个 footprint gate 边界、一个列间隙反例，并直接连接前一条边界刷语料。证据标签建议使用 `runtime_observed,graph_complete`；其中 `door_cc_chain_push`、`door_cm_tail_push`、`door_split_columns_one_column_passes` 可补充 `bounded_return`，`door_cmm_tail_push` 只保留产物状态和动作表证据。

不建议收录项：

- 不收录“刷出资源后可以推门”这种单动作描述。
- 不把 `door_cmm_tail_push` 写成不可回返。
- 不把 `door_square_blocked_by_low_wall` 泛化成 2x2 无法进门；它只说明下沿目标格被墙占用时，2x2 footprint 被门口检查出来。
- 不把双柱写成天然优于 2x2；它的价值是列间隙提供分批消费路径。
