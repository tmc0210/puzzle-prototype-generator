# Level Analysis: RA_CURR_2026_07_05_L05_LONG_EDGE_PL_v1_no_right_goal

## Summary

- Prototype: reality_anchor
- Title: Long-edge P/L relay v1 no right goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#PL@G#####
#........#
#.CG#.C..#
##########
```

## Shortest Solution

- Found: yes
- Cost: 11
- Depth: 11
- Explored states: 75
- Inputs: right down left left left up right down left down right
- Events: pull_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk push_object:crate#1
- Event counts: pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, walk=8, push_object:push_pull_anchor=1, push_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#PL@G#####
#........#
#.CG#.C..#
##########
```

After:

```text
##########
#.PL+#####
#........#
#.CG#.C..#
##########
```

### Step 7: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
##########
#@PLG#####
#........#
#.CG#.C..#
##########
```

After:

```text
##########
#.@PL#####
#........#
#.CG#.C..#
##########
```

### Step 11: right

- Legal: true
- Events: push_object:crate#1

Before:

```text
##########
#..PL#####
#........#
#@CG#.C..#
##########
```

After:

```text
##########
#..PL#####
#........#
#.@*#.C..#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 243
- Legal transitions: 516
- Event-only illegal transitions: 0
- Winning states: 30
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 243
- Legal transitions: 516
- Budget: maxStates=300000
- Compressed regions: 36
- Bidirectional transitions: 438
- Commitment transitions: 62
- Winning regions: 2
- Initial region: r0, states=16, dist=3, internalBidirectional=30, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r6@7 -> r13@11
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 1

### SCC Irreversible Progress

- Shape: sccs=23, edges=27, winReachable=5, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=2, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=1/3, trivial=0, sameEntryExit=1, forcedScripted=0, maxRun=1
- Initial SCC: s0, states=64, dist=2, out=4, winOut=2, deadOut=2
- SCC path: s0@0 -> s1@1 -> s3@7 -> s12@11

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 64 | 4 | 2 | 2 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 28 | 4 | 2 | 2 | 1 | 1 | s3 | no |
| s3 | 7 | 1 | 30 | 2 | 1 | 1 | 1 | 1 | s12 | yes |
| s12 | 11 | 0 | 30 | 0 | 0 | 0 | 2 | 2 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 64 | yes | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 7 | s3 | 28 | no | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s3 | 7 | 11 | s12 | 30 | no | yes | right | push_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=243, regions=36, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=1
- Win-continuation prefix: viable prefix=0/3, optimal prefix=1/3, forced viable commitments=0/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 3 | 0 | 1 | forced optimal |
| 6 | r1 | r6 | 2 | 3 | 1 | 2 | multiple optimal choices |
| 10 | r6 | r13 | 1 | 2 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 16 | 3 | 3 | 0 | 1 | 1 | r1 | no | no | yes |
| r1 | 1 | 2 | 14 | 4 | 3 | 1 | 2 | 2 | r6 | no | no | no |
| r6 | 7 | 1 | 15 | 3 | 2 | 1 | 1 | 1 | r13 | no | no | yes |
| r13 | 11 | 0 | 15 | 1 | 1 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 3 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | no | yes | none |
| 1 | right | r1 | yes | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | down | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | left | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | left | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | left | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r1 | no | 2 | 4 | 3 | 1 | 2 | 2 | r6 | yes | yes | yes | yes | no | no | walk |
| 7 | right | r6 | yes | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 8 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 9 | left | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r6 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | down | r6 | no | 1 | 3 | 2 | 1 | 1 | 1 | r13 | yes | yes | yes | yes | no | yes | walk |
| 11 | right | r13 | yes | 0 | 1 | 1 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1 |

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
