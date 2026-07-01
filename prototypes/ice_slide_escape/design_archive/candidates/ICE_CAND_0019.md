# Candidate: ICE_CAND_0019

```yaml
candidate_id: ICE_CAND_0019
prototype: ice_slide_escape
experiment_id: ICE_EXP_003_2026_06_30_round12_f_timing_proposal_ready
status: accepted
llm_candidate_strength: proposal_candidate_no_major_caveat
human_final_status: accepted
archive_eligibility: clean_archive
review_integrity: human_review
human_reviewed: true
aesthetic_score: 4
aesthetic_label: 亮点候选
difficulty_score: 4
difficulty_label: 阶段挑战
allowed_exposure_through: ice_destroy_group_d6_plus
final_version: ICE_CAND_0019_v4_remove_left_hint_target
predecessor_version: ICE_CAND_0019_v3_f_as_final_target_after_a
motifs:
  - short_stop_d1_d2
  - d5_pass_through
  - d6_destroy_group
  - restart_counting
  - target_ice_coverage
  - explicit_edge_goal
  - walled_edge_goal
  - all_mechanic_endgame
archive_use:
  - positive_reference
  - critic_calibration
  - designer_calibration
  - human_taste_reference
strengths:
  - coupled_state_change
  - compact_causal_chain
failure_modes:
  - claim_underfit
human_comment_ids:
  - HC_ICE_CAND_0019_001
ledger_ref: prototypes/ice_slide_escape/design_archive/experiments/ICE_EXP_003_2026_06_30_round12_f_timing_proposal_ready.md
evidence_refs:
  - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.md
  - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.md
  - prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v4_remove_left_hint_target.md
  - prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
```

## Layout

Solve instance:

```yaml
player_start: [0, 9]
player_goal: [15, 3]
win_condition: ice_slide_escape_explicit_goal
```

```text
################
#....GGI.....I.#
#.#.#..I######.#
#..#...*.......#
#..#....########
#..#....########
#..#...I########
#..#....########
#...I..#########
........########
################
```

## Core Logic

```text
B 从 [4,8] 上推，经 d5/restart 落到 [4,1]；v4 中这里不再是 target，
而是延迟显现为 A 的隐藏 stopper。
E 从 [7,6] 上推到 [7,4]，不是补 target，而是预置成 C 的最终 stopper。
D 从 [7,3] 右推 d6+ 牺牲，清空 [7,3] target 并打开 [15,3] edge goal。
A 从 [13,1] 左推，必须使用保留在 [7,1] 的 F 作 d5 obstacle，借 B 停到 [5,1]。
F 随后从 [7,1] 左推到 [6,1]，补第二个 top target，同时清出 C 上方站位。
C 最后从 [7,2] 下推，借 E at [7,4] 停在 [7,3]，补回 D 清空的 target。
```

## Review Loop

```yaml
review_1:
  target: ICE_CAND_0019_v2_false_top_door_lower_route
  loop_result: revise_required
  summary: >
    v2 已经具备候选潜力，但仍有重大 caveat：完整图有 7 个胜局，且对象层证据
    不足。发现的问题是 A 可以被牺牲，随后 F 仍可填 [5,1]，从而削弱“必须保留
    F 给 A 使用”的中心主张。
designer_action_1:
  action: add_target_at_6_1
review_2:
  target: ICE_CAND_0019_v3_f_as_final_target_after_a
  evidence_reviewer:
    verdict: caveated_pass
    review_loop_state: proposal_ready
    required_action: none
    summary: >
      证据支持该 trace：完整图 50528 个状态且只有 1 个胜局，required probe
      完整，边缘起点只有 [0,9]，对象事实探针证明六个核心坐标事实在所有胜路中
      必要。剩余 caveat 只是证据措辞：证明的是坐标事实，不是持久冰块身份。
  design_critic:
    verdict: proposal_candidate_no_major_caveat
    review_loop_state: proposal_ready
    required_action: none
    summary: >
      v3 关闭了 v2 caveat。F 现在有真实的时序洞见：过早移动 F 会破坏 A，
      永远不动 F 又会挡住 C；正确路线必须先保留 F 给 A，再把 F 移到 [6,1]。
      E 的延迟 stopper 角色也保留了足够的非局部性。
  loop_result: proposal_ready
designer_action_2:
  target: ICE_CAND_0019_v4_remove_left_hint_target
  action: remove_target_at_4_1
  intent: >
    移除 B 第一推的即时 target 奖励，使 [4,1] 从显然的局部填点变成 A 后续
    定位所需的延迟隐藏 stopper。
critic_calibration_after_v4:
  review_integrity: independent_review
  verdict: design_improvement
  summary: >
    critic 将该改动识别为真实的洞见难度提升：B 不再看起来是即时 target 进展，
    而是在后续解释 A 为什么能停到 [5,1]。critic 同时判断 F/A/E/C 时序骨架
    没有被破坏。
human_review:
  status: accepted
  summary: >
    在移除 [4,1] target 后，接受为后期较高难度正例。caveat：它仍主要是
    每一步质量都尚可的复合锁结构，而不是真正的流程末期 aha-moment。
```

