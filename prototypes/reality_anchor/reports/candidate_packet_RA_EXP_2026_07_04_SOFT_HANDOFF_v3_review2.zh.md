# Candidate Packet: RA_EXP_2026_07_04_SOFT_HANDOFF_v3 review_2

```yaml
review_iteration: review_2
candidate_version: RA_EXP_2026_07_04_SOFT_HANDOFF_v3
review_input_type: candidate_version
prototype: reality_anchor
packet_status: ready_for_independent_review
revision_source:
  previous_candidate: RA_EXP_2026_07_04_SOFT_HANDOFF_v2
  previous_critic_required_action: structural_revision
  designer_action: designer_action_RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1.zh.md
```

## Prototype Context

```yaml
prototype_context:
  confirmed_rules:
    - P/L 是可移动二格推拉锚点；P 侧按 push 处理，L 侧按 pull 处理。
    - B/S 是可移动二格箱/黏锚点；B 侧为箱，S 侧为黏，移动后全局归一化。
    - 黏块四邻接自动合并，作为刚体移动；进入箱侧会 split/转箱。
    - 目标必须由 crate、sticky block 或 anchor cell 覆盖；玩家站在目标上不计。
  win_condition: all_targets_covered_by_objects
  object_and_event_semantics:
    - anchor_boundary_shift: 锚点发生平移，事件带 push_pull 或 box_sticky 类型后缀。
    - pull_object: pull-side 输入拉动身后一格对象。
    - box_to_sticky / sticky_to_box: B/S 边界结算导致材料归一化。
    - sticky_merge: 相邻 sticky 结算成同一刚体。
    - move_sticky_rigid: 黏块作为刚体被移动。
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
    用户要求本轮给出难度稍低的候选。v3 目标是比 PHASE_FERRY_v8 短、更少回返，
    但比 v2 更有互锁结构：P/L 不能只作为尾部按钮，B/S 换相必须被中段状态消费。
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
  aesthetic_score_target: unscored_missing_human_archive_context
  difficulty_score_target: unscored_missing_human_archive_context
  score_claim_allowed: false
  target_role_notes: >
    非分数化目标：较低难度后期短链挑战；要求机制密度与互锁感高于 v2。
```

## Solve Instance

```yaml
solve_instance:
  player_start: [5, 1]
  player_goal: null
  win_condition: all_targets_covered_by_objects
  push_pull_anchor: horizontal
  box_sticky_anchor: horizontal
```

```text
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
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
    - anchor_target_cover
    - short repositioning walks
    - force_chain
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
```

## Design Claim

```yaml
design_claim:
  player_insight: >
    玩家要读出 P/L 与 B/S 的互锁 handoff：先移动 P/L 建立上排 crate 的 pull
    通道；再把 crate 与右侧 M 搬进中段，制造箱/黏材料债务；随后拉 B/S 触发
    sticky merge；末段再消费 P/L 与 sticky 刚体共同覆盖目标。
  causal_chain:
    - 起点旁目标不是直接覆盖目标；第一步有效承诺是拉 P/L，而非走到远端入口。
    - P/L 上移后，crate 才能沿上排被 pull 到右侧并参与后续材料关系。
    - 玩家拉动右侧 M，使其跨过 B/S 边界并转箱，随后再次拉 P/L 到中段。
    - 拉 B/S 后，crate/M 在目标走廊中变成 sticky 并 merge，形成最终可推动/拉动刚体。
    - 末段上推 P/L、再拉 sticky，P/L 与 sticky 合力覆盖两个目标。
  why_not_execution: >
    相比 v2，本版只有 4 个纯 walk 步，并且 P/L 在第 2、9、11、13 步都改变局面；
    B/S 第 10 步触发的材料合并被末段 sticky 刚体收束消费。玩家若把 P/L 当作尾部
    按钮，无法解释前段 crate 通道与末段 sticky 收束。
  falsification:
    - 任一核心事件组存在胜路绕过。
    - 完整图不 complete，导致 all-solution 必要性未知。
    - critic 判断它仍只是 forced script，缺少玩家侧计划责任。
```

