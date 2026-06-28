# Archive Pass Prompt

你正在执行 archive pass。你可以是刚才的 LLM designer / controller，也可以是
人类或脚本；但此时你的权限只限 `formatting_and_integrity`。

archive pass 不是新的 designer、evidence reviewer、puzzle critic 或 judge。
不要补写缺失的 review，也不要把 self-review 当成独立 critic。

## 必读

```text
docs/29-design-archive-contract.md
docs/21-current-workflow-standard.md
templates/design_archive/CANDIDATE_RECORD.template.md
```

## 输入

```text
- experiment brief
- candidate packet
- design search ledger、candidate-specific ledger slice、search_ledger_status
- tool / analyzer evidence
- evidence reviewer artifact，若有
- puzzle critic artifact，若有
- designer responses or revisions
- human freeform comments，若有
- current archive index，若有
```

## 输出

```text
1. Candidate record update
2. Index entry update
3. process_integrity / archive_eligibility
4. unresolved archive questions
```

## 规则

```text
- 保留 human comments 原文。没有人类评语时标记 pending / empty。
- LLM 派生摘要和标签必须放在 archive_pass_derived 下。
- tags 是导航元数据，不是评分或最终裁决。
- 如果 human comment 批评 critic，把它记录为 critic_calibration。
- 如果 human comment 指出 designer 漏掉真实亮点，把它记录为
  designer_calibration 和检索元数据。
- 如果证据中没有某个细节，写 unknown，不要补。
- 保留 design search ledger。若缺失、浅、未达预算，只能记录为证据强度限制，
  不能升级候选。
- 如果缺少独立 review artifact，process_integrity 必须标记 missing / blocked
  或 self_review_only。
- self_review_only 不能满足 Critic Gate，不能标记 positive_reference、
  reference、accepted 或 valid_candidate_after_search。
- 如果 candidate record、index 摘要和 evidence / human comments 冲突，以
  candidate record 和 human comments 为准，并把冲突列为 unresolved question。
```

## 建议字段

```yaml
process_integrity:
  design_packet: present | missing
  tool_evidence: present | missing | incomplete | not_applicable
  evidence_reviewer_artifact: present | missing | blocked | not_applicable
  puzzle_critic_artifact: present | missing | blocked | not_applicable
  designer_response_to_review: present | missing | not_needed
  post_revision_evidence_rerun: present | missing | not_needed
  review_integrity: independent_review | human_review | self_review_only | missing | blocked
  archive_eligibility: clean_archive | human_pending | raw_run_only | reject_do_not_archive
  notes: ""

archive_pass_derived:
  status: unknown
  search_ledger_status: unknown
  motifs: []
  archive_use: []
  strengths: []
  failure_modes: []
  critic_calibration: []
  designer_calibration: []
  human_taste_signals: []
  retrieval_summary: ""
```

## Index Entry Shape

```yaml
- candidate_id: ICE_CAND_0001
  file: candidates/ICE_CAND_0001.md
  experiment_id: ICE_EXP_001_d4_rebound_edge_goal
  status: unknown
  archive_eligibility: human_pending
  motifs: []
  archive_use: []
  strengths: []
  failure_modes: []
  search_ledger_status: unknown
  review_integrity: missing
  retrieval_summary: >
    Short derived summary for search and prompt selection. Human comments remain
    in the candidate file.
  human_comment_ids: []
```
