# Fresh Design Claim: RA_EXP_2026_07_04_FIXED_BS_PULL_WINDOW_v0

```yaml
candidate_family: FIXED_BS_PULL_WINDOW
prototype: reality_anchor
archive_lineage_policy: fresh_required
intended_role: mid_game_fixed_anchor_transition
known_before:
  - K_runtime_smoke
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
anchor_structure:
  fixed_anchor: box_sticky
  movable_anchor: push_pull
```

## Player Insight

固定 B/S 不只是背景配色，而是不可移动的材料边界：普通箱必须跨入 sticky side 后才会与等待的 M
合并成横向刚体。可动 P/L 负责制造一个短暂 pull window，使玩家不能用普通推箱逐格整理目标，
而必须把已经合并的 sticky handle 从可接触格拉动，带动另一格覆盖被墙保护的目标。

## Causal Chain

1. 固定 B/S 被墙隔离，边界不能移动；左侧为 box side，右侧为 sticky side。
2. 玩家移动 P/L 打开/移动 pull 侧窗口，获得从目标上方或侧上方拉物体的能力。
3. C 跨过固定 B/S 边界转成 sticky，并与 M sticky_merge。
4. 合并后的 sticky 刚体由可接触格受力，另一格进入普通箱无法到达的目标位。

## Why Not Execution

如果只是多推几步，普通箱替代版应能解；本设计必须让普通箱替代版完整无解。
如果固定 B/S 只是装饰，胜路就不应全都需要材料归一化与 sticky_merge。若 P/L 只是路障，
胜路不应需要 pull_object 或 P/L 位移。合格候选必须同时证明固定材料边界、可动推拉窗口、
黏性刚体携带三者被消费。

## Required Evidence

- 可达扫描无 `anchor_boundary_shift:box_sticky`，证明 B/S 固定。
- 返回解包含并且全胜路需要：
  - `anchor_boundary_shift:push_pull`
  - `pull_object`
  - `box_to_sticky`
  - `sticky_merge`
  - `move_sticky_rigid`
- 普通箱替代版完整无解。

## Falsification

- 若固定 B/S 可移动，reject。
- 若存在不经 P/L 位移、pull、box_to_sticky、sticky_merge 或 sticky rigid movement 的胜路，reject。
- 若普通箱替代版可解，reject。
- 若 critic 认为 P/L 只是路障且 pull window 不承担玩家侧读法，structural_revision。
