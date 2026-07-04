# Candidate Packet: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

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
    - sticky_merge
    - move_sticky_rigid
  explicit_nonclaim:
    - no unique-solution claim
    - no per-object identity necessity claim
    - no numeric aesthetic or difficulty score claim

design_target:
  aesthetic_score_target: unscored_by_request_and_sparse_archive_calibration
  difficulty_score_target: unscored_by_request_and_sparse_archive_calibration
  target_role_notes: >
    尽量追求后期高难和高审美，但因 archive calibration 稀疏且用户明确不要求分数，
    本 packet 不提供数值审美/难度结论。

solve_instance:
  id: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2
  title: Dual lockstep v2
  player_start: [2, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ###########
    ###.PL.####
    ##@BSGG####
    ###.MM...G#
    ###.M..M.##
    ###########

mechanism_scope:
  central:
    - both anchors are movable and required on every winning path
    - pull mode is required on every winning path
    - B/S material normalization is required on every winning path
    - sticky_merge is required on every winning path
    - sticky rigid movement is required on every winning path
  allowed_support:
    - force_chain supports B/S and material movement
    - SCC/agency facts may inform player-facing structure only with translation
  incidental_allowed:
    - equivalent repositioning inside SCCs
    - alternate end-state variants that preserve all central event groups
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky | sticky_to_box
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家必须把水平 B/S 读成材料相位闸门：开局制造箱/黏混合债务，中段必须通过
    box_to_sticky + sticky_merge 重新组织材料；水平 P/L 则控制何时能进入右侧 pull 收束。
  causal_chain:
    - 首推 B/S，sticky_to_box:n2 把两个黏格切成箱/黏混合债务。
    - 下路推箱，box_to_sticky:n1 + sticky_merge:n1 形成必要材料重组。
    - 移动 P/L，改变后续 push/pull 分界。
    - 下推 B/S，再次通过 force_chain 移动黏块并触发 sticky_merge。
    - 右移 B/S，将合并材料逐步转箱，建立右侧目标旁 crate/B/S 链。
    - pull crate 覆盖中间目标；推 crate/B/S 链让 S 覆盖右目标。
    - pull P/L 下移，使 P/L 覆盖左/中双目标并完成三目标覆盖。
  why_not_execution: >
    v2 修复了 v1 的关键问题：sticky_merge 不再只是返回解亮点，而是全胜路必要。
    完整事件组探针证明所有胜路都必须经历六组 central events；玩家不能只靠局部推 B/S
    或末端 pull 收束绕过材料重组。
  falsification:
    - 若存在胜路绕过任一 central event group，机制 claim 失败。
    - 若 critic 仍认为 repeated B/S 右移只是同向 padding，而不是材料债务的逐步转换与消费，
      role fit 需要降级或继续改结构。
    - 不声明 unique route 或 object identity necessity。

evidence:
  commands_run:
    - command: npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2_layout.txt --id RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2 --title "Dual lockstep v2" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.md
        - prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.json
    - command: npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2_layout.txt RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2 300000 100
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.md
        - prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.json
    - command: npx tsx prototypes/reality_anchor/reports/search_dual_lockstep_local.ts 740705 600 80000 120000 80
      status: completed
      outputs:
        - prototypes/reality_anchor/reports/search_dual_lockstep_local.md
      use: local structural search material only; not quality evidence
    - command: npm run check
      status: completed
      outputs: []
  solver_result:
    found: true
    cost: 19
    depth: 19
    explored_states: 1169
    inputs: right down right left up up right down left down right right right up left down right up down
  trace_summary:
    event_counts:
      push_object:box_sticky_anchor: 5
      anchor_boundary_shift:box_sticky: 6
      sticky_to_box:n2: 1
      sticky_to_box:n1: 3
      push_object:crate#1: 2
      force_chain:n2: 3
      move_sticky_rigid: 2
      box_to_sticky:n1: 1
      sticky_merge:n1: 2
      push_object:push_pull_anchor: 1
      anchor_boundary_shift:push_pull: 2
      pull_object:crate#3: 1
      pull_object:push_pull_anchor: 1
      walk: 9
  target_events:
    full_event_probe:
      found_bypass: false
      status: complete
      explored_states: 6562
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
    - push_pull_anchor_shift: no winning bypass found
    - box_sticky_anchor_shift: no winning bypass found
    - pull_event: no winning bypass found
    - material_normalization: no winning bypass found
    - sticky_merge: no winning bypass found
    - sticky_rigid_move: no winning bypass found
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 4993
    legal_transitions: 12021
    winning_states: 93
  graph_or_counterfactual_evidence:
    graph:
      status: complete
      reachable_states: 4993
      compressed_regions: 725
      scc_count: 390
      win_subgraph_shape: branching_win_dag
      solution_irreversible_steps: 6
      forced_win_prefix: 1/6
      forced_viable_prefix: 1/10
      forced_optimal_prefix: 1/10
    counterfactuals: none_configured
  evidence_limits:
    - no per-object participation product graph
    - no unique-route claim
    - sparse human archive calibration; no numeric score claim

diagnostic_routing:
  hard_evidence:
    - verify central event groups are supported by full event probe
    - verify v1 sticky_merge bypass was fixed in v2
    - graph complete, so SCC facts may be used with player-facing translation
  mechanism_scope:
    - challenge uses full current Reality Anchor rule window
    - no forbidden reachable events claimed
  claim_hygiene:
    - v2 is structural revision after critic review_1
    - fresh_required; no archive-derived layout/route claim
  taste_probes:
    - does added middle M make material debt player-visible enough?
    - does repeated B/S right movement now read as progressive material conversion rather than padding?
    - is the 19-step route late-game-challenge material, or still too guided by chokepoints?
  scc_graph:
    facts:
      - graph complete, 4993 states, 725 compressed regions
      - branching_win_dag, 93 winning states
      - forced viable prefix 1/10 commitments
      - returned solution has 6 irreversible SCC steps
    required_interpretation: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
  variant_family:
    relation_to_v1: structural_revision
    v1_critic_attack_fixed:
      - sticky_merge now all-solution required
      - forced viable prefix reduced from 3/10 to 1/10
      - returned route remains 19 steps, avoiding v2_top_goal long-walk route
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
    新候选不复用 RA_CAND_0001 的布局骨架、对象角色或上目标把手因果链。

attempt_log:
  serious_structural_attempts:
    - RA_SCRATCH_LOCKSTEP_A2: solvable but missing pull/material conversion and graph exhausted.
    - RA_SEARCH_54 / v1: graph complete and core events required, but sticky_merge bypassable; critic required structural revision.
    - v2_top_goal probe: sticky_merge required but 34-step route had excessive walk/reposition risk; abandoned before review.
    - v2 selected: added middle sticky cell; sticky_merge all-solution required while keeping 19-step route.
  local_repairs:
    - compressed unused space from raw search material to recover complete graph
    - added middle sticky cell to make material merge central rather than optional
  abandoned_families:
    - random broad search at high budget: timed out; retained only completed short/local search reports as raw attempt evidence

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
