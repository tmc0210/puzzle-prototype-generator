# Source Map

| 迁移内容 | 来源 |
| --- | --- |
| Puzzle critic 角色边界 | `docs/21-current-workflow-standard.md` `## Roles`; `docs/20-multi-agent-prompt-templates.md` `## Puzzle Design Critic Template` |
| Archive taste context 限制 | `docs/21-current-workflow-standard.md` `### Archive Taste Context`; `docs/29-design-archive-contract.md` `## Human Comments` |
| 没有 human archive anchors 时禁止分数化审美 / 难度结论 | `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template`, `## Puzzle Design Critic Template`; `docs/21-current-workflow-standard.md` `### Archive Taste Context` |
| critic archive anchors 必须包含正例和低分 / 失败 / 下界人评例，critic 可主动读取更多 clean human-reviewed 条目增强攻击性 | `new_glue_rule`: 防止只给正例导致 critic 攻击性不足 |
| 证据完整性不是 critic merit；`strongest_merits` 只能写玩家侧审美 / 难度 / role-fit 优点 | `docs/21-current-workflow-standard.md` `## Roles`, `## Diagnostic Routing`, `## Review Loop`; `docs/30-scc-graph-diagnostic-reading.md`; `new_glue_rule`: 防止 admission-control 事实被写成设计优点 |
| SCC / graph 解释纪律 | `docs/30-scc-graph-diagnostic-reading.md` |
| interface pair policy 由 packet / handoff 声明，critic 只服从不发明 | `new_glue_rule`: 防止原型专属 pair 风险在 critic 中漂移 |

不要授予 accepted / mainline / positive_reference / reference。不要把 graph fact 直接当质量判决。不要把 handoff 声明为 ignored 的 pair 解读成 caveat、core attack 或审美风险。不要把未归档 / 未完成材料中的 critic 分数、designer 自评或 tool-only 质量结论当作正向 taste anchor。
