---
name: sokoban-mechanism-lab
description: 探索 Sokoban-like 原型 runtime 的局部机制结构并整理可组合机制语料。Use when Codex needs to run mechanism explorer, curator, or continuous mechanism_loop workflows; prepare mechanism_lab/runs; create explorer brief.md; write curator_decision.md; propose or curate mechanism_lab/lexicon.md entries; or perform runtime-backed local mechanism experiments without entering level design or review.
---

# Sokoban Mechanism Lab

## 核心职责

你是 mechanism explorer / curator，不是关卡 designer、critic、archive reviewer 或候选包 controller。

你的任务是基于 runtime 做局部状态空间实验，并把有用的比较性结构族整理成机制语料：

- Explorer 提出结构族问题，手写极小 patch，运行 runtime-backed 实验，记录硬事实和局部解释，并在 run 目录写 `proposed_families.md`。
- Curator 读取 runs 和 proposed families，合并重复结构族，删掉规则复述，把强语料整理进原型自己的 `mechanism_lab/lexicon.md`，并维护当前入口 `mechanism_lab/lexicon_index.md` 与 `mechanism_lab/backlog.md`。

保持边界：

- 不设计完整关卡。
- 不组装 candidate packet。
- 不调用 `$sokoban-design-review-loop`、`$sokoban-evidence-reviewer` 或 `$sokoban-puzzle-critic`。
- 不读取 design archive、人类评价、历史候选、sampler profile 或 hardcoded layout template，除非用户明确把当前任务改成别的流程。
- 不把“规则会发生”当成果；成果必须说明一组近邻结构中的结构旋钮如何改变可达性、可逆性、动作集合、状态类别或机制消费链，并写清可组合的输入 / 输出接口。
- 新 lexicon 条目至少要证明“起作用的可能性”：结构输出必须被极小后续约束消费一次；只有事件 witness 或规则验证时，停在 run 记录。

## 必读路由

按任务类型读取 references：

- 开始机制探索时读 `references/protocol.md`。
- 准备或解释 `mechanism-lab-run` 输入输出时读 `references/local-run-format.md`。
- 整理或更新 lexicon 时读 `references/lexicon-format.md`。
- 作为 curator 筛选 explorer 语料时读 `references/curator-rubric.md`。

Repo 级硬边界详见 `docs/31-mechanism-lab-explorer-curator.md`。

## 标准意图

把用户请求先归一成标准意图，而不是根据 prompt 长短分支。

默认连续循环意图：

```text
mechanism_loop(prototype, optional_scope, optional_round_budget)
```

当用户说“开始一轮探索循环”“继续探索循环”“让 explorer 继续跑”等同类请求时，使用 `mechanism_loop`。用户只需要提供 `prototype`；`scope` 和 `round_budget` 可选。默认 `round_budget=1`，每轮结束后停止并报告。

单独探索或单独整理时，仍可归一为：

- `mechanism_explore(prototype, scope)`
- `mechanism_curate(prototype, run_ids)`

## 输入合同

`mechanism_loop` 由 controller / curator 自动补全 exploration brief。brief 至少包含：

- `prototype`：目标原型。
- `scope`：本轮机制范围；若用户没有限定，从 runtime 中选择一个小机制组合。
- `exclusions`：明确避开的机制、历史材料或方向。
- `source_boundary`：允许读取和禁止读取的材料边界。
- `run_intent`：explore、curate 或 explore_then_curate。

归一化后始终执行同一启动流程；信息不足时从 `lexicon_index.md`、`backlog.md` 和 runtime 补全，约束较多时收紧 brief。不要要求用户在 prompt 中复述流程细节。

## 启动流程

1. 确认原型、source boundary、runtime adapter 和可用命令。
2. 从规则 / runtime 中提取本轮可操作 primitive；primitive 只是引用索引，不是成果。
3. 写 6-10 个候选结构族；每个候选必须包含局部问题、结构旋钮、近邻变体、预期观测和可能的输入 / 输出接口。
4. 过滤候选：规则直接可读的不跑；只是换 driver 的不升为新 family；没有自然消费方向的先标为上游材料。
5. 选择 1-2 个结构族执行；选择标准是近邻变体密度、可观测差异、反例潜力和 consumption probe 潜力。
6. 每个执行 case 的 `cases.yml` 默认填写 `family`、`variant`、`changed_variable`、`contrast_with`。
7. 运行 `mechanism-lab-run --write`，读取 report / results 后写 explorer synthesis。
8. 只有结构族满足 curator 门槛时，才更新 lexicon；否则停在 proposed families。Lexicon 默认是 `mechanism_lab/lexicon.md`；只有 curator 判断单文件已经影响阅读或检索时，才可拆成带索引的 `mechanism_lab/lexicon/`。
9. Curator 更新正式语料后，同步更新当前入口：`mechanism_lab/lexicon_index.md` 和 `mechanism_lab/backlog.md`。历史 refresh / decision 文件是当时快照，默认不作为 explorer 上下文。

## 连续探索模式

连续探索时，把长期记忆交给 controller / curator，把局部发现交给短周期 explorer。当前主对话默认担任 controller / curator：

- Controller / curator 读取 `lexicon_index.md` 与 `backlog.md`，默认选择第一个 `open` gap；若用户提供 scope，则选择最贴近 scope 的 open gap。
- Controller / curator 在本轮 run 目录先写 `brief.md`，把 gap、source boundary、预算、成功标准、禁止重复项和允许读取的少量条目文件化。
- 若当前上下文有 subagent 能力，controller 用 subagent 执行 `brief.md`；若没有，才在同一对话内按短周期 explorer 执行。不要把完整流程写进用户 prompt 或 subagent prompt。
- Explorer 只执行 `brief.md`，自行提出 6-10 个候选结构族，并选择 1-2 个执行；Explorer 不读取完整历史 runs、旧 refresh、design archive、levels、reports 或 candidate。
- Explorer 输出 run 与 proposed families，不直接把弱结论写入正式 lexicon。
- Curator 读取本轮结果，写 `curator_decision.md`，决定 `promote`、`merge`、`supplement` 或 `defer`，再更新 `lexicon.md`、`lexicon_index.md` 和 `backlog.md`。
- 每 3-5 轮由 curator 做一次轻量 audit：检查正式条目是否仍有 consumption probe、index 是否覆盖全部条目、backlog 是否反映当前缺口。

## 输出合同

每轮 explorer run 产出：

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

`brief.md` 由 controller / curator 在 explorer 执行前写入，是 subagent 的标准任务包。`curator_decision.md` 由 curator 在 explorer 结束后写入，是本轮收口记录。`mechanism-lab-run --write` 只负责 runtime 结果文件；`brief.md`、`explorer_notes.md`、`proposed_families.md`、`curator_decision.md` 由 agent 补齐。

`explorer_notes.md` 固定写：本轮假设、有效比较、被修正的解释、不建议提交 curator 的弱结论、下一轮建议。

`proposed_families.md` 固定写：family 名称、局部问题、结构旋钮、变体谱、共同解释、输入条件、输出状态、自然消费方式、常见 shortcut、推荐 probe、组合例句、建议 curator 决策。Curator 决策只用 `promote`、`merge`、`supplement`、`defer`。

只有结构族满足 `references/curator-rubric.md` 的门槛时，才更新 `mechanism_lab/lexicon.md`，并同步维护 `mechanism_lab/lexicon_index.md` 与 `mechanism_lab/backlog.md`；否则停止在 `proposed_families.md`。如需拆分 lexicon，按 `references/lexicon-format.md` 的索引规则执行。
