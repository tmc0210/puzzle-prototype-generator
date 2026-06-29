# Validated Level Design Loop

Status: active support document. The current short level-design standard is [Current Level Design And Review Standard](21-current-workflow-standard.md). This document keeps the detailed casebook, design taste notes, and failure analyses behind that standard.

本文档记录当前已验证有效的关卡设计流程，以及 `mini_campaign_dry_run_02` 暴露出的退化反模式。它应作为后续 skill / agent workflow 的防漂移约束。

Current execution note:
`docs/21-current-workflow-standard.md` and `docs/20-multi-agent-prompt-templates.md`
are authoritative for the current review-loop state machine. Older examples in
this file that use `strong_mainline_candidate`, `quality_score`,
`accept_mainline`, or linear gate language are historical case material, not the
current output contract. New LLM designer experiments should produce proposal
states such as `proposal_ready`, `held_proposal`, `rejected_candidate`, or
`failed_search` unless a human / authorized campaign-selection pass explicitly
promotes them.

## Scope

本文档首先是机制无关的通用流程文档。`pull_portal_fallback`、拉箱子、传送门、fallback 等内容只作为 case study，不应被泛化为所有原型都拥有的机制。

后续 skill 使用本文档时，必须先把用户给定的规则集转译为该原型自己的：

- core objects
- state-changing events
- exception / boundary events
- win condition
- candidate player abilities
- level roles

然后再套用本文档的流程。

## Generic Gate, Concrete Chain

本文档的判定框架是机制无关的，但具体出题时的 `causal_chain` 必须机制具体。

正确分层：

```text
通用层：
  - 必须先有 causal_chain，再画地图。
  - 状态变化必须被后续步骤消费。
  - application 不能只是 witness。
  - 同构变体不能重复进入主线。

具体层：
  - causal_chain 必须使用当前规则集里的对象、事件、方向、边界和胜利条件。
  - 设计者应直接写出玩家将如何利用这些具体规则。
  - 不能只写“某对象改变某状态”这类空泛描述。
```

例如，在当前 `pull_portal_fallback` prototype 中，好的具体链条应写成：

```text
玩家从上方进入 A
-> B 的下方出口被墙堵住，所以 A 不传送而是向下移动
-> A 原本占据的格子变成通路
-> 玩家穿过 A 原位置，到达 G
```

而不是：

```text
某个边界事件移动某个对象
-> 某个状态被消费
```

后者只能作为通用 schema，不能作为实际关卡设计目标。

## 事故结论

`mini_campaign_dry_run_02` 不是一次成功的全量生成样例。它形式上补齐了槽位，但质量判断退化了。以当前 prototype 为例：

- `S06` 和 `S07` 是同一核心结构的参数变体，不应同时作为主线独立关卡。
- `S05` 是当前 prototype 中的 fallback discovery / witness，不是 application。
- 过程中过度依赖 analyzer pass，把硬条件成立误当成关卡角色成立。
- 没有为每一关写出独立因果链，也没有做关卡间新颖性检查。

因此，后续流程不能以 `mini_campaign_dry_run_02` 为成功模板。它只能作为反例和回归测试材料。

## 已验证有效的流程

当前真正被验证过的有效流程不是“生成一个候选，然后让 reviewer 打分”。有效流程包含 reviewer 前的主线程设计循环、reviewer 审查、以及 reviewer 后的主线程答辩 / 改稿判断。

完整链路：

```text
0. 进行 preflight：确认规则、胜利条件、边缘交互、对象实例语义和玩家模型
1. 审查 slot viability：坏 slot 先合并、重写、延后或废弃，不用地图硬填
2. 明确本关角色和设计意图
3. 写出预期因果链，而不是先画地图
4. 将因果链嵌入一个紧凑空间结构
5. 主线程运行 analyzer / solver / formal evaluator
6. 主线程读取 trace、key snapshots、反事实和图信息
7. 主线程精修、废弃或重新设计；失败尝试可保留为设计证据
8. 只有硬证据 sanity check 通过后，才提交 reviewer
9. evidence reviewer 判断证据是否支撑 claim
10. puzzle critic 按玩家侧体验和关卡角色挑刺
11. 主线程针对 critic 攻击作出设计判断：
    - 接受攻击并改稿
    - 用具体失败尝试和 analyzer 证据说明为何保留
    - 降级为备选 / fixture
    - 废弃并重做
12. 修改过的候选回到第 5 步重新验证
13. 通过 campaign-level gate 后，才进入候选池或主线
```

关键点：

- Analyzer 只证明硬事实，不证明“这是应用关/挑战关”。
- LLM designer 必须用当前机制的具体对象和事件解释因果链，不得只引用事件计数。
- 主线程 / persistent lead designer 必须亲自读 analyzer 证据并修正候选；一次性子 agent 不能替代这一步。
- 如果一个候选偏离当前意图但质量高，应作为 related candidate 记录，留给之后整组筛选；不能硬塞进当前槽位。
- 旋转、平移、短版、长版、重命名旧关不是 fresh candidate。若没有新的因果责任或新的玩家侧解题含义，应直接视为设计失败，而不是“标记一下继续进入流程”。

## Multi-Agent Review Contract

多 agent 审查流程的通用部分是接口和职责，不是某个 prototype 的具体规则。

通用输入：

```text
prototype_context:
  ruleset_summary
  win_condition
  object_vocabulary
  event_vocabulary
  known_prior_levels_or_related_candidates

slot_claim:
  intended_role
  target abilities / patterns / events
  concrete causal_chain
  consumed_state_changes
  chain_delta_from_previous
  why_mainline_not_hold

analyzer_evidence:
  solvability
  complete_or_budgeted_graph_status
  shortest_solution
  key_event_snapshots
  counterfactuals
  bypass_checks
  state / transition / win counts
```

通用输出：

