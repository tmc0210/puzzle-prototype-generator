# Mechanism Lab Protocol

本 protocol 用于 explorer 和 curator。它不覆盖关卡设计、候选审查或 archive 判断。

## 标准意图

任何 mechanism lab 请求都先归一成标准意图，而不是根据 prompt 长短或信息量分支。

默认连续循环意图：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

触发语义包括“开始一轮探索循环”“继续探索循环”“让 explorer 继续跑”“用当前语料再探索”等。用户只需要提供 `prototype`；`scope` 与 `round_budget` 可选。默认 `round_budget=1`，每轮都必须完成 curator 收口后停止报告。

单独任务可归一为：

- `mechanism_explore(prototype, scope)`：只跑 explorer，不更新正式 lexicon。
- `mechanism_curate(prototype, run_ids)`：只做 curator 裁决和语料整理。

## 输入归一化

Controller / curator 把标准意图补全成 exploration brief：

- `prototype`：目标原型。
- `scope`：本轮机制范围或机制组合。
- `exclusions`：本轮明确避开的机制、方向或材料。
- `source_boundary`：允许读取和禁止读取的材料。
- `run_intent`：`explore`、`curate` 或 `explore_then_curate`。

brief 信息不足时，controller / curator 从 `lexicon_index.md`、`backlog.md` 和 runtime 中补全一个保守的小范围；约束较多时，把它压缩成上述字段。不要要求用户或 subagent 在 prompt 中复述流程细节。

## 当前入口与历史记录

连续探索的默认入口是当前状态文件，不是历史 refresh：

- `mechanism_lab/lexicon.md`：当前正式语料正文。
- `mechanism_lab/lexicon_index.md`：当前结构族索引，给 explorer 快速避重和定位缺口。
- `mechanism_lab/backlog.md`：当前待探索缺口，给 controller / curator 准备下一轮 brief。
- `mechanism_lab/runs/<run_id>/`：实验历史和证据库，按需读取。
- `refresh_notes.md` / `refresh_decisions.md`：一次性历史摘要，只在追溯旧裁决、核对 provenance 或做版本审计时读取；Explorer 默认不读。

历史 refresh 不要求匹配当前 lexicon。当前状态以 `lexicon.md`、`lexicon_index.md` 和 `backlog.md` 为准。

## 标准启动流程

1. 确认 prototype、source boundary、runtime adapter、可用命令。
2. 读取必要规则 / runtime，只提取本轮 primitive refs。
3. 写 6-10 个候选结构族。每个结构族必须写：family id、局部问题、结构旋钮、近邻变体、预期观测和可能的输入 / 输出接口。
4. 过滤候选：规则直接可读出的不跑；只改变 driver 的不升为新 family；没有自然消费方向的先标为上游材料。
5. 选择 1-2 个结构族执行，选择依据是近邻变体密度、可观测差异、反例潜力和 consumption probe 潜力。
6. 为选中的结构族写 `cases.yml`，case 默认包含 `family`、`variant`、`changed_variable`、`contrast_with`。
7. 运行 `mechanism-lab-run --write`。
8. 写 `explorer_notes.md` 和 `proposed_families.md`。
9. 按 curator rubric 判断是否更新 lexicon；不达标则只保留 proposed families。
10. Curator 若更新正式语料，应同步更新 `lexicon_index.md` 与 `backlog.md`；历史 refresh 文件不回写。

## 连续探索循环

使用短周期 explorer，而不是让同一 explorer 无限扩张：

1. Controller / curator 从 `lexicon_index.md` 与 `backlog.md` 选择缺口。默认选择第一个 `open` gap；若用户提供 scope，选择最贴近 scope 的 open gap。
2. Controller / curator 创建本轮 run 目录并写 `brief.md`。Brief 只给本轮所需上下文：目标原型、source boundary、scope、相关索引项、允许读的 1-3 个完整条目、不要重复的旧结论、预算和成功标准。
3. 若当前上下文有 subagent 能力，controller 用 subagent 执行 `brief.md`；若没有，才在同一对话内按短周期 explorer 执行。Subagent prompt 只需指向 `brief.md`，不复述流程。
4. Explorer 在 brief 内提出候选结构族并执行 1-2 个，不直接更新正式 lexicon。
5. Curator 读取本轮 run 与 proposed families，写 `curator_decision.md`，裁决 `promote`、`merge`、`supplement` 或 `defer`。
6. Curator 更新 `lexicon.md`、`lexicon_index.md` 与 `backlog.md`。
7. 每 3-5 轮做一次轻量 audit：检查 index 覆盖、证据门槛、重复命名、driver-only 顶层条目和 backlog 是否仍有效。

