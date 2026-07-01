# Current Level Design And Review Standard

Status: active execution contract for level design, review, and archive-facing
proposal states.

本文档只定义当前可执行的单关设计与审查协议。它不定义
`ruleset -> player_model -> curriculum -> level_specs` 的完整自动流程，也不把
SCC、variant、taste 或 prototype-specific redesign 当成每关必跑的通过条件。

旧版本中很多流程片段已经在实践中有效，例如 analyzer-backed revision、
reuse-strengthen、critic attack / designer action、SCC reading、variant
family、taste probes。它们没有被废弃；本版本把它们从主流程中拆出来，改为
**由 routing 触发的诊断或再设计阶段**。主流程必须短、硬、可执行。

## Scope

使用本流程前，controller / lead designer 必须确认：

- 原型规则、对象语义、胜利条件和求解实例语义；
- 可用 solver / analyzer / graph / archive 工具；
- 本轮 brief 的目标、玩家已知机制暴露阶段、机制范围和禁止机制；
- 是否存在原型专属工作，例如额外诊断、base-after redesign stage 或 brief 显式
  启用的 paired-design mode。

如果这些信息缺失，必须标记为 assumption / unknown。影响 runtime、solver
soundness 或求解实例语义的问题不得靠关卡设计流程补齐。

## Roles

```text
lead_designer / controller:
  主线程。负责设计、读工具证据、修正候选、调用 reviewer / critic，并决定
  review loop 的下一步。

solver / analyzer / formal_evaluator:
  代码工具。只报告硬事实、trace、事件、对象参与、图事实、反事实和 bypass
  证据。它们不判断好玩、优雅、教学价值或 campaign 位置。

evidence_reviewer:
  检查工具证据是否支持 designer 的 design_claim。

puzzle_design_critic:
  攻击玩家侧体验、角色适配、重复、脚本感、审美风险和证据过度解释。

archive_pass:
  记录已经发生的流程和 terminal state。它不是新的 designer / reviewer /
  critic / judge，不能升级候选状态。
```

这些角色不能合并成一个含糊的“质量判断”。如果无法产生独立 reviewer /
critic artifact，必须把 review_integrity 标为 `self_review_only`、`missing` 或
`blocked`。

## Core Loop

当前流程是嵌套循环，不是线性流水线，也不是固定“两审”流程：

```text
外层设计家族循环:
  family_iteration_1:
    选择一个玩家侧因果链 family
    做出 candidate_version_1
    运行工具并读取证据
    若证据或 design_claim 失败，局部修改或放弃该 family

    内层 review-modify 循环:
      candidate_version_1 -> review_1
      review_1 攻击 -> designer_action_1
      designer_action_1 产出 candidate_version_2、evidence_disagreement_2、
        hold、reject 或 change_family
      candidate_version_2 / evidence_disagreement_2 -> review_2
      review_2 攻击 -> designer_action_2
      ...
      重复，直到最新材料上的最新 review 达到 terminal state，或该 family 被放弃

  family_iteration_2:
    如有必要，开始不同的因果链 family

archive pass:
  只记录循环达到的 terminal state；不得升级状态
```

`designer_action_N` 永远不能关闭 review loop。核心攻击只能由后续
`review_N+1`、更晚的独立 review，或人类 review 关闭。designer 若认为 critic
漏读证据，只能提交 `evidence_disagreement` 给下一轮 review；这不是提交给人类
的最终材料。

critic 之后没有“继续下一个阶段”。`review_N` 之后只有这些动作：

- 修改结构 / claim / 起点 / 机制范围，并重跑必要证据，进入 `review_N+1`；
- 提交具体证据异议或失败尝试给 `review_N+1` 判断；
- 降级 / hold；
- reject / change family；
- failed_search。

## Candidate Packet

任何 serious candidate 进入 review loop 前，必须有下面的最小 packet：

