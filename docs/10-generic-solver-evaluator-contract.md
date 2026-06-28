# Generic Solver/Evaluator Contract

本项目的求解器和评估器不应绑定某一个 Sokoban-like 原型。具体机制只通过 runtime adapter 暴露为有限状态转移系统。

## Runtime Interface

通用层只依赖以下接口：

```ts
interface PuzzleRuntime<State, Action, RuntimeOptions> {
  key(state: State): string;
  actions(state: State, options: RuntimeOptions): Action[];
  step(state: State, action: Action, options: RuntimeOptions): Transition<State, Action>;
  isWin(state: State, win: WinCondition): boolean;
  defaultWin: WinCondition;
}

type Transition<State, Action> = {
  action: Action;
  legal: boolean;
  state: State;
  events: string[];
  cost: number;
  reason?: string;
};
```

要求：

- `key` 必须完整区分所有影响未来转移和胜利判定的状态。
- `actions` 必须列出当前状态下应考虑的原子玩家输入或 runtime 声明的 action。
- `step` 必须是确定性或显式返回多分支结果；如果将来支持非确定性，接口要升级为 `Transition[]`。
- `events` 是 transition 标签，不等于知识证明。
- `isWin` 只执行已经由规格声明的通关条件。

当前 `pull_portal_fallback` runtime 应被视为一个 adapter，而不是 evaluator 的泛化基础。

## Multi-Instance Runtime Metadata

通用 solver 不应该硬编码“箱子数组”“传送门 A/B”或“红蓝角色”。runtime adapter 应从机制 IR 暴露多实例元数据，供 state key、canonicalization 和 analyzer 解释事件。

```ts
type ObjectTypeMetadata = {
  type: string;
  multiplicity: "one" | "optional" | "many" | "fixed_count";
  identityPolicy: "indistinguishable" | "distinguishable" | "relational";
};

type RelationMetadata = {
  id: string;
  relationType: string;
  members: string[];
};
```

约束：

- `indistinguishable` 对象可以排序，但只能在证明所有相关规则对实例重命名不敏感时启用。
- `distinguishable` 对象必须保留实例身份。
- `relational` 对象必须保留实例和关系，例如传送门配对、开关绑定、active actor。
- 如果关系会影响未来规则或胜利条件，关系本身必须进入 state key。

多实例事件长期应迁移到结构化事件：

```ts
type RuntimeEvent = {
  type: string;
  actor?: string;
  object?: string;
  relation?: string;
  rule?: string;
  branch?: string;
};
```

字符串事件可以作为早期实现，但不能支撑严格的多实例参与度证明，除非它们编码了足够的实例或关系信息。

## Analyzer Result

完整图分析器的结果必须显式声明是否完整：

```ts
type GraphAnalysis = {
  status: "complete" | "exhausted";
  reachableStateCount: number;
  transitionCount: number;
  winStateCount: number;
  budget: {
    maxStates: number;
    maxTransitions?: number;
    maxDepth?: number;
  };
};
```

如果 `status = "exhausted"`，依赖完整图的指标必须返回 `unknown`，不能降级成 pass。

## Evidence Levels

指标必须声明证据等级：

```text
static       只依赖关卡文本、机制规格、schema。
trace        只依赖一条给定 trace 的 replay。
optimal      依赖 BFS/Dijkstra/A* 的最优性证明。
full_graph   依赖完整可达状态图或等价完整 product graph。
heuristic    只可用于候选排序，不可用于 accepted gate。
unknown      预算不足或前提缺失。
```

## 可进入验收的指标形状

每个验收指标必须有如下字段：

```ts
type MetricResult = {
  id: string;
  evidence: "static" | "trace" | "optimal" | "full_graph" | "heuristic" | "unknown";
  status: "pass" | "fail" | "unknown";
  reason?: string;
};
```

只有 `status = pass` 且 `evidence` 属于该指标声明允许的等级时，才能进入 accepted gate。

关卡级 evaluator 状态由关卡自己声明的 `expected_solver_evidence` 决定：

```ts
type SolverContractEvaluation = {
  expected: SolverEvidenceId[];
  metrics: SolverContractMetric[];
  status: "pass" | "fail" | "warning";
};
```

