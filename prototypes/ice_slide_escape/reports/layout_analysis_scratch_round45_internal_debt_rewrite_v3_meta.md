# Level Analysis: scratch_round45_internal_debt_rewrite_v3_meta

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v3_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_destroy_group_d6_plus, ice_rebound_d4

## Initial State

```text
########@#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 54
- Depth: 54
- Explored states: 15738
- Inputs: down down down down right right down down left up right up left down left left left left up right down right right right down down right down down left left left left left up down right right right right up up up right up up right right right right down right right right
- Events: walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_rebound_d4 walk walk walk walk push_ice ice_boundary_disappear:d5 walk push_ice ice_destroy_group_d6_plus:len5 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=48, push_ice=6, ice_stop_short:d1=1, ice_rebound_d4=3, ice_boundary_disappear:d5=1, ice_destroy_group_d6_plus:len5=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####........#####
.....*...*...#....
#####.###@...#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####....I...#####
.....*...+...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####....I@..#####
.....*...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.I..@...#####
.....*...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 18: left

- Legal: true
- Events: push_ice, ice_boundary_disappear:d5

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.I......#####
.....*@..G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.I......#####
.....+...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 20: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####@I......#####
.....G...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.@...........
.....G...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 35: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.............
.....G...G...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####@.......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.............
.....*...G...#....
#####.###....#####
#####.###....#####
#####@###I...#####
#####........#####
##########.#######
```

### Step 41: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.............
.....*...G...#....
#####.###....#####
#####.###....#####
#####.###I...#####
#####....@...#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.............
.....*...*...#....
#####.###....#####
#####.###....#####
#####.###@...#####
#####........#####
##########.#######
```


## Graph Facts

- Status: complete
- Reachable states: 17754
- Legal transitions: 49432
- Event-only illegal transitions: 829
- Winning states: 1
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 17754
- Legal transitions: 49432
- Budget: maxStates=200000
- Compressed regions: 395
- Bidirectional transitions: 48250
- Commitment transitions: 1182
- Winning regions: 1
- Initial region: r0, states=38, dist=6, internalBidirectional=100, commitments=8, viableCommitments=2, deadCommitments=6, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r8@10 -> r19@13 -> r40@18 -> r55@20 -> r227@35 -> r246@41
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=334, edges=870, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=38, dist=4, out=8, winOut=2, deadOut=6
- SCC path: s0@0 -> s7@10 -> s8@13 -> s170@18 -> s172@20

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 38 | 8 | 2 | 6 | 0 | 0 | s7 | no |
| s7 | 10 | 3 | 38 | 7 | 2 | 5 | 1 | 1 | s8 | no |
| s8 | 13 | 2 | 74 | 6 | 1 | 5 | 1 | 1 | s170 | yes |
| s170 | 18 | 1 | 92 | 7 | 1 | 6 | 2 | 2 | s172 | yes |
| s172 | 20 | 0 | 214 | 7 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 10 | s7 | 38 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s7 | 10 | 13 | s8 | 38 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s8 | 13 | 18 | s170 | 74 | no | yes | left | push_ice, ice_boundary_disappear:d5 | has_reposition_room |
| s170 | 18 | 20 | s172 | 92 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=17754, regions=395, solution commitments=6
- Opening: commitments=8, viable=2, dead=6, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=0/6
- Endgame tail: 13 step(s) after first entering a winning region
- Reading hints: 13 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 9 | r0 | r8 | 6 | 2 | 6 | 2 | multiple optimal choices |
| 12 | r8 | r19 | 5 | 2 | 5 | 2 | multiple optimal choices |
| 17 | r19 | r40 | 4 | 2 | 3 | 2 | multiple optimal choices |
| 19 | r40 | r55 | 3 | 2 | 4 | 2 | multiple optimal choices |
| 34 | r55 | r227 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 40 | r227 | r246 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 38 | 8 | 2 | 6 | 2 | 2 | r8 | no | no | no |
| r8 | 10 | 5 | 38 | 7 | 2 | 5 | 2 | 2 | r19 | no | no | no |
| r19 | 13 | 4 | 37 | 5 | 2 | 3 | 2 | 2 | r40 | no | no | no |
| r40 | 18 | 3 | 46 | 6 | 2 | 4 | 2 | 2 | r55 | no | no | no |
| r55 | 20 | 2 | 56 | 4 | 2 | 2 | 2 | 2 | r227 | no | no | no |
| r227 | 35 | 1 | 51 | 5 | 2 | 3 | 1 | 1 | r246 | no | no | yes |
| r246 | 41 | 0 | 51 | 6 | 2 | 4 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r0 | no | 6 | 8 | 2 | 6 | 2 | 2 | r8 | yes | yes | yes | yes | no | no | walk |
| 10 | up | r8 | yes | 5 | 7 | 2 | 5 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 11 | right | r8 | no | 5 | 7 | 2 | 5 | 2 | 2 | r8 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r8 | no | 5 | 7 | 2 | 5 | 2 | 2 | r19 | yes | yes | yes | yes | no | no | walk |
| 13 | left | r19 | yes | 4 | 5 | 2 | 3 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | down | r19 | no | 4 | 5 | 2 | 3 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r19 | no | 4 | 5 | 2 | 3 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r19 | no | 4 | 5 | 2 | 3 | 2 | 2 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r19 | no | 4 | 5 | 2 | 3 | 2 | 2 | r40 | yes | yes | yes | yes | no | no | walk |
| 18 | left | r40 | yes | 3 | 6 | 2 | 4 | 2 | 2 | r40 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d5 |
| 19 | up | r40 | no | 3 | 6 | 2 | 4 | 2 | 2 | r55 | yes | yes | yes | yes | no | no | walk |
| 20 | right | r55 | yes | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group |
| 21 | down | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r55 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r55 | no | 2 | 4 | 2 | 2 | 2 | 2 | r227 | yes | yes | yes | yes | no | no | walk |
| 35 | up | r227 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r227 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 36 | down | r227 | no | 1 | 5 | 2 | 3 | 1 | 1 | r227 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r227 | no | 1 | 5 | 2 | 3 | 1 | 1 | r227 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r227 | no | 1 | 5 | 2 | 3 | 1 | 1 | r227 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r227 | no | 1 | 5 | 2 | 3 | 1 | 1 | r227 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r227 | no | 1 | 5 | 2 | 3 | 1 | 1 | r246 | yes | yes | yes | yes | no | yes | walk |
| 41 | up | r246 | yes | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 42 | up | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | up | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | up | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | up | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | down | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | r246 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | right | r246 | no | 0 | 6 | 2 | 4 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### ice_destroy_group_d6_plus

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)

### ice_rebound_d4

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
