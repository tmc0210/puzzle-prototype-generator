# Level Analysis: RA_CURR_L11_CARRY_CUT_TEMPLATE_G

## Summary

- Prototype: reality_anchor
- Title: RA_CURR_L11_CARRY_CUT_TEMPLATE_G
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#.........#
#.........#
#.........#
#.B..C.G..#
#.S##M..G.#
#.@########
###########
```

## Shortest Solution

- Found: yes
- Cost: 8
- Depth: 8
- Explored states: 221
- Inputs: up left up right right right right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky box_to_sticky:n1 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor anchor_boundary_shift:box_sticky push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=6, anchor_boundary_shift:box_sticky=6, box_to_sticky:n1=1, sticky_merge:n1=1, walk=2, force_chain:n2=3, move_sticky_rigid=3

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
#.........#
#.........#
#.........#
#.B..C.G..#
#.S##M..G.#
#.@########
###########
```

After:

```text
###########
#.........#
#.........#
#.B.......#
#.S..M.G..#
#.@##M..G.#
#..########
###########
```

### Step 4: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#.........#
#.........#
#.B.......#
#@S..M.G..#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#..B......#
#.@S.M.G..#
#..##M..G.#
#..########
###########
```

### Step 5: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky

Before:

```text
###########
#.........#
#.........#
#..B......#
#.@S.M.G..#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#...B.....#
#..@SM.G..#
#..##M..G.#
#..########
###########
```

### Step 6: right

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#...B.....#
#..@SM.G..#
#..##M..G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#....B....#
#...@SMG..#
#..##.M.G.#
#..########
###########
```

### Step 7: right

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#....B....#
#...@SMG..#
#..##.M.G.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#.....B...#
#....@Sm..#
#..##..MG.#
#..########
###########
```

### Step 8: right

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
#.........#
#.........#
#.....B...#
#....@Sm..#
#..##..MG.#
#..########
###########
```

After:

```text
###########
#.........#
#.........#
#......B..#
#.....@SM.#
#..##...m.#
#..########
###########
```


## Graph Facts

- Status: complete
- Reachable states: 286966
- Legal transitions: 923917
- Event-only illegal transitions: 0
- Winning states: 4955
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 286966
- Legal transitions: 923917
- Budget: maxStates=300000
- Compressed regions: 7020
- Bidirectional transitions: 874542
- Commitment transitions: 49375
- Winning regions: 121
- Initial region: r0, states=41, dist=5, internalBidirectional=126, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r4@4 -> r8@5 -> r13@6 -> r19@7 -> r24@8
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=463, edges=1561, winReachable=49, winning=37, winSubgraph=branching_win_dag
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=3, mergingWinSccs=35
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=49162, dist=0, out=43, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 49162 | 43 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=286966, regions=7020, solution commitments=6
- Opening: commitments=5, viable=4, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/6, optimal prefix=1/6, forced viable commitments=0/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 5 | 4 | 1 | 1 | forced optimal |
| 3 | r1 | r4 | 4 | 5 | 0 | 1 | multiple viable choices |
| 4 | r4 | r8 | 4 | 3 | 0 | 1 | forced optimal |
| 5 | r8 | r13 | 3 | 2 | 0 | 1 | forced optimal |
| 6 | r13 | r19 | 2 | 4 | 0 | 1 | forced optimal |
| 7 | r19 | r24 | 1 | 6 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 5 | 41 | 5 | 4 | 1 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 4 | 41 | 5 | 5 | 0 | 1 | 1 | r4 | no | no | no |
| r4 | 4 | 4 | 41 | 3 | 3 | 0 | 1 | 1 | r8 | no | no | yes |
| r8 | 5 | 3 | 41 | 2 | 2 | 0 | 1 | 1 | r13 | no | no | yes |
| r13 | 6 | 2 | 40 | 4 | 4 | 0 | 1 | 1 | r19 | no | no | yes |
| r19 | 7 | 1 | 41 | 6 | 6 | 0 | 1 | 1 | r24 | no | no | yes |
| r24 | 8 | 0 | 41 | 6 | 4 | 2 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 5 | 5 | 4 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | up | r1 | yes | 4 | 5 | 5 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, box_to_sticky:n1, sticky_merge:n1 |
| 2 | left | r1 | no | 4 | 5 | 5 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 4 | 5 | 5 | 0 | 1 | 1 | r4 | yes | yes | no | no | no | no | walk |
| 4 | right | r4 | yes | 4 | 3 | 3 | 0 | 1 | 1 | r8 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 5 | right | r8 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky |
| 6 | right | r13 | yes | 2 | 4 | 4 | 0 | 1 | 1 | r19 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 7 | right | r19 | yes | 1 | 6 | 6 | 0 | 1 | 1 | r24 | yes | yes | yes | yes | no | yes | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 8 | right | r24 | yes | 0 | 6 | 4 | 2 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |

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
