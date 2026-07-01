# Puzzle Critic Template

## 任务

攻击 candidate packet 是否适合目标角色、目标玩家和本轮 brief。不要运行工具，不做最终裁决。

## 检查项

- `player_insight` 是否真实需要，还是可以靠局部执行取胜。
- `why_not_execution` 是否成立，还是只是长度、重复、走廊、显然动作或噪声。
- Role fit 是否符合玩家模型、机制暴露窗口和难度/审美目标。
- Routed diagnostics 是否被正确解释；未触发诊断不得作为隐藏通过条件。
- Archive taste context 是否只用了有人类评语支持的条目。
- SCC / graph fact 是否有玩家侧解释。

## 输出

```yaml
review_iteration:
candidate_version_reviewed:
review_input_type: candidate_version | evidence_disagreement | revised_claim | other
verdict: supports_design_claim | supports_with_noncore_caveats | revise_required | hold_or_reject
review_loop_state: proposal_ready | proposal_ready_with_caveats | revise_required | held_proposal | rejected_candidate
required_action: none | evidence_disagreement_for_next_review | structural_revision | downgrade_or_hold | reject_or_change_family
strongest_merits:
archive_taste_context_used:
aesthetic_target_fit:
difficulty_target_fit:
core_attacks:
  - attack:
    target: player_insight | why_not_execution | role_fit | evidence_support | diagnostic_reading
    reason:
scc_graph_interpretations:
  - graph_fact:
    neutral_meaning:
    player_facing_interpretation:
    verdict_effect: none | merit | caveat | core_attack
noncore_caveats:
questions_for_designer:
```

如果 `required_action` 不是 `none`，`review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
