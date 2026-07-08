# Level Analysis: RA_LEX_2026_07_08_SPLIT_BRIDGE_DUAL_ENDPOINT_v1_no_lower_goal

## Summary

- Prototype: reality_anchor
- Title: Split bridge dual endpoint v1 no lower goal
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
##G.M..#
###.MM##
########
###BS###
########
```

## Shortest Solution

- Found: yes
- Cost: 6
- Depth: 6
- Explored states: 15
- Inputs: down left left up down left
- Events: walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n3 sticky_split:n1 push_object:sticky#1 move_sticky_rigid walk push_object:crate#2
- Event counts: walk=3, push_object:sticky#1=2, move_sticky_rigid=2, sticky_to_box:n3=1, sticky_split:n1=1, push_object:crate#2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
########
####G###
###.MM.#
##G.M@.#
###.MM##
########
###BS###
########
```

After:

```text
########
####G###
###CM..#
##GC@..#
###CM.##
########
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
##GC@..#
###CM.##
########
###BS###
########
```

After:

```text
########
####m###
###C@..#
##GC...#
###CM.##
########
###BS###
########
```

### Step 6: left

- Legal: true
- Events: push_object:crate#2

Before:

```text
########
####m###
###C...#
##GC@..#
###CM.##
########
###BS###
########
```

After:

```text
########
####m###
###C...#
##*@...#
###CM.##
########
###BS###
########
```


## Graph Facts

- Status: complete
- Reachable states: 25
- Legal transitions: 52
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 25
- Legal transitions: 52
- Budget: maxStates=300000
- Compressed regions: 6
- Bidirectional transitions: 46
- Commitment transitions: 6
- Winning regions: 2
- Initial region: r0, states=3, dist=3, internalBidirectional=4, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@3 -> r2@4 -> r4@6
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=6, edges=5, winReachable=6, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=1, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=3, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@3 -> s4@4 -> s5@6

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 3 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 3 | 2 | 6 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 4 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 6 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 3 | s1 | 3 | no | yes | left | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | has_reposition_room |
| s1 | 3 | 4 | s4 | 6 | yes | no | up | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |
| s4 | 4 | 6 | s5 | 7 | no | yes | left | push_object:crate#2 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=25, regions=6, solution commitments=3
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/3, optimal prefix=1/3, forced viable commitments=2/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r1 | 3 | 1 | 0 | 1 | forced optimal |
| 3 | r1 | r2 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 5 | r2 | r4 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 3 | 2 | 6 | 2 | 2 | 0 | 2 | 2 | r2 | no | no | no |
| r2 | 4 | 1 | 7 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes |
| r4 | 6 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 3 | left | r1 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r2 | yes | yes | yes | yes | no | no | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |
| 4 | up | r2 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | down | r2 | no | 1 | 1 | 1 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | walk |
| 6 | left | r4 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
