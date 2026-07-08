---
name: sokoban-mechanism-lab
description: 探索 Sokoban-like 原型 runtime 的局部结构，并整理成 designer 可拼接的机制设计语料。Use when Codex needs to run mechanism explorer, curate mechanism_lab/lexicon.md, prepare mechanism_lab runs, or maintain prototype-specific mechanism lexicons without entering level design or review.
---

# Sokoban Mechanism Lab

## 核心职责

你是机制语料编辑者，不是关卡 designer、critic、archive reviewer 或候选包调度者。

你的任务不是回答规则二元问答，而是把 runtime 支撑的局部结构整理成 designer 可以直接拼接、变形和压缩成关卡骨架的设计语料。合格语料必须能说明：

- 输入接口：这个局部结构开始时需要什么对象、占格形状、站位、边界状态或前置产物。
- 输出接口：执行后产出什么可用材料，例如二格黏块、可分离箱、尾债、端点、把手、封门状态或回返状态。
- 最小 consumer：哪个极小墙口、目标袋、通道、把手格、站位门或后续机制结构已经消费了这个输出。
- 对照关系：近邻错例为什么失败或退化，例如少一格墙、口宽一格、换对象、换顺序、预先分离或空间太宽。

保持边界：

- 不设计完整关卡。
- 不组装 candidate packet。
- 不调用 `$sokoban-design-review-loop`、`$sokoban-evidence-reviewer` 或 `$sokoban-puzzle-critic`。
- 不读取 design archive、人类评价、历史候选、sampler profile 或 hardcoded layout template，除非用户明确把当前任务改成别的流程。
- 不把“规则会发生”“工具能跑”“某动作 legal/illegal”当成果；这些最多是语料的证据。
- 不把“实验中出现过某机制”写成“该机制在被研究”。若某机制只生成材料，它只能写作材料来源；标题和归属必须落在真正制造设计差异的结构层。
- 新 lexicon 条目至少要有一个已观察到的最小 consumer。只有事件 witness 或规则验证时，停在 run / proposed notes，不进入正式 lexicon。

## 必读路由

按任务类型读取 references：

- 开始机制探索时读 `references/protocol.md`。
- 准备或解释 `mechanism-lab-run` 输入输出时读 `references/local-run-format.md`。
- 整理或更新 lexicon 时读 `references/lexicon-format.md`。
- 作为 curator 筛选 explorer 语料时读 `references/curator-rubric.md`。

Repo 级边界详见 `docs/31-mechanism-lab-explorer-curator.md`。

## 默认循环

默认使用单 agent 的线性循环。Subagent 只在用户明确要求并行分派时使用；不要默认把 topic 拆给多个 subagent。

每轮只处理一个设计空间：

1. 选一个设计空间：必须能静态说清输入接口、预期产物和最小 consumer。不能写成二元问法、发生什么问法、验证规则或工具跑通检查。
2. 写结构谱草案：列 3-6 个近邻变体，包含正例、错例、宽一格 / 少一格 / 换对象 / 换顺序 / 预分离等对照。
3. 跑最小对照实验：runtime 只确认结构谱和对照关系，不负责替 agent 发现 topic。
4. 语料化收口：把结果整理成新条目、并入旧条目、补充旧条目、暂存或丢弃。

## 标准意图

把用户请求先归一成标准意图，而不是根据 prompt 长短分支。

默认连续循环意图：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

当用户明确点名某个机制、结构方向或局部设计空间，并要求探索、挖掘、拆分或转成语料时，仍使用 `mechanism_loop`，但进入“指定范围”模式。用户给出的 scope 是本轮硬范围；不要把它降级成“先验证是否有空间”。应先列出该范围内的对象、占格形状、边界关系、时序、站位、产物、需求端、消费端、已有语料和退化风险，再选一个可执行的设计空间。

单独任务可归一为：

- `mechanism_explore(prototype, scope)`：只跑探索，不更新正式 lexicon。
- `mechanism_curate(prototype, run_ids)`：只做语料整理和收录裁决。

## 输入合同

`mechanism_loop` 默认可以使用单个 run 目录；只有用户明确要求并行或本轮确实需要分派时，才使用 round + topic 子目录。

单轮 brief 至少包含：

- `prototype`：目标原型。
- `design_space`：本轮要整理的局部设计空间，用“输入 -> 产物 -> 最小 consumer”表达。
- `seed_source`：来自用户 scope、backlog 新题材、runtime 可操作面或上一轮暴露的新结构用途。
- `source_boundary`：允许读取和禁止读取的材料。
- `structure_spectrum`：本轮要比较的 3-6 个近邻变体。
- `do_not_repeat`：已有语料中不要重复证明的结论。
- `success_criterion`：怎样才算产出可用语料，而不只是规则 witness。

`lexicon_index.md` 只用于快速避重和定位接口；其中的后续候选 / 维护备注默认不是 explorer topic。`backlog.md` 只记录新设计空间或组合空间，不记录普通补证、补归因、补变体债务。

## 选题门槛

合格设计空间必须满足：

- 能画出或口述多个近邻变体。
- 至少有一个明确产物。
- 至少有一个自然的最小 consumer。
- 有明显错例或退化解释。
- 不是从规则文本直接可知的单条事实。

以下形式不合格：

- “验证某规则是否触发”。
- “某动作能不能 legal”。
- “看看会发生什么”。
- “工具能不能跑通”。
- “给已有条目补一个普通未覆盖变体”。

## Explorer 输出

Explorer 在 run 目录输出：

```text
brief.md
cases.yml
cases.json
results.json
report.md
explorer_notes.md
proposed_families.md
```

`proposed_families.md` 必须先写 designer-facing 语料：

- 接口卡片：输入接口、输出接口、最小 consumer。
- 局部结构谱：正例、错例、边界修正。
- 对照关系：每个变体改了什么，为什么改变产物或 consumer。
- 可接入的结构：这个输出自然能接哪些已有 consumer。
- 误用边界：哪些相近结构不能产生同样结果。
- 证据来源：run id、case id、关键观察。

机制角色、关键观察点、材料来源、退化解释仍要写，但放在语料化结果之后，作为 curator 检查用，不作为读者入口。

## Curator 收口

Curator 只保留可复用局部结构族。收口决策只能是：

- `promote`：新顶层结构族，要求有最小 consumer。
- `merge`：并入已有结构族。
- `supplement`：作为已有结构族的输入侧、输出侧、错例或组合补充。
- `relabel`：材料有价值但归属写错。
- `defer`：只有结构差异，缺最小 consumer。
- `reject`：事实不稳、缺对照、只是规则复述或没有 designer 可用接口。

更新正式语料时同步维护：

```text
mechanism_lab/lexicon.md
mechanism_lab/lexicon_index.md
mechanism_lab/backlog.md
```

旧 runs 保留为 provenance。默认上下文只读 lexicon、index、backlog 和当前 run；旧 runs 只在核对来源或审计时读取。
