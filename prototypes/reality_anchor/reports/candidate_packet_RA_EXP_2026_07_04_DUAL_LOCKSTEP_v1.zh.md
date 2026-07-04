# Candidate Packet: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点，P 侧为 push world，L 侧为 pull world；同关最多一个。
    - B/S 是箱黏锚点，B 侧为 box world，S 侧为 sticky world；同关最多一个。
    - 两类锚点可同关共存并独立判定，均为可移动 1x2 刚体，只平移不旋转。
    - 推/拉对物体实例施力，力可沿方向传递；任何刚体任一格受阻则动作失败。
    - 黏格在 sticky side 四邻接合并为刚体；跨入 box side 会转成独立箱。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    target_covering_objects: [crate, sticky_block, push_pull_anchor, box_sticky_anchor]
    player_on_target_does_not_win: true
    central_event_patterns:
      - anchor_boundary_shift:push_pull
      - anchor_boundary_shift:box_sticky
      - pull_object
      - box_to_sticky | sticky_to_box
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
  target: late-game high-difficulty candidate using exactly one P/L anchor and one B/S anchor
  difficulty_or_support_expectation: support none; no numeric aesthetic/difficulty target by user request

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - material_normalization
    - move_sticky_rigid
  returned_solution_noncentral_events:
    - box_to_sticky
    - sticky_merge
  explicit_nonclaim:
    - sticky_merge is present on the returned shortest solution but not all-solution required.
    - no unique-solution claim
    - no per-object identity necessity claim

design_target:
  aesthetic_score_target: unscored_by_request_and_sparse_archive_calibration
  difficulty_score_target: unscored_by_request_and_sparse_archive_calibration
  target_role_notes: >
    尽量追求后期高难和高审美，但不输出分数化审美/难度结论。
    目标是 compact high-density dual-anchor lockstep，而非 witness 展示。

