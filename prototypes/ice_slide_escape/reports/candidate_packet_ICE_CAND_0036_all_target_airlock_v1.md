# ICE_CAND_0036_all_target_airlock_v1 候选包

```yaml
candidate_version: ICE_CAND_0036_all_target_airlock_v1
prototype: ice_slide_escape
review_iteration: review_1
review_input_type: candidate_version
controller_role: lead_designer
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
    authorized_by: null
    candidate_ids: []
    allowed_operations: []
  candidate_relation: fresh
  why_not_archive_variant: >
    本轮 brief 要求新设计；候选没有从归档布局、主因果链、入口出口关系或对象角色派生。
```

## Prototype Context

```yaml
prototype_context:
  confirmed_rules:
    - 网格矩形，`#` 是墙，`.` 是地面，`*` 是 target+ice，`@` 是玩家。
    - 冰被推动后按滑行距离触发分支；d4 分支会在障碍前一格反弹一格。
    - 冰之间不链推；静止冰是滑行冰的障碍。
    - 胜利要求所有 target 都有冰，且玩家站在显式 edge player_goal。
  win_condition:
    type: ice_slide_escape_explicit_goal
    all_targets_occupied_by_ice: true
    player_goal: [14, 1]
  object_and_event_semantics:
    `*`: target 上的 ice；本候选初始无裸 `I`、无裸 `G`。
    claimed_core_events:
      - push_ice
      - ice_blocks_ice_no_chain_push
      - ice_rebound_d4
  tool_boundary:
    - explain-layout / compare-starts-layout 只证明求解、事件覆盖、完整图事实。
    - 工具不证明审美、难度或玩家洞见质量。
```

## Slot Brief

```yaml
slot_brief:
  intended_role: challenge_candidate
  known_before:
    - push_ice
    - ice_blocks_ice_no_chain_push
    - ice_rebound_d4
    - target_ice_coverage
    - explicit_edge_goal
  target:
    - 所有箱子初始都在目标上。
    - 初始 target-ice 封死玩家从起点到终点的路径。
    - 玩家必须主动破坏“所有目标已满足”的表面状态，再偿还 target debt。
  difficulty_or_support_expectation: >
    难度至少 3，目标 3-4。避免只成为并列 d4 教学堆叠；核心应来自嵌套借还顺序。
```

## Layout And Solve Instance

```yaml
solve_instance:
  player_start: [0, 6]
  player_goal: [14, 1]
  win_condition: ice_slide_escape_explicit_goal
  layout_file: prototypes/ice_slide_escape/reports/ICE_CAND_0036_all_target_airlock_v1_layout.txt
```

```text
#####*####*####
#####..........
#####.####.###.
#####.####.###.
#####.####.###.
#####*....*....
@.....###..####
#####*####*####
###############
```

## Mechanism Scope

```yaml
mechanism_scope:
  central:
    - all_initial_ice_on_targets
    - initial_target_ice_blocks_start_to_goal_route
    - nested_target_debt_airlock
    - d4_rebound_against_target_ice_anchors
    - explicit_edge_goal
  allowed_support:
    - walking reposition through opened corridors
    - dead wrong pushes of anchor ice as local punishment
  incidental_allowed:
    - reachable non-winning late/noisy events, because this brief does not set an exposure cutoff
  required_winning_path_events:
    - push_ice
    - ice_blocks_ice_no_chain_push
    - ice_rebound_d4
  forbidden_winning_path_events:
    - ice_destroyed_d3
    - ice_boundary_disappear
    - ice_pass_through_d5
    - ice_destroy_group_d6_plus
    - slide_restart_after_group
  forbidden_if_seen_anywhere: []
