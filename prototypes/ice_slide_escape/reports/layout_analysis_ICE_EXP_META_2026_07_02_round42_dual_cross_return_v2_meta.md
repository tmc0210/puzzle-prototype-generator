# Level Analysis: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v2_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
....#.*....#..#.*....#.@
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 3316
- Inputs: left up left left left left left left down down down left down down right up up up left left left up left up left left left left left left down down down left down down right up up up left left left up left left left
- Events: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk
- Event counts: walk=42, push_ice=5, ice_rebound_d4=4, ice_destroyed_d3=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########################
########################
########################
########################
#######..########..#####
######...I...###@......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

After:

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
....#.*....#..#.+....#..
###....######....#######
#####..########..#######
#####..########.I#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

### Step 16: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
....#.*....#..#.G....#..
###....######....#######
#####..########..#######
#####..########.I#######
#####..########.@#######
#####.#########.########
#####..########..#######
########################
```

After:

```text
########################
########################
########################
########################
#######..########..#####
######...I...###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########.@#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

### Step 27: left

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
########################
########################
########################
########################
#######..########..#####
######...I@..###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

After:

```text
########################
########################
########################
########################
#######..########..#####
######...@...###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

### Step 31: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########################
########################
########################
########################
#######..########..#####
######@......###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

After:

```text
########################
########################
########################
########################
#######..########..#####
######.......###.......#
....#.+....#..#.*....#..
###....######....#######
#####..########..#######
#####.I########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```

### Step 38: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
########################
########################
########################
########################
#######..########..#####
######.......###.......#
....#.G....#..#.*....#..
###....######....#######
#####..########..#######
#####.I########..#######
#####.@########..#######
#####.#########.########
#####..########..#######
########################
```

After:

```text
########################
########################
########################
########################
#######..########..#####
######.......###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####.@########..#######
#####..########..#######
#####.#########.########
#####..########..#######
########################
```


## Graph Facts

- Status: complete
- Reachable states: 7119
- Legal transitions: 17612
- Event-only illegal transitions: 412
- Winning states: 2
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 7119
- Legal transitions: 17612
- Budget: maxStates=120000
- Compressed regions: 156
- Bidirectional transitions: 17274
- Commitment transitions: 338
- Winning regions: 2
- Initial region: r0, states=15, dist=4, internalBidirectional=36, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@9 -> r4@16 -> r24@27 -> r35@31 -> r66@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=91, edges=178, winReachable=9, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=2, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=129, dist=1, out=7, winOut=2, deadOut=5
- SCC path: s0@0 -> s39@27

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 129 | 7 | 2 | 5 | 0 | 0 | s39 | no |
| s39 | 27 | 0 | 558 | 8 | 0 | 0 | 5 | 5 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 27 | s39 | 129 | no | no | left | push_ice, ice_destroyed_d3 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=7119, regions=156, solution commitments=5
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/5, optimal prefix=1/5, forced viable commitments=1/5
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 15 | r2 | r4 | 3 | 3 | 2 | 2 | multiple optimal choices |
| 26 | r4 | r24 | 2 | 3 | 2 | 1 | multiple viable choices |
| 30 | r24 | r35 | 2 | 2 | 2 | 1 | forced optimal |
| 37 | r35 | r66 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 15 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 9 | 3 | 43 | 5 | 3 | 2 | 2 | 2 | r4 | no | no | no |
| r4 | 16 | 2 | 28 | 5 | 3 | 2 | 1 | 1 | r24 | no | no | no |
| r24 | 27 | 2 | 29 | 4 | 2 | 2 | 1 | 1 | r35 | no | no | yes |
| r35 | 31 | 1 | 47 | 4 | 2 | 2 | 1 | 1 | r66 | no | no | yes |
| r66 | 38 | 0 | 18 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 9 | down | r2 | yes | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 10 | down | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r2 | no | 3 | 5 | 3 | 2 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 16 | up | r4 | yes | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | up | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r4 | no | 2 | 5 | 3 | 2 | 1 | 1 | r24 | yes | yes | no | no | no | no | walk |
| 27 | left | r24 | yes | 2 | 4 | 2 | 2 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 28 | left | r24 | no | 2 | 4 | 2 | 2 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r24 | no | 2 | 4 | 2 | 2 | 1 | 1 | r24 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r24 | no | 2 | 4 | 2 | 2 | 1 | 1 | r35 | yes | yes | yes | yes | no | yes | walk |
| 31 | down | r35 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 32 | down | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r35 | no | 1 | 4 | 2 | 2 | 1 | 1 | r66 | yes | yes | yes | yes | no | yes | walk |
| 38 | up | r66 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 39 | up | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | up | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | r66 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r66 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

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
