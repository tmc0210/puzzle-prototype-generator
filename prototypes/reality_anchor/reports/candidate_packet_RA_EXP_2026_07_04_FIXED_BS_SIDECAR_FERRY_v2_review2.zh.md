# Candidate Packet: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2 / review_2

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点；P 侧为 push world，L 侧为 pull world。
    - B/S 是箱黏锚点；B 侧为 box world，S 侧为 sticky world。
    - 箱进入 sticky world 后触发 box_to_sticky；相邻 sticky 会 sticky_merge。
    - sticky group 是刚体，受力时整组平移。
    - 胜利条件是所有目标被箱、黏块或锚点格覆盖；玩家站在目标上不计覆盖。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - P/L: movable push-pull anchor
    - B/S: fixed box-sticky anchor in a wall chamber
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
    中期过渡关：两个锚点同时出现，其中 B/S 固定，P/L 可移动。目标是比终局高难更短，
    但满足用户新判据：普通箱替代不能只是多推几步。
  human_feedback_constraint: >
    最近用户打回了“最优解发生黏箱转化，但换成普通箱只是多推两步”的候选。本候选必须把普通箱替代
    阻断为结构事实，而不是只靠事件名或最优路径。

mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid

design_target:
  aesthetic_score_target: unscored_missing_negative_archive_anchor
  difficulty_score_target: unscored_missing_negative_archive_anchor
  score_claim_allowed: false
  target_role_notes: >
    只声称可作为 human-pending 的待玩候选；不声明审美或难度分数。当前 clean archive 只有正向人评锚点，
    没有 clean low-score/rejected 人评锚点。

solve_instance:
  id: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2
  title: Fixed B/S sidecar ferry v2
  player_start: [5, 5]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ###########
    #####SB####
    ####GG#####
    ####M.C...#
    #...#.....#
    #....@PL..#
    ###########

mechanism_scope:
  central:
    - 固定 B/S 位于目标室上方，S 在 x=5、B 在 x=6；C 从 x=6 box side 左推到 x=5 sticky side 时转黏。
    - P/L 只需右推一次：把 x=7 及目标下方操作点切换到 push side，避免 v1 的四次同向搬运。
    - 左目标下方的 M 是侧挂影子格：下方为墙，目标上方封死；普通箱没有向上施力面。
    - C 转黏后与 M 合并为横向二格 sticky group；右格是可接触把手，左格是被携带的影子格。
    - 最终玩家从右格下方上推 sticky group，两个目标同时覆盖。
  allowed_support:
    - P/L 一次右推作为区域切换提示。
    - 少量走位用于到 C 右侧、再回到把手下方。
  incidental_allowed:
    - 不声明唯一输入序列。
    - 不声明对象实例级身份在所有胜路中连续可追踪。
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - box_to_sticky
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - anchor_boundary_shift:box_sticky

