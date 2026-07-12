# 人类待玩作品集交接模板

只交付通过硬验证和适用原型检查的 exact versions。版本平级呈现，不排名、不打分；简报和待玩列表必须同时完成。

```yaml
portfolio_id: ""
experience_core_summary: ""
work_identity_summary: ""

baseline:
  version: ""
  player_experience: ""
  relative_role: direct_complete_realization
  evidence_status: ""
  known_risks: []
  playtest_status: pending_playtest

branches:
  application: []
  combination: []
  challenge: []

playable_delivery:
  level_source: studio/levels.yml | levels.yml
  playable_queue: playable_queue.yml
  queue_entries:
    - source: studio | package
      level_id: ""
      title: ""
      added_at: ""
      status: pending_playtest
      notes: ""
  playable_build_status: built | failed
  playable_ref: ""

handoff_policy:
  llm_ranking: forbidden
  llm_aesthetic_scores: forbidden
  max_survivors_per_search_intent: 2
  human_playtest_statuses: [defer, needs_revision, ready_for_archive, reject]

prototype_specific_checks: []
archive_status: not_archived_waiting_for_playtest
```

完成交付必须回答：

- Baseline 最直接地兑现了什么；
- 每个 branch 相对 baseline 新增了什么玩家关系；
- 每个版本的回报、风险和硬证据边界；
- 哪些搜索意图没有自然存活版本；
- 每个 exact version 是否已真实出现在待玩列表，playable 是否已重建。

不要写“主候选”“备选”“推荐版”“最优版”或任何审美分数。未经人类试玩，不得预填 `defer`、`needs_revision`、`ready_for_archive` 或 `reject`。
