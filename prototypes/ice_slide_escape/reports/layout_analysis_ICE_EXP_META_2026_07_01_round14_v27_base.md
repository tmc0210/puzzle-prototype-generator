# Level Analysis: ICE_EXP_META_2026_07_01_round14_v27_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round14_v27_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##################
.......#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......*.#
##*.I.#####I###..#
#.....#####.###I.#
@....######.......
##################
```

## Shortest Solution

- Found: yes
- Cost: 42
- Depth: 42
- Explored states: 233701
- Inputs: right up right right up up up up up right right right down up left left left left left down right down down right down down left up down right right right up left up up up up left left left left
- Events: walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_rebound_d4 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk
- Event counts: walk=38, push_ice=4, ice_stop_short:d2=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_rebound_d4=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 13: down

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
......@#########..
#.*...I.#..G.##..#
#....#.##..*...#.#
#....#G##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*...@.#..G.##..#
#....#.##..*...#.#
#....#*##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 21: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4

Before:

```text
##################
.......#########..
#@*.....#..G.##..#
#....#.##..*...#.#
#....#*##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.+.....#..*.##..#
#....#.##..*...#.#
#....#*##......*.#
##*.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 28: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##################
.......#########..
#.G.....#..*.##..#
#....#.##..*...#.#
#....#*##......*.#
##*.I.#####I###..#
#.@...#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....#.##..*...#.#
#....#*##......*.#
##+.I.#####I###..#
#.....#####.###I.#
.....######.......
##################
```

### Step 34: left

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
##################
.......#########..
#.*.....#..*.##..#
#....#.##..*...#.#
#....#*##......*.#
##G.I@#####I###..#
#.....#####.###I.#
.....######.......
##################
```

After:

```text
##################
.......#########..
#.*.....#..*.##..#
#....#.##..*...#.#
#....#*##......*.#
##*.@.#####I###..#
#.....#####.###I.#
.....######.......
##################
```


## Graph Facts

- Status: complete
- Reachable states: 334283
- Legal transitions: 979110
- Event-only illegal transitions: 34715
- Winning states: 1
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 334283
- Legal transitions: 979110
- Budget: maxStates=400000
- Compressed regions: 10173
- Bidirectional transitions: 928276
- Commitment transitions: 50834
- Winning regions: 1
- Initial region: r0, states=31, dist=4, internalBidirectional=80, commitments=12, viableCommitments=2, deadCommitments=10, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r97@13 -> r1216@21 -> r3719@28 -> r5899@34
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=9679, edges=45464, winReachable=9, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=31, dist=4, out=12, winOut=2, deadOut=10
- SCC path: s0@0 -> s819@13 -> s823@21 -> s825@28 -> s1025@34

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 31 | 12 | 2 | 10 | 0 | 0 | s819 | no |
| s819 | 13 | 3 | 34 | 10 | 2 | 8 | 1 | 1 | s823 | no |
| s823 | 21 | 2 | 35 | 6 | 2 | 4 | 1 | 1 | s825 | no |
| s825 | 28 | 1 | 35 | 8 | 1 | 7 | 1 | 1 | s1025 | yes |
| s1025 | 34 | 0 | 35 | 6 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 13 | s819 | 31 | no | no | down | push_ice, ice_stop_short:d2 | has_reposition_room |
| s819 | 13 | 21 | s823 | 34 | no | no | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 | has_reposition_room |
| s823 | 21 | 28 | s825 | 35 | no | no | up | push_ice, ice_rebound_d4 | has_reposition_room |
| s825 | 28 | 34 | s1025 | 35 | no | yes | left | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=334283, regions=10173, solution commitments=4
- Opening: commitments=12, viable=2, dead=10, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=4/4, forced viable commitments=1/4
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 12 | r0 | r97 | 4 | 2 | 10 | 1 | forced optimal |
| 20 | r97 | r1216 | 3 | 2 | 8 | 1 | forced optimal |
| 27 | r1216 | r3719 | 2 | 2 | 4 | 1 | forced optimal |
| 33 | r3719 | r5899 | 1 | 1 | 7 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 31 | 12 | 2 | 10 | 1 | 1 | r97 | no | no | yes |
| r97 | 13 | 3 | 34 | 10 | 2 | 8 | 1 | 1 | r1216 | no | no | yes |
| r1216 | 21 | 2 | 35 | 6 | 2 | 4 | 1 | 1 | r3719 | no | no | yes |
| r3719 | 28 | 1 | 35 | 8 | 1 | 7 | 1 | 1 | r5899 | no | yes | yes |
| r5899 | 34 | 0 | 35 | 6 | 0 | 6 | 0 | 0 | win/end | no | no | no |

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
| 12 | right | r0 | no | 4 | 12 | 2 | 10 | 1 | 1 | r97 | yes | yes | yes | yes | no | yes | walk |
| 13 | down | r97 | yes | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 14 | up | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r97 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r97 | no | 3 | 10 | 2 | 8 | 1 | 1 | r1216 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r1216 | yes | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_rebound_d4 |
| 22 | down | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r1216 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r1216 | no | 2 | 6 | 2 | 4 | 1 | 1 | r3719 | yes | yes | yes | yes | no | yes | walk |
| 28 | up | r3719 | yes | 1 | 8 | 1 | 7 | 1 | 1 | r3719 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 29 | down | r3719 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3719 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | right | r3719 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3719 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r3719 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3719 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r3719 | no | 1 | 8 | 1 | 7 | 1 | 1 | r3719 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | up | r3719 | no | 1 | 8 | 1 | 7 | 1 | 1 | r5899 | yes | yes | yes | yes | yes | yes | walk |
| 34 | left | r5899 | yes | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 35 | up | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | up | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | left | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | left | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | left | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | r5899 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | left | r5899 | no | 0 | 6 | 0 | 6 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
