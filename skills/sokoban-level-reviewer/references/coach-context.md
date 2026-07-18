# 阶段 B 体验核心教练输入

只在同一 reviewer 已经写定独立阶段 A verdict 后提供。它把设计意图与树状态显式交给教练，不得回填或改写阶段 A 文件。阶段 A 存活时授予完整树决定权限；未存活时只授予方向保持权限。

```yaml
review_attempt_id: ""
quality_gate_ref: ""
quality_gate_outcome: survive_quality_gate | revise_and_rereview | reject_candidate
coach_authority: tree_decision | direction_guard_only

experience_core:
  experience_statement: ""
  player_action: ""
  visible_payoff: ""
  identity_conditions: []

design_tree:
  root_node_id: null
  active_node_id: null
  frozen_nodes: []
# 子节点轮中展开为：
# frozen_nodes:
#   - node_id: ""
#     parent_node_id: null
#     exact_version: ""
#     growth_relation: baseline | construct_prefix | apply_suffix
#     layout_ref: ""
#     replay_ref: ""
#     coach_note_ref: ""

current_review:
  node_role: baseline_root | growth_child
  parent_node_id: null
  intended_growth_relation: baseline | construct_prefix | apply_suffix
  designer_intent_in_one_sentence: ""
  source_coach_note_ref: null

allowed_mechanisms: []
artifact_refs: []
```

`allowed_mechanisms` 只表示玩家前序和 handoff 允许使用的材料，不要求教练选用。当前为 baseline 时，`intended_growth_relation` 写 `baseline`。当前为子节点时，父节点必须已经冻结，且与阶段 A raw packet 中的 `frozen_parent` 完全一致。

`quality_gate_outcome: survive_quality_gate` 时，`coach_authority` 必须为 `tree_decision`。其它 outcome 必须为 `direction_guard_only`：教练只能判断继续按阶段 A 修订是否仍会实现原 brief，不能冻结节点、判断树充分或指定替代方向。`source_coach_note_ref` 指向建立当前工作节点所依据的教练自然语言意见；baseline 没有来源 note 时使用 `null`。

不要加入 designer 对关卡质量的辩护、旧教练建议全文、失败尝试日志或预先列好的多个未来分支。冻结节点只提供理解当前树所需的简短亲缘关系和实际 artifact 引用。
