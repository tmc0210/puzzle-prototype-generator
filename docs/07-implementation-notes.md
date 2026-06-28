# 实现记录

本文档记录真实开发过程中反向暴露出的需求和限制。

## 2026-06-26: 第一条可运行验证链

当前已经实现：

- npm/TypeScript 项目骨架。
- YAML prototype package 加载。
- JSON Schema 校验。
- `pull_portal_fallback` 专用 runtime primitive。
- 基于玩家输入边的 BFS solver。
- 关卡级 `win` 覆盖。
- 最小 evaluator。
- 最短解长度内的 uncovered goal path 检查。
- `reports/evaluation.json` 写入。
- Runtime-backed Web playable 导出。
- 保守 PuzzleScript Next fixture export。
- 完整可达图范围的 uncovered-goal 检查。
- `PuzzleRuntime` adapter 契约：solver 核心不再直接依赖 `pull_portal_fallback` runtime。
- `graphAnalyzer v0`：记录完整图枚举的 `complete/exhausted`、可达状态数、合法转移数和胜利状态数。
- evaluator evidence model：区分 `static`、`trace`、`optimal`、`full_graph`、`heuristic`、`unknown`，并把 target acceptance 限定为完整 product graph 证明。
- solver search status：`found`、`complete`、`exhausted`，避免把预算耗尽误判为不可解证明。

当前命令：

```text
npm run inspect
npm run solve
npm run evaluate
npm run evaluate:write
npm run coverage
npm run audit
npm run audit:write
npm run playable:build
npm run playable:serve
npm run ps:export
npm run ps:check
npm run validate
```

## 关卡级胜利条件

原始机制只有：

```yaml
win:
  type: all_objects_on_targets
```

但 witness 关经常只需要证明某个事件可以被观察到，例如：

```yaml
win:
  type: event_occurs
  event: portal_fallback_push
```

或者只需要玩家到达目标：

```yaml
win:
  type: player_on_goal
```

因此 `levels.yml` 增加了可选 `win` 覆盖。

## PuzzleScript Next 导出 caveat

`event_occurs` 对 solver 和 witness 关很方便，但不能天真导出为单个全局 PuzzleScript `win` 规则。

原因：

```text
PuzzleScript 规则通常是全局规则。
如果 normal teleport 规则直接带 win，那么后续需要先传送再解题的关会过早胜利。
如果 fallback 规则直接带 win，那么所有 fallback 关都会在第一次 fallback 时结束。
```

后续 exporter 需要选择一种策略：

- 将 witness 关单独导出为独立 PS 文件。
- 为不同关卡注入不同的 level marker 或 win adapter。
- 避免 `event_occurs` 作为 PS 导出版正式胜利条件，只用于 solver/evaluator。
- 改写 witness 关，让事件最终导致通用目标条件成立。

第一阶段先允许 `event_occurs` 存在于 IR 层，不急着把它等价映射到 PuzzleScript Next。

当前已经补了一个保守 `game.ps` exporter。它采用 fixture adapter 策略：

```text
crate-on-goal / player-on-goal / portal event
-> 全部转成 Done marker
-> WINCONDITIONS: Some Done
```

这能让当前 7 个小关卡在同一个 PS 文件中拥有统一终点，但仍有边界：

- `Done` 是当前 fixture 的 win adapter，不是通用 win 编译方案。
- 传送门用方向 marker 和 late rules 近似表达。
- PS 文件不作为 solver/evaluator 权威来源。
- 未来如果某关需要先触发传送事件再继续解题，`Done` 会导致过早胜利，需要拆成独立 PS 文件、加入 level marker，或改用 runtime-backed playable。

相关命令：

```text
npm run ps:export
npm run ps:check
```

## Runtime-backed playable

在 PS Next exporter 完成前，当前 playable 层采用 runtime-backed Web app：

```text
mechanic.yml / levels.yml
-> runtime + evaluator
-> playable/data.json
-> browser app imports the same runtime primitives
```

这样做的原因：

- 可玩原型和 solver 使用同一套状态转移。
- witness 关可以保留 `event_occurs` 胜利条件。
- evaluator 生成的最短解可以直接作为 playable 的 Replay 数据源。
- 不需要为每个关卡手写 `expected_trace`。

当前导出命令：

```text
npm run playable:build
```

本地服务：

```text
npm run playable:serve
```

访问：

```text
http://127.0.0.1:4173
```

浏览器验证已覆盖：

- 页面正常渲染关卡列表、棋盘和检查面板。
- L01 可以通过两次 Right 完成。
- L06 可以通过 Replay 完成，并点亮 `pull_crate`、`portal_exit_blocked`、`portal_fallback_push`。
- 桌面和移动宽度下棋盘有有效尺寸，移动端切换为单列布局。

## Web playable 缓存修正

一次浏览器检查暴露出：磁盘上的 `playable/app.js` 已经修正，但用户端仍可能看到旧 bundle，表现为 L01 只显示第一行墙体，其余行变成空地。

根因是 `index.html` 固定引用：

```html
<script type="module" src="./app.js"></script>
```

浏览器可能继续使用旧脚本，导致源码和用户实际看到的页面不一致。

当前 exporter 已改为每次构建生成 `assetVersion`：

```text
style.css?v=<build>
app.js?v=<build>
data.json?v=<build>
```

