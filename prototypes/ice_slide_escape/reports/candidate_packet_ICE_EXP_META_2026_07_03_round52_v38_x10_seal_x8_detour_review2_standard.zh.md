# ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour 标准候选包 review_2

```yaml
candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
review_iteration_target: review_2
prototype: ice_slide_escape
status: review_candidate
review_language: zh
review_integrity_note: >
  review_1 的 evidence_review / puzzle_critic 由 controller 自由 prompt 产生，
  未显式要求使用 repo-local reviewer/critic skill 与模板；按
  skills/sokoban-design-review-loop/SKILL.md 视为 review_integrity: missing。
  本包用于重新触发合规 review_2。
```

## prototype_context

```yaml
confirmed_rules:
  - "玩家四向移动；推冰后冰自动滑行直到边界或障碍分支结算。"
  - "目标是 overlay，不阻挡玩家或冰。"
  - "胜利要求所有目标都有冰，且玩家位于本 solve instance 的显式 edge goal。"
  - "冰实例不可区分；对象级 claim 只能声明目标格是否空过，不能声明具体冰身份。"
win_condition: ice_slide_escape_explicit_goal
object_and_event_semantics:
  ice_stop_short: "滑行距离 1 或 2 后遇障碍，冰停在障碍前。"
  ice_destroyed_d3: "滑行距离 3 后遇障碍，移动冰消失，障碍保留。"
  ice_boundary_disappear: "冰撞出边界后消失。"
  ice_pass_through_d5: "滑行距离 5 后穿过连续障碍组并 restart counting。"
  ice_destroy_group_d6_plus: "滑行距离 6+ 后摧毁连续障碍组并 restart counting。"
tool_boundary:
  - "每个 player_start / player_goal pair 是独立 solve instance。"
  - "工具证据只支持 trace、事件、完整图和对象格债务事实，不直接证明审美。"
source_docs:
  - prototypes/ice_slide_escape/docs/rules.md
  - prototypes/ice_slide_escape/docs/solver_contract.md
  - prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
  - prototypes/ice_slide_escape/docs/designer_contract.md
  - prototypes/ice_slide_escape/docs/meta_interfaces.md
  - prototypes/ice_slide_escape/docs/design_directives.md
```

## slot_brief

```yaml
intended_role: "meta_first_design paired candidate"
known_before:
  base: "d6 前或更早；本候选 base 核心只需 d3 + d1/d2 short-stop。"
  meta: "默认可使用全部 ice_slide_escape 知识。"
target:
  - "base A->B 与 meta C->D 同布局双实例。"
  - "整体审美至少 4，追求但不强行声称 5。"
  - "两个流程难度都至少 2，且至少一个流程达到 3 或更高。"
difficulty_or_support_expectation:
  base_claim: "2"
  meta_claim: "3"
  aesthetic_claim: "4 candidate; critic must calibrate against human archive anchors."
```

## mechanic_exposure_context

```yaml
mechanic_window:
  base_allowed_exposure_through: ice_boundary_disappear
  meta_allowed_exposure_through: ice_destroy_group_d6_plus
event_exposure_sequence:
  - ice_stop_short
  - ice_destroyed_d3
  - ice_rebound_d4
  - ice_boundary_disappear
  - [ice_pass_through_d5, slide_restart_after_group]
  - ice_destroy_group_d6_plus
claimed_core_events:
  base:
    - ice_destroyed_d3
    - ice_stop_short:d2
  meta:
    - ice_destroy_group_d6_plus:len2
    - slide_restart_after_group
    - ice_destroyed_d3
    - ice_stop_short:d2
forbidden_if_seen_anywhere:
  base:
    - ice_pass_through_d5
    - slide_restart_after_group
    - ice_destroy_group_d6_plus
  meta: []
```

## solve_instance

```yaml
layout_file: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt
interfaces:
  A: [0, 5]
  B: [11, 10]
  C: [23, 4]
  D: [11, 10]
target_pairs:
  - A->B
  - C->D
win_condition: ice_slide_escape_explicit_goal
```

```text
########################
########################
########################
####.###################
####.#################..
.....*...*...##......*.#
#####.##..#####........#
####II#..I..###.....II##
####.......####.......##
####**.##..#############
##########..############
```

## mechanism_scope

