---
schema: trace_metric_calibration_v0
prototype: reality_anchor
calibration_id: reality_anchor_trace_metrics_v0
status: pilot
reference_cohort:
  source: design_archive clean_archive + human_reviewed
  difficulty_scores: 1_to_5
  difficulty_sample_count: 27
  spatial_organization_scores: aesthetic_2_to_5
  spatial_organization_sample_count: 25
  aggregation: single_solve_instance
solution_execution_pressure:
  weights:
    solution_cost: 0.35
    non_walk_event_count: 0.45
    heavy_reuse_ratio: 0.2
  percentile_thresholds:
    solution_cost: [8, 10.8, 17, 22.8]
    non_walk_event_count: [6.2, 9.4, 16, 20]
    heavy_reuse_ratio: [0, 0, 0.052, 0.167]
solution_space_reuse:
  weights:
    revisit_rate: 0.55
    heavy_reuse_ratio: 0.45
  percentile_thresholds:
    revisit_rate: [0.044, 0.164, 0.325, 0.422]
    heavy_reuse_ratio: [0, 0, 0.047, 0.173]
---

# 解法轨迹指标校准

这是锚点原型的轨迹统计试点，只描述规范解的执行与空间使用，不进入关卡设计
工作室的审美选择。数值来自已有的人类评分候选；难度保留 1–5，空间复用只比较
审美 2–5。

`solution_execution_pressure` 是规范解的执行压力：解长、非行走事件与高频空间调度。
它可以辅助界定难度，但不说明洞见、因果依赖或反直觉。

`solution_space_reuse` 是规范解的空间复用：回访率与高频复用格比例。它只能辅助阅读
空间组织，不能推出整体审美、惊喜或 payoff。

当前只达到 `pilot`：5 分样本覆盖仍弱，禁止把这组权重写成正式五档评分公式。每个
solve instance 单独出指标；配对或多阶段设计不得在本版把多个 instance 压成一个分数。

只有在分析任务明确引用本 calibration id，且规范解、candidate version 与参考
范围一致时才读取。它只能作为描述性元数据；不得用于 baseline / branch 排名、
审美打分或作品集取舍。
