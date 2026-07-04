# Candidate Packet: RA_EXP_2026_07_04_COMPACT_CHAIN_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是 1x2 可移动推拉锚点；P 侧为 push world，L 侧为 pull world。
    - B/S 是 1x2 可移动箱黏锚点；B 侧为 box world，S 侧为 sticky world。
    - 两种锚点可以同关共存且独立判定；同类型锚点每关最多一个。
    - crate / sticky / anchor 都可覆盖目标；玩家站在目标上不算覆盖。
    - sticky 会四邻接合并为刚体；跨 B/S 边界后会按 box/sticky 侧归一化。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    P_L_anchor: push_pull_anchor_push_side / push_pull_anchor_pull_side
    B_S_anchor: box_sticky_anchor_box_side / box_sticky_anchor_sticky_side
    required_event_groups:
      - push_pull_anchor_shift: anchor_boundary_shift:push_pull
      - box_sticky_anchor_shift: anchor_boundary_shift:box_sticky
      - pull_event: pull_object
      - material_normalization: box_to_sticky or sticky_to_box
      - sticky_merge: sticky_merge
      - sticky_rigid_move: move_sticky_rigid
  tool_boundary:
    - runtime adapter, solver, graph, agency, explain-layout and custom event probe are available.
    - PuzzleScript exporter/checker is unavailable in v0.
    - Analyzer output is evidence, not a quality verdict.

slot_brief:
  intended_role: challenge
  known_before: all_current_reality_anchor_runtime_rules
  target: lower-burden late-game dual-anchor candidate
  difficulty_or_support_expectation: >
    用户希望本轮比前一轮高难尝试稍低；仍要求同关同时有一个 P/L 和一个 B/S。
    不提供分数化审美/难度要求，因为 clean human-reviewed archive 只有一个正例且没有负例/下界。

mechanic_exposure_context:
  mechanic_window: late_game_after_all_current_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_negative_human_archive_context
  difficulty_score_target: unscored_missing_negative_human_archive_context
  target_role_notes: >
    目标不是复刻 RA_CAND_0001 的高密度高冲突骨架，而是在更低负担下保留机制多样、
    紧凑因果链和玩家可读的双锚顺序债务。不得输出 4、4+、3/3+ 等分数化结论。

