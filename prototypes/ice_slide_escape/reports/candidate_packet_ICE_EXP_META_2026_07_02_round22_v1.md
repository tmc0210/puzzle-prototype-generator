# Serious Candidate Packet: ICE_EXP_META_2026_07_02_round22_v1

本文件是送 evidence reviewer / puzzle critic / 人工复审的候选包，不是通过结论。

```yaml
packet_status: ready_for_review_input
candidate_id: ICE_EXP_META_2026_07_02_round22_v1
prototype: ice_slide_escape
review_loop_state_before_review: held_proposal
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
  - player_goal 可以初始为墙；若机制打开该墙并最终可达，则 goal 合法。
win_condition: ice_slide_escape_explicit_goal
object_and_event_semantics:
  target: overlay，不阻挡移动或滑冰
  ice_destroyed_d3: 冰滑行 3 格撞障碍后移动冰消失
  ice_rebound_d4: 冰滑行 4 格撞障碍后回弹一格
  ice_stop_short_d1_d2: 冰滑行 1/2 格后停在障碍前
  ice_boundary_disappear: 冰从边界消失
  ice_destroy_group_d6_plus: 冰滑行 6+ 格后摧毁连续障碍组
tool_boundary:
  - solver/analyzer 提供事实，不给审美 verdict。
  - 当前证据是单关多 start/goal instance，不证明未来大地图 runtime。
  - 当前未调用独立 reviewer / critic；本 packet 只能作为送审输入。
prototype_specific_workflows:
  meta_first_design: enabled_by_human_brief
  interface_pair_policy: enabled
```

## slot_brief

```yaml
intended_role: meta_first_design candidate
known_before:
  base: all_known
  base_reason: >
    base 返回胜利路径核心只用 d3+d4+d1，但 A 起点完整可达扫描会命中
    boundary / d5 / d6 等晚期事件；因此本候选不声明 early cutoff，
    只声明 base 在全知识或后期复习阶段可用。
  meta: all_known
target:
  base_instance: A->B
  meta_instance: C->D
difficulty_or_support_expectation:
  base: "2+ / possible 3-"
  meta: "3+ target"
  overall: "至少一条流程 >=3，二者都不低于 2"
  aesthetic: "4 lower-bound target; 5 aspirational if B=C re-entry is accepted as elegant compact reuse"
```

## solve_instances

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt
layout: |
  ###########
  #.........#
  #....#....#
  #.G..I.####
  #I..I....##
  #.#####.###
interfaces:
  A: [1, 5]
  B: [7, 5]
  C: [7, 5]
  D: [10, 4]
interface_note: >
  B and C intentionally coincide. The first visit exits through B, and the
  meta visit re-enters the same reset layout from that same edge cell. This is
  a compact same-cell re-entry interface, not four physically distinct doors.
  D is an initially walled edge goal, opened by the meta d6+ push.
base_instance:
  player_start: [1, 5]
  player_goal: [7, 5]
  win_condition: ice_slide_escape_explicit_goal
meta_instance:
  player_start: [7, 5]
  player_goal: [10, 4]
  win_condition: ice_slide_escape_explicit_goal
```

## mechanism_scope

```yaml
central:
  base:
    - "开局上推左下冰，d3 清理出 base 操作空间。"
    - "右推中下冰触发 d4 rebound，形成右侧临时资源/阻挡。"
    - "从右侧回推上方冰触发 d4 rebound，覆盖唯一 target。"
    - "最后处理底部冰并走到 B/C。"
  meta:
    - "从 B/C 重入后先回推上方冰，直接把 target 填上。"
    - "左推中下冰使两块下方冰形成 no-chain/short-stop 状态。"
    - "下推左侧冰出边界，清出 d6 射线的起点。"
    - "右推剩余左侧冰触发 d6+，摧毁右侧 edge wall 并打开 D。"
allowed_support:
  - walk reposition
  - no-chain push blocker semantics
  - post-win walk to explicit edge goal
