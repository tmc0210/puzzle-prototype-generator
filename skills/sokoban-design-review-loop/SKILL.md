---
name: sokoban-design-review-loop
description: 编排 Sokoban-like 原型的单关设计审查循环。Use when Codex needs to bootstrap a fresh single-level candidate design, write simple-level design fields or player reasoning, assemble candidate packets, route solver or analyzer evidence, call independent evidence reviewer and puzzle critic roles, handle designer_action_N, or prepare archive-facing summaries without drifting from the established review-loop contract.
---

# Sokoban Design Review Loop

## 核心职责

你是 design review loop 的 controller / lead designer。你负责组装材料、路由证据、调用独立审查角色、处理下一步动作，但不能把自己写成独立 reviewer、critic、judge 或 archive pass。

保持这个边界：

- 工具证据先于设计声称。solver / analyzer / graph 只提供事实，不给质量通过。
- `designer_action_N` 永远不能关闭 review loop。若还要推进候选，必须进入 `review_N+1`、由人类明确接收当前风险并接管所有权、hold、reject、change family 或 failed_search。
- 当用户目标是产出候选而非只做 audit / replay 时，`held_proposal`、`rejected_candidate`、`raw_run_only` 或 `reject_do_not_archive` 只关闭当前候选或归档出口，不能当作本次目标完成，也不能单独证明 `failed_search`；必须继续 revise / change family。
- `candidate_packet`、`review_request`、controller summary 或 `held_proposal` / `raw_run_only` 只是中间送审材料，不是合格候选交付。所有难度的合格候选都必须有 evidence reviewer 与 puzzle critic artifact，且 latest `required_action: none` 并达到 `proposal_ready` / `proposal_ready_with_caveats`，或有人类明确接收。
- independent review artifact 优先来自真实 multi-agent / subagent。`review_request` 文件、controller summary、自问自答或同一 agent 角色扮演不算 independent review；若无法调用，标记 `review_integrity: self_review_only`、`missing` 或 `blocked`，不能把流程收束为合格候选。
- Reviewer / critic artifact 只有在调用消息显式要求使用对应 reviewer skill，或 repo-local skill + 对应 template 时才有效。controller 手写自由 prompt 替代 reviewer skill / template 得到的输出，即使字段看似完整，也按 `review_integrity: missing` 处理。
- 每次 puzzle critic 送审 attempt 都必须创建从未审过该候选的新 subagent，使用 `fork_turns="none"`，并分配唯一 `review_attempt_id`。同一 attempt 的 raw-first 与第二阶段使用同一 critic；任何重新送审则必须换另一个 critic，不判断改动是否“足够实质”。不得把旧 critic、designer action、修改说明或当前 controller 对话传给新 critic 的第一阶段。
- `accepted`、`mainline`、`positive_reference`、`reference` 不是本 skill 可授予状态。
- prototype-specific workflow 被原型声明时必须服从，未声明时绝不默认运行。`kind: pre_submission_check` 表示提交给人类查看或加入待玩列表前要跑的检查；它必须在执行对应提交动作前完成。当前待玩队列入口是 `prototypes/<mechanic_id>/playable_queue.yml`。
- archive taste context 只用于审美校准和失败模式校准；检查已有工作只用于保护工作区、识别历史参考和选择校准样本。
- 设计 / 提交候选请求默认 `fresh_required`；除非本轮 brief 明确点名 archive / run / candidate id 并要求 replay / audit / resubmit / repair / remix / continue，否则已有 archive / run / candidate / packet 不能作为设计起点，包括布局、接口、对象角色、因果链或最小改动变体的起点，也不能作为 independent review 对象、交付物或目标完成条件。
- 设计工作可能在多个线程发生。所以即使发生上下文压缩、线程恢复或工作区已有看似完整的 packet/review/check/artifact 或任何其他中间产物，
  只要 controller 不能在当前可见上下文中证明该候选是在本轮 brief 下按 fresh_required 顺序
  由自己流程产生，
  都视作是其他线程正在进行的工作；不得补审、续审、提交、加入待玩列表或作为目标完成条件。

