# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round23_v1

本文件是送 evidence reviewer / puzzle critic 的候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round23_v1
prototype: ice_slide_escape
review_loop_state_before_review: revise_required
review_integrity_before_review: self_review_only
archive_eligibility_before_review: human_pending
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
```

## prototype_context

```yaml
confirmed_rules:
  - 玩家四向移动，推冰后冰自动滑行并按距离分支结算。
  - 胜利要求所有 target 被冰占据，且玩家到达显式指定的 edge goal。
  - 每个 player_start / player_goal pair 是独立 solve instance，不能合并成 any-edge。
  - player_goal 可以初始为墙；若冰破墙后玩家可达，该 goal 合法。
win_condition: ice_slide_escape_explicit_goal
object_and_event_semantics:
  target: overlay，不阻挡移动或滑冰
  ice_rebound_d4: 冰滑行 4 格撞障碍后回弹一格
  ice_stop_short: 冰滑行 1/2 格后停在障碍前
  ice_destroy_group_d6_plus: 冰滑行 6+ 格后摧毁连续障碍组
tool_boundary:
  - solver/analyzer 提供事实，不给审美 verdict。
  - 当前证据是单关多 start/goal instance，不证明未来大地图 runtime。
prototype_specific_workflows:
  meta_first_design: enabled_by_human_brief
  interface_pair_policy: enabled
```

## slot_brief

```yaml
intended_role: meta_first_design candidate
known_before:
  base: "arbitrary; inferred latest reachable knowledge is d6+"
  meta: all_known
target:
  base_instance: A->B
  meta_instance: C->D
difficulty_or_support_expectation:
  base: ">=3 working target"
  meta: ">=2 / possible 2+"
  overall: "至少一条流程 >=3，二者都不低于 2"
  aesthetic: "4 lower-bound target; 5 not claimed"
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt
layout: |
  ##################
  #..............IG.
  #.............#.I#
  #................#
  #...........#....#
  #...............##
  #.............#I.#
  #.............#...
  ##################
interfaces:
  A: [17, 7]
  B: [0, 3]
  C: [17, 1]
  D: [0, 1]
base_instance:
  player_start: [17, 7]
  player_goal: [0, 3]
  win_condition: ice_slide_escape_explicit_goal
meta_instance:
  player_start: [17, 1]
  player_goal: [0, 1]
  win_condition: ice_slide_escape_explicit_goal
```

## mechanism_scope

```yaml
central:
  base:
    - "从底右进入，先把下方冰向上推成右侧竖向资源，触发 no-chain + d4 rebound。"
    - "再用右上竖冰 d1 short-stop 覆盖唯一 target。"
    - "最后把先前准备好的右侧冰向左 d6+，摧毁左侧墙并打开 B。"
  meta:
    - "从右上直接进入，先把横向冰 d6+ 打开 D 所在左上墙。"
    - "再从右侧回推竖冰，用 d1 short-stop 覆盖同一 target。"
allowed_support:
  - walk reposition
  - no-chain blocker semantics
  - post-win walk to explicit edge goal
required_winning_path_events:
  base:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
    - ice_stop_short
  meta:
    - ice_destroy_group_d6_plus
    - ice_stop_short
forbidden_winning_path_events:
  base: []
  meta: []
forbidden_if_seen_anywhere:
  base: []
  meta: []
```

## design_claim

```yaml
player_insight:
  base: >
    A->B 是全知识 base。玩家从底右进入时，不能只处理右上 target；必须先把
    下方冰上推成可用资源，再回到右上填 target，最后用同一准备过的右侧冰
    d6+ 打开左侧墙 B。base 可达最高阶段是 d6+，且 d6+/d4/short 都被所有
    A->B 胜利路径使用。
  meta: >
    C->D 从右上进入，同一 target / 左侧墙机构被反序读取：先用右上横向冰
    d6+ 打开左上 D，再回到右侧用竖冰 short-stop 填 target。它是较薄的
    meta 读法，但目标方向改变后，base 中“最后开左中墙”的 d6 义务被提前
    读成“先开左上出口”的义务。
