# Level Analysis: RA_CURR_L10_SCRATCH

## Summary

- Prototype: reality_anchor
- Title: scratch
- Role: challenge
- Status: candidate
- Support: medium
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
#@BS....#
#..M..G.#
#..M#####
#########
```

## Shortest Solution

- Found: yes
- Cost: 5
- Depth: 5
- Explored states: 27
- Inputs: right down right right right
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n2 walk push_object:crate#1 box_to_sticky:n1 push_object:sticky#1 move_sticky_rigid push_object:sticky#1 move_sticky_rigid
- Event counts: push_object:box_sticky_anchor=1, anchor_boundary_shift:box_sticky=1, sticky_to_box:n2=1, walk=1, push_object:crate#1=1, box_to_sticky:n1=1, push_object:sticky#1=2, move_sticky_rigid=2

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2

Before:

```text
#########
#@BS....#
#..M..G.#
#..M#####
#########
```

After:

```text
#########
#.@BS...#
#..C..G.#
#..C#####
#########
```

### Step 3: right

- Legal: true
- Events: push_object:crate#1, box_to_sticky:n1

Before:

```text
#########
#..BS...#
#.@C..G.#
#..C#####
#########
```

After:

```text
#########
#..BS...#
#..@M.G.#
#..C#####
#########
```

### Step 4: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#..BS...#
#..@M.G.#
#..C#####
#########
```

After:

```text
#########
#..BS...#
#...@MG.#
#..C#####
#########
```

### Step 5: right

- Legal: true
- Events: push_object:sticky#1, move_sticky_rigid

Before:

```text
#########
#..BS...#
#...@MG.#
#..C#####
#########
```

After:

```text
#########
#..BS...#
#....@m.#
#..C#####
#########
```


## Graph Facts

- Status: complete
- Reachable states: 941
- Legal transitions: 2364
- Event-only illegal transitions: 0
- Winning states: 72
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 941
- Legal transitions: 2364
- Budget: maxStates=300000
- Compressed regions: 82
- Bidirectional transitions: 2200
- Commitment transitions: 164
- Winning regions: 6
- Initial region: r0, states=5, dist=4, internalBidirectional=10, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@3 -> r5@4 -> r7@5
- Forced commitment prefix length: 1
- Forced viable prefix length: 1
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=52, edges=88, winReachable=17, winning=5, winSubgraph=branching_win_dag
- Solution irreversible path: steps=3, forcedWinPrefix=1/3, branchingWinSccs=7, mergingWinSccs=11
- Handoff scriptiness: scope=returned_solution, scripted=2/3, trivial=0, sameEntryExit=2, forcedScripted=1, maxRun=1
- Initial SCC: s0, states=5, dist=3, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s7@3 -> s8@4

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 3 | 5 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 2 | 6 | 2 | 2 | 0 | 1 | 1 | s7 | no |
| s7 | 3 | 1 | 7 | 2 | 2 | 0 | 1 | 1 | s8 | no |
| s8 | 4 | 0 | 52 | 6 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 5 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 | scripted_same_state_handoff |
| s1 | 1 | 3 | s7 | 6 | no | no | right | push_object:crate#1, box_to_sticky:n1 | has_reposition_room |
| s7 | 3 | 4 | s8 | 7 | yes | no | right | push_object:sticky#1, move_sticky_rigid | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=941, regions=82, solution commitments=4
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=1/4, optimal prefix=4/4, forced viable commitments=1/4
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 1 commitment(s) are forced viable progress; all solution commitments are forced optimal progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 4 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r3 | 3 | 2 | 0 | 1 | forced optimal |
| 3 | r3 | r5 | 2 | 2 | 0 | 1 | forced optimal |
| 4 | r5 | r7 | 1 | 2 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 4 | 5 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 3 | 6 | 2 | 2 | 0 | 1 | 1 | r3 | no | no | yes |
| r3 | 3 | 2 | 7 | 2 | 2 | 0 | 1 | 1 | r5 | no | no | yes |
| r5 | 4 | 1 | 8 | 2 | 2 | 0 | 1 | 1 | r7 | no | no | yes |
| r7 | 5 | 0 | 13 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 4 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 3 | 2 | 2 | 0 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n2 |
| 2 | down | r1 | no | 3 | 2 | 2 | 0 | 1 | 1 | r3 | yes | yes | yes | yes | no | yes | walk |
| 3 | right | r3 | yes | 2 | 2 | 2 | 0 | 1 | 1 | r5 | yes | yes | yes | yes | no | yes | push_object:crate#1, box_to_sticky:n1 |
| 4 | right | r5 | yes | 1 | 2 | 2 | 0 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | push_object:sticky#1, move_sticky_rigid |
| 5 | right | r7 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | push_object:sticky#1, move_sticky_rigid |

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