## 必读路由

按任务需要读取 references：

- 组装 review 输入时读 `references/candidate-packet.md`。
- 需要 evidence reviewer 时读 `references/evidence-reviewer-template.md`，并调用或提示使用 `$sokoban-evidence-reviewer`。
- 需要 puzzle critic 时读 `references/puzzle-critic-template.md`，并调用或提示使用 `$sokoban-puzzle-critic`。
- reviewer / critic 使用 SCC 或 graph 事实时读 `references/scc-graph-reading.md`。
- 输出 archive-facing summary 或判断 clean archive 边界时读 `references/archive-boundary.md`。
- 怀疑迁移漂移或需要追溯来源时读 `references/source-map.md`。

## 设计起手式

用户要求设计 / 提交新候选时，在组装 candidate packet 前先完成：

1. 读取 brief、原型文档、design_handoff、机制暴露上下文和工具成熟度，写出本轮设计目标：role、`allowed_exposure_through`、难度 / 审美目标、机制范围。

   对包含两个或更多预期 reasoning phases 的设计，最新暴露机制的玩家控制权应延续到中后段。开局可以建立条件或首次展示，但不能在第一阶段完成该机制的全部可控变化后让其以固定配置服务剩余关卡。设计时应为第二个或更后的 reasoning phase 保留至少一次该机制再次改变局面的关键触发；真正的单 reasoning phase 设计不适用。

2. 设计前必须定位全部 clean human-reviewed archive entries，并优先读取其中的人类原文评语和人类评分。当前原型 human-reviewed 条目较少时，读取全部相关 candidate records 的 `human_comments` / `human_review` 字段；当条目超过约 25-30 个时，至少全量读取 index / retrieval summary，并按目标和分数边界读取代表条目的 `human_comments` / `human_review` 原文，且必须读取所有1分审美的归档作为警戒。可以写工作用校准摘要，但摘要不得替代人类评语；任何审美 / 难度 / 分数判断必须能回指到具体 human-reviewed entry 和人类评语或评分。未归档、未完成、raw reports、loose round materials、candidate packet、review request、subagent critic 输出或 tool-only 记录默认按流程失效或未获人类接收处理；其中的 critic 分数、designer 自评和 tool-only 质量结论一律不可信，除非同一材料后来进入 clean human-reviewed archive 或有人类明确追认。若因 duplicate-risk 或 worktree hygiene 读取这些材料，只能作为失败模式、重复风险、证据漂移或未验证材料处理。该校准不授权复用旧候选的布局、接口、对象角色、求解路线或因果链。如果正在进行全新设计，额外需要防止你的新设计逻辑链和已有归档关卡相同。
3. 若 handoff 或 brief 声明 `design_corpus.allowed_design_sources`，designer 可以在写本轮工作用设计意图 / reasoning sketch 前和本轮 Design Studio 修订中读取这些明确列出的语料，用来摘取局部摆法、对象位置、操作位置、反例边界、动作前后变化或灵感。语料不是穷尽清单：有合适摆法就复用或改造，没有则围绕当前设计差异自行构造。不要只把最基础的用法首尾相接；应通过具体地形、对象复用或操作顺序形成新的局面关系。若使用了语料，在 working note 或 attempt log 记录选用的具体摆法和新增关系。
4. 使用 brief 中预先声明的目标难度选路。目标难度 1-2 在 layout 前记录工作用玩家目标与预期机制操作；目标难度 3+ 在读取允许的设计语料后、运行 miner、脚本搜索或确定 layout 前，先写可随设计更新的 `reasoning_sketch`：玩家目标、问题、可见前提、预期结论、机制序列和反馈，以及本轮希望工具回答的问题。工作材料不得引用 archive candidate id 作为设计起点。两条路线完成对应起始材料后，都必须检索已归档项；如玩家侧逻辑链高度重合，重新寻找新的设计。
5. 使用手写结构、miner、solver、analyzer、反事实和 graph 工具寻找或验证服务于当前工作用设计意图 / reasoning sketch 的结构。miner / script search 只能用于寻找、实例化或验证服务于当前设计的结构素材；若工具结果启发了另一条设计思路，可以先作为结构素材或备选 family 记录。只有当要沿该思路继续设计、搜索、改 layout 或送审时，必须先写成新的或更新后的工作用设计意图 / reasoning sketch。不能把 miner 输出或脚本搜索结果直接当候选。
   需要描述或模拟一段具体玩家操作、备选尝试或失败路线及其局面结果时，优先使用 handoff 中的输入序列 replay 工具，取得 exact inputs、逐步状态和最终局面。
