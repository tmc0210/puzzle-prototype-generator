# Candidate Packet: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2 / review_1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点；P 侧为 push world，L 侧为 pull world。
    - B/S 是箱黏锚点；B 侧为 box world，S 侧为 sticky world。
    - 锚点是可移动 1x2 刚体，但本候选用墙隔离 P/L，使其在可达图中不可移动。
    - pull world 中玩家前方必须为空，且只能拉身后一格相邻物体。
    - 箱进入 sticky world 会 box_to_sticky；相邻 sticky 会 sticky_merge；sticky 作为刚体移动。
    - 胜利条件是所有目标被箱、黏块或锚点箱格覆盖；玩家站在目标上不算覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - P/L: fixed push-pull anchor in a wall pocket
    - B/S: movable box-sticky anchor
    - C: box
    - M/m: sticky cell / sticky cell covering target
    - G/g: target / covered target
  tool_boundary:
    - runtime adapter、solver、layout analyzer、graph/agency analyzer、fixed-anchor probe 可用。
    - PuzzleScript exporter/checker 不可用。

slot_brief:
  intended_role: mid_game_fixed_anchor_transition
  known_before:
    - K_runtime_smoke
  target:
    - K_runtime_smoke
    - two_anchors_one_fixed_transition
    - structural_sticky_necessity_after_user_feedback
  difficulty_or_support_expectation: >
    中期过渡关：两个锚点同时出现，其中 P/L 固定在墙腔中但通过全局 push/pull 分区产生必要效果；
    B/S 可动并负责材料结构。难度应低于终局双锚高难，但不能让黏块退化为省步数。

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_human_archive_context
  difficulty_score_target: unscored_missing_human_archive_context
  score_claim_allowed: false
  target_role_notes: >
    只声称可作为 human-pending 的合格待玩候选；不声明审美或难度分数。
    当前 clean archive 只有两个正向人评锚点，没有 clean low-score/rejected 人评锚点。

