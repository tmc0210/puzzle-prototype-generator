# Candidate Packet: RA_EXP_2026_07_04_PHASE_FERRY_v6

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点，P 侧为 push world，L 侧为 pull world；同关最多一个。
    - B/S 是箱黏锚点，B 侧为 box world，S 侧为 sticky world；同关最多一个。
    - 两类锚点可同关共存，均为 1x2 刚体，只平移不旋转。
    - 推/拉对物体实例施力，force 可沿方向传播。
    - 黏格在 sticky side 四邻接合并；跨入 box side 变成独立箱。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    target_covering_objects: [crate, sticky_block, push_pull_anchor, box_sticky_anchor]
    player_on_target_does_not_win: true
    central_event_patterns:
      - anchor_boundary_shift:push_pull
      - anchor_boundary_shift:box_sticky
      - pull_object
      - box_to_sticky | sticky_to_box
      - sticky_merge
      - move_sticky_rigid
  tool_boundary:
    runtime_adapter: implemented
    solver: implemented through generic runtime interface
    layout_analyzer_graph_agency: implemented through generic runtime interface
    event_group_probe: implemented as reports/probe_dual_axis_candidate.ts
    puzzlescript_exporter: unavailable in v0
    curated_miner: unavailable in v0

slot_brief:
  intended_role: challenge
  known_before: [K_runtime_smoke]
  target: fresh late-game high-difficulty attempt using exactly one P/L and one B/S anchor
  difficulty_or_support_expectation: support none; no numeric score requested

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
    - sticky_merge
    - move_sticky_rigid
  explicit_nonclaim:
    - no unique-solution claim
    - no per-object identity necessity claim
    - no per-target covering identity claim
    - no numeric aesthetic or difficulty score claim

design_target:
  aesthetic_score_target: unscored_by_request_and_sparse_archive_calibration
  difficulty_score_target: unscored_by_request_and_sparse_archive_calibration
  target_role_notes: >
    尝试高难 compact challenge。当前只有一个 clean 正向归档锚点且缺少负例/下界；
    本 packet 只输出结构性观察，不输出数值审美或难度结论。

solve_instance:
  id: RA_EXP_2026_07_04_PHASE_FERRY_v6
  title: Phase ferry v6
  player_start: [4, 4]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ########
    #..#..G#
    ##GMLP.#
    #.BS.M.#
    #C..@.##
    ########

mechanism_scope:
  central:
    - both anchor-shift event groups are required on every winning path
    - pull event group is required on every winning path
    - B/S material normalization is required on every winning path
    - sticky_merge is required on every winning path
    - sticky rigid movement is required on every winning path
  allowed_support:
    - force_chain
    - ballast crate as state-space blocker, not as active mechanism claim
    - ordinary walking/repositioning inside SCCs
  incidental_allowed:
    - alternate post-merge paths that preserve all required event groups
    - multiple winning end states
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家要读出 compact phase ferry：左目标需要先把黏材料 merge 后转箱覆盖；
    右上目标需要在 P/L 与 B/S 被重置后保留/再生成可推送的 sticky 刚体。
    两个目标消费同一材料链的不同状态，而不是两个独立小谜题。
  causal_chain:
    - 开局推动右侧黏块并联动 P/L，建立第一个 push/pull 边界变化。
    - 黏块左推触发 sticky_merge，之后再通过 sticky_to_box 覆盖左目标。
    - 中段 pull P/L 与 B/S，重新布置两条边界并再次触发 material normalization。
    - P/L 与 B/S 经 force_chain 联动，改变终局施力侧。
    - 中部 crate 被 pull 到 sticky side，触发 box_to_sticky。
    - 末段多次 P/L 移动后，sticky 刚体被送到右上目标。
  why_not_execution: >
    全事件组探针证明六组 central events 均无 winning bypass。v7 去掉底部 ballast crate
    后出现 sticky_merge 绕过，说明 v6 的小 C 虽不作为主动亮点，却在结构上封住非合并胜路。
  falsification:
    - 若六组 event group 任一存在 winning bypass，核心 claim 失败。
    - 若 critic 认为 ballast crate 只是任意堵路而非可接受的 state-shaping，需降级或改图。
    - 若 critic 认为末段 P/L 左移是 padding 而非右上目标施力侧设置，需 revise。

