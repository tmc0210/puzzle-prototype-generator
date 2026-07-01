# Level Analysis: ICE_CAND_0025_v3_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0025_v3_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#############
#############
..##.I......#
#.##........#
#.##........#
.IG#......I.@
#############
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 257
- Inputs: left left up up left left left left left left up right right right right right right right right
- Events: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk
- Event counts: walk=17, push_ice=2, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#############
#############
..##.I......#
#.##........#
#.##........#
.IG#......I@.
#############
```

After:

```text
#############
#############
..##.I......#
#.##........#
#.##........#
.I*.......@..
#############
```

### Step 12: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
#############
#############
..##@I......#
#.##........#
#.##........#
.I*..........
#############
```

After:

```text
#############
#############
..##.@.......
#.##........#
#.##........#
.I*..........
#############
```


## Graph Facts

- Status: complete
- Reachable states: 294
- Legal transitions: 930
- Event-only illegal transitions: 15
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 294
- Legal transitions: 930
- Budget: maxStates=100000
- Compressed regions: 9
- Bidirectional transitions: 918
- Commitment transitions: 12
- Winning regions: 1
- Initial region: r0, states=31, dist=2, internalBidirectional=94, commitments=4, viableCommitments=2, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@2 -> r6@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=9, edges=12, winReachable=4, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=31, dist=2, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s1@2 -> s7@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 31 | 4 | 2 | 2 | 0 | 0 | s1 | no |
| s1 | 2 | 1 | 33 | 2 | 1 | 1 | 1 | 1 | s7 | yes |
| s7 | 12 | 0 | 35 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 31 | no | no | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 2 | 12 | s7 | 33 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=294, regions=9, solution commitments=2
- Opening: commitments=4, viable=2, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=1/2
- Endgame tail: 7 step(s) after first entering a winning region
- Reading hints: 7 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 2 | 2 | 2 | multiple optimal choices |
| 11 | r1 | r6 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 31 | 4 | 2 | 2 | 2 | 2 | r1 | no | no | no |
| r1 | 2 | 1 | 33 | 2 | 1 | 1 | 1 | 1 | r6 | no | yes | yes |
| r6 | 12 | 0 | 35 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 4 | 2 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 4 | 2 | 2 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | left | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 3 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 12 | right | r6 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 13 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r6 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