incidental_allowed:
  - base 全可达图允许晚期事件暴露；本候选不用于 early d4/d5 cutoff。
required_winning_path_events:
  base:
    - ice_destroyed_d3
    - ice_rebound_d4
  meta:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
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
    A->B 是一个中等轻量的全知识 base：玩家要先清掉左下冰，再把下方冰
    d4 成为右侧资源，随后从右侧把上方冰 d4 回 target，并用底部短停路线
    收束到 B/C。它不是单次 witness，但也不声称高难。
  meta: >
    C->D 从同一 B/C 格回访，target 填法变得更早，但下方结构被改读成
    d6 开墙链。玩家需要把 base 中“底部资源/出口收束”的区域重读成
    no-chain short-stop、边界消失和 d6+ 开 D 的后期流程。
causal_chain:
  base:
    - "Step 1: 上推 [1,4] 冰，触发 ice_destroyed_d3，清出左下区域。"
    - "Step 4: 右推 [4,4] 冰，触发 ice_rebound_d4，把冰停到右侧下方。"
    - "Step 8: 左推 [5,3] 冰，触发 ice_rebound_d4，覆盖 [2,3] target。"
    - "Step 11: 右推底部冰，ice_stop_short:d1，玩家到达 B/C。"
  meta:
    - "Step 4: 左推 [5,3] 冰，ice_rebound_d4，先覆盖 target。"
    - "Step 6: 左推 [3,4] 冰，利用另一块冰作障碍，ice_stop_short:d2。"
    - "Step 13: 下推 [1,4] 冰，ice_boundary_disappear:d1，释放 d6 射线起点。"
    - "Step 14: 右推 [1,4] 剩余冰，ice_destroy_group_d6_plus:len2，摧毁右侧墙并打开 D。"
chain_delta_from_base: >
  Base 把下方结构读成“先清空间，再建立 d4 target 填充，最后短停出 B/C”；
  meta 把同一 B/C 入口和下方结构读成“先满足 target，再组织两块左下冰，
  用边界消失与 d6+ 开 walled D”。同一 target、左下冰组、底部 B/C 通路被复用，
  但对象角色和因果顺序改变。
cross_visit_payoff: >
  首访时 B/C 像普通底部出口；回访时同一格成为 C，玩家从旧出口反向进入，
  发现旧的 target 填法只是开场，真正目标变成右侧初始墙 D。这个 same-cell
  re-entry 压缩了接口，同时让下方结构获得二次读法。
base_time_masking: >
  本候选不靠早期知识遮蔽成立；base 允许全知识。遮蔽点只作为玩家侧审美问题：
  base 中 D 是右侧墙，A->D 工具不可解，但可达图能触发晚期机制，所以不适合
  放在早期机制窗口。
why_not_execution: >
  Base 有 4 push 且 all-winning required d3+d4；meta 有 4 push，完整图只有
  1 个 winning state，all-winning required d4+short+boundary+d6，且 SCC 胜利
  延续路径 3/3 forced。工具支持它不是单次开门 witness。玩家侧仍需 critic
  判断 B=C 压缩是否足够优雅，以及 base 是否因全知识暴露而更像练习回访关。
