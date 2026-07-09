# Candidate: RA_CAND_0002

```yaml
candidate_id: RA_CAND_0002
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 4
allowed_exposure_through: all_current_reality_anchor_runtime_rules
human_comment_ids:
  - HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_soft_handoff.md
```

## Layout

Solve instance:

```yaml
player_start: [5, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########
```

## Core Logic

```text
P/L 先建立上排 crate 的 pull 通道，B/S 将 crate 与 M 带入材料债务，末段通过 sticky 刚体与 P/L 共同收束。核心玩家洞见是“拉动黏块”会打破 P/L 只能按单方向移动的直觉。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
      具有较强洞见。
    created_at: 2026-07-04T09:04:41.671Z
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
    - HP_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_001
```

## Retrieval Summary

```text
人类接受正例，审美4、难度4。机制耦合清楚：P/L 不只是按钮，B/S 的材料换相与 sticky_merge 进入末段收束。人类特别认可“拉动黏块”带来的方向性预期反转。
```

