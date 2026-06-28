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
  hypothesis_family_min: 3
  variant_per_family_min: 2
  repair_round_min: 1
  evidence_gate_candidates_min: 2
  stop_conditions:
    - accepted_with_evidence
    - budget_exhausted
    - hard_constraint_conflict
    - tool_gap
    - human_stop
  exploration_axes:
    - d4 rebound changes target coverage and is later consumed
    - d4 rebound changes explicit edge-goal access and is later consumed
    - repeated or chained d4 rebound changes later route meaning
    - d4 rebound combines with allowed support while d4 remains the central responsibility
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
  - Solver finds the explicit player-facing win.
  - Returned solution includes ice_rebound_d4.
  - Designer explains where the rebound state change is later consumed.
archive_examples_to_consult:
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

`design_search.scope: experiment_run` 表示搜索预算由整轮实验共享。先生成
run-level search ledger，再把选出的候选串行送入 evidence / critic / start /
meta / archive gates。

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

Start Gate 应使用正式起点比较工具产出可复现证据。示例：

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape <layout-file|-> --player-goal x,y --starts x1,y1 x2,y2 --required-events ice_rebound_d4 --forbidden-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group --report-events ice_pass_through_d5,ice_destroy_group_d6_plus,slide_restart_after_group,ice_boundary_disappear,ice_boundary_disappear_after_group
```

归档时必须记录每个 solve instance。Meta-interface pass 应按
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
