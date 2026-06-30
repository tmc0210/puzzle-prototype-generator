# SCC / Graph Diagnostic Reading

Status: active reading guide for analyzer graph and SCC facts.

本文定义如何阅读 solver / analyzer 输出中的 graph、agency、SCC 和 commitment
字段。它不定义新的质量评分器。图指标只能描述拓扑事实；如果 designer 或 critic
要把它用于设计评价，必须补上玩家侧解释。

## Core Rule

SCC / graph diagnostic is evidence, not taste.

```text
graph fact -> neutral meaning -> player-facing interpretation -> verdict effect
```

任何使用 SCC / graph 字段的设计攻击或设计背书，都必须显式经过这个链条。

```yaml
scc_graph_interpretation:
  graph_fact: ""
  neutral_meaning: ""
  player_facing_interpretation: ""
  verdict_effect: none | merit | caveat | core_attack
```

如果 `player_facing_interpretation` 为空，`verdict_effect` 必须是 `none`。

## Graph Facts

`state`

一个完整游戏状态。通常包括玩家位置、可移动物位置、墙或其它可变地形、目标覆盖
状态等。具体包含哪些内容由 runtime state 定义。

`transition`

一个合法输入导致的状态变化。它是可达状态图中的有向边。

`legal transitions`

完整可达图里合法输入产生的边数。

`event-only illegal transitions`

输入不合法，但 runtime 仍报告了事件的情况。它不是合法前进边，但可能说明某些
动作尝试可发生或可观察。

`reachable states`

从初始状态通过合法输入可到达的状态数。

`winning states`

满足胜利条件的可达状态数。多个 winning states 不自动代表坏多解；它可能来自胜
利后可逆移动、等价尾部、不同但等价的完成状态，或真正不同的解法状态。必须结合
玩家侧路径和胜利条件解释。

`graph status: complete | exhausted`

`complete` 表示预算内枚举完可达状态。`exhausted` 表示超预算；依赖完整图的结论
必须降级为 `unknown`，不能当作 pass 或 fail。

## SCC Basics

`SCC`

强连通分量。一组状态之间可以互相到达。玩家侧近似含义通常是“在不做某些不可逆
提交前可来回调整的区域”，但这只是辅助理解，不能自动成为质量判断。

`SCC condensation graph` / `SCC DAG`

把每个 SCC 压成一个节点后得到的有向无环图。SCC 之间的边表示离开一个可逆区域
后无法回到原区域的转移。

`scc count`

可达图被压缩后的 SCC 数量。

`scc edges`

SCC DAG 中的边数。

`initial SCC`

初始状态所在的 SCC。它描述开局所在的可逆状态集合。

`winning SCC`

包含至少一个 winning state 的 SCC。

`winReachable SCC`

从该 SCC 出发仍能到达某个 winning SCC。

## SCC Node Fields

`states`

该 SCC 内包含的原始状态数。大 SCC 表示可逆活动空间较大，但不自动表示有意义的
选择或高质量观察空间。

`dist`

从该 SCC 到 winning SCC 的最短 SCC-DAG 距离。它通常表示不可逆层级距离，不是玩
家输入步数。

`out`

从该 SCC 出发通向其它 SCC 的不可逆出口数量。

`winOut`

`out` 中仍可到达胜利的出口数量。

`deadOut`

`out` 中不能再到达胜利的出口数量。图论含义是通向 non-win-reachable SCC 的不
可逆出口。它表示不可逆错误分支，但不自动表示有效抉择点或有效误导。

`in`

进入该 SCC 的边数量。

`winIn`

从 win-reaching 部分进入该 SCC 的边数量。

## Win-Subgraph Shape

`no_win_path`

初始 SCC 不能到达任何 winning SCC。该 solve instance 不可解。

`one_win_continuation_per_scc`

win-reaching SCC 子图在相关路径上每个相关 SCC 只有一个 win-reaching
continuation。它是可达图 / 唯一性相关元数据，不是设计诊断字段。

`branching_win_dag`

win-reaching SCC 子图中存在多个 win-reaching continuation 或 merge。中性含义：
存在可到胜利的分支、汇合或顺序差异。

