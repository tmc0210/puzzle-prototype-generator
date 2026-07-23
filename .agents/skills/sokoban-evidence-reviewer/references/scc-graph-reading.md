# SCC / Graph 硬证据读取

Evidence Reviewer 只核验 graph 是否属于当前 exact version、搜索是否 complete、字段的机械含义以及声明是否超出证据边界。

- `complete` 才能支持完整可达图结论；`budget_limited` 只能支持记录预算内结论。
- `exhausted` 时，依赖完整图的声明必须为 `unknown`。
- 一个 winning state 不证明所有胜路包含同一事件。
- SCC、commitment、win-reachable、dead 和 viable 只按工具定义解释，不产生难度、审美或玩家体验 verdict。
- SCC / graph 不进入下游 Puzzle Critic 的审美输入；本角色只保存机械审计结论与原始引用。
