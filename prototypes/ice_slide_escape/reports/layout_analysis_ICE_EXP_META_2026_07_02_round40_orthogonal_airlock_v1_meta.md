# Level Analysis: ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_meta

## Summary

- Prototype: ice_slide_escape
- Title: ICE_EXP_META_2026_07_02_round40_orthogonal_airlock_v1_meta
- Role: challenge
- Status: candidate
- Support: none
- Win: ice_slide_escape_explicit_goal
- Targets: none

## Initial State

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I@
.........*....
#########.#.##
##############
```

## Shortest Solution

- Found: yes
- Cost: 16
- Depth: 16
- Explored states: 172
- Inputs: down left left left left up up right up up left down right right right right
- Events: walk walk walk walk push_ice ice_boundary_disappear:d9 walk walk walk walk walk walk push_ice ice_rebound_d4 walk walk walk walk
- Event counts: walk=14, push_ice=2, ice_boundary_disappear:d9=1, ice_rebound_d4=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: left

- Legal: true
- Events: push_ice, ice_boundary_disappear:d9

Before:

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I.
.........*@...
#########.#.##
##############
```

After:

```text
##############
#########...##
#########I....
#########..#.#
#########.#*I.
.........+....
#########.#.##
##############
```

### Step 12: down

- Legal: true
- Events: push_ice, ice_rebound_d4

Before:

```text
##############
#########@..##
#########I....
#########..#.#
#########.#*I.
.........G....
#########.#.##
##############
```

After:

```text
##############
#########...##
#########@....
#########..#.#
#########.#*I.
.........*....
#########.#.##
##############
```


## Graph Facts

- Status: complete
- Reachable states: 481
- Legal transitions: 1077
- Event-only illegal transitions: 63
- Winning states: 4
- Budget: maxStates=100000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 481
- Legal transitions: 1077
- Budget: maxStates=100000
- Compressed regions: 21
- Bidirectional transitions: 1040
- Commitment transitions: 37
- Winning regions: 4
- Initial region: r0, states=6, dist=2, internalBidirectional=10, commitments=2, viableCommitments=2, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@5 -> r6@12
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=21, edges=33, winReachable=11, winning=4, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=4, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=6, dist=2, out=2, winOut=2, deadOut=0
- SCC path: s0@0 -> s1@5 -> s3@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 6 | 2 | 2 | 0 | 0 | 0 | s1 | no |
| s1 | 5 | 1 | 28 | 4 | 3 | 1 | 1 | 1 | s3 | no |
| s3 | 12 | 0 | 12 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 6 | no | no | left | push_ice, ice_boundary_disappear:d9 | has_reposition_room |
| s1 | 5 | 12 | s3 | 28 | no | no | down | push_ice, ice_rebound_d4 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=481, regions=21, solution commitments=2
- Opening: commitments=2, viable=2, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/2, optimal prefix=2/2, forced viable commitments=0/2
- Endgame tail: 4 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress; 4 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r2 | 2 | 2 | 0 | 1 | forced optimal |
| 11 | r2 | r6 | 1 | 3 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 6 | 2 | 2 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 5 | 1 | 28 | 4 | 3 | 1 | 1 | 1 | r6 | no | no | yes |
| r6 | 12 | 0 | 12 | 2 | 1 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 2 | 2 | 2 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 5 | left | r2 | yes | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_boundary_disappear:d9 |
| 6 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | left | r2 | no | 1 | 4 | 3 | 1 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 12 | down | r6 | yes | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_ice, ice_rebound_d4 |
| 13 | right | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r6 | no | 0 | 2 | 1 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | walk |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
