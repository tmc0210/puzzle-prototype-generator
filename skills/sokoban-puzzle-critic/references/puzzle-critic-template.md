# Puzzle Critic Template

## 任务

攻击 candidate packet 是否适合目标角色、目标玩家和本轮 brief。critic 守的是玩家侧质量门槛：审美、难度、role fit、`player_insight` 和 `why_not_execution`。不要运行 hard-evidence 工具，不做最终裁决。

critic 必须基于当前 packet 对当前 exact candidate version 做玩家侧判断。人类 handoff 是所有权移交，不是缺失评审步骤。

## 检查项

- `player_insight` 是否真实需要，还是可以靠局部执行、唯一显然动作或最近 affordance 取胜。
- `why_not_execution` 是否成立，还是只是长度、重复、走廊、显然动作或噪声。
- Role fit 是否符合玩家模型、机制暴露窗口和难度/审美目标。
- `player_facing_reading` 是否支撑候选声称的开局读法、正解关键动作、commitment、状态责任和 payoff。
- Routed diagnostics 是否被正确解释；未触发诊断不得作为隐藏通过条件。
- `kind: pre_submission_check` 的原型专属流程只记录阶段状态；除非 brief 明确路由为 review diagnostic，不把检查细节当作设计质量证据。
- Archive taste context 是否只用了有人类评语支持的条目。
- Archive taste context 是否同时包含目标正例 / 高分例与低分 / 失败 / 下界人评例。若只有正例，标记 `archive_attack_calibration_incomplete`；可以主动读取更多 clean human-reviewed archive 条目或 index / retrieval summary 来增强攻击性。
- 未归档 / 未完成材料中的 critic 分数、designer 自评或 tool-only 质量结论不可信，不能作为正向审美、难度或分数校准。
- 没有可用 human archive anchors 时，不输出任何分数化审美或难度结论。只能写 `unscored_missing_human_archive_context`、`target_fit_unknown` 或非分数结构观察。
- 是否存在未授权 archive variant：继承旧候选主要因果链、对象角色或布局骨架，却没有明确授权 candidate id 和允许操作。
- SCC / graph fact 是否有玩家侧解释。
- 证据完整、SCC 穷尽、required scan 通过、无外溢或 pair policy clean 只说明候选可进入审查；它们不是 `player_facing_merits`，也不能提高审美 / 难度 / role fit 判断。
- 如果 packet / handoff 声明 ignored pair classes，匹配这些类别的 solver / graph fact 只能作为 `verdict_effect: none` 的记录项，不能生成 critic item。
- 如果 packet / handoff 声明 risky pair classes，只有匹配这些类别且有玩家侧解释的事实才可成为 pair-policy item。

`player_facing_merits` 只能写玩家侧设计优点：审美结构、难度结构、洞见、因果责任、状态消费、角色适配、共享结构或重读 payoff。

## Critic Item 类型

- `core_blocker`: 当前材料已经显示核心 claim、role fit、证据边界或 lineage 失败。它阻塞 `proposal_ready*`。
- `context_gap`: 当前材料不足以判断某个会影响 `proposal_ready*` 的玩家侧关系。写清缺少哪个局面、动作对比、状态后果或 artifact。
- `nonblocking_risk`: 风险真实，但不破坏当前提交目标。它必须随 handoff 保留。
- `improvement_opportunity`: 可优化方向，不是通过条件。
- `score_boundary`: 审美、难度或 role 的边界声明，例如支持 4 不支持 5。
- `diagnostic_note`: routed diagnostic 的中性解释或 `verdict_effect: none` 记录。

核心体验使用当前评审路由：当前可判断时写当前判断；当前材料不足时写 `context_gap`；只是主观手感风险时写 `nonblocking_risk` 或 `handoff_note`。

## 输出

```yaml
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: supports_design_claim | supports_with_noncore_caveats | revise_required | hold_or_reject
review_loop_state: proposal_ready | proposal_ready_with_caveats | revise_required | held_proposal | rejected_candidate
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family
review_method:
  claim_last_used: true | false
  read_order_ok: true | false | not_applicable
  claim_read_after_initial_review: true | false | not_applicable

initial_review:
  verdict:
  review_loop_state:
  required_action:
  player_facing_merits:
  archive_taste_context_used:
  score_calibration:
    human_archive_anchors_present:
    score_claim_allowed:
    archive_attack_calibration:
    positive_anchors:
    lower_bound_or_negative_anchors:
    missing_anchor_effect:
  trace_metric_interpretation:
    calibration_status: pilot | active | unavailable | context_missing
    solution_execution_pressure:
      metric_fact:
      allowed_reading:
      player_facing_check:
      verdict_effect: none | merit | caveat
    solution_space_reuse:
      metric_fact:
      allowed_reading:
      player_facing_check:
      verdict_effect: none | merit | caveat
    unmeasured_dimensions: []
  aesthetic_target_fit:
  difficulty_target_fit:
  critic_items:
    - id:
      type: core_blocker | context_gap | nonblocking_risk | improvement_opportunity | score_boundary | diagnostic_note
      target: player_insight | why_not_execution | role_fit | evidence_support | diagnostic_reading | taste_calibration | lineage
      claim_relation:
      evidence_basis:
      player_facing_reason:
      blocks_proposal_ready: true | false
      expected_designer_response: revise_now | answer_from_packet | add_context_next_review | accept_as_nonblocking | reject_with_reason | downgrade_or_hold | change_family
  diagnostic_interpretations:
    - graph_fact:
      neutral_meaning:
      player_facing_interpretation:
      verdict_effect: none | merit | caveat | core_blocker
  handoff_notes:

claim_followup:
  claim_read: true | false | not_applicable
  verdict_changed: true | false | not_applicable
  score_or_state_changed: true | false | not_applicable
  change_summary:
  change_reason:
  final_verdict:
  final_review_loop_state:
  final_required_action:
  final_critic_items:
```

如果 `claim_last_used` 是 `false`，仍然填写 `initial_review` 作为普通 critic 主评审，并在 `claim_followup` 中使用 `not_applicable`。

顶层 `verdict` / `review_loop_state` / `required_action` 是最终 critic 结论；claim-last 使用时必须与 `claim_followup.final_*` 一致。

如果存在 `blocks_proposal_ready: true` 的 `critic_items`，最终 `required_action` / `final_required_action` 不能是 `none`，对应的 `review_loop_state` / `final_review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
