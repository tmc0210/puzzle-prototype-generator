# Explorer Notes: ra_struct_tail_selector_01

## Exploration Brief

- prototype: `Reality_Anchor`
- scope: `C+M/C+MM` 尾债的二次边界消费，以及 `P/L pull` 驱动的 `B/S` 刷子 stroke 选择器。
- exclusions: 不进入完整关卡设计，不读取 archive、人类评价、历史候选、sampler profile 或 hardcoded template；不把一阶规则复述当成果。
- source_boundary: 使用 runtime、mechanism-lab-run 输出、当前 run 的手写局部 patch，以及现有 mechanism lexicon 中已收录的本原型局部语料。
- run_intent: `explore_then_curate`

## 本轮假设

上一轮把 `C+M/C+MM` 作为门口消费后的尾债记录下来，但尾债还只是“留下来的东西”。本轮把尾债继续接到同一条 `B/S` 边界上，比较它被下刷回收到 crate、被上刷再绑定成 sticky 工具、或沿边界侧向搬运时的状态类别差异。

另一条线把 `P/L` 驱动的边界刷子做成 stroke 选择器：不是改变 pull 规则，而是改变远处资源列与边界的初始距离，让一次、两次、三次左拉分别落在“已经刷入”“准备位”“仍暂存”的不同状态。

## 有效比较

`tail_debt_reconsumption` 的核心比较是同一尾债形态在边界不同运动方向下的再消费：

- `tail_cm_recover_down`：`C+M` 状态下边界下刷，尾部 `M` 回收到 crate 侧，最终为竖向 `CC`；局部图 complete / 20054 states。回返搜索耗尽，只作为产物状态和动作表证据。
- `tail_cm_rebind_up`：同一 `C+M` 状态下边界上刷，门内 crate 被并入 sticky 侧并与尾债合成竖向工具；回返 depth 11，局部图 complete / 18337 states。
- `tail_cm_carry_side`：保持上下边界关系，只侧向搬运 `B/S` anchor，`C+M` 分工保留；回返 depth 15，局部图 complete / 16254 states。
- `tail_cmm_recover_down`：`C+MM` 宽尾下刷后，宽尾两格一起回收到 crate 侧，最终为三 crate 资源；局部图 complete / 24503 states。回返搜索耗尽，只作为产物状态和动作表证据。
- `tail_cmm_rebind_up`：`C+MM` 宽尾上刷后，crate 与宽尾合成 L 形 sticky 工具；回返 depth 11，局部图 complete / 19924 states。
- `tail_recover_lane_gate_closed`：在 `B/S` anchor 下方加墙，回收链被截在 anchor 行进格；这是 anchor travel gate 边界，不作回返结论。

`pull_brush_stroke_selector` 的核心比较是初始列距与 stroke 次数：

- `stroke_immediate_bind_once`：远处 crate 列位于 B 端列，一次左拉后进入 sticky 侧；回返 depth 15，局部图 complete / 9988 states。
- `stroke_one_delay_first_pull`：anchor 右移一列后，第一拉只把边界带到 crate 列左侧，资源仍是 crate；回返 depth 11，局部图 complete / 9277 states。
- `stroke_one_delay_second_pull`：同一 1 格余量布局执行第二拉，crate 列刷入 sticky 侧；回返 depth 16，局部图 complete / 9277 states。
- `stroke_two_delay_second_pull_preserves`：2 格余量布局执行两拉，边界仍停在准备位，远处资源保持 crate；回返 depth 12，局部图 complete / 11970 states。
- `stroke_two_delay_third_pull_binds`：同一 2 格余量布局执行第三拉，crate 列刷入 sticky 侧；回返 depth 17，局部图 complete / 11970 states。
- `stroke_front_gate_closed`：玩家前格墙关闭 stroke 输入，远处资源保持未消费；这是 front-cell gate 边界，不作回返结论。

## 被修正的解释

- 尾债不是单纯的负担。`C+M` 和 `C+MM` 在下刷时回到可分配 crate，在上刷时变成 sticky 工具，侧向搬运时保留债形等待后续处理。
- 下刷回收分支的最终 `down:force_blocked` 来自 anchor 贴近下方边界后的行进格，而不是尾债本身失去价值；这类状态不能直接转写成不可回返。
- stroke 选择器的状态差异来自远处资源列与 B 端列的相对位置。B 端列停在资源列同列或右侧时，资源保持 crate；B 端列被拉到资源列左侧后，资源进入 sticky 侧。
- 前格墙和 anchor 行进格墙在本轮分别扮演输入端 gate 和 anchor travel gate；它们只说明局部链条被截断，不提供回返性结论。

## 不建议提交 Curator 的弱结论

- 不收录“尾债可以再处理”这种抽象句。合格语料必须写明下刷回收、上刷再绑定、侧向延迟三种几何关系。
- 不把 `tail_cm_recover_down` 或 `tail_cmm_recover_down` 写成不可回返；它们的回返搜索耗尽预算。
- 不把 `tail_recover_lane_gate_closed` 写成尾债失败；关闭点是 `B/S` anchor 行进格。
- 不收录“pull 多拉几次会刷入”这种计数描述；必须绑定初始列距、B/S 边界列和远处 footprint。
- 不把 `stroke_front_gate_closed` 当作失败实验；它是 stroke 选择器的输入门边界。

## 下一轮建议

- 做“尾债加门口压力”：把下刷回收得到的 `CC/CCC` 立即接到一格门口，比较回收资源数和门口动作集合。
- 做“stroke 选择器加分叉站位”：让玩家在同一个 `P/L` pull 区域中选择一拉后转入别的路径，整理准备位可见性和误操作边界。
- 做“再绑定工具推进谱”：把 `tail_cm_rebind_up` 的竖条和 `tail_cmm_rebind_up` 的 L 形工具接到同一墙口，比较工具 footprint 的后续消费差异。
