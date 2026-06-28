# Player Model Derivation

本文档描述未来 agent 如何从任意规则集推导玩家模型。它只记录可泛化流程，不记录某个原型的迁移历史。

目标输出：

```text
player_model.yml
  facts
  constraints
  interactions
  abilities
  patterns
```

## 总原则

推导分两层：

```text
规则可直接支持的条目
-> fact / constraint / interaction

需要设计归纳的条目
-> ability / pattern
```

第一层应尽量机械化。第二层可以由 LLM 辅助，但必须保留来源、前置、procedure/structure 和 evidence 计划。

## 输入

agent 至少需要读取：

```text
mechanic.yml
  objects
  traits
  inputs
  rules
  branches
  emits
  teaches
  win
  counterfactuals

levels.yml, if available
  layouts
  roles
  expected traces
  target events

confirmed preflight decisions
  win condition
  unresolved interactions
  side-effect defaults
```

没有确认的规则语义不能推导成事实；只能变成 open question。

## Step 1: 提取 Rule-Surface

先机械提取规则表面：

```text
objects and traits
inputs and intents
rules and branches
preconditions
effects
emitted events
disabled counterfactuals
win condition
```

输出不是玩家模型，而是候选素材。

## Step 2: 生成 Facts

facts 来自肯定性、玩家可观察的规则结果：

```text
rule/branch has effect that changes player/object/world
and emits observable event
and represents normal successful behavior
```

例子：

```text
pull_single_crate -> F_pull_single_crate
normal_teleport -> F_portal_teleports_player
win.player_on_goal -> F_player_reaches_goal_to_win
```

不要把失败分支放进 facts。

## Step 3: 生成 Constraints

constraints 来自失败、前提、不可行或边界：

```text
cancel_action
blocked precondition
destination must be free
object/trait blocks action
old model no longer applies
```

例子：

```text
cannot_push_crate -> C_cannot_push_crate
pull requires opposite crate -> C_pull_requires_crate_behind_player
fallback requires entrance destination free -> C_fallback_push_requires_free_portal_destination
```

注意：constraint 可以是重要教学目标，但不应伪装成正向能力。

## Step 4: 生成 Interactions

interactions 来自多对象、多机制或优先级分支：

```text
branch condition mentions paired object
rule behavior depends on another mechanism state
fallback/exception/priority overrides normal behavior
```

例子：

```text
blocked portal exit prevents normal teleport
blocked portal exit pushes entrance portal
crate can block portal exit
wall can block portal exit
```

interaction 的关键是“两个机制相遇时发生什么”，不是玩家如何利用它。

## Step 5: 归纳 Abilities

abilities 不应直接从每条规则一对一生成。它们通常来自：

```text
一个或多个 facts/constraints/interactions 的可执行组合
能够达成可复用 goal_transform
可写出 procedure_sketch
可设计至少一个练习关
```

判定问题：

```text
玩家掌握了什么手段？
这个手段把局面从什么状态变成什么状态？
它依赖哪些事实/边界/交互？
它的典型步骤是什么？
未来如何观察它？
```

反例：

```text
“玩家可以利用机制解题”
```

太抽象，不是合格 ability。

合格形状：

```yaml
id: A_create_blocked_portal_exit_with_crate
goal_transform:
  from: paired_portal_exit_open
  to: paired_portal_exit_blocked_by_crate
procedure_sketch:
  - identify_paired_exit_cell
  - move_crate_to_exit_cell
  - preserve_access_to_entrance_portal
```

## Step 6: 归纳 Patterns

patterns 来自关卡结构，而不是单条规则。它们通常来自：

```text
solution sketch
level layouts
solver traces
designer intent
reusable bottleneck / dependency / resource shape
```

判定问题：

```text
这个局面长什么样？
玩家必须识别什么结构关系？
需要哪些 ability？
可以沿哪些 variation_axes 出题？
未来用什么 graph/trace/LLM 玩家证据观察？
```

反例：

```text
“使用传送门”
```

太宽泛，不是合格 pattern。

合格形状：

```yaml
id: P_construct_trigger_then_exploit
structure:
  - initial_state_does_not_trigger_exception
  - player_can_construct_exception_condition
  - constructed_condition_unlocks_later_goal_progress
variation_axes:
  - trigger_object_type
  - distance_between_setup_and_trigger
  - whether_setup_must_be_preserved
```

## Step 7: 防止迁移脚手架污染模型

不要把旧格式兼容信息、一次性迁移记录或某个原型的历史建模债务写进 `player_model.yml`。这些内容不是玩家模型。

允许在外部工程记录中说明一次性迁移，但不要把这类字段放入泛化 schema。

原则：

```text
player_model.yml 只描述玩家模型。
迁移记录只属于工程记录。
未来课程规划应直接引用 player_model 条目。
```

## Step 8: 标记开放问题

凡是规则没有确认的内容，必须保留为 open question：

```text
玩家进入传送门时，背后正在被拉的箱子会发生什么？
传送门被推进另一个传送门会发生什么？
出口落点是传送门格、门外一格，还是方向相关格？
```

open question 不阻止已有条目存在，但会阻止依赖该语义的 runtime、solver 或正式关卡生成。

## 可机械化的部分

适合脚本或 MCP 自动生成：

- 从 rules/branches/emits 生成 fact/constraint/interaction 候选。
- 从 cancel_action 和 failed events 生成 constraint 候选。
- 从 branch condition 的多对象引用生成 interaction 候选。
- 从 counterfactuals 生成 evidence hints。
- 从 levels expected_events 建立 candidate evidence。

## 需要 LLM 辅助的部分

适合 LLM 辅助，但必须受 schema 约束：

- 合并过细 fact。
- 拆分 mixed 条目。
- 命名 ability。
- 归纳 pattern。
- 写 procedure_sketch 和 variation_axes。
- 识别哪些 open question 会影响出题。

LLM 不能直接给出“已证明”。它只能给 `source.kind: manual` 或 `evidence.status: informal/future`，除非工具已经产生 trace/full_graph 证据。

## 质量检查

生成后检查：

```text
每个 ability 是否有 goal_transform？
每个 ability 是否有 procedure_sketch？
每个 pattern 是否有 structure？
每个 pattern 是否有 required_abilities？
是否存在一句话空泛条目？
是否存在 mixed 条目未拆？
是否所有 open question 都被记录？
是否还有旧 knowledge 兼容字段混入 player_model？
```
