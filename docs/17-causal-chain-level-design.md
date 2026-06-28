# Causal Chain Level Design

Status: background design-memory document. The current level-design standard is [Current Level Design And Review Standard](21-current-workflow-standard.md). This file records the causal-chain insight and early manual design lessons; later loop boundaries and reviewer responsibilities are superseded by docs 18, 20, and 21.

本文档记录一次手工关卡练习后的收敛结论。它是未来 skill / agent workflow 的草案材料，不是某个 `pull_portal_fallback` 关卡包的最终设计文档。

补充说明：`docs/18-validated-level-design-loop.md` 记录了后续 mini campaign dry run 暴露出的流程退化，以及复用式链路加长、关卡间去重、角色判定的更严格约束。后续实现 skill 时应以 `21` 号标准文档为入口，再按需参考本文档和 `18` 号文档。

核心结论：

```text
好关卡首先是因果链，其次才是地图。
```

`basic structure -> candidate map` 可以证明机制可发生，也可以提供种子结构，但它不能自动产生应用关、组合关或挑战关。真正需要沉淀成泛化能力的是：

```text
设计因果链
-> 把因果链嵌入空间
-> 用 solver / graph analyzer 验证硬条件
-> 让 LLM 读取证据并精修地图
```

## 角色分工

### LLM Designer

LLM 的核心职责不是裸生成地图，而是：

- 根据机制和课程目标提出因果链。
- 解释 solver trace 中的关键状态变化。
- 识别冗余空间、弱边、假复杂和绕解风险。
- 根据硬验证报告精修地图。
- 把随机候选中有价值的链路提取成人类可读的设计。

LLM 不应单独声明关卡质量通过。它只能给设计判断和修改建议。

### Solver / Graph Analyzer

形式化工具负责硬结论：

- 可解性。
- 最短解和关键事件 trace。
- 完整可达状态图规模。
- 禁用目标机制或分支后的反事实不可解。
- 是否存在不用目标事件的绕解。
- 通关状态数量和最短通关路径族。

如果指标依赖完整状态图而搜索预算耗尽，结果必须是 `unknown`，不能降级为 pass。

### Evaluator

Evaluator 不负责判断“漂亮”“有趣”“像挑战关”。它负责把 solver / graph analyzer 的结论整理成可比较证据：

```text
claim: this level requires pull + blocked portal fallback + normal teleport
evidence:
  base_model: solvable, shortest_cost=29
  without_pull: unsolvable, search_complete
  without_blocked_portal_push: unsolvable, search_complete
  without_portal_teleport: unsolvable, search_complete
  reachable_states: 1872, complete
```

LLM 和人类设计者再基于这份证据判断它是不是好关。

### LLM Player

LLM player 放在后续接入。它不替代 solver，而是测试玩家可读性：

- discovery：给前置知识，不给目标知识，看是否能从反馈中形成假设。
- application：给目标知识，看是否能应用，而不是重新猜规则。
- combination / challenge：给本章知识，看卡点是否来自结构规划，而非规则误解或视觉噪音。

## 因果链

因果链描述的是必要状态变化，而不是按键序列。

好的链条应该满足：

- 每个关键操作产生一个后续会被消费的状态。
- 后续步骤必须依赖前面的状态改变。
- 链条中至少有一个非平凡选择或规划点。
- 行走、站位和连续重复操作要降权，不能单独冒充难度。

例子：

```text
拉箱子制造传送门出口阻塞
-> 进入另一端传送门触发 fallback
-> fallback 移动入口传送门
-> 新传送门位置打开最终通路
```

反例：

```text
最小 witness
-> 多走三步
-> 同一个 witness
```

这通常只是 discovery 或操作练习，不是应用关。

## 关卡职责与链条深度

### Discovery

目标是让玩家看见新事实或新交互。

允许使用极小结构。允许几乎没有选择。关键是旧模型失败得清楚，新模型能被快速验证。

### Guided Application

目标是让玩家在一个完整小题里使用已知机制。

要求：

- 目标机制不是单步 witness。
- 目标操作产生后续会被消费的状态。
- 可以有轻支架，但不能只是强制唯一操作。

### Independent Application

目标是无明显提示地应用已知机制。

要求：

- 起点不能只给一条强制进路。
- 目标机制的使用位置需要玩家识别。
- 地图里可以有少量无害选择，但不能靠巨大空地制造复杂度。

### Combination

目标是组合两个或更多能力。

要求：

- 机制 A 产生机制 B 所需条件，或机制 A 的结果改变机制 B 的意义。
- 不是两个独立 witness 串联。
- 任意去掉核心能力之一都应不可解，或至少出现明确绕解失败证据。

### Challenge

目标是深度规划、反直觉应用或长因果链。

要求：

- 关键状态变化之间存在依赖，不只是多次同类操作。
- 连续同类操作应大幅降权，除非每次操作改变了不同的后续约束。
- 起点附近的弱边几乎不增加难度。
- 复杂结构应尽量紧凑，避免冗余空间伪装成深度。

