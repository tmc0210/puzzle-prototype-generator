# 硬证据与准入审计模板

## 普通硬声明审计

```yaml
audit_mode: hard_claim_audit
candidate_id: ""
exact_version: ""
evidence_scope:
  allowed_sources: []
  graph_completeness: complete | budget_limited | not_applicable | unknown
claims:
  - claim_id: ""
    claim: ""
    status: supported | contradicted | unknown | not_applicable
    evidence_basis: []
    limits: []
hard_failures: []
evidence_gaps: []
overall_hard_status: supported | contradicted | incomplete
```

## Submission admission

```yaml
audit_mode: submission_admission
candidate_id: ""
exact_version: ""

review_gate:
  latest_review_ref: ""
  reviewer_instance_id: ""
  reviewed_exact_version: ""
  review_integrity: independent | contaminated | incomplete
  review_verdict: survive_to_pre_submission_checks | revise_and_rereview | reject_branch | missing
  status: survived | missing | stale | contradicted

hard_evidence:
  - claim_id: ""
    status: supported | contradicted | unknown | not_applicable
    evidence_basis: []
    limits: []

prototype_workflows:
  - workflow_id: ""
    trigger_evaluation: triggered | not_triggered | unknown
    authority_docs_read: []
    required_operations:
      - operation: ""
        artifact_refs: []
        status: supported | contradicted | incomplete | not_applicable
    exact_version_match: true | false
    conclusion_within_evidence: true | false
    status: supported | contradicted | incomplete | not_applicable

stale_or_substituted_evidence: []
blocking_reasons: []
queue_admission: eligible_for_queue | blocked
```

## 判定规则

- `supported`：所需证据种类、操作和完备性足够。
- `contradicted`：存在直接冲突的 exact trace、reachable state、bypass 或版本事实。
- `unknown` / `incomplete`：证据缺失、预算不足、工具不可用、操作没执行或只给结论。
- `not_applicable`：handoff 或声明明确不触发。
- 任一关键 `contradicted`、`unknown`、`incomplete`、stale review 或 stale evidence 都使 `queue_admission: blocked`。
- 不把 designer 自报状态、文件名、controller 简报或 generic evidence 替代专用 workflow。