```

## Design Claim

```yaml
design_claim:
  player_insight: >
    初始状态看起来“箱子全在目标上”，但这正是矛盾：两个目标冰同时也是门。
    玩家要理解胜利条件不是保持当前静态，而是临时借走已经正确的门冰，穿过后
    再从背面把它还回 target。两扇门形成 LIFO 气闸：先开左门，再开右门；
    还债时必须先还右门，再还左门，玩家最后站在已重新封上的目标门之后。
  causal_chain:
    - A门 [5,5] 向上推，借助 [5,0] target-ice 障碍 d4 回弹到 [5,2]，打开左门。
    - B门 [10,5] 向上推，借助 [10,0] target-ice 障碍 d4 回弹到 [10,2]，打开右门。
    - 从上侧推 B门向下，借助 [10,7] target-ice 障碍 d4 回弹回 [10,5] target。
    - 从上侧推 A门向下，借助 [5,7] target-ice 障碍 d4 回弹回 [5,5] target。
    - 所有 target 重新被 ice 覆盖后，玩家沿上廊到达 [14,1]。
  why_not_execution: >
    不是“看见冰就推到目标”的执行题：初始目标全满，正确动作反而是制造 target debt；
    若玩家把四个锚点冰当普通箱子消费，会进入死路。关键读法是两扇门的嵌套借还顺序，
    以及 target-ice 同时承担完成物、障碍、门三种角色。
  falsification:
    - 存在无需 push_ice 的步行胜利路径。
    - 存在不触发 d4 / ice obstacle 的胜利路径。
    - 存在使用 d3、边界消失、d5、d6/restart 的胜利路径，说明 claim 中的 d4 airlock 不是核心。
    - 两扇门不必都被借走并还回，或顺序不是嵌套还债而只是重复局部动作。
```

## Evidence

```yaml
evidence:
  commands_run:
    - command: >
        npx tsx src/cli.ts explain-layout prototypes/ice_slide_escape
        prototypes/ice_slide_escape/reports/ICE_CAND_0036_all_target_airlock_v1_layout.txt
        --id ICE_CAND_0036_all_target_airlock_v1_base
        --player-start 0,6 --player-goal 14,1
        --targets K_ice_runtime_smoke,K_explicit_edge_goal
        --max-states 200000 --graph-max-states 200000 --write
      outputs:
        - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0036_all_target_airlock_v1_base.md
        - prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0036_all_target_airlock_v1_base.json
    - command: >
        npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape
        prototypes/ice_slide_escape/reports/ICE_CAND_0036_all_target_airlock_v1_layout.txt
        --id ICE_CAND_0036_all_target_airlock_v1_base_required
        --player-goal 14,1 --starts 0,6
        --required-winning-events push_ice,ice_rebound_d4,ice_blocks_ice_no_chain_push
        --forbidden-winning-events ice_destroyed_d3,ice_boundary_disappear,ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group
        --max-states 200000 --max-depth 100 --graph-max-states 200000 --write
      outputs:
        - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0036_all_target_airlock_v1_base_required.md
        - prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0036_all_target_airlock_v1_base_required.json
  solver_result:
    found: true
    cost: 43
    explored_states: 1249
    returned_event_counts:
      walk: 39
      push_ice: 4
      ice_blocks_ice_no_chain_push: 4
      ice_rebound_d4: 4
  layout_invariant:
    initial_star_cells: 6
    initial_bare_ice_cells: 0
    initial_bare_target_cells: 0
    interpretation: all initial ice is on targets, and all targets are initially occupied by ice
  target_events:
    K_ice_runtime_smoke:
      returned_solution_covers: true
      winning_bypass_without_push_ice: none_found_complete_search
    K_explicit_edge_goal:
      detector_configured: false
      explicit_start_goal_declared: true
  winning_path_event_checks:
    required_winning_events:
      push_ice: complete_no_missing_required_path
      ice_rebound_d4: complete_no_missing_required_path
      ice_blocks_ice_no_chain_push: complete_no_missing_required_path
    forbidden_winning_events:
      result: complete_no_forbidden_winning_path
      forbidden:
        - ice_destroyed_d3
        - ice_boundary_disappear
        - ice_pass_through_d5
        - ice_destroy_group_d6_plus
        - slide_restart_after_group
  reachable_event_exposure:
    status: complete
    note: >
      本 brief 未设置 forbidden-if-seen-anywhere。可达扫描中存在非胜利 wrong-push 噪音，
      因此不能声称“玩家完全看不到”边界或 d5 类事件。
  graph_or_counterfactual_evidence:
    graph_status: complete
    reachable_states: 3052
    legal_transitions: 6430
    winning_states: 1
    scc_shape: branching_win_dag
    solution_irreversible_steps: 4
    forced_win_prefix: 2/4
    forced_viable_commitments: 3/4
  evidence_limits:
    - 工具证明至少一次 required event 对所有胜利路径必要；四次 d4 的逐对象必要性主要来自返回 trace snapshots 和布局读法，不是通用对象身份证明。
    - reachable non-winning event noise 存在，不能作为早期机制 cutoff 候选。
    - 本候选不声明 meta-interface 价值。
