# 体验简报模板

Designer 完成初次归档校准并读取 explorer 已发布材料后、开始 baseline 前填写。人类最初只需给出体验种子；本简报固定整棵设计树共享的体验核心。

```yaml
tree_id: ""

prototype_context:
  confirmed_rules: []
  win_condition: ""
  object_and_event_semantics: []
  allowed_mechanisms: []
  tool_boundary: []

player_context:
  basic_sokoban_experience_assumed: true
  player_prior: []
  prerequisite_mechanisms: []
  known_prior_level_refs: []

experience_seed:
  human_seed: ""

task_exploration:
  required_skill: sokoban-mechanism-lab
  intent: mechanism_explore
  publication_scope: task_local
  dispatch_ref: ""
  task_lexicon_ref: ""
  task_index_ref: ""
  first_material_batch_ref: ""
  selected_material_refs: []

archive_calibration:
  full_index_or_retrieval_summaries_read: false
  all_aesthetic_1_records_read: []
  related_positive_records_read: []
  related_lower_bound_or_boundary_records_read: []
  additional_human_reviewed_records_read: []
  human_comment_refs: []

experience_core:
  experience_statement: ""
  visible_setup: ""
  player_action: ""
  visible_payoff: ""
  why_level_exists: ""
  core_boundary:
    central_objects: []
    supporting_objects: []

work_identity:
  conditions: []
  counterfactuals: []

level_brief:
  baseline_packaging_intent: direct_clear_realization
  expected_difficulty: 1 | 2 | 3 | 4 | 5
  expected_scale: ""
  expected_player_load: ""

allowed_design_sources: []
prototype_specific_routing: []
human_review_constraints: []
```

填写后确认：完整 index/retrieval summaries 和所有明确审美 1 分人评已读；相关正例与下界原评语已读；task exploration 已通过 controller 校验；所选材料都有局面卡、非空输入、最小用法和原始证据；Designer 已经提取并改造材料逻辑，独立形成正式候选；baseline 已整理为可独立游玩的完整关卡；体验核心描述玩家可感的操作与变化；作品身份可以被反事实证伪。
