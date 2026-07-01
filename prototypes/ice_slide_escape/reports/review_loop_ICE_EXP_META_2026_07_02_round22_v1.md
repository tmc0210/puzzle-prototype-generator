# 设计复审控制器更新: ICE_EXP_META_2026_07_02_round22_v1

```yaml
prototype: ice_slide_escape
candidate_id: ICE_EXP_META_2026_07_02_round22_v1
review_loop_state: proposal_ready_with_caveats
review_integrity: human_review
human_final_status: accepted
archive_eligibility: clean_archive
pre_review_state:
  review_loop_state: held_proposal
  review_integrity: self_review_only
designer_action_1: submit_for_independent_review
archive_lineage_policy: fresh_required
```

## 独立 review 结果

```yaml
latest_review_iteration: review_1
latest_candidate_version_reviewed: ICE_EXP_META_2026_07_02_round22_v1
review_integrity_after_review: independent_review
evidence_review:
  ref: prototypes/ice_slide_escape/reports/evidence_review_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
critic_review:
  ref: prototypes/ice_slide_escape/reports/puzzle_critic_ICE_EXP_META_2026_07_02_round22_v1_review_1.md
  verdict: supports_with_noncore_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
loop_result: proposal_ready_with_caveats
archive_eligibility_after_review: human_pending
open_required_action_after_latest_review: none
```

## 人类 review 结果

```yaml
human_review:
  ref: prototypes/ice_slide_escape/reports/human_review_ICE_EXP_META_2026_07_02_round22_v1.md
  human_comment_id: HC_ICE_CAND_0035_001
  status: accepted
  aesthetic_score: 5
  aesthetic_label: 标杆范例
  difficulty_score: 4
  difficulty_label: 阶段挑战
  difficulty_detail: >
    局部 base A->B 约 2+；显式知道 C->D 目标时 meta 机制约 3；
    带下方死路或等价 return pressure 的整体单关体验约 4。
  archive_record: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
  experiment_ledger: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_02_round22_same_cell_return_accepted.md
human_archive_boundary:
  accepted_as:
    - "带 meta 要素的单关设计"
    - "一关两用 / old-exit-becomes-return-entry 的抽象正例"
  not_reusable_as:
    - "B=C 同格接口模板"
    - "死路返回模板"
    - "compact D-wall 模板"
  key_lesson:
    - "return pressure 是发现保障和公平性装置，不是加难装置。"
    - "高分来自地图语境重写同一关意义，不来自同格接口表面形式。"
```

## 控制器判断

```yaml
base_flow:
  start: [1, 5]
  goal: [7, 5]
  known_before: all_known
  reason: >
    base 完整可达图命中 boundary / d5 / d6 等晚期事件，所以不能声明 early d4 clean。
    但 A->B 返回解为 12 cost / 4 push，且所有胜利路径都需要 d3+d4。
  observed:
    cost: 12
    pushes: 4
    graph: "complete, states=1753, wins=3"
    required_gate: "ice_destroyed_d3 + ice_rebound_d4 pass"
  working_difficulty: "2+ / possible 3-"
meta_flow:
  start: [7, 5]
  goal: [10, 4]
  known_before: all_known
  observed:
    cost: 22
    pushes: 4
    graph: "complete, states=3890, wins=1"
    required_gate: "d4 + short-stop + boundary + d6 pass"
    scc: "one_win_continuation_per_scc, forcedWinPrefix=3/3"
  critic_difficulty_fit: "meta 稳过 3；base 稳过 2，接近 3 不稳"
interface:
  B_equals_C: true
  D_initially_wall_goal: true
  D_as_start: invalid_initial_wall
  A_to_D: unsolved
  C_to_A: solved_ignored_reverse
  C_to_B: solved_same_cell_return
  external_edge_escape: none_found_full_scan
working_aesthetic_read:
  critic_target_fit: "支持 4 下界，但不支持 5"
  rationale: >
    round22_v1 is stronger than round21_v1: both base and meta are 4-push flows,
    meta requires d4/short/boundary/d6 across all winning paths, and the full
    edge scan is clean. The B=C re-entry makes the old exit become the revisit
    entrance, while D-wall changes the objective and forces the left-bottom ice
    group into a different role.
  main_risks:
    - "B=C same-cell interface may feel too compact or connector-like."
    - "base is all-known rather than early-window clean."
    - "meta has a scripted SCC profile and a post-open walking tail."
```

## review_1 摘要