## 弱边和难度降权

弱边不是形式化最终定义，但它是重要设计直觉。

典型弱边：

- 当前状态只有一个有效进展动作。
- 不走该动作只能撤回、回到旧状态或在同一自由移动区域里游荡。
- 只是为了到达机制触发位置而走路。
- 起点附近被迫执行的操作。

弱边可以是关卡美感或教学引导的一部分，但不能作为“这是应用关/挑战关”的主要证据。

连续同类操作也要降权。例如“把同一个箱子连续拉两次”通常接近一次拉箱子的难度，除非两次拉箱分别服务于不同子目标。

## 基本结构的定位

基本结构仍然有价值，但用途要收窄。

适合用途：

- 证明某个规则分支可触发。
- 作为 discovery seed。
- 作为组合链条里的一个局部部件。
- 给生成器提供局部约束模板。

不适合用途：

- 直接复制成多个不同职责的关卡。
- 只通过增加路程变成 application / challenge。
- 作为关卡质量通过的证据。

## 随机搜索的定位

随机结构不是正式出题器，但可以作为链路矿工。

推荐流程：

```text
1. LLM 提出事件签名或链条目标。
2. 生成器随机或半随机产生紧凑地图。
3. Solver 筛选满足硬条件的候选。
4. LLM 读取最短解 trace，提取因果链。
5. LLM 移除冗余空间、阻断绕解、增强可读性。
6. Solver 重新验证。
```

随机候选的通过条件不是“事件数量多”，而是：

- 关键事件在最短解中出现。
- 反事实禁用核心机制后不可解。
- 完整图规模可控。
- 链条可以被人类解释为必要因果关系。

## 工具化设计循环

建议把未来泛化能力做成工具化设计师循环：

```text
规则集确认
-> 玩家模型和课程目标
-> LLM 设计因果链
-> LLM 或生成器实现地图
-> solver / graph analyzer 硬验证
-> evaluator 产出证据
-> LLM 读证据并精修
-> 可选 LLM player 测试可读性
-> 进入候选池
```

其中 `basic structure generator`、`random miner`、`solver`、`evaluator`、`LLM player` 都是工具，不是主线本身。

## Case Studies

### Witness 加路程失败

早期失败模式：

```text
最小触发结构
-> 起点移远一点
-> 玩家多走几步
```

这种变换只增加操作长度，不增加因果依赖。它适合把 minimal witness 变成 discovery，但不能证明 guided application，更不能证明 challenge。

### 组合关成功模式

一个被接受的组合链条：

```text
拉箱子到传送门出口
-> 箱子堵住出口
-> 进入另一端传送门触发 fallback
-> fallback 移动入口传送门
-> 原位置或新位置打开通路
```

这个结构成立的原因不是事件多，而是 `pull` 产生了 `blocked exit`，`blocked exit` 又改变了 portal 行为，portal 行为再改变地图连通性。

### 随机链路矿工

一次随机搜索得到的复杂候选：

```text
#########
## A    #
##     B#
#   C## #
# ##  # #
#  @##G #
#########
```

solver 证据：

```text
shortest_cost: 29
reachable_states: 1872
without_pull: unsolvable
without_blocked_portal_push: unsolvable
without_portal_teleport: unsolvable
```

该候选有真实链条：

```text
拉箱子调整 A 的出口阻塞
-> 多次推动 A 改变传送门位置
-> 拉箱子调整 B 的 fallback 条件
-> 多次推动 B 到目标旁
-> 最终普通传送到 G
```

但它仍需要人工或 LLM 精修，例如移除 `C` 下方的冗余空间、增强读图性、阻断潜在无意义游荡。随机搜索在这里的贡献是发现链路，不是直接产出终稿。

## 本轮练习得到的规则

这些规则应优先进入未来 skill：

- 先设计因果链，再画地图。
- 关卡职责必须决定测试协议。
- 不要把 witness 加路程当 application。
- 不要把强制动作当难度。
- 组合关必须有跨机制依赖。
- 挑战关必须有长因果链或深规划点，而不是只增加步数。
- 随机搜索可以挖链路，但成品需要 LLM 和 solver 共同精修。
- Solver 的 pass 只说明硬条件成立，不说明关卡好玩。
- LLM 的审美判断必须回到 trace、状态图或可观察空间结构。

## 后续工程任务

下一步不是扩大候选数量，而是让工具支持这个循环：

- 增加 trace snapshot 输出，方便 LLM 读取关键状态。第一版已由 `explain-level` / `explain-layout` / `levelAnalyzer` 实现。
- 增加反事实检查的轻量 CLI。
- 增加完整图统计：可达状态、通关状态、最短通关路径数量。
- 记录关键事件发生时的地图快照。
- 为随机候选增加 event signature filter。
- 为候选报告增加 `causal_chain` 字段，由 LLM 或人工填写。
- 暂缓把“有趣度/教学性”写成 evaluator 硬指标。