```yaml
central:
  base:
    - "从 A 到 B：借出 [5,5] 目标冰并用 d3 消耗；随后从下层用 d2 回填目标，再到 B。"
  meta:
    - "从 C 到 D：借出 [21,5] 目标冰作为 d6+ projectile，打开中间墙组并撞毁。"
    - "回填 [21,5] 后，因 x10 下行口被封，必须借出 [9,5] 主目标冰，进入 x8/x9 绕道。"
    - "最后用 d2 回填 [9,5] 并到 D/B。"
allowed_support:
  - "B 与 D 同一物理格，只作为共享出口收束；不作为 same-cell / return-pressure bonus。"
  - "右侧 corridor 是 meta 起手和右目标债的局部空间。"
incidental_allowed:
  - "base 完整可达图中出现 ice_boundary_disappear:d5；它不是 base 核心 claim，也不属于本包 forbidden_if_seen_anywhere。"
required_winning_path_events:
  base:
    - ice_destroyed_d3
    - ice_stop_short
  meta:
    - ice_destroy_group_d6_plus
    - ice_destroyed_d3
    - ice_stop_short:d2
forbidden_winning_path_events:
  base:
    - ice_destroy_group_d6_plus
    - ice_pass_through_d5
    - slide_restart_after_group
  meta: []
forbidden_if_seen_anywhere:
  base:
    - ice_destroy_group_d6_plus
    - ice_pass_through_d5
    - slide_restart_after_group
  meta: []
```

## design_claim

```yaml
player_insight: >
  Meta 不是右侧局部钥匙：玩家必须把右侧目标债和主通道目标债串起来读。
  x10 封口与 x8/x9 绕道使 [9,5] 从 base 中的普通目标/阻挡关系，变成
  C->D 的必经主门。
causal_chain:
  base:
    - "A->B: [5,5] 目标冰被 d3 消耗。"
    - "玩家绕到下方，用 [4,7] / 下层资源 d2 回填 [5,5]。"
    - "所有目标恢复后到 B。"
  meta:
    - "C->D: [21,5] 目标冰左推，d6+ 摧毁两墙并 restart，随后 d3 撞毁于 [9,5]。"
    - "先用下方冰 d2 回填 [21,5]，偿还右目标债。"
    - "x10 下行被封，未移开 [9,5] 无法进入终点下层。"
    - "左推 [9,5] 产生主目标债，再用 [9,7] d2 回填，最后到 D。"
why_not_execution: >
  v36/v37 的右侧自足路线已被整列边界和中心错位切断；meta 不能只在右侧开门
  并补本地债后走回旧出口。对象债务探针显示 [21,5] 和 [9,5] 都必须空过。
falsification:
  - "若存在 C->D 胜利路径且 [9,5] 全程不空，则主结构重写 claim 失败。"
  - "若存在 C->D 胜利路径且 [21,5] 全程不空，则右目标债 claim 失败。"
  - "若 base 完整可达扫描命中 d5 pass/restart/d6，则 base 早知识窗口 claim 失败。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt --id ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict --player-goal 11,10 --starts 0,5 --required-winning-events ice_destroyed_d3,ice_stop_short --forbidden-winning-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --forbidden-reachable-events ice_destroy_group_d6_plus,ice_pass_through_d5,slide_restart_after_group --max-states 160000 --graph-max-states 160000 --max-depth 380 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt --id ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required --player-goal 11,10 --starts 23,4 --required-winning-events ice_destroy_group_d6_plus,ice_destroyed_d3,ice_stop_short:d2 --max-states 300000 --graph-max-states 300000 --max-depth 700 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt --id ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain --player-start 0,5 --player-goal 11,10 --max-states 160000 --graph-max-states 160000 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt --id ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain --player-start 23,4 --player-goal 11,10 --max-states 300000 --graph-max-states 300000 --write"
  - "custom BFS target-cell debt probe; see object_debt_probe file."
solver_result:
  base:
    file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict.md
    start: [0, 5]
    goal: [11, 10]
    machine_gate: pass
    cost: 24
    graph_status: complete
    reachable_states: 1853
    winning_states: 6
  meta:
    file: prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required.md
    start: [23, 4]
    goal: [11, 10]
    machine_gate: pass
    cost: 36
    graph_status: complete
    reachable_states: 184683
    winning_states: 42
trace_summary:
  base:
    explain_file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain.md
    event_counts: {push_ice: 2, ice_destroyed_d3: 1, ice_stop_short_d2: 1}
    solution_commitments: 2
  meta:
    explain_file: prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain.md
    event_counts: {push_ice: 4, ice_destroy_group_d6_plus_len2: 1, slide_restart_after_group: 1, ice_destroyed_d3: 2, ice_stop_short_d2: 2}
    solution_commitments: 4
    endgame_tail_steps: 5
target_events:
  base_required_winning_events_covered: true
  meta_required_winning_events_covered: true
object_or_instance_evidence:
  file: prototypes/ice_slide_escape/reports/object_debt_probe_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour.zh.md
  avoid_empty_target_21_5: {found_winning_path: false, explored_states: 619, status: complete_no_win}
  avoid_empty_target_9_5: {found_winning_path: false, explored_states: 3785, status: complete_no_win}
  control_avoid_empty_target_5_5: {found_winning_path: true, cost: 36}
winning_path_event_checks:
  base_missing_required: "not found; complete search"
  base_with_forbidden_winning: "not found; complete search"
  meta_missing_required: "not found; complete search"
reachable_event_exposure:
  base_forbidden_reachable_hits: none
  base_event_counts_note: "ice_boundary_disappear:d5 appears 12 times and is not forbidden by this packet."
graph_or_counterfactual_evidence:
  base_scc: "branching_win_dag, solution irreversible steps=2, forcedWinPrefix=1/2"
  meta_scc: "branching_win_dag, solution irreversible steps=4, forcedWinPrefix=0/4"
evidence_limits:
  - "No instance-level ice identity proof; target-cell debt only."
  - "No full edge-pair scan is claimed for v38 in this packet."
  - "Review_1 artifacts are not valid independent review artifacts under current skill contract."
```

