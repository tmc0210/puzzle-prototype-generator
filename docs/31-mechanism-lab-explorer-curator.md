# Mechanism Lab Explorer / Curator 流程

本文档定义 runtime-backed 的机制语料生产流程。当前阶段只覆盖局部结构探索与语料整理，不进入完整关卡设计、candidate packet、critic、evidence review 或 archive 审美判断。

## 目标

Mechanism lab 的最终产物是 designer 可使用的可组合局部结构语料，而不是实验流水或规则问答。合格语料必须让 designer 能自然做这种拼接：

```text
前置结构产出 A -> 后续结构需要 A -> 加几何限制和节奏后形成关卡骨架
```

每个正式条目至少说明：

- 输入接口：需要什么对象、占格形状、站位、边界状态或前置产物。
- 输出接口：产出什么材料、债务、把手、阻塞、可达性或回返状态。
- 最小 consumer：哪个极小墙口、目标袋、通道、把手格、站位门或后续结构已经消费这个输出。
- 对照关系：错一格、宽一格、换对象、换顺序或预分离后为什么失败或退化。

## 当前入口

每个原型的机制语料放在：

```text
prototypes/<mechanic_id>/mechanism_lab/
  lexicon.md
  lexicon_index.md
  backlog.md
  runs/
```

- `lexicon.md`：当前正式语料正文。
- `lexicon_index.md`：当前结构族短索引，给 explorer 快速避重和查接口。
- `backlog.md`：当前值得探索的新设计空间或组合空间。
- `runs/`：实验历史和证据库，只在核对来源、追溯裁决或审计时读取。

旧 refresh / decision 文件和旧 runs 保留为 provenance，但不是默认上下文入口。

## 标准意图

默认连续循环：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

用户明确点名某个机制、结构方向或局部设计空间时，进入指定范围模式。用户 scope 是硬范围；不要先做“是否有空间”的存在性验证。应在该范围内拆出对象、占格形状、边界关系、时序、站位、产物、需求端、消费端、已有语料和退化风险。

单独任务：

- `mechanism_explore(prototype, scope)`：只跑探索，不更新正式 lexicon。
- `mechanism_curate(prototype, run_ids)`：只做语料整理和裁决。

## 默认线性循环

默认使用单 agent 线性流程。Subagent 只在用户明确要求并行时使用。

每轮只处理一个设计空间：

1. 选一个设计空间：静态说清“输入 -> 产物 -> 最小 consumer”。
2. 写结构谱草案：3-6 个近邻变体，包含正例、错例、宽一格 / 少一格 / 换对象 / 换顺序 / 预分离等对照。
3. 跑最小对照实验：runtime 只确认结构谱和对照关系，不负责发现 topic。
4. 语料化收口：新条目、并入旧条目、补充旧条目、暂存或丢弃。

选题阶段不提前跑 runtime。以下题材不合格：

- “验证某规则是否触发”。
- “某动作是否 legal / 是否可解 / 是否产生事件”。
- “看看会发生什么”。
- “工具能不能跑通”。
- “给已有条目补一个普通未覆盖变体”。

## Brief 与输出

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
- design_space: 输入 -> 产物 -> 最小 consumer
- seed_source:
- source_boundary:
- structure_spectrum:
- do_not_repeat:
- success_criterion:
- output_contract:
```

只有用户明确要求并行，或本轮确实需要多个互不干扰的设计空间，才使用 round + topic 子目录。即使使用多 topic，每个 topic 也必须是设计空间切片，而不是抽象问题。

## 工具边界

通用机制实验工具只依赖 `RuntimeAdapter` 和 `PuzzleRuntime`：

- `src/core/runtimeGraph.ts`：枚举有限状态图。
- `src/workflows/localExperimentRunner.ts`：读取手写局部 patch，回放动作，列最终动作表，做有限深度可达枚举，并搜索最终状态能否回到初始状态。
- `src/cli.ts mechanism-lab-run`：命令行入口。

工具不得读取或复用历史候选、历史关卡、design archive、人类评价、sampler profile 或 hardcoded layout template。Miner 可以启发题材，但 miner 产物不能直接进入 lexicon。

## CLI 用法

```bash
tsx src/cli.ts mechanism-lab-run prototypes/<mechanic_id> cases.yml --run-id local_probe_01 --write
```

输入文件最小格式：

```yaml
runId: local_probe_01
title: "局部结构对照"
notes: "输入接口 / 输出接口 / 最小 consumer 的简短说明"
defaults:
  maxExploreDepth: 14
  maxReturnDepth: 24
  maxStates: 20000
  maxTransitions: 80000
