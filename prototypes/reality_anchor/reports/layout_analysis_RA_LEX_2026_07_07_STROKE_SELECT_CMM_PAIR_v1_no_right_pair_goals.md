# Level Analysis: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_right_pair_goals

## Summary

- Prototype: reality_anchor
- Title: RA_LEX_2026_07_07_STROKE_SELECT_CMM_PAIR_v1_no_right_pair_goals
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
#.PLBS..###
#@.###...##
#...#MMM..#
#....G###.#
#.........#
###########
```

## Shortest Solution

- Found: yes
- Cost: 9
- Depth: 9
- Explored states: 47
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
###########
#@PLBS..###
#..###...##
#...#MMM..#
#....G###.#
#.........#
###########
```

After:

```text
###########
#.@PLBS.###
#..###...##
#...#CMM..#
#....G###.#
#.........#
###########
```

### Step 9: down

- Legal: true
- Events: pull_object:crate#1

Before:

```text
###########
#..PLBS.###
#..###...##
#...#CMM..#
#....+###.#
#.........#
###########
```

After:

```text
###########
#..PLBS.###
#..###...##
#...#.MM..#
#....*###.#
#....@....#
###########
```


## Graph Facts

- Status: complete
- Reachable states: 230
- Legal transitions: 575
- Event-only illegal transitions: 0
- Winning states: 5
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 230
- Legal transitions: 575
- Budget: maxStates=300000
- Compressed regions: 18
- Bidirectional transitions: 552
- Commitment transitions: 17
- Winning regions: 5
- Initial region: r0, states=22, dist=2, internalBidirectional=54, commitments=2, viableCommitments=1, deadCommitments=1, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@2 -> r3@9
- Forced commitment prefix length: 0
- Forced viable prefix length: 1
- Forced optimal prefix length: 2

### SCC Irreversible Progress

- Shape: sccs=18, edges=17, winReachable=13, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=2, forcedWinPrefix=1/2, branchingWinSccs=3, mergingWinSccs=0
- Handoff scriptiness: scope=returned_solution, scripted=0/2, trivial=0, sameEntryExit=0, forcedScripted=0, maxRun=0
- Initial SCC: s0, states=22, dist=2, out=2, winOut=1, deadOut=1
- SCC path: s0@0 -> s5@2 -> s17@9

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 2 | 22 | 2 | 1 | 1 | 0 | 0 | s5 | yes |
| s5 | 2 | 1 | 23 | 3 | 3 | 0 | 1 | 1 | s17 | no |
| s17 | 9 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 2 | s5 | 22 | no | yes | right | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s5 | 2 | 9 | s17 | 23 | no | no | down | pull_object:crate#1 | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=230, regions=18, solution commitments=2
- Opening: commitments=2, viable=1, dead=1, optimal=1
- Win-continuation prefix: viable prefix=1/2, optimal prefix=2/2, forced viable commitments=1/2
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: opening has apparent branches but only one viable progress; first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | r0 | r1 | 2 | 1 | 1 | 1 | forced optimal |
| 8 | r1 | r3 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 2 | 22 | 2 | 1 | 1 | 1 | 1 | r1 | no | yes | yes |
| r1 | 2 | 1 | 23 | 3 | 3 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 9 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | up | r0 | no | 2 | 2 | 1 | 1 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | walk |
| 2 | right | r1 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:push_pull_anchor, force_chain:n2, anchor_boundary_shift:push_pull, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 3 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 4 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 5 | down | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 8 | right | r1 | no | 1 | 3 | 3 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 9 | down | r3 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#1 |

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
