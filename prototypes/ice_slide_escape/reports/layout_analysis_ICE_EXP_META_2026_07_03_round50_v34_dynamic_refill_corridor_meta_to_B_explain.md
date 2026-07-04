# Level Analysis: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_meta_to_B_explain

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_03_round50_v34_dynamic_refill_corridor_meta_to_B_explain
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#######################
#######################
#######################
####.##################
####.#################@
.....*...*...##......*.
#####.###..####.......#
####II#.#I..###......I#
####.......####.......#
####**.##..############
##########..###########
```

## Shortest Solution

- Found: yes
- Cost: 27
- Depth: 27
- Explored states: 648
- Inputs: down left down left down down right up up left up left left left left left left left left left left down down down down down right
- Events: walk push_ice ice_destroy_group_d6_plus:len2 slide_restart_after_group ice_blocks_ice_no_chain_push ice_destroyed_d3 walk walk walk walk walk push_ice ice_stop_short:d2 walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=25, push_ice=2, ice_destroy_group_d6_plus:len2=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_destroyed_d3=1, ice_stop_short:d2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3

Before:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...##......*@
#####.###..####.......#
####II#.#I..###......I#
####.......####.......#
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...........+.
#####.###..####.......#
####II#.#I..###......I#
####.......####.......#
####**.##..############
##########..###########
```

### Step 8: up

- Legal: true
- Events: push_ice, ice_stop_short:d2

Before:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...........G.
#####.###..####.......#
####II#.#I..###......I#
####.......####......@#
####**.##..############
##########..###########
```

After:

```text
#######################
#######################
#######################
####.##################
####.#################.
.....*...*...........*.
#####.###..####.......#
####II#.#I..###......@#
####.......####.......#
####**.##..############
##########..###########
```


## Graph Facts

- Status: complete
- Reachable states: 10804
- Legal transitions: 29053
- Event-only illegal transitions: 1252
- Winning states: 9
- Budget: maxStates=120000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 10804
- Legal transitions: 29053
- Budget: maxStates=120000
- Compressed regions: 185
- Bidirectional transitions: 28534
- Commitment transitions: 519
- Winning regions: 9
- Initial region: r0, states=2, dist=2, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r3@8
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=185, edges=513, winReachable=43, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=26, mergingWinSccs=31
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 1 | 51 | 6 | 5 | 1 | 1 | 1 | s2 | no |
| s2 | 8 | 0 | 49 | 5 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 | has_reposition_room |
| s1 | 2 | 8 | s2 | 51 | no | no | up | push_ice, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=10804, regions=185, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 19 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress; 19 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 7 | r1 | r3 | 1 | 5 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 1 | 51 | 6 | 5 | 1 | 1 | 1 | r3 | no | no | yes |
| r3 | 8 | 0 | 49 | 5 | 4 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r1 | yes | 1 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len2, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_destroyed_d3 |
| 3 | down | r1 | no | 1 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 1 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 1 | 6 | 5 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 6 | 5 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 8 | up | r3 | yes | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d2 |
| 9 | up | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | down | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | down | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | down | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 26 | down | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 27 | right | r3 | no | 0 | 5 | 4 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
