# Redundant Element Prune Correction: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned

baseline_candidate: RA_LEX_2026_07_07_BIND_CUT_TAIL_v1
corrected_candidate: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned
supersedes: RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_space_pruned
status: corrected_prune

## Correction

此前 `v2_space_pruned` 把右上区域 `[6,1], [7,1], [8,1]` 全部墙化，这是错误的 space-prune 判定。

原因：

- 右上区域不是单连通 dead corner / leaf；
- 它通过多格与右侧主走廊、右目标附近区域相连；
- Reality Anchor 冗余空间裁剪优先处理单连通死角、单入口 pocket、明显无责任枝杈；
- “不在返回最短解中出现”不能直接推出“可裁”。

因此右上区域应保留。`v2_space_pruned` 相关质量结论只能作为错误剪枝的审计历史，不能作为正式候选或正式 prune 结论。

## Corrected Layout

```text
##########
#@.#G#...#
#.CC....G#
####....##
####BS####
##########
```

只墙化 B/S 两侧 side pockets：

- [1,4], [2,4], [3,4]
- [6,4], [7,4], [8,4]

保留右上区域：

- [6,1], [7,1], [8,1]

## Fixed Sequence

1. `goal_prune`
2. `object_remove_prune`
3. `object_wallify_prune`
4. `space_prune`
5. `wall_outline_prune`

## Goal Prune

Both targets are retained.

- Remove top target [4,1]: cost 17 -> 6 and releases a winning bypass missing `sticky_to_box`.
- Remove right target [8,2]: cost 17 -> 14 and removes the sticky-tail consumption ending.

Refs:

- `layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_top_goal.md`
- `event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_top_goal_core5.md`
- `layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_tail_goal.md`
- `event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_tail_goal_core5.md`

## Object Remove / Wallify Prune

No object enters remove/wallify testing.

- The initial crates move, convert, split, and cover targets.
- B/S is the required material-normalization boundary, not a blocker-only object.

## Space Prune

### Removed

The B/S side pockets are removed:

```text
#...BS...# -> ####BS####
```

Reason:

- They are side pockets around a fixed B/S boundary after the design claim excludes B/S movement.
- Removing them preserves cost, trace, complete graph, and core event necessity.
- Fixed B/S scan reports no reachable `anchor_boundary_shift:box_sticky`.

### Retained

The right-top region `[6,1], [7,1], [8,1]` is retained.

Reason:

- It is not a single-entry dead corner.
- It preserves more player routing room around the right-side target/cutback area.
- Removing it over-tightens the graph and contributed to the prior over-linear `v2_space_pruned` result.

## Corrected Hard Facts

- Shortest cost: 17.
- Graph: complete.
- Reachable states: 397.
- Legal transitions: 982.
- Winning states: 1.
- Opening: commitments=1, viable=1, dead=0, optimal=1.
- Core5 probe: complete/no bypass for `force_chain`, `box_to_sticky`, `sticky_merge`, `sticky_to_box`, `move_sticky_rigid`.
- Count probe: complete/no win below 2 `box_to_sticky`.
- Order probe: complete/no winning route with `sticky_to_box` before `sticky_merge`.
- Fixed B/S scan: complete, forbidden `anchor_boundary_shift:box_sticky` hits: none.

Refs:

- `layout_analysis_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned.md`
- `event_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_core5.md`
- `event_count_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_box_to_sticky_min2_box_to_sticky_min2.md`
- `order_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_no_cut_before_merge.md`
- `fixed_anchor_probe_RA_LEX_2026_07_07_BIND_CUT_TAIL_v2_anchor_pockets_pruned_bs_fixed_scan.md`

## Recommendation

Do not submit as a qualified candidate yet. The corrected prune avoids the mistaken right-top cut, but the graph still has substantial forced-prefix pressure (`forced viable prefix=6/8`, `forced optimal prefix=8/8`). It should remain out of the playable queue unless redesigned or re-reviewed under a lower-bound mechanism-study role.
