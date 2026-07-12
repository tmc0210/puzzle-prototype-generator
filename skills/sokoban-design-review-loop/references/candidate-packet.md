# Candidate Packet Reference

给 reviewer / critic 的输入必须是 packet，不是自由讨论材料。serious candidate 至少包含：

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
  mechanic_window:
  allowed_exposure_through:
  claimed_core_events:
  latest_exposure_timing_check:
    derived_latest_event_stage:
    claimed_latest_exposed_event:
    all_solution_required_evidence_ref:
    canonical_occurrences:
      - step:
        operation_segment_ref:
        reasoning_unit_refs: []
    status: later_phase_present | required_but_frontloaded | not_applicable_single_reasoning_phase
    revision_direction:

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
    exact_inputs: [input_1] # 必须非空
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
        exact_inputs: [input_1] # status 为 replayed_attempt 时必须非空
        result_state_ref:
        concrete_outcome:
      feedback:
        - state_ref:
          visible_change:
  operation_segments:
    - id:
      step_range:
      exact_inputs: [input_1] # 每个 operation segment 必须非空
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
  calibrated_trace_metrics: # exact copy of analysis.solution.traceMetrics.calibrated
  evidence_limits:
  artifact_refs:

diagnostic_routing:
  hard_evidence:
  mechanism_scope:
  design_evidence_alignment:
  taste_probes:
  scc_graph:
  variant_family:
  start_position:
  prototype_specific_work:

prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by:
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh | related_to:<id> | refined_from:<id> | strengthened_from:<id> | transform_clone | stitched_extension | unknown
  why_not_archive_variant:

attempt_log:
  serious_structural_attempts:
  local_repairs:
  abandoned_families:

archive_taste_context:
  examples:
  none_found_reason:

claim_last_review:
  mode: sequential_single_call | not_used
  facts_packet:
  claim_packet:
  read_order: facts_then_claim | not_applicable

```

`solution_uniqueness` 是送审资格。serious candidate packet 只允许上述三个结果；
发现非等价胜解、多路线尚未证明等价、必要搜索未完成或证据不可用时，designer
必须留在 Design Studio 自查与修订，不得把阻塞状态、自造值或 `unknown` 写进 packet。
一个 exact 非等价胜解已经足够触发修订，不要求为了送审继续枚举其它 bypass。

`latest_exposure_timing_check.canonical_occurrences` 必须列出 claimed latest exposed event 在 canonical optimal trace 中的全部 occurrence，不能只选后期 occurrence。多 reasoning unit 的 serious candidate packet 只允许 `status: later_phase_present`；真正单 reasoning unit 使用 `not_applicable_single_reasoning_phase`。`required_but_frontloaded` 只能记录在 working note / attempt log，designer 必须留在 Design Studio 修订，不得送审。`revision_direction` 只说明怎样调整该事件与实际 reasoning phases 的时序，使它在第二个或更后的 reasoning phase 中发生；在现有解末尾补无关触发、在前序拼接无关子题，或仅拆分、合并、改名 RU，均不改变该字段的 `required_but_frontloaded` 结论。Evidence reviewer 独立派生 latest stage / event、复核 all-solution required evidence、occurrence steps 与 RU 映射，不采信 designer 自填结论。

## Difficulty And Design Fields

使用 brief 中预先声明的 `difficulty_score_target` 选路，不使用 designer 完成后的自评分：

- 目标难度 1-2 填写 `simple_level_design`，记录玩家目标、规范操作、机制反馈和完成反馈。
- 目标难度 3+ 填写 `player_reasoning`，用 reasoning units 记录玩家的问题、可见前提、推断、alternative 和反馈。
- 两条难度路线都经过 evidence reviewer 和 puzzle critic。
- 目标难度从 1-2 提升到 3+ 时，补齐 `player_reasoning` 并重新送审。
- 审美校准与难度分流独立。

目标难度 3+ 在确定 layout、运行 miner 或脚本搜索前，先写可随设计更新的工作用 `reasoning_sketch`：

```yaml
reasoning_sketch:
  player_goal:
  intended_question:
  visible_premises:
  intended_conclusion:
  planned_mechanic_sequence:
  intended_feedback:
```

`reasoning_sketch` 以及后续 `simple_level_design` / `player_reasoning` 默认按以下顺序写：玩家当时看见的对象与位置 -> 实际执行的操作 -> 操作后棋盘具体哪里改变 -> 因此新增、失去或必须改序的后续操作。结构简称只用于压缩已经写清的具体关系；第一次出现时必须能让读者大致画出局部形状或预测操作变化，不能代替具体说明。

取得 exact trace 后填写 `player_reasoning`。reasoning unit 的数量由关卡的实际逻辑决定；`operation_segments` 覆盖 canonical trace 的全部输入并说明每段目的。`resolution` 引用已有 operation segments，`trace_partition` 记录覆盖结果。

`alternative.status: replayed_attempt` 表示 designer 已从 `from_state_ref` 实际尝试非空的 `exact_inputs`；最后一个输入可以非法，`result_state_ref` 指向尝试结束后的游戏状态。`concrete_outcome` 简要说明最后一项输入发生了什么，以及结果局面中哪项具体后续操作已经可行、不可行或失去条件。写不出可尝试的输入序列时，将相关空间事实写入 `premises`，或使用 `not_claimed`。

`premises` 使用问题发生时玩家已经能看到的对象、占格和路线关系；尝试后的局面写入 `concrete_outcome`，正解动作后的变化写入 `feedback`。完整图、all-win probe 和其它全局结论继续放在 `evidence`，不代替玩家看到的局面结果。

填完后 designer 快速判断玩家是否真的会遇到所述问题、alternative 是否具有局部收益、最终反馈是否值得成为主要内容。

## Critic-Facing Design Fields

`hard_fact_summary_for_critic` 是 critic 第二阶段的事实索引，不替代完整 evidence。完整 solver / graph / probe / trace 数据仍由 evidence reviewer 审查；critic 只使用精简事实、证据边界和 artifact refs，并把事实落到玩家侧读图。

`calibrated_trace_metrics` 必填，且只能原样复制当前 exact candidate 的
`analysis.solution.traceMetrics.calibrated`。它不属于 evidence；`unavailable` 时只保留
状态与原因，`pilot` / `active` 时由 analyzer 给出短指标块。designer 不得自行重算、
省略或调用临时摘要脚本。

`simple_level_design` 表达目标、操作、机制反馈和完成反馈。唯一自然行动路线可以是难度 1 教学清晰度优点。

`player_reasoning` 是 reasoning-level critic 第二阶段的玩家侧主输入。`player_question -> premises -> conclusion` 说明玩家在对应状态需要判断什么、根据哪些可见事实得出什么计划；具体输入由 `operation_segments` 记录。需要声称备选尝试及其失败结果时使用 `replayed_attempt`；尚未确认或不主张时使用 `unresolved` 或 `not_claimed`。

## Critic Raw Packet

完整 candidate packet 仍按原流程交给 evidence reviewer，并在 critic 第二阶段使用。evidence reviewer 通过后，controller 为 critic 第一阶段另写一份物理隔离的 `critic_raw_packet`：

```yaml
review_attempt_id:
candidate_version:

prototype_rules:
  confirmed_rules:
  win_condition:
  object_and_event_semantics:

solve_instance:
  layout:
  player_start:
  win_condition:

canonical_solution:
  exact_inputs: [input_1] # 必须非空；完整、逐项、保持原始顺序
  mechanically_derived_trace:
    - step:
      input:
      before_state_ref:
      event:
      after_state_ref:
      visible_board_change:

archive_taste_calibration:
  examples:
    - archive_id:
      human_aesthetic_score:
      human_difficulty_score:
      human_comments:
```

`critic_raw_packet` 的第一阶段使用白名单而不是删减黑名单。除上述字段外不加入其它候选材料，尤其不得加入：

- `design_target`、目标分数、role notes；
- `simple_level_design`、`player_reasoning`、reasoning units、alternative；
- designer 的亮点、反转句、设计成本解释、claim 或构造过程；
- evidence reviewer 结论、旧 critic、designer action、修改说明或 controller summary；
- trace metrics、graph 评价、SCC 评价、难度推断或其它派生质量叙述。

`mechanically_derived_trace` 只能从同一份非空 `exact_inputs` replay 得到，记录输入前后状态、实际事件和可见棋盘变化，不解释它“为什么精彩”或“证明了什么设计”。若 replay / state refs 不可用，不得用 designer 摘要补写；当前版本不能送 critic。

每次重新送审都新建 `critic_raw_packet` 和唯一 `review_attempt_id`，并交给另一个 `fork_turns="none"` 的 fresh critic。第一阶段 `independent_reading` 落盘后，controller 才能在同一 critic session 的 follow-up 中提供第二阶段材料；旧 critic 输出、旧送审包和版本差异不得进入第一阶段。

## Prototype-Specific Boundary

`prototype_specific_contracts.interface_pair_policy` 只在原型 handoff、原型文档或本轮 brief 明确声明时填写。critic / reviewer 必须服从 ignored / risky pair classes；没有声明时不得从通用流程发明风险。

## Archive Taste Context

`archive_taste_context` 由 controller / lead designer 在送 critic 前从本原型 clean human-reviewed archive 中选择。用户可以提供偏好或指定例子，但默认不需要手动指出候选。选定后将人类评分与原评语复制进 `critic_raw_packet`；第一阶段只使用这组固定 anchors。第二阶段 critic 可以按原流程主动读取更多 clean human-reviewed archive 条目或 index / retrieval summary 来增强攻击性；不得用未归档 / 未完成材料做正向审美、难度或分数校准。

只允许包含 `human_reviewed: true` 且带有人类评语的 clean archive 条目。anchors 必须包含至少 1 个目标正例或高分例，以及至少 1 个相关低分、失败、下界或人类明确不满意的例子；若相关低分 / 失败例不存在，写 `negative_anchor_none_found` 和原因。没有相关条目时写 `none_found` 和原因。普通目标默认选 2-3 个；challenge / capstone / redesign_stage / 最近发生流程漂移 / 高分目标默认选 3-4 个；最多 4 个。

没有可用 human archive anchors 时，packet 必须把审美 / 难度分数结论标为不可用：`score_claim_allowed: false`，并要求 critic 使用 `unscored_missing_human_archive_context` 或 `target_fit_unknown`，不能写 `4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 等分数化判断。

选择 archive taste context 不授权从旧题开始改。若候选继承 archive candidate 的主要玩家侧因果链、对象角色或布局骨架，且没有明确授权，应 reject / hold / change family，不能进入 proposal_ready。

## Claim-Last Review

`claim_last_review` 保留原有语义，并位于 mandatory raw-first 之后。第一阶段 critic 只读 `critic_raw_packet` 并落盘 `independent_reading`。第二阶段若启用 claim-last，继续使用两个物理文件：`facts_packet` 包含规则、布局、接口、解序列事实、事件 / 对象证据、可达性、routed diagnostic facts、evidence limits、artifact refs、calibrated trace metrics 和 archive taste context；`claim_packet` 包含 `simple_level_design` 或 `player_reasoning`、target role notes 和相关 mechanism-scope claims。

未启用 claim-last 时，第二阶段直接读取完整 candidate packet。无论哪条路由，最终 verdict / state / action 可以维持或严于第一阶段 `independent_reading.initial_*`，不得因 designer claim 变得更宽松。
