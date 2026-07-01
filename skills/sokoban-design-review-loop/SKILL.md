---
name: sokoban-design-review-loop
description: 编排 Sokoban-like 原型的单关设计审查循环。Use when Codex needs to assemble candidate packets, route solver or analyzer evidence, call independent evidence reviewer and puzzle critic roles, handle designer_action_N, or prepare archive-facing summaries without drifting from the established review-loop contract.
---

# Sokoban Design Review Loop

## 核心职责

你是 design review loop 的 controller / lead designer。你负责组装材料、路由证据、调用独立审查角色、处理下一步动作，但不能把自己写成独立 reviewer、critic、judge 或 archive pass。

保持这个边界：

- 工具证据先于设计声称。solver / analyzer / graph 只提供事实，不给质量通过。
- `designer_action_N` 永远不能关闭 review loop。若还要推进候选，必须进入 `review_N+1`、人类 review、hold、reject、change family 或 failed_search。
- 当用户目标是产出候选而非只做 audit / replay 时，`held_proposal`、`rejected_candidate`、`raw_run_only` 或 `reject_do_not_archive` 只关闭当前候选或归档出口，不能当作本次目标完成，也不能单独证明 `failed_search`；必须继续 revise / change family。
- `candidate_packet`、`review_request`、controller summary 或 `held_proposal` / `raw_run_only` 只是中间送审材料，不是合格候选交付。用户要求设计 / 提交合格候选时，必须有 evidence reviewer 与 puzzle critic artifact，且 latest `required_action: none` 并达到 `proposal_ready` / `proposal_ready_with_caveats`，或有人类明确接收。
- independent review artifact 优先来自真实 multi-agent / subagent。`review_request` 文件、controller summary、自问自答或同一 agent 角色扮演不算 independent review；若无法调用，标记 `review_integrity: self_review_only`、`missing` 或 `blocked`，不能把流程收束为合格候选。
- `accepted`、`mainline`、`positive_reference`、`reference` 不是本 skill 可授予状态。
- prototype-specific workflow 被原型声明时必须服从，未声明时绝不默认运行。
- archive taste context 只用于审美校准和失败模式校准；检查已有工作只用于保护工作区、识别历史参考和选择校准样本。设计 / 提交候选请求默认 `fresh_required`；除非本轮 brief 明确点名 archive / run / candidate id 并要求 replay / audit / resubmit / repair / remix / continue，否则已有 archive / run / candidate 不能作为起点、independent review 对象、交付物或目标完成条件。

## 必读路由

按任务需要读取 references：

- 组装 review 输入时读 `references/candidate-packet.md`。
- 需要 evidence reviewer 时读 `references/evidence-reviewer-template.md`，并调用或提示使用 `$sokoban-evidence-reviewer`。
- 需要 puzzle critic 时读 `references/puzzle-critic-template.md`，并调用或提示使用 `$sokoban-puzzle-critic`。
- reviewer / critic 使用 SCC 或 graph 事实时读 `references/scc-graph-reading.md`。
- 输出 archive-facing summary 或判断 clean archive 边界时读 `references/archive-boundary.md`。
- 怀疑迁移漂移或需要追溯来源时读 `references/source-map.md`。

## 工作流

1. 确认 prototype context：规则、胜利条件、对象/事件语义、可用工具、tool boundary、experiment brief。
2. 检查 `prototypes/<mechanic_id>/docs/design_handoff.yml` 是否存在。若存在，读取它并把适用的 `prototype_specific_workflows` 写进 routing；若不存在，所有原型专属 workflow 默认为 `not_applicable`。
3. 若 handoff 或 packet 声明 `interface_pair_policy`、ignored pair classes 或 risky pair classes，按声明组装 packet 和 routing；未声明时不得臆造 pair-policy 风险。
4. 在设计任何候选前写明 archive lineage policy：默认 `fresh_required`。只有 brief 明确写出授权候选和授权范围时，才能使用 `authorized_archive_variant_work`。
5. 写可被攻击的 `design_claim`：`player_insight`、`causal_chain`、`why_not_execution`、`falsification`。
6. 运行或整理本轮允许的 solver / analyzer / graph / counterfactual / start-position 证据。graph exhausted 时，相关完整图结论为 `unknown`。
7. 用 `candidate-packet.md` 组装 serious candidate packet。证据不支持 claim 时，先 revise、downgrade、discard 或 change family，不送 review。
8. 需要硬证据审查时，把 packet 和 allowed evidence sources 交给 evidence reviewer。
9. 需要玩家侧设计攻击时，先由 controller / lead designer 从本原型 clean archive 中选择 `archive_taste_context`；若没有相关且带人类评语的条目，写 `none_found` 和原因。不要要求 critic 自己检索归档，也不要要求用户手动指定候选，除非归档路径或实验意图本身不清楚。
10. 把 packet、archive taste context 或 `none_found`、routed diagnostics 交给 puzzle critic。
11. 若 critic 没有可用 human archive anchors，controller 不得采纳任何分数化审美 / 难度结论；把 `4`、`4+`、`4-`、`low 4`、`meets 4` 等结论降级为 `unscored_missing_human_archive_context` 或 `target_fit_unknown`。
12. 读取 reviewer / critic 的 `required_action`。若不是 `none`，`review_loop_state` 不能是 `proposal_ready` 或 `proposal_ready_with_caveats`。
13. 若 handoff 声明 `pre_human_submission_pass`，只在候选已 `proposal_ready` / `proposal_ready_with_caveats` 或人类要求查看当前最好版本前运行；它不能作为 review gate，也不能因 polish alone 改变 `review_loop_state`。
14. 输出 `designer_action_N`：`revise_structure`、`revise_claim`、`evidence_disagreement_for_next_review`、`downgrade_or_hold`、`reject_or_change_family`、`failed_search` 或 `unresolved`。
15. 若修改了 layout、start、goal、win condition、核心机制使用或 design_claim，重跑必要证据并进入 `review_N+1`。

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
