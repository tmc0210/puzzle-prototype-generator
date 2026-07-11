# Lexicon Format

Lexicon 是 designer 可消费的机制语料集合，不是实验流水，也不是关卡设计文档。基本单位是可组合的局部结构族：它有输入接口、输出接口、最小 consumer、近邻对照图和证据来源。

## 读者优先级

正文优先服务 designer：

- 用当前原型的人话写结构，例如“二格横条黏块”“L 形黏块”“单格目标袋”“旧 L 半格把手”。
- 避免在入口处堆叠内部术语。`active_rule`、`material_source`、`consumer`、`incidental` 可以保留，但应放在条目后部作为 curator 检查信息。
- 旧式内部占格术语在 designer-facing 文本中优先改写为“占格形状”“连体块形状”“二格横条”“L 形块”“2x2 块”等具体说法。

合格条目必须能让下一位 designer 看图复现多个相邻变体，并判断它能接到哪里。

## 文件结构

建议文件：

```text
prototypes/<mechanic_id>/mechanism_lab/lexicon.md
prototypes/<mechanic_id>/mechanism_lab/lexicon_index.md
prototypes/<mechanic_id>/mechanism_lab/backlog.md
```

`lexicon.md` 是当前正式语料正文；`lexicon_index.md` 是当前状态入口；`backlog.md` 只记录新设计空间或组合空间。历史 refresh / decision 文件和旧 runs 只在核对 provenance 或审计时读取。

`lexicon.md` 前部应包含：

1. 简短说明。
2. 组合矩阵。
3. 证据来源。
4. 正式条目正文。

## 组合矩阵

组合矩阵是快速检索和拼接导航，不承担证据审查。它同时支持从已有结构查产物，以及从已有产物或状态查后续 consumer。不要添加“证据状态 / 风险”列；证据、shortcut 和风险留在条目正文。

格式固定：

```markdown
## 组合矩阵

| 前置结构 | 中间材料或状态 | 后续消费结构 |
| --- | --- | --- |
| B/S 绑定债 | sticky L 形 | 刚体黏块 + 墙口中的 L 形把手门 |
| 固定 B/S 切割 | C+M：可分离 crate + sticky 尾债 | 同条目的单格目标袋 |
```

只放当前正式语料已经支撑的连接。前置和后续结构应尽量指向实际产生或消费该接口的 `##` 条目或 `###` 子节；带独立接口卡片、可被 designer 单独调用的子节必须能从矩阵命中，但不因此升格为新的顶层结构族。若两个形状、状态或产物接入的 consumer 不同，拆成不同行，不要用一个粗粒度名称合并。纯镜像、普通参数变体和证据增补不单独占行。

尚未被当前语料支撑、但值得尝试的连接写入条目正文的“推荐 probe / 后续候选”，不要混入主矩阵。

## 正式条目格式

每个顶层条目必须以接口卡片开头：

```markdown
## 结构族名

接口卡片：
- 输入接口：
- 输出接口：
- 最小 consumer：
```

推荐正文结构：

````markdown
## 结构族名

接口卡片：
- 输入接口：这个结构开始时需要什么对象、站位、墙格、目标或前置产物。
- 输出接口：动作后产出什么可用材料、债务、把手、阻塞或状态。
- 最小 consumer：本条证据中哪个极小后续结构已经消费了输出。

局部结构谱：

```text
变体 A 小图
变体 B 小图
变体 C 小图
```

共同解释：
这组变体显示哪个设计变量，而不是只说某条规则会触发。

输入条件：
- ...

输出状态：
- ...

结构旋钮：
- ...

变体谱：
- variant_a：动作集合 / 可达性 / 可逆性结果。
- variant_b：错例或边界修正。

自然消费方式：
- 这个输出通常能接到哪些后续结构。

常见 shortcut：
- 哪些墙格、目标、空间或站位缺口会让结构被绕过。

审美风险：
- 什么时候只是事件 witness，什么时候会变成玩家洞见。

consumption probe：
本条证据中哪个最小后续约束已经消费了输出。

推荐 probe / 后续候选：
若要继续扩展，应尝试哪些自然接法；不要把普通补变体写成探索债。

组合例句：
`前置结构 -> 本条输出 -> 后续 consumer`。

可用装置：
它可以作为哪类局部结构材料，不写完整关卡。

误用边界：
哪些看似相似的结构不会产生同样差异。

机制角色与归属边界：
- active_rule：
- material_source：
- consumer：
- incidental：
- 关键观察点：

退化解释：
为什么不是普通占位、阻挡、容量、shortcut、目标消费或已有结构参数补谱。

证据：
run=<run_id>, cases=<case_id...>, tags=<runtime_observed|bounded_return|bounded_graph|graph_complete|counterfactual_observed|consumption_probe|composition_probe>
````

`supplement` 与 `promote` 使用同一读者规格。增补只是挂载位置不同，不能省略图、对照、设计用途、误用边界和证据引用。

## Lexicon Index

`lexicon_index.md` 给 explorer、curator 和后续使用者快速定位结构族。它不是正式语料正文，不能替代 `lexicon.md`。

每个条目保持短小：

```markdown
## 结构族名

- 一句话用途：
- 输入接口：
- 输出接口：
- 主要接法：
- 后续候选 / 维护备注：
```

Index 必须覆盖当前 `lexicon.md` 的所有顶层结构族。Curator 更新、拆分或重命名 lexicon 后，应同步更新 index。不要把旧式缺口字段作为默认任务入口；普通补证、补归因、补变体是维护备注，不是 explorer topic。

## Backlog

`backlog.md` 记录当前值得探索的新设计空间或组合空间，不是任务流水，也不是历史 refresh，更不是 `mechanism_loop` 的唯一议程。

默认进入 explorer topic 的 backlog 项必须能写成“输入 -> 产物 -> 最小 consumer”。Curator 不应把本 topic 内普通未覆盖变体写进 backlog；这类缺项只用于收窄本条语料结论。只有未覆盖项打开了新的结构用途、接口或边界问题时，才进入 backlog。

每条缺口写：

```markdown
## gap_id

- 状态：open | in_progress | closed | deferred
- 来源：
- 设计空间：
- 输入接口：
- 预期产物：
- 最小 consumer：
- 建议对照：
- 不要重复：
- 语料化收口规则：
```

## 证据层级

- `event_witness`：只证明事件会发生，不够进入 lexicon。
- `structure_difference`：证明近邻结构有差异，可以进入 proposed family。
- `consumption_probe`：证明输出被极小后续约束消费，是新 lexicon 条目的最低门槛。
- `composition_probe`：证明两个或多个 lexicon 结构可以通过接口串接，是强条目或 recipe 候选。

`bounded_graph` 不是全局证明；`returnToInitial.status=exhausted` 不是不可回返证明。

## Recipe 骨架

Recipe 是原理上可行的关卡骨架，不是完整关卡。它应说明玩家为什么要主动构造某个 lexicon 结构，以满足另一个 lexicon 的输入要求。

Recipe 小节必须包含：

- 需求端：哪个后续结构需要什么输入。
- 构造端：哪个前置结构能主动制造这个输入。
- 传递接口：中间传递的是形状、资源、债务、把手、阻塞还是可达性状态。
- 消费端：后续结构如何消费它，并产生动作集合、回返性、目标关系或 shortcut 差异。
- 错误构造：少一个对象、形状不对、墙格太宽或目标太少时如何失败或被绕过。
- probe：要把 recipe 从骨架推到候选前，还应跑什么反事实。
