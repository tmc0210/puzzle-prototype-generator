# Fresh / Revision Claim: RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v2

- Slot: L11, movable B/S anchor, no P/L anchor.
- Status: revision after `RA_CURR_2026_07_05_L11_BAR_DOUBLE_CUT_v1` failed count probes.
- Freshness: this keeps the compact bar idea but changes the win structure. The added upper target is not filler: without it, v1 had a one-cut bypass where the first cut crate re-entered S side and covered the lower target as sticky.

## Intended causal chain

1. Push the starting crate into S side so it becomes sticky and merges with the two-cell bar.
2. Push the merged three-cell sticky bar downward as a rigid structure; this parks the right sticky cell on the right target and creates the geometry for later cuts.
3. Push the movable B/S anchor right twice. Each boundary shift cuts one sticky cell back into a normal crate.
4. Use the first cut crate as a movable blocker/passage piece and push it up onto the upper target.
5. Use the second cut crate separately, pushing it down onto the lower target while the remaining sticky cell continues to cover the right target.

## Reviewer focus

- Confirm every win needs at least two `anchor_boundary_shift:box_sticky` events and at least two `sticky_to_box` events.
- Confirm every win still needs the initial `box_to_sticky`, `sticky_merge`, and `move_sticky_rigid`.
- Confirm the added upper target is goal-valid: deleting it should admit the known one-cut bypass rather than preserving the intended challenge.
- Critic should attack whether the first push remains too forced and whether the double cut now creates a real separated-object use rather than an optional longer route.
