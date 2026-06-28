# Curriculum Ordering

本文档定义未来如何对 `player_model.yml` 中的学习目标排序。它面向可泛化能力，不依赖某个示例原型，也不引用旧式知识条目或迁移映射。

核心观点：

```text
课程排序不是 LLM 写一串列表。
课程排序是 learning targets 的依赖图，加上受约束的软排序。
```

## 输入与输出

输入：

```text
player_model.yml
  facts
  constraints
  interactions
  abilities
  patterns

confirmed preflight decisions
  win condition
  unresolved interactions
  design focus
  target level count
```

输出不是最终关卡，而是课程规划草案：

```text
target policy
learning target DAG
topological learning layers
optional bundles
role sequence suggestions
blocked targets
ordering rationale
```

后续的 `curriculum_v2` 应直接引用 `player_model` 条目，而不是引用旧式知识 id。

## Target Policy

不是所有 player model 条目都应该成为正式课程目标。课程层必须先声明 target policy：

```text
formal_targets
  值得专门出关卡引入、练习或考察的目标。

assumed_rules
  玩家可以通过说明、UI、常识或基础操作直接获得的规则。

embedded_boundaries
  需要在关卡中自然暴露，但不值得单独成为一关主题的边界。

generator_guardrails
  只约束生成器、solver 或 evaluator，不面向玩家教学。
```

例子：

```text
玩家按上下左右移动
玩家到达目标格通关
玩家不能推动箱子
```

这些可以是真规则、真前置、真约束，但通常不应自动变成正式课程目标。只有当某个限制本身会产生可复用推理、关键误区修正或后期谜题核心时，它才应进入 `formal_targets`。

## Learning Target

learning target 指玩家模型中的一个可教学目标：

```text
fact / constraint / interaction / ability / pattern
```

其中：

- `fact`: 玩家要理解世界如何正常运行。
- `constraint`: 玩家要理解某种失败、边界或旧模型不成立处。
- `interaction`: 玩家要理解多个机制相遇时的优先级、例外或 fallback。
- `ability`: 玩家要掌握一种可复用手段。
- `pattern`: 玩家要识别一种可复用关卡结构。

candidate 条目不能进入正式课程目标。它们只能进入候选池或设计备注，直到机制语义、分类和 evidence 计划被确认。

constraint 也不能自动进入正式课程目标。constraint 可以作为 assumed rule、embedded boundary 或 generator guardrail 存在。它是否成为 formal target 取决于课程价值，而不是取决于它在规则模型中的分类。

## Hard Edges

hard edge 表示必须先学 A，再学 B。代码应验证这些边，LLM 不能随意覆盖。

### Explicit Prerequisite

如果 `B.prerequisites` 包含 `A`：

```text
A -> B
```

适用于 facts、constraints、interactions 和 abilities。

### Pattern Requires Ability

如果 pattern 的 `required_abilities` 包含某个 ability：

```text
ability -> pattern
```

玩家不能先学习一种关卡结构，再学习解决该结构必需的手段。可以在同一个 bundle 中一起练，但课程图中仍应保留依赖关系。

### Baseline Before Boundary

如果 constraint 或 interaction 描述的是某个 baseline 行为的失败、例外或覆盖，则 baseline 必须在前：

```text
baseline fact/interaction -> boundary constraint/interaction
```

例子：

```text
normal successful behavior
-> blocked / failed / fallback behavior
```

否则玩家无法理解“为什么这是一条边界”。

### Interaction Condition Dependencies

如果 interaction 的条件依赖某些对象状态、基础操作或基础事实，这些目标必须在前：

```text
condition fact / operation / constraint -> interaction
```

这类边可以由规则表面半自动推导，再由 LLM 补充解释。

### Ability Procedure Dependencies

如果 ability 的 `procedure_sketch` 需要先掌握某个 fact、constraint、interaction 或较小 ability：

```text
required procedure target -> ability
```

这类边必须写入 `prerequisites`。如果只能在自然语言里看出来，说明 player model 还没有整理干净。

### Open Question Blocks Target

如果某个学习目标依赖未确认的机制语义：

```text
open question -> target is blocked
```

blocked target 不进入正式课程排序。它可以留在候选计划中，但不能被当作已确定教学目标。

## Soft Ordering

soft ordering 用于在满足 hard edges 的多个候选顺序中选择更自然的一种。它不构成证明，只是课程生成策略。

优先靠前：

- 直接可观察的规则结果。
- 前置数量少。
- 局部效果明显。
- 状态空间小。
- 不依赖隐藏状态或远程副作用。
- 单机制、单对象、单步骤。
- 能用小关卡完整展示。

优先靠后：

- 失败边界、例外、fallback。
- 多机制 interaction。
- 需要玩家主动构造触发条件。
- 远程后果。
- 多阶段资源保持。
- pattern 组合。
- 会显著增加搜索空间或解法歧义。

软排序可以受设计意图影响。例如如果用户明确说某个机制是主轴，相关目标可以提前，但不能违反 hard edges。

## Bundles

