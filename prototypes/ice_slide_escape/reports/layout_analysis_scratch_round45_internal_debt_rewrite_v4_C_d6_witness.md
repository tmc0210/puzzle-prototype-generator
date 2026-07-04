# Level Analysis: scratch_round45_internal_debt_rewrite_v4_C_d6_witness

## Summary

- Prototype: ice_slide_escape
- Title: scratch_round45_internal_debt_rewrite_v4_C_d6_witness
- Role: challenge
- Status: candidate
- Support: none
- Win: event_occurs
- Targets: none

## Initial State

```text
########@#########
########.#########
########.#########
########.#########
#####.##..########
.....*...*...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

## Shortest Solution

- Found: yes
- Cost: 43
- Depth: 43
- Explored states: 2074
- Inputs: down down down down down right down down right down down left left left left left up down right right right right right up up left down right down left up up up up left left left left down down down down right
- Events: walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk push_ice ice_boundary_disappear:d5 push_ice ice_destroyed_d3 walk walk walk push_ice ice_destroy_group_d6_plus:len5 ice_boundary_disappear_after_group
- Event counts: walk=36, push_ice=7, ice_destroyed_d3=2, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1, ice_stop_short:d1=1, ice_rebound_d4=1, ice_boundary_disappear:d5=1, ice_destroy_group_d6_plus:len5=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*..@*...#....
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
#####.##..########
.....*...+...#....
#####.###....#####
#####.###....#####
#####I###I...#####
#####........#####
##########.#######
```

### Step 17: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...G...#....
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
#####.##..########
.....*...G...#....
#####I###....#####
#####.###....#####
#####@###I...#####
#####........#####
##########.#######
```

### Step 27: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...G...#....
#####I###....#####
#####.###@...#####
#####.###I...#####
#####........#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...G...#....
#####I###....#####
#####.###....#####
#####.###@...#####
#####....I...#####
##########.#######
```

### Step 30: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...G...#....
#####I###....#####
#####.###....#####
#####.###....#####
#####....I@..#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*...G...#....
#####I###....#####
#####.###....#####
#####.###....#####
#####.I..@...#####
##########.#######
```

### Step 38: left

- Legal: true
- Events: push_ice, ice_boundary_disappear:d5

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....*@..G...#....
#####I###....#####
#####.###....#####
#####.###....#####
#####.I......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....+...G...#....
#####I###....#####
#####.###....#####
#####.###....#####
#####.I......#####
##########.#######
```

### Step 39: down

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....+...G...#....
#####I###....#####
#####.###....#####
#####.###....#####
#####.I......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....G...G...#....
#####@###....#####
#####.###....#####
#####.###....#####
#####.I......#####
##########.#######
```

### Step 43: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group

Before:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....G...G...#....
#####.###....#####
#####.###....#####
#####.###....#####
#####@I......#####
##########.#######
```

After:

```text
########.#########
########.#########
########.#########
########.#########
#####.##..########
.....G...G...#....
#####.###....#####
#####.###....#####
#####.###....#####
#####.@...........
##########.#######
```


## Graph Facts

