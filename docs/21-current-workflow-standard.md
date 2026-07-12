# Current Level Design And Review Standard

Status: active execution contract for level design, review, and archive-facing
proposal states.

本文档定义当前可执行的单关设计与审查协议。SCC、variant、taste 和
prototype-specific redesign 由 routing 按需触发。

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
  检查工具证据是否支持设计说明中的机械前提、机制范围和硬声明。

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
    若证据或玩家推理失败，局部修改或放弃该 family

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

pre_submission_check:
  运行被 routing 触发且声明为提交给人类查看或加入待玩列表前执行的
  原型专属最小清理。通常在review loop 之外完成，如清理未改变胜利实例，不需要完成后重复本阶段或重跑review流程，仅重跑必要证据验证核心逻辑不变即可。

human_handoff / playable_queue:
  人类接收的是 exact candidate_version。proposal_ready 表示 agent 已经对
  当前版本的核心玩家读法、证据边界和 role fit 负责；人类反馈是所有权移交后的
  外部判断，不是 agent review loop 的缺失验证步骤。

post_handoff_feedback_routing:
  ready_for_archive -> archive pass
  needs_revision -> 新 candidate_version，回到 design / review / pre_submission_check
  reject -> rejected_candidate 或移出待玩列表
  hold -> held_proposal

archive pass:
  只记录已经被人类游玩认可的 exact candidate_version；不得升级状态，
  也不得做布局、起点、目标、对象或胜利实例变更
```

所有会改变 solve instance 的最小清理必须发生在人类 handoff / 加入待玩列表前。
handoff 之后若人类反馈要求清理、压缩或修补，结果是新版候选，并重新进入
design / review / pre_submission_check；不能在 archive pass 中黑盒改动后直接归档。

`designer_action_N` 永远不能关闭 review loop。阻塞性 critic item 只能由后续
`review_N+1`、更晚的独立 review，或人类明确接收当前风险并接管所有权来关闭。
designer 若认为 critic 漏读证据，只能提交 `evidence_disagreement` 给下一轮
review；这不是提交给人类的最终材料。

critic 之后没有“继续下一个阶段”。`review_N` 之后只有这些动作：

- 修改结构 / 玩家推理 / 起点 / 机制范围，并重跑必要证据，进入 `review_N+1`；
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
  target:
  difficulty_expectation:

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

simple_level_design: # difficulty_score_target 1-2 only
  player_goal:
    description:
    state_ref:
  canonical_operation:
    from_state_ref:
    exact_inputs: []
    to_state_ref:
  mechanism_feedback:
    visible_change:
    state_ref:
  completion_feedback:
    visible_change:
    state_ref:

player_reasoning: # difficulty_score_target 3+ only
  canonical_trace_ref:
  player_goal:
    description:
    state_ref:
  reasoning_units:
    - id:
      player_question:
      premises:
        - statement:
          state_ref:
      conclusion:
      operation_refs: []
      alternative:
        status: replayed_attempt | unresolved | not_claimed
        description:
        local_gain:
        from_state_ref:
        exact_inputs: []
        result_state_ref:
        concrete_outcome:
      feedback:
        - state_ref:
          visible_change:
  operation_segments:
    - id:
      step_range:
      exact_inputs: []
      purpose:
      supports_reasoning_units: []
  resolution:
    resolves: []
    operation_refs: []
    final_state_ref:
    visible_confirmation:
  trace_partition:
    status: complete | incomplete
    ordered_segment_ids: []
    uncovered_steps: []
    overlapping_steps: []

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

solution_uniqueness:
  result: unique_complete | unique_within_budget | equivalent_variants_only
  evidence_refs: []

hard_fact_summary_for_critic:
  solver:
  required_or_forbidden_events:
  routed_diagnostic_facts:
  calibrated_trace_metrics: # required, puzzle_critic_only
  evidence_limits:
  artifact_refs:

diagnostic_routing:
  activated:
  not_applicable:
  unknown_or_unavailable:

attempt_log:
  serious_structural_attempts:
  local_repairs:
  abandoned_families:

claim_last_review:
  mode: sequential_single_call | not_used
  facts_packet:
  claim_packet:
  read_order: facts_then_claim | not_applicable
```

