# Experiment: ICE_EXP_003_all_knowledge_endgame_capstone

```yaml
experiment_id: ICE_EXP_003_all_knowledge_endgame_capstone
prototype: ice_slide_escape
status: ready
selected_rule_facts:
  - id: RF_d1_d2_stop
    statement: Ice that hits an obstacle after entering one or two empty-or-target cells stops before the obstacle.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_stop_d1_d2
  - id: RF_d3_destroy_moving_ice
    statement: Ice that hits an obstacle after entering exactly three empty-or-target cells disappears.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_destroy_moving_d3
  - id: RF_d4_rebound
    statement: Ice that hits an obstacle after entering exactly four empty-or-target cells rebounds one cell backward.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_rebound_d4
  - id: RF_d5_pass_through
    statement: Ice that hits an obstacle group after entering exactly five empty-or-target cells passes through the full contiguous obstacle group, then continues if a cell after the group exists.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_pass_through_d5
  - id: RF_d6_plus_destroy_group
    statement: Ice that hits an obstacle group after entering six or more empty-or-target cells destroys the full contiguous obstacle group, then continues if a cell after the group exists.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_destroy_group_d6_plus
  - id: RF_restart_counting_after_group
    statement: After d5 pass-through or d6+ group destruction, the first cell after the obstacle group is counted as distance 1 of a new slide segment.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: slide_restart_after_group
  - id: RF_boundary_disappear
    statement: If moving ice hits the board boundary, the ice disappears.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_boundary_disappear
  - id: RF_target_ice_requirement
    statement: A win requires every target overlay to be occupied by ice.
    source: prototypes/ice_slide_escape/docs/rules.md
  - id: RF_explicit_edge_goal
    statement: A solve instance uses one explicit edge start and one explicit edge goal.
    source: prototypes/ice_slide_escape/docs/solver_contract.md
human_intent: >
  做一次上限测试：解禁 ice_slide_escape 当前所有已确认知识和规则事实，测试 LLM
  designer 是否能在不受 d4 pre-d5 限制的情况下产出真正接近游戏最后期的高难
  谜题。这个实验不用于证明 d4 pre-d5 不可行；它只测试全知识终局设计能力上限。
request:
  candidate_count: 2
  expected_role: all_knowledge_endgame_capstone
  difficulty_target: very_high
  campaign_position: final_or_near_final_game
prototype_specific_work:
  - name: meta_reinterpretation
    kind: redesign_stage
    applicability: optional_by_prototype_docs
    meta_knowledge_scope: all_prototype_knowledge_by_default
    authority:
      - prototypes/ice_slide_escape/docs/design_directives.md
      - prototypes/ice_slide_escape/docs/meta_interfaces.md
exploration_guidance:
  goal: upper_bound_test
  record_attempts: true
  quality_guard: critic_loop
  family_directions:
    - d5 pass-through and d6+ destruction create route or wall-state obligations that are consumed later
    - restart counting after d5/d6+ changes the later collision branch and must be planned
    - d4 rebound interacts with d5/d6+ setup or cleanup instead of acting as a repeated witness
    - boundary disappearance is used as a deliberate resource or target-coverage constraint, not accidental loss
    - target coverage and explicit edge-goal access are coupled by shared ice, walls, or route commitments
    - the same ice, wall group, target, route, or edge relation changes role across the solve
    - a late solve requires planning several irreversible commitments before the win path becomes available
    - a compact layout creates high causal coupling rather than long execution or hidden search
  attempt_recording:
    structural_delta_should_note:
      - which rule branches are central
      - which state changes are later consumed
      - wall group topology before and after d5/d6+
      - target coverage dependencies
      - edge-goal access dependencies
      - restart-counting consequences
      - boundary disappearance purpose, if used
    local_repairs_do_not_count_as_new_family:
      - moving only the start
      - moving only the goal
      - translating, rotating, or mirroring the same layout
      - adding walking distance
      - adding a mechanism event without changing later reasoning
      - changing only labels or explanation
  failure_distribution_should_cluster:
    - mechanism showcase without a consumed causal chain
    - long execution chain without planning depth
    - hidden search or unreadable distance counting
    - d5/d6/restart event appears but is not necessary
    - boundary disappearance is accidental loss rather than designed responsibility
    - target coverage and edge-goal access are independent subproblems
    - complete graph or SCC evidence exposes a player-facing execution problem after applying docs/30-scc-graph-diagnostic-reading.md
player_model_assumption:
  known_before:
    - d1_d2_stop
    - d3_destroy_moving_ice
    - d4_rebound
    - d5_pass_through
    - d6_plus_destroy_group
    - restart_counting_after_group_interaction
    - boundary_disappearance
    - target_ice_requirement
    - explicit_edge_start_goal_contract
  not_yet_known: []
challenge_floor:
  must_not_be:
    - discovery_or_witness
    - guided_tutorial
    - simple_application
    - mechanism_showcase
    - single_corridor_execution
    - independent_subproblem_chain
    - arbitrary_hidden_search
  should_show_at_least_two:
    - a central state change is consumed by both target coverage and edge-goal access
    - a d5/d6+ group interaction changes later collision counting or wall topology
    - restart counting changes a later branch outcome that the player must plan for
    - the same ice, wall group, target, or route has different roles across the solution
    - multiple irreversible commitments are coupled by shared resources or order pressure
    - complete graph / SCC evidence, interpreted through docs/30-scc-graph-diagnostic-reading.md, or designer analysis shows meaningful planning before commitment
    - a plausible simplification would remove the puzzle's main insight, not merely shorten execution
  critic_should_attack_if:
    - the candidate is mostly locally obvious execution after the first move, with no player-facing planning load beyond following the only visible continuation
    - mechanisms appear as event trophies rather than consumed responsibilities
    - difficulty comes mainly from length, clutter, exact distance bookkeeping, or hidden trial-and-error
    - d5/d6/restart/boundary events are incidental and the real puzzle is a simpler d1-d4 chain
    - target coverage and edge-goal access can be solved as independent subproblems
    - the layout copies, lightly mutates, or otherwise behaves as an unauthorized variant of an archive example
mechanism_scope:
  applies_to:
    - base_instance
    - submitted_base_flow
    - meta_instance
  central_candidates:
    - d1_d2_stop
    - d3_destroy_moving_ice
    - d4_rebound
    - d5_pass_through
    - d6_plus_destroy_group
    - restart_counting_after_group_interaction
    - boundary_disappearance
    - target_ice_requirement
    - explicit_edge_goal_access
  allowed_support:
    - walk
  forbidden_in_winning_solution: []
  must_report_if_seen_anywhere: []
  required_claim_discipline:
    - Designer must name which mechanisms are central for each candidate.
    - A mechanism event is not central unless its state change is later consumed.
    - More mechanisms do not imply higher quality.
minimum_evidence:
  - Solver finds the explicit player-facing win for each submitted solve instance.
  - Designer names central mechanisms and gives a concrete causal chain.
  - Returned winning trace includes the claimed central mechanism events.
  - Designer explains where each claimed central state change is later consumed.
  - If d5/d6+ is central, evidence records wall-group interaction and restart-counting consequences when relevant.
  - If boundary disappearance is central, evidence explains why disappearance is a designed responsibility rather than accidental loss.
  - High-difficulty claim cites concrete coupling, role changes, order pressure, SCC/opening evidence when available, and failed simplification attempts.
  - Complete graph / SCC diagnostics are used when available as topology facts for win-order shape, multiple win paths, alternative win paths, and bypass risk.
  - Any quality claim based on SCC / graph diagnostics must follow docs/30-scc-graph-diagnostic-reading.md: graph_fact -> neutral_meaning -> player_facing_interpretation -> verdict_effect.
  - Critic explicitly evaluates whether this is a final-game puzzle rather than a mechanism showcase.
archive_examples_to_consult:
  target_count: 1-3
  max_count: 4
  required_if_relevant: true
  use_for:
    - human_taste_calibration
    - human-comment-backed_negative_failure_pattern
    - human-comment-backed_critic_calibration
    - human-comment-backed_designer_claim_calibration
  must_have_human_comments: true
  do_not_copy:
    - layout
    - geometry
    - causal_chain
    - solution_route
    - object_placement
    - entrance_exit_relation
  positive:
    - ICE_CAND_0006
  negative:
    - ICE_CAND_0002
    - ICE_CAND_0004
```