```text
hard_evidence_tools:
  - solver / analyzer / evaluator 是代码工具，不是 agent。
  - 输出可解性、trace、事件、对象参与、反事实和图统计等硬事实。
  - 不判断关卡审美、角色成立或主线位置。

evidence_reviewer:
  - 只判断 analyzer trace 是否支撑 slot_claim。
  - 可以给出 supports_claim / supports_with_caveats / does_not_support_claim。
  - 不负责审美，也不负责把 role_claim 升级成 challenge。

puzzle_design_critic:
  - 判断玩家侧体验、角色适配、结构优雅度、冗余、重复和公平性。
  - 可以给出 strong_mainline_candidate / mainline_with_caveats / related_candidate_only / reject。
  - 可以认可紧凑小关；不应为了“有难度”要求后置干扰项。

lead_designer_final_decision:
  - 由长期 lead designer / 主线程执行，不交给一次性 curator agent。
  - 汇总代码工具硬事实、两个 reviewer 的意见和当前 campaign 槽位需求。
  - 结合 design memory / casebook 判断重复度、角色漂移和整组节奏。
  - 决定 accept / accept_with_caveats / hold_related_candidate / witness_fixture / reject。
```

规则集必须作为输入传入 reviewer。reviewer prompt 不能硬编码本文档里的拉箱子、传送门或 fallback 示例。

## Designer Must Have Analyzer Feedback

`multi_agent_two_crate_experiment_01` 暴露了一个通用流程问题：

```text
text-only designer
-> plausible causal_chain
-> invalid runtime behavior
```

在空间逻辑谜题里，尤其是存在方向、传送、例外分支、多实例对象时，lead designer 不能只靠自然语言想象关卡是否成立。默认有效模式是主线程 / persistent lead designer 亲自使用 analyzer 证据做设计修正：

```text
lead-designer work mode:
  lead designer 自己运行或调度 analyzer / solver
  只有 evidence sanity check 通过后才提交 slot claim

optional draft-generator mode:
  临时 draft generator 只提出 rough draft
  lead designer / controller 运行 analyzer
  analyzer evidence 回到 lead designer
  lead designer 亲自修正、降级或废弃，再进入 reviewer review
```

进入 reviewer 前的最低 lead-designer sanity check：

```text
- candidate is solvable under confirmed player-facing win condition
- target event patterns are observed in the claimed scope
- object_participation claims match analyzer-reported distinct instances
- if a claim names a blocker/source object, trace contains source-specific evidence
- obvious counterfactuals do not directly refute the claimed main mechanism
```

例如，如果 designer 声称“第二个箱子堵住传送门出口”，则不能只要求：

```text
portal_exit_blocked
```

而应要求 source-specific evidence：

```text
portal_exit_blocked_by_crate:crate#N
```

如果 designer 声称“双箱参与”，则不能只要求：

```text
pull_crate occurs twice
```

而应要求：

```text
crate/moved distinct >= 2
```

Reviewers 的职责不是替 lead designer 做第一次工具验证。reviewers 应审查“证据是否支撑 claim”以及“玩家侧角色是否成立”，而不是反复捕捉 analyzer 一眼能发现的几何错误。

## Multi-Agent Context Boundary

子 agent 不会自动拥有主线程的全部长期认知。除非使用 `fork_context: true` 或在 prompt 中显式提供，它们通常只知道：

```text
1. 当前 prompt 里写给它们的规则摘要。
2. 当前 prompt 里贴给它们的 layout / analyzer 摘要 / designer claim。
3. 它们自己通过工具读取到的文件。
4. 系统暴露给它们的通用技能和工具列表。
```

因此，多 agent 流程中必须区分：

```text
persistent lead designer / main thread:
  拥有完整项目脉络和设计记忆，负责挑选上下文、运行或调度代码工具、整合结论。
  它同时承担最终归档判断；不要再引入一个一次性 curator agent 重新裁决整体设计。

hard-evidence tools:
  solver / analyzer / evaluator 是代码工具。
  它们只报告硬事实，不拥有审美判断或设计意图。

optional draft generator, if any:
  只用于发散 rough draft，不是主流程 designer。
  需要机制规则、目标 slot、已知好/坏样本摘要。
  不能给最终通过结论，也不能替代 lead designer 的 analyzer-backed revision。

evidence reviewer:
  需要 designer claim + analyzer evidence + precise ruleset summary。
  不需要完整历史讨论。

puzzle critic:
  需要 intended player model、role definition、known prior lessons、layout、analyzer facts。
  不应只凭抽象规则审美。
```

当前经验：

```text
fork_context=false + concise prompt:
  好处是隔离、低漂移、便于测试 reviewer 是否仅凭证据判断。
  坏处是缺少我们长期讨论出的设计 taste 和失败模式。

fork_context=true:
  好处是继承更多上下文。
  坏处是可能继承旧错误、历史噪音和当前 prototype 的过拟合。
```

推荐做法不是简单全量 fork，而是由 controller 维护一个 prototype-specific context packet：

```text
ruleset_summary:
  机制规则、胜利条件、多实例对象策略。

role_rubric:
  discovery / application / combination / challenge 的当前定义。

validated_examples:
  1-2 个正样本，1-2 个负样本。

tool_contract:
  designer 必须运行哪些 analyzer 命令。

allowed_tools:
  本任务允许使用的代码工具或项目工具。

allowed_evidence_sources:
  本任务允许引用的证据来源。
```

### Tool And Domain Boundary

后续 skill / workflow 不应硬编码某个具体外部工具名作为禁用项。真正需要泛化的是工具边界：

```text
每个 sub-agent 任务都必须声明 allowed evidence sources 和 allowed tools。
未列入 allowed tools 的领域专用工具、外部游戏运行时、无关 MCP / skill 不得作为证据来源。
```

通用 prompt 不应写成：

```text
Do not use <some-specific-unrelated-tool>.
```

而应写成：

```text
Use only these evidence sources:
  - provided ruleset summary
  - provided analyzer output
  - explicitly referenced project docs
  - tools explicitly listed in this task

Do not use external domain-specific runtimes, skills, or MCP tools unless they are explicitly listed as allowed for this task.
```

如果某次具体任务中确实出现了无关工具误触发，工具名可以记录在该次实验报告或 incident note 里，但不得进入可泛化 skill 的核心规则。

