# Candidate Packet: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1 / review_1

```yaml
candidate_version: RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1
review_iteration: review_1
prototype: reality_anchor
controller_note: >
  本候选为 fresh design。本轮按用户要求使用 mechanism_lab/lexicon.md 的设计语料，
  未读取 mechanism_lab/runs。前一候选被 critic 判定为小型事件脚本后，本候选改以
  "同一目标先覆盖、再腾空、最终回填" 作为状态责任反转。
```

## prototype_context

```yaml
confirmed_rules:
  - "胜利条件为 all_targets_covered_by_objects；目标可由 crate、sticky 或 anchor 覆盖。"
  - "P/L anchor 决定 push/pull 区域，锚点本身可移动。"
  - "B/S anchor 决定 box/sticky material boundary，锚点本身可移动。"
  - "crate 进入 sticky side 会 box_to_sticky；sticky 跨回 box side 会 sticky_to_box。"
  - "sticky 正交相邻会 sticky_merge；sticky 连通块作为刚体移动。"
win_condition: all_targets_covered_by_objects
object_and_event_semantics:
  - "P/L shift: anchor_boundary_shift:push_pull"
  - "B/S shift: anchor_boundary_shift:box_sticky"
  - "binding: box_to_sticky"
  - "release: sticky_to_box"
  - "shape debt: sticky_merge + move_sticky_rigid"
tool_boundary:
  - "solver/analyzer/probes 只提供事实，不授予审美或难度通过。"
  - "complete graph / complete event probe 才能支撑 all-winning-path claim。"
```

## source_lexicon_combo

```yaml
lexicon_file: "prototypes/reality_anchor/mechanism_lab/lexicon.md"
selected_materials:
  - "P/L 横向把手的墙格门"
  - "B/S 绑定债：从可分配箱子到形状化黏块"
  - "B/S 解绑定债：用边界切割回收箱子资源"
  - "刚体黏块推进后的回返谱系"
how_used:
  - "P/L 横向把手：把 P/L 放入下方墙格门，要求玩家通过 push/pull 改变可达站位。"
  - "绑定债：上方 crate 被拉过 B/S 后转为 sticky，并与既有 sticky 合并，第一次覆盖 top_goal。"
  - "解绑定债：中段 sticky 刚体跨回 box side，释放 crate，改变同一目标上的对象责任。"
  - "刚体回返：末段 sticky 刚体必须被推回/拉回，重新覆盖被腾空的 top_goal。"
not_used_as:
  - "没有复刻 lexicon 的完整局部布局。"
  - "没有把开放房间中的可逆性当成关卡锁；所有强 claim 都由本候选探针重跑。"
```

## slot_brief

```yaml
intended_role: "Reality Anchor 后段紧凑挑战候选"
known_before:
  - K_runtime_smoke
target:
  - "difficulty 至少 4，追求更高。"
  - "整体审美至少 4，追求 4~5。"
difficulty_or_support_expectation: "challenge；目标是紧凑状态责任链，而不是长路线硬化。"
```

## solve_instance

```yaml
layout_file: "prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_layout.txt"
player_start: [6, 1]
win_condition: all_targets_covered_by_objects
objects:
  push_pull_anchor:
    P: [4, 3]
    L: [3, 3]
  box_sticky_anchor:
    B: [1, 3]
    S: [2, 3]
  crates: []
  sticky:
    - [2, 1]
    - [5, 1]
    - [2, 2]
    - [4, 2]
    - [7, 2]
  goals:
    top_goal: [3, 1]
    low_goal: [2, 4]
```

```text
#########
##MG.M@.#
#.M.M..M#
#BSLP#.##
#.G..#..#
#########
```

## mechanism_scope

```yaml
central:
  - "开局推动 sticky 刚体，并用 P/L 墙格门改变下方站位。"
  - "B/S 被拉动后触发 sticky_to_box，暂时把 sticky 资源切回 crate。"
  - "crate 被拉到 top_goal 后触发 box_to_sticky + sticky_merge，形成第一次覆盖。"
  - "后续 sticky_to_box 与 B/S 再定位迫使 top_goal 腾空。"
  - "末段必须把刚体资源回推/回拉，最终回填 top_goal，同时满足 low_goal。"
allowed_support:
  - "少量走位与等价 reposition。"
incidental_allowed:
  - "不同胜路可以有等价步序差异；packet 不声明唯一输入序列。"
required_winning_path_events:
  - "anchor_boundary_shift:push_pull"
  - "anchor_boundary_shift:box_sticky"
  - "pull_object"
  - "box_to_sticky"
  - "sticky_to_box"
  - "move_sticky_rigid"
  - "sticky_merge"
required_winning_path_state_pattern:
  - "target [3,1] 必须经历 covered -> uncovered -> covered before win。"
forbidden_winning_path_events:
  - "winning path 缺少任一 required event group。"
  - "winning path 不发生 target [3,1] 的覆盖-腾空-回填。"
forbidden_if_seen_anywhere: []
```