## Evidence

```yaml
final_version: ICE_CAND_0019_v4_remove_left_hint_target
layout_analysis:
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.md
  result: pass
  graph_status: complete
  reachable_states: 50528
  legal_transitions: 140744
  winning_states: 1
  shortest_cost: 43
  push_count: 6
required_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.md
  result: pass
  missing_required_win: not_found_complete_search
  explored_augmented_states: 59934
all_edge_probe:
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.md
  result: pass
  checked_edge_starts:
    - [0, 9]
object_fact_probe:
  ref: prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v4_remove_left_hint_target.md
  result: pass
  augmented_search_status: complete
  augmented_states_explored: 69306
  missing_core_fact_win: not_found_complete_search
target_removal_probe:
  ref: prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
  result: >
    移除 [4,1] 安全且推荐；移除 [5,1]、[6,1] 或 [7,3] 会削弱核心主张或
    直接破坏关卡结构。
```

## Human Verdict

```yaml
human_comments:
  - id: HC_ICE_CAND_0019_001
    author: human_designer
    status: accepted_positive_with_caveats
    text: >
      此关作为正例的优化是我直接提出的从原 v3 移除了 [4,1] 的左上 target。
      原版中，第一推 B 到 [4,1] 被 target 是过于自然的直接达成目标，玩家可以
      不理解其后续价值也顺手执行，因此无有效洞见；v4 中这一步不再有即时目标回报，
      只在后续 A 左推停到 [5,1] 时才显现为必要条件。因此该修改把一个显然的开锁
      步骤转化为延迟生效的隐藏结构，显著增强了第一步的非局部性和回读价值，同时
      没有破坏原关卡扎实的复杂互锁结构和逻辑链，在v4优化后完全可以作为一个后期
      较高难度关卡备选。但需注意此关仍然偏复合锁结构，因几乎每个关键步骤质量都
      尚可所以被接纳，实际并未有游戏流程末期仍然有效的真正精彩的洞见、有趣的局部
      结构或aha-moment（把一个已经在目标的冰推走在游戏前中期大概是新颖有趣的，
      但是后期这应该只是轻度亮点了）
status: accepted
```

## Evidence Refs

```text
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0019_v4_remove_left_hint_target.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_precise_required_probe.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0019_v4_all_edge_starts.json
- prototypes/ice_slide_escape/reports/object_fact_probe_ICE_CAND_0019_v4_remove_left_hint_target.md
- prototypes/ice_slide_escape/reports/target_removal_probe_ICE_CAND_0019.md
```

## Retrieval Summary

```text
人类接受的带 caveat 正例。最终 v4 从 proposal-ready 的 v3 中移除 [4,1]
target，把 B 的第一推从显然的 target 填点变成 A 后续停到 [5,1] 所需的
延迟隐藏 stopper。机器证据保持强：43 inputs、6 pushes、完整图 50528 states、
1 个胜局、required-event probe 完整、边缘起点只有 [0,9]，并且 object-fact
probe 证明核心坐标事实必要。核心链：B 隐藏 stopper，E 作为 C 的延迟 stopper，
D 打开 edge goal 并清空 [7,3]，A 使用保留的 F 和 B，F 再填 [6,1]，C 最终
回填 [7,3]。人类 caveat：此关因几乎每个关键步骤都扎实而被接受，但它仍主要
是复合锁，不是真正的流程末期 aha-moment。
```