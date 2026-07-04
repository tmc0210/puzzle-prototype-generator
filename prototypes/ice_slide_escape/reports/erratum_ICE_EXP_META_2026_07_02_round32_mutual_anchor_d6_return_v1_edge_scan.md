# Erratum: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1 Edge Scan

```yaml
candidate: ICE_EXP_META_2026_07_02_round32_mutual_anchor_d6_return_v1
erratum_type: evidence_gap_and_design_downgrade
trigger: human_review_feedback
previous_submission_state: proposal_ready_with_caveats
corrected_state: revise_required
required_action: structural_revision
```

## 问题

原提交只证明了：

- 初始可站立边缘格只有 `[0,3]` 与 `[15,0]`；
- 声明 pair `A->B` 与 `C->D` 可解；
- self pair 零步只作为 `verdict_effect: none`。

但 `ice_slide_escape` 的 solver contract 允许 `player_goal` 初始是墙，只要后续能被破坏成可站立边缘 goal。因此只扫描 edge floor 不足以证明没有其它 edge-goal escape。

## 重新扫描结果

布局：

```text
###############.##
###############.##
#...###########.##
..#.*....*....*.##
####I....I....####
##################
##################
##################
```

从 `A = [0,3]` 到所有 edge goal 的可解结果：

```yaml
A_solvable_goals:
  - goal: [15, 0]
    initial_cell: "."
    cost: 44
    intended: true
  - goal: [0, 3]
    initial_cell: "."
    cost: 0
    self_pair: true
  - goal: [0, 4]
    initial_cell: "#"
    cost: 33
    unintended_edge_escape: true
  - goal: [17, 4]
    initial_cell: "#"
    cost: 42
    unintended_edge_escape: true
```

从 `B = [15,0]` 到所有 edge goal 的可解结果：

```yaml
B_solvable_goals:
  - goal: [15, 0]
    initial_cell: "."
    cost: 0
    self_pair: true
  - goal: [0, 3]
    initial_cell: "."
    cost: 42
    intended_meta_return: true
  - goal: [0, 4]
    initial_cell: "#"
    cost: 41
    unintended_edge_escape: true
  - goal: [17, 4]
    initial_cell: "#"
    cost: 30
    unintended_edge_escape: true
```

## 设计影响

这不是小 caveat。按 `meta_first_design` 的 interface policy，`A/B/C/D -> edge goals outside A/B/C/D` 是风险项；这里 A 和 B 都能解到 `[0,4]` / `[17,4]` 这两个接口外边缘墙 goal。原提交的 edge evidence 不足，且候选不能继续作为合格提交。

此外，human review 指出“退化为反向可解不应自动视为合理 meta；玩家通常没有足够动机原路返回”。这个 critique 命中本候选核心：`A=D` / `B=C` 的重合接口让 meta payoff 主要读作 reverse solve，而不是自然的 meta-first return pressure。

## 更正结论

```yaml
controller_correction:
  previous_controller_decision: submit_qualified_candidate
  corrected_controller_decision: retract_as_qualified_submission
  corrected_review_loop_state: revise_required
  required_action: structural_revision
  reason:
    - "全边缘 goal 扫描发现 unintended edge escapes"
    - "meta 动机退化为反向可解，不足以支撑合格 meta-first"
```

## 左下角冰块作用

`[4,4]` 的左下角冰不是直接封路件。它主要是第 4 行 support / stopper：

- base 中，`[9,4]` 的 support ice 被向左推动时，需要 `[4,4]` 作为障碍/锚点触发 d4 回弹，形成后续 row-4 support 位置。
- base 最后从 row 4 向右推 support ice，触发 `ice_destroy_group_d6_plus:len4` 并打开右侧边缘墙路线。
- meta 中同理反向使用 row-4 support material，最终触发 `ice_destroy_group_d6_plus:len5` 打开左侧回程。

所以它是 d4/d6 support 材料，不是 target-lock 的一部分。这个也解释了为什么它在审美上削弱“所有目标已满足就是锁”的纯粹性。
