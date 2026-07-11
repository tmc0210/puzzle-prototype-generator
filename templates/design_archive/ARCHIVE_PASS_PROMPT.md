# Archive Pass Prompt

你正在执行 archive pass。权限只限 `formatting_and_integrity`。

archive pass 不是新的 designer、evidence reviewer、puzzle critic 或 judge。
不要补写缺失的 review，不要把 self-review 当成独立 critic，不要把工具事实或
人类评语改写成新的审美裁决。

## 必读

```text
docs/29-design-archive-contract.md
templates/design_archive/CANDIDATE_RECORD.template.md
```

## 输入

```text
- candidate layout / solve instance
- candidate claim or core logic summary
- human comments if they exist
- current archive index if updating index
- ledger_ref only if a stable ledger already exists
```

不要为了归档短卡读取或枚举旧 reports、trace、probe、search log 或
mechanism_lab/runs。

## 输出

```text
1. Short candidate record update
2. Index entry update
3. Unresolved archive questions, only if there is a real conflict
```

## 规则

```text
- Candidate record 是短审美校准卡，不是流程流水账或证据包。
- 顶层 metadata 只保留 docs/29 规定的最小字段。
- 保留 human comments 原文；没有人类评语时标记 pending。
- `human_reviewed`、`aesthetic_score`、`difficulty_score` 只能来自人类评语或人类明确评分；archive pass 不替人类打分。
- 工具命令、完整 SCC 表、review loop 细节、attempt log、probe / trace / search
  report、图指标和算法指标不粘进 candidate record。
- 如需追溯，只写一个 `ledger_ref`；没有稳定 ledger 时保持 `null`。
- 除短卡字段外，不写证据文件清单或流程完整性大表。
- retrieval_summary 只服务检索，2-5 行以内，不替代人类评语。
- status、motifs、strengths、failure_modes 和 retrieval_summary 都只是检索层，
  不得替代 human_calibration 或人类原文。
- archive index 只保存导航摘要；如果 index 与 candidate record 或 human comments
  冲突，以 candidate record 和 human comments 为准。
- archive pass 可以降级状态或删除不合格记录，但不能升级候选质量。
```

## Index Entry Shape

```yaml
- candidate_id: CANDIDATE_ID
  file: candidates/CANDIDATE_ID.md
  source_candidate_version: null
  status: unknown
  human_final_status: pending
  archive_eligibility: human_pending
  human_reviewed: false
  aesthetic_score: null
  difficulty_score: null
  allowed_exposure_through: null
  motifs: []
  strengths: []
  failure_modes: []
  human_comment_ids: []
  retrieval_summary: >
    Short search summary. Human comments remain in the candidate file.
```
