# Archive Boundary Reference

Archive pass 权限只限 formatting_and_integrity。它不是新的 designer、evidence reviewer、puzzle critic 或 judge。

## 可以做

- 检查 candidate record 是否有必要 artifact。
- 保存或整理已有 layout、核心逻辑、human comments、状态字段和证据引用。
- 派生检索标签、retrieval summary 和完整性状态。
- 在流程缺失时降级 `archive_eligibility`，或拒绝进入 clean archive。

## Archive taste context 选择

在 review loop 中，controller / lead designer 应在送 critic 前选择归档审美上下文：

- 只从当前 prototype 的 clean archive / candidate records 取例子。
- 只选带有人类评语且 `human_reviewed: true` 的条目。
- 优先看人类原文摘句和 human calibration scores，再看 tag / status / retrieval summary。
- 设计前校准必须定位全部 clean human-reviewed entries，并优先读取人类原文评语和人类评分；当 human-reviewed 条目超过约 25-30 个时，至少全量读取 index / retrieval summary，再按目标和分数边界读取代表条目的人类评语原文。工作摘要不能替代人类评语，审美 / 难度 / 分数判断必须能回指到具体 human-reviewed entry 和人类评语或评分。
- critic anchors 必须同时包含正向锚点和低分 / 失败 / 下界锚点；若相关低分 / 失败锚点不存在，写 `negative_anchor_none_found`。进入 critic packet 的 anchors 默认 2-4 个，但 critic 可主动读取更多 clean human-reviewed archive 条目增强攻击性。
- 只用于审美校准、失败模式和 critic 注意力校准；不得复制 layout、geometry、causal chain、solution route、object placement 或 entrance/exit relation。
- 读取 candidate record 不授权把它作为 base。只有人类请求或 experiment brief 明确授权某个 archive candidate 的变体、修补、强化、延展、remix 或继续设计时，才允许从该候选派生。
- 没有相关条目时写 `none_found`，不要用 critic-only / tool-only / designer-derived 条目补位。
- 未归档、未完成、raw reports、loose round materials、candidate packet、review request、subagent critic 输出或 tool-only 记录默认按流程失效或未获人类接收处理。它们不能提供正向审美、难度或分数校准；其中的 critic 分数、designer 自评和 tool-only 质量结论一律不可信，除非同一材料后来进入 clean human-reviewed archive 或有人类明确追认。若读取这些材料，只能用于失败模式、重复风险、证据漂移或 worktree hygiene。
- 如果没有可用 human archive taste context，reviewer / critic / designer 不能输出任何分数化审美或难度结论。禁止 `4`、`4+`、`4-`、`low 4`、`meets 4`、`3/3+` 等表述；只能写 `unscored_missing_human_archive_context`、`target_fit_unknown` 或非分数结构观察。

## 不可以做

- 补写 critic 或 evidence reviewer。
- 把 self-review 当成 independent review。
- 修改 designer 的设计说明让候选显得更好。
- 根据自己的审美提升 status。
- 用派生摘要覆盖人类评语。
- 把缺失证据、浅搜索、缺 review 的候选包装成 positive reference。
- 在没有人类明确评分时填写 aesthetic_score 或 difficulty_score。
- 在没有 human archive anchors 时采纳或转述 critic 的分数化结论。
- 把未归档 / 未完成材料中的 critic 分数或 designer 自评当作正向 taste anchor。

## 固定枚举

```text
review_integrity:
  independent_review
  human_review
  self_review_only
  missing
  blocked

archive_eligibility:
  clean_archive
  human_pending
  raw_run_only
  reject_do_not_archive
```

`review_integrity` 为 `self_review_only`、`missing` 或 `blocked` 时，不能标记 positive_reference、reference 或 accepted。

`open_required_action_after_latest_review` 不是 `none` 时，不能进入 `proposal_ready`、`proposal_ready_with_caveats` 或 accepted。

如果 designer action 出现在最新独立 review 之后，但没有后续 review，不能进入 `proposal_ready` 或 `proposal_ready_with_caveats`。
