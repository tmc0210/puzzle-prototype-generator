# Candidate: RA_CAND_0007

```yaml
candidate_id: RA_CAND_0007
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_intro_curriculum
source_candidate_version: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 2
aesthetic_label: 功能库存
difficulty_score: 1
difficulty_label: 教学见证
allowed_exposure_through: null
motifs:
  - intro_push
  - crate_goal_witness
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
failure_modes: []
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_intro_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/submission_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.zh.md
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review_1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.md
  - prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_push_required.md
```

## Layout

```yaml
player_start: [1, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: none
```

```text
######
#@.CG#
######
```

## Core Logic

```text
第一关最小 intro witness：玩家先向右走一格，再向右推箱子，箱子覆盖目标后胜利。
没有 P/L、B/S 或 sticky 材料，唯一核心事件是 push_object。

完整图和 push_required probe 支持：最短 2 步、无缺少 push 的胜路。归档定位是
功能教学，不声明谜题深度。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 最基本的无锚点教学关
    created_at: 2026-07-04T17:44:56.935Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 2
  aesthetic_label: 功能库存
  difficulty_score: 1
  difficulty_label: 教学见证
  allowed_exposure_through: null
  score_source:
    - HP_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_001
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: not_needed
  latest_review_iteration: review_1
  latest_candidate_version_reviewed: RA_CURR_2026_07_05_L01_INTRO_PUSH_v1
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: present
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Independent evidence reviewer and puzzle critic both reached required_action:none
    before human playtest. Human review supplied functional intro calibration.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/submission_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.zh.md
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review1.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review_1.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_review_1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L01_INTRO_PUSH_v1_push_required.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第一关 intro witness，审美 2、难度 1。它只教走路、
推箱和箱子覆盖目标胜利，没有任何锚点或材料事件。用户评价为“最基本的无锚点教学关”。
适合作为功能库存/课程起点校准，不应作为审美正例或挑战关参考。
```
