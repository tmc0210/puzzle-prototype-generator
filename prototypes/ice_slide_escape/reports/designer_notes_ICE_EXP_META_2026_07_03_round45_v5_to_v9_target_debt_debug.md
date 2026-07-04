# Designer Notes: round45 v5-v9 target-debt side-pocket debug

```yaml
date: 2026-07-03
status: review_probe_created
main_probe: ICE_EXP_META_2026_07_03_round45_side_pocket_debt_v8_downlock
purpose: preserve v4 internal-d6 meta grammar while removing base side-pocket bypasses
```

## Starting Point

`scratch_v4` produced the desired meta grammar:

- C=[10,10] returns from the old bottom exit.
- It first pushes the right target left, leaving the right target in debt.
- It opens the left firing face with a side ice d4 rebound.
- It fires the left target right as an internal d6, destroying the right wall
  pair and opening D=[22,5].
- It refills both targets from the lower room.

The failure was base: A=[0,5] could push ordinary side ice downward and walk to
B without touching the target-debt chain.

## v5 Anchor

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v5_anchor_layout.txt
```

Change: add an occupied lower anchor at [4,9].

Result:

- meta preserved
- base still bypassed by pushing the [5,7] ice downward

Lesson: one anchor only moves the bypass from x4 to x5.

## v6 Double Anchor

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v6_double_anchor_layout.txt
```

Change: add occupied anchors at [4,9] and [5,9].

Result:

- base A->B solved, cost 29
- meta C->D solved, cost 47
- base no longer has the short side-pocket bypass
- base returned route became d3 + short-stop rather than d3 + d4
- strict reachable exposure still failed: A can misuse lower resources to reach
  a non-winning d6 state

Lesson: double anchors fix the visible bypass and preserve meta, but do not
alone enforce the base knowledge window.

## v7 Order Gate

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v7_order_gate_layout.txt
```

Hypothesis: make the right refill ice block the passage to the left refill, so
base and meta must repay right debt before left debt.

Result:

- meta still solved
- base collapsed to a cost-15 bypass because opening row7 let A push side ice
  horizontally through the new corridor

Lesson: using row7 as an order gate creates exactly the kind of upper side
passage A can exploit.

## v8 Downlock

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v8_downlock_layout.txt
```

Change from v6: add a wall at [9,9], so pushing the right refill ice downward
does not directly open the lower row.

Result:

- base A->B solved, cost 29
- base winning-only gate passed:
  - required `ice_destroyed_d3` and `ice_stop_short`
  - no winning path with `ice_destroy_group_d6_plus` or `ice_pass_through_d5`
- meta C->D solved, cost 47
- meta required d6 passed
- strict base reachable d6 still failed

Witness interpretation:

- A can still push the right refill ice down to [9,8], then horizontally consume
  it as a route opener.
- This is non-winning, but it appears in the complete reachable graph.

Current use: review probe, not clean submission unless the brief accepts a
winning-path-only base exposure reading.

## v9 Top Downlock

File:

```text
prototypes/ice_slide_escape/reports/ICE_EXP_META_2026_07_03_round45_side_pocket_debt_scratch_v9_top_downlock_layout.txt
```

Hypothesis: wall [9,6] to prevent the player standing above the right refill
ice and pushing it down.

Result:

- base unsolved
- meta unsolved

Reason: [9,6] is also required as the travel cell for the right refill ice when
pushed upward.

Lesson: the needed lock must restrict player access or wrong direction without
blocking the ice's upward slide; with current primitives, that is not a simple
single-wall repair.

## Current Assessment

`v8_downlock` is the strongest artifact in this family:

- It implements the requested target-debt chain in both routes.
- It keeps the late d6 action internal to the shared chamber.
- It avoids the v7 upper-corridor bypass.
- It remains blocked by strict base forbidden-if-seen-anywhere exposure.

If independent review treats the strict reachable d6 as blocking, this family
should be held or redesigned with a different gate topology.
