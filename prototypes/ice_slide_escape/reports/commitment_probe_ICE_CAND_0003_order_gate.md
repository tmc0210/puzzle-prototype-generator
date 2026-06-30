# Commitment Probe: ICE_CAND_0003 Order Gate

Experiment: `ICE_EXP_002_d4_pre_d5_capstone`

Purpose: local counterfactual evidence for the order-gate claim. This report
summarizes push-related commitments from the initial reversible walk-region and
from the region after the first winning d4 rebound. It is evidence for routing
and review, not a quality verdict.

Solve instance:

```yaml
player_start: [1, 8]
player_goal: [4, 8]
win_condition: ice_slide_escape_explicit_goal
```

Layout:

```text
##########
#######..#
#####.#.I#
#....G...#
#.###.##.#
#.###.##G#
#.###I##.#
#.....####
#....#####
```

## Initial Region

```yaml
walk_region_states: 29
push_related_commitments: 5
win_continuing_commitments: 1
```

Commitments:

```yaml
- id: I1
  walk_to_push: [up, right, right, right, right]
  push: up
  events: [push_ice, ice_rebound_d4]
  win_reachable_after: false
  reading: >
    Pushes the lower A ice first. It d4-rebounds onto the corridor target at
    [5,3], sealing the route to the right-side B ice before that target can be
    solved.

- id: I2
  walk_to_push: [up, up, up, up, up, right, right, right, right, down, down]
  push: down
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: >
    Moves the lower A ice down instead of using its d4 lane.

- id: I3
  walk_to_push: [up, up, up, up, up, right, right, right, right, right, right, up]
  push: right
  events: [push_ice_failed]
  win_reachable_after: false
  reading: >
    Attempts to push the B ice sideways into an immediate obstacle.

- id: I4
  walk_to_push: [up, up, up, up, up, right, right, right, right, right, right, right]
  push: up
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: >
    Moves the B ice upward instead of down the d4 lane.

- id: I5
  walk_to_push: [up, up, up, up, up, right, right, right, right, right, right, up, up, right]
  push: down
  events: [push_ice, ice_rebound_d4]
  win_reachable_after: true
  remaining_cost: 20
  reading: >
    Correct first commitment. Pushes the right-side B ice down so it d4-rebounds
    onto the right target at [8,5] while the central corridor target remains
    open for returning to the A ice.
```

## After First d4 Region

Prefix to this region:

```yaml
prefix_inputs:
  - up
  - up
  - up
  - up
  - up
  - right
  - right
  - right
  - right
  - right
  - right
  - up
  - up
  - right
  - down
prefix_events:
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - walk
  - push_ice
  - ice_rebound_d4
```

```yaml
walk_region_states: 28
push_related_commitments: 3
win_continuing_commitments: 1
```

Commitments:

```yaml
- id: A1
  walk_to_push: [down, down]
  push: down
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: >
    Moves the B target ice off its target.

- id: A2
  walk_to_push: [down, left, left, left, down, down]
  push: down
  events: [push_ice, ice_stop_short:d1]
  win_reachable_after: false
  reading: >
    Moves the lower A ice down rather than into the corridor target.

- id: A3
  walk_to_push:
    - down
    - left
    - left
    - left
    - left
    - left
    - left
    - left
    - down
    - down
    - down
    - down
    - right
    - right
    - right
    - right
  push: up
  events: [push_ice, ice_rebound_d4]
  win_reachable_after: true
  remaining_cost: 3
  reading: >
    Correct second commitment. Pushes the lower A ice up so it d4-rebounds onto
    the central corridor target at [5,3]; all targets are now covered and the
    player can reach [4,8].
```

Evidence boundary:

- This supports the limited claim that the puzzle's central choice is order:
  B must be solved before A, because A-first d4 seals the route to B.
- It does not by itself prove high-difficulty taste. The full graph remains a
  `one_win_continuation_per_scc` after the correct commitments, and the returned solution
  contains substantial walking.
- Hard scope cleanliness is supplied separately by
  `start_comparison_ICE_CAND_0003_start_refine.md`, where all checked starts
  have no report-only d5, d6+, restart, or boundary hits.

