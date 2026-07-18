# 关卡设计工作室执行标准

状态：当前特定原型体验核心设计树执行合同。

设计方法见 [玩家体验核心与关卡包装方法论](17-experience-core-level-design.md)，各产物的唯一模板入口见 [关卡设计工作室模板索引](20-level-design-studio-templates.md)。

## 第一性原则

流程先证明一个直白 baseline 是成立的关卡，再围绕同一体验核心逐节点生长。父节点一经接受便冻结；后续设计只能形成子节点，不能为了新想法回写旧版本。

Reviewer 在同一轮中依次承担两个不可倒置的阶段：先盲审实际关卡的完成质量并写定 verdict，再读取体验核心、冻结设计树和当前生长关系。存活节点进入完整教练判断；未存活节点只检查继续按阶段 A 修订是否会偏离原方向。阶段 B 不能追改阶段 A verdict。

```text
外层：设计树生长循环
  human experience seed -> baseline 工作节点
  或 冻结节点 + 教练方向 -> 生长工作节点
  -> 调用内层单节点设计循环
  -> 冻结节点后选择下一父节点与方向 / 退回当前设计 / 设计树充分

内层：单节点设计循环
  Design Studio -> exact candidate -> 硬证据 -> 阶段 A -> 阶段 B -> designer_action
  -> 冻结节点 / 回到 Design Studio / 更换结构 family / 撤回工作节点

设计树充分
-> 各冻结节点执行原型专属提交前工作流
-> 接入待玩列表与人类试玩
```

任何角色都不能自行授予下一阶段资格。

## 适用范围

本流程只处理特定原型的关卡设计，不实现原型，不修改通用 runtime。开始前确认规则、胜利条件、对象语义、玩家前序、允许机制、工具边界、`design_handoff.yml` 和本轮允许来源。影响 runtime 语义的问题必须先解决。

## 角色与权限

### Task-local mechanism explorer

由 fresh agent 显式调用 `$sokoban-mechanism-lab` 的 `mechanism_explore` / `task_local` 模式。它把体验种子或 designer 给出的局部结构空间展开为结构谱，使用手摆、runtime、短输入、solver、矿工或临时脚本持续发布任务内正向设计语料。它的权限止于 task lexicon、索引、局部 runs 和下一采样轴；Designer 负责正式节点与玩家侧判断，Reviewer 负责审查，Curator 负责全局 lexicon。

### Designer / controller

由同一个主 agent 兼任两个职责切面。Designer 完成归档校准、定义体验核心与作品身份、制作 baseline 与子节点、填写送审包并回应审查；Controller 维护冻结树和版本边界，从实际产物组装 reviewer 白名单输入，派遣 fresh reviewer，运行原型专属提交前工作流，并实际交付所有待玩节点。

主 agent 负责 designer/controller。Task-local explorer、independent evidence reviewer 和 independent level reviewer 分别由 fresh agent 承担，独立 verdict 保持原文。只有显式调用 `$sokoban-mechanism-lab` 并按 task-local 合同落盘的产物获得 explorer artifact 身份。

### Independent evidence reviewer

核验 exact version 的可解性、解族、旁路、事件、对象参与和作品身份机械条件。它不评价审美，不读取 designer 的包装说明。

### Independent level reviewer / experience-core coach

同一 fresh reviewer 先只根据实际布局、非空 exact inputs、机械回放和独立人类归档校准完成阶段 A 质量门。Verdict 固定后，Controller 才提供体验核心、冻结树与当前生长关系，使其进入阶段 B。

阶段 A 存活时，阶段 B 判断 baseline 与核心是否对齐，或子节点是否非拼接地增加了前序构造或后继应用。阶段 A 未存活时，阶段 B 只防止 designer 沿质量修订把原目的优化掉；它不能冻结节点、判断树充分或改派新方向。两种模式都只用自然语言表达，不输出多方向任务单、布局规格或 deadend 指标。

### Human designer / curator

试玩冻结节点，决定哪些作品进入游戏。只有人类可以产生 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。

## 启动与并行探索

### 1. 启动 task-local mechanism explorer

