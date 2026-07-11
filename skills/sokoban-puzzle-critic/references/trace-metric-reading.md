# Trace Metric Reading Reference

轨迹指标是规范解的事实摘要，不是 SCC / graph 事实，也不是整体质量评分器。只在
packet 的 `calibrated_trace_metrics.status` 为 `pilot` 或 `active` 时阅读。

## Read Order

1. 先读 `player_facing_reading`。
2. 确认 calibration id、exact candidate version 和 canonical trace source 一致。
3. 再读取轨迹指标；若 status 是 unavailable 或校准边界缺失，记录 `verdict_effect: none`。

## Metric Scope

`solution_execution_pressure` 只描述解长、非行走机制事件与高频空间调度。高值表示
操作和状态管理较密集，低值表示当前规范解不依赖这一维度。它不测量洞见、因果依赖
或反直觉。

`solution_space_reuse` 只描述玩家是否反复回到相同工作区。高值表示空间被重复利用，
低值表示解法主要一次性穿行。它不测量复用是否优雅、是否带来惊喜或整体审美。

**量化边界：**仅可使用 `calibrated_trace_metrics` 中显式列出且状态为 `pilot` 或
`active` 的指标。除此之外，任何从 layout、解法或轨迹自行补算、估算或衍生的类似
指标及其变体，均未针对该原型完成相关性校准，置信度未知；不得纳入难度或审美评分、
优点、缺陷及修改建议。`unavailable` 时不得以其他指标替代。

## Required Player-Facing Checks

对高 `solution_execution_pressure`：检查每段额外操作是否产生后续被消费的状态变化。
若没有，写作 padding / execution risk，而不是难度 merit。

对高 `solution_space_reuse`：检查每次回访是否因局面变化获得新用途、承担共享资源或
改变路线责任。若没有，写作 shuttle / rearrangement risk，而不是空间组织 merit。

对低值：只能写“当前解法不靠这一维度成立”。短而反直觉、单洞见或终局重读关不应
因低执行压力或低空间复用被降分。

## Allowed Output Shape

```yaml
trace_metric_interpretation:
  calibration_status: pilot | active | unavailable
  solution_execution_pressure:
    metric_fact:
    allowed_reading:
    player_facing_check:
    verdict_effect: none | merit | caveat
  solution_space_reuse:
    metric_fact:
    allowed_reading:
    player_facing_check:
    verdict_effect: none | merit | caveat
  unmeasured_dimensions:
    - causal_dependency
    - player_insight
    - counterintuitive_reframe
    - surprise_and_payoff
```

若指标与目标分数相差两档以上，可以输出 `critic_items[type=score_boundary]`。默认它是
非阻塞风险；只有独立的玩家侧证据已显示 claim 失败时，才能升级为 blocker。
