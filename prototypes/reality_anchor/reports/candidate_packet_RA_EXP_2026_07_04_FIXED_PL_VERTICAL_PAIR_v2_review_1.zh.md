# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L: P 侧推，L 侧拉；锚点是可移动 1x2 刚体。
    - B/S: B 侧为箱，S 侧为黏；移动或结算后全局归一化。
    - 黏块四邻接自动合并为刚体；刚体任何部分受阻则整步失败。
    - 胜利条件：所有目标由箱、黏块或锚点覆盖；玩家站在目标上不算覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - pull_object: 玩家位于 L 侧时向空前方移动并拉动身后一格相邻物体。
    - anchor_boundary_shift:box_sticky: B/S 锚点发生平移，材质边界改变。
    - sticky_to_box: 原黏块进入 B 侧并变成箱。
    - box_to_sticky: 箱子进入 S 侧并变成黏块。
    - sticky_merge: 相邻黏块合并为刚体。
    - move_sticky_rigid: 黏刚体整体移动。
  tool_boundary: analyzer/probe/trace 只提供事实，不给质量通过。

slot_brief:
  intended_role: 中期过渡关；两个锚点同时出现，其中 P/L 固定，B/S 可动。
  known_before: 默认可用全部已知机制；本轮追求较低难度但必须真实消费材质差异。
  target:
    - 固定 P/L 不能移动但拉侧必须功能性使用。
    - 可动 B/S 必须被移动以改变材质边界。
    - 箱/黏差异必须通过变黏、合并、刚体移动被消费。
  difficulty_or_support_expectation: 中期过渡；比高难候选更低，保留形状目标约束。

mechanic_exposure_context:
  mechanic_window: 双锚点共存；P/L 固定、B/S 活动。
  allowed_exposure_through: 全部知识可用；重点是固定 P/L 拉侧与 B/S 材质边界协同。
  claimed_core_events:
    - pull_object
    - anchor_boundary_shift:box_sticky
    - sticky_to_box
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: score_claim_allowed_false
  difficulty_score_target: score_claim_allowed_false
  target_role_notes: 低中等难度；用单格竖井和竖向双目标形成清晰结构，不做分数化声称。

solve_instance:
  layout: |
    ###########
    ####PL#####
    ###########
    ###BS@....#
    ######.####
    #...C..G..#
    #....M.G..#
    #.........#
    ###########
  player_start: implicit_@
  player_goal: all_targets_covered_by_objects
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - 固定 P/L 的 L 侧必须让玩家拉动 B/S。
    - B/S 移动必须触发材质归一化，并让后续箱变黏成为可能。
    - 竖向双目标必须由合并后的竖向黏刚体覆盖。
  allowed_support:
    - 单格竖井限制 B/S 进入目标带。
    - 少量走位进入下方操作区。
  incidental_allowed:
    - 可达图中的额外 pull / push 事件，只要胜解不能绕过核心组。
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull

design_claim:
  player_insight: 固定 P/L 的拉侧先把 B/S 拉到正确边界，再用这个边界把箱/黏状态转成能合成竖向刚体的形状。
  causal_chain:
    - 玩家在 L 侧拉动 B/S 一格，边界右移并把原黏块还原成箱。
    - 玩家通过单格竖井下到操作区。
    - 箱子被拉到 S 侧，触发 box_to_sticky 并与下方黏块合并。
    - 竖向黏刚体被连续拉动，覆盖竖向双目标。
  why_not_execution: 单块不能覆盖两个竖向目标；水平 B/S 不能通过单格竖井下去替代目标形状；不消费箱/黏差异就没有正确刚体。
  falsification:
    - 存在不经 pull_object / anchor_boundary_shift:box_sticky / box_to_sticky / sticky_merge / move_sticky_rigid 的胜解。
    - 固定 P/L 在可达图中移动。
    - B/S 可作为目标覆盖旁路完成胜利。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2 --max-states 800000 --graph-max-states 800000 --max-depth 140 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2_layout.txt RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2 push_pull 800000 140 strong_material
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2_layout.txt RA_EXP_2026_07_04_FIXED_PL_VERTICAL_PAIR_v2
  solver_result:
    found: true
    cost: 7
    inputs: right down down left right right right
    events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk pull_object:crate#1 box_to_sticky:n1 sticky_merge:n1 pull_object:sticky#1 move_sticky_rigid pull_object:sticky#1 move_sticky_rigid
  trace_summary:
    - step_0: 固定 P/L 在上方墙室，B/S 位于玩家身后。
    - step_1: 玩家在 L 侧拉动 B/S，触发边界移动与 sticky_to_box。
    - step_5: 箱子被拉回 S 侧，触发 box_to_sticky 与 sticky_merge。
    - step_6_7: 竖向黏刚体连续右移并覆盖竖向双目标。
  target_events:
    returned_trace_covers: true
  object_or_instance_evidence:
    - analyzer 未提供实例级必要性；使用 all-solution event probe 补强。
  winning_path_event_checks:
    combined_probe:
      found_bypass: false
      status: complete
      explored_states: 604
      required_groups: movable_box_sticky_shift, fixed_push_pull_effect, material_normalization, box_to_sticky, sticky_merge, sticky_rigid_move
    individual_probes:
      movable_box_sticky_shift: no winning bypass found
      fixed_push_pull_effect: no winning bypass found
      material_normalization: no winning bypass found
      box_to_sticky: no winning bypass found
      sticky_merge: no winning bypass found
      sticky_rigid_move: no winning bypass found
  reachable_event_exposure:
    status: complete
    reachable_states: 544
    legal_transitions: 1437
    forbidden_hits: none
    forbidden_patterns: anchor_boundary_shift:push_pull
  graph_or_counterfactual_evidence:
    graph_status: complete
    reachable_states: 544
    winning_states: 30
    agency_status: complete
    compressed_regions: 65
    scc_shape: branching_win_dag
  evidence_limits:
    - 没有实例级 object participation。
    - 没有美感/难度分数校准。

diagnostic_routing:
  hard_evidence:
    - all-solution required event groups
    - fixed-anchor immobility scan
    - complete graph/analyzer facts
  mechanism_scope: reviewer 检查固定 P/L 是否由 pull_object 真实使用，critic 检查竖井/竖向目标是否形成玩家侧洞见。
  claim_hygiene: 不声称 B/S 固定；本关固定的是 P/L。
  taste_probes:
    - 竖向双目标是否清楚表达合并刚体的形状需要。
    - 第一步强制拉 B/S 是否过于脚本化，还是作为过渡教学可接受。
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
    - 固定 P/L 拉 B/S 旧 v1/v2/v3/v4：分别因未用拉侧、单黏块旁路、不可解、B/S 盖目标旁路被打回。
    - 竖向目标 + 单格竖井：本候选。
  local_repairs:
    - 将目标改为竖向双目标，防止水平 B/S 直接覆盖。
    - 将通道收为单格竖井，防止 B/S 进入目标带。
  abandoned_families:
    - 固定 P/L 横向目标版本存在单块或 B/S 盖目标旁路。

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