- Status: complete
- Reachable states: 2449
- Legal transitions: 6421
- Event-only illegal transitions: 99
- Winning states: 0 (state-win count only; event wins are checked by solver and bypass probes)
- Budget: maxStates=200000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2449
- Legal transitions: 6421
- Budget: maxStates=200000
- Compressed regions: 67
- Bidirectional transitions: 6304
- Commitment transitions: 117
- Winning regions: 0
- Initial region: r0, states=9, dist=n/a, internalBidirectional=16, commitments=3, viableCommitments=0, deadCommitments=3, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0 -> r1@6 -> r15@17 -> r35@27 -> r39@30 -> r58@38 -> r61@39 -> r64@43
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=65, edges=111, winReachable=0, winning=0, winSubgraph=no_win_path
- Solution irreversible path: steps=7, forcedWinPrefix=0/7, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/7, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=9, dist=n/a, out=3, winOut=0, deadOut=3
- SCC path: s0@0 -> s4@6 -> s5@17 -> s6@27 -> s7@30 -> s12@38 -> s33@39 -> s34@43

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | n/a | 9 | 3 | 0 | 3 | 0 | 0 | s4 | no |
| s4 | 6 | n/a | 33 | 4 | 0 | 4 | 1 | 0 | s5 | no |
| s5 | 17 | n/a | 35 | 3 | 0 | 3 | 1 | 0 | s6 | no |
| s6 | 27 | n/a | 29 | 2 | 0 | 2 | 1 | 0 | s7 | no |
| s7 | 30 | n/a | 32 | 2 | 0 | 2 | 1 | 0 | s12 | no |
| s12 | 38 | n/a | 39 | 2 | 0 | 2 | 2 | 0 | s33 | no |
| s33 | 39 | n/a | 43 | 2 | 0 | 2 | 3 | 0 | s34 | no |
| s34 | 43 | n/a | 49 | 0 | 0 | 0 | 1 | 0 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s4 | 9 | no | no | right | push_ice, ice_destroyed_d3 | has_reposition_room |
| s4 | 6 | 17 | s5 | 33 | no | no | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |
| s5 | 17 | 27 | s6 | 35 | no | no | down | push_ice, ice_stop_short:d1 | has_reposition_room |
| s6 | 27 | 30 | s7 | 29 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s7 | 30 | 38 | s12 | 32 | no | no | left | push_ice, ice_boundary_disappear:d5 | has_reposition_room |
| s12 | 38 | 39 | s33 | 39 | yes | no | down | push_ice, ice_destroyed_d3 | scripted_same_state_handoff |
| s33 | 39 | 43 | s34 | 43 | no | no | right | push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2449, regions=67, solution commitments=7
- Opening: commitments=3, viable=0, dead=3, optimal=0
- Win-continuation prefix: viable prefix=0/7, optimal prefix=0/7, forced viable commitments=0/7
- Endgame tail: n/a
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | n/a | 0 | 3 | 0 | only dead commitments |
| 16 | r1 | r15 | n/a | 0 | 4 | 0 | only dead commitments |
| 26 | r15 | r35 | n/a | 0 | 3 | 0 | only dead commitments |
| 29 | r35 | r39 | n/a | 0 | 2 | 0 | only dead commitments |
| 37 | r39 | r58 | n/a | 0 | 2 | 0 | only dead commitments |
| 38 | r58 | r61 | n/a | 0 | 2 | 0 | only dead commitments |
| 42 | r61 | r64 | n/a | 0 | 2 | 0 | only dead commitments |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | n/a | 9 | 3 | 0 | 3 | 0 | 0 | r1 | no | no | no |
| r1 | 6 | n/a | 33 | 4 | 0 | 4 | 0 | 0 | r15 | no | no | no |
| r15 | 17 | n/a | 35 | 3 | 0 | 3 | 0 | 0 | r35 | no | no | no |
| r35 | 27 | n/a | 29 | 2 | 0 | 2 | 0 | 0 | r39 | no | no | no |
| r39 | 30 | n/a | 32 | 2 | 0 | 2 | 0 | 0 | r58 | no | no | no |
| r58 | 38 | n/a | 39 | 2 | 0 | 2 | 0 | 0 | r61 | no | no | no |
| r61 | 39 | n/a | 43 | 2 | 0 | 2 | 0 | 0 | r64 | no | no | no |
| r64 | 43 | n/a | 49 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | n/a | 3 | 0 | 3 | 0 | 0 | r1 | yes | no | no | no | no | no | walk |
| 6 | right | r1 | yes | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 7 | down | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r1 | no | n/a | 4 | 0 | 4 | 0 | 0 | r15 | yes | no | no | no | no | no | walk |
| 17 | up | r15 | yes | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 18 | down | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r15 | no | n/a | 3 | 0 | 3 | 0 | 0 | r35 | yes | no | no | no | no | no | walk |
| 27 | down | r35 | yes | n/a | 2 | 0 | 2 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 28 | right | r35 | no | n/a | 2 | 0 | 2 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r35 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | yes | no | no | no | no | no | walk |
| 30 | left | r39 | yes | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 31 | up | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | up | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | up | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | left | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | left | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | left | r39 | no | n/a | 2 | 0 | 2 | 0 | 0 | r58 | yes | no | no | no | no | no | walk |
| 38 | left | r58 | yes | n/a | 2 | 0 | 2 | 0 | 0 | r61 | yes | no | no | no | no | no | push_ice, ice_boundary_disappear:d5 |
| 39 | down | r61 | yes | n/a | 2 | 0 | 2 | 0 | 0 | r61 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 40 | down | r61 | no | n/a | 2 | 0 | 2 | 0 | 0 | r61 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r61 | no | n/a | 2 | 0 | 2 | 0 | 0 | r61 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r61 | no | n/a | 2 | 0 | 2 | 0 | 0 | r64 | yes | no | no | no | no | no | walk |
| 43 | right | r64 | yes | n/a | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len5, ice_boundary_disappear_after_group |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
