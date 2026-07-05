# Candidate Packet: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2 review_2

candidate_version: RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第八关 / 固定 B/S 黏块拼接应用

## Slot Brief

关卡规划第八关要求：无 P/L，固定 B/S，实际用到黏块和箱子之间的转化用于拼接。人类反馈只要求避免 v1 的开局一步直通正解。

## Solve Instance

```text
########
#......#
#B.C#..#
#S...@.#
###M.G.#
########
```

## Design Claim

player_insight:
  玩家需要把 crate 推过固定 B/S 分界，把它转成 sticky 并与下方 sticky 拼接；随后用拼接后的刚体覆盖目标。右侧起点让核心转换不再是第一步直觉下推。
causal_chain:
  1. 从右侧中间走回 crate 上方入口。
  2. 下推 crate，触发 box_to_sticky 与 sticky_merge。
  3. 走到刚体左侧，右推两次覆盖目标。
why_not_execution:
  起点调整只降低开局脚本感，核心仍是固定 B/S 的箱转黏拼接。
falsification:
  若所有胜路不必 box_to_sticky、sticky_merge、move_sticky_rigid，或可达图中 B/S 被移动，则 claim 失败。

## Evidence

solver_result:
  found: true
  cost: 9
  inputs: `up up left left down left down right right`
  events: `walk walk walk walk push_object:crate#1 box_to_sticky:n1 sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid`
graph:
  status: complete
  reachable_states: 186
  legal_transitions: 488
  winning_states: 17
strong_material_probe:
  artifact: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2.md
  fixed_box_sticky_effect: complete_no_bypass
  box_to_sticky: complete_no_bypass
  sticky_merge: complete_no_bypass
  sticky_rigid_move: complete_no_bypass
reachable_scan:
  status: complete
  forbidden_box_sticky_anchor_shift_hits: none
  event_counts:
    box_to_sticky: 1
    sticky_merge: 1
    move_sticky_rigid: 9
    walk: 470
evidence_limits:
  - fixed_anchor combined probe includes movable_push_pull_shift, which is intentionally absent; the relevant individual probes are the fixed B/S material groups and reachable no-B/S-shift scan.
  - 不声明高难或唯一解。

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0003
    human_comment: 教学使用箱黏锚点分离黏块的简单可用教学关
    calibration_use: fixed B/S 教学应用可以短，但必须让材料转化有功能。
  - candidate_id: RA_CAND_0010
    human_comment: 结构简单，逻辑清晰
    calibration_use: 当前课程早期重视清晰结构。
  - candidate_id: RA_CAND_0006
    human_comment: 小目标位置变化弱化机制美感并抬高路线复杂度
    calibration_use: 防止仅靠走位加长来伪造难度。

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L08_FIXED_BS_JOIN_v2.md
