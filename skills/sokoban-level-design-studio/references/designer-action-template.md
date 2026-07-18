# Designer Action 模板

`designer_action_N` 只记录 designer/controller 根据本轮独立 artifacts 采取什么动作。它引用教练的自然语言 note，不把宏观建议改写成字段或验收清单。

```yaml
review_round_answered: 0
node_id: ""
parent_node_id: null
exact_version_answered: ""
evidence_review_refs: []
quality_review_ref: ""
coach_note_ref: ""

response: revise_working_node | change_structure_family | withdraw_working_node | dispute_raw_packet | freeze_node_and_grow | freeze_node_and_finish_tree
action_and_refs: []

tree_update:
  frozen_node_id: null
  next_parent_node_id: null
  next_working_node_id: null
  tree_state: building_baseline | growing | sufficient

next_review_round: 0
next_step: design_studio | evidence_review_then_quality_gate | coach_stage | pre_submission_workflows
```

规则：

- 修改 layout、start、goal、对象、核心操作或玩家关系后形成新 exact version，填写新送审包并重跑必要硬证据。
- `revise_working_node` 与 `change_structure_family` 都回到单节点循环的 Design Studio；后者保留节点 brief，但不默认沿用当前布局或因果结构。
- `dispute_raw_packet` 只适用于 packet 事实缺失或错误；designer 的亮点解释不能进入新的阶段 A packet。
- 每个独立阶段 A verdict 写定后都要由同一 reviewer 完成阶段 B，designer 收到 coach note 后才能填写 action。阶段 A 未存活时，阶段 B 只有方向保持权限，不能冻结节点。
- 方向仍在时按阶段 A 缺点修订；方向丢失时优先选择 `change_structure_family` 或 `withdraw_working_node`，保留原节点 brief，不沿错误结构继续局部优化，也不静默改写 `growth_relation`。
- 冻结父节点不因子节点失败而改变；失败版本只进尝试日志。
- 只有 `tree_state: sufficient` 后，才对所有冻结节点进入 `pre_submission_workflows`。