## diagnostic_routing

```yaml
hard_evidence:
  route_to_evidence_reviewer: true
  allowed_evidence_sources:
    - candidate_packet_this_file
    - prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_layout.txt
    - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_strict.md
    - prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_required.md
    - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_base_explain.md
    - prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour_meta_explain.md
    - prototypes/ice_slide_escape/reports/object_debt_probe_ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour.zh.md
    - prototypes/ice_slide_escape/docs/rules.md
    - prototypes/ice_slide_escape/docs/solver_contract.md
    - prototypes/ice_slide_escape/docs/mechanic_exposure_sequence.yml
mechanism_scope:
  central_claims_to_check:
    - base early exposure excludes d5 pass/restart/d6 in complete reachable scan
    - all base wins require d3 and short stop
    - all meta wins require d6+, d3, d2 short stop
    - target-cell debts [21,5] and [9,5] are necessary under custom complete probes
claim_hygiene:
  reject_if_overclaiming:
    - exact ice instance identity
    - all-solution geometric path through x8/x9 beyond target-cell debt
    - same-cell / return-pressure aesthetic bonus
taste_probes:
  route_to_puzzle_critic: true
  focus:
    - "Does x10 seal / x8 detour make [9,5] a real shared-structure rewrite?"
    - "Is this still a right-side module plus walkback?"
    - "Does meta reach difficulty 3 while base remains at least 2?"
scc_graph:
  facts_available: true
  instruction: "Use SCC facts only with graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect."
variant_family:
  fresh_required: true
  note: "V38 evolved in current run from scratch families; archive examples are only taste anchors, not layout bases."
start_position:
  explicit_pairs_only: true
prototype_specific_work:
  workflow: meta_first_design
  enabled_by_brief: true
```

## prototype_specific_contracts

```yaml
meta_reinterpretation:
  meta_design_mode: meta_first_design
  base_instance:
    start: [0, 5]
    goal: [11, 10]
    allowed_exposure_through: ice_boundary_disappear
    claimed_core_events: [ice_destroyed_d3, ice_stop_short]
    causal_chain: "借出 [5,5] 目标冰 -> d3 消耗 -> 下层 d2 回填 -> 到 B。"
    intended_difficulty_score: 2
  meta_instance:
    start: [23, 4]
    goal: [11, 10]
    allowed_exposure_through: ice_destroy_group_d6_plus
    claimed_core_events: [ice_destroy_group_d6_plus, slide_restart_after_group, ice_destroyed_d3, ice_stop_short]
    causal_chain: "借出 [21,5] 开墙并撞毁 -> d2 回填 [21,5] -> 借出 [9,5] 打开主门 -> d2 回填 [9,5] -> 到 D。"
    intended_difficulty_score: 3
  shared_structure:
    - "[9,5] 主目标：base 中是普通目标债/通道关系，meta 中成为必须借出的主门。"
    - "下层 [8,7]/[9,7]/[9,8] 区域：base 用于回填，meta 用于主目标债偿还。"
    - "B/D [11,10] 共享底部出口：中性收束。"
  chain_delta_from_base: "Meta 增加右目标 d6+ opener，并通过中心错位强制主目标 [9,5] 参与；不是复刻 base 的单目标借还。"
  cross_visit_payoff: "base 里普通的目标/下层回填关系，在 meta 中因 x10 封口和右侧 opener 被重读为主门债。"
  base_time_masking: "右侧 d6+ 结构在 base 可达图中无法触发 forbidden d5 pass/restart/d6。"
  latent_or_lure_elements:
    - element: "右侧 [21,5] target 与 [20,7]/[21,7] 冰"
      base_reading: "视觉存在但 base 不触发后期机制"
      meta_payoff: "右目标债与 d6+ opener"
  interface_legality:
    starts_and_goals_checked:
      - "A [0,5] start standable; B/D [11,10] edge goal; C [23,4] start standable."
    d_wall_or_multi_interface_notes: "D 与 B 同格；不作为 return-pressure claim。"
  interface_pair_policy:
    declared_interface_points: [A, B, C, D]
    target_pairs: ["A->B", "C->D"]
    ignored_internal_reverse_pairs: ["C->A", "C->B", "D->A", "D->B"]
    risky_non_target_pair_scope:
      - "A/B/C/D -> edge goals outside A/B/C/D"
      - "internal non-target pairs not listed under ignored_internal_reverse_pairs"
  edge_pair_diagnostics:
    external_edge_escape_checks: []
    risky_internal_non_target_pairs: []
    ignored_internal_reverse_pairs: []
  classification: meaningful_reinterpretation
```

