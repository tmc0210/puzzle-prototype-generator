# Level Analysis: ICE_CAND_0006_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0006_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#########.####
#######.I..G.#
.I......##GG##
@######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

## Shortest Solution

- Found: yes
- Cost: 76
- Depth: 76
- Explored states: 1285
- Inputs: down down down down down down down down right right right right right right right up up up up up up up up up up right left down down down down down down down down down down right right right right up up down down left left left left left left left left left left left up up up up up up up up up right right right right right right right up right right up
- Events: walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=73, push_ice=3, ice_rebound_d4=1, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 26: right

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
#########.####
#######@I..G.#
.I......##GG##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

After:

```text
#########.####
#######.@..*.#
.I......##GG##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###.##
.............#
##############
```

### Step 43: up

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#########.####
#######....*.#
.I......##GG##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###I##
.######.###@##
.............#
##############
```

After:

```text
#########.####
#######....*.#
.I......##G*##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###@##
.######.###.##
.............#
##############
```

### Step 66: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#########.####
#######....*.#
@I......##G*##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.............#
##############
```

After:

```text
#########.####
#######....*.#
.@........**##
.######.####.#
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.######.###.##
.............#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 1446
- Legal transitions: 2985
- Event-only illegal transitions: 58
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1446
- Legal transitions: 2985
- Budget: maxStates=100000
- Compressed regions: 30
- Bidirectional transitions: 2940
- Commitment transitions: 45
- Winning regions: 1
- Initial region: r0, states=38, dist=3, internalBidirectional=74, commitments=4, viableCommitments=1, deadCommitments=3, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r7@26 -> r19@43 -> r27@66
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=30, edges=45, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=38, dist=3, out=4, winOut=1, deadOut=3
- SCC path: s0@0 -> s6@26 -> s12@43 -> s13@66

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 38 | 4 | 1 | 3 | 0 | 0 | s6 | yes |
| s6 | 26 | 2 | 44 | 4 | 1 | 3 | 1 | 1 | s12 | yes |
| s12 | 43 | 1 | 49 | 3 | 1 | 2 | 1 | 1 | s13 | yes |
| s13 | 66 | 0 | 51 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 26 | s6 | 38 | no | yes | right | push_ice, ice_rebound_d4 | has_reposition_room |
| s6 | 26 | 43 | s12 | 44 | no | yes | up | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s12 | 43 | 66 | s13 | 49 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1446, regions=30, solution commitments=3
- Opening: commitments=4, viable=1, dead=3, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 10 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 10 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 25 | r0 | r7 | 3 | 1 | 3 | 1 | forced optimal |
| 42 | r7 | r19 | 2 | 1 | 3 | 1 | forced optimal |
| 65 | r19 | r27 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 38 | 4 | 1 | 3 | 1 | 1 | r7 | no | yes | yes |
| r7 | 26 | 2 | 44 | 4 | 1 | 3 | 1 | 1 | r19 | no | yes | yes |
| r19 | 43 | 1 | 49 | 3 | 1 | 2 | 1 | 1 | r27 | no | yes | yes |
| r27 | 66 | 0 | 51 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | up | r0 | no | 3 | 4 | 1 | 3 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 26 | right | r7 | yes | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 27 | left | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 28 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 29 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 30 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 31 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 32 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 33 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 34 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 35 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 36 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 37 | down | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 38 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 39 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 40 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 41 | right | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 42 | up | r7 | no | 2 | 4 | 1 | 3 | 1 | 1 | r19 | yes | yes | yes | yes | yes | yes | walk |
| 43 | up | r19 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 44 | down | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 45 | down | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 46 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 47 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 48 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 49 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 50 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 51 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 52 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 53 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 54 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 55 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 56 | left | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 57 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 58 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 59 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 60 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 61 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 62 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 63 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 64 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r19 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 65 | up | r19 | no | 1 | 3 | 1 | 2 | 1 | 1 | r27 | yes | yes | yes | yes | yes | yes | walk |
| 66 | right | r27 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 67 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 68 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 69 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 70 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 71 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 72 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 73 | up | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 74 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 75 | right | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | r27 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 76 | up | r27 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
