# Candidate Packet: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2 review_2

candidate_version: RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2
review_iteration: review_2
prototype: reality_anchor
slot: 第七关 / 固定 B/S 黏块拼接 intro

## Slot Brief

关卡规划第七关要求：固定箱黏锚点，无推拉锚点；简单教黏块和箱子的区别，不要求箱/黏转化或切割。人类反馈要求 v1 体现黏块拼接性质。

## Solve Instance

```text
#######
#B#####
#S#####
#@M...#
###MG.#
#######
```

## Design Claim

player_insight:
  两个黏块开始分离；玩家第一推让它们相邻并触发 sticky_merge，第二推看到合并后的刚体一起移动并覆盖目标。
causal_chain:
  1. 第一推右移上方黏块，触发 sticky_merge。
  2. 第二推移动合并后的刚体，目标由下方黏块覆盖。
why_not_execution:
  这是 2 步强制 witness，价值在于把 sticky 拼接和刚体移动直接展示，不声明谜题深度。
falsification:
  若所有胜路不必 sticky_merge 或不必 move_sticky_rigid，或可达图出现 B/S/P/L 位移或材料转化，则 claim 失败。

## Evidence

solver_result:
  found: true
  cost: 2
  inputs: `right right`
  events: `push_object:sticky#1 move_sticky_rigid sticky_merge:n1 push_object:sticky#1 move_sticky_rigid`
graph:
  status: complete
  reachable_states: 13
  legal_transitions: 24
  winning_states: 4
core_event_probe:
  artifact: prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_core.md
  status: complete
  found_bypass_missing_sticky_merge: false
  found_bypass_missing_sticky_rigid_move: false
reachable_scan:
  artifact: prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2.md
  status: complete
  forbidden_anchor_shift_hits: none
  event_counts:
    sticky_merge: 1
    move_sticky_rigid: 4
    walk: 20
evidence_limits:
  - 不使用 fixed-anchor combined required groups，因为第七关明确不要求 box_to_sticky / sticky_to_box 转化，也不要求 pull。
  - 不声明挑战深度或非强制解。

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0008
    human_comment: 简单推拉锚点引入关
    calibration_use: intro witness 可以短小，但应清楚展示目标机制。
  - candidate_id: RA_CAND_0010
    human_comment: 结构简单，逻辑清晰
    calibration_use: 早期课程更重视清晰，不靠额外噪声增难。

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/designer_action_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v1_human_playtest.zh.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2.md
- prototypes/reality_anchor/reports/event_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2_core.md
- prototypes/reality_anchor/reports/fixed_anchor_probe_RA_CURR_2026_07_05_L07_FIXED_BS_STICKY_RIGID_v2.md