### Reviewer Context Minimum

Reviewer prompt 至少要包含：

```text
- confirmed win condition
- exact movement / interaction rules relevant to the claim
- event semantics, including generic patterns vs instance events
- object participation evidence and its scope
- graph completeness / budget status
- counterfactuals
- role rubric for this review
- known caveats or diagnostic probes
```

否则 reviewer 可能结论方向正确，但理由混入默认 Sokoban 直觉、其他项目经验，或某个无关 skill 的术语。

## Prototype Calibration Fixtures

每个新 prototype 都应该有自己的 reviewer 校准样本，而不是复用 `pull_portal_fallback` 的样本结论。

最低要求：

- 一个负校准样本：analyzer pass，但 designer 明显 overclaim，例如把 witness 说成 application。
- 一个正校准样本：人类或强审查者认可的好关，reviewer 应能通过或带 caveat 通过。

回归测试应检查 verdict 类别，而不是逐字输出：

```text
negative_fixture:
  expected: downgraded_to_witness_or_rejected

positive_fixture:
  expected: accepted_or_accepted_with_caveats
```

当前 prototype 的校准样本：

- 负样本：`stress_v3_true_fallback_application`，见 `multi_agent_review_experiment_01.md`。
- 正样本：`dry_v2_s07_reuse_fallback_challenge`，见 `multi_agent_review_experiment_02.md`。

这两个样本只校准当前 prototype。它们证明 reviewer 架构有用，但不证明换规则后自动可靠。换规则时必须重新生成该 prototype 自己的正负校准样本。

## Event Instances And Patterns

多对象/多组机制下，必须区分运行时事件实例和知识检测用的事件模式。

```text
event instance:
  portal_teleport:A->B
  portal_teleport:D->E
  portal_fallback_push:A

event pattern:
  portal_teleport
  portal_fallback_push
  portal_teleport:A->B
```

含义：

- runtime / solver trace 记录具体事件实例。
- knowledge detector / level spec / expected trace 可以写泛化事件模式。
- `portal_teleport` 匹配任意传送门组的传送事件。
- `portal_teleport:A->B` 只匹配特定实例。

这不是旧事件名的兼容逻辑，而是正式的事件查询语义。知识项应尽量表达机制层面的泛化概念；只有当某个关卡目标确实要求特定对象或特定传送门组时，才在 detector 中写具体实例模式。

当前 `pull_portal_fallback` 的多组传送门规则：

```text
pairs: A/B, D/E, H/I
duplicate glyph: parse error
missing pair: parse error
continuous teleport / momentum chain: disabled
single input: at most one portal_enter
all portals block movement, portal exits, and fallback push destinations
fallback push into any portal: portal_fallback_failed
```

## Object Instances And Participation

多实例同类对象需要区分三件事：

```text
object type:
  crate

object instance:
  crate#1
  crate#2

player-facing concept:
  at least two distinct crate instances participate in the causal chain
```

知识、能力和 pattern 应尽量保持机制泛化，不应把临时实例名写成知识名。`crate#1` / `crate#2` 这类标签只是 analyzer 为了追踪证据分配的运行时实例名；如果对象对玩家不可区分，课程目标也不应要求玩家识别“1 号箱子”。

因此，“这关用到了两个箱子”不能用事件计数表达：

```text
pull_crate occurs twice
```

这只能证明发生了两次拉箱，可能是同一个箱子被拉两次。它不能证明两个箱子都参与了谜题。

更合适的关卡规格是对象参与度约束：

```yaml
object_participation_requirements:
  - object_type: crate
    role: moved
    min_distinct_instances: 2
    scope: all_shortest_solutions
```

如果要证明更强的主线要求，可以提升 scope：

```yaml
scope:
  accepted_solution_trace        # 只证明设计者给出的解中有两个实例参与
  all_shortest_solutions         # 所有最短解都需要两个实例参与
  all_winning_paths              # 完整图中所有通关路径都需要两个实例参与
```

仅有 `min_distinct_instances` 仍然偏弱。更好的谜题性证据还需要“被消费的角色”：

```yaml
object_role_claims:
  - object_type: crate
    min_distinct_instances: 2
    required_consumed_roles:
      - opens_or_closes_reachability
      - blocks_or_unblocks_interaction
      - creates_later_rule_precondition
```

例如：

```text
bad evidence:
  crate#1 is pulled right twice.

weak evidence:
  crate#1 and crate#2 are both pulled at least once.

strong evidence:
  crate#1 is pulled away from a choke so the player can route around.
  crate#2 is pulled into a remote blocking position.
  Both changed positions are consumed later by the winning route.
```

这意味着“两个箱子关”通常不是一个独立知识点，而是一个 variation axis / pattern ingredient。只有当多实例协作本身产生新的玩家能力时，才应提升为能力或 pattern：

```text
variation axis:
  single crate -> two crates -> three crates

possible ability:
  coordinate multiple equivalent objects to satisfy separate preconditions

possible pattern:
  two same-type objects play different causal roles in one solution chain
```

当前 analyzer / reporter 的通用待办：

- 运行时 trace 应记录动作参与对象。当前 prototype 已对拉箱事件输出 `pull_crate:crate#N` lineage；长期应升级为 structured event `{ type: pull_crate, object: crate#1 }`。
- 状态图可以继续对不可区分对象做 canonicalization，但证据报告需要保留参与对象集合或对象 lineage。当前 prototype 只报告 returned solution 的 trace-level participation，还不能作为完整图证明。
- key snapshots 应输出每个参与实例的位置变化和后续消费位置。
- evaluator 不应把 `pull_crate` 的事件次数当作“多个箱子被使用”的证明。

## 复用式链路加长

这是目前最有价值的生成动作之一。

定义：

```text
在已有优秀最小结构不被破坏的前提下，
让已有元素承担新的因果责任，
从而生成 sibling / advanced variant。
```

正确流程：

