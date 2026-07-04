# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v2

```yaml
candidate_family: FIXED_PL_SHADOW_PULL
prototype: reality_anchor
archive_lineage_policy: fresh_required
intended_role: mid_game_fixed_anchor_transition
known_before:
  - K_runtime_smoke
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
anchor_structure:
  fixed_anchor: push_pull
  movable_anchor: box_sticky
revision_source: v1_box_analog_solved
```

## Player Insight

固定 P/L 强制最终从上方 pull；可动 B/S 只给玩家一次下方 push-side 的材料制造窗口。
左目标上方一格被墙封死，普通箱无法被单独拉入左目标；横向 sticky 刚体可以从右格受力，
把左侧影子格一起拉上去。

## Causal Chain

1. 固定 P/L 被墙隔离，P 在 L 下方，因此 y>=5 是 push side，y<=4 是 pull side。
2. 下方空间只允许玩家从左侧推 B/S 一格，令 C 转成 sticky 并与 M 合并。
3. 收紧的下半区不允许普通箱在目标下方重新编排；玩家必须回到上方右目标位置。
4. 最终在 pull side 从右格拉横向 sticky group 上移，同时覆盖左右两个目标。

## Why Not Execution

如果只是普通箱，右列箱可以被拉到右目标，但左列因为上方墙与下半区封锁，不能被单独拉到左目标。
如果没有固定 P/L 的 pull side，玩家可从下方推，固定锚点不承担因果责任。v2 同时要求：
固定 P/L 决定最终施力方向，B/S 决定材料结构，sticky_merge 决定两个目标能否被一次动作共同覆盖。

## Required Evidence

- 返回解包含 `anchor_boundary_shift:box_sticky`、`box_to_sticky`、`sticky_merge`、
  `pull_object` 和 `move_sticky_rigid`。
- 固定 P/L 可达扫描无 `anchor_boundary_shift:push_pull`。
- 全胜路需要 B/S 位移、pull、box_to_sticky、sticky_merge、sticky rigid movement。
- 普通箱替代版完整无解。

## Falsification

- 若 P/L 可移动，reject。
- 若普通箱替代版可解，reject。
- 若存在不经 pull、sticky_merge 或 sticky rigid move 的胜路，reject。
