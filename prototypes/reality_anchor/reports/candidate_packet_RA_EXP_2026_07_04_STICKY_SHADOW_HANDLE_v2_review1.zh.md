# Candidate Packet: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2 / review_1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - B/S 是箱黏锚点；B 侧为箱世界，S 侧为黏世界。
    - 箱进入黏世界会 box_to_sticky；黏块四邻接自动 sticky_merge。
    - 黏块作为刚体移动，任一格受阻则整个动作失败。
    - 胜利条件是所有目标被箱、黏块或锚点箱格覆盖；玩家站上目标不算覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - C: box
    - M/m: sticky cell / sticky cell covering target
    - B/S: box-sticky anchor
    - G/g: target / covered target
    - '#': wall
  tool_boundary:
    - runtime adapter、solver、layout analyzer、graph/agency analyzer 和 event probe 可用。
    - PuzzleScript exporter/checker 不可用。

slot_brief:
  intended_role: low_to_mid_transition_challenge
  known_before:
    - K_runtime_smoke
  target:
    - K_runtime_smoke
    - structural_sticky_necessity_after_user_feedback
  difficulty_or_support_expectation: >
    难度低于终局双锚候选，作为中期过渡关：只使用 B/S，但要明确表现黏块不是省步数，
    而是普通箱无法替代的横向刚体搬运。

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_human_archive_context
  difficulty_score_target: unscored_missing_human_archive_context
  score_claim_allowed: false
  target_role_notes: >
    目标是合格待玩候选，不声明审美或难度分数。当前 clean archive 只有正向人评锚点，
    缺少 clean negative / lower-bound anchor。

