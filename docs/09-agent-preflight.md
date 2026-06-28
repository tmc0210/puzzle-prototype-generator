# Agent Preflight

通用原型生成 agent 在写机制 IR、知识列表、课程或关卡前，必须先完成 preflight。目的不是多问问题，而是避免把未确认的机制语义伪装成实现细节。

当用户只给出零散机制词汇时，preflight 必须先执行
[Mechanic Disambiguation And ASCII Probes](28-mechanic-disambiguation-and-ascii-probes.md)。
常见机制名不是规则；“传送门”“箱子”“推箱”“墙”“玩家”等词都不能自动补出行为。

## 决策状态

每个决策项都有状态：

```text
confirmed      用户已明确确认。
defaulted      使用了项目允许的默认值，且报告中可见。
open           尚未确认，不能进入会依赖该决策的实现。
out_of_scope   本轮原型明确不处理。
```

## 必问项

### 原始机制语义拆解

必须先记录用户原话，并把每个机制词拆成待确认项。不能因为某个词在 Sokoban-like 游戏里常见就自动使用默认行为。

示例：

```text
用户说：有传送门和箱子。

不能假设：
  有玩家。
  有墙和地板。
  箱子可推。
  传送门传玩家。
  传送门出口是另一扇门后一格。
  箱子不能进传送门。
```

如果某个待确认项会影响 runtime，必须用问题或 ASCII probe 让用户确认。

### 通关标准

必须确认。不能默认。

示例：

```text
玩家到达目标格
所有箱子到目标格
收集全部物品
每关声明不同目标类型
```

影响：

```text
runtime win
solver win set
curriculum goal
accepted gate
PuzzleScript export
```

### 关卡规模

必须确认或显式 default。

示例：

```text
只要 3-5 个 witness
20 关教学曲线
每个机制 2 个教学关 + 2 个应用关
```

影响：

```text
curriculum target_level_count
生成预算
是否需要正式评分器
```

### 机制交互

对于任何两个可能相遇的机制，若用户没有说明，agent 必须询问或标为 open。

示例：

```text
传送门被推进另一个传送门会怎样？
箱子进入传送门会怎样？
传送门出口被玩家、箱子、墙、另一个传送门堵住是否相同？
失败动作是否消耗步数或触发事件？
```

影响：

```text
state transition
counterfactual model
edge cases
solver soundness
```

抽象问题不够清楚时，必须用最小 ASCII probe 展示 before/action/possible outcomes。详见
[Mechanic Disambiguation And ASCII Probes](28-mechanic-disambiguation-and-ascii-probes.md)。

### 机制侧重

必须确认。不能从机制列表自动推断。

示例：

```text
核心机制：blocked portal fallback
辅助机制：普通传送
只做 witness：portal push failure
不进入课程：传送门互推
```

影响：

```text
knowledge importance
curriculum ordering
关卡生成目标
评分权重
```

### 机制精确定义

任何影响状态转移的细节都必须确认。

示例：

```text
玩家进入传送门后落在另一扇门所在格，还是按进入方向落在门外一格？
物体是否随玩家传送？
玩家拉着箱子进入传送门时，箱子是否传送？
移动传送门是否保持配对关系？
```

影响：

```text
runtime implementation
solver correctness
knowledge derivation
PuzzleScript export
```

### 多实例对象

如果用户提到多个箱子、多组传送门、多个角色、多个钥匙/开关，或任何对象可能出现多个实例，必须确认对象实例模型。

示例问题：

```text
这个对象是否允许多个？数量上限或推荐范围是多少？
多个实例是否可区分？通过颜色、图标、编号、位置、能力，还是完全不可区分？
实例之间是否有关系？例如配对、分组、绑定、共享状态、互斥激活。
胜利条件绑定任意实例、全部实例、特定实例，还是某个关系状态？
对象数量是否是课程递进变量？例如单箱、双箱、三箱是否都要覆盖？
多实例协作是核心机制、辅助变化，还是只用于挑战关？
solver 是否允许对该类型做同类对象排序？
analyzer 需要证明多个实例参与，还是只需支持它们存在？
```

影响：

```text
mechanic IR object_instance_model
relations
state hash
canonicalization safety
structured events
object participation evidence
curriculum variation axes
```

如果该对象的实例身份会影响规则或胜利条件，不能把它当作普通同类对象排序。

### ASCII Probe 确认

当机制存在多个合理解释时，agent 应主动构造最小可观测结构，而不是直接选择一种实现。

推荐形状：

```text
legend:
  @ controlled actor, if confirmed or temporarily assumed for the probe
  C box
  A/B portals

before:
  #######
  #@A B #
  #######

action:
  right

possible outcomes:
  A. player appears on B
  B. player appears one cell beyond B
  C. player cannot enter A
  D. A affects boxes only, not player

question:
  Which outcome matches your intended rule, or is it something else?
```

如果 probe 临时使用墙、地板、主角或网格，必须显式说明这些只是为了观察，不代表机制默认拥有它们。

## 默认值规则

默认值只有在同时满足以下条件时才能使用：

```text
1. 默认值写在 preflight 报告中。
2. 默认值不会改变核心机制含义。
3. 后续 artifact 能追踪该默认值来源。
4. 用户可以一眼看到并覆盖它。
```

严谨逻辑解谜中，错误默认值通常比缺失实现更危险；它会让求解器、评分器和关卡组都建立在错误机制上。

## 输出形状

preflight 结果应能被后续工具读取，推荐形状：

```yaml
decisions:
  - id: win_condition
    status: confirmed
    value:
      type: player_on_goal
      target: goal
    source: user

  - id: portal_into_portal
    status: open
    question: 传送门被推进另一个传送门时会发生什么？
    blocks:
      - runtime_complete
      - edge_case_levels

ascii_probes:
  - id: portal_player_destination
    status: confirmed
    legend:
      "@": controlled actor
      A: entrance portal
      B: paired portal
    before: "#@A B #"
    action: right
    chosen_outcome: player_exits_beyond_B
    notes: 用户确认玩家从 B 的行进方向后一格出现。
```

只有 `confirmed`、`defaulted`、`out_of_scope` 可以进入实现。`open` 必须阻止依赖该决策的 runtime、solver 或关卡生成步骤。
