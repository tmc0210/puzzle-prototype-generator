# Level Analysis: ICE_EXP_003_R3_D_boundary_resource_v1

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_003_R3_D_boundary_resource_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###########.#####
#######....I..G.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
@..I............#
#################
#################
```

## Shortest Solution

- Found: yes
- Cost: 77
- Depth: 77
- Explored states: 4595
- Inputs: right right right right right right right up up up up up up up up up right right right right left left left left down down down down down down down down down right right right right right right right up down left left left left left left left left left left left left left left up up up up up up up up right right right right right right right up right right right right up
- Events: walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=73, push_ice=4, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###########.#####
#######....I..G.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
..@I............#
#################
#################
```

After:

```text
###########.#####
#######....I..G.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
...@.............
#################
#################
```

### Step 20: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
###########.#####
#######...@I..G.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.................
#################
#################
```

After:

```text
###########.#####
#######....@..*.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
.................
#################
#################
```

### Step 41: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
###########.#####
#######.......*.#
.I......##..G.G##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######I##
..............@..
#################
#################
```

After:

```text
###########.#####
#######.......*.#
.I......##..G.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######@##
.................
#################
#################
```

### Step 65: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###########.#####
#######.......*.#
@I......##..G.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.................
#################
#################
```

After:

```text
###########.#####
#######.......*.#
.@..........*.*##
.######.#########
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.######.######.##
.................
#################
#################
```


## Graph Facts

- Status: complete
- Reachable states: 5331
- Legal transitions: 11761
- Event-only illegal transitions: 143
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 5331
- Legal transitions: 11761
- Budget: maxStates=100000
- Compressed regions: 104
- Bidirectional transitions: 11556
- Commitment transitions: 205
- Winning regions: 1
- Initial region: r0, states=11, dist=4, internalBidirectional=20, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r7@20 -> r42@41 -> r95@65
- Forced commitment prefix length: 0
- Forced viable prefix length: 4
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=104, edges=200, winReachable=5, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=4, forcedWinPrefix=4/4, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/4, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=11, dist=4, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s1@3 -> s19@20 -> s25@41 -> s26@65

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 11 | 2 | 1 | 1 | 0 | 0 | s1 | yes |
| s1 | 3 | 3 | 51 | 6 | 1 | 5 | 1 | 1 | s19 | yes |
| s19 | 20 | 2 | 51 | 4 | 1 | 3 | 1 | 1 | s25 | yes |
| s25 | 41 | 1 | 56 | 3 | 1 | 2 | 1 | 1 | s26 | yes |
| s26 | 65 | 0 | 58 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 11 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |
| s1 | 3 | 20 | s19 | 51 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s19 | 20 | 41 | s25 | 51 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s25 | 41 | 65 | s26 | 56 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=5331, regions=104, solution commitments=4
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=4/4, optimal prefix=4/4, forced viable commitments=4/4
- Endgame tail: 12 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 12 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 4 | 1 | 1 | 1 | forced optimal |
| 19 | r1 | r7 | 3 | 1 | 5 | 1 | forced optimal |
| 40 | r7 | r42 | 2 | 1 | 3 | 1 | forced optimal |
| 64 | r42 | r95 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 11 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 3 | 3 | 51 | 6 | 1 | 5 | 1 | 1 | r7 | no | yes | yes |
| r7 | 20 | 2 | 51 | 4 | 1 | 3 | 1 | 1 | r42 | no | yes | yes |
| r42 | 41 | 1 | 56 | 3 | 1 | 2 | 1 | 1 | r95 | no | yes | yes |
| r95 | 65 | 0 | 58 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 4 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r1 | yes | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 4 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r1 | no | 3 | 6 | 1 | 5 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 20 | right | r7 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 21 | left | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r42 | yes | yes | yes | yes | yes | yes | walk |
| 41 | up | r42 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 42 | down | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | left | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r42 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 64 | up | r42 | no | 1 | 3 | 1 | 2 | 1 | 1 | r95 | yes | yes | yes | yes | yes | yes | walk |
| 65 | right | r95 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 66 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 67 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 68 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 69 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 70 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 71 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 72 | up | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 73 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 74 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 75 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 76 | right | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | r95 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 77 | up | r95 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
