# MVP 路线图

第一阶段目标是跑通完整垂直切片，而不是一次性支持所有怪机制。

## 示例机制

MVP 建议使用：

```text
玩家只能拉箱子，不能推；
存在成组传送门；
玩家进入传送门时，如果出口被堵，则不传送，而是尝试推动入口传送门。
```

这组机制足够小，但覆盖关键能力：

- 基础动作。
- 负向约束。
- 传送门。
- fallback 分支。
- 目标知识。
- 反事实验证。
- PuzzleScript Next 导出。

## 阶段 0: 文档与 schema 草案

产物：

- README。
- 机制 IR 文档。
- 知识/课程文档。
- 求解器/评分器文档。
- 关卡生成循环文档。
- 示例 prototype 包格式。

## 阶段 1: Runtime Skeleton

目标：

- 加载 `mechanic.yml`。
- 加载 `levels.yml`。
- 表示状态、对象、输入、事件。
- 实现 `step(state, input)`。
- 支持确定性规则和简单分支。

验收：

- 可以手写一个小关。
- 可以按输入序列回放。
- 每一步产生事件日志。

## 阶段 2: Exact Solver

目标：

- BFS。
- Dijkstra。
- 状态 hash。
- 路径记录。
- 事件自动机。
- 反事实模型切换。

验收：

- 找到最短解。
- 判断不可解。
- 输出解法 trace。
- 禁用某个规则分支后重新求解。

## 阶段 3: Proof Evaluator

目标：

- 检查目标知识事件。
- 枚举最短解。
- 对小关完整展开状态图。
- 反事实不可解检查。
- 输出证明型报告和诊断型报告。

验收：

- 能判断某关是否真正需要 `K_blocked_portal_pushes_entrance`。
- 能区分证明型结论和预算内诊断。

## 阶段 4: PuzzleScript Next Exporter

目标：

- 从机制和关卡导出 `game.ps`。
- 使用结构化注释回链 rule id、event id 和 knowledge id。
- 保守支持 MVP 机制，不追求任意 IR 的完整导出。

验收：

- 导出的 PuzzleScript Next 原型可玩。
- 关卡顺序与 curriculum 一致。

## 阶段 5: Knowledge And Curriculum

目标：

- 从规则分支和 `teaches` 标记生成候选知识。
- 支持人工确认知识列表。
- 生成课程规划草案。

验收：

- 示例机制能得到 6-12 条知识。
- 每条知识有来源、前置、检测事件和反事实配置。

## 阶段 6: Level Generation

目标：

- 为每条知识生成 discovery / boundary / guided_application 候选。
- 使用 solution sketch 和局部模板构造候选。
- 静态过滤、intended trace 验证、solver 筛选。

验收：

- 示例机制能生成 12-20 个递进关卡候选。
- 每个正式候选都有求解和评分报告。

## 后续方向

- 更多机制模块：重力、滑行、开关门、嵌套关卡、规则变化。
- 更强图分析：SCC、dominator、核心事件路径唯一性。
- 可插拔优化：reachability macro、push/pull macro、reverse tools。
- 更强课程规划：知识覆盖、重复控制、难度曲线。
- 人工反馈数据：用人类偏好校准评分权重。
