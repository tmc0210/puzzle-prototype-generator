# Level Analysis: RA_EXP_2026_07_04_STICKY_SHADOW_HANDLE_v2

## Summary

- Prototype: reality_anchor
- Title: Sticky shadow handle v2
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#........#
#.#.GG#@.#
#...MC...#
#...#....#
#...SB...#
##########
```

## Shortest Solution

- Found: yes
- Cost: 13
- Depth: 13
- Explored states: 1019
- Inputs: up left left down left left down down down right right up up
- Events: walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky walk push_object:sticky#1 move_sticky_rigid
- Event counts: walk=10, push_object:box_sticky_anchor=2, anchor_boundary_shift:box_sticky=2, box_to_sticky:n1=1, sticky_merge:n1=1, push_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#........#
#.#.GG#..#
#...MC...#
#...#....#
#..@SB...#
##########
```

After:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#...@SB..#
##########
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#...@SB..#
##########
```

After:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#....#
#....@SB.#
##########
```

### Step 13: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#.#.GG#..#
#...MM...#
#...#@...#
#.....SB.#
##########
```

After:

```text
##########
#........#
#.#.mm#..#
#....@...#
#...#....#
#.....SB.#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 130884
- Legal transitions: 376968
- Event-only illegal transitions: 0
- Winning states: 231
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 130884
- Legal transitions: 376968
- Budget: maxStates=300000
- Compressed regions: 4005
- Bidirectional transitions: 356972
- Commitment transitions: 19996
- Winning regions: 7
- Initial region: r0, states=33, dist=2, internalBidirectional=90, commitments=6, viableCommitments=6, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r41@10 -> r61@11 -> r116@13
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=391, edges=1354, winReachable=9, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=3, mergingWinSccs=3
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=15343, dist=0, out=55, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 15343 | 55 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=130884, regions=4005, solution commitments=3
- Opening: commitments=6, viable=6, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=1/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 9 | r0 | r41 | 2 | 6 | 0 | 1 | forced optimal |
| 10 | r41 | r61 | 1 | 5 | 0 | 1 | multiple viable choices |
| 12 | r61 | r116 | 1 | 5 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 33 | 6 | 6 | 0 | 1 | 1 | r41 | no | no | yes |
| r41 | 10 | 1 | 33 | 5 | 5 | 0 | 1 | 1 | r61 | no | no | no |
| r61 | 11 | 1 | 33 | 5 | 5 | 0 | 1 | 1 | r116 | no | no | yes |
| r116 | 13 | 0 | 33 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r0 | no | 2 | 6 | 6 | 0 | 1 | 1 | r41 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r41 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r61 | yes | yes | no | no | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 11 | right | r61 | yes | 1 | 5 | 5 | 0 | 1 | 1 | r61 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 12 | up | r61 | no | 1 | 5 | 5 | 0 | 1 | 1 | r116 | yes | yes | yes | yes | no | yes | walk |
| 13 | up | r116 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
