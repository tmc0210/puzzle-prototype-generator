# Experiment: ICE_EXP_001_d4_rebound_edge_goal

```yaml
experiment_id: ICE_EXP_001_d4_rebound_edge_goal
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
  Try whether d4 rebound can become more than a witness by affecting target
  coverage, explicit edge-goal access, or both.
request:
  candidate_count: 2
  expected_role: design_probe
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
    - d4 rebound changes target coverage and is later consumed
    - d4 rebound changes explicit edge-goal access and is later consumed
    - repeated or chained d4 rebound changes later route meaning
    - d4 rebound combines with allowed support while d4 remains the central responsibility
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
  required_action: reject_or_change_family
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
minimum_evidence:
  - Solver finds the explicit player-facing win.
  - Returned solution includes ice_rebound_d4.
  - Designer explains where the rebound state change is later consumed.
  - Any submitted base A->B flow that uses d5_pass_through,
    d6_plus_destroy_group, slide_restart_after_group, or boundary_disappear in
    its winning solution is rejected or changed-family.
archive_examples_to_consult:
  target_count: 0-2
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
templates/design_archive/DESIGNER_PROMPT_ADDENDUM.md
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/design_directives.md
prototypes/ice_slide_escape/design_archive/index.yml
```

Current archive examples are empty because this is the first archive experiment.

本实验不设置硬性尝试次数。保留轻量 exploration log，记录有代表性的
结构方向、局部修补和失败原因；候选质量由工具证据和 critic loop 打回保证。

Do not create `player_model.yml`, `curriculum_v2.yml`, or `level_specs_v2.yml`
for this experiment. The output should be candidate records and evidence only.

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
