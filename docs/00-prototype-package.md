# 原型包结构

一个原型包是一组机制、知识、关卡、导出物和分析报告的集合。

建议结构：

```text
prototypes/
  pull_portal_fallback/
    mechanic.yml
    knowledge.yml
    curriculum.yml
    levels.yml
    game.ps
    reports/
      generation.json
      evaluation.json
      solutions/
        L01.json
        L02.json
```

## 文件职责

### mechanic.yml

机制真相。

包含：

- 对象。
- 对象实例模型。
- 多对象关系。
- 输入。
- 规则。
- 规则分支。
- 事件。
- 胜利条件。
- 反事实配置。
- 优化前提。

求解器、知识生成器、评分器和 exporter 都应优先读取这个文件。

如果原型包含多个同类对象、多组设备或多个可控角色，`mechanic.yml` 必须记录：

- `object_instance_model`：该对象是否可多实例、实例是否可区分、是否可安全排序。
- `relations`：配对、分组、绑定、active selection 等关系。

详见 `docs/19-multi-instance-object-model.md`。

### knowledge.yml

玩家需要学会的知识列表。

每条知识应包含：

- id。
- 类型。
- statement。
- 前置知识。
- 来源规则或事件。
- detector。
- counterfactual。
- 证据等级。

知识可以由机制派生，也可以由设计者确认或修改。

### curriculum.yml

课程规划。

定义每条知识需要哪些关卡角色：

```text
diagnostic
discovery
boundary
guided_application
independent_application
variation_transfer
combination
challenge
review
```

课程文件不直接存放地图，而是定义出题目标、顺序和数量偏好。

### levels.yml

关卡库。

包含正式关卡和候选关卡：

```yaml
- id: L01
  title: First Pull
  role: discovery
  targets:
    - K_pull_single_crate
  known_before: []
  target_learning:
    - K_pull_single_crate
  support_level: high
  expected_solver_evidence:
    - solvable
    - returned_solution_covers_target_events
  expected_llm_player_evidence:
    - forms_target_hypothesis
    - uses_target_hypothesis_to_finish
  failure_interpretation:
    no_pull_hypothesis: pull_motion_not_telegraphed
  status: accepted
  layout: |
    #####
    #@ C#
    #  G#
    #####
  expected_events:
    - pull_crate
```

关卡应引用知识，而不是把教学意图只写在自然语言里。

### game.ps

PuzzleScript Next 导出物。

它用于试玩和分享，不是机制真相。导出时应带结构化注释，回链到 rule id、event id 和 knowledge id。

示例：

```text
// @rule pull_single_crate
// @emits pull_crate
// @teaches K_pull_single_crate
```

### reports/

求解器、评分器和生成器产物。

报告应保留：

- 搜索配置。
- 启用优化。
- 状态数量。
- 解法 trace。
- 事件 trace。
- 反事实求解结果。
- 证明型结论。
- 诊断型提示。

## 版本关系

第一阶段采用：

```text
mechanic.yml + levels.yml -> runtime/solver/evaluator
mechanic.yml + levels.yml -> PuzzleScript Next exporter -> game.ps
solver/evaluator -> reports/
```

`game.ps` 可以手工调试，但如果修改了它，必须同步回机制 IR 或关卡文件，否则求解器不会把这些变化视为机制真相。
