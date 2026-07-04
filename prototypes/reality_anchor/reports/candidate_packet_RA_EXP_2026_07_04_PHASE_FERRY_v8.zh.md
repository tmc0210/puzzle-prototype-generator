# Candidate Packet: RA_EXP_2026_07_04_PHASE_FERRY_v8

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
    - late repeated P/L movement is not claimed as an independent difficulty source

design_target:
  aesthetic_score_target: unscored_by_request_and_sparse_archive_calibration
  difficulty_score_target: unscored_by_request_and_sparse_archive_calibration
  target_role_notes: >
    尝试高难 compact challenge。当前只有一个 clean 正向归档锚点且缺少负例/下界；
    本 packet 只输出结构性观察，不输出数值审美或难度结论。

solve_instance:
  id: RA_EXP_2026_07_04_PHASE_FERRY_v8
  title: Phase ferry v8
  player_start: [4, 4]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ########
    #..#..G#
    ##GMLP.#
    #.BS.M.#
    ##..@.##
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
    - terrain wall as honest state-space constraint
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
    v8 是 compact two-stage phase shuttle。玩家不需要识别同一对象身份被两个目标消费；
    需要识别的是左目标的 merge-to-box 阶段与右上目标的 sticky-delivery 阶段，都必须
    通过 P/L 与 B/S 的边界重置连接。
  causal_chain:
    - 开局上推右侧黏块，联动 P/L，触发 P/L shift 与 sticky rigid move。
    - 黏块左推发生 sticky_merge，随后 sticky_to_box 覆盖左目标。
    - 中段 pull P/L 与 B/S，触发两类锚点移动和再次 material normalization。
    - P/L 与 B/S 被同一次 force_chain 联动移动，重设右侧收束空间。
    - crate 被 pull 到 sticky side，触发 box_to_sticky。
    - 末段 P/L 左移设置右上目标施力侧，sticky 刚体被推到右上目标。
  why_not_execution: >
    v8 修复 v6 的可疑 movable ballast：底部左侧 C 改为墙，约束读法更诚实。
    全事件组探针证明六组 central events 均无 winning bypass。末段 P/L 左移不包装为独立难点，
    只作为右上目标收束前的边界索引。
  falsification:
    - 若六组 event group 任一存在 winning bypass，核心机制 claim 失败。
    - 若 critic 认为墙约束仍像补丁或末段 P/L 仍是 core padding，需要继续修。
    - 若 critic 认为双阶段 shuttle 没有玩家侧整合，只是两个小谜题，需要 downgrade/change family。

evidence:
  commands_run:
    - command: npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_PHASE_FERRY_v8_layout.txt --id RA_EXP_2026_07_04_PHASE_FERRY_v8 --title "Phase ferry v8" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_PHASE_FERRY_v8.md
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_PHASE_FERRY_v8.json
    - command: npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_PHASE_FERRY_v8_layout.txt RA_EXP_2026_07_04_PHASE_FERRY_v8 300000 160
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_PHASE_FERRY_v8.md
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_PHASE_FERRY_v8.json
  solver_result:
    found: true
    cost: 26
    depth: 26
    explored_states: 902
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
      explored_states: 6452
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
    reachable_states: 4150
    legal_transitions: 9998
    winning_states: 35
  graph_or_counterfactual_evidence:
    graph:
      status: complete
      reachable_states: 4150
      compressed_regions: 586
      scc_count: 356
      win_subgraph_shape: branching_win_dag
      solution_irreversible_steps: 8
      forced_win_prefix: 1/8
      forced_viable_prefix: 1/12
      forced_optimal_prefix: 10/12
    counterfactuals: none_configured
  revision_evidence:
    from_v6_review_1:
      - bottom-left movable ballast C replaced by wall
      - v8 graph states reduced from 5376 to 4150
      - v8 event probe remains complete/no bypass for all six groups
    rejected_variants:
      - v7 removed the constraint entirely and introduced sticky_merge bypass
      - v9/v10 moved right goal left and collapsed puzzle to 6-step non-challenge
  evidence_limits:
    - no per-object participation product graph
    - no unique-route claim
    - sparse archive calibration; no numeric score claim

diagnostic_routing:
  hard_evidence:
    - verify six central event groups are supported by complete event probe
    - verify graph and SCC facts are complete
    - verify revised claim no longer asserts same-object chain or movable ballast necessity
  mechanism_scope:
    - challenge uses full current Reality Anchor rule window
    - no forbidden reachable events claimed
  claim_hygiene:
    - fresh_required; no archive-derived layout or route
    - no per-object or unique-route overclaim
    - late P/L indexing retained as caveat target, not claimed as standalone difficulty
  taste_probes:
    - does the two-stage phase shuttle read as integrated enough after claim downgrade?
    - is wall constraint acceptable compared with v6 movable ballast C?
    - is late P/L indexing now a noncore caveat or still a core attack?
  scc_graph:
    facts:
      - graph complete, 4150 states, 586 compressed regions
      - branching_win_dag, 35 winning states
      - solution irreversible path has 8 SCC steps
      - forced viable prefix 1/12 commitments; forced optimal prefix 10/12
    required_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
  variant_family:
    relation_to_v6: structural_revision_after_critic_review_1
    selected_over_v7: v7 removed wall/constraint and introduced sticky_merge bypass
    selected_over_v9_v10: moving right goal left collapses puzzle to 6-step non-challenge
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
    v8 来自本轮 PHASE_FERRY fresh claim 与 micro compact search；不复用 RA_CAND_0001 的
    上方封脸 M / 下方把手结构，也不复用 DUAL_LOCKSTEP_v2 的水平 lockstep 收束链。

attempt_log:
  serious_structural_attempts:
    - PHASE_FERRY_v1-v5: 多个长 ferry / near-miss；主要失败为 graph/probe exhausted 或 sticky_merge bypass。
    - PHASE_FERRY_v6: graph/probe clean，但 critic 要求结构修订，攻击 movable ballast C、同一材料链过强、末段 P/L padding。
    - PHASE_FERRY_v8: C 改墙并降级 claim，保留 graph/probe clean。
  local_repairs:
    - switched from movable ballast C to honest wall constraint
    - downgraded same-material-chain claim to two-stage phase shuttle
    - tested v9/v10 right-goal-left variants; rejected because they collapse to 6-step non-challenge
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
