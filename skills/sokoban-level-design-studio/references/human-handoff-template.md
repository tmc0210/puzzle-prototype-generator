# 人类待玩作品集交接模板

只交付通过硬验证和适用原型检查的 exact versions。版本平级呈现，不排名、不打分。

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

branches:
  application:
    - version: ""
      delta_from_baseline: ""
      player_experience: ""
      evidence_status: ""
      known_risks: []
  combination: []
  challenge: []

handoff_policy:
  llm_ranking: forbidden
  llm_aesthetic_scores: forbidden
  max_survivors_per_search_intent: 2
  human_actions: [select, request_revision, reject, hold]

prototype_specific_checks: []
archive_status: not_archived_waiting_for_human
```

交付摘要应回答：

- Baseline 最直接地兑现了什么；
- 每个 branch 相对 baseline 新增了什么玩家关系；
- 每个版本的回报、风险和硬证据边界；
- 哪些搜索意图没有自然存活版本。

不要写“主候选”“备选”“推荐版”“最优版”或任何审美分数。
