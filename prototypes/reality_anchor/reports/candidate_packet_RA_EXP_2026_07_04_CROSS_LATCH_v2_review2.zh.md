# Candidate Packet: RA_EXP_2026_07_04_CROSS_LATCH_v2 review_2

```yaml
review_iteration: review_2
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v2
review_input_type: candidate_version
prototype: reality_anchor
packet_status: ready_for_independent_review
revision_source:
  previous_candidate: RA_EXP_2026_07_04_CROSS_LATCH_v1
  previous_evidence_review: evidence_review_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
  previous_critic: puzzle_critic_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
  designer_action: designer_action_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.zh.md
  structural_revision_reason: >
    v1 evidence passed but critic required structural_revision because P/L read as one-time opener,
    and cross-latch insight could collapse into local execution. v2 gives P/L mid/end positional debt.
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
    用户要求继续 design review loop，并希望这一轮给出难度稍低的候选。v2 目标是
    lower-burden challenge：不追求开放规划型高难，但要修复 v1 的 P/L opener-only
    问题，并保留双锚 + 材料改性 + sticky merge / rigid movement 的必要性。
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
    非分数化目标：较低负担但机制耦合明确的双锚候选。P/L 应在中后段承担可见位置债务，
    B/S 负责材料相位和横向搬运；critic 需要判断脚本化 caveat 是否仍可接受。
```

## Solve Instance

```yaml
solve_instance:
  player_start: [7, 1]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  push_pull_anchor:
    orientation: vertical
    cells: {P: [3, 1], L: [3, 2]}
  box_sticky_anchor:
    orientation: horizontal
    cells: {B: [5, 1], S: [6, 1]}
```

```text
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
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
    - high-open-planning difficulty
```

## Design Claim

```yaml
design_claim:
  player_insight: >
    v2 是对 v1 的结构修订：P/L 不再只是一次性 opener。玩家先推动 B/S，制造左侧材料
    merge；随后 B/S 的水平位移会把 P/L 一起带进左侧，形成一个位置债务。中段必须先
    利用这个被带走的 P/L / B/S 组合覆盖或打开上方目标区，再把 B/S 下拉、把 P/L 下拉，
    才能为底部 crate 的最后材料转换留出通道。
  causal_chain:
    - 第 1 步推动 B/S，触发 box_to_sticky 与 sticky_merge，先把右侧 crate 变成可被移动的 sticky 材料。
    - 第 4 步拉动 sticky 刚体，把材料债务放到右侧下方，为后续目标覆盖准备。
    - 第 8-9 步继续推 B/S；force chain 把 P/L 一起横移，触发两类 anchor shift，并改变上方目标区锚点形态。
    - 第 13-14 步先拉 P/L/B/S 组合，再下拉 B/S，分离横向搬运后的双锚位置债务。
    - 第 16 步再下拉 P/L，打开底部横向 pull 通道。
    - 第 17-19 步拉底部 crate 到目标上并触发 box_to_sticky，完成最终收束。
  why_not_execution: >
    v2 不是只把 P/L 当开门按钮：P/L 在第 8、9、13、16 步均改变局面，
    而 B/S 的横向推进会同步移动 P/L，使两个锚点的位置债务必须在中后段偿还。
    完整 event gate 支持六个核心事件组不可绕过，但玩家侧质量仍需 critic 判断；
    本 claim 不把工具证据当审美证明。
  falsification:
    - 任一核心事件组存在胜路绕过。
    - 图不 complete，导致 all-solution 必要性未知。
    - critic 判断中后段 P/L 债务仍不构成玩家侧洞见，只是脚本化短链。
    - 走位/脚本块使 lower-burden challenge 退化成局部执行。
```

## Evidence

