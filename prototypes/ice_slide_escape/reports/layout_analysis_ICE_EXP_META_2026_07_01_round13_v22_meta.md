# Level Analysis: ICE_EXP_META_2026_07_01_round13_v22_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_01_round13_v22_meta
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
.....######.....@
#################
```

## Shortest Solution

- Found: yes
- Cost: 38
- Depth: 38
- Explored states: 42033
- Inputs: left up up up left left left left up down right right right right up left down down right down down left up down left left left up up up right right right right up up up right
- Events: walk walk walk walk walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_pass_through_d5:len2 slide_restart_after_group ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk walk walk walk walk walk
- Event counts: walk=34, push_ice=4, ice_stop_short:d1=2, ice_pass_through_d5:len2=1, slide_restart_after_group=1, ice_rebound_d4=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 9: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
.......########..
#.*...I.#..G.#..#
#....#G##..*..*.#
#.....#####@....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

After:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#G##..+..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

### Step 16: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1

Before:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#G##..G..*@#
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
#.*...I.#..*.#..#
#....#*##..G..+.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######......
#################
```

### Step 23: up

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#*##..G..G.#
#.....#####.....#
##*.I.#####I##..#
#....######.##I.#
.....######...@..
#################
```

After:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#*##..G..*.#
#.....#####.....#
##*.I.#####I##..#
#....######.##@.#
.....######......
#################
```

### Step 29: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#*##..G..*.#
#.....#####.....#
##*.I.#####I##..#
#....######@##..#
.....######......
#################
```

After:

```text
#################
.......########..
#.*...I.#..*.#..#
#....#*##..*..*.#
#.....#####.....#
##*.I.#####@##..#
#....######.##..#
.....######......
#################
```


## Graph Facts

- Status: complete
- Reachable states: 137520
- Legal transitions: 354536
- Event-only illegal transitions: 19883
- Winning states: 1
- Budget: maxStates=250000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 137520
- Legal transitions: 354536
- Budget: maxStates=250000
- Compressed regions: 5070
- Bidirectional transitions: 337214
- Commitment transitions: 17322
- Winning regions: 1
- Initial region: r0, states=28, dist=4, internalBidirectional=60, commitments=12, viableCommitments=3, deadCommitments=9, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r15@9 -> r167@16 -> r526@23 -> r1040@29
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=4479, edges=14543, winReachable=14, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=3, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=28, dist=3, out=12, winOut=3, deadOut=9
- SCC path: s0@0 -> s1706@9 -> s1908@16 -> s1909@29

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 28 | 12 | 3 | 9 | 0 | 0 | s1706 | no |
| s1706 | 9 | 2 | 28 | 10 | 1 | 9 | 1 | 1 | s1908 | yes |
| s1908 | 16 | 1 | 58 | 8 | 1 | 7 | 1 | 1 | s1909 | yes |
| s1909 | 29 | 0 | 50 | 6 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 9 | s1706 | 28 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s1706 | 9 | 16 | s1908 | 28 | no | yes | left | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1 | has_reposition_room |
| s1908 | 16 | 29 | s1909 | 58 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=137520, regions=5070, solution commitments=4
- Opening: commitments=12, viable=3, dead=9, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=2/4, forced viable commitments=1/4
- Endgame tail: 9 step(s) after first entering a winning region
- Reading hints: 9 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 8 | r0 | r15 | 4 | 3 | 9 | 1 | forced optimal |
| 15 | r15 | r167 | 3 | 1 | 9 | 1 | forced optimal |
| 22 | r167 | r526 | 2 | 2 | 4 | 2 | multiple optimal choices |
| 28 | r526 | r1040 | 1 | 2 | 6 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 28 | 12 | 3 | 9 | 1 | 1 | r15 | no | no | yes |
| r15 | 9 | 3 | 28 | 10 | 1 | 9 | 1 | 1 | r167 | no | yes | yes |
| r167 | 16 | 2 | 29 | 6 | 2 | 4 | 2 | 2 | r526 | no | no | no |
| r526 | 23 | 1 | 29 | 8 | 2 | 6 | 1 | 1 | r1040 | no | no | yes |
| r1040 | 29 | 0 | 25 | 6 | 1 | 5 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | up | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r0 | no | 4 | 12 | 3 | 9 | 1 | 1 | r15 | yes | yes | yes | yes | no | yes | walk |
| 9 | up | r15 | yes | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 10 | down | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r15 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r15 | no | 3 | 10 | 1 | 9 | 1 | 1 | r167 | yes | yes | yes | yes | yes | yes | walk |
| 16 | left | r167 | yes | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len2, slide_restart_after_group, ice_stop_short:d1 |
| 17 | down | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | down | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | down | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | down | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r167 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r167 | no | 2 | 6 | 2 | 4 | 2 | 2 | r526 | yes | yes | yes | yes | no | no | walk |
| 23 | up | r526 | yes | 1 | 8 | 2 | 6 | 1 | 1 | r526 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 24 | down | r526 | no | 1 | 8 | 2 | 6 | 1 | 1 | r526 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | left | r526 | no | 1 | 8 | 2 | 6 | 1 | 1 | r526 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | left | r526 | no | 1 | 8 | 2 | 6 | 1 | 1 | r526 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | left | r526 | no | 1 | 8 | 2 | 6 | 1 | 1 | r526 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | up | r526 | no | 1 | 8 | 2 | 6 | 1 | 1 | r1040 | yes | yes | yes | yes | no | yes | walk |
| 29 | up | r1040 | yes | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 30 | up | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | right | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | right | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | right | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | up | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | up | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | up | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | r1040 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r1040 | no | 0 | 6 | 1 | 5 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
