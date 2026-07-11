# Designer Action Template

`designer_action_N` 不是 final decision，也不能关闭 review loop。它只决定下一步。

## 输入

```text
candidate_packet
evidence_reviewer_result
puzzle_critic_result
```

## 规则

- 如果 reviewer / critic 的 `required_action` 不是 `none`，designer action 不能标记为 `proposal_ready`。
- 如果存在 `critic_items.blocks_proposal_ready: true`，designer 将它路由为 revise、补上下文后进 `review_N+1`、downgrade / hold、reject 或 change family。
- 如果修改候选，重跑必要工具，并把新版本交给 `review_N+1`。
- 如果反对一个具体证据读取攻击，写 `evidence_disagreement_packet` 给 `review_N+1`。
- Evidence disagreement 不适用于未解决的玩家洞见、审美、role fit、lineage 或 taste 攻击。
- 如果一个问题会影响 `proposal_ready` 是否成立，把它路由为当前修订、下一轮补上下文、降级 / hold、reject 或 change family。
- 最诚实结果是 held、rejected 或 failed_search 时，直接记录该状态。

## Critic Item Triage

designer 不必须接受 critic 的每个判断，但必须逐项处理每个 `critic_items`。

允许的 response：

- `revise_now`: 承认该项需要结构、起点、claim 或机制范围修改，并重跑必要证据。
- `answer_from_packet`: 现有 packet 已能回答，引用具体局面、trace、artifact 或玩家侧读图材料。
- `add_context_next_review`: 不先改图，但下一轮 packet 必须补关键局面、动作对比、状态后果或 artifact，并进入 `review_N+1`。
- `accept_as_nonblocking`: 接受为非阻塞风险或分数边界，保留为 handoff note。
- `reject_with_reason`: 说明该 critic item 为什么不适用于当前 role、玩家全视野读图或 packet 事实。
- `downgrade_or_hold`: 候选有材料价值，但不足以 proposal-ready。
- `change_family`: 当前 causal-chain family 失败，换设计族。

## 输出

```yaml
review_iteration_answered:
candidate_version_answered:
designer_action_type: revise_structure | revise_claim | evidence_disagreement_for_next_review | downgrade_or_hold | reject_or_change_family | failed_search | unresolved

evidence_reviewer_action:
  required_action:
  response:
  evidence_or_attempt_refs:
  result:

critic_item_triage:
  - critic_item_id:
    response: revise_now | answer_from_packet | add_context_next_review | accept_as_nonblocking | reject_with_reason | downgrade_or_hold | change_family
    reason:
    refs:
    produces:
    next_review_needed: true | false

handoff_notes:
  - note:
    source_critic_item_id:
    claim_not_being_made:

produces:
  candidate_version:
  evidence_disagreement_packet:
  revised_packet_context:
next_step: review_N_plus_1 | hold | reject_or_change_family | failed_search
```
