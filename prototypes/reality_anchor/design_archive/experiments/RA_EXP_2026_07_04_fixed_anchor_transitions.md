# Experiment: RA_EXP_2026_07_04_fixed_anchor_transitions

```yaml
experiment_id: RA_EXP_2026_07_04_fixed_anchor_transitions
prototype: reality_anchor
status: accepted_partial
source_round: 2026-07-04 fixed-anchor transition batch
selected_candidates:
  - RA_CAND_0003
  - RA_CAND_0004
rejected_or_redesign:
  - RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3
```

## Summary

这一组探索“同关出现两个锚点，但其中一个被墙固定”的中期过渡关。人类明确允许用墙隔离一个锚点，前提是固定锚点的规则效果仍被消费。

归档结果：

- `RA_CAND_0003`：B/S 分离黏块的简单教学关，审美 3、难度 2。
- `RA_CAND_0004`：固定 P/L + 可推 B/S 的下方腾挪结构，审美 4、难度 3。归档后
  无效目标剔除删除了左侧底部顺路目标，保留右侧目标；左格现在只作为黏性把手。

未归档：

- `RA_EXP_2026_07_04_FIXED_BS_SIDECAR_FERRY_v3`：人类反馈认为 P/L 只是在开局被挪开，使关卡退化成推世界，缺少游戏特色；标记为结构性重做。

## Calibration Notes

这组候选显示：固定锚点过渡关可以归档，但“另一个锚点只作为开门/清障按钮”会被视为结构问题。后续 fixed-anchor 设计应让可移动锚点持续改变操作语义，而不只是解除开局阻塞。

2026-07-04 追加校准：多目标必须各自承担约束。若某个目标只是使用把手或长链时顺路覆盖，
且删除后最短解、完整图、expected_trace 和核心事件必经性均不变，应在归档前删除该目标。
