# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SHADOW_PULL_v1_box_analog

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L shadow pull v1 box analog
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
##..CC...#
#L#.#....#
#P#......#
##########
```

## Shortest Solution

- Found: yes
- Cost: 27
- Depth: 27
- Explored states: 1128
- Inputs: up left left down up right right down down left left right down left down left left up up up right left down right right up up
- Events: walk walk walk walk pull_object:crate#2 walk walk walk walk walk walk pull_object:crate#2 walk walk pull_object:crate#2 walk walk walk walk walk walk pull_object:crate#1 walk walk walk pull_object:crate#2 pull_object:crate#2
- Event counts: walk=21, pull_object:crate#2=5, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#...#....#
#.#.G+#..#
##..CC...#
#L#.#....#
#P#......#
##########
```

After:

```text
##########
#...#@...#
#.#.G*#..#
##..C....#
#L#.#....#
#P#......#
##########
```

### Step 12: right

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#...#....#
#.#.G*#..#
##..C@...#
#L#.#....#
#P#......#
##########
```

After:

```text
##########
#...#....#
#.#.G*#..#
##...C@..#
#L#.#....#
#P#......#
##########
```

### Step 15: down

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#...#....#
#.#.G*#..#
##...C...#
#L#.#@...#
#P#......#
##########
```

After:

```text
##########
#...#....#
#.#.G*#..#
##.......#
#L#.#C...#
#P#..@...#
##########
```

### Step 22: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#...#....#
#.#.+*#..#
##.......#
#L#.#C...#
#P#......#
##########
```

After:

```text
##########
#...#....#
#.#@*G#..#
##.......#
#L#.#C...#
#P#......#
##########
```

### Step 26: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#...#....#
#.#.*G#..#
##...@...#
#L#.#C...#
#P#......#
##########
```

After:

```text
##########
#...#....#
#.#.*+#..#
##...C...#
#L#.#....#
#P#......#
##########
```

### Step 27: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
##########
#...#....#
#.#.*+#..#
##...C...#
#L#.#....#
#P#......#
##########
```

After:

```text
##########
#...#@...#
#.#.**#..#
##.......#
#L#.#....#
#P#......#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 1305
- Legal transitions: 3209
- Event-only illegal transitions: 0
- Winning states: 29
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1305
- Legal transitions: 3209
- Budget: maxStates=400000
- Compressed regions: 47
- Bidirectional transitions: 2940
- Commitment transitions: 147
- Winning regions: 1
- Initial region: r0, states=55, dist=6, internalBidirectional=130, commitments=5, viableCommitments=3, deadCommitments=2, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r3@5 -> r11@11 -> r14@12 -> r38@22 -> r44@26 -> r46@27
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=12, edges=12, winReachable=3, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=1, forcedWinPrefix=0/1, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=0/1, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=1035, dist=1, out=10, winOut=2, deadOut=8
- SCC path: s0@0 -> s10@22

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 1 | 1035 | 10 | 2 | 8 | 0 | 0 | s10 | no |
| s10 | 22 | 0 | 260 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 22 | s10 | 1035 | no | no | left | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1305, regions=47, solution commitments=6
- Opening: commitments=5, viable=3, dead=2, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=1/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r3 | 6 | 3 | 2 | 2 | multiple optimal choices |
| 10 | r3 | r11 | 5 | 2 | 1 | 2 | multiple optimal choices |
| 11 | r11 | r14 | 4 | 2 | 0 | 1 | forced optimal |
| 21 | r14 | r38 | 3 | 3 | 0 | 1 | forced optimal |
| 25 | r38 | r44 | 2 | 3 | 0 | 1 | forced optimal |
| 26 | r44 | r46 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 55 | 5 | 3 | 2 | 2 | 2 | r3 | no | no | no |
| r3 | 5 | 5 | 26 | 3 | 2 | 1 | 2 | 2 | r11 | no | no | no |
| r11 | 11 | 4 | 1 | 2 | 2 | 0 | 1 | 1 | r14 | no | no | yes |
| r14 | 12 | 3 | 56 | 3 | 3 | 0 | 1 | 1 | r38 | no | no | yes |
| r38 | 22 | 2 | 56 | 3 | 3 | 0 | 1 | 1 | r44 | no | no | yes |
| r44 | 26 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r46 | yes | yes | yes |
| r46 | 27 | 0 | 29 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 6 | 5 | 3 | 2 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 5 | up | r3 | yes | 5 | 3 | 2 | 1 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 6 | right | r3 | no | 5 | 3 | 2 | 1 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r3 | no | 5 | 3 | 2 | 1 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r3 | no | 5 | 3 | 2 | 1 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r3 | no | 5 | 3 | 2 | 1 | 2 | 2 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r3 | no | 5 | 3 | 2 | 1 | 2 | 2 | r11 | yes | yes | yes | yes | no | no | walk |
| 11 | left | r11 | yes | 4 | 2 | 2 | 0 | 1 | 1 | r14 | yes | yes | yes | yes | no | yes | walk |
| 12 | right | r14 | yes | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 13 | down | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | left | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 16 | left | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | up | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | up | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r14 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r14 | no | 3 | 3 | 3 | 0 | 1 | 1 | r38 | yes | yes | yes | yes | no | yes | walk |
| 22 | left | r38 | yes | 2 | 3 | 3 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 23 | down | r38 | no | 2 | 3 | 3 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 24 | right | r38 | no | 2 | 3 | 3 | 0 | 1 | 1 | r38 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 25 | right | r38 | no | 2 | 3 | 3 | 0 | 1 | 1 | r44 | yes | yes | yes | yes | no | yes | walk |
| 26 | up | r44 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r46 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 27 | up | r46 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |

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