```yaml
evidence_reviewer_summary:
  supported:
    - "base all-winning required d3+d4 被完整搜索支持。"
    - "base no-late-exposure / early cutoff 被完整扫描否定，packet 已正确收窄为 all-known。"
    - "meta all-winning d4+short+boundary+d6 被完整搜索支持。"
    - "D-wall goal、A->D 不可解、D invalid start、无接口外 edge escape 均有证据支持。"
  caveats:
    - "base short-stop 只能作为返回解实例，不可写成 all-solution required。"
    - "meta no-chain 由返回解支持，但未被单独验证为 all-winning required。"
critic_summary:
  supported:
    - "B=C same-cell re-entry 是可接受的优雅压缩，而不是贫弱 connector。"
    - "base 稳过 2；meta 稳过 3；满足用户难度约束。"
    - "整体审美支持 4 下界。"
  caveats:
    - "不支持 5；与 0024 的强复用厚度有差距。"
    - "0034 compact D-wall vocabulary overlap 限制原创性上限。"
    - "meta 开 D 后有尾部走路，只是非核心审美小损耗。"
human_update:
  accepted_adjustment:
    - "人类认可此关为意外优秀的带 meta 要素单关设计，而非标准两段式模板。"
    - "审美从 critic 支持的 4 下界提升为人类 5 分标杆。"
    - "难度按整合地图语境记录为 4；局部 C->D 机制约 3。"
  retained_warning:
    - "不得机械学习 B=C、D-wall 或死路返回形态。"
    - "缺少 return pressure 时不是高难，而是不可见 / 难以发现。"
```

## post-acceptance patch: round22_v3

```yaml
patch_id: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap
patch_target: ICE_EXP_META_2026_07_02_round22_v1
reason: >
  人类接受后发现 v1 的 A=[1,5] base 可达图可以触发 d5/d6，
  容易被后续设计误读为 early/base 知识外溢可接受。v3 保持 A/B/C/D
  坐标与 B=C 单关回读结构，用较温和的两墙补丁封住 d5/d6/restart 外溢；
  strict no-late 仍保留 boundary-only 噪音。
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_layout.txt
patch_report: prototypes/ice_slide_escape/reports/patch_report_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap.md
base_no_d5d6_exposure:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_no_d5d6.md
  status: pass
  forbidden_reachable_hits: []
base_strict_no_late:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_strict_no_late.md
  status: fail_boundary_only
  forbidden_reachable_hits:
    - ice_boundary_disappear:d2
base_required_full:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_base_required_full.md
  status: pass
  all_winning_required:
    - ice_destroyed_d3
    - ice_rebound_d4
    - ice_stop_short
meta_required_full:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_meta_required_full.md
  status: pass
  all_winning_required:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
full_edge_scan:
  ref: prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap_ABCD.md
  status: pass
  interface_to_non_interface_solved: []
behavior_change_note: >
  v3 meta 局部顺序从 v1 的先 d4 填 target 再开 D，变为先 short/boundary/d6
  开 D，再 d4 填 target。B=C 单关回读抽象与 return pressure wrapper 价值保留；
  strict v2 补丁机器更干净但更线性，未采用。
```

## 相对 round21 的变化

```yaml
round21_v1_status: abandoned_lower_bound
why_not_submit_round21:
  - "meta 只有 2 push，难度/审美不稳。"
  - "更像 compact functional connector，难以支撑用户要求的 >=3 难度流程。"
round22_v1_upgrade:
  - "base 从 2 push 升到 4 push，并有 all-winning d3+d4 gate。"
  - "meta 从 2 push 升到 4 push，并有 all-winning d4+short+boundary+d6 gate。"
  - "全边界 goal 扫描 clean，D-wall 合法性明确。"
```

## 最终控制器状态

```yaml
review_loop_state: proposal_ready_with_caveats
review_integrity: human_review
human_final_status: accepted
archive_eligibility: clean_archive
designer_action_after_review: not_needed
required_action: none
candidate_submission_status: qualified_candidate_submitted
archive_status:
  candidate_id: ICE_CAND_0035
  status: accepted
  current_layout_version: ICE_EXP_META_2026_07_02_round22_v3_soft_d5d6_cap
  original_layout_version: ICE_EXP_META_2026_07_02_round22_v1
  base_no_d5d6_exposure_current: pass
  base_strict_no_late_current: fail_boundary_only
  archive_use:
    - positive_reference
    - human_taste_reference
    - positive_exception
    - abstract_meta_reference
    - do_not_template_geometry
do_not_claim:
  - mainline
  - reusable_geometry_template
human_review_priority: completed
```

本轮先满足“提交合格候选”的 review-loop 门槛：evidence reviewer 与 critic 均允许
`proposal_ready_with_caveats`，且 `required_action: none`。随后人类设计师给出
`accepted` 与审美 5 / 难度 4 的归档评语，因此进入 `clean_archive`。该 positive
reference 只作为抽象 meta 正例使用，不能作为 B=C / D-wall / 死路返回几何模板。
