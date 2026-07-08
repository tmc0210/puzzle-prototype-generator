# Level Analysis: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_wall_y3x6

## Summary

- Prototype: reality_anchor
- Title: Split bridge dual endpoint v1 wall y3x6
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
########
####G###
###.MM@#
##G.M.##
###.MM##
####G###
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 36
- Inputs: left down left up down down up left
- Events: push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#2 move_sticky_rigid walk push_object:crate#2
- Event counts: push_object:sticky#1=2, move_sticky_rigid=3, sticky_to_box:n3=1, sticky_split:n1=1, walk=4, push_object:sticky#2=1, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
########
####G###
###.MM@#
##G.M.##
###.MM##
####G###
###BS###
########
```

After:

```text
########
####G###
###CM@.#
##GC..##
###CM.##
####G###
###BS###
########
```

### Step 4: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
########
####G###
###CM..#
##GC@.##
###CM.##
####G###
###BS###
########
```

After:

```text
########
####m###
###C@..#
##GC..##
###CM.##
####G###
###BS###
########
```

### Step 6: down

- Legal: true
- Events: push_object:sticky#2, move_sticky_rigid

Before:

```text
########
####m###
###C...#
##GC@.##
###CM.##
####G###
###BS###
########
```

After:

```text
########
####m###
###C...#
##GC..##
###C@.##
####m###
###BS###
########
```

### Step 8: left

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
####m###
###C...#
##GC@.##
###C..##
####m###
###BS###
########
```

After:

```text
########
####m###
###C...#
##*@..##
###C..##
####m###
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 48
- Legal transitions: 99
- Event-only illegal transitions: 0
- Winning states: 3
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 48
- Legal transitions: 99
- Budget: maxStates=300000
- Compressed regions: 11
- Bidirectional transitions: 86
- Commitment transitions: 13
- Winning regions: 3
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@4 -> r5@6 -> r8@8
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=11, edges=13, winReachable=11, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=1/4, branchingWinSccs=4, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=1/4, trivial=1, sameEntryExit=1, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=1, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s6@4 -> s9@6 -> s10@8

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 3 | 5 | 3 | 3 | 0 | 1 | 1 | s6 | no |
| s6 | 4 | 2 | 6 | 2 | 2 | 0 | 1 | 1 | s9 | no |
| s9 | 6 | 1 | 7 | 1 | 1 | 0 | 2 | 2 | s10 | yes |
| s10 | 8 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | scripted_trivial_scc |
| s1 | 1 | 4 | s6 | 5 | no | no | up | push_object:sticky#1, move_sticky_rigid | has_reposition_room |
| s6 | 4 | 6 | s9 | 6 | no | no | down | push_object:sticky#2, move_sticky_rigid | has_reposition_room |
| s9 | 6 | 8 | s10 | 7 | no | yes | left | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=48, regions=11, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=1/4, forced viable commitments=2/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 3 | 3 | 0 | 3 | multiple optimal choices |
| 5 | r2 | r5 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 7 | r5 | r8 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 5 | 3 | 3 | 0 | 3 | 3 | r2 | no | no | no |
| r2 | 4 | 2 | 6 | 2 | 2 | 0 | 2 | 2 | r5 | no | no | no |
| r5 | 6 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes |
| r8 | 8 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | left | r1 | yes | 3 | 3 | 3 | 0 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |
| 2 | down | r1 | no | 3 | 3 | 3 | 0 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 3 | 3 | 3 | 0 | 3 | 3 | r2 | yes | yes | yes | yes | no | no | walk |
| 4 | up | r2 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | down | r2 | no | 2 | 2 | 2 | 0 | 2 | 2 | r5 | yes | yes | yes | yes | no | no | walk |
| 6 | down | r5 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#2, move_sticky_rigid |
| 7 | up | r5 | no | 1 | 1 | 1 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | yes | yes | walk |
| 8 | left | r8 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