cases:
  - id: "case_a"
    family: "local_structure_family"
    variant: "variant_a"
    changed_variable: "相对对照变体改动的结构旋钮"
    contrast_with: "case_b"
    notes: "本 case 在结构谱中的角色"
    layout: |
      #####
      #@..#
      #####
    actions: ["right"]
```

`question` 字段仅为旧 run 兼容保留；新材料默认不要用它组织 topic。

`mechanism-lab-run --write` 默认写入：

```text
cases.json
results.json
report.md
```

`brief.md`、`explorer_notes.md`、`proposed_families.md` 和 `curator_decision.md` 由 agent 补齐，不是 runner 自动输出。

## Explorer 要求

Explorer 先写结构谱，再跑实验。结构谱必须包含：

- 正例：产出可用材料。
- 错例：相近结构不产出同样接口。
- 边界修正：排除普通占位、普通阻挡、普通容量、普通 shortcut、普通目标消费或已有结构补谱。
- 最小 consumer：输出被哪里消费。

`proposed_families.md` 必须先写 designer-facing 语料：

- 接口卡片：输入接口、输出接口、最小 consumer。
- 局部结构谱：正例、错例、边界修正。
- 对照关系：每个变体改了什么，为什么改变产物或 consumer。
- 可接入的结构：这个输出自然能接哪些已有 consumer。
- 误用边界：哪些相近结构不会产生同样结果。
- 证据来源：run id、case id、关键观察。

随后写 curator 检查信息：

- 机制角色：`active_rule`、`material_source`、`consumer`、`incidental`。
- 关键观察点。
- 退化解释。
- 建议裁决：`promote`、`merge`、`supplement`、`relabel`、`defer` 或 `reject`。

## Curator 要求

Curator 更新 lexicon 前必须先裁决：

- `promote`：新顶层结构族，要求接口卡片和最小 consumer。
- `merge`：并入已有结构族。
- `supplement`：作为已有结构族的输入侧、输出侧、错例或组合补充。
- `relabel`：材料有价值但归属写错。
- `defer`：只有结构差异，缺最小 consumer。
- `reject`：事实不稳、缺对照、只是规则复述或没有 designer 可用接口。

收口前必须校准结论范围：

- 已支撑：哪些变体和 consumer 能支撑当前语料。
- 结论收窄：哪些未跑、等价、不适用或 patch 隔离不了。
- 不应入库：哪些只有 event witness、孤例、预算不足或没有接口。
- 是否打开新设计空间：只有出现新的产物、需求端、消费端或组合关系时，才进入 backlog。

## Lexicon 格式要求

`lexicon.md` 前部应包含组合矩阵：

```markdown
## 组合矩阵

| 前置结构 | 中间材料或状态 | 后续消费结构 |
| --- | --- | --- |
| B/S 绑定债 | sticky L 形 | 刚体黏块 + 墙口中的 L 形把手门 |
```

组合矩阵既用于从前置结构找产物，也用于从产物或状态找后续消费结构；它不加证据状态或风险列，证据、shortcut 和风险留在条目正文。矩阵应指向实际产生或消费接口的 `##` 条目或 `###` 子节；带独立接口卡片、可被 designer 单独调用的子节必须能被命中，但不改变其 family 归属。只收当前正式语料已支撑的连接，consumer 不同的材料或状态分行书写。

每个正式条目顶部必须有接口卡片：

```markdown
接口卡片：
- 输入接口：
- 输出接口：
- 最小 consumer：
```

正式条目保留局部结构图、对照关系、共同解释、误用边界和证据来源。内部判断术语后置；正文优先使用 designer 能直接理解的结构语言。旧式内部占格术语在 designer-facing 文本中优先改写为“占格形状 / 连体块形状 / 二格横条 / L 形块”等具体表达。

## Backlog 规则

`backlog.md` 只记录真实新设计空间或组合空间。普通补证、补归因、补变体、补格式，不是默认 explorer topic。

每条 backlog 项应写：

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

Closed 历史项不需要长期留在 backlog；其 provenance 已由 run 和 lexicon 证据段保存。
