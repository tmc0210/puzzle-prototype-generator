# Ice Slide Escape 设计指令

状态：`ice_slide_escape` 原型专属关卡设计政策。

同时读取：

```text
prototypes/ice_slide_escape/docs/rules.md
prototypes/ice_slide_escape/docs/solver_contract.md
prototypes/ice_slide_escape/docs/designer_contract.md
prototypes/ice_slide_escape/docs/meta_interfaces.md
docs/17-experience-core-level-design.md
docs/21-level-design-studio-standard.md
docs/29-design-archive-contract.md
```

单次实验允许使用哪些机制，仍由 experiment brief 决定。

## 矿工边界

`mine` 的 `rankingPriorScore` 只决定搜索展示顺序，不评价机制或关卡质量。Designer
必须先有玩家体验核心、作品身份和具体工具问题，再调用矿工寻找结构材料。

默认 prior 会压低一维距离样本、纯 d5/d6 和开放边界样本，优先展示二维结构、
异质推力角色、级联和混合机制链。这只是避免结果被简单样本淹没；目标恰是这些
低权重机制时，应显式传 objective 或 weight。

矿工结果必须带 solve instance 的 `player_start / player_goal`。`G` 是冰 target，
不是玩家出口。required / forbidden 结论只有在对应搜索完整时成立；超预算为
`unknown`。

## 显式起终点

每个版本按一个或多个显式实例验证：

```yaml
player_start: [x, y]
player_goal: [x, y]
```

不同边缘目标格是不同 solve instance，不能合并成“任意边缘出口”。

## 边缘 pair 政策

- `external_edge_escape`：A/B/C/D 起点可解到 A/B/C/D 之外的其它边缘 goal；记录为风险。
- `internal_non_target_pair`：起点和 goal 都在 A/B/C/D 内，但不是目标 pair；按 brief 判断。
- `ignored_internal_reverse_pair`：C/D->A/B；默认只记录事实，`verdict_effect: none`。

不要为了填表额外枚举 C/D->A/B。额外边缘可达性不能自动成为亮点；只有它被声明
为具体 meta instance 并形成另一段玩家体验时，才进入作品设计。

## Base 后的 Meta 再设计

当一个本轮 baseline 或 branch 已经值得保留，且 brief 未禁用 meta routing 时，
可以尝试同布局重读：

```text
A->B 当前作品成立
-> 声明 C->D 希望产生的另一段玩家体验
-> 在保护 A->B 作品身份的前提下修改结构
-> 分别重跑 A->B 与 C->D 硬证据
-> 作为独立 branch 平级交给人类试玩
```

有效重读要求 C->D 改变状态消费、对象责任、阅读顺序或核心操作关系。只换入口、
缩短路程或从另一侧复述同一路线，属于 `interface_clone` 或
`connectivity_note_only`，不进入作品集。

Meta 分支记录：

```yaml
meta_reinterpretation_variant:
  base_candidate:
  base_instance: {start: [], goal: [], experience: ""}
  meta_instance: {start: [], goal: [], experience: ""}
  edits: []
  shared_structure: []
  changed_state_consumption: []
  latent_elements_and_payoff: []
  interface_pair_policy:
    declared_interface_points: [A, B, C, D]
    target_pairs: ["A->B", "C->D"]
    ignored_internal_reverse_pairs: ["C->A", "C->B", "D->A", "D->B"]
  preserves_base_identity: true | false | unknown
  creates_base_bypass: true | false | unknown
  classification: meaningful_reinterpretation | interface_clone | connectivity_note_only | bypass_risk
```

Meta payoff 不能补偿 A->B 中明确可修的问题。若潜伏元素污染 base 读法，即使它在
C->D 获得用途，也应由人类试玩判断两个版本是否值得共同保留。

## Meta-First 模式

只有 human brief 明确写出 `meta_design_mode: meta_first_design` 时启用。此时 A->B
与 C->D 共同构成一个体验核心，baseline 从一开始就包含两个 solve instance。

必须满足：

- 两个实例各自有完整玩家体验，且共同使用同一批结构材料；
- 它们在状态消费、对象角色、规划或阅读顺序上不同；
- base 的完整可达扫描不提前触发 brief 禁止的后期事件；
- A/B/C/D 到外部其它边缘的 escape 被检查；C/D->A/B 仍按默认忽略政策；
- 任一布局修改后分别重跑两个实例的证据。

两个独立小题塞进同一布局、从新入口重走旧路线、或仅靠新出口缩短尾部，都不是
meta-first 作品。

## 提交前清理

版本进入 human portfolio 前运行 `pre_human_polish_checklist.md`。清理只处理明确的
呈现和冗余问题；任何改变 layout、start、goal、胜利条件或核心机制使用的修改都
产生新版本并重跑硬证据。清理结果不产生审美结论。

## 人类作品集

Base、meta reinterpretation 和 meta-first 作品平级描述各自玩家体验、共享结构、
相对增量、已知风险与证据边界。LLM 不用 pair 数量、路线长度或图指标排序。
