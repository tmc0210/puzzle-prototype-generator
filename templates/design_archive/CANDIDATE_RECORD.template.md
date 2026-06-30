# Candidate: CANDIDATE_ID

```yaml
candidate_id: CANDIDATE_ID
prototype: MECHANIC_ID
experiment_id: EXPERIMENT_ID
status: unknown
llm_candidate_strength: unknown
human_final_status: pending
archive_eligibility: unknown
review_integrity: unknown
motifs: []
archive_use: []
human_comment_ids: []
ledger_ref: null
evidence_refs: []
```

## Layout

Solve instance:

```yaml
player_start: null
player_goal: null
win_condition: null
```

```text
PASTE_LAYOUT_HERE
```

## Core Logic

```text
用 3-8 行写事实链。只写候选声称的核心逻辑和证据支持到什么程度。
不要写流程流水账、工具命令、完整 review loop 或审美 lesson。
```

## Human Verdict

Keep human comments verbatim. If there is no human comment yet, write
`status: pending`.

```yaml
human_comments:
  - id: HC_001
    author: human_designer
    text: >
      PASTE_HUMAN_COMMENT_HERE
```

## Evidence Refs

```text
- report or ledger path
- report or ledger path
```

## Retrieval Summary

```text
5-8 行以内。服务检索，不替代人类评语，不扩写审美课。
必须区分 llm_candidate_strength 和 human_final_status。
```
