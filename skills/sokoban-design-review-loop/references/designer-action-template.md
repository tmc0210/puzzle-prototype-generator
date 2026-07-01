# Designer Action Template

`designer_action_N` 不是 final decision，也不能关闭 review loop。它只决定下一步。

## 输入

```text
candidate_packet
evidence_reviewer_result
puzzle_critic_result
```

## 规则

- 如果核心攻击指向 `player_insight`、`why_not_execution`、evidence support、role fit、未授权变体、lineage 或 taste，不能由 designer action 标记为 `proposal_ready`。
- 如果修改候选，重跑必要工具，并把新版本交给 `review_N+1`。
- 如果反对一个具体证据读取攻击，写 `evidence_disagreement_packet` 给 `review_N+1`。
- Evidence disagreement 不适用于未解决的玩家洞见、审美、role fit、lineage 或 taste 攻击。
- 最诚实结果是 held、rejected 或 failed_search 时，直接记录该状态。

## 输出

```yaml
review_iteration_answered:
candidate_version_answered:
designer_action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | failed_search | unresolved
actions_for_core_attacks:
  - attack:
    action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | unresolved
    evidence_or_attempt_refs:
    result:
produces:
  candidate_version:
  evidence_disagreement_packet:
next_step: review_N_plus_1 | hold | reject_or_change_family | failed_search
```
