# Candidate Packet: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3 review_3

candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3
review_iteration: review_3
prototype: reality_anchor
slot: 第五关 / P/L 长边同向推拉应用

## Slot Brief

关卡规划第五关要求：用到 P/L 长边同向推动和拉动，并用到普通箱推动和拉动。人类对 v2 的反馈是：开局第一步固定拉锚点不好，P/L 时机应来自中段主动推理，而不是开头或结尾。

## Solve Instance

```text
###########
#PL.G######
#.##C....##
#.#..#...##
#...CG#..##
#....#.@.##
###########
```

## Design Claim

player_insight:
  普通箱先制造进入顶部区域的空间债务；P/L 的右拉和右推都发生在中段，改变后续边界；最后仍要普通箱 push 收束，因此 P/L 不是第一步或最终按钮。
causal_chain:
  1. 先通过多次 crate pull 打开顶部入口。
  2. 第 17 步右拉 P/L，完成长边同向第一段。
  3. 第 22 步拉底部箱到临时位。
  4. 第 27 步右推 P/L，完成长边同向第二段并覆盖顶部目标。
  5. 第 33/34 步普通箱 push 覆盖底部目标，完成胜利。
why_not_execution:
  该版本解决 v2 的开局/终局 P/L 时机问题，但承认路线较长、早段 crate pull 较多；critic 应重点判断这些是否是空间债务还是 padding。
falsification:
  若有胜路缺少 anchor_pull_right、anchor_push_right、crate_pull、crate_push，或少于 2 次 P/L shift，则证据不支持 claim。

## Evidence

solver_result:
  found: true
  cost: 34
  inputs: `up up up left left right right right down left left up left left up left right down down left down left left up up up right left down down down right right right`
trace_summary:
  - step 6-8: `pull_object:crate#1` three times, opening the upper route.
  - step 13-14: `pull_object:crate#1` two more times to pass the narrow top entry.
  - step 17: `pull_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; anchor right pull.
  - step 22: `pull_object:crate#2`; lower crate temporary pull.
  - step 27: `push_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; anchor right push.
  - step 33-34: `push_object:crate#2` twice; lower crate covers final target.
graph:
  status: complete
  reachable_states: 1203
  legal_transitions: 2676
  winning_states: 67
  scc_shape: branching_win_dag
  solution_irreversible_steps: 11
  forced_win_prefix: 4/11
  handoff_scriptiness: scripted=5/11
direction_core:
  artifact: prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_direction_core.md
  status: complete
  found_bypass: false
  required_groups:
    - anchor_pull_right
    - anchor_push_right
    - crate_pull
    - crate_push
  explored_states: 1733
anchor_shift_count_min2:
  artifact: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_anchor_boundary_shift_anchor_boundary_shift_push_pull_min2.md
  status: complete
  found_bypass_below_count: false
  explored_states: 1203
evidence_limits:
  - 不声明唯一输入序列。
  - 不声明普通箱对象身份唯一；direction probe 只证明任意普通箱 pull/push group 必经。
  - 不声明 route length 已经审美合格；34 步和多次 crate pull 是 critic 风险。

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0010
    human_comment: 结构简单，逻辑清晰
    calibration_use: 第四关清晰 timing 下界；第五关应增加长边同向责任，但不能只靠长度。
  - candidate_id: RA_CAND_0004
    human_comment: 下方结构有趣，但上方顺序和下方操作顺序完全无关。
    calibration_use: 警惕任务拼接和顺序弱耦合。
  - candidate_id: RA_CAND_0006
    human_comment: 小目标位置变化弱化机制美感并抬高路线复杂度，仅做反例。
    calibration_use: 攻击 v3 是否用路线长度代替机制美感。

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v2_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_direction_core.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v3_anchor_boundary_shift_anchor_boundary_shift_push_pull_min2.md