```text
1. 将原关作为 immutable base，不直接覆盖。
2. 读取原关最短解和关键事件快照。
3. 找到一个可以被复用的元素或尾部链段。
4. 提出新的因果责任：
   - 某个对象不只执行原本功能，还在新链条中改变连通性、阻塞关系、资源状态或规则分支。
   - 某个可移动对象不只移动，还负责制造、解除或转移后续约束。
   - 某个事件不只发生，还会改变之后另一个机制的前提或含义。
   - 某个边界/例外规则不只作为失败反馈，还成为后续进展的必要条件。
5. 只做小范围空间改写，优先不新增对象。
6. 运行 analyzer：
   - 原核心机制仍必要。
   - 新增机制必要。
   - 没有目标事件 bypass。
   - 完整图可搜索。
   - 胜利状态数量可解释。
7. 写出 chain delta：
   - 这关相对 base 新增了什么必要依赖？
   - 新增依赖是否被后续消费？
   - 它是高级变体，还是可以替代原槽位？
```

通用成功形态：

```text
base chain:
  event A changes state X
  state X is consumed by event B

reuse-strengthened chain:
  event A changes state X
  state X enables or modifies event B
  event B creates state Y
  state Y is later consumed by event C or by the win path
```

当前 prototype 的 case study：

```text
原关：传送换侧 + 拉箱子。

复用式加长：
拉箱子到 A 旁
-> 进入 A 时 B 的出口被堵，触发 fallback
-> fallback 把 A 推开
-> A 的旧位置/新位置改变后续拉箱路径
-> 玩家绕回另一侧继续拉箱到目标
```

这个变体成立的原因不是步数变多，而是 `A` 同时承担了：

- 普通传送入口；
- fallback 可移动物；
- 被移动后改变空间连通性的门。

泛化后的表述是：同一对象在高级变体中承担了多个因果角色，且新增角色被后续步骤消费。

## 复用式缩短的风险

从高级变体中“移动目标 / 缩短链条”可以生成 easier variant，但不能默认生成独立关卡。

必须先做关卡间比较：

```text
如果两个关卡共享同一核心洞察、同一对象角色、同一解题姿势，
则只能二选一进入主线，另一个归为 variant。
```

`mini_campaign_dry_run_02` 的 `S06/S07` 就违反了这一点。以当前 prototype 来说，`S06` 只是 `S07` 的短版本，不是独立 combination。泛化来说：同一机制洞察的短版/长版只能构成 variant family，不能自动占据两个课程槽位。

## 关卡角色判定

### Standalone Role Viability

不要假设每个机制、能力或 pattern 都需要完整的关卡类型链：

```text
discovery -> application -> transfer -> combination -> challenge
```

有些规则项本身只是：

- 例外分支；
- 边界条件；
- 失败限制；
- 修饰器；
- 另一个正向结构的触发条件；
- 高阶题中的局部转折。

这类条目通常不能支撑干净的独立 application。它们可以被展示，可以被嵌入组合题，可以成为挑战题中的约束，但不应为了填课程表而硬造单机制应用关。

在给某个条目分配关卡角色前，先做 viability 判断：

```yaml
role_viability:
  discovery: yes | no | maybe
  standalone_application: yes | no | maybe
  transfer: yes | no | maybe
  combination: yes | no | maybe
  challenge_modifier: yes | no | maybe
  reason: ...
```

`standalone_application` 只有在该条目单独使用时能产生非平凡的状态选择、构造、时机、空间规划或资源管理时才应为 `yes`。

如果判断为 `no`，正确处理是：

```text
recommended_roles:
  - witness / fixture
  - embedded_in_combination
  - challenge_modifier
  - reviewer_probe
```

当前 prototype 的 case study：

```text
blocked-exit fallback as a single event:
  discovery: yes
  standalone_application: maybe/no
  combination: yes
  challenge_modifier: yes

reason:
  单传送门、单次 fallback 往往只会变成“门被推开，路开了”的 witness。
  真正有谜题性时，通常已经引入了拉箱构造远端堵塞、多次移动、普通传送路径、
  或同一对象承担多个因果角色，因此更接近 combination / challenge。
```

流程要求：

- 如果连续两次设计尝试只能得到 witness，应把 `standalone_application` 降为 `no/maybe`，而不是继续强造。
- 如果一个条目的好关都依赖其他机制承担主要思维负载，应把该条目标为 `embedded_in_combination`。
- 如果一个课程表槽位只能通过重命名已有好关的对象角色来填，它应被合并或删除。

### Discovery / Witness

允许：

- 几乎没有选择。
- 强制触发新事件。
- 只要求玩家看见新规则。

不要求：

- 长因果链。
- 复杂规划。

但必须诚实标注为 discovery / witness。

### Application

不等于“事件在解中出现”。

要求：

- 玩家需要利用已知规则达成一个空间目标。
- 目标机制产生的状态会被后续消费。
- 不是进入机关后自动开路。
- 不是“机制刚被 discovery 时自然产生的后续消费”。
- 玩家需要选择、构造、安排或识别使用时机；否则即使状态被消费，也仍可能只是 discovery。

反例：

```text
玩家被迫触发新机制
-> 机制自动改变状态
-> 路开了或目标达成
-> 走到目标
```

这是 discovery，不是 application。

当前 prototype 的具体实例是：玩家被迫进入传送门，fallback 自动发生，传送门让开通路。这只能证明玩家看见了 fallback，不证明玩家主动应用了 fallback。

更严格地说，application 至少应满足下列之一：

- 玩家先构造触发条件，再使用机制。
- 玩家必须在多个可达机制使用位置中选择正确位置。
- 玩家必须安排机制发生的时机，使其结果被后续步骤消费。
- 玩家必须把已知机制迁移到一个非显然空间角色中。

如果关卡只是：

```text
唯一前进动作触发新机制
-> 新机制自然打开路
-> 玩家沿打开的路走到目标
```

它应标为 discovery / witness，即使 analyzer 证明该事件必要。

## Evidence Reading And Refinement

`analyzer` 生成报告后，必须有显式的读证据与精修阶段。不能在 analyzer pass 后直接把关卡放入主线。

