# Level Analysis: ICE_CAND_0027_v1_meta_C_to_D

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0027_v1_meta_C_to_D
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#.....##.....#
......##......
#...IG#.....I@
.I.....#GI...#
#.....##.....#
##############
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 357
- Inputs: left down left left left up up right right right right
- Events: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk walk
- Event counts: push_ice=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=2, walk=9

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#.....##.....#
......##......
#...IG#.....I@
.I.....#GI...#
#.....##.....#
##############
```

After:

```text
##############
#.....##.....#
......##......
#...I*#.....@.
.I.....#GI...#
#.....##.....#
##############
```

### Step 5: left

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##############
#.....##.....#
......##......
#...I*#.......
.I.....#GI@..#
#.....##.....#
##############
```

After:

```text
##############
#.....##.....#
......##......
#...I*#.......
.I.....#*@...#
#.....##.....#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 691
- Legal transitions: 2140
- Event-only illegal transitions: 43
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 691
- Legal transitions: 2140
- Budget: maxStates=100000
- Compressed regions: 26
- Bidirectional transitions: 2080
- Commitment transitions: 60
- Winning regions: 1
- Initial region: r0, states=26, dist=2, internalBidirectional=72, commitments=7, viableCommitments=2, deadCommitments=5, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r4@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=26, edges=55, winReachable=4, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=26, dist=2, out=7, winOut=2, deadOut=5
- SCC path: s0@0 -> s1@1 -> s8@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 26 | 7 | 2 | 5 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 27 | 3 | 1 | 2 | 1 | 1 | s8 | yes |
| s8 | 5 | 0 | 27 | 2 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 26 | yes | no | left | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | scripted_same_state_handoff |
| s1 | 1 | 5 | s8 | 27 | no | yes | left | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=691, regions=26, solution commitments=2
- Opening: commitments=7, viable=2, dead=5, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=1/2
- Endgame tail: 6 step(s) after first entering a winning region
- Reading hints: 6 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 2 | 5 | 2 | multiple optimal choices |
| 4 | r1 | r4 | 1 | 1 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 26 | 7 | 2 | 5 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 1 | 27 | 3 | 1 | 2 | 1 | 1 | r4 | no | yes | yes |
| r4 | 5 | 0 | 27 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 7 | 2 | 5 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | left | r1 | yes | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 2 | down | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 1 | 3 | 1 | 2 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 5 | left | r4 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 6 | up | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | right | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r4 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
