# Fresh / Revision Claim: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v3

- Slot: L11, movable B/S anchor, no P/L anchor.
- Status: pruned revision after `v2` goal-prune check found the right-side target redundant.
- Freshness: this is a compact revision of the rejected `BAR_HANDLE_SPLIT` line, but the win condition and evidence target are different: two separate crates must be cut out of a sticky bar and used in different destinations. It does not reuse an archived solution pattern.

## Intended causal chain

1. Push the starting crate into the S-side so it becomes sticky and merges with the two sticky cells.
2. Push the merged three-cell sticky bar downward as a rigid structure; ordinary boxes cannot reproduce this reachability because the whole bar must move together before splitting.
3. Push the B/S anchor right twice. Each shift cuts one cell off the sticky bar into a crate; fewer than two cuts should not solve.
4. Push the first cut crate upward to the upper target, opening the vertical access.
5. Push the second cut crate downward to the lower target.

## Anti-witness claim

This candidate is meant to avoid the user-flagged failure mode where conversion merely saves walking. The conversion is structural: no win should exist without the merge, the rigid sticky-bar move, two B/S boundary shifts, two `sticky_to_box` cuts, and post-cut crate pushes.

## Goal-prune claim

Two targets are retained:

- upper target: deleting it restores the known one-cut bypass.
- lower target: deleting it lowers the shortest solution and also permits a one-cut win.

The right-side target from `v2` was removed because deletion preserved the current solution and did not create a core bypass.