```yaml
prototype_context:
  confirmed_rules:
  win_condition:
  object_and_event_semantics:
  tool_boundary:

slot_brief:
  intended_role:
  known_before:
  target:
  difficulty_or_support_expectation:

mechanic_exposure_context:
  allowed_exposure_through:
  claimed_core_events:

design_target:
  aesthetic_score_target:
  difficulty_score_target:
  target_role_notes:

solve_instance:
  layout:
  player_start:
  player_goal:
  win_condition:

mechanism_scope:
  central:
  allowed_support:
  incidental_allowed:
  required_winning_path_events:
  forbidden_winning_path_events:
  forbidden_if_seen_anywhere:

design_claim:
  player_insight:
  causal_chain:
  why_not_execution:
  falsification:

evidence:
  commands_run:
  solver_result:
  trace_summary:
target_events:
object_or_instance_evidence:
winning_path_event_checks:
reachable_event_exposure:
graph_or_counterfactual_evidence:
evidence_limits:

diagnostic_routing:
  activated:
  not_applicable:
  unknown_or_unavailable:

attempt_log:
  serious_structural_attempts:
  local_repairs:
  abandoned_families:
```

`causal_chain` 说明解法如何工作。`player_insight` 和 `why_not_execution` 说明这
个解法为什么对目标玩家有设计价值。一个候选可以有有效 causal_chain，但仍然
无法支撑自己的 design_claim。

## Design Studio Loop

lead designer 在 review 前必须自己完成设计和证据读取：

1. 写一个可被攻击的 `design_claim`，不要只写事件序列。
2. 设计 layout，并声明求解实例。
3. 运行 solver / analyzer / evaluator 中本轮允许的工具。
4. 读 trace、事件、对象参与、图事实、反事实和工具边界。
5. 完成 diagnostic routing。
6. 若证据不支持 claim，修正、降级、放弃或换 family。
7. 只有 evidence-supported candidate 才进入 review loop。

如果修改了 layout、起点、终点、胜利条件、核心机制使用或 design_claim，旧证据
和旧 critic 结论不得继承。必须重跑必要证据，并把新版本送入下一轮
`review_N+1`。

## Diagnostic Routing

每个 serious candidate 必须完成 diagnostic routing。必跑的是“是否触发诊断”的
判断，不是每个诊断本身。

```yaml
diagnostic_routing:
  hard_evidence:
    status: required
    reason: serious candidate must have solver/analyzer evidence
  mechanism_scope:
    status: required
    reason: central/support/winning-path/reachable-exposure event gates must be checked
  claim_hygiene:
    status: required
    reason: claims must not exceed evidence
  taste_probes:
    status: routed
    selected: []
  scc_graph:
    status: triggered | not_applicable | unavailable | unknown
    reason:
  variant_family:
    status: light | full | not_applicable | unknown
    reason:
  start_position:
    status: triggered | not_applicable | unavailable | unknown
    reason:
  prototype_specific_work:
    kind: diagnostic | redesign_stage | not_applicable | unknown
    status: triggered | not_applicable | unavailable | unknown
    reason:
```

### Always Required Diagnostics

`hard_evidence`、`mechanism_scope` 和 `claim_hygiene` 对 serious candidate 必
跑：

- solver / analyzer 是否找到声明的 player-facing win；
- winning solution 是否触发 central mechanism；
- required winning-path events 是否可被胜利路径绕过；
- forbidden winning-path events 是否出现在胜利路径中；
- forbidden-if-seen-anywhere events 是否在任意可达事件扫描中出现；
- event count、trace observation、object participation 和 graph claim 是否被
  正确限定范围；
- analyzer pass 是否被误写成设计质量 pass。

### Routed Taste Probes

taste 不是 checklist。designer / critic 应按 candidate mode、role 和 brief 选
择少量 probe，通常 2-4 个。

常用 probe families：

- `player_insight`: 玩家是否真的需要理解 claim，还是只是在执行下一个显然动作？
- `state_consumption`: 声称的状态变化在哪里被后续消费？
- `why_not_execution`: 难度是否来自因果关系，而不是长度、走廊、重复动作或噪声？
- `repetition_coupling`: 重复操作 / 重复 causal chain 是否通过共享资源、顺序、
  路线含义、角色切换或后续消费耦合？
- `role_fit`: 候选是否真是 application / challenge / capstone，而不是 witness
  或简单教学关？
- `salient_element_use`: 显眼元素是否只是 filler / blocker / counter / 装饰？

未被 routing 触发的 taste probe 不得作为隐藏通过条件运行。

### SCC / Graph Diagnostic

SCC / graph 不是通用必跑项。它在以下条件下触发：

