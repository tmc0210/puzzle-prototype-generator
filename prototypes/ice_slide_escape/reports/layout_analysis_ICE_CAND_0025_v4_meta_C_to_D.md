# Level Analysis: ICE_CAND_0025_v4_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0025_v4_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
#################
........I.......#
#.......#########
#.......#########
.....IG#......I.@
#################
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 76
- Inputs: left left left left left left left left left up up up right right right right right right right right right
- Events: walk push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk walk walk walk walk walk walk walk push_ice ice_destroy_group_d6_plus:len1 ice_boundary_disappear_after_group walk walk walk walk walk walk walk walk
- Event counts: walk=19, push_ice=2, ice_destroy_group_d6_plus:len1=2, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=1, ice_boundary_disappear_after_group=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
#################
#################
........I.......#
#.......#########
#.......#########
.....IG#......I@.
#################
```

After:

```text
#################
#################
........I.......#
#.......#########
#.......#########
.....I*.......@..
#################
```

### Step 13: right

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group

Before:

```text
#################
#################
.......@I.......#
#.......#########
#.......#########
.....I*..........
#################
```

After:

```text
#################
#################
........@........
#.......#########
#.......#########
.....I*..........
#################
```


## Graph Facts

- Status: complete
- Reachable states: 85
- Legal transitions: 226
- Event-only illegal transitions: 8
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 85
- Legal transitions: 226
- Budget: maxStates=100000
- Compressed regions: 3
- Bidirectional transitions: 224
- Commitment transitions: 2
- Winning regions: 1
- Initial region: r0, states=2, dist=2, internalBidirectional=2, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@13
- Forced commitment prefix length: 2
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=3, edges=2, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=2, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@2 -> s2@13

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 2 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 2 | 1 | 37 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 13 | 0 | 46 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s1 | 2 | no | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | has_reposition_room |
| s1 | 2 | 13 | s2 | 37 | no | yes | right | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=85, regions=3, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 12 | r1 | r2 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 2 | 1 | 37 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 13 | 0 | 46 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r1 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 3 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r1 | no | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 13 | right | r2 | yes | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, ice_boundary_disappear_after_group |
| 14 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r2 | no | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
