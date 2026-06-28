# Player Model Ontology

本文档记录未来从规则集生成玩家知识、能力和关卡职责时使用的轻量本体。它面向可泛化能力，不记录某个原型的迁移历史。

核心原则：

```text
分类用于建模和生成，不等于证明。
进入 evaluator 的只能是 evidence。
```

## 分层

推荐分层：

```text
rule fact / constraint / interaction
-> ability
-> pattern
-> level role
```

含义：

- `fact`: 规则事实。世界如何运行。
- `constraint`: 约束、失败分支、旧模型的边界。
- `interaction`: 两个或多个机制相遇时的优先级、例外、fallback。
- `ability`: 玩家掌握的一类操作手段。
- `pattern`: 关卡反复使用的一类结构问题。
- `level role`: 某一关承担的教学或评估职责。

## 判定流程

agent 生成条目时，先按以下问题分类：

```text
它描述的是规则如何运行？=> fact / interaction / constraint
它描述的是玩家能执行什么手段？=> ability
它描述的是关卡局面长什么样？=> pattern
它描述的是这一关要承担什么教学任务？=> level role
它只是某个具体解法步骤？=> solution sketch，不要上升为知识/能力
```

如果无法判断，不要强行分类。使用：

```yaml
classification: ability_candidate
confidence: low
open_question: 这个条目更像玩家手段，还是关卡结构？
```

或：

```yaml
kind: mixed
split_suggestion:
  - ability: A_repeat_fallback_push
  - pattern: P_open_corridor_by_moving_portal
```

## Ability

`ability` 描述玩家能够执行的一类手段。它偏玩家侧，回答：

```text
玩家会做什么？
玩家用什么前置知识完成什么状态转换？
```

推荐结构：

```yaml
ability:
  id: A_create_blocked_portal_exit
  kind: ability
  statement: 玩家能用可移动物体主动堵住传送门出口。
  actor: player
  goal_transform:
    from: portal_exit_unblocked
    to: portal_exit_blocked_by_movable_object
  prerequisites:
    - F_pull_single_crate
    - I_portal_exit_can_be_blocked
  procedure_sketch:
    - identify_paired_exit_cell
    - move_blocker_to_exit_cell
    - preserve_access_to_trigger_portal
  evidence:
    trace:
      required_events:
        - portal_exit_blocked
    structural:
      - blocker_occupies_paired_exit_cell_before_portal_enter
```

字段约束：

- `goal_transform` 是 ability 的核心。没有状态转换目标的条目通常不是 ability。
- `procedure_sketch` 是抽象操作步骤，不是按键序列，也不是硬证明。
- `evidence` 可以暂时是 future/unknown，但必须说明未来如何观察。

不要使用 `method` 作为字段名。它容易让 agent 误以为这是可执行算法。使用 `procedure_sketch` 或 `strategy_sketch`。

## Pattern

`pattern` 描述关卡结构中反复出现的问题形状。它偏关卡侧，回答：

```text
这个局面要求玩家识别什么结构？
哪些区域、瓶颈、资源或顺序依赖构成了问题？
```

推荐结构：

```yaml
pattern:
  id: P_open_path_by_repositioning_portal
  kind: pattern
  statement: 通路被传送门位置控制，必须改变传送门位置后才能到达目标区。
  structure:
    bottleneck:
      blocked_by: portal
    goal_region:
      inaccessible_until:
        - portal_position_changes
  required_abilities:
    - A_trigger_blocked_portal_fallback
  variation_axes:
    - corridor_orientation
    - number_of_required_pushes
    - blocker_source
  evidence:
    graph:
      - all_winning_paths_require_portal_position_change
```

字段约束：

- `structure` 是 pattern 的核心。没有结构描述的条目通常不是 pattern。
- `required_abilities` 说明玩家需要哪些手段来解决这个结构。
- `variation_axes` 用于生成变式关卡，而不是证明。
- `evidence.graph` 只有在 runtime/solver 能证明时才可进入 evaluator；否则只是未来目标或设计备注。

## 多实例对象与数量递进

多实例对象建模见 `docs/19-multi-instance-object-model.md`。在玩家模型里，数量变化通常先作为 `variation_axis`，不要自动生成知识。

错误倾向：

```text
K_use_two_crates
K_pull_crate_twice
K_use_portal_A_and_portal_D
```

这些名字通常混淆了对象数量、事件计数和玩家能力。

更好的分类：

```yaml
variation_axis:
  object_type: crate
  axis: required_distinct_instances
  values: [1, 2, 3]

ability_candidate:
  id: A_coordinate_multiple_equivalent_objects
  statement: 玩家能协调多个同类对象来满足多个不同前提。
  goal_transform:
    from: one_precondition_satisfied
    to: multiple_separate_preconditions_satisfied

pattern_candidate:
  id: P_same_type_objects_different_roles
  statement: 同类对象在同一解法链中承担不同的被消费角色。
  structure:
    - at_least_two_instances_same_type
    - distinct_consumed_roles
```

升级规则：

- 如果只是多拉了几次同一类对象，保持为 variation axis。
- 如果多个实例分别承担不同因果角色，可以成为 pattern candidate。
- 如果玩家必须规划、分配或协调多个实例来满足多个前提，可以成为 ability candidate。
- evaluator 只接受对象参与度证据，不接受“事件出现 N 次”作为多实例证明。

## Ability 与 Pattern 的区别

实用判据：

```text
如果它主要回答“玩家掌握了什么手段”，叫 ability。
如果它主要回答“这个关卡属于什么问题形状”，叫 pattern。
```

例子：

| 条目 | 分类 | 理由 |
| --- | --- | --- |
| 玩家能拉一个箱子 | fact / basic operation | 规则事实或基础操作 |
| 玩家不能推动箱子 | constraint | 失败分支或边界 |
| 玩家能用箱子堵住传送门出口 | ability | 玩家侧手段 |
| 玩家能重复触发 fallback 推传送门多格 | ability | 玩家侧手段 |
| 通过移动传送门打开通路 | pattern | 关卡结构依赖传送门位置变化 |
| 传送门作为可移动门闩/钥匙 | pattern | 一类空间问题形状 |
| 先制造堵塞，再利用 fallback，再走到目标 | solution sketch | 某类解法脚本，不一定是独立能力 |

## Level Role 的连接

关卡职责应指向不同类型的目标：

```text
discovery: 常用于 fact / interaction / constraint。
boundary: 常用于 constraint / interaction edge case。
guided_application: 常用于 ability。
independent_application: 常用于 ability。
variation_transfer: 常用于 ability + pattern 的变式。
combination: 常用于多个 ability 或 ability + pattern。
challenge: 常用于 pattern 或多个 pattern 的深度组合。
review: 常用于已学 fact / ability 的唤醒。
```

这不是硬规则。它是 agent 生成课程时的默认判断。

## Skill 抽象注意事项

未来写入 skill 时，只应保留最小可执行规则：

- 先按判定流程分类，不要直接生成一个大知识列表。
- ability 必须有 `goal_transform`。
- pattern 必须有 `structure`。
- `procedure_sketch` 不是证明。
- 无法分类时标记 candidate / mixed / low confidence。
- evaluator 只接受 evidence，不接受自然语言分类。
- 不要把迁移字段、旧格式兼容信息或某个原型的建模债务写入玩家模型。

详细示例应放入 skill 的 `references/`，不要塞进 `SKILL.md` 本体。
