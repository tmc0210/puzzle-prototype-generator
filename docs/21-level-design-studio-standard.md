# 关卡设计工作室执行标准

状态：当前特定原型单关作品集执行合同。

设计本体见 [玩家体验核心与关卡包装方法论](17-experience-core-level-design.md)，材料格式见 [关卡设计工作室模板](20-level-design-studio-templates.md)。

## 第一性原则

LLM designer 对自己的产物存在结构性维护倾向：会为填满档位降低定义、把形式差异解释成体验差异、把相邻工具证据解释成已完成检查。因此创作、玩家侧审查、硬证据准入必须由不同角色承担；任何角色都不能自行授予下一阶段资格。

```text
designer 创作并写送审包
-> fresh level reviewer 只读实际关卡
-> designer 执行提交前检查
-> independent evidence reviewer 审计准入
-> controller 写入待玩列表
-> 人类试玩
```

## 适用范围

本流程只处理特定原型的关卡设计。开始前确认规则、胜利条件、对象语义、玩家先验、允许机制、工具边界、design handoff、原型专属 workflow 和本轮 lineage。影响 runtime 或胜利条件的问题必须先解决，不能在关卡设计中猜测。

## 角色与权限

### Designer / controller

定义体验核心与作品身份，制作 baseline，探索分支，运行工具，填写 designer 送审包，执行提交前检查并组装交付。它不能审查自己、不能产生 `survived` 或 `eligible`、不能绕过独立 artifact 写入待玩列表。

### Independent level reviewer

使用未参与设计的 fresh context，独立读取规则、实际布局、机械回放和同批版本。它自己读取 human-reviewed archive 校准审美，不读取 designer 的 experience brief、submission packet、branch plan、档位理由、亮点说明、修改历史或设计对话。

它只判断玩家侧包装缺陷、作品完成质量、版本实质差异和档位是否成立；不运行硬证据工具，不读指标，不给审美分或候选排名。它具有否决权。

### Independent evidence reviewer

独立核验可解性、旁路、身份条件及提交前 workflow 是否按 authority docs 实际完成。它不评价审美，但可因证据或流程不完整机械地阻止 queue admission。

### Human designer / curator

试玩已准入版本，判断可感缺点、作品完成度和最终取舍。只有人类可以产生 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。

## 强制归档校准

Designer 和 independent level reviewer 必须各自独立校准，不能共用 designer 选择的唯一 anchors。

每个角色开始工作前都必须：

1. 读取当前原型 clean human-reviewed archive 的完整 index；
2. 读取所有审美 1 分 candidate record 与人类原评语；
3. 读取 1–3 个与本轮核心、包装或档位相关的正例原评语；
4. 读取 1–3 个相关下界、失败或边界例原评语；
5. 记录读取的 archive ids 与 human comment ids。

Index 的 retrieval summary 只用于检索，不能替代人类原评语。未归档 report、旧 critic、designer 自评和 tool-only 质量结论不能作为审美依据。

## 设计循环

### 1. Experience brief

在画布局或运行搜索前写明玩家体验核心、玩家操作、可见回报、作品身份、核心边界、玩家先验、重复边界、baseline 体量和归档校准记录。

### 2. Baseline

制作最小、完整、低风险的作品实现。使用 exact replay 从玩家侧读取实际体验，再用 solver、graph、bypass、uniqueness 和 identity counterfactual 修复硬问题。唯一解修订若淹没核心，应放弃结构，不追加无关子题。

Baseline 在独立审查前最多为 `hard_validated`；不能由 designer 自行冻结。

### 3. 分支搜索

每个分支在布局前声明搜索意图，但声明只约束 designer：

- `application`：相对 baseline 增加玩家主动建立或使用核心条件的责任；
- `combination`：引入一个非核心、非基础规则、非核心前序知识的不同机制，并让其产物被核心消费；
- `challenge`：在作品身份不变时真实探索难度、空间、构造、复用、反直觉或形式完成度上限。

基础规则、理解核心不可避免的前序机制、核心自身组成部分和同一机制的原子操作不能充当 combination 的“另一机制”。更多步骤、地图、对象、事件、显然操作或走位不能单独构成 challenge。

