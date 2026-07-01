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

## 矿工调用权重纪律

`mine` 的默认 `rankingPriorScore` 是搜索优先级，不是机制质量评价。当前
`ice_slide_escape` 矿工已经从纯 event-only prior 调整为“机制发现 + 设计灵感”
prior：它会压低一维 witness 和二维同起终点样本，优先展示不同 edge start /
edge goal 的二维素材、多 push 链、混合机制链和异质 push 角色。

CLI 裸 `mine` 默认使用随机 seed，报告中会打印实际 seed。LLM / designer 可以
多次调用矿工寻找灵感；若要复现某次结果，必须显式传 `--seed`。

默认 prior 仍会降低纯 d5、纯 d6 和 boundary disappearance witness 的优先级，
是为了避免默认结果被大空间、开放边界或长距离分支淹没；这不表示这些机制差，
也不表示它们不该出现在关卡中。

LLM / designer agent 如果本轮目标就是某个低默认权重机制，应该显式传 objective
或 inline weight：

```text
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight pass_through_d5=20 --weight restart_after_group=8
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight destroy_group_d6_plus=20 --weight restart_after_group=8
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight boundary_disappear=18
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight stopper_cascade_candidate=30 --weight mixed_mechanic_chain=12
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight heterogeneous_push_roles=100 --weight mixed_mechanic_chain=80
npx tsx src/cli.ts mine prototypes/ice_slide_escape --weight two_dimensional_structure=12 --weight row_probe=-30
```

权重只影响发现排序；不能改变 runtime 规则、solver 结果、hard gates、图穷尽状态
或候选是否可接受。

负权重也只影响排序，不能当成“不能触发某机制”的 hard ban。若 brief 要求“胜利路径必须用 X 机制，且玩家任意可达尝试都不能触发 Y 机制”，应先用矿工找候选，再对具体 layout 运行：

```text
npx tsx src/cli.ts compare-starts-layout prototypes/ice_slide_escape candidate.txt --player-goal x,y --starts a,b --required-winning-events X --forbidden-reachable-events Y1,Y2 --max-states 12000 --max-depth 100 --graph-max-states 12000
```

只有当 required / forbidden 探针在完整搜索下通过，才能说当前预算内所有胜利路径
满足该机制约束。超预算时结论是 `unknown`。
只有当 required-winning 探针和 forbidden-reachable 可达扫描都在完整搜索下通过，
才能说当前预算内满足该机制约束。超预算时结论是 `unknown`。

阅读矿工报告时，优先看 `Review notes`：

```text
- Row probe 只校准距离语义，不当作布局灵感。
- Cascade lead 要继续证明冰产物被后续消费，并用 prefix probe 检查错序。
- Branching win DAG 要区分真实选择和无害顺序自由。
```

贴矿工结果时必须同时贴 `Solve instance` 的 `start / goal`，或贴带 `S / X`
标记的布局。不要把布局里的 `G` 当玩家终点；`G` 是冰 target，玩家终点来自
`player_goal`。

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

只有在 meta-interface redesign 中被明确声明为目标 solve instance 的一部分，
并且形成不同解法逻辑链时，额外边缘才应被视为正向价值。对于带 A/B/C/D 接口的
候选，A/B/C/D 起点通向 A/B/C/D 之外其它边缘目标的可解性仍然是风险；`C/D->A/B`
属于明确忽略的反向内部 pair，不比较 cost / salience，也不生成 caveat。

## 基础关后的元接口再设计

元接口不是对每个候选机械枚举入口 / 出口的检查项。默认模式是
`base_after_redesign`：基于一个已经有保留价值的普通关进行二次设计和优化。
`meta_first_design` 只有人类 brief 显式要求时启用，见下节。

当一个常规候选的 A->B 已经作为普通关扎实成立，或至少是值得人类查看的
promising base candidate 时，designer 必须考虑一次 meta-interface redesign：

```text
base candidate A->B 有保留价值
-> 在不破坏 A->B 核心解结构的前提下，阅读它是否存在同结构重读潜力
-> 如有潜力，主动改造结构来构造 C->D 新逻辑链
-> 重新验证 A->B 是否仍然成立
-> 验证 C->D 是否形成不同逻辑链
-> 让 critic 同时评价 base 质量和 redesign 是否真正增值
```

meta redesign 的设计入口不是枚举入口 / 出口。Designer 应先读 A->B 的墙、冰、
目标、边缘位置、潜伏元素和路线含义，主动尝试开墙、加冰、加入潜伏障碍、改变
入口出口读法等结构改动，在保护 A->B 核心逻辑链的前提下构造 C->D。工具的
start/goal pair 检查只用于验证已经提出的 C->D 假设，以及按
`interface_pair_policy` 记录 external edge escape / 内部 pair 类别。

