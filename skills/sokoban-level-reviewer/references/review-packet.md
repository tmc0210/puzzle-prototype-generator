# 独立整批审查输入白名单

Controller 为 fresh reviewer 从实际关卡和机械回放重新组装 raw packet。它不是 designer 送审包的删减版。

```yaml
review_attempt_id: ""
prototype_id: ""

prototype_rules:
  confirmed_rules: []
  win_condition: ""
  object_and_event_semantics: []
  player_prior: []

portfolio:
  - slot: baseline | application | combination | challenge
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

允许提供 slot 名，只用于检查该位置是否由实际作品成立，不得附带 slot 理由。

禁止加入：

- designer submission packet 或其中任何字段；
- experience core、work identity、当前关卡声明、delta 或 reduction test；
- explorer brief、material board 或材料卡；
- designer 对亮点、问题、难度、审美和 slot 的解释；
- attempt log、修改历史、失败成本或设计投入；
- solver 指标、图规模、事件覆盖统计或 critic 分数；
- 旧 reviewer、designer action、controller summary 或当前设计对话。

每个 `mechanically_derived_trace` 必须由同一候选的非空 `exact_inputs` replay 得到。缺布局、缺 exact inputs 或缺机械回放的批次不可送审。
