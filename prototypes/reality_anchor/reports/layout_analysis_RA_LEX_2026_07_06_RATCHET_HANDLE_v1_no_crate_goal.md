# Level Analysis: RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_06_RATCHET_HANDLE_v1_no_crate_goal
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
#####.G..###
#######.C###
############
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 29
- Inputs: right right up right down
- Events: push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:push_pull_anchor anchor_boundary_shift:push_pull walk walk push_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: push_object:push_pull_anchor=3, anchor_boundary_shift:push_pull=3, walk=2

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
#####.G..###
#######.C###
############
```

After:

```text
############
#.....######
#..@PL.....#
#####.G..###
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
#####.G..###
#######.C###
############
```

After:

```text
############
#.....######
#...@PL....#
#####.G..###
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
#####.G..###
#######.C###
############
```

After:

```text
############
#.....######
#....@.....#
#####PL..###
#######.C###
############
```


## Graph Facts

- Status: complete
- Reachable states: 754
- Legal transitions: 1878
- Event-only illegal transitions: 0
- Winning states: 176
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
- Winning regions: 23
- Initial region: r0, states=18, dist=3, internalBidirectional=38, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@1 -> r2@2 -> r5@5
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=67, edges=87, winReachable=43, winning=22, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=0/3, branchingWinSccs=10, mergingWinSccs=9
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=2
- Initial SCC: s0, states=18, dist=3, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s1@1 -> s2@2 -> s3@5

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 18 | 3 | 3 | 0 | 0 | 0 | s1 | no |
| s1 | 1 | 2 | 8 | 1 | 1 | 0 | 1 | 1 | s2 | yes |
| s2 | 2 | 1 | 9 | 2 | 2 | 0 | 1 | 1 | s3 | no |
| s3 | 5 | 0 | 18 | 2 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 18 | yes | no | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s1 | 1 | 2 | s2 | 8 | yes | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | scripted_same_state_handoff |
| s2 | 2 | 5 | s3 | 9 | no | no | down | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=754, regions=77, solution commitments=3
- Opening: commitments=3, viable=3, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/3, optimal prefix=0/3, forced viable commitments=1/3
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 3 | 3 | 0 | 2 | multiple optimal choices |
| 1 | r1 | r2 | 2 | 1 | 0 | 1 | forced optimal |
| 4 | r2 | r5 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 3 | 18 | 3 | 3 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 1 | 2 | 8 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes |
| r2 | 2 | 1 | 9 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 5 | 0 | 17 | 2 | 2 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 3 | 3 | 3 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | none |
| 1 | right | r1 | yes | 2 | 1 | 1 | 0 | 1 | 1 | r2 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 2 | right | r2 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 3 | up | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r2 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | right | r2 | no | 1 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | walk |
| 5 | down | r5 | yes | 0 | 2 | 2 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
