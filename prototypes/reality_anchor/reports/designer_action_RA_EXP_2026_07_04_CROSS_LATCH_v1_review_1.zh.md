# Designer Action: RA_EXP_2026_07_04_CROSS_LATCH_v1 review_1

```yaml
review_iteration: review_1
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v1
evidence_review:
  artifact: evidence_review_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  artifact: puzzle_critic_RA_EXP_2026_07_04_CROSS_LATCH_v1_review_1.md
  verdict: revise_required
  review_loop_state: revise_required
  required_action: structural_revision
designer_action: revise_structure
next_review_required: true
```

## Ruling

v1 不进入提交候选。证据层支持事件组必要性，但 critic 打回的是玩家侧结构：P/L 读作一次性 opener，不足以支撑 cross-latch；8/17 walk step 和短脚本块使 why_not_execution 仍可能退化成局部执行。

## Revision Targets

- P/L 必须在中段或末段再次承担可见状态债务，而不只是开局打开 pull 窗口。
- 保留双锚、pull、material normalization、sticky_merge、sticky_rigid_move 的 all-solution gate。
- 控制走位比例；如果路线仍短，关键步必须有明确状态消费。
- 新 packet 必须降级或重写 player_insight，不能继承 v1 critic 已打回的 cross-latch 说法。

## Candidate Handling

`RA_EXP_2026_07_04_CROSS_LATCH_v2` 可作为结构素材，因为它来自同一 fresh claim 搜索且 P/L 有中后段参与；但必须重新写 design claim、重新跑证据，并进入 review_2。v1 的 positive evidence 不可直接继承为合格状态。

