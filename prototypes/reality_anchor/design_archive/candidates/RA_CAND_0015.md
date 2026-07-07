# Candidate: RA_CAND_0015

```yaml
candidate_id: RA_CAND_0015
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_push_pull_curriculum
source_candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4
status: accepted
llm_candidate_strength: proposal_ready
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: null
motifs:
  - push_pull_anchor
  - movable_anchor
  - long_edge_same_direction
  - crate_pull_push
  - anchor_timing
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
  - strongly_coupled_elements
failure_modes:
  - strongly_guided_teaching
  - repeated_anchor_sweep
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_push_pull_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_review4.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_review_4.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_review_4.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.md
  - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_anchor_boundary_shift_push_pull_min3.md
```

## Layout

```text
#########
#PL..G###
#.#..####
#.##C@G##
#......##
#########
```

## Core Logic

```text
第五关 P/L 长边同向推拉应用：同一普通箱先被右拉，打开上层入口并预置到目标旁；随后玩家从 L 侧右拉 P/L，再绕到 P 侧右推两次，移动边界；最后回到底部从左侧推同一只普通箱入目标。
direction probe 完整证明所有胜路都需要 anchor_pull_right、anchor_push_right、crate_pull、crate_push；count probe 证明少于三次 P/L boundary shift 不能赢。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: 同时要求对锚点和箱子的推拉应用，在简洁的结构中实现了充分的机制覆盖和清晰的逻辑链，对于前期关卡可谓精简凝练。注意：难度和审美分都基于这只是一个前期推拉机制的综合应用关卡
    created_at: 2026-07-06T15:44:09.746Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第五关 P/L 综合应用，审美 4、难度 3。它用同一普通箱承担开局与收尾责任，中段要求 P/L 长边同向右拉与右推，避免 v1 的拼接感和 v3 的早段路线税。适合作为前期推拉机制综合应用正例；注意其强引导性来自课程位置，不应当作开放搜索关。
```