6. 取得 exact trace 后按 `candidate-packet.md` 写 `simple_level_design` 或 `player_reasoning`，读取 trace、事件、对象参与、图事实和反事实，并在组装 serious candidate packet 前完成 `solution_uniqueness` 自查。只有 `unique_complete`、`unique_within_budget` 或 `equivalent_variants_only` 可以送审；发现任一非等价胜解、多路线尚未证明等价、必要搜索未完成或证据不可用时，立即留在 Design Studio 修订，不得把阻塞状态、自造值或 `unknown` 写进 packet。一个 exact 非等价胜解已经足够触发修订，不要求继续枚举其它 bypass，也不能因路线更长、更难自然发现或只影响更高审美目标而豁免。若工具找到绕过设计预期的胜路，先看预期解比旁路多做出了什么；快速检索本轮已授权语料，有结构能利用这个差异就复用或改造，没有则围绕当前设计差异自行设计。当前布局装不下时可以插入行列或平移局部，不能把固定尺寸内加墙失败或语料中没有现成条目当作 family 不可行。修改后重跑必要证据；只有加入所需限制后核心读法被明显淹没时，才放弃或换 family。其它证据不支持情形按设计说明和玩家侧读法 revise、downgrade、discard 或 change family。

工作用设计意图、`reasoning_sketch`、`simple_level_design` 和 `player_reasoning` 默认按以下顺序写：玩家当时看见的对象与位置 -> 实际执行的操作 -> 操作后棋盘具体哪里改变 -> 因此新增、失去或必须改序的后续操作。结构简称只用于压缩已经写清的具体关系；第一次出现时必须能让读者大致画出局部形状或预测操作变化，不能代替具体说明。

目标难度 3+ 的 `player_reasoning` 用 operation segments 覆盖 canonical trace 的全部输入，并用 reasoning units 表达玩家问题、可见前提、结论、alternative 和反馈。`replayed_attempt` 从具体状态实际尝试非空输入并记录结束局面；写不出可尝试序列的空间事实放入 `premises`，或使用 `not_claimed`。`premises` 写问题发生时玩家已能看到的关系，尝试后的局面写入 `concrete_outcome`，正解后的变化写入 `feedback`。填写后 designer 快速判断玩家问题是否真实、alternative 是否具有局部收益、反馈是否值得成为主要内容。

## 长耗时工具调用

固定命令或固定脚本预计耗时较长时，controller 可以优先后台运行，并把 stdout / stderr 写入 `reports/` 下的 log、json 或 md artifact。后台任务运行期间，可以继续处理不依赖该结果的 packet、设计说明、文档或轻量验证。

controller 必须记录后台任务命令、输出路径和完成状态。最终提交前，不得留下仍在运行且会影响当前结论的后台任务。若后台产物用于 review 阶段的 hard gate，必须在 candidate packet、reviewer 输入或 designer action 中引用该 artifact；若只服务于 `kind: pre_submission_check`，只在最终提交检查记录中引用。

## 工作流

