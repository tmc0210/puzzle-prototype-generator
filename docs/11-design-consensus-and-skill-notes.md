# Design Consensus and Skill Notes

本文档记录当前阶段已经达成的设计共识。它不是最终 skill 规范，而是未来抽象成 Codex skill / plugin / MCP 时的素材池。

目标是把本轮讨论中的经验沉淀下来，避免后续 agent 重复犯同样错误：未确认规则就实现、把模糊概念写成指标、让 LLM 自由出题、把 trace 覆盖误当成关卡质量。

## 项目定位

本项目不是制作某一个 Sokoban-like 原型，而是构建一套可复用能力：

```text
用户描述机制
-> agent 澄清规则和目标
-> 机制 IR / runtime
-> 课程与关卡职责
-> 结构化候选生成
-> 求解器硬验证
-> LLM 玩家体验验证
-> PuzzleScript Next 原型导出
```

PuzzleScript Next 更适合作为快速可玩输出和分享格式。用于分析的规则真相应来自项目自己的机制 IR 与 runtime adapter。求解器、评估器和 LLM 玩家都应调用同一个 runtime，而不是各自复刻规则。

## 不可跳过的澄清

严谨逻辑解谜中，错误假设会污染整条链路。agent 在生成机制、知识、课程或关卡前，必须先确认或显式记录以下内容：

- 通关标准。
- 关卡数量和课程目标。
- 未说明的机制交互。
- 机制侧重点。
- 机制的精确定义。
- 哪些默认值被使用，默认值是否影响核心机制。

通关标准尤其不是验收器负责发现的东西。它和“玩家能拉箱子”一样属于原型规格。

## 机制、知识、能力、关卡

当前接受的分层：

```text
机制: runtime 中实际发生的规则。
知识: 玩家为了预测、控制、通关而需要学会的命题。
能力: 玩家可迁移地使用一组知识完成某类结构任务。
关卡: 在特定知识状态下要求玩家产生某种证据的任务。
```

不要把所有东西都叫知识。更稳妥的分类是：

- 规则事实：动作和结果的基本关系。
- 交互边界：两个机制相遇时的优先级、例外、失败分支。
- 操作技巧：玩家可重复使用的局部手法。
- 结构模式：一类空间构造或依赖关系。
- 课程目标：某一阶段希望玩家掌握的东西。

负知识和限制可以存在，但不应轻易当作正向教学目标。例如“不能推动两个连续箱子”通常是边界或约束，不一定是一个核心能力。

避免使用无法落地的知识名，例如只写“拉开箱子制造通路”。它可能是合理的设计备注，但在进入评估器前必须说明：

```text
它依赖哪些状态结构？
它在 trace 或状态图中如何观察？
它是否只是人工命名的战术解释？
```

## 关卡职责

关卡类型不应只是标签。更准确的定义是：

```text
关卡职责 = 玩家已知内容 + 目标学习/应用内容 + 支架强度 + 评估契约
```

推荐先使用少量职责，而不是急着写完整分类学。

| 职责 | 玩家已知 | 目标 | 主要测试 |
| --- | --- | --- | --- |
| diagnostic | 预期前置知识 | 检查前置是否成立 | 是否自然使用前置知识 |
| discovery | 前置知识，不知道目标知识 | 发现新规则或新交互 | 是否形成并验证新假设 |
| boundary | 已知基础规则 | 暴露例外、限制、反例 | 是否修正旧模型 |
| guided_application | 已知目标知识 | 首次在完整小题中应用 | 是否顺利把知识纳入计划 |
| independent_application | 已知目标知识 | 无明显提示地应用 | 是否独立形成完整解法 |
| variation_transfer | 已知目标知识 | 换表面或空间结构 | 是否识别同构结构 |
| combination | 已知多个知识 | 组合、排序、互相约束 | 是否建立子目标依赖链 |
| challenge | 已知本章知识 | 深度规划或反直觉应用 | 是否公平、有进展、有核心洞见 |
| review | 旧知识 | 节奏调节和唤醒旧知识 | 是否快速完成且不引入新负荷 |

同一个关卡可以有主职责和次职责，但必须有一个主职责。否则求解器、LLM 玩家和课程排序都不知道该证明什么。

推荐元数据形状：

```yaml
role: discovery
known_before:
  - K_pull_single_crate
withheld_until_level:
  - K_blocked_portal_push_fallback
target_learning:
  - K_blocked_portal_push_fallback
support_level: medium
expected_solver_evidence:
  - all_winning_paths_use_target_event
expected_llm_player_evidence:
  - tries_old_model
  - observes_old_model_failure
  - forms_target_hypothesis
  - uses_target_hypothesis_to_finish
failure_interpretation:
  no_hypothesis: teaching_signal_too_weak
  hypothesis_but_no_solution: application_too_hard
  solves_without_target: bypass
```

## 教育设计启发

教育领域给本项目的启发不是直接套用术语，而是以下工作原则：