bundle 表示多个目标需要在同一组关卡中一起教学或观察。bundle 不是跳过排序，而是对局部拓扑结构的打包。

允许 bundle 的情况：

- 两个目标必须同时出现才能被玩家观察。
- 一个 baseline 和一个 boundary 必须紧挨着对照教学。
- 一个 interaction 只有通过某个基础 ability 才能构造出来。
- 单独教学会制造虚假的、无意义的关卡。

bundle 必须声明：

```text
primary_target
secondary_targets
why_bundle_is_needed
known_before
```

默认限制：

```text
一个 bundle 最好不超过 3 个目标。
bundle 内也要保留 hard edges。
```

如果出现环，不能自动用 bundle 掩盖。只有当环代表“共同观察”而非真实前置矛盾时，才允许 bundle；否则应拆分目标、补充更小前置，或回到规则定义。

## Topological Layers

排序应先生成拓扑层，而不是直接生成线性课程。

```text
layer 0: no prerequisites
layer 1: depends only on layer 0
layer 2: depends on layer 0/1
...
```

同一层内部再用 soft ordering 排序。这样可以保留“这些目标没有硬先后关系”的事实，避免 LLM 编造不必要的课程依赖。

## Role Sequence

课程排序只决定目标先后；关卡职责还要根据目标类型生成。

默认映射：

| Target type | Common first role | Common later roles |
| --- | --- | --- |
| fact | discovery | review, guided_application |
| constraint | boundary | review, variation_transfer |
| interaction | discovery | guided_application, boundary |
| ability | guided_application | independent_application, variation_transfer |
| pattern | independent_application | combination, challenge |

典型序列：

```text
fact/interaction:
  discovery -> guided_application -> review

constraint:
  baseline review -> boundary -> variation_transfer

ability:
  guided_application -> independent_application -> variation_transfer

pattern:
  independent_application -> combination -> challenge
```

这些是默认课程结构，不是 evaluator 标准。evaluator 只能检查明确的 solver/graph/trace/LLM-player evidence。

## Code Responsibilities

未来工具应能机械完成：

- 读取 `player_model.yml`。
- 验证 `target_policy` 中的目标存在且不是 candidate。
- 验证 curriculum goal 的 target 必须属于 `formal_targets`。
- 验证同一个 target 不能同时属于多个 policy 类别。
- 拒绝 candidate 作为正式课程目标。
- 建立显式 prerequisite 边。
- 建立 pattern 到 required ability 的边。
- 检测未知引用。
- 检测 hard edge 环。
- 标记 blocked targets。
- 输出 topological layers。
- 验证 `curriculum_v2` 是否违反 hard edges。

代码不应判断“这关是否有趣”或“这个能力是否真的聪明”。这些需要 solver、LLM-player、人工设计意图和后续 playtest 共同提供证据。

## LLM Responsibilities

LLM 可以辅助：

- 从规则说明中提出隐含 hard edge 候选。
- 给 hard edge 写 rationale。
- 在同一拓扑层内进行 soft ordering。
- 建议 bundle。
- 根据用户侧重点调整目标优先级。
- 发现目标过粗、过细或混合。

LLM 不可以：

- 把 candidate 当作已确认目标。
- 忽略 open question。
- 把 soft ordering 写成证明。
- 凭自然语言声称某目标已经被关卡验证。
- 用关卡解法草案反向虚构一个玩家模型目标。

## Suggested Curriculum Target Shape

未来 `curriculum_v2` 中的目标记录可以采用类似形状：

```yaml
id: G_create_blocked_exit_with_crate
target:
  kind: ability
  ref: A_create_blocked_portal_exit_with_crate
known_before:
  - F_pull_single_crate
  - F_portal_teleports_player_to_directional_exit
  - I_blocked_exit_stops_normal_teleport
hard_prerequisites:
  - F_pull_single_crate
  - F_portal_teleports_player_to_directional_exit
  - I_blocked_exit_stops_normal_teleport
soft_ordering:
  locality: medium
  mechanism_count: 2
  state_space_burden: medium
  notes: Requires constructing the trigger state before using the portal.
role_sequence:
  - guided_application
  - independent_application
  - variation_transfer
bundle_with: []
blocked_by_open_questions: []
ordering_rationale: >
  The player must already understand pulling, normal teleport behavior,
  and blocked-exit behavior before this becomes a reusable ability.
```

字段名可以在 schema 设计时调整，但信息结构应保留：目标引用、已知前置、硬前置、软排序证据、职责序列、bundle、阻塞问题和排序理由。

## Skill 抽象注意事项

未来写入 skill 时，只保留以下最小规则：

- 先从 `player_model` 建硬依赖图，再写课程。
- 先声明 target policy，再写课程目标。
- candidate 和 blocked target 不能成为正式课程目标。
- 基础操作、常识规则和普通失败限制默认不是正式课程目标。
- hard edges 由代码验证，LLM 只补充候选边和解释。
- 先输出拓扑层，再输出线性顺序。
- 同层排序用软指标和用户侧重点决定。
- bundle 必须说明为什么不能拆开。
- 课程排序不是难度证明，也不是关卡质量证明。