精修检查：

- 读取 key event snapshots，确认每个非 walk 事件的状态变化是否真的被后续消费。
- 检查地图中是否存在与链路无关的空地、走廊、死角或视觉噪音。
- 检查最短解是否只是沿强制单路前进。
- 如果完整图可用，检查关键动作前是否存在有意义的决策分支，还是只有可逆游走 / SCC 内移动和一个必然出口。
- 检查候选是否是已有候选的旧关、短版、长版、平移版或重命名版。
- 如果候选复用了已有旧关，必须说明它复用的是旧关里的哪个状态、元素或尾部链段，以及新增了什么被后续消费的因果责任。
- 如果候选只是已有旧关的短版、长版、平移、旋转或重命名版，且没有新的因果责任或新的玩家侧解题含义，应直接废弃，不应进入主线或 related candidate 池。

精修结果必须写入报告：

```text
refinement_notes:
  evidence_read:
    - ...
  removed_or_kept_structure:
    - ...
  remaining_risks:
    - ...
  candidate_relation:
    fresh_chain
    reuse_strengthened_from:<id>
    revised_same_candidate
    related_candidate_to:<id>
    evidence_fixture
    rejected_shortcut
```

## Critic Attack And Designer Response

Critic 是玩家侧审美攻击者，不是最终裁判。它可以指出“这段像 padding”“这个对象像装饰”“这里像独立重复子题”，但这些判断常常只是云玩家基于 layout、trace 和报告做出的攻击性读法。

主线程 / persistent lead designer 必须对重要攻击作出明确回应：

```text
critic_attack:
  具体攻击点，而不是泛泛说“不优雅”

designer_response:
  accept_and_revise | defend_with_attempts | downgrade | reject

supporting_attempts:
  - 尝试删除 / 缩短 / 替换 / 改位后的结果
  - analyzer 证据或 trace 摘要
  - 为什么这些小修不能保留原链路或会制造更差问题
```

这不是要求 analyzer 自动证明某个结构“必要”。在可泛化规则集里，墙、空地或任何替换物本身都可能有机制，因此不存在通用的“替换成墙验证”。正确做法是 designer 结合自己的局部改稿尝试和 analyzer 结果，说明保留该结构是设计判断，而不是偷懒。

典型用法：

- 如果重复操作被批评为 padding，designer 可尝试缩短重复次数、改变终点或让重复结果承担共享后续责任。若缩短会破坏链路，且重复结果被后续多次消费，可以保留。
- 如果某个对象只出现在错误路径中，critic 可能认为它无用。designer 可以说明它承担的是 lock / trap / commitment 角色，并用删除或替换尝试证明该约束不是随便的装饰。
- 如果 reviewer 给出 generic caveat，主线程应要求它绑定到具体结构、玩家模型或 analyzer 事实；否则降低该意见权重。

## Graph-Linked Design Taste Notes

本节记录已经从样例讨论中得到、值得进入长期设计记忆的 taste。它们不是 evaluator 的硬 pass/fail 公式，而是 lead designer 和 critic 在读 analyzer / SCC 报告时应优先检查的设计线索。

使用原则：

- 图指标只提供证据和修复入口，不直接证明“好玩”。
- 如果完整图 / SCC 不可用，这些判断只能作为人工或 LLM 的设计直觉，不能伪装成图结论。
- 如果图证据与直觉冲突，应回到具体 layout、解路径、关键对象角色和玩家模型，而不是机械套阈值。

### 少量要素的角色复用

设计 taste：

```text
好的 challenge 不一定要更多元素。
更强的做法是让少量对象在解题过程中多次改变角色：
  obstacle -> trigger -> resource -> route -> payoff
```

图和 trace 关联：

- 解路径中同一对象或同一局部结构多次参与不同事件 / 关系。
- 早期状态变化在若干步后被消费，而不是立刻兑现。
- 目标机制的反事实禁用会破坏通关。
- SCC 不可逆路径通常不只有 1-2 步；但步数本身不是质量证明。

图不能证明的部分：

- “同一个对象是否真的换了玩家可感知的角色”需要读 key snapshots 和 causal_chain。
- 事件次数不能替代角色复用。连续重复同一操作如果没有新语境，只是 padding。

设计使用：

- 在 `reuse_strengthen` 或挑战关精修中，优先尝试让已有元素获得新的后续责任，而不是添加装饰性干扰物。
- 报告里应写明每个复用对象的角色时间线：何时被移动、何时阻塞 / 解锁 / 路由、何时被最终消费。

### Repeated Operation As Shared Dependency

设计 taste：

```text
如果 reviewer 认为某段重复操作像 padding，
优先修复方向不是添加干扰项，
而是让重复操作产生的状态成为多个后续交互的共享依赖。
```

通用修复 schema：

```text
weak chain:
  repeat operation A several times
  -> state X
  -> consume X once
  -> win

stronger chain:
  repeat operation A several times
  -> state X
  -> X creates precondition for interaction B
  -> B changes access / meaning / resource state
  -> the same X is later consumed again by interaction C
  -> win
```

关键区别：

- 重复本身不提供难度。
- `state X` 被消费一次，通常仍可能像精度检查或执行步骤。
- `state X` 被不同后续系统复用，才更接近 challenge 中的角色复用。
- 这种修复仍然不应靠装饰性干扰项完成。

图和 trace 关联：

- trace 中应能看到同一状态变化或同一对象位置参与多个后续关键事件。
- key snapshots 应显示 `state X` 在不同后续事件中承担不同关系，例如 blocker、route opener、trigger precondition、resource lock。
- 反事实禁用目标机制应破坏通关。
- reviewer 应确认新增对象或系统不是捷径、装饰或独立子题。

图不能证明的部分：

- 完整图可以支持 no-bypass 和目标事件必要性，但“共享依赖是否玩家可感知且优雅”仍需要 design critic 判断。
- 事件计数不能替代共享依赖。同一事件重复发生多次，如果没有新的后续消费语境，仍是 padding。

当前 prototype 的 case study：