如果 C->D 形成有趣的同结构重读，base 解中存在无用冰、弱作用元素或轻微噪声
可以被更宽容地看待。critic 应判断它是否严重污染 base 阅读，以及是否在 C->D
中获得 payoff，而不是把潜伏元素本身当成自动扣分。

meta redesign 不要求额外制造一个独立的多轮审稿仪式。如果 redesign 只是候选的
附加潜力，记录尝试和证据即可；如果 designer 把 meta 作为核心亮点，或改动影响
A->B 的 claim / 证据 / role fit，则把 base+meta 一起放入当前候选的正常 review
loop。

meta redesign 可以抬升 `thin_but_valid` 的 base，但不能替代普通设计循环：成功
时评审 base+meta；失败时回到 base 的普通质量判断。A->B 如果只是太简单、太薄
或有轻微路线瑕疵，可以作为 meta 材料；但核心 claim、工具证据、可读性或未授权
变体问题不能靠 meta 洗白。若没有值得做 meta redesign 的基础关，记录
`skipped_no_base` 或 `skipped_no_opportunity`。

本原型中的元接口不是“多开几个入口 / 出口”，而是同一重置布局下的定向实例
重读：

```text
base_instance: A -> B
  当前流程中的基础关。必须扎实、可读、证据成立。

meta_instance: C -> D
  同一结构材料在重访时产生另一条有趣解法。它可以默认使用本原型所有机制事件，
  因为 meta 流程被视为最后期流程；除非 experiment brief 明确限制，不要沿用
  base_instance 的机制暴露 cutoff。
```

再设计阶段至少应问：

```text
1. A->B 的基础解是否仍然扎实成立？
2. 是否值得通过小改动、潜伏元素或入口出口重读形成 C->D？
3. C->D 与 A->B 的 causal_chain_delta 是什么？
4. 哪些结构材料被复用，并在两条解法中承担不同角色？
5. base 解中看似弱作用 / 无作用 / 当前不可推的潜伏元素，是否在 C->D 中获得意义？
6. C->D 是否只是换入口、换出口、缩短路线，或原解克隆？
```

如果推荐一个元接口再设计变体，应记录：

```yaml
meta_reinterpretation_variant:
  base_candidate: CANDIDATE_ID
  meta_design_mode: base_after_redesign
  base_candidate_status: solid | promising | thin_but_valid | failed_base | unknown
  redesign_decision: skipped_no_base | skipped_no_opportunity | attempted | recommended
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
    allowed_exposure_through: ice_destroy_group_d6_plus
    causal_chain: ""
    chain_delta_from_base: ""
  shared_structure:
    - ""
  latent_elements_from_base:
    - element: ""
      base_reading: unused | weak_role | impossible_now | incidental | other
      meta_payoff: ""
  interface_pair_policy:
    declared_interface_points: [A, B, C, D]
    target_pairs: ["A->B", "C->D"]
    ignored_internal_reverse_pairs: ["C->A", "C->B", "D->A", "D->B"]
    risky_non_target_pair_scope:
      - "A/B/C/D -> edge goals outside A/B/C/D"
      - "internal non-target pairs not listed under ignored_internal_reverse_pairs"
  edge_pair_diagnostics:
    external_edge_escape_checks: []
    risky_internal_non_target_pairs: []
    ignored_internal_reverse_pairs: []
  preserves_base_solution: true | false | unknown
  creates_base_bypass: true | false | unknown
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
  notes: ""
```

`ignored_internal_reverse_pairs` 默认留空；只有工具已经枚举或报告了 `C/D->A/B`
pair 时，才把对应事实填入这里，并保持 `verdict_effect: none`。不要为了填充
packet 专门检查 `C/D->A/B`。

## Meta-First 设计流程

`meta_first_design` 是本原型的显式实验模式，不默认启用。只有 human brief 明确要
求“直接设计 meta + base 流程”或写明 `meta_design_mode: meta_first_design` 时，
designer 才应一开始就共同设计 A->B 与 C->D。

Meta-first 候选进入 review 前必须把 base + meta 作为一个整体 packet 提交：

```yaml
meta_reinterpretation:
  meta_design_mode: meta_first_design
  base_instance:
    start: [x, y]
    goal: [x, y]
    allowed_exposure_through: null
    claimed_core_events: []
    causal_chain: ""
    intended_difficulty_score: null
  meta_instance:
    start: [x, y]
    goal: [x, y]
    allowed_exposure_through: ice_destroy_group_d6_plus | restricted_by_brief
    claimed_core_events: []
    causal_chain: ""
    intended_difficulty_score: null
  shared_structure: []
  chain_delta_from_base: ""
  cross_visit_payoff: ""
  base_time_masking: ""
  latent_or_lure_elements: []
  interface_legality:
    starts_and_goals_checked: []
    d_wall_or_multi_interface_notes: ""
  interface_pair_policy:
    declared_interface_points: [A, B, C, D]
    target_pairs: ["A->B", "C->D"]
    ignored_internal_reverse_pairs: ["C->A", "C->B", "D->A", "D->B"]
    risky_non_target_pair_scope:
      - "A/B/C/D -> edge goals outside A/B/C/D"
      - "internal non-target pairs not listed under ignored_internal_reverse_pairs"
  edge_pair_diagnostics:
    external_edge_escape_checks: []
    risky_internal_non_target_pairs: []
    ignored_internal_reverse_pairs: []
  design_target:
    aesthetic_score: null
    difficulty_score: null
    allowed_exposure_through: null
```

