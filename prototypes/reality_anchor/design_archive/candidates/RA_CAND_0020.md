# Candidate: RA_CAND_0020

```yaml
candidate_id: RA_CAND_0020
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_08_playtest_feedback
source_candidate_version: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1
status: accepted
llm_candidate_strength: proposal_ready_with_caveats_human_accepted
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 3
aesthetic_label: 可用下界
difficulty_score: 2
difficulty_label: 简单练习
allowed_exposure_through: null
motifs:
  - box_sticky_anchor
  - material_normalization
  - sticky_rigid_move
archive_use:
  - human_taste_reference
  - critic_calibration
  - designer_calibration
strengths:
  - compact_causal_chain
  - geometric_symmetry
failure_modes:
  - repeated_branch_actions
human_comment_ids:
  - HP_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_review1.zh.md
  - prototypes/reality_anchor/reports/redundant_element_prune_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_review_1.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1.md
  - prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_core_exact.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_bridge_crate_push_min1_push_object_crate_2_min1.md
  - prototypes/reality_anchor/reports/RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_layout.txt
```

## Layout

```text
########
####G###
###.MM@#
##G.M..#
###.MM##
####G###
###BS###
########
```

## Core Logic

```text
固定 B/S 切开一个 C-shaped sticky，产生上下 sticky endpoint 与中心 crate bridge 三个被消费的责任：上端点入上目标，下端点入下目标，中间 crate bridge 推入中心目标。
工具证据显示完整图 57 states / 132 transitions / 3 wins，最短 8 步；core_exact probe 对 sticky_split、sticky_to_box、move_sticky_rigid、上下 endpoint push 与 bridge crate push 均 complete/no bypass。
独立 evidence review 与 puzzle critic 均 required_action:none，但 caveat 是动作分支较近、重复感存在，不应包装为高难或稳 4 审美。
人类最终评分覆盖 critic 的难度 3 判断：作为简单拆分关审美 3 / 难度 2 接收。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 3
    difficulty_score: 2
    attached_to:
      - temporary_playtest
      - candidate
    text: 简单的大黏块拆分关卡，三个分支实际上是三个重复行动，但因较好的几何对称性得以到强3分审美。
    created_at: 2026-07-07T17:39:11.417Z
status: accepted
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 固定 B/S sticky split 下界样本，审美 3、难度 2。核心是一个 C-shaped sticky 经固定 B/S 一刀切出上下 endpoint 与中心 crate bridge，三个输出分别被目标消费。人类明确认为三个分支本质是重复行动，但几何对称性足够好，因此达到强 3 审美；引用时应把它当作“重复分支可由清晰几何抬到 3”的校准样本，而不是高难或高耦合正例。
```
