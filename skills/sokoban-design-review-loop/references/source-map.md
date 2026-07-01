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
| SCC / graph 解释链 | `docs/30-scc-graph-diagnostic-reading.md` `## Core Rule` |
| Prototype-specific workflow 不默认泛化 | `docs/21-current-workflow-standard.md` `### Prototype-Specific Work`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md` `## Prototype-specific Extension Requirement` |
| design handoff 文件 | `new_glue_rule`: 将已存在的 prototype docs 以机器可读索引交给通用 skill |

## Drift sentinels

遇到以下情况，标记为 drift / needs normalization，不要传播：

- `accepted` 被当作 `review_loop_state`。
- `post_designer_correction`、`independent`、`human_review_available` 等非枚举值被当作 `review_integrity`。
- self-review 被写成 independent review。
- archive pass 补写缺失 critic。
- critic 把 graph fact 直接当作质量判决。
- archive taste context 使用没有人类评语的条目。
- prototype-specific workflow 在未声明时被默认执行。
