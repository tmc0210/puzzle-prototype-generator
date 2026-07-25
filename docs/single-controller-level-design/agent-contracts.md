# Agent 输入输出合同

本文由 [唯一入口](README.md) 路由。所有角色由唯一 Controller 调度，且不得创建子 Agent。

## 通用 assignment

```yaml
contract_version: 2
task_id: ""
round_id: round-0001
assignment_id: assignment-001
agent_instance_id: ""
role: ""
required_skill: null

candidate_id: null
exact_version_basis: null
instance_policy: persistent_for_task | fresh_for_exact | fresh_for_assignment
subagent_spawn_allowed: false

objective: ""
dependency_decision_refs: []
input_refs: []
input_digests:
  - ref: ""
    sha256: ""
allowed_output_refs: []
forbidden_inputs: []
required_outputs: []
completion_contract:
  result_ref: ""
  allowed_statuses: [completed, failed, blocked, needs_input]
```

规则：

- assignment 自身必须作为 Agent 的控制信封；它不列入自身的 `input_refs`，避免自引用 digest。
- `input_refs` 只授权逐项文件，不授权父目录。
- `input_digests` 与 `input_refs` 一一对应，使用调度时 SHA-256。
- 依赖 decision 必须已关闭，输入 digest 必须在启动前和结果采用前复验。
- `allowed_output_refs` 可授权具体文件或独立目录；目录授权只覆盖其后代。
- 除 Delivery commit assignment 的最终目标外，全部输出位于 task root。
- 写出白名单、候选、exact 或角色错配都会使结果无效。

## 结果信封

结果信封使用 [文件与版本协议](artifact-versioning.md) 的 v2 合同。专业结论保存在角色专属 artifact；结果信封只声明终态、引用、digest 和边界。

污染时 Agent 立即停止并返回 `failed`。Controller 可以用新 assignment 向原实例短纠偏一次；再次失败必须更换 fresh 实例。

## 复用专业角色

### 持续 Designer

```yaml
instance_policy: persistent_for_task
required_skill: sokoban-level-designer
```

复用现有 Designer assignment 模板。输入按阶段包含冻结 human brief、authority、experience brief、允许 archive/lexicon snapshot、唯一候选和最近 exact 依据。

可交付：

- 体验简报、归档校准与持续工作台；
- 局部 exploration request；
- 新 exact、canonical replay、原始工具 artifact、玩家侧重读和 submission packet；
- Critic 退回响应；
- 会进行设计判断或改变 exact 的提交前检查。

不得写 Controller 状态、Critic packet、独立 verdict、最终 levels/queue 或人类状态。Critic 接受后除正式 `pre_submission_design_check` 外停止设计。

### 持续 task-local Explorer

```yaml
instance_policy: persistent_for_task
required_skill: sokoban-mechanism-lab
intent: mechanism_explore
publication_scope: task_local
```

输入只允许体验种子、玩家前序、规则、机制、工具、source boundary、冻结 task lexicon snapshot 和合法局部 request。

禁止 archive、exact、review、Designer 设想、完整候选坐标和 family 去留。输出仅为 lexicon、索引和 runs。

### fresh Evidence Reviewer

```yaml
instance_policy: fresh_for_exact
required_skill: sokoban-evidence-reviewer
```

每个 exact 使用一个未参与设计、未审查其它 exact 的 fresh 实例。输入包括：

- candidate/exact、layout、solve instance；
- 规则合同中的机械声明；
- submission packet 中抽取的 uniqueness 和作品身份机械声明；
- solve、replay、graph、bypass、counterfactual、event/object 原始 artifact；
- 搜索预算、graph completeness、允许证据来源；
- 所有 exact-bound 输入 digest。

Reviewer 不补跑证据，不评价审美、难度、包装或待玩价值。

### fresh Puzzle Critic

```yaml
instance_policy: fresh_for_exact
required_skill: sokoban-puzzle-critic
```

每个 exact 只允许一名 Critic。只读 Controller 生成的白名单 packet：

- 规则、胜利条件、玩家规则前提；
- 全部有序前序；
- 目标难度；
- 已通过 projection audit 的阶段内难度 view；
- 已通过 projection audit 的跨阶段审美 view；
- 当前实际布局、非空 inputs 和逐步 layout；
- 硬证据独立 supported 的事实。