```text
较弱版本：
  D 被重复推到 B 的出口位置
  -> A fallback 消费 D 的位置
  -> 到达 G

更强版本：
  D 被重复推到 I 旁并 jam
  -> D 作为 I 的出口阻塞物，使 H fallback 打开 A 上方入口
  -> 同一个 D 位置再作为 B 的出口阻塞物，使 A fallback 打开 G 路线
```

这条经验的可泛化表述是：

```text
把重复动作的结果从 single-use checkpoint 提升为 shared dependency。
```

### Player-Model-Relative Affordance Use

设计 taste：

```text
高 affordance 元素会向玩家承诺一种特殊解题可能。
这个承诺只相对于玩家已经学过、或本关准备教学的能力成立。
```

因此：

- 玩家还不知道的 affordance，不构成审美债。
- 不要求每个对象都使用所有已知 affordance。
- 如果一个显眼的高功能对象只承担普通占位、阻塞、资源、路径或开关等低功能角色，这不一定是问题。
- 但如果多个显眼高功能对象都主要承担低功能通用角色，且这种降格不是本关的核心洞察，则整体优雅度应被扣分。

轻量 critic gate：

```text
Before giving 5/5:
  Would the puzzle be nearly the same if the salient special objects were replaced by simpler generic objects?

If yes, and this simplification is not the intended insight:
  cap overall quality below 5.
```

Designer 使用方式：

```text
设计时先问：
  当前玩家知道这个对象有哪些特殊能力？
  本关是否使用、反转、限制、对比或重新解释了其中至少一些关键能力？
  如果没有，这种“降格使用”是否就是玩家要意识到的洞察？
```

Critic 使用方式：

```text
不做重型逐对象表格。
只在评价 overall quality，尤其准备给满分时，检查是否存在明显 affordance underuse。
```

当前 prototype 的 case study：

```text
如果玩家第一次见传送门：
  只使用普通传送完全合理，不应因为没有 blocker / fallback 而扣分。

如果玩家已经学过普通传送、方向出口、fallback、jam：
  一个 late-slot 关卡引入多组传送门，
  但其中大部分传送门的核心传送 affordance 几乎不参与谜题，
  则即使 fallback-jam 槽位完成度很高，overall quality 也可能不应满分。
```

### When To Stop Local Repair

设计 taste：

```text
连续多轮 local repair 都得到 strong mainline / 4/5，
说明当前结构家族很可能已经达到局部上限。
继续微调墙体、起点、走廊长度通常只会在 4/5 附近横跳。
```

流程含义：

- `4/5` 不是失败；它可以是主线可接受结果。
- 如果目标只是填主线槽位，应该保存当前最好版本，继续下一槽位。
- 如果目标是冲击作品级高光关，应停止同型微调，改做 structural redesign。

区分：

```text
local repair:
  保留同一因果链家族。
  调墙、调起点、缩短重复操作、补一个必要事件。
  适合修复明确 caveat。

structural redesign:
  保留目标洞察，但重新设计因果链。
  让旧 caveat 变成新的核心推理：
    - 选择；
    - 时机；
    - 顺序窗口；
    - 预览 / 兑现；
    - 同一局部结构下的 affordance 切换；
    - 多条可读但非等价的路线比较。
```

Reviewer 信号：

```text
如果 critic 连续说：
  strong_mainline_candidate
  quality_score: 4/5
  caveat: linearity / forced script / shallow affordance use / repeated operation

则不要继续把同一结构多封一格或少封一格。
Lead designer 应决定：
  accept current candidate
  or start a new structural chain attempt
```

当前 prototype 的 case study：

```text
iter4:
  normal teleport became necessary, but felt like forced opener.

iter5b:
  B->A became a midgame route and D pushes shortened,
  but the sealed-room structure became even more linear.

Conclusion:
  iter5b is a better 4/5 mainline candidate.
  Reaching 5/5 likely requires a new chain where teleport creates choice or timing,
  not another small local geometry edit.
```

### Candidate Pool Reclassification

设计注意：

```text
当某个 slot 的局部修补卡在 4/5，
可以回到 casebook / held-candidate notes，
检查是否已有候选也覆盖该 slot。
但这不是最佳实践，也不能替代超量生成和统一筛选。
```

正确的 campaign 生产方式应是：

```text
围绕课程目标超量设计候选
-> 用 analyzer / reviewer / lead designer 评价
-> 在整组层面统一编排、去重、筛选
-> 从多于目标数量的候选中选择主线关
```

例如目标是 20 关时，合理预期可能是先做二三十个候选，再筛成 20 关。不能因为某个 slot 难做，就默认从前面已经接受的主线关里“偷一关”来填表；这会压缩后续编排空间，也容易造成课程节奏和角色分工混乱。

候选池重分类只适用于：

```text
1. 某个已有候选尚未进入主线，只在 held-related-candidate / casebook / reserve notes 中。
2. 它确实强支撑当前 slot，而不是被强行重命名。
3. 重分类后仍保留足够的超量候选供最终筛选。
4. 报告中明确标注 origin，不能把它伪装成新生成成果。
```

流程：

```text
1. 优先继续生成新候选，直到有足够超量池。
2. 搜索已有 held candidate / casebook / calibration 样例：
   - 是否包含该核心动作；
   - 该动作是否被后续消费；
   - 是否比当前弱候选拥有更好的角色复用、affordance use 或图结构。
3. 用当前 slot 的语言重写 causal_chain。
4. 增加缺失 probe，例如 terminal jam / failure boundary。
5. 重新跑 analyzer 和 reviewer。
6. 如果 reviewer 认为 target slot 被强支撑，则可重新分类为该 slot 的 mainline。
```

注意：

- 这不是值得吹嘘的出题捷径。
- 它不能替代“多做候选，再统一编排和筛选”。
- 如果拿已接受主线关重填另一个 slot，必须视为课程规划冲突，而不是自动成功。
- 如果只是实在做不出，可以作为放弃当前 slot 或调整 slot ontology 的信号。
- 必须证明当前 slot 的动作是核心结构，而不是被更大的组合题顺手包含。
- reviewer prompt 应显式要求判断“它是否适合作为当前 slot”，而不只是“它是不是好关”。

