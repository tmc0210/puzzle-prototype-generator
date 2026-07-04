# Candidate: RA_CAND_0004

```yaml
candidate_id: RA_CAND_0004
prototype: reality_anchor
experiment_id: RA_EXP_2026_07_04_fixed_anchor_transitions
source_candidate_version: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: all_current_reality_anchor_runtime_rules
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
  - compact_causal_chain
failure_modes:
  - no_unique_route_claim
  - object_identity_not_proved
human_comment_ids:
  - HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
ledger_ref: prototypes/reality_anchor/design_archive/experiments/RA_EXP_2026_07_04_fixed_anchor_transitions.md
evidence_refs:
  - prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_feedback_revisions_review1.zh.md
  - prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_feedback_revisions_review_1.md
  - prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_feedback_revisions_review_1.zh.md
  - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3.md
  - prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3.md
  - prototypes/reality_anchor/reports/goal_prune_audit_2026_07_04.md
```

## Layout

```yaml
player_start: [3, 1]
player_goal: null
win_condition: all_targets_covered_by_objects
push_pull_anchor: fixed_vertical
box_sticky_anchor: movable_horizontal
```

```text
#########
###@SB.##
#P#..####
#L#.M.C##
####.G###
#########
```

## Core Logic

```text
P/L 被墙隔离为固定语法层，B/S 先被推开建立 sticky 材料窗口。下方结构要求玩家
先把 M 放到左侧暂存/把手格，再从 pull side 把 C 拉进 sticky side 触发
box_to_sticky，随后将新黏块与 M 合体，最后用左格作为把手携带右格落到目标。

人类评语认可下方推拉与黏块性质反复腾挪的结构有趣，同时指出上方 B/S 操作顺序
与下方操作顺序基本无关，本质上是双锚点固定关，适合“刚引入锚点可推拉”阶段。

2026-07-04 无效目标剔除审计删除了左侧底目标：删除该目标后最短解仍为 7 步，
完整图仍 complete，原 expected_trace 仍合法通关，且所有胜路仍必经 B/S shift、
pull、box_to_sticky、sticky_merge 与 sticky rigid movement。右侧目标保留；
删除右侧目标会降到 3 步并绕过核心机制。
```

## Human Verdict

```yaml
human_comments:
  - id: HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
    author: human_designer
    status: ready_for_archive
    aesthetic_score: 4
    difficulty_score: 3
    attached_to:
      - temporary_playtest
      - candidate
    text: >
      下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和
      下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    created_at: 2026-07-04T15:23:21.482Z
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 3
  difficulty_label: 常规流程
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_source:
    - HP_RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3_001
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: present
  post_revision_evidence_rerun: present
  latest_review_iteration: review_1
  latest_candidate_version_reviewed: RA_EXP_2026_07_04_FIXED_PL_DOWNPULL_SIDECAR_v3
  open_required_action_after_latest_review: none
  review_integrity: human_review
  review_loop_state: accepted
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
  post_archive_goal_prune:
    date: 2026-07-04
    removed_targets:
      - [4, 4]
    retained_targets:
      - [5, 4]
    result: clean_archive_layout_updated
```

## Retrieval Summary

```text
人类接受的 Reality Anchor 过渡关，审美 4、难度 3。固定 P/L + 可移动 B/S；
下方用 pull、box_to_sticky、sticky_merge 和 sticky 刚体反复腾挪，左格作为把手携带
右格落到唯一目标，结构被人类评为有趣。无效目标剔除已删除左侧顺路目标。
caveat：上方推 B/S 的顺序与下方操作顺序无关，本质偏“双锚点固定关”，适合刚引入
锚点可推拉事实时使用。
```
