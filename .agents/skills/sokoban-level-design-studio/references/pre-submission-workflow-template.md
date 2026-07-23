# 原型专属提交前工作流记录模板

```yaml
design_task_id: ""
candidate_id: ""
reviewed_exact_version: ""
delivery_exact_version: ""
workflow_results:
  - workflow_id: ""
    designer_assignment_ref: null
    applicability: applicable | not_applicable
    applicability_basis: ""
    authority_docs: []
    operations_performed: []
    artifact_refs: []
    version_effect: unchanged | changed
    review_effect: preserved | rereview_required
    review_effect_basis: ""
    status: completed | not_applicable | incomplete
overall_status: completed | incomplete
return_to_design_required: true | false
```

只读 workflow 的 `version_effect` 为 `unchanged`。只要 exact version 发生变化，必须写明 authority docs 中预先定义的结果契约；只有该契约明确允许保留 review，且本次满足全部边界、必需复验和不变量时，才能写 `review_effect: preserved`。否则写 `rereview_required` 和 `return_to_design_required: true`，返回同一候选的 Design Studio 与完整评审链。

本模板不规定 workflow 检查什么、修改什么或如何判断完成；这些内容只来自当前原型的 `design_handoff.yml` 和 authority docs。候选被接受后由 Controller 为唯一候选生成一份记录。