使用 brief 中预先声明的 `difficulty_score_target` 分流：目标难度 1-2 填写
`simple_level_design`；目标难度 3+ 填写 `player_reasoning`。审美校准与难度分流独立。

目标难度 3+ 在确定 layout、运行 miner 或脚本搜索前，先写可随设计更新的
`reasoning_sketch`：`player_goal`、`intended_question`、
`visible_premises`、`intended_conclusion`、`planned_mechanic_sequence` 和
`intended_feedback`。取得 exact trace 后再生成正式设计字段。

reasoning unit 的数量由关卡的实际逻辑决定。`operation_segments` 覆盖 canonical
trace 的全部操作并说明每段目的。`resolution` 引用已有 operation segments，
`trace_partition` 记录覆盖结果。

`replayed_attempt` 从 `from_state_ref` 实际尝试非空的 `exact_inputs`，最后一个输入可以非法；`result_state_ref` 指向尝试结束后的游戏状态。`concrete_outcome` 简要写最后一项输入发生了什么，以及结果局面中哪项具体后续操作已经可行、不可行或失去条件。写不出可尝试序列的空间事实进入 `premises`，或使用 `not_claimed`。`premises` 使用问题发生时玩家已能看到的关系；尝试后的局面进入 `concrete_outcome`，正解后的变化进入 `feedback`。完整图与 all-win 结论继续放在 evidence。

`solution_uniqueness` 是 designer 进入 evidence review 前的送审资格，不是要求
reviewer 代为搜索解空间。`unique_complete` 表示完整搜索只留下一个玩家逻辑类；
`unique_within_budget` 表示搜索运行到声明预算且没有发现非等价胜解；
`equivalent_variants_only` 表示已发现的多条原始路线有证据证明差异只来自纯走位、
完整回返环、真实对称重标号或相互独立必要步骤的换序，并保持相同对象职责、目标
分配和因果顺序。serious candidate packet 只能填写这三个值。

`hard_fact_summary_for_critic` 只给 critic 提供精简事实索引和 artifact refs；
完整 solver / graph / probe 数据仍由 evidence reviewer 审查。`claim_last_review`
是与难度无关的可选 critic 路由，默认 `not_used`；启用时先读 facts packet，
再读包含 `simple_level_design` 或 `player_reasoning` 的 claim packet。

`calibrated_trace_metrics` 是送审包必填的 critic-only 区块，不属于 `evidence`，
evidence reviewer 不审查它。designer 必须将当前 exact candidate 的
`analysis.solution.traceMetrics.calibrated` 原样写入，不得自行重算或省略。若原型
校准状态为 `unavailable`，该字段只含状态与原因。它不能证明玩家推理的设计价值、玩家
洞见、因果依赖、反直觉或整体审美。

## Design Studio Loop

lead designer 在 review 前必须自己完成设计和证据读取：

1. 按目标难度写工作用起始材料：1-2 记玩家目标与预期机制操作；3+ 写 `reasoning_sketch`，不要只写事件序列。
2. 设计 layout，并声明求解实例。
3. 运行 solver / analyzer / evaluator 中本轮允许的工具。
4. 读 trace、事件、对象参与、图事实、反事实和工具边界。
   需要描述或模拟一段具体玩家操作、备选尝试或失败路线及其局面结果时，优先使用
   handoff 中的输入序列 replay 工具，取得 exact inputs、逐步状态和最终局面。
5. 取得 exact trace 后写正式设计字段；难度 3+ 用 operation segments 覆盖全部操作，
   并用 reasoning units 写玩家问题、当时可见前提、推断、alternative、反馈与解决。
6. 完成 diagnostic routing。
7. 若证据不支持设计字段中的机械前提，或玩家推理无法支撑本轮设计，修正、
   降级、放弃或换 family。若工具找到绕过设计预期的胜路，先看预期解比旁路多
   做出了什么；快速检索本轮已授权的设计语料，有结构能利用这个差异就复用或
   改造，没有则围绕这个差异自行设计。当前布局装不下时可以插入行列或平移局
   部，不能把固定尺寸内加墙失败或语料中没有现成条目当作 family 不可行。只有
   加入所需限制后核心读法被明显淹没时，才放弃或换 family。
