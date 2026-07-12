# Mechanism Lab Protocol

本 protocol 用于把 Sokoban-like 原型的 runtime 事实整理成 designer 可用的局部机制语料。它不覆盖关卡设计、候选审查或 archive 判断。

## 核心目标

Mechanism lab 的结果不是“实验问题的答案”，而是可组合设计语料。一个合格条目必须能让 designer 自然尝试拼接：

```text
一种摆法留下具体形状或空位 -> 后一段利用这个形状或空位 -> 缩紧/变形后形成关卡骨架
```

因此每轮都围绕“开始摆法 -> 关键动作 -> 动后局面 -> 最小用法”工作：

- 开始摆法：对象、占格形状、玩家站位、墙、目标、边界和动作顺序。
- 关键动作：玩家推或拉哪个对象，沿哪个方向移动。
- 动后局面：箱子是否粘合或分开，哪格被占住或腾空，玩家能否到达下一处操作位。
- 最小用法：墙口、目标袋、通道或站位限制如何让这个具体差异影响下一步。
- 对照关系：相近但失败或退化的错例。

正文中的结构名必须能对应到可画出的局部形状或稳定动作约束。“可动性”“顺序锁”“墙廊”“目标袋”“连体块”“回返”“切割”“活塞”可在具体说明后使用。正文直接写对象、格子、推拉方向和可达位置；内部证据术语只放在 curator 信息和证据段。

## 标准意图

任何 mechanism lab 请求都先归一成标准意图。

默认连续循环意图：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

触发语义包括“开始一轮探索循环”“继续探索循环”“让 explorer 继续跑”“用当前语料再探索”等。用户只需要提供 `prototype`；`scope` 与 `round_budget` 可选。默认 `round_budget=1`，每轮完成收口后停止报告。

当用户明确点名某个机制、结构方向或局部设计空间，并要求探索、挖掘、拆分或转成语料时，仍归一为 `mechanism_loop`，但进入“指定范围”模式。用户给出的 scope 是硬范围；不要把它改写成“先验证是否有空间”。应在该范围内拆出对象、占格形状、边界关系、行程 / 时序、玩家站位、动作后的具体局面、后续用法、已有语料和退化风险。

单独任务可归一为：

- `mechanism_explore(prototype, scope)`：只跑探索，不更新正式 lexicon。
- `mechanism_curate(prototype, run_ids)`：只做语料裁决和整理。

## 默认线性循环

默认不使用 subagent。Subagent 只在用户明确要求并行分派时使用。

每轮只处理一个设计空间：

1. 选一个设计空间：必须能静态说清开始摆法、关键动作、动后局面和最小用法。
2. 写结构谱草案：列 3-6 个近邻变体，包含正例、错例、宽一格 / 少一格 / 换对象 / 换顺序 / 预分离等对照。
3. 跑最小对照实验：runtime 只确认结构谱和对照关系，不负责发现 topic。
4. 语料化收口：整理为新条目、并入旧条目、补充旧条目、暂存或丢弃。

选题阶段不提前跑 runtime。若题材只能写成二元问法、发生什么问法、验证规则或工具跑通检查，它不是合格设计空间。

## 当前入口与历史记录

连续探索的默认入口是当前状态文件，不是历史 refresh 或旧 runs：

- `mechanism_lab/lexicon.md`：当前正式语料正文。
- `mechanism_lab/lexicon_index.md`：当前结构族索引，给 explorer 快速避重和查找具体摆法。
- `mechanism_lab/backlog.md`：当前新设计空间或组合空间候选。
- `mechanism_lab/runs/<run_id>/`：实验历史和证据库，只在核对来源或审计时读取。
- `refresh_notes.md` / `refresh_decisions.md`：一次性历史摘要，只在追溯旧裁决、核对 provenance 或做版本审计时读取。

`lexicon_index.md` 中的后续候选 / 维护备注默认不是 explorer topic。给已有条目补普通变体、补归因、补证据、补 recipe 串接，除非用户明确要求，否则不进入下一轮探索。

## Brief 文件格式

单轮默认目录：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  brief.md
  cases.yml
  cases.json
  results.json
  report.md
  explorer_notes.md
  proposed_families.md
  curator_decision.md
```

`brief.md` 至少包含：

```markdown
# Mechanism Lab Brief: <run_id>

- prototype:
- design_space: 开始摆法 -> 关键动作 -> 动后局面 -> 最小用法
- seed_source:
- source_boundary:
- structure_spectrum:
- do_not_repeat:
- success_criterion:
- output_contract:
```

只有用户明确要求并行，或本轮确实需要多个互不干扰的设计空间，才使用 round + topic 子目录：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<round_id>/
  round_manifest.md
  topics/<topic_id>/...
  curator_synthesis.md
  curator_decision.md
```

此时每个 topic 仍必须是“开始摆法 -> 关键动作 -> 动后局面 -> 最小用法”的设计空间切片，不能是抽象问题。

