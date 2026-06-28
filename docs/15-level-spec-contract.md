# Level Spec Contract

本文档定义 `curriculum_v2` 到具体关卡候选之间的中间层。它面向可泛化能力，不描述某个原型的历史关卡，也不替代 evaluator。

核心观点：

```text
level spec 不是地图。
level spec 是生成地图前的契约。
```

## 为什么需要这一层

`curriculum_v2` 处理学习目标顺序，但它不能直接告诉生成器“这一关应该长什么样”。同一个学习目标可能需要 discovery、boundary、application、challenge 等不同职责；多个小目标也可能被同一关合理打包。

因此需要一层明确说明：

- 这一关规格服务哪个 primary curriculum goal。
- 是否顺带服务 secondary goals。
- 哪些非正式规则或边界会被嵌入暴露。
- 玩家进入这关前应已知道什么。
- 这一关引入、练习、考察哪些 player model targets。
- 生成器允许使用哪些对象、规则、分支和事件。
- solver 与 LLM-player 应提供什么证据。
- 哪些捷径必须被禁止。

## 分层关系

```text
player_model.yml
-> curriculum_v2.yml
-> level_specs_v2.yml
-> level candidates
-> solver / graph analyzer / LLM-player
-> evaluator report
```

`level_specs_v2.yml` 只引用新版 player model 和 curriculum v2，不引用旧式知识条目。

primary/secondary goal 必须来自 `curriculum_v2.target_policy.formal_targets`。`known_before`、`introduces` 和 `practices` 可以引用 assumed rules 或 embedded boundaries，用来说明一条规则如何被顺手暴露或作为前置使用。`assesses` 只能引用 formal target；如果一个边界值得被正式考核，它应先进入 formal target，而不是停留在 embedded boundary。

## Spec 的职责

一个 level spec 应回答：

```text
这关为什么存在？
它对应哪个课程目标？
它是引入、练习、考察还是组合？
它允许哪些机制参与？
它至少需要观察到什么证据？
它不允许哪些旁路？
```

它不应该回答：

```text
这关一定有趣吗？
这关最终地图是什么？
这关是否已经被证明合格？
这关的唯一解是什么？
```

这些问题属于后续生成、求解、图分析、LLM-player 测试和人工审阅。

## Learning Contract

推荐把学习状态拆成三类：

```text
known_before: 玩家进关前应已掌握。
introduces: 这关首次引入。
practices: 这关要求使用或巩固。
assesses: 这关试图评估玩家是否掌握。
```

约束：

- `known_before` 必须来自课程前面已引入的目标，或来自 `assumed_known`。
- `introduces` 不应重复引入前面已经引入过的目标。
- `practices` 和 `assesses` 必须已知，或在本关中同时引入。
- `assesses` 只能指向 `target_policy.formal_targets`。
- primary/secondary curriculum goal 的 target 必须出现在 `focus_targets`，并且至少出现在 `introduces/practices/assesses` 之一。
- assumed rule 不需要独立 spec。
- embedded boundary 可以和某个 formal target 同关引入或练习，但不应伪装成 primary goal 或 assessment target。

## Generation Contract

`generation_contract` 面向关卡生成器，描述允许的设计空间。

推荐字段：

```yaml
generation_contract:
  objective: guided_application
  win_condition: prototype_default
  board_size:
    min_width: 5
    max_width: 8
    min_height: 4
    max_height: 7
  required_objects: [player, goal, crate]
  allowed_objects: [wall, player, goal, crate]
  required_rules: [pull_single_crate]
  structural_requirements:
    - crate begins in a location that can be repositioned by pulling.
  forbidden_shortcuts:
    - goal must not be reachable without moving the crate.
```

这些字段不证明关卡合格。它们只约束候选生成器和后续 evaluator 应检查的方向。

## Evidence Contract

`evidence_contract` 描述后续验证者要提供什么证据。

