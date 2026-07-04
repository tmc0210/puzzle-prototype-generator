# Submission: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2

```yaml
candidate_id: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2
prototype: reality_anchor
title: Dual lockstep v2
role: challenge
status: candidate
designer_action: submit_for_human_review
review_integrity: independent_review
review_loop_state: proposal_ready_with_caveats
archive_eligibility: human_pending
score_claim: none
score_reason: reality_anchor 当前 clean archive 只有一个正向人评锚点，缺少负例/下界校准；本次按用户要求不输出数值审美或难度结论。
```

## ASCII View

```text
###########
###.PL.####
##@BSGG####
###.MM...G#
###.M..M.##
###########
```

## Shortest Solution

```text
right down right left up up right down left down right right right up left down right up down
```

逐步说明：

1. `right`: 推 B/S 过边界，触发 B/S shift 与 `sticky_to_box:n2`，制造箱/黏混合债务。
2. `down`
3. `right`: 推箱并通过 force chain 移动黏块，触发 `box_to_sticky:n1` 与首次 `sticky_merge:n1`。
4. `left`
5. `up`
6. `up`
7. `right`: 推 P/L 右移，改变后续 push/pull 分界。
8. `down`: 推 B/S 下移，同时推动黏块，触发第二次 `sticky_merge:n1`。
9. `left`
10. `down`
11. `right`: 右推 B/S，逐格转换材料，触发 `sticky_to_box:n1`。
12. `right`: 继续右推 B/S，触发 `sticky_to_box:n1`。
13. `right`: 第三次右推 B/S，触发 `sticky_to_box:n1` 并建立右侧收束链。
14. `up`: pull crate 覆盖上方目标。
15. `left`
16. `down`
17. `right`: 推 crate/B/S 链，使 B/S 参与右侧目标覆盖。
18. `up`
19. `down`: pull P/L 下移，P/L 覆盖左/中双目标并完成胜利。

## Evidence Summary

- `explain-level`: shortest solution found, cost/depth 19, explored states 1169。
- Graph complete: reachable states 4993, legal transitions 12021, winning states 93。
- Agency/SCC: compressed regions 725, SCCs 390, winSubgraph = `branching_win_dag`。
- Event probe complete: 对 `push_pull_anchor_shift`、`box_sticky_anchor_shift`、`pull_event`、`material_normalization`、`sticky_merge`、`sticky_rigid_move` 的 combined probe 均未找到 winning bypass。
- 关键修复：v1 的 `sticky_merge` 可绕过问题在 v2 中被修复；`sticky_merge` 现在为全胜路必要事件组。

## Reviewer Conclusions

Evidence reviewer `review_2`:

- Verdict: `supports_with_caveats`
- State: `proposal_ready_with_caveats`
- Required action: `none`
- 支持 central event group claims；同时明确证据不能证明玩家认知本身，也没有对象实例级必要性证据。

Puzzle critic `review_2`:

- Verdict: `supports_with_noncore_caveats`
- State: `proposal_ready_with_caveats`
- Required action: `none`
- 强项：v2 将 `sticky_merge` 从可绕过亮点提升为全胜路必要材料重组；新增中段 M 后，开局材料债务、中段合并和后续 B/S 消费链更清楚；P/L 与 B/S 在右侧终局收束中重新耦合。
- Caveat：连续右推 B/S 仍有同方向操作观感，提交时应解释为“逐格材料转换与消费”，不包装为独立难点；不声明数值高难、唯一解或对象身份必要性。

## Artifact Links

- Candidate packet: `prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.zh.md`
- Level analysis: `prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.md`
- Event probe: `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2.md`
- Evidence review: `prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2_review_2.md`
- Puzzle critic: `prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2_review_2.md`
- Designer action: `prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_DUAL_LOCKSTEP_v2_review_2.zh.md`
