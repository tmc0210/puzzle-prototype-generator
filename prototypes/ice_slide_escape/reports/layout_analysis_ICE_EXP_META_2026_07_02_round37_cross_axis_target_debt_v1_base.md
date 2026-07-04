# Level Analysis: ICE_EXP_META_2026_07_02_round37_cross_axis_target_debt_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round37_cross_axis_target_debt_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########.#######
###########.#######
###########.#######
@...###......######
###.*....##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

## Shortest Solution

- Found: yes
- Cost: 30
- Depth: 30
- Explored states: 1501
- Inputs: right right right down right down right right right right up left up right right right right down right right right down right right up left down right right right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=26, push_ice=4, ice_rebound_d4=4

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###@*....##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.+..I.##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.G..I@##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*..@.##.*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

### Step 19: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##@*....##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.+..I.##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.G..I@##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```

After:

```text
###########.#######
###########.#######
###########.#######
....###......######
###.*....##.*..@.##
####.....###.#.....
###########...#####
############..#####
############..#####
#############.#####
###################
```


## Graph Facts

- Status: complete
- Reachable states: 2770
- Legal transitions: 6543
- Event-only illegal transitions: 162
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2770
- Legal transitions: 6543
- Budget: maxStates=300000
- Compressed regions: 94
- Bidirectional transitions: 6396
- Commitment transitions: 147
- Winning regions: 1
- Initial region: r0, states=5, dist=4, internalBidirectional=8, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r6@12 -> r22@19 -> r54@26
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=94, edges=147, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s6@12 -> s35@19 -> s37@26

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 3 | 24 | 6 | 2 | 4 | 1 | 1 | s6 | no |
| s6 | 12 | 2 | 19 | 3 | 1 | 2 | 1 | 1 | s35 | yes |
| s35 | 19 | 1 | 37 | 3 | 1 | 2 | 2 | 2 | s37 | yes |
| s37 | 26 | 0 | 9 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 5 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 5 | 12 | s6 | 24 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s6 | 12 | 19 | s35 | 19 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s35 | 19 | 26 | s37 | 37 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2770, regions=94, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=3/4
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 11 | r1 | r6 | 3 | 2 | 4 | 2 | multiple optimal choices |
| 18 | r6 | r22 | 2 | 1 | 2 | 1 | forced optimal |
| 25 | r22 | r54 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 3 | 24 | 6 | 2 | 4 | 2 | 2 | r6 | no | no | no |
| r6 | 12 | 2 | 19 | 3 | 1 | 2 | 1 | 1 | r22 | no | yes | yes |
| r22 | 19 | 1 | 37 | 3 | 1 | 2 | 1 | 1 | r54 | no | yes | yes |
| r54 | 26 | 0 | 9 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | down | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 6 | 2 | 4 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r6 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | up | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r6 | no | 2 | 3 | 1 | 2 | 1 | 1 | r22 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r22 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | right | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r22 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r22 | no | 1 | 3 | 1 | 2 | 1 | 1 | r54 | yes | yes | yes | yes | yes | yes | walk |
| 26 | left | r54 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r54 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | down | r54 | no | 0 | 1 | 0 | 1 | 0 | 0 | r54 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r54 | no | 0 | 1 | 0 | 1 | 0 | 0 | r54 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r54 | no | 0 | 1 | 0 | 1 | 0 | 0 | r54 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r54 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
