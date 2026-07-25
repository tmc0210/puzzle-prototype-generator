# 关卡设计工作室执行标准

状态：当前特定原型体验核心单关设计合同。

设计本体见 [玩家体验核心与单关包装方法论](17-experience-core-level-design.md)，产物入口见 [关卡设计工作室模板索引](20-level-design-studio-templates.md)。

## 第一性原则

每次任务只追求一个合格候选。Designer 从第一次正式布局起就制作完整单关，并在一个连续工作台中修订；完成自查、准备送审的布局才发布为 exact version。所有 exact 始终属于同一个 `candidate_id`。

机械证据回答“这个 exact 实际上发生了什么”；Critic 回答“在机械前提已成立后，这个作品是否值得占用一次真实试玩机会”。唯一解、事件齐全、SCC 数量和 Designer 的体验叙事都不能替代后一判断。

Critic 不是玩家模拟器，也不是难度上界估计器。它只可确认关卡是否明显低于目标难度，不能因自己没看懂而判断过难、只能试错、线索不足或核心不可辨认。它把完整解视为一个作品，关注哪些前面的决定必须依赖对后续关系的预见、后来哪些局面兑现了这种预见，以及这种体验相对全部前序是重复、迁移、组合还是新的关系。

## 多层循环

“多层循环”只指一个候选内部的两层工作反馈，不是多候选或多次独立设计：

```text
外层：同一候选的评审修订
  exact -> 硬证据 -> 单次 Critic -> 接受或产生同一候选的新 exact

内层：Designer 的 Design Studio
  体验关系与结构假设 <-> 工作布局 <-> replay / diagnostics <-> 结构修订
  -> 完整候选自查 -> 发布 exact -> 送审包
```

每个 exact 只使用一名 fresh Critic；它一次读完允许材料并写出最终批评。任何角色都不能自行授予下一阶段资格。

## 适用范围

本流程只处理特定原型的关卡设计，不实现原型，不修改通用 runtime。开始前确认规则、胜利条件、对象语义、玩家前序、允许机制、工具边界、`design_handoff.yml` 和允许来源。影响 runtime 语义的问题必须先解决。

## 角色与权限

### Controller

`$sokoban-level-design-studio` 是唯一端到端入口和流程状态写入者。Controller 建立任务、dispatch、Designer assignment 与单候选账本，实际调度 Explorer、Evidence Reviewer 和 Critic，从实物组装白名单输入，登记转换，编排提交前流程并交付唯一待玩版本。它不设计 layout，不替专业角色下结论。

### Designer

Controller 通过正式 assignment 调用 `$sokoban-level-designer`。Designer 完成归档校准、体验核心和作品身份、唯一候选的制作与修订、实际 replay / diagnostics 读取、玩家侧重读、送审包和退回响应。默认维持同一持续 Designer。Designer 不写 dispatch、账本、Critic packet、独立 verdict、准入状态或待玩交付。

### Task-local Mechanism Explorer

Fresh agent 以 `$sokoban-mechanism-lab` 的 `mechanism_explore` / `task_local` 模式展开局部结构空间，发布任务内正向语料。它不制作完整候选，不评价作品质量。

### Evidence Reviewer

每个 exact 使用 fresh `$sokoban-evidence-reviewer`，核验可解性、解族、旁路、事件、对象参与、作品身份机械条件和完整 SCC / graph 声明。它不评价审美、难度或待玩价值，也不替 Designer 补证据。

### Puzzle Critic

机械证据得到 `supported` 后，每个 exact 使用一名 fresh `$sokoban-puzzle-critic`。它读取完整前序课程、目标难度、当前课程阶段的难度校准、跨阶段人类审美校准、当前实际布局和逐步 replay；不读取 Designer 的体验核心、作品身份、自评、修改说明、旧 review 或 Explorer 材料。

Critic 一次读取允许材料并写一篇自然语言 verdict。它把实际回放作为完整作品阅读，不把每一步递归拆成当前局面的局部选择题；步骤编号只用于追踪前面的决定如何在后续局面中得到兑现。它不填评分表、不输出优缺点菜单、不担任教练。

### Human

