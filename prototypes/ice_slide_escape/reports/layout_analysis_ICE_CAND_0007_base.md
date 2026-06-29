# Level Analysis: ICE_CAND_0007_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0007_base
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
@...............#
#################
#################
```

## Shortest Solution

- Found: yes
- Cost: 77
- Depth: 77
- Explored states: 2494
- Inputs: right right right right right right right up up up up up up up up up right right right right left left left left down down down down down down down down down right right right right right right right up down left left left left left left left left left left left left left left up up up up up up up up right right right right right right right up right right right right up
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=74, push_ice=3, ice_rebound_d4=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

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
................#
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
................#
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
..............@.#
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
................#
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
................#
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
................#
#################
#################
```


## Graph Facts

- Status: complete
- Reachable states: 2888
- Legal transitions: 6333
- Event-only illegal transitions: 85
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2888
- Legal transitions: 6333
- Budget: maxStates=100000
- Compressed regions: 61
- Bidirectional transitions: 6230
- Commitment transitions: 103
- Winning regions: 1
- Initial region: r0, states=50, dist=3, internalBidirectional=102, commitments=6, viableCommitments=1, deadCommitments=5, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r5@20 -> r27@41 -> r56@65
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=61, edges=100, winReachable=4, winning=1, winSubgraph=single_win_chain
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=50, dist=3, out=6, winOut=1, deadOut=5
- SCC path: s0@0 -> s18@20 -> s24@41 -> s25@65

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 50 | 6 | 1 | 5 | 0 | 0 | s18 | yes |
| s18 | 20 | 2 | 50 | 4 | 1 | 3 | 1 | 1 | s24 | yes |
| s24 | 41 | 1 | 55 | 3 | 1 | 2 | 1 | 1 | s25 | yes |
| s25 | 65 | 0 | 57 | 3 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 20 | s18 | 50 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s18 | 20 | 41 | s24 | 50 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s24 | 41 | 65 | s25 | 55 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2888, regions=61, solution commitments=3
- Opening: commitments=6, viable=1, dead=5, optimal=1
- Forced chain: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 12 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 12 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 19 | r0 | r5 | 3 | 1 | 5 | 1 | forced optimal |
| 40 | r5 | r27 | 2 | 1 | 3 | 1 | forced optimal |
| 64 | r27 | r56 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 50 | 6 | 1 | 5 | 1 | 1 | r5 | no | yes | yes |
| r5 | 20 | 2 | 50 | 4 | 1 | 3 | 1 | 1 | r27 | no | yes | yes |
| r27 | 41 | 1 | 55 | 3 | 1 | 2 | 1 | 1 | r56 | no | yes | yes |
| r56 | 65 | 0 | 57 | 3 | 0 | 3 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r0 | no | 3 | 6 | 1 | 5 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 20 | right | r5 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 21 | left | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | left | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | left | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r5 | no | 2 | 4 | 1 | 3 | 1 | 1 | r27 | yes | yes | yes | yes | yes | yes | walk |
| 41 | up | r27 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 42 | down | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 43 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 44 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | left | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 64 | up | r27 | no | 1 | 3 | 1 | 2 | 1 | 1 | r56 | yes | yes | yes | yes | yes | yes | walk |
| 65 | right | r56 | yes | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 66 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 67 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 68 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 69 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 70 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 71 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 72 | up | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 73 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 74 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 75 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 76 | right | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | r56 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 77 | up | r56 | no | 0 | 3 | 0 | 3 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
