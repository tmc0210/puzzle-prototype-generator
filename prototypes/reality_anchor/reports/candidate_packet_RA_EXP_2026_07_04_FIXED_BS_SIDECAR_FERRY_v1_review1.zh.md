# Candidate Packet: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1 / review_1

```yaml
prototype_context:
  prototype: reality_anchor
  confirmed_rules:
    - P/L 是推拉锚点；P 侧为 push world，L 侧为 pull world。
    - B/S 是箱黏锚点；B 侧为 box world，S 侧为 sticky world。
    - 箱进入 sticky world 后触发 box_to_sticky；相邻 sticky 会 sticky_merge。
    - sticky group 是刚体，任一格受力移动时整组平移，任一目标格受阻则整组动作失败。
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
    中期过渡关：两个锚点同时出现，其中 B/S 固定在墙腔中，P/L 可移动。难度低于终局高难，
    但必须满足用户新判据：黏箱转化不能只是最优解事件或省步数；若换成普通箱只是多推几步，
    则不合格。

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
  id: RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1
  title: Fixed B/S sidecar ferry v1
  player_start: [2, 5]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  layout: |-
    ###########
    #####SB####
    ####GG#####
    ####M.C...#
    #...#.....#
    #.@PL.....#
    ###########

mechanism_scope:
  central:
    - 固定 B/S：S 在 x=5、B 在 x=6，sticky side 为 x<=5，box side 为 x>=6；B/S 被墙与目标室封住。
    - P/L 初始在底部，玩家必须连续右推 P/L，把目标区下方与 C 操作点变成 push side。
    - 左目标下方的 M 是侧挂影子格：其下方是墙，目标室上方被墙封住，普通箱无法对它直接向上施力。
    - C 从右侧 box side 被推入 x=5 sticky side 后 box_to_sticky，并与 M sticky_merge。
    - 最终玩家只能从右侧把手格下方上推 sticky group；左侧影子格随刚体一起上移覆盖左目标。
  allowed_support:
    - 开局连续推 P/L 是低难过渡动作，用于明确 movable P/L 改变可施力区域。
    - 少量走位用于从 P/L 位置到 C 右侧、再回到把手格下方。
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
    关键读法是“侧挂影子格没有自己的施力面”。左目标下的 M 不能像普通箱那样被玩家从下方推上去，
    也不能从上方拉上去；它只有在与右侧可接触把手格合并为 sticky 刚体后，才会被把手格带上目标。
  causal_chain:
    - 玩家先移动 P/L，让右侧操作区与最终把手格下方成为 push side。
    - 固定 B/S 保持材料边界不动：C 在 x=6 是 box，推到 x=5 后变 sticky。
    - C 变 sticky 后与左侧 M 合并，形成横向二格刚体。
    - 左格没有普通箱可用的向上施力面；右格有玩家可站的下方把手位。
    - 玩家从右格下方上推 sticky group，两个目标同时由刚体覆盖。
  why_not_execution: >
    本候选不是“黏块省走路”。两个普通箱的初始替代版完整无解；从合并后局面直接把 sticky group
    替换成两个普通箱的 post-merge analog 也完整无解。失败点集中在左箱没有向上施力面，
    不是多走几步或多推几下能解决。
  falsification:
    - 若 B/S 在可达图中可移动，reject。
    - 若存在不移动 P/L 的胜路，reject。
    - 若存在不经 box_to_sticky、sticky_merge 或 move_sticky_rigid 的胜路，reject。
    - 若普通箱初始替代版或 post-merge 普通箱替代版可解，reject 或 structural_revision。
    - 若 critic 认为玩家仍可把黏性读成省步数而非侧挂不可施力结构，structural_revision。

evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1 --title "Fixed B/S sidecar ferry v1" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_box_analog --title "Fixed B/S sidecar ferry v1 box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_postmerge_box_analog_layout.txt --id RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_postmerge_box_analog --title "Fixed B/S sidecar ferry v1 postmerge box analog" --role challenge --support none --targets K_runtime_smoke --max-states 400000 --graph-max-states 400000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_fixed_anchor_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1_layout.txt RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1 box_sticky 400000 200 strong_material_no_pull
  solver_result:
    found: true
    cost: 11
    depth: 11
    explored_states: 167
    inputs: right right right right up right up left down left up
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
      - step: 4
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
      - step: 8
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
      - step: 11
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
    fixed_anchor_probe_RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v1:
      combined_probe:
        found_bypass: false
        status: complete
        explored_states: 2224
      individual_probes:
        movable_push_pull_shift:
          found_bypass: false
          status: complete
          explored_states: 1916
        fixed_box_sticky_effect:
          found_bypass: false
          status: complete
          explored_states: 2125
        box_to_sticky:
          found_bypass: false
          status: complete
          explored_states: 2125
        sticky_merge:
          found_bypass: false
          status: complete
          explored_states: 1916
        sticky_rigid_move:
          found_bypass: false
          status: complete
          explored_states: 2224
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 1916
    legal_transitions: 4827
    winning_states: 126
    forbidden_reachable_scan:
      event: anchor_boundary_shift:box_sticky
      status: complete
      forbidden_hits: none
      reachable_states: 1916
      legal_transitions: 4827
  graph_or_counterfactual_evidence:
    ordinary_box_analog:
      layout: |-
        ###########
        ###########
        ####GG#####
        ####C.C...#
        #...#.....#
        #.@PL.....#
        ###########
      solver_found: false
      search_status: complete
      graph_status: complete
      reachable_states: 1910
      legal_transitions: 4815
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
        即便从“已经形成横向二格结构、P/L 已移到可推位置”的局部状态开始，只把 sticky group 换成两个普通箱也无解。
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
    - 不要求 pull event；本候选使用 movable P/L 改变 push side，而非拉动收束。
  claim_hygiene:
    - 不把 graph complete 写成质量 merit。
    - 不把 analog 过度声明为所有普通箱重设计均无解。
  taste_probes:
    - 重点攻击玩家是否会读出“侧挂影子格无施力面”，还是只沿着强制路径执行。
    - 重点攻击开局连续四次推 P/L 是否太脚本化；若只是操作税，需要 structural_revision。
    - 攻击固定 B/S 是否仍有可读存在感，还是只是隐藏区域标签。
  scc_graph:
    - graph complete, reachable_states=1916, winning_states=126。
    - forced viable prefix length=3，开局 P/L 推动有脚本化风险；critic 应转译为玩家侧 caveat，而不是证据 pass。
  variant_family:
    - fresh_required；不继承归档正例或旧失败候选。
  start_position:
    - 起点在 P/L 左侧，首先强制体验 P/L 移动改变 push side；目标室和侧挂格在上方可见。
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
    本候选不沿用 RA_CAND_0001/0002 的解法骨架或对象角色：它采用固定 B/S、可动 P/L、封顶目标室和侧挂不可施力结构，
    目标是回应最近“普通箱多推几步”失败模式。

attempt_log:
  serious_structural_attempts:
    - v1: first serious sidecar-ferry candidate; original layout solvable, two ordinary-box analogs complete unsolved.
  local_repairs:
    - 暂无；v1 证据已支持进入 review_1。
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