其中：

```text
任一 metric fail => fail
无 fail 但存在 unknown => warning
全部 pass => pass
```

未声明的 metric 只能作为诊断材料，不能默认压低或抬高关卡状态。

## V2 Evaluator Scope

`evaluate-v2` 只消费新版链路：

```text
mechanic.yml
player_model.yml
curriculum_v2.yml
level_specs_v2.yml
optional generated candidate levels
```

它不读取旧式 `knowledge.yml` 或旧式课程目标。

当前 v2 evaluator 的职责被刻意缩小为硬门槛骨架：

- 静态检查 spec 已通过 schema 与引用验证。
- 静态检查 primary curriculum target 是否绑定到 focus targets 与 learning-state 字段。
- 静态检查 event requirements 是否带明确作用域。
- 静态检查 spec 是否声明使用 prototype default player-facing win condition。
- 对尚未生成候选地图、尚未运行 solver、尚未完成图搜索的指标返回 `unknown`。

它现在不做以下事情：

- 不给“趣味性”“教学性”“挑战性”打分。
- 不把 LLM 文本判断当作硬指标。
- 不把缺失候选地图的 spec 伪装成已通过。
- 不把 `probe_trace` 事件偷换成 solution-path 必要事件。

生成器输出正式候选关卡时，候选关卡需要能回指对应的 level spec id；在此之前，`candidate_bound_to_spec` 必须是 `unknown`。

`expected_trace` 只能产生 `trace` 证据。它可以说明“某条人工给定路径观察到了某事件”，但不能证明“所有解都需要该事件”，也不能让课程覆盖达标。课程覆盖必须使用 certified level：

```text
level.status = accepted
and evaluator.status = pass
and level win condition matches the confirmed player-facing win standard
```

目标知识的当前验收形状是：

```text
target_acceptance(K, L) passes only if
  K declares an executable event constraint
  and complete product-graph search proves every winning path satisfies it
```

如果完整 product graph 超出预算，`target_acceptance = unknown`。

多实例参与度验收形状：

```text
object_participation_acceptance(L, type=T, min=N, role=R) passes only if
  runtime events expose object instance or lineage information
  and complete product-graph search proves every relevant winning path
  has at least N distinct T instances participating in role R
```

如果只能观察到 `pull_crate` 出现次数，结果是 `unknown`，不是 pass。

## 良定义指标示例

### Solvable

```text
solvable(L) :=
  exists path p from initial state s0 to some state w where isWin(w)
```

证据：

```text
trace: 给定 trace 到达胜利。
optimal/full_graph: 搜索找到胜利。
unknown: 搜索预算耗尽且未找到胜利。
```

### Shortest Cost

```text
shortest_cost(L) :=
  min cost(p) over all winning paths p
```

前提：

```text
所有边权非负。
BFS 仅适用于单位边权。
Dijkstra/A* 必须保证最优性。
```

### Event Necessary On All Winning Paths

```text
event_required(L, e) :=
  no winning path exists whose event trace does not contain e
```

证据：

```text
full_graph 或完整 product graph。
预算不足 => unknown。
```

### Counterfactual Unsolvable

```text
counterfactual_unsolvable(L, M') :=
  solvable(L, M) = true
  and solvable(L, M') = false
```

注意：

```text
M' 必须是形式化 runtime variant。
如果 M' 搜索预算耗尽，结果是 unknown，不是 pass。
```

## 不得进入验收的裸概念

以下概念不能直接作为 metric：

```text
有趣
教学清晰
应用关
挑战关
机制被玩家理解
不是走路关
trace_predicate
```

它们必须先改写成可执行谓词，或者保持为人工设计备注 / heuristic。

## 插件优化

领域优化只能作为 runtime capability 插件启用。每个插件必须声明前提：

```text
name: player_reachability_macro
requires:
  - player_walk_has_no_side_effect
  - player_orientation_irrelevant
  - action_cost_unit_or_summarizable
```

如果前提未由 runtime/IR 证明，插件不能启用。通用 analyzer 默认不使用会改变状态图结构的剪枝。
