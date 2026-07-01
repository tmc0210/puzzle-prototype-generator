# Level Analysis: ICE_EXP_META_2026_07_02_round23_v3_tight_base

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round23_v3_tight_base
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
###############
#....#......IG.
############.I#
#.............#
############..#
############.##
############I.#
############..@
###############
```

## Shortest Solution

- Found: yes
- Cost: 22
- Depth: 22
- Explored states: 148
- Inputs: left left up up up right up up down left left left left left left left left left left left left left
- Events: walk walk push_ice ice_blocks_ice_no_chain_push ice_rebound_d4 walk walk walk walk push_ice ice_stop_short:d1 walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk walk walk walk walk
- Event counts: walk=19, push_ice=3, ice_blocks_ice_no_chain_push=1, ice_rebound_d4=1, ice_stop_short:d1=1, ice_destroy_group_d6_plus:len1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4

Before:

```text
###############
#....#......IG.
############.I#
#.............#
############..#
############.##
############I.#
############@..
###############
```

After:

```text
###############
#....#......IG.
############.I#
#...........I.#
############..#
############.##
############@.#
############...
###############
```

### Step 8: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
###############
#....#......IG.
############.I#
#...........I@#
############..#
############.##
############..#
############...
###############
```

After:

```text
###############
#....#......I*.
############.@#
#...........I.#
############..#
############.##
############..#
############...
###############
```

### Step 10: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
###############
#....#......I*.
############..#
#...........I@#
############..#
############.##
############..#
############...
###############
```

After:

```text
###############
#....#......I*.
############..#
............@.#
############..#
############.##
############..#
############...
###############
```


## Graph Facts

- Status: complete
- Reachable states: 154
- Legal transitions: 330
- Event-only illegal transitions: 17
- Winning states: 1
- Budget: maxStates=80000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 154
- Legal transitions: 330
- Budget: maxStates=80000
- Compressed regions: 9
- Bidirectional transitions: 320
- Commitment transitions: 10
- Winning regions: 1
- Initial region: r0, states=4, dist=3, internalBidirectional=6, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r4@8 -> r6@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=9, edges=10, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=4, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s3@8 -> s6@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 4 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 2 | 9 | 3 | 2 | 1 | 1 | 1 | s3 | no |
| s3 | 8 | 1 | 11 | 3 | 1 | 2 | 1 | 1 | s6 | yes |
| s6 | 10 | 0 | 24 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 4 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 | has_reposition_room |
| s1 | 3 | 8 | s3 | 9 | no | no | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s3 | 8 | 10 | s6 | 11 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=154, regions=9, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=2/3
- Endgame tail: 12 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; 12 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 7 | r1 | r4 | 2 | 2 | 1 | 2 | multiple optimal choices |
| 9 | r4 | r6 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 2 | 9 | 3 | 2 | 1 | 2 | 2 | r4 | no | no | no |
| r4 | 8 | 1 | 11 | 3 | 1 | 2 | 1 | 1 | r6 | no | yes | yes |
| r6 | 10 | 0 | 24 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | up | r1 | yes | 2 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_rebound_d4 |
| 4 | up | r1 | no | 2 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r1 | no | 2 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 2 | 3 | 2 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r1 | no | 2 | 3 | 2 | 1 | 2 | 2 | r4 | yes | yes | yes | yes | no | no | walk |
| 8 | up | r4 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 9 | down | r4 | no | 1 | 3 | 1 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r6 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 11 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | left | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