- 候选声称是 application / challenge / capstone；
- 需要判断开局自由度、分支、多解、bypass 或其它完整图事实；
- 当前原型有可靠 complete graph / SCC 工具，或 brief 明确要求使用。

若工具不可用，记录 `unavailable` 或 `unknown`，不能伪造图结论。

SCC 读法只提供证据，不自动给分。`one_win_continuation_per_scc`、
`branching_win_dag`、`forced_win_prefix`、`trivial_source_scc`、
`entry_equals_exit_source` 都是拓扑事实，不是硬 pass/fail。

具体字段含义和允许推论见
`docs/30-scc-graph-diagnostic-reading.md`。任何把 SCC / graph fact 用作设计
攻击或设计背书的 reviewer / critic，都必须说明：

```text
graph fact -> neutral meaning -> player-facing interpretation -> verdict effect
```

如果缺少 player-facing interpretation，该 SCC / graph fact 对 verdict 的影响
必须是 `none`。

### Variant / Family Diagnostic

默认规则：除非人类请求或 experiment brief 明确授权变体、修补、强化、延展、
remix 或基于某个 archive candidate 继续设计，lead designer 不得设计、优化或
提交已有 archive candidate 的变体。`archive_taste_context` 是审美校准和失败
模式校准，不是可复用 base。

如果设计过程中发现当前候选继承了 archive candidate 的主要玩家侧因果链、对象
角色或布局骨架，而本轮没有明确授权变体工作，必须 reject / hold / change
family，不能进入 `proposal_ready` 或 `proposal_ready_with_caveats`。坐标变化、
起终点变化、路线缩短、替换一个末端机制、追加一个小机制或给某个对象增加次要
职责，都不能把未授权变体变成新候选。

轻量 family 标注对 archive proposal 默认需要：

```text
fresh | related_to:<id> | refined_from:<id> | strengthened_from:<id> |
transform_clone | stitched_extension | unknown
```

`related_to`、`refined_from`、`strengthened_from` 只描述事实来源；它们不授权
变体设计，也不能把未授权变体变成可提交 proposal。

完整 variant 审查只在下面条件触发：

- 候选来自已有候选、变体、修补或复用；
- 本轮生成多个候选，存在 family 重复风险；
- 要做 campaign selection；
- archive 中已有相关正反例。

variant 诊断的目的不是打分，而是防止旋转、平移、加长、移动目标、换起点、拼接
独立小题被包装成新设计。

### Start-Position Diagnostic

起点诊断在以下条件触发：

- 起点影响 opening commitment、可读性、核心机制覆盖或 bypass；
- 候选声称是 application / challenge / capstone；
- brief 或原型文档要求显式起点比较；
- 修改起点会改变 solve instance。

若推荐起点不同于已验证实例，必须重跑相关证据。起点诊断不是独立通过条件。

### Prototype-Specific Work

原型专属工作分两类：

```text
diagnostic:
  对候选做额外检查或证据读取。

redesign_stage:
  基于一个已经有价值的 base candidate 做二次设计、优化或变体提案。

paired_design_mode:
  由原型文档或 experiment brief 显式启用，同时设计和审查一组互相关联的
  solve instances；它不是默认流程。
```

meta-interface、重访入口、跨关连通、大地图接口等都不是通用流程默认项。只有
prototype docs 或 experiment brief 明确声明时才触发。通用流程不得假设所有游
戏都有 meta 机制。

如果原型专属工作是 `redesign_stage` 或 `paired_design_mode`，不要把它执行成
机械筛查或边缘枚举。只有 prototype docs、experiment brief 或人类请求明确授权
时，才允许提出相关变体或配对候选。具体入口以原型文档为准；base-after 类型的
常见入口是：

这里的授权可以来自原型文档本身；不需要另行包装成普通 archive-variant 授权。
未授权变体禁令只限制从 archive candidate 派生的普通设计，不限制原型文档或
experiment brief 明确声明的 prototype-specific meta / redesign 流程。

```text
base candidate 已经作为普通关有保留价值
-> 阅读它是否有再设计潜力
-> 如果有，提出 redesign variant
-> 重新验证 base instance 和 redesigned / meta instance
-> critic 同时评价 base 质量和 redesign 是否真正增值
```

