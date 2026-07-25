---
name: sokoban-level-design-studio
description: 围绕一个人类体验种子，为类推箱子特定原型启动、调度并交付一个合格单关候选。作为唯一端到端 Controller，建立 task-local 探索和单候选账本，向独立 `$sokoban-level-designer` 分配体验简报、候选设计、修订和审查回应；调度 fresh Evidence Reviewer 与单次 Puzzle Critic，并在候选接受后执行原型专属机械提交前工作流，直到唯一候选进入待玩交付。不用于亲自设计布局、原型实现、通用机制挖掘或归档排版。
---

# Sokoban Level Design Studio

## 必读材料

开始前完整读取：

- `docs/17-experience-core-level-design.md`
- `docs/21-level-design-studio-standard.md`
- 当前原型 `docs/design_handoff.yml` 及其 required docs
- `../sokoban-mechanism-lab/references/task-exploration-format.md`
- `../sokoban-puzzle-critic/references/critic-contract.md`
- `references/experience-brief-template.md`
- `references/candidate-ledger-template.md`
- `references/designer-assignment-template.md`
- `references/submission-packet-template.md`
- `references/designer-action-template.md`
- `references/pre-submission-workflow-template.md`
- `references/human-handoff-template.md`

`docs/21` 是完整正向流程的唯一来源；`docs/17` 是设计本体与结构修订方法的唯一来源。Controller 只控制流程、调度、输入边界和状态，不替 Designer 设计，不替独立审查者产生或解释结论。

## 唯一候选不变量

每个任务固定一个 `candidate_id`、至多一个最近发布的 exact version 和至多一个 delivery version。首次发布前 exact 可以为空；Designer 的工作布局不登记版本。更换 structure family 仍服务同一体验简报和 candidate id。

任何角色都不能创建候选数组、并行设计、派生版本关系或第二个待玩入口。候选被接受后停止设计；提交前流程只执行原型 authority 预先定义的机械检查与 review-preserving 规范化，不恢复设计或审查。

## 角色与写入边界

| 角色 | 职责 | 唯一写入范围 |
|---|---|---|
| Controller | 启动、assignment、调度、白名单组包、状态转换、提交前编排与交付 | dispatch、单候选账本、Critic packets、提交前总账、levels、queue、handoff |
| Designer | 体验核心、归档校准、唯一候选设计、实跑重读、送审与退回响应 | assignment 指定 artifacts 与 task-local requests |
| Mechanism Explorer | 展开局部结构空间并发布正向设计语料 | task lexicon、index 与 runs |
| Evidence Reviewer | 独立核验当前 exact 的全部硬证据，包括 SCC / graph 声明 | evidence review |
| Puzzle Critic | 在硬证据已支持后，结合完整作品、全部前序和人类归档作一次审美判断 | 最终自然语言批评 |
| Human | 实际试玩并决定作品去留 | 人类试玩状态 |

默认维持一个持续 Designer。Explorer、Evidence Reviewer 与 Critic 由 Controller 实际拉起。每个已发布 exact 使用 fresh Evidence Reviewer 和 fresh Critic；同一 exact 只使用一名 Critic，不做多 Critic 投票。

## Controller 脚本

```text
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-assignment --assignment <designer_assignment.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-exploration --brief <experience_brief.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs prepare-critic --ledger <candidate_ledger.yml> --attempt <review_attempt_id> --out <critic_base.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate-designer-action --ledger <candidate_ledger.yml> --action <designer_action.yml>
node .agents/skills/sokoban-level-design-studio/scripts/level-design-controller.mjs validate --ledger <candidate_ledger.yml>
```

脚本不启动 agent、不解释专业结论，也不自行修改账本。Controller 先校验，再调度或记录转换。

## 固定流程

```text
Controller 建立任务、dispatch 与单候选账本
  -> task-local Explorer
  -> Designer 完成体验简报和唯一候选
  -> fresh Evidence Reviewer 核验完整硬证据
  -> fresh Puzzle Critic 读取完整作品并写一次自然语言 verdict
  -> 接受当前候选，或 Designer 修订同一候选
  -> 提交前流程与唯一待玩交付
```

## 启动、探索与 Designer assignment

1. 确认任务是特定原型关卡设计，读取规则、胜利条件、对象语义、玩家前序、允许机制、工具边界和 handoff；建立任务目录、单候选账本和唯一活动版本槽位。
2. 按 task exploration 合同写 `dispatch.yml`，用 fresh agent 显式调用 `$sokoban-mechanism-lab`，固定 `mechanism_explore` 与 `task_local`。只给体验种子、玩家前序、允许机制、规则、工具入口、source boundary 和任务目录。
3. 不把审美归档、正式 exact、review 或 Designer 设想传给 Explorer。
4. 向 Designer 发 `experience_brief` assignment，使其在 Explorer 工作期间独立完成归档校准。首批已验证 task lexicon 发布后，发一份 `candidate_design` assignment，授权当前阶段的 Designer 工作目录和最终发布位置。
5. 同一活动 assignment 可以恢复调用持续 Designer，覆盖其内部全部草稿、probe 和修订。阶段切换或已发布 exact 被退回时，才写下一份 assignment 并运行 `validate-assignment`。Designer 的局部探索 request 由 Controller 校验抽象边界后再调度 Explorer；候选被接受后不再创建 Designer assignment。

