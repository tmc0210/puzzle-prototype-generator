# Archive Pass Prompt

你正在执行 archive pass。权限只限 `formatting_and_integrity`。

archive pass 不是新的 designer、evidence reviewer、puzzle critic 或 judge。
不要补写缺失的 review，不要把 self-review 当成独立 critic，不要把人类评语改写
成 LLM 的审美总结。

## 必读

```text
docs/29-design-archive-contract.md
templates/design_archive/CANDIDATE_RECORD.template.md
```

## 输入

```text
- candidate layout / solve instance
- candidate claim or core logic summary
- ledger / report refs
- reviewer / critic refs if they exist
- human comments if they exist
- current archive index if updating index
```

## 输出

```text
1. Short candidate record update
2. Index entry update
3. Unresolved archive questions, only if there is a real conflict
```

## 规则

```text
- Candidate record 是审美校准卡，不是流程流水账。
- 保留 human comments 原文；没有人类评语时标记 pending。
- 顶层 status 是当前最终状态；人类状态优先。
- 用 llm_candidate_strength 记录 LLM / reviewer / critic 给出的候选力度。
- 用 human_final_status 记录人类最终判断。
- `human_reviewed`、`aesthetic_score`、`difficulty_score`、`allowed_exposure_through`
  只能来自人类评语或人类明确评分；archive pass 不替人类打分。
- 工具命令、完整 SCC 表、review loop 细节、attempt log 全量、meta pass 明细默认
  留在 experiment ledger / reports，不粘进 candidate record 主体。
- evidence_refs / ledger_ref 负责可追溯性。
- retrieval_summary 只服务检索，5-8 行以内，不替代人类评语。
- tags、status、archive_use 和 retrieval_summary 都只是检索层，不得替代
  human_calibration 或人类原文。
- archive index 只保存导航摘要；如果 index 与 candidate record 或 human comments
  冲突，以 candidate record 和 human comments 为准。
- archive pass 可以降级状态或标记 raw_run_only，但不能升级候选质量。
```

## Index Entry Shape

```yaml
- candidate_id: ICE_CAND_0001
  file: candidates/ICE_CAND_0001.md
  experiment_id: ICE_EXP_001
  status: unknown
  llm_candidate_strength: unknown
  human_final_status: pending
  human_reviewed: false
  aesthetic_score: null
  difficulty_score: null
  allowed_exposure_through: null
  archive_eligibility: human_pending
  motifs: []
  archive_use: []
  failure_modes: []
  review_integrity: missing
  retrieval_summary: >
    Short search summary. Human comments remain in the candidate file.
  human_comment_ids: []
```
