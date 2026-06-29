# Experiment: ICE_EXP_002_d4_pre_d5_capstone

```yaml
experiment_id: ICE_EXP_002_d4_pre_d5_capstone
prototype: ice_slide_escape
status: ready
selected_rule_facts:
  - id: RF_d4_rebound
    statement: Ice that hits an obstacle after entering exactly four empty-or-target cells rebounds one cell backward.
    source: prototypes/ice_slide_escape/docs/rules.md
    expected_event: ice_rebound_d4
  - id: RF_target_ice_requirement
    statement: A win requires every target overlay to be occupied by ice.
    source: prototypes/ice_slide_escape/docs/rules.md
  - id: RF_explicit_edge_goal
    statement: A solve instance uses one explicit edge start and one explicit edge goal.
    source: prototypes/ice_slide_escape/docs/solver_contract.md
human_intent: >
  生成两个以 d4 rebound 为核心的高难度收束候选。它们位于 d4 已经引入之后、
  d5 尚未引入之前，是 d4 小段落的最后考察，不应是教学关、witness 关或简单
  application 关。
request:
  candidate_count: 2
  expected_role: late_d4_pre_d5_capstone
  difficulty_target: high
  campaign_position: after_d4_introduction_before_d5_introduction
prototype_specific_work:
  - name: meta_reinterpretation
    kind: redesign_stage
    applicability: required_after_solid_base
    meta_knowledge_scope: all_prototype_knowledge_by_default
    base_scope_guard: base_instance_must_remain_pre_d5
    authority:
      - prototypes/ice_slide_escape/docs/design_directives.md
      - prototypes/ice_slide_escape/docs/meta_interfaces.md
exploration_guidance:
  goal: exploratory
  record_attempts: true
  quality_guard: critic_loop
  family_directions:
    - d4 rebound creates a later-consumed target coverage obligation
    - d4 rebound creates a later-consumed explicit edge-goal access obligation
    - repeated or chained d4 rebound changes later route meaning
    - d4 rebound interacts with d1_d2 stop while d4 remains the central responsibility
    - d4 rebound interacts with d3 destroy-moving-ice while d4 remains the central responsibility
    - d4 rebound changes the role of the same ice, blocker, target, or route across the solution
    - d4 rebound creates an order dependency between target coverage and edge-goal access
    - d4 rebound appears in a compact high-coupling layout rather than a long execution chain
  attempt_recording:
    structural_delta_should_note:
      - wall topology
      - ice / target responsibility
      - blocker relation
      - route dependency
      - required order or later consumption
    local_repairs_do_not_count_as_new_family:
      - moving only the start
      - moving only the goal
      - translating, rotating, or mirroring the same layout
      - adding walking distance
      - making the same chain longer without new coupling
      - changing only labels or explanation
  failure_distribution_should_cluster:
    - d4 witness without later consumption
    - d4-free bypass or d4-not-necessary solve
    - forbidden mechanism triggered
    - single-corridor execution
    - d1_d2 or d3 becomes the real core while d4 is decorative
    - high-difficulty potential but evidence/tooling is insufficient
player_model_assumption:
  known_before:
    - d1_d2_stop
    - d3_destroy_moving_ice
    - d4_rebound
    - target_ice_requirement
    - explicit_edge_start_goal_contract
  not_yet_known:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
challenge_floor:
  must_not_be:
    - discovery_or_witness
    - guided_tutorial
    - single_corridor_execution
    - d4_event_only_without_later_consumption
    - simple_application_with_one_obvious_push
  should_show_at_least_two:
    - d4 changes a state that is consumed later by target coverage
    - d4 changes a state that is consumed later by explicit edge-goal access
    - the same ice, blocker, target, or route has different roles across the chain
    - multiple d4 events are coupled by shared resources, order, or later state consumption
    - a plausible local repair would simplify execution but destroy the high-difficulty logic
    - opening / SCC evidence or designer analysis shows nontrivial planning before commitment
  critic_should_attack_if:
    - the level is mostly forced after the first move
    - d4 is only a visible event and not a consumed responsibility
    - difficulty comes mainly from length, clutter, hidden information, or arbitrary search
    - allowed support mechanisms become the real puzzle while d4 is only decorative
mechanism_scope:
  applies_to:
    - base_instance
    - submitted_base_flow
  central:
    - d4_rebound
  allowed_support:
    - d1_d2_stop
    - d3_destroy_moving_ice
  incidental_allowed:
    - walk
  forbidden_in_winning_solution:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
    - boundary_disappear
  must_report_if_seen_anywhere:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
    - boundary_disappear
base_hard_reject_policy:
  applies_to:
    - base_instance
    - submitted_base_flow
  reject_if_winning_solution_uses:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
    - boundary_disappear
  reject_if_design_claim_requires:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
    - boundary_disappear
  report_if_seen_outside_target_solution:
    - d5_pass_through
    - d6_plus_destroy_group
    - slide_restart_after_group
    - boundary_disappear
  required_action: reject_or_change_family
  notes: >
    This is a pre-d5 capstone for the base A->B flow. The base instance and any
    submitted base-flow proposal must not require or trigger d5+ mechanics.
    Meta redesign is a separate C->D future-knowledge instance and may use d5
    when that creates a meaningful reinterpretation.
meta_scope_policy:
  applies_to:
    - meta_instance
  knowledge_scope: all_prototype_knowledge_by_default
  d5_pass_through: allowed_if_part_of_meaningful_reinterpretation
  must_record:
    - meta_instance_trace
    - future_knowledge_used
    - chain_delta_from_base
    - why_base_flow_does_not_trigger_d5
  notes: >
    A valid meta reinterpretation may use d5 or later knowledge. That does not
    weaken the hard pre-d5 requirement for the base A->B flow.
minimum_evidence:
  - Solver finds the explicit player-facing win for each candidate.
  - Returned winning solution includes ice_rebound_d4.
  - Designer explains where each claimed d4 rebound state change is later consumed.
  - Designer provides a d4-free bypass check or explains the strongest available substitute.
  - Exploration log records representative abandoned directions and why the submitted candidate was sent to review.
  - High-difficulty claim cites concrete chain structure, coupling, role changes, SCC/opening evidence when available, and failed simplification attempts.
  - Forbidden mechanisms do not appear in the base A->B winning solution.
  - Any submitted base A->B flow that uses d5_pass_through,
    d6_plus_destroy_group, slide_restart_after_group, or boundary_disappear in
    its winning solution is rejected or changed-family.
  - If a recommended C->D meta instance uses d5 or later knowledge, designer
    records it as meta/future-knowledge evidence and also proves the base A->B
    flow does not require or trigger d5+.
  - Report-only mechanisms are reported if seen anywhere in reachable diagnostics.
  - Critic explicitly evaluates whether the candidate is high-difficulty rather than tutorial/application.
archive_examples_to_consult:
  target_count: 1-3
  max_count: 4
  required_if_relevant: true
  use_for:
    - human_taste_calibration
    - negative_failure_pattern
    - critic_calibration
    - designer_claim_calibration
  do_not_copy:
    - layout
    - geometry
    - causal_chain
    - solution_route
    - object_placement
    - entrance_exit_relation
  positive: []
  negative: []
```

