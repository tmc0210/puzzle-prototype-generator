# Candidate Packet: RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2 / review1

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
  intended_role: "第十一关：无 P/L，可推动 B/S；比第十关更复杂的箱黏拼接/切割应用。"
  known_before: ["全部当前 Reality Anchor runtime 规则默认可用"]
  target: "玩家需要先拼接并消费黏结构，再移动 B/S 切出普通箱并继续使用。"
  difficulty_or_support_expectation: "中后期应用关；追求清晰高密度，不使用打分式目标。"

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

design_target:
  aesthetic_score_target: "不做数值声明；目标是高于教学 witness 的紧凑因果链。"
  difficulty_score_target: "不做数值声明；目标是第 11 槽位常规挑战。"
  target_role_notes: "不是纯 witness；玩家应理解 C 先变成三连黏条、再将左端把手切回普通箱。"

solve_instance:
  layout: |
    ############
    #......@##.#
    #.....C.MM.#
    #..##....G##
    #..##..G####
    #.....BS...#
    ############
  player_start: [7, 1]
  goals: [[9, 3], [7, 4]]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - "先把普通箱向右推入 S 侧，触发 box_to_sticky，与右侧两个 M 合并成横向三连黏条。"
    - "三连黏条作为刚体下压；右端覆盖右上目标，同时左端成为后续可切把手。"
    - "中后段才推动 B/S，切回三连左端为普通箱。"
    - "切出的普通箱随后继续下推覆盖下方目标；没有这个后续普通箱推动则不能获胜。"
  allowed_support:
    - "允许有走位和少量重定位；不声明唯一路线或对象实例级全路径必要性。"
    - "允许剩余右侧黏格作为目标覆盖结构；核心是左端把手身份变化后被消费。"
  incidental_allowed:
    - "玩家可在若干开放格内换位。"
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - sticky_to_box
    - move_sticky_rigid
    - push_object:crate#1
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight:
    - "C 不是要直接进目标；它先要变成三连黏条的左端把手。"
    - "黏条下压后，B/S 的时机才成立：切掉左端会把把手变回普通箱，用于下方目标。"
  causal_chain:
    - "step 4: C 进入 S 侧，box_to_sticky + sticky_merge，形成三连。"
    - "step 7: 三连刚体下压，move_sticky_rigid，右上目标由右端黏块承担。"
    - "step 13: B/S 右推，sticky_to_box，把左端切回普通箱。"
    - "step 18: 切出的普通箱下推覆盖下目标。"
  why_not_execution:
    - "如果删上目标，只需 6 步普通箱短路；如果删下目标，只需 7 步拼接/下压短路。两个目标共同迫使拼接、下压、切割和切后普通箱推动。"
    - "order probes 证明不存在先移动 B/S 或先切割再拼接/刚体移动的胜路。"
    - "post-cut probe 证明发生 sticky_to_box 后不能不再推动普通箱而获胜。"
  falsification:
    - "若存在缺任一核心事件的胜路，claim 失败。"
    - "若存在 sticky_to_box 后不再 push crate 的胜路，claim 失败。"
    - "若目标可删除且不降成本、不释放缺核心事件胜路，必须继续 prune。"

evidence:
  commands_run:
    - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_layout.txt --id RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2 --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write"
    - "npx tsx prototypes/reality_anchor/reports/probe_directional_events.ts ... RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_core 500000 120 bs_shift box_to_sticky sticky_merge sticky_to_box rigid crate_push"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts ... no_bs_before_merge anchor_boundary_shift:box_sticky sticky_merge 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts ... no_cut_before_merge sticky_to_box sticky_merge 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_order.ts ... no_cut_before_rigid sticky_to_box move_sticky_rigid 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_post_cut_crate_push.ts ... 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts ... push_object:crate#1 2 500000 120"
    - "goal-prune deletion variants for upper and lower remaining targets, with explain-layout and core probes."
  solver_result:
    found: true
    cost: 18
    graph_status: complete
    reachable_states: 9104
    legal_transitions: 26460
    winning_states: 102
  trace_summary:
    inputs: "left left down right up right down left down down left down right up up up right down"
    key_snapshots:
      - "step 4 right: push_object:crate#1, box_to_sticky:n1, sticky_merge:n1 -> C joins the two M cells as MMM."
      - "step 7 down: push_object:sticky#1, move_sticky_rigid -> three-cell bar drops onto the upper target lane."
      - "step 13 right: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 -> left end of bar becomes C."
      - "step 18 down: push_object:crate#1 -> cut-out C covers lower target and wins."
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
      - push_object:crate#1
  object_or_instance_evidence:
    - "Analyzer does not provide stable instance-level identity beyond event labels; packet does not claim full instance identity."
    - "Trace snapshots visually show the left end of MMM becomes C and is later pushed down."
  winning_path_event_checks:
    core_probe:
      ref: "prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_core.md"
      result: "combined complete/no bypass; each individual group complete/no bypass."
    post_cut_crate_push:
      ref: "prototypes/reality_anchor/reports/post_cut_crate_push_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2.md"
      result: "complete/no winning path with sticky_to_box and no later push_object:crate#N."
    crate_push_count:
      ref: "prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_crate_push_count_push_object_crate_1_min2.md"
      result: "complete/no win below two push_object:crate#1 events."
    order_probes:
      - "no B/S shift before sticky_merge: complete/no violation."
      - "no sticky_to_box before sticky_merge: complete/no violation."
      - "no sticky_to_box before move_sticky_rigid: complete/no violation."
  reachable_event_exposure:
    - "No P/L present; no push_pull events are in trace or required claim."
  graph_or_counterfactual_evidence:
    graph:
      ref: "prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2.md"
      status: complete
      agency:
        forced_commitment_prefix: 0
        forced_viable_prefix: 0
        forced_optimal_prefix: 4
        scc_shape: "sccs=109, winSubgraph=branching_win_dag"
        handoff_scriptiness: "scripted=0/3, forcedScripted=0, maxRun=0"
  evidence_limits:
    - "不声明唯一路线。"
    - "不声明对象实例在所有胜路中的身份轨迹，只声明事件组与相位必要性。"
    - "工具不能证明玩家侧美感；critic 需攻击是否仍是可执行链而非洞见。"

