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

hard_fact_summary_for_critic:
  solver:
  required_or_forbidden_events:
  routed_diagnostic_facts:
  calibrated_trace_metrics: # exact copy of analysis.solution.traceMetrics.calibrated
  evidence_limits:
  artifact_refs:

player_facing_reading:
  opening_read:
  intended_solution_read:
  commitment_points:
  state_responsibility:
  payoff_and_resolution:

diagnostic_routing:
  hard_evidence:
  mechanism_scope:
  claim_hygiene:
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

## Critic-Facing Reading

`hard_fact_summary_for_critic` 是 critic 的事实索引，不替代完整 evidence。完整 solver / graph / probe / trace 数据仍由 evidence reviewer 审查；critic 只使用精简事实、证据边界和 artifact refs，并把事实落到玩家侧读图。

`calibrated_trace_metrics` 必填，且只能原样复制当前 exact candidate 的
`analysis.solution.traceMetrics.calibrated`。它不属于 evidence；`unavailable` 时只保留
状态与原因，`pilot` / `active` 时由 analyzer 给出短指标块。designer 不得自行重算、
省略或调用临时摘要脚本。

`player_facing_reading` 是 critic 主输入：

- `opening_read`: 开局全视野下玩家看到的矛盾、资源、边界和目标压力。
- `intended_solution_read`: 正解关键动作在玩家侧为什么成立，不只列事件名。
- `commitment_points`: 不可逆提交前玩家能比较什么，提交后得到什么反馈。
- `state_responsibility`: 对象或状态何时被创建、转化、欠债、消费、回收。
- `payoff_and_resolution`: 终局如何兑现前面的读法，或哪些 payoff 只应降级为 caveat。

`player_facing_reading` 是玩家侧读图材料：它服务于当前候选声称的玩家体验，连接全视野局面、正解流程、状态责任和终局后果，而不是扩展成固定 checklist。

## Prototype-Specific Boundary

`prototype_specific_contracts.interface_pair_policy` 只在原型 handoff、原型文档或本轮 brief 明确声明时填写。critic / reviewer 必须服从 ignored / risky pair classes；没有声明时不得从通用流程发明风险。

## Archive Taste Context

`archive_taste_context` 由 controller / lead designer 在送 critic 前从本原型 clean human-reviewed archive 中选择。用户可以提供偏好或指定例子，但默认不需要手动指出候选。critic 可以主动读取更多 clean human-reviewed archive 条目或 index / retrieval summary 来增强攻击性；不得用未归档 / 未完成材料做正向审美、难度或分数校准。

只允许包含 `human_reviewed: true` 且带有人类评语的 clean archive 条目。anchors 必须包含至少 1 个目标正例或高分例，以及至少 1 个相关低分、失败、下界或人类明确不满意的例子；若相关低分 / 失败例不存在，写 `negative_anchor_none_found` 和原因。没有相关条目时写 `none_found` 和原因。普通目标默认选 2-3 个；challenge / capstone / redesign_stage / 最近发生流程漂移 / 高分目标默认选 3-4 个；最多 4 个。

没有可用 human archive anchors 时，packet 必须把审美 / 难度分数结论标为不可用：`score_claim_allowed: false`，并要求 critic 使用 `unscored_missing_human_archive_context` 或 `target_fit_unknown`，不能写 `4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 等分数化判断。

选择 archive taste context 不授权从旧题开始改。若候选继承 archive candidate 的主要玩家侧因果链、对象角色或布局骨架，且没有明确授权，应 reject / hold / change family，不能进入 proposal_ready。

## Claim-Last Review

`claim_last_review` 是可选 critic 防污染路由。使用时，优先把事实与声称分为两个物理文件：`facts_packet` 只包含规则、布局、接口、解序列事实、事件 / 对象证据、可达性、routed diagnostic facts、evidence limits、artifact refs、`player_facing_reading` 和 archive taste context；`claim_packet` 包含 `player_insight`、`causal_chain`、`why_not_execution`、`falsification` 和 target role notes。

分段的目的只是让 critic 先完成独立玩家侧评审，再读设计声称。不要要求 line count 或长审计表。

如果修改 layout、start、goal、win condition、核心机制使用或 `design_claim`，旧证据和旧 critic 结论不得继承。