当前 prototype 的 case study：

```text
D/I 系列 LS20 候选：
  strong mainline, 4/5
  caveat: linear / sealed / repeated execution

hard-chain 候选：
  最初是 late combination / challenge
  重新检查后发现：
    B 被重复 fallback-pushed 到 terminal goal-side position
    overpush B downward fails with portal_fallback_failed
    final B position is consumed by A->B teleport
  reviewer under LS20 prompt:
    strong_mainline_candidate / challenge / 5/5
```

泛化结论：

```text
候选重分类可以作为候选池管理动作，
但不能被包装成替代设计能力。
主流程仍然应依赖超量生成、证据审查、整组编排和最终筛选。
```

### 局部可交换关键步骤

设计 taste：

```text
局部关键步骤可以允许不同先后顺序。
这能让谜题显得有生命，而不是完全 scripted。
但如果整关只是多个互不干涉的子题并排或串联，就应打回或拆分。
```

图和 SCC 关联：

- `branching_win_dag` 不自动代表坏多解。它可能表示局部 win-reaching 分支。
- 如果多个分支在后续 SCC 重新汇合，可能是局部顺序可交换 / diamond structure。
- 如果多个分支直到胜利前都不汇合，才更像真正替代解、目标结构不唯一或 bypass。

图不能证明的部分：

- 图上的重新汇合不一定代表好设计；它可能只是可恢复绕路。
- 是否是“关键步骤可交换”还是“无意义 detour”，需要看每条分支是否完成不同必要状态变化，并且这些状态变化是否都被后续链条消费。

设计使用：

- Critic 不应看到 `branching_win_dag` 就判为多解失败。
- Lead designer 应展开分支，标注它们是：
  - local order window / 局部顺序窗口；
  - recoverable detour / 可恢复绕路；
  - alternative solution branch / 替代通关链；
  - independent subproblem branch / 独立子题。
- 局部顺序窗口可以保留；独立子题串联不应作为主线 challenge 深度。

### Opening Comfort / 开局缓冲

设计 taste：

```text
玩家开局不应第一步就被迫或被自然诱导进入关键不可逆承诺。
好的 application / challenge 通常应允许玩家在核心区域外一两步观察、站位和读图。
```

图和 SCC 关联：

- 查看 initial SCC，而不是只看初始状态。
- `initial_scc_size` 表示开局可逆观察空间大小。
- `initial_scc_exit_count` 表示开局区域有哪些不可逆承诺点。
- `initial_exit_source_distances` 表示从真实初始状态到每个不可逆出口源状态的最短距离。
- `initial_win_exit_source_distances` 表示从真实初始状态到每个仍可通关的不可逆出口源状态的最短距离。
- `dead_exits_before_first_win_exit` 表示玩家在到达第一个可胜利不可逆出口前，会先接触到多少个死路不可逆出口。

重要区别：

```text
存在距离 0 的不可逆出口
  不一定坏。

真实起点没有任何可逆观察空间，或最自然第一步就是关键不可逆动作
  往往会让开局显得贴脸、粗糙或误触惩罚过强。
```

进一步区别：

```text
nearest_irreversible_exit_distance
  衡量玩家多久会遇到第一个不可逆承诺。

nearest_win_reaching_exit_distance
  衡量玩家多久会遇到第一个正确方向的不可逆承诺。

两者差距很大，或正确出口前有多个 dead exits
  可能代表“先看锁、试错、再找钥匙”的戏剧化开局；
  也可能代表早期惩罚过重。
```

设计使用：

- Discovery / witness 可以故意贴脸触发机制。
- Application / challenge 更常需要 `nearest irreversible exit >= 1` 或至少有非平凡 initial SCC。
- 这类问题特别适合 LLM 精修：
  - 微调玩家起点；
  - 给起点附近开一格可逆观察空间；
  - 移动起点使玩家先看到核心结构再做承诺；
  - 保持核心因果链和关键对象位置不变，避免把精修变成重做关卡。
- 精修后必须重跑 solver / SCC，确认可解性、目标事件必要性和核心链条没有被破坏。

更好的实践不是只在原起点附近试一两个位置，而是枚举 initial SCC 中所有可作为玩家起点的状态：

```text
原始关卡
-> 完整图
-> initial SCC
-> 对 initial SCC 中的每个玩家位置生成起点候选
-> 重新运行 solver / analyzer
-> 比较 opening comfort、核心链条、目标事件和读题顺序
```

候选起点报告至少应包含：

```text
candidate_start_position
shortest_solution_delta
initial_scc_size
initial_exit_source_distances
initial_win_exit_source_distances
dead_exits_before_first_win_exit
first_step_legal_events
whether_core_chain_preserved
```

这类枚举仍然不是自动选美。它给 lead designer / LLM 提供一组可验证候选：有的起点更温和，有的起点先展示目标 / 锁结构但会暴露早期 dead exits。最终选择应结合关卡阶段、玩家模型和设计意图。

### Combination

要求跨机制依赖：

```text
机制 A 产生机制 B 的前提，
或机制 A 改变机制 B 的意义，
或机制 B 的结果被机制 C 消费。
```

不能只是两个 witness 串联。

### Challenge

要求长因果链或深规划点，而不是：

- 起点附近的强制动作；
- 连续同类操作；
- 同一结构的加长版；
- 相互独立的重复因果链串联；
- 多走几步。

强因果链不等于强玩家体验。如果完整状态图显示玩家在关键动作前几乎没有有效选择，只是在同一个可逆区域里游走后走向唯一出口，那么这关更像 scripted mechanism demonstration。它可以是结构样例或后段小品，但不能仅凭链条漂亮就评为强 challenge。

需要区分：

```text
mechanical depth:
  解中存在长因果链、状态复用、机制耦合。

player-facing agency:
  玩家需要在若干非等价选择、顺序、构造位置或资源用法之间做判断。
```

