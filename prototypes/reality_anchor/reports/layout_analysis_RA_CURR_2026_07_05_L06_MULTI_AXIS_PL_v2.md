# Level Analysis: RA_CURR_2026_07_05_L06_MULTI_AXIS_PL_v2

## Summary

- Prototype: reality_anchor
- Title: Multi-axis P/L relay v2
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
######
#PL@.#
#..GG#
#.CG##
#....#
######
```

## Shortest Solution

- Found: yes
- Cost: 23
- Depth: 23
- Explored states: 493
- Inputs: down left left down right up down left down right right up up right up left left left down right left down right
- Events: walk walk walk walk push_object:crate#1 walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1 walk walk walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:crate#1
- Event counts: walk=17, push_object:crate#1=2, pull_object:push_pull_anchor=2, anchor_boundary_shift:push_pull=3, pull_object:crate#1=1, push_object:push_pull_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 5: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
######
#PL..#
#..GG#
#@CG##
#....#
######
```

After:

```text
######
#PL..#
#..GG#
#.@*##
#....#
######
```

### Step 7: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
######
#PL..#
#.@GG#
#..*##
#....#
######
```

After:

```text
######
#....#
#PLGG#
#.@*##
#....#
######
```

### Step 8: left

- Legal: true
- Events: pull_object:crate#1

Before:

```text
######
#....#
#PLGG#
#.@*##
#....#
######
```

After:

```text
######
#....#
#PLGG#
#@CG##
#....#
######
```

### Step 14: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
######
#....#
#PL+G#
#.CG##
#....#
######
```

After:

```text
######
#....#
#.PL+#
#.CG##
#....#
######
```

### Step 20: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
######
#....#
#@PLG#
#.CG##
#....#
######
```

After:

```text
######
#....#
#.@PL#
#.CG##
#....#
######
```

### Step 23: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
######
#....#
#..PL#
#@CG##
#....#
######
```

After:

```text
######
#....#
#..PL#
#.@*##
#....#
######
```


## Graph Facts

- Status: complete
- Reachable states: 945
- Legal transitions: 2269
- Event-only illegal transitions: 0
- Winning states: 12
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 945
- Legal transitions: 2269
- Budget: maxStates=300000
- Compressed regions: 104
- Bidirectional transitions: 1998
- Commitment transitions: 227
- Winning regions: 1
- Initial region: r0, states=23, dist=4, internalBidirectional=46, commitments=4, viableCommitments=2, deadCommitments=2, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r6@7 -> r31@14 -> r48@20 -> r53@23
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=56, edges=101, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=0/3, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=228, dist=2, out=18, winOut=2, deadOut=16
- SCC path: s0@0 -> s2@14 -> s3@20 -> s29@23

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 228 | 18 | 2 | 16 | 0 | 0 | s2 | no |
| s2 | 14 | 2 | 11 | 5 | 2 | 3 | 1 | 1 | s3 | no |
| s3 | 20 | 1 | 24 | 5 | 1 | 4 | 1 | 1 | s29 | yes |
| s29 | 23 | 0 | 12 | 1 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 14 | s2 | 228 | no | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s2 | 14 | 20 | s3 | 11 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s3 | 20 | 23 | s29 | 24 | no | yes | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=945, regions=104, solution commitments=4
- Opening: commitments=4, viable=2, dead=2, optimal=1
- Win-continuation prefix: viable prefix=0/4, optimal prefix=2/4, forced viable commitments=0/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 6 | r0 | r6 | 4 | 2 | 2 | 1 | forced optimal |
| 13 | r6 | r31 | 3 | 4 | 0 | 1 | forced optimal |
| 19 | r31 | r48 | 2 | 2 | 3 | 2 | multiple optimal choices |
| 22 | r48 | r53 | 1 | 2 | 3 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 23 | 4 | 2 | 2 | 1 | 1 | r6 | no | no | yes |
| r6 | 7 | 3 | 13 | 4 | 4 | 0 | 1 | 1 | r31 | no | no | yes |
| r31 | 14 | 2 | 11 | 5 | 2 | 3 | 2 | 2 | r48 | no | no | no |
| r48 | 20 | 1 | 12 | 5 | 2 | 3 | 1 | 1 | r53 | no | no | yes |
| r53 | 23 | 0 | 12 | 1 | 0 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | left | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | right | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |
| 6 | up | r0 | no | 4 | 4 | 2 | 2 | 1 | 1 | r6 | yes | yes | yes | yes | no | yes | walk |
| 7 | down | r6 | yes | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | left | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |
| 9 | down | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | right | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | right | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | up | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | up | r6 | no | 3 | 4 | 4 | 0 | 1 | 1 | r31 | yes | yes | yes | yes | no | yes | walk |
| 14 | right | r31 | yes | 2 | 5 | 2 | 3 | 2 | 2 | r31 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 15 | up | r31 | no | 2 | 5 | 2 | 3 | 2 | 2 | r31 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | left | r31 | no | 2 | 5 | 2 | 3 | 2 | 2 | r31 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 17 | left | r31 | no | 2 | 5 | 2 | 3 | 2 | 2 | r31 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 18 | left | r31 | no | 2 | 5 | 2 | 3 | 2 | 2 | r31 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 19 | down | r31 | no | 2 | 5 | 2 | 3 | 2 | 2 | r48 | yes | yes | yes | yes | no | no | walk |
| 20 | right | r48 | yes | 1 | 5 | 2 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 21 | left | r48 | no | 1 | 5 | 2 | 3 | 1 | 1 | r48 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 22 | down | r48 | no | 1 | 5 | 2 | 3 | 1 | 1 | r53 | yes | yes | yes | yes | no | yes | walk |
| 23 | right | r53 | yes | 0 | 1 | 0 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
