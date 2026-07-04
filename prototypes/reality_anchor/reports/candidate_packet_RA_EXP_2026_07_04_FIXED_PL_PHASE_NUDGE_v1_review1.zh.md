# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是可移动推拉锚点；本候选通过顶部墙腔固定 P/L，但其 push/pull 分区仍生效。
    - B/S 是可移动箱黏锚点；B/S 移动会改变 material boundary。
    - 目标必须由 crate、sticky 或 anchor 覆盖；玩家不计入目标覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    fixed_anchor: push_pull
    movable_anchor: box_sticky
    fixed_anchor_effect: pull_event
    fixed_anchor_forbidden_shift: anchor_boundary_shift:push_pull
    movable_anchor_required_shift: anchor_boundary_shift:box_sticky
  tool_boundary:
    - runtime adapter / solver / graph / agency / explain-layout / fixed_anchor_probe available
    - analyzer output is evidence, not quality verdict

slot_brief:
  intended_role: challenge
  known_before: single-anchor basics plus early two-anchor exposure
  target: mid-game fixed-anchor transition candidate
  difficulty_or_support_expectation: lower than late-game dual-anchor candidates; no score claim

mechanic_exposure_context:
  mechanic_window: mid_game_transition
  allowed_exposure_through: current two-anchor introduction context
  exposure_gate_claim: not_made
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - sticky_to_box

design_target:
  aesthetic_score_target: unscored_missing_negative_human_archive_context
  difficulty_score_target: unscored_missing_negative_human_archive_context
  target_role_notes: >
    更短的 fixed P/L 过渡关：移动 B/S 两格建立材料状态，固定 pull 侧完成右目标收束。

solve_instance:
  layout: |
    ########
    ####PL##
    ########
    #.#M..M#
    #GC...G#
    #@BS...#
    ########
  player_start: [1, 5]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L 固定且不移动，但 pull_event 在所有胜路中必经。
    - B/S 是唯一移动锚点，返回解开局两次右移并触发 sticky_to_box。
    - 返回解中 crate 覆盖左目标，右侧 fixed pull 背景拉 sticky 覆盖右目标。
  allowed_support:
    - 解长 9 步，允许低难强引导。
  incidental_allowed:
    - 不声明对象实例级必要性。
    - 不声明逐目标覆盖身份在所有胜路固定。
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull

design_claim:
  player_insight: >
    玩家先移动 B/S，看到固定 P/L 不动但仍决定右侧是否能 pull；随后用左目标 crate
    和右目标 pull-sticky 完成两端收束。固定锚点是规则背景，可动锚点是短程相位调整。
  causal_chain:
    returned_trace_reading:
      - step_1: B/S 右移，触发 sticky_to_box。
      - step_2: B/S 再右移，设置右侧材料边界。
      - step_4: crate 左推覆盖左目标。
      - step_9: 在固定 P/L 的 pull 背景下拉 sticky 覆盖右目标。
    all_solution_claim:
      - B/S shift、pull_event、material_normalization 必经。
      - P/L shift 在可达图中不出现。
  why_not_execution: >
    这是低负担过渡：开局 B/S 两推较直接，但后段要求玩家意识到固定 P/L 的右侧 pull
    背景仍可收束 sticky。不给出高难或开放规划 claim。
  falsification:
    - fixed_anchor_probe 发现 P/L 可移动。
    - 存在绕过 B/S shift、pull 或 material normalization 的胜路。
    - critic 认为开局两推 B/S 完全等同局部执行，固定 P/L 作用不被玩家读到。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1 --title "Fixed P/L phase nudge v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1_layout.txt RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1 push_pull 300000 60
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1_layout.txt RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1
  solver_result:
    found: true
    cost: 9
    depth: 9
    explored_states: 155
    inputs: right right up left right right right right down
    event_counts:
      walk: 5
      push_object:box_sticky_anchor: 2
      anchor_boundary_shift:box_sticky: 2
      sticky_to_box:n1: 1
      push_object:crate#2: 1
      pull_object:sticky#1: 1
      move_sticky_rigid: 1
  trace_summary:
    - step_1 B/S shift + sticky_to_box。
    - step_2 B/S 再 shift。
    - step_4 crate 覆盖左目标。
    - step_9 fixed pull side 拉 sticky 覆盖右目标。
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers: true
  object_or_instance_evidence:
    reported_object_participation: none
    instance_level_claims_made: false
  winning_path_event_checks:
    fixed_anchor_probe:
      combined_required_groups: complete/no_bypass
      individual_required_groups: complete/no_bypass
      combined_explored_states: 770
      required_groups:
        movable_box_sticky_shift: complete/no_bypass
        fixed_push_pull_effect: complete/no_bypass
        material_normalization: complete/no_bypass
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 620
    legal_transitions: 1438
    winning_states: 13
    forbidden_reachable_anchor_boundary_shift_push_pull: none
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 87
    solution_irreversible_path_steps: 4
    forced_win_prefix: 0/4
    handoff_scriptiness: scripted=2/4
  evidence_limits:
    - 不声明唯一路线、对象实例必要性或逐目标覆盖身份固定。
    - 不声明所有胜路固定事件顺序。
    - 无 counterfactual model。
    - archive 缺少负例/下界；不输出审美/难度分数。

diagnostic_routing:
  hard_evidence:
    - fixed P/L 是否可达不移动。
    - B/S shift、pull_event、material_normalization 是否 all-solution 必经。
  mechanism_scope:
    - fixed P/L 是规则背景；B/S 是唯一移动锚点。
  claim_hygiene:
    - 不升级为后期 dual-anchor interlock。
  taste_probes:
    - 开局 B/S 两推是否仍有相位调整读法。
    - final pull 是否让固定 P/L 的存在感足够清楚。
  scc_graph:
    - graph_fact: states=620, solution_irreversible_path_steps=4, scripted=2/4
    - neutral_meaning: 小关但有分支和重定位空间；开局短脚本风险存在。
    - player_facing_interpretation_requested: 作为低负担过渡是否可接受。
  variant_family: fixed_anchor_transitions
  start_position: fixed
  prototype_specific_work: no design_handoff.yml found

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
    顶部固定 P/L 墙腔与短 B/S 相位推进不是 RA_CAND_0001 的布局、路线或对象角色变体。

attempt_log:
  serious_structural_attempts:
    - fixed_anchor_transition search after fresh claim
  local_repairs:
    - selected shorter fixed P/L sample with reachable scan proving no P/L shift
  abandoned_families: []

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      status: accepted
      use: positive_reference_only
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，综合质量较高的好关。
  negative_anchor_none_found: true
  none_found_reason: clean human-reviewed archive 当前只有一个 accepted 正例，没有相关低分/失败/下界条目。

claim_last_review:
  mode: not_used
  facts_packet: not_applicable
  claim_packet: not_applicable
  read_order: not_applicable
```

## Artifact References

- `prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1.md`
- `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_FIXED_PL_PHASE_NUDGE_v1.md`

