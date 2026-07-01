# Candidate: ICE_CAND_0035

```yaml
candidate_id: ICE_CAND_0035
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_02_round22_same_cell_return_accepted
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
original_human_accepted_layout_version: ICE_EXP_META_2026_07_02_round22_v1
current_layout_version: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap
not_adopted_strict_patch: ICE_EXP_META_2026_07_02_round22_v2_patch
patch_status: human_accepted_soft_patch
base_no_d5d6_exposure_current: pass
base_strict_no_late_current: fail_boundary_only
review_integrity: human_review
human_reviewed: true
aesthetic_score: 5
aesthetic_label: 标杆范例
difficulty_score: 4
difficulty_label: 阶段挑战
difficulty_detail: >
  局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
  带下方死路或等价 return pressure 的整体单关体验约 4。
allowed_exposure_through: ice_boundary_disappear
allowed_exposure_note: "v3 soft patch 已消除 base 可达 d5/d6/restart 外溢；仍保留 boundary-only 可达噪音。"
motifs:
  - short_stop_d1_d2
  - destroy_moving_ice_d3
  - d4_rebound
  - boundary_disappear
  - d6_destroy_group
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - meta_reinterpretation
  - same_cell_reentry
  - single_level_meta_reuse
  - return_pressure_wrapper
archive_use:
  - positive_reference
  - human_taste_reference
  - critic_calibration
  - designer_calibration
  - positive_exception
  - abstract_meta_reference
  - do_not_template_geometry
human_comment_ids:
  - HC_ICE_CAND_0035_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round22_same_cell_return_accepted.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_layout.txt
  - prototypes/ice_slide_escape/reports/patch_report_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_no_d5d6.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_required_full.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_strict_no_late.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta_required_full.md
  - prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_ABCD.md
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v2_patch_layout.txt
  - prototypes/ice_slide_escape/reports/patch_report_ICE_EXP_META_2026_07_02_round22_v2_patch.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v2_patch_base.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v2_patch_meta.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_no_late_exposure.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_required_full.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_meta_required_full.md
  - prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v2_patch_ABCD.md
  - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt
  - prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round22_v1.md
  - prototypes/ice_slide_escape/reports/review_loop_ICE_EXP_META_2026_07_02_round22_v1.md
  - prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round22_v1.md
  - prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
  - prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
  - prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v1_ABCD.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [1, 5]
  B: [7, 5]
  C: [7, 5]
  D: [10, 4]
base_instance:
  player_start: [1, 5]
  player_goal: [7, 5]
meta_instance:
  player_start: [7, 5]
  player_goal: [10, 4]
win_condition: ice_slide_escape_explicit_goal
```

Current adopted soft patch (`ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap`):

```text
###########
#....#....#
#.#..#....#
#.G..I.####
#I..I....##
#.#####.###
```

Original human-accepted v1 layout:

```text
###########
#.........#
#....#....#
#.G..I.####
#I..I....##
#.#####.###
```

Not-adopted strict machine patch (`ICE_EXP_META_2026_07_02_round22_v2_patch`):

```text
###########
#....#....#
#.####....#
#.G..I.####
#I..I....##
#.#####.###
```

## Core Logic

```text
Base A->B 是 4 push 流程：先 d3 清掉左下冰，再用下方冰 d4 建立右侧资源，
随后从右侧把上方冰 d4 回 target，最后用 short-stop 抵达 B/C。v3 soft
patch 已消除 A 起点可达 d5/d6/restart 外溢；strict no-late 仍有
`ice_boundary_disappear:d2` 噪音，因此不能声明完全干净 early cutoff。

Meta C->D 从同一 B/C 格回访。v3 是先组织左下冰组：no-chain / short-stop
排布后，用 boundary disappear 让位，d6+ 摧毁右侧墙并打开 D；随后回到上方
用 d4 填 target，最后走到 D。Meta all-winning required d4+short+boundary+d6。
v2 strict patch 也能清掉 boundary，但压缩上层空间后更线性，未采用。

真正审美亮点不是“两个 pair 都能解”，而是 B/C 同格让首访出口在周围地图的
return pressure 下变成回访入口。玩家原路返回刷新状态后，同一单关被自然重读，
旧出口、target、左下冰组和可破墙 D 被重新组织成一关两用。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0035_001
    author: human_designer
    status: accepted
    aesthetic_score: 5
    difficulty_score: 4
    difficulty_detail: >
      局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
      带下方死路或等价 return pressure 的整体单关体验约 4。
    attached_to:
      - candidate
      - designer_claim
      - tool_evidence
      - review_loop
      - world_context_wrapper
    text: >
      这关是一个意外优秀的带 meta 要素的单关设计，而不是标准两段式
      meta-first 模板。B/C 同格意味着玩家从 B 离开后，如果周围地图让他
      不得不原路返回，刷新后的同一关会被自然重读：首访的出口变成回访入口，
      base 与 meta 不需要任何知识差，却因为地图语境和目标方向改变产生
      “一关两用”的效果。这个点非常漂亮，审美可给 5。

      但此关不应作为可机械复用的 B=C 模板。它的价值依赖周围地图配合、
      回返动机、以及同一左下冰组在回访时确实改变角色，是典型的需要但也
      值得周围关卡主动配合的好关。后续设计不能因为使用同格出入口、死路
      返回或 D-wall 就获得同等加分。另外，下方地图死路/回返压力不是增加
      难度，而是降低发现门槛并保证公平性。没有这个 wrapper，玩家可能一辈子
      不会发现 B=C 的回访读法，这不是高难而是不可见。真正应计入难度的是：
      在自然回返后，玩家意识到同一单关刷新后还有第二用途，并把旧出口、
      target 和可破墙 D 重新组织起来。局部 C->D 机制约 3；有良好回返
      wrapper 的整体难度约 4。
status: accepted
```

