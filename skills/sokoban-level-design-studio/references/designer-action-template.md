# Designer Action 模板

`designer_action_N` 回应当前审查轮的全部独立 artifacts，只决定下一步，不能自行授予通过或关闭 slot。

```yaml
portfolio_id: ""
review_round_answered: 0
batch_level_review_ref: ""
evidence_review_refs: []

candidate_actions:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    exact_version_answered: ""
    reviewer_items: []
    response: revise_same_candidate | withdraw_and_replace_same_slot | dispute_raw_packet | advance_unchanged
    action_and_refs: []
    next_candidate_id: ""
    next_exact_version: ""

next_review_round: 0
next_step: design_studio | evidence_review_then_full_batch_review_N_plus_1 | pre_submission_cleanup
```

规则：

- 修改 layout、start、goal、对象、核心操作或玩家关系后，形成新 exact version，填写新送审包并重跑该版本必要硬证据。
- `dispute_raw_packet` 只适用于 packet 事实缺失或错误；designer 的亮点解释和 slot 理由不能进入新 packet。
- `reject_candidate` 后 slot 保持 `designing`，只能导向同一 slot 的修订、替换或定向 explorer 请求；`human_closed` 只由人类写入。
- 任一候选变化后，下一位 fresh reviewer 都必须收到包含全部当前候选的完整批次；旧 review 不复用。
- 只有整批最新审查 survive，才能进入 `pre_submission_cleanup`。