每种搜索意图允许为空。为了填满档位保留弱版本属于流程失败。

### 4. Designer 送审包

Designer 为每个拟提交 exact version 强制填写送审包，固定：

- 自己认为的体验核心、作品身份与包装；
- 档位理由及相对 baseline 的实际增量；
- combination 非前序性和消费关系；
- 与同批版本的非等价性；
- 已知可感问题、硬证据与边界。

送审包只作为 designer 的正式承诺、controller 状态依据和事后诊断材料。Independent level reviewer 永远不读取它。

### 5. Fresh 独立交叉审查

Controller 只从实际产物组装 raw packet：规则、玩家先验、slot 名、布局、solve instance、非空 exact inputs 和由同一 inputs 机械 replay 得到的逐步状态变化。

Raw packet 禁止包含 designer 声明、目标亮点、档位理由、设计成本、旧审查、指标或 controller 总结。

Fresh reviewer 必须先独立读取归档，再：

1. 逐关重建玩家实际看见和完成的主要关系；
2. 按审美非补偿原则寻找任何具体同题缺点；
3. 比较 baseline 与各分支的玩家体验差异；
4. 否决伪 application、用前序知识冒充的 combination、流程型 challenge 和同质版本；
5. 对每个 exact version 给出 survive、revise 或 reject。

任何修改都形成新 exact version、重新填写送审包，并交给从未审过该版本的新 reviewer。Designer 的解释不能覆盖审查结论。

### 6. 原型专属提交前检查

只对 level reviewer survive 的版本读取 `prototypes/<mechanic_id>/docs/design_handoff.yml`，运行所有适用 `kind: pre_submission_check`。

“运行”意味着执行 authority doc 规定的实际反事实、回放、比较或探测，并保存逐项证据。以下不算完成：

- 只填写一份 `complete` YAML；
- 用 generic solver / complete graph 代替专门 workflow；
- 从一个删除或墙化样本外推全部要素；
- 在未证明 event-path necessity 时从 win state 数量推断必要性；
- 缺工具时写成 clean 或 pass。

检查改变 layout、start、goal、对象或 solve instance 时，生成新 exact version，重跑硬证据并重新进入 fresh level review；不得直接沿用旧 survive。

### 7. 独立准入审计

Independent evidence reviewer 使用 `submission_admission` 模式直接读取：

- design handoff 与触发条件；
- exact version 和硬证据；
- 每个适用 workflow 的 authority docs；
- 实际命令、逐项结果和原始 artifact refs；
- 最新 independent level review artifact。

它不读取 designer 送审声明。只有所有硬声明成立、所有适用 workflow 实际完成、artifact 与 exact version 一致时，输出 `eligible_for_queue`。缺失、未知、预算不足、版本不一致或证据替代一律 `blocked`。

### 8. 待玩列表

Queue admission 必须同时满足：

```text
submission_packet = complete
independent_level_review = survive_to_pre_submission_checks
hard_evidence = supported
pre_submission_checks = actually_completed
independent_admission_audit = eligible_for_queue
```

满足后才能写入 `studio/levels.yml` 或 `levels.yml`、加入 `playable_queue.yml`、设置 `status: pending_playtest` 并重建 playable。简报、自报状态或文件存在本身不能准入。

## 审查判断边界

审美问题是非补偿的：任何明确可感且同题可修的问题都阻塞 survive。唯一解、逻辑完整、事件覆盖、机制数量、难度或其它亮点不能补偿。

同时，保守不等于有缺点。把一个完整直接作品另作成更复杂的 application 或 challenge，不是对原版本的同题修订要求。高野心分支可以失败，baseline 不因其保守而降级。

## 状态机

```text
design_state: working | hard_validated | frozen | rejected_branch
review_state: not_submitted | awaiting_independent_review | revise_required | rejected | survived
admission_state: not_started | checks_incomplete | audit_required | blocked | eligible
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
```

- Designer 只能写 design state 和 `awaiting_independent_review`。
- Level reviewer 只能写 review verdict。
- Evidence reviewer 只能写 admission verdict。
- Controller 只有在 `eligible` 后才能写 `pending_playtest`。
- Human 试玩状态不由 LLM 预填。