8. 取得 exact trace 后完成 `solution_uniqueness` 自查。发现任一非等价胜解，或发现
   多条路线但不能证明只是上述等价差异时，立即留在 Design Studio 修订；一个 exact
   反例已经足够，不需要继续枚举全部 bypass。路线更长、更难自然发现或只影响更高
   审美目标，都不能把 bypass 降级为可送审 caveat。
9. 只有 evidence-supported、玩家侧读法可被攻击，且 `solution_uniqueness.result`
   为 `unique_complete`、`unique_within_budget` 或 `equivalent_variants_only` 的
   candidate 才能组装 serious candidate packet 并进入 review loop。

填写后 designer 快速判断玩家是否真的会遇到所述问题、alternative 是否具有局部收益、
最终反馈是否值得成为主要内容。

如果修改了 layout、起点、终点、胜利条件、核心机制使用或玩家推理内容，旧证据
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
  design_evidence_alignment:
    status: required
    reason: design-field mechanical premises and hard claims must not exceed evidence
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
    kind: diagnostic | redesign_stage | paired_design_mode | pre_submission_check | post_handoff_feedback_routing | not_applicable | unknown
    status: triggered | not_applicable | unavailable | unknown
    reason:
```

### Always Required Diagnostics

`hard_evidence`、`mechanism_scope` 和 `design_evidence_alignment` 对 serious candidate 必
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

- `player_reasoning`: 玩家问题是否在行动前真实存在，可见前提是否支持计划推断？
- `state_consumption`: 声称的状态变化在哪里被后续消费？
- `alternative_and_feedback`: replayed attempt 是否是玩家可能采用的输入、有局部收益，并产生所述具体局面；正解反馈是否对玩家可见？
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

原型专属工作按阶段声明，不进入通用流程的隐藏 checklist：

```text
diagnostic:
  对候选做额外检查或证据读取。

pre_submission_check:
  已确定候选骨架后、加入待玩列表或提交给人类查看前执行的最小布局清理或一致性检查。
  它可以改变 layout / start / targets / objects。完成后必须重跑受影响的必要证据；
  若核心玩家推理、胜利结构、机制依赖或 bypass 结论发生改变，则转为实质修订，
  产出新的 candidate_version 并回到 design / review；否则保持原 review_loop_state，
  不重复独立 review。

redesign_stage:
  基于一个已经有价值的 base candidate 做二次设计、优化或变体提案。

paired_design_mode:
  由原型文档或 experiment brief 显式启用，同时设计和审查一组互相关联的
  solve instances；它不是默认流程。

post_handoff_feedback_routing:
  人类 handoff 之后根据反馈决定归档、修订、删除或搁置。若处理反馈需要改变
  solve instance，结果是新版候选，必须重新经过 review 和 pre_submission_check；若为明确的微调，可以直接修改并验证是否解结构改变，如未变化可以跳过 review。
