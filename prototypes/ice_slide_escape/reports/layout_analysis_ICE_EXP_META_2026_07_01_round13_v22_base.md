# Level Analysis: ICE_EXP_META_2026_07_01_round13_v22_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round13_v22_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
.......########..
#.*...I.#..G.#..#
#....#G##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
@....######......
#################
```

## Shortest Solution

- Found: yes
- Cost: 42
- Depth: 42
- Explored states: 207712
- Inputs: right up right right up up up up up right right right down up left left left left left down right down down right down down left up up right right right down left up up up up left left left left
- Events: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=38, push_ice=4, ice_stop_short:d1=1, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_rebound_d4=2, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 13: down

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
......@########..
#.*...I.#..G.#..#
#....#G##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

After:

```text
#################
.......########..
#.*...@.#..G.#..#
#....#*##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

### Step 21: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4

Before:

```text
#################
.......########..
#@*.....#..G.#..#
#....#*##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

After:

```text
#################
.......########..
#.+.....#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

### Step 28: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#################
.......########..
#.G.....#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##*.I.#####I##..#
#.@..######.##I.#
.....######......
#################
```

After:

```text
#################
.......########..
#.*.....#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##+.I.#####I##..#
#....######.##I.#
.....######......
#################
```

### Step 34: left

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#################
.......########..
#.*.....#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##G.I@#####I##..#
#....######.##I.#
.....######......
#################
```

After:

```text
#################
.......########..
#.*.....#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##*.@.#####I##..#
#....######.##I.#
.....######......
#################
```


## Graph Facts

- Status: complete
- Reachable states: 262265
- Legal transitions: 773111
- Event-only illegal transitions: 28324
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 262265
- Legal transitions: 773111
- Budget: maxStates=300000
- Compressed regions: 8138
- Bidirectional transitions: 733974
- Commitment transitions: 39137
- Winning regions: 1
- Initial region: r0, states=31, dist=4, internalBidirectional=80, commitments=12, viableCommitments=2, deadCommitments=10, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r93@13 -> r1191@21 -> r3598@28 -> r5540@34
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=7687, edges=35518, winReachable=9, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=31, dist=4, out=12, winOut=2, deadOut=10
- SCC path: s0@0 -> s94@13 -> s98@21 -> s100@28 -> s309@34

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 31 | 12 | 2 | 10 | 0 | 0 | s94 | no |
| s94 | 13 | 3 | 33 | 10 | 2 | 8 | 1 | 1 | s98 | no |
| s98 | 21 | 2 | 34 | 6 | 2 | 4 | 1 | 1 | s100 | no |
| s100 | 28 | 1 | 34 | 8 | 1 | 7 | 1 | 1 | s309 | yes |
| s309 | 34 | 0 | 34 | 6 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 13 | s94 | 31 | no | no | down | push_ice, ice_stop_short:d1 | has_reposition_room |
| s94 | 13 | 21 | s98 | 33 | no | no | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 | has_reposition_room |
| s98 | 21 | 28 | s100 | 34 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s100 | 28 | 34 | s309 | 34 | no | yes | left | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=262265, regions=8138, solution commitments=4
- Opening: commitments=12, viable=2, dead=10, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=4/4, forced viable commitments=1/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 12 | r0 | r93 | 4 | 2 | 10 | 1 | forced optimal |
| 20 | r93 | r1191 | 3 | 2 | 8 | 1 | forced optimal |
| 27 | r1191 | r3598 | 2 | 2 | 4 | 1 | forced optimal |
| 33 | r3598 | r5540 | 1 | 1 | 7 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 31 | 12 | 2 | 10 | 1 | 1 | r93 | no | no | yes |
| r93 | 13 | 3 | 33 | 10 | 2 | 8 | 1 | 1 | r1191 | no | no | yes |
| r1191 | 21 | 2 | 34 | 6 | 2 | 4 | 1 | 1 | r3598 | no | no | yes |
| r3598 | 28 | 1 | 34 | 8 | 1 | 7 | 1 | 1 | r5540 | no | yes | yes |
| r5540 | 34 | 0 | 34 | 6 | 0 | 6 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r93 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r93 | yes | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 14 | up | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r93 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r93 | no | 3 | 10 | 2 | 8 | 1 | 1 | r1191 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r1191 | yes | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 |
| 22 | down | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1191 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r1191 | no | 2 | 6 | 2 | 4 | 1 | 1 | r3598 | yes | yes | yes | yes | no | yes | walk |
| 28 | up | r3598 | yes | 1 | 8 | 1 | 7 | 1 | 1 | r3598 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 29 | up | r3598 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3598 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r3598 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3598 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r3598 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3598 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r3598 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3598 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r3598 | no | 1 | 8 | 1 | 7 | 1 | 1 | r5540 | yes | yes | yes | yes | yes | yes | walk |
| 34 | left | r5540 | yes | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 35 | up | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | left | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5540 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r5540 | no | 0 | 6 | 0 | 6 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