solve_instance:
  layout: |
    ##########
    #G.#MPL..#
    #.@BSG.M.#
    #..C.....#
    ##########
  player_start: [2, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - B/S 材料边界：crate -> sticky、sticky rigid movement、B/S shift 到左上目标。
    - P/L 终局收束：pull P/L 下移覆盖中线目标。
    - 双锚均必须位移；材料链必须先被消费，P/L 才能完成终局覆盖。
  allowed_support:
    - 9 步 walk/reposition。
    - 开局较强制，作为本轮较低难度定位的一部分。
  incidental_allowed:
    - 返回解中的具体对象编号不作为 claim。
    - 不声明逐目标覆盖身份在所有胜路中固定。
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家需要读出紧凑的双锚材料门：先用 B/S 把 crate 变成可移动 sticky，
    通过 sticky 刚体和 B/S 位移整理空间并占左上目标；再用 P/L 的 pull 侧把
    推拉锚下拉到中线目标。材料链是通路/状态债务，两个锚点分别完成目标覆盖。
  causal_chain:
    - 下方 crate 先被推过 B/S 边界并归一化为 sticky。
    - sticky 继续作为刚体右移，为 B/S 左移/上移和后段 merge 留出结构。
    - B/S 左移并上移覆盖左上目标。
    - 右侧 sticky 被推入合并位置，触发 sticky_merge。
    - 玩家站到 P/L 上方 pull 侧，把 P/L 下拉覆盖中线目标并获胜。
  why_not_execution: >
    图证据显示六个事件组均不可绕过，且 SCC 上只有 2/7 handoff 读作 scripted_same_state_handoff。
    开局较强制，但中后段存在重定位空间和多承诺节点；玩家不能只完成一个局部推箱动作，
    必须按材料转换、B/S 结账、sticky 合并、P/L 终局拉动的顺序处理。
  falsification:
    - 任一核心事件组存在 winning bypass。
    - critic 认为材料链或 P/L 只构成事件库存/收尾按钮，缺少玩家侧因果责任。
    - 发现候选继承 clean archive 正例的布局骨架、对象角色或主要路线。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_COMPACT_CHAIN_v1_layout.txt --id RA_EXP_2026_07_04_COMPACT_CHAIN_v1 --title "Compact dual material chain v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_COMPACT_CHAIN_v1_layout.txt RA_EXP_2026_07_04_COMPACT_CHAIN_v1 300000 80
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_COMPACT_CHAIN_v1_layout.txt RA_EXP_2026_07_04_COMPACT_CHAIN_v1
  solver_result:
    found: true
    cost: 17
    depth: 17
    explored_states: 365
    inputs: down right right right up left left down left up down right right right right up down
    event_counts:
      walk: 9
      push_object:crate#1: 1
      box_to_sticky:n1: 1
      push_object:sticky#2: 3
      move_sticky_rigid: 3
      push_object:box_sticky_anchor: 3
      anchor_boundary_shift:box_sticky: 3
      sticky_merge:n1: 1
      pull_object:push_pull_anchor: 1
      anchor_boundary_shift:push_pull: 1
  trace_summary:
    key_steps:
      - step_2: crate pushed right and normalized to sticky.
      - step_6_to_10: B/S shifted left and up, covering the top-left target.
      - step_15: sticky rigid movement triggers sticky_merge.
      - step_17: P/L pulled down, covering center target and winning.
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers: true
  object_or_instance_evidence:
    reported_object_participation: none
    instance_level_claims_made: false
  winning_path_event_checks:
    combined_core6_probe:
      found_bypass: false
      status: complete
      explored_states: 1103
      reason: no winning bypass found
    individual_groups:
      push_pull_anchor_shift: { found_bypass: false, status: complete, explored_states: 991 }
      box_sticky_anchor_shift: { found_bypass: false, status: complete, explored_states: 1015 }
      pull_event: { found_bypass: false, status: complete, explored_states: 1047 }
      material_normalization: { found_bypass: false, status: complete, explored_states: 991 }
      sticky_merge: { found_bypass: false, status: complete, explored_states: 991 }
      sticky_rigid_move: { found_bypass: false, status: complete, explored_states: 1021 }
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 991
    legal_transitions: 2474
    winning_states: 3
    event_only_illegal_transitions: 0
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 116
    commitment_transitions: 193
    winning_regions: 3
    solution_irreversible_path_steps: 7
    forced_win_prefix: 3/7
    win_subgraph_shape: branching_win_dag
    handoff_scriptiness:
      scripted: 2/7
      trivial: 0
      same_entry_exit: 2
      forced_scripted: 2
      max_run: 2
  evidence_limits:
    - 不声明唯一路线。
    - 不声明对象实例级必要性。
    - 不声明逐目标覆盖身份在所有胜路中固定。
    - 不声明改性材料直接覆盖目标。
    - 没有人类负例/下界 archive anchor，critic 不得输出分数化审美或难度判断。

diagnostic_routing:
  hard_evidence:
    - 核对六个核心事件组 all-solution bypass 是否 complete/no bypass。
    - 核对 returned trace 是否实际包含 claim 中列出的事件。
    - 核对是否存在 unsupported object-instance 或 unique-route claim。
  mechanism_scope:
    - 中心 claim 是 compact dual-anchor material gate，不是 cross-latch/global interlock。
    - P/L 是终局收束锚，不声明贯穿全局的主角地位。
  claim_hygiene:
    - 如果 reviewer 认为“材料链必须先被消费，P/L 才能完成终局覆盖”超出证据，请要求 revise_claim。
  taste_probes:
    - 攻击材料链是否只是事件库存。
    - 攻击 P/L 是否只是机械收尾按钮。
    - 检查较低难度定位是否能接受开局强制。
  scc_graph:
    - graph_fact: solution irreversible path 7, scripted handoff 2/7, max scripted run 2.
    - neutral_meaning: 有若干强制节点，但不是全程单脚本。
    - player_facing_interpretation_requested: 中后段是否给玩家足够重读空间。
  variant_family:
    - fresh family after CROSS_LATCH rejection.
    - not a revision of RA_CAND_0001 or any existing accepted candidate.
  start_position:
    - fixed as layout start; no start-position variants submitted.
  prototype_specific_work:
    - no design_handoff.yml found; no prototype-specific workflow routed.

prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []

archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    本候选不是从 RA_CAND_0001 或其他历史候选改图得来。RA_CAND_0001 只作为人类正例口味校准：
    机制多样、设计密度高、要素强耦合、玩家视角矛盾明显；不复用其布局、目标关系或路线。

attempt_log:
  serious_structural_attempts:
    - CROSS_LATCH_v1: evidence passed but critic required structural_revision.
    - CROSS_LATCH_v2: evidence passed but critic still required structural_revision because P/L not player-central and route risked local execution.
    - COMPACT_CHAIN_v1: new lower-burden family with honest P/L final-latch claim.
  local_repairs:
    - Downgraded early family desire from material-target-cover payoff to material-gate plus anchor-cover payoff.
  abandoned_families:
    - cross_latch_global_interlock

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      status: accepted
      use: positive_reference_only
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
        综合质量较高的好关。
      allowed_use: >
        只用于校准“机制多样、密度、耦合、玩家视角冲突”的正向口味；不得作为布局、路线、
        对象角色或分数化评分依据。
  negative_anchor_none_found: true
  none_found_reason: >
    clean human-reviewed archive 当前只有 RA_CAND_0001 一个 accepted 正例，没有相关低分、失败、
    下界或人类明确不满意条目。因此 score_claim_allowed=false。

claim_last_review:
  mode: not_used
  facts_packet: not_applicable
  claim_packet: not_applicable
  read_order: not_applicable
```

## Artifact References

- `prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.zh.md`
- `prototypes/reality_anchor/reports/RA_EXP_2026_07_04_COMPACT_CHAIN_v1_layout.txt`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`

