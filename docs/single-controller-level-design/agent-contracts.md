# Agent 输入输出合同

本文由 [唯一入口](README.md) 路由，不可单独作为主流程入口。所有角色都由轮次控制器调度，且不得创建子 Agent。

## 通用 assignment

每个 assignment 至少包含：

```yaml
contract_version: 1
task_id: ""
round_id: round-0001
assignment_id: ""
agent_instance_id: ""
role: ""
required_skill: null

candidate_id: null
exact_version_basis: null
instance_policy: persistent_for_task | fresh_for_exact | fresh_for_assignment
subagent_spawn_allowed: false

objective: ""
input_refs: []
allowed_output_refs: []
forbidden_inputs: []
required_outputs: []
completion_contract:
  result_ref: ""
  allowed_statuses: [completed, failed, blocked, needs_input]
```

轮次控制器必须把 assignment 自身加入子 Agent 输入。`input_refs` 是完整读取白名单，不代表对其父目录的读取授权；`allowed_output_refs` 之外的写入一律无效。

## 复用现有专业角色

### 持续 Designer

复用 [`sokoban-level-designer`](../../.agents/skills/sokoban-level-designer/SKILL.md) 和现有 [Designer assignment 模板](../../.agents/skills/sokoban-level-design-studio/references/designer-assignment-template.md)。

```yaml
instance_policy: persistent_for_task
required_skill: sokoban-level-designer
```

输入随阶段变化，但必须包括正式 assignment、当前 authority、允许的 archive/lexicon、唯一 `candidate_id` 和最近已发布 exact 依据。它可以交付：

- 体验简报、归档校准和持续工作台文件；
- 局部 exploration request；
- 新 exact、canonical replay、原始工具 artifact 和送审包；
- Critic 退回后的 Designer action；
- 设计类提交前检查结果。

它不得写 dispatch、轮次 decision、候选账本、Critic packet、独立 verdict、levels、queue 或人类状态。Critic 接受后不得继续提出增强方案。

### 持续 task-local Explorer

复用 [`sokoban-mechanism-lab`](../../.agents/skills/sokoban-mechanism-lab/SKILL.md) 和 [task-local exploration 合同](../../.agents/skills/sokoban-mechanism-lab/references/task-exploration-format.md)。

```yaml
instance_policy: persistent_for_task
required_skill: sokoban-mechanism-lab
intent: mechanism_explore
publication_scope: task_local
```

输入只允许体验种子、玩家前序、规则、允许机制、工具入口、source boundary、当前 task lexicon 和合法局部 request。输出只能是 task lexicon、索引和 runs。

禁止输入审美归档、正式 exact、review、Designer 设想或完整候选坐标。Explorer 不判断难度、审美、family 去留或候选状态。

### fresh Evidence Reviewer

复用 [`sokoban-evidence-reviewer`](../../.agents/skills/sokoban-evidence-reviewer/SKILL.md) 和 [Evidence Reviewer 模板](../../.agents/skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md)。

```yaml
instance_policy: fresh_for_exact
required_skill: sokoban-evidence-reviewer
```

每个 exact 使用一个未参与设计、未核验过其它 exact 的 fresh 实例。输入必须包含：

- `candidate_id`、`exact_version`、layout 与 solve instance；
- 从规则合同提取的机械声明；
- 送审包中单独抽取的 uniqueness 声明；
- allowed evidence sources；
- solve、replay、graph、bypass、counterfactual、event 与 object artifacts；
- 搜索预算和 graph completeness。

输出是版本对应的 evidence review。它不评价审美、难度、包装或待玩价值，不补跑缺失证据。

### fresh Puzzle Critic

复用 [`sokoban-puzzle-critic`](../../.agents/skills/sokoban-puzzle-critic/SKILL.md) 和 [Critic 输入合同](../../.agents/skills/sokoban-puzzle-critic/references/critic-contract.md)。

```yaml
instance_policy: fresh_for_exact
required_skill: sokoban-puzzle-critic
```