## Human Calibration

```yaml
human_calibration:
  human_reviewed: true
  aesthetic_score: 5
  aesthetic_label: 标杆范例
  difficulty_score: 4
  difficulty_label: 阶段挑战
  difficulty_detail: >
    局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
    带下方死路或等价 return pressure 的整体单关体验约 4。
  allowed_exposure_through: ice_boundary_disappear
  patch_note: >
    v3 soft patch 已修复 base 可达 d5/d6/restart 外溢；仍有 boundary-only
    噪音。人类接受该补丁作为当前保留版本，v2 strict patch 未采用。
  score_source:
    - HC_ICE_CAND_0035_001
```

## Reuse Boundary

```yaml
accepted_as:
  - "带 meta 要素的单关设计"
  - "一关两用 / old-exit-becomes-return-entry 的抽象正例"
not_reusable_as:
  - "B=C 同格接口模板"
  - "死路返回模板"
  - "compact D-wall 模板"
  - "标准两段式 meta-first 模板"
reusable_lesson:
  - "信息差不是 meta 的必要条件；地图语境和目标方向改变也能让同一结构被重读。"
  - "return pressure 是发现保障和公平性装置，不是加难装置。"
  - "高分来自同一结构在回返后改变意义，不来自同格接口表面形式。"
failure_if_copied:
  - "只有 B=C 或 D-wall，但没有周围地图回返动机。"
  - "没有 return pressure，导致 CD 组变成玩家可能永远略过的不可见结构。"
  - "同一冰组在回访时没有实质角色改变。"
```

## Process Integrity

```yaml
process_integrity:
  design_packet: present
  tool_evidence: present
  evidence_reviewer_artifact: present
  puzzle_critic_artifact: present
  designer_actions_after_review: not_needed
  post_revision_evidence_rerun: present
  latest_review_iteration: review_1
  latest_candidate_version_reviewed: ICE_EXP_META_2026_07_02_round22_v1
  open_required_action_after_latest_review: none
  designer_action_after_latest_review: not_needed
  review_after_designer_action: not_needed
  review_integrity: human_review
  review_loop_state: proposal_ready_with_caveats
  human_final_status: accepted
  post_acceptance_patch:
    patch_id: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap
    status: human_accepted
    reason: "温和修复 v1 base A 起点可达 d5/d6/restart 外溢。"
    base_no_d5d6_exposure: pass
    strict_no_late: fail_boundary_only
    retained_exposure: ice_boundary_disappear
    not_adopted_strict_patch: ICE_EXP_META_2026_07_02_round22_v2_patch
    tradeoff: "v3 保留更多分支感；v2 更干净但更线性。"
  unresolved_core_attacks: []
  archive_eligibility: clean_archive
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_layout.txt
- prototypes/ice_slide_escape/reports/patch_report_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_no_d5d6.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_strict_no_late.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_ABCD.md
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v2_patch_layout.txt
- prototypes/ice_slide_escape/reports/patch_report_ICE_EXP_META_2026_07_02_round22_v2_patch.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v2_patch_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v2_patch_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_no_late_exposure.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_base_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v2_patch_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v2_patch_ABCD.md
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt
- prototypes/ice_slide_escape/reports/candidate_packet_ICE_EXP_META_2026_07_02_round22_v1.md
- prototypes/ice_slide_escape/reports/review_loop_ICE_EXP_META_2026_07_02_round22_v1.md
- prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round22_v1.md
- prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
- prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v1_ABCD.md
```

## Retrieval Summary

```text
人类接受的审美 5 meta 单关例外正例。B/C 同格不是模板，而是让首访出口在
周围地图 return pressure 下变成回访入口：玩家原路返回刷新后，同一关被自然
重读，旧出口、target、左下冰组和可破墙 D 组合成“一关两用”。局部 base 约
2+，显式 C->D 机制约 3；带良好死路/回返 wrapper 的整体体验难度约 4。
当前采用布局为 round22_v3_soft_d5d6_cap：它修复 v1 中 A 起点 base 可达
d5/d6/restart 严重外溢，但仍有 boundary-only 可达噪音，不能声明完全干净
early cutoff。round22_v2_patch 是未采用的 strict 备选，机器更干净但更线性。
未来设计只能学习“地图语境重写同一关意义”的抽象原则，不能机械复用 B=C、
死路返回或 D-wall 形态。
```
