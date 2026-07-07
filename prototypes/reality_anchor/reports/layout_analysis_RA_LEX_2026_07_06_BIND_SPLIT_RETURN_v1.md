# Level Analysis: RA_LEX_2026_07_06_BIND_SPLIT_RETURN_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_BIND_SPLIT_RETURN_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#........#
#B#C...G.#
#S#..G...#
##.M.G...#
##.M.....#
#..@.....#
##########
```

## Shortest Solution

- Found: yes
- Cost: 25
- Depth: 25
- Explored states: 69681
- Inputs: up left up right up right up up left down down down left down right right down right up left up up up right right
- Events: push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid walk push_object:sticky#1 move_sticky_rigid walk walk walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid walk walk push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid sticky_merge:n1 walk walk push_object:sticky#1 move_sticky_rigid sticky_to_box:n1 walk walk walk walk push_object:crate#1 push_object:crate#1
- Event counts: push_object:sticky#1=8, move_sticky_rigid=8, walk=14, push_object:crate#1=3, box_to_sticky:n1=1, sticky_merge:n1=1, sticky_to_box:n1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#C...G.#
#S#..G...#
##.M.G...#
##.M.....#
#..@.....#
##########
```

After:

```text
##########
#........#
#B#C...G.#
#S#M.G...#
##.M.G...#
##.@.....#
#........#
##########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#C...G.#
#S#M.G...#
##@M.G...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#C...G.#
#S#.MG...#
##.@MG...#
##.......#
#........#
##########
```

### Step 6: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#C...G.#
#S#@MG...#
##..MG...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#C...G.#
#S#.@m...#
##...m...#
##.......#
#........#
##########
```

### Step 10: down

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
##########
#..@.....#
#B#C...G.#
#S#..m...#
##...m...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#@...G.#
#S#M.m...#
##...m...#
##.......#
#........#
##########
```

### Step 11: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#@...G.#
#S#M.m...#
##...m...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#....G.#
#S#@.m...#
##.M.m...#
##.......#
#........#
##########
```

### Step 12: down

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#....G.#
#S#@.m...#
##.M.m...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#....G.#
#S#..m...#
##.@.m...#
##.M.....#
#........#
##########
```

### Step 15: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
##########
#........#
#B#....G.#
#S#..m...#
##...m...#
##@M.....#
#........#
##########
```

After:

```text
##########
#........#
#B#....G.#
#S#..m...#
##...m...#
##.@M....#
#........#
##########
```

### Step 16: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_merge:n1

Before:

```text
##########
#........#
#B#....G.#
#S#..m...#
##...m...#
##.@M....#
#........#
##########
```

After:

```text
##########
#........#
#B#....G.#
#S#..m...#
##...m...#
##..@M...#
#........#
##########
```

### Step 19: up

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1

Before:

```text
##########
#........#
#B#....G.#
#S#..m...#
##...m...#
##...M...#
#....@...#
##########
```

After:

```text
##########
#........#
#B#..C.G.#
#S#..m...#
##...m...#
##...@...#
#........#
##########
```

### Step 24: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#........#
#B#.@C.G.#
#S#..m...#
##...m...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#..@CG.#
#S#..m...#
##...m...#
##.......#
#........#
##########
```

### Step 25: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#........#
#B#..@CG.#
#S#..m...#
##...m...#
##.......#
#........#
##########
```

After:

```text
##########
#........#
#B#...@*.#
#S#..m...#
##...m...#
##.......#
#........#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 444249
- Legal transitions: 1423661
- Event-only illegal transitions: 0
- Winning states: 39
- Budget: maxStates=700000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 444249
- Legal transitions: 1423661
- Budget: maxStates=700000
- Compressed regions: 11480
- Bidirectional transitions: 1341872
- Commitment transitions: 81789
- Winning regions: 1
- Initial region: r0, states=39, dist=6, internalBidirectional=116, commitments=6, viableCommitments=4, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r5@4 -> r7@6 -> r47@10 -> r64@11 -> r85@12 -> r226@15 -> r324@16 -> r904@19 -> r2475@24 -> r3777@25
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=606, edges=2373, winReachable=1, winning=1, winSubgraph=one_win_continuation_per_scc
- Solution irreversible path: steps=0, forcedWinPrefix=0/0, branchingWinSccs=0, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/0, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=125272, dist=0, out=90, winOut=0, deadOut=0
- SCC path: s0@0

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 0 | 125272 | 90 | 0 | 0 | 0 | 0 | win/end | no |

#### SCC Handoff Scriptiness

No SCC handoffs were found on the returned solution.

### Bidirectional Compression Digest

