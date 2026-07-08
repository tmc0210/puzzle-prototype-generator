# Proposed Families: pl_boundary_single_crate

只收录通过 true boundary gate 的结构族。所有条目的 active_rule 都是 `P/L forceModeAt changes player action semantics`；`P/L` anchor 提供边界和半平面判定，属于 material_source。墙、目标、前格空性和站位是 consumer。

## Accepted

### single_crate_boundary_exchange

- 证据 case：`plb_01_push_cross_pull_success`、`plb_02_push_cross_pull_front_wall`。
- 结构：水平 `P L` 边界；crate 从 P 侧边界相邻格开始，P 侧玩家先 push，把 crate 交到 L 侧边界相邻格；玩家绕行跨过边界后，从 L 侧用 pull 继续操作同一 crate。
- 变化变量：L 侧 pull 的前格是否为空。
- 机制声明：P 侧的相邻前方 crate 是 push 目标；跨到 L 侧后，动作语义切换成“前格必须空、身后一格 crate 才会被拉”。这不能用全图 push 或全图 pull 单独解释。
- consumer：开放前格产生 `pull_object:crate#1`；墙前格产生 `destination_blocked`。

### single_crate_l_pull_p_release_gate

- 证据 case：`plb_03_l_pull_then_p_push_wall`。
- 结构：crate 位于 L 侧边界相邻列，L 侧玩家先沿纵向 pull；随后玩家跨回 P 侧，站到 crate 的 P 侧邻格，尝试 push。
- 变化变量：P 侧 push 方向的目标格被墙堵住。
- 机制声明：L 侧先按 pull 语义移动同一 crate；跨回 P 侧后，同一 crate 的下一次互动变成 push 语义，并被墙消费为 `force_blocked`。
- consumer：侧墙阻断 P 侧 release / 回推。

### single_crate_boundary_goal_pocket

- 证据 case：`plb_04_goal_pocket_shortcut`。
- 结构：P 侧先 push crate 到 L 侧边界相邻格；玩家跨到 L 侧并站在目标口袋上；L 侧 pull 把 crate 拉入玩家原站位。
- 变化变量：L puller 的站位同时是目标口袋。
- 机制声明：P 侧只能完成边界 handoff；L 侧 pull 的“crate 移入玩家原站位”语义把 handoff 转化为目标覆盖 shortcut。
- consumer：目标口袋。第 5 步玩家站上目标仍非覆盖；第 6 步 crate 覆盖目标后 `isWin=true`。

## Not For Lexicon

- 本批没有 case 因未通过 true boundary gate 被剔除。
- 局部可达图中的 `push_object:push_pull_anchor`、`pull_object:push_pull_anchor` 和 `anchor_boundary_shift:push_pull` 不进入本 topic family；这些来自 graph exploration 的旁支，脚本 witness 没有把锚点位移作为关键差异。
- `returnToInitial.status=exhausted` 只保留为未知，不作为“不可回返”家族证据。