evidence:
  commands_run:
    - command: npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_PHASE_FERRY_v6_layout.txt --id RA_EXP_2026_07_04_PHASE_FERRY_v6 --title "Phase ferry v6" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_PHASE_FERRY_v6.md
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_PHASE_FERRY_v6.json
    - command: npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_PHASE_FERRY_v6_layout.txt RA_EXP_2026_07_04_PHASE_FERRY_v6 300000 160
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_PHASE_FERRY_v6.md
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_PHASE_FERRY_v6.json
    - command: npm run check
      status: completed
      outputs: []
  solver_result:
    found: true
    cost: 26
    depth: 26
    explored_states: 1219
    inputs: right up right up left left down right right up up left down left right right down left left left up right right down right up
  trace_summary:
    event_counts:
      walk: 13
      push_object:sticky#2: 2
      force_chain:n2: 2
      anchor_boundary_shift:push_pull: 6
      move_sticky_rigid: 6
      sticky_merge:n1: 1
      push_object:sticky#1: 4
      sticky_to_box:n1: 2
      pull_object:push_pull_anchor: 1
      pull_object:box_sticky_anchor: 1
      anchor_boundary_shift:box_sticky: 2
      push_object:push_pull_anchor: 4
      pull_object:crate#2: 1
      box_to_sticky:n1: 1
  target_events:
    full_event_probe:
      found_bypass: false
      status: complete
      explored_states: 6589
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_merge
        - sticky_rigid_move
  object_or_instance_evidence:
    available: no instance-level object participation reported by analyzer
    nonclaim: no per-object necessity claim
  winning_path_event_checks:
    - push_pull_anchor_shift: complete/no winning bypass found
    - box_sticky_anchor_shift: complete/no winning bypass found
    - pull_event: complete/no winning bypass found
    - material_normalization: complete/no winning bypass found
    - sticky_merge: complete/no winning bypass found
    - sticky_rigid_move: complete/no winning bypass found
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 5376
    legal_transitions: 12762
    winning_states: 46
  graph_or_counterfactual_evidence:
    graph:
      status: complete
      reachable_states: 5376
      compressed_regions: 882
      scc_count: 599
      win_subgraph_shape: branching_win_dag
      solution_irreversible_steps: 8
      forced_win_prefix: 1/8
      forced_viable_prefix: 1/12
      forced_optimal_prefix: 10/12
    counterfactuals: none_configured
  evidence_limits:
    - no per-object participation product graph
    - no unique-route claim
    - sparse archive calibration; no numeric score claim

diagnostic_routing:
  hard_evidence:
    - verify six central event groups are supported by complete event probe
    - verify graph and SCC facts are complete
    - verify v7 sticky_merge bypass justifies retaining v6 ballast crate only as state-shaping support
  mechanism_scope:
    - challenge uses full current Reality Anchor rule window
    - no forbidden reachable events claimed
  claim_hygiene:
    - fresh_required; no archive-derived layout or route
    - no per-object or unique-route overclaim
  taste_probes:
    - does the two-target material chain read as one compact phase ferry?
    - does bottom-left ballast crate feel like acceptable state shaping or arbitrary clutter?
    - does repeated late P/L left movement read as boundary setup for right-top target or padding?
  scc_graph:
    facts:
      - graph complete, 5376 states, 882 compressed regions
      - branching_win_dag, 46 winning states
      - solution irreversible path has 8 SCC steps
      - forced viable prefix 1/12 commitments; forced optimal prefix 10/12
    required_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
  variant_family:
    relation_to_v0: fresh PHASE_FERRY search family
    selected_over_v7: v7 removes ballast crate but introduces sticky_merge bypass
    archive_candidate_relation: fresh
    nearest_clean_archive: RA_CAND_0001 only as taste anchor
  start_position: fixed by layout; no alternate start claim
  prototype_specific_work: not_applicable; no design_handoff.yml

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
    v6 来自本轮 PHASE_FERRY fresh claim 与 micro compact search；不复用 RA_CAND_0001 的
    上方封脸 M / 下方把手结构，也不复用 DUAL_LOCKSTEP_v2 的水平 lockstep 收束链。

attempt_log:
  serious_structural_attempts:
    - PHASE_FERRY_v1: returned trace 有材料 ferry，但 graph exhausted 且 sticky_merge/sticky_rigid_move 可绕过。
    - PHASE_FERRY_v2: 30 步 returned trace，graph exhausted，sticky_merge 可绕过。
    - PHASE_FERRY_v3: sticky_merge 必要迹象较强，但 graph/probe exhausted；sticky_rigid_move 可绕过。
    - PHASE_FERRY_v5: 42 步长解，六组探针未发现绕过但 graph/probe exhausted。
    - PHASE_FERRY_v6: compact micro version，graph complete，六组 event probe complete/no bypass。
    - PHASE_FERRY_v7: 去掉 ballast crate 后 sticky_merge 出现绕过，故回退 v6。
  local_repairs:
    - switched from long ferry to micro compact search to recover complete graph
    - retained ballast crate after v7 falsification
  abandoned_families:
    - fixed horizontal-P/L vertical-B/S phase ferry: too many graph-exhausted near misses

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      use: positive_anchor
      human_scores:
        aesthetic_score: 4
        difficulty_score: 4
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
        综合质量较高的好关。
      relevance: >
        Positive calibration for mechanism variety, density, coupling, and player-facing conflict.
        Not used as layout or route source.
  negative_anchor_none_found: >
    reality_anchor clean archive 当前只有 RA_CAND_0001 一条人评正例；未找到低分、
    失败或下界人评例。
  score_claim_allowed: false
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
