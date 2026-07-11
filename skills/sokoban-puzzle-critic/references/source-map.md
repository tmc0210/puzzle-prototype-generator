# Source Map

| 迁移内容 | 来源 |
| --- | --- |
| Puzzle critic 角色边界 | `docs/21-current-workflow-standard.md` `## Roles`; `docs/20-multi-agent-prompt-templates.md` `## Puzzle Design Critic Template` |
| Archive taste context 限制 | `docs/21-current-workflow-standard.md` `### Archive Taste Context`; `docs/29-design-archive-contract.md` `## Human Comments` |
| 没有 human archive anchors 时禁止分数化审美 / 难度结论 | `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template`, `## Puzzle Design Critic Template`; `docs/21-current-workflow-standard.md` `### Archive Taste Context` |
| critic archive anchors 必须包含正例和低分 / 失败 / 下界人评例，critic 可主动读取更多 clean human-reviewed 条目增强攻击性 | `new_glue_rule`: 防止只给正例导致 critic 攻击性不足 |
| 证据完整性不是 critic merit；`player_facing_merits` 只能写玩家侧审美 / 难度 / role-fit 优点 | `docs/21-current-workflow-standard.md` `## Roles`, `## Diagnostic Routing`, `## Review Loop`; `docs/30-scc-graph-diagnostic-reading.md`; `new_glue_rule`: 防止 admission-control 事实被写成设计优点 |
| SCC / graph 解释纪律 | `docs/30-scc-graph-diagnostic-reading.md` |
| interface pair policy 由 packet / handoff 声明，critic 只服从不发明 | `new_glue_rule`: 防止原型专属 pair 风险在 critic 中漂移 |

保持角色边界：critic 不授予 accepted / mainline / positive_reference / reference；graph fact 先经玩家侧解释再影响 verdict；handoff 声明为 ignored 的 pair 记录为 `verdict_effect: none`；未归档 / 未完成材料中的 critic 分数、designer 自评或 tool-only 质量结论只作为失败模式或漂移材料，不作为正向 taste anchor。
