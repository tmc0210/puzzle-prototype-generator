# Level Analysis: ICE_CAND_0027_v1_base_A_to_B

## Summary

- Prototype: ice_slide_escape
- Title: ICE_CAND_0027_v1_base_A_to_B
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
#...IG#.....I.
@I.....#GI...#
#.....##.....#
##############
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 116
- Inputs: right up right right right up left left left left
- Events: push_ice ice_pass_through_d5:len1 slide_restart_after_group ice_blocks_ice_no_chain_push ice_stop_short:d1 walk walk walk push_ice ice_stop_short:d1 walk walk walk walk walk
- Event counts: push_ice=2, ice_pass_through_d5:len1=1, slide_restart_after_group=1, ice_blocks_ice_no_chain_push=1, ice_stop_short:d1=2, walk=8

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1

Before:

```text
##############
#.....##.....#
......##......
#...IG#.....I.
@I.....#GI...#
#.....##.....#
##############
```

After:

```text
##############
#.....##.....#
......##......
#...IG#.....I.
.@.....#*I...#
#.....##.....#
##############
```

### Step 5: right

- Legal: true
- Events: push_ice, ice_stop_short:d1

Before:

```text
##############
#.....##.....#
......##......
#..@IG#.....I.
.......#*I...#
#.....##.....#
##############
```

After:

```text
##############
#.....##.....#
......##......
#...@*#.....I.
.......#*I...#
#.....##.....#
##############
```


## Graph Facts

- Status: complete
- Reachable states: 191
- Legal transitions: 579
- Event-only illegal transitions: 7
- Winning states: 1
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 191
- Legal transitions: 579
- Budget: maxStates=100000
- Compressed regions: 8
- Bidirectional transitions: 568
- Commitment transitions: 11
- Winning regions: 1
- Initial region: r0, states=1, dist=2, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@5
- Forced commitment prefix length: 1
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=8, edges=11, winReachable=3, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=2, forcedWinPrefix=2/2, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/2, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 27 | 4 | 1 | 3 | 1 | 1 | s2 | yes |
| s2 | 5 | 0 | 27 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 | scripted_trivial_scc |
| s1 | 1 | 5 | s2 | 27 | no | yes | right | push_ice, ice_stop_short:d1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=191, regions=8, solution commitments=2
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=2/2, optimal prefix=2/2, forced viable commitments=2/2
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 1 | 0 | 1 | forced optimal |
| 4 | r1 | r2 | 1 | 1 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 1 | 27 | 4 | 1 | 3 | 1 | 1 | r2 | no | yes | yes |
| r2 | 5 | 0 | 27 | 2 | 0 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 1 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_pass_through_d5:len1, slide_restart_after_group, ice_blocks_ice_no_chain_push, ice_stop_short:d1 |
| 2 | up | r1 | no | 1 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r1 | no | 1 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r1 | no | 1 | 4 | 1 | 3 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 5 | right | r2 | yes | 0 | 2 | 0 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_stop_short:d1 |
| 6 | up | r2 | no | 0 | 2 | 0 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r2 | no | 0 | 2 | 0 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 0 | 2 | 0 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r2 | no | 0 | 2 | 0 | 2 | 0 | 0 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r2 | no | 0 | 2 | 0 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