solve_instance:
  id: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1
  title: Dual lockstep
  player_start: [2, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ###########
    ###.PL.####
    ##@BSGG####
    ###..M...G#
    ###.M..M.##
    ###########

mechanism_scope:
  central:
    - both anchors are movable and required on every winning path
    - pull mode is required on every winning path
    - B/S material normalization is required on every winning path
    - sticky rigid movement is required on every winning path
  allowed_support:
    - returned shortest solution uses box_to_sticky and sticky_merge as a strong route-specific material payoff
    - force_chain supports both B/S and material motion
  incidental_allowed:
    - equivalent repositioning inside SCCs
    - alternate winning path that avoids sticky_merge while preserving all central event groups
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky | sticky_to_box
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家要读出水平 P/L 和水平 B/S 是锁步结构：B/S 先制造材料相位债务，
    P/L 改变后续可用力学模式，右侧收束必须同时消费 pull 与材料归一化。
  causal_chain:
    - B/S 首推将黏格转箱，打开材料债务。
    - P/L 右移改变 push/pull 分界，后续才能进入 pull 收束。
    - B/S 下推挤动黏格，触发 force_chain 与 sticky rigid movement。
    - 返回最短解底部推箱形成 box_to_sticky + sticky_merge；该 merge 是 route merit，不是硬 claim。
    - B/S 右移把黏块逐步转箱，建立右目标附近的 crate/B/S 链。
    - pull crate 覆盖中间目标；推 crate/B/S 链让 S 覆盖右目标。
    - 最后在 pull world 拉 P/L 下移，使 P/L 覆盖左/中目标并完成收束。
  why_not_execution: >
    完整事件组探针证明所有胜路都不能绕过两类 anchor shift、pull、材料归一化和
    sticky rigid movement。局部推 B/S、局部推 P/L 或只搬右侧箱链都不能单独完成三目标。
  falsification:
    - 若存在胜路绕过 central required group，则机制 claim 失败。
    - 若 critic 判断难点主要是线性走廊执行而非双锚点/材料债务读法，则 role claim 失败或降级。
    - 若 reviewer 发现 sticky_merge 被写成 all-solution necessary，应要求 revise claim；本 packet 不作该声明。

evidence:
  commands_run:
    - command: npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_layout.txt --id RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1 --title "Dual lockstep" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1.md
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1.json
    - command: npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_layout.txt RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1 300000 80
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1.md
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1.json
    - command: npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_layout.txt RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_core 300000 80 push_pull_anchor_shift=anchor_boundary_shift:push_pull box_sticky_anchor_shift=anchor_boundary_shift:box_sticky pull_event=pull_object 'material_normalization=box_to_sticky|sticky_to_box' sticky_rigid_move=move_sticky_rigid
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_core.md
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_core.json
    - command: npx tsx prototypes/reality_anchor/reports/search_dual_lockstep.ts 740704 120 8 10 8000 20000 20 8
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/search_dual_lockstep.md
      use: raw search material only; not quality evidence
  solver_result:
    found: true
    cost: 19
    depth: 19
    explored_states: 708
    inputs: right up right down left down down right left up right right right up left down right up down
  trace_summary:
    event_counts:
      push_object:box_sticky_anchor: 5
      anchor_boundary_shift:box_sticky: 6
      sticky_to_box:n1: 4
      push_object:push_pull_anchor: 1
      anchor_boundary_shift:push_pull: 2
      force_chain:n2: 3
      move_sticky_rigid: 2
      push_object:crate#1: 2
      box_to_sticky:n1: 1
      sticky_merge:n1: 1
      pull_object:crate#2: 1
      pull_object:push_pull_anchor: 1
  target_events:
    core_event_probe_combined:
      found_bypass: false
      status: complete
      explored_states: 3255
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_rigid_move
    full_event_probe_with_sticky_merge:
      found_bypass: true
      missing_groups: [sticky_merge]
      interpretation: sticky_merge is returned-route evidence only, not central all-solution evidence
  object_or_instance_evidence:
    available: no instance-level object participation reported by analyzer
    nonclaim: no per-object necessity claim
  winning_path_event_checks:
    - push_pull_anchor_shift: no winning bypass found
    - box_sticky_anchor_shift: no winning bypass found
    - pull_event: no winning bypass found
    - material_normalization: no winning bypass found
    - sticky_rigid_move: no winning bypass found
    - sticky_merge: bypass exists; not required
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 2453
    legal_transitions: 6111
    winning_states: 174
  graph_or_counterfactual_evidence:
    graph:
      status: complete
      reachable_states: 2453
      scc_count: 186
      win_subgraph_shape: branching_win_dag
      solution_irreversible_steps: 6
      forced_win_prefix: 3/6
      solution_commitments: 10
    counterfactuals: none_configured
  evidence_limits:
    - no per-object participation product graph
    - no unique-route claim
    - sticky_merge present in returned shortest solution but bypassable
    - sparse human archive calibration; no numeric score claim

diagnostic_routing:
  hard_evidence:
    - verify central event groups are supported by core event probe
    - verify sticky_merge is not overclaimed
    - graph complete, so SCC facts may be used with player-facing translation
  mechanism_scope:
    - challenge uses full current Reality Anchor rule window
    - no forbidden reachable events claimed
  claim_hygiene:
    - fresh_required
    - no archive-derived layout/route claim
  taste_probes:
    - is this a compact lockstep chain or merely a horizontal execution conveyor?
    - does repeated B/S pushing feel like state debt or padding?
    - does optional sticky_merge weaken the perceived material insight?
  scc_graph:
    facts:
      - graph complete, 2453 states, 313 compressed regions
      - branching_win_dag, 174 winning states
      - forced viable prefix 3/10 commitments
      - returned solution has 6 irreversible SCC steps
    required_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
  variant_family:
    archive_candidate_relation: fresh
    nearest_clean_archive: RA_CAND_0001 only as taste anchor
    why_not_variant: >
      RA_CAND_0001 uses vertical P/L, horizontal B/S, upper-target sticky-handle debt.
      This v1 uses horizontal P/L and horizontal B/S in a side-compressed lockstep chain,
      with final P/L pull-down and right-side B/S/box target cover.
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
    新候选不复用 RA_CAND_0001 的布局骨架、对象角色或上目标把手因果链。

attempt_log:
  serious_structural_attempts:
    - RA_SCRATCH_LOCKSTEP_A2: solvable but missing pull/material conversion and graph exhausted.
    - RA_SEARCH_54: raw search material with complete returned event group but graph exhausted at 300000.
    - RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_trim1: graph complete but bypassed box_to_sticky/sticky_merge entirely.
    - RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1_trim2: selected as v1; graph complete and core event probe clean.
  local_repairs:
    - compressed unused space from RA_SEARCH_54 to recover complete graph
    - restored middle sticky cell to recover box_to_sticky + sticky_merge on returned shortest solution
    - downgraded sticky_merge from central all-solution event to returned-route merit after event probe found bypass
  abandoned_families:
    - random broad search at high budget: timed out; retained only short completed search report as raw attempt evidence

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
        Positive calibration for dual-anchor density and coupled elements. Not used as layout or route source.
  negative_anchor_none_found: >
    reality_anchor clean archive 当前只有 RA_CAND_0001 一条人评正例；
    未找到低分、失败或下界人评例。
  score_claim_allowed: false
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
