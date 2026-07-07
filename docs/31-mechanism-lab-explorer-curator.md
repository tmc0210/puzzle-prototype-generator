# Mechanism Lab Explorer / Curator 流程

本文档定义可泛化的机制探索与设计语料整理流程。当前阶段只覆盖 explorer 和 curator，不进入关卡设计、候选包、critic、evidence review 或 archive 审美判断。

## 目标

机制实验的输入是原型 runtime 和极小局部 layout patch。输出分为两层：

- `mechanism_lab/runs/<run_id>/`：探索历史和证据库，给后续 explorer / curator 按需读取，保留局部实验问题、patch、动作结果、可达图摘要、回返搜索和人工解释。
- `mechanism_lab/lexicon.md`：整理后的机制语料，给后续使用者摘取结构，不要求包含完整实验流水。
- `mechanism_lab/lexicon_index.md`：当前正式结构族的短索引，给 explorer 和 controller 避免重复读取完整 lexicon。
- `mechanism_lab/backlog.md`：当前仍值得探索的缺口，给 controller 生成下一轮 explorer brief。

这些产物都按原型分目录放在 `prototypes/<mechanic_id>/` 下，不跨原型混放。

历史 refresh / decision 文件只是一次 curator 快照或更新摘要，不是当前状态入口。后续探索默认不读取旧 refresh；只有追溯旧裁决、核对 provenance 或做版本审计时才读。

## 标准意图

机制探索请求先归一成标准意图，而不是根据用户 prompt 长短或信息量分支。

默认连续循环意图：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

用户只需要提供 `prototype`；`scope` 与 `round_budget` 可选。默认 `round_budget=1`，每轮必须完成 curator 收口后停止报告。

单独任务可归一为：

- `mechanism_explore(prototype, scope)`：只跑 explorer，不更新正式 lexicon。
- `mechanism_curate(prototype, run_ids)`：只做 curator 裁决和语料整理。

## 语料层级

机制语料按“能否被设计流程消费”分层：

- `event_witness`：只证明某事件或规则结果出现，不足以进入 lexicon。
- `structure_difference`：证明一组近邻结构在动作集合、可达性、回返性、状态类别或资源形态上有差异，可以进入 `proposed_families.md`。
- `consumption_probe`：证明结构输出能被一个极小后续约束消费，例如墙口、目标、站位、把手或通道约束；这是新 lexicon 条目的最低证据门槛。
- `composition_probe`：证明两个或多个 lexicon 结构能通过输入 / 输出接口串起来，形成 recipe 候选。

Lexicon 条目的定位是“可组合的局部结构接口”：它说明结构需要什么输入、产生什么输出、自然能接到什么后续结构。Recipe 的定位是“原理上可行的关卡骨架”：它说明玩家为什么需要主动构造某个 lexicon 结构，以满足另一个 lexicon 的输入要求。Recipe 不是完整关卡，不处理完整节奏、审美、唯一性或候选包。

## 工具边界

所有通用机制实验工具只依赖 `RuntimeAdapter` 和 `PuzzleRuntime`：

- `src/core/runtimeGraph.ts`：从初始状态枚举有限状态图，返回状态 key、边、事件、胜利状态索引和发现深度。
- `src/workflows/localExperimentRunner.ts`：读取手写局部 patch，回放指定动作，列出最终动作表，做有限深度可达枚举，并搜索最终状态能否回到初始状态。
- `src/cli.ts mechanism-lab-run`：命令行入口。

工具不得读取或复用历史候选、历史关卡、design archive、人类评价、sampler profile 或 hardcoded layout template。Explorer 可以手写 patch，也可以用 miner 结果启发问题，但 miner 产物不能直接进入 lexicon。

## CLI 用法

```bash
tsx src/cli.ts mechanism-lab-run prototypes/<mechanic_id> cases.yml --run-id local_probe_01 --write
```

`--write` 默认写入：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  cases.json
  results.json
  report.md
  explorer_notes.md
  proposed_families.md
```

输入文件最小格式：

```yaml
runId: local_probe_01
title: "局部可动性比较"
defaults:
  maxExploreDepth: 14
  maxReturnDepth: 24
  maxStates: 20000
  maxTransitions: 80000
cases:
  - id: "case_a"
    family: "local_structure_family"
    variant: "variant_a"
    changed_variable: "相对 variant_b 改了什么"
    contrast_with: "case_b"
    question: "结构 A 和结构 B 的后续动作集合是否不同"
    layout: |
      #####
      #@..#
      #####
    actions: ["right"]
