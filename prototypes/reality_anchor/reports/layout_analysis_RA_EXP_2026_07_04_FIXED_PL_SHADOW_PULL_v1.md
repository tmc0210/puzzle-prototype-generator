# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v1

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L shadow pull v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#...#....#
#.#.GG#@.#
##..MC...#
#L#.#....#
#P#.SB...#
##########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 650
- Inputs: up left left down left left down down down right left up up up right right up
- Events: walk walk walk walk walk walk walk walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk walk walk walk walk pull_object:sticky#1 move_sticky_rigid
- Event counts: walk=15, push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, box_to_sticky:n1=1, sticky_merge:n1=1, pull_object:sticky#1=1, move_sticky_rigid=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 10: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
##########
#...#....#
#.#.GG#..#
##..MC...#
#L#.#....#
#P#@SB...#
##########
```

After:

```text
##########
#...#....#
#.#.GG#..#
##..MM...#
#L#.#....#
#P#.@SB..#
##########
```

### Step 17: up

- Legal: true
- Events: pull_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#...#....#
#.#.G+#..#
##..MM...#
#L#.#....#
#P#..SB..#
##########
```

After:

```text
##########
#...#@...#
#.#.mm#..#
##.......#
#L#.#....#
#P#..SB..#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 50156
- Legal transitions: 116470
- Event-only illegal transitions: 0
- Winning states: 5293
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 50156
- Legal transitions: 116470
- Budget: maxStates=400000
- Compressed regions: 4190
- Bidirectional transitions: 100618
- Commitment transitions: 11372
- Winning regions: 378
- Initial region: r0, states=16, dist=3, internalBidirectional=40, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r2@4 -> r10@10 -> r84@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 3

### SCC Irreversible Progress

- Shape: sccs=1112, edges=1330, winReachable=172, winning=123, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=8, mergingWinSccs=40
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=44590, dist=0, out=822, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 44590 | 822 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=50156, regions=4190, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=3/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r2 | 3 | 3 | 0 | 1 | forced optimal |
| 9 | r2 | r10 | 2 | 2 | 1 | 1 | forced optimal |
| 16 | r10 | r84 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 16 | 3 | 3 | 0 | 1 | 1 | r2 | no | no | yes |
| r2 | 4 | 2 | 10 | 3 | 2 | 1 | 1 | 1 | r10 | no | no | yes |
| r10 | 10 | 1 | 11 | 3 | 2 | 1 | 1 | 1 | r84 | no | no | yes |
| r84 | 17 | 0 | 27 | 4 | 4 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | no | yes | walk |
| 4 | down | r2 | yes | 2 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r2 | no | 2 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | left | r2 | no | 2 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r2 | no | 2 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r2 | no | 2 | 3 | 2 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 2 | 3 | 2 | 1 | 1 | 1 | r10 | yes | yes | yes | yes | no | yes | walk |
| 10 | right | r10 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 11 | left | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | up | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | right | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r10 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r10 | no | 1 | 3 | 2 | 1 | 1 | 1 | r84 | yes | yes | yes | yes | no | yes | walk |
| 17 | up | r84 | yes | 0 | 4 | 4 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:sticky#1, move_sticky_rigid |

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