弱 base candidate 不能靠 redesign stage 挽救。若 base 的核心 design_claim、证
据或 role fit 已经失败，应先回到 design studio loop 或降级 / reject，而不是继
续包装 prototype-specific 亮点。

如果原型文档定义了显式的 paired-design mode，reviewer / critic 必须接收完整
配对 packet。不能只审其中一个 solve instance 后替另一个背书。

## Review Loop

reviewer / critic 接收的是 candidate packet，不是自由讨论材料。

### Archive Taste Context

`archive_taste_context` 只允许包含带有人类评语的 candidate。critic 不负责自己
全库检索；它只消费 packet 中的人类评语支持的审美证据。

没有人类评语的 candidate 可以在普通 attempt log / exploration log 中作为历史
尝试或证据记录提及，但不得放入 `archive_taste_context`，也不得作为审美正例、
审美反例或 human taste calibration 使用。

默认数量：

```text
normal experiment: 0-2 examples
challenge / capstone / redesign_stage / recent drift calibration: 1-3 examples
absolute max: 4 examples
```

如果归档为空，或没有相关且带有人类评语的 clean archive 条目，写
`none_found` 和原因。

如果 `archive_taste_context` 是 `none_found`、缺失，或没有可用的人类评分 /
人类评语锚点，critic / designer 不能输出任何分数化审美或难度结论。禁止写
`4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 或等价表述；只能写
`unscored_missing_human_archive_context`、`target_fit_unknown` 或非分数的
结构观察。solver / analyzer 事实可以支持机制声明，但不能替代 human archive
calibration 生成分数。

选择前提和优先级：

- `human_reviewed: true` 和人类评语是进入 `archive_taste_context` 的前提，不
  是优先级；
- 人类审美 / 难度评分和原文摘句优先于 tag、status、archive_use 或检索摘要；
- 同机制 / motif；
- 同角色或同阶段；
- 同失败模式；
- critic_calibration / designer_calibration 只有在对应 candidate 同时带有人类
  评语时，才能作为 `archive_taste_context` 的选择理由。

归档 taste 例子只用于人类评语支持的审美校准、失败模式和批评校准。不要复制或
复用例子的 layout、几何结构、因果链、求解路线、对象摆放或入口出口关系。若
人类没有明确授权变体设计，当前候选不得从归档例子派生。若已获授权并从归档例
子派生，必须显式标记 `related_to` / `strengthened_from`，说明授权范围和新的
player-facing meaning。

evidence reviewer 判断：

- 工具证据是否支持 `design_claim`；
- 工具证据是否支持声明的 `claimed_core_events`；
- 是否把 winning-path gate 与 reachable exposure gate 区分清楚；
- `forbidden_if_seen_anywhere` 是否在完整可达事件扫描中命中；若扫描未完成，结
  论是 unknown，不能 clean pass；
- claim 是否过度解释 trace、event count、object participation 或 graph fact；
- 证据边界是否清楚。

puzzle critic 判断：

- `player_insight` 是否真实；
- `why_not_execution` 是否成立；
- role fit 是否符合玩家模型和本轮 brief；
- 是否达到 brief 的审美目标和相对难度目标；
- routed diagnostics 的解释是否可信。

每次 review 都必须标记它评价的是哪一版材料。`review_N` 只对收到的
`candidate_version_N` 或 `evidence_disagreement_N` 负责，不能替之后的
designer 修改背书。

输出必须包含：

```yaml
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict:
review_loop_state:
required_action:
core_attacks:
noncore_caveats:
questions_for_designer:
```

如果 `required_action` 不是 `none`，`review_loop_state` 不能是
`proposal_ready` 或 `proposal_ready_with_caveats`。

如果 reviewer / critic 攻击 central `player_insight`、`why_not_execution`、证
据支持或 role fit，候选不能进入 `proposal_ready` 或
`proposal_ready_with_caveats`。lead designer 必须选择：

- 结构修改并重跑证据；
- 提交具体证据异议或失败尝试给下一轮 review 判断；
- 降级 / hold；
- reject / change family；
- failed_search。

证据异议只适用于 critic 漏看或误读已有工具证据、反事实或失败尝试。它不适用
于未解决的 `player_insight`、`why_not_execution`、role fit、未授权变体、
lineage/taste 失败；这些问题必须通过结构修改、claim 收窄后进入下一轮 review、
hold、reject 或 change family 处理。

“承认核心 caveat 但仍通过”不是有效动作。

`designer_action_N` 之后如果还想推进候选，必须进入 `review_N+1`。没有后续独
立 review 或人类 review 的 designer action 不能关闭核心攻击，也不能产生
`proposal_ready*`。

## Terminal States

设计循环的 terminal states 不等于 campaign 接受状态。

```text
proposal_ready:
  最新 review iteration 对最新 candidate version 输出 required_action: none，
  且没有未关闭核心攻击。可提交给人类设计师或进入 campaign-level comparison，
  但不是 accepted。