goal_prune_check:
  status: pruned_then_clean
  original_v1_removed_targets:
    - [8, 3]
  targets_checked:
    - target: [8, 3]
      action: remove_from_v1
      reason: "删左上相邻目标后成本 18->18，完整图 complete，核心事件组仍 complete/no bypass；作为顺路提示目标移除。"
      evidence_refs:
        - "layout_analysis_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x8.md"
        - "direction_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v1_remove_goal_y3x8_core.md"
    - target: [9, 3]
      action: keep_in_v2
      reason: "在 v2 中删除会产生 6 步普通箱短路，缺 bs_shift/sticky_merge/sticky_to_box/rigid。"
      cost_delta: "18->6"
      graph_status: complete
      core_event_bypass: "found; missing bs_shift, sticky_merge, sticky_to_box, rigid"
      evidence_refs:
        - "layout_analysis_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_upper.md"
        - "direction_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_upper_core.md"
    - target: [7, 4]
      action: keep_in_v2
      reason: "删除会产生 7 步无 B/S shift / sticky_to_box 的拼接下压短路。"
      cost_delta: "18->7"
      graph_status: complete
      core_event_bypass: "found; missing bs_shift, sticky_to_box"
      evidence_refs:
        - "layout_analysis_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_lower.md"
        - "direction_probe_RA_CURR_2026_07_05_L11_BAR_HANDLE_SPLIT_v2_remove_goal_lower_core.md"
  removed_targets: [[8, 3]]
  retained_targets: [[9, 3], [7, 4]]

diagnostic_routing:
  hard_evidence:
    - "请 evidence reviewer 检查 core probe、order probe、post-cut crate-push probe 是否足以支持 central claim。"
    - "请特别检查 v1->v2 goal prune 是否正确：v2 只保留两个目标。"
  mechanism_scope:
    - "是否可以声称切出的普通箱被后续使用：证据是 post-cut probe 与 trace step 18。"
    - "是否可以声称 B/S 时机：证据是 no_bs_before_merge order probe。"
  claim_hygiene:
    - "不要升级为唯一路线、对象实例全路径证明或数值高分声明。"
  taste_probes:
    - "critic 请攻击：18 步中走位是否过多；B/S 只推一次是否仍足够体现可移动 B/S 时机；横条下压+切把手是否读作真实洞见。"
    - "critic 请把它和简单 fixed B/S join/cut witness 区分：本题必须先拼接、刚体下压、再切把手并下推。"
  scc_graph:
    - "graph complete; SCC 不是质量 pass。若使用，请写 graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect。"
  variant_family:
    - "fresh_required；不是旧 L10/L11 纵向走廊或已归档布局变体。"
  start_position:
    - "开局有走位选择；forced commitment prefix 0；但最优线的事件承诺较紧。"
  prototype_specific_work:
    - "invalid_goal_prune 已按 prototypes/reality_anchor/docs/goal_prune_check.md 执行。"

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
    - "布局、对象角色、目标关系与旧 L10/L11 rejected 纵向切割走廊不同。"
    - "由本轮 fresh design claim 与子代理结构 brainstorm 产生，正式证据在本轮重跑。"

attempt_log:
  serious_structural_attempts:
    - "PRELOAD_CARRY_SPLIT_v2：废弃；core probe 找到 60 步缺普通箱推动绕行。"
    - "reverse_keyhole scratch 系列：废弃；早切 M 或普通箱力链绕行反复出现。"
    - "BAR_HANDLE_SPLIT_v1：机制成立但含一个相邻上方冗余目标；按 goal prune 删除。"
  local_repairs:
    - "v1 删除 [8,3] 后形成 v2，两目标版重新跑证据。"
  abandoned_families:
    - "单格 keyhole / 早切锁门结构：容易被普通箱力链或 B/S 早切绕过。"

archive_taste_context:
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
