# Fresh Design Claim: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v0

```yaml
candidate_family: STICKY_SHADOW_HANDLE
prototype: reality_anchor
archive_lineage_policy: fresh_required
intended_role: low_to_mid_transition_challenge
known_before:
  - K_runtime_smoke
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
```

## Player Insight

黏块不是省步数，而是“墙后影子格”的搬运结构：玩家只能接触外侧把手格，
但目标需要由被墙挡住的另一格覆盖。普通箱只能移动被直接施力的那一格；
黏块刚体会把墙后格一起带走。

## Causal Chain

1. 固定 `S/B` 边界让左侧为黏区、右侧为箱区。
2. 玩家把右侧普通箱横推入黏区，推入时它与墙后 `M` 相邻，触发
   `box_to_sticky` 和 `sticky_merge`。
3. 合并后的横向黏块有一个可接触外侧把手格，另一格位于墙后目标列。
4. 玩家从外侧推把手上移，黏块刚体整体上移，墙后格同时覆盖目标。

## Why Not Execution

若没有黏性合并，外侧普通箱可以被移动，但墙后那一格不能从下方接触，
也无法被同一上推动作带到目标列。玩家必须理解“先合并成刚体，再从可接触格
搬运不可接触格”的状态消费，而不是仅执行最短推箱路线。

## Required Evidence

- Returned trace contains `box_to_sticky`, `sticky_merge`, and `move_sticky_rigid`.
- All winning paths require material normalization, sticky merge, and sticky rigid movement
  within the searched graph/depth budget.
- Ordinary-box analog, with the sticky cell and B/S boundary replaced by plain boxes/no B/S,
  is unsolved by complete graph search or has no comparable target coverage route.

## Falsification

- If a win exists without `sticky_merge` or without `move_sticky_rigid`, reject or revise.
- If an ordinary-box analog remains solvable by moving independent boxes, reject or redesign.
- If the right-side box can directly cover the target without carrying the wall-side cell,
  reject or redesign.
