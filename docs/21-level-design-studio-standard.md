# 关卡设计工作室执行标准

状态：当前单关作品集执行合同。

本文档定义当前可执行的 Sokoban-like 单关设计流程。设计本体见 [玩家体验核心与关卡包装方法论](17-experience-core-level-design.md)，材料格式见 [Level Design Studio Templates](20-level-design-studio-templates.md)。

## 适用范围

使用本流程前，必须明确任务是在特定原型上设计关卡，而不是实现原型或修改泛化能力。必须确认：

- 原型规则、对象语义、胜利条件和求解实例语义；
- 可用 runtime、solver、replay、graph、counterfactual 与 archive 工具；
- 玩家此前已知内容和本轮允许机制；
- 原型自己的 design handoff 与 prototype-specific workflows；
- 本轮体验核心由用户给出、从课程计划选出，还是由 designer 提议。

影响 runtime 或胜利条件的问题不能靠关卡设计过程猜测。

## 角色

```text
level_design_studio:
  定义体验核心与作品身份，制作基线，冻结基线，探索分支，读取工具证据，
  维护 attempt log，并组装人类作品集。

solver / analyzer / replay / graph / counterfactual:
  验证可解性、操作、状态变化、旁路、唯一逻辑类和身份机械条件。
  不判断审美、好玩度或版本优先级。

evidence_reviewer:
  按需独立核对复杂硬声明与证据引用。不是默认审美门，也不排名候选。

human_designer / curator:
  试玩存活版本，判断可感缺点、作品完成度与最终选择。拥有审美与归档权威。

archive_pass:
  只记录人类已经作出的选择，不修改布局或升级状态。
```

LLM 不输出审美分数，也不以“逻辑完整”“事件覆盖”替代玩家体验判断；存活版本的取舍由人类试玩完成。

## 核心循环

```text
确认原型与课程上下文
-> 写 experience brief
-> 设计并验证 baseline
-> 冻结 baseline
-> application / combination / challenge 独立搜索
-> 每个分支硬验证与身份检查
-> 运行原型专属提交前检查
-> 组装平级 human portfolio
-> 写入 level source 与 playable_queue
-> 重建 playable
-> 人类试玩并写入 playtest_reviews
-> archive pass
```

## 体验简报

在确定布局、运行 miner 或脚本搜索前，写明：

- 玩家体验核心；
- 玩家具体操作与可见回报；
- 作品身份条件与反事实；
- 核心边界：哪些对象和机制属于核心，哪些只是包装支持；
- 玩家此前知识与重复边界；
- baseline 的预期体量和非目标。

如果 designer 自主提出体验核心，先检查它是否只是规则事件、局部结构或已有归档关的换皮。说不清“为什么值得独立成为一关”时，不进入地图阶段。

## 归档与设计语料读取

设计前定位当前原型的 clean human-reviewed archive：

- 先读 index，再读取 1–2 个与体验核心相关的正例原评语；
- 读取覆盖当前包装风险的 2–4 个审美低分或人类明确拒绝反例原评语；优先覆盖不同失败模式，不按数量堆上下文；
- 检查新体验核心是否与已有作品重复或已饱和；
- 未归档 report、designer 自评和 tool-only 质量结论不能作为正向审美依据。

Archive 只校准完成度、失败模式和重复边界，不授权复用旧布局、对象职责或解题路线。只有用户明确授权某个版本作为 baseline 时，才能从该版本建立分支。

Design corpus、lexicon 和 mechanism lab 只按 handoff 白名单读取，并只作为局部材料来源。

## 基线工作室

Baseline 目标是以最小完整包装兑现作品身份，而不是追求最低步数或最小地图。

设计顺序：

1. 选择清楚的开局呈现；
2. 只加入核心所需的准备、进入、操作与结束；
3. 运行 exact replay，确认玩家实际完成的是 brief 中的体验；
4. 验证可解性、旁路、唯一逻辑类和身份反事实；
5. 修订时优先保护体验核心，不为唯一解添加无关子题；
6. 运行适用的原型专属清理；
7. 没有明确同题缺点且硬证据成立后，将 exact version 标记为 `frozen`。

冻结后禁止覆盖 baseline。任何提高玩家作者性、增加支持机制或挑战上限的想法进入独立分支。

## 分支工作室

每个分支在确定布局前声明 `search_intent` 和 `delta_from_baseline`。

### Application 搜索