人类可以只给一个结构或现象，例如“C 形黏块”，无需先给局部结构小图。Controller 建立任务目录，按 `skills/sokoban-mechanism-lab/references/task-exploration-format.md` 写 `dispatch.yml`，并以不继承设计对话的 fresh agent 显式启动 `$sokoban-mechanism-lab`，固定 `intent: mechanism_explore` 与 `publication_scope: task_local`。

Explorer 只收到体验种子、玩家前序、允许机制、规则与工具入口、source boundary 和任务目录。不要把审美归档、旧候选、正式 exact、review 或 designer 的关卡设想传给它。

Explorer 首先构造可运行的直白局面材料，用非空输入保存动作前后局面，用近邻结构谱说明形状、站位、边界和动作结果怎样变化，然后立即发布 task-local `lexicon.md` 与 `lexicon_index.md`。之后按批增加正向材料和结构谱覆盖，不等待所谓“空间穷尽”。

### 2. Designer 并行校准

Designer 不等待 explorer 完成，同时：

1. 完整读取当前原型 clean human-reviewed archive 的 index 或 retrieval summaries；
2. 读取所有明确审美 1 分样本的人类原评语；
3. 自行选择并读取若干与当前体验核心或包装相关的正例、下界和边界原评语，必要时打开实际布局；
4. Explorer 首批材料尚未发布时，可以继续扩读其它 human-reviewed 样本，而不是提前画布局；
5. 确认玩家前序、规则范围和已有相关关卡。

Index 摘要只用于定位，不能替代实际选中样本的人类原评语。未归档 report、旧 critic、designer 自评和工具结论不能校准审美。Independent reviewer 自行选少量正反样本，不接受 designer 代选的唯一 anchors。

### 3. 持续协作

Designer 完成校准时若 explorer 尚未发布首批已验证材料，等待首次发布，不先画正式布局。此后在制作每个节点和处理每次教练意见前读取最新 task lexicon 与索引；正在验证或送审的 exact version 不因后台新结果而静默变化。

Designer 可把局部材料缺口写成 `exploration/requests/<request_id>.yml`。Request 只描述待展开的结构空间和采样轴；完整候选、难度与 family 判断留在 Designer 的正式循环。Explorer 只返回正向结构材料。一批 `new_material_refs` 为空只表示本批新增为零；它继续换采样轴或等待下一份 request。

### 4. Designer 的委派边界

适合委派的工作是局部结构谱、runtime 对照、动作后局面、最小消费结构、近邻变体和原始证据。Designer 必须自己定义体验核心和作品身份，提取并改造材料中的核心逻辑，设计完整 layout 与包装，从玩家侧读取 exact，并判断审美、难度、family 去留和是否送审。

当当前候选暴露材料缺口时，Designer 先把问题改写成与候选坐标和包装无关的设计空间。例如把当前旁路分离成“三格 L 保留操作位、两格替代物失去操作位的局部筛选结构谱”。制作完整候选、修订 exact、方向选择与作品比较由 Designer 自己完成。

Designer 读取各局面卡的结构旋钮、动作后状态和最小用法，自行变形、拼接或重构为完整作品。材料数量、单个 probe 的退化和一批新增为零只描述采样覆盖；结构表达能力由 Designer 在实际改造中判断。

## 外层：设计树生长

### 1. 制作 baseline

Designer 先以首批局部结构语料、体验核心和作品身份作为节点 brief，建立 baseline 工作节点并调用单节点设计循环。Baseline 可以直白，目标是让体验核心被玩家亲自、清楚、集中地完成，而不是提前加入全部可能包装。这里要求的是把当前 baseline 做完整，不要求消除所有未来生长方向，也不因接近某张直白材料卡而自动失败；无意义走位、被动动画、失职对象、弱回报或高潮后劳动仍然是缺点。

### 2. 冻结根节点

Baseline 通过硬证据、阶段 A 质量门，并在阶段 B 被确认与体验核心一致后，冻结为设计树根节点。冻结节点保存 exact layout、replay、送审、硬证据、质量门和教练意见引用；此后不能覆盖。

