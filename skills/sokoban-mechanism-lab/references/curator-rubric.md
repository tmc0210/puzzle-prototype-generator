# Curator Rubric

Curator 只把强结构族放入 lexicon。结构族是一组近邻局部变体，不是单条规则结论。新 lexicon 条目必须至少证明“起作用的可能性”：结构输出被极小后续约束消费一次。

## 收录决策

Curator 更新 lexicon 前必须先做一个决策：

- `promote`：作为新的顶层结构族进入 lexicon。要求至少有 `consumption_probe`。
- `merge`：并入已有结构族。适用于输出和消费方式与旧条目相同，只扩展变体谱。
- `supplement`：作为已有结构族的 driver、输入侧、shortcut、误用边界或推荐 probe 补充。
- `defer`：保留在 run 中。适用于只有 `event_witness` 或 `structure_difference`，尚未证明起作用可能性的材料。

只改变触发方式的差异通常是 driver 旋钮，不是新顶层结构族。只有 driver 本身制造新的站位门、shortcut 或消费关系时，才可考虑 `promote`。

Curator 完成裁决后，应同步维护当前入口：

- `promote` 或重命名：更新 `lexicon.md` 与 `lexicon_index.md`。
- `merge` 或 `supplement`：更新对应 lexicon 条目、index 的证据强度 / 仍缺字段，以及 backlog。
- `defer`：不进正式 lexicon；必要时把下一步 consumption probe 写入 backlog。

历史 refresh / decision 文件只记录当时裁决，不需要在后续 lexicon 变化时回写。

在 `mechanism_loop` 中，裁决必须写入本轮 run 目录的 `curator_decision.md`。这个文件记录本轮为什么收录、合并、补充或暂缓，以及对 `lexicon.md`、`lexicon_index.md`、`backlog.md` 的具体更新；它不是阶段性 refresh。

## 收录标准

收录条目应满足：

- 有明确局部结构谱或多张小图。
- 有可命名的结构旋钮，不是单条件观察。
- 至少 4 个近邻变体，除非原型局部状态空间极小。
- 至少 1 个正例和 1 个反例。
- 至少 1 个修正原解释的边界 case。
- 有 runtime-backed 来源。
- 能说明动作集合、可达性、回返性、事件集合或状态类别的差异。
- 能说明至少一个误用边界。
- 能说明可组合接口：输入条件、输出状态，以及至少一个 consumption probe。

## 证据强度

- `event_witness`：只证明事件会发生，不够进入 lexicon。
- `structure_difference`：证明近邻结构有差异，可以进入 proposed family。
- `runtime_observed`：动作回放或最终动作表直接观察到。
- `bounded_return`：有限深度搜索支持可回返或不可回返。
- `bounded_graph`：有限深度状态图支持。
- `graph_complete`：状态图在预算内 complete。
- `counterfactual_observed`：禁用规则 / 分支后差异消失或改变。
- `consumption_probe`：输出接入极小后续约束后，动作集合、可达性、回返性、资源分配或 shortcut 边界发生差异。
- `composition_probe`：两个或多个结构族通过输入 / 输出接口串接成功。

不要把 `bounded_graph` 写成全局证明。只有 `graph_complete` 才能说“预算内完整枚举”。

## 降级或剔除

以下情况应降级为 explorer note 或剔除：

- 只是规则复述。
- 没有反例或失败条件。
- 只有抽象命名，没有局部形状。
- 只有局部现象，没有输入 / 输出接口或后续消费方式。
- 只有 driver 差异，输出和消费方式与已有结构族相同。
- 只有推荐 probe，没有实际 consumption probe，却被写成正式 lexicon 条目。
- 证据只来自未复核的 miner 输出。
- 结论依赖完整关卡语境，而不是局部结构。
- 把 `returnToInitial.status=exhausted` 当作不可回返证据。
