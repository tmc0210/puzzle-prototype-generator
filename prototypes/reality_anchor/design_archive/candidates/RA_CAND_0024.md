# Candidate: RA_CAND_0024

```yaml
candidate_id: RA_CAND_0024
prototype: reality_anchor
source_candidate_version: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
status: rejected_candidate
human_final_status: archived_negative_example
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 1
difficulty_score: 3
allowed_exposure_through: null
human_comment_ids:
  - HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
```

## Layout

```text
#########
####P####
####L####
#...MM.G#
#@S.M...#
##B...G##
####...##
#########
```

## Core Logic

```text
该关看起来机制利用率高，并有右上目标需用角落锚点完成的反转；但玩家看到三个黏块和两个可动锚点后，会期待切割拼接、长链推动或黏块几何利用，实际体验主要是推拉腾挪。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 1
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      这关是算法指标看不出来的非典型反例。看起来机制利用率高，并且有“右上的目标竟然需要用角落里的锚点而非看起来更显然的箱子达成”这一反转。
      但是这关玩家看到中间的三个黏块、两个可动的锚点，会期待更精彩的切割拼接构造或是长链推动、黏块几何形状利用，但是实际上这关几乎只用到推拉腾挪走位而缺乏玩家洞见。
      黏块可达性用于限制玩家行动本身并不构成问题，但是双锚点可动过于污染读题，导致玩家期待值拉高，最后却只得到一个腾挪关。
      这关作为反例的警示仍然是不要迷信指标和探针，要切实地从玩家角度思考。
    created_at: 2026-07-08T11:36:37.428Z
status: archived_negative_example
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 1
  aesthetic_label: 反例样本
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: null
  score_source:
    - HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
```

## Retrieval Summary

```text
人类要求归档负向反例，审美1、难度3。它暴露算法指标盲点：机制信号承诺了切割拼接、长链推动或黏块几何利用，实际却主要是推拉腾挪，缺乏玩家洞见；仅作负向校准。
```

