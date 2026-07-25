# 依赖屏障调度协议

本文由 [唯一入口](README.md) 路由，不可单独作为主流程入口。

## 事务轮次

任务根固定为：

```text
reports/single-controller-level-design/<prototype-id>/<task-id>/
```

开始前运行：

```text
git check-ignore -v -- <task-root>/orchestration/manifest.yml
```

失败时保持 `briefing`，不得改用其它中间目录。

每个轮次冻结共享控制状态、直接依赖、输入 digest 和写集：

```text
round_open
  -> assignments_frozen
  -> dependencies_validated
  -> agents_started
  -> results_terminal
  -> results_and_digests_validated
  -> decision_recorded
  -> round_closed
```

同一轮适合放互不依赖、读取同一冻结状态且写集不相交的 assignment。无依赖的其它活动轮次不需要等待本轮收口；任何消费者必须等待它依赖的 decision 关闭。

合法终态：

- `completed`：要求的专业产物完整交付；
- `needs_input`：已完成合同内可做部分，下一 assignment 需要新材料；
- `blocked`：authority 或外部条件缺失；
- `failed`：执行错误、越权、污染、版本错配或证据无效。

自然语言回复、`running`、无结果信封或只有终端输出都不是终态。

## 每轮顺序

1. 写 `dispatch.yml`，列出直接依赖 decision、冻结状态、assignments 和写集。
2. 写各 assignment；逐项列出文件输入、SHA-256、禁止输入和允许输出。
3. 验证依赖已关闭、输入 digest 未变、写集不相交。
4. 同时启动或恢复本轮 Agent。
5. 等待本轮结果信封。
6. 验证终态、身份、版本、输入 digest、输出 digest、写集和禁止字段。
7. 写 `summary.md`；不得新增专业结论。
8. 写唯一 `decision.yml`，记录采用/拒绝结果和状态转换。
9. 关闭本轮；只解锁直接消费者。

Controller 使用：

```text
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-assignment --assignment <designer_assignment.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-exploration --brief <experience_brief.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs prepare-critic --ledger <candidate_ledger.yml> --attempt <review_attempt_id> --out <critic_base.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-designer-action --ledger <candidate_ledger.yml> --action <designer_action.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-workflow-record --record <workflow-record.yml> [--through <phase>]
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-round --dispatch <dispatch.yml> --decision <decision.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate --ledger <candidate_ledger.yml>
```

脚本只做结构门禁，不产生专业结论。

## 阶段一：authority 与上下文

Controller 只读固定入口 `<prototype-root>/docs/design_handoff.yml`，解析并规范化：

- required docs；
- workflow authority docs；
- 工具命令和输出边界；
- source boundary；
- 最终发布路径；
- workflow execution phase。

写入 `authority/authority-manifest-vNNN.yml`。不得用“原型根目录”作为宽泛读取授权。

Controller 同时冻结 `authority/human-brief-vNNN.yml`，至少包含：

- 完整人类请求与体验种子；
- target difficulty 和课程位置；
- 全部有序前序引用；
- prototype-specific routing / mode；
- archive redesign 等显式授权；
- 允许/禁止来源；
- 当前人类反馈。

fresh 上下文审计员只读取上述白名单文件，交付 `context/context-vNNN.yml`，记录规则、胜利条件、对象/事件语义、玩家前序、允许机制、工具、workflow phases、最终写入目标、冲突与 provenance。

authority 缺失、workflow 无 `execution_phase`、runtime 语义冲突或最终目标不明确时必须 `blocked`。

## 阶段二：首批材料与归档校准

上下文通过后并行启动：

- task-local Explorer：尽快发布首个非空输入、runtime-backed 的材料 batch；
- 持续 Designer：读取完整 clean archive index/retrieval summaries、全部明确审美 1 分原评语，并完成独立归档校准。

首个 batch 验证后，Controller 立即冻结 `lexicon-snapshot-vNNN.yml` 并恢复 Designer，不等待 Explorer 其它无依赖采样。

## 阶段三：唯一候选

持续 Designer 在一个工作台中制作、实跑、重读和修订唯一候选。只在完整自查后发布不可变 exact、canonical replay、原始证据和 submission packet。

Designer 需要局部材料时：

1. 交付与坐标、包装无关的 request；
2. Controller 校验并调度持续 Explorer；
3. Designer 可继续不依赖该材料的工作；
4. Explorer 发布后，Controller 冻结新 lexicon snapshot；
5. 只恢复依赖该 snapshot 的 Designer 工作。

未发布草稿不登记 exact。

## 阶段四：硬证据与 Critic 校准

每个 exact 启动未参与设计、未核验其它 exact 的 fresh Evidence Reviewer。

同时，Controller 独立选择 clean archive 并生成：

```text
calibration/source-selection-vNNN.yml
calibration/stage-local-difficulty-vNNN.md
calibration/cross-stage-aesthetic-vNNN.md
calibration/projection-audit-vNNN.yml
```

`source-selection` 记录完整来源集合和分类理由。`projection-audit` 必须证明：

- 两类来源互斥；
- 两类 view 合计覆盖所选 clean archive；
- 阶段内 view 覆盖全部有序前序；
- 跨阶段 view 不含结构化难度元数据；
- 来源不是 Designer 代选 anchors。

硬证据非 `supported` 时，下一 assignment 向持续 Designer 发 `revision`。硬证据和投影审计都通过后才能组装 Critic packet。

