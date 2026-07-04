# Candidate Packet: RA_EXP_2026_07_04_CROSS_LATCH_v1 review_1

```yaml
review_iteration: review_1
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v1
review_input_type: candidate_version
prototype: reality_anchor
packet_status: ready_for_independent_review
revision_source:
  previous_candidate: null
  fresh_claim: fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
  selected_candidate_claim: design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v1.zh.md
```

## Prototype Context

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是可移动二格推拉锚点；P 侧按 push 处理，L 侧按 pull 处理。
    - B/S 是可移动二格箱/黏锚点；B 侧为 box world，S 侧为 sticky world；同关最多一个。
    - 箱跨入 sticky side 会转 sticky，sticky 跨入 box side 会转 crate。
    - 黏格在 sticky side 四邻接合并为刚体。
    - 目标必须由 crate、sticky block 或 anchor cell 覆盖；玩家站在目标上不计。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - anchor_boundary_shift: 锚点发生平移，事件带 push_pull 或 box_sticky 类型后缀。
    - pull_object: pull-side 输入拉动身后一格对象。
    - box_to_sticky / sticky_to_box: B/S 边界结算导致材料归一化。
    - sticky_merge: 相邻 sticky 结算成同一刚体。
    - move_sticky_rigid: 黏块作为刚体移动。
  tool_boundary:
    - runtime adapter / solver / layout analyzer / graph: implemented
    - raw sampler/search: structural material only, not quality verdict
    - curated miner / PuzzleScript exporter: unavailable
```

## Slot Brief

```yaml
slot_brief:
  intended_role: challenge
  known_before: [K_runtime_smoke]
  target: [K_runtime_smoke]
  difficulty_or_support_expectation: >
    用户要求继续 design review loop，并希望这一轮给出难度稍低的候选。本候选目标是
    紧凑、较低负担的后期 challenge：比高难长链更短，但仍要求两类锚点、材料改性、
    sticky merge 与 sticky rigid movement 同时参与。
mechanic_exposure_context:
  mechanic_window: all_current_reality_anchor_runtime_rules
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  claimed_core_events:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
design_target:
  aesthetic_score_target: unscored_missing_negative_human_archive_context
  difficulty_score_target: unscored_missing_negative_human_archive_context
  score_claim_allowed: false
  target_role_notes: >
    非分数化目标：稍低难度的双锚 cross-latch 候选。希望玩家能读到开局 P/L 改变
    pull 窗口，中段 B/S 改性与 merge，末段 B/S/材料共同收束；不追求开放规划型高难。
```

## Solve Instance

```yaml
solve_instance:
  player_start: [5, 1]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  push_pull_anchor:
    orientation: vertical
    cells: {P: [6, 1], L: [6, 2]}
  box_sticky_anchor:
    orientation: horizontal
    cells: {S: [3, 1], B: [4, 1]}
```

```text
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########
```

## Mechanism Scope

```yaml
mechanism_scope:
  central:
    - push_pull_anchor_shift
    - box_sticky_anchor_shift
    - pull_event
    - material_normalization
    - sticky_merge
    - sticky_rigid_move
  allowed_support:
    - force_chain
    - short-to-moderate repositioning walks
    - anchor target cover
  incidental_allowed: []
  required_winning_path_events:
    - anchor_boundary_shift:push_pull
    - anchor_boundary_shift:box_sticky
    - pull_object
    - box_to_sticky|sticky_to_box
    - sticky_merge
    - move_sticky_rigid
  forbidden_winning_path_events: []
  forbidden_if_seen_anywhere:
    - runtime_error
  not_claimed:
    - unique_input_sequence
    - object_instance_identity_across_all_wins
    - per-target object assignment across all wins
    - repeated mid/endgame P/L participation
