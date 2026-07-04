# Fresh Design Claim: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2

```yaml
candidate_family: STICKY_SHADOW_HANDLE
prototype: reality_anchor
archive_lineage_policy: fresh_required
intended_role: low_to_mid_transition_challenge
known_before:
  - K_runtime_smoke
allowed_exposure_through: all_current_reality_anchor_runtime_rules
score_claim_allowed: false
revision_source: structural_revision_after_v1_review_1
```

## Player Insight

并排双目标把“影子格”显性化：玩家可以从右列接触把手格，但胜利需要左、右两列
同时上移覆盖。普通箱只能覆盖可接触右列；只有先把右侧箱子转黏并与左侧 M 合并，
才能用一次上推把墙侧左列也带到目标上。

## Causal Chain

1. 目标是并排双格；左目标下方被墙阻隔，不能从下方直接推普通箱。
2. 玩家先横推 B/S，使 C 进入黏区并与左侧 M 合并成横向二格黏性刚体。
3. 右格成为可接触 handle，左格成为被墙保护的 shadow cell。
4. 最后从右列上推 sticky 刚体，两个目标同时被覆盖。

## Why Not Execution

v1 的单目标容易被读成“推到唯一可推位置”。v2 用并排目标制造可见对照：
若只是把可接触格当作普通箱上推，只能覆盖右目标，左目标仍无可推路径。玩家需要
在最后上推前读出“这个把手会把左格一起带上去”。

## Required Evidence

- 返回解包含 `box_to_sticky`、`sticky_merge`、`move_sticky_rigid`。
- 全胜路必须包含 `sticky_merge` 与 `move_sticky_rigid`。
- 若继续声称 `box_to_sticky` 精确必经，需要单独 probe；否则只声明
  `material_normalization` 必经，返回解中表现为 `box_to_sticky`。
- 普通箱替代版完整无解，且双目标不能由普通箱逐个覆盖。

## Falsification

- 若存在不经 `sticky_merge` 或不经 `move_sticky_rigid` 的胜路，reject 或 redesign。
- 若普通箱替代版可解，reject。
- 若双目标之一可由 anchor 或普通箱绕过覆盖，reject 或 redesign。
