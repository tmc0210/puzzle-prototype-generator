# Candidate Packet: RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是可移动推拉锚点；P 侧 push，L 侧 pull。
    - B/S 是可移动箱黏锚点；B 侧 box，S 侧 sticky。
    - 本候选通过顶部墙腔固定 B/S，但其全局材料边界仍生效。
    - 目标必须由 crate、sticky 或 anchor 覆盖；玩家不计入目标覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    fixed_anchor: box_sticky
    movable_anchor: push_pull
    fixed_anchor_effect: material_normalization
    fixed_anchor_forbidden_shift: anchor_boundary_shift:box_sticky
    movable_anchor_required_shift: anchor_boundary_shift:push_pull
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
    - anchor_boundary_shift:push_pull
    - pull_object
    - sticky_to_box

design_target:
  aesthetic_score_target: unscored_missing_negative_human_archive_context
  difficulty_score_target: unscored_missing_negative_human_archive_context
  target_role_notes: >
    固定 B/S 是教学/过渡约束，不作为审美扣分；重点是固定材料边界与一次 P/L 腾挪的短链。

solve_instance:
  layout: |
    ########
    ####BS##
    ########
    #C.P@..#
    #.GL#M.#
    #.#.G..#
    ########
  player_start: [4, 3]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - B/S 固定且不移动，但 fixed material boundary 的 material_normalization 必经。
    - P/L 是唯一移动锚点，返回解中左移后覆盖左中目标。
    - 返回解末段在 pull 侧把 sticky 拉过固定 B/S 边界，`sticky_to_box` 覆盖底部目标。
  allowed_support:
    - 短走位和低分支度；这是中期过渡而非后期高难。
  incidental_allowed:
    - 初始左上 crate 不作对象实例必要性 claim。
    - 不声明逐目标覆盖身份在所有胜路固定。
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - pull_object
    - material_normalization
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky

design_claim:
  player_insight: >
    玩家读出“固定 B/S 是材料门，移动 P/L 是一次目标/区域调整”：先安置右侧 sticky，
    再移动 P/L 覆盖左中目标，最后利用 pull 侧把 sticky 拉过固定材料边界。
  causal_chain:
    returned_trace_reading:
      - step_2: sticky 下移，准备底部收束。
      - step_7: P/L 左移，返回解中 L 覆盖左中目标。
      - step_11: pull sticky，触发 sticky_to_box，覆盖底部目标并胜利。
    all_solution_claim:
      - P/L shift、pull_event、material_normalization 必经。
      - B/S shift 在可达图中不出现。
  why_not_execution: >
    该关故意低负担；反执行 claim 仅为玩家必须处理固定 B/S 材料边界和一次 P/L 锚点位移，
    不是开放规划或复杂互锁。
  falsification:
    - fixed_anchor_probe 发现 B/S 可移动。
    - 存在绕过 P/L shift、pull 或 material normalization 的胜路。
    - critic 认为固定 B/S 没有玩家侧可读作用。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1 --title "Fixed B/S pull gate v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1_layout.txt RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1 box_sticky 300000 60
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1_layout.txt RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1
  solver_result:
    found: true
    cost: 11
    depth: 11
    explored_states: 35
    inputs: right down right up left left left down down right left
    event_counts:
      walk: 8
      move_sticky_rigid: 2
      anchor_boundary_shift:push_pull: 1
      pull_object:sticky#1: 1
      sticky_to_box:n1: 1
  trace_summary:
    - step_2 sticky 下移。
    - step_7 P/L 左移。
    - step_11 pull sticky + sticky_to_box 获胜。
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
      combined_explored_states: 98
      required_groups:
        movable_push_pull_shift: complete/no_bypass
        fixed_box_sticky_effect: complete/no_bypass
        pull_event: complete/no_bypass
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 44
    legal_transitions: 92
    winning_states: 10
    forbidden_reachable_anchor_boundary_shift_box_sticky: none
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 4
    solution_irreversible_path_steps: 1
    handoff_scriptiness: scripted=0/1
  evidence_limits:
    - 不声明唯一路线、对象实例必要性或逐目标覆盖身份固定。
    - 不声明所有胜路固定事件顺序。
    - 无 counterfactual model。
    - archive 缺少负例/下界；不输出审美/难度分数。

diagnostic_routing:
  hard_evidence:
    - fixed B/S 是否可达不移动。
    - P/L shift、pull_event、material_normalization 是否 all-solution 必经。
  mechanism_scope:
    - fixed B/S 是规则背景；P/L 是唯一移动锚点。
  claim_hygiene:
    - 不升级为后期 dual-anchor interlock。
  taste_probes:
    - 固定 B/S 是否有清楚作用，还是只是装饰。
    - 低难短链是否仍有过渡关价值。
  scc_graph:
    - graph_fact: states=44, solution_irreversible_path_steps=1, scripted=0/1
    - neutral_meaning: 非开放规划，强过渡/教学性质。
    - player_facing_interpretation_requested: 是否作为低负担中期 transition 可接受。
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
    顶部固定锚点墙腔和短链结构不是 RA_CAND_0001 的布局、路线或对象角色变体。

attempt_log:
  serious_structural_attempts:
    - fixed_anchor_transition search after fresh claim
  local_repairs:
    - selected fixed B/S sample with reachable scan proving no B/S shift
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

- `prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1.md`
- `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_FIXED_BS_PULL_GATE_v1.md`

