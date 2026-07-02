# Designer Action: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1 review_2

```yaml
candidate_version_reviewed: ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1
evidence_review_ref: evidence_review_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_review_2.md
puzzle_critic_ref: puzzle_critic_ICE_EXP_META_2026_07_02_round29_fresh_return_gate_v1_review_2.md
designer_action: revise_structure
review_loop_state: revise_required
next_step: round30_structural_revision_or_change_family
```

## Decision

Round29 的机器事实足够强，但最新独立 puzzle critic 要求结构修改，且 `required_action: structural_revision`。因此 round29 不能作为本目标的合格提交候选关闭。

## Required Structural Changes

- 降低 base 的同构双门感：第二个 target door 需要新增跨门状态债、错序风险或不同对象角色。
- 强化 cross-visit reuse：至少一个目标/冰/空间关系需要在 base 和 meta 中承担不同核心角色，而不是只复用 target-debt 语法。
- 强化 return pressure：若继续使用 B=C / D=A，必须让它的玩家侧意义来自结构和回访压力，而不是坐标反向实例。
- 避免把完整图、required d4 或 commitment 数量直接当作审美/难度证明。

