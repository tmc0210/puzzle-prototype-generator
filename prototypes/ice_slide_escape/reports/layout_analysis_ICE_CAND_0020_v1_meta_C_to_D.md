# Level Analysis: ICE_CAND_0020_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0020_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
##############
..IG#.....I..@
#.########.###
..IG#......I..
##########...#
##############
```

## Shortest Solution

- Found: yes
- Cost: 12
- Depth: 12
- Explored states: 50
- Inputs: left left left down down down right right up left right right
- Events: walk walk push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk
- Event counts: walk=10, push_ice=2, ice_pass_through_d5:len1=1, slide_restart_after_group=2, ice_blocks_ice_no_chain_push=2, ice_stop_short:d1=2, ice_destroy_group_d6_plus:len1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
##############
..IG#.....I@..
#.########.###
..IG#......I..
##########...#
##############
```

After:

```text
##############
##############
..I*#.....@...
#.########.###
..IG#......I..
##########...#
##############
```

### Step 10: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
##############
..I*#.........
#.########.###
..IG#......I@.
##########...#
##############
```

After:

```text
##############
##############
..I*#.........
#.########.###
..I*.......@..
##########...#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 69
- Legal transitions: 141
- Event-only illegal transitions: 2
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 69
- Legal transitions: 141
- Budget: maxStates=100000
- Compressed regions: 4
- Bidirectional transitions: 138
- Commitment transitions: 3
- Winning regions: 1
- Initial region: r0, states=3, dist=2, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r3@10
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=4, edges=3, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=3, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s3@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 1 | 21 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 10 | 0 | 23 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | yes | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 3 | 10 | s3 | 21 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=69, regions=4, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 2 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 9 | r1 | r3 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 1 | 21 | 2 | 1 | 1 | 1 | 1 | r3 | no | yes | yes |
| r3 | 10 | 0 | 23 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | left | r1 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 4 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r1 | no | 1 | 2 | 1 | 1 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 10 | left | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 11 | right | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | right | r3 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