solve_instance:
  id: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2
  title: Sticky shadow handle v2
  player_start: [7, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ##########
    #........#
    #.#.GG#@.#
    #...MC...#
    #...#....#
    #...SB...#
    ##########

mechanism_scope:
  central:
    - 双目标并排放在上方，右目标在可接触列上方，左目标在墙侧列上方。
    - 玩家可以理解普通箱能处理右列，但左目标下方有墙阻隔，不能由普通箱从下方直接推上去。
    - C 必须先经 B/S 转黏并与 M 合并，形成二格横向 sticky handle。
    - 最后从右列上推，右格作为 handle，左格作为 shadow cell 一起覆盖目标。
  allowed_support:
    - B/S 位移同时提供材料边界和通路打开。
    - 少量走位用于从起点绕到 B/S 左侧和 sticky handle 下方。
  incidental_allowed:
    - 返回解不是唯一输入序列。
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    并排双目标使“把手格会携带墙侧影子格”成为玩家需要读出的关系：普通箱局部看似能覆盖右目标，
    但左目标只有在横向黏性刚体整体上移时才会被覆盖。
  causal_chain:
    - 玩家看到 C 位于右目标下方，可推性提示普通箱只能处理右列。
    - 左目标下方被墙阻隔，普通箱无法从下方直接进入左目标。
    - 横推 B/S 让 C 进入黏区并与 M 合并。
    - 合并后的横向 sticky 刚体由右格受力，上推时两个目标同时覆盖。
  why_not_execution: >
    相比 v1 单目标，本版不只是“把唯一物体推上去”。右目标提供普通箱局部解读，左目标要求玩家
    预判 sticky rigid body 的横向携带效果；没有合并黏块，普通箱替代版完整无解。
  falsification:
    - 若存在不经 box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，reject。
    - 若普通箱替代版可解，reject。
    - 若 reviewer/critic 认为并排双目标仍不足以让玩家侧读出黏性刚体差异，继续 structural_revision。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_layout.txt --id RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2 --title "Sticky shadow handle v2" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_box_analog_layout.txt --id RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_box_analog --title "Sticky shadow handle v2 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_layout.txt RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_core4 1200000 80 'box_sticky_anchor_shift=anchor_boundary_shift:box_sticky' 'box_to_sticky=box_to_sticky' 'sticky_merge=sticky_merge' 'sticky_rigid_move=move_sticky_rigid'
  solver_result:
    found: true
    cost: 13
    depth: 13
    explored_states: 1019
    inputs: up left left down left left down down down right right up up
  trace_summary:
    returned_trace_events:
      - push_object:box_sticky_anchor
      - anchor_boundary_shift:box_sticky
      - box_to_sticky:n1
      - sticky_merge:n1
      - push_object:box_sticky_anchor
      - anchor_boundary_shift:box_sticky
      - push_object:sticky#1
      - move_sticky_rigid
    key_snapshots:
      - step: 10
        input: right
        events: [push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1]
        before: |-
          ##########
          #........#
          #.#.GG#..#
          #...MC...#
          #...#....#
          #..@SB...#
          ##########
        after: |-
          ##########
          #........#
          #.#.GG#..#
          #...MM...#
          #...#....#
          #...@SB..#
          ##########
      - step: 13
        input: up
        events: [push_object:sticky#1, move_sticky_rigid]
        before: |-
          ##########
          #........#
          #.#.GG#..#
          #...MM...#
          #...#@...#
          #.....SB.#
          ##########
        after: |-
          ##########
          #........#
          #.#.mm#..#
          #....@...#
          #...#....#
          #.....SB.#
          ##########
  target_events:
    - K_runtime_smoke has no configured detector; event probes supply required-event gates.
  object_or_instance_evidence:
    - No instance-level object participation was reported.
    - Claim is event/geometry-level, not identity-level.
  winning_path_event_checks:
    event_probe_RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2_core4:
      combined_probe:
        found_bypass: false
        status: complete
        explored_states: 571931
      individual_probes:
        box_sticky_anchor_shift:
          found_bypass: false
          status: complete
          explored_states: 147369
        box_to_sticky:
          found_bypass: false
          status: complete
          explored_states: 216968
        sticky_merge:
          found_bypass: false
          status: complete
          explored_states: 248051
        sticky_rigid_move:
          found_bypass: false
          status: complete
          explored_states: 207744
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 130884
    legal_transitions: 376968
    winning_states: 231
  graph_or_counterfactual_evidence:
    ordinary_box_analog:
      layout: |-
        ##########
        #........#
        #.#.GG#@.#
        #...CC...#
        #...#....#
        #........#
        ##########
      solver_found: false
      graph_status: complete
      reachable_states: 20740
      legal_transitions: 60730
      winning_states: 0
      interpretation: >
        将 B/S 与 sticky material 替换为普通箱/no B-S 后完整无解；右列普通箱局部可被读为可推，
        但普通箱无法携带左列覆盖并排目标。
  evidence_limits:
    - 不声明唯一输入序列。
    - 不声明对象实例级所有胜路身份连续性。
    - 不声明审美或难度分数。

diagnostic_routing:
  hard_evidence:
    - 检查 core4 event probe 是否支持四个 claimed core events 均为全胜路必经。
    - 检查 ordinary-box analog 是否支持普通箱不可替代。
  mechanism_scope:
    - 单 B/S 过渡关；不要求 P/L。
  claim_hygiene:
    - 若 reviewer 认为“玩家可见对照”缺工具证据，只把它交给 critic 作玩家侧判断，不当作硬证据。
  taste_probes:
    - 攻击并排双目标是否足以修复 v1 的“线性执行”问题。
    - 攻击空间是否仍冗余，以及 B/S 第二次右推是否只是通路打开。
  scc_graph:
    - SCC/agency facts 仅作中性图事实，不作为审美 merit。
  variant_family:
    - v1 structural_revision；不是 clean archive variant。
  start_position:
    - 起点在右上，玩家可先观察并排目标与 C/M 关系。
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
    本候选沿 STICKY_SHADOW_HANDLE fresh family 修订，不继承 RA_CAND_0001/0002 的双锚因果链或布局骨架。

attempt_log:
  serious_structural_attempts:
    - v1: single-target shadow handle; evidence mostly passed but critic required structural_revision for weak player-side read.
    - v2: paired-target shadow handle; exact event probes added and ordinary-box analog kept unsolved.
  local_repairs:
    - 增加并排双目标，让普通箱局部覆盖右列与 sticky 刚体覆盖双列形成可见对照。
    - 补跑 box_to_sticky 与 box_sticky_anchor_shift 单独全胜路 event probe。
  abandoned_families:
    - prior fixed-anchor transition candidates rejected by user because sticky substitution was not structural.

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
      relevance: positive anchor for coupling/player-facing conflict only.
    - candidate_id: RA_CAND_0002
      human_reviewed: true
      archive_eligibility: clean_archive
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: >
        对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
        具有较强洞见。
      relevance: positive anchor for sticky movement changing player assumptions only.
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