## 阶段五：单次 Critic

Controller 运行 `prepare-critic`，然后启动一名 fresh Critic。它只读白名单 packet；同一 exact 不得出现第二名 Critic。

- `当前 exact 值得进入待玩。`：登记 `accept_candidate`，停止设计；
- `当前 exact 应退回同一候选继续设计。`：发 `review_response`。

新 exact 重跑完整硬证据和 Critic。旧 Critic、修改说明和 Designer action 不进入新 packet。

## 阶段六：提交前 workflow

每个 `kind: pre_submission_check` 必须由 authority 明确声明：

```yaml
execution_phase: pre_delivery | delivery_staging | delivery_transaction | post_delivery_verification
```

`pre_delivery` 在 staging 前执行；`delivery_staging` 只在 task-local prototype mirror 中执行；`delivery_transaction` 只在原子提交中执行；`post_delivery_verification` 在已提交实物上核验。缺失时阻塞，不由 Controller 猜测。

`pre_delivery` workflow 按依赖和写集构造 DAG 波次；互不依赖且写集不相交的 assignment 并行。

会影响 layout、start、goal、胜利条件、核心机制使用或玩家关系的 workflow 只能分配给持续 Designer。Workflow Worker 遇到语义性变化必须停止。Designer 重新完成玩家侧重读、canonical replay、解族自查和 submission packet，发布新 exact，并回到硬证据阶段。

只有 authority 预先声明为语义保持的确定性变换，并列出结果契约和必需复验，才允许不同 delivery version 保留 review。

全部 workflow 结果按阶段汇总为唯一当前 `pre-submission/workflow-record-vNNN.yml` 快照；每份记录声明 `record_version`、`supersedes_ref` 和 `completed_through`，后续 phase 创建下一版本，不覆盖旧记录。账本 `pre_submission_check_ref` 只能引用最新聚合记录。每个快照都必须通过 `validate-workflow-record`。

## 阶段七：两阶段 delivery

### 1. Stage

所有 `pre_delivery` 检查完成且当前聚合快照通过 `validate-workflow-record --through pre_delivery` 后，fresh Delivery Operator 只向 task-local `delivery/staging-vNNN/` 写与仓库相同相对结构的 prototype package mirror，并复制 runtime 校验所需的只读 schemas；执行 `delivery_staging` workflow，并记录：

- 每个最终目标的旧 SHA-256 或 `absent`；
- staging 新 SHA-256；
- 原子提交顺序；
- recovery 包；
- source/id 和 queue 计划；
- 构建日志。

不得写最终 levels、queue 或 playable 目标。

### 2. Pre-commit verification

fresh、不同实例的只读 Verifier 核验 staging、唯一目标条目、source/id、queue 计划、构建、证据新鲜度、最终白名单和 recovery 完整性。

失败只丢弃 staging，不影响原型最终状态。

### 3. Atomic commit

Verifier `supported` 后，Delivery Operator 按已经验证的清单提交最终目标并执行 `delivery_transaction` workflow。目标文件必须先写同目录临时文件再原子替换；任一步失败均用 recovery 包恢复旧状态。

此时账本仍为 `playtest_status: not_queued`；不得提前声称待玩交付完成。

### 4. Post-commit verification

第二名 fresh、不同实例的只读 Verifier 核验已提交 levels/playable、pre-commit 已验证的 queue staging，并执行或核验 `post_delivery_verification` workflow。

失败时先由 fresh 补偿 Operator 恢复旧目标，再返回提交前或 delivery；Controller 不直接修复。

通过后，Controller 先生成包含所有 phase 结果的最终聚合快照并验证整体完成。Delivery Operator 随后只能原子激活完全相同的预验证 queue staging；Controller 机械核验激活后的 digest、source/id 和状态。匹配后才登记：

```text
delivery_state = queue_activated
playtest_status = pending_playtest
task_state = ready_for_playtest
```

并生成人类交接。

## 决策表

| 已验证结果 | 唯一允许决策 |
|---|---|
| authority/context 缺失或冲突 | 保持 briefing，补 authority 或阻塞 |
| Explorer batch completed | 冻结 lexicon snapshot，解锁依赖它的设计工作 |
| Designer needs_input | 调度合法局部 request |
| Designer 发布 exact | 冻结 exact，启动硬证据与校准投影 |
| 硬证据非 supported | 发 revision |
| 硬证据与投影审计 supported | 准备 Critic |
| Critic 退回 | 发 review_response |
| Critic 接受 | accept_candidate，停止设计 |
| workflow 产生语义变化 | 返回 Designer，发布新 exact |
| pre-commit supported | 允许 atomic commit |
| post-commit supported | 允许原子激活预验证 queue |
| queue activation digest/source/id 匹配 | 登记 pending_playtest |

Controller 不平均、投票或改写专业结论。

## 失败、纠偏与替换

一组中部分 assignment 失败时，有效结果照常登记；只重试失败项。

明显漂移时：

1. 结果无效，不进入权威状态；
2. 下一份 assignment 可向原实例做一次短纠偏，只重申 assignment、authority、防火墙和写集；
3. 纠偏是新 assignment 和新结果，不覆盖旧失败记录；
4. 再次失败则关闭实例，使用 fresh 替代；
5. 不把污染聊天摘要传给替代实例。
