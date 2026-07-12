# Source Map

本 skill 组是保真封装，不是新流程定义。下表用于迁移追溯。

| 迁移内容 | 来源 |
| --- | --- |
| Roles: lead designer、工具、evidence reviewer、puzzle critic、archive pass | `docs/21-current-workflow-standard.md` `## Roles` |
| 嵌套 family loop 与 review-modify loop | `docs/21-current-workflow-standard.md` `## Core Loop` |
| Pre-review design bootstrap：先写设计目标和按目标难度分流的工作用意图 / reasoning sketch，再用工具找结构 / 验证，exact trace 后生成正式设计字段；归档校准以人类原文评语 / 评分为权威，工作摘要不能替代人类评语 | `docs/21-current-workflow-standard.md` `## Design Studio Loop`; `docs/22-ruleset-to-seeds-and-slots-draft.md` `## Step 3: Miner Use`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md`; prototype `design_handoff.yml` / `design_directives.md` when present; `new_glue_rule`: 人评归档全量定位阈值与回指要求 |
| Design corpus / lexicon 可在初始工作用设计意图 / reasoning sketch 前和 Design Studio 修订中作为 vocabulary / parts source，包括工具暴露旁路或结构职责缺失后的重新检索；只读取 handoff / brief 明确列出的 allowed sources，不推断同目录其它文件或 excluded sources 可读 | `new_glue_rule`: 支持从原型机制语料摘取零件和组合灵感，同时保持新设计与旧 run / candidate 边界 |
| Pre-tool design-field ordering：运行 miner、脚本搜索或确定 layout 前，难度 1-2 先记工作用玩家目标与预期机制操作，难度 3+ 先写可更新的 reasoning sketch 和工具问题；miner / script search 只能服务于当前设计，正式设计字段在 exact trace 后填写 | `docs/21-current-workflow-standard.md` `## Design Studio Loop`; `prototypes/ice_slide_escape/docs/meta_interfaces.md` meta redesign 先提出读法假设、再工具验证；`new_glue_rule`: 将该顺序显式扩展到 miner / script search 前 |
| 难度分流与 critic raw-first 隔离 | `new_glue_rule`: 难度 1-2 使用 `simple_level_design`，难度 3+ 使用 `player_reasoning`；critic 第一阶段只读独立 `critic_raw_packet`，落盘初判后第二阶段恢复原有完整评审 |
| Solution uniqueness 送审资格：designer 只可提交 `unique_complete`、`unique_within_budget` 或 `equivalent_variants_only`；evidence reviewer 只核对合法值及其与提交证据的明显冲突，打回后同版不进入 critic | `docs/04-solver-evaluator.md` `## 有价值解唯一性`; `docs/18-validated-level-design-loop.md` `### 局部可交换关键步骤`; `docs/21-current-workflow-standard.md` `## Design Studio Loop`, `## Review Loop`; `new_glue_rule`: 将唯一逻辑类从宽泛设计目标接入送审资格 |
| `designer_action_N` 不能关闭 review loop | `docs/21-current-workflow-standard.md` `## Core Loop`, `## Review Loop` |
| Candidate packet 最小字段 | `docs/21-current-workflow-standard.md` `## Candidate Packet`; `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template` |
| Diagnostic routing | `docs/21-current-workflow-standard.md` `## Diagnostic Routing` |
| Evidence reviewer 输出 | `docs/20-multi-agent-prompt-templates.md` `## Evidence Reviewer Template` |
| Puzzle critic 输出 | `docs/20-multi-agent-prompt-templates.md` `## Puzzle Design Critic Template` |
| Reviewer / critic invocation contract：有效 artifact 必须由对应 reviewer skill，或 repo-local skill + template 调用产生；自由 prompt 替代无效 | `docs/20-multi-agent-prompt-templates.md` reviewer / critic templates; `docs/21-current-workflow-standard.md` `## Roles`, `## Review Loop`; `new_glue_rule`: 防止 controller 手写自由 reviewer prompt 导致标准漂移 |
| Designer action 输出 | `docs/20-multi-agent-prompt-templates.md` `## Lead Designer Review-Loop Action Template` |
| Terminal states | `docs/21-current-workflow-standard.md` `## Terminal States` |
| Archive pass 权限和 process integrity | `docs/29-design-archive-contract.md` `## Archive Pass 权限`, `## Process Integrity` |
| 没有 human archive anchors 时禁止分数化审美 / 难度结论 | `docs/20-multi-agent-prompt-templates.md` `## Candidate Packet Template`, `## Puzzle Design Critic Template`; `docs/21-current-workflow-standard.md` `### Archive Taste Context` |
| 未归档 / 未完成材料默认不能作为正向审美、难度或分数校准 | `new_glue_rule`: 未进入 clean human-reviewed archive 或未经人类明确追认的 round/report/critic-only score 默认按流程失效或未获接收处理 |
| critic archive anchors 必须包含正例和低分 / 失败 / 下界人评例 | `new_glue_rule`: 第一阶段固定随 raw packet 提供；第二阶段保留 critic 主动读取更多 clean human-reviewed 条目的既有能力 |
| 每次重新送审强制全新 critic | `new_glue_rule`: 每次创建 `fork_turns="none"` 的新 subagent，分配唯一 `review_attempt_id`，不复用旧 critic 或传递版本叙事 |
| critic 第一阶段输入白名单与初判锁定 | `new_glue_rule`: 第一阶段只读规则、布局、非空 exact inputs、机械 replay 和固定人评校准；第二阶段读取既有材料后，最终 verdict / state / action 不得更宽松 |
| 证据完整性不是 critic merit；`player_facing_merits` 只能写玩家侧审美 / 难度 / role-fit 优点 | `docs/21-current-workflow-standard.md` `## Roles`, `## Diagnostic Routing`, `## Review Loop`; `docs/30-scc-graph-diagnostic-reading.md`; `new_glue_rule`: 防止 admission-control 事实被写成设计优点 |
| SCC / graph 解释链 | `docs/30-scc-graph-diagnostic-reading.md` `## Core Rule` |
| Prototype-specific workflow 不默认泛化 | `docs/21-current-workflow-standard.md` `### Prototype-Specific Work`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md` `## Prototype-specific Extension Requirement` |
| 未授权 archive candidate 变体禁令 | `docs/21-current-workflow-standard.md` `### Variant / Family Diagnostic`, `### Archive Taste Context`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md` |
| 机制暴露 sequence 与 `allowed_exposure_through` 硬证据门 | `prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml`; `templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md`; `new_glue_rule`: exposure claim 必须由 all-solution required gate 和完整 reachable scan 支持 |
| design handoff 文件 | `new_glue_rule`: 将已存在的 prototype docs 以机器可读索引交给通用 skill |
| interface pair policy 由原型 handoff / brief 声明，generic critic 只服从不发明 | `new_glue_rule`: 防止原型专属 pair 风险在通用 skill 中漂移 |
| `kind: pre_submission_check` 只在候选准备提交给人类查看或加入待玩队列前运行 | `new_glue_rule`: 将原型专属自然语言 polish checklist / cleanup checklist 接入提交动作前检查 |
| playable queue 当前实现 | `src/playable/repository.ts`; `prototypes/<mechanic_id>/playable_queue.yml` 是唯一待玩队列入口 |

## Drift sentinels

遇到以下情况，标记为 drift / needs normalization，不要传播：

- `accepted` 被当作 `review_loop_state`。
- `post_designer_correction`、`independent`、`human_review_available` 等非枚举值被当作 `review_integrity`。
- self-review 被写成 independent review。
- controller 手写自由 reviewer / critic prompt 替代对应 skill / template，并把结果计为 independent reviewer artifact。
- archive pass 补写缺失 critic。
- critic 把 graph fact 直接当作质量判决。
- archive taste context 使用没有人类评语的条目。
- 未归档 / 未完成材料中的 critic 分数、designer 自评或 tool-only 质量结论被当作正向 taste anchor。
- critic / designer 在没有 human archive anchors 时输出 `4`、`4+`、`4-`、`low 4`、`meets 4` 或其他分数化结论。
- evidence reviewer 用 `supports_with_caveats` 保留不被证据支持的 central mechanism / exposure claim。
- candidate packet 的 `solution_uniqueness.result` 使用三个合法送审值之外的值，或提交证据已经包含 exact 非等价胜解却仍声明可送审。
- evidence reviewer 因 `solution_uniqueness` 非法或与证据明显冲突而打回后，controller 仍把同一 candidate version 发送给 critic。
- prototype-specific workflow 在未声明时被默认执行。
- design corpus 未经 handoff / brief 明确列出就被读取，或读取了 excluded sources。
- designer 从 archive candidate 开始改题，但 brief 没有明确授权候选 id 和允许操作。
- critic 把 handoff 声明为 ignored 的 pair 解读成 caveat、core blocker 或审美风险。
- 提交前 polish / cleanup checklist 的细节被放入 reviewer / critic packet、用于改变 review_loop_state、证明 failed_search，或未完成时仍执行对应提交动作。
- critic 在第一阶段 `independent_reading` 落盘前收到完整 candidate packet、designer claim / RU、目标分数、旧 critic、修改说明、trace metrics 或 controller summary。
- 重新送审时复用旧 critic，或 subagent 继承 controller 对话。
- critic 的 `exact_inputs` 为空，或 `exact_basis` 没有引用布局 / 具体输入步骤。
- critic 仅因操作段或走位长度较长，就将其升级为核心攻击。