- Shape: states=444249, regions=11480, solution commitments=11
- Opening: commitments=6, viable=4, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/11, optimal prefix=0/11, forced viable commitments=0/11
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 6 | 4 | 2 | 1 | multiple viable choices |
| 3 | r1 | r5 | 6 | 2 | 1 | 1 | multiple viable choices |
| 5 | r5 | r7 | 6 | 5 | 1 | 1 | multiple viable choices |
| 9 | r7 | r47 | 7 | 5 | 1 | 3 | multiple optimal choices |
| 10 | r47 | r64 | 6 | 6 | 0 | 3 | multiple optimal choices |
| 11 | r64 | r85 | 5 | 8 | 0 | 1 | multiple viable choices |
| 14 | r85 | r226 | 5 | 8 | 0 | 1 | forced optimal |
| 15 | r226 | r324 | 4 | 8 | 0 | 1 | forced optimal |
| 18 | r324 | r904 | 3 | 3 | 1 | 1 | forced optimal |
| 23 | r904 | r2475 | 2 | 5 | 1 | 1 | forced optimal |
| 24 | r2475 | r3777 | 1 | 7 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 39 | 6 | 4 | 2 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 6 | 39 | 3 | 2 | 1 | 1 | 1 | r5 | no | no | no |
| r5 | 4 | 6 | 39 | 6 | 5 | 1 | 1 | 1 | r7 | no | no | no |
| r7 | 6 | 7 | 39 | 6 | 5 | 1 | 3 | 3 | r47 | no | no | no |
| r47 | 10 | 6 | 39 | 6 | 6 | 0 | 3 | 3 | r64 | no | no | no |
| r64 | 11 | 5 | 39 | 8 | 8 | 0 | 1 | 1 | r85 | no | no | no |
| r85 | 12 | 5 | 39 | 8 | 8 | 0 | 1 | 1 | r226 | no | no | yes |
| r226 | 15 | 4 | 39 | 8 | 8 | 0 | 1 | 1 | r324 | no | no | yes |
| r324 | 16 | 3 | 39 | 4 | 3 | 1 | 1 | 1 | r904 | no | no | yes |
| r904 | 19 | 2 | 39 | 6 | 5 | 1 | 1 | 1 | r2475 | no | no | yes |
| r2475 | 24 | 1 | 39 | 8 | 7 | 1 | 1 | 1 | r3777 | no | no | yes |
| r3777 | 25 | 0 | 39 | 8 | 7 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 6 | 4 | 2 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | up | r1 | yes | 6 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 2 | left | r1 | no | 6 | 3 | 2 | 1 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | up | r1 | no | 6 | 3 | 2 | 1 | 1 | 1 | r5 | yes | yes | no | no | no | no | walk |
| 4 | right | r5 | yes | 6 | 6 | 5 | 1 | 1 | 1 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 5 | up | r5 | no | 6 | 6 | 5 | 1 | 1 | 1 | r7 | yes | yes | no | no | no | no | walk |
| 6 | right | r7 | yes | 7 | 6 | 5 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 7 | up | r7 | no | 7 | 6 | 5 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | up | r7 | no | 7 | 6 | 5 | 1 | 3 | 3 | r7 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r7 | no | 7 | 6 | 5 | 1 | 3 | 3 | r47 | yes | yes | yes | yes | no | no | walk |
| 10 | down | r47 | yes | 6 | 6 | 6 | 0 | 3 | 3 | r64 | yes | yes | yes | yes | no | no | push_object:crate#1, box_to_sticky:n1 |
| 11 | down | r64 | yes | 5 | 8 | 8 | 0 | 1 | 1 | r85 | yes | yes | no | no | no | no | push_object:sticky#1, move_sticky_rigid |
| 12 | down | r85 | yes | 5 | 8 | 8 | 0 | 1 | 1 | r85 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |
| 13 | left | r85 | no | 5 | 8 | 8 | 0 | 1 | 1 | r85 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r85 | no | 5 | 8 | 8 | 0 | 1 | 1 | r226 | yes | yes | yes | yes | no | yes | walk |
| 15 | right | r226 | yes | 4 | 8 | 8 | 0 | 1 | 1 | r324 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 16 | right | r324 | yes | 3 | 4 | 3 | 1 | 1 | 1 | r324 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_merge:n1 |
| 17 | down | r324 | no | 3 | 4 | 3 | 1 | 1 | 1 | r324 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r324 | no | 3 | 4 | 3 | 1 | 1 | 1 | r904 | yes | yes | yes | yes | no | yes | walk |
| 19 | up | r904 | yes | 2 | 6 | 5 | 1 | 1 | 1 | r904 | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid, sticky_to_box:n1 |
| 20 | left | r904 | no | 2 | 6 | 5 | 1 | 1 | 1 | r904 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | up | r904 | no | 2 | 6 | 5 | 1 | 1 | 1 | r904 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | up | r904 | no | 2 | 6 | 5 | 1 | 1 | 1 | r904 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 23 | up | r904 | no | 2 | 6 | 5 | 1 | 1 | 1 | r2475 | yes | yes | yes | yes | no | yes | walk |
| 24 | right | r2475 | yes | 1 | 8 | 7 | 1 | 1 | 1 | r3777 | yes | yes | yes | yes | no | yes | push_object:crate#1 |
| 25 | right | r3777 | yes | 0 | 8 | 7 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