教练随后只提出一个最值得尝试的生长关系，或判断当前树已经充分。Designer 按这段自然语言建立一个工作中子节点，不把建议拆成字段清单，也不同时实现其它方向。

### 3. 制作子节点

Controller 以一个冻结节点和当前教练意见建立新的工作节点，并调用同一个单节点设计循环。冻结父节点只提供体验核心、作品身份和玩家关系的对照，不是默认地图底稿；是否沿用其局部结构由当前结构 family 决定。工作节点只实现当前教练意见指向的一个关系：

- `construct_prefix`：玩家主动构造体验核心所需的前置局面；
- `apply_suffix`：玩家应用体验核心结果，且后继约束反向改变此前构造判断。

父节点保持冻结。工作节点不能用“只增加了一段”继承父节点结论。失败尝试只写尝试日志，不进入设计树。

机制可以自然进入子节点，教练也可以点名具体允许机制，但它必须服务当前前序选择或后继反约束。机制组合不作为第三种生长类型；如果新机制本身成为主要体验，应另开体验核心和设计树。

## 解族唯一性送审门

这里的唯一解不是原始输入序列唯一，而是玩家逻辑类唯一。纯走位差异、回到同一完整游戏状态且不改变后续关系的完整回返环、规则与目标下的真实对称重标号，以及相互独立的必要步骤换序，可以属于同一逻辑类；它们必须保持相同的对象职责、目标分配和依赖步骤因果先后。

Designer 在每个 exact version 送审前完成 `solution_uniqueness` 自查，结果只能是：

- `unique_complete`：完整搜索或完整状态图只留下一个玩家逻辑类；
- `unique_within_budget`：面向替代胜解或玩家逻辑类的搜索持续到预先声明的预算，在实际搜索范围内未发现非等价胜解；
- `equivalent_variants_only`：多条原始胜路只有上述等价差异，并有实际证据支持。

三种结果描述不同的证据形态，不构成关卡完成质量、复杂度或设计价值的档位。复杂关卡可以正常使用 `unique_within_budget`；它在声明范围内得到 `supported` 后，与其它两个结果拥有相同送审资格。找到首条胜解便停止的普通求解不能支持该结果，搜索必须在首解之后继续寻找替代胜解或逻辑类，直到完成声明范围或达到记录的预算。

发现非等价胜解，或不能证明已知多解等价时，当前 exact version 不能送审。Independent evidence reviewer 只审计当前证据，不替 designer 补搜。唯一性审查不是 `supported` 时，返回内层设计。

## 内层：单节点设计循环

### 1. Design Studio

每个工作节点都完整执行同一个 Design Studio Loop：

1. 根据节点 brief 写出当前玩家关系和结构假设。Baseline 以体验核心和作品身份为目标；生长节点还要把教练指出的一个玩家关系落实为本轮设计问题。目标难度 1—2 至少记录玩家目标和预期机制操作；目标难度 3 以上先写可随设计更新的 reasoning sketch，说明玩家面对的问题、可见前提、预期判断、操作关系和反馈。
2. 读取最新 task-local `lexicon.md`、`lexicon_index.md` 和本轮允许的全局 lexicon 或其它设计语料，按需向持续 explorer 提出局部结构空间 request。材料是非穷尽的词汇与局部启发：有合适关系可以取用或改造，没有则围绕当前结构假设自行构造。
3. 使用手画、runtime、miner、脚本或其它当前原型允许的手段设计 layout，并明确当前 solve instance。工具只寻找、实例化或验证服务于当前设计问题的结构；工具输出本身不是候选。
4. 实际运行非空 replay 和本轮允许的 solver、analyzer、graph 或反事实工具。Designer 亲自读取 exact inputs、逐步状态、事件、对象参与、关键状态变化、图事实和工具边界，而不是只接受摘要或通过状态。
5. 根据实际 layout 与 replay，从玩家侧重读开局看见什么、需要判断什么、局部选择为何不同、关键操作怎样改变后续关系、回报在哪里以及怎样结束；据此更新结构假设和正式设计说明。
6. 若机械事实不支持当前声明，玩家侧读法无法由实际关卡支撑，或当前生长关系没有成立，进入 [玩家体验核心与关卡包装方法论](17-experience-core-level-design.md) 的“结构修订：从差异到结构责任”方法。修订形成新 exact version 后，重新执行实际 replay、证据读取、玩家侧重读和必要 diagnostic；该方法可以导向同一 family 的重构、换 family 或撤回，但不是单节点状态机中的新增阶段。
7. 按本文件的解族唯一性送审门完成当前 exact version 自查。发现非等价胜解，或不能证明已知多解等价时，留在 Design Studio；一个 exact 反例已经足以触发修订，不因路线较长或较难自然发现而降级。
8. 只有当前 exact version 已有可复现 replay、玩家侧读法能够由实物支持、机械声明不超过证据边界且唯一性结果合法时，才填写完整 designer 送审包并进入硬证据审查。是否送审与它是第几版无关。

