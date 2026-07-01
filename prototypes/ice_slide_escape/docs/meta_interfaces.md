# Ice Slide Escape 元接口说明

状态：面向未来大地图设计的原型专属设计说明。它不是当前单关 runtime 的新增规
则。

`ice_slide_escape` 当前仍按单个矩形关卡设计和验证。未来项目可能把多个矩形关
卡拼成大地图；玩家从一个关卡切换到另一个关卡时，进入的关卡会重置。因此，本
原型的元接口重点不是“一个正常解同时打开多个方向”，而是：

```text
同一个重置布局
+ 不同入口 / 出口 solve instance
+ 可能更后期的机制暴露阶段 / 玩家模型
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
  default_allowed_exposure_through: ice_destroy_group_d6_plus
  requirement:
    - 与 A->B 共享关键结构材料
    - 解法逻辑链显著不同
    - 不是换入口 / 换出口 / 缩短路线
```

`meta_instance` 默认可以使用本原型机制暴露序列中的全部事件，因为 meta 流程在
本原型中被视为最后期流程。它也不必须使用更晚的机制事件：如果 A->B 是低暴露
低难度，C->D 使用相近事件但难度、耦合或规划深度高很多档，也可以成立。

## 设计模式

本原型有两种 meta 设计入口。它们共享同一证据边界和审美标准，但启用条件不同：

```yaml
base_after_redesign:
  trigger: 默认 routing / 原型专属 redesign opportunity
  meaning: >
    先有一个 A->B 普通候选，再判断是否值得通过小改动、潜伏元素或入口出口重读
    形成 C->D。
  default: true

meta_first_design:
  trigger: 只有人类 brief 显式要求时启用
  meaning: >
    一开始就共同设计 A->B 与 C->D。它不要求先产出独立 base 后再改造，但每次
    review 都必须把 base + meta 作为一个整体提交。
  default: false
```

如果 brief 没有明确写 `meta_first_design`，designer 只需要完成 meta routing：
判断是否有 base-after redesign 机会，不能把 meta-first 当作默认流程。

## 潜伏元素

元接口候选允许存在 base 解中看似无用、弱作用、甚至当前根本不可推动的元素。
这不自动构成审美扣分。判断标准是：

```text
- 它是否严重污染 A->B 的阅读？
- 它是否在 C->D 中获得明确角色或 payoff？
- 它是否让同一结构在重访时被重新理解？
```

如果潜伏元素只制造噪声、没有 meta payoff，critic 仍应攻击它。

## Meta Reinterpretation Redesign

`base_after_redesign` 不是机械筛查，也不是遍历所有边缘 pair 的工具流程。它是
在普通候选 A->B 已经有保留价值后，对同一布局材料进行二次设计和优化。

正确入口：

```text
A->B 作为普通关扎实成立，或至少是 promising base candidate
-> 在不破坏 A->B 核心解结构的前提下，阅读它是否有 C->D 同结构重读潜力
-> 主动改造结构来构造 C->D 新逻辑链，例如开墙、加冰、加入潜伏障碍、
   改变入口出口读法，或让 base 中弱作用元素在 C->D 中获得角色
-> 分别验证 A->B 和 C->D
-> critic 判断 redesign 是否真正增值
```

这里的重点是主动构造，而不是从工具结果中寻找巧合。Designer 应先提出 C->D
的读法假设，再用工具验证；不要通过枚举 start/goal pair 来寻找 meta insight。
start/goal pair 检查只能验证已经构造出的 C->D 假设，或按本文的
`interface_pair_policy` 记录风险/忽略类别。

meta redesign 的基本约束是保护 A->B：改动后 A->B 仍应成立，且核心逻辑链不应
被替换成另一条解或被明显 bypass。C->D 则应形成不同 causal_chain；如果只是原
解克隆、缩短路线、纯连通性或换出口，不构成有价值的 meta redesign。

meta redesign 可以抬升可用但偏薄的 base，但不能替代普通设计循环：成功时评
审 base+meta；失败时回到 base 的普通质量判断。A->B 如果只是太简单、太薄或有
轻微路线瑕疵，可以作为 meta 材料；但核心 claim、工具证据、可读性或未授权变
体问题不能靠 meta 洗白。

再设计阶段问：

```text
1. A->B 是否作为普通关独立成立？
2. 是否值得通过小改动、潜伏元素或入口出口重读形成 C->D？
3. C->D 的 causal_chain 与 A->B 有什么实质差异？
4. 哪些墙、冰、目标、边缘位置或空间关系被两条解法共同使用？
5. 哪些 base 潜伏元素在 C->D 中获得意义？
6. C->D 是否只是 interface_clone？
7. 是否存在 A/B/C/D 起点通向接口外边缘的 external edge escape？
8. 是否存在未被 `interface_pair_policy` 忽略的内部非目标 pair 抢走目标阅读？
```

推荐记录格式：

```yaml
meta_reinterpretation:
  meta_design_mode: base_after_redesign
  base_candidate_status: solid | promising | thin_but_valid | failed_base | unknown
  redesign_decision: skipped_no_base | skipped_no_opportunity | attempted | recommended
  base_instance:
    start: [x, y]
    goal: [x, y]
    allowed_exposure_through: null
    claimed_core_events: []
    causal_chain: ""
    intended_difficulty_score: null
    evidence_refs: []
  meta_instance:
    start: [x, y]
    goal: [x, y]
    allowed_exposure_through: ice_destroy_group_d6_plus | restricted_by_brief
    claimed_core_events: []
    causal_chain: ""
    intended_difficulty_score: null
    evidence_refs: []
  chain_delta_from_base: ""
  cross_visit_payoff: ""
  base_time_masking: ""
  shared_structure:
    - ""
  latent_or_lure_elements:
    - element: ""
      base_reading: unused | weak_role | impossible_now | incidental | other
      meta_payoff: ""
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
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
  notes: ""
```