1. 确认 prototype context：规则、胜利条件、对象/事件语义、可用工具、tool boundary、experiment brief。
2. 检查 `prototypes/<mechanic_id>/docs/design_handoff.yml` 是否存在。若存在，读取它并把适用的 `prototype_specific_workflows` 写进 controller 内部 routing；只有 review-visible contract / diagnostic 才进入 candidate packet，`kind: pre_submission_check` 只进入提交前执行计划；若不存在，所有原型专属 workflow 默认为 `not_applicable`。
3. 若 handoff 或 packet 声明 `interface_pair_policy`、ignored pair classes 或 risky pair classes，按声明组装 packet 和 routing；未声明时不得臆造 pair-policy 风险。
4. 在设计任何候选前写明 archive lineage policy：默认 `fresh_required`。只有 brief 明确写出授权候选和授权范围时，才能使用 `authorized_archive_variant_work`。
5. 可在设计前和 Design Studio 修订中读取 handoff / brief 明确列出的 `design_corpus.allowed_design_sources` 作为非穷尽的 vocabulary / parts source；有合适结构就复用或改造，没有则围绕当前设计差异自行构造。不要读取未列出的同目录材料或 `excluded_sources`。
6. 按目标难度写工作用起始材料：1-2 记玩家目标与预期机制操作；3+ 写 `reasoning_sketch`。
7. 运行或整理本轮允许的 solver / analyzer / graph / counterfactual / start-position 证据。graph exhausted 时，相关完整图结论为 `unknown`。
8. 取得 exact trace 后先完成 `solution_uniqueness` 自查；只有结果为 `unique_complete`、`unique_within_budget` 或 `equivalent_variants_only`，且 evidence refs 可用时，才用 `candidate-packet.md` 写对应的 `simple_level_design` 或 `player_reasoning`。组装 serious candidate packet 前必须填写 `latest_exposure_timing_check`：独立列全 claimed latest exposed event 在 canonical optimal trace 中的 occurrence steps，并通过 operation segments 映射到 reasoning units。多 reasoning unit 候选若没有 occurrence 位于第二个或更后的 reasoning unit，写入 working note / attempt log 为 `required_but_frontloaded`，留在 Design Studio 修订，不得送审；真正单 reasoning unit 为 `not_applicable_single_reasoning_phase`。将当前 exact candidate 的 `analysis.solution.traceMetrics.calibrated` 原样写入 `hard_fact_summary_for_critic.calibrated_trace_metrics`；不得重算、删略或调用临时摘要脚本。证据不支持其中的机械前提、唯一解送审资格或 latest exposure timing 时，先 revise、downgrade、discard 或 change family，不送 review。