声明相对于 baseline 新增的玩家责任。若预先满足这项责任后仍只是 baseline，应在 reduction test 中明确记录。

### Combination 搜索

声明新增的非核心支持机制，以及它如何创造并被核心消费的条件。前置机制完成后整体退休、后段独立运行 baseline 的方案直接拒绝。

### Challenge 搜索

声明本轮要挑战的一个或多个维度。Challenge 可以同时具有 application 或 combination 特征，但不能事后因成品复杂而重贴标签。

### 分支纪律

- `search_intent` 在布局前确定，不能事后改写；
- 发现另一个好作品时另开 branch 或 experience core；
- 机械失败、身份死亡、没有相对增量或只增加流程的尝试直接拒绝；
- 失败 branch 不回灌 baseline；
- 每种 search intent 默认最多保留两个玩家体验不同的 hard-validated survivor；
- 不要求每种 search intent 都有存活版本。

## 修订规则

每次改变 layout、start、goal、对象、核心操作或胜利实例后，重跑相关硬证据。

遇到旁路或多解时：

1. 比较预期方案与旁路在玩家体验核心上的差异；
2. 优先修复让作品身份失效的旁路；
3. 如果唯一解限制会明显淹没核心，拒绝该 branch，而不是继续追加结构；
4. 局部可交换步骤若保持相同对象责任、核心关系和可见回报，可以保留；
5. 修改后重新检查作品身份，不允许整体形状退化为材料、主动使用退化为过场动画。

## 硬证据验证

进入 human portfolio 的版本至少具备：

- confirmed solve instance；
- exact winning replay；
- 完整或明确预算边界的 graph / uniqueness 结果；
- 已检查的非等价胜解与旁路；
- 作品身份机械条件的直接证据；
- 适用时的 identity counterfactuals；
- evidence limits 与 artifact refs。

独立 evidence reviewer 只在以下情况触发：

- 硬声明复杂且 controller 无法从 artifact 直接核对；
- 用户或交付契约要求独立审查；
- 多实例对象、复杂 graph 结论或反事实是交付结论的关键。

Evidence reviewer 的通过不提高审美，也不替代人类试玩。

## 原型专属检查

读取 `prototypes/<mechanic_id>/docs/design_handoff.yml`。只有 handoff 声明的 workflow 可以触发；未声明时不得泛化。

`kind: pre_submission_check` 在版本进入人类待玩列表前运行。检查若改变 solve instance，形成新版本并重跑必要硬证据；不能在 archive pass 中静默修改。

## 人类待玩作品集

作品集按下面顺序平级呈现：

1. frozen baseline；
2. application survivors；
3. combination survivors；
4. challenge survivors。

每个版本只提供：

- 玩家体验摘要；
- 相对 baseline 的具体增量；
- layout 与 exact trace / replay；
- 已知风险和证据边界；
- prototype-specific check 状态。

禁止：

- LLM 给版本作审美或难度分数；
- 把某版标为审美意义上的 primary / best；
- 用事件数量、图规模、唯一解或逻辑链长度排名；
- 因为高野心 branch 存在而贬低无缺点 baseline。

人类对每个版本分别记录 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。

### 待玩列表交付

Human portfolio 简报不是终点。每个交付版本必须：

1. 以 exact version 写入原型支持的 `studio/levels.yml` 或 `levels.yml`；
2. 加入 `playable_queue.yml`，新条目使用 `status: pending_playtest`；
3. 重建 playable，并确认 queue 中的 source / level id 能解析到实际布局；
4. 在最终回复中同时给出简报、queue 条目和 playable 路径。

若版本未进入待玩列表，任务仍处于 `not_queued`，不能报告作品集已交付。

## 人类反馈路由

```text
pending_playtest:
  已在 playable_queue 中，但尚无对应人类试玩记录。

defer:
  暂不决定；保留试玩记录，不升级、不归档。

needs_revision:
  从该 exact version 建立新 version；若反馈改变主要体验，建立新 branch 或 core。

ready_for_archive:
  该 exact version 可以进入 archive pass。

reject:
  关闭该 exact version；是否作为人类负例归档由人类另行决定。
```

## 状态

设计状态只使用：

```text
working
rejected_branch
hard_validated
frozen
```

待玩状态只使用：

```text
not_queued
pending_playtest
defer
needs_revision
ready_for_archive
reject
```

设计状态与待玩状态分栏保存，不互相替代，也都不表达审美评分。
