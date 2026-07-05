# Candidate: RA_CAND_0006

```yaml
candidate_id: RA_CAND_0006
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_05_soft_handoff_no_merge_variant
source_candidate_version: RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1
status: rejected_candidate
llm_candidate_strength: raw_variant_inspection
human_final_status: archived_negative_example
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 5
difficulty_label: 高难终局
allowed_exposure_through: null
motifs:
  - dual_anchor
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_rigid_move
archive_use:
  - negative_example
  - human_taste_reference
  - critic_calibration
failure_modes:
  - goal_position_hardening
  - mechanism_beauty_weakened
  - difficulty_inflation_by_route_length
  - archive_variant_negative
human_comment_ids:
  - HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_05_soft_handoff_no_merge_variant.md
evidence_refs:
  - prototypes/reality_anchor/reports/variant_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1.md
  - prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_LAYOUT.md
  - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_core5.md
```

## Layout

```yaml
player_start: [5, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: horizontal
box_sticky_anchor: horizontal
```

```text
#########
####C@.G#
###G....#
####PL.M#
####..BS#
#########
```

## Core Logic

```text
该变体源自 RA_CAND_0002 / SOFT_HANDOFF_v3 的目标位置检查。删除中间目标并增加
上排右目标后，最短解变成 40 步无 sticky_merge 路线；完整事件探针仍证明所有胜路
需要 P/L shift、B/S shift、pull、材料转换和 sticky rigid movement。

归档核心不是“好关”，而是负向校准：人类指出小目标位置改动极大弱化机制美感，
并主要通过增加腾挪复杂度来增难，因此是较差反例。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 5
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，
      这种增加难度的方式实为较差的反例，仅做归档。
    created_at: 2026-07-04T16:38:31.629Z
status: archived_negative_example
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 5
  difficulty_label: 高难终局
  allowed_exposure_through: null
  score_source:
    - HP_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_001
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: not_applicable
  puzzle_critic_artifact: not_applicable
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: not_needed
  latest_review_iteration: human_playtest
  latest_candidate_version_reviewed: RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: human_review
  review_loop_state: rejected_candidate
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Human review explicitly requested archive only as a poor counterexample. This record
    must not be used as a positive reference or accepted curriculum candidate.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/variant_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_LAYOUT.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_05_SOFT_HANDOFF_NO_MERGE_LOCK_v1_core5.md
```

## Retrieval Summary

```text
人类要求归档的 Reality Anchor 负向样本，审美 2、难度 5。它是 RA_CAND_0002 的
高复杂度目标位置变体，工具证据仍支持双锚、pull、材料转换和 sticky rigid movement
必经；但人类明确指出小目标改动削弱机制美感，并通过较差的腾挪复杂度增难。仅作
negative example / critic calibration，不得作为 positive reference。
```
