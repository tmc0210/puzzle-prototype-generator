# Submission: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3

```yaml
prototype: reality_anchor
candidate_id: RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3
candidate_packet: prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review4.zh.md
review_loop_state: proposal_ready_with_caveats
review_integrity: independent_review
archive_eligibility: human_pending
latest_required_action: none
score_claim_allowed: false
```

## Level

```text
##########
#.##MG.###
#.....P###
#@CBSMLG##
###..M..##
#####G####
##########
```

## Brief Fit

- 后期高难关卡尝试。
- 同时包含两个不同锚点：水平 B/S 与竖直 P/L。
- 不使用审美或难度分数，因为 Reality Anchor 暂无 clean human-reviewed archive 可校准。

## Supported Mechanism Claims

完整事件组探针支持以下全胜路事件组必要性：

- push_pull_anchor_shift
- box_sticky_anchor_shift
- pull_event
- material_normalization
- sticky_merge
- sticky_rigid_move

返回解还展示了 `force_chain`、`box_to_sticky`、`sticky_merge`、两类 anchor boundary shift、`pull_object` 和 `move_sticky_rigid`。

## Evidence Summary

```yaml
shortest_solution:
  found: true
  cost: 22
  explored_states: 900
  inputs: up right right down right up right up right down left down right up left left down left left up right right
full_graph:
  status: complete
  reachable_states: 1668
  legal_transitions: 4109
  winning_states: 15
event_probe:
  status: complete
  found_bypass: false
  explored_states: 2984
agency:
  status: complete
  initial_region_commitments: 2
  initial_region_viable_commitments: 1
  initial_region_dead_commitments: 1
  win_subgraph: branching_win_dag
```

## Independent Review

- Evidence reviewer review_4: `supports_with_caveats`; `proposal_ready_with_caveats`; `required_action: none`。
- Puzzle critic review_4: `supports_with_noncore_caveats`; `proposal_ready_with_caveats`; `required_action: none`。

## Caveats

- 不声明唯一路线。
- 不声明具体对象实例或逐目标对象身份在所有胜路中必经。
- player insight 仍需人类玩法反馈确认。
- 当前提交只能进入 `human_pending`，不能归档为已校准审美/难度样本。

## Key Files

- `prototypes/reality_anchor/levels.yml`
- `prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md`
- `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3.md`
- `prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md`
- `prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_DUAL_AXIS_LOCK_v3_review_4.md`
