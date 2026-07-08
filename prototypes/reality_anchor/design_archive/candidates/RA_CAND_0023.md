# Candidate: RA_CAND_0023

```yaml
candidate_id: RA_CAND_0023
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_08_playtest_feedback
source_candidate_version: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim
status: accepted
llm_candidate_strength: human_feedback_revision_human_accepted
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
human_review_source_level: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: null
motifs:
  - box_sticky_anchor
  - material_normalization
  - sticky_merge
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
  - compact_geometry
failure_modes:
  - simple_core_concepts
  - repeated_box_processing
  - skipped_independent_review_after_micro_revision
human_comment_ids:
  - HP_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_human_feedback.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_core5.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_sticky_to_box_min2_sticky_to_box_min2.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_move_sticky_min2_move_sticky_rigid_min2.md
  - prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_layout.txt
```

## Layout

```text
########
##.G####
#@C.MM##
#.....G#
#...G###
#.BS..##
########
```

## Core Logic

```text
v3 是 v2 的人类反馈修订版：只裁掉纯冗余外墙，内部地形、对象、目标、B/S 相对关系和 expected trace 保持不变。
玩家先把 C 送入 sticky side，触发 box_to_sticky 与 sticky_merge 形成三格黏块；随后向下推动黏块组制造读题混淆，再推动 B/S 边界两次切出两个 C 输出，最后用上目标、下目标和右侧 sticky-tail 目标分别消费三个输出。
硬证据显示完整图 complete：17 步最短解、5140 states / 14372 transitions / 4 wins。core5 probe 对 box_to_sticky、sticky_merge、move_sticky_rigid、anchor_boundary_shift:box_sticky 和 sticky_to_box 均 complete/no bypass；计数 probe 证明所有胜路至少需要两次 B/S shift、两次 sticky_to_box 和两次 sticky rigid move。
由于 v2 已有独立 review，v3 改动仅为明确外框裁剪，修订步跳过完整独立 review 并重跑 hard evidence；本归档的审美与难度来源是后续人类复玩评分。
人类最终评价为审美 3 / 难度 3：核心概念简单，逐格推锚点并依次处理三个箱子略有重复；但几何紧凑，且额外一步下推黏块组作为混淆，适合作为流程中的简单应用关。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      用到的核心概念和机制比较简单，逐格推锚点并略带重复地依次处理三个箱子。
      但关卡几何结构比较紧凑，且有额外一步下推黏块组的步骤作为混淆，
      作为流程中的简单应用关还不错。
    created_at: 2026-07-08T05:19:00.655Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 3
  aesthetic_label: 可用下界
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: null
  score_source:
    - HP_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_001
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present_for_v2
  tool_evidence: present_for_v3
  evidence_reviewer_artifact: v2_only
  puzzle_critic_artifact: v2_only
  designer_actions_after_review: clear_outer_wall_trim
  post_revision_evidence_rerun: present
  latest_review_iteration: human_playtest
  latest_candidate_version_reviewed: RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: human_replay
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Full independent review was intentionally skipped for the v2->v3 outer-wall
    trim because the human edit request was clear and hard evidence was rerun.
    The archive score comes from human replay, not from the skipped review step.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_human_feedback.zh.md
- prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim.md
- prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_core5.md
- prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_sticky_to_box_min2_sticky_to_box_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_move_sticky_min2_move_sticky_rigid_min2.md
- prototypes/reality_anchor/reports/RA_LEX_2026_07_08_BRUSH_TRIPLE_OUTPUT_v3_outer_wall_trim_layout.txt
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 固定 B/S triple-output 简单应用样本，审美 3、难度 3。它要求先合并 C+MM，再下推黏块组制造中段混淆，随后两次移动 B/S 边界切出两个 C 并保留 sticky tail，由三个输出覆盖三个目标。人类明确指出核心概念简单且依次处理三个箱子略有重复，但紧凑几何和下推黏块组的混淆使其成为可用流程关；引用时应作为“简单但紧凑”的 3 分下界，不应包装成高洞见或复杂耦合正例。
```
