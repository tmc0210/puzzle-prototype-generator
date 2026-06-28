# Runtime Adapter Boundary

Status: current engineering boundary.

本项目现在刻意区分三层能力：

```text
generic runtime/search core:
  finite-state runtime interface, BFS/product-search helpers, graph and agency analyzers.

prototype runtime adapter:
  a concrete game's layout parser, state shape, step semantics, renderer, replay helper,
  win predicates, and runtime construction.

prototype package / knowledge workflow:
  knowledge.yml, player_model.yml, curriculum*.yml, level specs, accepted campaign gates,
  reports, playable/export packaging.
```

## Generic Core

通用层不应该知道 crate、portal、A/B/D/E、pull、fallback 等词。

当前通用入口是：

```text
src/puzzleRuntime.ts
src/runtimeAdapter.ts
src/solver.ts solveWithRuntime / findUncoveredGoalPathWithRuntime
src/graphAnalyzer.ts analyzeGraphWithRuntime
src/agencyAnalyzer.ts analyzeAgencyWithRuntime
```

旧的便捷 wrapper：

```text
solve(...)
findUncoveredGoalPath(...)
analyzeGraph(...)
analyzeAgency(...)
```

仍然保留，但它们是 `pull_portal_fallback` 兼容入口。新机制开发不应把这些 wrapper 当成泛化基础。

## Adapter-Owned Surface

每个新机制至少需要一个 runtime adapter，负责：

```text
id
createRuntime(mechanic)
parseLevel(level)
renderState(state)
step(mechanic, state, action, options)
replay(mechanic, initialState, actions, options)
isWin(state, winCondition)
isEventWin(events, winCondition)
```

当前 adapter：

```text
src/pullPortalRuntime.ts
src/pullPortalMechanics.ts
```

`src/pullPortalMechanics.ts` 是当前示例机制实现，不是通用 runtime。

## Registered Adapter Boundary

所有 package-level solver / evaluator / analyzer / playable 调用应先通过：

```ts
getRuntimeAdapter(pkg.mechanic)
```

如果一个新机制没有注册 adapter，runtime 相关命令应直接失败，而不是落回
`pull_portal_fallback` 行为。

## Mechanism-Specific Tools

以下工具目前仍是 `pull_portal_fallback` 专用，并且应显式拒绝其它机制：

```text
src/seedMiner.ts
src/generatorV2.ts seed factories
src/exporters/exportPuzzleScriptNext.ts
src/exporters/checkPuzzleScriptNext.ts
```

未来新机制确认后，应该按阶段实现自己的 miner / seed factories / exporter / checker。
早期可以只实现 runtime adapter 并用 scratch layout + solver/analyzer 先做 designer 测试，
但尚未实现的工具必须标记为 unavailable，不能复用 `pull_portal_fallback` 的机制专用工具。

新机制 bring-up 的具体顺序见 [New Mechanic Implementation Playbook](25-new-mechanic-implementation-playbook.md)。

## Temporary Knowledge Skip

这次测试跳过 knowledge / curriculum 推导是临时行为，因为上游知识链路还没有打通。
它不改变长期目标：

```text
runtime adapter can be tested before knowledge is complete;
accepted campaign / curriculum coverage still requires knowledge and player-model artifacts.
```

因此新增的 adapter boundary 不是为了绕开知识系统，而是为了让新机制开发可以先验证：

```text
rules are executable
state key is complete
solver can find / reject paths
graph evidence is scoped
designer can iterate on scratch layouts
```

知识链路恢复后，应继续接回 player_model / curriculum / level_specs，而不是把 scratch
designer 测试产物直接升级为 accepted campaign evidence.
