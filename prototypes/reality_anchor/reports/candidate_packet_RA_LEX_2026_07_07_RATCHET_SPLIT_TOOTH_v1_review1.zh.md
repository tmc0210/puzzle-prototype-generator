# Candidate Packet: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1 / review_1

```yaml
prototype_context:
  confirmed_rules:
    - P/L anchor 定义推侧 / 拉侧；P/L 是可移动的 1x2 刚体，也可以参与 force-chain。
    - B/S anchor 定义 box side / sticky side；物体跨过固定或移动边界后会在合法移动结算时规范化材质。
    - Sticky cells 以正交连接形成刚体；被边界转换后可以 split 成独立部件。
    - 胜利条件为所有目标被 crate、sticky block 或 anchor 覆盖；玩家站在目标上不计胜利。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - push_object:push_pull_anchor 表示 P/L 被推动。
    - anchor_boundary_shift:push_pull 表示 P/L 边界移动。
    - force_chain 表示推力通过相邻对象链传递。
    - move_sticky_rigid 表示 sticky 连通块作为刚体移动。
    - sticky_to_box 表示 sticky 穿过 B/S 边界后转为 crate。
    - sticky_split 表示 sticky 连通块被转换 / 切割后分裂。
  tool_boundary:
    - Runtime adapter、solver、graph、agency、layout analyzer 和本地 probe 可用。
    - tool-maturity 显示 PuzzleScript exporter 不可用。

slot_brief:
  intended_role: challenge / lexicon-composition application
  known_before:
    - K_runtime_smoke
  target:
    - 新设计，提交合格候选。
    - 难度至少 3，追求更高。
    - 审美强 3 保底，追求 4 到 5。
    - 本轮测试 designer 使用 mechanism_lab/lexicon.md 的设计语料能力；不要使用同目录 runs 内容。
  difficulty_or_support_expectation: challenge 难度 3+；若 reviewer 认为玩家侧洞见强，可校准到 4 档附近。

mechanic_exposure_context:
  mechanic_window: full current Reality Anchor runtime
  allowed_exposure_through:
    - K_runtime_smoke
  claimed_core_events:
    - push_object:push_pull_anchor
    - anchor_boundary_shift:push_pull
    - force_chain
    - move_sticky_rigid
    - sticky_to_box
    - sticky_split

design_target:
  aesthetic_score_target: human-calibrated strong 3 floor; 4 only if critic accepts ratchet-driver split-tooth chain as meaningful.
  difficulty_score_target: 3+ floor; pursuit of 4 through multi-stage causal responsibility, not route tax.
  target_role_notes: >
    单目标紧凑 challenge。核心不是覆盖多个目标，而是把 P/L 从“可盖目标的 anchor”重读为
    “长轴棘轮推杆”，再把 C 形 sticky 切成可被上方墙齿消费的独立端点。

solve_instance:
  id: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1
  title: Ratchet split tooth v1
  layout: |-
    ##########
    ###G##...#
    ##..MMLP@#
    #...M....#
    #...MM####
    #.BS######
    ##########
  player_start: [8, 2]
  win_condition: all_targets_covered_by_objects

mechanism_scope:
  central:
    - P/L 必须先被下移与侧移，作为长轴推杆进入 sticky C-shape 的右侧。
    - P/L 的 force-chain 连续推动 C 形 sticky；第二次左推跨过固定 B/S，触发 sticky_to_box 与 sticky_split。
    - 切出的上端点随后被 P/L 从下方 force-chain 推入上方墙齿目标。
    - 上方 `G##` 墙齿阻止 P/L 自身直接覆盖目标，迫使玩家消费被切出的单格端点。
  allowed_support:
    - 开局与中后段走位 / stance 调整。
    - 固定 B/S 自身不移动；它作为切割边界存在。
    - 单目标结构允许目标删除检查跳过，但不允许把目标消费声明扩展成多目标互锁。
  incidental_allowed:
    - 非核心 walk。
    - 初始 SCC 内的可逆观察与少量死亡 commitment。
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - force_chain
    - move_sticky_rigid
    - sticky_to_box
    - sticky_split
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere: []

