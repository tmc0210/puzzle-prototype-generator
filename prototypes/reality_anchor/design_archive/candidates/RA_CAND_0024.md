# Candidate: RA_CAND_0024

```yaml
candidate_id: RA_CAND_0024
prototype: reality_anchor
experiment_id: RA_LEX_2026_07_08_playtest_feedback
source_candidate_version: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
status: rejected_candidate
llm_candidate_strength: proposal_ready_with_caveats_but_human_rejected_as_metric_blind_spot
human_final_status: archived_negative_example
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 1
aesthetic_label: 反例样本
difficulty_score: 3
difficulty_label: 常规流程
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
  - designer_calibration
failure_modes:
  - metric_probe_blind_spot
  - mechanism_signal_overpromises_payoff
  - movable_dual_anchor_reading_pollution
  - route_tax_without_player_insight
  - sticky_geometry_expectation_unfulfilled
human_comment_ids:
  - HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_LEX_2026_07_08_playtest_feedback.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review_2.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review_2.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md
  - prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_core6.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_pl_shift_min2_anchor_boundary_shift_push_pull_min2.md
  - prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_bs_shift_min4_anchor_boundary_shift_box_sticky_min4.md
  - prototypes/reality_anchor/reports/goal_prune_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
  - prototypes/reality_anchor/reports/opening_comfort_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
  - prototypes/reality_anchor/reports/redundant_element_prune_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
  - prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.txt
```

## Layout

```text
#########
####P####
####L####
#...MM.G#
#@S.M...#
##B...G##
####...##
#########
```

## Core Logic

```text
工具证据看起来很强：完整图 complete，34 步最短解、104786 states / 247141 transitions / 670 wins；core6 probe 对 pull_object、anchor_boundary_shift:box_sticky、force_chain、move_sticky_rigid、sticky_to_box 和 anchor_boundary_shift:push_pull 均 complete/no bypass。
计数 probe 证明至少两次 B/S shift 与至少两次 P/L shift 必经；B/S>=4 则被 68 步、仅两次 B/S shift 的胜路反证。目标删除检查也支持双目标职责：删除上目标会 34->9 并绕过 pl_shift，删除下目标会 34->8 并绕过 material_cut 与 pl_shift。
独立 evidence reviewer 与 puzzle critic 在工具和 archive taste context 下均给出 proposal_ready_with_caveats / required_action:none；但这正是本负例的校准价值。
人类最终评价指出该关是“算法指标看不出来的非典型反例”：三个黏块和两个可动锚点会让玩家期待更精彩的切割拼接、长链推动或黏块几何形状利用，但实际体验几乎只是推拉腾挪走位，缺乏玩家洞见。双锚点可动过度污染读题并抬高期待，最后却只得到腾挪关。
因此本记录只能作为 negative_example / critic_calibration / designer_calibration，不得作为 positive reference 或可继续提交的 playable candidate。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 1
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      这关是算法指标看不出来的非典型反例。看起来机制利用率高，并且有“右上的目标竟然需要用角落里的锚点而非看起来更显然的箱子达成”这一反转。
      但是这关玩家看到中间的三个黏块、两个可动的锚点，会期待更精彩的切割拼接构造或是长链推动、黏块几何形状利用，但是实际上这关几乎只用到推拉腾挪走位而缺乏玩家洞见。
      黏块可达性用于限制玩家行动本身并不构成问题，但是双锚点可动过于污染读题，导致玩家期待值拉高，最后却只得到一个腾挪关。
      这关作为反例的警示仍然是不要迷信指标和探针，要切实地从玩家角度思考。
    created_at: 2026-07-08T11:36:37.428Z
status: archived_negative_example
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 1
  aesthetic_label: 反例样本
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: null
  score_source:
    - HP_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_001
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
  latest_review_iteration: human_playtest
  latest_candidate_version_reviewed: RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: human_review
  review_loop_state: rejected_candidate
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  notes: >
    Human review explicitly overrides the earlier critic score posture. The
    candidate is archived to preserve a metric/probe blind spot and must not be
    used as a positive design reference.
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/candidate_packet_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review1.zh.md
- prototypes/reality_anchor/reports/evidence_review_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review_2.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_review_2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.md
- prototypes/reality_anchor/reports/event_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_core6.md
- prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_bs_shift_min2_anchor_boundary_shift_box_sticky_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_pl_shift_min2_anchor_boundary_shift_push_pull_min2.md
- prototypes/reality_anchor/reports/event_count_probe_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim_bs_shift_min4_anchor_boundary_shift_box_sticky_min4.md
- prototypes/reality_anchor/reports/goal_prune_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
- prototypes/reality_anchor/reports/opening_comfort_check_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
- prototypes/reality_anchor/reports/redundant_element_prune_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.zh.md
- prototypes/reality_anchor/reports/layout_RA_FRESH_2026_07_08_PULL_BRUSH_RETURN_v4_wall_trim.txt
```

## Retrieval Summary

```text
人类要求归档的 Reality Anchor 负向反例，审美 1、难度 3。工具证据和 critic 曾显示核心事件齐全、双目标有职责、B/S 与 P/L shift 均必经，因此它看起来像机制利用率高的双锚挑战；但人类明确指出这是算法指标看不出的玩家侧失败：三个黏块和两个可动锚点承诺了切割拼接、长链推动或黏块几何利用，实际却主要是推拉腾挪，缺乏玩家洞见。仅作 metric/probe blind spot 与“读题信号抬高期待但 payoff 不足”的负向校准，不得作为 positive reference。
```