causal_chain:
  base:
    - "Step 3: 上推底部冰，ice_blocks_ice_no_chain_push + ice_rebound_d4，把它准备到右侧中层。"
    - "Step 8: 上推右侧竖冰，ice_stop_short:d1，覆盖 [16,1] target。"
    - "Step 10: 左推准备好的右侧中层冰，ice_destroy_group_d6_plus:len1，打开 B=[0,3]。"
  meta:
    - "Step 2: 左推右上横向冰，ice_destroy_group_d6_plus:len1，打开 D=[0,1]。"
    - "Step 6: 上推右侧竖冰，ice_stop_short:d1，覆盖同一 target。"
chain_delta_from_base: >
  Base 从底右进入，必须先制造中层 d6 资源，再填 target，最后开 B；meta 从右上
  进入，直接先开 D，再填同一 target。共享结构是右侧竖向冰、唯一 target、
  左侧初始墙 goal 和 d6 wall-opening obligation；差异是 d6 与 target-fill 的
  先后关系和所开的左侧出口高度。
cross_visit_payoff: >
  回访不是换一条路走到同一个出口，而是把同一右侧机构从“准备中层冰 -> 填 target
  -> 开左中墙”改读成“先开左上墙 -> 再填 target”。payoff 偏紧凑，目标是审美 4
  的低界候选，不主张 5。
base_time_masking: >
  本候选不依赖知识遮蔽；base 允许 d6+。本轮硬要求由 base_required_latest 探针
  覆盖：可达 d6+ 且 d6+ 在所有 A->B 胜利路径中必经。
why_not_execution: >
  Base 不是单次 witness：完整图 5108 states，A->B 所有胜利路径都要求 d6+d4+short，
  且 opening 只有一个 viable progress。Meta 较薄，只有 2 push，但完整图要求
  d6+short，且 C->A 被接口政策归为 ignored reverse，不作为目标替代。
falsification:
  - "若 A->B 存在不触发 d6+ / d4 / short 的胜利路径，则 base 硬目标失败。"
  - "若 C->D 存在不触发 d6+ / short 的胜利路径，则 meta core claim 失败。"
  - "若 A/C 可解到 A/B/C/D 外的边缘 goal，则 interface policy 失败。"
  - "若 critic 认为 meta 只是 base 的薄化捷径、没有重读价值，则应 downgrade_or_hold。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt --id ICE_EXP_META_2026_07_02_round23_v1_base --player-start 17,7 --player-goal 0,3 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt --id ICE_EXP_META_2026_07_02_round23_v1_meta --player-start 17,1 --player-goal 0,1 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt --id ICE_EXP_META_2026_07_02_round23_v1_base_required_latest --player-goal 0,3 --starts 17,7 --required-winning-events ice_destroy_group_d6_plus,ice_rebound_d4,ice_stop_short --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt --id ICE_EXP_META_2026_07_02_round23_v1_meta_required_core --player-goal 0,1 --starts 17,1 --required-winning-events ice_destroy_group_d6_plus,ice_stop_short --max-states 80000 --graph-max-states 80000 --write"
  - "controller full edge-goal scan over 50 edge cells, summarized in edge_goal_full_scan_ICE_EXP_META_2026_07_02_round23_v1_ABCD.md"
solver_result:
  base:
    found: true
    cost: 25
    pushes: 3
    returned_events:
      - ice_blocks_ice_no_chain_push
      - ice_rebound_d4
      - ice_stop_short:d1
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
    graph: "complete, reachable states=5108, legal transitions=17449, winning states=2"
  meta:
    found: true
    cost: 23
    pushes: 2
    returned_events:
      - ice_destroy_group_d6_plus:len1
      - ice_boundary_disappear_after_group
      - ice_stop_short:d1
    graph: "complete, reachable states=1268, legal transitions=4344, winning states=2"
