# 知识与课程模型

知识不是机制本身，而是玩家为了预测、控制、通关而必须学会的一条可验证命题。

## 知识定义

一条知识通常具有这种形式：

```text
在条件 C 下，动作 A 会产生结果 R。
在条件 C 下，动作 A 不可行。
当机制 X 和机制 Y 同时出现时，优先级或例外是 R。
```

例子：

- 玩家可以拉一个箱子。
- 玩家不能拉两个连续箱子。
- 玩家可以通过拉开箱子制造通路。
- 玩家拉着箱子进入传送门时，传送门不会传送箱子。
- 传送门出口被堵时，进入入口会改为推动入口传送门。

## 知识粒度

第一阶段采用一个实用标准：

```text
一条知识应该能被一个最小关卡单独展示或测试。
```

如果无法单独展示，可能太细、太抽象或只是实现细节。  
如果一个知识必须同时解释三件事，可能太粗。

## 知识来源

知识来源分为三类：

### 声明知识

设计者或 Codex 在机制定义时明确标注。

```yaml
teaches: [K_blocked_portal_pushes_entrance]
```

### 派生知识

从规则条件、失败分支、fallback、优先级和 effect 中派生。

例如规则分支：

```text
出口为空 -> 玩家传送
出口堵住且入口可推动 -> 推动入口传送门
出口堵住且入口不可推动 -> 动作失败
```

可以派生为三条候选知识。

### 涌现知识

从求解器 trace 中发现的战术模式。

例如：

```text
先故意堵住传送门出口，再进入入口，从而移动入口传送门。
```

这不是单条规则事实，而是多个规则分支组合出的战术。

## 知识条目格式

```yaml
- id: K_blocked_portal_pushes_entrance
  type: interaction_exception
  statement: 传送门出口被堵时，玩家进入入口会改为推动入口传送门。
  prerequisites:
    - K_portal_teleports_player
  source:
    rule: enter_portal
    branch: blocked_exit_push_entrance
  detector:
    required_events:
      - portal_exit_blocked
      - portal_fallback_push
  informal_semantics:
    trace_condition: player_attempts_blocked_portal_entry_and_entrance_portal_moves
    notes: 非形式化设计语义，不参与 evaluator 证明。
  counterfactual:
    disable_branch: enter_portal.blocked_exit_push_entrance
  evidence:
    level: unknown
    strength: weak
```

`detector` 只能包含当前工具可以执行的形式化条件，例如事件集合、反事实模型或未来定义的结构化图谓词。自然语言式 trace 条件不能放在 `detector` 中；它们必须放在 `informal_semantics`，只作为设计意图记录。

## 证据等级

知识不需要一开始就拥有强证明。证据可以逐步增强。

```text
弱证据: 来自机制分支，玩家可观察。
中证据: 有最小 witness，可以单独展示。
强证据: 有关卡证明它是必要行为，或反事实模型显著改变解法。
```

## 重要性

知识重要性不是单一分数，而是多维判断：

- centrality: 多少关会用到它。
- prerequisite_value: 是否是很多知识的前置。
- surprise: 是否反直觉。
- failure_cost: 不懂它是否容易导致严重失败。
- design_power: 是否能产生很多有趣谜题。
- teachability: 是否能用小关卡讲清楚。
- interaction_depth: 是否连接多个机制。

## 课程结构

课程不是从机制直接得到，而是从确认后的知识列表组合、排序而来。

常见关卡角色：

```text
diagnostic: 检查前置知识是否成立。
discovery: 玩家不知道目标知识，需要从反馈中发现。
boundary: 暴露旧模型的例外、限制或失败分支。
guided_application: 玩家已知目标知识，在高支架小题中首次应用。
independent_application: 玩家已知目标知识，无明显提示地应用。
variation_transfer: 同一知识换空间结构或上下文。
combination: 多个已知知识组合、排序、互相约束。
challenge: 已知本章知识，挑战深度规划或反直觉应用。
review: 唤醒旧知识和调节节奏。
```

一个知识通常不需要固定数量关卡。核心知识可能需要 3 关以上；边缘知识可能只需要 1 关。

机制 witness / fixture 可以继续存在，用于证明某个事件分支可触发；它不是正式课程角色，不能直接计入玩家关卡覆盖。
