# Candidate Packet: RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L: P 侧推，L 侧拉；锚点是可移动 1x2 刚体。
    - B/S: B 侧为箱，S 侧为黏；移动或结算后全局归一化。
    - 黏块四邻接自动合并为刚体；刚体任何部分受阻则整步失败。
    - 胜利条件：所有目标由箱、黏块或锚点覆盖；玩家站在目标上不算覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - box_to_sticky: 箱子进入黏侧并变为黏块。
    - sticky_merge: 相邻黏块合并为刚体。
    - move_sticky_rigid: 黏刚体整体移动。
    - anchor_boundary_shift:push_pull: P/L 锚点发生平移。
  tool_boundary: analyzer/probe/trace 只提供事实，不给质量通过。

slot_brief:
  intended_role: 中期过渡关；两个锚点同时出现，其中 B/S 固定，P/L 可动。
  known_before: 默认可用全部已知机制；本轮追求较低难度但材质差异必须真实消费。
  target:
    - 固定 B/S 不可移动但功能必需。
    - 可动 P/L 至少一次参与目标结构。
    - 箱/黏差异必须在后续移动中被消费。
  difficulty_or_support_expectation: 比上一轮后期高难候选低，适合作为过渡关。

mechanic_exposure_context:
  mechanic_window: 双锚点共存；一个固定、一个活动。
  allowed_exposure_through: 全部知识可用；本关重点是固定 B/S 的材质边界与黏块合并。
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: score_claim_allowed_false
  difficulty_score_target: score_claim_allowed_false
  target_role_notes: 紧凑、低步数、单一清晰矛盾；不做分数化审美/难度声称。

solve_instance:
  layout: |
    #########
    ####BS###
    #########
    #@PLG...#
    #...C.MG#
    #########
  player_start: implicit_@
  player_goal: all_targets_covered_by_objects
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L 必须移动并覆盖上方目标。
    - 固定 B/S 的边界必须让箱子变黏。
    - 变黏后的块必须合并，并作为黏刚体移动。
  allowed_support:
    - 少量走位。
    - 固定 B/S 由墙隔离；隔离不是负面点。
  incidental_allowed:
    - 可达图中存在 pull_object 事件，但不是本 claim 的核心。
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky

design_claim:
  player_insight: 先把 P/L 送到目标位，再把箱子跨过固定 B/S 边界变成黏块；变黏后与既有黏块合并，合并刚体才能覆盖最后目标。
  causal_chain:
    - P/L 右移两次覆盖上方目标。
    - 箱子从 B 侧推入 S 侧，触发 box_to_sticky。
    - 新黏块与既有黏块相邻，触发 sticky_merge。
    - 合并后二格刚体整体右移覆盖下方目标。
  why_not_execution: 单个箱子或单个黏块不能独立完成；材质变化被后续合并和刚体移动消费，不是事件名装饰。
  falsification:
    - 存在不经 box_to_sticky / sticky_merge / move_sticky_rigid 的胜解。
    - 固定 B/S 在可达图中移动。
    - 目标可由 P/L 或既有黏块绕过完成。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1 --max-states 300000 --graph-max-states 300000 --max-depth 80 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1_layout.txt RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1 box_sticky 300000 60 strong_material_no_pull
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1_layout.txt RA_EXP_2026_07_04_FIXED_BS_STICKY_HANDLE_v1
  solver_result:
    found: true
    cost: 5
    inputs: right right down right right
    events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 push_object:sticky#1 move_sticky_rigid
  trace_summary:
    - step_0: 初始 P/L 在左，固定 B/S 在上方隔离区。
    - step_2: P/L 右移两次，覆盖上方目标。
    - step_4: 箱子跨固定 B/S 边界变黏并与既有黏块合并。
    - step_5: 合并黏刚体整体右移并获胜。
  target_events:
    returned_trace_covers: true
  object_or_instance_evidence:
    - analyzer 未提供实例级必要性；使用 all-solution event probe 补强。
  winning_path_event_checks:
    combined_probe:
      found_bypass: false
      status: complete
      explored_states: 309
      required_groups: movable_push_pull_shift, fixed_box_sticky_effect, box_to_sticky, sticky_merge, sticky_rigid_move
    individual_probes:
      movable_push_pull_shift: no winning bypass found
      fixed_box_sticky_effect: no winning bypass found
      box_to_sticky: no winning bypass found
      sticky_merge: no winning bypass found
      sticky_rigid_move: no winning bypass found
  reachable_event_exposure:
    status: complete
    reachable_states: 217
    legal_transitions: 534
    forbidden_hits: none
    forbidden_patterns: anchor_boundary_shift:box_sticky
  graph_or_counterfactual_evidence:
    graph_status: complete
    reachable_states: 217
    winning_states: 1
    agency_status: complete
    compressed_regions: 28
    scc_shape: branching_win_dag
  evidence_limits:
    - 没有实例级 object participation。
    - 没有美感/难度分数校准。

diagnostic_routing:
  hard_evidence:
    - all-solution required event groups
    - fixed-anchor immobility scan
    - complete graph/analyzer facts
  mechanism_scope: reviewer 检查固定 B/S 是否只是隔离装饰，critic 检查短解是否过于执行化。
  claim_hygiene: 不声称 pull_event 为核心。
  taste_probes:
    - 低步数是否仍有清晰材质消费。
    - 横向二格黏块是否过于微型。
  scc_graph: critic 需把 SCC 事实翻译为玩家侧解释，不可把 graph pass 当质量 pass。
  variant_family: fresh; 不是 archive 变体。
  start_position: implicit_@
  prototype_specific_work: not_applicable

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
  why_not_archive_variant: 未复用 clean archive 的布局、对象角色或求解路线。

attempt_log:
  serious_structural_attempts:
    - 固定 B/S 横向短把手：本候选。
    - 固定 P/L 竖向双目标：另一个候选。
  local_repairs:
    - 将 strong_material profile 对固定 B/S 拆为 no_pull 版本，避免把非必要拉事件作为硬门槛。
  abandoned_families:
    - 早期三个只触发材质名变化但未消费差异的候选，已按用户新约束打回。
    - 固定 B/S 竖向锁 v1/v2 存在长旁路，未送审。

archive_taste_context:
  examples:
    - id: RA_CAND_0001
      human_reviewed: true
      use: positive_anchor_only
      human_comment: 机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，综合质量较高的好关。
  negative_anchor_none_found: true
  none_found_reason: 当前 clean human-reviewed archive 仅找到一个正例，无可用低分/失败/下界人评例。
  score_claim_allowed: false

claim_last_review:
  mode: not_used
  facts_packet: this_file
  claim_packet: included
  read_order: not_applicable
```
