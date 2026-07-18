# 设计树人类待玩交接模板

只交付设计树已经充分，且每个冻结节点均完成强制送审、独立硬证据、阶段 A/阶段 B 审查、原型专属提交前工作流并实际接入待玩列表的版本。

```yaml
tree_id: ""
experience_brief_ref: ""
tree_state: sufficient
root_node_id: ""

nodes:
  - node_id: ""
    parent_node_id: null
    growth_relation: baseline | construct_prefix | apply_suffix
    reviewed_exact_version: ""
    delivery_exact_version: ""
    player_experience_difference_from_parent: ""
    known_risks: []
    submission_packet_ref: ""
    evidence_review_ref: ""
    quality_review_ref: ""
    coach_note_ref: ""
    pre_submission_workflow_record_ref: ""
    pre_submission_state: completed
    playtest_status: pending_playtest
    playable_delivery:
      level_source: studio/levels.yml | levels.yml
      playable_queue: playable_queue.yml
      queue_entry: ""
      playable_build_status: built | failed
      playable_ref: ""

archive_status: not_archived_waiting_for_playtest
```

交付正文用自然语言介绍树根和各子节点怎样改变玩家与同一体验核心的关系，不复制教练内部检查问题，也不排名、不打分。未经人类试玩，不得预填 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。
