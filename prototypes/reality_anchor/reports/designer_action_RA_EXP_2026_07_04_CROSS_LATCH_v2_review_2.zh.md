# Designer Action: RA_EXP_2026_07_04_CROSS_LATCH_v2 review_2

```yaml
review_iteration: review_2
candidate_version: RA_EXP_2026_07_04_CROSS_LATCH_v2
evidence_review:
  artifact: evidence_review_RA_EXP_2026_07_04_CROSS_LATCH_v2_review_2.md
  verdict: supports_with_caveats
  review_loop_state: proposal_ready_with_caveats
  required_action: none
puzzle_critic:
  artifact: puzzle_critic_RA_EXP_2026_07_04_CROSS_LATCH_v2_review_2.md
  verdict: revise_required
  review_loop_state: revise_required
  required_action: structural_revision
designer_action: reject_or_change_family
next_review_required: true
```

## Ruling

`CROSS_LATCH` family 暂停作为提交方向。v2 修复了 v1 的 opener-only 事实问题，但 critic 仍认为玩家侧不必持续重读 P/L，路线可能仍是局部 affordance 和短脚本块串联。继续局部修这个骨架很可能只增加走位或脚本段，不会解决洞见中心性。

## Family Change

下一轮改为 `COMPACT_DUAL_MATERIAL_CHAIN`：不再主张完整 cross-latch challenge，而是接受“较低负担候选”的定位，目标是紧凑双锚材料链：

- 双锚各一个，均发生 shift。
- P/L 与 B/S 都有玩家可见的状态消费，但不要求 P/L 成为贯穿全局的独立债务。
- 重点放在短链中材料相位、merge、rigid movement 与目标覆盖的清晰度。
- critic 应评估 lower-burden challenge 是否成立，而不是攻击未声明的开放式 cross-latch。

## Non-Carryover

v1/v2 的 evidence pass 不能关闭 loop。新 family 必须重新写 design claim、重新验证、重新送独立 review。