## Evidence

```yaml
evidence:
  commands_run:
    - npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v3_layout.txt --id RA_EXP_2026_07_04_SOFT_HANDOFF_v3 --title "Soft handoff v3" --role challenge --support none --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v3_layout.txt RA_EXP_2026_07_04_SOFT_HANDOFF_v3 300000 80 "push_pull_anchor_shift=anchor_boundary_shift:push_pull" "box_sticky_anchor_shift=anchor_boundary_shift:box_sticky" "pull_event=pull_object" "material_normalization=box_to_sticky|sticky_to_box" "sticky_rigid_move=move_sticky_rigid"
    - npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v3_layout.txt RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6 300000 80 "push_pull_anchor_shift=anchor_boundary_shift:push_pull" "box_sticky_anchor_shift=anchor_boundary_shift:box_sticky" "pull_event=pull_object" "material_normalization=box_to_sticky|sticky_to_box" "sticky_rigid_move=move_sticky_rigid" "sticky_merge=sticky_merge"
    - npx tsx prototypes/reality_anchor/reports/trace_layout.ts prototypes/reality_anchor/reports/RA_EXP_2026_07_04_SOFT_HANDOFF_v3_layout.txt RA_EXP_2026_07_04_SOFT_HANDOFF_v3
    - npx tsx src/cli.ts explain-level prototypes/reality_anchor RA_EXP_2026_07_04_SOFT_HANDOFF_v3 --max-states 300000 --graph-max-states 300000 --write
    - npm run check
  solver_result:
    found: true
    cost: 13
    depth: 13
    explored_states: 356
    inputs: down up right right down left down left down left up right left
    walk_steps: 4
    events: >
      walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
      pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1
      pull_object:sticky#1 move_sticky_rigid sticky_to_box:n1
      pull_object:push_pull_anchor anchor_boundary_shift:push_pull
      pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
      box_to_sticky:n2 sticky_merge:n1 push_object:push_pull_anchor
      anchor_boundary_shift:push_pull walk pull_object:sticky#1 force_chain:n2
      anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n2
  trace_summary:
    - step_2_up: P/L 被拉上来，早段参与而非尾部按钮。
    - step_8_left: 右侧 M 被拉入箱侧，触发 sticky_to_box。
    - step_10_left: B/S 被拉动，触发 box_to_sticky 与 sticky_merge。
    - step_11_up: P/L 再次移动，打开最终目标覆盖形态。
    - step_13_left: sticky 刚体移动并触发 sticky_to_box，最终获胜。
  winning_path_event_checks:
    core6_combined_probe:
      status: complete
      found_bypass: false
      explored_states: 4422
      groups:
        - push_pull_anchor_shift
        - box_sticky_anchor_shift
        - pull_event
        - material_normalization
        - sticky_rigid_move
        - sticky_merge
    individual_probes:
      push_pull_anchor_shift: {status: complete, found_bypass: false, explored_states: 2891}
      box_sticky_anchor_shift: {status: complete, found_bypass: false, explored_states: 2891}
      pull_event: {status: complete, found_bypass: false, explored_states: 2848}
      material_normalization: {status: complete, found_bypass: false, explored_states: 2874}
      sticky_rigid_move: {status: complete, found_bypass: false, explored_states: 2828}
      sticky_merge: {status: complete, found_bypass: false, explored_states: 4254}
  reachable_event_exposure:
    graph_status: complete
    reachable_states: 2828
    legal_transitions: 6093
    event_only_illegal_transitions: 0
    winning_states: 1
  graph_or_counterfactual_evidence:
    agency_status: complete
    compressed_regions: 574
    winning_regions: 1
    solution_irreversible_path_steps: 9
    forced_win_prefix: 7/9
    win_subgraph_shape: branching_win_dag
    handoff_scriptiness: scripted=7/9, trivial=6, sameEntryExit=7, forcedScripted=7, maxRun=6
    notable_branch: after_step_8 region has 3 viable choices and 0 dead commitments
    counterfactuals: none_configured
  object_or_instance_evidence:
    instance_level_participation: not_reported_by_tool
    object_identity_claim: not_claimed
  evidence_limits:
    - All-solution gates are event-group gates, not exact route or object-identity gates.
    - Tool reports no instance-level participation; target-object assignment is not claimed across all wins.
    - SCC facts are routed for critic interpretation and are not quality verdicts.
```

