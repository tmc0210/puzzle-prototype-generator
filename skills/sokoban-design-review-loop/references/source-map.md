# Source Map

本 skill 组是保真封装，不是新流程定义。下表用于迁移追溯。

| 迁移内容 | 来源 |
| --- | --- |
| Roles: lead designer、工具、evidence reviewer、puzzle critic、archive pass | `docs/21-current-workflow-standard.md` `## Roles` |
| 嵌套 family loop 与 review-modify loop | `docs/21-current-workflow-standard.md` `## Core Loop` |
| `designer_action_N` 不能关闭 review loop | `docs/21-current-workflow-standard.md` `## Core Loop`, `## Review Loop` |
| Candidate packet 最小字段 | `docs/21-current-workflow-standard.md` `## Candidate Packet`; `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template` |
| Diagnostic routing | `docs/21-current-workflow-standard.md` `## Diagnostic Routing` |
| Evidence reviewer 输出 | `docs/20-multi-agent-prompt-templates.md` `## Evidence Reviewer Template` |
| Puzzle critic 输出 | `docs/20-multi-agent-prompt-templates.md` `## Puzzle Design Critic Template` |
| Designer action 输出 | `docs/20-multi-agent-prompt-templates.md` `## Lead Designer Review-Loop Action Template` |
| Terminal states | `docs/21-current-workflow-standard.md` `## Terminal States` |
| Archive pass 权限和 process integrity | `docs/29-design-archive-contract.md` `## Archive Pass 权限`, `## Process Integrity` |
| 没有 human archive anchors 时禁止分数化审美 / 难度结论 | `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template`, `## Puzzle Design Critic Template`; `docs/21-current-workflow-standard.md` `### Archive Taste Context` |
| SCC / graph 解释链 | `docs/30-scc-graph-diagnostic-reading.md` `## Core Rule` |
| Prototype-specific workflow 不默认泛化 | `docs/21-current-workflow-standard.md` `### Prototype-Specific Work`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md` `## Prototype-specific Extension Requirement` |
| 未授权 archive candidate 变体禁令 | `docs/21-current-workflow-standard.md` `### Variant / Family Diagnostic`, `### Archive Taste Context`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md` |
| design handoff 文件 | `new_glue_rule`: 将已存在的 prototype docs 以机器可读索引交给通用 skill |
| interface pair policy 由原型 handoff / brief 声明，generic critic 只服从不发明 | `new_glue_rule`: 防止原型专属 pair 风险在通用 skill 中漂移 |
| pre-human polish pass 只在候选提交给人类前运行，不能作为 review gate | `new_glue_rule`: 将原型专属自然语言 polish checklist 接入通用编排 |

## Drift sentinels

遇到以下情况，标记为 drift / needs normalization，不要传播：

- `accepted` 被当作 `review_loop_state`。
- `post_designer_correction`、`independent`、`human_review_available` 等非枚举值被当作 `review_integrity`。
- self-review 被写成 independent review。
- archive pass 补写缺失 critic。
- critic 把 graph fact 直接当作质量判决。
- archive taste context 使用没有人类评语的条目。
- critic / designer 在没有 human archive anchors 时输出 `4`、`4+`、`4-`、`low 4`、`meets 4` 或其他分数化结论。
- prototype-specific workflow 在未声明时被默认执行。
- designer 从 archive candidate 开始改题，但 brief 没有明确授权候选 id 和允许操作。
- critic 把 handoff 声明为 ignored 的 pair 解读成 caveat、core attack 或审美风险。
- pre-human polish checklist 被用于打回候选、改变 review_loop_state 或证明 failed_search。
