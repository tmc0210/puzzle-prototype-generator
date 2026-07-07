# Proposed Families: ra_struct_tail_selector_01

## Curator 修订

这轮两个 family 不再建议作为 lexicon 顶层结构族收录。`tail_debt_reconsumption` 更像“边界刷产物继续接回同一边界刷”的组合链，能作为后续探索线索，但目前没有脱离已有“移动边界刷子”和“刷产物消费谱”的新构型核心。`pull_brush_stroke_selector` 则是 `P/L` 驱动移动边界刷子的距离/次数参数化，应该折回“B/S 移动边界刷子”的输入侧补充，而不是独立条目。

保留本文件下面的 explorer 草案作为事实索引；后续若要重新提升，必须找到不是“推/拉 anchor 用来刷”的新结构差异，例如新的站位互斥、资源拓扑不可交换、或后续消费链里出现现有条目无法覆盖的门型。

## Family: 尾债再消费：回收、再绑定与延迟搬运

family id: `tail_debt_reconsumption`

局部问题：

`C+M` 和 `C+MM` 不是门口消费后的静态残留。把它们继续放在 `B/S` 边界旁边，同一尾债可以被下刷回收到 crate 侧，被上刷重新并入 sticky 工具，或沿边界搬运以延迟处理。设计者得到的是一组尾债后续消费接口。

结构旋钮：

- 尾债形状：`C+M` 单格尾，或 `C+MM` 宽尾。
- 边界运动方向：下刷回收、上刷再绑定、侧向搬运。
- `B/S` anchor 行进格：开放或被墙占用。
- 产物类别：`CC/CCC` 可分配 crate、竖向/ L 形 sticky 工具、保留 `C+M` 债形。

变体谱：

- `tail_cm_recover_down`：`C+M` 下刷后尾部 `M` 回收到 crate 侧，最终为竖向 `CC`；局部图 complete / 20054 states，回返预算耗尽，只作产物证据。
- `tail_cm_rebind_up`：同一 `C+M` 上刷后，crate 与尾债合成竖向 sticky 工具；回返 depth 11，局部图 complete / 18337 states。
- `tail_cm_carry_side`：同一 `C+M` 侧向搬运，crate 与 sticky 尾分工保留；回返 depth 15，局部图 complete / 16254 states。
- `tail_cmm_recover_down`：`C+MM` 下刷后宽尾两格回收到 crate 侧，最终为三 crate 资源；局部图 complete / 24503 states，回返预算耗尽，只作产物证据。
- `tail_cmm_rebind_up`：`C+MM` 上刷后合成 L 形 sticky 工具；回返 depth 11，局部图 complete / 19924 states。
- `tail_recover_lane_gate_closed`：`B/S` anchor 下方墙关闭下刷输入，`C+M` 债形保持；局部图 complete / 11505 states。该 case 只作为 anchor travel gate 边界。

共同解释：

这组结构把“尾债”改写成可继续消费的中间资源。尾债形状决定资源量和工具 footprint，边界运动方向决定它走向回收、再绑定还是延迟。关闭点可以出现在 anchor 行进格，而不是尾债所在格。

建议 curator 处理：

暂不作为 lexicon 顶层条目收录。它有可用事实，但更像“刷产物再接回同一 B/S 边界”的组合链，当前共同解释仍由已有边界刷和刷产物消费谱覆盖。可以作为下一轮寻找真正二阶差异的起点。

不建议收录项：

- 不收录抽象“尾债可处理”。
- 不把下刷回收 case 的预算耗尽写成不可回返。
- 不把 anchor 行进格墙写成尾债自身的失败。
- 不把 `C+M` 与 `C+MM` 合并；宽尾改变回收资源数和再绑定工具 footprint。

## Family: Pull 刷子 stroke 选择器

family id: `pull_brush_stroke_selector`

局部问题：

`P/L pull` 驱动的 `B/S` 边界刷子可以用初始列距和 stroke 次数做选择器。同一个远程资源列，在 0/1/2 格余量下分别落入“一拉即刷”“第一拉准备、第二拉刷入”“两拉仍暂存、第三拉刷入”的状态谱。

结构旋钮：

- 远处资源列到 B 端列的初始横向余量：0、1、2。
- 已执行左拉 stroke 数：1、2、3。
- 玩家前格：开放或被墙占用。
- 产物状态：crate 保留、sticky 工具生成、stroke 输入关闭。

变体谱：

- `stroke_immediate_bind_once`：0 格余量时，一次左拉把竖列 crate 刷成 sticky 工具；回返 depth 15，局部图 complete / 9988 states。
- `stroke_one_delay_first_pull`：1 格余量时，第一拉只到准备位，远处资源仍是 crate；回返 depth 11，局部图 complete / 9277 states。
- `stroke_one_delay_second_pull`：同一 1 格余量布局第二拉完成刷入；回返 depth 16，局部图 complete / 9277 states。
- `stroke_two_delay_second_pull_preserves`：2 格余量时，两拉仍停在准备位，远处资源保持 crate；回返 depth 12，局部图 complete / 11970 states。
- `stroke_two_delay_third_pull_binds`：同一 2 格余量布局第三拉完成刷入；回返 depth 17，局部图 complete / 11970 states。
- `stroke_front_gate_closed`：玩家前格墙关闭 stroke 输入，资源保持未消费；局部图 complete / 2974 states。该 case 只作为 front-cell gate 边界。

共同解释：

这组结构把远程刷子变成时间/距离选择器。状态类别由资源列和 B 端列的相对位置控制：B 端列停在资源列同列或右侧时资源保持 crate；B 端列被拉到资源列左侧后，资源进入 sticky 侧；输入端前格被封时整条链暂停在初始状态。

建议 curator 处理：

不作为 lexicon 顶层条目收录。它应折回“B/S 移动边界刷子”的输入侧补充：`P/L pull` 只是把移动边界刷子的输入从直接 push 改成远程 pull，并增加前格门与 stroke 调位。列距/次数事实保留为 explorer 记录。

不建议收录项：

- 不收录“pull 多拉几次会刷入”这种脱离几何的计数句。
- 不把第一拉暂存写成失败；它是可设计的准备位。
- 不把前格墙 case 写成不可回返；它只关闭 stroke 输入。