```yaml
evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v2_layout.txt --id RA_EXP_2026_07_04_CROSS_LATCH_v2 --title "Cross latch v2" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v2_layout.txt RA_EXP_2026_07_04_CROSS_LATCH_v2 300000 80
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v2_layout.txt RA_EXP_2026_07_04_CROSS_LATCH_v2
  solver_result:
    found: true
    cost: 19
    depth: 19
    explored_states: 231
    inputs: left down down right up up left left left down left left right down left down right right right
    walk_steps: 9
    events: >
      push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n2
      sticky_merge:n1 walk walk pull_object:sticky#1 move_sticky_rigid walk walk walk
      push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:push_pull
      anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2
      anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky walk walk walk
      pull_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull
      anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
      walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1
      pull_object:crate#1 pull_object:crate#1 box_to_sticky:n1
  trace_summary:
    - step_1_left: B/S 左推，触发 box_to_sticky 与 sticky_merge，创建右侧 sticky 材料债务。
    - step_4_right: 拉 sticky，触发 move_sticky_rigid，把材料债务移到右侧下方。
    - step_8_left: 推 B/S 并通过 force_chain 移动 P/L，双锚同时 shift。
    - step_9_left: 再次推 B/S/P-L 联动，P/L 被带到左侧目标区。
    - step_13_right: pull P/L，同时通过 force_chain 联动 B/S，两类 anchor shift 同步发生。
    - step_14_down: pull B/S 下移，重设材料边界。
    - step_16_down: pull P/L 下移，打开底部 crate 的横向 pull 通道。
    - step_19_right: 底部 crate 转 sticky 并胜利。
  winning_path_event_checks:
    core6_combined_probe:
      status: complete
      found_bypass: false
      explored_states: 279
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_merge
        - sticky_rigid_move
    individual_probes:
      push_pull_anchor_shift: {status: complete, found_bypass: false, explored_states: 238}
      box_sticky_anchor_shift: {status: complete, found_bypass: false, explored_states: 238}
      pull_event: {status: complete, found_bypass: false, explored_states: 238}
      material_normalization: {status: complete, found_bypass: false, explored_states: 238}
      sticky_merge: {status: complete, found_bypass: false, explored_states: 238}
      sticky_rigid_move: {status: complete, found_bypass: false, explored_states: 279}
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 238
    legal_transitions: 409
    event_only_illegal_transitions: 0
    winning_states: 4
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 99
    winning_regions: 2
    solution_irreversible_path_steps: 11
    forced_win_prefix: 1/11
    win_subgraph_shape: branching_win_dag
    handoff_scriptiness: scripted=7/11, trivial=5, sameEntryExit=7, forcedScripted=7, maxRun=3
    initial_region: commitments=2, viable=2, dead=0, optimal=1
    counterfactuals: none_configured
  object_or_instance_evidence:
    instance_level_participation: not_reported_by_tool
    object_identity_claim: not_claimed
  evidence_limits:
    - All-solution gates are event-group gates, not exact route or object-identity gates.
    - Tool reports no instance-level participation; target-object assignment is not claimed across all wins.
    - SCC facts are routed for critic interpretation and are not quality verdicts.
    - Walk steps are 9/19 and SCC scripted=7/11; critic should attack whether this remains acceptable.
```

## Key Snapshots

```text
Step 0
#########
#..P.BS@#
#..LG#..#
#...#C..#
#C..GC.##
#########

Step 1 after left: B/S creates sticky material debt
#########
#..PBS@.#
#..LG#..#
#...#M..#
#C..GM.##
#########

Step 4 after right: sticky rigid debt moved right
#########
#..PBS..#
#..LG#..#
#...#.M@#
#C..G.M##
#########

Step 8 after left: B/S pushes P/L by force chain
#########
#.PBS@..#
#.L.G#..#
#...#.M.#
#C..G.M##
#########

Step 13 after right: P/L pulled back with B/S coupled shift
#########
#.PBS...#
#.L@G#..#
#...#.M.#
#C..G.M##
#########

Step 16 after down: P/L debt paid downward, bottom channel opens
#########
#.......#
#.PBS#..#
#.L.#.M.#
#C@.G.M##
#########

Step 19 after right: bottom crate converts and wins
#########
#.......#
#.PBS#..#
#.L.#.M.#
#...m@M##
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
    - high-open-planning difficulty not claimed
  taste_probes:
    - verify whether v2 fixes v1 P/L opener-only attack
    - attack whether scripted=7/11 and walk=9/19 are too execution-heavy
    - judge whether lower-burden challenge target makes this acceptable with caveats
  scc_graph:
    - complete graph with 238 states, 4 winning states
    - branching_win_dag, forcedWinPrefix 1/11
    - handoff scriptiness scripted=7/11, maxRun=3
  variant_family:
    - structural revision within fresh cross_latch family, not derived from clean archive candidate
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
  candidate_relation: fresh_family_revision_after_review
  why_not_archive_variant: >
    本轮先写 fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0，再用搜索脚本寻找服务该 claim
    的结构素材。v2 是对 v1 independent critic structural_revision 的同 family 修订；
    RA_CAND_0001 只作为 human taste anchor，未复用其布局、目标关系、对象角色或因果链。
```

## Attempt Log

```yaml
attempt_log:
  serious_structural_attempts:
    - fresh_design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v0.zh.md
    - RA_EXP_2026_07_04_CROSS_LATCH_v1: evidence passed, critic required structural_revision
    - designer_action_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.zh.md
    - RA_EXP_2026_07_04_CROSS_LATCH_v2 original: stronger P/L mid/end debt but tail scripted
    - RA_EXP_2026_07_04_CROSS_LATCH_v2b: unsolved after bottom crate moved one step
    - RA_EXP_2026_07_04_CROSS_LATCH_v2c: solved but too much walk padding
    - RA_EXP_2026_07_04_CROSS_LATCH_v2d: normalized as official v2 after preserving event gates and shortening tail
  local_repairs:
    - normalized official v2 layout to analyzer-rendered initial state so packet ASCII matches runtime
  abandoned_families: []
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
- prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.zh.md
- prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_CROSS_LATCH_v2.zh.md
- prototypes/reality_anchor/reports/RA_EXP_2026_07_04_CROSS_LATCH_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_CROSS_LATCH_v2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_CROSS_LATCH_v2.json
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_CROSS_LATCH_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_CROSS_LATCH_v2.json
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_CROSS_LATCH_v2.md
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_CROSS_LATCH_v2.json
- prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
- prototypes/reality_anchor/design_archive/candidates/RA_CAND_0001.md
```

