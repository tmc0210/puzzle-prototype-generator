# Level Analysis: RA_EXP_2026_07_04_DUAL_LOCKSTEP_v1

## Summary

- Prototype: reality_anchor
- Title: Dual lockstep
- Role: challenge
- Status: candidate
- Support: none
- Win: all_targets_covered_by_objects
- Targets: K_runtime_smoke

## Initial State

```text
###########
###.PL.####
##@BSGG####
###..M...G#
###.M..M.##
###########
```

## Shortest Solution

- Found: yes
- Cost: 19
- Depth: 19
- Explored states: 708
- Inputs: right up right down left down down right left up right right right up left down right up down
- Events: push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 walk push_object:push_pull_anchor anchor_boundary_shift:push_pull push_object:box_sticky_anchor force_chain:n2 anchor_boundary_shift:box_sticky move_sticky_rigid walk walk walk push_object:crate#1 force_chain:n2 move_sticky_rigid box_to_sticky:n1 sticky_merge:n1 walk walk push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 push_object:box_sticky_anchor anchor_boundary_shift:box_sticky sticky_to_box:n1 pull_object:crate#2 walk walk push_object:crate#1 force_chain:n2 anchor_boundary_shift:box_sticky walk pull_object:push_pull_anchor anchor_boundary_shift:push_pull
- Event counts: push_object:box_sticky_anchor=5, anchor_boundary_shift:box_sticky=6, sticky_to_box:n1=4, walk=9, push_object:push_pull_anchor=1, anchor_boundary_shift:push_pull=2, force_chain:n2=3, move_sticky_rigid=2, push_object:crate#1=2, box_to_sticky:n1=1, sticky_merge:n1=1, pull_object:crate#2=1, pull_object:push_pull_anchor=1

## Object Participation

No instance-level object participation was reported on the returned solution.

## Key Event Snapshots

### Step 1: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###.PL.####
##@BSGG####
###..M...G#
###.M..M.##
###########
```

After:

```text
###########
###.PL.####
##.@BSG####
###..M...G#
###.C..M.##
###########
```

### Step 3: right

- Legal: true
- Events: push_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
###@PL.####
##..BSG####
###..M...G#
###.C..M.##
###########
```

After:

```text
###########
###.@PL####
##..BSG####
###..M...G#
###.C..M.##
###########
```

### Step 4: down

- Legal: true
- Events: push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid

Before:

```text
###########
###.@PL####
##..BSG####
###..M...G#
###.C..M.##
###########
```

After:

```text
###########
###..PL####
##..@GG####
###.BS...G#
###.CM.M.##
###########
```

### Step 8: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1

Before:

```text
###########
###..PL####
##...GG####
###.BS...G#
###@CM.M.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###.BS...G#
###.@MMM.##
###########
```

### Step 11: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###@BS...G#
###..MMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###.@BS..G#
###..CMM.##
###########
```

### Step 12: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###.@BS..G#
###..CMM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###..@BS.G#
###..CCM.##
###########
```

### Step 13: right

- Legal: true
- Events: push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1

Before:

```text
###########
###..PL####
##...GG####
###..@BS.G#
###..CCM.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@BSG#
###..CCC.##
###########
```

### Step 14: up

- Legal: true
- Events: pull_object:crate#2

Before:

```text
###########
###..PL####
##...GG####
###...@BSG#
###..CCC.##
###########
```

After:

```text
###########
###..PL####
##...G+####
###...CBSG#
###..C.C.##
###########
```

### Step 17: right

- Legal: true
- Events: push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky

Before:

```text
###########
###..PL####
##...GG####
###..@CBSG#
###..C.C.##
###########
```

After:

```text
###########
###..PL####
##...GG####
###...@CBS#
###..C.C.##
###########
```

### Step 19: down

- Legal: true
- Events: pull_object:push_pull_anchor, anchor_boundary_shift:push_pull

Before:

```text
###########
###..PL####
##...G+####
###....CBS#
###..C.C.##
###########
```

After:

```text
###########
###....####
##...PL####
###...@CBS#
###..C.C.##
###########
```


## Graph Facts

- Status: complete
- Reachable states: 2453
- Legal transitions: 6111
- Event-only illegal transitions: 0
- Winning states: 174
- Budget: maxStates=300000

## Agency Facts

