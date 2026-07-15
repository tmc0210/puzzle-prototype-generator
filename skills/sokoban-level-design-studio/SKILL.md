---
name: sokoban-level-design-studio
description: 围绕人类给出的体验种子，为类推箱子特定原型设计、独立交叉审查并提交 baseline/application/combination/challenge 关卡作品集。适用于启动持续的 experience-core explorer、执行逐关内层设计循环、强制 designer 送审包与硬证据审查、让 fresh reviewer 盲审整批实际关卡、处理 designer_action_N/review_N+1、完成原型专属提交前工作流并接入待玩列表；不用于原型实现、通用机制挖掘或归档排版。
---

# Sokoban Level Design Studio

## 必读材料

开始前完整读取：

- `docs/17-experience-core-level-design.md`
- `docs/21-level-design-studio-standard.md`
- 当前原型 `docs/design_handoff.yml` 及其 required docs
- `references/experience-brief-template.md`
- `references/portfolio-template.md`
- `references/submission-packet-template.md`
- `references/designer-action-template.md`
- `references/pre-submission-workflow-template.md`
- `references/human-handoff-template.md`

当前主 agent 同时承担 designer 与 controller：前者负责创作和回应审查，后者负责版本、批次、角色派遣、提交前工作流和交付。后台材料探索调用 `$sokoban-experience-core-explorer`；硬证据审查调用 `$sokoban-evidence-reviewer`；玩家侧整批审查调用 `$sokoban-level-reviewer`。这三个角色必须由主 agent 之外的 fresh agent 承担。

## 启动

1. 确认这是特定原型关卡设计任务，建立任务目录。
2. 立即派遣不继承设计对话的 fresh explorer。只提供体验种子、玩家前序、允许机制、规则与工具入口、source boundary 和任务目录。
3. Designer 与 explorer 并行完成宽归档校准：完整读取 index/retrieval summaries、所有明确审美 1 分人评，以及若干相关正例、下界和实际布局。Explorer 尚未发布首批材料时可以继续扩读。
4. 已验证最小 witness 只是开始读取材料的必要条件，不足以直接开始 baseline。只有当前材料已经支持一个完整作品时才进入正式布局；不需要等待 explorer 停止。
5. 保存 explorer 任务标识。它进入 `idle_waiting_request` 或 designer 出现具体材料缺口时，继续同一 explorer。

## 逐关内层循环

除非 human brief 改变范围，目标批次包含 baseline、application、combination、challenge 各一个当前候选。一次只推进一个候选。

每个候选依次执行：

1. 读取最新 `material_board.md`。
2. 查看批内已有作品的实际布局和 exact replay。
3. 在 `portfolio-template.md` 中声明当前 slot、本关准备增加的玩家体验、与已有作品的具体差异，以及移除本关会损失的体验。
4. 画第一版布局、replay、从玩家侧重读、运行必要硬证据并修订。
5. 第一版不得直接送审；仍有明确同题改进方向、未知硬事实或只是最小 witness 包装时继续设计。
6. 当前结构失败时，换一个实质不同的结构继续同一 slot，不把失败结构拼接成更长关卡。
7. 按 docs/21 的“解族唯一性送审门”完成 `solution_uniqueness` 自查；发现非等价胜解或无法证明已知多解等价时继续修订，不得送审。
8. 达到正式承诺状态后，完整填写 designer 送审包并完成该 exact version 的独立硬证据审查。

当前候选硬证据为 `supported` 后再推进下一个 slot。四个方向用于打开不同创作可能性，不要求分类排他；但每个实际作品必须足以承担它预先选择的 slot。

## Fresh 整批审查

所有当前候选硬证据受支持后，controller 从实际产物重新组装 reviewer raw packet。必须包含 slot 名、整批实际布局、solve instances、非空 exact inputs 和同 inputs 的机械回放；不得包含当前关卡声明、送审包、explorer 材料、slot 理由、修改历史、旧审查或 designer 解释。

Fresh `$sokoban-level-reviewer` 同时判断：

- 每关是否是完整、没有明确非补偿缺点的作品；
- 每关是否实际足以承担对应 slot；
- 批内关卡是否具有实质不同的玩家体验。

它只判断当前批次中的具体单关、slot 和同质问题；是否继续扩展作品集由 designer 持续创作和人类试玩决定。

## Designer action 与重审

每轮审查后必须填写 `designer_action_N`。若任何候选修改或替换：

1. 形成新 exact version；
2. 填写新送审包；
3. 重跑该版本必要硬证据；
4. 使用从未看过该版本的新 reviewer，对包含全部当前候选的完整批次执行 `review_N+1`。

不把旧 reviewer、designer action 或修改说明传给新 reviewer。`reject_candidate` 后 slot 保持 `designing`；designer 必须在同一 slot 修订、换结构或向 explorer 提出具体材料请求。只有人类可以把 slot 改为 `human_closed`。

## 提交前工作流与待玩交付

整批审查存活后，必须逐项处理 `design_handoff.yml` 中所有 `kind: pre_submission_check`：读取 authority docs，实际判断适用性、执行规定动作并保存 artifact。它可以是只读验证，也可以包含 authority docs 明确规定的操作；本 skill 不预设其目的、对象或修改方式。不能用目测或自填确认跳过；不适用项也要记录可核验依据。

只读 workflow 完成后保留既有 review。若 workflow 改变 exact version，只有 authority docs 事先明确允许该类变换保留 review，且本次满足其全部操作边界、必需复验和不变量时，才可把结果作为 delivery version；其它变化必须返回内层循环、必要硬证据审查和新的整批 review。使用 `pre-submission-workflow-template.md` 记录实际结果，不把某一原型的规则迁移到其它原型。

完成后必须同时：

- 写入 `studio/levels.yml` 或 `levels.yml`；
- 加入 `playable_queue.yml`，状态为 `pending_playtest`；
- 重建 playable 并确认 source/id 可解析；
- 按 `human-handoff-template.md` 输出简报，逐项列出提交前检查及 artifact refs。

只有人类试玩可以填写 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。简报、YAML 自报状态或文件存在不能替代实际交付。
