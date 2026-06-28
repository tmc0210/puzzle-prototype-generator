# Ice Slide Escape Designer Contract

状态：`ice_slide_escape` 原型的 designer-facing 约束。

本文档供关卡设计者和 level-spec agent 阅读。使用时也应阅读：

```text
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
prototypes/ice_slide_escape/docs/design_directives.md
```

## 包边界

`ice_slide_escape` 是原型局部机制。它的显式边缘起终点契约和按距离分支的冰块
规则不是通用 Sokoban 规则。

不要从 `pull_portal_fallback` 推断额外行为。

## 关卡形状

本原型关卡必须是矩形网格：

```yaml
rectangular_grid_required: true
all_rows_same_width: true
formal_width_and_height: to_be_specified_later
```

scratch layout 在机制测试时可以变化尺寸。最终 accepted levels 应使用后续指定
的固定尺寸。

edge cell 指外圈行或外圈列上的任意格。外圈墙格仍然是 edge cell。

## 起点与终点写法

每个正式 solve 或 review instance 必须显式声明：

```yaml
player_start: edge_cell
player_goal: edge_cell
```

这不表示关卡只有一个固定起点或出口。同一布局可以用多个 edge start / edge
goal pair 审查；每个 pair 都是独立 solve instance。

玩家起点必须初始可站立：

```yaml
start_may_be:
  - empty
  - target_overlay_without_wall_or_ice
start_must_not_be:
  - wall
  - ice
```

玩家终点可以初始是墙。只要冰能破坏该墙并让该格可达，这个 goal 就是合法的。

起点和终点可以是同一格。solver 允许这种实例，但通常缺乏设计价值；正式质量门
可以在 level spec 中排除它。

## 元重读实例对

常规单关候选已经工作后，designer 应执行 meta reinterpretation pass。这个 pass
不是给关卡多开几个门，而是寻找同一重置布局下的两条定向 solve instance：

```yaml
base_instance:
  start: A
  goal: B
  role: 当前流程中的基础关

meta_instance:
  start: C
  goal: D
  role: 重访时的同结构重读
```

`base_instance` 必须作为普通关扎实成立。`meta_instance` 应复用同一结构材料，
但产生显著不同的解法逻辑链。它默认可以使用本原型所有知识，因为元机制被视为
最后期知识；只有 experiment brief 明确限制时才收窄。

Designer 应记录：

```yaml
meta_reinterpretation_claim:
  base_instance:
    start: [x, y]
    goal: [x, y]
    causal_chain: ""
  meta_instance:
    start: [x, y]
    goal: [x, y]
    knowledge_scope: all_prototype_knowledge | restricted_by_brief
    causal_chain: ""
  chain_delta_from_base: ""
  shared_structure: []
  latent_elements_from_base: []
  non_target_pairs: []
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
```

base 解中看似无用、弱作用、甚至当前不可推动的元素不自动扣分。若它不严重污染
base 阅读，并在 meta 解中获得明确 payoff，它可以是正向潜伏结构。若没有 payoff，
critic 仍应把它当作噪声攻击。

`C->B`、`A->D` 或其它非目标 pair 的存在不自动构成 bypass。只有当它们明显抢
走目标 meta 解读、破坏 base 解，或违反 experiment brief 时，才应打回。

跨关移动本身仍是未来范围。当前 designer loop 只检查这些接口的单关后果。

## 胜利设计

胜利状态同时要求：

```yaml
all_targets_have_ice: true
player_reaches_specific_edge_goal: true
```

每个目标格在胜利时都必须被某块冰占据。非目标格上允许有额外冰块。

目标是 overlay。目标不会停止、减速、转向或以其它方式影响冰块运动。

## Designer Checklist

提交正式候选前，检查：

```text
[ ] 网格是矩形。
[ ] 声明了具体 edge start。
[ ] start 初始可站立。
[ ] 声明了具体 edge goal。
[ ] 每个 solve instance 都把 goal 当作具体格，而不是 "any edge"。
[ ] 每个 target 在胜利时都能被冰占据。
[ ] 额外冰块不会意外制造 base bypass。
[ ] 如果 goal 初始是墙，某个必要冰块交互可以破坏它。
[ ] 候选已针对声明的 start/goal pair 求解。
[ ] 如果提出 meta reinterpretation，A->B 和 C->D 都分别记录 solve instance。
[ ] meta claim 写明 chain_delta_from_base 和 shared_structure。
[ ] base 中的潜伏元素被标记为 payoff 或噪声风险。
[ ] 非目标 pair 被记录为阅读风险，而不是自动当作失败。
[ ] 已应用 docs/design_directives.md 中的原型专属指令。
```

## Designer 可主动教学的规则 motif

这些 motif 是初始设计词汇，不是最终 curriculum：

```yaml
motifs:
  - stop_with_short_slide_distance_1_or_2
  - sacrifice_ice_with_distance_3
  - rebound_with_distance_4
  - pass_through_obstacle_group_with_distance_5
  - destroy_obstacle_group_with_distance_6_plus
  - restart_counting_after_group_interaction
  - use_ice_to_open_edge_goal_wall
  - coordinate_target_ice_with_player_edge_escape
  - reinterpret_same_layout_with_new_entry_exit
  - preserve_base_while_adding_meta_instance
```
