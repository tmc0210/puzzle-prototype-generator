# 阶段 A 独立审查输入白名单

Controller 为 fresh reviewer 从实际关卡和机械回放重新组装 raw packet。它不是 designer 送审包的删减版。`review_target` 只说明这是树根还是父子比较，不透露拟增加前序或后继。

```yaml
review_attempt_id: ""
prototype_id: ""
review_target: baseline_root | growth_child

prototype_rules:
  confirmed_rules: []
  win_condition: ""
  object_and_event_semantics: []
  player_prior: []

human_review_constraints:
  - statement: ""
    human_source_ref: ""

frozen_parent: null
# growth_child 时改为与 candidate 相同形状的完整实际节点；baseline_root 保持 null。

candidate:
  node_id: ""
  candidate_id: ""
  exact_version: ""
  solve_instance:
    layout: ""
    player_start: null
    win_condition: {}
  canonical_solution:
    exact_inputs: []
    mechanically_derived_trace:
      - step: 0
        input: ""
        before_state_ref: ""
        event: ""
        after_state_ref: ""
        visible_board_change: ""

artifact_refs: []
```

禁止加入：

- designer submission packet 或其中任何字段；
- experience core、作品身份、设计树说明或拟议生长方向；
- explorer brief、material board 或材料卡；
- designer 对亮点、问题、难度和审美的解释；
- attempt log、修改历史、失败成本或设计投入；
- solver 指标、图规模、事件覆盖统计或 critic 分数；
- 旧 reviewer、designer action、controller summary 或当前设计对话。

`human_review_constraints` 只能忠实记录人类 brief 明确给出的审查边界、允许取舍或不可改变条件，并引用可核对的人类来源。没有时写空列表。不得把 designer 的包装解释、缺点辩护或推测的人类偏好伪装成该字段。

`mechanically_derived_trace` 必须由对应节点的非空 `exact_inputs` replay 得到。子节点 packet 中父子都必须是实际 exact version；缺布局、缺 exact inputs 或缺机械回放时不可送审。
