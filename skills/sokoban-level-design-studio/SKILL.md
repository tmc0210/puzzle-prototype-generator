---
name: sokoban-level-design-studio
description: 围绕一个明确的玩家体验核心，为类推箱子特定原型设计、验证和交付关卡作品集。适用于定义作品身份、制作并冻结基线、相对基线探索 application/combination/challenge 分支、在求解修订中保护核心，以及准备不排名的人类待玩作品集；不用于原型实现、通用机制挖掘、纯归档排版或给既有关卡打审美分。
---

# Sokoban Level Design Studio

## 核心职责

将“这关为什么值得存在”落实为可玩的基线和少量独立探索分支。以玩家体验核心和作品身份约束设计，不以因果链、事件覆盖或图指标替代创作判断。

## 必读材料

开始设计前完整读取：

- `docs/17-experience-core-level-design.md`
- `docs/21-level-design-studio-standard.md`
- 当前原型的 `docs/design_handoff.yml` 及其 required docs
- 当前原型 clean human-reviewed archive 的 index、1–2 个相关正例原评语，以及覆盖当前风险的 2–4 个低分或明确拒绝反例原评语

按任务读取本 skill references：

- 写设计起始材料时读 `references/experience-brief-template.md`；
- 建立基线和分支记录时读 `references/portfolio-template.md`；
- 提交人类试玩时读 `references/human-handoff-template.md`。

## 边界

- 只处理特定原型的关卡设计；原型实现或泛化能力改动另立任务。
- 工具只提供硬事实，不评价审美、好玩度或版本优先级。
- 审美取舍留给人类试玩；本 skill 不产生审美分数或候选排名。
- Evidence reviewer 仅按 `docs/21` 的硬证据路由按需调用。
- 未经用户授权，不从旧 candidate、run 或 layout 建立变体。
- Archive 只校准人类偏好、失败模式和重复边界，不授权复制旧题。

## 工作流

### 1. 确认上下文

确认规则、胜利条件、对象语义、玩家先验、允许机制、工具边界、design corpus 和 prototype-specific checks。未知但不影响 runtime 的内容标记 assumption；影响语义的问题先停止设计。

### 2. 定义玩家体验核心

在画布局或搜索前写 experience brief：

- 玩家具体见证或完成什么；
- 玩家必须亲自执行什么；
- 关键操作后棋盘哪里发生可见变化；
- 为什么值得独立成为一关；
- 哪些对象和机制属于核心，哪些只是支持；
- 哪些关系改变后已不是同一作品。

若只写出机制事件、局部结构、规则命题或完整因果链，尚未形成体验核心。

### 3. 制作 Baseline

先做当前作品身份最小、完整、低风险的实现。Baseline 可以有主动操作或多个机制；不要事后根据特征把它重贴为 application、combination 或 challenge。

读取 exact replay，检查实际玩家体验。使用 solver、graph、bypass、uniqueness 与 identity counterfactuals 修复硬问题。若唯一解修复淹没核心，放弃当前结构，不追加无关子题。

Baseline 没有明确同题缺点且硬证据成立后，冻结 exact version。冻结后不得覆盖。

### 4. 预声明分支搜索

每个分支在布局前选择一个 `search_intent`：

- `application`：相对 baseline 增加玩家作者性；
- `combination`：相对 baseline 增加被核心消费的非核心支持机制；
- `challenge`：按预声明维度探索上限。

同时写 `delta_from_baseline` 和 reduction test。完成后不能改写 search intent 来为结果辩护。

### 5. 探索并淘汰

可以尝试多个结构 family。以下情况直接关闭当前 attempt：

- 机械不可行或图搜索无法支持关键结论；
- 核心由开局自动完成，预声明的玩家责任消失；
- 支持机制完成后退休，与核心只是串联；
- 修订后作品身份死亡；
- 相对 baseline 只增加走位、对象、事件或流程；
- 发现的是另一种体验核心却仍修改原声明。

好的意外结果另开 branch 或 core。失败 attempt 不回灌 baseline。

### 6. 验证存活版本

进入作品集前至少保存：solve instance、exact replay、graph/uniqueness、bypass checks、身份条件证据、evidence limits 和 artifact refs。按 handoff 运行 prototype-specific pre-submission checks。

每种 search intent 默认最多保留两个玩家体验不同的存活版本。没有自然方案时允许为空。

### 7. 交付 Human Portfolio

按 baseline、application、combination、challenge 分组平级呈现。只描述体验、相对增量、已知风险和证据边界。

不要：

- 排名或标记 primary / best；
- 给审美、难度或“完成度”打分；
- 用工具指标暗示版本更好；
- 因激进分支存在而贬低 baseline。

人类试玩后，精确记录 select、revision、reject 或 hold。只有 human-selected exact version 可以进入 archive pass。

## 状态纪律

版本只使用：`working`、`rejected_branch`、`hard_validated`、`frozen`、`human_pending`、`human_selected`、`human_rejected`。

任何版本状态都不表达审美等级。
