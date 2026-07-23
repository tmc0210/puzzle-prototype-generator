# 单关人类待玩交接模板

只交付已经完成强制送审、独立硬证据、单次 Critic 审查、原型专属提交前工作流并实际接入待玩列表的唯一 delivery version。

```yaml
design_task_id: ""
experience_brief_ref: ""

candidate:
  candidate_id: ""
  reviewed_exact_version: ""
  delivery_exact_version: ""
  player_experience: ""
  known_risks: []
  submission_packet_ref: ""
  evidence_review_refs: []
  critic_review_ref: ""
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

交付正文只介绍当前关卡的体验核心、玩家实际操作、可见回报、已知风险和证据边界，不比较其它设计，不排名、不打分。未经人类试玩，不得预填 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。
