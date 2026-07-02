# Level Analysis: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round28_fresh_mirror_debt_chain_v1_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: ice_rebound_d4

## Initial State

```text
############################
############################
############################
############################
#...########################
@.#.*....#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

## Shortest Solution

- Found: yes
- Cost: 47
- Depth: 47
- Explored states: 1432
- Inputs: right up right right down right right right down right right up left down right right right up right right right down right right up left down right right right up right right right down right right up left down right right right up right right right
- Events: walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk
- Event counts: walk=41, push_ice=6, ice_rebound_d4=6

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#@*....#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.+..I.#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

### Step 13: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#.G..I@#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.*..@.#.*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

### Step 19: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#.*....#@*....#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.*....#.+..I.#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

### Step 26: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#.*....#.G..I@#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.*....#.*..@.#.*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

### Step 32: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#.*....#.*....#@*....#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.*....#.*....#.+..I.#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

### Step 39: left

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
############################
############################
############################
############################
#...########################
..#.*....#.*....#.G..I@#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```

After:

```text
############################
############################
############################
############################
#...########################
..#.*....#.*....#.*..@.#....
######.....##.....##.....###
############################
############################
############################
############################
############################
############################
############################
########################...#
....#....*.#....*.#....*.#..
###.....##.....##.....######
############################
############################
############################
############################
############################
```


## Graph Facts

- Status: complete
- Reachable states: 1717
- Legal transitions: 3740
- Event-only illegal transitions: 140
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1717
- Legal transitions: 3740
- Budget: maxStates=100000
- Compressed regions: 85
- Bidirectional transitions: 3614
- Commitment transitions: 126
- Winning regions: 1
- Initial region: r0, states=6, dist=6, internalBidirectional=10, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@6 -> r3@13 -> r9@19 -> r20@26 -> r39@32 -> r65@39
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=85, edges=126, winReachable=10, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=1/6, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/6, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=6, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@6 -> s43@13 -> s44@19 -> s54@26 -> s55@32 -> s57@39

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 6 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 6 | 5 | 16 | 3 | 2 | 1 | 1 | 1 | s43 | no |
| s43 | 13 | 4 | 10 | 2 | 1 | 1 | 1 | 1 | s44 | yes |
| s44 | 19 | 3 | 20 | 4 | 2 | 2 | 2 | 2 | s54 | no |
| s54 | 26 | 2 | 10 | 2 | 1 | 1 | 1 | 1 | s55 | yes |
| s55 | 32 | 1 | 23 | 3 | 1 | 2 | 2 | 2 | s57 | yes |
| s57 | 39 | 0 | 13 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 6 | s1 | 6 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s1 | 6 | 13 | s43 | 16 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s43 | 13 | 19 | s44 | 10 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s44 | 19 | 26 | s54 | 20 | no | no | left | push_ice, ice_rebound_d4 | has_reposition_room |
| s54 | 26 | 32 | s55 | 10 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s55 | 32 | 39 | s57 | 23 | no | yes | left | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1717, regions=85, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/6, optimal prefix=1/6, forced viable commitments=4/6
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 5 | r0 | r1 | 6 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r3 | 5 | 2 | 1 | 2 | multiple optimal choices |
| 18 | r3 | r9 | 4 | 1 | 1 | 1 | forced optimal |
| 25 | r9 | r20 | 3 | 2 | 2 | 2 | multiple optimal choices |
| 31 | r20 | r39 | 2 | 1 | 1 | 1 | forced optimal |
| 38 | r39 | r65 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 6 | 5 | 16 | 3 | 2 | 1 | 2 | 2 | r3 | no | no | no |
| r3 | 13 | 4 | 10 | 2 | 1 | 1 | 1 | 1 | r9 | no | yes | yes |
| r9 | 19 | 3 | 20 | 4 | 2 | 2 | 2 | 2 | r20 | no | no | no |
| r20 | 26 | 2 | 10 | 2 | 1 | 1 | 1 | 1 | r39 | no | yes | yes |
| r39 | 32 | 1 | 23 | 3 | 1 | 2 | 1 | 1 | r65 | no | yes | yes |
| r65 | 39 | 0 | 13 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 6 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 6 | right | r1 | yes | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 7 | right | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r1 | no | 5 | 3 | 2 | 1 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 13 | left | r3 | yes | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 14 | down | r3 | no | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r3 | no | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r3 | no | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r3 | no | 4 | 2 | 1 | 1 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r3 | no | 4 | 2 | 1 | 1 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 19 | right | r9 | yes | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 20 | right | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r9 | no | 3 | 4 | 2 | 2 | 2 | 2 | r20 | yes | yes | yes | yes | no | no | walk |
| 26 | left | r20 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | down | r20 | no | 2 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r20 | no | 2 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | right | r20 | no | 2 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r20 | no | 2 | 2 | 1 | 1 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | up | r20 | no | 2 | 2 | 1 | 1 | 1 | 1 | r39 | yes | yes | yes | yes | yes | yes | walk |
| 32 | right | r39 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 33 | right | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r39 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r39 | no | 1 | 3 | 1 | 2 | 1 | 1 | r65 | yes | yes | yes | yes | yes | yes | walk |
| 39 | left | r65 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 40 | down | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | up | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | r65 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r65 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

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