- Status: complete
- Compression rule: bidirectional_edges
- Reachable states: 2453
- Legal transitions: 6111
- Budget: maxStates=300000
- Compressed regions: 313
- Bidirectional transitions: 5488
- Commitment transitions: 601
- Winning regions: 19
- Initial region: r0, states=1, dist=9, internalBidirectional=0, commitments=1, viableCommitments=1, deadCommitments=0, progressCommitments=1, optimalCommitments=1
- Solution region path: r0@0 -> r1@1 -> r3@3 -> r4@4 -> r16@8 -> r31@11 -> r53@12 -> r77@14 -> r110@17 -> r123@18 -> r136@19
- Forced commitment prefix length: 1
- Forced viable prefix length: 3
- Forced optimal prefix length: 4

### SCC Irreversible Progress

- Shape: sccs=186, edges=281, winReachable=22, winning=9, winSubgraph=branching_win_dag
- Solution irreversible path: steps=6, forcedWinPrefix=3/6, branchingWinSccs=8, mergingWinSccs=7
- Handoff scriptiness: scope=returned_solution, scripted=3/6, trivial=1, sameEntryExit=3, forcedScripted=2, maxRun=1
- Initial SCC: s0, states=1, dist=6, out=1, winOut=1, deadOut=0
- SCC path: s0@0 -> s1@1 -> s58@3 -> s128@4 -> s138@8 -> s167@11 -> s168@12

#### SCC Solution Path

| SCC | Step | Dist | States | Out | Win out | Dead out | In | Win in | Next | Forced win continuation |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| s0 | 0 | 6 | 1 | 1 | 1 | 0 | 0 | 0 | s1 | yes |
| s1 | 1 | 5 | 7 | 4 | 1 | 3 | 1 | 1 | s58 | yes |
| s58 | 3 | 4 | 7 | 4 | 1 | 3 | 1 | 1 | s128 | yes |
| s128 | 4 | 3 | 9 | 3 | 2 | 1 | 1 | 1 | s138 | no |
| s138 | 8 | 2 | 24 | 5 | 2 | 3 | 1 | 1 | s167 | no |
| s167 | 11 | 1 | 11 | 2 | 2 | 0 | 2 | 2 | s168 | no |
| s168 | 12 | 0 | 118 | 7 | 0 | 0 | 3 | 3 | win/end | no |

#### SCC Handoff Scriptiness

| From | Enter step | Exit step | To | States | Entry=exit | Forced | Input | Events | Reading |
| --- | ---: | ---: | --- | ---: | --- | --- | --- | --- | --- |
| s0 | 0 | 1 | s1 | 1 | yes | yes | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_trivial_scc |
| s1 | 1 | 3 | s58 | 7 | no | yes | right | push_object:push_pull_anchor, anchor_boundary_shift:push_pull | has_reposition_room |
| s58 | 3 | 4 | s128 | 7 | yes | yes | down | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid | scripted_same_state_handoff |
| s128 | 4 | 8 | s138 | 9 | no | no | right | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 | has_reposition_room |
| s138 | 8 | 11 | s167 | 24 | no | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | has_reposition_room |
| s167 | 11 | 12 | s168 | 11 | yes | no | right | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 | scripted_same_state_handoff |

### Bidirectional Compression Digest

- Shape: states=2453, regions=313, solution commitments=10
- Opening: commitments=1, viable=1, dead=0, optimal=1
- Win-continuation prefix: viable prefix=3/10, optimal prefix=4/10, forced viable commitments=5/10
- Endgame tail: 0 step(s) after first entering a winning region
- Reading hints: first 3 commitment(s) are forced viable progress

### Commitment Digest

| After step | From | To | Dist | Viable | Dead | Optimal | Reading |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |
| 0 | r0 | r1 | 9 | 1 | 0 | 1 | forced optimal |
| 2 | r1 | r3 | 8 | 1 | 3 | 1 | forced optimal |
| 3 | r3 | r4 | 7 | 1 | 3 | 1 | forced optimal |
| 7 | r4 | r16 | 6 | 2 | 1 | 1 | forced optimal |
| 10 | r16 | r31 | 5 | 3 | 1 | 1 | multiple viable choices |
| 11 | r31 | r53 | 5 | 2 | 0 | 2 | multiple optimal choices |
| 13 | r53 | r77 | 4 | 2 | 0 | 2 | multiple optimal choices |
| 16 | r77 | r110 | 3 | 1 | 1 | 1 | forced optimal |
| 17 | r110 | r123 | 2 | 1 | 1 | 1 | forced optimal |
| 18 | r123 | r136 | 1 | 3 | 0 | 1 | forced optimal |

### Solution Path Branches

