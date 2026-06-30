# Level Analysis: ICE_CAND_0010_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0010_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##I.....I@
...#...........
...####........
##############.
##############.
##############.
##############.
```

## Shortest Solution

- Found: yes
- Cost: 63
- Depth: 63
- Explored states: 4536
- Inputs: down left left left left left left left up down left left left up up up left up up right down up up up up up left down up right right right right right right right right right right right down down down down down down down down left left left left left left left left left left left left down left left
- Events: walk walk walk walk walk walk walk walk push_ice ice_destroyed_d3 walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len5 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=59, push_ice=4, ice_destroyed_d3=1, ice_rebound_d4=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len5=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: up

- Legal: true
- Events: push_ice, ice_destroyed_d3

Before:

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##I.....I.
...#...@.......
...####........
##############.
##############.
##############.
##############.
```

After:

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##@.....I.
...#...........
...####........
##############.
##############.
##############.
##############.
```

### Step 21: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###............
###I.#########.
###..#########.
###..#########.
###.@#########.
###.I##.######.
###..##.######.
####.##.######.
#G#..##......I.
...#...........
...####........
##############.
##############.
##############.
##############.
```

After:

```text
###............
###I.#########.
###..#########.
###..#########.
###..#########.
###.@##.######.
###..##.######.
####.##.######.
#G#.I##......I.
...#...........
...####........
##############.
##############.
##############.
##############.
```

### Step 28: down

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###@...........
###I.#########.
###..#########.
###..#########.
###..#########.
###..##.######.
###..##.######.
####.##.######.
#G#.I##......I.
...#...........
...####........
##############.
##############.
##############.
##############.
```

After:

```text
###............
###@.#########.
###..#########.
###..#########.
###..#########.
###..##.######.
###..##.######.
####.##.######.
#G#II##......I.
...#...........
...####........
##############.
##############.
##############.
##############.
```

### Step 49: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len5, slide_restart_after_group, ice_stop_short:d1

Before:

```text
###............
###..#########.
###..#########.
###..#########.
###..#########.
###..##.######.
###..##.######.
####.##.######.
#G#II##......I@
...#...........
...####........
##############.
##############.
##############.
##############.
```

After:

```text
###............
###..#########.
###..#########.
###..#########.
###..#########.
###..##.######.
###..##.######.
####.##.######.
#*...........@.
...#...........
...####........
##############.
##############.
##############.
##############.
```


## Graph Facts

- Status: complete
- Reachable states: 5544
- Legal transitions: 14350
- Event-only illegal transitions: 217
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5544
- Legal transitions: 14350
- Budget: maxStates=100000
- Compressed regions: 86
- Bidirectional transitions: 14124
- Commitment transitions: 226
- Winning regions: 1
- Initial region: r0, states=61, dist=4, internalBidirectional=148, commitments=7, viableCommitments=3, deadCommitments=4, progressCommitments=3, optimalCommitments=3
- Solution region path: r0@0 -> r3@9 -> r20@21 -> r48@28 -> r68@49
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=86, edges=211, winReachable=9, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=4, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=61, dist=4, out=7, winOut=3, deadOut=4
- SCC path: s0@0 -> s13@9 -> s47@21 -> s71@28 -> s76@49

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 61 | 7 | 3 | 4 | 0 | 0 | s13 | no |
| s13 | 9 | 3 | 65 | 6 | 2 | 4 | 1 | 1 | s47 | no |
| s47 | 21 | 2 | 64 | 6 | 1 | 5 | 2 | 2 | s71 | yes |
| s71 | 28 | 1 | 65 | 4 | 1 | 3 | 3 | 3 | s76 | yes |
| s76 | 49 | 0 | 77 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s13 | 61 | no | no | up | push_ice, ice_destroyed_d3 | has_reposition_room |
| s13 | 9 | 21 | s47 | 65 | no | no | down | push_ice, ice_rebound_d4 | has_reposition_room |
| s47 | 21 | 28 | s71 | 64 | no | yes | down | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s71 | 28 | 49 | s76 | 65 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len5, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5544, regions=86, solution commitments=4
- Opening: commitments=7, viable=3, dead=4, optimal=3
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=2/4
- Endgame tail: 14 step(s) after first entering a winning region
- Reading hints: 14 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r3 | 4 | 3 | 4 | 3 | multiple optimal choices |
| 20 | r3 | r20 | 3 | 2 | 4 | 2 | multiple optimal choices |
| 27 | r20 | r48 | 2 | 1 | 5 | 1 | forced optimal |
| 48 | r48 | r68 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 61 | 7 | 3 | 4 | 3 | 3 | r3 | no | no | no |
| r3 | 9 | 3 | 65 | 6 | 2 | 4 | 2 | 2 | r20 | no | no | no |
| r20 | 21 | 2 | 64 | 6 | 1 | 5 | 1 | 1 | r48 | no | yes | yes |
| r48 | 28 | 1 | 65 | 4 | 1 | 3 | 1 | 1 | r68 | no | yes | yes |
| r68 | 49 | 0 | 77 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r0 | no | 4 | 7 | 3 | 4 | 3 | 3 | r3 | yes | yes | yes | yes | no | no | walk |
| 9 | up | r3 | yes | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroyed_d3 |
| 10 | down | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r3 | no | 3 | 6 | 2 | 4 | 2 | 2 | r20 | yes | yes | yes | yes | no | no | walk |
| 21 | down | r20 | yes | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 22 | up | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | up | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r20 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r20 | no | 2 | 6 | 1 | 5 | 1 | 1 | r48 | yes | yes | yes | yes | yes | yes | walk |
| 28 | down | r48 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d1 |
| 29 | up | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | down | r48 | no | 1 | 4 | 1 | 3 | 1 | 1 | r68 | yes | yes | yes | yes | yes | yes | walk |
| 49 | left | r68 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len5, slide_restart_after_group, ice_stop_short:d1 |
| 50 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | down | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | r68 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | left | r68 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
