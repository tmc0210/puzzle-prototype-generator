# Explorer Notes: pl_boundary_sticky_groups

## 读取与运行边界

- 已读：本 topic `brief.md`、本轮 `round_manifest.md`、Reality Anchor `README.md` / `mechanic.yml`、`mechanics.ts` / `runtime.ts`、`localExperimentRunner.ts`、机制实验流程文档、`lexicon_index.md` / `backlog.md` 的索引层、以及本 topic 的 `results.json` / `report.md`。
- 未读：`design_archive/`、候选关卡、人类评价、critic review、sampler profile。
- B/S 处理：所有 case 中 B/S 都封闭在上方隔间，只作为 sticky material_source；没有把 B/S 写成 active_rule。
- runner：指定命令成功，生成 `cases.json`、`results.json`、`report.md`。4 个局部图的可达图均为 `complete`；`returnToInitial.status=exhausted` 只记为未知。

## 总体观察

本组 case 把 P/L 固定成 `x<=4` 为 push、`x>=5` 为 pull。有效动作序列都让玩家实际从 P 侧跨到 L 侧，并且在 P 侧先对同一个 sticky group 发生 `push_object:sticky#1 + move_sticky_rigid`，随后在 L 侧发生 `pull_object:sticky#1 + move_sticky_rigid` 或明确的 pull 门控。

关键差异不是“全图 pull sticky 过墙口”，而是同一 sticky footprint 在边界邻域先接受 P 侧 push 检查，再接受 L 侧 pull 检查：pull 侧额外要求玩家前格为空，并允许 sticky 目标 footprint 吃进玩家旧格；L 形 case 还显示额外 footprint 目标格会独立触发 `force_blocked`。

## 逐 case 判定

### pl_sticky_bar_push_pull_extract

- runtime 事实：第 1 步 `right` 在 P 侧合法 push，二格横条从 `x=2,3` 到 `x=3,4`；玩家绕行后第 5 步实际跨到 L 侧；第 7 步 `right` 在 L 侧合法 pull，sticky 进入 `x=4,5`，玩家到 `x=6`。
- true boundary gate：满足。sticky footprint 第 1 步后贴到 P/L 边界相邻格，L 侧 pull 的目标包含玩家旧格，动作语义不同于 P 侧继续 push。
- active_rule：`push_force` + `pull_force` 对 sticky rigid footprint 的不同检查。
- material_source：`box_sticky_normalize` / `sticky_merge` 只生成二格 sticky 横条。
- consumer：L 侧开放前格和开放 footprint 目标格，允许 handoff 成立。
- 旧语料重复风险：中等。它接近旧索引中的 `P/L pull 抽取把手`，但本 case 有先 P push 送入边界、再 L pull 接手的同一 sticky group handoff，不是单独 pull 抽取。
- 回返：`unknown exhausted`，只能写未知，不能当作不可回返证明。

### pl_sticky_bar_l_front_wall_gate

- runtime 事实：前 6 步与正例同构，玩家跨到 L 侧把手位；第 7 步 `right` 为 `destination_blocked`。
- true boundary gate：满足，作为显式门控反例。P 侧 sticky push 已发生，玩家已跨界；L 侧 sticky pull 尝试被玩家前格墙阻断。
- active_rule：`pull_force` 的玩家前格门；P 侧 `push_force` 提供进入边界邻域的前置状态。
- material_source：B/S 只提供二格 sticky 横条。
- consumer：L 侧玩家前格墙。
- 旧语料重复风险：高。前格门本身已是 `P/L pull 抽取把手` 的旧结论；本 case 只应作为 handoff family 的边界反例，不宜单独入库。

### pl_sticky_bar_open_handle_return

- runtime 事实：初始二格 sticky 横条跨 P/L 边界；第 1 步 `down` 在 P 侧 push，把横条下移并打开 L 侧上拉把手；第 2 步玩家从 `x=4` 跨到 `x=5`；第 3 步 `up` 在 L 侧 pull，把同一 footprint 拉回原位；第 4 步走回初始玩家格，最终变化格为无，`returnToInitial` 为 `yes depth=0`。
- true boundary gate：满足。P 侧 push 与 L 侧 pull 对同一跨界 footprint 构成互补，可形成可逆 handoff。
- active_rule：`push_force` / `pull_force` 的边界侧切换；关键是把手格在两侧语义下互补。
- material_source：B/S 只提供 sticky 横条。
- consumer：开放把手格和边界跨越路径；消费方式是“能否把 push 后状态立即交给 L pull 回收”。
- 旧语料重复风险：中低。它和旧 `P/L 横向把手` 的把手门相邻，但对象从 P/L anchor 换成 sticky footprint，且证明了同一 sticky group 的可逆边界 handoff。

### pl_sticky_l_shape_target_wall_gate

- runtime 事实：第 1 步 P 侧 push 合法，把 L 形 footprint 送到边界邻域；玩家跨界后第 7 步 L 侧 `right` 为 `force_blocked`。此时玩家前格开放，失败来自下凸 sticky cell 的额外目标格撞墙。
- true boundary gate：满足，作为 shape correction。P 侧 push 和跨界都成立，L 侧 pull 被 sticky footprint 目标格而非玩家前格阻断。
- active_rule：`pull_force` 对 rigid sticky footprint 的整体目标检查。
- material_source：B/S 只提供 L 形 sticky group。
- consumer：L 侧下凸目标格墙。
- 旧语料重复风险：中高。单看结果接近旧 `刚体黏块 + 墙口` 的 footprint 消费；保留价值在于它与二格横条正例同一 P/L handoff，把失败归因到 L 侧 pull footprint 目标格。

## 结论范围校准

- 可支撑：P/L 真边界附近存在 sticky group handoff 接口。P 侧 push 可以把 sticky footprint 送到边界邻域；玩家跨到 L 侧后，pull 会用不同检查消费同一局部状态，产生成功抽出、前格门失败、额外 footprint 目标格失败或可逆回返。
- 不支撑：不能把所有 sticky-wall 门都归入 P/L 边界；也不能把 `destination_blocked` 或 `force_blocked` 单独当作新发现。
- 不应入库的弱结论：`pl_sticky_bar_l_front_wall_gate` 单独只是旧 pull 前格门；`pl_sticky_l_shape_target_wall_gate` 单独只是旧 sticky footprint 墙消费。它们必须附在 P push -> cross boundary -> L pull 的 handoff 对照中才有本 topic 价值。
- 可提给 curator：建议作为 `P/L pull 抽取把手` 与 `刚体黏块 + 墙口` 的 supplement，标题应强调 “sticky group handoff across P/L”，不建议把 B/S 或纯 sticky-wall 写成 active family。