每个 exact 只允许一名 Critic。它只能读取轮次控制器生成的白名单 packet：

- 规则、胜利条件与玩家规则前提；
- 全部有序前序关卡；
- 目标难度；
- 阶段内难度校准 view；
- 跨阶段审美校准 view；
- 当前实际布局、非空 canonical inputs 和逐步实际 layout；
- 硬证据已获独立支持的事实。

禁止读取体验核心、作品身份、送审包、Designer 解释、Explorer 材料、旧 review、SCC/graph 或自动质量指标。输出只能是一篇固定首句的自然语言 verdict。

## 新增临时角色

这些角色只由本流程 assignment 定义，不新增 skill。

### 原型上下文审计员

```yaml
instance_policy: fresh_for_assignment
role: prototype_context_auditor
```

输入：

- 原型根目录；
- `docs/design_handoff.yml`；
- handoff 声明的 required docs；
- 人类体验种子；
- 允许的 source boundary；
- 上下文输出位置。

交付 `context-vNNN.yml`，至少记录规则、胜利条件、对象/事件语义、玩家前序、允许机制、工具入口、pre-submission workflows、authority refs、未解决冲突和 provenance。它只做事实提取与一致性审计，不提出布局、体验核心或作品评价。

### 提交前 Workflow Worker

```yaml
instance_policy: fresh_for_assignment
role: pre_submission_workflow_worker
```

仅用于不属于 Designer 的 pre-submission workflow。输入必须逐项限定：

- `workflow_id`、依赖 workflow 和 applicability；
- 当前 accepted candidate 与 reviewed exact；
- authority docs；
- 允许操作、允许写入路径和必需命令；
- 必需复验、版本影响与完成条件。

输出必须包含实际操作、artifact refs、`version_effect`、建议的 `review_effect`、证据和阻塞。轮次控制器只按 authority 合同登记 review 是否保留。

### Delivery Operator

```yaml
instance_policy: fresh_for_assignment
role: delivery_operator
```

输入：

- 已完成的 pre-submission record；
- 唯一 delivery exact 及当前证据；
- authority 指定的 levels、queue 和 playable 目标；
- 精确 source/id；
- 允许写入路径与构建命令。

它只接入一个 delivery version，交付版本化 delivery record、queue entry、构建日志和 playable refs。不得改变关卡设计；若操作要求改变 exact，必须停止并返回 `blocked`。

### Delivery Verifier

```yaml
instance_policy: fresh_for_assignment
role: delivery_verifier
```

必须与 Delivery Operator 使用不同 `agent_instance_id`，且只读。输入为 Operator 结果、交付门禁、目标 levels/queue、构建产物和当前证据引用。

它核验：

- delivery exact 与 reviewed/current exact 的合法对应；
- levels 中只有一个目标条目；
- queue entry 为目标 source/id 且状态为 `pending_playtest`；
- playable 构建成功且 source/id 可解析；
- submission、uniqueness、硬证据、Critic 和 pre-submission 引用仍然新鲜。

输出 `supported`、`contradicted` 或 `unknown` 及逐项事实，不修改交付文件。

## 输入防火墙

| 接收者 | 允许输入 | 明确禁止 |
|---|---|---|
| Explorer | 局部结构空间、规则、工具、task lexicon | exact、archive、review、完整候选 |
| Designer | 当前 assignment 白名单内的设计材料 | Controller 状态写权限、独立 verdict |
| Evidence Reviewer | exact 与原始硬证据 | 审美、亮点和包装叙事 |
| Puzzle Critic | 白名单 Critic packet | Designer claims、旧 review、graph/SCC、自动指标 |
| Workflow Worker | 单个 workflow authority 与目标 artifact | 其它 workflow 的隐式写权限 |
| Delivery Operator | 已批准的唯一 delivery exact | 新设计、第二 delivery 入口 |
| Delivery Verifier | 交付实物与门禁引用 | 任何写入权限 |

发生意外污染时，子 Agent 必须停止并以 `failed` 交付，不得自行过滤后继续作专业结论。
