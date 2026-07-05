# Candidate Packet: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2 review_2

candidate_version: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第六关 / 多方向 P/L 应用

## Slot Brief

关卡规划第六关要求：用到 P/L 的垂直和水平方向推动/拉动中的至少三类，以及普通箱子。人类反馈认为 v1 左侧“反复推箱子再拉出来”的矛盾有趣，右侧区域像拼接，应删除右侧并聚焦核心。

## Solve Instance

```text
######
#PL@.#
#..GG#
#.CG##
#....#
######
```

## Design Claim

player_insight:
  同一个箱子先被推到目标，随后必须被拉出以重开通路，最后再推回目标；P/L 在中段完成下拉、右拉、右推三类方向动作来覆盖上方双目标。
causal_chain:
  1. 普通箱 push 到下目标。
  2. P/L 下拉后，普通箱被 pull 出目标重开路。
  3. P/L 右拉、再右推覆盖上方双目标。
  4. 普通箱重新 push 回目标，完成胜利。
why_not_execution:
  删除右侧房间后，路线长度服务于同一个撤销/恢复矛盾，不再依赖拼接的右侧 pull 任务。
falsification:
  若存在缺少 anchor_pull_down、anchor_pull_right、anchor_push_right、crate_pull 或 crate_push 的胜路，则 claim 失败。

## Evidence

solver_result:
  found: true
  cost: 23
  inputs: `down left left down right up down left down right right up up right up left left left down right left down right`
trace_summary:
  - step 5 `right`: `push_object:crate#1`
  - step 7 `down`: `pull_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`
  - step 8 `left`: `pull_object:crate#1`
  - step 14 `right`: `pull_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`
  - step 20 `right`: `push_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`
  - step 23 `right`: `push_object:crate#1`
graph:
  status: complete
  reachable_states: 945
  legal_transitions: 2269
  winning_states: 12
  scc_shape: branching_win_dag
  solution_irreversible_steps: 3
  forced_win_prefix: 0/3
  handoff_scriptiness: scripted=0/3
direction_core:
  artifact: prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_direction_core.md
  status: complete
  found_bypass: false
  required_groups:
    - anchor_pull_down
    - anchor_pull_right
    - anchor_push_right
    - crate_pull
    - crate_push
  explored_states: 1813
evidence_limits:
  - 不声明唯一输入序列。
  - 不声明所有可达 P/L 方向只有这三类；只声明所有胜路必经这三类。
  - 单箱布局支持普通箱 push/pull 为同一箱，但 object participation 未另行证明实例级身份。

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0010
    human_comment: 结构简单，逻辑清晰
    calibration_use: 当前 P/L 课程下界，清晰聚焦优先。
  - candidate_id: RA_CAND_0004
    human_comment: 下方结构有趣，但上方顺序和下方操作顺序完全无关。
    calibration_use: 警惕上下或左右任务拼接。
  - candidate_id: RA_CAND_0006
    human_comment: 小目标位置变化弱化机制美感并抬高路线复杂度，仅做反例。
    calibration_use: 防止通过多余空间增加复杂度。

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2_direction_core.md