## Key Snapshots

```text
Step 0
#########
####C@..#
###G.G..#
####PL.M#
####..BS#
#########

Step 2 after up: P/L pulled into upper target corridor
#########
####C@..#
###GPL..#
####...M#
####..BS#
#########

Step 8 after left: M pulled across B/S boundary and becomes crate
#########
####....#
###GPLC.#
####.@C.#
####..BS#
#########

Step 10 after left: B/S pulled, sticky merge in target corridor
#########
####....#
###G.GM.#
####PLM.#
####@BS.#
#########

Step 11 after up: P/L opens final coverage shape
#########
####....#
###GPLM.#
####@.M.#
####.BS.#
#########

Step 13 after left: P/L + sticky cover targets, win
#########
####....#
###PL*..#
####@C..#
####.BS.#
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
    - central events include sticky_merge after core6 probe
  claim_hygiene:
    - score_claim_allowed: false
    - object identity not claimed
    - unique input sequence not claimed
  taste_probes:
    - review whether v3 fixed v2 padding / tail-button attacks
    - attack scripted SCC run and forcedWinPrefix from player-facing angle
    - judge whether 13-step chain is lower-difficulty challenge rather than guided application
  scc_graph:
    - complete graph with 2828 states, 1 winning state
    - branching_win_dag, forcedWinPrefix 7/9
    - handoff scriptiness scripted=7/9 but after step 8 has 3 viable choices and no dead commitments
  variant_family:
    - revised fresh family after review_1 structural_revision
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
  candidate_relation: revised_from:RA_EXP_2026_07_04_SOFT_HANDOFF_v2
  why_not_archive_variant: >
    v3 是本轮 fresh family 内根据 independent critic 对 v2 的 structural_revision
    继续修订；未从 RA_CAND_0001 派生。RA_CAND_0001 只作为 human taste anchor。
```

## Attempt Log

```yaml
attempt_log:
  serious_structural_attempts:
    - fresh_design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v0.zh.md
    - RA_EXP_2026_07_04_SOFT_HANDOFF_v2: evidence passed, critic required structural_revision
    - design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.zh.md
    - search_soft_interlock_743021.md
    - search_soft_interlock_743022.md
    - search_soft_interlock_743023.md
    - search_soft_interlock_743024.md
  local_repairs:
    - probeA: good 13-step chain but graph exhausted due extra objects/open space
    - cleanA: removed unused crates but graph still exhausted
    - cleanB/v3: wall-compressed state space while preserving 13-step causal chain; graph complete and core6 probe complete
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
      Reality Anchor 当前 clean human-reviewed archive 只有 RA_CAND_0001 一个
      accepted 正例，没有低分、失败或下界人评条目。critic 不得输出分数化
      审美/难度结论，只能给非分数结构判断。
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
- prototypes/reality_anchor/reports/design_claim_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.zh.md
- prototypes/reality_anchor/reports/layout_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_SOFT_HANDOFF_v3_core6.md
- prototypes/reality_anchor/reports/trace_RA_EXP_2026_07_04_SOFT_HANDOFF_v3.md
- prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1.md
- prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_SOFT_HANDOFF_v2_review_1.zh.md
- prototypes/reality_anchor/levels.yml
```