## design_claim

```yaml
player_insight:
  - "玩家不能把 top_goal 的第一次覆盖当作完成；它是一个必须被撤销的中间状态。"
  - "B/S 不只是开关材料标签，而是在同一目标上改变'谁负责覆盖'。"
  - "P/L 墙格门和 sticky 回返共同解释为什么末段需要把资源带回，而不是做完中段就结束。"
causal_chain:
  - "step 3-6：sticky rigid + P/L shift + B/S shift，建立材料边界和站位门。"
  - "step 10：crate 被拉入 sticky side，box_to_sticky + sticky_merge，top_goal 第一次被覆盖。"
  - "step 16-19：release/bind 重新分配资源；B/S 与 sticky 刚体继续移动。"
  - "step 25：low_goal 侧完成时 top_goal 被腾空，证明第一次覆盖不是终态。"
  - "step 27：刚体回返，top_goal 最终回填。"
why_not_execution_only:
  - "core7 probe 完整证明七个核心事件组全胜路必经。"
  - "target-vacate probe 完整证明 top_goal 的 covered->uncovered->covered 全胜路必经。"
  - "删目标反事实显示 top_goal 提供末段回填义务，low_goal 阻止 2 步 sticky 速解。"
falsification:
  - "若 reviewer 找到缺少任一 core7 group 的胜路，核心 claim 失败。"
  - "若 reviewer 找到不腾空 top_goal 的胜路，状态责任反转 claim 失败。"
  - "若 critic 判断体验仍主要是 forced-script execution，而不是紧凑状态消费，应降级或重做。"
```

## evidence

