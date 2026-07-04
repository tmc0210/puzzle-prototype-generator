# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v2

## Summary

- Prototype: reality_anchor
- Title: RA_EXP_2026_07_04_FIXED_PL_PULL_HANDLE_v2
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
#...M.MGG.#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 7
- Depth: 7
- Explored states: 76
- Inputs: right right right right down left down
- Events: pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk walk pull_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: pull_object:box_sticky_anchor=5, anchor_boundary_shift:box_sticky=5, sticky_to_box:n1=2, walk=2

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
#...C.CBS.#
#.......@.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 8132
- Legal transitions: 20653
- Event-only illegal transitions: 0
- Winning states: 1773
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 8132
- Legal transitions: 20653
- Budget: maxStates=500000
- Compressed regions: 911
- Bidirectional transitions: 17712
- Commitment transitions: 2410
- Winning regions: 174
- Initial region: r0, states=21, dist=2, internalBidirectional=50, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r4@4 -> r14@7
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=315, edges=692, winReachable=254, winning=64, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=90, mergingWinSccs=117
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=1, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=63, dist=1, out=4, winOut=4, deadOut=0
- SCC path: s0@0 -> s1@1 -> s11@2 -> s29@7

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 63 | 4 | 4 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 1 | 1 | 1 | 0 | 1 | 1 | s11 | yes |
| s11 | 2 | 1 | 185 | 16 | 16 | 0 | 2 | 2 | s29 | no |
| s29 | 7 | 0 | 21 | 3 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 63 | yes | no | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |
| s1 | 1 | 2 | s11 | 1 | yes | yes | right | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | scripted_trivial_scc |
| s11 | 2 | 7 | s29 | 185 | no | no | down | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=8132, regions=911, solution commitments=4
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=0/4, forced viable commitments=1/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 2 | 3 | 0 | 1 | multiple viable choices |
| 1 | r1 | r2 | 3 | 1 | 0 | 1 | forced optimal |
| 3 | r2 | r4 | 2 | 10 | 0 | 1 | forced optimal |
| 6 | r4 | r14 | 1 | 6 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 21 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 2 | 40 | 10 | 10 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 4 | 1 | 19 | 6 | 6 | 0 | 1 | 1 | r14 | no | no | yes |
| r14 | 7 | 0 | 21 | 3 | 3 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | right | r2 | yes | 2 | 10 | 10 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 3 | right | r2 | no | 2 | 10 | 10 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 4 | right | r4 | yes | 1 | 6 | 6 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | down | r4 | no | 1 | 6 | 6 | 0 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r4 | no | 1 | 6 | 6 | 0 | 1 | 1 | r14 | yes | yes | yes | yes | no | yes | walk |
| 7 | down | r14 | yes | 0 | 3 | 3 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

## Counterfactuals

No counterfactual models are configured.

## Target Event Checks

No level targets are declared.

## LLM Reviewer Material

- Treat this report as evidence, not as a quality verdict.
- Read the key snapshots as candidate causal-chain nodes.
- Check whether each non-walk event produces a later consumed state change.
- Look for redundant space, forced weak edges, repeated same-operation padding, and bypass paths.
