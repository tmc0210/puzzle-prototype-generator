# Candidate Packet: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4 review_4

candidate_version: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4
review_iteration: review_4
prototype: reality_anchor
slot: 第五关 / P/L 长边同向推拉应用

## Slot Brief

关卡规划第五关要求：用到 P/L 长边同向推动和拉动，并用到普通箱推动和拉动。人类对 v2 的反馈是 P/L 时机不应是开局第一步；v3 进一步被 critic 指出 34 步路线和早段多次普通箱拉动像路线税。v4 目标是压缩开局箱子操作，并把普通箱和 P/L 边界移动做成同一条可复述链。

## Solve Instance

```text
#########
#PL..G###
#.#..####
#.##C@G##
#......##
#########
```

## Design Claim

player_insight:
  普通箱先承担开局责任：一次 pull 同时打开上层入口并预置同一只箱子；P/L 的右拉与右推发生在中段，移动边界；最后普通箱 push 回收开局预置。
causal_chain:
  1. step 1：普通箱 pull，打开去上层的入口并把箱子放到目标旁。
  2. step 9：从 L 侧右拉 P/L，完成长边同向第一段。
  3. step 19/20：从 P 侧右推 P/L 两次，完成同向推动并形成足够边界位移。
  4. step 24：回到底部从左侧 push 同一只普通箱入目标。
why_not_execution:
  这是第五关教学候选，允许强引导；重点是因果链清楚，而不是开放搜索。主要风险是连续第二次 P/L 右推更像强化而非新洞见。
falsification:
  若存在缺少 anchor_pull_right、anchor_push_right、crate_pull、crate_push 的胜路，或少于三次 P/L boundary shift 的胜路，则 claim 不成立。

## Evidence

solver_result:
  found: true
  cost: 24
  inputs: `right down left left up up up left right down down down left left left up up up right right down right down right`
trace_summary:
  - step 1: `pull_object:crate#1`; ordinary crate opens the upper route and is prepositioned by the lower target.
  - step 9: `pull_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; P/L right pull.
  - step 19-20: `push_object:push_pull_anchor`, `anchor_boundary_shift:push_pull`; P/L right push twice.
  - step 24: `push_object:crate#1`; same ordinary crate covers final target.
graph:
  status: complete
  reachable_states: 85
  legal_transitions: 168
  winning_states: 15
  solution_irreversible_steps: 4
  forced_win_prefix: 4/4
direction_core:
  artifact: prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.md
  status: complete
  found_bypass: false
  required_groups:
    - anchor_pull_right
    - anchor_push_right
    - crate_pull
    - crate_push
  explored_states: 100
anchor_shift_count_min3:
  artifact: prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_anchor_boundary_shift_push_pull_min3.md
  status: complete
  found_bypass_below_count: false
  explored_states: 85
review:
  evidence_review: pass
  puzzle_critic: accept
evidence_limits:
  - 主分析的 target detector 未配置；旁路证明来自 directional probe 和 event-count probe。
  - 不声明唯一输入序列。
  - 不声明完全禁止垂直 P/L 交互，只声明胜路必经水平同向长边拉和推。
  - 不归档；等待 human playtest 评分。

## Archive Taste Context

examples:
  - candidate_id: RA_CAND_0010
    human_comment: 结构简单，逻辑清晰
    calibration_use: 第五关也应优先保持清楚的机制链。
  - candidate_id: RA_CAND_0004
    human_comment: 下方结构有趣，但上方顺序和下方操作顺序完全无关。
    calibration_use: v4 用同一个普通箱开局和收尾，避免任务拼接。
  - candidate_id: RA_CAND_0006
    human_comment: 小目标位置变化弱化机制美感并抬高路线复杂度，仅做反例。
    calibration_use: v4 压缩路线长度，避免用复杂度冒充机制美感。

## Artifact Refs

- prototypes/reality_anchor/docs/关卡规划.md
- prototypes/reality_anchor/reports/revised_design_claim_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.zh.md
- prototypes/reality_anchor/reports/RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_layout.txt
- prototypes/reality_anchor/reports/layout_analysis_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.md
- prototypes/reality_anchor/reports/direction_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4.md
- prototypes/reality_anchor/reports/event_count_probe_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_anchor_boundary_shift_push_pull_min3.md
- prototypes/reality_anchor/reports/evidence_review_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_review_4.md
- prototypes/reality_anchor/reports/puzzle_critic_RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v4_review_4.md
