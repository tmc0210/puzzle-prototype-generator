# Candidate: RA_CAND_0005

```yaml
candidate_id: RA_CAND_0005
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 4
allowed_exposure_through: all_current_reality_anchor_runtime_rules
human_comment_ids:
  - HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_dual_lockstep.md
```

## Layout

```yaml
player_start: [2, 2]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
###########
###.PL.####
##@BS.G####
###.MM...G#
#####..####
###########
```

## Core Logic

```text
玩家要在 push world 触及 pull world 的远目标，因此构造黏块 + B/S 锚点的三格长链。下方缓冲格和右端目标共同限制长链用途，最后用 P/L pull 收束上方目标。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。
      结构有趣，机制利用率高，整体较好的挑战关。
    created_at: 2026-07-04T15:43:53.599Z
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
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_source:
    - HP_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v4_001
```

## Retrieval Summary

```text
人类接受阶段挑战，审美4、难度4。玩家侧矛盾是用 push world 触及 pull world 远目标，解法需要黏块加锚点三格长链。人类认为结构有趣、机制利用率高、整体是较好的挑战关。
```

