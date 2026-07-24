# 轮次调度协议

本文由 [唯一入口](README.md) 路由，不可单独作为主流程入口。

## 轮次屏障

轮次是唯一并发单位。轮次控制器先固定整轮输入和允许写入范围，再启动本轮全部子 Agent；启动后不得追加 assignment，也不得因为某个 Agent 提前完成而启动下一轮。

```text
round_open
  -> assignments_frozen
  -> agents_started
  -> waiting_for_all
  -> results_terminal
  -> results_validated
  -> decision_recorded
  -> round_closed
```

合法结果终态：

- `completed`：要求的专业产物已经交付。
- `needs_input`：当前 assignment 已完成可做部分，但需要由轮次控制器在下一轮提供新材料。
- `blocked`：合同内无法继续，必须明确不可自行解决的阻塞条件。
- `failed`：执行错误、证据无效、越权或信息污染使本次结果不可采用。

`running`、聊天中断、无结果文件或只有自然语言回复都不是终态。轮次控制器不得把 `needs_input` 当作失败，也不得把 `blocked` 改写成专业结论。

## 每轮文件顺序

1. 写 `dispatch.yml`，列出本轮目标、前置 decision 和完整 assignment 集合。
2. 为每个子 Agent 写独立 assignment，冻结输入引用和写入范围。
3. 同时启动或恢复本轮 Agent。
4. 等待全部 assignment 产生结果信封。
5. 检查结果终态、版本对应、输入 provenance、输出路径和禁止字段。
6. 把可采用产物写入 `summary.md`；失败、阻塞和污染也必须保留。
7. 写唯一 `decision.yml`，记录采用的结果、状态转换和下一轮意图。
8. 关闭本轮；只有此时才能创建下一轮目录和 dispatch。

轮次控制器可以调用现有脚本执行确定性检查：

```text
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-assignment --assignment <designer_assignment.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-exploration --brief <experience_brief.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs prepare-critic --ledger <candidate_ledger.yml> --attempt <review_attempt_id> --out <critic_base.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-designer-action --ledger <candidate_ledger.yml> --action <designer_action.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate --ledger <candidate_ledger.yml>
```

脚本输出只是结构门禁，不产生设计、证据或审美结论。

## 固定调度时序

### 阶段一：上下文

首轮只启动一个 fresh 原型上下文审计员。它读取当前原型的 `docs/design_handoff.yml`、required docs、规则、胜利条件、对象语义、玩家前序、允许机制、工具入口和 source boundary，交付 `context-v001.yml`。

若存在 runtime 语义冲突或 authority 缺失，结果为 `blocked`，任务不进入设计阶段。上下文发生获授权的事实变更时新增 `context-v002.yml`，不得覆盖旧版本。

### 阶段二：首批材料与归档校准

上下文通过后，同一轮并行启动：

- task-local Explorer：发布首批最小、非空输入、runtime-backed 的局部结构材料；
- 持续 Designer：读取 clean archive 并完成可独立进行的归档校准。

Designer 尚未得到首批 lexicon 时可以返回 `needs_input`，并把进度文件留在其工作目录。轮次控制器等待 Explorer 同轮结束，写 decision；下一轮以同一 assignment 或明确延续 assignment 恢复同一 Designer，将已验证 lexicon 加入允许输入。

### 阶段三：唯一候选

持续 Designer 在一个工作台中制作、实跑、重读并修订唯一候选。它只有在完整自查后才发布不可变 exact 和送审包。

若 Designer 需要新局部材料：

1. 本轮结果写 `needs_input` 和坐标、包装无关的 exploration request；
2. 轮次控制器关闭本轮；
3. 下一轮恢复同一 Explorer 执行 request；
4. Explorer 结果收口后，再下一轮恢复同一 Designer。

不得在 Designer 仍修改工作布局时把未发布草稿登记为 exact。

### 阶段四：硬证据

每个已发布 exact 启动一名未参与该版本设计的 fresh Evidence Reviewer。输入严格使用当前 exact、规则合同、送审包中抽取的机械声明和原始工具 artifact。

- `overall_hard_status: supported`：轮次控制器登记 `hard_validated`。
- 其它状态：下一轮向持续 Designer 发 `revision` assignment。

Evidence Reviewer 不补跑证据，证据不足必须保留为 `unknown`。

### 阶段五：单次 Critic

硬证据通过后，轮次控制器用现有 `prepare-critic` 命令生成白名单 packet，并在下一轮启动一名 fresh Puzzle Critic。Critic 只读该 packet；同一 exact 不得出现第二名 Critic。

- `当前 exact 值得进入待玩。`：登记 `accept_candidate`，停止设计。
- `当前 exact 应退回同一候选继续设计。`：下一轮恢复持续 Designer，发 `review_response` assignment。

新 exact 必须重新经过 fresh Evidence Reviewer 和 fresh Critic；旧 Critic、Designer action 和修改说明不进入新 packet。

### 阶段六：提交前波次

轮次控制器读取当前原型 `design_handoff.yml` 中全部 `kind: pre_submission_check` workflow，按显式依赖关系构造拓扑波次：

- 同一波只放互不依赖、写入路径不重叠的 workflow；
- 设计判断交给持续 Designer；
- 非设计类只读、机械或构建动作交给 fresh Workflow Worker；
- 一波全部结束并写 decision 后，才能启动下一波。

任何 workflow 改变 exact，都必须报告 `version_effect` 和 `review_effect`。若 authority 未明确允许保留 review，轮次控制器创建新 exact，返回硬证据阶段。

### 阶段七：交付与复验

提交前检查全部完成后：

1. 启动一个 fresh Delivery Operator，接入唯一 delivery version、更新 queue 并执行原型指定构建。
2. 该轮收口后，下一轮启动不同实例的 fresh Delivery Verifier。
3. Verifier 只读核验 source/id、queue entry、playable build、版本引用和证据新鲜度。
4. 通过后，轮次控制器登记 `pending_playtest` 并生成人类交接。

Delivery Verifier 失败时不得由轮次控制器直接修复。根据失败类型返回提交前 workflow 或重新启动 fresh Delivery Operator。

## 决策规则

轮次控制器只作合同定义的路由与状态决策：

| 已验证结果 | 唯一允许决策 |
|---|---|
| 上下文缺失或冲突 | 保持 briefing，补充 authority 或阻塞 |
| Explorer `completed` | 登记材料引用，允许 Designer 下一轮读取 |
| Designer `needs_input` | 调度其合法局部 request |
| Designer 发布 exact | 冻结版本，进入硬证据轮 |
| 硬证据非 supported | 发 revision，返回同一 Designer |
| 硬证据 supported | 登记 hard_validated，准备 Critic |
| Critic 退回 | 发 review_response |
| Critic 接受 | 登记 accept_candidate，停止设计 |
| workflow 要求重审 | 形成新 exact，返回硬证据轮 |
| delivery verification supported | 登记 pending_playtest |

轮次控制器不得把多个专业 Agent 的意见平均、投票或改写成自己的作品判断。

## 失败、纠偏与替换

一轮中部分 assignment 失败时，先等待其它 assignment 正常收口。有效结果照常登记；下一轮只补发失败项。

明显漂移时：

1. 本次产物标记为无效，不进入权威状态；
2. 原 Agent 仅允许一次短纠偏，内容只重申 assignment、authority、输入防火墙和允许输出；
3. 再次越界、版本错配或污染时，关闭该实例；
4. 下一轮使用 fresh 替代实例，并只提供干净的文件输入。

不得把旧 Agent 的污染聊天摘要传给替代实例。