```

可选字段：

- `disabledRules` / `disabledBranches`：用于 runtime 支持的反事实实验。
- `win`：覆盖默认胜利条件。
- `maxExploreDepth` / `maxReturnDepth` / `maxStates` / `maxTransitions`：单 case 预算覆盖。
- `family` / `variant` / `changed_variable` / `contrast_with`：结构族分组。runner 会在报告中按 `family` 汇总回返、动作表和图完整性。

在 `mechanism_loop` 中，run 目录还应包含由 agent 管理的流程文件：

```text
prototypes/<mechanic_id>/mechanism_lab/runs/<run_id>/
  brief.md
  curator_decision.md
```

`brief.md` 是 controller / curator 在 explorer 执行前写的标准任务包；`curator_decision.md` 是 curator 在 explorer 完成后写的收口记录。它们不是 `mechanism-lab-run --write` 自动生成的文件。

## Explorer 工作流

Explorer 的任务是提出和执行比较性局部问题，不是证明规则存在，也不是设计关卡。

每轮先把请求归一成 exploration brief：

- `prototype`
- `scope`
- `exclusions`
- `source_boundary`
- `run_intent`

信息不足时补全一个保守的小范围；约束较多时压缩到这些字段。归一化后始终执行同一启动流程。

一轮探索应包含：

1. 按 source boundary 读取必要规则 / runtime / adapter。
2. 提取本轮 primitive refs；它们只是引用索引，不是成果。
3. 写出 6-10 个候选结构族。结构族的目标不是单条结论，而是局部结构谱系：一组近邻变体、一个或多个旋钮、同一局部目标、不同状态空间结果。
4. 过滤候选：直接由规则可读出的差异不跑；只换 driver 的结构不升为新 family；没有明确输出或自然消费方向的结构先标为上游材料。
5. 选择 1-2 个结构族执行局部 patch 实验。每个被执行族应尽量包含正例、反例和至少一个修正原解释的边界 case；若目标是进入 lexicon，还应包含最小 consumption probe。
6. 用 `mechanism-lab-run` 生成硬事实记录。
7. 在 run 目录补充 `explorer_notes.md`：本轮假设、有效比较、被修正的解释、哪些只是规则复述或无效差异。
8. 在 run 目录补充 `proposed_families.md`：给 curator 的结构族草案，而不是正式 lexicon。

Explorer 输出应偏向具体结构语言，例如“2 格竖条贴单侧墙时只能沿墙平移，3 格 L 形在同样墙口会多出一次转角重排机会”，而不是“机制可以改变可达性”。

## 连续探索循环

连续探索不建议让一个 explorer 无限探索并自我入库。推荐分层：

- Controller / curator 维护长期记忆：`lexicon.md`、`lexicon_index.md`、`backlog.md` 和必要的 run provenance。
- Explorer 只做短周期局部实验：按 brief 提出候选结构族，实跑 1-2 个，输出 run 与 proposed families。
- Curator 决定收录：`promote`、`merge`、`supplement` 或 `defer`。

每轮循环：

1. Curator 从 `lexicon_index.md` 与 `backlog.md` 选择缺口。默认选择第一个 `open` gap；若用户提供 scope，选择最贴近 scope 的 open gap。
2. Curator 创建本轮 run 目录并写 `brief.md`：目标原型、source boundary、scope、相关索引项、允许读的少量完整条目、不要重复、预算、成功标准。
3. 若当前上下文有 subagent 能力，controller 用 subagent 执行 `brief.md`；若没有，才在同一对话内按短周期 explorer 执行。Subagent prompt 只需指向 `brief.md`，不复述流程。
4. Explorer 在 brief 内自行选择具体结构族和 patch。
5. Explorer 写 run、`explorer_notes.md`、`proposed_families.md`。
6. Curator 读取本轮结果，写 `curator_decision.md`，并更新 `lexicon.md`、`lexicon_index.md` 和 `backlog.md`。
7. 每 3-5 轮做一次轻量 audit，检查 index 覆盖、证据门槛、重复命名和 backlog 是否还有效。

候选选择分层：curator 选择“缺口和标准”，explorer 选择“具体局部结构族”，curator 再选择“是否收录”。

## Curator 工作流

Curator 读取一个或多个 run，整理出可复用语料。Curator 不是 explorer 的同义词，也不需要重新跑所有实验；它负责压缩、合并、去重和标注证据强度。

Curator 收录的基本单位是结构族，不是单条规则结论。结构族应把相邻变体摆在一起，让后续使用者看到可调旋钮。

Curator 在改 lexicon 前必须先做收录决策：

- `promote`：作为新的顶层结构族进入 lexicon，要求至少有 `consumption_probe`。
- `merge`：并入已有结构族，适用于输出和消费方式与旧条目相同、只是扩展变体的情况。
- `supplement`：作为已有结构族的 driver、输入侧、shortcut 或 probe 补充，不单列顶层条目。
- `defer`：只保留在 run 中，适用于目前只有 `event_witness` 或 `structure_difference`、尚未证明起作用可能性的结构。

结构族命名应落在设计差异真正发生的层级，而不是按机制动作命名。`driver` 是触发方式，例如推、拉、力链搬运；`producer` 产出资源、债务、阻塞、把手或形状；`consumer` 消费这些输出并改变动作集合、可达性、回返性或目标关系。只有 driver 本身制造新的站位门、shortcut 或消费关系时，才考虑升为新结构族。

Curator 合格输出应进入：

```text
prototypes/<mechanic_id>/mechanism_lab/lexicon.md
prototypes/<mechanic_id>/mechanism_lab/lexicon_index.md
prototypes/<mechanic_id>/mechanism_lab/backlog.md
```

`lexicon.md` 是默认形态。Curator 只有在语料变长、单文件已经影响阅读或检索时，才应拆成：

```text
prototypes/<mechanic_id>/mechanism_lab/lexicon/
  README.md
  <topic>.md