## archive_lineage_policy

```yaml
default: fresh_required
authorized_archive_variant_work:
  enabled: false
  authorized_by: null
  candidate_ids: []
  allowed_operations: []
candidate_relation: fresh
why_not_archive_variant: >
  Archive candidates were read only for human taste calibration. V38 does not
  use their layouts, interface coordinates, object placement, or solution routes
  as a base.
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0034
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0034.md
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    human_excerpt: "亮点在于meta回访时左推（8，5）的冰扰乱下方结构，带来新解法而非完全复刻base流程的简单d1+d4。"
    relevance: "4 分下界：meta 必须扰乱/改写共享结构，而非附加钥匙。"
  - candidate_id: ICE_CAND_0035
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0035.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    human_excerpt: "B/C 同格意味着玩家从 B 离开后，如果周围地图让他不得不原路返回，刷新后的同一关会被自然重读。"
    relevance: "高分边界：同格/旧出口高分依赖 return-pressure wrapper；v38 不声称该 bonus。"
  - candidate_id: ICE_CAND_0033
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0033.md
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 2
    human_excerpt: "meta 流程没有比base新增知识的前提下，这一关做出了非常有趣的小误导、小反转。"
    relevance: "低难高审美正例：meta 价值可来自重读和心路，而不必只是更晚机制。"
  - candidate_id: ICE_CAND_0037
    file: prototypes/ice_slide_escape/design_archive/candidates/ICE_CAND_0037.md
    human_reviewed: true
    aesthetic_score: 1
    difficulty_score: 2
    human_excerpt: "典型反例，将三个无洞见的重复步骤拼接声称为关卡和meta流程，无任何价值，并且有A->D外溢的致命问题。"
    relevance: "负例：不要把重复 target-door / 接口便利 / 事件覆盖误判为洞见。"
none_found_reason: null
```

## attempt_log

```yaml
serious_structural_attempts:
  - v34: "右侧目标债 + d6 opener；critic 认为仍偏 C 侧外接模块，meta 难度约 2+。"
  - v36: "double-borrow 方向；base strict pass，但 meta 存在右侧自足替代炮线。"
  - v37: "右侧整列边框切断目标右推出界捷径；meta pass，但仍只有一次主碰撞，主目标不是必要债。"
  - v38: "x10 封口 + x8/x9 绕道，强制 [9,5] 主目标债。"
local_repairs:
  - "非预期路线定位为 [21,6] -> row6 -> [9,6] 横向炮线；通过整列边框和中心错位处理。"
abandoned_families:
  - "d4 双向锁 + d3 双向门拼接类；用户明确要求避免。"
  - "v8 左侧 firing face family；base strict exposure 结构矛盾。"
```

## claim_last_review

```yaml
mode: not_used
facts_packet: null
claim_packet: null
read_order: not_applicable
```

## review_request

```yaml
evidence_reviewer:
  must_use: "$sokoban-evidence-reviewer or repo-local skills/sokoban-evidence-reviewer/SKILL.md + references/evidence-reviewer-template.md"
  output_template: skills/sokoban-evidence-reviewer/references/evidence-reviewer-template.md
  review_iteration: review_2
  candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
  allowed_evidence_sources: "See diagnostic_routing.hard_evidence.allowed_evidence_sources."
puzzle_critic:
  must_use: "$sokoban-puzzle-critic or repo-local skills/sokoban-puzzle-critic/SKILL.md + references/puzzle-critic-template.md"
  output_template: skills/sokoban-puzzle-critic/references/puzzle-critic-template.md
  review_iteration: review_2
  candidate_version: ICE_EXP_META_2026_07_03_round52_v38_x10_seal_x8_detour
  archive_taste_context_required: true
  claim_last_review: false
```