falsification:
  - "若 A->D 可解，则 meta-first pair policy 失败。"
  - "若 A->B 存在不触发 ice_destroyed_d3 或 ice_rebound_d4 的胜利路径，则 base core claim 失败。"
  - "若 C->D 存在不触发 d4 / short-stop / boundary disappear / d6+ 的胜利路径，则 meta core claim 失败。"
  - "若 full edge scan 发现接口外 edge goal 可解，则 external edge policy 失败。"
  - "若 critic 认为 B=C same-cell re-entry 只是功能连接而非重读，应 downgrade_or_hold。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_base --player-start 1,5 --player-goal 7,5 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_meta --player-start 7,5 --player-goal 10,4 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_base_required_core --player-goal 7,5 --starts 1,5 --required-winning-events ice_destroyed_d3,ice_rebound_d4 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_base_required_full --player-goal 7,5 --starts 1,5 --required-winning-events ice_destroyed_d3,ice_rebound_d4,ice_stop_short --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_meta_required_core --player-goal 10,4 --starts 7,5 --required-winning-events ice_rebound_d4,ice_destroy_group_d6_plus --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_meta_required_full --player-goal 10,4 --starts 7,5 --required-winning-events ice_rebound_d4,ice_stop_short,ice_boundary_disappear,ice_destroy_group_d6_plus --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_base_no_late_exposure --player-goal 7,5 --starts 1,5 --forbidden-reachable-events ice_boundary_disappear,ice_pass_through_d5,slide_restart_after_group,ice_destroy_group_d6_plus --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_pair_goal_A --player-goal 1,5 --starts 1,5 7,5 10,4 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B --player-goal 7,5 --starts 1,5 7,5 10,4 --max-states 80000 --graph-max-states 80000 --write"
  - "npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt --id ICE_EXP_META_2026_07_02_round22_v1_pair_goal_D --player-goal 10,4 --starts 1,5 7,5 10,4 --max-states 80000 --graph-max-states 80000 --write"
  - "controller full edge-goal scan over 30 edge cells, summarized in edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v1_ABCD.md"
solver_result:
  base:
    found: true
    cost: 12
    pushes: 4
    returned_events:
      - ice_destroyed_d3
      - ice_rebound_d4
      - ice_rebound_d4
      - ice_stop_short:d1
    graph: "complete, reachable states=1753, legal transitions=4991, winning states=3"
  meta:
    found: true
    cost: 22
    pushes: 4
    returned_events:
      - ice_rebound_d4
      - ice_blocks_ice_no_chain_push
      - ice_stop_short:d2
      - ice_boundary_disappear:d1
      - ice_destroy_group_d6_plus:len2
      - ice_boundary_disappear_after_group
    graph: "complete, reachable states=3890, legal transitions=11053, winning states=1"
winning_path_event_checks:
  base_required_core:
    required: [ice_destroyed_d3, ice_rebound_d4]
    result: pass
    missing_required_path: not_found_complete_search
  base_required_full:
    required: [ice_destroyed_d3, ice_rebound_d4, ice_stop_short]
    result: fail
    reason: "存在 16-cost winning path 缺少 ice_stop_short；因此 base 不声明 short-stop all-solution required。"
  meta_required_core:
    required: [ice_rebound_d4, ice_destroy_group_d6_plus]
    result: pass
    missing_required_path: not_found_complete_search
  meta_required_full:
    required: [ice_rebound_d4, ice_stop_short, ice_boundary_disappear, ice_destroy_group_d6_plus]
    result: pass
    missing_required_path: not_found_complete_search
reachable_event_exposure:
  base_no_late_exposure_probe:
    result: fail
    forbidden_reachable_hits:
      - ice_boundary_disappear:d1
      - ice_boundary_disappear:d2
      - ice_destroy_group_d6_plus:len1
      - ice_destroy_group_d6_plus:len2
      - ice_pass_through_d5:len1
      - ice_pass_through_d5:len3
    conclusion: "base must be all-known; no early cutoff claim."
pair_policy:
  full_edge_scan:
    edge_goals_checked: 30
    legal_start_goal_instances_checked: 60
    all_pair_solves_complete_under_budget: true
    external_edge_escape: none
  target_pairs:
    A_to_B: solved
    C_to_D: solved
  blocked_or_invalid:
    A_to_D: unsolved
    D_as_start: invalid_initial_wall
  ignored_or_disclosed:
    C_to_A: solved_ignored_reverse
    C_to_B: solved_same_cell_return
    A_to_A: solved_selected_interface_return
    B_equals_C_to_D: target_C_to_D_same_coordinate
