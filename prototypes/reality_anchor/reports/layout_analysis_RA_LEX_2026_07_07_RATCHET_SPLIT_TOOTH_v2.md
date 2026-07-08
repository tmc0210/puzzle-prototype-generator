# Level Analysis: RA_LEX_2026_07_07_RATCHET_SPLIT_TOOTH_v2

## Summary

- Prototype: reality_anchor
- Title: Ratchet split tooth v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
###G##LP.#
##..MM..@#
#...M....#
#...MM####
#.BS######
##########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 106
- Inputs: left left down right right up up left down right down left left left down left up
- Events: walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid sticky_to_box:n3 sticky_split:n1 walk walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull move_sticky_rigid
- Event counts: walk=11, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=6, push_object:push_pull_anchor=5, force_chain:n2=3, move_sticky_rigid=3, sticky_to_box:n3=1, sticky_split:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
###G##LP.#
##..MM@..#
#...M....#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##..MMLP.#
#...M.@..#
#...MM####
#.BS######
##########
```

### Step 9: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
###G##.@.#
##..MMLP.#
#...M....#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##..MM.@.#
#...M.LP.#
#...MM####
#.BS######
##########
```

### Step 12: left

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
###G##...#
##..MM...#
#...M.LP@#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##..MM...#
#...MLP@.#
#...MM####
#.BS######
##########
```

### Step 13: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
##########
###G##...#
##..MM...#
#...MLP@.#
#...MM####
#.BS######
##########
```

After:

```text
##########
###G##...#
##.MM....#
#..MLP@..#
#..MM.####
#.BS######
##########
```

### Step 14: left

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1

Before:

```text
##########
###G##...#
##.MM....#
#..MLP@..#
#..MM.####
#.BS######
##########
```

After:

```text
##########
###G##...#
##CM.....#
#.CLP@...#
#.CM..####
#.BS######
##########
```

### Step 17: up

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid

Before:

```text
##########
###G##...#
##CM.....#
#.CLP....#
#.CM@.####
#.BS######
##########
```

After:

```text
##########
###m##...#
##CLP....#
#.C.@....#
#.CM..####
#.BS######
##########
```


## Graph Facts

- Status: complete
- Reachable states: 359
- Legal transitions: 919
- Event-only illegal transitions: 0
- Winning states: 2
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 359
- Legal transitions: 919
- Budget: maxStates=500000
- Compressed regions: 62
- Bidirectional transitions: 824
- Commitment transitions: 95
- Winning regions: 2
- Initial region: r0, states=6, dist=7, internalBidirectional=12, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r2@3 -> r7@9 -> r10@12 -> r16@13 -> r18@14 -> r26@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 2
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=44, edges=62, winReachable=12, winning=2, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=0/4, branchingWinSccs=5, mergingWinSccs=4
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=21, dist=4, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s11@12 -> s12@13 -> s19@14 -> s25@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 21 | 4 | 2 | 2 | 0 | 0 | s11 | no |
| s11 | 12 | 3 | 9 | 1 | 1 | 0 | 2 | 2 | s12 | yes |
| s12 | 13 | 2 | 10 | 2 | 2 | 0 | 2 | 2 | s19 | no |
| s19 | 14 | 1 | 14 | 3 | 2 | 1 | 2 | 2 | s25 | no |
| s25 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 12 | s11 | 21 | no | no | left | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s11 | 12 | 13 | s12 | 9 | yes | yes | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | scripted_same_state_handoff |
| s12 | 13 | 14 | s19 | 10 | yes | no | left | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 | scripted_same_state_handoff |
| s19 | 14 | 17 | s25 | 14 | no | no | up | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=359, regions=62, solution commitments=7
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=2/7, optimal prefix=2/7, forced viable commitments=3/7
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 2 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 7 | 1 | 1 | 1 | forced optimal |
| 2 | r1 | r2 | 6 | 1 | 0 | 1 | forced optimal |
| 8 | r2 | r7 | 5 | 3 | 1 | 2 | multiple optimal choices |
| 11 | r7 | r10 | 4 | 2 | 0 | 1 | forced optimal |
| 12 | r10 | r16 | 3 | 1 | 0 | 1 | forced optimal |
| 13 | r16 | r18 | 2 | 2 | 0 | 1 | forced optimal |
| 16 | r18 | r26 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 7 | 6 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 6 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 3 | 5 | 7 | 4 | 3 | 1 | 2 | 2 | r7 | no | no | no |
| r7 | 9 | 4 | 6 | 2 | 2 | 0 | 1 | 1 | r10 | no | no | yes |
| r10 | 12 | 3 | 9 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes |
| r16 | 13 | 2 | 10 | 2 | 2 | 0 | 1 | 1 | r18 | no | no | yes |
| r18 | 14 | 1 | 14 | 3 | 2 | 1 | 1 | 1 | r26 | no | no | yes |
| r26 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 7 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | left | r0 | no | 7 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | left | r1 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 3 | down | r2 | yes | 5 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 4 | right | r2 | no | 5 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r2 | no | 5 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r2 | no | 5 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | up | r2 | no | 5 | 4 | 3 | 1 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | left | r2 | no | 5 | 4 | 3 | 1 | 2 | 2 | r7 | yes | yes | yes | yes | no | no | walk |
| 9 | down | r7 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 10 | right | r7 | no | 4 | 2 | 2 | 0 | 1 | 1 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r7 | no | 4 | 2 | 2 | 0 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 12 | left | r10 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r16 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 13 | left | r16 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r18 | yes | yes | yes | yes | no | yes | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |
| 14 | left | r18 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid, sticky_to_box:n3, sticky_split:n1 |
| 15 | down | r18 | no | 1 | 3 | 2 | 1 | 1 | 1 | r18 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r18 | no | 1 | 3 | 2 | 1 | 1 | 1 | r26 | yes | yes | yes | yes | no | yes | walk |
| 17 | up | r26 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

### K_runtime_smoke

Reality Anchor v0 runtime smoke behavior is executable through the registered adapter.

- Required events: none
- Forbidden events: none
- Detector configured: false
- Returned solution covers detector: true
- Shortest bypass: not checked (No event detector is configured for this target.)
- Winning bypass: not checked (No event detector is configured for this target.)


## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