design_claim:
  player_insight: >
    P/L 不是直接拿来盖目标的 anchor，而是需要先被调整成有限行程的长轴推杆。玩家要读出：
    连续左推 C 形 sticky 穿过固定 B/S 会把它切成 crate 桥与独立上端点；而上方墙齿只接受这个
    单格端点，P/L 的 2-cell footprint 不能替代它。
  causal_chain:
    - 先通过开局 walk 读出上方墙齿与 P/L / sticky 的相对关系。
    - 下推 P/L，给 P/L 进入下方推杆轨道。
    - 横向预位移 P/L，让它抵住 C 形 sticky 的右侧。
    - 第一次左推通过 force-chain 将 C 形 sticky 作为刚体整体左移。
    - 第二次左推跨过固定 B/S，发生 sticky_to_box 与 sticky_split，产生独立上端点。
    - 玩家绕到下方 / 左侧 stance。
    - 最后上推 P/L，通过 force-chain 把独立上端点推入 `G##` 墙齿目标。
  why_not_execution: >
    证据显示任意胜解都至少需要 5 次 P/L 边界位移、3 次 sticky rigid movement，并且必须发生
    sticky_to_box 与 sticky_split。玩家不能只执行最近 affordance 或把 P/L 推到目标上；墙齿目标要求
    先制造并保存独立端点，再用 P/L 作为推杆消费它。初始 SCC 有 21 states、4 个外出 commitment，
    其中 2 个 win out、2 个 dead out；forced commitment / viable / optimal prefix 均为 0，所以开局
    有观察与选择空间，而不是第一步单线脚本。
  falsification:
    - 存在不含 sticky_split 的胜解会否定断桥端点声明。
    - 存在不含 sticky_to_box 的胜解会否定固定 B/S 切割声明。
    - 存在少于 5 次 anchor_boundary_shift:push_pull 的胜解会削弱 P/L 长轴棘轮声明。
    - 存在少于 3 次 move_sticky_rigid 的胜解会削弱 sticky 刚体被多次运输 / 消费的声明。
    - 若 P/L 自身可直接覆盖目标，或上端点不需被送入墙齿，则候选应被 reject 或换 family。

evidence:
  commands_run:
    - npx tsx src/cli.ts tool-maturity prototypes/reality_anchor
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_layout.txt --id RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1 --title "Ratchet split tooth v1" --role challenge --support none --targets K_runtime_smoke --max-states 500000 --graph-max-states 500000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_layout.txt RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_core5 500000 80 "pl_shift=anchor_boundary_shift:push_pull" "force_chain=force_chain" "sticky_to_box=sticky_to_box" "sticky_split=sticky_split" "sticky_rigid_move=move_sticky_rigid"
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_layout.txt RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_pl_shift_min5 anchor_boundary_shift:push_pull 5 500000 80
    - npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_layout.txt RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_rigid_min3 move_sticky_rigid 3 500000 80
  solver_result:
    found: true
    cost: 11
    depth: 11
    inputs: up left down right down left left left down left up
    event_counts:
      walk: 6
      push_object:push_pull_anchor: 5
      anchor_boundary_shift:push_pull: 5
      force_chain:n2: 3
      move_sticky_rigid: 3
      sticky_to_box:n3: 1
      sticky_split:n1: 1
  trace_summary:
    - step_3: P/L 被下推，完成第一次 P/L 边界位移。
    - step_6: P/L 被左推到 C 形 sticky 右侧。
    - step_7: P/L force-chain 推动 C 形 sticky 刚体左移。
    - step_8: 第二次 force-chain 左推跨过固定 B/S，触发 sticky_to_box:n3 与 sticky_split:n1。
    - step_11: P/L 从下方 force-chain 推动独立上端点进入墙齿目标。
  target_events:
    K_runtime_smoke:
      detector_configured: false
      returned_solution_covers_detector: true
  object_or_instance_evidence:
    returned_trace_object_participation: analyzer did not report instance-level object participation
    interpretation: 只主张事件族与状态消费，不主张具体 object id 全解唯一性。
  winning_path_event_checks:
    core5_probe:
      report: prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_core5.md
      status: complete
      combined_missing_core_bypass: false
      individual_missing_bypass:
        pl_shift: false
        force_chain: false
        sticky_to_box: false
        sticky_split: false
        sticky_rigid_move: false
    pl_shift_min5_probe:
      report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_pl_shift_min5_anchor_boundary_shift_push_pull_min5.md
      status: complete
      found_bypass_below_count: false
    rigid_min3_probe:
      report: prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_rigid_min3_move_sticky_rigid_min3.md
      status: complete
      found_bypass_below_count: false
  reachable_event_exposure:
    full_graph_status: complete
    reachable_states: 359
    legal_transitions: 919
    winning_states: 2
  graph_or_counterfactual_evidence:
    main_graph:
      report: prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1.md
      status: complete
      reachable_states: 359
      legal_transitions: 919
      winning_states: 2
      initial_region:
        states: 7
        commitments: 4
        viable_commitments: 3
        dead_commitments: 1
        optimal_commitments: 2
      initial_scc:
        states: 21
        out: 4
        win_out: 2
        dead_out: 2
      forced_prefix:
        commitment: 0
        viable: 0
        optimal: 0
      win_subgraph: branching_win_dag
      handoff_scriptiness:
        scripted: 2/4
        forced_scripted: 1
        reading: middle two left pushes are near-scripted; opening and final handoff have reposition room.
    target_prune:
      status: skipped_single_target
      reason: 候选只有一个目标；删除该目标会使胜利条件退化，不能作为有意义的目标剪枝。
    redundant_element_review:
      status: targeted_manual_clean
      retained_elements:
        - top-right three cells provide opening observation / P/L approach and keep start from being immediate object-push-only.
        - center-left C-shape cavity defines the sticky rigid footprint and B/S cut line.
        - lower-left B/S pocket is fixed boundary material, not player route padding.
      known_abandoned_variant: >
        双目标 RATCHET_SPLIT_BRIDGE_v1 被目标删除反事实淘汰；桥目标删除后成本和核心事件基本不变，
        因此最终版本移除桥目标。
  evidence_limits:
    - 不主张唯一输入序列。
    - 不主张具体 object instance 在所有胜解中的身份唯一。
    - 不把 complete graph 当作质量 verdict；它只支持可解性、事件门和 SCC 读法。
    - 未读取 mechanism_lab/runs 内容；本轮语料只来自 lexicon.md 与正式 archive taste anchors。

