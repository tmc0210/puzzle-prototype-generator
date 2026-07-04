# Level Analysis: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round42_dual_cross_return_v1_meta
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
######.......###.......#
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
- Explored states: 1750
- Inputs: left up left left left left left left down down down left down down right up up up left left left up left up left left left left left left down down down left down down right up up up left left left up left left left
- Events: walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk
- Event counts: walk=43, push_ice=4, ice_rebound_d4=4

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
######.......###@......#
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
######.......###.......#
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
######.......###.......#
....#.*....#..#.*....#..
###....######....#######
#####..########..#######
#####..########.@#######
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
- Reachable states: 3038
- Legal transitions: 7546
- Event-only illegal transitions: 140
- Winning states: 1
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3038
- Legal transitions: 7546
- Budget: maxStates=120000
- Compressed regions: 63
- Bidirectional transitions: 7434
- Commitment transitions: 112
- Winning regions: 1
- Initial region: r0, states=15, dist=4, internalBidirectional=36, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@9 -> r4@16 -> r20@31 -> r35@38
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=25, edges=40, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=558, dist=0, out=8, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 558 | 8 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=3038, regions=63, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=1/4
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r2 | 4 | 1 | 1 | 1 | forced optimal |
| 15 | r2 | r4 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 30 | r4 | r20 | 2 | 2 | 2 | 1 | forced optimal |
| 37 | r20 | r35 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 15 | 2 | 1 | 1 | 1 | 1 | r2 | no | yes | yes |
| r2 | 9 | 3 | 44 | 4 | 2 | 2 | 2 | 2 | r4 | no | no | no |
| r4 | 16 | 2 | 29 | 4 | 2 | 2 | 1 | 1 | r20 | no | no | yes |
| r20 | 31 | 1 | 47 | 4 | 2 | 2 | 1 | 1 | r35 | no | no | yes |
| r35 | 38 | 0 | 18 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

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
| 9 | down | r2 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 10 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r2 | no | 3 | 4 | 2 | 2 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 16 | up | r4 | yes | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 17 | up | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | left | r4 | no | 2 | 4 | 2 | 2 | 1 | 1 | r20 | yes | yes | yes | yes | no | yes | walk |
| 31 | down | r20 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 32 | down | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | left | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r20 | no | 1 | 4 | 2 | 2 | 1 | 1 | r35 | yes | yes | yes | yes | no | yes | walk |
| 38 | up | r35 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 39 | up | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | up | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | r35 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r35 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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