proposal_ready_with_caveats:
  最新 review iteration 对最新 candidate version 输出 required_action: none。
  核心 design_claim 成立，剩余 caveats 不破坏 player_insight、
  why_not_execution、evidence support、role fit，也不是未授权变体问题。

revise_required:
  存在可修复的结构或证据问题。必须回到 design studio loop。

held_proposal:
  有材料价值，但当前不足以作为 proposal_ready。可供人类查看、归档为 held，或
  未来复用。

rejected_candidate:
  design_claim 失败、证据矛盾、role 失败、核心 critic 攻击未解决，或属于
  transform / stitched / relabeled shortcut。

failed_search:
  本轮没有得到 proposal-ready candidate。保留失败分布和有代表性的废案，不要降
  低目标来声称成功。

structural_redesign_needed:
  局部修补耗尽，需要换 causal-chain family 或重写 slot。
```

`accepted`、`mainline`、`positive_reference` 和 `reference` 不是 LLM designer
自有状态。它们只能由人类设计师或显式授权的 campaign selection 过程授予。

## Exploration Log

探索记录是设计记忆，不是质量证明。

当任务要求探索设计空间、比较候选、判断机制是否值得教学、或让 LLM designer 自
主设计时，应记录 attempt log：

```yaml
family_iteration:
  family_id:
  causal_chain_family:
  why_not_archive_variant:
  family_result: continue | enter_review_loop | abandon_family | failed_search

attempt:
  attempt_id:
  family_id:
  hypothesis_family:
  structural_delta:
  intended_player_logic:
  evidence_or_reason:
  self_attack_or_critic_attack:
  outcome: continue | repair | abandon | send_to_review | hold
```

通用流程不规定固定 family 数、variant 数或 reviewer 数。实验 brief 可以给
exploration pressure 或建议覆盖方向，但数量达标不证明质量，数量不足也不自动
证明机制失败。

`family_iteration` 不是 layout variant。移动起终点、缩短走廊、替换一个末端
机制、追加一个小事件、调坐标、或沿用同一对象顺序链，都不能算新的外层 family。
若没有人类明确授权，archive candidate 的变体不能作为新的 family 提交。

有效的 attempt log 应回答：

- 尝试过哪些不同 causal-chain family；
- 哪些失败是工具约束，哪些是设计结构失败；
- 哪些只是 local repair，而不是新 family；
- 为什么某个候选值得进入 review，或为什么本轮应 failed_search。

## Retained Valid Practices

下面这些来自早期有效流程，但现在都通过 routing 使用，不作为默认通过条件：

- analyzer-backed revision：工具证据先于角色声称。
- reuse-strengthen：保留已有好结构，让已有元素获得新的、后续被消费的责任。
- local repair stop：反复局部修补仍产生同一 caveat 时，hold 或 structural
  redesign。
- critic attack / designer action：critic 是攻击者，不是最终裁判；designer
  的 action 必须是动作和证据，并进入下一轮 review 或降级 / reject / change
  family。
- SCC reading：用于读脚本感、分支、多解、bypass 和 opening commitment。
- variant family：用于防止 clone、stitched extension 和重复填槽。
- over-generate then select：campaign 选择时有效，但不属于单关 proposal 通过
  条件。

## What Is Not Solved

- `ruleset -> player_model -> curriculum -> level_specs` 尚未验证为可靠自动流程。
- 工具可以报告证据，但不能自动评价 puzzle quality。
- LLM critic 仍可能误判 taste；人类评语和归档正反例仍是重要审美来源。
- 本标准不能保证 LLM designer 会产出好关。它只能降低伪通过、伪归档和证据漂移。
