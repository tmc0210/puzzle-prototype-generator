# Level Analysis: RA_LEX_2026_07_06_RATCHET_HANDLE_v1

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_RATCHET_HANDLE_v1
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
############
#.....######
#.@PL......#
#####.G.G###
#######.C###
############
```

## Shortest Solution

- Found: yes
- Cost: 10
- Depth: 10
- Explored states: 124
- Inputs: right right up right down right right down right up
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull pull_object:crate#1
- Event counts: push_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=4, walk=5, pull_object:push_pull_anchor=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
############
#.....######
#.@PL......#
#####.G.G###
#######.C###
############
```

After:

```text
############
#.....######
#..@PL.....#
#####.G.G###
#######.C###
############
```

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
############
#.....######
#..@PL.....#
#####.G.G###
#######.C###
############
```

After:

```text
############
#.....######
#...@PL....#
#####.G.G###
#######.C###
############
```

### Step 5: down

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
############
#....@######
#....PL....#
#####.G.G###
#######.C###
############
```

After:

```text
############
#.....######
#....@.....#
#####PL.G###
#######.C###
############
```

### Step 9: right

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
############
#.....######
#..........#
#####PL@G###
#######.C###
############
```

After:

```text
############
#.....######
#..........#
#####.PL+###
#######.C###
############
```

### Step 10: up

- Legal: true
- Events: pull_object:crate#1

Before:

```text
############
#.....######
#..........#
#####.PL+###
#######.C###
############
```

After:

```text
############
#.....######
#.......@..#
#####.PL*###
#######..###
############
```


## Graph Facts

- Status: complete
- Reachable states: 754
- Legal transitions: 1878
- Event-only illegal transitions: 0
- Winning states: 36
- Budget: maxStates=500000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 754
- Legal transitions: 1878
- Budget: maxStates=500000
- Compressed regions: 77
- Bidirectional transitions: 1764
- Commitment transitions: 106
- Winning regions: 3
- Initial region: r0, states=18, dist=4, internalBidirectional=38, commitments=3, viableCommitments=2, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r5@5 -> r14@9 -> r21@10
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=67, edges=87, winReachable=20, winning=3, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=5, mergingWinSccs=2
- Handoff scriptiness: scope=returned_solution, scripted=3/5, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=18, dist=4, out=3, winOut=2, deadOut=1
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@5 -> s4@9 -> s5@10

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 4 | 18 | 3 | 2 | 1 | 0 | 0 | s1 | no |
| s1 | 1 | 3 | 8 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 2 | 9 | 2 | 1 | 1 | 1 | 1 | s3 | yes |
| s3 | 5 | 1 | 18 | 2 | 2 | 0 | 1 | 1 | s4 | no |
| s4 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | s5 | yes |
| s5 | 10 | 0 | 16 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 18 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 8 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s2 | 2 | 5 | s3 | 9 | no | yes | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s3 | 5 | 9 | s4 | 18 | no | no | right | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s4 | 9 | 10 | s5 | 1 | yes | yes | up | pull_object:crate#1 | scripted_trivial_scc |

### Bidirectional Compression Digest

- Shape: states=754, regions=77, solution commitments=5
- Opening: commitments=3, viable=2, dead=1, optimal=1
- Win-continuation prefix: viable prefix=0/5, optimal prefix=0/5, forced viable commitments=3/5
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 2 | 1 | 1 | multiple viable choices |
| 1 | r1 | r2 | 4 | 1 | 0 | 1 | forced optimal |
| 4 | r2 | r5 | 3 | 1 | 1 | 1 | forced optimal |
| 8 | r5 | r14 | 2 | 2 | 0 | 2 | multiple optimal choices |
| 9 | r14 | r21 | 1 | 1 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 18 | 3 | 2 | 1 | 1 | 1 | r1 | no | no | no |
| r1 | 1 | 4 | 8 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 3 | 9 | 2 | 1 | 1 | 1 | 1 | r5 | no | yes | yes |
| r5 | 5 | 2 | 17 | 2 | 2 | 0 | 2 | 2 | r14 | no | no | no |
| r14 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | r21 | yes | yes | yes |
| r21 | 10 | 0 | 16 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 3 | 2 | 1 | 1 | 1 | r1 | yes | yes | no | no | no | no | none |
| 1 | right | r1 | yes | 4 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | up | r2 | no | 3 | 2 | 1 | 1 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 3 | 2 | 1 | 1 | 1 | 1 | r5 | yes | yes | yes | yes | yes | yes | walk |
| 5 | down | r5 | yes | 2 | 2 | 2 | 0 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 6 | right | r5 | no | 2 | 2 | 2 | 0 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r5 | no | 2 | 2 | 2 | 0 | 2 | 2 | r5 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | down | r5 | no | 2 | 2 | 2 | 0 | 2 | 2 | r14 | yes | yes | yes | yes | no | no | walk |
| 9 | right | r14 | yes | 1 | 1 | 1 | 0 | 1 | 1 | r21 | yes | yes | yes | yes | yes | yes | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 10 | up | r21 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