```yaml
commands_run:
  - "npx tsx src/cli.ts explain-layout prototypes/reality_anchor prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_layout.txt --id RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1 --targets K_runtime_smoke --max-states 900000 --graph-max-states 900000 --write"
  - "npx tsx prototypes/reality_anchor/reports/probe_dual_axis_candidate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_layout.txt RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_core7_separate 1000000 160 \"push_pull_shift=anchor_boundary_shift:push_pull\" \"box_sticky_shift=anchor_boundary_shift:box_sticky\" \"pull_event=pull_object\" \"box_to_sticky=box_to_sticky\" \"sticky_to_box=sticky_to_box\" \"sticky_rigid=move_sticky_rigid\" \"sticky_merge=sticky_merge\""
  - "npx tsx prototypes/reality_anchor/reports/probe_target_vacate.ts prototypes/reality_anchor/reports/RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_layout.txt RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_target_vacate 3,1 1000000 160"
  - "对 no_top_goal、no_low_goal 分别运行 explain-layout、core7 event probe 与原 trace replay。"
  - "对 no_low_goal 额外运行 target_vacate probe。"
solver_result:
  found: true
  cost: 27
  depth: 27
  explored_states: 654
  inputs: "down left left down left right up up left right down right right up left left down down left up right down up left down right up"
trace_summary:
  returned_solution_event_counts:
    walk: 13
    move_sticky_rigid: 8
    sticky_merge_n1: 4
    anchor_boundary_shift_push_pull: 3
    anchor_boundary_shift_box_sticky: 3
    sticky_to_box_n2: 2
    box_to_sticky_n1: 1
    box_to_sticky_n2: 1
  key_snapshots:
    - "step 3: sticky rigid move + sticky_merge。"
    - "step 4: P/L shift。"
    - "step 6: B/S shift + sticky_to_box。"
    - "step 10: box_to_sticky + sticky_merge，top_goal [3,1] 第一次覆盖。"
    - "step 16: sticky_to_box release。"
    - "step 19: B/S shift + box_to_sticky + sticky_merge。"
    - "step 25: low_goal 侧完成时 top_goal [3,1] 腾空。"
    - "step 27: top_goal [3,1] 最终回填。"
target_events:
  - "K_runtime_smoke 通过；该 target 不含质量 verdict。"
object_or_instance_evidence:
  - "analyzer 未提供 instance-level object participation；不声明对象身份级必要性。"
winning_path_event_checks:
  core7_separate:
    artifact: "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_core7_separate.md"
    combined: "Found bypass=false, status=complete, exploredStates=845"
    individual:
      push_pull_shift: "Found bypass=false, complete, exploredStates=739"
      box_sticky_shift: "Found bypass=false, complete, exploredStates=744"
      pull_event: "Found bypass=false, complete, exploredStates=786"
      box_to_sticky: "Found bypass=false, complete, exploredStates=801"
      sticky_to_box: "Found bypass=false, complete, exploredStates=744"
      sticky_rigid: "Found bypass=false, complete, exploredStates=739"
      sticky_merge: "Found bypass=false, complete, exploredStates=739"
  target_vacate:
    artifact: "prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_target_vacate.md"
    target: [3, 1]
    required_pattern: "covered -> uncovered -> covered before win"
    result: "Found bypass=false, status=complete, exploredStates=1222"
reachable_event_exposure:
  - "未做 forbidden reachable scan；packet 不声明 later-event 排除。"
graph_or_counterfactual_evidence:
  main_graph:
    artifact: "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1.md"
    status: complete
    reachable_states: 691
    legal_transitions: 1517
    winning_states: 1
    graph_semantics: "win-terminal first-win graph; winning states are not expanded."
  agency:
    compressed_regions: 95
    initial_commitments: 2
    viable_commitments: 1
    dead_commitments: 1
    progress_commitments: 1
    optimal_commitments: 1
    forced_viable_prefix: "3/11"
    forced_optimal_prefix: "11/11"
  scc:
    shape: "sccs=62, edges=96, winReachable=16, winning=1, winSubgraph=branching_win_dag"
    solution_irreversible_path: "steps=9, forcedWinPrefix=3/9"
    handoff_scriptiness: "scripted=4/9, trivial=1, forcedScripted=4, maxRun=2"
  invalid_goal_prune_check:
    status: clean_keep_both_targets
    retained_targets:
      - [3, 1]
      - [2, 4]
    targets_checked:
      - target: [3, 1]
        action: keep
        reason: "删除 top_goal 后成本 27->25；原 trace 在 step25 已胜，说明 top_goal 施加最后两步回填义务。core7 仍必经，所以该目标的职责是 target-vacate/final-return，而不是引入核心事件。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_top_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_top_goal_core7.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_top_goal_replay_original.md"
      - target: [2, 4]
        action: keep
        reason: "删除 low_goal 后成本 27->2，并出现缺少 push_pull_shift、box_sticky_shift、pull_event、box_to_sticky、sticky_to_box 的 winning bypass；target-vacate 也被 2 步路径绕过。"
        graph_status: complete
        expected_trace_win: true
        evidence_refs:
          - "prototypes/reality_anchor/reports/layout_analysis_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal.md"
          - "prototypes/reality_anchor/reports/event_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_core7.md"
          - "prototypes/reality_anchor/reports/target_vacate_probe_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_target_vacate.md"
          - "prototypes/reality_anchor/reports/trace_RA_LEX_2026_07_06_VACATE_BIND_RETURN_v1_no_low_goal_replay_original.md"
archive_comparison_context:
  positive_anchors:
    - "RA_CAND_0011: 小空间中先覆盖/撤销/回填的状态责任洞见。"
    - "RA_CAND_0002/0005: 双 anchor 与 material/shape 链共同参与。"
  negative_anchors:
    - "RA_CAND_0006: 目标位置硬化但机制美感下降。"
    - "RA_CAND_0013: 简单固定 cut witness，不能包装成高难候选。"
evidence_limits:
  - "不声明唯一输入序列。"
  - "不声明对象身份级必要性。"
  - "不把 SCC forced/scripted facts 当作质量背书。"
  - "top_goal 删除后 core7 仍必经；该目标的正当性来自成本下降与 target-vacate/final-return 义务。"
```

## reviewer_questions

```yaml
evidence_reviewer:
  - "packet 中 all-winning-path claim 是否均由 complete/no-bypass artifact 支撑？"
  - "invalid_goal_prune 是否足以支持保留两个目标？"
  - "是否存在把单条 trace 事实误写为全解事实的问题？"
puzzle_critic:
  - "该候选是否从上一版的小型事件脚本升级为状态责任反转？"
  - "difficulty 是否可评 4+，aesthetic 是否可评 4+？"
  - "若仍失败，失败点是目标像检查点、空间过脚本，还是语料组合未形成新洞见？"
```
