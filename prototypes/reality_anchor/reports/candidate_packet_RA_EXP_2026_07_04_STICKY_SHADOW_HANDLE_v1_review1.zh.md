# Candidate Packet: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1 / review_1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点；P 侧为推世界，L 侧为拉世界；本候选不使用 P/L。
    - B/S 是箱黏锚点；B 侧为箱世界，S 侧为黏世界。
    - 黏块是四邻接刚体；相邻黏块自动合并。
    - 箱进入黏世界会 box_to_sticky；黏格整体移动时以 sticky rigid body 结算。
    - 任意刚体任一部分被墙或不可移动结构挡住时，整个动作失败且状态不变。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - G/g: target / covered target
    - C: box
    - M/m: sticky cell / sticky cell covering target
    - B/S: movable box-sticky anchor
    - '#': wall
  tool_boundary:
    - runtime adapter、solver、layout analyzer、graph/agency analyzer 可用。
    - PuzzleScript exporter/checker 不可用。

slot_brief:
  intended_role: low_to_mid_transition_challenge
  known_before:
    - K_runtime_smoke
  target:
    - K_runtime_smoke
    - structural_sticky_necessity_after_user_feedback
  difficulty_or_support_expectation: >
    难度低于终局高难候选，作为“真正需要黏性结构”的中期过渡关。只引入 B/S，
    不要求同时使用 P/L，目标是证明黏块不是省步数，而是普通箱无法替代的结构。

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
    人类归档校准目前只有两个 clean positive anchors，没有低分或失败 clean archive anchor。
    本轮不声明分数，只要求 reviewer/critic 判断是否达到“可提交给人类游玩/归档判断”的候选质量。

solve_instance:
  id: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1
  title: Sticky shadow handle v1
  player_start: [7, 2]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ##########
    #........#
    #.#.G.#@.#
    #...MC...#
    #...#....#
    #...SB...#
    ##########

mechanism_scope:
  central:
    - 玩家只能从右侧接触外侧把手格；目标列附近的 wall-side cell 无法作为普通箱直接推到目标。
    - B/S 横推两次后，C 在黏区变为 M，并与左侧 M 合并，形成横向黏性刚体。
    - 最后玩家推右侧可接触的把手格上移，左侧 wall-side sticky cell 被刚体带到目标上。
  allowed_support:
    - B/S anchor 本身作为材料边界控制器和移动障碍。
    - 走位空间只服务于读出可接触把手格。
  incidental_allowed:
    - 最短解中存在非核心走位。
  required_winning_path_events:
    - anchor_boundary_shift:box_sticky
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    黏块不是省步数，而是“墙后影子格”的搬运结构：玩家只能接触外侧把手格，
    但目标需要由被墙挡住的另一格覆盖。普通箱只能移动被直接施力的那一格；
    黏块刚体会把墙后格一起带走。
  causal_chain:
    - 固定局部墙形让左侧目标列不能由玩家直接从下方处理。
    - 玩家先把右侧普通箱横推入黏区，使它与左侧 M 相邻。
    - box_to_sticky 后立即 sticky_merge，生成横向二格黏块。
    - 玩家从右侧把手格上推黏块，左侧格同步上移并覆盖目标。
  why_not_execution: >
    如果没有黏性合并，玩家可以移动外侧普通箱，但墙后那一格不能由同一个上推动作携带到目标。
    本关要求理解“先合并成刚体，再从可接触格搬运不可接触格”的状态消费。
  falsification:
    - 若存在不经过 sticky_merge 的胜路，reject 或 redesign。
    - 若存在不经过 move_sticky_rigid 的胜路，reject 或 redesign。
    - 若普通箱替代版可解，说明黏块仍只是省步数或装饰，应 reject。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_layout.txt --id RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1 --title "Sticky shadow handle v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_box_analog_layout.txt --id RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_box_analog --title "Sticky shadow handle v1 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_layout.txt RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_deep 1200000 80 'material_normalization=box_to_sticky|sticky_to_box' 'sticky_merge=sticky_merge' 'sticky_rigid_move=move_sticky_rigid'
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
          #.#.G.#..#
          #...MC...#
          #...#....#
          #..@SB...#
          ##########
        after: |-
          ##########
          #........#
          #.#.G.#..#
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
          #.#.G.#..#
          #...MM...#
          #...#@...#
          #.....SB.#
          ##########
        after: |-
          ##########
          #........#
          #.#.mM#..#
          #....@...#
          #...#....#
          #.....SB.#
          ##########
  target_events:
    - K_runtime_smoke has no configured detector; trace and graph evidence are used instead.
  object_or_instance_evidence:
    - Analyzer did not report instance-level object participation.
    - Claim is event/structure-level, not per-object identity-level.
  winning_path_event_checks:
    event_probe_RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v1_deep:
      combined_probe:
        found_bypass: false
        status: complete
        explored_states: 446305
        reason: no winning bypass found
      individual_probes:
        material_normalization:
          found_bypass: false
          status: complete
          explored_states: 177035
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
    winning_states: 7619
  graph_or_counterfactual_evidence:
    ordinary_box_analog:
      layout: |-
        ##########
        #........#
        #.#.G.#@.#
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
        将 B/S 与 sticky material 替换成普通箱/no B-S 后无解。该反事实直接攻击
        “黏块只是省几步”的失败模式。
  evidence_limits:
    - 不声明唯一输入序列。
    - 不声明具体对象实例在所有胜路中的身份连续性。
    - 不声明审美或难度分数。