## Designer Instructions

Use:

```text
docs/21-current-workflow-standard.md
docs/29-design-archive-contract.md
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
templates/design_archive/CANDIDATE_RECORD.template.md
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/design_directives.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
prototypes/ice_slide_escape/design_archive/index.yml
```

这是高难度收束实验。不要因为候选可解且包含 `ice_rebound_d4` 就提交为成功候选。
如果当前最好结果只是 tutorial、witness 或 simple application，只能作为 failed
或 held search result 归档，并保留诚实的 search ledger。

本实验不设置硬性 family 数、硬性 variant 数或硬性 critic 数。质量由
工具证据和 critic loop 打回保证，而不是由尝试次数保证。Designer 应记录有代表性
的探索方向、局部修补和失败原因；不得用“尝试很多次”让候选通过，也不得用“尝试
很少次”证明机制失败。若无法产出合格候选，应输出 failure distribution，例如：

```text
- N 个 family 退化成 d4 witness；
- N 个 variants 被 d4-free bypass 破坏；
- N 个 variants 触发 forbidden 机制；
- N 个 variants 可解但只是单走廊执行；
- N 个 variants 由 d1_d2 或 d3 成为真实核心，d4 只作装饰；
- N 个 variants 有高难潜力但工具证据不足。
```

exploration log 只是设计记忆和失败分布，不是质量证明。候选必须先通过工具证据，
再进入 evidence reviewer / puzzle critic；critic loop 未闭合时不得包装成
proposal_ready。

`prototype_specific_work` 显式启用本原型的 `meta_reinterpretation` redesign
stage。这不是通用流程默认项，也不是边缘枚举检查。对每个有保留价值的 base
candidate，designer 应尝试把 A->B 优化为带 C->D 重读潜力的变体；如果推荐变
体，必须重新验证 A->B 和 C->D。弱 base candidate 不靠 meta 挽救。

本轮是 d4 引入后、d5 引入前的收束考察，这个限制约束 A->B base flow：base
instance 和提交的基础解不得触发或依赖 d5_pass_through、d6_plus_destroy_group、
slide_restart_after_group 或 boundary_disappear。若 base flow 触发这些机制，
必须 reject_or_change_family。

meta redesign 是单独的 C->D future-knowledge instance，继承
`meta_interfaces.md` 中 meta_instance 默认可使用全部原型知识的一般规则。因此
有效 meta 可以使用 d5 或更后期知识，但必须单独记录为 meta 证据，并说明它与
A->B 的 chain_delta；不得把 meta 中使用的 d5 证据混入 base flow 的合格证明。

本实验不要创建 `player_model.yml`、`curriculum_v2.yml` 或 `level_specs_v2.yml`。
输出只应包含候选记录和证据。

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

起点诊断若被 routing 触发，应使用正式起点比较工具产出可复现证据。示例：

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape <layout-file|-> --player-goal x,y --starts x1,y1 x2,y2 --required-events ice_rebound_d4 --forbidden-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group --report-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group
```

归档时必须记录每个 solve instance。Meta redesign 应按 `design_directives.md`
的 A->B / C->D 同结构重读口径执行；C->B、A->D 或其它非目标 pair 需要记录阅
读风险，但不要自动当作 bypass。

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
