# Level Analysis: worker_round53_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: worker_round53_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##########
.#......I@
#...#.#..#
....*...##
#........#
#...I....#
#.........
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 53
- Inputs: left left left left left left left left left
- Events: push_ice ice_destroy_group_d6_plus:len1 slide_restart_after_group ice_boundary_disappear:d1 walk walk walk walk walk walk walk walk
- Event counts: push_ice=1, ice_destroy_group_d6_plus:len1=1, slide_restart_after_group=1, ice_boundary_disappear:d1=1, walk=8

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1

Before:

```text
##########
.#......I@
#...#.#..#
....*...##
#........#
#...I....#
#.........
#........#
##########
```

After:

```text
##########
........@.
#...#.#..#
....*...##
#........#
#...I....#
#.........
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 1680
- Legal transitions: 5269
- Event-only illegal transitions: 33
- Winning states: 15
- Budget: maxStates=50000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1680
- Legal transitions: 5269
- Budget: maxStates=50000
- Compressed regions: 31
- Bidirectional transitions: 5188
- Commitment transitions: 81
- Winning regions: 15
- Initial region: r0, states=1, dist=1, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=31, edges=61, winReachable=18, winning=15, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=1, forcedWinPrefix=1/1, branchingWinSccs=0, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=1/1, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=1, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 0 | 55 | 5 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=1680, regions=31, solution commitments=1
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/1, optimal prefix=1/1, forced viable commitments=1/1
- Endgame tail: 8 step(s) after first entering a winning region
- Reading hints: near-discovery shape; all solution commitments are forced viable progress; all solution commitments are forced optimal progress; 8 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 0 | 55 | 5 | 5 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_destroy_group_d6_plus:len1, slide_restart_after_group, ice_boundary_disappear:d1 |
| 2 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r1 | no | 0 | 5 | 5 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
