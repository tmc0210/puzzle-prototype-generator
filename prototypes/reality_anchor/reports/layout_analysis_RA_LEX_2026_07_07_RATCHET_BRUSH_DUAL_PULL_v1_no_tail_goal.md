# Level Analysis: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v1_no_tail_goal

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_RATCHET_BRUSH_DUAL_PULL_v1_no_tail_goal
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
##########
#.PLBS.###
#@.###..##
#....MM..#
#....G#..#
#........#
##########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 59
- Inputs: up right down down down right right right down
- Events: walk push_object:push_pull_anchor force_chain:n2 anchor_boundary_shift:push_pull anchor_boundary_shift:box_sticky sticky_to_box:n1 walk walk walk walk walk walk pull_object:crate#1
- Event counts: walk=7, push_object:push_pull_anchor=1, force_chain:n2=1, anchor_boundary_shift:push_pull=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n1=1, pull_object:crate#1=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 2: right

- Legal: true
- Events: push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
##########
#@PLBS.###
#..###..##
#....MM..#
#....G#..#
#........#
##########
```

After:

```text
##########
#.@PLBS###
#..###..##
#....CM..#
#....G#..#
#........#
##########
```

### Step 9: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
##########
#..PLBS###
#..###..##
#....CM..#
#....+#..#
#........#
##########
```

After:

```text
##########
#..PLBS###
#..###..##
#.....M..#
#....*#..#
#....@...#
##########
```


## Graph Facts

- Status: complete
- Reachable states: 2073
- Legal transitions: 5365
- Event-only illegal transitions: 0
- Winning states: 32
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2073
- Legal transitions: 5365
- Budget: maxStates=300000
- Compressed regions: 176
- Bidirectional transitions: 4848
- Commitment transitions: 365
- Winning regions: 32
- Initial region: r0, states=26, dist=2, internalBidirectional=64, commitments=3, viableCommitments=3, deadCommitments=0, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r1@2 -> r4@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=99, edges=156, winReachable=65, winning=32, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=0/2, branchingWinSccs=22, mergingWinSccs=19
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=50, dist=2, out=3, winOut=3, deadOut=0
- SCC path: s0@0 -> s75@2 -> s98@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 50 | 3 | 3 | 0 | 0 | 0 | s75 | no |
| s75 | 2 | 1 | 54 | 3 | 3 | 0 | 5 | 5 | s98 | no |
| s98 | 9 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s75 | 50 | no | no | right | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s75 | 2 | 9 | s98 | 54 | no | no | down | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=2073, regions=176, solution commitments=2
- Opening: commitments=3, viable=3, dead=0, optimal=2
- Win-continuation prefix: viable prefix=0/2, optimal prefix=0/2, forced viable commitments=0/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 3 | 0 | 2 | multiple optimal choices |
| 8 | r1 | r4 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 26 | 3 | 3 | 0 | 2 | 2 | r1 | no | no | no |
| r1 | 2 | 1 | 54 | 3 | 3 | 0 | 1 | 1 | r4 | no | no | yes |
| r4 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 3 | 3 | 0 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 2 | 3 | 3 | 0 | 2 | 2 | r1 | yes | yes | yes | yes | no | no | walk |
| 2 | right | r1 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r4 | yes | yes | yes | yes | no | yes | walk |
| 9 | down | r4 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