diagnostic_routing:
  hard_evidence:
    status: done
    items:
      - explain-layout complete graph
      - core5 missing-event bypass probe
      - P/L shift minimum count probe
      - sticky rigid movement minimum count probe
  mechanism_scope:
    status: done
    reviewer_focus:
      - required events are event-family claims, not object-instance uniqueness claims.
      - fixed B/S is support boundary; movable core is P/L push-driver plus sticky split endpoint.
  claim_hygiene:
    status: done
    caveats:
      - no unique-route claim
      - no all-order claim beyond tested event gates
      - no multi-target dependency claim
  taste_probes:
    - 单目标是否足够有结构美，还是像 witness。
    - 中段连续左推是否是合理的“读出棘轮动作”，还是机械重复。
    - 上方墙齿消费是否足以把 P/L 推杆、fixed B/S 切割、sticky endpoint 三者强耦合。
  scc_graph:
    status: triggered
    graph_fact: complete graph, initial SCC states=21 / out=4 / winOut=2 / deadOut=2; forced prefixes all 0; handoff scriptiness 2/4.
    neutral_meaning: 开局有可逆观察和多条承诺；中段两个左推较集中；终局仍有 stance 调整。
    player_facing_interpretation: 候选不像强教学 witness 那样从第一步开始脚本化，但核心切割动作一旦进入会形成短的执行链。
  variant_family:
    status: not_routed
    reason: fresh lexicon composition, not archive variant work.
  start_position:
    status: checked_lightly
    evidence: first two returned inputs are walk; first-step legal space belongs to initial SCC, forced prefix 0.
  prototype_specific_work:
    invalid_goal_prune:
      status: skipped_single_target
    redundant_element_prune:
      status: targeted_manual_clean
      note: 已淘汰冗余桥目标近邻；最终单目标 layout 未保留明显二目标 padding。

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
    Archive 只用于 human-reviewed taste calibration。候选的几何骨架、对象角色和因果链来自 lexicon.md
    的语料组合，而不是继承某个 archive candidate。

attempt_log:
  serious_structural_attempts:
    - RATCHET_SPLIT_BRIDGE_v1: 双目标版本；反事实发现桥目标冗余，淘汰。
    - RATCHET_SPLIT_TOOTH_v1: 删除桥目标，强化单目标墙齿消费。
  local_repairs:
    - 将固定 B/S 断桥 witness 扩展为由 P/L 长轴推杆驱动，而非玩家直接推 sticky。
    - 用 `G##` 墙齿限制目标消费者为单格端点，而非 P/L 自身。
  abandoned_families:
    - 直接保留桥目标的双目标版本。

archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      scores: aesthetic 4 / difficulty 4
      human_comment: 机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，综合质量较高的好关。
      relevance: 正向校准“多机制强耦合”和玩家侧明显矛盾。
    - candidate_id: RA_CAND_0005
      scores: aesthetic 4 / difficulty 4
      human_comment: 玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。
      relevance: 正向校准跨系统触达与三格链构造的洞见密度。
    - candidate_id: RA_CAND_0016
      scores: aesthetic 3 / difficulty 2
      human_comment: 强引导的黏块合并再切割教学。
      relevance: 下界校准：清楚但偏引导的 B/S timing 只能作为强 3 审美底线附近参考。
    - candidate_id: RA_CAND_0006
      scores: aesthetic 2 / difficulty 5
      human_comment: 小目标位置改动极大地弱化机制美感并增加腾挪难度，较差反例。
      relevance: 负向校准：避免用腾挪复杂度冒充机制美感。

claim_last_review:
  mode: not_used
```

## 设计语料使用记录

- `P/L 长轴墙廊 / L 端余量棘轮`：转化为需要 5 次 P/L shift 的推杆预位移与终端送货。
- `固定 B/S 断桥：sticky split 端点目标袋`：保留固定 B/S 作为切割边界，要求所有胜解发生 `sticky_to_box` 与 `sticky_split`。
- `刚体黏块 + 墙口 / 前沿墙齿目标口`：把被切出的单格端点送入上方 `G##` 齿口，排除 P/L 自身盖目标。
- `B/S 绑定债 / 固定边界切割`：用于衔接“先作为 sticky 刚体运输、后被固定边界切成可消费端点”的逻辑。

## 相关证据文件

- `prototypes/reality_anchor/reports/design_claim_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1.zh.md`
- `prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1.md`
- `prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_core5.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_pl_shift_min5_anchor_boundary_shift_push_pull_min5.md`
- `prototypes/reality_anchor/reports/event_count_probe_RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v1_rigid_min3_move_sticky_rigid_min3.md`
