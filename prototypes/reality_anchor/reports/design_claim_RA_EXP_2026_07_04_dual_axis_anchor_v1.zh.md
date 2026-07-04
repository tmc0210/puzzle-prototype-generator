# Fresh design claim: RA_EXP_2026_07_04_dual_axis_anchor_v1

## Routing

```yaml
prototype: reality_anchor
archive_lineage_policy:
  default: fresh_required
  authorized_archive_variant_work:
    enabled: false
  candidate_relation: fresh
design_handoff: not_found
prototype_specific_workflows: not_applicable
archive_taste_context: none_found
```

## Brief

本轮目标是一个后期高难 challenge：默认玩家已经知道 Reality Anchor v0 的全部可用规则，关卡必须同时包含两个不同方向的锚点，一个水平 1x2、一个竖直 2x1。优先目标不是教学，而是让两个锚点在同一条胜利因果链中产生共享责任。

## Design target

```yaml
role: challenge
known_before:
  - K_runtime_smoke
allowed_exposure_through: all_current_reality_anchor_runtime_rules
difficulty_or_support_expectation: late-game high difficulty, support none
aesthetic_target: unscored; maximize compactness, shared dependency, readable dual-axis contrast
score_claim_allowed: false
mechanism_scope:
  central:
    - horizontal_vs_vertical_anchor_contrast
    - push_pull_boundary_shift
    - box_sticky_boundary_shift
    - box_to_sticky_or_sticky_to_box_normalization
    - sticky rigidity as a consumed constraint
  allowed_support:
    - force_chain
    - anchor cells covering targets
    - ordinary crate target coverage
  forbidden_if_possible:
    - a winning path that leaves either anchor unmoved
    - a winning path that avoids all material normalization
    - a pure execution corridor where events occur in obvious local order
```

## Claim to test

```yaml
player_insight: >
  The player must read the two anchors as orthogonal global cuts: the horizontal
  P/L cut decides whether a lane is push or pull, while the vertical B/S cut
  decides whether the same cargo behaves as independent boxes or a rigid sticky
  body. The intended solve asks the player to move each cut because neither
  anchor is only scenery; each cut changes what a later move can mean.
causal_chain:
  - Establish or exploit a push/pull boundary so a movable object can be acted on from the required side.
  - Move the vertical box/sticky anchor, changing the material side of at least one cargo cell.
  - Consume the resulting sticky/box state as a later movement constraint or target-cover resource.
  - Move the other anchor or the converted cargo into final target coverage.
why_not_execution: >
  The hard part should be choosing which global cut to spend first. A merely
  local player should see legal pushes and pulls, but committing one anchor too
  early should strand the other cut or change cargo material at the wrong time.
falsification:
  - solver finds a short win using only one anchor
  - returned solution has no pull or no anchor boundary shift for one anchor type
  - complete search finds a win without box_to_sticky/sticky_to_box
  - graph is exhausted before reachable evidence can support the claim
```

## Tool questions

```yaml
questions:
  - Can a compact layout with one horizontal and one vertical anchor be solved under the default target-cover win?
  - Does the returned solution move both anchor types and trigger material normalization?
  - Under complete search, is there a winning bypass that avoids either anchor shift or all material normalization?
  - Do SCC/agency facts show genuine commitments rather than a pure walk corridor?
```
