# 人类待玩作品集交接模板

只交付同时通过独立关卡审查、原型专属检查和独立准入审计的 exact versions。

```yaml
portfolio_id: ""
entries:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    exact_version: ""
    player_experience: ""
    known_risks: []
    submission_packet_ref: ""
    independent_review_ref: ""
    pre_submission_check_refs: []
    admission_audit_ref: ""
    admission_state: eligible
    playtest_status: pending_playtest

playable_delivery:
  level_source: studio/levels.yml | levels.yml
  playable_queue: playable_queue.yml
  queue_entries: []
  playable_build_status: built | failed
  playable_ref: ""

empty_slots: []
archive_status: not_archived_waiting_for_playtest
```

交付摘要可以描述实际玩家体验和已知风险，但不排名、不打分。未经人类试玩，不得预填 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。
