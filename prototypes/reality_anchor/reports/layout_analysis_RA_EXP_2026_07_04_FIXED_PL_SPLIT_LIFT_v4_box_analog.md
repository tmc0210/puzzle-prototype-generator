# Level Analysis: RA_EXP_2026_07_04_FIXED_PL_SPLIT_LIFT_v4_box_analog

## Summary

- Prototype: reality_anchor
- Title: Fixed P/L split lift v4 box analog
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#P#....@..#
#L#.G...#.#
####.##.#.#
####*##.#.#
####C####.#
###########
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 119
- Inputs: down left left left down up up right down right up left left down down down up up left up right down up
- Events: walk walk walk walk walk pull_object:crate#1 pull_object:crate#1 walk walk pull_object:crate#1 walk walk walk walk walk walk pull_object:crate#2 pull_object:crate#2 pull_object:crate#1 walk walk push_object:crate#1 force_chain:n2 pull_object:crate#1
- Event counts: walk=15, pull_object:crate#1=5, pull_object:crate#2=2, push_object:crate#1=1, force_chain:n2=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 6: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L#.G...#.#
####@##.#.#
####*##.#.#
####C####.#
###########
```

After:

```text
###########
#P#.......#
#L#.+...#.#
####C##.#.#
####G##.#.#
####C####.#
###########
```

### Step 7: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L#.+...#.#
####C##.#.#
####G##.#.#
####C####.#
###########
```

After:

```text
###########
#P#.@.....#
#L#.*...#.#
####.##.#.#
####G##.#.#
####C####.#
###########
```

### Step 10: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L#.*@..#.#
####.##.#.#
####G##.#.#
####C####.#
###########
```

After:

```text
###########
#P#.......#
#L#.GC@.#.#
####.##.#.#
####G##.#.#
####C####.#
###########
```

### Step 17: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
#P#.......#
#L#.GC..#.#
####.##.#.#
####+##.#.#
####C####.#
###########
```

After:

```text
###########
#P#.......#
#L#.GC..#.#
####@##.#.#
####*##.#.#
####.####.#
###########
```

### Step 18: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
#P#.......#
#L#.GC..#.#
####@##.#.#
####*##.#.#
####.####.#
###########
```

After:

```text
###########
#P#.......#
#L#.+C..#.#
####C##.#.#
####G##.#.#
####.####.#
###########
```

### Step 19: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L#.+C..#.#
####C##.#.#
####G##.#.#
####.####.#
###########
```

After:

```text
###########
#P#.......#
#L#@*...#.#
####C##.#.#
####G##.#.#
####.####.#
###########
```

### Step 22: down

- Legal: true
- Events: push_object:crate#1, force_chain:n2

Before:

```text
###########
#P#.@.....#
#L#.*...#.#
####C##.#.#
####G##.#.#
####.####.#
###########
```

After:

```text
###########
#P#.......#
#L#.+...#.#
####C##.#.#
####*##.#.#
####.####.#
###########
```

### Step 23: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#P#.......#
#L#.+...#.#
####C##.#.#
####*##.#.#
####.####.#
###########
```

After:

```text
###########
#P#.@.....#
#L#.*...#.#
####.##.#.#
####*##.#.#
####.####.#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 246
- Legal transitions: 531
- Event-only illegal transitions: 0
- Winning states: 17
- Budget: maxStates=400000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 246
- Legal transitions: 531
- Budget: maxStates=400000
- Compressed regions: 16
- Bidirectional transitions: 490
- Commitment transitions: 26
- Winning regions: 1
- Initial region: r0, states=18, dist=8, internalBidirectional=42, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@5 -> r2@6 -> r3@10 -> r5@16 -> r6@17 -> r7@18 -> r9@19 -> r12@22
- Forced commitment prefix length: 3
- Forced viable prefix length: 3
- Forced optimal prefix length: 8

### SCC Irreversible Progress

- Shape: sccs=6, edges=6, winReachable=6, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=4, forcedWinPrefix=2/4, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=2/4, trivial=2, sameEntryExit=2, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=18, dist=4, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@5 -> s2@6 -> s4@16 -> s5@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 18 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 5 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 6 | 2 | 71 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 16 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 17 | 0 | 154 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 5 | s1 | 18 | no | yes | down | walk | has_reposition_room |
| s1 | 5 | 6 | s2 | 1 | yes | yes | up | pull_object:crate#1 | scripted_trivial_scc |
| s2 | 6 | 16 | s4 | 71 | no | no | down | walk | has_reposition_room |
| s4 | 16 | 17 | s5 | 1 | yes | yes | up | pull_object:crate#2 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=246, regions=16, solution commitments=8
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/8, optimal prefix=8/8, forced viable commitments=5/8
- Endgame tail: 1 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 4 | r0 | r1 | 8 | 1 | 0 | 1 | forced optimal |
| 5 | r1 | r2 | 7 | 1 | 0 | 1 | forced optimal |
| 9 | r2 | r3 | 6 | 1 | 0 | 1 | forced optimal |
| 15 | r3 | r5 | 5 | 3 | 0 | 1 | forced optimal |
| 16 | r5 | r6 | 4 | 1 | 0 | 1 | forced optimal |
| 17 | r6 | r7 | 3 | 1 | 0 | 1 | forced optimal |
| 18 | r7 | r9 | 2 | 2 | 0 | 1 | forced optimal |
| 21 | r9 | r12 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 8 | 18 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 5 | 7 | 1 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 6 | 6 | 35 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes |
| r3 | 10 | 5 | 18 | 3 | 3 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 16 | 4 | 1 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes |
| r6 | 17 | 3 | 1 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes |
| r7 | 18 | 2 | 17 | 2 | 2 | 0 | 1 | 1 | r9 | no | no | yes |
| r9 | 19 | 1 | 17 | 2 | 2 | 0 | 1 | 1 | r12 | no | no | yes |
| r12 | 22 | 0 | 35 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r0 | no | 8 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 5 | down | r1 | yes | 7 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | walk |
| 6 | up | r2 | yes | 6 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 7 | up | r2 | no | 6 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 8 | right | r2 | no | 6 | 1 | 1 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | down | r2 | no | 6 | 1 | 1 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 10 | right | r3 | yes | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 11 | up | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | left | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | left | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | down | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r3 | no | 5 | 3 | 3 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 16 | down | r5 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r6 | yes | yes | yes | yes | yes | yes | walk |
| 17 | up | r6 | yes | 3 | 1 | 1 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | yes | yes | pull_object:crate#2 |
| 18 | up | r7 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r9 | yes | yes | yes | yes | no | yes | pull_object:crate#2 |
| 19 | left | r9 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 20 | up | r9 | no | 1 | 2 | 2 | 0 | 1 | 1 | r9 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 21 | right | r9 | no | 1 | 2 | 2 | 0 | 1 | 1 | r12 | yes | yes | yes | yes | no | yes | walk |
| 22 | down | r12 | yes | 0 | 1 | 1 | 0 | 0 | 0 | r12 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2 |
| 23 | up | r12 | no | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