人类试玩唯一 delivery version 并决定作品去留。只有人类可以产生 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。

## 启动与探索

1. Controller 建立任务目录和单候选账本，按 task exploration 合同写 `dispatch.yml`，用不继承设计对话的 fresh agent 启动 `$sokoban-mechanism-lab`。
2. Explorer 只收到体验种子、玩家前序、允许机制、规则、工具入口、source boundary 和任务目录；不得收到审美归档、正式 exact、review 或 Designer 设想。
3. Designer 在 Explorer 工作期间独立完成归档校准：读完整 clean archive index / retrieval summaries、所有明确审美 1 分样本的人类原评语，并自行选择相关正例和边界例。未归档 report、旧 Critic、Designer 自评和工具结论不能校准审美。
4. Explorer 首批已验证材料发布后，Designer 建立体验简报并开始唯一候选。每个设计 assignment 开始时读取最新 task lexicon；结构方向实质改变时按需重读。正在送审的 exact 保持冻结。
5. Designer 可写与当前候选坐标、包装无关的局部探索 request；Controller 校验边界后调度 Explorer。完整候选、难度和 family 判断留在 Designer 内层循环。

## 唯一候选与内层 Design Studio

账本只有一个候选对象、最近一次发布的 exact 和至多一个接受版本。首次发布前 exact 可以为空；Designer 工作中的布局不登记到账本。更换 structure family 仍服务同一体验简报和 `candidate_id`。

一个 `candidate_design`、`revision` 或 `review_response` assignment 覆盖一次连续 Design Studio 工作台：

1. 建立当前玩家关系和结构假设。难度 3 以上维护一份简短、可更新的 reasoning sketch；只有结构命题实质改变时才更新，不随坐标微调重复填写。
2. 在同一工作布局上制作 layout、运行 replay、solver、analyzer、graph 或反事实工具，亲自读取输入、逐步状态、事件、对象参与和工具边界。工作文件可以持续覆盖，原始工具 artifact 按诊断需要保留。
3. 从玩家侧重读开局、关键判断、操作关系、回报和结束。出现 bypass 或体验声明不成立时，按 docs/17 追到结构责任，继续修改当前布局或重构 family。
4. 当完整关卡、规范解和已知反例已经同时成立时，固定 solve instance，运行完整非空 replay，完成玩家侧重读与解族唯一性自查。找到非等价胜解时回到工作台。
5. 自查通过后发布新的 exact version，并为这一个不可变快照填写送审包。

唯一解指玩家逻辑类唯一，不要求原始输入串唯一。纯走位差异、完整回返环、真实对称重标号和相互独立必要步骤的换序可属于同一类，但必须保持对象职责、目标分配和依赖因果。合法自查结果为 `unique_complete`、`unique_within_budget` 或 `equivalent_variants_only`；三者是证据形态，不是质量档位。

发布 exact 是版本边界。修改已发布快照会使旧机械证据和旧 Critic 失效，但修改过程仍留在工作台；下一份完成自查的快照发布时才取得新的 exact version。

## 外层：硬证据与 Critic

### 1. 强制送审与硬证据

Designer 为拟送审 exact 填写送审包，固定体验核心、作品身份、包装、已知问题和证据边界。送审包只交给 Controller，不发送给 Critic。

Controller 从实际 exact、规则合同和原始 artifact 组装硬证据包。Fresh Evidence Reviewer 读取完整所需图证据并核验硬声明。`overall_hard_status` 不是 `supported` 时，Controller 发一份以该 exact 为依据的 `revision` assignment，让持续 Designer 返回工作台。

### 2. Critic：一次完整作品阅读

Controller 独立选择 clean archive 来源，不采用 Designer 代选的唯一 anchors。它把当前目标之前的课程关生成为阶段内难度 view，保留布局、难度分、审美分和人类原评语；其余 clean archive 生成为跨阶段审美 view，保留布局、审美分和人类原评语，不携带结构化难度元数据。原始 archive 来源只留在账本，不进入 Critic packet。Base packet 只包含：