## Designer Instructions

Use:

```text
docs/21-current-workflow-standard.md
docs/20-multi-agent-prompt-templates.md
docs/29-design-archive-contract.md
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
templates/design_archive/CANDIDATE_RECORD.template.md
templates/design_archive/ARCHIVE_PASS_PROMPT.md
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/design_directives.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
prototypes/ice_slide_escape/design_archive/index.yml
```

本实验是全知识终局上限测试。不要把 d5、d6、restart、boundary disappearance
当作自动加分项；它们只有在状态变化被后续消费时才是 central responsibility。

本实验没有 forbidden mechanism。所有已确认机制都可以出现在 winning solution
中，但 designer 必须解释它们是 central、support 还是 incidental。若某个高级机
制只是 incidental，不要把它写进核心亮点。

质量由工具证据和 critic loop 打回保证。若当前最好结果只是机制展示、长执行链
或若干独立小题拼接，只能作为 held / rejected / failed_search 归档，不得包装成
final-game proposal。

`meta_reinterpretation` 在本实验中是可选的原型专属 redesign stage，按
`design_directives.md` 和 `meta_interfaces.md` 执行。若会分散终局主谜题质量，
可以记录 `skipped_no_opportunity`。

archive examples 只用于审美和失败模式校准。不得复用例子的 layout、几何结构、
因果链、求解路线、对象摆放或入口出口关系。未获人类明确授权，不得提交 archive
candidate 的变体。

本实验不要创建 `player_model.yml`、`curriculum_v2.yml` 或 `level_specs_v2.yml`。
输出只应包含候选记录、证据和归档条目。

## 工具说明

常用命令：

```text
npx tsx src/cli.ts inspect prototypes/ice_slide_escape
npx tsx src/cli.ts solve prototypes/ice_slide_escape <level-id>
npx tsx src/cli.ts explain-level prototypes/ice_slide_escape <level-id>
npx tsx src/cli.ts mine prototypes/ice_slide_escape --iterations 24 --max-findings 6
```

Scratch `explain-layout` 通过下面参数指定显式起终点：

```text
--player-start x,y --player-goal x,y
```

对 final-game 候选，若完整 graph / SCC 工具可用，应使用它检查 win-order shape、
multiple / alternative win paths 和 bypass 风险。SCC / graph 输出是拓扑事实；
任何质量判断都必须按 `docs/30-scc-graph-diagnostic-reading.md` 写出
graph_fact、neutral_meaning、player_facing_interpretation 和 verdict_effect。

归档时必须记录每个 solve instance。若存在 meta redesign，A->B 与 C->D 都必须
分别保存 trace、事件证据和 chain_delta；非目标 pair 记录阅读风险，但不自动当
作 bypass。

## 预期结束状态

在设计 / critic / 人类评语循环之后，使用下面模板执行 archive pass：

```text
templates/design_archive/ARCHIVE_PASS_PROMPT.md
templates/design_archive/CANDIDATE_RECORD.template.md
```

候选记录保存到：

```text
prototypes/ice_slide_escape/design_archive/candidates/
```