```

## Design Claim

```yaml
design_claim:
  player_insight: >
    这是一个较短的 cross latch：P/L 不是末端得分块，而是第一步把右侧竖直锚点推开，
    改变玩家与右侧箱子的 pull 窗口。玩家随后把右侧箱子压入下方通道，再把左侧
    黏性材料拉过 B/S 的材料边界，形成可回收的 crate。中段 B/S 左推时，材料与锚点
    同场换位，触发 move_sticky_rigid 与 sticky_merge；最后 B/S 下拉完成左下目标覆盖。
  causal_chain:
    - P/L 开局右移，为右侧 pull 和回程站位打开空间。
    - 右侧 crate 被 pull / push 到下方走廊，使玩家能回到左侧材料区。
    - 左侧 sticky 被 pull 成 sticky_to_box，把刚性材料转成可回收 crate。
    - B/S 左推触发 box_sticky shift，并和材料状态共同触发 move_sticky_rigid / sticky_merge。
    - 玩家回到左侧拉 crate 覆盖上目标，最后下拉 B/S 收束下目标。
  why_not_execution: >
    完整图显示所有胜路都需要六个核心事件组，不能只靠任一锚点或直接箱推过关。
    开局 P/L、右侧 crate 处理、sticky_to_box、B/S merge 和最终 B/S 下拉分别改变后续
    可达/材料状态。弱点是路线较短、走位占比不低，因此目标定位为稍低难度 challenge。
  falsification:
    - 任一核心事件组存在胜路绕过。
    - 图不 complete，导致 all-solution 必要性未知。
    - critic 判断玩家可只按局部 affordance 执行，cross-latch 洞见不是必要读法。
    - P/L 被认为只是一次性 opener，role fit 不足以支撑候选。
```

## Evidence

```yaml
evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v1_layout.txt --id RA_EXP_2026_07_04_CROSS_LATCH_v1 --title "Cross latch v1" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v1_layout.txt RA_EXP_2026_07_04_CROSS_LATCH_v1 300000 80
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v1_layout.txt RA_EXP_2026_07_04_CROSS_LATCH_v1
  solver_result:
    found: true
    cost: 17
    depth: 17
    explored_states: 136
    inputs: right left down right up left down left right right up left left down left left down
    walk_steps: 8
    events: >
      push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk
      pull_object:crate#1 walk walk push_object:crate#1 walk
      pull_object:sticky#3 move_sticky_rigid sticky_to_box:n1
      pull_object:crate#1 walk walk push_object:box_sticky_anchor force_chain:n2
      anchor_boundary_shift:box_sticky move_sticky_rigid sticky_merge:n1 walk
      pull_object:crate#1 pull_object:crate#1 pull_object:box_sticky_anchor
      force_chain:n2 anchor_boundary_shift:box_sticky
  trace_summary:
    - step_1_right: P/L 被推到右侧，打开右侧 pull / 回程站位窗口。
    - step_7_down: 右侧 crate 被压入下方通道，参与左侧目标链。
    - step_9_right: 左侧 sticky 被 pull，触发 move_sticky_rigid 与 sticky_to_box。
    - step_13_left: B/S 被左推，触发 box_sticky shift、move_sticky_rigid 与 sticky_merge。
    - step_16_left: crate 被拉到上目标。
    - step_17_down: B/S 下拉并胜利。
  winning_path_event_checks:
    core6_combined_probe:
      status: complete
      found_bypass: false
      explored_states: 170
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_merge
        - sticky_rigid_move
    individual_probes:
      push_pull_anchor_shift: {status: complete, found_bypass: false, explored_states: 157}
      box_sticky_anchor_shift: {status: complete, found_bypass: false, explored_states: 141}
      pull_event: {status: complete, found_bypass: false, explored_states: 163}
      material_normalization: {status: complete, found_bypass: false, explored_states: 141}
      sticky_merge: {status: complete, found_bypass: false, explored_states: 141}
      sticky_rigid_move: {status: complete, found_bypass: false, explored_states: 141}
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 141
    legal_transitions: 266
    event_only_illegal_transitions: 0
    winning_states: 1
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 41
    winning_regions: 1
    solution_irreversible_path_steps: 8
    forced_win_prefix: 0/8
    win_subgraph_shape: branching_win_dag
    handoff_scriptiness: scripted=4/8, trivial=3, sameEntryExit=4, forcedScripted=3, maxRun=2
    initial_region: commitments=3, viable=2, dead=1, optimal=2
    counterfactuals: none_configured
  object_or_instance_evidence:
    instance_level_participation: not_reported_by_tool
    object_identity_claim: not_claimed
  evidence_limits:
    - All-solution gates are event-group gates, not exact route or object-identity gates.
    - Tool reports no instance-level participation; target-object assignment is not claimed across all wins.
    - SCC facts are routed for critic interpretation and are not quality verdicts.
    - Walk steps are 8/17; critic should attack whether this is acceptable for a lower-difficulty challenge.
```

## Key Snapshots

```text
Step 0
#########
#.MSB@P.#
#MGMC.L.#
#..G#..C#
#########

Step 1 after right: P/L opener
#########
#.MSB.@P#
#MGMC..L#
#..G#..C#
#########