graph_or_counterfactual_evidence:
  base_scc: "one_win_continuation_per_scc, solution irreversible steps=3, forcedWinPrefix=1/3"
  base_commitments: "solution commitments=4; opening forced viable/optimal; later regions have viable choices"
  meta_scc: "one_win_continuation_per_scc, solution irreversible steps=3, forcedWinPrefix=3/3"
  meta_commitments: "solution commitments=4; complete graph has one winning state; post-win tail 8 walk steps"
  counterfactuals: not_run
evidence_limits:
  - "工具未证明玩家心理，只证明 solve / event / graph / pair facts。"
  - "Base 只能定位为全知识流程；不能放入 early d4-clean slot。"
  - "B=C same-cell re-entry 的审美价值需要 critic/human 判断。"
  - "没有独立 evidence reviewer 或 puzzle critic artifact，本 packet 不能自行升级 proposal_ready。"
```

证据引用：

```text
- prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_02_round22_v1_layout.txt
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.json
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.md
- prototypes/ice_slide_escape/reports/layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_full.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_core.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_core.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_no_late_exposure.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_no_late_exposure.json
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_A.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_B.md
- prototypes/ice_slide_escape/reports/start_comparison_ICE_EXP_META_2026_07_02_round22_v1_pair_goal_D.md
- prototypes/ice_slide_escape/reports/edge_goal_full_scan_ICE_EXP_META_2026_07_02_round22_v1_ABCD.md
```

## diagnostic_routing

```yaml
hard_evidence:
  - base/meta solve traces
  - required winning-event probes
  - base late-exposure probe
  - pair goal A/B/D scans
  - all-edge-goal scan including wall goals
mechanism_scope:
  - base all-known, required d3+d4, no short-stop all-solution claim
  - meta all-known, required d4+short+boundary+d6
claim_hygiene:
  - do not claim accepted / reference / proposal_ready before review
  - do not overclaim base early-stage cleanliness
  - do not treat B=C same-cell re-entry as automatically elegant
  - classify C->A and C->B as ignored reverse / same-cell return with verdict_effect none
taste_probes:
  - compare against ICE_CAND_0024 as high-taste strong reuse anchor
  - compare against ICE_CAND_0033 as low-difficulty high-aesthetic same-structure revisit anchor
  - compare against ICE_CAND_0034 as accepted aesthetic-4, meta-about-3 compact D-wall anchor
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
    A: [1, 5]
    B: [7, 5]
    C: [7, 5]
    D: [10, 4]
  target_pairs:
    - A->B
    - C->D
  same_cell_interfaces:
    - B_equals_C
  ignored_pair_classes:
    - C/D->A/B
  risky_pair_classes:
    - A/B/C/D -> edge goals outside A/B/C/D
    - internal non-target pairs not listed under ignored pair classes
pair_diagnostics:
  ignored_pairs:
    - pair: C->A
      solved: true
      cost: 12
      verdict_effect: none
      reason: "C/D->A/B reverse pair is ignored by policy."
    - pair: C->B
      solved: true
      cost: 8
      verdict_effect: none
      reason: "B=C same-cell return; selected interface return, not external escape."
  disclosed_selected_interface_returns:
    - pair: A->A
      solved: true
      verdict_effect: none
      reason: "selected interface return; not outside A/B/C/D."
  risky_pairs:
    - scope: A/B/C/D -> non-interface edge goals
      solved_goals: []
      status: clear
    - scope: A->D
      solved: false
      status: clear
    - scope: D as start
      solved: false
      status: invalid_start_initial_wall
```

## meta_reinterpretation

```yaml
meta_design_mode: meta_first_design
base_instance:
  start: [1, 5]
  goal: [7, 5]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_destroyed_d3
    - ice_rebound_d4
  causal_chain: "d3 清空间 -> d4 建立右下资源 -> d4 覆盖 target -> B/C 出口收束"
  intended_difficulty_score: "2+ / possible 3-"
  evidence_refs:
    - layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_base.md
    - start_comparison_ICE_EXP_META_2026_07_02_round22_v1_base_required_core.md
