# 原型专属提交前工作流记录模板

```yaml
design_task_id: ""
candidate_id: ""
reviewed_exact_version: ""
delivery_exact_version: ""
workflow_results:
  - workflow_id: ""
    applicability: applicable | not_applicable
    applicability_basis: ""
    authority_docs: []
    candidate_discovery: null  # 只有规范化 workflow 填 { method, candidate_units }
    operations_performed: []
    artifact_refs: []
    version_effect: unchanged | review_preserving_change
    acceptance_preserved: true
    preservation_basis: ""
    status: completed | not_applicable | incomplete
overall_status: completed | incomplete
```

只读 workflow 与所有未应用的反事实都写 `version_effect: unchanged`。只有 authority docs 预先定义的候选单元、允许操作和全部保持条件均得到当前 artifact 证明时，才可写 `review_preserving_change`；`acceptance_preserved` 始终为 `true`。反事实失败或证明不足时保留该候选单元，不应用变换；工具运行本身没有完成时写 `status: incomplete`，重跑当前 workflow。

规范化 workflow 的 `candidate_discovery` 记录 authority docs 指定的算法及其候选单元；只读 workflow 保持 `null`。它不能填写 Designer 的职责判断，也不能把全部普通空格逐格列为默认候选。本模板不规定具体原型检查什么；这些内容只来自当前原型的 `design_handoff.yml` 和 authority docs。候选被接受后由 Controller 为唯一候选生成一份记录。