## 选题门槛

合格设计空间必须满足：

- 能画出或精确口述多个近邻变体。
- 能具体说清动作后留下什么形状、空位、阻塞或可达关系。
- 至少有一个自然的最小用法。
- 有错例或退化解释。
- 不是规则文本直接可读出的单条事实。

不合格题材：

- “验证规则是否触发”。
- “某动作是否 legal / 是否可解 / 是否产生事件”。
- “看看会发生什么”。
- “探索某机制有什么用”。
- “给已有条目补一个普通未覆盖变体”。

## 结构谱草案

Explorer 在写 `cases.yml` 前先写结构谱草案。结构谱包含：

- 正例：动作后留下可继续利用的具体形状、空位或阻塞。
- 错例：少一格、宽一格、换对象、换顺序或预分离后不再留下同样局面。
- 边界修正：排除“只是普通墙挡路 / 普通目标覆盖 / 普通容量 / 普通 shortcut”的更简单解释。
- 最小用法：这个差异在哪里改变了下一步动作。

Runtime 实验只用于确认这些对照，不用于无方向地枚举“会发生什么”。

## Explorer 输出

Explorer 输出 run 与语料草案：

```text
cases.yml
cases.json
results.json
report.md
explorer_notes.md
proposed_families.md
```

`proposed_families.md` 必须先写 designer-facing 语料：

- 局面卡片：开始摆法、关键动作、动后局面、最小用法。
- 局部结构谱：正例、错例、边界修正。
- 对照关系：每个变体改了什么，为什么改变合法动作或可达位置。
- 可接入的结构：这个动后局面自然能接哪些已有墙口、目标袋、通道或操作位。
- 误用边界：哪些相近结构不会产生同样结果。
- 证据来源：run id、case id、关键观察。

随后再写 curator 检查信息：

- 机制角色：active_rule、material_source、consumer、incidental。
- 关键观察点：哪一步出现差异。
- 退化解释：为什么不是普通占位、阻挡、容量、shortcut、目标覆盖或已有结构补谱。
- 建议裁决：`promote`、`merge`、`supplement`、`relabel`、`defer` 或 `reject`。

## Curator

Curator 读取 runs 后，只保留可复用局部结构族。Curator 可以合并多个 case，但不能删除证据来源。

收口前必须做结论范围校准：

- 已支撑：哪些变体和 consumer 已经能支撑当前语料。
- 结论收窄：哪些未跑、等价、不适用或 patch 隔离不了，因此不能写成全称。
- 不应入库：哪些只有事件 witness、孤例、预算不足或无法写成具体局部用法。
- 是否打开新设计空间：只有出现新的形状、空位、阻塞、后续用法或组合关系时，才进入 backlog。

正式裁决只能是：

- `promote`：新顶层结构族，要求有一个已验证的最小用法。
- `merge`：并入已有结构族。
- `supplement`：作为已有结构族的输入侧、输出侧、错例或组合补充。
- `relabel`：材料有价值但归属写错。
- `defer`：只有结构差异，尚未证明它会影响后续动作。
- `reject`：事实不稳、缺对照、只是规则复述或无法写成具体局部摆法。

更新 lexicon 后，同步维护 `lexicon_index.md` 和 `backlog.md`。Backlog 只记录新设计空间或组合空间，不记录普通维护事项。

## Lexicon 入口要求

每个正式条目顶部必须有：

```markdown
局面卡片：
- 开始摆法：
- 关键动作：
- 动后局面：
- 最小用法：
```

`lexicon.md` 前部应有一张全局组合矩阵：

```markdown
## 组合矩阵

| 前一段摆法 | 中间留下的形状或空位 | 后一段怎样利用 |
| --- | --- | --- |
| B/S 边界黏合 | sticky L 形 | 黏块过墙口时保留或失去侧向操作位 |
```

组合矩阵既用于从前一段摆法查动作后留下的具体局面，也用于从这个局面查下一段用法；它不承担证据审查，证据、shortcut 和风险留在条目正文。矩阵应指向实际形成或利用该局面的 `##` 条目或 `###` 子节；带独立局面卡片、可被 designer 单独调用的子节必须能被命中，但不改变其 family 归属。只收当前正式语料已支撑的连接；不同形状或空位若接法不同，应分行书写。

## 机制角色与命名

机制实验先判定关键观察点，再命名结构族。关键观察点是近邻变体第一次出现动作集合、对象身份、连接关系、可达性、回返性，或留下不同对象和位置的那一步。

每个候选 family 必须能区分：

- `active_rule`：关键观察点正在造成差异的规则、对象行为或 consumer。
- `material_source`：只负责生成对象、形状或初始摆法的机制。
- `consumer`：第一个让合法动作、对象位置或可达关系出现差异的后续约束。
- `incidental`：出现过但关键观察点不参与的机制。

只有 `active_rule` 可以进入 family 名称和正式归属。若某机制只是材料来源，标题不能写成该机制的边界结构。
