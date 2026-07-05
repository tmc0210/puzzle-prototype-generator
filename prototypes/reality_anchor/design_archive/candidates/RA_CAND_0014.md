# Candidate: RA_CAND_0014

```yaml
candidate_id: RA_CAND_0014
prototype: reality_anchor
experiment_id: RA_CURR_2026_07_05_box_sticky_curriculum
source_candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3
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
  - box_sticky_anchor
  - fixed_anchor
  - box_to_sticky
  - sticky_merge
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
failure_modes:
  - tiny_forced_witness
human_comment_ids:
  - HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_CURR_2026_07_05_box_sticky_curriculum.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review3.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review_3.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review_3.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md
```

## Layout

Solve instance:

```yaml
player_start: [3, 5]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: none
box_sticky_anchor: fixed horizontal wall-pocket
```

```text
#######
#.....#
#B.C#.#
#S...@#
###M.G#
#######
```

## Core Logic

```text
第八关固定 B/S joining witness：玩家从右侧中间走回 crate 上方，把 crate 下推过固定 B/S 分界，触发 box_to_sticky 与 sticky_merge；随后走到合并刚体左侧，右推两次使下方 sticky 覆盖目标。
fixed-anchor material probe 完整，所有胜路都需要 fixed B/S material effect、box_to_sticky、sticky_merge 与 sticky_rigid_move；reachable scan 无 B/S 位移。
人类归档定位为“黏箱用于拼接的教学关”，审美 2 / 难度 1。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 2
    difficulty_score: 1
    attached_to:
      - temporary_playtest
      - candidate
    text: 黏箱用于拼接的教学关
    created_at: 2026-07-04T19:35:47.165Z
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
    - HP_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_001
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review3.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review_3.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3_review_3.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v3.md
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 第八关固定 B/S joining witness，审美 2、难度 1。普通箱跨过固定 B/S 后转为 sticky，并与下方 sticky 拼接，随后合并刚体覆盖目标。适合作为“黏箱用于拼接”的短教学库存和 fixed B/S 转化下界校准，不应包装成高难或高密度谜题。
```