| Region | Step | Dist | States | Commitments | Viable | Dead | Progress | Optimal | Next | Forced commitment | Forced viable | Forced optimal |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |
| r0 | 0 | 9 | 1 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes |
| r1 | 1 | 8 | 7 | 4 | 1 | 3 | 1 | 1 | r3 | no | yes | yes |
| r3 | 3 | 7 | 7 | 4 | 1 | 3 | 1 | 1 | r4 | no | yes | yes |
| r4 | 4 | 6 | 9 | 3 | 2 | 1 | 1 | 1 | r16 | no | no | yes |
| r16 | 8 | 5 | 10 | 4 | 3 | 1 | 1 | 1 | r31 | no | no | no |
| r31 | 11 | 5 | 11 | 2 | 2 | 0 | 2 | 2 | r53 | no | no | no |
| r53 | 12 | 4 | 13 | 2 | 2 | 0 | 2 | 2 | r77 | no | no | no |
| r77 | 14 | 3 | 12 | 2 | 1 | 1 | 1 | 1 | r110 | no | yes | yes |
| r110 | 17 | 2 | 14 | 2 | 1 | 1 | 1 | 1 | r123 | no | yes | yes |
| r123 | 18 | 1 | 12 | 3 | 3 | 0 | 1 | 1 | r136 | no | no | yes |
| r136 | 19 | 0 | 13 | 4 | 3 | 1 | 0 | 0 | win/end | no | no | no |

### Decision Profile By Solution Step

| Step | Input | Region | Entered | Dist | Commitments | Viable | Dead | Progress | Optimal | Next region | Takes commitment next | Next viable | Next progress | Next optimal | Forced viable | Forced optimal | Events |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | initial | r0 | no | 9 | 1 | 1 | 0 | 1 | 1 | r1 | yes | yes | yes | yes | yes | yes | none |
| 1 | right | r1 | yes | 8 | 4 | 1 | 3 | 1 | 1 | r1 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 2 | up | r1 | no | 8 | 4 | 1 | 3 | 1 | 1 | r3 | yes | yes | yes | yes | yes | yes | walk |
| 3 | right | r3 | yes | 7 | 4 | 1 | 3 | 1 | 1 | r4 | yes | yes | yes | yes | yes | yes | push_object:push_pull_anchor, anchor_boundary_shift:push_pull |
| 4 | down | r4 | yes | 6 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, force_chain:n2, anchor_boundary_shift:box_sticky, move_sticky_rigid |
| 5 | left | r4 | no | 6 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 6 | down | r4 | no | 6 | 3 | 2 | 1 | 1 | 1 | r4 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 7 | down | r4 | no | 6 | 3 | 2 | 1 | 1 | 1 | r16 | yes | yes | yes | yes | no | yes | walk |
| 8 | right | r16 | yes | 5 | 4 | 3 | 1 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | push_object:crate#1, force_chain:n2, move_sticky_rigid, box_to_sticky:n1, sticky_merge:n1 |
| 9 | left | r16 | no | 5 | 4 | 3 | 1 | 1 | 1 | r16 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 10 | up | r16 | no | 5 | 4 | 3 | 1 | 1 | 1 | r31 | yes | yes | no | no | no | no | walk |
| 11 | right | r31 | yes | 5 | 2 | 2 | 0 | 2 | 2 | r53 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 12 | right | r53 | yes | 4 | 2 | 2 | 0 | 2 | 2 | r53 | no | n/a | n/a | n/a | n/a | n/a | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 13 | right | r53 | no | 4 | 2 | 2 | 0 | 2 | 2 | r77 | yes | yes | yes | yes | no | no | push_object:box_sticky_anchor, anchor_boundary_shift:box_sticky, sticky_to_box:n1 |
| 14 | up | r77 | yes | 3 | 2 | 1 | 1 | 1 | 1 | r77 | no | n/a | n/a | n/a | n/a | n/a | pull_object:crate#2 |
| 15 | left | r77 | no | 3 | 2 | 1 | 1 | 1 | 1 | r77 | no | n/a | n/a | n/a | n/a | n/a | walk |
| 16 | down | r77 | no | 3 | 2 | 1 | 1 | 1 | 1 | r110 | yes | yes | yes | yes | yes | yes | walk |
| 17 | right | r110 | yes | 2 | 2 | 1 | 1 | 1 | 1 | r123 | yes | yes | yes | yes | yes | yes | push_object:crate#1, force_chain:n2, anchor_boundary_shift:box_sticky |
| 18 | up | r123 | yes | 1 | 3 | 3 | 0 | 1 | 1 | r136 | yes | yes | yes | yes | no | yes | walk |
| 19 | down | r136 | yes | 0 | 4 | 3 | 1 | 0 | 0 | n/a | no | n/a | n/a | n/a | n/a | n/a | pull_object:push_pull_anchor, anchor_boundary_shift:push_pull |

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
