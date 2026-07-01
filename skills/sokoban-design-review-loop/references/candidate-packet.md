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

attempt_log:
  serious_structural_attempts:
  local_repairs:
  abandoned_families:

archive_taste_context:
  examples:
  none_found_reason:
```

`archive_taste_context` 由 controller / lead designer 在送 critic 前从本原型 clean archive 中选择。用户可以提供偏好或指定例子，但默认不需要手动指出候选。critic 只消费 packet 中的上下文，不负责自己检索归档。

只允许包含 `human_reviewed: true` 且带有人类评语的 clean archive 条目。没有相关条目时写 `none_found` 和原因。普通实验默认选 0-2 个；challenge / capstone / redesign_stage / 最近发生流程漂移时默认选 1-3 个；最多 4 个。

如果修改 layout、start、goal、win condition、核心机制使用或 `design_claim`，旧证据和旧 critic 结论不得继承。