```

`pre_submission_check` 都是微调结构，通常只需标记完成，不需要再次review。

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

弱 base candidate 不能靠 redesign stage 挽救。若 base 的核心玩家推理、证
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

所有难度都使用 evidence reviewer 和 puzzle critic。难度分流只改变设计字段的复杂度；
`claim_last_review` 独立决定 critic 是否使用两段读取。

evidence reviewer 判断：

- `solution_uniqueness.result` 是否严格属于三个合法送审值；
- 该结果是否与 packet 引用的完整图、预算搜索、换序等价证据或已知 exact bypass
  明显冲突；reviewer 不替 designer 重跑工具、枚举解族或继续寻找更多 bypass；
- 工具证据是否支持设计字段中的机械前提；
- 工具证据是否支持声明的 `claimed_core_events`；
- 是否把 winning-path gate 与 reachable exposure gate 区分清楚；
- `forbidden_if_seen_anywhere` 是否在完整可达事件扫描中命中；若扫描未完成，结
  论是 unknown，不能 clean pass；
- 设计说明或机制声明是否过度解释 trace、event count、object participation 或 graph fact；
- 证据边界是否清楚。

若 reviewer 因 `solution_uniqueness` 非法或与证据冲突而把它写入
`unsupported_or_overclaimed`，当前 candidate version 必须回到 Design Studio，
controller 不得继续把同一版发送给 puzzle critic。该问题不能用
`supports_with_caveats`、`unknown`、路线长度或试玩观察豁免。

puzzle critic 判断：

- `player_goal` 是玩家目标还是解法命名，`player_question` 是否在行动前真实存在，还是可靠局部执行、唯一显然动作或最近 affordance 取胜；
- `premises` 是否当时可见，`conclusion` 是否增加计划理由，operation refs、replayed attempt、具体结果局面、feedback 和 resolution 是否兑现所述逻辑；
- 每个 reasoning unit 的 `replayed_attempt` 是否是玩家会认真考虑的路线，失败条件是否在玩家投入明显执行之前及时显现；同一决策状态若存在多条同样自然的失败方向，即使每条很短，玩家是否仍能依据共同的可见关系快速剪枝，而不是逐项尝试排除；
- `language_drift` 是否发现新造名词没有增加具体玩家判断；
- 难度是否来自玩家可分析的结构因果，而不是长度、重复、走廊、显然动作或噪声；
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
review_input_type: candidate_version | evidence_disagreement | revised_design | other
verdict:
review_loop_state:
required_action:
review_method:
  difficulty_route: simple_level | reasoning_level
  claim_last_used: true | false
  read_order_ok: true | false | not_applicable
  claim_read_after_independent_reading: true | false | not_applicable
independent_reading:
  status: completed | not_applicable
  player_goal_seen:
  salient_relations_seen:
  unclear_or_unreadable_parts:
  initial_quality_risks:
player_facing_merits:
supported_reasoning:
  - unit_ref:
    reason:
language_drift:
  obvious_overpackaging: true | false
  examples:
    - target_ref:
      packaged_phrase:
      concrete_restatement:
      why_no_information_was_added:
  required_action: revise_claim_and_rereview | none
critic_items:
  - id:
    type: core_blocker | context_gap | nonblocking_risk | improvement_opportunity | score_boundary | diagnostic_note
    target_ref:
    attack:
    player_facing_effect:
    evidence_basis:
    blocks_proposal_ready: true | false
    expected_designer_response:
diagnostic_interpretations:
handoff_notes:
```

如果 `required_action` 不是 `none`，`review_loop_state` 不能是
`proposal_ready` 或 `proposal_ready_with_caveats`。

critic 输出统一使用 `critic_items`。每个 item 都必须说明它是阻塞项、上下文缺口、
非阻塞风险、优化机会、分数边界还是诊断记录。若存在 `blocks_proposal_ready: true`
的 item，`required_action` 不能是 `none`。

启用 `claim_last_review` 时，facts packet 提供布局、trace、硬事实、诊断边界和
archive taste context；critic 先写简短 `independent_reading`，再读 claim packet
完成主评审和最终 verdict。未启用时直接读取完整 candidate packet。

如果 `language_drift.obvious_overpackaging: true`，critic 必须同时生成一个阻塞性
`critic_item`，`language_drift.required_action` 必须为 `revise_claim_and_rereview`，顶层
`required_action` 不能是 `none`，`review_loop_state` 不能是 `proposal_ready` 或
`proposal_ready_with_caveats`。重写后必须进入下一轮 critic review。

核心玩家推理、role fit 和玩家侧逻辑在当前 review 中路由：当前可判断
时写当前判断；当前材料不足时写 `context_gap`；只是主观手感风险时写
`nonblocking_risk` 或 `handoff_notes`。

如果 reviewer / critic 攻击 central 玩家推理、证据支持或 role fit，或 critic item
标记 `blocks_proposal_ready: true`，候选不能
进入 `proposal_ready` 或 `proposal_ready_with_caveats`。lead designer 必须选择：