这使 `npm run playable:build` 后的 HTML 会强制加载新脚本、新样式和新关卡数据。后续网页端验证应检查实际 DOM 中的 `script src` 与棋盘行，而不是只看磁盘文件。

## Prototype audit gate

`src/audit.ts` 已接入 CLI：

```text
npm run audit
npm run audit:write
```

当前 audit 的 blocking gate 覆盖：

- `curriculum.yml` 的 `target_level_count`。
- 全部关卡为 `accepted`。
- 全部关卡通过 evaluator。
- 每条知识至少有一个 certified target level：`accepted + evaluator pass + 玩家通关标准一致`。
- `curriculum.yml` 中每个 track goal 的 role/count 覆盖。
- `detector` 只允许形式化事件条件；非形式化 trace 语义必须放在 `informal_semantics`，不得参与验收。
- 质量评分器必须实现；否则 evaluator 的 pass 不能被解释为关卡质量通过。
- `reports/evaluation.json`、`playable/index.html`、`playable/data.json`、`game.ps` 存在。
- Web playable 使用 versioned `style.css?v=...`、`app.js?v=...` 和 `data.json?v=...`。

审计报告还会列出课程目标的 track/count 覆盖情况。这里 `curriculum.yml` 是规范性规划，不是事后报表：如果关卡组没有满足它，audit 应该失败，后续应回头补关卡、改关卡、改 role/target 标注，或在明确设计理由下提交一次课程修订。

统一通关标准不属于 audit 自己决定的内容。它是需求规格，应先和用户确认，再由 runtime/evaluator/audit 执行检查。当前 `pull_portal_fallback` 已确认正式玩家关卡默认使用 `player_on_goal`：玩家到达指定目标格。`event_occurs` 胜利条件只能视为机制 witness / fixture 用法，不能代表正式玩家关卡的通关标准。

## 当前验证结果

`pull_portal_fallback` 当前有 20 个 candidate fixture，`npm run evaluate:write` 生成的报告显示 14 个关卡达到当前形式化 evaluator pass，6 个关卡为 warning。`npm run coverage` 按 certified coverage 统计，当前 9 条知识全部为 GAP，因为没有任何关卡被标记为 `accepted`。

注意：这里的 `PASS` 只代表当前形式化标准：

- 可解。
- 目标知识有可执行事件约束。
- 完整 product graph 中没有找到绕过目标事件约束的通关路径。
- `graphAnalyzer` 在 100,000 状态预算内完成完整图枚举。
- 已配置反事实模型的目标在反事实模型下有完整不可解证明。

它还不代表：

- `expected_trace` 观察到的事件已经被证明为必要知识。
- PuzzleScript Next 导出版已经可玩。
- 关卡具有最终设计品质。
- `informal_semantics` 已被改写成形式化指标，或明确不参与验收。
- 关卡满足统一玩家通关标准。

`exploredStates` 是 solver 找最短解时探索的状态数，不等同于完整可达状态图规模。`reports/evaluation.json` 和 `reports/audit.md` 现在单独记录 `graphAnalysis.reachableStateCount` 与 `graphAnalysis.status`。例如当前 L06 和 L20 的最短解搜索很小，但完整图枚举在 100,000 状态预算下耗尽，因此不能把这些关卡用于依赖完整图的强指标。

## Detector 粒度修正

完整图检查暴露了一个 detector 设计问题：

```yaml
forbidden_events: [portal_teleport]
```

如果作为全局 trace 条件，它会把“先发生过一次普通传送，之后又发生正确的 blocked-exit 行为”的解误判为未覆盖知识。

对于 `K_blocked_portal_stops_teleport`，真正需要验证的是：

```text
同一次 blocked portal enter 没有产生 teleport。
```

第一阶段暂时删除全局 `forbidden_events`，后续需要事件窗口或结构化 transition predicate。

## L06 关卡修正

完整图检查还发现旧版 L06 可以不拉箱子就触发 fallback，因为玩家可以从某个方向进入传送门，让配对出口被墙堵住。

新版 L06 将 A 放到远离墙的位置，并要求玩家：

```text
进入 A -> 传送到 B 右侧
向下移动，垂直拉箱子到 B 的右侧出口
返回 A 左侧
再次进入 A，因 B 右侧被箱子堵住触发 fallback
```

这反向确认了当前机制的一个细节：因为进入传送门优先于拉箱，玩家不能直接沿传送门出口方向把箱子拉进出口格，必须从垂直方向把箱子拉入出口。

## 课程覆盖状态

当前 certified 覆盖摘要：

```text
GAP K_pull_single_crate: targets=L01, L02, L13 certified=none
GAP K_cannot_push_crate: targets=L02, L14 certified=none
GAP K_pull_opens_path: targets=L03 certified=none
GAP K_portal_teleports_player: targets=L04, L15 certified=none
GAP K_blocked_portal_stops_teleport: targets=L05 certified=none
GAP K_blocked_portal_pushes_entrance: targets=L05, L06, L12, L19, L20 certified=none
GAP K_blocked_portal_push_can_fail: targets=L08, L12, L17, L19 certified=none
GAP K_use_crate_to_block_portal_exit: targets=L06, L10, L20 certified=none
GAP K_move_portal_to_open_path: targets=L07, L09, L10, L11, L16, L18 certified=none
```

这说明当前 fixture set 只能用于运行时和分析器调试，不能被报告成课程已成立。质量评分器、形式化战术语义、accepted 关卡选择和玩家通关标准统一仍是未完成项。
