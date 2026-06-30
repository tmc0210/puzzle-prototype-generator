# ICE_EXP_003 2026-06-30 Round 8: Target-Eject Gated Pocket

```yaml
experiment_id: ICE_EXP_003_2026_06_30_round8_target_eject_gated_pocket
prototype: ice_slide_escape
terminal_state: structural_redesign_needed
proposal_ready_candidates: []
held_candidates: []
structural_redesign_needed_candidates:
  - ICE_CAND_0015
review_integrity: human_review
archive_pass: local_record_only
```

## Human Redirect

本轮承接人类的新校准：

```text
严格拆“独立子题”不是唯一标准；真正要避免的是很多逻辑链没有宣称得那么有趣。
玩家不应只是在做“为了推 A 先推 B，为了 B 先推 C”的前置条件排队。
流程要完整，仍需跑证据和 critic。
```

本轮目标：

```text
- 优先做对象角色转换，而不是单纯增加 push 数。
- 至少包含一个“看似正确状态必须先破坏”的洞见。
- 前序产物需要在 final move 中被消费。
- 起点/终点外尽量没有额外 edge interface。
- 对 evidence、critic 和 caveat 做完整记录。
```

## Candidate Result

`ICE_CAND_0015 v2` 机器证据成立，但人类评审判为 structural_redesign_needed。

```yaml
layout_ref: prototypes/ice_slide_escape/reports/ICE_CAND_0015_scratch_v2_target_eject_gated_pocket.txt
player_start: [0, 1]
player_goal: [14, 1]
manual_runtime_replay:
  input_count: 36
  push_count: 4
  win: true
initial_standable_edge_cells:
  - [0, 1]
  - [14, 1]
```

核心逻辑：

```text
T right d2: [2,1] target ice leaves target and becomes future group member [4,1].
B up d5: refills [2,1] and becomes final stopper.
C right d3: clears C, preserves A, opens route into A's right pocket.
A left d6 len2: destroys [5,1] wall + [4,1] ejected ice, restarts, uses B,
and lands on [3,1].
```

## Evidence Boundary

```yaml
trace_replay:
  result: pass
  ref: prototypes/ice_slide_escape/reports/trace_replay_ICE_CAND_0015_v2_target_eject_gated_pocket.md
layout_analysis:
  result: complete
  states: 3072
  legal_transitions: 9583
  winning_states: 1
  ref: prototypes/ice_slide_escape/reports/layout_analysis_ICE_CAND_0015_v2_target_eject_gated_pocket.md
precise_required_event_probe:
  result: pass
  explored_augmented_states: 3315
  required_events:
    - ice_stop_short:d2
    - ice_pass_through_d5:len1
    - slide_restart_after_group
    - ice_destroyed_d3
    - ice_destroy_group_d6_plus:len2
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_precise_required_probe.md
all_edge_starts:
  result: caveat
  checked_starts:
    - [0, 1]
    - [14, 1]
  ref: prototypes/ice_slide_escape/reports/start_comparison_ICE_CAND_0015_v2_all_edge_starts.md
```

可以声称：

```text
- 对声明的 [0,1] -> [14,1] solve instance，完整搜索内没有缺少关键事件的胜路。
- 图完整，只有 1 个 winning state。
- 起终点外没有其它 standable edge starts。
- 初始 target ice 的推出动作不是装饰；它后续作为 final d6 len2 obstacle group
  的一部分被销毁。
```

不能声称：

```text
- 这是 5-7 步或更长的高难链。
- endpoint-as-start pair 没有污染风险。
- 事件证据能证明冰块身份；对象身份仍由坐标快照和布局逻辑解释。
```

## Exploration Notes

```text
v1_target_eject_group:
  结果: 手工 trace 成立，但 required-event probe 发现 42 步替代胜路。玩家能
  提前进入右侧，把 C 左推成 final d5 group，从而绕开 d3/d6 claim。

v2_target_eject_gated_pocket:
  修改: 将 A 右侧口袋改为 C d3 后才能从 C 原位进入；下层走廊不能提前进入
  C 右侧。
  结果: layout analysis complete；precise required-event probe pass；all-edge
  scan 只发现声明起点与声明终点两个 standable edge starts。
```

## Review Result

```yaml
review_1:
  candidate_version_reviewed: ICE_CAND_0015_v2_target_eject_gated_pocket
  evidence_reviewer:
    verdict: supports_with_caveats
    review_loop_state: proposal_ready_with_caveats
    core_result: >
      Strong machine evidence supports the limited declared-instance claim:
      complete graph, one winning state, precise required events, and no
      non-start/non-goal standable edge.
  design_critic:
    verdict: held_proposal
    review_loop_state: held_proposal
    core_result: >
      The role flip is real and much closer to the user's requested insight
      quality than a stopper queue. However, the chain is still only four
      commitments and the opener is forced by corridor shape, so this should
      be held as a compact reference/direction rather than presented as the
      final high-difficulty design.
human_review_1:
  verdict: structural_redesign_needed
  review_loop_state: structural_redesign_needed
  core_result: >
    Human review rejects the central player-insight claim. The target-eject
    action is naturally forced by the unique start corridor, so the player does
    not need to notice, ignore, and later reinterpret a correct target ice. The
    upper-middle ice reads as a simple key/door step with only light, overly
    deliberate distraction. The level has a solid multi-mechanic causal chain,
    but remains a general linear unlocking structure lacking effective
    misdirection or high-difficulty insight.
```

## Terminal State

```text
structural_redesign_needed, not proposal_ready.
```

原因：

```text
机器证据证明这条逻辑链扎实成立，但人类评审指出关键洞见并未真实发生：玩家
沿唯一通路自然触发 target eject，不会把它读成“先破坏正确状态”的思维反转。
因此它是一般性的线性开锁结构，而不是有效误导或高难洞见结构。下一轮需要大改
空间入口和观察顺序，让玩家先形成错误但合理的解释，再被迫推翻该解释。
```
