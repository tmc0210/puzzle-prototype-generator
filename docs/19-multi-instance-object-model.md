# Multi-Instance Object Model

本文档定义可泛化的多实例对象建模规则。它适用于多个箱子、多组传送门、多个可操作角色、多个钥匙/开关、多个嵌套世界入口等常见 Sokoban-like 需求。

核心原则：

```text
多实例对象必须成为机制 IR、runtime、solver、analyzer、知识和课程规划的一等概念。
不能靠事件计数或对象名字特例来临时处理。
```

## 分层

多实例对象至少分成四层：

```text
object type:
  crate, portal, actor, key, switch

object instance:
  crate#1, crate#2
  portal#A, portal#B
  actor#red, actor#blue

relation:
  paired(portal#A, portal#B)
  controls(switch#red, door#red)
  active_actor(actor#blue)

causal role:
  blocker, key, door, carrier, relay, anchor, trigger, consumer
```

玩家知识通常应停留在 type / relation / causal role 层。`crate#1` 这类实例名主要是 runtime 和 analyzer 的证据语言，不应轻易进入课程目标。

## Identity Policy

每个可多实例对象类型都必须声明身份策略。

```yaml
objects:
  crate:
    multiplicity: many
    identity_policy: indistinguishable
    visible_distinction: none
    semantic_distinction: none
```

或者：

```yaml
objects:
  actor:
    multiplicity: many
    identity_policy: distinguishable
    visible_distinction: color
    semantic_distinction: abilities
    control_model: switch_active_actor
```

推荐字段：

```yaml
object_instance_model:
  multiplicity: one | optional | many | fixed_count
  identity_policy: indistinguishable | distinguishable | relational
  visible_distinction: none | color | glyph | label | position_only
  semantic_distinction: none | traits | rules | inventory | relation_membership
  max_recommended_instances: number | unknown
```

含义：

- `indistinguishable`: 同类实例对规则完全等价，玩家也不需要区分。例如普通箱子。
- `distinguishable`: 实例有玩家可见或规则可见差异。例如红蓝角色、彩色箱子。
- `relational`: 实例本身可能相似，但通过关系获得身份。例如传送门 A/B 配对、开关绑定门。

## Relation Model

传送门、多角色、开关门、钥匙锁通常不是单个对象能说明的，需要关系表。

```yaml
relations:
  - id: portal_pair
    type: symmetric_pair
    members:
      - portal#A
      - portal#B
    semantics:
      enter_one_exits_other: true

  - id: active_actor
    type: singleton_selection
    domain: actor
    value: actor#red
```

关系必须进入状态 hash，如果它会影响未来规则或胜利条件。例如：

- 可重配对传送门。
- 当前 active actor。
- 已经被钥匙绑定或消耗的锁。
- 嵌套世界入口指向哪个子世界。

## Binding Variables

关卡规格不应硬编码实例，除非关卡目标确实要求特定实例。更推荐使用绑定变量。

双箱要求：

```yaml
bindings:
  X:
    object_type: crate
  Y:
    object_type: crate
constraints:
  - X != Y
role_claims:
  - subject: X
    role: opens_or_closes_reachability
  - subject: Y
    role: creates_later_rule_precondition
```

多传送门组要求：

```yaml
bindings:
  P:
    relation_type: portal_pair
  Q:
    relation_type: portal_pair
constraints:
  - P != Q
event_requirements:
  - type: teleport
    relation: P
  - type: teleport
    relation: Q
```

多角色要求：

```yaml
bindings:
  A:
    object_type: actor
  B:
    object_type: actor
constraints:
  - A != B
  - A.ability != B.ability
role_claims:
  - subject: A
    role: creates_access_for
    object: B
```

## Structured Events

多实例证据不能只靠字符串事件名。

弱形式：

```text
pull_crate:crate#1
push_crate_failed:crate#1
portal_exit_blocked_by_crate:crate#1
portal_teleport:A->B
switch_toggle:switch#red
```

更好的长期形式：

```ts
type Event = {
  type: string;
  actor?: string;
  object?: string;
  relation?: string;
  from?: Point;
  to?: Point;
  direction?: Direction;
  rule?: string;
  branch?: string;
};
```

事件模式应支持按类型、实例、关系和约束匹配：

```yaml
event_pattern:
  type: pull
  object:
    type: crate

event_aggregate:
  type: pull
  object:
    type: crate
  distinct_objects_at_least: 2
```

注意：

```text
pull_crate 出现两次 != 两个箱子参与。
pull_crate:crate#1 与 pull_crate:crate#2 才能证明两个实例都被移动过。
portal_exit_blocked_by_crate:crate#1 可以作为“某个箱子实例制造了后续规则前提”的 trace 证据。
```

## Object Participation Evidence

“用了多个对象”是对象参与度约束，不是裸知识。

```yaml
object_participation_requirements:
  - object_type: crate
    role: moved
    min_distinct_instances: 2
    scope: all_shortest_solutions
```

scope 必须明确：

