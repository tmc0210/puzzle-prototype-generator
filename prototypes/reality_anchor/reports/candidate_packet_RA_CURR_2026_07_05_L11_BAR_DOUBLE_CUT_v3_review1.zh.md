# Candidate Packet: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3 / review1

```yaml
prototype_context:
  confirmed_rules:
    - "没有 P/L 时全图默认为推世界。"
    - "B/S 是箱黏锚点；B 侧格子归一化为普通箱，S 侧格子归一化为黏块。"
    - "黏块四邻接自动合并为刚体；跨回 B 侧的黏格变成普通箱，剩余黏格按连通块保留/拆分。"
    - "所有目标必须由箱、黏块或锚点覆盖；玩家站在目标上不算。"
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    crate: "普通箱，可推动；进入 S 侧会 box_to_sticky。"
    sticky_block: "黏块刚体；相邻合并，整体推动发出 move_sticky_rigid。"
    box_sticky_anchor: "B/S 二连锚点，可推动；移动会改变材料边界并发出 anchor_boundary_shift:box_sticky。"
  tool_boundary: "solver/analyzer/probe 只提供可执行语义证据，不授予审美通过。"

slot_brief:
  intended_role: "第十一关：箱黏锚点应用，无 P/L；B/S 可推，并需要比第十关更复杂的拼接切割应用。"
  known_before: ["全部当前 Reality Anchor runtime 规则默认可用"]
  target: "玩家需要先拼接成黏条，推动黏条，再用可移动 B/S 连续切出两个普通箱并分别使用。"
  difficulty_or_support_expectation: "本轮不做数值审美/难度要求；目标是可待玩的中后期应用候选。"

mechanic_exposure_context:
  mechanic_window: "B/S 可移动；box_to_sticky、sticky_merge、move_sticky_rigid、sticky_to_box 均允许。"
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - sticky_to_box
    - move_sticky_rigid
    - push_object:crate#1
    - push_object:crate#2

design_target:
  aesthetic_score_target: "不做数值声明；追求比 witness 更强的对象身份分离与后续消费。"
  difficulty_score_target: "不做数值声明；目标是第 11 槽位可待玩候选，不作为 clean archive pass。"
  target_role_notes: "相比 L10，核心不是单次切割，而是同一黏条被两次切割，两个切出箱承担不同目标。"

solve_instance:
  layout: |
    ############
    #......G##.#
    #....@C.MM.#
    #..##.....##
    #..##...G###
    #.....BS...#
    ############
  player_start: [5, 2]
  goals: [[7, 1], [8, 4]]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - "起始 C 先进入 S 侧，变成 M 并与两个 M 合并成横向三连黏条。"
    - "三连黏条作为刚体下压；普通箱无法复制这个三格整体移动。"
    - "B/S 之后至少两次右推，连续把黏条左端和中段切回普通箱。"
    - "第一枚切出箱上推到上目标，同时打开上方通道。"
    - "第二枚切出箱再下推到下目标；少于两次切割不能获胜。"
  allowed_support:
    - "允许较多走位换位。"
    - "允许非最短胜路中先移动 B/S 后再恢复；不声明严格全胜路顺序。"
    - "不声明对象实例级唯一身份，只声明事件组和返回 trace 的可见对象消费。"
  incidental_allowed:
    - "剩余右侧黏格最终不承担目标；它是两次切割后的余料。"
    - "玩家可在底部和中部开放格内换位。"
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - sticky_to_box
    - move_sticky_rigid
    - push_object:crate#1
  required_winning_path_event_counts:
    anchor_boundary_shift:box_sticky: ">= 2"
    sticky_to_box: ">= 2"
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight:
    - "C 的第一用途不是目标，而是成为三连黏条的左端。"
    - "黏条下压后，B/S 的两次移动把同一结构切成两个普通箱；这两个箱必须分离使用。"
    - "上推第一箱既覆盖上目标又打开站位；下推第二箱覆盖下目标。"
  causal_chain:
    - "step 1 right: C 进入 S 侧，box_to_sticky + sticky_merge，形成 MMM。"
    - "step 4 down: 三连黏条整体下压，move_sticky_rigid。"
    - "step 10 right: 第一次推动 B/S，左端黏格 sticky_to_box 成 C。"
    - "step 11 right: 第二次推动 B/S，中段黏格 sticky_to_box 成 C。"
    - "steps 13-14 up: 第一枚切出箱上推到上目标。"
    - "step 16 down: 第二枚切出箱下推到下目标。"
  why_not_execution:
    - "event-count probes 证明少于两次 B/S 位移或少于两次 sticky_to_box 不能赢。"
    - "post-cut probe 证明发生 sticky_to_box 后若没有后续普通箱推动不能赢。"
    - "删上目标会释放 8 步短路；删下目标会释放 6 步短路，二者都绕过双切割。"
  falsification:
    - "若存在缺任一核心事件组的胜路，claim 失败。"
    - "若存在少于两次 sticky_to_box 或少于两次 B/S shift 的胜路，claim 失败。"
    - "若存在 sticky_to_box 后不再推动普通箱的胜路，claim 失败。"
    - "若 critic 判定早推 B/S 可恢复路线削弱了玩家侧时机洞见，可要求结构修改。"

evidence:
  commands_run:
    - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_layout.txt --id RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3 --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write"
    - "npx tsx prototypes/reality_anchor/reports/probe_directional_events.ts ... RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_core 500000 120 bs_shift box_to_sticky sticky_merge sticky_to_box rigid crate_push"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts ... RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_bs_shift_count anchor_boundary_shift:box_sticky 2 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts ... RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_cut_count sticky_to_box 2 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_post_cut_crate_push.ts ... RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts ... no_bs_before_merge / no_cut_before_merge / no_bs_before_rigid / no_cut_before_rigid 500000 120"
    - "goal-prune deletion variants for upper and lower retained targets, plus v2 right-target deletion used to prune v2 -> v3."
  solver_result:
    found: true
    cost: 16
    graph_status: complete
    reachable_states: 32329
    legal_transitions: 94850
    winning_states: 71
  trace_summary:
    inputs: "right up right down left down down left down right right up up up right down"
    key_snapshots:
      - "step 1 right: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 -> 起始 C 并入右侧 MM，形成 MMM。"
      - "step 4 down: push_object:sticky#1, move_sticky_rigid -> 三连黏条整体下压。"
      - "step 10 right: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 -> 左端切成 C。"
      - "step 11 right: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 -> 中段再切成 C。"
      - "step 14 up: push_object:crate#1 -> 第一枚切出箱覆盖上目标。"
      - "step 16 down: push_object:crate#2 -> 第二枚切出箱覆盖下目标并获胜。"
  target_events:
    returned_solution_events:
      - push_object:crate#1
      - box_to_sticky:n1
      - sticky_merge:n1
      - push_object:sticky#1
      - move_sticky_rigid
      - push_object:box_sticky_anchor
      - anchor_boundary_shift:box_sticky
      - sticky_to_box:n1
      - push_object:box_sticky_anchor
      - anchor_boundary_shift:box_sticky
      - sticky_to_box:n1
      - push_object:crate#1
      - push_object:crate#2
  object_or_instance_evidence:
    - "Analyzer does not provide stable object participation; packet does not claim all-solution instance identity."
    - "Trace snapshots show two C cells cut from the bar: the left one is pushed up, the middle one is pushed down."
  winning_path_event_checks:
    core_probe:
      ref: "prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_core.md"
      result: "combined complete/no bypass; each individual group complete/no bypass."
    bs_shift_count:
      ref: "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md"
      result: "complete/no win below two anchor_boundary_shift:box_sticky events."
    cut_count:
      ref: "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_cut_count_sticky_to_box_min2.md"
      result: "complete/no win below two sticky_to_box events."
    post_cut_crate_push:
      ref: "prototypes/reality_anchor/reports/post_cut_crate_push_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3.md"
      result: "complete/no winning path with sticky_to_box and no later push_object:crate#N."
    order_probes:
      refs:
        - "prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_no_bs_before_merge.md"
        - "prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_no_cut_before_merge.md"
        - "prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_no_bs_before_rigid.md"
        - "prototypes/reality_anchor/reports/order_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_no_cut_before_rigid.md"
      result: "all four found long winning order-violation routes; packet therefore does not claim strict all-solution order. Critic should attack whether this weakens timing insight."
  reachable_event_exposure:
    - "No P/L present; no push_pull events are claimed."
  graph_or_counterfactual_evidence:
    graph:
      ref: "prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3.md"
      status: complete
      agency:
        forced_commitment_prefix: 0
        forced_viable_prefix: 0
        forced_optimal_prefix: 3
        solution_commitments: 7
        scc_shape: "sccs=240, winSubgraph=branching_win_dag"
        handoff_scriptiness: "scripted=2/5, forcedScripted=1, maxRun=1"
  evidence_limits:
    - "不声明唯一路线、唯一终局、严格事件顺序或全胜路对象实例身份。"
    - "顺序探针反而提供 caveat：非最短胜路可先做部分 B/S/切割动作再修正。"
    - "工具不能证明玩家会获得洞见；critic 需判断玩家侧质量。"

goal_prune_check:
  status: pruned_then_clean
  removed_targets:
    - [9, 3]
  retained_targets:
    - [7, 1]
    - [8, 4]
  targets_checked:
    - target: [9, 3]
      action: remove_from_v2
      reason: "删右侧目标后成本 16->16，完整图 complete，原 trace 仍 win，core probe complete/no bypass，cut-count probe complete/no bypass；该目标对当前解法和核心事件约束冗余。"
      cost_delta: "16->16"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: none
      evidence_refs:
        - "prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_right.md"
        - "prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_right_core.md"
        - "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2_prune_no_right_cut_count_sticky_to_box_min2.md"
    - target: [7, 1]
      action: keep_in_v3
      reason: "删除后最短成本 16->8，出现缺 B/S shift、sticky_merge、sticky_to_box 的胜路。"
      cost_delta: "16->8"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "found; missing bs_shift, sticky_merge, sticky_to_box"
      evidence_refs:
        - "prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper.md"
        - "prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper_core.md"
        - "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_upper_cut_count_sticky_to_box_min2.md"
    - target: [8, 4]
      action: keep_in_v3
      reason: "删除后最短成本 16->6，出现缺 B/S shift、sticky_merge、sticky_to_box、rigid 的胜路。"
      cost_delta: "16->6"
      graph_status: complete
      expected_trace_win: true
      core_event_bypass: "found; missing bs_shift, sticky_merge, sticky_to_box, rigid"
      evidence_refs:
        - "prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower.md"
        - "prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower_core.md"
        - "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3_prune_no_lower_cut_count_sticky_to_box_min2.md"

diagnostic_routing:
  hard_evidence:
    - "Evidence reviewer 请检查 core probe、双计数 probe、post-cut crate-push probe 是否支持 central claim。"
    - "Evidence reviewer 请特别注意：order probes found violation routes，因此 packet 不声明严格全胜路顺序。"
  mechanism_scope:
    - "是否可以声明两个切出箱都被后续消费：证据是 returned trace、双计数 probe 与 post-cut probe，但不是对象实例级全胜路证明。"
    - "是否可以声明可移动 B/S 不只是按钮：证据是所有胜路至少两次 B/S shift；critic 仍需判断玩家侧是否足够。"
  claim_hygiene:
    - "不要升级为唯一解、严格顺序、对象实例级必要性或归档分数。"
  taste_probes:
    - "critic 请重点攻击：早推 B/S 可恢复长路线是否削弱时机洞见。"
    - "critic 请攻击：16 步中前半段是否仍像 witness，玩家是否真的要预判双切，还是只是顺手执行。"
    - "critic 请攻击：删掉右侧目标后，剩余黏块不盖目标，是否让黏条下压读作纯材料生产而非空间责任。"
    - "critic 请比较人类反馈中的失败模式：黏块不能只是省步，切出来的箱必须被分离使用。"
  scc_graph:
    - "graph complete; SCC 不是质量 pass。若使用，请写 graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect。"
  variant_family:
    - "fresh_required；不得视为对已归档题的授权变体。"
  start_position:
    - "开局最短解第一步是右推合并，存在其他走位与死路；请评估是否太强导向。"
  prototype_specific_work:
    - "invalid_goal_prune 已按 prototypes/reality_anchor/docs/goal_prune_check.md 执行；不要写入通用 skill。"

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
  why_not_archive_variant:
    - "不是已归档候选的布局骨架或对象角色克隆。"
    - "与先前 rejected BAR_HANDLE_SPLIT 的目标责任不同：本版要求两个切出箱分别上推/下推，不再由剩余黏块承担目标。"
    - "v1/v2/v3 的中间修补均有废案/剪枝记录；正式 candidate 是 v3。"

attempt_log:
  serious_structural_attempts:
    - "RA_CURR_2026_07_05_L11_MOVABLE_BS_PRELOAD_CARRY_SPLIT_v2：废弃；core probe 找到缺普通箱推动绕行。"
    - "RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2：证据层通过，但 puzzle critic 打回，认为 B/S 仍像一次性开关、对象决策密度低。"
    - "RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v1：废弃；event-count probe 找到只切一次也能赢的 18 步绕行。"
    - "RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2：硬证据通过，但 goal-prune 发现右侧目标冗余。"
  local_repairs:
    - "v1 增加上目标阻止一刀绕行，形成 v2。"
    - "v2 删除无效右侧目标，形成 v3。"
  abandoned_families:
    - "reverse/keyhole/vertical scratch 系列：多次被早切、力链或普通箱短路绕过。"

archive_taste_context:
  score_claim_allowed: false
  examples:
    - id: RA_CAND_0005
      human_reviewed: true
      role: positive_anchor
      human_scores: "审美 4 / 难度 4"
      human_comment_summary: "玩家侧矛盾明显，需要在推世界触及拉世界远目标，从而构造黏块+锚点三格长链；结构有趣，机制利用率高。"
    - id: RA_CAND_0011
      human_reviewed: true
      role: positive_anchor_for_compact_causal_chain
      human_scores: "审美 4 / 难度 4"
      human_comment_summary: "小空间中形成紧凑强逻辑；普通箱先上目标、再被拉出、最后回填。"
    - id: RA_CAND_0013
      human_reviewed: true
      role: lower_bound_cut_witness
      human_scores: "审美 2 / 难度 1"
      human_comment_summary: "简单黏块切割教学 witness；不应包装成高难或精密终局。"
    - id: RA_CAND_0006
      human_reviewed: true
      role: negative_anchor
      human_scores: "审美 2 / 难度 5"
      human_comment_summary: "已有高复杂度变体通过目标位置硬化增难，削弱机制美感，是负例。"
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