solve_instance:
  id: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2
  title: Fixed P/L shadow pull v2
  player_start: [7, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ##########
    #...#....#
    #.#.GG#@.#
    ##..MC...#
    #L#.######
    #P#.SB.###
    ##########

mechanism_scope:
  central:
    - 固定 P/L：P 在 L 下方，y>=5 是 push side，y<=4 是 pull side；P/L 被墙隔离，不能移动。
    - 可动 B/S：玩家只能在下方 push side 从左侧推 B/S 一格，令 C 转黏并与 M 合并。
    - 左目标上方被墙封住；普通箱不能从上方单独拉到左目标。
    - 合并后的横向 sticky group 可从右目标上方被 pull，上移时同步覆盖左右目标。
  allowed_support:
    - 少量绕行用于从下方 push side 回到上方 pull side。
    - B/S 只需一格位移；第二阶段不再移动 B/S。
  incidental_allowed:
    - 返回解不是唯一输入序列。
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:push_pull

design_claim:
  player_insight: >
    固定 P/L 改变最终施力方向：玩家不能从下方推，只能在上方 pull。右目标上方可用，
    左目标上方被墙封住，因此普通箱不能逐个解决；必须先用 B/S 造出横向 sticky handle，
    再从右格拉动，把左侧影子格一起带上目标。
  causal_chain:
    - 起点和目标区在 pull side，底部 B/S 操作点在 push side。
    - 玩家进入底部 push side，从左推 B/S 一格，触发 anchor_boundary_shift:box_sticky。
    - C 进入 sticky side，触发 box_to_sticky 并与 M sticky_merge。
    - 玩家回到右目标上方，在 pull side 拉 sticky group；sticky 刚体上移覆盖两个目标。
  why_not_execution: >
    若只靠普通箱，右列箱可以被拉到右目标，但左列箱上方是墙，且下半区封锁，不能被单独拉入左目标。
    若没有固定 P/L 的 pull side，玩家可以从下方直接推，固定锚点就没有因果责任。
    因此本关同时消费固定 P/L 的方向约束与 B/S 产生的黏性刚体结构。
  falsification:
    - 若 P/L 在可达图中能移动，reject。
    - 若存在不经 pull、box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，reject。
    - 若普通箱替代版可解，reject。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2 --title "Fixed P/L shadow pull v2" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2_box_analog --title "Fixed P/L shadow pull v2 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2_layout.txt RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2 push_pull 400000 80 strong_material
  solver_result:
    found: true
    cost: 17
    depth: 17
    explored_states: 127
    inputs: up left left down left left down down down right left up up up right right up
  trace_summary:
    returned_trace_events:
      - push_object:box_sticky_anchor
      - anchor_boundary_shift:box_sticky
      - box_to_sticky:n1
      - sticky_merge:n1
      - pull_object:sticky#1
      - move_sticky_rigid
    key_snapshots:
      - step: 10
        input: right
        events: [push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1]
        before: |-
          ##########
          #...#....#
          #.#.GG#..#
          ##..MC...#
          #L#.######
          #P#@SB.###
          ##########
        after: |-
          ##########
          #...#....#
          #.#.GG#..#
          ##..MM...#
          #L#.######
          #P#.@SB###
          ##########
      - step: 17
        input: up
        events: [pull_object:sticky#1, move_sticky_rigid]
        before: |-
          ##########
          #...#....#
          #.#.G+#..#
          ##..MM...#
          #L#.######
          #P#..SB###
          ##########
        after: |-
          ##########
          #...#@...#
          #.#.mm#..#
          ##.......#
          #L#.######
          #P#..SB###
          ##########
  target_events:
    - K_runtime_smoke has no configured detector; fixed-anchor probe supplies required-event gates.
  object_or_instance_evidence:
    - Analyzer did not report instance-level object participation.
    - Claim is geometry/event-level, not per-object identity-level.
  winning_path_event_checks:
    fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2:
      combined_probe:
        found_bypass: false
        status: complete
        explored_states: 550
      individual_probes:
        movable_box_sticky_shift:
          found_bypass: false
          status: complete
          explored_states: 393
        fixed_push_pull_effect:
          found_bypass: false
          status: complete
          explored_states: 393
        material_normalization:
          found_bypass: false
          status: complete
          explored_states: 435
        box_to_sticky:
          found_bypass: false
          status: complete
          explored_states: 550
        sticky_merge:
          found_bypass: false
          status: complete
          explored_states: 393
        sticky_rigid_move:
          found_bypass: false
          status: complete
          explored_states: 432
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 393
    legal_transitions: 803
    winning_states: 21
    forbidden_reachable_scan:
      event: anchor_boundary_shift:push_pull
      status: complete
      forbidden_hits: none
      reachable_states: 393
      legal_transitions: 803
  graph_or_counterfactual_evidence:
    ordinary_box_analog:
      layout: |-
        ##########
        #...#....#
        #.#.GG#@.#
        ##..CC...#
        #L#.######
        #P#....###
        ##########
      solver_found: false
      search_status: complete
      graph_status: complete
      reachable_states: 226
      legal_transitions: 458
      winning_states: 0
      interpretation: >
        在相同固定 P/L 分区与墙形下，去掉 B/S 与 sticky 材料后，两个普通箱无法覆盖双目标。
        该反事实只支持这个具体普通箱替代版无解，不扩展为所有普通箱重设计均无解。
  evidence_limits:
    - 不声明唯一输入序列。
    - 不声明对象实例级全胜路身份连续性。
    - 工具证据只能支持玩家洞见的结构前提，不能单独证明玩家一定会这样理解。
    - 不声明审美或难度分数。

diagnostic_routing:
  hard_evidence:
    - 检查 P/L 是否确实 fixed：reachable scan complete 且无 anchor_boundary_shift:push_pull。
    - 检查六个 required groups 是否完整无 winning bypass。
    - 检查普通箱替代版是否完整无解。
  mechanism_scope:
    - 两锚点同关；P/L 固定，B/S 可动。
  claim_hygiene:
    - 若 reviewer 认为 ordinary-box analog 只证明局部反事实，packet 已限制为具体替代版。
  taste_probes:
    - 攻击本关是否过于线性或太像执行教程。
    - 攻击固定 P/L 是否玩家侧可读，还是只在规则层改变 push/pull 标签。
    - 攻击黏性刚体是否真正作为必要结构被读出。
  scc_graph:
    - 图很小，forced viable/optimal prefix 高；critic 只能将其转译为“过渡关线性度”，不能把 graph complete 当审美 merit。
  variant_family:
    - fresh_required；不是 archive variant。
  start_position:
    - 起点在上方 pull side，先看到双目标、上方墙和可达右目标。
  prototype_specific_work:
    - no design_handoff.yml found.

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
    本候选不是 RA_CAND_0001/0002 的布局修补或因果链延展；它采用固定 P/L 的上下 push/pull
    分区和一次 B/S 材料制造窗口，核心是“pull from accessible right target carries blocked left target”。

attempt_log:
  serious_structural_attempts:
    - v1: same family, but ordinary-box analog remained solvable through lower-space box rerouting.
    - v2: lower region compressed; ordinary-box analog now complete unsolved.
  local_repairs:
    - 收紧 row4/row5，保留 B/S 一格推送和返回上方路径，删除普通箱下方重编排空间。
  abandoned_families:
    - earlier fixed-anchor transition candidates rejected by user because sticky substitution was not structural.

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      archive_eligibility: clean_archive
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
        综合质量较高的好关。
      relevance: >
        正向锚点：机制耦合与玩家视角矛盾。不可复用其双锚高难结构。
    - candidate_id: RA_CAND_0002
      human_reviewed: true
      archive_eligibility: clean_archive
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: >
        对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
        具有较强洞见。
      relevance: >
        正向锚点：黏性移动改变玩家对推拉关系的假设。不可复用其 soft handoff。
  lower_bound_or_negative_anchors: negative_anchor_none_found
  none_found_reason: >
    当前 clean archive 只有两个 human-reviewed accepted entries，没有 clean low-score/rejected 人评锚点。
    critic 不得输出分数化审美或难度结论。

claim_last_review:
  mode: not_used
  facts_packet: not_applicable
  claim_packet: not_applicable
  read_order: not_applicable
```