meta_instance:
  start: [7, 5]
  goal: [10, 4]
  allowed_exposure_through: ice_destroy_group_d6_plus
  claimed_core_events:
    - ice_rebound_d4
    - ice_stop_short
    - ice_boundary_disappear
    - ice_destroy_group_d6_plus
  causal_chain: "先 d4 填 target -> no-chain short-stop 排布左下冰 -> boundary 消失让位 -> d6+ 开 D"
  intended_difficulty_score: "3+"
  evidence_refs:
    - layout_analysis_ICE_EXP_META_2026_07_02_round22_v1_meta.md
    - start_comparison_ICE_EXP_META_2026_07_02_round22_v1_meta_required_full.md
shared_structure:
  - "同一个 target [2,3] 在 base/meta 中都被同一上方通道读法牵动。"
  - "左下冰组在 base 中先清路/收束，在 meta 中成为 d6 开墙资源。"
  - "B/C same-cell 出口在 base 是终点，在 meta 是回访入口。"
chain_delta_from_base: >
  Base 是从左下向右下推出目标填充和出口；meta 是从右下回入，先解决 target，
  再把左下冰组组织成 d6 开右墙。两条流程共享材料，但操作顺序、目标压力和
  冰块角色不同。
cross_visit_payoff: >
  玩家首访后认识 B/C 为出口；回访时同一格被重新解释为入口，旧结构没有重置成
  另一小关，而是从同一 target / 左下冰组推出 D-wall 开口。
base_time_masking: >
  base 不声称早期机制遮蔽；它只遮蔽 route intent。若要求早期教学窗口，应打回。
latent_or_lure_elements:
  - element: D wall [10,4]
    base_reading: A->D 不可解的右侧墙目标
    meta_payoff: C->D 用 d6+ 摧毁墙后成为出口
  - element: B=C same-cell
    base_reading: 普通底部出口
    meta_payoff: 回访入口，压缩接口并改变读题方向
interface_legality:
  starts_and_goals_checked:
    - A->B
    - C->D
    - A->D
    - C->A
    - C->B
    - all edge goals for legal interface starts
  d_wall_or_multi_interface_notes: "D 初始为墙，但 player_goal 可为墙；C->D trace 用 d6+ 打开。D 不能作为 start。"
classification: meaningful_reinterpretation_pending_critic
design_target:
  aesthetic_score_target: 4
  aesthetic_score_aspiration: 5
  difficulty_score_target:
    base: ">=2"
    meta: ">=3"
```

## scc_graph_interpretations

```yaml
- graph_fact: "base complete graph: 1753 states, 3 winning states, solution irreversible path steps=3, forcedWinPrefix=1/3."
  neutral_meaning: "base 有多步不可逆推进，但首步后存在可行选择，不是完全线性脚本。"
  player_facing_interpretation: "支持 base 至少是应用练习；是否到 3 取决于 critic 是否认可 d3+d4+d4 的读法。"
  verdict_effect: merit
- graph_fact: "meta complete graph: 3890 states, 1 winning state, solution irreversible path steps=3, forcedWinPrefix=3/3."
  neutral_meaning: "meta 的胜利延续很窄，完整图只保留一个 winning state。"
  player_facing_interpretation: "支持 meta 有真实状态债和错序惩罚；也可能被 critic 攻击为路线较脚本化。"
  verdict_effect: merit_with_caveat
- graph_fact: "meta solution has 8 trailing walk steps after first entering a winning region."
  neutral_meaning: "最后开 D 后有一段走路到达 edge goal。"
  player_facing_interpretation: "这是 walled-D 出口路由尾巴，不应当成核心难度；若 critic 认为尾巴过长，可作为非核心 caveat。"
  verdict_effect: caveat