Step 7 after down: right crate drops into lower lane
#########
#.MSB..P#
#MGM.@.L#
#..G#C.C#
#########

Step 9 after right: sticky_to_box creates returnable crate material
#########
#.MSB..P#
#MG.C@.L#
#..G#C.C#
#########

Step 13 after left: B/S shift plus sticky merge
#########
#MSB@..P#
#MG..C.L#
#..G#C.C#
#########

Step 16 after left: upper target covered
#########
#MSB...P#
#M+C...L#
#..G#C.C#
#########

Step 17 after down: B/S final latch, win
#########
#M.....P#
#MSB...L#
#.@*#C.C#
#########
```

## Diagnostic Routing

```yaml
diagnostic_routing:
  hard_evidence:
    - verify six all-solution core event gates
    - verify graph complete status
    - verify no claim of unique route or object identity
  mechanism_scope:
    - central events include both anchors, pull, material normalization, sticky_merge, sticky_rigid_move
  claim_hygiene:
    - score_claim_allowed: false
    - object identity not claimed
    - unique input sequence not claimed
    - P/L repeated mid/endgame role not claimed
  taste_probes:
    - attack whether P/L is too opener-only
    - attack whether 8/17 walk steps create padding despite low total cost
    - judge whether compact cross-latch is acceptable as lower-difficulty challenge
  scc_graph:
    - complete graph with 141 states, 1 winning state
    - branching_win_dag, forcedWinPrefix 0/8
    - handoff scriptiness scripted=4/8, maxRun=2
  variant_family:
    - fresh family after design_claim v0; not derived from clean archive candidate
  start_position:
    - fixed player_start from layout
  prototype_specific_work:
    - design_handoff.yml not present; no prototype-specific workflow declared
```

## Prototype Specific Contracts

```yaml
prototype_specific_contracts:
  interface_pair_policy:
    declared_interface_points: []
    target_pairs: []
    ignored_pair_classes: []
    risky_pair_classes: []
  pair_diagnostics:
    ignored_pairs: []
    risky_pairs: []
```

## Archive Lineage Policy

```yaml
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    本轮先写 fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0，再使用搜索脚本寻找服务该 claim
    的结构素材。RA_CAND_0001 只作为 human taste anchor；未复用其布局、目标关系、对象角色或因果链。
```

## Attempt Log

```yaml
attempt_log:
  serious_structural_attempts:
    - fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
    - search_soft_interlock_744001.md: solver-only, core bypass found
    - search_soft_interlock_744002.md: solver-only, push_pull bypass found
    - search_soft_interlock_744003.md: solver-only, box_sticky bypass found
    - search_phase_ferry_744102.md: low-cost six-event hit but P/L mostly terminal, not selected
    - search_soft_interlock_744011.md: v2 material with stronger cross but higher scripted tail
    - search_soft_interlock_744013.md: selected v1, cost 17, graph complete, core6 probe complete
  local_repairs:
    - none; v1 selected as direct candidate after full verification
  abandoned_families:
    - CROSS_LATCH_v2 held as stronger interlock / higher scriptiness alternative, not sent in review_1
```

## Archive Taste Context

```yaml
archive_taste_context:
  examples:
    - candidate_id: RA_CAND_0001
      human_reviewed: true
      archive_eligibility: clean_archive
      human_comment_id: HC_RA_CAND_0001_001
      human_scores:
        aesthetic_score: 4
        difficulty_score: 4
      human_comment: >
        机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
        综合质量较高的好关。
      use: positive_human_taste_anchor_only
      boundary: >
        只作口味参照；不授权复用布局、目标关系、对象角色或因果链。
  negative_anchor_none_found:
    reason: >
      Reality Anchor 当前 clean human-reviewed archive 只有 RA_CAND_0001 一个 accepted 正例，
      没有低分、失败或下界人评条目。critic 不得输出分数化审美/难度结论，
      只能给非分数结构判断。
```

## Claim Last Review

```yaml
claim_last_review:
  mode: not_used
  facts_packet: not_split
  claim_packet: not_split
  read_order: not_applicable
```

## Evidence Refs

```text
- prototypes/reality_anchor/reports/fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
- prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v1.zh.md
- prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v1_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_CROSS_LATCH_v1.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_CROSS_LATCH_v1.json
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_CROSS_LATCH_v1.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_CROSS_LATCH_v1.json
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_CROSS_LATCH_v1.md
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_CROSS_LATCH_v1.json
- prototypes/reality_anchor/design_archive/candidates/RA_CAND_0001.md
```

