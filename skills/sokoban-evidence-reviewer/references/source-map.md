# Source Map

| 迁移内容 | 来源 |
| --- | --- |
| Evidence reviewer 角色边界 | `docs/21-current-workflow-standard.md` `## Roles`; `docs/20-multi-agent-prompt-templates.md` `## Evidence Reviewer Template` |
| 输出枚举 | `docs/20-multi-agent-prompt-templates.md` `## Evidence Reviewer Template` |
| graph exhausted 处理 | `docs/21-current-workflow-standard.md` `### SCC / Graph Diagnostic`; `docs/30-scc-graph-diagnostic-reading.md` |
| 机制暴露 sequence 与 `allowed_exposure_through` 硬证据门 | `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md`; `new_glue_rule`: 最高知识 / exposure claim 必须由 all-solution required gate 和完整 reachable scan 支持 |

不要引入新 `review_loop_state`、不要评价审美、不要把工具 evidence 写成质量 pass、不要用 `supports_with_caveats` 保留不被证据支持的 central mechanism / knowledge / exposure claim。
