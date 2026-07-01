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
  known_before:
  target:
  difficulty_or_support_expectation:

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
```

`prototype_specific_contracts.interface_pair_policy` 只在原型 handoff、原型文档或本轮 brief 明确声明时填写。critic / reviewer 必须服从 ignored / risky pair classes；没有声明时不得从通用流程发明 pair-policy 风险。

`archive_taste_context` 由 controller / lead designer 在送 critic 前从本原型 clean archive 中选择。用户可以提供偏好或指定例子，但默认不需要手动指出候选。critic 只消费 packet 中的上下文，不负责自己检索归档。

只允许包含 `human_reviewed: true` 且带有人类评语的 clean archive 条目。没有相关条目时写 `none_found` 和原因。普通实验默认选 0-2 个；challenge / capstone / redesign_stage / 最近发生流程漂移时默认选 1-3 个；最多 4 个。

没有可用 human archive anchors 时，packet 必须把审美 / 难度分数结论标为不可用：`score_claim_allowed: false`，并要求 critic 使用 `unscored_missing_human_archive_context` 或 `target_fit_unknown`，不能写 `4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 等分数化判断。

选择 archive taste context 不授权从旧题开始改。若候选继承 archive candidate 的主要玩家侧因果链、对象角色或布局骨架，且没有明确授权，应 reject / hold / change family，不能进入 proposal_ready。

如果修改 layout、start、goal、win condition、核心机制使用或 `design_claim`，旧证据和旧 critic 结论不得继承。
