# 文件、digest 与版本协议

本文由 [唯一入口](README.md) 路由。文件、内容 digest 和关闭的 decision 是流程状态的唯一权威载体。

## 任务目录

```text
<task-root> = reports/single-controller-level-design/<prototype-id>/<task-id>/
```

开始前：

```text
git check-ignore -v -- <task-root>/orchestration/manifest.yml
```

目录结构：

```text
<task-root>/
  authority/
    human-brief-v001.yml
    authority-manifest-v001.yml
  context/
    context-v001.yml
  orchestration/
    manifest.yml
    candidate_ledger.yml
    rounds/
      round-0001/
        dispatch.yml
        assignments/
        results/
        summary.md
        decision.yml
  exploration/
    dispatch.yml
    lexicon.md
    lexicon_index.md
    snapshots/
    requests/
    runs/
  designer/
    workbench/
    assignments/
    actions/
  candidate/
    exact-v001/
      layout.yml
      solve-instance.yml
      canonical-replay.yml
      submission-packet.yml
      evidence/
  calibration/
    source-selection-v001.yml
    stage-local-difficulty-v001.md
    cross-stage-aesthetic-v001.md
    projection-audit-v001.yml
  reviews/
    exact-v001/
      evidence-review-v001.yml
      critic-base-v001.yml
      critic-review-v001.md
  pre-submission/
    workflow-record-v001.yml
    workflows/
  delivery/
    staging-v001/
    recovery-v001/
    delivery-record-v001.yml
    pre-commit-verification-v001.yml
    post-commit-verification-v001.yml
    queue-activation-v001.yml
    human-handoff-v001.yml
```

原型可按 authority 改用其它具体 artifact 名，但必须保留 authority、exact、review、聚合 workflow、staging、recovery 和两次 verification 边界。

整棵 task root 是可重建但任务期间必须保留 provenance 的中间工作区，不加入 Git。

## 最终发布路径

最终目标逐项来自 `design_handoff.yml` 与 required authority docs。示例路径不是默认授权。不得在原型目录新增 report、review、handoff 或 ledger。

## 编号

| 对象 | 格式 | 规则 |
|---|---|---|
| 工作流合同 | `workflow_version: 2.0.0` | 本目录流程版本 |
| 文件合同 | `contract_version: 2` | assignment/result/dispatch/decision 合同 |
| 轮次 | `round-0001` | 每个事务组唯一 |
| assignment | `assignment-001` | 轮次内唯一；重试使用新 assignment |
| authority/context | `*-v001` | authority 或 human brief 获授权变化时递增 |
| lexicon snapshot | `lexicon-snapshot-v001` | Designer 可消费的冻结材料集合 |
| exact | `exact-v001` | Designer 发布完整不可变快照时递增 |
| review | `*-v001` | 对应 exact 内不可覆盖 |
| workflow record | `workflow-record-v001` | 每个 phase 后的当前聚合快照；新版本替代旧指针 |
| delivery | `delivery-record-v001` | 每次合法 commit 尝试 |

编号只表达发布顺序，不表达质量或候选分支。更换 structure family 仍使用同一 `candidate_id`。

## 可覆盖与不可变

可以覆盖：

- `designer/workbench/` 中明确标记的工作态；
- Explorer 当前 `lexicon.md`/`lexicon_index.md`，但 run 保留；
- 尚未交付的临时日志和未发布 staging。

不得覆盖：

- authority manifest、human brief 和 context；
- lexicon snapshot；
- exact；
- result、decision、evidence review、Critic review；
- calibration selection/view/audit；
- 完成的 workflow、delivery、verification、handoff；
- 被后续 decision 引用的任何 artifact。

修正不可变文件时创建下一版本；旧文件保留 provenance，不继续为新 exact 背书。

## 内容身份

所有跨 assignment 输入使用：

```yaml
input_digests:
  - ref: path/to/file
    sha256: 64位小写十六进制
```

目录不能直接作为输入。需要读取目录集合时，Controller 先生成列出每个文件及 digest 的 manifest，再把 manifest 与列出的文件逐项授权。

