# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: none

## Initial State

```text
##########
####PL####
##########
###BS@...#
#...M.MG.#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 4
- Depth: 4
- Explored states: 13
- Inputs: right right down right
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk pull_object:sticky#1 move_sticky_rigid
- Event counts: pull_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, sticky_to_box:n1=1, walk=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
##########
####PL####
##########
###BS@...#
#...M.MG.#
#........#
##########
```

After:

```text
##########
####PL####
##########
###.BS@..#
#...C.MG.#
#........#
##########
```

### Step 2: right

- Legal: true
- Events: pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
####PL####
##########
###.BS@..#
#...C.MG.#
#........#
##########
```

After:

```text
##########
####PL####
##########
###..BS@.#
#...C.MG.#
#........#
##########
```

### Step 4: right

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
####PL####
##########
###..BS..#
#...C.M+.#
#........#
##########
```

After:

```text
##########
####PL####
##########
###..BS..#
#...C..m@#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 3425
- Legal transitions: 8544
- Event-only illegal transitions: 0
- Winning states: 2008
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 3425
- Legal transitions: 8544
- Budget: maxStates=300000
- Compressed regions: 371
- Bidirectional transitions: 7550
- Commitment transitions: 852
- Winning regions: 239
- Initial region: r0, states=18, dist=1, internalBidirectional=40, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r3@4
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=225, edges=419, winReachable=213, winning=148, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=32, mergingWinSccs=84
- Handoff scriptiness: scope=returned_solution, scripted=2/2, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=36, dist=0, out=4, winOut=0, deadOut=0
- SCC path: s0@0 -> s1@1 -> s8@2

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 36 | 4 | 0 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s8 | yes |
| s8 | 2 | 0 | 69 | 11 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 36 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s8 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=3425, regions=371, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 1 | 3 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r3 | 1 | 9 | 0 | 2 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 1 | 18 | 3 | 3 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 1 | 34 | 9 | 9 | 0 | 2 | 2 | r3 | no | no | no |
| r3 | 4 | 0 | 32 | 10 | 10 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 1 | 3 | 3 | 0 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | right | r2 | yes | 1 | 9 | 9 | 0 | 2 | 2 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | down | r2 | no | 1 | 9 | 9 | 0 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 4 | right | r3 | yes | 0 | 10 | 10 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
