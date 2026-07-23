# 体验简报模板

Designer 完成初次归档校准并读取 Explorer 已发布材料后、开始唯一候选前填写。人类最初只需给出体验种子；本简报固定本轮单关设计的体验核心。

```yaml
design_task_id: ""

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
  known_prior_level_refs: []  # 按课程顺序列出目标关之前的全部关卡

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
  packaging_intent: complete_single_level
  expected_difficulty: 1 | 2 | 3 | 4 | 5
  expected_scale: ""
  expected_player_load: ""

allowed_design_sources: []
prototype_specific_routing: []
human_review_constraints: []
```

填写后确认：归档校准与 task exploration 有效；所选材料都有局面卡、非空输入、最小用法和原始证据；体验核心描述玩家可感的操作与变化；作品身份可以被反事实证伪；后续只建立一个 `candidate_id`。
