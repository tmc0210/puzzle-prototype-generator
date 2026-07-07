# Lexicon Format

Lexicon 是整理后的机制语料集合，不是实验流水，也不是关卡设计文档。Lexicon 的基本单位是可组合的局部结构族，不是单条规则结论。

结构族按设计差异真正发生的层级命名，不按机制动作命名：

- `driver`：触发方式，例如推、拉、力链搬运。driver 通常是输入接口。
- `producer`：产出资源、债务、阻塞、把手、形状或状态类别。
- `consumer`：消费这些输出，并改变动作集合、可达性、回返性、目标关系或 shortcut 边界。

只有 driver 本身制造新的站位门、shortcut 或消费关系时，才把它升为新结构族；否则作为已有结构族的输入侧旋钮或补充。

建议文件：

```text
prototypes/<mechanic_id>/mechanism_lab/lexicon.md
prototypes/<mechanic_id>/mechanism_lab/lexicon_index.md
prototypes/<mechanic_id>/mechanism_lab/backlog.md
```

`lexicon.md` 是当前正式语料正文；`lexicon_index.md` 是当前状态入口；`backlog.md` 是下一轮探索缺口入口。Explorer 默认先读 index 和 backlog，只在 brief 需要时读取 1-3 个完整 lexicon 条目。历史 refresh / decision 文件是当时快照，不是当前入口。

默认保持单文件。只有 curator 判断 `lexicon.md` 已经因为长度或检索路径变复杂而影响使用时，才可以拆成：

```text
prototypes/<mechanic_id>/mechanism_lab/lexicon/
  README.md
  <topic>.md
```

拆分依据必须来自已有语料和后续使用者的检索方式，不预定义分类。拆分后 `README.md` 必须保留总索引：每个结构族的一句话用途、所在文件链接、主要旋钮和拆分依据。

单个结构族使用自然语言小节，不退化成大表格，但必须包含这些硬元素：

````markdown
## 结构族名

局部结构谱：

```text
变体 A 小图
变体 B 小图
变体 C 小图
```

旋钮：
这组结构调节了哪些局部变量，例如长度、口宽、施力侧、前格空位、边界位置、把手可达性。

变体谱：
- variant_a：动作集合 / 可达性 / 可逆性结果
- variant_b：动作集合 / 可达性 / 可逆性结果
- variant_c：动作集合 / 可达性 / 可逆性结果

共同解释：
这组变体显示了哪个状态空间变量，而不是只说某条规则会触发。

组合接口：
- 输入条件：这个结构开始时需要什么对象、站位、墙格或目标关系。
- 输出状态：动作后产生什么债务、资源、阻塞、把手或可达性变化。
- 自然消费方式：这个输出通常能接到哪些后续结构。
- 常见 shortcut：如果目标少一个、墙少一格、空间太宽或站位过自由，会怎样被绕过。
- 审美风险：这个结构什么时候只是事件 witness，什么时候会变成玩家洞见。
- consumption probe：本条证据中哪个最小后续约束已经消费了这个输出；如果还没有，不能正式收录，只能写推荐 probe。
- 推荐 probe：如果证据不足，要证明它真的被消费，应该跑什么反事实或近邻对照。
- 组合例句：例如 `绑定债 -> 解绑定债 -> 目标回填` 这种 recipe 级骨架，不写完整关卡。

可用装置：
它可以作为哪类局部结构材料，不写完整关卡。

误用边界：
哪些看似相似的结构不会产生同样差异。

证据：
run=<run_id>, cases=<case_id...>, tags=<runtime_observed|bounded_return|bounded_graph|graph_complete|counterfactual_observed|consumption_probe|composition_probe>
````

合格结构族必须能让下一位 agent 画出或复现多个相邻变体。只写“改变可达性”“形成门槛”“创造承诺点”不合格，除非同时给出具体几何、旋钮、反例边界和证据来源。

Lexicon 不是完整关卡设计，但必须可组合。无法说明输入条件、输出状态和最小 consumption probe 的条目，应留在 run notes 或 proposed families 中继续探索。

## Lexicon Index

`lexicon_index.md` 给 explorer 和 controller 快速定位当前结构族，避免每轮重读完整 lexicon。它不是正式语料正文，不能替代 `lexicon.md`。

每个条目保持短小：

```markdown
## 结构族名

- 一句话用途：
- 输入接口：
- 输出接口：
- 主要消费方式：
- 证据强度：
- 仍缺：
```

Index 必须覆盖当前 `lexicon.md` 的所有顶层结构族。Curator 更新、拆分或重命名 lexicon 后，应同步更新 index。

## Backlog

`backlog.md` 记录当前值得探索的缺口，不是任务流水，也不是历史 refresh。每条缺口写：

```markdown
## gap_id

- 状态：open | in_progress | closed | deferred
- 来源：
- 为什么现在值得跑：
- 要比较的局部变量：
- 成功标准：
- 不要重复：
- 推荐 probe：
- 收口规则：
```

Backlog 的作用是让 controller 生成短 brief。Explorer 可以建议新增或关闭 gap，但 curator 负责最终维护。默认优先级就是文件中的顺序：`mechanism_loop` 在没有用户 scope 时选择第一个 `open` gap；有 scope 时选择最贴近 scope 的 `open` gap。

## 证据层级

- `event_witness`：只证明事件会发生，不够进入 lexicon。
- `structure_difference`：证明近邻结构有差异，可以进入 proposed family。
- `consumption_probe`：证明输出被极小后续约束消费，是新 lexicon 条目的最低门槛。
- `composition_probe`：证明两个或多个 lexicon 结构可以通过接口串接，是强条目或 recipe 候选。

`bounded_graph` 不是全局证明；`returnToInitial.status=exhausted` 不是不可回返证明。

## Recipe 骨架

Recipe 是原理上可行的关卡骨架，不是完整关卡。它应说明玩家为什么要主动构造某个 lexicon 结构，以满足另一个 lexicon 的输入要求。

Recipe 小节可以放在相关结构族后，使用自然语言短段，但必须包含：

- 需求端：哪个后续结构需要什么输入。
- 构造端：哪个前置结构能主动制造这个输入。
- 传递接口：中间传递的是形状、资源、债务、把手、阻塞还是可达性状态。
- 消费端：后续结构如何消费它，并产生动作集合、回返性、目标关系或 shortcut 差异。
- 错误构造：少一个对象、形状不对、墙格太宽或目标太少时如何失败或被绕过。
- probe：要把 recipe 从骨架推到候选前，还应跑什么反事实。

最低收录门槛：

- 至少 4 个近邻变体，除非原型局部状态空间极小。
- 至少 1 个正例和 1 个反例。
- 至少 1 个修正原解释的边界 case。
- 至少写清输入条件、输出状态和一个 consumption probe。
- 不能把 `returnToInitial.status=exhausted` 写成不可回返。