它不能推出：

```text
- 多解坏；
- 关卡好；
- 玩家有深度选择；
- 存在有意义的可交换顺序。
```

它可能只是胜利后尾部、等价路线、无意义绕行，也可能是真正的多计划结构。必须结
合具体路径解释。

`branchingWinSccs`

有多个 win-reaching 出口的 SCC 数量。

`mergingWinSccs`

有多个 win-reaching 入口的 SCC 数量。它可能表示路径汇合或可交换顺序，也可能
只是等价路线。

## Solution Path And Commitments

`solution SCC path`

solver 返回的解在 SCC DAG 上经过的 SCC 序列。

`solutionIrreversibleStepCount`

返回解路径上跨 SCC 的次数。它是不可逆区域跳转数，不是总输入数，也不等于谜题
深度。

`forcedWinPrefix` / `forcedWinContinuationPrefixLength`

从返回解路径开头算起，有多少个连续 SCC 的 win-reaching continuation 是唯一的。
中性含义：这段胜利承诺顺序固定。

不要把 `forced` 读成差评。更中性的读法是 fixed win-continuation prefix。

`forced win continuation`

在某个 SCC 上，能继续到胜利的出口只有返回解使用的那个。中性含义：若要赢，这
一步不可逆出口固定。

`commitment transition`

离开当前可逆区域 / SCC 的不可逆转移。通常对应推物、破墙、资源消失、状态锁定
等，但具体含义由 runtime 决定。

`commitments`

某区域可做的不可逆出口总数。

`viable commitments`

做了以后仍能到达胜利的不可逆出口数。

`dead commitments`

做了以后不能到达胜利的不可逆出口数。它是 region 层的 `deadOut` 类似概念。

`progress commitments`

做了以后在图上更接近胜利或减少到胜利距离的出口数。它依赖工具定义的距离，不
自动等于玩家感知进展。

`optimal commitments`

做了以后仍在某条最优解上的出口数。

`forced viable prefix`

在 bidirectional region 层面，连续多少个解中 commitment 的 viable continuation
唯一。中性含义是可胜利的 commitment 顺序固定。

`forced optimal prefix`

连续多少个解中 commitment 的 optimal continuation 唯一。中性含义是最优路径的
commitment 顺序固定。

## Handoff Fields

`handoff`

返回解从一个 SCC / region 离开到下一个 SCC / region 的那次不可逆转移。

`sourceEnteredAtStep`

返回解第一次进入 handoff 源 SCC 的输入步数。

`exitActionStep`

返回解离开源 SCC 的输入步数。

`sourceStateCount`

源 SCC 里有多少状态。

`entryEqualsExitSource`

返回解进入该 SCC 的状态和离开前所在状态是否相同。若相同，表示返回解没有在该
SCC 内做实质 reposition；它不自动表示坏。

`trivialSourceScc`

源 SCC 很小或只有平凡状态。它表示该 handoff 前可逆活动空间少；它不自动表示坏。

`sameEntryExitStateCount`

有多少 handoff 的 entry 和 exit source 相同。

`scriptedHandoffCount`

当前工具把 `trivialSourceScc` 或 `entryEqualsExitSource` 归类为 scripted handoff。
这个名字带有价值污染。中性读法是：拓扑上没有明显可逆 reposition 的 handoff 数。

`forcedScriptedHandoffCount`

同时满足 fixed win continuation 且被工具归为 scripted handoff 的数量。它仍是拓
扑组合，不是质量判决。

`maxConsecutiveScriptedHandoffs`

连续出现上述 handoff 的最大长度。中性读法是连续多少个 handoff 缺少可逆
reposition 空间。

`Reading: has_reposition_room`

工具提示该 handoff 前源 SCC 里有可逆移动空间。中性含义：玩家可以在提交前重新
站位或观察。它不自动表示有意义选择。

`Reading: scripted_same_state_handoff`

工具提示 entry=exit 或 trivial handoff。中性含义：提交前没有明显可逆
reposition。它不自动表示坏；某些精密单步谜题仍可能要求远端推理。

## Bidirectional Compression Fields

`compressed regions`