```

## Diagnostic Routing

```yaml
diagnostic_routing:
  hard_evidence:
    - 检查 start/goal 合法性、初始全 `*` 条件、必需/禁止 winning events 是否被证据支持。
    - 检查 claim 是否过度声称“四次 d4 对所有胜利路径逐对象必要”。
  mechanism_scope:
    - 核心限定为 d4 target-debt airlock；不奖励可达非胜利 d5/boundary 噪音。
  claim_hygiene:
    - 强项可写为嵌套借还和目标债；不要写成高机制多样性或全图唯一执行序列。
  taste_probes:
    - 与 ICE_CAND_0004 负例对照：避免被看成并列三次 d4 教学堆叠。
    - 与 ICE_CAND_0024/0033 正例对照：看是否有“表面状态误导 -> 回读/还债”的审美价值。
    - 与 ICE_CAND_0006 对照：常规流程难度下界是否达到。
  scc_graph:
    - graph complete；branching_win_dag；4 个 solution commitments；forcedWinPrefix 2/4。
  variant_family: fresh_all_target_airlock
  start_position:
    checked_starts:
      - [0, 6]
    player_goal: [14, 1]
  prototype_specific_work:
    design_handoff: read
    meta_first_design: not_enabled_by_brief
    meta_redesign: skipped_no_opportunity_for_this_single_instance_submission
    pre_human_polish_pass: not_run_until_review_ready
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

## Attempt Log

```yaml
attempt_log:
  serious_structural_attempts:
    - id: single_gate_v1
      result: solvable_clean_but_too_thin
      note: one movable target ice, two d4 pushes; likely below difficulty target
    - id: double_airlock_v1
      result: bypass
      note: lower corridor allowed direct access to B gate, solver skipped A gate
    - id: double_airlock_v2
      result: current_candidate
      note: lower corridor split forces A before B; returned trace is open A, open B, close B, close A
  local_repairs:
    - split lower corridor with walls at row 6 columns 6-8 to remove direct B bypass
  abandoned_families:
    - random all-target search with >=3 pushes produced no useful candidates in first pass
```

## Archive Taste Context

```yaml
archive_taste_context:
  score_claim_allowed: true
  examples:
    - candidate_id: ICE_CAND_0024
      human_reviewed: true
      archive_eligibility: clean_archive
      human_score:
        aesthetic: 5
        difficulty: 3
      use: >
        Positive calibration for target-debt / refill aesthetics and strong reuse.
        Do not copy its meta geometry; use only the principle that a superficially
        wrong/blocked state can become the puzzle's payoff.
      human_comment_excerpt: >
        极佳的强复用meta案例和修改升档案例；亮点在空间复用、要素复用和诱惑路线。
    - candidate_id: ICE_CAND_0033
      human_reviewed: true
      archive_eligibility: clean_archive
      human_score:
        aesthetic: 5
        difficulty: 2
      use: >
        Positive calibration for “我刚做过/旧状态不够”式小误导；本候选追求更高难度，
        但同样依赖表面正确状态被重新解释。
      human_comment_excerpt: >
        做出了非常有趣的小误导、小反转，值得借鉴。
    - candidate_id: ICE_CAND_0006
      human_reviewed: true
      archive_eligibility: clean_archive
      human_score:
        aesthetic: 3
        difficulty: 3
      use: >
        Difficulty lower-bound calibration：顺序推理和错误顺序 deadend 能支撑常规组合关，
        但不足以自动成为高难终局。
      human_comment_excerpt: >
        顺序需要不显然的推理，整体是扎实的关卡，但最后期挑战难度偏低。
    - candidate_id: ICE_CAND_0004
      human_reviewed: true
      archive_eligibility: clean_archive
      human_score:
        aesthetic: 1
        difficulty: 1
      use: >
        Negative calibration：重复 d4 本身不够；critic 应攻击本候选是否只是四次 d4 堆叠。
      human_comment_excerpt: >
        非常简单的三次d4堆叠，三次重复的简单教学仍然是教学。
  none_found_reason: null
```
