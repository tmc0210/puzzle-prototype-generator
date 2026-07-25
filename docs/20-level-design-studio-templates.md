# 关卡设计工作室模板索引

状态：[关卡设计工作室执行标准](21-level-design-studio-standard.md)的产物入口。

本文不复制 schema。下列 reference 是各产物格式的唯一权威来源：

| 产物 | 唯一模板 | 写入者 |
| --- | --- | --- |
| task-local exploration dispatch、request、lexicon 与 batch record | `.agents/skills/sokoban-mechanism-lab/references/task-exploration-format.md` | Controller 写 dispatch；Designer 写 request；Explorer 写 lexicon 与 runs |
| experience brief | `.agents/skills/sokoban-level-design-studio/references/experience-brief-template.md` | Designer |
| Designer assignment | `.agents/skills/sokoban-level-design-studio/references/designer-assignment-template.md` | Controller |
| 唯一候选、已发布 exact、review cycles 与尝试日志 | `.agents/skills/sokoban-level-design-studio/references/candidate-ledger-template.md` | Controller |
| Designer 送审包 | `.agents/skills/sokoban-level-design-studio/references/submission-packet-template.md` | Designer；不提供给 Critic |
| 独立硬证据审查 | `.agents/skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md` | fresh Evidence reviewer |
| Critic 两类校准 view、packet 与自然语言 verdict | `.agents/skills/sokoban-puzzle-critic/references/critic-contract.md` | Controller 生成校准 view 并组包；fresh Critic 一次读取后写最终批评 |
| `designer_action_N` | `.agents/skills/sokoban-level-design-studio/references/designer-action-template.md` | Designer |
| 原型专属提交前工作流记录 | `.agents/skills/sokoban-level-design-studio/references/pre-submission-workflow-template.md` | Controller；机械工具产出原始 artifact |
| 单关人类待玩交接 | `.agents/skills/sokoban-level-design-studio/references/human-handoff-template.md` | Controller |

流程顺序、角色权限和失败后的动作只以 docs/21 为准；设计概念只以 docs/17 为准；Critic 的输入防火墙与固定 verdict 只以 critic contract 为准；原型专属检查只以当前原型 `docs/design_handoff.yml` 及其 authority docs 为准。