若修改 layout、start、goal、胜利条件、核心机制使用或玩家关系，形成新的 exact version；旧机械证据和旧审查不能替它背书。原型 handoff 声明的设计期 diagnostic 按 routing 执行，`kind: pre_submission_check` 仍只在设计树充分后运行。

### 2. 强制 designer 送审包与硬证据审查

拟提交 exact version 必须完整填写送审包，固定 designer 对体验核心、作品身份、包装、已知问题和证据边界的承诺。送审包不发送给阶段 A reviewer。

Controller 从实际 exact version、规则合同和原始 artifact 另组硬证据包，只提取必要机械声明及引用。Fresh evidence reviewer 核验可解性、解族唯一性、旁路、事件、对象参与和机械身份条件。`overall_hard_status` 不是 `supported` 时，不进入阶段 A。

### 3. 阶段 A：Fresh 玩家侧质量门

Controller 从规则、实际布局、solve instance、非空 exact inputs 和机械回放组装 raw packet。Baseline 只包含当前节点；子节点同时包含冻结父节点与当前子节点的实际 artifact，以便 reviewer 看清新增内容，但不透露拟议方向、体验核心或 designer 解释。人类 brief 若明确规定审查边界、允许的审美取舍或不可改变条件，应以可追溯的人类原意进入 raw packet；designer 的辩护不能借此进入。

Fresh reviewer 独立判断当前 exact version 是否没有明确非补偿缺点，输出：

- `survive_quality_gate`
- `revise_and_rereview`
- `reject_candidate`

Verdict 写定后不可追改。随后发送阶段 B context；只有存活节点拥有树决定资格，未存活节点只接受方向保持诊断。Designer 在收到阶段 B note 前不修订或撤回当前工作节点。

### 4. 阶段 B：体验核心教练

阶段 A verdict 写定后，Controller 才向同一 reviewer 提供体验核心、冻结设计树、当前父子关系、原教练方向和允许机制。Context 同时写明阶段 A outcome；只有 `survive_quality_gate` 对应完整树决定权限，其它 outcome 只对应方向保持权限。

阶段 A 未存活时，阶段 B 不重复质量批评，也不判断是否冻结。它把阶段 A 从实物重建出的实际增量与节点原 brief 比较，只问：沿阶段 A 的同题修订继续优化当前结构，是否仍会实现原先指定的体验核心或生长关系。

- 方向仍在时，用一小段自然语言确认继续修订当前节点即可，不再增加第二组修改任务；
- 方向已经被另一种前序、后继、独立子题或新体验核心取代时，点明原目的与当前实际价值各是什么，要求停止精修当前结构，回到冻结父节点与原 brief 更换结构 family 或撤回工作节点。错方向中的有趣结构可以作为材料保留，但不能静默重命名当前节点。

方向丢失时，这项纠偏优先于阶段 A 的局部改进建议，避免 designer 把一个关卡修到完成后才发现结构回答了另一道题。失败节点的阶段 B 不产生 `freeze_root`、`freeze_child` 或 `tree_sufficient` 决定。

阶段 A 存活时，阶段 B 才执行以下完整教练判断。

