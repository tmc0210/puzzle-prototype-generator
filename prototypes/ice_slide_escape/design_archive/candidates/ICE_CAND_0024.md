# Candidate: ICE_CAND_0024

```yaml
candidate_id: ICE_CAND_0024
prototype: ice_slide_escape
experiment_id: ICE_EXP_META_2026_07_01_round5_d6_cross_debt_proposal_ready_with_caveats
status: accepted
llm_candidate_strength: proposal_ready_with_caveats
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 5
aesthetic_label: 标杆范例
difficulty_score: 3
difficulty_label: 常规流程
allowed_exposure_through: ice_destroy_group_d6_plus
motifs:
  - short_stop_d1_d2
  - d4_rebound
  - d6_plus_destroy_group
  - restart_counting
  - target_debt_refill
  - target_ice_coverage
  - explicit_edge_goal
  - meta_reinterpretation
  - shared_space_reuse
  - reachability_lure
archive_use:
  - positive_meta_reference
  - critic_calibration
  - designer_calibration
human_comment_ids:
  - HC_ICE_CAND_0024_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round5_d6_cross_debt_proposal_ready_with_caveats.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/ICE_CAND_0024_v5_notch_and_side_pocket_layout.txt
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_base_A_to_B.md
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_meta_C_to_D.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_base_goal_B_required.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_meta_goal_D_required.md
  - prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0024_v5_ABCD.md
  - prototypes/ice_slide_escape/reports/reachability_lure_probe_ICE_CAND_0024_v5_base_A.md
```

## Layout

Solve instances:

```yaml
interfaces:
  A: [1, 8]
  B: [2, 8]
  C: [16, 8]
  D: [17, 8]
base_instance:
  player_start: [1, 8]
  player_goal: [2, 8]
meta_instance:
  player_start: [16, 8]
  player_goal: [17, 8]
win_condition: ice_slide_escape_explicit_goal
```

```text
##################
##################
#######...########
####.IG.#......*.#
####.#G.#######..#
####.#.....####I.#
####.II*#.#####..#
##........######.#
#..#############..
```

## Core Logic

```text
Base A->B is a 4-push target-debt application: [7,6] d4 rebounds to [7,3],
then [5,3], [6,6], and [5,6] fill [6,3], [6,4], and [7,6].
Meta C->D uses a different chain: [15,3] d6+ destroys [8,3], restarts, fills
[6,3], opens the shared middle space, then [6,6] and [15,5] finish [6,4] and
[15,3]. The final v5 edit masks the base-time d6 read and creates a lure:
right-side C/D are physically reachable from base, but not with targets complete.
```

## Meta-First 校准 Packet

这是给 `meta_first_design` 审稿接口使用的校准 packet，不改写本候选的历史生成模式。