`ignored_internal_reverse_pairs` 默认留空；只有工具已经枚举或报告了 `C/D->A/B`
pair 时，才把对应事实填入这里，并保持 `verdict_effect: none`。

## Meta-First Design

`meta_first_design` 是冰原原型的显式高价值探索流程。只有人类 brief 明确要求
“直接设计 meta + base 流程”或写明 `meta_design_mode: meta_first_design` 时启用。

进入 review 的 meta-first 候选必须提交整体 packet：

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
    evidence_refs: []
  meta_instance:
    start: [x, y]
    goal: [x, y]
    allowed_exposure_through: ice_destroy_group_d6_plus | restricted_by_brief
    claimed_core_events: []
    causal_chain: ""
    intended_difficulty_score: null
    evidence_refs: []
  shared_structure:
    - ""
  chain_delta_from_base: ""
  cross_visit_payoff: ""
  base_time_masking: ""
  latent_or_lure_elements:
    - element: ""
      base_reading: ""
      meta_payoff: ""
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

优先追求：

```text
- base 和 meta 逻辑链完全不同。
- 至少一条流程有真正洞见、状态债、非局部回读或强要素耦合。
- 同一中间区域 / 同一批元素在 base 和 meta 中都承担核心但不同的角色。
- meta 内部步骤之间有状态消费关系，而不是“先解一个局部，再开一个独立出口”。
- base 视角下可以有诱惑、疑问、可达但 target 状态不兼容的结构，回访时兑现。
- 后期机制事件在 base 流程中被合理遮蔽；base 可达事件扫描不得命中
  `allowed_exposure_through` 之后的 forbidden-if-seen-anywhere 事件。
- 若使用 D-wall 或多接口结构，必须显式说明每个接口的合法性与可达性。
```

额外 reject / hold 标准：

```text
- base 和 meta 像两个独立小关拼接。
- meta 只是后期从另一边走一遍。
- meta 只是简单顺序门或单次后期机制应用。
- 设计亮点主要是“证据干净、流程能走通”，而非洞见或耦合。
- 候选复用已有 archive candidate 的结构家族、主因果链或入口出口关系。
```

Meta-first review 必须把 base + meta 一起提交给 evidence reviewer 和 critic。
evidence reviewer 必须分别检查 base / meta 的 trace、claimed_core_events、接口
合法性、D-wall / 多接口可达性，以及 base 窗口的 forbidden-if-seen-anywhere
暴露。critic 必须分别评价 `base_quality`、`meta_quality`、`cross_visit_reuse`。
任何一段存在核心攻击，都不能用“整体 meta 感不错”关闭 review loop。

## Interface Pair Policy

目标 pair 固定为 `A->B` 和 `C->D`。其它 pair 不再用一个含糊的
`non_target_pairs` 桶评价，而是按类别处理：

```yaml
interface_pair_policy:
  declared_interface_points: [A, B, C, D]
  target_pairs: ["A->B", "C->D"]
  ignored_internal_reverse_pairs:
    - "C->A"
    - "C->B"
    - "D->A"
    - "D->B"
  risky_non_target_pair_scope:
    - "A/B/C/D -> edge goals outside A/B/C/D"
    - "internal non-target pairs not listed under ignored_internal_reverse_pairs"
```

`C/D -> A/B` 是已去过 base 区域的反向内部 pair。默认情况下，它不参与
`C->D` 审美审核，不比较 cost / salience / route naturalness，不生成 caveat 或
core attack。若工具枚举到了这些 pair，只能记录为 ignored evidence，critic 的
`verdict_effect` 必须是 `none`，除非 experiment brief 明确改写本政策。不要为了
填充 packet 专门检查 `C/D->A/B`。

从 A/B/C/D 任一起点通向 A/B/C/D 之外其它边缘目标的可解性仍然是风险，因为它可
能制造意外出口、削弱显式 edge-goal 契约，或在未来大地图中形成错误路由。其它
未被忽略的内部非目标 pair 也可以作为风险记录，特别是它们破坏 A->B 核心义务、
抢走目标入口/出口读法，或违反 experiment brief 时。

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
```

每个 instance 分别保存 solver trace、事件证据、winning-path / reachable-event 检查和图
证据边界。不要把多个出口合并成一个 “any edge” proof。
如果工具已经报告 ignored internal reverse pair，把它写入
`edge_pair_diagnostics.ignored_internal_reverse_pairs`，不要把它提升成必跑
`solve_instances`。

工具检查是验证步骤，不是洞察来源。若没有先形成 C->D 的 player-facing 读法和
chain_delta_from_base，start/goal pair 结果通常只能说明连通性、原解克隆或风
险，不能单独支持 meaningful_reinterpretation。

Reviewer / critic 应重点检查：

```text
- A->B 是否仍是扎实普通关？
- C->D 是否是同结构重读，而不是第二关硬缝上去？
- chain_delta_from_base 是否具体？
- 潜伏元素是否有 payoff？
- 是否存在 A/B/C/D 起点通向接口外边缘的 external edge escape？
- 未被忽略的内部非目标 pair 是否真的抢走阅读，还是只是可记录事实？
- C/D->A/B 反向内部 pair 是否被正确标为 `verdict_effect: none`？
- D 的大地图方向是否被过度解读？除非 brief 要求，本关不需要证明 D 的独立方向意义。
```
