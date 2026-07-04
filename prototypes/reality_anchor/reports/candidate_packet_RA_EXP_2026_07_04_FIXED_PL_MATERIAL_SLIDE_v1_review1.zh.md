# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1 / review_1

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
    固定 P/L 是过渡关背景规则，不作为审美扣分；重点是固定 pull/push 分区与一次 B/S 收束。

solve_instance:
  layout: |
    #########
    ####LP###
    #########
    #M....@.#
    #.GS..M.#
    #..B#G..#
    #########
  player_start: [6, 3]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L 固定且不移动，但 pull_event 在所有胜路中必经。
    - B/S 是唯一移动锚点，返回解末段被 pull 左移覆盖左侧目标。
    - 返回解开局 sticky_to_box 覆盖右下目标，末段 B/S shift 完成左侧目标。
  allowed_support:
    - 若干走位；中期过渡可以降低压迫。
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
    玩家读出固定 P/L 只是规则背景：右侧/左侧的 push/pull 分区固定不动。
    需要先用固定背景处理右侧 sticky 的材料转换，再到左侧 pull 区把 B/S 拉入目标位。
  causal_chain:
    returned_trace_reading:
      - step_1: sticky 被推下并触发 sticky_to_box，右下目标获得覆盖材料。
      - step_4: crate 被推到右下目标。
      - step_12: 玩家在固定 P/L 的 pull 背景下拉 B/S，B/S 左移覆盖左侧目标并胜利。
    all_solution_claim:
      - B/S shift、pull_event、material_normalization 必经。
      - P/L shift 在可达图中不出现。
  why_not_execution: >
    本关不是高难互锁；它要求玩家区分“固定 push/pull 背景”和“可动材料锚点”的角色。
    图上有多个可行/死亡承诺，返回解不是唯一分支证明，但工具证据只作为背景。
  falsification:
    - fixed_anchor_probe 发现 P/L 可移动。
    - 存在绕过 B/S shift、pull 或 material normalization 的胜路。
    - critic 认为中段走位割裂了 step_1 与 step_12 的短链。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1 --title "Fixed P/L material slide v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1_layout.txt RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1 push_pull 300000 60
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1_layout.txt RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1
  solver_result:
    found: true
    cost: 12
    depth: 12
    explored_states: 243
    inputs: down right down left up up left left left left down left
    event_counts:
      walk: 9
      move_sticky_rigid: 1
      sticky_to_box:n1: 1
      push_object:crate#1: 1
      pull_object:box_sticky_anchor: 1
      anchor_boundary_shift:box_sticky: 1
  trace_summary:
    - step_1 sticky_to_box。
    - step_4 crate 覆盖右下目标。
    - step_12 pull B/S，B/S shift 获胜。
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
      combined_explored_states: 377
      required_groups:
        movable_box_sticky_shift: complete/no_bypass
        fixed_push_pull_effect: complete/no_bypass
        material_normalization: complete/no_bypass
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 352
    legal_transitions: 791
    winning_states: 3
    forbidden_reachable_anchor_boundary_shift_push_pull: none
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 91
    solution_irreversible_path_steps: 4
    forced_win_prefix: 0/4
    handoff_scriptiness: scripted=1/4
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
    - fixed P/L 的 pull 背景是否可读。
    - step_1 与 step_12 是否形成过渡关短链，而非割裂事件。
  scc_graph:
    - graph_fact: states=352, solution_irreversible_path_steps=4, scripted=1/4
    - neutral_meaning: 小型但存在多个承诺点，不是全程一键脚本。
    - player_facing_interpretation_requested: 是否有足够低负担重读价值。
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
    顶部固定 P/L 墙腔与左拉 B/S 收束结构不是 RA_CAND_0001 的布局、路线或对象角色变体。

attempt_log:
  serious_structural_attempts:
    - fixed_anchor_transition search after fresh claim
  local_repairs:
    - selected fixed P/L sample with reachable scan proving no P/L shift
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

- `prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1.md`
- `prototypes/reality_anchor/reports/fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1.md`
- `prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_FIXED_PL_MATERIAL_SLIDE_v1.md`

