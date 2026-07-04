# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L split lift v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
##.....@..#
#P#....B..#
#L#.G..S..#
####m#....#
####M#....#
###########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 102
- Inputs: right down left left left
- Events: walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky
- Event counts: walk=2, push_object:box_sticky_anchor=3, anchor_boundary_shift:box_sticky=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 3: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
##........#
#P#....B@.#
#L#.G..S..#
####m#....#
####M#....#
###########
```

After:

```text
###########
##........#
#P#...B@..#
#L#.G.S...#
####m#....#
####M#....#
###########
```

### Step 4: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
##........#
#P#...B@..#
#L#.G.S...#
####m#....#
####M#....#
###########
```

After:

```text
###########
##........#
#P#..B@...#
#L#.GS....#
####m#....#
####M#....#
###########
```

### Step 5: left

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
##........#
#P#..B@...#
#L#.GS....#
####m#....#
####M#....#
###########
```

After:

```text
###########
##........#
#P#.B@....#
#L#.S.....#
####m#....#
####M#....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 16869
- Legal transitions: 46903
- Event-only illegal transitions: 0
- Winning states: 406
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 16869
- Legal transitions: 46903
- Budget: maxStates=400000
- Compressed regions: 841
- Bidirectional transitions: 42208
- Commitment transitions: 3131
- Winning regions: 11
- Initial region: r0, states=55, dist=0, internalBidirectional=142, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=0, optimalCommitments=0
- Solution region path: r0@0 -> r3@3 -> r7@4 -> r9@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=190, edges=344, winReachable=21, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=7, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=358, dist=0, out=2, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 358 | 2 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=16869, regions=841, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=0
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=0/3
- Endgame tail: 5 step(s) after first entering a winning region
- Reading hints: 5 trailing step(s) after entering a winning region

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 2 | r0 | r3 | 0 | 3 | 0 | 0 | multiple viable choices |
| 3 | r3 | r7 | 0 | 4 | 0 | 0 | multiple viable choices |
| 4 | r7 | r9 | 1 | 3 | 0 | 3 | multiple optimal choices |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 0 | 55 | 3 | 3 | 0 | 0 | 0 | r3 | no | no | no |
| r3 | 3 | 0 | 55 | 4 | 4 | 0 | 0 | 0 | r7 | no | no | no |
| r7 | 4 | 1 | 27 | 3 | 3 | 0 | 3 | 3 | r9 | no | no | no |
| r9 | 5 | 0 | 28 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 0 | 3 | 3 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | right | r0 | no | 0 | 3 | 3 | 0 | 0 | 0 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | down | r0 | no | 0 | 3 | 3 | 0 | 0 | 0 | r3 | yes | yes | no | no | no | no | walk |
| 3 | left | r3 | yes | 0 | 4 | 4 | 0 | 0 | 0 | r7 | yes | yes | no | no | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 4 | left | r7 | yes | 1 | 3 | 3 | 0 | 3 | 3 | r9 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | left | r9 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |

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