- 规则、胜利条件与玩家规则前提；
- 全部有序前序关卡；
- 目标难度；
- 阶段内难度校准 view；
- 跨阶段审美校准 view；
- 当前初始 layout、非空 canonical inputs 与每一步前后实际 layout；
- 机械证据已获独立支持这一事实。

Base packet 不含体验核心、作品身份、送审包、Designer 解释、结构命名、旧 review、精选 alternatives、全局 SCC 统计或自动质量指标。

Critic 只写一篇短的自然语言批评。第一行必须严格为：

```text
当前 exact 值得进入待玩。
```

或：

```text
当前 exact 应退回同一候选继续设计。
```

正文从完整解出发，说明哪些较早决定必须预见后续关系、这些关系在何处兑现，以及它们相对全部前序是重复、迁移、组合还是新的关系。审美判断可读取跨阶段校准；难度只相对完整前序和阶段内校准判断。若能确认难度明显低于当前课程位置的目标，可以据此退回；无法确认时不得猜测难度上界。

这不是形式化可证明的“好玩判定”。它是用干净输入、作品实物、阶段内难度校准和跨阶段人类审美归档约束模型判断的 harness，目的是拦住不值得真人试玩的明显弱作，而不是把审美降成指标。完整 SCC / graph、解族和旁路证据留给 Evidence Reviewer，不进入 Critic 输入。

### 3. 转换

- Critic 接受：Controller 直接登记 `accept_candidate`，停止设计，不创建 Designer acceptance action，不再问如何增强。
- Critic 退回：Controller 发一份 `review_response` assignment。Designer 回应退回意见，并在同一 assignment 内持续工作，直到发布下一 exact、更换 structure family、撤回当前 exact 或争议 packet 的事实错误。
- dispute 只核验实际布局、回放、前序、目标难度和两类校准 view 等组包事实；Designer 的亮点解释不进入 Critic 输入。

下一份 exact 发布后重跑完整外层审查，使用未见过该版本的新 Evidence Reviewer 和 Critic。旧 Critic、修改说明和 Designer action 不进入新 base packet。

## 提交前工作流与待玩交付

候选被接受后停止设计。Controller 逐项执行当前原型 `design_handoff.yml` 中所有 `kind: pre_submission_check` workflow；这些 workflow 只能包含确定性的机械检查，以及 authority docs 预先定义候选发现、允许变换和完整保持条件的规范化动作。它们不分配给 Designer，不产生设计判断，也没有返回评审链的出口。

提交前规范化只有三种结果：没有候选；候选反事实未取得保持证明，因此保留原样；取得完整证明后应用变换并形成 delivery version。后两者都完成当前检查。工具运行本身未完成时只把提交前状态保持为 `incomplete`，重跑该工具；不得把工具不完整改写成设计修订。

authority docs 必须让工具从有限的结构类别自动发现候选，不能要求 Designer 判断某格或对象是否有职责，也不能用“扫描整张画布的每个普通空格”代替候选算法。任何实际变换都必须留下当前 delivery layout 的机械证明；未证明的变换不应用，因此提交前流程在任何结果下都保留已经接受的作品。

交付前检查：

```text
submission_packet = complete
solution_uniqueness_review = supported
independent_hard_evidence = supported
critic_verdict = worth_playtesting
pre_submission_checks = completed_or_recorded_not_applicable
delivery_version_evidence = current
```

满足后，只把一个 delivery version 写入 `studio/levels.yml` 或 `levels.yml`，加入 `playable_queue.yml` 并设为 `pending_playtest`，重建 playable 并确认 source/id 可解析。`reviewed_exact_version` 与 `delivery_exact_version` 可以因已证明的提交前规范化而不同；提交前记录必须给出这种差异的 authority 与证明。人类交接只介绍该关的体验核心、已知风险和 artifact refs，不比较其它设计。

## 状态

```text
task_state: briefing | designing | reviewing | pre_submission | ready_for_playtest
candidate_state: designing | hard_validated | accepted
critic_state: not_started | packet_ready | verdict_written
pre_submission_state: not_started | incomplete | completed
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
```

Controller 与 Designer 都不能产生独立 review 状态，也不能代替人类填写试玩结果。任何状态都不表达审美等级。
