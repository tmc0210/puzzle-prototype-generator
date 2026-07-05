# Candidate Packet: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2 review_2

candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第五关 / P/L 长边同向推拉应用

## prototype_context

confirmed_rules:
  - P/L 是可移动 1x2 推拉锚点；P 侧 push，L 侧 pull。
  - P/L 被移动后，全局 push/pull 分界随之改变。
  - 无 B/S 锚点时全图默认 box world，不产生材料转换。
  - 箱子、黏块或锚点覆盖所有目标后胜利；玩家站在目标上不算覆盖。
win_condition: all_targets_covered_by_objects
tool_boundary:
  - solver / layout analyzer / complete graph 可用。
  - direction probe 使用 `probe_directional_events.ts` 比较每步前后 P/L 坐标。
  - 证据不评价审美或人类体验。

## slot_brief

intended_role: challenge
known_before:
  - fixed P/L push/pull
  - movable P/L timing
  - ordinary crate push and pull
target:
  - P/L 长边同向拉动与推动
  - 普通箱 push 与 pull 都实际用到
  - 修复 v1 中右侧 pull 与其它任务拼接感过强的问题
difficulty_or_support_expectation: medium support / early application

## solve_instance

layout:

```text
###########
#PL@G######
#.##.....##
#.#CG....##
#.CG#....##
#........##
###########
```

player_start: [3, 1]
player_goal: null
win_condition: all_targets_covered_by_objects

## design_claim

player_insight:
  中层普通箱 pull 是开路动作，打开下绕后玩家才能处理底部 push 并返回顶部左侧完成 P/L 长边右推；它不再是 v1 的独立右侧收尾任务。
causal_chain:
  1. 开局向右拉 P/L，建立顶部目标的后续 P/L push 责任。
  2. 拉开中层箱，打开通向左下区域的通道。
  3. 从左侧推底部箱覆盖底部目标。
  4. 回到顶部 P 侧，把 P/L 向右推到顶部目标。
why_not_execution:
  两个普通箱的职责互相锁住：中层目标阻止开路箱替代底部 push；底部目标阻止玩家只开路后回顶部。P/L 的右拉与右推分别发生在同一水平长边的两次相反站位中。
falsification:
  若存在缺少右向 P/L pull、右向 P/L push、普通箱 pull 或普通箱 push 的胜路，或目标删除不释放核心绕过，则该结构仍未解决 v1 反馈。

## evidence

commands_run:
  - `npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_layout.txt --id RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2 --targets K_runtime_smoke --max-states 300000 --graph-max-states 300000 --write`
  - `npx tsx prototypes/reality_anchor/reports/probe_directional_events.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_layout.txt RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_direction_core 300000 1000 anchor_pull_right=pl:pull_object:push_pull_anchor:1:0 anchor_push_right=pl:push_object:push_pull_anchor:1:0 'crate_pull=event:pull_object:crate#1|pull_object:crate#2' 'crate_push=event:push_object:crate#1|push_object:crate#2'`
  - `npx tsx prototypes/reality_anchor/reports/probe_event_count.ts prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_layout.txt RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_anchor_boundary_shift anchor_boundary_shift:push_pull 2 300000 1000`
  - target deletion analyses and direction probes for no_top_goal / no_gate_goal / no_lower_goal.
solver_result:
  found: true
  cost: 17
  depth: 17
  explored_states: 278
  graph_status: complete
  reachable_states: 4331
  legal_transitions: 11302
  winning_states: 28
