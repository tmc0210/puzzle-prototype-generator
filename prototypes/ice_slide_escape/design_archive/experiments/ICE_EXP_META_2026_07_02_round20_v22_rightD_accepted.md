# Experiment: ICE_EXP_META_2026_07_02_round20_v22_rightD

```yaml
experiment_id: ICE_EXP_META_2026_07_02_round20_v22_rightD_accepted
prototype: ice_slide_escape
terminal_state: accepted
candidate_id: ICE_CAND_0034
review_integrity: human_review
archive_eligibility: clean_archive
human_final_status: accepted
required_action: none
```

## 目标

本轮目标是 meta-first 设计尝试。人类后续要求继续微调同一骨架，直到 base 和
meta 流程有显著逻辑链差异且无 fatal。最终采用 `V22_rightD`，放弃后续
`V26_plugD` 右侧出口塞版本，因为其最后一步显得刻意。

## 候选

```text
############.#
###..######..#
###I.######...
###*......I.##
########...###
####.G..I.####
###.II.G.#####
###.....######
###.###.######
```

Interfaces:

```yaml
A: [3, 8]
B: [7, 8]
C: [12, 0]
D: [13, 2]
base_instance: A -> B
meta_instance: C -> D
```

## 设计结论

```yaml
terminal_claim: >
  accepted. Base 是低难度 d1+d4 两推 witness；meta 通过 d6 后左推 [8,5]，
  扰乱并改写下方结构，再复用 [5,6] / [4,6] 与 [3,2] 完成回访链。
  它不是完全复刻 base 的简单 d1+d4，但也不是高难 meta。
human_score:
  aesthetic_score: 4
  aesthetic_label: 亮点候选
  difficulty_score: 2
  difficulty_label: 简单练习
  difficulty_detail: "base 2-, meta 3 左右"
```

## 证据摘要

```yaml
base:
  instance: A->B
  result: solved
  cost: 14
  pushes: 2
  required_events:
    - ice_rebound_d4
  graph: "complete, states=14236, transitions=37854, wins=9"
  forbidden_reachable_late_events:
    checked:
      - ice_destroy_group_d6_plus
      - slide_restart_after_group
      - ice_pass_through_d5
    hits: none
  required_push:
    required:
      - "[5,6]"
      - "[4,6]"
    not_required:
      - "[8,5]"
      - "[3,2]"
meta:
  instance: C->D
  result: solved
  cost: 49
  pushes: 6
  required_events:
    - ice_destroy_group_d6_plus
    - ice_rebound_d4
  graph: "complete, states=9819, transitions=24603, wins=1"
  required_push:
    required:
      - "[8,5]"
      - "[5,6]"
      - "[4,6]"
      - "[3,2]"
routing:
  AB_to_C: no_solution
  AB_to_D: no_solution
  full_edge_goal_scan:
    edge_goals_checked: 42
    A_solved_only: ["A", "B"]
    B_solved_only: ["A", "B"]
    C_solved: ["C", "D", "A", "B"]
    D_solved: ["C", "D", "A", "B"]
    non_interface_solved: []
    ignored_reverse_pairs:
      - C->A
      - C->B
      - D->A
      - D->B
review:
  review_22:
    verdict: proposal_ready_with_caveats
    required_action: none
  rejected_later_variant:
    id: V26_plugD
    reason: "右侧出口塞版本无 fatal，但最后一步刻意；人类要求按原本版本归档。"
```

## Human Review

```yaml
human_comments:
  - id: HC_ICE_CAND_0034_001
    author: human_designer
    status: accepted
    aesthetic_score: 4
    difficulty_score: 2
    difficulty_detail: "base 2-, meta 3 左右"
    text: >
      较为优秀的设计，亮点在于meta回访时左推（8，5）的冰扰乱下方结构，
      带来新解法而非完全复刻base流程的简单d1+d4 。难度实际应为base2-，
      meta3左右。
```

## Review Notes

```yaml
review_iterations:
  - review_20:
      candidate: V19a
      verdict: proposal_ready_with_caveats
      required_action: none
      notes: "确认 [8,5] 在实际布局中是 meta-only required，不是删除开洞伪 required。"
  - review_21:
      candidate: V21_shell
      verdict: proposal_ready_with_caveats
      required_action: none
      notes: "加外壳关闭底边非接口 edge escape。"
  - review_22:
      candidate: V22_rightD
      verdict: proposal_ready_with_caveats
      required_action: none
      notes: "C/D 改为不同侧且不相邻；未破坏核心证据。"
  - review_23:
      candidate: V26_plugD
      verdict: held_proposal
      required_action: hold
      notes: "更像通行出口，但 D exit-only 且出口塞动作刻意；不采用。"
caveats_retained:
  - "base 自身是低难度两推 witness。"
  - "不要过度声称 base/meta 完全不同；meta 的新意来自 [8,5] 左推扰乱下方结构后的重读。"
  - "外壳是 routing 修补，但关闭了真实非接口边界风险。"
```

## 归档备注

本候选应作为审美 4 的 meta-first 正例使用，不应按高难 capstone 检索。它的
校准价值在于：base 很轻，但 meta 回访通过 [8,5] 左推改变下方结构读法，使
同一空间出现足够的新解法差异；它不是 0020 式纯 functional connector，也不是
0024 级强空间复用。