- 结构修改并重跑证据；
- 提交具体证据异议或失败尝试给下一轮 review 判断；
- 降级 / hold；
- reject / change family；
- failed_search。

证据异议只适用于 critic 漏看或误读已有工具证据、反事实或失败尝试。它不适用
于未解决的玩家推理、role fit、未授权变体、lineage/taste 失败；这些问题必须通过
结构修改、设计说明收窄后进入下一轮 review、
hold、reject 或 change family 处理。

“承认核心 caveat 但仍通过”不是有效动作。designer 不必须接受 critic 的每个判断，
但必须对每个 critic item 做 triage：修改、引用 packet 回答、下一轮补上下文、
接受为非阻塞、说明拒绝理由、降级 / hold 或换 family。

`designer_action_N` 之后如果还想推进候选，必须进入 `review_N+1`。没有后续独
立 review，或没有人类明确接收当前风险并接管所有权的 designer action，不能关闭
阻塞性 critic item，也不能产生 `proposal_ready*`。

## Terminal States

设计循环的 terminal states 不等于 campaign 接受状态。

```text
proposal_ready:
  最新 review iteration 对最新 candidate version 输出 required_action: none，
  且没有 `blocks_proposal_ready: true` 的未处理 critic item。它表示 agent 已经
  基于当前证据和玩家侧读图判断，对 exact candidate version 作为成品候选负责。
  可进入待玩列表、提交给人类设计师或进入 campaign-level comparison，但不是
  accepted，也不是 clean_archive。

proposal_ready_with_caveats:
  最新 review iteration 对最新 candidate version 输出 required_action: none。
  核心玩家推理成立，剩余 caveats 不破坏玩家侧逻辑、
  evidence support、role fit，也不是未授权变体问题。若进入
  待玩列表，非阻塞 `critic_items` 和 handoff notes 必须随 candidate packet 保留。

revise_required:
  存在可修复的结构或证据问题。必须回到 design studio loop。

held_proposal:
  有材料价值，但当前不足以作为 proposal_ready。可供人类查看、归档为 held，或
  未来复用。

rejected_candidate:
  玩家推理失败、证据矛盾、role 失败、核心 critic 攻击未解决，或属于
  transform / stitched / relabeled shortcut。

failed_search:
  本轮没有得到 proposal-ready candidate。保留失败分布和有代表性的废案，不要降
  低目标来声称成功。

structural_redesign_needed:
  局部修补耗尽，需要换 causal-chain family 或重写 slot。
```

`accepted`、`mainline`、`positive_reference` 和 `reference` 不是 LLM designer
自有状态。它们只能由人类设计师或显式授权的 campaign selection 过程授予。

## Human Handoff And Archive Routing

待玩列表 / 人类查看是 ownership handoff。进入这个阶段的 exact candidate
version 应已经由 agent 完成当前证据、玩家侧读图和 role fit 判断；核心 critic
问题在 handoff 前通过当前判断、补上下文后重审、降级 / hold、reject 或 change
family 处理。

进入待玩列表或提交给人类查看前，必须完成当前原型声明为
`pre_submission_check` 的最小清理；未触发或不适用的流程只记录 routing 结论，
不要求把原型专属细节写进每次通用 review 材料。

人类反馈只作用于被游玩的 exact candidate_version：

```text
ready_for_archive:
  归档同一版。archive pass 只记录流程、证据和人类评语，不再改变布局。

needs_revision:
  修改后生成新 candidate_version，回到 design / review / pre_submission_check，
  再重新加入待玩列表。

reject:
  从待玩列表移除，并记录为 rejected_candidate 或失败尝试。

hold:
  保留材料价值，但不进入 clean_archive。
```

如果 `ready_for_archive` 之后仍想删目标、裁冗余空间、改起点、改对象或调整胜利
实例，这不是 archive pass，而是 `needs_revision`。

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

- 工具可以报告证据，但不能自动评价 puzzle quality。
- LLM critic 仍可能误判 taste；人类评语和归档正反例仍是重要审美来源。
- 本标准不能保证 LLM designer 会产出好关。它只能降低伪通过、伪归档和证据漂移。
