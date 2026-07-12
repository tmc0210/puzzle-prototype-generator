# 关卡作品集实验运行 Prompt

状态：用于启动一次人类引导的特定原型单关设计实验。

```text
请阅读并遵守：

docs/17-experience-core-level-design.md
docs/21-level-design-studio-standard.md
docs/20-level-design-studio-templates.md
docs/29-design-archive-contract.md
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
<prototype_required_docs>
<experiment_brief_path>
<archive_index_path>

使用 $sokoban-level-design-studio 围绕 <experience_core> 为 <prototype_id> 制作一个
不排名的待玩作品集。

任务边界：这是特定原型的关卡设计，不修改 runtime、工具或泛化流程。影响规则
语义的问题先停止设计并报告。

执行顺序：

1. 根据 brief、玩家此前知识、重复边界和相关人类原评语，完成 experience brief。
2. 制作一个最小完整 baseline；以 exact replay 读取真实玩家体验，完成硬验证和
   prototype-specific checks，修清同题明确缺点后冻结 exact version。
3. 从以下预声明搜索意图中探索本轮启用项：<enabled_search_intents>。
   每个 branch 在布局前填写 search_intent、delta_from_baseline、reduction test。
4. 内部可以尝试多个结构 family；机械失败、身份死亡、没有相对增量或只增加流程
   的 attempt 直接关闭，不回灌 baseline。
5. 每种 search intent 最多保留两个玩家体验不同的 hard-validated survivor；没有
   自然方案时允许为空。
6. 平级交付 baseline 与 survivor，不作审美/难度评分，不标 primary/best，不用
   工具指标暗示优先级。

本轮体验目标：
<human_experiment_goal>

原型与机制范围：
<mechanism_scope>

搜索意图与挑战维度：
<search_plan>

归档边界：

- archive 只提供人类评语、重复边界与失败模式校准；不复制旧布局和路线。
- 未经明确授权，不从旧 candidate 建立变体。
- 只有人类选中的 exact version 才进入 archive pass。
- archive pass 只记录选择，不升级状态、不修改布局。

最后交付：

1. experience brief；
2. frozen baseline record；
3. 各 branch 的预声明与 survivor record；
4. 有代表性的失败 attempt 与关闭原因；
5. 每个 survivor 的硬证据状态、证据边界和 prototype-specific check 状态；
6. 不排名、不评分的 human portfolio；
7. 尚未解决的问题和需要人类试玩判断的具体风险。
```

占位符 `<prototype_required_docs>` 必须来自当前原型 handoff；`<search_plan>` 应明确
application 新增的玩家责任、combination 的支持机制消费关系，以及 challenge 的
预声明维度。未启用的搜索意图不需要强行补齐。
