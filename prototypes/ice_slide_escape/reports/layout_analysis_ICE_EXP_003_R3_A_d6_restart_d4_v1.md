# Level Analysis: ICE_EXP_003_R3_A_d6_restart_d4_v1

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_003_R3_A_d6_restart_d4_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#########.#######
#######....I..G.#
.I......##..G.G##
@######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.######.######.##
................#
#################
```

## Shortest Solution

- Found: yes
- Cost: 88
- Depth: 88
- Explored states: 2327
- Inputs: down down down down down down down down right right right right right right right up up up up up up up up up up right right right right left left left left down down down down down down down down down down right right right right right right right up up down down left left left left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=85, push_ice=3, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 29: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#########.#######
#######...@I..G.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.######.######.##
................#
#################
```

After:

```text
#########.#######
#######....@..*.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.######.######.##
................#
#################
```

### Step 52: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#########.#######
#######.......*.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.######.######@##
................#
#################
```

After:

```text
#########.#######
#######.......*.#
.I......##..G.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######@##
.######.######.##
................#
#################
```

### Step 78: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
#########.#######
#######.......*.#
@I......##..G.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
................#
#################
```

After:

```text
#########.#######
#######.......*.#
.@..........*.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
................#
#################
```


## Graph Facts

- Status: complete
- Reachable states: 2694
- Legal transitions: 5876
- Event-only illegal transitions: 91
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2694
- Legal transitions: 5876
- Budget: maxStates=100000
- Compressed regions: 55
- Bidirectional transitions: 5792
- Commitment transitions: 84
- Winning regions: 1
- Initial region: r0, states=54, dist=3, internalBidirectional=110, commitments=5, viableCommitments=1, deadCommitments=4, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r9@29 -> r28@52 -> r50@78
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=55, edges=84, winReachable=4, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=54, dist=3, out=5, winOut=1, deadOut=4
- SCC path: s0@0 -> s20@29 -> s26@52 -> s27@78

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 54 | 5 | 1 | 4 | 0 | 0 | s20 | yes |
| s20 | 29 | 2 | 53 | 4 | 1 | 3 | 1 | 1 | s26 | yes |
| s26 | 52 | 1 | 58 | 3 | 1 | 2 | 1 | 1 | s27 | yes |
| s27 | 78 | 0 | 60 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 29 | s20 | 54 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s20 | 29 | 52 | s26 | 53 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s26 | 52 | 78 | s27 | 58 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2694, regions=55, solution commitments=3
- Opening: commitments=5, viable=1, dead=4, optimal=1
- Forced chain: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 28 | r0 | r9 | 3 | 1 | 4 | 1 | forced optimal |
| 51 | r9 | r28 | 2 | 1 | 3 | 1 | forced optimal |
| 77 | r28 | r50 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 54 | 5 | 1 | 4 | 1 | 1 | r9 | no | yes | yes |
| r9 | 29 | 2 | 53 | 4 | 1 | 3 | 1 | 1 | r28 | no | yes | yes |
| r28 | 52 | 1 | 58 | 3 | 1 | 2 | 1 | 1 | r50 | no | yes | yes |
| r50 | 78 | 0 | 60 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | right | r0 | no | 3 | 5 | 1 | 4 | 1 | 1 | r9 | yes | yes | yes | yes | yes | yes | walk |
| 29 | right | r9 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 30 | left | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | left | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | left | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | left | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | down | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | right | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | up | r9 | no | 2 | 4 | 1 | 3 | 1 | 1 | r28 | yes | yes | yes | yes | yes | yes | walk |
| 52 | up | r28 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 53 | down | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | down | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 64 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 65 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 66 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 67 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 68 | left | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 69 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 70 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 71 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 72 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 73 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 74 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 75 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 76 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r28 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 77 | up | r28 | no | 1 | 3 | 1 | 2 | 1 | 1 | r50 | yes | yes | yes | yes | yes | yes | walk |
| 78 | right | r50 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 79 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 80 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 81 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 82 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 83 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 84 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 85 | up | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 86 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 87 | right | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | r50 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 88 | up | r50 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