Controller 只验收 assignment 边界、发布 artifact 的存在性、candidate/exact 对齐和流程前置条件。Designer 发布可送审 exact 后，Controller 才登记版本并进入硬证据链。

## 硬证据与单次 Critic

1. 从当前已发布 exact、规则合同和原始 artifact 组装硬证据输入，调用 fresh `$sokoban-evidence-reviewer`。它可读完整 SCC / graph；`overall_hard_status` 不是 `supported` 时，发一份以该 exact 为依据的 `revision` assignment，让持续 Designer 回到工作台。
2. 登记 `hard_validated`。Controller 独立选择 clean archive 来源并生成两类投影：当前目标之前课程阶段的难度校准保留难度分；其余跨阶段样本只保留布局、审美分和人类原评语。两类原始来源与 Critic 可读 view 分别登记到账本，不沿用 Designer 代选的唯一 anchors。
3. 运行 `prepare-critic`。Packet 只含规则、全部有序前序关卡、目标难度、阶段内难度校准 view、跨阶段审美校准 view、当前实际布局、canonical replay 的全部逐步 layout，以及机械证据已经 supported 的事实；不含原始 archive 来源、体验核心、作品身份、送审包、Designer 解释、旧 review、SCC / graph 或自动质量指标。
4. 调用 fresh `$sokoban-puzzle-critic`。它一次读取完整作品并只写一篇自然语言结论；不把 replay 递归拆成逐局面选择，不请求第二阶段机械材料。首句必须严格为 `当前 exact 值得进入待玩。` 或 `当前 exact 应退回同一候选继续设计。`。

难度只作相对当前课程位置的单向下界判断：Critic 只用完整前序和阶段内难度校准确认是否明显低于目标；跨阶段审美 view 不承担难度标尺。不得判断过难，不得把自己没解出或没辨认出关系解释成玩家看不懂、只能试错、线索不足。SCC / graph 只属于 Evidence Reviewer 的硬证据审计，不进入 Critic packet。

## Verdict 与 Designer 响应

- `当前 exact 值得进入待玩。`：Controller 直接登记 `accept_candidate` 并停止设计，不创建 Designer acceptance action，也不继续征询增强方向。
- `当前 exact 应退回同一候选继续设计。`：Controller 发一份 `review_response` assignment；Designer 写出本轮响应后在同一 assignment 内持续修订，直到发布下一 exact、撤回当前 exact 或提出 packet dispute。
- raw packet dispute 只核验实际布局、replay、前序、目标难度或两类校准 view 是否组包错误；Designer 的审美辩护不得回流到 Critic 输入。

下一份 exact 发布后重新运行完整硬证据和 Critic 链，使用没看过该版本的新审查者。旧 Critic、修改说明和 Designer action 不进入新 Critic base。

## 防漂移

每次调度前检查 role、assignment、允许输入、输出位置、candidate id、exact version 和阶段；返回后检查 provenance、artifact refs、写入范围、版本对应和下一阶段资格。

明显漂移时，产物不进入权威状态。向原 agent 发送一次短纠偏，只重申当前 assignment、权威引用和允许输出；纠偏后仍越界或污染信息防火墙时，关闭本次尝试并调度 fresh agent。Controller 不补做专业工作。

## 提交前工作流与交付

候选被接受后，逐项处理 `design_handoff.yml` 中所有 `kind: pre_submission_check`。这些 workflow 只按 authority routing 运行确定性工具，不向 Designer 分配 assignment。authority docs 必须预先固定结构候选算法、允许操作和保持条件；候选发现不得依赖 Designer 判断职责，也不得默认逐格枚举全部普通空地。

只读 workflow 直接保留 acceptance。规范化反事实未证明保持条件时不应用并保留当前 delivery exact；证明完整时才写入新的 delivery version。工具运行不完整只令 workflow 保持 `incomplete` 并重跑。提交前流程没有设计修订或重新审查分支。

交付前验证：

```text
submission_packet = complete
solution_uniqueness_review = supported
independent_hard_evidence = supported
critic_verdict = worth_playtesting
pre_submission_checks = completed_or_recorded_not_applicable
delivery_version_evidence = current
```

满足后，只把一个 delivery version 写入 `studio/levels.yml` 或 `levels.yml`，加入 `playable_queue.yml` 并设为 `pending_playtest`，重建 playable，确认 source/id 可解析，再按 human handoff 交接。只有人类试玩可以填写最终去留状态。
