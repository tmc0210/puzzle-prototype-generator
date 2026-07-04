# Submission: RA_EXP_2026_07_04_PHASE_FERRY_v8

```yaml
candidate_id: RA_EXP_2026_07_04_PHASE_FERRY_v8
prototype: reality_anchor
title: Phase ferry v8
role: challenge
status: candidate
designer_action: submit_for_human_review
review_integrity: independent_review
review_loop_state: proposal_ready_with_caveats
archive_eligibility: human_pending
score_claim: none
score_reason: reality_anchor 当前 clean archive 只有一个正向人评锚点，缺少负例/下界校准；本次不输出数值审美或难度结论。
```

## ASCII View

```text
########
#..#..G#
##GMLP.#
#.BS.M.#
##..@.##
########
```

## Shortest Solution

```text
right up right up left left down right right up up left down left right right down left left left up right right down right up
```

逐步说明：

1. `right`
2. `up`: 推右侧黏块并联动 P/L，触发 `anchor_boundary_shift:push_pull` 与 `move_sticky_rigid`。
3. `right`
4. `up`
5. `left`: 推黏块并触发 `sticky_merge`。
6. `left`: 合并材料跨 B/S 边界，触发 `sticky_to_box`，左目标被箱覆盖。
7. `down`: pull P/L，重设 push/pull 边界。
8. `right`: pull B/S，触发 B/S shift 与 `sticky_to_box`。
9. `right`
10. `up`
11. `up`
12. `left`
13. `down`: 推 P/L 并通过 force chain 联动 B/S，两个锚点边界同时变化。
14. `left`
15. `right`: pull crate 到 sticky side，触发 `box_to_sticky`。
16. `right`
17. `down`
18. `left`: 推 P/L 左移，设置右上目标收束侧。
19. `left`: 继续设置 P/L。
20. `left`: 完成 P/L 收束位置。
21. `up`
22. `right`: 推 sticky 刚体向右。
23. `right`: 继续推 sticky 刚体。
24. `down`
25. `right`
26. `up`: 推 sticky 刚体覆盖右上目标并胜利。

## Evidence Summary

- `explain-level`: shortest solution found, cost/depth 26, explored states 902。
- Graph complete: reachable states 4150, legal transitions 9998, winning states 35。
- Agency/SCC complete: compressed regions 586, SCCs 356, winSubgraph = `branching_win_dag`。
- Event probe complete: 对 `push_pull_anchor_shift`、`box_sticky_anchor_shift`、`pull_event`、`material_normalization`、`sticky_merge`、`sticky_rigid_move` 的 combined probe 均未找到 winning bypass。
- v6 修订点：底部 movable ballast `C` 改为墙；v8 保留六组事件必要性，并降低状态图规模。

## Reviewer Conclusions

Evidence reviewer `review_2`:

- Verdict: `supports_with_caveats`
- State: `proposal_ready_with_caveats`
- Required action: `none`
- 支持六组 central event all-winning-path gate 与完整 graph/SCC；同时强调 event probe 不证明唯一解、对象身份或逐目标覆盖身份。

Puzzle critic `review_2`:

- Verdict: `supports_with_noncore_caveats`
- State: `proposal_ready_with_caveats`
- Required action: `none`
- 强项：v8 将 v6 的 movable ballast 改成墙，约束读法更诚实；claim 降级为 two-stage phase shuttle 后，左目标 merge-to-box 与右上目标 reset-to-sticky-delivery 的责任更清楚；中段 P/L、B/S 和 force chain 仍提供可见连接。
- Caveat：末段连续 P/L 左移仍有 padding 读感；可接受为右上目标收束索引，但不要包装为候选亮点。

## Artifact Links

- Candidate packet: `prototypes/reality_anchor/reports/candidate_packet_RA_EXP_2026_07_04_PHASE_FERRY_v8.zh.md`
- Level analysis: `prototypes/reality_anchor/reports/level_analysis_RA_EXP_2026_07_04_PHASE_FERRY_v8.md`
- Event probe: `prototypes/reality_anchor/reports/event_probe_RA_EXP_2026_07_04_PHASE_FERRY_v8.md`
- Evidence review: `prototypes/reality_anchor/reports/evidence_review_RA_EXP_2026_07_04_PHASE_FERRY_v8_review_2.md`
- Puzzle critic: `prototypes/reality_anchor/reports/puzzle_critic_RA_EXP_2026_07_04_PHASE_FERRY_v8_review_2.md`
- Designer action: `prototypes/reality_anchor/reports/designer_action_RA_EXP_2026_07_04_PHASE_FERRY_v8_review_2.zh.md`
