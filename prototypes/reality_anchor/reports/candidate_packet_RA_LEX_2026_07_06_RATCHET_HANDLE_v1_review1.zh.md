# Candidate Packet: RA_LEX_2026_07_06_RATCHET_HANDLE_v1 / review1

```yaml
prototype_context:
  confirmed_rules:
    - "P/L 是可移动二格推拉锚点；P 侧为 push world，L 侧为 pull world。"
    - "没有 B/S 时全图默认 box world；本关不使用 B/S 或黏块。"
    - "锚点只平移不旋转；任一半格被墙、边界、物体或玩家目标位挡住时，整个动作失败且状态不变。"
    - "拉世界中，玩家前方必须为空；身后一格若有物体，则该物体被拉向玩家移动方向。"
    - "所有目标必须由箱、黏块或锚点覆盖；玩家站在目标上不算。"
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    push_pull_anchor: "P/L 二连锚点；移动发出 anchor_boundary_shift:push_pull，可由 push_object 或 pull_object 触发。"
    crate: "普通箱；本关唯一箱子必须通过 pull_object:crate#1 拉上右目标。"
  tool_boundary: "solver/analyzer/probe 只提供可执行语义证据，不授予审美或难度通过。"

slot_brief:
  intended_role: "Reality Anchor 中后段 P/L 应用候选；要求至少常规流程难度，审美至少可用下界，追求更高。"
  known_before: ["P/L push/pull side", "P/L 可移动", "目标由物体覆盖胜利"]
  target: "玩家先用 P/L 长轴棘轮对齐下推孔位，再用横向墙格门下推 P/L 覆盖左目标；之后穿过 pull-side 门位时被迫再拉动 P/L，并拉箱覆盖右目标。"
  difficulty_or_support_expectation: "目标为 difficulty >= 3、aesthetic >= 3 的 proposal candidate；最终数值仍需 human playtest。"

mechanic_exposure_context:
  mechanic_window: "P/L-only；不暴露 B/S、box_to_sticky、sticky_to_box、sticky_merge 或 sticky rigid movement。"
  allowed_exposure_through: all_current_push_pull_runtime_rules
  claimed_core_events:
    - anchor_boundary_shift:push_pull
    - push_object:push_pull_anchor
    - pull_object:push_pull_anchor
    - pull_object:crate#1

design_target:
  aesthetic_score_target: "3+；追求 compact causal chain，而非路线长度。"
  difficulty_score_target: "3+；目标是常规流程以上的 P/L 应用，不是 witness。"
  target_role_notes:
    - "比 RA_CAND_0010 式简单 P/L timing 更强：P/L 要完成两格长轴容量判断、下推孔位、以及终局前被 pull-side 再拉一格。"
    - "避免 RA_CAND_0006 式用目标位置硬化和长腾挪增难；本关 shortest cost 10，核心事件密度较高。"

solve_instance:
  layout: |
    ############
    #.....######
    #.@PL......#
    #####.G.G###
    #######.C###
    ############
  player_start: [2, 2]
  goals:
    - [6, 3]
    - [8, 3]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - "P/L 初始在上层横廊；第一、二步需要沿长轴右推两格，才让 P/L 的 P 半格对齐上方站位孔、下方 P/L 双目标孔。"
    - "第三个关键 P/L 位移是向下移动：只有下推后，P/L 才能覆盖左目标，并打开通向右目标的下层通道。"
    - "玩家从左目标门位走向右目标时处在 pull side；从 [7,3] 走到 [8,3] 会强制拉动 P/L 右移一格，使 P 半格继续覆盖左目标，同时让玩家站到右目标上。"
    - "最后玩家从右目标上向上移动，拉动下方 crate#1 到右目标；该 crate pull 是所有胜路必需。"
  allowed_support:
    - "允许在小房间内换位；不声明唯一输入序列。"
    - "允许 P/L 向下移动由 push 或 pull 触发；核心声明是方向和职责，不是具体施力侧唯一。"
  incidental_allowed:
    - "非最短路线可在 P/L 和 crate 之间做额外换位；不把 walk count 当难度。"
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - pull_object:crate#1
  required_winning_path_event_counts:
    anchor_boundary_shift:push_pull: ">= 3"
    pull_object:crate#1: ">= 1"
  required_directional_facts:
    right_any: "所有胜路至少一次 P/L 向右位移，事件可为 push_object:push_pull_anchor 或 pull_object:push_pull_anchor。"
    down_any: "所有胜路至少一次 P/L 向下位移，事件可为 push_object:push_pull_anchor 或 pull_object:push_pull_anchor。"
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight:
    - "玩家要读出 P/L 长轴不是普通二格箱搬运：两格右推是为了对齐下推孔，而不是直接盖目标。"
    - "下推孔位来自 P/L 横向墙格门：P/L 两半格的下方必须同时开放，初始/一格右推时都没有正确孔位。"
    - "右目标不是普通走过去填箱；玩家站到右目标的动作会在 pull side 把 P/L 再拉右一格，保持左目标覆盖后才允许拉箱收束。"
  causal_chain:
    - "step 1 right: push P/L right once; long-axis capacity consumed but still not aligned."
    - "step 2 right: push P/L right again; P/L aligns with top stand cell and lower two-cell gate."
    - "step 5 down: push P/L down through the gate; left target covered by L half and right-side passage opens."
    - "step 9 right: while crossing into the right target cell, pull P/L right; P half now keeps the left target covered."
    - "step 10 up: pull crate#1 from below into the right target."
  why_not_execution:
    - "Event-count probe proves fewer than three P/L boundary shifts cannot win."
    - "Directional OR probe proves every win needs some P/L right movement and some P/L down movement."
    - "Exact event-count probe proves every win needs pull_object:crate#1."
    - "Target deletion shows the two goals constrain different halves: removing left/P-L target releases a no-down route; removing right/crate target releases a short P/L-only route."
  falsification:
    - "If a win exists with no P/L right movement, no P/L down movement, fewer than three P/L shifts, or no pull_object:crate#1, central claim fails."
    - "If critic judges the two right pushes as obvious corridor execution rather than capacity reading, downgrade difficulty/role fit."

evidence:
  commands_run:
    - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_layout.txt --id RA_LEX_2026_07_06_RATCHET_HANDLE_v1 --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write"
    - "npx tsx prototypes/reality_anchor/reports/probe_pl_direction_any.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_layout.txt RA_LEX_2026_07_06_RATCHET_HANDLE_v1_dir_any 500000 120 \"right_any=push_object:push_pull_anchor|pull_object:push_pull_anchor:1:0\" \"down_any=push_object:push_pull_anchor|pull_object:push_pull_anchor:0:1\""
    - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_layout.txt RA_LEX_2026_07_06_RATCHET_HANDLE_v1_shift_count3 anchor_boundary_shift:push_pull 3 500000 120"
    - "npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_layout.txt RA_LEX_2026_07_06_RATCHET_HANDLE_v1_crate_pull_count \"pull_object:crate#1\" 1 500000 120"
    - "Goal deletion variants: no_anchor_goal and no_crate_goal layout analyses plus directional probes."
  solver_result:
    found: true
    cost: 10
    explored_states: 124
    graph_status: complete
    reachable_states: 754
    legal_transitions: 1878
    winning_states: 36
  trace_summary:
    inputs: "right right up right down right right down right up"
    events:
      - push_object:push_pull_anchor
      - anchor_boundary_shift:push_pull
      - push_object:push_pull_anchor
      - anchor_boundary_shift:push_pull
      - push_object:push_pull_anchor
      - anchor_boundary_shift:push_pull
      - pull_object:push_pull_anchor
      - anchor_boundary_shift:push_pull
      - pull_object:crate#1
    key_snapshots:
      - "step 1 right: P/L 右移一格。"
      - "step 2 right: P/L 第二次右移，对齐横向下推门。"
      - "step 5 down: P/L 下移，左目标由 L 半格覆盖。"
      - "step 9 right: 玩家进入右目标时拉动 P/L 右移，P 半格继续覆盖左目标。"
      - "step 10 up: 玩家从右目标向上，拉 crate#1 到右目标并获胜。"
  winning_path_event_checks:
    pl_direction_any:
      ref: "prototypes/reality_anchor/reports/pl_direction_any_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_dir_any.md"
      result: "combined and individual complete/no bypass for right_any and down_any."
    shift_count:
      ref: "prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_shift_count3_anchor_boundary_shift_push_pull_min3.md"
      result: "complete/no win below three anchor_boundary_shift:push_pull events."
    crate_pull_count:
      ref: "prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_crate_pull_count_pull_object_crate_1_min1.md"
      result: "complete/no win below one pull_object:crate#1 event."
  target_events:
    target_deletion:
      no_anchor_goal:
        layout: "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_anchor_goal_layout.txt"
        analysis_ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_anchor_goal.md"
        result: "cost drops 10 -> 8; directional probe finds a winning route missing down_any."
        direction_ref: "prototypes/reality_anchor/reports/pl_direction_any_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_anchor_goal_dir_any.md"
      no_crate_goal:
        layout: "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal_layout.txt"
        analysis_ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal.md"
        result: "shortest cost drops 10 -> 5; right/crate target removal makes crate pull unnecessary in the shortest route, and directional probe also finds a no-P/L route via repeated crate pulls."
        direction_ref: "prototypes/reality_anchor/reports/pl_direction_any_probe_RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal_dir_any.md"
  object_or_instance_evidence:
    - "Exact event pattern pull_object:crate#1 is complete/no bypass; this is sufficient for the single-crate claim."
    - "No claim is made about unique terminal state or unique sequence."
  graph_or_counterfactual_evidence:
    graph:
      ref: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_RATCHET_HANDLE_v1.md"
      status: complete
      agency:
        compressed_regions: 77
        initial_commitments: 3
        initial_viable_commitments: 2
        initial_dead_commitments: 1
        scc_shape: "sccs=67, winSubgraph=branching_win_dag"
        solution_irreversible_steps: 5
        forced_win_prefix: "0/5"
        handoff_scriptiness: "scripted=3/5, maxRun=2"
  evidence_limits:
    - "不声明唯一解、唯一终局、全胜路具体施力侧、或每个 P/L shift 的固定顺序。"
    - "direction_any probe 是本轮补充脚本，语义只用于 P/L 坐标方向 OR 条件；脚本本身保存在 reports/probe_pl_direction_any.ts。"
    - "工具证据不能证明审美、难度或玩家实际洞见，只能支持机制前提。"

diagnostic_routing:
  hard_evidence:
    - "Evidence reviewer 请检查完整图、direction_any OR probe、shift count、crate pull count 是否支持当前窄化 claim。"
    - "请注意：packet 不声明 down 必须由 push 触发，也不声明所有胜路都按 returned trace 顺序执行。"
  mechanism_scope:
    - "本关是 P/L-only；B/S 与黏块相关事件不属于 claimed scope。"
  claim_hygiene:
    - "不得把 target deletion 的短路解释成质量优点；它只说明两个目标各自约束不同半链。"
  taste_probes:
    - "critic 请攻击：两次开局右推是否只是显然通道执行，而非真正长轴容量读法。"
    - "critic 请攻击：step 9 被迫拉 P/L 右移是否形成重读 payoff，还是只是走到目标时的自动副作用。"
    - "critic 请比较 RA_CAND_0010 的简单 P/L timing 下界与 RA_CAND_0011 的紧凑强逻辑正例。"
  scc_graph:
    - "graph complete；SCC/agency 只作 evidence，不作审美 pass。"
  variant_family:
    - "fresh_required；不得视为 archive candidate 的变体。"
  start_position:
    - "起点左侧；没有 alternative starts claim。"
  prototype_specific_work:
    - "invalid_goal_prune triggered because two targets exist; deletion variants checked and both targets retained."

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
    - "布局骨架、对象角色与求解路线不是任何 clean archive candidate 的局部修改。"
    - "本关直接由 mechanism_lab lexicon 的 P/L 长轴墙廊棘轮与 P/L 横向把手墙格门组合实例化。"

attempt_log:
  serious_structural_attempts:
    - "v1a：4 步单目标骨架，仅证明长轴右移后下推孔位可行；废弃为 witness。"
    - "v1b：加入右侧箱目标，但上排绕行导致不要求长轴右推；封顶修补。"
    - "v1c：封顶后右侧箱无反向站位，改为竖向 pull crate。"
    - "v1d：单格长轴版本 cost 7，偏 witness；改为两格长轴容量。"
    - "v1e：上层目标被 P/L 长轴直接覆盖，改为双下层目标。"
  local_repairs:
    - "把所有目标移到下层，避免 P/L 仅靠原行长轴移动盖目标。"
    - "增加下层 crate target，使 P/L 下移后还需 pull-side 穿越和 crate pull。"
  abandoned_families:
    - "本轮未继续 BAR_DOUBLE_CUT / B/S 双切旧报告家族。"

archive_taste_context:
  score_claim_allowed: true
  examples:
    - id: RA_CAND_0011
      human_reviewed: true
      role: positive_anchor_for_compact_p_l_logic
      human_scores: "审美 4 / 难度 4"
      human_comment_summary: "箱子需要先推进目标再拉出，形成反直觉洞见；小空间紧凑强逻辑。"
    - id: RA_CAND_0010
      human_reviewed: true
      role: lower_bound_for_movable_p_l_timing
      human_scores: "审美 3 / 难度 2"
      human_comment_summary: "结构简单、逻辑清晰；早期 P/L timing 可用下界，不是高难目标。"
    - id: RA_CAND_0006
      human_reviewed: true
      role: negative_anchor_for_difficulty_inflation
      human_scores: "审美 2 / 难度 5"
      human_comment_summary: "小目标改动造成高腾挪难度但削弱机制美感；作为负例。"
    - id: RA_CAND_0004
      human_reviewed: true
      role: positive_anchor_with_decoupling_caveat
      human_scores: "审美 4 / 难度 3"
      human_comment_summary: "下方推拉与黏块腾挪有趣；但上方顺序与下方顺序弱耦合，适合作为难度 3 正向但有 caveat 的校准。"
  none_found_reason: null

claim_last_review:
  mode: not_used
  facts_packet: null
  claim_packet: null
  read_order: not_applicable
```