winning_path_event_checks:
  base_required_latest:
    required: [ice_destroy_group_d6_plus, ice_rebound_d4, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
  meta_required_core:
    required: [ice_destroy_group_d6_plus, ice_stop_short]
    result: pass
    missing_required_path: not_found_complete_search
reachable_event_exposure:
  base:
    status: complete
    latest_reachable_knowledge: ice_destroy_group_d6_plus
    latest_required_all_winning: true
    event_counts_include:
      - ice_destroy_group_d6_plus:len1
      - ice_pass_through_d5:len1
      - ice_boundary_disappear:d1
      - ice_boundary_disappear:d2
      - ice_rebound_d4
      - ice_stop_short:d1
  meta:
    status: complete
    latest_reachable_knowledge: ice_destroy_group_d6_plus
pair_policy:
  full_edge_scan:
    edge_goals_checked: 50
    legal_start_goal_instances_checked: 100
    all_pair_solves_complete_under_budget: true
    external_edge_escape: none
  target_pairs:
    A_to_B: solved
    C_to_D: solved
  ignored_or_disclosed:
    C_to_A: solved_ignored_reverse
    A_to_A: selected_interface_return
  blocked_or_invalid:
    B_as_start: invalid_initial_wall
    D_as_start: invalid_initial_wall
graph_or_counterfactual_evidence:
  base_scc: "branching_win_dag, solution irreversible steps=3, forcedWinPrefix=1/3"
  base_commitments: "opening has one viable progress; forced viable commitments 2/3"
  meta_scc: "branching_win_dag, solution irreversible steps=2, forcedWinPrefix=1/2"
  counterfactuals: not_run
evidence_limits:
  - "工具未证明玩家心理，只证明 solve / event / graph / pair facts。"
  - "meta 较薄；审美 4 需要 critic 接受其 compact paired-reading，而不是靠证据自动成立。"
  - "没有独立 evidence reviewer 或 puzzle critic artifact 前，本 packet 不能升级 proposal_ready。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round23_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round23_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round23_v1_meta.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round23_v1_base_required_latest.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round23_v1_meta_required_core.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round23_v1_ABCD.md
```

## diagnostic_routing

```yaml
hard_evidence:
  - base/meta solve traces
  - required winning-event probes
  - full edge-goal scan
mechanism_scope:
  - base latest reachable knowledge d6+, all-winning required d6+d4+short
  - meta all-known, all-winning required d6+short
claim_hygiene:
  - do not claim accepted / reference / proposal_ready before review
  - do not overclaim meta as high difficulty
  - do not treat C->A ignored reverse as caveat
taste_probes:
  - compare against ICE_CAND_0034 as compact accepted 4 anchor
  - compare against ICE_CAND_0024 as stronger 5 anchor that this candidate does not reach
  - compare against ICE_CAND_0035 as warning that wrapper/context can matter for compact meta
scc_graph:
  requested: true
  reading_rule: "SCC facts require player-facing interpretation before verdict effect"
variant_family:
  archive_lineage: fresh_required
  authorized_archive_variant_work: false
start_position:
  explicit_start_goal_pairs:
    - A->B
    - C->D
prototype_specific_work:
  meta_first_design: enabled_by_human_brief
  interface_pair_policy: enabled_by_handoff_docs
  pre_human_polish_pass: not_run_as_gate
```

## prototype_specific_contracts

```yaml
interface_pair_policy:
  declared_interface_points:
    A: [17, 7]
    B: [0, 3]
    C: [17, 1]
    D: [0, 1]
  target_pairs:
    - A->B
    - C->D
  ignored_pair_classes:
    - C/D->A/B
  risky_pair_classes:
    - A/B/C/D -> edge goals outside A/B/C/D
    - internal non-target pairs not listed under ignored pair classes
pair_diagnostics:
  ignored_pairs:
    - pair: C->A
      solved: true
      cost: 14
      verdict_effect: none
      reason: "C/D->A/B reverse pair is ignored by policy."
  disclosed_selected_interface_returns:
    - pair: A->A
      solved: true
      cost: 16
      verdict_effect: none
      reason: "selected interface return; not outside A/B/C/D."
  risky_pairs:
    - scope: A/B/C/D -> non-interface edge goals
      solved_goals: []
      status: clear
```

## meta_reinterpretation

```yaml
meta_design_mode: meta_first_design
base_instance:
  start: [17, 7]
  goal: [0, 3]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
    - ice_stop_short
  causal_chain: "prep lower ice by d4/no-chain -> fill target by short-stop -> d6+ opens left-middle B"
  intended_difficulty_score: "3"
meta_instance:
  start: [17, 1]
  goal: [0, 1]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_destroy_group_d6_plus
    - ice_stop_short
  causal_chain: "d6+ opens left-top D -> short-stop fills same target"
  intended_difficulty_score: "2 / 2+"
shared_structure:
  - "唯一 target [16,1] 被两条流程共同消费。"
  - "右侧竖向冰和左侧初始墙 goal 形成共同的 target/exit obligation。"
  - "base 的中层 d6 开 B 与 meta 的上层 d6 开 D 使用同一读法但不同高度。"
chain_delta_from_base: >
  Base 要先准备中层 d6 资源，再填 target，最后开 B；meta 从上层直接先开 D，
  再填 target。它是 compact role/order inversion，而不是大空间强复用。
classification: meaningful_reinterpretation_pending_critic
design_target:
  aesthetic_score_target: 4
  aesthetic_score_aspiration: 5_not_claimed
  difficulty_score_target:
    base: ">=3"
    meta: ">=2"
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
  round23_v1 来自本轮 target-derivation miner 素材 DERIVED_3 seed=72602，
  经 controller 加第二接口和局部墙修复后形成。archive 条目只用于 taste calibration；
  没有从 clean archive 的布局、入口出口关系、主因果链或对象摆放派生。
```

## attempt_log

```yaml
serious_structural_attempts:
  - id: ICE_EXP_META_2026_07_02_round22_v1
    outcome: held_for_old_brief_only
    reason: "base 可达 d6 但 A->B 胜利路径不使用 d6，不满足当前 brief。"
  - id: target_derivation_seed_72602_DERIVED_3
    outcome: repaired_into_round23_v1
    reason: "发现右侧 d6/short target 素材；原始 start=goal 不满足 meta-first，需要加第二接口并封掉 [0,6] 外逃。"
  - id: ICE_EXP_META_2026_07_02_round23_v1
    outcome: current_packet
    reason: "base latest-required gate pass，meta required d6+short pass，full edge scan clean。"
local_repairs:
  - "打开 C=[17,1] 作为第二入口。"
  - "在 [14,6] 加墙，禁止 A 横推底部冰开 [0,6] 非接口外逃。"
abandoned_families:
  - "round22 same-cell return under current hard base requirement。"
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0034
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    use: compact_meta_4_anchor
    human_comment_summary: >
      人类接受 compact meta 亮点候选：base 可薄，meta 约 3；关键是 meta
      左推扰乱并改写下方结构，而不是复刻 base。round23_v1 必须证明它也有
      反序读法，而不是只靠两个 d6 wall goals。
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: high_taste_strong_reuse_anchor
    human_comment_summary: >
      0024 的 5 分来自强空间/要素复用、base-time lure 与遮蔽；round23_v1
      明显更紧凑，不应自称 5。
  - candidate_id: ICE_CAND_0035
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 4
    use: compact_meta_context_warning
    human_comment_summary: >
      0035 说明 compact meta 可高审美，但依赖 return pressure 和同一结构
      在回返后改变意义；round23_v1 没有同等 wrapper，不可借此自动升 5。
none_found_reason: null
score_claim_allowed: true
controller_score_claim:
  aesthetic: "working_read_4_lower_bound_if_critic_accepts_order_inversion"
  difficulty:
    base: "working_read_3"
    meta: "working_read_2_plus"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "base 可达最高阶段 d6+ 是否被所有 A->B 胜利路径使用。"
  - "base required d6+d4+short 与 meta required d6+short 是否均由完整搜索支持。"
  - "edge-goal full scan 是否支持无接口外逃、C->A ignored reverse、A->A selected return。"
puzzle_critic:
  - "base 是否足以作为 >=3，还是只是 d6/d4/short 的紧凑执行链。"
  - "meta 是否至少 >=2，并且是否足够支持整体审美 4。"
  - "round23_v1 的反序读法是否是真重读，还是 C->D 只是 base 机构的薄化捷径。"
```
