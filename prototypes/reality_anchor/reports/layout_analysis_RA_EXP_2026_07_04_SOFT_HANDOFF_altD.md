# Level Analysis: RA_EXP_2026_07_04_SOFT_HANDOFF_altD

## Summary

- Prototype: reality_anchor
- Title: Soft handoff altD
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
#########
##..C#G##
##......#
#@.C.BSG#
#.....PL#
#########
```

## Shortest Solution

- Found: yes
- Cost: 17
- Depth: 17
- Explored states: 1075
- Inputs: down right right up left up right right right left down down right up right right up
- Events: walk walk walk push_object:crate#2 walk walk push_object:crate#2 push_object:crate#2 push_object:crate#2 box_to_sticky:n1 walk walk walk walk push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: walk=11, push_object:crate#2=4, box_to_sticky:n1=1, push_object:box_sticky_anchor=1, force_chain:n2=1, anchor_boundary_shift:box_sticky=1, move_sticky_rigid=1, pull_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 4: up

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
##..C#G##
##......#
#..C.BSG#
#..@..PL#
#########
```

After:

```text
#########
##..C#G##
##.C....#
#..@.BSG#
#.....PL#
#########
```

### Step 7: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
##..C#G##
##@C....#
#....BSG#
#.....PL#
#########
```

After:

```text
#########
##..C#G##
##.@C...#
#....BSG#
#.....PL#
#########
```

### Step 8: right

- Legal: true
- Events: push_object:crate#2

Before:

```text
#########
##..C#G##
##.@C...#
#....BSG#
#.....PL#
#########
```

After:

```text
#########
##..C#G##
##..@C..#
#....BSG#
#.....PL#
#########
```

### Step 9: right

- Legal: true
- Events: push_object:crate#2, box_to_sticky:n1

Before:

```text
#########
##..C#G##
##..@C..#
#....BSG#
#.....PL#
#########
```

After:

```text
#########
##..C#G##
##...@M.#
#....BSG#
#.....PL#
#########
```

### Step 14: up

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
#########
##..C#G##
##....M.#
#....BSG#
#....@PL#
#########
```

After:

```text
#########
##..C#m##
##...BS.#
#....@.G#
#.....PL#
#########
```

