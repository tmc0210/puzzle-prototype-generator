# Fresh Design Claim: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v0

```yaml
prototype: reality_anchor
candidate_family: RA_EXP_2026_07_04_DUAL_LOCKSTEP
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
  why_not_archive_variant: >
    本轮 brief 要求新设计并提交候选，没有授权从 RA_CAND_0001 派生。
    RA_CAND_0001 只作为人类正向审美校准，不作为布局、因果链、对象角色或路线起点。

brief:
  intended_role: challenge
  difficulty_or_support_expectation: late-game high difficulty attempt, support none
  required_objects:
    - exactly one P/L push_pull_anchor
    - exactly one B/S box_sticky_anchor
  allowed_exposure_through: all_current_reality_anchor_runtime_rules
  score_target: unscored_by_request_due_to_sparse_archive_calibration

archive_taste_context:
  positive_anchor:
    id: RA_CAND_0001
    human_reviewed: true
    human_comment: >
      机制使用多样、关卡设计密度高、各要素强耦合，玩家视角矛盾明显，
      综合质量较高的好关。
  negative_anchor_none_found: >
    reality_anchor clean archive 当前只有 RA_CAND_0001 一条人评正例；
    没有低分、失败或下界人评例。本轮不声明数值审美/难度目标。
```

## 设计目标

玩家洞见：

```text
两类锚点不是串联展示，而是互相“欠债”：P/L 必须被 reposition 来改变可用力学模式，
B/S 必须被 reposition 来改变材料相位。后期目标不是把一个箱子推到点上，而是让玩家
先制造一个会被后续力学模式消费的材料结构，再用另一锚点打开收束动作。
```

因果链假设：

```text
1. 初始布局给出至少两个目标债务，其中一个目标不能被直接箱推解决。
2. 玩家需要在 push 和 pull 两种区域之间切换，移动 P/L 不是装饰而是改变关键动作可行性。
3. 玩家需要移动 B/S，使 crate/sticky 在不同侧发生 box_to_sticky / sticky_to_box。
4. 至少一次 sticky_merge 或 sticky_split 产生后续可推动/可拉动的刚体形状。
5. 最终胜路需要两种 anchor_boundary_shift，并需要 pull_object、material normalization、
   sticky rigid movement；若其中任一机制被绕开，候选降级或废弃。
```

为何不是执行题：

```text
执行长度本身不算难点。候选必须让局部可行动作与最终目标相冲突：过早移动锚点、把材料
放在错误侧、或先解决容易目标，应导致玩家失去必要的后续结构，形成可读的状态债务。
```

可证伪点：

```text
- 返回最短解只用单一锚点，或另一锚点只被推着经过但不改变后续可行性。
- 没有 box_to_sticky/sticky_to_box/sticky_merge/sticky_split 等材料事件。
- sticky rigid movement 只作为搬运长度，不形成目标债务或收束结构。
- graph 未穷尽时，不能声明 forbidden-reachable 或 all-solution necessary。
- critic 判断玩家可靠局部 affordance 解完，不需要上述洞见。
```

工具问题：

```text
- 是否可求解，返回解是否同时含两类 anchor_boundary_shift、pull、材料归一化和黏块运动。
- 完整图能否在预算内枚举；若能，是否支持事件组在胜路上不可绕过。
- 关键对象参与是否至少显示两个锚点与黏/箱材料均参与返回解。
```
