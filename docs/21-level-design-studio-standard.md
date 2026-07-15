# 关卡设计工作室执行标准

状态：当前特定原型关卡作品集执行合同。

设计方法见 [玩家体验核心与关卡包装方法论](17-experience-core-level-design.md)，各产物的唯一模板入口见 [关卡设计工作室模板索引](20-level-design-studio-templates.md)。

## 第一性原则

流程保留两个不可合并的循环：designer 先在内部反复设计和修订，达到正式承诺状态后，再由不读取这些承诺的 fresh reviewer 交叉审查整批实际作品。

```text
human experience seed
-> fresh explorer 持续发布任务内材料
-> designer 独立校准归档
-> 逐关内层 Design Studio
-> 每关强制送审包与独立硬证据审查
-> fresh reviewer 盲读整批实际关卡
-> designer_action_N
-> 修改后进入新的整批 review_N+1
-> prototype-specific pre-submission workflows
-> 接入待玩列表
-> 人类试玩与最终编排
```

任何角色都不能自行授予下一阶段资格。

## 适用范围

本流程只处理特定原型的关卡设计，不实现原型，不修改通用 runtime。开始前确认规则、胜利条件、对象语义、玩家前序、允许机制、工具边界、`design_handoff.yml` 和本轮允许来源。影响 runtime 语义的问题必须先解决。

## 角色与权限

### Experience-core explorer

从人类体验种子构造最小 witness，使用手摆、runtime、短输入、solver 和矿工、临时脚本持续生产任务内材料。它不读审美归档，不设计正式候选，不给材料分档，不执行审查，也不更新全局 lexicon。

### Designer / controller

由同一个主 agent 兼任两个职责切面：作为 designer，完成归档校准、选择 explorer 材料、定义体验核心与作品身份、逐关设计、填写送审包并处理 `designer_action_N`；作为 controller，维护任务、版本和批次边界，从实际产物组装 reviewer 白名单输入，派遣 fresh reviewer，运行原型专属提交前工作流，并把满足硬门的 delivery versions 实际接入待玩列表。

下文的 `Designer` 与 `Controller` 都指这个主 agent 在不同动作中的职责，不表示两个独立 agent。主 agent 不能兼任 explorer、independent evidence reviewer 或 independent level reviewer，也不能用设计解释覆盖独立 verdict。

### Independent evidence reviewer

逐关核验 exact version 的可解性、解族、旁路、事件、对象参与和作品身份机械条件。它不评价审美、slot 或整批差异，不读取 designer 的包装说明。

### Independent level reviewer

用 fresh context 读取整批 slot 名、实际布局和非空 exact inputs 的机械回放，并独立选取少量 human-reviewed archive 样本校准。它逐关判断完成质量，同时比较 slot 是否成立及批内玩家体验是否实质不同；不读取 experience brief、explorer 材料、designer 送审包、slot 理由、attempt log、旧审查或修改说明。

### Human designer / curator

