# Candidate: RA_CAND_0029

```yaml
candidate_id: RA_CAND_0029
prototype: reality_anchor
source_candidate_version: STUDIO_L_1
source: studio
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 4
allowed_exposure_through: null
human_comment_ids:
  - HP_STUDIO_L_1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_FRESH_2026_07_11_playtest_feedback.md
```

## Layout

```text
########
# #*m###
#C GBSL#
#    #P#
# G@####
########
```

## Core Logic

```text
这是一个 studio 手作关卡，核心价值在两次把上方黏块当作活塞使用，推动箱黏锚点并最终归位。
两次活塞结构并不相同，因此不是简单重复动作；玩家需要重新读出局部结构如何让同一组要素承担不同阶段的推动和回收责任。
人类评价强调整体结构新颖、要素复用度和空间利用率都较高。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_STUDIO_L_1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      两次利用上方两个黏块作为活塞推动箱黏锚点并最终归位，且两次活塞结构不同，
      整体结构新颖。要素复用度和空间利用率都较高。
    created_at: 2026-07-11T20:27:27.564Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 4
  difficulty_label: 阶段挑战
  allowed_exposure_through: null
  score_source:
    - playtest_reviews.STUDIO_L_1.latest_fields
    - HP_STUDIO_L_1_001
  note: comment payload records difficulty_score 3; latest review-level field records difficulty_score 4.
```

## Retrieval Summary

```text
人类接受的 studio 手作双活塞关，审美4、难度4。核心是两次利用上方黏块作为活塞推动 B/S 并最终归位，且两次活塞结构不同；结构新颖，要素复用度与空间利用率较高。注意原始 comment payload 中 difficulty_score 为3，最新 review 顶层字段为4，本卡按最新 review 字段校准并保留原 comment payload。
```
