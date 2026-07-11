# Candidate: CANDIDATE_ID

```yaml
candidate_id: CANDIDATE_ID
prototype: MECHANIC_ID
source_candidate_version: null
status: unknown
human_final_status: pending
archive_eligibility: human_pending
human_reviewed: false
aesthetic_score: null
difficulty_score: null
allowed_exposure_through: null
human_comment_ids: []
ledger_ref: null
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
用 3-5 行写玩家侧事实链：核心洞见、关键对象关系、反直觉点或失败边界。
不要写流程流水账、工具命令、完整 review loop、SCC / graph 表或审美 lesson。
```

## Human Verdict（人类裁决）

保留人类评语原文。若还没有人类评语，写 `status: pending`。

```yaml
human_comments:
  - id: HC_001
    author: human_designer
    text: >
      PASTE_HUMAN_COMMENT_HERE
```

## Human Calibration（人类校准）

这些评分只能来自人类判断。若不存在人类评分，保持 `human_reviewed: false`，
分数保持 `null`。`allowed_exposure_through` 有值时保留。

```yaml
human_calibration:
  human_reviewed: false
  aesthetic_score: null
  difficulty_score: null
  allowed_exposure_through: null
  score_source: []
```

## Retrieval Summary

```text
2-5 行以内。服务检索，不替代人类评语，不扩写审美课。
如果涉及审美地位，必须与 human_calibration 和人类评语一致。
```