前者可以由 analyzer trace 支持；后者需要完整图或足够强的局部图证据。没有这类证据时，critic 应标记为 caveat，而不是默认给高分。

重复因果链本身不是失败。对于某些机制，同样的可见结构配上不同规则状态、方向、对象身份、重力、控制映射或嵌套层级，可能产生“同形异解”的高质量关卡。此时重复反而能强化对比，让玩家意识到真正变化的是规则解释、资源耦合或上下文。

应打回的是重复链条彼此独立：

```text
subproblem A: setup -> operation -> state change -> consume
subproblem B: setup -> operation -> state change -> consume
subproblem C: setup -> operation -> state change -> consume

A/B/C do not share resources
A/B/C do not change each other's meaning
A/B/C do not create timing, ordering, or routing pressure for each other
```

这种关卡本质上是多个同考点小关被粘成一关。即使 analyzer 证明每段都必要，也只能说明机械证据成立，不能说明玩家侧设计成立。

重复链条可以接受，前提是它们之间存在耦合。耦合可以包括：

- 前一段产生后一段的前提；
- 前一段改变后一段的解法含义；
- 同一个元素在多段链里承担不同角色；
- 多段链争用同一空间、对象、通路或时机；
- 后一段要求玩家重新评估前一段；
- 顺序本身是谜题，而不是线性执行；
- 表面结构相似，但规则解释、操作方向、消耗方式或副作用不同。

## Campaign-Level Gate

在将候选放入 mini campaign 主线前，必须通过关卡间检查。

每个候选必须写出：

```text
role_claim:
  intended_role: ...
  causal_chain:
    concrete_objects_and_events: ...
    consumed_state_changes: ...
  chain_delta_from_previous:
    compared_to: ...
    difference: ...
  why_mainline_not_hold: ...
```

如果 `why_mainline_not_hold` 说不清，则不得进入主线；应改为 `hold_related_candidate` 或 `reject`。

最低检查项：

- 与前一关是否共享同一核心洞察？
- 与已有 accepted 候选是否只是目标位置、链长或走路距离不同？
- 如果存在重复因果链，这些链条是否互相耦合？
- 是否只是把多个同考点子题线性粘成一关？
- 新关是否引入新的必要因果依赖？
- 新机制是否由玩家主动应用，而非被迫观察？
- 玩家是否在关键动作前有非等价选择，还是开局就被唯一有意义动作锁死？
- 角色是否由 chain delta 支撑，而不是由 analyzer metrics 支撑？

这些检查必须基于当前原型自己的对象和事件命名。不要把本文档中的 pull、portal、fallback 示例硬编码进通用 gate。

## 失败反模式

后续 agent 必须显式避免：

- `slot 缺口 -> 找 analyzer pass 布局 -> 填表`
- 把事件计数当难度。
- 把某个机制的强制 witness / 直线演示当 application。例如当前 prototype 中的 fallback 直线推门。
- 把高阶变体缩短后和原变体一起放进主线。
- 把 discovery / witness 伪装成 application。
- 把多个互不干涉的同考点子题粘成一关后当作组合关或挑战关。
- 把漂亮但几乎全程强制的机制脚本评为高质量 challenge。
- 后置添加干扰项以制造复杂度。
- 为了批量生成而跳过单关角色审查。

## 正确的批量策略

批量生成可以做，但应是慢循环，不是一次性填表：

```text
固定槽位
-> 找当前最弱槽位
-> 为该槽位写 causal chain
-> 设计一个候选
-> analyzer 验证硬条件
-> 写 chain delta 和 role proof
-> campaign-level 去重
-> accept_mainline / accept_with_caveats / hold_related_candidate / witness_fixture / reject
-> 进入下一个槽位
```

一旦发现某个槽位只有 witness，不应强行称为 application；应保留缺口，继续设计。

## Slot Ontology Backlog

`level_specs_v2` 仍然包含早期课程拆分带来的槽位重叠。后续批量生成或 skill 化前，必须重新审查这些槽位，而不是机械填满。

当前已发现的重叠：

- `LS15_construct_then_exploit` 与 `LS16_portal_as_key` 在当前 prototype 中高度重叠。
- `stress_v3_distinct_medium_combination` 已经同时体现：
  - 用 C 构造远端触发条件；
  - 利用 fallback 移动 A；
  - A 作为通往 G 的门 / key 被移开。
- 因此，`P_portal_as_movable_door_or_key` 不应在当前定义下继续作为独立 mainline slot 直接填表。它更像 `LS15` 这类组合链中的结构角色，除非重新定义出一个与 `construct_then_exploit` 明确不同的 chain delta。

修正原则：

```text
如果一个 slot 只是在给已接受关卡中的对象角色重新命名，
而没有新的玩家能力、新的结构问题或新的因果依赖，
它应并入已有 slot / variant family，
不得作为独立主线关卡目标。
```

边界/限制条件也不得自动成为独立主线关卡目标：

```text
constraint / failure boundary:
  - 可以作为 probe trace。
  - 可以作为更大正向谜题中的公平性约束或风险。
  - 可以作为 reviewer 判断规则边界是否一致、反馈是否对应真实机制的材料。
  - 不应单独做成 event-win 关卡。
  - 不应伪装成正向 ability。
```

例如，`portal_fallback_failed` 这类失败事件可以帮助解释规则边界，但“知道 fallback 可能失败”本身不是一个适合单独占主线槽位的正向解题能力。

## Analyzer Backlog

以下是从 multi-agent review 中暴露出的通用 analyzer / reporter 待办。它们不属于当前 `pull_portal_fallback` 规则本身，而是未来 generalized workflow 的证据质量提升。

- Key snapshots 应输出关键对象坐标。尤其是 designer claim 中命名的对象、阻塞格、出口格、目标格和被消费的状态变化。例如“C 堵住 B 的出口”应能直接由坐标关系验证。
- 在完整状态图可用时，reporter 应尝试提取 winning paths 上的事件偏序或必要顺序。例如 `construct_state -> trigger_event -> consume_state -> win_route` 是否在所有胜利路径中成立，而不仅是最短解中成立。
