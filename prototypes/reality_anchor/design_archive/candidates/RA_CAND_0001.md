# Candidate: RA_CAND_0001

```yaml
candidate_id: RA_CAND_0001
prototype: reality_anchor
source_candidate_version: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
status: accepted
human_final_status: accepted
archive_eligibility: clean_archive
human_reviewed: true
aesthetic_score: 4
difficulty_score: 4
allowed_exposure_through: all_current_reality_anchor_runtime_rules
human_comment_ids:
  - HC_RA_CAND_0001_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_dual_axis_anchor_lock.md
```

## Layout

Solve instance:

```yaml
player_start: [1, 3]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: vertical
box_sticky_anchor: horizontal
```

```text
##########
#.##MG.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Core Logic

```text
竖直 P/L 负责 pull-side 访问和右侧收尾压力；水平 B/S 负责材料边界。玩家要把上方目标旁被墙封住的 M 转化成下方黏性把手，再回推覆盖上目标。归档只作为正交双锚高密度正例，不声明唯一路线或对象实例必经。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_RA_CAND_0001_001
    author: human_designer
    status: accepted
    aesthetic_score: 4
    difficulty_score: 4
    attached_to:
      - candidate
      - design_claim
      - tool_evidence
      - review_loop
    text: >
      机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
      综合质量较高的好关。
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
    - HC_RA_CAND_0001_001
```

## Retrieval Summary

```text
人类接受正例，审美4、难度4。亮点是竖直 P/L 与水平 B/S 的正交耦合：P/L 提供 pull-side 和目标压力，B/S 制造材料债务与下方把手。人类评语强调机制多样、设计密度高、要素强耦合和玩家视角矛盾。
```