- graph_fact: "C->A and C->B are solved; C->B same-cell return has cost 8."
  neutral_meaning: "工具能从 C/B 同格解回 base 侧接口或本格。"
  player_facing_interpretation: ""
  verdict_effect: none
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
  round22_v1 是本轮 fresh search / controller repair 产物，不从 clean archive
  的布局、入口出口关系、主因果链或对象角色派生。它使用了 D-wall、compact meta
  等已知审美词汇，但 archive 条目只用于 taste calibration。若 critic 认为它
  过于接近 ICE_CAND_0034 的结构家族，应作为 originality caveat 处理。
```

## attempt_log

```yaml
serious_structural_attempts:
  - id: ICE_EXP_META_2026_07_02_round21_v1
    outcome: abandoned_lower_bound
    reason: "base/meta 均可解且 pair clean，但 meta 只有 2 push，难度/审美不足以稳过本 brief。"
  - id: ICE_EXP_META_2026_07_02_round22_v1
    outcome: current_packet
    reason: "base/meta 均提升到 4 push，meta full required-event gate 通过，full edge scan clean。"
local_repairs:
  - "封掉左上/左侧额外入口，使合法 edge starts 收敛到 A 与 B/C。"
  - "保留 B=C same-cell re-entry，并用 D-wall 强化 meta 目标差异。"
abandoned_families:
  - "round21 的两推 compact connector 下界。"
```

## archive_taste_context

```yaml
examples:
  - candidate_id: ICE_CAND_0024
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 3
    use: positive_high_taste_meta_anchor
    human_comment_summary: >
      人类接受其为强复用 meta 标杆：base/meta 共享中间空间和大量元素，
      不是两个独立子关；base 时间遮蔽 meta 读法，并用物理可达但 target
      状态不兼容的诱惑制造回访价值。本候选明显更紧凑，应避免自称 0024 级。
  - candidate_id: ICE_CAND_0033
    human_reviewed: true
    aesthetic_score: 5
    difficulty_score: 2
    use: low_difficulty_high_aesthetic_meta_anchor
    human_comment_summary: >
      人类接受“刚做过但目标变了”的小误导/小反转；说明低难 meta 也能高审美，
      但必须有玩家侧心路变化，而不是仅仅多一条路径。
  - candidate_id: ICE_CAND_0034
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 2
    difficulty_detail: "base 2-, meta 3 左右"
    use: compact_dwall_meta_anchor
    human_comment_summary: >
      人类接受 compact D-wall meta，价值在 meta 回访扰乱并改写下方结构；
      这为 round22_v1 的目标下界提供校准，但不授权复制或放低审美门槛。
none_found_reason: null
score_claim_allowed: true
controller_score_claim:
  aesthetic: "working_read_4_candidate_not_verdict"
  difficulty:
    base: "working_read_2_plus"
    meta: "working_read_3_plus"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "A->B 与 C->D 是否分别有完整 solve / graph 证据。"
  - "base claim 是否正确收窄为 required d3+d4，而没有继续声明 short-stop all-solution 或 early cutoff。"
  - "meta full required-event gate 是否支持 d4+short+boundary+d6 all-winning claim。"
  - "D-wall goal 合法性、D invalid start、A->D clear、full edge scan 是否足以支持接口事实。"
  - "packet 是否存在把 C->A / C->B 错当 caveat 的漂移。"
puzzle_critic:
  - "B=C same-cell re-entry 是优雅压缩，还是接口贫弱 / 功能 connector。"
  - "base 4 push d3+d4+d4 是否达到 >=2，是否可接近 3。"
  - "meta 4 push 且 full required d4+short+boundary+d6，是否达到 >=3。"
  - "整体审美是否达到 4 下界；是否有任何理由接近 5，还是只能算 3+。"
  - "与 0024/0033/0034 的人类 anchor 对比是否合理，是否过度借用 0034 家族。"
```