design_claim:
  player_insight: >
    玩家需要读出侧挂 M 没有自己的向上施力面；P/L 的一次位移只是让玩家能从右格下方 push。
    真正解决左目标的是 C 经固定 B/S 边界转黏并与 M 合并后，右侧把手格携带左侧影子格上移。
  causal_chain:
    - 玩家右推 P/L 一格，让目标下方和 C 操作点处于 push side。
    - 玩家移动到 C 右侧，左推 C 跨过固定 B/S 的 x=6/x=5 材料边界。
    - C 触发 box_to_sticky，并与 M sticky_merge 成横向刚体。
    - 玩家回到右格下方，上推 sticky group；左格由于刚体关系同步覆盖左目标。
  why_not_execution: >
    本候选的普通箱替代不是多操作可解：初始普通箱替代完整无解，且 post-merge 局部替代也完整无解。
    阻断原因是左箱没有向上施力面，只有黏性刚体能由右格受力携带它上移。
  falsification:
    - 若 B/S 在可达图中可移动，reject。
    - 若存在不移动 P/L 的胜路，reject。
    - 若存在不经 box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，reject。
    - 若普通箱初始替代版或 post-merge 普通箱替代版可解，reject。
    - 若 critic 认为 P/L 一次位移或固定 B/S 仍完全不可读，structural_revision 或 downgrade。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2 --title "Fixed B/S sidecar ferry v2" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_box_analog --title "Fixed B/S sidecar ferry v2 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_postmerge_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_postmerge_box_analog --title "Fixed B/S sidecar ferry v2 postmerge box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2_layout.txt RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2 box_sticky 400000 200 strong_material_no_pull
  solver_result:
    found: true
    cost: 8
    depth: 8
    explored_states: 149
    inputs: right up right up left down left up
  trace_summary:
    returned_trace_events:
      - push_object:push_pull_anchor
      - anchor_boundary_shift:push_pull
      - push_object:crate#1
      - box_to_sticky:n1
      - sticky_merge:n1
      - push_object:sticky#1
      - move_sticky_rigid
    key_snapshots:
      - step: 1
        input: right
        events: [push_object:push_pull_anchor, anchor_boundary_shift:push_pull]
        before: |-
          ###########
          #####SB####
          ####GG#####
          ####M.C...#
          #...#.....#
          #....@PL..#
          ###########
        after: |-
          ###########
          #####SB####
          ####GG#####
          ####M.C...#
          #...#.....#
          #.....@PL.#
          ###########
      - step: 5
        input: left
        events: [push_object:crate#1, box_to_sticky:n1, sticky_merge:n1]
        before: |-
          ###########
          #####SB####
          ####GG#####
          ####M.C@..#
          #...#.....#
          #......PL.#
          ###########
        after: |-
          ###########
          #####SB####
          ####GG#####
          ####MM@...#
          #...#.....#
          #......PL.#
          ###########
      - step: 8
        input: up
        events: [push_object:sticky#1, move_sticky_rigid]
        before: |-
          ###########
          #####SB####
          ####GG#####
          ####MM....#
          #...#@....#
          #......PL.#
          ###########
        after: |-
          ###########
          #####SB####
          ####mm#####
          ####.@....#
          #...#.....#
          #......PL.#
          ###########
  target_events:
    - K_runtime_smoke has no configured detector; fixed-anchor probe supplies required-event gates.
  object_or_instance_evidence:
    - Analyzer did not report instance-level object participation.
    - Claim is geometry/event-level, not per-object identity-level.
  winning_path_event_checks:
    fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v2:
      combined_probe:
        found_bypass: false
        status: complete
        explored_states: 2249
      individual_probes:
        movable_push_pull_shift:
          found_bypass: false
          status: complete
          explored_states: 1941
        fixed_box_sticky_effect:
          found_bypass: false
          status: complete
          explored_states: 2107
        box_to_sticky:
          found_bypass: false
          status: complete
          explored_states: 2107
        sticky_merge:
          found_bypass: false
          status: complete
          explored_states: 1898
        sticky_rigid_move:
          found_bypass: false
          status: complete
          explored_states: 2206
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 1898
    legal_transitions: 4784
    winning_states: 126
    forbidden_reachable_scan:
      event: anchor_boundary_shift:box_sticky
      status: complete
      forbidden_hits: none
      reachable_states: 1898
      legal_transitions: 4784
  graph_or_counterfactual_evidence:
    ordinary_box_analog:
      layout: |-
        ###########
        ###########
        ####GG#####
        ####C.C...#
        #...#.....#
        #....@PL..#
        ###########
      solver_found: false
      search_status: complete
      graph_status: complete
      reachable_states: 1892
      legal_transitions: 4772
      winning_states: 0
      interpretation: >
        去掉 B/S 与 sticky，把 M/C 替换为两个普通箱并保留 P/L 与墙形后完整无解；左箱没有向上施力面。
    postmerge_box_analog:
      layout: |-
        ###########
        ###########
        ####GG#####
        ####CC@...#
        #...#.....#
        #......PL.#
        ###########
      solver_found: false
      search_status: complete
      graph_status: complete
      reachable_states: 234
      legal_transitions: 616
      winning_states: 0
      interpretation: >
        从“已经形成横向二格结构、P/L 已移到可推位置”的局部状态开始，只把 sticky group 换成两个普通箱也无解。
        这直接攻击“只是多推几步”的替代路线。
  evidence_limits:
    - 不声明唯一输入序列。
    - 不声明对象实例级所有胜路身份连续性。
    - 不声明审美或难度分数。
    - 普通箱反事实覆盖本候选的同墙形替代和 post-merge 替代，不扩展为所有可能重设计都无解。
    - 工具证据只能支持玩家洞见的结构前提；玩家是否自然读出侧挂不可施力仍需 critic / human playtest。

diagnostic_routing:
  hard_evidence:
    - 检查 fixed B/S 是否由完整 reachable scan 排除 anchor_boundary_shift:box_sticky。
    - 检查 winning-path probes 是否完整证明 P/L shift、box_to_sticky、sticky_merge、sticky rigid move 全部无 bypass。
    - 检查普通箱初始 analog 与 post-merge analog 是否完整无解。
  mechanism_scope:
    - 两锚点同关；B/S 固定，P/L 可移动。
    - 不要求 pull event；本候选使用 movable P/L 改变 push side。
  claim_hygiene:
    - 不把 graph complete 写成质量 merit。
    - 不把 analog 过度声明为所有普通箱重设计均无解。
  taste_probes:
    - 攻击玩家是否仍可能只沿局部唯一动作执行。
    - 攻击 P/L 一次右推是否足够成为机制动作，而非残留脚本开关。
    - 攻击固定 B/S 是否足够可读：S/B 与 C 的跨界位置同列，但 B/S 仍被墙腔固定。
  scc_graph:
    - graph complete, reachable_states=1898, winning_states=126。
    - v2 forced viable prefix length=0，opening commitments=4 viable=4；相比 v1 的连续强制 P/L 推动，脚本化风险降低。
    - returned solution handoff scripted=1/3, maxRun=1。
  variant_family:
    - v1 structural_revision；不是 archive variant。
  start_position:
    - 起点紧邻 P/L，只需一次右推即可进入核心空间；目标室、固定 B/S、M/C 转换窗口同屏可见。
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
  candidate_relation: fresh_family_revision_from_v1
  why_not_archive_variant: >
    本候选不沿用 RA_CAND_0001/0002 的解法骨架或对象角色。v2 只修订本轮 fresh family 的 v1，
    以回应 review_1 critic 的 structural_revision。

attempt_log:
  serious_structural_attempts:
    - v1: hard evidence passed, but critic rejected for four-step P/L operation tax and weak player-side fixed B/S role.
    - v2: P/L shift reduced to one step; same sidecar sticky structure retained; analogs remain complete unsolved.
  local_repairs:
    - 将 player/P/L 起点右移，使 P/L 从四次右推变为一次右推。
    - 保持 C 在 B side x=6、目标/把手窗口在 S side x=5，让固定 B/S 边界更贴近核心转换。
  abandoned_families:
    - STICKY_SHADOW_HANDLE / FIXED_PL_SHADOW_PULL: 用户反馈指出黏性只省步数，不作为必要结构。

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
        正向锚点：机制耦合与玩家视角矛盾。不可复用其双锚高难布局或因果链。
    - candidate_id: RA_CAND_0002
      human_reviewed: true
      archive_eligibility: clean_archive
      aesthetic_score: 4
      difficulty_score: 4
      human_comment: >
        对关卡中要素有充分利用，使用拉动黏块打破了“推拉锚点只能被单向移动”的假设，
        具有较强洞见。
      relevance: >
        正向锚点：黏性移动改变玩家假设。不可复用其 soft handoff 解法骨架。
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
