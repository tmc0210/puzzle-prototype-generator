# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v1

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
```

## Player Insight

固定 P/L 不是装饰：它把上半区变成 pull world，让最终动作必须从目标上方拉。
右目标上方可站，左目标上方被墙封死；因此普通箱不能逐个从上方拉到两个目标。
玩家必须先用可动 B/S 把右侧箱子转成黏块并与左侧 M 合并，再从右目标上方拉动
横向黏性刚体，让左侧“影子格”一起覆盖左目标。

## Causal Chain

1. 固定 P/L 被墙隔离，不能移动，但其边界把 y<=4 设为 pull side、y>=5 设为 push side。
2. 玩家在下方 push side 从左侧推 B/S，令 C 进入黏区并与 M sticky_merge。
3. 上方 pull side 禁止从下方直接推 sticky；玩家必须绕到右目标上方。
4. 左目标上方一格是墙，普通箱无法被单独从上方拉起；横向 sticky 刚体则可从右格受力，
   同步把左格带上左目标。

## Why Not Execution

这不是“箱变黏后多推一步”。若没有黏性刚体，右列箱可以被拉到右目标，但左列箱
因为上方墙无法被同样拉上去。若没有固定 P/L 的 pull side，玩家可从下方直接推，
固定锚点就没有玩家侧责任。这里两个锚点分别承担必要结构：B/S 制造横向黏性把手，
固定 P/L 强制最终从上方拉，暴露普通箱和黏性刚体的差异。

## Required Evidence

- 返回解包含 `anchor_boundary_shift:box_sticky`、`box_to_sticky`、`sticky_merge`、
  `pull_object` 和 `move_sticky_rigid`。
- 可达扫描中没有 `anchor_boundary_shift:push_pull`，证明 P/L 固定。
- 全胜路需要 `pull_object`、B/S 位移、`box_to_sticky`、`sticky_merge` 和
  `move_sticky_rigid`。
- 普通箱替代版在同样固定 P/L 分区下完整无解。

## Falsification

- 若 P/L 可以移动，reject。
- 若存在不经 pull、sticky_merge 或 sticky rigid move 的胜路，reject。
- 若普通箱替代版可解，reject。
- 若 reviewer/critic 认为固定 P/L 只改变操作标签、没有造成普通箱/黏块差异，redesign。
