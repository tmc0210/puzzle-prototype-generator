# Critic 输入与输出合同

## Critic packet

一次审查只允许包含：

```yaml
review_attempt_id: ""
prototype_id: ""
prototype_rules: {}
prior_course_refs: []
target_difficulty: 1
stage_difficulty_calibration_refs: []
cross_stage_aesthetic_calibration_refs: []
mechanical_evidence_status: supported
candidate:
  candidate_id: ""
  exact_version: ""
  solve_instance: {}
  canonical_solution:
    exact_inputs: []
    mechanically_derived_trace:
      - step: 0
        input: ""
        before_layout: ""
        event: ""
        after_layout: ""
```

`stage_difficulty_calibration_refs` 只指向当前目标之前课程阶段的校准视图，保留实际布局、阶段内难度分、审美分和人类原评语；每份视图用 frontmatter 声明：

```yaml
critic_calibration_kind: stage_local_difficulty
covered_prior_course_refs: []
difficulty_metadata: stage_local
```

`cross_stage_aesthetic_calibration_refs` 指向其余 clean human-reviewed archive 的审美投影视图，保留实际布局、审美分和人类原评语，不携带结构化难度分或难度标签；每份视图用 frontmatter 声明：

```yaml
critic_calibration_kind: cross_stage_aesthetic
difficulty_metadata: omitted
```

两类视图合起来覆盖 Controller 选择的 clean archive，原始 archive 来源只保存在 Controller 账本中，不进入 Critic packet。

禁止出现 Designer claim、体验核心、作品身份、送审包、修改历史、旧 review、目标关人评、精选 alternative、SCC / graph 或自动质量指标。

## 最终批评

最终批评是自然语言，不复述 packet 字段。第一句使用固定 verdict；正文从完整作品说明哪些前置决定依赖对后续关系的预见，以及这些关系相对全部前序的审美判断。不得把 canonical replay 递归拆成逐局面选项表。
