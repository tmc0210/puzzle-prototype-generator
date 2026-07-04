# Candidate Packet: RA_EXP_2026_07_04_COMPACT_CHAIN_v1 / review_2

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
  mechanic_window: brief_context_only
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  exposure_gate_claim: not_made
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
    目标是在更低负担下保留机制多样、紧凑因果链和玩家可读的双锚短链。
    由于缺少 human-reviewed 负例/下界，reviewer/critic 不得输出分数化审美或难度判断。

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
    - B/S 材料边界和位移：返回解中 crate -> sticky、sticky rigid movement、B/S shift 到左上目标；全胜路层面仅声明 B/S shift 与 material/sticky 事件组必经。
    - P/L pull 收束：返回解中 P/L 下移覆盖中线目标；全胜路层面仅声明 pull_event 与 push_pull shift 必经。
    - 双锚均不可绕过，但不声明它们在所有胜路中的固定顺序或等权主矛盾。
  allowed_support:
    - 9 步 walk/reposition。
    - 开局和终局较受约束，作为本轮较低难度定位的一部分。
  incidental_allowed:
    - 返回解中的具体对象编号不作为 claim。
    - 不声明逐目标覆盖身份在所有胜路中固定。
    - 不声明所有胜路 temporal order / happens-before。
    - 不声明改性材料直接覆盖目标。
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
    玩家面对的是一个较低负担的紧凑双锚材料链：B/S 承担主要材料整理和左上目标覆盖读法，
    P/L 承担较轻但不可绕过的 pull 收束读法。工具只证明事件组必经；玩家侧价值由 critic
    根据返回 trace、图形态和 archive taste context 判断。
  causal_chain:
    returned_trace_reading:
      - step_2: crate 被推过 B/S 边界并归一化为 sticky。
      - step_3_to_4: sticky 作为刚体继续移动。
      - step_6_to_10: B/S 被推移，在返回解中覆盖左上目标。
      - step_15: sticky 刚体右移并触发 sticky_merge。
      - step_17: P/L 被 pull 下来，在返回解中覆盖中线目标并胜利。
    all_solution_claim:
      - 六个核心事件组在所有胜路中必经。
      - 不声明上述 returned trace 顺序在所有胜路中固定。
  why_not_execution: >
    较弱 claim：所有胜路都必须处理两个锚点、pull、材料归一化、sticky merge 和 sticky 刚体移动；
    SCC 事实反驳“全程单脚本”的强攻击，但不单独证明高洞见。候选更像短链 reading puzzle，
    不包装为开放规划型高难关。
  falsification:
    - 任一核心事件组存在 winning bypass。
    - critic 认为 P/L 的轻量收束在 lower-burden brief 下仍不可接受。
    - critic 认为 B/S 材料链只是事件库存，玩家侧短链读法不足。
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
      - step_6_to_10: B/S shifted left and up; returned trace shows it covering the top-left target.
      - step_15: sticky rigid movement triggers sticky_merge.
      - step_17: P/L pulled down; returned trace shows it covering the center target and winning.
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
    - 不声明所有胜路的事件顺序或 happens-before。
    - `allowed_exposure_through` 只作为用户 brief/context，不作为 hard exposure gate。
    - 没有人类负例/下界 archive anchor，critic 不得输出分数化审美或难度判断。

diagnostic_routing:
  hard_evidence:
    - 核对六个核心事件组 all-solution bypass 是否 complete/no bypass。
    - 核对 returned trace 是否实际包含 claim 中列出的事件。
    - 核对 review_2 是否已移除 unsupported all-solution temporal order claim。
    - 核对是否存在 unsupported object-instance、unique-route、target-identity 或 exposure-gate claim。
  mechanism_scope:
    - 中心 claim 是 lower-burden compact dual-anchor material chain，不是 cross-latch/global interlock。
    - P/L 是轻量但不可绕过的 pull 收束锚，不声明贯穿全局主角地位。
  claim_hygiene:
    - 所有顺序/目标覆盖表述应限定为 returned trace reading。
    - all-solution 层面只保留事件组必经。
  taste_probes:
    - 攻击材料链是否只是事件库存。
    - 攻击 P/L 轻量收束是否足够。
    - 检查较低难度定位是否能接受开局/终局较强制。
  scc_graph:
    - graph_fact: solution irreversible path 7, scripted handoff 2/7, max scripted run 2.
    - neutral_meaning: 有若干强制节点，但不是全程单脚本。
    - player_facing_interpretation_requested: 只能作为非单脚本 caveat/merit 背景，不当作自动质量证明。
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
    - COMPACT_CHAIN_v1_review1: critic passed with caveats, evidence reviewer required claim downgrade.
    - COMPACT_CHAIN_v1_review2: same layout, downgraded all-solution temporal/order claims.
  local_repairs:
    - Downgraded material-target-cover payoff to material-gate plus anchor-cover returned-trace payoff.
    - Downgraded all-solution order claim to returned-trace reading plus all-solution event-group necessity.
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

- `prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review2.zh.md`
- `prototypes/reality_anchor/reports/RA_EXP_2026_07_04_COMPACT_CHAIN_v1_layout.txt`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_COMPACT_CHAIN_v1.json`
- `prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_COMPACT_CHAIN_v1_review_1.zh.md`