- 复杂能力应按 simple-to-complex 排列。
- 新知识需要支架，支架应逐渐撤掉。
- 新手可以先看见/补全/局部尝试，再进入独立解题。
- 变式练习和迁移比重复同一个布局更有价值。
- 失败可以有价值，但必须能产生可比较、可修正的证据。
- 形成性评估的目标是修改教学，而不是给一个空泛分数。

对应到谜题设计：

- discovery 关应让旧模型失败得清楚，并给出足够强的反馈让玩家修正。
- application 关不应再让玩家猜规则。
- challenge 关应挑战结构和规划，不应靠规则不透明或巨大空地制造难度。
- review 关和节奏关有价值，尤其是在机制诡异或课程密度高时。

## 求解器与评估器边界

求解器负责硬结论：

- 是否可解。
- 最短解或最小成本。
- 目标事件是否必要。
- 反事实模型是否不可解。
- 完整状态图或 product graph 上的路径性质。
- 核心解结构是否存在明显绕解。

评估器不得把模糊概念伪装成证明。以下概念不能直接进入 accepted gate：

```text
有趣
教学清晰
应用关
挑战关
机制被玩家理解
不是走路关
trace_predicate
```

它们必须改写为：

- 完整图指标。
- 最优解指标。
- 可 replay 的 trace 指标。
- LLM 玩家过程证据。
- 人工备注或启发式排序信号。

如果完整图或 product graph 超出预算，依赖完整图的指标必须返回 `unknown`，不能降级成 pass。

## LLM 玩家辅助分析

LLM 玩家不应被当成形式化求解器。它的价值是模拟一个受控玩家在局部课程阶段中的认知过程。

保留 ScaleGunByAI 项目的这些经验：

- 使用真实 runtime 作为唯一规则真相。
- 采用 `observe -> hypothesize -> act -> observe` 的在线循环。
- 小批量行动，不一次性输出完整解。
- 每次行动绑定 `expected_state_id`。
- 保存 trace、checkpoint、rollback。
- 记录假设、验证、反驳和失败类型。
- 当 LLM 陷入无意义试错时触发 strategy review。

不需要默认照搬的内容：

- 从零开始的长期玩家记忆模拟。
- 世界地图探索模型。
- 每关多玩家画像差分测试。
- 强制维护完整玩家成长档案。

本项目更需要“课程阶段局部玩家”：

```text
输入:
  当前关卡
  当前关卡职责
  前置知识包
  玩家可见规则

输出:
  游玩 trace
  假设和修正记录
  失败类型
  教学/可读性报告
```

不同职责使用不同测试协议：

- discovery：只给前置知识，不给目标知识，看是否能发现并使用目标知识。
- boundary：给旧规则，不给边界例外，看是否能从失败中修正模型。
- application：给目标知识，看是否能应用，而不是重新猜规则。
- challenge：给本章知识，看是否公平、有进展、卡点是否来自结构深度。

差分玩家测试可以作为诊断探针，但不应作为默认流程。只有当失败原因不清楚时，才考虑补跑 target-taught 或 expert 玩家。

## 未来 Skill 应保留什么

未来抽象成 skill 时，SKILL.md 应保持短而可执行。适合放入 skill 本体的内容：

- 先澄清规则，再生成机制和关卡。
- 先声明关卡职责，再选择测试协议。
- 先设计因果链，再画地图。
- 不要把 witness 加路程当作 application / challenge。
- 不要把强制动作和连续重复操作当作主要难度来源。
- 不要把不可验证指标写成验收条件。
- 求解器和 LLM 玩家分工必须清楚。
- 任何默认值都要可见、可追溯、可覆盖。

详细材料应放入 `references/`，按需加载：

```text
clarification-checklist.md
mechanism-ir.md
knowledge-and-ability.md
level-roles.md
solver-contract.md
evaluator-contract.md
llm-player-protocol.md
curriculum-planning.md
puzzlescript-next-notes.md
causal-chain-level-design.md
```

未来 plugin/MCP 更适合承载确定性能力：

- PuzzleScript Next export/check。
- runtime step / replay。
- BFS/Dijkstra/A* / full graph analyzer。
- product graph event property checker。
- LLM player session tools。
- evaluation report generator。

## 当前开放问题

以下问题尚未定稿，不应过早固化进 skill：

- 能力如何从机制 IR 和知识图中系统派生。
- 哪些关卡职责是 MVP 必需，哪些只是长期分类。
- LLM 玩家报告如何结构化成可比较指标。
- 哪些体验指标可以成为 soft gate，哪些只能排序。
- 如何控制 LLM 玩家成本，避免每个候选都跑昂贵测试。
- 如何把教育领域概念转写成谜题生成器可执行协议。

当前策略：

```text
先在项目文档中记录共识。
在一个小 MVP 闭环中验证。
再挑选稳定、可泛化、可执行的部分抽象成 skill/plugin。
```
