# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v4

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v4
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
###########
####PL#####
###########
###BS@....#
######....#
#...M.MGG.#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 147
- Inputs: right right right right down left down down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: pull_object:box_sticky_anchor=6, anchor_boundary_shift:box_sticky=6, sticky_to_box:n1=2, walk=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
####PL#####
###########
###BS@....#
######....#
#...M.MGG.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.BS@...#
######....#
#...C.MGG.#
#.........#
###########
```

### Step 2: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
####PL#####
###########
###.BS@...#
######....#
#...C.MGG.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###..BS@..#
######....#
#...C.MGG.#
#.........#
###########
```

### Step 3: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
####PL#####
###########
###..BS@..#
######....#
#...C.MGG.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###...BS@.#
######....#
#...C.CGG.#
#.........#
###########
```

### Step 4: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
####PL#####
###########
###...BS@.#
######....#
#...C.CGG.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###....BS@#
######....#
#...C.CGG.#
#.........#
###########
```

### Step 7: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
####PL#####
###########
###....BS.#
######..@.#
#...C.CGG.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.......#
######.BS.#
#...C.CG+.#
#.........#
###########
```

### Step 8: down

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
####PL#####
###########
###.......#
######.BS.#
#...C.CG+.#
#.........#
###########
```

After:

```text
###########
####PL#####
###########
###.......#
######....#
#...C.CBS.#
#.......@.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 9022
- Legal transitions: 21981
- Event-only illegal transitions: 0
- Winning states: 1868
- Budget: maxStates=600000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9022
- Legal transitions: 21981
- Budget: maxStates=600000
- Compressed regions: 1012
- Bidirectional transitions: 18960
- Commitment transitions: 2378
- Winning regions: 216
- Initial region: r0, states=1, dist=4, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@2 -> r5@3 -> r7@4 -> r21@7 -> r29@8
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=337, edges=598, winReachable=162, winning=40, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=1/5, branchingWinSccs=59, mergingWinSccs=64
- Handoff scriptiness: scope=returned_solution, scripted=4/5, trivial=1, sameEntryExit=4, forcedScripted=1, maxRun=4
- Initial SCC: s0, states=1, dist=2, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s28@2 -> s36@3 -> s41@4 -> s46@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 1 | 120 | 5 | 5 | 0 | 1 | 1 | s28 | no |
| s28 | 2 | 1 | 92 | 5 | 4 | 1 | 3 | 3 | s36 | no |
| s36 | 3 | 1 | 66 | 5 | 5 | 0 | 4 | 4 | s41 | no |
| s41 | 4 | 1 | 65 | 6 | 3 | 3 | 3 | 3 | s46 | no |
| s46 | 7 | 0 | 656 | 22 | 0 | 0 | 9 | 9 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 2 | s28 | 120 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s28 | 2 | 3 | s36 | 92 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s36 | 3 | 4 | s41 | 66 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_same_state_handoff |
| s41 | 4 | 7 | s46 | 65 | no | no | down | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9022, regions=1012, solution commitments=6
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/6, optimal prefix=1/6, forced viable commitments=1/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 1 | r1 | r3 | 3 | 2 | 0 | 2 | multiple optimal choices |
| 2 | r3 | r5 | 2 | 3 | 0 | 1 | multiple viable choices |
| 3 | r5 | r7 | 3 | 4 | 0 | 1 | forced optimal |
| 6 | r7 | r21 | 2 | 4 | 1 | 2 | multiple optimal choices |
| 7 | r21 | r29 | 1 | 4 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 1 | 2 | 2 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 2 | 2 | 23 | 3 | 3 | 0 | 1 | 1 | r5 | no | no | no |
| r5 | 3 | 3 | 22 | 4 | 4 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 4 | 2 | 21 | 5 | 4 | 1 | 2 | 2 | r21 | no | no | no |
| r21 | 7 | 1 | 23 | 4 | 4 | 0 | 1 | 1 | r29 | no | no | yes |
| r29 | 8 | 0 | 25 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | right | r3 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r5 | yes | yes | no | no | no | no | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r5 | yes | 3 | 4 | 4 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | right | r7 | yes | 2 | 5 | 4 | 1 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | down | r7 | no | 2 | 5 | 4 | 1 | 2 | 2 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r7 | no | 2 | 5 | 4 | 1 | 2 | 2 | r21 | yes | yes | yes | yes | no | no | walk |
| 7 | down | r21 | yes | 1 | 4 | 4 | 0 | 1 | 1 | r29 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 8 | down | r29 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