exact 至少冻结 layout、solve instance、canonical replay、submission packet、规则合同和原始证据 digest。Critic packet 冻结两类 calibration view 和全部前序 digest。Delivery manifest 冻结旧目标、新 staging 和 recovery digest。

## 结果信封

```yaml
contract_version: 2
task_id: ""
round_id: round-0001
assignment_id: assignment-001
agent_instance_id: ""
role: ""
status: completed | failed | blocked | needs_input
result_version: v001

candidate_id: null
exact_version_basis: null
produced_exact_version: null

consumed_refs: []
consumed_digests:
  - ref: ""
    sha256: ""
produced_refs: []
produced_digests:
  - ref: ""
    sha256: ""
authoritative_claim_refs: []
requested_next_inputs: []
blocking_issues: []

provenance:
  required_skill: null
  assignment_ref: ""
  authority_refs: []
  commands_or_tools: []

boundary_check:
  read_within_allowlist: true
  wrote_within_allowlist: true
  spawned_subagents: false
  contamination_detected: false
```

采用条件：

- task/round/assignment/agent/candidate/exact 对应正确；
- consumed refs 与 assignment 白名单相同，digest 未变；
- produced refs 存在、digest 正确且位于写集；
- authoritative claims 是 produced refs 的子集；
- `completed` 具备所有 required outputs；
- 未创建子 Agent、未污染、未越权。

## dispatch

```yaml
contract_version: 2
task_id: ""
round_id: round-0001
objective: ""
dependency_decision_refs: []
state_snapshot: {}
assignment_refs: []
write_set: []
barrier:
  expected_results: []
  all_terminal_before_decision: true
```

所有 dependency decision 必须关闭。`write_set` 必须覆盖本轮 assignments 的允许写入，且组内不能相交。

## decision

```yaml
contract_version: 2
task_id: ""
round_id: round-0001
dispatch_ref: ""
result_refs: []
accepted_result_refs: []
rejected_result_refs: []
summary_ref: ""

state_before: {}
state_after: {}
decision: ""
decision_basis_refs: []
unlocked_dependency_keys: []

barrier_check:
  all_expected_results_present: true
  all_results_terminal: true
  all_accepted_results_contract_valid: true
round_status: closed
```

`summary.md` 不得新增专业结论。`decision_basis_refs` 直接指向采用的专业 artifact 或 authority。

## 实例身份

- Designer、Explorer：任务内持续；污染替换时记录新 ID。
- Evidence Reviewer、Critic：每个 exact fresh；ID 不得跨 exact。
- Workflow Worker：每 assignment fresh。
- Delivery Operator、pre-commit Verifier、post-commit Verifier：fresh 且三个 ID 互不相同。

## 交付事务记录

Delivery staging record 至少包含：

```yaml
candidate_id: ""
delivery_exact_version: ""
targets:
  - final_ref: ""
    old_sha256: absent | ""
    staged_ref: ""
    staged_sha256: ""
recovery_manifest_ref: ""
queue_plan:
  source: ""
  id: ""
  final_status_after_post_commit_verification: pending_playtest
```

post-commit verification 通过前，不得把最终 queue 状态或账本状态设为 `pending_playtest`。通过后只允许原子激活 pre-commit 已验证的 queue staging；激活记录保存预期/实际 digest、source/id 和状态，两者完全一致后才能更新账本。

## 最终门禁

至少验证：

```text
task root 被 Git 忽略
所有依赖 decision 已关闭
输入/输出 digest 正确
候选账本只有一个 candidate
workflow-record 是聚合记录且通过验证
delivery exact 唯一并与 current/reviewed exact 合法对应
Evidence Reviewer 与 Critic 身份满足 freshness
两类 Critic calibration 通过 projection audit
Delivery 三个角色实例互不相同
pre-commit verification supported
atomic commit 完成或已补偿恢复
post-commit verification supported
queue activation 与预验证 staging digest 完全一致
levels、queue、playable source/id 可解析
human handoff 指向 post-commit supported 的 delivery
Git 待提交路径不含 task root 或中间产物
```

人类试玩后的去留状态不由任何 Agent 预填。
