# Curator Rubric

Curator 只把强结构族放入 lexicon。结构族是一组近邻局部变体，不是单条规则结论。新 lexicon 条目必须能作为 designer 可拼接的设计语料：写清输入接口、输出接口，并至少证明一个最小 consumer 消费了该输出。

## 收录决策

Curator 更新 lexicon 前必须先做一个决策：

- `promote`：作为新的顶层结构族进入 lexicon。要求至少有接口卡片和 `consumption_probe`。
- `merge`：并入已有结构族。适用于输出和消费方式与旧条目相同，只扩展变体谱。
- `supplement`：作为已有结构族的 driver、输入侧、shortcut、误用边界或推荐 probe 补充。
- `defer`：保留在 run 中。适用于只有 `event_witness` 或 `structure_difference`，尚未证明起作用可能性的材料。
- `relabel`：保留材料但改归属。适用于实验有价值，但关键观察点证明的是通用对象行为、下游 consumer 或另一个机制，而不是 explorer 声称的机制。
- `reject`：不保留为可用语料。适用于事实不稳、图形不可复现、缺少近邻对照、只有规则复述，或没有 designer 可用接口的材料。

只改变触发方式的差异通常是 driver 旋钮，不是新顶层结构族。只有 driver 本身制造新的站位门、shortcut 或消费关系时，才可考虑 `promote`。

除 `promote` 外，每个裁决都必须写一句原因：`merge` 说明并入哪个结构族，`supplement` 说明补强哪个已有装置，`relabel` 说明更准确的机制读法，`defer` 说明缺少哪一步消费或对照，`reject` 说明为什么不保留。

Curator 必须检查机制角色：

- `active_rule`：关键观察点正在造成差异的规则或 consumer。
- `material_source`：只负责生成材料、对象、形状或初始资源的机制。
- `consumer`：消费输出并制造差异的后续约束。
- `incidental`：出现过但关键观察点不参与的机制。

只有 `active_rule` 可以进入 family 名称和正式归属。若某机制只是 `material_source`，只能作为来源写入证据或组合接口；若某机制是 `incidental`，不得写入标题。

Curator 还必须主动寻找可能退化解释：候选是否只是普通占位、普通阻挡、普通容量、普通 shortcut、普通目标消费，或已有结构的参数补谱。若这个更简单解释没有被最小 consumer 或近邻对照排除，不能 `promote`。

Curator 完成裁决后，应同步维护当前入口：

- `promote` 或重命名：更新 `lexicon.md` 与 `lexicon_index.md`。
- `merge` 或 `supplement`：更新对应 lexicon 条目、index 的后续候选 / 维护备注，以及 backlog。
- `defer`：不进正式 lexicon；只有当下一步 probe 打开新的结构用途、接口或边界问题时，才写入 backlog。
- `relabel`：写入 `curator_decision.md`，必要时把材料移入正确的已有条目、对象行为条目或 backlog；不得按原错误归属更新 index。
- `reject`：只在 `curator_decision.md` 记录拒绝理由；不更新 lexicon、index 或 backlog。

历史 refresh / decision 文件只记录当时裁决，不需要在后续 lexicon 变化时回写。

在 `mechanism_loop` 中，裁决必须写入本轮 run 目录的 `curator_decision.md`。这个文件记录本轮为什么收录、合并、补充或暂缓，以及对 `lexicon.md`、`lexicon_index.md`、`backlog.md` 的具体更新；它不是阶段性 refresh。

## 结论范围校准

Curator 不得在第一个好 probe 后立刻把局部事实扩张成过宽语料。每个 topic 在进入 `promote`、`merge` 或 `supplement` 前，必须做结论范围校准。它不是补实验门槛，而是决定这条语料能说多宽：

- 已支撑：哪些变体、对象或状态已经能支撑当前语料。
- 未覆盖导致的结论收窄：哪些未跑、等价、不适用或 patch 隔离不了，因此不能写成全称。
- 不应入库的弱事实：哪些只有孤例、事件 witness、预算不足，或没有语料化接口。
- 是否打开了新设计空间或新组合接口：只有出现新的产物、需求端、消费端或边界问题时，才写入 backlog；普通未覆盖变体只收窄本条语料，不开新轮补缺。

多 subagent round 中，curator 先写 `curator_synthesis.md`，再写 `curator_decision.md`。Synthesis 负责合并各 topic 的重复发现、冲突发现、弱结论、可复用结论和收口校准：晋升项为什么不是更简单解释、增补项补强哪个已有结构、降级项缺少哪一步后续消费、不入库项为什么只停在 run。Decision 只记录最终进入当前入口的变更。Subagent 不直接改 `lexicon.md`、`lexicon_index.md` 或 `backlog.md`。

## 收录标准

收录条目应满足：

- 有明确局部结构谱或多张小图。
- 有接口卡片：输入接口、输出接口、最小 consumer。
- 有机制角色和关键观察点，且 family 名称匹配 `active_rule`。
- 有可命名的结构旋钮，不是单条件观察。
- 尽量覆盖同题材的显然近邻变体；未覆盖时必须收窄语料结论，不要求为了补缺单开一轮。
- 至少 1 个正例和 1 个反例。
- 至少 1 个修正原解释的边界 case。
- 有 runtime-backed 来源。
- 能说明动作集合、可达性、回返性、事件集合或状态类别的差异。
- 能说明至少一个误用边界。
- 能说明可组合接口：输入条件、输出状态，以及至少一个最小 consumer / consumption probe。
- 能把差异事实转成 designer 可用结构材料：可用装置、最小形式、适用变体、误用边界和组合接口。
- `supplement` 与 `promote` 使用同一读者规格：同样需要具体图、动作序列、正反例或 shortcut 对照、设计用途、误用边界和证据引用；区别只是挂载到已有条目下，而不是证据规格降低。

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
- 只把目标机制当材料来源，却把结论写成目标机制或边界行为。
- 关键观察点前目标机制已经退场，只剩通用对象行为。
- 只有 driver 差异，输出和消费方式与已有结构族相同。
- 只有推荐 probe，没有实际最小 consumer，却被写成正式 lexicon 条目。
- 证据只来自未复核的 miner 输出。
- 结论依赖完整关卡语境，而不是局部结构。
- 把 `returnToInitial.status=exhausted` 当作不可回返证据。