```text
winning_solution:
  evaluator 返回的 canonical winning solution 中满足。

all_shortest_solutions:
  所有最短解中满足。

all_winning_paths:
  完整图中所有通关路径中满足。

probe_trace:
  replayed probe trace 中满足，适合边界或失败观察。
```

更强证据应声明状态变化被后续消费：

```yaml
object_role_claims:
  - object_type: crate
    min_distinct_instances: 2
    required_consumed_roles:
      - opens_or_closes_reachability
      - blocks_or_unblocks_interaction
      - creates_later_rule_precondition
```

证据等级：

```text
trace:
  某条 replay trace 中有多个实例参与。

optimal:
  所有最短解中有多个实例参与。

full_graph:
  所有通关路径都满足，或存在完整图上的支配/割点证据。

heuristic:
  LLM / 人类认为多个实例承担了角色，但没有形式化验证。
```

## Knowledge And Curriculum

对象数量递进通常是 variation axis，不天然是知识。

```text
single crate
-> two equivalent crates with separate causal roles
-> three crates with role assignment / ordering burden
```

只有当数量变化引入新的玩家能力时，才提升为 ability 或 pattern。

```yaml
possible_ability:
  id: A_coordinate_multiple_equivalent_objects
  goal_transform:
    from: one_precondition_satisfied
    to: multiple_separate_preconditions_satisfied

possible_pattern:
  id: P_same_type_objects_different_roles
  structure:
    - at_least_two_instances_same_type
    - instances_have_different_consumed_roles
```

不要生成这种伪知识：

```text
K_use_two_crates
K_pull_crate_twice
K_use_portal_A_and_portal_D
```

更好的写法：

```text
variation axis: number_of_required_crate_instances = 2
pattern: same-type objects with distinct causal roles
ability: coordinate multiple equivalent objects
```

## State Canonicalization

求解器可以利用身份策略做安全 canonicalization。

```text
indistinguishable crate:
  sort crate positions in state key

distinguishable actor:
  keep actor identity in state key

relational portal:
  keep portal identity and pair relation in state key
```

如果状态合并丢失了未来规则所需的信息，则优化不安全。

危险例子：

```text
两个普通箱子可排序。
红箱子和蓝箱子不可排序。
A/B 传送门不可排序，除非同时证明配对关系和所有规则在重命名下完全对称。
多角色不可排序，因为 active actor、能力、位置都会影响后续输入。
```

## Analyzer / Reporter Requirements

为了支持多实例证据，analyzer 应逐步提供：

```text
参与实例集合:
  which object instances appear in key events

实例轨迹:
  each participating instance position over solution trace

角色消费:
  whether an instance's changed state is later consumed

数量绕过:
  whether a winning path exists with fewer distinct participating instances

关系使用:
  which relation instances are used, e.g. which portal pair
```

报告示例：

```text
Object participation:
  crate: moved distinct instances = 2
  crate#1: pulled at steps 2, 3; later blocks exit cell (5,2)
  crate#2: pulled at step 7; later opens corridor cell (3,4)

Bypass check:
  no shortest solution found with moved crate instances < 2
  full graph complete: all winning paths require moved crate instances >= 2
```

## Agent Preflight Questions

当用户提到“多个箱子、多组传送门、多个角色、多个钥匙”等需求时，agent 必须确认或记录：

```text
1. 该对象是否允许多个？数量上限或推荐范围是多少？
2. 多个实例是否可区分？通过颜色、图标、编号、位置、能力还是关系？
3. 实例之间是否有关系？配对、分组、绑定、共享状态、互斥激活？
4. 胜利条件绑定的是任意实例、全部实例、特定实例，还是某个关系状态？
5. 对象数量是否是课程递进变量？
6. 多实例协作是否是核心机制、辅助变化，还是只用于少数挑战关？
7. solver 是否允许对该类型做同类对象排序？
8. analyzer 需要证明“多个实例参与”，还是只需要允许它们存在？
```

不能确认时，必须把依赖该答案的实现或关卡规划标为 `open`。

## Current Pull/Portal Case Study

当前 `pull_portal_fallback` prototype 的合理读法：

```yaml
crate:
  multiplicity: many
  identity_policy: indistinguishable
  semantic_distinction: none

portal:
  multiplicity: many
  identity_policy: relational
  relation: symmetric_pair
  supported_pairs: [A/B, D/E, H/I]
```

课程上：

```text
双箱 / 三箱不应自动成为知识。
它们应先作为 variation axis。
当关卡要求不同箱子承担不同被消费角色时，可以形成 pattern 或 ability。
```

代码上当前缺口：

```text
runtime 已支持多个普通 C。
solver state key 已对 crate 位置排序。
trace 已输出 pull_crate:crate#N 形式的单解 lineage id。
trace 已输出 push_crate_failed:crate#N 和 portal_exit_blocked_by_crate:crate#N 作为实例级辅助证据。
analyzer 已报告 returned solution 上的 trace-level distinct participating instances。
analyzer 还不能证明 all_shortest_solutions / all_winning_paths 上的 distinct participating crates >= N。
事件仍是字符串实例事件，尚未升级为长期 structured event。
```
