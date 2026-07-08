# Candidate: RA_CAND_0022

```yaml
candidate_id: RA_CAND_0022
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_08_playtest_feedback
source_candidate_version: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim
status: accepted
llm_candidate_strength: human_feedback_revision_human_accepted
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
human_review_source_level: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2
revision_confirmation: right_wall_trim_confirmed_by_user_2026_07_08
aesthetic_score: 5
aesthetic_label: 标杆范例
difficulty_score: 4
difficulty_label: 阶段挑战
allowed_exposure_through: null
motifs:
  - dual_anchor
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_rigid_move
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
  - clear_player_facing_conflict
  - high_design_density
  - strongly_coupled_elements
failure_modes: []
human_comment_ids:
  - HP_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/designer_action_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_human_feedback.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_core.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_fixed_PL.md
  - prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_review2.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_review_2.md
  - prototypes/reality_anchor/reports/RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim_layout.txt
```

## Layout

```text
#########
#..G#...#
#...MM@P#
#.....#L#
###BS####
#########
```

## Core Logic

```text
v3 是 v2 的人类反馈修订：删除右侧一列纯外墙，不改变内部地形、对象、目标、P/L pocket、B/S pocket 或 expected trace。
完整图与 v2 保持一致：12 步最短解、1081 states / 2597 transitions / 1 win。核心 probe complete/no bypass，所有胜解仍必须包含 pull_object、anchor_boundary_shift:box_sticky、sticky_to_box、move_sticky_rigid 和 force_chain。
fixed P/L scan 仍 complete，且无 reachable anchor_boundary_shift:push_pull；P/L 保持固定 pull-region boundary。
人类评价将删墙后的版本直接定为审美 5 / 难度 4，重点是反直觉地先把箱子送入看似死局的死角，再用拉锚点把两个箱子反向送入目标；空间利用率高，结构精巧，短流程里要求强玩家洞见。
该归档不把工具证据包装成唯一解、对象实例级全胜路身份或心理洞见证明；人类评语是审美与难度校准来源。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2_001
    author: human_designer
    status: needs_revision
    aesthetic_score: 5
    difficulty_score: 4
    attached_to:
      - temporary_playtest
      - candidate
    reviewed_level_id: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v2
    archived_revision_id: RA_LEX_2026_07_08_PULL_CUT_ANCHOR_HANDOFF_v3_right_wall_trim
    revision_note: 2026-07-08 用户确认删除右侧冗余外墙后可按 5/4 评分直接归档；原 playtest_reviews status 仍保留 needs_revision，因为反馈包含删墙动作。
    text: 这关的操作非常反直觉，将一个箱子先送入看似死局的死角，构造出拉锚点将两个箱子反向送入目标。空间利用率高，结构精巧。在较短的步骤中要求强玩家洞见以发现反直觉操作，是优秀的范例。
    created_at: 2026-07-08T05:03:28.082Z
status: accepted
```

## Retrieval Summary

```text
人类追认的 Reality Anchor 标杆范例，审美 5、难度 4。归档版本为删去右侧纯外墙后的 v3：完整图、最短解、核心事件组和 fixed P/L scan 均与 v2 保持一致。它的核心美感是强反直觉操作：先把箱子送进看似死局的死角，再通过拉锚点和 B/S force-chain 将两个箱子反向送入目标。人类特别标注空间利用率高、结构精巧、短步骤中要求强洞见；可作为高分 compact insight / pull-anchor handoff 正向校准。
```