用双向边压缩出的区域数量。它类似 SCC，但依据是 bidirectional edges，不一定完
全等同 SCC。

`bidirectional transitions`

可双向往返的边数。

`commitment transitions`

非双向、不可逆或单向推进的边数。

`solution region path`

返回解在 bidirectional region 图上的区域序列。

`initial region commitments / viable / dead / optimal`

初始可逆区域的不可逆出口总数、可胜利出口数、死出口数、最优出口数。

`endgame tail`

首次进入含胜利状态的区域后，返回解还走了多少步。它可能是胜利区域内尾部移动，
也可能是先满足部分胜利条件后仍需到达显式 goal。必须结合胜利条件解释。

`Reading hints`

工具生成的自动摘要。它是拓扑提示，不是审美结论。

## Player-Facing Interpretation Rules

### Dead Branches

`deadOut` / `dead commitments` 表示不可逆错误出口。设计解读必须继续追问：

```text
- 这个错误出口是否玩家可见？
- 它是否是自然会考虑的动作？
- 它相对胜利出口更近还是更远？
- 它产生反馈的时间是短还是长？
- 它是否教会或强化核心读法？
- 它是否只是噪声或惩罚性死胡同？
```

可能的读法：

```text
- 错误出口比胜利出口更近、更自然，可能是有效误导。
- 错误出口比胜利出口更远或很不自然，通常只是图统计，不一定有设计意义。
- 极长 dead branch 可能带来负面体验，因为玩家很晚才得到失败反馈。
- 很短的 dead branch 也不自动好；如果它只是显然撞墙，不构成有效抉择。
```

### Branching Win DAG

`branching_win_dag` 表示 win-reaching 分支或汇合。它需要区分：

```text
- 有意义的可交换顺序；
- 等价路线；
- 胜利后尾部游走；
- 旁路；
- 真正不同的计划结构。
```

它不能直接当作多解失败，也不能直接当作高质量证据。

### Large Reversible Regions

大 SCC、`has_reposition_room` 或很多 bidirectional transitions 表示可逆活动空
间。它需要继续判断：

```text
- 可逆空间是否帮助观察、站位、规划？
- 还是只是空走路？
- 玩家在提交前是否能看到相关因果关系？
- 这个空间是否让局部显然动作变得不显然？
```

### Trivial Handoffs

`trivialSourceScc`、`entryEqualsExitSource` 或 scripted handoff 类字段表示提交前
缺少可逆 reposition 空间。它可能提示执行感，但不是结论。某些关卡可以在没有
reposition 的单步提交中要求深层远端推理。

### Irreversible Step Count

`solutionIrreversibleStepCount` 或 commitment 数量不是质量评分。

```text
- 不可逆步少，不自动浅。
- 不可逆步多，不自动深。
- 关键是每个不可逆提交是否带来新的玩家侧责任、状态消费或角色变化。
```

## Naming Caution

当前工具报告中存在带价值色彩的名称，例如：

```text
scriptiness
scripted
forced
dead
reading hints
```

在正式设计和 review 中，它们必须按本文的中性拓扑含义阅读。后续工具或报告可以
考虑改名，但在改名前，critic 不得把这些词直接当作质量判决。

## Required Critic Discipline

critic 可以使用 SCC / graph facts 攻击或支持候选，但必须引用具体玩家侧后果。

有效负面使用例：

```yaml
graph_fact: "initial SCC has 7 deadOut and 1 winOut"
neutral_meaning: "Before the first winning commitment, seven irreversible exits lose and one exit can still win."
player_facing_interpretation: >
  In this layout, the seven losing exits are visually symmetric first pushes
  from the same open room, and the failed traces do not reveal an early
  mechanism responsibility before the loss. The opening therefore asks the
  player to enumerate similar commitments instead of reading a constrained
  plan.
verdict_effect: caveat
```

无效攻击例：

```yaml
graph_fact: "forcedWinPrefix=3/3"
neutral_meaning: "The win-continuing commitment order is fixed."
player_facing_interpretation: ""
verdict_effect: core_attack
```

上面的无效攻击缺少玩家侧解释，`verdict_effect` 必须改为 `none`。
