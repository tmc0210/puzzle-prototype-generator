---
name: sokoban-level-design-studio
description: 围绕明确玩家体验核心，为类推箱子特定原型设计、验证并提交关卡作品集。适用于制作 baseline、探索 application/combination/challenge、强制填写 designer 送审包、组织不读取设计声明的 fresh 独立交叉审查、完成原型专属提交前检查与独立准入审计，并将合格 exact versions 接入待玩列表；不用于原型实现、通用机制挖掘或纯归档排版。
---

# Sokoban Level Design Studio

## 核心职责

将一个玩家体验核心做成 baseline 和少量实质不同的探索版本。Designer 负责创作与送审说明，但无权审查自己、宣布通过或直接写入待玩列表。

## 必读材料

开始前完整读取：

- `docs/17-experience-core-level-design.md`
- `docs/21-level-design-studio-standard.md`
- 当前原型 `docs/design_handoff.yml` 及 required docs
- `references/experience-brief-template.md`
- `references/submission-packet-template.md`
- `references/portfolio-template.md`
- `references/human-handoff-template.md`

需要独立玩家侧审查时调用 `$sokoban-level-reviewer`；需要硬证据和提交前检查审计时调用 `$sokoban-evidence-reviewer`。两者都是强制门，不是可选辅助。

## 强制归档校准

画布局或运行设计搜索前：

1. 读取当前原型 clean human-reviewed archive 的完整 index；
2. 读取所有审美 1 分 candidate record 及人类原评语；
3. 读取 1–3 个与当前核心或包装相关的正例原评语；
4. 读取 1–3 个相关下界、失败或边界例原评语；
5. 在 experience brief 中记录 archive ids 和 human comment ids。

没有人类原评语的 report、designer 自评、旧 critic 结论和工具指标不能校准审美。Archive 只校准偏好、失败模式和重复边界，不授权复用旧题。

## 工作流

### 1. 确认上下文与体验核心

确认规则、胜利条件、对象语义、玩家先验、允许机制、工具边界和原型专属检查。然后写 experience brief：玩家见证什么、亲自做什么、哪里发生可见变化、为什么值得单独成关、作品身份如何被反事实证伪。

### 2. 制作 Baseline

制作当前作品身份最小、完整、低风险的实现。读取 exact replay，从玩家侧检查开局、准备、回报与收束；使用 solver、graph、bypass、uniqueness 和 identity counterfactual 修硬问题。唯一解修订若淹没核心，放弃结构，不追加无关子题。

Baseline 硬验证后只可标记 `hard_validated`，在独立审查和准入审计前不得自行标记 `frozen`。

### 3. 预声明并探索分支

每个分支在布局前选择 `application`、`combination` 或 `challenge`，填写 branch plan。声明仅约束 designer，不提供给 reviewer。

- application：相对 baseline 增加玩家主动建立或使用核心条件的责任；
- combination：增加一个非核心、非基础规则、非核心前序知识的不同机制，其产物被核心实际消费；
- challenge：在作品身份不变时探索明确上限，不能只增加流程。

每种意图允许没有存活版本。不得为了填满作品集降低定义。

### 4. Designer 强制送审包

对每个拟提交 exact version 填写 `references/submission-packet-template.md`。未填写完整送审包，版本仍是 working material。

送审包用于迫使 designer 固定自己的创作承诺、档位理由、已知问题和证据边界。它不发送给独立 reviewer，也不能作为 reviewer 输入的摘要来源。

### 5. 强制独立交叉审查

Controller 从实际规则、布局和同一 exact inputs 的机械回放单独组装 reviewer raw packet。使用从未参与本批设计的 fresh reviewer 调用 `$sokoban-level-reviewer`：

- reviewer 自己读取并选择归档校准材料；
- reviewer 不读取任何 designer 送审字段；
- reviewer 同时审查逐关包装和作品集内实质差异；
- reviewer 有否决权，designer 不能用解释覆盖 verdict。

只有 `survive_to_pre_submission_checks` 可以继续。修改后的 exact version 必须填写新送审包，并交给新的 reviewer attempt。

### 6. 提交前检查与独立准入审计

只对交叉审查存活版本运行 handoff 路由的全部 `kind: pre_submission_check`。必须执行 authority doc 的实际操作并保存原始证据；填写一份结论或复用相近 solver 结果不算执行。

随后由独立 `$sokoban-evidence-reviewer` 使用 `submission_admission` 模式直接读取 handoff、exact version、硬证据和检查产物。它不读取 designer 送审声明。

任一适用 workflow 缺步骤、缺证据、结论越过证据边界或检查改变 solve instance 后未重跑，`admission_state` 必须为 `blocked`。Designer 不得自行设置 `eligible`。

### 7. 接入待玩列表

仅当以下条件同时满足时，才能写入 `studio/levels.yml` 或 `levels.yml` 并加入 `playable_queue.yml`：

- designer submission packet 完整；
- 最新 fresh level review 对 exact version 给出 survive；
- 硬证据成立；
- 全部适用 pre-submission checks 已执行；
- 独立 admission audit 给出 `eligible_for_queue`。

写入后使用 `status: pending_playtest`，重建 playable 并确认 source/id 可解析。文字简报不算完成。

## 状态纪律

分别维护：

```text
design_state: working | hard_validated | frozen | rejected_branch
review_state: not_submitted | awaiting_independent_review | revise_required | rejected | survived
admission_state: not_started | checks_incomplete | audit_required | blocked | eligible
playtest_status: not_queued | pending_playtest | defer | needs_revision | ready_for_archive | reject
```

只有 admission auditor 可以产生 `eligible`；只有人类试玩可以产生 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。任何状态都不表达审美分。

## 禁止

- 同一 agent 同时设计和独立审查；
- reviewer 读取 designer 送审包或设计对话；
- 用工具指标、逻辑完整或事件覆盖补偿可感缺点；
- 为填档保留弱 application、伪 combination、流程型 challenge 或同质 witness；
- 缺交叉审查、缺实际提交前检查或缺准入审计时进入待玩列表；
- 将简报、YAML 自报状态或 controller 总结当作审查 artifact。