9. 所有难度都进行独立硬证据审查。controller 调用消息必须明确要求 reviewer 使用 `$sokoban-evidence-reviewer`；若该 skill 不可用，必须读取 `<repo_root>/skills/sokoban-evidence-reviewer/SKILL.md` 和 `<repo_root>/skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md`。调用消息必须要求严格使用模板字段，不能使用自由格式 review。输入必须包含完整 candidate packet、allowed evidence sources、review_iteration、candidate_version 和 routed evidence diagnostics。controller 手写自由 prompt 替代 skill / template、缺少模板关键字段或自由格式输出时，不算 independent evidence reviewer artifact。若 reviewer 因 `solution_uniqueness` 使用非法值或与提交证据明显冲突而将其写入 `unsupported_or_overclaimed`，当前版本立即回到 Design Studio，不得继续发送给 puzzle critic。
10. 需要玩家侧设计攻击时，先由 controller / lead designer 从本原型 clean human-reviewed archive 中选择 `archive_taste_context`。anchors 必须包含至少 1 个目标正例或高分例，以及至少 1 个相关低分、失败、下界或人类明确不满意的例子；若相关低分 / 失败例不存在，写 `negative_anchor_none_found` 和原因。普通目标默认选 2-3 个校准案例；复杂目标、近期漂移或高分目标默认选 3-4 个；最多 4 个。critic 若认为 anchors 不足以校准攻击性，可以主动读取更多 clean human-reviewed archive 条目或 index / retrieval summary；但不得用未归档 / 未完成材料做正向审美、难度或分数校准。
11. 缺少 `archive_taste_context` 或明确 `none_found` 的 packet 不得发送给 puzzle critic。
12. puzzle critic 采用同一 fresh critic 的两阶段调用。controller 先按 `candidate-packet.md` 组装独立 `critic_raw_packet`，创建 `fork_turns="none"` 的全新 subagent，只给 critic skill / template 与该 raw packet；critic 必须先写并落盘 `independent_reading`。第一阶段完成前不得提供完整 candidate packet、claim、RU、旧 critic、designer action、修改说明或当前 controller 对话。
13. 第一阶段 artifact 有效后，controller 才对同一 critic 使用 follow-up，按原有 `claim_last_review` 路由提供完整 candidate packet，或 facts packet 后再提供 claim packet。critic 以既有模板完成最终评审；final verdict 可以维持或严于 `independent_reading`，不得因 designer claim 变得更宽松。调用消息仍必须明确要求使用 `$sokoban-puzzle-critic`；若 skill 不可用，读取 repo-local skill 与模板。自由 prompt、单阶段读取、缺模板字段或越序读取均按 `review_integrity: missing`。
14. 每次重新送审都分配唯一 `review_attempt_id`，并创建另一个从未审过该候选的 `fork_turns="none"` critic。不得复用上一版 critic；不判断改动是否“足够实质”。最终 artifact 记录 `review_attempt_id` 与实际 `critic_instance_id`。任一 id 缺失、critic 非全新、raw packet 的 canonical `exact_inputs` 为空或 `independent_reading.exact_basis` 为空，都不能收束为合格候选。
15. 若 critic 没有可用 human archive anchors，controller 不得采纳任何分数化审美 / 难度结论；把 `4`、`4+`、`4-`、`low 4`、`meets 4` 等结论降级为 `unscored_missing_human_archive_context` 或 `target_fit_unknown`。
16. 读取 reviewer / critic 的 `required_action` 和 critic 的 `critic_items`。若 `required_action` 不是 `none`，或存在 `blocks_proposal_ready: true` 的 critic item，`review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
17. 若 handoff 声明 `kind: pre_submission_check`，在候选已 `proposal_ready` / `proposal_ready_with_caveats` 后、实际提交给人类查看或加入待玩队列前运行；人类明确要求查看当前最好版本时也可先运行并标注 caveats。它不提交给 reviewer / critic 作为质量证据，也不能因 polish alone 改变 `review_loop_state`；未完成时不得执行对应提交动作。加入待玩列表时只更新 `playable_queue.yml.entries`，使用 `source: package|studio|archive` 加 `level_id` 或 `candidate_id`。
18. 输出 `designer_action_N`：`revise_structure`、`revise_claim`、`evidence_disagreement_for_next_review`、`downgrade_or_hold`、`reject_or_change_family`、`failed_search` 或 `unresolved`。必须对每个 critic item 做 `critic_item_triage`：修改、引用 packet 回答、下一轮补上下文、接受为非阻塞、说明拒绝理由、降级 / hold 或换 family。
19. 在 design / review loop 内，若修改了 layout、start、goal、win condition、核心机制使用或玩家推理内容，重跑必要证据并进入 `review_N+1`；任何需要 critic 再判断的情形都按第 14 项更换 fresh critic；第 17 项 `pre_submission_check` 按其专用规则处理。

## 固定状态

只使用这些 `review_loop_state`：

```text
proposal_ready
proposal_ready_with_caveats
revise_required
held_proposal
rejected_candidate
failed_search
structural_redesign_needed
```

只使用这些 `review_integrity`：

```text
independent_review
human_review
self_review_only
missing
blocked
```

只使用这些 `archive_eligibility`：

```text
clean_archive
human_pending
raw_run_only
reject_do_not_archive
```

遇到历史材料中的其它状态值时，标记为 drift / needs normalization，不要继续传播。