禁止体验核心、作品身份、送审包、Designer/Explorer 材料、旧 review、SCC/graph、修改说明或自动指标。输出只能是一篇固定首句的自然语言 verdict。

## 临时角色

### 原型上下文审计员

```yaml
instance_policy: fresh_for_assignment
role: prototype_context_auditor
```

只读：

- `authority-manifest-vNNN.yml`；
- manifest 逐项列出的 handoff、required docs、authority docs；
- 完整冻结的 `human-brief-vNNN.yml`；
- 输出位置。

交付 `context-vNNN.yml`，记录规则、胜利条件、对象/事件语义、玩家前序、允许机制、工具、source boundary、workflow phase、最终写入目标、冲突和 provenance。它不提出布局、体验核心或作品评价。

### Critic 校准投影器

该工作属于 Controller-owned 确定性组包，不是审美角色。若委派只读临时 Agent，Controller 仍必须独立选择来源并机械验证结果。

输入：

- 全部有序前序；
- clean archive index/retrieval summaries；
- Controller source selection；
- projection schema。

输出 source selection、两类 view 和 projection audit。不得接收 Designer anchors、当前体验核心或 Critic 历史。

### 提交前 Workflow Worker

```yaml
instance_policy: fresh_for_assignment
role: pre_submission_workflow_worker
```

只用于不涉及设计判断且不会语义性改变 exact 的 workflow。输入逐项限定：

- workflow id、execution phase、依赖和 applicability；
- accepted candidate、reviewed exact；
- authority docs；
- 允许操作、命令、读写路径；
- 版本影响、复验和完成条件。

若实际操作会影响 layout、start、goal、胜利条件、核心机制使用或玩家关系，必须停止并返回 `blocked`，由 Controller 路由给持续 Designer。

### Delivery Operator

```yaml
instance_policy: fresh_for_assignment
role: delivery_operator
```

Stage assignment 只向 task-local 中保持仓库相对结构的 prototype package mirror/staging 写入，并复制校验所需只读 schemas；执行 `delivery_staging` workflow，并必须生成：

- 唯一 delivery exact；
- 最终目标白名单；
- 每个目标旧 digest、新 digest；
- commit manifest；
- recovery 包；
- source/id 与 queue 计划；
- build 记录。

pre-commit supported 后，commit assignment 只能执行已验证 manifest。使用同目录临时文件和原子替换；任一步失败必须补偿恢复。不得改变设计或创建第二入口。

### Delivery Verifier

```yaml
instance_policy: fresh_for_assignment
role: delivery_verifier
```

pre-commit 与 post-commit 各使用一个 fresh 实例；二者与 Operator 的 ID 互不相同且只读。

pre-commit 核验 staging、唯一性、source/id、queue 计划、build、证据新鲜度、写入白名单和 recovery。

post-commit 核验已提交 levels/playable、预验证 queue staging、digest、唯一性、source/id、build 与全部门禁引用；输出 `supported | contradicted | unknown`，不修改文件。通过后 Operator 只能原子激活该 queue staging，Controller 再机械核验最终 queue digest。

## 输入防火墙

| 接收者 | 允许输入 | 明确禁止 |
|---|---|---|
| Explorer | 局部空间、规则、工具、lexicon snapshot | exact、archive、review、完整候选 |
| Designer | 当前 assignment 的设计材料 | Controller 写权限、独立 verdict |
| Evidence Reviewer | exact 与原始硬证据 | 审美、亮点和包装叙事 |
| Critic | 白名单 Critic packet | Designer claims、旧 review、graph/SCC、自动指标 |
| Workflow Worker | 单 workflow authority 与目标 artifact | 隐式写权、语义性 exact 修改 |
| Delivery Operator | 已批准 delivery exact、写入白名单、旧 digest | 新设计、第二入口、未验证写集 |
| Delivery Verifier | staging 或最终实物与门禁 | 任何写入 |

## Git 边界

- authority、context、探索、工作台、exact、送审包、review、calibration、workflow record、delivery record、verification 和 handoff 都是忽略的中间产物。
- 只有 authority 明确列出且经过两阶段 delivery 的最终关卡与相关数据可以进入 Git。
- 子 Agent 不执行 `git add`、`git commit` 或 `git add -f`。
