# Candidate: RA_CAND_0017

```yaml
candidate_id: RA_CAND_0017
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_07_lexicon_playtest_feedback
source_candidate_version: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4
status: accepted
llm_candidate_strength: human_accepted_playtest
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
human_review_source_level: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_opening_comfort
revision_confirmation: same_family_wall_6_4_confirmed_by_user_2026_07_08
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 5
difficulty_label: 高难终局
allowed_exposure_through: null
motifs:
  - dual_anchor
  - push_pull_anchor
  - box_sticky_anchor
  - material_normalization
  - sticky_merge
  - sticky_rigid_move
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - mechanism_variety
  - high_design_density
  - strongly_coupled_elements
failure_modes:
  - very_high_difficulty
human_comment_ids:
  - HP_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_opening_comfort_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_07_lexicon_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4_core7.md
  - prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4_target_vacate.md
  - prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4_layout.txt
```

## Layout

```text
########
##MG.M.#
#.M.M..#
#BSLP#@#
#.G..###
########
```

## Core Logic

```text
高复杂度双锚点终局候选：P/L 与 B/S 都会被移动，并反复参与材料转换、sticky merge / split-like normalization 与刚体移动。
本记录归档同族更新修订版 wall_6_4；它在 opening_comfort 的基础上封住右下松散空间，使完整图从 449 / 975 收紧到 400 / 877，同时保留 27 步主干与 1 个胜态。
核心证据显示所有胜解都需要 P/L shift、B/S shift、pull、box_to_sticky、sticky_to_box、sticky rigid movement 和 sticky_merge。
target-vacate probe 证明上目标必须经历 covered -> uncovered -> covered，说明它不是单纯静态占位目标。
该归档不把工具证据包装成唯一解或质量裁决；人类评语是审美和难度校准来源。原 playtest review 挂在待玩项 opening_comfort；2026-07-08 用户确认 0017 应归档这个更新修订版。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_opening_comfort_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 5
    attached_to:
      - temporary_playtest
      - candidate
    reviewed_level_id: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_opening_comfort
    archived_revision_id: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v3_wall_6_4
    revision_note: 2026-07-08 用户确认 0017 应归档同族更新修订版 wall_6_4；原人评记录仍保留 opening_comfort 的 comment id。
    text: 很精彩的关卡，对于推拉和黏块拼接切割都有要求极高的应用，需要很强的推理和腾挪技巧，有大量的反直觉操作，是极难的游戏末期挑战关卡。可惜太难了我没做出来直接看的答案，所以审美分4起步，但不敢给到5，估计做出来了就给5了。此关的精巧设计、高机制密度、高要素耦合值得学习。
    created_at: 2026-07-07T16:52:24.070Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 高难终局挑战，审美 4、难度 5。归档版本是用户追认的同族更新修订版 wall_6_4：右下松散空间被封，完整图为 400 states / 877 transitions / 1 win，core7 与 target-vacate probe 均 complete 且无 bypass。它要求高强度应用推拉锚点、黏块拼接/切割、材料转换和 sticky 刚体移动，人类特别指出精巧设计、高机制密度和高要素耦合值得学习。由于人类未亲手解出而是看答案，审美分保守停在 4；可作为终局高密度正向校准，但不应复制其高腾挪负担到早中期关卡。
```
