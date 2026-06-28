# 关卡生成循环

Status: historical generator-frame document. The current level-design standard is [Current Level Design And Review Standard](21-current-workflow-standard.md). This file remains useful for generation-loop vocabulary and cost intuition, but it is not the current acceptance workflow.

关卡生成器不应该依赖 LLM 自由出题，也不应该假设 basic structure 可以自动扩展成好关卡。LLM 的主要价值是设计和解释因果链；生成器、runtime、solver 和 graph analyzer 负责把这些设计变成可验证候选。

最新的关卡设计与审查流程见 [Current Level Design And Review Standard](21-current-workflow-standard.md)。本文保留生成器视角的执行框架。

## 基本循环

```text
关卡职责
-> 目标能力 / 模式
-> 因果链
-> 局部结构 / 随机链路矿工
-> 候选关卡
-> 静态过滤
-> trace replay
-> solver / graph analyzer 硬验证
-> evaluator 证据报告
-> LLM 读证据并精修
-> 候选池
-> 课程排序
```

## Solution Sketch

解法骨架不是完整按键序列，也不只是关键事件列表。它应描述必要状态变化之间的因果关系。

```yaml
target_goal: P_construct_trigger_then_exploit
sketch:
  - pull_crate_to_block_portal_exit
  - blocked_exit_causes_portal_fallback
  - fallback_moves_portal_into_useful_position
  - moved_portal_or_opened_cell_reaches_goal
```

每个事件都能转化成局部约束：

```text
要触发 portal_exit_blocked:
  出口格必须有 blocker

要触发 portal_fallback_push:
  入口传送门前方必须可推动
  玩家必须从进入方向尝试进入传送门

要让链条成为必要:
  普通传送路径不能直接通关
  移动后的传送门必须打开关键路径
  禁用 pull / fallback / teleport 后应不可解或产生明确绕解报告
```

## 生成层级

### Witness Pattern

最小展示关。

目标：

```text
玩家能很快看见目标知识。
```

### Necessary Pattern

目标知识是通关必要条件。

验证：

```text
正常模型可解；
禁用目标知识后不可解，或所有通关路径都必须触发目标事件。
```

### Puzzle Pattern

真正的小谜题。

特点：

```text
先构造触发条件；
再使用目标知识；
最后收束到目标。
```

注意：把 witness 外面加几步路，通常只会得到 discovery 或操作练习。application / combination / challenge 需要新增或加深因果依赖。

## 分层筛选

不要生成几百万个随机关卡后全量求解。贵的 solver 只跑在高希望候选上。

建议流程：

```text
1. 根据关卡职责和目标能力写出 causal_chain。
2. 用局部结构、手写地图或随机链路矿工生成候选。
3. 静态检查对象、连通性、关键触发条件。
4. 执行 trace replay，确认预期解法能跑通。
5. 对少量候选运行 solver / graph analyzer / evaluator。
6. 由 LLM 读取证据，移除冗余、修复绕解、改善可读性。
7. 将通过硬验证且设计上可解释的候选放入候选池。
```

粗略目标：

```text
每个知识:
  生成 50-300 个结构化候选
  静态过滤剩 20-80
  trace 过滤剩 5-30
  solver 跑 5-30
  接受 1-5
```

实际数字需要根据机制复杂度校准。

## Repair 策略

第一阶段不依赖复杂自动 repair。优先采用 generate-and-filter。

有限 repair 可以作为局部候选变换：

```text
block_bypass_cell
remove_distractor
move_goal_one_tile
tighten_corridor
swap_portal_pair
```

每个 repair 都必须重新验证：

```text
目标解仍存在；
绕解消失；
目标知识仍必要；
评分没有明显变差。
```

LLM 可以修图，但必须带着证据修图。它负责：

- 解释失败原因。
- 提出高层修补意图或紧凑化方案。
- 从随机候选中提取有效因果链。
- 在已验证候选中帮助排序。

每次修图后必须重新验证，不能继承旧报告。

## 候选成本

生成 20 个正式关卡的粗略预算：

```text
结构化候选生成: 1,000 - 3,000
静态过滤后: 200 - 600
intended trace 验证后: 80 - 200
完整 solver/evaluator: 50 - 150
最终接受: 20 - 30
```

小型教学关和应用关应尽量保持 6x6 到 10x10，便于完整分析。

## 课程排序

候选关卡根据知识前置和角色安排：

```text
diagnostic -> discovery/boundary -> guided_application -> independent_application
-> variation_transfer/review -> combination -> challenge
```

同一知识的关卡不必固定数量。课程规划器应根据知识重要性、证据强度和生成质量决定是否需要更多关。
