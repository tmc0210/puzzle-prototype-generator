# Level Analysis: ICE_CAND_0029_v2_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0029_v2_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
#################
......###########
#...#.###########
#..#G.*.....*.###
#...*.######*.###
#.....######..###
#...I.######I....
......######....@
#################
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 244
- Inputs: up left left left up up up left right down down left up down right down down left up right right right right
- Events: walk walk walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_pass_through_d5:len1 slide_restart_after_group ice_stop_short:d2 walk walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk push_ice ice_blocks_ice_no_chain_push ice_stop_short:d2 walk walk walk walk
- Event counts: walk=20, push_ice=3, ice_blocks_ice_no_chain_push=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_stop_short:d2=2, ice_stop_short:d1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 8: left

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#G.*.....*@###
#...*.######*.###
#.....######..###
#...I.######I....
......######.....
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....+.###
#...*.######*.###
#.....######..###
#...I.######I....
......######.....
#################
```

### Step 13: up

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
#################
......###########
#...#.###########
#..#*.*.....G.###
#...*.######*.###
#.....######@.###
#...I.######I....
......######.....
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######+.###
#.....######..###
#...I.######I....
......######.....
#################
```

### Step 19: up

- Legal: true
- Events: push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2

Before:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######G.###
#.....######..###
#...I.######I....
......######@....
#################
```

After:

```text
#################
......###########
#...#.###########
#..#*.*.....*.###
#...*.######*.###
#.....######..###
#...I.######@....
......######.....
#################
```


## Graph Facts

- Status: complete
- Reachable states: 318713
- Legal transitions: 914616
- Event-only illegal transitions: 19149
- Winning states: 1
- Budget: maxStates=1000000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 318713
- Legal transitions: 914616
- Budget: maxStates=1000000
- Compressed regions: 6710
- Bidirectional transitions: 884188
- Commitment transitions: 30428
- Winning regions: 1
- Initial region: r0, states=13, dist=3, internalBidirectional=30, commitments=3, viableCommitments=1, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r3@8 -> r7@13 -> r16@19
- Forced commitment prefix length: 0
- Forced viable prefix length: 3
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=6543, edges=27743, winReachable=4, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=3, forcedWinPrefix=3/3, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=13, dist=3, out=3, winOut=1, deadOut=2
- SCC path: s0@0 -> s3@8 -> s6@13 -> s7@19

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 13 | 3 | 1 | 2 | 0 | 0 | s3 | yes |
| s3 | 8 | 2 | 19 | 5 | 1 | 4 | 1 | 1 | s6 | yes |
| s6 | 13 | 1 | 14 | 3 | 1 | 2 | 1 | 1 | s7 | yes |
| s7 | 19 | 0 | 14 | 1 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 8 | s3 | 13 | no | yes | left | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 | has_reposition_room |
| s3 | 8 | 13 | s6 | 19 | no | yes | up | push_ice, ice_stop_short:d1 | has_reposition_room |
| s6 | 13 | 19 | s7 | 14 | no | yes | up | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=318713, regions=6710, solution commitments=3
- Opening: commitments=3, viable=1, dead=2, optimal=1
- Win-continuation prefix: viable prefix=3/3, optimal prefix=3/3, forced viable commitments=3/3
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 7 | r0 | r3 | 3 | 1 | 2 | 1 | forced optimal |
| 12 | r3 | r7 | 2 | 1 | 4 | 1 | forced optimal |
| 18 | r7 | r16 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 13 | 3 | 1 | 2 | 1 | 1 | r3 | no | yes | yes |
| r3 | 8 | 2 | 19 | 5 | 1 | 4 | 1 | 1 | r7 | no | yes | yes |
| r7 | 13 | 1 | 14 | 3 | 1 | 2 | 1 | 1 | r16 | no | yes | yes |
| r16 | 19 | 0 | 14 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | up | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r0 | no | 3 | 3 | 1 | 2 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r3 | yes | 2 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_pass_through_d5:len1, slide_restart_after_group, ice_stop_short:d2 |
| 9 | right | r3 | no | 2 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r3 | no | 2 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r3 | no | 2 | 5 | 1 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 2 | 5 | 1 | 4 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | walk |
| 13 | up | r7 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 14 | down | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | down | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r7 | no | 1 | 3 | 1 | 2 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | walk |
| 19 | up | r16 | yes | 0 | 1 | 0 | 1 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_blocks_ice_no_chain_push, ice_stop_short:d2 |
| 20 | right | r16 | no | 0 | 1 | 0 | 1 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r16 | no | 0 | 1 | 0 | 1 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | right | r16 | no | 0 | 1 | 0 | 1 | 0 | 0 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | right | r16 | no | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