```yaml
evidence_contract:
  solver:
    - solvable
    - player_win_standard
    - returned_solution_covers_target_events
  llm_player:
    - applies_known_target_without_relearning
    - forms_subgoal_chain
  graph_scope: bounded_full_graph_preferred
  event_requirements:
    all_winning_paths:
      required: [pull_crate]
    probe_trace:
      forbidden: [portal_teleport]
  object_participation_requirements:
    - object_type: crate
      role: moved
      min_distinct_instances: 2
      scope: winning_solution
      event_type: pull_crate
```

含义：

- `solver`: 代码可检查的运行时、trace 或图证据。
- `llm_player`: LLM-player 需要产出的解题过程证据。
- `graph_scope`: 这一关期望的图分析强度。
- `event_requirements`: 带作用域的事件要求，说明事件必须或不能出现在哪类 trace / path 中。
- `object_participation_requirements`: 带作用域的对象实例参与要求，说明某类对象至少有多少个不同实例承担某种角色。

`graph_scope` 不强行承诺一定能全图搜索。它只是给生成器和 evaluator 一个预算方向。

事件要求必须带作用域，避免把“正式解必须使用”与“探测时可以观察到”混在一起：

- `winning_solution`: evaluator 返回的 canonical winning solution 必须满足。
- `all_shortest_solutions`: 所有最短通关路径必须满足。
- `all_winning_paths`: 完整可达图中的所有通关路径必须满足，只有全图或等价证明成立时可用。
- `probe_trace`: 预期探测 trace 必须满足，适合边界、失败、旧模型失效等观察。
- `reachable_witness`: 至少存在一条可达 trace 能见证该事件，强度低于 solution-path 证据。

边界事件和失败事件通常应该使用 `probe_trace` 或 `reachable_witness`，不应自动要求出现在获胜解里。

对象参与要求使用同样的作用域原则，但第一版工具只支持 `winning_solution` 与 `probe_trace` 的 trace 级检查：

```text
winning_solution:
  evaluator 返回的 canonical winning solution 中满足对象参与要求。

probe_trace:
  replayed probe trace 中满足对象参与要求。

all_shortest_solutions / all_winning_paths:
  需要 product graph 或等价完整分析；未实现时必须返回 unknown。
```

不要用事件次数替代对象参与：

```text
pull_crate 出现两次
  不能证明两个箱子参与。

pull_crate:crate#1 与 pull_crate:crate#2
  才能作为 trace 级双箱移动证据。
```

## Acceptance Contract

`acceptance` 描述一个候选关卡进入正式关卡组前的硬门槛。

推荐默认值：

```yaml
acceptance:
  requires_player_win_standard: true
  requires_target_on_solution_path: true
  requires_no_event_win: true
```

这三条来自当前项目的重要教训：

- 玩家通关标准必须和预设一致。
- 教学目标不能只在旁支或装饰性事件里出现。
- event-win fixture 不能混作正式玩家关。

## 代码职责

工具应能机械检查：

- spec id 唯一。
- referenced curriculum goals 存在。
- referenced player model targets 存在且不是 candidate。
- target kind 与 player model 分区一致。
- role 属于 primary goal 的 role sequence。
- `known_before/introduces/practices/assesses` 的学习状态顺序自洽。
- `assesses` 只能引用 formal targets。
- objects/rules/branches/events 引用 mechanic 中存在的 id。
- required ids 必须包含在 allowed ids 中。
- board size 下界不超过上界。
- 被 open question 阻塞的 spec 不能进入 ready/generated/accepted 状态。

工具不应机械判断：

- 结构要求是否一定有趣。
- LLM-player 是否真的像人。
- forbidden shortcut 是否已经被完全消除。
- 关卡是否唯一解或等价唯一解。

这些属于后续验证层。

## Skill 抽象注意事项

未来写入 skill 时，只保留以下最小规则：

- 先写 curriculum，再写 level specs。
- level spec 不生成地图，只约束地图生成。
- 用 primary/secondary goals 控制目标打包。
- 用 `known_before/introduces/practices/assesses` 明确学习状态。
- 用 generation contract 控制候选空间。
- 用 evidence contract 连接 solver、graph analyzer 和 LLM-player。
- 用 acceptance contract 防止 fixture 关伪装成正式关。