要求：

```text
- base 和 meta 逻辑链完全不同。
- 至少一条流程有真正洞见、非局部回读或强要素耦合（常见的方式是base薄而meta厚，二者都厚则最优）。
- 同一中间区域 / 同一批元素在 base 和 meta 中都承担核心但不同的角色。
- meta 流程是后期玩家回访流程，难度应该以游戏终局难度考虑，不宜再使用简单顺序锁、witness拼接。
- base 视角下可以有诱惑、疑问、可达但 target 状态不兼容的结构，回访时兑现。
- 需要显式验证可达性和机制事件暴露。以下情况必须 reject 并调整结构：base
  流程的完整可达事件扫描命中后期 forbidden-if-seen-anywhere 事件；A/B/C/D
  任一起点能可解到 A/B/C/D 之外其它边缘目标；或未被忽略的内部非目标 pair
  破坏目标入口/出口读法。`C/D->A/B` 默认无风险，不能作为 reject 或 caveat。
- 后期机制事件在 base 流程中被合理遮蔽，不提前暴露。在 base 流程中，仅 meta
  流程中可用的机制触发结构可以被视觉上埋伏，但不能在 base 的可达事件扫描中
  实际触发；视觉遮蔽仍由 critic 从玩家视角评价。
```

典型反例：

```text
- base 和 meta 像两个独立小关拼接。
- meta 只是后期从另一边走一遍。
- meta 只是简单顺序门或单次后期机制应用。
- meta 和 base 思维链接近
```

每次 meta-first review loop 必须把 base + meta 一起提交给 critic。critic 必须
分别评价 `base_quality`、`meta_quality`、`cross_visit_reuse`，不能混杂。
evidence reviewer 也必须分别检查 base / meta 的 trace、claimed_core_events、
forbidden-if-seen-anywhere 暴露、起终点合法性。

## 元接口审美加分

这个原型重视优雅的同结构重读。

正向例子：

```text
- A->B 是清晰前期关；C->D 使用同一组墙、冰、目标关系，但要求完全不同的规划。
- base 解中有一块看似无用或当前无法推动的冰，C->D 中它成为关键资源或阻碍。
- C->D 不使用新规则，但难度、空间读法或因果耦合比 A->B 高很多档。
- C->D 使用后期机制事件或后期玩家模型重新解释 A->B 中看似普通的几何关系。
```

critic 应该对干净、可由 solver 支持的 meta reinterpretation redesign 给予明确
加分。这种加分不能挽救核心失败的候选，但可以区分两个其它质量接近的候选。

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
- C->D 的难度、耦合或推理深度显著高于 A->B，即使用到的机制事件并不更新。
- C->D 使用后期机制事件或后期玩家模型重新解释同一空间，而不是给旧关贴一个新出口。
```

critic 检查 meta-interface 时，应显式判断它是：

```text
meaningful_reinterpretation
interface_clone
connectivity_note_only
bypass_risk
```

非目标 solve instance 必须按 `interface_pair_policy` 分类。`C/D->A/B` 是明确
忽略的反向内部 pair，通常只是工具事实，不等于 bypass、caveat 或 reading risk。
`A/B/C/D -> A/B/C/D` 之外其它边缘目标，以及未被忽略的内部非目标 pair，才进入
风险审查。

`D` 的大地图方向意义不是本关 meta redesign 的核心评价项。D 可以和 B 同侧；邻接关
或大地图结构可以承担后续差异。除非 experiment brief 明确要求，本关只需证明
C->D 是有趣的同结构重读。

## 单关证据边界

跨关移动仍然是未来范围。当前所有 meta-interface claim 都必须退回到单关证据：

```text
- 每个 start / goal pair 分别求解；
- 不要把多个出口合并成一个 any-edge proof；
- 把未来大地图价值标记为设计潜力，而不是已实现行为。
- base_instance 与 meta_instance 分别保存 trace、事件证据和 chain_delta；
- external edge escape 和未被忽略的内部非目标 pair 可作为阅读风险记录，但不自动等同于失败。
- `C/D->A/B` 反向内部 pair 默认 `verdict_effect: none`。
```
