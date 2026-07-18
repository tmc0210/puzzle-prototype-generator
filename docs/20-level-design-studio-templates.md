# 关卡设计工作室模板索引

状态：[关卡设计工作室执行标准](21-level-design-studio-standard.md)的产物入口。

本文不复制 schema。下列 reference 是各产物格式的唯一权威来源：

| 产物 | 唯一模板 | 写入者 |
| --- | --- | --- |
| task-local exploration dispatch、request、lexicon 与 batch record | `skills/sokoban-mechanism-lab/references/task-exploration-format.md` | designer/controller 写 dispatch 与 request；explorer 写 lexicon 与 runs |
| experience brief | `skills/sokoban-level-design-studio/references/experience-brief-template.md` | designer |
| 体验核心、冻结设计树、工作节点与尝试日志 | `skills/sokoban-level-design-studio/references/design-tree-template.md` | 主 agent（designer / controller） |
| designer 送审包 | `skills/sokoban-level-design-studio/references/submission-packet-template.md` | designer；不提供给 level reviewer |
| 独立硬证据审查 | `skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md` | fresh evidence reviewer |
| 阶段 A 玩家侧质量门输入白名单 | `skills/sokoban-level-reviewer/references/review-packet.md` | 主 agent 按 controller 职责从实际产物组装 |
| 阶段 A 玩家侧质量门 | `skills/sokoban-level-reviewer/references/review-template.md` | fresh level reviewer |
| 阶段 B 教练 context | `skills/sokoban-level-reviewer/references/coach-context.md` | 阶段 A 存活后由 controller 组装 |
| 阶段 B 自然语言教练意见 | `skills/sokoban-level-reviewer/references/coach-note.md` | 同一 fresh reviewer |
| `designer_action_N` | `skills/sokoban-level-design-studio/references/designer-action-template.md` | designer |
| 原型专属提交前工作流记录 | `skills/sokoban-level-design-studio/references/pre-submission-workflow-template.md` | 主 agent（controller 职责） |
| 设计树人类待玩交接 | `skills/sokoban-level-design-studio/references/human-handoff-template.md` | 主 agent（controller 职责） |

流程顺序、角色权限和失败后的动作只以 docs/21 为准；设计概念只以 docs/17 为准；原型专属检查只以当前原型 `docs/design_handoff.yml` 及其 authority docs 为准。
