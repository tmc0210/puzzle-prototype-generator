# 求解器与形式化评估器

求解器负责证明和分析。形式化评估器只检查关卡声明的 `expected_solver_evidence`，不直接猜测关卡质量。

## 状态图模型

第一阶段采用玩家输入作为图的边：

```text
节点 = 完整游戏状态
边 = 一次玩家输入后结算到稳定状态
```

一次转移可以表示为：

```ts
step(state, input, rules): StepResult
```

返回：

```ts
type StepResult = {
  nextState: State
  legal: boolean
  cost: number
  events: Event[]
  appliedRules: string[]
  changedObjects: string[]
}
```

搜索器不理解“拉箱子”或“传送门”。它只枚举输入并调用 runtime。

## 回合结算

一次玩家操作后的结算流程：

```text
1. 接收玩家输入。
2. 初始化 intent。
3. 执行 input-triggered rules。
4. 执行移动、碰撞和交互规则。
5. 执行自动规则，例如重力、流水、传送连锁。
6. 重复自动规则直到稳定或触发 cycle guard。
7. 检查 win/loss。
8. 输出 nextState 和 event log。
```

搜索图的边是一整个回合，而不是单条规则应用。

## 搜索算法

在非负边成本下：

- BFS 用于所有输入成本相同的最短按键数搜索。
- Dijkstra 用于不同边成本的最短成本搜索。
- A* 可用于有安全启发式的搜索。

第一阶段用于证明时可以令 `h = 0`，此时 A* 退化为 Dijkstra。

## 边成本

谜题中不应出现负边。

常见成本：

```text
一次玩家输入: 1
宏动作: 展开的输入数，或 1 个逻辑动作
自动结算: 合并进本次输入，不单独建边
```

如果确实存在 0-cost 内部边，Dijkstra 可以处理，但 BFS 不适合不同成本。

## 优化与剪枝

核心求解器必须朴素但忠实。聪明算法作为可插拔优化。

可用于证明的优化：

- 重复状态去重。
- 可证明安全的状态 canonicalization。
- 根据 `identity_policy` 做同类对象排序。
- 经过机制 IR 检查的玩家可达区归一化。
- 可证明安全的死锁剪枝。
- admissible heuristic。

只能用于候选搜索或诊断的优化：

- beam search。
- 深度上限。
- 随机采样。
- novelty pruning。
- LLM 建议的剪枝。
- 未证明安全的 deadlock 规则。

所有求解报告必须记录搜索范围、预算和启用的优化。

## 多实例对象

求解器必须尊重机制 IR 中的对象身份策略。详见 `docs/19-multi-instance-object-model.md`。

```text
indistinguishable:
  可以对同类对象位置排序，减少状态爆炸。

distinguishable:
  必须保留实例身份，例如红蓝角色、不同能力的箱子。

relational:
  必须保留实例与关系，例如传送门配对、开关绑定门。
```

这直接影响 state key：

```text
普通箱子:
  C: sort([pos1, pos2, pos3])

传送门:
  P: A=pos1;B=pos2;D=pos3;E=pos4
  R: pair(A,B);pair(D,E)

多角色:
  actor#red=pos1;actor#blue=pos2;active=actor#red
```

如果对象不可区分，state key 可以排序，但 analyzer 仍可能需要为某条 trace 分配临时 lineage，用来说明“至少两个不同实例参与”。这类 lineage 是证据工具，不是玩家知识。

## 事件性质与状态合并

如果要证明“所有解都使用知识 K”，不能只用物理状态去重。否则两条路径到达同一物理状态，一条触发过 K，一条没触发过 K，会被错误合并。

解决方式：

```text
搜索 product state = physical_state + event_automaton_state
```

或先构建带事件的状态图，再在图上做路径性质分析。

## 完整图分析

对小关卡和 witness 关，优先完整展开可达状态图：

```text
G = 从初始状态可达的所有状态和转移
Goal = 满足胜利条件的状态
Good = 可以到达 Goal 的状态
Dead = 不能到达 Goal 的状态
SCC DAG = 强连通分量压缩后的图
```

可定义的证明型指标：

- 是否可解。
- 最短解长度。
- 所有最短解是否使用 K。
- 所有解是否使用 K。
- 禁用 K 后是否不可解。
- SCC 压缩后核心路径是否唯一。
- 目标事件是否支配所有通往目标的路径。

## 评分器原则

形式化评估器不把模糊直觉伪装成证明。它的职责已经收窄为：

```text
读取关卡的 expected_solver_evidence
-> 调用 runtime / solver / graph analyzer
-> 产出 solverContract.metrics
-> 根据声明指标给出 pass / warning / fail
```

未被关卡声明的指标可以保留在诊断结果中，但不应默认决定关卡状态。

`expected_trace` 和人工设计备注只能提供观察或诊断。它们不能直接让某条知识“覆盖”，也不能进入课程验收。对于目标知识 K，第一阶段只接受一种硬门槛：

```text
完整 product graph 中不存在任何通关路径绕过 K 的事件约束。
```

也就是说，搜索状态必须包含：

```text
physical_state + required_event_mask + forbidden_event_hit
```

如果 product graph 搜索预算耗尽，结论是 `unknown`，不是 pass。

多实例参与度同样不能靠事件次数验收：

```text
object_participation_required(L, type=T, min=N, role=R) :=
  no winning path exists whose trace contains fewer than N distinct T instances
  participating in role R
```

如果 trace 事件没有实例 id 或 lineage，结论必须是 `unknown`，不能用 `pull_crate` 出现 N 次替代。

第一阶段分三类输出：

### 证明型结论

只有完整图或完整最优解集合支持时输出。

```text
solvable
optimal_solution_length
all_solutions_use_K
counterfactual_unsolvable
dominator_events
core_path_unique_after_compression
```

### 最优解派生指标

只有已证明最优时输出。

```text
minimal_player_steps
minimal_object_moves
minimal_key_events
minimal_nonproductive_moves
```

### 诊断型提示

预算不足时只作为提示，不参与硬判断。

```text
found_bypass_candidate
sampled_late_failure_examples
large_search_frontier_warning
many_equivalent_shortest_solutions
```

## 当前硬指标契约

关卡可以声明以下 `expected_solver_evidence`：

```text
solvable
player_win_standard
target_event_detector_configured
expected_trace_replays
returned_solution_covers_target_events
expected_trace_covers_target_events
all_shortest_solutions_cover_target_events
all_winning_paths_cover_target_events
counterfactual_unsolvable
full_graph_complete
```

契约结果规则：

```text
任一声明指标 fail => evaluator status = fail
无 fail 但存在 unknown => evaluator status = warning
全部声明指标 pass => evaluator status = pass
```

这意味着 mechanic fixture 可以只声明 `expected_trace_covers_target_events` 并通过 evaluator；但它仍不能计入正式课程覆盖，除非同时满足 accepted、玩家通关标准等 audit 条件。

## 有价值解唯一性

目标不是朴素唯一解，而是：

```text
所有可接受解都经过相同核心知识事件；
在压缩状态图里，通往目标的高层路线没有明显分叉；
无害顺序、来回移动、对称变体不计入多解。
```

长期方向：

```text
reachable graph
-> SCC 压缩
-> dominator 分析
-> 核心事件序列分析
```

第一阶段先实现弱版本：

- 找到最短解。
- 枚举所有最短解。
- 检查目标知识事件是否出现。
- 对小关完整图检查所有通向目标的路径。
- 用反事实模型检查 K 是否必要。
