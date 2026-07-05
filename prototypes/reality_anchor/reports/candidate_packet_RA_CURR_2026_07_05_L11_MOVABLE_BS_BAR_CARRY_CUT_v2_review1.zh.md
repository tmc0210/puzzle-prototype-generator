# Candidate Packet: RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2 / review 1

```yaml
prototype_context:
  confirmed_rules:
    - 无 P/L 时全局为 push world。
    - B/S 是可推动双格锚点；B 侧对象归一化为 C，S 侧对象归一化为 M。
    - 相邻 M 会 sticky_merge 成刚体；推动刚体任一格会 move_sticky_rigid。
    - 目标由 C、M 或锚点覆盖胜利；玩家不覆盖目标。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    C: 普通箱；不与相邻箱形成刚体。
    M: 黏块；正交相邻时合并为刚体。
    B/S: box_sticky_anchor；移动后触发 box_to_sticky / sticky_to_box / sticky_merge。
  tool_boundary: analyzer/solver/probes 只提供事实，不授予质量通过。

slot_brief:
  intended_role: 第十一关；无 P/L；可推动 B/S；比第十关更复杂的拼接+切割应用。
  known_before: [K_runtime_smoke, fixed_BS_join, fixed_BS_cut, movable_BS_timing]
  target: movable B/S creates a sticky carrier, consumes it, then cuts it back into a separate crate.
  difficulty_or_support_expectation: 中段偏后的箱黏锚点应用关；不能是 witness 或只触发机制。

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box
    - push_object:crate

design_target:
  aesthetic_score_target: 不自评分；交给 human / critic 校准。
  difficulty_score_target: 第十一关应用挑战；追求机制必要性，避免路线税。
  target_role_notes: >
    本轮直接回应人类反馈：黏块不能只是省步数。普通箱替代版必须无解；
    拼接出的黏条必须提供普通箱无法替代的横向整体搬运；切割后普通箱必须被独立使用。

solve_instance:
  layout: |-
    ###########
    ###########
    ###..######
    ###.CMM####
    ###...G####
    #...G.#####
    #.....BS@##
    ###########
  normalized_initial_layout: |-
    ###########
    ###########
    ###..######
    ###.CCC####
    ###...G####
    #...G.#####
    #.....BS@##
    ###########
  player_start: [8, 6]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - 初始三格材料在 B 侧归一化为普通箱；普通三箱反事实完整无解。
    - B/S 必须左移三次，将三箱逐个转为黏块并合成横向黏条。
    - 横向黏条必须整体下推一次；右端黏块覆盖右目标，普通箱替代无法做到该整体搬运。
    - B/S 必须再右移至少一次切回普通箱；切出的某个 C 必须被独立推送覆盖左下目标。
  allowed_support:
    - 不声明唯一输入序列。
    - 不声明最后被推的是固定实例 crate#1；存在更长胜路切两次并推 crate#2。
  incidental_allowed:
    - 走位顺序可变化。
    - 等价尾部可选择切出的不同普通箱，只要仍消费“先黏条搬运、后切箱分离”的结构。
  required_winning_path_events:
    - all wins require anchor_boundary_shift:box_sticky
    - all wins require box_to_sticky
    - all wins require sticky_merge
    - all wins require move_sticky_rigid
    - all wins require sticky_to_box
    - all wins require some push_object:crate#1|crate#2|crate#3
    - all wins require at least four anchor_boundary_shift:box_sticky
    - all wins require at least three box_to_sticky and at least two sticky_merge
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家要把开局的普通三箱读成“还没有形成的横向黏条”：只有把 B/S 推到足够左，
    三箱才变成可整体下推的黏性横梁；但这个整体不能直接完成两目标，必须再用 B/S
    反向切开，释放出一个普通箱单独去左下目标。
  causal_chain:
    - 推 B/S 左移三次，三箱逐个 box_to_sticky，并通过 sticky_merge 形成横向三连黏条。
    - 从上方下推黏条，触发 move_sticky_rigid；右端黏块覆盖右目标。
    - 回到底部右推 B/S，触发 sticky_to_box，把黏条左端或中段切回普通箱。
    - 走到切出的普通箱上方，将其单独下推覆盖左下目标。
  why_not_execution: >
    这不是“顺手触发机制”。普通箱替代版 complete/no-solution；无右目标时不需要黏条搬运，
    成本 22->16；无左下目标时不需要切后推箱，成本 22->11。完整事件探针显示任意胜路
    都需要拼接、刚体搬运、切割和切后普通箱推送。需要承认的弱点是开局前三次 B/S 左推
    在图上是 forced/scripted，因此不能把开局描述成强时机选择。
  falsification:
    - 若普通箱替代版可解，则 sticky unique reachability claim 失败。
    - 若存在缺少 move_sticky_rigid、sticky_to_box 或任一 crate push 的胜路，则“搬运后切割并分离使用”失败。
    - 若删任一目标不显著降成本或不移除核心阶段，则存在无效目标。
    - 若 critic 判断开局 forced 使玩家只是在执行唯一可见动作，则应结构重做或降级。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_box_analog_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_box_analog --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_directional_events.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_core_crate_any 400000 120 bs_shift=event:anchor_boundary_shift:box_sticky box_to_sticky=event:box_to_sticky sticky_merge=event:sticky_merge sticky_to_box=event:sticky_to_box rigid=event:move_sticky_rigid 'crate_push=event:push_object:crate#1|push_object:crate#2|push_object:crate#3'
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_bs_shift_count anchor_boundary_shift:box_sticky 4 400000 120
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_box_to_sticky_count box_to_sticky 3 400000 120
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_sticky_merge_count sticky_merge 2 400000 120
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_sticky_to_box_count sticky_to_box 1 400000 120
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_rigid_count move_sticky_rigid 1 400000 120
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2 "left left left up up left left up up right down left down down left down right up up up right down" 400000 120
  solver_result:
    found: true
    cost: 22
    graph_status: complete
    reachable_states: 5170
    legal_transitions: 14188
    winning_states: 266
  trace_summary:
    ref: prototypes/reality_anchor/reports/trace_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2.md
    inputs: left left left up up left left up up right down left down down left down right up up up right down
    key_steps:
      - step: 1-3
        effect: B/S 连续左推；三格 C 依次变 M，并 merge 成横向三连黏条。
      - step: 11
        effect: 下推三连黏条；右端 m 覆盖右目标。
      - step: 17
        effect: B/S 右推；左端 M 切回 C。
      - step: 22
        effect: 切出的普通箱单独下推覆盖左下目标并胜利。
  target_events:
    K_runtime_smoke: runtime adapter executable
  object_or_instance_evidence:
    object_identity_claim: not_claimed
    note: >
      主解最后推 crate#1；存在更长胜路可切两次并推 crate#2，因此只声明“某个切出的普通箱”必用。
  winning_path_event_checks:
    core_probe:
      ref: prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_core_crate_any.md
      combined: complete / no winning bypass missing bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid, or any crate_push
      individual: each required group complete / no bypass
    bs_shift_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_bs_shift_count_anchor_boundary_shift_box_sticky_min4.md
      result: complete / no win below four B/S shifts
    box_to_sticky_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_box_to_sticky_count_box_to_sticky_min3.md
      result: complete / no win below three box_to_sticky events
    sticky_merge_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_sticky_merge_count_sticky_merge_min2.md
      result: complete / no win below two sticky_merge events
    sticky_to_box_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_sticky_to_box_count_sticky_to_box_min1.md
      result: complete / no win without sticky_to_box
    rigid_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_rigid_count_move_sticky_rigid_min1.md
      result: complete / no win without move_sticky_rigid
  reachable_event_exposure:
    status: not_routed_as_forbidden-anywhere scan; all current Reality Anchor rules allowed.
  graph_or_counterfactual_evidence:
    box_analog:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_box_analog.md
      result: complete / no solution / 413 reachable states / 0 winning states
    no_left_goal:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal.md
      result: complete; shortest cost drops 22 -> 11; wins after sticky bar drop, without later cut-to-crate requirement
    no_right_goal:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal.md
      result: complete; shortest cost drops 22 -> 16; wins by cutting/pushing crate without sticky rigid carry
    scc_graph:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2.md
      facts:
        - graph complete, 5170 reachable states
        - forced commitment prefix length 3
        - first three commitments are forced B/S left pushes
        - later regions have reposition room before sticky drop and before cut/crate placement
  evidence_limits:
    - 不声明唯一路线。
    - 不声明特定箱实例必用。
    - 不声明开局 B/S 左推需要强时机判断；图事实显示前三个 B/S 左推是 forced/scripted。
    - 工具证据不能证明玩家侧审美，只支持机制必要性的前提。

diagnostic_routing:
  hard_evidence:
    - verify all-solution core event necessity
    - verify box analog complete no-solution
    - verify invalid goal prune check
    - verify no overclaim about object identity or opening timing
  mechanism_scope:
    - central: sticky-only horizontal rigid carry, then B/S cutback and independent crate use
    - reject if critic reads sticky as route compression or one-button witness
  claim_hygiene:
    - explicitly acknowledges crate-instance and forced-opening limits
  taste_probes:
    - compare with clean human-reviewed anchors and recent human feedback against meaningless sticky conversion
  scc_graph:
    - critic must interpret forced opening as graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect
  variant_family:
    - fresh_required; not a variant of rejected L11/L12/L13 or archived candidates
  start_position:
    - risk: first three B/S pushes are forced; critic should attack whether later cut/carry still supplies enough player-facing design
  prototype_specific_work:
    invalid_goal_prune:
      status: clean
      targets_checked:
        - target: [5, 5]
          action: keep
          reason: deleting left goal drops cost 22->11 and removes later cut-to-crate / final crate use
          graph_status: complete
          evidence_ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_left_goal.md
        - target: [6, 4]
          action: keep
          reason: deleting right goal drops cost 22->16 and removes sticky rigid carry requirement
          graph_status: complete
          evidence_ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_BAR_CARRY_CUT_v2_no_right_goal.md
      removed_targets: []
      retained_targets: [[5, 5], [6, 4]]

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
    这是一个独立横向三箱 -> 三连黏条 -> 整体下推 -> 反向切箱 -> 单箱下推的结构；
    不继承 clean archive 或被拒 L11/L12/L13 的布局骨架、接口关系、对象角色或求解路线。

attempt_log:
  serious_structural_attempts:
    - CARRY_CUT_v1: 证据层通过，但 critic 指出侧井 B/S 像 phase lever，sticky carry 只是一格且偏一次性把手，已拒。
    - BAR templates L-R: 搜索横向黏条 family；多个版本因右侧不可达、目标冗余或普通箱反事实风险丢弃。
    - v2: 保留两个目标，右目标强制黏条整体下推，左下目标强制切后普通箱独立使用。
  local_repairs:
    - 删除早期三目标版本中的冗余右侧目标。
    - 将 claim 从“固定 crate#1 必用”降格为“任一切出普通箱必用”。
  abandoned_families:
    - APPLIED_CUT / RELAY_CUT / CARRY_CUT_v1；按人类反馈和 critic 攻击废弃。

archive_taste_context:
  examples:
    - id: RA_CAND_0004
      type: positive_reference_with_caveat
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 3
      human_comment: "下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。"
      calibration_use: 正向看材料腾挪；负向警惕锚点相位若与核心无关会降级。
    - id: RA_CAND_0005
      type: positive_reference
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: "玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。结构有趣，机制利用率高，整体较好的挑战关。"
      calibration_use: 高分锚点来自玩家侧矛盾和构造链条，不来自事件堆叠。
    - id: RA_CAND_0006
      type: negative_example
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 5
      human_comment: "已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例，仅做归档。"
      calibration_use: 负向：不能用路线长度或目标位置硬化冒充机制美感。
    - id: RA_CAND_0013
      type: lower_bound
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 1
      human_comment: "简单黏块切割教学witness"
      calibration_use: 下界：单纯切割教学不是 L11 应用关。
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