试玩待玩版本，决定哪些作品进入游戏、怎样排序，以及是否结束某个 slot 的设计。只有人类可以产生 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`，也只有人类可以把仍无存活版本的 slot 关闭。

## 启动与并行探索

### 1. 启动 explorer

人类可以只给一个结构或现象，例如“C 形黏块”，不需要给出最小 witness。Controller 建立任务目录，写 exploration brief，并以不继承设计对话的 fresh agent 启动 `$sokoban-experience-core-explorer`。

Explorer 只收到体验种子、玩家前序、允许机制、规则与工具入口、source boundary 和任务目录。不要把审美归档、旧候选或 designer 的关卡设想传给它。

Explorer 首先构造可运行的最小 witness，用非空输入保存动作前后局面，用近邻反事实标明已经证明和尚未证明的关系，然后立即发布 `material_board.md`。之后按批继续探索，不等待所谓“空间穷尽”。

### 2. Designer 并行校准

Designer 不等待 explorer 完成，同时：

1. 完整读取当前原型 clean human-reviewed archive 的 index 或 retrieval summaries；
2. 读取所有明确审美 1 分样本的人类原评语；
3. 自行选择并读取若干与当前体验核心、包装或 slot 相关的正例、下界和边界原评语；需要判断具体包装或撞题时打开实际布局；
4. Explorer 首批材料尚未发布时，可以继续扩读其它 human-reviewed 样本，而不是提前画布局；
5. 确认玩家前序、规则范围和已有相关关卡。

Index 摘要只用于定位，不能替代实际选中样本的人类原评语。未归档 report、旧 critic、designer 自评和工具结论不能校准审美。Independent level reviewer 不需要复制 designer 的宽读策略，但必须自行选取少量正反样本，不能只接受 designer 选择的 anchors。

### 3. 持续协作

Designer 完成校准时若 explorer 尚未发布已验证 witness，等待首次发布，不先画正式布局。此后在声明每个新关卡和处理每次 `designer_action_N` 前读取最新材料面板；正在验证或送审的 exact version 不因后台新结果而静默变化。

Designer 可把具体材料缺口或探索方向写入 `explorer_requests.md`。Explorer 只返回材料，不替 designer 修改正式候选。Explorer 连续两批切换不同方向、完成实际实验而没有新材料时，可以进入 `idle_waiting_request`，等待 designer 给出新的具体问题。

## 内层：逐关 Design Studio

除非 human brief 明确改变范围，目标批次包含 baseline、application、combination、challenge 各一个当前候选。Designer 一次只推进一个候选，不同时摊开多个半成品；当前候选失败时以新的实质设计替换它，而不是默认增加同 slot 的候选数量。

每个候选在送审前必须完成：

```text
读取最新材料
-> 重新查看当前批次已有作品的实际布局与解法
-> 声明本关准备增加的玩家体验和与已有作品的具体差异
-> 提出结构假设并画第一版布局
-> replay 实际输入
-> 从玩家侧重读开局、选择、回报与结束
-> 运行必要硬证据
-> 修订同一候选，或关闭候选并换一个实质不同的结构
-> 达到可正式承诺状态后才填写送审包
```

第一版布局不能直接送审。只要 designer 仍能指出明确的同题改进方向、硬事实仍未知，或成品只是把最小 witness 封在显然操作中，就必须继续内层循环。

### Baseline

当现有材料足以支撑完整、直接、低风险的作品时，填写 experience brief 和当前关卡声明，再开始正式布局。Baseline 的“最小”不是步数、地图或对象数量最少，而是没有明确的同题改进方向；接近最小 witness 的显然操作不能作为 baseline。

使用 exact replay 检查开局、准备、核心回报和收束，再用 solver、graph、bypass、uniqueness 与 identity counterfactual 修硬问题。若唯一解修订淹没核心，关闭当前候选并换结构，不追加无关子题。

### 后续方向与连续作品观

Baseline 形成后，依次设计 application、combination、challenge。方向定义以 docs/17 为准；实际作品可以同时具有多种性质，但必须足以承担本轮预先选择的 slot。四个 slot 使用同一完成质量标准，baseline 不因保守或先做而豁免显然操作、无意义走位和其它可感缺点。

开始每个后续关卡前，designer 必须根据当前批次的实际布局和解法写清：

- 本关准备增加哪一种玩家可感体验；
- 它与每个已有作品的具体差异；
- 如果移除本关，连续游玩时会损失什么体验。

只增加少量操作、扩大地图或替换几何外形，不构成新的玩家体验；与 baseline 几乎失去可辨认的共同核心，也不能靠 slot 名维持作品集关系。

“整段是否已经穷尽所有主要可能性”不可可靠验证，因此连续作品观只作为 designer 的正向创作总纲；具体流程仍由当前候选状态和人类决定。

## 解族唯一性送审门

这里的唯一解不是原始输入序列唯一，而是玩家逻辑类唯一。纯走位差异、回到同一完整游戏状态且不改变后续关系的完整回返环、规则与目标下的真实对称重标号，以及相互独立的必要步骤换序，可以属于同一逻辑类；它们必须保持相同的对象职责、目标分配和依赖步骤的因果先后。

Designer 在填写送审包前必须完成 `solution_uniqueness` 自查，结果只能是：

- `unique_complete`：完整搜索或完整状态图只留下一个玩家逻辑类；
- `unique_within_budget`：搜索运行到明确记录的预算，未发现非等价胜解；这只声明预算内结果，不得伪装成完整证明；
- `equivalent_variants_only`：发现了多条原始胜路，但引用的实际证据足以说明它们之间只有上述等价差异。

发现任一非等价胜解，或已知存在多条胜路却不能证明它们只属于同一逻辑类时，当前 exact version 不能送审。路线更长、更难自然发现或只损害更高审美目标，都不能把 bypass 降级为 caveat；一个 exact 反例已经足够，无需继续枚举全部旁路。

送审包必须记录结果、搜索范围或预算、已知原始胜路、等价性说明、证据引用与边界。Independent evidence reviewer 只审计该声明是否被当前 exact version 的原始 artifact 支持，不替 designer 搜索或补证。唯一性审查不是 `supported` 时，当前候选返回 Design Studio，不能进入整批 level review。

## 外层：整批 Review Loop

### 1. 强制 designer 送审包

每个拟提交 exact version 必须完整填写 designer 送审包，固定 designer 自己对体验核心、作品身份、包装、slot、已知问题、`solution_uniqueness` 和证据边界的承诺。缺送审包或唯一性结果不属于三个合法值时，仍是 working material。

送审包不发送给 independent level reviewer，也不能作为 reviewer raw packet 的摘要来源。

### 2. 独立硬证据审查

Controller 从每个实际 exact version、规则合同和原始 artifact 另组硬证据包，只从 designer 送审包提取 `solution_uniqueness` 机械声明及其引用，不传递包装、slot 辩护或审美说明。Fresh evidence reviewer 逐关核验可解性、`solution_uniqueness`、旁路、事件、对象参与和机械身份条件。

任一当前候选的 `overall_hard_status` 不是 `supported` 时，该候选回到内层 Design Studio；整批暂不发送给 level reviewer。

### 3. Fresh 整批玩家侧审查

所有当前候选硬证据受支持后，controller 从规则、slot 名、整批实际布局、solve instances、非空 exact inputs 和由同一 inputs 机械 replay 的逐步状态重新组装 raw packet。

Raw packet 禁止包含 designer 声明、slot 理由、explorer 材料、指标、旧审查或 controller 总结。Fresh reviewer 必须独立完成三项判断：

1. 每关是否是没有明确非补偿缺点的完整作品；
2. 每关实际是否足以承担其 slot；
3. 批内作品是否提供实质不同、不可用形式差异冒充的玩家体验。

Reviewer 不要求分类排他，也不判断设计空间是否穷尽。它对每个 exact version 输出 `survive_to_pre_submission_checks`、`revise_and_rereview` 或 `reject_candidate`，并输出整批比较结果。

### 4. Designer action 与下一轮

Designer 必须根据独立 artifacts 写 `designer_action_N`，逐项决定修订当前候选、撤回并在同 slot 开始新候选，或推进存活批次。Designer 的辩护不能覆盖 verdict。

修改 layout、start、goal、对象、核心操作或玩家关系后形成新 exact version，重新填写送审包并重跑该版本必要硬证据。之后用新的 reviewer 实例盲审包含所有当前候选的完整批次，形成 `review_N+1`；不把旧 reviewer、修改说明或 designer action 传给新 reviewer。

`reject_candidate` 只关闭当前候选，slot 继续保持 `designing`。下一步必须是修订、同 slot 替换或向 explorer 提出定向请求；只有人类可以把 slot 改为 `human_closed`。

## 原型专属提交前工作流

整批 level review 存活后，必须读取当前原型 `design_handoff.yml`，逐项处理所有 `kind: pre_submission_check` workflow。它可能是只读验证，也可能包含 authority docs 明确规定的操作；通用流程不预设其目的、检查对象或修改方式。适用性必须按 workflow 的 positive conditions 和 authority docs 实际判定，不能用 designer 目测或自填结论跳过。适用项执行规定动作并保存原始 artifact；不适用项记录可核验依据。

这些 workflow 由 controller 在 level review 之后独立运行，不转交 evidence reviewer 或 level reviewer。每项结果都要记录 reviewed exact version、实际操作、产物引用、delivery exact version，以及 authority docs 对版本和审查效力的规定。

- 只读 workflow 不改变 reviewed exact version，完成后保留既有 review。
- 若 workflow 改变 exact version，只有 authority docs 事先明确规定该类变换可保留 review，且本次满足其全部操作边界、必需复验和不变量时，才可产生 delivery version 并保留 review。
- 其它任何版本变化都属于新的设计版本，必须回到内层 Design Studio、必要硬证据审查和新的整批 Review Loop。

使用提交前工作流记录保存上述判断。通用层不得自行发明某种操作的安全性，也不得把一个原型的检查或变换规则套用到另一个原型。

## 待玩交付

Controller 只按 artifacts 检查：

```text
all_submission_packets = complete
all_solution_uniqueness_reviews = supported
all_independent_hard_evidence = supported
latest_full_batch_level_review = survived
all_pre_submission_checks = completed_or_recorded_not_applicable
all_pre_submission_workflow_records = completed
all_delivery_version_evidence = current
```

满足后把 delivery versions 写入 `studio/levels.yml` 或 `levels.yml`，加入 `playable_queue.yml`，使用 `status: pending_playtest`，重建 playable 并确认 source/id 可解析。交付简报逐项列出提交前检查及 artifact refs，但文字简报不能替代实际待玩交付。

## 状态

```text
slot_state: designing | review_survived | delivered | human_closed
candidate_state: designing | hard_validated | review_survived | candidate_rejected
review_state: not_submitted | evidence_review_required | batch_review_required | revise_required | candidate_rejected | survived
pre_submission_state: not_started | incomplete | completed
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
```

Designer/controller 不能产生独立 review 状态，reviewer 不能关闭 slot，designer/controller 也不能代替人类填写试玩结果。任何状态都不表达审美等级。
