# Candidate Packet: RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1 / review 1

```yaml
prototype_context:
  confirmed_rules:
    - 无 P/L 时全局为 push world。
    - B/S 是可推动双格锚点；B 侧对象归一化为 C，S 侧对象归一化为 M。
    - 相邻 M 会 sticky_merge 成刚体；推动刚体任一格会 move_sticky_rigid。
    - 目标由 C、M 或锚点覆盖胜利；玩家不覆盖目标。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    C: 普通箱，可被推/拉但不刚体连接。
    M: 黏块，正交相邻时合并为刚体。
    B/S: box_sticky_anchor，移动后触发 box_to_sticky / sticky_to_box / sticky_split 与 sticky_merge。
  tool_boundary: analyzer/solver/probes 只提供事实，不授予质量通过。

slot_brief:
  intended_role: 第十一关；无 P/L；可推动 B/S；比上一关更复杂的拼接+切割应用。
  known_before: [K_runtime_smoke, fixed_BS_join, fixed_BS_cut, movable_BS_timing]
  target: movable B/S timing with material join, rigid carry, and later cut separation
  difficulty_or_support_expectation: 中后段应用关；不追求终局高难，但不能是 witness 或只触发机制。

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
    - sticky_to_box

design_target:
  aesthetic_score_target: 参考已有 clean archive；不在 packet 中自评分。
  difficulty_score_target: 参考槽位 11 的常规应用挑战；不在 packet 中自评分。
  target_role_notes: 要避免“机制触发但无后续消费”；黏块必须提供普通箱无法替代的结构可达性。

solve_instance:
  layout: |-
    ###########
    #.........#
    #.........#
    #..#......#
    #.B#.G.C..#
    #.S##MG####
    #.@########
    ###########
  player_start: [2, 6]
  player_goal: null
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - 侧井 B/S 只负责材料相位切换，不能横向推物或覆盖目标。
    - 下层 M 被墙封住，不能作为普通箱从左右直接推动；它必须被上层把手黏合后通过刚体右移一格。
    - 后续 B/S 下推将上层把手切回普通箱，使其能独立左推回上目标，同时下层 M 留在下目标。
  allowed_support:
    - 玩家可在上层走廊绕行以接触上层对象。
    - 存在等价胜路可先把上层 C 作为普通箱预定位，再转换黏合；这不作为核心顺序声明。
  incidental_allowed:
    - 走路路线和上层箱/黏块预定位顺序可变化。
    - 不声明唯一解、对象实例级身份必要性或所有胜路都按返回 trace 的逐步顺序执行。
  required_winning_path_events:
    - all wins require: anchor_boundary_shift:box_sticky, box_to_sticky, sticky_merge, sticky_to_box, move_sticky_rigid
    - all wins require at least two anchor_boundary_shift:box_sticky
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    玩家需要把上层箱/黏块理解为下层封闭黏块的把手：只有在 S 侧黏合后，上层可触达格
    才能把下层 M 带到下目标；只有再把 B/S 推回切割相位，上层把手才能脱离下层目标，
    作为普通箱独立覆盖上目标。
  causal_chain:
    - 推动 B/S 到拼接相位，产生 box_to_sticky，并使上层材料可与下层 M sticky_merge。
    - 推动合体刚体，使下层 M 从封闭格移动到相邻下目标。
    - 推动 B/S 回切割相位，触发 sticky_to_box，让上层格恢复为 C。
    - 最后仅移动切出的上层 C 覆盖上目标，下层 M 保持覆盖下目标。
  why_not_execution: >
    目标不是“按顺手动作触发事件”。下层目标在普通箱反事实中 complete/no-solution；
    删除上目标或下目标都会释放 16-18 步的短路并绕过后续切割/分离。玩家必须理解
    黏合负责搬运、切割负责分离，而不是把黏块当省步数工具。
  falsification:
    - 若普通箱反事实可解，则 sticky 可达性 claim 失败。
    - 若存在不含 sticky_merge、move_sticky_rigid 或 sticky_to_box 的胜路，则核心机制失败。
    - 若删除任一目标不降低核心事件必要性或不降成本，则目标是无效目标。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_directional_events.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_core 300000 500 bs_shift=event:anchor_boundary_shift:box_sticky box_to_sticky=event:box_to_sticky sticky_merge=event:sticky_merge sticky_to_box=event:sticky_to_box rigid=event:move_sticky_rigid
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_bs_shift_count anchor_boundary_shift:box_sticky 2 300000 500
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_layout.txt RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_rigid_count move_sticky_rigid 1 300000 500
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_box_analog_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_box_analog --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_top_goal_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_top_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal_layout.txt --id RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
  solver_result:
    found: true
    cost: 36
    graph_status: complete
    reachable_states: 7922
    legal_transitions: 23855
    winning_states: 595
  trace_summary:
    inputs: up left up up up right right right down right right right right down left left up left left down right up up left left left down up right right down right right right down left
    key_steps:
      - step: 1
        effect: B/S 上推，C 转 M。
      - step: 16
        effect: 上层 M 左移到下层 M 上方并 sticky_merge。
      - step: 21
        effect: 合体刚体右移；下层 M 覆盖下目标。
      - step: 27
        effect: B/S 下推，触发 sticky_to_box，分离上层 C。
      - step: 36
        effect: 上层 C 左推覆盖上目标，胜利。
  target_events:
    K_runtime_smoke: runtime adapter executable
  object_or_instance_evidence:
    object_identity_claim: not_claimed
    participation_note: returned solver does not report instance-level object participation; claims are event/geometry based.
  winning_path_event_checks:
    core_probe:
      ref: prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_core.md
      combined: complete / no winning bypass missing any required group
      individual: each of bs_shift, box_to_sticky, sticky_merge, sticky_to_box, rigid complete / no bypass
    bs_shift_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_bs_shift_count_anchor_boundary_shift_box_sticky_min2.md
      result: complete / no win below two B/S shifts
    rigid_count:
      ref: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_rigid_count_move_sticky_rigid_min1.md
      result: complete / no win without move_sticky_rigid
  reachable_event_exposure:
    status: not_routed_as_forbidden-anywhere scan; all_current_reality_anchor_runtime_rules allowed.
  graph_or_counterfactual_evidence:
    box_analog:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_box_analog.md
      result: complete / no solution / 265 reachable states / 0 winning states
    no_top_goal:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_top_goal.md
      result: complete; shortest cost drops 36 -> 18; bypass no longer needs final cut separation to satisfy top target
    no_lower_goal:
      ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal.md
      result: complete; shortest cost drops 36 -> 16; bypass no longer needs lower-goal carry/separation
  evidence_limits:
    - 不声明唯一解。
    - 不声明所有胜路都先转换再移动上层材料；存在普通箱预定位再转换的等价类别。
    - 不声明对象实例级 identity necessity。

diagnostic_routing:
  hard_evidence:
    - verify all-solution core event necessity
    - verify box analog complete no-solution
    - verify invalid goal prune check
  mechanism_scope:
    - central: sticky unique reachability plus later cut separation
    - reject if critic sees this as mere step-saving or one-button witness
  claim_hygiene:
    - claim explicitly avoids unique route and strict ordering overclaim
  taste_probes:
    - compare against clean human-reviewed anchors below
    - current human feedback forbids treating event occurrence as meaningful by itself
  scc_graph:
    - main graph complete; SCC digest one initial SCC with no forced scripted handoff on returned solution
  variant_family:
    - fresh_required; not a variant of rejected L11/L12/L13 or archived candidates
  start_position:
    - start lets player push B/S first but also permits alternate prepositioning; critic should judge whether timing remains meaningful
  prototype_specific_work:
    invalid_goal_prune:
      status: clean
      targets_checked:
        - target: [5, 4]
          action: keep
          reason: deleting top target drops cost 36->18 and removes need for final separated top C placement
          graph_status: complete
          evidence_ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_top_goal.md
        - target: [6, 5]
          action: keep
          reason: deleting lower target drops cost 36->16 and removes lower carry/separation constraint
          graph_status: complete
          evidence_ref: prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L11_MOVABLE_BS_CARRY_CUT_v1_no_lower_goal.md
      removed_targets: []
      retained_targets: [[5, 4], [6, 5]]

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
    本候选使用侧井可动 B/S 做相位切换、上层把手携带封闭下层 M、后续切回普通箱分离；
    不从 clean archive 或被拒候选的布局骨架、接口关系、对象角色或求解链派生。

attempt_log:
  serious_structural_attempts:
    - G: B/S 可横向推物，最短解把锚点当推杆覆盖目标，reject。
    - H/I: 形成 carry/cut 但下层通道可站人，出现提前切割/直接下层推物绕法，reject/revise。
    - J: 侧井 B/S + 下层右侧封闭，保留 carry/cut，提升为 v1。
  local_repairs:
    - 封闭下层右侧通道，阻止站到上层黏块下方提前上推切箱。
    - 下目标移到合体刚体一次右推可覆盖的位置，切割后只移动上层 C。
  abandoned_families:
    - 旧 applied_cut / relay_cut / split_template 系列；因人类反馈或箱 analog 可解而废弃。

archive_taste_context:
  examples:
    - id: RA_CAND_0004
      type: positive_reference
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 3
      human_comment: "下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。"
      calibration_use: 正向：黏块把手/材料腾挪有趣；警示：锚点顺序若与核心无关会降为过渡定位。
    - id: RA_CAND_0005
      type: positive_reference
      human_reviewed: true
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: "玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。结构有趣，机制利用率高，整体较好的挑战关。"
      calibration_use: 正向：玩家侧矛盾和构造长链是高分挑战锚点。
    - id: RA_CAND_0006
      type: negative_example
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 5
      human_comment: "已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例，仅做归档。"
      calibration_use: 负向：不能用路线长度/目标硬化冒充机制美感。
    - id: RA_CAND_0013
      type: lower_bound
      human_reviewed: true
      aesthetic_score: 2
      difficulty_score: 1
      human_comment: "简单黏块切割教学witness"
      calibration_use: 下界：单纯切割 witness 不足以作为 L11 应用关。
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```