### Step 17: up

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
#########
##..C#m##
##...BS.#
#......+#
#.....PL#
#########
```

After:

```text
#########
##..C#m##
##...BS@#
#.....PL#
#.......#
#########
```


## Graph Facts

- Status: complete
- Reachable states: 1250
- Legal transitions: 3340
- Event-only illegal transitions: 0
- Winning states: 1
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 1250
- Legal transitions: 3340
- Budget: maxStates=300000
- Compressed regions: 101
- Bidirectional transitions: 3140
- Commitment transitions: 200
- Winning regions: 1
- Initial region: r0, states=17, dist=6, internalBidirectional=38, commitments=7, viableCommitments=3, deadCommitments=4, progressCommitments=2, optimalCommitments=2
- Solution region path: r0@0 -> r3@4 -> r7@7 -> r23@8 -> r32@9 -> r80@14 -> r98@17
- Forced commitment prefix length: 0
- Forced viable prefix length: 0
- Forced optimal prefix length: 0

### SCC Irreversible Progress

- Shape: sccs=77, edges=124, winReachable=7, winning=1, winSubgraph=branching_win_dag
- Solution irreversible path: steps=5, forcedWinPrefix=0/5, branchingWinSccs=1, mergingWinSccs=1
- Handoff scriptiness: scope=returned_solution, scripted=2/5, trivial=0, sameEntryExit=2, forcedScripted=2, maxRun=2
- Initial SCC: s0, states=68, dist=5, out=12, winOut=2, deadOut=10
- SCC path: s0@0 -> s30@7 -> s31@8 -> s32@9 -> s35@14 -> s36@17

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 5 | 68 | 12 | 2 | 10 | 0 | 0 | s30 | no |
| s30 | 7 | 4 | 13 | 3 | 1 | 2 | 2 | 2 | s31 | yes |
| s31 | 8 | 3 | 14 | 2 | 1 | 1 | 1 | 1 | s32 | yes |
| s32 | 9 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | s35 | yes |
| s35 | 14 | 1 | 17 | 2 | 1 | 1 | 1 | 1 | s36 | yes |
| s36 | 17 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 7 | s30 | 68 | no | no | right | push_object:crate#2 | has_reposition_room |
| s30 | 7 | 8 | s31 | 13 | yes | yes | right | push_object:crate#2 | scripted_same_state_handoff |
| s31 | 8 | 9 | s32 | 14 | yes | yes | right | push_object:crate#2, box_to_sticky:n1 | scripted_same_state_handoff |
| s32 | 9 | 14 | s35 | 15 | no | yes | up | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | has_reposition_room |
| s35 | 14 | 17 | s36 | 17 | no | yes | up | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |

### Bidirectional Compression Digest

- Shape: states=1250, regions=101, solution commitments=6
- Opening: commitments=7, viable=3, dead=4, optimal=2
- Win-continuation prefix: viable prefix=0/6, optimal prefix=0/6, forced viable commitments=4/6
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: none

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 3 | r0 | r3 | 6 | 3 | 4 | 2 | multiple optimal choices |
| 6 | r3 | r7 | 5 | 3 | 4 | 1 | forced optimal |
| 7 | r7 | r23 | 4 | 1 | 2 | 1 | forced optimal |
| 8 | r23 | r32 | 3 | 1 | 1 | 1 | forced optimal |
| 13 | r32 | r80 | 2 | 1 | 2 | 1 | forced optimal |
| 16 | r80 | r98 | 1 | 1 | 1 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 6 | 17 | 7 | 3 | 4 | 2 | 2 | r3 | no | no | no |
| r3 | 4 | 5 | 17 | 7 | 3 | 4 | 1 | 1 | r7 | no | no | yes |
| r7 | 7 | 4 | 13 | 3 | 1 | 2 | 1 | 1 | r23 | no | yes | yes |
| r23 | 8 | 3 | 14 | 2 | 1 | 1 | 1 | 1 | r32 | no | yes | yes |
| r32 | 9 | 2 | 15 | 3 | 1 | 2 | 1 | 1 | r80 | no | yes | yes |
| r80 | 14 | 1 | 17 | 2 | 1 | 1 | 1 | 1 | r98 | no | yes | yes |
| r98 | 17 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 6 | 7 | 3 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | none |
| 1 | down | r0 | no | 6 | 7 | 3 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 2 | right | r0 | no | 6 | 7 | 3 | 4 | 2 | 2 | r0 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 3 | right | r0 | no | 6 | 7 | 3 | 4 | 2 | 2 | r3 | yes | yes | yes | yes | no | no | walk |
| 4 | up | r3 | yes | 5 | 7 | 3 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2 |
| 5 | left | r3 | no | 5 | 7 | 3 | 4 | 1 | 1 | r3 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | up | r3 | no | 5 | 7 | 3 | 4 | 1 | 1 | r7 | yes | yes | yes | yes | no | yes | walk |
| 7 | right | r7 | yes | 4 | 3 | 1 | 2 | 1 | 1 | r23 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 8 | right | r23 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r32 | yes | yes | yes | yes | yes | yes | push_object:crate#2 |
| 9 | right | r32 | yes | 2 | 3 | 1 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#2, box_to_sticky:n1 |
| 10 | left | r32 | no | 2 | 3 | 1 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 11 | down | r32 | no | 2 | 3 | 1 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 12 | down | r32 | no | 2 | 3 | 1 | 2 | 1 | 1 | r32 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 13 | right | r32 | no | 2 | 3 | 1 | 2 | 1 | 1 | r80 | yes | yes | yes | yes | yes | yes | walk |
| 14 | up | r80 | yes | 1 | 2 | 1 | 1 | 1 | 1 | r80 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 15 | right | r80 | no | 1 | 2 | 1 | 1 | 1 | 1 | r80 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | right | r80 | no | 1 | 2 | 1 | 1 | 1 | 1 | r98 | yes | yes | yes | yes | yes | yes | walk |
| 17 | up | r98 | yes | 0 | 0 | 0 | 0 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
