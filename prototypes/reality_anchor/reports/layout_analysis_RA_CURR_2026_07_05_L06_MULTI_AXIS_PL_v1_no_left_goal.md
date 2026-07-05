# Level Analysis: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v1_no_left_goal

## Summary

- Prototype: reality_anchor
- Title: Multi-axis P/L relay v1 no left goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@.#####
#..GG#...#
#.C.#.CG.#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 21
- Depth: 21
- Explored states: 847
- Inputs: right down left left down up right down left left up right down right down right right right right up right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1 walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk walk walk walk pull_object:crate#1
- Event counts: pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=3, walk=16, push_object:crate#1=1, push_object:push_pull_anchor=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#PL@.#####
#..GG#...#
#.C.#.CG.#
#........#
##########
```

After:

```text
##########
#.PL@#####
#..GG#...#
#.C.#.CG.#
#........#
##########
```

### Step 5: down

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#.PL.#####
#.@GG#...#
#.C.#.CG.#
#........#
##########
```

After:

```text
##########
#.PL.#####
#..GG#...#
#.@.#.CG.#
#.C......#
##########
```

### Step 8: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#.PL.#####
#..+G#...#
#...#.CG.#
#.C......#
##########
```

After:

```text
##########
#....#####
#.PLG#...#
#..@#.CG.#
#.C......#
##########
```

### Step 12: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#....#####
#@PLG#...#
#...#.CG.#
#.C......#
##########
```

After:

```text
##########
#....#####
#.@PL#...#
#...#.CG.#
#.C......#
##########
```

### Step 21: right

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#....#####
#..PL#...#
#...#.C+.#
#.C......#
##########
```

After:

```text
##########
#....#####
#..PL#...#
#...#..*@#
#.C......#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 9028
- Legal transitions: 22844
- Event-only illegal transitions: 0
- Winning states: 307
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 9028
- Legal transitions: 22844
- Budget: maxStates=300000
- Compressed regions: 736
- Bidirectional transitions: 20940
- Commitment transitions: 1641
- Winning regions: 15
- Initial region: r0, states=43, dist=4, internalBidirectional=90, commitments=5, viableCommitments=4, deadCommitments=1, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r4@5 -> r13@8 -> r32@12 -> r92@21
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=412, edges=702, winReachable=61, winning=13, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=18, mergingWinSccs=27
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=1020, dist=2, out=32, winOut=9, deadOut=23
- SCC path: s0@0 -> s155@1 -> s156@5 -> s338@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 1020 | 32 | 9 | 23 | 0 | 0 | s155 | no |
| s155 | 1 | 2 | 44 | 7 | 5 | 2 | 1 | 1 | s156 | no |
| s156 | 5 | 1 | 31 | 5 | 3 | 2 | 3 | 3 | s338 | no |
| s338 | 12 | 0 | 44 | 4 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s155 | 1020 | yes | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s155 | 1 | 5 | s156 | 44 | no | no | down | push_object:crate#1 | has_reposition_room |
| s156 | 5 | 12 | s338 | 31 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=9028, regions=736, solution commitments=5
- Opening: commitments=5, viable=4, dead=1, optimal=2
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=0/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 4 | 1 | 2 | multiple optimal choices |
| 4 | r1 | r4 | 4 | 4 | 2 | 3 | multiple optimal choices |
| 7 | r4 | r13 | 3 | 2 | 2 | 1 | forced optimal |
| 11 | r13 | r32 | 2 | 4 | 1 | 1 | forced optimal |
| 20 | r32 | r92 | 1 | 2 | 2 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 43 | 5 | 4 | 1 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 4 | 22 | 6 | 4 | 2 | 3 | 3 | r4 | no | no | no |
| r4 | 5 | 3 | 11 | 4 | 2 | 2 | 1 | 1 | r13 | no | no | yes |
| r13 | 8 | 2 | 10 | 5 | 4 | 1 | 1 | 1 | r32 | no | no | yes |
| r32 | 12 | 1 | 22 | 4 | 2 | 2 | 1 | 1 | r92 | no | no | yes |
| r92 | 21 | 0 | 22 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 5 | 4 | 1 | 2 | 2 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 4 | 6 | 4 | 2 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | down | r1 | no | 4 | 6 | 4 | 2 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 4 | 6 | 4 | 2 | 3 | 3 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 4 | 6 | 4 | 2 | 3 | 3 | r4 | yes | yes | yes | yes | no | no | walk |
| 5 | down | r4 | yes | 3 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 6 | up | r4 | no | 3 | 4 | 2 | 2 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r4 | no | 3 | 4 | 2 | 2 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 8 | down | r13 | yes | 2 | 5 | 4 | 1 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 9 | left | r13 | no | 2 | 5 | 4 | 1 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | left | r13 | no | 2 | 5 | 4 | 1 | 1 | 1 | r13 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | up | r13 | no | 2 | 5 | 4 | 1 | 1 | 1 | r32 | yes | yes | yes | yes | no | yes | walk |
| 12 | right | r32 | yes | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 13 | down | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 14 | right | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 15 | down | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | right | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | right | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | right | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 20 | up | r32 | no | 1 | 4 | 2 | 2 | 1 | 1 | r92 | yes | yes | yes | yes | no | yes | walk |
| 21 | right | r92 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
