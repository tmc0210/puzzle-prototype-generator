# Commitment Probe: ICE_CAND_0002 After First d4

Experiment: `ICE_EXP_002_d4_pre_d5_capstone`

Purpose: local counterfactual evidence for the review-loop defense of
`ICE_CAND_0002`. This is not a new quality verdict. It checks the reversible
walk-region after the first d4 rebound and enumerates the next ice-push
commitments available from that region.

Solve instance:

```yaml
player_start: [1, 9]
player_goal: [4, 0]
prefix_inputs: [up, up, right]
prefix_events:
  - walk
  - walk
  - push_ice
  - ice_rebound_d4
```

Layout:

```text
####.####
####..###
####.I###
####..###
####..###
####.G###
####..###
#.I..G.##
#.##.####
#.#######
```

Probe summary:

```yaml
walk_region_after_prefix:
  states: 19
push_related_commitments: 5
winning_commitments: 1
```

Commitments from the post-prefix walk-region:

```yaml
- id: P1
  walk_to_push: [right, right]
  push: right
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: moves the first d4 target ice away from [5,7]

- id: P2
  walk_to_push: [right, right, up, right]
  push: down
  events: [push_ice_failed]
  win_reachable_after: false
  reading: failed attempt to push the already placed target ice

- id: P3
  walk_to_push: [right, right, up, up, up, up, up]
  push: right
  events: [push_ice_failed]
  win_reachable_after: false
  reading: failed attempt to push the upper ice from the wrong side

- id: P4
  walk_to_push: [right, right, up, up, up, up, right]
  push: up
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: moves the upper ice in the wrong direction and breaks target coverage

- id: P5
  walk_to_push: [right, right, up, up, up, up, up, up, right]
  push: down
  events: [push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4]
  win_reachable_after: true
  remaining_cost: 3
  reading: uses the first d4 target ice at [5,7] as the obstacle for the second d4 rebound
```

Evidence boundary:

- This supports the limited claim that, after the first d4 rebound, only the
  commitment that preserves and uses the first target ice as a later obstacle
  can continue to a win.
- It does not remove the reachable report-only caveat from the full graph:
  `ice_pass_through_d5:len1`, `ice_pass_through_d5:len2`, and
  `ice_boundary_disappear_after_group` remain report-only hits in the start
  comparison evidence.
- It does not prove a meaningful meta-interface instance.

