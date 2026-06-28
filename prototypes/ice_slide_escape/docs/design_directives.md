# Ice Slide Escape 设计指令

状态：`ice_slide_escape` 原型专属的 designer / critic 设计政策。

使用本文档时，也应读取：

```text
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
docs/21-current-workflow-standard.md
docs/29-design-archive-contract.md
```

本文档记录跨 `ice_slide_escape` 设计实验都成立的设计优先级。
单个实验允许 / 禁止哪些机制，仍然写在具体 experiment brief 的
`mechanism_scope` 中。

## 显式边缘起终点纪律

每个正式候选都必须按一个或多个显式求解实例来评估：

```yaml
player_start: [x, y]
player_goal: [x, y]
```

不要把“任意边缘都算出口”当成胜利条件。不同的边缘目标格是不同的
solve instance，必须分别验证。

## 默认边缘可达性政策

普通单关候选评审时，应围绕声明的 `player_start` 和 `player_goal`
判断玩家面对的主要路线。

在普通候选的 base solve instance 中，额外可达边缘格默认是风险：

```text
- 可能是 bypass。
- 可能削弱显式 edge-goal 契约。
- 未来拼接大地图时，可能变成意外出口。
```

只有在 meta-interface pass 中被明确声明为目标 solve instance 的一部分，并且
形成不同解法逻辑链时，额外边缘才应被视为正向价值。非目标 pair 的可解性需要
记录，但不默认打回；只有当它抢走目标解读、明显更自然，或破坏 base 关阅读时
才构成问题。

## 必做元接口检查

一个常规候选已经能在声明的 start / goal 下通关后，designer 必须执行
meta-interface pass；如果不适合做，也必须说明原因。

本原型中的元接口不是“多开几个入口 / 出口”，而是同一重置布局下的定向实例
重读：

```text
base_instance: A -> B
  当前流程中的基础关。必须扎实、可读、证据成立。

meta_instance: C -> D
  同一结构材料在重访时产生另一条有趣解法。它可以默认使用本原型所有知识，
  因为元机制被视为最后期知识；除非 experiment brief 明确限制，不要沿用
  base_instance 的知识范围。
```

这一步至少应问：

```text
1. A->B 的基础解是否仍然扎实成立？
2. 是否存在或能通过小改动形成 C->D，使同一结构被读成另一条解法？
3. C->D 与 A->B 的 causal_chain_delta 是什么？
4. 哪些结构材料被复用，并在两条解法中承担不同角色？
5. base 解中看似弱作用 / 无作用 / 当前不可推的潜伏元素，是否在 C->D 中获得意义？
6. C->D 是否只是换入口、换出口、缩短路线，或原解克隆？
7. C->B、A->D 或其它非目标 pair 是否会抢走 C->D 阅读，而不是仅仅“也可解”？
```

如果推荐一个元接口变体，应记录：

```yaml
meta_reinterpretation_variant:
  base_candidate: CANDIDATE_ID
  edits: []
  base_instance:
    start: [x, y]
    goal: [x, y]
    claim: normal_route
    causal_chain: ""
  meta_instance:
    start: [x, y]
    goal: [x, y]
    claim: reinterpretation_route
    allowed_knowledge_scope: all_prototype_knowledge_by_default
    causal_chain: ""
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
  preserves_base_solution: true | false | unknown
  creates_base_bypass: true | false | unknown
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
  notes: ""
```

## 元接口审美加分

这个原型重视优雅的同结构重读。

正向例子：

```text
- A->B 是清晰前期关；C->D 使用同一组墙、冰、目标关系，但要求完全不同的规划。
- base 解中有一块看似无用或当前无法推动的冰，C->D 中它成为关键资源或阻碍。
- C->D 不使用新规则，但难度、空间读法或因果耦合比 A->B 高很多档。
- C->D 使用后期知识重新解释 A->B 中看似普通的几何关系。
```

critic 应该对干净、可由 solver 支持的 meta reinterpretation 机会给予明确加分。
这种加分不能挽救核心失败的候选，但可以区分两个其它质量接近的候选。

## 等价接口变体不加分

仅仅打开一段墙、增加一个新入口或新出口，但新 `start / goal` 的解法逻辑链
与原始 solve instance 没有实质差异，不应视为有趣的 meta-interface。

这类变体最多是连通性备注，不是设计亮点：

```text
- 新入口只是把玩家放到原解路线的更早或更近位置。
- 新出口只是缩短原解尾部走路。
- 新 solve instance 仍然消费同一状态、同一对象角色、同一顺序，没有改变读题方式。
- hidden edge 只是“墙开了所以能走”，但开墙本身不依赖当前关的核心机制状态。
```

一个 meta-interface 变体要获得正向评价，至少应满足其中之一：

```text
- C->D 与 A->B 共享结构，但消费不同状态、对象角色或推理关系。
- C->D 改变读题顺序、观察角度、先看到的锁 / 目标结构，且产生不同规划。
- C->D 复用了 base 中潜伏元素，并让它获得明确 payoff。
- C->D 的难度、耦合或推理深度显著高于 A->B，即使用到的知识并不更新。
- C->D 使用后期知识重新解释同一空间，而不是给旧关贴一个新出口。
```

critic 检查 meta-interface 时，应显式判断它是：

```text
meaningful_reinterpretation
interface_clone
connectivity_note_only
bypass_risk
```

`C->B`、`A->D` 或其它非目标 solve instance 的存在通常只是记录项，不等于
bypass。只有当非目标路线比 C->D 更显眼、更短、更自然，或导致玩家不再需要
理解 C->D 的目标逻辑时，critic 才应把它升级为攻击。

`D` 的大地图方向意义不是本关 meta pass 的核心评价项。D 可以和 B 同侧；邻接关
或大地图结构可以承担后续差异。除非 experiment brief 明确要求，本关只需证明
C->D 是有趣的同结构重读。

## 单关证据边界

跨关移动仍然是未来范围。当前所有 meta-interface claim 都必须退回到单关证据：

```text
- 每个 start / goal pair 分别求解；
- 不要把多个出口合并成一个 any-edge proof；
- 把未来大地图价值标记为设计潜力，而不是已实现行为。
- base_instance 与 meta_instance 分别保存 trace、事件证据和 chain_delta；
- 非目标 pair 可作为阅读风险记录，但不自动等同于失败。
```