Baseline 轮中，教练确认实际体验与核心一致后冻结根节点，再给一个最高优先生长方向。子节点轮中，教练判断新增内容是否确实改变了玩家与同一核心的关系：

在应用前序或后继标准前，先把阶段 A 重建出的玩家实际体验与冻结 baseline 的 `experience_statement`、`player_action`、`visible_payoff` 和身份条件比较，确认同一个具有区分性的玩家关系仍然成立。机械条件只提供必要证据，不能单独决定作品身份。若作品身份丢失，当前子节点直接不冻结，并明确 baseline 承诺了什么、当前玩家实际经历了什么；这个判断不改写前序或后继标准。

- 对前序，检查不知道核心所需局面的熟练玩家是否仍能只靠局部判断轻松走完；若能，通常是强制动画或独立子题。Deadend 只是判断选择真实性的证据，不是设计指标。
- 对后继，检查它是否区分了多种眼前可完成核心的状态，并让约束返回前序；删除后继若不让关键构造选择更显然，通常是追加子题。

教练内部可以严格逐项攻击，外部只写短篇自然语言：说明成立或失败的原因，只给一个宏观方向，并以整体放弃信号收束。不得输出字段表、问题清单、方向菜单、坐标、步数或 deadend 数量。

成立的子节点冻结。教练可以建议从它继续生长，也可以回到某个冻结祖先尝试另一关系。若当前节点完整但新增关系拼接，只拒绝冻结子节点，不损害父节点。

### 5. Designer action 与新一轮

Designer 同时根据阶段 A 与阶段 B artifacts 写 `designer_action_N`。方向保持时，按阶段 A 缺点修订当前节点；方向丢失时，优先回到冻结父节点与原 brief 更换结构 family 或撤回，不沿错误结构继续局部优化。新 exact version 重新经过内层循环，并使用未看过该版本的新 reviewer 执行阶段 A。旧 reviewer、修改说明和 designer action 不进入新 raw packet。

当教练无法提出具体、非拼接、仍以原核心为主角的方向，或继续生长只会让核心退为材料时，将 `tree_state` 设为 `sufficient`。流程不机械要求前序与后继各有一个节点。

## 原型专属提交前工作流

设计树充分后，Controller 对每个冻结节点读取当前原型 `design_handoff.yml`，逐项处理所有 `kind: pre_submission_check` workflow。适用性按 positive conditions 和 authority docs 实际判定；适用项执行规定动作并保存原始 artifact，不适用项记录可核验依据。

只读 workflow 不改变 reviewed exact version。若 workflow 改变 exact version，只有 authority docs 事先明确允许该类变换保留 review，且本次满足全部操作边界、必需复验和不变量时，才可保留 review；其它变化必须为该节点形成新 exact version，返回硬证据、阶段 A 和阶段 B。冻结树中原节点不被覆盖，只有重审存活的新版本可以替代其 delivery 指向。

通用层不得发明某种操作的安全性，也不得把一个原型的检查规则套用到另一个原型。

## 待玩交付

Controller 对每个冻结节点按 artifacts 检查：

```text
submission_packet = complete
solution_uniqueness_review = supported
independent_hard_evidence = supported
quality_gate = survived
coach_tree_decision = frozen
pre_submission_checks = completed_or_recorded_not_applicable
delivery_version_evidence = current
```

满足后把各 delivery version 写入 `studio/levels.yml` 或 `levels.yml`，加入 `playable_queue.yml` 并设为 `pending_playtest`，重建 playable，确认 source/id 可解析。人类交接列出设计树亲缘关系、各节点体验差异和 artifact refs；它不是教练表格，也不能替代实际待玩交付。

## 状态

```text
node_state: designing | hard_validated | quality_survived | frozen | rejected
tree_state: building_baseline | growing | sufficient
review_state: not_submitted | evidence_review_required | quality_review_required | coach_review_required | revise_required | rejected | frozen
pre_submission_state: not_started | incomplete | completed
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
```

Designer/controller 不能产生独立 review 状态，也不能代替人类填写试玩结果。任何状态都不表达审美等级。
