# Level Analysis: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round38_triple_target_reentry_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########.###############
###########.###############
###########.###############
@...###......##......######
###.*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

## Shortest Solution

- Found: yes
- Cost: 44
- Depth: 44
- Explored states: 10380
- Inputs: right right right down right down right right right right up left up right right right right down right right right down right right up left up right right right right down right right right down right right up left down right right right
- Events: walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=38, push_ice=6, ice_rebound_d4=6

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###@*....##.*....##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.+..I.##.*....##.*....##
####.....###.#.....###.....
###########################
```

### Step 12: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.G..I@##.*....##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*..@.##.*....##.*....##
####.....###.#.....###.....
###########################
```

### Step 19: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##@*....##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.+..I.##.*....##
####.....###.#.....###.....
###########################
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.G..I@##.*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*..@.##.*....##
####.....###.#.....###.....
###########################
```

### Step 33: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##@*....##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.+..I.##
####.....###.#.....###.....
###########################
```

### Step 40: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.G..I@##
####.....###.#.....###.....
###########################
```

After:

```text
###########.###############
###########.###############
###########.###############
....###......##......######
###.*....##.*....##.*..@.##
####.....###.#.....###.....
###########################
```


## Graph Facts

- Status: complete
- Reachable states: 25016
- Legal transitions: 59155
- Event-only illegal transitions: 1716
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 25016
- Legal transitions: 59155
- Budget: maxStates=300000
- Compressed regions: 741
- Bidirectional transitions: 57690
- Commitment transitions: 1465
- Winning regions: 1
- Initial region: r0, states=5, dist=6, internalBidirectional=8, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r6@12 -> r21@19 -> r73@26 -> r204@33 -> r409@40
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=741, edges=1465, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=5, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s6@12 -> s105@19 -> s112@26 -> s118@33 -> s120@40

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 5 | 24 | 6 | 2 | 4 | 1 | 1 | s6 | no |
| s6 | 12 | 4 | 19 | 3 | 1 | 2 | 1 | 1 | s105 | yes |
| s105 | 19 | 3 | 36 | 6 | 2 | 4 | 2 | 2 | s112 | no |
| s112 | 26 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | s118 | yes |
| s118 | 33 | 1 | 25 | 3 | 1 | 2 | 2 | 2 | s120 | yes |
| s120 | 40 | 0 | 9 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 5 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 5 | 12 | s6 | 24 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s6 | 12 | 19 | s105 | 19 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s105 | 19 | 26 | s112 | 36 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s112 | 26 | 33 | s118 | 16 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s118 | 33 | 40 | s120 | 25 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=25016, regions=741, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/6, optimal prefix=1/6, forced viable commitments=4/6
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 11 | r1 | r6 | 5 | 2 | 4 | 2 | multiple optimal choices |
| 18 | r6 | r21 | 4 | 1 | 2 | 1 | forced optimal |
| 25 | r21 | r73 | 3 | 2 | 4 | 2 | multiple optimal choices |
| 32 | r73 | r204 | 2 | 1 | 1 | 1 | forced optimal |
| 39 | r204 | r409 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 5 | 24 | 6 | 2 | 4 | 2 | 2 | r6 | no | no | no |
| r6 | 12 | 4 | 19 | 3 | 1 | 2 | 1 | 1 | r21 | no | yes | yes |
| r21 | 19 | 3 | 36 | 6 | 2 | 4 | 2 | 2 | r73 | no | no | no |
| r73 | 26 | 2 | 16 | 2 | 1 | 1 | 1 | 1 | r204 | no | yes | yes |
| r204 | 33 | 1 | 25 | 3 | 1 | 2 | 1 | 1 | r409 | no | yes | yes |
| r409 | 40 | 0 | 9 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r1 | yes | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 6 | down | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 5 | 6 | 2 | 4 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 12 | left | r6 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | up | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r6 | no | 4 | 3 | 1 | 2 | 1 | 1 | r21 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r21 | yes | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | right | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r21 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r21 | no | 3 | 6 | 2 | 4 | 2 | 2 | r73 | yes | yes | yes | yes | no | no | walk |
| 26 | left | r73 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | up | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r73 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r73 | no | 2 | 2 | 1 | 1 | 1 | 1 | r204 | yes | yes | yes | yes | yes | yes | walk |
| 33 | right | r204 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 34 | right | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r204 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | up | r204 | no | 1 | 3 | 1 | 2 | 1 | 1 | r409 | yes | yes | yes | yes | yes | yes | walk |
| 40 | left | r409 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r409 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 41 | down | r409 | no | 0 | 1 | 0 | 1 | 0 | 0 | r409 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r409 | no | 0 | 1 | 0 | 1 | 0 | 0 | r409 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r409 | no | 0 | 1 | 0 | 1 | 0 | 0 | r409 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r409 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
