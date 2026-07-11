---
schema: trace_metric_calibration_v0
prototype: ice_slide_escape
calibration_id: ice_slide_escape_trace_metrics_v0
status: unavailable
reference_cohort:
  source: design_archive clean_archive + human_reviewed
  difficulty_scores: 1_to_5
  difficulty_sample_count: 14
  spatial_organization_scores: aesthetic_2_to_5
  spatial_organization_sample_count: 10
  aggregation: separate_base_and_meta_instances
reason: insufficient_human_reviewed_samples
---

# 解法轨迹指标校准

冰原型当前不可用。现有难度人评样本为 14，审美 2–5 样本为 10；不足以稳定地把
轨迹统计映射到辅助等级。送审包只写 `status: unavailable` 和本原因，不输出任何
轨迹数值、分数或权重。重新校准时不得沿用锚点原型的阈值或权重。