```

拆分依据由 curator 从已有语料中归纳，例如后续使用者实际会怎样查找结构；不要预先按机制名或假想分类拆。拆分后必须保留 `README.md` 索引，列出每个结构族的一句话用途、链接和拆分依据。

单个结构族应包含：

- 局部结构谱：用多张小图或精确口述展示相邻变体。
- 旋钮：哪些变量被调节，例如长度、墙口余量、施力侧、前格空位、边界位置、把手可达性。
- 可观测事实：每个变体的动作集合、可达状态、回返性、事件集合或状态类别如何变化。
- 组合接口：输入条件、输出状态、自然消费方式、常见 shortcut、审美风险、推荐 probe 和组合例句。
- 设计价值：它能成为什么局部装置或局部逻辑链片段，不写完整关卡。
- 误用边界：什么相似结构不会产生同样效果。
- 来源：run id、case id、证据标签。

收录门槛：

- 至少 4 个近邻变体，除非原型本身局部状态空间极小。
- 至少 1 个正例和 1 个反例。
- 至少 1 个修正原解释的边界 case。
- 能明确说出旋钮，而不是只写“某规则会发生”。
- 能说明输入 / 输出接口，并至少有一个最小 consumption probe 证明输出存在起作用的可能性。
- 不把 `returnToInitial.status=exhausted` 当作不可回返证明。

证据标签建议：

- `runtime_observed`：动作回放或动作表观察到。
- `bounded_return`：有限深度回返搜索支持。
- `bounded_graph`：有限深度状态图支持。
- `graph_complete`：预算内完整枚举完成。
- `counterfactual_observed`：禁用规则 / 分支后差异被观察到。
- `consumption_probe`：输出接入极小后续约束后，动作集合、可达性、回返性、资源分配或 shortcut 边界发生差异。
- `composition_probe`：两个或多个结构族通过输入 / 输出接口串接成功。

## Miner 的位置

Miner 可以在此流程中做三件事：

- 启发 explorer：发现某类事件或局部结构经常出现，再由 explorer 手写最小 patch 验证。
- 扩展变体：对已知局部结构做尺寸、墙形、距离、对象数量变化。
- 找反例：证明 curator 草案的条件太宽。

Miner 不能直接产出 lexicon 条目。进入 lexicon 的语料必须经过局部 patch 和 runtime-backed 记录。

## 不进入本阶段的内容

以下内容属于后续流程，不在本阶段处理：

- 根据 lexicon 设计完整关卡。
- 组装 candidate packet。
- 调用 puzzle critic 或 evidence reviewer。
- 读取 archive、人类评分、人类评价或历史候选作为设计校准。
- 判断某条语料是否“有趣”或“够高分”。
