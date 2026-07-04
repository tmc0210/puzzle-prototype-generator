# Reality_Anchor Raw Sampler Prior v1

状态：`raw_sampler`。它不是 `curated_miner`、不是质量分、不是关卡验收门槛。

这个矿工只用于发现可复查的机制现象：推/拉力传递、可移动锚点、箱黏边界归一化、
黏块合并/拆分和双锚点组合。报告里的 layout 是素材，不是候选关卡。

## 工具成熟度

```yaml
tool_id: reality_anchor_raw_sampler_v1
maturity: raw_sampler
evidence_level: runtime_events_plus_complete_graph_plus_design_surface_hints
purpose: 为 designer 排序可复查的机制发现和结构灵感
not_for:
  - accepted gate
  - curriculum coverage
  - proof of teaching quality
  - proof of no bypass
  - proof of unique solution
  - proof that returned-solution events are necessary on every win path
  - proof that a low-prior mechanic is bad
```

## 硬门槛

一个 finding 进入报告前必须满足：

```yaml
hard_gates:
  - layout_parses
  - solver_finds_win
  - returned_solution_replays
  - solution_has_non_walk_mechanism_event
  - graph_status_is_complete
```

完整 graph 只说明当前预算下状态图枚举完成，可报告 SCC / graph 摘要。它不证明
唯一解、不证明 no-bypass，也不证明返回解中的事件在所有胜利路径中必经。

## 标签

运行时事件标签来自返回解事件：

```yaml
runtime_tags:
  push_object: player pushes a movable object
  pull_object: player pulls the adjacent object behind them
  force_chain: force propagates through more than one object
  anchor_boundary_shift_push_pull: P/L anchor moved
  anchor_boundary_shift_box_sticky: B/S anchor moved
  move_sticky_rigid: a sticky block moved as a rigid body
  box_to_sticky: crate normalized into sticky world
  sticky_to_box: sticky cell normalized into box world
  sticky_merge: adjacent sticky cells merged
  sticky_split: one sticky component split after normalization
```

设计表面积标签只帮助排序和阅读：

```yaml
design_surface_tags:
  dual_anchor_interaction: P/L and B/S anchors coexist in the sample
  boundary_sweep_normalization: moving B/S anchor also changes box/sticky state
  sticky_merge_after_conversion: conversion creates or joins a sticky block
  sticky_split_after_conversion: normalization splits sticky connectivity
  rigid_block_constraint: sticky rigidity is visible in the returned solution or layout
  mixed_force_modes: returned solution has both push and pull events
  multi_object_force_chain: returned solution has force_chain
  two_dimensional_structure: layout is spatial material rather than a pure row probe
  short_witness: solution is very short and likely needs designer rewriting
  branching_win_dag: SCC summary has branching win DAG shape
```

## 默认排序

`rawInterestScore` 是搜索优先级，不是机制质量评价。默认排序偏好：

```yaml
positive_bias:
  - dual_anchor_interaction
  - boundary_sweep_normalization
  - sticky_merge_after_conversion
  - sticky_split_after_conversion
  - anchor_boundary_shift_box_sticky
  - anchor_boundary_shift_push_pull
  - multi_object_force_chain
  - mixed_force_modes
  - two_dimensional_structure
negative_bias:
  - short_witness
  - walk_only
  - graph_incomplete
```

负权重只能降低排序，不能当作 hard ban。若本轮设计要求“必须使用某些机制、不能
触发另一些机制”，应把 mined layout 改写成候选后再跑专门的 required-winning /
forbidden-reachable 证据。

## 调用建议

默认探索：

```text
npx tsx src/cli.ts mine prototypes/reality_anchor
```

快速复查：

```text
npx tsx src/cli.ts mine prototypes/reality_anchor --preset quick --iterations 16 --max-findings 4
```

更高预算探索：

```text
npx tsx src/cli.ts mine prototypes/reality_anchor --preset deep --iterations 32 --max-findings 6 --max-states 12000 --graph-max-states 12000
```

用权重寻找双锚点和边界扫过素材：

```text
npx tsx src/cli.ts mine prototypes/reality_anchor --weight dual_anchor_interaction=20 --weight boundary_sweep_normalization=20 --weight sticky_merge_after_conversion=12
```

## 报告解读

高 `rawInterestScore` 应读作：

```text
这个 finding 符合当前机制发现 / 设计灵感搜索偏好，值得 designer 复查。
```

不要读作：

```text
这是好关。
这已经教学成功。
这没有 bypass。
这个分支比低分分支更适合最终流程。
```

每个有用 finding 必须先改写成 fresh `design_claim`、probe、variation axis 或 negative
result，再进入 candidate packet / review loop。
