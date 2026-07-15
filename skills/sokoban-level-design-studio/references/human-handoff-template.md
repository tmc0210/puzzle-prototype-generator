# 人类待玩交接模板

只交付完成强制送审、独立硬证据审查、fresh 玩家侧审查和原型专属提交前工作流，并已实际接入待玩列表的版本。

```yaml
portfolio_id: ""
entries:
  - slot: baseline | application | combination | challenge
    candidate_id: ""
    reviewed_exact_version: ""
    delivery_exact_version: ""
    player_experience: ""
    known_risks: []
    submission_packet_ref: ""
    evidence_review_ref: ""
    independent_level_review_ref: ""
    pre_submission_checks:
      - workflow_id: ""
        applicability: applicable | not_applicable
        applicability_basis: ""
        authority_docs: []
        artifact_refs: []
        status: completed | not_applicable
    pre_submission_workflow_record_ref: ""
    pre_submission_state: completed
    playtest_status: pending_playtest

playable_delivery:
  level_source: studio/levels.yml | levels.yml
  playable_queue: playable_queue.yml
  queue_entries: []
  playable_build_status: built | failed
  playable_ref: ""

archive_status: not_archived_waiting_for_playtest
```

交付摘要可以描述实际玩家体验和已知风险，但不排名、不打分。未经人类试玩，不得预填 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。