候选选择分层：curator 选择缺口和成功标准，explorer 在缺口内选择具体局部结构族，curator 决定是否收录。

## Loop Round 文件接口

`mechanism_loop` 的每轮目录：

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

`brief.md` 是 controller 给 explorer 的标准任务包：

```markdown
# Explorer Brief: <run_id>

- prototype:
- gap_id:
- source_boundary:
- scope:
- related_index_entries:
- full_lexicon_entries_allowed:
- runtime_files_allowed:
- do_not_read:
- do_not_repeat:
- budget:
- success_criterion:
- output_contract:
```

`curator_decision.md` 是 curator 的本轮收口记录：

```markdown
# Curator Decision: <run_id>

- gap_id:
- explorer_outputs:
- decision: promote | merge | supplement | defer
- rationale:
- lexicon_changes:
- index_changes:
- backlog_changes:
- next_round_suggestion:
```

`brief.md` 和 `curator_decision.md` 是流程接口，不是 runtime 工具输出。`mechanism-lab-run --write` 只负责 `cases.json`、`results.json`、`report.md` 等硬事实文件。

## Explorer

Explorer 应先形成结构族问题，再跑实验。合格问题必须围绕一组近邻变体比较至少两个条件：

- 结构 A 和结构 B 的动作集合不同。
- 同一动作早做 / 晚做导致不同状态类别。
- 贴墙 / 离墙 / 过墙口改变可达性或回返性。
- 2 格 / 3 格 / 4 格对象组合在同一局部地形下表现不同。
- 一个机制产物是否能被另一个机制继续消费。
- 结构输出接入极小墙格、目标、站位、把手或通道约束后是否产生新差异。

不合格问题：

- “探索某机制有什么用”。
- “验证规则是否会触发”。
- “看看有没有有趣结构”。

Explorer 输出 run notes 时，重点写：

- 观察到的条件差异。
- 不是规则复述的原因。
- 哪些相似结构是反例。
- 下一轮值得缩放的变量。

Explorer 应区分三层：

- `driver`：触发方式，例如推、拉、力链搬运。driver 通常是输入接口，不是结构族主体。
- `producer`：产出资源、债务、阻塞、把手、形状或状态类别。
- `consumer`：消费这些输出，并改变动作集合、可达性、回返性、目标关系或 shortcut 边界。

只有 driver 本身制造新的站位门、shortcut 或消费关系时，才考虑把它升为新结构族。

Explorer 还应在 run 目录写 `proposed_families.md`。它不是正式 lexicon，而是给 curator 的结构族草案：

- family 名称。
- 局部问题。
- 结构旋钮。
- 变体谱。
- 被反例修正后的共同解释。
- 输入条件：结构开始时需要什么对象、站位、墙格或目标关系。
- 输出状态：动作后产生什么债务、资源、阻塞、把手或可达性变化。
- 自然消费方式：这个输出通常能接到哪些后续结构。
- 常见 shortcut：哪些墙格、目标、空间或站位缺口会让结构被绕过。
- 推荐 probe：要证明输出真的被后续结构消费，应跑什么反事实或近邻对照。
- 组合例句：一条 recipe 级链条，不写完整关卡。
- 建议 curator 决策：`promote`、`merge`、`supplement` 或 `defer`。
- 哪些 case 不应进入 lexicon。

每轮 explorer run 的输出合同：

```text
cases.yml
cases.json
results.json
report.md
explorer_notes.md
proposed_families.md
```

## Curator

Curator 读取 runs 后，只保留可复用局部结构族。Curator 可以合并多个 case，但不能删除证据来源。

Curator 更新 lexicon 前必须先做决策：

- `promote`：新顶层结构族，要求至少有 `consumption_probe`。
- `merge`：并入已有结构族，适用于输出和消费方式相同、只扩展变体。
- `supplement`：作为已有结构族的 driver、输入侧、shortcut 或 probe 补充。
- `defer`：停在 run 中，适用于只有 `event_witness` 或 `structure_difference` 的材料。

Curator 应主动剔除：

- 只换了复杂名字的一阶规则。
- 没有局部图形或尺寸条件的抽象句子。
- 只依赖单条动作回放、但声称完整可达性的结论。
- 无法说明误用边界的结构。
- `returnToInitial.status=exhausted` 被当成不可回返证明的结论。

Curator 输出 lexicon 后，仍不得把它包装成完整关卡设计。Recipe 只能写成原理上可行的骨架：需求端需要某种输入，构造端主动制造该输入，消费端证明该输入被后续结构消费。
