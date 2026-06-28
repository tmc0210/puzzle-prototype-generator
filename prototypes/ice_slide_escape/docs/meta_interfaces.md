# Ice Slide Escape 元接口说明

状态：面向未来大地图设计的原型专属设计说明。它不是当前单关 runtime 的新增规
则。

`ice_slide_escape` 当前仍按单个矩形关卡设计和验证。未来项目可能把多个矩形关
卡拼成大地图；玩家从一个关卡切换到另一个关卡时，进入的关卡会重置。因此，本
原型的元接口重点不是“一个正常解同时打开多个方向”，而是：

```text
同一个重置布局
+ 不同入口 / 出口 solve instance
+ 可能更后期的玩家知识
=> 同结构材料被读成另一条有趣解法
```

## 当前范围

当前已经实现：

```yaml
implemented_now:
  - 单矩形关卡 runtime
  - 单关 solver instance
  - 每次 solve request 显式指定一个 edge start 和一个 edge goal
  - 单关工具证据
```

当前未实现：

```yaml
not_implemented_now:
  - 跨关移动 runtime
  - 大地图全局状态
  - 多矩形关卡路由
  - 邻接关边缘坐标映射
  - 多关持久目标状态
```

单关 solver 每次仍只接收一个具体 `player_start` 和一个具体 `player_goal`。同
一个布局可以被多个 `(edge_start, edge_goal)` pair 检查，但每个 pair 都是独立
problem instance，不能合并成 “any edge” 证明。

## 长期大地图模型

未来大地图可能由多个矩形关卡拼接而成，边缘格对应邻接关的入口格。具体坐标映
射、跨关移动、持久状态和全局路由仍是未来范围，当前文档不发明这些细节。

设计上只保留一个重要假设：

```text
玩家第一次从 A 入口解到 B 出口后，未来可能从 C 入口重访同一布局。
因为切换地图会重置关卡，C->D 面对的是同一初始布局，而不是 A->B 结束后的状态。
```

## 元接口定义

一个有价值的元接口应被写成一对定向实例：

```yaml
base_instance:
  start: A
  goal: B
  role: 当前流程中的基础关
  requirement:
    - 解法扎实
    - 读题干净
    - 工具证据成立

meta_instance:
  start: C
  goal: D
  role: 重访时的同结构重读
  default_knowledge_scope: all_prototype_knowledge
  requirement:
    - 与 A->B 共享关键结构材料
    - 解法逻辑链显著不同
    - 不是换入口 / 换出口 / 缩短路线
```

`meta_instance` 默认可以使用本原型所有知识，因为元机制在本原型中被视为最后
期知识。它也不必须使用未来知识：如果 A->B 是低知识低难度，C->D 使用相近知
识但难度、耦合或规划深度高很多档，也可以成立。

## 潜伏元素

元接口候选允许存在 base 解中看似无用、弱作用、甚至当前根本不可推动的元素。
这不自动构成审美扣分。判断标准是：

```text
- 它是否严重污染 A->B 的阅读？
- 它是否在 C->D 中获得明确角色或 payoff？
- 它是否让同一结构在重访时被重新理解？
```

如果潜伏元素只制造噪声、没有 meta payoff，critic 仍应攻击它。

## Meta Reinterpretation Pass

普通候选的 A->B 已经成立后，designer 应执行 meta reinterpretation pass。

这一步问：

```text
1. A->B 是否作为普通关独立成立？
2. 是否存在或可通过小改动形成 C->D？
3. C->D 的 causal_chain 与 A->B 有什么实质差异？
4. 哪些墙、冰、目标、边缘位置或空间关系被两条解法共同使用？
5. 哪些 base 潜伏元素在 C->D 中获得意义？
6. C->D 是否只是 interface_clone？
7. C->B、A->D 或其它非目标 pair 是否会抢走 C->D 的阅读？
```

推荐记录格式：

```yaml
meta_reinterpretation_candidate:
  base_instance:
    start: [x, y]
    goal: [x, y]
    causal_chain: ""
    evidence_refs: []
  meta_instance:
    start: [x, y]
    goal: [x, y]
    knowledge_scope: all_prototype_knowledge | restricted_by_brief
    causal_chain: ""
    evidence_refs: []
  chain_delta_from_base: ""
  shared_structure:
    - ""
  latent_elements_from_base:
    - element: ""
      base_reading: unused | weak_role | impossible_now | incidental | other
      meta_payoff: ""
  non_target_pairs:
    - pair: "C->B"
      result: unknown | unsolved | solved
      risk: none | steals_reading | bypasses_base | confusing | other
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
  notes: ""
```

## 非目标 Pair

`C->B`、`A->D` 或其它非目标 pair 的存在通常不是失败。玩家从 C 进入时，B 通
常指向已经去过的区域；这个方向在大地图语义下没有强动机。

需要升级为问题的情况：

```text
- C->B 比 C->D 更显眼、更短、更自然，导致玩家不读 C->D；
- 非目标 pair 绕过了 A->B 的核心义务，破坏 base 关；
- 非目标 pair 让 C->D 的目标出口变得不可读或像误导；
- experiment brief 明确要求排除某类额外解。
```

## 审美标签

推荐标签：

```yaml
meaningful_reinterpretation:
  meaning: A->B 与 C->D 共享结构，但解法逻辑链显著不同。

interface_clone:
  meaning: 新入口 / 出口只是复制原解、缩短路线或移动起终点。

connectivity_note_only:
  meaning: 技术上可连通或可求解，但没有明确重读价值。

bypass_risk:
  meaning: 新 pair 绕过核心义务、抢走目标阅读，或破坏 base 解。
```

## 工具与证据

当前工具层不需要实现完整大地图 runtime。元接口证据应退回到多个单关 solve
instance：

```yaml
solve_instances:
  - start: A
    goal: B
    claim: base_instance
  - start: C
    goal: D
    claim: meta_instance
  - start: C
    goal: B
    claim: non_target_pair_note
```

每个 instance 分别保存 solver trace、事件证据、forbidden/report-only 检查和图
证据边界。不要把多个出口合并成一个 “any edge” proof。

Reviewer / critic 应重点检查：

```text
- A->B 是否仍是扎实普通关？
- C->D 是否是同结构重读，而不是第二关硬缝上去？
- chain_delta_from_base 是否具体？
- 潜伏元素是否有 payoff？
- 非目标 pair 是否真的抢走阅读，还是只是可记录的旁路？
- D 的大地图方向是否被过度解读？除非 brief 要求，本关不需要证明 D 的独立方向意义。
```