trace_summary:
  - step 1 `right`: `pull_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; P/L right pull.
  - step 4 `right`: `pull_object:crate#1`; middle crate opens lower loop and covers middle target.
  - step 12 `right`: `push_object:crate#2`; lower crate covers lower target.
  - step 17 `right`: `push_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; P/L right push covers top target.
winning_path_event_checks:
  direction_core:
    status: complete
    found_bypass: false
    explored_states: 4685
    required_groups:
      - anchor_pull_right
      - anchor_push_right
      - crate_pull
      - crate_push
  individual_groups:
    anchor_pull_right: complete_no_bypass
    anchor_push_right: complete_no_bypass
    crate_pull: complete_no_bypass
    crate_push: complete_no_bypass
  anchor_shift_count_min2:
    status: complete
    found_bypass_below_count: false
    explored_states: 4331
goal_prune_check:
  status: clean
  targets_checked:
    - target: top_goal
      action: keep
      cost_delta: "17->12"
      core_event_bypass: missing anchor_push_right
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_top_goal.md
        - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_top_goal_direction_core.md
    - target: middle_gate_goal
      action: keep
      cost_delta: "17->17"
      core_event_bypass: missing crate_pull / crate_push variants
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_gate_goal.md
        - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_gate_goal_direction_core.md
    - target: lower_goal
      action: keep
      cost_delta: "17->15"
      core_event_bypass: missing crate_push
      evidence_refs:
        - prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal.md
        - prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal_direction_core.md
  removed_targets: []
  retained_targets:
    - top_goal
    - middle_gate_goal
    - lower_goal
graph_or_scc:
  status: complete
  scc_shape: branching_win_dag
  solution_irreversible_steps: 4
  forced_win_prefix: 1/4
  handoff_scriptiness: scripted=1/4, maxRun=1
evidence_limits:
  - 不声明唯一输入序列。
  - 不声明普通箱对象身份唯一；direction probe 只证明任一普通箱 pull / push group 必经。
  - 不声明所有胜路完整全序。
  - 未做数值化审美或难度自评。

## diagnostic_routing

hard_evidence:
  - direction-aware all-winning-path event gate
  - target deletion counterfactuals
  - anchor shift count minimum
mechanism_scope:
  - P/L only; no B/S material system in layout
claim_hygiene:
  - avoid object identity overclaim
  - avoid unique route overclaim
taste_probes:
  - 是否解决 v1 “右侧 pull 拼接感”
  - 三目标是否读作必要约束而非目标堆叠
scc_graph:
  - graph_fact: complete graph, 4331 states, 28 winning states
    neutral_meaning: full search supports event probes; multiple winning states exist.
    player_facing_interpretation: core events are required but exact route is not unique.
    expected_verdict_effect: merit_or_caveat

## archive_lineage_policy

default: fresh_required
authorized_archive_variant_work:
  enabled: false
candidate_relation: revised_from:RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1
why_not_archive_variant:
  This is a human-feedback revision of a current playable candidate, not a derivative of a clean archive candidate.

## archive_taste_context

examples:
  - candidate_id: RA_CAND_0005
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 4
    human_comment: 玩家侧矛盾明显，需要在推世界触及在拉世界的远目标，从而想到构造黏块+锚点的三格长链。结构有趣，机制利用率高，整体较好的挑战关。
    calibration_use: positive high-coupling challenge anchor.
  - candidate_id: RA_CAND_0004
    human_reviewed: true
    aesthetic_score: 4
    difficulty_score: 3
    human_comment: 下方利用推拉和黏块性质反复腾挪的结构较为有趣。但是上方推箱黏锚点的顺序和下方操作顺序完全无关，本质上是双锚点固定关，适合刚引入锚点可推拉这一事实时的关卡。
    calibration_use: positive transition anchor and warning against weakly coupled upper/lower tasks.
  - candidate_id: RA_CAND_0010
    human_reviewed: true
    aesthetic_score: 3
    difficulty_score: 2
    human_comment: 结构简单，逻辑清晰
    calibration_use: current curriculum lower-positive anchor for clear but simple P/L timing.
  - candidate_id: RA_CAND_0006
    human_reviewed: true
    aesthetic_score: 2
    difficulty_score: 5
    human_comment: 已有关卡的一个强复杂度的变体，用较小的目标位置改动极大地弱化机制美感并增加了腾挪难度，这种增加难度的方式实为较差的反例，仅做归档。
    calibration_use: negative example for difficulty inflation / weak beauty.

## artifact_refs

- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_direction_core.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_anchor_boundary_shift_anchor_boundary_shift_push_pull_min2.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_top_goal.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_top_goal_direction_core.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_gate_goal.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_gate_goal_direction_core.md
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_no_lower_goal_direction_core.md