```yaml
meta_design_mode: meta_first_design
base_instance:
  start: [1, 8]
  goal: [2, 8]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_rebound_d4
  causal_chain: >
    [7,6] d4 rebounds to [7,3], then [5,3], [6,6], and [5,6] fill [6,3],
    [6,4], and [7,6] as a target-debt application.
  intended_difficulty_score: 4
meta_instance:
  start: [16, 8]
  goal: [17, 8]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
  causal_chain: >
    [15,3] d6+ destroys [8,3], the reset/revisit state allows [6,3] to be
    filled, then [6,6] and [15,5] finish [6,4] and [15,3].
  intended_difficulty_score: 4
shared_structure:
  - 中间区域和 target-debt 填充物在两条流程中都承担核心作用。
  - [6,3] 和 [6,4] 在 base/meta 中改变角色，而不是装饰性复用。
chain_delta_from_base: >
  Base 把左侧/中间结构用作 d4 rebound target-debt 链；meta 把同一中间区域
  重读成 d6+/restart 的状态消费链。
cross_visit_payoff: >
  右侧 C/D 区域在 base 时间可见且在非胜利状态物理可达；回访时，同一中间结构
  被另一条因果链复用，这个诱惑结构才兑现为有效接口。
base_time_masking: >
  v5 的 notch / side-pocket 修改在 base 流程中遮蔽右侧 d6+ / meta 读法；base
  阶段的价值是让右侧结构作为未兑现的视觉诱惑存在。若把此布局放入更早的
  cutoff，必须重新用 forbidden-if-seen-anywhere 事件扫描判定是否越界。
latent_or_lure_elements:
  - element: 右侧 C/D 入口
    base_reading: 物理可达但 target 状态不兼容的诱惑
    meta_payoff: 回访时成为 C->D 的合法接口
interface_legality:
  starts_and_goals_checked:
    - A->B
    - C->D
  d_wall_or_multi_interface_notes: >
    显式边缘 goal 合法；hard edge gate 和非目标 pair 由引用的 edge-pair /
    reachability probe 覆盖。
non_target_pairs:
  - pair: A->D / C->B family
    result: 已由 edge_pair_scan 覆盖
    risk: 只有后续修改削弱 target-state mismatch 时才会重新成为阅读风险
design_target:
  aesthetic_score: 5
  difficulty_score: 4
review_axes:
  base_quality: >
    合格的阶段挑战应用关；不是 0024 的主要审美来源，但自身逻辑合理。
  meta_quality: >
    右侧流程偏弱但成立；价值来自它如何消费和重读 base 中已出现的状态。
  cross_visit_reuse: >
    标杆部分：强空间复用、强要素复用、合理遮蔽和 base-time lure 共同成立。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0024_001
    author: human_designer
    status: accepted
    text: >
      极佳的强复用meta案例和修改升档案例。两边流程虽不出彩但都逻辑合理。
      亮点在于1. base流程和meta流程空间复用和要素复用极强，共用中间的
      解谜区域和大量冰，回访时不会认为是两个独立子关拼接硬凑，而是一关两用
      2. base流程时对于meta流程的d6有较好的遮蔽。修改版本前右侧d6作用是
      打穿左右连接通路，这更容易导致玩家在左侧base流程时提前猜到知识
      3. 修改版本右侧结构在base流程时物理可达，但这些路线和base的target
      满足状态不兼容。这一看似可解的诱惑作为伏笔具有极强的未来回访时的
      审美价值。 总的来说，两边独立流程都是合格应用关（右侧流程偏弱但
      无伤大雅），meta部分很强，更有修改后做出的诱惑解法画龙点睛。一个问题是AB相邻、CD相邻（同流程出入口同侧是需要尝试微调解决的瑕疵，但是同侧相邻或同侧过近会对之后相邻关卡的出入口有严苛要求，应当更主动地微调），这个问题很好微调但是这版还没修改，以此关为审美参照时务必注意此类问题。
status: accepted
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_META_2026_07_01_round5_d6_cross_debt_proposal_ready_with_caveats.md
- prototypes/ice_slide_escape/reports/ICE_CAND_0024_v5_notch_and_side_pocket_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_base_A_to_B.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0024_v5_meta_C_to_D.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_base_goal_B_required.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0024_v5_meta_goal_D_required.md
- prototypes/ice_slide_escape/reports/edge_pair_scan_ICE_CAND_0024_v5_ABCD.md
- prototypes/ice_slide_escape/reports/reachability_lure_probe_ICE_CAND_0024_v5_base_A.md
```

## Retrieval Summary

```text
Human-accepted strong meta case and modification-upgrade example. Final v5
shares the middle puzzle space across base/meta instead of reading as two
attached sublevels. Base is a 4-push d4 target-debt application; meta is a
compact d6+/restart reinterpretation. The v5 notch / side-pocket edit masks
the d6 read and adds a lure: C/D are physically reachable from base only in
non-winning states. Hard edge gate passes. Human caveat: AB/CD adjacent or
same-side interfaces should be actively refined in future uses of this pattern.
```
