# 文件交付与版本协议

本文由 [唯一入口](README.md) 路由，不可单独作为主流程入口。文件是流程状态和 Agent 交付的唯一权威载体。

## 任务目录

每个实际设计任务在当前原型允许的 reports 或 studio 区域建立独立 `<task-root>`：

```text
<task-root>/
  orchestration/
    manifest.yml
    candidate_ledger.yml
    rounds/
      round-0001/
        dispatch.yml
        assignments/
          assignment-001.yml
        results/
          assignment-001-result-v001.yml
        summary.md
        decision.yml
  context/
    context-v001.yml
  exploration/
    dispatch.yml
    lexicon.md
    lexicon_index.md
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
  reviews/
    exact-v001/
      evidence-review-v001.yml
      critic-base-v001.yml
      critic-review-v001.md
  pre-submission/
    workflow-record-v001.yml
    workflows/
  delivery/
    delivery-record-v001.yml
    verification-v001.yml
    human-handoff-v001.yml
```

可以按原型 authority 改用其它具体 artifact 文件名，但轮次、exact、review、delivery 和 verification 的版本边界必须保留。

## 编号规则

| 对象 | 格式 | 规则 |
|---|---|---|
| 工作流合同 | `workflow_version: 1.0.0` | 本目录文档版本 |
| 文件合同 | `contract_version: 1` | assignment/result 字段合同 |
| 轮次 | `round-0001` | 每写一个有效 decision 后单调递增 |
| assignment | `assignment-001` | 在轮次内唯一；重试使用新轮次和新 assignment |
| 上下文 | `context-v001` | authority 事实获授权变化时递增 |
| exact | `exact-v001` | Designer 发布不可变快照时递增 |
| review artifact | `*-v001` | 在对应 exact 目录内唯一且不可覆盖 |
| workflow record | `workflow-record-v001` | 每次完整提交前编排递增 |
| delivery record | `delivery-record-v001` | 每次合法交付尝试递增 |

编号只表达不可变发布顺序，不表达质量、派生树或候选分支。更换 structure family 仍沿用同一个 `candidate_id`；不得出现 `candidate-a`、`candidate-b` 或平行 exact。

## 不可变与可覆盖文件

可以覆盖：

- `designer/workbench/` 内明确标记为工作态的布局、probe 和 replay；
- task-local Explorer 的当前 `lexicon.md` 与 `lexicon_index.md`，但其 run provenance 保留；
- 尚未关闭轮次中的临时日志。

不得覆盖：

- 已发布 exact 目录；
- 已交付 result、decision、evidence review、Critic review；
- 已完成 workflow、delivery、verification 或 human handoff record；
- 任何被后续 decision 引用的 artifact。

需要修正不可变文件时，创建下一个版本，并在新文件中引用被替代版本和原因。旧文件保留 provenance，但不得继续为新 exact 背书。

## 结果信封

每个 assignment 必须交付一个 YAML 结果信封：

```yaml
contract_version: 1
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
produced_refs: []
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

专业结论必须保存在 `authoritative_claim_refs` 指向的角色专属 artifact 中；结果信封只声明交付位置和终态，不复制长篇结论。

以下任一情况使结果不可采用：

- assignment、任务、候选或 exact 对应错误；
- `produced_refs` 不存在或超出允许写入范围；
- `spawned_subagents` 不是 `false`；
- 输入超出白名单或发现污染；
- 声称 `completed` 但缺少 required outputs；
- 聊天声称完成但没有结果信封。

## dispatch 与 decision

`dispatch.yml` 冻结当前轮：

```yaml
contract_version: 1
task_id: ""
round_id: round-0001
based_on_decision_ref: null
objective: ""
assignment_refs: []
barrier:
  expected_results: []
  all_terminal_before_decision: true
  next_round_before_decision: forbidden
```

`decision.yml` 是本轮唯一控制结论：

```yaml
contract_version: 1
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
next_round_intent: null

barrier_check:
  all_expected_results_present: true
  all_results_terminal: true
  all_accepted_results_contract_valid: true
round_status: closed
```

`summary.md` 可以用自然语言方便人类阅读，但不能新增 result artifacts 中不存在的专业结论。`decision_basis_refs` 必须直接指向所采用的专业产物或 authority。

## 实例身份

- 持续 Designer：一个任务固定一个 `agent_instance_id`；恢复调用不改 ID。
- 持续 Explorer：一个任务固定一个 `agent_instance_id`；不同 batch 不改 ID。
- Evidence Reviewer：每个 exact 使用新的 ID；该 ID 不得出现在其它 exact。
- Puzzle Critic：每个 exact 一个新的唯一 ID；同一 exact 不得登记第二个。
- Workflow Worker：每个 assignment fresh；多个独立 workflow 可在同轮使用不同 ID。
- Delivery Operator 与 Delivery Verifier：必须 fresh 且 ID 不同。

Agent 被污染、纠偏失败或实例不可恢复时，下一轮分配新 ID，并在 decision 中记录替换原因。持续角色更换实例不改变 `candidate_id`。

## 引用与交付门禁

所有 artifact 使用相对仓库根目录或相对 task root 的规范化路径；同一文件内不得混用两种基准。引用必须指向真实文件，不得依赖聊天消息、临时终端输出或未保存的内存状态。

交付前至少检查：

```text
当前轮 decision 已关闭
候选账本只有一个 candidate 对象
delivery exact 唯一且与 current exact 合法对应
所有 evidence/review/workflow 引用版本一致
Delivery Operator 与 Verifier 实例不同
levels、queue、playable source/id 可解析
human handoff 指向 verification supported 的 delivery
```

人类试玩后的 `defer`、`needs_revision`、`ready_for_archive` 或 `reject` 是后续人工状态，不由本流程中的任何 Agent 预填。