diagnostic_routing:
  hard_evidence:
    - 检查 packet 是否足以支持 sticky_merge、material normalization、sticky rigid movement 为全胜路必经。
    - 检查 ordinary-box analog 的完整无解是否能支持“普通箱不可替代”。
  mechanism_scope:
    - 单 B/S 过渡关；不要求 P/L。
  claim_hygiene:
    - 若 reviewer 认为“墙后影子格”仍只是 designer framing 而非工具证据支持，要求 revise_claim 或 structural_revision。
  taste_probes:
    - 攻击玩家是否真的需要读出“可接触把手搬运不可接触格”，还是仅沿 affordance 推两次再上推。
  scc_graph:
    - Analyzer SCC 只有单初始 SCC 到 win/end，不能把该事实当作审美 merit。
  variant_family:
    - fresh_required；不能作为 archive variant。
  start_position:
    - 起点在右上，避免立即接触目标侧。
  prototype_specific_work:
    - no design_handoff.yml found; no prototype-specific workflow declared.

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
    本候选不是 RA_CAND_0001/0002 的布局修补或对象角色延展；它降为单 B/S 结构，
    核心因果是 wall-side sticky cell 由外侧 handle 刚体搬运，且使用普通箱反事实无解作为硬门槛。

attempt_log:
  serious_structural_attempts:
    - STICKY_SHADOW_HANDLE_v0 design claim
    - STICKY_SHADOW_HANDLE_v1 verified layout
    - ordinary-box analog complete unsolved counterfactual
  local_repairs:
    - none_before_review_1
  abandoned_families:
    - previous fixed-anchor transition candidates rejected by human feedback because sticky substitution was not structural.

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
        正向锚点：机制耦合和玩家视角矛盾。不可复用其双锚结构或上方把手布局。
    - candidate_id: RA_CAND_0002
      human_reviewed: true
      archive_eligibility: clean_archive
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: >
        对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
        具有较强洞见。
      relevance: >
        正向锚点：黏块必须改变玩家对锚点/运动关系的假设。不可复用其 P/L soft handoff。
  lower_bound_or_negative_anchors: negative_anchor_none_found
  none_found_reason: >
    当前 clean archive 仅有两个 human-reviewed accepted entries，未发现 clean low-score、
    rejected 或人类明确不满意的归档条目。critic 不得输出分数化审美/难度结论。

claim_last_review:
  mode: not_used
  facts_packet: not_applicable
  claim_packet: not_applicable
  read_order: not_applicable
```
