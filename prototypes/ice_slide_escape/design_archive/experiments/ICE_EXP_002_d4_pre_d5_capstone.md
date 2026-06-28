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
prototype_extensions:
  - name: meta_reinterpretation
    applicability: required
    authority:
      - prototypes/ice_slide_escape/docs/design_directives.md
      - prototypes/ice_slide_escape/docs/meta_interfaces.md
design_search:
  scope: experiment_run
  budget_owner: human
  goal: exploratory
  hypothesis_family_min: 8
  variant_per_family_min: 4
  repair_round_min: 3
  evidence_gate_candidates_min: 8
  critic_gate_candidates_min: 4
  final_candidate_target: 2
  budget_is_hard_floor: true
  stop_conditions:
    - accepted_with_evidence
    - budget_exhausted
    - hard_constraint_conflict
    - tool_gap
    - human_stop
  exploration_axes:
    - d4 rebound creates a later-consumed target coverage obligation
    - d4 rebound creates a later-consumed explicit edge-goal access obligation
    - repeated or chained d4 rebound changes later route meaning
    - d4 rebound interacts with d1_d2 stop while d4 remains the central responsibility
    - d4 rebound interacts with d3 destroy-moving-ice while d4 remains the central responsibility
    - d4 rebound changes the role of the same ice, blocker, target, or route across the solution
    - d4 rebound creates an order dependency between target coverage and edge-goal access
    - d4 rebound appears in a compact high-coupling layout rather than a long execution chain
  attempt_counting_rules:
    structural_variant_must_change:
      - wall topology
      - ice / target responsibility
      - blocker relation
      - route dependency
      - required order or later consumption
    does_not_count_as_new_variant:
      - moving only the start
      - moving only the goal
      - translating, rotating, or mirroring the same layout
      - adding walking distance
      - making the same chain longer without new coupling
      - changing only labels or explanation
  required_search_outputs:
    - At least 8 hypothesis families are named before selecting final candidates.
    - At least 32 structural variants are sketched or tested across the run.
    - At least 8 variants enter tool evidence checks.
    - At least 4 variants enter critic review.
    - At least 2 different families survive to final candidate consideration.
    - If fewer than 2 final candidates pass, report the full failure distribution instead of weakening the role.
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
minimum_evidence:
  - Solver finds the explicit player-facing win for each candidate.
  - Returned winning solution includes ice_rebound_d4.
  - Designer explains where each claimed d4 rebound state change is later consumed.
  - Designer provides a d4-free bypass check or explains the strongest available substitute.
  - Search ledger satisfies the hard design_search floor or the candidate is not treated as a completed capstone result.
  - High-difficulty claim cites concrete chain structure, coupling, role changes, SCC/opening evidence when available, and failed simplification attempts.
  - Forbidden mechanisms do not appear in the winning solution.
  - Report-only mechanisms are reported if seen anywhere in reachable diagnostics.
  - Critic explicitly evaluates whether the candidate is high-difficulty rather than tutorial/application.
archive_examples_to_consult:
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

本实验的 `design_search` 是硬下限，不是建议值。Designer 不得用少量失败草图
证明“高难 d4 做不出来”，也不得把未达预算的结果包装成能力或机制结论。若搜索
达到预算后仍无法产出两个合格候选，应输出 failure distribution，例如：

```text
- N 个 family 退化成 d4 witness；
- N 个 variants 被 d4-free bypass 破坏；
- N 个 variants 触发 forbidden 机制；
- N 个 variants 可解但只是单走廊执行；
- N 个 variants 由 d1_d2 或 d3 成为真实核心，d4 只作装饰；
- N 个 variants 有高难潜力但工具证据不足。
```

只有完整 search ledger 达到预算，才能把失败解释为 searched_but_unresolved、
capability_or_tool_limit 或 design-space risk。

`design_search.scope: experiment_run` 表示搜索预算由整轮实验共享。先生成
run-level search ledger，再把选出的候选串行送入 evidence / critic / start /
prototype-specific extension / archive gates。

`prototype_extensions` 显式启用本原型的 `meta_reinterpretation`。这不是通用流程
默认项；本实验按 `design_directives.md` 的 A->B / C->D 同结构重读口径执行。

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

Start Gate 应使用正式起点比较工具产出可复现证据。示例：

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape <layout-file|-> --player-goal x,y --starts x1,y1 x2,y2 --required-events ice_rebound_d4 --forbidden-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group --report-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group
```

归档时必须记录每个 solve instance。Prototype-specific Extension Gate 应按
`design_directives.md` 的 A->B / C->D 同结构重读口径执行；C->B、A->D 或其它
非目标 pair 需要记录阅读风险，但不要自动当作 bypass。

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
